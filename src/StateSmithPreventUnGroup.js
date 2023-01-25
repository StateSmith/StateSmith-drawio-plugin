// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithX.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check

// spell-checker: ignore ungroup groupable

"use strict";

/**
 * https://github.com/StateSmith/StateSmith-drawio-plugin/issues/9
 */
class StateSmithUnGroupProtection {
    /** @type {mxGraph} */
    graph = null;

    /** @type {mxGraphModel} */
    model = null;

    /** @type {(cells: mxCell[]) => mxCell[]} */
    oldRemoveCellsFromParent = null;

    /** @type {(cells: mxCell[]) => mxCell[]} */
    oldUngroupCells = null;

    static _allowUngroup = false;

    /**
     * @param {mxGraph} graph
     */
    constructor(graph) {
        this.graph = graph;
        this.model = graph.model;
        this.oldRemoveCellsFromParent = graph.removeCellsFromParent; // todo - throw if null
        this.oldUngroupCells = graph.ungroupCells; // todo - throw if null
    }

    overrideDrawioFunction() {
        let graph = this.graph;
        let self = this;

        {
            graph.ungroupCells = function(/** @type {mxCell[]} */ cells) {
                cells = self.filterOutStateSmithCellsAndWarn(cells);
                return self.oldUngroupCells.apply(this, [cells]);
            };
        }

        {
            graph.removeCellsFromParent = function(/** @type {mxCell[]} */ cells) {
                cells = self.filterOutStateSmithCellsAndWarn(cells);
                let result = self.oldRemoveCellsFromParent.apply(this, [cells]);
                return result;
            };
        }
    }

    /**
     * @param {mxCell[]} cells
     * @returns {mxCell[]}
     */
    filterOutStateSmithCellsAndWarn(cells) {
        if (StateSmithUnGroupProtection._allowUngroup)
            return cells;

        cells = this._getSelectionCellsIfNull(cells);

        if (!cells) // must be done after _getSelectionCellsIfNull
            return cells;

        cells = this._getSelectionCellsIfNull(cells);
        let unGroupableCells = cells.filter(c => !StateSmithModel.isPartOfStateSmith(c));

        if (cells.length != unGroupableCells.length)
            StateSmithDi.di.showErrorModal("ungroup prevented", "Ungroup prevented on StateSmith nodes to prevent problems. Either move nodes out of parent, or delete parent (when expanded) instead.");

        return unGroupableCells;
    }

    // todo_low - centralize functionality
    /**
     * @param {mxCell[]} cells
     */
    _getSelectionCellsIfNull(cells) {
        if (cells == null) {
            cells = this.graph.getSelectionCells();
        }
        return cells;
    }

    /**
     * @param {() => void} func
     */
    static runWithUnGroupAllowed(func) {
        try {
            StateSmithUnGroupProtection._allowUngroup = true;
            func();
        } finally {
            StateSmithUnGroupProtection._allowUngroup = false;
        }
    }
}
