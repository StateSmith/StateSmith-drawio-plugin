function mxTemporaryCellStates(a, b, c, d, e, f) {
  b = null != b ? b : 1;
  this.view = a;
  this.oldValidateCellState = a.validateCellState;
  this.oldBounds = a.getGraphBounds();
  this.oldStates = a.getStates();
  this.oldScale = a.getScale();
  this.oldDoRedrawShape = a.graph.cellRenderer.doRedrawShape;
  var g = this;
  null != e && (a.graph.cellRenderer.doRedrawShape = function(m) {
    var n = m.shape.paint;
    m.shape.paint = function(p) {
      var r = e(m);
      null != r && p.setLink(r, null != f ? f(m) : null);
      n.apply(this, arguments);
      null != r && p.setLink(null);
    };
    g.oldDoRedrawShape.apply(a.graph.cellRenderer, arguments);
    m.shape.paint = n;
  });
  a.validateCellState = function(m, n) {
    return null == m || null == d || d(m) ? g.oldValidateCellState.apply(a, arguments) : null;
  };
  a.setStates(new mxDictionary());
  a.setScale(b);
  if (null != c) {
    a.resetValidationState();
    b = null;
    for (var k = 0; k < c.length; k++) {
      var l = a.getBoundingBox(a.validateCellState(a.validateCell(c[k])));
      null == b ? b = l : b.add(l);
    }
    a.setGraphBounds(b || new mxRectangle());
  }
}
mxTemporaryCellStates.prototype.view = null;
mxTemporaryCellStates.prototype.oldStates = null;
mxTemporaryCellStates.prototype.oldBounds = null;
mxTemporaryCellStates.prototype.oldScale = null;
mxTemporaryCellStates.prototype.destroy = function() {
  this.view.setScale(this.oldScale);
  this.view.setStates(this.oldStates);
  this.view.setGraphBounds(this.oldBounds);
  this.view.validateCellState = this.oldValidateCellState;
  this.view.graph.cellRenderer.doRedrawShape = this.oldDoRedrawShape;
};