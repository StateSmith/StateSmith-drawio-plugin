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
                let result = null;

                this.model.beginUpdate(); // thinking that this might not be needed
                try
                {
                    cells.forEach(cell => {
                        /** @type {mxCell[]} */
                        let kids = cell.children || [];
                        let cellsThatNeedDeleting = kids.filter(c => !graph.isCellDeletable(c));
                        
                        // allow cell to be deleted
                        cellsThatNeedDeleting.forEach(c => {
                            self.model.setStyle(c, "");
                            // The view may cache the style for the cell. It must be removed or else `graph.removeCells()` won't be able to remove cells that were marked as non-deletable.
                            graph.view.removeState(c);
                        });
                        graph.removeCells(cellsThatNeedDeleting);
                    });
    
                    result = self.oldUngroupCells.apply(this, arguments);
                }
                finally
                {
                    this.model.endUpdate();
                }

                return result;
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
