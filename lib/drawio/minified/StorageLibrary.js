StorageLibrary = function(b, e, f) {
  StorageFile.call(this, b, e, f);
};
mxUtils.extend(StorageLibrary, StorageFile);
StorageLibrary.prototype.type = 'L';
StorageLibrary.prototype.isAutosave = function() {
  return !0;
};
StorageLibrary.prototype.saveAs = function(b, e, f) {
  this.saveFile(b, !1, e, f);
};
StorageLibrary.prototype.getHash = function() {
  return 'L' + encodeURIComponent(this.title);
};
StorageLibrary.prototype.getTitle = function() {
  return '.scratchpad' == this.title ? mxResources.get('scratchpad') : this.title;
};
StorageLibrary.prototype.isRenamable = function(b, e, f) {
  return '.scratchpad' != this.title;
};
StorageLibrary.prototype.open = function() {};