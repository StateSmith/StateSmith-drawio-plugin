GitHubFile = function(b, e, f) {
  DrawioFile.call(this, b, e);
  this.meta = f;
  this.peer = this.ui.gitHub;
};
mxUtils.extend(GitHubFile, DrawioFile);
GitHubFile.prototype.share = function() {
  this.ui.editor.graph.openLink('https://github.com/' + encodeURIComponent(this.meta.org) + '/' + encodeURIComponent(this.meta.repo) + '/settings/access');
};
GitHubFile.prototype.getId = function() {
  return encodeURIComponent(this.meta.org) + '/' + (null != this.meta.repo ? encodeURIComponent(this.meta.repo) + '/' + (null != this.meta.ref ? this.meta.ref + (null != this.meta.path ? '/' + this.meta.path : '') : '') : '');
};
GitHubFile.prototype.getHash = function() {
  return encodeURIComponent('H' + this.getId());
};
GitHubFile.prototype.getFileUrl = function() {
  return 'https://github.com/' + encodeURIComponent(this.meta.org) + '/' + encodeURIComponent(this.meta.repo) + '/blob/' + this.meta.ref + '/' + this.meta.path;
};
GitHubFile.prototype.getFolderUrl = function() {
  return 'https://github.com/' + encodeURIComponent(this.meta.org) + '/' + encodeURIComponent(this.meta.repo) + '/tree/' + this.meta.ref + '/' + this.meta.path.split('/').slice(0, -1).join('/');
};
GitHubFile.prototype.getPublicUrl = function(b) {
  if (null != this.meta.download_url)
    try {
      '' != new URL(this.meta.download_url).search ? b(null) : mxUtils.get(this.meta.download_url, mxUtils.bind(this, function(e) {
        b(200 <= e.getStatus() && 299 >= e.getStatus() ? this.meta.download_url : null);
      }), mxUtils.bind(this, function() {
        b(null);
      }));
    } catch (e) {
      b(null);
    }
  else
    b(null);
};
GitHubFile.prototype.isConflict = function(b) {
  return null != b && 409 == b.status;
};
GitHubFile.prototype.getMode = function() {
  return App.MODE_GITHUB;
};
GitHubFile.prototype.isAutosave = function() {
  return !1;
};
GitHubFile.prototype.getTitle = function() {
  return this.meta.name;
};
GitHubFile.prototype.isRenamable = function() {
  return !1;
};
GitHubFile.prototype.getLatestVersion = function(b, e) {
  this.peer.getFile(this.getId(), b, e);
};
GitHubFile.prototype.isCompressedStorage = function() {
  return !1;
};
GitHubFile.prototype.getDescriptor = function() {
  return this.meta;
};
GitHubFile.prototype.setDescriptor = function(b) {
  this.meta = b;
};
GitHubFile.prototype.getDescriptorEtag = function(b) {
  return b.sha;
};
GitHubFile.prototype.setDescriptorEtag = function(b, e) {
  b.sha = e;
};
GitHubFile.prototype.save = function(b, e, f, c, k, m) {
  this.doSave(this.getTitle(), e, f, c, k, m);
};
GitHubFile.prototype.saveAs = function(b, e, f) {
  this.doSave(b, e, f);
};
GitHubFile.prototype.doSave = function(b, e, f, c, k, m) {
  var t = this.meta.name;
  this.meta.name = b;
  DrawioFile.prototype.save.apply(this, [
    null,
    mxUtils.bind(this, function() {
      this.meta.name = t;
      this.saveFile(b, !1, e, f, c, k, m);
    }),
    f,
    c,
    k
  ]);
};
GitHubFile.prototype.saveFile = function(b, e, f, c, k, m, t) {
  if (this.isEditable())
    if (this.savingFile)
      null != c && c({
        code: App.ERROR_BUSY
      });
    else {
      var y = mxUtils.bind(this, function(E) {
        if (this.getTitle() == b)
          try {
            this.savingFileTime = new Date();
            this.setShadowModified(!1);
            this.savingFile = !0;
            var z = this.getCurrentEtag(),
              D = this.data;
            this.peer.saveFile(this, mxUtils.bind(this, function(J) {
              this.setModified(this.getShadowModified());
              this.savingFile = !1;
              this.setDescriptorEtag(this.meta, J);
              this.fileSaved(D, z, mxUtils.bind(this, function() {
                this.contentChanged();
                null != f && f();
              }), c);
            }), mxUtils.bind(this, function(J) {
              this.savingFile = !1;
              this.isConflict(J) ? (this.inConflictState = !0, null != c && c({
                commitMessage: E
              })) : null != c && c(J);
            }), m, E);
          } catch (J) {
            if (this.savingFile = !1, null != c)
              c(J);
            else
              throw J;
          }
        else
          this.savingFileTime = new Date(), this.setShadowModified(!1), this.savingFile = !0, this.ui.pickFolder(this.getMode(), mxUtils.bind(this, function(J) {
            this.peer.insertFile(b, this.getData(), mxUtils.bind(this, function(G) {
              this.setModified(this.getShadowModified());
              this.savingFile = !1;
              null != f && f();
              this.ui.fileLoaded(G);
            }), mxUtils.bind(this, function() {
              this.savingFile = !1;
              null != c && c();
            }), !1, J, E);
          }));
      });
      null != t ? y(t) : this.peer.showCommitDialog(this.meta.name, null == this.getDescriptorEtag(this.meta) || this.meta.isNew, mxUtils.bind(this, function(E) {
        y(E);
      }), c);
    }
  else
    null != f && f();
};