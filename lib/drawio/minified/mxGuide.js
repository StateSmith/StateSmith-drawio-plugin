function mxGuide(a, b) {
  this.graph = a;
  this.setStates(b);
}
mxGuide.prototype.graph = null;
mxGuide.prototype.states = null;
mxGuide.prototype.horizontal = !0;
mxGuide.prototype.vertical = !0;
mxGuide.prototype.guideX = null;
mxGuide.prototype.guideY = null;
mxGuide.prototype.rounded = !1;
mxGuide.prototype.tolerance = 2;
mxGuide.prototype.setStates = function(a) {
  this.states = a;
};
mxGuide.prototype.isEnabledForEvent = function(a) {
  return !0;
};
mxGuide.prototype.getGuideTolerance = function(a) {
  return a && this.graph.gridEnabled ? this.graph.gridSize / 2 : this.tolerance;
};
mxGuide.prototype.createGuideShape = function(a) {
  a = new mxPolyline([], mxConstants.GUIDE_COLOR, mxConstants.GUIDE_STROKEWIDTH);
  a.isDashed = !0;
  return a;
};
mxGuide.prototype.isStateIgnored = function(a) {
  return !1;
};
mxGuide.prototype.move = function(a, b, c, d) {
  if (null != this.states && (this.horizontal || this.vertical) && null != a && null != b) {
    d = function(B, v, y) {
      var F = !1;
      y && Math.abs(B - D) < t ? (b.y = B - a.getCenterY(), t = Math.abs(B - D), F = !0) : y || (Math.abs(B - E) < t ? (b.y = B - a.y, t = Math.abs(B - E), F = !0) : Math.abs(B - C) < t && (b.y = B - a.y - a.height, t = Math.abs(B - C), F = !0));
      F && (p = v, r = B, null == this.guideY && (this.guideY = this.createGuideShape(!1), this.guideY.dialect = mxConstants.DIALECT_SVG, this.guideY.pointerEvents = !1, this.guideY.init(this.graph.getView().getOverlayPane())));
      n = n || F;
    };
    var e = function(B, v, y) {
        var F = !1;
        y && Math.abs(B - A) < q ? (b.x = B - a.getCenterX(), q = Math.abs(B - A), F = !0) : y || (Math.abs(B - u) < q ? (b.x = B - a.x, q = Math.abs(B - u), F = !0) : Math.abs(B - x) < q && (b.x = B - a.x - a.width, q = Math.abs(B - x), F = !0));
        F && (l = v, m = B, null == this.guideX && (this.guideX = this.createGuideShape(!0), this.guideX.dialect = mxConstants.DIALECT_SVG, this.guideX.pointerEvents = !1, this.guideX.init(this.graph.getView().getOverlayPane())));
        k = k || F;
      },
      f = this.graph.getView().scale;
    f *= this.getGuideTolerance(c);
    var g = a.clone();
    g.x += b.x;
    g.y += b.y;
    var k = !1,
      l = null,
      m = null,
      n = !1,
      p = null,
      r = null,
      q = f,
      t = f,
      u = g.x,
      x = g.x + g.width,
      A = g.getCenterX(),
      E = g.y,
      C = g.y + g.height,
      D = g.getCenterY();
    for (f = 0; f < this.states.length; f++)
      g = this.states[f], null == g || this.isStateIgnored(g) || (this.horizontal && (e.call(this, g.getCenterX(), g, !0), e.call(this, g.x, g, !1), e.call(this, g.x + g.width, g, !1), null == g.cell && e.call(this, g.getCenterX(), g, !1)), this.vertical && (d.call(this, g.getCenterY(), g, !0), d.call(this, g.y, g, !1), d.call(this, g.y + g.height, g, !1), null == g.cell && d.call(this, g.getCenterY(), g, !1)));
    this.graph.snapDelta(b, a, !c, k, n);
    b = this.getDelta(a, l, b.x, p, b.y);
    c = this.graph.container;
    k || null == this.guideX ? null != this.guideX && (e = d = null, null != l && null != a && (d = Math.min(a.y + b.y - this.graph.panDy, l.y), e = Math.max(a.y + a.height + b.y - this.graph.panDy, l.y + l.height)), this.guideX.points = null != d && null != e ? [
      new mxPoint(m, d),
      new mxPoint(m, e)
    ] : [
      new mxPoint(m, -this.graph.panDy),
      new mxPoint(m, c.scrollHeight - 3 - this.graph.panDy)
    ], this.guideX.stroke = this.getGuideColor(l, !0), this.guideX.node.style.visibility = 'visible', this.guideX.redraw()) : this.guideX.node.style.visibility = 'hidden';
    n || null == this.guideY ? null != this.guideY && (e = d = null, null != p && null != a && (d = Math.min(a.x + b.x - this.graph.panDx, p.x), e = Math.max(a.x + a.width + b.x - this.graph.panDx, p.x + p.width)), this.guideY.points = null != d && null != e ? [
      new mxPoint(d, r),
      new mxPoint(e, r)
    ] : [
      new mxPoint(-this.graph.panDx, r),
      new mxPoint(c.scrollWidth - 3 - this.graph.panDx, r)
    ], this.guideY.stroke = this.getGuideColor(p, !1), this.guideY.node.style.visibility = 'visible', this.guideY.redraw()) : this.guideY.node.style.visibility = 'hidden';
  }
  return b;
};
mxGuide.prototype.getDelta = function(a, b, c, d, e) {
  var f = this.graph.view.scale;
  if (this.rounded || null != b && null == b.cell)
    c = Math.round((a.x + c) / f) * f - a.x;
  if (this.rounded || null != d && null == d.cell)
    e = Math.round((a.y + e) / f) * f - a.y;
  return new mxPoint(c, e);
};
mxGuide.prototype.getGuideColor = function(a, b) {
  return mxConstants.GUIDE_COLOR;
};
mxGuide.prototype.hide = function() {
  this.setVisible(!1);
};
mxGuide.prototype.setVisible = function(a) {
  null != this.guideX && (this.guideX.node.style.visibility = a ? 'visible' : 'hidden');
  null != this.guideY && (this.guideY.node.style.visibility = a ? 'visible' : 'hidden');
};
mxGuide.prototype.destroy = function() {
  null != this.guideX && (this.guideX.destroy(), this.guideX = null);
  null != this.guideY && (this.guideY.destroy(), this.guideY = null);
};