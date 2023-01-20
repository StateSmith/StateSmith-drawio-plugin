// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithUi.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

class ssViewFrame {
    x = 0;
    y = 0;
    scale = 1.0;

    /** @type {mxCell} */
    frameCurrentRoot = null;
}


/**
 * The logic and handling in here can get a bit tricky.
 * while draw.io is an excellent program, it doesn't handle being inside groups very well at all.
 * This class tries to make it behave better.
 */
class StateSmithEnterExitHandler {
    /** @type {mxGraph} */
    graph = null;

    /** @type {StateSmithUi} */
    ssUi = null;

    /**
     * @type {Map<string, ssViewFrame>}
     */
    viewFrameMap = new Map();

    /**
     * @param {mxGraph} graph
     * @param {StateSmithUi} ssUi
     */
    constructor(ssUi, graph) {
        this.ssUi = ssUi;
        this.graph = graph;
    }

    addIntercepts() {
        this._enableCustomDoubleClickHandler();
        this._addMxCurrentRootChange();
    }

    // https://github.com/StateSmith/StateSmith-drawio-plugin/issues/10
    _addMxCurrentRootChange() {
        let self = this;
        let graph = this.graph;

        {
            // The mxCurrentRootChange.prototype.execute function is executed before the root change takes effect.
            // It is also called when UNDO/REDO affects the root.
            // We need to be careful to not do anything in here that might affect history or else we can break the
            // UNDO/REDO chain.
            let originalFunc = mxCurrentRootChange.prototype.execute;
            mxCurrentRootChange.prototype.execute = function () {
                //remember `this` will be of type `mxCurrentRootChange`

                self._storeViewFrame();
                originalFunc.apply(this, arguments);
                self._setViewForCurrentRoot();
            }
        }

        {
            // The view.setCurrentRoot function is not called when UNDO/REDO affects the root.
            // Our new function can call functions that add to undo history.
            let originalFunc = graph.view.setCurrentRoot;
            graph.view.setCurrentRoot = function (/** @type {mxCell?} */ desiredRoot) {
                //remember `this` will be of type `mxGraphView`

                /** @type {mxCell} */
                let currentRoot = graph.view.currentRoot;

                const willBeExitingGroup = StateSmithModel.aVertexContainsB(desiredRoot, currentRoot);
                if (willBeExitingGroup) {
                    while (currentRoot != desiredRoot) {
                        StateSmithModel.fitExpandedGroupToChildren(graph, currentRoot);
                        currentRoot = currentRoot.parent;
                    }
                }
                originalFunc.apply(this, arguments);
            };
        }
    }

    /**
     * override Graph.dblClick to support entering group on body double click issue #4
     */
    _enableCustomDoubleClickHandler() {
        let self = this;
        let graph = this.graph;

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

                    if (state == null || state.text == null || state.text.node == null || !mxUtils.contains(state.text.boundingBox, pt.x, pt.y)) {
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

    //////////////// PRIVATE FUNCTIONS /////////////////////////////

    /**
     * Use this when you want to set the scale without affecting undo/redo history.
     * @param {number} scale
     */
    _setViewScaleWithoutHistoryTracking(scale) {
        // this.graph.view.setScale(toRestore.scale); // might brake undo/redo history chain.
        this.graph.view.scale = scale;
        this.graph.view.viewStateChanged();
    }

    /**
     * @param {ssViewFrame} toRestore
     */
    _restoreViewFrame(toRestore) {
        if (toRestore == null)
            return;

        this._setViewScaleWithoutHistoryTracking(toRestore.scale);

        /** @type {HTMLDivElement} */
        let container = this.graph.container;
        container.scrollLeft = toRestore.x;
        container.scrollTop = toRestore.y;
    }

    /**
     * @param {mxCell} cell
     */
    _getId(cell) {
        if (!cell)
            return "<<<ROOT>>";

        return cell.id;
    }

    _storeViewFrame() {
        let graph = this.graph;
        this.viewFrameMap[this._getId(graph.view.currentRoot)] = { x: graph.container.scrollLeft, y: graph.container.scrollTop, scale: graph.view.getScale(), frameCurrentRoot: graph.view.currentRoot };    // todolow - create actual ssViewFrame object
    }

    _setViewForCurrentRoot() {
        // restore view if there was one recorded
        let viewFrame = this.viewFrameMap[this._getId(this.graph.view.currentRoot)];

        if (viewFrame) {
            this._restoreViewFrame(viewFrame);
        } else {
            this._resetViewToTopLeftWithoutAffectingHistory();
        }
    }

    _resetViewToTopLeftWithoutAffectingHistory() {
        this._setViewScaleWithoutHistoryTracking(1.0);

        var rectangle = this.graph.getGraphBounds();

        if (rectangle.x != null) {
            this.graph.container.scrollLeft = rectangle.x - 50; // minus gives a bit of nice whitespace
        }

        if (rectangle.y != null) {
            this.graph.container.scrollTop = rectangle.y - 80;
        }
    }
}
