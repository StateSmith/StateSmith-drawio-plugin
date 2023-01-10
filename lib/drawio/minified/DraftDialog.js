var DraftDialog = function(b, e, f, c, k, m, t, y, E) {
  var z = document.createElement('div'),
    D = document.createElement('div');
  D.style.marginTop = '0px';
  D.style.whiteSpace = 'nowrap';
  D.style.overflow = 'auto';
  D.style.lineHeight = 'normal';
  mxUtils.write(D, e);
  z.appendChild(D);
  var J = document.createElement('select'),
    G = mxUtils.bind(this, function() {
      x = mxUtils.parseXml(E[J.value].data);
      C = b.editor.extractGraphModel(x.documentElement, !0);
      F = 0;
      this.init();
    });
  if (null != E) {
    J.style.marginLeft = '4px';
    for (e = 0; e < E.length; e++) {
      var d = document.createElement('option');
      d.setAttribute('value', e);
      var g = new Date(E[e].created),
        n = new Date(E[e].modified);
      mxUtils.write(d, g.toLocaleDateString() + ' ' + g.toLocaleTimeString() + ' - ' + (g.toDateString(), n.toDateString(), n.toLocaleDateString()) + ' ' + n.toLocaleTimeString());
      J.appendChild(d);
    }
    D.appendChild(J);
    mxEvent.addListener(J, 'change', G);
  }
  null == f && (f = E[0].data);
  var v = document.createElement('div');
  v.style.position = 'absolute';
  v.style.border = '1px solid lightGray';
  v.style.marginTop = '10px';
  v.style.left = '40px';
  v.style.right = '40px';
  v.style.top = '46px';
  v.style.bottom = '74px';
  v.style.overflow = 'hidden';
  mxEvent.disableContextMenu(v);
  z.appendChild(v);
  var u = new Graph(v);
  u.setEnabled(!1);
  u.setPanning(!0);
  u.panningHandler.ignoreCell = !0;
  u.panningHandler.useLeftButtonForPanning = !0;
  u.minFitScale = null;
  u.maxFitScale = null;
  u.centerZoom = !0;
  var x = mxUtils.parseXml(f),
    C = b.editor.extractGraphModel(x.documentElement, !0),
    F = 0,
    L = null,
    l = u.getGlobalVariable;
  u.getGlobalVariable = function(A) {
    return 'page' == A && null != L && null != L[F] ? L[F].getAttribute('name') : 'pagenumber' == A ? F + 1 : 'pagecount' == A ? null != L ? L.length : 1 : l.apply(this, arguments);
  };
  u.getLinkForCell = function() {
    return null;
  };
  f = b.createToolbarButton(Editor.zoomInImage, mxResources.get('zoomIn'), function() {
    u.zoomIn();
  }, 20);
  D = b.createToolbarButton(Editor.zoomInImage, mxResources.get('zoomOut'), function() {
    u.zoomOut();
  }, 20);
  e = b.createToolbarButton(Editor.zoomFitImage, mxResources.get('fit'), function() {
    1 == u.view.scale ? (u.maxFitScale = 8, u.fit(8)) : u.zoomActual();
    u.center();
  }, 20);
  t = mxUtils.button(t || mxResources.get('discard'), function() {
    k.apply(this, [
      J.value,
      mxUtils.bind(this, function() {
        null != J.parentNode && (J.options[J.selectedIndex].parentNode.removeChild(J.options[J.selectedIndex]), 0 < J.options.length ? (J.value = J.options[0].value, G()) : b.hideDialog(!0));
      })
    ]);
  });
  t.className = 'geBtn';
  var q = document.createElement('select');
  q.style.maxWidth = '80px';
  q.style.position = 'relative';
  q.style.top = '-2px';
  q.style.verticalAlign = 'bottom';
  q.style.marginRight = '6px';
  q.style.display = 'none';
  m = mxUtils.button(m || mxResources.get('edit'), function() {
    c.apply(this, [J.value]);
  });
  m.className = 'geBtn gePrimaryBtn';
  d = document.createElement('div');
  d.style.position = 'absolute';
  d.style.bottom = '30px';
  d.style.right = '40px';
  d.style.textAlign = 'right';
  g = document.createElement('div');
  g.className = 'geToolbarContainer';
  g.style.cssText = 'box-shadow:none !important;background-color:transparent;padding:2px;border-style:none !important;bottom:30px;';
  this.init = function() {
    function A(I) {
      if (null != I) {
        var Q = I.getAttribute('background');
        if (null == Q || '' == Q || Q == mxConstants.NONE)
          Q = Editor.isDarkMode() ? 'transparent' : '#ffffff';
        v.style.backgroundColor = Q;
        new mxCodec(I.ownerDocument).decode(I, u.getModel());
        u.maxFitScale = 1;
        u.fit(8);
        u.center();
      }
      return I;
    }

    function H(I) {
      null != I && (I = A(Editor.parseDiagramNode(I)));
      return I;
    }
    mxEvent.addListener(q, 'change', function(I) {
      F = parseInt(q.value);
      H(L[F]);
      mxEvent.consume(I);
    });
    if ('mxfile' == C.nodeName) {
      var K = C.getElementsByTagName('diagram');
      L = [];
      for (var M = 0; M < K.length; M++)
        L.push(K[M]);
      0 < L.length && H(L[F]);
      q.innerText = '';
      if (1 < L.length)
        for (q.style.display = '', M = 0; M < L.length; M++)
          K = document.createElement('option'), mxUtils.write(K, L[M].getAttribute('name') || mxResources.get('pageWithNumber', [M + 1])), K.setAttribute('value', M), M == F && K.setAttribute('selected', 'selected'), q.appendChild(K);
      else
        q.style.display = 'none';
    } else
      A(C);
  };
  g.appendChild(q);
  g.appendChild(f);
  g.appendChild(D);
  g.appendChild(e);
  f = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog(!0);
  });
  f.className = 'geBtn';
  y = null != y ? mxUtils.button(mxResources.get('ignore'), y) : null;
  null != y && (y.className = 'geBtn');
  b.editor.cancelFirst ? (d.appendChild(f), null != y && d.appendChild(y), d.appendChild(t), d.appendChild(m)) : (d.appendChild(m), d.appendChild(t), null != y && d.appendChild(y), d.appendChild(f));
  z.appendChild(d);
  z.appendChild(g);
  this.container = z;
};