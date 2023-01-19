function mxLine(a, b, c, d) {
  mxShape.call(this);
  this.bounds = a;
  this.stroke = b;
  this.strokewidth = null != c ? c : 1;
  this.vertical = null != d ? d : this.vertical;
}
mxUtils.extend(mxLine, mxShape);
mxLine.prototype.vertical = !1;
mxLine.prototype.paintVertexShape = function(a, b, c, d, e) {
  a.begin();
  if (this.vertical) {
    var f = b + d / 2;
    a.moveTo(f, c);
    a.lineTo(f, c + e);
  } else
    f = c + e / 2, a.moveTo(b, f), a.lineTo(b + d, f);
  a.stroke();
};