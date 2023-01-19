function mxRuler(b, e, f, c) {
  function k() {
    var C = b.diagramContainer;
    J.style.top = C.offsetTop - E + 'px';
    J.style.left = C.offsetLeft - E + 'px';
    J.style.width = (f ? 0 : C.offsetWidth) + E + 'px';
    J.style.height = (f ? C.offsetHeight : 0) + E + 'px';
  }

  function m(C, F, L) {
    if (null != t)
      return C;
    var l;
    return function() {
      var q = this,
        A = arguments,
        H = L && !l;
      clearTimeout(l);
      l = setTimeout(function() {
        l = null;
        L || C.apply(q, A);
      }, F);
      H && C.apply(q, A);
    };
  }
  var t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
    y = window.cancelAnimationFrame || window.mozCancelAnimationFrame,
    E = this.RULER_THICKNESS,
    z = this;
  this.unit = e;
  var D = Editor.isDarkMode() ? {
      bkgClr: '#202020',
      outBkgClr: Editor.darkColor,
      cornerClr: Editor.darkColor,
      strokeClr: '#505759',
      fontClr: '#BBBBBB',
      guideClr: '#0088cf'
    } : {
      bkgClr: '#ffffff',
      outBkgClr: '#e8e9ed',
      cornerClr: '#fbfbfb',
      strokeClr: '#dadce0',
      fontClr: '#BBBBBB',
      guideClr: '#0000BB'
    },
    J = document.createElement('div');
  J.className = 'geRuler';
  J.style.position = 'fixed';
  this.updateStyle = mxUtils.bind(this, function() {
    D = Editor.isDarkMode() ? {
      outBkgClr: Editor.darkColor,
      cornerClr: Editor.darkColor,
      strokeClr: '#505759',
      fontClr: '#BBBBBB',
      guideClr: '#0088cf'
    } : {
      outBkgClr: '#e8e9ed',
      cornerClr: '#fbfbfb',
      strokeClr: '#dadce0',
      fontClr: '#BBBBBB',
      guideClr: '#0000BB'
    };
    J.style[f ? 'borderRight' : 'borderBottom'] = '0.5px solid ' + D.strokeClr;
    J.style.borderLeft = '0.5px solid ' + D.strokeClr;
  });
  this.updateStyle();
  b.diagramContainer.appendChild(J);
  mxEvent.disableContextMenu(J);
  this.editorUiRefresh = b.refresh;
  b.refresh = function(C) {
    z.editorUiRefresh.apply(b, arguments);
    k();
  };
  k();
  var G = document.createElement('canvas');
  G.width = J.offsetWidth;
  G.height = J.offsetHeight;
  J.style.overflow = 'hidden';
  G.style.position = 'relative';
  J.appendChild(G);
  var d = G.getContext('2d');
  this.ui = b;
  var g = b.editor.graph;
  this.graph = g;
  this.container = J;
  this.canvas = G;
  var n = function(C, F, L, l, q) {
      C = Math.round(C);
      F = Math.round(F);
      L = Math.round(L);
      l = Math.round(l);
      d.beginPath();
      d.moveTo(C + 0.5, F + 0.5);
      d.lineTo(L + 0.5, l + 0.5);
      d.stroke();
      q && (f ? (d.save(), d.translate(C, F), d.rotate(-Math.PI / 2), d.fillText(q, 0, 0), d.restore()) : d.fillText(q, C, F));
    },
    v = function() {
      d.clearRect(0, 0, G.width, G.height);
      d.beginPath();
      d.lineWidth = 0.7;
      d.strokeStyle = D.strokeClr;
      d.setLineDash([]);
      d.font = '9px Arial';
      d.textAlign = 'center';
      var C = g.view.scale,
        F = g.view.getBackgroundPageBounds(),
        L = g.view.translate,
        l = g.pageVisible;
      L = l ? E + (f ? F.y - g.container.scrollTop : F.x - g.container.scrollLeft) : E + (f ? L.y * C - g.container.scrollTop : L.x * C - g.container.scrollLeft);
      var q = 0;
      l && (q = g.getPageLayout(), q = f ? q.y * g.pageFormat.height : q.x * g.pageFormat.width);
      var A;
      switch (z.unit) {
        case mxConstants.POINTS:
          var H = A = 10;
          var K = [
            3,
            5,
            5,
            5,
            5,
            10,
            5,
            5,
            5,
            5
          ];
          break;
        case mxConstants.MILLIMETERS:
          A = 10;
          H = mxConstants.PIXELS_PER_MM;
          K = [
            5,
            3,
            3,
            3,
            3,
            6,
            3,
            3,
            3,
            3
          ];
          break;
        case mxConstants.METERS:
          A = 20;
          H = mxConstants.PIXELS_PER_MM;
          K = [
            5,
            3,
            3,
            3,
            3,
            6,
            3,
            3,
            3,
            3,
            10,
            3,
            3,
            3,
            3,
            6,
            3,
            3,
            3,
            3
          ];
          break;
        case mxConstants.INCHES:
          A = 0.5 >= C || 4 <= C ? 8 : 16, H = mxConstants.PIXELS_PER_INCH / A, K = [
            5,
            3,
            5,
            3,
            7,
            3,
            5,
            3,
            7,
            3,
            5,
            3,
            7,
            3,
            5,
            3
          ];
      }
      var M = H;
      2 <= C ? M = H / (2 * Math.floor(C / 2)) : 0.5 >= C && (M = H * Math.floor(1 / C / 2) * (z.unit == mxConstants.MILLIMETERS ? 2 : 1));
      H = null;
      F = l ? Math.min(L + (f ? F.height : F.width), f ? G.height : G.width) : f ? G.height : G.width;
      if (l)
        if (d.fillStyle = D.outBkgClr, f) {
          var I = L - E;
          0 < I && d.fillRect(0, E, E, I);
          F < G.height && d.fillRect(0, F, E, G.height);
        } else
          I = L - E, 0 < I && d.fillRect(E, 0, I, E), F < G.width && d.fillRect(F, 0, G.width, E);
      d.fillStyle = D.fontClr;
      for (l = l ? L : L % (M * C); l <= F; l += M * C)
        if (I = Math.round((l - L) / C / M), !(l < E || I == H)) {
          H = I;
          var Q = null;
          0 == I % A && (Q = z.formatText(q + I * M) + '');
          f ? n(E - K[Math.abs(I) % A], l, E, l, Q) : n(l, E - K[Math.abs(I) % A], l, E, Q);
        }
      d.lineWidth = 1;
      n(f ? 0 : E, f ? E : 0, E, E);
      d.fillStyle = D.cornerClr;
      d.fillRect(0, 0, E, E);
    },
    u = -1,
    x = function() {
      null != t ? (null != y && y(u), u = t(v)) : v();
    };
  this.drawRuler = x;
  this.sizeListener = e = m(function() {
    var C = g.container;
    f ? (C = C.offsetHeight + E, G.height != C && (G.height = C, J.style.height = C + 'px', x())) : (C = C.offsetWidth + E, G.width != C && (G.width = C, J.style.width = C + 'px', x()));
  }, 10);
  this.pageListener = function() {
    x();
  };
  this.scrollListener = c = m(function() {
    var C = f ? g.container.scrollTop : g.container.scrollLeft;
    z.lastScroll != C && (z.lastScroll = C, x());
  }, 10);
  this.unitListener = function(C, F) {
    z.setUnit(F.getProperty('unit'));
  };
  g.addListener(mxEvent.SIZE, e);
  g.container.addEventListener('scroll', c);
  g.view.addListener('unitChanged', this.unitListener);
  b.addListener('pageViewChanged', this.pageListener);
  b.addListener('pageScaleChanged', this.pageListener);
  b.addListener('pageFormatChanged', this.pageListener);
  this.setStyle = function(C) {
    D = C;
    J.style.background = D.bkgClr;
    v();
  };
  this.origGuideMove = mxGuide.prototype.move;
  mxGuide.prototype.move = function(C, F, L, l) {
    if (f && 4 < C.height || !f && 4 < C.width) {
      if (null != z.guidePart)
        try {
          d.putImageData(z.guidePart.imgData1, z.guidePart.x1, z.guidePart.y1), d.putImageData(z.guidePart.imgData2, z.guidePart.x2, z.guidePart.y2), d.putImageData(z.guidePart.imgData3, z.guidePart.x3, z.guidePart.y3);
        } catch (p) {}
      var q = z.origGuideMove.apply(this, arguments);
      try {
        d.lineWidth = 0.5;
        d.strokeStyle = D.guideClr;
        d.setLineDash([2]);
        if (f) {
          var A = C.y + q.y + E - this.graph.container.scrollTop;
          var H = 0;
          var K = A + C.height / 2;
          var M = E / 2;
          var I = A + C.height;
          var Q = 0;
          var P = d.getImageData(H, A - 1, E, 3);
          n(H, A, E, A);
          A--;
          var O = d.getImageData(M, K - 1, E, 3);
          n(M, K, E, K);
          K--;
          var W = d.getImageData(Q, I - 1, E, 3);
          n(Q, I, E, I);
          I--;
        } else
          A = 0, H = C.x + q.x + E - this.graph.container.scrollLeft, K = E / 2, M = H + C.width / 2, I = 0, Q = H + C.width, P = d.getImageData(H - 1, A, 3, E), n(H, A, H, E), H--, O = d.getImageData(M - 1, K, 3, E), n(M, K, M, E), M--, W = d.getImageData(Q - 1, I, 3, E), n(Q, I, Q, E), Q--;
        if (null == z.guidePart || z.guidePart.x1 != H || z.guidePart.y1 != A)
          z.guidePart = {
            imgData1: P,
            x1: H,
            y1: A,
            imgData2: O,
            x2: M,
            y2: K,
            imgData3: W,
            x3: Q,
            y3: I
          };
      } catch (p) {}
    } else
      q = z.origGuideMove.apply(this, arguments);
    return q;
  };
  this.origGuideDestroy = mxGuide.prototype.destroy;
  mxGuide.prototype.destroy = function() {
    var C = z.origGuideDestroy.apply(this, arguments);
    if (null != z.guidePart)
      try {
        d.putImageData(z.guidePart.imgData1, z.guidePart.x1, z.guidePart.y1), d.putImageData(z.guidePart.imgData2, z.guidePart.x2, z.guidePart.y2), d.putImageData(z.guidePart.imgData3, z.guidePart.x3, z.guidePart.y3), z.guidePart = null;
      } catch (F) {}
    return C;
  };
}
mxRuler.prototype.RULER_THICKNESS = 14;
mxRuler.prototype.unit = mxConstants.POINTS;
mxRuler.prototype.setUnit = function(b) {
  this.unit = b;
  this.drawRuler();
};
mxRuler.prototype.formatText = function(b) {
  switch (this.unit) {
    case mxConstants.POINTS:
      return Math.round(b);
    case mxConstants.MILLIMETERS:
      return (b / mxConstants.PIXELS_PER_MM).toFixed(1);
    case mxConstants.METERS:
      return (b / (1000 * mxConstants.PIXELS_PER_MM)).toFixed(4);
    case mxConstants.INCHES:
      return (b / mxConstants.PIXELS_PER_INCH).toFixed(2);
  }
};
mxRuler.prototype.destroy = function() {
  this.ui.refresh = this.editorUiRefresh;
  mxGuide.prototype.move = this.origGuideMove;
  mxGuide.prototype.destroy = this.origGuideDestroy;
  this.graph.removeListener(this.sizeListener);
  this.graph.container.removeEventListener('scroll', this.scrollListener);
  this.graph.view.removeListener('unitChanged', this.unitListener);
  this.ui.removeListener('pageViewChanged', this.pageListener);
  this.ui.removeListener('pageScaleChanged', this.pageListener);
  this.ui.removeListener('pageFormatChanged', this.pageListener);
  null != this.container && this.container.parentNode.removeChild(this.container);
};