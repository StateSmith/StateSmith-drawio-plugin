function mxShape(a) {
  this.stencil = a;
  this.initStyles();
}
mxShape.prototype.dialect = null;
mxShape.prototype.scale = 1;
mxShape.prototype.antiAlias = !0;
mxShape.prototype.minSvgStrokeWidth = 1;
mxShape.prototype.bounds = null;
mxShape.prototype.points = null;
mxShape.prototype.node = null;
mxShape.prototype.state = null;
mxShape.prototype.style = null;
mxShape.prototype.boundingBox = null;
mxShape.prototype.stencil = null;
mxShape.prototype.svgStrokeTolerance = 8;
mxShape.prototype.pointerEvents = !0;
mxShape.prototype.svgPointerEvents = 'all';
mxShape.prototype.shapePointerEvents = !1;
mxShape.prototype.stencilPointerEvents = !1;
mxShape.prototype.outline = !1;
mxShape.prototype.visible = !0;
mxShape.prototype.useSvgBoundingBox = !1;
mxShape.prototype.init = function(a) {
  null == this.node && (this.node = this.create(a), null != a && a.appendChild(this.node));
};
mxShape.prototype.initStyles = function(a) {
  this.strokewidth = 1;
  this.rotation = 0;
  this.strokeOpacity = this.fillOpacity = this.opacity = 100;
  this.flipV = this.flipH = !1;
};
mxShape.prototype.isHtmlAllowed = function() {
  return !1;
};
mxShape.prototype.getSvgScreenOffset = function() {
  return 1 == mxUtils.mod(Math.max(1, Math.round((this.stencil && 'inherit' != this.stencil.strokewidth ? Number(this.stencil.strokewidth) : this.strokewidth) * this.scale)), 2) ? 0.5 : 0;
};
mxShape.prototype.create = function(a) {
  return null != a && null != a.ownerSVGElement ? this.createSvg(a) : this.createHtml(a);
};
mxShape.prototype.createSvg = function() {
  return document.createElementNS(mxConstants.NS_SVG, 'g');
};
mxShape.prototype.createHtml = function() {
  var a = document.createElement('div');
  a.style.position = 'absolute';
  return a;
};
mxShape.prototype.reconfigure = function() {
  this.redraw();
};
mxShape.prototype.redraw = function() {
  this.updateBoundsFromPoints();
  this.visible && this.checkBounds() ? (this.node.style.visibility = 'visible', this.clear(), 'DIV' == this.node.nodeName ? this.redrawHtmlShape() : this.redrawShape(), this.updateBoundingBox()) : (this.node.style.visibility = 'hidden', this.boundingBox = null);
};
mxShape.prototype.clear = function() {
  if (null != this.node.ownerSVGElement)
    for (; null != this.node.lastChild;)
      this.node.removeChild(this.node.lastChild);
  else
    this.node.style.cssText = 'position:absolute;' + (null != this.cursor ? 'cursor:' + this.cursor + ';' : ''), this.node.innerText = '';
};
mxShape.prototype.updateBoundsFromPoints = function() {
  var a = this.points;
  if (null != a && 0 < a.length && null != a[0]) {
    this.bounds = new mxRectangle(Number(a[0].x), Number(a[0].y), 1, 1);
    for (var b = 1; b < this.points.length; b++)
      null != a[b] && this.bounds.add(new mxRectangle(Number(a[b].x), Number(a[b].y), 1, 1));
  }
};
mxShape.prototype.getLabelBounds = function(a) {
  var b = mxUtils.getValue(this.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST),
    c = a;
  b != mxConstants.DIRECTION_SOUTH && b != mxConstants.DIRECTION_NORTH && null != this.state && null != this.state.text && this.state.text.isPaintBoundsInverted() && (c = c.clone(), b = c.width, c.width = c.height, c.height = b);
  c = this.getLabelMargins(c);
  if (null != c) {
    var d = '1' == mxUtils.getValue(this.style, mxConstants.STYLE_FLIPH, !1),
      e = '1' == mxUtils.getValue(this.style, mxConstants.STYLE_FLIPV, !1);
    null != this.state && null != this.state.text && this.state.text.isPaintBoundsInverted() && (b = c.x, c.x = c.height, c.height = c.width, c.width = c.y, c.y = b, b = d, d = e, e = b);
    return mxUtils.getDirectedBounds(a, c, this.style, d, e);
  }
  return a;
};
mxShape.prototype.getLabelMargins = function(a) {
  return null;
};
mxShape.prototype.checkBounds = function() {
  return !isNaN(this.scale) && isFinite(this.scale) && 0 < this.scale && null != this.bounds && !isNaN(this.bounds.x) && !isNaN(this.bounds.y) && !isNaN(this.bounds.width) && !isNaN(this.bounds.height) && 0 < this.bounds.width && 0 < this.bounds.height;
};
mxShape.prototype.redrawShape = function() {
  var a = this.createCanvas();
  null != a && (a.pointerEvents = this.pointerEvents, this.beforePaint(a), this.paint(a), this.afterPaint(a), this.node != a.root && this.node.insertAdjacentHTML('beforeend', a.root.outerHTML), 'DIV' == this.node.nodeName && 8 == document.documentMode && (this.node.style.filter = '', mxUtils.addTransparentBackgroundFilter(this.node)), this.destroyCanvas(a));
};
mxShape.prototype.createCanvas = function() {
  var a = null;
  null != this.node.ownerSVGElement && (a = this.createSvgCanvas());
  null != a && this.outline && (a.setStrokeWidth(this.strokewidth), a.setStrokeColor(this.stroke), null != this.isDashed && a.setDashed(this.isDashed), a.setStrokeWidth = function() {}, a.setStrokeColor = function() {}, a.setFillColor = function() {}, a.setGradient = function() {}, a.setDashed = function() {}, a.text = function() {});
  return a;
};
mxShape.prototype.createSvgCanvas = function() {
  var a = new mxSvgCanvas2D(this.node, !1);
  a.strokeTolerance = this.svgStrokeTolerance;
  a.pointerEventsValue = this.svgPointerEvents;
  var b = this.getSvgScreenOffset();
  0 != b ? this.node.setAttribute('transform', 'translate(' + b + ',' + b + ')') : this.node.removeAttribute('transform');
  a.minStrokeWidth = this.minSvgStrokeWidth;
  this.antiAlias || (a.format = function(c) {
    return Math.round(parseFloat(c));
  });
  return a;
};
mxShape.prototype.redrawHtmlShape = function() {
  this.updateHtmlBounds(this.node);
  this.updateHtmlFilters(this.node);
  this.updateHtmlColors(this.node);
};
mxShape.prototype.updateHtmlFilters = function(a) {
  var b = '';
  100 > this.opacity && (b += 'alpha(opacity=' + this.opacity + ')');
  this.isShadow && (b += 'progid:DXImageTransform.Microsoft.dropShadow (OffX=\'' + Math.round(mxConstants.SHADOW_OFFSET_X * this.scale) + '\', OffY=\'' + Math.round(mxConstants.SHADOW_OFFSET_Y * this.scale) + '\', Color=\'' + mxConstants.VML_SHADOWCOLOR + '\')');
  if (null != this.fill && this.fill != mxConstants.NONE && this.gradient && this.gradient != mxConstants.NONE) {
    var c = this.fill,
      d = this.gradient,
      e = '0',
      f = {
        east: 0,
        south: 1,
        west: 2,
        north: 3
      },
      g = null != this.direction ? f[this.direction] : 0;
    null != this.gradientDirection && (g = mxUtils.mod(g + f[this.gradientDirection] - 1, 4));
    1 == g ? (e = '1', f = c, c = d, d = f) : 2 == g ? (f = c, c = d, d = f) : 3 == g && (e = '1');
    b += 'progid:DXImageTransform.Microsoft.gradient(startColorStr=\'' + c + '\', endColorStr=\'' + d + '\', gradientType=\'' + e + '\')';
  }
  a.style.filter = b;
};
mxShape.prototype.updateHtmlColors = function(a) {
  var b = this.stroke;
  null != b && b != mxConstants.NONE ? (a.style.borderColor = b, this.isDashed ? a.style.borderStyle = 'dashed' : 0 < this.strokewidth && (a.style.borderStyle = 'solid'), a.style.borderWidth = Math.max(1, Math.ceil(this.strokewidth * this.scale)) + 'px') : a.style.borderWidth = '0px';
  b = this.outline ? null : this.fill;
  null != b && b != mxConstants.NONE ? (a.style.backgroundColor = b, a.style.backgroundImage = 'none') : this.pointerEvents ? a.style.backgroundColor = 'transparent' : 8 == document.documentMode ? mxUtils.addTransparentBackgroundFilter(a) : this.setTransparentBackgroundImage(a);
};
mxShape.prototype.updateHtmlBounds = function(a) {
  var b = 9 <= document.documentMode ? 0 : Math.ceil(this.strokewidth * this.scale);
  a.style.borderWidth = Math.max(1, b) + 'px';
  a.style.overflow = 'hidden';
  a.style.left = Math.round(this.bounds.x - b / 2) + 'px';
  a.style.top = Math.round(this.bounds.y - b / 2) + 'px';
  'CSS1Compat' == document.compatMode && (b = -b);
  a.style.width = Math.round(Math.max(0, this.bounds.width + b)) + 'px';
  a.style.height = Math.round(Math.max(0, this.bounds.height + b)) + 'px';
};
mxShape.prototype.destroyCanvas = function(a) {
  if (a instanceof mxSvgCanvas2D) {
    for (var b in a.gradients) {
      var c = a.gradients[b];
      null != c && (c.mxRefCount = (c.mxRefCount || 0) + 1);
    }
    for (b in a.fillPatterns)
      c = a.fillPatterns[b], null != c && (c.mxRefCount = (c.mxRefCount || 0) + 1);
    this.releaseSvgGradients(this.oldGradients);
    this.releaseSvgFillPatterns(this.oldFillPatterns);
    this.oldGradients = a.gradients;
    this.oldFillPatterns = a.fillPatterns;
  }
};
mxShape.prototype.beforePaint = function(a) {};
mxShape.prototype.afterPaint = function(a) {};
mxShape.prototype.paint = function(a) {
  var b = !1;
  if (null != a && this.outline) {
    var c = a.stroke;
    a.stroke = function() {
      b = !0;
      c.apply(this, arguments);
    };
    var d = a.fillAndStroke;
    a.fillAndStroke = function() {
      b = !0;
      d.apply(this, arguments);
    };
  }
  var e = this.scale,
    f = this.bounds.x / e,
    g = this.bounds.y / e,
    k = this.bounds.width / e,
    l = this.bounds.height / e;
  if (this.isPaintBoundsInverted()) {
    var m = (k - l) / 2;
    f += m;
    g -= m;
    m = k;
    k = l;
    l = m;
  }
  this.updateTransform(a, f, g, k, l);
  this.configureCanvas(a, f, g, k, l);
  m = null;
  if (null == this.stencil && null == this.points && this.shapePointerEvents || null != this.stencil && this.stencilPointerEvents) {
    var n = this.createBoundingBox();
    this.dialect == mxConstants.DIALECT_SVG ? (m = this.createTransparentSvgRectangle(n.x, n.y, n.width, n.height), this.node.appendChild(m)) : (e = a.createRect('rect', n.x / e, n.y / e, n.width / e, n.height / e), e.appendChild(a.createTransparentFill()), e.stroked = 'false', a.root.appendChild(e));
  }
  null != this.stencil ? this.stencil.drawShape(a, this, f, g, k, l) : (a.setStrokeWidth(this.strokewidth), e = this.getWaypoints(), null != e ? 1 < e.length && this.paintEdgeShape(a, e) : this.paintVertexShape(a, f, g, k, l));
  null != m && null != a.state && null != a.state.transform && m.setAttribute('transform', a.state.transform);
  null != a && this.outline && !b && (a.rect(f, g, k, l), a.stroke());
};
mxShape.prototype.getWaypoints = function() {
  var a = this.points,
    b = null;
  if (null != a && (b = [], 0 < a.length)) {
    var c = this.scale,
      d = Math.max(c, 1),
      e = a[0];
    b.push(new mxPoint(e.x / c, e.y / c));
    for (var f = 1; f < a.length; f++) {
      var g = a[f];
      (Math.abs(e.x - g.x) >= d || Math.abs(e.y - g.y) >= d) && b.push(new mxPoint(g.x / c, g.y / c));
      e = g;
    }
  }
  return b;
};
mxShape.prototype.configureCanvas = function(a, b, c, d, e) {
  var f = null;
  null != this.style && (f = this.style.dashPattern);
  a.setAlpha(this.opacity / 100);
  a.setFillAlpha(this.fillOpacity / 100);
  a.setStrokeAlpha(this.strokeOpacity / 100);
  null != this.isShadow && a.setShadow(this.isShadow);
  null != this.isDashed && a.setDashed(this.isDashed, null != this.style ? 1 == mxUtils.getValue(this.style, mxConstants.STYLE_FIX_DASH, !1) : !1);
  null != f && a.setDashPattern(f);
  null != this.fill && this.fill != mxConstants.NONE && this.gradient && this.gradient != mxConstants.NONE ? (b = this.getGradientBounds(a, b, c, d, e), a.setGradient(this.fill, this.gradient, b.x, b.y, b.width, b.height, this.gradientDirection)) : (a.setFillColor(this.fill), a.setFillStyle(this.fillStyle));
  a.setStrokeColor(this.stroke);
  this.configurePointerEvents(a);
};
mxShape.prototype.configurePointerEvents = function(a) {
  null == this.style || null != this.fill && this.fill != mxConstants.NONE && 0 != this.opacity && 0 != this.fillOpacity || '0' != mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1') || (a.pointerEvents = !1);
};
mxShape.prototype.getGradientBounds = function(a, b, c, d, e) {
  return new mxRectangle(b, c, d, e);
};
mxShape.prototype.updateTransform = function(a, b, c, d, e) {
  a.scale(this.scale);
  a.rotate(this.getShapeRotation(), this.flipH, this.flipV, b + d / 2, c + e / 2);
};
mxShape.prototype.paintVertexShape = function(a, b, c, d, e) {
  this.paintBackground(a, b, c, d, e);
  this.outline && null != this.style && 0 != mxUtils.getValue(this.style, mxConstants.STYLE_BACKGROUND_OUTLINE, 0) || (a.setShadow(!1), this.paintForeground(a, b, c, d, e));
};
mxShape.prototype.paintBackground = function(a, b, c, d, e) {};
mxShape.prototype.paintForeground = function(a, b, c, d, e) {};
mxShape.prototype.paintEdgeShape = function(a, b) {};
mxShape.prototype.getArcSize = function(a, b) {
  if ('1' == mxUtils.getValue(this.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0))
    a = Math.min(a / 2, Math.min(b / 2, mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2));
  else {
    var c = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, 100 * mxConstants.RECTANGLE_ROUNDING_FACTOR) / 100;
    a = Math.min(a * c, b * c);
  }
  return a;
};
mxShape.prototype.paintGlassEffect = function(a, b, c, d, e, f) {
  var g = Math.ceil(this.strokewidth / 2);
  a.setGradient('#ffffff', '#ffffff', b, c, d, 0.6 * e, 'south', 0.9, 0.1);
  a.begin();
  f += 2 * g;
  this.isRounded ? (a.moveTo(b - g + f, c - g), a.quadTo(b - g, c - g, b - g, c - g + f), a.lineTo(b - g, c + 0.4 * e), a.quadTo(b + 0.5 * d, c + 0.7 * e, b + d + g, c + 0.4 * e), a.lineTo(b + d + g, c - g + f), a.quadTo(b + d + g, c - g, b + d + g - f, c - g)) : (a.moveTo(b - g, c - g), a.lineTo(b - g, c + 0.4 * e), a.quadTo(b + 0.5 * d, c + 0.7 * e, b + d + g, c + 0.4 * e), a.lineTo(b + d + g, c - g));
  a.close();
  a.fill();
};
mxShape.prototype.addPoints = function(a, b, c, d, e, f, g) {
  if (null != b && 0 < b.length) {
    g = null != g ? g : !0;
    var k = b[b.length - 1];
    if (e && c) {
      b = b.slice();
      var l = b[0];
      l = new mxPoint(k.x + (l.x - k.x) / 2, k.y + (l.y - k.y) / 2);
      b.splice(0, 0, l);
    }
    var m = b[0];
    l = 1;
    for (g ? a.moveTo(m.x, m.y) : a.lineTo(m.x, m.y); l < (e ? b.length : b.length - 1);) {
      g = b[mxUtils.mod(l, b.length)];
      var n = m.x - g.x;
      m = m.y - g.y;
      if (c && (0 != n || 0 != m) && (null == f || 0 > mxUtils.indexOf(f, l - 1))) {
        var p = Math.sqrt(n * n + m * m);
        a.lineTo(g.x + n * Math.min(d, p / 2) / p, g.y + m * Math.min(d, p / 2) / p);
        for (m = b[mxUtils.mod(l + 1, b.length)]; l < b.length - 2 && 0 == Math.round(m.x - g.x) && 0 == Math.round(m.y - g.y);)
          m = b[mxUtils.mod(l + 2, b.length)], l++;
        n = m.x - g.x;
        m = m.y - g.y;
        p = Math.max(1, Math.sqrt(n * n + m * m));
        n = g.x + n * Math.min(d, p / 2) / p;
        m = g.y + m * Math.min(d, p / 2) / p;
        a.quadTo(g.x, g.y, n, m);
        g = new mxPoint(n, m);
      } else
        a.lineTo(g.x, g.y);
      m = g;
      l++;
    }
    e ? a.close() : a.lineTo(k.x, k.y);
  }
};
mxShape.prototype.resetStyles = function() {
  this.initStyles();
  this.spacing = 0;
  delete this.fill;
  delete this.gradient;
  delete this.gradientDirection;
  delete this.stroke;
  delete this.startSize;
  delete this.endSize;
  delete this.startArrow;
  delete this.endArrow;
  delete this.direction;
  delete this.isShadow;
  delete this.isDashed;
  delete this.isRounded;
  delete this.glass;
};
mxShape.prototype.apply = function(a) {
  this.state = a;
  this.style = a.style;
  if (null != this.style) {
    this.fill = mxUtils.getValue(this.style, mxConstants.STYLE_FILLCOLOR, this.fill);
    this.gradient = mxUtils.getValue(this.style, mxConstants.STYLE_GRADIENTCOLOR, this.gradient);
    this.gradientDirection = mxUtils.getValue(this.style, mxConstants.STYLE_GRADIENT_DIRECTION, this.gradientDirection);
    this.opacity = mxUtils.getValue(this.style, mxConstants.STYLE_OPACITY, this.opacity);
    this.fillOpacity = mxUtils.getValue(this.style, mxConstants.STYLE_FILL_OPACITY, this.fillOpacity);
    this.fillStyle = mxUtils.getValue(this.style, mxConstants.STYLE_FILL_STYLE, this.fillStyle);
    this.strokeOpacity = mxUtils.getValue(this.style, mxConstants.STYLE_STROKE_OPACITY, this.strokeOpacity);
    this.stroke = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, this.stroke);
    this.strokewidth = mxUtils.getNumber(this.style, mxConstants.STYLE_STROKEWIDTH, this.strokewidth);
    this.spacing = mxUtils.getValue(this.style, mxConstants.STYLE_SPACING, this.spacing);
    this.startSize = mxUtils.getNumber(this.style, mxConstants.STYLE_STARTSIZE, this.startSize);
    this.endSize = mxUtils.getNumber(this.style, mxConstants.STYLE_ENDSIZE, this.endSize);
    this.startArrow = mxUtils.getValue(this.style, mxConstants.STYLE_STARTARROW, this.startArrow);
    this.endArrow = mxUtils.getValue(this.style, mxConstants.STYLE_ENDARROW, this.endArrow);
    this.rotation = mxUtils.getValue(this.style, mxConstants.STYLE_ROTATION, this.rotation);
    this.direction = mxUtils.getValue(this.style, mxConstants.STYLE_DIRECTION, this.direction);
    this.flipH = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_FLIPH, 0);
    this.flipV = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_FLIPV, 0);
    null != this.stencil && (this.flipH = 1 == mxUtils.getValue(this.style, 'stencilFlipH', 0) || this.flipH, this.flipV = 1 == mxUtils.getValue(this.style, 'stencilFlipV', 0) || this.flipV);
    if (this.direction == mxConstants.DIRECTION_NORTH || this.direction == mxConstants.DIRECTION_SOUTH)
      a = this.flipH, this.flipH = this.flipV, this.flipV = a;
    this.isShadow = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_SHADOW, this.isShadow);
    this.isDashed = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_DASHED, this.isDashed);
    this.isRounded = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_ROUNDED, this.isRounded);
    this.glass = 1 == mxUtils.getValue(this.style, mxConstants.STYLE_GLASS, this.glass);
    this.fill == mxConstants.NONE && (this.fill = null);
    this.gradient == mxConstants.NONE && (this.gradient = null);
    this.stroke == mxConstants.NONE && (this.stroke = null);
  }
};
mxShape.prototype.setCursor = function(a) {
  null == a && (a = '');
  this.cursor = a;
  null != this.node && (this.node.style.cursor = a);
};
mxShape.prototype.getCursor = function() {
  return this.cursor;
};
mxShape.prototype.isRoundable = function() {
  return !1;
};
mxShape.prototype.updateBoundingBox = function() {
  if (this.useSvgBoundingBox && null != this.node && null != this.node.ownerSVGElement)
    try {
      var a = this.node.getBBox();
      if (0 < a.width && 0 < a.height) {
        this.boundingBox = new mxRectangle(a.x, a.y, a.width, a.height);
        this.boundingBox.grow(this.strokewidth * this.scale / 2);
        return;
      }
    } catch (c) {}
  if (null != this.bounds) {
    a = this.createBoundingBox();
    if (null != a) {
      this.augmentBoundingBox(a);
      var b = this.getShapeRotation();
      0 != b && (a = mxUtils.getBoundingBox(a, b));
    }
    this.boundingBox = a;
  }
};
mxShape.prototype.createBoundingBox = function() {
  var a = this.bounds.clone();
  (null != this.stencil && (this.direction == mxConstants.DIRECTION_NORTH || this.direction == mxConstants.DIRECTION_SOUTH) || this.isPaintBoundsInverted()) && a.rotate90();
  return a;
};
mxShape.prototype.augmentBoundingBox = function(a) {
  this.isShadow && (a.width += Math.ceil(mxConstants.SHADOW_OFFSET_X * this.scale), a.height += Math.ceil(mxConstants.SHADOW_OFFSET_Y * this.scale));
  a.grow(this.strokewidth * this.scale / 2);
};
mxShape.prototype.isPaintBoundsInverted = function() {
  return null == this.stencil && (this.direction == mxConstants.DIRECTION_NORTH || this.direction == mxConstants.DIRECTION_SOUTH);
};
mxShape.prototype.getRotation = function() {
  return null != this.rotation ? this.rotation : 0;
};
mxShape.prototype.getTextRotation = function() {
  var a = this.getRotation();
  1 != mxUtils.getValue(this.style, mxConstants.STYLE_HORIZONTAL, 1) && (a += mxText.prototype.verticalTextRotation);
  return a;
};
mxShape.prototype.getShapeRotation = function() {
  var a = this.getRotation();
  null != this.direction && (this.direction == mxConstants.DIRECTION_NORTH ? a += 270 : this.direction == mxConstants.DIRECTION_WEST ? a += 180 : this.direction == mxConstants.DIRECTION_SOUTH && (a += 90));
  return a;
};
mxShape.prototype.createTransparentSvgRectangle = function(a, b, c, d) {
  var e = document.createElementNS(mxConstants.NS_SVG, 'rect');
  e.setAttribute('x', a);
  e.setAttribute('y', b);
  e.setAttribute('width', c);
  e.setAttribute('height', d);
  e.setAttribute('fill', 'none');
  e.setAttribute('stroke', 'none');
  e.setAttribute('pointer-events', 'all');
  return e;
};
mxShape.prototype.setTransparentBackgroundImage = function(a) {
  a.style.backgroundImage = 'url(\'' + mxClient.imageBasePath + '/transparent.gif\')';
};
mxShape.prototype.intersectsRectangle = function(a, b) {
  return null != a && (b || null != this.node && 'none' != this.node.style.display && 'hidden' != this.node.style.visibility) && mxUtils.intersects(this.bounds, a);
};
mxShape.prototype.releaseSvgGradients = function(a) {
  if (null != a)
    for (var b in a) {
      var c = a[b];
      null != c && (c.mxRefCount = (c.mxRefCount || 0) - 1, 0 == c.mxRefCount && null != c.parentNode && c.parentNode.removeChild(c));
    }
};
mxShape.prototype.releaseSvgFillPatterns = function(a) {
  if (null != a)
    for (var b in a) {
      var c = a[b];
      null != c && (c.mxRefCount = (c.mxRefCount || 0) - 1, 0 == c.mxRefCount && null != c.parentNode && c.parentNode.removeChild(c));
    }
};
mxShape.prototype.destroy = function() {
  null != this.node && (mxEvent.release(this.node), null != this.node.parentNode && this.node.parentNode.removeChild(this.node), this.node = null);
  this.releaseSvgGradients(this.oldGradients);
  this.releaseSvgFillPatterns(this.oldFillPatterns);
  this.oldFillPatterns = this.oldGradients = null;
};