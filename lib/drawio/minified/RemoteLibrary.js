RemoteLibrary = function(b, e, f) {
  RemoteFile.call(this, b, e, f.title);
  this.libObj = f;
};
mxUtils.extend(RemoteLibrary, LocalFile);
RemoteLibrary.prototype.getHash = function() {
  return 'R' + encodeURIComponent(JSON.stringify([
    this.libObj.id,
    this.libObj.title,
    this.libObj.downloadUrl
  ]));
};
RemoteLibrary.prototype.isEditable = function() {
  return !1;
};
RemoteLibrary.prototype.isRenamable = function() {
  return !1;
};
RemoteLibrary.prototype.isAutosave = function() {
  return !1;
};
RemoteLibrary.prototype.save = function(b, e, f) {};
RemoteLibrary.prototype.saveAs = function(b, e, f) {};
RemoteLibrary.prototype.updateFileData = function() {};
RemoteLibrary.prototype.open = function() {};