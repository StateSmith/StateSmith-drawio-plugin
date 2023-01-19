function mxStyleChange(a, b, c) {
  this.model = a;
  this.cell = b;
  this.previous = this.style = c;
}
mxStyleChange.prototype.execute = function() {
  null != this.cell && (this.style = this.previous, this.previous = this.model.styleForCellChanged(this.cell, this.previous));
};