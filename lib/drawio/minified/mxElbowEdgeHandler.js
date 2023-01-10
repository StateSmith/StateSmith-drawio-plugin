function mxElbowEdgeHandler(a) {
  mxEdgeHandler.call(this, a);
}
mxUtils.extend(mxElbowEdgeHandler, mxEdgeHandler);
mxElbowEdgeHandler.prototype.flipEnabled = !0;
mxElbowEdgeHandler.prototype.doubleClickOrientationResource = 'none' != mxClient.language ? 'doubleClickOrientation' : '';
mxElbowEdgeHandler.prototype.createBends = function() {
  var a = [],
    b = this.createHandleShape(0);
  this.initBend(b);
  b.setCursor(mxConstants.CURSOR_TERMINAL_HANDLE);
  a.push(b);
  a.push(this.createVirtualBend(mxUtils.bind(this, function(c) {
    !mxEvent.isConsumed(c) && this.flipEnabled && (this.graph.flipEdge(this.state.cell, c), mxEvent.consume(c));
  })));
  this.points.push(new mxPoint(0, 0));
  b = this.createHandleShape(2, null, !0);
  this.initBend(b);
  b.setCursor(mxConstants.CURSOR_TERMINAL_HANDLE);
  a.push(b);
  return a;
};
mxElbowEdgeHandler.prototype.createVirtualBend = function(a) {
  var b = this.createHandleShape();
  this.initBend(b, a);
  b.setCursor(this.getCursorForBend());
  this.graph.isCellBendable(this.state.cell) || (b.node.style.display = 'none');
  return b;
};
mxElbowEdgeHandler.prototype.getCursorForBend = function() {
  return this.state.style[mxConstants.STYLE_EDGE] == mxEdgeStyle.TopToBottom || this.state.style[mxConstants.STYLE_EDGE] == mxConstants.EDGESTYLE_TOPTOBOTTOM || (this.state.style[mxConstants.STYLE_EDGE] == mxEdgeStyle.ElbowConnector || this.state.style[mxConstants.STYLE_EDGE] == mxConstants.EDGESTYLE_ELBOW) && this.state.style[mxConstants.STYLE_ELBOW] == mxConstants.ELBOW_VERTICAL ? 'row-resize' : 'col-resize';
};
mxElbowEdgeHandler.prototype.getTooltipForNode = function(a) {
  var b = null;
  null == this.bends || null == this.bends[1] || a != this.bends[1].node && a.parentNode != this.bends[1].node || (b = this.doubleClickOrientationResource, b = mxResources.get(b) || b);
  return b;
};
mxElbowEdgeHandler.prototype.convertPoint = function(a, b) {
  var c = this.graph.getView().getScale(),
    d = this.graph.getView().getTranslate(),
    e = this.state.origin;
  b && (a.x = this.graph.snap(a.x), a.y = this.graph.snap(a.y));
  a.x = Math.round(a.x / c - d.x - e.x);
  a.y = Math.round(a.y / c - d.y - e.y);
  return a;
};
mxElbowEdgeHandler.prototype.redrawInnerBends = function(a, b) {
  var c = this.graph.getModel().getGeometry(this.state.cell),
    d = this.state.absolutePoints,
    e = null;
  1 < d.length ? (a = d[1], b = d[d.length - 2]) : null != c.points && 0 < c.points.length && (e = d[0]);
  e = null == e ? new mxPoint(a.x + (b.x - a.x) / 2, a.y + (b.y - a.y) / 2) : new mxPoint(this.graph.getView().scale * (e.x + this.graph.getView().translate.x + this.state.origin.x), this.graph.getView().scale * (e.y + this.graph.getView().translate.y + this.state.origin.y));
  b = this.bends[1].bounds;
  a = b.width;
  b = b.height;
  a = new mxRectangle(Math.round(e.x - a / 2), Math.round(e.y - b / 2), a, b);
  this.manageLabelHandle ? this.checkLabelHandle(a) : null == this.handleImage && this.labelShape.visible && mxUtils.intersects(a, this.labelShape.bounds) && (a = mxConstants.HANDLE_SIZE + 3, b = mxConstants.HANDLE_SIZE + 3, a = new mxRectangle(Math.floor(e.x - a / 2), Math.floor(e.y - b / 2), a, b));
  this.bends[1].bounds = a;
  this.bends[1].redraw();
  this.manageLabelHandle && this.checkLabelHandle(this.bends[1].bounds);
};