function mxPanningManager(a) {
  this.thread = null;
  this.active = !1;
  this.dy = this.dx = this.t0y = this.t0x = this.tdy = this.tdx = 0;
  this.scrollbars = !1;
  this.scrollTop = this.scrollLeft = 0;
  this.mouseListener = {
    mouseDown: function(c, d) {},
    mouseMove: function(c, d) {},
    mouseUp: mxUtils.bind(this, function(c, d) {
      this.active && this.stop();
    })
  };
  a.addMouseListener(this.mouseListener);
  this.mouseUpListener = mxUtils.bind(this, function() {
    this.active && this.stop();
  });
  mxEvent.addListener(document, 'mouseup', this.mouseUpListener);
  var b = mxUtils.bind(this, function() {
    this.scrollbars = mxUtils.hasScrollbars(a.container);
    this.scrollLeft = a.container.scrollLeft;
    this.scrollTop = a.container.scrollTop;
    return window.setInterval(mxUtils.bind(this, function() {
      this.tdx -= this.dx;
      this.tdy -= this.dy;
      this.scrollbars ? (a.panGraph(-a.container.scrollLeft - Math.ceil(this.dx), -a.container.scrollTop - Math.ceil(this.dy)), a.panDx = this.scrollLeft - a.container.scrollLeft, a.panDy = this.scrollTop - a.container.scrollTop, a.fireEvent(new mxEventObject(mxEvent.PAN))) : a.panGraph(this.getDx(), this.getDy());
    }), this.delay);
  });
  this.isActive = function() {
    return active;
  };
  this.getDx = function() {
    return Math.round(this.tdx);
  };
  this.getDy = function() {
    return Math.round(this.tdy);
  };
  this.start = function() {
    this.t0x = a.view.translate.x;
    this.t0y = a.view.translate.y;
    this.active = !0;
  };
  this.panTo = function(c, d, e, f) {
    this.active || this.start();
    this.scrollLeft = a.container.scrollLeft;
    this.scrollTop = a.container.scrollTop;
    var g = a.container;
    this.dx = c + (null != e ? e : 0) - g.scrollLeft - g.clientWidth;
    this.dx = 0 > this.dx && Math.abs(this.dx) < this.border ? this.border + this.dx : this.handleMouseOut ? Math.max(this.dx, 0) : 0;
    0 == this.dx && (this.dx = c - g.scrollLeft, this.dx = 0 < this.dx && this.dx < this.border ? this.dx - this.border : this.handleMouseOut ? Math.min(0, this.dx) : 0);
    this.dy = d + (null != f ? f : 0) - g.scrollTop - g.clientHeight;
    this.dy = 0 > this.dy && Math.abs(this.dy) < this.border ? this.border + this.dy : this.handleMouseOut ? Math.max(this.dy, 0) : 0;
    0 == this.dy && (this.dy = d - g.scrollTop, this.dy = 0 < this.dy && this.dy < this.border ? this.dy - this.border : this.handleMouseOut ? Math.min(0, this.dy) : 0);
    0 != this.dx || 0 != this.dy ? (this.dx *= this.damper, this.dy *= this.damper, null == this.thread && (this.thread = b())) : null != this.thread && (window.clearInterval(this.thread), this.thread = null);
  };
  this.stop = function() {
    if (this.active)
      if (this.active = !1, null != this.thread && (window.clearInterval(this.thread), this.thread = null), this.tdy = this.tdx = 0, this.scrollbars)
        a.panDx = 0, a.panDy = 0, a.fireEvent(new mxEventObject(mxEvent.PAN));
      else {
        var c = a.panDx,
          d = a.panDy;
        if (0 != c || 0 != d)
          a.panGraph(0, 0), a.view.setTranslate(this.t0x + c / a.view.scale, this.t0y + d / a.view.scale);
      }
  };
  this.destroy = function() {
    a.removeMouseListener(this.mouseListener);
    mxEvent.removeListener(document, 'mouseup', this.mouseUpListener);
  };
}
mxPanningManager.prototype.damper = 1 / 6;
mxPanningManager.prototype.delay = 10;
mxPanningManager.prototype.handleMouseOut = !0;
mxPanningManager.prototype.border = 0;