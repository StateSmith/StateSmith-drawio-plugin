DriveLibrary = function(b, e, f) {
  DriveFile.call(this, b, e, f);
};
mxUtils.extend(DriveLibrary, DriveFile);
DriveLibrary.prototype.isAutosave = function() {
  return !0;
};
DriveLibrary.prototype.save = function(b, e, f) {
  this.ui.drive.saveFile(this, b, mxUtils.bind(this, function(c) {
    this.desc = c;
    null != e && e(c);
  }), f);
};
DriveLibrary.prototype.open = function() {};
(function() {
  var b = null,
    e = {};
  window.DriveClient = function(f, c) {
    null == c && null != window.urlParams && '1' == window.urlParams.extAuth && (c = !0);
    mxEventSource.call(this);
    DrawioClient.call(this, f, 'gDriveAuthInfo');
    this.isExtAuth = c;
    this.ui = f;
    this.xmlMimeType = 'application/vnd.jgraph.mxfile';
    this.mimeType = 'application/vnd.jgraph.mxfile.realtime';
    this.ui.editor.chromeless && !this.ui.editor.editable && '1' != urlParams.rt && '1' != urlParams.extAuth ? (this.cookieName = 'gDriveViewerAuthInfo', this.token = this.getPersistentToken(), this.appId = window.DRAWIO_GOOGLE_VIEWER_APP_ID || '850530949725', this.clientId = window.DRAWIO_GOOGLE_VIEWER_CLIENT_ID || '850530949725.apps.googleusercontent.com', this.scopes = [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]) : (this.appId = window.DRAWIO_GOOGLE_APP_ID || '671128082532', this.clientId = window.DRAWIO_GOOGLE_CLIENT_ID || '671128082532-jhphbq6d0e1gnsus9mn7vf8a6fjn10mp.apps.googleusercontent.com');
    this.mimeTypes = this.xmlMimeType + ',application/mxe,application/mxr,application/vnd.jgraph.mxfile.realtime,application/vnd.jgraph.mxfile.rtlegacy';
    f = JSON.parse(this.token);
    null != f && null != f.current && (this.userId = f.current.userId, this.authCalled = !1);
  };
  mxUtils.extend(DriveClient, mxEventSource);
  mxUtils.extend(DriveClient, DrawioClient);
  DriveClient.prototype.redirectUri = window.location.protocol + '//' + window.location.host + '/google';
  DriveClient.prototype.GDriveBaseUrl = 'https://www.googleapis.com/drive/v2';
  DriveClient.prototype.scopes = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.install',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];
  DriveClient.prototype.allFields = 'kind,id,parents,headRevisionId,etag,title,mimeType,modifiedDate,editable,copyable,canComment,labels,properties,downloadUrl,webContentLink,userPermission,fileSize';
  DriveClient.prototype.catchupFields = 'etag,headRevisionId,modifiedDate,properties(key,value)';
  DriveClient.prototype.enableThumbnails = !0;
  DriveClient.prototype.thumbnailWidth = 1000;
  DriveClient.prototype.maxThumbnailSize = 2000000;
  DriveClient.prototype.placeholderThumbnail = 'iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAACN1BMVEXwhwXvhgX4iwXzhwXgbQzvhgXhbAzocgzqcwzldAoAAADhbgvjcQnmdgrlbgDwhgXsfwXufgjwhgXwgQfziAXxgADibgz4iwX4jAX3iwTpcwr1igXoewjsfgj3igX4iwXqcQv4jAX3iwXtfQnndQrvhAbibArwhwXgbQz//////v39jwX6jQX+/v7fagHfawzdVQDwhADgbhPgbhXwhwPocQ3uvKvwiA/faQDscgzxiAT97+XgciTgcSP6jAXgbQ3gcCHwiRfpcQzwhwfeXQD77ef74NLvhgTvegD66uPgbAf66+TvfADwjCzgcCfwiSD67ObhcjjwiBHhczvwiyrgbxj///777ujgcSHgcB/xiRzgbhveWgDeVwDhdEDgbRDqfgffYgDfXwD97+bvfQDxiz7//vvwiRr118rrcgztggbfZgDfZAD++PT98+3gbBPsgAb99vD33tPgcB7icAvuhAX//Pn66N/00sTyy7vuuqbjekLwhwzkcgr88er449n++vfutp/kh1vgcBvhbwvmdwnwgwDwgADeWQD87eLxxrTssJjqpIf0roHmjWTkhFP759n63czvvanomnjnlHDhczD22cr4y6/wwa/3xKX2wJ3rqpH0tY7qp4vpnoDymlbjf0vxjjntcwzldAroegj/kgX12s7518PzqnnnkWfynmLieUjpewjrdAD40Lj1uZTzpm3idTbiciLydQzzfwnyiQTsfgD3xqnzp3TxlkzgbCrdTwDdSwBLKUlNAAAAJ3RSTlP8/b2X/YH8wb+FAIuIggJbQin5opAM9+a/ubaubyD78NjSyr2WgRp4sjN4AAAI70lEQVR42u2cZ38SQRDGT8WGvfde4E4BxVMRRaKiUURRlJhQRDCCSgQVO/bee++9994+nMt5ywoezFJd/fm8uITi3p9n5mbYkcCpO6rVnVu2YEXd+3dRIySuo7pLv4GjGNKg7j3UHTl1l14PajmG9OFBnx7Ird4PumpYEtf1QXc112l0M7OGKXEfeg3guo3iNIyJG92Jaz61mYYxcaNacs1H/8f6j6X5j1WI/mMVIsawRFEzI49SjwOqAJa43emclk8Rp2c7AFZ+LDGyvXE2kmO2Q1Lq17RSd6ND48QIwFVuLNHTOPbEpTOz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'.replace(/\+/g, '-').replace(/\//g, '_');
  DriveClient.prototype.placeholderMimeType = 'image/png';
  DriveClient.prototype.libraryMimeType = 'application/vnd.jgraph.mxlibrary';
  DriveClient.prototype.newAppHostname = 'app.diagrams.net';
  DriveClient.prototype.extension = '.drawio';
  DriveClient.prototype.tokenRefreshInterval = 0;
  DriveClient.prototype.lastTokenRefresh = 0;
  DriveClient.prototype.maxRetries = 5;
  DriveClient.prototype.staleEtagMaxRetries = 3;
  DriveClient.prototype.coolOff = 1000;
  DriveClient.prototype.mimeTypeCheckCoolOff = 60000;
  DriveClient.prototype.user = null;
  DriveClient.prototype.sameWinAuthMode = !1;
  DriveClient.prototype.sameWinRedirectUrl = null;
  DriveClient.prototype.setUser = function(f) {
    this.user = f;
    null == this.user ? (this.userId = null, null != this.tokenRefreshThread && (window.clearTimeout(this.tokenRefreshThread), this.tokenRefreshThread = null)) : this.userId = f.id;
    this.fireEvent(new mxEventObject('userChanged'));
  };
  DriveClient.prototype.setUserId = function(f) {
    this.userId = f;
    null != this.user && this.user.id != this.userId && (this.user = null);
  };
  DriveClient.prototype.getUser = function() {
    return this.user;
  };
  DriveClient.prototype.getUsersList = function() {
    var f = [],
      c = JSON.parse(this.getPersistentToken(!0)),
      k = null;
    if (null != c) {
      null != c.current && (k = c.current.userId, f.push(c[k].user), f[0].isCurrent = !0);
      for (var m in c)
        'current' != m && m != k && f.push(c[m].user);
    }
    return f;
  };
  DriveClient.prototype.logout = function() {
    this.ui.editor.loadUrl(this.redirectUri + '?doLogout=1&userId=' + this.userId + '&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname));
    this.clearPersistentToken();
    this.setUser(null);
    b = null;
  };
  DriveClient.prototype.execute = function(f) {
    var c = mxUtils.bind(this, function(k) {
      this.ui.showAuthDialog(this, !0, mxUtils.bind(this, function(m, t) {
        this.authorize(!1, mxUtils.bind(this, function() {
          null != t && t();
          f();
        }), mxUtils.bind(this, function(y) {
          var E = null != y.message ? y.message : mxResources.get('cannotLogin');
          null != y && null != y.error && 403 == y.error.code && null != y.error.data && 0 < y.error.data.length && 'domainPolicy' == y.error.data[0].reason && (E = y.error.message);
          this.logout();
          this.ui.showError(mxResources.get('error'), E, mxResources.get('help'), mxUtils.bind(this, function() {
            this.ui.openLink('https://www.diagrams.net/doc/faq/gsuite-authorisation-troubleshoot');
          }), null, mxResources.get('ok'));
        }), m);
      }));
    });
    this.authorize(!0, f, c);
  };
  DriveClient.prototype.executeRequest = function(f, c, k) {
    try {
      var m = !0,
        t = null,
        y = 0;
      null != this.requestThread && window.clearTimeout(this.requestThread);
      var E = mxUtils.bind(this, function() {
        try {
          this.requestThread = null;
          this.currentRequest = f;
          null != t && window.clearTimeout(t);
          t = window.setTimeout(mxUtils.bind(this, function() {
            m = !1;
            null != k && k({
              code: App.ERROR_TIMEOUT,
              message: mxResources.get('timeout'),
              retry: E
            });
          }), this.ui.timeout);
          var z = null,
            D = !1;
          'string' === typeof f.params ? z = f.params : null != f.params && (z = JSON.stringify(f.params), D = !0);
          var J = f.fullUrl || this.GDriveBaseUrl + f.url;
          D && (J += (0 < J.indexOf('?') ? '&' : '?') + 'alt=json');
          var G = new mxXmlRequest(J, z, f.method || 'GET');
          G.setRequestHeaders = mxUtils.bind(this, function(d, g) {
            if (null != f.headers)
              for (var n in f.headers)
                d.setRequestHeader(n, f.headers[n]);
            else
              null != f.contentType ? d.setRequestHeader('Content-Type', f.contentType) : D && d.setRequestHeader('Content-Type', 'application/json');
            d.setRequestHeader('Authorization', 'Bearer ' + b);
          });
          G.send(mxUtils.bind(this, function(d) {
            try {
              if (window.clearTimeout(t), m) {
                try {
                  var g = JSON.parse(d.getText());
                } catch (u) {
                  g = null;
                }
                if (200 <= d.getStatus() && 299 >= d.getStatus())
                  null != c && c(g);
                else {
                  var n = null != g && null != g.error ? null != g.error.data ? g.error.data : g.error.errors : null,
                    v = null != n && 0 < n.length ? n[0].reason : null;
                  null == k || null == g || null == g.error || -1 != g.error.code && (403 != g.error.code || 'domainPolicy' != v && 'The requested mime type change is forbidden.' != g.error.message) ? null != g && null != g.error && (401 == g.error.code || 403 == g.error.code && 'rateLimitExceeded' != v) ? 403 == g.error.code && this.retryAuth || 401 == g.error.code && this.retryAuth && 'authError' == v ? (null != k && k(g), this.retryAuth = !1) : (this.retryAuth = !0, this.execute(E)) : null != g && null != g.error && 412 != g.error.code && 404 != g.error.code && 400 != g.error.code && this.currentRequest == f && y < this.maxRetries ? (y++, this.requestThread = window.setTimeout(E, Math.round(Math.pow(2, y) * (1 + 0.1 * (Math.random() - 0.5)) * this.coolOff))) : null != k && k(g) : k(g);
                }
              }
            } catch (u) {
              if (null != k)
                k(u);
              else
                throw u;
            }
          }));
        } catch (d) {
          if (null != k)
            k(d);
          else
            throw d;
        }
      });
      null != b && this.authCalled ? E() : this.execute(E);
    } catch (z) {
      if (null != k)
        k(z);
      else
        throw z;
    }
  };
  DriveClient.prototype.createAuthWin = function(f) {
    return window.open(f ? f : 'about:blank', 'gdauth', [
      'width=525,height=525',
      'top=' + (window.screenY + Math.max(window.outerHeight - 525, 0) / 2),
      'left=' + (window.screenX + Math.max(window.outerWidth - 525, 0) / 2),
      'status=no,resizable=yes,toolbar=no,menubar=no,scrollbars=yes'
    ].join());
  };
  DriveClient.prototype.authorize = function(f, c, k, m, t) {
    this.isExtAuth && !f ? window.parent.driveAuth(mxUtils.bind(this, function(y) {
      this.updateAuthInfo(y, !0, !0, c, k);
    }), k) : new mxXmlRequest(this.redirectUri + '?getState=1', null, 'GET').send(mxUtils.bind(this, function(y) {
      200 <= y.getStatus() && 299 >= y.getStatus() ? this.authorizeStep2(y.getText(), f, c, k, m, t) : null != k && k(y);
    }), k);
  };
  DriveClient.prototype.updateAuthInfo = function(f, c, k, m, t) {
    b = f.access_token;
    delete f.access_token;
    f.expires = Date.now() + 1000 * parseInt(f.expires_in);
    f.remember = c;
    this.resetTokenRefresh(f);
    this.authCalled = !0;
    if (k || null == this.user) {
      var y = JSON.stringify(f);
      this.updateUser(mxUtils.bind(this, function() {
        var E = JSON.parse(y);
        this.setPersistentToken(E, !c);
        null != m && m();
      }), t);
    } else
      null != m && (this.setPersistentToken(f, !c), m());
  };
  DriveClient.prototype.authorizeStep2 = function(f, c, k, m, t, y) {
    try {
      null != this.ui.stateArg && null != this.ui.stateArg.userId && (this.userId = this.ui.stateArg.userId, null != this.user && this.user.id != this.userId && (this.user = null));
      if (null == this.userId) {
        var E = JSON.parse(this.getPersistentToken(!0));
        E && null != E.current && (this.userId = E.current.userId);
      }
      if (c && null == this.userId)
        null != m && m();
      else if (c)
        new mxXmlRequest(this.redirectUri + '?state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + f) + '&userId=' + this.userId, null, 'GET').send(mxUtils.bind(this, function(D) {
          200 <= D.getStatus() && 299 >= D.getStatus() ? (D = JSON.parse(D.getText()), this.updateAuthInfo(D, !0, !1, k, m)) : (0 != D.getStatus() && this.logout(), null != m && m(D));
        }), m);
      else {
        var z = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' + this.clientId + '&redirect_uri=' + encodeURIComponent(this.redirectUri) + '&response_type=code&include_granted_scopes=true' + (t ? '&access_type=offline&prompt=consent%20select_account' : '') + '&scope=' + encodeURIComponent(this.scopes.join(' ')) + '&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + f + (this.sameWinRedirectUrl ? '&redirect=' + this.sameWinRedirectUrl : ''));
        this.sameWinAuthMode ? (window.location.assign(z), y = null) : null == y ? y = this.createAuthWin(z) : y.location = z;
        null != y ? (window.onGoogleDriveCallback = mxUtils.bind(this, function(D, J) {
          window.onGoogleDriveCallback = null;
          try {
            null == D ? null != m && m({
              message: mxResources.get('accessDenied')
            }) : this.updateAuthInfo(D, t, !0, k, m);
          } catch (G) {
            null != m && m(G);
          } finally {
            null != J && J.close();
          }
        }), y.focus()) : null != m && m({
          message: mxResources.get('allowPopups')
        });
      }
    } catch (D) {
      if (null != m)
        m(D);
      else
        throw D;
    }
  };
  DriveClient.prototype.resetTokenRefresh = function(f) {
    null != this.tokenRefreshThread && (window.clearTimeout(this.tokenRefreshThread), this.tokenRefreshThread = null);
    null != f && null == f.error && 0 < f.expires_in && (this.tokenRefreshInterval = 1000 * parseInt(f.expires_in), this.lastTokenRefresh = new Date().getTime(), this.tokenRefreshThread = window.setTimeout(mxUtils.bind(this, function() {
      this.authorize(!0, mxUtils.bind(this, function() {}), mxUtils.bind(this, function() {}));
    }), 900 * f.expires_in));
  };
  DriveClient.prototype.checkToken = function(f) {
    var c = 0 < this.lastTokenRefresh;
    new Date().getTime() - this.lastTokenRefresh > this.tokenRefreshInterval || null == this.tokenRefreshThread ? this.execute(mxUtils.bind(this, function() {
      f();
      c && this.fireEvent(new mxEventObject('disconnected'));
    })) : f();
  };
  DriveClient.prototype.updateUser = function(f, c) {
    try {
      var k = {
        Authorization: 'Bearer ' + b
      };
      this.ui.editor.loadUrl('https://www.googleapis.com/oauth2/v2/userinfo?alt=json', mxUtils.bind(this, function(m) {
        var t = JSON.parse(m);
        this.executeRequest({
          url: '/about'
        }, mxUtils.bind(this, function(y) {
          var E = mxResources.get('notAvailable'),
            z = E,
            D = null;
          null != y && null != y.user && (E = y.user.emailAddress, z = y.user.displayName, D = null != y.user.picture ? y.user.picture.url : null);
          this.setUser(new DrawioUser(t.id, E, z, D, t.locale));
          this.userId = t.id;
          null != f && f();
        }), c);
      }), c, null, null, null, null, k);
    } catch (m) {
      if (null != c)
        c(m);
      else
        throw m;
    }
  };
  DriveClient.prototype.copyFile = function(f, c, k, m) {
    null != f && null != c && this.executeRequest({
      url: '/files/' + f + '/copy?fields=' + encodeURIComponent(this.allFields) + '&supportsAllDrives=true&enforceSingleParent=true',
      method: 'POST',
      params: {
        title: c,
        properties: [{
          key: 'channel',
          value: Editor.guid()
        }]
      }
    }, k, m);
  };
  DriveClient.prototype.renameFile = function(f, c, k, m) {
    null != f && null != c && this.executeRequest(this.createDriveRequest(f, {
      title: c
    }), k, m);
  };
  DriveClient.prototype.moveFile = function(f, c, k, m) {
    null != f && null != c && this.executeRequest(this.createDriveRequest(f, {
      parents: [{
        kind: 'drive#fileLink',
        id: c
      }]
    }), k, m);
  };
  DriveClient.prototype.createDriveRequest = function(f, c) {
    return {
      url: '/files/' + f + '?uploadType=multipart&supportsAllDrives=true',
      method: 'PUT',
      contentType: 'application/json; charset=UTF-8',
      params: c
    };
  };
  DriveClient.prototype.getLibrary = function(f, c, k) {
    return this.getFile(f, c, k, !0, !0);
  };
  DriveClient.prototype.loadDescriptor = function(f, c, k, m) {
    this.executeRequest({
      url: '/files/' + f + '?supportsAllDrives=true&fields=' + (null != m ? m : this.allFields)
    }, c, k);
  };
  DriveClient.prototype.listFiles = function(f, c, k, m, t) {
    this.executeRequest({
      url: '/files?supportsAllDrives=true&includeItemsFromAllDrives=true&q=' + encodeURIComponent('(mimeType contains \'' + this.xmlMimeType + '\') ' + (f ? ' and (title contains \'' + f + '\')' : '') + (c ? ' and (modifiedDate > \'' + c.toISOString() + '\')' : '') + (k ? ' and (\'me\' in owners)' : '')) + '&orderBy=modifiedDate desc,title'
    }, m, t);
  };
  DriveClient.prototype.getCustomProperty = function(f, c) {
    f = f.properties;
    var k = null;
    if (null != f)
      for (var m = 0; m < f.length; m++)
        if (f[m].key == c) {
          k = f[m].value;
          break;
        }
    return k;
  };
  DriveClient.prototype.getFile = function(f, c, k, m, t) {
    m = null != m ? m : !1;
    t = null != t ? t : !1;
    null != urlParams.rev ? this.executeRequest({
      url: '/files/' + f + '/revisions/' + urlParams.rev + '?supportsAllDrives=true'
    }, mxUtils.bind(this, function(y) {
      y.title = y.originalFilename;
      y.headRevisionId = y.id;
      y.id = f;
      this.getXmlFile(y, c, k);
    }), k) : this.loadDescriptor(f, mxUtils.bind(this, function(y) {
      try {
        if (null != this.user) {
          var E = /\.png$/i.test(y.title);
          /\.v(dx|sdx?)$/i.test(y.title) || /\.gliffy$/i.test(y.title) || !this.ui.useCanvasForExport && E ? this.ui.convertFile(y.downloadUrl, y.title, y.mimeType, this.extension, c, k, null, {
            Authorization: 'Bearer ' + b
          }) : m || t || y.mimeType == this.libraryMimeType || y.mimeType == this.xmlMimeType ? this.getXmlFile(y, c, k, !0, t) : this.getXmlFile(y, c, k);
        } else
          k({
            message: mxResources.get('loggedOut')
          });
      } catch (z) {
        if (null != k)
          k(z);
        else
          throw z;
      }
    }), k);
  };
  DriveClient.prototype.isGoogleRealtimeMimeType = function(f) {
    return null != f && 'application/vnd.jgraph.mxfile.' == f.substring(0, 30);
  };
  DriveClient.prototype.getXmlFile = function(f, c, k, m, t) {
    try {
      var y = {
          Authorization: 'Bearer ' + b
        },
        E = f.downloadUrl;
      if (null == E)
        null != k && k({
          message: mxResources.get('exportOptionsDisabledDetails')
        });
      else {
        var z = 0,
          D = mxUtils.bind(this, function() {
            this.ui.editor.loadUrl(E, mxUtils.bind(this, function(J) {
              try {
                if (null == J)
                  k({
                    message: mxResources.get('invalidOrMissingFile')
                  });
                else if (f.mimeType == this.libraryMimeType || t)
                  f.mimeType != this.libraryMimeType || t ? c(new DriveLibrary(this.ui, J, f)) : k({
                    message: mxResources.get('notADiagramFile')
                  });
                else {
                  var G = !1;
                  if (/\.png$/i.test(f.title)) {
                    var d = J.lastIndexOf(',');
                    if (0 < d) {
                      var g = this.ui.extractGraphModelFromPng(J);
                      if (null != g && 0 < g.length)
                        J = g;
                      else
                        try {
                          g = J.substring(d + 1);
                          var n = !window.atob || mxClient.IS_IE || mxClient.IS_IE11 ? Base64.decode(g) : atob(g),
                            v = this.ui.editor.extractGraphModel(mxUtils.parseXml(n).documentElement, !0);
                          null == v || 0 < v.getElementsByTagName('parsererror').length ? G = !0 : J = n;
                        } catch (u) {
                          G = !0;
                        }
                    }
                  } else
                    /\.pdf$/i.test(f.title) ? (g = Editor.extractGraphModelFromPdf(J), null != g && 0 < g.length && (G = !0, J = g)) : 'data:image/png;base64,PG14ZmlsZS' == J.substring(0, 32) && (n = J.substring(22), J = window.atob && !mxClient.IS_SF ? atob(n) : Base64.decode(n));
                  Graph.fileSupport && new XMLHttpRequest().upload && this.ui.isRemoteFileFormat(J, E) ? this.ui.parseFileData(J, mxUtils.bind(this, function(u) {
                    try {
                      4 == u.readyState && (200 <= u.status && 299 >= u.status ? c(new LocalFile(this.ui, u.responseText, f.title + this.extension, !0)) : null != k && k({
                        message: mxResources.get('errorLoadingFile')
                      }));
                    } catch (x) {
                      if (null != k)
                        k(x);
                      else
                        throw x;
                    }
                  }), f.title) : c(G ? new LocalFile(this.ui, J, f.title, !0) : new DriveFile(this.ui, J, f));
                }
              } catch (u) {
                if (null != k)
                  k(u);
                else
                  throw u;
              }
            }), mxUtils.bind(this, function(J, G) {
              if (z < this.maxRetries && null != G && 403 == G.getStatus())
                z++, window.setTimeout(D, 2 * z * this.coolOff * (1 + 0.1 * (Math.random() - 0.5)));
              else if (null != k)
                k(J);
              else
                throw J;
            }), null != f.mimeType && 'image/' == f.mimeType.substring(0, 6) && 'image/svg' != f.mimeType.substring(0, 9) || /\.png$/i.test(f.title) || /\.jpe?g$/i.test(f.title) || /\.pdf$/i.test(f.title), null, null, null, y);
          });
        D();
      }
    } catch (J) {
      if (null != k)
        k(J);
      else
        throw J;
    }
  };
  DriveClient.prototype.saveFile = function(f, c, k, m, t, y, E, z, D) {
    try {
      var J = 0;
      f.saveLevel = 1;
      var G = mxUtils.bind(this, function(q) {
          if (null != m)
            m(q);
          else
            throw q;
          try {
            if (!f.isConflict(q)) {
              var A = 'sl_' + f.saveLevel + '-error_' + (f.getErrorMessage(q) || 'unknown');
              null != q && null != q.error && null != q.error.code && (A += '-code_' + q.error.code);
              EditorUi.logEvent({
                category: 'ERROR-SAVE-FILE-' + f.getHash() + '-rev_' + f.desc.headRevisionId + '-mod_' + f.desc.modifiedDate + '-size_' + f.getSize() + '-mime_' + f.desc.mimeType + (this.ui.editor.autosave ? '' : '-nosave') + (f.isAutosave() ? '' : '-noauto') + (f.changeListenerEnabled ? '' : '-nolisten') + (f.inConflictState ? '-conflict' : '') + (f.invalidChecksum ? '-invalid' : ''),
                action: A,
                label: (null != this.user ? 'user_' + this.user.id : 'nouser') + (null != f.sync ? '-client_' + f.sync.clientId : '-nosync')
              });
            }
          } catch (H) {}
        }),
        d = mxUtils.bind(this, function(q) {
          G(q);
          try {
            EditorUi.logError(q.message, null, null, q);
          } catch (A) {}
        });
      if (f.isEditable() && null != f.desc) {
        var g = new Date().getTime(),
          n = f.desc.etag,
          v = f.desc.modifiedDate,
          u = f.desc.headRevisionId,
          x = this.ui.useCanvasForExport && /(\.png)$/i.test(f.getTitle());
        y = null != y ? y : !1;
        var C = null,
          F = !1,
          L = {
            mimeType: f.desc.mimeType,
            title: f.getTitle()
          };
        if (this.isGoogleRealtimeMimeType(L.mimeType))
          L.mimeType = this.xmlMimeType, C = f.desc, F = c = !0;
        else if ('application/octet-stream' == L.mimeType || '1' == urlParams['override-mime'] && L.mimeType != this.xmlMimeType)
          L.mimeType = this.xmlMimeType;
        var l = mxUtils.bind(this, function(q, A, H) {
          try {
            f.saveLevel = 3;
            f.constructor == DriveFile && (null == z && (z = []), null == f.getChannelId() && z.push({
              key: 'channel',
              value: Editor.guid(32)
            }), null == f.getChannelKey() && z.push({
              key: 'key',
              value: Editor.guid(32)
            }), z.push({
              key: 'secret',
              value: null != D ? D : Editor.guid(32)
            }));
            H || (null != q || y || (q = this.placeholderThumbnail, A = this.placeholderMimeType), null != q && null != A && (L.thumbnail = {
              image: q,
              mimeType: A
            }));
            var K = f.getData(),
              M = mxUtils.bind(this, function(P) {
                try {
                  if (f.saveDelay = new Date().getTime() - g, f.saveLevel = 11, null == P)
                    G({
                      message: mxResources.get('errorSavingFile') + ': Empty response'
                    });
                  else {
                    var O = new Date(P.modifiedDate).getTime() - new Date(v).getTime();
                    if (0 >= O || n == P.etag || c && u == P.headRevisionId) {
                      f.saveLevel = 12;
                      var W = [];
                      0 >= O && W.push('invalid modified time');
                      n == P.etag && W.push('stale etag');
                      c && u == P.headRevisionId && W.push('stale revision');
                      var p = W.join(', ');
                      G({
                        message: mxResources.get('errorSavingFile') + ': ' + p
                      }, P);
                      try {
                        EditorUi.logError('Critical: Error saving to Google Drive ' + f.desc.id, null, 'from-' + u + '.' + v + '-' + this.ui.hashValue(n) + '-to-' + P.headRevisionId + '.' + P.modifiedDate + '-' + this.ui.hashValue(P.etag) + (0 < p.length ? '-errors-' + p : ''), 'user-' + (null != this.user ? this.user.id : 'nouser') + (null != f.sync ? '-client_' + f.sync.clientId : '-nosync'));
                      } catch (B) {}
                    } else if (f.saveLevel = null, k(P, K), null != C) {
                      this.executeRequest({
                        url: '/files/' + C.id + '/revisions/' + C.headRevisionId + '?supportsAllDrives=true'
                      }, mxUtils.bind(this, mxUtils.bind(this, function(B) {
                        B.pinned = !0;
                        this.executeRequest({
                          url: '/files/' + C.id + '/revisions/' + C.headRevisionId,
                          method: 'PUT',
                          params: B
                        });
                      })));
                      try {
                        EditorUi.logEvent({
                          category: f.convertedFrom + '-CONVERT-FILE-' + f.getHash(),
                          action: 'from_' + C.id + '.' + C.headRevisionId + '-to_' + f.desc.id + '.' + f.desc.headRevisionId,
                          label: null != this.user ? 'user_' + this.user.id : 'nouser' + (null != f.sync ? '-client_' + f.sync.clientId : 'nosync')
                        });
                      } catch (B) {}
                    }
                  }
                } catch (B) {
                  d(B);
                }
              }),
              I = mxUtils.bind(this, function(P, O) {
                f.saveLevel = 4;
                try {
                  null != z && (L.properties = z);
                  var W = E || f.constructor != DriveFile || 'manual' != DrawioFile.SYNC && 'auto' != DrawioFile.SYNC ? null : f.getCurrentEtag(),
                    p = mxUtils.bind(this, function(S) {
                      f.saveLevel = 5;
                      try {
                        var R = f.desc.mimeType != this.xmlMimeType && f.desc.mimeType != this.mimeType && f.desc.mimeType != this.libraryMimeType,
                          V = !0,
                          T = null;
                        try {
                          T = window.setTimeout(mxUtils.bind(this, function() {
                            V = !1;
                            G({
                              code: App.ERROR_TIMEOUT
                            });
                          }), 5 * this.ui.timeout);
                        } catch (U) {}
                        this.executeRequest(this.createUploadRequest(f.getId(), L, P, c || S || R, O, S ? null : W, F), mxUtils.bind(this, function(U) {
                          window.clearTimeout(T);
                          V && M(U);
                        }), mxUtils.bind(this, function(U) {
                          window.clearTimeout(T);
                          if (V) {
                            f.saveLevel = 6;
                            try {
                              f.isConflict(U) ? this.executeRequest({
                                url: '/files/' + f.getId() + '?supportsAllDrives=true&fields=' + this.catchupFields
                              }, mxUtils.bind(this, function(X) {
                                f.saveLevel = 7;
                                try {
                                  if (null != X && X.etag == W)
                                    if (J < this.staleEtagMaxRetries) {
                                      J++;
                                      var Z = 2 * J * this.coolOff * (1 + 0.1 * (Math.random() - 0.5));
                                      window.setTimeout(B, Z);
                                      '1' == urlParams.test && EditorUi.debug('DriveClient: Stale Etag Detected', 'retry', J, 'delay', Z);
                                    } else {
                                      B(!0);
                                      try {
                                        EditorUi.logEvent({
                                          category: 'STALE-ETAG-SAVE-FILE-' + f.getHash(),
                                          action: 'rev_' + f.desc.headRevisionId + '-mod_' + f.desc.modifiedDate + '-size_' + f.getSize() + '-mime_' + f.desc.mimeType + (this.ui.editor.autosave ? '' : '-nosave') + (f.isAutosave() ? '' : '-noauto') + (f.changeListenerEnabled ? '' : '-nolisten') + (f.inConflictState ? '-conflict' : '') + (f.invalidChecksum ? '-invalid' : ''),
                                          label: (null != this.user ? 'user_' + this.user.id : 'nouser') + (null != f.sync ? '-client_' + f.sync.clientId : '-nosync')
                                        });
                                      } catch (Y) {}
                                    }
                                  else
                                    '1' == urlParams.test && X.headRevisionId == u && EditorUi.debug('DriveClient: Remote Etag Changed', 'local', W, 'remote', X.etag, 'rev', f.desc.headRevisionId, 'response', [X], 'file', [f]), G(U, X);
                                } catch (Y) {
                                  d(Y);
                                }
                              }), mxUtils.bind(this, function() {
                                G(U);
                              })) : G(U);
                            } catch (X) {
                              d(X);
                            }
                          }
                        }));
                      } catch (U) {
                        d(U);
                      }
                    }),
                    B = mxUtils.bind(this, function(S) {
                      f.saveLevel = 9;
                      if (S || null == W)
                        p(S);
                      else {
                        var R = !0,
                          V = null;
                        try {
                          V = window.setTimeout(mxUtils.bind(this, function() {
                            R = !1;
                            G({
                              code: App.ERROR_TIMEOUT
                            });
                          }), 3 * this.ui.timeout);
                        } catch (T) {}
                        this.executeRequest({
                          url: '/files/' + f.getId() + '?supportsAllDrives=true&fields=' + this.catchupFields
                        }, mxUtils.bind(this, function(T) {
                          window.clearTimeout(V);
                          if (R) {
                            f.saveLevel = 10;
                            try {
                              null != T && T.headRevisionId == u ? ('1' == urlParams.test && W != T.etag && EditorUi.debug('DriveClient: Preflight Etag Update', 'from', W, 'to', T.etag, 'rev', f.desc.headRevisionId, 'response', [T], 'file', [f]), W = T.etag, p(S)) : G({
                                error: {
                                  code: 412
                                }
                              }, T);
                            } catch (U) {
                              d(U);
                            }
                          }
                        }), mxUtils.bind(this, function(T) {
                          window.clearTimeout(V);
                          R && (f.saveLevel = 11, G(T));
                        }));
                      }
                    });
                  if (x && null == q) {
                    f.saveLevel = 8;
                    var N = new Image();
                    N.onload = mxUtils.bind(this, function() {
                      try {
                        var S = this.thumbnailWidth / N.width,
                          R = document.createElement('canvas');
                        R.width = this.thumbnailWidth;
                        R.height = Math.floor(N.height * S);
                        R.getContext('2d').drawImage(N, 0, 0, R.width, R.height);
                        var V = R.toDataURL();
                        V = V.substring(V.indexOf(',') + 1).replace(/\+/g, '-').replace(/\//g, '_');
                        L.thumbnail = {
                          image: V,
                          mimeType: 'image/png'
                        };
                        B(!1);
                      } catch (T) {
                        try {
                          B(!1);
                        } catch (U) {
                          d(U);
                        }
                      }
                    });
                    N.src = 'data:image/png;base64,' + P;
                  } else
                    B(!1);
                } catch (S) {
                  d(S);
                }
              });
            if (x) {
              var Q = this.ui.getPngFileProperties(this.ui.fileNode);
              this.ui.getEmbeddedPng(mxUtils.bind(this, function(P) {
                I(P, !0);
              }), G, this.ui.getCurrentFile() != f ? K : null, Q.scale, Q.border);
            } else
              I(K, !1);
          } catch (P) {
            d(P);
          }
        });
        try {
          f.saveLevel = 2, (y || x || f.constructor == DriveLibrary || !this.enableThumbnails || '0' == urlParams.thumb || null != L.mimeType && 'application/vnd.jgraph.mxfile' != L.mimeType.substring(0, 29) || !this.ui.getThumbnail(this.thumbnailWidth, mxUtils.bind(this, function(q) {
            try {
              var A = null;
              try {
                null != q && (A = q.toDataURL('image/png')), null != A && (A = A.length > this.maxThumbnailSize ? null : A.substring(A.indexOf(',') + 1).replace(/\+/g, '-').replace(/\//g, '_'));
              } catch (H) {
                A = null;
              }
              l(A, 'image/png');
            } catch (H) {
              d(H);
            }
          }))) && l(null, null, f.constructor != DriveLibrary);
        } catch (q) {
          d(q);
        }
      } else
        this.ui.editor.graph.reset(), G({
          message: mxResources.get('readOnly')
        });
    } catch (q) {
      d(q);
    }
  };
  DriveClient.prototype.insertFile = function(f, c, k, m, t, y, E) {
    y = null != y ? y : this.xmlMimeType;
    f = {
      mimeType: y,
      title: f
    };
    null != k && (f.parents = [{
      kind: 'drive#fileLink',
      id: k
    }]);
    this.executeRequest(this.createUploadRequest(null, f, c, !1, E), mxUtils.bind(this, function(z) {
      y == this.libraryMimeType ? m(new DriveLibrary(this.ui, c, z)) : 0 == z ? null != t && t({
        message: mxResources.get('errorSavingFile')
      }) : m(new DriveFile(this.ui, c, z));
    }), t);
  };
  DriveClient.prototype.createUploadRequest = function(f, c, k, m, t, y, E) {
    t = null != t ? t : !1;
    var z = {
      'Content-Type': 'multipart/mixed; boundary="-------314159265358979323846"'
    };
    null != y && (z['If-Match'] = y);
    f = {
      fullUrl: 'https://content.googleapis.com/upload/drive/v2/files' + (null != f ? '/' + f : '') + '?uploadType=multipart&supportsAllDrives=true&enforceSingleParent=true&fields=' + this.allFields,
      method: null != f ? 'PUT' : 'POST',
      headers: z,
      params: '\r\n---------314159265358979323846\r\nContent-Type: application/json\r\n\r\n' + JSON.stringify(c) + '\r\n---------314159265358979323846\r\nContent-Type: application/octect-stream\r\nContent-Transfer-Encoding: base64\r\n\r\n' + (null != k ? t ? k : !window.btoa || mxClient.IS_IE || mxClient.IS_IE11 ? Base64.encode(k) : Graph.base64EncodeUnicode(k) : '') + '\r\n---------314159265358979323846--'
    };
    m || (f.fullUrl += '&newRevision=false');
    E && (f.fullUrl += '&pinned=true');
    return f;
  };
  DriveClient.prototype.createLinkPicker = function() {
    var f = e.linkPicker;
    if (null == f || e.linkPickerToken != b) {
      e.linkPickerToken = b;
      f = new google.picker.DocsView(google.picker.ViewId.FOLDERS).setParent('root').setIncludeFolders(!0).setSelectFolderEnabled(!0);
      var c = new google.picker.DocsView().setIncludeFolders(!0).setSelectFolderEnabled(!0),
        k = new google.picker.DocsView().setIncludeFolders(!0).setEnableDrives(!0).setSelectFolderEnabled(!0);
      f = new google.picker.PickerBuilder().setAppId(this.appId).setLocale(mxLanguage).setOAuthToken(e.linkPickerToken).enableFeature(google.picker.Feature.SUPPORT_DRIVES).addView(f).addView(c).addView(k).addView(google.picker.ViewId.RECENTLY_PICKED);
    }
    return f;
  };
  DriveClient.prototype.pickFile = function(f, c, k) {
    this.filePickerCallback = null != f ? f : mxUtils.bind(this, function(m) {
      this.ui.loadFile('G' + m);
    });
    this.filePicked = mxUtils.bind(this, function(m) {
      m.action == google.picker.Action.PICKED && this.filePickerCallback(m.docs[0].id, m.docs[0]);
    });
    this.ui.spinner.spin(document.body, mxResources.get('authorizing')) && this.execute(mxUtils.bind(this, function() {
      try {
        this.ui.spinner.stop();
        var m = c ? 'genericPicker' : 'filePicker',
          t = mxUtils.bind(this, function(G) {
            'picker modal-dialog-bg picker-dialog-bg' == mxEvent.getSource(G).className && (mxEvent.removeListener(document, 'click', t), this[m].setVisible(!1), k && k());
          });
        if (null == e[m] || e[m + 'Token'] != b) {
          e[m + 'Token'] = b;
          var y = new google.picker.DocsView(google.picker.ViewId.FOLDERS).setParent('root').setIncludeFolders(!0),
            E = new google.picker.DocsView().setIncludeFolders(!0),
            z = new google.picker.DocsView().setEnableDrives(!0).setIncludeFolders(!0),
            D = new google.picker.DocsUploadView().setIncludeFolders(!0);
          c ? (y.setMimeTypes('*/*'), E.setMimeTypes('*/*'), z.setMimeTypes('*/*')) : (y.setMimeTypes(this.mimeTypes), E.setMimeTypes(this.mimeTypes), z.setMimeTypes(this.mimeTypes));
          e[m] = new google.picker.PickerBuilder().setOAuthToken(e[m + 'Token']).setLocale(mxLanguage).setAppId(this.appId).enableFeature(google.picker.Feature.SUPPORT_DRIVES).addView(y).addView(E).addView(z).addView(google.picker.ViewId.RECENTLY_PICKED).addView(D);
          if (urlParams.gPickerSize) {
            var J = urlParams.gPickerSize.split(',');
            e[m] = e[m].setSize(J[0], J[1]);
          }
          urlParams.topBaseUrl && (e[m] = e[m].setOrigin(decodeURIComponent(urlParams.topBaseUrl)));
          e[m] = e[m].setCallback(mxUtils.bind(this, function(G) {
            if (G.action == google.picker.Action.PICKED || G.action == google.picker.Action.CANCEL)
              mxEvent.removeListener(document, 'click', t), k && G.action == google.picker.Action.CANCEL && k();
            G.action == google.picker.Action.PICKED && this.filePicked(G);
          })).build();
        }
        mxEvent.addListener(document, 'click', t);
        e[m].setVisible(!0);
      } catch (G) {
        this.ui.spinner.stop(), this.ui.handleError(G);
      }
    }));
  };
  DriveClient.prototype.pickFolder = function(f, c) {
    this.folderPickerCallback = f;
    var k = mxUtils.bind(this, function() {
      try {
        this.ui.spinner.spin(document.body, mxResources.get('authorizing')) && this.execute(mxUtils.bind(this, function() {
          try {
            this.ui.spinner.stop();
            var m = mxUtils.bind(this, function(D) {
              'picker modal-dialog-bg picker-dialog-bg' == mxEvent.getSource(D).className && (mxEvent.removeListener(document, 'click', m), e.folderPicker.setVisible(!1));
            });
            if (null == e.folderPicker || e.folderPickerToken != b) {
              e.folderPickerToken = b;
              var t = new google.picker.DocsView(google.picker.ViewId.FOLDERS).setParent('root').setIncludeFolders(!0).setSelectFolderEnabled(!0).setMimeTypes('application/vnd.google-apps.folder'),
                y = new google.picker.DocsView().setIncludeFolders(!0).setSelectFolderEnabled(!0).setMimeTypes('application/vnd.google-apps.folder'),
                E = new google.picker.DocsView().setIncludeFolders(!0).setEnableDrives(!0).setSelectFolderEnabled(!0).setMimeTypes('application/vnd.google-apps.folder');
              e.folderPicker = new google.picker.PickerBuilder().setSelectableMimeTypes('application/vnd.google-apps.folder').setOAuthToken(e.folderPickerToken).setLocale(mxLanguage).setAppId(this.appId).enableFeature(google.picker.Feature.SUPPORT_DRIVES).addView(t).addView(y).addView(E).addView(google.picker.ViewId.RECENTLY_PICKED).setTitle(mxResources.get('pickFolder'));
              if (urlParams.gPickerSize) {
                var z = urlParams.gPickerSize.split(',');
                e.folderPicker = e.folderPicker.setSize(z[0], z[1]);
              }
              urlParams.topBaseUrl && (e.folderPicker = e.folderPicker.setOrigin(decodeURIComponent(urlParams.topBaseUrl)));
              e.folderPicker = e.folderPicker.setCallback(mxUtils.bind(this, function(D) {
                D.action != google.picker.Action.PICKED && D.action != google.picker.Action.CANCEL || mxEvent.removeListener(document, 'click', m);
                this.folderPickerCallback(D);
              })).build();
            }
            mxEvent.addListener(document, 'click', m);
            e.folderPicker.setVisible(!0);
          } catch (D) {
            this.ui.spinner.stop(), this.ui.handleError(D);
          }
        }));
      } catch (m) {
        this.ui.handleError(m);
      }
    });
    c ? k() : this.ui.confirm(mxResources.get('useRootFolder'), mxUtils.bind(this, function() {
      this.folderPickerCallback({
        action: google.picker.Action.PICKED,
        docs: [{
          type: 'folder',
          id: 'root'
        }]
      });
    }), mxUtils.bind(this, function() {
      k();
    }), mxResources.get('yes'), mxResources.get('noPickFolder') + '...', !0);
  };
  DriveClient.prototype.pickLibrary = function(f) {
    this.filePickerCallback = f;
    this.filePicked = mxUtils.bind(this, function(c) {
      c.action == google.picker.Action.PICKED ? this.filePickerCallback(c.docs[0].id) : c.action == google.picker.Action.CANCEL && null == this.ui.getCurrentFile() && this.ui.showSplash();
    });
    this.ui.spinner.spin(document.body, mxResources.get('authorizing')) && this.execute(mxUtils.bind(this, function() {
      try {
        this.ui.spinner.stop();
        var c = mxUtils.bind(this, function(z) {
          'picker modal-dialog-bg picker-dialog-bg' == mxEvent.getSource(z).className && (mxEvent.removeListener(document, 'click', c), e.libraryPicker.setVisible(!1));
        });
        if (null == e.libraryPicker || e.libraryPickerToken != b) {
          e.libraryPickerToken = b;
          var k = new google.picker.DocsView(google.picker.ViewId.FOLDERS).setParent('root').setIncludeFolders(!0).setMimeTypes(this.libraryMimeType + ',application/xml,text/plain,application/octet-stream'),
            m = new google.picker.DocsView().setIncludeFolders(!0).setMimeTypes(this.libraryMimeType + ',application/xml,text/plain,application/octet-stream'),
            t = new google.picker.DocsView().setEnableDrives(!0).setIncludeFolders(!0).setMimeTypes(this.libraryMimeType + ',application/xml,text/plain,application/octet-stream'),
            y = new google.picker.DocsUploadView().setIncludeFolders(!0);
          e.libraryPicker = new google.picker.PickerBuilder().setOAuthToken(e.libraryPickerToken).setLocale(mxLanguage).setAppId(this.appId).enableFeature(google.picker.Feature.SUPPORT_DRIVES).addView(k).addView(m).addView(t).addView(google.picker.ViewId.RECENTLY_PICKED).addView(y);
          if (urlParams.gPickerSize) {
            var E = urlParams.gPickerSize.split(',');
            e.libraryPicker = e.libraryPicker.setSize(E[0], E[1]);
          }
          urlParams.topBaseUrl && (e.libraryPicker = e.libraryPicker.setOrigin(decodeURIComponent(urlParams.topBaseUrl)));
          e.libraryPicker = e.libraryPicker.setCallback(mxUtils.bind(this, function(z) {
            z.action != google.picker.Action.PICKED && z.action != google.picker.Action.CANCEL || mxEvent.removeListener(document, 'click', c);
            z.action == google.picker.Action.PICKED && this.filePicked(z);
          })).build();
        }
        mxEvent.addListener(document, 'click', c);
        e.libraryPicker.setVisible(!0);
      } catch (z) {
        this.ui.spinner.stop(), this.ui.handleError(z);
      }
    }));
  };
  DriveClient.prototype.showPermissions = function(f) {
    var c = mxUtils.bind(this, function() {
      var k = new ConfirmDialog(this.ui, mxResources.get('googleSharingNotAvailable'), mxUtils.bind(this, function() {
        this.ui.editor.graph.openLink('https://drive.google.com/open?id=' + f);
      }), null, mxResources.get('open'), null, null, null, null, IMAGE_PATH + '/google-share.png');
      this.ui.showDialog(k.container, 360, 190, !0, !0);
      k.init();
    });
    this.sharingFailed ? c() : this.checkToken(mxUtils.bind(this, function() {
      try {
        var k = new gapi.drive.share.ShareClient(this.appId);
        k.setOAuthToken(b);
        k.setItemIds([f]);
        k.showSettingsDialog();
        'MutationObserver' in window && (null != this.sharingObserver && (this.sharingObserver.disconnect(), this.sharingObserver = null), this.sharingObserver = new MutationObserver(mxUtils.bind(this, function(m) {
          for (var t = !1, y = 0; y < m.length; y++)
            for (var E = 0; E < m[y].addedNodes.length; E++) {
              var z = m[y].addedNodes[E];
              'BUTTON' == z.nodeName && 'ok' == z.getAttribute('name') && null != z.parentNode && null != z.parentNode.parentNode && 'dialog' == z.parentNode.parentNode.getAttribute('role') ? (this.sharingFailed = !0, z.click(), c(), t = !0) : 'DIV' == z.nodeName && 'shr-q-shr-r-shr-xb' == z.className && (t = !0);
            }
          t && (this.sharingObserver.disconnect(), this.sharingObserver = null);
        })), this.sharingObserver.observe(document, {
          childList: !0,
          subtree: !0
        }));
      } catch (m) {
        this.ui.handleError(m);
      }
    }));
  };
  DriveClient.prototype.clearPersistentToken = function() {
    var f = JSON.parse(this.getPersistentToken(!0)) || {};
    delete f.current;
    delete f[this.userId];
    for (var c in f) {
      f.current = {
        userId: c,
        expires: 0
      };
      break;
    }
    DrawioClient.prototype.setPersistentToken.call(this, JSON.stringify(f));
  };
  DriveClient.prototype.setPersistentToken = function(f, c) {
    var k = JSON.parse(this.getPersistentToken(!0)) || {};
    f.userId = this.userId;
    k.current = f;
    k[this.userId] = {
      user: this.user
    };
    DrawioClient.prototype.setPersistentToken.call(this, JSON.stringify(k), c);
  };
}());