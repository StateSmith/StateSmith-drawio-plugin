function mxCellOverlay(a, b, c, d, e, f) {
  this.image = a;
  this.tooltip = b;
  this.align = null != c ? c : this.align;
  this.verticalAlign = null != d ? d : this.verticalAlign;
  this.offset = null != e ? e : new mxPoint();
  this.cursor = null != f ? f : 'help';
}
mxCellOverlay.prototype = new mxEventSource();
mxCellOverlay.prototype.constructor = mxCellOverlay;
mxCellOverlay.prototype.image = null;
mxCellOverlay.prototype.tooltip = null;
mxCellOverlay.prototype.align = mxConstants.ALIGN_RIGHT;
mxCellOverlay.prototype.verticalAlign = mxConstants.ALIGN_BOTTOM;
mxCellOverlay.prototype.offset = null;
mxCellOverlay.prototype.cursor = null;
mxCellOverlay.prototype.defaultOverlap = 0.5;
mxCellOverlay.prototype.getBounds = function(a) {
  var b = a.view.graph.getModel().isEdge(a.cell),
    c = a.view.scale,
    d = this.image.width,
    e = this.image.height;
  if (b)
    if (b = a.absolutePoints, 1 == b.length % 2)
      b = b[Math.floor(b.length / 2)];
    else {
      var f = b.length / 2;
      a = b[f - 1];
      b = b[f];
      b = new mxPoint(a.x + (b.x - a.x) / 2, a.y + (b.y - a.y) / 2);
    }
  else
    b = new mxPoint(), b.x = this.align == mxConstants.ALIGN_LEFT ? a.x : this.align == mxConstants.ALIGN_CENTER ? a.x + a.width / 2 : a.x + a.width, b.y = this.verticalAlign == mxConstants.ALIGN_TOP ? a.y : this.verticalAlign == mxConstants.ALIGN_MIDDLE ? a.y + a.height / 2 : a.y + a.height;
  return new mxRectangle(Math.round(b.x - (d * this.defaultOverlap - this.offset.x) * c), Math.round(b.y - (e * this.defaultOverlap - this.offset.y) * c), d * c, e * c);
};
mxCellOverlay.prototype.toString = function() {
  return this.tooltip;
};