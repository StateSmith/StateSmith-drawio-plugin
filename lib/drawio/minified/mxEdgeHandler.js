function mxEdgeHandler(a) {
  null != a && null != a.shape && (this.state = a, this.init(), this.escapeHandler = mxUtils.bind(this, function(b, c) {
    b = null != this.index;
    this.reset();
    b && this.graph.cellRenderer.redraw(this.state, !1, a.view.isRendering());
  }), this.state.view.graph.addListener(mxEvent.ESCAPE, this.escapeHandler));
}
mxEdgeHandler.prototype.graph = null;
mxEdgeHandler.prototype.state = null;
mxEdgeHandler.prototype.marker = null;
mxEdgeHandler.prototype.constraintHandler = null;
mxEdgeHandler.prototype.error = null;
mxEdgeHandler.prototype.shape = null;
mxEdgeHandler.prototype.bends = null;
mxEdgeHandler.prototype.labelShape = null;
mxEdgeHandler.prototype.cloneEnabled = !0;
mxEdgeHandler.prototype.addEnabled = !1;
mxEdgeHandler.prototype.removeEnabled = !1;
mxEdgeHandler.prototype.dblClickRemoveEnabled = !1;
mxEdgeHandler.prototype.mergeRemoveEnabled = !1;
mxEdgeHandler.prototype.straightRemoveEnabled = !1;
mxEdgeHandler.prototype.virtualBendsEnabled = !1;
mxEdgeHandler.prototype.virtualBendOpacity = 40;
mxEdgeHandler.prototype.parentHighlightEnabled = !1;
mxEdgeHandler.prototype.preferHtml = !1;
mxEdgeHandler.prototype.allowHandleBoundsCheck = !0;
mxEdgeHandler.prototype.snapToTerminals = !1;
mxEdgeHandler.prototype.handleImage = null;
mxEdgeHandler.prototype.tolerance = 0;
mxEdgeHandler.prototype.outlineConnect = !1;
mxEdgeHandler.prototype.manageLabelHandle = !1;
mxEdgeHandler.prototype.init = function() {
  this.graph = this.state.view.graph;
  this.marker = this.createMarker();
  this.constraintHandler = new mxConstraintHandler(this.graph);
  this.points = [];
  this.abspoints = this.getSelectionPoints(this.state);
  this.shape = this.createSelectionShape(this.abspoints);
  this.shape.dialect = this.graph.dialect != mxConstants.DIALECT_SVG ? mxConstants.DIALECT_MIXEDHTML : mxConstants.DIALECT_SVG;
  this.shape.init(this.graph.getView().getOverlayPane());
  this.shape.svgStrokeTolerance = 0;
  this.shape.pointerEvents = !1;
  mxEvent.redirectMouseEvents(this.shape.node, this.graph, this.state);
  this.graph.isCellMovable(this.state.cell) && this.shape.setCursor(mxConstants.CURSOR_MOVABLE_EDGE);
  this.preferHtml = null != this.state.text && this.state.text.node.parentNode == this.graph.container;
  if (!this.preferHtml) {
    var a = this.state.getVisibleTerminalState(!0);
    null != a && (this.preferHtml = null != a.text && a.text.node.parentNode == this.graph.container);
    this.preferHtml || (a = this.state.getVisibleTerminalState(!1), null != a && (this.preferHtml = null != a.text && a.text.node.parentNode == this.graph.container));
  }
  this.graph.isCellEditable(this.state.cell) && (this.graph.getSelectionCount() < mxGraphHandler.prototype.maxCells || 0 >= mxGraphHandler.prototype.maxCells) && (this.bends = this.createBends(), this.isVirtualBendsEnabled() && (this.virtualBends = this.createVirtualBends()));
  this.label = new mxPoint(this.state.absoluteOffset.x, this.state.absoluteOffset.y);
  this.labelShape = this.createLabelHandleShape();
  this.initBend(this.labelShape);
  this.graph.isCellEditable(this.state.cell) && (this.labelShape.setCursor(mxConstants.CURSOR_LABEL_HANDLE), this.customHandles = this.createCustomHandles());
  this.updateParentHighlight();
  this.redraw();
};
mxEdgeHandler.prototype.isParentHighlightVisible = mxVertexHandler.prototype.isParentHighlightVisible;
mxEdgeHandler.prototype.destroyParentHighlight = mxVertexHandler.prototype.destroyParentHighlight;
mxEdgeHandler.prototype.updateParentHighlight = mxVertexHandler.prototype.updateParentHighlight;
mxEdgeHandler.prototype.createCustomHandles = function() {
  return null;
};
mxEdgeHandler.prototype.isVirtualBendsEnabled = function(a) {
  return this.virtualBendsEnabled && (null == this.state.style[mxConstants.STYLE_EDGE] || this.state.style[mxConstants.STYLE_EDGE] == mxConstants.NONE || 1 == this.state.style[mxConstants.STYLE_NOEDGESTYLE]) && 'arrow' != mxUtils.getValue(this.state.style, mxConstants.STYLE_SHAPE, null);
};
mxEdgeHandler.prototype.isCellEnabled = function(a) {
  return !0;
};
mxEdgeHandler.prototype.isAddPointEvent = function(a) {
  return mxEvent.isShiftDown(a);
};
mxEdgeHandler.prototype.isRemovePointEvent = function(a) {
  return mxEvent.isShiftDown(a);
};
mxEdgeHandler.prototype.getSelectionPoints = function(a) {
  return a.absolutePoints;
};
mxEdgeHandler.prototype.createParentHighlightShape = function(a) {
  a = new mxRectangleShape(mxRectangle.fromRectangle(a), null, this.getSelectionColor());
  a.strokewidth = this.getSelectionStrokeWidth();
  a.isDashed = this.isSelectionDashed();
  return a;
};
mxEdgeHandler.prototype.createSelectionShape = function(a) {
  a = new this.state.shape.constructor();
  a.outline = !0;
  a.apply(this.state);
  a.isDashed = this.isSelectionDashed();
  a.stroke = this.getSelectionColor();
  a.isShadow = !1;
  return a;
};
mxEdgeHandler.prototype.getSelectionColor = function() {
  return this.graph.isCellEditable(this.state.cell) ? mxConstants.EDGE_SELECTION_COLOR : mxConstants.LOCKED_HANDLE_FILLCOLOR;
};
mxEdgeHandler.prototype.getSelectionStrokeWidth = function() {
  return mxConstants.EDGE_SELECTION_STROKEWIDTH;
};
mxEdgeHandler.prototype.isSelectionDashed = function() {
  return mxConstants.EDGE_SELECTION_DASHED;
};
mxEdgeHandler.prototype.isConnectableCell = function(a) {
  return !0;
};
mxEdgeHandler.prototype.getCellAt = function(a, b) {
  return this.outlineConnect ? null : this.graph.getCellAt(a, b);
};
mxEdgeHandler.prototype.createMarker = function() {
  var a = new mxCellMarker(this.graph),
    b = this;
  a.getCell = function(c) {
    var d = mxCellMarker.prototype.getCell.apply(this, arguments);
    d != b.state.cell && null != d || null == b.currentPoint || (d = b.graph.getCellAt(b.currentPoint.x, b.currentPoint.y));
    if (null != d && !this.graph.isCellConnectable(d)) {
      var e = this.graph.getModel().getParent(d);
      this.graph.getModel().isVertex(e) && this.graph.isCellConnectable(e) && (d = e);
    }
    e = b.graph.getModel();
    if (this.graph.isSwimlane(d) && null != b.currentPoint && this.graph.hitsSwimlaneContent(d, b.currentPoint.x, b.currentPoint.y) || !b.isConnectableCell(d) || d == b.state.cell || null != d && !b.graph.connectableEdges && e.isEdge(d) || e.isAncestor(b.state.cell, d))
      d = null;
    this.graph.isCellConnectable(d) || (d = null);
    return d;
  };
  a.isValidState = function(c) {
    var d = b.graph.getModel();
    d = b.graph.view.getTerminalPort(c, b.graph.view.getState(d.getTerminal(b.state.cell, !b.isSource)), !b.isSource);
    d = null != d ? d.cell : null;
    b.error = b.validateConnection(b.isSource ? c.cell : d, b.isSource ? d : c.cell);
    return null == b.error;
  };
  return a;
};
mxEdgeHandler.prototype.validateConnection = function(a, b) {
  return this.graph.getEdgeValidationError(this.state.cell, a, b);
};
mxEdgeHandler.prototype.createBends = function() {
  for (var a = this.state.cell, b = [], c = 0; c < this.abspoints.length; c++)
    if (this.isHandleVisible(c)) {
      var d = c == this.abspoints.length - 1,
        e = 0 == c || d;
      (e || this.graph.isCellBendable(a)) && mxUtils.bind(this, function(f) {
        var g = this.createHandleShape(f, null, f == this.abspoints.length - 1);
        this.initBend(g, mxUtils.bind(this, mxUtils.bind(this, function() {
          this.dblClickRemoveEnabled && this.removePoint(this.state, f);
        })));
        this.isHandleEnabled(c) && g.setCursor(e ? mxConstants.CURSOR_TERMINAL_HANDLE : mxConstants.CURSOR_BEND_HANDLE);
        b.push(g);
        e || (this.points.push(new mxPoint(0, 0)), g.node.style.visibility = 'hidden');
      })(c);
    }
  return b;
};
mxEdgeHandler.prototype.createVirtualBends = function() {
  var a = [];
  if (this.graph.isCellBendable(this.state.cell))
    for (var b = 1; b < this.abspoints.length; b++)
      mxUtils.bind(this, function(c) {
        this.initBend(c);
        c.setCursor(mxConstants.CURSOR_VIRTUAL_BEND_HANDLE);
        a.push(c);
      })(this.createHandleShape());
  return a;
};
mxEdgeHandler.prototype.isHandleEnabled = function(a) {
  return !0;
};
mxEdgeHandler.prototype.isHandleVisible = function(a) {
  var b = this.state.getVisibleTerminalState(!0),
    c = this.state.getVisibleTerminalState(!1),
    d = this.graph.getCellGeometry(this.state.cell);
  return (null != d ? this.graph.view.getEdgeStyle(this.state, d.points, b, c) : null) != mxEdgeStyle.EntityRelation || 0 == a || a == this.abspoints.length - 1;
};
mxEdgeHandler.prototype.createHandleShape = function(a) {
  if (null != this.handleImage)
    return a = new mxImageShape(new mxRectangle(0, 0, this.handleImage.width, this.handleImage.height), this.handleImage.src), a.preserveImageAspect = !1, a;
  a = mxConstants.HANDLE_SIZE;
  this.preferHtml && --a;
  return new mxRectangleShape(new mxRectangle(0, 0, a, a), mxConstants.HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR);
};
mxEdgeHandler.prototype.createLabelHandleShape = function() {
  if (null != this.labelHandleImage) {
    var a = new mxImageShape(new mxRectangle(0, 0, this.labelHandleImage.width, this.labelHandleImage.height), this.labelHandleImage.src);
    a.preserveImageAspect = !1;
    return a;
  }
  a = mxConstants.LABEL_HANDLE_SIZE;
  return new mxRectangleShape(new mxRectangle(0, 0, a, a), mxConstants.LABEL_HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR);
};
mxEdgeHandler.prototype.initBend = function(a, b) {
  this.preferHtml ? (a.dialect = mxConstants.DIALECT_STRICTHTML, a.init(this.graph.container)) : (a.dialect = this.graph.dialect != mxConstants.DIALECT_SVG ? mxConstants.DIALECT_MIXEDHTML : mxConstants.DIALECT_SVG, a.init(this.graph.getView().getOverlayPane()));
  mxEvent.redirectMouseEvents(a.node, this.graph, this.state, null, null, null, b);
  mxClient.IS_TOUCH && a.node.setAttribute('pointer-events', 'none');
};
mxEdgeHandler.prototype.getHandleForEvent = function(a, b) {
  var c = null;
  if (null != this.state) {
    var d = function(k) {
        if (null != k && (a.isSource(k) || k.intersectsRectangle(f, b))) {
          var l = a.getGraphX() - k.bounds.getCenterX();
          k = a.getGraphY() - k.bounds.getCenterY();
          l = l * l + k * k;
          if (null == g || l <= g)
            return g = l, !0;
        }
        return !1;
      },
      e = mxEvent.isMouseEvent(a.getEvent()) ? 1 : this.tolerance,
      f = this.allowHandleBoundsCheck && (mxClient.IS_IE || 0 < e) ? new mxRectangle(a.getGraphX() - e, a.getGraphY() - e, 2 * e, 2 * e) : null,
      g = null;
    if (null != this.customHandles && this.isCustomHandleEvent(a))
      for (e = this.customHandles.length - 1; 0 <= e; e--)
        if (d(this.customHandles[e].shape))
          return mxEvent.CUSTOM_HANDLE - e;
    if (a.isSource(this.state.text) || d(this.labelShape))
      c = mxEvent.LABEL_HANDLE;
    if (null != this.bends)
      for (e = 0; e < this.bends.length; e++)
        d(this.bends[e]) && (c = e);
    if (null != this.virtualBends && this.isAddVirtualBendEvent(a))
      for (e = 0; e < this.virtualBends.length; e++)
        d(this.virtualBends[e]) && (c = mxEvent.VIRTUAL_HANDLE - e);
  }
  return c;
};
mxEdgeHandler.prototype.isAddVirtualBendEvent = function(a) {
  return !0;
};
mxEdgeHandler.prototype.isCustomHandleEvent = function(a) {
  return !0;
};
mxEdgeHandler.prototype.mouseDown = function(a, b) {
  if (this.graph.isCellEditable(this.state.cell)) {
    a = this.getHandleForEvent(b);
    if (null != this.bends && null != this.bends[a]) {
      var c = this.bends[a].bounds;
      this.snapPoint = new mxPoint(c.getCenterX(), c.getCenterY());
    }
    if (this.addEnabled && null == a && this.isAddPointEvent(b.getEvent()))
      this.addPoint(this.state, b.getEvent()), b.consume();
    else if (null != a && !b.isConsumed() && this.graph.isEnabled()) {
      if (this.removeEnabled && this.isRemovePointEvent(b.getEvent()))
        this.removePoint(this.state, a);
      else if (a != mxEvent.LABEL_HANDLE || this.graph.isLabelMovable(b.getCell()))
        a <= mxEvent.VIRTUAL_HANDLE && mxUtils.setOpacity(this.virtualBends[mxEvent.VIRTUAL_HANDLE - a].node, 100), this.start(b.getX(), b.getY(), a);
      b.consume();
    }
  }
};
mxEdgeHandler.prototype.start = function(a, b, c) {
  this.startX = a;
  this.startY = b;
  this.isSource = null == this.bends ? !1 : 0 == c;
  this.isTarget = null == this.bends ? !1 : c == this.bends.length - 1;
  this.isLabel = c == mxEvent.LABEL_HANDLE;
  if (this.isSource || this.isTarget) {
    if (a = this.state.cell, b = this.graph.model.getTerminal(a, this.isSource), null == b && this.graph.isTerminalPointMovable(a, this.isSource) || null != b && this.graph.isCellDisconnectable(a, b, this.isSource))
      this.index = c;
  } else
    this.index = c;
  if (this.index <= mxEvent.CUSTOM_HANDLE && this.index > mxEvent.VIRTUAL_HANDLE && null != this.customHandles)
    for (c = 0; c < this.customHandles.length; c++)
      c != mxEvent.CUSTOM_HANDLE - this.index && this.customHandles[c].setVisible(!1);
};
mxEdgeHandler.prototype.clonePreviewState = function(a, b) {
  return this.state.clone();
};
mxEdgeHandler.prototype.getSnapToTerminalTolerance = function() {
  return 2;
};
mxEdgeHandler.prototype.updateHint = function(a, b) {};
mxEdgeHandler.prototype.removeHint = function() {};
mxEdgeHandler.prototype.roundLength = function(a) {
  return Math.round(a);
};
mxEdgeHandler.prototype.isSnapToTerminalsEvent = function(a) {
  return this.snapToTerminals && !mxEvent.isAltDown(a.getEvent());
};
mxEdgeHandler.prototype.getPointForEvent = function(a) {
  var b = this.graph.getView(),
    c = b.scale,
    d = new mxPoint(this.roundLength(a.getGraphX() / c) * c, this.roundLength(a.getGraphY() / c) * c),
    e = this.getSnapToTerminalTolerance(),
    f = !1,
    g = !1;
  if (0 < e && this.isSnapToTerminalsEvent(a)) {
    var k = function(n) {
        null != n && l.call(this, new mxPoint(b.getRoutingCenterX(n), b.getRoutingCenterY(n)));
      },
      l = function(n) {
        if (null != n) {
          var p = n.x;
          Math.abs(d.x - p) < e && (d.x = p, f = !0);
          n = n.y;
          Math.abs(d.y - n) < e && (d.y = n, g = !0);
        }
      };
    k.call(this, this.state.getVisibleTerminalState(!0));
    k.call(this, this.state.getVisibleTerminalState(!1));
    k = this.state.absolutePoints;
    if (null != k)
      for (var m = 0; m < k.length; m++)
        (0 < m || !this.state.isFloatingTerminalPoint(!0)) && (m < k.length - 1 || !this.state.isFloatingTerminalPoint(!1)) && l.call(this, this.state.absolutePoints[m]);
  }
  this.graph.isGridEnabledEvent(a.getEvent()) && (a = b.translate, f || (d.x = (this.graph.snap(d.x / c - a.x) + a.x) * c), g || (d.y = (this.graph.snap(d.y / c - a.y) + a.y) * c));
  return d;
};
mxEdgeHandler.prototype.getPreviewTerminalState = function(a) {
  this.constraintHandler.update(a, this.isSource, !0, a.isSource(this.marker.highlight.shape) ? null : this.currentPoint);
  if (null != this.constraintHandler.currentFocus && null != this.constraintHandler.currentConstraint)
    return null != this.marker.highlight && null != this.marker.highlight.state && this.marker.highlight.state.cell == this.constraintHandler.currentFocus.cell ? 'transparent' != this.marker.highlight.shape.stroke && (this.marker.highlight.shape.stroke = 'transparent', this.marker.highlight.repaint()) : this.marker.markCell(this.constraintHandler.currentFocus.cell, 'transparent'), a = this.graph.getModel(), a = this.graph.view.getTerminalPort(this.state, this.graph.view.getState(a.getTerminal(this.state.cell, !this.isSource)), !this.isSource), a = null != a ? a.cell : null, this.error = this.validateConnection(this.isSource ? this.constraintHandler.currentFocus.cell : a, this.isSource ? a : this.constraintHandler.currentFocus.cell), a = null, null == this.error && (a = this.constraintHandler.currentFocus), (null != this.error || null != a && !this.isCellEnabled(a.cell)) && this.constraintHandler.reset(), a;
  if (this.graph.isIgnoreTerminalEvent(a.getEvent()))
    return this.marker.reset(), null;
  this.marker.process(a);
  a = this.marker.getValidState();
  null == a || this.isCellEnabled(a.cell) || (this.constraintHandler.reset(), this.marker.reset());
  return this.marker.getValidState();
};
mxEdgeHandler.prototype.getPreviewPoints = function(a, b) {
  var c = this.graph.getCellGeometry(this.state.cell);
  c = null != c.points ? c.points.slice() : null;
  var d = new mxPoint(a.x, a.y),
    e = null;
  if (this.isSource || this.isTarget)
    this.graph.resetEdgesOnConnect && (c = null);
  else if (this.convertPoint(d, !1), null == c)
    c = [d];
  else {
    this.index <= mxEvent.VIRTUAL_HANDLE && c.splice(mxEvent.VIRTUAL_HANDLE - this.index, 0, d);
    if (!this.isSource && !this.isTarget) {
      for (var f = 0; f < this.bends.length; f++)
        if (f != this.index) {
          var g = this.bends[f];
          null != g && mxUtils.contains(g.bounds, a.x, a.y) && (this.index <= mxEvent.VIRTUAL_HANDLE ? c.splice(mxEvent.VIRTUAL_HANDLE - this.index, 1) : c.splice(this.index - 1, 1), e = c);
        }
      if (null == e && this.straightRemoveEnabled && (null == b || !mxEvent.isAltDown(b.getEvent()))) {
        b = this.graph.tolerance * this.graph.tolerance;
        f = this.state.absolutePoints.slice();
        f[this.index] = a;
        var k = this.state.getVisibleTerminalState(!0);
        null != k && (g = this.graph.getConnectionConstraint(this.state, k, !0), null == g || null == this.graph.getConnectionPoint(k, g)) && (f[0] = new mxPoint(k.view.getRoutingCenterX(k), k.view.getRoutingCenterY(k)));
        k = this.state.getVisibleTerminalState(!1);
        null != k && (g = this.graph.getConnectionConstraint(this.state, k, !1), null == g || null == this.graph.getConnectionPoint(k, g)) && (f[f.length - 1] = new mxPoint(k.view.getRoutingCenterX(k), k.view.getRoutingCenterY(k)));
        g = this.index;
        0 < g && g < f.length - 1 && mxUtils.ptSegDistSq(f[g - 1].x, f[g - 1].y, f[g + 1].x, f[g + 1].y, a.x, a.y) < b && (c.splice(g - 1, 1), e = c);
      }
    }
    null == e && this.index > mxEvent.VIRTUAL_HANDLE && (c[this.index - 1] = d);
  }
  return null != e ? e : c;
};
mxEdgeHandler.prototype.isOutlineConnectEvent = function(a) {
  if (mxEvent.isShiftDown(a.getEvent()) && mxEvent.isAltDown(a.getEvent()))
    return !1;
  var b = mxUtils.getOffset(this.graph.container),
    c = a.getEvent(),
    d = mxEvent.getClientX(c);
  c = mxEvent.getClientY(c);
  var e = document.documentElement,
    f = this.currentPoint.x - this.graph.container.scrollLeft + b.x - ((window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0));
  b = this.currentPoint.y - this.graph.container.scrollTop + b.y - ((window.pageYOffset || e.scrollTop) - (e.clientTop || 0));
  return this.outlineConnect && (mxEvent.isShiftDown(a.getEvent()) && !mxEvent.isAltDown(a.getEvent()) || a.isSource(this.marker.highlight.shape) || !mxEvent.isShiftDown(a.getEvent()) && mxEvent.isAltDown(a.getEvent()) && null != a.getState() || this.marker.highlight.isHighlightAt(d, c) || (f != d || b != c) && null == a.getState() && this.marker.highlight.isHighlightAt(f, b));
};
mxEdgeHandler.prototype.updatePreviewState = function(a, b, c, d, e) {
  var f = this.isSource ? c : this.state.getVisibleTerminalState(!0),
    g = this.isTarget ? c : this.state.getVisibleTerminalState(!1),
    k = this.graph.getConnectionConstraint(a, f, !0),
    l = this.graph.getConnectionConstraint(a, g, !1),
    m = this.constraintHandler.currentConstraint;
  null == m && e && (null != c ? (d.isSource(this.marker.highlight.shape) && (b = new mxPoint(d.getGraphX(), d.getGraphY())), m = this.graph.getOutlineConstraint(b, c, d), this.constraintHandler.setFocus(d, c, this.isSource), this.constraintHandler.currentConstraint = m, this.constraintHandler.currentPoint = b) : m = new mxConnectionConstraint());
  if (this.outlineConnect && null != this.marker.highlight && null != this.marker.highlight.shape) {
    var n = this.graph.view.scale;
    null != this.constraintHandler.currentConstraint && null != this.constraintHandler.currentFocus ? (this.marker.highlight.shape.stroke = e ? mxConstants.OUTLINE_HIGHLIGHT_COLOR : 'transparent', this.marker.highlight.shape.strokewidth = mxConstants.OUTLINE_HIGHLIGHT_STROKEWIDTH / n / n, this.marker.highlight.repaint()) : this.marker.hasValidState() && (this.marker.highlight.shape.stroke = this.graph.isCellConnectable(d.getCell()) && this.marker.getValidState() != d.getState() ? 'transparent' : mxConstants.DEFAULT_VALID_COLOR, this.marker.highlight.shape.strokewidth = mxConstants.HIGHLIGHT_STROKEWIDTH / n / n, this.marker.highlight.repaint());
  }
  this.isSource ? k = m : this.isTarget && (l = m);
  if (this.isSource || this.isTarget)
    null != m && null != m.point ? (a.style[this.isSource ? mxConstants.STYLE_EXIT_X : mxConstants.STYLE_ENTRY_X] = m.point.x, a.style[this.isSource ? mxConstants.STYLE_EXIT_Y : mxConstants.STYLE_ENTRY_Y] = m.point.y) : (delete a.style[this.isSource ? mxConstants.STYLE_EXIT_X : mxConstants.STYLE_ENTRY_X], delete a.style[this.isSource ? mxConstants.STYLE_EXIT_Y : mxConstants.STYLE_ENTRY_Y]);
  a.setVisibleTerminalState(f, !0);
  a.setVisibleTerminalState(g, !1);
  this.isSource && null == f || a.view.updateFixedTerminalPoint(a, f, !0, k);
  this.isTarget && null == g || a.view.updateFixedTerminalPoint(a, g, !1, l);
  (this.isSource || this.isTarget) && null == c && (a.setAbsoluteTerminalPoint(b, this.isSource), null == this.marker.getMarkedState() && (this.error = this.graph.allowDanglingEdges ? null : ''));
  a.view.updatePoints(a, this.points, f, g);
  a.view.updateFloatingTerminalPoints(a, f, g);
};
mxEdgeHandler.prototype.mouseMove = function(a, b) {
  if (null != this.index && null != this.marker) {
    this.currentPoint = this.getPointForEvent(b);
    this.error = null;
    null != this.snapPoint && mxEvent.isShiftDown(b.getEvent()) && !this.graph.isIgnoreTerminalEvent(b.getEvent()) && null == this.constraintHandler.currentFocus && this.constraintHandler.currentFocus != this.state && (Math.abs(this.snapPoint.x - this.currentPoint.x) < Math.abs(this.snapPoint.y - this.currentPoint.y) ? this.currentPoint.x = this.snapPoint.x : this.currentPoint.y = this.snapPoint.y);
    if (this.index <= mxEvent.CUSTOM_HANDLE && this.index > mxEvent.VIRTUAL_HANDLE)
      null != this.customHandles && (this.customHandles[mxEvent.CUSTOM_HANDLE - this.index].processEvent(b), this.customHandles[mxEvent.CUSTOM_HANDLE - this.index].positionChanged(), null != this.shape && null != this.shape.node && (this.shape.node.style.display = 'none'));
    else if (this.isLabel)
      this.label.x = this.currentPoint.x, this.label.y = this.currentPoint.y;
    else {
      this.points = this.getPreviewPoints(this.currentPoint, b);
      a = this.isSource || this.isTarget ? this.getPreviewTerminalState(b) : null;
      if (null != this.constraintHandler.currentConstraint && null != this.constraintHandler.currentFocus && null != this.constraintHandler.currentPoint)
        this.currentPoint = this.constraintHandler.currentPoint.clone();
      else if (this.outlineConnect) {
        var c = this.isSource || this.isTarget ? this.isOutlineConnectEvent(b) : !1;
        c ? a = this.marker.highlight.state : null != a && a != b.getState() && this.graph.isCellConnectable(b.getCell()) && null != this.marker.highlight.shape && (this.marker.highlight.shape.stroke = 'transparent', this.marker.highlight.repaint(), a = null);
      }
      null == a || this.isCellEnabled(a.cell) || (a = null, this.marker.reset());
      var d = this.clonePreviewState(this.currentPoint, null != a ? a.cell : null);
      this.updatePreviewState(d, this.currentPoint, a, b, c);
      this.setPreviewColor(null == this.error ? this.marker.validColor : this.marker.invalidColor);
      this.abspoints = d.absolutePoints;
      this.active = !0;
      this.updateHint(b, this.currentPoint);
    }
    this.drawPreview();
    mxEvent.consume(b.getEvent());
    b.consume();
  } else
    mxClient.IS_IE && null != this.getHandleForEvent(b) && b.consume(!1);
};
mxEdgeHandler.prototype.mouseUp = function(a, b) {
  if (null != this.index && null != this.marker) {
    null != this.shape && null != this.shape.node && (this.shape.node.style.display = '');
    a = this.state.cell;
    var c = this.index;
    this.index = null;
    if (b.getX() != this.startX || b.getY() != this.startY) {
      var d = !this.graph.isIgnoreTerminalEvent(b.getEvent()) && this.graph.isCloneEvent(b.getEvent()) && this.cloneEnabled && this.graph.isCellsCloneable();
      if (null != this.error)
        0 < this.error.length && this.graph.validationAlert(this.error);
      else if (c <= mxEvent.CUSTOM_HANDLE && c > mxEvent.VIRTUAL_HANDLE) {
        if (null != this.customHandles) {
          var e = this.graph.getModel();
          e.beginUpdate();
          try {
            this.customHandles[mxEvent.CUSTOM_HANDLE - c].execute(b), null != this.shape && null != this.shape.node && (this.shape.apply(this.state), this.shape.redraw());
          } finally {
            e.endUpdate();
          }
        }
      } else if (this.isLabel)
        this.moveLabel(this.state, this.label.x, this.label.y);
      else if (this.isSource || this.isTarget)
        if (c = null, null != this.constraintHandler.currentConstraint && null != this.constraintHandler.currentFocus && (c = this.constraintHandler.currentFocus.cell), null == c && this.marker.hasValidState() && null != this.marker.highlight && null != this.marker.highlight.shape && 'transparent' != this.marker.highlight.shape.stroke && 'white' != this.marker.highlight.shape.stroke && (c = this.marker.validState.cell), null != c) {
          e = this.graph.getModel();
          var f = e.getParent(a);
          e.beginUpdate();
          try {
            if (d) {
              var g = e.getGeometry(a);
              d = this.graph.cloneCell(a);
              e.add(f, d, e.getChildCount(f));
              null != g && (g = g.clone(), e.setGeometry(d, g));
              var k = e.getTerminal(a, !this.isSource);
              this.graph.connectCell(d, k, !this.isSource);
              a = d;
            }
            a = this.connect(a, c, this.isSource, d, b);
          } finally {
            e.endUpdate();
          }
        } else
          this.graph.isAllowDanglingEdges() && (g = this.abspoints[this.isSource ? 0 : this.abspoints.length - 1], g.x = this.roundLength(g.x / this.graph.view.scale - this.graph.view.translate.x), g.y = this.roundLength(g.y / this.graph.view.scale - this.graph.view.translate.y), k = this.graph.getView().getState(this.graph.getModel().getParent(a)), null != k && (g.x -= k.origin.x, g.y -= k.origin.y), g.x -= this.graph.panDx / this.graph.view.scale, g.y -= this.graph.panDy / this.graph.view.scale, a = this.changeTerminalPoint(a, g, this.isSource, d));
      else
        this.active ? a = this.changePoints(a, this.points, d) : (this.graph.getView().invalidate(this.state.cell), this.graph.getView().validate(this.state.cell));
    } else
      this.graph.isToggleEvent(b.getEvent()) && this.graph.selectCellForEvent(this.state.cell, b.getEvent());
    null != this.marker && (this.reset(), a != this.state.cell && this.graph.setSelectionCell(a));
    b.consume();
  }
};
mxEdgeHandler.prototype.reset = function() {
  this.active && this.refresh();
  this.snapPoint = this.points = this.label = this.index = this.error = null;
  this.active = this.isTarget = this.isSource = this.isLabel = !1;
  if (this.livePreview && null != this.sizers)
    for (var a = 0; a < this.sizers.length; a++)
      null != this.sizers[a] && (this.sizers[a].node.style.display = '');
  null != this.marker && this.marker.reset();
  null != this.constraintHandler && this.constraintHandler.reset();
  if (null != this.customHandles)
    for (a = 0; a < this.customHandles.length; a++)
      this.customHandles[a].reset();
  this.setPreviewColor(mxConstants.EDGE_SELECTION_COLOR);
  this.removeHint();
  this.redraw();
};
mxEdgeHandler.prototype.setPreviewColor = function(a) {
  null != this.shape && (this.shape.stroke = a);
};
mxEdgeHandler.prototype.convertPoint = function(a, b) {
  var c = this.graph.getView().getScale(),
    d = this.graph.getView().getTranslate();
  b && (a.x = this.graph.snap(a.x), a.y = this.graph.snap(a.y));
  a.x = Math.round(a.x / c - d.x);
  a.y = Math.round(a.y / c - d.y);
  b = this.graph.getView().getState(this.graph.getModel().getParent(this.state.cell));
  null != b && (a.x -= b.origin.x, a.y -= b.origin.y);
  return a;
};
mxEdgeHandler.prototype.moveLabel = function(a, b, c) {
  var d = this.graph.getModel(),
    e = d.getGeometry(a.cell);
  if (null != e) {
    var f = this.graph.getView().scale;
    e = e.clone();
    if (e.relative) {
      var g = this.graph.getView().getRelativePoint(a, b, c);
      e.x = Math.round(10000 * g.x) / 10000;
      e.y = Math.round(g.y);
      e.offset = new mxPoint(0, 0);
      g = this.graph.view.getPoint(a, e);
      e.offset = new mxPoint(Math.round((b - g.x) / f), Math.round((c - g.y) / f));
    } else {
      var k = a.absolutePoints;
      g = k[0];
      k = k[k.length - 1];
      null != g && null != k && (e.offset = new mxPoint(Math.round((b - (g.x + (k.x - g.x) / 2)) / f), Math.round((c - (g.y + (k.y - g.y) / 2)) / f)), e.x = 0, e.y = 0);
    }
    d.setGeometry(a.cell, e);
  }
};
mxEdgeHandler.prototype.connect = function(a, b, c, d, e) {
  d = this.graph.getModel();
  d.getParent(a);
  d.beginUpdate();
  try {
    var f = this.constraintHandler.currentConstraint;
    null == f && (f = new mxConnectionConstraint());
    this.graph.connectCell(a, b, c, f);
  } finally {
    d.endUpdate();
  }
  return a;
};
mxEdgeHandler.prototype.changeTerminalPoint = function(a, b, c, d) {
  var e = this.graph.getModel();
  e.beginUpdate();
  try {
    if (d) {
      var f = e.getParent(a),
        g = e.getTerminal(a, !c);
      a = this.graph.cloneCell(a);
      e.add(f, a, e.getChildCount(f));
      e.setTerminal(a, g, !c);
    }
    var k = e.getGeometry(a);
    null != k && (k = k.clone(), k.setTerminalPoint(b, c), e.setGeometry(a, k), this.graph.connectCell(a, null, c, new mxConnectionConstraint()));
  } finally {
    e.endUpdate();
  }
  return a;
};
mxEdgeHandler.prototype.changePoints = function(a, b, c) {
  var d = this.graph.getModel();
  d.beginUpdate();
  try {
    if (c) {
      var e = d.getParent(a),
        f = d.getTerminal(a, !0),
        g = d.getTerminal(a, !1);
      a = this.graph.cloneCell(a);
      d.add(e, a, d.getChildCount(e));
      d.setTerminal(a, f, !0);
      d.setTerminal(a, g, !1);
    }
    var k = d.getGeometry(a);
    null != k && (k = k.clone(), k.points = b, d.setGeometry(a, k));
  } finally {
    d.endUpdate();
  }
  return a;
};
mxEdgeHandler.prototype.addPoint = function(a, b) {
  var c = mxUtils.convertPoint(this.graph.container, mxEvent.getClientX(b), mxEvent.getClientY(b)),
    d = this.graph.isGridEnabledEvent(b);
  this.convertPoint(c, d);
  this.addPointAt(a, c.x, c.y);
  mxEvent.consume(b);
};
mxEdgeHandler.prototype.addPointAt = function(a, b, c) {
  var d = this.graph.getCellGeometry(a.cell);
  b = new mxPoint(b, c);
  if (null != d) {
    d = d.clone();
    var e = this.graph.view.translate;
    c = this.graph.view.scale;
    e = new mxPoint(e.x * c, e.y * c);
    var f = this.graph.model.getParent(this.state.cell);
    this.graph.model.isVertex(f) && (e = this.graph.view.getState(f), e = new mxPoint(e.x, e.y));
    c = mxUtils.findNearestSegment(a, b.x * c + e.x, b.y * c + e.y);
    null == d.points ? d.points = [b] : d.points.splice(c, 0, b);
    this.graph.getModel().setGeometry(a.cell, d);
    this.refresh();
    this.redraw();
  }
};
mxEdgeHandler.prototype.removePoint = function(a, b) {
  if (0 < b && b < this.abspoints.length - 1) {
    var c = this.graph.getCellGeometry(this.state.cell);
    null != c && null != c.points && (c = c.clone(), c.points.splice(b - 1, 1), this.graph.getModel().setGeometry(a.cell, c), this.refresh(), this.redraw());
  }
};
mxEdgeHandler.prototype.getHandleFillColor = function(a) {
  a = 0 == a;
  var b = this.state.cell,
    c = this.graph.getModel().getTerminal(b, a),
    d = mxConstants.HANDLE_FILLCOLOR;
  null != c && !this.graph.isCellDisconnectable(b, c, a) || null == c && !this.graph.isTerminalPointMovable(b, a) ? d = mxConstants.LOCKED_HANDLE_FILLCOLOR : null != c && this.graph.isCellDisconnectable(b, c, a) && (d = mxConstants.CONNECT_HANDLE_FILLCOLOR);
  return d;
};
mxEdgeHandler.prototype.redraw = function(a) {
  if (null != this.state) {
    this.abspoints = this.state.absolutePoints.slice();
    var b = this.graph.getModel().getGeometry(this.state.cell);
    if (null != b && (b = b.points, null != this.bends && 0 < this.bends.length && null != b)) {
      null == this.points && (this.points = []);
      for (var c = 1; c < this.bends.length - 1; c++)
        null != this.bends[c] && null != this.abspoints[c] && (this.points[c - 1] = b[c - 1]);
    }
    this.drawPreview();
    a || this.redrawHandles();
  }
};
mxEdgeHandler.prototype.redrawHandles = function() {
  var a = this.state.cell,
    b = this.labelShape.bounds;
  this.label = new mxPoint(this.state.absoluteOffset.x, this.state.absoluteOffset.y);
  this.labelShape.bounds = new mxRectangle(Math.round(this.label.x - b.width / 2), Math.round(this.label.y - b.height / 2), b.width, b.height);
  b = this.graph.getLabel(a);
  this.labelShape.visible = null != b && 0 < b.length && this.graph.isCellEditable(this.state.cell) && this.graph.isLabelMovable(a);
  if (null != this.bends && 0 < this.bends.length) {
    var c = this.abspoints.length - 1;
    a = this.abspoints[0];
    var d = a.x,
      e = a.y;
    b = this.bends[0].bounds;
    this.bends[0].bounds = new mxRectangle(Math.floor(d - b.width / 2), Math.floor(e - b.height / 2), b.width, b.height);
    this.bends[0].fill = this.getHandleFillColor(0);
    this.bends[0].redraw();
    this.manageLabelHandle && this.checkLabelHandle(this.bends[0].bounds);
    c = this.abspoints[c];
    d = c.x;
    e = c.y;
    var f = this.bends.length - 1;
    b = this.bends[f].bounds;
    this.bends[f].bounds = new mxRectangle(Math.floor(d - b.width / 2), Math.floor(e - b.height / 2), b.width, b.height);
    this.bends[f].fill = this.getHandleFillColor(f);
    this.bends[f].redraw();
    this.manageLabelHandle && this.checkLabelHandle(this.bends[f].bounds);
    this.redrawInnerBends(a, c);
  }
  if (null != this.abspoints && null != this.virtualBends && 0 < this.virtualBends.length)
    for (c = this.abspoints[0], a = 0; a < this.virtualBends.length; a++)
      null != this.virtualBends[a] && null != this.abspoints[a + 1] && (d = this.abspoints[a + 1], b = this.virtualBends[a], b.bounds = new mxRectangle(Math.floor(c.x + (d.x - c.x) / 2 - b.bounds.width / 2), Math.floor(c.y + (d.y - c.y) / 2 - b.bounds.height / 2), b.bounds.width, b.bounds.height), b.redraw(), mxUtils.setOpacity(b.node, this.virtualBendOpacity), c = d, this.manageLabelHandle && this.checkLabelHandle(b.bounds));
  null != this.labelShape && this.labelShape.redraw();
  if (null != this.customHandles)
    for (a = 0; a < this.customHandles.length; a++)
      b = this.customHandles[a].shape.node.style.display, this.customHandles[a].redraw(), this.customHandles[a].shape.node.style.display = b, this.customHandles[a].shape.node.style.visibility = this.isCustomHandleVisible(this.customHandles[a]) ? '' : 'hidden';
};
mxEdgeHandler.prototype.isCustomHandleVisible = function(a) {
  return !this.graph.isEditing() && 1 == this.state.view.graph.getSelectionCount();
};
mxEdgeHandler.prototype.setHandlesVisible = function(a) {
  if (null != this.bends)
    for (var b = 0; b < this.bends.length; b++)
      this.bends[b].node.style.display = a ? '' : 'none';
  if (null != this.virtualBends)
    for (b = 0; b < this.virtualBends.length; b++)
      this.virtualBends[b].node.style.display = a ? '' : 'none';
  null != this.labelShape && (this.labelShape.node.style.display = a ? '' : 'none');
  if (null != this.customHandles)
    for (b = 0; b < this.customHandles.length; b++)
      this.customHandles[b].setVisible(a);
};
mxEdgeHandler.prototype.redrawInnerBends = function(a, b) {
  for (a = 1; a < this.bends.length - 1; a++)
    if (null != this.bends[a])
      if (null != this.abspoints[a]) {
        b = this.abspoints[a].x;
        var c = this.abspoints[a].y,
          d = this.bends[a].bounds;
        this.bends[a].node.style.visibility = 'visible';
        this.bends[a].bounds = new mxRectangle(Math.round(b - d.width / 2), Math.round(c - d.height / 2), d.width, d.height);
        this.manageLabelHandle ? this.checkLabelHandle(this.bends[a].bounds) : null == this.handleImage && this.labelShape.visible && mxUtils.intersects(this.bends[a].bounds, this.labelShape.bounds) && (w = mxConstants.HANDLE_SIZE + 3, h = mxConstants.HANDLE_SIZE + 3, this.bends[a].bounds = new mxRectangle(Math.round(b - w / 2), Math.round(c - h / 2), w, h));
        this.bends[a].redraw();
      } else
        this.bends[a].destroy(), this.bends[a] = null;
};
mxEdgeHandler.prototype.checkLabelHandle = function(a) {
  if (null != this.labelShape) {
    var b = this.labelShape.bounds;
    mxUtils.intersects(a, b) && (a.getCenterY() < b.getCenterY() ? b.y = a.y + a.height : b.y = a.y - b.height);
  }
};
mxEdgeHandler.prototype.drawPreview = function() {
  try {
    if (this.isLabel) {
      var a = this.labelShape.bounds,
        b = new mxRectangle(Math.round(this.label.x - a.width / 2), Math.round(this.label.y - a.height / 2), a.width, a.height);
      this.labelShape.bounds.equals(b) || (this.labelShape.bounds = b, this.labelShape.redraw());
    }
    null == this.shape || mxUtils.equalPoints(this.shape.points, this.abspoints) || (this.shape.apply(this.state), this.shape.points = this.abspoints.slice(), this.shape.scale = this.state.view.scale, this.shape.isDashed = this.isSelectionDashed(), this.shape.stroke = this.getSelectionColor(), this.shape.strokewidth = this.getSelectionStrokeWidth() / this.shape.scale / this.shape.scale, this.shape.isShadow = !1, this.shape.redraw());
    this.updateParentHighlight();
  } catch (c) {}
};
mxEdgeHandler.prototype.refresh = function() {
  null != this.state && (this.abspoints = this.getSelectionPoints(this.state), this.points = [], null != this.bends && (this.destroyBends(this.bends), this.bends = this.createBends()), null != this.virtualBends && (this.destroyBends(this.virtualBends), this.virtualBends = this.createVirtualBends()), null != this.customHandles && (this.destroyBends(this.customHandles), this.customHandles = this.createCustomHandles()), null != this.labelShape && null != this.labelShape.node && null != this.labelShape.node.parentNode && this.labelShape.node.parentNode.appendChild(this.labelShape.node));
};
mxEdgeHandler.prototype.isDestroyed = function() {
  return null == this.shape;
};
mxEdgeHandler.prototype.destroyBends = function(a) {
  if (null != a)
    for (var b = 0; b < a.length; b++)
      null != a[b] && a[b].destroy();
};
mxEdgeHandler.prototype.destroy = function() {
  null != this.escapeHandler && (this.state.view.graph.removeListener(this.escapeHandler), this.escapeHandler = null);
  null != this.marker && (this.marker.destroy(), this.marker = null);
  null != this.shape && (this.shape.destroy(), this.shape = null);
  null != this.labelShape && (this.labelShape.destroy(), this.labelShape = null);
  null != this.constraintHandler && (this.constraintHandler.destroy(), this.constraintHandler = null);
  null != this.parentHighlight && this.destroyParentHighlight();
  this.destroyBends(this.virtualBends);
  this.virtualBends = null;
  this.destroyBends(this.customHandles);
  this.customHandles = null;
  this.destroyBends(this.bends);
  this.bends = null;
  this.removeHint();
};