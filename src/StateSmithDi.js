// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

/**
 * This class is meant to act like some very simple Dependency Injection to help
 * reduce the burden of wiring things up. More like service locator pattern.
 */
class StateSmithDi {

    static di = new StateSmithDi();

    _message = "This dependency was not set";

    /** @return {App} */
    getApp() { throw new Error(this._message); }

    /** @return {EditorUi} */
    getEditorUi() { throw new Error(this._message); }
    
    /**
     * @param {string} title
     * @param {string} message
     */
    showErrorModal(title, message) {
        title = "StateSmith: " + title;
        return StateSmithModel.callEditorUiHandleErrorFunction(this.getApp(), message, title);
    };

}
