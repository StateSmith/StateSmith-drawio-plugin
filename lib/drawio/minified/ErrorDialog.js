var ErrorDialog = function(a, b, f, e, g, d, h, n, u, m, p) {
  u = null != u ? u : !0;
  var x = document.createElement('div');
  x.style.textAlign = 'center';
  if (null != b) {
    var A = document.createElement('div');
    A.style.padding = '0px';
    A.style.margin = '0px';
    A.style.fontSize = '18px';
    A.style.paddingBottom = '16px';
    A.style.marginBottom = '10px';
    A.style.borderBottom = '1px solid #c0c0c0';
    A.style.color = 'gray';
    A.style.whiteSpace = 'nowrap';
    A.style.textOverflow = 'ellipsis';
    A.style.overflow = 'hidden';
    mxUtils.write(A, b);
    A.setAttribute('title', b);
    x.appendChild(A);
  }
  b = document.createElement('div');
  b.style.lineHeight = '1.2em';
  b.style.padding = '6px';
  b.innerHTML = f;
  x.appendChild(b);
  f = document.createElement('div');
  f.style.marginTop = '12px';
  f.style.textAlign = 'center';
  null != d && (b = mxUtils.button(mxResources.get('tryAgain'), function() {
    a.hideDialog();
    d();
  }), b.className = 'geBtn', f.appendChild(b), f.style.textAlign = 'center');
  null != m && (m = mxUtils.button(m, function() {
    null != p && p();
  }), m.className = 'geBtn', f.appendChild(m));
  var C = mxUtils.button(e, function() {
    u && a.hideDialog();
    null != g && g();
  });
  C.className = 'geBtn';
  f.appendChild(C);
  null != h && (e = mxUtils.button(h, function() {
    u && a.hideDialog();
    null != n && n();
  }), e.className = 'geBtn gePrimaryBtn', f.appendChild(e));
  this.init = function() {
    C.focus();
  };
  x.appendChild(f);
  this.container = x;
};