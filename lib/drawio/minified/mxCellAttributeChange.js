function mxCellAttributeChange(a, b, c) {
  this.cell = a;
  this.attribute = b;
  this.previous = this.value = c;
}
mxCellAttributeChange.prototype.execute = function() {
  if (null != this.cell) {
    var a = this.cell.getAttribute(this.attribute);
    null == this.previous ? this.cell.value.removeAttribute(this.attribute) : this.cell.setAttribute(this.attribute, this.previous);
    this.previous = a;
  }
};