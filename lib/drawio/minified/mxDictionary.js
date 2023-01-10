function mxDictionary() {
  this.clear();
}
mxDictionary.prototype.map = null;
mxDictionary.prototype.clear = function() {
  this.map = {};
};
mxDictionary.prototype.get = function(a) {
  a = mxObjectIdentity.get(a);
  return this.map[a];
};
mxDictionary.prototype.put = function(a, b) {
  a = mxObjectIdentity.get(a);
  var c = this.map[a];
  this.map[a] = b;
  return c;
};
mxDictionary.prototype.remove = function(a) {
  a = mxObjectIdentity.get(a);
  var b = this.map[a];
  delete this.map[a];
  return b;
};
mxDictionary.prototype.getKeys = function() {
  var a = [],
    b;
  for (b in this.map)
    a.push(b);
  return a;
};
mxDictionary.prototype.getValues = function() {
  var a = [],
    b;
  for (b in this.map)
    a.push(this.map[b]);
  return a;
};
mxDictionary.prototype.visit = function(a) {
  for (var b in this.map)
    a(b, this.map[b]);
};