function mxGraphHandler(a) {
  this.graph = a;
  this.graph.addMouseListener(this);
  this.panHandler = mxUtils.bind(this, function() {
    this.suspended || (this.updatePreview(), this.updateHint());
  });
  this.graph.addListener(mxEvent.PAN, this.panHandler);
  this.escapeHandler = mxUtils.bind(this, function(b, c) {
    this.reset();
  });
  this.graph.addListener(mxEvent.ESCAPE, this.escapeHandler);
  this.refreshHandler = mxUtils.bind(this, function(b, c) {
    this.refreshThread && window.clearTimeout(this.refreshThread);
    this.refreshThread = window.setTimeout(mxUtils.bind(this, function() {
      this.refreshThread = null;
      if (null != this.first && !this.suspended) {
        var d = this.currentDx,
          e = this.currentDy;
        this.currentDy = this.currentDx = 0;
        this.updatePreview();
        this.bounds = this.graph.getView().getBounds(this.cells);
        this.pBounds = this.getPreviewBounds(this.cells);
        null != this.pBounds || this.livePreviewUsed ? (this.currentDx = d, this.currentDy = e, this.updatePreview(), this.updateHint(), this.livePreviewUsed && (this.setHandlesVisibleForCells(this.graph.selectionCellsHandler.getHandledSelectionCells(), !1, !0), this.updatePreview())) : this.reset();
      }
    }), 0);
  });
  this.graph.getModel().addListener(mxEvent.CHANGE, this.refreshHandler);
  this.graph.addListener(mxEvent.REFRESH, this.refreshHandler);
  this.keyHandler = mxUtils.bind(this, function(b) {
    null == this.graph.container || 'hidden' == this.graph.container.style.visibility || null == this.first || this.suspended || (b = this.graph.isCloneEvent(b) && this.graph.isCellsCloneable() && this.isCloneEnabled(), b != this.cloning && (this.cloning = b, this.checkPreview(), this.updatePreview()));
  });
  mxEvent.addListener(document, 'keydown', this.keyHandler);
  mxEvent.addListener(document, 'keyup', this.keyHandler);
}
mxGraphHandler.prototype.graph = null;
mxGraphHandler.prototype.maxCells = mxClient.IS_IE ? 20 : 50;
mxGraphHandler.prototype.enabled = !0;
mxGraphHandler.prototype.highlightEnabled = !0;
mxGraphHandler.prototype.cloneEnabled = !0;
mxGraphHandler.prototype.moveEnabled = !0;
mxGraphHandler.prototype.guidesEnabled = !1;
mxGraphHandler.prototype.handlesVisible = !0;
mxGraphHandler.prototype.guide = null;
mxGraphHandler.prototype.currentDx = null;
mxGraphHandler.prototype.currentDy = null;
mxGraphHandler.prototype.updateCursor = !0;
mxGraphHandler.prototype.selectEnabled = !0;
mxGraphHandler.prototype.removeCellsFromParent = !0;
mxGraphHandler.prototype.removeEmptyParents = !1;
mxGraphHandler.prototype.connectOnDrop = !1;
mxGraphHandler.prototype.scrollOnMove = !0;
mxGraphHandler.prototype.minimumSize = 6;
mxGraphHandler.prototype.previewColor = 'black';
mxGraphHandler.prototype.htmlPreview = !1;
mxGraphHandler.prototype.shape = null;
mxGraphHandler.prototype.scaleGrid = !1;
mxGraphHandler.prototype.rotationEnabled = !0;
mxGraphHandler.prototype.maxLivePreview = 0;
mxGraphHandler.prototype.allowLivePreview = mxClient.IS_SVG;
mxGraphHandler.prototype.isEnabled = function() {
  return this.enabled;
};
mxGraphHandler.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxGraphHandler.prototype.isCloneEnabled = function() {
  return this.cloneEnabled;
};
mxGraphHandler.prototype.setCloneEnabled = function(a) {
  this.cloneEnabled = a;
};
mxGraphHandler.prototype.isMoveEnabled = function() {
  return this.moveEnabled;
};
mxGraphHandler.prototype.setMoveEnabled = function(a) {
  this.moveEnabled = a;
};
mxGraphHandler.prototype.isSelectEnabled = function() {
  return this.selectEnabled;
};
mxGraphHandler.prototype.setSelectEnabled = function(a) {
  this.selectEnabled = a;
};
mxGraphHandler.prototype.isRemoveCellsFromParent = function() {
  return this.removeCellsFromParent;
};
mxGraphHandler.prototype.setRemoveCellsFromParent = function(a) {
  this.removeCellsFromParent = a;
};
mxGraphHandler.prototype.isPropagateSelectionCell = function(a, b, c) {
  var d = this.graph.model.getParent(a);
  return b ? (b = this.graph.model.isEdge(a) ? null : this.graph.getCellGeometry(a), !this.graph.isSiblingSelected(a) && (null != b && b.relative || !this.graph.isSwimlane(d))) : (!this.graph.isToggleEvent(c.getEvent()) || !this.graph.isSiblingSelected(a) && !this.graph.isCellSelected(a) && !this.graph.isSwimlane(d) || this.graph.isCellSelected(d)) && (this.graph.isToggleEvent(c.getEvent()) || !this.graph.isCellSelected(d));
};
mxGraphHandler.prototype.getInitialCellForEvent = function(a) {
  var b = a.getState();
  if (!(this.graph.isToggleEvent(a.getEvent()) && mxEvent.isAltDown(a.getEvent()) || null == b || this.graph.isCellSelected(b.cell)))
    for (var c = this.graph.model, d = this.graph.view.getState(c.getParent(b.cell)); null != d && !this.graph.isCellSelected(d.cell) && (c.isVertex(d.cell) || c.isEdge(d.cell)) && this.isPropagateSelectionCell(b.cell, !0, a);)
      b = d, d = this.graph.view.getState(this.graph.getModel().getParent(b.cell));
  return null != b ? b.cell : null;
};
mxGraphHandler.prototype.isDelayedSelection = function(a, b) {
  if (!this.graph.isToggleEvent(b.getEvent()) || !mxEvent.isAltDown(b.getEvent()))
    for (; null != a;) {
      if (this.graph.selectionCellsHandler.isHandled(a))
        return this.graph.cellEditor.getEditingCell() != a;
      a = this.graph.model.getParent(a);
    }
  return this.graph.isToggleEvent(b.getEvent()) && !mxEvent.isAltDown(b.getEvent());
};
mxGraphHandler.prototype.selectDelayed = function(a) {
  if (!this.graph.popupMenuHandler.isPopupTrigger(a)) {
    var b = a.getCell();
    null == b && (b = this.cell);
    this.selectCellForEvent(b, a);
  }
};
mxGraphHandler.prototype.selectCellForEvent = function(a, b) {
  var c = this.graph.view.getState(a);
  if (null != c) {
    if (!(b.isSource(c.control) || this.graph.isToggleEvent(b.getEvent()) && mxEvent.isAltDown(b.getEvent()))) {
      c = this.graph.getModel();
      for (var d = c.getParent(a); null != this.graph.view.getState(d) && (c.isVertex(d) || c.isEdge(d) && !this.graph.isToggleEvent(b.getEvent())) && this.isPropagateSelectionCell(a, !1, b);)
        a = d, d = c.getParent(a);
    }
    this.graph.selectCellForEvent(a, b.getEvent());
  }
  return a;
};
mxGraphHandler.prototype.consumeMouseEvent = function(a, b) {
  b.consume();
};
mxGraphHandler.prototype.mouseDown = function(a, b) {
  if (!b.isConsumed() && this.isEnabled() && this.graph.isEnabled() && null != b.getState() && !mxEvent.isMultiTouchEvent(b.getEvent()) && (a = this.getInitialCellForEvent(b), this.delayedSelection = this.isDelayedSelection(a, b), this.cell = null, this.isSelectEnabled() && !this.delayedSelection && this.graph.selectCellForEvent(a, b.getEvent()), this.isMoveEnabled())) {
    var c = this.graph.model,
      d = c.getGeometry(a);
    this.graph.isCellMovable(a) && (!c.isEdge(a) || 1 < this.graph.getSelectionCount() || null != d.points && 0 < d.points.length || null == c.getTerminal(a, !0) || null == c.getTerminal(a, !1) || this.graph.allowDanglingEdges || this.graph.isCloneEvent(b.getEvent()) && this.graph.isCellsCloneable()) ? this.start(a, b.getX(), b.getY()) : this.delayedSelection && (this.cell = a);
    this.cellWasClicked = !0;
    this.consumeMouseEvent(mxEvent.MOUSE_DOWN, b);
  }
};
mxGraphHandler.prototype.getGuideStates = function() {
  var a = this.graph.getDefaultParent(),
    b = this.graph.getModel(),
    c = mxUtils.bind(this, function(d) {
      return null != this.graph.view.getState(d) && b.isVertex(d) && null != b.getGeometry(d) && !b.getGeometry(d).relative;
    });
  return this.graph.view.getCellStates(b.filterDescendants(c, a));
};
mxGraphHandler.prototype.getCells = function(a) {
  return !this.delayedSelection && this.graph.isCellMovable(a) ? [a] : this.graph.getMovableCells(this.graph.getSelectionCells());
};
mxGraphHandler.prototype.getPreviewBounds = function(a) {
  a = this.getBoundingBox(a);
  null != a && (a.width = Math.max(0, a.width - 1), a.height = Math.max(0, a.height - 1), a.width < this.minimumSize ? (a.x -= (this.minimumSize - a.width) / 2, a.width = this.minimumSize) : (a.x = Math.round(a.x), a.width = Math.ceil(a.width)), a.height < this.minimumSize ? (a.y -= (this.minimumSize - a.height) / 2, a.height = this.minimumSize) : (a.y = Math.round(a.y), a.height = Math.ceil(a.height)));
  return a;
};
mxGraphHandler.prototype.getBoundingBox = function(a) {
  var b = null;
  if (null != a && 0 < a.length)
    for (var c = this.graph.getModel(), d = 0; d < a.length; d++)
      if (c.isVertex(a[d]) || c.isEdge(a[d])) {
        var e = this.graph.view.getState(a[d]);
        if (null != e) {
          var f = e;
          c.isVertex(a[d]) && null != e.shape && null != e.shape.boundingBox && (f = e.shape.boundingBox);
          null == b ? b = mxRectangle.fromRectangle(f) : b.add(f);
        }
      }
  return b;
};
mxGraphHandler.prototype.createPreviewShape = function(a) {
  a = new mxRectangleShape(a, null, this.previewColor);
  a.isDashed = !0;
  this.htmlPreview ? (a.dialect = mxConstants.DIALECT_STRICTHTML, a.init(this.graph.container)) : (a.dialect = mxConstants.DIALECT_SVG, a.init(this.graph.getView().getOverlayPane()), a.pointerEvents = !1, mxClient.IS_IOS && (a.getSvgScreenOffset = function() {
    return 0;
  }));
  return a;
};
mxGraphHandler.prototype.start = function(a, b, c, d) {
  if (null == this.first) {
    this.cell = a;
    this.first = mxUtils.convertPoint(this.graph.container, b, c);
    this.cells = null != d ? d : this.getCells(this.cell);
    this.bounds = this.graph.getView().getBounds(this.cells);
    this.pBounds = this.getPreviewBounds(this.cells);
    this.allCells = new mxDictionary();
    this.cloning = !1;
    for (b = this.cellCount = 0; b < this.cells.length; b++)
      this.cellCount += this.addStates(this.cells[b], this.allCells);
    if (this.guidesEnabled) {
      this.guide = new mxGuide(this.graph, this.getGuideStates());
      var e = this.graph.model.getParent(a),
        f = 2 > this.graph.model.getChildCount(e),
        g = new mxDictionary();
      a = this.graph.getOpposites(this.graph.getEdges(this.cell), this.cell);
      for (b = 0; b < a.length; b++)
        c = this.graph.view.getState(a[b]), null == c || g.get(c) || g.put(c, !0);
      this.guide.isStateIgnored = mxUtils.bind(this, function(k) {
        var l = this.graph.model.getParent(k.cell);
        return null != k.cell && (!this.cloning && this.isCellMoving(k.cell) || k.cell != (this.target || e) && !f && !g.get(k) && (null == this.target || 2 <= this.graph.model.getChildCount(this.target)) && l != (this.target || e));
      });
    }
  }
};
mxGraphHandler.prototype.addStates = function(a, b) {
  var c = this.graph.view.getState(a),
    d = 0;
  if (null != c && null == b.get(a)) {
    b.put(a, c);
    d++;
    c = this.graph.model.getChildCount(a);
    for (var e = 0; e < c; e++)
      d += this.addStates(this.graph.model.getChildAt(a, e), b);
  }
  return d;
};
mxGraphHandler.prototype.isCellMoving = function(a) {
  return null != this.allCells.get(a);
};
mxGraphHandler.prototype.useGuidesForEvent = function(a) {
  return null != this.guide ? this.guide.isEnabledForEvent(a.getEvent()) && !this.isConstrainedEvent(a) : !0;
};
mxGraphHandler.prototype.snap = function(a) {
  var b = this.scaleGrid ? this.graph.view.scale : 1;
  a.x = this.graph.snap(a.x / b) * b;
  a.y = this.graph.snap(a.y / b) * b;
  return a;
};
mxGraphHandler.prototype.getDelta = function(a) {
  a = mxUtils.convertPoint(this.graph.container, a.getX(), a.getY());
  return new mxPoint(a.x - this.first.x - this.graph.panDx, a.y - this.first.y - this.graph.panDy);
};
mxGraphHandler.prototype.updateHint = function(a) {};
mxGraphHandler.prototype.removeHint = function() {};
mxGraphHandler.prototype.roundLength = function(a) {
  return Math.round(100 * a) / 100;
};
mxGraphHandler.prototype.isValidDropTarget = function(a, b) {
  return this.graph.model.getParent(this.cell) != a;
};
mxGraphHandler.prototype.checkPreview = function() {
  this.livePreviewActive && this.cloning ? (this.resetLivePreview(), this.livePreviewActive = !1) : this.maxLivePreview >= this.cellCount && !this.livePreviewActive && this.allowLivePreview ? this.cloning && this.livePreviewActive || (this.livePreviewUsed = this.livePreviewActive = !0) : this.livePreviewUsed || null != this.shape || (this.shape = this.createPreviewShape(this.bounds));
};
mxGraphHandler.prototype.mouseMove = function(a, b) {
  a = this.graph;
  if (b.isConsumed() || !a.isMouseDown || null == this.cell || null == this.first || null == this.bounds || this.suspended)
    !this.isMoveEnabled() && !this.isCloneEnabled() || !this.updateCursor || b.isConsumed() || null == b.getState() && null == b.sourceState || a.isMouseDown || (c = a.getCursorForMouseEvent(b), null == c && a.isEnabled() && a.isCellMovable(b.getCell()) && (c = a.getModel().isEdge(b.getCell()) ? mxConstants.CURSOR_MOVABLE_EDGE : mxConstants.CURSOR_MOVABLE_VERTEX), null != c && null != b.sourceState && b.sourceState.setCursor(c));
  else if (mxEvent.isMultiTouchEvent(b.getEvent()))
    this.reset();
  else {
    var c = this.getDelta(b),
      d = a.tolerance;
    if (null != this.shape || this.livePreviewActive || Math.abs(c.x) > d || Math.abs(c.y) > d) {
      null == this.highlight && (this.highlight = new mxCellHighlight(this.graph, mxConstants.DROP_TARGET_COLOR, 3));
      d = a.isCloneEvent(b.getEvent()) && a.isCellsCloneable() && this.isCloneEnabled();
      var e = a.isGridEnabledEvent(b.getEvent()),
        f = b.getCell();
      f = null != f && 0 > mxUtils.indexOf(this.cells, f) ? f : a.getCellAt(b.getGraphX(), b.getGraphY(), null, null, null, mxUtils.bind(this, function(n, p, r) {
        return 0 <= mxUtils.indexOf(this.cells, n.cell);
      }));
      var g = !0,
        k = null;
      this.cloning = d;
      a.isDropEnabled() && this.highlightEnabled && (k = a.getDropTarget(this.cells, b.getEvent(), f, d));
      var l = a.getView().getState(k),
        m = !1;
      null != l && (d || this.isValidDropTarget(k, b)) ? (this.target != k && (this.target = k, this.setHighlightColor(mxConstants.DROP_TARGET_COLOR)), m = !0) : (this.target = null, this.connectOnDrop && null != f && 1 == this.cells.length && a.getModel().isVertex(f) && a.isCellConnectable(f) && (l = a.getView().getState(f), null != l && (a = null == a.getEdgeValidationError(null, this.cell, f) ? mxConstants.VALID_COLOR : mxConstants.INVALID_CONNECT_TARGET_COLOR, this.setHighlightColor(a), m = !0)));
      null != l && m ? this.highlight.highlight(l) : this.highlight.hide();
      null != this.guide && this.useGuidesForEvent(b) ? (c = this.guide.move(this.bounds, c, e, d), g = !1) : c = this.graph.snapDelta(c, this.bounds, !e, !1, !1);
      null != this.guide && g && this.guide.hide();
      this.isConstrainedEvent(b) && (Math.abs(c.x) > Math.abs(c.y) ? c.y = 0 : c.x = 0);
      this.checkPreview();
      if (this.currentDx != c.x || this.currentDy != c.y)
        this.currentDx = c.x, this.currentDy = c.y, this.updatePreview();
    }
    this.updateHint(b);
    this.consumeMouseEvent(mxEvent.MOUSE_MOVE, b);
    mxEvent.consume(b.getEvent());
  }
};
mxGraphHandler.prototype.isConstrainedEvent = function(a) {
  return (null == this.target || this.graph.isCloneEvent(a.getEvent())) && this.graph.isConstrainedEvent(a.getEvent());
};
mxGraphHandler.prototype.updatePreview = function(a) {
  this.livePreviewUsed && !a ? null != this.cells && (this.setHandlesVisibleForCells(this.graph.selectionCellsHandler.getHandledSelectionCells(), !1), this.updateLivePreview(this.currentDx, this.currentDy)) : this.updatePreviewShape();
};
mxGraphHandler.prototype.updatePreviewShape = function() {
  null != this.shape && null != this.pBounds && (this.shape.bounds = new mxRectangle(Math.round(this.pBounds.x + this.currentDx), Math.round(this.pBounds.y + this.currentDy), this.pBounds.width, this.pBounds.height), this.shape.redraw());
};
mxGraphHandler.prototype.updateLivePreview = function(a, b) {
  if (!this.suspended) {
    var c = [];
    null != this.allCells && this.allCells.visit(mxUtils.bind(this, function(n, p) {
      n = this.graph.view.getState(p.cell);
      n != p && (p.destroy(), null != n ? this.allCells.put(p.cell, n) : this.allCells.remove(p.cell), p = n);
      null != p && (n = p.clone(), c.push([
        p,
        n
      ]), null != p.shape && (null == p.shape.originalPointerEvents && (p.shape.originalPointerEvents = p.shape.pointerEvents), p.shape.pointerEvents = !1, null != p.text && (null == p.text.originalPointerEvents && (p.text.originalPointerEvents = p.text.pointerEvents), p.text.pointerEvents = !1)), this.graph.model.isVertex(p.cell)) && ((p.x += a, p.y += b, this.cloning) ? null != p.text && (p.text.updateBoundingBox(), null != p.text.boundingBox && (p.text.boundingBox.x += a, p.text.boundingBox.y += b), null != p.text.unrotatedBoundingBox && (p.text.unrotatedBoundingBox.x += a, p.text.unrotatedBoundingBox.y += b)) : (p.view.graph.cellRenderer.redraw(p, !0), p.view.invalidate(p.cell), p.invalid = !1, null != p.control && null != p.control.node && (p.control.node.style.visibility = 'hidden')));
    }));
    if (0 == c.length)
      this.reset();
    else {
      for (var d = this.graph.view.scale, e = 0; e < c.length; e++) {
        var f = c[e][0];
        if (this.graph.model.isEdge(f.cell)) {
          var g = this.graph.getCellGeometry(f.cell),
            k = [];
          if (null != g && null != g.points)
            for (var l = 0; l < g.points.length; l++)
              null != g.points[l] && k.push(new mxPoint(g.points[l].x + a / d, g.points[l].y + b / d));
          g = f.visibleSourceState;
          l = f.visibleTargetState;
          var m = c[e][1].absolutePoints;
          null != g && this.isCellMoving(g.cell) ? f.view.updateFixedTerminalPoint(f, g, !0, this.graph.getConnectionConstraint(f, g, !0)) : (g = m[0], f.setAbsoluteTerminalPoint(new mxPoint(g.x + a, g.y + b), !0), g = null);
          null != l && this.isCellMoving(l.cell) ? f.view.updateFixedTerminalPoint(f, l, !1, this.graph.getConnectionConstraint(f, l, !1)) : (l = m[m.length - 1], f.setAbsoluteTerminalPoint(new mxPoint(l.x + a, l.y + b), !1), l = null);
          f.view.updatePoints(f, k, g, l);
          f.view.updateFloatingTerminalPoints(f, g, l);
          f.view.updateEdgeLabelOffset(f);
          f.invalid = !1;
          this.cloning || f.view.graph.cellRenderer.redraw(f, !0);
        }
      }
      this.graph.view.validate();
      this.redrawHandles(c);
      this.resetPreviewStates(c);
    }
  }
};
mxGraphHandler.prototype.redrawHandles = function(a) {
  for (var b = 0; b < a.length; b++) {
    var c = this.graph.selectionCellsHandler.getHandler(a[b][0].cell);
    null != c && c.redraw(!0);
  }
};
mxGraphHandler.prototype.resetPreviewStates = function(a) {
  for (var b = 0; b < a.length; b++)
    a[b][0].setState(a[b][1]);
};
mxGraphHandler.prototype.suspend = function() {
  this.suspended || (this.livePreviewUsed && this.updateLivePreview(0, 0), null != this.shape && (this.shape.node.style.visibility = 'hidden'), null != this.guide && this.guide.setVisible(!1), this.suspended = !0);
};
mxGraphHandler.prototype.resume = function() {
  this.suspended && (this.suspended = null, this.livePreviewUsed && (this.livePreviewActive = !0), null != this.shape && (this.shape.node.style.visibility = 'visible'), null != this.guide && this.guide.setVisible(!0));
};
mxGraphHandler.prototype.resetLivePreview = function() {
  null != this.allCells && (this.allCells.visit(mxUtils.bind(this, function(a, b) {
    null != b.shape && null != b.shape.originalPointerEvents && (b.shape.pointerEvents = b.shape.originalPointerEvents, b.shape.originalPointerEvents = null, b.shape.bounds = null, null != b.text && (b.text.pointerEvents = b.text.originalPointerEvents, b.text.originalPointerEvents = null));
    null != b.control && null != b.control.node && 'hidden' == b.control.node.style.visibility && (b.control.node.style.visibility = '');
    this.cloning || null != b.text && b.text.updateBoundingBox();
    b.view.invalidate(b.cell);
  })), this.graph.view.validate());
};
mxGraphHandler.prototype.setHandlesVisibleForCells = function(a, b, c) {
  if (c || this.handlesVisible != b)
    for (this.handlesVisible = b, c = 0; c < a.length; c++) {
      var d = this.graph.selectionCellsHandler.getHandler(a[c]);
      null != d && (d.setHandlesVisible(b), b && d.redraw());
    }
};
mxGraphHandler.prototype.setHighlightColor = function(a) {
  null != this.highlight && this.highlight.setHighlightColor(a);
};
mxGraphHandler.prototype.mouseUp = function(a, b) {
  if (!b.isConsumed())
    if (this.livePreviewUsed && this.resetLivePreview(), null == this.cell || null == this.first || null == this.shape && !this.livePreviewUsed || null == this.currentDx || null == this.currentDy)
      this.isSelectEnabled() && this.delayedSelection && null != this.cell && this.selectDelayed(b);
    else {
      a = this.graph;
      var c = b.getCell();
      if (this.connectOnDrop && null == this.target && null != c && a.getModel().isVertex(c) && a.isCellConnectable(c) && a.isEdgeValid(null, this.cell, c))
        a.connectionHandler.connect(this.cell, c, b.getEvent());
      else {
        c = a.isCloneEvent(b.getEvent()) && a.isCellsCloneable() && this.isCloneEnabled();
        var d = a.getView().scale,
          e = this.roundLength(this.currentDx / d);
        d = this.roundLength(this.currentDy / d);
        var f = this.target;
        a.isSplitEnabled() && a.isSplitTarget(f, this.cells, b.getEvent()) ? a.splitEdge(f, this.cells, null, e, d, b.getGraphX(), b.getGraphY()) : this.moveCells(this.cells, e, d, c, this.target, b.getEvent());
      }
    }
  this.cellWasClicked && this.consumeMouseEvent(mxEvent.MOUSE_UP, b);
  this.reset();
};
mxGraphHandler.prototype.reset = function() {
  this.livePreviewUsed && (this.resetLivePreview(), this.setHandlesVisibleForCells(this.graph.selectionCellsHandler.getHandledSelectionCells(), !0));
  this.destroyShapes();
  this.removeHint();
  this.delayedSelection = !1;
  this.livePreviewUsed = this.livePreviewActive = null;
  this.cellWasClicked = !1;
  this.cellCount = this.currentDy = this.currentDx = this.suspended = null;
  this.cloning = !1;
  this.cell = this.cells = this.first = this.target = this.guides = this.pBounds = this.allCells = null;
};
mxGraphHandler.prototype.shouldRemoveCellsFromParent = function(a, b, c) {
  if (this.graph.getModel().isVertex(a) && (a = this.graph.getView().getState(a), null != a)) {
    c = mxUtils.convertPoint(this.graph.container, mxEvent.getClientX(c), mxEvent.getClientY(c));
    var d = mxUtils.toRadians(mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION) || 0);
    if (0 != d) {
      b = Math.cos(-d);
      d = Math.sin(-d);
      var e = new mxPoint(a.getCenterX(), a.getCenterY());
      c = mxUtils.getRotatedPoint(c, b, d, e);
    }
    return !mxUtils.contains(a, c.x, c.y);
  }
  return !1;
};
mxGraphHandler.prototype.moveCells = function(a, b, c, d, e, f) {
  d && (a = this.graph.getCloneableCells(a));
  var g = this.graph.getModel().getParent(this.cell);
  null == e && null != f && this.isRemoveCellsFromParent() && this.shouldRemoveCellsFromParent(g, a, f) && (e = this.graph.getDefaultParent());
  d = d && !this.graph.isCellLocked(e || this.graph.getDefaultParent());
  this.graph.getModel().beginUpdate();
  try {
    g = [];
    if (!d && null != e && this.removeEmptyParents) {
      for (var k = new mxDictionary(), l = 0; l < a.length; l++)
        k.put(a[l], !0);
      for (l = 0; l < a.length; l++) {
        var m = this.graph.model.getParent(a[l]);
        null == m || k.get(m) || (k.put(m, !0), g.push(m));
      }
    }
    a = this.graph.moveCells(a, b, c, d, e, f);
    b = [];
    for (l = 0; l < g.length; l++)
      this.shouldRemoveParent(g[l]) && b.push(g[l]);
    this.graph.removeCells(b, !1);
  } finally {
    this.graph.getModel().endUpdate();
  }
  d && this.graph.setSelectionCells(a);
  this.isSelectEnabled() && this.scrollOnMove && this.graph.scrollCellToVisible(a[0]);
};
mxGraphHandler.prototype.shouldRemoveParent = function(a) {
  a = this.graph.view.getState(a);
  return null != a && (this.graph.model.isEdge(a.cell) || this.graph.model.isVertex(a.cell)) && this.graph.isCellDeletable(a.cell) && 0 == this.graph.model.getChildCount(a.cell) && this.graph.isTransparentState(a);
};
mxGraphHandler.prototype.destroyShapes = function() {
  null != this.shape && (this.shape.destroy(), this.shape = null);
  null != this.guide && (this.guide.destroy(), this.guide = null);
  null != this.highlight && (this.highlight.destroy(), this.highlight = null);
};
mxGraphHandler.prototype.destroy = function() {
  this.graph.removeMouseListener(this);
  this.graph.removeListener(this.panHandler);
  null != this.escapeHandler && (this.graph.removeListener(this.escapeHandler), this.escapeHandler = null);
  null != this.refreshHandler && (this.graph.getModel().removeListener(this.refreshHandler), this.graph.removeListener(this.refreshHandler), this.refreshHandler = null);
  mxEvent.removeListener(document, 'keydown', this.keyHandler);
  mxEvent.removeListener(document, 'keyup', this.keyHandler);
  this.destroyShapes();
  this.removeHint();
};