function mxRectangle(a, b, c, d) {
  mxPoint.call(this, a, b);
  this.width = null != c ? c : 0;
  this.height = null != d ? d : 0;
}
mxRectangle.prototype = new mxPoint();
mxRectangle.prototype.constructor = mxRectangle;
mxRectangle.prototype.width = null;
mxRectangle.prototype.height = null;
mxRectangle.prototype.setRect = function(a, b, c, d) {
  this.x = a;
  this.y = b;
  this.width = c;
  this.height = d;
};
mxRectangle.prototype.getCenterX = function() {
  return this.x + this.width / 2;
};
mxRectangle.prototype.getCenterY = function() {
  return this.y + this.height / 2;
};
mxRectangle.prototype.add = function(a) {
  if (null != a) {
    var b = Math.min(this.x, a.x),
      c = Math.min(this.y, a.y),
      d = Math.max(this.x + this.width, a.x + a.width);
    a = Math.max(this.y + this.height, a.y + a.height);
    this.x = b;
    this.y = c;
    this.width = d - b;
    this.height = a - c;
  }
};
mxRectangle.prototype.intersect = function(a) {
  if (null != a) {
    var b = this.x + this.width,
      c = a.x + a.width,
      d = this.y + this.height,
      e = a.y + a.height;
    this.x = Math.max(this.x, a.x);
    this.y = Math.max(this.y, a.y);
    this.width = Math.min(b, c) - this.x;
    this.height = Math.min(d, e) - this.y;
  }
};
mxRectangle.prototype.grow = function(a) {
  this.x -= a;
  this.y -= a;
  this.width += 2 * a;
  this.height += 2 * a;
  return this;
};
mxRectangle.prototype.getPoint = function() {
  return new mxPoint(this.x, this.y);
};
mxRectangle.prototype.rotate90 = function() {
  var a = (this.width - this.height) / 2;
  this.x += a;
  this.y -= a;
  a = this.width;
  this.width = this.height;
  this.height = a;
};
mxRectangle.prototype.equals = function(a) {
  return null != a && a.x == this.x && a.y == this.y && a.width == this.width && a.height == this.height;
};
mxRectangle.fromPoint = function(a) {
  return new mxRectangle(a.x, a.y, 0, 0);
};
mxRectangle.fromRectangle = function(a) {
  return new mxRectangle(a.x, a.y, a.width, a.height);
};