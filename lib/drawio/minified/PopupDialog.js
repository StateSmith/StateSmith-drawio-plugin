var PopupDialog = function(b, e, f, c, k) {
  k = null != k ? k : !0;
  var m = document.createElement('div');
  m.style.textAlign = 'left';
  m.style.height = '100%';
  mxUtils.write(m, mxResources.get('fileOpenLocation'));
  mxUtils.br(m);
  mxUtils.br(m);
  var t = mxUtils.button(mxResources.get('openInThisWindow'), function() {
    k && b.hideDialog();
    null != c && c();
  });
  t.className = 'geBtn';
  t.style.marginBottom = '8px';
  t.style.width = '280px';
  m.appendChild(t);
  mxUtils.br(m);
  var y = mxUtils.button(mxResources.get('openInNewWindow'), function() {
    k && b.hideDialog();
    null != f && f();
    b.openLink(e, null, !0);
  });
  y.className = 'geBtn gePrimaryBtn';
  y.style.width = t.style.width;
  m.appendChild(y);
  mxUtils.br(m);
  mxUtils.br(m);
  mxUtils.write(m, mxResources.get('allowPopups'));
  this.container = m;
};