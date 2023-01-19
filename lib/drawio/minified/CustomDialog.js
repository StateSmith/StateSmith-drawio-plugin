var CustomDialog = function(b, e, f, c, k, m, t, y, E, z, D) {
  var J = document.createElement('div');
  J.appendChild(e);
  var G = document.createElement('div');
  G.style.marginTop = '30px';
  G.style.textAlign = 'center';
  null != t && G.appendChild(t);
  b.isOffline() || null == m || (e = mxUtils.button(mxResources.get('help'), function() {
    b.openLink(m);
  }), e.className = 'geBtn', G.appendChild(e));
  E = mxUtils.button(E || mxResources.get('cancel'), function() {
    b.hideDialog();
    null != c && c();
  });
  E.className = 'geBtn';
  y && (E.style.display = 'none');
  b.editor.cancelFirst && G.appendChild(E);
  k = mxUtils.button(k || mxResources.get('ok'), mxUtils.bind(this, function() {
    z || b.hideDialog(null, null, this.container);
    if (null != f) {
      var d = f();
      if ('string' === typeof d) {
        b.showError(mxResources.get('error'), d);
        return;
      }
    }
    z && b.hideDialog(null, null, this.container);
  }));
  G.appendChild(k);
  k.className = 'geBtn gePrimaryBtn';
  b.editor.cancelFirst || G.appendChild(E);
  if (null != D)
    for (y = 0; y < D.length; y++)
      (function(d, g, n) {
        d = mxUtils.button(d, function(v) {
          g(v);
        });
        null != n && d.setAttribute('title', n);
        d.className = 'geBtn';
        G.appendChild(d);
      }(D[y][0], D[y][1], D[y][2]));
  J.appendChild(G);
  this.cancelBtn = E;
  this.okButton = k;
  this.container = J;
};