function mxTerminalChange(a, b, c, d) {
  this.model = a;
  this.cell = b;
  this.previous = this.terminal = c;
  this.source = d;
}
mxTerminalChange.prototype.execute = function() {
  null != this.cell && (this.terminal = this.previous, this.previous = this.model.terminalForCellChanged(this.cell, this.previous, this.source));
};