// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithX.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check

// spell-checker: ignore ungroup

"use strict";

/**
 * https://github.com/StateSmith/StateSmith-drawio-plugin/issues/9
 */
class StateSmithCustomUnGroup {
    /** @type {mxGraph} */
    graph = null;

    /** @type {mxGraphModel} */
    model = null;

    /** @type {(cells: mxCell[]) => mxCell[]} */
    oldRemoveCellsFromParent = null;

    /** @type {(cells: mxCell[]) => mxCell[]} */
    oldUngroupCells = null;

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
                cells = self._getSelectionCellsIfNull(cells);

                cells.forEach(cell => {
                    /** @type {mxCell[]} */
                    let kids = cell.children || [];
                    let cellsThatNeedDeleting = kids.filter(c => !graph.isCellDeletable(c));
                    new StateSmithModel(self.graph).forceDeleteCells(cellsThatNeedDeleting);
                });

                return self.oldUngroupCells.apply(this, arguments);
            };
        }

        {
            graph.removeCellsFromParent = function(/** @type {mxCell[]} */ cells) {
                cells = self._getSelectionCellsIfNull(cells);

                let filteredCells = cells.filter(c => graph.isCellDeletable(c));
                let result = self.oldRemoveCellsFromParent.apply(this, [filteredCells]);
                return result;
            };
        }
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
}
