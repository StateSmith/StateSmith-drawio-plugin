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
            console.log("Wee!!! button pressed!");
            this.showDialog();
        });

        StateSmithUi.setToolbarElementImage(findByIdButton, StateSmithImages.findById());
    }

    showDialog() {
        /** @type {any} */
        const editorUi = this.app;
        var dlg = new FilenameDialog(editorUi, parseInt((this.graph.getView().getScale() * 100) + ""), mxResources.get('apply'), mxUtils.bind(this, function(newValue)
        {
        	var val = parseInt(newValue);
        	if (!isNaN(val) && val > 0)
        	{
        		this.graph.zoomTo(val / 100);
        	}
        }), mxResources.get('zoom') + ' (%)');
        editorUi.showDialog(dlg.container, 300, 80, true, true);
        dlg.init();
    }
}
