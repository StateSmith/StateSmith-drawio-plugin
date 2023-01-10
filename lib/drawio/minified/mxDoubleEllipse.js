function mxDoubleEllipse(a, b, c, d) {
  mxShape.call(this);
  this.bounds = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
}
mxUtils.extend(mxDoubleEllipse, mxShape);
mxDoubleEllipse.prototype.paintBackground = function(a, b, c, d, e) {
  a.ellipse(b, c, d, e);
  a.fillAndStroke();
};
mxDoubleEllipse.prototype.paintForeground = function(a, b, c, d, e) {
  if (!this.outline) {
    var f = mxUtils.getValue(this.style, mxConstants.STYLE_MARGIN, Math.min(3 + this.strokewidth, Math.min(d / 5, e / 5)));
    b += f;
    c += f;
    d -= 2 * f;
    e -= 2 * f;
    0 < d && 0 < e && a.ellipse(b, c, d, e);
    a.stroke();
  }
};
mxDoubleEllipse.prototype.getLabelBounds = function(a) {
  var b = mxUtils.getValue(this.style, mxConstants.STYLE_MARGIN, Math.min(3 + this.strokewidth, Math.min(a.width / 5 / this.scale, a.height / 5 / this.scale))) * this.scale;
  return new mxRectangle(a.x + b, a.y + b, a.width - 2 * b, a.height - 2 * b);
};