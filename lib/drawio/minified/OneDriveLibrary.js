OneDriveLibrary = function(b, e, f) {
  OneDriveFile.call(this, b, e, f);
};
mxUtils.extend(OneDriveLibrary, OneDriveFile);
OneDriveLibrary.prototype.isAutosave = function() {
  return !0;
};
OneDriveLibrary.prototype.save = function(b, e, f) {
  this.ui.oneDrive.saveFile(this, mxUtils.bind(this, function(c) {
    this.desc = c;
    null != e && e(c);
  }), f);
};
OneDriveLibrary.prototype.open = function() {};
(function() {
  var b = null;
  window.OneDriveClient = function(e, f, c, k) {
    null == f && null != window.urlParams && '1' == window.urlParams.extAuth && (f = !0);
    null == c && (c = null != window.Editor ? Editor.oneDriveInlinePicker : !0);
    null == k && null != window.urlParams && '1' == window.urlParams.noLogoutOD && (k = !0);
    DrawioClient.call(this, e, f ? 'oneDriveExtAuthInfo' : 'oneDriveAuthInfo');
    this.isExtAuth = f;
    this.inlinePicker = c;
    this.noLogout = k;
    e = JSON.parse(this.token);
    null != e && (this.endpointHint = null != e.endpointHint ? e.endpointHint.replace('/Documents', '/_layouts/15/onedrive.aspx') : e.endpointHint);
  };
  mxUtils.extend(OneDriveClient, DrawioClient);
  OneDriveClient.prototype.clientId = window.DRAWIO_MSGRAPH_CLIENT_ID || ('test.draw.io' == window.location.hostname ? '95e4b4ed-ed5c-4a05-935b-b411b4562ef2' : '24b129a6-117b-4394-bdc8-3b9955e5cdef');
  OneDriveClient.prototype.clientId = 'app.diagrams.net' == window.location.hostname ? 'b5ff67d6-3155-4fca-965a-59a3655c4476' : OneDriveClient.prototype.clientId;
  OneDriveClient.prototype.clientId = 'viewer.diagrams.net' == window.location.hostname ? '417a451a-a343-4788-b6c1-901e63182565' : OneDriveClient.prototype.clientId;
  OneDriveClient.prototype.scopes = 'user.read files.readwrite.all sites.read.all';
  OneDriveClient.prototype.redirectUri = window.location.protocol + '//' + window.location.host + '/microsoft';
  OneDriveClient.prototype.pickerRedirectUri = window.location.protocol + '//' + window.location.host + '/onedrive3.html';
  OneDriveClient.prototype.defEndpointHint = 'api.onedrive.com';
  OneDriveClient.prototype.endpointHint = OneDriveClient.prototype.defEndpointHint;
  OneDriveClient.prototype.extension = '.drawio';
  OneDriveClient.prototype.baseUrl = 'https://graph.microsoft.com/v1.0';
  OneDriveClient.prototype.authUrl = 'https://login.microsoftonline.com/' + (window.DRAWIO_MSGRAPH_TENANT_ID || 'common');
  OneDriveClient.prototype.emptyFn = function() {};
  OneDriveClient.prototype.invalidFilenameRegExs = [
    /[~"#%\*:<>\?\/\\{\|}]/,
    /^\.lock$/i,
    /^CON$/i,
    /^PRN$/i,
    /^AUX$/i,
    /^NUL$/i,
    /^COM\d$/i,
    /^LPT\d$/i,
    /^desktop\.ini$/i,
    /_vti_/i
  ];
  OneDriveClient.prototype.isValidFilename = function(e) {
    if (null == e || '' === e)
      return !1;
    for (var f = 0; f < this.invalidFilenameRegExs.length; f++)
      if (this.invalidFilenameRegExs[f].test(e))
        return !1;
    return !0;
  };
  OneDriveClient.prototype.get = function(e, f, c) {
    e = new mxXmlRequest(e, null, 'GET');
    e.setRequestHeaders = mxUtils.bind(this, function(k, m) {
      k.setRequestHeader('Authorization', 'Bearer ' + b);
    });
    e.send(f, c);
    return e;
  };
  OneDriveClient.prototype.updateUser = function(e, f, c) {
    var k = !0,
      m = window.setTimeout(mxUtils.bind(this, function() {
        k = !1;
        f({
          code: App.ERROR_TIMEOUT
        });
      }), this.ui.timeout);
    this.get(this.baseUrl + '/me', mxUtils.bind(this, function(t) {
      window.clearTimeout(m);
      k && (200 > t.getStatus() || 300 <= t.getStatus() ? c ? f({
        message: mxResources.get('accessDenied')
      }) : (this.logout(), this.authenticate(mxUtils.bind(this, function() {
        this.updateUser(e, f, !0);
      }), f)) : (t = JSON.parse(t.getText()), this.setUser(new DrawioUser(t.id, t.mail, t.displayName)), e()));
    }), mxUtils.bind(this, function(t) {
      window.clearTimeout(m);
      k && f(t);
    }));
  };
  OneDriveClient.prototype.resetTokenRefresh = function(e) {
    null != this.tokenRefreshThread && (window.clearTimeout(this.tokenRefreshThread), this.tokenRefreshThread = null);
    0 < e && (this.tokenRefreshInterval = 1000 * e, this.tokenRefreshThread = window.setTimeout(mxUtils.bind(this, function() {
      this.authenticate(this.emptyFn, this.emptyFn, !0);
    }), 900 * e));
  };
  OneDriveClient.prototype.authenticate = function(e, f, c) {
    if (this.isExtAuth)
      window.parent.oneDriveAuth(mxUtils.bind(this, function(k) {
        this.updateAuthInfo(k, !0, null == this.endpointHint, e, f);
      }), f, null != window.urlParams && '1' == urlParams.odAuthCancellable);
    else
      new mxXmlRequest(this.redirectUri + '?getState=1', null, 'GET').send(mxUtils.bind(this, function(k) {
        200 <= k.getStatus() && 299 >= k.getStatus() ? this.authenticateStep2(k.getText(), e, f, c) : null != f && f(k);
      }), f);
  };
  OneDriveClient.prototype.updateAuthInfo = function(e, f, c, k, m) {
    c && this.setUser(null);
    b = e.access_token;
    delete e.access_token;
    e.expiresOn = Date.now() + 1000 * e.expires_in;
    this.tokenExpiresOn = e.expiresOn;
    e.remember = f;
    this.setPersistentToken(JSON.stringify(e), !f);
    this.resetTokenRefresh(e.expires_in);
    c ? this.getAccountTypeAndEndpoint(mxUtils.bind(this, function() {
      k();
    }), m) : k();
  };
  OneDriveClient.prototype.authenticateStep2 = function(e, f, c, k) {
    if (null == window.onOneDriveCallback) {
      var m = mxUtils.bind(this, function() {
        var t = !0,
          y = JSON.parse(this.getPersistentToken(!0));
        null != y ? new mxXmlRequest(this.redirectUri + '?state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + e), null, 'GET').send(mxUtils.bind(this, function(E) {
          200 <= E.getStatus() && 299 >= E.getStatus() ? this.updateAuthInfo(JSON.parse(E.getText()), y.remember, !1, f, c) : (this.clearPersistentToken(), this.setUser(null), b = null, 401 != E.getStatus() && 400 != E.getStatus() || k ? c({
            message: mxResources.get('accessDenied'),
            retry: m
          }) : m());
        }), c) : this.ui.showAuthDialog(this, !0, mxUtils.bind(this, function(E, z) {
          var D = this.authUrl + '/oauth2/v2.0/authorize?client_id=' + this.clientId + '&response_type=code&redirect_uri=' + encodeURIComponent(this.redirectUri) + '&scope=' + encodeURIComponent(this.scopes + (E ? ' offline_access' : '')) + '&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + e);
          D = window.open(D, 'odauth', [
            'width=525,height=525',
            'top=' + (window.screenY + Math.max(window.outerHeight - 525, 0) / 2),
            'left=' + (window.screenX + Math.max(window.outerWidth - 525, 0) / 2),
            'status=no,resizable=yes,toolbar=no,menubar=no,scrollbars=yes'
          ].join());
          null != D && (window.onOneDriveCallback = mxUtils.bind(this, function(J, G) {
            if (t) {
              window.onOneDriveCallback = null;
              t = !1;
              try {
                null == J ? c({
                  message: mxResources.get('accessDenied'),
                  retry: m
                }) : (null != z && z(), this.updateAuthInfo(J, E, !0, f, c));
              } catch (d) {
                c(d);
              } finally {
                null != G && G.close();
              }
            } else
              null != G && G.close();
          }), D.focus());
        }), mxUtils.bind(this, function() {
          t && (window.onOneDriveCallback = null, t = !1, c({
            message: mxResources.get('accessDenied'),
            retry: m
          }));
        }));
      });
      m();
    } else
      c({
        code: App.ERROR_BUSY
      });
  };
  OneDriveClient.prototype.getAccountTypeAndEndpoint = function(e, f) {
    this.get(this.baseUrl + '/me/drive/root', mxUtils.bind(this, function(c) {
      try {
        if (200 <= c.getStatus() && 299 >= c.getStatus()) {
          var k = JSON.parse(c.getText());
          0 < k.webUrl.indexOf('.sharepoint.com') ? this.endpointHint = k.webUrl.replace('/Documents', '/_layouts/15/onedrive.aspx') : this.endpointHint = this.defEndpointHint;
          var m = JSON.parse(this.getPersistentToken(!0));
          null != m && (m.endpointHint = this.endpointHint, this.setPersistentToken(JSON.stringify(m), !m.remember));
          e();
          return;
        }
      } catch (t) {}
      f({
        message: mxResources.get('unknownError') + ' (Code: ' + c.getStatus() + ')'
      });
    }), f);
  };
  OneDriveClient.prototype.executeRequest = function(e, f, c) {
    var k = mxUtils.bind(this, function(m) {
      var t = !0,
        y = window.setTimeout(mxUtils.bind(this, function() {
          t = !1;
          c({
            code: App.ERROR_TIMEOUT,
            retry: k
          });
        }), this.ui.timeout);
      this.get(e, mxUtils.bind(this, function(E) {
        window.clearTimeout(y);
        t && (200 <= E.getStatus() && 299 >= E.getStatus() || 404 == E.getStatus() ? (null == this.user && this.updateUser(this.emptyFn, this.emptyFn, !0), f(E)) : m || 401 !== E.getStatus() && 400 !== E.getStatus() ? c(this.parseRequestText(E)) : this.authenticate(function() {
          k(!0);
        }, c, m));
      }), mxUtils.bind(this, function(E) {
        window.clearTimeout(y);
        t && c(E);
      }));
    });
    null == b || 60000 > this.tokenExpiresOn - Date.now() ? this.authenticate(function() {
      k(!0);
    }, c) : k(!1);
  };
  OneDriveClient.prototype.checkToken = function(e, f) {
    null == b || null == this.tokenRefreshThread || 60000 > this.tokenExpiresOn - Date.now() ? this.authenticate(e, null != f ? f : this.emptyFn) : e();
  };
  OneDriveClient.prototype.getItemRef = function(e) {
    var f = e.split('/');
    return 1 < f.length ? {
      driveId: f[0],
      id: f[1]
    } : {
      id: e
    };
  };
  OneDriveClient.prototype.getItemURL = function(e, f) {
    var c = e.split('/');
    return 1 < c.length ? (e = c[1], (f ? '' : this.baseUrl) + '/drives/' + c[0] + ('root' == e ? '/root' : '/items/' + e)) : (f ? '' : this.baseUrl) + '/me/drive/items/' + e;
  };
  OneDriveClient.prototype.getLibrary = function(e, f, c) {
    this.getFile(e, f, c, !1, !0);
  };
  OneDriveClient.prototype.removeExtraHtmlContent = function(e) {
    var f = e.lastIndexOf('<html><head><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8"><meta name="Robots" ');
    0 < f && (e = e.substring(0, f));
    return e;
  };
  OneDriveClient.prototype.getFile = function(e, f, c, k, m) {
    m = null != m ? m : !1;
    this.executeRequest(this.getItemURL(e), mxUtils.bind(this, function(t) {
      if (200 <= t.getStatus() && 299 >= t.getStatus()) {
        var y = JSON.parse(t.getText()),
          E = /\.png$/i.test(y.name);
        if (/\.v(dx|sdx?)$/i.test(y.name) || /\.gliffy$/i.test(y.name) || /\.pdf$/i.test(y.name) || !this.ui.useCanvasForExport && E)
          this.ui.convertFile(y['@microsoft.graph.downloadUrl'], y.name, null != y.file ? y.file.mimeType : null, this.extension, f, c);
        else {
          var z = !0,
            D = window.setTimeout(mxUtils.bind(this, function() {
              z = !1;
              c({
                code: App.ERROR_TIMEOUT
              });
            }), this.ui.timeout);
          this.ui.editor.loadUrl(y['@microsoft.graph.downloadUrl'], mxUtils.bind(this, function(J) {
            try {
              if (window.clearTimeout(D), z) {
                /\.html$/i.test(y.name) && (J = this.removeExtraHtmlContent(J));
                var G = null;
                if (0 < (E ? J.lastIndexOf(',') : -1)) {
                  var d = this.ui.extractGraphModelFromPng(J);
                  null != d && 0 < d.length ? J = d : G = new LocalFile(this.ui, J, y.name, !0);
                } else if ('data:image/png;base64,PG14ZmlsZS' == J.substring(0, 32)) {
                  var g = J.substring(22);
                  J = window.atob && !mxClient.IS_SF ? atob(g) : Base64.decode(g);
                }
                Graph.fileSupport && new XMLHttpRequest().upload && this.ui.isRemoteFileFormat(J, y['@microsoft.graph.downloadUrl']) ? this.ui.parseFileData(J, mxUtils.bind(this, function(n) {
                  try {
                    4 == n.readyState && (200 <= n.status && 299 >= n.status ? f(new LocalFile(this.ui, n.responseText, y.name + this.extension, !0)) : null != c && c({
                      message: mxResources.get('errorLoadingFile')
                    }));
                  } catch (v) {
                    if (null != c)
                      c(v);
                    else
                      throw v;
                  }
                }), y.name) : null != G ? f(G) : m ? f(new OneDriveLibrary(this.ui, J, y)) : f(new OneDriveFile(this.ui, J, y));
              }
            } catch (n) {
              if (null != c)
                c(n);
              else
                throw n;
            }
          }), mxUtils.bind(this, function(J) {
            window.clearTimeout(D);
            z && c(this.parseRequestText(J));
          }), E || null != y.file && null != y.file.mimeType && ('image/' == y.file.mimeType.substring(0, 6) && 'image/svg' != y.file.mimeType.substring(0, 9) || 'application/pdf' == y.file.mimeType));
        }
      } else
        this.isExtAuth ? c({
          message: mxResources.get('fileNotFoundOrDenied'),
          ownerEmail: null != window.urlParams ? urlParams.ownerEml : null
        }) : c(this.parseRequestText(t));
    }), c);
  };
  OneDriveClient.prototype.renameFile = function(e, f, c, k) {
    null != e && null != f && (this.isValidFilename(f) ? this.checkExists(e.getParentId(), f, !1, mxUtils.bind(this, function(m) {
      m ? this.writeFile(this.getItemURL(e.getId()), JSON.stringify({
        name: f
      }), 'PATCH', 'application/json', c, k) : k();
    })) : k({
      message: this.invalidFilenameRegExs[0].test(f) ? mxResources.get('oneDriveCharsNotAllowed') : mxResources.get('oneDriveInvalidDeviceName')
    }));
  };
  OneDriveClient.prototype.moveFile = function(e, f, c, k) {
    f = this.getItemRef(f);
    var m = this.getItemRef(e);
    f.driveId != m.driveId ? k({
      message: mxResources.get('cannotMoveOneDrive', null, 'Moving a file between accounts is not supported yet.')
    }) : this.writeFile(this.getItemURL(e), JSON.stringify({
      parentReference: f
    }), 'PATCH', 'application/json', c, k);
  };
  OneDriveClient.prototype.insertLibrary = function(e, f, c, k, m) {
    this.insertFile(e, f, c, k, !0, m);
  };
  OneDriveClient.prototype.insertFile = function(e, f, c, k, m, t) {
    this.isValidFilename(e) ? (m = null != m ? m : !1, this.checkExists(t, e, !0, mxUtils.bind(this, function(y) {
      if (y) {
        y = '/me/drive/root';
        null != t && (y = this.getItemURL(t, !0));
        var E = mxUtils.bind(this, function(z) {
          m ? c(new OneDriveLibrary(this.ui, f, z)) : c(new OneDriveFile(this.ui, f, z));
        });
        y = this.baseUrl + y + '/children/' + encodeURIComponent(e) + '/content';
        4000000 <= f.length ? this.writeFile(y, '', 'PUT', null, mxUtils.bind(this, function(z) {
          this.writeLargeFile(this.getItemURL(z.id), f, E, k);
        }), k) : this.writeFile(y, f, 'PUT', null, E, k);
      } else
        k();
    }))) : k({
      message: this.invalidFilenameRegExs[0].test(e) ? mxResources.get('oneDriveCharsNotAllowed') : mxResources.get('oneDriveInvalidDeviceName')
    });
  };
  OneDriveClient.prototype.checkExists = function(e, f, c, k) {
    var m = '/me/drive/root';
    null != e && (m = this.getItemURL(e, !0));
    this.executeRequest(this.baseUrl + m + '/children/' + encodeURIComponent(f), mxUtils.bind(this, function(t) {
      404 == t.getStatus() ? k(!0) : c ? (this.ui.spinner.stop(), this.ui.confirm(mxResources.get('replaceIt', [f]), function() {
        k(!0);
      }, function() {
        k(!1);
      })) : (this.ui.spinner.stop(), this.ui.showError(mxResources.get('error'), mxResources.get('fileExists'), mxResources.get('ok'), function() {
        k(!1);
      }));
    }), function(t) {
      k(!1);
    }, !0);
  };
  OneDriveClient.prototype.saveFile = function(e, f, c, k) {
    try {
      var m = e.getData(),
        t = mxUtils.bind(this, function(E) {
          var z = mxUtils.bind(this, function(J) {
              f(J, m);
            }),
            D = this.getItemURL(e.getId());
          4000000 <= E.length ? this.writeLargeFile(D, E, z, c, k) : this.writeFile(D + '/content/', E, 'PUT', null, z, c, k);
        });
      if (this.ui.useCanvasForExport && /(\.png)$/i.test(e.meta.name)) {
        var y = this.ui.getPngFileProperties(this.ui.fileNode);
        this.ui.getEmbeddedPng(mxUtils.bind(this, function(E) {
          t(this.ui.base64ToBlob(E, 'image/png'));
        }), c, this.ui.getCurrentFile() != e ? m : null, y.scale, y.border);
      } else
        t(m);
    } catch (E) {
      c(E);
    }
  };
  OneDriveClient.prototype.writeLargeFile = function(e, f, c, k, m) {
    try {
      if (null != f) {
        var t = mxUtils.bind(this, function(E, z, D) {
            try {
              D = D || 0;
              var J = !0,
                G = null;
              G = window.setTimeout(mxUtils.bind(this, function() {
                J = !1;
                k({
                  code: App.ERROR_TIMEOUT
                });
              }), this.ui.timeout);
              var d = f.substr(z, 4194304),
                g = new mxXmlRequest(E, d, 'PUT');
              g.setRequestHeaders = mxUtils.bind(this, function(n, v) {
                n.setRequestHeader('Content-Length', d.length);
                n.setRequestHeader('Content-Range', 'bytes ' + z + '-' + (z + d.length - 1) + '/' + f.length);
              });
              g.send(mxUtils.bind(this, function(n) {
                window.clearTimeout(G);
                if (J) {
                  var v = n.getStatus();
                  200 <= v && 299 >= v ? (v = z + d.length, v == f.length ? c(JSON.parse(n.getText())) : t(E, v, D)) : 500 <= v && 599 >= v && 2 > D ? (D++, t(E, z, D)) : k(this.parseRequestText(n), n);
                }
              }), mxUtils.bind(this, function(n) {
                window.clearTimeout(G);
                J && k(this.parseRequestText(n));
              }));
            } catch (n) {
              k(n);
            }
          }),
          y = mxUtils.bind(this, function(E) {
            try {
              var z = !0,
                D = null;
              try {
                D = window.setTimeout(mxUtils.bind(this, function() {
                  z = !1;
                  k({
                    code: App.ERROR_TIMEOUT
                  });
                }), this.ui.timeout);
              } catch (G) {}
              var J = new mxXmlRequest(e + '/createUploadSession', '{}', 'POST');
              J.setRequestHeaders = mxUtils.bind(this, function(G, d) {
                G.setRequestHeader('Content-Type', 'application/json');
                G.setRequestHeader('Authorization', 'Bearer ' + b);
                null != m && G.setRequestHeader('If-Match', m);
              });
              J.send(mxUtils.bind(this, function(G) {
                window.clearTimeout(D);
                z && (200 <= G.getStatus() && 299 >= G.getStatus() ? (G = JSON.parse(G.getText()), t(G.uploadUrl, 0)) : E || 401 !== G.getStatus() ? k(this.parseRequestText(G), G) : this.authenticate(function() {
                  y(!0);
                }, k, E));
              }), mxUtils.bind(this, function(G) {
                window.clearTimeout(D);
                z && k(this.parseRequestText(G));
              }));
            } catch (G) {
              k(G);
            }
          });
        null == b || 60000 > this.tokenExpiresOn - Date.now() ? this.authenticate(function() {
          y(!0);
        }, k) : y(!1);
      } else
        k({
          message: mxResources.get('unknownError')
        });
    } catch (E) {
      k(E);
    }
  };
  OneDriveClient.prototype.writeFile = function(e, f, c, k, m, t, y) {
    try {
      if (null != e && null != f) {
        var E = mxUtils.bind(this, function(z) {
          try {
            var D = !0,
              J = null;
            try {
              J = window.setTimeout(mxUtils.bind(this, function() {
                D = !1;
                t({
                  code: App.ERROR_TIMEOUT
                });
              }), this.ui.timeout);
            } catch (d) {}
            var G = new mxXmlRequest(e, f, c);
            G.setRequestHeaders = mxUtils.bind(this, function(d, g) {
              d.setRequestHeader('Content-Type', k || ' ');
              d.setRequestHeader('Authorization', 'Bearer ' + b);
              null != y && d.setRequestHeader('If-Match', y);
            });
            G.send(mxUtils.bind(this, function(d) {
              window.clearTimeout(J);
              D && (200 <= d.getStatus() && 299 >= d.getStatus() ? (null == this.user && this.updateUser(this.emptyFn, this.emptyFn, !0), m(JSON.parse(d.getText()))) : z || 401 !== d.getStatus() ? t(this.parseRequestText(d), d) : this.authenticate(function() {
                E(!0);
              }, t, z));
            }), mxUtils.bind(this, function(d) {
              window.clearTimeout(J);
              D && t(this.parseRequestText(d));
            }));
          } catch (d) {
            t(d);
          }
        });
        null == b || 60000 > this.tokenExpiresOn - Date.now() ? this.authenticate(function() {
          E(!0);
        }, t) : E(!1);
      } else
        t({
          message: mxResources.get('unknownError')
        });
    } catch (z) {
      t(z);
    }
  };
  OneDriveClient.prototype.parseRequestText = function(e) {
    var f = {
      message: mxResources.get('unknownError')
    };
    try {
      f = JSON.parse(e.getText()), f.status = e.getStatus(), f.error && (f.error.status = f.status, f.error.code = f.status);
    } catch (c) {}
    return f;
  };
  OneDriveClient.prototype.pickLibrary = function(e) {
    this.pickFile(function(f) {
      e(f);
    });
  };
  OneDriveClient.prototype.createInlinePicker = function(e, f, c) {
    return mxUtils.bind(this, function() {
      var k = null,
        m = document.createElement('div');
      m.style.position = 'relative';
      var t = new CustomDialog(this.ui, m, mxUtils.bind(this, function() {
        var y = k.getSelectedItem();
        if (null != y)
          if (f && 'object' == typeof y.folder)
            e({
              value: [y]
            });
          else {
            if (!y.folder) {
              var E = OneDriveFile.prototype.getIdOf(y);
              this.executeRequest(this.getItemURL(E), mxUtils.bind(this, function(z) {
                200 <= z.getStatus() && 299 >= z.getStatus() && (z = JSON.parse(z.getText()), e(E, {
                  value: [z]
                }));
              }), null);
            }
          }
        else
          return mxResources.get('invalidSel', null, 'Invalid selection');
      }), null, mxResources.get(f ? 'save' : 'open'), null, null, null, null, !0);
      this.ui.showDialog(t.container, 550, 500, !0, !0);
      m.style.width = t.container.parentNode.style.width;
      m.style.height = parseInt(t.container.parentNode.style.height) - 60 + 'px';
      k = new mxODPicker(m, null, mxUtils.bind(this, function(y, E, z, D) {
        this.executeRequest(D ? y : this.baseUrl + y, function(J) {
          E(JSON.parse(J.getText()));
        }, z);
      }), mxUtils.bind(this, function(y, E, z, D) {
        this.executeRequest(this.baseUrl + '/drives/' + E + '/items/' + y, function(J) {
          z(JSON.parse(J.getText()));
        }, D);
      }), null, null, function(y) {
        f ? e({
          value: [y]
        }) : e(OneDriveFile.prototype.getIdOf(y));
      }, mxUtils.bind(this, function(y) {
        this.ui.showError(mxResources.get('error'), y);
      }), f, null, null, null, null, c);
    });
  };
  OneDriveClient.prototype.pickFolder = function(e, f) {
    var c = mxUtils.bind(this, function(m) {
        this.ui.showError(mxResources.get('error'), m && m.message ? m.message : m);
      }),
      k = mxUtils.bind(this, function(m) {
        var t = this.inlinePicker ? this.createInlinePicker(e, !0) : mxUtils.bind(this, function() {
          OneDrive.save({
            clientId: this.clientId,
            action: 'query',
            openInNewWindow: !0,
            advanced: {
              endpointHint: mxClient.IS_IE11 ? null : this.endpointHint,
              redirectUri: this.pickerRedirectUri,
              queryParameters: 'select=id,name,parentReference',
              accessToken: b,
              isConsumerAccount: !1
            },
            success: mxUtils.bind(this, function(y) {
              e(y);
              mxClient.IS_IE11 && (b = y.accessToken);
            }),
            cancel: mxUtils.bind(this, function() {}),
            error: c
          });
        });
        m ? t() : this.ui.confirm(mxResources.get('useRootFolder'), mxUtils.bind(this, function() {
          e({
            value: [{
              id: 'root',
              name: 'root',
              parentReference: {
                driveId: 'me'
              }
            }]
          });
        }), t, mxResources.get('yes'), mxResources.get('noPickFolder') + '...', !0);
        null == this.user && this.updateUser(this.emptyFn, this.emptyFn, !0);
      });
    null == b || 60000 > this.tokenExpiresOn - Date.now() ? this.authenticate(mxUtils.bind(this, function() {
      k(!1);
    }), c) : k(f);
  };
  OneDriveClient.prototype.pickFile = function(e, f) {
    e = null != e ? e : mxUtils.bind(this, function(m) {
      this.ui.loadFile('W' + encodeURIComponent(m));
    });
    var c = mxUtils.bind(this, function(m) {
        this.ui.showError(mxResources.get('error'), m && m.message ? m.message : m);
      }),
      k = this.inlinePicker ? this.createInlinePicker(e, null, f) : mxUtils.bind(this, function() {
        OneDrive.open({
          clientId: this.clientId,
          action: 'query',
          multiSelect: !1,
          advanced: {
            endpointHint: mxClient.IS_IE11 ? null : this.endpointHint,
            redirectUri: this.pickerRedirectUri,
            queryParameters: 'select=id,name,parentReference,webUrl',
            accessToken: b,
            isConsumerAccount: !1
          },
          success: mxUtils.bind(this, function(m) {
            null != m && null != m.value && 0 < m.value.length && (mxClient.IS_IE11 && (b = m.accessToken), e(OneDriveFile.prototype.getIdOf(m.value[0]), m));
          }),
          cancel: mxUtils.bind(this, function() {}),
          error: c
        });
        null == this.user && this.updateUser(this.emptyFn, this.emptyFn, !0);
      });
    null == b || 60000 > this.tokenExpiresOn - Date.now() ? this.authenticate(mxUtils.bind(this, function() {
      this.inlinePicker ? k() : this.ui.showDialog(new BtnDialog(this.ui, this, mxResources.get('open'), mxUtils.bind(this, function() {
        this.ui.hideDialog();
        k();
      })).container, 300, 140, !0, !0);
    }), c) : k();
  };
  OneDriveClient.prototype.logout = function() {
    if (isLocalStorage) {
      var e = localStorage.getItem('odpickerv7cache');
      null != e && '{"odsdkLoginHint":{' == e.substring(0, 19) && localStorage.removeItem('odpickerv7cache');
    }
    window.open(this.authUrl + '/oauth2/v2.0/logout', 'logout', 'width=525,height=525,status=no,resizable=yes,toolbar=no,menubar=no,scrollbars=yes');
    this.ui.editor.loadUrl(this.redirectUri + '?doLogout=1&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname));
    this.clearPersistentToken();
    this.setUser(null);
    b = null;
  };
}());