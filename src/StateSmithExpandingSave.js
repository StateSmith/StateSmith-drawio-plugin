// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithX.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

/**
 * https://github.com/StateSmith/StateSmith-drawio-plugin/issues/28
 */
class StateSmithExpandingSave {

    /** @type {StateSmithUi} */
    ssUi = null;

    /**
     * @param {StateSmithUi} ssUi
     */
    constructor(ssUi) {
        this.ssUi = ssUi;
    }

    overrideDrawioFunctions() {
        let graph = this.ssUi.graph;

        /** @type {any} */
        let app = this.ssUi.app;

        overrideSaveAction("save"); // this is for CTRL+S

        window.setTimeout(() => {
            overrideSaveAction("vscode.save");  // This is for vscode-draw.io custom save menu entry. action doesn't exist when StateSmith plugin loads so we wait a bit first
        }, 250);


        /**
         * @param {string} actionName
         */
        function overrideSaveAction(actionName) {
            let saveAction = app.actions.get(actionName); //"vscode.save", "save"

            if (!saveAction) {
                console.log(`StateSmith - couldn't get save action "${actionName}"`);
            }
            else {
                console.log(`StateSmith - overriding save action "${actionName}"`);

                let originalSaveFunc = saveAction.funct;
                saveAction.funct = function () {
                    let currentRoot = graph.view.currentRoot;

                    while (currentRoot != null) {
                        StateSmithModel.fitExpandedGroupToChildren(graph, currentRoot);
                        currentRoot = currentRoot.parent;
                    }

                    // Delay original save action because our change above needs a bit of time to take effect.
                    // Not sure how to make it take effect right away. Any ideas?
                    let funcOwner = this;
                    window.setTimeout(() => {
                        originalSaveFunc.apply(funcOwner, arguments);
                    }, 250);
                };
            }
        }
    }
}
