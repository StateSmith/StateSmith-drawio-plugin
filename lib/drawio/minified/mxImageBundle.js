function mxImageBundle(a) {
  this.images = [];
  this.alt = null != a ? a : !1;
}
mxImageBundle.prototype.images = null;
mxImageBundle.prototype.alt = null;
mxImageBundle.prototype.putImage = function(a, b, c) {
  this.images[a] = {
    value: b,
    fallback: c
  };
};
mxImageBundle.prototype.getImage = function(a) {
  var b = null;
  null != a && (a = this.images[a], null != a && (b = this.alt ? a.fallback : a.value));
  return b;
};