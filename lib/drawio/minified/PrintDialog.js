var PrintDialog = function(a, b) {
  this.create(a, b);
};
PrintDialog.prototype.create = function(a) {
  function b(C) {
    var D = h.checked || m.checked,
      G = parseInt(x.value) / 100;
    isNaN(G) && (G = 1, x.value = '100%');
    mxClient.IS_SF && (G *= 0.75);
    var F = f.pageFormat || mxConstants.PAGE_FORMAT_A4_PORTRAIT,
      K = 1 / f.pageScale;
    if (D) {
      var P = h.checked ? 1 : parseInt(p.value);
      isNaN(P) || (K = mxUtils.getScaleForPageCount(P, f, F));
    }
    var R = P = 0;
    F = mxRectangle.fromRectangle(F);
    F.width = Math.ceil(F.width * G);
    F.height = Math.ceil(F.height * G);
    K *= G;
    !D && f.pageVisible ? (G = f.getPageLayout(), P -= G.x * F.width, R -= G.y * F.height) : D = !0;
    D = PrintDialog.createPrintPreview(f, K, F, 0, P, R, D);
    D.open();
    C && PrintDialog.printPreview(D);
  }
  var f = a.editor.graph,
    e = document.createElement('table');
  e.style.width = '100%';
  e.style.height = '100%';
  var g = document.createElement('tbody');
  var d = document.createElement('tr');
  var h = document.createElement('input');
  h.setAttribute('type', 'checkbox');
  var n = document.createElement('td');
  n.setAttribute('colspan', '2');
  n.style.fontSize = '10pt';
  n.appendChild(h);
  var u = document.createElement('span');
  mxUtils.write(u, ' ' + mxResources.get('fitPage'));
  n.appendChild(u);
  mxEvent.addListener(u, 'click', function(C) {
    h.checked = !h.checked;
    m.checked = !h.checked;
    mxEvent.consume(C);
  });
  mxEvent.addListener(h, 'change', function() {
    m.checked = !h.checked;
  });
  d.appendChild(n);
  g.appendChild(d);
  d = d.cloneNode(!1);
  var m = document.createElement('input');
  m.setAttribute('type', 'checkbox');
  n = document.createElement('td');
  n.style.fontSize = '10pt';
  n.appendChild(m);
  u = document.createElement('span');
  mxUtils.write(u, ' ' + mxResources.get('posterPrint') + ':');
  n.appendChild(u);
  mxEvent.addListener(u, 'click', function(C) {
    m.checked = !m.checked;
    h.checked = !m.checked;
    mxEvent.consume(C);
  });
  d.appendChild(n);
  var p = document.createElement('input');
  p.setAttribute('value', '1');
  p.setAttribute('type', 'number');
  p.setAttribute('min', '1');
  p.setAttribute('size', '4');
  p.setAttribute('disabled', 'disabled');
  p.style.width = '50px';
  n = document.createElement('td');
  n.style.fontSize = '10pt';
  n.appendChild(p);
  mxUtils.write(n, ' ' + mxResources.get('pages') + ' (max)');
  d.appendChild(n);
  g.appendChild(d);
  mxEvent.addListener(m, 'change', function() {
    m.checked ? p.removeAttribute('disabled') : p.setAttribute('disabled', 'disabled');
    h.checked = !m.checked;
  });
  d = d.cloneNode(!1);
  n = document.createElement('td');
  mxUtils.write(n, mxResources.get('pageScale') + ':');
  d.appendChild(n);
  n = document.createElement('td');
  var x = document.createElement('input');
  x.setAttribute('value', '100 %');
  x.setAttribute('size', '5');
  x.style.width = '50px';
  n.appendChild(x);
  d.appendChild(n);
  g.appendChild(d);
  d = document.createElement('tr');
  n = document.createElement('td');
  n.colSpan = 2;
  n.style.paddingTop = '20px';
  n.setAttribute('align', 'right');
  u = mxUtils.button(mxResources.get('cancel'), function() {
    a.hideDialog();
  });
  u.className = 'geBtn';
  a.editor.cancelFirst && n.appendChild(u);
  if (PrintDialog.previewEnabled) {
    var A = mxUtils.button(mxResources.get('preview'), function() {
      a.hideDialog();
      b(!1);
    });
    A.className = 'geBtn';
    n.appendChild(A);
  }
  A = mxUtils.button(mxResources.get(PrintDialog.previewEnabled ? 'print' : 'ok'), function() {
    a.hideDialog();
    b(!0);
  });
  A.className = 'geBtn gePrimaryBtn';
  n.appendChild(A);
  a.editor.cancelFirst || n.appendChild(u);
  d.appendChild(n);
  g.appendChild(d);
  e.appendChild(g);
  this.container = e;
};
PrintDialog.printPreview = function(a) {
  try {
    null != a.wnd && window.setTimeout(function() {
      a.wnd.focus();
      a.wnd.print();
      a.wnd.close();
    }, 500);
  } catch (b) {}
};
PrintDialog.createPrintPreview = function(a, b, f, e, g, d, h) {
  b = new mxPrintPreview(a, b, f, e, g, d);
  b.title = mxResources.get('preview');
  b.addPageCss = !mxClient.IS_SF;
  b.printBackgroundImage = !0;
  b.autoOrigin = h;
  a = a.background;
  if (null == a || '' == a || a == mxConstants.NONE)
    a = '#ffffff';
  b.backgroundColor = a;
  var n = b.writeHead;
  b.writeHead = function(u) {
    n.apply(this, arguments);
    u.writeln('<style type="text/css">');
    u.writeln('@media screen {');
    u.writeln('  body > div { padding:30px;box-sizing:content-box; }');
    u.writeln('}');
    u.writeln('</style>');
  };
  return b;
};
PrintDialog.previewEnabled = !0;