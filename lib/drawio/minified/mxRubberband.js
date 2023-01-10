function mxRubberband(a) {
  null != a && (this.graph = a, this.graph.addMouseListener(this), this.forceRubberbandHandler = mxUtils.bind(this, function(b, c) {
    b = c.getProperty('eventName');
    c = c.getProperty('event');
    if (b == mxEvent.MOUSE_DOWN && this.isForceRubberbandEvent(c)) {
      b = mxUtils.getOffset(this.graph.container);
      var d = mxUtils.getScrollOrigin(this.graph.container);
      d.x -= b.x;
      d.y -= b.y;
      this.start(c.getX() + d.x, c.getY() + d.y);
      c.consume(!1);
    }
  }), this.graph.addListener(mxEvent.FIRE_MOUSE_EVENT, this.forceRubberbandHandler), this.panHandler = mxUtils.bind(this, function() {
    this.repaint();
  }), this.graph.addListener(mxEvent.PAN, this.panHandler), this.gestureHandler = mxUtils.bind(this, function(b, c) {
    null != this.first && this.reset();
  }), this.graph.addListener(mxEvent.GESTURE, this.gestureHandler), mxClient.IS_IE && mxEvent.addListener(window, 'unload', mxUtils.bind(this, function() {
    this.destroy();
  })));
}
mxRubberband.prototype.defaultOpacity = 20;
mxRubberband.prototype.enabled = !0;
mxRubberband.prototype.div = null;
mxRubberband.prototype.sharedDiv = null;
mxRubberband.prototype.currentX = 0;
mxRubberband.prototype.currentY = 0;
mxRubberband.prototype.fadeOut = !1;
mxRubberband.prototype.isEnabled = function() {
  return this.enabled;
};
mxRubberband.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxRubberband.prototype.isForceRubberbandEvent = function(a) {
  return mxEvent.isAltDown(a.getEvent());
};
mxRubberband.prototype.mouseDown = function(a, b) {
  if (!b.isConsumed() && this.isEnabled() && this.graph.isEnabled() && null == b.getState() && !mxEvent.isMultiTouchEvent(b.getEvent())) {
    a = mxUtils.getOffset(this.graph.container);
    var c = mxUtils.getScrollOrigin(this.graph.container);
    c.x -= a.x;
    c.y -= a.y;
    this.start(b.getX() + c.x, b.getY() + c.y);
    b.consume(!1);
  }
};
mxRubberband.prototype.start = function(a, b) {
  function c(e) {
    e = new mxMouseEvent(e);
    var f = mxUtils.convertPoint(d, e.getX(), e.getY());
    e.graphX = f.x;
    e.graphY = f.y;
    return e;
  }
  this.first = new mxPoint(a, b);
  var d = this.graph.container;
  this.dragHandler = mxUtils.bind(this, function(e) {
    this.mouseMove(this.graph, c(e));
  });
  this.dropHandler = mxUtils.bind(this, function(e) {
    this.mouseUp(this.graph, c(e));
  });
  mxClient.IS_FF && mxEvent.addGestureListeners(document, null, this.dragHandler, this.dropHandler);
};
mxRubberband.prototype.mouseMove = function(a, b) {
  if (!b.isConsumed() && null != this.first) {
    var c = mxUtils.getScrollOrigin(this.graph.container);
    a = mxUtils.getOffset(this.graph.container);
    c.x -= a.x;
    c.y -= a.y;
    a = b.getX() + c.x;
    c = b.getY() + c.y;
    var d = this.first.x - a,
      e = this.first.y - c,
      f = this.graph.tolerance;
    if (null != this.div || Math.abs(d) > f || Math.abs(e) > f)
      null == this.div && (this.div = this.createShape()), mxUtils.clearSelection(), this.update(a, c), b.consume();
  }
};
mxRubberband.prototype.createShape = function() {
  null == this.sharedDiv && (this.sharedDiv = document.createElement('div'), this.sharedDiv.className = 'mxRubberband', mxUtils.setOpacity(this.sharedDiv, this.defaultOpacity));
  this.graph.container.appendChild(this.sharedDiv);
  var a = this.sharedDiv;
  mxClient.IS_SVG && (!mxClient.IS_IE || 10 <= document.documentMode) && this.fadeOut && (this.sharedDiv = null);
  return a;
};
mxRubberband.prototype.isActive = function(a, b) {
  return null != this.div && 'none' != this.div.style.display;
};
mxRubberband.prototype.mouseUp = function(a, b) {
  a = this.isActive();
  this.reset();
  a && (this.execute(b.getEvent()), b.consume());
};
mxRubberband.prototype.execute = function(a) {
  var b = new mxRectangle(this.x, this.y, this.width, this.height);
  this.graph.selectRegion(b, a);
};
mxRubberband.prototype.reset = function() {
  if (null != this.div)
    if (mxClient.IS_SVG && (!mxClient.IS_IE || 10 <= document.documentMode) && this.fadeOut) {
      var a = this.div;
      mxUtils.setPrefixedStyle(a.style, 'transition', 'all 0.2s linear');
      a.style.pointerEvents = 'none';
      a.style.opacity = 0;
      window.setTimeout(function() {
        a.parentNode.removeChild(a);
      }, 200);
    } else
      this.div.parentNode.removeChild(this.div);
  mxEvent.removeGestureListeners(document, null, this.dragHandler, this.dropHandler);
  this.dropHandler = this.dragHandler = null;
  this.currentY = this.currentX = 0;
  this.div = this.first = null;
};
mxRubberband.prototype.update = function(a, b) {
  this.currentX = a;
  this.currentY = b;
  this.repaint();
};
mxRubberband.prototype.repaint = function() {
  if (null != this.div) {
    var a = this.currentX - this.graph.panDx,
      b = this.currentY - this.graph.panDy;
    this.x = Math.min(this.first.x, a);
    this.y = Math.min(this.first.y, b);
    this.width = Math.max(this.first.x, a) - this.x;
    this.height = Math.max(this.first.y, b) - this.y;
    this.div.style.left = this.x + 0 + 'px';
    this.div.style.top = this.y + 0 + 'px';
    this.div.style.width = Math.max(1, this.width) + 'px';
    this.div.style.height = Math.max(1, this.height) + 'px';
  }
};
mxRubberband.prototype.destroy = function() {
  this.destroyed || (this.destroyed = !0, this.graph.removeMouseListener(this), this.graph.removeListener(this.forceRubberbandHandler), this.graph.removeListener(this.panHandler), this.reset(), null != this.sharedDiv && (this.sharedDiv = null));
};