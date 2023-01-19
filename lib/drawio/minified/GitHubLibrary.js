GitHubLibrary = function(b, e, f) {
  GitHubFile.call(this, b, e, f);
};
mxUtils.extend(GitHubLibrary, GitHubFile);
GitHubLibrary.prototype.doSave = function(b, e, f) {
  this.saveFile(b, !1, e, f);
};
GitHubLibrary.prototype.open = function() {};
(function() {
  var b = null;
  window.GitHubClient = function(e, f) {
    DrawioClient.call(this, e, f || 'ghauth');
  };
  mxUtils.extend(GitHubClient, DrawioClient);
  GitHubClient.prototype.clientId = 'test.draw.io' == window.location.hostname ? 'Iv1.1218f5567fbc258a' : window.DRAWIO_GITHUB_ID;
  GitHubClient.prototype.extension = '.drawio';
  GitHubClient.prototype.baseUrl = DRAWIO_GITHUB_API_URL;
  GitHubClient.prototype.baseHostUrl = DRAWIO_GITHUB_URL;
  GitHubClient.prototype.redirectUri = window.location.protocol + '//' + window.location.host + '/github2';
  GitHubClient.prototype.maxFileSize = 1000000;
  GitHubClient.prototype.authToken = 'token';
  GitHubClient.prototype.setToken = function(e) {
    b = e;
  };
  GitHubClient.prototype.updateUser = function(e, f, c) {
    var k = !0,
      m = window.setTimeout(mxUtils.bind(this, function() {
        k = !1;
        f({
          code: App.ERROR_TIMEOUT,
          message: mxResources.get('timeout')
        });
      }), this.ui.timeout),
      t = new mxXmlRequest(this.baseUrl + '/user', null, 'GET'),
      y = this.authToken + ' ' + b;
    t.setRequestHeaders = function(E, z) {
      E.setRequestHeader('Authorization', y);
    };
    t.send(mxUtils.bind(this, function() {
      window.clearTimeout(m);
      k && (401 === t.getStatus() ? c ? f({
        message: mxResources.get('accessDenied')
      }) : (this.logout(), this.authenticate(mxUtils.bind(this, function() {
        this.updateUser(e, f, !0);
      }), f)) : 200 > t.getStatus() || 300 <= t.getStatus() ? f({
        message: mxResources.get('accessDenied')
      }) : (this.setUser(this.createUser(JSON.parse(t.getText()))), e()));
    }), f);
  };
  GitHubClient.prototype.createUser = function(e) {
    return new DrawioUser(e.id, e.email, e.name);
  };
  GitHubClient.prototype.authenticate = function(e, f) {
    new mxXmlRequest(this.redirectUri + '?getState=1', null, 'GET').send(mxUtils.bind(this, function(c) {
      200 <= c.getStatus() && 299 >= c.getStatus() ? this.authenticateStep2(c.getText(), e, f) : null != f && f(c);
    }), f);
  };
  GitHubClient.prototype.authenticateStep2 = function(e, f, c) {
    if (null == window.onGitHubCallback) {
      var k = mxUtils.bind(this, function() {
        var m = !0;
        null != this.getPersistentToken(!0) ? new mxXmlRequest(this.redirectUri + '?state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + e), null, 'GET').send(mxUtils.bind(this, function(t) {
          200 <= t.getStatus() && 299 >= t.getStatus() ? (b = JSON.parse(t.getText()).access_token, this.setUser(null), f()) : (this.clearPersistentToken(), this.setUser(null), b = null, 401 == t.getStatus() ? k() : c({
            message: mxResources.get('accessDenied'),
            retry: k
          }));
        }), c) : this.ui.showAuthDialog(this, !0, mxUtils.bind(this, function(t, y) {
          null != window.open(this.baseHostUrl + '/login/oauth/authorize?client_id=' + this.clientId + '&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + e), 'ghauth') ? window.onGitHubCallback = mxUtils.bind(this, function(E, z) {
            m ? (window.onGitHubCallback = null, m = !1, null == E ? c({
              message: mxResources.get('accessDenied'),
              retry: k
            }) : (null != y && y(), b = E.access_token, this.setUser(null), t && this.setPersistentToken('remembered'), f(), null != z && z.close())) : null != z && z.close();
          }) : c({
            message: mxResources.get('serviceUnavailableOrBlocked'),
            retry: k
          });
        }), mxUtils.bind(this, function() {
          m && (window.onGitHubCallback = null, m = !1, c({
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
  GitHubClient.prototype.getErrorMessage = function(e, f) {
    try {
      var c = JSON.parse(e.getText());
      null != c && null != c.message && (f = c.message);
    } catch (k) {}
    return f;
  };
  GitHubClient.prototype.showAuthorizeDialog = function(e, f) {
    this.ui.showError(mxResources.get('accessDenied'), mxResources.get('authorizationRequired'), mxResources.get('help'), mxUtils.bind(this, function() {
      this.ui.openLink('https://www.diagrams.net/blog/single-repository-diagrams');
    }), e, mxResources.get('authorize'), mxUtils.bind(this, function() {
      this.ui.openLink('test.draw.io' == window.location.hostname ? 'https://github.com/apps/diagrams-net-app-test' : 'https://github.com/apps/draw-io-app');
    }), mxResources.get('cancel'), f, 480, null, !1);
  };
  GitHubClient.prototype.executeRequest = function(e, f, c, k, m) {
    var t = mxUtils.bind(this, function(E) {
        var z = !0,
          D = window.setTimeout(mxUtils.bind(this, function() {
            z = !1;
            c({
              code: App.ERROR_TIMEOUT,
              retry: y
            });
          }), this.ui.timeout),
          J = this.authToken + ' ' + b;
        e.setRequestHeaders = function(G, d) {
          G.setRequestHeader('Authorization', J);
        };
        e.send(mxUtils.bind(this, function() {
          window.clearTimeout(D);
          var G = mxUtils.bind(this, function() {
            var n = this.ui.spinner.pause();
            this.showAuthorizeDialog(mxUtils.bind(this, function() {
              n();
              y();
            }), mxUtils.bind(this, function() {
              this.ui.hideDialog();
              c({
                name: 'AbortError'
              });
            }));
          });
          if (z)
            if (200 <= e.getStatus() && 299 >= e.getStatus() || k && 404 == e.getStatus())
              f(e);
            else if (401 === e.getStatus())
            E ? c({
              code: e.getStatus(),
              message: mxResources.get('accessDenied'),
              retry: mxUtils.bind(this, function() {
                this.authenticate(function() {
                  y(!0);
                }, c);
              })
            }) : this.authenticate(function() {
              t(!0);
            }, c);
          else if (403 === e.getStatus()) {
            var d = !1;
            try {
              var g = JSON.parse(e.getText());
              null != g && 'Resource not accessible by integration' == g.message ? G() : (null != g && null != g.errors && 0 < g.errors.length && (d = 'too_large' == g.errors[0].code), c({
                message: mxResources.get(d ? 'drawingTooLarge' : 'forbidden')
              }));
            } catch (n) {
              c({
                message: mxResources.get(d ? 'drawingTooLarge' : 'forbidden')
              });
            }
          } else
            404 === e.getStatus() ? m ? c({
              code: e.getStatus(),
              message: this.getErrorMessage(e, mxResources.get('fileNotFound'))
            }) : G() : 409 === e.getStatus() ? c({
              code: e.getStatus(),
              status: 409
            }) : c({
              code: e.getStatus(),
              message: this.getErrorMessage(e, mxResources.get('error') + ' ' + e.getStatus())
            });
        }), mxUtils.bind(this, function(G) {
          window.clearTimeout(D);
          z && c(G);
        }));
      }),
      y = mxUtils.bind(this, function(E) {
        null == this.user ? this.updateUser(function() {
          y(!0);
        }, c, E) : t(E);
      });
    null == b ? this.authenticate(function() {
      y(!0);
    }, c) : y(!1);
  };
  GitHubClient.prototype.getLibrary = function(e, f, c) {
    this.getFile(e, f, c, !0);
  };
  GitHubClient.prototype.getSha = function(e, f, c, k, m, t, y) {
    var E = '&t=' + new Date().getTime();
    e = new mxXmlRequest(this.baseUrl + '/repos/' + e + '/' + f + '/contents/' + c + '?ref=' + k + E, null, 'HEAD');
    this.executeRequest(e, mxUtils.bind(this, function(z) {
      try {
        m(z.request.getResponseHeader('Etag').match(/"([^"]+)"/)[1]);
      } catch (D) {
        t(D);
      }
    }), t, null, y);
  };
  GitHubClient.prototype.getFile = function(e, f, c, k, m) {
    k = null != k ? k : !1;
    var t = e.split('/'),
      y = t[0],
      E = t[1],
      z = t[2];
    e = t.slice(3, t.length).join('/');
    t = /\.png$/i.test(e);
    if (!m && (/\.v(dx|sdx?)$/i.test(e) || /\.gliffy$/i.test(e) || /\.pdf$/i.test(e) || !this.ui.useCanvasForExport && t))
      if (null != b) {
        m = this.baseUrl + '/repos/' + y + '/' + E + '/contents/' + e + '?ref=' + z;
        var D = {
          Authorization: 'token ' + b
        };
        t = e.split('/');
        this.ui.convertFile(m, 0 < t.length ? t[t.length - 1] : e, null, this.extension, f, c, null, D);
      } else
        c({
          message: mxResources.get('accessDenied')
        });
    else
      t = '&t=' + new Date().getTime(), e = new mxXmlRequest(this.baseUrl + '/repos/' + y + '/' + E + '/contents/' + e + '?ref=' + z + t, null, 'GET'), this.executeRequest(e, mxUtils.bind(this, function(J) {
        try {
          f(this.createGitHubFile(y, E, z, JSON.parse(J.getText()), k));
        } catch (G) {
          c(G);
        }
      }), c);
  };
  GitHubClient.prototype.createGitHubFile = function(e, f, c, k, m) {
    e = {
      org: e,
      repo: f,
      ref: c,
      name: k.name,
      path: k.path,
      sha: k.sha,
      html_url: k.html_url,
      download_url: k.download_url
    };
    f = k.content;
    'base64' === k.encoding && (/\.jpe?g$/i.test(k.name) ? f = 'data:image/jpeg;base64,' + f : /\.gif$/i.test(k.name) ? f = 'data:image/gif;base64,' + f : /\.png$/i.test(k.name) ? (k = this.ui.extractGraphModelFromPng(f), f = null != k && 0 < k.length ? k : 'data:image/png;base64,' + f) : f = Base64.decode(f));
    return m ? new GitHubLibrary(this.ui, f, e) : new GitHubFile(this.ui, f, e);
  };
  GitHubClient.prototype.insertLibrary = function(e, f, c, k, m) {
    this.insertFile(e, f, c, k, !0, m, !1);
  };
  GitHubClient.prototype.insertFile = function(e, f, c, k, m, t, y) {
    m = null != m ? m : !1;
    t = t.split('/');
    var E = t[0],
      z = t[1],
      D = t[2],
      J = t.slice(3, t.length).join('/');
    0 < J.length && (J += '/');
    J += e;
    this.checkExists(E + '/' + z + '/' + D + '/' + J, !0, mxUtils.bind(this, function(G, d) {
      G ? m ? (y || (f = Base64.encode(f)), this.showCommitDialog(e, !0, mxUtils.bind(this, function(g) {
        this.writeFile(E, z, D, J, g, f, d, mxUtils.bind(this, function(n) {
          try {
            var v = JSON.parse(n.getText());
            c(this.createGitHubFile(E, z, D, v.content, m));
          } catch (u) {
            k(u);
          }
        }), k);
      }), k)) : c(new GitHubFile(this.ui, f, {
        org: E,
        repo: z,
        ref: D,
        name: e,
        path: J,
        sha: d,
        isNew: !0
      })) : k();
    }));
  };
  GitHubClient.prototype.showCommitDialog = function(e, f, c, k) {
    var m = this.ui.spinner.pause();
    e = new FilenameDialog(this.ui, mxResources.get(f ? 'addedFile' : 'updateFile', [e]), mxResources.get('ok'), mxUtils.bind(this, function(t) {
      m();
      c(t);
    }), mxResources.get('commitMessage'), null, null, null, null, mxUtils.bind(this, function() {
      k();
    }), null, 280);
    this.ui.showDialog(e.container, 400, 80, !0, !1);
    e.init();
  };
  GitHubClient.prototype.writeFile = function(e, f, c, k, m, t, y, E, z) {
    t.length >= this.maxFileSize ? z({
      message: mxResources.get('drawingTooLarge') + ' (' + this.ui.formatFileSize(t.length) + ' / 1 MB)'
    }) : (c = {
      path: k,
      branch: decodeURIComponent(c),
      message: m,
      content: t
    }, null != y && (c.sha = y), e = new mxXmlRequest(this.baseUrl + '/repos/' + e + '/' + f + '/contents/' + k, JSON.stringify(c), 'PUT'), this.executeRequest(e, mxUtils.bind(this, function(D) {
      E(D);
    }), mxUtils.bind(this, function(D) {
      404 == D.code && (D.helpLink = this.baseHostUrl + '/settings/connections/applications/' + this.clientId, D.code = null);
      z(D);
    })));
  };
  GitHubClient.prototype.checkExists = function(e, f, c) {
    var k = e.split('/'),
      m = k[0],
      t = k[1],
      y = k[2];
    e = k.slice(3, k.length).join('/');
    this.getSha(m, t, e, y, mxUtils.bind(this, function(E) {
      if (f) {
        var z = this.ui.spinner.pause();
        this.ui.confirm(mxResources.get('replaceIt', [e]), function() {
          z();
          c(!0, E);
        }, function() {
          z();
          c(!1);
        });
      } else
        this.ui.spinner.stop(), this.ui.showError(mxResources.get('error'), mxResources.get('fileExists'), mxResources.get('ok'), function() {
          c(!1);
        });
    }), mxUtils.bind(this, function(E) {
      c(!0);
    }), !0);
  };
  GitHubClient.prototype.saveFile = function(e, f, c, k, m) {
    var t = e.meta.org,
      y = e.meta.repo,
      E = e.meta.ref,
      z = e.meta.path,
      D = mxUtils.bind(this, function(G, d) {
        this.writeFile(t, y, E, z, m, d, G, mxUtils.bind(this, function(g) {
          delete e.meta.isNew;
          f(JSON.parse(g.getText()).content.sha);
        }), mxUtils.bind(this, function(g) {
          c(g);
        }));
      }),
      J = mxUtils.bind(this, function() {
        if (this.ui.useCanvasForExport && /(\.png)$/i.test(z)) {
          var G = this.ui.getPngFileProperties(this.ui.fileNode);
          this.ui.getEmbeddedPng(mxUtils.bind(this, function(d) {
            D(e.meta.sha, d);
          }), c, this.ui.getCurrentFile() != e ? e.getData() : null, G.scale, G.border);
        } else
          D(e.meta.sha, Base64.encode(e.getData()));
      });
    k ? this.getSha(t, y, z, E, mxUtils.bind(this, function(G) {
      e.meta.sha = G;
      J();
    }), c) : J();
  };
  GitHubClient.prototype.pickLibrary = function(e) {
    this.pickFile(e);
  };
  GitHubClient.prototype.pickFolder = function(e) {
    this.showGitHubDialog(!1, e);
  };
  GitHubClient.prototype.pickFile = function(e) {
    e = null != e ? e : mxUtils.bind(this, function(f) {
      this.ui.loadFile('H' + encodeURIComponent(f));
    });
    this.showGitHubDialog(!0, e);
  };
  GitHubClient.prototype.showGitHubDialog = function(e, f) {
    var c = null,
      k = null,
      m = null,
      t = null,
      y = document.createElement('div');
    y.style.whiteSpace = 'nowrap';
    y.style.overflow = 'hidden';
    y.style.height = '304px';
    var E = document.createElement('h3');
    mxUtils.write(E, mxResources.get(e ? 'selectFile' : 'selectFolder'));
    E.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
    y.appendChild(E);
    var z = document.createElement('div');
    z.style.whiteSpace = 'nowrap';
    z.style.border = '1px solid lightgray';
    z.style.boxSizing = 'border-box';
    z.style.padding = '4px';
    z.style.overflow = 'auto';
    z.style.lineHeight = '1.2em';
    z.style.height = '274px';
    y.appendChild(z);
    var D = document.createElement('div');
    D.style.textOverflow = 'ellipsis';
    D.style.boxSizing = 'border-box';
    D.style.overflow = 'hidden';
    D.style.padding = '4px';
    D.style.width = '100%';
    var J = new CustomDialog(this.ui, y, mxUtils.bind(this, function() {
      f(c + '/' + k + '/' + encodeURIComponent(m) + '/' + t);
    }), null, null, 'https://www.diagrams.net/blog/single-repository-diagrams', null, null, null, null, [
      [
        mxResources.get('refresh'),
        mxUtils.bind(this, function() {
          C();
        })
      ],
      [
        mxResources.get('authorize'),
        mxUtils.bind(this, function() {
          this.ui.openLink('test.draw.io' == window.location.hostname ? 'https://github.com/apps/diagrams-net-app-test' : 'https://github.com/apps/draw-io-app');
        })
      ]
    ]);
    this.ui.showDialog(J.container, 420, 370, !0, !0);
    e && J.okButton.parentNode.removeChild(J.okButton);
    var G = mxUtils.bind(this, function(F, L, l, q) {
        var A = document.createElement('a');
        A.setAttribute('title', F);
        A.style.cursor = 'pointer';
        mxUtils.write(A, F);
        mxEvent.addListener(A, 'click', L);
        q && (A.style.textDecoration = 'underline');
        null != l && (F = D.cloneNode(), F.style.padding = l, F.appendChild(A), A = F);
        return A;
      }),
      d = mxUtils.bind(this, function(F) {
        var L = document.createElement('div');
        L.style.marginBottom = '8px';
        L.appendChild(G(c + '/' + k, mxUtils.bind(this, function() {
          t = null;
          C();
        }), null, !0));
        F || (mxUtils.write(L, ' / '), L.appendChild(G(decodeURIComponent(m), mxUtils.bind(this, function() {
          t = null;
          x();
        }), null, !0)));
        if (null != t && 0 < t.length) {
          var l = t.split('/');
          for (F = 0; F < l.length; F++)
            (function(q) {
              mxUtils.write(L, ' / ');
              L.appendChild(G(l[q], mxUtils.bind(this, function() {
                t = l.slice(0, q + 1).join('/');
                u();
              }), null, !0));
            }(F));
        }
        z.appendChild(L);
      }),
      g = mxUtils.bind(this, function(F) {
        this.ui.handleError(F, null, mxUtils.bind(this, function() {
          this.ui.spinner.stop();
          null != this.getUser() ? (t = m = k = c = null, C()) : this.ui.hideDialog();
        }), null, {});
      }),
      n = null,
      v = null,
      u = mxUtils.bind(this, function(F) {
        null == F && (z.innerText = '', F = 1);
        var L = new mxXmlRequest(this.baseUrl + '/repos/' + c + '/' + k + '/contents/' + t + '?ref=' + encodeURIComponent(m) + '&per_page=100&page=' + F, null, 'GET');
        this.ui.spinner.spin(z, mxResources.get('loading'));
        J.okButton.removeAttribute('disabled');
        null != v && (mxEvent.removeListener(z, 'scroll', v), v = null);
        null != n && null != n.parentNode && n.parentNode.removeChild(n);
        n = document.createElement('a');
        n.style.display = 'block';
        n.style.cursor = 'pointer';
        mxUtils.write(n, mxResources.get('more') + '...');
        var l = mxUtils.bind(this, function() {
          u(F + 1);
        });
        mxEvent.addListener(n, 'click', l);
        this.executeRequest(L, mxUtils.bind(this, function(q) {
          this.ui.spinner.stop();
          1 == F && (d(), z.appendChild(G('../ [Up]', mxUtils.bind(this, function() {
            if ('' == t)
              t = null, C();
            else {
              var M = t.split('/');
              t = M.slice(0, M.length - 1).join('/');
              u();
            }
          }), '4px')));
          var A = JSON.parse(q.getText());
          if (null == A || 0 == A.length)
            mxUtils.write(z, mxResources.get('noFiles'));
          else {
            var H = !0,
              K = 0;
            q = mxUtils.bind(this, function(M) {
              for (var I = 0; I < A.length; I++)
                mxUtils.bind(this, function(Q, P) {
                  if (M == ('dir' == Q.type)) {
                    P = D.cloneNode();
                    P.style.backgroundColor = H ? Editor.isDarkMode() ? '#000000' : '#eeeeee' : '';
                    H = !H;
                    var O = document.createElement('img');
                    O.src = IMAGE_PATH + '/' + ('dir' == Q.type ? 'folder.png' : 'file.png');
                    O.setAttribute('align', 'absmiddle');
                    O.style.marginRight = '4px';
                    O.style.marginTop = '-4px';
                    O.width = 20;
                    P.appendChild(O);
                    P.appendChild(G(Q.name + ('dir' == Q.type ? '/' : ''), mxUtils.bind(this, function() {
                      'dir' == Q.type ? (t = Q.path, u()) : e && 'file' == Q.type && (this.ui.hideDialog(), f(c + '/' + k + '/' + encodeURIComponent(m) + '/' + Q.path));
                    })));
                    z.appendChild(P);
                    K++;
                  }
                })(A[I], I);
            });
            q(!0);
            e && q(!1);
          }
        }), g, !0);
      }),
      x = mxUtils.bind(this, function(F, L) {
        null == F && (z.innerText = '', F = 1);
        var l = new mxXmlRequest(this.baseUrl + '/repos/' + c + '/' + k + '/branches?per_page=100&page=' + F, null, 'GET');
        J.okButton.setAttribute('disabled', 'disabled');
        this.ui.spinner.spin(z, mxResources.get('loading'));
        null != v && (mxEvent.removeListener(z, 'scroll', v), v = null);
        null != n && null != n.parentNode && n.parentNode.removeChild(n);
        n = document.createElement('a');
        n.style.display = 'block';
        n.style.cursor = 'pointer';
        mxUtils.write(n, mxResources.get('more') + '...');
        var q = mxUtils.bind(this, function() {
          x(F + 1);
        });
        mxEvent.addListener(n, 'click', q);
        this.executeRequest(l, mxUtils.bind(this, function(A) {
          this.ui.spinner.stop();
          1 == F && (d(!0), z.appendChild(G('../ [Up]', mxUtils.bind(this, function() {
            t = null;
            C();
          }), '4px')));
          A = JSON.parse(A.getText());
          if (null == A || 0 == A.length)
            mxUtils.write(z, mxResources.get('noFiles'));
          else if (1 == A.length && L)
            m = A[0].name, t = '', u();
          else {
            for (var H = 0; H < A.length; H++)
              mxUtils.bind(this, function(K, M) {
                var I = D.cloneNode();
                I.style.backgroundColor = 0 == M % 2 ? Editor.isDarkMode() ? '#000000' : '#eeeeee' : '';
                I.appendChild(G(K.name, mxUtils.bind(this, function() {
                  m = K.name;
                  t = '';
                  u();
                })));
                z.appendChild(I);
              })(A[H], H);
            100 == A.length && (z.appendChild(n), v = function() {
              z.scrollTop >= z.scrollHeight - z.offsetHeight && q();
            }, mxEvent.addListener(z, 'scroll', v));
          }
        }), g);
      }),
      C = mxUtils.bind(this, function(F) {
        null == F && (z.innerText = '', F = 1);
        var L = new mxXmlRequest(this.baseUrl + '/user/repos?per_page=100&page=' + F, null, 'GET');
        J.okButton.setAttribute('disabled', 'disabled');
        this.ui.spinner.spin(z, mxResources.get('loading'));
        null != v && mxEvent.removeListener(z, 'scroll', v);
        null != n && null != n.parentNode && n.parentNode.removeChild(n);
        n = document.createElement('a');
        n.style.display = 'block';
        n.style.cursor = 'pointer';
        mxUtils.write(n, mxResources.get('more') + '...');
        var l = mxUtils.bind(this, function() {
          C(F + 1);
        });
        mxEvent.addListener(n, 'click', l);
        this.executeRequest(L, mxUtils.bind(this, function(q) {
          this.ui.spinner.stop();
          q = JSON.parse(q.getText());
          if (null == q || 0 == q.length)
            mxUtils.write(z, mxResources.get('noFiles'));
          else {
            1 == F && (z.appendChild(G(mxResources.get('enterValue') + '...', mxUtils.bind(this, function() {
              var H = new FilenameDialog(this.ui, 'org/repo/ref', mxResources.get('ok'), mxUtils.bind(this, function(K) {
                if (null != K) {
                  var M = K.split('/');
                  if (1 < M.length) {
                    K = M[0];
                    var I = M[1];
                    3 > M.length ? (c = K, k = I, t = m = null, x()) : this.ui.spinner.spin(z, mxResources.get('loading')) && (M = encodeURIComponent(M.slice(2, M.length).join('/')), this.getFile(K + '/' + I + '/' + M, mxUtils.bind(this, function(Q) {
                      this.ui.spinner.stop();
                      c = Q.meta.org;
                      k = Q.meta.repo;
                      m = decodeURIComponent(Q.meta.ref);
                      t = '';
                      u();
                    }), mxUtils.bind(this, function(Q) {
                      this.ui.spinner.stop();
                      this.ui.handleError({
                        message: mxResources.get('fileNotFound')
                      });
                    })));
                  } else
                    this.ui.spinner.stop(), this.ui.handleError({
                      message: mxResources.get('invalidName')
                    });
                }
              }), mxResources.get('enterValue'));
              this.ui.showDialog(H.container, 300, 80, !0, !1);
              H.init();
            }))), mxUtils.br(z), mxUtils.br(z));
            for (var A = 0; A < q.length; A++)
              mxUtils.bind(this, function(H, K) {
                var M = D.cloneNode();
                M.style.backgroundColor = 0 == K % 2 ? Editor.isDarkMode() ? '#000000' : '#eeeeee' : '';
                M.appendChild(G(H.full_name, mxUtils.bind(this, function() {
                  c = H.owner.login;
                  k = H.name;
                  t = '';
                  x(null, !0);
                })));
                z.appendChild(M);
              })(q[A], A);
          }
          100 == q.length && (z.appendChild(n), v = function() {
            z.scrollTop >= z.scrollHeight - z.offsetHeight && l();
          }, mxEvent.addListener(z, 'scroll', v));
        }), g);
      });
    C();
  };
  GitHubClient.prototype.logout = function() {
    this.clearPersistentToken();
    this.setUser(null);
    b = null;
  };
}());