// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithUi.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

class ssViewFrame
{
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

    // TODO - look at using event listener for `mxCurrentRootChange`. See `mxGraphView.prototype.setCurrentRoot()`. This might allow undo/redo to keep view frame properly. 
    // https://github.com/StateSmith/StateSmith-drawio-plugin/issues/10
    addViewSetCurrentRootIntercept() {
        let graph = this.graph;
        let self = this;
        let originalFunc = graph.view.setCurrentRoot;
        graph.view.setCurrentRoot = function (/** @type {mxCell?} */ desiredRoot) {
            //remember `this` will be of type `mxGraphView`
            let view = this;
            self.viewFrameMap[self._getId(view.currentRoot)] = { x: graph.container.scrollLeft, y: graph.container.scrollTop, scale: view.getScale(), frameCurrentRoot: view.currentRoot };    // todolow - create actual ssViewFrame object

            /** @type {mxCell} */
            let currentRoot = view.currentRoot;

            // determine if exiting or entering
            if (StateSmithModel.aVertexContainsB(currentRoot, desiredRoot)) {
                // entering
            }
            else if (StateSmithModel.aVertexContainsB(desiredRoot, currentRoot)) {
                // exiting
                while (currentRoot != desiredRoot) {
                    StateSmithModel.fitExpandedGroupToChildren(graph, currentRoot);
                    currentRoot = currentRoot.parent;
                }
            }
            else {
                console.error("Unexpected view.setCurrentRoot arguments.")
            }

            originalFunc.apply(this, arguments);

            // restore view if there was one recorded
            let viewFrame = self.viewFrameMap[self._getId(desiredRoot)];

            if (viewFrame) {
                self._restoreViewFrame(viewFrame);
            } else {
                graph.maxFitScale = 1.0;
                graph.minFitScale = 1.0;
                graph.fit(null, null, 100);
    
                graph.container.scrollLeft -= 50;
                graph.container.scrollTop -= 100;
            }
        };
    }

    /**
     * override Graph.dblClick to support entering group on body double click issue #4
     */
    enableCustomDoubleClickHandler() {
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

    /**
     * @param {ssViewFrame} toRestore
     */
    _restoreViewFrame(toRestore) {
        if (toRestore == null)
            return;

        this.graph.view.setScale(toRestore.scale);
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

}
