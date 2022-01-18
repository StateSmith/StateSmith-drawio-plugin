// StateSmithUi.js
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


// StateSmithUiStyles.js
// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithUiStyles.js
// you can alternatively save a script file in chrome dev tools sources.

// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

class StateSmithUiStyles {

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

    /**
     * @param {boolean} [hideLabel]
     */
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


// StateSmithCustomGrouper.js
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


// StateSmithCustomUnGroup.js
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


// StateSmithEnterExitHandler.js
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
     * @type {ssViewFrame[]}
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
            //remember `this` will be of type `mxGraph/Graph`

            /** @type {mxCell} */
            let group = this.getCurrentRoot();
            originalExitGroup.apply(this, arguments);
            self.fitExpandedGroupToChildren(group);
        };
    }

    addCustomEnterGroupHandlerForView() {
        let graph = this.graph;
        let self = this;
        let oldEnterGroupFunc = graph.enterGroup;
        graph.enterGroup = function () {
            //remember `this` will be of type `mxGraph/Graph`

            /** @type {HTMLDivElement} */
            let container = graph.container;
            let frameRoot = this.getCurrentRoot();
            self._removeAnyViewFrameWithMatchingRoot(frameRoot)
            self.viewStack.push({ x: container.scrollLeft, y: container.scrollTop, scale: this.view.getScale(), frameCurrentRoot: frameRoot });    // todolow - create actual ssViewFrame object

            oldEnterGroupFunc.apply(this, arguments);

            graph.maxFitScale = 1.0;
            graph.minFitScale = 1.0;
            graph.fit(null, null, 100);

            container.scrollLeft -= 50;
            container.scrollTop -= 100;
        };
    }

    /**
     * @param {mxCell} rootCell
     */
    _removeAnyViewFrameWithMatchingRoot(rootCell) {
        let cleanedStack = [];

        this.viewStack.forEach(frame => {
            if (frame.frameCurrentRoot != rootCell) {
                cleanedStack.push(frame);
            }
        });

        this.viewStack = cleanedStack;
    }

    /**
     * must happen after addCustomExitGroupHandlerForFittingGroupToKids
     */
    addCustomExitGroupHandlerForRestoringView() {
        let graph = this.graph;
        let self = this;

        {
            /** @type {{ (): void; apply: any; }}  */
            let originalExitGroup = graph.exitGroup;
            graph.exitGroup = function () {
                //remember `this` will be of type `mxGraph/Graph`
                self._restoringExitHandler(originalExitGroup);
            };
        }

        {
            let home = graph.home;
            graph.home = function () {
                self._clearViewStack();
                home.apply(this);
            }
        }
    }

    /**
     * @param {{ (): void; apply: any; }} originalExitGroup
     */
    _restoringExitHandler(originalExitGroup)
    {
        //remember `this` will be of type `mxGraph`
        let toRestore = this._getViewFrameForCurrentRoot();
        if (toRestore == null)
        {
            originalExitGroup.apply(this.graph);
            return;
        }

        // when enterGroup happened, it may have skipped some levels. Keep exiting until we have exited to the proper parent.
        // It's proper that we keep exiting so that things like addCustomExitGroupHandlerForFittingGroupToKids can happen for all levels.
        this._exitUntilRestoreReached(originalExitGroup, toRestore);

        // drawio CTRL+Z undo action can exit a group... makes life tricky.
        if (this.graph.getCurrentRoot() == null)
            this._clearViewStack();

        this.graph.view.setScale(toRestore.scale);
        /** @type {HTMLDivElement} */
        let container = this.graph.container;
        container.scrollLeft = toRestore.x;
        container.scrollTop = toRestore.y;
    }

    _getViewFrameForCurrentRoot() {
        this._cleanViewStack();
        let frame = this.viewStack.pop();
        return frame;
    }

    /**
     * drawio CTRL+Z undo action can enter/exit a group and make a mess of our stack.
     * remove any frame that has a root not in the current ancestors.
     */
    _cleanViewStack() {
        let cleanedStack = [];
        let validFrameRoots = StateSmithModel.collectAncestorsAndSelf(this.graph.getCurrentRoot());
        validFrameRoots.push(null); // for top level

        this.viewStack.forEach(frame => {
            if (validFrameRoots.includes(frame.frameCurrentRoot)) {
                cleanedStack.push(frame);
            }
        });

        this.viewStack = cleanedStack;
    }

    _clearViewStack() {
        this.viewStack = [];
    }



    /**
     * @param {{ (): void; apply: any; }} originalExitGroup
     * @param {ssViewFrame} toRestore
     */
    _exitUntilRestoreReached(originalExitGroup, toRestore) {
        
        /** @type {mxCell} */
        let currentRoot = this.graph.getCurrentRoot();
        while (true)
        {
            if (toRestore.frameCurrentRoot == currentRoot)
                return;

            if (currentRoot == null || currentRoot.parent == null)
                return;
            
            originalExitGroup.apply(this.graph);
            currentRoot = this.graph.getCurrentRoot();
        }
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


// StateSmithImages.js
class StateSmithImages
{
    // icons should be 21 x 21 pixels
    // generate to url base64 with https://base64.guru/converter/encode/image/svg
    
    // https://icons.getbootstrap.com/icons/house/
    static home = () => 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDIxIDIxIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4zMzM4OSwwLDAsMS4zMzM4OSwtMC4xNzEwOTcsLTAuMjA2MDE4KSI+CiAgICAgICAgPHBhdGggZD0iTTguNzA3LDEuNUM4LjMxOSwxLjExMiA3LjY4MSwxLjExMiA3LjI5MywxLjVMMC42NDYsOC4xNDZDMC41NTIsOC4yNCAwLjQ5OSw4LjM2NyAwLjQ5OSw4LjVDMC40OTksOC43NzUgMC43MjUsOS4wMDEgMSw5LjAwMUMxLjEzMyw5LjAwMSAxLjI2LDguOTQ4IDEuMzU0LDguODU0TDIsOC4yMDdMMiwxMy41QzIsMTQuMzIzIDIuNjc3LDE1IDMuNSwxNUwxMi41LDE1QzEzLjMyMywxNSAxNCwxNC4zMjMgMTQsMTMuNUwxNCw4LjIwN0wxNC42NDYsOC44NTRDMTQuNzQsOC45NDggMTQuODY3LDkuMDAxIDE1LDkuMDAxQzE1LjI3NSw5LjAwMSAxNS41MDEsOC43NzUgMTUuNTAxLDguNUMxNS41MDEsOC4zNjcgMTUuNDQ4LDguMjQgMTUuMzU0LDguMTQ2TDEzLDUuNzkzTDEzLDIuNUMxMywyLjIyNiAxMi43NzQsMiAxMi41LDJMMTEuNSwyQzExLjIyNiwyIDExLDIuMjI2IDExLDIuNUwxMSwzLjc5M0w4LjcwNywxLjVaTTEzLDcuMjA3TDEzLDEzLjVDMTMsMTMuNzc0IDEyLjc3NCwxNCAxMi41LDE0TDMuNSwxNEMzLjIyNiwxNCAzLDEzLjc3NCAzLDEzLjVMMyw3LjIwN0w4LDIuMjA3TDEzLDcuMjA3WiIgc3R5bGU9ImZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgPC9nPgo8L3N2Zz4K)';
    
    // https://icons.getbootstrap.com/icons/box-arrow-in-right/
    static enter = () => 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDIxIDIxIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yNDA4LDAsMCwxLjI0MDgsLTAuMzc0MDIsMC41NzM1NzQpIj4KICAgICAgICA8cGF0aCBkPSJNNiwzLjVDNiwzLjIyNiA2LjIyNiwzIDYuNSwzTDE0LjUsM0MxNC43NzQsMyAxNSwzLjIyNiAxNSwzLjVMMTUsMTIuNUMxNSwxMi43NzQgMTQuNzc0LDEzIDE0LjUsMTNMNi41LDEzQzYuMjI2LDEzIDYsMTIuNzc0IDYsMTIuNUw2LDEwLjVDNiwxMC4yMjYgNS43NzQsMTAgNS41LDEwQzUuMjI2LDEwIDUsMTAuMjI2IDUsMTAuNUw1LDEyLjVDNSwxMy4zMjMgNS42NzcsMTQgNi41LDE0TDE0LjUsMTRDMTUuMzIzLDE0IDE2LDEzLjMyMyAxNiwxMi41TDE2LDMuNUMxNiwyLjY3NyAxNS4zMjMsMiAxNC41LDJMNi41LDJDNS42NzcsMiA1LDIuNjc3IDUsMy41TDUsNS41QzUsNS43NzQgNS4yMjYsNiA1LjUsNkM1Ljc3NCw2IDYsNS43NzQgNiw1LjVMNiwzLjVaIi8+CiAgICA8L2c+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI0MDgsMCwwLDEuMjQwOCwtMC4zNzQwMiwwLjU3MzU3NCkiPgogICAgICAgIDxwYXRoIGQ9Ik0xMS44NTQsOC4zNTRDMTEuOTQ4LDguMjYgMTIuMDAxLDguMTMzIDEyLjAwMSw4QzEyLjAwMSw3Ljg2NyAxMS45NDgsNy43NCAxMS44NTQsNy42NDZMOC44NTQsNC42NDZDOC43Niw0LjU1MiA4LjYzMyw0LjQ5OSA4LjUsNC40OTlDOC4yMjUsNC40OTkgNy45OTksNC43MjUgNy45OTksNUM3Ljk5OSw1LjEzMyA4LjA1Miw1LjI2IDguMTQ2LDUuMzU0TDEwLjI5Myw3LjVMMS41LDcuNUMxLjIyNiw3LjUgMSw3LjcyNiAxLDhDMSw4LjI3NCAxLjIyNiw4LjUgMS41LDguNUwxMC4yOTMsOC41TDguMTQ2LDEwLjY0NkM4LjA1MiwxMC43NCA3Ljk5OSwxMC44NjcgNy45OTksMTFDNy45OTksMTEuMjc1IDguMjI1LDExLjUwMSA4LjUsMTEuNTAxQzguNjMzLDExLjUwMSA4Ljc2LDExLjQ0OCA4Ljg1NCwxMS4zNTRMMTEuODU0LDguMzU0WiIvPgogICAgPC9nPgo8L3N2Zz4K)';

    // https://icons.getbootstrap.com/icons/box-arrow-left/
    static exit = () => 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDIxIDIxIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yNTI5NSwwLDAsMS4yNTI5NSwwLjQ3NjUwNywwLjQ3NjM5NCkiPgogICAgICAgIDxwYXRoIGQ9Ik02LDEyLjVDNiwxMi43NzQgNi4yMjYsMTMgNi41LDEzTDE0LjUsMTNDMTQuNzc0LDEzIDE1LDEyLjc3NCAxNSwxMi41TDE1LDMuNUMxNSwzLjIyNiAxNC43NzQsMyAxNC41LDNMNi41LDNDNi4yMjYsMyA2LDMuMjI2IDYsMy41TDYsNS41QzYsNS43NzQgNS43NzQsNiA1LjUsNkM1LjIyNiw2IDUsNS43NzQgNSw1LjVMNSwzLjVDNSwyLjY3NyA1LjY3NywyIDYuNSwyTDE0LjUsMkMxNS4zMjMsMiAxNiwyLjY3NyAxNiwzLjVMMTYsMTIuNUMxNiwxMy4zMjMgMTUuMzIzLDE0IDE0LjUsMTRMNi41LDE0QzUuNjc3LDE0IDUsMTMuMzIzIDUsMTIuNUw1LDEwLjVDNSwxMC4yMjYgNS4yMjYsMTAgNS41LDEwQzUuNzc0LDEwIDYsMTAuMjI2IDYsMTAuNUw2LDEyLjVaIi8+CiAgICA8L2c+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI1Mjk1LDAsMCwxLjI1Mjk1LDAuNDc2NTA3LDAuNDc2Mzk0KSI+CiAgICAgICAgPHBhdGggZD0iTTAuMTQ2LDguMzU0QzAuMDUyLDguMjYgLTAuMDAxLDguMTMzIC0wLjAwMSw4Qy0wLjAwMSw3Ljg2NyAwLjA1Miw3Ljc0IDAuMTQ2LDcuNjQ2TDMuMTQ2LDQuNjQ2QzMuMjQsNC41NTIgMy4zNjcsNC40OTkgMy41LDQuNDk5QzMuNzc1LDQuNDk5IDQuMDAxLDQuNzI1IDQuMDAxLDVDNC4wMDEsNS4xMzMgMy45NDgsNS4yNiAzLjg1NCw1LjM1NEwxLjcwNyw3LjVMMTAuNSw3LjVDMTAuNzc0LDcuNSAxMSw3LjcyNiAxMSw4QzExLDguMjc0IDEwLjc3NCw4LjUgMTAuNSw4LjVMMS43MDcsOC41TDMuODU0LDEwLjY0NkMzLjk0OCwxMC43NCA0LjAwMSwxMC44NjcgNC4wMDEsMTFDNC4wMDEsMTEuMjc1IDMuNzc1LDExLjUwMSAzLjUsMTEuNTAxQzMuMzY3LDExLjUwMSAzLjI0LDExLjQ0OCAzLjE0NiwxMS4zNTRMMC4xNDYsOC4zNTRaIi8+CiAgICA8L2c+Cjwvc3ZnPgo=)';
}


