function mxSelectionChange(a, b, c) {
  this.selectionModel = a;
  this.added = null != b ? b.slice() : null;
  this.removed = null != c ? c.slice() : null;
}
mxSelectionChange.prototype.execute = function() {
  var a = mxLog.enter('mxSelectionChange.execute');
  window.status = mxResources.get(this.selectionModel.updatingSelectionResource) || this.selectionModel.updatingSelectionResource;
  if (null != this.removed)
    for (var b = 0; b < this.removed.length; b++)
      this.selectionModel.cellRemoved(this.removed[b]);
  if (null != this.added)
    for (b = 0; b < this.added.length; b++)
      this.selectionModel.cellAdded(this.added[b]);
  b = this.added;
  this.added = this.removed;
  this.removed = b;
  window.status = mxResources.get(this.selectionModel.doneResource) || this.selectionModel.doneResource;
  mxLog.leave('mxSelectionChange.execute', a);
  this.selectionModel.fireEvent(new mxEventObject(mxEvent.CHANGE, 'added', this.added, 'removed', this.removed));
};