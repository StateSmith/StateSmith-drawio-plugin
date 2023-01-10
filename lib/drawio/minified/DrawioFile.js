DrawioFile = function(b, e) {
  mxEventSource.call(this);
  this.ui = b;
  this.setData(e || '');
  this.initialData = this.getData();
  this.created = new Date().getTime();
  this.stats = {
    opened: 0,
    merged: 0,
    fileMerged: 0,
    fileReloaded: 0,
    conflicts: 0,
    timeouts: 0,
    saved: 0,
    closed: 0,
    destroyed: 0,
    joined: 0,
    checksumErrors: 0,
    bytesSent: 0,
    bytesReceived: 0,
    msgSent: 0,
    msgReceived: 0,
    cacheHits: 0,
    cacheMiss: 0,
    cacheFail: 0
  };
};
DrawioFile.SYNC = urlParams.sync || 'auto';
DrawioFile.LAST_WRITE_WINS = !0;
mxUtils.extend(DrawioFile, mxEventSource);
DrawioFile.prototype.allChangesSavedKey = 'allChangesSaved';
DrawioFile.prototype.savingSpinnerKey = 'saving';
DrawioFile.prototype.savingStatusKey = 'saving';
DrawioFile.prototype.autosaveDelay = 1500;
DrawioFile.prototype.maxAutosaveDelay = 30000;
DrawioFile.prototype.optimisticSyncDelay = 300;
DrawioFile.prototype.autosaveThread = null;
DrawioFile.prototype.lastAutosave = null;
DrawioFile.prototype.lastSaved = null;
DrawioFile.prototype.lastChanged = null;
DrawioFile.prototype.opened = null;
DrawioFile.prototype.modified = !1;
DrawioFile.prototype.shadowModified = !1;
DrawioFile.prototype.data = null;
DrawioFile.prototype.shadowPages = null;
DrawioFile.prototype.changeListenerEnabled = !0;
DrawioFile.prototype.lastAutosaveRevision = null;
DrawioFile.prototype.maxAutosaveRevisionDelay = 300000;
DrawioFile.prototype.inConflictState = !1;
DrawioFile.prototype.invalidChecksum = !1;
DrawioFile.prototype.errorReportsEnabled = !1;
DrawioFile.prototype.ageStart = null;
DrawioFile.prototype.getSize = function() {
  return null != this.data ? this.data.length : 0;
};
DrawioFile.prototype.getShadowPages = function() {
  null == this.shadowPages && (this.shadowPages = this.ui.getPagesForXml(this.initialData));
  return this.shadowPages;
};
DrawioFile.prototype.setShadowPages = function(b) {
  this.shadowPages = b;
};
DrawioFile.prototype.synchronizeFile = function(b, e) {
  this.savingFile ? null != e && e({
    message: mxResources.get('busy')
  }) : null != this.sync ? this.sync.fileChanged(mxUtils.bind(this, function(f) {
    this.sync.cleanup(b, e, f);
  }), e) : this.updateFile(b, e);
};
DrawioFile.prototype.updateFile = function(b, e, f, c) {
  null != f && f() || (EditorUi.debug('DrawioFile.updateFile', [this], 'invalidChecksum', this.invalidChecksum), this.ui.getCurrentFile() != this || this.invalidChecksum ? null != e && e() : this.getLatestVersion(mxUtils.bind(this, function(k) {
    try {
      null != f && f() || (EditorUi.debug('DrawioFile.updateFile', [this], 'invalidChecksum', this.invalidChecksum, 'latestFile', [k]), this.ui.getCurrentFile() != this || this.invalidChecksum ? null != e && e() : null != k ? this.mergeFile(k, b, e, c) : this.reloadFile(b, e));
    } catch (m) {
      null != e && e(m);
    }
  }), e));
};
DrawioFile.prototype.mergeFile = function(b, e, f, c) {
  var k = !0;
  try {
    this.stats.fileMerged++;
    var m = this.getShadowPages(),
      t = b.getShadowPages();
    if (null != t && 0 < t.length) {
      var y = [this.ui.diffPages(null != c ? c : m, t)],
        E = this.ignorePatches(y);
      this.setShadowPages(t);
      if (E)
        EditorUi.debug('File.mergeFile', [this], 'file', [b], 'ignored', E);
      else {
        null != this.sync && this.sync.sendLocalChanges();
        this.backupPatch = this.isModified() ? this.ui.diffPages(m, this.ui.pages) : null;
        c = {};
        E = {};
        var z = this.ui.patchPages(m, y[0]),
          D = this.ui.getHashValueForPages(z, c),
          J = this.ui.getHashValueForPages(t, E);
        EditorUi.debug('File.mergeFile', [this], 'file', [b], 'shadow', m, 'pages', this.ui.pages, 'patches', y, 'backup', this.backupPatch, 'checksum', D, 'current', J, 'valid', D == J, 'from', this.getCurrentRevisionId(), 'to', b.getCurrentRevisionId(), 'modified', this.isModified());
        if (null != D && D != J) {
          var G = this.compressReportData(this.getAnonymizedXmlForPages(t)),
            d = this.compressReportData(this.getAnonymizedXmlForPages(z)),
            g = this.ui.hashValue(b.getCurrentEtag()),
            n = this.ui.hashValue(this.getCurrentEtag());
          this.checksumError(f, y, 'Shadow Details: ' + JSON.stringify(c) + '\nChecksum: ' + D + '\nCurrent: ' + J + '\nCurrent Details: ' + JSON.stringify(E) + '\nFrom: ' + g + '\nTo: ' + n + '\n\nFile Data:\n' + G + '\nPatched Shadow:\n' + d, null, 'mergeFile', D, J, b.getCurrentRevisionId());
          return;
        }
        if (null != this.sync) {
          var v = this.sync.patchRealtime(y, DrawioFile.LAST_WRITE_WINS ? this.backupPatch : null);
          null == v || mxUtils.isEmptyObject(v) || y.push(v);
        }
        this.patch(y, DrawioFile.LAST_WRITE_WINS ? this.backupPatch : null);
      }
    } else
      throw k = !1, Error(mxResources.get('notADiagramFile'));
    this.inConflictState = this.invalidChecksum = !1;
    this.setDescriptor(b.getDescriptor());
    this.descriptorChanged();
    this.backupPatch = null;
    null != e && e();
  } catch (C) {
    this.invalidChecksum = this.inConflictState = !0;
    this.descriptorChanged();
    null != f && f(C);
    try {
      if (k)
        if (this.errorReportsEnabled)
          this.sendErrorReport('Error in mergeFile', null, C);
        else {
          var u = this.getCurrentUser(),
            x = null != u ? u.id : 'unknown';
          EditorUi.logError('Error in mergeFile', null, this.getMode() + '.' + this.getId(), x, C);
        }
    } catch (F) {}
  }
};
DrawioFile.prototype.getAnonymizedXmlForPages = function(b) {
  var e = new mxCodec(mxUtils.createXmlDocument()),
    f = e.document.createElement('mxfile');
  if (null != b)
    for (var c = 0; c < b.length; c++) {
      var k = e.encode(new mxGraphModel(b[c].root));
      '1' != urlParams.dev && (k = this.ui.anonymizeNode(k, !0));
      k.setAttribute('id', b[c].getId());
      b[c].viewState && this.ui.editor.graph.saveViewState(b[c].viewState, k, !0);
      f.appendChild(k);
    }
  return mxUtils.getPrettyXml(f);
};
DrawioFile.prototype.compressReportData = function(b, e, f) {
  e = null != e ? e : 10000;
  null != f && null != b && b.length > f ? b = b.substring(0, f) + '[...]' : null != b && b.length > e && (b = Graph.compress(b) + '\n');
  return b;
};
DrawioFile.prototype.checksumError = function(b, e, f, c, k, m, t, y) {
  this.stats.checksumErrors++;
  this.invalidChecksum = this.inConflictState = !0;
  this.descriptorChanged();
  null != this.sync && this.sync.updateOnlineState();
  null != b && b();
  try {
    if (this.errorReportsEnabled) {
      if (null != e)
        for (var E = 0; E < e.length; E++)
          this.ui.anonymizePatch(e[E]);
      var z = mxUtils.bind(this, function(n) {
        var v = this.compressReportData(JSON.stringify(e, null, 2));
        n = null == n ? 'n/a' : this.compressReportData(this.getAnonymizedXmlForPages(this.ui.getPagesForXml(n.data)), 25000);
        this.sendErrorReport('Checksum Error in ' + k + ' ' + this.getHash(), (null != f ? f : '') + '\n\nPatches:\n' + v + (null != n ? '\n\nRemote:\n' + n : ''), null, 70000);
      });
      null == c ? z(null) : this.getLatestVersion(mxUtils.bind(this, function(n) {
        null != n && n.getCurrentEtag() == c ? z(n) : z(null);
      }), function() {});
    } else {
      var D = this.getCurrentUser(),
        J = null != D ? D.id : 'unknown',
        G = '' != this.getId() ? this.getId() : '(' + this.ui.hashValue(this.getTitle()) + ')',
        d = JSON.stringify(e).length,
        g = null;
      if (null != e && this.constructor == DriveFile && 400 > d) {
        for (E = 0; E < e.length; E++)
          this.ui.anonymizePatch(e[E]);
        g = JSON.stringify(e);
        g = null != g && 250 > g.length ? Graph.compress(g) : null;
      }
      this.getLatestVersion(mxUtils.bind(this, function(n) {
        try {
          var v = null != g ? 'Report' : 'Error',
            u = this.ui.getHashValueForPages(n.getShadowPages());
          EditorUi.logError('Checksum ' + v + ' in ' + k + ' ' + G, null, this.getMode() + '.' + this.getId(), 'user_' + J + (null != this.sync ? '-client_' + this.sync.clientId : '-nosync') + '-bytes_' + d + '-patches_' + e.length + (null != g ? '-json_' + g : '') + '-size_' + this.getSize() + (null != m ? '-expected_' + m : '') + (null != t ? '-current_' + t : '') + (null != y ? '-rev_' + this.ui.hashValue(y) : '') + (null != u ? '-latest_' + u : '') + (null != n ? '-latestRev_' + this.ui.hashValue(n.getCurrentRevisionId()) : ''));
          EditorUi.logEvent({
            category: 'CHECKSUM-ERROR-SYNC-FILE-' + G,
            action: k,
            label: 'user_' + J + (null != this.sync ? '-client_' + this.sync.clientId : '-nosync') + '-bytes_' + d + '-patches_' + e.length + '-size_' + this.getSize()
          });
        } catch (x) {}
      }), b);
    }
  } catch (n) {}
};
DrawioFile.prototype.sendErrorReport = function(b, e, f, c) {
  try {
    var k = this.compressReportData(this.getAnonymizedXmlForPages(this.getShadowPages()), 25000),
      m = this.compressReportData(this.getAnonymizedXmlForPages(this.ui.pages), 25000),
      t = this.getCurrentUser(),
      y = null != t ? this.ui.hashValue(t.id) : 'unknown',
      E = null != this.sync ? '-client_' + this.sync.clientId : '-nosync',
      z = this.getTitle(),
      D = z.lastIndexOf('.');
    t = 'xml';
    0 < D && (t = z.substring(D));
    var J = null != f ? f.stack : Error().stack;
    EditorUi.sendReport(b + ' ' + new Date().toISOString() + ':\n\nAppVersion=' + navigator.appVersion + '\nFile=' + this.ui.hashValue(this.getId()) + ' (' + this.getMode() + ')' + (this.isModified() ? ' modified' : '') + '\nSize/Type=' + this.getSize() + ' (' + t + ')\nUser=' + y + E + '\nPrefix=' + this.ui.editor.graph.model.prefix + '\nSync=' + DrawioFile.SYNC + (null != this.sync ? (this.sync.enabled ? ' enabled' : '') + (this.sync.isConnected() ? ' connected' : '') : '') + '\nPlugins=' + (null != mxSettings.settings ? mxSettings.getPlugins() : 'null') + '\n\nStats:\n' + JSON.stringify(this.stats, null, 2) + (null != e ? '\n\n' + e : '') + (null != f ? '\n\nError: ' + f.message : '') + '\n\nStack:\n' + J + '\n\nShadow:\n' + k + '\n\nData:\n' + m, c);
  } catch (G) {}
};
DrawioFile.prototype.reloadFile = function(b, e) {
  try {
    this.ui.spinner.stop();
    var f = mxUtils.bind(this, function() {
      EditorUi.debug('DrawioFile.reloadFile', [this], 'hash', this.getHash(), 'modified', this.isModified(), 'backupPatch', this.backupPatch);
      this.stats.fileReloaded++;
      if ('' == this.getHash())
        this.mergeLatestVersion(null != this.backupPatch ? [this.backupPatch] : null, mxUtils.bind(this, function() {
          this.backupPatch = null;
          null != b && b();
        }), e);
      else {
        var c = this.ui.editor.graph,
          k = c.getSelectionCells(),
          m = c.getViewState(),
          t = this.ui.currentPage;
        this.ui.loadFile(this.getHash(), !0, null, mxUtils.bind(this, function() {
          if (null == this.ui.fileLoadedError) {
            this.ui.restoreViewState(t, m, k);
            null != this.backupPatch && this.patch([this.backupPatch]);
            var y = this.ui.getCurrentFile();
            null != y && (y.stats = this.stats);
            null != b && b();
          }
        }), !0);
      }
    });
    this.isModified() && null == this.backupPatch ? this.ui.confirm(mxResources.get('allChangesLost'), mxUtils.bind(this, function() {
      this.handleFileSuccess('manual' == DrawioFile.SYNC);
    }), f, mxResources.get('cancel'), mxResources.get('discardChanges')) : f();
  } catch (c) {
    null != e && e(c);
  }
};
DrawioFile.prototype.mergeLatestVersion = function(b, e, f) {
  this.getLatestVersion(mxUtils.bind(this, function(c) {
    this.ui.editor.graph.model.beginUpdate();
    try {
      this.ui.replaceFileData(c.getData()), null != b && this.patch(b);
    } finally {
      this.ui.editor.graph.model.endUpdate();
    }
    this.inConflictState = this.invalidChecksum = !1;
    this.setDescriptor(c.getDescriptor());
    this.descriptorChanged();
    null != e && e();
  }), f);
};
DrawioFile.prototype.copyFile = function(b, e) {
  this.ui.editor.editAsNew(this.ui.getFileData(!0), this.ui.getCopyFilename(this));
};
DrawioFile.prototype.ignorePatches = function(b) {
  var e = !0;
  if (null != b)
    for (var f = 0; f < b.length && e; f++)
      e = e && mxUtils.isEmptyObject(b[f]);
  return e;
};
DrawioFile.prototype.patch = function(b, e, f, c) {
  if (null != b) {
    var k = this.ui.editor.undoManager,
      m = k.history.slice(),
      t = k.indexOfNextAdd,
      y = this.ui.editor.graph;
    y.container.style.visibility = 'hidden';
    var E = this.changeListenerEnabled;
    this.changeListenerEnabled = f;
    var z = y.foldingEnabled,
      D = y.mathEnabled,
      J = y.cellRenderer.redraw;
    y.cellRenderer.redraw = function(G) {
      G.view.graph.isEditing(G.cell) && (G.view.graph.scrollCellToVisible(G.cell), G.view.graph.cellEditor.resize());
      J.apply(this, arguments);
    };
    y.model.beginUpdate();
    try {
      this.ui.pages = this.ui.applyPatches(this.ui.pages, b, !0, e, this.isModified()), 0 == this.ui.pages.length && this.ui.pages.push(this.ui.createPage()), 0 > mxUtils.indexOf(this.ui.pages, this.ui.currentPage) && this.ui.selectPage(this.ui.pages[0], !0);
    } finally {
      y.container.style.visibility = '';
      y.model.endUpdate();
      y.cellRenderer.redraw = J;
      this.changeListenerEnabled = E;
      f || (k.history = m, k.indexOfNextAdd = t, k.fireEvent(new mxEventObject(mxEvent.CLEAR)));
      if (null == this.ui.currentPage || this.ui.currentPage.needsUpdate)
        D != y.mathEnabled ? (this.ui.editor.updateGraphComponents(), y.refresh()) : (z != y.foldingEnabled ? y.view.revalidate() : y.view.validate(), y.sizeDidChange());
      null != this.sync && this.isRealtime() && !c && (this.sync.snapshot = this.ui.clonePages(this.ui.pages));
      this.ui.editor.fireEvent(new mxEventObject('pagesPatched', 'patches', b));
    }
    EditorUi.debug('DrawioFile.patch', [this], 'patches', b, 'resolver', e, 'undoable', f);
  }
  return b;
};
DrawioFile.prototype.save = function(b, e, f, c, k, m) {
  try {
    if (EditorUi.debug('DrawioFile.save', [this], 'revision', b, 'unloading', c, 'overwrite', k, 'manual', m, 'saving', this.savingFile, 'editable', this.isEditable(), 'invalidChecksum', this.invalidChecksum), this.isEditable())
      if (!k && this.invalidChecksum)
        if (null != f)
          f({
            message: mxResources.get('checksum')
          });
        else
          throw Error(mxResources.get('checksum'));
    else
      this.updateFileData(), this.clearAutosave(), null != e && e();
    else if (null != f)
      f({
        message: mxResources.get('readOnly')
      });
    else
      throw Error(mxResources.get('readOnly'));
  } catch (t) {
    if (null != f)
      f(t);
    else
      throw t;
  }
};
DrawioFile.prototype.createData = function() {
  var b = this.ui.pages;
  if (this.isRealtime() && (this.ui.pages = this.ownPages, null != this.ui.currentPage)) {
    var e = this.ui.getPageById(this.ui.currentPage.getId(), this.ownPages);
    null != e && (e.viewState = this.ui.editor.graph.getViewState(), e.needsUpdate = !0);
  }
  e = this.ui.getFileData(null, null, null, null, null, null, null, null, this, !this.isCompressed());
  this.ui.pages = b;
  return e;
};
DrawioFile.prototype.updateFileData = function() {
  null != this.sync && this.sync.sendLocalChanges();
  this.setData(this.createData());
  null != this.sync && this.sync.fileDataUpdated();
};
DrawioFile.prototype.isCompressedStorage = function() {
  return !0;
};
DrawioFile.prototype.isCompressed = function() {
  var b = null != this.ui.fileNode ? this.ui.fileNode.getAttribute('compressed') : null;
  return null != b ? 'false' != b : this.isCompressedStorage() && Editor.compressXml;
};
DrawioFile.prototype.saveAs = function(b, e, f) {};
DrawioFile.prototype.saveFile = function(b, e, f, c) {};
DrawioFile.prototype.getFileUrl = function() {
  return null;
};
DrawioFile.prototype.getFolderUrl = function(b) {
  return null;
};
DrawioFile.prototype.getPublicUrl = function(b) {
  b(null);
};
DrawioFile.prototype.isRestricted = function() {
  return !1;
};
DrawioFile.prototype.isModified = function() {
  return this.modified;
};
DrawioFile.prototype.getShadowModified = function() {
  return this.shadowModified;
};
DrawioFile.prototype.setShadowModified = function(b) {
  this.shadowModified = b;
};
DrawioFile.prototype.setModified = function(b) {
  this.shadowModified = this.modified = b;
};
DrawioFile.prototype.isAutosaveOptional = function() {
  return !1;
};
DrawioFile.prototype.isAutosave = function() {
  return !this.inConflictState && this.ui.editor.autosave;
};
DrawioFile.prototype.isRenamable = function() {
  return !1;
};
DrawioFile.prototype.rename = function(b, e, f) {};
DrawioFile.prototype.isMovable = function() {
  return !1;
};
DrawioFile.prototype.isTrashed = function() {
  return !1;
};
DrawioFile.prototype.move = function(b, e, f) {};
DrawioFile.prototype.share = function() {
  this.ui.alert(mxResources.get('sharingAvailable'), null, 380);
};
DrawioFile.prototype.getHash = function() {
  return '';
};
DrawioFile.prototype.getId = function() {
  return '';
};
DrawioFile.prototype.isEditable = function() {
  return !this.ui.editor.isChromelessView() || this.ui.editor.editable;
};
DrawioFile.prototype.getUi = function() {
  return this.ui;
};
DrawioFile.prototype.getTitle = function() {
  return '';
};
DrawioFile.prototype.setData = function(b) {
  this.data = b;
  EditorUi.debug('DrawioFile.setData', [this], 'data', [b]);
};
DrawioFile.prototype.getData = function() {
  return this.data;
};
DrawioFile.prototype.open = function() {
  this.stats.opened++;
  var b = this.getData();
  if (null != b) {
    var e = function(f) {
      for (var c = 0; null != f && c < f.length; c++) {
        var k = f[c];
        null != k.id && 0 == k.id.indexOf('extFont_') && k.parentNode.removeChild(k);
      }
    };
    e(document.querySelectorAll('head > style[id]'));
    e(document.querySelectorAll('head > link[id]'));
    this.ui.setFileData(b);
    this.isModified() || this.setShadowPages(this.ui.clonePages(this.ui.pages));
  }
  this.installListeners();
  this.isSyncSupported() && this.startSync();
};
DrawioFile.prototype.isSyncSupported = function() {
  return !1;
};
DrawioFile.prototype.isRealtime = function() {
  return null != this.ownPages;
};
DrawioFile.prototype.isRealtimeSupported = function() {
  return !1;
};
DrawioFile.prototype.isRealtimeEnabled = function() {
  return Editor.enableRealtime && '0' != urlParams['fast-sync'];
};
DrawioFile.prototype.setRealtimeEnabled = function() {};
DrawioFile.prototype.isRealtimeOptional = function() {
  return !1;
};
DrawioFile.prototype.getRealtimeState = function() {
  return null != this.sync && null != this.sync.p2pCollab ? this.sync.p2pCollab.getState() : 3;
};
DrawioFile.prototype.getRealtimeError = function() {
  return null != this.sync && null != this.sync.p2pCollab ? this.sync.p2pCollab.getLastError() : null;
};
DrawioFile.prototype.isOptimisticSync = function() {
  return !1;
};
DrawioFile.prototype.isRevisionHistorySupported = function() {
  return !1;
};
DrawioFile.prototype.getRevisions = function(b, e) {
  b(null);
};
DrawioFile.prototype.loadDescriptor = function(b, e) {
  b(null);
};
DrawioFile.prototype.loadPatchDescriptor = function(b, e) {
  this.loadDescriptor(mxUtils.bind(this, function(f) {
    b(f);
  }), e);
};
DrawioFile.prototype.patchDescriptor = function(b, e) {
  this.setDescriptorEtag(b, this.getDescriptorEtag(e));
  this.descriptorChanged();
};
DrawioFile.prototype.startSync = function() {
  'auto' != DrawioFile.SYNC && 'fast' != DrawioFile.SYNC || '1' == urlParams.stealth || '1' != urlParams.rt && this.ui.editor.chromeless && !this.ui.editor.editable || (null == this.sync && (this.sync = new DrawioFileSync(this)), this.addListener('realtimeStateChanged', mxUtils.bind(this, function() {
    this.ui.fireEvent(new mxEventObject('realtimeStateChanged'));
  })), this.sync.start());
};
DrawioFile.prototype.isConflict = function() {
  return !1;
};
DrawioFile.prototype.getChannelId = function() {
  return Graph.compress(this.getHash()).replace(/[\/ +]/g, '_');
};
DrawioFile.prototype.getChannelKey = function(b) {
  return null;
};
DrawioFile.prototype.getCurrentUser = function() {
  return null;
};
DrawioFile.prototype.getLatestVersion = function(b, e) {
  b(null);
};
DrawioFile.prototype.getLatestVersionId = function(b, e) {
  b(-1);
};
DrawioFile.prototype.getLastModifiedDate = function() {
  return new Date();
};
DrawioFile.prototype.setCurrentRevisionId = function(b) {
  this.setDescriptorRevisionId(this.getDescriptor(), b);
};
DrawioFile.prototype.getCurrentRevisionId = function() {
  return this.getDescriptorRevisionId(this.getDescriptor());
};
DrawioFile.prototype.getPullingInterval = function() {
  return 10000;
};
DrawioFile.prototype.setCurrentEtag = function(b) {
  this.setDescriptorEtag(this.getDescriptor(), b);
};
DrawioFile.prototype.getCurrentEtag = function() {
  return this.getDescriptorEtag(this.getDescriptor());
};
DrawioFile.prototype.getDescriptor = function() {
  return null;
};
DrawioFile.prototype.setDescriptor = function() {};
DrawioFile.prototype.setDescriptorRevisionId = function(b, e) {
  this.setDescriptorEtag(b, e);
};
DrawioFile.prototype.getDescriptorRevisionId = function(b) {
  return this.getDescriptorEtag(b);
};
DrawioFile.prototype.setDescriptorEtag = function(b, e) {};
DrawioFile.prototype.getDescriptorEtag = function(b) {
  return null;
};
DrawioFile.prototype.getDescriptorSecret = function(b) {
  return null;
};
DrawioFile.prototype.installListeners = function() {
  null == this.changeListener && (this.changeListener = mxUtils.bind(this, function(b, e) {
    b = null != e ? e.getProperty('edit') : null;
    !this.changeListenerEnabled || !this.isEditable() || null != b && b.ignoreEdit || this.fileChanged();
  }), this.ui.editor.graph.model.addListener(mxEvent.CHANGE, this.changeListener), this.ui.editor.graph.addListener('gridSizeChanged', this.changeListener), this.ui.editor.graph.addListener('shadowVisibleChanged', this.changeListener), this.ui.addListener('pageFormatChanged', this.changeListener), this.ui.addListener('pageScaleChanged', this.changeListener), this.ui.addListener('backgroundColorChanged', this.changeListener), this.ui.addListener('backgroundImageChanged', this.changeListener), this.ui.addListener('foldingEnabledChanged', this.changeListener), this.ui.addListener('mathEnabledChanged', this.changeListener), this.ui.addListener('gridEnabledChanged', this.changeListener), this.ui.addListener('guidesEnabledChanged', this.changeListener), this.ui.addListener('tooltipsEnabledChanged', this.changeListener), this.ui.addListener('pageViewChanged', this.changeListener), this.ui.addListener('connectionPointsChanged', this.changeListener), this.ui.addListener('connectionArrowsChanged', this.changeListener));
};
DrawioFile.prototype.addAllSavedStatus = function(b) {
  if (null != this.ui.statusContainer && this.ui.getCurrentFile() == this) {
    b = null != b ? b : mxUtils.htmlEntities(mxResources.get(this.allChangesSavedKey));
    var e = this.isRevisionHistorySupported() && b != mxUtils.htmlEntities(mxResources.get(this.savingStatusKey)) + '...' ? 'data-action="revisionHistory" ' : '';
    this.ui.editor.setStatus('<div ' + e + 'title="' + b + '">' + b + '</div>');
  }
};
DrawioFile.prototype.saveDraft = function() {
  try {
    null == this.draftId && (this.draftId = null != this.usedDraftId ? this.usedDraftId : Editor.guid());
    var b = {
      type: 'draft',
      created: this.created,
      modified: new Date().getTime(),
      data: this.ui.getFileData(),
      title: this.getTitle(),
      fileObject: this.fileObject,
      aliveCheck: this.ui.draftAliveCheck
    };
    this.ui.setDatabaseItem('.draft_' + this.draftId, JSON.stringify(b));
    EditorUi.debug('DrawioFile.saveDraft', [this], 'draftId', this.draftId, [b]);
  } catch (e) {
    this.removeDraft();
  }
};
DrawioFile.prototype.removeDraft = function() {
  try {
    null != this.draftId && (EditorUi.debug('DrawioFile.removeDraft', [this], 'draftId', this.draftId), this.ui.removeDatabaseItem('.draft_' + this.draftId), this.usedDraftId = this.draftId, this.draftId = null);
  } catch (b) {}
};
DrawioFile.prototype.addUnsavedStatus = function(b) {
  if (!this.inConflictState && null != this.ui.statusContainer && this.ui.getCurrentFile() == this)
    if (b instanceof Error && null != b.message && '' != b.message) {
      var e = mxUtils.htmlEntities(mxResources.get('unsavedChanges'));
      this.ui.editor.setStatus('<div title="' + e + '" data-title="' + mxUtils.htmlEntities(mxResources.get('unsavedChanges')) + '" data-message="' + mxUtils.htmlEntities(b.message) + '" class="geStatusAlert">' + e + ' (' + mxUtils.htmlEntities(b.message) + ')</div>');
    } else
      e = this.getErrorMessage(b), null == e && null != this.lastSaved && (b = this.ui.timeSince(new Date(this.lastSaved)), null != b && (e = mxResources.get('lastSaved', [b]))), null != e && 60 < e.length && (e = e.substring(0, 60) + '...'), e = mxUtils.htmlEntities(mxResources.get('unsavedChangesClickHereToSave')) + (null != e && '' != e ? ' (' + mxUtils.htmlEntities(e) + ')' : ''), b = 'data-action="' + (null != this.ui.mode && this.isEditable() ? 'save' : 'saveAs') + '"', this.ui.editor.setStatus('<div ' + b + ' title="' + e + '" class="geStatusAlert">' + e + ' <img class="geAdaptiveAsset" src="' + Editor.saveImage + '"/></div>'), EditorUi.enableDrafts && (null == this.getMode() || EditorUi.isElectronApp) && (this.lastDraftSave = this.lastDraftSave || Date.now(), null != this.saveDraftThread && (window.clearTimeout(this.saveDraftThread), this.saveDraftThread = null, Date.now() - this.lastDraftSave > Math.max(2 * EditorUi.draftSaveDelay, 30000) && (this.lastDraftSave = Date.now(), this.saveDraft())), this.saveDraftThread = window.setTimeout(mxUtils.bind(this, function() {
        this.lastDraftSave = Date.now();
        this.saveDraftThread = null;
        this.saveDraft();
      }), EditorUi.draftSaveDelay || 0));
};
DrawioFile.prototype.addConflictStatus = function(b, e) {
  this.invalidChecksum && null == b && (b = mxResources.get('checksum'));
  this.setConflictStatus(mxUtils.htmlEntities(mxResources.get('fileChangedSync')) + (null != b && '' != b ? ' (' + mxUtils.htmlEntities(b) + ')' : ''), e);
  this.ui.spinner.stop();
  this.clearAutosave();
};
DrawioFile.prototype.setConflictStatus = function(b, e) {
  this.ui.editor.setStatus('<div title="' + b + '" ' + (null != e ? 'data-action="statusFunction"' : '') + ' class="geStatusAlert">' + b + '<img data-link="https://www.diagrams.net/doc/faq/synchronize" src="' + Editor.helpImage + '" style="cursor:help;"/></div>', e);
};
DrawioFile.prototype.showRefreshDialog = function(b, e, f) {
  null == f && (f = mxResources.get('checksum'));
  this.ui.editor.isChromelessView() && !this.ui.editor.editable ? this.ui.alert(mxResources.get('fileChangedSync'), mxUtils.bind(this, function() {
    this.reloadFile(b, e);
  })) : (this.addConflictStatus(f, mxUtils.bind(this, function() {
    this.showRefreshDialog(b, e);
  })), this.ui.showError(mxResources.get('warning') + ' (' + f + ')', mxResources.get('fileChangedSyncDialog'), mxResources.get('makeCopy'), mxUtils.bind(this, function() {
    this.copyFile(b, e);
  }), null, mxResources.get('merge'), mxUtils.bind(this, function() {
    this.reloadFile(b, e);
  }), mxResources.get('cancel'), mxUtils.bind(this, function() {
    this.ui.hideDialog();
  }), 380, 130));
};
DrawioFile.prototype.showCopyDialog = function(b, e, f) {
  this.invalidChecksum = this.inConflictState = !1;
  this.addUnsavedStatus();
  this.ui.showError(mxResources.get('externalChanges'), mxResources.get('fileChangedOverwriteDialog'), mxResources.get('makeCopy'), mxUtils.bind(this, function() {
    this.copyFile(b, e);
  }), null, mxResources.get('overwrite'), f, mxResources.get('cancel'), mxUtils.bind(this, function() {
    this.ui.hideDialog();
  }), 380, 150);
};
DrawioFile.prototype.showConflictDialog = function(b, e) {
  this.ui.showError(mxResources.get('externalChanges'), mxResources.get('fileChangedSyncDialog'), mxResources.get('overwrite'), b, null, mxResources.get('merge'), e, mxResources.get('cancel'), mxUtils.bind(this, function() {
    this.ui.hideDialog();
    this.handleFileError(null, !1);
  }), 380, 130);
};
DrawioFile.prototype.redirectToNewApp = function(b, e) {
  this.ui.spinner.stop();
  if (!this.redirectDialogShowing) {
    this.redirectDialogShowing = !0;
    var f = window.location.protocol + '//' + window.location.host + '/' + this.ui.getSearch('create title mode url drive splash state'.split(' ')) + '#' + this.getHash(),
      c = mxResources.get('redirectToNewApp');
    null != e && (c += ' (' + e + ')');
    e = mxUtils.bind(this, function() {
      var k = mxUtils.bind(this, function() {
        this.redirectDialogShowing = !1;
        window.location.href == f ? window.location.reload() : window.location.href = f;
      });
      null == b && this.isModified() ? this.ui.confirm(mxResources.get('allChangesLost'), mxUtils.bind(this, function() {
        this.redirectDialogShowing = !1;
      }), k, mxResources.get('cancel'), mxResources.get('discardChanges')) : k();
    });
    null != b ? this.isModified() ? this.ui.confirm(c, mxUtils.bind(this, function() {
      this.redirectDialogShowing = !1;
      b();
    }), e, mxResources.get('cancel'), mxResources.get('discardChanges')) : this.ui.confirm(c, e, mxUtils.bind(this, function() {
      this.redirectDialogShowing = !1;
      b();
    })) : this.ui.alert(mxResources.get('redirectToNewApp'), e);
  }
};
DrawioFile.prototype.handleFileSuccess = function(b) {
  this.ui.spinner.stop();
  this.ui.getCurrentFile() == this && (EditorUi.debug('DrawioFile.handleFileSuccess', [this], 'saved', b, 'modified', this.isModified()), this.isModified() ? this.fileChanged() : b ? (this.isTrashed() ? this.addAllSavedStatus(mxUtils.htmlEntities(mxResources.get(this.allChangesSavedKey)) + ' (' + mxUtils.htmlEntities(mxResources.get('fileMovedToTrash')) + ')') : this.addAllSavedStatus(), null != this.sync && (this.sync.resetUpdateStatusThread(), this.sync.remoteFileChanged && (this.sync.remoteFileChanged = !1, this.sync.fileChangedNotify()))) : this.ui.editor.setStatus(''));
};
DrawioFile.prototype.handleFileError = function(b, e) {
  this.ui.spinner.stop();
  this.ui.getCurrentFile() == this && (this.inConflictState ? this.handleConflictError(b, e) : (this.isModified() && this.addUnsavedStatus(b), e ? this.ui.handleError(b, null != b ? mxResources.get('errorSavingFile') : null) : this.isModified() || (b = this.getErrorMessage(b), null != b && 60 < b.length && (b = b.substring(0, 60) + '...'), this.ui.editor.setStatus('<div class="geStatusAlert">' + mxUtils.htmlEntities(mxResources.get('error')) + (null != b ? ' (' + mxUtils.htmlEntities(b) + ')' : '') + '</div>'))));
};
DrawioFile.prototype.handleConflictError = function(b, e) {
  var f = mxUtils.bind(this, function() {
      this.handleFileSuccess(!0);
    }),
    c = mxUtils.bind(this, function(t) {
      this.handleFileError(t, !0);
    }),
    k = mxUtils.bind(this, function() {
      this.ui.spinner.spin(document.body, mxResources.get(this.savingSpinnerKey)) && (this.ui.editor.setStatus(''), this.save(!0, f, c, null, !0, this.constructor != GitHubFile && this.constructor != GitLabFile || null == b ? null : b.commitMessage));
    }),
    m = mxUtils.bind(this, function() {
      this.ui.spinner.spin(document.body, mxResources.get('updatingDocument')) && this.synchronizeFile(mxUtils.bind(this, function() {
        this.ui.spinner.stop();
        this.ui.spinner.spin(document.body, mxResources.get(this.savingSpinnerKey)) && this.save(!0, f, c, null, null, this.constructor != GitHubFile && this.constructor != GitLabFile || null == b ? null : b.commitMessage);
      }), c);
    });
  'none' == DrawioFile.SYNC ? this.showCopyDialog(f, c, k) : this.invalidChecksum ? this.showRefreshDialog(f, c, this.getErrorMessage(b)) : e ? this.showConflictDialog(k, m) : this.addConflictStatus(this.getErrorMessage(b), mxUtils.bind(this, function() {
    this.ui.editor.setStatus(mxUtils.htmlEntities(mxResources.get('updatingDocument')));
    this.synchronizeFile(f, c);
  }));
};
DrawioFile.prototype.getErrorMessage = function(b) {
  var e = null != b ? null != b.error ? b.error.message : b.message : null;
  null == e && null != b && b.code == App.ERROR_TIMEOUT ? e = mxResources.get('timeout') : '0' == e && (e = mxResources.get('noResponse'));
  return e;
};
DrawioFile.prototype.isOverdue = function() {
  return null != this.ageStart && Date.now() - this.ageStart.getTime() >= this.ui.warnInterval;
};
DrawioFile.prototype.fileChanged = function(b) {
  b = null != b ? b : !0;
  this.lastChanged = new Date();
  this.setModified(!0);
  EditorUi.debug('DrawioFile.fileChanged', [this], 'autosave', this.isAutosave(), 'saving', this.savingFile);
  this.isAutosave() ? (null != this.savingStatusKey && this.addAllSavedStatus(mxUtils.htmlEntities(mxResources.get(this.savingStatusKey)) + '...'), this.ui.scheduleSanityCheck(), null == this.ageStart && (this.ageStart = new Date()), this.autosave(this.autosaveDelay, this.maxAutosaveDelay, mxUtils.bind(this, function(e) {
    this.ui.stopSanityCheck();
    null == this.autosaveThread ? (this.handleFileSuccess(!0), this.ageStart = null) : this.isModified() && (this.ui.scheduleSanityCheck(), this.ageStart = this.lastChanged);
  }), mxUtils.bind(this, function(e) {
    this.handleFileError(e);
  }))) : (this.ageStart = null, this.isAutosaveOptional() && this.ui.editor.autosave || this.inConflictState || this.addUnsavedStatus());
  null != this.sync && b && this.sync.localFileChanged();
};
DrawioFile.prototype.createSecret = function(b) {
  var e = Editor.guid(32);
  null == this.sync || this.isOptimisticSync() ? b(e) : this.sync.createToken(e, mxUtils.bind(this, function(f) {
    b(e, f);
  }), mxUtils.bind(this, function() {
    b(e);
  }));
};
DrawioFile.prototype.fileSaving = function() {
  null != this.sync && this.sync.fileSaving();
};
DrawioFile.prototype.fileSaved = function(b, e, f, c, k) {
  this.lastSaved = new Date();
  this.ageStart = null;
  try {
    this.stats.saved++;
    this.invalidChecksum = this.inConflictState = !1;
    var m = this.ui.getPagesForXml(b);
    null == this.sync || this.isOptimisticSync() ? (this.setShadowPages(m), null != this.sync && (this.sync.lastModified = this.getLastModifiedDate(), this.sync.resetUpdateStatusThread(), this.isRealtime() && this.sync.scheduleCleanup()), null != f && f()) : this.sync.fileSaved(m, e, f, c, k);
  } catch (E) {
    this.invalidChecksum = this.inConflictState = !0;
    this.descriptorChanged();
    null != c && c(E);
    try {
      if (this.errorReportsEnabled)
        this.sendErrorReport('Error in fileSaved', null, E);
      else {
        var t = this.getCurrentUser(),
          y = null != t ? t.id : 'unknown';
        EditorUi.logError('Error in fileSaved', null, this.getMode() + '.' + this.getId(), y, E);
      }
    } catch (z) {}
  }
  EditorUi.debug('DrawioFile.fileSaved', [this], 'savedData', [b], 'inConflictState', this.inConflictState, 'invalidChecksum', this.invalidChecksum);
};
DrawioFile.prototype.autosave = function(b, e, f, c) {
  null == this.lastAutosave && (this.lastAutosave = Date.now());
  b = Date.now() - this.lastAutosave < e ? b : 0;
  this.clearAutosave();
  var k = window.setTimeout(mxUtils.bind(this, function() {
    try {
      if (this.lastAutosave = null, this.autosaveThread == k && (this.autosaveThread = null), EditorUi.debug('DrawioFile.autosave', [this], 'thread', k, 'modified', this.isModified(), 'now', this.isAutosaveNow(), 'saving', this.savingFile), this.isModified() && this.isAutosaveNow()) {
        var m = this.isAutosaveRevision();
        m && (this.lastAutosaveRevision = new Date().getTime());
        this.save(m, mxUtils.bind(this, function(t) {
          this.autosaveCompleted();
          null != f && f(t);
        }), mxUtils.bind(this, function(t) {
          null != c && c(t);
        }));
      } else
        this.isModified() || this.ui.editor.setStatus(''), null != f && f(null);
    } catch (t) {
      null != c && c(t);
    }
  }), b);
  EditorUi.debug('DrawioFile.autosave', [this], 'thread', k, 'delay', b, 'saving', this.savingFile);
  this.autosaveThread = k;
};
DrawioFile.prototype.isAutosaveNow = function() {
  return !0;
};
DrawioFile.prototype.autosaveCompleted = function() {};
DrawioFile.prototype.clearAutosave = function() {
  null != this.autosaveThread && (window.clearTimeout(this.autosaveThread), this.autosaveThread = null);
};
DrawioFile.prototype.isAutosaveRevision = function() {
  var b = new Date().getTime();
  return null == this.lastAutosaveRevision || b - this.lastAutosaveRevision > this.maxAutosaveRevisionDelay;
};
DrawioFile.prototype.descriptorChanged = function() {
  this.fireEvent(new mxEventObject('descriptorChanged'));
};
DrawioFile.prototype.contentChanged = function() {
  this.fireEvent(new mxEventObject('contentChanged'));
};
DrawioFile.prototype.close = function(b) {
  this.updateFileData();
  this.stats.closed++;
  this.isAutosave() && this.isModified() && this.save(this.isAutosaveRevision(), null, null, b);
  this.destroy();
};
DrawioFile.prototype.hasSameExtension = function(b, e) {
  if (null != b && null != e) {
    var f = b.lastIndexOf('.');
    b = 0 < f ? b.substring(f) : '';
    f = e.lastIndexOf('.');
    return b === (0 < f ? e.substring(f) : '');
  }
  return b == e;
};
DrawioFile.prototype.removeListeners = function() {
  null != this.changeListener && (this.ui.editor.graph.model.removeListener(this.changeListener), this.ui.editor.graph.removeListener(this.changeListener), this.ui.removeListener(this.changeListener), this.changeListener = null);
};
DrawioFile.prototype.destroy = function() {
  this.clearAutosave();
  this.removeListeners();
  this.stats.destroyed++;
  null != this.sync && (this.sync.destroy(), this.sync = null);
};
DrawioFile.prototype.commentsSupported = function() {
  return !1;
};
DrawioFile.prototype.commentsRefreshNeeded = function() {
  return !0;
};
DrawioFile.prototype.commentsSaveNeeded = function() {
  return !1;
};
DrawioFile.prototype.getComments = function(b, e) {
  b([]);
};
DrawioFile.prototype.addComment = function(b, e, f) {
  e(Date.now());
};
DrawioFile.prototype.canReplyToReplies = function() {
  return !0;
};
DrawioFile.prototype.canComment = function() {
  return !0;
};
DrawioFile.prototype.newComment = function(b, e) {
  return new DrawioComment(this, null, b, Date.now(), Date.now(), !1, e);
};