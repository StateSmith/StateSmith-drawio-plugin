var FilePropertiesDialog = function(b) {
  var e = document.createElement('table'),
    f = document.createElement('tbody');
  e.style.width = '100%';
  e.style.marginTop = '8px';
  var c = b.getCurrentFile();
  var k = null != c && null != c.getTitle() ? c.getTitle() : b.defaultFilename;
  var m = function() {};
  if (/(\.png)$/i.test(k)) {
    m = 1;
    var t = 0;
    k = b.fileNode;
    null != k && (k.hasAttribute('scale') && (m = parseFloat(k.getAttribute('scale'))), k.hasAttribute('border') && (t = parseInt(k.getAttribute('border'))));
    k = document.createElement('tr');
    var y = document.createElement('td');
    y.style.whiteSpace = 'nowrap';
    y.style.fontSize = '10pt';
    y.style.width = '120px';
    mxUtils.write(y, mxResources.get('zoom') + ':');
    k.appendChild(y);
    var E = document.createElement('input');
    E.setAttribute('value', 100 * m + '%');
    E.style.marginLeft = '4px';
    E.style.width = '180px';
    y = document.createElement('td');
    y.style.whiteSpace = 'nowrap';
    y.appendChild(E);
    k.appendChild(y);
    f.appendChild(k);
    k = document.createElement('tr');
    y = document.createElement('td');
    y.style.whiteSpace = 'nowrap';
    y.style.fontSize = '10pt';
    y.style.width = '120px';
    mxUtils.write(y, mxResources.get('borderWidth') + ':');
    k.appendChild(y);
    var z = document.createElement('input');
    z.setAttribute('value', t);
    z.style.marginLeft = '4px';
    z.style.width = '180px';
    y = document.createElement('td');
    y.style.whiteSpace = 'nowrap';
    y.appendChild(z);
    k.appendChild(y);
    f.appendChild(k);
    this.init = function() {
      E.focus();
      mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? E.select() : document.execCommand('selectAll', !1, null);
    };
    m = function() {
      null != b.fileNode && (b.fileNode.setAttribute('scale', Math.max(0, parseInt(E.value) / 100)), b.fileNode.setAttribute('border', Math.max(0, parseInt(z.value))), null != c && c.fileChanged());
      b.hideDialog();
    };
  } else if (!/(\.html)$/i.test(k) && !/(\.svg)$/i.test(k)) {
    var D = null != c ? c.isCompressed() : Editor.compressXml;
    k = document.createElement('tr');
    y = document.createElement('td');
    y.style.whiteSpace = 'nowrap';
    y.style.fontSize = '10pt';
    y.style.width = '120px';
    mxUtils.write(y, mxResources.get('compressed') + ':');
    k.appendChild(y);
    var J = document.createElement('input');
    J.setAttribute('type', 'checkbox');
    D && (J.setAttribute('checked', 'checked'), J.defaultChecked = !0);
    y = document.createElement('td');
    y.style.whiteSpace = 'nowrap';
    y.appendChild(J);
    k.appendChild(y);
    f.appendChild(k);
    this.init = function() {
      J.focus();
    };
    m = function() {
      null != b.fileNode && D != J.checked && (b.fileNode.setAttribute('compressed', J.checked ? 'true' : 'false'), null != c && c.fileChanged());
      b.hideDialog();
    };
  }
  if (null != c && c.isRealtimeOptional()) {
    k = document.createElement('tr');
    y = document.createElement('td');
    y.style.whiteSpace = 'nowrap';
    y.style.fontSize = '10pt';
    y.style.width = '120px';
    mxUtils.write(y, mxResources.get('realtimeCollaboration') + ':');
    k.appendChild(y);
    var G = document.createElement('input');
    G.setAttribute('type', 'checkbox');
    var d = c.isRealtimeEnabled();
    if (d = 'disabled' != b.drive.getCustomProperty(c.desc, 'collaboration'))
      G.setAttribute('checked', 'checked'), G.defaultChecked = !0;
    prevApply = m;
    m = function() {
      prevApply();
      b.hideDialog();
      G.checked != d && b.spinner.spin(document.body, mxResources.get('updatingDocument')) && c.setRealtimeEnabled(G.checked, mxUtils.bind(this, function(g) {
        b.spinner.stop();
      }), mxUtils.bind(this, function(g) {
        b.spinner.stop();
        b.showError(mxResources.get('error'), null != g && null != g.error ? g.error.message : mxResources.get('unknownError'), mxResources.get('ok'));
      }));
    };
    this.init = null != this.init ? this.init : function() {
      G.focus();
    };
    y = document.createElement('td');
    y.style.whiteSpace = 'nowrap';
    y.appendChild(G);
    y.appendChild(b.menus.createHelpLink('https://github.com/jgraph/drawio/discussions/2672'));
    k.appendChild(y);
    f.appendChild(k);
  }
  this.init = null != this.init ? this.init : function() {};
  m = mxUtils.button(mxResources.get('apply'), m);
  m.className = 'geBtn gePrimaryBtn';
  k = document.createElement('tr');
  y = document.createElement('td');
  y.colSpan = 2;
  y.style.paddingTop = '20px';
  y.style.whiteSpace = 'nowrap';
  y.setAttribute('align', 'center');
  t = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog();
  });
  t.className = 'geBtn';
  b.editor.cancelFirst && y.appendChild(t);
  y.appendChild(m);
  b.editor.cancelFirst || y.appendChild(t);
  k.appendChild(y);
  f.appendChild(k);
  e.appendChild(f);
  this.container = e;
};