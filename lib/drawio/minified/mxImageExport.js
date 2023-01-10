function mxImageExport() {}
mxImageExport.prototype.includeOverlays = !1;
mxImageExport.prototype.drawState = function(a, b) {
  null != a && (this.visitStatesRecursive(a, b, mxUtils.bind(this, function() {
    this.drawCellState.apply(this, arguments);
  })), this.includeOverlays && this.visitStatesRecursive(a, b, mxUtils.bind(this, function() {
    this.drawOverlays.apply(this, arguments);
  })));
};
mxImageExport.prototype.visitStatesRecursive = function(a, b, c) {
  if (null != a) {
    c(a, b);
    for (var d = a.view.graph, e = d.model.getChildCount(a.cell), f = 0; f < e; f++) {
      var g = d.view.getState(d.model.getChildAt(a.cell, f));
      this.visitStatesRecursive(g, b, c);
    }
  }
};
mxImageExport.prototype.getLinkForCellState = function(a, b) {
  return null;
};
mxImageExport.prototype.getLinkTargetForCellState = function(a, b) {
  return null;
};
mxImageExport.prototype.drawCellState = function(a, b) {
  var c = this.getLinkForCellState(a, b);
  null != c && b.setLink(c, this.getLinkTargetForCellState(a, b));
  this.drawShape(a, b);
  this.drawText(a, b);
  null != c && b.setLink(null);
};
mxImageExport.prototype.drawShape = function(a, b) {
  a.shape instanceof mxShape && this.doDrawShape(a.shape, b);
};
mxImageExport.prototype.drawText = function(a, b) {
  this.doDrawShape(a.text, b);
};
mxImageExport.prototype.doDrawShape = function(a, b) {
  null != a && a.checkBounds() && (b.save(), a.beforePaint(b), a.paint(b), a.afterPaint(b), b.restore());
};
mxImageExport.prototype.drawOverlays = function(a, b) {
  null != a.overlays && a.overlays.visit(function(c, d) {
    d instanceof mxShape && d.paint(b);
  });
};