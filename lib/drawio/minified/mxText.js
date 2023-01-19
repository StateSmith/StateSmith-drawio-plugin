function mxText(a, b, c, d, e, f, g, k, l, m, n, p, r, q, t, u, x, A, E, C, D) {
  mxShape.call(this);
  this.value = a;
  this.bounds = b;
  this.color = null != e ? e : 'black';
  this.align = null != c ? c : mxConstants.ALIGN_CENTER;
  this.valign = null != d ? d : mxConstants.ALIGN_MIDDLE;
  this.family = null != f ? f : mxConstants.DEFAULT_FONTFAMILY;
  this.size = null != g ? g : mxConstants.DEFAULT_FONTSIZE;
  this.fontStyle = null != k ? k : mxConstants.DEFAULT_FONTSTYLE;
  this.spacing = parseInt(l || 2);
  this.spacingTop = this.spacing + parseInt(m || 0);
  this.spacingRight = this.spacing + parseInt(n || 0);
  this.spacingBottom = this.spacing + parseInt(p || 0);
  this.spacingLeft = this.spacing + parseInt(r || 0);
  this.horizontal = null != q ? q : !0;
  this.background = t;
  this.border = u;
  this.wrap = null != x ? x : !1;
  this.clipped = null != A ? A : !1;
  this.overflow = null != E ? E : 'visible';
  this.labelPadding = null != C ? C : 0;
  this.textDirection = D;
  this.rotation = 0;
  this.updateMargin();
}
mxUtils.extend(mxText, mxShape);
mxText.prototype.baseSpacingTop = 0;
mxText.prototype.baseSpacingBottom = 0;
mxText.prototype.baseSpacingLeft = 0;
mxText.prototype.baseSpacingRight = 0;
mxText.prototype.replaceLinefeeds = !0;
mxText.prototype.verticalTextRotation = -90;
mxText.prototype.ignoreClippedStringSize = !0;
mxText.prototype.ignoreStringSize = !1;
mxText.prototype.textWidthPadding = 8 != document.documentMode || mxClient.IS_EM ? 3 : 4;
mxText.prototype.lastValue = null;
mxText.prototype.cacheEnabled = !0;
mxText.prototype.isHtmlAllowed = function() {
  return 8 != document.documentMode || mxClient.IS_EM;
};
mxText.prototype.getSvgScreenOffset = function() {
  return 0;
};
mxText.prototype.checkBounds = function() {
  return !isNaN(this.scale) && isFinite(this.scale) && 0 < this.scale && null != this.bounds && !isNaN(this.bounds.x) && !isNaN(this.bounds.y) && !isNaN(this.bounds.width) && !isNaN(this.bounds.height);
};
mxText.prototype.configurePointerEvents = function(a) {};
mxText.prototype.paint = function(a, b) {
  var c = this.scale,
    d = this.bounds.x / c,
    e = this.bounds.y / c,
    f = this.bounds.width / c;
  c = this.bounds.height / c;
  this.updateTransform(a, d, e, f, c);
  this.configureCanvas(a, d, e, f, c);
  if (b)
    a.updateText(d, e, f, c, this.align, this.valign, this.wrap, this.overflow, this.clipped, this.getTextRotation(), this.node);
  else {
    var g = (b = mxUtils.isNode(this.value) || this.dialect == mxConstants.DIALECT_STRICTHTML) ? 'html' : '',
      k = this.value;
    b || 'html' != g || (k = mxUtils.htmlEntities(k, !1));
    'html' != g || mxUtils.isNode(this.value) || (k = mxUtils.replaceTrailingNewlines(k, '<div><br></div>'));
    k = !mxUtils.isNode(this.value) && this.replaceLinefeeds && 'html' == g ? k.replace(/\n/g, '<br/>') : k;
    var l = this.textDirection;
    l != mxConstants.TEXT_DIRECTION_AUTO || b || (l = this.getAutoDirection());
    l != mxConstants.TEXT_DIRECTION_LTR && l != mxConstants.TEXT_DIRECTION_RTL && (l = null);
    a.text(d, e, f, c, k, this.align, this.valign, this.wrap, g, this.overflow, this.clipped, this.getTextRotation(), l);
  }
};
mxText.prototype.redraw = function() {
  if (this.visible && this.checkBounds() && this.cacheEnabled && this.lastValue == this.value && (mxUtils.isNode(this.value) || this.dialect == mxConstants.DIALECT_STRICTHTML))
    if ('DIV' == this.node.nodeName)
      mxClient.IS_SVG ? this.redrawHtmlShapeWithCss3() : (this.updateSize(this.node, null == this.state || null == this.state.view.textDiv), mxClient.IS_IE && (null == document.documentMode || 8 >= document.documentMode) ? this.updateHtmlFilter() : this.updateHtmlTransform()), this.updateBoundingBox();
    else {
      var a = this.createCanvas();
      null != a && null != a.updateText ? (a.pointerEvents = this.pointerEvents, this.paint(a, !0), this.destroyCanvas(a), this.updateBoundingBox()) : mxShape.prototype.redraw.apply(this, arguments);
    }
  else
    mxShape.prototype.redraw.apply(this, arguments), mxUtils.isNode(this.value) || this.dialect == mxConstants.DIALECT_STRICTHTML ? this.lastValue = this.value : this.lastValue = null;
};
mxText.prototype.resetStyles = function() {
  mxShape.prototype.resetStyles.apply(this, arguments);
  this.color = 'black';
  this.align = mxConstants.ALIGN_CENTER;
  this.valign = mxConstants.ALIGN_MIDDLE;
  this.family = mxConstants.DEFAULT_FONTFAMILY;
  this.size = mxConstants.DEFAULT_FONTSIZE;
  this.fontStyle = mxConstants.DEFAULT_FONTSTYLE;
  this.spacingLeft = this.spacingBottom = this.spacingRight = this.spacingTop = this.spacing = 2;
  this.horizontal = !0;
  delete this.background;
  delete this.border;
  this.textDirection = mxConstants.DEFAULT_TEXT_DIRECTION;
  delete this.margin;
};
mxText.prototype.apply = function(a) {
  var b = this.spacing;
  mxShape.prototype.apply.apply(this, arguments);
  null != this.style && (this.fontStyle = mxUtils.getValue(this.style, mxConstants.STYLE_FONTSTYLE, this.fontStyle), this.family = mxUtils.getValue(this.style, mxConstants.STYLE_FONTFAMILY, this.family), this.size = mxUtils.getValue(this.style, mxConstants.STYLE_FONTSIZE, this.size), this.color = mxUtils.getValue(this.style, mxConstants.STYLE_FONTCOLOR, this.color), this.align = mxUtils.getValue(this.style, mxConstants.STYLE_ALIGN, this.align), this.valign = mxUtils.getValue(this.style, mxConstants.STYLE_VERTICAL_ALIGN, this.valign), this.spacing = parseInt(mxUtils.getValue(this.style, mxConstants.STYLE_SPACING, this.spacing)), this.spacingTop = parseInt(mxUtils.getValue(this.style, mxConstants.STYLE_SPACING_TOP, this.spacingTop - b)) + this.spacing, this.spacingRight = parseInt(mxUtils.getValue(this.style, mxConstants.STYLE_SPACING_RIGHT, this.spacingRight - b)) + this.spacing, this.spacingBottom = parseInt(mxUtils.getValue(this.style, mxConstants.STYLE_SPACING_BOTTOM, this.spacingBottom - b)) + this.spacing, this.spacingLeft = parseInt(mxUtils.getValue(this.style, mxConstants.STYLE_SPACING_LEFT, this.spacingLeft - b)) + this.spacing, this.horizontal = mxUtils.getValue(this.style, mxConstants.STYLE_HORIZONTAL, this.horizontal), this.background = mxUtils.getValue(this.style, mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, this.background), this.border = mxUtils.getValue(this.style, mxConstants.STYLE_LABEL_BORDERCOLOR, this.border), this.textDirection = mxUtils.getValue(this.style, mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION), this.opacity = mxUtils.getValue(this.style, mxConstants.STYLE_TEXT_OPACITY, 100), this.updateMargin());
  this.flipH = this.flipV = null;
};
mxText.prototype.getAutoDirection = function() {
  var a = /[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(this.value);
  return null != a && 0 < a.length && 'z' < a[0] ? mxConstants.TEXT_DIRECTION_RTL : mxConstants.TEXT_DIRECTION_LTR;
};
mxText.prototype.getContentNode = function() {
  var a = this.node;
  null != a && (a = null == a.ownerSVGElement ? this.node.firstChild.firstChild : a.firstChild.firstChild.firstChild.firstChild.firstChild);
  return a;
};
mxText.prototype.updateBoundingBox = function() {
  var a = this.node;
  this.boundingBox = this.bounds.clone();
  var b = this.getTextRotation(),
    c = null != this.style ? mxUtils.getValue(this.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER) : null,
    d = null != this.style ? mxUtils.getValue(this.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE) : null;
  if (!(this.ignoreStringSize || null == a || 'fill' == this.overflow || this.clipped && this.ignoreClippedStringSize && c == mxConstants.ALIGN_CENTER && d == mxConstants.ALIGN_MIDDLE)) {
    d = c = null;
    if (null != a.ownerSVGElement)
      if (null != a.firstChild && null != a.firstChild.firstChild && 'foreignObject' == a.firstChild.firstChild.nodeName)
        a = a.firstChild.firstChild.firstChild.firstChild, d = a.offsetHeight * this.scale, c = 'width' == this.overflow ? this.boundingBox.width : a.offsetWidth * this.scale;
      else
        try {
          var e = a.getBBox();
          'string' == typeof this.value && 0 == mxUtils.trim(this.value) ? this.boundingBox = null : this.boundingBox = 0 == e.width && 0 == e.height ? null : new mxRectangle(e.x, e.y, e.width, e.height);
          return;
        } catch (f) {}
    else {
      c = null != this.state ? this.state.view.textDiv : null;
      if (null == this.offsetWidth || null == this.offsetHeight)
        null != c && (this.updateFont(c), this.updateSize(c, !1), this.updateInnerHtml(c), a = c), e = a, 8 != document.documentMode || mxClient.IS_EM ? null != e.firstChild && 'DIV' == e.firstChild.nodeName && (e = e.firstChild) : (d = Math.round(this.bounds.width / this.scale), this.wrap && 0 < d ? (a.style.wordWrap = mxConstants.WORD_WRAP, a.style.whiteSpace = 'normal', 'break-word' != a.style.wordWrap && (a = e.getElementsByTagName('div'), 0 < a.length && (e = a[a.length - 1]), c = e.offsetWidth + 2, a = this.node.getElementsByTagName('div'), this.clipped && (c = Math.min(d, c)), 1 < a.length && (a[a.length - 2].style.width = c + 'px'))) : a.style.whiteSpace = 'nowrap'), this.offsetWidth = e.offsetWidth + this.textWidthPadding, this.offsetHeight = e.offsetHeight;
      c = this.offsetWidth * this.scale;
      d = this.offsetHeight * this.scale;
    }
    null != c && null != d && (this.boundingBox = new mxRectangle(this.bounds.x, this.bounds.y, c, d));
  }
  null != this.boundingBox && (0 != b ? (b = mxUtils.getBoundingBox(new mxRectangle(this.margin.x * this.boundingBox.width, this.margin.y * this.boundingBox.height, this.boundingBox.width, this.boundingBox.height), b, new mxPoint(0, 0)), this.unrotatedBoundingBox = mxRectangle.fromRectangle(this.boundingBox), this.unrotatedBoundingBox.x += this.margin.x * this.unrotatedBoundingBox.width, this.unrotatedBoundingBox.y += this.margin.y * this.unrotatedBoundingBox.height, this.boundingBox.x += b.x, this.boundingBox.y += b.y, this.boundingBox.width = b.width, this.boundingBox.height = b.height) : (this.boundingBox.x += this.margin.x * this.boundingBox.width, this.boundingBox.y += this.margin.y * this.boundingBox.height, this.unrotatedBoundingBox = null));
};
mxText.prototype.getShapeRotation = function() {
  return 0;
};
mxText.prototype.getTextRotation = function() {
  return null != this.state && null != this.state.shape ? this.state.shape.getTextRotation() : 0;
};
mxText.prototype.isPaintBoundsInverted = function() {
  return !this.horizontal && null != this.state && this.state.view.graph.model.isVertex(this.state.cell);
};
mxText.prototype.configureCanvas = function(a, b, c, d, e) {
  mxShape.prototype.configureCanvas.apply(this, arguments);
  a.setFontColor(this.color);
  a.setFontBackgroundColor(this.background);
  a.setFontBorderColor(this.border);
  a.setFontFamily(this.family);
  a.setFontSize(this.size);
  a.setFontStyle(this.fontStyle);
};
mxText.prototype.getHtmlValue = function() {
  var a = this.value;
  this.dialect != mxConstants.DIALECT_STRICTHTML && (a = mxUtils.htmlEntities(a, !1));
  a = mxUtils.replaceTrailingNewlines(a, '<div><br></div>');
  return this.replaceLinefeeds ? a.replace(/\n/g, '<br/>') : a;
};
mxText.prototype.getTextCss = function() {
  var a = 'display: inline-block; font-size: ' + this.size + 'px; font-family: ' + this.family + '; color: ' + this.color + '; line-height: ' + (mxConstants.ABSOLUTE_LINE_HEIGHT ? this.size * mxConstants.LINE_HEIGHT + 'px' : mxConstants.LINE_HEIGHT) + '; pointer-events: ' + (this.pointerEvents ? 'all' : 'none') + '; ';
  (this.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD && (a += 'font-weight: bold; ');
  (this.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC && (a += 'font-style: italic; ');
  var b = [];
  (this.fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && b.push('underline');
  (this.fontStyle & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && b.push('line-through');
  0 < b.length && (a += 'text-decoration: ' + b.join(' ') + '; ');
  return a;
};
mxText.prototype.redrawHtmlShape = function() {
  if (mxClient.IS_SVG)
    this.redrawHtmlShapeWithCss3();
  else {
    var a = this.node.style;
    a.whiteSpace = 'normal';
    a.overflow = '';
    a.width = '';
    a.height = '';
    this.updateValue();
    this.updateFont(this.node);
    this.updateSize(this.node, null == this.state || null == this.state.view.textDiv);
    this.offsetHeight = this.offsetWidth = null;
    mxClient.IS_IE && (null == document.documentMode || 8 >= document.documentMode) ? this.updateHtmlFilter() : this.updateHtmlTransform();
  }
};
mxText.prototype.redrawHtmlShapeWithCss3 = function() {
  var a = Math.max(0, Math.round(this.bounds.width / this.scale)),
    b = Math.max(0, Math.round(this.bounds.height / this.scale)),
    c = 'position: absolute; left: ' + Math.round(this.bounds.x) + 'px; top: ' + Math.round(this.bounds.y) + 'px; pointer-events: none; ',
    d = this.getTextCss();
  mxSvgCanvas2D.createCss(a + 2, b, this.align, this.valign, this.wrap, this.overflow, this.clipped, null != this.background ? mxUtils.htmlEntities(this.background) : null, null != this.border ? mxUtils.htmlEntities(this.border) : null, c, d, this.scale, mxUtils.bind(this, function(e, f, g, k, l, m) {
    e = this.getTextRotation();
    e = (1 != this.scale ? 'scale(' + this.scale + ') ' : '') + (0 != e ? 'rotate(' + e + 'deg) ' : '') + (0 != this.margin.x || 0 != this.margin.y ? 'translate(' + 100 * this.margin.x + '%,' + 100 * this.margin.y + '%)' : '');
    '' != e && (e = 'transform-origin: 0 0; transform: ' + e + '; ');
    'block' == this.overflow && this.valign == mxConstants.ALIGN_MIDDLE && (e += 'max-height: ' + (b + 1) + 'px;');
    '' == m ? (g += k, k = 'display:inline-block; min-width: 100%; ' + e) : (k += e, mxClient.IS_SF && (k += '-webkit-clip-path: content-box;'));
    'block' == this.overflow && (k += 'width: 100%; ');
    100 > this.opacity && (l += 'opacity: ' + this.opacity / 100 + '; ');
    this.node.setAttribute('style', g);
    g = mxUtils.isNode(this.value) ? this.value.outerHTML : this.getHtmlValue();
    null == this.node.firstChild && (this.node.innerHTML = '<div><div>' + g + '</div></div>', mxClient.IS_IE11 && this.fixFlexboxForIe11(this.node));
    this.node.firstChild.firstChild.setAttribute('style', l);
    this.node.firstChild.setAttribute('style', k);
  }));
};
mxText.prototype.fixFlexboxForIe11 = function(a) {
  for (var b = a.querySelectorAll('div[style*="display: flex; justify-content: flex-end;"]'), c = 0; c < b.length; c++)
    b[c].style.justifyContent = 'flex-start', b[c].style.flexDirection = 'row-reverse';
  if (!this.wrap)
    for (b = a.querySelectorAll('div[style*="display: flex; justify-content: center;"]'), a = -window.innerWidth, c = 0; c < b.length; c++)
      b[c].style.marginLeft = a + 'px', b[c].style.marginRight = a + 'px';
};
mxText.prototype.updateHtmlTransform = function() {
  var a = this.getTextRotation(),
    b = this.node.style,
    c = this.margin.x,
    d = this.margin.y;
  0 != a ? (mxUtils.setPrefixedStyle(b, 'transformOrigin', 100 * -c + '% ' + 100 * -d + '%'), mxUtils.setPrefixedStyle(b, 'transform', 'translate(' + 100 * c + '%,' + 100 * d + '%) scale(' + this.scale + ') rotate(' + a + 'deg)')) : (mxUtils.setPrefixedStyle(b, 'transformOrigin', '0% 0%'), mxUtils.setPrefixedStyle(b, 'transform', 'scale(' + this.scale + ') translate(' + 100 * c + '%,' + 100 * d + '%)'));
  b.left = Math.round(this.bounds.x - Math.ceil(c * ('fill' != this.overflow && 'width' != this.overflow ? 3 : 1))) + 'px';
  b.top = Math.round(this.bounds.y - d * ('fill' != this.overflow ? 3 : 1)) + 'px';
  b.opacity = 100 > this.opacity ? this.opacity / 100 : '';
};
mxText.prototype.updateInnerHtml = function(a) {
  if (mxUtils.isNode(this.value))
    a.innerHTML = this.value.outerHTML;
  else {
    var b = this.value;
    this.dialect != mxConstants.DIALECT_STRICTHTML && (b = mxUtils.htmlEntities(b, !1));
    b = mxUtils.replaceTrailingNewlines(b, '<div>&nbsp;</div>');
    b = this.replaceLinefeeds ? b.replace(/\n/g, '<br/>') : b;
    a.innerHTML = '<div style="display:inline-block;_display:inline;">' + b + '</div>';
  }
};
mxText.prototype.updateHtmlFilter = function() {
  var a = this.node.style,
    b = this.margin.x,
    c = this.margin.y,
    d = this.scale;
  mxUtils.setOpacity(this.node, this.opacity);
  var e = 0,
    f = null != this.state ? this.state.view.textDiv : null,
    g = this.node;
  if (null != f) {
    f.style.overflow = '';
    f.style.height = '';
    f.style.width = '';
    this.updateFont(f);
    this.updateSize(f, !1);
    this.updateInnerHtml(f);
    var k = Math.round(this.bounds.width / this.scale);
    if (this.wrap && 0 < k) {
      f.style.whiteSpace = 'normal';
      f.style.wordWrap = mxConstants.WORD_WRAP;
      var l = k;
      this.clipped && (l = Math.min(l, this.bounds.width));
      f.style.width = l + 'px';
    } else
      f.style.whiteSpace = 'nowrap';
    g = f;
    null != g.firstChild && 'DIV' == g.firstChild.nodeName && (g = g.firstChild, this.wrap && 'break-word' == f.style.wordWrap && (g.style.width = '100%'));
    !this.clipped && this.wrap && 0 < k && (l = g.offsetWidth + this.textWidthPadding, f.style.width = l + 'px');
    e = g.offsetHeight + 2;
  } else
    null != g.firstChild && 'DIV' == g.firstChild.nodeName && (g = g.firstChild, e = g.offsetHeight);
  l = g.offsetWidth + this.textWidthPadding;
  this.clipped && (e = Math.min(e, this.bounds.height));
  k = this.bounds.width / d;
  f = this.bounds.height / d;
  'fill' == this.overflow ? (e = f, l = k) : 'width' == this.overflow && (e = g.scrollHeight, l = k);
  this.offsetWidth = l;
  this.offsetHeight = e;
  'fill' != this.overflow && 'width' != this.overflow && (this.clipped && (l = Math.min(k, l)), k = l, this.wrap && (a.width = Math.round(k) + 'px'));
  f = e * d;
  k *= d;
  var m = this.getTextRotation() * (Math.PI / 180);
  l = parseFloat(parseFloat(Math.cos(m)).toFixed(8));
  e = parseFloat(parseFloat(Math.sin(-m)).toFixed(8));
  m %= 2 * Math.PI;
  0 > m && (m += 2 * Math.PI);
  m %= Math.PI;
  m > Math.PI / 2 && (m = Math.PI - m);
  g = Math.cos(m);
  var n = Math.sin(-m);
  b = k * -(b + 0.5);
  c = f * -(c + 0.5);
  0 != m && (m = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + l + ', M12=' + e + ', M21=' + -e + ', M22=' + l + ', sizingMethod=\'auto expand\')', a.filter = null != a.filter && 0 < a.filter.length ? a.filter + (' ' + m) : m);
  a.zoom = d;
  a.left = Math.round(this.bounds.x + ((k - k * g + f * n) / 2 - l * b - e * c) - k / 2) + 'px';
  a.top = Math.round(this.bounds.y + ((f - f * g + k * n) / 2 + e * b - l * c) - f / 2) + 'px';
};
mxText.prototype.updateValue = function() {
  if (mxUtils.isNode(this.value))
    this.node.innerText = '', this.node.appendChild(this.value);
  else {
    var a = this.value;
    this.dialect != mxConstants.DIALECT_STRICTHTML && (a = mxUtils.htmlEntities(a, !1));
    a = mxUtils.replaceTrailingNewlines(a, '<div><br></div>');
    a = this.replaceLinefeeds ? a.replace(/\n/g, '<br/>') : a;
    var b = null != this.background && this.background != mxConstants.NONE ? this.background : null,
      c = null != this.border && this.border != mxConstants.NONE ? this.border : null;
    if ('fill' == this.overflow || 'width' == this.overflow)
      null != b && (this.node.style.backgroundColor = b), null != c && (this.node.style.border = '1px solid ' + c);
    else {
      var d = '';
      null != b && (d += 'background-color:' + mxUtils.htmlEntities(b) + ';');
      null != c && (d += 'border:1px solid ' + mxUtils.htmlEntities(c) + ';');
      a = '<div style="zoom:1;' + d + 'display:inline-block;_display:inline;text-decoration:inherit;padding-bottom:1px;padding-right:1px;line-height:' + (mxConstants.ABSOLUTE_LINE_HEIGHT ? this.size * mxConstants.LINE_HEIGHT + 'px' : mxConstants.LINE_HEIGHT) + '">' + a + '</div>';
    }
    this.node.innerHTML = a;
    a = this.node.getElementsByTagName('div');
    0 < a.length && (b = this.textDirection, b == mxConstants.TEXT_DIRECTION_AUTO && this.dialect != mxConstants.DIALECT_STRICTHTML && (b = this.getAutoDirection()), b == mxConstants.TEXT_DIRECTION_LTR || b == mxConstants.TEXT_DIRECTION_RTL ? a[a.length - 1].setAttribute('dir', b) : a[a.length - 1].removeAttribute('dir'));
  }
};
mxText.prototype.updateFont = function(a) {
  a = a.style;
  a.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT ? this.size * mxConstants.LINE_HEIGHT + 'px' : mxConstants.LINE_HEIGHT;
  a.fontSize = this.size + 'px';
  a.fontFamily = this.family;
  a.verticalAlign = 'top';
  a.color = this.color;
  a.fontWeight = (this.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD ? 'bold' : '';
  a.fontStyle = (this.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC ? 'italic' : '';
  var b = [];
  (this.fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && b.push('underline');
  (this.fontStyle & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && b.push('line-through');
  a.textDecoration = b.join(' ');
  a.textAlign = this.align == mxConstants.ALIGN_CENTER ? 'center' : this.align == mxConstants.ALIGN_RIGHT ? 'right' : 'left';
};
mxText.prototype.updateSize = function(a, b) {
  var c = Math.max(0, Math.round(this.bounds.width / this.scale)),
    d = Math.max(0, Math.round(this.bounds.height / this.scale)),
    e = a.style;
  this.clipped ? (e.overflow = 'hidden', e.maxHeight = d + 'px', e.maxWidth = c + 'px') : 'fill' == this.overflow ? (e.width = c + 1 + 'px', e.height = d + 1 + 'px', e.overflow = 'hidden') : 'width' == this.overflow ? (e.width = c + 1 + 'px', e.maxHeight = d + 1 + 'px', e.overflow = 'hidden') : 'block' == this.overflow && (e.width = c + 1 + 'px');
  if (this.wrap && 0 < c) {
    if (e.wordWrap = mxConstants.WORD_WRAP, e.whiteSpace = 'normal', e.width = c + 'px', b && 'fill' != this.overflow && 'width' != this.overflow) {
      b = a;
      null != b.firstChild && 'DIV' == b.firstChild.nodeName && (b = b.firstChild, 'break-word' == a.style.wordWrap && (b.style.width = '100%'));
      d = b.offsetWidth;
      if (0 == d) {
        var f = a.parentNode;
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        d = b.offsetWidth;
        a.style.visibility = '';
        f.appendChild(a);
      }
      d += 3;
      this.clipped && (d = Math.min(d, c));
      e.width = d + 'px';
    }
  } else
    e.whiteSpace = 'nowrap';
};
mxText.prototype.updateMargin = function() {
  this.margin = mxUtils.getAlignmentAsPoint(this.align, this.valign);
};
mxText.prototype.getSpacing = function(a) {
  return new mxPoint(this.align == mxConstants.ALIGN_CENTER ? (this.spacingLeft - this.spacingRight) / 2 : this.align == mxConstants.ALIGN_RIGHT ? -this.spacingRight - (a ? 0 : this.baseSpacingRight) : this.spacingLeft + (a ? 0 : this.baseSpacingLeft), this.valign == mxConstants.ALIGN_MIDDLE ? (this.spacingTop - this.spacingBottom) / 2 : this.valign == mxConstants.ALIGN_BOTTOM ? -this.spacingBottom - (a ? 0 : this.baseSpacingBottom) : this.spacingTop + (a ? 0 : this.baseSpacingTop));
};