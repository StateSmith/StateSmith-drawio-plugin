function mxMouseEvent(a, b) {
  this.evt = a;
  this.sourceState = this.state = b;
}
mxMouseEvent.prototype.consumed = !1;
mxMouseEvent.prototype.evt = null;
mxMouseEvent.prototype.graphX = null;
mxMouseEvent.prototype.graphY = null;
mxMouseEvent.prototype.state = null;
mxMouseEvent.prototype.sourceState = null;
mxMouseEvent.prototype.getEvent = function() {
  return this.evt;
};
mxMouseEvent.prototype.getSource = function() {
  return mxEvent.getSource(this.evt);
};
mxMouseEvent.prototype.isSource = function(a) {
  return null != a ? mxUtils.isAncestorNode(a.node, this.getSource()) : !1;
};
mxMouseEvent.prototype.getX = function() {
  return mxEvent.getClientX(this.getEvent());
};
mxMouseEvent.prototype.getY = function() {
  return mxEvent.getClientY(this.getEvent());
};
mxMouseEvent.prototype.getGraphX = function() {
  return this.graphX;
};
mxMouseEvent.prototype.getGraphY = function() {
  return this.graphY;
};
mxMouseEvent.prototype.getState = function() {
  return this.state;
};
mxMouseEvent.prototype.getCell = function() {
  var a = this.getState();
  return null != a ? a.cell : null;
};
mxMouseEvent.prototype.isPopupTrigger = function() {
  return mxEvent.isPopupTrigger(this.getEvent());
};
mxMouseEvent.prototype.isConsumed = function() {
  return this.consumed;
};
mxMouseEvent.prototype.consume = function(a) {
  (null != a ? a : null != this.evt.touches || mxEvent.isMouseEvent(this.evt)) && this.evt.preventDefault && this.evt.preventDefault();
  mxClient.IS_IE && (this.evt.returnValue = !0);
  this.consumed = !0;
};