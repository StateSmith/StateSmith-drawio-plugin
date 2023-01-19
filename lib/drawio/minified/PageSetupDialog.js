var PageSetupDialog = function(a) {
  function b() {
    var D = x;
    null != D && null != D.originalSrc && (D = a.createImageForPageLink(D.originalSrc, null));
    null != D && null != D.src ? (p.style.backgroundImage = 'url(' + D.src + ')', p.style.display = 'inline-block') : (p.style.backgroundImage = '', p.style.display = 'none');
    p.style.backgroundColor = '';
    null != A && A != mxConstants.NONE && (p.style.backgroundColor = A, p.style.display = 'inline-block');
  }
  var f = a.editor.graph,
    e = document.createElement('table');
  e.style.width = '100%';
  e.style.height = '100%';
  var g = document.createElement('tbody');
  var d = document.createElement('tr');
  var h = document.createElement('td');
  h.style.verticalAlign = 'top';
  h.style.fontSize = '10pt';
  mxUtils.write(h, mxResources.get('paperSize') + ':');
  d.appendChild(h);
  h = document.createElement('td');
  h.style.verticalAlign = 'top';
  h.style.fontSize = '10pt';
  var n = PageSetupDialog.addPageFormatPanel(h, 'pagesetupdialog', f.pageFormat);
  d.appendChild(h);
  g.appendChild(d);
  d = document.createElement('tr');
  h = document.createElement('td');
  mxUtils.write(h, mxResources.get('gridSize') + ':');
  d.appendChild(h);
  h = document.createElement('td');
  h.style.whiteSpace = 'nowrap';
  var u = document.createElement('input');
  u.setAttribute('type', 'number');
  u.setAttribute('min', '0');
  u.style.width = '40px';
  u.style.marginLeft = '6px';
  u.value = f.getGridSize();
  h.appendChild(u);
  mxEvent.addListener(u, 'change', function() {
    var D = parseInt(u.value);
    u.value = Math.max(1, isNaN(D) ? f.getGridSize() : D);
  });
  d.appendChild(h);
  g.appendChild(d);
  d = document.createElement('tr');
  h = document.createElement('td');
  mxUtils.write(h, mxResources.get('background') + ':');
  d.appendChild(h);
  h = document.createElement('td');
  var m = document.createElement('button');
  m.className = 'geBtn';
  m.style.margin = '0px';
  mxUtils.write(m, mxResources.get('change') + '...');
  var p = document.createElement('div');
  p.style.display = 'inline-block';
  p.style.verticalAlign = 'middle';
  p.style.backgroundPosition = 'center center';
  p.style.backgroundRepeat = 'no-repeat';
  p.style.backgroundSize = 'contain';
  p.style.border = '1px solid lightGray';
  p.style.borderRadius = '4px';
  p.style.marginRight = '14px';
  p.style.height = '32px';
  p.style.width = '64px';
  p.style.cursor = 'pointer';
  p.style.padding = '4px';
  var x = f.backgroundImage,
    A = f.background,
    C = function(D) {
      a.showBackgroundImageDialog(function(G, F, K) {
        F || (null != G && null != G.src && Graph.isPageLink(G.src) && (G = {
          originalSrc: G.src
        }), x = G);
        A = K;
        b();
      }, x, A);
      mxEvent.consume(D);
    };
  mxEvent.addListener(m, 'click', C);
  mxEvent.addListener(p, 'click', C);
  b();
  h.appendChild(p);
  h.appendChild(m);
  d.appendChild(h);
  g.appendChild(d);
  d = document.createElement('tr');
  h = document.createElement('td');
  h.colSpan = 2;
  h.style.paddingTop = '16px';
  h.setAttribute('align', 'right');
  m = mxUtils.button(mxResources.get('cancel'), function() {
    a.hideDialog();
  });
  m.className = 'geBtn';
  a.editor.cancelFirst && h.appendChild(m);
  C = mxUtils.button(mxResources.get('apply'), function() {
    a.hideDialog();
    var D = parseInt(u.value);
    isNaN(D) || f.gridSize === D || f.setGridSize(D);
    D = new ChangePageSetup(a, A, x, n.get());
    D.ignoreColor = f.background == A;
    D.ignoreImage = (null != f.backgroundImage ? f.backgroundImage.src : null) === (null != x ? x.src : null);
    f.pageFormat.width == D.previousFormat.width && f.pageFormat.height == D.previousFormat.height && D.ignoreColor && D.ignoreImage || f.model.execute(D);
  });
  C.className = 'geBtn gePrimaryBtn';
  h.appendChild(C);
  a.editor.cancelFirst || h.appendChild(m);
  d.appendChild(h);
  g.appendChild(d);
  e.appendChild(g);
  this.container = e;
};
PageSetupDialog.addPageFormatPanel = function(a, b, f, e) {
  function g(ba, V, T) {
    if (T || x != document.activeElement && A != document.activeElement) {
      ba = !1;
      for (V = 0; V < D.length; V++)
        T = D[V], P ? 'custom' == T.key && (n.value = T.key, P = !1) : null != T.format && ('a4' == T.key ? 826 == f.width ? (f = mxRectangle.fromRectangle(f), f.width = 827) : 826 == f.height && (f = mxRectangle.fromRectangle(f), f.height = 827) : 'a5' == T.key && (584 == f.width ? (f = mxRectangle.fromRectangle(f), f.width = 583) : 584 == f.height && (f = mxRectangle.fromRectangle(f), f.height = 583)), f.width == T.format.width && f.height == T.format.height ? (n.value = T.key, d.setAttribute('checked', 'checked'), d.defaultChecked = !0, d.checked = !0, h.removeAttribute('checked'), h.defaultChecked = !1, h.checked = !1, ba = !0) : f.width == T.format.height && f.height == T.format.width && (n.value = T.key, d.removeAttribute('checked'), d.defaultChecked = !1, d.checked = !1, h.setAttribute('checked', 'checked'), h.defaultChecked = !0, ba = h.checked = !0));
      ba ? (u.style.display = '', p.style.display = 'none') : (x.value = f.width / 100, A.value = f.height / 100, d.setAttribute('checked', 'checked'), n.value = 'custom', u.style.display = 'none', p.style.display = '');
    }
  }
  b = 'format-' + b;
  var d = document.createElement('input');
  d.setAttribute('name', b);
  d.setAttribute('type', 'radio');
  d.setAttribute('value', 'portrait');
  var h = document.createElement('input');
  h.setAttribute('name', b);
  h.setAttribute('type', 'radio');
  h.setAttribute('value', 'landscape');
  var n = document.createElement('select');
  n.style.marginBottom = '8px';
  n.style.borderRadius = '4px';
  n.style.borderWidth = '1px';
  n.style.borderStyle = 'solid';
  n.style.width = '206px';
  var u = document.createElement('div');
  u.style.marginLeft = '4px';
  u.style.width = '210px';
  u.style.height = '24px';
  d.style.marginRight = '6px';
  u.appendChild(d);
  b = document.createElement('span');
  b.style.maxWidth = '100px';
  mxUtils.write(b, mxResources.get('portrait'));
  u.appendChild(b);
  h.style.marginLeft = '10px';
  h.style.marginRight = '6px';
  u.appendChild(h);
  var m = document.createElement('span');
  m.style.width = '100px';
  mxUtils.write(m, mxResources.get('landscape'));
  u.appendChild(m);
  var p = document.createElement('div');
  p.style.marginLeft = '4px';
  p.style.width = '210px';
  p.style.height = '24px';
  var x = document.createElement('input');
  x.setAttribute('size', '7');
  x.style.textAlign = 'right';
  p.appendChild(x);
  mxUtils.write(p, ' in x ');
  var A = document.createElement('input');
  A.setAttribute('size', '7');
  A.style.textAlign = 'right';
  p.appendChild(A);
  mxUtils.write(p, ' in');
  u.style.display = 'none';
  p.style.display = 'none';
  for (var C = {}, D = PageSetupDialog.getFormats(), G = 0; G < D.length; G++) {
    var F = D[G];
    C[F.key] = F;
    var K = document.createElement('option');
    K.setAttribute('value', F.key);
    mxUtils.write(K, F.title);
    n.appendChild(K);
  }
  var P = !1;
  g();
  a.appendChild(n);
  mxUtils.br(a);
  a.appendChild(u);
  a.appendChild(p);
  var R = f,
    Q = function(ba, V) {
      ba = C[n.value];
      null != ba.format ? (x.value = ba.format.width / 100, A.value = ba.format.height / 100, p.style.display = 'none', u.style.display = '') : (u.style.display = 'none', p.style.display = '');
      ba = parseFloat(x.value);
      if (isNaN(ba) || 0 >= ba)
        x.value = f.width / 100;
      ba = parseFloat(A.value);
      if (isNaN(ba) || 0 >= ba)
        A.value = f.height / 100;
      ba = new mxRectangle(0, 0, Math.floor(100 * parseFloat(x.value)), Math.floor(100 * parseFloat(A.value)));
      'custom' != n.value && h.checked && (ba = new mxRectangle(0, 0, ba.height, ba.width));
      V && P || ba.width == R.width && ba.height == R.height || (R = ba, null != e && e(R));
    };
  mxEvent.addListener(b, 'click', function(ba) {
    d.checked = !0;
    Q(ba);
    mxEvent.consume(ba);
  });
  mxEvent.addListener(m, 'click', function(ba) {
    h.checked = !0;
    Q(ba);
    mxEvent.consume(ba);
  });
  mxEvent.addListener(x, 'blur', Q);
  mxEvent.addListener(x, 'click', Q);
  mxEvent.addListener(A, 'blur', Q);
  mxEvent.addListener(A, 'click', Q);
  mxEvent.addListener(h, 'change', Q);
  mxEvent.addListener(d, 'change', Q);
  mxEvent.addListener(n, 'change', function(ba) {
    P = 'custom' == n.value;
    Q(ba, !0);
  });
  Q();
  return {
    set: function(ba) {
      f = ba;
      g(null, null, !0);
    },
    get: function() {
      return R;
    },
    widthInput: x,
    heightInput: A
  };
};
PageSetupDialog.getFormats = function() {
  return [{
      key: 'letter',
      title: 'US-Letter (8,5" x 11")',
      format: mxConstants.PAGE_FORMAT_LETTER_PORTRAIT
    },
    {
      key: 'legal',
      title: 'US-Legal (8,5" x 14")',
      format: new mxRectangle(0, 0, 850, 1400)
    },
    {
      key: 'tabloid',
      title: 'US-Tabloid (11" x 17")',
      format: new mxRectangle(0, 0, 1100, 1700)
    },
    {
      key: 'executive',
      title: 'US-Executive (7" x 10")',
      format: new mxRectangle(0, 0, 700, 1000)
    },
    {
      key: 'a0',
      title: 'A0 (841 mm x 1189 mm)',
      format: new mxRectangle(0, 0, 3300, 4681)
    },
    {
      key: 'a1',
      title: 'A1 (594 mm x 841 mm)',
      format: new mxRectangle(0, 0, 2339, 3300)
    },
    {
      key: 'a2',
      title: 'A2 (420 mm x 594 mm)',
      format: new mxRectangle(0, 0, 1654, 2336)
    },
    {
      key: 'a3',
      title: 'A3 (297 mm x 420 mm)',
      format: new mxRectangle(0, 0, 1169, 1654)
    },
    {
      key: 'a4',
      title: 'A4 (210 mm x 297 mm)',
      format: mxConstants.PAGE_FORMAT_A4_PORTRAIT
    },
    {
      key: 'a5',
      title: 'A5 (148 mm x 210 mm)',
      format: new mxRectangle(0, 0, 583, 827)
    },
    {
      key: 'a6',
      title: 'A6 (105 mm x 148 mm)',
      format: new mxRectangle(0, 0, 413, 583)
    },
    {
      key: 'a7',
      title: 'A7 (74 mm x 105 mm)',
      format: new mxRectangle(0, 0, 291, 413)
    },
    {
      key: 'b4',
      title: 'B4 (250 mm x 353 mm)',
      format: new mxRectangle(0, 0, 980, 1390)
    },
    {
      key: 'b5',
      title: 'B5 (176 mm x 250 mm)',
      format: new mxRectangle(0, 0, 690, 980)
    },
    {
      key: '16-9',
      title: '16:9 (1600 x 900)',
      format: new mxRectangle(0, 0, 900, 1600)
    },
    {
      key: '16-10',
      title: '16:10 (1920 x 1200)',
      format: new mxRectangle(0, 0, 1200, 1920)
    },
    {
      key: '4-3',
      title: '4:3 (1600 x 1200)',
      format: new mxRectangle(0, 0, 1200, 1600)
    },
    {
      key: 'custom',
      title: mxResources.get('custom'),
      format: null
    }
  ];
};