// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithX.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

/**
 * https://github.com/StateSmith/StateSmith-drawio-plugin/issues/2
 */
class StateSmithSmarterDelete {
    /** @type {mxGraph} */
    graph = null;

    /** @type {(cells: mxCell[], include_edges: boolean) => void} */
    oldDeleteFuncOwnedByGraph = null;

    /** @type {mxGraphModel} */
    model = null;

    /**
     * @param {mxGraph} graph
     */
    constructor(graph) {
        this.graph = graph;
        this.model = graph.model;
        this.oldDeleteFuncOwnedByGraph = graph["deleteCells"];  // todo - throw if null
    }
    
    overrideDrawioFunction() {
        let graph = this.graph;
        let self = this;

        {
            // The function `deleteCells()` is dynamically added by draw.io so intellisense can't see it.
            // search for the following in source: Graph.prototype.deleteCells
            // Note that `Graph` type is a subclass of `mxGraph`.
            graph["deleteCells"] = function(/** @type {mxCell[]} */ cells, /** @type {boolean} */ include_edges) {
                self._deleteCells(cells, include_edges);
            };
        }
    }

    /**
     * @param {mxCell[]} cells
     * @param {boolean} include_edges
     */
    _originalDeleteCells(cells, include_edges)
    {
        this.oldDeleteFuncOwnedByGraph.apply(this.graph, [cells, include_edges]);
    }

    /**
     * @param {mxCell[]} cells
     * @param {boolean} include_edges
     */
    _deleteCells(cells, include_edges)
    {
        this.model.beginUpdate();
        try
        {
            cells.forEach(cell => {
                // If group is expanded and to be deleted, un-group it first.
                // See https://github.com/StateSmith/StateSmith-drawio-plugin/issues/2
                if (!cell.isCollapsed()) {
                    this.graph.ungroupCells([cell]);
                }
            });

            this._originalDeleteCells(cells, include_edges);
        }
        finally
        {
            this.model.endUpdate();
        }
    }
}
