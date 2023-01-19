function mxChildChange(a, b, c, d) {
  this.model = a;
  this.previous = this.parent = b;
  this.child = c;
  this.previousIndex = this.index = d;
}
mxChildChange.prototype.execute = function() {
  if (null != this.child) {
    var a = this.model.getParent(this.child),
      b = null != a ? a.getIndex(this.child) : 0;
    null == this.previous && this.connect(this.child, !1);
    a = this.model.parentForCellChanged(this.child, this.previous, this.previousIndex);
    null != this.previous && this.connect(this.child, !0);
    this.parent = this.previous;
    this.previous = a;
    this.index = this.previousIndex;
    this.previousIndex = b;
  }
};
mxChildChange.prototype.connect = function(a, b) {
  b = null != b ? b : !0;
  var c = a.getTerminal(!0),
    d = a.getTerminal(!1);
  null != c && (b ? this.model.terminalForCellChanged(a, c, !0) : this.model.terminalForCellChanged(a, null, !0));
  null != d && (b ? this.model.terminalForCellChanged(a, d, !1) : this.model.terminalForCellChanged(a, null, !1));
  a.setTerminal(c, !0);
  a.setTerminal(d, !1);
  c = this.model.getChildCount(a);
  for (d = 0; d < c; d++)
    this.connect(this.model.getChildAt(a, d), b);
};