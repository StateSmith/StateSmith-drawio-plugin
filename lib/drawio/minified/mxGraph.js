function mxGraph(a, b, c, d, e) {
  this.mouseListeners = null;
  this.renderHint = c;
  this.dialect = mxClient.IS_SVG ? mxConstants.DIALECT_SVG : c == mxConstants.RENDERING_HINT_FASTEST ? mxConstants.DIALECT_STRICTHTML : c == mxConstants.RENDERING_HINT_FASTER ? mxConstants.DIALECT_PREFERHTML : mxConstants.DIALECT_MIXEDHTML;
  this.model = null != b ? b : new mxGraphModel();
  this.multiplicities = [];
  this.imageBundles = [];
  this.cellRenderer = this.createCellRenderer();
  this.setSelectionModel(this.createSelectionModel());
  this.setStylesheet(null != d ? d : this.createStylesheet());
  this.view = this.createGraphView();
  this.view.rendering = null != e ? e : this.view.rendering;
  this.graphModelChangeListener = mxUtils.bind(this, function(f, g) {
    this.graphModelChanged(g.getProperty('edit').changes);
  });
  this.model.addListener(mxEvent.CHANGE, this.graphModelChangeListener);
  this.createHandlers();
  null != a && this.init(a);
  this.view.rendering && this.view.revalidate();
}
mxLoadResources ? mxResources.add(mxClient.basePath + '/resources/graph') : mxClient.defaultBundles.push(mxClient.basePath + '/resources/graph');
mxGraph.prototype = new mxEventSource();
mxGraph.prototype.constructor = mxGraph;
mxGraph.prototype.mouseListeners = null;
mxGraph.prototype.isMouseDown = !1;
mxGraph.prototype.model = null;
mxGraph.prototype.view = null;
mxGraph.prototype.stylesheet = null;
mxGraph.prototype.selectionModel = null;
mxGraph.prototype.cellEditor = null;
mxGraph.prototype.cellRenderer = null;
mxGraph.prototype.multiplicities = null;
mxGraph.prototype.renderHint = null;
mxGraph.prototype.dialect = null;
mxGraph.prototype.gridSize = 10;
mxGraph.prototype.gridEnabled = !0;
mxGraph.prototype.portsEnabled = !0;
mxGraph.prototype.nativeDblClickEnabled = !0;
mxGraph.prototype.doubleTapEnabled = !0;
mxGraph.prototype.doubleTapTimeout = 500;
mxGraph.prototype.doubleTapTolerance = 25;
mxGraph.prototype.lastTouchY = 0;
mxGraph.prototype.lastTouchY = 0;
mxGraph.prototype.lastTouchTime = 0;
mxGraph.prototype.tapAndHoldEnabled = !0;
mxGraph.prototype.tapAndHoldDelay = 500;
mxGraph.prototype.tapAndHoldInProgress = !1;
mxGraph.prototype.tapAndHoldValid = !1;
mxGraph.prototype.initialTouchX = 0;
mxGraph.prototype.initialTouchY = 0;
mxGraph.prototype.tolerance = 4;
mxGraph.prototype.defaultOverlap = 0.5;
mxGraph.prototype.defaultParent = null;
mxGraph.prototype.alternateEdgeStyle = null;
mxGraph.prototype.backgroundImage = null;
mxGraph.prototype.pageVisible = !1;
mxGraph.prototype.pageBreaksVisible = !1;
mxGraph.prototype.pageBreakColor = 'gray';
mxGraph.prototype.pageBreakDashed = !0;
mxGraph.prototype.minPageBreakDist = 20;
mxGraph.prototype.preferPageSize = !1;
mxGraph.prototype.pageFormat = mxConstants.PAGE_FORMAT_A4_PORTRAIT;
mxGraph.prototype.pageScale = 1.5;
mxGraph.prototype.enabled = !0;
mxGraph.prototype.escapeEnabled = !0;
mxGraph.prototype.invokesStopCellEditing = !0;
mxGraph.prototype.enterStopsCellEditing = !1;
mxGraph.prototype.useScrollbarsForPanning = !0;
mxGraph.prototype.exportEnabled = !0;
mxGraph.prototype.importEnabled = !0;
mxGraph.prototype.cellsLocked = !1;
mxGraph.prototype.cellsCloneable = !0;
mxGraph.prototype.foldingEnabled = !0;
mxGraph.prototype.cellsEditable = !0;
mxGraph.prototype.cellsDeletable = !0;
mxGraph.prototype.cellsMovable = !0;
mxGraph.prototype.edgeLabelsMovable = !0;
mxGraph.prototype.vertexLabelsMovable = !1;
mxGraph.prototype.dropEnabled = !1;
mxGraph.prototype.splitEnabled = !0;
mxGraph.prototype.cellsResizable = !0;
mxGraph.prototype.cellsBendable = !0;
mxGraph.prototype.cellsSelectable = !0;
mxGraph.prototype.cellsDisconnectable = !0;
mxGraph.prototype.autoSizeCells = !1;
mxGraph.prototype.autoSizeCellsOnAdd = !1;
mxGraph.prototype.autoScroll = !0;
mxGraph.prototype.ignoreScrollbars = !1;
mxGraph.prototype.translateToScrollPosition = !1;
mxGraph.prototype.timerAutoScroll = !1;
mxGraph.prototype.allowAutoPanning = !1;
mxGraph.prototype.autoExtend = !0;
mxGraph.prototype.maximumGraphBounds = null;
mxGraph.prototype.minimumGraphSize = null;
mxGraph.prototype.minimumContainerSize = null;
mxGraph.prototype.maximumContainerSize = null;
mxGraph.prototype.resizeContainer = !1;
mxGraph.prototype.border = 0;
mxGraph.prototype.keepEdgesInForeground = !1;
mxGraph.prototype.keepEdgesInBackground = !1;
mxGraph.prototype.allowNegativeCoordinates = !0;
mxGraph.prototype.constrainChildren = !0;
mxGraph.prototype.constrainRelativeChildren = !1;
mxGraph.prototype.extendParents = !0;
mxGraph.prototype.extendParentsOnAdd = !0;
mxGraph.prototype.extendParentsOnMove = !1;
mxGraph.prototype.recursiveResize = !1;
mxGraph.prototype.collapseToPreferredSize = !0;
mxGraph.prototype.zoomFactor = 1.2;
mxGraph.prototype.keepSelectionVisibleOnZoom = !1;
mxGraph.prototype.centerZoom = !0;
mxGraph.prototype.resetViewOnRootChange = !0;
mxGraph.prototype.resetEdgesOnResize = !1;
mxGraph.prototype.resetEdgesOnMove = !1;
mxGraph.prototype.resetEdgesOnConnect = !0;
mxGraph.prototype.allowLoops = !1;
mxGraph.prototype.defaultLoopStyle = mxEdgeStyle.Loop;
mxGraph.prototype.multigraph = !0;
mxGraph.prototype.connectableEdges = !1;
mxGraph.prototype.allowDanglingEdges = !0;
mxGraph.prototype.cloneInvalidEdges = !1;
mxGraph.prototype.disconnectOnMove = !0;
mxGraph.prototype.labelsVisible = !0;
mxGraph.prototype.htmlLabels = !1;
mxGraph.prototype.swimlaneSelectionEnabled = !0;
mxGraph.prototype.swimlaneNesting = !0;
mxGraph.prototype.swimlaneIndicatorColorAttribute = mxConstants.STYLE_FILLCOLOR;
mxGraph.prototype.imageBundles = null;
mxGraph.prototype.minFitScale = 0.1;
mxGraph.prototype.maxFitScale = 8;
mxGraph.prototype.panDx = 0;
mxGraph.prototype.panDy = 0;
mxGraph.prototype.collapsedImage = new mxImage(mxClient.imageBasePath + '/collapsed.gif', 9, 9);
mxGraph.prototype.expandedImage = new mxImage(mxClient.imageBasePath + '/expanded.gif', 9, 9);
mxGraph.prototype.warningImage = new mxImage(mxClient.imageBasePath + '/warning' + (mxClient.IS_MAC ? '.png' : '.gif'), 16, 16);
mxGraph.prototype.alreadyConnectedResource = 'none' != mxClient.language ? 'alreadyConnected' : '';
mxGraph.prototype.containsValidationErrorsResource = 'none' != mxClient.language ? 'containsValidationErrors' : '';
mxGraph.prototype.collapseExpandResource = 'none' != mxClient.language ? 'collapse-expand' : '';
mxGraph.prototype.init = function(a) {
  this.container = a;
  this.cellEditor = this.createCellEditor();
  this.view.init();
  this.sizeDidChange();
  mxEvent.addListener(a, 'mouseleave', mxUtils.bind(this, function(b) {
    null != this.tooltipHandler && null != this.tooltipHandler.div && this.tooltipHandler.div != b.relatedTarget && this.tooltipHandler.hide();
  }));
  mxClient.IS_IE && (mxEvent.addListener(window, 'unload', mxUtils.bind(this, function() {
    this.destroy();
  })), mxEvent.addListener(a, 'selectstart', mxUtils.bind(this, function(b) {
    return this.isEditing() || !this.isMouseDown && !mxEvent.isShiftDown(b);
  })));
};
mxGraph.prototype.createHandlers = function() {
  this.tooltipHandler = this.createTooltipHandler();
  this.tooltipHandler.setEnabled(!1);
  this.selectionCellsHandler = this.createSelectionCellsHandler();
  this.connectionHandler = this.createConnectionHandler();
  this.connectionHandler.setEnabled(!1);
  this.graphHandler = this.createGraphHandler();
  this.panningHandler = this.createPanningHandler();
  this.panningHandler.panningEnabled = !1;
  this.popupMenuHandler = this.createPopupMenuHandler();
};
mxGraph.prototype.createTooltipHandler = function() {
  return new mxTooltipHandler(this);
};
mxGraph.prototype.createSelectionCellsHandler = function() {
  return new mxSelectionCellsHandler(this);
};
mxGraph.prototype.createConnectionHandler = function() {
  return new mxConnectionHandler(this);
};
mxGraph.prototype.createGraphHandler = function() {
  return new mxGraphHandler(this);
};
mxGraph.prototype.createPanningHandler = function() {
  return new mxPanningHandler(this);
};
mxGraph.prototype.createPopupMenuHandler = function() {
  return new mxPopupMenuHandler(this);
};
mxGraph.prototype.createSelectionModel = function() {
  return new mxGraphSelectionModel(this);
};
mxGraph.prototype.createStylesheet = function() {
  return new mxStylesheet();
};
mxGraph.prototype.createGraphView = function() {
  return new mxGraphView(this);
};
mxGraph.prototype.createCellRenderer = function() {
  return new mxCellRenderer();
};
mxGraph.prototype.createCellEditor = function() {
  return new mxCellEditor(this);
};
mxGraph.prototype.getModel = function() {
  return this.model;
};
mxGraph.prototype.getView = function() {
  return this.view;
};
mxGraph.prototype.getStylesheet = function() {
  return this.stylesheet;
};
mxGraph.prototype.setStylesheet = function(a) {
  this.stylesheet = a;
};
mxGraph.prototype.getSelectionModel = function() {
  return this.selectionModel;
};
mxGraph.prototype.setSelectionModel = function(a) {
  this.selectionModel = a;
};
mxGraph.prototype.getSelectionCellsForChanges = function(a, b) {
  for (var c = new mxDictionary(), d = [], e = mxUtils.bind(this, function(l) {
      if (!c.get(l) && this.model.contains(l))
        if (this.model.isEdge(l) || this.model.isVertex(l))
          c.put(l, !0), d.push(l);
        else
          for (var m = this.model.getChildCount(l), n = 0; n < m; n++)
            e(this.model.getChildAt(l, n));
    }), f = 0; f < a.length; f++) {
    var g = a[f];
    if (g.constructor != mxRootChange && (null == b || !b(g))) {
      var k = null;
      g instanceof mxChildChange ? k = g.child : null != g.cell && g.cell instanceof mxCell && (k = g.cell);
      null != k && e(k);
    }
  }
  return d;
};
mxGraph.prototype.graphModelChanged = function(a) {
  for (var b = 0; b < a.length; b++)
    this.processChange(a[b]);
  this.updateSelection();
  this.view.validate();
  this.sizeDidChange();
};
mxGraph.prototype.updateSelection = function() {
  for (var a = this.getSelectionCells(), b = [], c = 0; c < a.length; c++)
    if (this.model.contains(a[c]) && this.isCellVisible(a[c]))
      for (var d = this.model.getParent(a[c]); null != d && d != this.view.currentRoot;) {
        if (this.isCellCollapsed(d) || !this.isCellVisible(d)) {
          b.push(a[c]);
          break;
        }
        d = this.model.getParent(d);
      }
  else
    b.push(a[c]);
  this.removeSelectionCells(b);
};
mxGraph.prototype.processChange = function(a) {
  if (a instanceof mxRootChange)
    this.clearSelection(), this.setDefaultParent(null), this.removeStateForCell(a.previous), this.resetViewOnRootChange && (this.view.scale = 1, this.view.translate.x = 0, this.view.translate.y = 0), this.fireEvent(new mxEventObject(mxEvent.ROOT));
  else if (a instanceof mxChildChange) {
    var b = this.model.getParent(a.child);
    this.view.invalidate(a.child, !0, !0);
    if (!this.model.contains(b) || this.isCellCollapsed(b))
      this.view.invalidate(a.child, !0, !0), this.removeStateForCell(a.child), this.view.currentRoot == a.child && this.home();
    b != a.previous && (null != b && this.view.invalidate(b, !1, !1), null != a.previous && this.view.invalidate(a.previous, !1, !1));
  } else
    a instanceof mxTerminalChange || a instanceof mxGeometryChange ? (a instanceof mxTerminalChange || null == a.previous && null != a.geometry || null != a.previous && !a.previous.equals(a.geometry)) && this.view.invalidate(a.cell) : a instanceof mxValueChange ? this.view.invalidate(a.cell, !1, !1) : a instanceof mxStyleChange ? (this.view.invalidate(a.cell, !0, !0), a = this.view.getState(a.cell), null != a && (a.invalidStyle = !0)) : null != a.cell && a.cell instanceof mxCell && this.removeStateForCell(a.cell);
};
mxGraph.prototype.removeStateForCell = function(a) {
  for (var b = this.model.getChildCount(a), c = 0; c < b; c++)
    this.removeStateForCell(this.model.getChildAt(a, c));
  this.view.invalidate(a, !1, !0);
  this.view.removeState(a);
};
mxGraph.prototype.addCellOverlay = function(a, b) {
  null == a.overlays && (a.overlays = []);
  a.overlays.push(b);
  var c = this.view.getState(a);
  null != c && this.cellRenderer.redraw(c);
  this.fireEvent(new mxEventObject(mxEvent.ADD_OVERLAY, 'cell', a, 'overlay', b));
  return b;
};
mxGraph.prototype.getCellOverlays = function(a) {
  return a.overlays;
};
mxGraph.prototype.removeCellOverlay = function(a, b) {
  if (null == b)
    this.removeCellOverlays(a);
  else {
    var c = mxUtils.indexOf(a.overlays, b);
    0 <= c ? (a.overlays.splice(c, 1), 0 == a.overlays.length && (a.overlays = null), c = this.view.getState(a), null != c && this.cellRenderer.redraw(c), this.fireEvent(new mxEventObject(mxEvent.REMOVE_OVERLAY, 'cell', a, 'overlay', b))) : b = null;
  }
  return b;
};
mxGraph.prototype.removeCellOverlays = function(a) {
  var b = a.overlays;
  if (null != b) {
    a.overlays = null;
    var c = this.view.getState(a);
    null != c && this.cellRenderer.redraw(c);
    for (c = 0; c < b.length; c++)
      this.fireEvent(new mxEventObject(mxEvent.REMOVE_OVERLAY, 'cell', a, 'overlay', b[c]));
  }
  return b;
};
mxGraph.prototype.clearCellOverlays = function(a) {
  a = null != a ? a : this.model.getRoot();
  this.removeCellOverlays(a);
  for (var b = this.model.getChildCount(a), c = 0; c < b; c++) {
    var d = this.model.getChildAt(a, c);
    this.clearCellOverlays(d);
  }
};
mxGraph.prototype.setCellWarning = function(a, b, c, d) {
  if (null != b && 0 < b.length)
    return c = null != c ? c : this.warningImage, b = new mxCellOverlay(c, '<font color=red>' + b + '</font>'), d && b.addListener(mxEvent.CLICK, mxUtils.bind(this, function(e, f) {
      this.isEnabled() && this.setSelectionCell(a);
    })), this.addCellOverlay(a, b);
  this.removeCellOverlays(a);
  return null;
};
mxGraph.prototype.startEditing = function(a) {
  this.startEditingAtCell(null, a);
};
mxGraph.prototype.startEditingAtCell = function(a, b) {
  null != b && mxEvent.isMultiTouchEvent(b) || (null == a && (a = this.getSelectionCell(), null == a || this.isCellEditable(a) || (a = null)), null != a && (this.fireEvent(new mxEventObject(mxEvent.START_EDITING, 'cell', a, 'event', b)), this.cellEditor.startEditing(a, b), this.fireEvent(new mxEventObject(mxEvent.EDITING_STARTED, 'cell', a, 'event', b))));
};
mxGraph.prototype.getEditingValue = function(a, b) {
  return this.convertValueToString(a);
};
mxGraph.prototype.stopEditing = function(a) {
  this.cellEditor.stopEditing(a);
  this.fireEvent(new mxEventObject(mxEvent.EDITING_STOPPED, 'cancel', a));
};
mxGraph.prototype.labelChanged = function(a, b, c) {
  this.model.beginUpdate();
  try {
    var d = a.value;
    this.cellLabelChanged(a, b, this.isAutoSizeCell(a));
    this.fireEvent(new mxEventObject(mxEvent.LABEL_CHANGED, 'cell', a, 'value', b, 'old', d, 'event', c));
  } finally {
    this.model.endUpdate();
  }
  return a;
};
mxGraph.prototype.cellLabelChanged = function(a, b, c) {
  this.model.beginUpdate();
  try {
    this.model.setValue(a, b), c && this.cellSizeUpdated(a, !1);
  } finally {
    this.model.endUpdate();
  }
};
mxGraph.prototype.escape = function(a) {
  this.fireEvent(new mxEventObject(mxEvent.ESCAPE, 'event', a));
};
mxGraph.prototype.click = function(a) {
  var b = a.getEvent(),
    c = a.getCell(),
    d = new mxEventObject(mxEvent.CLICK, 'event', b, 'cell', c);
  a.isConsumed() && d.consume();
  this.fireEvent(d);
  if (this.isEnabled() && !mxEvent.isConsumed(b) && !d.isConsumed()) {
    if (null != c) {
      if (this.isTransparentClickEvent(b)) {
        var e = !1;
        a = this.getCellAt(a.graphX, a.graphY, null, null, null, mxUtils.bind(this, function(g) {
          var k = this.isCellSelected(g.cell);
          e = e || k;
          return !e || k || g.cell != c && this.model.isAncestor(g.cell, c);
        }));
        null != a && (c = a);
      }
    } else if (this.isSwimlaneSelectionEnabled() && (c = this.getSwimlaneAt(a.getGraphX(), a.getGraphY()), !(null == c || this.isToggleEvent(b) && mxEvent.isAltDown(b)))) {
      d = c;
      for (a = []; null != d;) {
        d = this.model.getParent(d);
        var f = this.view.getState(d);
        this.isSwimlane(d) && null != f && a.push(d);
      }
      if (0 < a.length)
        for (a = a.reverse(), a.splice(0, 0, c), a.push(c), d = 0; d < a.length - 1; d++)
          this.isCellSelected(a[d]) && (c = a[this.isToggleEvent(b) ? d : d + 1]);
    }
    null != c ? this.selectCellForEvent(c, b) : this.isToggleEvent(b) || this.clearSelection();
  }
};
mxGraph.prototype.isSiblingSelected = function(a) {
  for (var b = this.model, c = b.getParent(a), d = b.getChildCount(c), e = 0; e < d; e++) {
    var f = b.getChildAt(c, e);
    if (a != f && this.isCellSelected(f))
      return !0;
  }
  return !1;
};
mxGraph.prototype.dblClick = function(a, b) {
  var c = new mxEventObject(mxEvent.DOUBLE_CLICK, 'event', a, 'cell', b);
  this.fireEvent(c);
  !this.isEnabled() || mxEvent.isConsumed(a) || c.isConsumed() || null == b || !this.isCellEditable(b) || this.isEditing(b) || (this.startEditingAtCell(b, a), mxEvent.consume(a));
};
mxGraph.prototype.tapAndHold = function(a) {
  var b = a.getEvent(),
    c = new mxEventObject(mxEvent.TAP_AND_HOLD, 'event', b, 'cell', a.getCell());
  this.fireEvent(c);
  c.isConsumed() && (this.panningHandler.panningTrigger = !1);
  this.isEnabled() && !mxEvent.isConsumed(b) && !c.isConsumed() && this.connectionHandler.isEnabled() && (b = this.view.getState(this.connectionHandler.marker.getCell(a)), null != b && (this.connectionHandler.marker.currentColor = this.connectionHandler.marker.validColor, this.connectionHandler.marker.markedState = b, this.connectionHandler.marker.mark(), this.connectionHandler.first = new mxPoint(a.getGraphX(), a.getGraphY()), this.connectionHandler.edgeState = this.connectionHandler.createEdgeState(a), this.connectionHandler.previous = b, this.connectionHandler.fireEvent(new mxEventObject(mxEvent.START, 'state', this.connectionHandler.previous))));
};
mxGraph.prototype.scrollPointToVisible = function(a, b, c, d) {
  if (this.timerAutoScroll || !this.ignoreScrollbars && !mxUtils.hasScrollbars(this.container))
    this.allowAutoPanning && !this.panningHandler.isActive() && (null == this.panningManager && (this.panningManager = this.createPanningManager()), this.panningManager.panTo(a + this.panDx, b + this.panDy));
  else {
    var e = this.container;
    d = null != d ? d : 20;
    if (a >= e.scrollLeft && b >= e.scrollTop && a <= e.scrollLeft + e.clientWidth && b <= e.scrollTop + e.clientHeight) {
      var f = e.scrollLeft + e.clientWidth - a;
      if (f < d) {
        if (a = e.scrollLeft, e.scrollLeft += d - f, c && a == e.scrollLeft) {
          if (this.dialect == mxConstants.DIALECT_SVG) {
            a = this.view.getDrawPane().ownerSVGElement;
            var g = this.container.scrollWidth + d - f;
          } else
            g = Math.max(e.clientWidth, e.scrollWidth) + d - f, a = this.view.getCanvas();
          a.style.width = g + 'px';
          e.scrollLeft += d - f;
        }
      } else
        f = a - e.scrollLeft, f < d && (e.scrollLeft -= d - f);
      f = e.scrollTop + e.clientHeight - b;
      f < d ? (a = e.scrollTop, e.scrollTop += d - f, a == e.scrollTop && c && (this.dialect == mxConstants.DIALECT_SVG ? (a = this.view.getDrawPane().ownerSVGElement, b = this.container.scrollHeight + d - f, a.style.height = b + 'px') : (b = Math.max(e.clientHeight, e.scrollHeight) + d - f, a = this.view.getCanvas(), a.style.height = b + 'px'), e.scrollTop += d - f)) : (f = b - e.scrollTop, f < d && (e.scrollTop -= d - f));
    }
  }
};
mxGraph.prototype.createPanningManager = function() {
  return new mxPanningManager(this);
};
mxGraph.prototype.getBorderSizes = function() {
  var a = mxUtils.getCurrentStyle(this.container);
  return new mxRectangle(mxUtils.parseCssNumber(a.paddingLeft) + ('none' != a.borderLeftStyle ? mxUtils.parseCssNumber(a.borderLeftWidth) : 0), mxUtils.parseCssNumber(a.paddingTop) + ('none' != a.borderTopStyle ? mxUtils.parseCssNumber(a.borderTopWidth) : 0), mxUtils.parseCssNumber(a.paddingRight) + ('none' != a.borderRightStyle ? mxUtils.parseCssNumber(a.borderRightWidth) : 0), mxUtils.parseCssNumber(a.paddingBottom) + ('none' != a.borderBottomStyle ? mxUtils.parseCssNumber(a.borderBottomWidth) : 0));
};
mxGraph.prototype.getPreferredPageSize = function(a, b, c) {
  a = this.view.translate;
  var d = this.pageFormat,
    e = this.pageScale;
  d = new mxRectangle(0, 0, Math.ceil(d.width * e), Math.ceil(d.height * e));
  return new mxRectangle(0, 0, (this.pageBreaksVisible ? Math.ceil(b / d.width) : 1) * d.width + 2 + a.x, (this.pageBreaksVisible ? Math.ceil(c / d.height) : 1) * d.height + 2 + a.y);
};
mxGraph.prototype.fit = function(a, b, c, d, e, f, g) {
  if (null != this.container) {
    a = null != a ? a : this.getBorder();
    b = null != b ? b : !1;
    c = null != c ? c : 0;
    d = null != d ? d : !0;
    e = null != e ? e : !1;
    f = null != f ? f : !1;
    var k = this.getBorderSizes(),
      l = this.container.offsetWidth - k.x - k.width - 1,
      m = null != g ? g : this.container.offsetHeight - k.y - k.height - 1;
    g = this.view.getGraphBounds();
    if (0 < g.width && 0 < g.height) {
      b && null != g.x && null != g.y && (g = g.clone(), g.width += g.x, g.height += g.y, g.x = 0, g.y = 0);
      k = this.view.scale;
      var n = g.width / k,
        p = g.height / k;
      null != this.backgroundImage && null != this.backgroundImage.width && null != this.backgroundImage.height && (n = Math.max(n, this.backgroundImage.width - g.x / k), p = Math.max(p, this.backgroundImage.height - g.y / k));
      var r = (b ? a : 2 * a) + c + 1;
      l -= r;
      m -= r;
      e = e ? m / p : f ? l / n : Math.min(l / n, m / p);
      null != this.minFitScale && (e = Math.max(e, this.minFitScale));
      null != this.maxFitScale && (e = Math.min(e, this.maxFitScale));
      if (d)
        b ? this.view.scale != e && this.view.setScale(e) : mxUtils.hasScrollbars(this.container) ? (this.view.setScale(e), a = this.getGraphBounds(), null != a.x && (this.container.scrollLeft = a.x), null != a.y && (this.container.scrollTop = a.y)) : this.view.scaleAndTranslate(e, null != g.x ? Math.floor(this.view.translate.x - g.x / k + a / e + c / 2) : a, null != g.y ? Math.floor(this.view.translate.y - g.y / k + a / e + c / 2) : a);
      else
        return e;
    }
  }
  return this.view.scale;
};
mxGraph.prototype.sizeDidChange = function() {
  var a = this.getGraphBounds();
  if (null != this.container) {
    var b = this.getBorder(),
      c = Math.max(0, a.x) + a.width + 2 * b;
    b = Math.max(0, a.y) + a.height + 2 * b;
    null != this.minimumContainerSize && (c = Math.max(c, this.minimumContainerSize.width), b = Math.max(b, this.minimumContainerSize.height));
    this.resizeContainer && this.doResizeContainer(c, b);
    if (this.preferPageSize || !mxClient.IS_IE && this.pageVisible) {
      var d = this.getPreferredPageSize(a, Math.max(1, c), Math.max(1, b));
      null != d && (c = d.width * this.view.scale, b = d.height * this.view.scale);
    }
    null != this.minimumGraphSize && (c = Math.max(c, this.minimumGraphSize.width * this.view.scale), b = Math.max(b, this.minimumGraphSize.height * this.view.scale));
    c = Math.ceil(c);
    b = Math.ceil(b);
    this.dialect == mxConstants.DIALECT_SVG ? (d = this.view.getDrawPane().ownerSVGElement, null != d && (d.style.minWidth = Math.max(1, c) + 'px', d.style.minHeight = Math.max(1, b) + 'px', d.style.width = '100%', d.style.height = '100%')) : (this.view.canvas.style.minWidth = Math.max(1, c) + 'px', this.view.canvas.style.minHeight = Math.max(1, b) + 'px');
    this.updatePageBreaks(this.pageBreaksVisible, c, b);
  }
  this.fireEvent(new mxEventObject(mxEvent.SIZE, 'bounds', a));
};
mxGraph.prototype.doResizeContainer = function(a, b) {
  null != this.maximumContainerSize && (a = Math.min(this.maximumContainerSize.width, a), b = Math.min(this.maximumContainerSize.height, b));
  this.container.style.width = Math.ceil(a) + 'px';
  this.container.style.height = Math.ceil(b) + 'px';
};
mxGraph.prototype.updatePageBreaks = function(a, b, c) {
  b = this.view.scale;
  c = this.view.translate;
  var d = this.pageFormat,
    e = b * this.pageScale,
    f = new mxRectangle(0, 0, d.width * e, d.height * e);
  d = mxRectangle.fromRectangle(this.getGraphBounds());
  d.width = Math.max(1, d.width);
  d.height = Math.max(1, d.height);
  f.x = Math.floor((d.x - c.x * b) / f.width) * f.width + c.x * b;
  f.y = Math.floor((d.y - c.y * b) / f.height) * f.height + c.y * b;
  d.width = Math.ceil((d.width + (d.x - f.x)) / f.width) * f.width;
  d.height = Math.ceil((d.height + (d.y - f.y)) / f.height) * f.height;
  var g = (a = a && Math.min(f.width, f.height) > this.minPageBreakDist) ? Math.ceil(d.height / f.height) + 1 : 0,
    k = a ? Math.ceil(d.width / f.width) + 1 : 0,
    l = (k - 1) * f.width,
    m = (g - 1) * f.height;
  null == this.horizontalPageBreaks && 0 < g && (this.horizontalPageBreaks = []);
  null == this.verticalPageBreaks && 0 < k && (this.verticalPageBreaks = []);
  a = mxUtils.bind(this, function(n) {
    if (null != n) {
      for (var p = n == this.horizontalPageBreaks ? g : k, r = 0; r <= p; r++) {
        var q = n == this.horizontalPageBreaks ? [
          new mxPoint(Math.round(f.x), Math.round(f.y + r * f.height)),
          new mxPoint(Math.round(f.x + l), Math.round(f.y + r * f.height))
        ] : [
          new mxPoint(Math.round(f.x + r * f.width), Math.round(f.y)),
          new mxPoint(Math.round(f.x + r * f.width), Math.round(f.y + m))
        ];
        null != n[r] ? (n[r].points = q, n[r].redraw()) : (q = new mxPolyline(q, this.pageBreakColor), q.dialect = this.dialect, q.pointerEvents = !1, q.isDashed = this.pageBreakDashed, q.init(this.view.backgroundPane), q.redraw(), n[r] = q);
      }
      for (r = p; r < n.length; r++)
        n[r].destroy();
      n.splice(p, n.length - p);
    }
  });
  a(this.horizontalPageBreaks);
  a(this.verticalPageBreaks);
};
mxGraph.prototype.getCurrentCellStyle = function(a, b) {
  b = b ? null : this.view.getState(a);
  return null != b ? b.style : this.getCellStyle(a);
};
mxGraph.prototype.getCellStyle = function(a, b) {
  b = null != b ? b : !0;
  var c = this.model.getStyle(a),
    d = this.model.isEdge(a) ? this.stylesheet.getDefaultEdgeStyle() : this.stylesheet.getDefaultVertexStyle();
  null != c ? d = this.stylesheet.getCellStyle(c, d, b) : null != d && (d = mxUtils.clone(d));
  null == d ? d = {} : b && (d = this.postProcessCellStyle(a, d));
  return d;
};
mxGraph.prototype.postProcessCellStyle = function(a, b) {
  if (null != b) {
    var c = b[mxConstants.STYLE_IMAGE];
    a = this.getImageFromBundles(c);
    null != a ? b[mxConstants.STYLE_IMAGE] = a : a = c;
    null != a && 'data:image/' == a.substring(0, 11) && ('data:image/svg+xml,<' == a.substring(0, 20) ? a = a.substring(0, 19) + encodeURIComponent(a.substring(19)) : 'data:image/svg+xml,%3C' != a.substring(0, 22) && (c = a.indexOf(','), 0 < c && ';base64,' != a.substring(c - 7, c + 1) && (a = a.substring(0, c) + ';base64,' + a.substring(c + 1))), b[mxConstants.STYLE_IMAGE] = a);
  }
  return b;
};
mxGraph.prototype.setCellStyle = function(a, b) {
  b = b || this.getSelectionCells();
  if (null != b) {
    this.model.beginUpdate();
    try {
      for (var c = 0; c < b.length; c++)
        this.model.setStyle(b[c], a);
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.toggleCellStyle = function(a, b, c) {
  c = c || this.getSelectionCell();
  return this.toggleCellStyles(a, b, [c]);
};
mxGraph.prototype.toggleCellStyles = function(a, b, c) {
  b = null != b ? b : !1;
  c = c || this.getEditableCells(this.getSelectionCells());
  var d = null;
  null != c && 0 < c.length && (d = this.getCurrentCellStyle(c[0]), d = mxUtils.getValue(d, a, b) ? 0 : 1, this.setCellStyles(a, d, c));
  return d;
};
mxGraph.prototype.setCellStyles = function(a, b, c) {
  c = c || this.getEditableCells(this.getSelectionCells());
  mxUtils.setCellStyles(this.model, c, a, b);
};
mxGraph.prototype.toggleCellStyleFlags = function(a, b, c) {
  this.setCellStyleFlags(a, b, null, c);
};
mxGraph.prototype.setCellStyleFlags = function(a, b, c, d) {
  d = d || this.getEditableCells(this.getSelectionCells());
  null != d && 0 < d.length && (null == c && (c = this.getCurrentCellStyle(d[0]), c = (parseInt(c[a] || 0) & b) != b), mxUtils.setCellStyleFlags(this.model, d, a, b, c));
};
mxGraph.prototype.getOriginForCell = function(a) {
  a = this.model.getParent(a);
  for (var b = new mxPoint(); null != a;) {
    var c = this.getCellGeometry(a);
    null == c || c.relative || (b.x += c.x, b.y += c.y);
    a = this.model.getParent(a);
  }
  return b;
};
mxGraph.prototype.alignCells = function(a, b, c) {
  null == b && (b = this.getMovableCells(this.getSelectionCells()));
  if (null != b && 1 < b.length) {
    if (null == c)
      for (var d = 0; d < b.length; d++) {
        var e = this.getOriginForCell(b[d]),
          f = this.getCellGeometry(b[d]);
        if (!this.model.isEdge(b[d]) && null != f && !f.relative)
          if (null == c)
            if (a == mxConstants.ALIGN_CENTER) {
              c = e.x + f.x + f.width / 2;
              break;
            } else if (a == mxConstants.ALIGN_RIGHT)
          c = e.x + f.x + f.width;
        else if (a == mxConstants.ALIGN_TOP)
          c = e.y + f.y;
        else if (a == mxConstants.ALIGN_MIDDLE) {
          c = e.y + f.y + f.height / 2;
          break;
        } else
          c = a == mxConstants.ALIGN_BOTTOM ? e.y + f.y + f.height : e.x + f.x;
        else
          c = a == mxConstants.ALIGN_RIGHT ? Math.max(c, e.x + f.x + f.width) : a == mxConstants.ALIGN_TOP ? Math.min(c, e.y + f.y) : a == mxConstants.ALIGN_BOTTOM ? Math.max(c, e.y + f.y + f.height) : Math.min(c, e.x + f.x);
      }
    if (null != c) {
      b = mxUtils.sortCells(b);
      this.model.beginUpdate();
      try {
        for (d = 0; d < b.length; d++)
          e = this.getOriginForCell(b[d]), f = this.getCellGeometry(b[d]), this.model.isEdge(b[d]) || null == f || f.relative || (f = f.clone(), a == mxConstants.ALIGN_CENTER ? f.x = c - e.x - f.width / 2 : a == mxConstants.ALIGN_RIGHT ? f.x = c - e.x - f.width : a == mxConstants.ALIGN_TOP ? f.y = c - e.y : a == mxConstants.ALIGN_MIDDLE ? f.y = c - e.y - f.height / 2 : a == mxConstants.ALIGN_BOTTOM ? f.y = c - e.y - f.height : f.x = c - e.x, this.resizeCell(b[d], f));
        this.fireEvent(new mxEventObject(mxEvent.ALIGN_CELLS, 'align', a, 'cells', b));
      } finally {
        this.model.endUpdate();
      }
    }
  }
  return b;
};
mxGraph.prototype.flipEdge = function(a) {
  if (null != a && null != this.alternateEdgeStyle) {
    this.model.beginUpdate();
    try {
      var b = this.model.getStyle(a);
      null == b || 0 == b.length ? this.model.setStyle(a, this.alternateEdgeStyle) : this.model.setStyle(a, null);
      this.resetEdge(a);
      this.fireEvent(new mxEventObject(mxEvent.FLIP_EDGE, 'edge', a));
    } finally {
      this.model.endUpdate();
    }
  }
  return a;
};
mxGraph.prototype.addImageBundle = function(a) {
  this.imageBundles.push(a);
};
mxGraph.prototype.removeImageBundle = function(a) {
  for (var b = [], c = 0; c < this.imageBundles.length; c++)
    this.imageBundles[c] != a && b.push(this.imageBundles[c]);
  this.imageBundles = b;
};
mxGraph.prototype.getImageFromBundles = function(a) {
  if (null != a)
    for (var b = 0; b < this.imageBundles.length; b++) {
      var c = this.imageBundles[b].getImage(a);
      if (null != c)
        return c;
    }
  return null;
};
mxGraph.prototype.orderCells = function(a, b, c) {
  null == b && (b = mxUtils.sortCells(this.getEditableCells(this.getSelectionCells()), !0));
  this.model.beginUpdate();
  try {
    this.cellsOrdered(b, a, c), this.fireEvent(new mxEventObject(mxEvent.ORDER_CELLS, 'back', a, 'cells', b, 'increment', c));
  } finally {
    this.model.endUpdate();
  }
  return b;
};
mxGraph.prototype.cellsOrdered = function(a, b, c) {
  if (null != a) {
    this.model.beginUpdate();
    try {
      for (var d = 0; d < a.length; d++) {
        var e = this.model.getParent(a[d]);
        b ? c ? this.model.add(e, a[d], Math.max(0, e.getIndex(a[d]) - 1)) : this.model.add(e, a[d], d) : c ? this.model.add(e, a[d], Math.min(this.model.getChildCount(e) - 1, e.getIndex(a[d]) + 1)) : this.model.add(e, a[d], this.model.getChildCount(e) - 1);
      }
      this.fireEvent(new mxEventObject(mxEvent.CELLS_ORDERED, 'back', b, 'cells', a, 'increment', c));
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.groupCells = function(a, b, c) {
  null == c && (c = mxUtils.sortCells(this.getSelectionCells(), !0));
  c = this.getCellsForGroup(c);
  null == a && (a = this.createGroupCell(c));
  var d = this.getBoundsForGroup(a, c, b);
  if (1 < c.length && null != d) {
    var e = this.model.getParent(a);
    null == e && (e = this.model.getParent(c[0]));
    this.model.beginUpdate();
    try {
      null == this.getCellGeometry(a) && this.model.setGeometry(a, new mxGeometry());
      var f = this.model.getChildCount(e);
      this.cellsAdded([a], e, f, null, null, !1, !1, !1);
      f = this.model.getChildCount(a);
      this.cellsAdded(c, a, f, null, null, !1, !1, !1);
      this.cellsMoved(c, -d.x, -d.y, !1, !1, !1);
      this.cellsResized([a], [d], !1);
      this.fireEvent(new mxEventObject(mxEvent.GROUP_CELLS, 'group', a, 'border', b, 'cells', c));
    } finally {
      this.model.endUpdate();
    }
  }
  return a;
};
mxGraph.prototype.getCellsForGroup = function(a) {
  var b = [];
  if (null != a && 0 < a.length) {
    var c = this.model.getParent(a[0]);
    b.push(a[0]);
    for (var d = 1; d < a.length; d++)
      this.model.getParent(a[d]) == c && b.push(a[d]);
  }
  return b;
};
mxGraph.prototype.getBoundsForGroup = function(a, b, c) {
  b = this.getBoundingBoxFromGeometry(b, !0);
  null != b && (this.isSwimlane(a) && (a = this.getStartSize(a), b.x -= a.width, b.y -= a.height, b.width += a.width, b.height += a.height), null != c && (b.x -= c, b.y -= c, b.width += 2 * c, b.height += 2 * c));
  return b;
};
mxGraph.prototype.createGroupCell = function(a) {
  a = new mxCell('');
  a.setVertex(!0);
  a.setConnectable(!1);
  return a;
};
mxGraph.prototype.ungroupCells = function(a) {
  var b = [];
  null == a && (a = this.getCellsForUngroup());
  if (null != a && 0 < a.length) {
    this.model.beginUpdate();
    try {
      for (var c = 0; c < a.length; c++) {
        var d = this.model.getChildren(a[c]);
        if (null != d && 0 < d.length) {
          d = d.slice();
          var e = this.model.getParent(a[c]),
            f = this.model.getChildCount(e);
          this.cellsAdded(d, e, f, null, null, !0);
          b = b.concat(d);
          for (var g = 0; g < d.length; g++)
            if (this.model.isVertex(d[g])) {
              var k = this.view.getState(d[g]),
                l = this.getCellGeometry(d[g]);
              null != k && null != l && l.relative && (l = l.clone(), l.x = k.origin.x, l.y = k.origin.y, l.relative = !1, this.model.setGeometry(d[g], l));
            }
        }
      }
      this.removeCellsAfterUngroup(a);
      this.fireEvent(new mxEventObject(mxEvent.UNGROUP_CELLS, 'cells', a));
    } finally {
      this.model.endUpdate();
    }
  }
  return b;
};
mxGraph.prototype.getCellsForUngroup = function() {
  for (var a = this.getEditableCells(this.getSelectionCells()), b = [], c = 0; c < a.length; c++)
    this.model.isVertex(a[c]) && 0 < this.model.getChildCount(a[c]) && b.push(a[c]);
  return b;
};
mxGraph.prototype.removeCellsAfterUngroup = function(a) {
  this.cellsRemoved(this.addAllEdges(a));
};
mxGraph.prototype.removeCellsFromParent = function(a) {
  null == a && (a = this.getSelectionCells());
  this.model.beginUpdate();
  try {
    var b = this.getDefaultParent(),
      c = this.model.getChildCount(b);
    this.cellsAdded(a, b, c, null, null, !0);
    this.fireEvent(new mxEventObject(mxEvent.REMOVE_CELLS_FROM_PARENT, 'cells', a));
  } finally {
    this.model.endUpdate();
  }
  return a;
};
mxGraph.prototype.updateGroupBounds = function(a, b, c, d, e, f, g) {
  null == a && (a = this.getSelectionCells());
  b = null != b ? b : 0;
  c = null != c ? c : !1;
  d = null != d ? d : 0;
  e = null != e ? e : 0;
  f = null != f ? f : 0;
  g = null != g ? g : 0;
  this.model.beginUpdate();
  try {
    for (var k = a.length - 1; 0 <= k; k--) {
      var l = this.getCellGeometry(a[k]);
      if (null != l) {
        var m = this.getChildCells(a[k]);
        if (null != m && 0 < m.length) {
          var n = this.getBoundingBoxFromGeometry(m, !0);
          if (null != n && 0 < n.width && 0 < n.height) {
            var p = this.isSwimlane(a[k]) ? this.getActualStartSize(a[k], !0) : new mxRectangle();
            l = l.clone();
            c && (l.x = Math.round(l.x + n.x - b - p.x - g), l.y = Math.round(l.y + n.y - b - p.y - d));
            l.width = Math.round(n.width + 2 * b + p.x + g + e + p.width);
            l.height = Math.round(n.height + 2 * b + p.y + d + f + p.height);
            this.model.setGeometry(a[k], l);
            this.moveCells(m, b + p.x - n.x + g, b + p.y - n.y + d);
          }
        }
      }
    }
  } finally {
    this.model.endUpdate();
  }
  return a;
};
mxGraph.prototype.getBoundingBox = function(a) {
  var b = null;
  if (null != a && 0 < a.length)
    for (var c = 0; c < a.length; c++)
      if (this.model.isVertex(a[c]) || this.model.isEdge(a[c])) {
        var d = this.view.getBoundingBox(this.view.getState(a[c]), !0);
        null != d && (null == b ? b = mxRectangle.fromRectangle(d) : b.add(d));
      }
  return b;
};
mxGraph.prototype.cloneCell = function(a, b, c, d) {
  return this.cloneCells([a], b, c, d)[0];
};
mxGraph.prototype.cloneCells = function(a, b, c, d) {
  b = null != b ? b : !0;
  var e = null;
  if (null != a) {
    var f = new mxDictionary();
    e = [];
    for (var g = 0; g < a.length; g++)
      f.put(a[g], !0), e.push(a[g]);
    if (0 < e.length) {
      var k = this.view.scale,
        l = this.view.translate;
      e = this.model.cloneCells(a, !0, c);
      for (g = 0; g < a.length; g++)
        if (!b && this.model.isEdge(e[g]) && null != this.getEdgeValidationError(e[g], this.model.getTerminal(e[g], !0), this.model.getTerminal(e[g], !1)))
          e[g] = null;
        else {
          var m = this.model.getGeometry(e[g]);
          if (null != m) {
            var n = this.view.getState(a[g]),
              p = this.view.getState(this.model.getParent(a[g]));
            if (null != n && null != p)
              if (c = d ? 0 : p.origin.x, p = d ? 0 : p.origin.y, this.model.isEdge(e[g])) {
                if (n = n.absolutePoints, null != n) {
                  for (var r = this.model.getTerminal(a[g], !0); null != r && !f.get(r);)
                    r = this.model.getParent(r);
                  null == r && null != n[0] && m.setTerminalPoint(new mxPoint(n[0].x / k - l.x, n[0].y / k - l.y), !0);
                  for (r = this.model.getTerminal(a[g], !1); null != r && !f.get(r);)
                    r = this.model.getParent(r);
                  var q = n.length - 1;
                  null == r && null != n[q] && m.setTerminalPoint(new mxPoint(n[q].x / k - l.x, n[q].y / k - l.y), !1);
                  m = m.points;
                  if (null != m)
                    for (n = 0; n < m.length; n++)
                      m[n].x += c, m[n].y += p;
                }
              } else
                m.translate(c, p);
          }
        }
    } else
      e = [];
  }
  return e;
};
mxGraph.prototype.insertVertex = function(a, b, c, d, e, f, g, k, l) {
  b = this.createVertex(a, b, c, d, e, f, g, k, l);
  return this.addCell(b, a);
};
mxGraph.prototype.createVertex = function(a, b, c, d, e, f, g, k, l) {
  a = new mxGeometry(d, e, f, g);
  a.relative = null != l ? l : !1;
  c = new mxCell(c, a, k);
  c.setId(b);
  c.setVertex(!0);
  c.setConnectable(!0);
  return c;
};
mxGraph.prototype.insertEdge = function(a, b, c, d, e, f) {
  b = this.createEdge(a, b, c, d, e, f);
  return this.addEdge(b, a, d, e);
};
mxGraph.prototype.createEdge = function(a, b, c, d, e, f) {
  a = new mxCell(c, new mxGeometry(), f);
  a.setId(b);
  a.setEdge(!0);
  a.geometry.relative = !0;
  return a;
};
mxGraph.prototype.addEdge = function(a, b, c, d, e) {
  return this.addCell(a, b, e, c, d);
};
mxGraph.prototype.addCell = function(a, b, c, d, e) {
  return this.addCells([a], b, c, d, e)[0];
};
mxGraph.prototype.addCells = function(a, b, c, d, e, f) {
  null == b && (b = this.getDefaultParent());
  null == c && (c = this.model.getChildCount(b));
  this.model.beginUpdate();
  try {
    this.cellsAdded(a, b, c, d, e, null != f ? f : !1, !0), this.fireEvent(new mxEventObject(mxEvent.ADD_CELLS, 'cells', a, 'parent', b, 'index', c, 'source', d, 'target', e));
  } finally {
    this.model.endUpdate();
  }
  return a;
};
mxGraph.prototype.cellsAdded = function(a, b, c, d, e, f, g, k) {
  if (null != a && null != b && null != c) {
    this.model.beginUpdate();
    try {
      var l = f ? this.view.getState(b) : null,
        m = null != l ? l.origin : null,
        n = new mxPoint(0, 0);
      for (l = 0; l < a.length; l++)
        if (null == a[l])
          c--;
        else {
          var p = this.model.getParent(a[l]);
          if (null != m && a[l] != b && b != p) {
            var r = this.view.getState(p),
              q = null != r ? r.origin : n,
              t = this.model.getGeometry(a[l]);
            if (null != t) {
              var u = q.x - m.x,
                x = q.y - m.y;
              t = t.clone();
              t.translate(u, x);
              t.relative || !this.model.isVertex(a[l]) || this.isAllowNegativeCoordinates() || (t.x = Math.max(0, t.x), t.y = Math.max(0, t.y));
              this.model.setGeometry(a[l], t);
            }
          }
          b == p && c + l > this.model.getChildCount(b) && c--;
          this.model.add(b, a[l], c + l);
          this.autoSizeCellsOnAdd && this.autoSizeCell(a[l], !0);
          (null == k || k) && this.isExtendParentsOnAdd(a[l]) && this.isExtendParent(a[l]) && this.extendParent(a[l]);
          (null == g || g) && this.constrainChild(a[l]);
          null != d && this.cellConnected(a[l], d, !0);
          null != e && this.cellConnected(a[l], e, !1);
        }
      this.fireEvent(new mxEventObject(mxEvent.CELLS_ADDED, 'cells', a, 'parent', b, 'index', c, 'source', d, 'target', e, 'absolute', f));
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.autoSizeCell = function(a, b) {
  if (null != b ? b : 1) {
    b = this.model.getChildCount(a);
    for (var c = 0; c < b; c++)
      this.autoSizeCell(this.model.getChildAt(a, c));
  }
  this.getModel().isVertex(a) && this.isAutoSizeCell(a) && this.updateCellSize(a);
};
mxGraph.prototype.removeCells = function(a, b) {
  b = null != b ? b : !0;
  null == a && (a = this.getDeletableCells(this.getSelectionCells()));
  if (b)
    a = this.getDeletableCells(this.addAllEdges(a));
  else {
    a = a.slice();
    for (var c = this.getDeletableCells(this.getAllEdges(a)), d = new mxDictionary(), e = 0; e < a.length; e++)
      d.put(a[e], !0);
    for (e = 0; e < c.length; e++)
      null != this.view.getState(c[e]) || d.get(c[e]) || (d.put(c[e], !0), a.push(c[e]));
  }
  this.model.beginUpdate();
  try {
    this.cellsRemoved(a), this.fireEvent(new mxEventObject(mxEvent.REMOVE_CELLS, 'cells', a, 'includeEdges', b));
  } finally {
    this.model.endUpdate();
  }
  return a;
};
mxGraph.prototype.cellsRemoved = function(a) {
  if (null != a && 0 < a.length) {
    var b = this.view.scale,
      c = this.view.translate;
    this.model.beginUpdate();
    try {
      for (var d = new mxDictionary(), e = 0; e < a.length; e++)
        d.put(a[e], !0);
      for (e = 0; e < a.length; e++) {
        for (var f = this.getAllEdges([a[e]]), g = mxUtils.bind(this, function(l, m) {
            var n = this.model.getGeometry(l);
            if (null != n) {
              for (var p = this.model.getTerminal(l, m), r = !1, q = p; null != q;) {
                if (a[e] == q) {
                  r = !0;
                  break;
                }
                q = this.model.getParent(q);
              }
              r && (n = n.clone(), r = this.view.getState(l), null != r && null != r.absolutePoints ? (p = r.absolutePoints, q = m ? 0 : p.length - 1, n.setTerminalPoint(new mxPoint(p[q].x / b - c.x - r.origin.x, p[q].y / b - c.y - r.origin.y), m)) : (p = this.view.getState(p), null != p && n.setTerminalPoint(new mxPoint(p.getCenterX() / b - c.x, p.getCenterY() / b - c.y), m)), this.model.setGeometry(l, n), this.model.setTerminal(l, null, m));
            }
          }), k = 0; k < f.length; k++)
          d.get(f[k]) || (d.put(f[k], !0), g(f[k], !0), g(f[k], !1));
        this.model.remove(a[e]);
      }
      this.fireEvent(new mxEventObject(mxEvent.CELLS_REMOVED, 'cells', a));
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.splitEdge = function(a, b, c, d, e, f, g, k) {
  d = d || 0;
  e = e || 0;
  k = null != k ? k : this.model.getParent(a);
  f = this.model.getTerminal(a, !0);
  this.model.beginUpdate();
  try {
    if (null == c) {
      c = this.cloneCell(a);
      var l = this.view.getState(a),
        m = this.getCellGeometry(c);
      if (null != m && null != m.points && null != l) {
        var n = this.view.translate,
          p = this.view.scale,
          r = mxUtils.findNearestSegment(l, (d + n.x) * p, (e + n.y) * p);
        m.points = m.points.slice(0, r);
        m = this.getCellGeometry(a);
        null != m && null != m.points && (m = m.clone(), m.points = m.points.slice(r), this.model.setGeometry(a, m));
      }
    }
    this.cellsMoved(b, d, e, !1, !1);
    this.cellsAdded(b, k, this.model.getChildCount(k), null, null, !0);
    this.cellsAdded([c], k, this.model.getChildCount(k), f, b[0], !1);
    this.cellConnected(a, b[0], !0);
    this.fireEvent(new mxEventObject(mxEvent.SPLIT_EDGE, 'edge', a, 'cells', b, 'newEdge', c, 'dx', d, 'dy', e));
  } finally {
    this.model.endUpdate();
  }
  return c;
};
mxGraph.prototype.toggleCells = function(a, b, c) {
  null == b && (b = this.getSelectionCells());
  c && (b = this.addAllEdges(b));
  this.model.beginUpdate();
  try {
    this.cellsToggled(b, a), this.fireEvent(new mxEventObject(mxEvent.TOGGLE_CELLS, 'show', a, 'cells', b, 'includeEdges', c));
  } finally {
    this.model.endUpdate();
  }
  return b;
};
mxGraph.prototype.cellsToggled = function(a, b) {
  if (null != a && 0 < a.length) {
    this.model.beginUpdate();
    try {
      for (var c = 0; c < a.length; c++)
        this.model.setVisible(a[c], b);
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.foldCells = function(a, b, c, d, e) {
  b = null != b ? b : !1;
  null == c && (c = this.getFoldableCells(this.getSelectionCells(), a));
  this.stopEditing(!1);
  this.model.beginUpdate();
  try {
    this.cellsFolded(c, a, b, d), this.fireEvent(new mxEventObject(mxEvent.FOLD_CELLS, 'collapse', a, 'recurse', b, 'cells', c));
  } finally {
    this.model.endUpdate();
  }
  return c;
};
mxGraph.prototype.cellsFolded = function(a, b, c, d) {
  if (null != a && 0 < a.length) {
    this.model.beginUpdate();
    try {
      for (var e = 0; e < a.length; e++)
        if ((!d || this.isCellFoldable(a[e], b)) && b != this.isCellCollapsed(a[e])) {
          this.model.setCollapsed(a[e], b);
          this.swapBounds(a[e], b);
          this.isExtendParent(a[e]) && this.extendParent(a[e]);
          if (c) {
            var f = this.model.getChildren(a[e]);
            this.cellsFolded(f, b, c);
          }
          this.constrainChild(a[e]);
        }
      this.fireEvent(new mxEventObject(mxEvent.CELLS_FOLDED, 'cells', a, 'collapse', b, 'recurse', c));
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.swapBounds = function(a, b) {
  if (null != a) {
    var c = this.model.getGeometry(a);
    null != c && (c = c.clone(), this.updateAlternateBounds(a, c, b), c.swap(), this.model.setGeometry(a, c));
  }
};
mxGraph.prototype.updateAlternateBounds = function(a, b, c) {
  if (null != a && null != b) {
    c = this.getCurrentCellStyle(a);
    if (null == b.alternateBounds) {
      var d = b;
      this.collapseToPreferredSize && (a = this.getPreferredSizeForCell(a), null != a && (d = a, a = mxUtils.getValue(c, mxConstants.STYLE_STARTSIZE), 0 < a && (d.height = Math.max(d.height, a))));
      b.alternateBounds = new mxRectangle(0, 0, d.width, d.height);
    }
    if (null != b.alternateBounds) {
      b.alternateBounds.x = b.x;
      b.alternateBounds.y = b.y;
      var e = mxUtils.toRadians(c[mxConstants.STYLE_ROTATION] || 0);
      0 != e && (c = b.alternateBounds.getCenterX() - b.getCenterX(), d = b.alternateBounds.getCenterY() - b.getCenterY(), a = Math.cos(e), e = Math.sin(e), b.alternateBounds.x += a * c - e * d - c, b.alternateBounds.y += e * c + a * d - d);
    }
  }
};
mxGraph.prototype.addAllEdges = function(a) {
  var b = a.slice();
  return mxUtils.removeDuplicates(b.concat(this.getAllEdges(a)));
};
mxGraph.prototype.getAllEdges = function(a) {
  var b = [];
  if (null != a)
    for (var c = 0; c < a.length; c++) {
      for (var d = this.model.getEdgeCount(a[c]), e = 0; e < d; e++)
        b.push(this.model.getEdgeAt(a[c], e));
      d = this.model.getChildren(a[c]);
      b = b.concat(this.getAllEdges(d));
    }
  return b;
};
mxGraph.prototype.updateCellSize = function(a, b) {
  b = null != b ? b : !1;
  this.model.beginUpdate();
  try {
    this.cellSizeUpdated(a, b), this.fireEvent(new mxEventObject(mxEvent.UPDATE_CELL_SIZE, 'cell', a, 'ignoreChildren', b));
  } finally {
    this.model.endUpdate();
  }
  return a;
};
mxGraph.prototype.cellSizeUpdated = function(a, b) {
  if (null != a) {
    this.model.beginUpdate();
    try {
      var c = this.getCellStyle(a),
        d = this.model.getGeometry(a);
      if (null != d) {
        var e = null,
          f = mxUtils.getValue(c, mxConstants.STYLE_FIXED_WIDTH, !1);
        f && (e = d.width - 2 * parseFloat(mxUtils.getValue(c, mxConstants.STYLE_SPACING, 2)) - parseFloat(mxUtils.getValue(c, mxConstants.STYLE_SPACING_LEFT, 0)) - parseFloat(mxUtils.getValue(c, mxConstants.STYLE_SPACING_RIGHT, 0)));
        var g = this.getPreferredSizeForCell(a, e);
        if (null != g) {
          var k = this.isCellCollapsed(a);
          d = d.clone();
          if (this.isSwimlane(a)) {
            var l = this.model.getStyle(a);
            null == l && (l = '');
            mxUtils.getValue(c, mxConstants.STYLE_HORIZONTAL, !0) ? (l = mxUtils.setStyle(l, mxConstants.STYLE_STARTSIZE, g.height + 8), k && (d.height = g.height + 8), f || (d.width = g.width)) : (l = mxUtils.setStyle(l, mxConstants.STYLE_STARTSIZE, g.width + 8), k && !f && (d.width = g.width + 8), d.height = g.height);
            this.model.setStyle(a, l);
          } else {
            var m = this.view.createState(a),
              n = m.style[mxConstants.STYLE_ALIGN] || mxConstants.ALIGN_CENTER,
              p = this.getVerticalAlign(m);
            'fixed' == m.style[mxConstants.STYLE_ASPECT] && (g.height = Math.round(d.height * g.width * 100 / d.width) / 100);
            p == mxConstants.ALIGN_BOTTOM ? d.y += d.height - g.height : p == mxConstants.ALIGN_MIDDLE && (d.y += Math.round((d.height - g.height) / 2));
            d.height = g.height;
            f || (n == mxConstants.ALIGN_RIGHT ? d.x += d.width - g.width : n == mxConstants.ALIGN_CENTER && (d.x += Math.round((d.width - g.width) / 2)), d.width = g.width);
          }
          if (!b && !k) {
            var r = this.view.getBounds(this.model.getChildren(a));
            if (null != r) {
              var q = this.view.translate,
                t = this.view.scale,
                u = (r.x + r.width) / t - d.x - q.x;
              d.height = Math.max(d.height, (r.y + r.height) / t - d.y - q.y);
              f || (d.width = Math.max(d.width, u));
            }
          }
          this.cellsResized([a], [d], !1);
        }
      }
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.getPreferredSizeForCell = function(a, b) {
  var c = null;
  if (null != a) {
    var d = this.view.createState(a),
      e = d.style;
    if (!this.model.isEdge(a)) {
      var f = e[mxConstants.STYLE_FONTSIZE] || mxConstants.DEFAULT_FONTSIZE;
      a = c = 0;
      null == this.getImage(d) && null == e[mxConstants.STYLE_IMAGE] || e[mxConstants.STYLE_SHAPE] != mxConstants.SHAPE_LABEL || (e[mxConstants.STYLE_VERTICAL_ALIGN] == mxConstants.ALIGN_MIDDLE && (c += parseFloat(mxUtils.getValue(e, mxConstants.STYLE_IMAGE_WIDTH, mxLabel.prototype.imageSize))), e[mxConstants.STYLE_ALIGN] != mxConstants.ALIGN_CENTER && (a += parseFloat(mxUtils.getValue(e, mxConstants.STYLE_IMAGE_HEIGHT, mxLabel.prototype.imageSize))));
      c += 2 * parseFloat(mxUtils.getValue(e, mxConstants.STYLE_SPACING, 2));
      c += parseFloat(mxUtils.getValue(e, mxConstants.STYLE_SPACING_LEFT, 2));
      c += parseFloat(mxUtils.getValue(e, mxConstants.STYLE_SPACING_RIGHT, 2));
      a += 2 * parseFloat(mxUtils.getValue(e, mxConstants.STYLE_SPACING, 2));
      a += parseFloat(mxUtils.getValue(e, mxConstants.STYLE_SPACING_TOP, 2));
      a += parseFloat(mxUtils.getValue(e, mxConstants.STYLE_SPACING_BOTTOM, 2));
      var g = this.getFoldingImage(d);
      null != g && (c += g.width + 8);
      g = this.cellRenderer.getLabelValue(d);
      null != g && 0 < g.length ? (this.isHtmlLabel(d.cell) ? null != b && (b += mxSvgCanvas2D.prototype.foreignObjectPadding) : g = mxUtils.htmlEntities(g, !1), g = g.replace(/\n/g, '<br>'), d = mxUtils.getSizeForString(g, f, e[mxConstants.STYLE_FONTFAMILY], b, e[mxConstants.STYLE_FONTSTYLE]), b = d.width + c, d = d.height + a, mxUtils.getValue(e, mxConstants.STYLE_HORIZONTAL, !0) || (e = d, d = b, b = e), this.gridEnabled && (b = this.snap(b + this.gridSize / 2), d = this.snap(d + this.gridSize / 2)), c = new mxRectangle(0, 0, b, d)) : (e = 4 * this.gridSize, c = new mxRectangle(0, 0, e, e));
    }
  }
  return c;
};
mxGraph.prototype.resizeCell = function(a, b, c) {
  return this.resizeCells([a], [b], c)[0];
};
mxGraph.prototype.resizeCells = function(a, b, c) {
  c = null != c ? c : this.isRecursiveResize();
  this.model.beginUpdate();
  try {
    var d = this.cellsResized(a, b, c);
    this.fireEvent(new mxEventObject(mxEvent.RESIZE_CELLS, 'cells', a, 'bounds', b, 'previous', d));
  } finally {
    this.model.endUpdate();
  }
  return a;
};
mxGraph.prototype.cellsResized = function(a, b, c) {
  c = null != c ? c : !1;
  var d = [];
  if (null != a && null != b && a.length == b.length) {
    this.model.beginUpdate();
    try {
      for (var e = 0; e < a.length; e++)
        d.push(this.cellResized(a[e], b[e], !1, c)), this.isExtendParent(a[e]) && this.extendParent(a[e]), this.constrainChild(a[e]);
      this.resetEdgesOnResize && this.resetEdges(a);
      this.fireEvent(new mxEventObject(mxEvent.CELLS_RESIZED, 'cells', a, 'bounds', b, 'previous', d));
    } finally {
      this.model.endUpdate();
    }
  }
  return d;
};
mxGraph.prototype.cellResized = function(a, b, c, d) {
  var e = this.model.getGeometry(a);
  if (null != e && (e.x != b.x || e.y != b.y || e.width != b.width || e.height != b.height)) {
    var f = e.clone();
    !c && f.relative ? (c = f.offset, null != c && (c.x += b.x - f.x, c.y += b.y - f.y)) : (f.x = b.x, f.y = b.y);
    f.width = b.width;
    f.height = b.height;
    f.relative || !this.model.isVertex(a) || this.isAllowNegativeCoordinates() || (f.x = Math.max(0, f.x), f.y = Math.max(0, f.y));
    this.model.beginUpdate();
    try {
      d && this.resizeChildCells(a, f), this.model.setGeometry(a, f), this.constrainChildCells(a);
    } finally {
      this.model.endUpdate();
    }
  }
  return e;
};
mxGraph.prototype.resizeChildCells = function(a, b) {
  var c = this.model.getGeometry(a),
    d = 0 != c.width ? b.width / c.width : 1;
  b = 0 != c.height ? b.height / c.height : 1;
  c = this.model.getChildCount(a);
  for (var e = 0; e < c; e++)
    this.scaleCell(this.model.getChildAt(a, e), d, b, !0);
};
mxGraph.prototype.constrainChildCells = function(a) {
  for (var b = this.model.getChildCount(a), c = 0; c < b; c++)
    this.constrainChild(this.model.getChildAt(a, c));
};
mxGraph.prototype.scaleCell = function(a, b, c, d) {
  var e = this.model.getGeometry(a);
  if (null != e) {
    var f = this.getCurrentCellStyle(a);
    e = e.clone();
    var g = e.x,
      k = e.y,
      l = e.width,
      m = e.height;
    e.scale(b, c, 'fixed' == f[mxConstants.STYLE_ASPECT]);
    '1' == f[mxConstants.STYLE_RESIZE_WIDTH] ? e.width = l * b : '0' == f[mxConstants.STYLE_RESIZE_WIDTH] && (e.width = l);
    '1' == f[mxConstants.STYLE_RESIZE_HEIGHT] ? e.height = m * c : '0' == f[mxConstants.STYLE_RESIZE_HEIGHT] && (e.height = m);
    this.isCellMovable(a) || (e.x = g, e.y = k);
    this.isCellResizable(a) || (e.width = l, e.height = m);
    this.model.isVertex(a) ? this.cellResized(a, e, !0, d) : this.model.setGeometry(a, e);
  }
};
mxGraph.prototype.extendParent = function(a) {
  if (null != a) {
    var b = this.model.getParent(a),
      c = this.getCellGeometry(b);
    null == b || null == c || this.isCellCollapsed(b) || (a = this.getCellGeometry(a), null != a && !a.relative && (c.width < a.x + a.width || c.height < a.y + a.height) && (c = c.clone(), c.width = Math.max(c.width, a.x + a.width), c.height = Math.max(c.height, a.y + a.height), this.cellsResized([b], [c], !1)));
  }
};
mxGraph.prototype.importCells = function(a, b, c, d, e, f) {
  return this.moveCells(a, b, c, !0, d, e, f);
};
mxGraph.prototype.moveCells = function(a, b, c, d, e, f, g) {
  b = null != b ? b : 0;
  c = null != c ? c : 0;
  d = null != d ? d : !1;
  if (null != a && (0 != b || 0 != c || d || null != e)) {
    var k = a = this.model.getTopmostCells(a);
    this.model.beginUpdate();
    try {
      for (var l = new mxDictionary(), m = 0; m < a.length; m++)
        l.put(a[m], !0);
      var n = mxUtils.bind(this, function(x) {
          for (; null != x;) {
            if (l.get(x))
              return !0;
            x = this.model.getParent(x);
          }
          return !1;
        }),
        p = [];
      for (m = 0; m < a.length; m++) {
        var r = this.getCellGeometry(a[m]),
          q = this.model.getParent(a[m]);
        null != r && r.relative && this.model.isEdge(q) && (n(this.model.getTerminal(q, !0)) || n(this.model.getTerminal(q, !1))) || p.push(a[m]);
      }
      a = p;
      d && (a = this.cloneCells(a, this.isCloneInvalidEdges(), g), null == e && (e = this.getDefaultParent()));
      var t = this.isAllowNegativeCoordinates();
      null != e && this.setAllowNegativeCoordinates(!0);
      this.cellsMoved(a, b, c, !d && this.isDisconnectOnMove() && this.isAllowDanglingEdges(), null == e, this.isExtendParentsOnMove() && null == e);
      this.setAllowNegativeCoordinates(t);
      if (null != e) {
        var u = this.model.getChildCount(e);
        this.cellsAdded(a, e, u, null, null, !0);
        if (d)
          for (m = 0; m < a.length; m++)
            r = this.getCellGeometry(a[m]), q = this.model.getParent(k[m]), null != r && r.relative && this.model.isEdge(q) && this.model.contains(q) && this.model.add(q, a[m]);
      }
      this.fireEvent(new mxEventObject(mxEvent.MOVE_CELLS, 'cells', a, 'dx', b, 'dy', c, 'clone', d, 'target', e, 'event', f));
    } finally {
      this.model.endUpdate();
    }
  }
  return a;
};
mxGraph.prototype.cellsMoved = function(a, b, c, d, e, f) {
  if (null != a && (0 != b || 0 != c)) {
    f = null != f ? f : !1;
    this.model.beginUpdate();
    try {
      d && this.disconnectGraph(a);
      for (var g = 0; g < a.length; g++)
        this.translateCell(a[g], b, c), f && this.isExtendParent(a[g]) ? this.extendParent(a[g]) : e && this.constrainChild(a[g]);
      this.resetEdgesOnMove && this.resetEdges(a);
      this.fireEvent(new mxEventObject(mxEvent.CELLS_MOVED, 'cells', a, 'dx', b, 'dy', c, 'disconnect', d));
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.translateCell = function(a, b, c) {
  var d = this.model.getGeometry(a);
  if (null != d) {
    b = parseFloat(b);
    c = parseFloat(c);
    d = d.clone();
    d.translate(b, c);
    d.relative || !this.model.isVertex(a) || this.isAllowNegativeCoordinates() || (d.x = Math.max(0, parseFloat(d.x)), d.y = Math.max(0, parseFloat(d.y)));
    if (d.relative && !this.model.isEdge(a)) {
      var e = this.model.getParent(a),
        f = 0;
      this.model.isVertex(e) && (e = this.getCurrentCellStyle(e), f = mxUtils.getValue(e, mxConstants.STYLE_ROTATION, 0));
      0 != f && (f = mxUtils.toRadians(-f), e = Math.cos(f), f = Math.sin(f), c = mxUtils.getRotatedPoint(new mxPoint(b, c), e, f, new mxPoint(0, 0)), b = c.x, c = c.y);
      null == d.offset ? d.offset = new mxPoint(Math.round(b), Math.round(c)) : (d.offset.x = Math.round(parseFloat(d.offset.x + b)), d.offset.y = Math.round(parseFloat(d.offset.y + c)));
    }
    this.model.setGeometry(a, d);
  }
};
mxGraph.prototype.getCellContainmentArea = function(a) {
  if (null != a && !this.model.isEdge(a)) {
    var b = this.model.getParent(a);
    if (null != b && b != this.getDefaultParent()) {
      var c = this.model.getGeometry(b);
      if (null != c) {
        var d = a = 0,
          e = c.width;
        c = c.height;
        if (this.isSwimlane(b)) {
          var f = this.getStartSize(b),
            g = this.getCurrentCellStyle(b);
          b = mxUtils.getValue(g, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST);
          var k = 1 == mxUtils.getValue(g, mxConstants.STYLE_FLIPH, 0);
          g = 1 == mxUtils.getValue(g, mxConstants.STYLE_FLIPV, 0);
          if (b == mxConstants.DIRECTION_SOUTH || b == mxConstants.DIRECTION_NORTH) {
            var l = f.width;
            f.width = f.height;
            f.height = l;
          }
          if (b == mxConstants.DIRECTION_EAST && !g || b == mxConstants.DIRECTION_NORTH && !k || b == mxConstants.DIRECTION_WEST && g || b == mxConstants.DIRECTION_SOUTH && k)
            a = f.width, d = f.height;
          e -= f.width;
          c -= f.height;
        }
        return new mxRectangle(a, d, e, c);
      }
    }
  }
  return null;
};
mxGraph.prototype.getMaximumGraphBounds = function() {
  return this.maximumGraphBounds;
};
mxGraph.prototype.constrainChild = function(a, b) {
  if (null != a && (b = this.getCellGeometry(a), null != b && (this.isConstrainRelativeChildren() || !b.relative))) {
    var c = this.model.getParent(a);
    this.getCellGeometry(c);
    var d = this.getMaximumGraphBounds();
    null != d && (c = this.getBoundingBoxFromGeometry([c], !1), null != c && (d = mxRectangle.fromRectangle(d), d.x -= c.x, d.y -= c.y));
    if (this.isConstrainChild(a) && (c = this.getCellContainmentArea(a), null != c)) {
      var e = this.getOverlap(a);
      0 < e && (c = mxRectangle.fromRectangle(c), c.x -= c.width * e, c.y -= c.height * e, c.width += 2 * c.width * e, c.height += 2 * c.height * e);
      null == d ? d = c : (d = mxRectangle.fromRectangle(d), d.intersect(c));
    }
    if (null != d) {
      c = [a];
      if (!this.isCellCollapsed(a)) {
        e = this.model.getDescendants(a);
        for (var f = 0; f < e.length; f++)
          this.isCellVisible(e[f]) && c.push(e[f]);
      }
      c = this.getBoundingBoxFromGeometry(c, !1);
      if (null != c) {
        b = b.clone();
        e = 0;
        b.width > d.width && (e = b.width - d.width, b.width -= e);
        c.x + c.width > d.x + d.width && (e -= c.x + c.width - d.x - d.width - e);
        f = 0;
        b.height > d.height && (f = b.height - d.height, b.height -= f);
        c.y + c.height > d.y + d.height && (f -= c.y + c.height - d.y - d.height - f);
        c.x < d.x && (e -= c.x - d.x);
        c.y < d.y && (f -= c.y - d.y);
        if (0 != e || 0 != f)
          b.relative ? (null == b.offset && (b.offset = new mxPoint()), b.offset.x += e, b.offset.y += f) : (b.x += e, b.y += f);
        this.model.setGeometry(a, b);
      }
    }
  }
};
mxGraph.prototype.resetEdges = function(a) {
  if (null != a) {
    for (var b = new mxDictionary(), c = 0; c < a.length; c++)
      b.put(a[c], !0);
    this.model.beginUpdate();
    try {
      for (c = 0; c < a.length; c++) {
        var d = this.model.getEdges(a[c]);
        if (null != d)
          for (var e = 0; e < d.length; e++) {
            var f = this.view.getState(d[e]),
              g = null != f ? f.getVisibleTerminal(!0) : this.view.getVisibleTerminal(d[e], !0),
              k = null != f ? f.getVisibleTerminal(!1) : this.view.getVisibleTerminal(d[e], !1);
            b.get(g) && b.get(k) || this.resetEdge(d[e]);
          }
        this.resetEdges(this.model.getChildren(a[c]));
      }
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.resetEdge = function(a) {
  var b = this.model.getGeometry(a);
  null != b && null != b.points && 0 < b.points.length && (b = b.clone(), b.points = [], this.model.setGeometry(a, b));
  return a;
};
mxGraph.prototype.getOutlineConstraint = function(a, b, c) {
  if (null != b.shape) {
    c = this.view.getPerimeterBounds(b);
    var d = b.style[mxConstants.STYLE_DIRECTION];
    if (d == mxConstants.DIRECTION_NORTH || d == mxConstants.DIRECTION_SOUTH) {
      c.x += c.width / 2 - c.height / 2;
      c.y += c.height / 2 - c.width / 2;
      var e = c.width;
      c.width = c.height;
      c.height = e;
    }
    var f = mxUtils.toRadians(b.shape.getShapeRotation());
    if (0 != f) {
      e = Math.cos(-f);
      f = Math.sin(-f);
      var g = new mxPoint(c.getCenterX(), c.getCenterY());
      a = mxUtils.getRotatedPoint(a, e, f, g);
    }
    g = f = 1;
    var k = 0,
      l = 0;
    if (this.getModel().isVertex(b.cell)) {
      var m = b.style[mxConstants.STYLE_FLIPH],
        n = b.style[mxConstants.STYLE_FLIPV];
      null != b.shape && null != b.shape.stencil && (m = 1 == mxUtils.getValue(b.style, 'stencilFlipH', 0) || m, n = 1 == mxUtils.getValue(b.style, 'stencilFlipV', 0) || n);
      if (d == mxConstants.DIRECTION_NORTH || d == mxConstants.DIRECTION_SOUTH)
        e = m, m = n, n = e;
      m && (f = -1, k = -c.width);
      n && (g = -1, l = -c.height);
    }
    a = new mxPoint((a.x - c.x) * f - k + c.x, (a.y - c.y) * g - l + c.y);
    return new mxConnectionConstraint(new mxPoint(0 == c.width ? 0 : Math.round(1000 * (a.x - c.x) / c.width) / 1000, 0 == c.height ? 0 : Math.round(1000 * (a.y - c.y) / c.height) / 1000), !1);
  }
  return null;
};
mxGraph.prototype.getAllConnectionConstraints = function(a, b) {
  return null != a && null != a.shape && null != a.shape.stencil ? a.shape.stencil.constraints : null;
};
mxGraph.prototype.getConnectionConstraint = function(a, b, c) {
  b = null;
  var d = a.style[c ? mxConstants.STYLE_EXIT_X : mxConstants.STYLE_ENTRY_X];
  if (null != d) {
    var e = a.style[c ? mxConstants.STYLE_EXIT_Y : mxConstants.STYLE_ENTRY_Y];
    null != e && (b = new mxPoint(parseFloat(d), parseFloat(e)));
  }
  d = !1;
  var f = e = 0;
  null != b && (d = mxUtils.getValue(a.style, c ? mxConstants.STYLE_EXIT_PERIMETER : mxConstants.STYLE_ENTRY_PERIMETER, !0), e = parseFloat(a.style[c ? mxConstants.STYLE_EXIT_DX : mxConstants.STYLE_ENTRY_DX]), f = parseFloat(a.style[c ? mxConstants.STYLE_EXIT_DY : mxConstants.STYLE_ENTRY_DY]), e = isFinite(e) ? e : 0, f = isFinite(f) ? f : 0);
  return new mxConnectionConstraint(b, d, null, e, f);
};
mxGraph.prototype.setConnectionConstraint = function(a, b, c, d) {
  if (null != d) {
    this.model.beginUpdate();
    try {
      null == d || null == d.point ? (this.setCellStyles(c ? mxConstants.STYLE_EXIT_X : mxConstants.STYLE_ENTRY_X, null, [a]), this.setCellStyles(c ? mxConstants.STYLE_EXIT_Y : mxConstants.STYLE_ENTRY_Y, null, [a]), this.setCellStyles(c ? mxConstants.STYLE_EXIT_DX : mxConstants.STYLE_ENTRY_DX, null, [a]), this.setCellStyles(c ? mxConstants.STYLE_EXIT_DY : mxConstants.STYLE_ENTRY_DY, null, [a]), this.setCellStyles(c ? mxConstants.STYLE_EXIT_PERIMETER : mxConstants.STYLE_ENTRY_PERIMETER, null, [a])) : null != d.point && (this.setCellStyles(c ? mxConstants.STYLE_EXIT_X : mxConstants.STYLE_ENTRY_X, d.point.x, [a]), this.setCellStyles(c ? mxConstants.STYLE_EXIT_Y : mxConstants.STYLE_ENTRY_Y, d.point.y, [a]), this.setCellStyles(c ? mxConstants.STYLE_EXIT_DX : mxConstants.STYLE_ENTRY_DX, d.dx, [a]), this.setCellStyles(c ? mxConstants.STYLE_EXIT_DY : mxConstants.STYLE_ENTRY_DY, d.dy, [a]), d.perimeter ? this.setCellStyles(c ? mxConstants.STYLE_EXIT_PERIMETER : mxConstants.STYLE_ENTRY_PERIMETER, null, [a]) : this.setCellStyles(c ? mxConstants.STYLE_EXIT_PERIMETER : mxConstants.STYLE_ENTRY_PERIMETER, '0', [a]));
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.getConnectionPoint = function(a, b, c) {
  c = null != c ? c : !0;
  var d = null;
  if (null != a && null != b.point) {
    var e = this.view.getPerimeterBounds(a),
      f = new mxPoint(e.getCenterX(), e.getCenterY()),
      g = a.style[mxConstants.STYLE_DIRECTION],
      k = 0;
    null != g && 1 == mxUtils.getValue(a.style, mxConstants.STYLE_ANCHOR_POINT_DIRECTION, 1) && (g == mxConstants.DIRECTION_NORTH ? k += 270 : g == mxConstants.DIRECTION_WEST ? k += 180 : g == mxConstants.DIRECTION_SOUTH && (k += 90), g != mxConstants.DIRECTION_NORTH && g != mxConstants.DIRECTION_SOUTH || e.rotate90());
    d = this.view.scale;
    d = new mxPoint(e.x + b.point.x * e.width + b.dx * d, e.y + b.point.y * e.height + b.dy * d);
    var l = a.style[mxConstants.STYLE_ROTATION] || 0;
    if (b.perimeter)
      0 != k && (g = e = 0, 90 == k ? g = 1 : 180 == k ? e = -1 : 270 == k && (g = -1), d = mxUtils.getRotatedPoint(d, e, g, f)), d = this.view.getPerimeterPoint(a, d, !1);
    else if (l += k, this.getModel().isVertex(a.cell)) {
      k = 1 == a.style[mxConstants.STYLE_FLIPH];
      b = 1 == a.style[mxConstants.STYLE_FLIPV];
      null != a.shape && null != a.shape.stencil && (k = 1 == mxUtils.getValue(a.style, 'stencilFlipH', 0) || k, b = 1 == mxUtils.getValue(a.style, 'stencilFlipV', 0) || b);
      if (g == mxConstants.DIRECTION_NORTH || g == mxConstants.DIRECTION_SOUTH)
        a = k, k = b, b = a;
      k && (d.x = 2 * e.getCenterX() - d.x);
      b && (d.y = 2 * e.getCenterY() - d.y);
    }
    0 != l && null != d && (a = mxUtils.toRadians(l), e = Math.cos(a), g = Math.sin(a), d = mxUtils.getRotatedPoint(d, e, g, f));
  }
  c && null != d && (d.x = Math.round(d.x), d.y = Math.round(d.y));
  return d;
};
mxGraph.prototype.connectCell = function(a, b, c, d) {
  this.model.beginUpdate();
  try {
    var e = this.model.getTerminal(a, c);
    this.cellConnected(a, b, c, d);
    this.fireEvent(new mxEventObject(mxEvent.CONNECT_CELL, 'edge', a, 'terminal', b, 'source', c, 'previous', e));
  } finally {
    this.model.endUpdate();
  }
  return a;
};
mxGraph.prototype.cellConnected = function(a, b, c, d) {
  if (null != a) {
    this.model.beginUpdate();
    try {
      var e = this.model.getTerminal(a, c);
      this.setConnectionConstraint(a, b, c, d);
      this.isPortsEnabled() && (d = null, this.isPort(b) && (d = b.getId(), b = this.getTerminalForPort(b, c)), this.setCellStyles(c ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT, d, [a]));
      this.model.setTerminal(a, b, c);
      this.resetEdgesOnConnect && this.resetEdge(a);
      this.fireEvent(new mxEventObject(mxEvent.CELL_CONNECTED, 'edge', a, 'terminal', b, 'source', c, 'previous', e));
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.disconnectGraph = function(a) {
  if (null != a) {
    this.model.beginUpdate();
    try {
      for (var b = this.view.scale, c = this.view.translate, d = new mxDictionary(), e = 0; e < a.length; e++)
        d.put(a[e], !0);
      for (e = 0; e < a.length; e++)
        if (this.model.isEdge(a[e])) {
          var f = this.model.getGeometry(a[e]);
          if (null != f) {
            var g = this.view.getState(a[e]),
              k = this.view.getState(this.model.getParent(a[e]));
            if (null != g && null != k) {
              f = f.clone();
              var l = -k.origin.x,
                m = -k.origin.y,
                n = g.absolutePoints,
                p = this.model.getTerminal(a[e], !0);
              if (null != p && this.isCellDisconnectable(a[e], p, !0)) {
                for (; null != p && !d.get(p);)
                  p = this.model.getParent(p);
                null == p && (f.setTerminalPoint(new mxPoint(n[0].x / b - c.x + l, n[0].y / b - c.y + m), !0), this.model.setTerminal(a[e], null, !0));
              }
              var r = this.model.getTerminal(a[e], !1);
              if (null != r && this.isCellDisconnectable(a[e], r, !1)) {
                for (; null != r && !d.get(r);)
                  r = this.model.getParent(r);
                if (null == r) {
                  var q = n.length - 1;
                  f.setTerminalPoint(new mxPoint(n[q].x / b - c.x + l, n[q].y / b - c.y + m), !1);
                  this.model.setTerminal(a[e], null, !1);
                }
              }
              this.model.setGeometry(a[e], f);
            }
          }
        }
    } finally {
      this.model.endUpdate();
    }
  }
};
mxGraph.prototype.getCurrentRoot = function() {
  return this.view.currentRoot;
};
mxGraph.prototype.getTranslateForRoot = function(a) {
  return null;
};
mxGraph.prototype.isPort = function(a) {
  return !1;
};
mxGraph.prototype.getTerminalForPort = function(a, b) {
  return this.model.getParent(a);
};
mxGraph.prototype.getChildOffsetForCell = function(a) {
  return null;
};
mxGraph.prototype.enterGroup = function(a) {
  a = a || this.getSelectionCell();
  null != a && this.isValidRoot(a) && (this.view.setCurrentRoot(a), this.clearSelection());
};
mxGraph.prototype.exitGroup = function() {
  var a = this.model.getRoot(),
    b = this.getCurrentRoot();
  if (null != b) {
    for (var c = this.model.getParent(b); c != a && !this.isValidRoot(c) && this.model.getParent(c) != a;)
      c = this.model.getParent(c);
    c == a || this.model.getParent(c) == a ? this.view.setCurrentRoot(null) : this.view.setCurrentRoot(c);
    null != this.view.getState(b) && this.setSelectionCell(b);
  }
};
mxGraph.prototype.home = function() {
  var a = this.getCurrentRoot();
  null != a && (this.view.setCurrentRoot(null), null != this.view.getState(a) && this.setSelectionCell(a));
};
mxGraph.prototype.isValidRoot = function(a) {
  return null != a;
};
mxGraph.prototype.getGraphBounds = function() {
  return this.view.getGraphBounds();
};
mxGraph.prototype.getCellBounds = function(a, b, c) {
  var d = [a];
  b && (d = d.concat(this.model.getEdges(a)));
  d = this.view.getBounds(d);
  if (c) {
    c = this.model.getChildCount(a);
    for (var e = 0; e < c; e++) {
      var f = this.getCellBounds(this.model.getChildAt(a, e), b, !0);
      null != d ? d.add(f) : d = f;
    }
  }
  return d;
};
mxGraph.prototype.getBoundingBoxFromGeometry = function(a, b) {
  b = null != b ? b : !1;
  var c = null;
  if (null != a)
    for (var d = 0; d < a.length; d++)
      if (b || this.model.isVertex(a[d])) {
        var e = this.getCellGeometry(a[d]);
        if (null != e) {
          var f = null;
          if (this.model.isEdge(a[d])) {
            f = function(l) {
              null != l && (null == g ? g = new mxRectangle(l.x, l.y, 0, 0) : g.add(new mxRectangle(l.x, l.y, 0, 0)));
            };
            null == this.model.getTerminal(a[d], !0) && f(e.getTerminalPoint(!0));
            null == this.model.getTerminal(a[d], !1) && f(e.getTerminalPoint(!1));
            e = e.points;
            if (null != e && 0 < e.length)
              for (var g = new mxRectangle(e[0].x, e[0].y, 0, 0), k = 1; k < e.length; k++)
                f(e[k]);
            f = g;
          } else
            k = this.model.getParent(a[d]), e.relative ? this.model.isVertex(k) && k != this.view.currentRoot && (g = this.getBoundingBoxFromGeometry([k], !1), null != g && (f = new mxRectangle(e.x * g.width, e.y * g.height, e.width, e.height), 0 <= mxUtils.indexOf(a, k) && (f.x += g.x, f.y += g.y))) : (f = mxRectangle.fromRectangle(e), this.model.isVertex(k) && 0 <= mxUtils.indexOf(a, k) && (g = this.getBoundingBoxFromGeometry([k], !1), null != g && (f.x += g.x, f.y += g.y))), null != f && null != e.offset && (f.x += e.offset.x, f.y += e.offset.y), e = this.getCurrentCellStyle(a[d]), null != f && (e = mxUtils.getValue(e, mxConstants.STYLE_ROTATION, 0), 0 != e && (f = mxUtils.getBoundingBox(f, e)));
          null != f && (null == c ? c = mxRectangle.fromRectangle(f) : c.add(f));
        }
      }
  return c;
};
mxGraph.prototype.refresh = function(a) {
  this.view.clear(a, null == a);
  this.view.validate();
  this.sizeDidChange();
  this.fireEvent(new mxEventObject(mxEvent.REFRESH));
};
mxGraph.prototype.snap = function(a) {
  this.gridEnabled && (a = Math.round(a / this.gridSize) * this.gridSize);
  return a;
};
mxGraph.prototype.snapDelta = function(a, b, c, d, e) {
  var f = this.view.translate,
    g = this.view.scale;
  !c && this.gridEnabled ? (c = this.gridSize * g * 0.5, d || (d = b.x - (this.snap(b.x / g - f.x) + f.x) * g, a.x = Math.abs(a.x - d) < c ? 0 : this.snap(a.x / g) * g - d), e || (b = b.y - (this.snap(b.y / g - f.y) + f.y) * g, a.y = Math.abs(a.y - b) < c ? 0 : this.snap(a.y / g) * g - b)) : (c = 0.5 * g, d || (d = b.x - (Math.round(b.x / g - f.x) + f.x) * g, a.x = Math.abs(a.x - d) < c ? 0 : Math.round(a.x / g) * g - d), e || (b = b.y - (Math.round(b.y / g - f.y) + f.y) * g, a.y = Math.abs(a.y - b) < c ? 0 : Math.round(a.y / g) * g - b));
  return a;
};
mxGraph.prototype.panGraph = function(a, b) {
  if (this.useScrollbarsForPanning && mxUtils.hasScrollbars(this.container))
    this.container.scrollLeft = -a, this.container.scrollTop = -b;
  else {
    var c = this.view.getCanvas();
    if (this.dialect == mxConstants.DIALECT_SVG)
      if (0 == a && 0 == b) {
        if (mxClient.IS_IE ? c.setAttribute('transform', 'translate(' + a + ',' + b + ')') : c.removeAttribute('transform'), null != this.shiftPreview1) {
          for (var d = this.shiftPreview1.firstChild; null != d;) {
            var e = d.nextSibling;
            this.container.appendChild(d);
            d = e;
          }
          null != this.shiftPreview1.parentNode && this.shiftPreview1.parentNode.removeChild(this.shiftPreview1);
          this.shiftPreview1 = null;
          this.container.appendChild(c.parentNode);
          for (d = this.shiftPreview2.firstChild; null != d;)
            e = d.nextSibling, this.container.appendChild(d), d = e;
          null != this.shiftPreview2.parentNode && this.shiftPreview2.parentNode.removeChild(this.shiftPreview2);
          this.shiftPreview2 = null;
        }
      } else {
        c.setAttribute('transform', 'translate(' + a + ',' + b + ')');
        if (null == this.shiftPreview1) {
          this.shiftPreview1 = document.createElement('div');
          this.shiftPreview1.style.position = 'absolute';
          this.shiftPreview1.style.overflow = 'visible';
          this.shiftPreview2 = document.createElement('div');
          this.shiftPreview2.style.position = 'absolute';
          this.shiftPreview2.style.overflow = 'visible';
          var f = this.shiftPreview1;
          for (d = this.container.firstChild; null != d;)
            e = d.nextSibling, d != c.parentNode ? f.appendChild(d) : f = this.shiftPreview2, d = e;
          null != this.shiftPreview1.firstChild && this.container.insertBefore(this.shiftPreview1, c.parentNode);
          null != this.shiftPreview2.firstChild && this.container.appendChild(this.shiftPreview2);
        }
        this.shiftPreview1.style.left = a + 'px';
        this.shiftPreview1.style.top = b + 'px';
        this.shiftPreview2.style.left = a + 'px';
        this.shiftPreview2.style.top = b + 'px';
      }
    else
      c.style.left = a + 'px', c.style.top = b + 'px';
    this.panDx = a;
    this.panDy = b;
    this.fireEvent(new mxEventObject(mxEvent.PAN));
  }
};
mxGraph.prototype.zoomIn = function() {
  this.zoom(this.zoomFactor);
};
mxGraph.prototype.zoomOut = function() {
  this.zoom(1 / this.zoomFactor);
};
mxGraph.prototype.zoomActual = function() {
  1 == this.view.scale ? this.view.setTranslate(0, 0) : (this.view.translate.x = 0, this.view.translate.y = 0, this.view.setScale(1));
};
mxGraph.prototype.zoomTo = function(a, b) {
  this.zoom(a / this.view.scale, b);
};
mxGraph.prototype.center = function(a, b, c, d) {
  a = null != a ? a : !0;
  b = null != b ? b : !0;
  c = null != c ? c : 0.5;
  d = null != d ? d : 0.5;
  var e = mxUtils.hasScrollbars(this.container),
    f = 2 * this.getBorder(),
    g = this.container.clientWidth - f;
  f = this.container.clientHeight - f;
  var k = this.getGraphBounds(),
    l = this.view.translate,
    m = this.view.scale,
    n = a ? g - k.width : 0,
    p = b ? f - k.height : 0;
  e ? (k.x -= l.x, k.y -= l.y, a = this.container.scrollWidth, b = this.container.scrollHeight, a > g && (n = 0), b > f && (p = 0), this.view.setTranslate(Math.floor(n / 2 - k.x), Math.floor(p / 2 - k.y)), this.container.scrollLeft = (a - g) / 2, this.container.scrollTop = (b - f) / 2) : this.view.setTranslate(a ? Math.floor(l.x - k.x / m + n * c / m) : l.x, b ? Math.floor(l.y - k.y / m + p * d / m) : l.y);
};
mxGraph.prototype.zoom = function(a, b, c) {
  b = null != b ? b : this.centerZoom;
  var d = Math.round(this.view.scale * a * 100) / 100;
  null != c && (d = Math.round(d * c) / c);
  c = this.view.getState(this.getSelectionCell());
  a = d / this.view.scale;
  if (this.keepSelectionVisibleOnZoom && null != c)
    a = new mxRectangle(c.x * a, c.y * a, c.width * a, c.height * a), this.view.scale = d, this.scrollRectToVisible(a) || (this.view.revalidate(), this.view.setScale(d));
  else if (c = mxUtils.hasScrollbars(this.container), b && !c) {
    c = this.container.offsetWidth;
    var e = this.container.offsetHeight;
    1 < a ? (a = (a - 1) / (2 * d), c *= -a, e *= -a) : (a = (1 / a - 1) / (2 * this.view.scale), c *= a, e *= a);
    this.view.scaleAndTranslate(d, this.view.translate.x + c, this.view.translate.y + e);
  } else {
    var f = this.view.translate.x,
      g = this.view.translate.y,
      k = this.container.scrollLeft,
      l = this.container.scrollTop;
    this.view.setScale(d);
    c && (e = c = 0, b && (c = this.container.offsetWidth * (a - 1) / 2, e = this.container.offsetHeight * (a - 1) / 2), this.container.scrollLeft = (this.view.translate.x - f) * this.view.scale + Math.round(k * a + c), this.container.scrollTop = (this.view.translate.y - g) * this.view.scale + Math.round(l * a + e));
  }
};
mxGraph.prototype.zoomToRect = function(a) {
  var b = this.container.clientWidth / a.width / (this.container.clientHeight / a.height);
  a.x = Math.max(0, a.x);
  a.y = Math.max(0, a.y);
  var c = Math.min(this.container.scrollWidth, a.x + a.width),
    d = Math.min(this.container.scrollHeight, a.y + a.height);
  a.width = c - a.x;
  a.height = d - a.y;
  1 > b ? (b = a.height / b, c = (b - a.height) / 2, a.height = b, a.y -= Math.min(a.y, c), d = Math.min(this.container.scrollHeight, a.y + a.height), a.height = d - a.y) : (b *= a.width, c = (b - a.width) / 2, a.width = b, a.x -= Math.min(a.x, c), c = Math.min(this.container.scrollWidth, a.x + a.width), a.width = c - a.x);
  b = this.container.clientWidth / a.width;
  c = this.view.scale * b;
  mxUtils.hasScrollbars(this.container) ? (this.view.setScale(c), this.container.scrollLeft = Math.round(a.x * b), this.container.scrollTop = Math.round(a.y * b)) : this.view.scaleAndTranslate(c, this.view.translate.x - a.x / this.view.scale, this.view.translate.y - a.y / this.view.scale);
};
mxGraph.prototype.scrollCellToVisible = function(a, b) {
  var c = -this.view.translate.x,
    d = -this.view.translate.y;
  a = this.view.getState(a);
  null != a && (c = new mxRectangle(c + a.x, d + a.y, a.width, a.height), b && null != this.container && (b = this.container.clientWidth, d = this.container.clientHeight, c.x = c.getCenterX() - b / 2, c.width = b, c.y = c.getCenterY() - d / 2, c.height = d), b = new mxPoint(this.view.translate.x, this.view.translate.y), this.scrollRectToVisible(c) && (c = new mxPoint(this.view.translate.x, this.view.translate.y), this.view.translate.x = b.x, this.view.translate.y = b.y, this.view.setTranslate(c.x, c.y)));
};
mxGraph.prototype.scrollRectToVisible = function(a) {
  var b = !1;
  if (null != a) {
    var c = this.container.offsetWidth,
      d = this.container.offsetHeight,
      e = Math.min(c, a.width),
      f = Math.min(d, a.height);
    if (mxUtils.hasScrollbars(this.container)) {
      c = this.container;
      a.x += this.view.translate.x;
      a.y += this.view.translate.y;
      var g = c.scrollLeft - a.x;
      d = Math.max(g - c.scrollLeft, 0);
      0 < g ? c.scrollLeft -= g + 2 : (g = a.x + e - c.scrollLeft - c.clientWidth, 0 < g && (c.scrollLeft += g + 2));
      e = c.scrollTop - a.y;
      g = Math.max(0, e - c.scrollTop);
      0 < e ? c.scrollTop -= e + 2 : (e = a.y + f - c.scrollTop - c.clientHeight, 0 < e && (c.scrollTop += e + 2));
      this.useScrollbarsForPanning || 0 == d && 0 == g || this.view.setTranslate(d, g);
    } else {
      g = -this.view.translate.x;
      var k = -this.view.translate.y,
        l = this.view.scale;
      a.x + e > g + c && (this.view.translate.x -= (a.x + e - c - g) / l, b = !0);
      a.y + f > k + d && (this.view.translate.y -= (a.y + f - d - k) / l, b = !0);
      a.x < g && (this.view.translate.x += (g - a.x) / l, b = !0);
      a.y < k && (this.view.translate.y += (k - a.y) / l, b = !0);
      b && (this.view.refresh(), null != this.selectionCellsHandler && this.selectionCellsHandler.refresh());
    }
  }
  return b;
};
mxGraph.prototype.getCellGeometry = function(a) {
  return this.model.getGeometry(a);
};
mxGraph.prototype.isCellVisible = function(a) {
  return this.model.isVisible(a);
};
mxGraph.prototype.isCellCollapsed = function(a) {
  return this.model.isCollapsed(a);
};
mxGraph.prototype.isCellConnectable = function(a) {
  return this.model.isConnectable(a);
};
mxGraph.prototype.isOrthogonal = function(a) {
  var b = a.style[mxConstants.STYLE_ORTHOGONAL];
  if (null != b)
    return b;
  a = this.view.getEdgeStyle(a);
  return a == mxEdgeStyle.SegmentConnector || a == mxEdgeStyle.ElbowConnector || a == mxEdgeStyle.SideToSide || a == mxEdgeStyle.TopToBottom || a == mxEdgeStyle.EntityRelation || a == mxEdgeStyle.OrthConnector;
};
mxGraph.prototype.isLoop = function(a) {
  var b = a.getVisibleTerminalState(!0);
  a = a.getVisibleTerminalState(!1);
  return null != b && b == a;
};
mxGraph.prototype.isCloneEvent = function(a) {
  return mxEvent.isControlDown(a);
};
mxGraph.prototype.isTransparentClickEvent = function(a) {
  return !1;
};
mxGraph.prototype.isToggleEvent = function(a) {
  return mxClient.IS_MAC ? mxEvent.isMetaDown(a) : mxEvent.isControlDown(a);
};
mxGraph.prototype.isGridEnabledEvent = function(a) {
  return null != a && !mxEvent.isAltDown(a);
};
mxGraph.prototype.isConstrainedEvent = function(a) {
  return mxEvent.isShiftDown(a);
};
mxGraph.prototype.isIgnoreTerminalEvent = function(a) {
  return !1;
};
mxGraph.prototype.validationAlert = function(a) {
  mxUtils.alert(a);
};
mxGraph.prototype.isEdgeValid = function(a, b, c) {
  return null == this.getEdgeValidationError(a, b, c);
};
mxGraph.prototype.getEdgeValidationError = function(a, b, c) {
  if (null != a && !this.isAllowDanglingEdges() && (null == b || null == c))
    return '';
  if (null != a && null == this.model.getTerminal(a, !0) && null == this.model.getTerminal(a, !1))
    return null;
  if (!this.allowLoops && b == c && null != b || !this.isValidConnection(b, c))
    return '';
  if (null != b && null != c) {
    var d = '';
    if (!this.multigraph) {
      var e = this.model.getEdgesBetween(b, c, !0);
      if (1 < e.length || 1 == e.length && e[0] != a)
        d += (mxResources.get(this.alreadyConnectedResource) || this.alreadyConnectedResource) + '\n';
    }
    e = this.model.getDirectedEdgeCount(b, !0, a);
    var f = this.model.getDirectedEdgeCount(c, !1, a);
    if (null != this.multiplicities)
      for (var g = 0; g < this.multiplicities.length; g++) {
        var k = this.multiplicities[g].check(this, a, b, c, e, f);
        null != k && (d += k);
      }
    k = this.validateEdge(a, b, c);
    null != k && (d += k);
    return 0 < d.length ? d : null;
  }
  return this.allowDanglingEdges ? null : '';
};
mxGraph.prototype.validateEdge = function(a, b, c) {
  return null;
};
mxGraph.prototype.validateGraph = function(a, b) {
  a = null != a ? a : this.model.getRoot();
  b = null != b ? b : {};
  for (var c = !0, d = this.model.getChildCount(a), e = 0; e < d; e++) {
    var f = this.model.getChildAt(a, e),
      g = b;
    this.isValidRoot(f) && (g = {});
    g = this.validateGraph(f, g);
    null != g ? this.setCellWarning(f, g.replace(/\n/g, '<br>')) : this.setCellWarning(f, null);
    c = c && null == g;
  }
  d = '';
  this.isCellCollapsed(a) && !c && (d += (mxResources.get(this.containsValidationErrorsResource) || this.containsValidationErrorsResource) + '\n');
  d = this.model.isEdge(a) ? d + (this.getEdgeValidationError(a, this.model.getTerminal(a, !0), this.model.getTerminal(a, !1)) || '') : d + (this.getCellValidationError(a) || '');
  b = this.validateCell(a, b);
  null != b && (d += b);
  null == this.model.getParent(a) && this.view.validate();
  return 0 < d.length || !c ? d : null;
};
mxGraph.prototype.getCellValidationError = function(a) {
  var b = this.model.getDirectedEdgeCount(a, !0),
    c = this.model.getDirectedEdgeCount(a, !1);
  a = this.model.getValue(a);
  var d = '';
  if (null != this.multiplicities)
    for (var e = 0; e < this.multiplicities.length; e++) {
      var f = this.multiplicities[e];
      f.source && mxUtils.isNode(a, f.type, f.attr, f.value) && (b > f.max || b < f.min) ? d += f.countError + '\n' : !f.source && mxUtils.isNode(a, f.type, f.attr, f.value) && (c > f.max || c < f.min) && (d += f.countError + '\n');
    }
  return 0 < d.length ? d : null;
};
mxGraph.prototype.validateCell = function(a, b) {
  return null;
};
mxGraph.prototype.getBackgroundImage = function() {
  return this.backgroundImage;
};
mxGraph.prototype.setBackgroundImage = function(a) {
  this.backgroundImage = a;
};
mxGraph.prototype.getFoldingImage = function(a) {
  if (null != a && this.foldingEnabled && !this.getModel().isEdge(a.cell)) {
    var b = this.isCellCollapsed(a.cell);
    if (this.isCellFoldable(a.cell, !b))
      return b ? this.collapsedImage : this.expandedImage;
  }
  return null;
};
mxGraph.prototype.convertValueToString = function(a) {
  a = this.model.getValue(a);
  if (null != a) {
    if (mxUtils.isNode(a))
      return a.nodeName;
    if ('function' == typeof a.toString)
      return a.toString();
  }
  return '';
};
mxGraph.prototype.getLabel = function(a) {
  var b = '';
  if (this.labelsVisible && null != a) {
    var c = this.getCurrentCellStyle(a);
    mxUtils.getValue(c, mxConstants.STYLE_NOLABEL, !1) || (b = this.convertValueToString(a));
  }
  return b;
};
mxGraph.prototype.isHtmlLabel = function(a) {
  return this.isHtmlLabels();
};
mxGraph.prototype.isHtmlLabels = function() {
  return this.htmlLabels;
};
mxGraph.prototype.setHtmlLabels = function(a) {
  this.htmlLabels = a;
};
mxGraph.prototype.isWrapping = function(a) {
  return 'wrap' == this.getCurrentCellStyle(a)[mxConstants.STYLE_WHITE_SPACE];
};
mxGraph.prototype.isLabelClipped = function(a) {
  return 'hidden' == this.getCurrentCellStyle(a)[mxConstants.STYLE_OVERFLOW];
};
mxGraph.prototype.getTooltip = function(a, b, c, d) {
  var e = null;
  null != a && (null == a.control || b != a.control.node && b.parentNode != a.control.node || (e = this.collapseExpandResource, e = mxUtils.htmlEntities(mxResources.get(e) || e).replace(/\\n/g, '<br>')), null == e && null != a.overlays && a.overlays.visit(function(f, g) {
    null != e || b != g.node && b.parentNode != g.node || (e = g.overlay.toString());
  }), null == e && (c = this.selectionCellsHandler.getHandler(a.cell), null != c && 'function' == typeof c.getTooltipForNode && (e = c.getTooltipForNode(b))), null == e && (e = this.getTooltipForCell(a.cell)));
  return e;
};
mxGraph.prototype.getTooltipForCell = function(a) {
  return null != a && null != a.getTooltip ? a.getTooltip() : this.convertValueToString(a);
};
mxGraph.prototype.getLinkForCell = function(a) {
  return null;
};
mxGraph.prototype.getLinkTargetForCell = function(a) {
  return null;
};
mxGraph.prototype.getCursorForMouseEvent = function(a) {
  return this.getCursorForCell(a.getCell());
};
mxGraph.prototype.getCursorForCell = function(a) {
  return null;
};
mxGraph.prototype.getStartSize = function(a, b) {
  var c = new mxRectangle();
  a = this.getCurrentCellStyle(a, b);
  b = parseInt(mxUtils.getValue(a, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE));
  mxUtils.getValue(a, mxConstants.STYLE_HORIZONTAL, !0) ? c.height = b : c.width = b;
  return c;
};
mxGraph.prototype.getSwimlaneDirection = function(a) {
  var b = mxUtils.getValue(a, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST),
    c = 1 == mxUtils.getValue(a, mxConstants.STYLE_FLIPH, 0),
    d = 1 == mxUtils.getValue(a, mxConstants.STYLE_FLIPV, 0);
  a = mxUtils.getValue(a, mxConstants.STYLE_HORIZONTAL, !0) ? 0 : 3;
  b == mxConstants.DIRECTION_NORTH ? a-- : b == mxConstants.DIRECTION_WEST ? a += 2 : b == mxConstants.DIRECTION_SOUTH && (a += 1);
  b = mxUtils.mod(a, 2);
  c && 1 == b && (a += 2);
  d && 0 == b && (a += 2);
  return [
    mxConstants.DIRECTION_NORTH,
    mxConstants.DIRECTION_EAST,
    mxConstants.DIRECTION_SOUTH,
    mxConstants.DIRECTION_WEST
  ][mxUtils.mod(a, 4)];
};
mxGraph.prototype.getActualStartSize = function(a, b) {
  var c = new mxRectangle();
  this.isSwimlane(a, b) && (b = this.getCurrentCellStyle(a, b), a = parseInt(mxUtils.getValue(b, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE)), b = this.getSwimlaneDirection(b), b == mxConstants.DIRECTION_NORTH ? c.y = a : b == mxConstants.DIRECTION_WEST ? c.x = a : b == mxConstants.DIRECTION_SOUTH ? c.height = a : c.width = a);
  return c;
};
mxGraph.prototype.getImage = function(a) {
  return null != a && null != a.style ? a.style[mxConstants.STYLE_IMAGE] : null;
};
mxGraph.prototype.isTransparentState = function(a) {
  var b = !1;
  if (null != a) {
    b = mxUtils.getValue(a.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE);
    var c = mxUtils.getValue(a.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE);
    b = b == mxConstants.NONE && c == mxConstants.NONE && null == this.getImage(a);
  }
  return b;
};
mxGraph.prototype.getVerticalAlign = function(a) {
  return null != a && null != a.style ? a.style[mxConstants.STYLE_VERTICAL_ALIGN] || mxConstants.ALIGN_MIDDLE : null;
};
mxGraph.prototype.getIndicatorColor = function(a) {
  return null != a && null != a.style ? a.style[mxConstants.STYLE_INDICATOR_COLOR] : null;
};
mxGraph.prototype.getIndicatorGradientColor = function(a) {
  return null != a && null != a.style ? a.style[mxConstants.STYLE_INDICATOR_GRADIENTCOLOR] : null;
};
mxGraph.prototype.getIndicatorShape = function(a) {
  return null != a && null != a.style ? a.style[mxConstants.STYLE_INDICATOR_SHAPE] : null;
};
mxGraph.prototype.getIndicatorImage = function(a) {
  return null != a && null != a.style ? a.style[mxConstants.STYLE_INDICATOR_IMAGE] : null;
};
mxGraph.prototype.getBorder = function() {
  return this.border;
};
mxGraph.prototype.setBorder = function(a) {
  this.border = a;
};
mxGraph.prototype.isSwimlane = function(a, b) {
  return null == a || this.model.getParent(a) == this.model.getRoot() || this.model.isEdge(a) ? !1 : this.getCurrentCellStyle(a, b)[mxConstants.STYLE_SHAPE] == mxConstants.SHAPE_SWIMLANE;
};
mxGraph.prototype.isResizeContainer = function() {
  return this.resizeContainer;
};
mxGraph.prototype.setResizeContainer = function(a) {
  this.resizeContainer = a;
};
mxGraph.prototype.isEnabled = function() {
  return this.enabled;
};
mxGraph.prototype.setEnabled = function(a) {
  this.enabled = a;
  this.fireEvent(new mxEventObject('enabledChanged', 'enabled', a));
};
mxGraph.prototype.isEscapeEnabled = function() {
  return this.escapeEnabled;
};
mxGraph.prototype.setEscapeEnabled = function(a) {
  this.escapeEnabled = a;
};
mxGraph.prototype.isInvokesStopCellEditing = function() {
  return this.invokesStopCellEditing;
};
mxGraph.prototype.setInvokesStopCellEditing = function(a) {
  this.invokesStopCellEditing = a;
};
mxGraph.prototype.isEnterStopsCellEditing = function() {
  return this.enterStopsCellEditing;
};
mxGraph.prototype.setEnterStopsCellEditing = function(a) {
  this.enterStopsCellEditing = a;
};
mxGraph.prototype.isCellLocked = function(a) {
  var b = this.model.getGeometry(a);
  return this.isCellsLocked() || null != b && this.model.isVertex(a) && b.relative;
};
mxGraph.prototype.isCellsLocked = function() {
  return this.cellsLocked;
};
mxGraph.prototype.setCellsLocked = function(a) {
  this.cellsLocked = a;
};
mxGraph.prototype.getCloneableCells = function(a) {
  return this.model.filterCells(a, mxUtils.bind(this, function(b) {
    return this.isCellCloneable(b);
  }));
};
mxGraph.prototype.isCellCloneable = function(a) {
  a = this.getCurrentCellStyle(a);
  return this.isCellsCloneable() && 0 != a[mxConstants.STYLE_CLONEABLE];
};
mxGraph.prototype.isCellsCloneable = function() {
  return this.cellsCloneable;
};
mxGraph.prototype.setCellsCloneable = function(a) {
  this.cellsCloneable = a;
};
mxGraph.prototype.getExportableCells = function(a) {
  return this.model.filterCells(a, mxUtils.bind(this, function(b) {
    return this.canExportCell(b);
  }));
};
mxGraph.prototype.canExportCell = function(a) {
  return this.exportEnabled;
};
mxGraph.prototype.getImportableCells = function(a) {
  return this.model.filterCells(a, mxUtils.bind(this, function(b) {
    return this.canImportCell(b);
  }));
};
mxGraph.prototype.canImportCell = function(a) {
  return this.importEnabled;
};
mxGraph.prototype.isCellSelectable = function(a) {
  return this.isCellsSelectable();
};
mxGraph.prototype.isCellsSelectable = function() {
  return this.cellsSelectable;
};
mxGraph.prototype.setCellsSelectable = function(a) {
  this.cellsSelectable = a;
};
mxGraph.prototype.getDeletableCells = function(a) {
  return this.model.filterCells(a, mxUtils.bind(this, function(b) {
    return this.isCellDeletable(b);
  }));
};
mxGraph.prototype.isCellDeletable = function(a) {
  a = this.getCurrentCellStyle(a);
  return this.isCellsDeletable() && 0 != a[mxConstants.STYLE_DELETABLE];
};
mxGraph.prototype.isCellsDeletable = function() {
  return this.cellsDeletable;
};
mxGraph.prototype.setCellsDeletable = function(a) {
  this.cellsDeletable = a;
};
mxGraph.prototype.isLabelMovable = function(a) {
  return !this.isCellLocked(a) && (this.model.isEdge(a) && this.edgeLabelsMovable || this.model.isVertex(a) && this.vertexLabelsMovable);
};
mxGraph.prototype.getRotatableCells = function(a) {
  return this.model.filterCells(a, mxUtils.bind(this, function(b) {
    return this.isCellRotatable(b);
  }));
};
mxGraph.prototype.isCellRotatable = function(a) {
  return 0 != this.getCurrentCellStyle(a)[mxConstants.STYLE_ROTATABLE];
};
mxGraph.prototype.getMovableCells = function(a) {
  return this.model.filterCells(a, mxUtils.bind(this, function(b) {
    return this.isCellMovable(b);
  }));
};
mxGraph.prototype.isCellMovable = function(a) {
  var b = this.getCurrentCellStyle(a);
  return this.isCellsMovable() && !this.isCellLocked(a) && 0 != b[mxConstants.STYLE_MOVABLE];
};
mxGraph.prototype.isCellsMovable = function() {
  return this.cellsMovable;
};
mxGraph.prototype.setCellsMovable = function(a) {
  this.cellsMovable = a;
};
mxGraph.prototype.isGridEnabled = function() {
  return this.gridEnabled;
};
mxGraph.prototype.setGridEnabled = function(a) {
  this.gridEnabled = a;
};
mxGraph.prototype.isPortsEnabled = function() {
  return this.portsEnabled;
};
mxGraph.prototype.setPortsEnabled = function(a) {
  this.portsEnabled = a;
};
mxGraph.prototype.getGridSize = function() {
  return this.gridSize;
};
mxGraph.prototype.setGridSize = function(a) {
  this.gridSize = a;
};
mxGraph.prototype.getTolerance = function() {
  return this.tolerance;
};
mxGraph.prototype.setTolerance = function(a) {
  this.tolerance = a;
};
mxGraph.prototype.isVertexLabelsMovable = function() {
  return this.vertexLabelsMovable;
};
mxGraph.prototype.setVertexLabelsMovable = function(a) {
  this.vertexLabelsMovable = a;
};
mxGraph.prototype.isEdgeLabelsMovable = function() {
  return this.edgeLabelsMovable;
};
mxGraph.prototype.setEdgeLabelsMovable = function(a) {
  this.edgeLabelsMovable = a;
};
mxGraph.prototype.isSwimlaneNesting = function() {
  return this.swimlaneNesting;
};
mxGraph.prototype.setSwimlaneNesting = function(a) {
  this.swimlaneNesting = a;
};
mxGraph.prototype.isSwimlaneSelectionEnabled = function() {
  return this.swimlaneSelectionEnabled;
};
mxGraph.prototype.setSwimlaneSelectionEnabled = function(a) {
  this.swimlaneSelectionEnabled = a;
};
mxGraph.prototype.isMultigraph = function() {
  return this.multigraph;
};
mxGraph.prototype.setMultigraph = function(a) {
  this.multigraph = a;
};
mxGraph.prototype.isAllowLoops = function() {
  return this.allowLoops;
};
mxGraph.prototype.setAllowDanglingEdges = function(a) {
  this.allowDanglingEdges = a;
};
mxGraph.prototype.isAllowDanglingEdges = function() {
  return this.allowDanglingEdges;
};
mxGraph.prototype.setConnectableEdges = function(a) {
  this.connectableEdges = a;
};
mxGraph.prototype.isConnectableEdges = function() {
  return this.connectableEdges;
};
mxGraph.prototype.setCloneInvalidEdges = function(a) {
  this.cloneInvalidEdges = a;
};
mxGraph.prototype.isCloneInvalidEdges = function() {
  return this.cloneInvalidEdges;
};
mxGraph.prototype.setAllowLoops = function(a) {
  this.allowLoops = a;
};
mxGraph.prototype.isDisconnectOnMove = function() {
  return this.disconnectOnMove;
};
mxGraph.prototype.setDisconnectOnMove = function(a) {
  this.disconnectOnMove = a;
};
mxGraph.prototype.isDropEnabled = function() {
  return this.dropEnabled;
};
mxGraph.prototype.setDropEnabled = function(a) {
  this.dropEnabled = a;
};
mxGraph.prototype.isSplitEnabled = function() {
  return this.splitEnabled;
};
mxGraph.prototype.setSplitEnabled = function(a) {
  this.splitEnabled = a;
};
mxGraph.prototype.getResizableCells = function(a) {
  return this.model.filterCells(a, mxUtils.bind(this, function(b) {
    return this.isCellResizable(b);
  }));
};
mxGraph.prototype.isCellResizable = function(a) {
  var b = this.getCurrentCellStyle(a);
  return this.isCellsResizable() && !this.isCellLocked(a) && '0' != mxUtils.getValue(b, mxConstants.STYLE_RESIZABLE, '1');
};
mxGraph.prototype.isCellsResizable = function() {
  return this.cellsResizable;
};
mxGraph.prototype.setCellsResizable = function(a) {
  this.cellsResizable = a;
};
mxGraph.prototype.isTerminalPointMovable = function(a, b) {
  return !0;
};
mxGraph.prototype.isCellBendable = function(a) {
  var b = this.getCurrentCellStyle(a);
  return this.isCellsBendable() && !this.isCellLocked(a) && 0 != b[mxConstants.STYLE_BENDABLE];
};
mxGraph.prototype.isCellsBendable = function() {
  return this.cellsBendable;
};
mxGraph.prototype.setCellsBendable = function(a) {
  this.cellsBendable = a;
};
mxGraph.prototype.getEditableCells = function(a) {
  return this.model.filterCells(a, mxUtils.bind(this, function(b) {
    return this.isCellEditable(b);
  }));
};
mxGraph.prototype.isCellEditable = function(a) {
  var b = this.getCurrentCellStyle(a);
  return this.isCellsEditable() && !this.isCellLocked(a) && 0 != b[mxConstants.STYLE_EDITABLE];
};
mxGraph.prototype.isCellsEditable = function() {
  return this.cellsEditable;
};
mxGraph.prototype.setCellsEditable = function(a) {
  this.cellsEditable = a;
};
mxGraph.prototype.isCellDisconnectable = function(a, b, c) {
  return this.isCellsDisconnectable() && !this.isCellLocked(a);
};
mxGraph.prototype.isCellsDisconnectable = function() {
  return this.cellsDisconnectable;
};
mxGraph.prototype.setCellsDisconnectable = function(a) {
  this.cellsDisconnectable = a;
};
mxGraph.prototype.isValidSource = function(a) {
  return null == a && this.allowDanglingEdges || null != a && (!this.model.isEdge(a) || this.connectableEdges) && this.isCellConnectable(a);
};
mxGraph.prototype.isValidTarget = function(a) {
  return this.isValidSource(a);
};
mxGraph.prototype.isValidConnection = function(a, b) {
  return this.isValidSource(a) && this.isValidTarget(b);
};
mxGraph.prototype.setConnectable = function(a) {
  this.connectionHandler.setEnabled(a);
};
mxGraph.prototype.isConnectable = function() {
  return this.connectionHandler.isEnabled();
};
mxGraph.prototype.setTooltips = function(a) {
  this.tooltipHandler.setEnabled(a);
};
mxGraph.prototype.setPanning = function(a) {
  this.panningHandler.panningEnabled = a;
};
mxGraph.prototype.isEditing = function(a) {
  if (null != this.cellEditor) {
    var b = this.cellEditor.getEditingCell();
    return null == a ? null != b : a == b;
  }
  return !1;
};
mxGraph.prototype.isAutoSizeCell = function(a) {
  a = this.getCurrentCellStyle(a);
  return this.isAutoSizeCells() || 1 == a[mxConstants.STYLE_AUTOSIZE];
};
mxGraph.prototype.isAutoSizeCells = function() {
  return this.autoSizeCells;
};
mxGraph.prototype.setAutoSizeCells = function(a) {
  this.autoSizeCells = a;
};
mxGraph.prototype.isExtendParent = function(a) {
  return !this.getModel().isEdge(a) && this.isExtendParents();
};
mxGraph.prototype.isExtendParents = function() {
  return this.extendParents;
};
mxGraph.prototype.setExtendParents = function(a) {
  this.extendParents = a;
};
mxGraph.prototype.isExtendParentsOnAdd = function(a) {
  return this.extendParentsOnAdd;
};
mxGraph.prototype.setExtendParentsOnAdd = function(a) {
  this.extendParentsOnAdd = a;
};
mxGraph.prototype.isExtendParentsOnMove = function() {
  return this.extendParentsOnMove;
};
mxGraph.prototype.setExtendParentsOnMove = function(a) {
  this.extendParentsOnMove = a;
};
mxGraph.prototype.isRecursiveResize = function(a) {
  return this.recursiveResize;
};
mxGraph.prototype.setRecursiveResize = function(a) {
  this.recursiveResize = a;
};
mxGraph.prototype.isConstrainChild = function(a) {
  return this.isConstrainChildren() && !this.getModel().isEdge(this.getModel().getParent(a));
};
mxGraph.prototype.isConstrainChildren = function() {
  return this.constrainChildren;
};
mxGraph.prototype.setConstrainChildren = function(a) {
  this.constrainChildren = a;
};
mxGraph.prototype.isConstrainRelativeChildren = function() {
  return this.constrainRelativeChildren;
};
mxGraph.prototype.setConstrainRelativeChildren = function(a) {
  this.constrainRelativeChildren = a;
};
mxGraph.prototype.isAllowNegativeCoordinates = function() {
  return this.allowNegativeCoordinates;
};
mxGraph.prototype.setAllowNegativeCoordinates = function(a) {
  this.allowNegativeCoordinates = a;
};
mxGraph.prototype.getOverlap = function(a) {
  return this.isAllowOverlapParent(a) ? this.defaultOverlap : 0;
};
mxGraph.prototype.isAllowOverlapParent = function(a) {
  return !1;
};
mxGraph.prototype.getFoldableCells = function(a, b) {
  return this.model.filterCells(a, mxUtils.bind(this, function(c) {
    return this.isCellFoldable(c, b);
  }));
};
mxGraph.prototype.isCellFoldable = function(a, b) {
  b = this.getCurrentCellStyle(a);
  return 0 < this.model.getChildCount(a) && 0 != b[mxConstants.STYLE_FOLDABLE];
};
mxGraph.prototype.isValidDropTarget = function(a, b, c) {
  return null != a && (this.isSplitEnabled() && this.isSplitTarget(a, b, c) || !this.model.isEdge(a) && (this.isSwimlane(a) || 0 < this.model.getChildCount(a) && !this.isCellCollapsed(a)));
};
mxGraph.prototype.isSplitTarget = function(a, b, c) {
  return this.model.isEdge(a) && null != b && 1 == b.length && this.isCellConnectable(b[0]) && null == this.getEdgeValidationError(a, this.model.getTerminal(a, !0), b[0]) ? (c = this.model.getTerminal(a, !0), a = this.model.getTerminal(a, !1), !this.model.isAncestor(b[0], c) && !this.model.isAncestor(b[0], a)) : !1;
};
mxGraph.prototype.getDropTarget = function(a, b, c, d) {
  if (!this.isSwimlaneNesting())
    for (var e = 0; e < a.length; e++)
      if (this.isSwimlane(a[e]))
        return null;
  e = mxUtils.convertPoint(this.container, mxEvent.getClientX(b), mxEvent.getClientY(b));
  e.x -= this.panDx;
  e.y -= this.panDy;
  e = this.getSwimlaneAt(e.x, e.y);
  if (null == c)
    c = e;
  else if (null != e) {
    for (var f = this.model.getParent(e); null != f && this.isSwimlane(f) && f != c;)
      f = this.model.getParent(f);
    f == c && (c = e);
  }
  for (; null != c && !this.isValidDropTarget(c, a, b) && !this.model.isLayer(c);)
    c = this.model.getParent(c);
  if (null == d || !d)
    for (var g = c; null != g && 0 > mxUtils.indexOf(a, g);)
      g = this.model.getParent(g);
  return this.model.isLayer(c) || null != g ? null : c;
};
mxGraph.prototype.getDefaultParent = function() {
  var a = this.getCurrentRoot();
  null == a && (a = this.defaultParent, null == a && (a = this.model.getRoot(), a = this.model.getChildAt(a, 0)));
  return a;
};
mxGraph.prototype.setDefaultParent = function(a) {
  this.defaultParent = a;
};
mxGraph.prototype.getSwimlane = function(a) {
  for (; null != a && !this.isSwimlane(a);)
    a = this.model.getParent(a);
  return a;
};
mxGraph.prototype.getSwimlaneAt = function(a, b, c) {
  null == c && (c = this.getCurrentRoot(), null == c && (c = this.model.getRoot()));
  if (null != c)
    for (var d = this.model.getChildCount(c), e = 0; e < d; e++) {
      var f = this.model.getChildAt(c, e);
      if (null != f) {
        var g = this.getSwimlaneAt(a, b, f);
        if (null != g)
          return g;
        if (this.isCellVisible(f) && this.isSwimlane(f) && (g = this.view.getState(f), this.intersects(g, a, b)))
          return f;
      }
    }
  return null;
};
mxGraph.prototype.getCellAt = function(a, b, c, d, e, f) {
  d = null != d ? d : !0;
  e = null != e ? e : !0;
  null == c && (c = this.getCurrentRoot(), null == c && (c = this.getModel().getRoot()));
  if (null != c)
    for (var g = this.model.getChildCount(c) - 1; 0 <= g; g--) {
      var k = this.model.getChildAt(c, g),
        l = this.getCellAt(a, b, k, d, e, f);
      if (null != l)
        return l;
      if (this.isCellVisible(k) && (e && this.model.isEdge(k) || d && this.model.isVertex(k)) && (l = this.view.getState(k), null != l && (null == f || !f(l, a, b)) && this.intersects(l, a, b)))
        return k;
    }
  return null;
};
mxGraph.prototype.intersects = function(a, b, c) {
  if (null != a) {
    var d = a.absolutePoints;
    if (null != d) {
      a = this.tolerance * this.tolerance;
      for (var e = d[0], f = 1; f < d.length; f++) {
        var g = d[f];
        if (mxUtils.ptSegDistSq(e.x, e.y, g.x, g.y, b, c) <= a)
          return !0;
        e = g;
      }
    } else if (e = mxUtils.toRadians(mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION) || 0), 0 != e && (d = Math.cos(-e), e = Math.sin(-e), f = new mxPoint(a.getCenterX(), a.getCenterY()), e = mxUtils.getRotatedPoint(new mxPoint(b, c), d, e, f), b = e.x, c = e.y), mxUtils.contains(a, b, c))
      return !0;
  }
  return !1;
};
mxGraph.prototype.hitsSwimlaneContent = function(a, b, c) {
  var d = this.getView().getState(a);
  a = this.getStartSize(a);
  if (null != d) {
    var e = this.getView().getScale();
    b -= d.x;
    c -= d.y;
    if (0 < a.width && 0 < b && b > a.width * e || 0 < a.height && 0 < c && c > a.height * e)
      return !0;
  }
  return !1;
};
mxGraph.prototype.getChildVertices = function(a) {
  return this.getChildCells(a, !0, !1);
};
mxGraph.prototype.getChildEdges = function(a) {
  return this.getChildCells(a, !1, !0);
};
mxGraph.prototype.getChildCells = function(a, b, c) {
  a = null != a ? a : this.getDefaultParent();
  a = this.model.getChildCells(a, null != b ? b : !1, null != c ? c : !1);
  b = [];
  for (c = 0; c < a.length; c++)
    this.isCellVisible(a[c]) && b.push(a[c]);
  return b;
};
mxGraph.prototype.getConnections = function(a, b) {
  return this.getEdges(a, b, !0, !0, !1);
};
mxGraph.prototype.getIncomingEdges = function(a, b) {
  return this.getEdges(a, b, !0, !1, !1);
};
mxGraph.prototype.getOutgoingEdges = function(a, b) {
  return this.getEdges(a, b, !1, !0, !1);
};
mxGraph.prototype.getEdges = function(a, b, c, d, e, f) {
  c = null != c ? c : !0;
  d = null != d ? d : !0;
  e = null != e ? e : !0;
  f = null != f ? f : !1;
  for (var g = [], k = this.isCellCollapsed(a), l = this.model.getChildCount(a), m = 0; m < l; m++) {
    var n = this.model.getChildAt(a, m);
    if (k || !this.isCellVisible(n))
      g = g.concat(this.model.getEdges(n, c, d));
  }
  g = g.concat(this.model.getEdges(a, c, d));
  k = [];
  for (m = 0; m < g.length; m++)
    n = this.view.getState(g[m]), l = null != n ? n.getVisibleTerminal(!0) : this.view.getVisibleTerminal(g[m], !0), n = null != n ? n.getVisibleTerminal(!1) : this.view.getVisibleTerminal(g[m], !1), (e && l == n || l != n && (c && n == a && (null == b || this.isValidAncestor(l, b, f)) || d && l == a && (null == b || this.isValidAncestor(n, b, f)))) && k.push(g[m]);
  return k;
};
mxGraph.prototype.isValidAncestor = function(a, b, c) {
  return c ? this.model.isAncestor(b, a) : this.model.getParent(a) == b;
};
mxGraph.prototype.getOpposites = function(a, b, c, d) {
  c = null != c ? c : !0;
  d = null != d ? d : !0;
  var e = [],
    f = new mxDictionary();
  if (null != a)
    for (var g = 0; g < a.length; g++) {
      var k = this.view.getState(a[g]),
        l = null != k ? k.getVisibleTerminal(!0) : this.view.getVisibleTerminal(a[g], !0);
      k = null != k ? k.getVisibleTerminal(!1) : this.view.getVisibleTerminal(a[g], !1);
      l == b && null != k && k != b && d ? f.get(k) || (f.put(k, !0), e.push(k)) : k == b && null != l && l != b && c && !f.get(l) && (f.put(l, !0), e.push(l));
    }
  return e;
};
mxGraph.prototype.getEdgesBetween = function(a, b, c) {
  c = null != c ? c : !1;
  for (var d = this.getEdges(a), e = [], f = 0; f < d.length; f++) {
    var g = this.view.getState(d[f]),
      k = null != g ? g.getVisibleTerminal(!0) : this.view.getVisibleTerminal(d[f], !0);
    g = null != g ? g.getVisibleTerminal(!1) : this.view.getVisibleTerminal(d[f], !1);
    (k == a && g == b || !c && k == b && g == a) && e.push(d[f]);
  }
  return e;
};
mxGraph.prototype.getPointForEvent = function(a, b) {
  a = mxUtils.convertPoint(this.container, mxEvent.getClientX(a), mxEvent.getClientY(a));
  var c = this.view.scale,
    d = this.view.translate;
  b = 0 != b ? this.gridSize / 2 : 0;
  a.x = this.snap(a.x / c - d.x - b);
  a.y = this.snap(a.y / c - d.y - b);
  return a;
};
mxGraph.prototype.getCells = function(a, b, c, d, e, f, g, k, l) {
  f = null != f ? f : [];
  if (0 < c || 0 < d || null != g) {
    var m = this.getModel(),
      n = a + c,
      p = b + d;
    null == e && (e = this.getCurrentRoot(), null == e && (e = m.getRoot()));
    if (null != e)
      for (var r = m.getChildCount(e), q = 0; q < r; q++) {
        var t = m.getChildAt(e, q),
          u = this.view.getState(t);
        if (null != u && this.isCellVisible(t) && (null == k || !k(u))) {
          var x = mxUtils.getValue(u.style, mxConstants.STYLE_ROTATION) || 0;
          0 != x && (u = mxUtils.getBoundingBox(u, x));
          (x = null != g && m.isVertex(t) && mxUtils.intersects(g, u) || null != g && m.isEdge(t) && mxUtils.intersects(g, u) || null == g && (m.isEdge(t) || m.isVertex(t)) && u.x >= a && u.y + u.height <= p && u.y >= b && u.x + u.width <= n) && f.push(t);
          x && !l || this.getCells(a, b, c, d, t, f, g, k, l);
        }
      }
  }
  return f;
};
mxGraph.prototype.getCellsBeyond = function(a, b, c, d, e) {
  var f = [];
  if (d || e)
    if (null == c && (c = this.getDefaultParent()), null != c)
      for (var g = this.model.getChildCount(c), k = 0; k < g; k++) {
        var l = this.model.getChildAt(c, k),
          m = this.view.getState(l);
        this.isCellVisible(l) && null != m && (!d || m.x >= a) && (!e || m.y >= b) && f.push(l);
      }
  return f;
};
mxGraph.prototype.findTreeRoots = function(a, b, c) {
  b = null != b ? b : !1;
  c = null != c ? c : !1;
  var d = [];
  if (null != a) {
    for (var e = this.getModel(), f = e.getChildCount(a), g = null, k = 0, l = 0; l < f; l++) {
      var m = e.getChildAt(a, l);
      if (this.model.isVertex(m) && this.isCellVisible(m)) {
        for (var n = this.getConnections(m, b ? a : null), p = 0, r = 0, q = 0; q < n.length; q++)
          this.view.getVisibleTerminal(n[q], !0) == m ? p++ : r++;
        (c && 0 == p && 0 < r || !c && 0 == r && 0 < p) && d.push(m);
        n = c ? r - p : p - r;
        n > k && (k = n, g = m);
      }
    }
    0 == d.length && null != g && d.push(g);
  }
  return d;
};
mxGraph.prototype.traverse = function(a, b, c, d, e, f) {
  if (null != c && null != a && (b = null != b ? b : !0, f = null != f ? f : !1, e = e || new mxDictionary(), null == d || !e.get(d)) && (e.put(d, !0), d = c(a, d), null == d || d) && (d = this.model.getEdgeCount(a), 0 < d))
    for (var g = 0; g < d; g++) {
      var k = this.model.getEdgeAt(a, g),
        l = this.model.getTerminal(k, !0) == a;
      b && !f != l || (l = this.model.getTerminal(k, !l), this.traverse(l, b, c, k, e, f));
    }
};
mxGraph.prototype.isCellSelected = function(a) {
  return this.getSelectionModel().isSelected(a);
};
mxGraph.prototype.isSelectionEmpty = function() {
  return this.getSelectionModel().isEmpty();
};
mxGraph.prototype.clearSelection = function() {
  return this.getSelectionModel().clear();
};
mxGraph.prototype.getSelectionCount = function() {
  return this.getSelectionModel().cells.length;
};
mxGraph.prototype.getSelectionCell = function() {
  return this.getSelectionModel().cells[0];
};
mxGraph.prototype.getSelectionCells = function() {
  return this.getSelectionModel().cells.slice();
};
mxGraph.prototype.setSelectionCell = function(a) {
  this.getSelectionModel().setCell(a);
};
mxGraph.prototype.setSelectionCells = function(a) {
  this.getSelectionModel().setCells(a);
};
mxGraph.prototype.addSelectionCell = function(a) {
  this.getSelectionModel().addCell(a);
};
mxGraph.prototype.addSelectionCells = function(a) {
  this.getSelectionModel().addCells(a);
};
mxGraph.prototype.removeSelectionCell = function(a) {
  this.getSelectionModel().removeCell(a);
};
mxGraph.prototype.removeSelectionCells = function(a) {
  this.getSelectionModel().removeCells(a);
};
mxGraph.prototype.selectRegion = function(a, b) {
  a = this.getCells(a.x, a.y, a.width, a.height);
  this.selectCellsForEvent(a, b);
  return a;
};
mxGraph.prototype.selectNextCell = function() {
  this.selectCell(!0);
};
mxGraph.prototype.selectPreviousCell = function() {
  this.selectCell();
};
mxGraph.prototype.selectParentCell = function() {
  this.selectCell(!1, !0);
};
mxGraph.prototype.selectChildCell = function() {
  this.selectCell(!1, !1, !0);
};
mxGraph.prototype.selectCell = function(a, b, c) {
  var d = this.selectionModel,
    e = 0 < d.cells.length ? d.cells[0] : null;
  1 < d.cells.length && d.clear();
  d = null != e ? this.model.getParent(e) : this.getDefaultParent();
  var f = this.model.getChildCount(d);
  null == e && 0 < f ? (a = this.model.getChildAt(d, 0), this.setSelectionCell(a)) : null != e && !b || null == this.view.getState(d) || null == this.model.getGeometry(d) ? null != e && c ? 0 < this.model.getChildCount(e) && (a = this.model.getChildAt(e, 0), this.setSelectionCell(a)) : 0 < f && (b = d.getIndex(e), a ? (b++, a = this.model.getChildAt(d, b % f)) : (b--, a = this.model.getChildAt(d, 0 > b ? f - 1 : b)), this.setSelectionCell(a)) : this.getCurrentRoot() != d && this.setSelectionCell(d);
};
mxGraph.prototype.selectAll = function(a, b) {
  a = a || this.getDefaultParent();
  b = b ? this.model.filterDescendants(mxUtils.bind(this, function(c) {
    return c != a && null != this.view.getState(c);
  }), a) : this.model.getChildren(a);
  null != b && this.setSelectionCells(b);
};
mxGraph.prototype.selectVertices = function(a, b) {
  this.selectCells(!0, !1, a, b);
};
mxGraph.prototype.selectEdges = function(a) {
  this.selectCells(!1, !0, a);
};
mxGraph.prototype.selectCells = function(a, b, c, d) {
  c = c || this.getDefaultParent();
  var e = mxUtils.bind(this, function(f) {
    return null != this.view.getState(f) && ((d || 0 == this.model.getChildCount(f)) && this.model.isVertex(f) && a && !this.model.isEdge(this.model.getParent(f)) || this.model.isEdge(f) && b);
  });
  c = this.model.filterDescendants(e, c);
  null != c && this.setSelectionCells(c);
};
mxGraph.prototype.selectCellForEvent = function(a, b) {
  var c = this.isCellSelected(a);
  this.isToggleEvent(b) ? c ? this.removeSelectionCell(a) : this.addSelectionCell(a) : c && 1 == this.getSelectionCount() || this.setSelectionCell(a);
};
mxGraph.prototype.selectCellsForEvent = function(a, b) {
  this.isToggleEvent(b) ? this.addSelectionCells(a) : this.setSelectionCells(a);
};
mxGraph.prototype.createHandler = function(a) {
  var b = null;
  if (null != a)
    if (this.model.isEdge(a.cell)) {
      b = a.getVisibleTerminalState(!0);
      var c = a.getVisibleTerminalState(!1),
        d = this.getCellGeometry(a.cell);
      b = this.view.getEdgeStyle(a, null != d ? d.points : null, b, c);
      b = this.createEdgeHandler(a, b);
    } else
      b = this.createVertexHandler(a);
  return b;
};
mxGraph.prototype.createVertexHandler = function(a) {
  return new mxVertexHandler(a);
};
mxGraph.prototype.createEdgeHandler = function(a, b) {
  return b == mxEdgeStyle.Loop || b == mxEdgeStyle.ElbowConnector || b == mxEdgeStyle.SideToSide || b == mxEdgeStyle.TopToBottom ? this.createElbowEdgeHandler(a) : b == mxEdgeStyle.SegmentConnector || b == mxEdgeStyle.OrthConnector ? this.createEdgeSegmentHandler(a) : new mxEdgeHandler(a);
};
mxGraph.prototype.createEdgeSegmentHandler = function(a) {
  return new mxEdgeSegmentHandler(a);
};
mxGraph.prototype.createElbowEdgeHandler = function(a) {
  return new mxElbowEdgeHandler(a);
};
mxGraph.prototype.addMouseListener = function(a) {
  null == this.mouseListeners && (this.mouseListeners = []);
  this.mouseListeners.push(a);
};
mxGraph.prototype.removeMouseListener = function(a) {
  if (null != this.mouseListeners)
    for (var b = 0; b < this.mouseListeners.length; b++)
      if (this.mouseListeners[b] == a) {
        this.mouseListeners.splice(b, 1);
        break;
      }
};
mxGraph.prototype.updateMouseEvent = function(a, b) {
  if (null == a.graphX || null == a.graphY) {
    var c = mxUtils.convertPoint(this.container, a.getX(), a.getY());
    a.graphX = c.x - this.panDx;
    a.graphY = c.y - this.panDy;
    null == a.getCell() && this.isMouseDown && b == mxEvent.MOUSE_MOVE && (a.state = this.view.getState(this.getCellAt(c.x, c.y, null, null, null, function(d) {
      return null == d.shape || d.shape.paintBackground != mxRectangleShape.prototype.paintBackground || '1' == mxUtils.getValue(d.style, mxConstants.STYLE_POINTER_EVENTS, '1') || null != d.shape.fill && d.shape.fill != mxConstants.NONE;
    })));
  }
  return a;
};
mxGraph.prototype.getStateForTouchEvent = function(a) {
  var b = mxEvent.getClientX(a);
  a = mxEvent.getClientY(a);
  b = mxUtils.convertPoint(this.container, b, a);
  return this.view.getState(this.getCellAt(b.x, b.y));
};
mxGraph.prototype.isEventIgnored = function(a, b, c) {
  var d = mxEvent.isMouseEvent(b.getEvent()),
    e = !1;
  b.getEvent() == this.lastEvent ? e = !0 : this.lastEvent = b.getEvent();
  if (null != this.eventSource && a != mxEvent.MOUSE_MOVE)
    mxEvent.removeGestureListeners(this.eventSource, null, this.mouseMoveRedirect, this.mouseUpRedirect), this.eventSource = this.mouseUpRedirect = this.mouseMoveRedirect = null;
  else if (!mxClient.IS_GC && null != this.eventSource && b.getSource() != this.eventSource)
    e = !0;
  else if (mxClient.IS_TOUCH && a == mxEvent.MOUSE_DOWN && !d && !mxEvent.isPenEvent(b.getEvent())) {
    this.eventSource = b.getSource();
    var f = null;
    !mxClient.IS_ANDROID && mxClient.IS_LINUX && mxClient.IS_GC || (f = b.getEvent().pointerId);
    this.mouseMoveRedirect = mxUtils.bind(this, function(g) {
      null != f && g.pointerId != f || this.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(g, this.getStateForTouchEvent(g)));
    });
    this.mouseUpRedirect = mxUtils.bind(this, function(g) {
      this.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(g, this.getStateForTouchEvent(g)));
      f = null;
    });
    mxEvent.addGestureListeners(this.eventSource, null, this.mouseMoveRedirect, this.mouseUpRedirect);
  }
  this.isSyntheticEventIgnored(a, b, c) && (e = !0);
  if (!mxEvent.isPopupTrigger(this.lastEvent) && a != mxEvent.MOUSE_MOVE && 2 == this.lastEvent.detail)
    return !0;
  a == mxEvent.MOUSE_UP && this.isMouseDown ? this.isMouseDown = !1 : a != mxEvent.MOUSE_DOWN || this.isMouseDown ? !e && ((!mxClient.IS_FF || a != mxEvent.MOUSE_MOVE) && this.isMouseDown && this.isMouseTrigger != d || a == mxEvent.MOUSE_DOWN && this.isMouseDown || a == mxEvent.MOUSE_UP && !this.isMouseDown) && (e = !0) : (this.isMouseDown = !0, this.isMouseTrigger = d);
  e || a != mxEvent.MOUSE_DOWN || (this.lastMouseX = b.getX(), this.lastMouseY = b.getY());
  return e;
};
mxGraph.prototype.isSyntheticEventIgnored = function(a, b, c) {
  c = !1;
  b = mxEvent.isMouseEvent(b.getEvent());
  this.ignoreMouseEvents && b && a != mxEvent.MOUSE_MOVE ? (this.ignoreMouseEvents = a != mxEvent.MOUSE_UP, c = !0) : mxClient.IS_FF && !b && a == mxEvent.MOUSE_UP && (this.ignoreMouseEvents = !0);
  return c;
};
mxGraph.prototype.isEventSourceIgnored = function(a, b) {
  var c = b.getSource(),
    d = null != c.nodeName ? c.nodeName.toLowerCase() : '';
  b = !mxEvent.isMouseEvent(b.getEvent()) || mxEvent.isLeftMouseButton(b.getEvent());
  return a == mxEvent.MOUSE_DOWN && b && ('select' == d || 'option' == d || 'input' == d && 'checkbox' != c.type && 'radio' != c.type && 'button' != c.type && 'submit' != c.type && 'file' != c.type);
};
mxGraph.prototype.getEventState = function(a) {
  return a;
};
mxGraph.prototype.isPointerEventIgnored = function(a, b) {
  var c = !1;
  if (mxClient.IS_ANDROID || !mxClient.IS_LINUX || !mxClient.IS_GC) {
    var d = b.getEvent().pointerId;
    a == mxEvent.MOUSE_DOWN ? null != this.currentPointerId && this.currentPointerId != d ? c = !0 : null == this.currentPointerId && (this.currentPointerId = b.getEvent().pointerId) : a == mxEvent.MOUSE_MOVE ? null != this.currentPointerId && this.currentPointerId != d && (c = !0) : a == mxEvent.MOUSE_UP && (this.currentPointerId = null);
  }
  return c;
};
mxGraph.prototype.fireMouseEvent = function(a, b, c) {
  if (this.isEventSourceIgnored(a, b))
    null != this.tooltipHandler && this.tooltipHandler.hide();
  else if (this.isPointerEventIgnored(a, b))
    this.tapAndHoldValid = !1;
  else {
    null == c && (c = this);
    b = this.updateMouseEvent(b, a);
    if (!this.nativeDblClickEnabled && !mxEvent.isPopupTrigger(b.getEvent()) || this.doubleTapEnabled && mxClient.IS_TOUCH && (mxEvent.isTouchEvent(b.getEvent()) || mxEvent.isPenEvent(b.getEvent()))) {
      var d = new Date().getTime();
      if (a == mxEvent.MOUSE_DOWN)
        if (null != this.lastTouchEvent && this.lastTouchEvent != b.getEvent() && d - this.lastTouchTime < this.doubleTapTimeout && Math.abs(this.lastTouchX - b.getX()) < this.doubleTapTolerance && Math.abs(this.lastTouchY - b.getY()) < this.doubleTapTolerance && 2 > this.doubleClickCounter) {
          if (this.doubleClickCounter++, d = !1, a == mxEvent.MOUSE_UP ? b.getCell() == this.lastTouchCell && null != this.lastTouchCell && (this.lastTouchTime = 0, d = this.lastTouchCell, this.lastTouchCell = null, this.dblClick(b.getEvent(), d), d = !0) : (this.fireDoubleClick = !0, this.lastTouchTime = 0), d) {
            mxEvent.consume(b.getEvent());
            return;
          }
        } else {
          if (null == this.lastTouchEvent || this.lastTouchEvent != b.getEvent())
            this.lastTouchCell = b.getCell(), this.lastTouchX = b.getX(), this.lastTouchY = b.getY(), this.lastTouchTime = d, this.lastTouchEvent = b.getEvent(), this.doubleClickCounter = 0;
        }
      else if ((this.isMouseDown || a == mxEvent.MOUSE_UP) && this.fireDoubleClick) {
        this.fireDoubleClick = !1;
        d = this.lastTouchCell;
        this.lastTouchCell = null;
        this.isMouseDown = !1;
        (null != d || (mxEvent.isTouchEvent(b.getEvent()) || mxEvent.isPenEvent(b.getEvent())) && (mxClient.IS_GC || mxClient.IS_SF)) && Math.abs(this.lastTouchX - b.getX()) < this.doubleTapTolerance && Math.abs(this.lastTouchY - b.getY()) < this.doubleTapTolerance ? this.dblClick(b.getEvent(), d) : mxEvent.consume(b.getEvent());
        return;
      }
    }
    if (!this.isEventIgnored(a, b, c)) {
      b.state = this.getEventState(b.getState());
      this.fireEvent(new mxEventObject(mxEvent.FIRE_MOUSE_EVENT, 'eventName', a, 'event', b));
      if (mxClient.IS_OP || mxClient.IS_SF || mxClient.IS_GC || mxClient.IS_IE11 || mxClient.IS_IE && mxClient.IS_SVG || b.getEvent().target != this.container) {
        if (a == mxEvent.MOUSE_MOVE && this.isMouseDown && this.autoScroll && !mxEvent.isMultiTouchEvent(b.getEvent))
          this.scrollPointToVisible(b.getGraphX(), b.getGraphY(), this.autoExtend);
        else if (a == mxEvent.MOUSE_UP && this.ignoreScrollbars && this.translateToScrollPosition && (0 != this.container.scrollLeft || 0 != this.container.scrollTop)) {
          d = this.view.scale;
          var e = this.view.translate;
          this.view.setTranslate(e.x - this.container.scrollLeft / d, e.y - this.container.scrollTop / d);
          this.container.scrollLeft = 0;
          this.container.scrollTop = 0;
        }
        if (null != this.mouseListeners)
          for (d = [
              c,
              b
            ], b.getEvent().preventDefault || (b.getEvent().returnValue = !0), e = 0; e < this.mouseListeners.length; e++) {
            var f = this.mouseListeners[e];
            a == mxEvent.MOUSE_DOWN ? f.mouseDown.apply(f, d) : a == mxEvent.MOUSE_MOVE ? f.mouseMove.apply(f, d) : a == mxEvent.MOUSE_UP && f.mouseUp.apply(f, d);
          }
        a == mxEvent.MOUSE_UP && this.click(b);
      }
      (mxEvent.isTouchEvent(b.getEvent()) || mxEvent.isPenEvent(b.getEvent())) && a == mxEvent.MOUSE_DOWN && this.tapAndHoldEnabled && !this.tapAndHoldInProgress ? (this.tapAndHoldInProgress = !0, this.initialTouchX = b.getGraphX(), this.initialTouchY = b.getGraphY(), this.tapAndHoldThread && window.clearTimeout(this.tapAndHoldThread), this.tapAndHoldThread = window.setTimeout(mxUtils.bind(this, function() {
        this.tapAndHoldValid && this.tapAndHold(b);
        this.tapAndHoldValid = this.tapAndHoldInProgress = !1;
      }), this.tapAndHoldDelay), this.tapAndHoldValid = !0) : a == mxEvent.MOUSE_UP ? this.tapAndHoldValid = this.tapAndHoldInProgress = !1 : this.tapAndHoldValid && (this.tapAndHoldValid = Math.abs(this.initialTouchX - b.getGraphX()) < this.tolerance && Math.abs(this.initialTouchY - b.getGraphY()) < this.tolerance);
      a == mxEvent.MOUSE_DOWN && this.isEditing() && !this.cellEditor.isEventSource(b.getEvent()) && this.stopEditing(!this.isInvokesStopCellEditing());
      this.consumeMouseEvent(a, b, c);
    }
  }
};
mxGraph.prototype.consumeMouseEvent = function(a, b, c) {
  a == mxEvent.MOUSE_DOWN && mxEvent.isTouchEvent(b.getEvent()) && b.consume(!1);
};
mxGraph.prototype.fireGestureEvent = function(a, b) {
  this.lastTouchTime = 0;
  this.fireEvent(new mxEventObject(mxEvent.GESTURE, 'event', a, 'cell', b));
};
mxGraph.prototype.destroy = function() {
  this.destroyed || (this.destroyed = !0, null != this.tooltipHandler && this.tooltipHandler.destroy(), null != this.selectionCellsHandler && this.selectionCellsHandler.destroy(), null != this.panningHandler && this.panningHandler.destroy(), null != this.popupMenuHandler && this.popupMenuHandler.destroy(), null != this.connectionHandler && this.connectionHandler.destroy(), null != this.graphHandler && this.graphHandler.destroy(), null != this.cellEditor && this.cellEditor.destroy(), null != this.view && this.view.destroy(), null != this.model && null != this.graphModelChangeListener && (this.model.removeListener(this.graphModelChangeListener), this.graphModelChangeListener = null), this.container = null);
};