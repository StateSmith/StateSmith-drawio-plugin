Graph = function(a, b, f, e, g, d) {
  mxGraph.call(this, a, b, f, e);
  this.themes = g || this.defaultThemes;
  this.currentEdgeStyle = mxUtils.clone(this.defaultEdgeStyle);
  this.currentVertexStyle = mxUtils.clone(this.defaultVertexStyle);
  this.standalone = null != d ? d : !1;
  a = this.baseUrl;
  b = a.indexOf('//');
  this.domainPathUrl = this.domainUrl = '';
  0 < b && (b = a.indexOf('/', b + 2), 0 < b && (this.domainUrl = a.substring(0, b)), b = a.lastIndexOf('/'), 0 < b && (this.domainPathUrl = a.substring(0, b + 1)));
  this.isHtmlLabel = function(N) {
    N = this.getCurrentCellStyle(N);
    return null != N ? '1' == N.html || 'wrap' == N[mxConstants.STYLE_WHITE_SPACE] : !1;
  };
  if (this.edgeMode) {
    var h = null,
      n = null,
      u = null,
      m = null,
      p = !1;
    this.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function(N, X) {
      if ('mouseDown' == X.getProperty('eventName') && this.isEnabled()) {
        N = X.getProperty('event');
        var L = N.getState();
        X = this.view.scale;
        if (!mxEvent.isAltDown(N.getEvent()) && null != L)
          if (this.model.isEdge(L.cell))
            if (h = new mxPoint(N.getGraphX(), N.getGraphY()), p = this.isCellSelected(L.cell), u = L, n = N, null != L.text && null != L.text.boundingBox && mxUtils.contains(L.text.boundingBox, N.getGraphX(), N.getGraphY()))
              m = mxEvent.LABEL_HANDLE;
            else {
              var S = this.selectionCellsHandler.getHandler(L.cell);
              null != S && null != S.bends && 0 < S.bends.length && (m = S.getHandleForEvent(N));
            }
        else if (!this.panningHandler.isActive() && !mxEvent.isControlDown(N.getEvent()) && (S = this.selectionCellsHandler.getHandler(L.cell), null == S || null == S.getHandleForEvent(N))) {
          var I = new mxRectangle(N.getGraphX() - 1, N.getGraphY() - 1),
            Y = mxEvent.isTouchEvent(N.getEvent()) ? mxShape.prototype.svgStrokeTolerance - 1 : (mxShape.prototype.svgStrokeTolerance + 2) / 2;
          S = Y + 2;
          I.grow(Y);
          if (this.isTableCell(L.cell) && this.isCellMovable(L.cell) && !this.isCellSelected(L.cell) && !(mxUtils.contains(L, N.getGraphX() - S, N.getGraphY() - S) && mxUtils.contains(L, N.getGraphX() - S, N.getGraphY() + S) && mxUtils.contains(L, N.getGraphX() + S, N.getGraphY() + S) && mxUtils.contains(L, N.getGraphX() + S, N.getGraphY() - S))) {
            var ia = this.model.getParent(L.cell);
            S = this.model.getParent(ia);
            if (!this.isCellSelected(S)) {
              Y *= X;
              var ka = 2 * Y;
              if (this.model.getChildAt(S, 0) != ia && mxUtils.intersects(I, new mxRectangle(L.x, L.y - Y, L.width, ka)) || this.model.getChildAt(ia, 0) != L.cell && mxUtils.intersects(I, new mxRectangle(L.x - Y, L.y, ka, L.height)) || mxUtils.intersects(I, new mxRectangle(L.x, L.y + L.height - Y, L.width, ka)) || mxUtils.intersects(I, new mxRectangle(L.x + L.width - Y, L.y, ka, L.height)))
                ia = this.selectionCellsHandler.isHandled(S), this.selectCellForEvent(S, N.getEvent()), S = this.selectionCellsHandler.getHandler(S), null != S && (Y = S.getHandleForEvent(N), null != Y && (S.start(N.getGraphX(), N.getGraphY(), Y), S.blockDelayedSelection = !ia, N.consume()));
            }
          }
          for (; !N.isConsumed() && null != L && (this.isTableCell(L.cell) || this.isTableRow(L.cell) || this.isTable(L.cell));)
            this.isSwimlane(L.cell) && this.isCellMovable(L.cell) && (S = this.getActualStartSize(L.cell), (0 < S.x || 0 < S.width) && mxUtils.intersects(I, new mxRectangle(L.x + (S.x - S.width - 1) * X + (0 == S.x ? L.width : 0), L.y, 1, L.height)) || (0 < S.y || 0 < S.height) && mxUtils.intersects(I, new mxRectangle(L.x, L.y + (S.y - S.height - 1) * X + (0 == S.y ? L.height : 0), L.width, 1))) && (this.selectCellForEvent(L.cell, N.getEvent()), S = this.selectionCellsHandler.getHandler(L.cell), null != S && null != S.customHandles && (Y = mxEvent.CUSTOM_HANDLE - S.customHandles.length + 1, S.start(N.getGraphX(), N.getGraphY(), Y), N.consume())), L = this.view.getState(this.model.getParent(L.cell));
        }
      }
    }));
    this.addMouseListener({
      mouseDown: function(N, X) {},
      mouseMove: mxUtils.bind(this, function(N, X) {
        N = this.selectionCellsHandler.handlers.map;
        for (var L in N)
          if (null != N[L].index)
            return;
        if (this.isEnabled() && !this.panningHandler.isActive() && !mxEvent.isAltDown(X.getEvent())) {
          var S = this.tolerance;
          if (null != h && null != u && null != n) {
            if (L = u, Math.abs(h.x - X.getGraphX()) > S || Math.abs(h.y - X.getGraphY()) > S) {
              var I = this.selectionCellsHandler.getHandler(L.cell);
              null == I && this.model.isEdge(L.cell) && (I = this.createHandler(L));
              if (null != I && null != I.bends && 0 < I.bends.length) {
                N = I.getHandleForEvent(n, !0);
                var Y = this.view.getEdgeStyle(L);
                S = Y == mxEdgeStyle.EntityRelation;
                p || m != mxEvent.LABEL_HANDLE || (N = m);
                if (S && 0 != N && N != I.bends.length - 1 && N != mxEvent.LABEL_HANDLE)
                  !S || null == L.visibleSourceState && null == L.visibleTargetState || (this.graphHandler.reset(), X.consume());
                else if (N == mxEvent.LABEL_HANDLE || 0 == N || null != L.visibleSourceState || N == I.bends.length - 1 || null != L.visibleTargetState)
                  S || N == mxEvent.LABEL_HANDLE || (S = L.absolutePoints, null != S && (null == Y && null == N || Y == mxEdgeStyle.OrthConnector) && (N = m, null == N && (N = new mxRectangle(h.x, h.y), N.grow(mxEdgeHandler.prototype.handleImage.width / 2), mxUtils.contains(N, S[0].x, S[0].y) ? N = 0 : mxUtils.contains(N, S[S.length - 1].x, S[S.length - 1].y) ? N = I.bends.length - 1 : null != Y && (2 == S.length || 3 == S.length && (0 == Math.round(S[0].x - S[1].x) && 0 == Math.round(S[1].x - S[2].x) || 0 == Math.round(S[0].y - S[1].y) && 0 == Math.round(S[1].y - S[2].y))) ? N = 2 : (N = mxUtils.findNearestSegment(L, h.x, h.y), N = null == Y ? mxEvent.VIRTUAL_HANDLE - N : N + 1))), null == N && (N = mxEvent.VIRTUAL_HANDLE)), I.start(X.getGraphX(), X.getGraphX(), N), X.consume(), this.graphHandler.reset();
              }
              null != I && (this.selectionCellsHandler.isHandlerActive(I) ? this.isCellSelected(L.cell) || (this.selectionCellsHandler.handlers.put(L.cell, I), this.selectCellForEvent(L.cell, X.getEvent())) : this.isCellSelected(L.cell) || I.destroy());
              p = !1;
              h = n = u = m = null;
            }
          } else if (L = X.getState(), null != L && this.isCellEditable(L.cell)) {
            I = null;
            if (this.model.isEdge(L.cell)) {
              if (N = new mxRectangle(X.getGraphX(), X.getGraphY()), N.grow(mxEdgeHandler.prototype.handleImage.width / 2), S = L.absolutePoints, null != S)
                if (null != L.text && null != L.text.boundingBox && mxUtils.contains(L.text.boundingBox, X.getGraphX(), X.getGraphY()))
                  I = 'move';
                else if (mxUtils.contains(N, S[0].x, S[0].y) || mxUtils.contains(N, S[S.length - 1].x, S[S.length - 1].y))
                I = 'pointer';
              else if (null != L.visibleSourceState || null != L.visibleTargetState)
                N = this.view.getEdgeStyle(L), I = 'crosshair', N != mxEdgeStyle.EntityRelation && this.isOrthogonal(L) && (X = mxUtils.findNearestSegment(L, X.getGraphX(), X.getGraphY()), X < S.length - 1 && 0 <= X && (I = 0 == Math.round(S[X].x - S[X + 1].x) ? 'col-resize' : 'row-resize'));
            } else if (!mxEvent.isControlDown(X.getEvent())) {
              S = mxShape.prototype.svgStrokeTolerance / 2;
              N = new mxRectangle(X.getGraphX(), X.getGraphY());
              N.grow(S);
              if (this.isTableCell(L.cell) && this.isCellMovable(L.cell) && (X = this.model.getParent(L.cell), S = this.model.getParent(X), !this.isCellSelected(S)))
                if (mxUtils.intersects(N, new mxRectangle(L.x, L.y - 2, L.width, 4)) && this.model.getChildAt(S, 0) != X || mxUtils.intersects(N, new mxRectangle(L.x, L.y + L.height - 2, L.width, 4)))
                  I = 'row-resize';
                else if (mxUtils.intersects(N, new mxRectangle(L.x - 2, L.y, 4, L.height)) && this.model.getChildAt(X, 0) != L.cell || mxUtils.intersects(N, new mxRectangle(L.x + L.width - 2, L.y, 4, L.height)))
                I = 'col-resize';
              for (X = L; null == I && null != X && (this.isTableCell(X.cell) || this.isTableRow(X.cell) || this.isTable(X.cell));)
                this.isSwimlane(X.cell) && this.isCellMovable(X.cell) && (S = this.getActualStartSize(X.cell), Y = this.view.scale, (0 < S.x || 0 < S.width) && mxUtils.intersects(N, new mxRectangle(X.x + (S.x - S.width - 1) * Y + (0 == S.x ? X.width * Y : 0), X.y, 1, X.height)) ? I = 'col-resize' : (0 < S.y || 0 < S.height) && mxUtils.intersects(N, new mxRectangle(X.x, X.y + (S.y - S.height - 1) * Y + (0 == S.y ? X.height : 0), X.width, 1)) && (I = 'row-resize')), X = this.view.getState(this.model.getParent(X.cell));
            }
            null != I && L.setCursor(I);
          }
        }
      }),
      mouseUp: mxUtils.bind(this, function(N, X) {
        m = h = n = u = null;
      })
    });
  }
  this.cellRenderer.minSvgStrokeWidth = 0.1;
  this.cellRenderer.getLabelValue = function(N) {
    var X = mxCellRenderer.prototype.getLabelValue.apply(this, arguments);
    N.view.graph.isHtmlLabel(N.cell) && (X = 1 != N.style.html ? mxUtils.htmlEntities(X, !1) : Graph.sanitizeHtml(X));
    return X;
  };
  if ('undefined' !== typeof mxVertexHandler) {
    this.setConnectable(!0);
    this.setDropEnabled(!0);
    this.setPanning(!0);
    this.setTooltips(!0);
    this.setAllowLoops(!0);
    this.allowAutoPanning = !0;
    this.constrainChildren = this.resetEdgesOnConnect = !1;
    this.constrainRelativeChildren = !0;
    this.graphHandler.scrollOnMove = !1;
    this.graphHandler.scaleGrid = !0;
    this.connectionHandler.setCreateTarget(!1);
    this.connectionHandler.insertBeforeSource = !0;
    this.connectionHandler.isValidSource = function(N, X) {
      return !1;
    };
    this.alternateEdgeStyle = 'vertical';
    null == e && this.loadStylesheet();
    var x = this.graphHandler.getGuideStates;
    this.graphHandler.getGuideStates = function() {
      var N = x.apply(this, arguments);
      if (this.graph.pageVisible) {
        var X = [],
          L = this.graph.pageFormat,
          S = this.graph.pageScale,
          I = L.width * S;
        L = L.height * S;
        S = this.graph.view.translate;
        for (var Y = this.graph.view.scale, ia = this.graph.getPageLayout(), ka = 0; ka < ia.width; ka++)
          X.push(new mxRectangle(((ia.x + ka) * I + S.x) * Y, (ia.y * L + S.y) * Y, I * Y, L * Y));
        for (ka = 1; ka < ia.height; ka++)
          X.push(new mxRectangle((ia.x * I + S.x) * Y, ((ia.y + ka) * L + S.y) * Y, I * Y, L * Y));
        N = X.concat(N);
      }
      return N;
    };
    mxDragSource.prototype.dragElementZIndex = mxPopupMenu.prototype.zIndex;
    mxGuide.prototype.getGuideColor = function(N, X) {
      return null == N.cell ? '#ffa500' : mxConstants.GUIDE_COLOR;
    };
    this.graphHandler.createPreviewShape = function(N) {
      this.previewColor = '#000000' == this.graph.background ? '#ffffff' : mxGraphHandler.prototype.previewColor;
      return mxGraphHandler.prototype.createPreviewShape.apply(this, arguments);
    };
    var A = this.graphHandler.getCells;
    this.graphHandler.getCells = function(N) {
      for (var X = A.apply(this, arguments), L = new mxDictionary(), S = [], I = 0; I < X.length; I++) {
        var Y = this.graph.isTableCell(N) && this.graph.isTableCell(X[I]) && this.graph.isCellSelected(X[I]) ? this.graph.model.getParent(X[I]) : this.graph.isTableRow(N) && this.graph.isTableRow(X[I]) && this.graph.isCellSelected(X[I]) ? X[I] : this.graph.getCompositeParent(X[I]);
        null == Y || L.get(Y) || (L.put(Y, !0), S.push(Y));
      }
      return S;
    };
    var C = this.graphHandler.start;
    this.graphHandler.start = function(N, X, L, S) {
      var I = !1;
      this.graph.isTableCell(N) && (this.graph.isCellSelected(N) ? I = !0 : N = this.graph.model.getParent(N));
      I || this.graph.isTableRow(N) && this.graph.isCellSelected(N) || (N = this.graph.getCompositeParent(N));
      C.apply(this, arguments);
    };
    this.connectionHandler.createTargetVertex = function(N, X) {
      X = this.graph.getCompositeParent(X);
      return mxConnectionHandler.prototype.createTargetVertex.apply(this, arguments);
    };
    this.connectionHandler.insertEdge = function(N, X, L, S, I, Y) {
      var ia = mxConnectionHandler.prototype.insertEdge.apply(this, arguments);
      null != S && this.graph.applyNewEdgeStyle(S, [ia]);
      return ia;
    };
    var D = new mxRubberband(this);
    this.getRubberband = function() {
      return D;
    };
    var G = new Date().getTime(),
      F = 0,
      K = this.connectionHandler.mouseMove;
    this.connectionHandler.mouseMove = function() {
      var N = this.currentState;
      K.apply(this, arguments);
      N != this.currentState ? (G = new Date().getTime(), F = 0) : F = new Date().getTime() - G;
    };
    var P = this.connectionHandler.isOutlineConnectEvent;
    this.connectionHandler.isOutlineConnectEvent = function(N) {
      return mxEvent.isShiftDown(N.getEvent()) && mxEvent.isAltDown(N.getEvent()) ? !1 : null != this.currentState && N.getState() == this.currentState && 2000 < F || (null == this.currentState || '0' != mxUtils.getValue(this.currentState.style, 'outlineConnect', '1')) && P.apply(this, arguments);
    };
    var R = this.isToggleEvent;
    this.isToggleEvent = function(N) {
      return R.apply(this, arguments) || !mxClient.IS_CHROMEOS && mxEvent.isShiftDown(N);
    };
    var Q = D.isForceRubberbandEvent;
    D.isForceRubberbandEvent = function(N) {
      return Q.apply(this, arguments) || mxClient.IS_CHROMEOS && mxEvent.isShiftDown(N.getEvent()) || mxUtils.hasScrollbars(this.graph.container) && mxClient.IS_FF && mxClient.IS_WIN && null == N.getState() && mxEvent.isTouchEvent(N.getEvent());
    };
    var ba = null;
    this.panningHandler.addListener(mxEvent.PAN_START, mxUtils.bind(this, function() {
      this.isEnabled() && (ba = this.container.style.cursor, this.container.style.cursor = 'move');
    }));
    this.panningHandler.addListener(mxEvent.PAN_END, mxUtils.bind(this, function() {
      this.isEnabled() && (this.container.style.cursor = ba);
    }));
    this.popupMenuHandler.autoExpand = !0;
    this.popupMenuHandler.isSelectOnPopup = function(N) {
      return mxEvent.isMouseEvent(N.getEvent());
    };
    var V = this.click;
    this.click = function(N) {
      var X = null == N.state && null != N.sourceState && this.isCellLocked(N.sourceState.cell);
      if (this.isEnabled() && !X || N.isConsumed())
        return V.apply(this, arguments);
      var L = X ? N.sourceState.cell : N.getCell();
      null != L && (L = this.getClickableLinkForCell(L), null != L && (this.isCustomLink(L) ? this.customLinkClicked(L) : this.openLink(L)));
      this.isEnabled() && X && this.clearSelection();
    };
    this.tooltipHandler.getStateForEvent = function(N) {
      return N.sourceState;
    };
    var T = this.tooltipHandler.show;
    this.tooltipHandler.show = function() {
      T.apply(this, arguments);
      if (null != this.div)
        for (var N = this.div.getElementsByTagName('a'), X = 0; X < N.length; X++)
          null != N[X].getAttribute('href') && null == N[X].getAttribute('target') && N[X].setAttribute('target', '_blank');
    };
    this.tooltipHandler.getStateForEvent = function(N) {
      return N.sourceState;
    };
    this.getCursorForMouseEvent = function(N) {
      var X = null == N.state && null != N.sourceState && this.isCellLocked(N.sourceState.cell);
      return this.getCursorForCell(X ? N.sourceState.cell : N.getCell());
    };
    var Z = this.getCursorForCell;
    this.getCursorForCell = function(N) {
      if (!this.isEnabled() || this.isCellLocked(N)) {
        if (null != this.getClickableLinkForCell(N))
          return 'pointer';
        if (this.isCellLocked(N))
          return 'default';
      }
      return Z.apply(this, arguments);
    };
    this.selectRegion = function(N, X) {
      var L = mxEvent.isAltDown(X) ? N : null;
      N = this.getCells(N.x, N.y, N.width, N.height, null, null, L, function(S) {
        return '1' == mxUtils.getValue(S.style, 'locked', '0');
      }, !0);
      if (this.isToggleEvent(X))
        for (L = 0; L < N.length; L++)
          this.selectCellForEvent(N[L], X);
      else
        this.selectCellsForEvent(N, X);
      return N;
    };
    var ma = this.graphHandler.shouldRemoveCellsFromParent;
    this.graphHandler.shouldRemoveCellsFromParent = function(N, X, L) {
      return this.graph.isCellSelected(N) ? !1 : ma.apply(this, arguments);
    };
    this.isCellLocked = function(N) {
      for (; null != N;) {
        if ('1' == mxUtils.getValue(this.getCurrentCellStyle(N), 'locked', '0'))
          return !0;
        N = this.model.getParent(N);
      }
      return !1;
    };
    var ja = null;
    this.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function(N, X) {
      'mouseDown' == X.getProperty('eventName') && (N = X.getProperty('event').getState(), ja = null == N || this.isSelectionEmpty() || this.isCellSelected(N.cell) ? null : this.getSelectionCells());
    }));
    this.addListener(mxEvent.TAP_AND_HOLD, mxUtils.bind(this, function(N, X) {
      if (!mxEvent.isMultiTouchEvent(X)) {
        N = X.getProperty('event');
        var L = X.getProperty('cell');
        null == L ? (N = mxUtils.convertPoint(this.container, mxEvent.getClientX(N), mxEvent.getClientY(N)), D.start(N.x, N.y)) : null != ja ? this.addSelectionCells(ja) : 1 < this.getSelectionCount() && this.isCellSelected(L) && this.removeSelectionCell(L);
        ja = null;
        X.consume();
      }
    }));
    this.connectionHandler.selectCells = function(N, X) {
      this.graph.setSelectionCell(X || N);
    };
    this.connectionHandler.constraintHandler.isStateIgnored = function(N, X) {
      var L = N.view.graph;
      return X && (L.isCellSelected(N.cell) || L.isTableRow(N.cell) && L.selectionCellsHandler.isHandled(L.model.getParent(N.cell)));
    };
    this.selectionModel.addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
      var N = this.connectionHandler.constraintHandler;
      null != N.currentFocus && N.isStateIgnored(N.currentFocus, !0) && (N.currentFocus = null, N.constraints = null, N.destroyIcons());
      N.destroyFocusHighlight();
    }));
    Graph.touchStyle && this.initTouch();
    var la = this.updateMouseEvent;
    this.updateMouseEvent = function(N) {
      N = la.apply(this, arguments);
      null != N.state && this.isCellLocked(N.getCell()) && (N.state = null);
      return N;
    };
  }
  this.currentTranslate = new mxPoint(0, 0);
};
Graph.touchStyle = mxClient.IS_TOUCH || mxClient.IS_FF && mxClient.IS_WIN || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints || null == window.urlParams || '1' == urlParams.touch;
Graph.fileSupport = null != window.File && null != window.FileReader && null != window.FileList && (null == window.urlParams || '0' != urlParams.filesupport);
Graph.translateDiagram = '1' == urlParams['translate-diagram'];
Graph.diagramLanguage = null != urlParams['diagram-language'] ? urlParams['diagram-language'] : mxClient.language;
Graph.lineJumpsEnabled = !0;
Graph.defaultJumpSize = 6;
Graph.zoomWheel = !1;
Graph.minTableColumnWidth = 20;
Graph.minTableRowHeight = 20;
Graph.foreignObjectWarningText = 'Text is not SVG - cannot display';
Graph.foreignObjectWarningLink = 'https://www.diagrams.net/doc/faq/svg-export-text-problems';
Graph.xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
Graph.svgDoctype = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
Graph.svgFileComment = '<!-- Do not edit this file with editors other than diagrams.net -->';
Graph.pasteStyles = 'rounded shadow dashed dashPattern fontFamily fontSource fontSize fontColor fontStyle align verticalAlign strokeColor strokeWidth fillColor gradientColor swimlaneFillColor textOpacity gradientDirection glass labelBackgroundColor labelBorderColor opacity spacing spacingTop spacingLeft spacingBottom spacingRight endFill endArrow endSize targetPerimeterSpacing startFill startArrow startSize sourcePerimeterSpacing arcSize comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification comicStyle'.split(' ');
Graph.layoutNames = 'mxHierarchicalLayout mxCircleLayout mxCompactTreeLayout mxEdgeLabelLayout mxFastOrganicLayout mxParallelEdgeLayout mxPartitionLayout mxRadialTreeLayout mxStackLayout'.split(' ');
Graph.createOffscreenGraph = function(a) {
  var b = new Graph(document.createElement('div'));
  b.stylesheet.styles = mxUtils.clone(a.styles);
  b.resetViewOnRootChange = !1;
  b.setConnectable(!1);
  b.gridEnabled = !1;
  b.autoScroll = !1;
  b.setTooltips(!1);
  b.setEnabled(!1);
  b.container.style.visibility = 'hidden';
  b.container.style.position = 'absolute';
  b.container.style.overflow = 'hidden';
  b.container.style.height = '1px';
  b.container.style.width = '1px';
  return b;
};
Graph.createSvgImage = function(a, b, f, e, g) {
  f = unescape(encodeURIComponent(Graph.svgDoctype + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + a + 'px" height="' + b + 'px" ' + (null != e && null != g ? 'viewBox="0 0 ' + e + ' ' + g + '" ' : '') + 'version="1.1">' + f + '</svg>'));
  return new mxImage('data:image/svg+xml;base64,' + (window.btoa ? btoa(f) : Base64.encode(f, !0)), a, b);
};
Graph.createSvgNode = function(a, b, f, e, g) {
  var d = mxUtils.createXmlDocument(),
    h = null != d.createElementNS ? d.createElementNS(mxConstants.NS_SVG, 'svg') : d.createElement('svg');
  null != g && (null != h.style ? h.style.backgroundColor = g : h.setAttribute('style', 'background-color:' + g));
  null == d.createElementNS ? (h.setAttribute('xmlns', mxConstants.NS_SVG), h.setAttribute('xmlns:xlink', mxConstants.NS_XLINK)) : h.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', mxConstants.NS_XLINK);
  h.setAttribute('version', '1.1');
  h.setAttribute('width', f + 'px');
  h.setAttribute('height', e + 'px');
  h.setAttribute('viewBox', a + ' ' + b + ' ' + f + ' ' + e);
  d.appendChild(h);
  return h;
};
Graph.htmlToPng = function(a, b, f, e) {
  var g = document.createElement('canvas');
  g.width = b;
  g.height = f;
  var d = document.createElement('img');
  d.onload = mxUtils.bind(this, function() {
    g.getContext('2d').drawImage(d, 0, 0);
    e(g.toDataURL());
  });
  d.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>em{color:red;}</style><em>I</em> lick <span>cheese</span></div></foreignObject></svg>');
};
Graph.zapGremlins = function(a) {
  for (var b = 0, f = [], e = 0; e < a.length; e++) {
    var g = a.charCodeAt(e);
    (32 <= g || 9 == g || 10 == g || 13 == g) && 65535 != g && 65534 != g || (f.push(a.substring(b, e)), b = e + 1);
  }
  0 < b && b < a.length && f.push(a.substring(b));
  return 0 == f.length ? a : f.join('');
};
Graph.stringToBytes = function(a) {
  for (var b = Array(a.length), f = 0; f < a.length; f++)
    b[f] = a.charCodeAt(f);
  return b;
};
Graph.bytesToString = function(a) {
  for (var b = Array(a.length), f = 0; f < a.length; f++)
    b[f] = String.fromCharCode(a[f]);
  return b.join('');
};
Graph.base64EncodeUnicode = function(a) {
  return btoa(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g, function(b, f) {
    return String.fromCharCode(parseInt(f, 16));
  }));
};
Graph.base64DecodeUnicode = function(a) {
  return decodeURIComponent(Array.prototype.map.call(atob(a), function(b) {
    return '%' + ('00' + b.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};
Graph.compressNode = function(a, b) {
  a = mxUtils.getXml(a);
  return Graph.compress(b ? a : Graph.zapGremlins(a));
};
Graph.arrayBufferToString = function(a) {
  var b = '';
  a = new Uint8Array(a);
  for (var f = a.byteLength, e = 0; e < f; e++)
    b += String.fromCharCode(a[e]);
  return b;
};
Graph.stringToArrayBuffer = function(a) {
  return Uint8Array.from(a, function(b) {
    return b.charCodeAt(0);
  });
};
Graph.arrayBufferIndexOfString = function(a, b, f) {
  var e = b.charCodeAt(0),
    g = 1,
    d = -1;
  for (f = f || 0; f < a.byteLength; f++)
    if (a[f] == e) {
      d = f;
      break;
    }
  for (f = d + 1; - 1 < d && f < a.byteLength && f < d + b.length - 1; f++) {
    if (a[f] != b.charCodeAt(g))
      return Graph.arrayBufferIndexOfString(a, b, d + 1);
    g++;
  }
  return g == b.length - 1 ? d : -1;
};
Graph.compress = function(a, b) {
  if (null == a || 0 == a.length || 'undefined' === typeof pako)
    return a;
  a = b ? pako.deflate(encodeURIComponent(a)) : pako.deflateRaw(encodeURIComponent(a));
  return btoa(Graph.arrayBufferToString(new Uint8Array(a)));
};
Graph.decompress = function(a, b, f) {
  if (null == a || 0 == a.length || 'undefined' === typeof pako)
    return a;
  a = Graph.stringToArrayBuffer(atob(a));
  b = decodeURIComponent(b ? pako.inflate(a, {
    to: 'string'
  }) : pako.inflateRaw(a, {
    to: 'string'
  }));
  return f ? b : Graph.zapGremlins(b);
};
Graph.fadeNodes = function(a, b, f, e, g) {
  g = null != g ? g : 1000;
  Graph.setTransitionForNodes(a, null);
  Graph.setOpacityForNodes(a, b);
  window.setTimeout(function() {
    Graph.setTransitionForNodes(a, 'all ' + g + 'ms ease-in-out');
    Graph.setOpacityForNodes(a, f);
    window.setTimeout(function() {
      Graph.setTransitionForNodes(a, null);
      null != e && e();
    }, g);
  }, 0);
};
Graph.removeKeys = function(a, b) {
  for (var f in a)
    b(f) && delete a[f];
};
Graph.setTransitionForNodes = function(a, b) {
  for (var f = 0; f < a.length; f++)
    mxUtils.setPrefixedStyle(a[f].style, 'transition', b);
};
Graph.setOpacityForNodes = function(a, b) {
  for (var f = 0; f < a.length; f++)
    a[f].style.opacity = b;
};
Graph.removePasteFormatting = function(a) {
  for (; null != a;)
    null != a.firstChild && Graph.removePasteFormatting(a.firstChild), a.nodeType == mxConstants.NODETYPE_ELEMENT && null != a.style && (a.style.whiteSpace = '', '#000000' == a.style.color && (a.style.color = '')), a = a.nextSibling;
};
Graph.sanitizeHtml = function(a, b) {
  return Graph.domPurify(a, !1);
};
Graph.sanitizeLink = function(a) {
  if (null == a)
    return null;
  var b = document.createElement('a');
  b.setAttribute('href', a);
  Graph.sanitizeNode(b);
  return b.getAttribute('href');
};
Graph.sanitizeNode = function(a) {
  return Graph.domPurify(a, !0);
};
DOMPurify.addHook('afterSanitizeAttributes', function(a) {
  'use' == a.nodeName && (null != a.getAttribute('xlink:href') && !a.getAttribute('xlink:href').startsWith('#') || null != a.getAttribute('href') && !a.getAttribute('href').startsWith('#')) && a.remove();
});
DOMPurify.addHook('uponSanitizeAttribute', function(a, b) {
  'svg' == a.nodeName && 'content' == b.attrName && (b.forceKeepAttr = !0);
  return a;
});
Graph.domPurify = function(a, b) {
  window.DOM_PURIFY_CONFIG.IN_PLACE = b;
  return DOMPurify.sanitize(a, window.DOM_PURIFY_CONFIG);
};
Graph.clipSvgDataUri = function(a, b) {
  if (!mxClient.IS_IE && !mxClient.IS_IE11 && null != a && 'data:image/svg+xml;base64,' == a.substring(0, 26))
    try {
      var f = document.createElement('div');
      f.style.position = 'absolute';
      f.style.visibility = 'hidden';
      var e = decodeURIComponent(escape(atob(a.substring(26)))),
        g = e.indexOf('<svg');
      if (0 <= g) {
        f.innerHTML = Graph.sanitizeHtml(e.substring(g));
        var d = f.getElementsByTagName('svg');
        if (0 < d.length) {
          if (b || null != d[0].getAttribute('preserveAspectRatio')) {
            document.body.appendChild(f);
            try {
              e = b = 1;
              var h = d[0].getAttribute('width'),
                n = d[0].getAttribute('height');
              h = null != h && '%' != h.charAt(h.length - 1) ? parseFloat(h) : NaN;
              n = null != n && '%' != n.charAt(n.length - 1) ? parseFloat(n) : NaN;
              var u = d[0].getAttribute('viewBox');
              if (null != u && !isNaN(h) && !isNaN(n)) {
                var m = u.split(' ');
                4 <= u.length && (b = parseFloat(m[2]) / h, e = parseFloat(m[3]) / n);
              }
              var p = d[0].getBBox();
              0 < p.width && 0 < p.height && (f.getElementsByTagName('svg')[0].setAttribute('viewBox', p.x + ' ' + p.y + ' ' + p.width + ' ' + p.height), f.getElementsByTagName('svg')[0].setAttribute('width', p.width / b), f.getElementsByTagName('svg')[0].setAttribute('height', p.height / e));
            } catch (x) {} finally {
              document.body.removeChild(f);
            }
          }
          a = Editor.createSvgDataUri(mxUtils.getXml(d[0]));
        }
      }
    } catch (x) {}
  return a;
};
Graph.stripQuotes = function(a) {
  null != a && ('\'' == a.charAt(0) && (a = a.substring(1)), '\'' == a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1)), '"' == a.charAt(0) && (a = a.substring(1)), '"' == a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1)));
  return a;
};
Graph.createRemoveIcon = function(a, b) {
  var f = document.createElement('img');
  f.setAttribute('src', Dialog.prototype.clearImage);
  f.setAttribute('title', a);
  f.setAttribute('width', '13');
  f.setAttribute('height', '10');
  f.style.marginLeft = '4px';
  f.style.marginBottom = '-1px';
  f.style.cursor = 'pointer';
  mxEvent.addListener(f, 'click', b);
  return f;
};
Graph.isPageLink = function(a) {
  return null != a && 'data:page/id,' == a.substring(0, 13);
};
Graph.isLink = function(a) {
  return null != a && Graph.linkPattern.test(a);
};
Graph.linkPattern = RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i');
mxUtils.extend(Graph, mxGraph);
Graph.prototype.minFitScale = null;
Graph.prototype.maxFitScale = null;
Graph.prototype.linkPolicy = 'frame' == urlParams.target ? 'blank' : urlParams.target || 'auto';
Graph.prototype.linkTarget = 'frame' == urlParams.target ? '_self' : '_blank';
Graph.prototype.linkRelation = 'nofollow noopener noreferrer';
Graph.prototype.defaultScrollbars = !0;
Graph.prototype.defaultPageVisible = !0;
Graph.prototype.defaultGridEnabled = '0' != urlParams.grid;
Graph.prototype.lightbox = !1;
Graph.prototype.defaultPageBackgroundColor = '#ffffff';
Graph.prototype.diagramBackgroundColor = '#f0f0f0';
Graph.prototype.enableDiagramBackground = !1;
Graph.prototype.defaultPageBorderColor = '#ffffff';
Graph.prototype.shapeForegroundColor = '#000000';
Graph.prototype.shapeBackgroundColor = '#ffffff';
Graph.prototype.scrollTileSize = new mxRectangle(0, 0, 400, 400);
Graph.prototype.transparentBackground = !0;
Graph.prototype.selectParentAfterDelete = !1;
Graph.prototype.defaultEdgeLength = 80;
Graph.prototype.edgeMode = !1;
Graph.prototype.connectionArrowsEnabled = !0;
Graph.prototype.placeholderPattern = RegExp('%(date{.*}|[^%^{^}^ ^"^ \'^=^;]+)%', 'g');
Graph.prototype.absoluteUrlPattern = RegExp('^(?:[a-z]+:)?//', 'i');
Graph.prototype.defaultThemeName = 'default';
Graph.prototype.defaultThemes = {};
Graph.prototype.baseUrl = null != urlParams.base ? decodeURIComponent(urlParams.base) : (window != window.top ? document.referrer : document.location.toString()).split('#')[0];
Graph.prototype.editAfterInsert = !1;
Graph.prototype.builtInProperties = [
  'label',
  'tooltip',
  'placeholders',
  'placeholder'
];
Graph.prototype.standalone = !1;
Graph.prototype.enableFlowAnimation = !1;
Graph.prototype.roundableShapes = 'label rectangle internalStorage corner parallelogram swimlane triangle trapezoid ext step tee process link rhombus offPageConnector loopLimit hexagon manualInput card curlyBracket singleArrow callout doubleArrow flexArrow umlLifeline'.split(' ');
Graph.prototype.init = function(a) {
  mxGraph.prototype.init.apply(this, arguments);
  this.cellRenderer.initializeLabel = function(f, e) {
    mxCellRenderer.prototype.initializeLabel.apply(this, arguments);
    var g = f.view.graph.tolerance,
      d = !0,
      h = null,
      n = mxUtils.bind(this, function(p) {
        d = !0;
        h = new mxPoint(mxEvent.getClientX(p), mxEvent.getClientY(p));
      }),
      u = mxUtils.bind(this, function(p) {
        d = d && null != h && Math.abs(h.x - mxEvent.getClientX(p)) < g && Math.abs(h.y - mxEvent.getClientY(p)) < g;
      }),
      m = mxUtils.bind(this, function(p) {
        if (d)
          for (var x = mxEvent.getSource(p); null != x && x != e.node;) {
            if ('a' == x.nodeName.toLowerCase()) {
              f.view.graph.labelLinkClicked(f, x, p);
              break;
            }
            x = x.parentNode;
          }
      });
    mxEvent.addGestureListeners(e.node, n, u, m);
    mxEvent.addListener(e.node, 'click', function(p) {
      mxEvent.consume(p);
    });
  };
  if (null != this.tooltipHandler) {
    var b = this.tooltipHandler.init;
    this.tooltipHandler.init = function() {
      b.apply(this, arguments);
      null != this.div && mxEvent.addListener(this.div, 'click', mxUtils.bind(this, function(f) {
        var e = mxEvent.getSource(f);
        'A' == e.nodeName && (e = e.getAttribute('href'), null != e && this.graph.isCustomLink(e) && (mxEvent.isTouchEvent(f) || !mxEvent.isPopupTrigger(f)) && this.graph.customLinkClicked(e) && mxEvent.consume(f));
      }));
    };
  }
  this.addListener(mxEvent.SIZE, mxUtils.bind(this, function(f, e) {
    null != this.container && this.flowAnimationStyle && (f = this.flowAnimationStyle.getAttribute('id'), this.flowAnimationStyle.innerHTML = this.getFlowAnimationStyleCss(f));
  }));
  this.initLayoutManager();
};
(function() {
  Graph.prototype.useCssTransforms = !1;
  Graph.prototype.currentScale = 1;
  Graph.prototype.currentTranslate = new mxPoint(0, 0);
  Graph.prototype.isFillState = function(h) {
    return !this.isSpecialColor(h.style[mxConstants.STYLE_FILLCOLOR]) && '1' != mxUtils.getValue(h.style, 'lineShape', null) && (this.model.isVertex(h.cell) || 'arrow' == mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null) || 'filledEdge' == mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null) || 'flexArrow' == mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null) || 'mxgraph.arrows2.wedgeArrow' == mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null));
  };
  Graph.prototype.isStrokeState = function(h) {
    return !this.isSpecialColor(h.style[mxConstants.STYLE_STROKECOLOR]);
  };
  Graph.prototype.isSpecialColor = function(h) {
    return 0 <= mxUtils.indexOf([
      mxConstants.STYLE_STROKECOLOR,
      mxConstants.STYLE_FILLCOLOR,
      'inherit',
      'swimlane',
      'indicated'
    ], h);
  };
  Graph.prototype.isGlassState = function(h) {
    h = mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null);
    return 'label' == h || 'rectangle' == h || 'internalStorage' == h || 'ext' == h || 'umlLifeline' == h || 'swimlane' == h || 'process' == h;
  };
  Graph.prototype.isRoundedState = function(h) {
    return null != h.shape ? h.shape.isRoundable() : 0 <= mxUtils.indexOf(this.roundableShapes, mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null));
  };
  Graph.prototype.isLineJumpState = function(h) {
    var n = mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null);
    return !mxUtils.getValue(h.style, mxConstants.STYLE_CURVED, !1) && ('connector' == n || 'filledEdge' == n);
  };
  Graph.prototype.isAutoSizeState = function(h) {
    return '1' == mxUtils.getValue(h.style, mxConstants.STYLE_AUTOSIZE, null);
  };
  Graph.prototype.isImageState = function(h) {
    return null != mxUtils.getValue(h.style, mxConstants.STYLE_IMAGE, null);
  };
  Graph.prototype.isShadowState = function(h) {
    return 'image' != mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null);
  };
  Graph.prototype.getVerticesAndEdges = function(h, n) {
    h = null != h ? h : !0;
    n = null != n ? n : !0;
    var u = this.model;
    return u.filterDescendants(function(m) {
      return h && u.isVertex(m) || n && u.isEdge(m);
    }, u.getRoot());
  };
  Graph.prototype.applyNewEdgeStyle = function(h, n, u) {
    h = this.getCellStyle(h).newEdgeStyle;
    if (null != h) {
      this.model.beginUpdate();
      try {
        var m = JSON.parse(h),
          p;
        for (p in m)
          this.setCellStyles(p, m[p], n), 'edgeStyle' == p && 'elbowEdgeStyle' == m[p] && null != u && this.setCellStyles('elbow', u == mxConstants.DIRECTION_SOUTH || u == mxConstants.DIRECTION_NOTH ? 'vertical' : 'horizontal', n);
      } finally {
        this.model.endUpdate();
      }
    }
  };
  Graph.prototype.getCommonStyle = function(h) {
    for (var n = {}, u = 0; u < h.length; u++) {
      var m = this.view.getState(h[u]);
      this.mergeStyle(m.style, n, 0 == u);
    }
    return n;
  };
  Graph.prototype.mergeStyle = function(h, n, u) {
    if (null != h) {
      var m = {},
        p;
      for (p in h) {
        var x = h[p];
        null != x && (m[p] = !0, null == n[p] && u ? n[p] = x : n[p] != x && delete n[p]);
      }
      for (p in n)
        m[p] || delete n[p];
    }
  };
  Graph.prototype.getStartEditingCell = function(h, n) {
    n = this.getCellStyle(h);
    n = parseInt(mxUtils.getValue(n, mxConstants.STYLE_STARTSIZE, 0));
    this.isTable(h) && (!this.isSwimlane(h) || 0 == n) && '' == this.getLabel(h) && 0 < this.model.getChildCount(h) && (h = this.model.getChildAt(h, 0), n = this.getCellStyle(h), n = parseInt(mxUtils.getValue(n, mxConstants.STYLE_STARTSIZE, 0)));
    if (this.isTableRow(h) && (!this.isSwimlane(h) || 0 == n) && '' == this.getLabel(h) && 0 < this.model.getChildCount(h))
      for (n = 0; n < this.model.getChildCount(h); n++) {
        var u = this.model.getChildAt(h, n);
        if (this.isCellEditable(u)) {
          h = u;
          break;
        }
      }
    return h;
  };
  Graph.prototype.copyStyle = function(h) {
    return this.getCellStyle(h, !1);
  };
  Graph.prototype.pasteStyle = function(h, n, u) {
    u = null != u ? u : Graph.pasteStyles;
    Graph.removeKeys(h, function(m) {
      return 0 > mxUtils.indexOf(u, m);
    });
    this.updateCellStyles(h, n);
  };
  Graph.prototype.updateCellStyles = function(h, n) {
    this.model.beginUpdate();
    try {
      for (var u = 0; u < n.length; u++)
        if (this.model.isVertex(n[u]) || this.model.isEdge(n[u])) {
          var m = this.getCellStyle(n[u], !1),
            p;
          for (p in h) {
            var x = h[p];
            m[p] != x && this.setCellStyles(p, x, [n[u]]);
          }
        }
    } finally {
      this.model.endUpdate();
    }
  };
  Graph.prototype.isFastZoomEnabled = function() {
    return 'nocss' != urlParams.zoom && !mxClient.NO_FO && !mxClient.IS_EDGE && !this.useCssTransforms && (this.isCssTransformsSupported() || mxClient.IS_IOS);
  };
  Graph.prototype.isCssTransformsSupported = function() {
    return this.dialect == mxConstants.DIALECT_SVG && !mxClient.NO_FO && (!this.lightbox || !mxClient.IS_SF);
  };
  Graph.prototype.getCellAt = function(h, n, u, m, p, x) {
    this.useCssTransforms && (h = h / this.currentScale - this.currentTranslate.x, n = n / this.currentScale - this.currentTranslate.y);
    return this.getScaledCellAt.apply(this, arguments);
  };
  Graph.prototype.getScaledCellAt = function(h, n, u, m, p, x) {
    m = null != m ? m : !0;
    p = null != p ? p : !0;
    null == u && (u = this.getCurrentRoot(), null == u && (u = this.getModel().getRoot()));
    if (null != u)
      for (var A = this.model.getChildCount(u) - 1; 0 <= A; A--) {
        var C = this.model.getChildAt(u, A),
          D = this.getScaledCellAt(h, n, C, m, p, x);
        if (null != D)
          return D;
        if (this.isCellVisible(C) && (p && this.model.isEdge(C) || m && this.model.isVertex(C)) && (D = this.view.getState(C), null != D && (null == x || !x(D, h, n)) && this.intersects(D, h, n)))
          return C;
      }
    return null;
  };
  Graph.prototype.isRecursiveVertexResize = function(h) {
    return !this.isSwimlane(h.cell) && 0 < this.model.getChildCount(h.cell) && !this.isCellCollapsed(h.cell) && '1' == mxUtils.getValue(h.style, 'recursiveResize', '1') && null == mxUtils.getValue(h.style, 'childLayout', null);
  };
  Graph.prototype.getAbsoluteParent = function(h) {
    for (var n = this.getCellGeometry(h); null != n && n.relative;)
      h = this.getModel().getParent(h), n = this.getCellGeometry(h);
    return h;
  };
  Graph.prototype.isPart = function(h) {
    return '1' == mxUtils.getValue(this.getCurrentCellStyle(h), 'part', '0') || this.isTableCell(h) || this.isTableRow(h);
  };
  Graph.prototype.getCompositeParents = function(h) {
    for (var n = new mxDictionary(), u = [], m = 0; m < h.length; m++) {
      var p = this.getCompositeParent(h[m]);
      this.isTableCell(p) && (p = this.graph.model.getParent(p));
      this.isTableRow(p) && (p = this.graph.model.getParent(p));
      null == p || n.get(p) || (n.put(p, !0), u.push(p));
    }
    return u;
  };
  Graph.prototype.getCompositeParent = function(h) {
    for (; this.isPart(h);) {
      var n = this.model.getParent(h);
      if (!this.model.isVertex(n))
        break;
      h = n;
    }
    return h;
  };
  Graph.prototype.filterSelectionCells = function(h) {
    var n = this.getSelectionCells();
    if (null != h) {
      for (var u = [], m = 0; m < n.length; m++)
        h(n[m]) || u.push(n[m]);
      n = u;
    }
    return n;
  };
  var a = mxGraph.prototype.scrollRectToVisible;
  Graph.prototype.scrollRectToVisible = function(h) {
    if (this.useCssTransforms) {
      var n = this.currentScale,
        u = this.currentTranslate;
      h = new mxRectangle((h.x + 2 * u.x) * n - u.x, (h.y + 2 * u.y) * n - u.y, h.width * n, h.height * n);
    }
    a.apply(this, arguments);
  };
  mxCellHighlight.prototype.getStrokeWidth = function(h) {
    h = this.strokeWidth;
    this.graph.useCssTransforms && (h /= this.graph.currentScale);
    return h;
  };
  mxGraphView.prototype.getGraphBounds = function() {
    var h = this.graphBounds;
    if (this.graph.useCssTransforms) {
      var n = this.graph.currentTranslate,
        u = this.graph.currentScale;
      h = new mxRectangle((h.x + n.x) * u, (h.y + n.y) * u, h.width * u, h.height * u);
    }
    return h;
  };
  mxGraphView.prototype.viewStateChanged = function() {
    this.graph.useCssTransforms ? this.validate() : this.revalidate();
    this.graph.sizeDidChange();
  };
  var b = mxGraphView.prototype.validate;
  mxGraphView.prototype.validate = function(h) {
    this.graph.useCssTransforms && (this.graph.currentScale = this.scale, this.graph.currentTranslate.x = this.translate.x, this.graph.currentTranslate.y = this.translate.y, this.scale = 1, this.translate.x = 0, this.translate.y = 0);
    b.apply(this, arguments);
    this.graph.useCssTransforms && (this.graph.updateCssTransform(), this.scale = this.graph.currentScale, this.translate.x = this.graph.currentTranslate.x, this.translate.y = this.graph.currentTranslate.y);
  };
  var f = mxGraph.prototype.getCellsForGroup;
  Graph.prototype.getCellsForGroup = function(h) {
    h = f.apply(this, arguments);
    for (var n = [], u = 0; u < h.length; u++)
      this.isTableRow(h[u]) || this.isTableCell(h[u]) || n.push(h[u]);
    return n;
  };
  var e = mxGraph.prototype.getCellsForUngroup;
  Graph.prototype.getCellsForUngroup = function(h) {
    h = e.apply(this, arguments);
    for (var n = [], u = 0; u < h.length; u++)
      this.isTable(h[u]) || this.isTableRow(h[u]) || this.isTableCell(h[u]) || n.push(h[u]);
    return n;
  };
  Graph.prototype.updateCssTransform = function() {
    var h = this.view.getDrawPane();
    if (null != h)
      if (h = h.parentNode, this.useCssTransforms) {
        var n = h.getAttribute('transform');
        h.setAttribute('transformOrigin', '0 0');
        var u = Math.round(100 * this.currentScale) / 100;
        h.setAttribute('transform', 'scale(' + u + ',' + u + ')translate(' + Math.round(100 * this.currentTranslate.x) / 100 + ',' + Math.round(100 * this.currentTranslate.y) / 100 + ')');
        n != h.getAttribute('transform') && this.fireEvent(new mxEventObject('cssTransformChanged'), 'transform', h.getAttribute('transform'));
      } else
        h.removeAttribute('transformOrigin'), h.removeAttribute('transform');
  };
  var g = mxGraphView.prototype.validateBackgroundPage;
  mxGraphView.prototype.validateBackgroundPage = function() {
    var h = this.graph.useCssTransforms,
      n = this.scale,
      u = this.translate;
    h && (this.scale = this.graph.currentScale, this.translate = this.graph.currentTranslate);
    g.apply(this, arguments);
    h && (this.scale = n, this.translate = u);
  };
  var d = mxGraph.prototype.updatePageBreaks;
  mxGraph.prototype.updatePageBreaks = function(h, n, u) {
    var m = this.useCssTransforms,
      p = this.view.scale,
      x = this.view.translate;
    m && (this.view.scale = 1, this.view.translate = new mxPoint(0, 0), this.useCssTransforms = !1);
    d.apply(this, arguments);
    m && (this.view.scale = p, this.view.translate = x, this.useCssTransforms = !0);
  };
}());
Graph.prototype.isLightboxView = function() {
  return this.lightbox;
};
Graph.prototype.isViewer = function() {
  return !1;
};
Graph.prototype.labelLinkClicked = function(a, b, f) {
  var e = b.getAttribute('href');
  e != Graph.sanitizeLink(e) && Graph.sanitizeNode(b);
  if (null != e && !this.isCustomLink(e) && (mxEvent.isLeftMouseButton(f) && !mxEvent.isPopupTrigger(f) || mxEvent.isTouchEvent(f))) {
    if (!this.isEnabled() || this.isCellLocked(a.cell))
      a = this.isBlankLink(e) ? this.linkTarget : '_top', this.openLink(this.getAbsoluteUrl(e), a);
    mxEvent.consume(f);
  }
};
Graph.prototype.openLink = function(a, b, f) {
  var e = window;
  try {
    if (a = Graph.sanitizeLink(a), null != a)
      if ('_self' == b && window != window.top)
        window.location.href = a;
      else if (a.substring(0, this.baseUrl.length) == this.baseUrl && '#' == a.charAt(this.baseUrl.length) && '_top' == b && window == window.top) {
      var g = a.split('#')[1];
      window.location.hash == '#' + g && (window.location.hash = '');
      window.location.hash = g;
    } else
      e = window.open(a, null != b ? b : '_blank'), null == e || f || (e.opener = null);
  } catch (d) {}
  return e;
};
Graph.prototype.getLinkTitle = function(a) {
  return a.substring(a.lastIndexOf('/') + 1);
};
Graph.prototype.isCustomLink = function(a) {
  return 'data:' == a.substring(0, 5);
};
Graph.prototype.customLinkClicked = function(a) {
  return !1;
};
Graph.prototype.isExternalProtocol = function(a) {
  return 'mailto:' === a.substring(0, 7);
};
Graph.prototype.isBlankLink = function(a) {
  return !this.isExternalProtocol(a) && ('blank' === this.linkPolicy || 'self' !== this.linkPolicy && !this.isRelativeUrl(a) && a.substring(0, this.domainUrl.length) !== this.domainUrl);
};
Graph.prototype.isRelativeUrl = function(a) {
  return null != a && !this.absoluteUrlPattern.test(a) && 'data:' !== a.substring(0, 5) && !this.isExternalProtocol(a);
};
Graph.prototype.getAbsoluteUrl = function(a) {
  null != a && this.isRelativeUrl(a) && (a = '#' == a.charAt(0) ? this.baseUrl + a : '/' == a.charAt(0) ? this.domainUrl + a : this.domainPathUrl + a);
  return a;
};
Graph.prototype.initLayoutManager = function() {
  this.layoutManager = new mxLayoutManager(this);
  this.layoutManager.hasLayout = function(a) {
    return null != this.graph.getCellStyle(a).childLayout;
  };
  this.layoutManager.getLayout = function(a, b) {
    var f = this.graph.model.getParent(a);
    if (!this.graph.isCellCollapsed(a) && (b != mxEvent.BEGIN_UPDATE || this.hasLayout(f, b))) {
      a = this.graph.getCellStyle(a);
      if ('stackLayout' == a.childLayout)
        return b = new mxStackLayout(this.graph, !0), b.resizeParentMax = '1' == mxUtils.getValue(a, 'resizeParentMax', '1'), b.horizontal = '1' == mxUtils.getValue(a, 'horizontalStack', '1'), b.resizeParent = '1' == mxUtils.getValue(a, 'resizeParent', '1'), b.resizeLast = '1' == mxUtils.getValue(a, 'resizeLast', '0'), b.spacing = a.stackSpacing || b.spacing, b.border = a.stackBorder || b.border, b.marginLeft = a.marginLeft || 0, b.marginRight = a.marginRight || 0, b.marginTop = a.marginTop || 0, b.marginBottom = a.marginBottom || 0, b.allowGaps = a.allowGaps || 0, b.fill = !0, b.allowGaps && (b.gridSize = parseFloat(mxUtils.getValue(a, 'stackUnitSize', 20))), b;
      if ('treeLayout' == a.childLayout)
        return b = new mxCompactTreeLayout(this.graph), b.horizontal = '1' == mxUtils.getValue(a, 'horizontalTree', '1'), b.resizeParent = '1' == mxUtils.getValue(a, 'resizeParent', '1'), b.groupPadding = mxUtils.getValue(a, 'parentPadding', 20), b.levelDistance = mxUtils.getValue(a, 'treeLevelDistance', 30), b.maintainParentLocation = !0, b.edgeRouting = !1, b.resetEdges = !1, b;
      if ('flowLayout' == a.childLayout)
        return b = new mxHierarchicalLayout(this.graph, mxUtils.getValue(a, 'flowOrientation', mxConstants.DIRECTION_EAST)), b.resizeParent = '1' == mxUtils.getValue(a, 'resizeParent', '1'), b.parentBorder = mxUtils.getValue(a, 'parentPadding', 20), b.maintainParentLocation = !0, b.intraCellSpacing = mxUtils.getValue(a, 'intraCellSpacing', mxHierarchicalLayout.prototype.intraCellSpacing), b.interRankCellSpacing = mxUtils.getValue(a, 'interRankCellSpacing', mxHierarchicalLayout.prototype.interRankCellSpacing), b.interHierarchySpacing = mxUtils.getValue(a, 'interHierarchySpacing', mxHierarchicalLayout.prototype.interHierarchySpacing), b.parallelEdgeSpacing = mxUtils.getValue(a, 'parallelEdgeSpacing', mxHierarchicalLayout.prototype.parallelEdgeSpacing), b;
      if ('circleLayout' == a.childLayout)
        return new mxCircleLayout(this.graph);
      if ('organicLayout' == a.childLayout)
        return new mxFastOrganicLayout(this.graph);
      if ('tableLayout' == a.childLayout)
        return new TableLayout(this.graph);
      if (null != a.childLayout && '[' == a.childLayout.charAt(0))
        try {
          return new mxCompositeLayout(this.graph, this.graph.createLayouts(JSON.parse(a.childLayout)));
        } catch (e) {
          null != window.console && console.error(e);
        }
    }
    return null;
  };
};
Graph.prototype.createLayouts = function(a) {
  for (var b = [], f = 0; f < a.length; f++)
    if (0 <= mxUtils.indexOf(Graph.layoutNames, a[f].layout)) {
      var e = new window[a[f].layout](this);
      if (null != a[f].config)
        for (var g in a[f].config)
          e[g] = a[f].config[g];
      b.push(e);
    } else
      throw Error(mxResources.get('invalidCallFnNotFound', [a[f].layout]));
  return b;
};
Graph.prototype.getDataForCells = function(a) {
  for (var b = [], f = 0; f < a.length; f++) {
    var e = null != a[f].value ? a[f].value.attributes : null,
      g = {};
    g.id = a[f].id;
    if (null != e)
      for (var d = 0; d < e.length; d++)
        g[e[d].nodeName] = e[d].nodeValue;
    else
      g.label = this.convertValueToString(a[f]);
    b.push(g);
  }
  return b;
};
Graph.prototype.getNodesForCells = function(a) {
  for (var b = [], f = 0; f < a.length; f++) {
    var e = this.view.getState(a[f]);
    if (null != e) {
      for (var g = this.cellRenderer.getShapesForState(e), d = 0; d < g.length; d++)
        null != g[d] && null != g[d].node && b.push(g[d].node);
      null != e.control && null != e.control.node && b.push(e.control.node);
    }
  }
  return b;
};
Graph.prototype.createWipeAnimations = function(a, b) {
  for (var f = [], e = 0; e < a.length; e++) {
    var g = this.view.getState(a[e]);
    null != g && null != g.shape && (this.model.isEdge(g.cell) && null != g.absolutePoints && 1 < g.absolutePoints.length ? f.push(this.createEdgeWipeAnimation(g, b)) : this.model.isVertex(g.cell) && null != g.shape.bounds && f.push(this.createVertexWipeAnimation(g, b)));
  }
  return f;
};
Graph.prototype.createEdgeWipeAnimation = function(a, b) {
  var f = a.absolutePoints.slice(),
    e = a.segments,
    g = a.length,
    d = f.length;
  return {
    execute: mxUtils.bind(this, function(h, n) {
      if (null != a.shape) {
        var u = [f[0]];
        n = h / n;
        b || (n = 1 - n);
        for (var m = g * n, p = 1; p < d; p++)
          if (m <= e[p - 1]) {
            u.push(new mxPoint(f[p - 1].x + (f[p].x - f[p - 1].x) * m / e[p - 1], f[p - 1].y + (f[p].y - f[p - 1].y) * m / e[p - 1]));
            break;
          } else
            m -= e[p - 1], u.push(f[p]);
        a.shape.points = u;
        a.shape.redraw();
        0 == h && Graph.setOpacityForNodes(this.getNodesForCells([a.cell]), 1);
        null != a.text && null != a.text.node && (a.text.node.style.opacity = n);
      }
    }),
    stop: mxUtils.bind(this, function() {
      null != a.shape && (a.shape.points = f, a.shape.redraw(), null != a.text && null != a.text.node && (a.text.node.style.opacity = ''), Graph.setOpacityForNodes(this.getNodesForCells([a.cell]), b ? 1 : 0));
    })
  };
};
Graph.prototype.createVertexWipeAnimation = function(a, b) {
  var f = new mxRectangle.fromRectangle(a.shape.bounds);
  return {
    execute: mxUtils.bind(this, function(e, g) {
      null != a.shape && (g = e / g, b || (g = 1 - g), a.shape.bounds = new mxRectangle(f.x, f.y, f.width * g, f.height), a.shape.redraw(), 0 == e && Graph.setOpacityForNodes(this.getNodesForCells([a.cell]), 1), null != a.text && null != a.text.node && (a.text.node.style.opacity = g));
    }),
    stop: mxUtils.bind(this, function() {
      null != a.shape && (a.shape.bounds = f, a.shape.redraw(), null != a.text && null != a.text.node && (a.text.node.style.opacity = ''), Graph.setOpacityForNodes(this.getNodesForCells([a.cell]), b ? 1 : 0));
    })
  };
};
Graph.prototype.executeAnimations = function(a, b, f, e) {
  f = null != f ? f : 30;
  e = null != e ? e : 30;
  var g = null,
    d = 0,
    h = mxUtils.bind(this, function() {
      if (d == f || this.stoppingCustomActions) {
        window.clearInterval(g);
        for (var n = 0; n < a.length; n++)
          a[n].stop();
        null != b && b();
      } else
        for (n = 0; n < a.length; n++)
          a[n].execute(d, f);
      d++;
    });
  g = window.setInterval(h, e);
  h();
};
Graph.prototype.getPageSize = function() {
  return this.pageVisible ? new mxRectangle(0, 0, this.pageFormat.width * this.pageScale, this.pageFormat.height * this.pageScale) : this.scrollTileSize;
};
Graph.prototype.getPageLayout = function() {
  var a = this.getPageSize(),
    b = this.getGraphBounds();
  if (0 == b.width || 0 == b.height)
    return new mxRectangle(0, 0, 1, 1);
  var f = Math.floor(Math.ceil(b.x / this.view.scale - this.view.translate.x) / a.width),
    e = Math.floor(Math.ceil(b.y / this.view.scale - this.view.translate.y) / a.height);
  return new mxRectangle(f, e, Math.ceil((Math.floor((b.x + b.width) / this.view.scale) - this.view.translate.x) / a.width) - f, Math.ceil((Math.floor((b.y + b.height) / this.view.scale) - this.view.translate.y) / a.height) - e);
};
Graph.prototype.sanitizeHtml = function(a, b) {
  return Graph.sanitizeHtml(a, b);
};
Graph.prototype.updatePlaceholders = function() {
  var a = !1,
    b;
  for (b in this.model.cells) {
    var f = this.model.cells[b];
    this.isReplacePlaceholders(f) && (this.view.invalidate(f, !1, !1), a = !0);
  }
  a && this.view.validate();
};
Graph.prototype.isReplacePlaceholders = function(a) {
  return null != a.value && 'object' == typeof a.value && '1' == a.value.getAttribute('placeholders');
};
Graph.prototype.isZoomWheelEvent = function(a) {
  return Graph.zoomWheel && !mxEvent.isShiftDown(a) && !mxEvent.isMetaDown(a) && !mxEvent.isAltDown(a) && (!mxEvent.isControlDown(a) || mxClient.IS_MAC) || !Graph.zoomWheel && (mxEvent.isAltDown(a) || mxEvent.isControlDown(a));
};
Graph.prototype.isScrollWheelEvent = function(a) {
  return !this.isZoomWheelEvent(a);
};
Graph.prototype.isTransparentClickEvent = function(a) {
  return mxEvent.isAltDown(a) || mxClient.IS_CHROMEOS && mxEvent.isShiftDown(a);
};
Graph.prototype.isIgnoreTerminalEvent = function(a) {
  return mxEvent.isAltDown(a) && !mxEvent.isShiftDown(a) && !mxEvent.isControlDown(a) && !mxEvent.isMetaDown(a);
};
Graph.prototype.isEdgeIgnored = function(a) {
  var b = !1;
  null != a && (a = this.getCurrentCellStyle(a), b = '1' == mxUtils.getValue(a, 'ignoreEdge', '0'));
  return b;
};
Graph.prototype.isSplitTarget = function(a, b, f) {
  return !this.model.isEdge(b[0]) && !mxEvent.isAltDown(f) && !mxEvent.isShiftDown(f) && mxGraph.prototype.isSplitTarget.apply(this, arguments);
};
Graph.prototype.getLabel = function(a) {
  var b = mxGraph.prototype.getLabel.apply(this, arguments);
  null != b && this.isReplacePlaceholders(a) && null == a.getAttribute('placeholder') && (b = this.replacePlaceholders(a, b));
  return b;
};
Graph.prototype.isLabelMovable = function(a) {
  var b = this.getCurrentCellStyle(a);
  return !this.isCellLocked(a) && (this.model.isEdge(a) && this.edgeLabelsMovable || this.model.isVertex(a) && (this.vertexLabelsMovable || '1' == mxUtils.getValue(b, 'labelMovable', '0')));
};
Graph.prototype.setGridSize = function(a) {
  this.gridSize = a;
  this.fireEvent(new mxEventObject('gridSizeChanged'));
};
Graph.prototype.setDefaultParent = function(a) {
  this.defaultParent = a;
  this.fireEvent(new mxEventObject('defaultParentChanged'));
};
Graph.prototype.getClickableLinkForCell = function(a) {
  do {
    var b = this.getLinkForCell(a);
    if (null != b)
      return b;
    a = this.model.getParent(a);
  } while (null != a);
  return null;
};
Graph.prototype.getGlobalVariable = function(a) {
  var b = null;
  'date' == a ? b = new Date().toLocaleDateString() : 'time' == a ? b = new Date().toLocaleTimeString() : 'timestamp' == a ? b = new Date().toLocaleString() : 'date{' == a.substring(0, 5) && (a = a.substring(5, a.length - 1), b = this.formatDate(new Date(), a));
  return b;
};
Graph.prototype.formatDate = function(a, b, f) {
  null == this.dateFormatCache && (this.dateFormatCache = {
    i18n: {
      dayNames: 'Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
      monthNames: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December'.split(' ')
    },
    masks: {
      'default': 'ddd mmm dd yyyy HH:MM:ss',
      shortDate: 'm/d/yy',
      mediumDate: 'mmm d, yyyy',
      longDate: 'mmmm d, yyyy',
      fullDate: 'dddd, mmmm d, yyyy',
      shortTime: 'h:MM TT',
      mediumTime: 'h:MM:ss TT',
      longTime: 'h:MM:ss TT Z',
      isoDate: 'yyyy-mm-dd',
      isoTime: 'HH:MM:ss',
      isoDateTime: 'yyyy-mm-dd\'T\'HH:MM:ss',
      isoUtcDateTime: 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\''
    }
  });
  var e = this.dateFormatCache,
    g = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    d = /[^-+\dA-Z]/g,
    h = function(K, P) {
      K = String(K);
      for (P = P || 2; K.length < P;)
        K = '0' + K;
      return K;
    };
  1 != arguments.length || '[object String]' != Object.prototype.toString.call(a) || /\d/.test(a) || (b = a, a = void 0);
  a = a ? new Date(a) : new Date();
  if (isNaN(a))
    throw SyntaxError('invalid date');
  b = String(e.masks[b] || b || e.masks['default']);
  'UTC:' == b.slice(0, 4) && (b = b.slice(4), f = !0);
  var n = f ? 'getUTC' : 'get',
    u = a[n + 'Date'](),
    m = a[n + 'Day'](),
    p = a[n + 'Month'](),
    x = a[n + 'FullYear'](),
    A = a[n + 'Hours'](),
    C = a[n + 'Minutes'](),
    D = a[n + 'Seconds']();
  n = a[n + 'Milliseconds']();
  var G = f ? 0 : a.getTimezoneOffset(),
    F = {
      d: u,
      dd: h(u),
      ddd: e.i18n.dayNames[m],
      dddd: e.i18n.dayNames[m + 7],
      m: p + 1,
      mm: h(p + 1),
      mmm: e.i18n.monthNames[p],
      mmmm: e.i18n.monthNames[p + 12],
      yy: String(x).slice(2),
      yyyy: x,
      h: A % 12 || 12,
      hh: h(A % 12 || 12),
      H: A,
      HH: h(A),
      M: C,
      MM: h(C),
      s: D,
      ss: h(D),
      l: h(n, 3),
      L: h(99 < n ? Math.round(n / 10) : n),
      t: 12 > A ? 'a' : 'p',
      tt: 12 > A ? 'am' : 'pm',
      T: 12 > A ? 'A' : 'P',
      TT: 12 > A ? 'AM' : 'PM',
      Z: f ? 'UTC' : (String(a).match(g) || ['']).pop().replace(d, ''),
      o: (0 < G ? '-' : '+') + h(100 * Math.floor(Math.abs(G) / 60) + Math.abs(G) % 60, 4),
      S: [
        'th',
        'st',
        'nd',
        'rd'
      ][3 < u % 10 ? 0 : (10 != u % 100 - u % 10) * u % 10]
    };
  return b.replace(/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, function(K) {
    return K in F ? F[K] : K.slice(1, K.length - 1);
  });
};
Graph.prototype.getLayerForCells = function(a) {
  var b = null;
  if (0 < a.length) {
    for (b = a[0]; !this.model.isLayer(b);)
      b = this.model.getParent(b);
    for (var f = 1; f < a.length; f++)
      if (!this.model.isAncestor(b, a[f])) {
        b = null;
        break;
      }
  }
  return b;
};
Graph.prototype.createLayersDialog = function(a, b) {
  var f = document.createElement('div');
  f.style.position = 'absolute';
  for (var e = this.getModel(), g = e.getChildCount(e.root), d = 0; d < g; d++)
    mxUtils.bind(this, function(h) {
      function n() {
        e.isVisible(h) ? (p.setAttribute('src', Editor.visibleImage), mxUtils.setOpacity(m, 75)) : (p.setAttribute('src', Editor.hiddenImage), mxUtils.setOpacity(m, 25));
      }
      var u = this.convertValueToString(h) || mxResources.get('background') || 'Background',
        m = document.createElement('div');
      m.style.overflow = 'hidden';
      m.style.textOverflow = 'ellipsis';
      m.style.padding = '2px';
      m.style.whiteSpace = 'nowrap';
      m.style.cursor = 'pointer';
      m.setAttribute('title', mxResources.get(e.isVisible(h) ? 'hideIt' : 'show', [u]));
      var p = document.createElement('img');
      p.setAttribute('draggable', 'false');
      p.setAttribute('align', 'absmiddle');
      p.setAttribute('border', '0');
      p.style.position = 'relative';
      p.style.width = '16px';
      p.style.padding = '0px 6px 0 4px';
      b && (p.style.filter = 'invert(100%)', p.style.top = '-2px');
      m.appendChild(p);
      mxUtils.write(m, u);
      f.appendChild(m);
      mxEvent.addListener(m, 'click', function() {
        e.setVisible(h, !e.isVisible(h));
        n();
        null != a && a(h);
      });
      n();
    })(e.getChildAt(e.root, d));
  return f;
};
Graph.prototype.replacePlaceholders = function(a, b, f, e) {
  e = [];
  if (null != b) {
    for (var g = 0; match = this.placeholderPattern.exec(b);) {
      var d = match[0];
      if (2 < d.length && '%label%' != d && '%tooltip%' != d) {
        var h = null;
        if (match.index > g && '%' == b.charAt(match.index - 1))
          h = d.substring(1);
        else {
          var n = d.substring(1, d.length - 1);
          if ('id' == n)
            h = a.id;
          else if (0 > n.indexOf('{'))
            for (var u = a; null == h && null != u;)
              null != u.value && 'object' == typeof u.value && (Graph.translateDiagram && null != Graph.diagramLanguage && (h = u.getAttribute(n + '_' + Graph.diagramLanguage)), null == h && (h = u.hasAttribute(n) ? null != u.getAttribute(n) ? u.getAttribute(n) : '' : null)), u = this.model.getParent(u);
          null == h && (h = this.getGlobalVariable(n));
          null == h && null != f && (h = f[n]);
        }
        e.push(b.substring(g, match.index) + (null != h ? h : d));
        g = match.index + d.length;
      }
    }
    e.push(b.substring(g));
  }
  return e.join('');
};
Graph.prototype.restoreSelection = function(a) {
  if (null != a && 0 < a.length) {
    for (var b = [], f = 0; f < a.length; f++) {
      var e = this.model.getCell(a[f].id);
      null != e && b.push(e);
    }
    this.setSelectionCells(b);
  } else
    this.clearSelection();
};
Graph.prototype.selectCellForEvent = function(a, b) {
  mxEvent.isShiftDown(b) && !this.isSelectionEmpty() && this.selectTableRange(this.getSelectionCell(), a) || mxGraph.prototype.selectCellForEvent.apply(this, arguments);
};
Graph.prototype.selectTableRange = function(a, b) {
  var f = !1;
  if (this.isTableCell(a) && this.isTableCell(b)) {
    var e = this.model.getParent(a),
      g = this.model.getParent(e),
      d = this.model.getParent(b);
    if (g == this.model.getParent(d)) {
      a = e.getIndex(a);
      e = g.getIndex(e);
      var h = d.getIndex(b),
        n = g.getIndex(d);
      d = Math.max(e, n);
      b = Math.min(a, h);
      a = Math.max(a, h);
      h = [];
      for (e = Math.min(e, n); e <= d; e++) {
        n = this.model.getChildAt(g, e);
        for (var u = b; u <= a; u++)
          h.push(this.model.getChildAt(n, u));
      }
      0 < h.length && (1 < h.length || 1 < this.getSelectionCount() || !this.isCellSelected(h[0])) && (this.setSelectionCells(h), f = !0);
    }
  }
  return f;
};
Graph.prototype.snapCellsToGrid = function(a, b) {
  this.getModel().beginUpdate();
  try {
    for (var f = 0; f < a.length; f++) {
      var e = a[f],
        g = this.getCellGeometry(e);
      if (null != g) {
        g = g.clone();
        if (this.getModel().isVertex(e))
          g.x = Math.round(g.x / b) * b, g.y = Math.round(g.y / b) * b, g.width = Math.round(g.width / b) * b, g.height = Math.round(g.height / b) * b;
        else if (this.getModel().isEdge(e) && null != g.points)
          for (var d = 0; d < g.points.length; d++)
            g.points[d].x = Math.round(g.points[d].x / b) * b, g.points[d].y = Math.round(g.points[d].y / b) * b;
        this.getModel().setGeometry(e, g);
      }
    }
  } finally {
    this.getModel().endUpdate();
  }
};
Graph.prototype.selectCellsForConnectVertex = function(a, b, f) {
  2 == a.length && this.model.isVertex(a[1]) ? (this.setSelectionCell(a[1]), this.scrollCellToVisible(a[1]), null != f && (mxEvent.isTouchEvent(b) ? f.update(f.getState(this.view.getState(a[1]))) : f.reset())) : this.setSelectionCells(a);
};
Graph.prototype.isCloneConnectSource = function(a) {
  var b = null;
  null != this.layoutManager && (b = this.layoutManager.getLayout(this.model.getParent(a)));
  return this.isTableRow(a) || this.isTableCell(a) || null != b && b.constructor == mxStackLayout;
};
Graph.prototype.connectVertex = function(a, b, f, e, g, d, h, n) {
  d = d ? d : !1;
  if (a.geometry.relative && this.model.isEdge(a.parent))
    return [];
  for (; a.geometry.relative && this.model.isVertex(a.parent);)
    a = a.parent;
  var u = this.isCloneConnectSource(a),
    m = u ? a : this.getCompositeParent(a),
    p = a.geometry.relative && null != a.parent.geometry ? new mxPoint(a.parent.geometry.width * a.geometry.x, a.parent.geometry.height * a.geometry.y) : new mxPoint(m.geometry.x, m.geometry.y);
  b == mxConstants.DIRECTION_NORTH ? (p.x += m.geometry.width / 2, p.y -= f) : b == mxConstants.DIRECTION_SOUTH ? (p.x += m.geometry.width / 2, p.y += m.geometry.height + f) : (p.x = b == mxConstants.DIRECTION_WEST ? p.x - f : p.x + (m.geometry.width + f), p.y += m.geometry.height / 2);
  var x = this.view.getState(this.model.getParent(a));
  f = this.view.scale;
  var A = this.view.translate;
  m = A.x * f;
  A = A.y * f;
  null != x && this.model.isVertex(x.cell) && (m = x.x, A = x.y);
  this.model.isVertex(a.parent) && a.geometry.relative && (p.x += a.parent.geometry.x, p.y += a.parent.geometry.y);
  d = d ? null : new mxRectangle(m + p.x * f, A + p.y * f).grow(40 * f);
  d = null != d ? this.getCells(0, 0, 0, 0, null, null, d, null, !0) : null;
  x = this.view.getState(a);
  var C = null,
    D = null;
  if (null != d) {
    d = d.reverse();
    for (var G = 0; G < d.length; G++)
      if (!this.isCellLocked(d[G]) && !this.model.isEdge(d[G]) && d[G] != a)
        if (!this.model.isAncestor(a, d[G]) && this.isContainer(d[G]) && (null == C || d[G] == this.model.getParent(a)))
          C = d[G];
        else if (null == D && this.isCellConnectable(d[G]) && !this.model.isAncestor(d[G], a) && !this.isSwimlane(d[G])) {
      var F = this.view.getState(d[G]);
      null == x || null == F || mxUtils.intersects(x, F) || (D = d[G]);
    }
  }
  var K = !mxEvent.isShiftDown(e) || mxEvent.isControlDown(e) || g;
  K && ('1' != urlParams.sketch || g) && (b == mxConstants.DIRECTION_NORTH ? p.y -= a.geometry.height / 2 : b == mxConstants.DIRECTION_SOUTH ? p.y += a.geometry.height / 2 : p.x = b == mxConstants.DIRECTION_WEST ? p.x - a.geometry.width / 2 : p.x + a.geometry.width / 2);
  var P = [],
    R = D;
  D = C;
  g = mxUtils.bind(this, function(Q) {
    if (null == h || null != Q || null == D && u) {
      this.model.beginUpdate();
      try {
        if (null == R && K) {
          var ba = this.getAbsoluteParent(null != Q ? Q : a);
          ba = u ? a : this.getCompositeParent(ba);
          R = null != Q ? Q : this.duplicateCells([ba], !1)[0];
          null != Q && this.addCells([R], this.model.getParent(a), null, null, null, !0);
          var V = this.getCellGeometry(R);
          null != V && (null != Q && '1' == urlParams.sketch && (b == mxConstants.DIRECTION_NORTH ? p.y -= V.height / 2 : b == mxConstants.DIRECTION_SOUTH ? p.y += V.height / 2 : p.x = b == mxConstants.DIRECTION_WEST ? p.x - V.width / 2 : p.x + V.width / 2), V.x = p.x - V.width / 2, V.y = p.y - V.height / 2);
          null != C ? (this.addCells([R], C, null, null, null, !0), D = null) : K && !u && this.addCells([R], this.getDefaultParent(), null, null, null, !0);
        }
        var T = mxEvent.isControlDown(e) && mxEvent.isShiftDown(e) && K || null == D && u ? null : this.insertEdge(this.model.getParent(a), null, '', a, R, this.createCurrentEdgeStyle());
        if (null != T && this.connectionHandler.insertBeforeSource) {
          var Z = null;
          for (Q = a; null != Q.parent && null != Q.geometry && Q.geometry.relative && Q.parent != T.parent;)
            Q = this.model.getParent(Q);
          null != Q && null != Q.parent && Q.parent == T.parent && (Z = Q.parent.getIndex(Q), this.model.add(Q.parent, T, Z));
        }
        null == D && null != R && null != a.parent && u && b == mxConstants.DIRECTION_WEST && (Z = a.parent.getIndex(a), this.model.add(a.parent, R, Z));
        null != T && (P.push(T), this.applyNewEdgeStyle(a, [T], b));
        null == D && null != R && P.push(R);
        null == R && null != T && T.geometry.setTerminalPoint(p, !1);
        null != T && this.fireEvent(new mxEventObject('cellsInserted', 'cells', [T]));
      } finally {
        this.model.endUpdate();
      }
    }
    if (null != n)
      n(P);
    else
      return P;
  });
  if (null == h || null != R || !K || null == D && u)
    return g(R);
  h(m + p.x * f, A + p.y * f, g);
};
Graph.prototype.getIndexableText = function(a) {
  a = null != a ? a : this.model.getDescendants(this.model.root);
  for (var b = document.createElement('div'), f = [], e, g = 0; g < a.length; g++)
    if (e = a[g], this.model.isVertex(e) || this.model.isEdge(e))
      this.isHtmlLabel(e) ? (b.innerHTML = Graph.sanitizeHtml(this.getLabel(e)), e = mxUtils.extractTextWithWhitespace([b])) : e = this.getLabel(e), e = mxUtils.trim(e.replace(/[\x00-\x1F\x7F-\x9F]|\s+/g, ' ')), 0 < e.length && f.push(e);
  return f.join(' ');
};
Graph.prototype.convertValueToString = function(a) {
  var b = this.model.getValue(a);
  if (null != b && 'object' == typeof b) {
    var f = null;
    if (this.isReplacePlaceholders(a) && null != a.getAttribute('placeholder')) {
      b = a.getAttribute('placeholder');
      for (var e = a; null == f && null != e;)
        null != e.value && 'object' == typeof e.value && (f = e.hasAttribute(b) ? null != e.getAttribute(b) ? e.getAttribute(b) : '' : null), e = this.model.getParent(e);
    } else
      f = null, Graph.translateDiagram && null != Graph.diagramLanguage && (f = b.getAttribute('label_' + Graph.diagramLanguage)), null == f && (f = b.getAttribute('label') || '');
    return f || '';
  }
  return mxGraph.prototype.convertValueToString.apply(this, arguments);
};
Graph.prototype.getLinksForState = function(a) {
  return null != a && null != a.text && null != a.text.node ? a.text.node.getElementsByTagName('a') : null;
};
Graph.prototype.getLinkForCell = function(a) {
  return null != a.value && 'object' == typeof a.value ? (a = a.value.getAttribute('link'), null != a && 'javascript:' === a.toLowerCase().substring(0, 11) && (a = a.substring(11)), a) : null;
};
Graph.prototype.getLinkTargetForCell = function(a) {
  return null != a.value && 'object' == typeof a.value ? a.value.getAttribute('linkTarget') : null;
};
Graph.prototype.postProcessCellStyle = function(a, b) {
  return this.updateHorizontalStyle(a, this.replaceDefaultColors(a, mxGraph.prototype.postProcessCellStyle.apply(this, arguments)));
};
Graph.prototype.updateHorizontalStyle = function(a, b) {
  if (null != a && null != b && null != this.layoutManager) {
    var f = this.model.getParent(a);
    this.model.isVertex(f) && this.isCellCollapsed(a) && (a = this.layoutManager.getLayout(f), null != a && a.constructor == mxStackLayout && (b[mxConstants.STYLE_HORIZONTAL] = !a.horizontal));
  }
  return b;
};
Graph.prototype.replaceDefaultColors = function(a, b) {
  if (null != b) {
    a = mxUtils.hex2rgb(this.shapeBackgroundColor);
    var f = mxUtils.hex2rgb(this.shapeForegroundColor);
    this.replaceDefaultColor(b, mxConstants.STYLE_FONTCOLOR, f, a);
    this.replaceDefaultColor(b, mxConstants.STYLE_FILLCOLOR, a, f);
    this.replaceDefaultColor(b, mxConstants.STYLE_GRADIENTCOLOR, f, a);
    this.replaceDefaultColor(b, mxConstants.STYLE_STROKECOLOR, f, a);
    this.replaceDefaultColor(b, mxConstants.STYLE_IMAGE_BORDER, f, a);
    this.replaceDefaultColor(b, mxConstants.STYLE_IMAGE_BACKGROUND, a, f);
    this.replaceDefaultColor(b, mxConstants.STYLE_LABEL_BORDERCOLOR, f, a);
    this.replaceDefaultColor(b, mxConstants.STYLE_SWIMLANE_FILLCOLOR, a, f);
    this.replaceDefaultColor(b, mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, a, f);
  }
  return b;
};
Graph.prototype.replaceDefaultColor = function(a, b, f, e) {
  null != a && 'default' == a[b] && null != f && (a[b] = this.getDefaultColor(a, b, f, e));
};
Graph.prototype.getDefaultColor = function(a, b, f, e) {
  b = 'default' + b.charAt(0).toUpperCase() + b.substring(1);
  'invert' == a[b] && (f = e);
  return f;
};
Graph.prototype.updateAlternateBounds = function(a, b, f) {
  if (null != a && null != b && null != this.layoutManager && null != b.alternateBounds) {
    var e = this.layoutManager.getLayout(this.model.getParent(a));
    null != e && e.constructor == mxStackLayout && (e.horizontal ? b.alternateBounds.height = 0 : b.alternateBounds.width = 0);
  }
  mxGraph.prototype.updateAlternateBounds.apply(this, arguments);
};
Graph.prototype.isMoveCellsEvent = function(a, b) {
  return mxEvent.isShiftDown(a) || '1' == mxUtils.getValue(b.style, 'moveCells', '0');
};
Graph.prototype.foldCells = function(a, b, f, e, g) {
  b = null != b ? b : !1;
  null == f && (f = this.getFoldableCells(this.getSelectionCells(), a));
  if (null != f) {
    this.model.beginUpdate();
    try {
      if (mxGraph.prototype.foldCells.apply(this, arguments), null != this.layoutManager)
        for (var d = 0; d < f.length; d++) {
          var h = this.view.getState(f[d]),
            n = this.getCellGeometry(f[d]);
          if (null != h && null != n) {
            var u = Math.round(n.width - h.width / this.view.scale),
              m = Math.round(n.height - h.height / this.view.scale);
            if (0 != m || 0 != u) {
              var p = this.model.getParent(f[d]),
                x = this.layoutManager.getLayout(p);
              null == x ? null != g && this.isMoveCellsEvent(g, h) && this.moveSiblings(h, p, u, m) : null != g && mxEvent.isAltDown(g) || x.constructor != mxStackLayout || x.resizeLast || this.resizeParentStacks(p, x, u, m);
            }
          }
        }
    } finally {
      this.model.endUpdate();
    }
    this.isEnabled() && this.setSelectionCells(f);
  }
};
Graph.prototype.moveSiblings = function(a, b, f, e) {
  this.model.beginUpdate();
  try {
    var g = this.getCellsBeyond(a.x, a.y, b, !0, !0);
    for (b = 0; b < g.length; b++)
      if (g[b] != a.cell) {
        var d = this.view.getState(g[b]),
          h = this.getCellGeometry(g[b]);
        null != d && null != h && (h = h.clone(), h.translate(Math.round(f * Math.max(0, Math.min(1, (d.x - a.x) / a.width))), Math.round(e * Math.max(0, Math.min(1, (d.y - a.y) / a.height)))), this.model.setGeometry(g[b], h));
      }
  } finally {
    this.model.endUpdate();
  }
};
Graph.prototype.resizeParentStacks = function(a, b, f, e) {
  if (null != this.layoutManager && null != b && b.constructor == mxStackLayout && !b.resizeLast) {
    this.model.beginUpdate();
    try {
      for (var g = b.horizontal; null != a && null != b && b.constructor == mxStackLayout && b.horizontal == g && !b.resizeLast;) {
        var d = this.getCellGeometry(a),
          h = this.view.getState(a);
        null != h && null != d && (d = d.clone(), b.horizontal ? d.width += f + Math.min(0, h.width / this.view.scale - d.width) : d.height += e + Math.min(0, h.height / this.view.scale - d.height), this.model.setGeometry(a, d));
        a = this.model.getParent(a);
        b = this.layoutManager.getLayout(a);
      }
    } finally {
      this.model.endUpdate();
    }
  }
};
Graph.prototype.isContainer = function(a) {
  var b = this.getCurrentCellStyle(a);
  return this.isSwimlane(a) ? '0' != b.container : '1' == b.container;
};
Graph.prototype.isCellConnectable = function(a) {
  var b = this.getCurrentCellStyle(a);
  return null != b.connectable ? '0' != b.connectable : mxGraph.prototype.isCellConnectable.apply(this, arguments);
};
Graph.prototype.isLabelMovable = function(a) {
  var b = this.getCurrentCellStyle(a);
  return null != b.movableLabel ? '0' != b.movableLabel : mxGraph.prototype.isLabelMovable.apply(this, arguments);
};
Graph.prototype.selectAll = function(a) {
  a = a || this.getDefaultParent();
  this.isCellLocked(a) || mxGraph.prototype.selectAll.apply(this, arguments);
};
Graph.prototype.selectCells = function(a, b, f) {
  f = f || this.getDefaultParent();
  this.isCellLocked(f) || mxGraph.prototype.selectCells.apply(this, arguments);
};
Graph.prototype.getSwimlaneAt = function(a, b, f) {
  var e = mxGraph.prototype.getSwimlaneAt.apply(this, arguments);
  this.isCellLocked(e) && (e = null);
  return e;
};
Graph.prototype.isCellFoldable = function(a) {
  var b = this.getCurrentCellStyle(a);
  return this.foldingEnabled && '0' != mxUtils.getValue(b, mxConstants.STYLE_RESIZABLE, '1') && ('1' == b.treeFolding || !this.isCellLocked(a) && (this.isContainer(a) && '0' != b.collapsible || !this.isContainer(a) && '1' == b.collapsible));
};
Graph.prototype.reset = function() {
  this.isEditing() && this.stopEditing(!0);
  this.escape();
  this.isSelectionEmpty() || this.clearSelection();
};
Graph.prototype.zoom = function(a, b) {
  a = Math.max(0.01, Math.min(this.view.scale * a, 160)) / this.view.scale;
  mxGraph.prototype.zoom.apply(this, arguments);
};
Graph.prototype.zoomIn = function() {
  0.15 > this.view.scale ? this.zoom((this.view.scale + 0.01) / this.view.scale) : this.zoom(Math.round(this.view.scale * this.zoomFactor * 20) / 20 / this.view.scale);
};
Graph.prototype.zoomOut = function() {
  0.15 >= this.view.scale ? this.zoom((this.view.scale - 0.01) / this.view.scale) : this.zoom(Math.round(1 / this.zoomFactor * this.view.scale * 20) / 20 / this.view.scale);
};
Graph.prototype.fitWindow = function(a, b) {
  b = null != b ? b : 10;
  var f = this.container.clientWidth - b,
    e = this.container.clientHeight - b,
    g = Math.floor(20 * Math.min(f / a.width, e / a.height)) / 20;
  this.zoomTo(g);
  if (mxUtils.hasScrollbars(this.container)) {
    var d = this.view.translate;
    this.container.scrollTop = (a.y + d.y) * g - Math.max((e - a.height * g) / 2 + b / 2, 0);
    this.container.scrollLeft = (a.x + d.x) * g - Math.max((f - a.width * g) / 2 + b / 2, 0);
  }
};
Graph.prototype.getTooltipForCell = function(a) {
  var b = '';
  if (mxUtils.isNode(a.value)) {
    var f = null;
    Graph.translateDiagram && null != Graph.diagramLanguage && (f = a.value.getAttribute('tooltip_' + Graph.diagramLanguage));
    null == f && (f = a.value.getAttribute('tooltip'));
    if (null != f)
      null != f && this.isReplacePlaceholders(a) && (f = this.replacePlaceholders(a, f)), b = Graph.sanitizeHtml(f);
    else {
      f = this.builtInProperties;
      a = a.value.attributes;
      var e = [];
      this.isEnabled() && (f.push('linkTarget'), f.push('link'));
      for (var g = 0; g < a.length; g++)
        (Graph.translateDiagram && 'label' == a[g].nodeName || 0 > mxUtils.indexOf(f, a[g].nodeName)) && 0 < a[g].nodeValue.length && e.push({
          name: a[g].nodeName,
          value: a[g].nodeValue
        });
      e.sort(function(d, h) {
        return d.name < h.name ? -1 : d.name > h.name ? 1 : 0;
      });
      for (g = 0; g < e.length; g++)
        'link' == e[g].name && this.isCustomLink(e[g].value) || (b += ('link' != e[g].name ? '<b>' + mxUtils.htmlEntities(e[g].name) + ':</b> ' : '') + mxUtils.htmlEntities(e[g].value) + '\n');
      0 < b.length && (b = b.substring(0, b.length - 1), mxClient.IS_SVG && (b = '<div style="max-width:360px;text-overflow:ellipsis;overflow:hidden;">' + b + '</div>'));
    }
  }
  return b;
};
Graph.prototype.getFlowAnimationStyle = function() {
  var a = document.getElementsByTagName('head')[0];
  if (null != a && null == this.flowAnimationStyle) {
    this.flowAnimationStyle = document.createElement('style');
    this.flowAnimationStyle.setAttribute('id', 'geEditorFlowAnimation-' + Editor.guid());
    this.flowAnimationStyle.type = 'text/css';
    var b = this.flowAnimationStyle.getAttribute('id');
    this.flowAnimationStyle.innerHTML = this.getFlowAnimationStyleCss(b);
    a.appendChild(this.flowAnimationStyle);
  }
  return this.flowAnimationStyle;
};
Graph.prototype.getFlowAnimationStyleCss = function(a) {
  return '.' + a + ' {\nanimation: ' + a + ' 0.5s linear;\nanimation-iteration-count: infinite;\n}\n@keyframes ' + a + ' {\nto {\nstroke-dashoffset: ' + -16 * this.view.scale + ';\n}\n}';
};
Graph.prototype.stringToBytes = function(a) {
  return Graph.stringToBytes(a);
};
Graph.prototype.bytesToString = function(a) {
  return Graph.bytesToString(a);
};
Graph.prototype.compressNode = function(a) {
  return Graph.compressNode(a);
};
Graph.prototype.compress = function(a, b) {
  return Graph.compress(a, b);
};
Graph.prototype.decompress = function(a, b) {
  return Graph.decompress(a, b);
};
Graph.prototype.zapGremlins = function(a) {
  return Graph.zapGremlins(a);
};