function mxHexagon() {
  mxActor.call(this);
}
mxUtils.extend(mxHexagon, mxActor);
mxHexagon.prototype.redrawPath = function(a, b, c, d, e) {
  b = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
  this.addPoints(a, [
    new mxPoint(0.25 * d, 0),
    new mxPoint(0.75 * d, 0),
    new mxPoint(d, 0.5 * e),
    new mxPoint(0.75 * d, e),
    new mxPoint(0.25 * d, e),
    new mxPoint(0, 0.5 * e)
  ], this.isRounded, b, !0);
};