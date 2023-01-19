DriveFile = function(b, e, f) {
  DrawioFile.call(this, b, e);
  this.desc = f;
};
mxUtils.extend(DriveFile, DrawioFile);
DriveFile.prototype.saveDelay = 0;
DriveFile.prototype.allChangesSavedKey = 'allChangesSavedInDrive';
DriveFile.prototype.getSize = function() {
  return this.desc.fileSize;
};
DriveFile.prototype.isRestricted = function() {
  return null != this.desc.userPermission && null != this.desc.labels && 'reader' == this.desc.userPermission.role && this.desc.labels.restricted;
};
DriveFile.prototype.isConflict = function(b) {
  return null != b && null != b.error && 412 == b.error.code;
};
DriveFile.prototype.getCurrentUser = function() {
  return null != this.ui.drive ? this.ui.drive.user : null;
};
DriveFile.prototype.getMode = function() {
  return App.MODE_GOOGLE;
};
DriveFile.prototype.getFileUrl = function() {
  return 'https://drive.google.com/open?authuser=0&id=' + this.getId();
};
DriveFile.prototype.getFolderUrl = function() {
  return null != this.desc.parents && 0 < this.desc.parents.length ? 'https://drive.google.com/drive/folders/' + this.desc.parents[0].id : null;
};
DriveFile.prototype.getPublicUrl = function(b) {
  this.ui.drive.executeRequest({
    url: '/files/' + this.desc.id + '/permissions?supportsAllDrives=true'
  }, mxUtils.bind(this, function(e) {
    if (null != e && null != e.items)
      for (var f = 0; f < e.items.length; f++)
        if ('anyoneWithLink' === e.items[f].id || 'anyone' === e.items[f].id) {
          b(this.desc.webContentLink);
          return;
        }
    b(null);
  }), mxUtils.bind(this, function() {
    b(null);
  }));
};
DriveFile.prototype.isAutosaveOptional = function() {
  return !0;
};
DriveFile.prototype.isRenamable = function() {
  return this.isEditable() && DrawioFile.prototype.isEditable.apply(this, arguments);
};
DriveFile.prototype.isMovable = function() {
  return this.isEditable();
};
DriveFile.prototype.isTrashed = function() {
  return this.desc.labels.trashed;
};
DriveFile.prototype.save = function(b, e, f, c, k) {
  DrawioFile.prototype.save.apply(this, [
    b,
    mxUtils.bind(this, function() {
      this.saveFile(null, b, e, f, c, k);
    }),
    f,
    c,
    k
  ]);
};
DriveFile.prototype.saveFile = function(b, e, f, c, k, m) {
  try {
    this.isEditable() ? this.savingFile || (this.savingFileTime = new Date(), this.setShadowModified(!1), this.savingFile = !0, this.createSecret(mxUtils.bind(this, function(t, y) {
      var E = mxUtils.bind(this, function(z, D) {
        try {
          var J = this.desc;
          null != this.sync && this.sync.fileSaving();
          this.ui.drive.saveFile(this, D, mxUtils.bind(this, function(G, d) {
            try {
              this.savingFile = !1, 0 != G ? (this.setModified(this.getShadowModified()), e && (this.lastAutosaveRevision = new Date().getTime()), this.autosaveDelay = Math.round(Math.min(10000, Math.max(DriveFile.prototype.autosaveDelay, this.saveDelay))), this.desc = G, null != y ? this.fileSaved(d, J, mxUtils.bind(this, function() {
                this.contentChanged();
                null != f && f(G);
              }), c, y) : null != f && f(G)) : null != c && c(G);
            } catch (g) {
              if (this.savingFile = !1, null != c)
                c(g);
              else
                throw g;
            }
          }), mxUtils.bind(this, function(G, d) {
            try {
              this.savingFile = !1, this.isConflict(G) ? (this.inConflictState = !0, null != this.sync ? (this.savingFile = !0, this.sync.fileConflict(d, mxUtils.bind(this, function() {
                window.setTimeout(mxUtils.bind(this, function() {
                  this.updateFileData();
                  this.setShadowModified(!1);
                  E(z, !0);
                }), 100 + 500 * Math.random());
              }), mxUtils.bind(this, function() {
                this.savingFile = !1;
                null != c && c();
              }))) : null != c && c()) : null != c && c(G);
            } catch (g) {
              if (this.savingFile = !1, null != c)
                c(g);
              else
                throw g;
            }
          }), k, k, z, null, t);
        } catch (G) {
          if (this.savingFile = !1, null != c)
            c(G);
          else
            throw G;
        }
      });
      E(m, e);
    }))) : null != f && f();
  } catch (t) {
    if (null != c)
      c(t);
    else
      throw t;
  }
};
DriveFile.prototype.copyFile = function(b, e) {
  this.isRestricted() ? DrawioFile.prototype.copyFile.apply(this, arguments) : this.makeCopy(mxUtils.bind(this, function() {
    if (this.ui.spinner.spin(document.body, mxResources.get('saving')))
      try {
        this.save(!0, b, e);
      } catch (f) {
        e(f);
      }
  }), e, !0);
};
DriveFile.prototype.makeCopy = function(b, e, f) {
  this.ui.spinner.spin(document.body, mxResources.get('saving')) && this.saveAs(this.ui.getCopyFilename(this, f), mxUtils.bind(this, function(c) {
    this.desc = c;
    this.ui.spinner.stop();
    this.setModified(!1);
    this.backupPatch = null;
    this.inConflictState = this.invalidChecksum = !1;
    this.descriptorChanged();
    b();
  }), mxUtils.bind(this, function() {
    this.ui.spinner.stop();
    null != e && e();
  }));
};
DriveFile.prototype.saveAs = function(b, e, f) {
  this.ui.drive.copyFile(this.getId(), b, e, f);
};
DriveFile.prototype.rename = function(b, e, f) {
  var c = this.getCurrentRevisionId();
  this.ui.drive.renameFile(this.getId(), b, mxUtils.bind(this, function(k) {
    this.hasSameExtension(b, this.getTitle()) ? (this.desc = k, this.descriptorChanged(), null != this.sync && this.sync.descriptorChanged(c), null != e && e(k)) : (this.desc = k, null != this.sync && this.sync.descriptorChanged(c), this.save(!0, e, f));
  }), f);
};
DriveFile.prototype.move = function(b, e, f) {
  this.ui.drive.moveFile(this.getId(), b, mxUtils.bind(this, function(c) {
    this.desc = c;
    this.descriptorChanged();
    null != e && e(c);
  }), f);
};
DriveFile.prototype.share = function() {
  this.ui.drive.showPermissions(this.getId());
};
DriveFile.prototype.getTitle = function() {
  return this.desc.title;
};
DriveFile.prototype.getHash = function() {
  return 'G' + this.getId();
};
DriveFile.prototype.getId = function() {
  return this.desc.id;
};
DriveFile.prototype.isEditable = function() {
  return DrawioFile.prototype.isEditable.apply(this, arguments) && this.desc.editable;
};
DriveFile.prototype.isSyncSupported = function() {
  return !0;
};
DriveFile.prototype.isRealtimeSupported = function() {
  return !0;
};
DriveFile.prototype.isRealtimeOptional = function() {
  return null != this.sync && this.sync.isConnected();
};
DriveFile.prototype.setRealtimeEnabled = function(b, e, f) {
  null != this.sync ? this.ui.drive.executeRequest({
    url: '/files/' + this.getId() + '/properties?alt=json&supportsAllDrives=true',
    method: 'POST',
    contentType: 'application/json; charset=UTF-8',
    params: {
      key: 'collaboration',
      value: b ? 'enabled' : '0' != urlParams['fast-sync'] ? 'disabled' : ''
    }
  }, mxUtils.bind(this, function() {
    this.loadDescriptor(mxUtils.bind(this, function(c) {
      null != c ? (this.sync.descriptorChanged(this.getCurrentEtag()), this.sync.updateDescriptor(c), e()) : f();
    }), f);
  }), f) : f();
};
DriveFile.prototype.isRealtimeEnabled = function() {
  var b = this.ui.drive.getCustomProperty(this.desc, 'collaboration');
  return DrawioFile.prototype.isRealtimeEnabled.apply(this, arguments) && 'disabled' != b || Editor.enableRealtime && 'enabled' == b;
};
DriveFile.prototype.isRevisionHistorySupported = function() {
  return !0;
};
DriveFile.prototype.getRevisions = function(b, e) {
  this.ui.drive.executeRequest({
    url: '/files/' + this.getId() + '/revisions'
  }, mxUtils.bind(this, function(f) {
    for (var c = 0; c < f.items.length; c++)
      mxUtils.bind(this, function(k) {
        k.title = k.originalFilename;
        k.getXml = mxUtils.bind(this, function(m, t) {
          this.ui.drive.getXmlFile(k, mxUtils.bind(this, function(y) {
            m(y.getData());
          }), t);
        });
        k.getUrl = mxUtils.bind(this, function(m) {
          return this.ui.getUrl(window.location.pathname + '?rev=' + k.id + '&chrome=0&nav=1&layers=1&edit=_blank' + (null != m ? '&page=' + m : '')) + window.location.hash;
        });
      })(f.items[c]);
    b(f.items);
  }), e);
};
DriveFile.prototype.getLatestVersion = function(b, e) {
  this.ui.drive.getFile(this.getId(), b, e, !0);
};
DriveFile.prototype.getChannelId = function() {
  var b = this.ui.drive.getCustomProperty(this.desc, 'channel');
  null != b && (b = 'G-' + this.getId() + '.' + b);
  return b;
};
DriveFile.prototype.getChannelKey = function() {
  return this.ui.drive.getCustomProperty(this.desc, 'key');
};
DriveFile.prototype.getLastModifiedDate = function() {
  return new Date(this.desc.modifiedDate);
};
DriveFile.prototype.getDescriptor = function() {
  return this.desc;
};
DriveFile.prototype.setDescriptor = function(b) {
  this.desc = b;
};
DriveFile.prototype.getDescriptorSecret = function(b) {
  return this.ui.drive.getCustomProperty(b, 'secret');
};
DriveFile.prototype.setDescriptorRevisionId = function(b, e) {
  b.headRevisionId = e;
};
DriveFile.prototype.getDescriptorRevisionId = function(b) {
  return b.headRevisionId;
};
DriveFile.prototype.getDescriptorEtag = function(b) {
  return b.etag;
};
DriveFile.prototype.setDescriptorEtag = function(b, e) {
  b.etag = e;
};
DriveFile.prototype.loadPatchDescriptor = function(b, e) {
  this.ui.drive.executeRequest({
    url: '/files/' + this.getId() + '?supportsAllDrives=true&fields=' + this.ui.drive.catchupFields
  }, mxUtils.bind(this, function(f) {
    b(f);
  }), e);
};
DriveFile.prototype.patchDescriptor = function(b, e) {
  b.headRevisionId = e.headRevisionId;
  b.modifiedDate = e.modifiedDate;
  DrawioFile.prototype.patchDescriptor.apply(this, arguments);
};
DriveFile.prototype.loadDescriptor = function(b, e) {
  this.ui.drive.loadDescriptor(this.getId(), b, e);
};
DriveFile.prototype.commentsSupported = function() {
  return !0;
};
DriveFile.prototype.getComments = function(b, e) {
  function f(k, m, t) {
    if (m.deleted)
      return null;
    t = new DriveComment(k, m.commentId || m.replyId, m.content, m.modifiedDate, m.createdDate, 'resolved' == m.status, m.author.isAuthenticatedUser ? c : new DrawioUser(m.author.permissionId, m.author.emailAddress, m.author.displayName, m.author.picture.url), t);
    for (var y = 0; null != m.replies && y < m.replies.length; y++)
      t.addReplyDirect(f(k, m.replies[y], m.commentId));
    return t;
  }
  var c = this.ui.getCurrentUser();
  this.ui.drive.executeRequest({
    url: '/files/' + this.getId() + '/comments'
  }, mxUtils.bind(this, function(k) {
    for (var m = [], t = 0; t < k.items.length; t++) {
      var y = f(this, k.items[t]);
      null != y && m.push(y);
    }
    b(m);
  }), e);
};
DriveFile.prototype.addComment = function(b, e, f) {
  b = {
    content: b.content
  };
  this.ui.drive.executeRequest({
    url: '/files/' + this.getId() + '/comments',
    method: 'POST',
    params: b
  }, mxUtils.bind(this, function(c) {
    e(c.commentId);
  }), f);
};
DriveFile.prototype.canReplyToReplies = function() {
  return !1;
};
DriveFile.prototype.canComment = function() {
  return this.desc.canComment;
};
DriveFile.prototype.newComment = function(b, e) {
  return new DriveComment(this, null, b, Date.now(), Date.now(), !1, e);
};