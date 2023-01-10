LocalLibrary = function(b, e, f) {
  LocalFile.call(this, b, e, f);
};
mxUtils.extend(LocalLibrary, LocalFile);
LocalLibrary.prototype.getHash = function() {
  return 'F' + this.getTitle();
};
LocalLibrary.prototype.isAutosave = function() {
  return !1;
};
LocalLibrary.prototype.saveAs = function(b, e, f) {
  this.saveFile(b, !1, e, f);
};
LocalLibrary.prototype.updateFileData = function() {};
LocalLibrary.prototype.open = function() {};