LocalFile = function(b, e, f, c, k, m) {
  DrawioFile.call(this, b, e);
  this.title = f;
  this.mode = c ? null : App.MODE_DEVICE;
  this.fileHandle = k;
  this.desc = m;
};
mxUtils.extend(LocalFile, DrawioFile);
LocalFile.prototype.isAutosave = function() {
  return null != this.fileHandle && !this.invalidFileHandle && DrawioFile.prototype.isAutosave.apply(this, arguments);
};
LocalFile.prototype.isAutosaveOptional = function() {
  return null != this.fileHandle;
};
LocalFile.prototype.getMode = function() {
  return this.mode;
};
LocalFile.prototype.getTitle = function() {
  return this.title;
};
LocalFile.prototype.isRenamable = function() {
  return !0;
};
LocalFile.prototype.save = function(b, e, f) {
  this.saveAs(this.title, e, f);
};
LocalFile.prototype.saveAs = function(b, e, f) {
  this.saveFile(b, !1, e, f);
};
LocalFile.prototype.saveAs = function(b, e, f) {
  this.saveFile(b, !1, e, f);
};
LocalFile.prototype.getDescriptor = function() {
  return this.desc;
};
LocalFile.prototype.setDescriptor = function(b) {
  this.desc = b;
};
LocalFile.prototype.share = function() {
  null == this.mode ? this.ui.actions.get('save').funct(!1) : DrawioFile.prototype.share.apply(this, arguments);
};
LocalFile.prototype.getLatestVersion = function(b, e) {
  null == this.fileHandle ? null != e && e({
    message: mxResources.get('cannotOpenFile')
  }) : this.ui.loadFileSystemEntry(this.fileHandle, b, e);
};
LocalFile.prototype.saveFile = function(b, e, f, c, k) {
  b != this.title && (this.desc = this.fileHandle = null);
  this.title = b;
  k || this.updateFileData();
  var m = this.ui.useCanvasForExport && /(\.png)$/i.test(this.getTitle());
  this.setShadowModified(!1);
  var t = this.getData(),
    y = mxUtils.bind(this, function() {
      this.setModified(this.getShadowModified());
      this.contentChanged();
      null != f && f();
    }),
    E = mxUtils.bind(this, function(z) {
      if (null != this.fileHandle) {
        if (!this.savingFile) {
          this.savingFileTime = new Date();
          this.savingFile = !0;
          var D = mxUtils.bind(this, function(G) {
            this.savingFile = !1;
            null != c && c({
              error: G
            });
          });
          this.saveDraft();
          this.fileHandle.createWritable().then(mxUtils.bind(this, function(G) {
            this.fileHandle.getFile().then(mxUtils.bind(this, function(d) {
              this.invalidFileHandle = null;
              EditorUi.debug('LocalFile.saveFile', [this], 'desc', [this.desc], 'newDesc', [d], 'conflict', this.desc.lastModified != d.lastModified);
              this.desc.lastModified == d.lastModified ? G.write(m ? this.ui.base64ToBlob(z, 'image/png') : z).then(mxUtils.bind(this, function() {
                G.close().then(mxUtils.bind(this, function() {
                  this.fileHandle.getFile().then(mxUtils.bind(this, function(g) {
                    try {
                      var n = this.desc;
                      this.savingFile = !1;
                      this.desc = g;
                      this.fileSaved(t, n, y, D);
                      this.removeDraft();
                    } catch (v) {
                      D(v);
                    }
                  }), D);
                }), D);
              }), D) : (this.inConflictState = !0, D());
            }), mxUtils.bind(this, function(d) {
              this.invalidFileHandle = !0;
              D(d);
            }));
          }), D);
        }
      } else {
        if (this.ui.isOfflineApp() || this.ui.isLocalFileSave())
          this.ui.doSaveLocalFile(z, b, m ? 'image/png' : 'text/xml', m);
        else if (z.length < MAX_REQUEST_SIZE) {
          var J = b.lastIndexOf('.');
          J = 0 < J ? b.substring(J + 1) : 'xml';
          new mxXmlRequest(SAVE_URL, 'format=' + J + '&xml=' + encodeURIComponent(z) + '&filename=' + encodeURIComponent(b) + (m ? '&binary=1' : '')).simulate(document, '_blank');
        } else
          this.ui.handleError({
            message: mxResources.get('drawingTooLarge')
          }, mxResources.get('error'), mxUtils.bind(this, function() {
            mxUtils.popup(z);
          }));
        y();
      }
    });
  m ? (e = this.ui.getPngFileProperties(this.ui.fileNode), this.ui.getEmbeddedPng(mxUtils.bind(this, function(z) {
    E(z);
  }), c, this.ui.getCurrentFile() != this ? t : null, e.scale, e.border)) : E(t);
};
LocalFile.prototype.rename = function(b, e, f) {
  this.title = b;
  this.descriptorChanged();
  null != e && e();
};
LocalFile.prototype.open = function() {
  this.ui.setFileData(this.getData());
  this.installListeners();
};