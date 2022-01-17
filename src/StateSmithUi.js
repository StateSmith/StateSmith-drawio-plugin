// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithUi.js
// you can alternatively save a script file in chrome dev tools sources.

// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

class StateSmithUi {

    /** @type {{ editor: Editor; toolbar: Toolbar; sidebar: Sidebar; }} */
    app = null;

    /** @type {mxGraph} */
    graph = null;

    ssModel = null;

    /**
     * @type {{ x: any; y: any; scale: any; group: any; }[]}
     */
    viewStack = [];

    /**
     * @param {mxGraph} graph
     * @param {{ editor: Editor; toolbar: Toolbar; sidebar: Sidebar; }} app
     */
    constructor(app, graph) {
        this.app = app;
        this.graph = graph;
        this.ssModel = new StateSmithModel(this, graph);
    }

    /**
     * @param {mxGraph} graph
     */
    addCustomExitGroupHandlerForFittingGroupToKids(graph) {
        let ssui = this;
        let originalExitGroup = graph.exitGroup;
        graph.exitGroup = function () {
            /** @type {mxCell} */
            let group = this.getCurrentRoot();
            // if (this.isValidRoot(group))  // needed?
            //remember `this` will be of type `mxGraph/Graph`
            originalExitGroup.apply(this, arguments);
            ssui.fitExpandedGroupToChildren(this, group);
        };
    }

