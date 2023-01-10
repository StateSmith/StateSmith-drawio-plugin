function mxConnector(a, b, c) {
  mxPolyline.call(this, a, b, c);
}
mxUtils.extend(mxConnector, mxPolyline);
mxConnector.prototype.updateBoundingBox = function() {
  this.useSvgBoundingBox = null != this.style && 1 == this.style[mxConstants.STYLE_CURVED];
  mxShape.prototype.updateBoundingBox.apply(this, arguments);
};
mxConnector.prototype.paintEdgeShape = function(a, b) {
  var c = this.createMarker(a, b, !0),
    d = this.createMarker(a, b, !1);
  mxPolyline.prototype.paintEdgeShape.apply(this, arguments);
  a.setFillColor(this.stroke);
  a.setShadow(!1);
  a.setDashed(!1);
  null != c && c();
  null != d && d();
};
mxConnector.prototype.createMarker = function(a, b, c) {
  var d = null,
    e = b.length,
    f = mxUtils.getValue(this.style, c ? mxConstants.STYLE_STARTARROW : mxConstants.STYLE_ENDARROW),
    g = c ? b[1] : b[e - 2];
  b = c ? b[0] : b[e - 1];
  if (null != f && null != g && null != b) {
    d = b.x - g.x;
    e = b.y - g.y;
    var k = Math.sqrt(d * d + e * e);
    g = d / k;
    d = e / k;
    e = mxUtils.getNumber(this.style, c ? mxConstants.STYLE_STARTSIZE : mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE);
    d = mxMarker.createMarker(a, this, f, b, g, d, e, c, this.strokewidth, 0 != this.style[c ? mxConstants.STYLE_STARTFILL : mxConstants.STYLE_ENDFILL]);
  }
  return d;
};
mxConnector.prototype.augmentBoundingBox = function(a) {
  mxShape.prototype.augmentBoundingBox.apply(this, arguments);
  var b = 0;
  mxUtils.getValue(this.style, mxConstants.STYLE_STARTARROW, mxConstants.NONE) != mxConstants.NONE && (b = mxUtils.getNumber(this.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE) + 1);
  mxUtils.getValue(this.style, mxConstants.STYLE_ENDARROW, mxConstants.NONE) != mxConstants.NONE && (b = Math.max(b, mxUtils.getNumber(this.style, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE)) + 1);
  a.grow(b * this.scale);
};