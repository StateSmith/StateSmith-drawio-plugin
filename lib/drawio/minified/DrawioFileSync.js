DrawioFileSync = function(b) {
  mxEventSource.call(this);
  this.lastActivity = Date.now();
  this.clientId = Editor.guid();
  this.ui = b.ui;
  this.file = b;
  this.onlineListener = mxUtils.bind(this, function() {
    this.updateOnlineState();
    this.isConnected() && !this.ui.isOffline(!0) ? this.fileChangedNotify() : this.updateStatus();
  });
  mxEvent.addListener(window, 'offline', this.onlineListener);
  mxEvent.addListener(window, 'online', this.onlineListener);
  this.realtimeListener = mxUtils.bind(this, function() {
    this.updateOnlineState();
  });
  this.file.addListener('realtimeStateChanged', this.realtimeListener);
  this.autosaveListener = mxUtils.bind(this, function() {
    this.updateRealtime();
  });
  this.ui.editor.addListener('autosaveChanged', this.autosaveListener);
  this.visibleListener = mxUtils.bind(this, function() {
    'hidden' == document.visibilityState ? this.isConnected() && this.stop() : this.start();
  });
  mxEvent.addListener(document, 'visibilitychange', this.visibleListener);
  this.activityListener = mxUtils.bind(this, function(e) {
    this.lastActivity = Date.now();
    this.start();
  });
  mxEvent.addListener(document, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', this.activityListener);
  mxEvent.addListener(document, 'keypress', this.activityListener);
  mxEvent.addListener(window, 'focus', this.activityListener);
  !mxClient.IS_POINTER && mxClient.IS_TOUCH && (mxEvent.addListener(document, 'touchstart', this.activityListener), mxEvent.addListener(document, 'touchmove', this.activityListener));
  this.file.addListener('realtimeMessage', this.activityListener);
  this.pusherErrorListener = mxUtils.bind(this, function(e) {
    null != e.error && null != e.error.data && 4004 === e.error.data.code && EditorUi.logError('Error: Pusher Limit', null, this.file.getId());
  });
  this.connectionListener = mxUtils.bind(this, function() {
    this.updateOnlineState();
    this.updateStatus();
    if (this.isConnected())
      if (this.announced)
        this.fileChangedNotify();
      else {
        var e = this.file.getCurrentUser(),
          f = {
            a: 'join'
          };
        null != e && (f.name = encodeURIComponent(e.displayName), f.uid = e.id);
        mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() + '&msg=' + encodeURIComponent(this.objectToString(this.createMessage(f))));
        this.file.stats.msgSent++;
        this.announced = !0;
      }
  });
  this.changeListener = mxUtils.bind(this, function(e) {
    this.file.stats.msgReceived++;
    this.lastActivity = Date.now();
    if (this.enabled && !this.file.inConflictState && !this.file.redirectDialogShowing)
      try {
        var f = this.stringToObject(e);
        null != f && (EditorUi.debug('DrawioFileSync.message', [this], f, e.length, 'bytes'), f.v > DrawioFileSync.PROTOCOL ? this.file.redirectToNewApp(mxUtils.bind(this, function() {})) : f.v === DrawioFileSync.PROTOCOL && null != f.d && this.handleMessageData(f.d));
      } catch (c) {
        this.isConnected() && this.fileChangedNotify();
      }
  });
};
DrawioFileSync.PROTOCOL = 6;
DrawioFileSync.ENABLE_SOCKETS = '0' != urlParams.sockets;
mxUtils.extend(DrawioFileSync, mxEventSource);
DrawioFileSync.prototype.maxCacheEntrySize = 1000000;
DrawioFileSync.prototype.maxSyncMessageSize = 9000;
DrawioFileSync.prototype.syncSendMessageDelay = 300;
DrawioFileSync.prototype.syncReceiveMessageDelay = 50;
DrawioFileSync.prototype.cleanupDelay = 12000;
DrawioFileSync.prototype.syncChangeCounter = 0;
DrawioFileSync.prototype.enabled = !0;
DrawioFileSync.prototype.channelId = null;
DrawioFileSync.prototype.channel = null;
DrawioFileSync.prototype.catchupRetryCount = 0;
DrawioFileSync.prototype.maxCatchupRetries = 15;
DrawioFileSync.prototype.maxCacheReadyRetries = 1;
DrawioFileSync.prototype.cacheReadyDelay = 700;
DrawioFileSync.prototype.maxOptimisticRetries = 6;
DrawioFileSync.prototype.inactivityTimeoutSeconds = 1800;
DrawioFileSync.prototype.lastActivity = null;
DrawioFileSync.prototype.start = function() {
  null == this.channelId && (this.channelId = this.file.getChannelId());
  null == this.key && (this.key = this.file.getChannelKey());
  var b = !1;
  if (DrawioFileSync.PULLING_MODE && null == this.puller && 'hidden' != document.visibilityState)
    null == this.puller && (this.puller = new DrawioFilePuller(this.file, this)), this.puller.start(this.file.getPullingInterval()), EditorUi.debug('DrawioFileSync.start (Pulling)', [
      this,
      'v' + DrawioFileSync.PROTOCOL
    ], 'rev', this.file.getCurrentRevisionId()), b = !0;
  else if (!DrawioFileSync.PULLING_MODE && null == this.pusher && null != this.channelId && 'hidden' != document.visibilityState) {
    this.pusher = this.ui.getPusher();
    if (null != this.pusher) {
      try {
        null != this.pusher.connection && this.pusher.connection.bind('error', this.pusherErrorListener);
      } catch (e) {}
      try {
        this.pusher.connect(), this.channel = this.pusher.subscribe(this.channelId), EditorUi.debug('DrawioFileSync.start', [
          this,
          'v' + DrawioFileSync.PROTOCOL
        ], 'rev', this.file.getCurrentRevisionId());
      } catch (e) {}
      this.installListeners();
    }
    b = !0;
  }
  b && window.setTimeout(mxUtils.bind(this, function() {
    this.lastModified = this.file.getLastModifiedDate();
    this.lastActivity = Date.now();
    this.resetUpdateStatusThread();
    this.updateOnlineState();
    this.updateStatus();
  }, 0));
  this.updateRealtime();
};
DrawioFileSync.prototype.updateRealtime = function() {
  this.isValidState() && (this.file.isRealtimeEnabled() && this.file.isRealtimeSupported() && this.isRealtimeActive() ? this.file.isRealtime() || this.initRealtime() : this.file.isRealtime() && this.resetRealtime(), DrawioFileSync.ENABLE_SOCKETS && this.file.isRealtime() && null == this.p2pCollab && null != this.channelId ? (this.p2pCollab = new P2PCollab(this.ui, this, this.channelId), this.p2pCollab.joinFile()) : this.file.isRealtime() || null == this.p2pCollab || (this.p2pCollab.destroy(), this.p2pCollab = null));
};
DrawioFileSync.prototype.initRealtime = function() {
  this.file.theirPages = this.ui.clonePages(this.ui.pages);
  this.file.ownPages = this.ui.clonePages(this.ui.pages);
  this.snapshot = this.file.ownPages;
};
DrawioFileSync.prototype.resetRealtime = function() {
  var b = this.file.getShadowPages();
  null != b && (b = this.ui.diffPages(b, this.file.ownPages), this.file.patch([b]));
  this.sendLocalChanges();
  this.cleanup();
  this.file.theirPages = null;
  this.snapshot = this.file.ownPages = null;
};
DrawioFileSync.prototype.isConnected = function() {
  return null != this.pusher && null != this.pusher.connection ? 'connected' == this.pusher.connection.state : null != this.puller ? this.puller.isConnected() : !1;
};
DrawioFileSync.prototype.updateOnlineState = function() {
  '1' != urlParams.embedRT && (null != this.ui.toolbarContainer && null == this.collaboratorsElement && (this.collaboratorsElement = this.createCollaboratorsElement(), this.ui.toolbarContainer.appendChild(this.collaboratorsElement)), this.updateCollaboratorsElement());
};
DrawioFileSync.prototype.updateCollaboratorsElement = function() {
  if (null != this.collaboratorsElement) {
    var b = this.ui.getNetworkStatus();
    null != b ? (this.collaboratorsElement.style.backgroundImage = 'url(' + Editor.syncProblemImage + ')', this.collaboratorsElement.style.display = 'inline-block', this.collaboratorsElement.setAttribute('title', b)) : this.collaboratorsElement.style.display = 'none';
  }
};
DrawioFileSync.prototype.createCollaboratorsElement = function() {
  var b = document.createElement('a');
  b.className = 'geButton geAdaptiveAsset';
  b.style.position = 'absolute';
  b.style.display = 'inline-block';
  b.style.verticalAlign = 'bottom';
  b.style.color = '#666';
  b.style.top = '6px';
  b.style.right = 'atlas' != Editor.currentTheme ? '70px' : '50px';
  b.style.padding = '2px';
  b.style.fontSize = '8pt';
  b.style.verticalAlign = 'middle';
  b.style.textDecoration = 'none';
  b.style.backgroundPosition = 'center center';
  b.style.backgroundRepeat = 'no-repeat';
  b.style.backgroundSize = '16px 16px';
  b.style.width = '16px';
  b.style.height = '16px';
  b.style.opacity = '0.6';
  mxEvent.addListener(b, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(e) {
    e.preventDefault();
  }));
  mxEvent.addListener(b, 'click', mxUtils.bind(this, function(e) {
    this.file.isRealtimeEnabled() && this.file.isRealtimeSupported() ? (e = this.ui.getNetworkStatus(), this.ui.showError(mxResources.get('realtimeCollaboration'), mxUtils.htmlEntities(null != e ? e : mxResources.get('online')))) : (this.enabled = !this.enabled, this.ui.updateButtonContainer(), this.resetUpdateStatusThread(), this.updateOnlineState(), this.updateStatus(), !this.file.inConflictState && this.enabled && this.fileChangedNotify());
  }));
  return b;
};
DrawioFileSync.prototype.updateStatus = function() {
  this.isConnected() && null != this.lastActivity && (Date.now() - this.lastActivity) / 1000 > this.inactivityTimeoutSeconds && this.stop();
  if (!(this.file.isModified() || this.file.inConflictState || null != this.file.autosaveThread || this.file.savingFile || this.file.redirectDialogShowing))
    if (this.enabled && null != this.ui.statusContainer) {
      var b = this.ui.timeSince(new Date(this.lastModified));
      null == b && (b = mxResources.get('lessThanAMinute'));
      var e = this.lastMessage;
      this.lastMessage = null;
      null != e && 40 < e.length && (e = e.substring(0, 40) + '...');
      var f = this.ui.getNetworkStatus();
      b = mxResources.get('lastChange', [b]);
      var c = this.file.isRevisionHistorySupported() ? 'data-action="revisionHistory" ' : '';
      this.ui.editor.setStatus('<div ' + c + 'title="' + mxUtils.htmlEntities(b) + '">' + mxUtils.htmlEntities(b) + '</div>' + (this.file.isEditable() ? '' : '<div class="geStatusBox" title="' + mxUtils.htmlEntities(mxResources.get('readOnly')) + '">' + mxUtils.htmlEntities(mxResources.get('readOnly')) + '</div>') + (null != f ? '<div class="geStatusBox" title="' + mxUtils.htmlEntities(f) + '">' + mxUtils.htmlEntities(f) + '</div>' : '') + (null != e ? ' <div class="geStatusBox" data-effect="fade" title="' + mxUtils.htmlEntities(e) + '">' + mxUtils.htmlEntities(e) + '</div>' : ''));
      this.resetUpdateStatusThread();
    } else
      this.file.addAllSavedStatus();
};
DrawioFileSync.prototype.resetUpdateStatusThread = function() {
  null != this.updateStatusThread && window.clearInterval(this.updateStatusThread);
  null != this.channel && (this.updateStatusThread = window.setInterval(mxUtils.bind(this, function() {
    this.updateStatus();
  }), Editor.updateStatusInterval));
};
DrawioFileSync.prototype.installListeners = function() {
  null != this.pusher && null != this.pusher.connection && this.pusher.connection.bind('state_change', this.connectionListener);
  null != this.channel && this.channel.bind('changed', this.changeListener);
};
DrawioFileSync.prototype.handleMessageData = function(b) {
  if ('desc' == b.a)
    this.file.savingFile || this.reloadDescriptor();
  else if ('join' == b.a || 'leave' == b.a)
    'join' == b.a && this.file.stats.joined++, null != b.name && (this.lastMessage = mxResources.get('join' == b.a ? 'userJoined' : 'userLeft', [decodeURIComponent(b.name)]), this.resetUpdateStatusThread(), this.updateStatus());
  else if ('change' == b.a)
    this.receiveRemoteChanges(b);
  else if (null != b.m) {
    var e = new Date(b.m);
    if (null == this.lastMessageModified || this.lastMessageModified < e)
      this.lastMessageModified = e, this.fileChangedNotify(b);
  }
};
DrawioFileSync.prototype.isValidState = function() {
  return this.ui.getCurrentFile() == this.file && this.file.sync == this && !this.file.invalidChecksum && !this.file.redirectDialogShowing;
};
DrawioFileSync.prototype.optimisticSync = function(b) {
  null == this.reloadThread && (b = null != b ? b : 0, b < this.maxOptimisticRetries && (this.reloadThread = window.setTimeout(mxUtils.bind(this, function() {
    this.file.getLatestVersion(mxUtils.bind(this, function(e) {
      this.reloadThread = null;
      if (null != e) {
        var f = this.file.getCurrentRevisionId(),
          c = e.getCurrentRevisionId();
        f == c ? this.optimisticSync(b + 1) : this.file.mergeFile(e, mxUtils.bind(this, function() {
          this.lastModified = this.file.getLastModifiedDate();
          this.updateStatus();
        }));
      }
    }), mxUtils.bind(this, function() {
      this.reloadThread = null;
    }));
  }), (b + 1) * this.file.optimisticSyncDelay)), EditorUi.debug('DrawioFileSync.optimisticSync', [this], 'attempt', b, 'of', this.maxOptimisticRetries));
};
DrawioFileSync.prototype.fileChangedNotify = function(b) {
  if (this.isValidState())
    if (this.file.savingFile)
      this.remoteFileChanged = !0;
    else if (null != b && 'optimistic' == b.type)
    this.optimisticSync();
  else
    var e = this.fileChanged(mxUtils.bind(this, function(f) {
      this.updateStatus();
    }), mxUtils.bind(this, function(f) {
      this.file.handleFileError(f);
    }), mxUtils.bind(this, function() {
      return !this.file.savingFile && this.notifyThread != e;
    }), !0);
};
DrawioFileSync.prototype.localFileChanged = function() {
  this.file.isRealtime() && (window.clearTimeout(this.triggerSendThread), this.localFileWasChanged = !0, this.scheduleCleanup(!0), this.triggerSendThread = window.setTimeout(mxUtils.bind(this, function() {
    this.sendLocalChanges();
  }), Math.min(this.file.autosaveDelay, this.syncSendMessageDelay - 20)));
};
DrawioFileSync.prototype.doSendLocalChanges = function(b) {
  if (!this.file.ignorePatches(b)) {
    var e = this.clientId + '.' + this.syncChangeCounter++,
      f = this.createMessage({
        a: 'change',
        c: b,
        id: e,
        t: Date.now()
      });
    e = !1;
    null != this.p2pCollab ? this.p2pCollab.sendDiff(f) : '1' == urlParams.dev ? (f = encodeURIComponent(this.objectToString(f)), 0 == this.maxSyncMessageSize || f.length < this.maxSyncMessageSize ? mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() + '&msg=' + f) : e = !0) : e = !0;
    EditorUi.debug('DrawioFileSync.doSendLocalChanges', [this], 'changes', b, e ? '(skipped)' : '');
  }
};
DrawioFileSync.prototype.receiveRemoteChanges = function(b) {
  this.file.ignorePatches(b.c) || (null == this.receivedData ? (this.receivedData = [b], window.setTimeout(mxUtils.bind(this, function() {
    if (this.ui.getCurrentFile() == this.file)
      if (1 == this.receivedData.length)
        this.doReceiveRemoteChanges(this.receivedData[0].c);
      else {
        this.receivedData.sort(function(k, m) {
          return k.id < m.id ? -1 : k.id > m.id ? 1 : 0;
        });
        for (var e = null, f = 0; f < this.receivedData.length; f++) {
          var c = JSON.stringify(this.receivedData[f].c);
          c != e && this.doReceiveRemoteChanges(this.receivedData[f].c);
          e = c;
        }
      }
    this.receivedData = null;
  }), this.syncReceiveMessageDelay)) : this.receivedData.push(b));
};
DrawioFileSync.prototype.scheduleCleanup = function(b) {
  b ? null != this.cleanupThread && this.scheduleCleanup() : (window.clearTimeout(this.cleanupThread), this.cleanupThread = window.setTimeout(mxUtils.bind(this, function() {
    this.cleanupThread = null;
    this.cleanup(null, mxUtils.bind(this, function(e) {
      this.file.handleFileError(e);
    }));
  }), this.cleanupDelay));
};
DrawioFileSync.prototype.cleanup = function(b, e, f) {
  window.clearTimeout(this.cleanupThread);
  if (this.isValidState() && !this.file.inConflictState && this.file.isRealtime() && !this.file.isModified()) {
    var c = [this.ui.diffPages(this.ui.pages, this.file.ownPages)];
    this.file.theirPages = this.ui.clonePages(this.file.ownPages);
    this.file.ignorePatches(c) || this.file.patch(c);
    EditorUi.debug('DrawioFileSync.cleanup', [this], 'patches', c, 'checkFile', f);
    f ? this.file.getLatestVersion(mxUtils.bind(this, function(k) {
      try {
        if (this.isValidState() && !this.file.inConflictState && this.file.isRealtime()) {
          var m = this.ui.getPagesForXml(k.data);
          c = [
            this.ui.diffPages(this.ui.pages, m),
            this.ui.diffPages(m, this.file.ownPages)
          ];
          this.file.ignorePatches(c) || this.file.patch(c);
          EditorUi.debug('DrawioFileSync.cleanup', [this], 'newFile', k, 'patches', c);
        }
        null != b && b();
      } catch (t) {
        null != e && e(t);
      }
    }), e) : null != b && b();
  } else
    null != b && (b(), EditorUi.debug('DrawioFileSync.cleanup', [this], 'checkFile', f, 'modified', this.file.isModified()));
};
DrawioFileSync.prototype.extractLocal = function(b) {
  return mxUtils.isEmptyObject(b) ? {} : this.ui.diffPages(this.file.theirPages, this.ui.patchPages(this.ui.clonePages(this.file.theirPages), b));
};
DrawioFileSync.prototype.extractRemove = function(b) {
  var e = {};
  null != b[EditorUi.DIFF_REMOVE] && (e[EditorUi.DIFF_REMOVE] = b[EditorUi.DIFF_REMOVE]);
  if (null != b[EditorUi.DIFF_UPDATE])
    for (var f in b[EditorUi.DIFF_UPDATE]) {
      var c = b[EditorUi.DIFF_UPDATE][f];
      if (null != c.cells && null != c.cells[EditorUi.DIFF_REMOVE]) {
        null == e[EditorUi.DIFF_UPDATE] && (e[EditorUi.DIFF_UPDATE] = {});
        e[EditorUi.DIFF_UPDATE][f] = {};
        var k = e[EditorUi.DIFF_UPDATE][f];
        k.cells = {};
        k.cells[EditorUi.DIFF_REMOVE] = c.cells[EditorUi.DIFF_REMOVE];
      }
    }
  return e;
};
DrawioFileSync.prototype.patchRealtime = function(b, e, f) {
  var c = null;
  if (this.file.isRealtime()) {
    c = this.extractRemove(this.ui.diffPages(this.file.getShadowPages(), this.ui.pages));
    var k = this.extractRemove(this.extractLocal(c)),
      m = (null == f ? b : b.concat(f)).concat([k]);
    this.file.ownPages = this.ui.applyPatches(this.file.ownPages, m, !0, e);
    mxUtils.isEmptyObject(k) ? this.scheduleCleanup() : this.file.fileChanged(!1);
    EditorUi.debug('DrawioFileSync.patchRealtime', [this], 'patches', b, 'backup', e, 'own', f, 'all', c, 'local', k, 'applied', m);
  }
  return c;
};
DrawioFileSync.prototype.isRealtimeActive = function() {
  return this.ui.editor.autosave;
};
DrawioFileSync.prototype.sendLocalChanges = function() {
  try {
    if (this.file.isRealtime() && this.localFileWasChanged) {
      var b = this.ui.clonePages(this.ui.pages),
        e = this.ui.diffPages(this.snapshot, b);
      this.file.ownPages = this.ui.patchPages(this.file.ownPages, e, !0);
      this.snapshot = b;
      this.isRealtimeActive() && this.doSendLocalChanges([e]);
    }
    this.localFileWasChanged = !1;
  } catch (f) {
    b = this.file.getCurrentUser(), b = null != b ? b.id : 'unknown', EditorUi.logError('Error in sendLocalChanges', null, this.file.getMode() + '.' + this.file.getId(), b, f);
  }
};
DrawioFileSync.prototype.doReceiveRemoteChanges = function(b) {
  this.file.isRealtime() && this.isRealtimeActive() && (this.sendLocalChanges(), this.file.patch(b), this.file.theirPages = this.ui.applyPatches(this.file.theirPages, b), this.scheduleCleanup(), EditorUi.debug('DrawioFileSync.doReceiveRemoteChanges', [this], 'changes', b));
};
DrawioFileSync.prototype.merge = function(b, e, f, c, k, m) {
  try {
    this.file.stats.merged++;
    this.lastModified = new Date();
    var t = this.file.getDescriptorRevisionId(f);
    if (!this.file.ignorePatches(b)) {
      this.sendLocalChanges();
      var y = this.file.getShadowPages();
      this.file.backupPatch = this.file.isModified() && !this.file.isRealtime() ? this.ui.diffPages(y, this.ui.pages) : null;
      var E = this.file.isRealtime() ? this.ui.diffPages(y, this.file.ownPages) : null;
      y = this.ui.applyPatches(y, b);
      var z = null == e ? null : this.ui.getHashValueForPages(y);
      this.file.setShadowPages(y);
      EditorUi.debug('DrawioFileSync.merge', [this], 'patches', b, 'backup', this.file.backupPatch, 'pending', E, 'checksum', e, 'current', z, 'valid', e == z, 'attempt', this.catchupRetryCount, 'of', this.maxCatchupRetries, 'from', this.file.getCurrentRevisionId(), 'to', t, 'etag', this.file.getDescriptorEtag(f));
      if (null != e && e != z) {
        var D = this.ui.hashValue(t),
          J = this.ui.hashValue(this.file.getCurrentRevisionId());
        this.file.checksumError(k, b, 'From: ' + J + '\nTo: ' + D + '\nChecksum: ' + e + '\nCurrent: ' + z, t, 'merge', e, z, t);
        '1' == urlParams.test && EditorUi.debug('DrawioFileSync.merge.checksumError', [this], 'data', [
          this.file.data,
          this.file.createData(),
          this.ui.getXmlForPages(y)
        ]);
        return;
      }
      null == this.patchRealtime(b, null, E) && this.file.patch(b, DrawioFile.LAST_WRITE_WINS ? this.file.backupPatch : null);
    }
    this.file.invalidChecksum = !1;
    this.file.inConflictState = !1;
    this.file.patchDescriptor(this.file.getDescriptor(), f);
    this.file.backupPatch = null;
    null != c && c(!0);
  } catch (g) {
    this.file.inConflictState = !0;
    this.file.invalidChecksum = !0;
    this.file.descriptorChanged();
    null != k && k(g);
    try {
      if (this.file.errorReportsEnabled)
        J = this.ui.hashValue(this.file.getCurrentRevisionId()), D = this.ui.hashValue(t), this.file.sendErrorReport('Error in merge', 'From: ' + J + '\nTo: ' + D + '\nChecksum: ' + e + '\nPatches:\n' + this.file.compressReportData(JSON.stringify(b, null, 2)), g);
      else {
        var G = this.file.getCurrentUser(),
          d = null != G ? G.id : 'unknown';
        EditorUi.logError('Error in merge', null, this.file.getMode() + '.' + this.file.getId(), d, g);
      }
    } catch (n) {}
  }
};
DrawioFileSync.prototype.fileChanged = function(b, e, f, c) {
  var k = window.setTimeout(mxUtils.bind(this, function() {
    null != f && f() || (EditorUi.debug('DrawioFileSync.fileChanged', [this], 'lazy', c, 'valid', this.isValidState()), this.isValidState() ? this.file.loadPatchDescriptor(mxUtils.bind(this, function(m) {
      null != f && f() || (this.isValidState() ? this.catchup(m, b, e, f) : null != e && e());
    }), e) : null != e && e());
  }), c ? this.cacheReadyDelay : 0);
  return this.notifyThread = k;
};
DrawioFileSync.prototype.reloadDescriptor = function() {
  this.file.loadDescriptor(mxUtils.bind(this, function(b) {
    null != b ? (this.file.setDescriptorRevisionId(b, this.file.getCurrentRevisionId()), this.updateDescriptor(b), this.fileChangedNotify()) : (this.file.inConflictState = !0, this.file.handleFileError());
  }), mxUtils.bind(this, function(b) {
    this.file.inConflictState = !0;
    this.file.handleFileError(b);
  }));
};
DrawioFileSync.prototype.updateDescriptor = function(b) {
  this.file.setDescriptor(b);
  this.file.descriptorChanged();
  this.start();
};
DrawioFileSync.prototype.catchup = function(b, e, f, c) {
  if (null != b && (null == c || !c())) {
    var k = this.file.getCurrentRevisionId(),
      m = this.file.getDescriptorRevisionId(b);
    EditorUi.debug('DrawioFileSync.catchup', [this], 'desc', [b], 'from', k, 'to', m, 'valid', this.isValidState());
    if (k == m)
      this.file.patchDescriptor(this.file.getDescriptor(), b), null != e && e(!0);
    else if (this.isValidState()) {
      var t = this.file.getDescriptorSecret(b);
      if (null == t || '1' == urlParams.lockdown)
        this.reload(e, f, c);
      else {
        var y = 0,
          E = !1,
          z = mxUtils.bind(this, function() {
            if (null == c || !c())
              if (k != this.file.getCurrentRevisionId())
                null != e && e(!0);
              else if (this.isValidState()) {
              this.scheduleCleanup(!0);
              var D = !0,
                J = window.setTimeout(mxUtils.bind(this, function() {
                  D = !1;
                  this.reload(e, f, c);
                }), this.ui.timeout);
              mxUtils.get(EditorUi.cacheUrl + '?id=' + encodeURIComponent(this.channelId) + '&from=' + encodeURIComponent(k) + '&to=' + encodeURIComponent(m) + (null != t ? '&secret=' + encodeURIComponent(t) : ''), mxUtils.bind(this, function(G) {
                this.file.stats.bytesReceived += G.getText().length;
                window.clearTimeout(J);
                if (D && (null == c || !c()))
                  if (k != this.file.getCurrentRevisionId())
                    null != e && e(!0);
                  else if (this.isValidState()) {
                  var d = null,
                    g = [];
                  EditorUi.debug('DrawioFileSync.doCatchup', [this], 'req', [G], 'status', G.getStatus(), 'cacheReadyRetryCount', y, 'maxCacheReadyRetries', this.maxCacheReadyRetries);
                  if (200 <= G.getStatus() && 299 >= G.getStatus() && 0 < G.getText().length)
                    try {
                      var n = JSON.parse(G.getText());
                      if (null != n && 0 < n.length)
                        for (var v = 0; v < n.length; v++) {
                          var u = this.stringToObject(n[v]);
                          if (u.v > DrawioFileSync.PROTOCOL) {
                            E = !0;
                            g = [];
                            break;
                          } else if (u.v === DrawioFileSync.PROTOCOL && null != u.d)
                            d = u.d.checksum, g.push(u.d.patch);
                          else {
                            E = !0;
                            g = [];
                            break;
                          }
                        }
                      EditorUi.debug('DrawioFileSync.doCatchup', [this], 'response', [n], 'failed', E, 'temp', g, 'checksum', d);
                    } catch (x) {
                      g = [], null != window.console && '1' == urlParams.test && console.log(x);
                    }
                  try {
                    0 < g.length ? (this.file.stats.cacheHits++, this.merge(g, d, b, e, f, c)) : y <= this.maxCacheReadyRetries - 1 && !E && 401 != G.getStatus() && 503 != G.getStatus() && 410 != G.getStatus() ? (y++, this.file.stats.cacheMiss++, window.setTimeout(z, (y + 1) * this.cacheReadyDelay)) : (this.file.stats.cacheFail++, this.reload(e, f, c));
                  } catch (x) {
                    null != f && f(x);
                  }
                } else
                  null != f && f();
              }));
            } else
              null != f && f();
          });
        window.setTimeout(z, this.cacheReadyDelay);
      }
    } else
      null != f && f();
  }
};
DrawioFileSync.prototype.reload = function(b, e, f, c) {
  this.file.updateFile(mxUtils.bind(this, function() {
    this.lastModified = this.file.getLastModifiedDate();
    this.updateStatus();
    this.start();
    null != b && b();
  }), mxUtils.bind(this, function(k) {
    null != e && e(k);
  }), f, c);
};
DrawioFileSync.prototype.descriptorChanged = function(b) {
  this.lastModified = this.file.getLastModifiedDate();
  if (null != this.channelId) {
    var e = this.objectToString(this.createMessage({
        a: 'desc',
        m: this.lastModified.getTime()
      })),
      f = this.file.getCurrentRevisionId(),
      c = this.objectToString({});
    mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() + '&from=' + encodeURIComponent(b) + '&to=' + encodeURIComponent(f) + '&msg=' + encodeURIComponent(e) + '&data=' + encodeURIComponent(c));
    this.file.stats.bytesSent += c.length;
    this.file.stats.msgSent++;
    EditorUi.debug('DrawioFileSync.descriptorChanged', [this], 'from', b, 'to', f);
  }
  this.updateStatus();
};
DrawioFileSync.prototype.objectToString = function(b) {
  b = Graph.compress(JSON.stringify(b));
  null != this.key && 'undefined' !== typeof CryptoJS && (b = CryptoJS.AES.encrypt(b, this.key).toString());
  return b;
};
DrawioFileSync.prototype.stringToObject = function(b) {
  null != this.key && 'undefined' !== typeof CryptoJS && (b = CryptoJS.AES.decrypt(b, this.key).toString(CryptoJS.enc.Utf8));
  return JSON.parse(Graph.decompress(b));
};
DrawioFileSync.prototype.createToken = function(b, e, f) {
  var c = !0,
    k = window.setTimeout(mxUtils.bind(this, function() {
      c = !1;
      f({
        code: App.ERROR_TIMEOUT,
        message: mxResources.get('timeout')
      });
    }), this.ui.timeout);
  mxUtils.get(EditorUi.cacheUrl + '?id=' + encodeURIComponent(this.channelId) + '&secret=' + encodeURIComponent(b), mxUtils.bind(this, function(m) {
    window.clearTimeout(k);
    c && (200 <= m.getStatus() && 299 >= m.getStatus() ? e(m.getText()) : f({
      code: m.getStatus(),
      message: 'Token Error ' + m.getStatus()
    }));
  }));
};
DrawioFileSync.prototype.fileSaving = function() {
  if (this.file.isOptimisticSync()) {
    var b = this.objectToString(this.createMessage({
      m: new Date().getTime(),
      type: 'optimistic'
    }));
    mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() + '&msg=' + encodeURIComponent(b), function() {});
  }
  EditorUi.debug('DrawioFileSync.fileSaving', [this], 'optimistic', this.file.isOptimisticSync());
};
DrawioFileSync.prototype.fileDataUpdated = function() {
  this.scheduleCleanup(!0);
  EditorUi.debug('DrawioFileSync.fileDataUpdated', [this]);
};
DrawioFileSync.prototype.fileSaved = function(b, e, f, c, k) {
  this.lastModified = this.file.getLastModifiedDate();
  this.resetUpdateStatusThread();
  this.catchupRetryCount = 0;
  if (!this.ui.isOffline(!0) && !this.file.inConflictState && !this.file.redirectDialogShowing && (this.start(), null != this.channelId)) {
    var m = this.objectToString(this.createMessage({
        m: this.lastModified.getTime()
      })),
      t = this.file.getDescriptorSecret(this.file.getDescriptor()),
      y = this.file.getDescriptorRevisionId(e),
      E = this.file.getCurrentRevisionId();
    if (null == t || null == k || '1' == urlParams.lockdown)
      this.file.stats.msgSent++, mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() + '&msg=' + encodeURIComponent(m), function() {}), null != f && f(), EditorUi.debug('DrawioFileSync.fileSaved', [this], 'from', y, 'to', E, 'etag', this.file.getCurrentEtag());
    else {
      var z = this.ui.diffPages(this.file.getShadowPages(), b);
      e = this.file.getDescriptorSecret(e);
      var D = this.ui.getHashValueForPages(b),
        J = this.objectToString(this.createMessage({
          patch: z,
          checksum: D
        }));
      this.file.stats.bytesSent += J.length;
      this.file.stats.msgSent++;
      var G = !0,
        d = window.setTimeout(mxUtils.bind(this, function() {
          G = !1;
          c({
            code: App.ERROR_TIMEOUT,
            message: mxResources.get('timeout')
          });
        }), this.ui.timeout);
      mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() + '&from=' + encodeURIComponent(y) + '&to=' + encodeURIComponent(E) + '&msg=' + encodeURIComponent(m) + (null != t ? '&secret=' + encodeURIComponent(t) : '') + (null != e ? '&last-secret=' + encodeURIComponent(e) : '') + (J.length < this.maxCacheEntrySize ? '&data=' + encodeURIComponent(J) : '') + (null != k ? '&token=' + encodeURIComponent(k) : ''), mxUtils.bind(this, function(g) {
        window.clearTimeout(d);
        G && (200 <= g.getStatus() && 299 >= g.getStatus() ? null != f && f() : c({
          message: mxResources.get('realtimeCollaboration') + (0 != g.getStatus() ? ': ' + g.getStatus() : '')
        }));
      }));
      EditorUi.debug('DrawioFileSync.fileSaved', [this], 'diff', z, J.length, 'bytes', 'from', y, 'to', E, 'etag', this.file.getCurrentEtag(), 'checksum', D);
    }
  }
  this.file.setShadowPages(b);
  this.scheduleCleanup();
};
DrawioFileSync.prototype.getIdParameters = function() {
  var b = 'id=' + this.channelId;
  null != this.pusher && null != this.pusher.connection && null != this.pusher.connection.socket_id && (b += '&sid=' + this.pusher.connection.socket_id);
  return b;
};
DrawioFileSync.prototype.createMessage = function(b) {
  return {
    v: DrawioFileSync.PROTOCOL,
    d: b,
    c: this.clientId
  };
};
DrawioFileSync.prototype.fileConflict = function(b, e, f) {
  this.catchupRetryCount++;
  EditorUi.debug('DrawioFileSync.fileConflict', [this], 'desc', [b], 'catchupRetryCount', this.catchupRetryCount, 'maxCatchupRetries', this.maxCatchupRetries);
  this.catchupRetryCount < this.maxCatchupRetries ? (this.file.stats.conflicts++, null != b ? this.catchup(b, e, f) : this.fileChanged(e, f)) : (this.file.stats.timeouts++, this.catchupRetryCount = 0, null != f && f({
    code: App.ERROR_TIMEOUT,
    message: mxResources.get('timeout')
  }));
};
DrawioFileSync.prototype.stop = function() {
  null != this.pusher ? (EditorUi.debug('DrawioFileSync.stop', [this]), null != this.pusher.connection && (this.pusher.connection.unbind('state_change', this.connectionListener), this.pusher.connection.unbind('error', this.pusherErrorListener)), null != this.channel && (this.channel.unbind('changed', this.changeListener), this.channel = null), this.pusher.disconnect(), this.pusher = null, null != this.p2pCollab && (this.p2pCollab.destroy(), this.p2pCollab = null)) : null != this.puller && (EditorUi.debug('DrawioFileSync.stop (Pulling)', [this]), this.puller.stop(), this.puller = null);
  this.updateOnlineState();
  this.updateStatus();
};
DrawioFileSync.prototype.destroy = function() {
  if (null != this.channelId) {
    var b = this.file.getCurrentUser(),
      e = {
        a: 'leave'
      };
    null != b && (e.name = encodeURIComponent(b.displayName), e.uid = b.id);
    mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() + '&msg=' + encodeURIComponent(this.objectToString(this.createMessage(e))));
    this.file.stats.msgSent++;
  }
  this.stop();
  null != this.onlineListener && (mxEvent.removeListener(window, 'offline', this.onlineListener), mxEvent.removeListener(window, 'online', this.onlineListener), this.onlineListener = null);
  null != this.autosaveListener && (this.ui.editor.addListener('autosaveChanged', this.autosaveListener), this.autosaveListener = null);
  null != this.visibleListener && (mxEvent.removeListener(document, 'visibilitychange', this.visibleListener), this.visibleListener = null);
  null != this.activityListener && (mxEvent.removeListener(document, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', this.activityListener), mxEvent.removeListener(document, 'keypress', this.activityListener), mxEvent.removeListener(window, 'focus', this.activityListener), !mxClient.IS_POINTER && mxClient.IS_TOUCH && (mxEvent.removeListener(document, 'touchstart', this.activityListener), mxEvent.removeListener(document, 'touchmove', this.activityListener)), this.activityListener = null);
  null != this.collaboratorsElement && (this.collaboratorsElement.parentNode.removeChild(this.collaboratorsElement), this.collaboratorsElement = null);
  null != this.p2pCollab && this.p2pCollab.destroy();
};
Graph.prototype.defaultThemes['default-style2'] = mxUtils.parseXml('<mxStylesheet><add as="defaultVertex"><add as="shape" value="label"/><add as="perimeter" value="rectanglePerimeter"/><add as="fontSize" value="12"/><add as="fontFamily" value="Helvetica"/><add as="align" value="center"/><add as="verticalAlign" value="middle"/><add as="fillColor" value="default"/><add as="strokeColor" value="default"/><add as="fontColor" value="default"/></add><add as="defaultEdge"><add as="shape" value="connector"/><add as="labelBackgroundColor" value="default"/><add as="endArrow" value="classic"/><add as="fontSize" value="11"/><add as="fontFamily" value="Helvetica"/><add as="align" value="center"/><add as="verticalAlign" value="middle"/><add as="rounded" value="1"/><add as="strokeColor" value="default"/><add as="fontColor" value="default"/></add><add as="text"><add as="fillColor" value="none"/><add as="gradientColor" value="none"/><add as="strokeColor" value="none"/><add as="align" value="left"/><add as="verticalAlign" value="top"/></add><add as="edgeLabel" extend="text"><add as="labelBackgroundColor" value="default"/><add as="fontSize" value="11"/></add><add as="label"><add as="fontStyle" value="1"/><add as="align" value="left"/><add as="verticalAlign" value="middle"/><add as="spacing" value="2"/><add as="spacingLeft" value="52"/><add as="imageWidth" value="42"/><add as="imageHeight" value="42"/><add as="rounded" value="1"/></add><add as="icon" extend="label"><add as="align" value="center"/><add as="imageAlign" value="center"/><add as="verticalLabelPosition" value="bottom"/><add as="verticalAlign" value="top"/><add as="spacingTop" value="4"/><add as="labelBackgroundColor" value="default"/><add as="spacing" value="0"/><add as="spacingLeft" value="0"/><add as="spacingTop" value="6"/><add as="fontStyle" value="0"/><add as="imageWidth" value="48"/><add as="imageHeight" value="48"/></add><add as="swimlane"><add as="shape" value="swimlane"/><add as="fontSize" value="12"/><add as="fontStyle" value="1"/><add as="startSize" value="23"/></add><add as="group"><add as="verticalAlign" value="top"/><add as="fillColor" value="none"/><add as="strokeColor" value="none"/><add as="gradientColor" value="none"/><add as="pointerEvents" value="0"/></add><add as="ellipse"><add as="shape" value="ellipse"/><add as="perimeter" value="ellipsePerimeter"/></add><add as="rhombus"><add as="shape" value="rhombus"/><add as="perimeter" value="rhombusPerimeter"/></add><add as="triangle"><add as="shape" value="triangle"/><add as="perimeter" value="trianglePerimeter"/></add><add as="line"><add as="shape" value="line"/><add as="strokeWidth" value="4"/><add as="labelBackgroundColor" value="default"/><add as="verticalAlign" value="top"/><add as="spacingTop" value="8"/></add><add as="image"><add as="shape" value="image"/><add as="labelBackgroundColor" value="default"/><add as="verticalAlign" value="top"/><add as="verticalLabelPosition" value="bottom"/></add><add as="roundImage" extend="image"><add as="perimeter" value="ellipsePerimeter"/></add><add as="rhombusImage" extend="image"><add as="perimeter" value="rhombusPerimeter"/></add><add as="arrow"><add as="shape" value="arrow"/><add as="edgeStyle" value="none"/><add as="fillColor" value="default"/></add><add as="fancy"><add as="shadow" value="1"/><add as="glass" value="1"/></add><add as="gray" extend="fancy"><add as="gradientColor" value="#B3B3B3"/><add as="fillColor" value="#F5F5F5"/><add as="strokeColor" value="#666666"/></add><add as="blue" extend="fancy"><add as="gradientColor" value="#7EA6E0"/><add as="fillColor" value="#DAE8FC"/><add as="strokeColor" value="#6C8EBF"/></add><add as="green" extend="fancy"><add as="gradientColor" value="#97D077"/><add as="fillColor" value="#D5E8D4"/><add as="strokeColor" value="#82B366"/></add><add as="turquoise" extend="fancy"><add as="gradientColor" value="#67AB9F"/><add as="fillColor" value="#D5E8D4"/><add as="strokeColor" value="#6A9153"/></add><add as="yellow" extend="fancy"><add as="gradientColor" value="#FFD966"/><add as="fillColor" value="#FFF2CC"/><add as="strokeColor" value="#D6B656"/></add><add as="orange" extend="fancy"><add as="gradientColor" value="#FFA500"/><add as="fillColor" value="#FFCD28"/><add as="strokeColor" value="#D79B00"/></add><add as="red" extend="fancy"><add as="gradientColor" value="#EA6B66"/><add as="fillColor" value="#F8CECC"/><add as="strokeColor" value="#B85450"/></add><add as="pink" extend="fancy"><add as="gradientColor" value="#B5739D"/><add as="fillColor" value="#E6D0DE"/><add as="strokeColor" value="#996185"/></add><add as="purple" extend="fancy"><add as="gradientColor" value="#8C6C9C"/><add as="fillColor" value="#E1D5E7"/><add as="strokeColor" value="#9673A6"/></add><add as="plain-gray"><add as="gradientColor" value="#B3B3B3"/><add as="fillColor" value="#F5F5F5"/><add as="strokeColor" value="#666666"/></add><add as="plain-blue"><add as="gradientColor" value="#7EA6E0"/><add as="fillColor" value="#DAE8FC"/><add as="strokeColor" value="#6C8EBF"/></add><add as="plain-green"><add as="gradientColor" value="#97D077"/><add as="fillColor" value="#D5E8D4"/><add as="strokeColor" value="#82B366"/></add><add as="plain-turquoise"><add as="gradientColor" value="#67AB9F"/><add as="fillColor" value="#D5E8D4"/><add as="strokeColor" value="#6A9153"/></add><add as="plain-yellow"><add as="gradientColor" value="#FFD966"/><add as="fillColor" value="#FFF2CC"/><add as="strokeColor" value="#D6B656"/></add><add as="plain-orange"><add as="gradientColor" value="#FFA500"/><add as="fillColor" value="#FFCD28"/><add as="strokeColor" value="#D79B00"/></add><add as="plain-red"><add as="gradientColor" value="#EA6B66"/><add as="fillColor" value="#F8CECC"/><add as="strokeColor" value="#B85450"/></add><add as="plain-pink"><add as="gradientColor" value="#B5739D"/><add as="fillColor" value="#E6D0DE"/><add as="strokeColor" value="#996185"/></add><add as="plain-purple"><add as="gradientColor" value="#8C6C9C"/><add as="fillColor" value="#E1D5E7"/><add as="strokeColor" value="#9673A6"/></add></mxStylesheet>').documentElement;
Graph.prototype.defaultThemes.darkTheme = Graph.prototype.defaultThemes['default-style2'];