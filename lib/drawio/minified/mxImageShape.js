function mxImageShape(a, b, c, d, e) {
  mxShape.call(this);
  this.bounds = a;
  this.image = b;
  this.fill = c;
  this.stroke = d;
  this.strokewidth = null != e ? e : 1;
  this.shadow = !1;
}
mxUtils.extend(mxImageShape, mxRectangleShape);
mxImageShape.prototype.preserveImageAspect = !0;
mxImageShape.prototype.getSvgScreenOffset = function() {
  return 0;
};
mxImageShape.prototype.apply = function(a) {
  mxShape.prototype.apply.apply(this, arguments);
  this.gradient = this.stroke = this.fill = null;
  null != this.style && (this.preserveImageAspect = 1 == mxUtils.getNumber(this.style, mxConstants.STYLE_IMAGE_ASPECT, 1), this.imageBackground = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BACKGROUND, null), this.imageBorder = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BORDER, null), this.flipH = this.flipH || 1 == mxUtils.getValue(this.style, 'imageFlipH', 0), this.flipV = this.flipV || 1 == mxUtils.getValue(this.style, 'imageFlipV', 0), this.clipPath = mxUtils.getValue(this.style, mxConstants.STYLE_CLIP_PATH, null));
};
mxImageShape.prototype.isHtmlAllowed = function() {
  return !this.preserveImageAspect;
};
mxImageShape.prototype.createHtml = function() {
  var a = document.createElement('div');
  a.style.position = 'absolute';
  return a;
};
mxImageShape.prototype.isRoundable = function() {
  return !1;
};
mxImageShape.prototype.getImageDataUri = function() {
  return this.image;
};
mxImageShape.prototype.configurePointerEvents = function(a) {};
mxImageShape.prototype.paintVertexShape = function(a, b, c, d, e) {
  null != this.image ? (null != this.imageBackground && (a.setFillColor(this.imageBackground), a.setStrokeColor(this.imageBorder), a.rect(b, c, d, e), a.fillAndStroke()), a.image(b, c, d, e, this.getImageDataUri(), this.preserveImageAspect, !1, !1, this.clipPath), null != this.imageBorder && (a.setShadow(!1), a.setStrokeColor(this.imageBorder), a.rect(b, c, d, e), a.stroke())) : mxRectangleShape.prototype.paintBackground.apply(this, arguments);
};
mxImageShape.prototype.redrawHtmlShape = function() {
  this.node.style.left = Math.round(this.bounds.x) + 'px';
  this.node.style.top = Math.round(this.bounds.y) + 'px';
  this.node.style.width = Math.max(0, Math.round(this.bounds.width)) + 'px';
  this.node.style.height = Math.max(0, Math.round(this.bounds.height)) + 'px';
  this.node.innerText = '';
  if (null != this.image) {
    var a = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BACKGROUND, ''),
      b = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BORDER, '');
    this.node.style.backgroundColor = a;
    this.node.style.borderColor = b;
    a = document.createElement('img');
    a.setAttribute('border', '0');
    a.style.position = 'absolute';
    a.src = this.image;
    b = 100 > this.opacity ? 'alpha(opacity=' + this.opacity + ')' : '';
    this.node.style.filter = b;
    this.flipH && this.flipV ? b += 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2)' : this.flipH ? b += 'progid:DXImageTransform.Microsoft.BasicImage(mirror=1)' : this.flipV && (b += 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)');
    a.style.filter != b && (a.style.filter = b);
    'image' == a.nodeName ? a.style.rotation = this.rotation : 0 != this.rotation ? mxUtils.setPrefixedStyle(a.style, 'transform', 'rotate(' + this.rotation + 'deg)') : mxUtils.setPrefixedStyle(a.style, 'transform', '');
    a.style.width = this.node.style.width;
    a.style.height = this.node.style.height;
    this.node.style.backgroundImage = '';
    this.node.appendChild(a);
  } else
    this.setTransparentBackgroundImage(this.node);
};