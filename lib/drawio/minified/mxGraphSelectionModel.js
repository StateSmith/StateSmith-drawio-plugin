function mxGraphSelectionModel(a) {
  this.graph = a;
  this.cells = [];
}
mxGraphSelectionModel.prototype = new mxEventSource();
mxGraphSelectionModel.prototype.constructor = mxGraphSelectionModel;
mxGraphSelectionModel.prototype.doneResource = 'none' != mxClient.language ? 'done' : '';
mxGraphSelectionModel.prototype.updatingSelectionResource = 'none' != mxClient.language ? 'updatingSelection' : '';
mxGraphSelectionModel.prototype.graph = null;
mxGraphSelectionModel.prototype.singleSelection = !1;
mxGraphSelectionModel.prototype.isSingleSelection = function() {
  return this.singleSelection;
};
mxGraphSelectionModel.prototype.setSingleSelection = function(a) {
  this.singleSelection = a;
};
mxGraphSelectionModel.prototype.isSelected = function(a) {
  return null != a ? 0 <= mxUtils.indexOf(this.cells, a) : !1;
};
mxGraphSelectionModel.prototype.isEmpty = function() {
  return 0 == this.cells.length;
};
mxGraphSelectionModel.prototype.clear = function() {
  this.changeSelection(null, this.cells);
};
mxGraphSelectionModel.prototype.setCell = function(a) {
  null != a && this.setCells([a]);
};
mxGraphSelectionModel.prototype.setCells = function(a) {
  if (null != a) {
    this.singleSelection && (a = [this.getFirstSelectableCell(a)]);
    for (var b = [], c = 0; c < a.length; c++)
      this.graph.isCellSelectable(a[c]) && b.push(a[c]);
    this.changeSelection(b, this.cells);
  }
};
mxGraphSelectionModel.prototype.getFirstSelectableCell = function(a) {
  if (null != a)
    for (var b = 0; b < a.length; b++)
      if (this.graph.isCellSelectable(a[b]))
        return a[b];
  return null;
};
mxGraphSelectionModel.prototype.addCell = function(a) {
  null != a && this.addCells([a]);
};
mxGraphSelectionModel.prototype.addCells = function(a) {
  if (null != a) {
    var b = null;
    this.singleSelection && (b = this.cells, a = [this.getFirstSelectableCell(a)]);
    for (var c = [], d = 0; d < a.length; d++)
      !this.isSelected(a[d]) && this.graph.isCellSelectable(a[d]) && c.push(a[d]);
    this.changeSelection(c, b);
  }
};
mxGraphSelectionModel.prototype.removeCell = function(a) {
  null != a && this.removeCells([a]);
};
mxGraphSelectionModel.prototype.removeCells = function(a) {
  if (null != a) {
    for (var b = [], c = 0; c < a.length; c++)
      this.isSelected(a[c]) && b.push(a[c]);
    this.changeSelection(null, b);
  }
};
mxGraphSelectionModel.prototype.changeSelection = function(a, b) {
  if (null != a && 0 < a.length && null != a[0] || null != b && 0 < b.length && null != b[0])
    a = new mxSelectionChange(this, a, b), a.execute(), b = new mxUndoableEdit(this, !1), b.add(a), this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', b));
};
mxGraphSelectionModel.prototype.cellAdded = function(a) {
  null == a || this.isSelected(a) || this.cells.push(a);
};
mxGraphSelectionModel.prototype.cellRemoved = function(a) {
  null != a && (a = mxUtils.indexOf(this.cells, a), 0 <= a && this.cells.splice(a, 1));
};