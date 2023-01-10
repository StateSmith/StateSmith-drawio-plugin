function mxCellMarker(a, b, c, d) {
  mxEventSource.call(this);
  null != a && (this.graph = a, this.validColor = null != b ? b : mxConstants.DEFAULT_VALID_COLOR, this.invalidColor = null != c ? c : mxConstants.DEFAULT_INVALID_COLOR, this.hotspot = null != d ? d : mxConstants.DEFAULT_HOTSPOT, this.highlight = new mxCellHighlight(a));
}
mxUtils.extend(mxCellMarker, mxEventSource);
mxCellMarker.prototype.graph = null;
mxCellMarker.prototype.enabled = !0;
mxCellMarker.prototype.hotspot = mxConstants.DEFAULT_HOTSPOT;
mxCellMarker.prototype.hotspotEnabled = !1;
mxCellMarker.prototype.validColor = null;
mxCellMarker.prototype.invalidColor = null;
mxCellMarker.prototype.currentColor = null;
mxCellMarker.prototype.validState = null;
mxCellMarker.prototype.markedState = null;
mxCellMarker.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxCellMarker.prototype.isEnabled = function() {
  return this.enabled;
};
mxCellMarker.prototype.setHotspot = function(a) {
  this.hotspot = a;
};
mxCellMarker.prototype.getHotspot = function() {
  return this.hotspot;
};
mxCellMarker.prototype.setHotspotEnabled = function(a) {
  this.hotspotEnabled = a;
};
mxCellMarker.prototype.isHotspotEnabled = function() {
  return this.hotspotEnabled;
};
mxCellMarker.prototype.hasValidState = function() {
  return null != this.validState;
};
mxCellMarker.prototype.getValidState = function() {
  return this.validState;
};
mxCellMarker.prototype.getMarkedState = function() {
  return this.markedState;
};
mxCellMarker.prototype.reset = function() {
  this.validState = null;
  null != this.markedState && (this.markedState = null, this.unmark());
};
mxCellMarker.prototype.process = function(a) {
  var b = null;
  this.isEnabled() && (b = this.getState(a), this.setCurrentState(b, a));
  return b;
};
mxCellMarker.prototype.setCurrentState = function(a, b, c) {
  var d = null != a ? this.isValidState(a) : !1;
  c = null != c ? c : this.getMarkerColor(b.getEvent(), a, d);
  this.validState = d ? a : null;
  if (a != this.markedState || c != this.currentColor)
    this.currentColor = c, null != a && null != this.currentColor ? (this.markedState = a, this.mark()) : null != this.markedState && (this.markedState = null, this.unmark());
};
mxCellMarker.prototype.markCell = function(a, b) {
  a = this.graph.getView().getState(a);
  null != a && (this.currentColor = null != b ? b : this.validColor, this.markedState = a, this.mark());
};
mxCellMarker.prototype.mark = function() {
  this.highlight.setHighlightColor(this.currentColor);
  this.highlight.highlight(this.markedState);
  this.fireEvent(new mxEventObject(mxEvent.MARK, 'state', this.markedState));
};
mxCellMarker.prototype.unmark = function() {
  this.mark();
};
mxCellMarker.prototype.isValidState = function(a) {
  return !0;
};
mxCellMarker.prototype.getMarkerColor = function(a, b, c) {
  return c ? this.validColor : this.invalidColor;
};
mxCellMarker.prototype.getState = function(a) {
  var b = this.graph.getView(),
    c = this.getCell(a);
  b = this.getStateToMark(b.getState(c));
  return null != b && this.intersects(b, a) ? b : null;
};
mxCellMarker.prototype.getCell = function(a) {
  return a.getCell();
};
mxCellMarker.prototype.getStateToMark = function(a) {
  return a;
};
mxCellMarker.prototype.intersects = function(a, b) {
  return this.hotspotEnabled ? mxUtils.intersectsHotspot(a, b.getGraphX(), b.getGraphY(), this.hotspot, mxConstants.MIN_HOTSPOT_SIZE, mxConstants.MAX_HOTSPOT_SIZE) : !0;
};
mxCellMarker.prototype.destroy = function() {
  this.graph.getView().removeListener(this.resetHandler);
  this.graph.getModel().removeListener(this.resetHandler);
  this.highlight.destroy();
};