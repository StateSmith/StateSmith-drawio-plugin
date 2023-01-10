function mxTooltipHandler(a, b) {
  null != a && (this.graph = a, this.delay = b || 500, this.graph.addMouseListener(this));
}
mxTooltipHandler.prototype.zIndex = 10005;
mxTooltipHandler.prototype.graph = null;
mxTooltipHandler.prototype.delay = null;
mxTooltipHandler.prototype.ignoreTouchEvents = !0;
mxTooltipHandler.prototype.hideOnHover = !1;
mxTooltipHandler.prototype.destroyed = !1;
mxTooltipHandler.prototype.enabled = !0;
mxTooltipHandler.prototype.isEnabled = function() {
  return this.enabled;
};
mxTooltipHandler.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxTooltipHandler.prototype.isHideOnHover = function() {
  return this.hideOnHover;
};
mxTooltipHandler.prototype.setHideOnHover = function(a) {
  this.hideOnHover = a;
};
mxTooltipHandler.prototype.init = function() {
  null != document.body && (this.div = document.createElement('div'), this.div.className = 'mxTooltip', this.div.style.visibility = 'hidden', document.body.appendChild(this.div), mxEvent.addGestureListeners(this.div, mxUtils.bind(this, function(a) {
    'A' != mxEvent.getSource(a).nodeName && this.hideTooltip();
  })));
};
mxTooltipHandler.prototype.getStateForEvent = function(a) {
  return a.getState();
};
mxTooltipHandler.prototype.mouseDown = function(a, b) {
  this.reset(b, !1);
  this.hideTooltip();
};
mxTooltipHandler.prototype.mouseMove = function(a, b) {
  if (b.getX() != this.lastX || b.getY() != this.lastY)
    this.reset(b, !0), a = this.getStateForEvent(b), (this.isHideOnHover() || a != this.state || b.getSource() != this.node && (!this.stateSource || null != a && this.stateSource == (b.isSource(a.shape) || !b.isSource(a.text)))) && this.hideTooltip();
  this.lastX = b.getX();
  this.lastY = b.getY();
};
mxTooltipHandler.prototype.mouseUp = function(a, b) {
  this.reset(b, !0);
  this.hideTooltip();
};
mxTooltipHandler.prototype.resetTimer = function() {
  null != this.thread && (window.clearTimeout(this.thread), this.thread = null);
};
mxTooltipHandler.prototype.reset = function(a, b, c) {
  if (!this.ignoreTouchEvents || mxEvent.isMouseEvent(a.getEvent()))
    if (this.resetTimer(), c = null != c ? c : this.getStateForEvent(a), b && this.isEnabled() && null != c && (null == this.div || 'hidden' == this.div.style.visibility)) {
      var d = a.getSource(),
        e = a.getX(),
        f = a.getY(),
        g = a.isSource(c.shape) || a.isSource(c.text);
      this.thread = window.setTimeout(mxUtils.bind(this, function() {
        if (!this.graph.isEditing() && !this.graph.popupMenuHandler.isMenuShowing() && !this.graph.isMouseDown) {
          var k = this.graph.getTooltip(c, d, e, f);
          this.show(k, e, f);
          this.state = c;
          this.node = d;
          this.stateSource = g;
        }
      }), this.delay);
    }
};
mxTooltipHandler.prototype.hide = function() {
  this.resetTimer();
  this.hideTooltip();
};
mxTooltipHandler.prototype.hideTooltip = function() {
  null != this.div && (this.div.style.visibility = 'hidden', this.div.innerText = '');
};
mxTooltipHandler.prototype.show = function(a, b, c) {
  if (!this.destroyed && null != a && 0 < a.length) {
    null == this.div && this.init();
    var d = mxUtils.getScrollOrigin();
    this.div.style.zIndex = this.zIndex;
    this.div.style.left = b + d.x + 'px';
    this.div.style.top = c + mxConstants.TOOLTIP_VERTICAL_OFFSET + d.y + 'px';
    mxUtils.isNode(a) ? (this.div.innerText = '', this.div.appendChild(a)) : this.div.innerHTML = a.replace(/\n/g, '<br>');
    this.div.style.visibility = '';
    mxUtils.fit(this.div);
  }
};
mxTooltipHandler.prototype.destroy = function() {
  this.destroyed || (this.graph.removeMouseListener(this), mxEvent.release(this.div), null != this.div && null != this.div.parentNode && this.div.parentNode.removeChild(this.div), this.destroyed = !0, this.div = null);
};