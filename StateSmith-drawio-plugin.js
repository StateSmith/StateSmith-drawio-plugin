// TODO: override group command to enclose all grouped states into a new composite state.

class StateSmithUI2 {

    viewStack = [];

    /**
     * @param {mxGraph} graph 
     */
    addCustomExitGroupHandlerForFittingGroupToKids(graph) {
        let ssui = this;
        let originalExitGroup = mxGraph.prototype.exitGroup;
        mxGraph.prototype.exitGroup = function () {
            let group = this.getCurrentRoot();
            // if (this.isValidRoot(group))  // needed?

            //remember `this` will be of type `mxGraph`
            originalExitGroup.apply(this, arguments);
            ssui.fitExpandedGroupToChildren(this, group);
        };
    }

    /**
     * @param {mxGraph} graph 
     */
    addCustomEnterGroupHandlerForView(graph) {
        let ssui = this;
        let oldEnterGroupFunc = mxGraph.prototype.enterGroup;
        mxGraph.prototype.enterGroup = function () {
            ssui.viewStack.push({ x: graph.container.scrollLeft, y: graph.container.scrollTop, scale: this.view.getScale(), group: this.getCurrentRoot() });

            oldEnterGroupFunc.apply(this, arguments);

            graph.maxFitScale = 1.0;
            graph.minFitScale = 1.0;
            graph.fit(null, null, 100);
            graph.container.scrollLeft -= 50;
            graph.container.scrollTop -= 100;
        };
    }

