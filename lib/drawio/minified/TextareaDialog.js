var TextareaDialog = function(a, b, f, e, g, d, h, n, u, m, p, x, A, C, D) {
  m = null != m ? m : !1;
  h = document.createElement('div');
  h.style.position = 'absolute';
  h.style.top = '20px';
  h.style.bottom = '20px';
  h.style.left = '20px';
  h.style.right = '20px';
  n = document.createElement('div');
  n.style.position = 'absolute';
  n.style.left = '0px';
  n.style.right = '0px';
  var G = n.cloneNode(!1),
    F = n.cloneNode(!1);
  n.style.top = '0px';
  n.style.height = '20px';
  G.style.top = '20px';
  G.style.bottom = '64px';
  F.style.bottom = '0px';
  F.style.height = '60px';
  F.style.textAlign = 'center';
  mxUtils.write(n, b);
  h.appendChild(n);
  h.appendChild(G);
  h.appendChild(F);
  null != D && n.appendChild(D);
  var K = document.createElement('textarea');
  p && K.setAttribute('wrap', 'off');
  K.setAttribute('spellcheck', 'false');
  K.setAttribute('autocorrect', 'off');
  K.setAttribute('autocomplete', 'off');
  K.setAttribute('autocapitalize', 'off');
  mxUtils.write(K, f || '');
  K.style.resize = 'none';
  K.style.outline = 'none';
  K.style.position = 'absolute';
  K.style.boxSizing = 'border-box';
  K.style.top = '0px';
  K.style.left = '0px';
  K.style.height = '100%';
  K.style.width = '100%';
  this.textarea = K;
  this.init = function() {
    K.focus();
    K.scrollTop = 0;
  };
  G.appendChild(K);
  null != A && (b = mxUtils.button(mxResources.get('help'), function() {
    a.editor.graph.openLink(A);
  }), b.className = 'geBtn', F.appendChild(b));
  if (null != C)
    for (b = 0; b < C.length; b++)
      (function(R, Q, ba) {
        R = mxUtils.button(R, function(V) {
          Q(V, K);
        });
        null != ba && R.setAttribute('title', ba);
        R.className = 'geBtn';
        F.appendChild(R);
      }(C[b][0], C[b][1], C[b][2]));
  d = mxUtils.button(d || mxResources.get('cancel'), function() {
    a.hideDialog();
    null != g && g();
  });
  d.setAttribute('title', 'Escape');
  d.className = 'geBtn';
  a.editor.cancelFirst && F.appendChild(d);
  null != u && u(F, K);
  if (null != e) {
    var P = mxUtils.button(x || mxResources.get('apply'), function() {
      m || a.hideDialog();
      e(K.value);
    });
    P.setAttribute('title', 'Ctrl+Enter');
    P.className = 'geBtn gePrimaryBtn';
    F.appendChild(P);
    mxEvent.addListener(K, 'keypress', function(R) {
      13 == R.keyCode && mxEvent.isControlDown(R) && P.click();
    });
  }
  a.editor.cancelFirst || F.appendChild(d);
  this.container = h;
};