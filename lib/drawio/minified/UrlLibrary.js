UrlLibrary = function(b, e, f) {
  StorageFile.call(this, b, e, f);
  b = f;
  e = b.lastIndexOf('/');
  0 <= e && (b = b.substring(e + 1));
  this.fname = b;
};
mxUtils.extend(UrlLibrary, StorageFile);
UrlLibrary.prototype.getHash = function() {
  return 'U' + encodeURIComponent(this.title);
};
UrlLibrary.prototype.getTitle = function() {
  return this.fname;
};
UrlLibrary.prototype.isAutosave = function() {
  return !1;
};
UrlLibrary.prototype.isEditable = function(b, e, f) {
  return !1;
};
UrlLibrary.prototype.saveAs = function(b, e, f) {};
UrlLibrary.prototype.open = function() {};