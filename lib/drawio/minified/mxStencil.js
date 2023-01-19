function mxStencil(a) {
  this.desc = a;
  this.parseDescription();
  this.parseConstraints();
}
mxUtils.extend(mxStencil, mxShape);
mxStencil.defaultLocalized = !1;
mxStencil.allowEval = !1;
mxStencil.prototype.desc = null;
mxStencil.prototype.constraints = null;
mxStencil.prototype.aspect = null;
mxStencil.prototype.w0 = null;
mxStencil.prototype.h0 = null;
mxStencil.prototype.bgNode = null;
mxStencil.prototype.fgNode = null;
mxStencil.prototype.strokewidth = null;
mxStencil.prototype.parseDescription = function() {
  this.fgNode = this.desc.getElementsByTagName('foreground')[0];
  this.bgNode = this.desc.getElementsByTagName('background')[0];
  this.w0 = Number(this.desc.getAttribute('w') || 100);
  this.h0 = Number(this.desc.getAttribute('h') || 100);
  var a = this.desc.getAttribute('aspect');
  this.aspect = null != a ? a : 'variable';
  a = this.desc.getAttribute('strokewidth');
  this.strokewidth = null != a ? a : '1';
};
mxStencil.prototype.parseConstraints = function() {
  var a = this.desc.getElementsByTagName('connections')[0];
  if (null != a && (a = mxUtils.getChildNodes(a), null != a && 0 < a.length)) {
    this.constraints = [];
    for (var b = 0; b < a.length; b++)
      this.constraints.push(this.parseConstraint(a[b]));
  }
};
mxStencil.prototype.parseConstraint = function(a) {
  var b = Number(a.getAttribute('x')),
    c = Number(a.getAttribute('y')),
    d = '1' == a.getAttribute('perimeter');
  a = a.getAttribute('name');
  return new mxConnectionConstraint(new mxPoint(b, c), d, a);
};
mxStencil.prototype.evaluateTextAttribute = function(a, b, c) {
  b = this.evaluateAttribute(a, b, c);
  a = a.getAttribute('localized');
  if (mxStencil.defaultLocalized && null == a || '1' == a)
    b = mxResources.get(b);
  return b;
};
mxStencil.prototype.evaluateAttribute = function(a, b, c) {
  b = a.getAttribute(b);
  null == b && (a = mxUtils.getTextContent(a), null != a && mxStencil.allowEval && (a = mxUtils.eval(a), 'function' == typeof a && (b = a(c))));
  return b;
};
mxStencil.prototype.drawShape = function(a, b, c, d, e, f) {
  var g = a.states.slice(),
    k = mxUtils.getValue(b.style, mxConstants.STYLE_DIRECTION, null);
  k = this.computeAspect(b.style, c, d, e, f, k);
  var l = Math.min(k.width, k.height);
  l = 'inherit' == this.strokewidth ? Number(mxUtils.getNumber(b.style, mxConstants.STYLE_STROKEWIDTH, 1)) : Number(this.strokewidth) * l;
  a.setStrokeWidth(l);
  null != b.style && '1' == mxUtils.getValue(b.style, mxConstants.STYLE_POINTER_EVENTS, '0') && (a.setStrokeColor(mxConstants.NONE), a.rect(c, d, e, f), a.stroke(), a.setStrokeColor(b.stroke));
  this.drawChildren(a, b, c, d, e, f, this.bgNode, k, !1, !0);
  this.drawChildren(a, b, c, d, e, f, this.fgNode, k, !0, !b.outline || null == b.style || 0 == mxUtils.getValue(b.style, mxConstants.STYLE_BACKGROUND_OUTLINE, 0));
  a.states.length != g.length && (a.states = g);
};
mxStencil.prototype.drawChildren = function(a, b, c, d, e, f, g, k, l, m) {
  if (null != g && 0 < e && 0 < f)
    for (c = g.firstChild; null != c;)
      c.nodeType == mxConstants.NODETYPE_ELEMENT && this.drawNode(a, b, c, k, l, m), c = c.nextSibling;
};
mxStencil.prototype.computeAspect = function(a, b, c, d, e, f) {
  a = b;
  b = d / this.w0;
  var g = e / this.h0;
  if (f = f == mxConstants.DIRECTION_NORTH || f == mxConstants.DIRECTION_SOUTH) {
    g = d / this.h0;
    b = e / this.w0;
    var k = (d - e) / 2;
    a += k;
    c -= k;
  }
  'fixed' == this.aspect && (b = g = Math.min(b, g), f ? (a += (e - this.w0 * b) / 2, c += (d - this.h0 * g) / 2) : (a += (d - this.w0 * b) / 2, c += (e - this.h0 * g) / 2));
  return new mxRectangle(a, c, b, g);
};
mxStencil.prototype.parseColor = function(a, b, c, d) {
  'stroke' == d ? d = b.stroke : 'fill' == d && (d = b.fill);
  return d;
};
mxStencil.prototype.drawNode = function(a, b, c, d, e, f) {
  var g = c.nodeName,
    k = d.x,
    l = d.y,
    m = d.width,
    n = d.height,
    p = Math.min(m, n);
  if ('save' == g)
    a.save();
  else if ('restore' == g)
    a.restore();
  else if (f) {
    if ('path' == g) {
      a.begin();
      p = !0;
      if ('1' == c.getAttribute('rounded')) {
        p = !1;
        for (var r = Number(c.getAttribute('arcSize')), q = 0, t = [], u = c.firstChild; null != u;) {
          if (u.nodeType == mxConstants.NODETYPE_ELEMENT) {
            var x = u.nodeName;
            if ('move' == x || 'line' == x)
              'move' != x && 0 != t.length || t.push([]), t[t.length - 1].push(new mxPoint(k + Number(u.getAttribute('x')) * m, l + Number(u.getAttribute('y')) * n)), q++;
            else {
              p = !0;
              break;
            }
          }
          u = u.nextSibling;
        }
        if (!p && 0 < q)
          for (m = 0; m < t.length; m++)
            n = !1, l = t[m][0], k = t[m][t[m].length - 1], l.x == k.x && l.y == k.y && (t[m].pop(), n = !0), this.addPoints(a, t[m], !0, r, n);
        else
          p = !0;
      }
      if (p)
        for (u = c.firstChild; null != u;)
          u.nodeType == mxConstants.NODETYPE_ELEMENT && this.drawNode(a, b, u, d, e, f), u = u.nextSibling;
    } else if ('close' == g)
      a.close();
    else if ('move' == g)
      a.moveTo(k + Number(c.getAttribute('x')) * m, l + Number(c.getAttribute('y')) * n);
    else if ('line' == g)
      a.lineTo(k + Number(c.getAttribute('x')) * m, l + Number(c.getAttribute('y')) * n);
    else if ('quad' == g)
      a.quadTo(k + Number(c.getAttribute('x1')) * m, l + Number(c.getAttribute('y1')) * n, k + Number(c.getAttribute('x2')) * m, l + Number(c.getAttribute('y2')) * n);
    else if ('curve' == g)
      a.curveTo(k + Number(c.getAttribute('x1')) * m, l + Number(c.getAttribute('y1')) * n, k + Number(c.getAttribute('x2')) * m, l + Number(c.getAttribute('y2')) * n, k + Number(c.getAttribute('x3')) * m, l + Number(c.getAttribute('y3')) * n);
    else if ('arc' == g)
      a.arcTo(Number(c.getAttribute('rx')) * m, Number(c.getAttribute('ry')) * n, Number(c.getAttribute('x-axis-rotation')), Number(c.getAttribute('large-arc-flag')), Number(c.getAttribute('sweep-flag')), k + Number(c.getAttribute('x')) * m, l + Number(c.getAttribute('y')) * n);
    else if ('rect' == g)
      a.rect(k + Number(c.getAttribute('x')) * m, l + Number(c.getAttribute('y')) * n, Number(c.getAttribute('w')) * m, Number(c.getAttribute('h')) * n);
    else if ('roundrect' == g)
      b = Number(c.getAttribute('arcsize')), 0 == b && (b = 100 * mxConstants.RECTANGLE_ROUNDING_FACTOR), d = Number(c.getAttribute('w')) * m, f = Number(c.getAttribute('h')) * n, b = Number(b) / 100, b = Math.min(d * b, f * b), a.roundrect(k + Number(c.getAttribute('x')) * m, l + Number(c.getAttribute('y')) * n, d, f, b, b);
    else if ('ellipse' == g)
      a.ellipse(k + Number(c.getAttribute('x')) * m, l + Number(c.getAttribute('y')) * n, Number(c.getAttribute('w')) * m, Number(c.getAttribute('h')) * n);
    else if ('image' == g)
      b.outline || (b = this.evaluateAttribute(c, 'src', b), a.image(k + Number(c.getAttribute('x')) * m, l + Number(c.getAttribute('y')) * n, Number(c.getAttribute('w')) * m, Number(c.getAttribute('h')) * n, b, !1, '1' == c.getAttribute('flipH'), '1' == c.getAttribute('flipV')));
    else if ('text' == g)
      b.outline || (d = this.evaluateTextAttribute(c, 'str', b), f = '1' == c.getAttribute('vertical') ? -90 : 0, '0' == c.getAttribute('align-shape') && (p = b.rotation, r = 1 == mxUtils.getValue(b.style, mxConstants.STYLE_FLIPH, 0), b = 1 == mxUtils.getValue(b.style, mxConstants.STYLE_FLIPV, 0), f = r && b ? f - p : r || b ? f + p : f - p), f -= c.getAttribute('rotation'), a.text(k + Number(c.getAttribute('x')) * m, l + Number(c.getAttribute('y')) * n, 0, 0, d, c.getAttribute('align') || 'left', c.getAttribute('valign') || 'top', !1, '', null, !1, f));
    else if ('include-shape' == g)
      p = mxStencilRegistry.getStencil(c.getAttribute('name')), null != p && (k += Number(c.getAttribute('x')) * m, l += Number(c.getAttribute('y')) * n, d = Number(c.getAttribute('w')) * m, f = Number(c.getAttribute('h')) * n, p.drawShape(a, b, k, l, d, f));
    else if ('fillstroke' == g)
      a.fillAndStroke();
    else if ('fill' == g)
      a.fill();
    else if ('stroke' == g)
      a.stroke();
    else if ('strokewidth' == g)
      m = '1' == c.getAttribute('fixed') ? 1 : p, a.setStrokeWidth(Number(c.getAttribute('width')) * m);
    else if ('dashed' == g)
      a.setDashed('1' == c.getAttribute('dashed'));
    else if ('dashpattern' == g) {
      if (c = c.getAttribute('pattern'), null != c) {
        c = c.split(' ');
        n = [];
        for (m = 0; m < c.length; m++)
          0 < c[m].length && n.push(Number(c[m]) * p);
        c = n.join(' ');
        a.setDashPattern(c);
      }
    } else
      'strokecolor' == g ? a.setStrokeColor(this.parseColor(a, b, c, c.getAttribute('color'))) : 'linecap' == g ? a.setLineCap(c.getAttribute('cap')) : 'linejoin' == g ? a.setLineJoin(c.getAttribute('join')) : 'miterlimit' == g ? a.setMiterLimit(Number(c.getAttribute('limit'))) : 'fillcolor' == g ? a.setFillColor(this.parseColor(a, b, c, c.getAttribute('color'))) : 'alpha' == g ? a.setAlpha(c.getAttribute('alpha')) : 'fillalpha' == g ? a.setAlpha(c.getAttribute('alpha')) : 'strokealpha' == g ? a.setAlpha(c.getAttribute('alpha')) : 'fontcolor' == g ? a.setFontColor(this.parseColor(a, b, c, c.getAttribute('color'))) : 'fontstyle' == g ? a.setFontStyle(c.getAttribute('style')) : 'fontfamily' == g ? a.setFontFamily(c.getAttribute('family')) : 'fontsize' == g && a.setFontSize(Number(c.getAttribute('size')) * p);
    !e || 'fillstroke' != g && 'fill' != g && 'stroke' != g || a.setShadow(!1);
  }
};