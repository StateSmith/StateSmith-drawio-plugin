// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithX.js
// you can alternatively save a script file in chrome dev tools sources.

// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

class StateSmithNewStateNamer {

    /** @type {mxGraph} */
    graph = null;

    /** @type {mxGraphModel} */
    model = null;

    /** @type {StateSmithUi} */
    ssUi = null;

    importActive = false;

    /**
     * @param {mxGraph} graph
     * @param {StateSmithUi} ssUi
     */
    constructor(ssUi, graph) {
        this.ssUi = ssUi;
        this.graph = graph;
        this.model = graph.model;

        this.overrideDrawioFunction();
    }

    overrideDrawioFunction() {
        let graph = this.graph;
        let self = this;

        {
            // The function `importGraphModel()` is dynamically added by draw.io so intellisense can't see it.
            // search for the following in source: Graph.prototype.importGraphModel
            // Note that `Graph` type is a subclass of `mxGraph`.
            let oldImport = graph["importGraphModel"];
            graph["importGraphModel"] = function() {
                self.importActive = true;
                let result = oldImport.apply(this, arguments);
                self.importActive = false;
                return result;
            };
        }

        {
            let oldFunc = graph.cellsAdded;
            /** @param {mxCell[]} cells */
            graph.cellsAdded = function(cells, parent) {
                self.cellsAdded(cells, parent);
                return oldFunc.apply(this, arguments);
            };
        }
    }

    /**
     * @param {mxCell[]} cells
     */
    newCellsAreBeingAdded(cells) {
        let isNewlyAdded = false;

        for (let i = 0; !isNewlyAdded && i < cells.length; i++) {
            const cell = cells[i];
            isNewlyAdded = this.#cellIsBeingAdded(cell);
        }

        return isNewlyAdded
    }

    /**
     * Note! Draw.io calls this function even when moving existing cells,
     * not just when new cells are added (which is un-intuitive).
     * @param {mxCell[]} cells
     * @param {mxCell} parent
     */
    cellsAdded(cells, parent) {
        if (!this.newCellsAreBeingAdded(cells))
            return;

        if (!StateSmithModel.isPartOfStateSmith(parent))
            return;

        let existingNames = [];
        parent.children.forEach((/** @type {mxCell} */ kidCell) => {
            // In StateSmith v0.8.11, auto name conflict resolution is enabled by default. https://github.com/StateSmith/StateSmith/issues/138
            // We only need to look for conflicts within the parent's immediate children :)
            const isNestedBehaviorTextNode = StateSmithModel.isNestedBehaviorTextNode(this.graph, kidCell);

            if (kidCell.isVertex() && !isNestedBehaviorTextNode) {
                existingNames.push(kidCell.value);
            }
        });

        cells.forEach(cell => {
            const isNewlyAdded = this.#cellIsBeingAdded(cell);

            if (cell.isVertex() && isNewlyAdded) {
                this.renameCellBeingAdded(cell, existingNames);
            }
        });
    }

    /**
     * @param {mxCell} cell
     */
    #cellIsBeingAdded(cell) {
        return cell.parent == null || this.importActive;
    }

    /**
     * @param {mxCell} cell
     * @param {string[]} existingNames
     */
    renameCellBeingAdded(cell, existingNames)
    {
        /** @type {string} */
        let label = cell.value || "";

        if (!this.isRenamingTarget(cell) || label.trim() == "") {
            return;
        }

        let match = label.match(/^\s*(\w+?)(\d+)\s*$/) || [label, label, ""];

        let nameStart = match[1];
        let postfixNumber = parseInt(match[2]); // can be NaN
        let newLabel = nameStart + (postfixNumber || ""); // || to handle NaN

        while (existingNames.includes(newLabel))
        {
            if (Number.isInteger(postfixNumber))
                postfixNumber++;
            else
                postfixNumber = 1;

            newLabel = nameStart + postfixNumber;
        }

        existingNames.push(newLabel);
        cell.value = newLabel;
    }

    /**
     * @param {mxCell} cell
     */
    isRenamingTarget(cell) {
        /** @type {string} */
        let value = cell.value || "";
        value = value.trim();
        return StateSmithModel.isStateMachineNode(cell) || (value.match(/^\s*\w+\s*$/) != null);
    }
}
