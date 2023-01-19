function mxPolyline(a, b, c) {
  mxShape.call(this);
  this.points = a;
  this.stroke = b;
  this.strokewidth = null != c ? c : 1;
}
mxUtils.extend(mxPolyline, mxShape);
mxPolyline.prototype.getRotation = function() {
  return 0;
};
mxPolyline.prototype.getShapeRotation = function() {
  return 0;
};
mxPolyline.prototype.isPaintBoundsInverted = function() {
  return !1;
};
mxPolyline.prototype.paintEdgeShape = function(a, b) {
  var c = a.pointerEventsValue;
  a.pointerEventsValue = 'stroke';
  null == this.style || 1 != this.style[mxConstants.STYLE_CURVED] ? this.paintLine(a, b, this.isRounded) : this.paintCurvedLine(a, b);
  a.pointerEventsValue = c;
};
mxPolyline.prototype.paintLine = function(a, b, c) {
  var d = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
  a.begin();
  this.addPoints(a, b, c, d, !1);
  a.stroke();
};
mxPolyline.prototype.paintCurvedLine = function(a, b) {
  a.begin();
  var c = b[0],
    d = b.length;
  a.moveTo(c.x, c.y);
  for (c = 1; c < d - 2; c++) {
    var e = b[c],
      f = b[c + 1];
    a.quadTo(e.x, e.y, (e.x + f.x) / 2, (e.y + f.y) / 2);
  }
  e = b[d - 2];
  f = b[d - 1];
  a.quadTo(e.x, e.y, f.x, f.y);
  a.stroke();
};