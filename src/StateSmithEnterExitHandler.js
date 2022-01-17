// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithUi.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";
class StateSmithEnterExitHandler {
    /** @type {mxGraph} */
    graph = null;

    /** @type {StateSmithUi} */
    ssUi = null;

    /**
     * @type {{ x: any; y: any; scale: any; group: any; }[]}
     */
    viewStack = [];

    /**
     * @param {mxGraph} graph
     * @param {StateSmithUi} ssUi
     */
    constructor(ssUi, graph) {
        this.ssUi = ssUi;
        this.graph = graph;
    }

    addCustomExitGroupHandlerForFittingGroupToKids() {
        let graph = this.graph;
        let self = this;
        let originalExitGroup = graph.exitGroup;
        graph.exitGroup = function () {
            /** @type {mxCell} */
            let group = this.getCurrentRoot();
            // if (this.isValidRoot(group))  // needed?
            //remember `this` will be of type `mxGraph/Graph`
            originalExitGroup.apply(this, arguments);
            self.fitExpandedGroupToChildren(group);
        };
    }

    addCustomEnterGroupHandlerForView() {
        let graph = this.graph;
        let self = this;
        let oldEnterGroupFunc = graph.enterGroup;
        graph.enterGroup = function () {
            /** @type {HTMLDivElement} */
            let container = graph.container;
            self.viewStack.push({ x: container.scrollLeft, y: container.scrollTop, scale: this.view.getScale(), group: this.getCurrentRoot() });

            oldEnterGroupFunc.apply(this, arguments);

            graph.maxFitScale = 1.0;
            graph.minFitScale = 1.0;
            graph.fit(null, null, 100);

            container.scrollLeft -= 50;
            container.scrollTop -= 100;
        };
    }

    /**
     * must happen after addCustomExitGroupHandlerForFittingGroupToKids
     */
    addCustomExitGroupHandlerForRestoringView() {
        let graph = this.graph;
        let self = this;
        let originalExitGroup = graph.exitGroup;
        graph.exitGroup = function () {
            //remember `this` will be of type `mxGraph`
            let toRestore = self.viewStack.pop();

            // when enterGroup happened, it may have skipped some levels. Keep exiting until we have exited to the proper parent.
            // It's proper that we keep exiting so that things like addCustomExitGroupHandlerForFittingGroupToKids can happen for all levels.
            do {
                originalExitGroup.apply(this, arguments);
            }
            while (toRestore.group != this.getCurrentRoot());

            graph.view.setScale(toRestore.scale);
            /** @type {HTMLDivElement} */
            let container = graph.container;
            container.scrollLeft = toRestore.x;
            container.scrollTop = toRestore.y;
        };
    }

    /**
     * Will ignore collapsed groups.
     * @param {mxCell} group
     */
    fitExpandedGroupToChildren(group) {
        let graph = this.graph;

        if (!group)
            return;

        //don't adjust size for collapsed groups
        if (group.isCollapsed())
            return;

        let graphModel = StateSmithModel.getModelFromGraph(graph);
        if (graphModel.getChildCount(group) <= 0)
            return;

        let geo = graph.getCellGeometry(group);

        if (geo == null)
            return;

        let children = graph.getChildCells(group, true, true);
        let includeEdges = false; // when true, I think we hit a draw.io bug `graph.getBoundingBoxFromGeometry()`. Needs more testing and ticket to be opened.
        let kidsBoundingBox = graph.getBoundingBoxFromGeometry(children, includeEdges); // todo low - include edges that are fully contained within group

        const groupBorderSize = 20;
        let requiredWidth = kidsBoundingBox.x + kidsBoundingBox.width + groupBorderSize;
        let requiredHeight = kidsBoundingBox.y + kidsBoundingBox.height + groupBorderSize;

        geo = geo.clone(); // needed for undo support
        let parentBoundingBox = graph.getBoundingBoxFromGeometry([group].concat(children), includeEdges);
        geo.width = Math.max(parentBoundingBox.width, requiredWidth);
        geo.height = Math.max(parentBoundingBox.height, requiredHeight);

        graphModel.setGeometry(group, geo);
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
}
