function mxEdgeSegmentHandler(a) {
  mxEdgeHandler.call(this, a);
}
mxUtils.extend(mxEdgeSegmentHandler, mxElbowEdgeHandler);
mxEdgeSegmentHandler.prototype.getCurrentPoints = function() {
  var a = this.state.absolutePoints;
  if (null != a) {
    var b = Math.max(1, this.graph.view.scale);
    if (2 == a.length || 3 == a.length && (Math.abs(a[0].x - a[1].x) < b && Math.abs(a[1].x - a[2].x) < b || Math.abs(a[0].y - a[1].y) < b && Math.abs(a[1].y - a[2].y) < b)) {
      b = a[0].x + (a[a.length - 1].x - a[0].x) / 2;
      var c = a[0].y + (a[a.length - 1].y - a[0].y) / 2;
      a = [
        a[0],
        new mxPoint(b, c),
        new mxPoint(b, c),
        a[a.length - 1]
      ];
    }
  }
  return a;
};
mxEdgeSegmentHandler.prototype.getPreviewPoints = function(a) {
  if (this.isSource || this.isTarget)
    return mxElbowEdgeHandler.prototype.getPreviewPoints.apply(this, arguments);
  var b = this.getCurrentPoints(),
    c = this.convertPoint(b[0].clone(), !1);
  a = this.convertPoint(a.clone(), !1);
  for (var d = [], e = 1; e < b.length; e++) {
    var f = this.convertPoint(b[e].clone(), !1);
    e == this.index && (0 == Math.round(c.x - f.x) && (c.x = a.x, f.x = a.x), 0 == Math.round(c.y - f.y) && (c.y = a.y, f.y = a.y));
    e < b.length - 1 && d.push(f);
    c = f;
  }
  if (1 == d.length) {
    b = this.state.getVisibleTerminalState(!0);
    c = this.state.getVisibleTerminalState(!1);
    f = this.state.view.getScale();
    var g = this.state.view.getTranslate();
    e = d[0].x * f + g.x;
    f = d[0].y * f + g.y;
    if (null != b && mxUtils.contains(b, e, f) || null != c && mxUtils.contains(c, e, f))
      d = [
        a,
        a
      ];
  }
  return d;
};
mxEdgeSegmentHandler.prototype.updatePreviewState = function(a, b, c, d) {
  mxEdgeHandler.prototype.updatePreviewState.apply(this, arguments);
  if (!this.isSource && !this.isTarget) {
    b = this.convertPoint(b.clone(), !1);
    for (var e = a.absolutePoints, f = e[0], g = e[1], k = [], l = 2; l < e.length; l++) {
      var m = e[l];
      0 == Math.round(f.x - g.x) && 0 == Math.round(g.x - m.x) || 0 == Math.round(f.y - g.y) && 0 == Math.round(g.y - m.y) || k.push(this.convertPoint(g.clone(), !1));
      f = g;
      g = m;
    }
    f = this.state.getVisibleTerminalState(!0);
    g = this.state.getVisibleTerminalState(!1);
    l = this.state.absolutePoints;
    if (0 == k.length && (0 == Math.round(e[0].x - e[e.length - 1].x) || 0 == Math.round(e[0].y - e[e.length - 1].y)))
      k = [
        b,
        b
      ];
    else if (5 == e.length && 2 == k.length && null != f && null != g && null != l && 0 == Math.round(l[0].x - l[l.length - 1].x)) {
      k = this.graph.getView();
      l = k.getScale();
      m = k.getTranslate();
      e = k.getRoutingCenterY(f) / l - m.y;
      var n = this.graph.getConnectionConstraint(a, f, !0);
      null != n && (n = this.graph.getConnectionPoint(f, n), null != n && (this.convertPoint(n, !1), e = n.y));
      k = k.getRoutingCenterY(g) / l - m.y;
      if (l = this.graph.getConnectionConstraint(a, g, !1))
        n = this.graph.getConnectionPoint(g, l), null != n && (this.convertPoint(n, !1), k = n.y);
      k = [
        new mxPoint(b.x, e),
        new mxPoint(b.x, k)
      ];
    }
    this.points = k;
    a.view.updateFixedTerminalPoints(a, f, g);
    a.view.updatePoints(a, this.points, f, g);
    a.view.updateFloatingTerminalPoints(a, f, g);
  }
};
mxEdgeSegmentHandler.prototype.connect = function(a, b, c, d, e) {
  var f = this.graph.getModel(),
    g = f.getGeometry(a),
    k = null;
  if (null != g && null != g.points && 0 < g.points.length) {
    var l = this.abspoints,
      m = l[0],
      n = l[1];
    k = [];
    for (var p = 2; p < l.length; p++) {
      var r = l[p];
      0 == Math.round(m.x - n.x) && 0 == Math.round(n.x - r.x) || 0 == Math.round(m.y - n.y) && 0 == Math.round(n.y - r.y) || k.push(this.convertPoint(n.clone(), !1));
      m = n;
      n = r;
    }
  }
  f.beginUpdate();
  try {
    null != k && (g = f.getGeometry(a), null != g && (g = g.clone(), g.points = k, f.setGeometry(a, g))), a = mxEdgeHandler.prototype.connect.apply(this, arguments);
  } finally {
    f.endUpdate();
  }
  return a;
};
mxEdgeSegmentHandler.prototype.getTooltipForNode = function(a) {
  return null;
};
mxEdgeSegmentHandler.prototype.start = function(a, b, c) {
  mxEdgeHandler.prototype.start.apply(this, arguments);
  null == this.bends || null == this.bends[c] || this.isSource || this.isTarget || mxUtils.setOpacity(this.bends[c].node, 100);
};
mxEdgeSegmentHandler.prototype.createBends = function() {
  var a = [],
    b = this.createHandleShape(0);
  this.initBend(b);
  b.setCursor(mxConstants.CURSOR_TERMINAL_HANDLE);
  a.push(b);
  var c = this.getCurrentPoints();
  if (this.graph.isCellBendable(this.state.cell)) {
    null == this.points && (this.points = []);
    for (var d = 0; d < c.length - 1; d++) {
      b = this.createVirtualBend();
      a.push(b);
      var e = 0 == Math.round(c[d].x - c[d + 1].x);
      0 == Math.round(c[d].y - c[d + 1].y) && d < c.length - 2 && (e = 0 == Math.round(c[d].x - c[d + 2].x));
      b.setCursor(e ? 'col-resize' : 'row-resize');
      this.points.push(new mxPoint(0, 0));
    }
  }
  b = this.createHandleShape(c.length, null, !0);
  this.initBend(b);
  b.setCursor(mxConstants.CURSOR_TERMINAL_HANDLE);
  a.push(b);
  return a;
};
mxEdgeSegmentHandler.prototype.redraw = function() {
  this.refresh();
  mxEdgeHandler.prototype.redraw.apply(this, arguments);
};
mxEdgeSegmentHandler.prototype.redrawInnerBends = function(a, b) {
  if (this.graph.isCellBendable(this.state.cell)) {
    var c = this.getCurrentPoints();
    if (null != c && 1 < c.length) {
      var d = !1;
      if (4 == c.length && 0 == Math.round(c[1].x - c[2].x) && 0 == Math.round(c[1].y - c[2].y))
        if (d = !0, 0 == Math.round(c[0].y - c[c.length - 1].y)) {
          var e = c[0].x + (c[c.length - 1].x - c[0].x) / 2;
          c[1] = new mxPoint(e, c[1].y);
          c[2] = new mxPoint(e, c[2].y);
        } else
          e = c[0].y + (c[c.length - 1].y - c[0].y) / 2, c[1] = new mxPoint(c[1].x, e), c[2] = new mxPoint(c[2].x, e);
      for (e = 0; e < c.length - 1; e++)
        null != this.bends[e + 1] && (a = c[e], b = c[e + 1], a = new mxPoint(a.x + (b.x - a.x) / 2, a.y + (b.y - a.y) / 2), b = this.bends[e + 1].bounds, this.bends[e + 1].bounds = new mxRectangle(Math.floor(a.x - b.width / 2), Math.floor(a.y - b.height / 2), b.width, b.height), this.bends[e + 1].redraw(), this.manageLabelHandle && this.checkLabelHandle(this.bends[e + 1].bounds));
      d && (mxUtils.setOpacity(this.bends[1].node, this.virtualBendOpacity), mxUtils.setOpacity(this.bends[3].node, this.virtualBendOpacity));
    }
  }
};