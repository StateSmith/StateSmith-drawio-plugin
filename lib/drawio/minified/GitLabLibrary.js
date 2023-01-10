GitLabLibrary = function(b, e, f) {
  GitLabFile.call(this, b, e, f);
};
mxUtils.extend(GitLabLibrary, GitLabFile);
GitLabLibrary.prototype.doSave = function(b, e, f) {
  this.saveFile(b, !1, e, f);
};
GitLabLibrary.prototype.open = function() {};
(function() {
  var b = null;
  window.GitLabClient = function(e) {
    GitHubClient.call(this, e, 'gitlabauth');
  };
  mxUtils.extend(GitLabClient, GitHubClient);
  GitLabClient.prototype.clientId = DRAWIO_GITLAB_ID;
  GitLabClient.prototype.scope = 'api%20read_repository%20write_repository';
  GitLabClient.prototype.baseUrl = DRAWIO_GITLAB_URL + '/api/v4';
  GitLabClient.prototype.maxFileSize = 10000000;
  GitLabClient.prototype.authToken = 'Bearer';
  GitLabClient.prototype.redirectUri = window.location.protocol + '//' + window.location.host + '/gitlab';
  GitLabClient.prototype.authenticate = function(e, f) {
    new mxXmlRequest(this.redirectUri + '?getState=1', null, 'GET').send(mxUtils.bind(this, function(c) {
      200 <= c.getStatus() && 299 >= c.getStatus() ? this.authenticateStep2(c.getText(), e, f) : null != f && f(c);
    }), f);
  };
  GitLabClient.prototype.authenticateStep2 = function(e, f, c) {
    if (null == window.onGitLabCallback) {
      var k = mxUtils.bind(this, function() {
        var m = !0;
        null != this.getPersistentToken(!0) ? new mxXmlRequest(this.redirectUri + '?state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + e), null, 'GET').send(mxUtils.bind(this, function(t) {
          200 <= t.getStatus() && 299 >= t.getStatus() ? (b = JSON.parse(t.getText()).access_token, this.setToken(b), this.setUser(null), f()) : (this.clearPersistentToken(), this.setUser(null), b = null, this.setToken(null), 401 == t.getStatus() ? k() : c({
            message: mxResources.get('accessDenied'),
            retry: k
          }));
        }), c) : this.ui.showAuthDialog(this, !0, mxUtils.bind(this, function(t, y) {
          null != window.open(DRAWIO_GITLAB_URL + '/oauth/authorize?client_id=' + this.clientId + '&scope=' + this.scope + '&redirect_uri=' + encodeURIComponent(this.redirectUri) + '&response_type=code&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname + '&token=' + e), 'gitlabauth') ? window.onGitLabCallback = mxUtils.bind(this, function(E, z) {
            m ? (window.onGitLabCallback = null, m = !1, null == E ? c({
              message: mxResources.get('accessDenied'),
              retry: k
            }) : (null != y && y(), b = E.access_token, this.setToken(b), this.setUser(null), t && this.setPersistentToken('remembered'), f(), null != z && z.close())) : null != z && z.close();
          }) : c({
            message: mxResources.get('serviceUnavailableOrBlocked'),
            retry: k
          });
        }), mxUtils.bind(this, function() {
          m && (window.onGitLabCallback = null, m = !1, c({
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
  GitLabClient.prototype.executeRequest = function(e, f, c, k) {
    var m = mxUtils.bind(this, function(y) {
        var E = !0,
          z = window.setTimeout(mxUtils.bind(this, function() {
            E = !1;
            c({
              code: App.ERROR_TIMEOUT,
              message: mxResources.get('timeout')
            });
          }), this.ui.timeout),
          D = this.authToken + ' ' + b;
        e.setRequestHeaders = function(J, G) {
          J.setRequestHeader('Authorization', D);
          J.setRequestHeader('PRIVATE_TOKEN', D);
          J.setRequestHeader('Content-Type', 'application/json');
        };
        e.send(mxUtils.bind(this, function() {
          window.clearTimeout(z);
          if (E)
            if (200 <= e.getStatus() && 299 >= e.getStatus() || k && 404 == e.getStatus())
              f(e);
            else if (401 === e.getStatus())
            y ? c({
              message: mxResources.get('accessDenied'),
              retry: mxUtils.bind(this, function() {
                this.authenticate(function() {
                  t(!0);
                }, c);
              })
            }) : this.authenticate(function() {
              m(!0);
            }, c);
          else if (403 === e.getStatus()) {
            var J = !1;
            try {
              var G = JSON.parse(e.getText());
              null != G && null != G.errors && 0 < G.errors.length && (J = 'too_large' == G.errors[0].code);
            } catch (d) {}
            c({
              message: mxResources.get(J ? 'drawingTooLarge' : 'forbidden')
            });
          } else
            404 === e.getStatus() ? c({
              message: this.getErrorMessage(e, mxResources.get('fileNotFound'))
            }) : 400 === e.getStatus() ? c({
              status: 400
            }) : c({
              status: e.getStatus(),
              message: this.getErrorMessage(e, mxResources.get('error') + ' ' + e.getStatus())
            });
        }), mxUtils.bind(this, function(J) {
          window.clearTimeout(z);
          E && c(J);
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
  GitLabClient.prototype.getRefIndex = function(e, f, c, k, m, t) {
    if (null != m)
      c(e, m);
    else {
      var y = e.length - 2,
        E = mxUtils.bind(this, function() {
          if (2 > y)
            k({
              message: mxResources.get('fileNotFound')
            });
          else {
            var z = Math.max(y - 1, 0),
              D = e.slice(0, z).join('/');
            z = e[z];
            var J = e[y],
              G = e.slice(y + 1, e.length).join('/');
            D = this.baseUrl + '/projects/' + encodeURIComponent(D + '/' + z) + '/repository/' + (f ? t ? 'branches?per_page=1&page=1&ref=' + J : 'tree?path=' + G + '&ref=' + J : 'files/' + encodeURIComponent(G) + '?ref=' + J);
            var d = new mxXmlRequest(D, null, 'HEAD');
            this.executeRequest(d, mxUtils.bind(this, function() {
              200 == d.getStatus() ? c(e, y) : k({
                message: mxResources.get('fileNotFound')
              });
            }), mxUtils.bind(this, function() {
              404 == d.getStatus() ? (y--, E()) : k({
                message: mxResources.get('fileNotFound')
              });
            }));
          }
        });
      E();
    }
  };
  GitLabClient.prototype.getFile = function(e, f, c, k, m, t) {
    k = null != k ? k : !1;
    this.getRefIndex(e.split('/'), !1, mxUtils.bind(this, function(y, E) {
      var z = Math.max(E - 1, 0),
        D = y.slice(0, z).join('/'),
        J = y[z],
        G = y[E];
      e = y.slice(E + 1, y.length).join('/');
      y = /\.png$/i.test(e);
      if (!m && (/\.v(dx|sdx?)$/i.test(e) || /\.gliffy$/i.test(e) || /\.pdf$/i.test(e) || !this.ui.useCanvasForExport && y))
        if (null != b) {
          z = '&t=' + new Date().getTime();
          var d = this.baseUrl + '/projects/' + encodeURIComponent(D + '/' + J) + '/repository/files/' + encodeURIComponent(e) + '?ref=' + G;
          y = e.split('/');
          this.ui.convertFile(d + z, 0 < y.length ? y[y.length - 1] : e, null, this.extension, f, c, mxUtils.bind(this, function(g, n, v) {
            g = new mxXmlRequest(g, null, 'GET');
            this.executeRequest(g, mxUtils.bind(this, function(u) {
              try {
                n(this.getFileContent(JSON.parse(u.getText())));
              } catch (x) {
                v(x);
              }
            }), v);
          }));
        } else
          c({
            message: mxResources.get('accessDenied')
          });
      else
        z = '&t=' + new Date().getTime(), d = this.baseUrl + '/projects/' + encodeURIComponent(D + '/' + J) + '/repository/files/' + encodeURIComponent(e) + '?ref=' + G, y = new mxXmlRequest(d + z, null, 'GET'), this.executeRequest(y, mxUtils.bind(this, function(g) {
          try {
            f(this.createGitLabFile(D, J, G, JSON.parse(g.getText()), k, E));
          } catch (n) {
            c(n);
          }
        }), c);
    }), c, t);
  };
  GitLabClient.prototype.getFileContent = function(e) {
    var f = e.file_name,
      c = e.content;
    'base64' === e.encoding && (/\.jpe?g$/i.test(f) ? c = 'data:image/jpeg;base64,' + c : /\.gif$/i.test(f) ? c = 'data:image/gif;base64,' + c : /\.pdf$/i.test(f) ? c = 'data:application/pdf;base64,' + c : /\.png$/i.test(f) ? (e = this.ui.extractGraphModelFromPng(c), c = null != e && 0 < e.length ? e : 'data:image/png;base64,' + c) : c = Base64.decode(c));
    return c;
  };
  GitLabClient.prototype.createGitLabFile = function(e, f, c, k, m, t) {
    var y = DRAWIO_GITLAB_URL + '/';
    e = {
      org: e,
      repo: f,
      ref: c,
      name: k.file_name,
      path: k.file_path,
      html_url: y + e + '/' + f + '/blob/' + c + '/' + k.file_path,
      download_url: y + e + '/' + f + '/raw/' + c + '/' + k.file_path + '?inline=false',
      last_commit_id: k.last_commit_id,
      refPos: t
    };
    k = this.getFileContent(k);
    return m ? new GitLabLibrary(this.ui, k, e) : new GitLabFile(this.ui, k, e);
  };
  GitLabClient.prototype.insertFile = function(e, f, c, k, m, t, y) {
    m = null != m ? m : !1;
    t = t.split('/');
    this.getRefIndex(t, !0, mxUtils.bind(this, function(E, z) {
      var D = Math.max(z - 1, 0),
        J = E.slice(0, D).join('/'),
        G = E[D],
        d = E[z];
      path = E.slice(z + 1, E.length).join('/');
      0 < path.length && (path += '/');
      path += e;
      this.checkExists(J + '/' + G + '/' + d + '/' + path, !0, mxUtils.bind(this, function(g, n) {
        g ? m ? (y || (f = Base64.encode(f)), this.showCommitDialog(e, !0, mxUtils.bind(this, function(v) {
          this.writeFile(J, G, d, path, v, f, n, mxUtils.bind(this, function(u) {
            try {
              var x = JSON.parse(u.getText());
              c(this.createGitLabFile(J, G, d, null != x.content ? x.content : x, m, z));
            } catch (C) {
              k(C);
            }
          }), k);
        }), k)) : (g = DRAWIO_GITLAB_URL + '/', c(new GitLabFile(this.ui, f, {
          org: J,
          repo: G,
          ref: d,
          name: e,
          path: path,
          html_url: g + J + '/' + G + '/blob/' + d + '/' + path,
          download_url: g + J + '/' + G + '/raw/' + d + '/' + path + '?inline=false',
          refPos: z,
          last_commit_id: n,
          isNew: !0
        }))) : k();
      }));
    }), k, null, 4 >= t.length);
  };
  GitLabClient.prototype.checkExists = function(e, f, c) {
    this.getFile(e, mxUtils.bind(this, function(k) {
      if (f) {
        var m = this.ui.spinner.pause();
        this.ui.confirm(mxResources.get('replaceIt', [e]), function() {
          m();
          c(!0, k.getCurrentEtag());
        }, function() {
          m();
          c(!1);
        });
      } else
        this.ui.spinner.stop(), this.ui.showError(mxResources.get('error'), mxResources.get('fileExists'), mxResources.get('ok'), function() {
          c(!1);
        });
    }), mxUtils.bind(this, function(k) {
      c(!0);
    }), null, !0);
  };
  GitLabClient.prototype.writeFile = function(e, f, c, k, m, t, y, E, z) {
    if (t.length >= this.maxFileSize)
      z({
        message: mxResources.get('drawingTooLarge') + ' (' + this.ui.formatFileSize(t.length) + ' / 10 MB)'
      });
    else {
      var D = 'POST';
      c = {
        path: encodeURIComponent(k),
        branch: decodeURIComponent(c),
        commit_message: m,
        content: t,
        encoding: 'base64'
      };
      null != y && (c.last_commit_id = y, D = 'PUT');
      e = this.baseUrl + '/projects/' + encodeURIComponent(e + '/' + f) + '/repository/files/' + encodeURIComponent(k);
      D = new mxXmlRequest(e, JSON.stringify(c), D);
      this.executeRequest(D, mxUtils.bind(this, function(J) {
        E(J);
      }), z);
    }
  };
  GitLabClient.prototype.saveFile = function(e, f, c, k, m) {
    var t = e.meta.org,
      y = e.meta.repo,
      E = e.meta.ref,
      z = e.meta.path,
      D = mxUtils.bind(this, function(G, d) {
        this.writeFile(t, y, E, z, m, d, G, mxUtils.bind(this, function(g) {
          delete e.meta.isNew;
          this.getFile(t + '/' + y + '/' + E + '/' + z, mxUtils.bind(this, function(n) {
            n.getData() == e.getData() ? f(n.getCurrentEtag()) : f({
              content: e.getCurrentEtag()
            });
          }), c, null, null, e.meta.refPos);
        }), c);
      }),
      J = mxUtils.bind(this, function() {
        if (this.ui.useCanvasForExport && /(\.png)$/i.test(z)) {
          var G = this.ui.getPngFileProperties(this.ui.fileNode);
          this.ui.getEmbeddedPng(mxUtils.bind(this, function(d) {
            D(e.meta.last_commit_id, d);
          }), c, this.ui.getCurrentFile() != e ? e.getData() : null, G.scale, G.border);
        } else
          D(e.meta.last_commit_id, Base64.encode(e.getData()));
      });
    k ? this.getFile(t + '/' + y + '/' + E + '/' + z, mxUtils.bind(this, function(G) {
      e.meta.last_commit_id = G.meta.last_commit_id;
      J();
    }), c) : J();
  };
  GitLabClient.prototype.pickFolder = function(e) {
    this.showGitLabDialog(!1, e);
  };
  GitLabClient.prototype.pickFile = function(e) {
    e = null != e ? e : mxUtils.bind(this, function(f) {
      this.ui.loadFile('A' + encodeURIComponent(f));
    });
    this.showGitLabDialog(!0, e);
  };
  GitLabClient.prototype.showGitLabDialog = function(e, f) {
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
    }));
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
        }));
      }),
      n = null,
      v = null,
      u = mxUtils.bind(this, function(F) {
        null == F && (z.innerText = '', F = 1);
        var L = new mxXmlRequest(this.baseUrl + '/projects/' + encodeURIComponent(c + '/' + k) + '/repository/tree?path=' + t + '&ref=' + m + '&per_page=100&page=' + F, null, 'GET');
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
          1 == F && (d(!m), z.appendChild(G('../ [Up]', mxUtils.bind(this, function() {
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
                mxUtils.bind(this, function(Q) {
                  if (M == ('tree' == Q.type)) {
                    var P = D.cloneNode();
                    P.style.backgroundColor = H ? Editor.isDarkMode() ? '#000000' : '#eeeeee' : '';
                    H = !H;
                    var O = document.createElement('img');
                    O.src = IMAGE_PATH + '/' + ('tree' == Q.type ? 'folder.png' : 'file.png');
                    O.setAttribute('align', 'absmiddle');
                    O.style.marginRight = '4px';
                    O.style.marginTop = '-4px';
                    O.width = 20;
                    P.appendChild(O);
                    P.appendChild(G(Q.name + ('tree' == Q.type ? '/' : ''), mxUtils.bind(this, function() {
                      'tree' == Q.type ? (t = Q.path, u()) : e && 'blob' == Q.type && (this.ui.hideDialog(), f(c + '/' + k + '/' + m + '/' + Q.path));
                    })));
                    z.appendChild(P);
                    K++;
                  }
                })(A[I]);
            });
            q(!0);
            e && q(!1);
            100 == K && (z.appendChild(n), v = function() {
              z.scrollTop >= z.scrollHeight - z.offsetHeight && l();
            }, mxEvent.addListener(z, 'scroll', v));
          }
        }), g, !0);
      }),
      x = mxUtils.bind(this, function(F, L) {
        null == F && (z.innerText = '', F = 1);
        var l = new mxXmlRequest(this.baseUrl + '/projects/' + encodeURIComponent(c + '/' + k) + '/repository/branches?per_page=100&page=' + F, null, 'GET');
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
                  m = encodeURIComponent(K.name);
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
      });
    J.okButton.setAttribute('disabled', 'disabled');
    this.ui.spinner.spin(z, mxResources.get('loading'));
    var C = mxUtils.bind(this, function(F) {
      var L = this.ui.spinner,
        l = 0;
      this.ui.spinner.stop();
      var q = function() {
          L.spin(z, mxResources.get('loading'));
          l += 1;
        },
        A = function() {
          --l;
          0 === l && L.stop();
        };
      null == F && (z.innerText = '', F = 1);
      null != v && (mxEvent.removeListener(z, 'scroll', v), v = null);
      null != n && null != n.parentNode && n.parentNode.removeChild(n);
      n = document.createElement('a');
      n.style.display = 'block';
      n.style.cursor = 'pointer';
      mxUtils.write(n, mxResources.get('more') + '...');
      var H = mxUtils.bind(this, function() {
        0 === l && C(F + 1);
      });
      mxEvent.addListener(n, 'click', H);
      var K = mxUtils.bind(this, function(I) {
          q();
          var Q = new mxXmlRequest(this.baseUrl + '/groups?per_page=100', null, 'GET');
          this.executeRequest(Q, mxUtils.bind(this, function(P) {
            I(JSON.parse(P.getText()));
            A();
          }), g);
        }),
        M = mxUtils.bind(this, function(I, Q) {
          q();
          var P = new mxXmlRequest(this.baseUrl + '/groups/' + I.id + '/projects?per_page=100', null, 'GET');
          this.executeRequest(P, mxUtils.bind(this, function(O) {
            Q(I, JSON.parse(O.getText()));
            A();
          }), g);
        });
      K(mxUtils.bind(this, function(I) {
        if (null == this.user)
          mxUtils.write(z, mxResources.get('loggedOut'));
        else {
          q();
          var Q = new mxXmlRequest(this.baseUrl + '/users/' + this.user.id + '/projects?per_page=100&page=' + F, null, 'GET');
          this.executeRequest(Q, mxUtils.bind(this, function(P) {
            P = JSON.parse(P.getText());
            if (null != P && 0 != P.length || null != I && 0 != I.length) {
              1 == F && (z.appendChild(G(mxResources.get('enterValue') + '...', mxUtils.bind(this, function() {
                if (0 === l) {
                  var p = new FilenameDialog(this.ui, 'org/repo/ref', mxResources.get('ok'), mxUtils.bind(this, function(B) {
                    null != B && (B = B.split('/'), 1 < B.length ? (c = B[0], k = B[1], m = t = null, 2 < B.length ? (m = encodeURIComponent(B.slice(2, B.length).join('/')), u()) : x(null, !0)) : (this.ui.spinner.stop(), this.ui.handleError({
                      message: mxResources.get('invalidName')
                    })));
                  }), mxResources.get('enterValue'));
                  this.ui.showDialog(p.container, 300, 80, !0, !1);
                  p.init();
                }
              }))), mxUtils.br(z), mxUtils.br(z));
              for (var O = !0, W = 0; W < P.length; W++)
                mxUtils.bind(this, function(p) {
                  var B = D.cloneNode();
                  B.style.backgroundColor = O ? Editor.isDarkMode() ? '#000000' : '#eeeeee' : '';
                  O = !O;
                  B.appendChild(G(p.name_with_namespace, mxUtils.bind(this, function() {
                    0 === l && (c = p.owner.username, k = p.path, t = '', x(null, !0));
                  })));
                  z.appendChild(B);
                })(P[W]);
              for (W = 0; W < I.length; W++)
                q(), M(I[W], mxUtils.bind(this, function(p, B) {
                  A();
                  for (var N = 0; N < B.length; N++) {
                    var S = D.cloneNode();
                    S.style.backgroundColor = O ? Editor.isDarkMode() ? '#000000' : '#eeeeee' : '';
                    O = !O;
                    mxUtils.bind(this, function(R) {
                      S.appendChild(G(R.name_with_namespace, mxUtils.bind(this, function() {
                        0 === l && (c = p.full_path, k = R.path, t = '', x(null, !0));
                      })));
                      z.appendChild(S);
                    })(B[N]);
                  }
                }));
              A();
            } else
              A(), mxUtils.write(z, mxResources.get('noFiles'));
            100 == P.length && (z.appendChild(n), v = function() {
              z.scrollTop >= z.scrollHeight - z.offsetHeight && H();
            }, mxEvent.addListener(z, 'scroll', v));
          }), g);
        }
      }));
    });
    b ? this.user ? C() : this.updateUser(function() {
      C();
    }, g, !0) : this.authenticate(mxUtils.bind(this, function() {
      this.updateUser(function() {
        C();
      }, g, !0);
    }), g);
  };
  GitLabClient.prototype.logout = function() {
    this.ui.editor.loadUrl(this.redirectUri + '?doLogout=1&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.hostname));
    this.clearPersistentToken();
    this.setUser(null);
    b = null;
    this.setToken(null);
  };
}());