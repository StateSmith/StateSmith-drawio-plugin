function mxConnectionConstraint(a, b, c, d, e) {
  this.point = a;
  this.perimeter = null != b ? b : !0;
  this.name = c;
  this.dx = d ? d : 0;
  this.dy = e ? e : 0;
}
mxConnectionConstraint.prototype.point = null;
mxConnectionConstraint.prototype.perimeter = null;
mxConnectionConstraint.prototype.name = null;
mxConnectionConstraint.prototype.dx = null;
mxConnectionConstraint.prototype.dy = null;