function mxRectangleShape(a, b, c, d) {
  mxShape.call(this);
  this.bounds = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
}
mxUtils.extend(mxRectangleShape, mxShape);
mxRectangleShape.prototype.isHtmlAllowed = function() {
  var a = !0;
  null != this.style && (a = '1' == mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1'));
  return !this.isRounded && !this.glass && 0 == this.rotation && (a || null != this.fill && this.fill != mxConstants.NONE);
};
mxRectangleShape.prototype.paintBackground = function(a, b, c, d, e) {
  if (this.isRounded) {
    if ('1' == mxUtils.getValue(this.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0))
      var f = Math.min(d / 2, Math.min(e / 2, mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2));
    else
      f = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, 100 * mxConstants.RECTANGLE_ROUNDING_FACTOR) / 100, f = Math.min(d * f, e * f);
    a.roundrect(b, c, d, e, f, f);
  } else
    a.rect(b, c, d, e);
  a.fillAndStroke();
};
mxRectangleShape.prototype.isRoundable = function() {
  return !0;
};
mxRectangleShape.prototype.paintForeground = function(a, b, c, d, e) {
  this.glass && !this.outline && null != this.fill && this.fill != mxConstants.NONE && this.paintGlassEffect(a, b, c, d, e, this.getArcSize(d + this.strokewidth, e + this.strokewidth));
};