// StateSmithModel.js
// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithX.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

/**
 * The point of this class is to help centralize dependencies on mxGraph calls as
 * that API is may change.
 */
class StateSmithModel {
    /** @type {mxGraph} */
    graph = null;

    /** @type {mxGraphModel} */
    model = null;

    /** @type {StateSmithUi} */
    ssUi = null;

    /**
     * @param {mxGraph} graph
     * @param {StateSmithUi} ssUi
     */
    constructor(ssUi, graph) {
        this.ssUi = ssUi;
        this.graph = graph;
        this.model = graph.model;
    }

    /**
     * @param {mxCell} cell
     */
    static hasStateMachineParent(cell) {
        return this.findStateMachineAncestor(cell.parent) != null;
    }

    /**
     * @param {mxCell} cell
     */
    static isStateMachineNode(cell) {
        /** @type {string} */
        let name = cell.value || "";

        if (name.toUpperCase().match(/^\s*[$]STATEMACHINE\s*:\s*\w+/))
            return true;
    }

    /**
     * @param {mxCell} cell
     */
    static isPartOfStateSmith(cell) {
        let result = this.isStateMachineNode(cell) || this.hasStateMachineParent(cell);
        return result;
    }

    /**
     * @param {mxCell} cell
     * @param {(cell: mxCell) => void} visitingFunction
     */
    static visitVertices(cell, visitingFunction) {
        if (cell == null)
            return;
        
        visitingFunction(cell);
        
        if (cell.children == null)
            return
        
        cell.children.forEach((/** @type {mxCell} */ kid) => {
            if (!kid.isVertex())
                return;
            this.visitVertices(kid, visitingFunction);
        });
    }

