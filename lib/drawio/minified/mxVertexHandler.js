function mxVertexHandler(a) {
  null != a && (this.state = a, this.init(), this.escapeHandler = mxUtils.bind(this, function(b, c) {
    this.livePreview && null != this.index && (this.state.view.graph.cellRenderer.redraw(this.state, !0), this.state.view.invalidate(this.state.cell), this.state.invalid = !1, this.state.view.validate());
    this.reset();
  }), this.state.view.graph.addListener(mxEvent.ESCAPE, this.escapeHandler));
}
mxVertexHandler.prototype.graph = null;
mxVertexHandler.prototype.state = null;
mxVertexHandler.prototype.singleSizer = !1;
mxVertexHandler.prototype.index = null;
mxVertexHandler.prototype.allowHandleBoundsCheck = !0;
mxVertexHandler.prototype.handleImage = null;
mxVertexHandler.prototype.handlesVisible = !0;
mxVertexHandler.prototype.tolerance = 0;
mxVertexHandler.prototype.rotationEnabled = !1;
mxVertexHandler.prototype.parentHighlightEnabled = !1;
mxVertexHandler.prototype.rotationRaster = !0;
mxVertexHandler.prototype.rotationCursor = 'crosshair';
mxVertexHandler.prototype.livePreview = !1;
mxVertexHandler.prototype.movePreviewToFront = !1;
mxVertexHandler.prototype.manageSizers = !1;
mxVertexHandler.prototype.constrainGroupByChildren = !1;
mxVertexHandler.prototype.rotationHandleVSpacing = -16;
mxVertexHandler.prototype.horizontalOffset = 0;
mxVertexHandler.prototype.verticalOffset = 0;
mxVertexHandler.prototype.init = function() {
  this.graph = this.state.view.graph;
  this.selectionBounds = this.getSelectionBounds(this.state);
  this.bounds = new mxRectangle(this.selectionBounds.x, this.selectionBounds.y, this.selectionBounds.width, this.selectionBounds.height);
  this.selectionBorder = this.createSelectionShape(this.bounds);
  this.selectionBorder.dialect = mxConstants.DIALECT_SVG;
  this.selectionBorder.pointerEvents = !1;
  this.selectionBorder.rotation = Number(this.state.style[mxConstants.STYLE_ROTATION] || '0');
  this.selectionBorder.init(this.graph.getView().getOverlayPane());
  mxEvent.redirectMouseEvents(this.selectionBorder.node, this.graph, this.state);
  this.graph.isCellMovable(this.state.cell) && !this.graph.isCellLocked(this.state.cell) && this.selectionBorder.setCursor(mxConstants.CURSOR_MOVABLE_VERTEX);
  if (0 >= mxGraphHandler.prototype.maxCells || this.graph.getSelectionCount() < mxGraphHandler.prototype.maxCells) {
    var a = this.graph.isCellResizable(this.state.cell) && !this.graph.isCellLocked(this.state.cell);
    this.sizers = [];
    if (a || this.graph.isLabelMovable(this.state.cell) && 2 <= this.state.width && 2 <= this.state.height) {
      var b = 0;
      a && (this.singleSizer || (this.sizers.push(this.createSizer('nw-resize', b++)), this.sizers.push(this.createSizer('n-resize', b++)), this.sizers.push(this.createSizer('ne-resize', b++)), this.sizers.push(this.createSizer('w-resize', b++)), this.sizers.push(this.createSizer('e-resize', b++)), this.sizers.push(this.createSizer('sw-resize', b++)), this.sizers.push(this.createSizer('s-resize', b++))), this.sizers.push(this.createSizer('se-resize', b++)));
      a = this.graph.model.getGeometry(this.state.cell);
      null == a || a.relative || this.graph.isSwimlane(this.state.cell) || !this.graph.isLabelMovable(this.state.cell) || (this.labelShape = this.createSizer(mxConstants.CURSOR_LABEL_HANDLE, mxEvent.LABEL_HANDLE, mxConstants.LABEL_HANDLE_SIZE, mxConstants.LABEL_HANDLE_FILLCOLOR), this.sizers.push(this.labelShape));
    } else
      this.graph.isCellMovable(this.state.cell) && !a && 2 > this.state.width && 2 > this.state.height && (this.labelShape = this.createSizer(mxConstants.CURSOR_MOVABLE_VERTEX, mxEvent.LABEL_HANDLE, null, mxConstants.LABEL_HANDLE_FILLCOLOR), this.sizers.push(this.labelShape));
  }
  this.isRotationHandleVisible() && (this.rotationShape = this.createSizer(this.rotationCursor, mxEvent.ROTATION_HANDLE, mxConstants.HANDLE_SIZE + 3, mxConstants.HANDLE_FILLCOLOR), this.sizers.push(this.rotationShape));
  this.graph.isCellLocked(this.state.cell) || (this.customHandles = this.createCustomHandles());
  this.redraw();
  this.constrainGroupByChildren && this.updateMinBounds();
};
mxVertexHandler.prototype.isRotationHandleVisible = function() {
  return this.graph.isEnabled() && this.rotationEnabled && !this.graph.isCellLocked(this.state.cell) && this.graph.isCellRotatable(this.state.cell) && (0 >= mxGraphHandler.prototype.maxCells || this.graph.getSelectionCount() < mxGraphHandler.prototype.maxCells);
};
mxVertexHandler.prototype.isConstrainedEvent = function(a) {
  return mxEvent.isShiftDown(a.getEvent()) || 'fixed' == this.state.style[mxConstants.STYLE_ASPECT];
};
mxVertexHandler.prototype.isCenteredEvent = function(a, b) {
  return !1;
};
mxVertexHandler.prototype.createCustomHandles = function() {
  return null;
};
mxVertexHandler.prototype.updateMinBounds = function() {
  var a = this.graph.getChildCells(this.state.cell);
  if (0 < a.length && (this.minBounds = this.graph.view.getBounds(a), null != this.minBounds)) {
    a = this.state.view.scale;
    var b = this.state.view.translate;
    this.minBounds.x -= this.state.x;
    this.minBounds.y -= this.state.y;
    this.minBounds.x /= a;
    this.minBounds.y /= a;
    this.minBounds.width /= a;
    this.minBounds.height /= a;
    this.x0 = this.state.x / a - b.x;
    this.y0 = this.state.y / a - b.y;
  }
};
mxVertexHandler.prototype.getSelectionBounds = function(a) {
  return new mxRectangle(Math.round(a.x), Math.round(a.y), Math.round(a.width), Math.round(a.height));
};
mxVertexHandler.prototype.createParentHighlightShape = function(a) {
  return this.createSelectionShape(a);
};
mxVertexHandler.prototype.createSelectionShape = function(a) {
  a = new mxRectangleShape(mxRectangle.fromRectangle(a), null, this.getSelectionColor());
  a.strokewidth = this.getSelectionStrokeWidth();
  a.isDashed = this.isSelectionDashed();
  return a;
};
mxVertexHandler.prototype.getSelectionColor = function() {
  return this.graph.isCellEditable(this.state.cell) ? mxConstants.VERTEX_SELECTION_COLOR : mxConstants.LOCKED_HANDLE_FILLCOLOR;
};
mxVertexHandler.prototype.getSelectionStrokeWidth = function() {
  return mxConstants.VERTEX_SELECTION_STROKEWIDTH;
};
mxVertexHandler.prototype.isSelectionDashed = function() {
  return mxConstants.VERTEX_SELECTION_DASHED;
};
mxVertexHandler.prototype.createSizer = function(a, b, c, d) {
  c = c || mxConstants.HANDLE_SIZE;
  c = new mxRectangle(0, 0, c, c);
  d = this.createSizerShape(c, b, d);
  d.isHtmlAllowed() && null != this.state.text && this.state.text.node.parentNode == this.graph.container ? (--d.bounds.height, --d.bounds.width, d.dialect = mxConstants.DIALECT_STRICTHTML, d.init(this.graph.container)) : (d.dialect = this.graph.dialect != mxConstants.DIALECT_SVG ? mxConstants.DIALECT_MIXEDHTML : mxConstants.DIALECT_SVG, d.init(this.graph.getView().getOverlayPane()));
  mxEvent.redirectMouseEvents(d.node, this.graph, this.state);
  this.graph.isEnabled() && d.setCursor(a);
  this.isSizerVisible(b) || (d.visible = !1);
  return d;
};
mxVertexHandler.prototype.isSizerVisible = function(a) {
  return !0;
};
mxVertexHandler.prototype.createSizerShape = function(a, b, c) {
  return null != this.handleImage ? (a = new mxRectangle(a.x, a.y, this.handleImage.width, this.handleImage.height), a = new mxImageShape(a, this.handleImage.src), a.preserveImageAspect = !1, a) : b == mxEvent.ROTATION_HANDLE ? new mxEllipse(a, c || mxConstants.HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR) : new mxRectangleShape(a, c || mxConstants.HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR);
};
mxVertexHandler.prototype.moveSizerTo = function(a, b, c) {
  null != a && (a.bounds.x = Math.floor(b - a.bounds.width / 2), a.bounds.y = Math.floor(c - a.bounds.height / 2), null != a.node && 'none' != a.node.style.display && a.redraw());
};
mxVertexHandler.prototype.getHandleForEvent = function(a) {
  var b = mxEvent.isMouseEvent(a.getEvent()) ? 1 : this.tolerance,
    c = this.allowHandleBoundsCheck && (mxClient.IS_IE || 0 < b) ? new mxRectangle(a.getGraphX() - b, a.getGraphY() - b, 2 * b, 2 * b) : null;
  b = mxUtils.bind(this, function(e) {
    var f = null != e && e.constructor != mxImageShape && this.allowHandleBoundsCheck ? e.strokewidth + e.svgStrokeTolerance : null;
    f = null != f ? new mxRectangle(a.getGraphX() - Math.floor(f / 2), a.getGraphY() - Math.floor(f / 2), f, f) : c;
    return null != e && (a.isSource(e) || e.intersectsRectangle(f));
  });
  if (b(this.rotationShape))
    return mxEvent.ROTATION_HANDLE;
  if (b(this.labelShape))
    return mxEvent.LABEL_HANDLE;
  if (null != this.sizers)
    for (var d = 0; d < this.sizers.length; d++)
      if (b(this.sizers[d]))
        return d;
  if (null != this.customHandles && this.isCustomHandleEvent(a))
    for (d = this.customHandles.length - 1; 0 <= d; d--)
      if (null != this.customHandles[d] && b(this.customHandles[d].shape))
        return mxEvent.CUSTOM_HANDLE - d;
  return null;
};
mxVertexHandler.prototype.isCustomHandleEvent = function(a) {
  return !0;
};
mxVertexHandler.prototype.mouseDown = function(a, b) {
  !b.isConsumed() && this.graph.isEnabled() && (a = this.getHandleForEvent(b), null != a && (this.start(b.getGraphX(), b.getGraphY(), a), b.consume()));
};
mxVertexHandler.prototype.isLivePreviewBorder = function() {
  return null != this.state.shape && null == this.state.shape.fill && null == this.state.shape.stroke;
};
mxVertexHandler.prototype.start = function(a, b, c) {
  if (null != this.selectionBorder)
    if (this.livePreviewActive = this.livePreview && 0 == this.graph.model.getChildCount(this.state.cell), this.inTolerance = !0, this.childOffsetY = this.childOffsetX = 0, this.index = c, this.startX = a, this.startY = b, this.index <= mxEvent.CUSTOM_HANDLE && this.isGhostPreview())
      this.ghostPreview = this.createGhostPreview();
    else {
      a = this.state.view.graph.model;
      b = a.getParent(this.state.cell);
      this.state.view.currentRoot != b && (a.isVertex(b) || a.isEdge(b)) && (this.parentState = this.state.view.graph.view.getState(b));
      this.selectionBorder.node.style.display = c == mxEvent.ROTATION_HANDLE ? 'inline' : 'none';
      if (!this.livePreviewActive || this.isLivePreviewBorder())
        this.preview = this.createSelectionShape(this.bounds), mxClient.IS_SVG && 0 != Number(this.state.style[mxConstants.STYLE_ROTATION] || '0') || null == this.state.text || this.state.text.node.parentNode != this.graph.container ? (this.preview.dialect = mxConstants.DIALECT_SVG, this.preview.init(this.graph.view.getOverlayPane())) : (this.preview.dialect = mxConstants.DIALECT_STRICTHTML, this.preview.init(this.graph.container));
      c == mxEvent.ROTATION_HANDLE && (b = this.getRotationHandlePosition(), a = b.x - this.state.getCenterX(), b = b.y - this.state.getCenterY(), this.startAngle = 0 != a ? 180 * Math.atan(b / a) / Math.PI + 90 : 0, this.startDist = Math.sqrt(a * a + b * b));
      if (this.livePreviewActive)
        for (this.hideSizers(), c == mxEvent.ROTATION_HANDLE ? this.rotationShape.node.style.display = '' : c == mxEvent.LABEL_HANDLE ? this.labelShape.node.style.display = '' : null != this.sizers && null != this.sizers[c] ? this.sizers[c].node.style.display = '' : c <= mxEvent.CUSTOM_HANDLE && null != this.customHandles && null != this.customHandles[mxEvent.CUSTOM_HANDLE - c] && this.customHandles[mxEvent.CUSTOM_HANDLE - c].setVisible(!0), c = this.graph.getEdges(this.state.cell), this.edgeHandlers = [], a = 0; a < c.length; a++)
          b = this.graph.selectionCellsHandler.getHandler(c[a]), null != b && this.edgeHandlers.push(b);
    }
};
mxVertexHandler.prototype.createGhostPreview = function() {
  var a = this.graph.cellRenderer.createShape(this.state);
  a.init(this.graph.view.getOverlayPane());
  a.scale = this.state.view.scale;
  a.bounds = this.bounds;
  a.outline = !0;
  return a;
};
mxVertexHandler.prototype.setHandlesVisible = function(a) {
  this.handlesVisible = a;
  if (null != this.sizers)
    for (var b = 0; b < this.sizers.length; b++)
      this.sizers[b].node.style.display = a ? '' : 'none';
  if (null != this.customHandles)
    for (b = 0; b < this.customHandles.length; b++)
      null != this.customHandles[b] && this.customHandles[b].setVisible(a);
};
mxVertexHandler.prototype.hideSizers = function() {
  this.setHandlesVisible(!1);
};
mxVertexHandler.prototype.checkTolerance = function(a) {
  this.inTolerance && null != this.startX && null != this.startY && (mxEvent.isMouseEvent(a.getEvent()) || Math.abs(a.getGraphX() - this.startX) > this.graph.tolerance || Math.abs(a.getGraphY() - this.startY) > this.graph.tolerance) && (this.inTolerance = !1);
};
mxVertexHandler.prototype.updateHint = function(a) {};
mxVertexHandler.prototype.removeHint = function() {};
mxVertexHandler.prototype.roundAngle = function(a) {
  return Math.round(10 * a) / 10;
};
mxVertexHandler.prototype.roundLength = function(a) {
  return Math.round(100 * a) / 100;
};
mxVertexHandler.prototype.mouseMove = function(a, b) {
  b.isConsumed() || null == this.index ? this.graph.isMouseDown || null == this.getHandleForEvent(b) || b.consume(!1) : (this.checkTolerance(b), this.inTolerance || (this.index <= mxEvent.CUSTOM_HANDLE ? null != this.customHandles && null != this.customHandles[mxEvent.CUSTOM_HANDLE - this.index] && (this.customHandles[mxEvent.CUSTOM_HANDLE - this.index].processEvent(b), this.customHandles[mxEvent.CUSTOM_HANDLE - this.index].active = !0, null != this.ghostPreview ? (this.ghostPreview.apply(this.state), this.ghostPreview.strokewidth = this.getSelectionStrokeWidth() / this.ghostPreview.scale / this.ghostPreview.scale, this.ghostPreview.isDashed = this.isSelectionDashed(), this.ghostPreview.stroke = this.getSelectionColor(), this.ghostPreview.redraw(), null != this.selectionBounds && (this.selectionBorder.node.style.display = 'none')) : (this.movePreviewToFront && this.moveToFront(), this.customHandles[mxEvent.CUSTOM_HANDLE - this.index].positionChanged())) : this.index == mxEvent.LABEL_HANDLE ? this.moveLabel(b) : (this.index == mxEvent.ROTATION_HANDLE ? this.rotateVertex(b) : this.resizeVertex(b), this.updateHint(b))), b.consume());
};
mxVertexHandler.prototype.isGhostPreview = function() {
  return 0 < this.state.view.graph.model.getChildCount(this.state.cell);
};
mxVertexHandler.prototype.moveLabel = function(a) {
  var b = new mxPoint(a.getGraphX(), a.getGraphY()),
    c = this.graph.view.translate,
    d = this.graph.view.scale;
  this.graph.isGridEnabledEvent(a.getEvent()) && (b.x = (this.graph.snap(b.x / d - c.x) + c.x) * d, b.y = (this.graph.snap(b.y / d - c.y) + c.y) * d);
  this.moveSizerTo(this.sizers[null != this.rotationShape ? this.sizers.length - 2 : this.sizers.length - 1], b.x, b.y);
};
mxVertexHandler.prototype.rotateVertex = function(a) {
  var b = new mxPoint(a.getGraphX(), a.getGraphY()),
    c = this.state.x + this.state.width / 2 - b.x,
    d = this.state.y + this.state.height / 2 - b.y;
  this.currentAlpha = 0 != c ? 180 * Math.atan(d / c) / Math.PI + 90 : 0 > d ? 180 : 0;
  0 < c && (this.currentAlpha -= 180);
  this.currentAlpha -= this.startAngle;
  this.rotationRaster && this.graph.isGridEnabledEvent(a.getEvent()) ? (c = b.x - this.state.getCenterX(), d = b.y - this.state.getCenterY(), a = Math.sqrt(c * c + d * d), raster = 2 > a - this.startDist ? 15 : 25 > a - this.startDist ? 5 : 1, this.currentAlpha = Math.round(this.currentAlpha / raster) * raster) : this.currentAlpha = this.roundAngle(this.currentAlpha);
  this.selectionBorder.rotation = this.currentAlpha;
  this.selectionBorder.redraw();
  this.livePreviewActive && this.redrawHandles();
};
mxVertexHandler.prototype.resizeVertex = function(a) {
  var b = new mxPoint(this.state.getCenterX(), this.state.getCenterY()),
    c = mxUtils.toRadians(this.state.style[mxConstants.STYLE_ROTATION] || '0'),
    d = new mxPoint(a.getGraphX(), a.getGraphY()),
    e = this.graph.view.translate,
    f = this.graph.view.scale,
    g = Math.cos(-c),
    k = Math.sin(-c),
    l = d.x - this.startX,
    m = d.y - this.startY;
  d = k * l + g * m;
  l = g * l - k * m;
  m = d;
  g = this.graph.getCellGeometry(this.state.cell);
  this.unscaledBounds = this.union(g, l / f, m / f, this.index, this.graph.isGridEnabledEvent(a.getEvent()), 1, new mxPoint(0, 0), this.isConstrainedEvent(a), this.isCenteredEvent(this.state, a));
  g.relative || (k = this.graph.getMaximumGraphBounds(), null != k && null != this.parentState && (k = mxRectangle.fromRectangle(k), k.x -= (this.parentState.x - e.x * f) / f, k.y -= (this.parentState.y - e.y * f) / f), this.graph.isConstrainChild(this.state.cell) && (d = this.graph.getCellContainmentArea(this.state.cell), null != d && (l = this.graph.getOverlap(this.state.cell), 0 < l && (d = mxRectangle.fromRectangle(d), d.x -= d.width * l, d.y -= d.height * l, d.width += 2 * d.width * l, d.height += 2 * d.height * l), null == k ? k = d : (k = mxRectangle.fromRectangle(k), k.intersect(d)))), null != k && (this.unscaledBounds.x < k.x && (this.unscaledBounds.width -= k.x - this.unscaledBounds.x, this.unscaledBounds.x = k.x), this.unscaledBounds.y < k.y && (this.unscaledBounds.height -= k.y - this.unscaledBounds.y, this.unscaledBounds.y = k.y), this.unscaledBounds.x + this.unscaledBounds.width > k.x + k.width && (this.unscaledBounds.width -= this.unscaledBounds.x + this.unscaledBounds.width - k.x - k.width), this.unscaledBounds.y + this.unscaledBounds.height > k.y + k.height && (this.unscaledBounds.height -= this.unscaledBounds.y + this.unscaledBounds.height - k.y - k.height)));
  d = this.bounds;
  this.bounds = new mxRectangle((null != this.parentState ? this.parentState.x : e.x * f) + this.unscaledBounds.x * f, (null != this.parentState ? this.parentState.y : e.y * f) + this.unscaledBounds.y * f, this.unscaledBounds.width * f, this.unscaledBounds.height * f);
  g.relative && null != this.parentState && (this.bounds.x += this.state.x - this.parentState.x, this.bounds.y += this.state.y - this.parentState.y);
  g = Math.cos(c);
  k = Math.sin(c);
  c = new mxPoint(this.bounds.getCenterX(), this.bounds.getCenterY());
  l = c.x - b.x;
  m = c.y - b.y;
  b = g * l - k * m - l;
  c = k * l + g * m - m;
  l = this.bounds.x - this.state.x;
  m = this.bounds.y - this.state.y;
  e = g * l - k * m;
  g = k * l + g * m;
  this.bounds.x += b;
  this.bounds.y += c;
  this.unscaledBounds.x = this.roundLength(this.unscaledBounds.x + b / f);
  this.unscaledBounds.y = this.roundLength(this.unscaledBounds.y + c / f);
  this.unscaledBounds.width = this.roundLength(this.unscaledBounds.width);
  this.unscaledBounds.height = this.roundLength(this.unscaledBounds.height);
  this.graph.isCellCollapsed(this.state.cell) || 0 == b && 0 == c ? this.childOffsetY = this.childOffsetX = 0 : (this.childOffsetX = this.state.x - this.bounds.x + e, this.childOffsetY = this.state.y - this.bounds.y + g);
  d.equals(this.bounds) || (this.livePreviewActive && this.updateLivePreview(a), null != this.preview ? this.drawPreview() : this.updateParentHighlight());
};
mxVertexHandler.prototype.updateLivePreview = function(a) {
  var b = this.graph.view.scale,
    c = this.graph.view.translate;
  a = this.state.clone();
  this.state.x = this.bounds.x;
  this.state.y = this.bounds.y;
  this.state.origin = new mxPoint(this.state.x / b - c.x, this.state.y / b - c.y);
  this.state.width = this.bounds.width;
  this.state.height = this.bounds.height;
  b = this.state.absoluteOffset;
  new mxPoint(b.x, b.y);
  this.state.absoluteOffset.x = 0;
  this.state.absoluteOffset.y = 0;
  b = this.graph.getCellGeometry(this.state.cell);
  null != b && (c = b.offset || this.EMPTY_POINT, null == c || b.relative || (this.state.absoluteOffset.x = this.state.view.scale * c.x, this.state.absoluteOffset.y = this.state.view.scale * c.y), this.state.view.updateVertexLabelOffset(this.state));
  this.state.view.graph.cellRenderer.redraw(this.state, !0);
  this.state.view.invalidate(this.state.cell);
  this.state.invalid = !1;
  this.state.view.validate();
  this.redrawHandles();
  this.movePreviewToFront && this.moveToFront();
  null != this.state.control && null != this.state.control.node && (this.state.control.node.style.visibility = 'hidden');
  this.state.setState(a);
};
mxVertexHandler.prototype.moveToFront = function() {
  if (null != this.state.text && null != this.state.text.node && null != this.state.text.node.nextSibling || null != this.state.shape && null != this.state.shape.node && null != this.state.shape.node.nextSibling && (null == this.state.text || this.state.shape.node.nextSibling != this.state.text.node))
    null != this.state.shape && null != this.state.shape.node && this.state.shape.node.parentNode.appendChild(this.state.shape.node), null != this.state.text && null != this.state.text.node && this.state.text.node.parentNode.appendChild(this.state.text.node);
};
mxVertexHandler.prototype.mouseUp = function(a, b) {
  if (null != this.index && null != this.state) {
    var c = new mxPoint(b.getGraphX(), b.getGraphY());
    a = this.index;
    this.index = null;
    null == this.ghostPreview && (this.state.view.invalidate(this.state.cell, !1, !1), this.state.view.validate());
    this.graph.getModel().beginUpdate();
    try {
      if (a <= mxEvent.CUSTOM_HANDLE) {
        if (null != this.customHandles && null != this.customHandles[mxEvent.CUSTOM_HANDLE - a]) {
          var d = this.state.view.graph.getCellStyle(this.state.cell);
          this.customHandles[mxEvent.CUSTOM_HANDLE - a].active = !1;
          this.customHandles[mxEvent.CUSTOM_HANDLE - a].execute(b);
          null != this.customHandles && null != this.customHandles[mxEvent.CUSTOM_HANDLE - a] && (this.state.style = d, this.customHandles[mxEvent.CUSTOM_HANDLE - a].positionChanged());
        }
      } else if (a == mxEvent.ROTATION_HANDLE)
        if (null != this.currentAlpha) {
          var e = this.currentAlpha - (this.state.style[mxConstants.STYLE_ROTATION] || 0);
          0 != e && this.rotateCell(this.state.cell, e);
        } else
          this.rotateClick();
      else {
        var f = this.graph.isGridEnabledEvent(b.getEvent()),
          g = mxUtils.toRadians(this.state.style[mxConstants.STYLE_ROTATION] || '0'),
          k = Math.cos(-g),
          l = Math.sin(-g),
          m = c.x - this.startX,
          n = c.y - this.startY;
        d = l * m + k * n;
        m = k * m - l * n;
        n = d;
        var p = this.graph.view.scale,
          r = this.isRecursiveResize(this.state, b);
        this.resizeCell(this.state.cell, this.roundLength(m / p), this.roundLength(n / p), a, f, this.isConstrainedEvent(b), r);
      }
    } finally {
      this.graph.getModel().endUpdate();
    }
    b.consume();
    this.reset();
    this.redrawHandles();
  }
};
mxVertexHandler.prototype.isRecursiveResize = function(a, b) {
  return this.graph.isRecursiveResize(this.state);
};
mxVertexHandler.prototype.rotateClick = function() {};
mxVertexHandler.prototype.rotateCell = function(a, b, c) {
  if (0 != b) {
    var d = this.graph.getModel();
    if (d.isVertex(a) || d.isEdge(a)) {
      if (!d.isEdge(a)) {
        var e = (this.graph.getCurrentCellStyle(a)[mxConstants.STYLE_ROTATION] || 0) + b;
        this.graph.setCellStyles(mxConstants.STYLE_ROTATION, e, [a]);
      }
      e = this.graph.getCellGeometry(a);
      if (null != e) {
        var f = this.graph.getCellGeometry(c);
        null == f || d.isEdge(c) || (e = e.clone(), e.rotate(b, new mxPoint(f.width / 2, f.height / 2)), d.setGeometry(a, e));
        if (d.isVertex(a) && !e.relative || d.isEdge(a))
          for (c = d.getChildCount(a), e = 0; e < c; e++)
            this.rotateCell(d.getChildAt(a, e), b, a);
      }
    }
  }
};
mxVertexHandler.prototype.reset = function() {
  null != this.sizers && null != this.index && null != this.sizers[this.index] && 'none' == this.sizers[this.index].node.style.display && (this.sizers[this.index].node.style.display = '');
  this.index = this.inTolerance = this.currentAlpha = null;
  null != this.preview && (this.preview.destroy(), this.preview = null);
  null != this.ghostPreview && (this.ghostPreview.destroy(), this.ghostPreview = null);
  if (this.livePreviewActive && null != this.sizers) {
    for (var a = 0; a < this.sizers.length; a++)
      null != this.sizers[a] && (this.sizers[a].node.style.display = '');
    null != this.state.control && null != this.state.control.node && (this.state.control.node.style.visibility = '');
  }
  if (null != this.customHandles)
    for (a = 0; a < this.customHandles.length; a++)
      null != this.customHandles[a] && (this.customHandles[a].active ? (this.customHandles[a].active = !1, this.customHandles[a].reset()) : this.customHandles[a].setVisible(!0));
  null != this.selectionBorder && (this.selectionBorder.node.style.display = 'inline', this.selectionBounds = this.getSelectionBounds(this.state), this.bounds = new mxRectangle(this.selectionBounds.x, this.selectionBounds.y, this.selectionBounds.width, this.selectionBounds.height), this.drawPreview());
  this.removeHint();
  this.redrawHandles();
  this.edgeHandlers = null;
  this.handlesVisible = !0;
  this.livePreviewActive = this.unscaledBounds = null;
};
mxVertexHandler.prototype.resizeCell = function(a, b, c, d, e, f, g) {
  b = this.graph.model.getGeometry(a);
  null != b && (d == mxEvent.LABEL_HANDLE ? (d = -mxUtils.toRadians(this.state.style[mxConstants.STYLE_ROTATION] || '0'), g = Math.cos(d), c = Math.sin(d), d = this.graph.view.scale, g = mxUtils.getRotatedPoint(new mxPoint(Math.round((this.labelShape.bounds.getCenterX() - this.startX) / d), Math.round((this.labelShape.bounds.getCenterY() - this.startY) / d)), g, c), b = b.clone(), null == b.offset ? b.offset = g : (b.offset.x += g.x, b.offset.y += g.y), this.graph.model.setGeometry(a, b)) : null != this.unscaledBounds && (d = this.graph.view.scale, 0 == this.childOffsetX && 0 == this.childOffsetY || this.moveChildren(a, Math.round(this.childOffsetX / d), Math.round(this.childOffsetY / d)), this.graph.resizeCell(a, this.unscaledBounds, g)));
};
mxVertexHandler.prototype.moveChildren = function(a, b, c) {
  for (var d = this.graph.getModel(), e = d.getChildCount(a), f = 0; f < e; f++) {
    var g = d.getChildAt(a, f),
      k = this.graph.getCellGeometry(g);
    null != k && (k = k.clone(), k.translate(b, c), d.setGeometry(g, k));
  }
};
mxVertexHandler.prototype.union = function(a, b, c, d, e, f, g, k, l) {
  e = null != e ? e && this.graph.gridEnabled : this.graph.gridEnabled;
  if (this.singleSizer)
    return d = a.x + a.width + b, g = a.y + a.height + c, e && (d = this.graph.snap(d / f) * f, g = this.graph.snap(g / f) * f), f = new mxRectangle(a.x, a.y, 0, 0), f.add(new mxRectangle(d, g, 0, 0)), f;
  var m = a.width,
    n = a.height,
    p = a.x - g.x * f,
    r = p + m;
  a = a.y - g.y * f;
  var q = a + n,
    t = p + m / 2,
    u = a + n / 2;
  4 < d ? (q += c, q = e ? this.graph.snap(q / f) * f : Math.round(q / f) * f) : 3 > d && (a += c, a = e ? this.graph.snap(a / f) * f : Math.round(a / f) * f);
  if (0 == d || 3 == d || 5 == d)
    p += b, p = e ? this.graph.snap(p / f) * f : Math.round(p / f) * f;
  else if (2 == d || 4 == d || 7 == d)
    r += b, r = e ? this.graph.snap(r / f) * f : Math.round(r / f) * f;
  e = r - p;
  c = q - a;
  k && (k = this.graph.getCellGeometry(this.state.cell), null != k && (k = k.width / k.height, 1 == d || 2 == d || 7 == d || 6 == d ? e = c * k : c = e / k, 0 == d && (p = r - e, a = q - c)));
  l && (e += e - m, c += c - n, p += t - (p + e / 2), a += u - (a + c / 2));
  0 > e && (p += e, e = Math.abs(e));
  0 > c && (a += c, c = Math.abs(c));
  d = new mxRectangle(p + g.x * f, a + g.y * f, e, c);
  null != this.minBounds && (d.width = Math.max(d.width, this.minBounds.x * f + this.minBounds.width * f + Math.max(0, this.x0 * f - d.x)), d.height = Math.max(d.height, this.minBounds.y * f + this.minBounds.height * f + Math.max(0, this.y0 * f - d.y)));
  return d;
};
mxVertexHandler.prototype.redraw = function(a) {
  this.selectionBounds = this.getSelectionBounds(this.state);
  this.bounds = new mxRectangle(this.selectionBounds.x, this.selectionBounds.y, this.selectionBounds.width, this.selectionBounds.height);
  this.drawPreview();
  a || this.redrawHandles();
};
mxVertexHandler.prototype.getHandlePadding = function() {
  var a = new mxPoint(0, 0),
    b = this.tolerance;
  null != this.sizers && 0 < this.sizers.length && null != this.sizers[0] && (this.bounds.width < 2 * this.sizers[0].bounds.width + 2 * b || this.bounds.height < 2 * this.sizers[0].bounds.height + 2 * b) && (b /= 2, a.x = this.sizers[0].bounds.width + b, a.y = this.sizers[0].bounds.height + b);
  return a;
};
mxVertexHandler.prototype.getSizerBounds = function() {
  return this.bounds;
};
mxVertexHandler.prototype.redrawHandles = function() {
  var a = this.getSizerBounds(),
    b = this.tolerance;
  this.verticalOffset = this.horizontalOffset = 0;
  if (null != this.customHandles)
    for (var c = 0; c < this.customHandles.length; c++)
      if (null != this.customHandles[c]) {
        var d = this.customHandles[c].shape.node.style.display;
        this.customHandles[c].redraw();
        this.customHandles[c].shape.node.style.display = d;
        this.customHandles[c].shape.node.style.visibility = this.handlesVisible && this.isCustomHandleVisible(this.customHandles[c]) ? '' : 'hidden';
      }
  if (null != this.sizers && 0 < this.sizers.length && null != this.sizers[0]) {
    if (null == this.index && this.manageSizers && 8 <= this.sizers.length) {
      c = this.getHandlePadding();
      this.horizontalOffset = c.x;
      this.verticalOffset = c.y;
      if (0 != this.horizontalOffset || 0 != this.verticalOffset)
        a = new mxRectangle(a.x, a.y, a.width, a.height), a.x -= this.horizontalOffset / 2, a.width += this.horizontalOffset, a.y -= this.verticalOffset / 2, a.height += this.verticalOffset;
      8 <= this.sizers.length && (a.width < 2 * this.sizers[0].bounds.width + 2 * b || a.height < 2 * this.sizers[0].bounds.height + 2 * b ? (this.sizers[0].node.style.display = 'none', this.sizers[2].node.style.display = 'none', this.sizers[5].node.style.display = 'none', this.sizers[7].node.style.display = 'none') : this.handlesVisible && (this.sizers[0].node.style.display = '', this.sizers[2].node.style.display = '', this.sizers[5].node.style.display = '', this.sizers[7].node.style.display = ''));
    }
    b = a.x + a.width;
    c = a.y + a.height;
    if (this.singleSizer)
      this.moveSizerTo(this.sizers[0], b, c);
    else {
      d = a.x + a.width / 2;
      var e = a.y + a.height / 2;
      if (8 <= this.sizers.length) {
        var f = 'nw-resize n-resize ne-resize e-resize se-resize s-resize sw-resize w-resize'.split(' '),
          g = mxUtils.toRadians(this.state.style[mxConstants.STYLE_ROTATION] || '0'),
          k = Math.cos(g),
          l = Math.sin(g);
        g = Math.round(4 * g / Math.PI);
        var m = new mxPoint(a.getCenterX(), a.getCenterY()),
          n = mxUtils.getRotatedPoint(new mxPoint(a.x, a.y), k, l, m);
        this.moveSizerTo(this.sizers[0], n.x, n.y);
        this.sizers[0].setCursor(f[mxUtils.mod(0 + g, f.length)]);
        n.x = d;
        n.y = a.y;
        n = mxUtils.getRotatedPoint(n, k, l, m);
        this.moveSizerTo(this.sizers[1], n.x, n.y);
        this.sizers[1].setCursor(f[mxUtils.mod(1 + g, f.length)]);
        n.x = b;
        n.y = a.y;
        n = mxUtils.getRotatedPoint(n, k, l, m);
        this.moveSizerTo(this.sizers[2], n.x, n.y);
        this.sizers[2].setCursor(f[mxUtils.mod(2 + g, f.length)]);
        n.x = a.x;
        n.y = e;
        n = mxUtils.getRotatedPoint(n, k, l, m);
        this.moveSizerTo(this.sizers[3], n.x, n.y);
        this.sizers[3].setCursor(f[mxUtils.mod(7 + g, f.length)]);
        n.x = b;
        n.y = e;
        n = mxUtils.getRotatedPoint(n, k, l, m);
        this.moveSizerTo(this.sizers[4], n.x, n.y);
        this.sizers[4].setCursor(f[mxUtils.mod(3 + g, f.length)]);
        n.x = a.x;
        n.y = c;
        n = mxUtils.getRotatedPoint(n, k, l, m);
        this.moveSizerTo(this.sizers[5], n.x, n.y);
        this.sizers[5].setCursor(f[mxUtils.mod(6 + g, f.length)]);
        n.x = d;
        n.y = c;
        n = mxUtils.getRotatedPoint(n, k, l, m);
        this.moveSizerTo(this.sizers[6], n.x, n.y);
        this.sizers[6].setCursor(f[mxUtils.mod(5 + g, f.length)]);
        n.x = b;
        n.y = c;
        n = mxUtils.getRotatedPoint(n, k, l, m);
        this.moveSizerTo(this.sizers[7], n.x, n.y);
        this.sizers[7].setCursor(f[mxUtils.mod(4 + g, f.length)]);
        n.x = d + this.state.absoluteOffset.x;
        n.y = e + this.state.absoluteOffset.y;
        n = mxUtils.getRotatedPoint(n, k, l, m);
        this.moveSizerTo(this.sizers[8], n.x, n.y);
      } else
        2 <= this.state.width && 2 <= this.state.height ? this.moveSizerTo(this.sizers[0], d + this.state.absoluteOffset.x, e + this.state.absoluteOffset.y) : this.moveSizerTo(this.sizers[0], this.state.x, this.state.y);
    }
  }
  null != this.rotationShape && (g = mxUtils.toRadians(null != this.currentAlpha ? this.currentAlpha : this.state.style[mxConstants.STYLE_ROTATION] || '0'), k = Math.cos(g), l = Math.sin(g), m = new mxPoint(this.state.getCenterX(), this.state.getCenterY()), n = mxUtils.getRotatedPoint(this.getRotationHandlePosition(), k, l, m), null != this.rotationShape.node && (this.moveSizerTo(this.rotationShape, n.x, n.y), this.rotationShape.node.style.visibility = this.state.view.graph.isEditing() || !this.handlesVisible ? 'hidden' : ''));
  null != this.selectionBorder && (this.selectionBorder.rotation = Number(this.state.style[mxConstants.STYLE_ROTATION] || '0'));
  if (null != this.edgeHandlers)
    for (c = 0; c < this.edgeHandlers.length; c++)
      this.edgeHandlers[c].redraw();
};
mxVertexHandler.prototype.isCustomHandleVisible = function(a) {
  return !this.graph.isEditing() && 1 == this.state.view.graph.getSelectionCount();
};
mxVertexHandler.prototype.getRotationHandlePosition = function() {
  return new mxPoint(this.bounds.x + this.bounds.width / 2, this.bounds.y + this.rotationHandleVSpacing);
};
mxVertexHandler.prototype.isParentHighlightVisible = function() {
  return !this.graph.isCellSelected(this.graph.model.getParent(this.state.cell));
};
mxVertexHandler.prototype.destroyParentHighlight = function() {
  null != this.parentHighlight.state && (delete this.parentHighlight.state.parentHighlight, delete this.parentHighlight.state);
  this.parentHighlight.destroy();
  this.parentHighlight = null;
};
mxVertexHandler.prototype.updateParentHighlight = function() {
  if (!this.isDestroyed()) {
    var a = this.isParentHighlightVisible(),
      b = this.graph.model.getParent(this.state.cell),
      c = this.graph.view.getState(b);
    null != this.parentHighlight ? this.graph.model.isVertex(b) && a ? (a = this.parentHighlight.bounds, null == c || a.x == c.x && a.y == c.y && a.width == c.width && a.height == c.height || (this.parentHighlight.bounds = mxRectangle.fromRectangle(c), this.parentHighlight.redraw())) : this.destroyParentHighlight() : this.parentHighlightEnabled && a && this.graph.model.isVertex(b) && null != c && null == c.parentHighlight && (this.parentHighlight = this.createParentHighlightShape(c), this.parentHighlight.dialect = mxConstants.DIALECT_SVG, this.parentHighlight.pointerEvents = !1, this.parentHighlight.rotation = Number(c.style[mxConstants.STYLE_ROTATION] || '0'), this.parentHighlight.init(this.graph.getView().getOverlayPane()), this.parentHighlight.redraw(), c.parentHighlight = this.parentHighlight, this.parentHighlight.state = c);
  }
};
mxVertexHandler.prototype.drawPreview = function() {
  null != this.preview && (this.preview.bounds = this.bounds, this.preview.node.parentNode == this.graph.container && (this.preview.bounds.width = Math.max(0, this.preview.bounds.width - 1), this.preview.bounds.height = Math.max(0, this.preview.bounds.height - 1)), this.preview.rotation = Number(this.state.style[mxConstants.STYLE_ROTATION] || '0'), this.preview.redraw());
  this.selectionBorder.bounds = this.getSelectionBorderBounds();
  this.selectionBorder.redraw();
  this.updateParentHighlight();
};
mxVertexHandler.prototype.getSelectionBorderBounds = function() {
  return this.bounds;
};
mxVertexHandler.prototype.isDestroyed = function() {
  return null == this.selectionBorder;
};
mxVertexHandler.prototype.destroy = function() {
  null != this.escapeHandler && (this.state.view.graph.removeListener(this.escapeHandler), this.escapeHandler = null);
  null != this.preview && (this.preview.destroy(), this.preview = null);
  null != this.ghostPreview && (this.ghostPreview.destroy(), this.ghostPreview = null);
  null != this.selectionBorder && (this.selectionBorder.destroy(), this.selectionBorder = null);
  null != this.parentHighlight && this.destroyParentHighlight();
  this.labelShape = null;
  this.removeHint();
  if (null != this.sizers) {
    for (var a = 0; a < this.sizers.length; a++)
      this.sizers[a].destroy();
    this.sizers = null;
  }
  if (null != this.customHandles) {
    for (a = 0; a < this.customHandles.length; a++)
      null != this.customHandles[a] && this.customHandles[a].destroy();
    this.customHandles = null;
  }
};