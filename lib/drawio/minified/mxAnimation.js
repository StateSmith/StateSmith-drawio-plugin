function mxAnimation(a) {
  this.delay = null != a ? a : 20;
}
mxAnimation.prototype = new mxEventSource();
mxAnimation.prototype.constructor = mxAnimation;
mxAnimation.prototype.delay = null;
mxAnimation.prototype.thread = null;
mxAnimation.prototype.isRunning = function() {
  return null != this.thread;
};
mxAnimation.prototype.startAnimation = function() {
  null == this.thread && (this.thread = window.setInterval(mxUtils.bind(this, this.updateAnimation), this.delay));
};
mxAnimation.prototype.updateAnimation = function() {
  this.fireEvent(new mxEventObject(mxEvent.EXECUTE));
};
mxAnimation.prototype.stopAnimation = function() {
  null != this.thread && (window.clearInterval(this.thread), this.thread = null, this.fireEvent(new mxEventObject(mxEvent.DONE)));
};