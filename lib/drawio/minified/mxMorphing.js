function mxMorphing(a, b, c, d) {
  mxAnimation.call(this, d);
  this.graph = a;
  this.steps = null != b ? b : 6;
  this.ease = null != c ? c : 1.5;
}
mxMorphing.prototype = new mxAnimation();
mxMorphing.prototype.constructor = mxMorphing;
mxMorphing.prototype.graph = null;
mxMorphing.prototype.steps = null;
mxMorphing.prototype.step = 0;
mxMorphing.prototype.ease = null;
mxMorphing.prototype.cells = null;
mxMorphing.prototype.updateAnimation = function() {
  mxAnimation.prototype.updateAnimation.apply(this, arguments);
  var a = new mxCellStatePreview(this.graph);
  if (null != this.cells)
    for (var b = 0; b < this.cells.length; b++)
      this.animateCell(this.cells[b], a, !1);
  else
    this.animateCell(this.graph.getModel().getRoot(), a, !0);
  this.show(a);
  (a.isEmpty() || this.step++ >= this.steps) && this.stopAnimation();
};
mxMorphing.prototype.show = function(a) {
  a.show();
};
mxMorphing.prototype.animateCell = function(a, b, c) {
  var d = this.graph.getView().getState(a),
    e = null;
  if (null != d && (e = this.getDelta(d), this.graph.getModel().isVertex(a) && (0 != e.x || 0 != e.y))) {
    var f = this.graph.view.getTranslate(),
      g = this.graph.view.getScale();
    e.x += f.x * g;
    e.y += f.y * g;
    b.moveState(d, -e.x / this.ease, -e.y / this.ease);
  }
  if (c && !this.stopRecursion(d, e))
    for (d = this.graph.getModel().getChildCount(a), e = 0; e < d; e++)
      this.animateCell(this.graph.getModel().getChildAt(a, e), b, c);
};
mxMorphing.prototype.stopRecursion = function(a, b) {
  return null != b && (0 != b.x || 0 != b.y);
};
mxMorphing.prototype.getDelta = function(a) {
  var b = this.getOriginForCell(a.cell),
    c = this.graph.getView().getTranslate(),
    d = this.graph.getView().getScale();
  return new mxPoint((b.x - (a.x / d - c.x)) * d, (b.y - (a.y / d - c.y)) * d);
};
mxMorphing.prototype.getOriginForCell = function(a) {
  var b = null;
  if (null != a) {
    var c = this.graph.getModel().getParent(a);
    a = this.graph.getCellGeometry(a);
    b = this.getOriginForCell(c);
    null != a && (a.relative ? (c = this.graph.getCellGeometry(c), null != c && (b.x += a.x * c.width, b.y += a.y * c.height)) : (b.x += a.x, b.y += a.y));
  }
  null == b && (b = this.graph.view.getTranslate(), b = new mxPoint(-b.x, -b.y));
  return b;
};