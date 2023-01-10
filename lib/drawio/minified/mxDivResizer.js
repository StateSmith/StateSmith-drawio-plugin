function mxDivResizer(a, b) {
  'div' == a.nodeName.toLowerCase() && (null == b && (b = window), this.div = a, a = mxUtils.getCurrentStyle(a), null != a && (this.resizeWidth = 'auto' == a.width, this.resizeHeight = 'auto' == a.height), mxEvent.addListener(b, 'resize', mxUtils.bind(this, function(c) {
    this.handlingResize || (this.handlingResize = !0, this.resize(), this.handlingResize = !1);
  })), this.resize());
}
mxDivResizer.prototype.resizeWidth = !0;
mxDivResizer.prototype.resizeHeight = !0;
mxDivResizer.prototype.handlingResize = !1;
mxDivResizer.prototype.resize = function() {
  var a = this.getDocumentWidth(),
    b = this.getDocumentHeight(),
    c = parseInt(this.div.style.left),
    d = parseInt(this.div.style.right),
    e = parseInt(this.div.style.top),
    f = parseInt(this.div.style.bottom);
  this.resizeWidth && !isNaN(c) && !isNaN(d) && 0 <= c && 0 <= d && 0 < a - d - c && (this.div.style.width = a - d - c + 'px');
  this.resizeHeight && !isNaN(e) && !isNaN(f) && 0 <= e && 0 <= f && 0 < b - e - f && (this.div.style.height = b - e - f + 'px');
};
mxDivResizer.prototype.getDocumentWidth = function() {
  return document.body.clientWidth;
};
mxDivResizer.prototype.getDocumentHeight = function() {
  return document.body.clientHeight;
};