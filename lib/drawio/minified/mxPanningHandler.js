function mxPanningHandler(a) {
  null != a && (this.graph = a, this.graph.addMouseListener(this), this.forcePanningHandler = mxUtils.bind(this, function(b, c) {
    b = c.getProperty('eventName');
    c = c.getProperty('event');
    b == mxEvent.MOUSE_DOWN && this.isForcePanningEvent(c) && (this.start(c), this.active = !0, this.fireEvent(new mxEventObject(mxEvent.PAN_START, 'event', c)), c.consume());
  }), this.graph.addListener(mxEvent.FIRE_MOUSE_EVENT, this.forcePanningHandler), this.gestureHandler = mxUtils.bind(this, function(b, c) {
    this.isPinchEnabled() && (b = c.getProperty('event'), mxEvent.isConsumed(b) || 'gesturestart' != b.type ? 'gestureend' == b.type && null != this.initialScale && (this.initialScale = null) : (this.initialScale = this.graph.view.scale, this.active || null == this.mouseDownEvent || (this.start(this.mouseDownEvent), this.mouseDownEvent = null)), null != this.initialScale && this.zoomGraph(b));
  }), this.graph.addListener(mxEvent.GESTURE, this.gestureHandler), this.mouseUpListener = mxUtils.bind(this, function() {
    this.active && this.reset();
  }), mxEvent.addGestureListeners(document, null, null, this.mouseUpListener), mxEvent.addListener(document, 'mouseleave', this.mouseUpListener));
}
mxPanningHandler.prototype = new mxEventSource();
mxPanningHandler.prototype.constructor = mxPanningHandler;
mxPanningHandler.prototype.graph = null;
mxPanningHandler.prototype.useLeftButtonForPanning = !1;
mxPanningHandler.prototype.usePopupTrigger = !0;
mxPanningHandler.prototype.ignoreCell = !1;
mxPanningHandler.prototype.previewEnabled = !0;
mxPanningHandler.prototype.useGrid = !1;
mxPanningHandler.prototype.panningEnabled = !0;
mxPanningHandler.prototype.pinchEnabled = !0;
mxPanningHandler.prototype.maxScale = 8;
mxPanningHandler.prototype.minScale = 0.01;
mxPanningHandler.prototype.dx = null;
mxPanningHandler.prototype.dy = null;
mxPanningHandler.prototype.startX = 0;
mxPanningHandler.prototype.startY = 0;
mxPanningHandler.prototype.isActive = function() {
  return this.active || null != this.initialScale;
};
mxPanningHandler.prototype.isPanningEnabled = function() {
  return this.panningEnabled;
};
mxPanningHandler.prototype.setPanningEnabled = function(a) {
  this.panningEnabled = a;
};
mxPanningHandler.prototype.isPinchEnabled = function() {
  return this.pinchEnabled;
};
mxPanningHandler.prototype.setPinchEnabled = function(a) {
  this.pinchEnabled = a;
};
mxPanningHandler.prototype.isPanningTrigger = function(a) {
  var b = a.getEvent();
  return this.useLeftButtonForPanning && null == a.getState() && mxEvent.isLeftMouseButton(b) || mxEvent.isControlDown(b) && mxEvent.isShiftDown(b) || this.usePopupTrigger && mxEvent.isPopupTrigger(b);
};
mxPanningHandler.prototype.isForcePanningEvent = function(a) {
  return this.ignoreCell || mxEvent.isMultiTouchEvent(a.getEvent());
};
mxPanningHandler.prototype.mouseDown = function(a, b) {
  this.mouseDownEvent = b;
  !b.isConsumed() && this.isPanningEnabled() && !this.active && this.isPanningTrigger(b) && (this.start(b), this.consumePanningTrigger(b));
};
mxPanningHandler.prototype.start = function(a) {
  this.dx0 = -this.graph.container.scrollLeft;
  this.dy0 = -this.graph.container.scrollTop;
  this.startX = a.getX();
  this.startY = a.getY();
  this.dy = this.dx = null;
  this.panningTrigger = !0;
};
mxPanningHandler.prototype.consumePanningTrigger = function(a) {
  a.consume();
};
mxPanningHandler.prototype.mouseMove = function(a, b) {
  this.dx = b.getX() - this.startX;
  this.dy = b.getY() - this.startY;
  this.active ? (this.previewEnabled && (this.useGrid && (this.dx = this.graph.snap(this.dx), this.dy = this.graph.snap(this.dy)), this.graph.panGraph(this.dx + this.dx0, this.dy + this.dy0)), this.fireEvent(new mxEventObject(mxEvent.PAN, 'event', b))) : this.panningTrigger && (a = this.active, this.active = Math.abs(this.dx) > this.graph.tolerance || Math.abs(this.dy) > this.graph.tolerance, !a && this.active && this.fireEvent(new mxEventObject(mxEvent.PAN_START, 'event', b)));
  (this.active || this.panningTrigger) && b.consume();
};
mxPanningHandler.prototype.mouseUp = function(a, b) {
  if (this.active) {
    if (null != this.dx && null != this.dy) {
      if (!this.graph.useScrollbarsForPanning || !mxUtils.hasScrollbars(this.graph.container)) {
        a = this.graph.getView().scale;
        var c = this.graph.getView().translate;
        this.graph.panGraph(0, 0);
        this.panGraph(c.x + this.dx / a, c.y + this.dy / a);
      }
      b.consume();
    }
    this.fireEvent(new mxEventObject(mxEvent.PAN_END, 'event', b));
  }
  this.reset();
};
mxPanningHandler.prototype.zoomGraph = function(a) {
  var b = Math.round(this.initialScale * a.scale * 100) / 100;
  null != this.minScale && (b = Math.max(this.minScale, b));
  null != this.maxScale && (b = Math.min(this.maxScale, b));
  this.graph.view.scale != b && (this.graph.zoomTo(b), mxEvent.consume(a));
};
mxPanningHandler.prototype.reset = function() {
  this.panningTrigger = this.graph.isMouseDown = !1;
  this.mouseDownEvent = null;
  this.active = !1;
  this.dy = this.dx = null;
};
mxPanningHandler.prototype.panGraph = function(a, b) {
  this.graph.getView().setTranslate(a, b);
};
mxPanningHandler.prototype.destroy = function() {
  this.graph.removeMouseListener(this);
  this.graph.removeListener(this.forcePanningHandler);
  this.graph.removeListener(this.gestureHandler);
  mxEvent.removeGestureListeners(document, null, null, this.mouseUpListener);
  mxEvent.removeListener(document, 'mouseleave', this.mouseUpListener);
};