function mxActor(a, b, c, d) {
  mxShape.call(this);
  this.bounds = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
}
mxUtils.extend(mxActor, mxShape);
mxActor.prototype.paintVertexShape = function(a, b, c, d, e) {
  a.translate(b, c);
  a.begin();
  this.redrawPath(a, b, c, d, e);
  a.fillAndStroke();
};
mxActor.prototype.redrawPath = function(a, b, c, d, e) {
  b = d / 3;
  a.moveTo(0, e);
  a.curveTo(0, 3 * e / 5, 0, 2 * e / 5, d / 2, 2 * e / 5);
  a.curveTo(d / 2 - b, 2 * e / 5, d / 2 - b, 0, d / 2, 0);
  a.curveTo(d / 2 + b, 0, d / 2 + b, 2 * e / 5, d / 2, 2 * e / 5);
  a.curveTo(d, 2 * e / 5, d, 3 * e / 5, d, e);
  a.close();
};