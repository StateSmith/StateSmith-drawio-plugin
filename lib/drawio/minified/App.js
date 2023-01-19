App = function(b, e, f) {
  EditorUi.call(this, b, e, null != f ? f : '1' == urlParams.lightbox || 'min' == uiTheme && '0' != urlParams.chrome);
  mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || (window.onunload = mxUtils.bind(this, function() {
    var c = this.getCurrentFile();
    if (null != c && c.isModified()) {
      var k = {
        category: 'DISCARD-FILE-' + c.getHash(),
        action: (c.savingFile ? 'saving' : '') + (c.savingFile && null != c.savingFileTime ? '_' + Math.round((Date.now() - c.savingFileTime.getTime()) / 1000) : '') + (null != c.saveLevel ? '-sl_' + c.saveLevel : '') + '-age_' + (null != c.ageStart ? Math.round((Date.now() - c.ageStart.getTime()) / 1000) : 'x') + (this.editor.autosave ? '' : '-nosave') + (c.isAutosave() ? '' : '-noauto') + '-open_' + (null != c.opened ? Math.round((Date.now() - c.opened.getTime()) / 1000) : 'x') + '-save_' + (null != c.lastSaved ? Math.round((Date.now() - c.lastSaved.getTime()) / 1000) : 'x') + '-change_' + (null != c.lastChanged ? Math.round((Date.now() - c.lastChanged.getTime()) / 1000) : 'x') + '-alive_' + Math.round((Date.now() - App.startTime.getTime()) / 1000),
        label: null != c.sync ? 'client_' + c.sync.clientId : 'nosync'
      };
      c.constructor == DriveFile && null != c.desc && null != this.drive && (k.label += (null != this.drive.user ? '-user_' + this.drive.user.id : '-nouser') + '-rev_' + c.desc.headRevisionId + '-mod_' + c.desc.modifiedDate + '-size_' + c.getSize() + '-mime_' + c.desc.mimeType);
      EditorUi.logEvent(k);
    }
  }));
  this.editor.addListener('autosaveChanged', mxUtils.bind(this, function() {
    var c = this.getCurrentFile();
    null != c && EditorUi.logEvent({
      category: (this.editor.autosave ? 'ON' : 'OFF') + '-AUTOSAVE-FILE-' + c.getHash(),
      action: 'changed',
      label: 'autosave_' + (this.editor.autosave ? 'on' : 'off')
    });
  }));
  mxClient.IS_SVG ? mxGraph.prototype.warningImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE7SURBVHjaYvz//z8DJQAggBjwGXDuHMP/tWuD/uPTCxBAOA0AaQRK/f/+XeJ/cbHlf1wGAAQQTgPu3QNLgfHSpZo4DQAIIKwGwGyH4e/fFbG6AiQJEEAs2Ew2NFzH8OOHBMO6dT/A/KCg7wxGRh+wuhQggDBcALMdFIAcHBxgDGJjcwVIIUAAYbhAUXEdVos4OO4DXcGBIQ4QQCguQPY7sgtgAYruCpAgQACx4LJdU1OCwctLEcyWlLwPJF+AXQE0EMUBAAEEdwF6yMOiD4RRY0QT7gqQAEAAseDzu6XldYYPH9DD4joQa8L5AAEENgWb7SBcXa0JDQMBrK4AcQACiAlfyOMCEFdAnAYQQEz4FLa0XGf4/v0H0IIPONUABBAjyBmMjIwMS5cK/L927QORbtBkaG29DtYLEGAAH6f7oq3Zc+kAAAAASUVORK5CYII=' : new Image().src = mxGraph.prototype.warningImage.src;
  window.openWindow = mxUtils.bind(this, function(c, k, m) {
    if ('1' == urlParams.openInSameWin || navigator.standalone)
      m();
    else {
      var t = null;
      try {
        t = window.open(c);
      } catch (y) {}
      null == t || void 0 === t ? this.showDialog(new PopupDialog(this, c, k, m).container, 320, 140, !0, !0) : null != k && k();
    }
  });
  this.updateDocumentTitle();
  this.updateUi();
  window.showOpenAlert = mxUtils.bind(this, function(c) {
    null != window.openFile && window.openFile.cancel(!0);
    this.handleError(c);
  });
  this.editor.chromeless && !this.editor.editable || this.addFileDropHandler([document]);
  if (null != App.DrawPlugins) {
    for (b = 0; b < App.DrawPlugins.length; b++)
      try {
        App.DrawPlugins[b](this);
      } catch (c) {
        null != window.console && console.log('Plugin Error:', c, App.DrawPlugins[b]);
      } finally {
        App.embedModePluginsCount--, this.initializeEmbedMode();
      }
    window.Draw.loadPlugin = mxUtils.bind(this, function(c) {
      try {
        c(this);
      } finally {
        App.embedModePluginsCount--, this.initializeEmbedMode();
      }
    });
    setTimeout(mxUtils.bind(this, function() {
      0 < App.embedModePluginsCount && (App.embedModePluginsCount = 0, this.initializeEmbedMode());
    }), 5000);
  }
  this.load();
};
App.ERROR_TIMEOUT = 'timeout';
App.ERROR_BUSY = 'busy';
App.ERROR_UNKNOWN = 'unknown';
App.MODE_GOOGLE = 'google';
App.MODE_DROPBOX = 'dropbox';
App.MODE_ONEDRIVE = 'onedrive';
App.MODE_GITHUB = 'github';
App.MODE_GITLAB = 'gitlab';
App.MODE_DEVICE = 'device';
App.MODE_BROWSER = 'browser';
App.MODE_TRELLO = 'trello';
App.MODE_EMBED = 'embed';
App.MODE_ATLAS = 'atlas';
App.DROPBOX_APPKEY = window.DRAWIO_DROPBOX_ID;
App.DROPBOX_URL = window.DRAWIO_BASE_URL + '/js/dropbox/Dropbox-sdk.min.js';
App.DROPINS_URL = 'https://www.dropbox.com/static/api/2/dropins.js';
App.ONEDRIVE_URL = mxClient.IS_IE11 ? 'https://js.live.net/v7.2/OneDrive.js' : window.DRAWIO_BASE_URL + '/js/onedrive/OneDrive.js';
App.TRELLO_URL = 'https://api.trello.com/1/client.js';
App.TRELLO_JQUERY_URL = window.DRAWIO_BASE_URL + '/js/jquery/jquery-3.6.0.min.js';
App.PUSHER_KEY = '1e756b07a690c5bdb054';
App.PUSHER_CLUSTER = 'eu';
App.PUSHER_URL = 'https://js.pusher.com/7.0.3/pusher.min.js';
App.SIMPLE_PEER_URL = window.DRAWIO_BASE_URL + '/js/simplepeer/simplepeer9.10.0.min.js';
App.GOOGLE_APIS = 'drive-share';
App.startTime = new Date();
App.pluginRegistry = {
  '4xAKTrabTpTzahoLthkwPNUn': 'plugins/explore.js',
  ex: 'plugins/explore.js',
  p1: 'plugins/p1.js',
  ac: 'plugins/connect.js',
  acj: 'plugins/connectJira.js',
  ac148: 'plugins/cConf-1-4-8.js',
  ac148cmnt: 'plugins/cConf-comments.js',
  voice: 'plugins/voice.js',
  tips: 'plugins/tooltips.js',
  svgdata: 'plugins/svgdata.js',
  electron: 'plugins/electron.js',
  number: 'plugins/number.js',
  sql: 'plugins/sql.js',
  props: 'plugins/props.js',
  text: 'plugins/text.js',
  anim: 'plugins/animation.js',
  update: 'plugins/update.js',
  trees: 'plugins/trees/trees.js',
  'import': 'plugins/import.js',
  replay: 'plugins/replay.js',
  anon: 'plugins/anonymize.js',
  tr: 'plugins/trello.js',
  f5: 'plugins/rackF5.js',
  tickets: 'plugins/tickets.js',
  flow: 'plugins/flow.js',
  webcola: 'plugins/webcola/webcola.js',
  rnd: 'plugins/random.js',
  page: 'plugins/page.js',
  gd: 'plugins/googledrive.js',
  tags: 'plugins/tags.js'
};
App.publicPlugin = 'ex voice tips svgdata number sql props text anim update trees replay anon tickets flow webcola tags'.split(' ');
App.loadScripts = function(b, e) {
  for (var f = b.length, c = 0; c < b.length; c++)
    mxscript(b[c], function() {
      0 == --f && null != e && e();
    });
};
App.getStoredMode = function() {
  var b = null;
  null == b && isLocalStorage && (b = localStorage.getItem('.mode'));
  if (null == b && 'undefined' != typeof Storage) {
    for (var e = document.cookie.split(';'), f = 0; f < e.length; f++) {
      var c = mxUtils.trim(e[f]);
      if ('MODE=' == c.substring(0, 5)) {
        b = c.substring(5);
        break;
      }
    }
    null != b && isLocalStorage && (e = new Date(), e.setYear(e.getFullYear() - 1), document.cookie = 'MODE=; expires=' + e.toUTCString(), localStorage.setItem('.mode', b));
  }
  return b;
};
(function() {
  mxClient.IS_CHROMEAPP || ('1' != urlParams.offline && ('db.draw.io' == window.location.hostname && null == urlParams.mode && (urlParams.mode = 'dropbox'), App.mode = urlParams.mode), null == App.mode && (App.mode = App.getStoredMode()), null != window.mxscript && '1' != urlParams.embed && ('function' === typeof window.DriveClient && ('0' != urlParams.gapi && isSvgBrowser && (null == document.documentMode || 10 <= document.documentMode) ? App.mode == App.MODE_GOOGLE || null != urlParams.state && '' == window.location.hash || null != window.location.hash && '#G' == window.location.hash.substring(0, 2) ? mxscript('https://apis.google.com/js/api.js') : '0' != urlParams.chrome || null != window.location.hash && '#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D' === window.location.hash.substring(0, 45) || (window.DriveClient = null) : window.DriveClient = null), 'function' === typeof window.DropboxClient && ('0' != urlParams.db && isSvgBrowser && (null == document.documentMode || 9 < document.documentMode) ? App.mode == App.MODE_DROPBOX || null != window.location.hash && '#D' == window.location.hash.substring(0, 2) ? mxscript(App.DROPBOX_URL, function() {
    mxscript(App.DROPINS_URL, null, 'dropboxjs', App.DROPBOX_APPKEY, !0);
  }) : '0' == urlParams.chrome && (window.DropboxClient = null) : window.DropboxClient = null), 'function' === typeof window.OneDriveClient && ('0' != urlParams.od && (null == navigator.userAgent || 0 > navigator.userAgent.indexOf('MSIE') || 10 <= document.documentMode) ? App.mode == App.MODE_ONEDRIVE || null != window.location.hash && '#W' == window.location.hash.substring(0, 2) ? mxscript(App.ONEDRIVE_URL) : '0' == urlParams.chrome && (window.OneDriveClient = null) : window.OneDriveClient = null), 'function' === typeof window.TrelloClient && ('1' == urlParams.tr && isSvgBrowser && !mxClient.IS_IE11 && (null == document.documentMode || 10 <= document.documentMode) ? App.mode == App.MODE_TRELLO || null != window.location.hash && '#T' == window.location.hash.substring(0, 2) ? mxscript(App.TRELLO_JQUERY_URL, function() {
    mxscript(App.TRELLO_URL);
  }) : '0' == urlParams.chrome && (window.TrelloClient = null) : window.TrelloClient = null)));
}());
App.clearServiceWorker = function(b, e) {
  navigator.serviceWorker.getRegistrations().then(function(f) {
    if (null != f && 0 < f.length) {
      for (var c = 0; c < f.length; c++)
        f[c].unregister();
      null != b && b();
    }
  })['catch'](function() {
    null != e && e();
  });
};
App.isSameDomain = function(b) {
  var e = document.createElement('a');
  e.href = b;
  return e.protocol === window.location.protocol || e.host === window.location.host;
};
App.isBuiltInPlugin = function(b) {
  for (var e in App.pluginRegistry)
    if (App.pluginRegistry[e] == b)
      return !0;
  return !1;
};
App.main = function(b, e) {
  try {
    var f = function() {
        try {
          if (null != mxSettings.settings) {
            document.body.style.backgroundColor = 'atlas' == Editor.currentTheme || 'kennedy' == uiTheme || Editor.isAutoDarkMode() || !Editor.isDarkMode() && !mxSettings.settings.darkMode ? '#ffffff' : Editor.darkColor;
            if (null != mxSettings.settings.autosaveDelay) {
              var G = parseInt(mxSettings.settings.autosaveDelay);
              !isNaN(G) && 0 < G ? (DrawioFile.prototype.autosaveDelay = G, EditorUi.debug('Setting autosaveDelay', G)) : EditorUi.debug('Invalid autosaveDelay', G);
            }
            null != mxSettings.settings.defaultEdgeLength && (G = parseInt(mxSettings.settings.defaultEdgeLength), !isNaN(G) && 0 < G ? (Graph.prototype.defaultEdgeLength = G, EditorUi.debug('Using defaultEdgeLength', G)) : EditorUi.debug('Invalid defaultEdgeLength', G));
          }
        } catch (g) {
          null == window.console || EditorUi.isElectronApp ? (mxLog.show(), mxLog.debug(g.stack)) : console.error(g);
        }
        try {
          if (null != Menus.prototype.defaultFonts)
            for (G = 0; G < Menus.prototype.defaultFonts.length; G++) {
              var d = Menus.prototype.defaultFonts[G];
              'string' !== typeof d && null != d.fontFamily && null != d.fontUrl && Graph.addFont(d.fontFamily, d.fontUrl);
            }
          mxResources.loadDefaultBundle = !1;
          c(mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) || mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage));
        } catch (g) {
          null == window.console || EditorUi.isElectronApp ? (mxLog.show(), mxLog.debug(g.stack)) : console.error(g);
        }
      },
      c = function(G) {
        mxUtils.getAll('1' != urlParams.dev ? [G] : [
          G,
          STYLE_PATH + '/default.xml'
        ], function(d) {
          function g() {
            try {
              var C = null != e ? e() : new App(new Editor('0' == urlParams.chrome || 'min' == uiTheme, null, null, null, '0' != urlParams.chrome));
              if (null != window.mxscript) {
                if ('function' === typeof window.DropboxClient && null == window.Dropbox && null != window.DrawDropboxClientCallback && ('1' != urlParams.embed && '0' != urlParams.db || '1' == urlParams.embed && '1' == urlParams.db) && isSvgBrowser && (null == document.documentMode || 9 < document.documentMode))
                  mxscript(App.DROPBOX_URL, function() {
                    mxscript(App.DROPINS_URL, function() {
                      DrawDropboxClientCallback();
                    }, 'dropboxjs', App.DROPBOX_APPKEY);
                  });
                else if ('undefined' === typeof window.Dropbox || 'undefined' === typeof window.Dropbox.choose)
                  window.DropboxClient = null;
                'function' === typeof window.OneDriveClient && 'undefined' === typeof OneDrive && null != window.DrawOneDriveClientCallback && ('1' != urlParams.embed && '0' != urlParams.od || '1' == urlParams.embed && '1' == urlParams.od) && (null == navigator.userAgent || 0 > navigator.userAgent.indexOf('MSIE') || 10 <= document.documentMode) ? mxscript(App.ONEDRIVE_URL, window.DrawOneDriveClientCallback) : 'undefined' === typeof window.OneDrive && (window.OneDriveClient = null);
                'function' === typeof window.TrelloClient && !mxClient.IS_IE11 && 'undefined' === typeof window.Trello && null != window.DrawTrelloClientCallback && '1' == urlParams.tr && (null == navigator.userAgent || 0 > navigator.userAgent.indexOf('MSIE') || 10 <= document.documentMode) ? mxscript(App.TRELLO_JQUERY_URL, function() {
                  mxscript(App.TRELLO_URL, function() {
                    DrawTrelloClientCallback();
                  });
                }) : 'undefined' === typeof window.Trello && (window.TrelloClient = null);
              }
              null != b && b(C);
              '0' != urlParams.chrome && '1' == urlParams.test && (EditorUi.debug('App.start', [
                C,
                new Date().getTime() - t0.getTime() + 'ms'
              ]), null != urlParams['export'] && EditorUi.debug('Export:', EXPORT_URL));
            } catch (F) {
              null == window.console || EditorUi.isElectronApp ? (mxLog.show(), mxLog.debug(F.stack)) : console.error(F);
            }
          }
          mxResources.parse(d[0].getText());
          if (isLocalStorage && null != localStorage && null != window.location.hash && '#_CONFIG_' == window.location.hash.substring(0, 9))
            try {
              var n = JSON.parse(Graph.decompress(window.location.hash.substring(9)));
              if (null != n) {
                EditorUi.debug('Setting configuration', JSON.stringify(n));
                if (null != n.merge) {
                  var v = localStorage.getItem(Editor.configurationKey);
                  if (null != v)
                    try {
                      var u = JSON.parse(v),
                        x;
                      for (x in n.merge)
                        u[x] = n.merge[x];
                      n = u;
                    } catch (C) {
                      window.location.hash = '', alert(C);
                    }
                  else
                    n = n.merge;
                }
                confirm(mxResources.get('configLinkWarn')) && confirm(mxResources.get('configLinkConfirm')) && (localStorage.setItem(Editor.configurationKey, JSON.stringify(n)), window.location.hash = '', window.location.reload());
              }
              window.location.hash = '';
            } catch (C) {
              window.location.hash = '', alert(C);
            }
          1 < d.length && (Graph.prototype.defaultThemes['default-style2'] = d[1].getDocumentElement(), Graph.prototype.defaultThemes.darkTheme = d[1].getDocumentElement());
          '1' == urlParams.dev || EditorUi.isElectronApp ? g() : (mxStencilRegistry.allowEval = !1, App.loadScripts([
            'js/shapes-14-6-5.min.js',
            'js/stencils.min.js',
            'js/extensions.min.js'
          ], g));
        }, function(d) {
          d = document.getElementById('geStatus');
          null != d && (d.innerHTML = 'Error loading page. <a>Please try refreshing.</a>', d.getElementsByTagName('a')[0].onclick = function() {
            mxLanguage = 'en';
            c(mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) || mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage));
          });
        });
      };
    window.onerror = function(G, d, g, n, v) {
      EditorUi.logError('Global: ' + (null != G ? G : ''), d, g, n, v, null, !0);
    };
    if (window.top != window.self || 'import.diagrams.net' !== window.location.hostname && 'ac.draw.io' !== window.location.hostname && 'aj.draw.io' !== window.location.hostname) {
      if ('1' == urlParams.embed || '1' == urlParams.lightbox) {
        var k = document.getElementById('geInfo');
        null != k && k.parentNode.removeChild(k);
      }
      null != document.referrer && 'aws3' == urlParams.libs && 'https://aws.amazon.com/architecture/icons/' == document.referrer.substring(0, 42) && (urlParams.libs = 'aws4');
      if (null != window.mxscript) {
        if ('1' == urlParams.dev && !mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp && null != CryptoJS && App.mode != App.MODE_DROPBOX && App.mode != App.MODE_TRELLO) {
          var m = document.getElementsByTagName('script');
          if (null != m && 0 < m.length) {
            var t = mxUtils.getTextContent(m[0]);
            '1f536e2400baaa30261b8c3976d6fe06' != CryptoJS.MD5(t).toString() && (console.log('Change bootstrap script MD5 in the previous line:', CryptoJS.MD5(t).toString()), alert('[Dev] Bootstrap script change requires update of CSP'));
          }
          null != m && 1 < m.length && (t = mxUtils.getTextContent(m[m.length - 1]), 'd53805dd6f0bbba2da4966491ca0a505' != CryptoJS.MD5(t).toString() && (console.log('Change main script MD5 in the previous line:', CryptoJS.MD5(t).toString()), alert('[Dev] Main script change requires update of CSP')));
        }
        try {
          Editor.enableServiceWorker && ('0' == urlParams.offline || /www\.draw\.io$/.test(window.location.hostname) || '1' != urlParams.offline && '1' == urlParams.dev) ? App.clearServiceWorker(function() {
            '0' == urlParams.offline && alert('Cache cleared');
          }) : Editor.enableServiceWorker && navigator.serviceWorker.register('service-worker.js');
        } catch (G) {
          null == window.console || EditorUi.isElectronApp ? (mxLog.show(), mxLog.debug(G.stack)) : console.error(G);
        }!('ArrayBuffer' in window) || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || 'auto' != DrawioFile.SYNC || '1' == urlParams.embed && '1' != urlParams.embedRT || '1' == urlParams.local || '0' == urlParams.chrome && '1' != urlParams.rt || '1' == urlParams.stealth || '1' == urlParams.offline || (mxscript(App.PUSHER_URL), '1' == urlParams['fast-sync'] && mxscript(App.SIMPLE_PEER_URL));
        if ('0' != urlParams.plugins && '1' != urlParams.offline) {
          var y = null != mxSettings.settings ? mxSettings.getPlugins() : null;
          if (null == mxSettings.settings && isLocalStorage && 'undefined' !== typeof JSON)
            try {
              var E = JSON.parse(localStorage.getItem(mxSettings.key));
              null != E && (y = E.plugins);
            } catch (G) {}
          E = urlParams.p;
          App.initPluginCallback();
          null != E && App.loadPlugins(E.split(';'));
          if (null != y && 0 < y.length && '0' != urlParams.plugins)
            for (k = 0; k < y.length; k++)
              try {
                ('/' == y[k].charAt(0) && (y[k] = PLUGINS_BASE_PATH + y[k]), App.isSameDomain(y[k])) ? ALLOW_CUSTOM_PLUGINS || App.isBuiltInPlugin(y[k]) ? null == App.pluginsLoaded[y[k]] && (App.pluginsLoaded[y[k]] = !0, App.embedModePluginsCount++, mxscript(y[k])) : null != window.console && console.log('Unknown plugin:', y[k]): null != window.console && console.log('Blocked plugin:', y[k]);
              } catch (G) {}
        }
        'function' === typeof window.DriveClient && 'undefined' === typeof gapi && ('1' != urlParams.embed && '0' != urlParams.gapi || '1' == urlParams.embed && '1' == urlParams.gapi) && isSvgBrowser && isLocalStorage && (null == document.documentMode || 10 <= document.documentMode) ? mxscript('https://apis.google.com/js/api.js?onload=DrawGapiClientCallback', null, null, null, mxClient.IS_SVG) : 'undefined' === typeof window.gapi && (window.DriveClient = null);
      }
      '0' != urlParams.math && Editor.initMath();
      if ('1' == urlParams.configure) {
        var z = window.opener || window.parent,
          D = function(G) {
            if (G.source == z)
              try {
                var d = JSON.parse(G.data);
                null != d && 'configure' == d.action && (mxEvent.removeListener(window, 'message', D), Editor.configure(d.config), mxSettings.load(), d.colorSchemeMeta && mxmeta('color-scheme', 'dark light'), f());
              } catch (g) {
                null != window.console && console.log('Error in configure message: ' + g, G.data);
              }
          };
        mxEvent.addListener(window, 'message', D);
        z.postMessage(JSON.stringify({
          event: 'configure'
        }), '*');
      } else {
        if (null == Editor.config) {
          if (null != window.DRAWIO_CONFIG)
            try {
              EditorUi.debug('Using global configuration', window.DRAWIO_CONFIG), Editor.configure(window.DRAWIO_CONFIG), mxSettings.load();
            } catch (G) {
              null == window.console || EditorUi.isElectronApp ? (mxLog.show(), mxLog.debug(G.stack)) : console.error(G);
            }
          if (isLocalStorage && null != localStorage && '1' != urlParams.embed) {
            var J = localStorage.getItem(Editor.configurationKey);
            if (null != J)
              try {
                J = JSON.parse(J), null != J && (EditorUi.debug('Using local configuration', J), Editor.configure(J), mxSettings.load());
              } catch (G) {
                null == window.console || EditorUi.isElectronApp ? (mxLog.show(), mxLog.debug(G.stack)) : console.error(G);
              }
          }
        }
        f();
      }
    } else
      document.body.innerHTML = '<div style="margin-top:10%;text-align:center;">Stand-alone mode not allowed for this domain.</div>';
  } catch (G) {
    null == window.console || EditorUi.isElectronApp ? (mxLog.show(), mxLog.debug(G.stack)) : console.error(G);
  }
};
mxUtils.extend(App, EditorUi);
App.prototype.defaultUserPicture = IMAGE_PATH + '/default-user.jpg';
App.prototype.shareImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowOTgwMTE3NDA3MjA2ODExODhDNkFGMDBEQkQ0RTgwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMjU2NzdEMTcwRDIxMUUxQjc0MDkxRDhCNUQzOEFGRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMjU2NzdEMDcwRDIxMUUxQjc0MDkxRDhCNUQzOEFGRCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjgwMTE3NDA3MjA2ODExODcxRkM4MUY1OTFDMjQ5OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNzgwMTE3NDA3MjA2ODExODhDNkFGMDBEQkQ0RTgwOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrM/fs0AAADgSURBVHjaYmDAA/7//88MwgzkAKDGFiD+BsQ/QWxSNaf9RwN37twpI8WAS+gGfP78+RpQSoRYA36iG/D379+vQClNdLVMOMz4gi7w79+/n0CKg1gD9qELvH379hzIHGK9oA508ieY8//8+fO5rq4uFCilRKwL1JmYmNhhHEZGRiZ+fn6Q2meEbDYG4u3/cYCfP38uA7kOm0ZOIJ7zn0jw48ePPiDFhmzArv8kgi9fvuwB+w5qwH9ykjswbFSZyM4sEMDPBDTlL5BxkFSd7969OwZ2BZKYGhDzkmjOJ4AAAwBhpRqGnEFb8QAAAABJRU5ErkJggg==';
App.prototype.chevronUpImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDg2NEE3NUY1MUVBMTFFM0I3MUVEMTc0N0YyOUI4QzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDg2NEE3NjA1MUVBMTFFM0I3MUVEMTc0N0YyOUI4QzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0ODY0QTc1RDUxRUExMUUzQjcxRUQxNzQ3RjI5QjhDMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0ODY0QTc1RTUxRUExMUUzQjcxRUQxNzQ3RjI5QjhDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg+qUokAAAAMUExURQAAANnZ2b+/v////5bgre4AAAAEdFJOU////wBAKqn0AAAAL0lEQVR42mJgRgMMRAswMKAKMDDARBjg8lARBoR6KImkH0wTbygT6YaS4DmAAAMAYPkClOEDDD0AAAAASUVORK5CYII=';
App.prototype.chevronDownImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDg2NEE3NUI1MUVBMTFFM0I3MUVEMTc0N0YyOUI4QzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDg2NEE3NUM1MUVBMTFFM0I3MUVEMTc0N0YyOUI4QzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0ODY0QTc1OTUxRUExMUUzQjcxRUQxNzQ3RjI5QjhDMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0ODY0QTc1QTUxRUExMUUzQjcxRUQxNzQ3RjI5QjhDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsCtve8AAAAMUExURQAAANnZ2b+/v////5bgre4AAAAEdFJOU////wBAKqn0AAAALUlEQVR42mJgRgMMRAkwQEXBNAOcBSPhclB1cNVwfcxI+vEZykSpoSR6DiDAAF23ApT99bZ+AAAAAElFTkSuQmCC';
App.prototype.formatShowImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODdCREY5REY1NkQ3MTFFNTkyNjNEMTA5NjgwODUyRTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODdCREY5RTA1NkQ3MTFFNTkyNjNEMTA5NjgwODUyRTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4N0JERjlERDU2RDcxMUU1OTI2M0QxMDk2ODA4NTJFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4N0JERjlERTU2RDcxMUU1OTI2M0QxMDk2ODA4NTJFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlnMQ/8AAAAJUExURQAAAP///3FxcTfTiAsAAAACdFJOU/8A5bcwSgAAACFJREFUeNpiYEQDDEQJMMABTAAixcQ00ALoDiPRcwABBgB6DADly9Yx8wAAAABJRU5ErkJggg==';
App.prototype.formatHideImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODdCREY5REI1NkQ3MTFFNTkyNjNEMTA5NjgwODUyRTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODdCREY5REM1NkQ3MTFFNTkyNjNEMTA5NjgwODUyRTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4N0JERjlEOTU2RDcxMUU1OTI2M0QxMDk2ODA4NTJFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4N0JERjlEQTU2RDcxMUU1OTI2M0QxMDk2ODA4NTJFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqjT9SMAAAAGUExURQAAAP///6XZn90AAAACdFJOU/8A5bcwSgAAAB9JREFUeNpiYEQDDEQJMMABTAAmNdAC6A4j0XMAAQYAcbwA1Xvj1CgAAAAASUVORK5CYII=';
App.prototype.warnInterval = 300000;
App.prototype.compactMode = !1;
App.prototype.fullscreenMode = !1;
'1' != urlParams.embed ? App.prototype.menubarHeight = 64 : App.prototype.footerHeight = 0;
App.initPluginCallback = function() {
  null == App.DrawPlugins && (App.DrawPlugins = [], window.Draw = {}, window.Draw.loadPlugin = function(b) {
    App.DrawPlugins.push(b);
  });
};
App.pluginsLoaded = {};
App.embedModePluginsCount = 0;
App.loadPlugins = function(b, e) {
  EditorUi.debug('Loading plugins', b);
  for (var f = 0; f < b.length; f++)
    if (null != b[f] && 0 < b[f].length)
      try {
        if (null != App.pluginRegistry[b[f]]) {
          var c = PLUGINS_BASE_PATH + App.pluginRegistry[b[f]];
          null == App.pluginsLoaded[c] && (App.pluginsLoaded[c] = !0, App.embedModePluginsCount++, 'undefined' === typeof window.drawDevUrl ? e ? mxinclude(c) : mxscript(c) : e ? mxinclude(c) : mxscript(drawDevUrl + c));
        } else
          null != window.console && console.log('Unknown plugin:', b[f]);
      } catch (k) {
        null != window.console && console.log('Error loading plugin:', b[f], k);
      }
};
App.prototype.initializeEmbedMode = function() {
  '1' == urlParams.embed && ('app.diagrams.net' == window.location.hostname && this.showBanner('EmbedDeprecationFooter', 'app.diagrams.net will stop working for embed mode. Please use embed.diagrams.net.'), 0 < App.embedModePluginsCount || this.initEmbedDone || (this.initEmbedDone = !0, EditorUi.prototype.initializeEmbedMode.apply(this, arguments)));
};
App.prototype.initializeViewerMode = function() {
  var b = window.opener || window.parent;
  null != b && this.editor.graph.addListener(mxEvent.SIZE, mxUtils.bind(this, function() {
    b.postMessage(JSON.stringify(this.createLoadMessage('size')), '*');
  }));
};
App.prototype.init = function() {
  EditorUi.prototype.init.apply(this, arguments);
  this.defaultLibraryName = mxResources.get('untitledLibrary');
  this.descriptorChangedListener = mxUtils.bind(this, this.descriptorChanged);
  this.gitHub = mxClient.IS_IE && 10 != document.documentMode && !mxClient.IS_IE11 && !mxClient.IS_EDGE || '0' == urlParams.gh || '1' == urlParams.embed && '1' != urlParams.gh ? null : new GitHubClient(this);
  null != this.gitHub && this.gitHub.addListener('userChanged', mxUtils.bind(this, function() {
    this.updateUserElement();
    this.restoreLibraries();
  }));
  this.addListener('currentThemeChanged', mxUtils.bind(this, function() {
    this.compactMode && this.isDefaultTheme(Editor.currentTheme) && this.toggleCompactMode(!0);
  }));
  this.gitLab = mxClient.IS_IE && 10 != document.documentMode && !mxClient.IS_IE11 && !mxClient.IS_EDGE || '0' == urlParams.gl || '1' == urlParams.embed && '1' != urlParams.gl ? null : new GitLabClient(this);
  null != this.gitLab && this.gitLab.addListener('userChanged', mxUtils.bind(this, function() {
    this.updateUserElement();
    this.restoreLibraries();
  }));
  if ('1' != urlParams.embed || '1' == urlParams.od) {
    var b = mxUtils.bind(this, function() {
      'undefined' !== typeof OneDrive ? (this.oneDrive = new OneDriveClient(this), this.oneDrive.addListener('userChanged', mxUtils.bind(this, function() {
        this.updateUserElement();
        this.restoreLibraries();
      })), this.fireEvent(new mxEventObject('clientLoaded', 'client', this.oneDrive))) : null == window.DrawOneDriveClientCallback && (window.DrawOneDriveClientCallback = b);
    });
    b();
  }
  if ('1' != urlParams.embed || '1' == urlParams.tr) {
    var e = mxUtils.bind(this, function() {
      if ('undefined' !== typeof window.Trello)
        try {
          this.trello = new TrelloClient(this), this.trello.addListener('userChanged', mxUtils.bind(this, function() {
            this.updateUserElement();
            this.restoreLibraries();
          })), this.fireEvent(new mxEventObject('clientLoaded', 'client', this.trello));
        } catch (m) {
          null != window.console && console.error(m);
        }
      else
        null == window.DrawTrelloClientCallback && (window.DrawTrelloClientCallback = e);
    });
    e();
  }
  if ('1' != urlParams.embed || '1' == urlParams.gapi) {
    var f = mxUtils.bind(this, function() {
      if ('undefined' !== typeof gapi) {
        var m = mxUtils.bind(this, function() {
          this.drive = new DriveClient(this);
          this.drive.addListener('userChanged', mxUtils.bind(this, function() {
            this.updateUserElement();
            this.restoreLibraries();
            this.checkLicense();
          }));
          this.fireEvent(new mxEventObject('clientLoaded', 'client', this.drive));
        });
        null != window.DrawGapiClientCallback ? (gapi.load(('0' != urlParams.picker ? 'picker,' : '') + App.GOOGLE_APIS, m), window.DrawGapiClientCallback = null) : m();
      } else
        null == window.DrawGapiClientCallback && (window.DrawGapiClientCallback = f);
    });
    f();
  }
  if ('1' != urlParams.embed || '1' == urlParams.db) {
    var c = mxUtils.bind(this, function() {
      if ('function' === typeof Dropbox && 'undefined' !== typeof Dropbox.choose) {
        window.DrawDropboxClientCallback = null;
        try {
          this.dropbox = new DropboxClient(this), this.dropbox.addListener('userChanged', mxUtils.bind(this, function() {
            this.updateUserElement();
            this.restoreLibraries();
          })), this.fireEvent(new mxEventObject('clientLoaded', 'client', this.dropbox));
        } catch (m) {
          null != window.console && console.error(m);
        }
      } else
        null == window.DrawDropboxClientCallback && (window.DrawDropboxClientCallback = c);
    });
    c();
  }
  if ('1' != urlParams.embed) {
    if (this.bg = this.createBackground(), document.body.appendChild(this.bg), this.diagramContainer.style.visibility = 'hidden', this.formatContainer.style.visibility = 'hidden', this.hsplit.style.display = 'none', this.sidebarContainer.style.display = 'none', '1' == urlParams.local ? this.setMode(App.MODE_DEVICE) : this.mode = App.mode, 'serviceWorker' in navigator && !this.editor.isChromelessView() && (mxClient.IS_ANDROID || mxClient.IS_IOS) && window.addEventListener('beforeinstallprompt', mxUtils.bind(this, function(m) {
        this.showBanner('AddToHomeScreenFooter', mxResources.get('installApp'), function() {
          m.prompt();
        });
      })), mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || this.isOffline() || mxClient.IS_ANDROID || mxClient.IS_IOS || null != urlParams.open || this.editor.chromeless && !this.editor.editable || this.editor.addListener('fileLoaded', mxUtils.bind(this, function() {
        var m = this.getCurrentFile();
        m = null != m ? m.getMode() : null;
        '1' == urlParams.extAuth || m != App.MODE_DEVICE && m != App.MODE_BROWSER ? '1' != urlParams.embed && this.getServiceName() : this.isOwnDomain() && this.showDownloadDesktopBanner();
      })), !(mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || 'auto' != DrawioFile.SYNC || '1' == urlParams.local || '1' == urlParams.stealth || this.isOffline() || this.editor.chromeless && !this.editor.editable)) {
      var k = window.setTimeout(mxUtils.bind(this, function() {
        DrawioFile.SYNC = 'manual';
        var m = this.getCurrentFile();
        null != m && null != m.sync && (m.sync.destroy(), m.sync = null, m = mxUtils.htmlEntities(mxResources.get('timeout')), this.editor.setStatus('<div title="' + m + '" class="geStatusAlert">' + m + '</div>'));
        EditorUi.logEvent({
          category: 'TIMEOUT-CACHE-CHECK',
          action: 'timeout',
          label: 408
        });
      }), Editor.cacheTimeout);
      mxUtils.get(EditorUi.cacheUrl + '?alive', mxUtils.bind(this, function(m) {
        window.clearTimeout(k);
      }));
    }
  } else
    null != this.menubar && (this.menubar.container.style.paddingTop = '0px');
  this.updateHeader();
  null != this.menubar && (this.buttonContainer = this.createButtonContainer(), this.menubar.container.appendChild(this.buttonContainer), 'atlas' == Editor.currentTheme && this.toggleCompactMode(!1), 'atlas' == Editor.currentTheme || '1' == urlParams.atlas) && (this.icon = document.createElement('img'), this.icon.setAttribute('src', IMAGE_PATH + '/logo-flat-small.png'), this.icon.setAttribute('title', mxResources.get('draw.io')), this.icon.style.padding = '1' == urlParams.atlas ? '7px' : '6px', '1' != urlParams.embed && (this.icon.style.cursor = 'pointer', mxEvent.addListener(this.icon, 'click', mxUtils.bind(this, function(m) {
    this.appIconClicked(m);
  }))), this.menubar.container.insertBefore(this.icon, this.menubar.container.firstChild));
  this.editor.graph.isViewer() && this.initializeViewerMode();
};
App.prototype.scheduleSanityCheck = function() {
  mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || null != this.sanityCheckThread || (this.sanityCheckThread = window.setTimeout(mxUtils.bind(this, function() {
    this.sanityCheckThread = null;
    this.sanityCheck();
  }), this.warnInterval));
};
App.prototype.stopSanityCheck = function() {
  null != this.sanityCheckThread && (window.clearTimeout(this.sanityCheckThread), this.sanityCheckThread = null);
};
App.prototype.sanityCheck = function() {
  var b = this.getCurrentFile();
  if (null != b && b.isModified() && b.isAutosave() && b.isOverdue()) {
    var e = {
      category: 'WARN-FILE-' + b.getHash(),
      action: (b.savingFile ? 'saving' : '') + (b.savingFile && null != b.savingFileTime ? '_' + Math.round((Date.now() - b.savingFileTime.getTime()) / 1000) : '') + (null != b.saveLevel ? '-sl_' + b.saveLevel : '') + '-age_' + (null != b.ageStart ? Math.round((Date.now() - b.ageStart.getTime()) / 1000) : 'x') + (this.editor.autosave ? '' : '-nosave') + (b.isAutosave() ? '' : '-noauto') + '-open_' + (null != b.opened ? Math.round((Date.now() - b.opened.getTime()) / 1000) : 'x') + '-save_' + (null != b.lastSaved ? Math.round((Date.now() - b.lastSaved.getTime()) / 1000) : 'x') + '-change_' + (null != b.lastChanged ? Math.round((Date.now() - b.lastChanged.getTime()) / 1000) : 'x') + '-alive_' + Math.round((Date.now() - App.startTime.getTime()) / 1000),
      label: null != b.sync ? 'client_' + b.sync.clientId : 'nosync'
    };
    b.constructor == DriveFile && null != b.desc && null != this.drive && (e.label += (null != this.drive.user ? '-user_' + this.drive.user.id : '-nouser') + '-rev_' + b.desc.headRevisionId + '-mod_' + b.desc.modifiedDate + '-size_' + b.getSize() + '-mime_' + b.desc.mimeType);
    EditorUi.logEvent(e);
    e = mxResources.get('ensureDataSaved');
    null != b.lastSaved && (e = this.timeSince(b.lastSaved), null == e && (e = mxResources.get('lessThanAMinute')), e = mxResources.get('lastSaved', [e]));
    this.spinner.stop();
    this.showError(mxResources.get('unsavedChanges'), e, mxResources.get('ignore'), mxUtils.bind(this, function() {
      this.hideDialog();
    }), null, mxResources.get('save'), mxUtils.bind(this, function() {
      this.stopSanityCheck();
      this.actions.get(null != this.mode && b.isEditable() ? 'save' : 'saveAs').funct();
    }), null, null, 360, 120, null, mxUtils.bind(this, function() {
      this.scheduleSanityCheck();
    }));
  }
};
App.prototype.isOwnDomain = function() {
  return 'test.draw.io' == window.location.hostname || 'www.draw.io' == window.location.hostname || 'drive.draw.io' == window.location.hostname || 'stage.diagrams.net' == window.location.hostname || 'app.diagrams.net' == window.location.hostname || 'jgraph.github.io' == window.location.hostname;
};
App.prototype.isDriveDomain = function() {
  return '0' != urlParams.drive && this.isOwnDomain();
};
App.prototype.getPusher = function() {
  null == this.pusher && 'function' === typeof window.Pusher && (this.pusher = new Pusher(App.PUSHER_KEY, {
    cluster: App.PUSHER_CLUSTER,
    encrypted: !0
  }));
  return this.pusher;
};
App.prototype.showNameChangeBanner = function() {
  this.showBanner('DiagramsFooter', 'draw.io is now diagrams.net', mxUtils.bind(this, function() {
    this.openLink('https://www.diagrams.net/blog/move-diagrams-net');
  }));
};
App.prototype.showNameConfBanner = function() {
  this.showBanner('ConfFooter', 'Try draw.io for Confluence', mxUtils.bind(this, function() {
    this.openLink('https://marketplace.atlassian.com/apps/1210933/draw-io-diagrams-for-confluence');
  }), !0);
};
App.prototype.showDownloadDesktopBanner = function() {
  this.showBanner('DesktopFooter', mxResources.get('downloadDesktop'), mxUtils.bind(this, function() {
    this.openLink('https://get.diagrams.net/');
  }));
};
App.prototype.showRatingBanner = function() {
  if (!(this.bannerShowing || this.hideBannerratingFooter || isLocalStorage && null != mxSettings.settings && null != mxSettings.settings.closeratingFooter)) {
    var b = document.createElement('div');
    b.style.cssText = 'position:absolute;bottom:10px;left:50%;max-width:90%;padding:18px 34px 12px 20px;font-size:16px;font-weight:bold;white-space:nowrap;cursor:pointer;z-index:' + mxPopupMenu.prototype.zIndex + ';';
    mxUtils.setPrefixedStyle(b.style, 'box-shadow', '1px 1px 2px 0px #ddd');
    mxUtils.setPrefixedStyle(b.style, 'transform', 'translate(-50%,120%)');
    mxUtils.setPrefixedStyle(b.style, 'transition', 'all 1s ease');
    b.className = 'geBtn gePrimaryBtn';
    var e = document.createElement('img');
    e.setAttribute('src', Dialog.prototype.closeImage);
    e.setAttribute('title', mxResources.get('close'));
    e.setAttribute('border', '0');
    e.style.cssText = 'position:absolute;right:10px;top:12px;filter:invert(1);padding:6px;margin:-6px;cursor:default;';
    b.appendChild(e);
    mxUtils.write(b, 'Please rate us');
    document.body.appendChild(b);
    var f = document.createElement('img');
    f.setAttribute('border', '0');
    f.setAttribute('align', 'absmiddle');
    f.setAttribute('title', '1 star');
    f.setAttribute('style', 'margin-top:-6px;cursor:pointer;margin-left:8px;');
    f.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDktMDMtMTdUMTQ6MTI6MDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIIImu8AAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAHuSURBVDiNlZJBi1JRGIbfk+fc0ZuMXorJe4XujWoMdREaA23HICj6AQeLINr0C4I27ab27VqOI9+q/sH8gMDceG1RkIwgClEXFMbRc5zTZgZURmG+5fu9PN/7Hg6wZohoh4h21nn4uqXW+q0xZgzg+SrPlTXX73uet+26bp6ICpcGaK1fua57M5vN3tZav7gUgIiSqVTqcRAEm0EQbCaTyQoRXb3Iy4hoG8CT6XSaY4xtMMaSQohMPp8v+r7vAEC3243CMGwqpfoApsaYE8uyfgM45ABOjDEvXdfNlMvlzFINAIDneY7neZVzvdlsDgaDQYtzfsjOIjtKqU+e5+0Wi0V3VV8ACMOw3+/3v3HOX0sp/7K53te11h/S6fRuoVAIhBAL76OUOm2320dRFH0VQuxJKf8BAFu+UKvVvpRKpWe2bYt5fTweq0ajQUKIN1LK43N94SMR0Y1YLLYlhBBKqQUw51wkEol7WmuzoC8FuJtIJLaUUoii6Ljb7f4yxpz6vp9zHMe2bfvacDi8BeDHKkBuNps5rVbr52QyaVuW9ZExttHpdN73ej0/Ho+nADxYCdBaV0aj0RGAz5ZlHUgpx2erR/V6/d1wOHwK4CGA/QsBnPN9AN+llH+WkqFare4R0QGAO/M6M8Ysey81/wGqa8MlVvHPNAAAAABJRU5ErkJggg==');
    b.appendChild(f);
    var c = document.createElement('img');
    c.setAttribute('border', '0');
    c.setAttribute('align', 'absmiddle');
    c.setAttribute('title', '2 star');
    c.setAttribute('style', 'margin-top:-6px;margin-left:3px;cursor:pointer;');
    c.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDktMDMtMTdUMTQ6MTI6MDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIIImu8AAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAHuSURBVDiNlZJBi1JRGIbfk+fc0ZuMXorJe4XujWoMdREaA23HICj6AQeLINr0C4I27ab27VqOI9+q/sH8gMDceG1RkIwgClEXFMbRc5zTZgZURmG+5fu9PN/7Hg6wZohoh4h21nn4uqXW+q0xZgzg+SrPlTXX73uet+26bp6ICpcGaK1fua57M5vN3tZav7gUgIiSqVTqcRAEm0EQbCaTyQoRXb3Iy4hoG8CT6XSaY4xtMMaSQohMPp8v+r7vAEC3243CMGwqpfoApsaYE8uyfgM45ABOjDEvXdfNlMvlzFINAIDneY7neZVzvdlsDgaDQYtzfsjOIjtKqU+e5+0Wi0V3VV8ACMOw3+/3v3HOX0sp/7K53te11h/S6fRuoVAIhBAL76OUOm2320dRFH0VQuxJKf8BAFu+UKvVvpRKpWe2bYt5fTweq0ajQUKIN1LK43N94SMR0Y1YLLYlhBBKqQUw51wkEol7WmuzoC8FuJtIJLaUUoii6Ljb7f4yxpz6vp9zHMe2bfvacDi8BeDHKkBuNps5rVbr52QyaVuW9ZExttHpdN73ej0/Ho+nADxYCdBaV0aj0RGAz5ZlHUgpx2erR/V6/d1wOHwK4CGA/QsBnPN9AN+llH+WkqFare4R0QGAO/M6M8Ysey81/wGqa8MlVvHPNAAAAABJRU5ErkJggg==');
    b.appendChild(c);
    var k = document.createElement('img');
    k.setAttribute('border', '0');
    k.setAttribute('align', 'absmiddle');
    k.setAttribute('title', '3 star');
    k.setAttribute('style', 'margin-top:-6px;margin-left:3px;cursor:pointer;');
    k.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDktMDMtMTdUMTQ6MTI6MDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIIImu8AAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAHuSURBVDiNlZJBi1JRGIbfk+fc0ZuMXorJe4XujWoMdREaA23HICj6AQeLINr0C4I27ab27VqOI9+q/sH8gMDceG1RkIwgClEXFMbRc5zTZgZURmG+5fu9PN/7Hg6wZohoh4h21nn4uqXW+q0xZgzg+SrPlTXX73uet+26bp6ICpcGaK1fua57M5vN3tZav7gUgIiSqVTqcRAEm0EQbCaTyQoRXb3Iy4hoG8CT6XSaY4xtMMaSQohMPp8v+r7vAEC3243CMGwqpfoApsaYE8uyfgM45ABOjDEvXdfNlMvlzFINAIDneY7neZVzvdlsDgaDQYtzfsjOIjtKqU+e5+0Wi0V3VV8ACMOw3+/3v3HOX0sp/7K53te11h/S6fRuoVAIhBAL76OUOm2320dRFH0VQuxJKf8BAFu+UKvVvpRKpWe2bYt5fTweq0ajQUKIN1LK43N94SMR0Y1YLLYlhBBKqQUw51wkEol7WmuzoC8FuJtIJLaUUoii6Ljb7f4yxpz6vp9zHMe2bfvacDi8BeDHKkBuNps5rVbr52QyaVuW9ZExttHpdN73ej0/Ho+nADxYCdBaV0aj0RGAz5ZlHUgpx2erR/V6/d1wOHwK4CGA/QsBnPN9AN+llH+WkqFare4R0QGAO/M6M8Ysey81/wGqa8MlVvHPNAAAAABJRU5ErkJggg==');
    b.appendChild(k);
    var m = document.createElement('img');
    m.setAttribute('border', '0');
    m.setAttribute('align', 'absmiddle');
    m.setAttribute('title', '4 star');
    m.setAttribute('style', 'margin-top:-6px;margin-left:3px;cursor:pointer;');
    m.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDktMDMtMTdUMTQ6MTI6MDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIIImu8AAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAHuSURBVDiNlZJBi1JRGIbfk+fc0ZuMXorJe4XujWoMdREaA23HICj6AQeLINr0C4I27ab27VqOI9+q/sH8gMDceG1RkIwgClEXFMbRc5zTZgZURmG+5fu9PN/7Hg6wZohoh4h21nn4uqXW+q0xZgzg+SrPlTXX73uet+26bp6ICpcGaK1fua57M5vN3tZav7gUgIiSqVTqcRAEm0EQbCaTyQoRXb3Iy4hoG8CT6XSaY4xtMMaSQohMPp8v+r7vAEC3243CMGwqpfoApsaYE8uyfgM45ABOjDEvXdfNlMvlzFINAIDneY7neZVzvdlsDgaDQYtzfsjOIjtKqU+e5+0Wi0V3VV8ACMOw3+/3v3HOX0sp/7K53te11h/S6fRuoVAIhBAL76OUOm2320dRFH0VQuxJKf8BAFu+UKvVvpRKpWe2bYt5fTweq0ajQUKIN1LK43N94SMR0Y1YLLYlhBBKqQUw51wkEol7WmuzoC8FuJtIJLaUUoii6Ljb7f4yxpz6vp9zHMe2bfvacDi8BeDHKkBuNps5rVbr52QyaVuW9ZExttHpdN73ej0/Ho+nADxYCdBaV0aj0RGAz5ZlHUgpx2erR/V6/d1wOHwK4CGA/QsBnPN9AN+llH+WkqFare4R0QGAO/M6M8Ysey81/wGqa8MlVvHPNAAAAABJRU5ErkJggg==');
    b.appendChild(m);
    this.bannerShowing = !0;
    var t = mxUtils.bind(this, function() {
      null != b.parentNode && (b.parentNode.removeChild(b), this.bannerShowing = !1, this.hideBannerratingFooter = !0, isLocalStorage && null != mxSettings.settings && (mxSettings.settings.closeratingFooter = Date.now(), mxSettings.save()));
    });
    mxEvent.addListener(e, 'click', mxUtils.bind(this, function(y) {
      mxEvent.consume(y);
      t();
    }));
    mxEvent.addListener(f, 'click', mxUtils.bind(this, function(y) {
      mxEvent.consume(y);
      t();
    }));
    mxEvent.addListener(c, 'click', mxUtils.bind(this, function(y) {
      mxEvent.consume(y);
      t();
    }));
    mxEvent.addListener(k, 'click', mxUtils.bind(this, function(y) {
      mxEvent.consume(y);
      t();
    }));
    mxEvent.addListener(m, 'click', mxUtils.bind(this, function(y) {
      mxEvent.consume(y);
      window.open('https://marketplace.atlassian.com/apps/1210933/draw-io-diagrams-for-confluence?hosting=datacenter&tab=reviews');
      t();
    }));
    e = mxUtils.bind(this, function() {
      mxUtils.setPrefixedStyle(b.style, 'transform', 'translate(-50%,120%)');
      window.setTimeout(mxUtils.bind(this, function() {
        t();
      }), 1000);
    });
    window.setTimeout(mxUtils.bind(this, function() {
      mxUtils.setPrefixedStyle(b.style, 'transform', 'translate(-50%,0%)');
    }), 500);
    window.setTimeout(e, 60000);
  }
};
App.prototype.checkLicense = function() {
  var b = this.drive.getUser(),
    e = null != b ? b.email : null;
  if (!this.isOffline() && !this.editor.chromeless && null != e && null != b.id) {
    var f = e.lastIndexOf('@'),
      c = 0 <= f ? e.substring(f + 1) : '';
    b = Editor.crc32(b.id);
    mxUtils.post('/license', 'domain=' + encodeURIComponent(c) + '&id=' + encodeURIComponent(b) + '&ts=' + new Date().getTime(), mxUtils.bind(this, function(k) {
      try {
        if (200 <= k.getStatus() && 299 >= k.getStatus()) {
          var m = k.getText();
          if (0 < m.length) {
            var t = JSON.parse(m);
            null != t && this.handleLicense(t, c);
          }
        }
      } catch (y) {}
    }));
  }
};
App.prototype.handleLicense = function(b, e) {};
App.prototype.getEditBlankXml = function() {
  var b = this.getCurrentFile();
  return null != b && this.editor.isChromelessView() && this.editor.graph.isLightboxView() ? b.getData() : this.getFileData(!0);
};
App.prototype.updateActionStates = function() {
  EditorUi.prototype.updateActionStates.apply(this, arguments);
  this.actions.get('revisionHistory').setEnabled(this.isRevisionHistoryEnabled());
};
App.prototype.addRecent = function(b) {
  if (isLocalStorage && null != localStorage) {
    var e = this.getRecent();
    if (null == e)
      e = [];
    else
      for (var f = 0; f < e.length; f++)
        e[f].id == b.id && e.splice(f, 1);
    null != e && (e.unshift(b), e = e.slice(0, 10), localStorage.setItem('.recent', JSON.stringify(e)));
  }
};
App.prototype.getRecent = function() {
  if (isLocalStorage && null != localStorage) {
    try {
      var b = localStorage.getItem('.recent');
      if (null != b)
        return JSON.parse(b);
    } catch (e) {}
    return null;
  }
};
App.prototype.resetRecent = function(b) {
  if (isLocalStorage && null != localStorage)
    try {
      localStorage.removeItem('.recent');
    } catch (e) {}
};
App.prototype.onBeforeUnload = function() {
  if ('1' == urlParams.embed && this.editor.modified)
    return mxResources.get('allChangesLost');
  var b = this.getCurrentFile();
  if (null != b)
    if (b.constructor != LocalFile || '' != b.getHash() || b.isModified() || '1' == urlParams.nowarn || this.isDiagramEmpty() || null != urlParams.url || this.editor.isChromelessView() || null != b.fileHandle) {
      if (b.isModified())
        return mxResources.get('allChangesLost');
      b.close(!0);
    } else
      return mxResources.get('ensureDataSaved');
};
App.prototype.updateDocumentTitle = function() {
  if (!this.editor.graph.isLightboxView()) {
    var b = this.editor.appName,
      e = this.getCurrentFile();
    null != e && 'simple' == Editor.currentTheme && null != this.pages && null != this.currentPage ? b = this.getShortPageName(this.currentPage) : this.isOfflineApp() && (b += ' app');
    null != e && (b = (null != e.getTitle() ? e.getTitle() : this.defaultFilename) + ' - ' + b);
    document.title != b && (document.title = b, b = this.editor.graph, b.invalidateDescendantsWithPlaceholders(b.model.getRoot()), b.view.validate());
  }
};
App.prototype.getThumbnail = function(b, e) {
  var f = !1;
  try {
    var c = !0,
      k = window.setTimeout(mxUtils.bind(this, function() {
        c = !1;
        e(null);
      }), this.timeout),
      m = mxUtils.bind(this, function(A) {
        window.clearTimeout(k);
        c && e(A);
      });
    null == this.thumbImageCache && (this.thumbImageCache = {});
    var t = this.editor.graph,
      y = t.backgroundImage,
      E = null != t.themes && 'darkTheme' == t.defaultThemeName;
    if (null != this.pages && (E || this.currentPage != this.pages[0])) {
      var z = t.getGlobalVariable;
      t = this.createTemporaryGraph(t.getStylesheet());
      t.setBackgroundImage = this.editor.graph.setBackgroundImage;
      var D = this.pages[0];
      this.currentPage == D ? t.setBackgroundImage(y) : null != D.viewState && null != D.viewState && (y = D.viewState.backgroundImage, t.setBackgroundImage(y));
      t.getGlobalVariable = function(A) {
        return 'page' == A ? D.getName() : 'pagenumber' == A ? 1 : z.apply(this, arguments);
      };
      t.getGlobalVariable = z;
      document.body.appendChild(t.container);
      t.model.setRoot(D.root);
    }
    if (mxClient.IS_CHROMEAPP || this.useCanvasForExport)
      this.editor.exportToCanvas(mxUtils.bind(this, function(A) {
        try {
          t != this.editor.graph && null != t.container.parentNode && t.container.parentNode.removeChild(t.container);
        } catch (H) {
          A = null;
        }
        m(A);
      }), b, this.thumbImageCache, '#ffffff', function() {
        m();
      }, null, null, null, null, null, null, t, null, null, null, null, 'diagram', null), f = !0;
    else if (this.canvasSupported && null != this.getCurrentFile()) {
      var J = document.createElement('canvas'),
        G = t.getGraphBounds(),
        d = t.view.translate,
        g = t.view.scale;
      null != y && (G = mxRectangle.fromRectangle(G), G.add(new mxRectangle((d.x + y.x) * g, (d.y + y.y) * g, y.width * g, y.height * g)));
      var n = b / G.width;
      n = Math.min(1, Math.min(3 * b / (4 * G.height), n));
      var v = Math.floor(G.x),
        u = Math.floor(G.y);
      J.setAttribute('width', Math.ceil(n * (G.width + 4)));
      J.setAttribute('height', Math.ceil(n * (G.height + 4)));
      var x = J.getContext('2d');
      x.scale(n, n);
      x.translate(-v, -u);
      var C = t.background;
      if (null == C || '' == C || C == mxConstants.NONE)
        C = '#ffffff';
      x.save();
      x.fillStyle = C;
      x.fillRect(v, u, Math.ceil(G.width + 4), Math.ceil(G.height + 4));
      x.restore();
      if (null != y) {
        var F = new Image();
        F.src = y.src;
        x.drawImage(F, y.x * n, y.y * n, y.width * n, y.height * n);
      }
      var L = new mxJsCanvas(J),
        l = new mxAsyncCanvas(this.thumbImageCache);
      L.images = this.thumbImageCache.images;
      var q = new mxImageExport();
      q.drawShape = function(A, H) {
        A.shape instanceof mxShape && A.shape.checkBounds() && (H.save(), H.translate(0.5, 0.5), A.shape.paint(H), H.translate(-0.5, -0.5), H.restore());
      };
      q.drawText = function(A, H) {};
      q.drawState(t.getView().getState(t.model.root), l);
      l.finish(mxUtils.bind(this, function() {
        try {
          q.drawState(t.getView().getState(t.model.root), L), t != this.editor.graph && null != t.container.parentNode && t.container.parentNode.removeChild(t.container);
        } catch (A) {
          J = null;
        }
        m(J);
      }));
      f = !0;
    }
  } catch (A) {
    f = !1, null != t && t != this.editor.graph && null != t.container.parentNode && t.container.parentNode.removeChild(t.container);
  }
  f || window.clearTimeout(k);
  return f;
};
App.prototype.createBackground = function() {
  var b = this.createDiv('background');
  b.style.position = 'absolute';
  b.style.background = 'white';
  b.style.left = '0px';
  b.style.top = '0px';
  b.style.bottom = '0px';
  b.style.right = '0px';
  mxUtils.setOpacity(b, 100);
  return b;
};
(function() {
  var b = EditorUi.prototype.setMode;
  App.prototype.setMode = function(e, f) {
    b.apply(this, arguments);
    null != this.mode && (Editor.useLocalStorage = this.mode == App.MODE_BROWSER);
    if (null != this.appIcon) {
      var c = this.getCurrentFile();
      e = null != c ? c.getMode() : e;
      e == App.MODE_GOOGLE ? (this.appIcon.setAttribute('title', mxResources.get('openIt', [mxResources.get('googleDrive')])), this.appIcon.style.cursor = 'pointer') : e == App.MODE_DROPBOX ? (this.appIcon.setAttribute('title', mxResources.get('openIt', [mxResources.get('dropbox')])), this.appIcon.style.cursor = 'pointer') : e == App.MODE_ONEDRIVE ? (this.appIcon.setAttribute('title', mxResources.get('openIt', [mxResources.get('oneDrive')])), this.appIcon.style.cursor = 'pointer') : (this.appIcon.removeAttribute('title'), this.appIcon.style.cursor = e == App.MODE_DEVICE ? 'pointer' : 'default');
    }
    if (f)
      try {
        if (isLocalStorage)
          localStorage.setItem('.mode', e);
        else if ('undefined' != typeof Storage) {
          var k = new Date();
          k.setYear(k.getFullYear() + 1);
          document.cookie = 'MODE=' + e + '; expires=' + k.toUTCString();
        }
      } catch (m) {}
  };
}());
App.prototype.appIconClicked = function(b) {
  var e = this.getCurrentFile(),
    f = null != e ? e.getMode() : null;
  e = null != e ? mxEvent.isAltDown(b) ? e.getFolderUrl() : e.getFileUrl() : null;
  null != e ? this.openLink(e) : f == App.MODE_GOOGLE ? this.openLink('https://drive.google.com/?authuser=0') : f == App.MODE_ONEDRIVE ? this.openLink('https://onedrive.live.com/') : f == App.MODE_DROPBOX ? this.openLink('https://www.dropbox.com/') : f == App.MODE_GITHUB ? this.openLink('https://github.com/') : f == App.MODE_GITLAB ? this.openLink(DRAWIO_GITLAB_URL) : f == App.MODE_TRELLO ? this.openLink('https://trello.com/') : f == App.MODE_DEVICE ? this.openLink('https://get.draw.io/') : this.openLink('https://www.diagrams.net/');
  mxEvent.consume(b);
};
App.prototype.clearMode = function() {
  if (isLocalStorage)
    localStorage.removeItem('.mode');
  else if ('undefined' != typeof Storage) {
    var b = new Date();
    b.setYear(b.getFullYear() - 1);
    document.cookie = 'MODE=; expires=' + b.toUTCString();
  }
};
App.prototype.getDiagramId = function() {
  var b = window.location.hash;
  null != b && 0 < b.length && (b = b.substring(1));
  if (null != b && 1 < b.length && 'T' == b.charAt(0)) {
    var e = b.indexOf('#');
    0 < e && (b = b.substring(0, e));
  }
  return b;
};
App.prototype.open = function() {
  try {
    if (null != window.opener) {
      var b = urlParams.create;
      null != b && (b = decodeURIComponent(b));
      if (null != b && 0 < b.length && 'http://' != b.substring(0, 7) && 'https://' != b.substring(0, 8)) {
        var e = mxUtils.parseXml(window.opener[b]);
        this.editor.setGraphXml(e.documentElement);
      } else
        null != window.opener.openFile && window.opener.openFile.setConsumer(mxUtils.bind(this, function(f, c, k) {
          this.spinner.stop();
          null == c && (c = urlParams.title, k = !0, c = null != c ? decodeURIComponent(c) : this.defaultFilename);
          0 < (this.useCanvasForExport ? -1 : '.png' == c.substring(c.length - 4)) && (c = c.substring(0, c.length - 4) + '.drawio');
          this.fileLoaded(mxClient.IS_IOS ? new StorageFile(this, f, c) : new LocalFile(this, f, c, k));
        }));
    }
  } catch (f) {}
};
App.prototype.loadGapi = function(b) {
  'undefined' !== typeof gapi && gapi.load(('0' != urlParams.picker ? 'picker,' : '') + App.GOOGLE_APIS, b);
};
App.prototype.load = function() {
  if ('1' != urlParams.embed) {
    if (this.spinner.spin(document.body, mxResources.get('starting'))) {
      try {
        this.stateArg = null != urlParams.state && null != this.drive ? JSON.parse(decodeURIComponent(urlParams.state)) : null;
      } catch (b) {}
      this.editor.graph.setEnabled(null != this.getCurrentFile());
      null != window.location.hash && 0 != window.location.hash.length || null == this.drive || null == this.stateArg || null == this.stateArg.userId || this.drive.setUserId(this.stateArg.userId);
      null != urlParams.fileId ? (window.location.hash = 'G' + urlParams.fileId, window.location.search = this.getSearch(['fileId'])) : null == this.drive ? (this.mode == App.MODE_GOOGLE && (this.mode = null), this.start()) : this.loadGapi(mxUtils.bind(this, function() {
        this.start();
      }));
    }
  } else
    this.restoreLibraries(), '1' == urlParams.gapi && this.loadGapi(function() {});
};
App.prototype.showRefreshDialog = function(b, e) {
  this.showingRefreshDialog || (this.showingRefreshDialog = !0, this.showError(b || mxResources.get('externalChanges'), e || mxResources.get('redirectToNewApp'), mxResources.get('refresh'), mxUtils.bind(this, function() {
    var f = this.getCurrentFile();
    null != f && f.setModified(!1);
    this.spinner.spin(document.body, mxResources.get('connecting'));
    this.editor.graph.setEnabled(!1);
    window.location.reload();
  }), null, null, null, null, null, 340, 180), null != this.dialog && null != this.dialog.container && (b = this.createRealtimeNotice(), b.style.left = '0', b.style.right = '0', b.style.borderRadius = '0', b.style.borderLeftStyle = 'none', b.style.borderRightStyle = 'none', b.style.marginBottom = '26px', b.style.padding = '8px 0 8px 0', this.dialog.container.appendChild(b)));
};
App.prototype.showAlert = function(b) {
  if (null != b && 0 < b.length) {
    var e = document.createElement('div');
    e.className = 'geAlert';
    e.style.zIndex = 2000000000;
    e.style.left = '50%';
    e.style.top = '-100%';
    e.style.maxWidth = '80%';
    e.style.width = 'max-content';
    e.style.whiteSpace = 'pre-wrap';
    mxUtils.setPrefixedStyle(e.style, 'transform', 'translate(-50%,0%)');
    mxUtils.setPrefixedStyle(e.style, 'transition', 'all 1s ease');
    e.innerHTML = b;
    b = document.createElement('a');
    b.className = 'geAlertLink';
    b.style.textAlign = 'right';
    b.style.marginTop = '20px';
    b.style.display = 'block';
    b.setAttribute('title', mxResources.get('close'));
    b.innerHTML = mxResources.get('close');
    e.appendChild(b);
    mxEvent.addListener(b, 'click', function(f) {
      null != e.parentNode && (e.parentNode.removeChild(e), mxEvent.consume(f));
    });
    document.body.appendChild(e);
    window.setTimeout(function() {
      e.style.top = '30px';
    }, 10);
    window.setTimeout(function() {
      mxUtils.setPrefixedStyle(e.style, 'transition', 'all 2s ease');
      e.style.opacity = '0';
      window.setTimeout(function() {
        null != e.parentNode && e.parentNode.removeChild(e);
      }, 2000);
    }, 15000);
  }
};
App.prototype.start = function() {
  null != this.bg && null != this.bg.parentNode && this.bg.parentNode.removeChild(this.bg);
  this.restoreLibraries();
  this.spinner.stop();
  try {
    var b = this;
    window.onerror = function(m, t, y, E, z) {
      'ResizeObserver loop limit exceeded' != m && (EditorUi.logError('Uncaught: ' + (null != m ? m : ''), t, y, E, z, null, !0), b.handleError({
        message: m
      }, mxResources.get('unknownError'), null, null, null, null, !0));
    };
    if ('1' != urlParams.client && '1' != urlParams.embed) {
      try {
        isLocalStorage && window.addEventListener('storage', mxUtils.bind(this, function(m) {
          var t = this.getCurrentFile();
          EditorUi.debug('storage event', [m], [t]);
          null != t && '.draft-alive-check' == m.key && null != m.newValue && null != t.draftId && (this.draftAliveCheck = m.newValue, t.saveDraft());
        })), mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || this.isOfflineApp() || null != urlParams.open || !/www\.draw\.io$/.test(window.location.hostname) || this.editor.chromeless && !this.editor.editable || this.showNameChangeBanner();
      } catch (m) {}
      mxEvent.addListener(window, 'hashchange', mxUtils.bind(this, function(m) {
        try {
          this.hideDialog();
          var t = this.getDiagramId(),
            y = this.getCurrentFile();
          null != y && y.getHash() == t || this.loadFile(t, !0);
        } catch (E) {
          null != document.body && this.handleError(E, mxResources.get('errorLoadingFile'), mxUtils.bind(this, function() {
            var z = this.getCurrentFile();
            window.location.hash = null != z ? z.getHash() : '';
          }));
        }
      }));
    }
    if ((null == window.location.hash || 1 >= window.location.hash.length) && null != urlParams.desc)
      try {
        this.loadDescriptor(JSON.parse(Graph.decompress(urlParams.desc)), null, mxUtils.bind(this, function(m) {
          this.handleError(m, mxResources.get('errorLoadingFile'));
        }));
      } catch (m) {
        this.handleError(m, mxResources.get('errorLoadingFile'));
      }
    else if ((null == window.location.hash || 1 >= window.location.hash.length) && null != urlParams.url)
      this.loadFile('U' + urlParams.url, !0);
    else if (null == this.getCurrentFile()) {
      var e = mxUtils.bind(this, function() {
          if ('1' == urlParams.client && (null == window.location.hash || 0 == window.location.hash.length || '#P' == window.location.hash.substring(0, 2))) {
            var m = mxUtils.bind(this, function(E) {
                Editor.isPngDataUrl(E) && (E = Editor.extractGraphModelFromPng(E));
                var z = urlParams.title;
                z = null != z ? decodeURIComponent(z) : this.defaultFilename;
                E = new LocalFile(this, E, z, !0);
                null != window.location.hash && '#P' == window.location.hash.substring(0, 2) && (E.getHash = function() {
                  return window.location.hash.substring(1);
                });
                this.fileLoaded(E);
                this.getCurrentFile().setModified(!this.editor.chromeless);
              }),
              t = window.opener || window.parent;
            if (t != window) {
              var y = urlParams.create;
              null != y ? m(t[decodeURIComponent(y)]) : (y = urlParams.data, null != y ? m(decodeURIComponent(y)) : this.installMessageHandler(mxUtils.bind(this, function(E, z) {
                z.source == t && m(E);
              })));
            }
          } else if (null == this.dialog)
            if ('1' == urlParams.demo)
              y = Editor.useLocalStorage, this.createFile(this.defaultFilename, null, null, null, null, null, null, !0), Editor.useLocalStorage = y;
            else {
              y = !1;
              try {
                y = null != window.opener && null != window.opener.openFile;
              } catch (E) {}
              y ? this.spinner.spin(document.body, mxResources.get('loading')) : (y = this.getDiagramId(), !EditorUi.enableDrafts || null != urlParams.mode || 'draw.io' != this.getServiceName() || null != y && 0 != y.length || this.editor.isChromelessView() ? null != y && 0 < y.length ? this.loadFile(y, null, null, mxUtils.bind(this, function() {
                var E = decodeURIComponent(urlParams.viewbox || '');
                if ('' != E)
                  try {
                    var z = JSON.parse(E);
                    this.editor.graph.fitWindow(z, z.border);
                  } catch (D) {
                    console.error(D);
                  }
              })) : '0' != urlParams.splash || null != urlParams.mode ? this.loadFile() : EditorUi.isElectronApp || this.createFile(this.defaultFilename, this.getFileData(), null, null, null, null, null, !0) : this.checkDrafts());
            }
        }),
        f = decodeURIComponent(urlParams.create || '');
      if ((null == window.location.hash || 1 >= window.location.hash.length) && null != f && 0 < f.length && this.spinner.spin(document.body, mxResources.get('loading'))) {
        var c = mxUtils.bind(this, function() {
            this.spinner.spin(document.body, mxResources.get('reconnecting')) && (window.location.search = this.getSearch([
              'create',
              'title'
            ]));
          }),
          k = mxUtils.bind(this, function(m) {
            this.spinner.stop();
            if ('0' != urlParams.splash) {
              this.fileLoaded(new LocalFile(this, m, null));
              this.editor.graph.setEnabled(!1);
              this.mode = urlParams.mode;
              var t = urlParams.title;
              t = null != t ? decodeURIComponent(t) : this.defaultFilename;
              m = this.getServiceCount(!0);
              isLocalStorage && m++;
              var y = 4 >= m ? 2 : 6 < m ? 4 : 3;
              t = new CreateDialog(this, t, mxUtils.bind(this, function(E, z) {
                if (null == z) {
                  this.hideDialog();
                  var D = Editor.useLocalStorage;
                  this.createFile(0 < E.length ? E : this.defaultFilename, this.getFileData(), null, null, null, !0, null, !0);
                  Editor.useLocalStorage = D;
                } else
                  this.pickFolder(z, mxUtils.bind(this, function(J) {
                    this.createFile(E, this.getFileData(!0), null, z, null, !0, J);
                  }));
              }), null, null, null, null, '1' == urlParams.browser, null, null, !0, y, null, null, null, this.editor.fileExtensions);
              this.showDialog(t.container, 420, m > y ? 390 : 280, !0, !1, mxUtils.bind(this, function(E) {
                E && null == this.getCurrentFile() && this.showSplash();
              }));
              t.init();
            }
          });
        f = decodeURIComponent(f);
        if ('http://' != f.substring(0, 7) && 'https://' != f.substring(0, 8))
          try {
            null != window.opener && null != window.opener[f] ? k(window.opener[f]) : this.handleError(null, mxResources.get('errorLoadingFile'));
          } catch (m) {
            this.handleError(m, mxResources.get('errorLoadingFile'));
          }
        else
          this.loadTemplate(f, function(m) {
            k(m);
          }, mxUtils.bind(this, function(m) {
            this.handleError(m, mxResources.get('errorLoadingFile'), c);
          }));
      } else
        (null == window.location.hash || 1 >= window.location.hash.length) && null != urlParams.state && null != this.stateArg && 'open' == this.stateArg.action ? null != this.stateArg.ids && (window.history && window.history.replaceState && window.history.replaceState(null, null, window.location.pathname + this.getSearch(['state'])), window.location.hash = 'G' + this.stateArg.ids[0]) : (null == window.location.hash || 1 >= window.location.hash.length) && null != this.drive && null != this.stateArg && 'create' == this.stateArg.action ? (window.history && window.history.replaceState && window.history.replaceState(null, null, window.location.pathname + this.getSearch(['state'])), this.setMode(App.MODE_GOOGLE), '0' == urlParams.splash ? this.createFile(null != urlParams.title ? decodeURIComponent(urlParams.title) : this.defaultFilename) : this.actions.get('new').funct()) : (null != urlParams.open && window.history && window.history.replaceState && (window.history.replaceState(null, null, window.location.pathname + this.getSearch([
          'open',
          'sketch'
        ])), window.location.hash = urlParams.open), e());
    }
  } catch (m) {
    this.handleError(m);
  }
};
App.prototype.loadDraft = function(b, e) {
  this.createFile(this.defaultFilename, b, null, null, mxUtils.bind(this, function() {
    window.setTimeout(mxUtils.bind(this, function() {
      var f = this.getCurrentFile();
      null != f && (f.fileChanged(), null != e && e());
    }), 0);
  }), null, null, !0);
};
App.prototype.filterDrafts = function(b, e, f) {
  function c() {
    f(k);
  }
  var k = [];
  try {
    this.getDatabaseItems(mxUtils.bind(this, function(m) {
      EditorUi.debug('App.filterDrafts', [this], 'items', m);
      for (var t = 0; t < m.length; t++)
        try {
          var y = m[t].key;
          if (null != y && '.draft_' == y.substring(0, 7)) {
            var E = JSON.parse(m[t].data);
            null != E && 'draft' == E.type && E.aliveCheck != e && (null == b && null == E.fileObject || null != E.fileObject && E.fileObject.path == b) && (E.key = y, k.push(E));
          }
        } catch (z) {}
      c();
    }, c));
  } catch (m) {
    c();
  }
};
App.prototype.checkDrafts = function() {
  try {
    var b = Editor.guid();
    localStorage.setItem('.draft-alive-check', b);
    window.setTimeout(mxUtils.bind(this, function() {
      localStorage.removeItem('.draft-alive-check');
      this.filterDrafts(null, b, mxUtils.bind(this, function(e) {
        if (1 == e.length)
          this.loadDraft(e[0].data, mxUtils.bind(this, function() {
            this.removeDatabaseItem(e[0].key);
          }));
        else if (1 < e.length) {
          var f = new Date(e[0].modified);
          f = new DraftDialog(this, 1 < e.length ? mxResources.get('selectDraft') : mxResources.get('draftFound', [f.toLocaleDateString() + ' ' + f.toLocaleTimeString()]), 1 < e.length ? null : e[0].data, mxUtils.bind(this, function(c) {
            this.hideDialog();
            c = '' != c ? c : 0;
            this.loadDraft(e[c].data, mxUtils.bind(this, function() {
              this.removeDatabaseItem(e[c].key);
            }));
          }), mxUtils.bind(this, function(c, k) {
            c = '' != c ? c : 0;
            this.confirm(mxResources.get('areYouSure'), null, mxUtils.bind(this, function() {
              this.removeDatabaseItem(e[c].key);
              null != k && k();
            }), mxResources.get('no'), mxResources.get('yes'));
          }), null, null, null, 1 < e.length ? e : null);
          this.showDialog(f.container, 640, 480, !0, !1, mxUtils.bind(this, function(c) {
            '0' != urlParams.splash ? this.loadFile() : this.createFile(this.defaultFilename, this.getFileData(), null, null, null, null, null, !0);
          }));
          f.init();
        } else
          '0' != urlParams.splash ? this.loadFile() : this.createFile(this.defaultFilename, this.getFileData(), null, null, null, null, null, !0);
      }));
    }), 0);
  } catch (e) {}
};
App.prototype.showSplash = function(b) {
  if ('1' != urlParams.noFileMenu) {
    var e = this.getServiceCount(!0),
      f = mxUtils.bind(this, function() {
        var k = new SplashDialog(this);
        this.showDialog(k.container, 340, mxClient.IS_CHROMEAPP || EditorUi.isElectronApp ? 200 : 230, !0, !0, mxUtils.bind(this, function(m) {
          m && !mxClient.IS_CHROMEAPP && (m = Editor.useLocalStorage, this.createFile(this.defaultFilename + (EditorUi.isElectronApp ? '.drawio' : ''), null, null, null, null, null, null, '1' != urlParams.local), Editor.useLocalStorage = m);
        }), !0);
      });
    if (this.editor.isChromelessView())
      this.handleError({
        message: mxResources.get('noFileSelected')
      }, mxResources.get('errorLoadingFile'), mxUtils.bind(this, function() {
        this.showSplash();
      }));
    else if (mxClient.IS_CHROMEAPP || null != this.mode && !b)
      null == urlParams.create && f();
    else {
      b = 4 == e ? 2 : 3;
      var c = new StorageDialog(this, mxUtils.bind(this, function() {
        this.hideDialog();
        f();
      }), b);
      this.showDialog(c.container, 3 > b ? 200 : 300, 3 < e ? 320 : 210, !0, !1);
    }
  }
};
App.prototype.addLanguageMenu = function(b, e, f) {
  var c = null;
  null != this.menus.get('language') && (c = document.createElement('div'), c.setAttribute('title', mxResources.get('language')), c.className = 'atlas' != Editor.currentTheme ? 'geIcon geAdaptiveAsset' : '', c.style.backgroundImage = 'url(' + Editor.globeImage + ')', c.style.backgroundPosition = 'right center', c.style.backgroundRepeat = 'no-repeat', c.style.backgroundSize = '19px 19px', c.style.width = '19px', c.style.height = '19px', mxUtils.setOpacity(c, 40), c.style.position = 'absolute', c.style.cursor = 'pointer', c.style.bottom = '20px', c.style.right = null != f ? f : '22px', e && (c.style.direction = 'rtl', c.style.textAlign = 'right', c.style.right = null != f ? f : '24px', e = document.createElement('span'), e.style.display = 'inline-block', e.style.fontSize = '12px', e.style.margin = '2px 24px 0 0', e.style.userSelect = 'none', mxUtils.write(e, mxResources.get('language')), c.appendChild(e), e.className = 'atlas' != Editor.currentTheme ? 'geAdaptiveAsset' : ''), mxEvent.addListener(c, 'click', mxUtils.bind(this, function(k) {
    this.editor.graph.popupMenuHandler.hideMenu();
    var m = new mxPopupMenu(this.menus.get('language').funct);
    m.div.className += ' geMenubarMenu';
    m.smartSeparators = !0;
    m.showDisabled = !0;
    m.autoExpand = !0;
    m.hideMenu = mxUtils.bind(this, function() {
      mxPopupMenu.prototype.hideMenu.apply(m, arguments);
      m.destroy();
    });
    var t = mxUtils.getOffset(c);
    m.popup(t.x, t.y + c.offsetHeight, null, k);
    this.setCurrentMenu(m);
  })), b.appendChild(c));
  return c;
};
App.prototype.loadFileSystemEntry = function(b, e, f) {
  f = null != f ? f : mxUtils.bind(this, function(c) {
    this.handleError(c);
  });
  try {
    b.getFile().then(mxUtils.bind(this, function(c) {
      var k = new FileReader();
      k.onload = mxUtils.bind(this, function(m) {
        try {
          if (null != e) {
            var t = m.target.result;
            'image/png' == c.type && (t = this.extractGraphModelFromPng(t));
            e(new LocalFile(this, t, c.name, null, b, c));
          } else
            this.openFileHandle(m.target.result, c.name, c, !1, b);
        } catch (y) {
          f(y);
        }
      });
      k.onerror = f;
      'image' !== c.type.substring(0, 5) && 'application/pdf' !== c.type || 'image/svg' === c.type.substring(0, 9) ? k.readAsText(c) : k.readAsDataURL(c);
    }), f);
  } catch (c) {
    f(c);
  }
};
App.prototype.createFileSystemOptions = function(b) {
  var e = [],
    f = null;
  if (null != b) {
    var c = b.lastIndexOf('.');
    0 < c && (f = b.substring(c + 1));
  }
  for (c = 0; c < this.editor.diagramFileTypes.length; c++) {
    var k = {
      description: mxResources.get(this.editor.diagramFileTypes[c].description) + (mxClient.IS_MAC ? ' (.' + this.editor.diagramFileTypes[c].extension + ')' : ''),
      accept: {}
    };
    k.accept[this.editor.diagramFileTypes[c].mimeType] = ['.' + this.editor.diagramFileTypes[c].extension];
    this.editor.diagramFileTypes[c].extension == f ? e.splice(0, 0, k) : this.editor.diagramFileTypes[c].extension == f ? e.splice(0, 0, k) : e.push(k);
  }
  return {
    types: e,
    fileName: b
  };
};
App.prototype.showSaveFilePicker = function(b, e, f) {
  e = null != e ? e : mxUtils.bind(this, function(c) {
    'AbortError' != c.name && this.handleError(c);
  });
  f = null != f ? f : this.createFileSystemOptions();
  window.showSaveFilePicker(f).then(mxUtils.bind(this, function(c) {
    null != c && c.getFile().then(mxUtils.bind(this, function(k) {
      b(c, k);
    }), e);
  }), e);
};
App.prototype.pickFile = function(b) {
  try {
    if (b = null != b ? b : this.mode, b == App.MODE_GOOGLE)
      null != this.drive && 'undefined' != typeof google && 'undefined' != typeof google.picker ? this.drive.pickFile() : this.openLink('https://drive.google.com');
    else {
      var e = this.getPeerForMode(b);
      if (null != e)
        e.pickFile();
      else if (b == App.MODE_DEVICE && EditorUi.nativeFileSupport)
        window.showOpenFilePicker().then(mxUtils.bind(this, function(t) {
          null != t && 0 < t.length && this.spinner.spin(document.body, mxResources.get('loading')) && this.loadFileSystemEntry(t[0]);
        }), mxUtils.bind(this, function(t) {
          'AbortError' != t.name && this.handleError(t);
        }));
      else if (b == App.MODE_DEVICE && Graph.fileSupport) {
        if (null == this.openFileInputElt) {
          var f = document.createElement('input');
          f.setAttribute('type', 'file');
          mxEvent.addListener(f, 'change', mxUtils.bind(this, function() {
            null != f.files && (this.openFiles(f.files), f.type = '', f.type = 'file', f.value = '');
          }));
          f.style.display = 'none';
          document.body.appendChild(f);
          this.openFileInputElt = f;
        }
        this.openFileInputElt.click();
      } else {
        this.hideDialog();
        window.openNew = null != this.getCurrentFile() && !this.isDiagramEmpty();
        window.baseUrl = this.getUrl();
        window.openKey = 'open';
        window.listBrowserFiles = mxUtils.bind(this, function(t, y) {
          StorageFile.listFiles(this, 'F', t, y);
        });
        window.openBrowserFile = mxUtils.bind(this, function(t, y, E) {
          StorageFile.getFileContent(this, t, y, E);
        });
        window.deleteBrowserFile = mxUtils.bind(this, function(t, y, E) {
          StorageFile.deleteFile(this, t, y, E);
        });
        var c = Editor.useLocalStorage;
        Editor.useLocalStorage = b == App.MODE_BROWSER;
        this.openFile();
        window.openFile.setConsumer(mxUtils.bind(this, function(t, y) {
          var E = mxUtils.bind(this, function() {
              this.useCanvasForExport || '.png' != y.substring(y.length - 4) || (y = y.substring(0, y.length - 4) + '.drawio');
              this.fileLoaded(b == App.MODE_BROWSER ? new StorageFile(this, t, y) : new LocalFile(this, t, y));
            }),
            z = this.getCurrentFile();
          null != z && z.isModified() ? this.confirm(mxResources.get('allChangesLost'), null, E, mxResources.get('cancel'), mxResources.get('discardChanges')) : E();
        }));
        var k = this.dialog,
          m = k.close;
        this.dialog.close = mxUtils.bind(this, function(t) {
          Editor.useLocalStorage = c;
          m.apply(k, arguments);
          null == this.getCurrentFile() && this.showSplash();
        });
      }
    }
  } catch (t) {
    this.handleError(t);
  }
};
App.prototype.pickLibrary = function(b) {
  b = null != b ? b : this.mode;
  if (b == App.MODE_GOOGLE || b == App.MODE_DROPBOX || b == App.MODE_ONEDRIVE || b == App.MODE_GITHUB || b == App.MODE_GITLAB || b == App.MODE_TRELLO) {
    var e = b == App.MODE_GOOGLE ? this.drive : b == App.MODE_ONEDRIVE ? this.oneDrive : b == App.MODE_GITHUB ? this.gitHub : b == App.MODE_GITLAB ? this.gitLab : b == App.MODE_TRELLO ? this.trello : this.dropbox;
    null != e && e.pickLibrary(mxUtils.bind(this, function(k, m) {
      if (null != m)
        try {
          this.loadLibrary(m);
        } catch (t) {
          this.handleError(t, mxResources.get('errorLoadingFile'));
        }
      else
        this.spinner.spin(document.body, mxResources.get('loading')) && e.getLibrary(k, mxUtils.bind(this, function(t) {
          this.spinner.stop();
          try {
            this.loadLibrary(t);
          } catch (y) {
            this.handleError(y, mxResources.get('errorLoadingFile'));
          }
        }), mxUtils.bind(this, function(t) {
          this.handleError(t, null != t ? mxResources.get('errorLoadingFile') : null);
        }));
    }));
  } else if (b == App.MODE_DEVICE && Graph.fileSupport) {
    if (null == this.libFileInputElt) {
      var f = document.createElement('input');
      f.setAttribute('type', 'file');
      mxEvent.addListener(f, 'change', mxUtils.bind(this, function() {
        if (null != f.files) {
          for (var k = 0; k < f.files.length; k++)
            mxUtils.bind(this, function(m) {
              var t = new FileReader();
              t.onload = mxUtils.bind(this, function(y) {
                try {
                  this.loadLibrary(new LocalLibrary(this, y.target.result, m.name));
                } catch (E) {
                  this.handleError(E, mxResources.get('errorLoadingFile'));
                }
              });
              t.readAsText(m);
            })(f.files[k]);
          f.type = '';
          f.type = 'file';
          f.value = '';
        }
      }));
      f.style.display = 'none';
      document.body.appendChild(f);
      this.libFileInputElt = f;
    }
    this.libFileInputElt.click();
  } else {
    window.openNew = !1;
    window.openKey = 'open';
    window.listBrowserFiles = mxUtils.bind(this, function(k, m) {
      StorageFile.listFiles(this, 'L', k, m);
    });
    window.openBrowserFile = mxUtils.bind(this, function(k, m, t) {
      StorageFile.getFileContent(this, k, m, t);
    });
    window.deleteBrowserFile = mxUtils.bind(this, function(k, m, t) {
      StorageFile.deleteFile(this, k, m, t);
    });
    var c = Editor.useLocalStorage;
    Editor.useLocalStorage = b == App.MODE_BROWSER;
    window.openFile = new OpenFile(mxUtils.bind(this, function(k) {
      this.hideDialog(k);
    }));
    window.openFile.setConsumer(mxUtils.bind(this, function(k, m) {
      try {
        this.loadLibrary(b == App.MODE_BROWSER ? new StorageLibrary(this, k, m) : new LocalLibrary(this, k, m));
      } catch (t) {
        this.handleError(t, mxResources.get('errorLoadingFile'));
      }
    }));
    this.showDialog(new OpenDialog(this).container, Editor.useLocalStorage ? 640 : 360, Editor.useLocalStorage ? 480 : 220, !0, !0, function() {
      Editor.useLocalStorage = c;
      window.openFile = null;
    });
  }
};
App.prototype.saveLibrary = function(b, e, f, c, k, m, t) {
  try {
    c = null != c ? c : this.mode;
    k = null != k ? k : !1;
    m = null != m ? m : !1;
    var y = this.createLibraryDataFromImages(e),
      E = mxUtils.bind(this, function(J) {
        this.spinner.stop();
        null != t && t();
        this.handleError(J, null != J ? mxResources.get('errorSavingFile') : null);
      });
    null == f && c == App.MODE_DEVICE && (f = new LocalLibrary(this, y, b));
    if (null == f)
      this.pickFolder(c, mxUtils.bind(this, function(J) {
        c == App.MODE_GOOGLE && null != this.drive && this.spinner.spin(document.body, mxResources.get('inserting')) ? this.drive.insertFile(b, y, J, mxUtils.bind(this, function(G) {
          this.spinner.stop();
          this.hideDialog(!0);
          this.libraryLoaded(G, e);
        }), E, this.drive.libraryMimeType) : c == App.MODE_GITHUB && null != this.gitHub && this.spinner.spin(document.body, mxResources.get('inserting')) ? this.gitHub.insertLibrary(b, y, mxUtils.bind(this, function(G) {
          this.spinner.stop();
          this.hideDialog(!0);
          this.libraryLoaded(G, e);
        }), E, J) : c == App.MODE_GITLAB && null != this.gitLab && this.spinner.spin(document.body, mxResources.get('inserting')) ? this.gitLab.insertLibrary(b, y, mxUtils.bind(this, function(G) {
          this.spinner.stop();
          this.hideDialog(!0);
          this.libraryLoaded(G, e);
        }), E, J) : c == App.MODE_TRELLO && null != this.trello && this.spinner.spin(document.body, mxResources.get('inserting')) ? this.trello.insertLibrary(b, y, mxUtils.bind(this, function(G) {
          this.spinner.stop();
          this.hideDialog(!0);
          this.libraryLoaded(G, e);
        }), E, J) : c == App.MODE_DROPBOX && null != this.dropbox && this.spinner.spin(document.body, mxResources.get('inserting')) ? this.dropbox.insertLibrary(b, y, mxUtils.bind(this, function(G) {
          this.spinner.stop();
          this.hideDialog(!0);
          this.libraryLoaded(G, e);
        }), E, J) : c == App.MODE_ONEDRIVE && null != this.oneDrive && this.spinner.spin(document.body, mxResources.get('inserting')) ? this.oneDrive.insertLibrary(b, y, mxUtils.bind(this, function(G) {
          this.spinner.stop();
          this.hideDialog(!0);
          this.libraryLoaded(G, e);
        }), E, J) : c == App.MODE_BROWSER ? (J = mxUtils.bind(this, function() {
          var G = new StorageLibrary(this, y, b);
          G.saveFile(b, !1, mxUtils.bind(this, function() {
            this.hideDialog(!0);
            this.libraryLoaded(G, e);
          }), E);
        }), null == localStorage.getItem(b) ? J() : this.confirm(mxResources.get('replaceIt', [b]), J)) : this.handleError({
          message: mxResources.get('serviceUnavailableOrBlocked')
        });
      }));
    else if (k || this.spinner.spin(document.body, mxResources.get('saving'))) {
      f.setData(y);
      var z = mxUtils.bind(this, function() {
        f.save(!0, mxUtils.bind(this, function(J) {
          this.spinner.stop();
          this.hideDialog(!0);
          m || this.libraryLoaded(f, e);
          null != t && t();
        }), E);
      });
      if (b != f.getTitle()) {
        var D = f.getHash();
        f.rename(b, mxUtils.bind(this, function(J) {
          f.constructor != LocalLibrary && D != f.getHash() && (mxSettings.removeCustomLibrary(D), mxSettings.addCustomLibrary(f.getHash()));
          this.removeLibrarySidebar(D);
          z();
        }), E);
      } else
        z();
    }
  } catch (J) {
    this.handleError(J);
  }
};
App.prototype.saveFile = function(b, e) {
  var f = this.getCurrentFile();
  if (null != f) {
    var c = mxUtils.bind(this, function() {
      EditorUi.enableDrafts && f.removeDraft();
      this.getCurrentFile() == f || f.isModified() || (f.getMode() != App.MODE_DEVICE ? this.editor.setStatus(mxUtils.htmlEntities(mxResources.get('allChangesSaved'))) : this.editor.setStatus(''));
      null != e && e();
    });
    if (b || null == f.getTitle() || null != f.invalidFileHandle || null == this.mode)
      if (null != f && f.constructor == LocalFile && null != f.fileHandle)
        this.showSaveFilePicker(mxUtils.bind(this, function(E, z) {
          f.invalidFileHandle = null;
          f.fileHandle = E;
          f.title = z.name;
          f.desc = z;
          this.save(z.name, c);
        }), null, this.createFileSystemOptions(f.getTitle()));
      else {
        var k = null != f.getTitle() ? f.getTitle() : this.defaultFilename,
          m = !mxClient.IS_IOS || !navigator.standalone,
          t = this.mode;
        b = this.getServiceCount(!0);
        isLocalStorage && b++;
        var y = 4 >= b ? 2 : 6 < b ? 4 : 3;
        k = new CreateDialog(this, k, mxUtils.bind(this, function(E, z, D) {
          null != E && 0 < E.length && (/(\.pdf)$/i.test(E) ? this.confirm(mxResources.get('didYouMeanToExportToPdf'), mxUtils.bind(this, function() {
            this.hideDialog();
            this.actions.get('exportPdf').funct();
          }), mxUtils.bind(this, function() {
            D.value = E.split('.').slice(0, -1).join('.');
            D.focus();
            mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? D.select() : document.execCommand('selectAll', !1, null);
          }), mxResources.get('yes'), mxResources.get('no')) : (this.hideDialog(), null == t && z == App.MODE_DEVICE ? null != f && EditorUi.nativeFileSupport ? this.showSaveFilePicker(mxUtils.bind(this, function(J, G) {
            f.fileHandle = J;
            f.mode = App.MODE_DEVICE;
            f.title = G.name;
            f.desc = G;
            this.setMode(App.MODE_DEVICE);
            this.save(G.name, c);
          }), mxUtils.bind(this, function(J) {
            'AbortError' != J.name && this.handleError(J);
          }), this.createFileSystemOptions(E)) : (this.setMode(App.MODE_DEVICE), this.save(E, c)) : 'download' == z ? new LocalFile(this, null, E).save() : '_blank' == z ? (window.openFile = new OpenFile(function() {
            window.openFile = null;
          }), window.openFile.setData(this.getFileData(!0)), this.openLink(this.getUrl(window.location.pathname), null, !0)) : t != z ? this.pickFolder(z, mxUtils.bind(this, function(J) {
            this.createFile(E, this.getFileData(/(\.xml)$/i.test(E) || 0 > E.indexOf('.') || /(\.drawio)$/i.test(E), /(\.svg)$/i.test(E), /(\.html)$/i.test(E)), null, z, c, null == this.mode, J);
          })) : null != z && this.save(E, c)));
        }), mxUtils.bind(this, function() {
          this.hideDialog();
        }), mxResources.get('saveAs'), mxResources.get('download'), null, null, m, null, !0, y, null, null, null, this.editor.fileExtensions, !1);
        this.showDialog(k.container, 420, b > y ? 390 : 280, !0, !0);
        k.init();
      }
    else
      this.save(f.getTitle(), c);
  }
};
App.prototype.loadTemplate = function(b, e, f, c, k) {
  var m = !1,
    t = b,
    y = null != c ? c : b,
    E = /(\.v(dx|sdx?))($|\?)/i.test(y) || /(\.vs(x|sx?))($|\?)/i.test(y);
  c = /\.png$/i.test(y) || /\.pdf$/i.test(y);
  this.editor.isCorsEnabledForUrl(t) || (m = c || E, t = 't=' + new Date().getTime(), t = PROXY_URL + '?url=' + encodeURIComponent(b) + '&' + t + (m ? '&base64=1' : ''));
  this.editor.loadUrl(t, mxUtils.bind(this, function(z) {
    try {
      var D = m ? !window.atob || mxClient.IS_IE || mxClient.IS_IE11 ? Base64.decode(z) : atob(z) : z;
      if (E || this.isVisioData(D))
        E || (y = k ? this.isRemoteVisioData(D) ? 'raw.vss' : 'raw.vssx' : this.isRemoteVisioData(D) ? 'raw.vsd' : 'raw.vsdx'), this.importVisio(this.base64ToBlob(z.substring(z.indexOf(',') + 1)), function(J) {
          e(J);
        }, f, y);
      else if (new XMLHttpRequest().upload && this.isRemoteFileFormat(D, y))
        this.isExternalDataComms() ? this.parseFileData(D, mxUtils.bind(this, function(J) {
          4 == J.readyState && 200 <= J.status && 299 >= J.status && '<mxGraphModel' == J.responseText.substring(0, 13) && e(J.responseText);
        }), b) : this.showError(mxResources.get('error'), mxResources.get('notInOffline'), null, f);
      else if (this.isLucidChartData(D))
        this.convertLucidChart(D, mxUtils.bind(this, function(J) {
          e(J);
        }), mxUtils.bind(this, function(J) {
          f(J);
        }));
      else {
        if (/(\.png)($|\?)/i.test(y) || Editor.isPngData(D))
          D = Editor.extractGraphModelFromPng(z);
        e(D);
      }
    } catch (J) {
      f(J);
    }
  }), f, /(\.png)($|\?)/i.test(y) || /(\.v(dx|sdx?))($|\?)/i.test(y) || /(\.vs(x|sx?))($|\?)/i.test(y), null, null, m);
};
App.prototype.getPeerForMode = function(b) {
  return b == App.MODE_GOOGLE ? this.drive : b == App.MODE_GITHUB ? this.gitHub : b == App.MODE_GITLAB ? this.gitLab : b == App.MODE_DROPBOX ? this.dropbox : b == App.MODE_ONEDRIVE ? this.oneDrive : b == App.MODE_TRELLO ? this.trello : null;
};
App.prototype.createFile = function(b, e, f, c, k, m, t, y, E) {
  c = y ? null : null != c ? c : this.mode;
  if (null != b && this.spinner.spin(document.body, mxResources.get('inserting'))) {
    e = null != e ? e : this.emptyDiagramXml;
    var z = mxUtils.bind(this, function() {
        this.spinner.stop();
      }),
      D = mxUtils.bind(this, function(J) {
        z();
        null == J && null == this.getCurrentFile() && null == this.dialog ? this.showSplash() : null != J && this.handleError(J);
      });
    try {
      c == App.MODE_GOOGLE && null != this.drive ? (null == t && null != this.stateArg && null != this.stateArg.folderId && (t = this.stateArg.folderId), this.drive.insertFile(b, e, t, mxUtils.bind(this, function(J) {
        z();
        this.fileCreated(J, f, m, k, E);
      }), D)) : c == App.MODE_GITHUB && null != this.gitHub ? this.gitHub.insertFile(b, e, mxUtils.bind(this, function(J) {
        z();
        this.fileCreated(J, f, m, k, E);
      }), D, !1, t) : c == App.MODE_GITLAB && null != this.gitLab ? this.gitLab.insertFile(b, e, mxUtils.bind(this, function(J) {
        z();
        this.fileCreated(J, f, m, k, E);
      }), D, !1, t) : c == App.MODE_TRELLO && null != this.trello ? this.trello.insertFile(b, e, mxUtils.bind(this, function(J) {
        z();
        this.fileCreated(J, f, m, k, E);
      }), D, !1, t) : c == App.MODE_DROPBOX && null != this.dropbox ? this.dropbox.insertFile(b, e, mxUtils.bind(this, function(J) {
        z();
        this.fileCreated(J, f, m, k, E);
      }), D) : c == App.MODE_ONEDRIVE && null != this.oneDrive ? this.oneDrive.insertFile(b, e, mxUtils.bind(this, function(J) {
        z();
        this.fileCreated(J, f, m, k, E);
      }), D, !1, t) : c == App.MODE_BROWSER ? StorageFile.insertFile(this, b, e, mxUtils.bind(this, function(J) {
        z();
        this.fileCreated(J, f, m, k, E);
      }), D) : !y && c == App.MODE_DEVICE && EditorUi.nativeFileSupport ? (z(), this.showSaveFilePicker(mxUtils.bind(this, function(J, G) {
        var d = new LocalFile(this, e, G.name, null, J, G);
        d.saveFile(G.name, !1, mxUtils.bind(this, function() {
          this.fileCreated(d, f, m, k, E);
        }), D, !0);
      }), mxUtils.bind(this, function(J) {
        'AbortError' != J.name && D(J);
      }), this.createFileSystemOptions(b))) : (z(), this.fileCreated(new LocalFile(this, e, b, null == c), f, m, k, E));
    } catch (J) {
      z(), this.handleError(J);
    }
  }
};
App.prototype.fileCreated = function(b, e, f, c, k) {
  var m = window.location.pathname;
  null != e && 0 < e.length && (m += '?libs=' + e);
  null != k && 0 < k.length && (m += '?clibs=' + k);
  m = this.getUrl(m);
  b.getMode() != App.MODE_DEVICE && (m += '#' + b.getHash());
  if (this.spinner.spin(document.body, mxResources.get('inserting'))) {
    var t = b.getData();
    t = 0 < t.length ? this.editor.extractGraphModel(mxUtils.parseXml(t).documentElement, !0) : null;
    var y = window.location.protocol + '//' + window.location.hostname + m,
      E = t,
      z = null;
    null != t && /\.svg$/i.test(b.getTitle()) && (z = this.createTemporaryGraph(this.editor.graph.getStylesheet()), document.body.appendChild(z.container), E = this.decodeNodeIntoGraph(E, z));
    b.setData(this.createFileData(t, z, b, y));
    null != z && z.container.parentNode.removeChild(z.container);
    var D = mxUtils.bind(this, function() {
        this.spinner.stop();
      }),
      J = mxUtils.bind(this, function() {
        D();
        var G = this.getCurrentFile();
        null == f && null != G && (f = !G.isModified() && null == G.getMode());
        var d = mxUtils.bind(this, function() {
            window.openFile = null;
            this.fileLoaded(b);
            f && b.addAllSavedStatus();
            null != e && this.sidebar.showEntries(e);
            if (null != k) {
              for (var n = [], v = k.split(';'), u = 0; u < v.length; u++)
                n.push(decodeURIComponent(v[u]));
              this.loadLibraries(n);
            }
          }),
          g = mxUtils.bind(this, function() {
            f || null == G || !G.isModified() ? d() : this.confirm(mxResources.get('allChangesLost'), null, d, mxResources.get('cancel'), mxResources.get('discardChanges'));
          });
        null != c && c();
        null == f || f ? g() : (b.constructor == LocalFile && (window.openFile = new OpenFile(function() {
          window.openFile = null;
        }), window.openFile.setData(b.getData(), b.getTitle(), null == b.getMode())), null != c && c(), window.openWindow(m, null, g));
      });
    b.constructor == LocalFile ? J() : b.saveFile(b.getTitle(), !1, mxUtils.bind(this, function() {
      J();
    }), mxUtils.bind(this, function(G) {
      D();
      null != G && 'AbortError' == G.name || this.handleError(G);
    }));
  }
};
App.prototype.loadFile = function(b, e, f, c, k) {
  if ('1' == urlParams.openInSameWin || navigator.standalone)
    e = !0;
  this.hideDialog();
  var m = mxUtils.bind(this, function() {
      if (null == b || 0 == b.length)
        this.editor.setStatus(''), this.fileLoaded(null);
      else if (this.spinner.spin(document.body, mxResources.get('loading')))
        if ('L' == b.charAt(0))
          if (this.spinner.stop(), isLocalStorage) {
            var E = mxUtils.bind(this, function(d) {
              this.handleError(d, mxResources.get('errorLoadingFile'), mxUtils.bind(this, function() {
                var g = this.getCurrentFile();
                window.location.hash = null != g ? g.getHash() : '';
              }));
            });
            b = decodeURIComponent(b.substring(1));
            StorageFile.getFileContent(this, b, mxUtils.bind(this, function(d) {
              null != d ? (this.fileLoaded(new StorageFile(this, d, b)), null != c && c()) : E({
                message: mxResources.get('fileNotFound')
              });
            }), E);
          } else
            this.handleError({
              message: mxResources.get('serviceUnavailableOrBlocked')
            }, mxResources.get('errorLoadingFile'), mxUtils.bind(this, function() {
              var d = this.getCurrentFile();
              window.location.hash = null != d ? d.getHash() : '';
            }));
      else if (null != f)
        this.spinner.stop(), this.fileLoaded(f), null != c && c();
      else if ('S' == b.charAt(0))
        this.spinner.stop(), this.alert('[Deprecation] #S is no longer supported, go to https://app.diagrams.net/?desc=' + b.substring(1).substring(0, 10), mxUtils.bind(this, function() {
          window.location.href = 'https://app.diagrams.net/?desc=' + b.substring(1);
        }));
      else if ('R' == b.charAt(0)) {
        this.spinner.stop();
        var z = decodeURIComponent(b.substring(1));
        '<' != z.charAt(0) && (z = Graph.decompress(z));
        z = new LocalFile(this, z, null != urlParams.title ? decodeURIComponent(urlParams.title) : this.defaultFilename, !0);
        z.getHash = function() {
          return b;
        };
        this.fileLoaded(z);
        null != c && c();
      } else if ('E' == b.charAt(0))
        null == this.getCurrentFile() ? this.handleError({
          message: mxResources.get('serviceUnavailableOrBlocked')
        }, mxResources.get('errorLoadingFile')) : this.remoteInvoke('getDraftFileContent', null, null, mxUtils.bind(this, function(d, g) {
          this.spinner.stop();
          this.fileLoaded(new EmbedFile(this, d, g));
          null != c && c();
        }), mxUtils.bind(this, function() {
          this.handleError({
            message: mxResources.get('serviceUnavailableOrBlocked')
          }, mxResources.get('errorLoadingFile'));
        }));
      else if ('U' == b.charAt(0)) {
        var D = decodeURIComponent(b.substring(1)),
          J = mxUtils.bind(this, function() {
            if ('https://drive.google.com/uc?id=' != D.substring(0, 31) || null == this.drive && 'function' !== typeof window.DriveClient)
              return !1;
            this.hideDialog();
            var d = mxUtils.bind(this, function() {
              this.spinner.stop();
              if (null != this.drive) {
                var g = D.substring(31, D.lastIndexOf('&ex'));
                this.loadFile('G' + g, e, null, mxUtils.bind(this, function() {
                  var n = this.getCurrentFile();
                  null != n && this.editor.chromeless && !this.editor.editable && (n.getHash = function() {
                    return 'G' + g;
                  }, window.location.hash = '#' + n.getHash());
                  null != c && c();
                }));
                return !0;
              }
              return !1;
            });
            !d() && this.spinner.spin(document.body, mxResources.get('loading')) && this.addListener('clientLoaded', d);
            return !0;
          });
        this.loadTemplate(D, mxUtils.bind(this, function(d) {
          this.spinner.stop();
          if (null != d && 0 < d.length) {
            var g = this.defaultFilename;
            if (null == urlParams.title && '1' != urlParams.notitle) {
              var n = D,
                v = D.lastIndexOf('.'),
                u = n.lastIndexOf('/');
              v > u && 0 < u && (n = n.substring(u + 1, v), v = D.substring(v), this.useCanvasForExport || '.png' != v || (v = '.drawio'), '.svg' === v || '.xml' === v || '.html' === v || '.png' === v || '.drawio' === v) && (g = n + v);
            }
            d = new LocalFile(this, d, null != urlParams.title ? decodeURIComponent(urlParams.title) : g, !0);
            d.getHash = function() {
              return b;
            };
            this.fileLoaded(d, !0) ? null != c && c() : J() || this.handleError({
              message: mxResources.get('fileNotFound')
            }, mxResources.get('errorLoadingFile'));
          } else
            J() || this.handleError({
              message: mxResources.get('fileNotFound')
            }, mxResources.get('errorLoadingFile'));
        }), mxUtils.bind(this, function() {
          J() || (this.spinner.stop(), this.handleError({
            message: mxResources.get('fileNotFound')
          }, mxResources.get('errorLoadingFile')));
        }), null != urlParams['template-filename'] ? decodeURIComponent(urlParams['template-filename']) : null);
      } else if (z = null, 'G' == b.charAt(0) ? z = this.drive : 'D' == b.charAt(0) ? z = this.dropbox : 'W' == b.charAt(0) ? z = this.oneDrive : 'H' == b.charAt(0) ? z = this.gitHub : 'A' == b.charAt(0) ? z = this.gitLab : 'T' == b.charAt(0) && (z = this.trello), null == z)
        this.handleError({
          message: mxResources.get('serviceUnavailableOrBlocked')
        }, mxResources.get('errorLoadingFile'), mxUtils.bind(this, function() {
          var d = this.getCurrentFile();
          window.location.hash = null != d ? d.getHash() : '';
        }));
      else {
        var G = b.charAt(0);
        b = decodeURIComponent(b.substring(1));
        z.getFile(b, mxUtils.bind(this, function(d) {
          this.spinner.stop();
          this.fileLoaded(d);
          var g = this.getCurrentFile();
          null == g ? (window.location.hash = '', this.showSplash()) : this.editor.chromeless && !this.editor.editable ? (g.getHash = function() {
            return G + b;
          }, window.location.hash = '#' + g.getHash()) : d == g && null == d.getMode() && (d = mxResources.get('copyCreated'), this.editor.setStatus('<div title="' + d + '" class="geStatusAlert">' + d + '</div>'));
          null != c && c();
        }), mxUtils.bind(this, function(d) {
          null != window.console && null != d && console.log('error in loadFile:', b, d);
          var g = mxUtils.bind(this, function() {
            var n = this.getCurrentFile();
            null == n ? (window.location.hash = '', this.showSplash()) : window.location.hash = '#' + n.getHash();
          });
          null == d || 'AbortError' != d.name ? this.handleError(d, null != d ? mxResources.get('errorLoadingFile') : null, g, null, null, '#' + G + b) : g();
        }));
      }
    }),
    t = this.getCurrentFile(),
    y = mxUtils.bind(this, function() {
      k || null == t || !t.isModified() ? m() : this.confirm(mxResources.get('allChangesLost'), mxUtils.bind(this, function() {
        null != t && (window.location.hash = t.getHash());
      }), m, mxResources.get('cancel'), mxResources.get('discardChanges'));
    });
  null == b || 0 == b.length ? y() : null == t || e ? y() : this.showDialog(new PopupDialog(this, this.getUrl() + '#' + b, null, y).container, 320, 140, !0, !0);
};
App.prototype.getLibraryStorageHint = function(b) {
  var e = b.getTitle();
  b.constructor != LocalLibrary && (e += '\n' + b.getHash());
  b.constructor == DriveLibrary ? e += ' (' + mxResources.get('googleDrive') + ')' : b.constructor == GitHubLibrary ? e += ' (' + mxResources.get('github') + ')' : b.constructor == TrelloLibrary ? e += ' (' + mxResources.get('trello') + ')' : b.constructor == DropboxLibrary ? e += ' (' + mxResources.get('dropbox') + ')' : b.constructor == OneDriveLibrary ? e += ' (' + mxResources.get('oneDrive') + ')' : b.constructor == StorageLibrary ? e += ' (' + mxResources.get('browser') + ')' : b.constructor == LocalLibrary && (e += ' (' + mxResources.get('device') + ')');
  return e;
};
App.prototype.restoreLibraries = function() {
  function b(f) {
    for (var c = 0; c < f.length; c++)
      '' != f[c] && 0 > mxUtils.indexOf(e, f[c]) && e.push(f[c]);
  }
  var e = [];
  b(mxSettings.getCustomLibraries());
  b((urlParams.clibs || '').split(';'));
  this.loadLibraries(e);
};
App.prototype.loadLibraries = function(b, e) {
  if (null != this.sidebar) {
    null == this.loadedLibraries && (this.loadedLibraries = {});
    var f = mxUtils.bind(this, function(z, D) {
        D || mxSettings.removeCustomLibrary(z);
        delete this.loadedLibraries[z];
      }),
      c = 0,
      k = [],
      m = 0 < b.length && 'L.scratchpad' == b[0] ? 1 : 0,
      t = mxUtils.bind(this, function() {
        if (0 == c) {
          if (null != b)
            for (var z = b.length - 1; 0 <= z; z--)
              null != k[z] && this.loadLibrary(k[z], z <= m);
          null != e && e();
        }
      });
    if (null != b)
      for (var y = 0; y < b.length; y++) {
        var E = encodeURIComponent(decodeURIComponent(b[y]));
        mxUtils.bind(this, function(z, D) {
          if (null != z && 0 < z.length && null == this.loadedLibraries[z] && null == this.sidebar.palettes[z]) {
            this.loadedLibraries[z] = !0;
            c++;
            var J = mxUtils.bind(this, function(u) {
                k[D] = u;
                c--;
                t();
              }),
              G = mxUtils.bind(this, function(u) {
                f(z, u);
                c--;
                t();
              }),
              d = z.substring(0, 1);
            if ('L' == d)
              (isLocalStorage || mxClient.IS_CHROMEAPP) && window.setTimeout(mxUtils.bind(this, function() {
                try {
                  var u = decodeURIComponent(z.substring(1));
                  StorageFile.getFileContent(this, u, mxUtils.bind(this, function(x) {
                    '.scratchpad' == u && null == x && (x = this.emptyLibraryXml);
                    null != x ? J(new StorageLibrary(this, x, u)) : G();
                  }), G);
                } catch (x) {
                  G();
                }
              }), 0);
            else if ('U' == d) {
              var g = decodeURIComponent(z.substring(1));
              this.isOffline() || this.loadTemplate(g, mxUtils.bind(this, function(u) {
                null != u && 0 < u.length ? J(new UrlLibrary(this, u, g)) : G();
              }), function() {
                G();
              }, null, !0);
            } else if ('R' == d) {
              d = decodeURIComponent(z.substring(1));
              try {
                d = JSON.parse(d);
                var n = {
                  id: d[0],
                  title: d[1],
                  downloadUrl: d[2]
                };
                this.remoteInvoke('getFileContent', [n.downloadUrl], null, mxUtils.bind(this, function(u) {
                  try {
                    J(new RemoteLibrary(this, u, n));
                  } catch (x) {
                    G();
                  }
                }), function() {
                  G();
                });
              } catch (u) {
                G();
              }
            } else if ('S' == d && null != this.loadDesktopLib)
              try {
                this.loadDesktopLib(decodeURIComponent(z.substring(1)), function(u) {
                  J(u);
                }, G);
              } catch (u) {
                G();
              }
            else {
              var v = null;
              'G' == d ? null != this.drive && null != this.drive.user && (v = this.drive) : 'H' == d ? null != this.gitHub && null != this.gitHub.getUser() && (v = this.gitHub) : 'T' == d ? null != this.trello && this.trello.isAuthorized() && (v = this.trello) : 'D' == d ? null != this.dropbox && null != this.dropbox.getUser() && (v = this.dropbox) : 'W' == d && null != this.oneDrive && null != this.oneDrive.getUser() && (v = this.oneDrive);
              null != v ? v.getLibrary(decodeURIComponent(z.substring(1)), mxUtils.bind(this, function(u) {
                try {
                  J(u);
                } catch (x) {
                  G();
                }
              }), function(u) {
                G();
              }) : G(!0);
            }
          }
        })(E, y);
      }
    t();
  }
};
App.prototype.updateButtonContainer = function() {
  if (null != this.buttonContainer) {
    var b = this.getCurrentFile();
    '1' == urlParams.embed && 'simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme && (this.buttonContainer.style.paddingRight = '8px');
    this.commentsSupported() && 'simple' != Editor.currentTheme && 'atlas' != Editor.currentTheme && 'sketch' != Editor.currentTheme ? null == this.commentButton && (this.commentButton = document.createElement('a'), this.commentButton.setAttribute('title', mxResources.get('comments')), this.commentButton.className = 'geToolbarButton geAdaptiveAsset', this.commentButton.style.cssText = 'display:inline-block;position:relative;box-sizing:border-box;width:24px;height:24px;background-size:24px 24px;background-position:center center;cursor:pointer;background-repeat:no-repeat;background-image:url(' + Editor.commentImage + ');', mxEvent.addListener(this.commentButton, 'click', mxUtils.bind(this, function() {
      this.actions.get('comments').funct();
    })), null != this.userElement && this.userElement.parentNode == this.buttonContainer ? this.buttonContainer.insertBefore(this.commentButton, this.userElement) : null != this.shareButton && this.shareButton.parentNode == this.buttonContainer ? this.buttonContainer.insertBefore(this.commentButton, this.shareButton) : this.buttonContainer.appendChild(this.commentButton)) : null != this.commentButton && (this.commentButton.parentNode.removeChild(this.commentButton), this.commentButton = null);
    if ('draw.io' != this.getServiceName() || '1' == urlParams.embed || this.isStandaloneApp())
      null != urlParams.notif && this.fetchAndShowNotification(urlParams.notif), !this.isStandaloneApp() || 'simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme || (this.buttonContainer.style.display = 0 == this.buttonContainer.clientWidth ? 'none' : '');
    else {
      if (null != b) {
        if (null == this.shareButton && 'atlas' != Editor.currentTheme && (this.shareButton = document.createElement('button'), this.shareButton.className = 'geBtn geShareBtn', this.shareButton.style.display = 'inline-block', this.shareButton.style.position = 'relative', this.shareButton.style.backgroundImage = 'none', this.shareButton.style.padding = '2px 10px 0 10px', this.shareButton.style.marginTop = '-10px', this.shareButton.style.cursor = 'pointer', this.shareButton.style.height = '32px', this.shareButton.style.minWidth = '0px', this.shareButton.style.top = '-2px', this.shareButton.setAttribute('title', mxResources.get('share')), b = document.createElement('img'), b.className = 'geInverseAdaptiveAsset', b.setAttribute('src', this.shareImage), b.setAttribute('align', 'absmiddle'), b.style.marginRight = '4px', b.style.marginTop = '-3px', this.shareButton.appendChild(b), 'atlas' != Editor.currentTheme && (b.style.filter = 'invert(100%)'), mxUtils.write(this.shareButton, mxResources.get('share')), mxEvent.addListener(this.shareButton, 'click', mxUtils.bind(this, function() {
            this.actions.get('share').funct();
          })), this.buttonContainer.appendChild(this.shareButton)), null != this.shareButton && (this.shareButton.style.display = 'simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme || 'min' == Editor.currentTheme ? 'none' : 'inline-block', 'simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme))
          this.shareButton.parentNode.style.display = 0 == this.shareButton.parentNode.clientWidth ? 'none' : '';
      } else
        null != this.shareButton && (this.shareButton.parentNode.removeChild(this.shareButton), this.shareButton = null);
      '1' != urlParams.extAuth && 'atlas' != Editor.currentTheme && this.fetchAndShowNotification('online', this.mode);
    }
    null != this.commentButton && (this.commentButton.style.marginRight = '', this.commentButton.style.top = '', 'simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme && 'min' != Editor.currentTheme && '1' != urlParams.embed ? this.commentButton.style.top = '-6px' : '1' == urlParams.embed && (this.commentButton.style.marginRight = '4px'));
    null != this.notificationBtn && ('simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme && 'atlas' != Editor.currentTheme && 'min' != Editor.currentTheme && '1' != urlParams.embed ? (this.notificationBtn.style.marginRight = '4px', this.notificationBtn.style.marginTop = '-12px') : (this.notificationBtn.style.marginRight = '', this.notificationBtn.style.marginTop = ''));
  }
};
App.prototype.fetchAndShowNotification = function(b, e) {
  if (!this.fetchingNotif) {
    b = b || 'online';
    var f = null,
      c = mxUtils.bind(this, function(k) {
        k = k.filter(function(E) {
          return !E.targets || -1 < E.targets.indexOf(b) || null != e && -1 < E.targets.indexOf(e);
        });
        for (var m = b + 'NotifReadTS', t = isLocalStorage ? parseInt(localStorage.getItem(m)) : !0, y = 0; y < k.length; y++)
          k[y].isNew = !t || k[y].timestamp > t;
        this.showNotification(k, m);
      });
    try {
      isLocalStorage && (f = JSON.parse(localStorage.getItem('.notifCache')));
    } catch (k) {}
    null == f || f.ts + 86400000 < Date.now() ? (this.fetchingNotif = !0, mxUtils.get(NOTIFICATIONS_URL, mxUtils.bind(this, function(k) {
      200 <= k.getStatus() && 299 >= k.getStatus() && (k = JSON.parse(k.getText()), k.sort(function(m, t) {
        return t.timestamp - m.timestamp;
      }), isLocalStorage && localStorage.setItem('.notifCache', JSON.stringify({
        ts: Date.now(),
        notifs: k
      })), this.fetchingNotif = !1, c(k));
    }))) : c(f.notifs);
  }
};
App.prototype.showNotification = function(b, e) {
  function f(z) {
    var D = document.querySelector('.geNotification-count');
    null != D && (D.innerHTML = z, D.style.display = 0 == z ? 'none' : '', D = document.querySelector('.geNotification-bell'), D.style.animation = 0 == z ? 'none' : '', D.className = 'geNotification-bell' + (0 == z ? ' geNotification-bellOff' : ''), document.querySelector('.geBell-rad').style.animation = 0 == z ? 'none' : '');
  }
  var c = b.length;
  if ('min' == uiTheme)
    for (var k = c = 0; k < b.length; k++)
      b[k].isNew && c++;
  if (0 == c)
    null != this.notificationBtn && (this.notificationBtn.style.display = 'none', this.editor.fireEvent(new mxEventObject('statusChanged')));
  else {
    var m = mxUtils.bind(this, function() {
      this.notificationWin.style.display = 'none';
      for (var z = this.notificationWin.querySelectorAll('.circle.active'), D = 0; D < z.length; D++)
        z[D].className = 'circle';
      isLocalStorage && b[0] && localStorage.setItem(e, b[0].timestamp);
    });
    if (null == this.notificationBtn) {
      this.notificationBtn = document.createElement('div');
      this.notificationBtn.className = 'geNotification-box';
      c = document.createElement('span');
      c.className = 'geNotification-count';
      this.notificationBtn.appendChild(c);
      this.notifCount = c;
      c = document.createElement('div');
      c.className = 'geNotification-bell';
      k = document.createElement('span');
      k.className = 'geBell-top';
      c.appendChild(k);
      k = document.createElement('span');
      k.className = 'geBell-middle';
      c.appendChild(k);
      k = document.createElement('span');
      k.className = 'geBell-bottom';
      c.appendChild(k);
      k = document.createElement('span');
      k.className = 'geBell-rad';
      c.appendChild(k);
      this.notificationBtn.appendChild(c);
      this.buttonContainer.insertBefore(this.notificationBtn, this.buttonContainer.firstChild);
      this.notificationWin = document.createElement('div');
      this.notificationWin.className = 'geNotifPanel';
      this.notificationWin.style.display = 'none';
      document.body.appendChild(this.notificationWin);
      k = document.createElement('div');
      k.className = 'header';
      c = document.createElement('span');
      c.className = 'title';
      c.textContent = mxResources.get('notifications');
      k.appendChild(c);
      c = document.createElement('span');
      c.className = 'closeBtn';
      c.textContent = 'x';
      k.appendChild(c);
      this.notificationWin.appendChild(k);
      k = document.createElement('div');
      k.className = 'notifications clearfix';
      var t = document.createElement('div');
      t.setAttribute('id', 'geNotifList');
      t.style.position = 'relative';
      k.appendChild(t);
      this.notificationWin.appendChild(k);
      mxEvent.addListener(this.notificationBtn, 'click', mxUtils.bind(this, function() {
        if ('none' == this.notificationWin.style.display) {
          this.notificationWin.style.display = '';
          document.querySelector('.notifications').scrollTop = 0;
          var z = this.notificationBtn.getBoundingClientRect();
          this.notificationWin.style.top = z.top + this.notificationBtn.clientHeight + 'px';
          this.notificationWin.style.left = z.right - this.notificationWin.clientWidth + 'px';
          f(0);
        } else
          m();
      }));
      mxEvent.addListener(c, 'click', m);
    } else
      this.notificationBtn.style.display = '';
    var y = 0,
      E = document.getElementById('geNotifList');
    if (null != E) {
      E.innerHTML = '<div class="line"></div>';
      for (k = 0; k < b.length; k++)
        (function(z, D) {
          D.isNew && y++;
          var J = document.createElement('div');
          J.className = 'notification';
          z = z.timeSince(new Date(D.timestamp));
          null == z && (z = mxResources.get('lessThanAMinute'));
          J.innerHTML = '<div class="circle' + (D.isNew ? ' active' : '') + '"></div><span class="time">' + mxUtils.htmlEntities(mxResources.get('timeAgo', [z], '{1} ago')) + '</span><p>' + mxUtils.htmlEntities(D.content) + '</p>';
          D.link && mxEvent.addListener(J, 'click', function() {
            window.open(D.link, 'notifWin');
          });
          E.appendChild(J);
        }(this, b[k]));
      f(y);
    }
  }
};
App.prototype.save = function(b, e) {
  var f = this.getCurrentFile();
  if (null != f && this.spinner.spin(document.body, mxResources.get('saving'))) {
    this.editor.setStatus('');
    this.editor.graph.isEditing() && this.editor.graph.stopEditing();
    var c = mxUtils.bind(this, function() {
        f.handleFileSuccess(!0);
        null != e && e();
      }),
      k = mxUtils.bind(this, function(m) {
        f.isModified() && Editor.addRetryToError(m, mxUtils.bind(this, function() {
          this.save(b, e);
        }));
        f.handleFileError(m, null == m || 'AbortError' != m.name);
      });
    try {
      b == f.getTitle() ? f.save(!0, c, k) : f.saveAs(b, c, k);
    } catch (m) {
      k(m);
    }
  }
};
App.prototype.pickFolder = function(b, e, f, c, k) {
  f = null != f ? f : !0;
  var m = this.spinner.pause();
  f && b == App.MODE_GOOGLE && null != this.drive ? this.drive.pickFolder(mxUtils.bind(this, function(t) {
    m();
    if (t.action == google.picker.Action.PICKED) {
      var y = null;
      null != t.docs && 0 < t.docs.length && 'folder' == t.docs[0].type && (y = t.docs[0].id);
      e(y);
    }
  }), k) : f && b == App.MODE_ONEDRIVE && null != this.oneDrive ? this.oneDrive.pickFolder(mxUtils.bind(this, function(t) {
    m();
    null != t && null != t.value && 0 < t.value.length && (t = OneDriveFile.prototype.getIdOf(t.value[0]), e(t));
  }), c) : f && b == App.MODE_GITHUB && null != this.gitHub ? this.gitHub.pickFolder(mxUtils.bind(this, function(t) {
    m();
    e(t);
  })) : f && b == App.MODE_GITLAB && null != this.gitLab ? this.gitLab.pickFolder(mxUtils.bind(this, function(t) {
    m();
    e(t);
  })) : f && b == App.MODE_TRELLO && null != this.trello ? this.trello.pickFolder(mxUtils.bind(this, function(t) {
    m();
    e(t);
  })) : EditorUi.prototype.pickFolder.apply(this, arguments);
};
App.prototype.exportFile = function(b, e, f, c, k, m) {
  k == App.MODE_DROPBOX ? null != this.dropbox && this.spinner.spin(document.body, mxResources.get('saving')) && this.dropbox.insertFile(e, c ? this.base64ToBlob(b, f) : b, mxUtils.bind(this, function() {
    this.spinner.stop();
  }), mxUtils.bind(this, function(t) {
    this.spinner.stop();
    this.handleError(t);
  })) : k == App.MODE_GOOGLE ? null != this.drive && this.spinner.spin(document.body, mxResources.get('saving')) && this.drive.insertFile(e, b, m, mxUtils.bind(this, function(t) {
    this.spinner.stop();
  }), mxUtils.bind(this, function(t) {
    this.spinner.stop();
    this.handleError(t);
  }), f, c) : k == App.MODE_ONEDRIVE ? null != this.oneDrive && this.spinner.spin(document.body, mxResources.get('saving')) && this.oneDrive.insertFile(e, c ? this.base64ToBlob(b, f) : b, mxUtils.bind(this, function() {
    this.spinner.stop();
  }), mxUtils.bind(this, function(t) {
    this.spinner.stop();
    this.handleError(t);
  }), !1, m) : k == App.MODE_GITHUB ? null != this.gitHub && this.spinner.spin(document.body, mxResources.get('saving')) && this.gitHub.insertFile(e, b, mxUtils.bind(this, function() {
    this.spinner.stop();
  }), mxUtils.bind(this, function(t) {
    this.spinner.stop();
    this.handleError(t);
  }), !0, m, c) : k == App.MODE_GITLAB ? null != this.gitHub && this.spinner.spin(document.body, mxResources.get('saving')) && this.gitLab.insertFile(e, b, mxUtils.bind(this, function() {
    this.spinner.stop();
  }), mxUtils.bind(this, function(t) {
    this.spinner.stop();
    this.handleError(t);
  }), !0, m, c) : k == App.MODE_TRELLO ? null != this.trello && this.spinner.spin(document.body, mxResources.get('saving')) && this.trello.insertFile(e, c ? this.base64ToBlob(b, f) : b, mxUtils.bind(this, function() {
    this.spinner.stop();
  }), mxUtils.bind(this, function(t) {
    this.spinner.stop();
    this.handleError(t);
  }), !1, m) : k == App.MODE_BROWSER && (f = mxUtils.bind(this, function() {
    localStorage.setItem(e, b);
  }), null == localStorage.getItem(e) ? f() : this.confirm(mxResources.get('replaceIt', [e]), f));
};
App.prototype.descriptorChanged = function() {
  var b = this.getCurrentFile();
  if (null != b) {
    if (null != this.fname) {
      this.fnameWrapper.style.display = 'block';
      this.fname.innerText = '';
      var e = null != b.getTitle() ? b.getTitle() : this.defaultFilename;
      mxUtils.write(this.fname, e);
      this.fname.setAttribute('title', e + ' - ' + mxResources.get('rename'));
    }
    e = this.editor.graph;
    var f = b.isEditable() && !b.invalidChecksum;
    e.isEnabled() && !f && e.reset();
    e.setEnabled(f);
    null == urlParams.rev && (this.updateDocumentTitle(), e = b.getHash(), 0 < e.length ? window.location.hash = e : 0 < window.location.hash.length && (window.location.hash = ''));
  }
  this.updateUi();
  null == this.format || null != b && this.fileEditable == b.isEditable() || !this.editor.graph.isSelectionEmpty() || (this.format.refresh(), this.fileEditable = null != b ? b.isEditable() : null);
  this.fireEvent(new mxEventObject('fileDescriptorChanged', 'file', b));
};
App.prototype.showAuthDialog = function(b, e, f, c) {
  var k = this.spinner.pause();
  this.showDialog(new AuthDialog(this, b, e, mxUtils.bind(this, function(m) {
    try {
      null != f && f(m, mxUtils.bind(this, function() {
        this.hideDialog();
        k();
      }));
    } catch (t) {
      this.editor.setStatus(mxUtils.htmlEntities(t.message));
    }
  })).container, 300, e ? 180 : 140, !0, !0, mxUtils.bind(this, function(m) {
    null != c && c(m);
    m && null == this.getCurrentFile() && null == this.dialog && this.showSplash();
  }));
};
App.prototype.convertFile = function(b, e, f, c, k, m, t, y) {
  var E = e;
  /\.svg$/i.test(E) || (E = E.substring(0, e.lastIndexOf('.')) + c);
  var z = !1;
  null != this.gitHub && b.substring(0, this.gitHub.baseUrl.length) == this.gitHub.baseUrl && (z = !0);
  if (/\.v(dx|sdx?)$/i.test(e) && Graph.fileSupport && new XMLHttpRequest().upload && 'string' === typeof new XMLHttpRequest().responseType) {
    var D = new XMLHttpRequest();
    D.open('GET', b, !0);
    z || (D.responseType = 'blob');
    if (y)
      for (var J in y)
        D.setRequestHeader(J, y[J]);
    D.onload = mxUtils.bind(this, function() {
      if (200 <= D.status && 299 >= D.status) {
        var d = null;
        z ? (d = JSON.parse(D.responseText), d = this.base64ToBlob(d.content, 'application/octet-stream')) : d = new Blob([D.response], {
          type: 'application/octet-stream'
        });
        this.importVisio(d, mxUtils.bind(this, function(g) {
          k(new LocalFile(this, g, E, !0));
        }), m, e);
      } else
        null != m && m({
          message: mxResources.get('errorLoadingFile')
        });
    });
    D.onerror = m;
    D.send();
  } else {
    var G = mxUtils.bind(this, function(d) {
      try {
        if (/\.pdf$/i.test(e)) {
          var g = Editor.extractGraphModelFromPdf(d);
          null != g && 0 < g.length && k(new LocalFile(this, g, E, !0));
        } else
          /\.png$/i.test(e) ? (g = this.extractGraphModelFromPng(d), null != g ? k(new LocalFile(this, g, E, !0)) : k(new LocalFile(this, d, e, !0))) : Graph.fileSupport && new XMLHttpRequest().upload && this.isRemoteFileFormat(d, b) ? this.parseFileData(d, mxUtils.bind(this, function(n) {
            4 == n.readyState && (200 <= n.status && 299 >= n.status ? k(new LocalFile(this, n.responseText, E, !0)) : null != m && m({
              message: mxResources.get('errorLoadingFile')
            }));
          }), e) : k(new LocalFile(this, d, E, !0));
      } catch (n) {
        null != m && m(n);
      }
    });
    f = /\.png$/i.test(e) || /\.jpe?g$/i.test(e) || /\.pdf$/i.test(e) || null != f && 'image/' == f.substring(0, 6);
    z ? mxUtils.get(b, mxUtils.bind(this, function(d) {
      if (200 <= d.getStatus() && 299 >= d.getStatus()) {
        if (null != k) {
          d = JSON.parse(d.getText());
          var g = d.content;
          'base64' === d.encoding && (g = /\.png$/i.test(e) ? 'data:image/png;base64,' + g : /\.pdf$/i.test(e) ? 'data:application/pdf;base64,' + g : !window.atob || mxClient.IS_IE || mxClient.IS_IE11 ? Base64.decode(g) : atob(g));
          G(g);
        }
      } else
        null != m && m({
          code: App.ERROR_UNKNOWN
        });
    }), function() {
      null != m && m({
        code: App.ERROR_UNKNOWN
      });
    }, !1, this.timeout, function() {
      null != m && m({
        code: App.ERROR_TIMEOUT,
        retry: fn
      });
    }, y) : null != t ? t(b, G, m, f) : this.editor.loadUrl(b, G, m, f, null, null, null, y);
  }
};
App.prototype.updateHeader = function() {
  if (null != this.menubar) {
    var b = 'url(' + Editor.logoImage + ')';
    this.appIcon = document.createElement('a');
    this.appIcon.style.display = 'block';
    this.appIcon.style.position = 'absolute';
    this.appIcon.style.width = '32px';
    this.appIcon.style.height = this.menubarHeight - 28 + 'px';
    this.appIcon.style.margin = '8px 0px 8px 16px';
    this.appIcon.style.opacity = '0.85';
    this.appIcon.style.borderRadius = '3px';
    this.appIcon.style.backgroundPosition = 'center center';
    this.appIcon.style.backgroundSize = '100% 100%';
    this.appIcon.style.backgroundRepeat = 'no-repeat';
    this.appIcon.style.backgroundImage = b;
    mxEvent.disableContextMenu(this.appIcon);
    mxEvent.addListener(this.appIcon, 'click', mxUtils.bind(this, function(c) {
      this.appIconClicked(c);
    }));
    var e = mxUtils.bind(this, function() {
      this.appIcon.style.backgroundColor = Editor.isDarkMode() ? '' : '#f08705';
    });
    this.addListener('darkModeChanged', e);
    e();
    mxUtils.setPrefixedStyle(this.appIcon.style, 'transition', 'all 125ms linear');
    mxEvent.addListener(this.appIcon, 'mouseover', mxUtils.bind(this, function() {
      var c = this.getCurrentFile();
      null != c && (c = c.getMode(), c == App.MODE_GOOGLE ? (this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/google-drive-logo-white.svg)', this.appIcon.style.backgroundSize = '70% 70%') : c == App.MODE_DROPBOX ? (this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/dropbox-logo-white.svg)', this.appIcon.style.backgroundSize = '70% 70%') : c == App.MODE_ONEDRIVE ? (this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/onedrive-logo-white.svg)', this.appIcon.style.backgroundSize = '70% 70%') : c == App.MODE_GITHUB ? (this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/github-logo-white.svg)', this.appIcon.style.backgroundSize = '70% 70%') : c == App.MODE_GITLAB ? (this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/gitlab-logo-white.svg)', this.appIcon.style.backgroundSize = '100% 100%') : c == App.MODE_TRELLO && (this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/trello-logo-white-orange.svg)', this.appIcon.style.backgroundSize = '70% 70%'));
    }));
    mxEvent.addListener(this.appIcon, 'mouseout', mxUtils.bind(this, function() {
      this.appIcon.style.backgroundImage = b;
      this.appIcon.style.backgroundSize = '90% 90%';
    }));
    '1' != urlParams.embed && this.menubarContainer.appendChild(this.appIcon);
    this.fnameWrapper = document.createElement('div');
    this.fnameWrapper.style.position = 'absolute';
    this.fnameWrapper.style.right = '120px';
    this.fnameWrapper.style.left = '60px';
    this.fnameWrapper.style.top = '9px';
    this.fnameWrapper.style.height = '26px';
    this.fnameWrapper.style.display = 'none';
    this.fnameWrapper.style.overflow = 'hidden';
    this.fnameWrapper.style.textOverflow = 'ellipsis';
    this.fname = document.createElement('a');
    this.fname.setAttribute('title', mxResources.get('rename'));
    this.fname.className = 'geItem';
    this.fname.style.padding = '2px 8px 2px 8px';
    this.fname.style.display = 'inline';
    this.fname.style.fontSize = '18px';
    this.fname.style.whiteSpace = 'nowrap';
    mxEvent.addListener(this.fname, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(c) {
      c.preventDefault();
    }));
    mxEvent.addListener(this.fname, 'click', mxUtils.bind(this, function(c) {
      var k = this.getCurrentFile();
      null != k && k.isRenamable() && (this.editor.graph.isEditing() && this.editor.graph.stopEditing(), this.actions.get('rename').funct());
      mxEvent.consume(c);
    }));
    this.fnameWrapper.appendChild(this.fname);
    '1' != urlParams.embed && (this.menubarContainer.appendChild(this.fnameWrapper), this.menubar.container.style.position = 'absolute', this.menubar.container.style.paddingLeft = '59px', this.toolbar.container.style.paddingLeft = '16px', this.menubar.container.style.boxSizing = 'border-box', this.menubar.container.style.top = '34px');
    e = 'atlas' != Editor.currentTheme && '1' != urlParams.embed ? 30 : 10;
    this.toggleFormatElement = document.createElement('a');
    this.toggleFormatElement.setAttribute('title', mxResources.get('format') + ' (' + Editor.ctrlKey + '+Shift+P)');
    this.toggleFormatElement.style.position = 'absolute';
    this.toggleFormatElement.style.display = 'inline-block';
    this.toggleFormatElement.style.top = 'atlas' == Editor.currentTheme ? '8px' : '6px';
    this.toggleFormatElement.style.right = e + 'px';
    this.toggleFormatElement.style.padding = '2px';
    this.toggleFormatElement.style.fontSize = '14px';
    this.toggleFormatElement.className = 'atlas' != Editor.currentTheme ? 'geButton geAdaptiveAsset' : '';
    this.toggleFormatElement.style.width = '16px';
    this.toggleFormatElement.style.height = '16px';
    this.toggleFormatElement.style.backgroundPosition = '50% 50%';
    this.toggleFormatElement.style.backgroundSize = '16px 16px';
    this.toggleFormatElement.style.backgroundRepeat = 'no-repeat';
    this.toolbarContainer.appendChild(this.toggleFormatElement);
    e += 20;
    mxEvent.addListener(this.toggleFormatElement, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(c) {
      c.preventDefault();
    }));
    mxEvent.addListener(this.toggleFormatElement, 'click', mxUtils.bind(this, function(c) {
      EditorUi.logEvent({
        category: 'TOOLBAR-ACTION-',
        action: 'format'
      });
      this.actions.get('format').funct();
      mxEvent.consume(c);
    }));
    var f = mxUtils.bind(this, function() {
      this.toggleFormatElement.style.backgroundImage = 0 < this.formatWidth ? 'url(\'' + this.formatShowImage + '\')' : 'url(\'' + this.formatHideImage + '\')';
    });
    this.addListener('formatWidthChanged', f);
    f();
    this.fullscreenElement = this.toggleFormatElement.cloneNode(!0);
    this.fullscreenElement.setAttribute('title', mxResources.get('fullscreen'));
    this.fullscreenElement.style.backgroundImage = 'url(\'' + Editor.fullscreenImage + '\')';
    this.fullscreenElement.style.right = e + 'px';
    this.toolbarContainer.appendChild(this.fullscreenElement);
    e += 20;
    mxEvent.addListener(this.fullscreenElement, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(c) {
      c.preventDefault();
    }));
    mxEvent.addListener(this.fullscreenElement, 'click', mxUtils.bind(this, function(c) {
      var k = this.fullscreenMode;
      EditorUi.logEvent({
        category: 'TOOLBAR-ACTION-',
        action: 'fullscreen',
        currentstate: k
      });
      'atlas' != Editor.currentTheme && '1' != urlParams.embed && this.toggleCompactMode(k);
      this.toggleShapesPanel(k);
      this.toggleFormatPanel(k);
      this.fullscreenMode = !k;
      this.fullscreenElement.style.backgroundImage = 'url(\'' + (this.fullscreenMode ? Editor.fullscreenExitImage : Editor.fullscreenImage) + '\')';
      mxEvent.consume(c);
    }));
    'atlas' == Editor.currentTheme && (mxUtils.setOpacity(this.toggleFormatElement, 70), mxUtils.setOpacity(this.fullscreenElement, 70));
    '1' != urlParams.embed && 'atlas' != Editor.currentTheme && (this.toggleElement = document.createElement('a'), this.toggleElement.setAttribute('title', mxResources.get('collapseExpand')), this.toggleElement.className = 'geButton geAdaptiveAsset', this.toggleElement.style.position = 'absolute', this.toggleElement.style.display = 'inline-block', this.toggleElement.style.width = '16px', this.toggleElement.style.height = '16px', this.toggleElement.style.color = '#666', this.toggleElement.style.top = '6px', this.toggleElement.style.right = '10px', this.toggleElement.style.padding = '2px', this.toggleElement.style.fontSize = '14px', this.toggleElement.style.textDecoration = 'none', this.toggleElement.style.backgroundImage = 'url(\'' + this.chevronUpImage + '\')', this.toggleElement.style.backgroundPosition = '50% 50%', this.toggleElement.style.backgroundRepeat = 'no-repeat', mxEvent.addListener(this.toggleElement, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(c) {
      c.preventDefault();
    })), mxEvent.addListener(this.toggleElement, 'click', mxUtils.bind(this, function(c) {
      EditorUi.logEvent({
        category: 'TOOLBAR-ACTION-',
        action: 'toggleUI'
      });
      this.toggleCompactMode();
      mxEvent.consume(c);
    })), 'atlas' != Editor.currentTheme && this.toolbarContainer.appendChild(this.toggleElement), !mxClient.IS_FF && 740 >= screen.height && 'undefined' !== typeof this.toggleElement.click && window.setTimeout(mxUtils.bind(this, function() {
      this.toggleElement.click();
    }), 0));
  }
};
App.prototype.toggleCompactMode = function(b) {
  (b = null != b ? b : this.compactMode) ? (this.menubar.container.style.position = 'absolute', this.menubar.container.style.paddingLeft = '59px', this.menubar.container.style.paddingTop = '', this.menubar.container.style.paddingBottom = '', this.menubar.container.style.top = '34px', this.toolbar.container.style.paddingLeft = '16px', this.buttonContainer.style.visibility = 'visible', this.appIcon.style.display = 'block', this.fnameWrapper.style.display = 'block', this.fnameWrapper.style.visibility = 'visible', this.menubarHeight = App.prototype.menubarHeight) : (this.menubar.container.style.position = 'relative', this.menubar.container.style.paddingLeft = '4px', this.menubar.container.style.paddingTop = '0px', this.menubar.container.style.paddingBottom = '0px', this.menubar.container.style.top = '0px', this.toolbar.container.style.paddingLeft = '8px', this.appIcon.style.display = 'none', this.fnameWrapper.style.display = 'none', this.fnameWrapper.style.visibility = 'hidden', this.menubarHeight = EditorUi.prototype.menubarHeight, 'atlas' != Editor.currentTheme && 'simple' != Editor.currentTheme && (this.buttonContainer.style.visibility = 'hidden'));
  null != this.toggleElement && (this.toggleElement.style.backgroundImage = 'url(\'' + (b ? this.chevronUpImage : this.chevronDownImage) + '\')');
  this.refresh();
  this.compactMode = !b;
};
App.prototype.getMainUser = function() {
  var b = null;
  null != this.drive && null != this.drive.getUser() ? b = this.drive.getUser() : null != this.oneDrive && null != this.oneDrive.getUser() ? b = this.oneDrive.getUser() : null != this.dropbox && null != this.dropbox.getUser() ? b = this.dropbox.getUser() : null != this.gitHub && null != this.gitHub.getUser() ? b = this.gitHub.getUser() : null != this.gitLab && null != this.gitLab.getUser() && (b = this.gitLab.getUser());
  return b;
};
App.prototype.updateUserElement = function() {
  null == this.userElement && (this.userElement = this.createUserElement(), this.menubarContainer.appendChild(this.userElement));
  this.updateUserElementStyle();
  this.updateUserElementIcon();
};
App.prototype.updateUserElementStyle = function() {
  var b = this.userElement;
  null != b && ('simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme || 'min' == Editor.currentTheme ? (b.className = 'geUser geToolbarButton', b.style.backgroundImage = 'url(' + Editor.userImage + ')', b.style.backgroundPosition = 'center center', b.style.backgroundRepeat = 'no-repeat', b.style.backgroundSize = '100% 100%', b.style.position = 'relative', b.style.margin = '0px', b.style.padding = '0px', b.style.height = '24px', b.style.width = '24px', b.style.right = '') : (b.className = 'geUser geItem', b.style.backgroundImage = 'url(' + IMAGE_PATH + '/expanded.gif)', b.style.backgroundPosition = '100% 70%', b.style.backgroundRepeat = 'no-repeat', b.style.backgroundSize = '', b.style.position = 'absolute', b.style.margin = '4px', b.style.padding = '2px', b.style.paddingRight = '16px', b.style.width = '', b.style.height = '', b.style.right = 'atlas' == Editor.currentTheme || null != this.darkModeElement ? '12px' : '26px', b.style.top = 'atlas' == Editor.currentTheme ? '8px' : '2px'));
};
App.prototype.updateUserElementIcon = function() {
  var b = this.userElement;
  if (null != b) {
    var e = this.getCurrentFile(),
      f = this.getMainUser();
    if ('1' == urlParams.embed || null == e || null == f)
      b.style.display = 'none';
    else {
      var c = mxResources.get('changeUser');
      EditorUi.removeChildNodes(b);
      b.style.display = '';
      b.innerText = '';
      'simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme && 'min' != Editor.currentTheme ? mxUtils.write(b, f.displayName) : c = f.displayName;
      if (e.isRealtimeEnabled() && e.isRealtimeSupported()) {
        f = document.createElement('img');
        f.setAttribute('border', '0');
        f.style.position = 'absolute';
        f.style.left = '16px';
        f.style.width = '12px';
        f.style.height = '12px';
        var k = e.getRealtimeError();
        e = e.getRealtimeState();
        c += ' (';
        1 == e ? (f.src = Editor.syncImage, c += mxResources.get('online')) : (f.src = Editor.syncProblemImage, c = null != k && null != k.message ? c + k.message : c + mxResources.get('disconnected'));
        c += ')';
        'simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme || 'min' == Editor.currentTheme ? (b.appendChild(f), 'min' == Editor.currentTheme && (b.style.marginRight = '4px')) : f.style.top = '2px';
      }
      b.setAttribute('title', c);
    }
  }
};
App.prototype.toggleUserPanel = function() {
  if (null == this.userPanel) {
    var b = document.createElement('div');
    b.className = 'geDialog';
    b.style.position = 'absolute';
    b.style.zIndex = 5;
    b.style.padding = '0px';
    b.style.cursor = 'default';
    b.style.minWidth = '300px';
    this.userPanel = b;
    mxEvent.addListener(document.body, 'click', mxUtils.bind(this, function(t) {
      mxEvent.isConsumed(t) || null == this.userPanel || null == this.userPanel.parentNode || this.userPanel.parentNode.removeChild(this.userPanel);
    }));
  }
  if (null != this.userPanel.parentNode)
    this.userPanel.parentNode.removeChild(this.userPanel);
  else {
    var e = !1;
    this.userPanel.innerText = '';
    b = document.createElement('img');
    b.setAttribute('src', Dialog.prototype.closeImage);
    b.setAttribute('title', mxResources.get('close'));
    b.className = 'geDialogClose';
    b.style.top = '8px';
    b.style.right = '8px';
    mxEvent.addListener(b, 'click', mxUtils.bind(this, function() {
      null != this.userPanel.parentNode && this.userPanel.parentNode.removeChild(this.userPanel);
    }));
    this.userPanel.appendChild(b);
    if (null != this.drive) {
      var f = this.drive.getUsersList();
      if (0 < f.length) {
        var c = mxUtils.bind(this, function(t, y) {
          var E = this.getCurrentFile();
          null != E && E.constructor == DriveFile ? (this.spinner.spin(document.body, y), this.fileLoaded(null), window.setTimeout(mxUtils.bind(this, function() {
            this.spinner.stop();
            t();
          }), 2000)) : t();
        });
        b = mxUtils.bind(this, function(t) {
          var y = document.createElement('tr');
          y.setAttribute('title', 'User ID: ' + t.id);
          var E = document.createElement('td');
          E.setAttribute('valig', 'middle');
          E.style.height = '59px';
          E.style.width = '66px';
          var z = document.createElement('img');
          z.setAttribute('width', '50');
          z.setAttribute('height', '50');
          z.setAttribute('border', '0');
          z.setAttribute('src', null != t.pictureUrl ? t.pictureUrl : this.defaultUserPicture);
          z.style.borderRadius = '50%';
          z.style.margin = '4px 8px 0 8px';
          E.appendChild(z);
          y.appendChild(E);
          E = document.createElement('td');
          E.setAttribute('valign', 'middle');
          E.style.whiteSpace = 'nowrap';
          E.style.paddingTop = '4px';
          E.style.maxWidth = '0';
          E.style.overflow = 'hidden';
          E.style.textOverflow = 'ellipsis';
          mxUtils.write(E, t.displayName + (t.isCurrent && 1 < f.length ? ' (' + mxResources.get('default') + ')' : ''));
          null != t.email && (mxUtils.br(E), z = document.createElement('small'), z.style.color = 'gray', mxUtils.write(z, t.email), E.appendChild(z));
          z = document.createElement('div');
          z.style.marginTop = '4px';
          var D = document.createElement('i');
          mxUtils.write(D, mxResources.get('googleDrive'));
          z.appendChild(D);
          E.appendChild(z);
          y.appendChild(E);
          t.isCurrent || (y.style.cursor = 'pointer', y.style.opacity = '0.3', mxEvent.addListener(y, 'click', mxUtils.bind(this, function(J) {
            c(mxUtils.bind(this, function() {
              this.stateArg = null;
              this.drive.setUser(t);
              this.drive.authorize(!0, mxUtils.bind(this, function() {
                this.setMode(App.MODE_GOOGLE);
                this.hideDialog();
                this.showSplash();
              }), mxUtils.bind(this, function(G) {
                this.handleError(G);
              }), !0);
            }), mxResources.get('closingFile') + '...');
            mxEvent.consume(J);
          })));
          return y;
        });
        e = !0;
        var k = document.createElement('table');
        k.style.borderSpacing = '0';
        k.style.fontSize = '10pt';
        k.style.width = '100%';
        k.style.padding = '10px';
        for (var m = 0; m < f.length; m++)
          k.appendChild(b(f[m]));
        this.userPanel.appendChild(k);
        b = document.createElement('div');
        b.style.textAlign = 'left';
        b.style.padding = '10px';
        b.style.whiteSpace = 'nowrap';
        b.style.borderTopStyle = 'solid';
        b.style.borderTopWidth = '1px';
        k = mxUtils.button(mxResources.get('signOut'), mxUtils.bind(this, function() {
          this.confirm(mxResources.get('areYouSure'), mxUtils.bind(this, function() {
            c(mxUtils.bind(this, function() {
              this.stateArg = null;
              this.drive.logout();
              this.setMode(App.MODE_GOOGLE);
              this.hideDialog();
              this.showSplash();
            }), mxResources.get('signOut'));
          }));
        }));
        k.className = 'geBtn';
        k.style.float = 'right';
        b.appendChild(k);
        k = mxUtils.button(mxResources.get('addAccount'), mxUtils.bind(this, function() {
          var t = this.drive.createAuthWin();
          t.blur();
          window.focus();
          c(mxUtils.bind(this, function() {
            this.stateArg = null;
            this.drive.authorize(!1, mxUtils.bind(this, function() {
              this.setMode(App.MODE_GOOGLE);
              this.hideDialog();
              this.showSplash();
            }), mxUtils.bind(this, function(y) {
              this.handleError(y);
            }), !0, t);
          }), mxResources.get('closingFile') + '...');
        }));
        k.className = 'geBtn';
        k.style.margin = '0px';
        b.appendChild(k);
        this.userPanel.appendChild(b);
      }
    }
    b = mxUtils.bind(this, function(t, y, E, z) {
      if (null != t) {
        e && this.userPanel.appendChild(document.createElement('hr'));
        e = !0;
        var D = document.createElement('table');
        D.style.borderSpacing = '0';
        D.style.fontSize = '10pt';
        D.style.width = '100%';
        D.style.padding = '10px';
        var J = document.createElement('tbody'),
          G = document.createElement('tr'),
          d = document.createElement('td');
        d.setAttribute('valig', 'top');
        d.style.width = '40px';
        if (null != y) {
          var g = document.createElement('img');
          g.setAttribute('width', '40');
          g.setAttribute('height', '40');
          g.setAttribute('border', '0');
          g.setAttribute('src', y);
          g.style.marginRight = '6px';
          d.appendChild(g);
        }
        G.appendChild(d);
        d = document.createElement('td');
        d.setAttribute('valign', 'middle');
        d.style.whiteSpace = 'nowrap';
        d.style.maxWidth = '0';
        d.style.overflow = 'hidden';
        d.style.textOverflow = 'ellipsis';
        mxUtils.write(d, t.displayName);
        null != t.email && (mxUtils.br(d), y = document.createElement('small'), y.style.color = 'gray', mxUtils.write(y, t.email), d.appendChild(y));
        null != z && (t = document.createElement('div'), t.style.marginTop = '4px', y = document.createElement('i'), mxUtils.write(y, z), t.appendChild(y), d.appendChild(t));
        G.appendChild(d);
        J.appendChild(G);
        D.appendChild(J);
        this.userPanel.appendChild(D);
        t = document.createElement('div');
        t.style.textAlign = 'center';
        t.style.padding = '10px';
        t.style.whiteSpace = 'nowrap';
        null != E && (E = mxUtils.button(mxResources.get('signOut'), E), E.className = 'geBtn', t.appendChild(E));
        this.userPanel.appendChild(t);
      }
    });
    null != this.dropbox && b(this.dropbox.getUser(), IMAGE_PATH + '/dropbox-logo.svg', mxUtils.bind(this, function() {
      var t = this.getCurrentFile();
      if (null != t && t.constructor == DropboxFile) {
        var y = mxUtils.bind(this, function() {
          this.dropbox.logout();
          window.location.hash = '';
        });
        t.isModified() ? this.confirm(mxResources.get('allChangesLost'), null, y, mxResources.get('cancel'), mxResources.get('discardChanges')) : y();
      } else
        this.dropbox.logout();
    }), mxResources.get('dropbox'));
    null != this.oneDrive && b(this.oneDrive.getUser(), IMAGE_PATH + '/onedrive-logo.svg', this.oneDrive.noLogout ? null : mxUtils.bind(this, function() {
      var t = this.getCurrentFile();
      if (null != t && t.constructor == OneDriveFile) {
        var y = mxUtils.bind(this, function() {
          this.oneDrive.logout();
          window.location.hash = '';
        });
        t.isModified() ? this.confirm(mxResources.get('allChangesLost'), null, y, mxResources.get('cancel'), mxResources.get('discardChanges')) : y();
      } else
        this.oneDrive.logout();
    }), mxResources.get('oneDrive'));
    null != this.gitHub && b(this.gitHub.getUser(), IMAGE_PATH + '/github-logo.svg', mxUtils.bind(this, function() {
      var t = this.getCurrentFile();
      if (null != t && t.constructor == GitHubFile) {
        var y = mxUtils.bind(this, function() {
          this.gitHub.logout();
          window.location.hash = '';
        });
        t.isModified() ? this.confirm(mxResources.get('allChangesLost'), null, y, mxResources.get('cancel'), mxResources.get('discardChanges')) : y();
      } else
        this.gitHub.logout();
    }), mxResources.get('github'));
    null != this.gitLab && b(this.gitLab.getUser(), IMAGE_PATH + '/gitlab-logo.svg', mxUtils.bind(this, function() {
      var t = this.getCurrentFile();
      if (null != t && t.constructor == GitLabFile) {
        var y = mxUtils.bind(this, function() {
          this.gitLab.logout();
          window.location.hash = '';
        });
        t.isModified() ? this.confirm(mxResources.get('allChangesLost'), null, y, mxResources.get('cancel'), mxResources.get('discardChanges')) : y();
      } else
        this.gitLab.logout();
    }), mxResources.get('gitlab'));
    null != this.trello && b(this.trello.getUser(), IMAGE_PATH + '/trello-logo.svg', mxUtils.bind(this, function() {
      var t = this.getCurrentFile();
      if (null != t && t.constructor == TrelloFile) {
        var y = mxUtils.bind(this, function() {
          this.trello.logout();
          window.location.hash = '';
        });
        t.isModified() ? this.confirm(mxResources.get('allChangesLost'), null, y, mxResources.get('cancel'), mxResources.get('discardChanges')) : y();
      } else
        this.trello.logout();
    }), mxResources.get('trello'));
    'min' == uiTheme && (k = this.getCurrentFile(), null != k && k.isRealtimeEnabled() && k.isRealtimeSupported() && (b = document.createElement('div'), b.style.padding = '10px', b.style.whiteSpace = 'nowrap', b.style.borderTop = '1px solid rgb(224, 224, 224)', b.style.marginTop = '4px', b.style.textAlign = 'center', b.style.padding = '10px', b.style.fontSize = '9pt', m = k.getRealtimeError(), 1 != k.getRealtimeState() && (mxUtils.write(b, mxResources.get('realtimeCollaboration') + ': ' + (null != m && null != m.message ? m.message : mxResources.get('disconnected'))), this.userPanel.appendChild(b))));
    document.body.appendChild(this.userPanel);
  }
};
App.prototype.createUserElement = function() {
  var b = document.createElement('a');
  mxEvent.addListener(b, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(e) {
    e.preventDefault();
  }));
  mxEvent.addListener(b, 'click', mxUtils.bind(this, function(e) {
    this.toggleUserPanel();
    this.userPanel.style.top = b.clientTop + b.clientHeight + 6 + 'px';
    this.userPanel.style.right = '36px';
    this.userPanel.style.left = '';
    mxEvent.consume(e);
  }));
  return b;
};
App.prototype.getCurrentUser = function() {
  var b = null;
  null != this.drive && null != this.drive.getUser() ? b = this.drive.getUser() : null != this.oneDrive && null != this.oneDrive.getUser() ? b = this.oneDrive.getUser() : null != this.dropbox && null != this.dropbox.getUser() ? b = this.dropbox.getUser() : null != this.gitHub && null != this.gitHub.getUser() && (b = this.gitHub.getUser());
  return b;
};