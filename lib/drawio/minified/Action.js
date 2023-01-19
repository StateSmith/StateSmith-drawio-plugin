function Action(a, b, f, e, g) {
  mxEventSource.call(this);
  this.label = a;
  this.funct = this.createFunction(b);
  this.enabled = null != f ? f : !0;
  this.iconCls = e;
  this.shortcut = g;
  this.visible = !0;
}
mxUtils.extend(Action, mxEventSource);
Action.prototype.createFunction = function(a) {
  return a;
};
Action.prototype.setEnabled = function(a) {
  this.enabled != a && (this.enabled = a, this.fireEvent(new mxEventObject('stateChanged')));
};
Action.prototype.isEnabled = function() {
  return this.enabled;
};
Action.prototype.setToggleAction = function(a) {
  this.toggleAction = a;
};
Action.prototype.setSelectedCallback = function(a) {
  this.selectedCallback = a;
};
Action.prototype.isSelected = function() {
  return this.selectedCallback();
};