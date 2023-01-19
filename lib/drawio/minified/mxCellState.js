function mxCellState(a, b, c) {
  this.view = a;
  this.cell = b;
  this.style = null != c ? c : {};
  this.origin = new mxPoint();
  this.absoluteOffset = new mxPoint();
}
mxCellState.prototype = new mxRectangle();
mxCellState.prototype.constructor = mxCellState;
mxCellState.prototype.view = null;
mxCellState.prototype.cell = null;
mxCellState.prototype.style = null;
mxCellState.prototype.invalidStyle = !1;
mxCellState.prototype.invalid = !0;
mxCellState.prototype.origin = null;
mxCellState.prototype.absolutePoints = null;
mxCellState.prototype.absoluteOffset = null;
mxCellState.prototype.visibleSourceState = null;
mxCellState.prototype.visibleTargetState = null;
mxCellState.prototype.terminalDistance = 0;
mxCellState.prototype.length = 0;
mxCellState.prototype.segments = null;
mxCellState.prototype.shape = null;
mxCellState.prototype.text = null;
mxCellState.prototype.unscaledWidth = null;
mxCellState.prototype.unscaledHeight = null;
mxCellState.prototype.getPerimeterBounds = function(a, b) {
  a = a || 0;
  b = null != b ? b : new mxRectangle(this.x, this.y, this.width, this.height);
  if (null != this.shape && null != this.shape.stencil && 'fixed' == this.shape.stencil.aspect) {
    var c = this.shape.stencil.computeAspect(this.style, b.x, b.y, b.width, b.height);
    b.x = c.x;
    b.y = c.y;
    b.width = this.shape.stencil.w0 * c.width;
    b.height = this.shape.stencil.h0 * c.height;
  }
  0 != a && b.grow(a);
  return b;
};
mxCellState.prototype.setAbsoluteTerminalPoint = function(a, b) {
  b ? (null == this.absolutePoints && (this.absolutePoints = []), 0 == this.absolutePoints.length ? this.absolutePoints.push(a) : this.absolutePoints[0] = a) : null == this.absolutePoints ? (this.absolutePoints = [], this.absolutePoints.push(null), this.absolutePoints.push(a)) : 1 == this.absolutePoints.length ? this.absolutePoints.push(a) : this.absolutePoints[this.absolutePoints.length - 1] = a;
};
mxCellState.prototype.setCursor = function(a) {
  null != this.shape && this.shape.setCursor(a);
  null != this.text && this.text.setCursor(a);
};
mxCellState.prototype.isFloatingTerminalPoint = function(a) {
  var b = this.getVisibleTerminalState(a);
  if (null == b)
    return !1;
  a = this.view.graph.getConnectionConstraint(this, b, a);
  return null == a || null == a.point;
};
mxCellState.prototype.getVisibleTerminal = function(a) {
  a = this.getVisibleTerminalState(a);
  return null != a ? a.cell : null;
};
mxCellState.prototype.getVisibleTerminalState = function(a) {
  return a ? this.visibleSourceState : this.visibleTargetState;
};
mxCellState.prototype.setVisibleTerminalState = function(a, b) {
  b ? this.visibleSourceState = a : this.visibleTargetState = a;
};
mxCellState.prototype.getCellBounds = function() {
  return this.cellBounds;
};
mxCellState.prototype.getPaintBounds = function() {
  return this.paintBounds;
};
mxCellState.prototype.updateCachedBounds = function() {
  var a = this.view.translate,
    b = this.view.scale;
  this.cellBounds = new mxRectangle(this.x / b - a.x, this.y / b - a.y, this.width / b, this.height / b);
  this.paintBounds = mxRectangle.fromRectangle(this.cellBounds);
  null != this.shape && this.shape.isPaintBoundsInverted() && this.paintBounds.rotate90();
};
mxCellState.prototype.setState = function(a) {
  this.view = a.view;
  this.cell = a.cell;
  this.style = a.style;
  this.absolutePoints = a.absolutePoints;
  this.origin = a.origin;
  this.absoluteOffset = a.absoluteOffset;
  this.boundingBox = a.boundingBox;
  this.terminalDistance = a.terminalDistance;
  this.segments = a.segments;
  this.length = a.length;
  this.x = a.x;
  this.y = a.y;
  this.width = a.width;
  this.height = a.height;
  this.unscaledWidth = a.unscaledWidth;
  this.unscaledHeight = a.unscaledHeight;
};
mxCellState.prototype.clone = function() {
  var a = new mxCellState(this.view, this.cell, this.style);
  if (null != this.absolutePoints) {
    a.absolutePoints = [];
    for (var b = 0; b < this.absolutePoints.length; b++)
      a.absolutePoints[b] = this.absolutePoints[b].clone();
  }
  null != this.origin && (a.origin = this.origin.clone());
  null != this.absoluteOffset && (a.absoluteOffset = this.absoluteOffset.clone());
  null != this.boundingBox && (a.boundingBox = this.boundingBox.clone());
  a.terminalDistance = this.terminalDistance;
  a.segments = this.segments;
  a.length = this.length;
  a.x = this.x;
  a.y = this.y;
  a.width = this.width;
  a.height = this.height;
  a.unscaledWidth = this.unscaledWidth;
  a.unscaledHeight = this.unscaledHeight;
  return a;
};
mxCellState.prototype.destroy = function() {
  this.view.graph.cellRenderer.destroy(this);
};