// below line allows you to see in chrome dev tools sources under `top > app.diagrams.net` if you inject it via the console. Great for setting breakpoints.
//# sourceURL=StateSmithUi.js
// you can alternatively save a script file in chrome dev tools sources.

// below line turns on typescript checking for this javascript file.
//@ts-check
"use strict";

class StateSmithFindById
{
    func(){
        // var dlg = new FilenameDialog(this.editorUi, parseInt(graph.getView().getScale() * 100), mxResources.get('apply'), mxUtils.bind(this, function(newValue)
		// {
		// 	var val = parseInt(newValue);
			
		// 	if (!isNaN(val) && val > 0)
		// 	{
		// 		graph.zoomTo(val / 100);
		// 	}
		// }), mxResources.get('zoom') + ' (%)');
		// this.editorUi.showDialog(dlg.container, 300, 80, true, true);
		// dlg.init();
    }
}

class StateSmithUi {

    /** @type {App} */
    app = null;

    /** @type {mxGraph} */
    graph = null;

    /** @type {StateSmithModel} */
    ssModel = null;

    /**
     * @param {mxGraph} graph
     * @param {App} app
     */
    constructor(app, graph) {
        this.app = app;
        this.graph = graph;
        this.ssModel = new StateSmithModel(graph);

        this._registerDependencyInjection();
    }

    addToolbarButtons()
    {
        let toolbar = StateSmithModel.getToolbar(this.app);
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
        
        const findByIdButton = toolbar.addButton("someClassName", "Find by diagram ID", () => {
            console.log("Wee!!! button pressed!")
        });

        this._setToolbarElementImage(findByIdButton, StateSmithImages.findById())
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
        enterExitHandler.addIntercepts();
    }

    addCustomOnSave()
    {
        let saver = new StateSmithExpandingSave(this);
        saver.overrideDrawioFunctions();
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

    // alternative to addCustomUnGroup()
    addUnGroupProtection() {
        new StateSmithUnGroupProtection(this.graph).overrideDrawioFunction();
    }

    // alternative to addUnGroupProtection()
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
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addExitPointStyle().toString(), 30, 30, `exit : 1`, 'Exit point', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addEntryPointStyle().toString(), 30, 30, `entry : 1`, 'Entry point', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addChoicePointStyle(true).toString(), 40, 40, `$choice`, 'Choice point (hidden label)', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addChoicePointStyle().toString(), 40, 40, `$choice : 1`, 'Choice point (visible label)', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addHistoryVertexStyle().toString(), 30, 30, `<font color="#bd890f">$</font>H`, 'History', null, null, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addHistoryVertexStyle().toString(), 30, 30, `<font color="#bd890f">$</font>HC`, 'History Continue', true, true, tags),
            sidebar.createVertexTemplateEntry(new StateSmithUiStyles().addNotesStyle().toString(), 250, 70, `<b>$NOTES</b>\nSome notes go here...`, 'Notes', null, null, tags),

            sidebar.addEntry(tags, function () {
                return createTemplate(ssUi.BuildRenderConfig(sidebar), 'Render Config');
            }),
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

