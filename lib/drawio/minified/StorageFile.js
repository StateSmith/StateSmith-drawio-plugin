StorageFile = function(b, e, f) {
  DrawioFile.call(this, b, e);
  this.title = f;
};
mxUtils.extend(StorageFile, DrawioFile);
StorageFile.prototype.autosaveDelay = 2000;
StorageFile.prototype.maxAutosaveDelay = 20000;
StorageFile.prototype.type = 'F';
StorageFile.prototype.getMode = function() {
  return App.MODE_BROWSER;
};
StorageFile.prototype.isAutosaveOptional = function() {
  return !0;
};
StorageFile.prototype.getHash = function() {
  return 'L' + encodeURIComponent(this.getTitle());
};
StorageFile.prototype.getTitle = function() {
  return this.title;
};
StorageFile.prototype.isRenamable = function() {
  return !0;
};
StorageFile.prototype.save = function(b, e, f) {
  this.saveAs(this.getTitle(), e, f);
};
StorageFile.prototype.saveAs = function(b, e, f) {
  DrawioFile.prototype.save.apply(this, arguments);
  this.saveFile(b, !1, e, f);
};
StorageFile.insertFile = function(b, e, f, c, k) {
  var m = mxUtils.bind(this, function(t) {
    var y = function() {
      var E = new StorageFile(b, f, e);
      E.saveFile(e, !1, function() {
        c(E);
      }, k);
    };
    t ? b.confirm(mxResources.get('replaceIt', [e]), y, k) : y();
  });
  StorageFile.getFileContent(b, e, function(t) {
    m(null != t);
  }, function() {
    m(!1);
  });
};
StorageFile.getFileContent = function(b, e, f, c) {
  b.getDatabaseItem(e, function(k) {
    f(null != k ? k.data : null);
  }, mxUtils.bind(this, function() {
    null == b.database ? b.getLocalData(e, f) : null != c && c();
  }), 'files');
};
StorageFile.getFileInfo = function(b, e, f, c) {
  b.getDatabaseItem(e, function(k) {
    f(k);
  }, mxUtils.bind(this, function() {
    null == b.database ? b.getLocalData(e, function(k) {
      f(null != k ? {
        title: e
      } : null);
    }) : null != c && c();
  }), 'filesInfo');
};
StorageFile.prototype.saveFile = function(b, e, f, c) {
  if (this.isEditable()) {
    var k = mxUtils.bind(this, function() {
      this.isRenamable() && (this.title = b);
      try {
        var m = mxUtils.bind(this, function() {
          this.setModified(this.getShadowModified());
          this.contentChanged();
          null != f && f();
        });
        this.setShadowModified(!1);
        var t = this.getData();
        this.ui.setDatabaseItem(null, [{
            title: this.title,
            size: t.length,
            lastModified: Date.now(),
            type: this.type
          },
          {
            title: this.title,
            data: t
          }
        ], m, mxUtils.bind(this, function() {
          null == this.ui.database ? this.ui.setLocalData(this.title, t, m) : null != c && c();
        }), [
          'filesInfo',
          'files'
        ]);
      } catch (y) {
        null != c && c(y);
      }
    });
    this.isRenamable() && '.' == b.charAt(0) && null != c ? c({
      message: mxResources.get('invalidName')
    }) : StorageFile.getFileInfo(this.ui, b, mxUtils.bind(this, function(m) {
      this.isRenamable() && this.getTitle() != b && null != m ? this.ui.confirm(mxResources.get('replaceIt', [b]), k, c) : k();
    }), c);
  } else
    null != f && f();
};
StorageFile.prototype.rename = function(b, e, f) {
  var c = this.getTitle();
  c != b ? StorageFile.getFileInfo(this.ui, b, mxUtils.bind(this, function(k) {
    var m = mxUtils.bind(this, function() {
      this.title = b;
      this.hasSameExtension(c, b) || this.setData(this.ui.getFileData());
      this.saveFile(b, !1, mxUtils.bind(this, function() {
        this.ui.removeLocalData(c, e);
      }), f);
    });
    null != k ? this.ui.confirm(mxResources.get('replaceIt', [b]), m, f) : m();
  }), f) : e();
};
StorageFile.prototype.open = function() {
  DrawioFile.prototype.open.apply(this, arguments);
  this.saveFile(this.getTitle());
};
StorageFile.prototype.getLatestVersion = function(b, e) {
  StorageFile.getFileContent(this.ui, this.title, mxUtils.bind(this, function(f) {
    b(new StorageFile(this.ui, f, this.title));
  }), e);
};
StorageFile.prototype.destroy = function() {
  DrawioFile.prototype.destroy.apply(this, arguments);
  null != this.storageListener && (mxEvent.removeListener(window, 'storage', this.storageListener), this.storageListener = null);
};
StorageFile.listLocalStorageFiles = function(b) {
  for (var e = [], f = 0; f < localStorage.length; f++) {
    var c = localStorage.key(f),
      k = localStorage.getItem(c);
    if (0 < c.length && '.' != c.charAt(0) && 0 < k.length) {
      var m = (null == b || 'F' == b) && ('<mxfile ' === k.substring(0, 8) || '<?xml' === k.substring(0, 5) || '<!--[if IE]>' === k.substring(0, 12)),
        t = (null == b || 'L' == b) && '<mxlibrary>' === k.substring(0, 11);
      (m || t) && e.push({
        title: c,
        type: m ? 'F' : 'L',
        size: k.length,
        lastModified: Date.now()
      });
    }
  }
  return e;
};
StorageFile.migrate = function(b) {
  var e = StorageFile.listLocalStorageFiles();
  e.push({
    title: '.scratchpad',
    type: 'L'
  });
  var f = b.transaction([
    'files',
    'filesInfo'
  ], 'readwrite');
  b = f.objectStore('files');
  f = f.objectStore('filesInfo');
  for (var c = 0; c < e.length; c++) {
    var k = e[c],
      m = localStorage.getItem(k.title);
    b.add({
      title: k.title,
      data: m
    });
    f.add(k);
  }
};
StorageFile.listFiles = function(b, e, f, c) {
  b.getDatabaseItems(function(k) {
    var m = [];
    if (null != k)
      for (var t = 0; t < k.length; t++)
        '.' == k[t].title.charAt(0) || null != e && k[t].type != e || m.push(k[t]);
    f(m);
  }, function() {
    null == b.database ? f(StorageFile.listLocalStorageFiles(e)) : null != c && c();
  }, 'filesInfo');
};
StorageFile.deleteFile = function(b, e, f, c) {
  b.removeDatabaseItem([
    e,
    e
  ], f, function() {
    null == b.database ? (localStorage.removeItem(e), f()) : null != c && c();
  }, [
    'files',
    'filesInfo'
  ]);
};