DropboxLibrary = function(b, e, f) {
  DropboxFile.call(this, b, e, f);
};
mxUtils.extend(DropboxLibrary, DropboxFile);
DropboxLibrary.prototype.isAutosave = function() {
  return !0;
};
DropboxLibrary.prototype.doSave = function(b, e, f) {
  this.saveFile(b, !1, e, f);
};
DropboxLibrary.prototype.open = function() {};
(function() {
  var b = null;
  window.DropboxClient = function(e) {
    DrawioClient.call(this, e, 'dbauth');
    this.client = new Dropbox({
      clientId: this.clientId
    });
  };
  mxUtils.extend(DropboxClient, DrawioClient);
  DropboxClient.prototype.appPath = '/drawio-diagrams/';
  DropboxClient.prototype.extension = '.drawio';
  DropboxClient.prototype.writingFile = !1;
  DropboxClient.prototype.maxRetries = 4;
  DropboxClient.prototype.clientId = window.DRAWIO_DROPBOX_ID;
  DropboxClient.prototype.redirectUri = window.location.protocol + '//' + window.location.host + '/dropbox';
  DropboxClient.prototype.logout = function() {
    this.ui.editor.loadUrl(this.redirectUri + '?doLogout=1&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname));
    this.clearPersistentToken();
    this.setUser(null);
    b = null;
    this.client.authTokenRevoke().then(mxUtils.bind(this, function() {
      this.client.setAccessToken(null);
    }));
  };
  DropboxClient.prototype.updateUser = function(e, f, c) {
    var k = !0,
      m = window.setTimeout(mxUtils.bind(this, function() {
        k = !1;
        f({
          code: App.ERROR_TIMEOUT
        });
      }), this.ui.timeout),
      t = this.client.usersGetCurrentAccount();
    t.then(mxUtils.bind(this, function(y) {
      window.clearTimeout(m);
      k && (this.setUser(new DrawioUser(y.account_id, y.email, y.name.display_name)), e());
    }));
    t['catch'](mxUtils.bind(this, function(y) {
      window.clearTimeout(m);
      k && (null == y || 401 !== y.status || c ? f({
        message: mxResources.get('accessDenied')
      }) : (this.setUser(null), this.client.setAccessToken(null), b = null, this.authenticate(mxUtils.bind(this, function() {
        this.updateUser(e, f, !0);
      }), f)));
    }));
  };
  DropboxClient.prototype.authenticate = function(e, f) {
    new mxXmlRequest(this.redirectUri + '?getState=1', null, 'GET').send(mxUtils.bind(this, function(c) {
      200 <= c.getStatus() && 299 >= c.getStatus() ? this.authenticateStep2(c.getText(), e, f) : null != f && f(c);
    }), f);
  };
  DropboxClient.prototype.authenticateStep2 = function(e, f, c) {
    if (null == window.onDropboxCallback) {
      var k = mxUtils.bind(this, function() {
        var m = !0;
        null != this.getPersistentToken(!0) ? new mxXmlRequest(this.redirectUri + '?state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + e), null, 'GET').send(mxUtils.bind(this, function(t) {
          200 <= t.getStatus() && 299 >= t.getStatus() ? (b = JSON.parse(t.getText()).access_token, this.client.setAccessToken(b), this.setUser(null), f()) : (this.clearPersistentToken(), this.setUser(null), b = null, this.client.setAccessToken(null), 401 == t.getStatus() ? k() : c({
            message: mxResources.get('accessDenied'),
            retry: k
          }));
        }), c) : this.ui.showAuthDialog(this, !0, mxUtils.bind(this, function(t, y) {
          null != window.open('https://www.dropbox.com/oauth2/authorize?client_id=' + this.clientId + (t ? '&token_access_type=offline' : '') + '&redirect_uri=' + encodeURIComponent(this.redirectUri) + '&response_type=code&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + e), 'dbauth') ? window.onDropboxCallback = mxUtils.bind(this, function(E, z) {
            if (m) {
              window.onDropboxCallback = null;
              m = !1;
              try {
                null == E ? c({
                  message: mxResources.get('accessDenied'),
                  retry: k
                }) : (null != y && y(), b = E.access_token, this.client.setAccessToken(b), this.setUser(null), t && this.setPersistentToken('remembered'), f());
              } catch (D) {
                c(D);
              } finally {
                null != z && z.close();
              }
            } else
              null != z && z.close();
          }) : c({
            message: mxResources.get('serviceUnavailableOrBlocked'),
            retry: k
          });
        }), mxUtils.bind(this, function() {
          m && (window.onDropboxCallback = null, m = !1, c({
            message: mxResources.get('accessDenied'),
            retry: k
          }));
        }));
      });
      k();
    } else
      c({
        code: App.ERROR_BUSY
      });
  };
  DropboxClient.prototype.executePromise = function(e, f, c) {
    var k = mxUtils.bind(this, function(t) {
        var y = !0,
          E = window.setTimeout(mxUtils.bind(this, function() {
            y = !1;
            c({
              code: App.ERROR_TIMEOUT,
              retry: m
            });
          }), this.ui.timeout),
          z = e();
        z.then(mxUtils.bind(this, function(D) {
          window.clearTimeout(E);
          y && null != f && f(D);
        }));
        z['catch'](mxUtils.bind(this, function(D) {
          window.clearTimeout(E);
          y && (null == D || 500 != D.status && 400 != D.status && 401 != D.status ? c({
            message: mxResources.get('error') + ' ' + D.status
          }) : (this.setUser(null), this.client.setAccessToken(null), b = null, t ? c({
            message: mxResources.get('accessDenied'),
            retry: mxUtils.bind(this, function() {
              this.authenticate(function() {
                m(!0);
              }, c);
            })
          }) : this.authenticate(function() {
            k(!0);
          }, c)));
        }));
      }),
      m = mxUtils.bind(this, function(t) {
        null == this.user ? this.updateUser(function() {
          m(!0);
        }, c, t) : k(t);
      });
    null == b ? this.authenticate(function() {
      m(!0);
    }, c) : m(!1);
  };
  DropboxClient.prototype.getLibrary = function(e, f, c) {
    this.getFile(e, f, c, !0);
  };
  DropboxClient.prototype.getFile = function(e, f, c, k) {
    k = null != k ? k : !1;
    var m = /\.png$/i.test(e);
    if (/^https:\/\//i.test(e) || /\.v(dx|sdx?)$/i.test(e) || /\.gliffy$/i.test(e) || /\.pdf$/i.test(e) || !this.ui.useCanvasForExport && m) {
      var t = mxUtils.bind(this, function() {
        var y = e.split('/');
        this.ui.convertFile(e, 0 < y.length ? y[y.length - 1] : e, null, this.extension, f, c);
      });
      null != b ? t() : this.authenticate(t, c);
    } else
      t = {
        path: '/' + e
      }, null != urlParams.rev && (t.rev = urlParams.rev), this.readFile(t, mxUtils.bind(this, function(y, E) {
        var z = null;
        if (0 < (m ? y.lastIndexOf(',') : -1)) {
          var D = this.ui.extractGraphModelFromPng(y);
          null != D && 0 < D.length ? y = D : z = new LocalFile(this, y, e, !0);
        }
        f(null != z ? z : k ? new DropboxLibrary(this.ui, y, E) : new DropboxFile(this.ui, y, E));
      }), c, m);
  };
  DropboxClient.prototype.readFile = function(e, f, c, k) {
    var m = mxUtils.bind(this, function(y) {
        var E = !0,
          z = window.setTimeout(mxUtils.bind(this, function() {
            E = !1;
            c({
              code: App.ERROR_TIMEOUT
            });
          }), this.ui.timeout),
          D = this.client.filesGetMetadata({
            path: '/' + e.path.substring(1),
            include_deleted: !1
          });
        D.then(mxUtils.bind(this, function(J) {}));
        D['catch'](function(J) {
          window.clearTimeout(z);
          E && null != J && 409 == J.status && (E = !1, c({
            message: mxResources.get('fileNotFound')
          }));
        });
        D = this.client.filesDownload(e);
        D.then(mxUtils.bind(this, function(J) {
          window.clearTimeout(z);
          if (E) {
            E = !1;
            try {
              var G = new FileReader();
              G.onload = mxUtils.bind(this, function(d) {
                f(G.result, J);
              });
              k ? G.readAsDataURL(J.fileBlob) : G.readAsText(J.fileBlob);
            } catch (d) {
              c(d);
            }
          }
        }));
        D['catch'](mxUtils.bind(this, function(J) {
          window.clearTimeout(z);
          E && (E = !1, null == J || 500 != J.status && 400 != J.status && 401 != J.status ? c({
            message: mxResources.get('error') + ' ' + J.status
          }) : (this.client.setAccessToken(null), this.setUser(null), b = null, y ? c({
            message: mxResources.get('accessDenied'),
            retry: mxUtils.bind(this, function() {
              this.authenticate(function() {
                t(!0);
              }, c);
            })
          }) : this.authenticate(function() {
            m(!0);
          }, c)));
        }));
      }),
      t = mxUtils.bind(this, function(y) {
        null == this.user ? this.updateUser(function() {
          t(!0);
        }, c, y) : m(y);
      });
    null == b ? this.authenticate(function() {
      t(!0);
    }, c) : t(!1);
  };
  DropboxClient.prototype.checkExists = function(e, f, c) {
    var k = mxUtils.bind(this, function() {
      return this.client.filesGetMetadata({
        path: '/' + e.toLowerCase(),
        include_deleted: !1
      });
    });
    this.executePromise(k, mxUtils.bind(this, function(m) {
      c ? f(!1, !0, m) : this.ui.confirm(mxResources.get('replaceIt', [e]), function() {
        f(!0, !0, m);
      }, function() {
        f(!1, !0, m);
      });
    }), function(m) {
      f(!0, !1);
    });
  };
  DropboxClient.prototype.renameFile = function(e, f, c, k) {
    if (/[\\\/:\?\*"\|]/.test(f))
      k({
        message: mxResources.get('dropboxCharsNotAllowed')
      });
    else {
      if (null != e && null != f) {
        var m = e.stat.path_display.substring(1),
          t = m.lastIndexOf('/');
        0 < t && (f = m.substring(0, t + 1) + f);
      }
      null != e && null != f && e.stat.path_lower.substring(1) !== f.toLowerCase() ? this.checkExists(f, mxUtils.bind(this, function(y, E, z) {
        y ? (y = mxUtils.bind(this, function(D) {
          D = mxUtils.bind(this, function() {
            return this.client.filesMove({
              from_path: e.stat.path_display,
              to_path: '/' + f,
              autorename: !1
            });
          });
          this.executePromise(D, c, k);
        }), E && z.path_lower.substring(1) !== f.toLowerCase() ? (E = mxUtils.bind(this, function() {
          return this.client.filesDelete({
            path: '/' + f.toLowerCase()
          });
        }), this.executePromise(E, y, k)) : y()) : k();
      })) : k({
        message: mxResources.get('invalidName')
      });
    }
  };
  DropboxClient.prototype.insertLibrary = function(e, f, c, k) {
    this.insertFile(e, f, c, k, !0);
  };
  DropboxClient.prototype.insertFile = function(e, f, c, k, m) {
    m = null != m ? m : !1;
    this.checkExists(e, mxUtils.bind(this, function(t) {
      t ? this.saveFile(e, f, mxUtils.bind(this, function(y) {
        m ? c(new DropboxLibrary(this.ui, f, y)) : c(new DropboxFile(this.ui, f, y));
      }), k) : k();
    }));
  };
  DropboxClient.prototype.saveFile = function(e, f, c, k, m) {
    if (/[\\\/:\?\*"\|]/.test(e))
      k({
        message: mxResources.get('dropboxCharsNotAllowed')
      });
    else if (150000000 <= f.length)
      k({
        message: mxResources.get('drawingTooLarge') + ' (' + this.ui.formatFileSize(f.length) + ' / 150 MB)'
      });
    else {
      m = null != m ? m : '';
      var t = mxUtils.bind(this, function() {
        return this.client.filesUpload({
          path: '/' + m + e,
          mode: {
            '.tag': 'overwrite'
          },
          mute: !0,
          contents: new Blob([f], {
            type: 'text/plain'
          })
        });
      });
      this.executePromise(t, c, k);
    }
  };
  DropboxClient.prototype.pickLibrary = function(e) {
    Dropbox.choose({
      linkType: 'direct',
      cancel: mxUtils.bind(this, function() {}),
      success: mxUtils.bind(this, function(f) {
        if (this.ui.spinner.spin(document.body, mxResources.get('loading'))) {
          var c = mxUtils.bind(this, function(t) {
              this.ui.spinner.stop();
              this.ui.handleError(t);
            }),
            k = f[0].link.indexOf(this.appPath);
          if (0 < k) {
            var m = decodeURIComponent(f[0].link.substring(k + this.appPath.length - 1));
            this.readFile({
              path: m
            }, mxUtils.bind(this, function(t, y) {
              if (null != y && y.id == f[0].id)
                try {
                  this.ui.spinner.stop(), e(m.substring(1), new DropboxLibrary(this.ui, t, y));
                } catch (E) {
                  this.ui.handleError(E);
                }
              else
                this.createLibrary(f[0], e, c);
            }), c);
          } else
            this.createLibrary(f[0], e, c);
        }
      })
    });
  };
  DropboxClient.prototype.createLibrary = function(e, f, c) {
    this.ui.confirm(mxResources.get('note') + ': ' + mxResources.get('fileWillBeSavedInAppFolder', [e.name]), mxUtils.bind(this, function() {
      this.ui.editor.loadUrl(e.link, mxUtils.bind(this, function(k) {
        this.insertFile(e.name, k, mxUtils.bind(this, function(m) {
          try {
            this.ui.spinner.stop(), f(m.getHash().substring(1), m);
          } catch (t) {
            c(t);
          }
        }), c, !0);
      }), c);
    }), mxUtils.bind(this, function() {
      this.ui.spinner.stop();
    }));
  };
  DropboxClient.prototype.pickFile = function(e, f) {
    null != Dropbox.choose ? (e = null != e ? e : mxUtils.bind(this, function(c, k) {
      this.ui.loadFile(null != c ? 'D' + encodeURIComponent(c) : k.getHash(), null, k);
    }), Dropbox.choose({
      linkType: 'direct',
      cancel: mxUtils.bind(this, function() {}),
      success: mxUtils.bind(this, function(c) {
        if (this.ui.spinner.spin(document.body, mxResources.get('loading')))
          if (f)
            this.ui.spinner.stop(), e(c[0].link);
          else {
            var k = mxUtils.bind(this, function(z) {
                this.ui.spinner.stop();
                this.ui.handleError(z);
              }),
              m = mxUtils.bind(this, function(z, D) {
                this.ui.spinner.stop();
                e(z, D);
              }),
              t = /\.png$/i.test(c[0].name);
            if (/\.vsdx$/i.test(c[0].name) || /\.gliffy$/i.test(c[0].name) || !this.ui.useCanvasForExport && t)
              m(c[0].link);
            else {
              var y = c[0].link.indexOf(this.appPath);
              if (0 < y) {
                var E = decodeURIComponent(c[0].link.substring(y + this.appPath.length - 1));
                this.readFile({
                  path: E
                }, mxUtils.bind(this, function(z, D) {
                  if (null != D && D.id == c[0].id) {
                    var J = t ? z.lastIndexOf(',') : -1;
                    this.ui.spinner.stop();
                    var G = null;
                    0 < J && (J = this.ui.extractGraphModelFromPng(z), null != J && 0 < J.length ? z = J : G = new LocalFile(this, z, E, !0));
                    e(E.substring(1), null != G ? G : new DropboxFile(this.ui, z, D));
                  } else
                    this.createFile(c[0], m, k);
                }), k, t);
              } else
                this.createFile(c[0], m, k);
            }
          }
      })
    })) : this.ui.handleError({
      message: mxResources.get('serviceUnavailableOrBlocked')
    });
  };
  DropboxClient.prototype.createFile = function(e, f, c) {
    var k = /(\.png)$/i.test(e.name);
    this.ui.editor.loadUrl(e.link, mxUtils.bind(this, function(m) {
      null != m && 0 < m.length ? this.ui.confirm(mxResources.get('note') + ': ' + mxResources.get('fileWillBeSavedInAppFolder', [e.name]), mxUtils.bind(this, function() {
        var t = k ? m.lastIndexOf(',') : -1;
        0 < t && (t = this.ui.extractGraphModelFromPng(m.substring(t + 1)), null != t && 0 < t.length && (m = t));
        this.insertFile(e.name, m, mxUtils.bind(this, function(y) {
          f(e.name, y);
        }), c);
      }), mxUtils.bind(this, function() {
        this.ui.spinner.stop();
      })) : (this.ui.spinner.stop(), c({
        message: mxResources.get('errorLoadingFile')
      }));
    }), c, k);
  };
}());