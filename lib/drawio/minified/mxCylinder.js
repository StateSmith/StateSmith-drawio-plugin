function mxCylinder(a, b, c, d) {
  mxShape.call(this);
  this.bounds = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
}
mxUtils.extend(mxCylinder, mxShape);
mxCylinder.prototype.maxHeight = 40;
mxCylinder.prototype.paintVertexShape = function(a, b, c, d, e) {
  a.translate(b, c);
  a.begin();
  this.redrawPath(a, b, c, d, e, !1);
  a.fillAndStroke();
  this.outline && null != this.style && 0 != mxUtils.getValue(this.style, mxConstants.STYLE_BACKGROUND_OUTLINE, 0) || (a.setShadow(!1), a.begin(), this.redrawPath(a, b, c, d, e, !0), a.stroke());
};
mxCylinder.prototype.getCylinderSize = function(a, b, c, d) {
  return Math.min(this.maxHeight, Math.round(d / 5));
};
mxCylinder.prototype.redrawPath = function(a, b, c, d, e, f) {
  b = this.getCylinderSize(b, c, d, e);
  if (f && null != this.fill || !f && null == this.fill)
    a.moveTo(0, b), a.curveTo(0, 2 * b, d, 2 * b, d, b), f || (a.stroke(), a.begin());
  f || (a.moveTo(0, b), a.curveTo(0, -b / 3, d, -b / 3, d, b), a.lineTo(d, e - b), a.curveTo(d, e + b / 3, 0, e + b / 3, 0, e - b), a.close());
};