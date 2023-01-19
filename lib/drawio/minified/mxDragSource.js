function mxDragSource(a, b) {
  this.element = a;
  this.dropHandler = b;
  mxEvent.addGestureListeners(a, mxUtils.bind(this, function(c) {
    this.mouseDown(c);
  }));
  mxEvent.addListener(a, 'dragstart', function(c) {
    mxEvent.consume(c);
  });
  this.eventConsumer = function(c, d) {
    c = d.getProperty('eventName');
    d = d.getProperty('event');
    c != mxEvent.MOUSE_DOWN && d.consume();
  };
}
mxDragSource.prototype.element = null;
mxDragSource.prototype.dropHandler = null;
mxDragSource.prototype.dragOffset = null;
mxDragSource.prototype.dragElement = null;
mxDragSource.prototype.previewElement = null;
mxDragSource.prototype.previewOffset = null;
mxDragSource.prototype.enabled = !0;
mxDragSource.prototype.currentGraph = null;
mxDragSource.prototype.currentDropTarget = null;
mxDragSource.prototype.currentPoint = null;
mxDragSource.prototype.currentGuide = null;
mxDragSource.prototype.currentHighlight = null;
mxDragSource.prototype.autoscroll = !0;
mxDragSource.prototype.guidesEnabled = !0;
mxDragSource.prototype.gridEnabled = !0;
mxDragSource.prototype.highlightDropTargets = !0;
mxDragSource.prototype.dragElementZIndex = 100;
mxDragSource.prototype.dragElementOpacity = 70;
mxDragSource.prototype.checkEventSource = !0;
mxDragSource.prototype.isEnabled = function() {
  return this.enabled;
};
mxDragSource.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxDragSource.prototype.isGuidesEnabled = function() {
  return this.guidesEnabled;
};
mxDragSource.prototype.setGuidesEnabled = function(a) {
  this.guidesEnabled = a;
};
mxDragSource.prototype.isGridEnabled = function() {
  return this.gridEnabled;
};
mxDragSource.prototype.setGridEnabled = function(a) {
  this.gridEnabled = a;
};
mxDragSource.prototype.getGraphForEvent = function(a) {
  return null;
};
mxDragSource.prototype.getDropTarget = function(a, b, c, d) {
  return a.getCellAt(b, c);
};
mxDragSource.prototype.createDragElement = function(a) {
  return this.element.cloneNode(!0);
};
mxDragSource.prototype.createPreviewElement = function(a) {
  return null;
};
mxDragSource.prototype.isActive = function() {
  return null != this.mouseMoveHandler;
};
mxDragSource.prototype.reset = function() {
  null != this.currentGraph && (this.dragExit(this.currentGraph), this.currentGraph = null);
  this.removeDragElement();
  this.removeListeners();
  this.stopDrag();
};
mxDragSource.prototype.mouseDown = function(a) {
  this.enabled && !mxEvent.isConsumed(a) && null == this.mouseMoveHandler && (this.startDrag(a), this.mouseMoveHandler = mxUtils.bind(this, this.mouseMove), this.mouseUpHandler = mxUtils.bind(this, this.mouseUp), mxEvent.addGestureListeners(document, null, this.mouseMoveHandler, this.mouseUpHandler), mxClient.IS_TOUCH && !mxEvent.isMouseEvent(a) && (this.eventSource = mxEvent.getSource(a), mxEvent.addGestureListeners(this.eventSource, null, this.mouseMoveHandler, this.mouseUpHandler)));
};
mxDragSource.prototype.startDrag = function(a) {
  this.dragElement = this.createDragElement(a);
  this.dragElement.style.position = 'absolute';
  this.dragElement.style.zIndex = this.dragElementZIndex;
  mxUtils.setOpacity(this.dragElement, this.dragElementOpacity);
  this.checkEventSource && mxClient.IS_SVG && (this.dragElement.style.pointerEvents = 'none');
};
mxDragSource.prototype.stopDrag = function() {
  this.removeDragElement();
};
mxDragSource.prototype.removeDragElement = function() {
  null != this.dragElement && (null != this.dragElement.parentNode && this.dragElement.parentNode.removeChild(this.dragElement), this.dragElement = null);
};
mxDragSource.prototype.getElementForEvent = function(a) {
  return mxEvent.isTouchEvent(a) || mxEvent.isPenEvent(a) ? document.elementFromPoint(mxEvent.getClientX(a), mxEvent.getClientY(a)) : mxEvent.getSource(a);
};
mxDragSource.prototype.graphContainsEvent = function(a, b) {
  var c = mxEvent.getClientX(b),
    d = mxEvent.getClientY(b),
    e = mxUtils.getOffset(a.container),
    f = mxUtils.getScrollOrigin();
  b = this.getElementForEvent(b);
  if (this.checkEventSource)
    for (; null != b && b != a.container;)
      b = b.parentNode;
  return null != b && c >= e.x - f.x && d >= e.y - f.y && c <= e.x - f.x + a.container.offsetWidth && d <= e.y - f.y + a.container.offsetHeight;
};
mxDragSource.prototype.mouseMove = function(a) {
  var b = this.getGraphForEvent(a);
  null == b || this.graphContainsEvent(b, a) || (b = null);
  b != this.currentGraph && (null != this.currentGraph && this.dragExit(this.currentGraph, a), this.currentGraph = b, null != this.currentGraph && this.dragEnter(this.currentGraph, a));
  null != this.currentGraph && this.dragOver(this.currentGraph, a);
  if (null == this.dragElement || null != this.previewElement && 'visible' == this.previewElement.style.visibility)
    null != this.dragElement && (this.dragElement.style.visibility = 'hidden');
  else {
    b = mxEvent.getClientX(a);
    var c = mxEvent.getClientY(a);
    null == this.dragElement.parentNode && document.body.appendChild(this.dragElement);
    this.dragElement.style.visibility = 'visible';
    null != this.dragOffset && (b += this.dragOffset.x, c += this.dragOffset.y);
    var d = mxUtils.getDocumentScrollOrigin(document);
    this.dragElement.style.left = b + d.x + 'px';
    this.dragElement.style.top = c + d.y + 'px';
  }
  mxEvent.consume(a);
};
mxDragSource.prototype.mouseUp = function(a) {
  if (null != this.currentGraph) {
    if (null != this.currentPoint && (null == this.previewElement || 'hidden' != this.previewElement.style.visibility)) {
      var b = this.currentGraph.view.scale,
        c = this.currentGraph.view.translate;
      this.drop(this.currentGraph, a, this.currentDropTarget, this.currentPoint.x / b - c.x, this.currentPoint.y / b - c.y);
    }
    this.dragExit(this.currentGraph);
    this.currentGraph = null;
  }
  this.stopDrag();
  this.removeListeners();
  mxEvent.consume(a);
};
mxDragSource.prototype.removeListeners = function() {
  null != this.eventSource && (mxEvent.removeGestureListeners(this.eventSource, null, this.mouseMoveHandler, this.mouseUpHandler), this.eventSource = null);
  mxEvent.removeGestureListeners(document, null, this.mouseMoveHandler, this.mouseUpHandler);
  this.mouseUpHandler = this.mouseMoveHandler = null;
};
mxDragSource.prototype.dragEnter = function(a, b) {
  a.isMouseDown = !0;
  a.isMouseTrigger = mxEvent.isMouseEvent(b);
  this.previewElement = this.createPreviewElement(a);
  null != this.previewElement && this.checkEventSource && mxClient.IS_SVG && (this.previewElement.style.pointerEvents = 'none');
  this.isGuidesEnabled() && null != this.previewElement && (this.currentGuide = new mxGuide(a, a.graphHandler.getGuideStates()));
  this.highlightDropTargets && (this.currentHighlight = new mxCellHighlight(a, mxConstants.DROP_TARGET_COLOR));
  a.addListener(mxEvent.FIRE_MOUSE_EVENT, this.eventConsumer);
};
mxDragSource.prototype.dragExit = function(a, b) {
  this.currentPoint = this.currentDropTarget = null;
  a.isMouseDown = !1;
  a.removeListener(this.eventConsumer);
  null != this.previewElement && (null != this.previewElement.parentNode && this.previewElement.parentNode.removeChild(this.previewElement), this.previewElement = null);
  null != this.currentGuide && (this.currentGuide.destroy(), this.currentGuide = null);
  null != this.currentHighlight && (this.currentHighlight.destroy(), this.currentHighlight = null);
};
mxDragSource.prototype.dragOver = function(a, b) {
  var c = mxUtils.getOffset(a.container),
    d = mxUtils.getScrollOrigin(a.container),
    e = mxEvent.getClientX(b) - c.x + d.x - a.panDx;
  c = mxEvent.getClientY(b) - c.y + d.y - a.panDy;
  a.autoScroll && (null == this.autoscroll || this.autoscroll) && a.scrollPointToVisible(e, c, a.autoExtend);
  null != this.currentHighlight && a.isDropEnabled() && (this.currentDropTarget = this.getDropTarget(a, e, c, b), d = a.getView().getState(this.currentDropTarget), this.currentHighlight.highlight(d));
  if (null != this.previewElement) {
    null == this.previewElement.parentNode && (a.container.appendChild(this.previewElement), this.previewElement.style.zIndex = '3', this.previewElement.style.position = 'absolute');
    d = this.isGridEnabled() && a.isGridEnabledEvent(b);
    var f = !0;
    if (null != this.currentGuide && this.currentGuide.isEnabledForEvent(b))
      a = parseInt(this.previewElement.style.width), f = parseInt(this.previewElement.style.height), a = new mxRectangle(0, 0, a, f), c = new mxPoint(e, c), c = this.currentGuide.move(a, c, d, !0), f = !1, e = c.x, c = c.y;
    else if (d) {
      d = a.view.scale;
      b = a.view.translate;
      var g = a.gridSize / 2;
      e = (a.snap(e / d - b.x - g) + b.x) * d;
      c = (a.snap(c / d - b.y - g) + b.y) * d;
    }
    null != this.currentGuide && f && this.currentGuide.hide();
    null != this.previewOffset && (e += this.previewOffset.x, c += this.previewOffset.y);
    this.previewElement.style.left = Math.round(e) + 'px';
    this.previewElement.style.top = Math.round(c) + 'px';
    this.previewElement.style.visibility = 'visible';
  }
  this.currentPoint = new mxPoint(e, c);
};
mxDragSource.prototype.drop = function(a, b, c, d, e) {
  this.dropHandler.apply(this, arguments);
  'hidden' != a.container.style.visibility && a.container.focus();
};