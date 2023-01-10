function mxEllipse(a, b, c, d) {
  mxShape.call(this);
  this.bounds = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
}
mxUtils.extend(mxEllipse, mxShape);
mxEllipse.prototype.paintVertexShape = function(a, b, c, d, e) {
  a.ellipse(b, c, d, e);
  a.fillAndStroke();
};