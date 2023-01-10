TrelloClient = function(b) {
  DrawioClient.call(this, b, 'tauth');
  Trello.setKey(this.key);
};
mxUtils.extend(TrelloClient, DrawioClient);
TrelloClient.prototype.key = 'e89d109082298ce91f6576f82f458551';
TrelloClient.prototype.baseUrl = 'https://api.trello.com/1/';
TrelloClient.prototype.SEPARATOR = '|$|';
TrelloClient.prototype.maxFileSize = 10000000;
TrelloClient.prototype.extension = '.xml';
TrelloClient.prototype.authenticate = function(b, e, f) {
  f && this.logout();
  f = mxUtils.bind(this, function(c, k) {
    Trello.authorize({
      type: 'popup',
      name: 'draw.io',
      scope: {
        read: 'true',
        write: 'true'
      },
      expiration: c ? 'never' : '1hour',
      success: function() {
        null != k && k();
        b();
      },
      error: function() {
        null != k && k();
        null != e && e(mxResources.get('loggedOut'));
      }
    });
  });
  this.isAuthorized() ? f(!0) : this.ui.showAuthDialog(this, !0, f);
};
TrelloClient.prototype.getLibrary = function(b, e, f) {
  this.getFile(b, e, f, !1, !0);
};
TrelloClient.prototype.getFile = function(b, e, f, c, k) {
  k = null != k ? k : !1;
  var m = mxUtils.bind(this, function() {
    var t = b.split(this.SEPARATOR),
      y = !0,
      E = window.setTimeout(mxUtils.bind(this, function() {
        y = !1;
        f({
          code: App.ERROR_TIMEOUT,
          retry: m
        });
      }), this.ui.timeout);
    Trello.cards.get(t[0] + '/attachments/' + t[1], mxUtils.bind(this, function(z) {
      window.clearTimeout(E);
      if (y) {
        var D = /\.png$/i.test(z.name),
          J = {
            Authorization: 'OAuth oauth_consumer_key="' + Trello.key() + '", oauth_token="' + Trello.token() + '"'
          };
        /\.v(dx|sdx?)$/i.test(z.name) || /\.gliffy$/i.test(z.name) || !this.ui.useCanvasForExport && D ? this.ui.convertFile(PROXY_URL + '?url=' + encodeURIComponent(z.url), z.name, z.mimeType, this.extension, e, f, null, J) : (y = !0, E = window.setTimeout(mxUtils.bind(this, function() {
          y = !1;
          f({
            code: App.ERROR_TIMEOUT
          });
        }), this.ui.timeout), this.ui.editor.loadUrl(PROXY_URL + '?url=' + encodeURIComponent(z.url), mxUtils.bind(this, function(G) {
          window.clearTimeout(E);
          if (y) {
            z.compoundId = b;
            if (0 < (D ? G.lastIndexOf(',') : -1)) {
              var d = this.ui.extractGraphModelFromPng(G);
              null != d && 0 < d.length && (G = d);
            }
            k ? e(new TrelloLibrary(this.ui, G, z)) : e(new TrelloFile(this.ui, G, z));
          }
        }), mxUtils.bind(this, function(G, d) {
          window.clearTimeout(E);
          y && (401 == d.status ? this.authenticate(m, f, !0) : f());
        }), D || null != z.mimeType && 'image/' == z.mimeType.substring(0, 6), null, null, null, J));
      }
    }), mxUtils.bind(this, function(z) {
      window.clearTimeout(E);
      y && (null != z && 401 == z.status ? this.authenticate(m, f, !0) : f());
    }));
  });
  this.authenticate(m, f);
};
TrelloClient.prototype.insertLibrary = function(b, e, f, c, k) {
  this.insertFile(b, e, f, c, !0, k);
};
TrelloClient.prototype.insertFile = function(b, e, f, c, k, m) {
  k = null != k ? k : !1;
  var t = mxUtils.bind(this, function() {
    var y = mxUtils.bind(this, function(E) {
      this.writeFile(b, E, m, mxUtils.bind(this, function(z) {
        k ? f(new TrelloLibrary(this.ui, e, z)) : f(new TrelloFile(this.ui, e, z));
      }), c);
    });
    this.ui.useCanvasForExport && /(\.png)$/i.test(b) ? this.ui.getEmbeddedPng(mxUtils.bind(this, function(E) {
      y(this.ui.base64ToBlob(E, 'image/png'));
    }), c, e) : y(e);
  });
  this.authenticate(t, c);
};
TrelloClient.prototype.saveFile = function(b, e, f) {
  var c = b.meta.compoundId.split(this.SEPARATOR),
    k = mxUtils.bind(this, function(t) {
      this.writeFile(b.meta.name, t, c[0], function(y) {
        Trello.del('cards/' + c[0] + '/attachments/' + c[1], mxUtils.bind(this, function() {
          e(y);
        }), mxUtils.bind(this, function(E) {
          null != E && 401 == E.status ? this.authenticate(m, f, !0) : f();
        }));
      }, f);
    }),
    m = mxUtils.bind(this, function() {
      this.ui.useCanvasForExport && /(\.png)$/i.test(b.meta.name) ? this.ui.getEmbeddedPng(mxUtils.bind(this, function(t) {
        k(this.ui.base64ToBlob(t, 'image/png'));
      }), f, this.ui.getCurrentFile() != b ? b.getData() : null) : k(b.getData());
    });
  this.authenticate(m, f);
};
TrelloClient.prototype.writeFile = function(b, e, f, c, k) {
  if (null != b && null != e)
    if (e.length >= this.maxFileSize)
      k({
        message: mxResources.get('drawingTooLarge') + ' (' + this.ui.formatFileSize(e.length) + ' / 10 MB)'
      });
    else {
      var m = mxUtils.bind(this, function() {
        var t = !0,
          y = window.setTimeout(mxUtils.bind(this, function() {
            t = !1;
            k({
              code: App.ERROR_TIMEOUT,
              retry: m
            });
          }), this.ui.timeout),
          E = new FormData();
        E.append('key', Trello.key());
        E.append('token', Trello.token());
        E.append('file', 'string' === typeof e ? new Blob([e]) : e, b);
        E.append('name', b);
        var z = new XMLHttpRequest();
        z.responseType = 'json';
        z.onreadystatechange = mxUtils.bind(this, function() {
          if (4 === z.readyState && (window.clearTimeout(y), t))
            if (200 == z.status) {
              var D = z.response;
              D.compoundId = f + this.SEPARATOR + D.id;
              c(D);
            } else
              401 == z.status ? this.authenticate(m, k, !0) : k();
        });
        z.open('POST', this.baseUrl + 'cards/' + f + '/attachments');
        z.send(E);
      });
      this.authenticate(m, k);
    }
  else
    k({
      message: mxResources.get('unknownError')
    });
};
TrelloClient.prototype.pickLibrary = function(b) {
  this.pickFile(b);
};
TrelloClient.prototype.pickFolder = function(b) {
  this.authenticate(mxUtils.bind(this, function() {
    this.showTrelloDialog(!1, b);
  }), mxUtils.bind(this, function(e) {
    this.ui.showError(mxResources.get('error'), e);
  }));
};
TrelloClient.prototype.pickFile = function(b, e) {
  b = null != b ? b : mxUtils.bind(this, function(f) {
    this.ui.loadFile('T' + encodeURIComponent(f));
  });
  this.authenticate(mxUtils.bind(this, function() {
    this.showTrelloDialog(!0, b);
  }), mxUtils.bind(this, function(f) {
    this.ui.showError(mxResources.get('error'), f, mxResources.get('ok'));
  }));
};
TrelloClient.prototype.showTrelloDialog = function(b, e) {
  var f = null,
    c = '@me',
    k = 0,
    m = document.createElement('div');
  m.style.whiteSpace = 'nowrap';
  m.style.overflow = 'hidden';
  m.style.height = '224px';
  var t = document.createElement('h3');
  mxUtils.write(t, b ? mxResources.get('selectFile') : mxResources.get('selectCard'));
  t.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
  m.appendChild(t);
  var y = document.createElement('div');
  y.style.whiteSpace = 'nowrap';
  y.style.overflow = 'auto';
  y.style.height = '194px';
  m.appendChild(y);
  m = new CustomDialog(this.ui, m);
  this.ui.showDialog(m.container, 340, 290, !0, !0);
  m.okButton.parentNode.removeChild(m.okButton);
  var E = mxUtils.bind(this, function(g, n, v) {
      k++;
      var u = document.createElement('div');
      u.style = 'width:100%;text-overflow:ellipsis;overflow:hidden;vertical-align:middle;padding:2px 0 2px 0;background:' + (0 == k % 2 ? Editor.isDarkMode() ? '#000' : '#eee' : Editor.isDarkMode() ? '' : '#fff');
      var x = document.createElement('a');
      x.style.cursor = 'pointer';
      if (null != v) {
        var C = document.createElement('img');
        C.src = v.url;
        C.width = v.width;
        C.height = v.height;
        C.style = 'border: 1px solid black;margin:5px;vertical-align:middle';
        x.appendChild(C);
      }
      mxUtils.write(x, g);
      mxEvent.addListener(x, 'click', n);
      u.appendChild(x);
      return u;
    }),
    z = mxUtils.bind(this, function(g) {
      this.ui.handleError(g, null, mxUtils.bind(this, function() {
        this.ui.spinner.stop();
        this.ui.hideDialog();
      }));
    }),
    D = mxUtils.bind(this, function() {
      k = 0;
      y.innerText = '';
      this.ui.spinner.spin(y, mxResources.get('loading'));
      var g = mxUtils.bind(this, function() {
        Trello.cards.get(f + '/attachments', {
          fields: 'id,name,previews'
        }, mxUtils.bind(this, function(n) {
          this.ui.spinner.stop();
          y.appendChild(E('../ [Up]', mxUtils.bind(this, function() {
            d();
          })));
          mxUtils.br(y);
          null == n || 0 == n.length ? mxUtils.write(y, mxResources.get('noFiles')) : mxUtils.bind(this, function() {
            for (var v = 0; v < n.length; v++)
              mxUtils.bind(this, function(u) {
                y.appendChild(E(u.name, mxUtils.bind(this, function() {
                  this.ui.hideDialog();
                  e(f + this.SEPARATOR + u.id);
                }), null != u.previews ? u.previews[0] : null));
              })(n[v]);
          })();
        }), mxUtils.bind(this, function(n) {
          401 == n.status ? this.authenticate(g, z, !0) : null != z && z(n);
        }));
      });
      g();
    }),
    J = null,
    G = null,
    d = mxUtils.bind(this, function(g) {
      null == g && (k = 0, y.innerText = '', g = 1);
      this.ui.spinner.spin(y, mxResources.get('loading'));
      null != J && null != J.parentNode && J.parentNode.removeChild(J);
      J = document.createElement('a');
      J.style.display = 'block';
      J.style.cursor = 'pointer';
      mxUtils.write(J, mxResources.get('more') + '...');
      var n = mxUtils.bind(this, function() {
        mxEvent.removeListener(y, 'scroll', G);
        d(g + 1);
      });
      mxEvent.addListener(J, 'click', n);
      var v = mxUtils.bind(this, function() {
        Trello.get('search', {
          query: '' == mxUtils.trim(c) ? 'is:open' : c,
          cards_limit: 100,
          cards_page: g - 1
        }, mxUtils.bind(this, function(u) {
          this.ui.spinner.stop();
          u = null != u ? u.cards : null;
          if (null == u || 0 == u.length)
            mxUtils.write(y, mxResources.get('noFiles'));
          else {
            1 == g && (y.appendChild(E(mxResources.get('filterCards') + '...', mxUtils.bind(this, function() {
              var C = new FilenameDialog(this.ui, c, mxResources.get('ok'), mxUtils.bind(this, function(F) {
                null != F && (c = F, d());
              }), mxResources.get('filterCards'), null, null, 'http://help.trello.com/article/808-searching-for-cards-all-boards');
              this.ui.showDialog(C.container, 300, 80, !0, !1);
              C.init();
            }))), mxUtils.br(y));
            for (var x = 0; x < u.length; x++)
              mxUtils.bind(this, function(C) {
                y.appendChild(E(C.name, mxUtils.bind(this, function() {
                  b ? (f = C.id, D()) : (this.ui.hideDialog(), e(C.id));
                })));
              })(u[x]);
            100 == u.length && (y.appendChild(J), G = function() {
              y.scrollTop >= y.scrollHeight - y.offsetHeight && n();
            }, mxEvent.addListener(y, 'scroll', G));
          }
        }), mxUtils.bind(this, function(u) {
          401 == u.status ? this.authenticate(v, z, !0) : null != z && z({
            message: u.responseText
          });
        }));
      });
      v();
    });
  d();
};
TrelloClient.prototype.isAuthorized = function() {
  try {
    return null != localStorage.trello_token;
  } catch (b) {}
  return !1;
};
TrelloClient.prototype.logout = function() {
  localStorage.removeItem('trello_token');
  Trello.deauthorize();
};