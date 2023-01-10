function mxEventSource(a) {
  this.setEventSource(a);
}
mxEventSource.prototype.eventListeners = null;
mxEventSource.prototype.eventsEnabled = !0;
mxEventSource.prototype.eventSource = null;
mxEventSource.prototype.isEventsEnabled = function() {
  return this.eventsEnabled;
};
mxEventSource.prototype.setEventsEnabled = function(a) {
  this.eventsEnabled = a;
};
mxEventSource.prototype.getEventSource = function() {
  return this.eventSource;
};
mxEventSource.prototype.setEventSource = function(a) {
  this.eventSource = a;
};
mxEventSource.prototype.addListener = function(a, b) {
  null == this.eventListeners && (this.eventListeners = []);
  this.eventListeners.push(a);
  this.eventListeners.push(b);
};
mxEventSource.prototype.removeListener = function(a) {
  if (null != this.eventListeners)
    for (var b = 0; b < this.eventListeners.length;)
      this.eventListeners[b + 1] == a ? this.eventListeners.splice(b, 2) : b += 2;
};
mxEventSource.prototype.fireEvent = function(a, b) {
  if (null != this.eventListeners && this.isEventsEnabled()) {
    null == a && (a = new mxEventObject());
    null == b && (b = this.getEventSource());
    null == b && (b = this);
    for (var c = 0; c < this.eventListeners.length; c += 2) {
      var d = this.eventListeners[c];
      null != d && d != a.getName() || this.eventListeners[c + 1].apply(this, [
        b,
        a
      ]);
    }
  }
};