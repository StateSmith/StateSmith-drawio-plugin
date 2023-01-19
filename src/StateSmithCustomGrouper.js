// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithX.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";
/**
 * https://github.com/StateSmith/StateSmith-drawio-plugin/issues/3
 */
class StateSmithCustomGrouper {
    /** @type {mxGraph} */
    graph = null;

    /** @type {StateSmithUi} */
    ssUi = null;

    /** @type {(group: mxCell?, border: number, cells: mxCell[]) => void} */
    oldGroupCellsFunction = null;

    /**
     * @param {mxGraph} graph
     * @param {StateSmithUi} ssUi
     */
    constructor(ssUi, graph) {
        this.ssUi = ssUi;
        this.graph = graph;
    }

    overrideDrawioFunction() {
        let graph = this.graph;

        this.oldGroupCellsFunction = graph.groupCells;
        let me = this;
        graph.groupCells = function (group, border, cells) {
            me.newGroupingFunction(this, group, border, cells);
        };
    }

    /**
     * @param {mxGraph} drawioCaller
     * @param {mxCell} group
     * @param {number} border
     * @param {mxCell[]} cells
     */
    newGroupingFunction(drawioCaller, group, border, cells, ...rest) {
        let graph = this.graph;
        let ssUi = this.ssUi;

        var oldCreateGroupCell = graph.createGroupCell;

        let shouldGroupWithState = this.shouldGroupWithState(cells);
        if (shouldGroupWithState) {
            graph.createGroupCell = function () {
                return ssUi.makeCompositeState(undefined, true);
            };
            border = 20; // padding between outer group state and inner
        }

        this.oldGroupCellsFunction.apply(drawioCaller, [group, border, cells, rest]);

        graph.createGroupCell = oldCreateGroupCell;
    }

    /**
     * Only alter grouping behavior when used on a StateSmith state machine
     * @param {mxCell[]} cells
     */
    shouldGroupWithState(cells) {
        for (let index = 0; index < cells.length; index++) {
            const cell = cells[index];
            if (StateSmithModel.hasStateMachineParent(cell))
                return true;
        }

        return false;
    }

    /**
     * override Graph.dblClick to support entering group on body double click issue #4
     * @param {mxGraph} graph
     */
    enableCustomDoubleClickHandler(graph) {

        let dblClick = graph.dblClick;
        graph.dblClick = function (event, cell) {
            //remember `this` is of type `mxGraph/Graph`
            let done = false;
            let pt = mxUtils.convertPoint(this.container, mxEvent.getClientX(event), mxEvent.getClientY(event));

            cell = cell || this.getCellAt(pt.x, pt.y);

            try {
                const isGroup = StateSmithModel.getModelFromGraph(graph).getChildCount(cell) > 0;
                if (isGroup) {
                    let state = this.view.getState(cell);

                    if (state == null || state.text == null || state.text.node == null ||
                        !mxUtils.contains(state.text.boundingBox, pt.x, pt.y)) {
                        this.enterGroup(cell);
                        done = true;
                    }
                }
            } catch (error) {
            }

            if (!done) {
                dblClick.call(this, event, cell);
            }
        };
    }
}
