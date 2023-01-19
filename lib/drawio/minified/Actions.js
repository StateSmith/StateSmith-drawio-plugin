function Actions(a) {
  this.editorUi = a;
  this.actions = {};
  this.init();
}
Actions.prototype.init = function() {
  function a(m) {
    d.escape();
    m = d.deleteCells(d.getDeletableCells(d.getSelectionCells()), m);
    null != m && d.setSelectionCells(m);
  }

  function b() {
    if (!d.isSelectionEmpty()) {
      d.getModel().beginUpdate();
      try {
        for (var m = d.getSelectionCells(), p = 0; p < m.length; p++)
          d.cellLabelChanged(m[p], '');
      } finally {
        d.getModel().endUpdate();
      }
    }
  }

  function f(m, p, x, A, C) {
    C.getModel().beginUpdate();
    try {
      var D = C.getCellGeometry(m);
      null != D && x && A && (x /= A, D = D.clone(), 1 < x ? D.height = D.width / x : D.width = D.height * x, C.getModel().setGeometry(m, D));
      C.setCellStyles(mxConstants.STYLE_CLIP_PATH, p, [m]);
      C.setCellStyles(mxConstants.STYLE_ASPECT, 'fixed', [m]);
    } finally {
      C.getModel().endUpdate();
    }
  }
  var e = this.editorUi,
    g = e.editor,
    d = g.graph,
    h = function() {
      return Action.prototype.isEnabled.apply(this, arguments) && d.isEnabled();
    };
  this.addAction('new...', function() {
    d.openLink(e.getUrl());
  });
  this.addAction('open...', function() {
    window.openNew = !0;
    window.openKey = 'open';
    e.openFile();
  });
  this.put('smartFit', new Action(mxResources.get('fitWindow') + ' / ' + mxResources.get('resetView'), function() {
    d.popupMenuHandler.hideMenu();
    var m = d.view.scale,
      p = d.container.scrollLeft,
      x = d.container.scrollTop,
      A = d.view.translate.x,
      C = d.view.translate.y;
    e.actions.get('resetView').funct();
    0.00001 > Math.abs(m - d.view.scale) && p == d.container.scrollLeft && x == d.container.scrollTop && A == d.view.translate.x && C == d.view.translate.y && e.actions.get(d.pageVisible ? 'fitPage' : 'fitWindow').funct();
  }, null, null, 'Enter'));
  this.addAction('keyPressEnter', function() {
    d.isEnabled() && (d.isSelectionEmpty() ? e.actions.get('smartFit').funct() : d.startEditingAtCell());
  });
  this.addAction('import...', function() {
    window.openNew = !1;
    window.openKey = 'import';
    window.openFile = new OpenFile(mxUtils.bind(this, function() {
      e.hideDialog();
    }));
    window.openFile.setConsumer(mxUtils.bind(this, function(m, p) {
      try {
        var x = mxUtils.parseXml(m);
        g.graph.setSelectionCells(g.graph.importGraphModel(x.documentElement));
      } catch (A) {
        mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + A.message);
      }
    }));
    e.showDialog(new OpenDialog(this).container, 320, 220, !0, !0, function() {
      window.openFile = null;
    });
  }).isEnabled = h;
  this.addAction('save', function() {
    e.saveFile(!1);
  }, null, null, Editor.ctrlKey + '+S').isEnabled = h;
  this.addAction('saveAs...', function() {
    e.saveFile(!0);
  }, null, null, Editor.ctrlKey + '+Shift+S').isEnabled = h;
  this.addAction('export...', function() {
    e.showDialog(new ExportDialog(e).container, 300, 340, !0, !0);
  });
  this.addAction('editDiagram...', function() {
    var m = new EditDiagramDialog(e);
    e.showDialog(m.container, 620, 420, !0, !1);
    m.init();
  });
  this.addAction('pageSetup...', function() {
    e.showDialog(new PageSetupDialog(e).container, 320, 240, !0, !0);
  }).isEnabled = h;
  this.addAction('print...', function() {
    e.showDialog(new PrintDialog(e).container, 300, 180, !0, !0);
  }, null, 'sprite-print', Editor.ctrlKey + '+P');
  this.addAction('preview', function() {
    mxUtils.show(d, null, 10, 10);
  });
  this.addAction('undo', function() {
    e.undo();
  }, null, 'sprite-undo', Editor.ctrlKey + '+Z');
  this.addAction('redo', function() {
    e.redo();
  }, null, 'sprite-redo', mxClient.IS_WIN ? Editor.ctrlKey + '+Y' : Editor.ctrlKey + '+Shift+Z');
  this.addAction('cut', function() {
    var m = null;
    try {
      m = e.copyXml(), null != m && d.removeCells(m, !1);
    } catch (p) {}
    null == m && mxClipboard.cut(d);
  }, null, 'sprite-cut', Editor.ctrlKey + '+X');
  this.addAction('copy', function() {
    try {
      e.copyXml();
    } catch (m) {}
    try {
      mxClipboard.copy(d);
    } catch (m) {
      e.handleError(m);
    }
  }, null, 'sprite-copy', Editor.ctrlKey + '+C');
  this.addAction('paste', function() {
    if (d.isEnabled() && !d.isCellLocked(d.getDefaultParent())) {
      var m = !1;
      try {
        Editor.enableNativeCipboard && (e.readGraphModelFromClipboard(function(p) {
          if (null != p) {
            d.getModel().beginUpdate();
            try {
              e.pasteXml(p, !0);
            } finally {
              d.getModel().endUpdate();
            }
          } else
            mxClipboard.paste(d);
        }), m = !0);
      } catch (p) {}
      m || mxClipboard.paste(d);
    }
  }, !1, 'sprite-paste', Editor.ctrlKey + '+V');
  this.addAction('pasteHere', function(m) {
    function p(A) {
      if (null != A) {
        for (var C = !0, D = 0; D < A.length && C; D++)
          C = C && d.model.isEdge(A[D]);
        var G = d.view.translate;
        D = d.view.scale;
        var F = G.x,
          K = G.y;
        G = null;
        if (1 == A.length && C) {
          var P = d.getCellGeometry(A[0]);
          null != P && (G = P.getTerminalPoint(!0));
        }
        G = null != G ? G : d.getBoundingBoxFromGeometry(A, C);
        null != G && (C = Math.round(d.snap(d.popupMenuHandler.triggerX / D - F)), D = Math.round(d.snap(d.popupMenuHandler.triggerY / D - K)), d.cellsMoved(A, C - G.x, D - G.y));
      }
    }

    function x() {
      d.getModel().beginUpdate();
      try {
        p(mxClipboard.paste(d));
      } finally {
        d.getModel().endUpdate();
      }
    }
    if (d.isEnabled() && !d.isCellLocked(d.getDefaultParent())) {
      m = !1;
      try {
        Editor.enableNativeCipboard && (e.readGraphModelFromClipboard(function(A) {
          if (null != A) {
            d.getModel().beginUpdate();
            try {
              p(e.pasteXml(A, !0));
            } finally {
              d.getModel().endUpdate();
            }
          } else
            x();
        }), m = !0);
      } catch (A) {}
      m || x();
    }
  });
  this.addAction('copySize', function() {
    var m = d.getSelectionCell();
    d.isEnabled() && null != m && d.getModel().isVertex(m) && (m = d.getCellGeometry(m), null != m && (e.copiedSize = new mxRectangle(m.x, m.y, m.width, m.height)));
  }, null, null, 'Alt+Shift+X');
  this.addAction('pasteSize', function() {
    if (d.isEnabled() && !d.isSelectionEmpty() && null != e.copiedSize) {
      d.getModel().beginUpdate();
      try {
        for (var m = d.getResizableCells(d.getSelectionCells()), p = 0; p < m.length; p++)
          if (d.getModel().isVertex(m[p])) {
            var x = d.getCellGeometry(m[p]);
            null != x && (x = x.clone(), x.width = e.copiedSize.width, x.height = e.copiedSize.height, d.getModel().setGeometry(m[p], x));
          }
      } finally {
        d.getModel().endUpdate();
      }
    }
  }, null, null, 'Alt+Shift+V');
  this.addAction('copyData', function() {
    var m = d.getSelectionCell() || d.getModel().getRoot();
    d.isEnabled() && null != m && (m = m.cloneValue(), null == m || isNaN(m.nodeType) || (e.copiedValue = m));
  }, null, null, 'Alt+Shift+B');
  this.addAction('pasteData', function(m, p) {
    function x(D, G) {
      var F = A.getValue(D);
      G = D.cloneValue(G);
      G.removeAttribute('placeholders');
      null == F || isNaN(F.nodeType) || G.setAttribute('placeholders', F.getAttribute('placeholders'));
      null != m && mxEvent.isShiftDown(m) || G.setAttribute('label', d.convertValueToString(D));
      A.setValue(D, G);
    }
    m = null != p ? p : m;
    var A = d.getModel();
    if (d.isEnabled() && !d.isSelectionEmpty() && null != e.copiedValue) {
      A.beginUpdate();
      try {
        var C = d.getEditableCells(d.getSelectionCells());
        if (0 == C.length)
          x(A.getRoot(), e.copiedValue);
        else
          for (p = 0; p < C.length; p++)
            x(C[p], e.copiedValue);
      } finally {
        A.endUpdate();
      }
    }
  }, null, null, 'Alt+Shift+E');
  this.addAction('delete', function(m, p) {
    m = null != p ? p : m;
    null != m && mxEvent.isShiftDown(m) ? b() : a(null != m && (mxEvent.isControlDown(m) || mxEvent.isMetaDown(m) || mxEvent.isAltDown(m)));
  }, null, null, 'Delete');
  this.addAction('deleteAll', function() {
    a(!0);
  });
  this.addAction('deleteLabels', function() {
    b();
  }, null, null, Editor.ctrlKey + '+Delete');
  this.addAction('duplicate', function() {
    try {
      d.setSelectionCells(d.duplicateCells()), d.scrollCellToVisible(d.getSelectionCell());
    } catch (m) {
      e.handleError(m);
    }
  }, null, null, Editor.ctrlKey + '+D');
  this.put('mergeCells', new Action(mxResources.get('merge'), function() {
    var m = e.getSelectionState();
    if (null != m.mergeCell) {
      d.getModel().beginUpdate();
      try {
        d.setCellStyles('rowspan', m.rowspan, [m.mergeCell]), d.setCellStyles('colspan', m.colspan, [m.mergeCell]);
      } finally {
        d.getModel().endUpdate();
      }
    }
  }));
  this.put('unmergeCells', new Action(mxResources.get('unmerge'), function() {
    var m = e.getSelectionState();
    if (0 < m.cells.length) {
      d.getModel().beginUpdate();
      try {
        d.setCellStyles('rowspan', null, m.cells), d.setCellStyles('colspan', null, m.cells);
      } finally {
        d.getModel().endUpdate();
      }
    }
  }));
  this.put('turn', new Action(mxResources.get('turn') + ' / ' + mxResources.get('reverse'), function(m, p) {
    m = null != p ? p : m;
    d.turnShapes(d.getResizableCells(d.getSelectionCells()), null != m ? mxEvent.isShiftDown(m) : !1);
  }, null, null, mxClient.IS_SF ? null : Editor.ctrlKey + '+R'));
  this.put('selectConnections', new Action(mxResources.get('selectEdges'), function(m) {
    m = d.getSelectionCell();
    d.isEnabled() && null != m && d.addSelectionCells(d.getEdges(m));
  }));
  this.addAction('selectVertices', function() {
    d.selectVertices(null, !0);
  }, null, null, Editor.ctrlKey + '+Shift+I');
  this.addAction('selectEdges', function() {
    d.selectEdges();
  }, null, null, Editor.ctrlKey + '+Shift+E');
  this.addAction('selectAll', function() {
    d.selectAll(null, !0);
  }, null, null, Editor.ctrlKey + '+A');
  this.addAction('selectNone', function() {
    d.clearSelection();
  }, null, null, Editor.ctrlKey + '+Shift+A');
  this.addAction('lockUnlock', function() {
    if (!d.isSelectionEmpty()) {
      d.getModel().beginUpdate();
      try {
        var m = d.getSelectionCells(),
          p = d.getCurrentCellStyle(d.getSelectionCell()),
          x = 1 == mxUtils.getValue(p, mxConstants.STYLE_EDITABLE, 1) ? 0 : 1;
        d.setCellStyles(mxConstants.STYLE_MOVABLE, x, m);
        d.setCellStyles(mxConstants.STYLE_RESIZABLE, x, m);
        d.setCellStyles(mxConstants.STYLE_ROTATABLE, x, m);
        d.setCellStyles(mxConstants.STYLE_DELETABLE, x, m);
        d.setCellStyles(mxConstants.STYLE_EDITABLE, x, m);
        d.setCellStyles('connectable', x, m);
      } finally {
        d.getModel().endUpdate();
      }
    }
  }, null, null, Editor.ctrlKey + '+L');
  this.addAction('home', function() {
    d.home();
  }, null, null, 'Shift+Home');
  this.addAction('exitGroup', function() {
    d.exitGroup();
  }, null, null, Editor.ctrlKey + '+Shift+Home');
  this.addAction('enterGroup', function() {
    d.enterGroup();
  }, null, null, Editor.ctrlKey + '+Shift+End');
  this.addAction('collapse', function() {
    d.foldCells(!0);
  }, null, null, Editor.ctrlKey + '+Home');
  this.addAction('expand', function() {
    d.foldCells(!1);
  }, null, null, Editor.ctrlKey + '+End');
  this.addAction('toFront', function() {
    d.orderCells(!1);
  }, null, null, Editor.ctrlKey + '+Shift+F');
  this.addAction('toBack', function() {
    d.orderCells(!0);
  }, null, null, Editor.ctrlKey + '+Shift+B');
  this.addAction('bringForward', function(m) {
    d.orderCells(!1, null, !0);
  });
  this.addAction('sendBackward', function(m) {
    d.orderCells(!0, null, !0);
  });
  this.addAction('group', function() {
    if (d.isEnabled()) {
      var m = mxUtils.sortCells(d.getSelectionCells(), !0);
      1 != m.length || d.isTable(m[0]) || d.isTableRow(m[0]) ? (m = d.getCellsForGroup(m), 1 < m.length && d.setSelectionCell(d.groupCells(null, 0, m))) : d.setCellStyles('container', '1');
    }
  }, null, null, Editor.ctrlKey + '+G');
  this.addAction('ungroup', function() {
    if (d.isEnabled()) {
      var m = d.getEditableCells(d.getSelectionCells());
      d.model.beginUpdate();
      try {
        var p = d.ungroupCells();
        if (null != m)
          for (var x = 0; x < m.length; x++)
            d.model.contains(m[x]) && (0 == d.model.getChildCount(m[x]) && d.model.isVertex(m[x]) && d.setCellStyles('container', '0', [m[x]]), p.push(m[x]));
      } finally {
        d.model.endUpdate();
      }
      0 < p.length && d.setSelectionCells(p);
    }
  }, null, null, Editor.ctrlKey + '+Shift+U');
  this.addAction('removeFromGroup', function() {
    if (d.isEnabled()) {
      var m = d.getSelectionCells();
      if (null != m) {
        for (var p = [], x = 0; x < m.length; x++)
          d.isTableRow(m[x]) || d.isTableCell(m[x]) || p.push(m[x]);
        d.removeCellsFromParent(p);
      }
    }
  });
  this.addAction('edit', function() {
    d.isEnabled() && d.startEditingAtCell();
  }, null, null, 'F2/Enter');
  this.addAction('editData...', function() {
    var m = d.getSelectionCell() || d.getModel().getRoot();
    e.showDataDialog(m);
  }, null, null, Editor.ctrlKey + '+M');
  this.addAction('editTooltip...', function() {
    var m = d.getSelectionCell();
    if (d.isEnabled() && null != m && d.isCellEditable(m)) {
      var p = '';
      if (mxUtils.isNode(m.value)) {
        var x = null;
        Graph.translateDiagram && null != Graph.diagramLanguage && m.value.hasAttribute('tooltip_' + Graph.diagramLanguage) && (x = m.value.getAttribute('tooltip_' + Graph.diagramLanguage));
        null == x && (x = m.value.getAttribute('tooltip'));
        null != x && (p = x);
      }
      p = new TextareaDialog(e, mxResources.get('editTooltip') + ':', p, function(A) {
        d.setTooltipForCell(m, A);
      });
      e.showDialog(p.container, 320, 200, !0, !0);
      p.init();
    }
  }, null, null, 'Alt+Shift+T');
  this.addAction('openLink', function() {
    var m = d.getLinkForCell(d.getSelectionCell());
    null != m && d.openLink(m);
  });
  this.addAction('editLink...', function() {
    var m = d.getSelectionCell();
    if (d.isEnabled() && null != m && d.isCellEditable(m)) {
      var p = d.getLinkForCell(m) || '';
      e.showLinkDialog(p, mxResources.get('apply'), function(x, A, C) {
        x = mxUtils.trim(x);
        d.setLinkForCell(m, 0 < x.length ? x : null);
        d.setAttributeForCell(m, 'linkTarget', C);
      }, !0, d.getLinkTargetForCell(m));
    }
  }, null, null, 'Alt+Shift+L');
  this.put('insertImage', new Action(mxResources.get('image') + '...', function() {
    d.isEnabled() && !d.isCellLocked(d.getDefaultParent()) && (d.clearSelection(), e.actions.get('image').funct());
  })).isEnabled = h;
  this.addAction('editImage...', function() {
    e.actions.get('image').funct();
  });
  this.put('insertLink', new Action(mxResources.get('link') + '...', function() {
    d.isEnabled() && !d.isCellLocked(d.getDefaultParent()) && e.showLinkDialog('', mxResources.get('insert'), function(m, p, x) {
      m = mxUtils.trim(m);
      if (0 < m.length) {
        var A = null,
          C = d.getLinkTitle(m);
        null != p && 0 < p.length && (A = p[0].iconUrl, C = p[0].name || p[0].type, C = C.charAt(0).toUpperCase() + C.substring(1), 30 < C.length && (C = C.substring(0, 30) + '...'));
        p = new mxCell(C, new mxGeometry(0, 0, 100, 40), 'fontColor=#0000EE;fontStyle=4;rounded=1;overflow=hidden;' + (null != A ? 'shape=label;imageWidth=16;imageHeight=16;spacingLeft=26;align=left;image=' + A : 'spacing=10;'));
        p.vertex = !0;
        A = d.getCenterInsertPoint(d.getBoundingBoxFromGeometry([p], !0));
        p.geometry.x = A.x;
        p.geometry.y = A.y;
        d.setAttributeForCell(p, 'linkTarget', x);
        d.setLinkForCell(p, m);
        d.cellSizeUpdated(p, !0);
        d.getModel().beginUpdate();
        try {
          p = d.addCell(p), d.fireEvent(new mxEventObject('cellsInserted', 'cells', [p]));
        } finally {
          d.getModel().endUpdate();
        }
        d.setSelectionCell(p);
        d.scrollCellToVisible(d.getSelectionCell());
      }
    }, !0);
  }, null, null, 'L')).isEnabled = h;
  this.addAction('link...', mxUtils.bind(this, function() {
    if (d.isEnabled())
      if (d.cellEditor.isContentEditing()) {
        var m = d.getSelectedElement(),
          p = d.getParentByName(m, 'A', d.cellEditor.textarea),
          x = '';
        if (null == p && null != m && null != m.getElementsByTagName)
          for (var A = m.getElementsByTagName('a'), C = 0; C < A.length && null == p; C++)
            A[C].textContent == m.textContent && (p = A[C]);
        null != p && 'A' == p.nodeName && (x = p.getAttribute('href') || '', d.selectNode(p));
        var D = d.cellEditor.saveSelection();
        e.showLinkDialog(x, mxResources.get('apply'), mxUtils.bind(this, function(G) {
          d.cellEditor.restoreSelection(D);
          null != G && d.insertLink(G);
        }));
      } else
        d.isSelectionEmpty() ? this.get('insertLink').funct() : this.get('editLink').funct();
  })).isEnabled = h;
  this.addAction('autosize', function() {
    var m = d.getSelectionCells();
    if (null != m) {
      d.getModel().beginUpdate();
      try {
        for (var p = 0; p < m.length; p++) {
          var x = m[p];
          d.getModel().isVertex(x) && (0 < d.getModel().getChildCount(x) ? d.updateGroupBounds([x], 0, !0) : d.updateCellSize(x));
        }
      } finally {
        d.getModel().endUpdate();
      }
    }
  }, null, null, Editor.ctrlKey + '+Shift+Y');
  this.addAction('snapToGrid', function() {
    d.snapCellsToGrid(d.getSelectionCells(), d.gridSize);
  });
  this.addAction('formattedText', function() {
    d.stopEditing();
    var m = d.getCommonStyle(d.getSelectionCells());
    m = '1' == mxUtils.getValue(m, 'html', '0') ? null : '1';
    d.getModel().beginUpdate();
    try {
      for (var p = d.getEditableCells(d.getSelectionCells()), x = 0; x < p.length; x++)
        if (state = d.getView().getState(p[x]), null != state) {
          var A = mxUtils.getValue(state.style, 'html', '0');
          if ('1' == A && null == m) {
            var C = d.convertValueToString(state.cell);
            '0' != mxUtils.getValue(state.style, 'nl2Br', '1') && (C = C.replace(/\n/g, '').replace(/<br\s*.?>/g, '\n'));
            var D = document.createElement('div');
            D.innerHTML = Graph.sanitizeHtml(C);
            C = mxUtils.extractTextWithWhitespace(D.childNodes);
            d.cellLabelChanged(state.cell, C);
            d.setCellStyles('html', m, [p[x]]);
          } else
            '0' == A && '1' == m && (C = mxUtils.htmlEntities(d.convertValueToString(state.cell), !1), '0' != mxUtils.getValue(state.style, 'nl2Br', '1') && (C = C.replace(/\n/g, '<br/>')), d.cellLabelChanged(state.cell, Graph.sanitizeHtml(C)), d.setCellStyles('html', m, [p[x]]));
        }
      e.fireEvent(new mxEventObject('styleChanged', 'keys', ['html'], 'values', [null != m ? m : '0'], 'cells', p));
    } finally {
      d.getModel().endUpdate();
    }
  });
  this.addAction('wordWrap', function() {
    var m = d.getView().getState(d.getSelectionCell()),
      p = 'wrap';
    d.stopEditing();
    null != m && 'wrap' == m.style[mxConstants.STYLE_WHITE_SPACE] && (p = null);
    d.setCellStyles(mxConstants.STYLE_WHITE_SPACE, p);
  });
  this.addAction('rotation', function() {
    var m = '0',
      p = d.getView().getState(d.getSelectionCell());
    null != p && (m = p.style[mxConstants.STYLE_ROTATION] || m);
    m = new FilenameDialog(e, m, mxResources.get('apply'), function(x) {
      null != x && 0 < x.length && d.setCellStyles(mxConstants.STYLE_ROTATION, x);
    }, mxResources.get('enterValue') + ' (' + mxResources.get('rotation') + ' 0-360)');
    e.showDialog(m.container, 375, 80, !0, !0);
    m.init();
  });
  this.addAction('resetView', function() {
    d.zoomTo(1);
    e.resetScrollbars();
  }, null, null, 'Enter/Home');
  this.addAction('zoomIn', function(m) {
    d.isFastZoomEnabled() ? d.lazyZoom(!0, !0, e.buttonZoomDelay) : d.zoomIn();
  }, null, null, Editor.ctrlKey + ' + (Numpad) / Alt+Mousewheel');
  this.addAction('zoomOut', function(m) {
    d.isFastZoomEnabled() ? d.lazyZoom(!1, !0, e.buttonZoomDelay) : d.zoomOut();
  }, null, null, Editor.ctrlKey + ' - (Numpad) / Alt+Mousewheel');
  this.addAction('fitWindow', function() {
    var m = d.isSelectionEmpty() ? d.getGraphBounds() : d.getBoundingBox(d.getSelectionCells()),
      p = d.view.translate,
      x = d.view.scale;
    m.x = m.x / x - p.x;
    m.y = m.y / x - p.y;
    m.width /= x;
    m.height /= x;
    null != d.backgroundImage && (m = mxRectangle.fromRectangle(m), m.add(new mxRectangle(0, 0, d.backgroundImage.width, d.backgroundImage.height)));
    0 == m.width || 0 == m.height ? (d.zoomTo(1), e.resetScrollbars()) : (p = Editor.fitWindowBorders, null != p && (m.x -= p.x, m.y -= p.y, m.width += p.width + p.x, m.height += p.height + p.y), d.fitWindow(m));
  }, null, null, Editor.ctrlKey + '+Shift+H');
  this.addAction('fitPage', mxUtils.bind(this, function() {
    d.pageVisible || this.get('pageView').funct();
    var m = d.pageFormat,
      p = d.pageScale;
    d.zoomTo(Math.floor(20 * Math.min((d.container.clientWidth - 10) / m.width / p, (d.container.clientHeight - 10) / m.height / p)) / 20);
    mxUtils.hasScrollbars(d.container) && (m = d.getPagePadding(), d.container.scrollTop = m.y * d.view.scale - 1, d.container.scrollLeft = Math.min(m.x * d.view.scale, (d.container.scrollWidth - d.container.clientWidth) / 2) - 1);
  }), null, null, Editor.ctrlKey + '+J');
  this.addAction('fitTwoPages', mxUtils.bind(this, function() {
    d.pageVisible || this.get('pageView').funct();
    var m = d.pageFormat,
      p = d.pageScale;
    d.zoomTo(Math.floor(20 * Math.min((d.container.clientWidth - 10) / (2 * m.width) / p, (d.container.clientHeight - 10) / m.height / p)) / 20);
    mxUtils.hasScrollbars(d.container) && (m = d.getPagePadding(), d.container.scrollTop = Math.min(m.y, (d.container.scrollHeight - d.container.clientHeight) / 2), d.container.scrollLeft = Math.min(m.x, (d.container.scrollWidth - d.container.clientWidth) / 2));
  }), null, null, Editor.ctrlKey + '+Shift+J');
  this.addAction('fitPageWidth', mxUtils.bind(this, function() {
    d.pageVisible || this.get('pageView').funct();
    d.zoomTo(Math.floor(20 * (d.container.clientWidth - 10) / d.pageFormat.width / d.pageScale) / 20);
    if (mxUtils.hasScrollbars(d.container)) {
      var m = d.getPagePadding();
      d.container.scrollLeft = Math.min(m.x * d.view.scale, (d.container.scrollWidth - d.container.clientWidth) / 2);
    }
  }));
  this.put('customZoom', new Action(mxResources.get('custom') + '...', mxUtils.bind(this, function() {
    var m = new FilenameDialog(this.editorUi, parseInt(100 * d.getView().getScale()), mxResources.get('apply'), mxUtils.bind(this, function(p) {
      p = parseInt(p);
      !isNaN(p) && 0 < p && d.zoomTo(p / 100);
    }), mxResources.get('zoom') + ' (%)');
    this.editorUi.showDialog(m.container, 300, 80, !0, !0);
    m.init();
  }), null, null, Editor.ctrlKey + '+0'));
  this.addAction('pageScale...', mxUtils.bind(this, function() {
    var m = new FilenameDialog(this.editorUi, parseInt(100 * d.pageScale), mxResources.get('apply'), mxUtils.bind(this, function(p) {
      p = parseInt(p);
      !isNaN(p) && 0 < p && (p = new ChangePageSetup(e, null, null, null, p / 100), p.ignoreColor = !0, p.ignoreImage = !0, d.model.execute(p));
    }), mxResources.get('pageScale') + ' (%)');
    this.editorUi.showDialog(m.container, 300, 80, !0, !0);
    m.init();
  }));
  var n = null;
  n = this.addAction('grid', function() {
    d.setGridEnabled(!d.isGridEnabled());
    d.defaultGridEnabled = d.isGridEnabled();
    e.fireEvent(new mxEventObject('gridEnabledChanged'));
  }, null, null, Editor.ctrlKey + '+Shift+G');
  n.setToggleAction(!0);
  n.setSelectedCallback(function() {
    return d.isGridEnabled();
  });
  n.setEnabled(!1);
  n = this.addAction('guides', function() {
    d.graphHandler.guidesEnabled = !d.graphHandler.guidesEnabled;
    e.fireEvent(new mxEventObject('guidesEnabledChanged'));
  });
  n.setToggleAction(!0);
  n.setSelectedCallback(function() {
    return d.graphHandler.guidesEnabled;
  });
  n.setEnabled(!1);
  n = this.addAction('tooltips', function() {
    d.tooltipHandler.setEnabled(!d.tooltipHandler.isEnabled());
    e.fireEvent(new mxEventObject('tooltipsEnabledChanged'));
  });
  n.setToggleAction(!0);
  n.setSelectedCallback(function() {
    return d.tooltipHandler.isEnabled();
  });
  n = this.addAction('collapseExpand', function() {
    var m = new ChangePageSetup(e);
    m.ignoreColor = !0;
    m.ignoreImage = !0;
    m.foldingEnabled = !d.foldingEnabled;
    d.model.execute(m);
  });
  n.setToggleAction(!0);
  n.setSelectedCallback(function() {
    return d.foldingEnabled;
  });
  n.isEnabled = h;
  n = this.addAction('pageView', mxUtils.bind(this, function() {
    e.setPageVisible(!d.pageVisible);
  }));
  n.setToggleAction(!0);
  n.setSelectedCallback(function() {
    return d.pageVisible;
  });
  n = this.addAction('connectionArrows', function() {
    d.connectionArrowsEnabled = !d.connectionArrowsEnabled;
    e.fireEvent(new mxEventObject('connectionArrowsChanged'));
  }, null, null, 'Alt+Shift+A');
  n.setToggleAction(!0);
  n.setSelectedCallback(function() {
    return d.connectionArrowsEnabled;
  });
  n = this.addAction('connectionPoints', function() {
    d.setConnectable(!d.connectionHandler.isEnabled());
    e.fireEvent(new mxEventObject('connectionPointsChanged'));
  }, null, null, 'Alt+Shift+P');
  n.setToggleAction(!0);
  n.setSelectedCallback(function() {
    return d.connectionHandler.isEnabled();
  });
  n = this.addAction('copyConnect', function() {
    d.connectionHandler.setCreateTarget(!d.connectionHandler.isCreateTarget());
    e.fireEvent(new mxEventObject('copyConnectChanged'));
  });
  n.setToggleAction(!0);
  n.setSelectedCallback(function() {
    return d.connectionHandler.isCreateTarget();
  });
  n.isEnabled = h;
  n = this.addAction('autosave', function() {
    e.editor.setAutosave(!e.editor.autosave);
  });
  n.setToggleAction(!0);
  n.setSelectedCallback(function() {
    return e.editor.autosave;
  });
  n.isEnabled = h;
  n.visible = !1;
  this.addAction('help', function() {
    var m = '';
    mxResources.isLanguageSupported(mxClient.language) && (m = '_' + mxClient.language);
    d.openLink(RESOURCES_PATH + '/help' + m + '.html');
  });
  var u = !1;
  this.put('about', new Action(mxResources.get('about') + ' Graph Editor...', function() {
    u || (e.showDialog(new AboutDialog(e).container, 320, 280, !0, !0, function() {
      u = !1;
    }), u = !0);
  }));
  n = mxUtils.bind(this, function(m, p, x, A) {
    return this.addAction(m, function() {
      if (null != x && d.cellEditor.isContentEditing())
        x();
      else {
        d.stopEditing(!1);
        d.getModel().beginUpdate();
        try {
          var C = d.getEditableCells(d.getSelectionCells());
          d.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, p, C);
          (p & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD ? d.updateLabelElements(C, function(G) {
            G.style.fontWeight = null;
            'B' == G.nodeName && d.replaceElement(G);
          }) : (p & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC ? d.updateLabelElements(C, function(G) {
            G.style.fontStyle = null;
            'I' == G.nodeName && d.replaceElement(G);
          }) : (p & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && d.updateLabelElements(C, function(G) {
            G.style.textDecoration = null;
            'U' == G.nodeName && d.replaceElement(G);
          });
          for (var D = 0; D < C.length; D++)
            0 == d.model.getChildCount(C[D]) && d.autoSizeCell(C[D], !1);
        } finally {
          d.getModel().endUpdate();
        }
      }
    }, null, null, A);
  });
  n('bold', mxConstants.FONT_BOLD, function() {
    document.execCommand('bold', !1, null);
  }, Editor.ctrlKey + '+B');
  n('italic', mxConstants.FONT_ITALIC, function() {
    document.execCommand('italic', !1, null);
  }, Editor.ctrlKey + '+I');
  n('underline', mxConstants.FONT_UNDERLINE, function() {
    document.execCommand('underline', !1, null);
  }, Editor.ctrlKey + '+U');
  this.addAction('fontColor...', function() {
    e.menus.pickColor(mxConstants.STYLE_FONTCOLOR, 'forecolor', '000000');
  });
  this.addAction('strokeColor...', function() {
    e.menus.pickColor(mxConstants.STYLE_STROKECOLOR);
  });
  this.addAction('fillColor...', function() {
    e.menus.pickColor(mxConstants.STYLE_FILLCOLOR);
  });
  this.addAction('gradientColor...', function() {
    e.menus.pickColor(mxConstants.STYLE_GRADIENTCOLOR);
  });
  this.addAction('backgroundColor...', function() {
    e.menus.pickColor(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, 'backcolor');
  });
  this.addAction('borderColor...', function() {
    e.menus.pickColor(mxConstants.STYLE_LABEL_BORDERCOLOR);
  });
  this.addAction('vertical', function() {
    e.menus.toggleStyle(mxConstants.STYLE_HORIZONTAL, !0);
  });
  this.addAction('shadow', function() {
    e.menus.toggleStyle(mxConstants.STYLE_SHADOW);
  });
  this.addAction('solid', function() {
    d.getModel().beginUpdate();
    try {
      d.setCellStyles(mxConstants.STYLE_DASHED, null), d.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null), e.fireEvent(new mxEventObject('styleChanged', 'keys', [
        mxConstants.STYLE_DASHED,
        mxConstants.STYLE_DASH_PATTERN
      ], 'values', [
        null,
        null
      ], 'cells', d.getSelectionCells()));
    } finally {
      d.getModel().endUpdate();
    }
  });
  this.addAction('dashed', function() {
    d.getModel().beginUpdate();
    try {
      d.setCellStyles(mxConstants.STYLE_DASHED, '1'), d.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null), e.fireEvent(new mxEventObject('styleChanged', 'keys', [
        mxConstants.STYLE_DASHED,
        mxConstants.STYLE_DASH_PATTERN
      ], 'values', [
        '1',
        null
      ], 'cells', d.getSelectionCells()));
    } finally {
      d.getModel().endUpdate();
    }
  });
  this.addAction('dotted', function() {
    d.getModel().beginUpdate();
    try {
      d.setCellStyles(mxConstants.STYLE_DASHED, '1'), d.setCellStyles(mxConstants.STYLE_DASH_PATTERN, '1 4'), e.fireEvent(new mxEventObject('styleChanged', 'keys', [
        mxConstants.STYLE_DASHED,
        mxConstants.STYLE_DASH_PATTERN
      ], 'values', [
        '1',
        '1 4'
      ], 'cells', d.getSelectionCells()));
    } finally {
      d.getModel().endUpdate();
    }
  });
  this.addAction('sharp', function() {
    d.getModel().beginUpdate();
    try {
      d.setCellStyles(mxConstants.STYLE_ROUNDED, '0'), d.setCellStyles(mxConstants.STYLE_CURVED, '0'), e.fireEvent(new mxEventObject('styleChanged', 'keys', [
        mxConstants.STYLE_ROUNDED,
        mxConstants.STYLE_CURVED
      ], 'values', [
        '0',
        '0'
      ], 'cells', d.getSelectionCells()));
    } finally {
      d.getModel().endUpdate();
    }
  });
  this.addAction('rounded', function() {
    d.getModel().beginUpdate();
    try {
      d.setCellStyles(mxConstants.STYLE_ROUNDED, '1'), d.setCellStyles(mxConstants.STYLE_CURVED, '0'), e.fireEvent(new mxEventObject('styleChanged', 'keys', [
        mxConstants.STYLE_ROUNDED,
        mxConstants.STYLE_CURVED
      ], 'values', [
        '1',
        '0'
      ], 'cells', d.getSelectionCells()));
    } finally {
      d.getModel().endUpdate();
    }
  });
  this.addAction('toggleRounded', function() {
    if (!d.isSelectionEmpty() && d.isEnabled()) {
      d.getModel().beginUpdate();
      try {
        var m = d.getSelectionCells(),
          p = d.getCurrentCellStyle(m[0]),
          x = '1' == mxUtils.getValue(p, mxConstants.STYLE_ROUNDED, '0') ? '0' : '1';
        d.setCellStyles(mxConstants.STYLE_ROUNDED, x);
        d.setCellStyles(mxConstants.STYLE_CURVED, null);
        e.fireEvent(new mxEventObject('styleChanged', 'keys', [
          mxConstants.STYLE_ROUNDED,
          mxConstants.STYLE_CURVED
        ], 'values', [
          x,
          '0'
        ], 'cells', d.getSelectionCells()));
      } finally {
        d.getModel().endUpdate();
      }
    }
  });
  this.addAction('curved', function() {
    d.getModel().beginUpdate();
    try {
      d.setCellStyles(mxConstants.STYLE_ROUNDED, '0'), d.setCellStyles(mxConstants.STYLE_CURVED, '1'), e.fireEvent(new mxEventObject('styleChanged', 'keys', [
        mxConstants.STYLE_ROUNDED,
        mxConstants.STYLE_CURVED
      ], 'values', [
        '0',
        '1'
      ], 'cells', d.getSelectionCells()));
    } finally {
      d.getModel().endUpdate();
    }
  });
  this.addAction('collapsible', function() {
    var m = d.view.getState(d.getSelectionCell()),
      p = '1';
    null != m && null != d.getFoldingImage(m) && (p = '0');
    d.setCellStyles('collapsible', p);
    e.fireEvent(new mxEventObject('styleChanged', 'keys', ['collapsible'], 'values', [p], 'cells', d.getSelectionCells()));
  });
  this.addAction('editStyle...', mxUtils.bind(this, function() {
    var m = d.getEditableCells(d.getSelectionCells());
    if (null != m && 0 < m.length) {
      var p = d.getModel();
      p = new TextareaDialog(this.editorUi, mxResources.get('editStyle') + ':', p.getStyle(m[0]) || '', function(x) {
        null != x && d.setCellStyle(mxUtils.trim(x), m);
      }, null, null, 400, 220);
      this.editorUi.showDialog(p.container, 420, 300, !0, !0);
      p.init();
    }
  }), null, null, Editor.ctrlKey + '+E');
  this.addAction('setAsDefaultStyle', function() {
    d.isEnabled() && !d.isSelectionEmpty() && e.setDefaultStyle(d.getSelectionCell());
  }, null, null, Editor.ctrlKey + '+Shift+D');
  this.addAction('clearDefaultStyle', function() {
    d.isEnabled() && e.clearDefaultStyle();
  }, null, null, Editor.ctrlKey + '+Shift+R');
  this.addAction('addWaypoint', function() {
    var m = d.getSelectionCell();
    if (null != m && d.getModel().isEdge(m)) {
      var p = g.graph.selectionCellsHandler.getHandler(m);
      if (p instanceof mxEdgeHandler) {
        var x = d.view.translate,
          A = d.view.scale,
          C = x.x;
        x = x.y;
        m = d.getModel().getParent(m);
        for (var D = d.getCellGeometry(m); d.getModel().isVertex(m) && null != D;)
          C += D.x, x += D.y, m = d.getModel().getParent(m), D = d.getCellGeometry(m);
        C = Math.round(d.snap(d.popupMenuHandler.triggerX / A - C));
        A = Math.round(d.snap(d.popupMenuHandler.triggerY / A - x));
        p.addPointAt(p.state, C, A);
      }
    }
  });
  this.addAction('removeWaypoint', function() {
    var m = e.actions.get('removeWaypoint');
    null != m.handler && m.handler.removePoint(m.handler.state, m.index);
  });
  this.addAction('clearWaypoints', function(m, p) {
    m = null != p ? p : m;
    var x = d.getSelectionCells();
    if (null != x) {
      x = d.getEditableCells(d.addAllEdges(x));
      d.getModel().beginUpdate();
      try {
        for (var A = 0; A < x.length; A++) {
          var C = x[A];
          if (d.getModel().isEdge(C)) {
            var D = d.getCellGeometry(C);
            null != p && mxEvent.isShiftDown(m) ? (d.setCellStyles(mxConstants.STYLE_EXIT_X, null, [C]), d.setCellStyles(mxConstants.STYLE_EXIT_Y, null, [C]), d.setCellStyles(mxConstants.STYLE_ENTRY_X, null, [C]), d.setCellStyles(mxConstants.STYLE_ENTRY_Y, null, [C])) : null != D && (D = D.clone(), D.points = null, D.x = 0, D.y = 0, D.offset = null, d.getModel().setGeometry(C, D));
          }
        }
      } finally {
        d.getModel().endUpdate();
      }
    }
  }, null, null, 'Alt+Shift+C');
  n = this.addAction('subscript', mxUtils.bind(this, function() {
    d.cellEditor.isContentEditing() && document.execCommand('subscript', !1, null);
  }), null, null, Editor.ctrlKey + '+,');
  n = this.addAction('superscript', mxUtils.bind(this, function() {
    d.cellEditor.isContentEditing() && document.execCommand('superscript', !1, null);
  }), null, null, Editor.ctrlKey + '+.');
  this.addAction('image...', function() {
    if (d.isEnabled() && !d.isCellLocked(d.getDefaultParent())) {
      var m = mxResources.get('image') + ' (' + mxResources.get('url') + '):',
        p = d.getView().getState(d.getSelectionCell()),
        x = '',
        A = null;
      null != p && (x = p.style[mxConstants.STYLE_IMAGE] || x, A = p.style[mxConstants.STYLE_CLIP_PATH] || A);
      var C = d.cellEditor.saveSelection();
      e.showImageDialog(m, x, function(D, G, F, K, P, R) {
        if (d.cellEditor.isContentEditing())
          d.cellEditor.restoreSelection(C), d.insertImage(D, G, F);
        else {
          var Q = d.getSelectionCells();
          if (null != D && (0 < D.length || 0 < Q.length)) {
            var ba = null;
            d.getModel().beginUpdate();
            try {
              if (0 == Q.length) {
                Q = [d.insertVertex(d.getDefaultParent(), null, '', 0, 0, G, F, 'shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;')];
                var V = d.getCenterInsertPoint(d.getBoundingBoxFromGeometry(Q, !0));
                Q[0].geometry.x = V.x;
                Q[0].geometry.y = V.y;
                null != K && f(Q[0], K, P, R, d);
                ba = Q;
                d.fireEvent(new mxEventObject('cellsInserted', 'cells', ba));
              }
              d.setCellStyles(mxConstants.STYLE_IMAGE, 0 < D.length ? D : null, Q);
              var T = d.getCurrentCellStyle(Q[0]);
              'image' != T[mxConstants.STYLE_SHAPE] && 'label' != T[mxConstants.STYLE_SHAPE] ? d.setCellStyles(mxConstants.STYLE_SHAPE, 'image', Q) : 0 == D.length && d.setCellStyles(mxConstants.STYLE_SHAPE, null, Q);
              null == K && d.setCellStyles(mxConstants.STYLE_CLIP_PATH, null, Q);
              if (null != G && null != F)
                for (D = 0; D < Q.length; D++) {
                  var Z = Q[D];
                  if ('0' != d.getCurrentCellStyle(Z).expand) {
                    var ma = d.getModel().getGeometry(Z);
                    null != ma && (ma = ma.clone(), ma.width = G, ma.height = F, d.getModel().setGeometry(Z, ma));
                  }
                  null != K && f(Z, K, P, R, d);
                }
            } finally {
              d.getModel().endUpdate();
            }
            null != ba && (d.setSelectionCells(ba), d.scrollCellToVisible(ba[0]));
          }
        }
      }, d.cellEditor.isContentEditing(), !d.cellEditor.isContentEditing(), !0, A);
    }
  }).isEnabled = h;
  this.addAction('crop...', function() {
    var m = d.getSelectionCell();
    if (d.isEnabled() && !d.isCellLocked(d.getDefaultParent()) && null != m) {
      var p = d.getCurrentCellStyle(m),
        x = p[mxConstants.STYLE_IMAGE],
        A = p[mxConstants.STYLE_SHAPE];
      x && 'image' == A && (p = new CropImageDialog(e, x, p[mxConstants.STYLE_CLIP_PATH], function(C, D, G) {
        f(m, C, D, G, d);
      }), e.showDialog(p.container, 300, 390, !0, !0));
    }
  }).isEnabled = h;
  n = this.addAction('layers', mxUtils.bind(this, function() {
    null == this.layersWindow ? (this.layersWindow = new LayersWindow(e, document.body.offsetWidth - 280, 120, 212, 200), this.layersWindow.window.addListener('show', mxUtils.bind(this, function() {
      e.fireEvent(new mxEventObject('layers'));
    })), this.layersWindow.window.addListener('hide', function() {
      e.fireEvent(new mxEventObject('layers'));
    }), this.layersWindow.window.setVisible(!0), e.fireEvent(new mxEventObject('layers')), this.layersWindow.init()) : this.layersWindow.window.setVisible(!this.layersWindow.window.isVisible());
  }), null, null, Editor.ctrlKey + '+Shift+L');
  n.setToggleAction(!0);
  n.setSelectedCallback(mxUtils.bind(this, function() {
    return null != this.layersWindow && this.layersWindow.window.isVisible();
  }));
  n = this.addAction('format', mxUtils.bind(this, function() {
    e.toggleFormatPanel();
  }), null, null, Editor.ctrlKey + '+Shift+P');
  n.setToggleAction(!0);
  n.setSelectedCallback(mxUtils.bind(this, function() {
    return e.isFormatPanelVisible();
  }));
  n = this.addAction('outline', mxUtils.bind(this, function() {
    null == this.outlineWindow ? (this.outlineWindow = new OutlineWindow(e, document.body.offsetWidth - 260, 100, 180, 180), this.outlineWindow.window.addListener('show', mxUtils.bind(this, function() {
      e.fireEvent(new mxEventObject('outline'));
    })), this.outlineWindow.window.addListener('hide', function() {
      e.fireEvent(new mxEventObject('outline'));
    }), this.outlineWindow.window.setVisible(!0), e.fireEvent(new mxEventObject('outline'))) : this.outlineWindow.window.setVisible(!this.outlineWindow.window.isVisible());
  }), null, null, Editor.ctrlKey + '+Shift+O');
  n.setToggleAction(!0);
  n.setSelectedCallback(mxUtils.bind(this, function() {
    return null != this.outlineWindow && this.outlineWindow.window.isVisible();
  }));
  this.addAction('editConnectionPoints...', function() {
    var m = d.getSelectionCell();
    if (d.isEnabled() && !d.isCellLocked(d.getDefaultParent()) && null != m) {
      var p = new ConnectionPointsDialog(e, m);
      e.showDialog(p.container, 350, 450, !0, !1, function() {
        p.destroy();
      });
      p.init();
    }
  }).isEnabled = h;
};
Actions.prototype.addAction = function(a, b, f, e, g) {
  if ('...' == a.substring(a.length - 3)) {
    a = a.substring(0, a.length - 3);
    var d = mxResources.get(a) + '...';
  } else
    d = mxResources.get(a);
  return this.put(a, new Action(d, b, f, e, g));
};
Actions.prototype.put = function(a, b) {
  return this.actions[a] = b;
};
Actions.prototype.get = function(a) {
  return this.actions[a];
};