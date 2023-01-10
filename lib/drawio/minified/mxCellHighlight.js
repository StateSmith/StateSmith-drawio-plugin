function mxCellHighlight(a, b, c, d) {
  null != a && (this.graph = a, this.highlightColor = null != b ? b : mxConstants.DEFAULT_VALID_COLOR, this.strokeWidth = null != c ? c : mxConstants.HIGHLIGHT_STROKEWIDTH, this.dashed = null != d ? d : !1, this.opacity = mxConstants.HIGHLIGHT_OPACITY, this.repaintHandler = mxUtils.bind(this, function() {
    if (null != this.state) {
      var e = this.graph.view.getState(this.state.cell);
      null == e ? this.hide() : (this.state = e, this.repaint());
    }
  }), this.graph.getView().addListener(mxEvent.SCALE, this.repaintHandler), this.graph.getView().addListener(mxEvent.TRANSLATE, this.repaintHandler), this.graph.getView().addListener(mxEvent.SCALE_AND_TRANSLATE, this.repaintHandler), this.graph.getModel().addListener(mxEvent.CHANGE, this.repaintHandler), this.resetHandler = mxUtils.bind(this, function() {
    this.hide();
  }), this.graph.getView().addListener(mxEvent.DOWN, this.resetHandler), this.graph.getView().addListener(mxEvent.UP, this.resetHandler));
}
mxCellHighlight.prototype.keepOnTop = !1;
mxCellHighlight.prototype.graph = null;
mxCellHighlight.prototype.state = null;
mxCellHighlight.prototype.spacing = 2;
mxCellHighlight.prototype.resetHandler = null;
mxCellHighlight.prototype.setHighlightColor = function(a) {
  this.highlightColor = a;
  null != this.shape && (this.shape.stroke = a);
};
mxCellHighlight.prototype.drawHighlight = function() {
  this.shape = this.createShape();
  this.repaint();
  this.keepOnTop || this.shape.node.parentNode.firstChild == this.shape.node || this.shape.node.parentNode.insertBefore(this.shape.node, this.shape.node.parentNode.firstChild);
};
mxCellHighlight.prototype.createShape = function() {
  var a = this.graph.cellRenderer.createShape(this.state);
  a.svgStrokeTolerance = this.graph.tolerance;
  a.points = this.state.absolutePoints;
  a.apply(this.state);
  a.stroke = this.highlightColor;
  a.opacity = this.opacity;
  a.isDashed = this.dashed;
  a.isShadow = !1;
  a.dialect = mxConstants.DIALECT_SVG;
  a.init(this.graph.getView().getOverlayPane());
  mxEvent.redirectMouseEvents(a.node, this.graph, this.state);
  this.graph.dialect != mxConstants.DIALECT_SVG ? a.pointerEvents = !1 : a.svgPointerEvents = 'stroke';
  return a;
};
mxCellHighlight.prototype.getStrokeWidth = function(a) {
  return this.strokeWidth;
};
mxCellHighlight.prototype.repaint = function() {
  null != this.state && null != this.shape && (this.shape.scale = this.state.view.scale, this.graph.model.isEdge(this.state.cell) ? (this.shape.strokewidth = this.getStrokeWidth(), this.shape.points = this.state.absolutePoints, this.shape.outline = !1) : (this.shape.bounds = new mxRectangle(this.state.x - this.spacing, this.state.y - this.spacing, this.state.width + 2 * this.spacing, this.state.height + 2 * this.spacing), this.shape.rotation = Number(this.state.style[mxConstants.STYLE_ROTATION] || '0'), this.shape.strokewidth = this.getStrokeWidth() / this.state.view.scale, this.shape.outline = !0), null != this.state.shape && this.shape.setCursor(this.state.shape.getCursor()), this.shape.redraw());
};
mxCellHighlight.prototype.hide = function() {
  this.highlight(null);
};
mxCellHighlight.prototype.highlight = function(a) {
  this.state != a && (null != this.shape && (this.shape.destroy(), this.shape = null), this.state = a, null != this.state && this.drawHighlight());
};
mxCellHighlight.prototype.isHighlightAt = function(a, b) {
  var c = !1;
  if (null != this.shape && null != document.elementFromPoint)
    for (a = document.elementFromPoint(a, b); null != a;) {
      if (a == this.shape.node) {
        c = !0;
        break;
      }
      a = a.parentNode;
    }
  return c;
};
mxCellHighlight.prototype.destroy = function() {
  this.graph.getView().removeListener(this.resetHandler);
  this.graph.getView().removeListener(this.repaintHandler);
  this.graph.getModel().removeListener(this.repaintHandler);
  null != this.shape && (this.shape.destroy(), this.shape = null);
};