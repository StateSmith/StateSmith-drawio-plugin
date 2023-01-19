DrawioFilePuller = function(b, e) {
  this.file = b;
  this.sync = e;
};
DrawioFilePuller.prototype.start = function(b) {
  var e = mxUtils.bind(this, function() {
    this.sync.lastModified = this.file.getLastModifiedDate();
    this.sync.updateStatus();
  });
  this.intId = setInterval(mxUtils.bind(this, function() {
    this.file.getLatestVersionId(mxUtils.bind(this, function(f) {
      f != this.file.getCurrentRevisionId() ? this.file.getLatestVersion(mxUtils.bind(this, function(c) {
        this.file.mergeFile(c, e);
      }), mxUtils.bind(this, function() {})) : e();
    }), mxUtils.bind(this, function() {}));
  }), b);
  this._isConnected = !0;
};
DrawioFilePuller.prototype.stop = function() {
  clearInterval(this.intId);
  this._isConnected = !1;
};
DrawioFilePuller.prototype.isConnected = function() {
  return this._isConnected;
};