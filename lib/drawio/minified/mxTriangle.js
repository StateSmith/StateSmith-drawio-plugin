function mxTriangle() {
  mxActor.call(this);
}
mxUtils.extend(mxTriangle, mxActor);
mxTriangle.prototype.isRoundable = function() {
  return !0;
};
mxTriangle.prototype.redrawPath = function(a, b, c, d, e) {
  b = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
  this.addPoints(a, [
    new mxPoint(0, 0),
    new mxPoint(d, 0.5 * e),
    new mxPoint(0, e)
  ], this.isRounded, b, !0);
};