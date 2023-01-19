EditorUi = function(a, b, f) {
  mxEventSource.call(this);
  this.destroyFunctions = [];
  this.editor = a || new Editor();
  this.container = b || document.body;
  var e = this.editor.graph;
  e.lightbox = f;
  var g = e.getGraphBounds;
  e.getGraphBounds = function() {
    var L = g.apply(this, arguments),
      S = this.backgroundImage;
    if (null != S && null != S.width && null != S.height) {
      var I = this.view.translate,
        Y = this.view.scale;
      L = mxRectangle.fromRectangle(L);
      L.add(new mxRectangle((I.x + S.x) * Y, (I.y + S.y) * Y, S.width * Y, S.height * Y));
    }
    return L;
  };
  e.useCssTransforms && (this.lazyZoomDelay = 0);
  mxClient.IS_SVG ? mxPopupMenu.prototype.submenuImage = 'data:image/gif;base64,R0lGODlhCQAJAIAAAP///zMzMyH5BAEAAAAALAAAAAAJAAkAAAIPhI8WebHsHopSOVgb26AAADs=' : new Image().src = mxPopupMenu.prototype.submenuImage;
  mxClient.IS_SVG || null == mxConnectionHandler.prototype.connectImage || (new Image().src = mxConnectionHandler.prototype.connectImage.src);
  this.selectionStateListener = mxUtils.bind(this, function(L, S) {
    this.clearSelectionState();
  });
  e.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionStateListener);
  e.getModel().addListener(mxEvent.CHANGE, this.selectionStateListener);
  e.addListener(mxEvent.EDITING_STARTED, this.selectionStateListener);
  e.addListener(mxEvent.EDITING_STOPPED, this.selectionStateListener);
  e.getView().addListener('unitChanged', this.selectionStateListener);
  this.editor.chromeless && !this.editor.editable && (this.footerHeight = 0, e.isEnabled = function() {
    return !1;
  }, e.panningHandler.isForcePanningEvent = function(L) {
    return !mxEvent.isPopupTrigger(L.getEvent());
  });
  this.actions = new Actions(this);
  this.menus = this.createMenus();
  if (!e.standalone) {
    var d = 'rounded shadow glass dashed dashPattern labelBackgroundColor labelBorderColor comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification sketchStyle pointerEvents strokeColor strokeWidth'.split(' '),
      h = 'shape edgeStyle curved rounded elbow jumpStyle jumpSize comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification sketchStyle'.split(' '),
      n = 'curved sourcePerimeterSpacing targetPerimeterSpacing startArrow startFill startSize endArrow endFill endSize'.split(' '),
      u = !1,
      m = !1;
    this.setDefaultStyle = function(L) {
      try {
        e.getModel().isEdge(L) ? m = !1 : u = !1;
        var S = e.getCellStyle(L, !1),
          I = [],
          Y = [],
          ia;
        for (ia in S)
          I.push(S[ia]), Y.push(ia);
        e.getModel().isEdge(L) ? e.currentEdgeStyle = {} : e.currentVertexStyle = {};
        this.fireEvent(new mxEventObject('styleChanged', 'keys', Y, 'values', I, 'cells', [L]));
        e.getModel().isEdge(L) ? m = !0 : u = !0;
      } catch (ka) {
        this.handleError(ka);
      }
    };
    this.clearDefaultStyle = function() {
      e.currentEdgeStyle = mxUtils.clone(e.defaultEdgeStyle);
      e.currentVertexStyle = mxUtils.clone(e.defaultVertexStyle);
      u = m = !1;
      this.fireEvent(new mxEventObject('styleChanged', 'keys', [], 'values', [], 'cells', []));
    };
    var p = [
      'fontFamily',
      'fontSource',
      'fontSize',
      'fontColor'
    ];
    for (b = 0; b < p.length; b++)
      0 > mxUtils.indexOf(d, p[b]) && d.push(p[b]);
    var x = 'edgeStyle startArrow startFill startSize endArrow endFill endSize'.split(' '),
      A = [
        [
          'startArrow',
          'startFill',
          'endArrow',
          'endFill'
        ],
        [
          'startSize',
          'endSize'
        ],
        [
          'sourcePerimeterSpacing',
          'targetPerimeterSpacing'
        ],
        [
          'fillColor',
          'gradientColor',
          'gradientDirection'
        ],
        ['opacity'],
        ['html']
      ];
    for (b = 0; b < A.length; b++)
      for (f = 0; f < A[b].length; f++)
        d.push(A[b][f]);
    for (b = 0; b < h.length; b++)
      0 > mxUtils.indexOf(d, h[b]) && d.push(h[b]);
    var C = function(L, S, I, Y, ia, ka, U) {
      Y = null != Y ? Y : e.currentVertexStyle;
      ia = null != ia ? ia : e.currentEdgeStyle;
      ka = null != ka ? ka : !0;
      I = null != I ? I : e.getModel();
      if (U) {
        U = [];
        for (var ca = 0; ca < L.length; ca++)
          U = U.concat(I.getDescendants(L[ca]));
        L = U;
      }
      I.beginUpdate();
      try {
        for (ca = 0; ca < L.length; ca++) {
          var ra = L[ca];
          if (S)
            var ua = [
              'fontSize',
              'fontFamily',
              'fontColor'
            ];
          else {
            var Ga = I.getStyle(ra),
              Ia = null != Ga ? Ga.split(';') : [];
            ua = d.slice();
            for (var wa = 0; wa < Ia.length; wa++) {
              var Ca = Ia[wa],
                ta = Ca.indexOf('=');
              if (0 <= ta) {
                var Ha = Ca.substring(0, ta),
                  Va = mxUtils.indexOf(ua, Ha);
                0 <= Va && ua.splice(Va, 1);
                for (U = 0; U < A.length; U++) {
                  var fb = A[U];
                  if (0 <= mxUtils.indexOf(fb, Ha))
                    for (var Ua = 0; Ua < fb.length; Ua++) {
                      var bb = mxUtils.indexOf(ua, fb[Ua]);
                      0 <= bb && ua.splice(bb, 1);
                    }
                }
              }
            }
          }
          var $a = I.isEdge(ra);
          U = $a ? ia : Y;
          var Wa = I.getStyle(ra);
          for (wa = 0; wa < ua.length; wa++) {
            Ha = ua[wa];
            var ab = U[Ha];
            null != ab && 'edgeStyle' != Ha && ('shape' != Ha || $a) && (!$a || ka || 0 > mxUtils.indexOf(n, Ha)) && (Wa = mxUtils.setStyle(Wa, Ha, ab));
          }
          Editor.simpleLabels && (Wa = mxUtils.setStyle(mxUtils.setStyle(Wa, 'html', null), 'whiteSpace', null));
          I.setStyle(ra, Wa);
        }
      } finally {
        I.endUpdate();
      }
      return L;
    };
    e.addListener('cellsInserted', function(L, S) {
      C(S.getProperty('cells'), null, null, null, null, !0, !0);
    });
    e.addListener('textInserted', function(L, S) {
      C(S.getProperty('cells'), !0);
    });
    this.insertHandler = C;
    this.createDivs();
    this.createUi();
    this.refresh();
    var D = mxUtils.bind(this, function(L) {
      null == L && (L = window.event);
      return e.isEditing() || null != L && this.isSelectionAllowed(L);
    });
    this.container == document.body && (this.menubarContainer.onselectstart = D, this.menubarContainer.onmousedown = D, this.toolbarContainer.onselectstart = D, this.toolbarContainer.onmousedown = D, this.diagramContainer.onselectstart = D, this.diagramContainer.onmousedown = D, this.sidebarContainer.onselectstart = D, this.sidebarContainer.onmousedown = D, this.formatContainer.onselectstart = D, this.formatContainer.onmousedown = D, this.footerContainer.onselectstart = D, this.footerContainer.onmousedown = D, null != this.tabContainer && (this.tabContainer.onselectstart = D), mxClient.IS_IOS && (b = function() {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var L = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [
          parseInt(L[1], 10),
          parseInt(L[2], 10),
          parseInt(L[3] || 0, 10)
        ];
      }
    }(), null != b && 16 <= b[0] && (mxUtils.setPrefixedStyle(this.menubarContainer.style, 'userSelect', 'none'), mxUtils.setPrefixedStyle(this.diagramContainer.style, 'userSelect', 'none'), mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'userSelect', 'none'), mxUtils.setPrefixedStyle(this.formatContainer.style, 'userSelect', 'none'), mxUtils.setPrefixedStyle(this.footerContainer.style, 'userSelect', 'none'), null != this.tabContainer && mxUtils.setPrefixedStyle(this.tabContainer.style, 'userSelect', 'none'))));
    !this.editor.chromeless || this.editor.editable ? (b = function(L) {
      if (null != L) {
        var S = mxEvent.getSource(L);
        if ('A' == S.nodeName)
          for (; null != S;) {
            if ('geHint' == S.className)
              return !0;
            S = S.parentNode;
          }
      }
      return D(L);
    }, mxClient.IS_IE && ('undefined' === typeof document.documentMode || 9 > document.documentMode) ? mxEvent.addListener(this.diagramContainer, 'contextmenu', b) : this.diagramContainer.oncontextmenu = b) : e.panningHandler.usePopupTrigger = !1;
    e.init(this.diagramContainer);
    mxClient.IS_SVG && null != e.view.getDrawPane() && (b = e.view.getDrawPane().ownerSVGElement, null != b && (b.style.position = 'absolute'));
    this.hoverIcons = this.createHoverIcons();
    if (null != e.graphHandler) {
      var G = e.graphHandler.start;
      e.graphHandler.start = function() {
        null != ja.hoverIcons && ja.hoverIcons.reset();
        G.apply(this, arguments);
      };
    }
    mxEvent.addListener(this.diagramContainer, 'mousemove', mxUtils.bind(this, function(L) {
      var S = mxUtils.getOffset(this.diagramContainer);
      0 < mxEvent.getClientX(L) - S.x - this.diagramContainer.clientWidth || 0 < mxEvent.getClientY(L) - S.y - this.diagramContainer.clientHeight ? this.diagramContainer.setAttribute('title', mxResources.get('panTooltip')) : this.diagramContainer.removeAttribute('title');
    }));
    var F = !1,
      K = this.hoverIcons.isResetEvent;
    this.hoverIcons.isResetEvent = function(L, S) {
      return F || K.apply(this, arguments);
    };
    this.keydownHandler = mxUtils.bind(this, function(L) {
      32 != L.which || e.isEditing() ? mxEvent.isConsumed(L) || 27 != L.keyCode || this.hideDialog(null, !0) : (F = !0, this.hoverIcons.reset(), e.container.style.cursor = 'move', e.isEditing() || mxEvent.getSource(L) != e.container || mxEvent.consume(L));
    });
    mxEvent.addListener(document, 'keydown', this.keydownHandler);
    this.keyupHandler = mxUtils.bind(this, function(L) {
      e.container.style.cursor = '';
      F = !1;
    });
    mxEvent.addListener(document, 'keyup', this.keyupHandler);
    var P = e.panningHandler.isForcePanningEvent;
    e.panningHandler.isForcePanningEvent = function(L) {
      return P.apply(this, arguments) || F || mxEvent.isMouseEvent(L.getEvent()) && (this.usePopupTrigger || !mxEvent.isPopupTrigger(L.getEvent())) && (!mxEvent.isControlDown(L.getEvent()) && mxEvent.isRightMouseButton(L.getEvent()) || mxEvent.isMiddleMouseButton(L.getEvent()));
    };
    var R = e.cellEditor.isStopEditingEvent;
    e.cellEditor.isStopEditingEvent = function(L) {
      return R.apply(this, arguments) || 13 == L.keyCode && (!mxClient.IS_SF && mxEvent.isControlDown(L) || mxClient.IS_MAC && mxEvent.isMetaDown(L) || mxClient.IS_SF && mxEvent.isShiftDown(L));
    };
    var Q = e.isZoomWheelEvent;
    e.isZoomWheelEvent = function() {
      return F || Q.apply(this, arguments);
    };
    var ba = !1,
      V = null,
      T = null,
      Z = null,
      ma = mxUtils.bind(this, function() {
        if (null != this.toolbar && ba != e.cellEditor.isContentEditing()) {
          for (var L = this.toolbar.container.firstChild, S = []; null != L;) {
            var I = L.nextSibling;
            0 > mxUtils.indexOf(this.toolbar.staticElements, L) && (L.parentNode.removeChild(L), S.push(L));
            L = I;
          }
          L = this.toolbar.fontMenu;
          I = this.toolbar.sizeMenu;
          if (null == Z)
            this.toolbar.createTextToolbar();
          else {
            for (var Y = 0; Y < Z.length; Y++)
              this.toolbar.container.appendChild(Z[Y]);
            this.toolbar.fontMenu = V;
            this.toolbar.sizeMenu = T;
          }
          ba = e.cellEditor.isContentEditing();
          V = L;
          T = I;
          Z = S;
        }
      }),
      ja = this,
      la = e.cellEditor.startEditing;
    e.cellEditor.startEditing = function() {
      la.apply(this, arguments);
      ma();
      if (e.cellEditor.isContentEditing()) {
        var L = !1,
          S = function() {
            L || (L = !0, window.setTimeout(function() {
              var I = e.getSelectedEditingElement();
              null != I && (I = mxUtils.getCurrentStyle(I), null != I && null != ja.toolbar && (ja.toolbar.setFontName(Graph.stripQuotes(I.fontFamily)), ja.toolbar.setFontSize(parseInt(I.fontSize))));
              L = !1;
            }, 0));
          };
        mxEvent.addListener(e.cellEditor.textarea, 'input', S);
        mxEvent.addListener(e.cellEditor.textarea, 'touchend', S);
        mxEvent.addListener(e.cellEditor.textarea, 'mouseup', S);
        mxEvent.addListener(e.cellEditor.textarea, 'keyup', S);
        S();
      }
    };
    var N = e.cellEditor.stopEditing;
    e.cellEditor.stopEditing = function(L, S) {
      try {
        N.apply(this, arguments), ma();
      } catch (I) {
        ja.handleError(I);
      }
    };
    e.container.setAttribute('tabindex', '0');
    e.container.style.cursor = 'default';
    if (window.self === window.top && null != e.container.parentNode)
      try {
        e.container.focus();
      } catch (L) {}
    var X = e.fireMouseEvent;
    e.fireMouseEvent = function(L, S, I) {
      L == mxEvent.MOUSE_DOWN && this.container.focus();
      X.apply(this, arguments);
    };
    e.popupMenuHandler.autoExpand = !0;
    null != this.menus && (e.popupMenuHandler.factoryMethod = mxUtils.bind(this, function(L, S, I) {
      this.menus.createPopupMenu(L, S, I);
    }));
    mxEvent.addGestureListeners(document, mxUtils.bind(this, function(L) {
      e.popupMenuHandler.hideMenu();
    }));
    this.keyHandler = this.createKeyHandler(a);
    this.getKeyHandler = function() {
      return keyHandler;
    };
    e.connectionHandler.addListener(mxEvent.CONNECT, function(L, S) {
      var I = [S.getProperty('cell')];
      S.getProperty('terminalInserted') && (I.push(S.getProperty('terminal')), window.setTimeout(function() {
        null != ja.hoverIcons && ja.hoverIcons.update(e.view.getState(I[I.length - 1]));
      }, 0));
      C(I);
    });
    this.addListener('styleChanged', mxUtils.bind(this, function(L, S) {
      var I = S.getProperty('cells'),
        Y = L = !1;
      if (0 < I.length)
        for (var ia = 0; ia < I.length && (L = e.getModel().isVertex(I[ia]) || L, !(Y = e.getModel().isEdge(I[ia]) || Y) || !L); ia++);
      else
        Y = L = !0;
      L = L && !u;
      Y = Y && !m;
      I = S.getProperty('keys');
      S = S.getProperty('values');
      for (ia = 0; ia < I.length; ia++) {
        var ka = 0 <= mxUtils.indexOf(p, I[ia]);
        if ('strokeColor' != I[ia] || null != S[ia] && 'none' != S[ia])
          if (0 <= mxUtils.indexOf(h, I[ia]))
            Y || 0 <= mxUtils.indexOf(x, I[ia]) ? null == S[ia] ? delete e.currentEdgeStyle[I[ia]] : e.currentEdgeStyle[I[ia]] = S[ia] : L && 0 <= mxUtils.indexOf(d, I[ia]) && (null == S[ia] ? delete e.currentVertexStyle[I[ia]] : e.currentVertexStyle[I[ia]] = S[ia]);
          else if (0 <= mxUtils.indexOf(d, I[ia])) {
          if (L || ka)
            null == S[ia] ? delete e.currentVertexStyle[I[ia]] : e.currentVertexStyle[I[ia]] = S[ia];
          if (Y || ka || 0 <= mxUtils.indexOf(x, I[ia]))
            null == S[ia] ? delete e.currentEdgeStyle[I[ia]] : e.currentEdgeStyle[I[ia]] = S[ia];
        }
      }
      null != this.toolbar && (this.toolbar.setFontName(e.currentVertexStyle.fontFamily || Menus.prototype.defaultFont), this.toolbar.setFontSize(e.currentVertexStyle.fontSize || Menus.prototype.defaultFontSize), null != this.toolbar.edgeStyleMenu && (this.toolbar.edgeStyleMenu.getElementsByTagName('div')[0].className = 'orthogonalEdgeStyle' == e.currentEdgeStyle.edgeStyle && '1' == e.currentEdgeStyle.curved ? 'geSprite geSprite-curved' : 'straight' == e.currentEdgeStyle.edgeStyle || 'none' == e.currentEdgeStyle.edgeStyle || null == e.currentEdgeStyle.edgeStyle ? 'geSprite geSprite-straight' : 'entityRelationEdgeStyle' == e.currentEdgeStyle.edgeStyle ? 'geSprite geSprite-entity' : 'elbowEdgeStyle' == e.currentEdgeStyle.edgeStyle ? 'geSprite geSprite-' + ('vertical' == e.currentEdgeStyle.elbow ? 'verticalelbow' : 'horizontalelbow') : 'isometricEdgeStyle' == e.currentEdgeStyle.edgeStyle ? 'geSprite geSprite-' + ('vertical' == e.currentEdgeStyle.elbow ? 'verticalisometric' : 'horizontalisometric') : 'geSprite geSprite-orthogonal'), null != this.toolbar.edgeShapeMenu && (this.toolbar.edgeShapeMenu.getElementsByTagName('div')[0].className = 'link' == e.currentEdgeStyle.shape ? 'geSprite geSprite-linkedge' : 'flexArrow' == e.currentEdgeStyle.shape ? 'geSprite geSprite-arrow' : 'arrow' == e.currentEdgeStyle.shape ? 'geSprite geSprite-simplearrow' : 'geSprite geSprite-connection'));
    }));
    null != this.toolbar && (a = mxUtils.bind(this, function() {
      var L = e.currentVertexStyle.fontFamily || 'Helvetica',
        S = String(e.currentVertexStyle.fontSize || '12'),
        I = e.getView().getState(e.getSelectionCell());
      null != I && (L = I.style[mxConstants.STYLE_FONTFAMILY] || L, S = I.style[mxConstants.STYLE_FONTSIZE] || S, 10 < L.length && (L = L.substring(0, 8) + '...'));
      this.toolbar.setFontName(L);
      this.toolbar.setFontSize(S);
    }), e.getSelectionModel().addListener(mxEvent.CHANGE, a), e.getModel().addListener(mxEvent.CHANGE, a));
    e.addListener(mxEvent.CELLS_ADDED, function(L, S) {
      L = S.getProperty('cells');
      S = S.getProperty('parent');
      null != S && e.getModel().isLayer(S) && !e.isCellVisible(S) && null != L && 0 < L.length && e.getModel().setVisible(S, !0);
    });
    this.gestureHandler = mxUtils.bind(this, function(L) {
      null != this.currentMenu && mxEvent.getSource(L) != this.currentMenu.div && this.hideCurrentMenu();
    });
    mxEvent.addGestureListeners(document, this.gestureHandler);
    this.resizeHandler = mxUtils.bind(this, function() {
      this.windowResized();
    });
    mxEvent.addListener(window, 'resize', this.resizeHandler);
    this.orientationChangeHandler = mxUtils.bind(this, function() {
      this.refresh();
    });
    mxEvent.addListener(window, 'orientationchange', this.orientationChangeHandler);
    mxClient.IS_IOS && !window.navigator.standalone && 'undefined' !== typeof Menus && (this.scrollHandler = mxUtils.bind(this, function() {
      window.scrollTo(0, 0);
    }), mxEvent.addListener(window, 'scroll', this.scrollHandler));
    this.editor.addListener('resetGraphView', mxUtils.bind(this, function() {
      this.resetScrollbars();
    }));
    this.addListener('gridEnabledChanged', mxUtils.bind(this, function() {
      e.view.validateBackground();
    }));
    this.addListener('backgroundColorChanged', mxUtils.bind(this, function() {
      e.view.validateBackground();
    }));
    e.addListener('gridSizeChanged', mxUtils.bind(this, function() {
      e.isGridEnabled() && e.view.validateBackground();
    }));
    this.editor.resetGraph();
  }
  this.init();
  e.standalone || this.open();
};
EditorUi.compactUi = !0;
EditorUi.parsePng = function(a, b, f) {
  function e(n, u) {
    var m = d;
    d += u;
    return n.substring(m, d);
  }

  function g(n) {
    n = e(n, 4);
    return n.charCodeAt(3) + (n.charCodeAt(2) << 8) + (n.charCodeAt(1) << 16) + (n.charCodeAt(0) << 24);
  }
  var d = 0;
  if (e(a, 8) != String.fromCharCode(137) + 'PNG' + String.fromCharCode(13, 10, 26, 10))
    null != f && f();
  else if (e(a, 4), 'IHDR' != e(a, 4))
    null != f && f();
  else {
    e(a, 17);
    do {
      f = g(a);
      var h = e(a, 4);
      if (null != b && b(d - 8, h, f))
        break;
      value = e(a, f);
      e(a, 4);
      if ('IEND' == h)
        break;
    } while (f);
  }
};
mxUtils.extend(EditorUi, mxEventSource);
EditorUi.prototype.splitSize = mxClient.IS_TOUCH || mxClient.IS_POINTER ? 12 : 8;
EditorUi.prototype.menubarHeight = 30;
EditorUi.prototype.formatEnabled = !0;
EditorUi.prototype.formatWidth = 240;
EditorUi.prototype.toolbarHeight = 38;
EditorUi.prototype.footerHeight = 28;
EditorUi.prototype.hsplitPosition = screen.width <= Editor.smallScreenWidth ? 0 : 'large' != urlParams['sidebar-entries'] ? 212 : 240;
EditorUi.prototype.allowAnimation = !0;
EditorUi.prototype.lightboxMaxFitScale = 2;
EditorUi.prototype.lightboxVerticalDivider = 4;
EditorUi.prototype.hsplitClickEnabled = !1;
EditorUi.prototype.init = function() {
  var a = this.editor.graph;
  if (!a.standalone) {
    '0' != urlParams['shape-picker'] && this.installShapePicker();
    mxEvent.addListener(a.container, 'scroll', mxUtils.bind(this, function() {
      a.tooltipHandler.hide();
      null != a.connectionHandler && null != a.connectionHandler.constraintHandler && a.connectionHandler.constraintHandler.reset();
    }));
    a.addListener(mxEvent.ESCAPE, mxUtils.bind(this, function() {
      a.tooltipHandler.hide();
      var e = a.getRubberband();
      null != e && e.cancel();
    }));
    mxEvent.addListener(a.container, 'keydown', mxUtils.bind(this, function(e) {
      this.onKeyDown(e);
    }));
    mxEvent.addListener(a.container, 'keypress', mxUtils.bind(this, function(e) {
      this.onKeyPress(e);
    }));
    this.addUndoListener();
    this.addBeforeUnloadListener();
    a.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
      this.updateActionStates();
    }));
    a.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
      this.updateActionStates();
    }));
    var b = a.setDefaultParent,
      f = this;
    this.editor.graph.setDefaultParent = function() {
      b.apply(this, arguments);
      f.updateActionStates();
    };
    a.editLink = f.actions.get('editLink').funct;
    this.updateActionStates();
    this.initClipboard();
    this.initCanvas();
    null != this.format && this.format.init();
  }
};
EditorUi.prototype.clearSelectionState = function() {
  this.selectionState = null;
};
EditorUi.prototype.getSelectionState = function() {
  null == this.selectionState && (this.selectionState = this.createSelectionState());
  return this.selectionState;
};
EditorUi.prototype.createSelectionState = function() {
  for (var a = this.editor.graph, b = a.getSelectionCells(), f = this.initSelectionState(), e = !0, g = 0; g < b.length; g++) {
    var d = a.getCurrentCellStyle(b[g]);
    '0' != mxUtils.getValue(d, mxConstants.STYLE_EDITABLE, '1') && (this.updateSelectionStateForCell(f, b[g], b, e), e = !1);
  }
  this.updateSelectionStateForTableCells(f);
  return f;
};
EditorUi.prototype.initSelectionState = function() {
  return {
    vertices: [],
    edges: [],
    cells: [],
    x: null,
    y: null,
    width: null,
    height: null,
    style: {},
    containsImage: !1,
    containsLabel: !1,
    fill: !0,
    glass: !0,
    rounded: !0,
    autoSize: !1,
    image: !1,
    shadow: !0,
    lineJumps: !0,
    resizable: !0,
    table: !1,
    cell: !1,
    row: !1,
    movable: !0,
    rotatable: !0,
    stroke: !0,
    swimlane: !1,
    unlocked: this.editor.graph.isEnabled(),
    connections: !1
  };
};
EditorUi.prototype.updateSelectionStateForTableCells = function(a) {
  if (1 < a.cells.length && a.cell) {
    var b = mxUtils.sortCells(a.cells),
      f = this.editor.graph.model,
      e = f.getParent(b[0]),
      g = f.getParent(e);
    if (null != e && null != g) {
      for (var d = e.getIndex(b[0]), h = g.getIndex(e), n = null, u = 1, m = 1, p = 0, x = h < g.getChildCount() - 1 ? f.getChildAt(f.getChildAt(g, h + 1), d) : null; p < b.length - 1;) {
        var A = b[++p];
        null == x || x != A || null != n && u != n || (n = u, u = 0, m++, e = f.getParent(x), x = h + m < g.getChildCount() ? f.getChildAt(f.getChildAt(g, h + m), d) : null);
        var C = this.editor.graph.view.getState(A);
        if (A == f.getChildAt(e, d + u) && null != C && 1 == mxUtils.getValue(C.style, 'colspan', 1) && 1 == mxUtils.getValue(C.style, 'rowspan', 1))
          u++;
        else
          break;
      }
      p == m * u - 1 && (a.mergeCell = b[0], a.colspan = u, a.rowspan = m);
    }
  }
};
EditorUi.prototype.windowResized = function() {
  window.setTimeout(mxUtils.bind(this, function() {
    null != this.editor.graph && this.refresh();
  }), 0);
};
EditorUi.prototype.updateSelectionStateForCell = function(a, b, f, e) {
  f = this.editor.graph;
  a.cells.push(b);
  if (f.getModel().isVertex(b)) {
    a.connections = 0 < f.model.getEdgeCount(b);
    a.unlocked = a.unlocked && !f.isCellLocked(b);
    a.resizable = a.resizable && f.isCellResizable(b);
    a.rotatable = a.rotatable && f.isCellRotatable(b);
    a.movable = a.movable && f.isCellMovable(b) && !f.isTableRow(b) && !f.isTableCell(b);
    a.swimlane = a.swimlane || f.isSwimlane(b);
    a.table = a.table || f.isTable(b);
    a.cell = a.cell || f.isTableCell(b);
    a.row = a.row || f.isTableRow(b);
    a.vertices.push(b);
    var g = f.getCellGeometry(b);
    if (null != g && (0 < g.width ? null == a.width ? a.width = g.width : a.width != g.width && (a.width = '') : a.containsLabel = !0, 0 < g.height ? null == a.height ? a.height = g.height : a.height != g.height && (a.height = '') : a.containsLabel = !0, !g.relative || null != g.offset)) {
      var d = g.relative ? g.offset.x : g.x;
      g = g.relative ? g.offset.y : g.y;
      null == a.x ? a.x = d : a.x != d && (a.x = '');
      null == a.y ? a.y = g : a.y != g && (a.y = '');
    }
  } else
    f.getModel().isEdge(b) && (a.edges.push(b), a.connections = !0, a.resizable = !1, a.rotatable = !1, a.movable = !1);
  b = f.view.getState(b);
  null != b && (a.autoSize = a.autoSize || f.isAutoSizeState(b), a.glass = a.glass && f.isGlassState(b), a.rounded = a.rounded && f.isRoundedState(b), a.lineJumps = a.lineJumps && f.isLineJumpState(b), a.image = a.image || f.isImageState(b), a.shadow = a.shadow && f.isShadowState(b), a.fill = a.fill && f.isFillState(b), a.stroke = a.stroke && f.isStrokeState(b), d = mxUtils.getValue(b.style, mxConstants.STYLE_SHAPE, null), a.containsImage = a.containsImage || 'image' == d, f.mergeStyle(b.style, a.style, e));
};
EditorUi.prototype.installShapePicker = function() {
  var a = this.editor.graph,
    b = this;
  a.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function(u, m) {
    'mouseDown' == m.getProperty('eventName') && b.hideShapePicker();
  }));
  var f = mxUtils.bind(this, function() {
    b.hideShapePicker(!0);
  });
  a.addListener('wheel', f);
  a.addListener(mxEvent.ESCAPE, f);
  a.view.addListener(mxEvent.SCALE, f);
  a.view.addListener(mxEvent.SCALE_AND_TRANSLATE, f);
  a.getSelectionModel().addListener(mxEvent.CHANGE, f);
  var e = a.popupMenuHandler.isMenuShowing;
  a.popupMenuHandler.isMenuShowing = function() {
    return e.apply(this, arguments) || null != b.shapePicker || null != b.currentMenu;
  };
  var g = a.dblClick;
  a.dblClick = function(u, m) {
    if (this.isEnabled())
      if (null != m || null == b.sidebar || mxEvent.isShiftDown(u) || a.isCellLocked(a.getDefaultParent()))
        g.apply(this, arguments);
      else {
        var p = mxUtils.convertPoint(this.container, mxEvent.getClientX(u), mxEvent.getClientY(u));
        mxEvent.consume(u);
        window.setTimeout(mxUtils.bind(this, function() {
          b.showShapePicker(p.x, p.y);
        }), 30);
      }
  };
  if (null != this.hoverIcons) {
    this.hoverIcons.addListener('reset', f);
    var d = this.hoverIcons.drag;
    this.hoverIcons.drag = function() {
      b.hideShapePicker();
      d.apply(this, arguments);
    };
    var h = this.hoverIcons.execute;
    this.hoverIcons.execute = function(u, m, p) {
      var x = p.getEvent();
      this.graph.isCloneEvent(x) || mxEvent.isShiftDown(x) ? h.apply(this, arguments) : this.graph.connectVertex(u.cell, m, this.graph.defaultEdgeLength, x, null, null, mxUtils.bind(this, function(A, C, D) {
        var G = a.getCompositeParent(u.cell);
        A = a.getCellGeometry(G);
        for (p.consume(); null != G && a.model.isVertex(G) && null != A && A.relative;)
          cell = G, G = a.model.getParent(cell), A = a.getCellGeometry(G);
        window.setTimeout(mxUtils.bind(this, function() {
          b.showShapePicker(p.getGraphX(), p.getGraphY(), G, mxUtils.bind(this, function(F) {
            D(F);
            null != b.hoverIcons && b.hoverIcons.update(a.view.getState(F));
          }), m);
        }), 30);
      }), mxUtils.bind(this, function(A) {
        this.graph.selectCellsForConnectVertex(A, x, this);
      }));
    };
    var n = null;
    this.hoverIcons.addListener('focus', mxUtils.bind(this, function(u, m) {
      null != n && window.clearTimeout(n);
      n = window.setTimeout(mxUtils.bind(this, function() {
        var p = m.getProperty('arrow'),
          x = m.getProperty('direction'),
          A = m.getProperty('event');
        p = p.getBoundingClientRect();
        var C = mxUtils.getOffset(a.container),
          D = a.container.scrollLeft + p.x - C.x;
        C = a.container.scrollTop + p.y - C.y;
        var G = a.getCompositeParent(null != this.hoverIcons.currentState ? this.hoverIcons.currentState.cell : null),
          F = b.showShapePicker(D, C, G, mxUtils.bind(this, function(K) {
            null != K && a.connectVertex(G, x, a.defaultEdgeLength, A, !0, !1, function(P, R, Q) {
              Q(K);
              null != b.hoverIcons && b.hoverIcons.update(a.view.getState(K));
            }, function(P) {
              a.selectCellsForConnectVertex(P);
            }, A, this.hoverIcons);
          }), x, !0);
        this.centerShapePicker(F, p, D, C, x);
        mxUtils.setOpacity(F, 30);
        mxEvent.addListener(F, 'mouseenter', function() {
          mxUtils.setOpacity(F, 100);
        });
        mxEvent.addListener(F, 'mouseleave', function() {
          b.hideShapePicker();
        });
      }), Editor.shapePickerHoverDelay);
    }));
    this.hoverIcons.addListener('blur', mxUtils.bind(this, function(u, m) {
      null != n && window.clearTimeout(n);
    }));
  }
};
EditorUi.prototype.centerShapePicker = function(a, b, f, e, g) {
  if (g == mxConstants.DIRECTION_EAST || g == mxConstants.DIRECTION_WEST)
    a.style.width = '40px';
  var d = a.getBoundingClientRect();
  g == mxConstants.DIRECTION_NORTH ? (f -= d.width / 2 - 10, e -= d.height + 6) : g == mxConstants.DIRECTION_SOUTH ? (f -= d.width / 2 - 10, e += b.height + 6) : g == mxConstants.DIRECTION_WEST ? (f -= d.width + 6, e -= d.height / 2 - 10) : g == mxConstants.DIRECTION_EAST && (f += b.width + 6, e -= d.height / 2 - 10);
  a.style.left = f + 'px';
  a.style.top = e + 'px';
};
EditorUi.prototype.showShapePicker = function(a, b, f, e, g, d, h, n) {
  n = n || null == f;
  a = this.createShapePicker(a, b, f, e, g, mxUtils.bind(this, function() {
    this.hideShapePicker();
  }), this.getCellsForShapePicker(f, d, n), d, h, n);
  null != a && (null == this.hoverIcons || d || this.hoverIcons.reset(), d = this.editor.graph, d.popupMenuHandler.hideMenu(), d.tooltipHandler.hideTooltip(), this.hideCurrentMenu(), this.hideShapePicker(), this.shapePickerCallback = e, this.shapePicker = a);
  return a;
};
EditorUi.prototype.createShapePicker = function(a, b, f, e, g, d, h, n, u, m) {
  var p = this.editor.graph,
    x = null;
  u = null != u ? u : function(D) {
    D = D[0];
    var G = 0,
      F = 0,
      K = D.geometry;
    null != K && (p.model.isEdge(D) && (D = K.getTerminalPoint(!1), K = new mxRectangle(0, 0, D.x, D.y)), G = K.width / 2, F = K.height / 2);
    return new mxPoint(p.snap(Math.round(a / p.view.scale) - p.view.translate.x - G), p.snap(Math.round(b / p.view.scale) - p.view.translate.y - F));
  };
  if (null != h && 0 < h.length) {
    var A = this;
    p = this.editor.graph;
    x = document.createElement('div');
    g = p.view.getState(f);
    var C = null == f || null != g && p.isTransparentState(g) ? null : p.copyStyle(f);
    f = 6 > h.length ? 35 * h.length : 140;
    x.className = 'geToolbarContainer geSidebarContainer geShapePicker';
    x.style.left = a + 'px';
    x.style.top = b + 'px';
    x.style.width = f + 'px';
    n || mxUtils.setPrefixedStyle(x.style, 'transform', 'translate(-22px,-22px)');
    null != p.background && p.background != mxConstants.NONE && (x.style.backgroundColor = p.background);
    p.container.appendChild(x);
    f = mxUtils.bind(this, function(D) {
      var G = document.createElement('a');
      G.className = 'geItem';
      G.style.cssText = 'position:relative;display:inline-block;position:relative;width:30px;height:30px;cursor:pointer;overflow:hidden;padding:1px';
      x.appendChild(G);
      null != C && '1' != urlParams.sketch ? this.sidebar.graph.pasteStyle(C, [D]) : A.insertHandler([D], '' != D.value && '1' != urlParams.sketch, this.sidebar.graph.model);
      var F = D.geometry;
      p.model.isEdge(D) && (F = F.getTerminalPoint(!1), F = new mxRectangle(0, 0, F.x, F.y));
      G.appendChild(this.sidebar.createVertexTemplateFromCells([D], F.width, F.height, '', !0, !1, null, !1, mxUtils.bind(this, function(K) {
        var P = p.cloneCell(D);
        if (null != e)
          e(P);
        else {
          var R = u([P]);
          p.model.isEdge(P) ? P.geometry.translate(R.x, R.y) : (P.geometry.x = R.x, P.geometry.y = R.y);
          p.model.beginUpdate();
          try {
            p.addCell(P), p.model.isVertex(P) && p.isAutoSizeCell(P) && p.updateCellSize(P);
          } finally {
            p.model.endUpdate();
          }
          p.setSelectionCell(P);
          p.scrollCellToVisible(P);
          p.startEditingAtCell(P);
          null != A.hoverIcons && A.hoverIcons.update(p.view.getState(P));
        }
        null != d && d();
        mxEvent.consume(K);
      }), 25, 25));
    });
    for (g = 0; g < (n ? Math.min(h.length, 4) : h.length); g++)
      f(h[g]);
    h = x.offsetTop + x.clientHeight - (p.container.scrollTop + p.container.offsetHeight);
    0 < h && (x.style.top = Math.max(p.container.scrollTop + 22, b - h) + 'px');
    h = x.offsetLeft + x.clientWidth - (p.container.scrollLeft + p.container.offsetWidth);
    0 < h && (x.style.left = Math.max(p.container.scrollLeft + 22, a - h) + 'px');
  }
  return x;
};
EditorUi.prototype.getCellsForShapePicker = function(a, b, f) {
  var e = mxUtils.bind(this, function(g, d, h, n) {
    return this.editor.graph.createVertex(null, null, n || '', 0, 0, d || 120, h || 60, g, !1);
  });
  b = mxUtils.bind(this, function(g, d, h) {
    g = new mxCell(h || '', new mxGeometry(0, 0, this.editor.graph.defaultEdgeLength + 20, 0), g);
    g.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
    g.geometry.setTerminalPoint(new mxPoint(g.geometry.width, null != d ? d : 0), !1);
    g.geometry.points = null != d ? [new mxPoint(g.geometry.width / 2, d)] : [];
    g.geometry.relative = !0;
    g.edge = !0;
    return g;
  });
  a = [
    null != a ? this.editor.graph.cloneCell(a) : e('text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;', 40, 20, 'Text'),
    e('whiteSpace=wrap;html=1;'),
    e('ellipse;whiteSpace=wrap;html=1;', 80, 80),
    e('rhombus;whiteSpace=wrap;html=1;', 80, 80),
    e('rounded=1;whiteSpace=wrap;html=1;'),
    e('shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;fixedSize=1;'),
    e('shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 60),
    e('shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80),
    e('shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80),
    e('shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;'),
    e('triangle;whiteSpace=wrap;html=1;', 60, 80),
    e('shape=document;whiteSpace=wrap;html=1;boundedLbl=1;', 120, 80),
    e('shape=tape;whiteSpace=wrap;html=1;', 120, 100),
    e('ellipse;shape=cloud;whiteSpace=wrap;html=1;', 120, 80),
    e('shape=singleArrow;whiteSpace=wrap;html=1;arrowWidth=0.4;arrowSize=0.4;', 80, 60),
    e('shape=waypoint;sketch=0;size=6;pointerEvents=1;points=[];fillColor=none;resizable=0;rotatable=0;perimeter=centerPerimeter;snapToPoint=1;', 40, 40)
  ];
  f && (a = a.concat([
    b('edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;'),
    b('edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classic;startArrow=classic;endSize=8;startSize=8;'),
    b('edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;shape=flexArrow;rounded=1;startSize=8;endSize=8;'),
    b('edgeStyle=segmentEdgeStyle;endArrow=classic;html=1;curved=0;rounded=0;endSize=8;startSize=8;sourcePerimeterSpacing=0;targetPerimeterSpacing=0;', this.editor.graph.defaultEdgeLength / 2)
  ]));
  return a;
};
EditorUi.prototype.isShapePickerVisible = function(a) {
  return null != this.shapePicker;
};
EditorUi.prototype.hideShapePicker = function(a) {
  null != this.shapePicker && (this.shapePicker.parentNode.removeChild(this.shapePicker), this.shapePicker = null, a || null == this.shapePickerCallback || this.shapePickerCallback(), this.shapePickerCallback = null);
};
EditorUi.prototype.onKeyDown = function(a) {
  var b = this.editor.graph;
  if (9 == a.which && b.isEnabled() && !mxEvent.isControlDown(a)) {
    if (b.isEditing())
      if (mxEvent.isAltDown(a))
        b.stopEditing(!1);
      else
        try {
          var f = b.cellEditor.isContentEditing() && b.cellEditor.isTextSelected();
          if (window.getSelection && b.cellEditor.isContentEditing() && !f && !mxClient.IS_IE && !mxClient.IS_IE11) {
            var e = window.getSelection(),
              g = 0 < e.rangeCount ? e.getRangeAt(0).commonAncestorContainer : null;
            f = null != g && ('LI' == g.nodeName || null != g.parentNode && 'LI' == g.parentNode.nodeName);
          }
          f ? document.execCommand(mxEvent.isShiftDown(a) ? 'outdent' : 'indent', !1, null) : mxEvent.isShiftDown(a) ? b.stopEditing(!1) : b.cellEditor.insertTab(b.cellEditor.isContentEditing() ? null : 4);
        } catch (d) {}
    else
      mxEvent.isAltDown(a) ? b.selectParentCell() : b.selectCell(!mxEvent.isShiftDown(a));
    mxEvent.consume(a);
  }
};
EditorUi.prototype.onKeyPress = function(a) {
  var b = this.editor.graph;
  !this.isImmediateEditingEvent(a) || b.isEditing() || b.isSelectionEmpty() || 0 === a.which || 27 === a.which || mxEvent.isAltDown(a) || mxEvent.isControlDown(a) || mxEvent.isMetaDown(a) || (b.escape(), b.startEditing(), mxClient.IS_FF && (b = b.cellEditor, null != b.textarea && (b.textarea.innerHTML = String.fromCharCode(a.which), a = document.createRange(), a.selectNodeContents(b.textarea), a.collapse(!1), b = window.getSelection(), b.removeAllRanges(), b.addRange(a))));
};
EditorUi.prototype.isImmediateEditingEvent = function(a) {
  return !0;
};
EditorUi.prototype.updateCssForMarker = function(a, b, f, e, g) {
  a.style.verticalAlign = 'top';
  a.style.height = '21px';
  a.style.width = '21px';
  a.innerText = '';
  'flexArrow' == f ? a.className = null != e && e != mxConstants.NONE ? 'geSprite geSprite-' + b + 'blocktrans' : 'geSprite geSprite-noarrow' : (f = this.getImageForMarker(e, g), null != f ? (e = document.createElement('img'), e.className = 'geAdaptiveAsset', e.style.position = 'absolute', e.style.marginTop = '0.5px', e.setAttribute('src', f), a.className = '', 'end' == b && mxUtils.setPrefixedStyle(e.style, 'transform', 'scaleX(-1)'), a.appendChild(e)) : (a.className = 'geSprite geSprite-noarrow', a.innerHTML = mxUtils.htmlEntities(mxResources.get('none')), a.style.backgroundImage = 'none', a.style.verticalAlign = 'top', a.style.marginTop = '4px', a.style.fontSize = '10px', a.style.filter = 'none', a.style.color = this.defaultStrokeColor, a.nextSibling.style.marginTop = '0px'));
};
EditorUi.prototype.getImageForMarker = function(a, b) {
  var f = null;
  a == mxConstants.ARROW_CLASSIC ? f = '1' != b ? Format.classicMarkerImage.src : Format.classicFilledMarkerImage.src : a == mxConstants.ARROW_CLASSIC_THIN ? f = '1' != b ? Format.classicThinMarkerImage.src : Format.openThinFilledMarkerImage.src : a == mxConstants.ARROW_OPEN ? f = Format.openFilledMarkerImage.src : a == mxConstants.ARROW_OPEN_THIN ? f = Format.openThinFilledMarkerImage.src : a == mxConstants.ARROW_BLOCK ? f = '1' != b ? Format.blockMarkerImage.src : Format.blockFilledMarkerImage.src : a == mxConstants.ARROW_BLOCK_THIN ? f = '1' != b ? Format.blockThinMarkerImage.src : Format.blockThinFilledMarkerImage.src : a == mxConstants.ARROW_OVAL ? f = '1' != b ? Format.ovalMarkerImage.src : Format.ovalFilledMarkerImage.src : a == mxConstants.ARROW_DIAMOND ? f = '1' != b ? Format.diamondMarkerImage.src : Format.diamondFilledMarkerImage.src : a == mxConstants.ARROW_DIAMOND_THIN ? f = '1' != b ? Format.diamondThinMarkerImage.src : Format.diamondThinFilledMarkerImage.src : 'doubleBlock' == a ? f = '1' != b ? Format.doubleBlockMarkerImage.src : Format.doubleBlockFilledMarkerImage.src : 'box' == a ? f = Format.boxMarkerImage.src : 'halfCircle' == a ? f = Format.halfCircleMarkerImage.src : 'openAsync' == a ? f = Format.openAsyncFilledMarkerImage.src : 'async' == a ? f = '1' != b ? Format.asyncMarkerImage.src : Format.asyncFilledMarkerImage.src : 'dash' == a ? f = Format.dashMarkerImage.src : 'baseDash' == a ? f = Format.baseDashMarkerImage.src : 'cross' == a ? f = Format.crossMarkerImage.src : 'circle' == a ? f = Format.circleMarkerImage.src : 'circlePlus' == a ? f = Format.circlePlusMarkerImage.src : 'ERone' == a ? f = Format.EROneMarkerImage.src : 'ERmandOne' == a ? f = Format.ERmandOneMarkerImage.src : 'ERmany' == a ? f = Format.ERmanyMarkerImage.src : 'ERoneToMany' == a ? f = Format.ERoneToManyMarkerImage.src : 'ERzeroToOne' == a ? f = Format.ERzeroToOneMarkerImage.src : 'ERzeroToMany' == a && (f = Format.ERzeroToManyMarkerImage.src);
  return f;
};
EditorUi.prototype.createMenus = function() {
  return null;
};
EditorUi.prototype.updatePasteActionStates = function() {
  var a = this.editor.graph,
    b = this.actions.get('paste'),
    f = this.actions.get('pasteHere');
  b.setEnabled(this.editor.graph.cellEditor.isContentEditing() || (!mxClient.IS_FF && null != navigator.clipboard || !mxClipboard.isEmpty()) && a.isEnabled() && !a.isCellLocked(a.getDefaultParent()));
  f.setEnabled(b.isEnabled());
};
EditorUi.prototype.initClipboard = function() {
  var a = this,
    b = mxClipboard.cut;
  mxClipboard.cut = function(d) {
    d.cellEditor.isContentEditing() ? document.execCommand('cut', !1, null) : b.apply(this, arguments);
    a.updatePasteActionStates();
  };
  mxClipboard.copy = function(d) {
    var h = null;
    if (d.cellEditor.isContentEditing())
      document.execCommand('copy', !1, null);
    else {
      h = h || d.getSelectionCells();
      h = d.getExportableCells(d.model.getTopmostCells(h));
      for (var n = {}, u = d.createCellLookup(h), m = d.cloneCells(h, null, n), p = new mxGraphModel(), x = p.getChildAt(p.getRoot(), 0), A = 0; A < m.length; A++) {
        p.add(x, m[A]);
        var C = d.view.getState(h[A]);
        if (null != C) {
          var D = d.getCellGeometry(m[A]);
          null != D && D.relative && !p.isEdge(h[A]) && null == u[mxObjectIdentity.get(p.getParent(h[A]))] && (D.offset = null, D.relative = !1, D.x = C.x / C.view.scale - C.view.translate.x, D.y = C.y / C.view.scale - C.view.translate.y);
        }
      }
      d.updateCustomLinks(d.createCellMapping(n, u), m);
      mxClipboard.insertCount = 1;
      mxClipboard.setCells(m);
    }
    a.updatePasteActionStates();
    return h;
  };
  var f = mxClipboard.paste;
  mxClipboard.paste = function(d) {
    var h = null;
    d.cellEditor.isContentEditing() ? document.execCommand('paste', !1, null) : h = f.apply(this, arguments);
    a.updatePasteActionStates();
    return h;
  };
  var e = this.editor.graph.cellEditor.startEditing;
  this.editor.graph.cellEditor.startEditing = function() {
    e.apply(this, arguments);
    a.updatePasteActionStates();
  };
  var g = this.editor.graph.cellEditor.stopEditing;
  this.editor.graph.cellEditor.stopEditing = function(d, h) {
    g.apply(this, arguments);
    a.updatePasteActionStates();
  };
  this.updatePasteActionStates();
};
EditorUi.prototype.lazyZoomDelay = 20;
EditorUi.prototype.wheelZoomDelay = 400;
EditorUi.prototype.buttonZoomDelay = 600;
EditorUi.prototype.initCanvas = function() {
  var a = this.editor.graph;
  a.timerAutoScroll = !0;
  a.getPagePadding = function() {
    return new mxPoint(Math.max(0, Math.round((a.container.offsetWidth - 34) / a.view.scale)), Math.max(0, Math.round((a.container.offsetHeight - 34) / a.view.scale)));
  };
  a.view.getBackgroundPageBounds = function() {
    var I = this.graph.getPageLayout(),
      Y = this.graph.getPageSize();
    return new mxRectangle(this.scale * (this.translate.x + I.x * Y.width), this.scale * (this.translate.y + I.y * Y.height), this.scale * I.width * Y.width, this.scale * I.height * Y.height);
  };
  a.getPreferredPageSize = function(I, Y, ia) {
    I = this.getPageLayout();
    Y = this.getPageSize();
    return new mxRectangle(0, 0, I.width * Y.width, I.height * Y.height);
  };
  var b = null,
    f = this;
  if (this.editor.isChromelessView()) {
    this.chromelessResize = b = mxUtils.bind(this, function(I, Y, ia, ka) {
      if (null != a.container && !a.isViewer()) {
        ia = null != ia ? ia : 0;
        ka = null != ka ? ka : 0;
        var U = a.pageVisible ? a.view.getBackgroundPageBounds() : a.getGraphBounds(),
          ca = mxUtils.hasScrollbars(a.container),
          ra = a.view.translate,
          ua = a.view.scale,
          Ga = mxRectangle.fromRectangle(U);
        Ga.x = Ga.x / ua - ra.x;
        Ga.y = Ga.y / ua - ra.y;
        Ga.width /= ua;
        Ga.height /= ua;
        ra = a.container.scrollTop;
        var Ia = a.container.scrollLeft,
          wa = 8 <= document.documentMode ? 20 : 14;
        if (8 == document.documentMode || 9 == document.documentMode)
          wa += 3;
        var Ca = a.container.offsetWidth - wa;
        wa = a.container.offsetHeight - wa;
        I = I ? Math.max(0.3, Math.min(Y || 1, Ca / Ga.width)) : ua;
        Y = (Ca - I * Ga.width) / 2 / I;
        var ta = 0 == this.lightboxVerticalDivider ? 0 : (wa - I * Ga.height) / this.lightboxVerticalDivider / I;
        ca && (Y = Math.max(Y, 0), ta = Math.max(ta, 0));
        if (ca || U.width < Ca || U.height < wa)
          a.view.scaleAndTranslate(I, Math.floor(Y - Ga.x), Math.floor(ta - Ga.y)), a.container.scrollTop = ra * I / ua, a.container.scrollLeft = Ia * I / ua;
        else if (0 != ia || 0 != ka)
          U = a.view.translate, a.view.setTranslate(Math.floor(U.x + ia / ua), Math.floor(U.y + ka / ua));
      }
    });
    this.chromelessWindowResize = mxUtils.bind(this, function() {
      this.chromelessResize(!1);
    });
    var e = mxUtils.bind(this, function() {
      this.chromelessWindowResize(!1);
    });
    mxEvent.addListener(window, 'resize', e);
    this.destroyFunctions.push(function() {
      mxEvent.removeListener(window, 'resize', e);
    });
    this.editor.addListener('resetGraphView', mxUtils.bind(this, function() {
      this.chromelessResize(!0);
    }));
    this.actions.get('zoomIn').funct = mxUtils.bind(this, function(I) {
      a.zoomIn();
      this.chromelessResize(!1);
    });
    this.actions.get('zoomOut').funct = mxUtils.bind(this, function(I) {
      a.zoomOut();
      this.chromelessResize(!1);
    });
    if ('0' != urlParams.toolbar) {
      var g = JSON.parse(decodeURIComponent(urlParams['toolbar-config'] || '{}'));
      this.chromelessToolbar = document.createElement('div');
      this.chromelessToolbar.style.position = 'fixed';
      this.chromelessToolbar.style.overflow = 'hidden';
      this.chromelessToolbar.style.boxSizing = 'border-box';
      this.chromelessToolbar.style.whiteSpace = 'nowrap';
      this.chromelessToolbar.style.padding = '10px 10px 8px 10px';
      this.chromelessToolbar.style.left = a.isViewer() ? '0' : '50%';
      mxClient.IS_IE || mxClient.IS_IE11 ? (this.chromelessToolbar.style.backgroundColor = '#ffffff', this.chromelessToolbar.style.border = '3px solid black') : this.chromelessToolbar.style.backgroundColor = '#000000';
      mxUtils.setPrefixedStyle(this.chromelessToolbar.style, 'borderRadius', '16px');
      mxUtils.setPrefixedStyle(this.chromelessToolbar.style, 'transition', 'opacity 600ms ease-in-out');
      var d = mxUtils.bind(this, function() {
        var I = mxUtils.getCurrentStyle(a.container);
        a.isViewer() ? this.chromelessToolbar.style.top = '0' : this.chromelessToolbar.style.bottom = (null != I ? parseInt(I['margin-bottom'] || 0) : 0) + (null != this.tabContainer ? 20 + parseInt(this.tabContainer.style.height) : 20) + 'px';
      });
      this.editor.addListener('resetGraphView', d);
      d();
      var h = 0;
      d = mxUtils.bind(this, function(I, Y, ia) {
        h++;
        var ka = document.createElement('span');
        ka.style.paddingLeft = '8px';
        ka.style.paddingRight = '8px';
        ka.style.cursor = 'pointer';
        mxEvent.addListener(ka, 'click', I);
        null != ia && ka.setAttribute('title', ia);
        I = document.createElement('img');
        I.setAttribute('border', '0');
        I.setAttribute('src', Y);
        I.style.width = '36px';
        I.style.filter = 'invert(100%)';
        ka.appendChild(I);
        this.chromelessToolbar.appendChild(ka);
        return ka;
      });
      if (null != g.backBtn) {
        var n = Graph.sanitizeLink(g.backBtn.url);
        null != n && d(mxUtils.bind(this, function(I) {
          window.location.href = n;
          mxEvent.consume(I);
        }), Editor.backImage, mxResources.get('back', null, 'Back'));
      }
      if (this.isPagesEnabled()) {
        var u = d(mxUtils.bind(this, function(I) {
            this.actions.get('previousPage').funct();
            mxEvent.consume(I);
          }), Editor.previousImage, mxResources.get('previousPage')),
          m = document.createElement('div');
        m.style.fontFamily = Editor.defaultHtmlFont;
        m.style.display = 'inline-block';
        m.style.verticalAlign = 'top';
        m.style.fontWeight = 'bold';
        m.style.marginTop = '8px';
        m.style.fontSize = '14px';
        m.style.color = mxClient.IS_IE || mxClient.IS_IE11 ? '#000000' : '#ffffff';
        this.chromelessToolbar.appendChild(m);
        var p = d(mxUtils.bind(this, function(I) {
            this.actions.get('nextPage').funct();
            mxEvent.consume(I);
          }), Editor.nextImage, mxResources.get('nextPage')),
          x = mxUtils.bind(this, function() {
            null != this.pages && 1 < this.pages.length && null != this.currentPage && (m.innerText = '', mxUtils.write(m, mxUtils.indexOf(this.pages, this.currentPage) + 1 + ' / ' + this.pages.length));
          });
        u.style.paddingLeft = '0px';
        u.style.paddingRight = '4px';
        p.style.paddingLeft = '4px';
        p.style.paddingRight = '0px';
        var A = mxUtils.bind(this, function() {
          null != this.pages && 1 < this.pages.length && null != this.currentPage ? (p.style.display = '', u.style.display = '', m.style.display = 'inline-block') : (p.style.display = 'none', u.style.display = 'none', m.style.display = 'none');
          x();
        });
        this.editor.addListener('resetGraphView', A);
        this.editor.addListener('pageSelected', x);
      }
      d(mxUtils.bind(this, function(I) {
        this.actions.get('zoomOut').funct();
        mxEvent.consume(I);
      }), Editor.zoomOutImage, mxResources.get('zoomOut') + ' (Alt+Mousewheel)');
      d(mxUtils.bind(this, function(I) {
        this.actions.get('zoomIn').funct();
        mxEvent.consume(I);
      }), Editor.zoomInImage, mxResources.get('zoomIn') + ' (Alt+Mousewheel)');
      d(mxUtils.bind(this, function(I) {
        a.isLightboxView() ? (1 == a.view.scale ? this.lightboxFit() : a.zoomTo(1), this.chromelessResize(!1)) : this.chromelessResize(!0);
        mxEvent.consume(I);
      }), Editor.zoomFitImage, mxResources.get('fit'));
      var C = null,
        D = null,
        G = mxUtils.bind(this, function(I) {
          null != C && (window.clearTimeout(C), C = null);
          null != D && (window.clearTimeout(D), D = null);
          C = window.setTimeout(mxUtils.bind(this, function() {
            mxUtils.setOpacity(this.chromelessToolbar, 0);
            C = null;
            D = window.setTimeout(mxUtils.bind(this, function() {
              this.chromelessToolbar.style.display = 'none';
              D = null;
            }), 600);
          }), I || 200);
        }),
        F = mxUtils.bind(this, function(I) {
          null != C && (window.clearTimeout(C), C = null);
          null != D && (window.clearTimeout(D), D = null);
          this.chromelessToolbar.style.display = '';
          mxUtils.setOpacity(this.chromelessToolbar, I || 30);
        });
      if ('1' == urlParams.layers) {
        this.layersDialog = null;
        var K = d(mxUtils.bind(this, function(I) {
            if (null != this.layersDialog)
              this.layersDialog.parentNode.removeChild(this.layersDialog), this.layersDialog = null;
            else {
              this.layersDialog = a.createLayersDialog(null, !0);
              mxEvent.addListener(this.layersDialog, 'mouseleave', mxUtils.bind(this, function() {
                this.layersDialog.parentNode.removeChild(this.layersDialog);
                this.layersDialog = null;
              }));
              var Y = K.getBoundingClientRect();
              mxUtils.setPrefixedStyle(this.layersDialog.style, 'borderRadius', '5px');
              this.layersDialog.style.position = 'fixed';
              this.layersDialog.style.fontFamily = Editor.defaultHtmlFont;
              this.layersDialog.style.width = '160px';
              this.layersDialog.style.padding = '4px 2px 4px 2px';
              this.layersDialog.style.left = Y.left + 'px';
              this.layersDialog.style.bottom = parseInt(this.chromelessToolbar.style.bottom) + this.chromelessToolbar.offsetHeight + 4 + 'px';
              mxClient.IS_IE || mxClient.IS_IE11 ? (this.layersDialog.style.backgroundColor = '#ffffff', this.layersDialog.style.border = '2px solid black', this.layersDialog.style.color = '#000000') : (this.layersDialog.style.backgroundColor = '#000000', this.layersDialog.style.color = '#ffffff', mxUtils.setOpacity(this.layersDialog, 80));
              Y = mxUtils.getCurrentStyle(this.editor.graph.container);
              this.layersDialog.style.zIndex = Y.zIndex;
              document.body.appendChild(this.layersDialog);
              this.editor.fireEvent(new mxEventObject('layersDialogShown'));
            }
            mxEvent.consume(I);
          }), Editor.layersImage, mxResources.get('layers')),
          P = a.getModel();
        P.addListener(mxEvent.CHANGE, function() {
          K.style.display = 1 < P.getChildCount(P.root) ? '' : 'none';
        });
      }
      ('1' != urlParams.openInSameWin || navigator.standalone) && this.addChromelessToolbarItems(d);
      null == this.editor.editButtonLink && null == this.editor.editButtonFunc || d(mxUtils.bind(this, function(I) {
        null != this.editor.editButtonFunc ? this.editor.editButtonFunc() : '_blank' == this.editor.editButtonLink ? this.editor.editAsNew(this.getEditBlankXml()) : a.openLink(this.editor.editButtonLink, 'editWindow');
        mxEvent.consume(I);
      }), Editor.editImage, mxResources.get('edit'));
      if (null != this.lightboxToolbarActions)
        for (A = 0; A < this.lightboxToolbarActions.length; A++) {
          var R = this.lightboxToolbarActions[A];
          R.elem = d(R.fn, R.icon, R.tooltip);
        }
      if (null != g.refreshBtn) {
        var Q = null == g.refreshBtn.url ? null : Graph.sanitizeLink(g.refreshBtn.url);
        d(mxUtils.bind(this, function(I) {
          null != Q ? window.location.href = Q : window.location.reload();
          mxEvent.consume(I);
        }), Editor.refreshImage, mxResources.get('refresh', null, 'Refresh'));
      }
      null != g.fullscreenBtn && window.self !== window.top && d(mxUtils.bind(this, function(I) {
        g.fullscreenBtn.url ? a.openLink(g.fullscreenBtn.url) : a.openLink(window.location.href);
        mxEvent.consume(I);
      }), Editor.fullscreenImage, mxResources.get('openInNewWindow', null, 'Open in New Window'));
      (g.closeBtn && window.self === window.top || a.lightbox && ('1' == urlParams.close || this.container != document.body)) && d(mxUtils.bind(this, function(I) {
        '1' == urlParams.close || g.closeBtn ? window.close() : (this.destroy(), mxEvent.consume(I));
      }), Editor.closeImage, mxResources.get('close') + ' (Escape)');
      this.chromelessToolbar.style.display = 'none';
      a.isViewer() || mxUtils.setPrefixedStyle(this.chromelessToolbar.style, 'transform', 'translate(-50%,0)');
      a.container.appendChild(this.chromelessToolbar);
      mxEvent.addListener(a.container, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', mxUtils.bind(this, function(I) {
        mxEvent.isTouchEvent(I) || (mxEvent.isShiftDown(I) || F(30), G());
      }));
      mxEvent.addListener(this.chromelessToolbar, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', function(I) {
        mxEvent.consume(I);
      });
      mxEvent.addListener(this.chromelessToolbar, 'mouseenter', mxUtils.bind(this, function(I) {
        a.tooltipHandler.resetTimer();
        a.tooltipHandler.hideTooltip();
        mxEvent.isShiftDown(I) ? G() : F(100);
      }));
      mxEvent.addListener(this.chromelessToolbar, 'mousemove', mxUtils.bind(this, function(I) {
        mxEvent.isShiftDown(I) ? G() : F(100);
        mxEvent.consume(I);
      }));
      mxEvent.addListener(this.chromelessToolbar, 'mouseleave', mxUtils.bind(this, function(I) {
        mxEvent.isTouchEvent(I) || F(30);
      }));
      var ba = a.getTolerance();
      a.addMouseListener({
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0,
        mouseDown: function(I, Y) {
          this.startX = Y.getGraphX();
          this.startY = Y.getGraphY();
          this.scrollLeft = a.container.scrollLeft;
          this.scrollTop = a.container.scrollTop;
        },
        mouseMove: function(I, Y) {},
        mouseUp: function(I, Y) {
          mxEvent.isTouchEvent(Y.getEvent()) && Math.abs(this.scrollLeft - a.container.scrollLeft) < ba && Math.abs(this.scrollTop - a.container.scrollTop) < ba && Math.abs(this.startX - Y.getGraphX()) < ba && Math.abs(this.startY - Y.getGraphY()) < ba && (0 < parseFloat(f.chromelessToolbar.style.opacity || 0) ? G() : F(30));
        }
      });
    }
    this.editor.editable || this.addChromelessClickHandler();
  } else if (this.editor.extendCanvas) {
    var V = a.view.validate;
    a.view.validate = function() {
      if (null != this.graph.container && mxUtils.hasScrollbars(this.graph.container)) {
        var I = this.graph.getPagePadding(),
          Y = this.graph.getPageSize();
        this.translate.x = I.x - (this.x0 || 0) * Y.width;
        this.translate.y = I.y - (this.y0 || 0) * Y.height;
      }
      V.apply(this, arguments);
    };
    if (!a.isViewer()) {
      var T = a.sizeDidChange;
      a.sizeDidChange = function() {
        if (null != this.container && mxUtils.hasScrollbars(this.container)) {
          var I = this.getPageLayout(),
            Y = this.getPagePadding(),
            ia = this.getPageSize(),
            ka = Math.ceil(2 * Y.x + I.width * ia.width),
            U = Math.ceil(2 * Y.y + I.height * ia.height),
            ca = a.minimumGraphSize;
          if (null == ca || ca.width != ka || ca.height != U)
            a.minimumGraphSize = new mxRectangle(0, 0, ka, U);
          ka = Y.x - I.x * ia.width;
          Y = Y.y - I.y * ia.height;
          this.autoTranslate || this.view.translate.x == ka && this.view.translate.y == Y ? T.apply(this, arguments) : (this.autoTranslate = !0, this.view.x0 = I.x, this.view.y0 = I.y, I = a.view.translate.x, ia = a.view.translate.y, a.view.setTranslate(ka, Y), a.container.scrollLeft += Math.round((ka - I) * a.view.scale), a.container.scrollTop += Math.round((Y - ia) * a.view.scale), this.autoTranslate = !1);
        } else
          this.fireEvent(new mxEventObject(mxEvent.SIZE, 'bounds', this.getGraphBounds()));
      };
    }
  }
  var Z = a.view.getBackgroundPane(),
    ma = a.view.getDrawPane();
  a.cumulativeZoomFactor = 1;
  var ja = null,
    la = null,
    N = null,
    X = null,
    L = null,
    S = function(I) {
      null != ja && window.clearTimeout(ja);
      0 <= I && window.setTimeout(function() {
        if (!a.isMouseDown || X)
          ja = window.setTimeout(mxUtils.bind(this, function() {
            a.isFastZoomEnabled() && (null != a.view.backgroundPageShape && null != a.view.backgroundPageShape.node && (mxUtils.setPrefixedStyle(a.view.backgroundPageShape.node.style, 'transform-origin', null), mxUtils.setPrefixedStyle(a.view.backgroundPageShape.node.style, 'transform', null)), ma.style.transformOrigin = '', Z.style.transformOrigin = '', mxClient.IS_SF ? (ma.style.transform = 'scale(1)', Z.style.transform = 'scale(1)', window.setTimeout(function() {
              ma.style.transform = '';
              Z.style.transform = '';
            }, 0)) : (ma.style.transform = '', Z.style.transform = ''), a.view.getDecoratorPane().style.opacity = '', a.view.getOverlayPane().style.opacity = '');
            var Y = new mxPoint(a.container.scrollLeft, a.container.scrollTop),
              ia = mxUtils.getOffset(a.container),
              ka = a.view.scale,
              U = 0,
              ca = 0;
            null != la && (U = a.container.offsetWidth / 2 - la.x + ia.x, ca = a.container.offsetHeight / 2 - la.y + ia.y);
            a.zoom(a.cumulativeZoomFactor, null, a.isFastZoomEnabled() ? 20 : null);
            a.view.scale != ka && (null != N && (U += Y.x - N.x, ca += Y.y - N.y), null != b && f.chromelessResize(!1, null, U * (a.cumulativeZoomFactor - 1), ca * (a.cumulativeZoomFactor - 1)), !mxUtils.hasScrollbars(a.container) || 0 == U && 0 == ca || (a.container.scrollLeft -= U * (a.cumulativeZoomFactor - 1), a.container.scrollTop -= ca * (a.cumulativeZoomFactor - 1)));
            null != L && ma.setAttribute('filter', L);
            a.cumulativeZoomFactor = 1;
            L = X = la = N = ja = null;
          }), null != I ? I : a.isFastZoomEnabled() ? f.wheelZoomDelay : f.lazyZoomDelay);
      }, 0);
    };
  a.lazyZoom = function(I, Y, ia, ka) {
    ka = null != ka ? ka : this.zoomFactor;
    (Y = Y || !a.scrollbars) && (la = new mxPoint(a.container.offsetLeft + a.container.clientWidth / 2, a.container.offsetTop + a.container.clientHeight / 2));
    I ? 0.15 >= this.view.scale * this.cumulativeZoomFactor ? this.cumulativeZoomFactor *= (this.view.scale + 0.05) / this.view.scale : (this.cumulativeZoomFactor *= ka, this.cumulativeZoomFactor = Math.round(this.view.scale * this.cumulativeZoomFactor * 100) / 100 / this.view.scale) : 0.15 >= this.view.scale * this.cumulativeZoomFactor ? this.cumulativeZoomFactor *= (this.view.scale - 0.05) / this.view.scale : (this.cumulativeZoomFactor /= ka, this.cumulativeZoomFactor = Math.round(this.view.scale * this.cumulativeZoomFactor * 100) / 100 / this.view.scale);
    this.cumulativeZoomFactor = Math.max(0.05, Math.min(this.view.scale * this.cumulativeZoomFactor, 160)) / this.view.scale;
    a.isFastZoomEnabled() && (null == L && '' != ma.getAttribute('filter') && (L = ma.getAttribute('filter'), ma.removeAttribute('filter')), N = new mxPoint(a.container.scrollLeft, a.container.scrollTop), I = Y || null == la ? a.container.scrollLeft + a.container.clientWidth / 2 : la.x + a.container.scrollLeft - a.container.offsetLeft, ka = Y || null == la ? a.container.scrollTop + a.container.clientHeight / 2 : la.y + a.container.scrollTop - a.container.offsetTop, ma.style.transformOrigin = I + 'px ' + ka + 'px', ma.style.transform = 'scale(' + this.cumulativeZoomFactor + ')', Z.style.transformOrigin = I + 'px ' + ka + 'px', Z.style.transform = 'scale(' + this.cumulativeZoomFactor + ')', null != a.view.backgroundPageShape && null != a.view.backgroundPageShape.node && (I = a.view.backgroundPageShape.node, mxUtils.setPrefixedStyle(I.style, 'transform-origin', (Y || null == la ? a.container.clientWidth / 2 + a.container.scrollLeft - I.offsetLeft + 'px' : la.x + a.container.scrollLeft - I.offsetLeft - a.container.offsetLeft + 'px') + ' ' + (Y || null == la ? a.container.clientHeight / 2 + a.container.scrollTop - I.offsetTop + 'px' : la.y + a.container.scrollTop - I.offsetTop - a.container.offsetTop + 'px')), mxUtils.setPrefixedStyle(I.style, 'transform', 'scale(' + this.cumulativeZoomFactor + ')')), a.view.getDecoratorPane().style.opacity = '0', a.view.getOverlayPane().style.opacity = '0', null != f.hoverIcons && f.hoverIcons.reset());
    S(a.isFastZoomEnabled() ? ia : 0);
  };
  mxEvent.addGestureListeners(a.container, function(I) {
    null != ja && window.clearTimeout(ja);
  }, null, function(I) {
    1 != a.cumulativeZoomFactor && S(0);
  });
  mxEvent.addListener(a.container, 'scroll', function(I) {
    null == ja || a.isMouseDown || 1 == a.cumulativeZoomFactor || S(0);
  });
  mxEvent.addMouseWheelListener(mxUtils.bind(this, function(I, Y, ia, ka, U) {
    a.fireEvent(new mxEventObject('wheel'));
    if (null == this.dialogs || 0 == this.dialogs.length)
      if (!a.scrollbars && !ia && a.isScrollWheelEvent(I))
        ia = a.view.getTranslate(), ka = 40 / a.view.scale, mxEvent.isShiftDown(I) ? a.view.setTranslate(ia.x + (Y ? -ka : ka), ia.y) : a.view.setTranslate(ia.x, ia.y + (Y ? ka : -ka));
      else if (ia || a.isZoomWheelEvent(I))
      for (var ca = mxEvent.getSource(I); null != ca;) {
        if (ca == a.container)
          return a.tooltipHandler.hideTooltip(), la = null != ka && null != U ? new mxPoint(ka, U) : new mxPoint(mxEvent.getClientX(I), mxEvent.getClientY(I)), X = ia, ia = a.zoomFactor, ka = null, I.ctrlKey && null != I.deltaY && 40 > Math.abs(I.deltaY) && Math.round(I.deltaY) != I.deltaY ? ia = 1 + Math.abs(I.deltaY) / 20 * (ia - 1) : null != I.movementY && 'pointermove' == I.type && (ia = 1 + Math.max(1, Math.abs(I.movementY)) / 20 * (ia - 1), ka = -1), a.lazyZoom(Y, null, ka, ia), mxEvent.consume(I), !1;
        ca = ca.parentNode;
      }
  }), a.container);
  a.panningHandler.zoomGraph = function(I) {
    a.cumulativeZoomFactor = I.scale;
    a.lazyZoom(0 < I.scale, !0);
    mxEvent.consume(I);
  };
};
EditorUi.prototype.addChromelessToolbarItems = function(a) {
  a(mxUtils.bind(this, function(b) {
    this.actions.get('print').funct();
    mxEvent.consume(b);
  }), Editor.printImage, mxResources.get('print'));
};
EditorUi.prototype.isPagesEnabled = function() {
  return this.editor.editable || '1' != urlParams['hide-pages'];
};
EditorUi.prototype.createTemporaryGraph = function(a) {
  return Graph.createOffscreenGraph(a);
};
EditorUi.prototype.addChromelessClickHandler = function() {
  var a = urlParams.highlight;
  null != a && 0 < a.length && (a = '#' + a);
  this.editor.graph.addClickHandler(a);
};
EditorUi.prototype.toggleFormatPanel = function(a) {
  a = null != a ? a : 0 == this.formatWidth;
  null != this.format && (this.formatWidth = a ? 240 : 0, this.formatContainer.style.width = this.formatWidth + 'px', this.refresh(), this.format.refresh(), this.fireEvent(new mxEventObject('formatWidthChanged')));
};
EditorUi.prototype.isFormatPanelVisible = function() {
  return 0 < this.formatWidth;
};
EditorUi.prototype.lightboxFit = function(a) {
  if (this.isDiagramEmpty())
    this.editor.graph.view.setScale(1);
  else {
    var b = urlParams.border,
      f = 60;
    null != b && (f = parseInt(b));
    this.editor.graph.maxFitScale = this.lightboxMaxFitScale;
    this.editor.graph.fit(f, null, null, null, null, null, a);
    this.editor.graph.maxFitScale = null;
  }
};
EditorUi.prototype.isDiagramEmpty = function() {
  var a = this.editor.graph.getModel();
  return 1 == a.getChildCount(a.root) && 0 == a.getChildCount(a.getChildAt(a.root, 0));
};
EditorUi.prototype.isSelectionAllowed = function(a) {
  return 'SELECT' == mxEvent.getSource(a).nodeName || 'INPUT' == mxEvent.getSource(a).nodeName && mxUtils.isAncestorNode(this.formatContainer, mxEvent.getSource(a));
};
EditorUi.prototype.addBeforeUnloadListener = function() {
  window.onbeforeunload = mxUtils.bind(this, function() {
    if (!this.editor.isChromelessView())
      return this.onBeforeUnload();
  });
};
EditorUi.prototype.onBeforeUnload = function() {
  if (this.editor.modified)
    return mxResources.get('allChangesLost');
};
EditorUi.prototype.open = function() {
  try {
    null != window.opener && null != window.opener.openFile && window.opener.openFile.setConsumer(mxUtils.bind(this, function(a, b) {
      try {
        var f = mxUtils.parseXml(a);
        this.editor.setGraphXml(f.documentElement);
        this.editor.setModified(!1);
        this.editor.undoManager.clear();
        null != b && (this.editor.setFilename(b), this.updateDocumentTitle());
      } catch (e) {
        mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
      }
    }));
  } catch (a) {}
  this.editor.graph.view.validate();
  this.editor.graph.sizeDidChange();
  this.editor.fireEvent(new mxEventObject('resetGraphView'));
};
EditorUi.prototype.showPopupMenu = function(a, b, f, e) {
  this.editor.graph.popupMenuHandler.hideMenu();
  var g = new mxPopupMenu(a);
  g.div.className += ' geMenubarMenu';
  g.smartSeparators = !0;
  g.showDisabled = !0;
  g.autoExpand = !0;
  g.hideMenu = mxUtils.bind(this, function() {
    mxPopupMenu.prototype.hideMenu.apply(g, arguments);
    g.destroy();
  });
  g.popup(b, f, null, e);
  this.setCurrentMenu(g);
};
EditorUi.prototype.setCurrentMenu = function(a, b) {
  this.currentMenuElt = b;
  this.currentMenu = a;
  this.hideShapePicker();
};
EditorUi.prototype.resetCurrentMenu = function() {
  this.currentMenu = this.currentMenuElt = null;
};
EditorUi.prototype.hideCurrentMenu = function() {
  null != this.currentMenu && (this.currentMenu.hideMenu(), this.resetCurrentMenu());
};
EditorUi.prototype.updateDocumentTitle = function() {
  var a = this.editor.getOrCreateFilename();
  null != this.editor.appName && (a += ' - ' + this.editor.appName);
  document.title = a;
};
EditorUi.prototype.createHoverIcons = function() {
  return new HoverIcons(this.editor.graph);
};
EditorUi.prototype.redo = function() {
  try {
    this.editor.graph.isEditing() ? document.execCommand('redo', !1, null) : this.editor.undoManager.redo();
  } catch (a) {}
};
EditorUi.prototype.undo = function() {
  try {
    var a = this.editor.graph;
    if (a.isEditing()) {
      var b = a.cellEditor.textarea.innerHTML;
      document.execCommand('undo', !1, null);
      b == a.cellEditor.textarea.innerHTML && (a.stopEditing(!0), this.editor.undoManager.undo());
    } else
      this.editor.undoManager.undo();
  } catch (f) {}
};
EditorUi.prototype.canRedo = function() {
  return this.editor.graph.isEditing() || this.editor.undoManager.canRedo();
};
EditorUi.prototype.canUndo = function() {
  return this.editor.graph.isEditing() || this.editor.undoManager.canUndo();
};
EditorUi.prototype.getEditBlankXml = function() {
  return mxUtils.getXml(this.editor.getGraphXml());
};
EditorUi.prototype.getUrl = function(a) {
  a = null != a ? a : window.location.pathname;
  var b = 0 < a.indexOf('?') ? 1 : 0,
    f;
  for (f in urlParams)
    a = 0 == b ? a + '?' : a + '&', a += f + '=' + urlParams[f], b++;
  return a;
};
EditorUi.prototype.setScrollbars = function(a) {
  var b = this.editor.graph,
    f = b.container.style.overflow;
  b.scrollbars = a;
  this.editor.updateGraphComponents();
  f != b.container.style.overflow && (b.container.scrollTop = 0, b.container.scrollLeft = 0, b.view.scaleAndTranslate(1, 0, 0), this.resetScrollbars());
  this.fireEvent(new mxEventObject('scrollbarsChanged'));
};
EditorUi.prototype.hasScrollbars = function() {
  return this.editor.graph.scrollbars;
};
EditorUi.prototype.resetScrollbars = function() {
  var a = this.editor.graph;
  if (!this.editor.extendCanvas)
    a.container.scrollTop = 0, a.container.scrollLeft = 0, mxUtils.hasScrollbars(a.container) || a.view.setTranslate(0, 0);
  else if (!this.editor.isChromelessView())
    if (mxUtils.hasScrollbars(a.container))
      if (a.pageVisible) {
        var b = a.getPagePadding();
        a.container.scrollTop = Math.floor(b.y - this.editor.initialTopSpacing) - 1;
        a.container.scrollLeft = Math.floor(Math.min(b.x, (a.container.scrollWidth - a.container.clientWidth) / 2)) - 1;
        b = a.getGraphBounds();
        0 < b.width && 0 < b.height && (b.x > a.container.scrollLeft + 0.9 * a.container.clientWidth && (a.container.scrollLeft = Math.min(b.x + b.width - a.container.clientWidth, b.x - 10)), b.y > a.container.scrollTop + 0.9 * a.container.clientHeight && (a.container.scrollTop = Math.min(b.y + b.height - a.container.clientHeight, b.y - 10)));
      } else {
        b = a.getGraphBounds();
        var f = Math.max(b.width, a.scrollTileSize.width * a.view.scale);
        a.container.scrollTop = Math.floor(Math.max(0, b.y - Math.max(20, (a.container.clientHeight - Math.max(b.height, a.scrollTileSize.height * a.view.scale)) / 4)));
        a.container.scrollLeft = Math.floor(Math.max(0, b.x - Math.max(0, (a.container.clientWidth - f) / 2)));
      }
  else {
    b = mxRectangle.fromRectangle(a.pageVisible ? a.view.getBackgroundPageBounds() : a.getGraphBounds());
    f = a.view.translate;
    var e = a.view.scale;
    b.x = b.x / e - f.x;
    b.y = b.y / e - f.y;
    b.width /= e;
    b.height /= e;
    a.view.setTranslate(Math.floor(Math.max(0, (a.container.clientWidth - b.width) / 2) - b.x + 2), Math.floor((a.pageVisible ? 0 : Math.max(0, (a.container.clientHeight - b.height) / 4)) - b.y + 1));
  }
};
EditorUi.prototype.setPageVisible = function(a) {
  var b = this.editor.graph,
    f = mxUtils.hasScrollbars(b.container),
    e = 0,
    g = 0;
  f && (e = b.view.translate.x * b.view.scale - b.container.scrollLeft, g = b.view.translate.y * b.view.scale - b.container.scrollTop);
  b.pageVisible = a;
  b.pageBreaksVisible = a;
  b.preferPageSize = a;
  b.view.validateBackground();
  if (f) {
    var d = b.getSelectionCells();
    b.clearSelection();
    b.setSelectionCells(d);
  }
  b.sizeDidChange();
  f && (b.container.scrollLeft = b.view.translate.x * b.view.scale - e, b.container.scrollTop = b.view.translate.y * b.view.scale - g);
  b.defaultPageVisible = a;
  this.fireEvent(new mxEventObject('pageViewChanged'));
};
EditorUi.prototype.installResizeHandler = function(a, b, f) {
  b && (a.window.setSize = function(g, d) {
    if (!this.minimized) {
      var h = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
      g = Math.min(g, (window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth) - this.getX());
      d = Math.min(d, h - this.getY());
    }
    mxWindow.prototype.setSize.apply(this, arguments);
  });
  a.window.setLocation = function(g, d) {
    var h = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,
      n = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight,
      u = parseInt(this.div.style.width),
      m = parseInt(this.div.style.height);
    g = Math.max(0, Math.min(g, h - u));
    d = Math.max(0, Math.min(d, n - m));
    this.getX() == g && this.getY() == d || mxWindow.prototype.setLocation.apply(this, arguments);
    b && !this.minimized && this.setSize(u, m);
  };
  var e = mxUtils.bind(this, function() {
    var g = a.window.getX(),
      d = a.window.getY();
    a.window.setLocation(g, d);
  });
  mxEvent.addListener(window, 'resize', e);
  a.destroy = function() {
    mxEvent.removeListener(window, 'resize', e);
    a.window.destroy();
    null != f && f();
  };
};