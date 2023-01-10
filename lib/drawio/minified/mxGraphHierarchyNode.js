function mxGraphHierarchyNode(a) {
  mxGraphAbstractHierarchyCell.apply(this, arguments);
  this.cell = a;
  this.id = mxObjectIdentity.get(a);
  this.connectsAsTarget = [];
  this.connectsAsSource = [];
}
mxGraphHierarchyNode.prototype = new mxGraphAbstractHierarchyCell();
mxGraphHierarchyNode.prototype.constructor = mxGraphHierarchyNode;
mxGraphHierarchyNode.prototype.cell = null;
mxGraphHierarchyNode.prototype.id = null;
mxGraphHierarchyNode.prototype.connectsAsTarget = null;
mxGraphHierarchyNode.prototype.connectsAsSource = null;
mxGraphHierarchyNode.prototype.hashCode = !1;
mxGraphHierarchyNode.prototype.getRankValue = function(a) {
  return this.maxRank;
};
mxGraphHierarchyNode.prototype.getNextLayerConnectedCells = function(a) {
  if (null == this.nextLayerConnectedCells) {
    this.nextLayerConnectedCells = [];
    this.nextLayerConnectedCells[0] = [];
    for (var b = 0; b < this.connectsAsTarget.length; b++) {
      var c = this.connectsAsTarget[b]; -
      1 == c.maxRank || c.maxRank == a + 1 ? this.nextLayerConnectedCells[0].push(c.source) : this.nextLayerConnectedCells[0].push(c);
    }
  }
  return this.nextLayerConnectedCells[0];
};
mxGraphHierarchyNode.prototype.getPreviousLayerConnectedCells = function(a) {
  if (null == this.previousLayerConnectedCells) {
    this.previousLayerConnectedCells = [];
    this.previousLayerConnectedCells[0] = [];
    for (var b = 0; b < this.connectsAsSource.length; b++) {
      var c = this.connectsAsSource[b]; -
      1 == c.minRank || c.minRank == a - 1 ? this.previousLayerConnectedCells[0].push(c.target) : this.previousLayerConnectedCells[0].push(c);
    }
  }
  return this.previousLayerConnectedCells[0];
};
mxGraphHierarchyNode.prototype.isVertex = function() {
  return !0;
};
mxGraphHierarchyNode.prototype.getGeneralPurposeVariable = function(a) {
  return this.temp[0];
};
mxGraphHierarchyNode.prototype.setGeneralPurposeVariable = function(a, b) {
  this.temp[0] = b;
};
mxGraphHierarchyNode.prototype.isAncestor = function(a) {
  if (null != a && null != this.hashCode && null != a.hashCode && this.hashCode.length < a.hashCode.length) {
    if (this.hashCode == a.hashCode)
      return !0;
    if (null == this.hashCode || null == this.hashCode)
      return !1;
    for (var b = 0; b < this.hashCode.length; b++)
      if (this.hashCode[b] != a.hashCode[b])
        return !1;
    return !0;
  }
  return !1;
};
mxGraphHierarchyNode.prototype.getCoreCell = function() {
  return this.cell;
};