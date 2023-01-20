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

    /**
     * @param {mxGraph} graph
     */
    constructor(graph) {
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
    static getParent(cell) {
        if (!cell)
            return null

        return cell.parent;
    }

    /**
     * @param {mxCell} cell
     */
    static collectAncestors(cell) {
        let ancestors = [];
        cell = this.getParent(cell);

        while (cell != null) {
            ancestors.push(cell);
            cell = this.getParent(cell);
        }

        return ancestors;
    }

    /**
     * @param {mxCell} cell
     */
    static collectAncestorsAndSelf(cell) {
        let ancestors = this.collectAncestors(cell);
        ancestors.splice(0, 0, cell);
        return ancestors;
    }

    /**
     * @param {mxCell[]} cells
     */
    getSelectionCellsIfNull(cells) {
        if (cells == null) {
            cells = this.graph.getSelectionCells();
        }
        return cells;
    }

    /**
     * Allows any cells with style `deletable=0` to be deleted.
     * @param {mxCell[]} cells
     */
    forceDeleteCells(cells) {
        if (cells == null || cells.length == 0)
            return;

        this.model.beginUpdate();
        try {
            cells.forEach(c => {
                this.model.setStyle(c, "");
                // The view may cache the style for the cell. It must be removed or else `graph.removeCells()` won't be able to remove cells that were marked as non-deletable.
                this.graph.view.removeState(c);
            });
            this.graph.removeCells(cells);
        }
        finally {
            this.model.endUpdate();
        }
    }

    /**
     * @param {mxCell} a
     * @param {mxCell} b
     */
    static aVertexContainsB(a, b) {
        if (a == b)
            return false;

        // if a is a null root, it means it is the top level. It must contain the other.
        if (a == null)
            return true;

        // check b's ancestors to see if one of them is `a`
        while (b != null) {
            b = b.parent;
            if (b == a)
                return true;
        }

        return false;
    }

    /**
     * Will ignore collapsed groups.
     * @param {mxGraph} graph
     * @param {mxCell} group
     */
    static fitExpandedGroupToChildren(graph, group) {
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
}
