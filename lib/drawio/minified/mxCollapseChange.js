function mxCollapseChange(a, b, c) {
  this.model = a;
  this.cell = b;
  this.previous = this.collapsed = c;
}
mxCollapseChange.prototype.execute = function() {
  null != this.cell && (this.collapsed = this.previous, this.previous = this.model.collapsedStateForCellChanged(this.cell, this.previous));
};