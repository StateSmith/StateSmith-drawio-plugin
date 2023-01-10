Menus = function(a) {
  this.editorUi = a;
  this.menus = {};
  this.init();
  mxClient.IS_SVG || (new Image().src = this.checkmarkImage);
};
Menus.prototype.defaultFont = 'Helvetica';
Menus.prototype.defaultFontSize = '12';
Menus.prototype.defaultMenuItems = 'file edit view arrange extras help'.split(' ');
Menus.prototype.defaultFonts = 'Helvetica;Verdana;Times New Roman;Garamond;Comic Sans MS;Courier New;Georgia;Lucida Console;Tahoma'.split(';');
Menus.prototype.autoPopup = !0;
Menus.prototype.init = function() {
  var a = this.editorUi,
    b = a.editor.graph,
    f = mxUtils.bind(b, b.isEnabled);
  this.customFonts = [];
  this.customFontSizes = [];
  this.put('fontFamily', new Menu(mxUtils.bind(this, function(e, g) {
    for (var d = mxUtils.bind(this, function(n) {
        this.styleChange(e, n, [mxConstants.STYLE_FONTFAMILY], [n], null, g, function() {
          document.execCommand('fontname', !1, n);
          a.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_FONTFAMILY], 'values', [n], 'cells', [b.cellEditor.getEditingCell()]));
        }, function() {
          b.updateLabelElements(b.getSelectionCells(), function(u) {
            u.removeAttribute('face');
            u.style.fontFamily = null;
            'PRE' == u.nodeName && b.replaceElement(u, 'div');
          });
        }).firstChild.nextSibling.style.fontFamily = n;
      }), h = 0; h < this.defaultFonts.length; h++)
      d(this.defaultFonts[h]);
    e.addSeparator(g);
    if (0 < this.customFonts.length) {
      for (h = 0; h < this.customFonts.length; h++)
        d(this.customFonts[h]);
      e.addSeparator(g);
      e.addItem(mxResources.get('reset'), null, mxUtils.bind(this, function() {
        this.customFonts = [];
        this.editorUi.fireEvent(new mxEventObject('customFontsChanged'));
      }), g);
      e.addSeparator(g);
    }
    this.promptChange(e, mxResources.get('custom') + '...', '', mxConstants.DEFAULT_FONTFAMILY, mxConstants.STYLE_FONTFAMILY, g, !0, mxUtils.bind(this, function(n) {
      0 > mxUtils.indexOf(this.customFonts, n) && (this.customFonts.push(n), this.editorUi.fireEvent(new mxEventObject('customFontsChanged')));
    }));
  })));
  this.put('formatBlock', new Menu(mxUtils.bind(this, function(e, g) {
    function d(h, n) {
      return e.addItem(h, null, mxUtils.bind(this, function() {
        null != b.cellEditor.textarea && (b.cellEditor.textarea.focus(), document.execCommand('formatBlock', !1, '<' + n + '>'));
      }), g);
    }
    d(mxResources.get('normal'), 'p');
    d('', 'h1').firstChild.nextSibling.innerHTML = '<h1 style="margin:0px;">' + mxResources.get('heading') + ' 1</h1>';
    d('', 'h2').firstChild.nextSibling.innerHTML = '<h2 style="margin:0px;">' + mxResources.get('heading') + ' 2</h2>';
    d('', 'h3').firstChild.nextSibling.innerHTML = '<h3 style="margin:0px;">' + mxResources.get('heading') + ' 3</h3>';
    d('', 'h4').firstChild.nextSibling.innerHTML = '<h4 style="margin:0px;">' + mxResources.get('heading') + ' 4</h4>';
    d('', 'h5').firstChild.nextSibling.innerHTML = '<h5 style="margin:0px;">' + mxResources.get('heading') + ' 5</h5>';
    d('', 'h6').firstChild.nextSibling.innerHTML = '<h6 style="margin:0px;">' + mxResources.get('heading') + ' 6</h6>';
    d('', 'pre').firstChild.nextSibling.innerHTML = '<pre style="margin:0px;">' + mxResources.get('formatted') + '</pre>';
    d('', 'blockquote').firstChild.nextSibling.innerHTML = '<blockquote style="margin-top:0px;margin-bottom:0px;">' + mxResources.get('blockquote') + '</blockquote>';
  })));
  this.put('fontSize', new Menu(mxUtils.bind(this, function(e, g) {
    var d = [
      6,
      8,
      9,
      10,
      11,
      12,
      14,
      18,
      24,
      36,
      48,
      72
    ];
    0 > mxUtils.indexOf(d, this.defaultFontSize) && (d.push(this.defaultFontSize), d.sort(function(x, A) {
      return x - A;
    }));
    for (var h = mxUtils.bind(this, function(x) {
        if (null != b.cellEditor.textarea) {
          document.execCommand('fontSize', !1, '3');
          for (var A = b.cellEditor.textarea.getElementsByTagName('font'), C = 0; C < A.length; C++)
            if ('3' == A[C].getAttribute('size')) {
              A[C].removeAttribute('size');
              A[C].style.fontSize = x + 'px';
              break;
            }
          a.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_FONTSIZE], 'values', [x], 'cells', [b.cellEditor.getEditingCell()]));
        }
      }), n = mxUtils.bind(this, function(x) {
        this.styleChange(e, x, [mxConstants.STYLE_FONTSIZE], [x], null, g, function() {
          h(x);
        });
      }), u = 0; u < d.length; u++)
      n(d[u]);
    e.addSeparator(g);
    if (0 < this.customFontSizes.length) {
      var m = 0;
      for (u = 0; u < this.customFontSizes.length; u++)
        0 > mxUtils.indexOf(d, this.customFontSizes[u]) && (n(this.customFontSizes[u]), m++);
      0 < m && e.addSeparator(g);
      e.addItem(mxResources.get('reset'), null, mxUtils.bind(this, function() {
        this.customFontSizes = [];
      }), g);
      e.addSeparator(g);
    }
    var p = null;
    this.promptChange(e, mxResources.get('custom') + '...', '(' + mxResources.get('points') + ')', this.defaultFontSize, mxConstants.STYLE_FONTSIZE, g, !0, mxUtils.bind(this, function(x) {
      null != p && null != b.cellEditor.textarea && (b.cellEditor.textarea.focus(), b.cellEditor.restoreSelection(p));
      null != x && 0 < x.length && (this.customFontSizes.push(x), h(x));
    }), null, function() {
      p = b.cellEditor.saveSelection();
      return !1;
    });
  })));
  this.put('direction', new Menu(mxUtils.bind(this, function(e, g) {
    e.addItem(mxResources.get('flipH'), null, function() {
      b.toggleCellStyles(mxConstants.STYLE_FLIPH, !1);
    }, g);
    e.addItem(mxResources.get('flipV'), null, function() {
      b.toggleCellStyles(mxConstants.STYLE_FLIPV, !1);
    }, g);
    this.addMenuItems(e, [
      '-',
      'rotation'
    ], g);
  })));
  this.put('align', new Menu(mxUtils.bind(this, function(e, g) {
    var d = 1 < this.editorUi.getSelectionState().vertices.length;
    e.addItem(mxResources.get('leftAlign'), null, function() {
      b.alignCells(mxConstants.ALIGN_LEFT);
    }, g, null, d);
    e.addItem(mxResources.get('center'), null, function() {
      b.alignCells(mxConstants.ALIGN_CENTER);
    }, g, null, d);
    e.addItem(mxResources.get('rightAlign'), null, function() {
      b.alignCells(mxConstants.ALIGN_RIGHT);
    }, g, null, d);
    e.addSeparator(g);
    e.addItem(mxResources.get('topAlign'), null, function() {
      b.alignCells(mxConstants.ALIGN_TOP);
    }, g, null, d);
    e.addItem(mxResources.get('middle'), null, function() {
      b.alignCells(mxConstants.ALIGN_MIDDLE);
    }, g, null, d);
    e.addItem(mxResources.get('bottomAlign'), null, function() {
      b.alignCells(mxConstants.ALIGN_BOTTOM);
    }, g, null, d);
    this.addMenuItems(e, [
      '-',
      'snapToGrid'
    ], g);
  })));
  this.put('distribute', new Menu(mxUtils.bind(this, function(e, g) {
    e.addItem(mxResources.get('horizontal'), null, function() {
      b.distributeCells(!0);
    }, g);
    e.addItem(mxResources.get('vertical'), null, function() {
      b.distributeCells(!1);
    }, g);
    e.addSeparator(g);
    this.addSubmenu('distributeSpacing', e, g, mxResources.get('spacing'));
  })));
  this.put('distributeSpacing', new Menu(mxUtils.bind(this, function(e, g) {
    e.addItem(mxResources.get('horizontal'), null, function() {
      b.distributeCells(!0, null, !0);
    }, g);
    e.addItem(mxResources.get('vertical'), null, function() {
      b.distributeCells(!1, null, !0);
    }, g);
  })));
  this.put('line', new Menu(mxUtils.bind(this, function(e, g) {
    var d = b.view.getState(b.getSelectionCell());
    null != d && (d = mxUtils.getValue(d.style, mxConstants.STYLE_SHAPE), 'arrow' != d && (this.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-straight', g, !0).setAttribute('title', mxResources.get('straight')), this.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'orthogonalEdgeStyle',
      null,
      null
    ], 'geIcon geSprite geSprite-orthogonal', g, !0).setAttribute('title', mxResources.get('orthogonal')), this.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_ELBOW,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'elbowEdgeStyle',
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-horizontalelbow', g, !0).setAttribute('title', mxResources.get('simple')), this.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_ELBOW,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'elbowEdgeStyle',
      'vertical',
      null,
      null
    ], 'geIcon geSprite geSprite-verticalelbow', g, !0).setAttribute('title', mxResources.get('simple')), this.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_ELBOW,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'isometricEdgeStyle',
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-horizontalisometric', g, !0).setAttribute('title', mxResources.get('isometric')), this.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_ELBOW,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'isometricEdgeStyle',
      'vertical',
      null,
      null
    ], 'geIcon geSprite geSprite-verticalisometric', g, !0).setAttribute('title', mxResources.get('isometric')), 'connector' == d && this.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'orthogonalEdgeStyle',
      '1',
      null
    ], 'geIcon geSprite geSprite-curved', g, !0).setAttribute('title', mxResources.get('curved')), this.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'entityRelationEdgeStyle',
      null,
      null
    ], 'geIcon geSprite geSprite-entity', g, !0).setAttribute('title', mxResources.get('entityRelation'))), e.addSeparator(g), this.styleChange(e, '', [
      mxConstants.STYLE_SHAPE,
      mxConstants.STYLE_STARTSIZE,
      mxConstants.STYLE_ENDSIZE,
      'width'
    ], [
      null,
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-connection', g, !0, null, !0).setAttribute('title', mxResources.get('line')), this.styleChange(e, '', [
      mxConstants.STYLE_SHAPE,
      mxConstants.STYLE_STARTSIZE,
      mxConstants.STYLE_ENDSIZE,
      'width'
    ], [
      'link',
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-linkedge', g, !0, null, !0).setAttribute('title', mxResources.get('link')), this.styleChange(e, '', [
      mxConstants.STYLE_SHAPE,
      mxConstants.STYLE_STARTSIZE,
      mxConstants.STYLE_ENDSIZE,
      'width'
    ], [
      'flexArrow',
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-arrow', g, !0, null, !0).setAttribute('title', mxResources.get('arrow')), this.styleChange(e, '', [
      mxConstants.STYLE_SHAPE,
      mxConstants.STYLE_STARTSIZE,
      mxConstants.STYLE_ENDSIZE,
      'width'
    ], [
      'arrow',
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-simplearrow', g, !0, null, !0).setAttribute('title', mxResources.get('simpleArrow')));
  })));
  this.put('layout', new Menu(mxUtils.bind(this, function(e, g) {
    var d = mxUtils.bind(this, function(n, u) {
        this.editorUi.prompt(mxResources.get('spacing'), n, u);
      }),
      h = mxUtils.bind(this, function(n) {
        var u = b.getSelectionCell(),
          m = null;
        null == u || 0 == b.getModel().getChildCount(u) ? 0 == b.getModel().getEdgeCount(u) && (m = b.findTreeRoots(b.getDefaultParent())) : m = b.findTreeRoots(u);
        null != m && 0 < m.length && (u = m[0]);
        null != u && this.editorUi.executeLayout(function() {
          n.execute(b.getDefaultParent(), u);
          b.isSelectionEmpty() || (u = b.getModel().getParent(u), b.getModel().isVertex(u) && b.updateGroupBounds([u], 2 * b.gridSize, !0));
        }, !0);
      });
    e.addItem(mxResources.get('horizontalFlow'), null, mxUtils.bind(this, function() {
      var n = new mxHierarchicalLayout(b, mxConstants.DIRECTION_WEST);
      this.editorUi.executeLayout(function() {
        var u = b.getSelectionCells();
        n.execute(b.getDefaultParent(), 0 == u.length ? null : u);
      }, !0);
    }), g);
    e.addItem(mxResources.get('verticalFlow'), null, mxUtils.bind(this, function() {
      var n = new mxHierarchicalLayout(b, mxConstants.DIRECTION_NORTH);
      this.editorUi.executeLayout(function() {
        var u = b.getSelectionCells();
        n.execute(b.getDefaultParent(), 0 == u.length ? null : u);
      }, !0);
    }), g);
    e.addSeparator(g);
    e.addItem(mxResources.get('horizontalTree'), null, mxUtils.bind(this, function() {
      var n = new mxCompactTreeLayout(b, !0);
      n.edgeRouting = !1;
      n.levelDistance = 30;
      d(n.levelDistance, mxUtils.bind(this, function(u) {
        isNaN(u) || (n.levelDistance = u, h(n));
      }));
    }), g);
    e.addItem(mxResources.get('verticalTree'), null, mxUtils.bind(this, function() {
      var n = new mxCompactTreeLayout(b, !1);
      n.edgeRouting = !1;
      n.levelDistance = 30;
      d(n.levelDistance, mxUtils.bind(this, function(u) {
        isNaN(u) || (n.levelDistance = u, h(n));
      }));
    }), g);
    e.addItem(mxResources.get('radialTree'), null, mxUtils.bind(this, function() {
      var n = new mxRadialTreeLayout(b);
      n.levelDistance = 80;
      n.autoRadius = !0;
      d(n.levelDistance, mxUtils.bind(this, function(u) {
        isNaN(u) || (n.levelDistance = u, h(n));
      }));
    }), g);
    e.addSeparator(g);
    e.addItem(mxResources.get('organic'), null, mxUtils.bind(this, function() {
      var n = new mxFastOrganicLayout(b);
      d(n.forceConstant, mxUtils.bind(this, function(u) {
        n.forceConstant = u;
        this.editorUi.executeLayout(function() {
          var m = b.getSelectionCell();
          if (null == m || 0 == b.getModel().getChildCount(m))
            m = b.getDefaultParent();
          n.execute(m);
          b.getModel().isVertex(m) && b.updateGroupBounds([m], 2 * b.gridSize, !0);
        }, !0);
      }));
    }), g);
    e.addItem(mxResources.get('circle'), null, mxUtils.bind(this, function() {
      var n = new mxCircleLayout(b);
      this.editorUi.executeLayout(function() {
        var u = b.getSelectionCell();
        if (null == u || 0 == b.getModel().getChildCount(u))
          u = b.getDefaultParent();
        n.execute(u);
        b.getModel().isVertex(u) && b.updateGroupBounds([u], 2 * b.gridSize, !0);
      }, !0);
    }), g);
  })));
  this.put('navigation', new Menu(mxUtils.bind(this, function(e, g) {
    this.addMenuItems(e, 'home - exitGroup enterGroup - expand collapse - collapsible'.split(' '), g);
  })));
  this.put('arrange', new Menu(mxUtils.bind(this, function(e, g) {
    this.addMenuItems(e, [
      'toFront',
      'toBack',
      'bringForward',
      'sendBackward',
      '-'
    ], g);
    this.addSubmenu('direction', e, g);
    this.addMenuItems(e, [
      'turn',
      '-'
    ], g);
    this.addSubmenu('align', e, g);
    this.addSubmenu('distribute', e, g);
    e.addSeparator(g);
    this.addSubmenu('navigation', e, g);
    this.addSubmenu('insert', e, g);
    this.addSubmenu('layout', e, g);
    this.addMenuItems(e, '- group ungroup removeFromGroup - clearWaypoints autosize'.split(' '), g);
  }))).isEnabled = f;
  this.put('insert', new Menu(mxUtils.bind(this, function(e, g) {
    this.addMenuItems(e, [
      'insertLink',
      'insertImage'
    ], g);
  })));
  this.put('view', new Menu(mxUtils.bind(this, function(e, g) {
    this.addMenuItems(e, (null != this.editorUi.format ? ['format'] : []).concat('outline layers - pageView pageScale - tooltips grid guides - connectionArrows connectionPoints - resetView zoomIn zoomOut'.split(' '), g));
  })));
  this.put('viewPanels', new Menu(mxUtils.bind(this, function(e, g) {
    null != this.editorUi.format && this.addMenuItems(e, ['format'], g);
    this.addMenuItems(e, [
      'outline',
      'layers'
    ], g);
  })));
  this.put('viewZoom', new Menu(mxUtils.bind(this, function(e, g) {
    this.addMenuItems(e, [
      'smartFit',
      '-'
    ], g);
    for (var d = [
        0.25,
        0.5,
        0.75,
        1,
        1.25,
        1.5,
        2,
        3,
        4
      ], h = 0; h < d.length; h++)
      (function(n) {
        e.addItem(100 * n + '%', null, function() {
          b.zoomTo(n);
        }, g);
      }(d[h]));
    this.addMenuItems(e, '- fitWindow fitPageWidth fitPage fitTwoPages - customZoom'.split(' '), g);
  })));
  this.put('file', new Menu(mxUtils.bind(this, function(e, g) {
    this.addMenuItems(e, 'new open - save saveAs - import export - pageSetup print'.split(' '), g);
  })));
  this.put('edit', new Menu(mxUtils.bind(this, function(e, g) {
    this.addMenuItems(e, 'undo redo - cut copy paste delete - duplicate - editData editTooltip - editStyle - edit - editLink openLink - selectVertices selectEdges selectAll selectNone - lockUnlock'.split(' '));
  })));
  this.put('extras', new Menu(mxUtils.bind(this, function(e, g) {
    this.addMenuItems(e, [
      'copyConnect',
      'collapseExpand',
      '-',
      'editDiagram'
    ]);
  })));
  this.put('help', new Menu(mxUtils.bind(this, function(e, g) {
    this.addMenuItems(e, [
      'help',
      '-',
      'about'
    ]);
  })));
};
Menus.prototype.put = function(a, b) {
  return this.menus[a] = b;
};
Menus.prototype.get = function(a) {
  return this.menus[a];
};
Menus.prototype.addSubmenu = function(a, b, f, e) {
  var g = this.get(a);
  null != g && (g = g.isEnabled(), b.showDisabled || g) && (f = b.addItem(e || mxResources.get(a), null, null, f, null, g), this.addMenu(a, b, f));
};
Menus.prototype.addMenu = function(a, b, f) {
  a = this.get(a);
  null != a && (b.showDisabled || a.isEnabled()) && a.execute(b, f);
};
Menus.prototype.addInsertTableCellItem = function(a, b) {
  var f = this.editorUi.editor.graph,
    e = f.getSelectionCell(),
    g = f.getCurrentCellStyle(e);
  1 < f.getSelectionCount() && (f.isTableCell(e) && (e = f.model.getParent(e)), f.isTableRow(e) && (e = f.model.getParent(e)));
  var d = f.isTable(e) || f.isTableRow(e) || f.isTableCell(e),
    h = f.isStack(e) || f.isStackChild(e),
    n = d,
    u = d;
  h && (g = f.isStack(e) ? g : f.getCellStyle(f.model.getParent(e)), u = '0' == g.horizontalStack, n = !u);
  null != b || !d && !h ? this.addInsertTableItem(a, mxUtils.bind(this, function(m, p, x, A, C) {
    p = C || mxEvent.isControlDown(m) || mxEvent.isMetaDown(m) ? f.createCrossFunctionalSwimlane(p, x, null, null, A || mxEvent.isShiftDown(m) ? 'Cross-Functional Flowchart' : null) : f.createTable(p, x, null, null, A || mxEvent.isShiftDown(m) ? 'Table' : null);
    m = mxEvent.isAltDown(m) ? f.getFreeInsertPoint() : f.getCenterInsertPoint(f.getBoundingBoxFromGeometry([p], !0));
    x = null;
    f.getModel().beginUpdate();
    try {
      x = f.importCells([p], m.x, m.y), f.fireEvent(new mxEventObject('cellsInserted', 'cells', f.model.getDescendants(x[0])));
    } finally {
      f.getModel().endUpdate();
    }
    null != x && 0 < x.length && (f.scrollCellToVisible(x[0]), f.setSelectionCells(x));
  }), b) : (n && (b = a.addItem(mxResources.get('insertColumnBefore'), null, mxUtils.bind(this, function() {
    try {
      h ? f.insertLane(e, !0) : f.insertTableColumn(e, !0);
    } catch (m) {
      this.editorUi.handleError(m);
    }
  }), null, 'geIcon geSprite geSprite-insertcolumnbefore'), b.setAttribute('title', mxResources.get('insertColumnBefore')), b = a.addItem(mxResources.get('insertColumnAfter'), null, mxUtils.bind(this, function() {
    try {
      h ? f.insertLane(e, !1) : f.insertTableColumn(e, !1);
    } catch (m) {
      this.editorUi.handleError(m);
    }
  }), null, 'geIcon geSprite geSprite-insertcolumnafter'), b.setAttribute('title', mxResources.get('insertColumnAfter')), b = a.addItem(mxResources.get('deleteColumn'), null, mxUtils.bind(this, function() {
    if (null != e)
      try {
        h ? f.deleteLane(e) : f.deleteTableColumn(e);
      } catch (m) {
        this.editorUi.handleError(m);
      }
  }), null, 'geIcon geSprite geSprite-deletecolumn'), b.setAttribute('title', mxResources.get('deleteColumn'))), u && (b = a.addItem(mxResources.get('insertRowBefore'), null, mxUtils.bind(this, function() {
    try {
      h ? f.insertLane(e, !0) : f.insertTableRow(e, !0);
    } catch (m) {
      this.editorUi.handleError(m);
    }
  }), null, 'geIcon geSprite geSprite-insertrowbefore'), b.setAttribute('title', mxResources.get('insertRowBefore')), b = a.addItem(mxResources.get('insertRowAfter'), null, mxUtils.bind(this, function() {
    try {
      h ? f.insertLane(e, !1) : f.insertTableRow(e, !1);
    } catch (m) {
      this.editorUi.handleError(m);
    }
  }), null, 'geIcon geSprite geSprite-insertrowafter'), b.setAttribute('title', mxResources.get('insertRowAfter')), b = a.addItem(mxResources.get('deleteRow'), null, mxUtils.bind(this, function() {
    try {
      h ? f.deleteLane(e) : f.deleteTableRow(e);
    } catch (m) {
      this.editorUi.handleError(m);
    }
  }), null, 'geIcon geSprite geSprite-deleterow'), b.setAttribute('title', mxResources.get('deleteRow')), u = this.editorUi.getSelectionState(), null != u.mergeCell ? this.addMenuItem(a, 'mergeCells') : (1 < u.style.colspan || 1 < u.style.rowspan) && this.addMenuItem(a, 'unmergeCells')));
};
Menus.prototype.addInsertTableItem = function(a, b, f, e) {
  function g(C) {
    n = d.getParentByName(mxEvent.getSource(C), 'TD');
    var D = !1;
    if (null != n) {
      h = d.getParentByName(n, 'TR');
      var G = mxEvent.isMouseEvent(C) ? 2 : 4,
        F = x,
        K = Math.min(20, h.sectionRowIndex + G);
      G = Math.min(20, n.cellIndex + G);
      for (var P = F.rows.length; P < K; P++)
        for (var R = F.insertRow(P), Q = 0; Q < F.rows[0].cells.length; Q++)
          R.insertCell(-1);
      for (P = 0; P < F.rows.length; P++)
        for (R = F.rows[P], Q = R.cells.length; Q < G; Q++)
          R.insertCell(-1);
      A.innerHTML = n.cellIndex + 1 + 'x' + (h.sectionRowIndex + 1);
      for (F = 0; F < x.rows.length; F++)
        for (K = x.rows[F], G = 0; G < K.cells.length; G++)
          P = K.cells[G], F == h.sectionRowIndex && G == n.cellIndex && (D = 'blue' == P.style.backgroundColor), P.style.backgroundColor = F <= h.sectionRowIndex && G <= n.cellIndex ? 'blue' : 'transparent';
    }
    mxEvent.consume(C);
    return D;
  }
  e = null != e ? e : !0;
  b = null != b ? b : mxUtils.bind(this, function(C, D, G) {
    var F = this.editorUi.editor.graph;
    if (null != F.getParentByName(mxEvent.getSource(C), 'TD') && null != F.cellEditor.textarea) {
      var K = F.cellEditor.textarea.getElementsByTagName('table');
      C = [];
      for (var P = 0; P < K.length; P++)
        C.push(K[P]);
      F.container.focus();
      P = F.pasteHtmlAtCaret;
      K = ['<table>'];
      for (var R = 0; R < D; R++) {
        K.push('<tr>');
        for (var Q = 0; Q < G; Q++)
          K.push('<td><br></td>');
        K.push('</tr>');
      }
      K.push('</table>');
      D = K.join('');
      P.call(F, D);
      D = F.cellEditor.textarea.getElementsByTagName('table');
      if (D.length == C.length + 1)
        for (P = D.length - 1; 0 <= P; P--)
          if (0 == P || D[P] != C[P - 1]) {
            F.selectNode(D[P].rows[0].cells[0]);
            break;
          }
    }
  });
  var d = this.editorUi.editor.graph,
    h = null,
    n = null;
  null == f && (a.div.className += ' geToolbarMenu', a.labels = !1);
  a = a.addItem('', null, null, f, null, null, null, !0);
  a.firstChild.style.fontSize = Menus.prototype.defaultFontSize + 'px';
  f = a.getElementsByTagName('td');
  1 < f.length && (f[1].style.display = 'none', f[2].style.display = 'none');
  a.firstChild.innerText = '';
  var u = document.createElement('input');
  u.setAttribute('id', 'geTitleOption');
  u.setAttribute('type', 'checkbox');
  u.style.verticalAlign = 'middle';
  f = document.createElement('label');
  mxUtils.write(f, mxResources.get('title'));
  f.setAttribute('for', 'geTitleOption');
  f.style.verticalAlign = 'middle';
  mxEvent.addGestureListeners(f, null, null, mxUtils.bind(this, function(C) {
    mxEvent.consume(C);
  }));
  mxEvent.addGestureListeners(u, null, null, mxUtils.bind(this, function(C) {
    mxEvent.consume(C);
  }));
  var m = document.createElement('input');
  m.setAttribute('id', 'geContainerOption');
  m.setAttribute('type', 'checkbox');
  m.style.verticalAlign = 'middle';
  var p = document.createElement('label');
  mxUtils.write(p, mxResources.get('container'));
  p.setAttribute('for', 'geContainerOption');
  p.style.verticalAlign = 'middle';
  mxEvent.addGestureListeners(p, null, null, mxUtils.bind(this, function(C) {
    mxEvent.consume(C);
  }));
  mxEvent.addGestureListeners(m, null, null, mxUtils.bind(this, function(C) {
    mxEvent.consume(C);
  }));
  e && (a.firstChild.appendChild(u), a.firstChild.appendChild(f), mxUtils.br(a.firstChild), a.firstChild.appendChild(m), a.firstChild.appendChild(p), mxUtils.br(a.firstChild));
  var x = function(C, D) {
    var G = document.createElement('table');
    G.className = 'geInsertTablePicker';
    G.setAttribute('border', '1');
    G.style.borderCollapse = 'collapse';
    G.style.borderStyle = 'solid';
    G.style.marginBottom = '4px';
    G.style.marginTop = '8px';
    G.setAttribute('cellPadding', '8');
    for (var F = 0; F < C; F++)
      for (var K = G.insertRow(F), P = 0; P < D; P++)
        K.insertCell(-1);
    return G;
  }(5, 5);
  a.firstChild.appendChild(x);
  var A = document.createElement('div');
  A.style.textAlign = 'center';
  A.style.padding = '4px';
  A.style.width = '100%';
  A.innerHTML = '1x1';
  a.firstChild.appendChild(A);
  mxEvent.addGestureListeners(x, null, null, mxUtils.bind(this, function(C) {
    var D = g(C);
    null != n && null != h && D && (b(C, h.sectionRowIndex + 1, n.cellIndex + 1, u.checked, m.checked), window.setTimeout(mxUtils.bind(this, function() {
      this.editorUi.hideCurrentMenu();
    }), 0));
  }));
  mxEvent.addListener(x, 'mouseover', g);
};
Menus.prototype.edgeStyleChange = function(a, b, f, e, g, d, h, n) {
  return this.showIconOnly(a.addItem(b, n, mxUtils.bind(this, function() {
    var u = this.editorUi.editor.graph;
    u.stopEditing(!1);
    u.getModel().beginUpdate();
    try {
      for (var m = u.getSelectionCells(), p = [], x = 0; x < m.length; x++) {
        var A = m[x];
        if (u.getModel().isEdge(A)) {
          if (h) {
            var C = u.getCellGeometry(A);
            null != C && (C = C.clone(), C.points = null, u.getModel().setGeometry(A, C));
          }
          for (var D = 0; D < f.length; D++)
            u.setCellStyles(f[D], e[D], [A]);
          p.push(A);
        }
      }
      this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', f, 'values', e, 'cells', p));
    } finally {
      u.getModel().endUpdate();
    }
  }), d, g));
};
Menus.prototype.showIconOnly = function(a) {
  var b = a.getElementsByTagName('td');
  for (i = 0; i < b.length; i++)
    'mxPopupMenuItem' == b[i].getAttribute('class') && (b[i].style.display = 'none');
  return a;
};
Menus.prototype.styleChange = function(a, b, f, e, g, d, h, n, u) {
  var m = this.createStyleChangeFunction(f, e);
  a = a.addItem(b, null, mxUtils.bind(this, function() {
    var p = this.editorUi.editor.graph;
    null != h && p.cellEditor.isContentEditing() ? h() : m(n);
  }), d, g);
  u && this.showIconOnly(a);
  return a;
};
Menus.prototype.createStyleChangeFunction = function(a, b) {
  return mxUtils.bind(this, function(f) {
    var e = this.editorUi.editor.graph;
    e.stopEditing(!1);
    e.getModel().beginUpdate();
    try {
      for (var g = e.getEditableCells(e.getSelectionCells()), d = !1, h = 0; h < a.length; h++)
        if (e.setCellStyles(a[h], b[h], g), a[h] == mxConstants.STYLE_ALIGN && e.updateLabelElements(g, function(n) {
            n.removeAttribute('align');
            n.style.textAlign = null;
          }), a[h] == mxConstants.STYLE_FONTFAMILY || 'fontSource' == a[h])
          d = !0;
      if (d)
        for (d = 0; d < g.length; d++)
          0 == e.model.getChildCount(g[d]) && e.autoSizeCell(g[d], !1);
      null != f && f();
      this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', a, 'values', b, 'cells', g));
    } finally {
      e.getModel().endUpdate();
    }
  });
};
Menus.prototype.promptChange = function(a, b, f, e, g, d, h, n, u, m) {
  return a.addItem(b, null, mxUtils.bind(this, function() {
    var p = this.editorUi.editor.graph,
      x = e,
      A = p.getView().getState(p.getSelectionCell());
    null != A && (x = A.style[g] || x);
    var C = null != m ? m() : !0;
    x = new FilenameDialog(this.editorUi, x, mxResources.get('apply'), mxUtils.bind(this, function(D) {
      if (null != D && 0 < D.length) {
        if (C) {
          p.getModel().beginUpdate();
          try {
            p.stopEditing(!1), p.setCellStyles(g, D);
          } finally {
            p.getModel().endUpdate();
          }
        }
        null != n && n(D);
      }
    }), mxResources.get('enterValue') + (0 < f.length ? ' ' + f : ''), null, null, null, null, function() {
      null != n && null != m && n(null);
    });
    this.editorUi.showDialog(x.container, 300, 80, !0, !0);
    x.init();
  }), d, u, h);
};
Menus.prototype.pickColor = function(a, b, f) {
  var e = this.editorUi,
    g = e.editor.graph,
    d = 226 + 17 * (Math.ceil(ColorDialog.prototype.presetColors.length / 12) + Math.ceil(ColorDialog.prototype.defaultColors.length / 12));
  if (null != b && g.cellEditor.isContentEditing()) {
    var h = g.cellEditor.saveSelection();
    a = new ColorDialog(this.editorUi, f || g.shapeForegroundColor, mxUtils.bind(this, function(u) {
      g.cellEditor.restoreSelection(h);
      document.execCommand(b, !1, u != mxConstants.NONE ? u : 'transparent');
      var m = {
        forecolor: mxConstants.STYLE_FONTCOLOR,
        backcolor: mxConstants.STYLE_LABEL_BACKGROUNDCOLOR
      } [b];
      null != m && e.fireEvent(new mxEventObject('styleChanged', 'keys', [m], 'values', [u], 'cells', [g.cellEditor.getEditingCell()]));
    }), function() {
      g.cellEditor.restoreSelection(h);
    });
    this.editorUi.showDialog(a.container, 230, d, !0, !0);
    a.init();
  } else {
    null == this.colorDialog && (this.colorDialog = new ColorDialog(this.editorUi));
    this.colorDialog.currentColorKey = a;
    f = g.getView().getState(g.getSelectionCell());
    var n = mxConstants.NONE;
    null != f && (n = f.style[a] || n);
    n == mxConstants.NONE ? (n = g.shapeBackgroundColor.substring(1), this.colorDialog.picker.fromString(n), this.colorDialog.colorInput.value = mxConstants.NONE) : this.colorDialog.picker.fromString(mxUtils.rgba2hex(n));
    this.editorUi.showDialog(this.colorDialog.container, 230, d, !0, !0);
    this.colorDialog.init();
  }
};
Menus.prototype.toggleStyle = function(a, b) {
  var f = this.editorUi.editor.graph;
  b = f.toggleCellStyles(a, b);
  this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', [a], 'values', [b], 'cells', f.getSelectionCells()));
};
Menus.prototype.addMenuItem = function(a, b, f, e, g, d) {
  var h = this.editorUi.actions.get(b);
  return null != h && (a.showDisabled || h.isEnabled()) && h.visible ? (b = a.addItem(d || h.label, null, function(n) {
    h.funct(e, n);
  }, f, g, h.isEnabled()), h.toggleAction && h.isSelected() && a.addCheckmark(b, Editor.checkmarkImage), a.hideShortcuts || this.addShortcut(b, h), b) : null;
};
Menus.prototype.addShortcut = function(a, b) {
  if (null != b.shortcut) {
    a = a.firstChild.nextSibling.nextSibling;
    var f = document.createElement('span');
    f.style.color = 'gray';
    mxUtils.write(f, b.shortcut);
    a.appendChild(f);
  }
};
Menus.prototype.addMenuItems = function(a, b, f, e, g) {
  for (var d = 0; d < b.length; d++)
    '-' == b[d] ? a.addSeparator(f) : this.addMenuItem(a, b[d], f, e, null != g ? g[d] : null);
};
Menus.prototype.createPopupMenu = function(a, b, f) {
  a.smartSeparators = !0;
  a.hideShortcuts = !0;
  this.addPopupMenuItems(a, b, f);
};
Menus.prototype.addPopupMenuItems = function(a, b, f) {
  this.addPopupMenuHistoryItems(a, b, f);
  this.addPopupMenuEditItems(a, b, f);
  this.isShowStyleItems() && this.addPopupMenuStyleItems(a, b, f);
  this.isShowArrangeItems() && this.addPopupMenuArrangeItems(a, b, f);
  this.addPopupMenuCellItems(a, b, f);
  this.addPopupMenuSelectionItems(a, b, f);
};
Menus.prototype.addPopupMenuHistoryItems = function(a, b, f) {
  this.editorUi.editor.graph.isSelectionEmpty() && this.addMenuItems(a, [
    'undo',
    'redo'
  ], null, f);
};
Menus.prototype.addPopupMenuEditItems = function(a, b, f) {
  this.editorUi.editor.graph.isSelectionEmpty() ? this.addMenuItems(a, ['pasteHere'], null, f) : this.addMenuItems(a, 'cut copy duplicate - delete lockUnlock'.split(' '), null, f);
};
Menus.prototype.isShowStyleItems = function() {
  return !0;
};
Menus.prototype.addPopupMenuStyleItems = function(a, b, f) {
  1 == this.editorUi.editor.graph.getSelectionCount() ? this.addMenuItems(a, [
    '-',
    'setAsDefaultStyle'
  ], null, f) : this.editorUi.editor.graph.isSelectionEmpty() && this.addMenuItems(a, [
    '-',
    'clearDefaultStyle'
  ], null, f);
};
Menus.prototype.isShowArrangeItems = function() {
  return !0;
};
Menus.prototype.addPopupMenuArrangeItems = function(a, b, f) {
  var e = this.editorUi.editor.graph;
  (1 < e.getSelectionCount() || 0 < e.getSelectionCount() && !e.getModel().isEdge(b) && !e.isSwimlane(b) && 0 < e.getModel().getChildCount(b) && e.isCellEditable(b)) && this.addMenuItems(a, [
    'group',
    'ungroup'
  ], null, f);
  b = e.getEditableCells(e.getSelectionCells()).length;
  1 < b && (a.addSeparator(), this.addSubmenu('align', a), this.addSubmenu('distribute', a));
  1 <= b && (this.addMenuItems(a, [
    '-',
    'toFront',
    'toBack'
  ], null, f), this.isShowCellEditItems() && 1 == e.getSelectionCount() && this.addMenuItems(a, [
    'bringForward',
    'sendBackward'
  ], null, f));
};
Menus.prototype.addPopupMenuCellItems = function(a, b, f) {
  var e = this.editorUi.editor.graph,
    g = e.view.getState(b);
  if (null != g) {
    var d = e.getModel().getGeometry(b);
    d = null != d && null != d.points && 0 < d.points.length;
    this.isShowStyleItems() && 1 == e.getSelectionCount() && e.getModel().isEdge(b) && (a.addSeparator(), this.addSubmenu('line', a));
    if (e.getModel().isEdge(b) && 'entityRelationEdgeStyle' != mxUtils.getValue(g.style, mxConstants.STYLE_EDGE, null) && 'arrow' != mxUtils.getValue(g.style, mxConstants.STYLE_SHAPE, null)) {
      g = e.selectionCellsHandler.getHandler(b);
      var h = !1;
      if (d && g instanceof mxEdgeHandler && null != g.bends && 2 < g.bends.length) {
        var n = g.getHandleForEvent(e.updateMouseEvent(new mxMouseEvent(f)));
        0 < n && n < g.bends.length - 1 && (null == g.bends[n] || null == g.bends[n].node || '' == g.bends[n].node.style.opacity) && (h = this.editorUi.actions.get('removeWaypoint'), h.handler = g, h.index = n, h = !0);
      }
      this.isShowCellEditItems() && this.addMenuItem(a, 'turn', null, f, null, mxResources.get('reverse'));
      this.addMenuItems(a, [h ? 'removeWaypoint' : 'addWaypoint'], null, f);
    }
    1 == e.getSelectionCount() && this.isShowCellEditItems() && (d || e.getModel().isVertex(b) && 0 < e.getModel().getEdgeCount(b)) && this.addMenuItems(a, ['clearWaypoints'], null, f);
    this.isShowCellEditItems() && 1 == e.getSelectionCount() && e.isCellEditable(b) && this.addPopupMenuCellEditItems(a, b, f);
  }
};
Menus.prototype.isShowCellEditItems = function() {
  return !0;
};
Menus.prototype.addPopupMenuCellEditItems = function(a, b, f, e) {
  var g = this.editorUi.editor.graph,
    d = g.view.getState(b);
  this.addMenuItems(a, [
    '-',
    'editStyle',
    'editData',
    'editLink'
  ], e, f);
  g.getModel().isVertex(b) && null != mxUtils.getValue(d.style, mxConstants.STYLE_IMAGE, null) && (a.addSeparator(), this.addMenuItem(a, 'image', e, f).firstChild.nextSibling.innerHTML = mxResources.get('editImage') + '...', this.addMenuItem(a, 'crop', e, f));
  (g.getModel().isVertex(b) && 0 == g.getModel().getChildCount(b) || g.isContainer(b)) && this.addMenuItem(a, 'editConnectionPoints', e, f);
};
Menus.prototype.addPopupMenuSelectionItems = function(a, b, f) {
  this.editorUi.editor.graph.isSelectionEmpty() && this.addMenuItems(a, [
    '-',
    'selectAll',
    'selectVertices',
    'selectEdges'
  ], null, f);
};
Menus.prototype.createMenubar = function(a) {
  for (var b = new Menubar(this.editorUi, a), f = this.defaultMenuItems, e = 0; e < f.length; e++)
    mxUtils.bind(this, function(g) {
      var d = b.addMenu(mxResources.get(f[e]), mxUtils.bind(this, function() {
        g.funct.apply(this, arguments);
      }));
      this.menuCreated(g, d);
    })(this.get(f[e]));
  return b;
};
Menus.prototype.menuCreated = function(a, b, f) {
  null != b && (f = null != f ? f : 'geItem', b.className = f, a.addListener('stateChanged', function() {
    (b.enabled = a.enabled) ? (b.className = f, 8 == document.documentMode && (b.style.color = '')) : (b.className = f + ' mxDisabled', 8 == document.documentMode && (b.style.color = '#c3c3c3'));
  }));
};