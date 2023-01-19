var RevisionDialog = function(b, e, f) {
  var c = document.createElement('div'),
    k = document.createElement('h3');
  k.style.marginTop = '0px';
  mxUtils.write(k, mxResources.get('revisionHistory'));
  c.appendChild(k);
  k = document.createElement('div');
  k.style.position = 'absolute';
  k.style.overflow = 'auto';
  k.style.width = '170px';
  k.style.height = '378px';
  c.appendChild(k);
  var m = document.createElement('div');
  m.style.position = 'absolute';
  m.style.border = '1px solid lightGray';
  m.style.left = '200px';
  m.style.width = '470px';
  m.style.height = '376px';
  m.style.overflow = 'hidden';
  var t = document.createElement('div');
  t.style.cssText = 'position:absolute;left:0;right:0;top:0;bottom:20px;text-align:center;transform:translate(0,50%);pointer-events:none;';
  m.appendChild(t);
  mxEvent.disableContextMenu(m);
  c.appendChild(m);
  var y = new Graph(m);
  y.setTooltips(!1);
  y.setEnabled(!1);
  y.setPanning(!0);
  y.panningHandler.ignoreCell = !0;
  y.panningHandler.useLeftButtonForPanning = !0;
  y.minFitScale = null;
  y.maxFitScale = null;
  y.centerZoom = !0;
  var E = 0,
    z = null,
    D = 0,
    J = y.getGlobalVariable;
  y.getGlobalVariable = function(U) {
    return 'page' == U && null != z && null != z[D] ? z[D].getAttribute('name') : 'pagenumber' == U ? D + 1 : 'pagecount' == U ? null != z ? z.length : 1 : J.apply(this, arguments);
  };
  y.getLinkForCell = function() {
    return null;
  };
  Editor.MathJaxRender && y.model.addListener(mxEvent.CHANGE, mxUtils.bind(this, function(U, X) {
    b.editor.graph.mathEnabled && Editor.MathJaxRender(y.container);
  }));
  var G = {
      lines: 11,
      length: 15,
      width: 6,
      radius: 10,
      corners: 1,
      rotate: 0,
      direction: 1,
      color: Editor.isDarkMode() ? '#c0c0c0' : '#000',
      speed: 1.4,
      trail: 60,
      shadow: !1,
      hwaccel: !1,
      className: 'spinner',
      zIndex: 2000000000,
      top: '50%',
      left: '50%'
    },
    d = new Spinner(G),
    g = b.getCurrentFile(),
    n = b.getXmlFileData(!0, !1, !0).getElementsByTagName('diagram'),
    v = {};
  for (G = 0; G < n.length; G++)
    v[n[G].getAttribute('id')] = n[G];
  var u = null,
    x = null,
    C = null,
    F = null,
    L = b.createToolbarButton(Editor.zoomInImage, mxResources.get('zoomIn'), function() {
      null != C && y.zoomIn();
    }, 20);
  L.setAttribute('disabled', 'disabled');
  var l = b.createToolbarButton(Editor.zoomOutImage, mxResources.get('zoomOut'), function() {
    null != C && y.zoomOut();
  }, 20);
  l.setAttribute('disabled', 'disabled');
  var q = b.createToolbarButton(Editor.zoomFitImage, mxResources.get('fit'), function() {
    null != C && (1 == y.view.scale ? (y.maxFitScale = 8, y.fit(8)) : y.zoomActual(), y.center());
  }, 20);
  q.setAttribute('disabled', 'disabled');
  var A = b.createToolbarButton(Editor.compareImage, mxResources.get('compare'), null, 20);
  A.setAttribute('disabled', 'disabled');
  var H = b.createToolbarButton(Editor.thinDataImage, mxResources.get('merge'), null, 20);
  H.setAttribute('disabled', 'disabled');
  var K = m.cloneNode(!1);
  K.style.pointerEvent = 'none';
  m.parentNode.appendChild(K);
  var M = new Graph(K);
  M.setTooltips(!1);
  M.setEnabled(!1);
  M.setPanning(!0);
  M.panningHandler.ignoreCell = !0;
  M.panningHandler.useLeftButtonForPanning = !0;
  M.minFitScale = null;
  M.maxFitScale = null;
  M.centerZoom = !0;
  var I = document.createElement('div');
  I.style.position = 'absolute';
  I.style.textAlign = 'left';
  I.style.color = 'gray';
  I.style.marginTop = '8px';
  I.style.backgroundColor = 'transparent';
  I.style.top = '440px';
  I.style.left = '32px';
  I.style.maxWidth = '380px';
  I.style.cursor = 'default';
  var Q = null;
  mxEvent.addGestureListeners(A, function(U) {
    U = null != z[E] ? v[z[E].getAttribute('id')] : null;
    mxUtils.setOpacity(A, 20);
    t.innerText = '';
    null == U ? mxUtils.write(t, mxResources.get('pageNotFound')) : (Q = I.innerHTML, I.innerHTML = mxResources.get('current'), m.style.display = 'none', K.style.display = '', K.style.backgroundColor = m.style.backgroundColor, U = Editor.parseDiagramNode(U), new mxCodec(U.ownerDocument).decode(U, M.getModel()), M.view.scaleAndTranslate(y.view.scale, y.view.translate.x, y.view.translate.y));
  }, null, function() {
    mxUtils.setOpacity(A, 60);
    t.innerText = '';
    'none' == m.style.display && (m.style.display = '', I.innerHTML = Q, K.style.display = 'none');
  });
  mxEvent.addListener(H, 'click', mxUtils.bind(this, function(U) {
    null != C && (U = b.getPagesForNode(C.documentElement), U = b.diffPages(b.pages, U), U = new TextareaDialog(b, mxResources.get('merge') + ':', JSON.stringify(U, null, 2), function(X) {
      try {
        if (0 < X.length && b.editor.graph.isEnabled()) {
          var Z = [JSON.parse(X)];
          b.confirm(mxResources.get('areYouSure'), function() {
            try {
              g.patch(Z, null, !0, !0), b.hideDialog(), b.hideDialog();
            } catch (Y) {
              b.handleError(Y);
            }
          });
        }
      } catch (Y) {
        b.handleError(Y);
      }
    }, null, null, null, null, null, !0, null, mxResources.get('merge')), b.showDialog(U.container, 620, 460, !0, !0), U.init());
  }));
  var P = mxUtils.button(mxResources.get('restore'), function(U) {
    null != C && null != F && b.confirm(mxResources.get('areYouSure'), function() {
      null != f ? f(F) : b.spinner.spin(document.body, mxResources.get('restoring')) && (P.setAttribute('disabled', 'disabled'), g.save(!0, function(X) {
        b.spinner.stop();
        P.removeAttribute('disabled');
        b.replaceFileData(F);
        b.hideDialog();
      }, function(X) {
        b.spinner.stop();
        P.removeAttribute('disabled');
        b.editor.setStatus('');
        b.handleError(X, null != X ? mxResources.get('errorSavingFile') : null);
      }));
    });
  });
  P.className = 'geBtn gePrimaryBtn';
  P.setAttribute('disabled', 'disabled');
  var O = document.createElement('select');
  O.setAttribute('disabled', 'disabled');
  O.style.userSelect = 'none';
  O.style.maxWidth = '100px';
  O.style.position = 'relative';
  O.style.top = '-2px';
  O.style.verticalAlign = 'bottom';
  O.style.marginLeft = '10px';
  O.style.display = 'none';
  var W = null;
  mxEvent.addListener(O, 'change', function(U) {
    null != W && (W(U), mxEvent.consume(U));
  });
  var p = mxUtils.button(mxResources.get('open'), function() {
    null != C && (window.openFile = new OpenFile(function() {
      window.openFile = null;
    }), window.openFile.setData(mxUtils.getXml(C.documentElement)), b.openLink(b.getUrl(), null, !0));
  });
  p.className = 'geBtn';
  p.setAttribute('disabled', 'disabled');
  null != f && (p.style.display = 'none');
  n = document.createElement('div');
  n.style.position = 'absolute';
  n.style.top = '482px';
  n.style.right = '28px';
  n.style.left = '32px';
  n.style.textAlign = 'right';
  var B = document.createElement('div');
  B.className = 'geToolbarContainer';
  B.style.backgroundColor = 'transparent';
  B.style.padding = '2px';
  B.style.border = 'none';
  B.style.top = '442px';
  B.style.right = '28px';
  var N = null;
  if (null != e && 0 < e.length) {
    m.style.cursor = 'move';
    var S = document.createElement('table');
    S.style.border = '1px solid lightGray';
    S.style.borderCollapse = 'collapse';
    S.style.borderSpacing = '0px';
    S.style.width = '100%';
    var R = document.createElement('tbody'),
      V = new Date().toDateString();
    null != b.currentPage && null != b.pages && (E = mxUtils.indexOf(b.pages, b.currentPage));
    for (G = e.length - 1; 0 <= G; G--) {
      var T = function(U) {
        var X = new Date(U.modifiedDate),
          Z = null;
        if (0 <= X.getTime()) {
          var Y = function(aa) {
            d.stop();
            t.innerText = '';
            var fa = mxUtils.parseXml(aa),
              da = b.editor.extractGraphModel(fa.documentElement, !0);
            if (null != da) {
              var ba = function(ia) {
                  null != ia && (ia = na(Editor.parseDiagramNode(ia)));
                  return ia;
                },
                na = function(ia) {
                  var qa = ia.getAttribute('background');
                  if (null == qa || '' == qa || qa == mxConstants.NONE)
                    qa = y.defaultPageBackgroundColor;
                  m.style.backgroundColor = qa;
                  new mxCodec(ia.ownerDocument).decode(ia, y.getModel());
                  y.maxFitScale = 1;
                  y.fit(8);
                  y.center();
                  return ia;
                };
              O.style.display = 'none';
              O.innerText = '';
              C = fa;
              F = aa;
              z = parseSelectFunction = null;
              D = 0;
              if ('mxfile' == da.nodeName) {
                fa = da.getElementsByTagName('diagram');
                z = [];
                for (aa = 0; aa < fa.length; aa++)
                  z.push(fa[aa]);
                D = Math.min(E, z.length - 1);
                0 < z.length && ba(z[D]);
                if (1 < z.length)
                  for (O.removeAttribute('disabled'), O.style.display = '', aa = 0; aa < z.length; aa++)
                    fa = document.createElement('option'), da = z[aa].getAttribute('name') || mxResources.get('pageWithNumber', [aa + 1]), mxUtils.write(fa, da), fa.setAttribute('title', da + ' (' + z[aa].getAttribute('id') + ')'), fa.setAttribute('value', aa), aa == D && fa.setAttribute('selected', 'selected'), O.appendChild(fa);
                W = function() {
                  try {
                    var ia = parseInt(O.value);
                    D = E = ia;
                    ba(z[ia]);
                  } catch (qa) {
                    O.value = E, b.handleError(qa);
                  }
                };
              } else
                na(da);
              aa = U.lastModifyingUserName;
              null != aa && 20 < aa.length && (aa = aa.substring(0, 20) + '...');
              I.innerText = '';
              mxUtils.write(I, (null != aa ? aa + ' ' : '') + X.toLocaleDateString() + ' ' + X.toLocaleTimeString());
              I.setAttribute('title', Z.getAttribute('title'));
              L.removeAttribute('disabled');
              l.removeAttribute('disabled');
              q.removeAttribute('disabled');
              A.removeAttribute('disabled');
              H.removeAttribute('disabled');
              null != g && g.isRestricted() || (b.editor.graph.isEnabled() && P.removeAttribute('disabled'), p.removeAttribute('disabled'));
              mxUtils.setOpacity(L, 60);
              mxUtils.setOpacity(l, 60);
              mxUtils.setOpacity(q, 60);
              mxUtils.setOpacity(A, 60);
              mxUtils.setOpacity(H, 60);
            } else
              O.style.display = 'none', O.innerText = '', I.innerText = '', t.innerText = '', mxUtils.write(I, mxResources.get('errorLoadingFile')), mxUtils.write(t, mxResources.get('errorLoadingFile'));
          };
          Z = document.createElement('tr');
          Z.style.borderBottom = '1px solid lightGray';
          Z.style.fontSize = '12px';
          Z.style.cursor = 'pointer';
          var ea = document.createElement('td');
          ea.style.padding = '6px';
          ea.style.whiteSpace = 'nowrap';
          U == e[e.length - 1] ? mxUtils.write(ea, mxResources.get('current')) : X.toDateString() === V ? mxUtils.write(ea, X.toLocaleTimeString()) : mxUtils.write(ea, X.toLocaleDateString() + ' ' + X.toLocaleTimeString());
          Z.appendChild(ea);
          Z.setAttribute('title', X.toLocaleDateString() + ' ' + X.toLocaleTimeString() + (null != U.fileSize ? ' ' + b.formatFileSize(parseInt(U.fileSize)) : '') + (null != U.lastModifyingUserName ? ' ' + U.lastModifyingUserName : ''));
          mxEvent.addListener(Z, 'click', function(aa) {
            x != U && (d.stop(), null != u && (u.style.backgroundColor = ''), x = U, u = Z, u.style.backgroundColor = Editor.isDarkMode() ? '#000000' : '#ebf2f9', F = C = null, I.removeAttribute('title'), I.innerText = mxResources.get('loading') + '...', m.style.backgroundColor = y.defaultPageBackgroundColor, t.innerText = '', y.getModel().clear(), P.setAttribute('disabled', 'disabled'), L.setAttribute('disabled', 'disabled'), l.setAttribute('disabled', 'disabled'), q.setAttribute('disabled', 'disabled'), A.setAttribute('disabled', 'disabled'), H.setAttribute('disabled', 'disabled'), p.setAttribute('disabled', 'disabled'), O.setAttribute('disabled', 'disabled'), mxUtils.setOpacity(L, 20), mxUtils.setOpacity(l, 20), mxUtils.setOpacity(q, 20), mxUtils.setOpacity(A, 20), mxUtils.setOpacity(H, 20), d.spin(m), U.getXml(function(fa) {
              if (x == U)
                try {
                  Y(fa);
                } catch (da) {
                  I.innerText = mxResources.get('error') + ': ' + da.message;
                }
            }, function(fa) {
              d.stop();
              O.style.display = 'none';
              O.innerText = '';
              I.innerText = '';
              mxUtils.write(I, mxResources.get('errorLoadingFile'));
              mxUtils.write(t, mxResources.get('errorLoadingFile'));
            }), mxEvent.consume(aa));
          });
          mxEvent.addListener(Z, 'dblclick', function(aa) {
            p.click();
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection && document.selection.empty();
            mxEvent.consume(aa);
          }, !1);
          R.appendChild(Z);
        }
        return Z;
      }(e[G]);
      null != T && G == e.length - 1 && (N = T);
    }
    S.appendChild(R);
    k.appendChild(S);
  } else
    null == g || null == b.drive && g.constructor == window.DriveFile || null == b.dropbox && g.constructor == window.DropboxFile ? (m.style.display = 'none', B.style.display = 'none', mxUtils.write(k, mxResources.get('notAvailable'))) : (m.style.display = 'none', B.style.display = 'none', mxUtils.write(k, mxResources.get('noRevisions')));
  this.init = function() {
    null != N && N.click();
  };
  k = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog();
  });
  k.className = 'geBtn';
  B.appendChild(A);
  B.appendChild(l);
  B.appendChild(q);
  B.appendChild(L);
  B.appendChild(O);
  B.appendChild(H);
  b.editor.cancelFirst && n.appendChild(k);
  n.appendChild(p);
  n.appendChild(P);
  b.editor.cancelFirst || n.appendChild(k);
  c.appendChild(n);
  c.appendChild(B);
  c.appendChild(I);
  this.container = c;
};