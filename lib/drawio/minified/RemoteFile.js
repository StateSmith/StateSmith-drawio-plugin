RemoteFile = function(b, e, f) {
  DrawioFile.call(this, b, e);
  this.title = f;
  this.mode = null;
};
mxUtils.extend(RemoteFile, DrawioFile);
RemoteFile.prototype.isAutosave = function() {
  return !1;
};
RemoteFile.prototype.getMode = function() {
  return this.mode;
};
RemoteFile.prototype.getTitle = function() {
  return this.title;
};
RemoteFile.prototype.isRenamable = function() {
  return !1;
};
RemoteFile.prototype.open = function() {
  this.ui.setFileData(this.getData());
  this.installListeners();
};