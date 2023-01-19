function mxCircleLayout(a, b) {
  mxGraphLayout.call(this, a);
  this.radius = null != b ? b : 100;
}
mxCircleLayout.prototype = new mxGraphLayout();
mxCircleLayout.prototype.constructor = mxCircleLayout;
mxCircleLayout.prototype.radius = null;
mxCircleLayout.prototype.moveCircle = !1;
mxCircleLayout.prototype.x0 = 0;
mxCircleLayout.prototype.y0 = 0;
mxCircleLayout.prototype.resetEdges = !0;
mxCircleLayout.prototype.disableEdgeStyle = !0;
mxCircleLayout.prototype.execute = function(a) {
  var b = this.graph.getModel();
  b.beginUpdate();
  try {
    for (var c = 0, d = null, e = null, f = [], g = b.getChildCount(a), k = 0; k < g; k++) {
      var l = b.getChildAt(a, k);
      if (this.isVertexIgnored(l))
        this.isEdgeIgnored(l) || (this.resetEdges && this.graph.resetEdge(l), this.disableEdgeStyle && this.setEdgeStyleEnabled(l, !1));
      else {
        f.push(l);
        var m = this.getVertexBounds(l);
        d = null == d ? m.y : Math.min(d, m.y);
        e = null == e ? m.x : Math.min(e, m.x);
        c = Math.max(c, Math.max(m.width, m.height));
      }
    }
    var n = this.getRadius(f.length, c);
    this.moveCircle && (e = this.x0, d = this.y0);
    this.circle(f, n, e, d);
  } finally {
    b.endUpdate();
  }
};
mxCircleLayout.prototype.getRadius = function(a, b) {
  return Math.max(a * b / Math.PI, this.radius);
};
mxCircleLayout.prototype.circle = function(a, b, c, d) {
  for (var e = a.length, f = 2 * Math.PI / e, g = 0; g < e; g++)
    this.isVertexMovable(a[g]) && this.setVertexLocation(a[g], Math.round(c + b + b * Math.cos(g * f - Math.PI / 2)), Math.round(d + b + b * Math.sin(g * f - Math.PI / 2)));
};