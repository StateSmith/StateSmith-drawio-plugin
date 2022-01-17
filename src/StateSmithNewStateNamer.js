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
    ssui = null;

    importActive = false;

    /**
     * @param {mxGraph} graph
     * @param {StateSmithUi} ssui
     */
    constructor(ssui, graph) {
        this.ssui = ssui;
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
        if (this.importActive)
            return true;

        let isNewlyAdded = false;
        cells.forEach(cell => {
            isNewlyAdded = cell.parent == null;
            if (isNewlyAdded)
                return; // from forEach function
        });

        return isNewlyAdded
    }

    /**
     * Note! Draw.io calls this function even when moving existing cells,
     * not just when added which is un-intuitive.
     * @param {mxCell[]} cells
     * @param {mxCell} parent
     */
    cellsAdded(cells, parent) {
        if (!this.newCellsAreBeingAdded(cells))
            return;

        let existingNames = [""];
        let smRoot = StateSmithModel.findStateMachineAncestor(parent);
        StateSmithModel.visitVertices(smRoot, vertex => existingNames.push(vertex.value));

        cells.forEach(cell => {
            let isNewlyAdded = cell.parent == null || this.importActive;

            if (isNewlyAdded && cell.isVertex() && StateSmithModel.isPartOfStateSmith(parent)) {
                this.renameCellBeingAdded(cell, existingNames);
            }
        });
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

        let match = label.match(/^\s*(\w+?)(\d+)\s*$/) || [label, label, "1"];

        let nameStart = match[1];
        let postfixNumber = parseInt(match[2]);
        let newLabel = nameStart + postfixNumber;

        while (existingNames.includes(newLabel))
        {
            postfixNumber++;
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
