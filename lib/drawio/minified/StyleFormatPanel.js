StyleFormatPanel = function(a, b, f) {
  BaseFormatPanel.call(this, a, b, f);
  this.init();
};
mxUtils.extend(StyleFormatPanel, BaseFormatPanel);
StyleFormatPanel.prototype.defaultStrokeColor = 'black';
StyleFormatPanel.prototype.init = function() {
  var a = this.editorUi.getSelectionState();
  if (!a.containsLabel && 0 < a.cells.length) {
    a.containsImage && 1 == a.vertices.length && 'image' == a.style.shape && null != a.style.image && 'data:image/svg+xml;' == a.style.image.substring(0, 19) && this.container.appendChild(this.addSvgStyles(this.createPanel()));
    a.fill && this.container.appendChild(this.addFill(this.createPanel()));
    this.container.appendChild(this.addStroke(this.createPanel()));
    this.container.appendChild(this.addLineJumps(this.createPanel()));
    var b = this.createRelativeOption(mxResources.get('opacity'), mxConstants.STYLE_OPACITY);
    b.style.paddingTop = '8px';
    b.style.paddingBottom = '8px';
    this.container.appendChild(b);
    this.container.appendChild(this.addEffects(this.createPanel()));
  }
  1 == a.cells.length && (a = this.addEditOps(this.createPanel()), null != a.firstChild && mxUtils.br(a), this.container.appendChild(this.addStyleOps(a)));
};
StyleFormatPanel.prototype.getCssRules = function(a) {
  var b = document.implementation.createHTMLDocument(''),
    f = document.createElement('style');
  mxUtils.setTextContent(f, a);
  b.body.appendChild(f);
  return f.sheet.cssRules;
};
StyleFormatPanel.prototype.addSvgStyles = function(a) {
  var b = this.editorUi.getSelectionState();
  a.style.paddingTop = '6px';
  a.style.paddingBottom = '6px';
  a.style.fontWeight = 'bold';
  a.style.display = 'none';
  try {
    var f = b.style.editableCssRules;
    if (null != f) {
      var e = new RegExp(f),
        g = b.style.image.substring(b.style.image.indexOf(',') + 1),
        d = window.atob ? atob(g) : Base64.decode(g, !0),
        h = mxUtils.parseXml(d);
      if (null != h) {
        var n = h.getElementsByTagName('style');
        for (b = 0; b < n.length; b++) {
          var u = this.getCssRules(mxUtils.getTextContent(n[b]));
          for (f = 0; f < u.length; f++)
            this.addSvgRule(a, u[f], h, n[b], u, f, e);
        }
      }
    }
  } catch (m) {}
  return a;
};
StyleFormatPanel.prototype.addSvgRule = function(a, b, f, e, g, d, h) {
  var n = this.editorUi,
    u = n.editor.graph;
  h.test(b.selectorText) && (h = mxUtils.bind(this, function(m, p, x) {
    var A = mxUtils.trim(m.style[p]);
    '' != A && 'url(' != A.substring(0, 4) && (m = this.createColorOption(x + ' ' + m.selectorText, function() {
      var C = A;
      return (C = C.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === C.length ? '#' + ('0' + parseInt(C[1], 10).toString(16)).slice(-2) + ('0' + parseInt(C[2], 10).toString(16)).slice(-2) + ('0' + parseInt(C[3], 10).toString(16)).slice(-2) : '';
    }, mxUtils.bind(this, function(C) {
      g[d].style[p] = C;
      C = '';
      for (var D = 0; D < g.length; D++)
        C += g[D].cssText + ' ';
      e.textContent = C;
      C = mxUtils.getXml(f.documentElement);
      u.setCellStyles(mxConstants.STYLE_IMAGE, 'data:image/svg+xml,' + (window.btoa ? btoa(C) : Base64.encode(C, !0)), n.getSelectionState().cells);
    }), '#ffffff', {
      install: function(C) {},
      destroy: function() {}
    }), a.appendChild(m), a.style.display = '');
  }), h(b, 'fill', mxResources.get('fill')), h(b, 'stroke', mxResources.get('line')), h(b, 'stop-color', mxResources.get('gradient')));
};
StyleFormatPanel.prototype.addEditOps = function(a) {
  var b = this.editorUi.getSelectionState();
  if (1 == b.cells.length) {
    var f = document.createElement('select');
    f.style.width = '210px';
    f.style.textAlign = 'center';
    f.style.marginBottom = '2px';
    for (var e = 'edit editLink editShape editImage editData copyData pasteData editConnectionPoints editGeometry editTooltip editStyle'.split(' '), g = 0; g < e.length; g++) {
      var d = this.editorUi.actions.get(e[g]);
      if (null == d || d.enabled) {
        var h = document.createElement('option');
        h.setAttribute('value', e[g]);
        var n = mxResources.get(e[g]);
        mxUtils.write(h, n + ('edit' == e[g] ? '' : '...'));
        null != d && null != d.shortcut && (n += ' (' + d.shortcut + ')');
        h.setAttribute('title', n);
        f.appendChild(h);
      }
    }
    1 < f.children.length && (a.appendChild(f), mxEvent.addListener(f, 'change', mxUtils.bind(this, function(u) {
      u = this.editorUi.actions.get(f.value);
      f.value = 'edit';
      null != u && u.funct();
    })), b.image && 0 < b.cells.length && (b = this.editorUi.editor.graph, b = b.view.getState(b.getSelectionCell()), null != b && null != mxUtils.getValue(b.style, mxConstants.STYLE_IMAGE, null) && (b = mxUtils.button(mxResources.get('crop') + '...', mxUtils.bind(this, function(u) {
      this.editorUi.actions.get('crop').funct();
    })), b.setAttribute('title', mxResources.get('crop')), f.style.width = '104px', b.style.width = '104px', b.style.marginLeft = '2px', b.style.marginBottom = '2px', a.appendChild(b))));
  }
  return a;
};
StyleFormatPanel.prototype.addFill = function(a) {
  function b() {
    h.innerHTML = '';
    C = 1;
    for (var G = 0; G < Editor.fillStyles.length; G++) {
      var F = document.createElement('option');
      F.setAttribute('value', Editor.fillStyles[G].val);
      mxUtils.write(F, Editor.fillStyles[G].dispName);
      h.appendChild(F);
    }
  }
  var f = this.editorUi,
    e = f.editor.graph,
    g = f.getSelectionState();
  a.style.paddingTop = '6px';
  a.style.paddingBottom = '6px';
  var d = document.createElement('select');
  d.style.position = 'absolute';
  d.style.left = '104px';
  d.style.width = '70px';
  d.style.height = '22px';
  d.style.padding = '0px';
  d.style.marginTop = '-3px';
  d.style.borderWidth = '1px';
  d.style.borderStyle = 'solid';
  d.style.boxSizing = 'border-box';
  var h = d.cloneNode(!1);
  mxEvent.addListener(d, 'click', function(G) {
    mxEvent.consume(G);
  });
  mxEvent.addListener(h, 'click', function(G) {
    mxEvent.consume(G);
  });
  var n = this.createCellColorOption(mxResources.get('gradient'), mxConstants.STYLE_GRADIENTCOLOR, 'default', function(G) {
      d.style.display = null == G || G == mxConstants.NONE ? 'none' : '';
    }, function(G) {
      e.updateCellStyles({
        gradientColor: G
      }, e.getSelectionCells());
    }, e.getDefaultColor(g.style, mxConstants.STYLE_GRADIENTCOLOR, e.shapeForegroundColor, e.shapeBackgroundColor)),
    u = 'image' == g.style.shape ? mxConstants.STYLE_IMAGE_BACKGROUND : mxConstants.STYLE_FILLCOLOR,
    m = this.createCellColorOption(mxResources.get('fill'), u, 'default', null, mxUtils.bind(this, function(G) {
      e.setCellStyles(u, G, g.cells);
    }), e.getDefaultColor(g.style, u, e.shapeBackgroundColor, e.shapeForegroundColor));
  m.style.fontWeight = 'bold';
  var p = mxUtils.getValue(g.style, u, null);
  n.style.display = null != p && p != mxConstants.NONE && g.fill && 'image' != g.style.shape ? '' : 'none';
  var x = [
    mxConstants.DIRECTION_NORTH,
    mxConstants.DIRECTION_EAST,
    mxConstants.DIRECTION_SOUTH,
    mxConstants.DIRECTION_WEST,
    mxConstants.DIRECTION_RADIAL
  ];
  for (p = 0; p < x.length; p++) {
    var A = document.createElement('option');
    A.setAttribute('value', x[p]);
    mxUtils.write(A, mxResources.get(x[p]));
    d.appendChild(A);
  }
  n.appendChild(d);
  var C;
  b();
  m.appendChild(h);
  var D = mxUtils.bind(this, function() {
    g = f.getSelectionState();
    var G = mxUtils.getValue(g.style, mxConstants.STYLE_GRADIENT_DIRECTION, mxConstants.DIRECTION_SOUTH),
      F = mxUtils.getValue(g.style, 'fillStyle', 'auto');
    '' == G && (G = mxConstants.DIRECTION_SOUTH);
    d.value = G;
    a.style.display = g.fill ? '' : 'none';
    G = mxUtils.getValue(g.style, u, null);
    if (g.fill && null != G && G != mxConstants.NONE && 'filledEdge' != g.style.shape) {
      if ('1' == g.style.sketch) {
        if (2 != C) {
          h.innerHTML = '';
          C = 2;
          for (G = 0; G < Editor.roughFillStyles.length; G++) {
            var K = document.createElement('option');
            K.setAttribute('value', Editor.roughFillStyles[G].val);
            mxUtils.write(K, Editor.roughFillStyles[G].dispName);
            h.appendChild(K);
          }
          h.value = 'auto';
        }
      } else
        1 != C && b();
      h.value = F;
      h.value || (F = 'auto', h.value = F);
      h.style.display = '1' == g.style.sketch || 'none' == d.style.display ? '' : 'none';
      n.style.display = g.containsImage || '1' == g.style.sketch && 'solid' != F && 'auto' != F ? 'none' : '';
    } else
      h.style.display = 'none', n.style.display = 'none';
  });
  e.getModel().addListener(mxEvent.CHANGE, D);
  this.listeners.push({
    destroy: function() {
      e.getModel().removeListener(D);
    }
  });
  D();
  mxEvent.addListener(d, 'change', function(G) {
    e.setCellStyles(mxConstants.STYLE_GRADIENT_DIRECTION, d.value, g.cells);
    f.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_GRADIENT_DIRECTION], 'values', [d.value], 'cells', g.cells));
    mxEvent.consume(G);
  });
  mxEvent.addListener(h, 'change', function(G) {
    e.setCellStyles('fillStyle', h.value, g.cells);
    f.fireEvent(new mxEventObject('styleChanged', 'keys', ['fillStyle'], 'values', [h.value], 'cells', g.cells));
    mxEvent.consume(G);
  });
  a.appendChild(m);
  a.appendChild(n);
  m = this.getCustomColors();
  for (p = 0; p < m.length; p++)
    a.appendChild(this.createCellColorOption(m[p].title, m[p].key, m[p].defaultValue));
  return a;
};
StyleFormatPanel.prototype.getCustomColors = function() {
  var a = [];
  this.editorUi.getSelectionState().swimlane && a.push({
    title: mxResources.get('laneColor'),
    key: 'swimlaneFillColor',
    defaultValue: 'default'
  });
  return a;
};
StyleFormatPanel.prototype.addStroke = function(a) {
  function b(U) {
    var ca = parseFloat(F.value);
    ca = Math.min(999, Math.max(0, isNaN(ca) ? 1 : ca));
    ca != mxUtils.getValue(d.style, mxConstants.STYLE_STROKEWIDTH, 1) && (g.setCellStyles(mxConstants.STYLE_STROKEWIDTH, ca, d.cells), e.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_STROKEWIDTH], 'values', [ca], 'cells', d.cells)));
    F.value = ca + ' pt';
    mxEvent.consume(U);
  }

  function f(U) {
    var ca = parseFloat(K.value);
    ca = Math.min(999, Math.max(0, isNaN(ca) ? 1 : ca));
    ca != mxUtils.getValue(d.style, mxConstants.STYLE_STROKEWIDTH, 1) && (g.setCellStyles(mxConstants.STYLE_STROKEWIDTH, ca, d.cells), e.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_STROKEWIDTH], 'values', [ca], 'cells', d.cells)));
    K.value = ca + ' pt';
    mxEvent.consume(U);
  }
  var e = this.editorUi,
    g = e.editor.graph,
    d = e.getSelectionState();
  a.style.paddingTop = '6px';
  a.style.paddingBottom = '4px';
  a.style.whiteSpace = 'normal';
  var h = document.createElement('div');
  h.style.fontWeight = 'bold';
  d.stroke || (h.style.display = 'none');
  var n = document.createElement('select');
  n.style.position = 'absolute';
  n.style.height = '22px';
  n.style.padding = '0px';
  n.style.marginTop = '-3px';
  n.style.boxSizing = 'border-box';
  n.style.left = '94px';
  n.style.width = '80px';
  n.style.borderWidth = '1px';
  n.style.borderStyle = 'solid';
  for (var u = [
      'sharp',
      'rounded',
      'curved'
    ], m = 0; m < u.length; m++) {
    var p = document.createElement('option');
    p.setAttribute('value', u[m]);
    mxUtils.write(p, mxResources.get(u[m]));
    n.appendChild(p);
  }
  mxEvent.addListener(n, 'change', function(U) {
    g.getModel().beginUpdate();
    try {
      var ca = [
          mxConstants.STYLE_ROUNDED,
          mxConstants.STYLE_CURVED
        ],
        ra = [
          '0',
          null
        ];
      'rounded' == n.value ? ra = [
        '1',
        null
      ] : 'curved' == n.value && (ra = [
        null,
        '1'
      ]);
      for (var ua = 0; ua < ca.length; ua++)
        g.setCellStyles(ca[ua], ra[ua], d.cells);
      e.fireEvent(new mxEventObject('styleChanged', 'keys', ca, 'values', ra, 'cells', d.cells));
    } finally {
      g.getModel().endUpdate();
    }
    mxEvent.consume(U);
  });
  mxEvent.addListener(n, 'click', function(U) {
    mxEvent.consume(U);
  });
  var x = 'image' == d.style.shape ? mxConstants.STYLE_IMAGE_BORDER : mxConstants.STYLE_STROKECOLOR;
  u = 'image' == d.style.shape ? mxResources.get('border') : mxResources.get('line');
  u = this.createCellColorOption(u, x, 'default', null, mxUtils.bind(this, function(U) {
    g.setCellStyles(x, U, d.cells);
  }), g.shapeForegroundColor);
  u.appendChild(n);
  h.appendChild(u);
  var A = h.cloneNode(!1);
  A.style.fontWeight = 'normal';
  A.style.whiteSpace = 'nowrap';
  A.style.position = 'relative';
  A.style.paddingLeft = '0px';
  A.style.marginBottom = '2px';
  A.style.overflow = 'hidden';
  A.style.marginTop = '2px';
  A.style.width = '220px';
  A.className = 'geToolbarContainer';
  var C = mxUtils.bind(this, function(U, ca, ra, ua, Ga) {
    U = this.editorUi.menus.styleChange(U, '', ua, Ga, 'geIcon', null);
    ua = document.createElement('div');
    ua.style.width = ca + 'px';
    ua.style.height = '1px';
    ua.style.borderBottom = '1px ' + ra + ' ' + this.defaultStrokeColor;
    ua.style.paddingTop = '6px';
    U.firstChild.firstChild.style.padding = '0px 4px 0px 4px';
    U.firstChild.firstChild.style.width = ca + 'px';
    U.firstChild.firstChild.appendChild(ua);
    return U;
  });
  m = this.editorUi.toolbar.addMenuFunctionInContainer(A, 'geSprite-orthogonal', mxResources.get('pattern'), !1, mxUtils.bind(this, function(U) {
    C(U, 75, 'solid', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      null,
      null
    ]).setAttribute('title', mxResources.get('solid'));
    C(U, 75, 'dashed', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      '1',
      null
    ]).setAttribute('title', mxResources.get('dashed'));
    C(U, 75, 'dotted', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      '1',
      '1 1'
    ]).setAttribute('title', mxResources.get('dotted') + ' (1)');
    C(U, 75, 'dotted', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      '1',
      '1 2'
    ]).setAttribute('title', mxResources.get('dotted') + ' (2)');
    C(U, 75, 'dotted', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      '1',
      '1 4'
    ]).setAttribute('title', mxResources.get('dotted') + ' (3)');
  }));
  var D = A.cloneNode(!1),
    G = this.editorUi.toolbar.addMenuFunctionInContainer(D, 'geSprite-connection', mxResources.get('connection'), !1, mxUtils.bind(this, function(U) {
      this.editorUi.menus.styleChange(U, '', [
        mxConstants.STYLE_SHAPE,
        mxConstants.STYLE_STARTSIZE,
        mxConstants.STYLE_ENDSIZE,
        'width'
      ], [
        null,
        null,
        null,
        null
      ], 'geIcon geSprite geSprite-connection', null, !0).setAttribute('title', mxResources.get('line'));
      this.editorUi.menus.styleChange(U, '', [
        mxConstants.STYLE_SHAPE,
        mxConstants.STYLE_STARTSIZE,
        mxConstants.STYLE_ENDSIZE,
        'width'
      ], [
        'link',
        null,
        null,
        null
      ], 'geIcon geSprite geSprite-linkedge', null, !0).setAttribute('title', mxResources.get('link'));
      this.editorUi.menus.styleChange(U, '', [
        mxConstants.STYLE_SHAPE,
        mxConstants.STYLE_STARTSIZE,
        mxConstants.STYLE_ENDSIZE,
        'width'
      ], [
        'flexArrow',
        null,
        null,
        null
      ], 'geIcon geSprite geSprite-arrow', null, !0).setAttribute('title', mxResources.get('arrow'));
      this.editorUi.menus.styleChange(U, '', [
        mxConstants.STYLE_SHAPE,
        mxConstants.STYLE_STARTSIZE,
        mxConstants.STYLE_ENDSIZE,
        'width'
      ], [
        'arrow',
        null,
        null,
        null
      ], 'geIcon geSprite geSprite-simplearrow', null, !0).setAttribute('title', mxResources.get('simpleArrow'));
    }));
  p = this.editorUi.toolbar.addMenuFunctionInContainer(D, 'geSprite-orthogonal', mxResources.get('pattern'), !1, mxUtils.bind(this, function(U) {
    C(U, 33, 'solid', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      null,
      null
    ]).setAttribute('title', mxResources.get('solid'));
    C(U, 33, 'dashed', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      '1',
      null
    ]).setAttribute('title', mxResources.get('dashed'));
    C(U, 33, 'dotted', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      '1',
      '1 1'
    ]).setAttribute('title', mxResources.get('dotted') + ' (1)');
    C(U, 33, 'dotted', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      '1',
      '1 2'
    ]).setAttribute('title', mxResources.get('dotted') + ' (2)');
    C(U, 33, 'dotted', [
      mxConstants.STYLE_DASHED,
      mxConstants.STYLE_DASH_PATTERN
    ], [
      '1',
      '1 4'
    ]).setAttribute('title', mxResources.get('dotted') + ' (3)');
  }));
  u = A.cloneNode(!1);
  var F = document.createElement('input');
  F.style.position = 'absolute';
  F.style.textAlign = 'right';
  F.style.marginTop = '2px';
  F.style.width = '52px';
  F.style.height = '21px';
  F.style.left = '146px';
  F.style.borderWidth = '1px';
  F.style.borderStyle = 'solid';
  F.style.boxSizing = 'border-box';
  F.setAttribute('title', mxResources.get('linewidth'));
  A.appendChild(F);
  var K = F.cloneNode(!0);
  D.appendChild(K);
  var P = this.createStepper(F, b, 1, 9);
  P.style.display = F.style.display;
  P.style.marginTop = '2px';
  P.style.left = '198px';
  A.appendChild(P);
  P = this.createStepper(K, f, 1, 9);
  P.style.display = K.style.display;
  P.style.marginTop = '2px';
  K.style.position = 'absolute';
  P.style.left = '198px';
  D.appendChild(P);
  mxEvent.addListener(F, 'blur', b);
  mxEvent.addListener(F, 'change', b);
  mxEvent.addListener(K, 'blur', f);
  mxEvent.addListener(K, 'change', f);
  var R = this.editorUi.toolbar.addMenuFunctionInContainer(u, 'geSprite-orthogonal', mxResources.get('waypoints'), !1, mxUtils.bind(this, function(U) {
      'arrow' != d.style.shape && (this.editorUi.menus.edgeStyleChange(U, '', [
        mxConstants.STYLE_EDGE,
        mxConstants.STYLE_CURVED,
        mxConstants.STYLE_NOEDGESTYLE
      ], [
        null,
        null,
        null
      ], 'geIcon geSprite geSprite-straight', null, !0).setAttribute('title', mxResources.get('straight')), this.editorUi.menus.edgeStyleChange(U, '', [
        mxConstants.STYLE_EDGE,
        mxConstants.STYLE_CURVED,
        mxConstants.STYLE_NOEDGESTYLE
      ], [
        'orthogonalEdgeStyle',
        null,
        null
      ], 'geIcon geSprite geSprite-orthogonal', null, !0).setAttribute('title', mxResources.get('orthogonal')), this.editorUi.menus.edgeStyleChange(U, '', [
        mxConstants.STYLE_EDGE,
        mxConstants.STYLE_ELBOW,
        mxConstants.STYLE_CURVED,
        mxConstants.STYLE_NOEDGESTYLE
      ], [
        'elbowEdgeStyle',
        null,
        null,
        null
      ], 'geIcon geSprite geSprite-horizontalelbow', null, !0).setAttribute('title', mxResources.get('simple')), this.editorUi.menus.edgeStyleChange(U, '', [
        mxConstants.STYLE_EDGE,
        mxConstants.STYLE_ELBOW,
        mxConstants.STYLE_CURVED,
        mxConstants.STYLE_NOEDGESTYLE
      ], [
        'elbowEdgeStyle',
        'vertical',
        null,
        null
      ], 'geIcon geSprite geSprite-verticalelbow', null, !0).setAttribute('title', mxResources.get('simple')), this.editorUi.menus.edgeStyleChange(U, '', [
        mxConstants.STYLE_EDGE,
        mxConstants.STYLE_ELBOW,
        mxConstants.STYLE_CURVED,
        mxConstants.STYLE_NOEDGESTYLE
      ], [
        'isometricEdgeStyle',
        null,
        null,
        null
      ], 'geIcon geSprite geSprite-horizontalisometric', null, !0).setAttribute('title', mxResources.get('isometric')), this.editorUi.menus.edgeStyleChange(U, '', [
        mxConstants.STYLE_EDGE,
        mxConstants.STYLE_ELBOW,
        mxConstants.STYLE_CURVED,
        mxConstants.STYLE_NOEDGESTYLE
      ], [
        'isometricEdgeStyle',
        'vertical',
        null,
        null
      ], 'geIcon geSprite geSprite-verticalisometric', null, !0).setAttribute('title', mxResources.get('isometric')), 'connector' == d.style.shape && this.editorUi.menus.edgeStyleChange(U, '', [
        mxConstants.STYLE_EDGE,
        mxConstants.STYLE_CURVED,
        mxConstants.STYLE_NOEDGESTYLE
      ], [
        'orthogonalEdgeStyle',
        '1',
        null
      ], 'geIcon geSprite geSprite-curved', null, !0).setAttribute('title', mxResources.get('curved')), this.editorUi.menus.edgeStyleChange(U, '', [
        mxConstants.STYLE_EDGE,
        mxConstants.STYLE_CURVED,
        mxConstants.STYLE_NOEDGESTYLE
      ], [
        'entityRelationEdgeStyle',
        null,
        null
      ], 'geIcon geSprite geSprite-entity', null, !0).setAttribute('title', mxResources.get('entityRelation')));
    })),
    Q = this.editorUi.toolbar.addMenuFunctionInContainer(u, 'geSprite-startclassic', mxResources.get('linestart'), !1, mxUtils.bind(this, function(U) {
      if ('connector' == d.style.shape || 'flexArrow' == d.style.shape || 'filledEdge' == d.style.shape) {
        var ca = this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.NONE,
          0
        ], 'geIcon', null, !1);
        ca.setAttribute('title', mxResources.get('none'));
        var ra = document.createElement('font');
        ra.style.fontSize = '10px';
        mxUtils.write(ra, mxResources.get('none'));
        ca.firstChild.firstChild.appendChild(ra);
        'connector' == d.style.shape || 'filledEdge' == d.style.shape ? (Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_CLASSIC,
          1
        ], null, null, !1, Format.classicFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_CLASSIC_THIN,
          1
        ], null, null, !1, Format.classicThinFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_OPEN,
          0
        ], null, null, !1, Format.openFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_OPEN_THIN,
          0
        ], null, null, !1, Format.openThinFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'openAsync',
          0
        ], null, null, !1, Format.openAsyncFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_BLOCK,
          1
        ], null, null, !1, Format.blockFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_BLOCK_THIN,
          1
        ], null, null, !1, Format.blockThinFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'async',
          1
        ], null, null, !1, Format.asyncFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_OVAL,
          1
        ], null, null, !1, Format.ovalFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_DIAMOND,
          1
        ], null, null, !1, Format.diamondFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_DIAMOND_THIN,
          1
        ], null, null, !1, Format.diamondThinFilledMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_CLASSIC,
          0
        ], null, null, !1, Format.classicMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_CLASSIC_THIN,
          0
        ], null, null, !1, Format.classicThinMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_BLOCK,
          0
        ], null, null, !1, Format.blockMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_BLOCK_THIN,
          0
        ], null, null, !1, Format.blockThinMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'async',
          0
        ], null, null, !1, Format.asyncMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_OVAL,
          0
        ], null, null, !1, Format.ovalMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_DIAMOND,
          0
        ], null, null, !1, Format.diamondMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          mxConstants.ARROW_DIAMOND_THIN,
          0
        ], null, null, !1, Format.diamondThinMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'box',
          0
        ], null, null, !1, Format.boxMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'halfCircle',
          0
        ], null, null, !1, Format.halfCircleMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'dash',
          0
        ], null, null, !1, Format.dashMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'cross',
          0
        ], null, null, !1, Format.crossMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'circlePlus',
          0
        ], null, null, !1, Format.circlePlusMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'circle',
          1
        ], null, null, !1, Format.circleMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'baseDash',
          0
        ], null, null, !1, Format.baseDashMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'ERone',
          0
        ], null, null, !1, Format.EROneMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'ERmandOne',
          0
        ], null, null, !1, Format.ERmandOneMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'ERmany',
          0
        ], null, null, !1, Format.ERmanyMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'ERoneToMany',
          0
        ], null, null, !1, Format.ERoneToManyMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'ERzeroToOne',
          0
        ], null, null, !1, Format.ERzeroToOneMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'ERzeroToMany',
          0
        ], null, null, !1, Format.ERzeroToManyMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'doubleBlock',
          0
        ], null, null, !1, Format.doubleBlockMarkerImage.src)), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_STARTARROW,
          'startFill'
        ], [
          'doubleBlock',
          1
        ], null, null, !1, Format.doubleBlockFilledMarkerImage.src))) : this.editorUi.menus.edgeStyleChange(U, '', [mxConstants.STYLE_STARTARROW], [mxConstants.ARROW_BLOCK], 'geIcon geSprite geSprite-startblocktrans', null, !1).setAttribute('title', mxResources.get('block'));
        U.div.style.width = '40px';
        window.setTimeout(mxUtils.bind(this, function() {
          null != U.div && mxUtils.fit(U.div);
        }), 0);
      }
    })),
    ba = this.editorUi.toolbar.addMenuFunctionInContainer(u, 'geSprite-endclassic', mxResources.get('lineend'), !1, mxUtils.bind(this, function(U) {
      if ('connector' == d.style.shape || 'flexArrow' == d.style.shape || 'filledEdge' == d.style.shape) {
        var ca = this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.NONE,
          0
        ], 'geIcon', null, !1);
        ca.setAttribute('title', mxResources.get('none'));
        var ra = document.createElement('font');
        ra.style.fontSize = '10px';
        mxUtils.write(ra, mxResources.get('none'));
        ca.firstChild.firstChild.appendChild(ra);
        'connector' == d.style.shape || 'filledEdge' == d.style.shape ? (Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_CLASSIC,
          1
        ], null, null, !1, Format.classicFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_CLASSIC_THIN,
          1
        ], null, null, !1, Format.classicThinFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_OPEN,
          0
        ], null, null, !1, Format.openFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_OPEN_THIN,
          0
        ], null, null, !1, Format.openThinFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'openAsync',
          0
        ], null, null, !1, Format.openAsyncFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_BLOCK,
          1
        ], null, null, !1, Format.blockFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_BLOCK_THIN,
          1
        ], null, null, !1, Format.blockThinFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'async',
          1
        ], null, null, !1, Format.asyncFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_OVAL,
          1
        ], null, null, !1, Format.ovalFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_DIAMOND,
          1
        ], null, null, !1, Format.diamondFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_DIAMOND_THIN,
          1
        ], null, null, !1, Format.diamondThinFilledMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_CLASSIC,
          0
        ], null, null, !1, Format.classicMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_CLASSIC_THIN,
          0
        ], null, null, !1, Format.classicThinMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_BLOCK,
          0
        ], null, null, !1, Format.blockMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_BLOCK_THIN,
          0
        ], null, null, !1, Format.blockThinMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'async',
          0
        ], null, null, !1, Format.asyncMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_OVAL,
          0
        ], null, null, !1, Format.ovalMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_DIAMOND,
          0
        ], null, null, !1, Format.diamondMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          mxConstants.ARROW_DIAMOND_THIN,
          0
        ], null, null, !1, Format.diamondThinMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'box',
          0
        ], null, null, !1, Format.boxMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'halfCircle',
          0
        ], null, null, !1, Format.halfCircleMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'dash',
          0
        ], null, null, !1, Format.dashMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'cross',
          0
        ], null, null, !1, Format.crossMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'circlePlus',
          0
        ], null, null, !1, Format.circlePlusMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'circle',
          0
        ], null, null, !1, Format.circleMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'baseDash',
          0
        ], null, null, !1, Format.baseDashMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'ERone',
          0
        ], null, null, !1, Format.EROneMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'ERmandOne',
          0
        ], null, null, !1, Format.ERmandOneMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'ERmany',
          0
        ], null, null, !1, Format.ERmanyMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'ERoneToMany',
          0
        ], null, null, !1, Format.ERoneToManyMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'ERzeroToOne',
          0
        ], null, null, !1, Format.ERzeroToOneMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'ERzeroToMany',
          0
        ], null, null, !1, Format.ERzeroToManyMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'doubleBlock',
          0
        ], null, null, !1, Format.doubleBlockMarkerImage.src), 'scaleX(-1)'), Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(U, '', [
          mxConstants.STYLE_ENDARROW,
          'endFill'
        ], [
          'doubleBlock',
          1
        ], null, null, !1, Format.doubleBlockFilledMarkerImage.src), 'scaleX(-1)')) : this.editorUi.menus.edgeStyleChange(U, '', [mxConstants.STYLE_ENDARROW], [mxConstants.ARROW_BLOCK], 'geIcon geSprite geSprite-endblocktrans', null, !1).setAttribute('title', mxResources.get('block'));
        U.div.style.width = '40px';
        window.setTimeout(mxUtils.bind(this, function() {
          null != U.div && mxUtils.fit(U.div);
        }), 0);
      }
    }));
  P = this.addArrow(G, 8);
  P.nextSibling.style.position = 'relative';
  P.nextSibling.style.top = '-2px';
  P = this.addArrow(R, 10);
  P.nextSibling.style.position = 'relative';
  P.nextSibling.style.top = '-3px';
  R.getElementsByTagName('img')[0].style.top = '-1px';
  this.addArrow(Q, null, !0);
  this.addArrow(ba, null, !0);
  P = this.addArrow(m, 9);
  P.className = 'geIcon';
  P.style.width = 'auto';
  var V = this.addArrow(p, 9);
  V.className = 'geIcon';
  V.style.width = '22px';
  var T = document.createElement('div');
  T.style.width = '84px';
  T.style.height = '1px';
  T.style.borderBottom = '1px solid ' + this.defaultStrokeColor;
  T.style.marginBottom = '7px';
  P.appendChild(T);
  var Z = document.createElement('div');
  Z.style.width = '23px';
  Z.style.height = '1px';
  Z.style.borderBottom = '1px solid ' + this.defaultStrokeColor;
  Z.style.marginBottom = '7px';
  V.appendChild(Z);
  m.style.height = '15px';
  m.style.marginLeft = '16px';
  p.style.height = '15px';
  p.style.marginLeft = '3px';
  G.style.marginLeft = '10px';
  G.style.height = '15px';
  R.style.marginLeft = '10px';
  R.style.height = '17px';
  Q.style.marginLeft = '3px';
  Q.style.height = '17px';
  ba.style.marginLeft = '3px';
  ba.style.height = '17px';
  a.appendChild(h);
  a.appendChild(D);
  a.appendChild(A);
  m = A.cloneNode(!1);
  m.style.padding = '5px 4px 6px 0px';
  m.style.fontWeight = 'normal';
  p = document.createElement('div');
  p.style.position = 'absolute';
  p.style.marginLeft = '0px';
  p.style.marginBottom = '12px';
  p.style.marginTop = '2px';
  p.style.fontWeight = 'normal';
  p.style.width = '76px';
  mxUtils.write(p, mxResources.get('lineend'));
  m.appendChild(p);
  var ma = this.addUnitInput(m, 'pt', 98, 52, function() {
      ia.apply(this, arguments);
    }),
    ja = this.addUnitInput(m, 'pt', 30, 52, function() {
      Y.apply(this, arguments);
    });
  mxUtils.br(m);
  P = document.createElement('div');
  P.style.height = '8px';
  m.appendChild(P);
  p = p.cloneNode(!1);
  mxUtils.write(p, mxResources.get('linestart'));
  m.appendChild(p);
  var la = this.addUnitInput(m, 'pt', 98, 52, function() {
      I.apply(this, arguments);
    }),
    N = this.addUnitInput(m, 'pt', 30, 52, function() {
      S.apply(this, arguments);
    });
  mxUtils.br(m);
  this.addLabel(m, mxResources.get('spacing'), 98, 52);
  this.addLabel(m, mxResources.get('size'), 30, 52);
  mxUtils.br(m);
  h = h.cloneNode(!1);
  h.style.fontWeight = 'normal';
  h.style.position = 'relative';
  h.style.paddingLeft = '16px';
  h.style.marginBottom = '2px';
  h.style.marginTop = '6px';
  h.style.borderWidth = '0px';
  h.style.paddingBottom = '18px';
  p = document.createElement('div');
  p.style.position = 'absolute';
  p.style.marginLeft = '3px';
  p.style.marginBottom = '12px';
  p.style.marginTop = '1px';
  p.style.fontWeight = 'normal';
  p.style.width = '120px';
  mxUtils.write(p, mxResources.get('perimeter'));
  h.appendChild(p);
  var X = this.addUnitInput(h, 'pt', 30, 52, function() {
    ka.apply(this, arguments);
  });
  d.edges.length == d.cells.length ? (a.appendChild(u), a.appendChild(m)) : d.vertices.length == d.cells.length && a.appendChild(h);
  var L = mxUtils.bind(this, function(U, ca, ra) {
    function ua(Ga, Ia, wa, Ca) {
      wa = wa.getElementsByTagName('div')[0];
      null != wa && e.updateCssForMarker(wa, Ca, d.style.shape, Ga, Ia);
      return wa;
    }
    d = e.getSelectionState();
    if (ra || document.activeElement != F)
      U = parseFloat(mxUtils.getValue(d.style, mxConstants.STYLE_STROKEWIDTH, 1)), F.value = isNaN(U) ? '' : U + ' pt';
    if (ra || document.activeElement != K)
      U = parseFloat(mxUtils.getValue(d.style, mxConstants.STYLE_STROKEWIDTH, 1)), K.value = isNaN(U) ? '' : U + ' pt';
    n.style.visibility = 'connector' == d.style.shape || 'filledEdge' == d.style.shape ? '' : 'hidden';
    '1' == mxUtils.getValue(d.style, mxConstants.STYLE_CURVED, null) ? n.value = 'curved' : '1' == mxUtils.getValue(d.style, mxConstants.STYLE_ROUNDED, null) && (n.value = 'rounded');
    '1' == mxUtils.getValue(d.style, mxConstants.STYLE_DASHED, null) ? null == mxUtils.getValue(d.style, mxConstants.STYLE_DASH_PATTERN, null) ? T.style.borderBottom = '1px dashed ' + this.defaultStrokeColor : T.style.borderBottom = '1px dotted ' + this.defaultStrokeColor : T.style.borderBottom = '1px solid ' + this.defaultStrokeColor;
    Z.style.borderBottom = T.style.borderBottom;
    U = R.getElementsByTagName('div')[0];
    null != U && (ca = mxUtils.getValue(d.style, mxConstants.STYLE_EDGE, null), '1' == mxUtils.getValue(d.style, mxConstants.STYLE_NOEDGESTYLE, null) && (ca = null), 'orthogonalEdgeStyle' == ca && '1' == mxUtils.getValue(d.style, mxConstants.STYLE_CURVED, null) ? U.className = 'geSprite geSprite-curved' : U.className = 'straight' == ca || 'none' == ca || null == ca ? 'geSprite geSprite-straight' : 'entityRelationEdgeStyle' == ca ? 'geSprite geSprite-entity' : 'elbowEdgeStyle' == ca ? 'geSprite ' + ('vertical' == mxUtils.getValue(d.style, mxConstants.STYLE_ELBOW, null) ? 'geSprite-verticalelbow' : 'geSprite-horizontalelbow') : 'isometricEdgeStyle' == ca ? 'geSprite ' + ('vertical' == mxUtils.getValue(d.style, mxConstants.STYLE_ELBOW, null) ? 'geSprite-verticalisometric' : 'geSprite-horizontalisometric') : 'geSprite geSprite-orthogonal');
    U = G.getElementsByTagName('div')[0];
    null != U && (U.className = 'link' == d.style.shape ? 'geSprite geSprite-linkedge' : 'flexArrow' == d.style.shape ? 'geSprite geSprite-arrow' : 'arrow' == d.style.shape ? 'geSprite geSprite-simplearrow' : 'geSprite geSprite-connection');
    d.edges.length == d.cells.length ? (D.style.display = '', A.style.display = 'none') : (D.style.display = 'none', A.style.display = '');
    Graph.lineJumpsEnabled && 0 < d.edges.length && 0 == d.vertices.length && d.lineJumps && (a.style.borderBottomStyle = 'none');
    U = ua(mxUtils.getValue(d.style, mxConstants.STYLE_STARTARROW, null), mxUtils.getValue(d.style, 'startFill', '1'), Q, 'start');
    ca = ua(mxUtils.getValue(d.style, mxConstants.STYLE_ENDARROW, null), mxUtils.getValue(d.style, 'endFill', '1'), ba, 'end');
    null != U && null != ca && ('arrow' == d.style.shape ? (U.className = 'geSprite geSprite-noarrow', ca.className = 'geSprite geSprite-endblocktrans') : 'link' == d.style.shape && (U.className = 'geSprite geSprite-noarrow', ca.className = 'geSprite geSprite-noarrow'));
    mxUtils.setOpacity(R, 'arrow' == d.style.shape ? 30 : 100);
    'connector' != d.style.shape && 'flexArrow' != d.style.shape && 'filledEdge' != d.style.shape ? (mxUtils.setOpacity(Q, 30), mxUtils.setOpacity(ba, 30)) : (mxUtils.setOpacity(Q, 100), mxUtils.setOpacity(ba, 100));
    if (ra || document.activeElement != N)
      U = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE)), N.value = isNaN(U) ? '' : U + ' pt';
    if (ra || document.activeElement != la)
      U = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0)), la.value = isNaN(U) ? '' : U + ' pt';
    if (ra || document.activeElement != ja)
      U = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE)), ja.value = isNaN(U) ? '' : U + ' pt';
    if (ra || document.activeElement != la)
      U = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0)), ma.value = isNaN(U) ? '' : U + ' pt';
    if (ra || document.activeElement != X)
      U = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_PERIMETER_SPACING, 0)), X.value = isNaN(U) ? '' : U + ' pt';
  });
  var S = this.installInputHandler(N, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE, 0, 999, ' pt');
  var I = this.installInputHandler(la, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0, -999, 999, ' pt');
  var Y = this.installInputHandler(ja, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE, 0, 999, ' pt');
  var ia = this.installInputHandler(ma, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0, -999, 999, ' pt');
  var ka = this.installInputHandler(X, mxConstants.STYLE_PERIMETER_SPACING, 0, 0, 999, ' pt');
  this.addKeyHandler(F, L);
  this.addKeyHandler(N, L);
  this.addKeyHandler(la, L);
  this.addKeyHandler(ja, L);
  this.addKeyHandler(ma, L);
  this.addKeyHandler(X, L);
  g.getModel().addListener(mxEvent.CHANGE, L);
  this.listeners.push({
    destroy: function() {
      g.getModel().removeListener(L);
    }
  });
  L();
  return a;
};
StyleFormatPanel.prototype.addLineJumps = function(a) {
  var b = this.editorUi,
    f = b.editor.graph,
    e = b.getSelectionState();
  if (Graph.lineJumpsEnabled && 0 < e.edges.length && 0 == e.vertices.length && e.lineJumps) {
    a.style.padding = '2px 0px 24px 14px';
    var g = document.createElement('div');
    g.style.position = 'absolute';
    g.style.maxWidth = '82px';
    g.style.overflow = 'hidden';
    g.style.textOverflow = 'ellipsis';
    mxUtils.write(g, mxResources.get('lineJumps'));
    a.appendChild(g);
    var d = document.createElement('select');
    d.style.position = 'absolute';
    d.style.height = '21px';
    d.style.padding = '0px';
    d.style.marginTop = '-2px';
    d.style.boxSizing = 'border-box';
    d.style.right = '76px';
    d.style.width = '54px';
    d.style.borderWidth = '1px';
    d.style.borderStyle = 'solid';
    g = [
      'none',
      'arc',
      'gap',
      'sharp',
      'line'
    ];
    for (var h = 0; h < g.length; h++) {
      var n = document.createElement('option');
      n.setAttribute('value', g[h]);
      mxUtils.write(n, mxResources.get(g[h]));
      d.appendChild(n);
    }
    mxEvent.addListener(d, 'change', function(x) {
      f.getModel().beginUpdate();
      try {
        f.setCellStyles('jumpStyle', d.value, e.cells), b.fireEvent(new mxEventObject('styleChanged', 'keys', ['jumpStyle'], 'values', [d.value], 'cells', e.cells));
      } finally {
        f.getModel().endUpdate();
      }
      mxEvent.consume(x);
    });
    mxEvent.addListener(d, 'click', function(x) {
      mxEvent.consume(x);
    });
    a.appendChild(d);
    var u = this.addUnitInput(a, 'pt', 16, 42, function() {
      m.apply(this, arguments);
    });
    var m = this.installInputHandler(u, 'jumpSize', Graph.defaultJumpSize, 0, 999, ' pt');
    var p = mxUtils.bind(this, function(x, A, C) {
      e = b.getSelectionState();
      d.value = mxUtils.getValue(e.style, 'jumpStyle', 'none');
      if (C || document.activeElement != u)
        x = parseInt(mxUtils.getValue(e.style, 'jumpSize', Graph.defaultJumpSize)), u.value = isNaN(x) ? '' : x + ' pt';
    });
    this.addKeyHandler(u, p);
    f.getModel().addListener(mxEvent.CHANGE, p);
    this.listeners.push({
      destroy: function() {
        f.getModel().removeListener(p);
      }
    });
    p();
  } else
    a.style.display = 'none';
  return a;
};
StyleFormatPanel.prototype.addEffects = function(a) {
  var b = this.editorUi,
    f = b.editor.graph,
    e = b.getSelectionState();
  a.style.paddingTop = '4px';
  a.style.paddingBottom = '4px';
  var g = document.createElement('table');
  g.style.width = '210px';
  g.style.fontWeight = 'bold';
  g.style.tableLayout = 'fixed';
  var d = document.createElement('tbody'),
    h = document.createElement('tr');
  h.style.padding = '0px';
  var n = document.createElement('td');
  n.style.padding = '0px';
  n.style.width = '50%';
  n.setAttribute('valign', 'top');
  var u = n.cloneNode(!0);
  u.style.paddingLeft = '8px';
  h.appendChild(n);
  h.appendChild(u);
  d.appendChild(h);
  g.appendChild(d);
  a.appendChild(g);
  var m = n,
    p = mxUtils.bind(this, function(A, C, D, G) {
      A = this.createCellOption(A, C, D, null, null, G);
      A.style.width = '100%';
      m.appendChild(A);
      m = m == n ? u : n;
    }),
    x = mxUtils.bind(this, function(A, C, D) {
      e = b.getSelectionState();
      n.innerText = '';
      u.innerText = '';
      m = n;
      e.rounded && p(mxResources.get('rounded'), mxConstants.STYLE_ROUNDED, 0);
      e.swimlane && p(mxResources.get('divider'), 'swimlaneLine', 1);
      p(mxResources.get('sketch'), 'sketch', 0, function(G, F) {
        f.updateCellStyles({
          sketch: F ? '1' : null,
          curveFitting: F ? Editor.sketchDefaultCurveFitting : null,
          jiggle: F ? Editor.sketchDefaultJiggle : null
        }, G);
      });
      e.glass && p(mxResources.get('glass'), mxConstants.STYLE_GLASS, 0);
      e.containsImage || p(mxResources.get('shadow'), mxConstants.STYLE_SHADOW, 0);
    });
  f.getModel().addListener(mxEvent.CHANGE, x);
  this.listeners.push({
    destroy: function() {
      f.getModel().removeListener(x);
    }
  });
  x();
  return a;
};
StyleFormatPanel.prototype.addStyleOps = function(a) {
  1 == this.editorUi.getSelectionState().cells.length && this.addActions(a, ['setAsDefaultStyle']);
  return a;
};