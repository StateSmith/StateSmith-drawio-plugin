ArrangePanel = function(a, b, f) {
  BaseFormatPanel.call(this, a, b, f);
  this.init();
};
mxUtils.extend(ArrangePanel, BaseFormatPanel);
ArrangePanel.prototype.init = function() {
  var a = this.editorUi.getSelectionState();
  0 < a.cells.length && (this.container.appendChild(this.addLayerOps(this.createPanel())), this.addGeometry(this.container), this.addEdgeGeometry(this.container), a.containsLabel && 0 != a.edges.length || this.container.appendChild(this.addAngle(this.createPanel())), a.containsLabel || this.container.appendChild(this.addFlip(this.createPanel())), this.container.appendChild(this.addAlign(this.createPanel())), 1 < a.vertices.length && !a.cell && !a.row && this.container.appendChild(this.addDistribute(this.createPanel())), this.container.appendChild(this.addTable(this.createPanel())));
  this.container.appendChild(this.addGroupOps(this.createPanel()));
  a.containsLabel && (a = document.createElement('div'), a.style.width = '100%', a.style.marginTop = '0px', a.style.fontWeight = 'bold', a.style.padding = '10px 0 0 14px', mxUtils.write(a, mxResources.get('style')), this.container.appendChild(a), new StyleFormatPanel(this.format, this.editorUi, this.container));
};
ArrangePanel.prototype.addTable = function(a) {
  var b = this.editorUi,
    f = b.editor.graph,
    e = b.getSelectionState();
  a.style.paddingTop = '6px';
  a.style.paddingBottom = '10px';
  var g = document.createElement('div');
  g.style.marginTop = '0px';
  g.style.marginBottom = '6px';
  g.style.fontWeight = 'bold';
  mxUtils.write(g, mxResources.get('table'));
  a.appendChild(g);
  g = document.createElement('div');
  g.style.position = 'relative';
  g.style.paddingLeft = '0px';
  g.style.borderWidth = '0px';
  g.style.width = '220px';
  g.className = 'geToolbarContainer';
  var d = e.vertices[0];
  1 < f.getSelectionCount() && (f.isTableCell(d) && (d = f.model.getParent(d)), f.isTableRow(d) && (d = f.model.getParent(d)));
  var h = e.table || e.row || e.cell,
    n = f.isStack(d) || f.isStackChild(d),
    u = h;
  n && (h = '0' == (f.isStack(d) ? e.style : f.getCellStyle(f.model.getParent(d))).horizontalStack, u = !h);
  var m = [];
  u && (m = m.concat([
    b.toolbar.addButton('geSprite-insertcolumnbefore', mxResources.get('insertColumnBefore'), mxUtils.bind(this, function() {
      try {
        n ? f.insertLane(d, !0) : f.insertTableColumn(d, !0);
      } catch (p) {
        b.handleError(p);
      }
    }), g),
    b.toolbar.addButton('geSprite-insertcolumnafter', mxResources.get('insertColumnAfter'), mxUtils.bind(this, function() {
      try {
        n ? f.insertLane(d, !1) : f.insertTableColumn(d, !1);
      } catch (p) {
        b.handleError(p);
      }
    }), g),
    b.toolbar.addButton('geSprite-deletecolumn', mxResources.get('deleteColumn'), mxUtils.bind(this, function() {
      try {
        n ? f.deleteLane(d) : f.deleteTableColumn(d);
      } catch (p) {
        b.handleError(p);
      }
    }), g)
  ]));
  h && (m = m.concat([
    b.toolbar.addButton('geSprite-insertrowbefore', mxResources.get('insertRowBefore'), mxUtils.bind(this, function() {
      try {
        n ? f.insertLane(d, !0) : f.insertTableRow(d, !0);
      } catch (p) {
        b.handleError(p);
      }
    }), g),
    b.toolbar.addButton('geSprite-insertrowafter', mxResources.get('insertRowAfter'), mxUtils.bind(this, function() {
      try {
        n ? f.insertLane(d, !1) : f.insertTableRow(d, !1);
      } catch (p) {
        b.handleError(p);
      }
    }), g),
    b.toolbar.addButton('geSprite-deleterow', mxResources.get('deleteRow'), mxUtils.bind(this, function() {
      try {
        n ? f.deleteLane(d) : f.deleteTableRow(d);
      } catch (p) {
        b.handleError(p);
      }
    }), g)
  ]));
  if (0 < m.length) {
    this.styleButtons(m);
    a.appendChild(g);
    3 < m.length && (m[2].style.marginRight = '10px');
    u = 0;
    if (null != e.mergeCell)
      u += this.addActions(a, ['mergeCells']);
    else if (1 < e.style.colspan || 1 < e.style.rowspan)
      u += this.addActions(a, ['unmergeCells']);
    0 < u && (g.style.paddingBottom = '2px');
  } else
    a.style.display = 'none';
  return a;
};
ArrangePanel.prototype.addLayerOps = function(a) {
  this.addActions(a, [
    'toFront',
    'toBack'
  ]);
  this.addActions(a, [
    'bringForward',
    'sendBackward'
  ]);
  return a;
};
ArrangePanel.prototype.addGroupOps = function(a) {
  var b = this.editorUi.getSelectionState();
  a.style.paddingTop = '8px';
  a.style.paddingBottom = '6px';
  var f = 0;
  b.cell || b.row || (f += this.addActions(a, [
    'group',
    'ungroup',
    'copySize',
    'pasteSize'
  ]) + this.addActions(a, ['removeFromGroup']));
  b = this.addAction(a, 'clearWaypoints');
  null != b && (mxUtils.br(a), b.setAttribute('title', mxResources.get('clearWaypoints') + ' (' + this.editorUi.actions.get('clearWaypoints').shortcut + ') Shift+Click to Clear Anchor Points'), f++);
  f += this.addActions(a, ['lockUnlock']);
  0 == f && (a.style.display = 'none');
  return a;
};
ArrangePanel.prototype.addAlign = function(a) {
  var b = this.editorUi.getSelectionState(),
    f = this.editorUi.editor.graph;
  a.style.paddingTop = '6px';
  a.style.paddingBottom = '8px';
  a.appendChild(this.createTitle(mxResources.get('align')));
  var e = document.createElement('div');
  e.style.position = 'relative';
  e.style.whiteSpace = 'nowrap';
  e.style.paddingLeft = '0px';
  e.style.paddingBottom = '2px';
  e.style.borderWidth = '0px';
  e.style.width = '220px';
  e.className = 'geToolbarContainer';
  if (1 < b.vertices.length) {
    b = this.editorUi.toolbar.addButton('geSprite-alignleft', mxResources.get('left'), function() {
      f.alignCells(mxConstants.ALIGN_LEFT);
    }, e);
    var g = this.editorUi.toolbar.addButton('geSprite-aligncenter', mxResources.get('center'), function() {
        f.alignCells(mxConstants.ALIGN_CENTER);
      }, e),
      d = this.editorUi.toolbar.addButton('geSprite-alignright', mxResources.get('right'), function() {
        f.alignCells(mxConstants.ALIGN_RIGHT);
      }, e),
      h = this.editorUi.toolbar.addButton('geSprite-aligntop', mxResources.get('top'), function() {
        f.alignCells(mxConstants.ALIGN_TOP);
      }, e),
      n = this.editorUi.toolbar.addButton('geSprite-alignmiddle', mxResources.get('middle'), function() {
        f.alignCells(mxConstants.ALIGN_MIDDLE);
      }, e),
      u = this.editorUi.toolbar.addButton('geSprite-alignbottom', mxResources.get('bottom'), function() {
        f.alignCells(mxConstants.ALIGN_BOTTOM);
      }, e);
    this.styleButtons([
      b,
      g,
      d,
      h,
      n,
      u
    ]);
    d.style.marginRight = '10px';
  }
  a.appendChild(e);
  this.addActions(a, ['snapToGrid']);
  return a;
};
ArrangePanel.prototype.addFlip = function(a) {
  var b = this.editorUi.editor.graph;
  a.style.paddingTop = '6px';
  a.style.paddingBottom = '10px';
  var f = this.editorUi.getSelectionState(),
    e = document.createElement('div');
  e.style.marginTop = '2px';
  e.style.marginBottom = '8px';
  e.style.fontWeight = 'bold';
  mxUtils.write(e, mxResources.get('flip'));
  a.appendChild(e);
  e = mxUtils.button(mxResources.get('horizontal'), function(g) {
    b.flipCells(f.cells, !0);
  });
  e.setAttribute('title', mxResources.get('horizontal'));
  e.style.width = '104px';
  e.style.marginRight = '2px';
  a.appendChild(e);
  e = mxUtils.button(mxResources.get('vertical'), function(g) {
    b.flipCells(f.cells, !1);
  });
  e.setAttribute('title', mxResources.get('vertical'));
  e.style.width = '104px';
  a.appendChild(e);
  return a;
};
ArrangePanel.prototype.addDistribute = function(a) {
  var b = this.editorUi.editor.graph;
  a.style.paddingTop = '6px';
  a.style.paddingBottom = '8px';
  a.appendChild(this.createTitle(mxResources.get('distribute')));
  var f = mxUtils.button(mxResources.get('horizontal'), function(d) {
    b.distributeCells(!0, null, e.checked);
  });
  f.setAttribute('title', mxResources.get('horizontal'));
  f.style.width = '104px';
  f.style.marginRight = '2px';
  a.appendChild(f);
  f = mxUtils.button(mxResources.get('vertical'), function(d) {
    b.distributeCells(!1, null, e.checked);
  });
  f.setAttribute('title', mxResources.get('vertical'));
  f.style.width = '104px';
  a.appendChild(f);
  mxUtils.br(a);
  f = document.createElement('div');
  f.style.margin = '6px 0 0 0';
  f.style.display = 'flex';
  f.style.justifyContent = 'center';
  f.style.alignItems = 'center';
  var e = document.createElement('input');
  e.setAttribute('type', 'checkbox');
  e.setAttribute('id', 'spacingCheckbox');
  e.style.margin = '0 6px 0 0';
  f.appendChild(e);
  var g = document.createElement('label');
  g.style.verticalAlign = 'top';
  g.setAttribute('for', 'spacingCheckbox');
  g.style.userSelect = 'none';
  mxUtils.write(g, mxResources.get('spacing'));
  f.appendChild(g);
  a.appendChild(f);
  return a;
};
ArrangePanel.prototype.addAngle = function(a) {
  var b = this.editorUi,
    f = b.editor.graph,
    e = b.getSelectionState();
  a.style.paddingBottom = '8px';
  var g = document.createElement('div');
  g.style.position = 'absolute';
  g.style.width = '70px';
  g.style.marginTop = '0px';
  g.style.fontWeight = 'bold';
  var d = null,
    h = null,
    n = null;
  !e.rotatable || e.table || e.row || e.cell ? a.style.paddingTop = '8px' : (mxUtils.write(g, mxResources.get('angle')), a.appendChild(g), d = this.addUnitInput(a, '\xB0', 16, 52, function() {
    h.apply(this, arguments);
  }), mxUtils.br(a), a.style.paddingTop = '10px');
  e.containsLabel || (g = mxResources.get('reverse'), 0 < e.vertices.length && 0 < e.edges.length ? g = mxResources.get('turn') + ' / ' + g : 0 < e.vertices.length && (g = mxResources.get('turn')), n = mxUtils.button(g, function(m) {
    b.actions.get('turn').funct(m);
  }), n.setAttribute('title', g + ' (' + this.editorUi.actions.get('turn').shortcut + ')'), n.style.width = '210px', a.appendChild(n), null != d && (n.style.marginTop = '8px'));
  if (null != d) {
    var u = mxUtils.bind(this, function(m, p, x) {
      if (x || document.activeElement != d)
        e = b.getSelectionState(), m = parseFloat(mxUtils.getValue(e.style, mxConstants.STYLE_ROTATION, 0)), d.value = isNaN(m) ? '' : m + '\xB0';
    });
    h = this.installInputHandler(d, mxConstants.STYLE_ROTATION, 0, 0, 360, '\xB0', null, !0);
    this.addKeyHandler(d, u);
    f.getModel().addListener(mxEvent.CHANGE, u);
    this.listeners.push({
      destroy: function() {
        f.getModel().removeListener(u);
      }
    });
    u();
  }
  return a;
};
BaseFormatPanel.prototype.getUnit = function() {
  switch (this.editorUi.editor.graph.view.unit) {
    case mxConstants.POINTS:
      return 'pt';
    case mxConstants.INCHES:
      return '"';
    case mxConstants.MILLIMETERS:
      return 'mm';
    case mxConstants.METERS:
      return 'm';
  }
};
BaseFormatPanel.prototype.inUnit = function(a) {
  return this.editorUi.editor.graph.view.formatUnitText(a);
};
BaseFormatPanel.prototype.fromUnit = function(a) {
  switch (this.editorUi.editor.graph.view.unit) {
    case mxConstants.POINTS:
      return a;
    case mxConstants.INCHES:
      return a * mxConstants.PIXELS_PER_INCH;
    case mxConstants.MILLIMETERS:
      return a * mxConstants.PIXELS_PER_MM;
    case mxConstants.METERS:
      return a * mxConstants.PIXELS_PER_MM * 1000;
  }
};
BaseFormatPanel.prototype.isFloatUnit = function() {
  return this.editorUi.editor.graph.view.unit != mxConstants.POINTS;
};
BaseFormatPanel.prototype.getUnitStep = function() {
  switch (this.editorUi.editor.graph.view.unit) {
    case mxConstants.POINTS:
      return 1;
    case mxConstants.INCHES:
      return 0.1;
    case mxConstants.MILLIMETERS:
      return 0.5;
    case mxConstants.METERS:
      return 0.001;
  }
};
ArrangePanel.prototype.addGeometry = function(a) {
  var b = this,
    f = this.editorUi,
    e = f.editor.graph,
    g = e.getModel(),
    d = f.getSelectionState(),
    h = this.createPanel();
  h.style.paddingBottom = '8px';
  var n = document.createElement('div');
  n.style.position = 'absolute';
  n.style.width = '50px';
  n.style.marginTop = '0px';
  n.style.fontWeight = 'bold';
  mxUtils.write(n, mxResources.get('size'));
  h.appendChild(n);
  var u = this.addUnitInput(h, this.getUnit(), 87, 52, function() {
      C.apply(this, arguments);
    }, this.getUnitStep(), null, null, this.isFloatUnit()),
    m = this.addUnitInput(h, this.getUnit(), 16, 52, function() {
      D.apply(this, arguments);
    }, this.getUnitStep(), null, null, this.isFloatUnit()),
    p = document.createElement('div');
  p.className = 'geSprite geSprite-fit';
  p.setAttribute('title', mxResources.get('autosize') + ' (' + this.editorUi.actions.get('autosize').shortcut + ')');
  p.style.position = 'relative';
  p.style.cursor = 'pointer';
  p.style.marginTop = '-3px';
  p.style.border = '0px';
  p.style.left = '42px';
  mxUtils.setOpacity(p, 50);
  mxEvent.addListener(p, 'mouseenter', function() {
    mxUtils.setOpacity(p, 100);
  });
  mxEvent.addListener(p, 'mouseleave', function() {
    mxUtils.setOpacity(p, 50);
  });
  mxEvent.addListener(p, 'click', function() {
    f.actions.get('autosize').funct();
  });
  h.appendChild(p);
  d.row ? (u.style.visibility = 'hidden', u.nextSibling.style.visibility = 'hidden') : this.addLabel(h, mxResources.get('width'), 87);
  this.addLabel(h, mxResources.get('height'), 16);
  mxUtils.br(h);
  n = document.createElement('div');
  n.style.paddingTop = '8px';
  n.style.paddingRight = '20px';
  n.style.whiteSpace = 'nowrap';
  n.style.textAlign = 'right';
  var x = this.createCellOption(mxResources.get('constrainProportions'), mxConstants.STYLE_ASPECT, null, 'fixed', 'null');
  x.style.width = '210px';
  n.appendChild(x);
  d.cell || d.row ? p.style.visibility = 'hidden' : h.appendChild(n);
  var A = x.getElementsByTagName('input')[0];
  this.addKeyHandler(u, R);
  this.addKeyHandler(m, R);
  var C = this.addGeometryHandler(u, function(V, T, Z) {
    if (e.isTableCell(Z))
      return e.setTableColumnWidth(Z, T - V.width, !0), !0;
    0 < V.width && (T = Math.max(1, b.fromUnit(T)), A.checked && (V.height = Math.round(V.height * T * 100 / V.width) / 100), V.width = T);
  });
  var D = this.addGeometryHandler(m, function(V, T, Z) {
    e.isTableCell(Z) && (Z = e.model.getParent(Z));
    if (e.isTableRow(Z))
      return e.setTableRowHeight(Z, T - V.height), !0;
    0 < V.height && (T = Math.max(1, b.fromUnit(T)), A.checked && (V.width = Math.round(V.width * T * 100 / V.height) / 100), V.height = T);
  });
  (d.resizable || d.row || d.cell) && a.appendChild(h);
  var G = this.createPanel();
  G.style.paddingBottom = '30px';
  n = document.createElement('div');
  n.style.position = 'absolute';
  n.style.width = '70px';
  n.style.marginTop = '0px';
  n.style.fontWeight = 'bold';
  mxUtils.write(n, mxResources.get('position'));
  G.appendChild(n);
  var F = this.addUnitInput(G, this.getUnit(), 87, 52, function() {
      Q.apply(this, arguments);
    }, this.getUnitStep(), null, null, this.isFloatUnit()),
    K = this.addUnitInput(G, this.getUnit(), 16, 52, function() {
      ba.apply(this, arguments);
    }, this.getUnitStep(), null, null, this.isFloatUnit());
  mxUtils.br(G);
  if (d.movable) {
    if (0 == d.edges.length && 1 == d.vertices.length) {
      var P = e.getCellGeometry(d.vertices[0]);
      null != P && P.relative && (mxUtils.br(G), n = document.createElement('div'), n.style.position = 'absolute', n.style.width = '70px', n.style.marginTop = '0px', mxUtils.write(n, mxResources.get('relative')), G.appendChild(n), this.addGenericInput(G, '%', 87, 52, function() {
        return Math.round(1000 * P.x) / 10;
      }, function(V) {
        V = parseFloat(V);
        if (!isNaN(V)) {
          g.beginUpdate();
          try {
            P = P.clone(), P.x = parseFloat(V) / 100, g.setGeometry(d.vertices[0], P);
          } finally {
            g.endUpdate();
          }
        }
      }), this.addGenericInput(G, '%', 16, 52, function() {
        return Math.round(1000 * P.y) / 10;
      }, function(V) {
        V = parseFloat(V);
        if (!isNaN(V)) {
          g.beginUpdate();
          try {
            P = P.clone(), P.y = parseFloat(V) / 100, g.setGeometry(d.vertices[0], P);
          } finally {
            g.endUpdate();
          }
        }
      }), mxUtils.br(G));
    }
    a.appendChild(G);
  }
  this.addLabel(G, mxResources.get('left'), 87).style.marginTop = '8px';
  this.addLabel(G, mxResources.get('top'), 16).style.marginTop = '8px';
  var R = mxUtils.bind(this, function(V, T, Z) {
    d = f.getSelectionState();
    if (d.containsLabel || d.vertices.length != e.getSelectionCount() || null == d.width || null == d.height)
      h.style.display = 'none';
    else {
      h.style.display = '';
      if (Z || document.activeElement != u)
        u.value = this.inUnit(d.width) + ('' == d.width ? '' : ' ' + this.getUnit());
      if (Z || document.activeElement != m)
        m.value = this.inUnit(d.height) + ('' == d.height ? '' : ' ' + this.getUnit());
    }
    if (d.vertices.length == e.getSelectionCount() && null != d.x && null != d.y) {
      G.style.display = '';
      if (Z || document.activeElement != F)
        F.value = this.inUnit(d.x) + ('' == d.x ? '' : ' ' + this.getUnit());
      if (Z || document.activeElement != K)
        K.value = this.inUnit(d.y) + ('' == d.y ? '' : ' ' + this.getUnit());
    } else
      G.style.display = 'none';
  });
  this.addKeyHandler(F, R);
  this.addKeyHandler(K, R);
  g.addListener(mxEvent.CHANGE, R);
  this.listeners.push({
    destroy: function() {
      g.removeListener(R);
    }
  });
  R();
  var Q = this.addGeometryHandler(F, function(V, T) {
    T = b.fromUnit(T);
    V.relative ? V.offset.x = T : V.x = T;
  });
  var ba = this.addGeometryHandler(K, function(V, T) {
    T = b.fromUnit(T);
    V.relative ? V.offset.y = T : V.y = T;
  });
  d.movable && (0 == d.edges.length && 1 == d.vertices.length && g.isEdge(g.getParent(d.vertices[0])) && (P = e.getCellGeometry(d.vertices[0]), null != P && P.relative && (n = mxUtils.button(mxResources.get('center'), mxUtils.bind(this, function(V) {
    g.beginUpdate();
    try {
      P = P.clone(), P.x = 0, P.y = 0, P.offset = new mxPoint(), g.setGeometry(d.vertices[0], P);
    } finally {
      g.endUpdate();
    }
  })), n.setAttribute('title', mxResources.get('center')), n.style.width = '134px', n.style.left = '89px', n.style.position = 'absolute', mxUtils.br(G), mxUtils.br(G), G.appendChild(n))), a.appendChild(G));
};
ArrangePanel.prototype.addGeometryHandler = function(a, b) {
  function f(n) {
    if ('' != a.value) {
      var u = parseFloat(a.value);
      if (isNaN(u))
        a.value = d + ' ' + h.getUnit();
      else if (u != d) {
        g.getModel().beginUpdate();
        try {
          for (var m = e.getSelectionState().cells, p = 0; p < m.length; p++)
            if (g.getModel().isVertex(m[p])) {
              var x = g.getCellGeometry(m[p]);
              if (null != x && (x = x.clone(), !b(x, u, m[p]))) {
                var A = g.view.getState(m[p]);
                null != A && g.isRecursiveVertexResize(A) && g.resizeChildCells(m[p], x);
                g.getModel().setGeometry(m[p], x);
                g.constrainChildCells(m[p]);
              }
            }
        } finally {
          g.getModel().endUpdate();
        }
        d = u;
        a.value = u + ' ' + h.getUnit();
      }
    }
    mxEvent.consume(n);
  }
  var e = this.editorUi,
    g = e.editor.graph,
    d = null,
    h = this;
  mxEvent.addListener(a, 'blur', f);
  mxEvent.addListener(a, 'change', f);
  mxEvent.addListener(a, 'focus', function() {
    d = a.value;
  });
  return f;
};
ArrangePanel.prototype.addEdgeGeometryHandler = function(a, b) {
  function f(h) {
    if ('' != a.value) {
      var n = parseFloat(a.value);
      if (isNaN(n))
        a.value = d + ' pt';
      else if (n != d) {
        g.getModel().beginUpdate();
        try {
          for (var u = e.getSelectionState().cells, m = 0; m < u.length; m++)
            if (g.getModel().isEdge(u[m])) {
              var p = g.getCellGeometry(u[m]);
              null != p && (p = p.clone(), b(p, n), g.getModel().setGeometry(u[m], p));
            }
        } finally {
          g.getModel().endUpdate();
        }
        d = n;
        a.value = n + ' pt';
      }
    }
    mxEvent.consume(h);
  }
  var e = this.editorUi,
    g = e.editor.graph,
    d = null;
  mxEvent.addListener(a, 'blur', f);
  mxEvent.addListener(a, 'change', f);
  mxEvent.addListener(a, 'focus', function() {
    d = a.value;
  });
  return f;
};
ArrangePanel.prototype.addEdgeGeometry = function(a) {
  var b = this.editorUi,
    f = b.editor.graph,
    e = b.getSelectionState(),
    g = this.createPanel(),
    d = document.createElement('div');
  d.style.position = 'absolute';
  d.style.width = '70px';
  d.style.marginTop = '0px';
  d.style.fontWeight = 'bold';
  mxUtils.write(d, mxResources.get('width'));
  g.appendChild(d);
  var h = this.addUnitInput(g, 'pt', 12, 44, function() {
    n.apply(this, arguments);
  });
  mxUtils.br(g);
  this.addKeyHandler(h, D);
  var n = mxUtils.bind(this, function(R) {
    var Q = parseInt(h.value);
    Q = Math.min(999, Math.max(1, isNaN(Q) ? 1 : Q));
    if (Q != mxUtils.getValue(e.style, 'width', mxCellRenderer.defaultShapes.flexArrow.prototype.defaultWidth)) {
      var ba = b.getSelectionState().cells;
      f.setCellStyles('width', Q, ba);
      b.fireEvent(new mxEventObject('styleChanged', 'keys', ['width'], 'values', [Q], 'cells', ba));
    }
    h.value = Q + ' pt';
    mxEvent.consume(R);
  });
  mxEvent.addListener(h, 'blur', n);
  mxEvent.addListener(h, 'change', n);
  a.appendChild(g);
  var u = this.createPanel();
  u.style.paddingBottom = '30px';
  d = document.createElement('div');
  d.style.position = 'absolute';
  d.style.width = '70px';
  d.style.marginTop = '0px';
  mxUtils.write(d, mxResources.get('linestart'));
  u.appendChild(d);
  var m = this.addUnitInput(u, 'pt', 87, 52, function() {
      G.apply(this, arguments);
    }),
    p = this.addUnitInput(u, 'pt', 16, 52, function() {
      F.apply(this, arguments);
    });
  mxUtils.br(u);
  this.addLabel(u, mxResources.get('left'), 87);
  this.addLabel(u, mxResources.get('top'), 16);
  a.appendChild(u);
  this.addKeyHandler(m, D);
  this.addKeyHandler(p, D);
  var x = this.createPanel();
  x.style.paddingBottom = '30px';
  d = document.createElement('div');
  d.style.position = 'absolute';
  d.style.width = '70px';
  d.style.marginTop = '0px';
  mxUtils.write(d, mxResources.get('lineend'));
  x.appendChild(d);
  var A = this.addUnitInput(x, 'pt', 87, 52, function() {
      K.apply(this, arguments);
    }),
    C = this.addUnitInput(x, 'pt', 16, 52, function() {
      P.apply(this, arguments);
    });
  mxUtils.br(x);
  this.addLabel(x, mxResources.get('left'), 87);
  this.addLabel(x, mxResources.get('top'), 16);
  a.appendChild(x);
  this.addKeyHandler(A, D);
  this.addKeyHandler(C, D);
  var D = mxUtils.bind(this, function(R, Q, ba) {
    e = b.getSelectionState();
    R = e.cells[0];
    if ('link' == e.style.shape || 'flexArrow' == e.style.shape) {
      if (g.style.display = '', ba || document.activeElement != h)
        ba = mxUtils.getValue(e.style, 'width', mxCellRenderer.defaultShapes.flexArrow.prototype.defaultWidth), h.value = ba + ' pt';
    } else
      g.style.display = 'none';
    1 == e.cells.length && f.model.isEdge(R) ? (ba = f.model.getGeometry(R), null != ba.sourcePoint && null == f.model.getTerminal(R, !0) ? (m.value = ba.sourcePoint.x, p.value = ba.sourcePoint.y) : u.style.display = 'none', null != ba.targetPoint && null == f.model.getTerminal(R, !1) ? (A.value = ba.targetPoint.x, C.value = ba.targetPoint.y) : x.style.display = 'none') : (u.style.display = 'none', x.style.display = 'none');
  });
  var G = this.addEdgeGeometryHandler(m, function(R, Q) {
    R.sourcePoint.x = Q;
  });
  var F = this.addEdgeGeometryHandler(p, function(R, Q) {
    R.sourcePoint.y = Q;
  });
  var K = this.addEdgeGeometryHandler(A, function(R, Q) {
    R.targetPoint.x = Q;
  });
  var P = this.addEdgeGeometryHandler(C, function(R, Q) {
    R.targetPoint.y = Q;
  });
  f.getModel().addListener(mxEvent.CHANGE, D);
  this.listeners.push({
    destroy: function() {
      f.getModel().removeListener(D);
    }
  });
  D();
};