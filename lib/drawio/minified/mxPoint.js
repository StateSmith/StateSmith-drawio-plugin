function mxPoint(a, b) {
  this.x = null != a ? a : 0;
  this.y = null != b ? b : 0;
}
mxPoint.prototype.x = null;
mxPoint.prototype.y = null;
mxPoint.prototype.equals = function(a) {
  return null != a && a.x == this.x && a.y == this.y;
};
mxPoint.prototype.clone = function() {
  return mxUtils.clone(this);
};