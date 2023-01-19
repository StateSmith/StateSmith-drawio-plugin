function mxKeyHandler(a, b) {
  null != a && (this.graph = a, this.target = b || document.documentElement, this.normalKeys = [], this.shiftKeys = [], this.controlKeys = [], this.controlShiftKeys = [], this.keydownHandler = mxUtils.bind(this, function(c) {
    this.keyDown(c);
  }), mxEvent.addListener(this.target, 'keydown', this.keydownHandler), mxClient.IS_IE && mxEvent.addListener(window, 'unload', mxUtils.bind(this, function() {
    this.destroy();
  })));
}
mxKeyHandler.prototype.graph = null;
mxKeyHandler.prototype.target = null;
mxKeyHandler.prototype.normalKeys = null;
mxKeyHandler.prototype.shiftKeys = null;
mxKeyHandler.prototype.controlKeys = null;
mxKeyHandler.prototype.controlShiftKeys = null;
mxKeyHandler.prototype.enabled = !0;
mxKeyHandler.prototype.isEnabled = function() {
  return this.enabled;
};
mxKeyHandler.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxKeyHandler.prototype.bindKey = function(a, b) {
  this.normalKeys[a] = b;
};
mxKeyHandler.prototype.bindShiftKey = function(a, b) {
  this.shiftKeys[a] = b;
};
mxKeyHandler.prototype.bindControlKey = function(a, b) {
  this.controlKeys[a] = b;
};
mxKeyHandler.prototype.bindControlShiftKey = function(a, b) {
  this.controlShiftKeys[a] = b;
};
mxKeyHandler.prototype.isControlDown = function(a) {
  return mxEvent.isControlDown(a);
};
mxKeyHandler.prototype.getFunction = function(a) {
  return null == a || mxEvent.isAltDown(a) ? null : this.isControlDown(a) ? mxEvent.isShiftDown(a) ? this.controlShiftKeys[a.keyCode] : this.controlKeys[a.keyCode] : mxEvent.isShiftDown(a) ? this.shiftKeys[a.keyCode] : this.normalKeys[a.keyCode];
};
mxKeyHandler.prototype.isGraphEvent = function(a) {
  var b = mxEvent.getSource(a);
  return b == this.target || b.parentNode == this.target || null != this.graph.cellEditor && this.graph.cellEditor.isEventSource(a) ? !0 : mxUtils.isAncestorNode(this.graph.container, b);
};
mxKeyHandler.prototype.keyDown = function(a) {
  if (this.isEnabledForEvent(a))
    if (27 == a.keyCode)
      this.escape(a);
    else if (!this.isEventIgnored(a)) {
    var b = this.getFunction(a);
    null != b && (b(a), mxEvent.consume(a));
  }
};
mxKeyHandler.prototype.isEnabledForEvent = function(a) {
  return this.graph.isEnabled() && !mxEvent.isConsumed(a) && this.isGraphEvent(a) && this.isEnabled();
};
mxKeyHandler.prototype.isEventIgnored = function(a) {
  return this.graph.isEditing();
};
mxKeyHandler.prototype.escape = function(a) {
  this.graph.isEscapeEnabled() && this.graph.escape(a);
};
mxKeyHandler.prototype.destroy = function() {
  null != this.target && null != this.keydownHandler && (mxEvent.removeListener(this.target, 'keydown', this.keydownHandler), this.keydownHandler = null);
  this.target = null;
};