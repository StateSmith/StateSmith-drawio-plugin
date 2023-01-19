function mxXmlCanvas2D(a) {
  mxAbstractCanvas2D.call(this);
  this.root = a;
  this.writeDefaults();
}
mxUtils.extend(mxXmlCanvas2D, mxAbstractCanvas2D);
mxXmlCanvas2D.prototype.textEnabled = !0;
mxXmlCanvas2D.prototype.compressed = !0;
mxXmlCanvas2D.prototype.writeDefaults = function() {
  var a = this.createElement('fontfamily');
  a.setAttribute('family', mxConstants.DEFAULT_FONTFAMILY);
  this.root.appendChild(a);
  a = this.createElement('fontsize');
  a.setAttribute('size', mxConstants.DEFAULT_FONTSIZE);
  this.root.appendChild(a);
  a = this.createElement('shadowcolor');
  a.setAttribute('color', mxConstants.SHADOWCOLOR);
  this.root.appendChild(a);
  a = this.createElement('shadowalpha');
  a.setAttribute('alpha', mxConstants.SHADOW_OPACITY);
  this.root.appendChild(a);
  a = this.createElement('shadowoffset');
  a.setAttribute('dx', mxConstants.SHADOW_OFFSET_X);
  a.setAttribute('dy', mxConstants.SHADOW_OFFSET_Y);
  this.root.appendChild(a);
};
mxXmlCanvas2D.prototype.format = function(a) {
  return parseFloat(parseFloat(a).toFixed(2));
};
mxXmlCanvas2D.prototype.createElement = function(a) {
  return this.root.ownerDocument.createElement(a);
};
mxXmlCanvas2D.prototype.save = function() {
  this.compressed && mxAbstractCanvas2D.prototype.save.apply(this, arguments);
  this.root.appendChild(this.createElement('save'));
};
mxXmlCanvas2D.prototype.restore = function() {
  this.compressed && mxAbstractCanvas2D.prototype.restore.apply(this, arguments);
  this.root.appendChild(this.createElement('restore'));
};
mxXmlCanvas2D.prototype.scale = function(a) {
  var b = this.createElement('scale');
  b.setAttribute('scale', a);
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.translate = function(a, b) {
  var c = this.createElement('translate');
  c.setAttribute('dx', this.format(a));
  c.setAttribute('dy', this.format(b));
  this.root.appendChild(c);
};
mxXmlCanvas2D.prototype.rotate = function(a, b, c, d, e) {
  var f = this.createElement('rotate');
  if (0 != a || b || c)
    f.setAttribute('theta', this.format(a)), f.setAttribute('flipH', b ? '1' : '0'), f.setAttribute('flipV', c ? '1' : '0'), f.setAttribute('cx', this.format(d)), f.setAttribute('cy', this.format(e)), this.root.appendChild(f);
};
mxXmlCanvas2D.prototype.setAlpha = function(a) {
  if (this.compressed) {
    if (this.state.alpha == a)
      return;
    mxAbstractCanvas2D.prototype.setAlpha.apply(this, arguments);
  }
  var b = this.createElement('alpha');
  b.setAttribute('alpha', this.format(a));
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setFillAlpha = function(a) {
  if (this.compressed) {
    if (this.state.fillAlpha == a)
      return;
    mxAbstractCanvas2D.prototype.setFillAlpha.apply(this, arguments);
  }
  var b = this.createElement('fillalpha');
  b.setAttribute('alpha', this.format(a));
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setStrokeAlpha = function(a) {
  if (this.compressed) {
    if (this.state.strokeAlpha == a)
      return;
    mxAbstractCanvas2D.prototype.setStrokeAlpha.apply(this, arguments);
  }
  var b = this.createElement('strokealpha');
  b.setAttribute('alpha', this.format(a));
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setFillColor = function(a) {
  a == mxConstants.NONE && (a = null);
  if (this.compressed) {
    if (this.state.fillColor == a)
      return;
    mxAbstractCanvas2D.prototype.setFillColor.apply(this, arguments);
  }
  var b = this.createElement('fillcolor');
  b.setAttribute('color', null != a ? a : mxConstants.NONE);
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setGradient = function(a, b, c, d, e, f, g, k, l) {
  if (null != a && null != b) {
    mxAbstractCanvas2D.prototype.setGradient.apply(this, arguments);
    var m = this.createElement('gradient');
    m.setAttribute('c1', a);
    m.setAttribute('c2', b);
    m.setAttribute('x', this.format(c));
    m.setAttribute('y', this.format(d));
    m.setAttribute('w', this.format(e));
    m.setAttribute('h', this.format(f));
    null != g && m.setAttribute('direction', g);
    null != k && m.setAttribute('alpha1', k);
    null != l && m.setAttribute('alpha2', l);
    this.root.appendChild(m);
  }
};
mxXmlCanvas2D.prototype.setStrokeColor = function(a) {
  a == mxConstants.NONE && (a = null);
  if (this.compressed) {
    if (this.state.strokeColor == a)
      return;
    mxAbstractCanvas2D.prototype.setStrokeColor.apply(this, arguments);
  }
  var b = this.createElement('strokecolor');
  b.setAttribute('color', null != a ? a : mxConstants.NONE);
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setStrokeWidth = function(a) {
  if (this.compressed) {
    if (this.state.strokeWidth == a)
      return;
    mxAbstractCanvas2D.prototype.setStrokeWidth.apply(this, arguments);
  }
  var b = this.createElement('strokewidth');
  b.setAttribute('width', this.format(a));
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setDashed = function(a, b) {
  if (this.compressed) {
    if (this.state.dashed == a)
      return;
    mxAbstractCanvas2D.prototype.setDashed.apply(this, arguments);
  }
  var c = this.createElement('dashed');
  c.setAttribute('dashed', a ? '1' : '0');
  null != b && c.setAttribute('fixDash', b ? '1' : '0');
  this.root.appendChild(c);
};
mxXmlCanvas2D.prototype.setDashPattern = function(a) {
  if (this.compressed) {
    if (this.state.dashPattern == a)
      return;
    mxAbstractCanvas2D.prototype.setDashPattern.apply(this, arguments);
  }
  var b = this.createElement('dashpattern');
  b.setAttribute('pattern', a);
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setLineCap = function(a) {
  if (this.compressed) {
    if (this.state.lineCap == a)
      return;
    mxAbstractCanvas2D.prototype.setLineCap.apply(this, arguments);
  }
  var b = this.createElement('linecap');
  b.setAttribute('cap', a);
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setLineJoin = function(a) {
  if (this.compressed) {
    if (this.state.lineJoin == a)
      return;
    mxAbstractCanvas2D.prototype.setLineJoin.apply(this, arguments);
  }
  var b = this.createElement('linejoin');
  b.setAttribute('join', a);
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setMiterLimit = function(a) {
  if (this.compressed) {
    if (this.state.miterLimit == a)
      return;
    mxAbstractCanvas2D.prototype.setMiterLimit.apply(this, arguments);
  }
  var b = this.createElement('miterlimit');
  b.setAttribute('limit', a);
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setFontColor = function(a) {
  if (this.textEnabled) {
    a == mxConstants.NONE && (a = null);
    if (this.compressed) {
      if (this.state.fontColor == a)
        return;
      mxAbstractCanvas2D.prototype.setFontColor.apply(this, arguments);
    }
    var b = this.createElement('fontcolor');
    b.setAttribute('color', null != a ? a : mxConstants.NONE);
    this.root.appendChild(b);
  }
};
mxXmlCanvas2D.prototype.setFontBackgroundColor = function(a) {
  if (this.textEnabled) {
    a == mxConstants.NONE && (a = null);
    if (this.compressed) {
      if (this.state.fontBackgroundColor == a)
        return;
      mxAbstractCanvas2D.prototype.setFontBackgroundColor.apply(this, arguments);
    }
    var b = this.createElement('fontbackgroundcolor');
    b.setAttribute('color', null != a ? a : mxConstants.NONE);
    this.root.appendChild(b);
  }
};
mxXmlCanvas2D.prototype.setFontBorderColor = function(a) {
  if (this.textEnabled) {
    a == mxConstants.NONE && (a = null);
    if (this.compressed) {
      if (this.state.fontBorderColor == a)
        return;
      mxAbstractCanvas2D.prototype.setFontBorderColor.apply(this, arguments);
    }
    var b = this.createElement('fontbordercolor');
    b.setAttribute('color', null != a ? a : mxConstants.NONE);
    this.root.appendChild(b);
  }
};
mxXmlCanvas2D.prototype.setFontSize = function(a) {
  if (this.textEnabled) {
    if (this.compressed) {
      if (this.state.fontSize == a)
        return;
      mxAbstractCanvas2D.prototype.setFontSize.apply(this, arguments);
    }
    var b = this.createElement('fontsize');
    b.setAttribute('size', a);
    this.root.appendChild(b);
  }
};
mxXmlCanvas2D.prototype.setFontFamily = function(a) {
  if (this.textEnabled) {
    if (this.compressed) {
      if (this.state.fontFamily == a)
        return;
      mxAbstractCanvas2D.prototype.setFontFamily.apply(this, arguments);
    }
    var b = this.createElement('fontfamily');
    b.setAttribute('family', a);
    this.root.appendChild(b);
  }
};
mxXmlCanvas2D.prototype.setFontStyle = function(a) {
  if (this.textEnabled) {
    null == a && (a = 0);
    if (this.compressed) {
      if (this.state.fontStyle == a)
        return;
      mxAbstractCanvas2D.prototype.setFontStyle.apply(this, arguments);
    }
    var b = this.createElement('fontstyle');
    b.setAttribute('style', a);
    this.root.appendChild(b);
  }
};
mxXmlCanvas2D.prototype.setShadow = function(a) {
  if (this.compressed) {
    if (this.state.shadow == a)
      return;
    mxAbstractCanvas2D.prototype.setShadow.apply(this, arguments);
  }
  var b = this.createElement('shadow');
  b.setAttribute('enabled', a ? '1' : '0');
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setShadowColor = function(a) {
  if (this.compressed) {
    a == mxConstants.NONE && (a = null);
    if (this.state.shadowColor == a)
      return;
    mxAbstractCanvas2D.prototype.setShadowColor.apply(this, arguments);
  }
  var b = this.createElement('shadowcolor');
  b.setAttribute('color', null != a ? a : mxConstants.NONE);
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setShadowAlpha = function(a) {
  if (this.compressed) {
    if (this.state.shadowAlpha == a)
      return;
    mxAbstractCanvas2D.prototype.setShadowAlpha.apply(this, arguments);
  }
  var b = this.createElement('shadowalpha');
  b.setAttribute('alpha', a);
  this.root.appendChild(b);
};
mxXmlCanvas2D.prototype.setShadowOffset = function(a, b) {
  if (this.compressed) {
    if (this.state.shadowDx == a && this.state.shadowDy == b)
      return;
    mxAbstractCanvas2D.prototype.setShadowOffset.apply(this, arguments);
  }
  var c = this.createElement('shadowoffset');
  c.setAttribute('dx', a);
  c.setAttribute('dy', b);
  this.root.appendChild(c);
};
mxXmlCanvas2D.prototype.rect = function(a, b, c, d) {
  var e = this.createElement('rect');
  e.setAttribute('x', this.format(a));
  e.setAttribute('y', this.format(b));
  e.setAttribute('w', this.format(c));
  e.setAttribute('h', this.format(d));
  this.root.appendChild(e);
};
mxXmlCanvas2D.prototype.roundrect = function(a, b, c, d, e, f) {
  var g = this.createElement('roundrect');
  g.setAttribute('x', this.format(a));
  g.setAttribute('y', this.format(b));
  g.setAttribute('w', this.format(c));
  g.setAttribute('h', this.format(d));
  g.setAttribute('dx', this.format(e));
  g.setAttribute('dy', this.format(f));
  this.root.appendChild(g);
};
mxXmlCanvas2D.prototype.ellipse = function(a, b, c, d) {
  var e = this.createElement('ellipse');
  e.setAttribute('x', this.format(a));
  e.setAttribute('y', this.format(b));
  e.setAttribute('w', this.format(c));
  e.setAttribute('h', this.format(d));
  this.root.appendChild(e);
};
mxXmlCanvas2D.prototype.image = function(a, b, c, d, e, f, g, k) {
  e = this.converter.convert(e);
  var l = this.createElement('image');
  l.setAttribute('x', this.format(a));
  l.setAttribute('y', this.format(b));
  l.setAttribute('w', this.format(c));
  l.setAttribute('h', this.format(d));
  l.setAttribute('src', e);
  l.setAttribute('aspect', f ? '1' : '0');
  l.setAttribute('flipH', g ? '1' : '0');
  l.setAttribute('flipV', k ? '1' : '0');
  this.root.appendChild(l);
};
mxXmlCanvas2D.prototype.begin = function() {
  this.root.appendChild(this.createElement('begin'));
  this.lastY = this.lastX = 0;
};
mxXmlCanvas2D.prototype.moveTo = function(a, b) {
  var c = this.createElement('move');
  c.setAttribute('x', this.format(a));
  c.setAttribute('y', this.format(b));
  this.root.appendChild(c);
  this.lastX = a;
  this.lastY = b;
};
mxXmlCanvas2D.prototype.lineTo = function(a, b) {
  var c = this.createElement('line');
  c.setAttribute('x', this.format(a));
  c.setAttribute('y', this.format(b));
  this.root.appendChild(c);
  this.lastX = a;
  this.lastY = b;
};
mxXmlCanvas2D.prototype.quadTo = function(a, b, c, d) {
  var e = this.createElement('quad');
  e.setAttribute('x1', this.format(a));
  e.setAttribute('y1', this.format(b));
  e.setAttribute('x2', this.format(c));
  e.setAttribute('y2', this.format(d));
  this.root.appendChild(e);
  this.lastX = c;
  this.lastY = d;
};
mxXmlCanvas2D.prototype.curveTo = function(a, b, c, d, e, f) {
  var g = this.createElement('curve');
  g.setAttribute('x1', this.format(a));
  g.setAttribute('y1', this.format(b));
  g.setAttribute('x2', this.format(c));
  g.setAttribute('y2', this.format(d));
  g.setAttribute('x3', this.format(e));
  g.setAttribute('y3', this.format(f));
  this.root.appendChild(g);
  this.lastX = e;
  this.lastY = f;
};
mxXmlCanvas2D.prototype.close = function() {
  this.root.appendChild(this.createElement('close'));
};
mxXmlCanvas2D.prototype.text = function(a, b, c, d, e, f, g, k, l, m, n, p, r) {
  if (this.textEnabled && null != e) {
    mxUtils.isNode(e) && (e = mxUtils.getOuterHtml(e));
    var q = this.createElement('text');
    q.setAttribute('x', this.format(a));
    q.setAttribute('y', this.format(b));
    q.setAttribute('w', this.format(c));
    q.setAttribute('h', this.format(d));
    q.setAttribute('str', e);
    null != f && q.setAttribute('align', f);
    null != g && q.setAttribute('valign', g);
    q.setAttribute('wrap', k ? '1' : '0');
    null == l && (l = '');
    q.setAttribute('format', l);
    null != m && q.setAttribute('overflow', m);
    null != n && q.setAttribute('clip', n ? '1' : '0');
    null != p && q.setAttribute('rotation', p);
    null != r && q.setAttribute('dir', r);
    this.root.appendChild(q);
  }
};
mxXmlCanvas2D.prototype.stroke = function() {
  this.root.appendChild(this.createElement('stroke'));
};
mxXmlCanvas2D.prototype.fill = function() {
  this.root.appendChild(this.createElement('fill'));
};
mxXmlCanvas2D.prototype.fillAndStroke = function() {
  this.root.appendChild(this.createElement('fillstroke'));
};