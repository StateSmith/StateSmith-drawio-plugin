function mxLayoutManager(a) {
  this.undoHandler = mxUtils.bind(this, function(b, c) {
    this.isEnabled() && this.beforeUndo(c.getProperty('edit'));
  });
  this.moveHandler = mxUtils.bind(this, function(b, c) {
    this.isEnabled() && this.cellsMoved(c.getProperty('cells'), c.getProperty('event'));
  });
  this.resizeHandler = mxUtils.bind(this, function(b, c) {
    this.isEnabled() && this.cellsResized(c.getProperty('cells'), c.getProperty('bounds'), c.getProperty('previous'));
  });
  this.setGraph(a);
}
mxLayoutManager.prototype = new mxEventSource();
mxLayoutManager.prototype.constructor = mxLayoutManager;
mxLayoutManager.prototype.graph = null;
mxLayoutManager.prototype.bubbling = !0;
mxLayoutManager.prototype.enabled = !0;
mxLayoutManager.prototype.undoHandler = null;
mxLayoutManager.prototype.moveHandler = null;
mxLayoutManager.prototype.resizeHandler = null;
mxLayoutManager.prototype.isEnabled = function() {
  return this.enabled;
};
mxLayoutManager.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxLayoutManager.prototype.isBubbling = function() {
  return this.bubbling;
};
mxLayoutManager.prototype.setBubbling = function(a) {
  this.bubbling = a;
};
mxLayoutManager.prototype.getGraph = function() {
  return this.graph;
};
mxLayoutManager.prototype.setGraph = function(a) {
  if (null != this.graph) {
    var b = this.graph.getModel();
    b.removeListener(this.undoHandler);
    this.graph.removeListener(this.moveHandler);
    this.graph.removeListener(this.resizeHandler);
  }
  this.graph = a;
  null != this.graph && (b = this.graph.getModel(), b.addListener(mxEvent.BEFORE_UNDO, this.undoHandler), this.graph.addListener(mxEvent.MOVE_CELLS, this.moveHandler), this.graph.addListener(mxEvent.RESIZE_CELLS, this.resizeHandler));
};
mxLayoutManager.prototype.hasLayout = function(a) {
  return null != this.getLayout(a, mxEvent.LAYOUT_CELLS);
};
mxLayoutManager.prototype.getLayout = function(a, b) {
  return null;
};
mxLayoutManager.prototype.beforeUndo = function(a) {
  this.executeLayoutForCells(this.getCellsForChanges(a.changes));
};
mxLayoutManager.prototype.cellsMoved = function(a, b) {
  if (null != a && null != b) {
    b = mxUtils.convertPoint(this.getGraph().container, mxEvent.getClientX(b), mxEvent.getClientY(b));
    for (var c = this.getGraph().getModel(), d = 0; d < a.length; d++) {
      var e = this.getLayout(c.getParent(a[d]), mxEvent.MOVE_CELLS);
      null != e && e.moveCell(a[d], b.x, b.y);
    }
  }
};
mxLayoutManager.prototype.cellsResized = function(a, b, c) {
  if (null != a && null != b)
    for (var d = this.getGraph().getModel(), e = 0; e < a.length; e++) {
      var f = this.getLayout(d.getParent(a[e]), mxEvent.RESIZE_CELLS);
      null != f && f.resizeCell(a[e], b[e], c[e]);
    }
};
mxLayoutManager.prototype.getCellsForChanges = function(a) {
  for (var b = [], c = 0; c < a.length; c++) {
    var d = a[c];
    if (d instanceof mxRootChange)
      return [];
    b = b.concat(this.getCellsForChange(d));
  }
  return b;
};
mxLayoutManager.prototype.getCellsForChange = function(a) {
  return a instanceof mxChildChange ? this.addCellsWithLayout(a.child, this.addCellsWithLayout(a.previous)) : a instanceof mxValueChange || a instanceof mxTerminalChange || a instanceof mxGeometryChange || a instanceof mxVisibleChange || a instanceof mxStyleChange ? this.addCellsWithLayout(a.cell) : [];
};
mxLayoutManager.prototype.addCellsWithLayout = function(a, b) {
  return this.addDescendantsWithLayout(a, this.addAncestorsWithLayout(a, b));
};
mxLayoutManager.prototype.addAncestorsWithLayout = function(a, b) {
  b = null != b ? b : [];
  if (null != a && (this.hasLayout(a) && b.push(a), this.isBubbling())) {
    var c = this.getGraph().getModel();
    this.addAncestorsWithLayout(c.getParent(a), b);
  }
  return b;
};
mxLayoutManager.prototype.addDescendantsWithLayout = function(a, b) {
  b = null != b ? b : [];
  if (null != a && this.hasLayout(a))
    for (var c = this.getGraph().getModel(), d = 0; d < c.getChildCount(a); d++) {
      var e = c.getChildAt(a, d);
      this.hasLayout(e) && (b.push(e), this.addDescendantsWithLayout(e, b));
    }
  return b;
};
mxLayoutManager.prototype.executeLayoutForCells = function(a) {
  var b = this.getGraph().getModel();
  b.beginUpdate();
  try {
    var c = mxUtils.sortCells(a, !1);
    this.layoutCells(c, !0);
    this.layoutCells(c.reverse(), !1);
  } finally {
    b.endUpdate();
  }
};
mxLayoutManager.prototype.layoutCells = function(a, b) {
  if (0 < a.length) {
    var c = this.getGraph().getModel();
    c.beginUpdate();
    try {
      for (var d = null, e = 0; e < a.length; e++)
        a[e] != c.getRoot() && a[e] != d && (this.executeLayout(a[e], b), d = a[e]);
      this.fireEvent(new mxEventObject(mxEvent.LAYOUT_CELLS, 'cells', a));
    } finally {
      c.endUpdate();
    }
  }
};
mxLayoutManager.prototype.executeLayout = function(a, b) {
  b = this.getLayout(a, b ? mxEvent.BEGIN_UPDATE : mxEvent.END_UPDATE);
  null != b && b.execute(a);
};
mxLayoutManager.prototype.destroy = function() {
  this.setGraph(null);
};