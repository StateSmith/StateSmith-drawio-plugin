function mxVisibleChange(a, b, c) {
  this.model = a;
  this.cell = b;
  this.previous = this.visible = c;
}
mxVisibleChange.prototype.execute = function() {
  null != this.cell && (this.visible = this.previous, this.previous = this.model.visibleStateForCellChanged(this.cell, this.previous));
};