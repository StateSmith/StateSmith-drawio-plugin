function mxConnectionHandler(a, b) {
  mxEventSource.call(this);
  null != a && (this.graph = a, this.factoryMethod = b, this.init(), this.escapeHandler = mxUtils.bind(this, function(c, d) {
    this.reset();
  }), this.graph.addListener(mxEvent.ESCAPE, this.escapeHandler));
}
mxUtils.extend(mxConnectionHandler, mxEventSource);
mxConnectionHandler.prototype.graph = null;
mxConnectionHandler.prototype.factoryMethod = !0;
mxConnectionHandler.prototype.moveIconFront = !1;
mxConnectionHandler.prototype.moveIconBack = !1;
mxConnectionHandler.prototype.connectImage = null;
mxConnectionHandler.prototype.targetConnectImage = !1;
mxConnectionHandler.prototype.enabled = !0;
mxConnectionHandler.prototype.select = !0;
mxConnectionHandler.prototype.createTarget = !1;
mxConnectionHandler.prototype.marker = null;
mxConnectionHandler.prototype.constraintHandler = null;
mxConnectionHandler.prototype.error = null;
mxConnectionHandler.prototype.waypointsEnabled = !1;
mxConnectionHandler.prototype.ignoreMouseDown = !1;
mxConnectionHandler.prototype.first = null;
mxConnectionHandler.prototype.connectIconOffset = new mxPoint(0, mxConstants.TOOLTIP_VERTICAL_OFFSET);
mxConnectionHandler.prototype.edgeState = null;
mxConnectionHandler.prototype.changeHandler = null;
mxConnectionHandler.prototype.drillHandler = null;
mxConnectionHandler.prototype.mouseDownCounter = 0;
mxConnectionHandler.prototype.movePreviewAway = !1;
mxConnectionHandler.prototype.outlineConnect = !1;
mxConnectionHandler.prototype.livePreview = !1;
mxConnectionHandler.prototype.cursor = null;
mxConnectionHandler.prototype.insertBeforeSource = !1;
mxConnectionHandler.prototype.isEnabled = function() {
  return this.enabled;
};
mxConnectionHandler.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxConnectionHandler.prototype.isInsertBefore = function(a, b, c, d, e) {
  return this.insertBeforeSource && b != c;
};
mxConnectionHandler.prototype.isCreateTarget = function(a) {
  return this.createTarget;
};
mxConnectionHandler.prototype.setCreateTarget = function(a) {
  this.createTarget = a;
};
mxConnectionHandler.prototype.createShape = function() {
  var a = this.livePreview && null != this.edgeState ? this.graph.cellRenderer.createShape(this.edgeState) : new mxPolyline([], mxConstants.INVALID_COLOR);
  a.dialect = mxConstants.DIALECT_SVG;
  a.scale = this.graph.view.scale;
  a.svgStrokeTolerance = 0;
  a.pointerEvents = !1;
  a.isDashed = !0;
  a.init(this.graph.getView().getOverlayPane());
  mxEvent.redirectMouseEvents(a.node, this.graph, null);
  return a;
};
mxConnectionHandler.prototype.init = function() {
  this.graph.addMouseListener(this);
  this.marker = this.createMarker();
  this.constraintHandler = new mxConstraintHandler(this.graph);
  this.changeHandler = mxUtils.bind(this, function(a) {
    null != this.iconState && (this.iconState = this.graph.getView().getState(this.iconState.cell));
    null != this.iconState ? (this.redrawIcons(this.icons, this.iconState), this.constraintHandler.reset()) : null != this.previous && null == this.graph.view.getState(this.previous.cell) && this.reset();
  });
  this.graph.getModel().addListener(mxEvent.CHANGE, this.changeHandler);
  this.graph.getView().addListener(mxEvent.SCALE, this.changeHandler);
  this.graph.getView().addListener(mxEvent.TRANSLATE, this.changeHandler);
  this.graph.getView().addListener(mxEvent.SCALE_AND_TRANSLATE, this.changeHandler);
  this.drillHandler = mxUtils.bind(this, function(a) {
    this.reset();
  });
  this.graph.addListener(mxEvent.START_EDITING, this.drillHandler);
  this.graph.getView().addListener(mxEvent.DOWN, this.drillHandler);
  this.graph.getView().addListener(mxEvent.UP, this.drillHandler);
};
mxConnectionHandler.prototype.isConnectableCell = function(a) {
  return !0;
};
mxConnectionHandler.prototype.createMarker = function() {
  var a = new mxCellMarker(this.graph);
  a.hotspotEnabled = !0;
  a.getCell = mxUtils.bind(this, function(b) {
    var c = mxCellMarker.prototype.getCell.apply(a, arguments);
    this.error = null;
    null == c && null != this.currentPoint && (c = this.graph.getCellAt(this.currentPoint.x, this.currentPoint.y));
    if (null != c && !this.graph.isCellConnectable(c)) {
      var d = this.graph.getModel().getParent(c);
      this.graph.getModel().isVertex(d) && this.graph.isCellConnectable(d) && (c = d);
    }
    if (this.graph.isSwimlane(c) && null != this.currentPoint && this.graph.hitsSwimlaneContent(c, this.currentPoint.x, this.currentPoint.y) || !this.isConnectableCell(c))
      c = null;
    null != c ? this.isConnecting() ? null != this.previous && (this.error = this.validateConnection(this.previous.cell, c), null != this.error && 0 == this.error.length && (c = null, this.isCreateTarget(b.getEvent()) && (this.error = null))) : this.isValidSource(c, b) || (c = null) : !this.isConnecting() || this.isCreateTarget(b.getEvent()) || this.graph.allowDanglingEdges || (this.error = '');
    return c;
  });
  a.isValidState = mxUtils.bind(this, function(b) {
    return this.isConnecting() ? null == this.error : mxCellMarker.prototype.isValidState.apply(a, arguments);
  });
  a.getMarkerColor = mxUtils.bind(this, function(b, c, d) {
    return null == this.connectImage || this.isConnecting() ? mxCellMarker.prototype.getMarkerColor.apply(a, arguments) : null;
  });
  a.intersects = mxUtils.bind(this, function(b, c) {
    return null != this.connectImage || this.isConnecting() ? !0 : mxCellMarker.prototype.intersects.apply(a, arguments);
  });
  return a;
};
mxConnectionHandler.prototype.start = function(a, b, c, d) {
  this.previous = a;
  this.first = new mxPoint(b, c);
  this.edgeState = null != d ? d : this.createEdgeState(null);
  this.marker.currentColor = this.marker.validColor;
  this.marker.markedState = a;
  this.marker.mark();
  this.fireEvent(new mxEventObject(mxEvent.START, 'state', this.previous));
};
mxConnectionHandler.prototype.isConnecting = function() {
  return null != this.first && null != this.shape;
};
mxConnectionHandler.prototype.isValidSource = function(a, b) {
  return this.graph.isValidSource(a);
};
mxConnectionHandler.prototype.isValidTarget = function(a) {
  return !0;
};
mxConnectionHandler.prototype.validateConnection = function(a, b) {
  return this.isValidTarget(b) ? this.graph.getEdgeValidationError(null, a, b) : '';
};
mxConnectionHandler.prototype.getConnectImage = function(a) {
  return this.connectImage;
};
mxConnectionHandler.prototype.isMoveIconToFrontForState = function(a) {
  return null != a.text && a.text.node.parentNode == this.graph.container ? !0 : this.moveIconFront;
};
mxConnectionHandler.prototype.createIcons = function(a) {
  var b = this.getConnectImage(a);
  if (null != b && null != a) {
    this.iconState = a;
    var c = [],
      d = new mxRectangle(0, 0, b.width, b.height),
      e = new mxImageShape(d, b.src, null, null, 0);
    e.preserveImageAspect = !1;
    this.isMoveIconToFrontForState(a) ? (e.dialect = mxConstants.DIALECT_STRICTHTML, e.init(this.graph.container)) : (e.dialect = mxConstants.DIALECT_SVG, e.init(this.graph.getView().getOverlayPane()), this.moveIconBack && null != e.node.previousSibling && e.node.parentNode.insertBefore(e.node, e.node.parentNode.firstChild));
    e.node.style.cursor = mxConstants.CURSOR_CONNECT;
    var f = mxUtils.bind(this, function() {
      return null != this.currentState ? this.currentState : a;
    });
    b = mxUtils.bind(this, function(g) {
      mxEvent.isConsumed(g) || (this.icon = e, this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(g, f())));
    });
    mxEvent.redirectMouseEvents(e.node, this.graph, f, b);
    c.push(e);
    this.redrawIcons(c, this.iconState);
    return c;
  }
  return null;
};
mxConnectionHandler.prototype.redrawIcons = function(a, b) {
  null != a && null != a[0] && null != b && (b = this.getIconPosition(a[0], b), a[0].bounds.x = b.x, a[0].bounds.y = b.y, a[0].redraw());
};
mxConnectionHandler.prototype.getIconPosition = function(a, b) {
  var c = this.graph.getView().scale,
    d = b.getCenterX(),
    e = b.getCenterY();
  if (this.graph.isSwimlane(b.cell)) {
    var f = this.graph.getStartSize(b.cell);
    d = 0 != f.width ? b.x + f.width * c / 2 : d;
    e = 0 != f.height ? b.y + f.height * c / 2 : e;
    f = mxUtils.toRadians(mxUtils.getValue(b.style, mxConstants.STYLE_ROTATION) || 0);
    0 != f && (c = Math.cos(f), f = Math.sin(f), b = new mxPoint(b.getCenterX(), b.getCenterY()), e = mxUtils.getRotatedPoint(new mxPoint(d, e), c, f, b), d = e.x, e = e.y);
  }
  return new mxPoint(d - a.bounds.width / 2, e - a.bounds.height / 2);
};
mxConnectionHandler.prototype.destroyIcons = function() {
  if (null != this.icons) {
    for (var a = 0; a < this.icons.length; a++)
      this.icons[a].destroy();
    this.iconState = this.selectedIcon = this.icon = this.icons = null;
  }
};
mxConnectionHandler.prototype.isStartEvent = function(a) {
  return null != this.constraintHandler.currentFocus && null != this.constraintHandler.currentConstraint || null != this.previous && null == this.error && (null == this.icons || null != this.icons && null != this.icon);
};
mxConnectionHandler.prototype.mouseDown = function(a, b) {
  this.mouseDownCounter++;
  this.isEnabled() && this.graph.isEnabled() && !b.isConsumed() && !this.isConnecting() && this.isStartEvent(b) && (null != this.constraintHandler.currentConstraint && null != this.constraintHandler.currentFocus && null != this.constraintHandler.currentPoint ? (this.sourceConstraint = this.constraintHandler.currentConstraint, this.previous = this.constraintHandler.currentFocus, this.first = this.constraintHandler.currentPoint.clone()) : this.first = new mxPoint(b.getGraphX(), b.getGraphY()), this.edgeState = this.createEdgeState(b), this.mouseDownCounter = 1, this.waypointsEnabled && null == this.shape && (this.waypoints = null, this.shape = this.createShape(), null != this.edgeState && this.shape.apply(this.edgeState)), null == this.previous && null != this.edgeState && (a = this.graph.getPointForEvent(b.getEvent()), this.edgeState.cell.geometry.setTerminalPoint(a, !0)), this.fireEvent(new mxEventObject(mxEvent.START, 'state', this.previous)), b.consume());
  this.selectedIcon = this.icon;
  this.icon = null;
};
mxConnectionHandler.prototype.isImmediateConnectSource = function(a) {
  return !this.graph.isCellMovable(a.cell);
};
mxConnectionHandler.prototype.createEdgeState = function(a) {
  return null;
};
mxConnectionHandler.prototype.isOutlineConnectEvent = function(a) {
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
mxConnectionHandler.prototype.updateCurrentState = function(a, b) {
  this.constraintHandler.update(a, null == this.first, !1, null == this.first || a.isSource(this.marker.highlight.shape) ? null : b);
  if (null != this.constraintHandler.currentFocus && null != this.constraintHandler.currentConstraint)
    null != this.marker.highlight && null != this.marker.highlight.state && this.marker.highlight.state.cell == this.constraintHandler.currentFocus.cell ? 'transparent' != this.marker.highlight.shape.stroke && (this.marker.highlight.shape.stroke = 'transparent', this.marker.highlight.repaint()) : this.marker.markCell(this.constraintHandler.currentFocus.cell, 'transparent'), null != this.previous && (this.error = this.validateConnection(this.previous.cell, this.constraintHandler.currentFocus.cell), null == this.error && (this.currentState = this.constraintHandler.currentFocus), (null != this.error || null != this.currentState && !this.isCellEnabled(this.currentState.cell)) && this.constraintHandler.reset());
  else {
    this.graph.isIgnoreTerminalEvent(a.getEvent()) ? (this.marker.reset(), this.currentState = null) : (this.marker.process(a), this.currentState = this.marker.getValidState());
    null == this.currentState || this.isCellEnabled(this.currentState.cell) || (this.constraintHandler.reset(), this.marker.reset(), this.currentState = null);
    var c = this.isOutlineConnectEvent(a);
    null != this.currentState && c && (a.isSource(this.marker.highlight.shape) && (b = new mxPoint(a.getGraphX(), a.getGraphY())), c = this.graph.getOutlineConstraint(b, this.currentState, a), this.constraintHandler.setFocus(a, this.currentState, !1), this.constraintHandler.currentConstraint = c, this.constraintHandler.currentPoint = b);
    this.outlineConnect && null != this.marker.highlight && null != this.marker.highlight.shape && (b = this.graph.view.scale, null != this.constraintHandler.currentConstraint && null != this.constraintHandler.currentFocus ? (this.marker.highlight.shape.stroke = mxConstants.OUTLINE_HIGHLIGHT_COLOR, this.marker.highlight.shape.strokewidth = mxConstants.OUTLINE_HIGHLIGHT_STROKEWIDTH / b / b, this.marker.highlight.repaint()) : this.marker.hasValidState() && (this.graph.isCellConnectable(a.getCell()) && this.marker.getValidState() != a.getState() ? (this.marker.highlight.shape.stroke = 'transparent', this.currentState = null) : this.marker.highlight.shape.stroke = mxConstants.DEFAULT_VALID_COLOR, this.marker.highlight.shape.strokewidth = mxConstants.HIGHLIGHT_STROKEWIDTH / b / b, this.marker.highlight.repaint()));
  }
};
mxConnectionHandler.prototype.isCellEnabled = function(a) {
  return !0;
};
mxConnectionHandler.prototype.convertWaypoint = function(a) {
  var b = this.graph.getView().getScale(),
    c = this.graph.getView().getTranslate();
  a.x = a.x / b - c.x;
  a.y = a.y / b - c.y;
};
mxConnectionHandler.prototype.snapToPreview = function(a, b) {
  if (!mxEvent.isAltDown(a.getEvent()) && null != this.previous) {
    var c = this.graph.gridSize * this.graph.view.scale / 2,
      d = null != this.sourceConstraint ? this.first : new mxPoint(this.previous.getCenterX(), this.previous.getCenterY());
    Math.abs(d.x - a.getGraphX()) < c && (b.x = d.x);
    Math.abs(d.y - a.getGraphY()) < c && (b.y = d.y);
  }
};
mxConnectionHandler.prototype.mouseMove = function(a, b) {
  if (b.isConsumed() || !this.ignoreMouseDown && null == this.first && this.graph.isMouseDown)
    this.constraintHandler.reset();
  else {
    this.isEnabled() || null == this.currentState || (this.destroyIcons(), this.currentState = null);
    a = this.graph.getView();
    var c = a.scale,
      d = a.translate;
    a = new mxPoint(b.getGraphX(), b.getGraphY());
    this.error = null;
    this.graph.isGridEnabledEvent(b.getEvent()) && (a = new mxPoint((this.graph.snap(a.x / c - d.x) + d.x) * c, (this.graph.snap(a.y / c - d.y) + d.y) * c));
    this.snapToPreview(b, a);
    this.currentPoint = a;
    (null != this.first || this.isEnabled() && this.graph.isEnabled()) && (null != this.shape || null == this.first || Math.abs(b.getGraphX() - this.first.x) > this.graph.tolerance || Math.abs(b.getGraphY() - this.first.y) > this.graph.tolerance) && this.updateCurrentState(b, a);
    if (null != this.first) {
      var e = null;
      c = a;
      null != this.constraintHandler.currentConstraint && null != this.constraintHandler.currentFocus && null != this.constraintHandler.currentPoint ? (e = this.constraintHandler.currentConstraint, c = this.constraintHandler.currentPoint.clone()) : null != this.previous && mxEvent.isShiftDown(b.getEvent()) && !this.graph.isIgnoreTerminalEvent(b.getEvent()) && (Math.abs(this.previous.getCenterX() - a.x) < Math.abs(this.previous.getCenterY() - a.y) ? a.x = this.previous.getCenterX() : a.y = this.previous.getCenterY());
      d = this.first;
      if (null != this.selectedIcon) {
        var f = this.selectedIcon.bounds.width,
          g = this.selectedIcon.bounds.height;
        null != this.currentState && this.targetConnectImage ? (f = this.getIconPosition(this.selectedIcon, this.currentState), this.selectedIcon.bounds.x = f.x, this.selectedIcon.bounds.y = f.y) : (f = new mxRectangle(b.getGraphX() + this.connectIconOffset.x, b.getGraphY() + this.connectIconOffset.y, f, g), this.selectedIcon.bounds = f);
        this.selectedIcon.redraw();
      }
      null != this.edgeState ? (this.updateEdgeState(c, e), c = this.edgeState.absolutePoints[this.edgeState.absolutePoints.length - 1], d = this.edgeState.absolutePoints[0]) : (null != this.currentState && null == this.constraintHandler.currentConstraint && (f = this.getTargetPerimeterPoint(this.currentState, b), null != f && (c = f)), null == this.sourceConstraint && null != this.previous && (f = this.getSourcePerimeterPoint(this.previous, null != this.waypoints && 0 < this.waypoints.length ? this.waypoints[0] : c, b), null != f && (d = f)));
      if (null == this.currentState && this.movePreviewAway) {
        f = d;
        null != this.edgeState && 2 <= this.edgeState.absolutePoints.length && (e = this.edgeState.absolutePoints[this.edgeState.absolutePoints.length - 2], null != e && (f = e));
        e = c.x - f.x;
        f = c.y - f.y;
        g = Math.sqrt(e * e + f * f);
        if (0 == g)
          return;
        this.originalPoint = c.clone();
        c.x -= 4 * e / g;
        c.y -= 4 * f / g;
      } else
        this.originalPoint = null;
      null == this.shape && (e = Math.abs(b.getGraphX() - this.first.x), f = Math.abs(b.getGraphY() - this.first.y), e > this.graph.tolerance || f > this.graph.tolerance) && (this.shape = this.createShape(), null != this.edgeState && this.shape.apply(this.edgeState), this.updateCurrentState(b, a));
      null != this.shape && (null != this.edgeState ? this.shape.points = this.edgeState.absolutePoints : (a = [d], null != this.waypoints && (a = a.concat(this.waypoints)), a.push(c), this.shape.points = a), this.drawPreview());
      null != this.cursor && (this.graph.container.style.cursor = this.cursor);
      mxEvent.consume(b.getEvent());
      b.consume();
    } else
      this.isEnabled() && this.graph.isEnabled() ? this.previous != this.currentState && null == this.edgeState ? (this.destroyIcons(), null != this.currentState && null == this.error && null == this.constraintHandler.currentConstraint && (this.icons = this.createIcons(this.currentState), null == this.icons && (this.currentState.setCursor(mxConstants.CURSOR_CONNECT), b.consume())), this.previous = this.currentState) : this.previous != this.currentState || null == this.currentState || null != this.icons || this.graph.isMouseDown || b.consume() : this.constraintHandler.reset();
    if (!this.graph.isMouseDown && null != this.currentState && null != this.icons) {
      a = !1;
      c = b.getSource();
      for (d = 0; d < this.icons.length && !a; d++)
        a = c == this.icons[d].node || c.parentNode == this.icons[d].node;
      a || this.updateIcons(this.currentState, this.icons, b);
    }
  }
};
mxConnectionHandler.prototype.updateEdgeState = function(a, b) {
  null != this.sourceConstraint && null != this.sourceConstraint.point && (this.edgeState.style[mxConstants.STYLE_EXIT_X] = this.sourceConstraint.point.x, this.edgeState.style[mxConstants.STYLE_EXIT_Y] = this.sourceConstraint.point.y);
  null != b && null != b.point ? (this.edgeState.style[mxConstants.STYLE_ENTRY_X] = b.point.x, this.edgeState.style[mxConstants.STYLE_ENTRY_Y] = b.point.y) : (delete this.edgeState.style[mxConstants.STYLE_ENTRY_X], delete this.edgeState.style[mxConstants.STYLE_ENTRY_Y]);
  this.edgeState.absolutePoints = [
    null,
    null != this.currentState ? null : a
  ];
  this.graph.view.updateFixedTerminalPoint(this.edgeState, this.previous, !0, this.sourceConstraint);
  null != this.currentState && (null == b && (b = this.graph.getConnectionConstraint(this.edgeState, this.previous, !1)), this.edgeState.setAbsoluteTerminalPoint(null, !1), this.graph.view.updateFixedTerminalPoint(this.edgeState, this.currentState, !1, b));
  a = null;
  if (null != this.waypoints)
    for (a = [], b = 0; b < this.waypoints.length; b++) {
      var c = this.waypoints[b].clone();
      this.convertWaypoint(c);
      a[b] = c;
    }
  this.graph.view.updatePoints(this.edgeState, a, this.previous, this.currentState);
  this.graph.view.updateFloatingTerminalPoints(this.edgeState, this.previous, this.currentState);
};
mxConnectionHandler.prototype.getTargetPerimeterPoint = function(a, b) {
  b = null;
  var c = a.view,
    d = c.getPerimeterFunction(a);
  if (null != d) {
    var e = null != this.waypoints && 0 < this.waypoints.length ? this.waypoints[this.waypoints.length - 1] : new mxPoint(this.previous.getCenterX(), this.previous.getCenterY());
    a = d(c.getPerimeterBounds(a), this.edgeState, e, !1);
    null != a && (b = a);
  } else
    b = new mxPoint(a.getCenterX(), a.getCenterY());
  return b;
};
mxConnectionHandler.prototype.getSourcePerimeterPoint = function(a, b, c) {
  c = null;
  var d = a.view,
    e = d.getPerimeterFunction(a),
    f = new mxPoint(a.getCenterX(), a.getCenterY());
  if (null != e) {
    var g = mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION, 0),
      k = Math.PI / 180 * -g;
    0 != g && (b = mxUtils.getRotatedPoint(new mxPoint(b.x, b.y), Math.cos(k), Math.sin(k), f));
    a = e(d.getPerimeterBounds(a), a, b, !1);
    null != a && (0 != g && (a = mxUtils.getRotatedPoint(new mxPoint(a.x, a.y), Math.cos(-k), Math.sin(-k), f)), c = a);
  } else
    c = f;
  return c;
};
mxConnectionHandler.prototype.updateIcons = function(a, b, c) {};
mxConnectionHandler.prototype.isStopEvent = function(a) {
  return null != a.getState();
};
mxConnectionHandler.prototype.addWaypointForEvent = function(a) {
  var b = mxUtils.convertPoint(this.graph.container, a.getX(), a.getY()),
    c = Math.abs(b.x - this.first.x);
  b = Math.abs(b.y - this.first.y);
  if (null != this.waypoints || 1 < this.mouseDownCounter && (c > this.graph.tolerance || b > this.graph.tolerance))
    null == this.waypoints && (this.waypoints = []), c = this.graph.view.scale, b = new mxPoint(this.graph.snap(a.getGraphX() / c) * c, this.graph.snap(a.getGraphY() / c) * c), this.waypoints.push(b);
};
mxConnectionHandler.prototype.checkConstraints = function(a, b) {
  return null == a || null == b || null == a.point || null == b.point || !a.point.equals(b.point) || a.dx != b.dx || a.dy != b.dy || a.perimeter != b.perimeter;
};
mxConnectionHandler.prototype.mouseUp = function(a, b) {
  if (!b.isConsumed() && this.isConnecting()) {
    if (this.waypointsEnabled && !this.isStopEvent(b)) {
      this.addWaypointForEvent(b);
      b.consume();
      return;
    }
    a = this.sourceConstraint;
    var c = this.constraintHandler.currentConstraint,
      d = null != this.previous ? this.previous.cell : null,
      e = null;
    null != this.constraintHandler.currentConstraint && null != this.constraintHandler.currentFocus && (e = this.constraintHandler.currentFocus.cell);
    null == e && null != this.currentState && (e = this.currentState.cell);
    null != this.error || null != d && null != e && d == e && !this.checkConstraints(a, c) ? (null != this.previous && null != this.marker.validState && this.previous.cell == this.marker.validState.cell && this.graph.selectCellForEvent(this.marker.source, b.getEvent()), null != this.error && 0 < this.error.length && this.graph.validationAlert(this.error)) : this.connect(d, e, b.getEvent(), b.getCell());
    this.destroyIcons();
    b.consume();
  }
  null != this.first && this.reset();
};
mxConnectionHandler.prototype.reset = function() {
  null != this.shape && (this.shape.destroy(), this.shape = null);
  null != this.cursor && null != this.graph.container && (this.graph.container.style.cursor = '');
  this.destroyIcons();
  this.marker.reset();
  this.constraintHandler.reset();
  this.sourceConstraint = this.error = this.previous = this.edgeState = this.currentPoint = this.originalPoint = null;
  this.mouseDownCounter = 0;
  this.first = null;
  this.fireEvent(new mxEventObject(mxEvent.RESET));
};
mxConnectionHandler.prototype.drawPreview = function() {
  this.updatePreview(null == this.error);
  null != this.edgeState && (this.edgeState.shape = this.shape, this.graph.cellRenderer.postConfigureShape(this.edgeState), this.edgeState.shape = null);
  this.shape.redraw();
};
mxConnectionHandler.prototype.updatePreview = function(a) {
  this.shape.strokewidth = this.getEdgeWidth(a);
  this.shape.stroke = this.getEdgeColor(a);
};
mxConnectionHandler.prototype.getEdgeColor = function(a) {
  return a ? mxConstants.VALID_COLOR : mxConstants.INVALID_COLOR;
};
mxConnectionHandler.prototype.getEdgeWidth = function(a) {
  return a ? 3 : 1;
};
mxConnectionHandler.prototype.connect = function(a, b, c, d) {
  if (null != b || this.isCreateTarget(c) || this.graph.allowDanglingEdges) {
    var e = this.graph.getModel(),
      f = !1,
      g = null;
    e.beginUpdate();
    try {
      if (null != a && null == b && !this.graph.isIgnoreTerminalEvent(c) && this.isCreateTarget(c) && (b = this.createTargetVertex(c, a), null != b)) {
        d = this.graph.getDropTarget([b], c, d);
        f = !0;
        if (null != d && this.graph.getModel().isEdge(d))
          d = this.graph.getDefaultParent();
        else {
          var k = this.graph.getView().getState(d);
          if (null != k) {
            var l = e.getGeometry(b);
            l.x -= k.origin.x;
            l.y -= k.origin.y;
          }
        }
        this.graph.addCell(b, d);
      }
      var m = this.graph.getDefaultParent();
      null != a && null != b && e.getParent(a) == e.getParent(b) && e.getParent(e.getParent(a)) != e.getRoot() && (m = e.getParent(a), null != a.geometry && a.geometry.relative && null != b.geometry && b.geometry.relative && (m = e.getParent(m)));
      var n = k = null;
      null != this.edgeState && (k = this.edgeState.cell.value, n = this.edgeState.cell.style);
      g = this.insertEdge(m, null, k, a, b, n);
      if (null != g) {
        this.graph.setConnectionConstraint(g, a, !0, this.sourceConstraint);
        this.graph.setConnectionConstraint(g, b, !1, this.constraintHandler.currentConstraint);
        null != this.edgeState && e.setGeometry(g, this.edgeState.cell.geometry);
        m = e.getParent(a);
        if (this.isInsertBefore(g, a, b, c, d)) {
          for (l = a; null != l.parent && null != l.geometry && l.geometry.relative && l.parent != g.parent;)
            l = this.graph.model.getParent(l);
          null != l && null != l.parent && l.parent == g.parent && e.add(m, g, l.parent.getIndex(l));
        }
        var p = e.getGeometry(g);
        null == p && (p = new mxGeometry(), p.relative = !0, e.setGeometry(g, p));
        if (null != this.waypoints && 0 < this.waypoints.length) {
          var r = this.graph.view.scale,
            q = this.graph.view.translate;
          p.points = [];
          for (a = 0; a < this.waypoints.length; a++) {
            var t = this.waypoints[a];
            p.points.push(new mxPoint(t.x / r - q.x, t.y / r - q.y));
          }
        }
        if (null == b) {
          var u = this.graph.view.translate;
          r = this.graph.view.scale;
          t = null != this.originalPoint ? new mxPoint(this.originalPoint.x / r - u.x, this.originalPoint.y / r - u.y) : new mxPoint(this.currentPoint.x / r - u.x, this.currentPoint.y / r - u.y);
          t.x -= this.graph.panDx / this.graph.view.scale;
          t.y -= this.graph.panDy / this.graph.view.scale;
          p.setTerminalPoint(t, !1);
        }
        this.fireEvent(new mxEventObject(mxEvent.CONNECT, 'cell', g, 'terminal', b, 'event', c, 'target', d, 'terminalInserted', f));
      }
    } catch (x) {
      mxLog.show(), mxLog.debug(x.message);
    } finally {
      e.endUpdate();
    }
    this.select && this.selectCells(g, f ? b : null);
  }
};
mxConnectionHandler.prototype.selectCells = function(a, b) {
  this.graph.setSelectionCell(a);
};
mxConnectionHandler.prototype.insertEdge = function(a, b, c, d, e, f) {
  if (null == this.factoryMethod)
    return this.graph.insertEdge(a, b, c, d, e, f);
  b = this.createEdge(c, d, e, f);
  return this.graph.addEdge(b, a, d, e);
};
mxConnectionHandler.prototype.createTargetVertex = function(a, b) {
  for (a = this.graph.getCellGeometry(b); null != a && a.relative;)
    b = this.graph.getModel().getParent(b), a = this.graph.getCellGeometry(b);
  var c = this.graph.cloneCell(b);
  a = this.graph.getModel().getGeometry(c);
  if (null != a) {
    var d = this.graph.view.translate,
      e = this.graph.view.scale,
      f = new mxPoint(this.currentPoint.x / e - d.x, this.currentPoint.y / e - d.y);
    a.x = Math.round(f.x - a.width / 2 - this.graph.panDx / e);
    a.y = Math.round(f.y - a.height / 2 - this.graph.panDy / e);
    f = this.getAlignmentTolerance();
    if (0 < f) {
      var g = this.graph.view.getState(b);
      null != g && (b = g.x / e - d.x, d = g.y / e - d.y, Math.abs(b - a.x) <= f && (a.x = Math.round(b)), Math.abs(d - a.y) <= f && (a.y = Math.round(d)));
    }
  }
  return c;
};
mxConnectionHandler.prototype.getAlignmentTolerance = function(a) {
  return this.graph.isGridEnabled() ? this.graph.gridSize / 2 : this.graph.tolerance;
};
mxConnectionHandler.prototype.createEdge = function(a, b, c, d) {
  var e = null;
  null != this.factoryMethod && (e = this.factoryMethod(b, c, d));
  null == e && (e = new mxCell(a || ''), e.setEdge(!0), e.setStyle(d), a = new mxGeometry(), a.relative = !0, e.setGeometry(a));
  return e;
};
mxConnectionHandler.prototype.destroy = function() {
  this.graph.removeMouseListener(this);
  null != this.shape && (this.shape.destroy(), this.shape = null);
  null != this.marker && (this.marker.destroy(), this.marker = null);
  null != this.constraintHandler && (this.constraintHandler.destroy(), this.constraintHandler = null);
  null != this.changeHandler && (this.graph.getModel().removeListener(this.changeHandler), this.graph.getView().removeListener(this.changeHandler), this.changeHandler = null);
  null != this.drillHandler && (this.graph.removeListener(this.drillHandler), this.graph.getView().removeListener(this.drillHandler), this.drillHandler = null);
  null != this.escapeHandler && (this.graph.removeListener(this.escapeHandler), this.escapeHandler = null);
};