function mxGeometry(a, b, c, d) {
  mxRectangle.call(this, a, b, c, d);
}
mxGeometry.prototype = new mxRectangle();
mxGeometry.prototype.constructor = mxGeometry;
mxGeometry.prototype.TRANSLATE_CONTROL_POINTS = !0;
mxGeometry.prototype.alternateBounds = null;
mxGeometry.prototype.sourcePoint = null;
mxGeometry.prototype.targetPoint = null;
mxGeometry.prototype.points = null;
mxGeometry.prototype.offset = null;
mxGeometry.prototype.relative = !1;
mxGeometry.prototype.swap = function() {
  if (null != this.alternateBounds) {
    var a = new mxRectangle(this.x, this.y, this.width, this.height);
    this.x = this.alternateBounds.x;
    this.y = this.alternateBounds.y;
    this.width = this.alternateBounds.width;
    this.height = this.alternateBounds.height;
    this.alternateBounds = a;
  }
};
mxGeometry.prototype.getTerminalPoint = function(a) {
  return a ? this.sourcePoint : this.targetPoint;
};
mxGeometry.prototype.setTerminalPoint = function(a, b) {
  b ? this.sourcePoint = a : this.targetPoint = a;
  return a;
};
mxGeometry.prototype.rotate = function(a, b) {
  var c = mxUtils.toRadians(a);
  a = Math.cos(c);
  c = Math.sin(c);
  if (!this.relative) {
    var d = new mxPoint(this.getCenterX(), this.getCenterY());
    d = mxUtils.getRotatedPoint(d, a, c, b);
    this.x = Math.round(d.x - this.width / 2);
    this.y = Math.round(d.y - this.height / 2);
  }
  null != this.sourcePoint && (d = mxUtils.getRotatedPoint(this.sourcePoint, a, c, b), this.sourcePoint.x = Math.round(d.x), this.sourcePoint.y = Math.round(d.y));
  null != this.targetPoint && (d = mxUtils.getRotatedPoint(this.targetPoint, a, c, b), this.targetPoint.x = Math.round(d.x), this.targetPoint.y = Math.round(d.y));
  if (null != this.points)
    for (var e = 0; e < this.points.length; e++)
      null != this.points[e] && (d = mxUtils.getRotatedPoint(this.points[e], a, c, b), this.points[e].x = Math.round(d.x), this.points[e].y = Math.round(d.y));
};
mxGeometry.prototype.translate = function(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  this.relative || (this.x = parseFloat(this.x) + a, this.y = parseFloat(this.y) + b);
  null != this.sourcePoint && (this.sourcePoint.x = parseFloat(this.sourcePoint.x) + a, this.sourcePoint.y = parseFloat(this.sourcePoint.y) + b);
  null != this.targetPoint && (this.targetPoint.x = parseFloat(this.targetPoint.x) + a, this.targetPoint.y = parseFloat(this.targetPoint.y) + b);
  if (this.TRANSLATE_CONTROL_POINTS && null != this.points)
    for (var c = 0; c < this.points.length; c++)
      null != this.points[c] && (this.points[c].x = parseFloat(this.points[c].x) + a, this.points[c].y = parseFloat(this.points[c].y) + b);
};
mxGeometry.prototype.scale = function(a, b, c) {
  a = parseFloat(a);
  b = parseFloat(b);
  null != this.sourcePoint && (this.sourcePoint.x = parseFloat(this.sourcePoint.x) * a, this.sourcePoint.y = parseFloat(this.sourcePoint.y) * b);
  null != this.targetPoint && (this.targetPoint.x = parseFloat(this.targetPoint.x) * a, this.targetPoint.y = parseFloat(this.targetPoint.y) * b);
  if (null != this.points)
    for (var d = 0; d < this.points.length; d++)
      null != this.points[d] && (this.points[d].x = parseFloat(this.points[d].x) * a, this.points[d].y = parseFloat(this.points[d].y) * b);
  this.relative || (this.x = parseFloat(this.x) * a, this.y = parseFloat(this.y) * b, c && (b = a = Math.min(a, b)), this.width = parseFloat(this.width) * a, this.height = parseFloat(this.height) * b);
};
mxGeometry.prototype.equals = function(a) {
  return mxRectangle.prototype.equals.apply(this, arguments) && this.relative == a.relative && (null == this.sourcePoint && null == a.sourcePoint || null != this.sourcePoint && this.sourcePoint.equals(a.sourcePoint)) && (null == this.targetPoint && null == a.targetPoint || null != this.targetPoint && this.targetPoint.equals(a.targetPoint)) && (null == this.points && null == a.points || null != this.points && mxUtils.equalPoints(this.points, a.points)) && (null == this.alternateBounds && null == a.alternateBounds || null != this.alternateBounds && this.alternateBounds.equals(a.alternateBounds)) && (null == this.offset && null == a.offset || null != this.offset && this.offset.equals(a.offset));
};