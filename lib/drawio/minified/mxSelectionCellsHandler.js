function mxSelectionCellsHandler(a) {
  mxEventSource.call(this);
  this.graph = a;
  this.handlers = new mxDictionary();
  this.graph.addMouseListener(this);
  this.refreshHandler = mxUtils.bind(this, function(b, c) {
    this.isEnabled() && this.refresh();
  });
  this.graph.getSelectionModel().addListener(mxEvent.CHANGE, this.refreshHandler);
  this.graph.getModel().addListener(mxEvent.CHANGE, this.refreshHandler);
  this.graph.getView().addListener(mxEvent.SCALE, this.refreshHandler);
  this.graph.getView().addListener(mxEvent.TRANSLATE, this.refreshHandler);
  this.graph.getView().addListener(mxEvent.SCALE_AND_TRANSLATE, this.refreshHandler);
  this.graph.getView().addListener(mxEvent.DOWN, this.refreshHandler);
  this.graph.getView().addListener(mxEvent.UP, this.refreshHandler);
}
mxUtils.extend(mxSelectionCellsHandler, mxEventSource);
mxSelectionCellsHandler.prototype.graph = null;
mxSelectionCellsHandler.prototype.enabled = !0;
mxSelectionCellsHandler.prototype.refreshHandler = null;
mxSelectionCellsHandler.prototype.maxHandlers = 100;
mxSelectionCellsHandler.prototype.handlers = null;
mxSelectionCellsHandler.prototype.isEnabled = function() {
  return this.enabled;
};
mxSelectionCellsHandler.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxSelectionCellsHandler.prototype.getHandler = function(a) {
  return this.handlers.get(a);
};
mxSelectionCellsHandler.prototype.isHandled = function(a) {
  return null != this.getHandler(a);
};
mxSelectionCellsHandler.prototype.reset = function() {
  this.handlers.visit(function(a, b) {
    b.reset.apply(b);
  });
};
mxSelectionCellsHandler.prototype.getHandledSelectionCells = function() {
  return this.graph.getSelectionCells();
};
mxSelectionCellsHandler.prototype.refresh = function() {
  var a = this.handlers;
  this.handlers = new mxDictionary();
  for (var b = mxUtils.sortCells(this.getHandledSelectionCells(), !1), c = 0; c < b.length; c++) {
    var d = this.graph.view.getState(b[c]);
    if (null != d) {
      var e = a.remove(b[c]);
      null != e && (e.state != d ? (e.destroy(), e = null) : this.isHandlerActive(e) || (null != e.refresh && e.refresh(), e.redraw()));
      null != e && this.handlers.put(b[c], e);
    }
  }
  a.visit(mxUtils.bind(this, function(f, g) {
    this.fireEvent(new mxEventObject(mxEvent.REMOVE, 'state', g.state));
    g.destroy();
  }));
  for (c = 0; c < b.length; c++)
    d = this.graph.view.getState(b[c]), null != d && (e = this.handlers.get(b[c]), null == e ? (e = this.graph.createHandler(d), this.fireEvent(new mxEventObject(mxEvent.ADD, 'state', d)), this.handlers.put(b[c], e)) : e.updateParentHighlight());
};
mxSelectionCellsHandler.prototype.isHandlerActive = function(a) {
  return null != a.index;
};
mxSelectionCellsHandler.prototype.updateHandler = function(a) {
  var b = this.handlers.remove(a.cell);
  if (null != b) {
    var c = b.index,
      d = b.startX,
      e = b.startY;
    b.destroy();
    b = this.graph.createHandler(a);
    null != b && (this.handlers.put(a.cell, b), null != c && null != d && null != e && b.start(d, e, c));
  }
};
mxSelectionCellsHandler.prototype.mouseDown = function(a, b) {
  if (this.graph.isEnabled() && this.isEnabled()) {
    var c = [
      a,
      b
    ];
    this.handlers.visit(function(d, e) {
      e.mouseDown.apply(e, c);
    });
  }
};
mxSelectionCellsHandler.prototype.mouseMove = function(a, b) {
  if (this.graph.isEnabled() && this.isEnabled()) {
    var c = [
      a,
      b
    ];
    this.handlers.visit(function(d, e) {
      e.mouseMove.apply(e, c);
    });
  }
};
mxSelectionCellsHandler.prototype.mouseUp = function(a, b) {
  if (this.graph.isEnabled() && this.isEnabled()) {
    var c = [
      a,
      b
    ];
    this.handlers.visit(function(d, e) {
      e.mouseUp.apply(e, c);
    });
  }
};
mxSelectionCellsHandler.prototype.destroy = function() {
  this.graph.removeMouseListener(this);
  null != this.refreshHandler && (this.graph.getSelectionModel().removeListener(this.refreshHandler), this.graph.getModel().removeListener(this.refreshHandler), this.graph.getView().removeListener(this.refreshHandler), this.refreshHandler = null);
};