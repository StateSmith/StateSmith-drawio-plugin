function TableLayout(a) {
  mxGraphLayout.call(this, a);
}
TableLayout.prototype = new mxStackLayout();
TableLayout.prototype.constructor = TableLayout;
TableLayout.prototype.isHorizontal = function() {
  return !1;
};
TableLayout.prototype.isVertexIgnored = function(a) {
  return !this.graph.getModel().isVertex(a) || !this.graph.isCellVisible(a);
};
TableLayout.prototype.getSize = function(a, b) {
  for (var f = 0, e = 0; e < a.length; e++)
    if (!this.isVertexIgnored(a[e])) {
      var g = this.graph.getCellGeometry(a[e]);
      null != g && (f += b ? g.width : g.height);
    }
  return f;
};
TableLayout.prototype.getRowLayout = function(a, b) {
  var f = this.graph.model.getChildCells(a, !0),
    e = this.graph.getActualStartSize(a, !0);
  a = this.getSize(f, !0);
  b = b - e.x - e.width;
  var g = [];
  e = e.x;
  for (var d = 0; d < f.length; d++) {
    var h = this.graph.getCellGeometry(f[d]);
    null != h && (e += (null != h.alternateBounds ? h.alternateBounds.width : h.width) * b / a, g.push(Math.round(e)));
  }
  return g;
};
TableLayout.prototype.layoutRow = function(a, b, f, e) {
  var g = this.graph.getModel(),
    d = g.getChildCells(a, !0);
  a = this.graph.getActualStartSize(a, !0);
  var h = a.x,
    n = 0;
  null != b && (b = b.slice(), b.splice(0, 0, a.x));
  for (var u = 0; u < d.length; u++) {
    var m = this.graph.getCellGeometry(d[u]);
    null != m && (m = m.clone(), m.y = a.y, m.height = f - a.y - a.height, null != b ? (m.x = b[u], m.width = b[u + 1] - m.x, u == d.length - 1 && u < b.length - 2 && (m.width = e - m.x - a.x - a.width)) : (m.x = h, h += m.width, u == d.length - 1 ? m.width = e - a.x - a.width - n : n += m.width), m.alternateBounds = new mxRectangle(0, 0, m.width, m.height), g.setGeometry(d[u], m));
  }
  return n;
};
TableLayout.prototype.execute = function(a) {
  if (null != a) {
    var b = this.graph.getActualStartSize(a, !0),
      f = this.graph.getCellGeometry(a),
      e = this.graph.getCellStyle(a),
      g = '1' == mxUtils.getValue(e, 'resizeLastRow', '0'),
      d = '1' == mxUtils.getValue(e, 'resizeLast', '0');
    e = '1' == mxUtils.getValue(e, 'fixedRows', '0');
    var h = this.graph.getModel(),
      n = 0;
    h.beginUpdate();
    try {
      for (var u = f.height - b.y - b.height, m = f.width - b.x - b.width, p = h.getChildCells(a, !0), x = 0; x < p.length; x++)
        h.setVisible(p[x], !0);
      var A = this.getSize(p, !1);
      if (0 < u && 0 < m && 0 < p.length && 0 < A) {
        if (g) {
          var C = this.graph.getCellGeometry(p[p.length - 1]);
          null != C && (C = C.clone(), C.height = u - A + C.height, h.setGeometry(p[p.length - 1], C));
        }
        var D = d ? null : this.getRowLayout(p[0], m),
          G = [],
          F = b.y;
        for (x = 0; x < p.length; x++)
          C = this.graph.getCellGeometry(p[x]), null != C && (C = C.clone(), C.x = b.x, C.width = m, C.y = Math.round(F), F = g || e ? F + C.height : F + C.height / A * u, C.height = Math.round(F) - C.y, h.setGeometry(p[x], C)), n = Math.max(n, this.layoutRow(p[x], D, C.height, m, G));
        e && u < A && (f = f.clone(), f.height = F + b.height, h.setGeometry(a, f));
        d && m < n + Graph.minTableColumnWidth && (f = f.clone(), f.width = n + b.width + b.x + Graph.minTableColumnWidth, h.setGeometry(a, f));
        this.graph.visitTableCells(a, mxUtils.bind(this, function(K) {
          h.setVisible(K.cell, K.actual.cell == K.cell);
          if (K.actual.cell != K.cell) {
            if (K.actual.row == K.row) {
              var P = null != K.geo.alternateBounds ? K.geo.alternateBounds : K.geo;
              K.actual.geo.width += P.width;
            }
            K.actual.col == K.col && (P = null != K.geo.alternateBounds ? K.geo.alternateBounds : K.geo, K.actual.geo.height += P.height);
          }
        }));
      } else
        for (x = 0; x < p.length; x++)
          h.setVisible(p[x], !1);
    } finally {
      h.endUpdate();
    }
  }
};
(function() {
  var a = mxGraphView.prototype.resetValidationState;
  mxGraphView.prototype.resetValidationState = function() {
    a.apply(this, arguments);
    this.validEdges = [];
  };
  var b = mxGraphView.prototype.validateCellState;
  mxGraphView.prototype.validateCellState = function(p, x) {
    x = null != x ? x : !0;
    var A = this.getState(p);
    null != A && x && this.graph.model.isEdge(A.cell) && null != A.style && 1 != A.style[mxConstants.STYLE_CURVED] && !A.invalid && this.updateLineJumps(A) && this.graph.cellRenderer.redraw(A, !1, this.isRendering());
    A = b.apply(this, arguments);
    null != A && x && this.graph.model.isEdge(A.cell) && null != A.style && 1 != A.style[mxConstants.STYLE_CURVED] && this.validEdges.push(A);
    return A;
  };
  var f = mxShape.prototype.paint;
  mxShape.prototype.paint = function() {
    f.apply(this, arguments);
    if (null != this.state && null != this.node && this.state.view.graph.enableFlowAnimation && this.state.view.graph.model.isEdge(this.state.cell) && '1' == mxUtils.getValue(this.state.style, 'flowAnimation', '0')) {
      var p = this.node.getElementsByTagName('path');
      if (1 < p.length) {
        '1' != mxUtils.getValue(this.state.style, mxConstants.STYLE_DASHED, '0') && p[1].setAttribute('stroke-dasharray', 8 * this.state.view.scale);
        var x = this.state.view.graph.getFlowAnimationStyle();
        null != x && p[1].setAttribute('class', x.getAttribute('id'));
      }
    }
  };
  var e = mxCellRenderer.prototype.isShapeInvalid;
  mxCellRenderer.prototype.isShapeInvalid = function(p, x) {
    return e.apply(this, arguments) || null != p.routedPoints && null != x.routedPoints && !mxUtils.equalPoints(x.routedPoints, p.routedPoints);
  };
  var g = mxGraphView.prototype.updateCellState;
  mxGraphView.prototype.updateCellState = function(p) {
    g.apply(this, arguments);
    this.graph.model.isEdge(p.cell) && 1 != p.style[mxConstants.STYLE_CURVED] && this.updateLineJumps(p);
  };
  mxGraphView.prototype.updateLineJumps = function(p) {
    var x = p.absolutePoints;
    if (Graph.lineJumpsEnabled) {
      var A = null != p.routedPoints,
        C = null;
      if (null != x && null != this.validEdges && 'none' !== mxUtils.getValue(p.style, 'jumpStyle', 'none')) {
        var D = function(ja, la, N) {
            var X = new mxPoint(la, N);
            X.type = ja;
            C.push(X);
            X = null != p.routedPoints ? p.routedPoints[C.length - 1] : null;
            return null == X || X.type != ja || X.x != la || X.y != N;
          },
          G = 0.5 * this.scale;
        A = !1;
        C = [];
        for (var F = 0; F < x.length - 1; F++) {
          for (var K = x[F + 1], P = x[F], R = [], Q = x[F + 2]; F < x.length - 2 && mxUtils.ptSegDistSq(P.x, P.y, Q.x, Q.y, K.x, K.y) < 1 * this.scale * this.scale;)
            K = Q, F++, Q = x[F + 2];
          A = D(0, P.x, P.y) || A;
          for (var ba = 0; ba < this.validEdges.length; ba++) {
            var V = this.validEdges[ba],
              T = V.absolutePoints;
            if (null != T && mxUtils.intersects(p, V) && '1' != V.style.noJump)
              for (V = 0; V < T.length - 1; V++) {
                var Z = T[V + 1],
                  ma = T[V];
                for (Q = T[V + 2]; V < T.length - 2 && mxUtils.ptSegDistSq(ma.x, ma.y, Q.x, Q.y, Z.x, Z.y) < 1 * this.scale * this.scale;)
                  Z = Q, V++, Q = T[V + 2];
                Q = mxUtils.intersection(P.x, P.y, K.x, K.y, ma.x, ma.y, Z.x, Z.y);
                if (null != Q && (Math.abs(Q.x - P.x) > G || Math.abs(Q.y - P.y) > G) && (Math.abs(Q.x - K.x) > G || Math.abs(Q.y - K.y) > G) && (Math.abs(Q.x - ma.x) > G || Math.abs(Q.y - ma.y) > G) && (Math.abs(Q.x - Z.x) > G || Math.abs(Q.y - Z.y) > G)) {
                  Z = Q.x - P.x;
                  ma = Q.y - P.y;
                  Q = {
                    distSq: Z * Z + ma * ma,
                    x: Q.x,
                    y: Q.y
                  };
                  for (Z = 0; Z < R.length; Z++)
                    if (R[Z].distSq > Q.distSq) {
                      R.splice(Z, 0, Q);
                      Q = null;
                      break;
                    }
                  null == Q || 0 != R.length && R[R.length - 1].x === Q.x && R[R.length - 1].y === Q.y || R.push(Q);
                }
              }
          }
          for (V = 0; V < R.length; V++)
            A = D(1, R[V].x, R[V].y) || A;
        }
        Q = x[x.length - 1];
        A = D(0, Q.x, Q.y) || A;
      }
      p.routedPoints = C;
      return A;
    }
    return !1;
  };
  var d = mxConnector.prototype.paintLine;
  mxConnector.prototype.paintLine = function(p, x, A) {
    this.routedPoints = null != this.state ? this.state.routedPoints : null;
    if (this.outline || null == this.state || null == this.style || null == this.state.routedPoints || 0 == this.state.routedPoints.length)
      d.apply(this, arguments);
    else {
      var C = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2,
        D = (parseInt(mxUtils.getValue(this.style, 'jumpSize', Graph.defaultJumpSize)) - 2) / 2 + this.strokewidth,
        G = mxUtils.getValue(this.style, 'jumpStyle', 'none'),
        F = !0,
        K = null,
        P = null,
        R = [],
        Q = null;
      p.begin();
      for (var ba = 0; ba < this.state.routedPoints.length; ba++) {
        var V = this.state.routedPoints[ba],
          T = new mxPoint(V.x / this.scale, V.y / this.scale);
        0 == ba ? T = x[0] : ba == this.state.routedPoints.length - 1 && (T = x[x.length - 1]);
        var Z = !1;
        if (null != K && 1 == V.type) {
          var ma = this.state.routedPoints[ba + 1];
          V = ma.x / this.scale - T.x;
          ma = ma.y / this.scale - T.y;
          V = V * V + ma * ma;
          null == Q && (Q = new mxPoint(T.x - K.x, T.y - K.y), P = Math.sqrt(Q.x * Q.x + Q.y * Q.y), 0 < P ? (Q.x = Q.x * D / P, Q.y = Q.y * D / P) : Q = null);
          V > D * D && 0 < P && (V = K.x - T.x, ma = K.y - T.y, V = V * V + ma * ma, V > D * D && (Z = new mxPoint(T.x - Q.x, T.y - Q.y), V = new mxPoint(T.x + Q.x, T.y + Q.y), R.push(Z), this.addPoints(p, R, A, C, !1, null, F), R = 0 > Math.round(Q.x) || 0 == Math.round(Q.x) && 0 >= Math.round(Q.y) ? 1 : -1, F = !1, 'sharp' == G ? (p.lineTo(Z.x - Q.y * R, Z.y + Q.x * R), p.lineTo(V.x - Q.y * R, V.y + Q.x * R), p.lineTo(V.x, V.y)) : 'line' == G ? (p.moveTo(Z.x + Q.y * R, Z.y - Q.x * R), p.lineTo(Z.x - Q.y * R, Z.y + Q.x * R), p.moveTo(V.x - Q.y * R, V.y + Q.x * R), p.lineTo(V.x + Q.y * R, V.y - Q.x * R), p.moveTo(V.x, V.y)) : 'arc' == G ? (R *= 1.3, p.curveTo(Z.x - Q.y * R, Z.y + Q.x * R, V.x - Q.y * R, V.y + Q.x * R, V.x, V.y)) : (p.moveTo(V.x, V.y), F = !0), R = [V], Z = !0));
        } else
          Q = null;
        Z || (R.push(T), K = T);
      }
      this.addPoints(p, R, A, C, !1, null, F);
      p.stroke();
    }
  };
  var h = mxGraphView.prototype.getFixedTerminalPoint;
  mxGraphView.prototype.getFixedTerminalPoint = function(p, x, A, C) {
    return null != x && 'centerPerimeter' == x.style[mxConstants.STYLE_PERIMETER] ? new mxPoint(x.getCenterX(), x.getCenterY()) : h.apply(this, arguments);
  };
  var n = mxGraphView.prototype.updateFloatingTerminalPoint;
  mxGraphView.prototype.updateFloatingTerminalPoint = function(p, x, A, C) {
    if (null == x || null == p || '1' != x.style.snapToPoint && '1' != p.style.snapToPoint)
      n.apply(this, arguments);
    else {
      x = this.getTerminalPort(p, x, C);
      var D = this.getNextPoint(p, A, C),
        G = this.graph.isOrthogonal(p),
        F = mxUtils.toRadians(Number(x.style[mxConstants.STYLE_ROTATION] || '0')),
        K = new mxPoint(x.getCenterX(), x.getCenterY());
      if (0 != F) {
        var P = Math.cos(-F),
          R = Math.sin(-F);
        D = mxUtils.getRotatedPoint(D, P, R, K);
      }
      P = parseFloat(p.style[mxConstants.STYLE_PERIMETER_SPACING] || 0);
      P += parseFloat(p.style[C ? mxConstants.STYLE_SOURCE_PERIMETER_SPACING : mxConstants.STYLE_TARGET_PERIMETER_SPACING] || 0);
      D = this.getPerimeterPoint(x, D, 0 == F && G, P);
      0 != F && (P = Math.cos(F), R = Math.sin(F), D = mxUtils.getRotatedPoint(D, P, R, K));
      p.setAbsoluteTerminalPoint(this.snapToAnchorPoint(p, x, A, C, D), C);
    }
  };
  mxGraphView.prototype.snapToAnchorPoint = function(p, x, A, C, D) {
    if (null != x && null != p) {
      p = this.graph.getAllConnectionConstraints(x);
      C = A = null;
      if (null != p)
        for (var G = 0; G < p.length; G++) {
          var F = this.graph.getConnectionPoint(x, p[G]);
          if (null != F) {
            var K = (F.x - D.x) * (F.x - D.x) + (F.y - D.y) * (F.y - D.y);
            if (null == C || K < C)
              A = F, C = K;
          }
        }
      null != A && (D = A);
    }
    return D;
  };
  var u = mxStencil.prototype.evaluateTextAttribute;
  mxStencil.prototype.evaluateTextAttribute = function(p, x, A) {
    var C = u.apply(this, arguments);
    '1' == p.getAttribute('placeholders') && null != A.state && (C = A.state.view.graph.replacePlaceholders(A.state.cell, C));
    return C;
  };
  var m = mxCellRenderer.prototype.createShape;
  mxCellRenderer.prototype.createShape = function(p) {
    if (null != p.style && 'undefined' !== typeof pako) {
      var x = mxUtils.getValue(p.style, mxConstants.STYLE_SHAPE, null);
      if (null != x && 'string' === typeof x && 'stencil(' == x.substring(0, 8))
        try {
          var A = x.substring(8, x.length - 1),
            C = mxUtils.parseXml(Graph.decompress(A));
          return new mxShape(new mxStencil(C.documentElement));
        } catch (D) {
          null != window.console && console.log('Error in shape: ' + D);
        }
    }
    return m.apply(this, arguments);
  };
}());
mxStencilRegistry.libraries = {};
mxStencilRegistry.dynamicLoading = !0;
mxStencilRegistry.allowEval = !0;
mxStencilRegistry.packages = [];
mxStencilRegistry.filesLoaded = {};
mxStencilRegistry.getStencil = function(a) {
  var b = mxStencilRegistry.stencils[a];
  if (null == b && null == mxCellRenderer.defaultShapes[a] && mxStencilRegistry.dynamicLoading) {
    var f = mxStencilRegistry.getBasenameForStencil(a);
    if (null != f) {
      b = mxStencilRegistry.libraries[f];
      if (null != b) {
        if (null == mxStencilRegistry.packages[f]) {
          for (var e = 0; e < b.length; e++) {
            var g = b[e];
            if (!mxStencilRegistry.filesLoaded[g])
              if (mxStencilRegistry.filesLoaded[g] = !0, '.xml' == g.toLowerCase().substring(g.length - 4, g.length))
                mxStencilRegistry.loadStencilSet(g, null);
              else if ('.js' == g.toLowerCase().substring(g.length - 3, g.length))
              try {
                if (mxStencilRegistry.allowEval) {
                  var d = mxUtils.load(g);
                  null != d && 200 <= d.getStatus() && 299 >= d.getStatus() && eval.call(window, d.getText());
                }
              } catch (h) {
                null != window.console && console.log('error in getStencil:', a, f, b, g, h);
              }
          }
          mxStencilRegistry.packages[f] = 1;
        }
      } else
        f = f.replace('_-_', '_'), mxStencilRegistry.loadStencilSet(STENCIL_PATH + '/' + f + '.xml', null);
      b = mxStencilRegistry.stencils[a];
    }
  }
  return b;
};
mxStencilRegistry.getBasenameForStencil = function(a) {
  var b = null;
  if (null != a && 'string' === typeof a && (a = a.split('.'), 0 < a.length && 'mxgraph' == a[0])) {
    b = a[1];
    for (var f = 2; f < a.length - 1; f++)
      b += '/' + a[f];
  }
  return b;
};
mxStencilRegistry.loadStencilSet = function(a, b, f, e) {
  var g = mxStencilRegistry.packages[a];
  if (null != f && f || null == g) {
    var d = !1;
    if (null == g)
      try {
        if (e) {
          mxStencilRegistry.loadStencil(a, mxUtils.bind(this, function(h) {
            null != h && null != h.documentElement && (mxStencilRegistry.packages[a] = h, d = !0, mxStencilRegistry.parseStencilSet(h.documentElement, b, d));
          }));
          return;
        }
        g = mxStencilRegistry.loadStencil(a);
        mxStencilRegistry.packages[a] = g;
        d = !0;
      } catch (h) {
        null != window.console && console.log('error in loadStencilSet:', a, h);
      }
    null != g && null != g.documentElement && mxStencilRegistry.parseStencilSet(g.documentElement, b, d);
  }
};
mxStencilRegistry.loadStencil = function(a, b) {
  if (null != b)
    mxUtils.get(a, mxUtils.bind(this, function(f) {
      b(200 <= f.getStatus() && 299 >= f.getStatus() ? f.getXml() : null);
    }));
  else
    return mxUtils.load(a).getXml();
};
mxStencilRegistry.parseStencilSets = function(a) {
  for (var b = 0; b < a.length; b++)
    mxStencilRegistry.parseStencilSet(mxUtils.parseXml(a[b]).documentElement);
};
mxStencilRegistry.parseStencilSet = function(a, b, f) {
  if ('stencils' == a.nodeName)
    for (var e = a.firstChild; null != e;)
      'shapes' == e.nodeName && mxStencilRegistry.parseStencilSet(e, b, f), e = e.nextSibling;
  else {
    f = null != f ? f : !0;
    e = a.firstChild;
    var g = '';
    a = a.getAttribute('name');
    for (null != a && (g = a + '.'); null != e;) {
      if (e.nodeType == mxConstants.NODETYPE_ELEMENT && (a = e.getAttribute('name'), null != a)) {
        g = g.toLowerCase();
        var d = a.replace(/ /g, '_');
        f && mxStencilRegistry.addStencil(g + d.toLowerCase(), new mxStencil(e));
        if (null != b) {
          var h = e.getAttribute('w'),
            n = e.getAttribute('h');
          h = null == h ? 80 : parseInt(h, 10);
          n = null == n ? 80 : parseInt(n, 10);
          b(g, d, a, h, n);
        }
      }
      e = e.nextSibling;
    }
  }
};
'undefined' !== typeof mxVertexHandler && function() {
  function a() {
    var t = document.createElement('div');
    t.className = 'geHint';
    t.style.whiteSpace = 'nowrap';
    t.style.position = 'absolute';
    return t;
  }

  function b(t, z) {
    switch (z) {
      case mxConstants.POINTS:
        return t;
      case mxConstants.MILLIMETERS:
        return (t / mxConstants.PIXELS_PER_MM).toFixed(1);
      case mxConstants.METERS:
        return (t / (1000 * mxConstants.PIXELS_PER_MM)).toFixed(4);
      case mxConstants.INCHES:
        return (t / mxConstants.PIXELS_PER_INCH).toFixed(2);
    }
  }
  mxConstants.HANDLE_FILLCOLOR = '#29b6f2';
  mxConstants.HANDLE_STROKECOLOR = '#0088cf';
  mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff';
  mxConstants.OUTLINE_COLOR = '#00a8ff';
  mxConstants.OUTLINE_HANDLE_FILLCOLOR = '#99ccff';
  mxConstants.OUTLINE_HANDLE_STROKECOLOR = '#00a8ff';
  mxConstants.CONNECT_HANDLE_FILLCOLOR = '#cee7ff';
  mxConstants.EDGE_SELECTION_COLOR = '#00a8ff';
  mxConstants.DEFAULT_VALID_COLOR = '#00a8ff';
  mxConstants.LABEL_HANDLE_FILLCOLOR = '#cee7ff';
  mxConstants.GUIDE_COLOR = '#0088cf';
  mxConstants.HIGHLIGHT_OPACITY = 30;
  mxConstants.HIGHLIGHT_SIZE = 5;
  mxWindow.prototype.closeImage = Graph.createSvgImage(18, 10, '<path d="M 5 1 L 13 9 M 13 1 L 5 9" stroke="#707070" stroke-width="2"/>').src;
  mxWindow.prototype.minimizeImage = Graph.createSvgImage(14, 10, '<path d="M 3 7 L 7 3 L 11 7" stroke="#707070" stroke-width="2" fill="none"/>').src;
  mxWindow.prototype.normalizeImage = Graph.createSvgImage(14, 10, '<path d="M 3 3 L 7 7 L 11 3" stroke="#707070" stroke-width="2" fill="none"/>').src;
  mxWindow.prototype.resizeImage = Graph.createSvgImage(10, 10, '<path d="Z" stroke="#C0C0C0" stroke-width="1" fill="none"/>').src;
  mxEdgeHandler.prototype.snapToTerminals = !0;
  mxGraphHandler.prototype.guidesEnabled = !0;
  mxGraphHandler.prototype.removeEmptyParents = !0;
  mxRubberband.prototype.fadeOut = !0;
  mxGuide.prototype.isEnabledForEvent = function(t) {
    return !mxEvent.isAltDown(t);
  };
  var f = mxGraphLayout.prototype.isVertexIgnored;
  mxGraphLayout.prototype.isVertexIgnored = function(t) {
    return f.apply(this, arguments) || this.graph.isTableRow(t) || this.graph.isTableCell(t);
  };
  var e = mxGraphLayout.prototype.isEdgeIgnored;
  mxGraphLayout.prototype.isEdgeIgnored = function(t) {
    return e.apply(this, arguments) || this.graph.isEdgeIgnored(t);
  };
  var g = mxConnectionHandler.prototype.isCreateTarget;
  mxConnectionHandler.prototype.isCreateTarget = function(t) {
    return this.graph.isCloneEvent(t) != g.apply(this, arguments);
  };
  mxConstraintHandler.prototype.createHighlightShape = function() {
    var t = new mxEllipse(null, this.highlightColor, this.highlightColor, 0);
    t.opacity = mxConstants.HIGHLIGHT_OPACITY;
    return t;
  };
  mxConnectionHandler.prototype.livePreview = !0;
  mxConnectionHandler.prototype.cursor = 'crosshair';
  mxConnectionHandler.prototype.createEdgeState = function(t) {
    t = this.graph.createCurrentEdgeStyle();
    t = this.graph.createEdge(null, null, null, null, null, t);
    t = new mxCellState(this.graph.view, t, this.graph.getCellStyle(t));
    for (var z in this.graph.currentEdgeStyle)
      t.style[z] = this.graph.currentEdgeStyle[z];
    if (null != this.previous) {
      var B = this.previous.style.newEdgeStyle;
      if (null != B)
        try {
          var E = JSON.parse(B);
          for (z in E)
            t.style[z] = E[z];
        } catch (J) {}
    }
    t.style = this.graph.postProcessCellStyle(t.cell, t.style);
    return t;
  };
  var d = mxConnectionHandler.prototype.createShape;
  mxConnectionHandler.prototype.createShape = function() {
    var t = d.apply(this, arguments);
    t.isDashed = '1' == this.graph.currentEdgeStyle[mxConstants.STYLE_DASHED];
    return t;
  };
  mxConnectionHandler.prototype.updatePreview = function(t) {};
  var h = mxConnectionHandler.prototype.createMarker;
  mxConnectionHandler.prototype.createMarker = function() {
    var t = h.apply(this, arguments),
      z = t.getCell;
    t.getCell = mxUtils.bind(this, function(B) {
      var E = z.apply(this, arguments);
      this.error = null;
      return E;
    });
    return t;
  };
  Graph.prototype.defaultVertexStyle = {};
  Graph.prototype.defaultEdgeStyle = {
    edgeStyle: 'orthogonalEdgeStyle',
    rounded: '0',
    jettySize: 'auto',
    orthogonalLoop: '1'
  };
  Graph.prototype.createCurrentEdgeStyle = function() {
    for (var t = 'edgeStyle=' + (this.currentEdgeStyle.edgeStyle || 'none') + ';', z = 'shape curved rounded comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification comicStyle jumpStyle jumpSize'.split(' '), B = 0; B < z.length; B++)
      null != this.currentEdgeStyle[z[B]] && (t += z[B] + '=' + this.currentEdgeStyle[z[B]] + ';');
    null != this.currentEdgeStyle.orthogonalLoop ? t += 'orthogonalLoop=' + this.currentEdgeStyle.orthogonalLoop + ';' : null != Graph.prototype.defaultEdgeStyle.orthogonalLoop && (t += 'orthogonalLoop=' + Graph.prototype.defaultEdgeStyle.orthogonalLoop + ';');
    null != this.currentEdgeStyle.jettySize ? t += 'jettySize=' + this.currentEdgeStyle.jettySize + ';' : null != Graph.prototype.defaultEdgeStyle.jettySize && (t += 'jettySize=' + Graph.prototype.defaultEdgeStyle.jettySize + ';');
    'elbowEdgeStyle' == this.currentEdgeStyle.edgeStyle && null != this.currentEdgeStyle.elbow && (t += 'elbow=' + this.currentEdgeStyle.elbow + ';');
    return t = null != this.currentEdgeStyle.html ? t + ('html=' + this.currentEdgeStyle.html + ';') : t + 'html=1;';
  };
  Graph.prototype.getPagePadding = function() {
    return new mxPoint(0, 0);
  };
  Graph.prototype.loadStylesheet = function() {
    var t = null != this.themes ? this.themes[this.defaultThemeName] : mxStyleRegistry.dynamicLoading ? mxUtils.load(STYLE_PATH + '/default.xml').getDocumentElement() : null;
    null != t && new mxCodec(t.ownerDocument).decode(t, this.getStylesheet());
  };
  Graph.prototype.createCellLookup = function(t, z) {
    z = null != z ? z : {};
    for (var B = 0; B < t.length; B++) {
      var E = t[B];
      z[mxObjectIdentity.get(E)] = E.getId();
      for (var J = this.model.getChildCount(E), M = 0; M < J; M++)
        this.createCellLookup([this.model.getChildAt(E, M)], z);
    }
    return z;
  };
  Graph.prototype.createCellMapping = function(t, z, B) {
    B = null != B ? B : {};
    for (var E in t) {
      var J = z[E];
      null == B[J] && (B[J] = t[E].getId() || '');
    }
    return B;
  };
  Graph.prototype.importGraphModel = function(t, z, B, E) {
    z = null != z ? z : 0;
    B = null != B ? B : 0;
    var J = new mxCodec(t.ownerDocument),
      M = new mxGraphModel();
    J.decode(t, M);
    t = [];
    J = {};
    var W = {},
      ha = M.getChildren(this.cloneCell(M.root, this.isCloneInvalidEdges(), J));
    if (null != ha) {
      var da = this.createCellLookup([M.root]);
      ha = ha.slice();
      this.model.beginUpdate();
      try {
        if (1 != ha.length || this.isCellLocked(this.getDefaultParent()))
          for (M = 0; M < ha.length; M++)
            fa = this.model.getChildren(this.moveCells([ha[M]], z, B, !1, this.model.getRoot())[0]), null != fa && (t = t.concat(fa));
        else {
          var fa = M.getChildren(ha[0]);
          null != fa && (t = this.moveCells(fa, z, B, !1, this.getDefaultParent()), W[M.getChildAt(M.root, 0).getId()] = this.getDefaultParent().getId());
        }
        if (null != t && (this.createCellMapping(J, da, W), this.updateCustomLinks(W, t), E)) {
          this.isGridEnabled() && (z = this.snap(z), B = this.snap(B));
          var sa = this.getBoundingBoxFromGeometry(t, !0);
          null != sa && this.moveCells(t, z - sa.x, B - sa.y);
        }
      } finally {
        this.model.endUpdate();
      }
    }
    return t;
  };
  Graph.prototype.encodeCells = function(t) {
    for (var z = {}, B = this.cloneCells(t, null, z), E = new mxDictionary(), J = 0; J < t.length; J++)
      E.put(t[J], !0);
    var M = new mxCodec(),
      W = new mxGraphModel(),
      ha = W.getChildAt(W.getRoot(), 0);
    for (J = 0; J < B.length; J++) {
      W.add(ha, B[J]);
      var da = this.view.getState(t[J]);
      if (null != da) {
        var fa = this.getCellGeometry(B[J]);
        null != fa && fa.relative && !this.model.isEdge(t[J]) && null == E.get(this.model.getParent(t[J])) && (fa.offset = null, fa.relative = !1, fa.x = da.x / da.view.scale - da.view.translate.x, fa.y = da.y / da.view.scale - da.view.translate.y);
      }
    }
    this.updateCustomLinks(this.createCellMapping(z, this.createCellLookup(t)), B);
    return M.encode(W);
  };
  Graph.prototype.isSwimlane = function(t, z) {
    var B = null;
    null == t || this.model.isEdge(t) || this.model.getParent(t) == this.model.getRoot() || (B = this.getCurrentCellStyle(t, z)[mxConstants.STYLE_SHAPE]);
    return B == mxConstants.SHAPE_SWIMLANE || 'table' == B || 'tableRow' == B;
  };
  var n = Graph.prototype.isCellEditable;
  Graph.prototype.isCellEditable = function(t) {
    return null != t && n.apply(this, arguments) ? this.isTableCell(t) || this.isTableRow(t) ? this.isCellEditable(this.model.getParent(t)) : !0 : !1;
  };
  var u = Graph.prototype.isCellMovable;
  Graph.prototype.isCellMovable = function(t) {
    return null != t && u.apply(this, arguments) ? this.isTableCell(t) || this.isTableRow(t) ? this.isCellMovable(this.model.getParent(t)) : !0 : !1;
  };
  var m = Graph.prototype.isExtendParent;
  Graph.prototype.isExtendParent = function(t) {
    var z = this.model.getParent(t);
    if (null != z) {
      var B = this.getCurrentCellStyle(z);
      if (null != B.expand)
        return '0' != B.expand;
    }
    return m.apply(this, arguments) && (null == z || !this.isTable(z));
  };
  var p = Graph.prototype.splitEdge;
  Graph.prototype.splitEdge = function(t, z, B, E, J, M, W, ha) {
    null == ha && (ha = this.model.getParent(t), this.isTable(ha) || this.isTableRow(ha)) && (ha = this.getCellAt(M, W, null, !0, !1));
    B = null;
    this.model.beginUpdate();
    try {
      B = p.apply(this, [
        t,
        z,
        B,
        E,
        J,
        M,
        W,
        ha
      ]);
      this.model.setValue(B, '');
      var da = this.getChildCells(B, !0);
      for (z = 0; z < da.length; z++) {
        var fa = this.getCellGeometry(da[z]);
        null != fa && fa.relative && 0 < fa.x && this.model.remove(da[z]);
      }
      var sa = this.getChildCells(t, !0);
      for (z = 0; z < sa.length; z++)
        fa = this.getCellGeometry(sa[z]), null != fa && fa.relative && 0 >= fa.x && this.model.remove(sa[z]);
      this.setCellStyles(mxConstants.STYLE_TARGET_PERIMETER_SPACING, null, [B]);
      this.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.NONE, [B]);
      this.setCellStyles(mxConstants.STYLE_SOURCE_PERIMETER_SPACING, null, [t]);
      this.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.NONE, [t]);
      var Ja = this.model.getTerminal(B, !1);
      if (null != Ja) {
        var Na = this.getCurrentCellStyle(Ja);
        null != Na && '1' == Na.snapToPoint && (this.setCellStyles(mxConstants.STYLE_EXIT_X, null, [t]), this.setCellStyles(mxConstants.STYLE_EXIT_Y, null, [t]), this.setCellStyles(mxConstants.STYLE_ENTRY_X, null, [B]), this.setCellStyles(mxConstants.STYLE_ENTRY_Y, null, [B]));
      }
    } finally {
      this.model.endUpdate();
    }
    return B;
  };
  var x = Graph.prototype.selectCell;
  Graph.prototype.selectCell = function(t, z, B) {
    if (z || B)
      x.apply(this, arguments);
    else {
      var E = this.getSelectionCell(),
        J = null,
        M = [],
        W = mxUtils.bind(this, function(ha) {
          if (null != this.view.getState(ha) && (this.model.isVertex(ha) || this.model.isEdge(ha)))
            if (M.push(ha), ha == E)
              J = M.length - 1;
            else if (t && null == E && 0 < M.length || null != J && t && M.length > J || !t && 0 < J)
            return;
          for (var da = 0; da < this.model.getChildCount(ha); da++)
            W(this.model.getChildAt(ha, da));
        });
      W(this.model.root);
      0 < M.length && (J = null != J ? mxUtils.mod(J + (t ? 1 : -1), M.length) : 0, this.setSelectionCell(M[J]));
    }
  };
  Graph.prototype.swapShapes = function(t, z, B, E, J, M, W) {
    z = !1;
    if (!E && null != J && 1 == t.length && (E = this.view.getState(J), B = this.view.getState(t[0]), null != E && null != B && (null != M && mxEvent.isShiftDown(M) || 'umlLifeline' == E.style.shape && 'umlLifeline' == B.style.shape) && (E = this.getCellGeometry(J), M = this.getCellGeometry(t[0]), null != E && null != M))) {
      z = E.clone();
      E = M.clone();
      E.x = z.x;
      E.y = z.y;
      z.x = M.x;
      z.y = M.y;
      this.model.beginUpdate();
      try {
        this.model.setGeometry(J, z), this.model.setGeometry(t[0], E);
      } finally {
        this.model.endUpdate();
      }
      z = !0;
    }
    return z;
  };
  var A = Graph.prototype.moveCells;
  Graph.prototype.moveCells = function(t, z, B, E, J, M, W) {
    if (this.swapShapes(t, z, B, E, J, M, W))
      return t;
    W = null != W ? W : {};
    if (this.isTable(J)) {
      for (var ha = [], da = 0; da < t.length; da++)
        this.isTable(t[da]) ? ha = ha.concat(this.model.getChildCells(t[da], !0).reverse()) : ha.push(t[da]);
      t = ha;
    }
    this.model.beginUpdate();
    try {
      ha = [];
      for (da = 0; da < t.length; da++)
        if (null != J && this.isTableRow(t[da])) {
          var fa = this.model.getParent(t[da]),
            sa = this.getCellGeometry(t[da]);
          this.isTable(fa) && ha.push(fa);
          if (null != fa && null != sa && this.isTable(fa) && this.isTable(J) && (E || fa != J)) {
            if (!E) {
              var Ja = this.getCellGeometry(fa);
              null != Ja && (Ja = Ja.clone(), Ja.height -= sa.height, this.model.setGeometry(fa, Ja));
            }
            Ja = this.getCellGeometry(J);
            null != Ja && (Ja = Ja.clone(), Ja.height += sa.height, this.model.setGeometry(J, Ja));
            var Na = this.model.getChildCells(J, !0);
            if (0 < Na.length) {
              t[da] = E ? this.cloneCell(t[da]) : t[da];
              var Ma = this.model.getChildCells(t[da], !0),
                Ka = this.model.getChildCells(Na[0], !0),
                va = Ka.length - Ma.length;
              if (0 < va)
                for (var ya = 0; ya < va; ya++) {
                  var Ta = this.cloneCell(Ma[Ma.length - 1]);
                  null != Ta && (Ta.value = '', this.model.add(t[da], Ta));
                }
              else if (0 > va)
                for (ya = 0; ya > va; ya--)
                  this.model.remove(Ma[Ma.length + ya - 1]);
              Ma = this.model.getChildCells(t[da], !0);
              for (ya = 0; ya < Ka.length; ya++) {
                var Ra = this.getCellGeometry(Ka[ya]),
                  Oa = this.getCellGeometry(Ma[ya]);
                null != Ra && null != Oa && (Oa = Oa.clone(), Oa.width = Ra.width, this.model.setGeometry(Ma[ya], Oa));
              }
            }
          }
        }
      var Pa = A.apply(this, arguments);
      for (da = 0; da < ha.length; da++)
        !E && this.model.contains(ha[da]) && 0 == this.model.getChildCount(ha[da]) && this.model.remove(ha[da]);
      E && this.updateCustomLinks(this.createCellMapping(W, this.createCellLookup(t)), Pa);
    } finally {
      this.model.endUpdate();
    }
    return Pa;
  };
  var C = Graph.prototype.removeCells;
  Graph.prototype.removeCells = function(t, z) {
    var B = [];
    this.model.beginUpdate();
    try {
      for (var E = 0; E < t.length; E++)
        if (this.isTableCell(t[E])) {
          var J = this.model.getParent(t[E]),
            M = this.model.getParent(J);
          1 == this.model.getChildCount(J) && 1 == this.model.getChildCount(M) ? 0 > mxUtils.indexOf(t, M) && 0 > mxUtils.indexOf(B, M) && B.push(M) : this.labelChanged(t[E], '');
        } else {
          if (this.isTableRow(t[E]) && (M = this.model.getParent(t[E]), 0 > mxUtils.indexOf(t, M) && 0 > mxUtils.indexOf(B, M))) {
            for (var W = this.model.getChildCells(M, !0), ha = 0, da = 0; da < W.length; da++)
              0 <= mxUtils.indexOf(t, W[da]) && ha++;
            ha == W.length && B.push(M);
          }
          B.push(t[E]);
        }
      B = C.apply(this, [
        B,
        z
      ]);
    } finally {
      this.model.endUpdate();
    }
    return B;
  };
  Graph.prototype.updateCustomLinks = function(t, z, B) {
    B = null != B ? B : new Graph();
    for (var E = 0; E < z.length; E++)
      null != z[E] && B.updateCustomLinksForCell(t, z[E], B);
  };
  Graph.prototype.updateCustomLinksForCell = function(t, z) {
    this.doUpdateCustomLinksForCell(t, z);
    for (var B = this.model.getChildCount(z), E = 0; E < B; E++)
      this.updateCustomLinksForCell(t, this.model.getChildAt(z, E));
  };
  Graph.prototype.doUpdateCustomLinksForCell = function(t, z) {};
  Graph.prototype.getAllConnectionConstraints = function(t, z) {
    if (null != t) {
      z = mxUtils.getValue(t.style, 'points', null);
      if (null != z) {
        t = [];
        try {
          var B = JSON.parse(z);
          for (z = 0; z < B.length; z++) {
            var E = B[z];
            t.push(new mxConnectionConstraint(new mxPoint(E[0], E[1]), 2 < E.length ? '0' != E[2] : !0, null, 3 < E.length ? E[3] : 0, 4 < E.length ? E[4] : 0));
          }
        } catch (M) {}
        return t;
      }
      if (null != t.shape && null != t.shape.bounds) {
        E = t.shape.direction;
        z = t.shape.bounds;
        var J = t.shape.scale;
        B = z.width / J;
        z = z.height / J;
        if (E == mxConstants.DIRECTION_NORTH || E == mxConstants.DIRECTION_SOUTH)
          E = B, B = z, z = E;
        z = t.shape.getConstraints(t.style, B, z);
        if (null != z)
          return z;
        if (null != t.shape.stencil && null != t.shape.stencil.constraints)
          return t.shape.stencil.constraints;
        if (null != t.shape.constraints)
          return t.shape.constraints;
      }
    }
    return null;
  };
  Graph.prototype.flipEdge = function(t) {
    if (null != t) {
      var z = this.getCurrentCellStyle(t);
      z = mxUtils.getValue(z, mxConstants.STYLE_ELBOW, mxConstants.ELBOW_HORIZONTAL) == mxConstants.ELBOW_HORIZONTAL ? mxConstants.ELBOW_VERTICAL : mxConstants.ELBOW_HORIZONTAL;
      this.setCellStyles(mxConstants.STYLE_ELBOW, z, [t]);
    }
  };
  Graph.prototype.isValidRoot = function(t) {
    for (var z = this.model.getChildCount(t), B = 0, E = 0; E < z; E++) {
      var J = this.model.getChildAt(t, E);
      this.model.isVertex(J) && (J = this.getCellGeometry(J), null == J || J.relative || B++);
    }
    return 0 < B || this.isContainer(t);
  };
  Graph.prototype.isValidDropTarget = function(t, z, B) {
    for (var E = this.getCurrentCellStyle(t), J = !0, M = !0, W = 0; W < z.length && M; W++)
      J = J && this.isTable(z[W]), M = M && this.isTableRow(z[W]);
    return (1 == z.length && null != B && mxEvent.isShiftDown(B) && !mxEvent.isControlDown(B) && !mxEvent.isAltDown(B) || ('1' != mxUtils.getValue(E, 'part', '0') || this.isContainer(t)) && '0' != mxUtils.getValue(E, 'dropTarget', '1') && (mxGraph.prototype.isValidDropTarget.apply(this, arguments) || this.isContainer(t)) && !this.isTableRow(t) && (!this.isTable(t) || M || J)) && !this.isCellLocked(t);
  };
  Graph.prototype.createGroupCell = function() {
    var t = mxGraph.prototype.createGroupCell.apply(this, arguments);
    t.setStyle('group');
    return t;
  };
  Graph.prototype.isExtendParentsOnAdd = function(t) {
    var z = mxGraph.prototype.isExtendParentsOnAdd.apply(this, arguments);
    if (z && null != t && null != this.layoutManager) {
      var B = this.model.getParent(t);
      null != B && (B = this.layoutManager.getLayout(B), null != B && B.constructor == mxStackLayout && (z = !1));
    }
    return z;
  };
  Graph.prototype.getPreferredSizeForCell = function(t) {
    var z = mxGraph.prototype.getPreferredSizeForCell.apply(this, arguments);
    null != z && (z.width += 10, z.height += 4, this.gridEnabled && (z.width = this.snap(z.width), z.height = this.snap(z.height)));
    return z;
  };
  Graph.prototype.turnShapes = function(t, z) {
    var B = this.getModel(),
      E = [];
    B.beginUpdate();
    try {
      for (var J = 0; J < t.length; J++) {
        var M = t[J];
        if (B.isEdge(M)) {
          var W = B.getTerminal(M, !0),
            ha = B.getTerminal(M, !1);
          B.setTerminal(M, ha, !0);
          B.setTerminal(M, W, !1);
          var da = B.getGeometry(M);
          if (null != da) {
            da = da.clone();
            null != da.points && da.points.reverse();
            var fa = da.getTerminalPoint(!0),
              sa = da.getTerminalPoint(!1);
            da.setTerminalPoint(fa, !1);
            da.setTerminalPoint(sa, !0);
            B.setGeometry(M, da);
            var Ja = this.view.getState(M),
              Na = this.view.getState(W),
              Ma = this.view.getState(ha);
            if (null != Ja) {
              var Ka = null != Na ? this.getConnectionConstraint(Ja, Na, !0) : null,
                va = null != Ma ? this.getConnectionConstraint(Ja, Ma, !1) : null;
              this.setConnectionConstraint(M, W, !0, va);
              this.setConnectionConstraint(M, ha, !1, Ka);
              var ya = mxUtils.getValue(Ja.style, mxConstants.STYLE_SOURCE_PERIMETER_SPACING);
              this.setCellStyles(mxConstants.STYLE_SOURCE_PERIMETER_SPACING, mxUtils.getValue(Ja.style, mxConstants.STYLE_TARGET_PERIMETER_SPACING), [M]);
              this.setCellStyles(mxConstants.STYLE_TARGET_PERIMETER_SPACING, ya, [M]);
            }
            E.push(M);
          }
        } else if (B.isVertex(M) && (da = this.getCellGeometry(M), null != da)) {
          if (!(this.isTable(M) || this.isTableRow(M) || this.isTableCell(M) || this.isSwimlane(M))) {
            da = da.clone();
            da.x += da.width / 2 - da.height / 2;
            da.y += da.height / 2 - da.width / 2;
            var Ta = da.width;
            da.width = da.height;
            da.height = Ta;
            B.setGeometry(M, da);
          }
          var Ra = this.view.getState(M);
          if (null != Ra) {
            var Oa = [
                mxConstants.DIRECTION_EAST,
                mxConstants.DIRECTION_SOUTH,
                mxConstants.DIRECTION_WEST,
                mxConstants.DIRECTION_NORTH
              ],
              Pa = mxUtils.getValue(Ra.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST);
            this.setCellStyles(mxConstants.STYLE_DIRECTION, Oa[mxUtils.mod(mxUtils.indexOf(Oa, Pa) + (z ? -1 : 1), Oa.length)], [M]);
          }
          E.push(M);
        }
      }
    } finally {
      B.endUpdate();
    }
    return E;
  };
  Graph.prototype.stencilHasPlaceholders = function(t) {
    if (null != t && null != t.fgNode)
      for (t = t.fgNode.firstChild; null != t;) {
        if ('text' == t.nodeName && '1' == t.getAttribute('placeholders'))
          return !0;
        t = t.nextSibling;
      }
    return !1;
  };
  var D = Graph.prototype.processChange;
  Graph.prototype.processChange = function(t) {
    if (t instanceof mxGeometryChange && (this.isTableCell(t.cell) || this.isTableRow(t.cell)) && (null == t.previous && null != t.geometry || null != t.previous && !t.previous.equals(t.geometry))) {
      var z = t.cell;
      this.isTableCell(z) && (z = this.model.getParent(z));
      this.isTableRow(z) && (z = this.model.getParent(z));
      var B = this.view.getState(z);
      null != B && null != B.shape && (this.view.invalidate(z), B.shape.bounds = null);
    }
    D.apply(this, arguments);
    t instanceof mxValueChange && null != t.cell && null != t.cell.value && 'object' == typeof t.cell.value && this.invalidateDescendantsWithPlaceholders(t.cell);
  };
  Graph.prototype.invalidateDescendantsWithPlaceholders = function(t) {
    t = this.model.getDescendants(t);
    if (0 < t.length)
      for (var z = 0; z < t.length; z++) {
        var B = this.view.getState(t[z]);
        null != B && null != B.shape && null != B.shape.stencil && this.stencilHasPlaceholders(B.shape.stencil) ? this.removeStateForCell(t[z]) : this.isReplacePlaceholders(t[z]) && this.view.invalidate(t[z], !1, !1);
      }
  };
  Graph.prototype.replaceElement = function(t, z) {
    z = t.ownerDocument.createElement(null != z ? z : 'span');
    for (var B = Array.prototype.slice.call(t.attributes); attr = B.pop();)
      z.setAttribute(attr.nodeName, attr.nodeValue);
    z.innerHTML = t.innerHTML;
    t.parentNode.replaceChild(z, t);
  };
  Graph.prototype.processElements = function(t, z) {
    if (null != t) {
      t = t.getElementsByTagName('*');
      for (var B = 0; B < t.length; B++)
        z(t[B]);
    }
  };
  Graph.prototype.updateLabelElements = function(t, z, B) {
    t = null != t ? t : this.getSelectionCells();
    for (var E = document.createElement('div'), J = 0; J < t.length; J++)
      if (this.isHtmlLabel(t[J])) {
        var M = this.convertValueToString(t[J]);
        if (null != M && 0 < M.length) {
          E.innerHTML = M;
          for (var W = E.getElementsByTagName(null != B ? B : '*'), ha = 0; ha < W.length; ha++)
            z(W[ha]);
          E.innerHTML != M && this.cellLabelChanged(t[J], E.innerHTML);
        }
      }
  };
  Graph.prototype.cellLabelChanged = function(t, z, B) {
    z = Graph.zapGremlins(z);
    this.model.beginUpdate();
    try {
      if (null != t.value && 'object' == typeof t.value) {
        if (this.isReplacePlaceholders(t) && null != t.getAttribute('placeholder'))
          for (var E = t.getAttribute('placeholder'), J = t; null != J;) {
            if (J == this.model.getRoot() || null != J.value && 'object' == typeof J.value && J.hasAttribute(E)) {
              this.setAttributeForCell(J, E, z);
              break;
            }
            J = this.model.getParent(J);
          }
        var M = t.value.cloneNode(!0);
        Graph.translateDiagram && null != Graph.diagramLanguage && M.hasAttribute('label_' + Graph.diagramLanguage) ? M.setAttribute('label_' + Graph.diagramLanguage, z) : M.setAttribute('label', z);
        z = M;
      }
      mxGraph.prototype.cellLabelChanged.apply(this, arguments);
    } finally {
      this.model.endUpdate();
    }
  };
  Graph.prototype.cellsRemoved = function(t) {
    if (null != t) {
      for (var z = new mxDictionary(), B = 0; B < t.length; B++)
        z.put(t[B], !0);
      var E = [];
      for (B = 0; B < t.length; B++) {
        var J = this.model.getParent(t[B]);
        null == J || z.get(J) || (z.put(J, !0), E.push(J));
      }
      for (B = 0; B < E.length; B++)
        if (J = this.view.getState(E[B]), null != J && (this.model.isEdge(J.cell) || this.model.isVertex(J.cell)) && this.isCellDeletable(J.cell) && this.isTransparentState(J)) {
          for (var M = !0, W = 0; W < this.model.getChildCount(J.cell) && M; W++)
            z.get(this.model.getChildAt(J.cell, W)) || (M = !1);
          M && t.push(J.cell);
        }
    }
    mxGraph.prototype.cellsRemoved.apply(this, arguments);
  };
  Graph.prototype.removeCellsAfterUngroup = function(t) {
    for (var z = [], B = 0; B < t.length; B++)
      this.isCellDeletable(t[B]) && this.isTransparentState(this.view.getState(t[B])) && z.push(t[B]);
    t = z;
    mxGraph.prototype.removeCellsAfterUngroup.apply(this, arguments);
  };
  Graph.prototype.setLinkForCell = function(t, z) {
    this.setAttributeForCell(t, 'link', z);
  };
  Graph.prototype.setTooltipForCell = function(t, z) {
    var B = 'tooltip';
    Graph.translateDiagram && null != Graph.diagramLanguage && mxUtils.isNode(t.value) && t.value.hasAttribute('tooltip_' + Graph.diagramLanguage) && (B = 'tooltip_' + Graph.diagramLanguage);
    this.setAttributeForCell(t, B, z);
  };
  Graph.prototype.getAttributeForCell = function(t, z, B) {
    t = null != t.value && 'object' === typeof t.value ? t.value.getAttribute(z) : null;
    return null != t ? t : B;
  };
  Graph.prototype.setAttributeForCell = function(t, z, B) {
    if (null != t.value && 'object' == typeof t.value)
      var E = t.value.cloneNode(!0);
    else
      E = mxUtils.createXmlDocument().createElement('UserObject'), E.setAttribute('label', t.value || '');
    null != B ? E.setAttribute(z, B) : E.removeAttribute(z);
    this.model.setValue(t, E);
  };
  var G = Graph.prototype.getDropTarget;
  Graph.prototype.getDropTarget = function(t, z, B, E) {
    this.getModel();
    if (mxEvent.isAltDown(z))
      return null;
    for (var J = 0; J < t.length; J++) {
      var M = this.model.getParent(t[J]);
      if (this.model.isEdge(M) && 0 > mxUtils.indexOf(t, M))
        return null;
    }
    M = G.apply(this, arguments);
    var W = !0;
    for (J = 0; J < t.length && W; J++)
      W = W && this.isTableRow(t[J]);
    W && (this.isTableCell(M) && (M = this.model.getParent(M)), this.isTableRow(M) && (M = this.model.getParent(M)), this.isTable(M) || (M = null));
    return M;
  };
  Graph.prototype.click = function(t) {
    mxGraph.prototype.click.call(this, t);
    this.firstClickState = t.getState();
    this.firstClickSource = t.getSource();
  };
  Graph.prototype.dblClick = function(t, z) {
    this.isEnabled() && (z = this.insertTextForEvent(t, z), mxGraph.prototype.dblClick.call(this, t, z));
  };
  Graph.prototype.insertTextForEvent = function(t, z) {
    var B = mxUtils.convertPoint(this.container, mxEvent.getClientX(t), mxEvent.getClientY(t));
    if (null != t && !this.model.isVertex(z)) {
      var E = this.model.isEdge(z) ? this.view.getState(z) : null,
        J = mxEvent.getSource(t);
      this.firstClickState != E || this.firstClickSource != J || null != E && null != E.text && null != E.text.node && null != E.text.boundingBox && (mxUtils.contains(E.text.boundingBox, B.x, B.y) || mxUtils.isAncestorNode(E.text.node, mxEvent.getSource(t))) || (null != E || this.isCellLocked(this.getDefaultParent())) && (null == E || this.isCellLocked(E.cell)) || !(null != E || mxClient.IS_SVG && J == this.view.getCanvas().ownerSVGElement) || (null == E && (E = this.view.getState(this.getCellAt(B.x, B.y))), z = this.addText(B.x, B.y, E));
    }
    return z;
  };
  Graph.prototype.getInsertPoint = function() {
    var t = this.getGridSize(),
      z = this.container.scrollLeft / this.view.scale - this.view.translate.x,
      B = this.container.scrollTop / this.view.scale - this.view.translate.y;
    if (this.pageVisible) {
      var E = this.getPageLayout(),
        J = this.getPageSize();
      z = Math.max(z, E.x * J.width);
      B = Math.max(B, E.y * J.height);
    }
    return new mxPoint(this.snap(z + t), this.snap(B + t));
  };
  Graph.prototype.getFreeInsertPoint = function() {
    var t = this.view,
      z = this.getGraphBounds(),
      B = this.getInsertPoint(),
      E = this.snap(Math.round(Math.max(B.x, z.x / t.scale - t.translate.x + (0 == z.width ? 2 * this.gridSize : 0))));
    t = this.snap(Math.round(Math.max(B.y, (z.y + z.height) / t.scale - t.translate.y + 2 * this.gridSize)));
    return new mxPoint(E, t);
  };
  Graph.prototype.getCenterInsertPoint = function(t) {
    t = null != t ? t : new mxRectangle();
    return mxUtils.hasScrollbars(this.container) ? new mxPoint(this.snap(Math.round((this.container.scrollLeft + this.container.clientWidth / 2) / this.view.scale - this.view.translate.x - t.width / 2)), this.snap(Math.round((this.container.scrollTop + this.container.clientHeight / 2) / this.view.scale - this.view.translate.y - t.height / 2))) : new mxPoint(this.snap(Math.round(this.container.clientWidth / 2 / this.view.scale - this.view.translate.x - t.width / 2)), this.snap(Math.round(this.container.clientHeight / 2 / this.view.scale - this.view.translate.y - t.height / 2)));
  };
  Graph.prototype.isMouseInsertPoint = function() {
    return !1;
  };
  Graph.prototype.addText = function(t, z, B) {
    var E = new mxCell();
    E.value = 'Text';
    E.geometry = new mxGeometry(0, 0, 0, 0);
    E.vertex = !0;
    if (null != B && this.model.isEdge(B.cell)) {
      E.style = 'edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];';
      E.geometry.relative = !0;
      E.connectable = !1;
      var J = this.view.getRelativePoint(B, t, z);
      E.geometry.x = Math.round(10000 * J.x) / 10000;
      E.geometry.y = Math.round(J.y);
      E.geometry.offset = new mxPoint(0, 0);
      J = this.view.getPoint(B, E.geometry);
      var M = this.view.scale;
      E.geometry.offset = new mxPoint(Math.round((t - J.x) / M), Math.round((z - J.y) / M));
    } else
      J = this.view.translate, E.style = 'text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];', E.geometry.width = 40, E.geometry.height = 20, E.geometry.x = Math.round(t / this.view.scale) - J.x - (null != B ? B.origin.x : 0), E.geometry.y = Math.round(z / this.view.scale) - J.y - (null != B ? B.origin.y : 0), E.style += 'autosize=1;';
    this.getModel().beginUpdate();
    try {
      this.addCells([E], null != B ? B.cell : null), this.fireEvent(new mxEventObject('textInserted', 'cells', [E])), this.autoSizeCell(E);
    } finally {
      this.getModel().endUpdate();
    }
    return E;
  };
  Graph.prototype.addClickHandler = function(t, z, B) {
    var E = mxUtils.bind(this, function() {
      var da = this.container.getElementsByTagName('a');
      if (null != da)
        for (var fa = 0; fa < da.length; fa++) {
          var sa = this.getAbsoluteUrl(da[fa].getAttribute('href'));
          null != sa && (da[fa].setAttribute('rel', this.linkRelation), da[fa].setAttribute('href', sa), null != z && mxEvent.addGestureListeners(da[fa], null, null, z));
        }
    });
    this.model.addListener(mxEvent.CHANGE, E);
    E();
    var J = this.container.style.cursor,
      M = this.getTolerance(),
      W = this,
      ha = {
        currentState: null,
        currentLink: null,
        currentTarget: null,
        highlight: null != t && '' != t && t != mxConstants.NONE ? new mxCellHighlight(W, t, 4) : null,
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0,
        updateCurrentState: function(da) {
          var fa = da.sourceState;
          if (null == fa || null == W.getLinkForCell(fa.cell))
            da = W.getCellAt(da.getGraphX(), da.getGraphY(), null, null, null, function(sa, Ja, Na) {
              return null == W.getLinkForCell(sa.cell);
            }), fa = null == fa || W.model.isAncestor(da, fa.cell) ? W.view.getState(da) : null;
          fa != this.currentState && (null != this.currentState && this.clear(), this.currentState = fa, null != this.currentState && this.activate(this.currentState));
        },
        mouseDown: function(da, fa) {
          this.startX = fa.getGraphX();
          this.startY = fa.getGraphY();
          this.scrollLeft = W.container.scrollLeft;
          this.scrollTop = W.container.scrollTop;
          null == this.currentLink && 'auto' == W.container.style.overflow && (W.container.style.cursor = 'move');
          this.updateCurrentState(fa);
        },
        mouseMove: function(da, fa) {
          if (W.isMouseDown)
            null != this.currentLink && (da = Math.abs(this.startX - fa.getGraphX()), fa = Math.abs(this.startY - fa.getGraphY()), (da > M || fa > M) && this.clear());
          else {
            for (da = fa.getSource(); null != da && 'a' != da.nodeName.toLowerCase();)
              da = da.parentNode;
            null != da ? this.clear() : (null != W.tooltipHandler && null != this.currentLink && null != this.currentState && W.tooltipHandler.reset(fa, !0, this.currentState), (null == this.currentState || fa.getState() != this.currentState && null != fa.sourceState || !W.intersects(this.currentState, fa.getGraphX(), fa.getGraphY())) && this.updateCurrentState(fa));
          }
        },
        mouseUp: function(da, fa) {
          var sa = fa.getSource();
          for (da = fa.getEvent(); null != sa && 'a' != sa.nodeName.toLowerCase();)
            sa = sa.parentNode;
          null == sa && Math.abs(this.scrollLeft - W.container.scrollLeft) < M && Math.abs(this.scrollTop - W.container.scrollTop) < M && (null == fa.sourceState || !fa.isSource(fa.sourceState.control)) && ((mxEvent.isLeftMouseButton(da) || mxEvent.isMiddleMouseButton(da)) && !mxEvent.isPopupTrigger(da) || mxEvent.isTouchEvent(da)) && (null != this.currentLink ? (sa = W.isBlankLink(this.currentLink), 'data:' !== this.currentLink.substring(0, 5) && sa || null == z || z(da, this.currentLink), mxEvent.isConsumed(da) || (da = null != this.currentTarget ? this.currentTarget : mxEvent.isMiddleMouseButton(da) ? '_blank' : sa ? W.linkTarget : '_top', W.openLink(this.currentLink, da), fa.consume())) : null != B && !fa.isConsumed() && Math.abs(this.scrollLeft - W.container.scrollLeft) < M && Math.abs(this.scrollTop - W.container.scrollTop) < M && Math.abs(this.startX - fa.getGraphX()) < M && Math.abs(this.startY - fa.getGraphY()) < M && B(fa.getEvent()));
          this.clear();
        },
        activate: function(da) {
          this.currentLink = W.getAbsoluteUrl(W.getLinkForCell(da.cell));
          null != this.currentLink && (this.currentTarget = W.getLinkTargetForCell(da.cell), W.container.style.cursor = 'pointer', null != this.highlight && this.highlight.highlight(da));
        },
        clear: function() {
          null != W.container && (W.container.style.cursor = J);
          this.currentLink = this.currentState = this.currentTarget = null;
          null != this.highlight && this.highlight.hide();
          null != W.tooltipHandler && W.tooltipHandler.hide();
        }
      };
    W.click = function(da) {};
    W.addMouseListener(ha);
    mxEvent.addListener(document, 'mouseleave', function(da) {
      ha.clear();
    });
  };
  Graph.prototype.duplicateCells = function(t, z) {
    t = null != t ? t : this.getSelectionCells();
    z = null != z ? z : !0;
    for (var B = 0; B < t.length; B++)
      this.isTableCell(t[B]) && (t[B] = this.model.getParent(t[B]));
    t = this.model.getTopmostCells(t);
    var E = this.getModel(),
      J = this.gridSize,
      M = [];
    E.beginUpdate();
    try {
      var W = {},
        ha = this.createCellLookup(t),
        da = this.cloneCells(t, !1, W, !0);
      for (B = 0; B < t.length; B++) {
        var fa = E.getParent(t[B]);
        if (null != fa) {
          var sa = this.moveCells([da[B]], J, J, !1)[0];
          M.push(sa);
          if (z)
            E.add(fa, da[B]);
          else {
            var Ja = fa.getIndex(t[B]);
            E.add(fa, da[B], Ja + 1);
          }
          if (this.isTable(fa)) {
            var Na = this.getCellGeometry(da[B]),
              Ma = this.getCellGeometry(fa);
            null != Na && null != Ma && (Ma = Ma.clone(), Ma.height += Na.height, E.setGeometry(fa, Ma));
          }
        } else
          M.push(da[B]);
      }
      this.updateCustomLinks(this.createCellMapping(W, ha), da, this);
      this.fireEvent(new mxEventObject(mxEvent.CELLS_ADDED, 'cells', da));
    } finally {
      E.endUpdate();
    }
    return M;
  };
  Graph.prototype.insertImage = function(t, z, B) {
    if (null != t && null != this.cellEditor.textarea) {
      for (var E = this.cellEditor.textarea.getElementsByTagName('img'), J = [], M = 0; M < E.length; M++)
        J.push(E[M]);
      document.execCommand('insertimage', !1, t);
      t = this.cellEditor.textarea.getElementsByTagName('img');
      if (t.length == J.length + 1)
        for (M = t.length - 1; 0 <= M; M--)
          if (0 == M || t[M] != J[M - 1]) {
            t[M].setAttribute('width', z);
            t[M].setAttribute('height', B);
            break;
          }
    }
  };
  Graph.prototype.insertLink = function(t) {
    if (null != this.cellEditor.textarea)
      if (0 == t.length)
        document.execCommand('unlink', !1);
      else if (mxClient.IS_FF) {
      for (var z = this.cellEditor.textarea.getElementsByTagName('a'), B = [], E = 0; E < z.length; E++)
        B.push(z[E]);
      document.execCommand('createlink', !1, mxUtils.trim(t));
      z = this.cellEditor.textarea.getElementsByTagName('a');
      if (z.length == B.length + 1)
        for (E = z.length - 1; 0 <= E; E--)
          if (z[E] != B[E - 1]) {
            for (z = z[E].getElementsByTagName('a'); 0 < z.length;) {
              for (B = z[0].parentNode; null != z[0].firstChild;)
                B.insertBefore(z[0].firstChild, z[0]);
              B.removeChild(z[0]);
            }
            break;
          }
    } else
      document.execCommand('createlink', !1, mxUtils.trim(t));
  };
  Graph.prototype.isCellResizable = function(t) {
    var z = mxGraph.prototype.isCellResizable.apply(this, arguments),
      B = this.getCurrentCellStyle(t);
    return !this.isTableCell(t) && !this.isTableRow(t) && (z || '0' != mxUtils.getValue(B, mxConstants.STYLE_RESIZABLE, '1') && 'wrap' == B[mxConstants.STYLE_WHITE_SPACE]);
  };
  Graph.prototype.distributeCells = function(t, z, B) {
    null == z && (z = this.getSelectionCells());
    if (null != z && 1 < z.length) {
      for (var E = [], J = null, M = null, W = 0, ha = 0; ha < z.length; ha++)
        if (this.getModel().isVertex(z[ha])) {
          var da = this.view.getState(z[ha]);
          if (null != da) {
            var fa = t ? da.getCenterX() : da.getCenterY();
            J = null != J ? Math.max(J, fa) : fa;
            M = null != M ? Math.min(M, fa) : fa;
            B && (W += t ? da.width : da.height);
            E.push(da);
          }
        }
      if (2 < E.length) {
        E.sort(function(Ka, va) {
          return t ? Ka.x - va.x : Ka.y - va.y;
        });
        B && (W -= t ? E[0].width / 2 + E[E.length - 1].width / 2 : E[0].height / 2 + E[E.length - 1].height / 2);
        da = this.view.translate;
        fa = this.view.scale;
        M = M / fa - (t ? da.x : da.y);
        J = J / fa - (t ? da.x : da.y);
        this.getModel().beginUpdate();
        try {
          var sa = (J - M - W) / (E.length - 1),
            Ja = M + (B ? t ? E[0].width / 2 : E[0].height / 2 : 0);
          for (ha = 1; ha < E.length - 1; ha++) {
            var Na = this.view.getState(this.model.getParent(E[ha].cell)),
              Ma = this.getCellGeometry(E[ha].cell);
            Ja += sa;
            null != Ma && null != Na && (Ma = Ma.clone(), t ? Ma.x = Math.round(Ja - (B ? 0 : Ma.width / 2)) - Na.origin.x : Ma.y = Math.round(Ja - (B ? 0 : Ma.height / 2)) - Na.origin.y, this.getModel().setGeometry(E[ha].cell, Ma));
            B && (Ja += t ? E[ha].width : E[ha].height);
          }
        } finally {
          this.getModel().endUpdate();
        }
      }
    }
    return z;
  };
  Graph.prototype.isCloneEvent = function(t) {
    return mxClient.IS_MAC && mxEvent.isMetaDown(t) || mxEvent.isControlDown(t);
  };
  Graph.prototype.createSvgImageExport = function() {
    var t = new mxImageExport();
    t.getLinkForCellState = mxUtils.bind(this, function(z, B) {
      return this.getLinkForCell(z.cell);
    });
    return t;
  };
  Graph.prototype.parseBackgroundImage = function(t) {
    var z = null;
    null != t && 0 < t.length && (t = JSON.parse(t), z = new mxImage(t.src, t.width, t.height));
    return z;
  };
  Graph.prototype.getBackgroundImageObject = function(t) {
    return t;
  };
  Graph.prototype.getSvg = function(t, z, B, E, J, M, W, ha, da, fa, sa, Ja, Na, Ma) {
    var Ka = null;
    if (null != Ma)
      for (Ka = new mxDictionary(), sa = 0; sa < Ma.length; sa++)
        Ka.put(Ma[sa], !0);
    if (Ma = this.useCssTransforms)
      this.useCssTransforms = !1, this.view.revalidate(), this.sizeDidChange();
    try {
      z = null != z ? z : 1;
      B = null != B ? B : 0;
      J = null != J ? J : !0;
      M = null != M ? M : !0;
      W = null != W ? W : !0;
      fa = null != fa ? fa : !1;
      var va = 'page' == Na ? this.view.getBackgroundPageBounds() : M && null == Ka || E || 'diagram' == Na ? this.getGraphBounds() : this.getBoundingBox(this.getSelectionCells()),
        ya = this.view.scale;
      'diagram' == Na && null != this.backgroundImage && (va = mxRectangle.fromRectangle(va), va.add(new mxRectangle((this.view.translate.x + this.backgroundImage.x) * ya, (this.view.translate.y + this.backgroundImage.y) * ya, this.backgroundImage.width * ya, this.backgroundImage.height * ya)));
      if (null == va)
        throw Error(mxResources.get('drawingEmpty'));
      E = z / ya;
      Na = J ? -0.5 : 0;
      var Ta = Graph.createSvgNode(Na, Na, Math.max(1, Math.ceil(va.width * E) + 2 * B) + (fa && 0 == B ? 5 : 0), Math.max(1, Math.ceil(va.height * E) + 2 * B) + (fa && 0 == B ? 5 : 0), t),
        Ra = Ta.ownerDocument,
        Oa = null != Ra.createElementNS ? Ra.createElementNS(mxConstants.NS_SVG, 'g') : Ra.createElement('g');
      Ta.appendChild(Oa);
      var Pa = this.createSvgCanvas(Oa);
      Pa.foOffset = J ? -0.5 : 0;
      Pa.textOffset = J ? -0.5 : 0;
      Pa.imageOffset = J ? -0.5 : 0;
      Pa.translate(Math.floor(B / z - va.x / ya), Math.floor(B / z - va.y / ya));
      var Ya = document.createElement('div'),
        gb = Pa.getAlternateText;
      Pa.getAlternateText = function(Xa, jb, eb, kb, hb, Za, wb, ob, ib, Sa, sb, yb, tb) {
        if (null != Za && 0 < this.state.fontSize)
          try {
            mxUtils.isNode(Za) ? Za = Za.innerText : (Ya.innerHTML = Za, Za = mxUtils.extractTextWithWhitespace(Ya.childNodes));
            for (var mb = Math.ceil(2 * kb / this.state.fontSize), nb = [], pb = 0, qb = 0;
              (0 == mb || pb < mb) && qb < Za.length;) {
              var c = Za.charCodeAt(qb);
              if (10 == c || 13 == c) {
                if (0 < pb)
                  break;
              } else
                nb.push(Za.charAt(qb)), 255 > c && pb++;
              qb++;
            }
            nb.length < Za.length && 1 < Za.length - nb.length && (Za = mxUtils.trim(nb.join('')) + '...');
            return Za;
          } catch (k) {
            return gb.apply(this, arguments);
          }
        else
          return gb.apply(this, arguments);
      };
      var cb = this.backgroundImage;
      if (null != cb) {
        t = ya / z;
        var rb = this.view.translate;
        Na = new mxRectangle((cb.x + rb.x) * t, (cb.y + rb.y) * t, cb.width * t, cb.height * t);
        mxUtils.intersects(va, Na) && Pa.image(cb.x + rb.x, cb.y + rb.y, cb.width, cb.height, cb.src, !0);
      }
      Pa.scale(E);
      Pa.textEnabled = W;
      ha = null != ha ? ha : this.createSvgImageExport();
      var ub = ha.drawCellState,
        vb = ha.getLinkForCellState;
      ha.getLinkForCellState = function(Xa, jb) {
        var eb = vb.apply(this, arguments);
        return null == eb || Xa.view.graph.isCustomLink(eb) ? null : eb;
      };
      ha.getLinkTargetForCellState = function(Xa, jb) {
        return Xa.view.graph.getLinkTargetForCell(Xa.cell);
      };
      ha.drawCellState = function(Xa, jb) {
        for (var eb = Xa.view.graph, kb = null != Ka ? Ka.get(Xa.cell) : eb.isCellSelected(Xa.cell), hb = eb.model.getParent(Xa.cell); !(M && null == Ka || kb) && null != hb;)
          kb = null != Ka ? Ka.get(hb) : eb.isCellSelected(hb), hb = eb.model.getParent(hb);
        if (M && null == Ka || kb)
          eb.view.redrawEnumerationState(Xa), ub.apply(this, arguments), this.doDrawShape(Xa.secondLabel, jb);
      };
      ha.drawState(this.getView().getState(this.model.root), Pa);
      this.updateSvgLinks(Ta, da, !0);
      this.addForeignObjectWarning(Pa, Ta);
      return Ta;
    } finally {
      Ma && (this.useCssTransforms = !0, this.view.revalidate(), this.sizeDidChange());
    }
  };
  Graph.prototype.addForeignObjectWarning = function(t, z) {
    if ('0' != urlParams['svg-warning'] && 0 < z.getElementsByTagName('foreignObject').length) {
      var B = t.createElement('switch'),
        E = t.createElement('g');
      E.setAttribute('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility');
      var J = t.createElement('a');
      J.setAttribute('transform', 'translate(0,-5)');
      null == J.setAttributeNS || z.ownerDocument != document && null == document.documentMode ? (J.setAttribute('xlink:href', Graph.foreignObjectWarningLink), J.setAttribute('target', '_blank')) : (J.setAttributeNS(mxConstants.NS_XLINK, 'xlink:href', Graph.foreignObjectWarningLink), J.setAttributeNS(mxConstants.NS_XLINK, 'target', '_blank'));
      t = t.createElement('text');
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-size', '10px');
      t.setAttribute('x', '50%');
      t.setAttribute('y', '100%');
      mxUtils.write(t, Graph.foreignObjectWarningText);
      B.appendChild(E);
      J.appendChild(t);
      B.appendChild(J);
      z.appendChild(B);
    }
  };
  Graph.prototype.updateSvgLinks = function(t, z, B) {
    t = t.getElementsByTagName('a');
    for (var E = 0; E < t.length; E++)
      if (null == t[E].getAttribute('target')) {
        var J = t[E].getAttribute('href');
        null == J && (J = t[E].getAttribute('xlink:href'));
        null != J && (null != z && /^https?:\/\//.test(J) ? t[E].setAttribute('target', z) : B && this.isCustomLink(J) && t[E].setAttribute('href', 'javascript:void(0);'));
      }
  };
  Graph.prototype.createSvgCanvas = function(t) {
    t = new mxSvgCanvas2D(t);
    t.minStrokeWidth = this.cellRenderer.minSvgStrokeWidth;
    t.pointerEvents = !0;
    return t;
  };
  Graph.prototype.getSelectedTextBlocks = function() {
    function t(W) {
      if (W.firstChild)
        return W.firstChild;
      for (; W;) {
        if (W.nextSibling)
          return W.nextSibling;
        W = W.parentNode;
      }
    }

    function z(W) {
      var ha = W.startContainer,
        da = W.endContainer;
      W = W.commonAncestorContainer;
      var fa = [],
        sa;
      for (sa = ha.parentNode; sa && (fa.push(sa), sa != W); sa = sa.parentNode);
      fa.reverse();
      for (sa = ha; sa && (fa.push(sa), sa != da); sa = t(sa));
      return fa;
    }
    var B = [this.getSelectedElement()];
    if (window.getSelection) {
      var E = window.getSelection();
      E.getRangeAt && E.rangeCount && (B = z(E.getRangeAt(0)));
    }
    E = [];
    for (var J = 0; J < B.length; J++)
      for (var M = B[J]; null != this.cellEditor.textarea && this.cellEditor.textarea.contains(M) && M != this.cellEditor.textarea && null != M.parentNode;)
        if (M.nodeType == mxConstants.NODETYPE_ELEMENT && 'block' == mxUtils.getCurrentStyle(M).display) {
          0 > mxUtils.indexOf(E, M) && E.push(M);
          break;
        } else
          M = M.parentNode;
    return E;
  };
  Graph.prototype.getSelectedElement = function() {
    var t = null;
    if (window.getSelection) {
      var z = window.getSelection();
      z.getRangeAt && z.rangeCount && (t = z.getRangeAt(0).commonAncestorContainer);
    } else
      document.selection && (t = document.selection.createRange().parentElement());
    return t;
  };
  Graph.prototype.getSelectedEditingElement = function() {
    for (var t = this.getSelectedElement(); null != t && t.nodeType != mxConstants.NODETYPE_ELEMENT;)
      t = t.parentNode;
    null != t && t == this.cellEditor.textarea && 1 == this.cellEditor.textarea.children.length && this.cellEditor.textarea.firstChild.nodeType == mxConstants.NODETYPE_ELEMENT && (t = this.cellEditor.textarea.firstChild);
    return t;
  };
  Graph.prototype.getParentByName = function(t, z, B) {
    for (; null != t && t.nodeName != z;) {
      if (t == B)
        return null;
      t = t.parentNode;
    }
    return t;
  };
  Graph.prototype.getParentByNames = function(t, z, B) {
    for (; null != t && !(0 <= mxUtils.indexOf(z, t.nodeName));) {
      if (t == B)
        return null;
      t = t.parentNode;
    }
    return t;
  };
  Graph.prototype.selectNode = function(t) {
    var z = null;
    if (window.getSelection) {
      if (z = window.getSelection(), z.getRangeAt && z.rangeCount) {
        var B = document.createRange();
        B.selectNode(t);
        z.removeAllRanges();
        z.addRange(B);
      }
    } else
      (z = document.selection) && 'Control' != z.type && (t = z.createRange(), t.collapse(!0), B = z.createRange(), B.setEndPoint('StartToStart', t), B.select());
  };
  Graph.prototype.flipEdgePoints = function(t, z, B) {
    var E = this.getCellGeometry(t);
    if (null != E) {
      E = E.clone();
      if (null != E.points)
        for (var J = 0; J < E.points.length; J++)
          z ? E.points[J].x = B + (B - E.points[J].x) : E.points[J].y = B + (B - E.points[J].y);
      J = function(M) {
        null != M && (z ? M.x = B + (B - M.x) : M.y = B + (B - M.y));
      };
      J(E.getTerminalPoint(!0));
      J(E.getTerminalPoint(!1));
      this.model.setGeometry(t, E);
    }
  };
  Graph.prototype.flipChildren = function(t, z, B) {
    this.model.beginUpdate();
    try {
      for (var E = this.model.getChildCount(t), J = 0; J < E; J++) {
        var M = this.model.getChildAt(t, J);
        if (this.model.isEdge(M))
          this.flipEdgePoints(M, z, B);
        else {
          var W = this.getCellGeometry(M);
          null != W && (W = W.clone(), z ? W.x = B + (B - W.x - W.width) : W.y = B + (B - W.y - W.height), this.model.setGeometry(M, W));
        }
      }
    } finally {
      this.model.endUpdate();
    }
  };
  Graph.prototype.flipCells = function(t, z) {
    this.model.beginUpdate();
    try {
      t = this.model.getTopmostCells(t);
      for (var B = [], E = 0; E < t.length; E++)
        if (this.model.isEdge(t[E])) {
          var J = this.view.getState(t[E]);
          null != J && this.flipEdgePoints(t[E], z, (z ? J.getCenterX() : J.getCenterY()) / this.view.scale - (z ? J.origin.x : J.origin.y) - (z ? this.view.translate.x : this.view.translate.y));
        } else {
          var M = this.getCellGeometry(t[E]);
          null != M && this.flipChildren(t[E], z, z ? M.getCenterX() - M.x : M.getCenterY() - M.y);
          B.push(t[E]);
        }
      this.toggleCellStyles(z ? mxConstants.STYLE_FLIPH : mxConstants.STYLE_FLIPV, !1, B);
    } finally {
      this.model.endUpdate();
    }
  };
  Graph.prototype.deleteCells = function(t, z) {
    var B = null;
    if (null != t && 0 < t.length) {
      this.model.beginUpdate();
      try {
        for (var E = 0; E < t.length; E++) {
          var J = this.model.getParent(t[E]);
          if (this.isTable(J)) {
            var M = this.getCellGeometry(t[E]),
              W = this.getCellGeometry(J);
            null != M && null != W && (W = W.clone(), W.height -= M.height, this.model.setGeometry(J, W));
          }
        }
        var ha = this.selectParentAfterDelete ? this.model.getParents(t) : null;
        this.removeCells(t, z);
      } finally {
        this.model.endUpdate();
      }
      if (null != ha)
        for (B = [], E = 0; E < ha.length; E++)
          this.model.contains(ha[E]) && (this.model.isVertex(ha[E]) || this.model.isEdge(ha[E])) && B.push(ha[E]);
    }
    return B;
  };
  Graph.prototype.insertTableColumn = function(t, z) {
    var B = this.getModel();
    B.beginUpdate();
    try {
      var E = t,
        J = 0;
      if (this.isTableCell(t)) {
        var M = B.getParent(t);
        E = B.getParent(M);
        J = mxUtils.indexOf(B.getChildCells(M, !0), t);
      } else
        this.isTableRow(t) ? E = B.getParent(t) : t = B.getChildCells(E, !0)[0], z || (J = B.getChildCells(t, !0).length - 1);
      var W = B.getChildCells(E, !0),
        ha = Graph.minTableColumnWidth;
      for (t = 0; t < W.length; t++) {
        var da = B.getChildCells(W[t], !0)[J],
          fa = B.cloneCell(da, !1),
          sa = this.getCellGeometry(fa);
        fa.value = null;
        fa.style = mxUtils.setStyle(mxUtils.setStyle(fa.style, 'rowspan', null), 'colspan', null);
        if (null != sa) {
          null != sa.alternateBounds && (sa.width = sa.alternateBounds.width, sa.height = sa.alternateBounds.height, sa.alternateBounds = null);
          ha = sa.width;
          var Ja = this.getCellGeometry(W[t]);
          null != Ja && (sa.height = Ja.height);
        }
        B.add(W[t], fa, J + (z ? 0 : 1));
      }
      var Na = this.getCellGeometry(E);
      null != Na && (Na = Na.clone(), Na.width += ha, B.setGeometry(E, Na));
    } finally {
      B.endUpdate();
    }
  };
  Graph.prototype.deleteLane = function(t) {
    var z = this.getModel();
    z.beginUpdate();
    try {
      var B = null;
      B = 'stackLayout' == this.getCurrentCellStyle(t).childLayout ? t : z.getParent(t);
      var E = z.getChildCells(B, !0);
      0 == E.length ? z.remove(B) : (B == t && (t = E[E.length - 1]), z.remove(t));
    } finally {
      z.endUpdate();
    }
  };
  Graph.prototype.insertLane = function(t, z) {
    var B = this.getModel();
    B.beginUpdate();
    try {
      var E = null;
      if ('stackLayout' == this.getCurrentCellStyle(t).childLayout) {
        E = t;
        var J = B.getChildCells(E, !0);
        t = J[z ? 0 : J.length - 1];
      } else
        E = B.getParent(t);
      var M = E.getIndex(t);
      t = B.cloneCell(t, !1);
      t.value = null;
      B.add(E, t, M + (z ? 0 : 1));
    } finally {
      B.endUpdate();
    }
  };
  Graph.prototype.insertTableRow = function(t, z) {
    var B = this.getModel();
    B.beginUpdate();
    try {
      var E = t,
        J = t;
      if (this.isTableCell(t))
        J = B.getParent(t), E = B.getParent(J);
      else if (this.isTableRow(t))
        E = B.getParent(t);
      else {
        var M = B.getChildCells(E, !0);
        J = M[z ? 0 : M.length - 1];
      }
      var W = B.getChildCells(J, !0),
        ha = E.getIndex(J);
      J = B.cloneCell(J, !1);
      J.value = null;
      var da = this.getCellGeometry(J);
      if (null != da) {
        for (M = 0; M < W.length; M++) {
          t = B.cloneCell(W[M], !1);
          t.value = null;
          t.style = mxUtils.setStyle(mxUtils.setStyle(t.style, 'rowspan', null), 'colspan', null);
          var fa = this.getCellGeometry(t);
          null != fa && (null != fa.alternateBounds && (fa.width = fa.alternateBounds.width, fa.height = fa.alternateBounds.height, fa.alternateBounds = null), fa.height = da.height);
          J.insert(t);
        }
        B.add(E, J, ha + (z ? 0 : 1));
        var sa = this.getCellGeometry(E);
        null != sa && (sa = sa.clone(), sa.height += da.height, B.setGeometry(E, sa));
      }
    } finally {
      B.endUpdate();
    }
  };
  Graph.prototype.deleteTableColumn = function(t) {
    var z = this.getModel();
    z.beginUpdate();
    try {
      var B = t,
        E = t;
      this.isTableCell(t) && (E = z.getParent(t));
      this.isTableRow(E) && (B = z.getParent(E));
      var J = z.getChildCells(B, !0);
      if (0 == J.length)
        z.remove(B);
      else {
        this.isTableRow(E) || (E = J[0]);
        var M = z.getChildCells(E, !0);
        if (1 >= M.length)
          z.remove(B);
        else {
          var W = M.length - 1;
          this.isTableCell(t) && (W = mxUtils.indexOf(M, t));
          for (E = t = 0; E < J.length; E++) {
            var ha = z.getChildCells(J[E], !0)[W];
            z.remove(ha);
            var da = this.getCellGeometry(ha);
            null != da && (t = Math.max(t, da.width));
          }
          var fa = this.getCellGeometry(B);
          null != fa && (fa = fa.clone(), fa.width -= t, z.setGeometry(B, fa));
        }
      }
    } finally {
      z.endUpdate();
    }
  };
  Graph.prototype.deleteTableRow = function(t) {
    var z = this.getModel();
    z.beginUpdate();
    try {
      var B = t,
        E = t;
      this.isTableCell(t) && (t = E = z.getParent(t));
      this.isTableRow(t) && (B = z.getParent(E));
      var J = z.getChildCells(B, !0);
      if (1 >= J.length)
        z.remove(B);
      else {
        this.isTableRow(E) || (E = J[J.length - 1]);
        z.remove(E);
        t = 0;
        var M = this.getCellGeometry(E);
        null != M && (t = M.height);
        var W = this.getCellGeometry(B);
        null != W && (W = W.clone(), W.height -= t, z.setGeometry(B, W));
      }
    } finally {
      z.endUpdate();
    }
  };
  Graph.prototype.insertRow = function(t, z) {
    for (var B = t.tBodies[0], E = B.rows[0].cells, J = t = 0; J < E.length; J++) {
      var M = E[J].getAttribute('colspan');
      t += null != M ? parseInt(M) : 1;
    }
    z = B.insertRow(z);
    for (J = 0; J < t; J++)
      mxUtils.br(z.insertCell(-1));
    return z.cells[0];
  };
  Graph.prototype.deleteRow = function(t, z) {
    t.tBodies[0].deleteRow(z);
  };
  Graph.prototype.insertColumn = function(t, z) {
    var B = t.tHead;
    if (null != B)
      for (var E = 0; E < B.rows.length; E++) {
        var J = document.createElement('th');
        B.rows[E].appendChild(J);
        mxUtils.br(J);
      }
    t = t.tBodies[0];
    for (B = 0; B < t.rows.length; B++)
      E = t.rows[B].insertCell(z), mxUtils.br(E);
    return t.rows[0].cells[0 <= z ? z : t.rows[0].cells.length - 1];
  };
  Graph.prototype.deleteColumn = function(t, z) {
    if (0 <= z) {
      t = t.tBodies[0].rows;
      for (var B = 0; B < t.length; B++)
        t[B].cells.length > z && t[B].deleteCell(z);
    }
  };
  Graph.prototype.pasteHtmlAtCaret = function(t) {
    if (window.getSelection) {
      var z = window.getSelection();
      if (z.getRangeAt && z.rangeCount) {
        z = z.getRangeAt(0);
        z.deleteContents();
        var B = document.createElement('div');
        B.innerHTML = t;
        t = document.createDocumentFragment();
        for (var E; E = B.firstChild;)
          lastNode = t.appendChild(E);
        z.insertNode(t);
      }
    } else
      (z = document.selection) && 'Control' != z.type && z.createRange().pasteHTML(t);
  };
  Graph.prototype.createLinkForHint = function(t, z) {
    function B(J, M) {
      J.length > M && (J = J.substring(0, Math.round(M / 2)) + '...' + J.substring(J.length - Math.round(M / 4)));
      return J;
    }
    t = null != t ? t : 'javascript:void(0);';
    if (null == z || 0 == z.length)
      z = this.isCustomLink(t) ? this.getLinkTitle(t) : t;
    var E = document.createElement('a');
    E.setAttribute('rel', this.linkRelation);
    E.setAttribute('href', this.getAbsoluteUrl(t));
    E.setAttribute('title', B(this.isCustomLink(t) ? this.getLinkTitle(t) : t, 80));
    null != this.linkTarget && E.setAttribute('target', this.linkTarget);
    mxUtils.write(E, B(z, 40));
    this.isCustomLink(t) && mxEvent.addListener(E, 'click', mxUtils.bind(this, function(J) {
      this.customLinkClicked(t);
      mxEvent.consume(J);
    }));
    return E;
  };
  Graph.prototype.initTouch = function() {
    this.connectionHandler.marker.isEnabled = function() {
      return null != this.graph.connectionHandler.first;
    };
    this.addListener(mxEvent.START_EDITING, function(M, W) {
      this.popupMenuHandler.hideMenu();
    });
    var t = this.updateMouseEvent;
    this.updateMouseEvent = function(M) {
      M = t.apply(this, arguments);
      if (mxEvent.isTouchEvent(M.getEvent()) && null == M.getState()) {
        var W = this.getCellAt(M.graphX, M.graphY);
        null != W && this.isSwimlane(W) && this.hitsSwimlaneContent(W, M.graphX, M.graphY) || (M.state = this.view.getState(W), null != M.state && null != M.state.shape && (this.container.style.cursor = M.state.shape.node.style.cursor));
      }
      null == M.getState() && this.isEnabled() && (this.container.style.cursor = 'default');
      return M;
    };
    var z = !1,
      B = !1,
      E = !1,
      J = this.fireMouseEvent;
    this.fireMouseEvent = function(M, W, ha) {
      M == mxEvent.MOUSE_DOWN && (W = this.updateMouseEvent(W), z = this.isCellSelected(W.getCell()), B = this.isSelectionEmpty(), E = this.popupMenuHandler.isMenuShowing());
      J.apply(this, arguments);
    };
    this.popupMenuHandler.mouseUp = mxUtils.bind(this, function(M, W) {
      var ha = mxEvent.isMouseEvent(W.getEvent());
      this.popupMenuHandler.popupTrigger = !this.isEditing() && this.isEnabled() && (null == W.getState() || !W.isSource(W.getState().control)) && (this.popupMenuHandler.popupTrigger || !E && !ha && (B && null == W.getCell() && this.isSelectionEmpty() || z && this.isCellSelected(W.getCell())));
      ha = !z || ha ? null : mxUtils.bind(this, function(da) {
        window.setTimeout(mxUtils.bind(this, function() {
          if (!this.isEditing()) {
            var fa = mxUtils.getScrollOrigin();
            this.popupMenuHandler.popup(W.getX() + fa.x + 1, W.getY() + fa.y + 1, da, W.getEvent());
          }
        }), 300);
      });
      mxPopupMenuHandler.prototype.mouseUp.apply(this.popupMenuHandler, [
        M,
        W,
        ha
      ]);
    });
  };
  mxCellEditor.prototype.isContentEditing = function() {
    var t = this.graph.view.getState(this.editingCell);
    return null != t && 1 == t.style.html;
  };
  mxCellEditor.prototype.isTableSelected = function() {
    return null != this.graph.getParentByName(this.graph.getSelectedElement(), 'TABLE', this.textarea);
  };
  mxCellEditor.prototype.isTextSelected = function() {
    var t = '';
    window.getSelection ? t = window.getSelection() : document.getSelection ? t = document.getSelection() : document.selection && (t = document.selection.createRange().text);
    return '' != t;
  };
  mxCellEditor.prototype.insertTab = function(t) {
    var z = this.textarea.ownerDocument.defaultView.getSelection(),
      B = z.getRangeAt(0),
      E = '\t';
    if (null != t)
      for (E = ''; 0 < t;)
        E += '\xA0', t--;
    t = document.createElement('span');
    t.style.whiteSpace = 'pre';
    t.appendChild(document.createTextNode(E));
    B.insertNode(t);
    B.setStartAfter(t);
    B.setEndAfter(t);
    z.removeAllRanges();
    z.addRange(B);
  };
  mxCellEditor.prototype.alignText = function(t, z) {
    var B = null != z && mxEvent.isShiftDown(z);
    if (B || null != window.getSelection && null != window.getSelection().containsNode) {
      var E = !0;
      this.graph.processElements(this.textarea, function(J) {
        B || window.getSelection().containsNode(J, !0) ? (J.removeAttribute('align'), J.style.textAlign = null) : E = !1;
      });
      E && this.graph.cellEditor.setAlign(t);
    }
    document.execCommand('justify' + t.toLowerCase(), !1, null);
  };
  mxCellEditor.prototype.saveSelection = function() {
    if (window.getSelection) {
      var t = window.getSelection();
      if (t.getRangeAt && t.rangeCount) {
        for (var z = [], B = 0, E = t.rangeCount; B < E; ++B)
          z.push(t.getRangeAt(B));
        return z;
      }
    } else if (document.selection && document.selection.createRange)
      return document.selection.createRange();
    return null;
  };
  mxCellEditor.prototype.restoreSelection = function(t) {
    try {
      if (t)
        if (window.getSelection) {
          sel = window.getSelection();
          sel.removeAllRanges();
          for (var z = 0, B = t.length; z < B; ++z)
            sel.addRange(t[z]);
        } else
          document.selection && t.select && t.select();
    } catch (E) {}
  };
  var F = mxCellRenderer.prototype.initializeLabel;
  mxCellRenderer.prototype.initializeLabel = function(t) {
    null != t.text && (t.text.replaceLinefeeds = '0' != mxUtils.getValue(t.style, 'nl2Br', '1'));
    F.apply(this, arguments);
  };
  var K = mxConstraintHandler.prototype.update;
  mxConstraintHandler.prototype.update = function(t, z) {
    this.isKeepFocusEvent(t) || !mxEvent.isAltDown(t.getEvent()) ? K.apply(this, arguments) : this.reset();
  };
  mxGuide.prototype.createGuideShape = function(t) {
    return new mxPolyline([], mxConstants.GUIDE_COLOR, mxConstants.GUIDE_STROKEWIDTH);
  };
  mxCellEditor.prototype.escapeCancelsEditing = !1;
  var P = mxCellEditor.prototype.startEditing;
  mxCellEditor.prototype.startEditing = function(t, z) {
    t = this.graph.getStartEditingCell(t, z);
    P.apply(this, arguments);
    var B = this.graph.view.getState(t);
    this.textarea.className = null != B && 1 == B.style.html ? 'mxCellEditor geContentEditable' : 'mxCellEditor mxPlainTextEditor';
    this.codeViewMode = !1;
    this.switchSelectionState = null;
    this.graph.setSelectionCell(t);
    B = this.graph.getModel().getParent(t);
    var E = this.graph.getCellGeometry(t);
    if (this.graph.getModel().isEdge(B) && null != E && E.relative || this.graph.getModel().isEdge(t))
      this.textarea.style.outline = mxClient.IS_IE || mxClient.IS_IE11 || mxClient.IS_FF && mxClient.IS_WIN ? 'gray dotted 1px' : '';
  };
  var R = mxCellEditor.prototype.installListeners;
  mxCellEditor.prototype.installListeners = function(t) {
    function z(J, M) {
      M.originalNode = J;
      J = J.firstChild;
      for (var W = M.firstChild; null != J && null != W;)
        z(J, W), J = J.nextSibling, W = W.nextSibling;
      return M;
    }

    function B(J, M) {
      if (null != J)
        if (M.originalNode != J)
          E(J);
        else
          for (J = J.firstChild, M = M.firstChild; null != J;) {
            var W = J.nextSibling;
            null == M ? E(J) : (B(J, M), M = M.nextSibling);
            J = W;
          }
    }

    function E(J) {
      for (var M = J.firstChild; null != M;) {
        var W = M.nextSibling;
        E(M);
        M = W;
      }
      1 == J.nodeType && ('BR' === J.nodeName || null != J.firstChild) || 3 == J.nodeType && 0 != mxUtils.trim(mxUtils.getTextContent(J)).length ? (3 == J.nodeType && mxUtils.setTextContent(J, mxUtils.getTextContent(J).replace(/\n|\r/g, '')), 1 == J.nodeType && (J.removeAttribute('style'), J.removeAttribute('class'), J.removeAttribute('width'), J.removeAttribute('cellpadding'), J.removeAttribute('cellspacing'), J.removeAttribute('border'))) : J.parentNode.removeChild(J);
    }
    R.apply(this, arguments);
    7 !== document.documentMode && 8 !== document.documentMode && mxEvent.addListener(this.textarea, 'paste', mxUtils.bind(this, function(J) {
      var M = z(this.textarea, this.textarea.cloneNode(!0));
      window.setTimeout(mxUtils.bind(this, function() {
        null != this.textarea && (0 <= this.textarea.innerHTML.indexOf('<o:OfficeDocumentSettings>') || 0 <= this.textarea.innerHTML.indexOf('<!--[if !mso]>') ? B(this.textarea, M) : Graph.removePasteFormatting(this.textarea));
      }), 0);
    }));
  };
  mxCellEditor.prototype.toggleViewMode = function() {
    var t = this.graph.view.getState(this.editingCell);
    if (null != t) {
      var z = null != t && '0' != mxUtils.getValue(t.style, 'nl2Br', '1'),
        B = this.saveSelection();
      if (this.codeViewMode) {
        ha = mxUtils.extractTextWithWhitespace(this.textarea.childNodes);
        0 < ha.length && '\n' == ha.charAt(ha.length - 1) && (ha = ha.substring(0, ha.length - 1));
        ha = Graph.sanitizeHtml(z ? ha.replace(/\n/g, '<br/>') : ha, !0);
        this.textarea.className = 'mxCellEditor geContentEditable';
        da = mxUtils.getValue(t.style, mxConstants.STYLE_FONTSIZE, mxConstants.DEFAULT_FONTSIZE);
        z = mxUtils.getValue(t.style, mxConstants.STYLE_FONTFAMILY, mxConstants.DEFAULT_FONTFAMILY);
        var E = mxUtils.getValue(t.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_LEFT),
          J = (mxUtils.getValue(t.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD,
          M = (mxUtils.getValue(t.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC,
          W = [];
        (mxUtils.getValue(t.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && W.push('underline');
        (mxUtils.getValue(t.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && W.push('line-through');
        this.textarea.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT ? Math.round(da * mxConstants.LINE_HEIGHT) + 'px' : mxConstants.LINE_HEIGHT;
        this.textarea.style.fontSize = Math.round(da) + 'px';
        this.textarea.style.textDecoration = W.join(' ');
        this.textarea.style.fontWeight = J ? 'bold' : 'normal';
        this.textarea.style.fontStyle = M ? 'italic' : '';
        this.textarea.style.fontFamily = z;
        this.textarea.style.textAlign = E;
        this.textarea.style.padding = '0px';
        this.textarea.innerHTML != ha && (this.textarea.innerHTML = ha, 0 == this.textarea.innerHTML.length && (this.textarea.innerHTML = this.getEmptyLabelText(), this.clearOnChange = 0 < this.textarea.innerHTML.length));
        this.codeViewMode = !1;
      } else {
        this.clearOnChange && this.textarea.innerHTML == this.getEmptyLabelText() && (this.clearOnChange = !1, this.textarea.innerText = '');
        var ha = mxUtils.htmlEntities(this.textarea.innerHTML);
        8 != document.documentMode && (ha = mxUtils.replaceTrailingNewlines(ha, '<div><br></div>'));
        ha = Graph.sanitizeHtml(z ? ha.replace(/\n/g, '').replace(/&lt;br\s*.?&gt;/g, '<br>') : ha, !0);
        this.textarea.className = 'mxCellEditor mxPlainTextEditor';
        var da = mxConstants.DEFAULT_FONTSIZE;
        this.textarea.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT ? Math.round(da * mxConstants.LINE_HEIGHT) + 'px' : mxConstants.LINE_HEIGHT;
        this.textarea.style.fontSize = Math.round(da) + 'px';
        this.textarea.style.textDecoration = '';
        this.textarea.style.fontWeight = 'normal';
        this.textarea.style.fontStyle = '';
        this.textarea.style.fontFamily = mxConstants.DEFAULT_FONTFAMILY;
        this.textarea.style.textAlign = 'left';
        this.textarea.style.width = '';
        this.textarea.style.padding = '2px';
        this.textarea.innerHTML != ha && (this.textarea.innerHTML = ha);
        this.codeViewMode = !0;
      }
      this.textarea.focus();
      null != this.switchSelectionState && this.restoreSelection(this.switchSelectionState);
      this.switchSelectionState = B;
      this.resize();
    }
  };
  var Q = mxCellEditor.prototype.resize;
  mxCellEditor.prototype.resize = function(t, z) {
    if (null != this.textarea)
      if (t = this.graph.getView().getState(this.editingCell), this.codeViewMode && null != t) {
        var B = t.view.scale;
        this.bounds = mxRectangle.fromRectangle(t);
        if (0 == this.bounds.width && 0 == this.bounds.height) {
          this.bounds.width = 160 * B;
          this.bounds.height = 60 * B;
          var E = null != t.text ? t.text.margin : null;
          null == E && (E = mxUtils.getAlignmentAsPoint(mxUtils.getValue(t.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER), mxUtils.getValue(t.style, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE)));
          this.bounds.x += E.x * this.bounds.width;
          this.bounds.y += E.y * this.bounds.height;
        }
        this.textarea.style.width = Math.round((this.bounds.width - 4) / B) + 'px';
        this.textarea.style.height = Math.round((this.bounds.height - 4) / B) + 'px';
        this.textarea.style.overflow = 'auto';
        this.textarea.clientHeight < this.textarea.offsetHeight && (this.textarea.style.height = Math.round(this.bounds.height / B) + (this.textarea.offsetHeight - this.textarea.clientHeight) + 'px', this.bounds.height = parseInt(this.textarea.style.height) * B);
        this.textarea.clientWidth < this.textarea.offsetWidth && (this.textarea.style.width = Math.round(this.bounds.width / B) + (this.textarea.offsetWidth - this.textarea.clientWidth) + 'px', this.bounds.width = parseInt(this.textarea.style.width) * B);
        this.textarea.style.left = Math.round(this.bounds.x) + 'px';
        this.textarea.style.top = Math.round(this.bounds.y) + 'px';
        mxUtils.setPrefixedStyle(this.textarea.style, 'transform', 'scale(' + B + ',' + B + ')');
      } else
        this.textarea.style.height = '', this.textarea.style.overflow = '', Q.apply(this, arguments);
  };
  mxCellEditorGetInitialValue = mxCellEditor.prototype.getInitialValue;
  mxCellEditor.prototype.getInitialValue = function(t, z) {
    if ('0' == mxUtils.getValue(t.style, 'html', '0'))
      return mxCellEditorGetInitialValue.apply(this, arguments);
    var B = this.graph.getEditingValue(t.cell, z);
    '1' == mxUtils.getValue(t.style, 'nl2Br', '1') && (B = B.replace(/\n/g, '<br/>'));
    return B = Graph.sanitizeHtml(B, !0);
  };
  mxCellEditorGetCurrentValue = mxCellEditor.prototype.getCurrentValue;
  mxCellEditor.prototype.getCurrentValue = function(t) {
    if ('0' == mxUtils.getValue(t.style, 'html', '0'))
      return mxCellEditorGetCurrentValue.apply(this, arguments);
    var z = Graph.sanitizeHtml(this.textarea.innerHTML, !0);
    return z = '1' == mxUtils.getValue(t.style, 'nl2Br', '1') ? z.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>') : z.replace(/\r\n/g, '').replace(/\n/g, '');
  };
  var ba = mxCellEditor.prototype.stopEditing;
  mxCellEditor.prototype.stopEditing = function(t) {
    this.codeViewMode && this.toggleViewMode();
    ba.apply(this, arguments);
    this.focusContainer();
  };
  mxCellEditor.prototype.focusContainer = function() {
    try {
      this.graph.container.focus();
    } catch (t) {}
  };
  var V = mxCellEditor.prototype.applyValue;
  mxCellEditor.prototype.applyValue = function(t, z) {
    this.graph.getModel().beginUpdate();
    try {
      V.apply(this, arguments), '' == z && this.graph.isCellDeletable(t.cell) && 0 == this.graph.model.getChildCount(t.cell) && this.graph.isTransparentState(t) && this.graph.removeCells([t.cell], !1);
    } finally {
      this.graph.getModel().endUpdate();
    }
  };
  mxCellEditor.prototype.getBackgroundColor = function(t) {
    var z = mxUtils.getValue(t.style, mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, null);
    null != z && z != mxConstants.NONE || !(null != t.cell.geometry && 0 < t.cell.geometry.width) || 0 == mxUtils.getValue(t.style, mxConstants.STYLE_ROTATION, 0) && 0 != mxUtils.getValue(t.style, mxConstants.STYLE_HORIZONTAL, 1) || (z = mxUtils.getValue(t.style, mxConstants.STYLE_FILLCOLOR, null));
    z == mxConstants.NONE && (z = null);
    return z;
  };
  mxCellEditor.prototype.getBorderColor = function(t) {
    var z = mxUtils.getValue(t.style, mxConstants.STYLE_LABEL_BORDERCOLOR, null);
    null != z && z != mxConstants.NONE || !(null != t.cell.geometry && 0 < t.cell.geometry.width) || 0 == mxUtils.getValue(t.style, mxConstants.STYLE_ROTATION, 0) && 0 != mxUtils.getValue(t.style, mxConstants.STYLE_HORIZONTAL, 1) || (z = mxUtils.getValue(t.style, mxConstants.STYLE_STROKECOLOR, null));
    z == mxConstants.NONE && (z = null);
    return z;
  };
  mxCellEditor.prototype.getMinimumSize = function(t) {
    var z = this.graph.getView().scale;
    return new mxRectangle(0, 0, null == t.text ? 30 : t.text.size * z + 20, 30);
  };
  mxGraphHandlerIsValidDropTarget = mxGraphHandler.prototype.isValidDropTarget;
  mxGraphHandler.prototype.isValidDropTarget = function(t, z) {
    return mxGraphHandlerIsValidDropTarget.apply(this, arguments) && !mxEvent.isAltDown(z.getEvent);
  };
  mxGraphView.prototype.formatUnitText = function(t) {
    return t ? b(t, this.unit) : t;
  };
  mxGraphHandler.prototype.updateHint = function(t) {
    if (null != this.pBounds && (null != this.shape || this.livePreviewActive)) {
      null == this.hint && (this.hint = a(), this.graph.container.appendChild(this.hint));
      var z = this.graph.view.translate,
        B = this.graph.view.scale;
      t = this.roundLength((this.bounds.x + this.currentDx) / B - z.x);
      z = this.roundLength((this.bounds.y + this.currentDy) / B - z.y);
      B = this.graph.view.unit;
      this.hint.innerHTML = b(t, B) + ', ' + b(z, B);
      this.hint.style.left = this.pBounds.x + this.currentDx + Math.round((this.pBounds.width - this.hint.clientWidth) / 2) + 'px';
      this.hint.style.top = this.pBounds.y + this.currentDy + this.pBounds.height + Editor.hintOffset + 'px';
    }
  };
  mxGraphHandler.prototype.removeHint = function() {
    null != this.hint && (this.hint.parentNode.removeChild(this.hint), this.hint = null);
  };
  var T = mxStackLayout.prototype.resizeCell;
  mxStackLayout.prototype.resizeCell = function(t, z) {
    T.apply(this, arguments);
    var B = this.graph.getCellStyle(t);
    if (null == B.childLayout) {
      var E = this.graph.model.getParent(t),
        J = null != E ? this.graph.getCellGeometry(E) : null;
      if (null != J && (B = this.graph.getCellStyle(E), 'stackLayout' == B.childLayout)) {
        var M = parseFloat(mxUtils.getValue(B, 'stackBorder', mxStackLayout.prototype.border));
        B = '1' == mxUtils.getValue(B, 'horizontalStack', '1');
        var W = this.graph.getActualStartSize(E);
        J = J.clone();
        B ? J.height = z.height + W.y + W.height + 2 * M : J.width = z.width + W.x + W.width + 2 * M;
        this.graph.model.setGeometry(E, J);
      }
    }
  };
  var Z = mxSelectionCellsHandler.prototype.getHandledSelectionCells;
  mxSelectionCellsHandler.prototype.getHandledSelectionCells = function() {
    function t(ha) {
      B.get(ha) || (B.put(ha, !0), J.push(ha));
    }
    for (var z = Z.apply(this, arguments), B = new mxDictionary(), E = this.graph.model, J = [], M = 0; M < z.length; M++) {
      var W = z[M];
      this.graph.isTableCell(W) ? t(E.getParent(E.getParent(W))) : this.graph.isTableRow(W) && t(E.getParent(W));
      t(W);
    }
    return J;
  };
  var ma = mxVertexHandler.prototype.createParentHighlightShape;
  mxVertexHandler.prototype.createParentHighlightShape = function(t) {
    var z = ma.apply(this, arguments);
    z.stroke = '#C0C0C0';
    z.strokewidth = 1;
    return z;
  };
  var ja = mxEdgeHandler.prototype.createParentHighlightShape;
  mxEdgeHandler.prototype.createParentHighlightShape = function(t) {
    var z = ja.apply(this, arguments);
    z.stroke = '#C0C0C0';
    z.strokewidth = 1;
    return z;
  };
  mxVertexHandler.prototype.rotationHandleVSpacing = -12;
  mxVertexHandler.prototype.getRotationHandlePosition = function() {
    var t = this.getHandlePadding();
    return new mxPoint(this.bounds.x + this.bounds.width - this.rotationHandleVSpacing + t.x / 2, this.bounds.y + this.rotationHandleVSpacing - t.y / 2);
  };
  mxVertexHandler.prototype.isRecursiveResize = function(t, z) {
    return this.graph.isRecursiveVertexResize(t) && !mxEvent.isAltDown(z.getEvent());
  };
  mxVertexHandler.prototype.isCenteredEvent = function(t, z) {
    return mxEvent.isControlDown(z.getEvent()) || mxEvent.isMetaDown(z.getEvent());
  };
  var la = mxVertexHandler.prototype.isRotationHandleVisible;
  mxVertexHandler.prototype.isRotationHandleVisible = function() {
    return la.apply(this, arguments) && !this.graph.isTableCell(this.state.cell) && !this.graph.isTableRow(this.state.cell) && !this.graph.isTable(this.state.cell);
  };
  mxVertexHandler.prototype.getSizerBounds = function() {
    return this.graph.isTableCell(this.state.cell) ? this.graph.view.getState(this.graph.model.getParent(this.graph.model.getParent(this.state.cell))) : this.bounds;
  };
  var N = mxVertexHandler.prototype.isParentHighlightVisible;
  mxVertexHandler.prototype.isParentHighlightVisible = function() {
    return N.apply(this, arguments) && !this.graph.isTableCell(this.state.cell) && !this.graph.isTableRow(this.state.cell);
  };
  var X = mxVertexHandler.prototype.isCustomHandleVisible;
  mxVertexHandler.prototype.isCustomHandleVisible = function(t) {
    return t.tableHandle || X.apply(this, arguments) && (!this.graph.isTable(this.state.cell) || this.graph.isCellSelected(this.state.cell));
  };
  mxVertexHandler.prototype.getSelectionBorderInset = function() {
    var t = 0;
    this.graph.isTableRow(this.state.cell) ? t = 1 : this.graph.isTableCell(this.state.cell) && (t = 2);
    return t;
  };
  var L = mxVertexHandler.prototype.getSelectionBorderBounds;
  mxVertexHandler.prototype.getSelectionBorderBounds = function() {
    return L.apply(this, arguments).grow(-this.getSelectionBorderInset());
  };
  var S = null,
    I = mxVertexHandler.prototype.createCustomHandles;
  mxVertexHandler.prototype.createCustomHandles = function() {
    null == S && (S = mxCellRenderer.defaultShapes.tableLine);
    var t = I.apply(this, arguments);
    if (this.graph.isTable(this.state.cell) && this.graph.isCellMovable(this.state.cell)) {
      var z = function(Ka, va, ya) {
          for (var Ta = [], Ra = 0; Ra < Ka.length; Ra++) {
            var Oa = Ka[Ra];
            Ta.push(null == Oa ? null : new mxPoint((da + Oa.x + va) * M, (fa + Oa.y + ya) * M));
          }
          return Ta;
        },
        B = this,
        E = this.graph,
        J = E.model,
        M = E.view.scale,
        W = this.state,
        ha = this.selectionBorder,
        da = this.state.origin.x + E.view.translate.x,
        fa = this.state.origin.y + E.view.translate.y;
      null == t && (t = []);
      var sa = E.view.getCellStates(J.getChildCells(this.state.cell, !0));
      if (0 < sa.length) {
        var Ja = J.getChildCells(sa[0].cell, !0),
          Na = E.getTableLines(this.state.cell, !1, !0),
          Ma = E.getTableLines(this.state.cell, !0, !1);
        for (J = 0; J < sa.length; J++)
          mxUtils.bind(this, function(Ka) {
            var va = sa[Ka],
              ya = null;
            if (E.isCellMovable(va.cell)) {
              ya = Ka < sa.length - 1 ? sa[Ka + 1] : null;
              ya = null != ya ? E.getCellGeometry(ya.cell) : null;
              var Ta = null != ya && null != ya.alternateBounds ? ya.alternateBounds : ya;
              ya = null != Ma[Ka] ? new S(Ma[Ka], mxConstants.NONE, 1) : new mxLine(new mxRectangle(), mxConstants.NONE, 1, !1);
              ya.isDashed = ha.isDashed;
              ya.svgStrokeTolerance++;
              ya = new mxHandle(va, 'row-resize', null, ya);
              ya.tableHandle = !0;
              var Ra = 0;
              ya.shape.node.parentNode.insertBefore(ya.shape.node, ya.shape.node.parentNode.firstChild);
              ya.redraw = function() {
                if (null != this.shape) {
                  this.shape.stroke = 0 == Ra ? mxConstants.NONE : ha.stroke;
                  if (this.shape.constructor == S)
                    this.shape.line = z(Ma[Ka], 0, Ra), this.shape.updateBoundsFromLine();
                  else {
                    var Pa = E.getActualStartSize(W.cell, !0);
                    this.shape.bounds.height = 1;
                    this.shape.bounds.y = this.state.y + this.state.height + Ra * M;
                    this.shape.bounds.x = W.x + (Ka == sa.length - 1 ? 0 : Pa.x * M);
                    this.shape.bounds.width = W.width - (Ka == sa.length - 1 ? 0 : Pa.width + Pa.x + M);
                  }
                  this.shape.redraw();
                }
              };
              var Oa = !1;
              ya.setPosition = function(Pa, Ya, gb) {
                Ra = Math.max(Graph.minTableRowHeight - Pa.height, Ya.y - Pa.y - Pa.height);
                Oa = mxEvent.isShiftDown(gb.getEvent());
                null != Ta && Oa && (Ra = Math.min(Ra, Ta.height - Graph.minTableRowHeight));
              };
              ya.execute = function(Pa) {
                if (0 != Ra)
                  E.setTableRowHeight(this.state.cell, Ra, !Oa);
                else if (!B.blockDelayedSelection) {
                  var Ya = E.getCellAt(Pa.getGraphX(), Pa.getGraphY()) || W.cell;
                  E.graphHandler.selectCellForEvent(Ya, Pa);
                }
                Ra = 0;
              };
              ya.reset = function() {
                Ra = 0;
              };
            }
            t.push(ya);
          })(J);
        for (J = 0; J < Ja.length; J++)
          mxUtils.bind(this, function(Ka) {
            var va = E.view.getState(Ja[Ka]),
              ya = E.getCellGeometry(Ja[Ka]),
              Ta = null != ya.alternateBounds ? ya.alternateBounds : ya;
            null == va && (va = new mxCellState(E.view, Ja[Ka], E.getCellStyle(Ja[Ka])), va.x = W.x + ya.x * M, va.y = W.y + ya.y * M, va.width = Ta.width * M, va.height = Ta.height * M, va.updateCachedBounds());
            ya = Ka < Ja.length - 1 ? Ja[Ka + 1] : null;
            ya = null != ya ? E.getCellGeometry(ya) : null;
            var Ra = null != ya && null != ya.alternateBounds ? ya.alternateBounds : ya;
            ya = null != Na[Ka] ? new S(Na[Ka], mxConstants.NONE, 1) : new mxLine(new mxRectangle(), mxConstants.NONE, 1, !0);
            ya.isDashed = ha.isDashed;
            ya.svgStrokeTolerance++;
            va = new mxHandle(va, 'col-resize', null, ya);
            va.tableHandle = !0;
            var Oa = 0;
            va.shape.node.parentNode.insertBefore(va.shape.node, va.shape.node.parentNode.firstChild);
            va.redraw = function() {
              if (null != this.shape) {
                this.shape.stroke = 0 == Oa ? mxConstants.NONE : ha.stroke;
                if (this.shape.constructor == S)
                  this.shape.line = z(Na[Ka], Oa, 0), this.shape.updateBoundsFromLine();
                else {
                  var Ya = E.getActualStartSize(W.cell, !0);
                  this.shape.bounds.width = 1;
                  this.shape.bounds.x = this.state.x + (Ta.width + Oa) * M;
                  this.shape.bounds.y = W.y + (Ka == Ja.length - 1 ? 0 : Ya.y * M);
                  this.shape.bounds.height = W.height - (Ka == Ja.length - 1 ? 0 : (Ya.height + Ya.y) * M);
                }
                this.shape.redraw();
              }
            };
            var Pa = !1;
            va.setPosition = function(Ya, gb, cb) {
              Oa = Math.max(Graph.minTableColumnWidth - Ta.width, gb.x - Ya.x - Ta.width);
              Pa = mxEvent.isShiftDown(cb.getEvent());
              null == Ra || Pa || (Oa = Math.min(Oa, Ra.width - Graph.minTableColumnWidth));
            };
            va.execute = function(Ya) {
              if (0 != Oa)
                E.setTableColumnWidth(this.state.cell, Oa, Pa);
              else if (!B.blockDelayedSelection) {
                var gb = E.getCellAt(Ya.getGraphX(), Ya.getGraphY()) || W.cell;
                E.graphHandler.selectCellForEvent(gb, Ya);
              }
              Oa = 0;
            };
            va.positionChanged = function() {};
            va.reset = function() {
              Oa = 0;
            };
            t.push(va);
          })(J);
      }
    }
    return null != t ? t.reverse() : null;
  };
  var Y = mxVertexHandler.prototype.setHandlesVisible;
  mxVertexHandler.prototype.setHandlesVisible = function(t) {
    Y.apply(this, arguments);
    if (null != this.moveHandles)
      for (var z = 0; z < this.moveHandles.length; z++)
        null != this.moveHandles[z] && (this.moveHandles[z].style.visibility = t ? '' : 'hidden');
    if (null != this.cornerHandles)
      for (z = 0; z < this.cornerHandles.length; z++)
        this.cornerHandles[z].node.style.visibility = t ? '' : 'hidden';
  };
  mxVertexHandler.prototype.refreshMoveHandles = function() {
    var t = this.graph,
      z = t.model;
    if (null != this.moveHandles) {
      for (var B = 0; B < this.moveHandles.length; B++)
        null != this.moveHandles[B] && this.moveHandles[B].parentNode.removeChild(this.moveHandles[B]);
      this.moveHandles = null;
    }
    this.moveHandles = [];
    for (B = 0; B < z.getChildCount(this.state.cell); B++)
      mxUtils.bind(this, function(E) {
        if (null != E && z.isVertex(E.cell) && t.isCellMovable(E.cell)) {
          var J = mxUtils.createImage(Editor.rowMoveImage);
          J.style.position = 'absolute';
          J.style.cursor = 'pointer';
          J.style.width = '7px';
          J.style.height = '4px';
          J.style.padding = '4px 2px 4px 2px';
          J.rowState = E;
          mxEvent.addGestureListeners(J, mxUtils.bind(this, function(M) {
            this.graph.popupMenuHandler.hideMenu();
            this.graph.stopEditing(!1);
            !this.graph.isToggleEvent(M) && this.graph.isCellSelected(E.cell) || this.graph.selectCellForEvent(E.cell, M);
            mxEvent.isPopupTrigger(M) || (this.graph.graphHandler.start(this.state.cell, mxEvent.getClientX(M), mxEvent.getClientY(M), this.graph.getSelectionCells()), this.graph.graphHandler.cellWasClicked = !0, this.graph.isMouseTrigger = mxEvent.isMouseEvent(M), this.graph.isMouseDown = !0);
            mxEvent.consume(M);
          }), null, mxUtils.bind(this, function(M) {
            mxEvent.isPopupTrigger(M) && (this.graph.popupMenuHandler.popup(mxEvent.getClientX(M), mxEvent.getClientY(M), E.cell, M), mxEvent.consume(M));
          }));
          this.moveHandles.push(J);
          this.graph.container.appendChild(J);
        } else
          this.moveHandles.push(null);
      })(this.graph.view.getState(z.getChildAt(this.state.cell, B)));
  };
  mxVertexHandler.prototype.refresh = function() {
    if (null != this.customHandles) {
      for (var t = 0; t < this.customHandles.length; t++)
        null != this.customHandles[t] && this.customHandles[t].destroy();
      this.customHandles = this.createCustomHandles();
    }
    this.graph.isTable(this.state.cell) && this.graph.isCellMovable(this.state.cell) && this.refreshMoveHandles();
  };
  var ia = mxVertexHandler.prototype.getHandlePadding;
  mxVertexHandler.prototype.getHandlePadding = function() {
    var t = new mxPoint(0, 0),
      z = this.tolerance,
      B = this.state.style.shape;
    null == mxCellRenderer.defaultShapes[B] && mxStencilRegistry.getStencil(B);
    B = this.graph.isTable(this.state.cell) || this.graph.cellEditor.getEditingCell() == this.state.cell;
    if (!B && null != this.customHandles)
      for (var E = 0; E < this.customHandles.length; E++)
        if (null != this.customHandles[E] && null != this.customHandles[E].shape && null != this.customHandles[E].shape.bounds) {
          var J = this.customHandles[E].shape.bounds,
            M = J.getCenterX(),
            W = J.getCenterY();
          if (Math.abs(this.state.x - M) < J.width / 2 || Math.abs(this.state.y - W) < J.height / 2 || Math.abs(this.state.x + this.state.width - M) < J.width / 2 || Math.abs(this.state.y + this.state.height - W) < J.height / 2) {
            B = !0;
            break;
          }
        }
    B && null != this.sizers && 0 < this.sizers.length && null != this.sizers[0] ? (z /= 2, this.graph.isTable(this.state.cell) && (z += 7), t.x = this.sizers[0].bounds.width + z, t.y = this.sizers[0].bounds.height + z) : t = ia.apply(this, arguments);
    return t;
  };
  mxVertexHandler.prototype.updateHint = function(t) {
    if (this.index != mxEvent.LABEL_HANDLE) {
      null == this.hint && (this.hint = a(), this.state.view.graph.container.appendChild(this.hint));
      if (this.index == mxEvent.ROTATION_HANDLE)
        this.hint.innerHTML = this.currentAlpha + '&deg;';
      else {
        t = this.state.view.scale;
        var z = this.state.view.unit;
        this.hint.innerHTML = b(this.roundLength(this.bounds.width / t), z) + ' x ' + b(this.roundLength(this.bounds.height / t), z);
      }
      t = mxUtils.getBoundingBox(this.bounds, null != this.currentAlpha ? this.currentAlpha : this.state.style[mxConstants.STYLE_ROTATION] || '0');
      null == t && (t = this.bounds);
      this.hint.style.left = t.x + Math.round((t.width - this.hint.clientWidth) / 2) + 'px';
      this.hint.style.top = t.y + t.height + Editor.hintOffset + 'px';
      null != this.linkHint && (this.linkHint.style.display = 'none');
    }
  };
  mxVertexHandler.prototype.removeHint = function() {
    mxGraphHandler.prototype.removeHint.apply(this, arguments);
    null != this.linkHint && (this.linkHint.style.display = '');
  };
  var ka = mxEdgeHandler.prototype.mouseMove;
  mxEdgeHandler.prototype.mouseMove = function(t, z) {
    ka.apply(this, arguments);
    null != this.linkHint && 'none' != this.linkHint.style.display && null != this.graph.graphHandler && null != this.graph.graphHandler.first && (this.linkHint.style.display = 'none');
  };
  var U = mxEdgeHandler.prototype.mouseUp;
  mxEdgeHandler.prototype.mouseUp = function(t, z) {
    U.apply(this, arguments);
    null != this.linkHint && 'none' == this.linkHint.style.display && (this.linkHint.style.display = '');
  };
  mxEdgeHandler.prototype.updateHint = function(t, z) {
    null == this.hint && (this.hint = a(), this.state.view.graph.container.appendChild(this.hint));
    var B = this.graph.view.translate,
      E = this.graph.view.scale,
      J = this.roundLength(z.x / E - B.x);
    B = this.roundLength(z.y / E - B.y);
    E = this.graph.view.unit;
    this.hint.innerHTML = b(J, E) + ', ' + b(B, E);
    this.hint.style.visibility = 'visible';
    if (this.isSource || this.isTarget)
      null != this.constraintHandler.currentConstraint && null != this.constraintHandler.currentFocus ? (J = this.constraintHandler.currentConstraint.point, this.hint.innerHTML = '[' + Math.round(100 * J.x) + '%, ' + Math.round(100 * J.y) + '%]') : this.marker.hasValidState() && (this.hint.style.visibility = 'hidden');
    this.hint.style.left = Math.round(t.getGraphX() - this.hint.clientWidth / 2) + 'px';
    this.hint.style.top = Math.max(t.getGraphY(), z.y) + Editor.hintOffset + 'px';
    null != this.linkHint && (this.linkHint.style.display = 'none');
  };
  Graph.prototype.expandedImage = Graph.createSvgImage(9, 9, '<defs><linearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="30%" style="stop-color:#f0f0f0;" /><stop offset="100%" style="stop-color:#AFB0B6;" /></linearGradient></defs><rect x="0" y="0" width="9" height="9" stroke="#8A94A5" fill="url(#grad1)" stroke-width="2"/><path d="M 2 4.5 L 7 4.5 z" stroke="#000"/>');
  Graph.prototype.collapsedImage = Graph.createSvgImage(9, 9, '<defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="30%" style="stop-color:#f0f0f0;" /><stop offset="100%" style="stop-color:#AFB0B6;" /></linearGradient></defs><rect x="0" y="0" width="9" height="9" stroke="#8A94A5" fill="url(#grad1)" stroke-width="2"/><path d="M 4.5 2 L 4.5 7 M 2 4.5 L 7 4.5 z" stroke="#000"/>');
  mxEdgeHandler.prototype.removeHint = mxVertexHandler.prototype.removeHint;
  HoverIcons.prototype.mainHandle = Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>');
  HoverIcons.prototype.endMainHandle = Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="6" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>');
  HoverIcons.prototype.secondaryHandle = Graph.createSvgImage(16, 16, '<path d="m 8 3 L 13 8 L 8 13 L 3 8 z" stroke="#fff" fill="#fca000"/>');
  HoverIcons.prototype.fixedHandle = Graph.createSvgImage(22, 22, '<circle cx="11" cy="11" r="6" stroke="#fff" fill="#01bd22"/><path d="m 8 8 L 14 14M 8 14 L 14 8" stroke="#fff"/>');
  HoverIcons.prototype.endFixedHandle = Graph.createSvgImage(22, 22, '<circle cx="11" cy="11" r="7" stroke="#fff" fill="#01bd22"/><path d="m 8 8 L 14 14M 8 14 L 14 8" stroke="#fff"/>');
  HoverIcons.prototype.terminalHandle = Graph.createSvgImage(22, 22, '<circle cx="11" cy="11" r="6" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/><circle cx="11" cy="11" r="3" stroke="#fff" fill="transparent"/>');
  HoverIcons.prototype.endTerminalHandle = Graph.createSvgImage(22, 22, '<circle cx="11" cy="11" r="7" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/><circle cx="11" cy="11" r="3" stroke="#fff" fill="transparent"/>');
  HoverIcons.prototype.rotationHandle = Graph.createSvgImage(16, 16, '<path stroke="' + HoverIcons.prototype.arrowFill + '" fill="' + HoverIcons.prototype.arrowFill + '" d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"/>', 24, 24);
  mxConstraintHandler.prototype.pointImage = Graph.createSvgImage(5, 5, '<path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke-width="2" style="stroke-opacity:0.4" stroke="#ffffff"/><path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke="' + HoverIcons.prototype.arrowFill + '"/>');
  mxVertexHandler.TABLE_HANDLE_COLOR = '#fca000';
  mxVertexHandler.prototype.handleImage = HoverIcons.prototype.mainHandle;
  mxVertexHandler.prototype.secondaryHandleImage = HoverIcons.prototype.secondaryHandle;
  mxEdgeHandler.prototype.handleImage = HoverIcons.prototype.mainHandle;
  mxEdgeHandler.prototype.endHandleImage = HoverIcons.prototype.endMainHandle;
  mxEdgeHandler.prototype.terminalHandleImage = HoverIcons.prototype.terminalHandle;
  mxEdgeHandler.prototype.endTerminalHandleImage = HoverIcons.prototype.endTerminalHandle;
  mxEdgeHandler.prototype.fixedHandleImage = HoverIcons.prototype.fixedHandle;
  mxEdgeHandler.prototype.endFixedHandleImage = HoverIcons.prototype.endFixedHandle;
  mxEdgeHandler.prototype.labelHandleImage = HoverIcons.prototype.secondaryHandle;
  mxOutline.prototype.sizerImage = HoverIcons.prototype.mainHandle;
  null != window.Sidebar && (Sidebar.prototype.triangleUp = HoverIcons.prototype.triangleUp, Sidebar.prototype.triangleRight = HoverIcons.prototype.triangleRight, Sidebar.prototype.triangleDown = HoverIcons.prototype.triangleDown, Sidebar.prototype.triangleLeft = HoverIcons.prototype.triangleLeft, Sidebar.prototype.refreshTarget = HoverIcons.prototype.refreshTarget, Sidebar.prototype.roundDrop = HoverIcons.prototype.roundDrop);
  mxVertexHandler.prototype.rotationEnabled = !0;
  mxVertexHandler.prototype.manageSizers = !0;
  mxVertexHandler.prototype.livePreview = !0;
  mxGraphHandler.prototype.maxLivePreview = 16;
  mxRubberband.prototype.defaultOpacity = 30;
  mxConnectionHandler.prototype.outlineConnect = !0;
  mxCellHighlight.prototype.keepOnTop = !0;
  mxVertexHandler.prototype.parentHighlightEnabled = !0;
  mxEdgeHandler.prototype.parentHighlightEnabled = !0;
  mxEdgeHandler.prototype.dblClickRemoveEnabled = !0;
  mxEdgeHandler.prototype.straightRemoveEnabled = !0;
  mxEdgeHandler.prototype.virtualBendsEnabled = !0;
  mxEdgeHandler.prototype.mergeRemoveEnabled = !0;
  mxEdgeHandler.prototype.manageLabelHandle = !0;
  mxEdgeHandler.prototype.outlineConnect = !0;
  mxEdgeHandler.prototype.isAddVirtualBendEvent = function(t) {
    return !mxEvent.isShiftDown(t.getEvent());
  };
  mxEdgeHandler.prototype.isCustomHandleEvent = function(t) {
    return !mxEvent.isShiftDown(t.getEvent());
  };
  if (Graph.touchStyle) {
    if (mxClient.IS_TOUCH || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints)
      mxShape.prototype.svgStrokeTolerance = 18, mxVertexHandler.prototype.tolerance = 12, mxEdgeHandler.prototype.tolerance = 12, Graph.prototype.tolerance = 12, mxVertexHandler.prototype.rotationHandleVSpacing = -16, mxConstraintHandler.prototype.getTolerance = function(t) {
        return mxEvent.isMouseEvent(t.getEvent()) ? 4 : this.graph.getTolerance();
      };
    mxPanningHandler.prototype.isPanningTrigger = function(t) {
      var z = t.getEvent();
      return null == t.getState() && !mxEvent.isMouseEvent(z) || mxEvent.isPopupTrigger(z) && (null == t.getState() || mxEvent.isControlDown(z) || mxEvent.isShiftDown(z));
    };
    var ca = mxGraphHandler.prototype.mouseDown;
    mxGraphHandler.prototype.mouseDown = function(t, z) {
      ca.apply(this, arguments);
      mxEvent.isTouchEvent(z.getEvent()) && this.graph.isCellSelected(z.getCell()) && 1 < this.graph.getSelectionCount() && (this.delayedSelection = !1);
    };
  } else
    mxPanningHandler.prototype.isPanningTrigger = function(t) {
      var z = t.getEvent();
      return mxEvent.isLeftMouseButton(z) && (this.useLeftButtonForPanning && null == t.getState() || mxEvent.isControlDown(z) && !mxEvent.isShiftDown(z)) || this.usePopupTrigger && mxEvent.isPopupTrigger(z);
    };
  mxRubberband.prototype.isSpaceEvent = function(t) {
    return this.graph.isEnabled() && !this.graph.isCellLocked(this.graph.getDefaultParent()) && (mxEvent.isControlDown(t.getEvent()) || mxEvent.isMetaDown(t.getEvent())) && mxEvent.isShiftDown(t.getEvent()) && mxEvent.isAltDown(t.getEvent());
  };
  mxRubberband.prototype.cancelled = !1;
  mxRubberband.prototype.cancel = function() {
    this.isActive() && (this.cancelled = !0, this.reset());
  };
  mxRubberband.prototype.mouseUp = function(t, z) {
    if (this.cancelled)
      this.cancelled = !1, z.consume();
    else {
      var B = null != this.div && 'none' != this.div.style.display,
        E = null,
        J = null,
        M = t = null;
      null != this.first && null != this.currentX && null != this.currentY && (E = this.first.x, J = this.first.y, t = (this.currentX - E) / this.graph.view.scale, M = (this.currentY - J) / this.graph.view.scale, mxEvent.isAltDown(z.getEvent()) || (t = this.graph.snap(t), M = this.graph.snap(M), this.graph.isGridEnabled() || (Math.abs(t) < this.graph.tolerance && (t = 0), Math.abs(M) < this.graph.tolerance && (M = 0))));
      this.reset();
      if (B) {
        if (this.isSpaceEvent(z)) {
          this.graph.model.beginUpdate();
          try {
            var W = this.graph.getCellsBeyond(E, J, this.graph.getDefaultParent(), !0, !0);
            for (B = 0; B < W.length; B++)
              if (this.graph.isCellMovable(W[B])) {
                var ha = this.graph.view.getState(W[B]),
                  da = this.graph.getCellGeometry(W[B]);
                null != ha && null != da && (da = da.clone(), da.translate(t, M), this.graph.model.setGeometry(W[B], da));
              }
          } finally {
            this.graph.model.endUpdate();
          }
        } else
          W = new mxRectangle(this.x, this.y, this.width, this.height), this.graph.selectRegion(W, z.getEvent());
        z.consume();
      }
    }
  };
  mxRubberband.prototype.mouseMove = function(t, z) {
    if (!z.isConsumed() && null != this.first) {
      var B = mxUtils.getScrollOrigin(this.graph.container);
      t = mxUtils.getOffset(this.graph.container);
      B.x -= t.x;
      B.y -= t.y;
      t = z.getX() + B.x;
      B = z.getY() + B.y;
      var E = this.first.x - t,
        J = this.first.y - B,
        M = this.graph.tolerance;
      if (null != this.div || Math.abs(E) > M || Math.abs(J) > M)
        null == this.div && (this.div = this.createShape()), mxUtils.clearSelection(), this.update(t, B), this.isSpaceEvent(z) ? (t = this.x + this.width, B = this.y + this.height, E = this.graph.view.scale, mxEvent.isAltDown(z.getEvent()) || (this.width = this.graph.snap(this.width / E) * E, this.height = this.graph.snap(this.height / E) * E, this.graph.isGridEnabled() || (this.width < this.graph.tolerance && (this.width = 0), this.height < this.graph.tolerance && (this.height = 0)), this.x < this.first.x && (this.x = t - this.width), this.y < this.first.y && (this.y = B - this.height)), this.div.style.borderStyle = 'dashed', this.div.style.backgroundColor = 'white', this.div.style.left = this.x + 'px', this.div.style.top = this.y + 'px', this.div.style.width = Math.max(0, this.width) + 'px', this.div.style.height = this.graph.container.clientHeight + 'px', this.div.style.borderWidth = 0 >= this.width ? '0px 1px 0px 0px' : '0px 1px 0px 1px', null == this.secondDiv && (this.secondDiv = this.div.cloneNode(!0), this.div.parentNode.appendChild(this.secondDiv)), this.secondDiv.style.left = this.x + 'px', this.secondDiv.style.top = this.y + 'px', this.secondDiv.style.width = this.graph.container.clientWidth + 'px', this.secondDiv.style.height = Math.max(0, this.height) + 'px', this.secondDiv.style.borderWidth = 0 >= this.height ? '1px 0px 0px 0px' : '1px 0px 1px 0px') : (this.div.style.backgroundColor = '', this.div.style.borderWidth = '', this.div.style.borderStyle = '', null != this.secondDiv && (this.secondDiv.parentNode.removeChild(this.secondDiv), this.secondDiv = null)), z.consume();
    }
  };
  var ra = mxRubberband.prototype.reset;
  mxRubberband.prototype.reset = function() {
    null != this.secondDiv && (this.secondDiv.parentNode.removeChild(this.secondDiv), this.secondDiv = null);
    ra.apply(this, arguments);
  };
  var ua = new Date().getTime(),
    Ga = 0,
    Ia = mxEdgeHandler.prototype.updatePreviewState;
  mxEdgeHandler.prototype.updatePreviewState = function(t, z, B, E) {
    Ia.apply(this, arguments);
    B != this.currentTerminalState ? (ua = new Date().getTime(), Ga = 0) : Ga = new Date().getTime() - ua;
    this.currentTerminalState = B;
  };
  var wa = mxEdgeHandler.prototype.isOutlineConnectEvent;
  mxEdgeHandler.prototype.isOutlineConnectEvent = function(t) {
    return mxEvent.isShiftDown(t.getEvent()) && mxEvent.isAltDown(t.getEvent()) ? !1 : null != this.currentTerminalState && t.getState() == this.currentTerminalState && 2000 < Ga || (null == this.currentTerminalState || '0' != mxUtils.getValue(this.currentTerminalState.style, 'outlineConnect', '1')) && wa.apply(this, arguments);
  };
  mxEdgeHandler.prototype.createHandleShape = function(t, z, B) {
    z = null != t && 0 == t;
    var E = this.state.getVisibleTerminalState(z);
    t = null != t && (0 == t || t >= this.state.absolutePoints.length - 1 || this.constructor == mxElbowEdgeHandler && 2 == t) ? this.graph.getConnectionConstraint(this.state, E, z) : null;
    B = null != (null != t ? this.graph.getConnectionPoint(this.state.getVisibleTerminalState(z), t) : null) ? B ? this.endFixedHandleImage : this.fixedHandleImage : null != t && null != E ? B ? this.endTerminalHandleImage : this.terminalHandleImage : B ? this.endHandleImage : this.handleImage;
    if (null != B)
      return B = new mxImageShape(new mxRectangle(0, 0, B.width, B.height), B.src), B.preserveImageAspect = !1, B;
    B = mxConstants.HANDLE_SIZE;
    this.preferHtml && --B;
    return new mxRectangleShape(new mxRectangle(0, 0, B, B), mxConstants.HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR);
  };
  var Ca = mxVertexHandler.prototype.createSizerShape;
  mxVertexHandler.prototype.createSizerShape = function(t, z, B) {
    this.handleImage = z == mxEvent.ROTATION_HANDLE ? HoverIcons.prototype.rotationHandle : z == mxEvent.LABEL_HANDLE ? this.secondaryHandleImage : this.handleImage;
    return Ca.apply(this, arguments);
  };
  var ta = mxGraphHandler.prototype.getBoundingBox;
  mxGraphHandler.prototype.getBoundingBox = function(t) {
    if (null != t && 1 == t.length) {
      var z = this.graph.getModel(),
        B = z.getParent(t[0]),
        E = this.graph.getCellGeometry(t[0]);
      if (z.isEdge(B) && null != E && E.relative && (z = this.graph.view.getState(t[0]), null != z && 2 > z.width && 2 > z.height && null != z.text && null != z.text.boundingBox))
        return mxRectangle.fromRectangle(z.text.boundingBox);
    }
    return ta.apply(this, arguments);
  };
  var Ha = mxGraphHandler.prototype.getGuideStates;
  mxGraphHandler.prototype.getGuideStates = function() {
    for (var t = Ha.apply(this, arguments), z = [], B = 0; B < t.length; B++)
      '1' != mxUtils.getValue(t[B].style, 'part', '0') && z.push(t[B]);
    return z;
  };
  var Va = mxVertexHandler.prototype.getSelectionBounds;
  mxVertexHandler.prototype.getSelectionBounds = function(t) {
    var z = this.graph.getModel(),
      B = z.getParent(t.cell),
      E = this.graph.getCellGeometry(t.cell);
    return z.isEdge(B) && null != E && E.relative && 2 > t.width && 2 > t.height && null != t.text && null != t.text.boundingBox ? (z = t.text.unrotatedBoundingBox || t.text.boundingBox, new mxRectangle(Math.round(z.x), Math.round(z.y), Math.round(z.width), Math.round(z.height))) : Va.apply(this, arguments);
  };
  var fb = mxVertexHandler.prototype.mouseDown;
  mxVertexHandler.prototype.mouseDown = function(t, z) {
    var B = this.graph.getModel(),
      E = B.getParent(this.state.cell),
      J = this.graph.getCellGeometry(this.state.cell);
    (this.getHandleForEvent(z) == mxEvent.ROTATION_HANDLE || !B.isEdge(E) || null == J || !J.relative || null == this.state || 2 <= this.state.width || 2 <= this.state.height) && fb.apply(this, arguments);
  };
  mxVertexHandler.prototype.rotateClick = function() {
    var t = mxUtils.getValue(this.state.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE),
      z = mxUtils.getValue(this.state.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE);
    this.state.view.graph.model.isVertex(this.state.cell) && t == mxConstants.NONE && z == mxConstants.NONE ? (t = mxUtils.mod(mxUtils.getValue(this.state.style, mxConstants.STYLE_ROTATION, 0) + 90, 360), this.state.view.graph.setCellStyles(mxConstants.STYLE_ROTATION, t, [this.state.cell])) : this.state.view.graph.turnShapes([this.state.cell]);
  };
  var Ua = mxVertexHandler.prototype.mouseMove;
  mxVertexHandler.prototype.mouseMove = function(t, z) {
    Ua.apply(this, arguments);
    null != this.graph.graphHandler.first && (null != this.rotationShape && null != this.rotationShape.node && (this.rotationShape.node.style.display = 'none'), null != this.linkHint && 'none' != this.linkHint.style.display && (this.linkHint.style.display = 'none'));
  };
  var bb = mxVertexHandler.prototype.mouseUp;
  mxVertexHandler.prototype.mouseUp = function(t, z) {
    bb.apply(this, arguments);
    null != this.rotationShape && null != this.rotationShape.node && (this.rotationShape.node.style.display = 1 == this.graph.getSelectionCount() ? '' : 'none');
    null != this.linkHint && 'none' == this.linkHint.style.display && (this.linkHint.style.display = '');
    this.blockDelayedSelection = null;
  };
  var $a = mxVertexHandler.prototype.init;
  mxVertexHandler.prototype.init = function() {
    $a.apply(this, arguments);
    var t = !1;
    null != this.rotationShape && this.rotationShape.node.setAttribute('title', mxResources.get('rotateTooltip'));
    if (this.graph.isTable(this.state.cell) && this.graph.isCellMovable(this.state.cell))
      this.refreshMoveHandles();
    else if (1 == this.graph.getSelectionCount() && this.graph.isCellMovable(this.state.cell) && (this.graph.isTableCell(this.state.cell) || this.graph.isTableRow(this.state.cell))) {
      this.cornerHandles = [];
      for (var z = 0; 4 > z; z++) {
        var B = new mxRectangleShape(new mxRectangle(0, 0, 6, 6), '#ffffff', mxConstants.HANDLE_STROKECOLOR);
        B.dialect = mxConstants.DIALECT_SVG;
        B.init(this.graph.view.getOverlayPane());
        this.cornerHandles.push(B);
      }
    }
    var E = mxUtils.bind(this, function() {
      null != this.specialHandle && (this.specialHandle.node.style.display = this.graph.isEnabled() && this.graph.getSelectionCount() < this.graph.graphHandler.maxCells ? '' : 'none');
      this.redrawHandles();
    });
    this.changeHandler = mxUtils.bind(this, function(J, M) {
      this.updateLinkHint(this.graph.getLinkForCell(this.state.cell), this.graph.getLinksForState(this.state));
      E();
    });
    this.graph.getSelectionModel().addListener(mxEvent.CHANGE, this.changeHandler);
    this.graph.getModel().addListener(mxEvent.CHANGE, this.changeHandler);
    this.editingHandler = mxUtils.bind(this, function(J, M) {
      this.redrawHandles();
    });
    this.graph.addListener(mxEvent.EDITING_STOPPED, this.editingHandler);
    z = this.graph.getLinkForCell(this.state.cell);
    B = this.graph.getLinksForState(this.state);
    this.updateLinkHint(z, B);
    if (null != z || null != B && 0 < B.length)
      t = !0;
    t && this.redrawHandles();
  };
  mxVertexHandler.prototype.updateLinkHint = function(t, z) {
    try {
      if (null == t && (null == z || 0 == z.length) || 1 < this.graph.getSelectionCount())
        null != this.linkHint && (this.linkHint.parentNode.removeChild(this.linkHint), this.linkHint = null);
      else if (null != t || null != z && 0 < z.length) {
        null == this.linkHint && (this.linkHint = a(), this.linkHint.style.padding = '6px 8px 6px 8px', this.linkHint.style.opacity = '1', this.linkHint.style.filter = '', this.graph.container.appendChild(this.linkHint), mxEvent.addListener(this.linkHint, 'mouseenter', mxUtils.bind(this, function() {
          this.graph.tooltipHandler.hide();
        })));
        this.linkHint.innerText = '';
        if (null != t && (this.linkHint.appendChild(this.graph.createLinkForHint(t)), this.graph.isEnabled() && 'function' === typeof this.graph.editLink)) {
          var B = document.createElement('img');
          B.className = 'geAdaptiveAsset';
          B.setAttribute('src', Editor.editImage);
          B.setAttribute('title', mxResources.get('editLink'));
          B.setAttribute('width', '11');
          B.setAttribute('height', '11');
          B.style.marginLeft = '10px';
          B.style.marginBottom = '-1px';
          B.style.cursor = 'pointer';
          this.linkHint.appendChild(B);
          mxEvent.addListener(B, 'click', mxUtils.bind(this, function(M) {
            this.graph.setSelectionCell(this.state.cell);
            this.graph.editLink();
            mxEvent.consume(M);
          }));
          var E = B.cloneNode(!0);
          E.setAttribute('src', Editor.trashImage);
          E.setAttribute('title', mxResources.get('removeIt', [mxResources.get('link')]));
          E.style.marginLeft = '4px';
          this.linkHint.appendChild(E);
          mxEvent.addListener(E, 'click', mxUtils.bind(this, function(M) {
            this.graph.setLinkForCell(this.state.cell, null);
            mxEvent.consume(M);
          }));
        }
        if (null != z)
          for (B = 0; B < z.length; B++) {
            var J = document.createElement('div');
            J.style.marginTop = null != t || 0 < B ? '6px' : '0px';
            J.appendChild(this.graph.createLinkForHint(z[B].getAttribute('href'), mxUtils.getTextContent(z[B])));
            this.linkHint.appendChild(J);
          }
      }
      null != this.linkHint && Graph.sanitizeNode(this.linkHint);
    } catch (M) {}
  };
  mxEdgeHandler.prototype.updateLinkHint = mxVertexHandler.prototype.updateLinkHint;
  var Wa = mxEdgeHandler.prototype.init;
  mxEdgeHandler.prototype.init = function() {
    Wa.apply(this, arguments);
    this.constraintHandler.isEnabled = mxUtils.bind(this, function() {
      return this.state.view.graph.connectionHandler.isEnabled();
    });
    var t = mxUtils.bind(this, function() {
      null != this.linkHint && (this.linkHint.style.display = 1 == this.graph.getSelectionCount() ? '' : 'none');
      null != this.labelShape && (this.labelShape.node.style.display = this.graph.isEnabled() && this.graph.getSelectionCount() < this.graph.graphHandler.maxCells ? '' : 'none');
    });
    this.changeHandler = mxUtils.bind(this, function(E, J) {
      this.updateLinkHint(this.graph.getLinkForCell(this.state.cell), this.graph.getLinksForState(this.state));
      t();
      this.redrawHandles();
    });
    this.graph.getSelectionModel().addListener(mxEvent.CHANGE, this.changeHandler);
    this.graph.getModel().addListener(mxEvent.CHANGE, this.changeHandler);
    var z = this.graph.getLinkForCell(this.state.cell),
      B = this.graph.getLinksForState(this.state);
    if (null != z || null != B && 0 < B.length)
      this.updateLinkHint(z, B), this.redrawHandles();
  };
  var ab = mxConnectionHandler.prototype.init;
  mxConnectionHandler.prototype.init = function() {
    ab.apply(this, arguments);
    this.constraintHandler.isEnabled = mxUtils.bind(this, function() {
      return this.graph.connectionHandler.isEnabled();
    });
  };
  var lb = mxVertexHandler.prototype.redrawHandles;
  mxVertexHandler.prototype.redrawHandles = function() {
    if (null != this.moveHandles)
      for (var t = 0; t < this.moveHandles.length; t++)
        null != this.moveHandles[t] && (this.moveHandles[t].style.left = this.moveHandles[t].rowState.x + this.moveHandles[t].rowState.width - 5 + 'px', this.moveHandles[t].style.top = this.moveHandles[t].rowState.y + this.moveHandles[t].rowState.height / 2 - 6 + 'px');
    if (null != this.cornerHandles) {
      t = this.getSelectionBorderInset();
      var z = this.cornerHandles,
        B = z[0].bounds.height / 2;
      z[0].bounds.x = this.state.x - z[0].bounds.width / 2 + t;
      z[0].bounds.y = this.state.y - B + t;
      z[0].redraw();
      z[1].bounds.x = z[0].bounds.x + this.state.width - 2 * t;
      z[1].bounds.y = z[0].bounds.y;
      z[1].redraw();
      z[2].bounds.x = z[0].bounds.x;
      z[2].bounds.y = this.state.y + this.state.height - 2 * t;
      z[2].redraw();
      z[3].bounds.x = z[1].bounds.x;
      z[3].bounds.y = z[2].bounds.y;
      z[3].redraw();
      for (t = 0; t < this.cornerHandles.length; t++)
        this.cornerHandles[t].node.style.display = 1 == this.graph.getSelectionCount() ? '' : 'none';
    }
    null != this.rotationShape && null != this.rotationShape.node && (this.rotationShape.node.style.display = null != this.moveHandles || 1 != this.graph.getSelectionCount() || null != this.index && this.index != mxEvent.ROTATION_HANDLE ? 'none' : '');
    lb.apply(this);
    null != this.state && null != this.linkHint && (t = new mxPoint(this.state.getCenterX(), this.state.getCenterY()), z = new mxRectangle(this.state.x, this.state.y - 22, this.state.width + 24, this.state.height + 22), B = mxUtils.getBoundingBox(z, this.state.style[mxConstants.STYLE_ROTATION] || '0', t), t = null != B ? mxUtils.getBoundingBox(this.state, this.state.style[mxConstants.STYLE_ROTATION] || '0') : this.state, z = null != this.state.text ? this.state.text.boundingBox : null, null == B && (B = this.state), B = B.y + B.height, null != z && (B = Math.max(B, z.y + z.height)), this.linkHint.style.left = Math.max(0, Math.round(t.x + (t.width - this.linkHint.clientWidth) / 2)) + 'px', this.linkHint.style.top = Math.round(B + this.verticalOffset / 2 + Editor.hintOffset) + 'px');
  };
  var db = mxVertexHandler.prototype.destroy;
  mxVertexHandler.prototype.destroy = function() {
    db.apply(this, arguments);
    if (null != this.moveHandles) {
      for (var t = 0; t < this.moveHandles.length; t++)
        null != this.moveHandles[t] && null != this.moveHandles[t].parentNode && this.moveHandles[t].parentNode.removeChild(this.moveHandles[t]);
      this.moveHandles = null;
    }
    if (null != this.cornerHandles) {
      for (t = 0; t < this.cornerHandles.length; t++)
        null != this.cornerHandles[t] && null != this.cornerHandles[t].node && null != this.cornerHandles[t].node.parentNode && this.cornerHandles[t].node.parentNode.removeChild(this.cornerHandles[t].node);
      this.cornerHandles = null;
    }
    null != this.linkHint && (null != this.linkHint.parentNode && this.linkHint.parentNode.removeChild(this.linkHint), this.linkHint = null);
    null != this.changeHandler && (this.graph.getSelectionModel().removeListener(this.changeHandler), this.graph.getModel().removeListener(this.changeHandler), this.changeHandler = null);
    null != this.editingHandler && (this.graph.removeListener(this.editingHandler), this.editingHandler = null);
  };
  var ea = mxEdgeHandler.prototype.redrawHandles;
  mxEdgeHandler.prototype.redrawHandles = function() {
    if (null != this.marker && (ea.apply(this), null != this.state && null != this.linkHint)) {
      var t = this.state;
      null != this.state.text && null != this.state.text.bounds && (t = new mxRectangle(t.x, t.y, t.width, t.height), t.add(this.state.text.bounds));
      this.linkHint.style.left = Math.max(0, Math.round(t.x + (t.width - this.linkHint.clientWidth) / 2)) + 'px';
      this.linkHint.style.top = Math.round(t.y + t.height + Editor.hintOffset) + 'px';
    }
  };
  var Ea = mxEdgeHandler.prototype.reset;
  mxEdgeHandler.prototype.reset = function() {
    Ea.apply(this, arguments);
    null != this.linkHint && (this.linkHint.style.visibility = '');
  };
  var Fa = mxEdgeHandler.prototype.destroy;
  mxEdgeHandler.prototype.destroy = function() {
    Fa.apply(this, arguments);
    null != this.linkHint && (this.linkHint.parentNode.removeChild(this.linkHint), this.linkHint = null);
    null != this.changeHandler && (this.graph.getModel().removeListener(this.changeHandler), this.graph.getSelectionModel().removeListener(this.changeHandler), this.changeHandler = null);
  };
}();