    /**
     * @param {mxCell} cell
     */
    static findStateMachineAncestor(cell) {
        while (cell != null) {
            if (this.isStateMachineNode(cell))
                return cell;

            cell = cell.parent;
        }

        return null;
    }

    /**
     * @param {mxGraph} graph
     * @returns {mxGraphModel}
     */
    static getModelFromGraph(graph) {
        return graph.getModel();
    }

    /**
     * @param {mxCell} cell
     */
    static getParent(cell)
    {
        if (!cell)
            return null

        return cell.parent;
    }

    /**
     * @param {mxCell} cell
     */
    static collectAncestors(cell)
    {
        let ancestors = [];
        cell = this.getParent(cell);

        while (cell != null)
        {
            ancestors.push(cell);
            cell = this.getParent(cell);
        }

        return ancestors;
    }

    /**
     * @param {mxCell} cell
     */
    static collectAncestorsAndSelf(cell)
    {
        let ancestors = this.collectAncestors(cell);
        ancestors.splice(0, 0, cell);
        return ancestors;
    }
}


// StateSmithNewStateNamer.js
// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithX.js
// you can alternatively save a script file in chrome dev tools sources.

// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

class StateSmithNewStateNamer {

    /** @type {mxGraph} */
    graph = null;

    /** @type {mxGraphModel} */
    model = null;

