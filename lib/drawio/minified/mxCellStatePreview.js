function mxCellStatePreview(a) {
  this.deltas = new mxDictionary();
  this.graph = a;
}
mxCellStatePreview.prototype.graph = null;
mxCellStatePreview.prototype.deltas = null;
mxCellStatePreview.prototype.count = 0;
mxCellStatePreview.prototype.isEmpty = function() {
  return 0 == this.count;
};
mxCellStatePreview.prototype.moveState = function(a, b, c, d, e) {
  d = null != d ? d : !0;
  e = null != e ? e : !0;
  var f = this.deltas.get(a.cell);
  null == f ? (f = {
    point: new mxPoint(b, c),
    state: a
  }, this.deltas.put(a.cell, f), this.count++) : d ? (f.point.x += b, f.point.y += c) : (f.point.x = b, f.point.y = c);
  e && this.addEdges(a);
  return f.point;
};
mxCellStatePreview.prototype.show = function(a) {
  this.deltas.visit(mxUtils.bind(this, function(b, c) {
    this.translateState(c.state, c.point.x, c.point.y);
  }));
  this.deltas.visit(mxUtils.bind(this, function(b, c) {
    this.revalidateState(c.state, c.point.x, c.point.y, a);
  }));
};
mxCellStatePreview.prototype.translateState = function(a, b, c) {
  if (null != a) {
    var d = this.graph.getModel();
    if (d.isVertex(a.cell)) {
      a.view.updateCellState(a);
      var e = d.getGeometry(a.cell);
      0 == b && 0 == c || null == e || e.relative && null == this.deltas.get(a.cell) || (a.x += b, a.y += c);
    }
    e = d.getChildCount(a.cell);
    for (var f = 0; f < e; f++)
      this.translateState(a.view.getState(d.getChildAt(a.cell, f)), b, c);
  }
};
mxCellStatePreview.prototype.revalidateState = function(a, b, c, d) {
  if (null != a) {
    var e = this.graph.getModel();
    e.isEdge(a.cell) && a.view.updateCellState(a);
    var f = this.graph.getCellGeometry(a.cell),
      g = a.view.getState(e.getParent(a.cell));
    0 == b && 0 == c || null == f || !f.relative || !e.isVertex(a.cell) || null != g && !e.isVertex(g.cell) && null == this.deltas.get(a.cell) || (a.x += b, a.y += c);
    this.graph.cellRenderer.redraw(a);
    null != d && d(a);
    f = e.getChildCount(a.cell);
    for (g = 0; g < f; g++)
      this.revalidateState(this.graph.view.getState(e.getChildAt(a.cell, g)), b, c, d);
  }
};
mxCellStatePreview.prototype.addEdges = function(a) {
  for (var b = this.graph.getModel(), c = b.getEdgeCount(a.cell), d = 0; d < c; d++) {
    var e = a.view.getState(b.getEdgeAt(a.cell, d));
    null != e && this.moveState(e, 0, 0);
  }
};