        return sm;
    }

    /**
     * @param {Sidebar} sidebar
     */
    BuildRenderConfig(sidebar) {
        let cell = null;

        // use try catch to be safe incase draw.io changes xml code we rely on.
        try {
            // the below code is modified from `Sidebar.prototype.createVertexTemplateFromData`.
            // Customization is needed because the template has extra XML elements that are not expected and also,
            // we want to work with raw XML rather than 
            var doc = mxUtils.parseXml(this.getRenderConfigXml());
            var codec = new mxCodec(doc);

            var model = new mxGraphModel();
            codec.decode(doc.documentElement.children[0].children[0], model);

            cell = sidebar.graph.cloneCells(model.root.getChildAt(0).children)[0];            
        } catch (error) {
            cell = this.makeCompositeState("$RenderConfig", true);
        }

        return cell;
    }

    getRenderConfigXml() {
        // The below XML is copy pasted (and fixed for escaping backticks) from the RenderConfig.drawio template file.
        // todo_low - it would be nice to update below xml at build time from template file. https://github.com/StateSmith/StateSmith-drawio-plugin/issues/22
        var xml = `
            <mxfile host="65bd71144e">
            <diagram id="N3poQJyBd_SqZfrHNIMM" name="Page-1">
                <mxGraphModel dx="1023" dy="546" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
                    <root>
                        <mxCell id="0"/>
                        <mxCell id="1" parent="0"/>
                        <mxCell id="2" value="$RenderConfig" style="shape=swimlane;rotatable=0;align=center;verticalAlign=top;fontFamily=Lucida Console;startSize=30;fontSize=14;fontStyle=1;swimlaneFillColor=default;html=1;rounded=1;arcSize=15;absoluteArcSize=1;fillColor=#76608a;strokeColor=#432D57;fontColor=#ffffff;" vertex="1" collapsed="1" parent="1">
                            <mxGeometry width="210" height="70" as="geometry">
                                <mxRectangle width="840" height="650" as="alternateBounds"/>
                            </mxGeometry>
                        </mxCell>
                        <mxCell id="3" value="" style="fontFamily=Lucida Console;align=left;verticalAlign=top;fillColor=none;gradientColor=none;strokeColor=none;rounded=0;spacingLeft=4;resizable=0;movable=0;deletable=0;rotatable=0;autosize=1;" vertex="1" connectable="0" parent="2">
                            <mxGeometry y="30" width="50" height="40" as="geometry"/>
                        </mxCell>
                        <mxCell id="4" value="$CONFIG: AutoExpandedVars" style="shape=swimlane;rotatable=0;align=center;verticalAlign=top;fontFamily=Lucida Console;startSize=30;fontSize=14;fontStyle=1;swimlaneFillColor=default;html=1;rounded=1;arcSize=15;absoluteArcSize=1;fillColor=#76608a;fontColor=#ffffff;strokeColor=#432D57;" vertex="1" collapsed="1" parent="2">
                            <mxGeometry x="40" y="40" width="280" height="70" as="geometry">
                                <mxRectangle x="30" y="170" width="290" height="90" as="alternateBounds"/>
                            </mxGeometry>
                        </mxCell>
                        <mxCell id="5" value="// your variable declartions here like: &#10;// uint8_t count;" style="fontFamily=Lucida Console;align=left;verticalAlign=top;fillColor=none;gradientColor=none;strokeColor=none;rounded=0;spacingLeft=4;resizable=0;movable=0;deletable=0;rotatable=0;autosize=1;" vertex="1" connectable="0" parent="4">
                            <mxGeometry y="30" width="310" height="40" as="geometry"/>
                        </mxCell>
                        <mxCell id="6" value="&lt;b&gt;$NOTES&lt;/b&gt;&lt;br&gt;The &lt;b&gt;AutoExpandedVars &lt;/b&gt;render config section gives a convenient way to create a state machine variable and automatically add an expansion to it at the same time.&lt;br&gt;&lt;br&gt;It is combined with the C# &lt;b&gt;IRenderConfigC.&lt;/b&gt;&lt;b&gt;AutoExpandedVars&amp;nbsp;&lt;/b&gt;config.&lt;br&gt;&lt;br&gt;See&amp;nbsp;&lt;a href=&quot;https://github.com/StateSmith/StateSmith/issues/91&quot;&gt;https://github.com/StateSmith/StateSmith/issues/91&lt;/a&gt; for more info." style="shape=rectangle;rounded=1;arcSize=15;absoluteArcSize=1;align=left;verticalAlign=top;whiteSpace=wrap;html=1;spacingLeft=4;strokeWidth=1;strokeColor=default;fillColor=#fff2cc;fontColor=#000000;gradientColor=#ffd966;" vertex="1" parent="4">
                            <mxGeometry x="50" y="130" width="410" height="140" as="geometry"/>
                        </mxCell>
                        <mxCell id="7" value="&lt;b&gt;$NOTES&lt;/b&gt;&lt;br&gt;Diagram based RenderConfig support was added in StateSmith&amp;nbsp;version&amp;nbsp;0.7.7.&lt;br&gt;&lt;br&gt;See&amp;nbsp;&lt;a href=&quot;https://github.com/StateSmith/StateSmith/issues/23&quot;&gt;https://github.com/StateSmith/StateSmith/issues/23&lt;/a&gt;&amp;nbsp;for more info." style="shape=rectangle;rounded=1;arcSize=15;absoluteArcSize=1;align=left;verticalAlign=top;whiteSpace=wrap;html=1;spacingLeft=4;strokeWidth=1;strokeColor=default;fillColor=#fff2cc;fontColor=#000000;gradientColor=#ffd966;" vertex="1" parent="2">
                            <mxGeometry x="360" y="40" width="460" height="80" as="geometry"/>
                        </mxCell>
                        <mxCell id="8" value="&lt;b&gt;$NOTES&lt;/b&gt;&lt;br&gt;Generic expansions can only be created from the C# file within the &lt;b&gt;IRenderConfigC &lt;/b&gt;section for now." style="shape=rectangle;rounded=1;arcSize=15;absoluteArcSize=1;align=left;verticalAlign=top;whiteSpace=wrap;html=1;spacingLeft=4;strokeWidth=1;strokeColor=default;fillColor=#fff2cc;fontColor=#000000;gradientColor=#ffd966;" vertex="1" parent="2">
                            <mxGeometry x="360" y="160" width="460" height="70" as="geometry"/>
                        </mxCell>
                        <mxCell id="9" value="$CONFIG: HFileTop" style="shape=swimlane;rotatable=0;align=center;verticalAlign=top;fontFamily=Lucida Console;startSize=30;fontSize=14;fontStyle=1;swimlaneFillColor=default;html=1;rounded=1;arcSize=15;absoluteArcSize=1;fillColor=#76608a;fontColor=#ffffff;strokeColor=#432D57;" vertex="1" collapsed="1" parent="2">
                            <mxGeometry x="40" y="160" width="280" height="70" as="geometry">
                                <mxRectangle x="30" y="60" width="290" height="90" as="alternateBounds"/>
                            </mxGeometry>
                        </mxCell>
                        <mxCell id="10" value="// User RenderConfig HFileTop text..." style="fontFamily=Lucida Console;align=left;verticalAlign=top;fillColor=none;gradientColor=none;strokeColor=none;rounded=0;spacingLeft=4;resizable=0;movable=0;deletable=0;rotatable=0;autosize=1;" vertex="1" connectable="0" parent="9">
                            <mxGeometry y="30" width="290" height="30" as="geometry"/>
                        </mxCell>
                        <mxCell id="11" value="&lt;b&gt;$NOTES&lt;/b&gt;&lt;br&gt;Anything you type in the &lt;b&gt;HFileTop&amp;nbsp;&lt;/b&gt;vertex ends up at the top of the generated .h file. It is combined with the C# &lt;b&gt;IRenderConfigC.HFileTop&lt;/b&gt; config." style="shape=rectangle;rounded=1;arcSize=15;absoluteArcSize=1;align=left;verticalAlign=top;whiteSpace=wrap;html=1;spacingLeft=4;strokeWidth=1;strokeColor=default;fillColor=#fff2cc;fontColor=#000000;gradientColor=#ffd966;" vertex="1" parent="9">
                            <mxGeometry x="50" y="130" width="330" height="70" as="geometry"/>
                        </mxCell>
                        <mxCell id="12" value="$CONFIG: HFileIncludes" style="shape=swimlane;rotatable=0;align=center;verticalAlign=top;fontFamily=Lucida Console;startSize=30;fontSize=14;fontStyle=1;swimlaneFillColor=default;html=1;rounded=1;arcSize=15;absoluteArcSize=1;fillColor=#76608a;fontColor=#ffffff;strokeColor=#432D57;" vertex="1" collapsed="1" parent="2">
                            <mxGeometry x="40" y="240" width="280" height="70" as="geometry">
                                <mxRectangle x="30" y="60" width="290" height="90" as="alternateBounds"/>
                            </mxGeometry>
                        </mxCell>
                        <mxCell id="13" value="// User RenderConfig HFileIncludes text..." style="fontFamily=Lucida Console;align=left;verticalAlign=top;fillColor=none;gradientColor=none;strokeColor=none;rounded=0;spacingLeft=4;resizable=0;movable=0;deletable=0;rotatable=0;autosize=1;" vertex="1" connectable="0" parent="12">
                            <mxGeometry y="30" width="330" height="30" as="geometry"/>
                        </mxCell>
                        <mxCell id="14" value="&lt;b&gt;$NOTES&lt;/b&gt;&lt;br&gt;Anything you type in the &lt;b&gt;HFileIncludes &lt;/b&gt;vertex ends up in the generated .h file. It is combined with the C# &lt;b&gt;IRenderConfigC.HFileIncludes&lt;/b&gt; config." style="shape=rectangle;rounded=1;arcSize=15;absoluteArcSize=1;align=left;verticalAlign=top;whiteSpace=wrap;html=1;spacingLeft=4;strokeWidth=1;strokeColor=default;fillColor=#fff2cc;fontColor=#000000;gradientColor=#ffd966;" vertex="1" parent="12">
                            <mxGeometry x="40" y="120" width="330" height="70" as="geometry"/>
                        </mxCell>
                        <mxCell id="15" value="$CONFIG: CFileTop" style="shape=swimlane;rotatable=0;align=center;verticalAlign=top;fontFamily=Lucida Console;startSize=30;fontSize=14;fontStyle=1;swimlaneFillColor=default;html=1;rounded=1;arcSize=15;absoluteArcSize=1;fillColor=#76608a;fontColor=#ffffff;strokeColor=#432D57;" vertex="1" collapsed="1" parent="2">
                            <mxGeometry x="40" y="360" width="280" height="70" as="geometry">
                                <mxRectangle x="30" y="170" width="290" height="90" as="alternateBounds"/>
                            </mxGeometry>
                        </mxCell>
                        <mxCell id="16" value="// User RenderConfig CFileTop text..." style="fontFamily=Lucida Console;align=left;verticalAlign=top;fillColor=none;gradientColor=none;strokeColor=none;rounded=0;spacingLeft=4;resizable=0;movable=0;deletable=0;rotatable=0;autosize=1;" vertex="1" connectable="0" parent="15">
                            <mxGeometry y="30" width="290" height="30" as="geometry"/>
                        </mxCell>
                        <mxCell id="17" value="&lt;b&gt;$NOTES&lt;/b&gt;&lt;br&gt;Anything you type in the &lt;b&gt;CFileTop&amp;nbsp;&lt;/b&gt;vertex ends up at the top of the generated .c file. It is combined with the C# &lt;b&gt;IRenderConfigC.CFileTop&lt;/b&gt; config." style="shape=rectangle;rounded=1;arcSize=15;absoluteArcSize=1;align=left;verticalAlign=top;whiteSpace=wrap;html=1;spacingLeft=4;strokeWidth=1;strokeColor=default;fillColor=#fff2cc;fontColor=#000000;gradientColor=#ffd966;" vertex="1" parent="15">
                            <mxGeometry x="60" y="140" width="330" height="70" as="geometry"/>
                        </mxCell>
                        <mxCell id="18" value="$CONFIG: CFileIncludes" style="shape=swimlane;rotatable=0;align=center;verticalAlign=top;fontFamily=Lucida Console;startSize=30;fontSize=14;fontStyle=1;swimlaneFillColor=default;html=1;rounded=1;arcSize=15;absoluteArcSize=1;fillColor=#76608a;fontColor=#ffffff;strokeColor=#432D57;" vertex="1" collapsed="1" parent="2">
                            <mxGeometry x="40" y="440" width="280" height="70" as="geometry">
                                <mxRectangle x="30" y="170" width="290" height="90" as="alternateBounds"/>
                            </mxGeometry>
                        </mxCell>
                        <mxCell id="19" value="// User RenderConfig CFileIncludes text..." style="fontFamily=Lucida Console;align=left;verticalAlign=top;fillColor=none;gradientColor=none;strokeColor=none;rounded=0;spacingLeft=4;resizable=0;movable=0;deletable=0;rotatable=0;autosize=1;" vertex="1" connectable="0" parent="18">
                            <mxGeometry y="30" width="330" height="30" as="geometry"/>
                        </mxCell>
                        <mxCell id="20" value="&lt;b&gt;$NOTES&lt;/b&gt;&lt;br&gt;Anything you type in the &lt;b&gt;CFileIncludes &lt;/b&gt;vertex ends up in the generated .c file. It is combined with the C# &lt;b&gt;IRenderConfigC.CFileIncludes&lt;/b&gt; config." style="shape=rectangle;rounded=1;arcSize=15;absoluteArcSize=1;align=left;verticalAlign=top;whiteSpace=wrap;html=1;spacingLeft=4;strokeWidth=1;strokeColor=default;fillColor=#fff2cc;fontColor=#000000;gradientColor=#ffd966;" vertex="1" parent="18">
                            <mxGeometry x="50" y="130" width="330" height="70" as="geometry"/>
                        </mxCell>
                        <mxCell id="21" value="$CONFIG: VariableDeclarations" style="shape=swimlane;rotatable=0;align=center;verticalAlign=top;fontFamily=Lucida Console;startSize=30;fontSize=14;fontStyle=1;swimlaneFillColor=default;html=1;rounded=1;arcSize=15;absoluteArcSize=1;fillColor=#76608a;fontColor=#ffffff;strokeColor=#432D57;" vertex="1" collapsed="1" parent="2">
                            <mxGeometry x="40" y="560" width="280" height="70" as="geometry">
                                <mxRectangle x="30" y="170" width="290" height="90" as="alternateBounds"/>
                            </mxGeometry>
                        </mxCell>
                        <mxCell id="22" value="// This section is ignored if it only contains c style comments.&#10;// Add something like \`bool my_flag;\` to see a variables section get added to the state machine struct." style="fontFamily=Lucida Console;align=left;verticalAlign=top;fillColor=none;gradientColor=none;strokeColor=none;rounded=0;spacingLeft=4;resizable=0;movable=0;deletable=0;rotatable=0;autosize=1;" vertex="1" connectable="0" parent="21">
                            <mxGeometry y="30" width="770" height="40" as="geometry"/>
                        </mxCell>
                        <mxCell id="23" value="&lt;b&gt;$NOTES&lt;/b&gt;&lt;br&gt;Anything you type in the &lt;b&gt;VariableDeclarations&amp;nbsp;&lt;/b&gt;vertex ends up in the generated .h file variables section. It is combined with the C# &lt;b&gt;IRenderConfigC.VariableDeclarations&amp;nbsp;&lt;/b&gt;config." style="shape=rectangle;rounded=1;arcSize=15;absoluteArcSize=1;align=left;verticalAlign=top;whiteSpace=wrap;html=1;spacingLeft=4;strokeWidth=1;strokeColor=default;fillColor=#fff2cc;fontColor=#000000;gradientColor=#ffd966;" vertex="1" parent="21">
                            <mxGeometry x="60" y="140" width="330" height="70" as="geometry"/>
                        </mxCell>
                    </root>
                </mxGraphModel>
            </diagram>
        </mxfile>
        `;

        // let x =  mxUtils.parseXml(xml);
        return xml;
    }

    _registerDependencyInjection() {
        let di = StateSmithDi.di;

        di.getApp = () => this.app;
        di.getEditorUi = () => StateSmithModel.getEditorUi(this.app);
    }

}
