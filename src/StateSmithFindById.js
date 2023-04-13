// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithUi.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check

"use strict";

class StateSmithFindById {

    /**
     * @param {mxGraph} graph
     * @param {App} app
     */
    constructor(app, graph) {
        this.app = app;
        this.graph = graph;
    }

    addToolbarButtons() {
        let toolbar = StateSmithModel.getToolbar(this.app);

        const findByIdButton = toolbar.addButton("someClassName", "Find by diagram ID", () => {
            this.showDialog();
        });

        StateSmithUi.setToolbarElementImage(findByIdButton, StateSmithImages.findById());
    }

    showDialog() {
        /** @type {any} */
        const editorUi = this.app;
        const graph = this.graph;
        const buttonText = "Find";
        const initialValue = "";

        // Why FilenameDialog? Because it is the simplest way to do what we want.
        // It is also used internally by draw.io for things like setting custom zoom so it seems OK.
        var dialog = new FilenameDialog(editorUi, initialValue, buttonText, mxUtils.bind(this, function(/** @type {string} */ targetId)
        {
            targetId = targetId.trim();
            const model = StateSmithModel.getModelFromGraph(graph);

            /** @type {mxCell} */
            const targetCell = model.getCell(targetId);
            if (!targetCell)
            {
                StateSmithDi.di.showErrorModal("No cell found", `Check the target cell ID '${targetId}'.`);
                return;
            }

            if (targetCell == model.getRoot() || targetCell.parent == model.getRoot())
            {
                StateSmithDi.di.showErrorModal("Special draw.io node", `We can't view this special draw.io node.`);
                return;
            }

            graph.view.setCurrentRoot(targetCell.parent);
            // this.graph.zoomTo(1.0); // might want to consider
            graph.scrollCellToVisible(targetCell, true);
            graph.setSelectionCell(targetCell);  // clears existing selection
        }), "ID to find");

        editorUi.showDialog(dialog.container, 300, 80, true, true);
        dialog.init();
    }
}
