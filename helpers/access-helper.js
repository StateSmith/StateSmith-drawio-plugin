// Paste into chrome console to set global window variables for easy inspection.
Draw.loadPlugin(function (app) {
    window.my_app = app;
    window.my_graph = app.editor.graph;
});