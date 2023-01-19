TrelloFile = function(b, e, f) {
  DrawioFile.call(this, b, e);
  this.meta = f;
  this.saveNeededCounter = 0;
};
mxUtils.extend(TrelloFile, DrawioFile);
TrelloFile.prototype.getHash = function() {
  return 'T' + encodeURIComponent(this.meta.compoundId);
};
TrelloFile.prototype.getMode = function() {
  return App.MODE_TRELLO;
};
TrelloFile.prototype.isAutosave = function() {
  return !0;
};
TrelloFile.prototype.getTitle = function() {
  return this.meta.name;
};
TrelloFile.prototype.isRenamable = function() {
  return !1;
};
TrelloFile.prototype.getSize = function() {
  return this.meta.bytes;
};
TrelloFile.prototype.save = function(b, e, f) {
  this.doSave(this.getTitle(), e, f);
};
TrelloFile.prototype.saveAs = function(b, e, f) {
  this.doSave(b, e, f);
};
TrelloFile.prototype.doSave = function(b, e, f) {
  var c = this.meta.name;
  this.meta.name = b;
  DrawioFile.prototype.save.apply(this, [
    null,
    mxUtils.bind(this, function() {
      this.meta.name = c;
      this.saveFile(b, !1, e, f);
    }),
    f
  ]);
};
TrelloFile.prototype.saveFile = function(b, e, f, c) {
  this.isEditable() ? this.savingFile ? null != c && (this.saveNeededCounter++, c({
    code: App.ERROR_BUSY
  })) : (this.savingFileTime = new Date(), this.setShadowModified(!1), this.savingFile = !0, this.getTitle() == b ? this.ui.trello.saveFile(this, mxUtils.bind(this, function(k) {
    this.setModified(this.getShadowModified());
    this.savingFile = !1;
    this.meta = k;
    this.contentChanged();
    null != f && f();
    0 < this.saveNeededCounter && (this.saveNeededCounter--, this.saveFile(b, e, f, c));
  }), mxUtils.bind(this, function(k) {
    this.savingFile = !1;
    null != c && c(k);
  })) : this.ui.pickFolder(App.MODE_TRELLO, mxUtils.bind(this, function(k) {
    this.ui.trello.insertFile(b, this.getData(), mxUtils.bind(this, function(m) {
      this.savingFile = !1;
      null != f && f();
      this.ui.fileLoaded(m);
      0 < this.saveNeededCounter && (this.saveNeededCounter--, this.saveFile(b, e, f, c));
    }), mxUtils.bind(this, function() {
      this.savingFile = !1;
      null != c && c();
    }), !1, k);
  }))) : null != f && f();
};