function mxPopupMenuHandler(a, b) {
  null != a && (this.graph = a, this.factoryMethod = b, this.graph.addMouseListener(this), this.gestureHandler = mxUtils.bind(this, function(c, d) {
    this.inTolerance = !1;
  }), this.graph.addListener(mxEvent.GESTURE, this.gestureHandler), this.init());
}
mxPopupMenuHandler.prototype = new mxPopupMenu();
mxPopupMenuHandler.prototype.constructor = mxPopupMenuHandler;
mxPopupMenuHandler.prototype.graph = null;
mxPopupMenuHandler.prototype.selectOnPopup = !0;
mxPopupMenuHandler.prototype.clearSelectionOnBackground = !0;
mxPopupMenuHandler.prototype.triggerX = null;
mxPopupMenuHandler.prototype.triggerY = null;
mxPopupMenuHandler.prototype.screenX = null;
mxPopupMenuHandler.prototype.screenY = null;
mxPopupMenuHandler.prototype.init = function() {
  mxPopupMenu.prototype.init.apply(this);
  mxEvent.addGestureListeners(this.div, mxUtils.bind(this, function(a) {
    this.graph.tooltipHandler.hide();
  }));
};
mxPopupMenuHandler.prototype.isSelectOnPopup = function(a) {
  return this.selectOnPopup;
};
mxPopupMenuHandler.prototype.mouseDown = function(a, b) {
  this.isEnabled() && !mxEvent.isMultiTouchEvent(b.getEvent()) && (this.hideMenu(), this.triggerX = b.getGraphX(), this.triggerY = b.getGraphY(), this.screenX = mxEvent.getMainEvent(b.getEvent()).screenX, this.screenY = mxEvent.getMainEvent(b.getEvent()).screenY, this.popupTrigger = this.isPopupTrigger(b), this.inTolerance = !0);
};
mxPopupMenuHandler.prototype.mouseMove = function(a, b) {
  this.inTolerance && null != this.screenX && null != this.screenY && (Math.abs(mxEvent.getMainEvent(b.getEvent()).screenX - this.screenX) > this.graph.tolerance || Math.abs(mxEvent.getMainEvent(b.getEvent()).screenY - this.screenY) > this.graph.tolerance) && (this.inTolerance = !1);
};
mxPopupMenuHandler.prototype.mouseUp = function(a, b, c) {
  a = null == c;
  c = null != c ? c : mxUtils.bind(this, function(e) {
    var f = mxUtils.getScrollOrigin();
    this.popup(b.getX() + f.x + 1, b.getY() + f.y + 1, e, b.getEvent());
  });
  if (this.popupTrigger && this.inTolerance && null != this.triggerX && null != this.triggerY) {
    var d = this.getCellForPopupEvent(b);
    this.graph.isEnabled() && this.isSelectOnPopup(b) && null != d && !this.graph.isCellSelected(d) ? this.graph.setSelectionCell(d) : this.clearSelectionOnBackground && null == d && this.graph.clearSelection();
    this.graph.tooltipHandler.hide();
    c(d);
    a && b.consume();
  }
  this.inTolerance = this.popupTrigger = !1;
};
mxPopupMenuHandler.prototype.getCellForPopupEvent = function(a) {
  return a.getCell();
};
mxPopupMenuHandler.prototype.destroy = function() {
  this.graph.removeMouseListener(this);
  this.graph.removeListener(this.gestureHandler);
  mxPopupMenu.prototype.destroy.apply(this);
};