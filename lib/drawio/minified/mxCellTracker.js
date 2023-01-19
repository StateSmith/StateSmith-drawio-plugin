function mxCellTracker(a, b, c) {
  mxCellMarker.call(this, a, b);
  this.graph.addMouseListener(this);
  null != c && (this.getCell = c);
  mxClient.IS_IE && mxEvent.addListener(window, 'unload', mxUtils.bind(this, function() {
    this.destroy();
  }));
}
mxUtils.extend(mxCellTracker, mxCellMarker);
mxCellTracker.prototype.mouseDown = function(a, b) {};
mxCellTracker.prototype.mouseMove = function(a, b) {
  this.isEnabled() && this.process(b);
};
mxCellTracker.prototype.mouseUp = function(a, b) {};
mxCellTracker.prototype.destroy = function() {
  this.destroyed || (this.destroyed = !0, this.graph.removeMouseListener(this), mxCellMarker.prototype.destroy.apply(this));
};