    /**
     * @param {mxGraph} graph
     */
    addCustomEnterGroupHandlerForView(graph) {
        let ssui = this;
        let oldEnterGroupFunc = graph.enterGroup;
        graph.enterGroup = function () {
            /** @type {HTMLDivElement} */
            let container = graph.container;
            ssui.viewStack.push({ x: container.scrollLeft, y: container.scrollTop, scale: this.view.getScale(), group: this.getCurrentRoot() });

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
     * @param {mxGraph} graph
     */
    addCustomExitGroupHandlerForRestoringView(graph) {
        let ssui = this;
        let originalExitGroup = graph.exitGroup;
        graph.exitGroup = function () {
            //remember `this` will be of type `mxGraph`
            let toRestore = ssui.viewStack.pop();

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
     * @param {mxGraph} graph
     * @param {mxCell} group
     */
    fitExpandedGroupToChildren(graph, group) {
        if (!group)
            return;

        //don't adjust size for collapsed groups
        if (group.isCollapsed())
            return;

        let graphModel = this.getModel(graph);
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
     * @param {mxGraph} graph
     * @returns {mxGraphModel}
     */
    getModel(graph) {
        return graph.getModel();
    }

    /**
     * override Graph.dblClick to support entering group on body double click issue #4
     * @param {mxGraph} graph
     */
    enableCustomDoubleClickHandler(graph) {
        let ssui = this;

        let dblClick = graph.dblClick;
        graph.dblClick = function (event, cell) {
            //remember `this` is of type `mxGraph/Graph`
            let done = false;
            let pt = mxUtils.convertPoint(this.container, mxEvent.getClientX(event), mxEvent.getClientY(event));

            cell = cell || this.getCellAt(pt.x, pt.y);

            try {
                const isGroup = ssui.getModel(graph).getChildCount(cell) > 0;
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
     * @param {mxGraph} graph
     */
    addCustomGroupingBehavior(graph) {
        new StateSmithCustomGrouper(this, graph).overrideDrawioFunction();
    }

    /**
     * @param {mxGraph} graph
     */
    addNewStateNamer(graph) {
        new StateSmithNewStateNamer(this, graph);
    }


    /**
     *
     * @param {Sidebar} sidebar
     */
    addStateShapesPaletteToSidebar(sidebar) {
        let ssui = this;

        let tags = "ss StateSmith";

        /**
         * @param {mxCell} cell
         * @param {string} name
         */
        function createTemplate(cell, name) {
            return sidebar.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, name);
        }

        let fns = [
            sidebar.addEntry(tags, function () {
                return createTemplate(ssui.makeStateMachine(sidebar.graph), "state machine");
            }),
            sidebar.addEntry(tags, function () {
                return createTemplate(ssui.makeInitialState(), "initial state (hidden label)");
            }),
            sidebar.addEntry(tags, function () {
                return createTemplate(ssui.makeCompositeState(), 'Composite State (enter, do, exit)');
            }),
            sidebar.addEntry(tags, function () {
                return createTemplate(ssui.makeCompositeState(null, true), 'Composite State');
            }),
            // sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addSimpleStateStyle().toString(), 130, 65, `<b>STATE_123</b>\n${ssui.getEnterDoExitCode()}`, 'Simple State with handlers', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addExitPointStyle().toString(), 30, 30, `exit : 1`, 'Exit point', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addEntryPointStyle().toString(), 30, 30, `entry : 1`, 'Entry point', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addChoicePointStyle(true).toString(), 40, 40, `$choice`, 'Choice point (hidden label)', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addChoicePointStyle().toString(), 40, 40, `$choice : 1`, 'Choice point (visible label)', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addHistoryVertexStyle().toString(), 30, 30, `<font color="#bd890f">$</font>H`, 'History', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addHistoryVertexStyle().toString(), 30, 30, `<font color="#bd890f">$</font>HC`, 'History Continue', true, true, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addNotesStyle().toString(), 250, 70, `<b>$NOTES</b>\nSome notes go here...`, 'Notes', null, null, tags),
            // sidebar.createVertexTemplateEntry(new StateSmithUIStyles().addSimpleStateStyle().toString(), 120, 50, `<b>STATE_123</b>\n`, 'Simple State', null, null, 'Simple state'),
        ];

        {
            let expanded = true;
            let id = "StateSmith";
            let title = id;
            sidebar.addPaletteFunctions(id, title, expanded, fns);
        }
    }

    getEnterDoExitCode() {
        return "enter / {  }\ndo / {  }\nexit / {  }";
    }

    makeEventHandlersCell() {
        let innerHandlers = new mxCell(this.getEnterDoExitCode(), new mxGeometry(0, 30, 100, 50));
        innerHandlers.setVertex(true);
        innerHandlers.setConnectable(false);
        innerHandlers.setStyle(new StateSmithUiStyles().addEventHandlerTextStyle().toString());
        return innerHandlers;
    }

    /**
     * @param {string} [label]
     * @param {boolean} [skipHandlers]
     */
    makeCompositeState(label, skipHandlers) {
        let cell = new mxCell(label || 'STATE_1', new mxGeometry(0, 0, 120, 90));
        cell.setVertex(true);
        cell.setConnectable(true);
        cell.setStyle(new StateSmithUiStyles().addGroupStyle().toString());

        let handlers = this.makeEventHandlersCell();
        cell.insert(handlers);

        if (skipHandlers) {
            handlers.value = " ";
            handlers.geometry.width = 30;
            handlers.geometry.height = 20;
        }

        return cell;
    }

    makeInitialState() {
        let cell = new mxCell('$initial_state', new mxGeometry(0, 0, 25, 25));
        cell.setVertex(true);
        cell.setConnectable(true);
        cell.setStyle(new StateSmithUiStyles().addInitialStateStyle().toString());

        return cell;
    }

    /**
     * @param {mxCell} cell
     * @param {number} x
     * @param {number} y
     */
    moveCell(cell, x, y) {
        cell.geometry.x = x;
        cell.geometry.y = y;

        return cell;
    }

    /**
     * @param {string | undefined} [name]
     * @param {mxGraph} graph
     */
    makeStateMachine(graph, name) {
        let sm = this.makeCompositeState(`$STATEMACHINE : ${name || "MySm"}`, true);
        sm.geometry.width = 360;
        sm.geometry.height = 220;

        let initial = this.moveCell(this.makeInitialState(), 67.5, 50);
        let firstState = this.moveCell(this.makeCompositeState("STATE_1"), 20, 110);
        let secondState = this.moveCell(this.makeCompositeState("STATE_2"), 220, 110);

        sm.insert(initial);
        sm.insert(firstState);
        sm.insert(secondState);
        graph.insertEdge(sm, null, null, initial, firstState);
        graph.insertEdge(sm, null, null, firstState, secondState);

        // would be nice to connect initial state to first state, but not sure we can do that 
        // easily without access to the graph. See mxGraph.prototype.addEdge
        return sm;
    }
}
