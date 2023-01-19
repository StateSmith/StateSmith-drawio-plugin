function mxMultiplicity(a, b, c, d, e, f, g, k, l, m) {
  this.source = a;
  this.type = b;
  this.attr = c;
  this.value = d;
  this.min = null != e ? e : 0;
  this.max = null != f ? f : 'n';
  this.validNeighbors = g;
  this.countError = mxResources.get(k) || k;
  this.typeError = mxResources.get(l) || l;
  this.validNeighborsAllowed = null != m ? m : !0;
}
mxMultiplicity.prototype.type = null;
mxMultiplicity.prototype.attr = null;
mxMultiplicity.prototype.value = null;
mxMultiplicity.prototype.source = null;
mxMultiplicity.prototype.min = null;
mxMultiplicity.prototype.max = null;
mxMultiplicity.prototype.validNeighbors = null;
mxMultiplicity.prototype.validNeighborsAllowed = !0;
mxMultiplicity.prototype.countError = null;
mxMultiplicity.prototype.typeError = null;
mxMultiplicity.prototype.check = function(a, b, c, d, e, f) {
  var g = '';
  if (this.source && this.checkTerminal(a, c, b) || !this.source && this.checkTerminal(a, d, b))
    null != this.countError && (this.source && (0 == this.max || e >= this.max) || !this.source && (0 == this.max || f >= this.max)) && (g += this.countError + '\n'), null != this.validNeighbors && null != this.typeError && 0 < this.validNeighbors.length && (this.checkNeighbors(a, b, c, d) || (g += this.typeError + '\n'));
  return 0 < g.length ? g : null;
};
mxMultiplicity.prototype.checkNeighbors = function(a, b, c, d) {
  b = a.model.getValue(c);
  d = a.model.getValue(d);
  c = !this.validNeighborsAllowed;
  for (var e = this.validNeighbors, f = 0; f < e.length; f++)
    if (this.source && this.checkType(a, d, e[f])) {
      c = this.validNeighborsAllowed;
      break;
    } else if (!this.source && this.checkType(a, b, e[f])) {
    c = this.validNeighborsAllowed;
    break;
  }
  return c;
};
mxMultiplicity.prototype.checkTerminal = function(a, b, c) {
  b = a.model.getValue(b);
  return this.checkType(a, b, this.type, this.attr, this.value);
};
mxMultiplicity.prototype.checkType = function(a, b, c, d, e) {
  return null != b ? isNaN(b.nodeType) ? b == c : mxUtils.isNode(b, c, d, e) : !1;
};