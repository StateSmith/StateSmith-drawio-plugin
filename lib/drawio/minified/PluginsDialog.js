var PluginsDialog = function(b, e, f, c) {
  function k() {
    E = !0;
    if (0 == y.length)
      t.innerText = mxResources.get('noPlugins');
    else {
      t.innerText = '';
      for (var g = 0; g < y.length; g++) {
        var n = document.createElement('span');
        n.style.whiteSpace = 'nowrap';
        var v = document.createElement('span');
        v.className = 'geSprite geSprite-delete';
        v.style.position = 'relative';
        v.style.cursor = 'pointer';
        v.style.top = '5px';
        v.style.marginRight = '4px';
        v.style.display = 'inline-block';
        n.appendChild(v);
        mxUtils.write(n, y[g]);
        t.appendChild(n);
        mxUtils.br(t);
        mxEvent.addListener(v, 'click', function(u) {
          return function() {
            b.confirm(mxResources.get('delete') + ' "' + y[u] + '"?', function() {
              null != f && f(y[u]);
              y.splice(u, 1);
              k();
            });
          };
        }(g));
      }
    }
  }
  var m = document.createElement('div'),
    t = document.createElement('div');
  t.style.height = '180px';
  t.style.overflow = 'auto';
  var y = mxSettings.getPlugins().slice(),
    E = !1;
  m.appendChild(t);
  k();
  E = !1;
  var z = mxUtils.button(mxResources.get('add'), null != e ? function() {
    e(function(g) {
      g && 0 > mxUtils.indexOf(y, g) && y.push(g);
      k();
    });
  } : function() {
    var g = document.createElement('div'),
      n = document.createElement('span');
    n.style.marginTop = '6px';
    mxUtils.write(n, mxResources.get('builtinPlugins') + ': ');
    g.appendChild(n);
    var v = document.createElement('select');
    v.style.width = '150px';
    for (n = 0; n < App.publicPlugin.length; n++) {
      var u = document.createElement('option');
      mxUtils.write(u, App.publicPlugin[n]);
      u.value = App.publicPlugin[n];
      v.appendChild(u);
    }
    g.appendChild(v);
    mxUtils.br(g);
    mxUtils.br(g);
    n = mxUtils.button(mxResources.get('custom') + '...', function() {
      var x = new FilenameDialog(b, '', mxResources.get('add'), function(C) {
        b.hideDialog();
        if (null != C && 0 < C.length) {
          C = C.split(';');
          for (var F = 0; F < C.length; F++) {
            var L = C[F],
              l = App.pluginRegistry[L];
            null != l && (L = l);
            0 < L.length && 0 > mxUtils.indexOf(y, L) && y.push(L);
          }
          k();
        }
      }, mxResources.get('enterValue') + ' (' + mxResources.get('url') + ')');
      b.showDialog(x.container, 300, 80, !0, !0);
      x.init();
    });
    n.className = 'geBtn';
    g = new CustomDialog(b, g, mxUtils.bind(this, function() {
      var x = App.pluginRegistry[v.value];
      0 > mxUtils.indexOf(y, x) && (y.push(x), k());
    }), null, null, null, n);
    b.showDialog(g.container, 360, 100, !0, !0);
  });
  z.className = 'geBtn';
  var D = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog();
  });
  D.className = 'geBtn';
  var J = mxUtils.button(c ? mxResources.get('close') : mxResources.get('apply'), function() {
    E ? (mxSettings.setPlugins(y), mxSettings.save(), b.hideDialog(), b.alert(mxResources.get('restartForChangeRequired'))) : b.hideDialog();
  });
  J.className = 'geBtn gePrimaryBtn';
  var G = document.createElement('div');
  G.style.marginTop = '14px';
  G.style.textAlign = 'right';
  var d = mxUtils.button(mxResources.get('help'), function() {
    b.openLink('https://www.diagrams.net/doc/faq/plugins');
  });
  d.className = 'geBtn';
  b.isOffline() && !mxClient.IS_CHROMEAPP && (d.style.display = 'none');
  G.appendChild(d);
  b.editor.cancelFirst ? (c || G.appendChild(D), G.appendChild(z), G.appendChild(J)) : (G.appendChild(z), G.appendChild(J), c || G.appendChild(D));
  m.appendChild(G);
  this.container = m;
};