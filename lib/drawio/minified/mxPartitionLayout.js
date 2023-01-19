function mxPartitionLayout(a, b, c, d) {
  mxGraphLayout.call(this, a);
  this.horizontal = null != b ? b : !0;
  this.spacing = c || 0;
  this.border = d || 0;
}
mxPartitionLayout.prototype = new mxGraphLayout();
mxPartitionLayout.prototype.constructor = mxPartitionLayout;
mxPartitionLayout.prototype.horizontal = null;
mxPartitionLayout.prototype.spacing = null;
mxPartitionLayout.prototype.border = null;
mxPartitionLayout.prototype.resizeVertices = !0;
mxPartitionLayout.prototype.isHorizontal = function() {
  return this.horizontal;
};
mxPartitionLayout.prototype.moveCell = function(a, b, c) {
  c = this.graph.getModel();
  var d = c.getParent(a);
  if (null != a && null != d) {
    var e, f = 0,
      g = c.getChildCount(d);
    for (e = 0; e < g; e++) {
      var k = c.getChildAt(d, e);
      k = this.getVertexBounds(k);
      if (null != k) {
        k = k.x + k.width / 2;
        if (f < b && k > b)
          break;
        f = k;
      }
    }
    b = d.getIndex(a);
    b = Math.max(0, e - (e > b ? 1 : 0));
    c.add(d, a, b);
  }
};
mxPartitionLayout.prototype.execute = function(a) {
  var b = this.isHorizontal(),
    c = this.graph.getModel(),
    d = c.getGeometry(a);
  null != this.graph.container && (null == d && c.isLayer(a) || a == this.graph.getView().currentRoot) && (d = new mxRectangle(0, 0, this.graph.container.offsetWidth - 1, this.graph.container.offsetHeight - 1));
  if (null != d) {
    for (var e = [], f = c.getChildCount(a), g = 0; g < f; g++) {
      var k = c.getChildAt(a, g);
      !this.isVertexIgnored(k) && this.isVertexMovable(k) && e.push(k);
    }
    f = e.length;
    if (0 < f) {
      var l = this.border,
        m = this.border,
        n = b ? d.height : d.width;
      n -= 2 * this.border;
      a = this.graph.isSwimlane(a) ? this.graph.getStartSize(a) : new mxRectangle();
      n -= b ? a.height : a.width;
      l += a.width;
      m += a.height;
      a = this.border + (f - 1) * this.spacing;
      d = b ? (d.width - l - a) / f : (d.height - m - a) / f;
      if (0 < d) {
        c.beginUpdate();
        try {
          for (g = 0; g < f; g++) {
            k = e[g];
            var p = c.getGeometry(k);
            null != p && (p = p.clone(), p.x = l, p.y = m, b ? (this.resizeVertices && (p.width = d, p.height = n), l += d + this.spacing) : (this.resizeVertices && (p.height = d, p.width = n), m += d + this.spacing), c.setGeometry(k, p));
          }
        } finally {
          c.endUpdate();
        }
      }
    }
  }
};