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
     * @param {mxGraph} graph
     * @param {{ editor: Editor; toolbar: Toolbar; sidebar: Sidebar; }} app
     */
    constructor(app, graph) {
        this.app = app;
        this.graph = graph;
        this.ssModel = new StateSmithModel(this, graph);
    }

    addToolbarButtons()
    {
        let toolbar = this.app.toolbar;
        toolbar.addSeparator();

        /** @type {Actions} */
        let actions = toolbar.editorUi.actions;

        /**
         * @type {(HTMLAnchorElement | HTMLDivElement | null)[]}
         */
        let elements = toolbar.addItems(['home', 'enterGroup', 'exitGroup']);
		elements[0].setAttribute('title', mxResources.get('home') + ' (' + actions.get('home').shortcut + ')');
        elements[1].setAttribute('title', mxResources.get('enterGroup') + ' (' + actions.get('enterGroup').shortcut + ')');
        elements[2].setAttribute('title', mxResources.get('exitGroup') + ' (' + actions.get('exitGroup').shortcut + ')');
	
        this._setToolbarElementImage(elements[0], StateSmithImages.home())
        this._setToolbarElementImage(elements[1], StateSmithImages.enter())
        this._setToolbarElementImage(elements[2], StateSmithImages.exit())
    }

    /**
     * @param {HTMLAnchorElement | HTMLDivElement} element
     * @param {string} imageStr
     */
    _setToolbarElementImage(element, imageStr)
    {
        let div = element.getElementsByTagName("div")[0];
        div.style.backgroundImage = imageStr;
    }

    addCustomGroupEnterExiting()
    {
        let enterExitHandler = new StateSmithEnterExitHandler(this, this.graph);

        enterExitHandler.addCustomEnterGroupHandlerForView();
        enterExitHandler.addCustomExitGroupHandlerForFittingGroupToKids();
        enterExitHandler.addCustomExitGroupHandlerForRestoringView(); // must happen after addCustomExitGroupHandlerForFittingGroupToKids
        enterExitHandler.enableCustomDoubleClickHandler();
    }

    addCustomGroupingBehavior() {
        new StateSmithCustomGrouper(this, this.graph).overrideDrawioFunction();
    }

    addNewStateNamer() {
        new StateSmithNewStateNamer(this, this.graph);
    }

    addSmartDelete() {
        new StateSmithSmarterDelete(this.graph).overrideDrawioFunction();
    }

    addCustomUnGroup() {
        new StateSmithCustomUnGroup(this.graph).overrideDrawioFunction();
    }

    /**
     *
     * @param {Sidebar} sidebar
     */
    addStateShapesPaletteToSidebar(sidebar) {
        let ssUi = this;

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
                return createTemplate(ssUi.makeStateMachine(sidebar.graph), "state machine");
            }),
            sidebar.addEntry(tags, function () {
                return createTemplate(ssUi.makeInitialState(), "initial state (hidden label)");
            }),
            sidebar.addEntry(tags, function () {
                return createTemplate(ssUi.makeCompositeState(), 'Composite State (enter, do, exit)');
            }),
            sidebar.addEntry(tags, function () {
                return createTemplate(ssUi.makeCompositeState(null, true), 'Composite State');
            }),
            // sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addSimpleStateStyle().toString(), 130, 65, `<b>STATE_123</b>\n${ssUi.getEnterDoExitCode()}`, 'Simple State with handlers', null, null, tags),
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
