function Menu(a, b) {
  mxEventSource.call(this);
  this.funct = a;
  this.enabled = null != b ? b : !0;
}
mxUtils.extend(Menu, mxEventSource);
Menu.prototype.isEnabled = function() {
  return this.enabled;
};
Menu.prototype.setEnabled = function(a) {
  this.enabled != a && (this.enabled = a, this.fireEvent(new mxEventObject('stateChanged')));
};
Menu.prototype.execute = function(a, b) {
  this.funct(a, b);
};
EditorUi.prototype.createMenus = function() {
  return new Menus(this);
};