    /** @type {StateSmithUi} */
    ssUi = null;

    importActive = false;

    /**
     * @param {mxGraph} graph
     * @param {StateSmithUi} ssUi
     */
    constructor(ssUi, graph) {
        this.ssUi = ssUi;
        this.graph = graph;
        this.model = graph.model;

        this.overrideDrawioFunction();
    }

    overrideDrawioFunction() {
        let graph = this.graph;
        let self = this;

        {
            // The function `importGraphModel()` is dynamically added by draw.io so intellisense can't see it.
            // search for the following in source: Graph.prototype.importGraphModel
            // Note that `Graph` type is a subclass of `mxGraph`.
            let oldImport = graph["importGraphModel"];
            graph["importGraphModel"] = function() {
                self.importActive = true;
                let result = oldImport.apply(this, arguments);
                self.importActive = false;
                return result;
            };
        }

        {
            let oldFunc = graph.cellsAdded;
            /** @param {mxCell[]} cells */
            graph.cellsAdded = function(cells, parent) {
                self.cellsAdded(cells, parent);
                return oldFunc.apply(this, arguments);
            };
        }
    }

    /**
     * @param {mxCell[]} cells
     */
    newCellsAreBeingAdded(cells) {
        if (this.importActive)
            return true;

        let isNewlyAdded = false;
        cells.forEach(cell => {
            isNewlyAdded = cell.parent == null;
            if (isNewlyAdded)
                return; // from forEach function
        });

        return isNewlyAdded
    }

