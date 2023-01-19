function mxLabel(a, b, c, d) {
  mxRectangleShape.call(this, a, b, c, d);
}
mxUtils.extend(mxLabel, mxRectangleShape);
mxLabel.prototype.imageSize = mxConstants.DEFAULT_IMAGESIZE;
mxLabel.prototype.spacing = 2;
mxLabel.prototype.indicatorSize = 10;
mxLabel.prototype.indicatorSpacing = 2;
mxLabel.prototype.init = function(a) {
  mxShape.prototype.init.apply(this, arguments);
  null != this.indicatorShape && (this.indicator = new this.indicatorShape(), this.indicator.dialect = this.dialect, this.indicator.init(this.node));
};
mxLabel.prototype.redraw = function() {
  null != this.indicator && (this.indicator.fill = this.indicatorColor, this.indicator.stroke = this.indicatorStrokeColor, this.indicator.gradient = this.indicatorGradientColor, this.indicator.direction = this.indicatorDirection, this.indicator.redraw());
  mxShape.prototype.redraw.apply(this, arguments);
};
mxLabel.prototype.isHtmlAllowed = function() {
  return mxRectangleShape.prototype.isHtmlAllowed.apply(this, arguments) && null == this.indicatorColor && null == this.indicatorShape;
};
mxLabel.prototype.paintForeground = function(a, b, c, d, e) {
  this.paintImage(a, b, c, d, e);
  this.paintIndicator(a, b, c, d, e);
  mxRectangleShape.prototype.paintForeground.apply(this, arguments);
};
mxLabel.prototype.paintImage = function(a, b, c, d, e) {
  null != this.image && (b = this.getImageBounds(b, c, d, e), c = mxUtils.getValue(this.style, mxConstants.STYLE_CLIP_PATH, null), a.image(b.x, b.y, b.width, b.height, this.image, !1, !1, !1, c));
};
mxLabel.prototype.getImageBounds = function(a, b, c, d) {
  var e = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_ALIGN, mxConstants.ALIGN_LEFT),
    f = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE),
    g = mxUtils.getNumber(this.style, mxConstants.STYLE_IMAGE_WIDTH, mxConstants.DEFAULT_IMAGESIZE),
    k = mxUtils.getNumber(this.style, mxConstants.STYLE_IMAGE_HEIGHT, mxConstants.DEFAULT_IMAGESIZE),
    l = mxUtils.getNumber(this.style, mxConstants.STYLE_SPACING, this.spacing) + 5;
  a = e == mxConstants.ALIGN_CENTER ? a + (c - g) / 2 : e == mxConstants.ALIGN_RIGHT ? a + (c - g - l) : a + l;
  b = f == mxConstants.ALIGN_TOP ? b + l : f == mxConstants.ALIGN_BOTTOM ? b + (d - k - l) : b + (d - k) / 2;
  return new mxRectangle(a, b, g, k);
};
mxLabel.prototype.paintIndicator = function(a, b, c, d, e) {
  null != this.indicator ? (this.indicator.bounds = this.getIndicatorBounds(b, c, d, e), this.indicator.paint(a)) : null != this.indicatorImage && (b = this.getIndicatorBounds(b, c, d, e), a.image(b.x, b.y, b.width, b.height, this.indicatorImage, !1, !1, !1));
};
mxLabel.prototype.getIndicatorBounds = function(a, b, c, d) {
  var e = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_ALIGN, mxConstants.ALIGN_LEFT),
    f = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE),
    g = mxUtils.getNumber(this.style, mxConstants.STYLE_INDICATOR_WIDTH, this.indicatorSize),
    k = mxUtils.getNumber(this.style, mxConstants.STYLE_INDICATOR_HEIGHT, this.indicatorSize),
    l = this.spacing + 5;
  a = e == mxConstants.ALIGN_RIGHT ? a + (c - g - l) : e == mxConstants.ALIGN_CENTER ? a + (c - g) / 2 : a + l;
  b = f == mxConstants.ALIGN_BOTTOM ? b + (d - k - l) : f == mxConstants.ALIGN_TOP ? b + l : b + (d - k) / 2;
  return new mxRectangle(a, b, g, k);
};
mxLabel.prototype.redrawHtmlShape = function() {
  for (mxRectangleShape.prototype.redrawHtmlShape.apply(this, arguments); this.node.hasChildNodes();)
    this.node.removeChild(this.node.lastChild);
  if (null != this.image) {
    var a = document.createElement('img');
    a.style.position = 'relative';
    a.setAttribute('border', '0');
    var b = this.getImageBounds(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    b.x -= this.bounds.x;
    b.y -= this.bounds.y;
    a.style.left = Math.round(b.x) + 'px';
    a.style.top = Math.round(b.y) + 'px';
    a.style.width = Math.round(b.width) + 'px';
    a.style.height = Math.round(b.height) + 'px';
    a.src = this.image;
    this.node.appendChild(a);
  }
};