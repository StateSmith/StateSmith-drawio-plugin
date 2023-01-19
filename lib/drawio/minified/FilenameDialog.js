var FilenameDialog = function(a, b, f, e, g, d, h, n, u, m, p, x, A) {
  u = null != u ? u : !0;
  var C = document.createElement('table'),
    D = document.createElement('tbody');
  C.style.position = 'absolute';
  C.style.top = '30px';
  C.style.left = '20px';
  var G = document.createElement('tr');
  var F = document.createElement('td');
  F.style.textOverflow = 'ellipsis';
  F.style.textAlign = 'right';
  F.style.maxWidth = (A ? A + 15 : 100) + 'px';
  F.style.fontSize = '10pt';
  F.style.width = (A ? A : 84) + 'px';
  mxUtils.write(F, (g || mxResources.get('filename')) + ':');
  G.appendChild(F);
  var K = document.createElement('input');
  K.setAttribute('value', b || '');
  K.style.marginLeft = '4px';
  K.style.width = null != x ? x + 'px' : '180px';
  var P = mxUtils.button(f, function() {
    if (null == d || d(K.value))
      u && a.hideDialog(), e(K.value);
  });
  P.className = 'geBtn gePrimaryBtn';
  this.init = function() {
    if (null != g || null == h)
      if (K.focus(), mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? K.select() : document.execCommand('selectAll', !1, null), Graph.fileSupport) {
        var R = C.parentNode;
        if (null != R) {
          var Q = null;
          mxEvent.addListener(R, 'dragleave', function(ba) {
            null != Q && (Q.style.backgroundColor = '', Q = null);
            ba.stopPropagation();
            ba.preventDefault();
          });
          mxEvent.addListener(R, 'dragover', mxUtils.bind(this, function(ba) {
            null == Q && (!mxClient.IS_IE || 10 < document.documentMode) && (Q = K, Q.style.backgroundColor = '#ebf2f9');
            ba.stopPropagation();
            ba.preventDefault();
          }));
          mxEvent.addListener(R, 'drop', mxUtils.bind(this, function(ba) {
            null != Q && (Q.style.backgroundColor = '', Q = null);
            0 <= mxUtils.indexOf(ba.dataTransfer.types, 'text/uri-list') && (K.value = decodeURIComponent(ba.dataTransfer.getData('text/uri-list')), P.click());
            ba.stopPropagation();
            ba.preventDefault();
          }));
        }
      }
  };
  F = document.createElement('td');
  F.style.whiteSpace = 'nowrap';
  F.appendChild(K);
  G.appendChild(F);
  if (null != g || null == h)
    D.appendChild(G), null != p && (F.appendChild(FilenameDialog.createTypeHint(a, K, p)), null != a.editor.diagramFileTypes && (G = document.createElement('tr'), F = document.createElement('td'), F.style.textOverflow = 'ellipsis', F.style.textAlign = 'right', F.style.maxWidth = '100px', F.style.fontSize = '10pt', F.style.width = '84px', mxUtils.write(F, mxResources.get('type') + ':'), G.appendChild(F), F = document.createElement('td'), F.style.whiteSpace = 'nowrap', G.appendChild(F), b = FilenameDialog.createFileTypes(a, K, a.editor.diagramFileTypes), b.style.marginLeft = '4px', b.style.width = '198px', F.appendChild(b), K.style.width = null != x ? x - 40 + 'px' : '190px', G.appendChild(F), D.appendChild(G)));
  null != h && (G = document.createElement('tr'), F = document.createElement('td'), F.colSpan = 2, F.appendChild(h), G.appendChild(F), D.appendChild(G));
  G = document.createElement('tr');
  F = document.createElement('td');
  F.colSpan = 2;
  F.style.paddingTop = null != p ? '12px' : '20px';
  F.style.whiteSpace = 'nowrap';
  F.setAttribute('align', 'right');
  p = mxUtils.button(mxResources.get('cancel'), function() {
    a.hideDialog();
    null != m && m();
  });
  p.className = 'geBtn';
  a.editor.cancelFirst && F.appendChild(p);
  null != n && (x = mxUtils.button(mxResources.get('help'), function() {
    a.editor.graph.openLink(n);
  }), x.className = 'geBtn', F.appendChild(x));
  mxEvent.addListener(K, 'keypress', function(R) {
    13 == R.keyCode && P.click();
  });
  F.appendChild(P);
  a.editor.cancelFirst || F.appendChild(p);
  G.appendChild(F);
  D.appendChild(G);
  C.appendChild(D);
  this.container = C;
};
FilenameDialog.filenameHelpLink = null;
FilenameDialog.createTypeHint = function(a, b, f) {
  var e = document.createElement('img');
  e.style.backgroundPosition = 'center bottom';
  e.style.backgroundRepeat = 'no-repeat';
  e.style.margin = '2px 0 0 4px';
  e.style.verticalAlign = 'top';
  e.style.cursor = 'pointer';
  e.style.height = '16px';
  e.style.width = '16px';
  mxUtils.setOpacity(e, 70);
  var g = function() {
    e.setAttribute('src', Editor.helpImage);
    e.setAttribute('title', mxResources.get('help'));
    for (var d = 0; d < f.length; d++)
      if (0 < f[d].ext.length && b.value.toLowerCase().substring(b.value.length - f[d].ext.length - 1) == '.' + f[d].ext) {
        e.setAttribute('title', mxResources.get(f[d].title));
        break;
      }
  };
  mxEvent.addListener(b, 'keyup', g);
  mxEvent.addListener(b, 'change', g);
  mxEvent.addListener(e, 'click', function(d) {
    var h = e.getAttribute('title');
    e.getAttribute('src') == Editor.helpImage ? a.editor.graph.openLink(FilenameDialog.filenameHelpLink) : '' != h && a.showError(null, h, mxResources.get('help'), function() {
      a.editor.graph.openLink(FilenameDialog.filenameHelpLink);
    }, null, mxResources.get('ok'), null, null, null, 340, 90);
    mxEvent.consume(d);
  });
  g();
  return e;
};
FilenameDialog.createFileTypes = function(a, b, f) {
  var e = document.createElement('select');
  for (a = 0; a < f.length; a++) {
    var g = document.createElement('option');
    g.setAttribute('value', a);
    mxUtils.write(g, mxResources.get(f[a].description) + ' (.' + f[a].extension + ')');
    e.appendChild(g);
  }
  mxEvent.addListener(e, 'change', function(d) {
    d = f[e.value].extension;
    var h = b.value.lastIndexOf('.drawio.');
    h = 0 < h ? h : b.value.lastIndexOf('.');
    'drawio' != d && (d = 'drawio.' + d);
    b.value = 0 < h ? b.value.substring(0, h + 1) + d : b.value + '.' + d;
    'createEvent' in document ? (d = document.createEvent('HTMLEvents'), d.initEvent('change', !1, !0), b.dispatchEvent(d)) : b.fireEvent('onchange');
  });
  a = function(d) {
    d = b.value.toLowerCase();
    for (var h = 0, n = 0; n < f.length; n++) {
      var u = f[n].extension,
        m = null;
      'drawio' != u && (m = u, u = '.drawio.' + u);
      if (d.substring(d.length - u.length - 1) == '.' + u || null != m && d.substring(d.length - m.length - 1) == '.' + m) {
        h = n;
        break;
      }
    }
    e.value = h;
  };
  mxEvent.addListener(b, 'change', a);
  mxEvent.addListener(b, 'keyup', a);
  a();
  return e;
};