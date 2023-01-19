function ChangePage(b, e, f, c, k) {
  SelectPage.call(this, b, f);
  this.relatedPage = e;
  this.index = c;
  this.previousIndex = null;
  this.noSelect = k;
}
mxUtils.extend(ChangePage, SelectPage);
ChangePage.prototype.execute = function() {
  this.ui.editor.fireEvent(new mxEventObject('beforePageChange', 'change', this));
  this.previousIndex = this.index;
  if (null == this.index) {
    var b = mxUtils.indexOf(this.ui.pages, this.relatedPage);
    this.ui.pages.splice(b, 1);
    this.index = b;
  } else
    this.ui.pages.splice(this.index, 0, this.relatedPage), this.index = null;
  this.noSelect || SelectPage.prototype.execute.apply(this, arguments);
};
EditorUi.prototype.tabContainerHeight = 36;
EditorUi.prototype.setTabContainerVisible = function(b) {
  this.tabContainerHeight = b ? EditorUi.prototype.tabContainerHeight : 0;
  isLocalStorage && (mxSettings.settings.pages = 0 < this.tabContainerHeight, mxSettings.save());
  this.editor.updateGraphComponents();
  this.refresh();
};
EditorUi.prototype.isTabContainerVisible = function() {
  return 0 < this.tabContainerHeight;
};
EditorUi.prototype.getSelectedPageIndex = function() {
  return this.getPageIndex(this.currentPage);
};
EditorUi.prototype.getPageIndex = function(b) {
  var e = null;
  if (null != this.pages && null != b)
    for (var f = 0; f < this.pages.length; f++)
      if (this.pages[f] == b) {
        e = f;
        break;
      }
  return e;
};
EditorUi.prototype.getPageById = function(b, e) {
  e = null != e ? e : this.pages;
  if (null != e)
    for (var f = 0; f < e.length; f++)
      if (e[f].getId() == b)
        return e[f];
  return null;
};
EditorUi.prototype.createImageForPageLink = function(b, e, f) {
  var c = b.indexOf(','),
    k = null;
  0 < c && (c = this.getPageById(b.substring(c + 1)), null != c && c != e && (k = this.getImageForPage(c, e, f), k.originalSrc = b));
  null == k && (k = {
    originalSrc: b
  });
  return k;
};
EditorUi.prototype.getImageForPage = function(b, e, f) {
  f = null != f ? f : this.editor.graph;
  var c = f.getGlobalVariable,
    k = this.createTemporaryGraph(f.getStylesheet());
  k.defaultPageBackgroundColor = f.defaultPageBackgroundColor;
  k.shapeBackgroundColor = f.shapeBackgroundColor;
  k.shapeForegroundColor = f.shapeForegroundColor;
  var m = this.getPageIndex(null != e ? e : this.currentPage);
  k.getGlobalVariable = function(y) {
    return 'pagenumber' == y ? m + 1 : 'page' == y && null != e ? e.getName() : c.apply(this, arguments);
  };
  document.body.appendChild(k.container);
  this.updatePageRoot(b);
  k.model.setRoot(b.root);
  b = Graph.foreignObjectWarningText;
  Graph.foreignObjectWarningText = '';
  f = k.getSvg(null, null, null, null, null, null, null, null, null, null, null, !0);
  var t = k.getGraphBounds();
  document.body.removeChild(k.container);
  Graph.foreignObjectWarningText = b;
  return new mxImage(Editor.createSvgDataUri(mxUtils.getXml(f)), t.width, t.height, t.x, t.y);
};
EditorUi.prototype.initPages = function() {
  if (!this.editor.graph.standalone) {
    this.actions.addAction('previousPage', mxUtils.bind(this, function() {
      this.selectNextPage(!1);
    }));
    this.actions.addAction('nextPage', mxUtils.bind(this, function() {
      this.selectNextPage(!0);
    }));
    this.isPagesEnabled() && (this.keyHandler.bindAction(33, !0, 'previousPage', !0), this.keyHandler.bindAction(34, !0, 'nextPage', !0));
    var b = this.editor.graph,
      e = b.view.validateBackground;
    b.view.validateBackground = mxUtils.bind(this, function() {
      if (null != this.tabContainer) {
        var m = this.tabContainer.style.height;
        this.tabContainer.style.height = null == this.fileNode || null == this.pages || 1 == this.pages.length && '0' == urlParams.pages ? '0px' : this.tabContainerHeight + 'px';
        m != this.tabContainer.style.height && this.refresh(!1);
      }
      e.apply(b.view, arguments);
    });
    var f = null,
      c = mxUtils.bind(this, function() {
        this.updateTabContainer();
        var m = this.currentPage;
        null != m && m != f && (null == m.viewState || null == m.viewState.scrollLeft ? (this.resetScrollbars(), b.isLightboxView() && this.lightboxFit(), null != this.chromelessResize && (b.container.scrollLeft = 0, b.container.scrollTop = 0, this.chromelessResize())) : (b.container.scrollLeft = b.view.translate.x * b.view.scale + m.viewState.scrollLeft, b.container.scrollTop = b.view.translate.y * b.view.scale + m.viewState.scrollTop), f = m);
        null != this.actions.layersWindow && this.actions.layersWindow.refreshLayers();
        'undefined' === typeof Editor.MathJaxClear || this.editor.graph.mathEnabled && null != this.editor || Editor.MathJaxClear();
      });
    this.editor.graph.model.addListener(mxEvent.CHANGE, mxUtils.bind(this, function(m, t) {
      m = t.getProperty('edit').changes;
      for (t = 0; t < m.length; t++)
        if (m[t] instanceof SelectPage || m[t] instanceof RenamePage || m[t] instanceof MovePage || m[t] instanceof mxRootChange) {
          c();
          break;
        }
    }));
    var k = mxUtils.bind(this, function() {
      this.updateDocumentTitle();
      this.updateTabContainer();
    });
    this.addListener('currentThemeChanged', k);
    this.editor.addListener('pageRenamed', k);
    this.editor.addListener('pageMoved', k);
    this.editor.addListener('fileLoaded', k);
    this.editor.addListener('fileLoaded', k);
    this.editor.addListener('pageSelected', mxUtils.bind(this, function(m, t) {
      c();
      this.scrollToPage();
      this.updateDocumentTitle();
      null != this.toolbar && this.toolbar.updateZoom();
    }));
    this.editor.addListener('pageMoved', mxUtils.bind(this, function(m, t) {
      this.scrollToPage();
    }));
    mxEvent.addListener(window, 'resize', mxUtils.bind(this, function() {
      this.checkTabScrollerOverflow();
    }));
  }
};
EditorUi.prototype.scrollToPage = function() {
  var b = this.getSelectedPageIndex();
  null != this.tabScroller && this.tabScroller.children.length > b && (this.tabScroller.children[b].scrollIntoView(), this.tabScroller.children[b].className = 'geTab gePageTab geActivePage', lastSelectedElt = this.tabScroller.children[b]);
};
EditorUi.prototype.restoreViewState = function(b, e, f) {
  b = null != b ? this.getPageById(b.getId()) : null;
  var c = this.editor.graph;
  null != b && null != this.currentPage && null != this.pages && (b != this.currentPage ? this.selectPage(b, !0, e) : (c.setViewState(e), this.editor.updateGraphComponents(), c.view.revalidate(), c.sizeDidChange()), c.container.scrollLeft = c.view.translate.x * c.view.scale + e.scrollLeft, c.container.scrollTop = c.view.translate.y * c.view.scale + e.scrollTop, c.restoreSelection(f));
};
Graph.prototype.createViewState = function(b) {
  var e = b.getAttribute('page'),
    f = parseFloat(b.getAttribute('pageScale')),
    c = parseFloat(b.getAttribute('pageWidth')),
    k = parseFloat(b.getAttribute('pageHeight')),
    m = b.getAttribute('background'),
    t = this.parseBackgroundImage(b.getAttribute('backgroundImage')),
    y = b.getAttribute('extFonts');
  if (y)
    try {
      y = y.split('|').map(function(E) {
        E = E.split('^');
        return {
          name: E[0],
          url: E[1]
        };
      });
    } catch (E) {
      console.log('ExtFonts format error: ' + E.message);
    }
  return {
    gridEnabled: '0' != b.getAttribute('grid'),
    gridSize: parseFloat(b.getAttribute('gridSize')) || mxGraph.prototype.gridSize,
    guidesEnabled: '0' != b.getAttribute('guides'),
    foldingEnabled: '0' != b.getAttribute('fold'),
    shadowVisible: '1' == b.getAttribute('shadow'),
    pageVisible: this.isLightboxView() ? !1 : null != e ? '0' != e : this.defaultPageVisible,
    background: null != m && 0 < m.length ? m : null,
    backgroundImage: t,
    pageScale: isNaN(f) ? mxGraph.prototype.pageScale : f,
    pageFormat: isNaN(c) || isNaN(k) ? 'undefined' === typeof mxSettings || null != this.defaultPageFormat ? mxGraph.prototype.pageFormat : mxSettings.getPageFormat() : new mxRectangle(0, 0, c, k),
    tooltips: '0' != b.getAttribute('tooltips'),
    connect: '0' != b.getAttribute('connect'),
    arrows: '0' != b.getAttribute('arrows'),
    mathEnabled: '1' == b.getAttribute('math'),
    selectionCells: null,
    defaultParent: null,
    scrollbars: this.defaultScrollbars,
    scale: 1,
    hiddenTags: [],
    extFonts: y || []
  };
};
Graph.prototype.saveViewState = function(b, e, f, c) {
  f || (e.setAttribute('grid', (null == b ? this.defaultGridEnabled : b.gridEnabled) ? '1' : '0'), e.setAttribute('page', (null == b ? this.defaultPageVisible : b.pageVisible) ? '1' : '0'), e.setAttribute('gridSize', null != b ? b.gridSize : mxGraph.prototype.gridSize), e.setAttribute('guides', null == b || b.guidesEnabled ? '1' : '0'), e.setAttribute('tooltips', null == b || b.tooltips ? '1' : '0'), e.setAttribute('connect', null == b || b.connect ? '1' : '0'), e.setAttribute('arrows', null == b || b.arrows ? '1' : '0'), e.setAttribute('fold', null == b || b.foldingEnabled ? '1' : '0'));
  e.setAttribute('pageScale', null != b && null != b.pageScale ? b.pageScale : mxGraph.prototype.pageScale);
  f = null != b ? b.pageFormat : 'undefined' === typeof mxSettings || null != this.defaultPageFormat ? mxGraph.prototype.pageFormat : mxSettings.getPageFormat();
  null != f && (e.setAttribute('pageWidth', f.width), e.setAttribute('pageHeight', f.height));
  null != b && (null != b.background && e.setAttribute('background', b.background), c = this.getBackgroundImageObject(b.backgroundImage, c), null != c && e.setAttribute('backgroundImage', JSON.stringify(c)));
  e.setAttribute('math', (null == b ? this.defaultMathEnabled : b.mathEnabled) ? '1' : '0');
  e.setAttribute('shadow', null != b && b.shadowVisible ? '1' : '0');
  null != b && null != b.extFonts && 0 < b.extFonts.length && e.setAttribute('extFonts', b.extFonts.map(function(k) {
    return k.name + '^' + k.url;
  }).join('|'));
};
Graph.prototype.getViewState = function() {
  return {
    defaultParent: this.defaultParent,
    currentRoot: this.view.currentRoot,
    gridEnabled: this.gridEnabled,
    gridSize: this.gridSize,
    guidesEnabled: this.graphHandler.guidesEnabled,
    foldingEnabled: this.foldingEnabled,
    shadowVisible: this.shadowVisible,
    scrollbars: this.scrollbars,
    pageVisible: this.pageVisible,
    background: this.background,
    backgroundImage: this.backgroundImage,
    pageScale: this.pageScale,
    pageFormat: this.pageFormat,
    tooltips: this.tooltipHandler.isEnabled(),
    connect: this.connectionHandler.isEnabled(),
    arrows: this.connectionArrowsEnabled,
    scale: this.view.scale,
    scrollLeft: this.container.scrollLeft - this.view.translate.x * this.view.scale,
    scrollTop: this.container.scrollTop - this.view.translate.y * this.view.scale,
    translate: this.view.translate.clone(),
    lastPasteXml: this.lastPasteXml,
    pasteCounter: this.pasteCounter,
    mathEnabled: this.mathEnabled,
    hiddenTags: this.hiddenTags,
    extFonts: this.extFonts
  };
};
Graph.prototype.setViewState = function(b, e) {
  if (null != b) {
    this.lastPasteXml = b.lastPasteXml;
    this.pasteCounter = b.pasteCounter || 0;
    this.mathEnabled = b.mathEnabled;
    this.gridEnabled = b.gridEnabled;
    this.gridSize = b.gridSize;
    this.graphHandler.guidesEnabled = b.guidesEnabled;
    this.foldingEnabled = b.foldingEnabled;
    this.setShadowVisible(b.shadowVisible, !1);
    this.scrollbars = b.scrollbars;
    this.pageVisible = !this.isViewer() && b.pageVisible;
    this.background = b.background;
    this.pageScale = b.pageScale;
    this.pageFormat = b.pageFormat;
    this.view.currentRoot = b.currentRoot;
    this.defaultParent = b.defaultParent;
    this.connectionArrowsEnabled = b.arrows;
    this.setTooltips(b.tooltips);
    this.setConnectable(b.connect);
    this.setBackgroundImage(b.backgroundImage);
    this.hiddenTags = b.hiddenTags;
    var f = this.extFonts;
    this.extFonts = b.extFonts || [];
    if (e && null != f)
      for (e = 0; e < f.length; e++) {
        var c = document.getElementById('extFont_' + f[e].name);
        null != c && c.parentNode.removeChild(c);
      }
    for (e = 0; e < this.extFonts.length; e++)
      this.addExtFont(this.extFonts[e].name, this.extFonts[e].url, !0);
    this.view.scale = null != b.scale ? b.scale : 1;
    null == this.view.currentRoot || this.model.contains(this.view.currentRoot) || (this.view.currentRoot = null);
    null == this.defaultParent || this.model.contains(this.defaultParent) || (this.setDefaultParent(null), this.selectUnlockedLayer());
    null != b.translate && (this.view.translate = b.translate);
  } else
    this.view.currentRoot = null, this.view.scale = 1, this.gridEnabled = this.defaultGridEnabled, this.gridSize = mxGraph.prototype.gridSize, this.pageScale = mxGraph.prototype.pageScale, this.pageFormat = 'undefined' === typeof mxSettings || null != this.defaultPageFormat ? mxGraph.prototype.pageFormat : mxSettings.getPageFormat(), this.pageVisible = this.defaultPageVisible, this.backgroundImage = this.background = null, this.scrollbars = this.defaultScrollbars, this.foldingEnabled = this.graphHandler.guidesEnabled = !0, this.setShadowVisible(!1, !1), this.defaultParent = null, this.setTooltips(!0), this.setConnectable(!0), this.lastPasteXml = null, this.pasteCounter = 0, this.mathEnabled = this.defaultMathEnabled, this.connectionArrowsEnabled = !0, this.hiddenTags = [], this.extFonts = [];
  this.preferPageSize = this.pageBreaksVisible = this.pageVisible;
  this.fireEvent(new mxEventObject('viewStateChanged', 'state', b));
};
Graph.prototype.addExtFont = function(b, e, f) {
  if (b && e) {
    '1' != urlParams['ext-fonts'] && (Graph.recentCustomFonts[b.toLowerCase()] = {
      name: b,
      url: e
    });
    var c = 'extFont_' + b;
    if (null == document.getElementById(c))
      if (0 == e.indexOf(Editor.GOOGLE_FONTS))
        mxClient.link('stylesheet', e, null, c);
      else {
        document.getElementsByTagName('head');
        var k = document.createElement('style');
        k.appendChild(document.createTextNode('@font-face {\n\tfont-family: "' + b + '";\n\tsrc: url("' + e + '");\n}'));
        k.setAttribute('id', c);
        document.getElementsByTagName('head')[0].appendChild(k);
      }
    if (!f) {
      null == this.extFonts && (this.extFonts = []);
      f = this.extFonts;
      c = !0;
      for (k = 0; k < f.length; k++)
        if (f[k].name == b) {
          c = !1;
          break;
        }
      c && this.extFonts.push({
        name: b,
        url: e
      });
    }
  }
};
EditorUi.prototype.updatePageRoot = function(b, e) {
  if (null == b.root) {
    e = this.editor.extractGraphModel(b.node, null, e);
    var f = Editor.extractParserError(e);
    if (f)
      throw Error(f);
    null != e ? (b.graphModelNode = e, b.viewState = this.editor.graph.createViewState(e), f = new mxCodec(e.ownerDocument), b.root = f.decode(e).root) : b.root = this.editor.graph.model.createRoot();
  } else if (null == b.viewState) {
    if (null == b.graphModelNode) {
      e = this.editor.extractGraphModel(b.node);
      if (f = Editor.extractParserError(e))
        throw Error(f);
      null != e && (b.graphModelNode = e);
    }
    null != b.graphModelNode && (b.viewState = this.editor.graph.createViewState(b.graphModelNode));
  }
  return b;
};
EditorUi.prototype.selectPage = function(b, e, f) {
  try {
    if (b != this.currentPage) {
      this.editor.graph.isEditing() && this.editor.graph.stopEditing(!1);
      e = null != e ? e : !1;
      this.editor.graph.isMouseDown = !1;
      this.editor.graph.reset();
      var c = this.editor.graph.model.createUndoableEdit();
      c.ignoreEdit = !0;
      var k = new SelectPage(this, b, f);
      k.execute();
      c.add(k);
      c.notify();
      this.editor.graph.tooltipHandler.hide();
      e || this.editor.graph.model.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', c));
    }
  } catch (m) {
    this.handleError(m);
  }
};
EditorUi.prototype.selectNextPage = function(b) {
  var e = this.currentPage;
  null != e && null != this.pages && (e = mxUtils.indexOf(this.pages, e), b ? this.selectPage(this.pages[mxUtils.mod(e + 1, this.pages.length)]) : b || this.selectPage(this.pages[mxUtils.mod(e - 1, this.pages.length)]));
};
EditorUi.prototype.insertPage = function(b, e) {
  this.editor.graph.isEnabled() && (this.editor.graph.isEditing() && this.editor.graph.stopEditing(!1), b = null != b ? b : this.createPage(null, this.createPageId()), e = null != e ? e : this.pages.length, e = new ChangePage(this, b, b, e), this.editor.graph.model.execute(e));
  return b;
};
EditorUi.prototype.createPageId = function() {
  do
    var b = Editor.guid();
  while (null != this.getPageById(b));
  return b;
};
EditorUi.prototype.createPage = function(b, e) {
  e = new DiagramPage(this.fileNode.ownerDocument.createElement('diagram'), e);
  e.setName(null != b ? b : this.createPageName());
  this.initDiagramNode(e);
  return e;
};
EditorUi.prototype.createPageName = function() {
  for (var b = {}, e = 0; e < this.pages.length; e++) {
    var f = this.pages[e].getName();
    null != f && 0 < f.length && (b[f] = f);
  }
  e = this.pages.length;
  do
    f = mxResources.get('pageWithNumber', [++e]);
  while (null != b[f]);
  return f;
};
EditorUi.prototype.removePage = function(b) {
  try {
    var e = this.editor.graph,
      f = mxUtils.indexOf(this.pages, b);
    if (e.isEnabled() && 0 <= f) {
      this.editor.graph.isEditing() && this.editor.graph.stopEditing(!1);
      e.model.beginUpdate();
      try {
        var c = this.currentPage;
        c == b && 1 < this.pages.length ? (f == this.pages.length - 1 ? f-- : f++, c = this.pages[f]) : 1 >= this.pages.length && (c = this.insertPage(), e.model.execute(new RenamePage(this, c, mxResources.get('pageWithNumber', [1]))));
        e.model.execute(new ChangePage(this, b, c));
      } finally {
        e.model.endUpdate();
      }
    }
  } catch (k) {
    this.handleError(k);
  }
  return b;
};
EditorUi.prototype.duplicatePage = function(b, e) {
  var f = null;
  try {
    var c = this.editor.graph;
    if (c.isEnabled()) {
      c.isEditing() && c.stopEditing();
      var k = b.node.cloneNode(!1);
      k.removeAttribute('id');
      var m = {},
        t = c.createCellLookup([c.model.root]);
      f = new DiagramPage(k);
      f.root = c.cloneCell(c.model.root, null, m);
      var y = new mxGraphModel();
      y.prefix = Editor.guid() + '-';
      y.setRoot(f.root);
      c.updateCustomLinks(c.createCellMapping(m, t), [f.root]);
      f.viewState = b == this.currentPage ? c.getViewState() : b.viewState;
      this.initDiagramNode(f);
      f.viewState.scale = 1;
      f.viewState.scrollLeft = null;
      f.viewState.scrollTop = null;
      f.viewState.currentRoot = null;
      f.viewState.defaultParent = null;
      f.setName(e);
      f = this.insertPage(f, mxUtils.indexOf(this.pages, b) + 1);
    }
  } catch (E) {
    this.handleError(E);
  }
  return f;
};
EditorUi.prototype.initDiagramNode = function(b) {
  var e = new mxCodec(mxUtils.createXmlDocument()).encode(new mxGraphModel(b.root));
  this.editor.graph.saveViewState(b.viewState, e);
  mxUtils.setTextContent(b.node, Graph.compressNode(e));
};
EditorUi.prototype.clonePages = function(b) {
  for (var e = [], f = 0; f < b.length; f++)
    e.push(this.clonePage(b[f]));
  return e;
};
EditorUi.prototype.clonePage = function(b) {
  this.updatePageRoot(b);
  var e = new DiagramPage(b.node.cloneNode(!0)),
    f = b == this.currentPage ? this.editor.graph.getViewState() : b.viewState;
  e.viewState = mxUtils.clone(f, EditorUi.transientViewStateProperties);
  e.root = this.editor.graph.model.cloneCell(b.root, null, !0);
  return e;
};
EditorUi.prototype.renamePage = function(b) {
  if (this.editor.graph.isEnabled()) {
    var e = new FilenameDialog(this, b.getName(), mxResources.get('rename'), mxUtils.bind(this, function(f) {
      null != f && 0 < f.length && this.editor.graph.model.execute(new RenamePage(this, b, f));
    }), mxResources.get('rename'));
    this.showDialog(e.container, 300, 80, !0, !0);
    e.init();
  }
  return b;
};
EditorUi.prototype.movePage = function(b, e) {
  this.editor.graph.model.execute(new MovePage(this, b, e));
};
EditorUi.prototype.createTabContainer = function() {
  var b = document.createElement('div');
  b.className = 'geTabContainer geTabItem';
  return b;
};
EditorUi.prototype.updateTabContainer = function() {
  if (null != this.tabContainer && null != this.pages) {
    var b = this.editor.graph,
      e = document.createElement('div');
    e.className = 'geTabScroller';
    for (var f = null, c = 0; c < this.pages.length; c++)
      mxUtils.bind(this, function(k, m) {
        m.className = this.pages[k] == this.currentPage ? 'geTab gePageTab geActivePage' : 'geTab gePageTab geInactivePage';
        m.setAttribute('draggable', 'true');
        mxEvent.addListener(m, 'dragstart', mxUtils.bind(this, function(t) {
          b.isEnabled() ? (mxClient.IS_FF && t.dataTransfer.setData('Text', '<diagram/>'), f = k) : mxEvent.consume(t);
        }));
        mxEvent.addListener(m, 'dragend', mxUtils.bind(this, function(t) {
          f = null;
          t.stopPropagation();
          t.preventDefault();
        }));
        mxEvent.addListener(m, 'dragover', mxUtils.bind(this, function(t) {
          null != f && (t.dataTransfer.dropEffect = 'move');
          t.stopPropagation();
          t.preventDefault();
        }));
        mxEvent.addListener(m, 'drop', mxUtils.bind(this, function(t) {
          null != f && k != f && this.movePage(f, k);
          t.stopPropagation();
          t.preventDefault();
        }));
        e.appendChild(m);
      })(c, this.createTabForPage(this.pages[c], c + 1));
    c = null != this.tabScroller ? this.tabScroller.scrollLeft : 0;
    this.tabContainer.innerText = '';
    'simple' != Editor.currentTheme && (this.pageMenuTab = this.createPageMenuTab(), this.tabContainer.appendChild(this.pageMenuTab));
    this.tabContainer.appendChild(e);
    this.isPageInsertTabVisible() && this.tabContainer.appendChild(this.createPageInsertTab());
    this.leftScrollTab = this.createLeftScrollTab();
    this.tabContainer.appendChild(this.leftScrollTab);
    this.rightScrollTab = this.createRightScrollTab();
    this.tabContainer.appendChild(this.rightScrollTab);
    this.tabScroller = e;
    this.tabScroller.scrollLeft = c;
    this.checkTabScrollerOverflow();
    mxEvent.addListener(this.tabScroller, 'scroll', mxUtils.bind(this, function(k) {
      this.checkTabScrollerOverflow();
    }));
    window.setTimeout(mxUtils.bind(this, function() {
      mxUtils.setPrefixedStyle(this.leftScrollTab.style, 'transition', 'all 0.2s linear');
      mxUtils.setPrefixedStyle(this.rightScrollTab.style, 'transition', 'all 0.2s linear');
    }), 0);
  }
};
EditorUi.prototype.checkTabScrollerOverflow = function() {
  if (null != this.tabScroller && null != this.tabContainer && 2 < this.tabContainer.children.length) {
    var b = this.tabScroller.scrollWidth > this.tabScroller.offsetWidth;
    this.leftScrollTab.style.opacity = b ? 0 == this.tabScroller.scrollLeft ? 0.2 : 1 : 0;
    this.rightScrollTab.style.opacity = b ? Math.ceil(this.tabScroller.scrollLeft) + this.tabScroller.offsetWidth >= this.tabScroller.scrollWidth ? 0.2 : 1 : 0;
  }
};
EditorUi.prototype.isPageInsertTabVisible = function() {
  return 1 == urlParams.embed || null != this.getCurrentFile() && this.getCurrentFile().isEditable();
};
EditorUi.prototype.createTab = function() {
  var b = document.createElement('div');
  b.className = 'geTab';
  return b;
};
EditorUi.prototype.getShortPageName = function(b) {
  var e = null;
  null != b && (e = b.getName(), null != e && 36 < e.length && (e = e.substring(0, 34) + '...'));
  return e;
};
EditorUi.prototype.createControlTab = function(b, e, f) {
  var c = this.createTab();
  c.className = 'geTab geControlTab';
  c.style.width = '30px';
  null != b && c.setAttribute('title', b);
  b = document.createElement('div');
  b.className = 'geAdaptiveAsset';
  b.style.backgroundImage = 'url(' + e + ')';
  b.style.backgroundRepeat = 'no-repeat';
  b.style.backgroundPosition = 'center';
  b.style.backgroundSize = '24px';
  b.style.position = 'relative';
  b.style.opacity = '0.5';
  b.style.width = '100%';
  b.style.height = '100%';
  c.appendChild(b);
  mxEvent.addListener(c, 'click', f);
  return c;
};
EditorUi.prototype.createPageInsertTab = function() {
  return this.createControlTab(mxResources.get('insertPage'), Editor.plusImage, mxUtils.bind(this, function(b) {
    this.insertPage();
    mxEvent.consume(b);
  }));
};
EditorUi.prototype.createLeftScrollTab = function() {
  return this.createControlTab(null, Editor.thinArrowLeftImage, mxUtils.bind(this, function(b) {
    var e = Math.max(60, this.tabScroller.clientWidth / 2);
    null != this.tabScroller.scrollBy ? this.tabScroller.scrollBy({
      left: -e,
      top: 0,
      behavior: 'smooth'
    }) : this.tabScroller.scrollLeft -= e;
    mxEvent.consume(b);
  }));
};
EditorUi.prototype.createRightScrollTab = function() {
  return this.createControlTab(null, Editor.thinArrowRightImage, mxUtils.bind(this, function(b) {
    var e = Math.max(60, this.tabScroller.clientWidth / 2);
    null != this.tabScroller.scrollBy ? this.tabScroller.scrollBy({
      left: e,
      top: 0,
      behavior: 'smooth'
    }) : this.tabScroller.scrollLeft += e;
    mxEvent.consume(b);
  }));
};
EditorUi.prototype.createPageMenuTab = function() {
  return this.createControlTab(mxResources.get('pages'), Editor.verticalDotsImage, mxUtils.bind(this, function(b) {
    this.editor.graph.popupMenuHandler.hideMenu();
    var e = new mxPopupMenu(mxUtils.bind(this, function(k, m) {
      this.menus.get('pages').funct(k, m);
    }));
    e.div.className += ' geMenubarMenu';
    e.smartSeparators = !0;
    e.showDisabled = !0;
    e.autoExpand = !0;
    e.hideMenu = mxUtils.bind(this, function() {
      mxPopupMenu.prototype.hideMenu.apply(e, arguments);
      e.destroy();
    });
    var f = mxEvent.getClientX(b),
      c = mxEvent.getClientY(b);
    e.popup(f, c, null, b);
    this.setCurrentMenu(e);
    mxEvent.consume(b);
  }));
};
EditorUi.prototype.createTabForPage = function(b, e) {
  var f = this.createTab(),
    c = b.getName() || mxResources.get('untitled'),
    k = b.getId();
  f.setAttribute('title', c + (null != k ? ' (' + k + ')' : '') + ' [' + e + ']');
  e = document.createElement('span');
  mxUtils.write(e, c);
  f.appendChild(e);
  this.addTabListeners(b, f);
  return f;
};
EditorUi.prototype.addTabListeners = function(b, e) {
  mxEvent.disableContextMenu(e);
  var f = this.editor.graph;
  mxEvent.addListener(e, 'dblclick', mxUtils.bind(this, function(E) {
    this.renamePage(b);
    mxEvent.consume(E);
  }));
  var c = document.createElement('div');
  c.className = 'geTabMenuButton';
  c.style.backgroundImage = 'url(' + mxWindow.prototype.minimizeImage + ')';
  c.style.backgroundPosition = 'center center';
  c.style.backgroundRepeat = 'no-repeat';
  c.style.backgroundSize = '10px';
  e.appendChild(c);
  var k = !1,
    m = !1,
    t = mxUtils.bind(this, function(E) {
      k = null != this.currentMenu;
      m = b == this.currentPage;
      f.isMouseDown || m || this.selectPage(b);
      this.scrollToPage();
    }),
    y = mxUtils.bind(this, function(E) {
      if (f.isEnabled() && !f.isMouseDown && (m && (mxEvent.isTouchEvent(E) || mxEvent.getSource(E) == c) || mxEvent.isPopupTrigger(E)) && (f.popupMenuHandler.hideMenu(), this.hideCurrentMenu(), !mxEvent.isTouchEvent(E) || !k)) {
        var z = new mxPopupMenu(this.createPageMenu(b));
        z.div.className += ' geMenubarMenu';
        z.smartSeparators = !0;
        z.showDisabled = !0;
        z.autoExpand = !0;
        z.hideMenu = mxUtils.bind(this, function() {
          mxPopupMenu.prototype.hideMenu.apply(z, arguments);
          this.resetCurrentMenu();
          z.destroy();
        });
        var D = mxEvent.getClientX(E),
          J = mxEvent.getClientY(E);
        z.popup(D, J, null, E);
        this.setCurrentMenu(z, e);
      }
      mxEvent.consume(E);
    });
  mxEvent.addGestureListeners(c, t, null, y);
  mxEvent.addGestureListeners(e, t, null, y);
};
EditorUi.prototype.getLinkForPage = function(b, e, f) {
  if (null != b && !mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp) {
    var c = this.getCurrentFile();
    if (null != c && c.constructor != LocalFile && 'draw.io' == this.getServiceName()) {
      var k = this.getSearch('create title mode url drive splash state clibs ui viewbox hide-pages sketch'.split(' '));
      k += (0 == k.length ? '?' : '&') + 'page-id=' + b.getId();
      null != e && (k += '&' + e.join('&'));
      return (f && '1' != urlParams.dev ? EditorUi.lightboxHost : mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || !/.*\.draw\.io$/.test(window.location.hostname) ? EditorUi.drawHost : 'https://' + window.location.host) + '/' + k + '#' + c.getHash();
    }
  }
  return null;
};
EditorUi.prototype.createPageMenu = function(b, e) {
  return mxUtils.bind(this, function(f, c) {
    mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || 'draw.io' != this.getServiceName() || f.addItem(mxResources.get('openInNewWindow'), null, mxUtils.bind(this, function() {
      this.editor.editAsNew(this.getFileData(!0, null, null, null, !0, !0));
    }), c);
    null != this.getLinkForPage(b) && f.addItem(mxResources.get('link') + '...', null, mxUtils.bind(this, function() {
      this.showPageLinkDialog(b);
    }));
    f.addSeparator(c);
    f.addItem(mxResources.get('rename') + '...', null, mxUtils.bind(this, function() {
      this.renamePage(b, e);
    }), c);
    f.addItem(mxResources.get('delete'), null, mxUtils.bind(this, function() {
      this.removePage(b);
    }), c);
    this.currentPage == b && 1 < this.pages.length && (this.menus.addSubmenu('movePage', f, c, mxResources.get('move')), f.addSeparator(c));
    f.addSeparator(c);
    f.addItem(mxResources.get('duplicate'), null, mxUtils.bind(this, function() {
      this.duplicatePage(b, mxResources.get('copyOf', [b.getName()]));
    }), c);
  });
};
EditorUi.prototype.showPageLinkDialog = function(b) {
  var e = this.editor.graph;
  this.showPublishLinkDialog(mxResources.get('url'), !0, null, null, mxUtils.bind(this, function(f, c, k, m, t, y) {
    f = this.createUrlParameters(f, c, k, m, t, y);
    k || f.push('hide-pages=1');
    e.isSelectionEmpty() || (k = e.getBoundingBox(e.getSelectionCells()), c = e.view.translate, t = e.view.scale, k.width /= t, k.height /= t, k.x = k.x / t - c.x, k.y = k.y / t - c.y, f.push('viewbox=' + encodeURIComponent(JSON.stringify({
      x: Math.round(k.x),
      y: Math.round(k.y),
      width: Math.round(k.width),
      height: Math.round(k.height),
      border: 100
    }))));
    m = new EmbedDialog(this, this.getLinkForPage(b, f, m));
    this.showDialog(m.container, 450, 240, !0, !0);
    m.init();
  }));
};
(function() {
  mxCodecRegistry.getCodec(ChangePageSetup).exclude.push('page');
}());
(function() {
  var b = new mxObjectCodec(new MovePage(), ['ui']);
  b.beforeDecode = function(e, f, c) {
    c.ui = e.ui;
    return f;
  };
  b.afterDecode = function(e, f, c) {
    e = c.oldIndex;
    c.oldIndex = c.newIndex;
    c.newIndex = e;
    return c;
  };
  mxCodecRegistry.register(b);
}());
(function() {
  var b = new mxObjectCodec(new RenamePage(), [
    'ui',
    'page'
  ]);
  b.beforeDecode = function(e, f, c) {
    c.ui = e.ui;
    return f;
  };
  b.afterDecode = function(e, f, c) {
    e = c.previous;
    c.previous = c.name;
    c.name = e;
    return c;
  };
  mxCodecRegistry.register(b);
}());
(function() {
  var b = new mxObjectCodec(new ChangePage(), 'ui relatedPage index neverShown page previousPage'.split(' '));
  b.afterEncode = function(e, f, c) {
    c.setAttribute('relatedPage', f.relatedPage.getId());
    null == f.index && (c.setAttribute('name', f.relatedPage.getName()), null != f.relatedPage.viewState && c.setAttribute('viewState', JSON.stringify(f.relatedPage.viewState, function(k, m) {
      return 0 > mxUtils.indexOf(EditorUi.transientViewStateProperties, k) ? m : void 0;
    })), null != f.relatedPage.root && e.encodeCell(f.relatedPage.root, c));
    return c;
  };
  b.beforeDecode = function(e, f, c) {
    c.ui = e.ui;
    c.relatedPage = c.ui.getPageById(f.getAttribute('relatedPage'));
    if (null == c.relatedPage) {
      var k = f.ownerDocument.createElement('diagram');
      k.setAttribute('id', f.getAttribute('relatedPage'));
      k.setAttribute('name', f.getAttribute('name'));
      c.relatedPage = new DiagramPage(k);
      k = f.getAttribute('viewState');
      null != k && (c.relatedPage.viewState = JSON.parse(k), f.removeAttribute('viewState'));
      f = f.cloneNode(!0);
      k = f.firstChild;
      if (null != k)
        for (c.relatedPage.root = e.decodeCell(k, !1), c = k.nextSibling, k.parentNode.removeChild(k), k = c; null != k;) {
          c = k.nextSibling;
          if (k.nodeType == mxConstants.NODETYPE_ELEMENT) {
            var m = k.getAttribute('id');
            null == e.lookup(m) && e.decodeCell(k);
          }
          k.parentNode.removeChild(k);
          k = c;
        }
    }
    return f;
  };
  b.afterDecode = function(e, f, c) {
    c.index = c.previousIndex;
    return c;
  };
  mxCodecRegistry.register(b);
}());
(function() {
  EditorUi.prototype.altShiftActions[68] = 'selectDescendants';
  var b = Graph.prototype.foldCells;
  Graph.prototype.foldCells = function(c, k, m, t, y) {
    k = null != k ? k : !1;
    null == m && (m = this.getFoldableCells(this.getSelectionCells(), c));
    this.stopEditing();
    this.model.beginUpdate();
    try {
      for (var E = m.slice(), z = 0; z < m.length; z++)
        '1' == mxUtils.getValue(this.getCurrentCellStyle(m[z]), 'treeFolding', '0') && this.foldTreeCell(c, m[z]);
      m = E;
      m = b.apply(this, arguments);
    } finally {
      this.model.endUpdate();
    }
    return m;
  };
  Graph.prototype.foldTreeCell = function(c, k) {
    this.model.beginUpdate();
    try {
      var m = [];
      this.traverse(k, !0, mxUtils.bind(this, function(y, E) {
        var z = null != E && this.isTreeEdge(E);
        z && m.push(E);
        y == k || null != E && !z || m.push(y);
        return (null == E || z) && (y == k || !this.model.isCollapsed(y));
      }));
      this.model.setCollapsed(k, c);
      for (var t = 0; t < m.length; t++)
        this.model.setVisible(m[t], !c);
    } finally {
      this.model.endUpdate();
    }
  };
  Graph.prototype.isTreeEdge = function(c) {
    return !this.isEdgeIgnored(c);
  };
  Graph.prototype.getTreeEdges = function(c, k, m, t, y, E) {
    return this.model.filterCells(this.getEdges(c, k, m, t, y, E), mxUtils.bind(this, function(z) {
      return this.isTreeEdge(z);
    }));
  };
  Graph.prototype.getIncomingTreeEdges = function(c, k) {
    return this.getTreeEdges(c, k, !0, !1, !1);
  };
  Graph.prototype.getOutgoingTreeEdges = function(c, k) {
    return this.getTreeEdges(c, k, !1, !0, !1);
  };
  var e = EditorUi.prototype.init;
  EditorUi.prototype.init = function() {
    e.apply(this, arguments);
    this.editor.isChromelessView() && !this.editor.editable || this.addTrees();
  };
  EditorUi.prototype.addTrees = function() {
    function c(I) {
      return n.isVertex(I) && m(I);
    }

    function k(I) {
      var Q = !1;
      null != I && (Q = '1' == g.getCurrentCellStyle(I).treeMoving);
      return Q;
    }

    function m(I) {
      var Q = !1;
      null != I && (I = n.getParent(I), Q = g.view.getState(I), Q = 'tree' == (null != Q ? Q.style : g.getCellStyle(I)).containerType);
      return Q;
    }

    function t(I) {
      var Q = !1;
      null != I && (I = n.getParent(I), Q = g.view.getState(I), g.view.getState(I), Q = null != (null != Q ? Q.style : g.getCellStyle(I)).childLayout);
      return Q;
    }

    function y(I) {
      I = g.view.getState(I);
      if (null != I) {
        var Q = g.getIncomingTreeEdges(I.cell);
        if (0 < Q.length && (Q = g.view.getState(Q[0]), null != Q && (Q = Q.absolutePoints, null != Q && 0 < Q.length && (Q = Q[Q.length - 1], null != Q)))) {
          if (Q.y == I.y && Math.abs(Q.x - I.getCenterX()) < I.width / 2)
            return mxConstants.DIRECTION_SOUTH;
          if (Q.y == I.y + I.height && Math.abs(Q.x - I.getCenterX()) < I.width / 2)
            return mxConstants.DIRECTION_NORTH;
          if (Q.x > I.getCenterX())
            return mxConstants.DIRECTION_WEST;
        }
      }
      return mxConstants.DIRECTION_EAST;
    }

    function E(I, Q) {
      Q = null != Q ? Q : !0;
      g.model.beginUpdate();
      try {
        var P = g.model.getParent(I),
          O = g.getIncomingTreeEdges(I),
          W = g.cloneCells([
            O[0],
            I
          ]);
        g.model.setTerminal(W[0], g.model.getTerminal(O[0], !0), !0);
        var p = y(I),
          B = P.geometry;
        p == mxConstants.DIRECTION_SOUTH || p == mxConstants.DIRECTION_NORTH ? W[1].geometry.x += Q ? I.geometry.width + 10 : -W[1].geometry.width - 10 : W[1].geometry.y += Q ? I.geometry.height + 10 : -W[1].geometry.height - 10;
        g.view.currentRoot != P && (W[1].geometry.x -= B.x, W[1].geometry.y -= B.y);
        var N = g.view.getState(I),
          S = g.view.scale;
        if (null != N) {
          var R = mxRectangle.fromRectangle(N);
          p == mxConstants.DIRECTION_SOUTH || p == mxConstants.DIRECTION_NORTH ? R.x += (Q ? I.geometry.width + 10 : -W[1].geometry.width - 10) * S : R.y += (Q ? I.geometry.height + 10 : -W[1].geometry.height - 10) * S;
          var V = g.getOutgoingTreeEdges(g.model.getTerminal(O[0], !0));
          if (null != V) {
            for (var T = p == mxConstants.DIRECTION_SOUTH || p == mxConstants.DIRECTION_NORTH, U = B = O = 0; U < V.length; U++) {
              var X = g.model.getTerminal(V[U], !1);
              if (p == y(X)) {
                var Z = g.view.getState(X);
                X != I && null != Z && (T && Q != Z.getCenterX() < N.getCenterX() || !T && Q != Z.getCenterY() < N.getCenterY()) && mxUtils.intersects(R, Z) && (O = 10 + Math.max(O, (Math.min(R.x + R.width, Z.x + Z.width) - Math.max(R.x, Z.x)) / S), B = 10 + Math.max(B, (Math.min(R.y + R.height, Z.y + Z.height) - Math.max(R.y, Z.y)) / S));
              }
            }
            T ? B = 0 : O = 0;
            for (U = 0; U < V.length; U++)
              if (X = g.model.getTerminal(V[U], !1), p == y(X) && (Z = g.view.getState(X), X != I && null != Z && (T && Q != Z.getCenterX() < N.getCenterX() || !T && Q != Z.getCenterY() < N.getCenterY()))) {
                var Y = [];
                g.traverse(Z.cell, !0, function(ea, aa) {
                  var fa = null != aa && g.isTreeEdge(aa);
                  fa && Y.push(aa);
                  (null == aa || fa) && Y.push(ea);
                  return null == aa || fa;
                });
                g.moveCells(Y, (Q ? 1 : -1) * O, (Q ? 1 : -1) * B);
              }
          }
        }
        return g.addCells(W, P);
      } finally {
        g.model.endUpdate();
      }
    }

    function z(I) {
      g.model.beginUpdate();
      try {
        var Q = y(I),
          P = g.getIncomingTreeEdges(I),
          O = g.cloneCells([
            P[0],
            I
          ]);
        g.model.setTerminal(P[0], O[1], !1);
        g.model.setTerminal(O[0], O[1], !0);
        g.model.setTerminal(O[0], I, !1);
        var W = g.model.getParent(I),
          p = W.geometry,
          B = [];
        g.view.currentRoot != W && (O[1].geometry.x -= p.x, O[1].geometry.y -= p.y);
        g.traverse(I, !0, function(R, V) {
          var T = null != V && g.isTreeEdge(V);
          T && B.push(V);
          (null == V || T) && B.push(R);
          return null == V || T;
        });
        var N = I.geometry.width + 40,
          S = I.geometry.height + 40;
        Q == mxConstants.DIRECTION_SOUTH ? N = 0 : Q == mxConstants.DIRECTION_NORTH ? (N = 0, S = -S) : Q == mxConstants.DIRECTION_WEST ? (N = -N, S = 0) : Q == mxConstants.DIRECTION_EAST && (S = 0);
        g.moveCells(B, N, S);
        return g.addCells(O, W);
      } finally {
        g.model.endUpdate();
      }
    }

    function D(I, Q) {
      g.model.beginUpdate();
      try {
        var P = g.model.getParent(I),
          O = g.getIncomingTreeEdges(I),
          W = y(I);
        0 == O.length && (O = [g.createEdge(P, null, '', null, null, g.createCurrentEdgeStyle())], W = Q);
        var p = g.cloneCells([
          O[0],
          I
        ]);
        g.model.setTerminal(p[0], I, !0);
        null == g.model.getTerminal(p[0], !1) && (g.model.setTerminal(p[0], p[1], !1), g.applyNewEdgeStyle(p[1], [p[0]], W));
        O = g.getOutgoingTreeEdges(I);
        var B = P.geometry;
        Q = [];
        g.view.currentRoot == P && (B = new mxRectangle());
        for (var N = 0; N < O.length; N++) {
          var S = g.model.getTerminal(O[N], !1);
          null != S && Q.push(S);
        }
        var R = g.view.getBounds(Q),
          V = g.view.translate,
          T = g.view.scale;
        W == mxConstants.DIRECTION_SOUTH ? (p[1].geometry.x = null == R ? I.geometry.x + (I.geometry.width - p[1].geometry.width) / 2 : (R.x + R.width) / T - V.x - B.x + 10, p[1].geometry.y += p[1].geometry.height - B.y + 40) : W == mxConstants.DIRECTION_NORTH ? (p[1].geometry.x = null == R ? I.geometry.x + (I.geometry.width - p[1].geometry.width) / 2 : (R.x + R.width) / T - V.x + -B.x + 10, p[1].geometry.y -= p[1].geometry.height + B.y + 40) : (p[1].geometry.x = W == mxConstants.DIRECTION_WEST ? p[1].geometry.x - (p[1].geometry.width + B.x + 40) : p[1].geometry.x + (p[1].geometry.width - B.x + 40), p[1].geometry.y = null == R ? I.geometry.y + (I.geometry.height - p[1].geometry.height) / 2 : (R.y + R.height) / T - V.y + -B.y + 10);
        return g.addCells(p, P);
      } finally {
        g.model.endUpdate();
      }
    }

    function J(I, Q, P) {
      I = g.getOutgoingTreeEdges(I);
      P = g.view.getState(P);
      var O = [];
      if (null != P && null != I) {
        for (var W = 0; W < I.length; W++) {
          var p = g.view.getState(g.model.getTerminal(I[W], !1));
          null != p && (!Q && Math.min(p.x + p.width, P.x + P.width) >= Math.max(p.x, P.x) || Q && Math.min(p.y + p.height, P.y + P.height) >= Math.max(p.y, P.y)) && O.push(p);
        }
        O.sort(function(B, N) {
          return Q ? B.x + B.width - N.x - N.width : B.y + B.height - N.y - N.height;
        });
      }
      return O;
    }

    function G(I, Q) {
      var P = y(I),
        O = Q == mxConstants.DIRECTION_EAST || Q == mxConstants.DIRECTION_WEST;
      (P == mxConstants.DIRECTION_EAST || P == mxConstants.DIRECTION_WEST) == O && P != Q ? d.actions.get('selectParent').funct() : P == Q ? (Q = g.getOutgoingTreeEdges(I), null != Q && 0 < Q.length && g.setSelectionCell(g.model.getTerminal(Q[0], !1))) : (P = g.getIncomingTreeEdges(I), null != P && 0 < P.length && (O = J(g.model.getTerminal(P[0], !0), O, I), I = g.view.getState(I), null != I && (I = mxUtils.indexOf(O, I), 0 <= I && (I += Q == mxConstants.DIRECTION_NORTH || Q == mxConstants.DIRECTION_WEST ? -1 : 1, 0 <= I && I <= O.length - 1 && g.setSelectionCell(O[I].cell)))));
    }
    var d = this,
      g = d.editor.graph,
      n = g.getModel(),
      v = d.menus.createPopupMenu;
    d.menus.createPopupMenu = function(I, Q, P) {
      v.apply(this, arguments);
      if (1 == g.getSelectionCount()) {
        Q = g.getSelectionCell();
        var O = g.getOutgoingTreeEdges(Q);
        I.addSeparator();
        0 < O.length && (c(g.getSelectionCell()) && this.addMenuItems(I, ['selectChildren'], null, P), this.addMenuItems(I, ['selectDescendants'], null, P));
        c(g.getSelectionCell()) ? (I.addSeparator(), 0 < g.getIncomingTreeEdges(Q).length && this.addMenuItems(I, [
          'selectSiblings',
          'selectParent'
        ], null, P)) : 0 < g.model.getEdgeCount(Q) && this.addMenuItems(I, ['selectConnections'], null, P);
      }
    };
    d.actions.addAction('selectChildren', function() {
      if (g.isEnabled() && 1 == g.getSelectionCount()) {
        var I = g.getSelectionCell();
        I = g.getOutgoingTreeEdges(I);
        if (null != I) {
          for (var Q = [], P = 0; P < I.length; P++)
            Q.push(g.model.getTerminal(I[P], !1));
          g.setSelectionCells(Q);
        }
      }
    }, null, null, 'Alt+Shift+X');
    d.actions.addAction('selectSiblings', function() {
      if (g.isEnabled() && 1 == g.getSelectionCount()) {
        var I = g.getSelectionCell();
        I = g.getIncomingTreeEdges(I);
        if (null != I && 0 < I.length && (I = g.getOutgoingTreeEdges(g.model.getTerminal(I[0], !0)), null != I)) {
          for (var Q = [], P = 0; P < I.length; P++)
            Q.push(g.model.getTerminal(I[P], !1));
          g.setSelectionCells(Q);
        }
      }
    }, null, null, 'Alt+Shift+S');
    d.actions.addAction('selectParent', function() {
      if (g.isEnabled() && 1 == g.getSelectionCount()) {
        var I = g.getSelectionCell();
        I = g.getIncomingTreeEdges(I);
        null != I && 0 < I.length && g.setSelectionCell(g.model.getTerminal(I[0], !0));
      }
    }, null, null, 'Alt+Shift+P');
    d.actions.addAction('selectDescendants', function(I, Q) {
      I = g.getSelectionCell();
      if (g.isEnabled() && g.model.isVertex(I)) {
        if (null != Q && mxEvent.isAltDown(Q))
          g.setSelectionCells(g.getTreeEdges(I, null == Q || !mxEvent.isShiftDown(Q), null == Q || !mxEvent.isControlDown(Q)));
        else {
          var P = [];
          g.traverse(I, !0, function(O, W) {
            var p = null != W && g.isTreeEdge(W);
            p && !mxEvent.isControlDown(Q) && P.push(W);
            null != W && !p || null != Q && mxEvent.isShiftDown(Q) || P.push(O);
            return null == W || p;
          });
        }
        g.setSelectionCells(P);
      }
    }, null, null, 'Alt+Shift+D');
    var u = g.removeCells;
    g.removeCells = function(I, Q) {
      Q = null != Q ? Q : !0;
      null == I && (I = this.getDeletableCells(this.getSelectionCells()));
      Q && (I = this.getDeletableCells(this.addAllEdges(I)));
      for (var P = [], O = 0; O < I.length; O++) {
        var W = I[O];
        n.isEdge(W) && m(W) && (P.push(W), W = n.getTerminal(W, !1));
        if (c(W)) {
          var p = [];
          g.traverse(W, !0, function(B, N) {
            var S = null != N && g.isTreeEdge(N);
            S && p.push(N);
            (null == N || S) && p.push(B);
            return null == N || S;
          });
          0 < p.length && (P = P.concat(p), W = g.getIncomingTreeEdges(I[O]), I = I.concat(W));
        } else
          null != W && P.push(I[O]);
      }
      I = P;
      return u.apply(this, arguments);
    };
    d.hoverIcons.getStateAt = function(I, Q, P) {
      return c(I.cell) ? null : this.graph.view.getState(this.graph.getCellAt(Q, P));
    };
    var x = g.duplicateCells;
    g.duplicateCells = function(I, Q) {
      I = null != I ? I : this.getSelectionCells();
      for (var P = I.slice(0), O = 0; O < P.length; O++) {
        var W = g.view.getState(P[O]);
        if (null != W && c(W.cell)) {
          var p = g.getIncomingTreeEdges(W.cell);
          for (W = 0; W < p.length; W++)
            mxUtils.remove(p[W], I);
        }
      }
      this.model.beginUpdate();
      try {
        var B = x.call(this, I, Q);
        if (B.length == I.length)
          for (O = 0; O < I.length; O++)
            if (c(I[O])) {
              var N = g.getIncomingTreeEdges(B[O]);
              p = g.getIncomingTreeEdges(I[O]);
              if (0 == N.length && 0 < p.length) {
                var S = this.cloneCell(p[0]);
                this.addEdge(S, g.getDefaultParent(), this.model.getTerminal(p[0], !0), B[O]);
              }
            }
      } finally {
        this.model.endUpdate();
      }
      return B;
    };
    var C = g.moveCells;
    g.moveCells = function(I, Q, P, O, W, p, B) {
      var N = null;
      this.model.beginUpdate();
      try {
        var S = W,
          R = this.getCurrentCellStyle(W);
        if (null != I && c(W) && '1' == mxUtils.getValue(R, 'treeFolding', '0')) {
          for (var V = 0; V < I.length; V++)
            if (c(I[V]) || g.model.isEdge(I[V]) && null == g.model.getTerminal(I[V], !0)) {
              W = g.model.getParent(I[V]);
              break;
            }
          if (null != S && W != S && null != this.view.getState(I[0])) {
            var T = g.getIncomingTreeEdges(I[0]);
            if (0 < T.length) {
              var U = g.view.getState(g.model.getTerminal(T[0], !0));
              if (null != U) {
                var X = g.view.getState(S);
                null != X && (Q = (X.getCenterX() - U.getCenterX()) / g.view.scale, P = (X.getCenterY() - U.getCenterY()) / g.view.scale);
              }
            }
          }
        }
        N = C.apply(this, arguments);
        if (null != N && null != I && N.length == I.length)
          for (V = 0; V < N.length; V++)
            if (this.model.isEdge(N[V]))
              c(S) && 0 > mxUtils.indexOf(N, this.model.getTerminal(N[V], !0)) && this.model.setTerminal(N[V], S, !0);
            else if (c(I[V]) && (T = g.getIncomingTreeEdges(I[V]), 0 < T.length))
          if (!O)
            c(S) && 0 > mxUtils.indexOf(I, this.model.getTerminal(T[0], !0)) && this.model.setTerminal(T[0], S, !0);
          else if (0 == g.getIncomingTreeEdges(N[V]).length) {
          R = S;
          if (null == R || R == g.model.getParent(I[V]))
            R = g.model.getTerminal(T[0], !0);
          O = this.cloneCell(T[0]);
          this.addEdge(O, g.getDefaultParent(), R, N[V]);
        }
      } finally {
        this.model.endUpdate();
      }
      return N;
    };
    if (null != d.sidebar) {
      var F = d.sidebar.dropAndConnect;
      d.sidebar.dropAndConnect = function(I, Q, P, O) {
        var W = g.model,
          p = null;
        W.beginUpdate();
        try {
          if (p = F.apply(this, arguments), c(I))
            for (var B = 0; B < p.length; B++)
              if (W.isEdge(p[B]) && null == W.getTerminal(p[B], !0)) {
                W.setTerminal(p[B], I, !0);
                var N = g.getCellGeometry(p[B]);
                N.points = null;
                null != N.getTerminalPoint(!0) && N.setTerminalPoint(null, !0);
              }
        } finally {
          W.endUpdate();
        }
        return p;
      };
    }
    var L = {
        88: d.actions.get('selectChildren'),
        84: d.actions.get('selectSubtree'),
        80: d.actions.get('selectParent'),
        83: d.actions.get('selectSiblings')
      },
      l = d.onKeyDown;
    d.onKeyDown = function(I) {
      try {
        if (g.isEnabled() && !g.isEditing() && c(g.getSelectionCell()) && 1 == g.getSelectionCount()) {
          var Q = null;
          0 < g.getIncomingTreeEdges(g.getSelectionCell()).length && (9 == I.which ? Q = mxEvent.isShiftDown(I) ? z(g.getSelectionCell()) : D(g.getSelectionCell()) : 13 == I.which && (Q = E(g.getSelectionCell(), !mxEvent.isShiftDown(I))));
          if (null != Q && 0 < Q.length)
            1 == Q.length && g.model.isEdge(Q[0]) ? g.setSelectionCell(g.model.getTerminal(Q[0], !1)) : g.setSelectionCell(Q[Q.length - 1]), null != d.hoverIcons && d.hoverIcons.update(g.view.getState(g.getSelectionCell())), g.startEditingAtCell(g.getSelectionCell()), mxEvent.consume(I);
          else if (mxEvent.isAltDown(I) && mxEvent.isShiftDown(I)) {
            var P = L[I.keyCode];
            null != P && (P.funct(I), mxEvent.consume(I));
          } else
            37 == I.keyCode ? (G(g.getSelectionCell(), mxConstants.DIRECTION_WEST), mxEvent.consume(I)) : 38 == I.keyCode ? (G(g.getSelectionCell(), mxConstants.DIRECTION_NORTH), mxEvent.consume(I)) : 39 == I.keyCode ? (G(g.getSelectionCell(), mxConstants.DIRECTION_EAST), mxEvent.consume(I)) : 40 == I.keyCode && (G(g.getSelectionCell(), mxConstants.DIRECTION_SOUTH), mxEvent.consume(I));
        }
      } catch (O) {
        d.handleError(O);
      }
      mxEvent.isConsumed(I) || l.apply(this, arguments);
    };
    var q = g.connectVertex;
    g.connectVertex = function(I, Q, P, O, W, p, B) {
      var N = g.getIncomingTreeEdges(I);
      if (c(I)) {
        var S = y(I),
          R = S == mxConstants.DIRECTION_EAST || S == mxConstants.DIRECTION_WEST,
          V = Q == mxConstants.DIRECTION_EAST || Q == mxConstants.DIRECTION_WEST;
        return S == Q || 0 == N.length ? D(I, Q) : R == V ? z(I) : E(I, Q != mxConstants.DIRECTION_NORTH && Q != mxConstants.DIRECTION_WEST);
      }
      return q.apply(this, arguments);
    };
    g.getSubtree = function(I) {
      var Q = [I];
      !k(I) && !c(I) || t(I) || g.traverse(I, !0, function(P, O) {
        var W = null != O && g.isTreeEdge(O);
        W && 0 > mxUtils.indexOf(Q, O) && Q.push(O);
        (null == O || W) && 0 > mxUtils.indexOf(Q, P) && Q.push(P);
        return null == O || W;
      });
      return Q;
    };
    var A = mxVertexHandler.prototype.init;
    mxVertexHandler.prototype.init = function() {
      A.apply(this, arguments);
      (k(this.state.cell) || c(this.state.cell)) && !t(this.state.cell) && 0 < this.graph.getOutgoingTreeEdges(this.state.cell).length && (this.moveHandle = mxUtils.createImage(Editor.moveImage), this.moveHandle.setAttribute('title', 'Move Subtree'), this.moveHandle.style.position = 'absolute', this.moveHandle.style.cursor = 'pointer', this.moveHandle.style.width = '24px', this.moveHandle.style.height = '24px', this.graph.container.appendChild(this.moveHandle), mxEvent.addGestureListeners(this.moveHandle, mxUtils.bind(this, function(I) {
        this.graph.graphHandler.start(this.state.cell, mxEvent.getClientX(I), mxEvent.getClientY(I), this.graph.getSubtree(this.state.cell));
        this.graph.graphHandler.cellWasClicked = !0;
        this.graph.isMouseTrigger = mxEvent.isMouseEvent(I);
        this.graph.isMouseDown = !0;
        d.hoverIcons.reset();
        mxEvent.consume(I);
      })));
    };
    var H = mxVertexHandler.prototype.redrawHandles;
    mxVertexHandler.prototype.redrawHandles = function() {
      H.apply(this, arguments);
      null != this.moveHandle && (this.moveHandle.style.left = this.state.x + this.state.width + (40 > this.state.width ? 10 : 0) + 2 + 'px', this.moveHandle.style.top = this.state.y + this.state.height + (40 > this.state.height ? 10 : 0) + 2 + 'px');
    };
    var K = mxVertexHandler.prototype.setHandlesVisible;
    mxVertexHandler.prototype.setHandlesVisible = function(I) {
      K.apply(this, arguments);
      null != this.moveHandle && (this.moveHandle.style.display = I ? '' : 'none');
    };
    var M = mxVertexHandler.prototype.destroy;
    mxVertexHandler.prototype.destroy = function(I, Q) {
      M.apply(this, arguments);
      null != this.moveHandle && (this.moveHandle.parentNode.removeChild(this.moveHandle), this.moveHandle = null);
    };
  };
  if ('undefined' !== typeof Sidebar) {
    var f = Sidebar.prototype.createAdvancedShapes;
    Sidebar.prototype.createAdvancedShapes = function() {
      var c = f.apply(this, arguments),
        k = this.graph;
      return c.concat([
        this.addEntry('tree container', function() {
          var m = new mxCell('Tree Container', new mxGeometry(0, 0, 400, 320), 'swimlane;startSize=20;horizontal=1;containerType=tree;');
          m.vertex = !0;
          var t = new mxCell('Parent', new mxGeometry(140, 60, 120, 40), 'whiteSpace=wrap;html=1;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"elbowEdgeStyle","startArrow":"none","endArrow":"none"};');
          t.vertex = !0;
          var y = new mxCell('Child', new mxGeometry(140, 140, 120, 40), 'whiteSpace=wrap;html=1;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"elbowEdgeStyle","startArrow":"none","endArrow":"none"};');
          y.vertex = !0;
          var E = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;elbow=vertical;startArrow=none;endArrow=none;rounded=0;');
          E.geometry.relative = !0;
          E.edge = !0;
          t.insertEdge(E, !0);
          y.insertEdge(E, !1);
          m.insert(E);
          m.insert(t);
          m.insert(y);
          return sb.createVertexTemplateFromCells([m], m.geometry.width, m.geometry.height, m.value);
        }),
        this.addEntry('tree mindmap mindmaps central idea branch topic', function() {
          var m = new mxCell('Mindmap', new mxGeometry(0, 0, 420, 126), 'swimlane;startSize=20;horizontal=1;containerType=tree;');
          m.vertex = !0;
          var t = new mxCell('Central Idea', new mxGeometry(160, 60, 100, 40), 'ellipse;whiteSpace=wrap;html=1;align=center;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"entityRelationEdgeStyle","startArrow":"none","endArrow":"none","segment":10,"curved":1,"sourcePerimeterSpacing":0,"targetPerimeterSpacing":0};');
          t.vertex = !0;
          var y = new mxCell('Topic', new mxGeometry(320, 40, 80, 20), 'whiteSpace=wrap;html=1;rounded=1;arcSize=50;align=center;verticalAlign=middle;strokeWidth=1;autosize=1;spacing=4;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"entityRelationEdgeStyle","startArrow":"none","endArrow":"none","segment":10,"curved":1,"sourcePerimeterSpacing":0,"targetPerimeterSpacing":0};');
          y.vertex = !0;
          var E = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;startArrow=none;endArrow=none;segment=10;curved=1;');
          E.geometry.relative = !0;
          E.edge = !0;
          t.insertEdge(E, !0);
          y.insertEdge(E, !1);
          var z = new mxCell('Branch', new mxGeometry(320, 80, 72, 26), 'whiteSpace=wrap;html=1;shape=partialRectangle;top=0;left=0;bottom=1;right=0;points=[[0,1],[1,1]];fillColor=none;align=center;verticalAlign=bottom;routingCenterY=0.5;snapToPoint=1;autosize=1;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"entityRelationEdgeStyle","startArrow":"none","endArrow":"none","segment":10,"curved":1,"sourcePerimeterSpacing":0,"targetPerimeterSpacing":0};');
          z.vertex = !0;
          var D = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;startArrow=none;endArrow=none;segment=10;curved=1;');
          D.geometry.relative = !0;
          D.edge = !0;
          t.insertEdge(D, !0);
          z.insertEdge(D, !1);
          var J = new mxCell('Topic', new mxGeometry(20, 40, 80, 20), 'whiteSpace=wrap;html=1;rounded=1;arcSize=50;align=center;verticalAlign=middle;strokeWidth=1;autosize=1;spacing=4;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"entityRelationEdgeStyle","startArrow":"none","endArrow":"none","segment":10,"curved":1,"sourcePerimeterSpacing":0,"targetPerimeterSpacing":0};');
          J.vertex = !0;
          var G = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;startArrow=none;endArrow=none;segment=10;curved=1;');
          G.geometry.relative = !0;
          G.edge = !0;
          t.insertEdge(G, !0);
          J.insertEdge(G, !1);
          var d = new mxCell('Branch', new mxGeometry(20, 80, 72, 26), 'whiteSpace=wrap;html=1;shape=partialRectangle;top=0;left=0;bottom=1;right=0;points=[[0,1],[1,1]];fillColor=none;align=center;verticalAlign=bottom;routingCenterY=0.5;snapToPoint=1;autosize=1;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"entityRelationEdgeStyle","startArrow":"none","endArrow":"none","segment":10,"curved":1,"sourcePerimeterSpacing":0,"targetPerimeterSpacing":0};');
          d.vertex = !0;
          var g = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;startArrow=none;endArrow=none;segment=10;curved=1;');
          g.geometry.relative = !0;
          g.edge = !0;
          t.insertEdge(g, !0);
          d.insertEdge(g, !1);
          m.insert(E);
          m.insert(D);
          m.insert(G);
          m.insert(g);
          m.insert(t);
          m.insert(y);
          m.insert(z);
          m.insert(J);
          m.insert(d);
          return sb.createVertexTemplateFromCells([m], m.geometry.width, m.geometry.height, m.value);
        }),
        this.addEntry('tree mindmap mindmaps central idea', function() {
          var m = new mxCell('Central Idea', new mxGeometry(0, 0, 100, 40), 'ellipse;whiteSpace=wrap;html=1;align=center;newEdgeStyle={"edgeStyle":"entityRelationEdgeStyle","startArrow":"none","endArrow":"none","segment":10,"curved":1,"sourcePerimeterSpacing":0,"targetPerimeterSpacing":0};treeFolding=1;treeMoving=1;');
          m.vertex = !0;
          return sb.createVertexTemplateFromCells([m], m.geometry.width, m.geometry.height, m.value);
        }),
        this.addEntry('tree mindmap mindmaps branch', function() {
          var m = new mxCell('Branch', new mxGeometry(0, 0, 80, 20), 'whiteSpace=wrap;html=1;shape=partialRectangle;top=0;left=0;bottom=1;right=0;points=[[0,1],[1,1]];fillColor=none;align=center;verticalAlign=bottom;routingCenterY=0.5;snapToPoint=1;recursiveResize=0;autosize=1;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"entityRelationEdgeStyle","startArrow":"none","endArrow":"none","segment":10,"curved":1,"sourcePerimeterSpacing":0,"targetPerimeterSpacing":0};');
          m.vertex = !0;
          var t = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;startArrow=none;endArrow=none;segment=10;curved=1;');
          t.geometry.setTerminalPoint(new mxPoint(-40, 40), !0);
          t.geometry.relative = !0;
          t.edge = !0;
          m.insertEdge(t, !1);
          return sb.createVertexTemplateFromCells([
            m,
            t
          ], m.geometry.width, m.geometry.height, m.value);
        }),
        this.addEntry('tree mindmap mindmaps sub topic', function() {
          var m = new mxCell('Sub Topic', new mxGeometry(0, 0, 80, 26), 'whiteSpace=wrap;html=1;rounded=1;arcSize=50;align=center;verticalAlign=middle;strokeWidth=1;autosize=1;spacing=4;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"entityRelationEdgeStyle","startArrow":"none","endArrow":"none","segment":10,"curved":1,"sourcePerimeterSpacing":0,"targetPerimeterSpacing":0};');
          m.vertex = !0;
          var t = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;startArrow=none;endArrow=none;segment=10;curved=1;sourcePerimeterSpacing=0;targetPerimeterSpacing=0;');
          t.geometry.setTerminalPoint(new mxPoint(-40, 40), !0);
          t.geometry.relative = !0;
          t.edge = !0;
          m.insertEdge(t, !1);
          return sb.createVertexTemplateFromCells([
            m,
            t
          ], m.geometry.width, m.geometry.height, m.value);
        }),
        this.addEntry('tree orgchart organization division', function() {
          var m = new mxCell('Orgchart', new mxGeometry(0, 0, 280, 220), 'swimlane;startSize=20;horizontal=1;containerType=tree;newEdgeStyle={"edgeStyle":"elbowEdgeStyle","startArrow":"none","endArrow":"none"};');
          m.vertex = !0;
          var t = new mxCell('Organization', new mxGeometry(80, 40, 120, 60), 'whiteSpace=wrap;html=1;align=center;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"elbowEdgeStyle","startArrow":"none","endArrow":"none"};');
          k.setAttributeForCell(t, 'treeRoot', '1');
          t.vertex = !0;
          var y = new mxCell('Division', new mxGeometry(20, 140, 100, 60), 'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"elbowEdgeStyle","startArrow":"none","endArrow":"none"};');
          y.vertex = !0;
          var E = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;elbow=vertical;startArrow=none;endArrow=none;rounded=0;');
          E.geometry.relative = !0;
          E.edge = !0;
          t.insertEdge(E, !0);
          y.insertEdge(E, !1);
          var z = new mxCell('Division', new mxGeometry(160, 140, 100, 60), 'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"elbowEdgeStyle","startArrow":"none","endArrow":"none"};');
          z.vertex = !0;
          var D = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;elbow=vertical;startArrow=none;endArrow=none;rounded=0;');
          D.geometry.relative = !0;
          D.edge = !0;
          t.insertEdge(D, !0);
          z.insertEdge(D, !1);
          m.insert(E);
          m.insert(D);
          m.insert(t);
          m.insert(y);
          m.insert(z);
          return sb.createVertexTemplateFromCells([m], m.geometry.width, m.geometry.height, m.value);
        }),
        this.addEntry('tree root', function() {
          var m = new mxCell('Organization', new mxGeometry(0, 0, 120, 60), 'whiteSpace=wrap;html=1;align=center;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"elbowEdgeStyle","startArrow":"none","endArrow":"none"};');
          k.setAttributeForCell(m, 'treeRoot', '1');
          m.vertex = !0;
          return sb.createVertexTemplateFromCells([m], m.geometry.width, m.geometry.height, m.value);
        }),
        this.addEntry('tree division', function() {
          var m = new mxCell('Division', new mxGeometry(20, 40, 100, 60), 'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;newEdgeStyle={"edgeStyle":"elbowEdgeStyle","startArrow":"none","endArrow":"none"};');
          m.vertex = !0;
          var t = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;elbow=vertical;sourcePerimeterSpacing=0;targetPerimeterSpacing=0;startArrow=none;endArrow=none;rounded=0;curved=0;');
          t.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
          t.geometry.relative = !0;
          t.edge = !0;
          m.insertEdge(t, !1);
          return sb.createVertexTemplateFromCells([
            m,
            t
          ], m.geometry.width, m.geometry.height, m.value);
        }),
        this.addEntry('tree sub sections', function() {
          var m = new mxCell('Sub Section', new mxGeometry(0, 0, 100, 60), 'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;');
          m.vertex = !0;
          var t = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;sourcePerimeterSpacing=0;targetPerimeterSpacing=0;startArrow=none;endArrow=none;rounded=0;targetPortConstraint=eastwest;sourcePortConstraint=northsouth;curved=0;rounded=0;');
          t.geometry.setTerminalPoint(new mxPoint(110, -40), !0);
          t.geometry.relative = !0;
          t.edge = !0;
          m.insertEdge(t, !1);
          var y = new mxCell('Sub Section', new mxGeometry(120, 0, 100, 60), 'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;');
          y.vertex = !0;
          var E = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;sourcePerimeterSpacing=0;targetPerimeterSpacing=0;startArrow=none;endArrow=none;rounded=0;targetPortConstraint=eastwest;sourcePortConstraint=northsouth;curved=0;rounded=0;');
          E.geometry.setTerminalPoint(new mxPoint(110, -40), !0);
          E.geometry.relative = !0;
          E.edge = !0;
          y.insertEdge(E, !1);
          return sb.createVertexTemplateFromCells([
            t,
            E,
            m,
            y
          ], 220, 60, 'Sub Sections');
        })
      ]);
    };
  }
}());
EditorUi.windowed = '0' != urlParams.windows;
EditorUi.initMinimalTheme = function() {
  function b(G, d) {
    if (EditorUi.windowed) {
      var g = G.editor.graph;
      g.popupMenuHandler.hideMenu();
      null == G.formatWindow ? (d = Math.max(10, G.diagramContainer.clientWidth - 248), g = Math.min(566, g.container.clientHeight - 10), G.formatWindow = new WrapperWindow(G, mxResources.get('format'), d, 60, 240, g, function(n) {
        G.createFormat(n).init();
      }), G.formatWindow.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function() {
        G.formatWindow.window.fit();
      })), G.formatWindow.window.minimumSize = new mxRectangle(0, 0, 240, 80)) : G.formatWindow.window.setVisible(null != d ? d : !G.formatWindow.window.isVisible());
    } else
      null == G.formatElt && (G.formatElt = G.createSidebarContainer(), G.createFormat(G.formatElt).init(), G.formatElt.style.border = 'none', G.formatElt.style.width = '240px', G.formatElt.style.borderLeft = '1px solid gray', G.formatElt.style.right = '0px'), g = G.diagramContainer.parentNode, null != G.formatElt.parentNode ? (G.formatElt.parentNode.removeChild(G.formatElt), g.style.right = '0px') : (g.parentNode.appendChild(G.formatElt), g.style.right = G.formatElt.style.width);
  }

  function e(G, d) {
    function g(u, x) {
      var C = G.menus.get(u);
      u = n.addMenu(x, mxUtils.bind(this, function() {
        C.funct.apply(this, arguments);
      }));
      u.style.cssText = 'position:absolute;border-width:1px;cusor:pointer;border-style:none;height:24px;bottom:0px;text-align:center;padding:8px 6px 0 6px;border-top-style:solid;width:50%;height:32px;box-sizing:border-box;font-size:11px;';
      u.className = 'geTitle';
      d.appendChild(u);
      return u;
    }
    var n = new Menubar(G, d);
    if (Editor.enableCustomLibraries && ('1' != urlParams.embed || '1' == urlParams.libraries))
      if (null != G.actions.get('newLibrary')) {
        var v = document.createElement('div');
        v.style.cssText = 'position:absolute;border-width:1px;cusor:pointer;border-style:none;height:24px;bottom:0px;text-align:center;padding:8px 6px 0 6px;border-top-style:solid;width:50%;height:32px;box-sizing:border-box;font-size:11px;';
        v.className = 'geTitle';
        mxUtils.write(v, mxResources.get('newLibrary'));
        d.appendChild(v);
        mxEvent.addListener(v, 'click', this.actions.get('newLibrary').funct);
        v = v.cloneNode(!1);
        v.style.left = '50%';
        v.style.borderLeftStyle = 'solid';
        mxUtils.write(v, mxResources.get('openLibrary'));
        d.appendChild(v);
        mxEvent.addListener(v, 'click', this.actions.get('openLibrary').funct);
      } else
        v = g('newLibrary', mxResources.get('newLibrary')), v.style.fontSize = '11px', v.style.left = '0', v = g('openLibraryFrom', mxResources.get('openLibraryFrom')), v.style.borderLeftStyle = 'solid', v.style.fontSize = '11px', v.style.left = '50%';
    d.appendChild(G.sidebar.container);
    d.style.overflow = 'hidden';
  }

  function f(G, d) {
    if (EditorUi.windowed) {
      var g = G.editor.graph;
      g.popupMenuHandler.hideMenu();
      null == G.sidebarWindow ? (d = Math.min(g.container.clientWidth - 10, 218), g = Math.min(g.container.clientHeight - 40, 650), G.sidebarWindow = new WrapperWindow(G, mxResources.get('shapes'), 10, 56, d - 6, g - 6, function(n) {
        e(G, n);
      }), G.sidebarWindow.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function() {
        G.sidebarWindow.window.fit();
      })), G.sidebarWindow.window.minimumSize = new mxRectangle(0, 0, 90, 90), G.sidebarWindow.window.setVisible(!0), isLocalStorage && G.getLocalData('sidebar', function(n) {
        G.sidebar.showEntries(n, null, !0);
      }), G.restoreLibraries()) : G.sidebarWindow.window.setVisible(null != d ? d : !G.sidebarWindow.window.isVisible());
    } else
      null == G.sidebarElt && (G.sidebarElt = G.createSidebarContainer(), e(G, G.sidebarElt), G.sidebarElt.style.border = 'none', G.sidebarElt.style.width = '210px', G.sidebarElt.style.borderRight = '1px solid gray'), g = G.diagramContainer.parentNode, null != G.sidebarElt.parentNode ? (G.sidebarElt.parentNode.removeChild(G.sidebarElt), g.style.left = '0px') : (g.parentNode.appendChild(G.sidebarElt), g.style.left = G.sidebarElt.style.width);
  }
  if ('1' == urlParams.lightbox || '0' == urlParams.chrome || 'undefined' === typeof window.Format || 'undefined' === typeof window.Menus)
    window.uiTheme = null;
  else {
    var c = 0;
    try {
      c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    } catch (G) {}
    Menus.prototype.autoPopup = !1;
    Editor.checkmarkImage = Graph.createSvgImage(22, 18, '<path transform="translate(4 0)" d="M7.181,15.007a1,1,0,0,1-.793-0.391L3.222,10.5A1,1,0,1,1,4.808,9.274L7.132,12.3l6.044-8.86A1,1,0,1,1,14.83,4.569l-6.823,10a1,1,0,0,1-.8.437H7.181Z" fill="#29b6f2"/>').src;
    mxConstraintHandler.prototype.pointImage = Graph.createSvgImage(5, 5, '<path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke-width="2" style="stroke-opacity:0.4" stroke="#ffffff"/><path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke="#29b6f2"/>');
    mxOutline.prototype.sizerImage = null;
    mxConstants.VERTEX_SELECTION_COLOR = '#C0C0C0';
    mxConstants.EDGE_SELECTION_COLOR = '#C0C0C0';
    mxConstants.CONNECT_HANDLE_FILLCOLOR = '#cee7ff';
    mxConstants.DEFAULT_VALID_COLOR = '#29b6f2';
    mxConstants.GUIDE_COLOR = '#C0C0C0';
    mxConstants.HIGHLIGHT_STROKEWIDTH = 5;
    mxConstants.HIGHLIGHT_OPACITY = 35;
    mxConstants.OUTLINE_COLOR = '#29b6f2';
    mxConstants.OUTLINE_HANDLE_FILLCOLOR = '#29b6f2';
    mxConstants.OUTLINE_HANDLE_STROKECOLOR = '#fff';
    Graph.prototype.svgShadowColor = '#3D4574';
    Graph.prototype.svgShadowOpacity = '0.4';
    Graph.prototype.svgShadowSize = '0.6';
    Graph.prototype.svgShadowBlur = '1.2';
    Format.inactiveTabBackgroundColor = '#e4e4e4';
    mxGraphHandler.prototype.previewColor = '#C0C0C0';
    mxRubberband.prototype.defaultOpacity = 50;
    HoverIcons.prototype.inactiveOpacity = 25;
    Format.prototype.showCloseButton = !1;
    EditorUi.prototype.closableScratchpad = !1;
    EditorUi.prototype.toolbarHeight = 46;
    EditorUi.prototype.footerHeight = 0;
    Graph.prototype.editAfterInsert = !mxClient.IS_IOS && !mxClient.IS_ANDROID;
    Editor.styleElt = document.createElement('style');
    Editor.styleElt.type = 'text/css';
    Editor.styleElt.innerHTML = Editor.createMinimalCss();
    document.getElementsByTagName('head')[0].appendChild(Editor.styleElt);
    Editor.prototype.isChromelessView = function() {
      return !1;
    };
    Graph.prototype.isLightboxView = function() {
      return !1;
    };
    var k = EditorUi.prototype.refresh;
    EditorUi.prototype.refresh = function(G) {
      k.apply(this, arguments);
      null != this.tabContainer && (this.tabContainer.style.right = '62px', this.diagramContainer.style.bottom = this.tabContainerHeight + 'px');
    };
    var m = EditorUi.prototype.updateActionStates;
    EditorUi.prototype.updateActionStates = function() {
      m.apply(this, arguments);
      this.menus.get('save').setEnabled(null != this.getCurrentFile() || '1' == urlParams.embed);
    };
    var t = Menus.prototype.addShortcut;
    Menus.prototype.addShortcut = function(G, d) {
      null != d.shortcut && 900 > c && !mxClient.IS_IOS ? G.firstChild.nextSibling.setAttribute('title', d.shortcut) : t.apply(this, arguments);
    };
    EditorUi.prototype.toggleFormatPanel = function(G) {
      null != this.formatWindow ? this.formatWindow.window.setVisible(null != G ? G : !this.formatWindow.window.isVisible()) : b(this);
    };
    EditorUi.prototype.isFormatPanelVisible = function() {
      return null != this.formatWindow && this.formatWindow.window.isVisible() || null == this.formatWindow && 0 < this.formatWidth;
    };
    DiagramFormatPanel.prototype.isMathOptionVisible = function() {
      return !0;
    };
    var y = EditorUi.prototype.destroy;
    EditorUi.prototype.destroy = function() {
      this.destroyWindows();
      y.apply(this, arguments);
    };
    var E = EditorUi.prototype.setGraphEnabled;
    EditorUi.prototype.setGraphEnabled = function(G) {
      E.apply(this, arguments);
      if (G) {
        var d = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        1000 <= d && null != this.sidebarWindow && this.sidebarWindow.window.setVisible(!0);
        null != this.formatWindow && 1000 <= d && this.formatWindow.window.setVisible(!0);
      } else
        null != this.sidebarWindow && this.sidebarWindow.window.setVisible(!1), null != this.formatWindow && this.formatWindow.window.setVisible(!1);
    };
    EditorUi.prototype.chromelessWindowResize = function() {};
    var z = Menus.prototype.init;
    Menus.prototype.init = function() {
      z.apply(this, arguments);
      var G = this.editorUi;
      EditorUi.enablePlantUml && !G.isOffline() && G.actions.put('plantUml', new Action(mxResources.get('plantUml') + '...', function() {
        var n = new ParseDialog(G, mxResources.get('plantUml') + '...', 'plantUml');
        G.showDialog(n.container, 620, 420, !0, !1);
        n.init();
      }));
      G.actions.put('mermaid', new Action(mxResources.get('mermaid') + '...', function() {
        var n = new ParseDialog(G, mxResources.get('mermaid') + '...', 'mermaid');
        G.showDialog(n.container, 620, 420, !0, !1);
        n.init();
      }));
      var d = 'horizontalFlow verticalFlow - horizontalTree verticalTree radialTree - organic circle'.split(' '),
        g = function(n, v, u, x) {
          n.addItem(u, null, mxUtils.bind(this, function() {
            var C = new CreateGraphDialog(G, u, x);
            G.showDialog(C.container, 620, 420, !0, !1);
            C.init();
          }), v);
        };
      this.put('insertLayout', new Menu(mxUtils.bind(this, function(n, v) {
        for (var u = 0; u < d.length; u++)
          '-' == d[u] ? n.addSeparator(v) : g(n, v, mxResources.get(d[u]) + '...', d[u]);
      })));
    };
    EditorUi.prototype.installFormatToolbar = function(G) {
      var d = this.editor.graph,
        g = document.createElement('div');
      g.style.cssText = 'position:absolute;top:10px;z-index:1;border-radius:4px;box-shadow:0px 0px 3px 1px #d1d1d1;padding:6px;white-space:nowrap;background-color:#fff;transform:translate(-50%, 0);left:50%;';
      d.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function(n, v) {
        0 < d.getSelectionCount() ? (G.appendChild(g), g.innerHTML = 'Selected: ' + d.getSelectionCount()) : null != g.parentNode && g.parentNode.removeChild(g);
      }));
    };
    var D = !1;
    EditorUi.prototype.initFormatWindow = function() {
      if (!D && null != this.formatWindow) {
        D = !0;
        var G = this.formatWindow.window.toggleMinimized,
          d = 240;
        this.formatWindow.window.toggleMinimized = function() {
          G.apply(this, arguments);
          this.minimized ? (d = parseInt(this.div.style.width), this.div.style.width = '140px', this.table.style.width = '140px', this.div.style.left = parseInt(this.div.style.left) + d - 140 + 'px') : (this.div.style.width = d + 'px', this.table.style.width = this.div.style.width, this.div.style.left = Math.max(0, parseInt(this.div.style.left) - d + 140) + 'px');
          this.fit();
        };
        mxEvent.addListener(this.formatWindow.window.title, 'dblclick', mxUtils.bind(this, function(g) {
          mxEvent.getSource(g) == this.formatWindow.window.title && this.formatWindow.window.toggleMinimized();
        }));
      }
    };
    var J = EditorUi.prototype.init;
    EditorUi.prototype.init = function() {
      function G(U, X, Z) {
        var Y = x.menus.get(U),
          ea = l.addMenu(mxResources.get(U), mxUtils.bind(this, function() {
            Y.funct.apply(this, arguments);
          }), L);
        ea.className = 'geMenuItem';
        ea.style.display = 'inline-block';
        ea.style.boxSizing = 'border-box';
        ea.style.top = '6px';
        ea.style.marginRight = '6px';
        ea.style.height = '30px';
        ea.style.paddingTop = '6px';
        ea.style.paddingBottom = '6px';
        ea.style.cursor = 'pointer';
        ea.setAttribute('title', mxResources.get(U));
        x.menus.menuCreated(Y, ea, 'geMenuItem');
        null != Z ? (ea.style.backgroundImage = 'url(' + Z + ')', ea.style.backgroundPosition = 'center center', ea.style.backgroundRepeat = 'no-repeat', ea.style.backgroundSize = '24px 24px', ea.style.width = '34px', ea.innerText = '') : X || (ea.style.backgroundImage = 'url(' + mxWindow.prototype.normalizeImage + ')', ea.style.backgroundPosition = 'right 6px center', ea.style.backgroundRepeat = 'no-repeat', ea.style.paddingRight = '22px');
        return ea;
      }

      function d(U, X, Z, Y, ea, aa) {
        var fa = document.createElement('a');
        fa.className = 'geMenuItem';
        fa.style.display = 'inline-block';
        fa.style.boxSizing = 'border-box';
        fa.style.height = '30px';
        fa.style.padding = '6px';
        fa.style.position = 'relative';
        fa.style.verticalAlign = 'top';
        fa.style.top = '0px';
        null != x.statusContainer ? F.insertBefore(fa, x.statusContainer) : F.appendChild(fa);
        null != aa ? (fa.style.backgroundImage = 'url(' + aa + ')', fa.style.backgroundPosition = 'center center', fa.style.backgroundRepeat = 'no-repeat', fa.style.backgroundSize = '24px 24px', fa.style.width = '34px') : mxUtils.write(fa, U);
        mxEvent.addListener(fa, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(da) {
          da.preventDefault();
        }));
        mxEvent.addListener(fa, 'click', function(da) {
          'disabled' != fa.getAttribute('disabled') && X(da);
          mxEvent.consume(da);
        });
        null == Z && (fa.style.marginRight = '4px');
        null != Y && fa.setAttribute('title', Y);
        null != ea && (U = function() {
          ea.isEnabled() ? (fa.removeAttribute('disabled'), fa.style.cursor = 'pointer') : (fa.setAttribute('disabled', 'disabled'), fa.style.cursor = 'default');
        }, ea.addListener('stateChanged', U), C.addListener('enabledChanged', U), U());
        return fa;
      }

      function g(U, X, Z) {
        Z = document.createElement('div');
        Z.className = 'geMenuItem';
        Z.style.display = 'inline-block';
        Z.style.verticalAlign = 'top';
        Z.style.marginRight = '6px';
        Z.style.padding = '0 4px 0 4px';
        Z.style.height = '30px';
        Z.style.position = 'relative';
        Z.style.top = '0px';
        for (var Y = 0; Y < U.length; Y++)
          null != U[Y] && (U[Y].style.margin = '0px', U[Y].style.boxShadow = 'none', Z.appendChild(U[Y]));
        null != X && mxUtils.setOpacity(Z, X);
        null != x.statusContainer ? F.insertBefore(Z, x.statusContainer) : F.appendChild(Z);
        return Z;
      }

      function n() {
        for (var U = F.firstChild; null != U;) {
          var X = U.nextSibling;
          'geMenuItem' != U.className && 'geItem' != U.className || U.parentNode.removeChild(U);
          U = X;
        }
        L = F.firstChild;
        c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        U = 1000 > c;
        var Z = null;
        U || (Z = G('diagram'));
        X = U ? G('diagram', null, Editor.menuImage) : null;
        null != X && (Z = X);
        g([
          Z,
          d(mxResources.get('shapes'), x.actions.get('toggleShapes').funct, null, mxResources.get('shapes'), x.actions.get('image'), U ? Editor.shapesImage : null),
          d(mxResources.get('format'), x.actions.get('format').funct, null, mxResources.get('format') + ' (' + x.actions.get('format').shortcut + ')', x.actions.get('image'), U ? Editor.formatImage : null)
        ], U ? 60 : null);
        X = G('insert', !0, U ? H : null);
        g([
          X,
          d(mxResources.get('delete'), x.actions.get('delete').funct, null, mxResources.get('delete'), x.actions.get('delete'), U ? Editor.trashImage : null)
        ], U ? 60 : null);
        411 <= c && (g([
          N,
          S
        ], 60), 520 <= c && g([
          R,
          640 <= c ? d('', P.funct, !0, mxResources.get('zoomIn') + ' (' + Editor.ctrlKey + ' +)', P, Editor.zoomInImage) : null,
          640 <= c ? d('', O.funct, !0, mxResources.get('zoomOut') + ' (' + Editor.ctrlKey + ' -)', O, Editor.zoomOutImage) : null
        ], 60));
      }
      J.apply(this, arguments);
      var v = Editor.enableCustomLibraries && ('1' != urlParams.embed || '1' == urlParams.libraries),
        u = document.createElement('div');
      u.style.cssText = 'position:absolute;left:0px;right:0px;top:0px;overflow-y:auto;overflow-x:hidden;';
      u.style.bottom = v ? '32px' : '0px';
      this.sidebar = this.createSidebar(u);
      if (1000 <= c || null != urlParams.clibs || null != urlParams.libs || null != urlParams['search-shapes'])
        f(this, !0), null != this.sidebar && null != urlParams['search-shapes'] && null != this.sidebar.searchShapes && (this.sidebar.searchShapes(urlParams['search-shapes']), this.sidebar.showEntries('search'));
      EditorUi.windowed && 1000 <= c && (b(this, !0), this.formatWindow.window.setVisible(!0));
      var x = this,
        C = x.editor.graph;
      x.toolbar = this.createToolbar(x.createDiv('geToolbar'));
      x.defaultLibraryName = mxResources.get('untitledLibrary');
      var F = document.createElement('div');
      F.className = 'geMenubarContainer';
      var L = null,
        l = new Menubar(x, F);
      x.statusContainer = x.createStatusContainer();
      x.statusContainer.style.position = 'relative';
      x.statusContainer.style.maxWidth = '';
      x.statusContainer.style.color = 'gray';
      x.statusContainer.style.cursor = 'default';
      var q = x.hideCurrentMenu;
      x.hideCurrentMenu = function() {
        q.apply(this, arguments);
        this.editor.graph.popupMenuHandler.hideMenu();
      };
      var A = x.descriptorChanged;
      x.descriptorChanged = function() {
        A.apply(this, arguments);
        var U = x.getCurrentFile();
        if (null != U && null != U.getTitle()) {
          var X = U.getMode();
          'google' == X ? X = 'googleDrive' : 'github' == X ? X = 'gitHub' : 'gitlab' == X ? X = 'gitLab' : 'onedrive' == X && (X = 'oneDrive');
          X = mxResources.get(X);
          F.setAttribute('title', U.getTitle() + (null != X ? ' (' + X + ')' : ''));
        } else
          F.removeAttribute('title');
      };
      x.setStatusText(x.editor.getStatus());
      F.appendChild(x.statusContainer);
      x.buttonContainer = document.createElement('div');
      x.buttonContainer.style.cssText = 'display:flex;justify-content:flex-end;padding-right:10px;gap:6px;white-space:nowrap;background-color:inherit;align-items:center;min-width:0;margin-left:auto;';
      F.appendChild(x.buttonContainer);
      x.menubarContainer = x.buttonContainer;
      x.tabContainer = document.createElement('div');
      x.tabContainer.className = 'geTabContainer geTabItem';
      x.tabContainer.style.cssText = 'position:absolute;left:0px;right:0px;bottom:0px;height:30px;white-space:nowrap;visibility:hidden;';
      v = x.diagramContainer.parentNode;
      u = document.createElement('div');
      u.style.cssText = 'position:absolute;top:0px;left:0px;right:0px;bottom:0px;overflow:hidden;';
      x.diagramContainer.style.top = '47px';
      var H = Editor.addBoxImage;
      if (null != x.hoverIcons) {
        var K = x.hoverIcons.update;
        x.hoverIcons.update = function() {
          C.freehand.isDrawing() || K.apply(this, arguments);
        };
      }
      if (null != C.freehand) {
        var M = C.freehand.createStyle;
        C.freehand.createStyle = function(U) {
          return M.apply(this, arguments) + 'sketch=0;';
        };
      }
      x.editor.addListener('statusChanged', mxUtils.bind(this, function() {
        x.setStatusText(x.editor.getStatus());
      }));
      x.setStatusText(x.editor.getStatus());
      var I = x.menus.get('viewZoom');
      if (null != I) {
        var Q = function(U) {
            if (mxEvent.isAltDown(U))
              x.hideCurrentMenu(), x.actions.get('customZoom').funct(), mxEvent.consume(U);
            else if ('geMenuItem' == mxEvent.getSource(U).className || mxEvent.isShiftDown(U))
              x.hideCurrentMenu(), x.actions.get('smartFit').funct(), mxEvent.consume(U);
          },
          P = x.actions.get('zoomIn'),
          O = x.actions.get('zoomOut'),
          W = x.actions.get('resetView'),
          p = x.actions.get('undo'),
          B = x.actions.get('redo'),
          N = d('', p.funct, null, mxResources.get('undo') + ' (' + p.shortcut + ')', p, Editor.undoImage),
          S = d('', B.funct, null, mxResources.get('redo') + ' (' + B.shortcut + ')', B, Editor.redoImage),
          R = d('', Q, !0, mxResources.get('fit') + ' (' + Editor.ctrlKey + '+H)', W, Editor.zoomFitImage);
        F.style.cssText = 'position:absolute;left:0px;right:0px;top:0px;height:30px;padding:8px;text-align:left;white-space:nowrap;';
        this.tabContainer.style.right = '70px';
        var V = l.addMenu('100%', I.funct);
        V.setAttribute('title', mxResources.get('zoom') + ' (Alt+Mousewheel)');
        V.className = 'geTabItem';
        V.style.height = x.tabContainerHeight + 'px';
        V.style.position = 'absolute';
        V.style.display = '0' != urlParams.pages ? 'flex' : 'none';
        V.style.alignItems = 'center';
        V.style.justifyContent = 'center';
        V.style.paddingRight = '11px';
        V.style.whiteSpace = 'nowrap';
        V.style.overflow = 'hidden';
        V.style.fontSize = '11px';
        V.style.width = '51px';
        V.style.right = '0px';
        V.style.bottom = '0px';
        V.style.boxSizing = 'content-box';
        V.style.backgroundImage = 'url(' + mxWindow.prototype.minimizeImage + ')';
        V.style.backgroundPosition = 'right 6px top 15px';
        V.style.backgroundRepeat = 'no-repeat';
        V.style.backgroundSize = '10px';
        V.style.zIndex = '1';
        u.appendChild(V);
        (function(U) {
          mxEvent.addListener(U, 'click', Q);
          var X = mxUtils.bind(this, function() {
            U.innerText = '';
            mxUtils.write(U, Math.round(100 * x.editor.graph.view.scale) + '%');
          });
          x.editor.graph.view.addListener(mxEvent.EVENT_SCALE, X);
          x.editor.addListener('resetGraphView', X);
          x.editor.addListener('pageSelected', X);
        }(V));
        var T = x.setGraphEnabled;
        x.setGraphEnabled = function() {
          T.apply(this, arguments);
          null != this.tabContainer && (V.style.visibility = this.tabContainer.style.visibility, this.diagramContainer.style.bottom = '0' != urlParams.pages && 'hidden' != this.tabContainer.style.visibility ? this.tabContainerHeight + 'px' : '0px');
        };
      }
      u.appendChild(F);
      u.appendChild(x.diagramContainer);
      v.appendChild(u);
      x.updateTabContainer();
      !EditorUi.windowed && 1000 <= c && b(this, !0);
      u.appendChild(x.tabContainer);
      n();
      mxEvent.addListener(window, 'resize', function() {
        n();
        null != x.sidebarWindow && x.sidebarWindow.window.fit();
        null != x.formatWindow && x.formatWindow.window.fit();
        null != x.actions.outlineWindow && x.actions.outlineWindow.window.fit();
        null != x.actions.layersWindow && x.actions.layersWindow.window.fit();
        null != x.menus.tagsWindow && x.menus.tagsWindow.window.fit();
        null != x.menus.findWindow && x.menus.findWindow.window.fit();
        null != x.menus.findReplaceWindow && x.menus.findReplaceWindow.window.fit();
      });
    };
  }
};
(function() {
  var b = !1;
  'min' != uiTheme || b || mxClient.IS_CHROMEAPP || (EditorUi.initMinimalTheme(), b = !0);
  var e = EditorUi.initTheme;
  EditorUi.initTheme = function() {
    e.apply(this, arguments);
    'min' != uiTheme || b || (this.initMinimalTheme(), b = !0);
  };
}());
(function() {
  var b = mxGuide.prototype.move;
  mxGuide.prototype.move = function(c, k, m, t) {
    var y = k.y,
      E = k.x,
      z = !1,
      D = !1;
    if (null != this.states && null != c && null != k) {
      var J = this,
        G = new mxCellState(),
        d = this.graph.getView().scale,
        g = Math.max(2, this.getGuideTolerance() / 2);
      G.x = c.x + E;
      G.y = c.y + y;
      G.width = c.width;
      G.height = c.height;
      for (var n = [], v = [], u = 0; u < this.states.length; u++) {
        var x = this.states[u];
        x instanceof mxCellState && (t || !this.graph.isCellSelected(x.cell)) && ((G.x >= x.x && G.x <= x.x + x.width || x.x >= G.x && x.x <= G.x + G.width) && (G.y > x.y + x.height + 4 || G.y + G.height + 4 < x.y) ? n.push(x) : (G.y >= x.y && G.y <= x.y + x.height || x.y >= G.y && x.y <= G.y + G.height) && (G.x > x.x + x.width + 4 || G.x + G.width + 4 < x.x) && v.push(x));
      }
      var C = 0,
        F = 0,
        L = x = 0,
        l = 0,
        q = 0,
        A = 0,
        H = 0,
        K = 5 * d;
      if (1 < n.length) {
        n.push(G);
        n.sort(function(P, O) {
          return P.y - O.y;
        });
        var M = !1;
        u = G == n[0];
        d = G == n[n.length - 1];
        if (!u && !d)
          for (u = 1; u < n.length - 1; u++)
            if (G == n[u]) {
              d = n[u - 1];
              u = n[u + 1];
              x = F = L = (u.y - d.y - d.height - G.height) / 2;
              break;
            }
        for (u = 0; u < n.length - 1; u++) {
          d = n[u];
          var I = n[u + 1],
            Q = G == d || G == I;
          I = I.y - d.y - d.height;
          M |= G == d;
          if (0 == F && 0 == C)
            F = I, C = 1;
          else if (Math.abs(F - I) <= (Q || 1 == u && M ? g : 0))
            C += 1;
          else if (1 < C && M) {
            n = n.slice(0, u + 1);
            break;
          } else if (3 <= n.length - u && !M)
            C = 0, x = F = 0 != L ? L : 0, n.splice(0, 0 == u ? 1 : u), u = -1;
          else
            break;
          0 != x || Q || (F = x = I);
        }
        3 == n.length && n[1] == G && (x = 0);
      }
      if (1 < v.length) {
        v.push(G);
        v.sort(function(P, O) {
          return P.x - O.x;
        });
        M = !1;
        u = G == v[0];
        d = G == v[v.length - 1];
        if (!u && !d)
          for (u = 1; u < v.length - 1; u++)
            if (G == v[u]) {
              d = v[u - 1];
              u = v[u + 1];
              A = q = H = (u.x - d.x - d.width - G.width) / 2;
              break;
            }
        for (u = 0; u < v.length - 1; u++) {
          d = v[u];
          I = v[u + 1];
          Q = G == d || G == I;
          I = I.x - d.x - d.width;
          M |= G == d;
          if (0 == q && 0 == l)
            q = I, l = 1;
          else if (Math.abs(q - I) <= (Q || 1 == u && M ? g : 0))
            l += 1;
          else if (1 < l && M) {
            v = v.slice(0, u + 1);
            break;
          } else if (3 <= v.length - u && !M)
            l = 0, A = q = 0 != H ? H : 0, v.splice(0, 0 == u ? 1 : u), u = -1;
          else
            break;
          0 != A || Q || (q = A = I);
        }
        3 == v.length && v[1] == G && (A = 0);
      }
      g = function(P, O, W, p) {
        var B = [];
        if (p) {
          p = K;
          var N = 0;
        } else
          p = 0, N = K;
        B.push(new mxPoint(P.x - p, P.y - N));
        B.push(new mxPoint(P.x + p, P.y + N));
        B.push(P);
        B.push(O);
        B.push(new mxPoint(O.x - p, O.y - N));
        B.push(new mxPoint(O.x + p, O.y + N));
        if (null != W)
          return W.points = B, W;
        P = new mxPolyline(B, mxConstants.GUIDE_COLOR, mxConstants.GUIDE_STROKEWIDTH);
        P.dialect = mxConstants.DIALECT_SVG;
        P.pointerEvents = !1;
        P.init(J.graph.getView().getOverlayPane());
        return P;
      };
      q = function(P, O) {
        if (P && null != J.guidesArrHor)
          for (P = 0; P < J.guidesArrHor.length; P++)
            J.guidesArrHor[P].node.style.visibility = 'hidden';
        if (O && null != J.guidesArrVer)
          for (P = 0; P < J.guidesArrVer.length; P++)
            J.guidesArrVer[P].node.style.visibility = 'hidden';
      };
      if (1 < l && l == v.length - 1) {
        l = [];
        H = J.guidesArrHor;
        z = [];
        E = 0;
        u = v[0] == G ? 1 : 0;
        M = v[u].y + v[u].height;
        if (0 < A)
          for (u = 0; u < v.length - 1; u++)
            d = v[u], I = v[u + 1], G == d ? (E = I.x - d.width - A, z.push(new mxPoint(E + d.width + K, M)), z.push(new mxPoint(I.x - K, M))) : G == I ? (z.push(new mxPoint(d.x + d.width + K, M)), E = d.x + d.width + A, z.push(new mxPoint(E - K, M))) : (z.push(new mxPoint(d.x + d.width + K, M)), z.push(new mxPoint(I.x - K, M)));
        else
          d = v[0], u = v[2], E = d.x + d.width + (u.x - d.x - d.width - G.width) / 2, z.push(new mxPoint(d.x + d.width + K, M)), z.push(new mxPoint(E - K, M)), z.push(new mxPoint(E + G.width + K, M)), z.push(new mxPoint(u.x - K, M));
        for (u = 0; u < z.length; u += 2)
          v = z[u], A = z[u + 1], v = g(v, A, null != H ? H[u / 2] : null), v.node.style.visibility = 'visible', v.redraw(), l.push(v);
        for (u = z.length / 2; null != H && u < H.length; u++)
          H[u].destroy();
        J.guidesArrHor = l;
        E -= c.x;
        z = !0;
      } else
        q(!0);
      if (1 < C && C == n.length - 1) {
        l = [];
        H = J.guidesArrVer;
        D = [];
        y = 0;
        u = n[0] == G ? 1 : 0;
        C = n[u].x + n[u].width;
        if (0 < x)
          for (u = 0; u < n.length - 1; u++)
            d = n[u], I = n[u + 1], G == d ? (y = I.y - d.height - x, D.push(new mxPoint(C, y + d.height + K)), D.push(new mxPoint(C, I.y - K))) : G == I ? (D.push(new mxPoint(C, d.y + d.height + K)), y = d.y + d.height + x, D.push(new mxPoint(C, y - K))) : (D.push(new mxPoint(C, d.y + d.height + K)), D.push(new mxPoint(C, I.y - K)));
        else
          d = n[0], u = n[2], y = d.y + d.height + (u.y - d.y - d.height - G.height) / 2, D.push(new mxPoint(C, d.y + d.height + K)), D.push(new mxPoint(C, y - K)), D.push(new mxPoint(C, y + G.height + K)), D.push(new mxPoint(C, u.y - K));
        for (u = 0; u < D.length; u += 2)
          v = D[u], A = D[u + 1], v = g(v, A, null != H ? H[u / 2] : null, !0), v.node.style.visibility = 'visible', v.redraw(), l.push(v);
        for (u = D.length / 2; null != H && u < H.length; u++)
          H[u].destroy();
        J.guidesArrVer = l;
        y -= c.y;
        D = !0;
      } else
        q(!1, !0);
    }
    if (z || D)
      return G = new mxPoint(E, y), n = b.call(this, c, G, m, t), z && !D ? G.y = n.y : D && !z && (G.x = n.x), n.y != G.y && null != this.guideY && null != this.guideY.node && (this.guideY.node.style.visibility = 'hidden'), n.x != G.x && null != this.guideX && null != this.guideX.node && (this.guideX.node.style.visibility = 'hidden'), G;
    q(!0, !0);
    return b.apply(this, arguments);
  };
  var e = mxGuide.prototype.setVisible;
  mxGuide.prototype.setVisible = function(c) {
    e.call(this, c);
    var k = this.guidesArrVer,
      m = this.guidesArrHor;
    if (null != k)
      for (var t = 0; t < k.length; t++)
        k[t].node.style.visibility = c ? 'visible' : 'hidden';
    if (null != m)
      for (t = 0; t < m.length; t++)
        m[t].node.style.visibility = c ? 'visible' : 'hidden';
  };
  var f = mxGuide.prototype.destroy;
  mxGuide.prototype.destroy = function() {
    f.call(this);
    var c = this.guidesArrVer,
      k = this.guidesArrHor;
    if (null != c) {
      for (var m = 0; m < c.length; m++)
        c[m].destroy();
      this.guidesArrVer = null;
    }
    if (null != k) {
      for (m = 0; m < k.length; m++)
        k[m].destroy();
      this.guidesArrHor = null;
    }
  };
}());