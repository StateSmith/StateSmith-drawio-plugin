DiagramStylePanel = function(a, b, f) {
  BaseFormatPanel.call(this, a, b, f);
  this.init();
};
mxUtils.extend(DiagramStylePanel, BaseFormatPanel);
DiagramStylePanel.prototype.init = function() {
  var a = this.editorUi;
  this.darkModeChangedListener = mxUtils.bind(this, function() {
    this.format.cachedStyleEntries = [];
  });
  a.addListener('darkModeChanged', this.darkModeChangedListener);
  this.container.appendChild(this.addView(this.createPanel()));
};
DiagramStylePanel.prototype.getGlobalStyleButtons = function() {
  var a = this.editorUi,
    b = a.editor.graph;
  return [
    mxUtils.button(mxResources.get('sketch'), mxUtils.bind(this, function(f) {
      var e = !Editor.sketchMode;
      b.updateCellStyles({
        sketch: e ? '1' : null,
        curveFitting: e ? Editor.sketchDefaultCurveFitting : null,
        jiggle: e ? Editor.sketchDefaultJiggle : null
      }, b.getVerticesAndEdges());
      a.setSketchMode(e);
      mxEvent.consume(f);
    })),
    mxUtils.button(mxResources.get('rounded'), mxUtils.bind(this, function(f) {
      var e = b.getVerticesAndEdges(),
        g = !0;
      if (0 < e.length)
        for (var d = 0; d < e.length; d++) {
          var h = b.getCellStyle(e[d]);
          if (0 == mxUtils.getValue(h, mxConstants.STYLE_ROUNDED, 0)) {
            g = !1;
            break;
          }
        }
      g = !g;
      b.updateCellStyles({
        rounded: g ? '1' : '0'
      }, e);
      g ? (b.currentEdgeStyle.rounded = '1', b.currentVertexStyle.rounded = '1') : (delete b.currentEdgeStyle.rounded, delete b.currentVertexStyle.rounded);
      mxEvent.consume(f);
    }))
  ];
};
DiagramStylePanel.prototype.addView = function(a) {
  var b = this.editorUi,
    f = b.editor.graph,
    e = f.getModel(),
    g = f.view.gridColor;
  a.style.paddingTop = '2px';
  a.style.whiteSpace = 'normal';
  var d = document.createElement('div');
  d.style.marginRight = '16px';
  d.style.paddingBottom = '2px';
  var h = document.createElement('table');
  h.style.width = '204px';
  var n = document.createElement('tbody'),
    u = document.createElement('tr');
  u.style.padding = '0px';
  var m = document.createElement('td');
  m.style.textAlign = 'center';
  m.style.padding = '2px';
  m.style.width = '50%';
  for (var p = m.cloneNode(!0), x = this.getGlobalStyleButtons(), A = 0; A < x.length; A += 2) {
    var C = x[A];
    C.style.height = '22px';
    C.style.width = '92px';
    m.appendChild(C);
    u.appendChild(m);
    C = x[A + 1];
    null != C && (C.style.height = '22px', C.style.width = '92px', p.appendChild(C));
    u.appendChild(p);
    n.appendChild(u);
    m = m.cloneNode(!1);
    p = p.cloneNode(!1);
    u = u.cloneNode(!1);
  }
  h.appendChild(n);
  d.appendChild(h);
  a.appendChild(d);
  var D = [
    'fillColor',
    'strokeColor',
    'fontColor',
    'gradientColor'
  ];
  a.style.whiteSpace = 'normal';
  a.style.borderStyle = 'none';
  a.style.paddingBottom = '0px';
  a.style.paddingLeft = '18px';
  a.style.paddingTop = '6px';
  var G = mxUtils.bind(this, function(la, N) {
      var X = f.getVerticesAndEdges();
      e.beginUpdate();
      try {
        for (var L = 0; L < X.length; L++) {
          var S = f.getCellStyle(X[L]);
          K || null == S.labelBackgroundColor ? K && f.updateCellStyles({
            labelBackgroundColor: mxConstants.NONE
          }, [X[L]]) : f.updateCellStyles({
            labelBackgroundColor: null != N ? N.background : null
          }, [X[L]]);
          for (var I = e.isEdge(X[L]), Y = e.getStyle(X[L]), ia = I ? f.currentEdgeStyle : f.currentVertexStyle, ka = 0; ka < la.length; ka++)
            if (null != S[la[ka]] && S[la[ka]] != mxConstants.NONE || la[ka] != mxConstants.STYLE_FILLCOLOR && la[ka] != mxConstants.STYLE_STROKECOLOR)
              Y = K && I && la[ka] == mxConstants.STYLE_FONTCOLOR ? mxUtils.setStyle(Y, la[ka], 'default') : mxUtils.setStyle(Y, la[ka], ia[la[ka]]);
          e.setStyle(X[L], Y);
        }
      } finally {
        e.endUpdate();
      }
    }),
    F = mxUtils.bind(this, function(la, N, X) {
      if (null != la)
        for (var L = 0; L < N.length; L++)
          if (null != la[N[L]] && la[N[L]] != mxConstants.NONE || N[L] != mxConstants.STYLE_FILLCOLOR && N[L] != mxConstants.STYLE_STROKECOLOR)
            la[N[L]] = X[N[L]];
    }),
    K = !0,
    P = mxUtils.bind(this, function(la, N, X, L, S) {
      if (null != la) {
        null != X && (K || null == N.labelBackgroundColor ? K && (N.labelBackgroundColor = mxConstants.NONE) : (L = null != L ? L.background : null, S = null != S ? S : f, null == L && (L = S.background), null == L && (L = S.defaultPageBackgroundColor), N.labelBackgroundColor = L));
        for (var I in la)
          if (null == X || null != N[I] && N[I] != mxConstants.NONE || I != mxConstants.STYLE_FILLCOLOR && I != mxConstants.STYLE_STROKECOLOR)
            K && e.isEdge(X) && I == mxConstants.STYLE_FONTCOLOR ? N[I] = 'default' : N[I] = la[I];
      }
    }),
    R = mxUtils.bind(this, function(la, N, X, L, S) {
      var I = document.createElement('div');
      I.style.background = Editor.isDarkMode() ? Editor.darkColor : '#ffffff';
      I.style.position = 'absolute';
      I.style.display = 'inline-block';
      I.style.overflow = 'hidden';
      I.style.pointerEvents = 'none';
      I.style.width = '100%';
      I.style.height = '100%';
      S.appendChild(I);
      var Y = new Graph(I, null, null, f.getStylesheet());
      Y.resetViewOnRootChange = !1;
      Y.foldingEnabled = !1;
      Y.gridEnabled = !1;
      Y.autoScroll = !1;
      Y.setTooltips(!1);
      Y.setConnectable(!1);
      Y.setPanning(!1);
      Y.setEnabled(!1);
      Y.getCellStyle = function(U, ca) {
        ca = null != ca ? ca : !0;
        var ra = mxUtils.clone(f.getCellStyle.apply(this, arguments)),
          ua = f.stylesheet.getDefaultVertexStyle(),
          Ga = N;
        e.isEdge(U) && (ua = f.stylesheet.getDefaultEdgeStyle(), Ga = X);
        F(ra, D, ua);
        P(la, ra, U, L, Y);
        P(Ga, ra, U, L, Y);
        ca && (ra = f.postProcessCellStyle(U, ra));
        return ra;
      };
      Y.model.beginUpdate();
      try {
        var ia = Y.insertVertex(Y.getDefaultParent(), null, 'Shape', 14, 8, 70, 36, 'strokeWidth=2;'),
          ka = Y.insertEdge(Y.getDefaultParent(), null, 'Connector', ia, ia, 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;endSize=5;strokeWidth=2;');
        ka.geometry.points = [new mxPoint(32, 66)];
        ka.geometry.offset = new mxPoint(0, 8);
      } finally {
        Y.model.endUpdate();
      }
    }),
    Q = document.createElement('div');
  Q.style.position = 'relative';
  Q.style.width = '210px';
  a.appendChild(Q);
  null == this.format.cachedStyleEntries && (this.format.cachedStyleEntries = []);
  var ba = mxUtils.bind(this, function(la, N, X, L, S) {
      var I = this.format.cachedStyleEntries[S];
      null == I && (I = document.createElement('div'), I.style.display = 'inline-block', I.style.position = 'relative', I.style.width = '96px', I.style.height = '86px', I.style.cursor = 'pointer', I.style.border = '1px solid gray', I.style.borderRadius = '8px', I.style.margin = '1px 2px', I.style.overflow = 'hidden', K || null == L || null == L.background || (I.style.backgroundColor = L.background), R(la, N, X, L, I), mxEvent.addGestureListeners(I, mxUtils.bind(this, function(Y) {
        I.style.opacity = 0.5;
      }), null, mxUtils.bind(this, function(Y) {
        I.style.opacity = 1;
        f.currentVertexStyle = mxUtils.clone(f.defaultVertexStyle);
        f.currentEdgeStyle = mxUtils.clone(f.defaultEdgeStyle);
        P(la, f.currentVertexStyle);
        P(la, f.currentEdgeStyle);
        P(N, f.currentVertexStyle);
        P(X, f.currentEdgeStyle);
        e.beginUpdate();
        try {
          var ia = D.slice(),
            ka;
          for (ka in la)
            ia.push(ka);
          G(ia, L);
          if (!K) {
            var U = new ChangePageSetup(b, null != L ? L.background : null);
            U.ignoreImage = !0;
            e.execute(U);
            e.execute(new ChangeGridColor(b, null != L && null != L.gridColor ? L.gridColor : g));
          }
        } finally {
          e.endUpdate();
        }
      })), mxEvent.addListener(I, 'mouseenter', mxUtils.bind(this, function(Y) {
        var ia = f.getCellStyle;
        Y = f.background;
        var ka = f.view.gridColor;
        K || (f.background = null != L ? L.background : null, f.view.gridColor = null != L && null != L.gridColor ? L.gridColor : g);
        f.getCellStyle = function(U, ca) {
          ca = null != ca ? ca : !0;
          var ra = mxUtils.clone(ia.apply(this, arguments)),
            ua = f.stylesheet.getDefaultVertexStyle(),
            Ga = N;
          e.isEdge(U) && (ua = f.stylesheet.getDefaultEdgeStyle(), Ga = X);
          F(ra, D, ua);
          P(la, ra, U, L);
          P(Ga, ra, U, L);
          ca && (ra = this.postProcessCellStyle(U, ra));
          return ra;
        };
        f.refresh();
        f.getCellStyle = ia;
        f.background = Y;
        f.view.gridColor = ka;
      })), mxEvent.addListener(I, 'mouseleave', mxUtils.bind(this, function(Y) {
        f.refresh();
      })), mxClient.IS_IE || mxClient.IS_IE11 || (this.format.cachedStyleEntries[S] = I));
      Q.appendChild(I);
    }),
    V = Math.ceil(Editor.styles.length / 10);
  this.format.currentStylePage = null != this.format.currentStylePage ? this.format.currentStylePage : 0;
  var T = [],
    Z = mxUtils.bind(this, function() {
      0 < T.length && (T[this.format.currentStylePage].style.background = '#84d7ff');
      for (var la = 10 * this.format.currentStylePage; la < Math.min(10 * (this.format.currentStylePage + 1), Editor.styles.length); la++) {
        var N = Editor.styles[la];
        ba(N.commonStyle, N.vertexStyle, N.edgeStyle, N.graph, la);
      }
    }),
    ma = mxUtils.bind(this, function(la) {
      0 <= la && la < V && (T[this.format.currentStylePage].style.background = 'transparent', Q.innerText = '', this.format.currentStylePage = la, Z());
    });
  if (1 < V) {
    d = document.createElement('div');
    d.style.whiteSpace = 'nowrap';
    d.style.position = 'relative';
    d.style.textAlign = 'center';
    d.style.paddingTop = '4px';
    d.style.width = '210px';
    for (A = 0; A < V; A++) {
      var ja = document.createElement('div');
      ja.style.display = 'inline-block';
      ja.style.width = '6px';
      ja.style.height = '6px';
      ja.style.marginLeft = '4px';
      ja.style.marginRight = '3px';
      ja.style.borderRadius = '3px';
      ja.style.cursor = 'pointer';
      ja.style.background = 'transparent';
      ja.style.border = '1px solid #b5b6b7';
      mxUtils.bind(this, function(la, N) {
        mxEvent.addListener(ja, 'click', mxUtils.bind(this, function() {
          ma(la);
        }));
      })(A, ja);
      d.appendChild(ja);
      T.push(ja);
    }
    a.appendChild(d);
    Z();
    15 > V && (A = function(la) {
      mxEvent.addListener(la, 'mouseenter', function() {
        la.style.opacity = '1';
      });
      mxEvent.addListener(la, 'mouseleave', function() {
        la.style.opacity = '0.5';
      });
    }, m = document.createElement('div'), m.className = 'geAdaptiveAsset', m.style.position = 'absolute', m.style.left = '0px', m.style.top = '0px', m.style.bottom = '0px', m.style.width = '24px', m.style.height = '24px', m.style.margin = '0px', m.style.cursor = 'pointer', m.style.opacity = '0.5', m.style.backgroundRepeat = 'no-repeat', m.style.backgroundPosition = 'center center', m.style.backgroundSize = '24px 24px', m.style.backgroundImage = 'url(' + Editor.previousImage + ')', p = m.cloneNode(!1), p.style.backgroundImage = 'url(' + Editor.nextImage + ')', p.style.left = '', p.style.right = '2px', d.appendChild(m), d.appendChild(p), mxEvent.addListener(m, 'click', mxUtils.bind(this, function() {
      ma(mxUtils.mod(this.format.currentStylePage - 1, V));
    })), mxEvent.addListener(p, 'click', mxUtils.bind(this, function() {
      ma(mxUtils.mod(this.format.currentStylePage + 1, V));
    })), A(m), A(p));
  } else
    Z();
  return a;
};
DiagramStylePanel.prototype.destroy = function() {
  BaseFormatPanel.prototype.destroy.apply(this, arguments);
  this.darkModeChangedListener && (this.editorUi.removeListener(this.darkModeChangedListener), this.darkModeChangedListener = null);
};