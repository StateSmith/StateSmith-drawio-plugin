function mxRhombus(a, b, c, d) {
  mxShape.call(this);
  this.bounds = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
}
mxUtils.extend(mxRhombus, mxShape);
mxRhombus.prototype.isRoundable = function() {
  return !0;
};
mxRhombus.prototype.paintVertexShape = function(a, b, c, d, e) {
  var f = d / 2,
    g = e / 2,
    k = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
  a.begin();
  this.addPoints(a, [
    new mxPoint(b + f, c),
    new mxPoint(b + d, c + g),
    new mxPoint(b + f, c + e),
    new mxPoint(b, c + g)
  ], this.isRounded, k, !0);
  a.fillAndStroke();
};