TrelloLibrary = function(b, e, f) {
  TrelloFile.call(this, b, e, f);
};
mxUtils.extend(TrelloLibrary, TrelloFile);
TrelloLibrary.prototype.doSave = function(b, e, f) {
  this.saveFile(b, !1, e, f);
};
TrelloLibrary.prototype.open = function() {};