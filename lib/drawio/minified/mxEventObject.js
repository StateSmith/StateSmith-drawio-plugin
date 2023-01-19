function mxEventObject(a) {
  this.name = a;
  this.properties = [];
  for (var b = 1; b < arguments.length; b += 2)
    null != arguments[b + 1] && (this.properties[arguments[b]] = arguments[b + 1]);
}
mxEventObject.prototype.name = null;
mxEventObject.prototype.properties = null;
mxEventObject.prototype.consumed = !1;
mxEventObject.prototype.getName = function() {
  return this.name;
};
mxEventObject.prototype.getProperties = function() {
  return this.properties;
};
mxEventObject.prototype.getProperty = function(a) {
  return this.properties[a];
};
mxEventObject.prototype.isConsumed = function() {
  return this.consumed;
};
mxEventObject.prototype.consume = function() {
  this.consumed = !0;
};