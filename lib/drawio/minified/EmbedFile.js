EmbedFile = function(b, e, f) {
  DrawioFile.call(this, b, e);
  this.desc = f || {};
  this.mode = App.MODE_EMBED;
};
mxUtils.extend(EmbedFile, DrawioFile);
EmbedFile.prototype.getMode = function() {
  return this.mode;
};
EmbedFile.prototype.getTitle = function() {
  return this.desc.title || '';
};