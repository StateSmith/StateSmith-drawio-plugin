function mxHandle(a, b, c, d) {
  this.graph = a.view.graph;
  this.state = a;
  this.cursor = null != b ? b : this.cursor;
  this.image = null != c ? c : this.image;
  this.shape = null != d ? d : null;
  this.init();
}
mxHandle.prototype.cursor = 'default';
mxHandle.prototype.image = null;
mxHandle.prototype.ignoreGrid = !1;
mxHandle.prototype.getPosition = function(a) {};
mxHandle.prototype.setPosition = function(a, b, c) {};
mxHandle.prototype.execute = function(a) {};
mxHandle.prototype.copyStyle = function(a) {
  this.graph.setCellStyles(a, this.state.style[a], [this.state.cell]);
};
mxHandle.prototype.processEvent = function(a) {
  var b = this.graph.view.scale,
    c = this.graph.view.translate;
  c = new mxPoint(a.getGraphX() / b - c.x, a.getGraphY() / b - c.y);
  null != this.shape && null != this.shape.bounds && (c.x -= this.shape.bounds.width / b / 4, c.y -= this.shape.bounds.height / b / 4);
  b = -mxUtils.toRadians(this.getRotation());
  var d = -mxUtils.toRadians(this.getTotalRotation()) - b;
  c = this.flipPoint(this.rotatePoint(this.snapPoint(this.rotatePoint(c, b), this.ignoreGrid || !this.graph.isGridEnabledEvent(a.getEvent())), d));
  this.setPosition(this.state.getPaintBounds(), c, a);
  this.redraw();
};
mxHandle.prototype.positionChanged = function() {
  null != this.state.text && this.state.text.apply(this.state);
  null != this.state.shape && this.state.shape.apply(this.state);
  this.graph.cellRenderer.redraw(this.state, !0);
};
mxHandle.prototype.getRotation = function() {
  return null != this.state.shape ? this.state.shape.getRotation() : 0;
};
mxHandle.prototype.getTotalRotation = function() {
  return null != this.state.shape ? this.state.shape.getShapeRotation() : 0;
};
mxHandle.prototype.init = function() {
  var a = this.isHtmlRequired();
  null != this.image ? (this.shape = new mxImageShape(new mxRectangle(0, 0, this.image.width, this.image.height), this.image.src), this.shape.preserveImageAspect = !1) : null == this.shape && (this.shape = this.createShape(a));
  this.initShape(a);
};
mxHandle.prototype.createShape = function(a) {
  a = new mxRectangle(0, 0, mxConstants.HANDLE_SIZE, mxConstants.HANDLE_SIZE);
  return new mxRectangleShape(a, mxConstants.HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR);
};
mxHandle.prototype.initShape = function(a) {
  a && this.shape.isHtmlAllowed() ? (this.shape.dialect = mxConstants.DIALECT_STRICTHTML, this.shape.init(this.graph.container)) : (this.shape.dialect = this.graph.dialect != mxConstants.DIALECT_SVG ? mxConstants.DIALECT_MIXEDHTML : mxConstants.DIALECT_SVG, null != this.cursor && this.shape.init(this.graph.getView().getOverlayPane()));
  mxEvent.redirectMouseEvents(this.shape.node, this.graph, this.state);
  this.shape.node.style.cursor = this.cursor;
};
mxHandle.prototype.redraw = function() {
  if (null != this.shape && null != this.state.shape) {
    var a = this.getPosition(this.state.getPaintBounds());
    if (null != a) {
      var b = mxUtils.toRadians(this.getTotalRotation());
      a = this.rotatePoint(this.flipPoint(a), b);
      b = this.graph.view.scale;
      var c = this.graph.view.translate;
      this.shape.bounds.x = Math.floor((a.x + c.x) * b - this.shape.bounds.width / 2);
      this.shape.bounds.y = Math.floor((a.y + c.y) * b - this.shape.bounds.height / 2);
      this.shape.redraw();
    }
  }
};
mxHandle.prototype.isHtmlRequired = function() {
  return null != this.state.text && this.state.text.node.parentNode == this.graph.container;
};
mxHandle.prototype.rotatePoint = function(a, b) {
  var c = this.state.getCellBounds();
  c = new mxPoint(c.getCenterX(), c.getCenterY());
  return mxUtils.getRotatedPoint(a, Math.cos(b), Math.sin(b), c);
};
mxHandle.prototype.flipPoint = function(a) {
  if (null != this.state.shape) {
    var b = this.state.getCellBounds();
    this.state.shape.flipH && (a.x = 2 * b.x + b.width - a.x);
    this.state.shape.flipV && (a.y = 2 * b.y + b.height - a.y);
  }
  return a;
};
mxHandle.prototype.snapPoint = function(a, b) {
  b || (a.x = this.graph.snap(a.x), a.y = this.graph.snap(a.y));
  return a;
};
mxHandle.prototype.setVisible = function(a) {
  null != this.shape && null != this.shape.node && (this.shape.node.style.display = a ? '' : 'none');
};
mxHandle.prototype.reset = function() {
  this.setVisible(!0);
  this.state.style = this.graph.getCellStyle(this.state.cell);
  this.positionChanged();
};
mxHandle.prototype.destroy = function() {
  null != this.shape && (this.shape.destroy(), this.shape = null);
};