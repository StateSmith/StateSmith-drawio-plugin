var FontDialog = function(b, e, f, c, k) {
  function m(C) {
    this.style.border = '';
    13 == C.keyCode && x.click();
  }
  var t = document.createElement('table'),
    y = document.createElement('tbody');
  t.style.marginTop = '8px';
  var E = document.createElement('tr');
  var z = document.createElement('td');
  z.colSpan = 2;
  z.style.whiteSpace = 'nowrap';
  z.style.fontSize = '10pt';
  z.style.fontWeight = 'bold';
  var D = document.createElement('input');
  D.style.cssText = 'margin-right:8px;margin-bottom:8px;';
  D.setAttribute('value', 'sysfonts');
  D.setAttribute('type', 'radio');
  D.setAttribute('name', 'current-fontdialog');
  D.setAttribute('id', 'fontdialog-sysfonts');
  z.appendChild(D);
  var J = document.createElement('label');
  J.setAttribute('for', 'fontdialog-sysfonts');
  mxUtils.write(J, mxResources.get('sysFonts', null, 'System Fonts'));
  z.appendChild(J);
  E.appendChild(z);
  y.appendChild(E);
  E = document.createElement('tr');
  z = document.createElement('td');
  z.style.whiteSpace = 'nowrap';
  z.style.fontSize = '10pt';
  z.style.width = '120px';
  z.style.paddingLeft = '15px';
  mxUtils.write(z, mxResources.get('fontname', null, 'Font Name') + ':');
  E.appendChild(z);
  var G = document.createElement('input');
  's' == c && G.setAttribute('value', e);
  G.style.marginLeft = '4px';
  G.style.width = '250px';
  G.className = 'dlg_fontName_s';
  z = document.createElement('td');
  z.appendChild(G);
  E.appendChild(z);
  y.appendChild(E);
  E = document.createElement('tr');
  z = document.createElement('td');
  z.colSpan = 2;
  z.style.whiteSpace = 'nowrap';
  z.style.fontSize = '10pt';
  z.style.fontWeight = 'bold';
  var d = document.createElement('input');
  d.style.cssText = 'margin-right:8px;margin-bottom:8px;';
  d.setAttribute('value', 'googlefonts');
  d.setAttribute('type', 'radio');
  d.setAttribute('name', 'current-fontdialog');
  d.setAttribute('id', 'fontdialog-googlefonts');
  z.appendChild(d);
  J = document.createElement('label');
  J.setAttribute('for', 'fontdialog-googlefonts');
  mxUtils.write(J, mxResources.get('googleFonts', null, 'Google Fonts'));
  z.appendChild(J);
  mxClient.IS_CHROMEAPP || b.isOffline() && !EditorUi.isElectronApp || (J = b.menus.createHelpLink('https://fonts.google.com/'), J.getElementsByTagName('img')[0].setAttribute('valign', 'middle'), z.appendChild(J));
  E.appendChild(z);
  y.appendChild(E);
  E = document.createElement('tr');
  z = document.createElement('td');
  z.style.whiteSpace = 'nowrap';
  z.style.fontSize = '10pt';
  z.style.width = '120px';
  z.style.paddingLeft = '15px';
  mxUtils.write(z, mxResources.get('fontname', null, 'Font Name') + ':');
  E.appendChild(z);
  var g = document.createElement('input');
  'g' == c && g.setAttribute('value', e);
  g.style.marginLeft = '4px';
  g.style.width = '250px';
  g.className = 'dlg_fontName_g';
  z = document.createElement('td');
  z.appendChild(g);
  E.appendChild(z);
  y.appendChild(E);
  E = document.createElement('tr');
  z = document.createElement('td');
  z.colSpan = 2;
  z.style.whiteSpace = 'nowrap';
  z.style.fontSize = '10pt';
  z.style.fontWeight = 'bold';
  var n = document.createElement('input');
  n.style.cssText = 'margin-right:8px;margin-bottom:8px;';
  n.setAttribute('value', 'webfonts');
  n.setAttribute('type', 'radio');
  n.setAttribute('name', 'current-fontdialog');
  n.setAttribute('id', 'fontdialog-webfonts');
  z.appendChild(n);
  J = document.createElement('label');
  J.setAttribute('for', 'fontdialog-webfonts');
  mxUtils.write(J, mxResources.get('webfonts', null, 'Web Fonts'));
  z.appendChild(J);
  E.appendChild(z);
  Editor.enableWebFonts && y.appendChild(E);
  E = document.createElement('tr');
  z = document.createElement('td');
  z.style.whiteSpace = 'nowrap';
  z.style.fontSize = '10pt';
  z.style.width = '120px';
  z.style.paddingLeft = '15px';
  mxUtils.write(z, mxResources.get('fontname', null, 'Font Name') + ':');
  E.appendChild(z);
  var v = document.createElement('input');
  'w' == c && (Editor.enableWebFonts ? v.setAttribute('value', e) : G.setAttribute('value', e));
  v.style.marginLeft = '4px';
  v.style.width = '250px';
  v.className = 'dlg_fontName_w';
  z = document.createElement('td');
  z.appendChild(v);
  E.appendChild(z);
  Editor.enableWebFonts && y.appendChild(E);
  E = document.createElement('tr');
  z = document.createElement('td');
  z.style.whiteSpace = 'nowrap';
  z.style.fontSize = '10pt';
  z.style.width = '120px';
  z.style.paddingLeft = '15px';
  mxUtils.write(z, mxResources.get('fontUrl', null, 'Font URL') + ':');
  E.appendChild(z);
  var u = document.createElement('input');
  u.setAttribute('value', f || '');
  u.style.marginLeft = '4px';
  u.style.width = '250px';
  u.className = 'dlg_fontUrl';
  z = document.createElement('td');
  z.appendChild(u);
  E.appendChild(z);
  Editor.enableWebFonts && y.appendChild(E);
  this.init = function() {
    var C = G;
    'g' == c ? C = g : 'w' == c && Editor.enableWebFonts && (C = v);
    C.focus();
    mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? C.select() : document.execCommand('selectAll', !1, null);
  };
  E = document.createElement('tr');
  z = document.createElement('td');
  z.colSpan = 2;
  z.style.paddingTop = '20px';
  z.style.whiteSpace = 'nowrap';
  z.setAttribute('align', 'right');
  b.isOffline() || (e = mxUtils.button(mxResources.get('help'), function() {
    b.openLink('https://www.diagrams.net/blog/external-fonts');
  }), e.className = 'geBtn', z.appendChild(e));
  e = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog();
    k();
  });
  e.className = 'geBtn';
  b.editor.cancelFirst && z.appendChild(e);
  var x = mxUtils.button(mxResources.get('apply'), function() {
    if (D.checked) {
      var C = G.value;
      var F = 's';
    } else if (d.checked) {
      C = g.value;
      var L = Editor.GOOGLE_FONTS + encodeURIComponent(C).replace(/%20/g, '+');
      F = 'g';
    } else
      n.checked && (C = v.value, L = u.value, F = 'w');
    var l = L;
    var q = F,
      A = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    null == C || 0 == C.length ? (t.querySelector('.dlg_fontName_' + q).style.border = '1px solid red', l = !1) : 'w' != q || A.test(l) ? l = !0 : (t.querySelector('.dlg_fontUrl').style.border = '1px solid red', l = !1);
    l && (k(C, L, F), b.hideDialog());
  });
  x.className = 'geBtn gePrimaryBtn';
  mxEvent.addListener(G, 'keypress', m);
  mxEvent.addListener(g, 'keypress', m);
  mxEvent.addListener(v, 'keypress', m);
  mxEvent.addListener(u, 'keypress', m);
  mxEvent.addListener(G, 'focus', function() {
    D.setAttribute('checked', 'checked');
    D.checked = !0;
  });
  mxEvent.addListener(g, 'focus', function() {
    d.setAttribute('checked', 'checked');
    d.checked = !0;
  });
  mxEvent.addListener(v, 'focus', function() {
    n.setAttribute('checked', 'checked');
    n.checked = !0;
  });
  mxEvent.addListener(u, 'focus', function() {
    n.setAttribute('checked', 'checked');
    n.checked = !0;
  });
  z.appendChild(x);
  b.editor.cancelFirst || z.appendChild(e);
  E.appendChild(z);
  y.appendChild(E);
  t.appendChild(y);
  this.container = t;
};