    /**
     * must happen after addCustomExitGroupHandlerForFittingGroupToKids
     * @param {mxGraph} graph
     */
    addCustomExitGroupHandlerForRestoringView(graph) {
        let ssui = this;
        let originalExitGroup = mxGraph.prototype.exitGroup;
        mxGraph.prototype.exitGroup = function () {
            //remember `this` will be of type `mxGraph`
            let toRestore = ssui.viewStack.pop();

            // when enterGroup happened, it may have skipped some levels. Keep exiting until we have exited to the proper parent.
            // It's proper that we keep exiting so that things like addCustomExitGroupHandlerForFittingGroupToKids can happen for all levels.
            do {
                originalExitGroup.apply(this, arguments);
            }
            while (toRestore.group != this.getCurrentRoot());

            graph.view.setScale(toRestore.scale);
            graph.container.scrollLeft = toRestore.x;
            graph.container.scrollTop = toRestore.y;
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

        if (graph.getModel().getChildCount(group) <= 0)
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

        graph.getModel().setGeometry(group, geo);
    }

    /**
     * override Graph.dblClick to support entering group on body double click issue #4
     * @param {mxGraph} graph 
     */
    enableCustomDoubleClickHandler(graph) {
        let dblClick = graph.dblClick;
        graph.dblClick = function (event, cell) {
            //remember `this` is of type `Graph`
            let done = false;
            let pt = mxUtils.convertPoint(this.container, mxEvent.getClientX(event), mxEvent.getClientY(event));

            cell = cell || this.getCellAt(pt.x, pt.y)

            try {
                const isGroup = graph.getModel().getChildCount(cell) > 0;
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
        // todo - finish
        var originalGroupCells = graph.groupCells;
    }

    createGroup() {
        var group = new mxCell('Group', new mxGeometry());
        group.setVertex(true);
        group.setConnectable(true);
        // group.setStyle(); // todo - finish
        return group;
    }

    /**
     * 
     * @param {Sidebar} sidebar 
     */
    addStateShapesPaletteToSidebar(sidebar) {
        let ssui = this;

        let tags = "ss StateSmith";

        function createTemplate(cell, name) {
            return sidebar.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, name);
        }

        let fns = [
            sidebar.addEntry(tags, function () {
                return createTemplate(ssui.makeStateMachine(), "state machine");
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
            sidebar.createVertexTemplateEntry(new StateSmithUIStyles().addSimpleStateStyle().toString(), 130, 65, `<b>STATE_123</b>\n${ssui.getEnterDoExitCode()}`, 'Simple State with handlers', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUIStyles().addExitPointStyle().toString(), 30, 30, `exit : 1`, 'Exit point', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUIStyles().addEntryPointStyle().toString(), 30, 30, `entry : 1`, 'Entry point', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUIStyles().addChoicePointStyle(true).toString(), 40, 40, `$choice`, 'Choice point (hidden label)', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUIStyles().addChoicePointStyle().toString(), 40, 40, `$choice : 1`, 'Choice point (visible label)', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUIStyles().addHistoryVertexStyle().toString(), 30, 30, `<font color="#bd890f">$</font>H`, 'History', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUIStyles().addHistoryVertexStyle().toString(), 30, 30, `<font color="#bd890f">$</font>HC`, 'History Continue', true, true, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUIStyles().addNotesStyle().toString(), 250, 70, `<b>$NOTES</b>\nSome notes go here...`, 'Notes', null, null, tags),

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
        innerHandlers.setStyle(new StateSmithUIStyles().addEventHandlerTextStyle().toString());
        return innerHandlers;
    }

    makeCompositeState(label, skipHandlers) {
        let cell = new mxCell(label || 'STATE', new mxGeometry(0, 0, 120, 90));
        cell.setVertex(true);
        cell.setConnectable(true);
        cell.setStyle(new StateSmithUIStyles().addGroupStyle().toString());

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
        cell.setStyle(new StateSmithUIStyles().addInitialStateStyle().toString());

        return cell;
    }

    moveCell(cell, x, y) {
        cell.geometry.x = x;
        cell.geometry.y = y;

        return cell;
    }

    makeStateMachine(name) {
        let sm = this.makeCompositeState(`$STATEMACHINE : ${name || "MySm"}`, true);
        sm.geometry.width = 390;
        sm.geometry.height = 260;

        let initial = this.moveCell(this.makeInitialState(), 67.5, 50);
        let firstState = this.moveCell(this.makeCompositeState(), 20, 150);
        let secondState = this.moveCell(this.makeCompositeState(), 250, 150);

        sm.insert(initial);
        sm.insert(firstState);
        sm.insert(secondState);

        // would be nice to connect initial state to first state, but not sure we can do that 
        // easily without access to the graph. See mxGraph.prototype.addEdge

        return sm;
    }
}





class StateSmithUIStyles {

    addInitialStateStyle() {
        let style = this;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
        style[mxConstants.STYLE_ASPECT] = "fixed";
        style[mxConstants.STYLE_FILLCOLOR] = "#000000";
        style[mxConstants.STYLE_RESIZABLE] = 0;
        style[mxConstants.STYLE_ROTATABLE] = 0;
        style[mxConstants.STYLE_NOLABEL] = 1;
        style[mxConstants.STYLE_EDITABLE] = 0; // can be unlocked in draw.io, but not the vscode extension.

        return this;
    }

    addExitPointStyle() {
        let style = this;
        this.addRegularTextStyle();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
        style[mxConstants.STYLE_ASPECT] = "fixed";
        style[mxConstants.STYLE_RESIZABLE] = 0;
        style[mxConstants.STYLE_ROTATABLE] = 0;

        style[mxConstants.STYLE_LABEL_POSITION] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_TOP;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;

        style[mxConstants.STYLE_STROKECOLOR] = "#b11f1f";
        style[mxConstants.STYLE_STROKEWIDTH] = 4;
        style[mxConstants.STYLE_FILLCOLOR] = "#FFFFFF";
        style[mxConstants.STYLE_GRADIENTCOLOR] = "#d4d4d4cc";

        return this;
    }

    addEntryPointStyle() {
        let style = this.addExitPointStyle();
        style[mxConstants.STYLE_STROKECOLOR] = "#27ae27";

        return this;
    }

    addHistoryVertexStyle() {
        let style = this;
        this.addRegularTextStyle();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;

        style[mxConstants.STYLE_ASPECT] = "fixed";
        style[mxConstants.STYLE_RESIZABLE] = 0;
        style[mxConstants.STYLE_ROTATABLE] = 0;
        style[mxConstants.STYLE_EDITABLE] = 0; // can be unlocked in draw.io, but not the vscode extension.

        style[mxConstants.STYLE_LABEL_POSITION] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;

        style[mxConstants.STYLE_STROKECOLOR] = "#d79b00";
        style[mxConstants.STYLE_STROKEWIDTH] = 1;
        style[mxConstants.STYLE_FILLCOLOR] = "#ffcd28";
        style[mxConstants.STYLE_GRADIENTCOLOR] = "#ffa500";
        style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_NORTH;

        style["html"] = 1; // enables formatted text
        style[mxConstants.STYLE_FONTCOLOR] = "#000000";
        style[mxConstants.STYLE_FONTFAMILY] = "Helvetica";
        style[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD;

        return this;
    }

    addChoicePointStyle(hideLabel) {
        let style = this;
        this.addRegularTextStyle();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
        // style[mxConstants.STYLE_ASPECT] = "fixed";
        // style[mxConstants.STYLE_RESIZABLE] = 0;
        style[mxConstants.STYLE_ROTATABLE] = 0;

        style[mxConstants.STYLE_LABEL_POSITION] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_TOP;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;

        style[mxConstants.STYLE_STROKEWIDTH] = 1;
        style[mxConstants.STYLE_FILLCOLOR] = "#FFFFFF";
        style[mxConstants.STYLE_GRADIENTCOLOR] = "#d4d4d4cc";

        if (hideLabel)
            style[mxConstants.STYLE_NOLABEL] = 1;

        return this;
    }

    addNotesStyle() {
        let style = this;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
        this.addVertexRoundingStyle();

        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
        style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
        style["html"] = 1; // enables formatted text
        style[mxConstants.STYLE_SPACING_LEFT] = 4;

        style[mxConstants.STYLE_STROKEWIDTH] = 1;
        style[mxConstants.STYLE_STROKECOLOR] = "default";
        style[mxConstants.STYLE_FILLCOLOR] = "#fff2cc";
        style[mxConstants.STYLE_FONTCOLOR] = "#000000";
        style[mxConstants.STYLE_GRADIENTCOLOR] = "#ffd966";

        return this;
    }


    addGroupStyle() {
        let style = this;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
        style[mxConstants.STYLE_ROTATABLE] = 0;
        // style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
        // style[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
        // style[mxConstants.STYLE_STROKECOLOR] = '#000000';
        // style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style[mxConstants.STYLE_FONTFAMILY] = "Lucida Console";
        style[mxConstants.STYLE_STARTSIZE] = '30';
        style[mxConstants.STYLE_FONTSIZE] = '14';
        style[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD;
        style[mxConstants.STYLE_FONTCOLOR] = "#FAFAFA";
        
        style[mxConstants.STYLE_FILLCOLOR] = "#545454";
        style[mxConstants.STYLE_SWIMLANE_FILLCOLOR] = "default";

        // style["html"] = 1; // enables formatted text

        this.addVertexRoundingStyle();
        return this;
    }

    addSimpleStateStyle() {
        let style = this.addVertexRoundingStyle().addRegularTextStyle();
        style["html"] = 1; // enables formatted text
        style[mxConstants.STYLE_SPACING_LEFT] = 4;
        return this;
    }

    /**
     * for https://github.com/adamfk/state-designer/issues/11
     */
    addVertexRoundingStyle() {
        let style = this;
        style[mxConstants.STYLE_ROUNDED] = 1;
        style[mxConstants.STYLE_ARCSIZE] = 15;
        style[mxConstants.STYLE_ABSOLUTE_ARCSIZE] = 1; //`1` means enabled.
        return this;
    }

    addRegularTextStyle() {
        let style = this;
        style[mxConstants.STYLE_FONTFAMILY] = "Lucida Console";
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
        return this;
    }

    addEventHandlerTextStyle() {
        let style = this;
        this.addRegularTextStyle();
        style[mxConstants.STYLE_FILLCOLOR] = mxConstants.NONE;
        style[mxConstants.STYLE_GRADIENTCOLOR] = mxConstants.NONE;
        style[mxConstants.STYLE_STROKECOLOR] = mxConstants.NONE;
        style[mxConstants.STYLE_ROUNDED] = 0;
        style[mxConstants.STYLE_SPACING_LEFT] = '4';
        style[mxConstants.STYLE_RESIZABLE] = 0;
        style[mxConstants.STYLE_MOVABLE] = 0;
        style[mxConstants.STYLE_DELETABLE] = 0;
        style[mxConstants.STYLE_ROTATABLE] = 0;
        style[mxConstants.STYLE_AUTOSIZE] = 1;
        return this;
    }

    toString() {
        let str = '';
        for (const [p, val] of Object.entries(this)) {
            str += `${p}=${val};`;
        }
        return str;
    }
}

Draw.loadPlugin(function (ui) {
    let graph = ui.editor.graph;
    window.stateSmithDebugGraph = graph;

    // graph.allowDanglingEdges = true;

    // DO NOT ENABLE `constrainChildren` until https://github.com/jgraph/drawio/issues/3274 bug is fixed. When enabled, resizing a collapsed group squashes and moves around the group contents.
    // graph.constrainChildren = true;  //prevent children from being outside of parent group
    graph.extendParentsOnAdd = false;   //see issue #1
    graph.keepEdgesInForeground = true; //prevent edges from being behind vertices. see issue #5

    let toolbar = ui.toolbar;
    toolbar.addSeparator();
    let elts = toolbar.addItems(['enterGroup', 'exitGroup']);
    elts[0].setAttribute('title', mxResources.get('enterGroup') + ' (' + toolbar.editorUi.actions.get('enterGroup').shortcut + ')');
    elts[1].setAttribute('title', mxResources.get('exitGroup') + ' (' + toolbar.editorUi.actions.get('exitGroup').shortcut + ')');


    let ssui = new StateSmithUI2();
    ssui.addCustomEnterGroupHandlerForView(graph);
    ssui.addCustomExitGroupHandlerForFittingGroupToKids(graph);
    ssui.addCustomExitGroupHandlerForRestoringView(graph);  // must happen after addCustomExitGroupHandlerForFittingGroupToKids
    ssui.enableCustomDoubleClickHandler(graph);
    ssui.addStateShapesPaletteToSidebar(ui.sidebar);
    ssui.addCustomGroupingBehavior(graph);
});

if (false) {
    // useful for getting access to graph
    Draw.loadPlugin(function (ui) {
        window.my_graph = ui.editor.graph;
    });
}
