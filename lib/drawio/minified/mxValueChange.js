function mxValueChange(a, b, c) {
  this.model = a;
  this.cell = b;
  this.previous = this.value = c;
}
mxValueChange.prototype.execute = function() {
  null != this.cell && (this.value = this.previous, this.previous = this.model.valueForCellChanged(this.cell, this.previous));
};