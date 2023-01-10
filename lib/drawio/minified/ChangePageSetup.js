function ChangePageSetup(a, b, f, e, g) {
  this.ui = a;
  this.previousColor = this.color = b;
  this.previousImage = this.image = f;
  this.previousFormat = this.format = e;
  this.previousPageScale = this.pageScale = g;
  this.ignoreImage = this.ignoreColor = !1;
}
ChangePageSetup.prototype.execute = function() {
  var a = this.ui.editor.graph;
  if (!this.ignoreColor) {
    this.color = this.previousColor;
    var b = a.background;
    this.ui.setBackgroundColor(this.previousColor);
    this.previousColor = b;
  }
  if (!this.ignoreImage) {
    this.image = this.previousImage;
    b = a.backgroundImage;
    var f = this.previousImage;
    null != f && null != f.src && 'data:page/id,' == f.src.substring(0, 13) && (f = this.ui.createImageForPageLink(f.src, this.ui.currentPage));
    this.ui.setBackgroundImage(f);
    this.previousImage = b;
  }
  null != this.previousFormat && (this.format = this.previousFormat, b = a.pageFormat, this.previousFormat.width != b.width || this.previousFormat.height != b.height) && (this.ui.setPageFormat(this.previousFormat), this.previousFormat = b);
  null != this.foldingEnabled && this.foldingEnabled != this.ui.editor.graph.foldingEnabled && (this.ui.setFoldingEnabled(this.foldingEnabled), this.foldingEnabled = !this.foldingEnabled);
  null != this.previousPageScale && (a = this.ui.editor.graph.pageScale, this.previousPageScale != a && (this.ui.setPageScale(this.previousPageScale), this.previousPageScale = a));
};
(function() {
  var a = new mxObjectCodec(new ChangePageSetup(), [
    'ui',
    'previousColor',
    'previousImage',
    'previousFormat',
    'previousPageScale'
  ]);
  a.afterDecode = function(b, f, e) {
    e.previousColor = e.color;
    e.previousImage = e.image;
    e.previousFormat = e.format;
    e.previousPageScale = e.pageScale;
    null != e.foldingEnabled && (e.foldingEnabled = !e.foldingEnabled);
    return e;
  };
  mxCodecRegistry.register(a);
}());
EditorUi.prototype.setBackgroundColor = function(a) {
  this.editor.graph.background = a;
  this.editor.graph.view.validateBackground();
  this.fireEvent(new mxEventObject('backgroundColorChanged'));
};
EditorUi.prototype.setFoldingEnabled = function(a) {
  this.editor.graph.foldingEnabled = a;
  this.editor.graph.view.revalidate();
  this.fireEvent(new mxEventObject('foldingEnabledChanged'));
};
EditorUi.prototype.setPageFormat = function(a, b) {
  b = null != b ? b : '1' == urlParams.sketch;
  this.editor.graph.pageFormat = a;
  b || (this.editor.graph.pageVisible ? (this.editor.graph.view.validateBackground(), this.editor.graph.sizeDidChange()) : this.actions.get('pageView').funct());
  this.fireEvent(new mxEventObject('pageFormatChanged'));
};
EditorUi.prototype.setPageScale = function(a) {
  this.editor.graph.pageScale = a;
  this.editor.graph.pageVisible ? (this.editor.graph.view.validateBackground(), this.editor.graph.sizeDidChange()) : this.actions.get('pageView').funct();
  this.fireEvent(new mxEventObject('pageScaleChanged'));
};
EditorUi.prototype.setGridColor = function(a) {
  this.editor.graph.view.gridColor = a;
  this.editor.graph.view.validateBackground();
  this.fireEvent(new mxEventObject('gridColorChanged'));
};
EditorUi.prototype.addUndoListener = function() {
  var a = this.actions.get('undo'),
    b = this.actions.get('redo'),
    f = this.editor.undoManager,
    e = mxUtils.bind(this, function() {
      a.setEnabled(this.canUndo());
      b.setEnabled(this.canRedo());
    });
  f.addListener(mxEvent.ADD, e);
  f.addListener(mxEvent.UNDO, e);
  f.addListener(mxEvent.REDO, e);
  f.addListener(mxEvent.CLEAR, e);
  var g = this.editor.graph.cellEditor.startEditing;
  this.editor.graph.cellEditor.startEditing = function() {
    g.apply(this, arguments);
    e();
  };
  var d = this.editor.graph.cellEditor.stopEditing;
  this.editor.graph.cellEditor.stopEditing = function(h, n) {
    d.apply(this, arguments);
    e();
  };
  e();
};
EditorUi.prototype.updateActionStates = function() {
  for (var a = this.editor.graph, b = this.getSelectionState(), f = a.isEnabled() && !a.isCellLocked(a.getDefaultParent()), e = 'cut copy bold italic underline delete duplicate editStyle editTooltip editLink backgroundColor borderColor edit toFront toBack solid dashed pasteSize dotted fillColor gradientColor shadow fontColor formattedText rounded toggleRounded strokeColor sharp snapToGrid'.split(' '), g = 0; g < e.length; g++)
    this.actions.get(e[g]).setEnabled(0 < b.cells.length);
  this.actions.get('grid').setEnabled(!this.editor.chromeless || this.editor.editable);
  this.actions.get('pasteSize').setEnabled(null != this.copiedSize && 0 < b.vertices.length);
  this.actions.get('pasteData').setEnabled(null != this.copiedValue && 0 < b.cells.length);
  this.actions.get('setAsDefaultStyle').setEnabled(1 == a.getSelectionCount());
  this.actions.get('lockUnlock').setEnabled(!a.isSelectionEmpty());
  this.actions.get('bringForward').setEnabled(1 == b.cells.length);
  this.actions.get('sendBackward').setEnabled(1 == b.cells.length);
  this.actions.get('rotation').setEnabled(1 == b.vertices.length);
  this.actions.get('wordWrap').setEnabled(1 == b.vertices.length);
  this.actions.get('autosize').setEnabled(0 < b.vertices.length);
  this.actions.get('copySize').setEnabled(1 == b.vertices.length);
  this.actions.get('clearWaypoints').setEnabled(b.connections);
  this.actions.get('curved').setEnabled(0 < b.edges.length);
  this.actions.get('turn').setEnabled(0 < b.cells.length);
  this.actions.get('group').setEnabled(!b.row && !b.cell && (1 < b.cells.length || 1 == b.vertices.length && 0 == a.model.getChildCount(b.cells[0]) && !a.isContainer(b.vertices[0])));
  this.actions.get('ungroup').setEnabled(!b.row && !b.cell && !b.table && 0 < b.vertices.length && (a.isContainer(b.vertices[0]) || 0 < a.getModel().getChildCount(b.vertices[0])));
  this.actions.get('removeFromGroup').setEnabled(1 == b.cells.length && a.getModel().isVertex(a.getModel().getParent(b.cells[0])));
  this.actions.get('collapsible').setEnabled(1 == b.vertices.length && (0 < a.model.getChildCount(b.vertices[0]) || a.isContainer(b.vertices[0])));
  this.actions.get('exitGroup').setEnabled(null != a.view.currentRoot);
  this.actions.get('home').setEnabled(null != a.view.currentRoot);
  this.actions.get('enterGroup').setEnabled(1 == b.cells.length && a.isValidRoot(b.cells[0]));
  this.actions.get('copyData').setEnabled(1 == b.cells.length);
  this.actions.get('editLink').setEnabled(1 == b.cells.length);
  this.actions.get('editStyle').setEnabled(1 == b.cells.length);
  this.actions.get('editTooltip').setEnabled(1 == b.cells.length);
  this.actions.get('openLink').setEnabled(1 == b.cells.length && null != a.getLinkForCell(b.cells[0]));
  this.actions.get('guides').setEnabled(a.isEnabled());
  this.actions.get('selectVertices').setEnabled(f);
  this.actions.get('selectEdges').setEnabled(f);
  this.actions.get('selectAll').setEnabled(f);
  this.actions.get('selectNone').setEnabled(f);
  e = 1 == b.vertices.length && a.isCellFoldable(b.vertices[0]);
  this.actions.get('expand').setEnabled(e);
  this.actions.get('collapse').setEnabled(e);
  this.menus.get('navigation').setEnabled(0 < b.cells.length || null != a.view.currentRoot);
  this.menus.get('layout').setEnabled(f);
  this.menus.get('insert').setEnabled(f);
  this.menus.get('direction').setEnabled(b.unlocked && 1 == b.vertices.length);
  this.menus.get('distribute').setEnabled(b.unlocked && 1 < b.vertices.length);
  this.menus.get('align').setEnabled(b.unlocked && 0 < b.cells.length);
  this.updatePasteActionStates();
};
EditorUi.prototype.zeroOffset = new mxPoint(0, 0);
EditorUi.prototype.getDiagramContainerOffset = function() {
  return this.zeroOffset;
};
EditorUi.prototype.refresh = function(a) {
  a = null != a ? a : !0;
  var b = this.container.clientWidth;
  this.container == document.body && (b = document.body.clientWidth || document.documentElement.clientWidth);
  var f = 0;
  mxClient.IS_IOS && !window.navigator.standalone && 'undefined' !== typeof Menus && window.innerHeight != document.documentElement.clientHeight && (f = document.documentElement.clientHeight - window.innerHeight, window.scrollTo(0, 0));
  var e = Math.max(0, Math.min(this.hsplitPosition, b - this.splitSize - 40));
  b = 0;
  null != this.menubar && (this.menubarContainer.style.height = this.menubarHeight + 'px', b += this.menubarHeight);
  null != this.toolbar && (this.toolbarContainer.style.top = this.menubarHeight + 'px', this.toolbarContainer.style.height = this.toolbarHeight + 'px', b += this.toolbarHeight);
  0 < b && (b += 1);
  var g = null != this.format ? this.formatWidth : 0;
  this.sidebarContainer.style.top = b + 'px';
  this.sidebarContainer.style.width = e + 'px';
  this.formatContainer.style.top = b + 'px';
  this.formatContainer.style.width = g + 'px';
  this.formatContainer.style.display = null != this.format ? '' : 'none';
  var d = this.getDiagramContainerOffset(),
    h = null != this.hsplit.parentNode ? e : 0;
  this.footerContainer.style.height = this.footerHeight + 'px';
  this.hsplit.style.top = this.sidebarContainer.style.top;
  this.hsplit.style.left = e + 'px';
  this.footerContainer.style.display = 0 == this.footerHeight ? 'none' : '';
  null != this.tabContainer ? (this.tabContainer.style.left = h + 'px', this.hsplit.style.bottom = this.tabContainer.offsetHeight + 'px') : this.hsplit.style.bottom = this.footerHeight + f + 'px';
  0 < this.footerHeight && (this.footerContainer.style.bottom = f + 'px');
  e = 0;
  null != this.tabContainer && (this.tabContainer.style.bottom = this.footerHeight + f + 'px', this.tabContainer.style.right = g + 'px', e = this.tabContainer.clientHeight, this.checkTabScrollerOverflow());
  this.sidebarContainer.style.bottom = this.footerHeight + f + 'px';
  this.formatContainer.style.bottom = this.footerHeight + f + 'px';
  this.diagramContainer.style.left = h + d.x + 'px';
  this.diagramContainer.style.top = b + d.y + 'px';
  this.diagramContainer.style.right = g + 'px';
  this.diagramContainer.style.bottom = this.footerHeight + f + e + 'px';
  a && this.editor.graph.sizeDidChange();
};
EditorUi.prototype.createTabContainer = function() {
  return null;
};
EditorUi.prototype.createDivs = function() {
  this.menubarContainer = this.createDiv('geMenubarContainer');
  this.toolbarContainer = this.createDiv('geToolbarContainer');
  this.sidebarContainer = this.createDiv('geSidebarContainer');
  this.formatContainer = this.createDiv('geSidebarContainer geFormatContainer');
  this.diagramContainer = this.createDiv('geDiagramContainer');
  this.footerContainer = this.createDiv('geFooterContainer');
  this.hsplit = this.createDiv('geHsplit');
  this.menubarContainer.style.top = '0px';
  this.menubarContainer.style.left = '0px';
  this.menubarContainer.style.right = '0px';
  this.toolbarContainer.style.left = '0px';
  this.toolbarContainer.style.right = '0px';
  this.sidebarContainer.style.left = '0px';
  this.sidebarContainer.style.zIndex = '1';
  this.formatContainer.style.right = '0px';
  this.formatContainer.style.zIndex = '1';
  this.diagramContainer.style.right = (null != this.format ? this.formatWidth : 0) + 'px';
  this.footerContainer.style.left = '0px';
  this.footerContainer.style.right = '0px';
  this.footerContainer.style.bottom = '0px';
  this.footerContainer.style.zIndex = mxPopupMenu.prototype.zIndex - 3;
  this.hsplit.style.width = this.splitSize + 'px';
  this.hsplit.style.zIndex = '1';
  this.editor.chromeless ? this.diagramContainer.style.border = 'none' : this.tabContainer = this.createTabContainer();
};
EditorUi.prototype.createSidebarContainer = function() {
  var a = document.createElement('div');
  a.className = 'geSidebarContainer';
  return a;
};
EditorUi.prototype.createUi = function() {
  this.menubar = this.editor.chromeless ? null : this.menus.createMenubar(this.createDiv('geMenubar'));
  null != this.menubar && this.menubarContainer.appendChild(this.menubar.container);
  null != this.menubar && (this.statusContainer = this.createStatusContainer(), this.editor.addListener('statusChanged', mxUtils.bind(this, function() {
    this.setStatusText(this.editor.getStatus());
  })), this.setStatusText(this.editor.getStatus()), this.menubar.container.appendChild(this.statusContainer), this.container.appendChild(this.menubarContainer));
  this.sidebar = this.editor.chromeless ? null : this.createSidebar(this.sidebarContainer);
  null != this.sidebar && this.container.appendChild(this.sidebarContainer);
  this.format = this.editor.chromeless || !this.formatEnabled ? null : this.createFormat(this.formatContainer);
  null != this.format && this.container.appendChild(this.formatContainer);
  var a = this.editor.chromeless ? null : this.createFooter();
  null != a && (this.footerContainer.appendChild(a), this.container.appendChild(this.footerContainer));
  this.container.appendChild(this.diagramContainer);
  null != this.container && null != this.tabContainer && this.container.appendChild(this.tabContainer);
  this.toolbar = this.editor.chromeless ? null : this.createToolbar(this.createDiv('geToolbar'));
  null != this.toolbar && (this.toolbarContainer.appendChild(this.toolbar.container), this.container.appendChild(this.toolbarContainer));
  null != this.sidebar && (this.container.appendChild(this.hsplit), this.addSplitHandler(this.hsplit, !0, 0, mxUtils.bind(this, function(b) {
    this.hsplitPosition = b;
    this.refresh();
  })));
};
EditorUi.prototype.createStatusContainer = function() {
  var a = document.createElement('a');
  a.className = 'geItem geStatus';
  mxEvent.addListener(a, 'click', mxUtils.bind(this, function(b) {
    var f = mxEvent.getSource(b);
    if ('A' != f.nodeName) {
      var e = f.getAttribute('data-action');
      if ('statusFunction' == e && null != this.editor.statusFunction)
        this.editor.statusFunction();
      else if (null != e)
        f = this.actions.get(e), null != f && f.funct();
      else {
        e = f.getAttribute('data-title');
        var g = f.getAttribute('data-message');
        null != e && null != g ? this.showError(e, g) : (f = f.getAttribute('data-link'), null != f && this.editor.graph.openLink(f));
      }
      mxEvent.consume(b);
    }
  }));
  return a;
};
EditorUi.prototype.setStatusText = function(a) {
  this.statusContainer.innerHTML = Graph.sanitizeHtml(a);
  0 == this.statusContainer.getElementsByTagName('div').length && null != a && 0 < a.length && (this.statusContainer.innerText = '', a = this.createStatusDiv(a), this.statusContainer.appendChild(a));
  a = this.statusContainer.querySelectorAll('[data-effect="fade"]');
  if (null != a)
    for (var b = 0; b < a.length; b++)
      (function(f) {
        mxUtils.setOpacity(f, 0);
        mxUtils.setPrefixedStyle(f.style, 'transform', 'scaleX(0)');
        mxUtils.setPrefixedStyle(f.style, 'transition', 'all 0.2s ease');
        window.setTimeout(mxUtils.bind(this, function() {
          mxUtils.setOpacity(f, 100);
          mxUtils.setPrefixedStyle(f.style, 'transform', 'scaleX(1)');
          mxUtils.setPrefixedStyle(f.style, 'transition', 'all 1s ease');
          window.setTimeout(mxUtils.bind(this, function() {
            mxUtils.setPrefixedStyle(f.style, 'transform', 'scaleX(0)');
            mxUtils.setOpacity(f, 0);
            window.setTimeout(mxUtils.bind(this, function() {
              null != f.parentNode && f.parentNode.removeChild(f);
            }), 1000);
          }), Editor.updateStatusInterval / 2);
        }), 0);
      }(a[b]));
};
EditorUi.prototype.createStatusDiv = function(a) {
  var b = document.createElement('div');
  b.style.textOverflow = 'ellipsis';
  b.style.display = 'inline-block';
  b.style.whiteSpace = 'nowrap';
  b.style.overflow = 'hidden';
  b.style.minWidth = '0';
  b.setAttribute('title', a);
  b.innerHTML = Graph.sanitizeHtml(a);
  return b;
};
EditorUi.prototype.createToolbar = function(a) {
  return new Toolbar(this, a);
};
EditorUi.prototype.createSidebar = function(a) {
  return new Sidebar(this, a);
};
EditorUi.prototype.createFormat = function(a) {
  return new Format(this, a);
};
EditorUi.prototype.createFooter = function() {
  return this.createDiv('geFooter');
};
EditorUi.prototype.createDiv = function(a) {
  var b = document.createElement('div');
  b.className = a;
  return b;
};
EditorUi.prototype.addSplitHandler = function(a, b, f, e) {
  function g(x) {
    if (null != h) {
      var A = new mxPoint(mxEvent.getClientX(x), mxEvent.getClientY(x));
      e(Math.max(0, n + (b ? A.x - h.x : h.y - A.y) - f));
      mxEvent.consume(x);
      n != p() && (u = !0, m = null);
    }
  }

  function d(x) {
    g(x);
    h = n = null;
  }
  var h = null,
    n = null,
    u = !0,
    m = null;
  mxClient.IS_POINTER && (a.style.touchAction = 'none');
  var p = mxUtils.bind(this, function() {
    var x = parseInt(b ? a.style.left : a.style.bottom);
    b || (x = x + f - this.footerHeight);
    return x;
  });
  mxEvent.addGestureListeners(a, function(x) {
    h = new mxPoint(mxEvent.getClientX(x), mxEvent.getClientY(x));
    n = p();
    u = !1;
    mxEvent.consume(x);
  });
  mxEvent.addListener(a, 'click', mxUtils.bind(this, function(x) {
    if (!u && this.hsplitClickEnabled) {
      var A = null != m ? m - f : 0;
      m = p();
      e(A);
      mxEvent.consume(x);
    }
  }));
  mxEvent.addGestureListeners(document, null, g, d);
  this.destroyFunctions.push(function() {
    mxEvent.removeGestureListeners(document, null, g, d);
  });
};
EditorUi.prototype.prompt = function(a, b, f) {
  a = new FilenameDialog(this, b, mxResources.get('apply'), function(e) {
    f(parseFloat(e));
  }, a);
  this.showDialog(a.container, 300, 80, !0, !0);
  a.init();
};
EditorUi.prototype.handleError = function(a, b, f, e, g) {
  a = null != a && null != a.error ? a.error : a;
  if (null != a || null != b) {
    g = mxUtils.htmlEntities(mxResources.get('unknownError'));
    var d = mxResources.get('ok');
    b = null != b ? b : mxResources.get('error');
    null != a && null != a.message && (g = mxUtils.htmlEntities(a.message));
    this.showError(b, g, d, f, null, null, null, null, null, null, null, null, e ? f : null);
  } else
    null != f && f();
};
EditorUi.prototype.showError = function(a, b, f, e, g, d, h, n, u, m, p, x, A) {
  a = new ErrorDialog(this, a, b, f || mxResources.get('ok'), e, g, d, h, x, n, u);
  b = Math.ceil(null != b ? b.length / 50 : 1);
  this.showDialog(a.container, m || 340, p || 100 + 20 * b, !0, !1, A);
  a.init();
};
EditorUi.prototype.showDialog = function(a, b, f, e, g, d, h, n, u, m) {
  this.editor.graph.tooltipHandler.resetTimer();
  this.editor.graph.tooltipHandler.hideTooltip();
  null == this.dialogs && (this.dialogs = []);
  this.dialog = new Dialog(this, a, b, f, e, g, d, h, n, u, m);
  this.dialogs.push(this.dialog);
};
EditorUi.prototype.hideDialog = function(a, b, f) {
  null != this.dialogs && 0 < this.dialogs.length && (null == f || f == this.dialog.container.firstChild) && (f = this.dialogs.pop(), 0 == f.close(a, b) ? this.dialogs.push(f) : (this.dialog = 0 < this.dialogs.length ? this.dialogs[this.dialogs.length - 1] : null, this.editor.fireEvent(new mxEventObject('hideDialog')), null == this.dialog && 'hidden' != this.editor.graph.container.style.visibility && window.setTimeout(mxUtils.bind(this, function() {
    this.editor.graph.isEditing() && null != this.editor.graph.cellEditor.textarea ? this.editor.graph.cellEditor.textarea.focus() : (mxUtils.clearSelection(), this.editor.graph.container.focus());
  }), 0)));
};
EditorUi.prototype.ctrlEnter = function() {
  var a = this.editor.graph;
  if (a.isEnabled())
    try {
      for (var b = a.getSelectionCells(), f = new mxDictionary(), e = [], g = 0; g < b.length; g++) {
        var d = a.isTableCell(b[g]) ? a.model.getParent(b[g]) : b[g];
        null == d || f.get(d) || (f.put(d, !0), e.push(d));
      }
      a.setSelectionCells(a.duplicateCells(e, !1));
    } catch (h) {
      this.handleError(h);
    }
};
EditorUi.prototype.pickColor = function(a, b) {
  var f = this.editor.graph,
    e = f.cellEditor.saveSelection(),
    g = 230 + 17 * (Math.ceil(ColorDialog.prototype.presetColors.length / 12) + Math.ceil(ColorDialog.prototype.defaultColors.length / 12));
  a = new ColorDialog(this, mxUtils.rgba2hex(a) || 'none', function(d) {
    f.cellEditor.restoreSelection(e);
    b(d);
  }, function() {
    f.cellEditor.restoreSelection(e);
  });
  this.showDialog(a.container, 230, g, !0, !1);
  a.init();
};
EditorUi.prototype.openFile = function() {
  window.openFile = new OpenFile(mxUtils.bind(this, function(a) {
    this.hideDialog(a);
  }));
  this.showDialog(new OpenDialog(this).container, Editor.useLocalStorage ? 640 : 320, Editor.useLocalStorage ? 480 : 220, !0, !0, function() {
    window.openFile = null;
  });
};
EditorUi.prototype.extractGraphModelFromHtml = function(a) {
  var b = null;
  try {
    var f = a.indexOf('&lt;mxGraphModel ');
    if (0 <= f) {
      var e = a.lastIndexOf('&lt;/mxGraphModel&gt;');
      e > f && (b = a.substring(f, e + 21).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\\&quot;/g, '"').replace(/\n/g, ''));
    }
  } catch (g) {}
  return b;
};
EditorUi.prototype.readGraphModelFromClipboard = function(a) {
  this.readGraphModelFromClipboardWithType(mxUtils.bind(this, function(b) {
    null != b ? a(b) : this.readGraphModelFromClipboardWithType(mxUtils.bind(this, function(f) {
      if (null != f) {
        var e = decodeURIComponent(f);
        this.isCompatibleString(e) && (f = e);
      }
      a(f);
    }), 'text');
  }), 'html');
};
EditorUi.prototype.readGraphModelFromClipboardWithType = function(a, b) {
  navigator.clipboard.read().then(mxUtils.bind(this, function(f) {
    if (null != f && 0 < f.length && 'html' == b && 0 <= mxUtils.indexOf(f[0].types, 'text/html'))
      f[0].getType('text/html').then(mxUtils.bind(this, function(e) {
        e.text().then(mxUtils.bind(this, function(g) {
          try {
            var d = this.parseHtmlData(g),
              h = 'text/plain' != d.getAttribute('data-type') ? d.innerHTML : mxUtils.trim(null == d.innerText ? mxUtils.getTextContent(d) : d.innerText);
            try {
              var n = h.lastIndexOf('%3E');
              0 <= n && n < h.length - 3 && (h = h.substring(0, n + 3));
            } catch (p) {}
            try {
              var u = d.getElementsByTagName('span'),
                m = null != u && 0 < u.length ? mxUtils.trim(decodeURIComponent(u[0].textContent)) : decodeURIComponent(h);
              this.isCompatibleString(m) && (h = m);
            } catch (p) {}
          } catch (p) {}
          a(this.isCompatibleString(h) ? h : null);
        }))['catch'](function(g) {
          a(null);
        });
      }))['catch'](function(e) {
        a(null);
      });
    else if (null != f && 0 < f.length && 'text' == b && 0 <= mxUtils.indexOf(f[0].types, 'text/plain'))
      f[0].getType('text/plain').then(function(e) {
        e.text().then(function(g) {
          a(g);
        })['catch'](function() {
          a(null);
        });
      })['catch'](function() {
        a(null);
      });
    else
      a(null);
  }))['catch'](function(f) {
    a(null);
  });
};
EditorUi.prototype.parseHtmlData = function(a) {
  var b = null;
  if (null != a && 0 < a.length) {
    var f = '<meta ' == a.substring(0, 6);
    b = document.createElement('div');
    b.innerHTML = (f ? '<meta charset="utf-8">' : '') + Graph.sanitizeHtml(a);
    asHtml = !0;
    a = b.getElementsByTagName('style');
    if (null != a)
      for (; 0 < a.length;)
        a[0].parentNode.removeChild(a[0]);
    null != b.firstChild && b.firstChild.nodeType == mxConstants.NODETYPE_ELEMENT && null != b.firstChild.nextSibling && b.firstChild.nextSibling.nodeType == mxConstants.NODETYPE_ELEMENT && 'META' == b.firstChild.nodeName && 'A' == b.firstChild.nextSibling.nodeName && null == b.firstChild.nextSibling.nextSibling && (a = null == b.firstChild.nextSibling.innerText ? mxUtils.getTextContent(b.firstChild.nextSibling) : b.firstChild.nextSibling.innerText, a == b.firstChild.nextSibling.getAttribute('href') && (mxUtils.setTextContent(b, a), asHtml = !1));
    f = f && null != b.firstChild ? b.firstChild.nextSibling : b.firstChild;
    null != f && null == f.nextSibling && f.nodeType == mxConstants.NODETYPE_ELEMENT && 'IMG' == f.nodeName ? (a = f.getAttribute('src'), null != a && (Editor.isPngDataUrl(a) && (f = Editor.extractGraphModelFromPng(a), null != f && 0 < f.length && (a = f)), mxUtils.setTextContent(b, a), asHtml = !1)) : (f = b.getElementsByTagName('img'), 1 == f.length && (f = f[0], a = f.getAttribute('src'), null != a && f.parentNode == b && 1 == b.children.length && (Editor.isPngDataUrl(a) && (f = Editor.extractGraphModelFromPng(a), null != f && 0 < f.length && (a = f)), mxUtils.setTextContent(b, a), asHtml = !1)));
    asHtml && Graph.removePasteFormatting(b);
  }
  asHtml || b.setAttribute('data-type', 'text/plain');
  return b;
};
EditorUi.prototype.extractGraphModelFromEvent = function(a) {
  var b = null,
    f = null;
  null != a && (a = null != a.dataTransfer ? a.dataTransfer : a.clipboardData, null != a && (10 == document.documentMode || 11 == document.documentMode ? f = a.getData('Text') : (f = 0 <= mxUtils.indexOf(a.types, 'text/html') ? a.getData('text/html') : null, 0 <= mxUtils.indexOf(a.types, 'text/plain') && (null == f || 0 == f.length) && (f = a.getData('text/plain'))), null != f && (f = Graph.zapGremlins(mxUtils.trim(f)), a = this.extractGraphModelFromHtml(f), null != a && (f = a))));
  null != f && this.isCompatibleString(f) && (b = f);
  return b;
};
EditorUi.prototype.isCompatibleString = function(a) {
  return !1;
};
EditorUi.prototype.saveFile = function(a) {
  a || null == this.editor.filename ? (a = new FilenameDialog(this, this.editor.getOrCreateFilename(), mxResources.get('save'), mxUtils.bind(this, function(b) {
    this.save(b);
  }), null, mxUtils.bind(this, function(b) {
    if (null != b && 0 < b.length)
      return !0;
    mxUtils.confirm(mxResources.get('invalidName'));
    return !1;
  })), this.showDialog(a.container, 300, 100, !0, !0), a.init()) : this.save(this.editor.getOrCreateFilename());
};
EditorUi.prototype.save = function(a) {
  if (null != a) {
    this.editor.graph.isEditing() && this.editor.graph.stopEditing();
    var b = mxUtils.getXml(this.editor.getGraphXml());
    try {
      if (Editor.useLocalStorage) {
        if (null != localStorage.getItem(a) && !mxUtils.confirm(mxResources.get('replaceIt', [a])))
          return;
        localStorage.setItem(a, b);
        this.editor.setStatus(mxUtils.htmlEntities(mxResources.get('saved')) + ' ' + new Date());
      } else if (b.length < MAX_REQUEST_SIZE)
        new mxXmlRequest(SAVE_URL, 'filename=' + encodeURIComponent(a) + '&xml=' + encodeURIComponent(b)).simulate(document, '_blank');
      else {
        mxUtils.alert(mxResources.get('drawingTooLarge'));
        mxUtils.popup(b);
        return;
      }
      this.editor.setModified(!1);
      this.editor.setFilename(a);
      this.updateDocumentTitle();
    } catch (f) {
      this.editor.setStatus(mxUtils.htmlEntities(mxResources.get('errorSavingFile')));
    }
  }
};
EditorUi.prototype.executeLayouts = function(a, b) {
  this.executeLayout(mxUtils.bind(this, function() {
    var f = new mxCompositeLayout(this.editor.graph, a),
      e = this.editor.graph.getSelectionCells();
    f.execute(this.editor.graph.getDefaultParent(), 0 == e.length ? null : e);
  }), !0, b);
};
EditorUi.prototype.executeLayout = function(a, b, f) {
  var e = this.editor.graph;
  e.getModel().beginUpdate();
  try {
    a();
  } catch (g) {
    throw g;
  } finally {
    this.allowAnimation && b && e.isEnabled() ? (a = new mxMorphing(e), a.addListener(mxEvent.DONE, mxUtils.bind(this, function() {
      e.getModel().endUpdate();
      null != f && f();
    })), a.startAnimation()) : (e.getModel().endUpdate(), null != f && f());
  }
};
EditorUi.prototype.showImageDialog = function(a, b, f, e) {
  e = this.editor.graph.cellEditor;
  var g = e.saveSelection(),
    d = mxUtils.prompt(a, b);
  e.restoreSelection(g);
  if (null != d && 0 < d.length) {
    var h = new Image();
    h.onload = function() {
      f(d, h.width, h.height);
    };
    h.onerror = function() {
      f(null);
      mxUtils.alert(mxResources.get('fileNotFound'));
    };
    h.src = d;
  } else
    f(null);
};
EditorUi.prototype.showLinkDialog = function(a, b, f) {
  a = new LinkDialog(this, a, b, f);
  this.showDialog(a.container, 420, 90, !0, !0);
  a.init();
};
EditorUi.prototype.showDataDialog = function(a) {
  null != a && 'undefined' !== typeof window.EditDataDialog && (a = new EditDataDialog(this, a), this.showDialog(a.container, 480, 420, !0, !1, null, !1), a.init());
};
EditorUi.prototype.showBackgroundImageDialog = function(a, b) {
  a = null != a ? a : mxUtils.bind(this, function(e) {
    e = new ChangePageSetup(this, null, e);
    e.ignoreColor = !0;
    this.editor.graph.model.execute(e);
  });
  var f = mxUtils.prompt(mxResources.get('backgroundImage'), null != b ? b.src : '');
  null != f && 0 < f.length ? (b = new Image(), b.onload = function() {
    a(new mxImage(f, b.width, b.height), !1);
  }, b.onerror = function() {
    a(null, !0);
    mxUtils.alert(mxResources.get('fileNotFound'));
  }, b.src = f) : a(null);
};
EditorUi.prototype.setBackgroundImage = function(a) {
  this.editor.graph.setBackgroundImage(a);
  this.editor.graph.view.validateBackgroundImage();
  this.fireEvent(new mxEventObject('backgroundImageChanged'));
};
EditorUi.prototype.confirm = function(a, b, f) {
  mxUtils.confirm(a) ? null != b && b() : null != f && f();
};
EditorUi.prototype.createOutline = function(a) {
  var b = new mxOutline(this.editor.graph);
  mxEvent.addListener(window, 'resize', function() {
    b.update(!1);
  });
  return b;
};
EditorUi.prototype.altShiftActions = {
  67: 'clearWaypoints',
  65: 'connectionArrows',
  76: 'editLink',
  80: 'connectionPoints',
  84: 'editTooltip',
  86: 'pasteSize',
  88: 'copySize',
  66: 'copyData',
  69: 'pasteData'
};
EditorUi.prototype.createKeyHandler = function(a) {
  function b(x, A, C) {
    if (!e.isSelectionEmpty() && e.isEnabled()) {
      A = null != A ? A : 1;
      var D = e.getCompositeParents(e.getSelectionCells()),
        G = 0 < D.length ? D[0] : null;
      if (null != G)
        if (C) {
          e.getModel().beginUpdate();
          try {
            for (G = 0; G < D.length; G++)
              if (e.getModel().isVertex(D[G]) && e.isCellResizable(D[G])) {
                var F = e.getCellGeometry(D[G]);
                null != F && (F = F.clone(), 37 == x ? F.width = Math.max(0, F.width - A) : 38 == x ? F.height = Math.max(0, F.height - A) : 39 == x ? F.width += A : 40 == x && (F.height += A), e.getModel().setGeometry(D[G], F));
              }
          } finally {
            e.getModel().endUpdate();
          }
        } else {
          F = e.model.getParent(G);
          var K = e.getView().scale;
          C = null;
          1 == e.getSelectionCount() && e.model.isVertex(G) && null != e.layoutManager && !e.isCellLocked(G) && (C = e.layoutManager.getLayout(F));
          if (null != C && C.constructor == mxStackLayout)
            A = F.getIndex(G), 37 == x || 38 == x ? e.model.add(F, G, Math.max(0, A - 1)) : (39 == x || 40 == x) && e.model.add(F, G, Math.min(e.model.getChildCount(F), A + 1));
          else {
            var P = e.graphHandler;
            null != P && (null == P.first && P.start(G, 0, 0, e.getMovableCells(D)), null != P.first && (G = D = 0, 37 == x ? D = -A : 38 == x ? G = -A : 39 == x ? D = A : 40 == x && (G = A), P.currentDx += D * K, P.currentDy += G * K, P.checkPreview(), P.updatePreview()), null != h && window.clearTimeout(h), h = window.setTimeout(function() {
              if (null != P.first) {
                var R = P.roundLength(P.currentDx / K),
                  Q = P.roundLength(P.currentDy / K);
                P.moveCells(P.cells, R, Q);
                P.reset();
              }
            }, 400));
          }
        }
    }
  }
  var f = this,
    e = this.editor.graph,
    g = new mxKeyHandler(e),
    d = g.isEventIgnored;
  g.isEventIgnored = function(x) {
    return !(mxEvent.isShiftDown(x) && 9 == x.keyCode) && (!this.isControlDown(x) || mxEvent.isShiftDown(x) || 90 != x.keyCode && 89 != x.keyCode && 188 != x.keyCode && 190 != x.keyCode && 85 != x.keyCode) && (66 != x.keyCode && 73 != x.keyCode || !this.isControlDown(x) || this.graph.cellEditor.isContentEditing() && !mxClient.IS_FF && !mxClient.IS_SF) && d.apply(this, arguments);
  };
  g.isEnabledForEvent = function(x) {
    return !mxEvent.isConsumed(x) && this.isGraphEvent(x) && this.isEnabled() && (null == f.dialogs || 0 == f.dialogs.length);
  };
  g.isControlDown = function(x) {
    return mxEvent.isControlDown(x) || mxClient.IS_MAC && x.metaKey;
  };
  var h = null,
    n = {
      37: mxConstants.DIRECTION_WEST,
      38: mxConstants.DIRECTION_NORTH,
      39: mxConstants.DIRECTION_EAST,
      40: mxConstants.DIRECTION_SOUTH
    },
    u = g.getFunction;
  mxKeyHandler.prototype.getFunction = function(x) {
    if (e.isEnabled()) {
      if (mxEvent.isShiftDown(x) && mxEvent.isAltDown(x)) {
        var A = f.actions.get(f.altShiftActions[x.keyCode]);
        if (null != A)
          return A.funct;
      }
      if (null != n[x.keyCode] && !e.isSelectionEmpty())
        if (!this.isControlDown(x) && mxEvent.isShiftDown(x) && mxEvent.isAltDown(x)) {
          if (e.model.isVertex(e.getSelectionCell()))
            return function() {
              var C = e.connectVertex(e.getSelectionCell(), n[x.keyCode], e.defaultEdgeLength, x, !0);
              null != C && 0 < C.length && (1 == C.length && e.model.isEdge(C[0]) ? e.setSelectionCell(e.model.getTerminal(C[0], !1)) : e.setSelectionCell(C[C.length - 1]), e.scrollCellToVisible(e.getSelectionCell()), null != f.hoverIcons && f.hoverIcons.update(e.view.getState(e.getSelectionCell())));
            };
        } else
          return this.isControlDown(x) ? function() {
            b(x.keyCode, mxEvent.isShiftDown(x) ? e.gridSize : null, !0);
          } : function() {
            b(x.keyCode, mxEvent.isShiftDown(x) ? e.gridSize : null);
          };
    }
    return u.apply(this, arguments);
  };
  g.bindAction = mxUtils.bind(this, function(x, A, C, D) {
    var G = this.actions.get(C);
    null != G && (C = function() {
      G.isEnabled() && G.funct.apply(this, arguments);
    }, A ? D ? g.bindControlShiftKey(x, C) : g.bindControlKey(x, C) : D ? g.bindShiftKey(x, C) : g.bindKey(x, C));
  });
  var m = this,
    p = g.escape;
  g.escape = function(x) {
    p.apply(this, arguments);
  };
  g.enter = function() {};
  g.bindControlShiftKey(36, function() {
    e.exitGroup();
  });
  g.bindControlShiftKey(35, function() {
    e.enterGroup();
  });
  g.bindShiftKey(36, function() {
    e.home();
  });
  g.bindKey(35, function() {
    e.refresh();
  });
  g.bindAction(107, !0, 'zoomIn');
  g.bindAction(109, !0, 'zoomOut');
  g.bindAction(80, !0, 'print');
  g.bindAction(79, !0, 'outline', !0);
  if (!this.editor.chromeless || this.editor.editable)
    g.bindControlKey(36, function() {
      e.isEnabled() && e.foldCells(!0);
    }), g.bindControlKey(35, function() {
      e.isEnabled() && e.foldCells(!1);
    }), g.bindControlKey(13, function() {
      m.ctrlEnter();
    }), g.bindAction(8, !1, 'delete'), g.bindAction(8, !0, 'deleteAll'), g.bindAction(8, !1, 'deleteLabels', !0), g.bindAction(46, !1, 'delete'), g.bindAction(46, !0, 'deleteAll'), g.bindAction(46, !1, 'deleteLabels', !0), g.bindAction(36, !1, 'resetView'), g.bindAction(72, !0, 'fitWindow', !0), g.bindAction(74, !0, 'fitPage'), g.bindAction(74, !0, 'fitTwoPages', !0), g.bindAction(48, !0, 'customZoom'), g.bindAction(82, !0, 'turn'), g.bindAction(82, !0, 'clearDefaultStyle', !0), g.bindAction(83, !0, 'save'), g.bindAction(83, !0, 'saveAs', !0), g.bindAction(65, !0, 'selectAll'), g.bindAction(65, !0, 'selectNone', !0), g.bindAction(73, !0, 'selectVertices', !0), g.bindAction(69, !0, 'selectEdges', !0), g.bindAction(69, !0, 'editStyle'), g.bindAction(66, !0, 'bold'), g.bindAction(66, !0, 'toBack', !0), g.bindAction(70, !0, 'toFront', !0), g.bindAction(68, !0, 'duplicate'), g.bindAction(68, !0, 'setAsDefaultStyle', !0), g.bindAction(90, !0, 'undo'), g.bindAction(89, !0, 'autosize', !0), g.bindAction(88, !0, 'cut'), g.bindAction(67, !0, 'copy'), g.bindAction(86, !0, 'paste'), g.bindAction(71, !0, 'group'), g.bindAction(77, !0, 'editData'), g.bindAction(71, !0, 'grid', !0), g.bindAction(73, !0, 'italic'), g.bindAction(76, !0, 'lockUnlock'), g.bindAction(76, !0, 'layers', !0), g.bindAction(80, !0, 'format', !0), g.bindAction(85, !0, 'underline'), g.bindAction(85, !0, 'ungroup', !0), g.bindAction(190, !0, 'superscript'), g.bindAction(188, !0, 'subscript'), g.bindAction(13, !1, 'keyPressEnter'), g.bindKey(113, function() {
      e.isEnabled() && e.startEditingAtCell();
    });
  mxClient.IS_WIN ? g.bindAction(89, !0, 'redo') : g.bindAction(90, !0, 'redo', !0);
  return g;
};
EditorUi.prototype.destroy = function() {
  var a = this.editor.graph;
  null != a && null != this.selectionStateListener && (a.getSelectionModel().removeListener(mxEvent.CHANGE, this.selectionStateListener), a.getModel().removeListener(mxEvent.CHANGE, this.selectionStateListener), a.removeListener(mxEvent.EDITING_STARTED, this.selectionStateListener), a.removeListener(mxEvent.EDITING_STOPPED, this.selectionStateListener), a.getView().removeListener('unitChanged', this.selectionStateListener), this.selectionStateListener = null);
  null != this.editor && (this.editor.destroy(), this.editor = null);
  null != this.menubar && (this.menubar.destroy(), this.menubar = null);
  null != this.toolbar && (this.toolbar.destroy(), this.toolbar = null);
  null != this.sidebar && (this.sidebar.destroy(), this.sidebar = null);
  null != this.keyHandler && (this.keyHandler.destroy(), this.keyHandler = null);
  null != this.keydownHandler && (mxEvent.removeListener(document, 'keydown', this.keydownHandler), this.keydownHandler = null);
  null != this.keyupHandler && (mxEvent.removeListener(document, 'keyup', this.keyupHandler), this.keyupHandler = null);
  null != this.resizeHandler && (mxEvent.removeListener(window, 'resize', this.resizeHandler), this.resizeHandler = null);
  null != this.gestureHandler && (mxEvent.removeGestureListeners(document, this.gestureHandler), this.gestureHandler = null);
  null != this.orientationChangeHandler && (mxEvent.removeListener(window, 'orientationchange', this.orientationChangeHandler), this.orientationChangeHandler = null);
  null != this.scrollHandler && (mxEvent.removeListener(window, 'scroll', this.scrollHandler), this.scrollHandler = null);
  if (null != this.destroyFunctions) {
    for (a = 0; a < this.destroyFunctions.length; a++)
      this.destroyFunctions[a]();
    this.destroyFunctions = null;
  }
  var b = [
    this.menubarContainer,
    this.toolbarContainer,
    this.sidebarContainer,
    this.formatContainer,
    this.diagramContainer,
    this.footerContainer,
    this.chromelessToolbar,
    this.hsplit,
    this.layersDialog
  ];
  for (a = 0; a < b.length; a++)
    null != b[a] && null != b[a].parentNode && b[a].parentNode.removeChild(b[a]);
};