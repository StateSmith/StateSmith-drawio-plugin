function mxGraphAbstractHierarchyCell() {
  this.x = [];
  this.y = [];
  this.temp = [];
}
mxGraphAbstractHierarchyCell.prototype.maxRank = -1;
mxGraphAbstractHierarchyCell.prototype.minRank = -1;
mxGraphAbstractHierarchyCell.prototype.x = null;
mxGraphAbstractHierarchyCell.prototype.y = null;
mxGraphAbstractHierarchyCell.prototype.width = 0;
mxGraphAbstractHierarchyCell.prototype.height = 0;
mxGraphAbstractHierarchyCell.prototype.nextLayerConnectedCells = null;
mxGraphAbstractHierarchyCell.prototype.previousLayerConnectedCells = null;
mxGraphAbstractHierarchyCell.prototype.temp = null;
mxGraphAbstractHierarchyCell.prototype.getNextLayerConnectedCells = function(a) {
  return null;
};
mxGraphAbstractHierarchyCell.prototype.getPreviousLayerConnectedCells = function(a) {
  return null;
};
mxGraphAbstractHierarchyCell.prototype.isEdge = function() {
  return !1;
};
mxGraphAbstractHierarchyCell.prototype.isVertex = function() {
  return !1;
};
mxGraphAbstractHierarchyCell.prototype.getGeneralPurposeVariable = function(a) {
  return null;
};
mxGraphAbstractHierarchyCell.prototype.setGeneralPurposeVariable = function(a, b) {
  return null;
};
mxGraphAbstractHierarchyCell.prototype.setX = function(a, b) {
  this.isVertex() ? this.x[0] = b : this.isEdge() && (this.x[a - this.minRank - 1] = b);
};
mxGraphAbstractHierarchyCell.prototype.getX = function(a) {
  return this.isVertex() ? this.x[0] : this.isEdge() ? this.x[a - this.minRank - 1] : 0;
};
mxGraphAbstractHierarchyCell.prototype.setY = function(a, b) {
  this.isVertex() ? this.y[0] = b : this.isEdge() && (this.y[a - this.minRank - 1] = b);
};