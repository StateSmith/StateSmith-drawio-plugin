function mxGraphHierarchyEdge(a) {
  mxGraphAbstractHierarchyCell.apply(this, arguments);
  this.edges = a;
  this.ids = [];
  for (var b = 0; b < a.length; b++)
    this.ids.push(mxObjectIdentity.get(a[b]));
}
mxGraphHierarchyEdge.prototype = new mxGraphAbstractHierarchyCell();
mxGraphHierarchyEdge.prototype.constructor = mxGraphHierarchyEdge;
mxGraphHierarchyEdge.prototype.edges = null;
mxGraphHierarchyEdge.prototype.ids = null;
mxGraphHierarchyEdge.prototype.source = null;
mxGraphHierarchyEdge.prototype.target = null;
mxGraphHierarchyEdge.prototype.isReversed = !1;
mxGraphHierarchyEdge.prototype.invert = function(a) {
  a = this.source;
  this.source = this.target;
  this.target = a;
  this.isReversed = !this.isReversed;
};
mxGraphHierarchyEdge.prototype.getNextLayerConnectedCells = function(a) {
  if (null == this.nextLayerConnectedCells) {
    this.nextLayerConnectedCells = [];
    for (var b = 0; b < this.temp.length; b++)
      this.nextLayerConnectedCells[b] = [], b == this.temp.length - 1 ? this.nextLayerConnectedCells[b].push(this.source) : this.nextLayerConnectedCells[b].push(this);
  }
  return this.nextLayerConnectedCells[a - this.minRank - 1];
};
mxGraphHierarchyEdge.prototype.getPreviousLayerConnectedCells = function(a) {
  if (null == this.previousLayerConnectedCells) {
    this.previousLayerConnectedCells = [];
    for (var b = 0; b < this.temp.length; b++)
      this.previousLayerConnectedCells[b] = [], 0 == b ? this.previousLayerConnectedCells[b].push(this.target) : this.previousLayerConnectedCells[b].push(this);
  }
  return this.previousLayerConnectedCells[a - this.minRank - 1];
};
mxGraphHierarchyEdge.prototype.isEdge = function() {
  return !0;
};
mxGraphHierarchyEdge.prototype.getGeneralPurposeVariable = function(a) {
  return this.temp[a - this.minRank - 1];
};
mxGraphHierarchyEdge.prototype.setGeneralPurposeVariable = function(a, b) {
  this.temp[a - this.minRank - 1] = b;
};
mxGraphHierarchyEdge.prototype.getCoreCell = function() {
  return null != this.edges && 0 < this.edges.length ? this.edges[0] : null;
};