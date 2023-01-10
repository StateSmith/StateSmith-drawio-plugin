function mxSvgCanvas2D(a, b) {
  mxAbstractCanvas2D.call(this);
  this.root = a;
  this.gradients = [];
  this.fillPatterns = [];
  this.defs = null;
  this.styleEnabled = null != b ? b : !1;
  b = null;
  if (a.ownerDocument != document) {
    for (; null != a && 'svg' != a.nodeName;)
      a = a.parentNode;
    b = a;
  }
  null != b && (0 < b.getElementsByTagName('defs').length && (this.defs = b.getElementsByTagName('defs')[0]), null == this.defs && (this.defs = this.createElement('defs'), null != b.firstChild ? b.insertBefore(this.defs, b.firstChild) : b.appendChild(this.defs)), this.styleEnabled && this.defs.appendChild(this.createStyle()));
}
mxUtils.extend(mxSvgCanvas2D, mxAbstractCanvas2D);
(function() {
  mxSvgCanvas2D.prototype.useDomParser = !mxClient.IS_IE && 'function' === typeof DOMParser && 'function' === typeof XMLSerializer;
  if (mxSvgCanvas2D.prototype.useDomParser)
    try {
      var a = new DOMParser().parseFromString('test text', 'text/html');
      mxSvgCanvas2D.prototype.useDomParser = null != a;
    } catch (b) {
      mxSvgCanvas2D.prototype.useDomParser = !1;
    }
  mxSvgCanvas2D.prototype.useAbsoluteIds = !mxClient.IS_CHROMEAPP && !mxClient.IS_IE && !mxClient.IS_IE11 && !mxClient.IS_EDGE && 0 < document.getElementsByTagName('base').length;
}());
mxSvgCanvas2D.prototype.node = null;
mxSvgCanvas2D.prototype.matchHtmlAlignment = !0;
mxSvgCanvas2D.prototype.textEnabled = !0;
mxSvgCanvas2D.prototype.foEnabled = !0;
mxSvgCanvas2D.prototype.foAltText = '[Object]';
mxSvgCanvas2D.prototype.foOffset = 0;
mxSvgCanvas2D.prototype.textOffset = 0;
mxSvgCanvas2D.prototype.imageOffset = 0;
mxSvgCanvas2D.prototype.strokeTolerance = 0;
mxSvgCanvas2D.prototype.minStrokeWidth = 1;
mxSvgCanvas2D.prototype.refCount = 0;
mxSvgCanvas2D.prototype.lineHeightCorrection = 1;
mxSvgCanvas2D.prototype.pointerEventsValue = 'all';
mxSvgCanvas2D.prototype.fontMetricsPadding = 10;
mxSvgCanvas2D.prototype.foreignObjectPadding = 2;
mxSvgCanvas2D.prototype.cacheOffsetSize = !0;
mxSvgCanvas2D.prototype.setCssText = function(a, b) {
  mxClient.IS_IE || mxClient.IS_IE11 ? a.setAttribute('style', b) : mxUtils.setCssText(a.style, b);
};
mxSvgCanvas2D.prototype.format = function(a) {
  return parseFloat(parseFloat(a).toFixed(2));
};
mxSvgCanvas2D.prototype.getBaseUrl = function() {
  var a = window.location.href,
    b = a.lastIndexOf('#');
  0 < b && (a = a.substring(0, b));
  return a;
};
mxSvgCanvas2D.prototype.reset = function() {
  mxAbstractCanvas2D.prototype.reset.apply(this, arguments);
  this.gradients = [];
  this.fillPatterns = [];
};
mxSvgCanvas2D.prototype.createStyle = function(a) {
  a = this.createElement('style');
  a.setAttribute('type', 'text/css');
  mxUtils.write(a, 'svg{font-family:' + mxConstants.DEFAULT_FONTFAMILY + ';font-size:' + mxConstants.DEFAULT_FONTSIZE + ';fill:none;stroke-miterlimit:10}');
  return a;
};
mxSvgCanvas2D.prototype.createElement = function(a, b) {
  if (null != this.root.ownerDocument.createElementNS)
    return this.root.ownerDocument.createElementNS(b || mxConstants.NS_SVG, a);
  a = this.root.ownerDocument.createElement(a);
  null != b && a.setAttribute('xmlns', b);
  return a;
};
mxSvgCanvas2D.prototype.getAlternateText = function(a, b, c, d, e, f, g, k, l, m, n, p, r) {
  return null != f ? this.foAltText : null;
};
mxSvgCanvas2D.prototype.createAlternateContent = function(a, b, c, d, e, f, g, k, l, m, n, p, r) {
  a = this.getAlternateText(a, b, c, d, e, f, g, k, l, m, n, p, r);
  d = this.state;
  return null != a && 0 < d.fontSize ? (k = k == mxConstants.ALIGN_TOP ? 1 : k == mxConstants.ALIGN_BOTTOM ? 0 : 0.3, e = g == mxConstants.ALIGN_RIGHT ? 'end' : g == mxConstants.ALIGN_LEFT ? 'start' : 'middle', g = this.createElement('text'), g.setAttribute('x', Math.round(b + d.dx)), g.setAttribute('y', Math.round(c + d.dy + k * d.fontSize)), g.setAttribute('fill', d.fontColor || 'black'), g.setAttribute('font-family', d.fontFamily), g.setAttribute('font-size', Math.round(d.fontSize) + 'px'), 'start' != e && g.setAttribute('text-anchor', e), (d.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD && g.setAttribute('font-weight', 'bold'), (d.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC && g.setAttribute('font-style', 'italic'), b = [], (d.fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && b.push('underline'), (d.fontStyle & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && b.push('line-through'), 0 < b.length && g.setAttribute('text-decoration', b.join(' ')), mxUtils.write(g, a), g) : null;
};
mxSvgCanvas2D.prototype.createGradientId = function(a, b, c, d, e) {
  a = mxUtils.rgba2hex(a);
  '#' == a.charAt(0) && (a = a.substring(1));
  b = mxUtils.rgba2hex(b);
  '#' == b.charAt(0) && (b = b.substring(1));
  a = a.toLowerCase() + '-' + c;
  b = b.toLowerCase() + '-' + d;
  c = null;
  null == e || e == mxConstants.DIRECTION_SOUTH ? c = 's' : e == mxConstants.DIRECTION_EAST ? c = 'e' : e == mxConstants.DIRECTION_RADIAL ? c = 'r' : (d = a, a = b, b = d, e == mxConstants.DIRECTION_NORTH ? c = 's' : e == mxConstants.DIRECTION_WEST && (c = 'e'));
  return 'mx-gradient-' + a + '-' + b + '-' + c;
};
mxSvgCanvas2D.prototype.getSvgGradient = function(a, b, c, d, e) {
  var f = this.createGradientId(a, b, c, d, e),
    g = this.gradients[f];
  if (null == g) {
    var k = this.root.ownerSVGElement,
      l = 0,
      m = f + '-' + l;
    if (null != k)
      for (g = k.ownerDocument.getElementById(m); null != g && g.ownerSVGElement != k;)
        m = f + '-' + l++, g = k.ownerDocument.getElementById(m);
    else
      m = 'id' + ++this.refCount;
    null == g && (g = this.createSvgGradient(a, b, c, d, e), g.setAttribute('id', m), null != this.defs ? this.defs.appendChild(g) : k.appendChild(g));
    this.gradients[f] = g;
  }
  return g.getAttribute('id');
};
mxSvgCanvas2D.prototype.createSvgGradient = function(a, b, c, d, e) {
  var f = this.createElement(e == mxConstants.DIRECTION_RADIAL ? 'radialGradient' : 'linearGradient');
  f.setAttribute('x1', '0%');
  f.setAttribute('y1', '0%');
  f.setAttribute('x2', '0%');
  f.setAttribute('y2', '0%');
  null == e || e == mxConstants.DIRECTION_SOUTH ? f.setAttribute('y2', '100%') : e == mxConstants.DIRECTION_EAST ? f.setAttribute('x2', '100%') : e == mxConstants.DIRECTION_NORTH ? f.setAttribute('y1', '100%') : e == mxConstants.DIRECTION_WEST && f.setAttribute('x1', '100%');
  e = this.createElement('stop');
  e.setAttribute('offset', '0%');
  e.style.stopColor = a;
  e.style.stopOpacity = c;
  f.appendChild(e);
  e = this.createElement('stop');
  e.setAttribute('offset', '100%');
  e.style.stopColor = b;
  e.style.stopOpacity = d;
  f.appendChild(e);
  return f;
};
mxSvgCanvas2D.prototype.createFillPatternId = function(a, b, c) {
  c = mxUtils.rgba2hex(c);
  '#' == c.charAt(0) && (c = c.substring(1));
  return ('mx-pattern-' + a + '-' + b + '-' + c).toLowerCase();
};
mxSvgCanvas2D.prototype.getFillPattern = function(a, b, c, d) {
  var e = this.createFillPatternId(a, b, c),
    f = this.fillPatterns[e];
  if (null == f) {
    var g = this.root.ownerSVGElement,
      k = 0,
      l = e + '-' + k;
    if (null != g)
      for (f = g.ownerDocument.getElementById(l); null != f && f.ownerSVGElement != g;)
        l = e + '-' + k++, f = g.ownerDocument.getElementById(l);
    else
      l = 'id' + ++this.refCount;
    if (null == f) {
      switch (a) {
        case 'hatch':
          f = this.createHatchPattern(b, c, d);
          break;
        case 'dots':
          f = this.createDotsPattern(b, c, d);
          break;
        case 'cross-hatch':
          f = this.createCrossHatchPattern(b, c, d);
          break;
        case 'dashed':
          f = this.createDashedPattern(b, c, d);
          break;
        case 'zigzag':
        case 'zigzag-line':
          f = this.createZigZagLinePattern(b, c, d);
          break;
        default:
          return null;
      }
      f.setAttribute('id', l);
      null != this.defs ? this.defs.appendChild(f) : g.appendChild(f);
    }
    this.fillPatterns[e] = f;
  }
  return f.getAttribute('id');
};
mxSvgCanvas2D.prototype.createHatchPattern = function(a, b, c) {
  a = 1.5 * a * c;
  c = this.format((10 + a) * c);
  var d = this.createElement('pattern');
  d.setAttribute('patternUnits', 'userSpaceOnUse');
  d.setAttribute('width', c);
  d.setAttribute('height', c);
  d.setAttribute('x', '0');
  d.setAttribute('y', '0');
  d.setAttribute('patternTransform', 'rotate(45)');
  var e = this.createElement('line');
  e.setAttribute('x1', '0');
  e.setAttribute('y1', '0');
  e.setAttribute('x2', '0');
  e.setAttribute('y2', c);
  e.setAttribute('stroke', b);
  e.setAttribute('stroke-width', a);
  d.appendChild(e);
  return d;
};
mxSvgCanvas2D.prototype.createDashedPattern = function(a, b, c) {
  a = 1.5 * a * c;
  c = this.format((10 + a) * c);
  var d = this.createElement('pattern');
  d.setAttribute('patternUnits', 'userSpaceOnUse');
  d.setAttribute('width', c);
  d.setAttribute('height', c);
  d.setAttribute('x', '0');
  d.setAttribute('y', '0');
  d.setAttribute('patternTransform', 'rotate(45)');
  var e = this.createElement('line');
  e.setAttribute('x1', '0');
  e.setAttribute('y1', c / 4);
  e.setAttribute('x2', '0');
  e.setAttribute('y2', 3 * c / 4);
  e.setAttribute('stroke', b);
  e.setAttribute('stroke-width', a);
  d.appendChild(e);
  return d;
};
mxSvgCanvas2D.prototype.createZigZagLinePattern = function(a, b, c) {
  a = 1.5 * a * c;
  c = this.format((10 + a) * c);
  var d = this.createElement('pattern');
  d.setAttribute('patternUnits', 'userSpaceOnUse');
  d.setAttribute('width', c);
  d.setAttribute('height', c);
  d.setAttribute('x', '0');
  d.setAttribute('y', '0');
  d.setAttribute('patternTransform', 'rotate(45)');
  var e = this.createElement('path'),
    f = c / 4,
    g = 3 * c / 4;
  e.setAttribute('d', 'M ' + f + ' 0 L ' + g + ' 0 L ' + f + ' ' + c + ' L ' + g + ' ' + c);
  e.setAttribute('stroke', b);
  e.setAttribute('stroke-width', a);
  e.setAttribute('fill', 'none');
  d.appendChild(e);
  return d;
};
mxSvgCanvas2D.prototype.createCrossHatchPattern = function(a, b, c) {
  a = 0.5 * a * c;
  c = this.format(1.5 * (10 + a) * c);
  var d = this.createElement('pattern');
  d.setAttribute('patternUnits', 'userSpaceOnUse');
  d.setAttribute('width', c);
  d.setAttribute('height', c);
  d.setAttribute('x', '0');
  d.setAttribute('y', '0');
  d.setAttribute('patternTransform', 'rotate(45)');
  var e = this.createElement('rect');
  e.setAttribute('x', 0);
  e.setAttribute('y', 0);
  e.setAttribute('width', c);
  e.setAttribute('height', c);
  e.setAttribute('stroke', b);
  e.setAttribute('stroke-width', a);
  e.setAttribute('fill', 'none');
  d.appendChild(e);
  return d;
};
mxSvgCanvas2D.prototype.createDotsPattern = function(a, b, c) {
  a = this.format((10 + a) * c);
  c = this.createElement('pattern');
  c.setAttribute('patternUnits', 'userSpaceOnUse');
  c.setAttribute('width', a);
  c.setAttribute('height', a);
  c.setAttribute('x', '0');
  c.setAttribute('y', '0');
  var d = this.createElement('circle');
  d.setAttribute('cx', a / 2);
  d.setAttribute('cy', a / 2);
  d.setAttribute('r', a / 4);
  d.setAttribute('stroke', 'none');
  d.setAttribute('fill', b);
  c.appendChild(d);
  return c;
};
mxSvgCanvas2D.prototype.addNode = function(a, b) {
  var c = this.node,
    d = this.state;
  if (null != c) {
    if ('path' == c.nodeName)
      if (null != this.path && 0 < this.path.length)
        c.setAttribute('d', this.path.join(' '));
      else
        return;
    a && null != d.fillColor ? this.updateFill() : this.styleEnabled || ('ellipse' == c.nodeName && mxClient.IS_FF ? c.setAttribute('fill', 'transparent') : c.setAttribute('fill', 'none'), a = !1);
    b && null != d.strokeColor ? this.updateStroke() : this.styleEnabled || c.setAttribute('stroke', 'none');
    null != d.transform && 0 < d.transform.length && c.setAttribute('transform', d.transform);
    this.pointerEvents ? c.setAttribute('pointer-events', this.pointerEventsValue) : this.pointerEvents || null != this.originalRoot || c.setAttribute('pointer-events', 'none');
    d.shadow && this.root.appendChild(this.createShadow(c));
    0 < this.strokeTolerance && (!a || null == d.fillColor) && this.addTolerance(c);
    ('rect' != c.nodeName && 'path' != c.nodeName && 'ellipse' != c.nodeName || 'none' != c.getAttribute('fill') && 'transparent' != c.getAttribute('fill') || 'none' != c.getAttribute('stroke') || 'none' != c.getAttribute('pointer-events')) && this.root.appendChild(c);
    this.node = null;
  }
};
mxSvgCanvas2D.prototype.addTolerance = function(a) {
  this.root.appendChild(this.createTolerance(a));
};
mxSvgCanvas2D.prototype.updateFill = function() {
  var a = this.state;
  (1 > a.alpha || 1 > a.fillAlpha) && this.node.setAttribute('fill-opacity', a.alpha * a.fillAlpha);
  var b = !1;
  if (null != a.fillColor)
    if (null != a.gradientColor && a.gradientColor != mxConstants.NONE) {
      b = !0;
      var c = this.getSvgGradient(String(a.fillColor), String(a.gradientColor), a.gradientFillAlpha, a.gradientAlpha, a.gradientDirection);
      if (this.root.ownerDocument == document && this.useAbsoluteIds) {
        var d = this.getBaseUrl().replace(/([\(\)])/g, '\\$1');
        d = 'url(' + d + '#' + c + ')';
      } else
        d = 'url(#' + c + ')';
    } else
      d = String(a.fillColor).toLowerCase();
  a = null == a.fillStyle || 'auto' == a.fillStyle || 'solid' == a.fillStyle ? null : this.getFillPattern(a.fillStyle, this.getCurrentStrokeWidth(), d, a.scale);
  b || null == a ? this.node.setAttribute('fill', d) : this.root.ownerDocument == document && this.useAbsoluteIds ? (d = this.getBaseUrl().replace(/([\(\)])/g, '\\$1'), this.node.setAttribute('fill', 'url(' + d + '#' + a + ')')) : this.node.setAttribute('fill', 'url(#' + a + ')');
};
mxSvgCanvas2D.prototype.getCurrentStrokeWidth = function() {
  return Math.max(this.minStrokeWidth, Math.max(0.01, this.format(this.state.strokeWidth * this.state.scale)));
};
mxSvgCanvas2D.prototype.updateStroke = function() {
  var a = this.state;
  this.node.setAttribute('stroke', String(a.strokeColor).toLowerCase());
  (1 > a.alpha || 1 > a.strokeAlpha) && this.node.setAttribute('stroke-opacity', a.alpha * a.strokeAlpha);
  var b = this.getCurrentStrokeWidth();
  1 != b && this.node.setAttribute('stroke-width', b);
  'path' == this.node.nodeName && this.updateStrokeAttributes();
  a.dashed && this.node.setAttribute('stroke-dasharray', this.createDashPattern((a.fixDash ? 1 : a.strokeWidth) * a.scale));
};
mxSvgCanvas2D.prototype.updateStrokeAttributes = function() {
  var a = this.state;
  null != a.lineJoin && 'miter' != a.lineJoin && this.node.setAttribute('stroke-linejoin', a.lineJoin);
  if (null != a.lineCap) {
    var b = a.lineCap;
    'flat' == b && (b = 'butt');
    'butt' != b && this.node.setAttribute('stroke-linecap', b);
  }
  null == a.miterLimit || this.styleEnabled && 10 == a.miterLimit || this.node.setAttribute('stroke-miterlimit', a.miterLimit);
};
mxSvgCanvas2D.prototype.createDashPattern = function(a) {
  var b = [];
  if ('string' === typeof this.state.dashPattern) {
    var c = this.state.dashPattern.split(' ');
    if (0 < c.length)
      for (var d = 0; d < c.length; d++)
        b[d] = Number(c[d]) * a;
  }
  return b.join(' ');
};
mxSvgCanvas2D.prototype.createTolerance = function(a) {
  a = a.cloneNode(!0);
  var b = parseFloat(a.getAttribute('stroke-width') || 1) + this.strokeTolerance;
  a.setAttribute('pointer-events', 'stroke');
  a.setAttribute('visibility', 'hidden');
  a.removeAttribute('stroke-dasharray');
  a.setAttribute('stroke-width', b);
  a.setAttribute('fill', 'none');
  a.setAttribute('stroke', mxClient.IS_OT ? 'none' : 'white');
  return a;
};
mxSvgCanvas2D.prototype.createShadow = function(a) {
  a = a.cloneNode(!0);
  var b = this.state;
  'none' == a.getAttribute('fill') || mxClient.IS_FF && 'transparent' == a.getAttribute('fill') || a.setAttribute('fill', b.shadowColor);
  'none' != a.getAttribute('stroke') && a.setAttribute('stroke', b.shadowColor);
  a.setAttribute('transform', 'translate(' + this.format(b.shadowDx * b.scale) + ',' + this.format(b.shadowDy * b.scale) + ')' + (b.transform || ''));
  a.setAttribute('opacity', b.shadowAlpha);
  return a;
};
mxSvgCanvas2D.prototype.setLink = function(a, b) {
  if (null == a)
    this.root = this.originalRoot;
  else {
    this.originalRoot = this.root;
    var c = this.createElement('a');
    null == c.setAttributeNS || this.root.ownerDocument != document && null == document.documentMode ? c.setAttribute('xlink:href', a) : c.setAttributeNS(mxConstants.NS_XLINK, 'xlink:href', a);
    null != b && c.setAttribute('target', b);
    this.root.appendChild(c);
    this.root = c;
  }
};
mxSvgCanvas2D.prototype.rotate = function(a, b, c, d, e) {
  if (0 != a || b || c) {
    var f = this.state;
    d += f.dx;
    e += f.dy;
    d *= f.scale;
    e *= f.scale;
    f.transform = f.transform || '';
    if (b && c)
      a += 180;
    else if (b != c) {
      var g = b ? d : 0,
        k = b ? -1 : 1,
        l = c ? e : 0,
        m = c ? -1 : 1;
      f.transform += 'translate(' + this.format(g) + ',' + this.format(l) + ')scale(' + this.format(k) + ',' + this.format(m) + ')translate(' + this.format(-g) + ',' + this.format(-l) + ')';
    }
    if (b ? !c : c)
      a *= -1;
    0 != a && (f.transform += 'rotate(' + this.format(a) + ',' + this.format(d) + ',' + this.format(e) + ')');
    f.rotation += a;
    f.rotationCx = d;
    f.rotationCy = e;
  }
};
mxSvgCanvas2D.prototype.begin = function() {
  mxAbstractCanvas2D.prototype.begin.apply(this, arguments);
  this.node = this.createElement('path');
};
mxSvgCanvas2D.prototype.rect = function(a, b, c, d) {
  var e = this.state,
    f = this.createElement('rect');
  f.setAttribute('x', this.format((a + e.dx) * e.scale));
  f.setAttribute('y', this.format((b + e.dy) * e.scale));
  f.setAttribute('width', this.format(c * e.scale));
  f.setAttribute('height', this.format(d * e.scale));
  this.node = f;
};
mxSvgCanvas2D.prototype.roundrect = function(a, b, c, d, e, f) {
  this.rect(a, b, c, d);
  0 < e && this.node.setAttribute('rx', this.format(e * this.state.scale));
  0 < f && this.node.setAttribute('ry', this.format(f * this.state.scale));
};
mxSvgCanvas2D.prototype.ellipse = function(a, b, c, d) {
  var e = this.state,
    f = this.createElement('ellipse');
  f.setAttribute('cx', this.format((a + c / 2 + e.dx) * e.scale));
  f.setAttribute('cy', this.format((b + d / 2 + e.dy) * e.scale));
  f.setAttribute('rx', c / 2 * e.scale);
  f.setAttribute('ry', d / 2 * e.scale);
  this.node = f;
};
mxSvgCanvas2D.prototype.image = function(a, b, c, d, e, f, g, k, l) {
  e = this.converter.convert(e);
  f = null != f ? f : !0;
  g = null != g ? g : !1;
  k = null != k ? k : !1;
  var m = this.state;
  a += m.dx;
  b += m.dy;
  var n = this.createElement('image');
  n.setAttribute('x', this.format(a * m.scale) + this.imageOffset);
  n.setAttribute('y', this.format(b * m.scale) + this.imageOffset);
  n.setAttribute('width', this.format(c * m.scale));
  n.setAttribute('height', this.format(d * m.scale));
  null == n.setAttributeNS ? n.setAttribute('xlink:href', e) : n.setAttributeNS(mxConstants.NS_XLINK, 'xlink:href', e);
  f || n.setAttribute('preserveAspectRatio', 'none');
  (1 > m.alpha || 1 > m.fillAlpha) && n.setAttribute('opacity', m.alpha * m.fillAlpha);
  e = this.state.transform || '';
  if (g || k) {
    var p = f = 1,
      r = 0,
      q = 0;
    g && (f = -1, r = -c - 2 * a);
    k && (p = -1, q = -d - 2 * b);
    e += 'scale(' + f + ',' + p + ')translate(' + r * m.scale + ',' + q * m.scale + ')';
  }
  0 < e.length && n.setAttribute('transform', e);
  this.pointerEvents || n.setAttribute('pointer-events', 'none');
  null != l && this.processClipPath(n, l, new mxRectangle(a, b, c, d));
  this.root.appendChild(n);
};
mxSvgCanvas2D.prototype.processClipPath = function(a, b, c) {
  try {
    var d = this.createElement('clipPath');
    d.setAttribute('id', this.createClipPathId(b));
    d.setAttribute('clipPathUnits', 'objectBoundingBox');
    var e = this.appendClipPath(d, b, c);
    if (null != e) {
      var f = this.state;
      a.setAttribute('x', c.x * f.scale - c.width * f.scale * e.x / e.width + this.imageOffset);
      a.setAttribute('y', c.y * f.scale - c.height * f.scale * e.y / e.height + this.imageOffset);
      a.setAttribute('width', c.width * f.scale / e.width);
      a.setAttribute('height', c.height * f.scale / e.height);
    }
    this.setClip(a, d);
  } catch (g) {}
};
mxSvgCanvas2D.prototype.convertHtml = function(a) {
  if (this.useDomParser) {
    var b = new DOMParser().parseFromString(a, 'text/html');
    null != b && (a = new XMLSerializer().serializeToString(b.body), '<body' == a.substring(0, 5) && (a = a.substring(a.indexOf('>', 5) + 1)), '</body>' == a.substring(a.length - 7, a.length) && (a = a.substring(0, a.length - 7)));
  } else {
    if (null != document.implementation && null != document.implementation.createDocument) {
      b = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
      var c = b.createElement('body');
      b.documentElement.appendChild(c);
      var d = document.createElement('div');
      d.innerHTML = a;
      for (a = d.firstChild; null != a;)
        d = a.nextSibling, c.appendChild(b.adoptNode(a)), a = d;
      return c.innerHTML;
    }
    b = document.createElement('textarea');
    b.innerHTML = a.replace(/&amp;/g, '&amp;amp;').replace(/&#60;/g, '&amp;lt;').replace(/&#62;/g, '&amp;gt;').replace(/&lt;/g, '&amp;lt;').replace(/&gt;/g, '&amp;gt;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    a = b.value.replace(/&/g, '&amp;').replace(/&amp;lt;/g, '&lt;').replace(/&amp;gt;/g, '&gt;').replace(/&amp;amp;/g, '&amp;').replace(/<br>/g, '<br />').replace(/<hr>/g, '<hr />').replace(/(<img[^>]+)>/gm, '$1 />');
  }
  return a;
};
mxSvgCanvas2D.prototype.createDiv = function(a) {
  mxUtils.isNode(a) || (a = '<div><div>' + this.convertHtml(a) + '</div></div>');
  if (mxClient.IS_IE || mxClient.IS_IE11 || !document.createElementNS)
    return mxUtils.isNode(a) && (a = '<div><div>' + mxUtils.getXml(a) + '</div></div>'), mxUtils.parseXml('<div xmlns="http://www.w3.org/1999/xhtml">' + a + '</div>').documentElement;
  var b = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
  if (mxUtils.isNode(a)) {
    var c = document.createElement('div'),
      d = c.cloneNode(!1);
    this.root.ownerDocument != document ? c.appendChild(a.cloneNode(!0)) : c.appendChild(a);
    d.appendChild(c);
    b.appendChild(d);
  } else
    b.innerHTML = a;
  return b;
};
mxSvgCanvas2D.prototype.updateText = function(a, b, c, d, e, f, g, k, l, m, n) {
  null != n && null != n.firstChild && null != n.firstChild.firstChild && this.updateTextNodes(a, b, c, d, e, f, g, k, l, m, n.firstChild);
};
mxSvgCanvas2D.prototype.addForeignObject = function(a, b, c, d, e, f, g, k, l, m, n, p, r, q, t) {
  r = this.createElement('g');
  var u = this.createElement('foreignObject');
  this.setCssText(u, 'overflow: visible; text-align: left;');
  u.setAttribute('pointer-events', 'none');
  q.ownerDocument != document && (q = mxUtils.importNodeImplementation(u.ownerDocument, q, !0));
  u.appendChild(q);
  r.appendChild(u);
  this.updateTextNodes(a, b, c, d, f, g, k, m, n, p, r);
  this.root.ownerDocument != document && (a = this.createAlternateContent(u, a, b, c, d, e, f, g, k, l, m, n, p), null != a && (u.setAttribute('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility'), b = this.createElement('switch'), b.appendChild(u), b.appendChild(a), r.appendChild(b)));
  t.appendChild(r);
};
mxSvgCanvas2D.prototype.updateTextNodes = function(a, b, c, d, e, f, g, k, l, m, n) {
  var p = this.state.scale;
  mxSvgCanvas2D.createCss(c + this.foreignObjectPadding, d, e, f, g, k, l, null != this.state.fontBackgroundColor ? this.state.fontBackgroundColor : null, null != this.state.fontBorderColor ? this.state.fontBorderColor : null, 'display: flex; align-items: unsafe ' + (f == mxConstants.ALIGN_TOP ? 'flex-start' : f == mxConstants.ALIGN_BOTTOM ? 'flex-end' : 'center') + '; justify-content: unsafe ' + (e == mxConstants.ALIGN_LEFT ? 'flex-start' : e == mxConstants.ALIGN_RIGHT ? 'flex-end' : 'center') + '; ', this.getTextCss(), p, mxUtils.bind(this, function(r, q, t, u, x) {
    a += this.state.dx;
    b += this.state.dy;
    var A = n.firstChild,
      E = A.firstChild,
      C = E.firstChild,
      D = (this.rotateHtml ? this.state.rotation : 0) + (null != m ? m : 0),
      B = (0 != this.foOffset ? 'translate(' + this.foOffset + ' ' + this.foOffset + ')' : '') + (1 != p ? 'scale(' + p + ')' : '');
    this.setCssText(C.firstChild, x);
    this.setCssText(C, u);
    C.setAttribute('data-drawio-colors', 'color: ' + this.state.fontColor + '; ' + (null == this.state.fontBackgroundColor ? '' : 'background-color: ' + this.state.fontBackgroundColor + '; ') + (null == this.state.fontBorderColor ? '' : 'border-color: ' + this.state.fontBorderColor + '; '));
    A.setAttribute('width', Math.ceil(1 / Math.min(1, p) * 100) + '%');
    A.setAttribute('height', Math.ceil(1 / Math.min(1, p) * 100) + '%');
    q = Math.round(b + q);
    0 > q ? (A.setAttribute('y', q), t += 'padding-top: 0; ') : (A.removeAttribute('y'), t += 'padding-top: ' + q + 'px; ');
    this.setCssText(E, t + 'margin-left: ' + Math.round(a + r) + 'px;');
    B += 0 != D ? 'rotate(' + D + ' ' + a + ' ' + b + ')' : '';
    '' != B ? n.setAttribute('transform', B) : n.removeAttribute('transform');
    1 != this.state.alpha ? n.setAttribute('opacity', this.state.alpha) : n.removeAttribute('opacity');
  }));
};
mxSvgCanvas2D.createCss = function(a, b, c, d, e, f, g, k, l, m, n, p, r) {
  p = 'box-sizing: border-box; font-size: 0; text-align: ' + (c == mxConstants.ALIGN_LEFT ? 'left' : c == mxConstants.ALIGN_RIGHT ? 'right' : 'center') + '; ';
  var q = mxUtils.getAlignmentAsPoint(c, d);
  c = 'overflow: hidden; ';
  var t = 'width: 1px; ',
    u = 'height: 1px; ',
    x = q.x * a;
  q = q.y * b;
  g ? (t = 'width: ' + Math.round(a) + 'px; ', p += 'max-height: ' + Math.round(b) + 'px; ', q = 0) : 'fill' == f ? (t = 'width: ' + Math.round(a) + 'px; ', u = 'height: ' + Math.round(b) + 'px; ', n += 'width: 100%; height: 100%; ', p += 'width: ' + Math.round(a - 2) + 'px; ' + u) : 'width' == f ? (t = 'width: ' + Math.round(a - 2) + 'px; ', n += 'width: 100%; ', p += t, q = 0, 0 < b && (p += 'max-height: ' + Math.round(b) + 'px; ')) : 'block' == f ? (t = 'width: ' + Math.round(a - 2) + 'px; ', n += 'width: 100%; ', c = '', q = 0, p += t, 'middle' == d && (p += 'max-height: ' + Math.round(b) + 'px; ')) : (c = '', q = 0);
  b = '';
  null != k && (b += 'background-color: ' + k + '; ');
  null != l && (b += 'border: 1px solid ' + l + '; ');
  '' == c || g ? n += b : p += b;
  e && 0 < a ? (n += 'white-space: normal; word-wrap: ' + mxConstants.WORD_WRAP + '; ', t = 'width: ' + Math.round(a) + 'px; ', '' != c && 'fill' != f && (q = 0)) : (n += 'white-space: nowrap; ', '' == c && 'block' != f && (x = 0));
  r(x, q, m + t + u, p + c, n, c);
};
mxSvgCanvas2D.prototype.getTextCss = function() {
  var a = this.state,
    b = 'display: inline-block; font-size: ' + a.fontSize + 'px; font-family: ' + a.fontFamily + '; color: ' + a.fontColor + '; line-height: ' + (mxConstants.ABSOLUTE_LINE_HEIGHT ? a.fontSize * mxConstants.LINE_HEIGHT + 'px' : mxConstants.LINE_HEIGHT * this.lineHeightCorrection) + '; pointer-events: ' + (this.pointerEvents ? this.pointerEventsValue : 'none') + '; ';
  (a.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD && (b += 'font-weight: bold; ');
  (a.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC && (b += 'font-style: italic; ');
  var c = [];
  (a.fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && c.push('underline');
  (a.fontStyle & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && c.push('line-through');
  0 < c.length && (b += 'text-decoration: ' + c.join(' ') + '; ');
  return b;
};
mxSvgCanvas2D.prototype.text = function(a, b, c, d, e, f, g, k, l, m, n, p, r) {
  if (this.textEnabled && null != e)
    if (p = null != p ? p : 0, this.foEnabled && 'html' == l) {
      var q = this.createDiv(e);
      null != q && (null != r && q.setAttribute('dir', r), this.addForeignObject(a, b, c, d, e, f, g, k, l, m, n, p, r, q, this.root));
    } else
      this.plainText(a + this.state.dx, b + this.state.dy, c, d, e, f, g, k, m, n, p, r);
};
mxSvgCanvas2D.prototype.createClip = function(a, b, c, d) {
  a = Math.round(a);
  b = Math.round(b);
  c = Math.round(c);
  d = Math.round(d);
  for (var e = 'mx-clip-' + a + '-' + b + '-' + c + '-' + d, f = 0, g = e + '-' + f; null != document.getElementById(g);)
    g = e + '-' + ++f;
  e = this.createElement('clipPath');
  e.setAttribute('id', g);
  g = this.createElement('rect');
  g.setAttribute('x', a);
  g.setAttribute('y', b);
  g.setAttribute('width', c);
  g.setAttribute('height', d);
  e.appendChild(g);
  return e;
};
mxSvgCanvas2D.prototype.createClipPathId = function(a) {
  a = 'mx-clippath-' + a.replace(/[^a-zA-Z0-9]+/g, '-');
  for (var b = '-' == a.charAt(a.length - 1) ? '' : '-', c = 0, d = a + b + c; null != document.getElementById(d);)
    d = a + b + ++c;
  return d;
};
mxSvgCanvas2D.prototype.appendClipPath = function(a, b, c) {
  var d = b.match(/\(([^)]+)\)/),
    e = null;
  'polygon' == b.substring(0, 7) ? e = this.appendPolygonClip(d[1], a, c) : 'circle' == b.substring(0, 6) ? e = this.appendCircleClip(d[1], a, c) : 'ellipse' == b.substring(0, 7) ? e = this.appendEllipseClip(d[1], a, c) : 'inset' == b.substring(0, 5) && (e = this.appendInsetClip(d[1], a, c));
  return e;
};
mxSvgCanvas2D.prototype.appendPolygonClip = function(a, b, c) {
  c = this.createElement('polygon');
  a = a.split(/[ ,]+/);
  for (var d = null, e = null, f = null, g = null, k = [], l = 0; l < a.length; l++) {
    var m = this.parseClipValue(a, l);
    if (0 == l % 2) {
      if (null == d || d > m)
        d = m;
      if (null == f || f < m)
        f = m;
    } else {
      if (null == e || e > m)
        e = m;
      if (null == g || g < m)
        g = m;
    }
    k.push(m);
  }
  c.setAttribute('points', k.join(','));
  b.appendChild(c);
  return new mxRectangle(d, e, f - d, g - e);
};
mxSvgCanvas2D.prototype.appendCircleClip = function(a, b, c) {
  c = this.createElement('circle');
  var d = a.split(/[ ,]+/);
  a = this.parseClipValue(d, 0);
  var e = this.parseClipValue(d, 2);
  d = this.parseClipValue(d, 3);
  c.setAttribute('r', a);
  c.setAttribute('cx', e);
  c.setAttribute('cy', d);
  b.appendChild(c);
  return new mxRectangle(e - a, d - a, 2 * a, 2 * a);
};
mxSvgCanvas2D.prototype.appendEllipseClip = function(a, b, c) {
  c = this.createElement('ellipse');
  var d = a.split(/[ ,]+/);
  a = this.parseClipValue(d, 0);
  var e = this.parseClipValue(d, 1),
    f = this.parseClipValue(d, 3);
  d = this.parseClipValue(d, 4);
  c.setAttribute('rx', a);
  c.setAttribute('ry', e);
  c.setAttribute('cx', f);
  c.setAttribute('cy', d);
  b.appendChild(c);
  return new mxRectangle(f - a, d - e, 2 * a, 2 * e);
};
mxSvgCanvas2D.prototype.appendInsetClip = function(a, b, c) {
  c = this.createElement('rect');
  var d = a.split(/[ ,]+/);
  a = this.parseClipValue(d, 0);
  var e = this.parseClipValue(d, 1),
    f = this.parseClipValue(d, 2),
    g = this.parseClipValue(d, 3);
  e = 1 - e - g;
  f = 1 - a - f;
  c.setAttribute('x', g);
  c.setAttribute('y', a);
  c.setAttribute('width', e);
  c.setAttribute('height', f);
  4 < d.length && 'round' == d[4] && (d = this.parseClipValue(d, 5), c.setAttribute('rx', d), c.setAttribute('ry', d));
  b.appendChild(c);
  return new mxRectangle(g, a, e, f);
};
mxSvgCanvas2D.prototype.parseClipValue = function(a, b) {
  b = a[Math.min(b, a.length - 1)];
  a = 1;
  'center' == b ? a = 0.5 : 'top' == b || 'left' == b ? a = 0 : (b = parseFloat(b), isNaN(b) || (a = Math.max(0, Math.min(1, b / 100))));
  return a;
};
mxSvgCanvas2D.prototype.setClip = function(a, b) {
  null != this.defs ? this.defs.appendChild(b) : this.root.appendChild(b);
  if (mxClient.IS_CHROMEAPP || mxClient.IS_IE || mxClient.IS_IE11 || mxClient.IS_EDGE || this.root.ownerDocument != document)
    a.setAttribute('clip-path', 'url(#' + b.getAttribute('id') + ')');
  else {
    var c = this.getBaseUrl().replace(/([\(\)])/g, '\\$1');
    a.setAttribute('clip-path', 'url(' + c + '#' + b.getAttribute('id') + ')');
  }
};
mxSvgCanvas2D.prototype.plainText = function(a, b, c, d, e, f, g, k, l, m, n, p) {
  n = null != n ? n : 0;
  k = this.state;
  var r = k.fontSize,
    q = this.createElement('g'),
    t = k.transform || '';
  this.updateFont(q);
  this.pointerEvents || null != this.originalRoot || q.setAttribute('pointer-events', 'none');
  0 != n && (t += 'rotate(' + n + ',' + this.format(a * k.scale) + ',' + this.format(b * k.scale) + ')');
  null != p && q.setAttribute('direction', p);
  m && 0 < c && 0 < d && (p = a, n = b, f == mxConstants.ALIGN_CENTER ? p -= c / 2 : f == mxConstants.ALIGN_RIGHT && (p -= c), 'fill' != l && (g == mxConstants.ALIGN_MIDDLE ? n -= d / 2 : g == mxConstants.ALIGN_BOTTOM && (n -= d)), this.setClip(q, this.createClip(p * k.scale - 2, n * k.scale - 2, c * k.scale + 4, d * k.scale + 4)));
  n = f == mxConstants.ALIGN_RIGHT ? 'end' : f == mxConstants.ALIGN_CENTER ? 'middle' : 'start';
  'start' != n && q.setAttribute('text-anchor', n);
  this.styleEnabled && r == mxConstants.DEFAULT_FONTSIZE || q.setAttribute('font-size', r * k.scale + 'px');
  0 < t.length && q.setAttribute('transform', t);
  1 > k.alpha && q.setAttribute('opacity', k.alpha);
  t = e.split('\n');
  p = Math.round(r * mxConstants.LINE_HEIGHT);
  var u = r + (t.length - 1) * p;
  n = b + r - 1;
  g == mxConstants.ALIGN_MIDDLE ? 'fill' == l ? n -= d / 2 : (m = (this.matchHtmlAlignment && m && 0 < d ? Math.min(u, d) : u) / 2, n -= m) : g == mxConstants.ALIGN_BOTTOM && ('fill' == l ? n -= d : (m = this.matchHtmlAlignment && m && 0 < d ? Math.min(u, d) : u, n -= m + 1));
  for (m = 0; m < t.length; m++)
    0 < t[m].length && 0 < mxUtils.trim(t[m]).length && (r = this.createElement('text'), r.setAttribute('x', this.format(a * k.scale) + this.textOffset), r.setAttribute('y', this.format(n * k.scale) + this.textOffset), mxUtils.write(r, t[m]), q.appendChild(r)), n += p;
  this.root.appendChild(q);
  this.addTextBackground(q, e, a, b, c, 'fill' == l ? d : u, f, g, l);
};
mxSvgCanvas2D.prototype.updateFont = function(a) {
  var b = this.state;
  a.setAttribute('fill', b.fontColor);
  this.styleEnabled && b.fontFamily == mxConstants.DEFAULT_FONTFAMILY || a.setAttribute('font-family', b.fontFamily);
  (b.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD && a.setAttribute('font-weight', 'bold');
  (b.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC && a.setAttribute('font-style', 'italic');
  var c = [];
  (b.fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && c.push('underline');
  (b.fontStyle & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && c.push('line-through');
  0 < c.length && a.setAttribute('text-decoration', c.join(' '));
};
mxSvgCanvas2D.prototype.addTextBackground = function(a, b, c, d, e, f, g, k, l) {
  var m = this.state;
  if (null != m.fontBackgroundColor || null != m.fontBorderColor) {
    var n = null;
    if ('fill' == l || 'width' == l)
      g == mxConstants.ALIGN_CENTER ? c -= e / 2 : g == mxConstants.ALIGN_RIGHT && (c -= e), k == mxConstants.ALIGN_MIDDLE ? d -= f / 2 : k == mxConstants.ALIGN_BOTTOM && (d -= f), n = new mxRectangle((c + 1) * m.scale, d * m.scale, (e - 2) * m.scale, (f + 2) * m.scale);
    else if (null != a.getBBox && this.root.ownerDocument == document)
      try {
        n = a.getBBox();
        var p = mxClient.IS_IE && mxClient.IS_SVG;
        n = new mxRectangle(n.x, n.y + (p ? 0 : 1), n.width, n.height + (p ? 1 : 0));
      } catch (r) {}
    if (null == n || 0 == n.width || 0 == n.height)
      n = document.createElement('div'), n.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT ? m.fontSize * mxConstants.LINE_HEIGHT + 'px' : mxConstants.LINE_HEIGHT, n.style.fontSize = m.fontSize + 'px', n.style.fontFamily = m.fontFamily, n.style.whiteSpace = 'nowrap', n.style.position = 'absolute', n.style.visibility = 'hidden', n.style.display = 'inline-block', n.style.zoom = '1', (m.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD && (n.style.fontWeight = 'bold'), (m.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC && (n.style.fontStyle = 'italic'), b = mxUtils.htmlEntities(b, !1), n.innerHTML = b.replace(/\n/g, '<br/>'), document.body.appendChild(n), e = n.offsetWidth, f = n.offsetHeight, n.parentNode.removeChild(n), g == mxConstants.ALIGN_CENTER ? c -= e / 2 : g == mxConstants.ALIGN_RIGHT && (c -= e), k == mxConstants.ALIGN_MIDDLE ? d -= f / 2 : k == mxConstants.ALIGN_BOTTOM && (d -= f), n = new mxRectangle((c + 1) * m.scale, (d + 2) * m.scale, e * m.scale, (f + 1) * m.scale);
    null != n && (b = this.createElement('rect'), b.setAttribute('fill', m.fontBackgroundColor || 'none'), b.setAttribute('stroke', m.fontBorderColor || 'none'), b.setAttribute('x', Math.floor(n.x - 1)), b.setAttribute('y', Math.floor(n.y - 1)), b.setAttribute('width', Math.ceil(n.width + 2)), b.setAttribute('height', Math.ceil(n.height)), m = null != m.fontBorderColor ? Math.max(1, this.format(m.scale)) : 0, b.setAttribute('stroke-width', m), this.root.ownerDocument == document && 1 == mxUtils.mod(m, 2) && b.setAttribute('transform', 'translate(0.5, 0.5)'), a.insertBefore(b, a.firstChild));
  }
};
mxSvgCanvas2D.prototype.stroke = function() {
  this.addNode(!1, !0);
};
mxSvgCanvas2D.prototype.fill = function() {
  this.addNode(!0, !1);
};
mxSvgCanvas2D.prototype.fillAndStroke = function() {
  this.addNode(!0, !0);
};