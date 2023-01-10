DropboxFile = function(b, e, f) {
  DrawioFile.call(this, b, e);
  this.stat = f;
};
mxUtils.extend(DropboxFile, DrawioFile);
DropboxFile.prototype.getId = function() {
  return this.stat.path_display.substring(1);
};
DropboxFile.prototype.getHash = function() {
  return 'D' + encodeURIComponent(this.getId());
};
DropboxFile.prototype.getMode = function() {
  return App.MODE_DROPBOX;
};
DropboxFile.prototype.isAutosaveOptional = function() {
  return !0;
};
DropboxFile.prototype.getTitle = function() {
  return this.stat.name;
};
DropboxFile.prototype.isRenamable = function() {
  return !0;
};
DropboxFile.prototype.getSize = function() {
  return this.stat.size;
};
DropboxFile.prototype.isRevisionHistorySupported = function() {
  return !0;
};
DropboxFile.prototype.getFileUrl = function() {
  return 'https://www.dropbox.com/home/Apps' + this.ui.dropbox.appPath + this.stat.path_display;
};
DropboxFile.prototype.getFolderUrl = function() {
  var b = this.getFileUrl();
  return b.substring(0, b.lastIndexOf('/'));
};
DropboxFile.prototype.getRevisions = function(b, e) {
  var f = this.ui.dropbox.client.filesListRevisions({
    path: this.stat.path_lower,
    limit: 100
  });
  f.then(mxUtils.bind(this, function(c) {
    try {
      for (var k = [], m = c.entries.length - 1; 0 <= m; m--)
        mxUtils.bind(this, function(t) {
          k.push({
            modifiedDate: t.client_modified,
            fileSize: t.size,
            getXml: mxUtils.bind(this, function(y, E) {
              this.ui.dropbox.readFile({
                path: this.stat.path_lower,
                rev: t.rev
              }, y, E);
            }),
            getUrl: mxUtils.bind(this, function(y) {
              return this.ui.getUrl(window.location.pathname + '?rev=' + t.rev + '&chrome=0&nav=1&layers=1&edit=_blank' + (null != y ? '&page=' + y : '')) + window.location.hash;
            })
          });
        })(c.entries[m]);
      b(k);
    } catch (t) {
      e(t);
    }
  }));
  f['catch'](function(c) {
    e(c);
  });
};
DropboxFile.prototype.getLatestVersion = function(b, e) {
  this.ui.dropbox.getFile(this.getId(), b, e);
};
DropboxFile.prototype.updateDescriptor = function(b) {
  this.stat = b.stat;
};
DropboxFile.prototype.save = function(b, e, f, c, k) {
  this.doSave(this.getTitle(), b, e, f, c, k);
};
DropboxFile.prototype.saveAs = function(b, e, f) {
  this.doSave(b, !1, e, f);
};
DropboxFile.prototype.doSave = function(b, e, f, c, k, m) {
  var t = this.stat.name;
  this.stat.name = b;
  DrawioFile.prototype.save.apply(this, [
    null,
    mxUtils.bind(this, function() {
      this.stat.name = t;
      this.saveFile(b, e, f, c, k, m);
    }),
    c,
    k,
    m
  ]);
};
DropboxFile.prototype.saveFile = function(b, e, f, c) {
  this.isEditable() ? this.savingFile ? null != c && c({
    code: App.ERROR_BUSY
  }) : (e = mxUtils.bind(this, function(k) {
    if (k)
      try {
        this.savingFileTime = new Date();
        this.setShadowModified(!1);
        this.savingFile = !0;
        var m = mxUtils.bind(this, function(y) {
          var E = this.stat.path_display.lastIndexOf('/');
          E = 1 < E ? this.stat.path_display.substring(1, E + 1) : null;
          this.ui.dropbox.saveFile(b, y, mxUtils.bind(this, function(z) {
            this.setModified(this.getShadowModified());
            this.savingFile = !1;
            this.stat = z;
            this.contentChanged();
            null != f && f();
          }), mxUtils.bind(this, function(z) {
            this.savingFile = !1;
            null != c && c(z);
          }), E);
        });
        if (this.ui.useCanvasForExport && /(\.png)$/i.test(this.getTitle())) {
          var t = this.ui.getPngFileProperties(this.ui.fileNode);
          this.ui.getEmbeddedPng(mxUtils.bind(this, function(y) {
            m(this.ui.base64ToBlob(y, 'image/png'));
          }), c, this.ui.getCurrentFile() != this ? this.getData() : null, t.scale, t.border);
        } else
          m(this.getData());
      } catch (y) {
        if (this.savingFile = !1, null != c)
          c(y);
        else
          throw y;
      }
    else
      null != c && c();
  }), this.getTitle() == b ? e(!0) : this.ui.dropbox.checkExists(b, e)) : null != f && f();
};
DropboxFile.prototype.rename = function(b, e, f) {
  this.ui.dropbox.renameFile(this, b, mxUtils.bind(this, function(c) {
    this.hasSameExtension(b, this.getTitle()) ? (this.stat = c, this.descriptorChanged(), null != e && e()) : (this.stat = c, this.descriptorChanged(), this.save(!0, e, f));
  }), f);
};