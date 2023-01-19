function mxParallelEdgeLayout(a) {
  mxGraphLayout.call(this, a);
}
mxParallelEdgeLayout.prototype = new mxGraphLayout();
mxParallelEdgeLayout.prototype.constructor = mxParallelEdgeLayout;
mxParallelEdgeLayout.prototype.spacing = 20;
mxParallelEdgeLayout.prototype.checkOverlap = !1;
mxParallelEdgeLayout.prototype.execute = function(a, b) {
  a = this.findParallels(a, b);
  this.graph.model.beginUpdate();
  try {
    for (var c in a) {
      var d = a[c];
      1 < d.length && this.layout(d);
    }
  } finally {
    this.graph.model.endUpdate();
  }
};
mxParallelEdgeLayout.prototype.findParallels = function(a, b) {
  var c = [],
    d = mxUtils.bind(this, function(g) {
      if (!this.isEdgeIgnored(g)) {
        var k = this.getEdgeId(g);
        null != k && (null == c[k] && (c[k] = []), c[k].push(g));
      }
    });
  if (null != b)
    for (var e = 0; e < b.length; e++)
      d(b[e]);
  else {
    b = this.graph.getModel();
    var f = b.getChildCount(a);
    for (e = 0; e < f; e++)
      d(b.getChildAt(a, e));
  }
  return c;
};
mxParallelEdgeLayout.prototype.getEdgeId = function(a) {
  var b = this.graph.getView(),
    c = b.getVisibleTerminal(a, !0);
  b = b.getVisibleTerminal(a, !1);
  var d = '';
  if (null != c && null != b) {
    c = mxObjectIdentity.get(c);
    b = mxObjectIdentity.get(b);
    if (this.checkOverlap && (a = this.graph.view.getState(a), null != a && null != a.absolutePoints)) {
      d = [];
      for (var e = 0; e < a.absolutePoints.length; e++) {
        var f = a.absolutePoints[e];
        null != f && d.push(f.x, f.y);
      }
      d = d.join(',');
    }
    return (c > b ? b + '-' + c : c + '-' + b) + d;
  }
  return null;
};
mxParallelEdgeLayout.prototype.layout = function(a) {
  var b = a[0],
    c = this.graph.getView(),
    d = this.graph.getModel(),
    e = d.getGeometry(c.getVisibleTerminal(b, !0));
  d = d.getGeometry(c.getVisibleTerminal(b, !1));
  if (e == d) {
    b = e.x + e.width + this.spacing;
    c = e.y + e.height / 2;
    for (var f = 0; f < a.length; f++)
      this.route(a[f], b, c), b += this.spacing;
  } else if (null != e && null != d) {
    b = e.x + e.width / 2;
    c = e.y + e.height / 2;
    f = d.x + d.width / 2 - b;
    var g = d.y + d.height / 2 - c;
    d = Math.sqrt(f * f + g * g);
    if (0 < d)
      for (e = g * this.spacing / d, d = f * this.spacing / d, b = b + f / 2 + e * (a.length - 1) / 2, c = c + g / 2 - d * (a.length - 1) / 2, f = 0; f < a.length; f++)
        this.route(a[f], b, c), b -= e, c += d;
  }
};
mxParallelEdgeLayout.prototype.route = function(a, b, c) {
  this.graph.isCellMovable(a) && this.setEdgePoints(a, [new mxPoint(b, c)]);
};