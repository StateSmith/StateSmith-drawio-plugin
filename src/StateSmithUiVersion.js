// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithX.js
// you can alternatively save a script file in chrome dev tools sources.
// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";
class StateSmithUiVersion {
    static MAJOR = () => 0;
    static MINOR = () => 6;
    static PATCH = () => 0;

    /** may be 'release' or 'wip' for work-in-progress  */
    static STATUS = () => "wip";

    static logToConsole() {
        console.log(`StatSmith plugin version: ${this.MAJOR()}.${this.MINOR()}.${this.PATCH()}-${this.STATUS()}`);
    }
}
