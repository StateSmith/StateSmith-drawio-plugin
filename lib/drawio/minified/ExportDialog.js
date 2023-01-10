var ExportDialog = function(a) {
  function b() {
    var T = p.value,
      Z = T.lastIndexOf('.');
    p.value = 0 < Z ? T.substring(0, Z + 1) + x.value : T + '.' + x.value;
    'xml' === x.value ? (A.setAttribute('disabled', 'true'), C.setAttribute('disabled', 'true'), D.setAttribute('disabled', 'true'), Q.setAttribute('disabled', 'true')) : (A.removeAttribute('disabled'), C.removeAttribute('disabled'), D.removeAttribute('disabled'), Q.removeAttribute('disabled'));
    'png' === x.value || 'svg' === x.value || 'pdf' === x.value ? P.removeAttribute('disabled') : P.setAttribute('disabled', 'disabled');
    'png' === x.value || 'jpg' === x.value || 'pdf' === x.value ? R.removeAttribute('disabled') : R.setAttribute('disabled', 'disabled');
    'png' === x.value ? (G.removeAttribute('disabled'), F.removeAttribute('disabled')) : (G.setAttribute('disabled', 'disabled'), F.setAttribute('disabled', 'disabled'));
  }

  function f() {
    C.style.backgroundColor = C.value * D.value > MAX_AREA || 0 >= C.value ? 'red' : '';
    D.style.backgroundColor = C.value * D.value > MAX_AREA || 0 >= D.value ? 'red' : '';
  }
  var e = a.editor.graph,
    g = e.getGraphBounds(),
    d = e.view.scale,
    h = Math.ceil(g.width / d),
    n = Math.ceil(g.height / d);
  d = document.createElement('table');
  var u = document.createElement('tbody');
  d.setAttribute('cellpadding', mxClient.IS_SF ? '0' : '2');
  g = document.createElement('tr');
  var m = document.createElement('td');
  m.style.fontSize = '10pt';
  m.style.width = '100px';
  mxUtils.write(m, mxResources.get('filename') + ':');
  g.appendChild(m);
  var p = document.createElement('input');
  p.setAttribute('value', a.editor.getOrCreateFilename());
  p.style.width = '180px';
  m = document.createElement('td');
  m.appendChild(p);
  g.appendChild(m);
  u.appendChild(g);
  g = document.createElement('tr');
  m = document.createElement('td');
  m.style.fontSize = '10pt';
  mxUtils.write(m, mxResources.get('format') + ':');
  g.appendChild(m);
  var x = document.createElement('select');
  x.style.width = '180px';
  m = document.createElement('option');
  m.setAttribute('value', 'png');
  mxUtils.write(m, mxResources.get('formatPng'));
  x.appendChild(m);
  m = document.createElement('option');
  ExportDialog.showGifOption && (m.setAttribute('value', 'gif'), mxUtils.write(m, mxResources.get('formatGif')), x.appendChild(m));
  m = document.createElement('option');
  m.setAttribute('value', 'jpg');
  mxUtils.write(m, mxResources.get('formatJpg'));
  x.appendChild(m);
  a.printPdfExport || (m = document.createElement('option'), m.setAttribute('value', 'pdf'), mxUtils.write(m, mxResources.get('formatPdf')), x.appendChild(m));
  m = document.createElement('option');
  m.setAttribute('value', 'svg');
  mxUtils.write(m, mxResources.get('formatSvg'));
  x.appendChild(m);
  ExportDialog.showXmlOption && (m = document.createElement('option'), m.setAttribute('value', 'xml'), mxUtils.write(m, mxResources.get('formatXml')), x.appendChild(m));
  m = document.createElement('td');
  m.appendChild(x);
  g.appendChild(m);
  u.appendChild(g);
  g = document.createElement('tr');
  m = document.createElement('td');
  m.style.fontSize = '10pt';
  mxUtils.write(m, mxResources.get('zoom') + ' (%):');
  g.appendChild(m);
  var A = document.createElement('input');
  A.setAttribute('type', 'number');
  A.setAttribute('value', '100');
  A.style.width = '180px';
  m = document.createElement('td');
  m.appendChild(A);
  g.appendChild(m);
  u.appendChild(g);
  g = document.createElement('tr');
  m = document.createElement('td');
  m.style.fontSize = '10pt';
  mxUtils.write(m, mxResources.get('width') + ':');
  g.appendChild(m);
  var C = document.createElement('input');
  C.setAttribute('value', h);
  C.style.width = '180px';
  m = document.createElement('td');
  m.appendChild(C);
  g.appendChild(m);
  u.appendChild(g);
  g = document.createElement('tr');
  m = document.createElement('td');
  m.style.fontSize = '10pt';
  mxUtils.write(m, mxResources.get('height') + ':');
  g.appendChild(m);
  var D = document.createElement('input');
  D.setAttribute('value', n);
  D.style.width = '180px';
  m = document.createElement('td');
  m.appendChild(D);
  g.appendChild(m);
  u.appendChild(g);
  g = document.createElement('tr');
  m = document.createElement('td');
  m.style.fontSize = '10pt';
  mxUtils.write(m, mxResources.get('dpi') + ':');
  g.appendChild(m);
  var G = document.createElement('select');
  G.style.width = '180px';
  m = document.createElement('option');
  m.setAttribute('value', '100');
  mxUtils.write(m, '100dpi');
  G.appendChild(m);
  m = document.createElement('option');
  m.setAttribute('value', '200');
  mxUtils.write(m, '200dpi');
  G.appendChild(m);
  m = document.createElement('option');
  m.setAttribute('value', '300');
  mxUtils.write(m, '300dpi');
  G.appendChild(m);
  m = document.createElement('option');
  m.setAttribute('value', '400');
  mxUtils.write(m, '400dpi');
  G.appendChild(m);
  m = document.createElement('option');
  m.setAttribute('value', 'custom');
  mxUtils.write(m, mxResources.get('custom'));
  G.appendChild(m);
  var F = document.createElement('input');
  F.style.width = '180px';
  F.style.display = 'none';
  F.setAttribute('value', '100');
  F.setAttribute('type', 'number');
  F.setAttribute('min', '50');
  F.setAttribute('step', '50');
  var K = !1;
  mxEvent.addListener(G, 'change', function() {
    'custom' == this.value ? (this.style.display = 'none', F.style.display = '', F.focus()) : (F.value = this.value, K || (A.value = this.value));
  });
  mxEvent.addListener(F, 'change', function() {
    var T = parseInt(F.value);
    isNaN(T) || 0 >= T ? F.style.backgroundColor = 'red' : (F.style.backgroundColor = '', K || (A.value = T));
  });
  m = document.createElement('td');
  m.appendChild(G);
  m.appendChild(F);
  g.appendChild(m);
  u.appendChild(g);
  g = document.createElement('tr');
  m = document.createElement('td');
  m.style.fontSize = '10pt';
  mxUtils.write(m, mxResources.get('background') + ':');
  g.appendChild(m);
  var P = document.createElement('input');
  P.setAttribute('type', 'checkbox');
  P.checked = null == e.background || e.background == mxConstants.NONE;
  m = document.createElement('td');
  m.appendChild(P);
  mxUtils.write(m, mxResources.get('transparent'));
  g.appendChild(m);
  u.appendChild(g);
  g = document.createElement('tr');
  m = document.createElement('td');
  m.style.fontSize = '10pt';
  mxUtils.write(m, mxResources.get('grid') + ':');
  g.appendChild(m);
  var R = document.createElement('input');
  R.setAttribute('type', 'checkbox');
  R.checked = !1;
  m = document.createElement('td');
  m.appendChild(R);
  g.appendChild(m);
  u.appendChild(g);
  g = document.createElement('tr');
  m = document.createElement('td');
  m.style.fontSize = '10pt';
  mxUtils.write(m, mxResources.get('borderWidth') + ':');
  g.appendChild(m);
  var Q = document.createElement('input');
  Q.setAttribute('type', 'number');
  Q.setAttribute('value', ExportDialog.lastBorderValue);
  Q.style.width = '180px';
  m = document.createElement('td');
  m.appendChild(Q);
  g.appendChild(m);
  u.appendChild(g);
  d.appendChild(u);
  mxEvent.addListener(x, 'change', b);
  b();
  mxEvent.addListener(A, 'change', function() {
    K = !0;
    var T = Math.max(0, parseFloat(A.value) || 100) / 100;
    A.value = parseFloat((100 * T).toFixed(2));
    0 < h ? (C.value = Math.floor(h * T), D.value = Math.floor(n * T)) : (A.value = '100', C.value = h, D.value = n);
    f();
  });
  mxEvent.addListener(C, 'change', function() {
    var T = parseInt(C.value) / h;
    0 < T ? (A.value = parseFloat((100 * T).toFixed(2)), D.value = Math.floor(n * T)) : (A.value = '100', C.value = h, D.value = n);
    f();
  });
  mxEvent.addListener(D, 'change', function() {
    var T = parseInt(D.value) / n;
    0 < T ? (A.value = parseFloat((100 * T).toFixed(2)), C.value = Math.floor(h * T)) : (A.value = '100', C.value = h, D.value = n);
    f();
  });
  g = document.createElement('tr');
  m = document.createElement('td');
  m.setAttribute('align', 'right');
  m.style.paddingTop = '22px';
  m.colSpan = 2;
  var ba = mxUtils.button(mxResources.get('export'), mxUtils.bind(this, function() {
    if (0 >= parseInt(A.value))
      mxUtils.alert(mxResources.get('drawingEmpty'));
    else {
      var T = p.value,
        Z = x.value,
        ma = Math.max(0, parseFloat(A.value) || 100) / 100,
        ja = Math.max(0, parseInt(Q.value)),
        la = e.background,
        N = Math.max(1, parseInt(F.value));
      if (('svg' == Z || 'png' == Z || 'pdf' == Z) && P.checked)
        la = null;
      else if (null == la || la == mxConstants.NONE)
        la = '#ffffff';
      ExportDialog.lastBorderValue = ja;
      ExportDialog.exportFile(a, T, Z, la, ma, ja, N, R.checked);
    }
  }));
  ba.className = 'geBtn gePrimaryBtn';
  var V = mxUtils.button(mxResources.get('cancel'), function() {
    a.hideDialog();
  });
  V.className = 'geBtn';
  a.editor.cancelFirst ? (m.appendChild(V), m.appendChild(ba)) : (m.appendChild(ba), m.appendChild(V));
  g.appendChild(m);
  u.appendChild(g);
  d.appendChild(u);
  this.container = d;
};
ExportDialog.lastBorderValue = 0;
ExportDialog.showGifOption = !0;
ExportDialog.showXmlOption = !0;
ExportDialog.exportFile = function(a, b, f, e, g, d, h, n) {
  n = a.editor.graph;
  if ('xml' == f)
    ExportDialog.saveLocalFile(a, mxUtils.getXml(a.editor.getGraphXml()), b, f);
  else if ('svg' == f)
    ExportDialog.saveLocalFile(a, mxUtils.getXml(n.getSvg(e, g, d)), b, f);
  else {
    var u = n.getGraphBounds(),
      m = mxUtils.createXmlDocument(),
      p = m.createElement('output');
    m.appendChild(p);
    m = new mxXmlCanvas2D(p);
    m.translate(Math.floor((d / g - u.x) / n.view.scale), Math.floor((d / g - u.y) / n.view.scale));
    m.scale(g / n.view.scale);
    new mxImageExport().drawState(n.getView().getState(n.model.root), m);
    p = 'xml=' + encodeURIComponent(mxUtils.getXml(p));
    m = Math.ceil(u.width * g / n.view.scale + 2 * d);
    g = Math.ceil(u.height * g / n.view.scale + 2 * d);
    p.length <= MAX_REQUEST_SIZE && m * g < MAX_AREA ? (a.hideDialog(), new mxXmlRequest(EXPORT_URL, 'format=' + f + '&filename=' + encodeURIComponent(b) + '&bg=' + (null != e ? e : 'none') + '&w=' + m + '&h=' + g + '&' + p + '&dpi=' + h).simulate(document, '_blank')) : mxUtils.alert(mxResources.get('drawingTooLarge'));
  }
};
ExportDialog.saveLocalFile = function(a, b, f, e) {
  b.length < MAX_REQUEST_SIZE ? (a.hideDialog(), new mxXmlRequest(SAVE_URL, 'xml=' + encodeURIComponent(b) + '&filename=' + encodeURIComponent(f) + '&format=' + e).simulate(document, '_blank')) : (mxUtils.alert(mxResources.get('drawingTooLarge')), mxUtils.popup(xml));
};