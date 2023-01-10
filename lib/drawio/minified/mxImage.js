function mxImage(a, b, c, d, e) {
  this.src = a;
  this.width = null != b ? b : this.width;
  this.height = null != c ? c : this.height;
  this.x = null != d ? d : this.x;
  this.y = null != e ? e : this.y;
}
mxImage.prototype.src = null;
mxImage.prototype.width = 0;
mxImage.prototype.height = 0;
mxImage.prototype.x = 0;
mxImage.prototype.y = 0;