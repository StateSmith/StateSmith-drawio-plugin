OpenFile = function(a) {
  this.consumer = this.producer = null;
  this.done = a;
  this.args = null;
};
OpenFile.prototype.setConsumer = function(a) {
  this.consumer = a;
  this.execute();
};
OpenFile.prototype.setData = function() {
  this.args = arguments;
  this.execute();
};
OpenFile.prototype.error = function(a) {
  this.cancel(!0);
  mxUtils.alert(a);
};
OpenFile.prototype.execute = function() {
  null != this.consumer && null != this.args && (this.cancel(!1), this.consumer.apply(this, this.args));
};
OpenFile.prototype.cancel = function(a) {
  null != this.done && this.done(null != a ? a : !0);
};