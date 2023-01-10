function mxRootChange(a, b) {
  this.model = a;
  this.previous = this.root = b;
}
mxRootChange.prototype.execute = function() {
  this.root = this.previous;
  this.previous = this.model.rootChanged(this.previous);
};