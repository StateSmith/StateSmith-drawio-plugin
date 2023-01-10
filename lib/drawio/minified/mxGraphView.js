function mxGraphView(a) {
  this.graph = a;
  this.translate = new mxPoint();
  this.graphBounds = new mxRectangle();
  this.states = new mxDictionary();
}
mxGraphView.prototype = new mxEventSource();
mxGraphView.prototype.constructor = mxGraphView;
mxGraphView.prototype.EMPTY_POINT = new mxPoint();
mxGraphView.prototype.doneResource = 'none' != mxClient.language ? 'done' : '';
mxGraphView.prototype.updatingDocumentResource = 'none' != mxClient.language ? 'updatingDocument' : '';
mxGraphView.prototype.allowEval = !1;
mxGraphView.prototype.captureDocumentGesture = !0;
mxGraphView.prototype.rendering = !0;
mxGraphView.prototype.graph = null;
mxGraphView.prototype.currentRoot = null;
mxGraphView.prototype.graphBounds = null;
mxGraphView.prototype.scale = 1;
mxGraphView.prototype.translate = null;
mxGraphView.prototype.states = null;
mxGraphView.prototype.updateStyle = !1;
mxGraphView.prototype.lastNode = null;
mxGraphView.prototype.lastHtmlNode = null;
mxGraphView.prototype.lastForegroundNode = null;
mxGraphView.prototype.lastForegroundHtmlNode = null;
mxGraphView.prototype.getGraphBounds = function() {
  return this.graphBounds;
};
mxGraphView.prototype.setGraphBounds = function(a) {
  this.graphBounds = a;
};
mxGraphView.prototype.getBounds = function(a) {
  var b = null;
  if (null != a && 0 < a.length)
    for (var c = this.graph.getModel(), d = 0; d < a.length; d++)
      if (c.isVertex(a[d]) || c.isEdge(a[d])) {
        var e = this.getState(a[d]);
        null != e && (null == b ? b = mxRectangle.fromRectangle(e) : b.add(e));
      }
  return b;
};
mxGraphView.prototype.setCurrentRoot = function(a) {
  if (this.currentRoot != a) {
    var b = new mxCurrentRootChange(this, a);
    b.execute();
    var c = new mxUndoableEdit(this, !0);
    c.add(b);
    this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', c));
    this.graph.sizeDidChange();
  }
  return a;
};
mxGraphView.prototype.scaleAndTranslate = function(a, b, c) {
  var d = this.scale,
    e = new mxPoint(this.translate.x, this.translate.y);
  if (this.scale != a || this.translate.x != b || this.translate.y != c)
    this.scale = a, this.translate.x = b, this.translate.y = c, this.isEventsEnabled() && this.viewStateChanged();
  this.fireEvent(new mxEventObject(mxEvent.SCALE_AND_TRANSLATE, 'scale', a, 'previousScale', d, 'translate', this.translate, 'previousTranslate', e));
};
mxGraphView.prototype.getScale = function() {
  return this.scale;
};
mxGraphView.prototype.setScale = function(a) {
  var b = this.scale;
  this.scale != a && (this.scale = a, this.isEventsEnabled() && this.viewStateChanged());
  this.fireEvent(new mxEventObject(mxEvent.SCALE, 'scale', a, 'previousScale', b));
};
mxGraphView.prototype.getTranslate = function() {
  return this.translate;
};
mxGraphView.prototype.setTranslate = function(a, b) {
  var c = new mxPoint(this.translate.x, this.translate.y);
  if (this.translate.x != a || this.translate.y != b)
    this.translate.x = a, this.translate.y = b, this.isEventsEnabled() && this.viewStateChanged();
  this.fireEvent(new mxEventObject(mxEvent.TRANSLATE, 'translate', this.translate, 'previousTranslate', c));
};
mxGraphView.prototype.viewStateChanged = function() {
  this.revalidate();
  this.graph.sizeDidChange();
};
mxGraphView.prototype.refresh = function() {
  null != this.currentRoot && this.clear();
  this.revalidate();
};
mxGraphView.prototype.revalidate = function() {
  this.invalidate();
  this.validate();
};
mxGraphView.prototype.clear = function(a, b, c) {
  var d = this.graph.getModel();
  a = a || d.getRoot();
  b = null != b ? b : !1;
  c = null != c ? c : !0;
  this.removeState(a);
  if (c && (b || a != this.currentRoot)) {
    c = d.getChildCount(a);
    for (var e = 0; e < c; e++)
      this.clear(d.getChildAt(a, e), b);
  } else
    this.invalidate(a);
};
mxGraphView.prototype.invalidate = function(a, b, c) {
  var d = this.graph.getModel();
  a = a || d.getRoot();
  b = null != b ? b : !0;
  c = null != c ? c : !0;
  var e = this.getState(a);
  null != e && (e.invalid = !0);
  if (!a.invalidating) {
    a.invalidating = !0;
    if (b) {
      var f = d.getChildCount(a);
      for (e = 0; e < f; e++) {
        var g = d.getChildAt(a, e);
        this.invalidate(g, b, c);
      }
    }
    if (c)
      for (f = d.getEdgeCount(a), e = 0; e < f; e++)
        this.invalidate(d.getEdgeAt(a, e), b, c);
    delete a.invalidating;
  }
};
mxGraphView.prototype.validate = function(a) {
  var b = mxLog.enter('mxGraphView.validate');
  window.status = mxResources.get(this.updatingDocumentResource) || this.updatingDocumentResource;
  this.resetValidationState();
  var c = null;
  null == this.canvas || null != this.textDiv || 8 != document.documentMode || mxClient.IS_EM || (this.placeholder = document.createElement('div'), this.placeholder.style.position = 'absolute', this.placeholder.style.width = this.canvas.clientWidth + 'px', this.placeholder.style.height = this.canvas.clientHeight + 'px', this.canvas.parentNode.appendChild(this.placeholder), c = this.drawPane.style.display, this.canvas.style.display = 'none', this.textDiv = document.createElement('div'), this.textDiv.style.position = 'absolute', this.textDiv.style.whiteSpace = 'nowrap', this.textDiv.style.visibility = 'hidden', this.textDiv.style.display = 'inline-block', this.textDiv.style.zoom = '1', document.body.appendChild(this.textDiv));
  a = this.getBoundingBox(this.validateCellState(this.validateCell(a || (null != this.currentRoot ? this.currentRoot : this.graph.getModel().getRoot()))));
  this.setGraphBounds(null != a ? a : this.getEmptyBounds());
  this.validateBackground();
  null != c && (this.canvas.style.display = c, this.textDiv.parentNode.removeChild(this.textDiv), null != this.placeholder && this.placeholder.parentNode.removeChild(this.placeholder), this.textDiv = null);
  this.resetValidationState();
  window.status = mxResources.get(this.doneResource) || this.doneResource;
  mxLog.leave('mxGraphView.validate', b);
};
mxGraphView.prototype.getEmptyBounds = function() {
  return new mxRectangle(this.translate.x * this.scale, this.translate.y * this.scale);
};
mxGraphView.prototype.getBoundingBox = function(a, b) {
  b = null != b ? b : !0;
  var c = null;
  if (null != a && (null != a.shape && null != a.shape.boundingBox && (c = a.shape.boundingBox.clone()), null != a.text && null != a.text.boundingBox && (null != c ? c.add(a.text.boundingBox) : c = a.text.boundingBox.clone()), b)) {
    b = this.graph.getModel();
    for (var d = b.getChildCount(a.cell), e = 0; e < d; e++) {
      var f = this.getBoundingBox(this.getState(b.getChildAt(a.cell, e)));
      null != f && (null == c ? c = f : c.add(f));
    }
  }
  return c;
};
mxGraphView.prototype.createBackgroundPageShape = function(a) {
  return new mxRectangleShape(a, 'white', 'black');
};
mxGraphView.prototype.validateBackground = function() {
  this.validateBackgroundImage();
  this.validateBackgroundPage();
};
mxGraphView.prototype.validateBackgroundImage = function() {
  var a = this.graph.getBackgroundImage();
  if (null != a) {
    if (null == this.backgroundImage || this.backgroundImage.image != a.src) {
      null != this.backgroundImage && this.backgroundImage.destroy();
      var b = new mxRectangle(0, 0, 1, 1);
      this.backgroundImage = new mxImageShape(b, a.src);
      this.backgroundImage.dialect = this.graph.dialect;
      this.backgroundImage.init(this.backgroundPane);
      this.backgroundImage.redraw();
      8 != document.documentMode || mxClient.IS_EM || mxEvent.addGestureListeners(this.backgroundImage.node, mxUtils.bind(this, function(c) {
        this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(c));
      }), mxUtils.bind(this, function(c) {
        this.graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(c));
      }), mxUtils.bind(this, function(c) {
        this.graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(c));
      }));
    }
    this.redrawBackgroundImage(this.backgroundImage, a);
  } else
    null != this.backgroundImage && (this.backgroundImage.destroy(), this.backgroundImage = null);
};
mxGraphView.prototype.validateBackgroundPage = function() {
  if (this.graph.pageVisible) {
    var a = this.getBackgroundPageBounds();
    null == this.backgroundPageShape ? (this.backgroundPageShape = this.createBackgroundPageShape(a), this.backgroundPageShape.scale = this.scale, this.backgroundPageShape.isShadow = !0, this.backgroundPageShape.dialect = this.graph.dialect, this.backgroundPageShape.init(this.backgroundPane), this.backgroundPageShape.redraw(), this.graph.nativeDblClickEnabled && mxEvent.addListener(this.backgroundPageShape.node, 'dblclick', mxUtils.bind(this, function(b) {
      this.graph.dblClick(b);
    })), mxEvent.addGestureListeners(this.backgroundPageShape.node, mxUtils.bind(this, function(b) {
      this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(b));
    }), mxUtils.bind(this, function(b) {
      null != this.graph.tooltipHandler && this.graph.tooltipHandler.isHideOnHover() && this.graph.tooltipHandler.hide();
      this.graph.isMouseDown && !mxEvent.isConsumed(b) && this.graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(b));
    }), mxUtils.bind(this, function(b) {
      this.graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(b));
    }))) : (this.backgroundPageShape.scale = this.scale, this.backgroundPageShape.bounds = a, this.backgroundPageShape.redraw());
  } else
    null != this.backgroundPageShape && (this.backgroundPageShape.destroy(), this.backgroundPageShape = null);
};
mxGraphView.prototype.getBackgroundPageBounds = function() {
  var a = this.graph.pageFormat,
    b = this.scale * this.graph.pageScale;
  return new mxRectangle(this.scale * this.translate.x, this.scale * this.translate.y, a.width * b, a.height * b);
};
mxGraphView.prototype.redrawBackgroundImage = function(a, b) {
  a.scale = this.scale;
  a.bounds.x = this.scale * (this.translate.x + b.x);
  a.bounds.y = this.scale * (this.translate.y + b.y);
  a.bounds.width = this.scale * b.width;
  a.bounds.height = this.scale * b.height;
  a.redraw();
};
mxGraphView.prototype.validateCell = function(a, b) {
  if (null != a)
    if (b = (null != b ? b : !0) && this.graph.isCellVisible(a), null == this.getState(a, b) || b)
      for (var c = this.graph.getModel(), d = c.getChildCount(a), e = 0; e < d; e++)
        this.validateCell(c.getChildAt(a, e), b && (!this.isCellCollapsed(a) || a == this.currentRoot));
    else
      this.removeState(a);
  return a;
};
mxGraphView.prototype.validateCellState = function(a, b) {
  b = null != b ? b : !0;
  var c = null;
  if (null != a && (c = this.getState(a), null != c)) {
    var d = this.graph.getModel();
    if (c.invalid) {
      c.invalid = !1;
      if (null == c.style || c.invalidStyle)
        c.style = this.graph.getCellStyle(c.cell), c.invalidStyle = !1;
      a != this.currentRoot && this.validateCellState(d.getParent(a), !1);
      c.setVisibleTerminalState(this.validateCellState(this.getVisibleTerminal(a, !0), !1), !0);
      c.setVisibleTerminalState(this.validateCellState(this.getVisibleTerminal(a, !1), !1), !1);
      this.updateCellState(c);
      a == this.currentRoot || c.invalid || (this.graph.cellRenderer.redraw(c, !1, this.isRendering()), c.updateCachedBounds());
    }
    if (b && !c.invalid) {
      null != c.shape && this.stateValidated(c);
      b = d.getChildCount(a);
      for (var e = 0; e < b; e++)
        this.validateCellState(d.getChildAt(a, e));
    }
  }
  return c;
};
mxGraphView.prototype.updateCellState = function(a) {
  a.absoluteOffset.x = 0;
  a.absoluteOffset.y = 0;
  a.origin.x = 0;
  a.origin.y = 0;
  a.length = 0;
  if (a.cell != this.currentRoot) {
    var b = this.graph.getModel(),
      c = this.getState(b.getParent(a.cell));
    null != c && c.cell != this.currentRoot && (a.origin.x += c.origin.x, a.origin.y += c.origin.y);
    var d = this.graph.getChildOffsetForCell(a.cell);
    null != d && (a.origin.x += d.x, a.origin.y += d.y);
    var e = this.graph.getCellGeometry(a.cell);
    null != e && (b.isEdge(a.cell) || (d = null != e.offset ? e.offset : this.EMPTY_POINT, e.relative && null != c ? b.isEdge(c.cell) ? (d = this.getPoint(c, e), null != d && (a.origin.x += d.x / this.scale - c.origin.x - this.translate.x, a.origin.y += d.y / this.scale - c.origin.y - this.translate.y)) : (a.origin.x += e.x * c.unscaledWidth + d.x, a.origin.y += e.y * c.unscaledHeight + d.y) : (a.absoluteOffset.x = this.scale * d.x, a.absoluteOffset.y = this.scale * d.y, a.origin.x += e.x, a.origin.y += e.y)), a.x = this.scale * (this.translate.x + a.origin.x), a.y = this.scale * (this.translate.y + a.origin.y), a.width = this.scale * e.width, a.unscaledWidth = e.width, a.height = this.scale * e.height, a.unscaledHeight = e.height, b.isVertex(a.cell) && this.updateVertexState(a, e), b.isEdge(a.cell) && this.updateEdgeState(a, e));
  }
  a.updateCachedBounds();
};
mxGraphView.prototype.isCellCollapsed = function(a) {
  return this.graph.isCellCollapsed(a);
};
mxGraphView.prototype.updateVertexState = function(a, b) {
  var c = this.graph.getModel(),
    d = this.getState(c.getParent(a.cell));
  if (b.relative && null != d && !c.isEdge(d.cell) && (c = mxUtils.toRadians(d.style[mxConstants.STYLE_ROTATION] || '0'), 0 != c)) {
    b = Math.cos(c);
    c = Math.sin(c);
    var e = new mxPoint(a.getCenterX(), a.getCenterY());
    d = new mxPoint(d.getCenterX(), d.getCenterY());
    d = mxUtils.getRotatedPoint(e, b, c, d);
    a.x = d.x - a.width / 2;
    a.y = d.y - a.height / 2;
  }
  this.updateVertexLabelOffset(a);
};
mxGraphView.prototype.updateEdgeState = function(a, b) {
  var c = a.getVisibleTerminalState(!0),
    d = a.getVisibleTerminalState(!1);
  null != this.graph.model.getTerminal(a.cell, !0) && null == c || null == c && null == b.getTerminalPoint(!0) || null != this.graph.model.getTerminal(a.cell, !1) && null == d || null == d && null == b.getTerminalPoint(!1) ? this.clear(a.cell, !0) : (this.updateFixedTerminalPoints(a, c, d), this.updatePoints(a, b.points, c, d), this.updateFloatingTerminalPoints(a, c, d), b = a.absolutePoints, a.cell != this.currentRoot && (null == b || 2 > b.length || null == b[0] || null == b[b.length - 1]) ? this.clear(a.cell, !0) : (this.updateEdgeBounds(a), this.updateEdgeLabelOffset(a)));
};
mxGraphView.prototype.updateVertexLabelOffset = function(a) {
  var b = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
  if (b == mxConstants.ALIGN_LEFT)
    b = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_WIDTH, null), b = null != b ? b * this.scale : a.width, a.absoluteOffset.x -= b;
  else if (b == mxConstants.ALIGN_RIGHT)
    a.absoluteOffset.x += a.width;
  else if (b == mxConstants.ALIGN_CENTER && (b = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_WIDTH, null), null != b)) {
    var c = mxUtils.getValue(a.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER),
      d = 0;
    c == mxConstants.ALIGN_CENTER ? d = 0.5 : c == mxConstants.ALIGN_RIGHT && (d = 1);
    0 != d && (a.absoluteOffset.x -= (b * this.scale - a.width) * d);
  }
  b = mxUtils.getValue(a.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);
  b == mxConstants.ALIGN_TOP ? a.absoluteOffset.y -= a.height : b == mxConstants.ALIGN_BOTTOM && (a.absoluteOffset.y += a.height);
};
mxGraphView.prototype.resetValidationState = function() {
  this.lastForegroundHtmlNode = this.lastForegroundNode = this.lastHtmlNode = this.lastNode = null;
};
mxGraphView.prototype.stateValidated = function(a) {
  var b = this.graph.getModel().isEdge(a.cell) && this.graph.keepEdgesInForeground || this.graph.getModel().isVertex(a.cell) && this.graph.keepEdgesInBackground;
  a = this.graph.cellRenderer.insertStateAfter(a, b ? this.lastForegroundNode || this.lastNode : this.lastNode, b ? this.lastForegroundHtmlNode || this.lastHtmlNode : this.lastHtmlNode);
  b ? (this.lastForegroundHtmlNode = a[1], this.lastForegroundNode = a[0]) : (this.lastHtmlNode = a[1], this.lastNode = a[0]);
};
mxGraphView.prototype.updateFixedTerminalPoints = function(a, b, c) {
  this.updateFixedTerminalPoint(a, b, !0, this.graph.getConnectionConstraint(a, b, !0));
  this.updateFixedTerminalPoint(a, c, !1, this.graph.getConnectionConstraint(a, c, !1));
};
mxGraphView.prototype.updateFixedTerminalPoint = function(a, b, c, d) {
  a.setAbsoluteTerminalPoint(this.getFixedTerminalPoint(a, b, c, d), c);
};
mxGraphView.prototype.getFixedTerminalPoint = function(a, b, c, d) {
  var e = null;
  null != d && (e = this.graph.getConnectionPoint(b, d, !1));
  if (null == e && null == b) {
    b = this.scale;
    d = this.translate;
    var f = a.origin;
    e = this.graph.getCellGeometry(a.cell).getTerminalPoint(c);
    null != e && (e = new mxPoint(b * (d.x + e.x + f.x), b * (d.y + e.y + f.y)));
  }
  return e;
};
mxGraphView.prototype.updateBoundsFromStencil = function(a) {
  var b = null;
  if (null != a && null != a.shape && null != a.shape.stencil && 'fixed' == a.shape.stencil.aspect) {
    b = mxRectangle.fromRectangle(a);
    var c = a.shape.stencil.computeAspect(a.style, a.x, a.y, a.width, a.height);
    a.setRect(c.x, c.y, a.shape.stencil.w0 * c.width, a.shape.stencil.h0 * c.height);
  }
  return b;
};
mxGraphView.prototype.updatePoints = function(a, b, c, d) {
  if (null != a) {
    var e = [];
    e.push(a.absolutePoints[0]);
    var f = this.getEdgeStyle(a, b, c, d);
    if (null != f) {
      c = this.getTerminalPort(a, c, !0);
      d = this.getTerminalPort(a, d, !1);
      var g = this.updateBoundsFromStencil(c),
        k = this.updateBoundsFromStencil(d);
      f(a, c, d, b, e);
      null != g && c.setRect(g.x, g.y, g.width, g.height);
      null != k && d.setRect(k.x, k.y, k.width, k.height);
    } else if (null != b)
      for (f = 0; f < b.length; f++)
        null != b[f] && (c = mxUtils.clone(b[f]), e.push(this.transformControlPoint(a, c)));
    b = a.absolutePoints;
    e.push(b[b.length - 1]);
    a.absolutePoints = e;
  }
};
mxGraphView.prototype.transformControlPoint = function(a, b, c) {
  return null != a && null != b ? (a = a.origin, c = c ? 1 : this.scale, new mxPoint(c * (b.x + this.translate.x + a.x), c * (b.y + this.translate.y + a.y))) : null;
};
mxGraphView.prototype.isLoopStyleEnabled = function(a, b, c, d) {
  var e = this.graph.getConnectionConstraint(a, c, !0),
    f = this.graph.getConnectionConstraint(a, d, !1);
  return !(null == b || 2 > b.length) || mxUtils.getValue(a.style, mxConstants.STYLE_ORTHOGONAL_LOOP, !1) && (null != e && null != e.point || null != f && null != f.point) ? !1 : null != c && c == d;
};
mxGraphView.prototype.getEdgeStyle = function(a, b, c, d) {
  a = this.isLoopStyleEnabled(a, b, c, d) ? mxUtils.getValue(a.style, mxConstants.STYLE_LOOP, this.graph.defaultLoopStyle) : mxUtils.getValue(a.style, mxConstants.STYLE_NOEDGESTYLE, !1) ? null : a.style[mxConstants.STYLE_EDGE];
  'string' == typeof a && (b = mxStyleRegistry.getValue(a), null == b && this.isAllowEval() && (b = mxUtils.eval(a)), a = b);
  return 'function' == typeof a ? a : null;
};
mxGraphView.prototype.updateFloatingTerminalPoints = function(a, b, c) {
  var d = a.absolutePoints,
    e = d[0];
  null == d[d.length - 1] && null != c && this.updateFloatingTerminalPoint(a, c, b, !1);
  null == e && null != b && this.updateFloatingTerminalPoint(a, b, c, !0);
};
mxGraphView.prototype.updateFloatingTerminalPoint = function(a, b, c, d) {
  a.setAbsoluteTerminalPoint(this.getFloatingTerminalPoint(a, b, c, d), d);
};
mxGraphView.prototype.getFloatingTerminalPoint = function(a, b, c, d) {
  b = this.getTerminalPort(a, b, d);
  var e = this.getNextPoint(a, c, d),
    f = this.graph.isOrthogonal(a);
  c = mxUtils.toRadians(Number(b.style[mxConstants.STYLE_ROTATION] || '0'));
  var g = new mxPoint(b.getCenterX(), b.getCenterY());
  if (0 != c) {
    var k = Math.cos(-c),
      l = Math.sin(-c);
    e = mxUtils.getRotatedPoint(e, k, l, g);
  }
  k = parseFloat(a.style[mxConstants.STYLE_PERIMETER_SPACING] || 0);
  k += parseFloat(a.style[d ? mxConstants.STYLE_SOURCE_PERIMETER_SPACING : mxConstants.STYLE_TARGET_PERIMETER_SPACING] || 0);
  a = this.getPerimeterPoint(b, e, 0 == c && f, k);
  0 != c && (k = Math.cos(c), l = Math.sin(c), a = mxUtils.getRotatedPoint(a, k, l, g));
  return a;
};
mxGraphView.prototype.getTerminalPort = function(a, b, c) {
  a = mxUtils.getValue(a.style, c ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT);
  null != a && (a = this.getState(this.graph.getModel().getCell(a)), null != a && (b = a));
  return b;
};
mxGraphView.prototype.getPerimeterPoint = function(a, b, c, d) {
  var e = null;
  if (null != a) {
    var f = this.getPerimeterFunction(a);
    if (null != f && null != b && (d = this.getPerimeterBounds(a, d), 0 < d.width || 0 < d.height)) {
      e = new mxPoint(b.x, b.y);
      var g = b = !1;
      this.graph.model.isVertex(a.cell) && (b = 1 == mxUtils.getValue(a.style, mxConstants.STYLE_FLIPH, 0), g = 1 == mxUtils.getValue(a.style, mxConstants.STYLE_FLIPV, 0), null != a.shape && null != a.shape.stencil && (b = 1 == mxUtils.getValue(a.style, 'stencilFlipH', 0) || b, g = 1 == mxUtils.getValue(a.style, 'stencilFlipV', 0) || g), b && (e.x = 2 * d.getCenterX() - e.x), g && (e.y = 2 * d.getCenterY() - e.y));
      e = f(d, a, e, c);
      null != e && (b && (e.x = 2 * d.getCenterX() - e.x), g && (e.y = 2 * d.getCenterY() - e.y));
    }
    null == e && (e = this.getPoint(a));
  }
  return e;
};
mxGraphView.prototype.getRoutingCenterX = function(a) {
  var b = null != a.style ? parseFloat(a.style[mxConstants.STYLE_ROUTING_CENTER_X]) || 0 : 0;
  return a.getCenterX() + b * a.width;
};
mxGraphView.prototype.getRoutingCenterY = function(a) {
  var b = null != a.style ? parseFloat(a.style[mxConstants.STYLE_ROUTING_CENTER_Y]) || 0 : 0;
  return a.getCenterY() + b * a.height;
};
mxGraphView.prototype.getPerimeterBounds = function(a, b) {
  b = null != b ? b : 0;
  null != a && (b += parseFloat(a.style[mxConstants.STYLE_PERIMETER_SPACING] || 0));
  return a.getPerimeterBounds(b * this.scale);
};
mxGraphView.prototype.getPerimeterFunction = function(a) {
  a = a.style[mxConstants.STYLE_PERIMETER];
  if ('string' == typeof a) {
    var b = mxStyleRegistry.getValue(a);
    null == b && this.isAllowEval() && (b = mxUtils.eval(a));
    a = b;
  }
  return 'function' == typeof a ? a : null;
};
mxGraphView.prototype.getNextPoint = function(a, b, c) {
  a = a.absolutePoints;
  var d = null;
  null != a && 2 <= a.length && (d = a.length, d = a[c ? Math.min(1, d - 1) : Math.max(0, d - 2)]);
  null == d && null != b && (d = new mxPoint(b.getCenterX(), b.getCenterY()));
  return d;
};
mxGraphView.prototype.getVisibleTerminal = function(a, b) {
  var c = this.graph.getModel();
  for (b = a = c.getTerminal(a, b); null != a && a != this.currentRoot;) {
    if (!this.graph.isCellVisible(b) || this.isCellCollapsed(a))
      b = a;
    a = c.getParent(a);
  }
  null == b || c.contains(b) && c.getParent(b) != c.getRoot() && b != this.currentRoot || (b = null);
  return b;
};
mxGraphView.prototype.updateEdgeBounds = function(a) {
  var b = a.absolutePoints,
    c = b[0],
    d = b[b.length - 1];
  if (c.x != d.x || c.y != d.y) {
    var e = d.x - c.x,
      f = d.y - c.y;
    a.terminalDistance = Math.sqrt(e * e + f * f);
  } else
    a.terminalDistance = 0;
  d = 0;
  var g = [];
  f = c;
  if (null != f) {
    c = f.x;
    for (var k = f.y, l = c, m = k, n = 1; n < b.length; n++) {
      var p = b[n];
      null != p && (e = f.x - p.x, f = f.y - p.y, e = Math.sqrt(e * e + f * f), g.push(e), d += e, f = p, c = Math.min(f.x, c), k = Math.min(f.y, k), l = Math.max(f.x, l), m = Math.max(f.y, m));
    }
    a.length = d;
    a.segments = g;
    a.x = c;
    a.y = k;
    a.width = Math.max(1, l - c);
    a.height = Math.max(1, m - k);
  }
};
mxGraphView.prototype.getPoint = function(a, b) {
  var c = a.getCenterX(),
    d = a.getCenterY();
  if (null == a.segments || null != b && !b.relative)
    null != b && (b = b.offset, null != b && (c += b.x, d += b.y));
  else {
    for (var e = a.absolutePoints.length, f = Math.round(((null != b ? b.x / 2 : 0) + 0.5) * a.length), g = a.segments[0], k = 0, l = 1; f >= Math.round(k + g) && l < e - 1;)
      k += g, g = a.segments[l++];
    e = 0 == g ? 0 : (f - k) / g;
    f = a.absolutePoints[l - 1];
    a = a.absolutePoints[l];
    null != f && null != a && (l = c = d = 0, null != b && (d = b.y, b = b.offset, null != b && (c = b.x, l = b.y)), b = a.x - f.x, a = a.y - f.y, c = f.x + b * e + ((0 == g ? 0 : a / g) * d + c) * this.scale, d = f.y + a * e - ((0 == g ? 0 : b / g) * d - l) * this.scale);
  }
  return new mxPoint(c, d);
};
mxGraphView.prototype.getRelativePoint = function(a, b, c) {
  var d = this.graph.getModel().getGeometry(a.cell);
  if (null != d) {
    var e = a.absolutePoints.length;
    if (d.relative && 1 < e) {
      d = a.length;
      for (var f = a.segments, g = a.absolutePoints[0], k = a.absolutePoints[1], l = mxUtils.ptSegDistSq(g.x, g.y, k.x, k.y, b, c), m = 0, n = 0, p = 0, r = 2; r < e; r++)
        g = k, k = a.absolutePoints[r], g = mxUtils.ptSegDistSq(g.x, g.y, k.x, k.y, b, c), p += f[r - 2], g <= l && (l = g, n = r - 1, m = p);
      e = f[n];
      g = a.absolutePoints[n];
      k = a.absolutePoints[n + 1];
      l = k.x;
      f = k.y;
      a = g.x - l;
      n = g.y - f;
      f = (a - (b - l)) * a + (n - (c - f)) * n;
      a = Math.sqrt(0 >= f ? 0 : f * f / (a * a + n * n));
      a > e && (a = e);
      e = Math.sqrt(mxUtils.ptSegDistSq(g.x, g.y, k.x, k.y, b, c)); -
      1 == mxUtils.relativeCcw(g.x, g.y, k.x, k.y, b, c) && (e = -e);
      return new mxPoint((d / 2 - m - a) / d * -2, e / this.scale);
    }
  }
  return new mxPoint();
};
mxGraphView.prototype.updateEdgeLabelOffset = function(a) {
  var b = a.absolutePoints;
  a.absoluteOffset.x = a.getCenterX();
  a.absoluteOffset.y = a.getCenterY();
  if (null != b && 0 < b.length && null != a.segments) {
    var c = this.graph.getCellGeometry(a.cell);
    if (c.relative) {
      var d = this.getPoint(a, c);
      null != d && (a.absoluteOffset = d);
    } else {
      d = b[0];
      var e = b[b.length - 1];
      if (null != d && null != e) {
        b = e.x - d.x;
        var f = e.y - d.y,
          g = e = 0;
        c = c.offset;
        null != c && (e = c.x, g = c.y);
        c = d.y + f / 2 + g * this.scale;
        a.absoluteOffset.x = d.x + b / 2 + e * this.scale;
        a.absoluteOffset.y = c;
      }
    }
  }
};
mxGraphView.prototype.getState = function(a, b) {
  b = b || !1;
  var c = null;
  null != a && (c = this.states.get(a), b && (null == c || this.updateStyle) && this.graph.isCellVisible(a) && (null == c ? (c = this.createState(a), this.states.put(a, c)) : c.style = this.graph.getCellStyle(a)));
  return c;
};
mxGraphView.prototype.isRendering = function() {
  return this.rendering;
};
mxGraphView.prototype.setRendering = function(a) {
  this.rendering = a;
};
mxGraphView.prototype.isAllowEval = function() {
  return this.allowEval;
};
mxGraphView.prototype.setAllowEval = function(a) {
  this.allowEval = a;
};
mxGraphView.prototype.getStates = function() {
  return this.states;
};
mxGraphView.prototype.setStates = function(a) {
  this.states = a;
};
mxGraphView.prototype.getCellStates = function(a) {
  if (null == a)
    return this.states;
  for (var b = [], c = 0; c < a.length; c++) {
    var d = this.getState(a[c]);
    null != d && b.push(d);
  }
  return b;
};
mxGraphView.prototype.removeState = function(a) {
  var b = null;
  null != a && (b = this.states.remove(a), null != b && (this.graph.cellRenderer.destroy(b), b.invalid = !0, b.destroy()));
  return b;
};
mxGraphView.prototype.createState = function(a) {
  return new mxCellState(this, a, this.graph.getCellStyle(a));
};
mxGraphView.prototype.getCanvas = function() {
  return this.canvas;
};
mxGraphView.prototype.getBackgroundPane = function() {
  return this.backgroundPane;
};
mxGraphView.prototype.getDrawPane = function() {
  return this.drawPane;
};
mxGraphView.prototype.getOverlayPane = function() {
  return this.overlayPane;
};
mxGraphView.prototype.getDecoratorPane = function() {
  return this.decoratorPane;
};
mxGraphView.prototype.isContainerEvent = function(a) {
  a = mxEvent.getSource(a);
  return a == this.graph.container || a.parentNode == this.backgroundPane || null != a.parentNode && a.parentNode.parentNode == this.backgroundPane || a == this.canvas.parentNode || a == this.canvas || a == this.backgroundPane || a == this.drawPane || a == this.overlayPane || a == this.decoratorPane;
};
mxGraphView.prototype.isScrollEvent = function(a) {
  var b = mxUtils.getOffset(this.graph.container);
  a = new mxPoint(a.clientX - b.x, a.clientY - b.y);
  b = this.graph.container.offsetWidth;
  var c = this.graph.container.clientWidth;
  if (b > c && a.x > c + 2 && a.x <= b)
    return !0;
  b = this.graph.container.offsetHeight;
  c = this.graph.container.clientHeight;
  return b > c && a.y > c + 2 && a.y <= b ? !0 : !1;
};
mxGraphView.prototype.init = function() {
  this.installListeners();
  this.graph.dialect == mxConstants.DIALECT_SVG ? this.createSvg() : this.createHtml();
};
mxGraphView.prototype.installListeners = function() {
  var a = this.graph,
    b = a.container;
  null != b && (mxClient.IS_TOUCH && (mxEvent.addListener(b, 'gesturestart', mxUtils.bind(this, function(c) {
    a.fireGestureEvent(c);
    mxEvent.consume(c);
  })), mxEvent.addListener(b, 'gesturechange', mxUtils.bind(this, function(c) {
    a.fireGestureEvent(c);
    mxEvent.consume(c);
  })), mxEvent.addListener(b, 'gestureend', mxUtils.bind(this, function(c) {
    a.fireGestureEvent(c);
    mxEvent.consume(c);
  }))), mxEvent.addGestureListeners(b, mxUtils.bind(this, function(c) {
    !this.isContainerEvent(c) || (mxClient.IS_IE || mxClient.IS_IE11 || mxClient.IS_GC || mxClient.IS_OP || mxClient.IS_SF) && this.isScrollEvent(c) || a.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(c));
  }), mxUtils.bind(this, function(c) {
    this.isContainerEvent(c) && a.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(c));
  }), mxUtils.bind(this, function(c) {
    this.isContainerEvent(c) && a.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(c));
  })), mxEvent.addListener(b, 'dblclick', mxUtils.bind(this, function(c) {
    this.isContainerEvent(c) && a.dblClick(c);
  })), a.addMouseListener({
    mouseDown: function(c, d) {
      a.popupMenuHandler.hideMenu();
    },
    mouseMove: function() {},
    mouseUp: function() {}
  }), this.moveHandler = mxUtils.bind(this, function(c) {
    null != a.tooltipHandler && a.tooltipHandler.isHideOnHover() && a.tooltipHandler.hide();
    if (this.captureDocumentGesture && a.isMouseDown && null != a.container && !this.isContainerEvent(c) && 'none' != a.container.style.display && 'hidden' != a.container.style.visibility && !mxEvent.isConsumed(c)) {
      var d = a.fireMouseEvent,
        e = mxEvent.MOUSE_MOVE,
        f = null;
      if (mxClient.IS_TOUCH) {
        f = mxEvent.getClientX(c);
        var g = mxEvent.getClientY(c);
        f = mxUtils.convertPoint(b, f, g);
        f = a.view.getState(a.getCellAt(f.x, f.y));
      }
      d.call(a, e, new mxMouseEvent(c, f));
    }
  }), this.endHandler = mxUtils.bind(this, function(c) {
    this.captureDocumentGesture && a.isMouseDown && null != a.container && !this.isContainerEvent(c) && 'none' != a.container.style.display && 'hidden' != a.container.style.visibility && a.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(c));
  }), mxEvent.addGestureListeners(document, null, this.moveHandler, this.endHandler));
};
mxGraphView.prototype.createHtml = function() {
  var a = this.graph.container;
  null != a && (this.canvas = this.createHtmlPane('100%', '100%'), this.canvas.style.overflow = 'hidden', this.backgroundPane = this.createHtmlPane('1px', '1px'), this.drawPane = this.createHtmlPane('1px', '1px'), this.overlayPane = this.createHtmlPane('1px', '1px'), this.decoratorPane = this.createHtmlPane('1px', '1px'), this.canvas.appendChild(this.backgroundPane), this.canvas.appendChild(this.drawPane), this.canvas.appendChild(this.overlayPane), this.canvas.appendChild(this.decoratorPane), a.appendChild(this.canvas), this.updateContainerStyle(a));
};
mxGraphView.prototype.updateHtmlCanvasSize = function(a, b) {
  if (null != this.graph.container) {
    var c = this.graph.container.offsetHeight;
    this.canvas.style.width = this.graph.container.offsetWidth < a ? a + 'px' : '100%';
    this.canvas.style.height = c < b ? b + 'px' : '100%';
  }
};
mxGraphView.prototype.createHtmlPane = function(a, b) {
  var c = document.createElement('DIV');
  null != a && null != b ? (c.style.position = 'absolute', c.style.left = '0px', c.style.top = '0px', c.style.width = a, c.style.height = b) : c.style.position = 'relative';
  return c;
};
mxGraphView.prototype.createSvg = function() {
  var a = this.graph.container;
  this.canvas = document.createElementNS(mxConstants.NS_SVG, 'g');
  this.backgroundPane = document.createElementNS(mxConstants.NS_SVG, 'g');
  this.canvas.appendChild(this.backgroundPane);
  this.drawPane = document.createElementNS(mxConstants.NS_SVG, 'g');
  this.canvas.appendChild(this.drawPane);
  this.overlayPane = document.createElementNS(mxConstants.NS_SVG, 'g');
  this.canvas.appendChild(this.overlayPane);
  this.decoratorPane = document.createElementNS(mxConstants.NS_SVG, 'g');
  this.canvas.appendChild(this.decoratorPane);
  var b = document.createElementNS(mxConstants.NS_SVG, 'svg');
  b.style.left = '0px';
  b.style.top = '0px';
  b.style.width = '100%';
  b.style.height = '100%';
  b.style.display = 'block';
  b.appendChild(this.canvas);
  if (mxClient.IS_IE || mxClient.IS_IE11)
    b.style.overflow = 'hidden';
  null != a && (a.appendChild(b), this.updateContainerStyle(a));
};
mxGraphView.prototype.updateContainerStyle = function(a) {
  var b = mxUtils.getCurrentStyle(a);
  null != b && 'static' == b.position && (a.style.position = 'relative');
  mxClient.IS_POINTER && (a.style.touchAction = 'none');
};
mxGraphView.prototype.destroy = function() {
  var a = null != this.canvas ? this.canvas.ownerSVGElement : null;
  null == a && (a = this.canvas);
  null != a && null != a.parentNode && (this.clear(this.currentRoot, !0), mxEvent.removeGestureListeners(document, null, this.moveHandler, this.endHandler), mxEvent.release(this.graph.container), a.parentNode.removeChild(a), this.decoratorPane = this.overlayPane = this.drawPane = this.backgroundPane = this.canvas = this.endHandler = this.moveHandler = null);
};