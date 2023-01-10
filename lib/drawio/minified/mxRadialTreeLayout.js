function mxRadialTreeLayout(a) {
  mxCompactTreeLayout.call(this, a, !1);
}
mxUtils.extend(mxRadialTreeLayout, mxCompactTreeLayout);
mxRadialTreeLayout.prototype.angleOffset = 0.5;
mxRadialTreeLayout.prototype.rootx = 0;
mxRadialTreeLayout.prototype.rooty = 0;
mxRadialTreeLayout.prototype.levelDistance = 120;
mxRadialTreeLayout.prototype.nodeDistance = 10;
mxRadialTreeLayout.prototype.autoRadius = !1;
mxRadialTreeLayout.prototype.sortEdges = !1;
mxRadialTreeLayout.prototype.rowMinX = [];
mxRadialTreeLayout.prototype.rowMaxX = [];
mxRadialTreeLayout.prototype.rowMinCenX = [];
mxRadialTreeLayout.prototype.rowMaxCenX = [];
mxRadialTreeLayout.prototype.rowRadi = [];
mxRadialTreeLayout.prototype.row = [];
mxRadialTreeLayout.prototype.isVertexIgnored = function(a) {
  return mxGraphLayout.prototype.isVertexIgnored.apply(this, arguments) || 0 == this.graph.getConnections(a).length;
};
mxRadialTreeLayout.prototype.execute = function(a, b) {
  this.parent = a;
  this.edgeRouting = this.useBoundingBox = !1;
  mxCompactTreeLayout.prototype.execute.apply(this, arguments);
  var c = null,
    d = this.getVertexBounds(this.root);
  this.centerX = d.x + d.width / 2;
  this.centerY = d.y + d.height / 2;
  for (var e in this.visited) {
    var f = this.getVertexBounds(this.visited[e]);
    c = null != c ? c : f.clone();
    c.add(f);
  }
  this.calcRowDims([this.node], 0);
  var g = 0,
    k = 0;
  for (c = 0; c < this.row.length; c++)
    e = (this.rowMaxX[c] - this.centerX - this.nodeDistance) / this.rowRadi[c], g = Math.max(g, (this.centerX - this.rowMinX[c] - this.nodeDistance) / this.rowRadi[c]), k = Math.max(k, e);
  for (c = 0; c < this.row.length; c++) {
    var l = this.centerX - this.nodeDistance - g * this.rowRadi[c],
      m = this.centerX + this.nodeDistance + k * this.rowRadi[c] - l;
    for (e = 0; e < this.row[c].length; e++)
      f = this.row[c], d = f[e], f = this.getVertexBounds(d.cell), d.theta = (f.x + f.width / 2 - l) / m * Math.PI * 2;
  }
  for (c = this.row.length - 2; 0 <= c; c--)
    for (f = this.row[c], e = 0; e < f.length; e++) {
      d = f[e];
      g = d.child;
      for (l = k = 0; null != g;)
        l += g.theta, k++, g = g.next;
      0 < k && (g = l / k, g > d.theta && e < f.length - 1 ? d.theta = Math.min(g, f[e + 1].theta - Math.PI / 10) : g < d.theta && 0 < e && (d.theta = Math.max(g, f[e - 1].theta + Math.PI / 10)));
    }
  for (c = 0; c < this.row.length; c++)
    for (e = 0; e < this.row[c].length; e++)
      f = this.row[c], d = f[e], f = this.getVertexBounds(d.cell), this.setVertexLocation(d.cell, this.centerX - f.width / 2 + this.rowRadi[c] * Math.cos(d.theta), this.centerY - f.height / 2 + this.rowRadi[c] * Math.sin(d.theta));
};
mxRadialTreeLayout.prototype.calcRowDims = function(a, b) {
  if (null != a && 0 != a.length) {
    this.rowMinX[b] = this.centerX;
    this.rowMaxX[b] = this.centerX;
    this.rowMinCenX[b] = this.centerX;
    this.rowMaxCenX[b] = this.centerX;
    this.row[b] = [];
    for (var c = !1, d = 0; d < a.length; d++)
      for (var e = null != a[d] ? a[d].child : null; null != e;) {
        var f = this.getVertexBounds(e.cell);
        this.rowMinX[b] = Math.min(f.x, this.rowMinX[b]);
        this.rowMaxX[b] = Math.max(f.x + f.width, this.rowMaxX[b]);
        this.rowMinCenX[b] = Math.min(f.x + f.width / 2, this.rowMinCenX[b]);
        this.rowMaxCenX[b] = Math.max(f.x + f.width / 2, this.rowMaxCenX[b]);
        this.rowRadi[b] = f.y - this.getVertexBounds(this.root).y;
        null != e.child && (c = !0);
        this.row[b].push(e);
        e = e.next;
      }
    c && this.calcRowDims(this.row[b], b + 1);
  }
};