    /**
     * Note! Draw.io calls this function even when moving existing cells,
     * not just when added which is un-intuitive.
     * @param {mxCell[]} cells
     * @param {mxCell} parent
     */
    cellsAdded(cells, parent) {
        if (!this.newCellsAreBeingAdded(cells))
            return;

        let existingNames = [""];
        let smRoot = StateSmithModel.findStateMachineAncestor(parent);
        StateSmithModel.visitVertices(smRoot, vertex => existingNames.push(vertex.value));

        cells.forEach(cell => {
            let isNewlyAdded = cell.parent == null || this.importActive;

            if (isNewlyAdded && cell.isVertex() && StateSmithModel.isPartOfStateSmith(parent)) {
                this.renameCellBeingAdded(cell, existingNames);
            }
        });
    }

    /**
     * @param {mxCell} cell
     * @param {string[]} existingNames
     */
    renameCellBeingAdded(cell, existingNames)
    {
        /** @type {string} */
        let label = cell.value || "";

        if (!this.isRenamingTarget(cell) || label.trim() == "") {
            return;
        }

        let match = label.match(/^\s*(\w+?)(\d+)\s*$/) || [label, label, "1"];

        let nameStart = match[1];
        let postfixNumber = parseInt(match[2]);
        let newLabel = nameStart + postfixNumber;

        while (existingNames.includes(newLabel))
        {
            postfixNumber++;
            newLabel = nameStart + postfixNumber;
        }

        existingNames.push(newLabel);
        cell.value = newLabel;
    }

    /**
     * @param {mxCell} cell
     */
    isRenamingTarget(cell) {
        /** @type {string} */
        let value = cell.value || "";
        value = value.trim();
        return StateSmithModel.isStateMachineNode(cell) || (value.match(/^\s*\w+\s*$/) != null);
    }
}


// StateSmithSmarterDelete.js
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


// plugin.js
// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmith-drawio-plugin.js
// you can alternatively save a script file in chrome dev tools sources.

// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

/**
 * @param {{ editor: Editor; toolbar: Toolbar; sidebar: Sidebar; }} app
 * `ui` is actually of type {App}, but intellisense can't make too much sense of it...
 */
function StateSmith_drawio_plugin(app) {

    /**
     * @type {mxGraph}
     */
    let graph = app.editor.graph;

    window["stateSmithDebugGraph"] = graph;
    window["stateSmithDebugApp"] = app;

    // graph.allowDanglingEdges = true;
    // DO NOT ENABLE `constrainChildren` until https://github.com/jgraph/drawio/issues/3274 bug is fixed. When enabled, resizing a collapsed group squashes and moves around the group contents.
    // graph.constrainChildren = true;  //prevent children from being outside of parent group
    graph.extendParentsOnAdd = false; //see issue #1
    graph.keepEdgesInForeground = true; //prevent edges from being behind vertices. see issue #5

    let ssUi = new StateSmithUi(app, graph);
    ssUi.addToolbarButtons();
    ssUi.addCustomGroupEnterExiting();
    ssUi.addStateShapesPaletteToSidebar(app.sidebar);
    ssUi.addCustomGroupingBehavior();
    ssUi.addNewStateNamer();
    ssUi.addSmartDelete();
    ssUi.addCustomUnGroup();
}

window["Draw"].loadPlugin(StateSmith_drawio_plugin);


