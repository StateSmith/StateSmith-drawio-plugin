function mxGeometryChange(a, b, c) {
  this.model = a;
  this.cell = b;
  this.previous = this.geometry = c;
}
mxGeometryChange.prototype.execute = function() {
  null != this.cell && (this.geometry = this.previous, this.previous = this.model.geometryForCellChanged(this.cell, this.previous));
};