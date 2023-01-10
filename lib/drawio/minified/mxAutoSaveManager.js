function mxAutoSaveManager(a) {
  this.changeHandler = mxUtils.bind(this, function(b, c) {
    this.isEnabled() && this.graphModelChanged(c.getProperty('edit').changes);
  });
  this.setGraph(a);
}
mxAutoSaveManager.prototype = new mxEventSource();
mxAutoSaveManager.prototype.constructor = mxAutoSaveManager;
mxAutoSaveManager.prototype.graph = null;
mxAutoSaveManager.prototype.autoSaveDelay = 10;
mxAutoSaveManager.prototype.autoSaveThrottle = 2;
mxAutoSaveManager.prototype.autoSaveThreshold = 5;
mxAutoSaveManager.prototype.ignoredChanges = 0;
mxAutoSaveManager.prototype.lastSnapshot = 0;
mxAutoSaveManager.prototype.enabled = !0;
mxAutoSaveManager.prototype.changeHandler = null;
mxAutoSaveManager.prototype.isEnabled = function() {
  return this.enabled;
};
mxAutoSaveManager.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxAutoSaveManager.prototype.setGraph = function(a) {
  null != this.graph && this.graph.getModel().removeListener(this.changeHandler);
  this.graph = a;
  null != this.graph && this.graph.getModel().addListener(mxEvent.CHANGE, this.changeHandler);
};
mxAutoSaveManager.prototype.save = function() {};
mxAutoSaveManager.prototype.graphModelChanged = function(a) {
  a = (new Date().getTime() - this.lastSnapshot) / 1000;
  a > this.autoSaveDelay || this.ignoredChanges >= this.autoSaveThreshold && a > this.autoSaveThrottle ? (this.save(), this.reset()) : this.ignoredChanges++;
};
mxAutoSaveManager.prototype.reset = function() {
  this.lastSnapshot = new Date().getTime();
  this.ignoredChanges = 0;
};
mxAutoSaveManager.prototype.destroy = function() {
  this.setGraph(null);
};