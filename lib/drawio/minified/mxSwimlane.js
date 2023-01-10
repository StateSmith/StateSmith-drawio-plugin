function mxSwimlane(a, b, c, d) {
  mxShape.call(this);
  this.bounds = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
}
mxUtils.extend(mxSwimlane, mxShape);
mxSwimlane.prototype.imageSize = 16;
mxSwimlane.prototype.apply = function(a) {
  mxShape.prototype.apply.apply(this, arguments);
  null != this.style && (this.laneFill = mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_FILLCOLOR, mxConstants.NONE));
};
mxSwimlane.prototype.isRoundable = function() {
  return !0;
};
mxSwimlane.prototype.getTitleSize = function() {
  return Math.max(0, mxUtils.getValue(this.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE));
};
mxSwimlane.prototype.getLabelBounds = function(a) {
  var b = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_FLIPH, 0),
    c = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_FLIPV, 0);
  a = new mxRectangle(a.x, a.y, a.width, a.height);
  var d = this.isHorizontal(),
    e = this.getTitleSize(),
    f = this.direction == mxConstants.DIRECTION_NORTH || this.direction == mxConstants.DIRECTION_SOUTH;
  d = d == !f;
  b = !d && b != (this.direction == mxConstants.DIRECTION_SOUTH || this.direction == mxConstants.DIRECTION_WEST);
  c = d && c != (this.direction == mxConstants.DIRECTION_SOUTH || this.direction == mxConstants.DIRECTION_WEST);
  if (f) {
    e = Math.min(a.width, e * this.scale);
    if (b || c)
      a.x += a.width - e;
    a.width = e;
  } else {
    e = Math.min(a.height, e * this.scale);
    if (b || c)
      a.y += a.height - e;
    a.height = e;
  }
  return a;
};
mxSwimlane.prototype.getGradientBounds = function(a, b, c, d, e) {
  a = this.getTitleSize();
  return this.isHorizontal() ? new mxRectangle(b, c, d, Math.min(a, e)) : new mxRectangle(b, c, Math.min(a, d), e);
};
mxSwimlane.prototype.getSwimlaneArcSize = function(a, b, c) {
  if ('1' == mxUtils.getValue(this.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0))
    return Math.min(a / 2, Math.min(b / 2, mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2));
  a = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, 100 * mxConstants.RECTANGLE_ROUNDING_FACTOR) / 100;
  return c * a * 3;
};
mxSwimlane.prototype.isHorizontal = function() {
  return 1 == mxUtils.getValue(this.style, mxConstants.STYLE_HORIZONTAL, 1);
};
mxSwimlane.prototype.paintVertexShape = function(a, b, c, d, e) {
  if (!this.outline) {
    var f = this.getTitleSize(),
      g = 0;
    f = this.isHorizontal() ? Math.min(f, e) : Math.min(f, d);
    a.translate(b, c);
    this.isRounded ? (g = this.getSwimlaneArcSize(d, e, f), g = Math.min((this.isHorizontal() ? e : d) - f, Math.min(f, g)), this.paintRoundedSwimlane(a, b, c, d, e, f, g)) : this.paintSwimlane(a, b, c, d, e, f);
    var k = mxUtils.getValue(this.style, mxConstants.STYLE_SEPARATORCOLOR, mxConstants.NONE);
    this.paintSeparator(a, b, c, d, e, f, k);
    null != this.image && (e = this.getImageBounds(b, c, d, e), k = mxUtils.getValue(this.style, mxConstants.STYLE_CLIP_PATH, null), a.image(e.x - b, e.y - c, e.width, e.height, this.image, !1, !1, !1, k));
    this.glass && (a.setShadow(!1), this.paintGlassEffect(a, 0, 0, d, f, g));
  }
};
mxSwimlane.prototype.configurePointerEvents = function(a) {
  var b = !0,
    c = !0,
    d = !0;
  null != this.style && (b = '1' == mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1'), c = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_HEAD, 1), d = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_BODY, 1));
  (b || c || d) && mxShape.prototype.configurePointerEvents.apply(this, arguments);
};
mxSwimlane.prototype.paintSwimlane = function(a, b, c, d, e, f) {
  var g = this.laneFill,
    k = !0,
    l = !0,
    m = !0,
    n = !0;
  null != this.style && (k = '1' == mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1'), l = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_LINE, 1), m = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_HEAD, 1), n = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_BODY, 1));
  this.isHorizontal() ? (a.begin(), a.moveTo(0, f), a.lineTo(0, 0), a.lineTo(d, 0), a.lineTo(d, f), m ? a.fillAndStroke() : a.fill(), f < e && (g != mxConstants.NONE && k || (a.pointerEvents = !1), g != mxConstants.NONE && a.setFillColor(g), a.begin(), a.moveTo(0, f), a.lineTo(0, e), a.lineTo(d, e), a.lineTo(d, f), n ? g == mxConstants.NONE ? a.stroke() : n && a.fillAndStroke() : g != mxConstants.NONE && a.fill())) : (a.begin(), a.moveTo(f, 0), a.lineTo(0, 0), a.lineTo(0, e), a.lineTo(f, e), m ? a.fillAndStroke() : a.fill(), f < d && (g != mxConstants.NONE && k || (a.pointerEvents = !1), g != mxConstants.NONE && a.setFillColor(g), a.begin(), a.moveTo(f, 0), a.lineTo(d, 0), a.lineTo(d, e), a.lineTo(f, e), n ? g == mxConstants.NONE ? a.stroke() : n && a.fillAndStroke() : g != mxConstants.NONE && a.fill()));
  l && this.paintDivider(a, b, c, d, e, f, g == mxConstants.NONE);
};
mxSwimlane.prototype.paintRoundedSwimlane = function(a, b, c, d, e, f, g) {
  var k = this.laneFill,
    l = !0,
    m = !0,
    n = !0,
    p = !0;
  null != this.style && (l = '1' == mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1'), m = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_LINE, 1), n = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_HEAD, 1), p = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_BODY, 1));
  this.isHorizontal() ? (a.begin(), a.moveTo(d, f), a.lineTo(d, g), a.quadTo(d, 0, d - Math.min(d / 2, g), 0), a.lineTo(Math.min(d / 2, g), 0), a.quadTo(0, 0, 0, g), a.lineTo(0, f), n ? a.fillAndStroke() : a.fill(), f < e && (k != mxConstants.NONE && l || (a.pointerEvents = !1), k != mxConstants.NONE && a.setFillColor(k), a.begin(), a.moveTo(0, f), a.lineTo(0, e - g), a.quadTo(0, e, Math.min(d / 2, g), e), a.lineTo(d - Math.min(d / 2, g), e), a.quadTo(d, e, d, e - g), a.lineTo(d, f), p ? k == mxConstants.NONE ? a.stroke() : p && a.fillAndStroke() : k != mxConstants.NONE && a.fill())) : (a.begin(), a.moveTo(f, 0), a.lineTo(g, 0), a.quadTo(0, 0, 0, Math.min(e / 2, g)), a.lineTo(0, e - Math.min(e / 2, g)), a.quadTo(0, e, g, e), a.lineTo(f, e), n ? a.fillAndStroke() : a.fill(), f < d && (k != mxConstants.NONE && l || (a.pointerEvents = !1), k != mxConstants.NONE && a.setFillColor(k), a.begin(), a.moveTo(f, e), a.lineTo(d - g, e), a.quadTo(d, e, d, e - Math.min(e / 2, g)), a.lineTo(d, Math.min(e / 2, g)), a.quadTo(d, 0, d - g, 0), a.lineTo(f, 0), p ? k == mxConstants.NONE ? a.stroke() : p && a.fillAndStroke() : k != mxConstants.NONE && a.fill()));
  m && this.paintDivider(a, b, c, d, e, f, k == mxConstants.NONE);
};
mxSwimlane.prototype.paintDivider = function(a, b, c, d, e, f, g) {
  0 != f && (g || a.setShadow(!1), a.begin(), this.isHorizontal() ? (a.moveTo(0, f), a.lineTo(d, f)) : (a.moveTo(f, 0), a.lineTo(f, e)), a.stroke());
};
mxSwimlane.prototype.paintSeparator = function(a, b, c, d, e, f, g) {
  g != mxConstants.NONE && (a.setStrokeColor(g), a.setDashed(!0), a.begin(), this.isHorizontal() ? (a.moveTo(d, f), a.lineTo(d, e)) : (a.moveTo(f, 0), a.lineTo(d, 0)), a.stroke(), a.setDashed(!1));
};
mxSwimlane.prototype.getImageBounds = function(a, b, c, d) {
  return this.isHorizontal() ? new mxRectangle(a + c - this.imageSize, b, this.imageSize, this.imageSize) : new mxRectangle(a, b, this.imageSize, this.imageSize);
};