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

    let toolbar = app.toolbar;
    toolbar.addSeparator();

    /** @type {EditorUi} */
    let editorUi = toolbar.editorUi;

    /** @type {Actions} */
    let actions = toolbar.editorUi.actions;

    /**
     * @type {(HTMLAnchorElement | HTMLDivElement | null)[]}
     */
    let elts = toolbar.addItems(['enterGroup', 'exitGroup']);
    elts[0].setAttribute('title', mxResources.get('enterGroup') + ' (' + actions.get('enterGroup').shortcut + ')');
    elts[1].setAttribute('title', mxResources.get('exitGroup') + ' (' + actions.get('exitGroup').shortcut + ')');

    let ssui = new StateSmithUi(app, graph);
    ssui.addCustomEnterGroupHandlerForView(graph);
    ssui.addCustomExitGroupHandlerForFittingGroupToKids(graph);
    ssui.addCustomExitGroupHandlerForRestoringView(graph); // must happen after addCustomExitGroupHandlerForFittingGroupToKids
    ssui.enableCustomDoubleClickHandler(graph);
    ssui.addStateShapesPaletteToSidebar(app.sidebar);
    ssui.addCustomGroupingBehavior(graph);
    ssui.addNewStateNamer(graph);
}

window["Draw"].loadPlugin(StateSmith_drawio_plugin);
