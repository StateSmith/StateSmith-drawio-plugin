function mxPrintPreview(a, b, c, d, e, f, g, k, l) {
  this.graph = a;
  this.scale = null != b ? b : 1 / a.pageScale;
  this.border = null != d ? d : 0;
  this.pageFormat = mxRectangle.fromRectangle(null != c ? c : a.pageFormat);
  this.title = null != k ? k : 'Printer-friendly version';
  this.x0 = null != e ? e : 0;
  this.y0 = null != f ? f : 0;
  this.borderColor = g;
  this.pageSelector = null != l ? l : !0;
}
mxPrintPreview.prototype.graph = null;
mxPrintPreview.prototype.pageFormat = null;
mxPrintPreview.prototype.addPageCss = !1;
mxPrintPreview.prototype.pixelsPerInch = 90;
mxPrintPreview.prototype.pageMargin = 0.2;
mxPrintPreview.prototype.scale = null;
mxPrintPreview.prototype.border = 0;
mxPrintPreview.prototype.marginTop = 0;
mxPrintPreview.prototype.marginBottom = 0;
mxPrintPreview.prototype.x0 = 0;
mxPrintPreview.prototype.y0 = 0;
mxPrintPreview.prototype.autoOrigin = !0;
mxPrintPreview.prototype.printOverlays = !1;
mxPrintPreview.prototype.printControls = !1;
mxPrintPreview.prototype.printBackgroundImage = !1;
mxPrintPreview.prototype.backgroundColor = '#ffffff';
mxPrintPreview.prototype.borderColor = null;
mxPrintPreview.prototype.title = null;
mxPrintPreview.prototype.pageSelector = null;
mxPrintPreview.prototype.wnd = null;
mxPrintPreview.prototype.targetWindow = null;
mxPrintPreview.prototype.pageCount = 0;
mxPrintPreview.prototype.clipping = !0;
mxPrintPreview.prototype.getWindow = function() {
  return this.wnd;
};
mxPrintPreview.prototype.getDoctype = function() {
  var a = '';
  8 == document.documentMode ? a = '<meta http-equiv="X-UA-Compatible" content="IE=8">' : 8 < document.documentMode && (a = '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->');
  return a;
};
mxPrintPreview.prototype.appendGraph = function(a, b, c, d, e, f) {
  this.graph = a;
  this.scale = null != b ? b : 1 / a.pageScale;
  this.x0 = c;
  this.y0 = d;
  this.open(null, null, e, f);
};
mxPrintPreview.prototype.open = function(a, b, c, d) {
  var e = this.graph.cellRenderer.initializeOverlay,
    f = null;
  try {
    this.printOverlays && (this.graph.cellRenderer.initializeOverlay = function(G, z) {
      z.init(G.view.getDrawPane());
    });
    this.printControls && (this.graph.cellRenderer.initControl = function(G, z, J, I) {
      z.dialect = G.view.graph.dialect;
      z.init(G.view.getDrawPane());
    });
    this.wnd = null != b ? b : this.wnd;
    var g = !1;
    null == this.wnd && (g = !0, this.wnd = window.open());
    var k = this.wnd.document;
    if (g) {
      var l = this.getDoctype();
      null != l && 0 < l.length && k.writeln(l);
      'CSS1Compat' === document.compatMode && k.writeln('<!DOCTYPE html>');
      k.writeln('<html>');
      k.writeln('<head>');
      this.writeHead(k, a);
      k.writeln('</head>');
      k.writeln('<body class="mxPage">');
    }
    var m = this.graph.getGraphBounds().clone(),
      n = this.graph.getView().getScale(),
      p = n / this.scale,
      r = this.graph.getView().getTranslate();
    this.autoOrigin || (this.x0 -= r.x * this.scale, this.y0 -= r.y * this.scale, m.width += m.x, m.height += m.y, m.x = 0, this.border = m.y = 0);
    var q = this.pageFormat.width - 2 * this.border,
      t = this.pageFormat.height - 2 * this.border;
    this.pageFormat.height += this.marginTop + this.marginBottom;
    m.width /= p;
    m.height /= p;
    var u = Math.max(1, Math.ceil((m.width + this.x0) / q)),
      x = Math.max(1, Math.ceil((m.height + this.y0) / t));
    this.pageCount = u * x;
    var A = mxUtils.bind(this, function() {
        if (this.pageSelector && (1 < x || 1 < u)) {
          var G = this.createPageSelector(x, u);
          k.body.appendChild(G);
          if (mxClient.IS_IE && null == k.documentMode || 5 == k.documentMode || 8 == k.documentMode || 7 == k.documentMode) {
            G.style.position = 'absolute';
            var z = function() {
              G.style.top = (k.body.scrollTop || k.documentElement.scrollTop) + 10 + 'px';
            };
            mxEvent.addListener(this.wnd, 'scroll', function(J) {
              z();
            });
            mxEvent.addListener(this.wnd, 'resize', function(J) {
              z();
            });
          }
        }
      }),
      E = mxUtils.bind(this, function(G, z) {
        null != this.borderColor && (G.style.borderColor = this.borderColor, G.style.borderStyle = 'solid', G.style.borderWidth = '1px');
        G.style.background = this.backgroundColor;
        if (c || z)
          G.style.pageBreakAfter = 'always';
        if (g && (mxClient.IS_IE || 11 <= document.documentMode || mxClient.IS_EDGE))
          k.writeln(G.outerHTML), G.parentNode.removeChild(G);
        else if (mxClient.IS_IE || 11 <= document.documentMode || mxClient.IS_EDGE) {
          var J = k.createElement('div');
          J.innerHTML = G.outerHTML;
          J = J.getElementsByTagName('div')[0];
          k.body.appendChild(J);
          G.parentNode.removeChild(G);
        } else
          G.parentNode.removeChild(G), k.body.appendChild(G);
        (c || z) && this.addPageBreak(k);
      }),
      C = this.getCoverPages(this.pageFormat.width, this.pageFormat.height);
    if (null != C)
      for (var D = 0; D < C.length; D++)
        E(C[D], !0);
    var B = this.getAppendices(this.pageFormat.width, this.pageFormat.height);
    for (D = 0; D < x; D++) {
      var v = D * t / this.scale - this.y0 / this.scale + (m.y - r.y * n) / n;
      for (a = 0; a < u; a++) {
        if (null == this.wnd)
          return null;
        var y = a * q / this.scale - this.x0 / this.scale + (m.x - r.x * n) / n,
          F = D * u + a + 1,
          H = new mxRectangle(y, v, q, t);
        f = this.renderPage(this.pageFormat.width, this.pageFormat.height, 0, 0, mxUtils.bind(this, function(G) {
          this.addGraphFragment(-y, -v, this.scale, F, G, H);
          this.printBackgroundImage && this.insertBackgroundImage(G, -y, -v);
        }), F);
        f.setAttribute('id', 'mxPage-' + F);
        E(f, null != B || D < x - 1 || a < u - 1);
      }
    }
    if (null != B)
      for (D = 0; D < B.length; D++)
        E(B[D], D < B.length - 1);
    g && !d && (this.closeDocument(), A());
    this.wnd.focus();
  } catch (G) {
    null != f && null != f.parentNode && f.parentNode.removeChild(f);
  } finally {
    this.graph.cellRenderer.initializeOverlay = e;
  }
  return this.wnd;
};
mxPrintPreview.prototype.addPageBreak = function(a) {
  var b = a.createElement('hr');
  b.className = 'mxPageBreak';
  a.body.appendChild(b);
};
mxPrintPreview.prototype.closeDocument = function() {
  try {
    if (null != this.wnd && null != this.wnd.document) {
      var a = this.wnd.document;
      this.writePostfix(a);
      a.writeln('</body>');
      a.writeln('</html>');
      a.close();
      mxEvent.release(a.body);
    }
  } catch (b) {}
};
mxPrintPreview.prototype.writeHead = function(a, b) {
  null != this.title && a.writeln('<title>' + this.title + '</title>');
  mxClient.link('stylesheet', mxClient.basePath + '/css/common.css', a);
  a.writeln('<style type="text/css">');
  a.writeln('@media print {');
  a.writeln('  * { -webkit-print-color-adjust: exact; }');
  a.writeln('  table.mxPageSelector { display: none; }');
  a.writeln('  hr.mxPageBreak { display: none; }');
  a.writeln('}');
  a.writeln('@media screen {');
  a.writeln('  table.mxPageSelector { position: fixed; right: 10px; top: 10px;font-family: Arial; font-size:10pt; border: solid 1px darkgray;background: white; border-collapse:collapse; }');
  a.writeln('  table.mxPageSelector td { border: solid 1px gray; padding:4px; }');
  a.writeln('  body.mxPage { background: gray; }');
  a.writeln('}');
  var c = this.pageFormat;
  this.addPageCss && null != c && (c = (c.width / this.pixelsPerInch + this.pageMargin).toFixed(2) + 'in ' + (c.height / this.pixelsPerInch + this.pageMargin).toFixed(2) + 'in;', a.writeln('@page {'), a.writeln('  margin: ' + this.pageMargin + 'in;'), a.writeln('  size: ' + c), a.writeln('}'));
  null != b && a.writeln(b);
  a.writeln('</style>');
};
mxPrintPreview.prototype.writePostfix = function(a) {};
mxPrintPreview.prototype.createPageSelector = function(a, b) {
  var c = this.wnd.document,
    d = c.createElement('table');
  d.className = 'mxPageSelector';
  d.setAttribute('border', '0');
  for (var e = c.createElement('tbody'), f = 0; f < a; f++) {
    for (var g = c.createElement('tr'), k = 0; k < b; k++) {
      var l = f * b + k + 1,
        m = c.createElement('td'),
        n = c.createElement('a');
      n.setAttribute('href', '#mxPage-' + l);
      !mxClient.IS_NS || mxClient.IS_SF || mxClient.IS_GC || n.setAttribute('onclick', 'var page = document.getElementById(\'mxPage-' + l + '\');page.scrollIntoView(true);event.preventDefault();');
      mxUtils.write(n, l, c);
      m.appendChild(n);
      g.appendChild(m);
    }
    e.appendChild(g);
  }
  d.appendChild(e);
  return d;
};
mxPrintPreview.prototype.renderPage = function(a, b, c, d, e, f) {
  f = this.wnd.document;
  var g = document.createElement('div'),
    k = null;
  try {
    if (0 != c || 0 != d) {
      g.style.position = 'relative';
      g.style.width = a + 'px';
      g.style.height = b + 'px';
      g.style.pageBreakInside = 'avoid';
      var l = document.createElement('div');
      l.style.position = 'relative';
      l.style.top = this.border + 'px';
      l.style.left = this.border + 'px';
      l.style.width = a - 2 * this.border + 'px';
      l.style.height = b - 2 * this.border + 'px';
      l.style.overflow = 'hidden';
      var m = document.createElement('div');
      m.style.position = 'relative';
      m.style.marginLeft = c + 'px';
      m.style.marginTop = d + 'px';
      8 == f.documentMode && (l.style.position = 'absolute', m.style.position = 'absolute');
      10 == f.documentMode && (m.style.width = '100%', m.style.height = '100%');
      l.appendChild(m);
      g.appendChild(l);
      document.body.appendChild(g);
      k = m;
    } else
      g.style.width = a + 'px', g.style.height = b + 'px', g.style.overflow = 'hidden', g.style.pageBreakInside = 'avoid', 8 == f.documentMode && (g.style.position = 'relative'), l = document.createElement('div'), l.style.width = a - 2 * this.border + 'px', l.style.height = b - 2 * this.border + 'px', l.style.overflow = 'hidden', !mxClient.IS_IE || null != f.documentMode && 5 != f.documentMode && 8 != f.documentMode && 7 != f.documentMode ? (l.style.top = this.border + 'px', l.style.left = this.border + 'px') : (l.style.marginTop = this.border + 'px', l.style.marginLeft = this.border + 'px'), g.appendChild(l), document.body.appendChild(g), k = l;
  } catch (n) {
    throw g.parentNode.removeChild(g), n;
  }
  e(k);
  return g;
};
mxPrintPreview.prototype.getRoot = function() {
  var a = this.graph.view.currentRoot;
  null == a && (a = this.graph.getModel().getRoot());
  return a;
};
mxPrintPreview.prototype.useCssTransforms = function() {
  return !mxClient.NO_FO && !mxClient.IS_SF;
};
mxPrintPreview.prototype.isCellVisible = function(a) {
  return !0;
};
mxPrintPreview.prototype.addGraphFragment = function(a, b, c, d, e, f) {
  var g = this.graph.getView();
  d = this.graph.container;
  this.graph.container = e;
  var k = g.getCanvas(),
    l = g.getBackgroundPane(),
    m = g.getDrawPane(),
    n = g.getOverlayPane(),
    p = c;
  if (this.graph.dialect == mxConstants.DIALECT_SVG) {
    if (g.createSvg(), this.useCssTransforms()) {
      var r = g.getDrawPane().parentNode;
      r.getAttribute('transform');
      r.setAttribute('transformOrigin', '0 0');
      r.setAttribute('transform', 'scale(' + c + ',' + c + ')translate(' + a + ',' + b + ')');
      c = 1;
      b = a = 0;
    }
  } else
    g.createHtml();
  r = g.isEventsEnabled();
  g.setEventsEnabled(!1);
  var q = this.graph.isEnabled();
  this.graph.setEnabled(!1);
  var t = g.getTranslate();
  g.translate = new mxPoint(a, b);
  var u = this.graph.cellRenderer.redraw,
    x = g.states;
  a = g.scale;
  if (this.clipping) {
    var A = new mxRectangle((f.x + t.x) * a, (f.y + t.y) * a, f.width * a / p, f.height * a / p),
      E = this;
    this.graph.cellRenderer.redraw = function(D, B, v) {
      if (null != D) {
        var y = x.get(D.cell);
        if (null != y && (y = g.getBoundingBox(y, !1), null != y && 0 < y.width && 0 < y.height && !mxUtils.intersects(A, y)) || !E.isCellVisible(D.cell))
          return;
      }
      u.apply(this, arguments);
    };
  }
  a = null;
  try {
    var C = [this.getRoot()];
    a = new mxTemporaryCellStates(g, c, C, null, mxUtils.bind(this, function(D) {
      return this.getLinkForCellState(D);
    }));
  } finally {
    if (mxClient.IS_IE)
      g.overlayPane.innerText = '', g.canvas.style.overflow = 'hidden', g.canvas.style.position = 'relative', g.canvas.style.top = this.marginTop + 'px', g.canvas.style.width = f.width + 'px', g.canvas.style.height = f.height + 'px';
    else
      for (c = e.firstChild; null != c;)
        C = c.nextSibling, b = c.nodeName.toLowerCase(), 'svg' == b ? (c.style.overflow = 'hidden', c.style.position = 'relative', c.style.top = this.marginTop + 'px', c.setAttribute('width', f.width), c.setAttribute('height', f.height), c.style.width = '', c.style.height = '') : 'default' != c.style.cursor && 'div' != b && c.parentNode.removeChild(c), c = C;
    this.printBackgroundImage && (e = e.getElementsByTagName('svg'), 0 < e.length && (e[0].style.position = 'absolute'));
    g.overlayPane.parentNode.removeChild(g.overlayPane);
    this.graph.setEnabled(q);
    this.graph.container = d;
    this.graph.cellRenderer.redraw = u;
    g.canvas = k;
    g.backgroundPane = l;
    g.drawPane = m;
    g.overlayPane = n;
    g.translate = t;
    a.destroy();
    g.setEventsEnabled(r);
  }
};
mxPrintPreview.prototype.getLinkForCellState = function(a) {
  return this.graph.getLinkForCell(a.cell);
};
mxPrintPreview.prototype.insertBackgroundImage = function(a, b, c) {
  var d = this.graph.backgroundImage;
  if (null != d) {
    var e = document.createElement('img');
    e.style.position = 'absolute';
    e.style.marginLeft = Math.round((b + d.x) * this.scale) + 'px';
    e.style.marginTop = Math.round((c + d.y) * this.scale) + 'px';
    e.setAttribute('width', Math.round(d.width * this.scale));
    e.setAttribute('height', Math.round(d.height * this.scale));
    e.src = d.src;
    a.insertBefore(e, a.firstChild);
  }
};
mxPrintPreview.prototype.getCoverPages = function() {
  return null;
};
mxPrintPreview.prototype.getAppendices = function() {
  return null;
};
mxPrintPreview.prototype.print = function(a) {
  a = this.open(a);
  null != a && a.print();
};
mxPrintPreview.prototype.close = function() {
  null != this.wnd && (this.wnd.close(), this.wnd = null);
};