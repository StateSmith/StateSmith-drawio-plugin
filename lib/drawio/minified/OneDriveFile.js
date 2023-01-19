OneDriveFile = function(b, e, f) {
  DrawioFile.call(this, b, e);
  this.meta = f;
};
mxUtils.extend(OneDriveFile, DrawioFile);
OneDriveFile.prototype.autosaveDelay = 500;
OneDriveFile.prototype.isRealtimeSupported = function() {
  return !0;
};
OneDriveFile.prototype.getFileUrl = function() {
  var b = this.meta.webUrl;
  b = b.substring(0, b.lastIndexOf('/'));
  if (null != this.meta.parentReference)
    try {
      if ('personal' == this.meta.parentReference.driveType)
        b = 'https://onedrive.live.com/?cid=' + encodeURIComponent(this.meta.parentReference.driveId) + '&id=' + encodeURIComponent(this.meta.id);
      else if ('documentLibrary' == this.meta.parentReference.driveType) {
        var e = this.meta.parentReference.path;
        e = e.substring(e.indexOf('/root:') + 6);
        var f = this.meta.webUrl;
        b = f.substring(0, f.length - e.length - this.meta.name.length - (0 < e.length ? 1 : 0));
        f = f.substring(f.indexOf('/', 8));
        b = b + '/Forms/AllItems.aspx?id=' + f + '&parent=' + f.substring(0, f.lastIndexOf('/'));
      } else if ('business' == this.meta.parentReference.driveType) {
        b = this.meta['@microsoft.graph.downloadUrl'];
        var c = b.indexOf('/_layouts/15/download.aspx?');
        e = f = this.meta.webUrl;
        f = f.substring(8);
        f = f.substring(f.indexOf('/'));
        e = e.substring(0, e.lastIndexOf('/'));
        e = e.substring(e.indexOf('/', 8));
        b = b.substring(0, c) + '/_layouts/15/onedrive.aspx?id=' + f + '&parent=' + e;
      }
    } catch (k) {}
  return b;
};
OneDriveFile.prototype.getFolderUrl = function() {
  var b = this.meta.webUrl,
    e = encodeURIComponent(this.meta.name);
  b.substring(b.length - e.length, b.length) == e && (b = b.substring(0, b.length - e.length));
  return b;
};
OneDriveFile.prototype.share = function() {
  this.ui.openLink(this.getFileUrl());
};
OneDriveFile.prototype.getId = function() {
  return this.getIdOf(this.meta);
};
OneDriveFile.prototype.getParentId = function() {
  return this.getIdOf(this.meta, !0);
};
OneDriveFile.prototype.getIdOf = function(b, e) {
  return (null != b.parentReference && null != b.parentReference.driveId ? b.parentReference.driveId + '/' : '') + (null != e ? b.parentReference.id : b.id + (b.folder && b.folder.isRoot ? '/root' : ''));
};
OneDriveFile.prototype.getChannelId = function() {
  return 'W-' + DrawioFile.prototype.getChannelId.apply(this, arguments);
};
OneDriveFile.prototype.getHash = function() {
  return 'W' + encodeURIComponent(this.getId());
};
OneDriveFile.prototype.getMode = function() {
  return App.MODE_ONEDRIVE;
};
OneDriveFile.prototype.isAutosaveOptional = function() {
  return !0;
};
OneDriveFile.prototype.getTitle = function() {
  return this.meta.name;
};
OneDriveFile.prototype.isRenamable = function() {
  return !0;
};
OneDriveFile.prototype.isOptimisticSync = function() {
  return !0;
};
OneDriveFile.prototype.isSyncEnabled = function() {
  return !0;
};
OneDriveFile.prototype.isSyncSupported = function() {
  return !0;
};
OneDriveFile.prototype.getSize = function() {
  return this.meta.size;
};
OneDriveFile.prototype.isConflict = function(b) {
  return null != b && (412 == b.getStatus() || 409 == b.getStatus());
};
OneDriveFile.prototype.getCurrentUser = function() {
  return null != this.ui.oneDrive ? this.ui.oneDrive.user : null;
};
OneDriveFile.prototype.loadDescriptor = function(b, e) {
  this.ui.oneDrive.executeRequest(this.ui.oneDrive.getItemURL(this.getId()), mxUtils.bind(this, function(f) {
    200 <= f.getStatus() && 299 >= f.getStatus() ? b(JSON.parse(f.getText())) : null != e && e();
  }), e);
};
OneDriveFile.prototype.getLatestVersion = function(b, e) {
  this.ui.oneDrive.getFile(this.getId(), b, e);
};
OneDriveFile.prototype.getDescriptor = function() {
  return this.meta;
};
OneDriveFile.prototype.setDescriptor = function(b) {
  this.meta = b;
};
OneDriveFile.prototype.getDescriptorEtag = function(b) {
  return b.eTag;
};
OneDriveFile.prototype.setDescriptorEtag = function(b, e) {
  b.eTag = e;
};
OneDriveFile.prototype.loadPatchDescriptor = function(b, e) {
  var f = this.ui.oneDrive.getItemURL(this.getId());
  this.ui.oneDrive.executeRequest(f + '?select=etag,file', mxUtils.bind(this, function(c) {
    200 <= c.getStatus() && 299 >= c.getStatus() ? b(JSON.parse(c.getText())) : e(this.ui.oneDrive.parseRequestText(c));
  }), e);
};
OneDriveFile.prototype.getChannelKey = function() {
  return 'undefined' !== typeof CryptoJS ? CryptoJS.MD5(this.meta.createdDateTime + (null != this.meta.createdBy && null != this.meta.createdBy.user ? this.meta.createdBy.user.id : '')).toString() : null;
};
OneDriveFile.prototype.getLastModifiedDate = function() {
  return new Date(this.meta.lastModifiedDateTime);
};
OneDriveFile.prototype.save = function(b, e, f, c, k) {
  this.doSave(this.getTitle(), b, e, f, c, k);
};
OneDriveFile.prototype.saveAs = function(b, e, f) {
  this.doSave(b, !1, e, f);
};
OneDriveFile.prototype.doSave = function(b, e, f, c, k, m) {
  var t = this.meta.name;
  this.meta.name = b;
  DrawioFile.prototype.save.apply(this, [
    null,
    mxUtils.bind(this, function() {
      this.meta.name = t;
      this.saveFile(b, e, f, c, k, m);
    }),
    c,
    k,
    m
  ]);
};
OneDriveFile.prototype.saveFile = function(b, e, f, c, k, m) {
  if (!this.isEditable())
    null != f && f();
  else if (!this.savingFile)
    if (this.getTitle() == b) {
      var t = mxUtils.bind(this, function() {
        try {
          this.savingFileTime = new Date();
          this.setShadowModified(!1);
          this.savingFile = !0;
          var y = m || this.constructor != OneDriveFile || 'manual' != DrawioFile.SYNC && 'auto' != DrawioFile.SYNC ? null : this.getCurrentEtag(),
            E = this.meta;
          null != this.sync && this.sync.fileSaving();
          this.ui.oneDrive.saveFile(this, mxUtils.bind(this, function(z, D) {
            this.setModified(this.getShadowModified());
            this.savingFile = !1;
            this.meta = z;
            this.fileSaved(D, E, mxUtils.bind(this, function() {
              this.contentChanged();
              null != f && f();
            }), c);
          }), mxUtils.bind(this, function(z, D) {
            try {
              this.savingFile = !1, this.isConflict(D) ? (this.inConflictState = !0, null != this.sync ? (this.savingFile = !0, this.sync.fileConflict(null, mxUtils.bind(this, function() {
                window.setTimeout(mxUtils.bind(this, function() {
                  this.updateFileData();
                  t();
                }), 100 + 500 * Math.random());
              }), mxUtils.bind(this, function() {
                this.savingFile = !1;
                null != c && c();
              }))) : null != c && c()) : null != c && c(z);
            } catch (J) {
              if (this.savingFile = !1, null != c)
                c(J);
              else
                throw J;
            }
          }), y);
        } catch (z) {
          if (this.savingFile = !1, null != c)
            c(z);
          else
            throw z;
        }
      });
      t();
    } else
      this.savingFileTime = new Date(), this.setShadowModified(!1), this.savingFile = !0, this.ui.oneDrive.insertFile(b, this.getData(), mxUtils.bind(this, function(y) {
        this.setModified(this.getShadowModified());
        this.savingFile = !1;
        null != f && f();
        this.ui.fileLoaded(y);
      }), mxUtils.bind(this, function() {
        this.savingFile = !1;
        null != c && c();
      }));
};
OneDriveFile.prototype.rename = function(b, e, f) {
  var c = this.getCurrentRevisionId();
  this.ui.oneDrive.renameFile(this, b, mxUtils.bind(this, function(k) {
    this.hasSameExtension(b, this.getTitle()) ? (this.meta = k, this.descriptorChanged(), null != this.sync && this.sync.descriptorChanged(c), null != e && e(k)) : (this.meta = k, null != this.sync && this.sync.descriptorChanged(c), this.save(!0, e, f));
  }), f);
};
OneDriveFile.prototype.move = function(b, e, f) {
  this.ui.oneDrive.moveFile(this.getId(), b, mxUtils.bind(this, function(c) {
    this.meta = c;
    this.descriptorChanged();
    null != e && e(c);
  }), f);
};