var LibraryDialog = function(b, e, f, c, k, m) {
  function t(q) {
    for (q = document.elementFromPoint(q.clientX, q.clientY); null != q && q.parentNode != d;)
      q = q.parentNode;
    var A = null;
    if (null != q) {
      var H = d.firstChild;
      for (A = 0; null != H && H != q;)
        H = H.nextSibling, A++;
    }
    return A;
  }

  function y(q, A, H, K, M, I, Q, P, O) {
    try {
      if (b.spinner.stop(), null == A || 'image/' == A.substring(0, 6))
        if (null == q && null != Q || null == n[q]) {
          var W = function() {
            U.innerText = '';
            U.style.cursor = 'pointer';
            U.style.whiteSpace = 'nowrap';
            U.style.textOverflow = 'ellipsis';
            mxUtils.write(U, null != X.title && 0 < X.title.length ? X.title : mxResources.get('untitled'));
            U.style.color = null == X.title || 0 == X.title.length ? '#d0d0d0' : '';
          };
          d.style.backgroundImage = '';
          g.style.display = 'none';
          var p = M,
            B = I;
          if (M > b.maxImageSize || I > b.maxImageSize) {
            var N = Math.min(1, Math.min(b.maxImageSize / Math.max(1, M)), b.maxImageSize / Math.max(1, I));
            M *= N;
            I *= N;
          }
          p > B ? (B = Math.round(100 * B / p), p = 100) : (p = Math.round(100 * p / B), B = 100);
          var S = document.createElement('div');
          S.setAttribute('draggable', 'true');
          S.style.display = 'inline-block';
          S.style.position = 'relative';
          S.style.padding = '0 12px';
          S.style.cursor = 'move';
          mxUtils.setPrefixedStyle(S.style, 'transition', 'transform .1s ease-in-out');
          if (null != q) {
            var R = document.createElement('img');
            R.setAttribute('src', C.convert(q));
            R.style.width = p + 'px';
            R.style.height = B + 'px';
            R.style.margin = '10px';
            R.style.paddingBottom = Math.floor((100 - B) / 2) + 'px';
            R.style.paddingLeft = Math.floor((100 - p) / 2) + 'px';
            S.appendChild(R);
          } else if (null != Q) {
            var V = b.stringToCells('<' == Q.xml.charAt(0) ? Q.xml : Graph.decompress(Q.xml));
            0 < V.length && (b.sidebar.createThumb(V, 100, 100, S, null, !0, !1), S.firstChild.style.display = 'inline-block', S.firstChild.style.cursor = '');
          }
          var T = document.createElement('img');
          T.setAttribute('src', Editor.closeBlackImage);
          T.setAttribute('border', '0');
          T.setAttribute('title', mxResources.get('delete'));
          T.setAttribute('align', 'top');
          T.style.paddingTop = '4px';
          T.style.position = 'absolute';
          T.style.marginLeft = '-12px';
          T.style.zIndex = '1';
          T.style.cursor = 'pointer';
          mxEvent.addListener(T, 'dragstart', function(aa) {
            mxEvent.consume(aa);
          });
          (function(aa, fa, da) {
            mxEvent.addListener(T, 'click', function(ba) {
              n[fa] = null;
              for (var na = 0; na < D.length; na++)
                if (null != D[na].data && D[na].data == fa || null != D[na].xml && null != da && D[na].xml == da.xml) {
                  D.splice(na, 1);
                  break;
                }
              S.parentNode.removeChild(aa);
              0 == D.length && (d.style.backgroundImage = 'url(\'' + IMAGE_PATH + '/droptarget.png\')', g.style.display = '');
              mxEvent.consume(ba);
            });
            mxEvent.addListener(T, 'dblclick', function(ba) {
              mxEvent.consume(ba);
            });
          }(S, q, Q));
          S.appendChild(T);
          S.style.marginBottom = '30px';
          var U = document.createElement('div');
          U.style.position = 'absolute';
          U.style.boxSizing = 'border-box';
          U.style.bottom = '-18px';
          U.style.left = '10px';
          U.style.right = '10px';
          U.style.backgroundColor = Editor.isDarkMode() ? Editor.darkColor : '#ffffff';
          U.style.overflow = 'hidden';
          U.style.textAlign = 'center';
          var X = null;
          null != q ? (X = {
            data: q,
            w: M,
            h: I,
            title: O
          }, null != P && (X.aspect = P), n[q] = R, D.push(X)) : null != Q && (Q.aspect = 'fixed', D.push(Q), X = Q);
          mxEvent.addListener(U, 'keydown', function(aa) {
            13 == aa.keyCode && null != x && (x(), x = null, mxEvent.consume(aa));
          });
          W();
          S.appendChild(U);
          mxEvent.addListener(U, 'mousedown', function(aa) {
            'true' != U.getAttribute('contentEditable') && mxEvent.consume(aa);
          });
          V = function(aa) {
            if (mxClient.IS_IOS || mxClient.IS_FF || !(null == document.documentMode || 9 < document.documentMode)) {
              var fa = new FilenameDialog(b, X.title || '', mxResources.get('ok'), function(da) {
                null != da && (X.title = da, W());
              }, mxResources.get('enterValue'));
              b.showDialog(fa.container, 300, 80, !0, !0);
              fa.init();
              mxEvent.consume(aa);
            } else if ('true' != U.getAttribute('contentEditable')) {
              null != x && (x(), x = null);
              if (null == X.title || 0 == X.title.length)
                U.innerText = '';
              U.style.textOverflow = '';
              U.style.whiteSpace = '';
              U.style.cursor = 'text';
              U.style.color = '';
              U.setAttribute('contentEditable', 'true');
              mxUtils.setPrefixedStyle(U.style, 'user-select', 'text');
              U.focus();
              document.execCommand('selectAll', !1, null);
              x = function() {
                U.removeAttribute('contentEditable');
                U.style.cursor = 'pointer';
                X.title = U.innerHTML;
                W();
              };
              mxEvent.consume(aa);
            }
          };
          mxEvent.addListener(U, 'click', V);
          mxEvent.addListener(S, 'dblclick', V);
          d.appendChild(S);
          mxEvent.addListener(S, 'dragstart', function(aa) {
            null == q && null != Q && (T.style.visibility = 'hidden', U.style.visibility = 'hidden');
            mxClient.IS_FF && null != Q.xml && aa.dataTransfer.setData('Text', Q.xml);
            v = t(aa);
            mxClient.IS_GC && (S.style.opacity = '0.9');
            window.setTimeout(function() {
              mxUtils.setPrefixedStyle(S.style, 'transform', 'scale(0.5,0.5)');
              mxUtils.setOpacity(S, 30);
              T.style.visibility = '';
              U.style.visibility = '';
            }, 0);
          });
          mxEvent.addListener(S, 'dragend', function(aa) {
            'hidden' == T.style.visibility && (T.style.visibility = '', U.style.visibility = '');
            v = null;
            mxUtils.setOpacity(S, 100);
            mxUtils.setPrefixedStyle(S.style, 'transform', null);
          });
        } else
          F || (F = !0, b.handleError({
            message: mxResources.get('fileExists')
          }));
      else {
        M = !1;
        try {
          if (p = mxUtils.parseXml(q), 'mxlibrary' == p.documentElement.nodeName) {
            B = JSON.parse(mxUtils.getTextContent(p.documentElement));
            if (null != B && 0 < B.length)
              for (var Z = 0; Z < B.length; Z++)
                null != B[Z].xml ? y(null, null, 0, 0, 0, 0, B[Z]) : y(B[Z].data, null, 0, 0, B[Z].w, B[Z].h, null, 'fixed', B[Z].title);
            M = !0;
          } else if ('mxfile' == p.documentElement.nodeName) {
            var Y = p.documentElement.getElementsByTagName('diagram');
            for (Z = 0; Z < Y.length; Z++) {
              B = mxUtils.getTextContent(Y[Z]);
              V = b.stringToCells(Graph.decompress(B));
              var ea = b.editor.graph.getBoundingBoxFromGeometry(V);
              y(null, null, 0, 0, 0, 0, {
                xml: B,
                w: ea.width,
                h: ea.height
              });
            }
            M = !0;
          }
        } catch (aa) {}
        M || (b.spinner.stop(), b.handleError({
          message: mxResources.get('errorLoadingFile')
        }));
      }
    } catch (aa) {}
    return null;
  }

  function E(q) {
    q.dataTransfer.dropEffect = null != v ? 'move' : 'copy';
    q.stopPropagation();
    q.preventDefault();
  }

  function z(q) {
    q.stopPropagation();
    q.preventDefault();
    F = !1;
    u = t(q);
    if (null != v)
      null != u && u < d.children.length ? (D.splice(u > v ? u - 1 : u, 0, D.splice(v, 1)[0]), d.insertBefore(d.children[v], d.children[u])) : (D.push(D.splice(v, 1)[0]), d.appendChild(d.children[v]));
    else if (0 < q.dataTransfer.files.length)
      b.importFiles(q.dataTransfer.files, 0, 0, b.maxImageSize, L(q));
    else if (0 <= mxUtils.indexOf(q.dataTransfer.types, 'text/uri-list')) {
      var A = decodeURIComponent(q.dataTransfer.getData('text/uri-list'));
      (/(\.jpg)($|\?)/i.test(A) || /(\.png)($|\?)/i.test(A) || /(\.gif)($|\?)/i.test(A) || /(\.svg)($|\?)/i.test(A)) && b.loadImage(A, function(H) {
        y(A, null, 0, 0, H.width, H.height);
        d.scrollTop = d.scrollHeight;
      });
    }
    q.stopPropagation();
    q.preventDefault();
  }
  var D = [];
  f = document.createElement('div');
  f.style.height = '100%';
  var J = document.createElement('div');
  J.style.whiteSpace = 'nowrap';
  J.style.height = '40px';
  f.appendChild(J);
  mxUtils.write(J, mxResources.get('filename') + ':');
  null == e && (e = b.defaultLibraryName + '.xml');
  var G = document.createElement('input');
  G.setAttribute('value', e);
  G.style.marginRight = '20px';
  G.style.marginLeft = '10px';
  G.style.width = '500px';
  null == k || k.isRenamable() || G.setAttribute('disabled', 'true');
  this.init = function() {
    if (null == k || k.isRenamable())
      G.focus(), mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? G.select() : document.execCommand('selectAll', !1, null);
  };
  J.appendChild(G);
  Editor.enableUncompressedLibraries && (G.style.width = '420px', e = document.createElement('input'), e.setAttribute('type', 'checkbox'), e.style.marginRight = '10px', J.appendChild(e), mxUtils.write(J, mxResources.get('compressed')));
  var d = document.createElement('div');
  d.style.borderWidth = '1px 0px 1px 0px';
  d.style.borderColor = '#d3d3d3';
  d.style.borderStyle = 'solid';
  d.style.marginTop = '6px';
  d.style.overflow = 'auto';
  d.style.height = '340px';
  d.style.backgroundPosition = 'center center';
  d.style.backgroundRepeat = 'no-repeat';
  0 == D.length && Graph.fileSupport && (d.style.backgroundImage = 'url(\'' + IMAGE_PATH + '/droptarget.png\')');
  var g = document.createElement('div');
  g.style.position = 'absolute';
  g.style.width = '640px';
  g.style.top = '260px';
  g.style.textAlign = 'center';
  g.style.fontSize = '22px';
  g.style.color = '#a0c3ff';
  mxUtils.write(g, mxResources.get('dragImagesHere'));
  f.appendChild(g);
  var n = {},
    v = null,
    u = null,
    x = null;
  J = function(q) {
    'true' != mxEvent.getSource(q).getAttribute('contentEditable') && null != x && (x(), x = null, mxEvent.consume(q));
  };
  mxEvent.addListener(d, 'mousedown', J);
  mxEvent.addListener(d, 'pointerdown', J);
  mxEvent.addListener(d, 'touchstart', J);
  var C = new mxUrlConverter(),
    F = !1;
  if (null != c)
    for (J = 0; J < c.length; J++)
      e = c[J], y(e.data, null, 0, 0, e.w, e.h, e, e.aspect, e.title);
  mxEvent.addListener(d, 'dragleave', function(q) {
    g.style.cursor = '';
    for (var A = mxEvent.getSource(q); null != A;) {
      if (A == d || A == g) {
        q.stopPropagation();
        q.preventDefault();
        break;
      }
      A = A.parentNode;
    }
  });
  var L = function(q) {
    return function(A, H, K, M, I, Q, P, O, W) {
      null != W && (/(\.v(dx|sdx?))($|\?)/i.test(W.name) || /(\.vs(x|sx?))($|\?)/i.test(W.name)) ? b.importVisio(W, mxUtils.bind(this, function(p) {
        y(p, H, K, M, I, Q, P, 'fixed', mxEvent.isAltDown(q) ? null : P.substring(0, P.lastIndexOf('.')).replace(/_/g, ' '));
      })) : null != W && new XMLHttpRequest().upload && b.isRemoteFileFormat(A, W.name) ? b.isExternalDataComms() ? b.parseFile(W, mxUtils.bind(this, function(p) {
        4 == p.readyState && (b.spinner.stop(), 200 <= p.status && 299 >= p.status && (y(p.responseText, H, K, M, I, Q, P, 'fixed', mxEvent.isAltDown(q) ? null : P.substring(0, P.lastIndexOf('.')).replace(/_/g, ' ')), d.scrollTop = d.scrollHeight));
      })) : (b.spinner.stop(), b.showError(mxResources.get('error'), mxResources.get('notInOffline'))) : (y(A, H, K, M, I, Q, P, 'fixed', mxEvent.isAltDown(q) ? null : P.substring(0, P.lastIndexOf('.')).replace(/_/g, ' ')), d.scrollTop = d.scrollHeight);
    };
  };
  mxEvent.addListener(d, 'dragover', E);
  mxEvent.addListener(d, 'drop', z);
  mxEvent.addListener(g, 'dragover', E);
  mxEvent.addListener(g, 'drop', z);
  f.appendChild(d);
  c = document.createElement('div');
  c.style.textAlign = 'right';
  c.style.marginTop = '20px';
  J = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog(!0);
  });
  J.setAttribute('id', 'btnCancel');
  J.className = 'geBtn';
  b.editor.cancelFirst && c.appendChild(J);
  'draw.io' != b.getServiceName() || null == k || k.constructor != DriveLibrary && k.constructor != GitHubLibrary || (e = mxUtils.button(mxResources.get('link'), function() {
    b.spinner.spin(document.body, mxResources.get('loading')) && k.getPublicUrl(function(q) {
      b.spinner.stop();
      if (null != q) {
        var A = b.getSearch('create title mode url drive splash state clibs ui'.split(' '));
        A += (0 == A.length ? '?' : '&') + 'splash=0&clibs=U' + encodeURIComponent(q);
        q = new EmbedDialog(b, window.location.protocol + '//' + window.location.host + '/' + A, null, null, null, null, 'Check out the library I made using @drawio');
        b.showDialog(q.container, 450, 240, !0);
        q.init();
      } else
        k.constructor == DriveLibrary ? b.showError(mxResources.get('error'), mxResources.get('diagramIsNotPublic'), mxResources.get('share'), mxUtils.bind(this, function() {
          b.drive.showPermissions(k.getId());
        }), null, mxResources.get('ok'), mxUtils.bind(this, function() {})) : b.handleError({
          message: mxResources.get('diagramIsNotPublic')
        });
    });
  }), e.className = 'geBtn', c.appendChild(e));
  e = mxUtils.button(mxResources.get('export'), function() {
    var q = b.createLibraryDataFromImages(D),
      A = G.value;
    /(\.xml)$/i.test(A) || (A += '.xml');
    b.isLocalFileSave() ? b.saveLocalFile(q, A, 'text/xml', null, null, !0, null, 'xml') : new mxXmlRequest(SAVE_URL, 'filename=' + encodeURIComponent(A) + '&format=xml&xml=' + encodeURIComponent(q)).simulate(document, '_blank');
  });
  e.setAttribute('id', 'btnDownload');
  e.className = 'geBtn';
  c.appendChild(e);
  if (Graph.fileSupport) {
    if (null == b.libDlgFileInputElt) {
      var l = document.createElement('input');
      l.setAttribute('multiple', 'multiple');
      l.setAttribute('type', 'file');
      mxEvent.addListener(l, 'change', function(q) {
        F = !1;
        b.importFiles(l.files, 0, 0, b.maxImageSize, function(A, H, K, M, I, Q, P, O, W) {
          null != l.files && (L(q)(A, H, K, M, I, Q, P, O, W), l.type = '', l.type = 'file', l.value = '');
        });
        d.scrollTop = d.scrollHeight;
      });
      l.style.display = 'none';
      document.body.appendChild(l);
      b.libDlgFileInputElt = l;
    }
    e = mxUtils.button(mxResources.get('import'), function() {
      null != x && (x(), x = null);
      b.libDlgFileInputElt.click();
    });
    e.setAttribute('id', 'btnAddImage');
    e.className = 'geBtn';
    c.appendChild(e);
  }
  e = mxUtils.button(mxResources.get('addImages'), function() {
    null != x && (x(), x = null);
    b.showImageDialog(mxResources.get('addImageUrl'), '', function(q, A, H) {
      F = !1;
      if (null != q) {
        if ('data:image/' == q.substring(0, 11)) {
          var K = q.indexOf(',');
          0 < K && (q = q.substring(0, K) + ';base64,' + q.substring(K + 1));
        }
        y(q, null, 0, 0, A, H);
        d.scrollTop = d.scrollHeight;
      }
    });
  });
  e.setAttribute('id', 'btnAddImageUrl');
  e.className = 'geBtn';
  c.appendChild(e);
  this.saveBtnClickHandler = function(q, A, H, K) {
    b.saveLibrary(q, A, H, K);
  };
  e = mxUtils.button(mxResources.get('save'), mxUtils.bind(this, function() {
    null != x && (x(), x = null);
    this.saveBtnClickHandler(G.value, D, k, m);
  }));
  e.setAttribute('id', 'btnSave');
  e.className = 'geBtn gePrimaryBtn';
  c.appendChild(e);
  b.editor.cancelFirst || c.appendChild(J);
  f.appendChild(c);
  this.container = f;
};