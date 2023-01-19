var BackgroundImageDialog = function(b, e, f, c) {
  function k() {
    null == H || H == mxConstants.NONE ? (A.style.display = 'none', l.checked = !1) : (A.style.backgroundColor = H, A.style.display = '', l.checked = !0);
  }
  var m = b.editor.graph,
    t = document.createElement('div');
  t.style.whiteSpace = 'nowrap';
  var y = document.createElement('h2');
  mxUtils.write(y, mxResources.get('background'));
  y.style.marginTop = '0px';
  t.appendChild(y);
  var E = null != f && null != f.originalSrc;
  y = !1;
  var z = document.createElement('input');
  z.style.cssText = 'margin-right:8px;margin-bottom:8px;';
  z.setAttribute('value', 'url');
  z.setAttribute('type', 'radio');
  z.setAttribute('name', 'geBackgroundImageDialogOption');
  var D = document.createElement('input');
  D.style.cssText = 'margin-right:8px;margin-bottom:8px;';
  D.setAttribute('value', 'url');
  D.setAttribute('type', 'radio');
  D.setAttribute('name', 'geBackgroundImageDialogOption');
  var J = document.createElement('input');
  J.setAttribute('type', 'text');
  J.style.marginBottom = '8px';
  J.style.width = '360px';
  J.value = E || null == f ? '' : f.src;
  var G = document.createElement('select');
  G.style.width = '360px';
  if (null != b.pages)
    for (var d = 0; d < b.pages.length; d++) {
      var g = document.createElement('option');
      mxUtils.write(g, b.pages[d].getName() || mxResources.get('pageWithNumber', [d + 1]));
      g.setAttribute('value', 'data:page/id,' + b.pages[d].getId());
      b.pages[d] == b.currentPage && g.setAttribute('disabled', 'disabled');
      null != f && f.originalSrc == g.getAttribute('value') && (g.setAttribute('selected', 'selected'), y = !0);
      G.appendChild(g);
    }
  E || null != b.pages && 1 != b.pages.length || (z.style.display = 'none', D.style.display = 'none', G.style.display = 'none');
  var n = document.createElement('option'),
    v = !1,
    u = !1,
    x = function(M, I) {
      v || null != M && u || (D.checked ? null != I && I(n.selected ? null : G.value) : '' == J.value || b.isOffline() ? (F.value = '', L.value = '', null != I && I('')) : (J.value = mxUtils.trim(J.value), b.loadImage(J.value, function(Q) {
        F.value = Q.width;
        L.value = Q.height;
        null != I && I(J.value);
      }, function() {
        b.showError(mxResources.get('error'), mxResources.get('fileNotFound'), mxResources.get('ok'));
        F.value = '';
        L.value = '';
        null != I && I(null);
      })));
    },
    C = mxUtils.bind(this, function(M) {
      b.importFiles(M, 0, 0, b.maxBackgroundSize, function(I, Q, P, O, W, p) {
        J.value = I;
        x();
        J.focus();
      }, function() {}, function(I) {
        return 'image/' == I.type.substring(0, 6);
      }, function(I) {
        for (var Q = 0; Q < I.length; Q++)
          I[Q]();
      }, !0, b.maxBackgroundBytes, b.maxBackgroundBytes, !0);
    });
  this.init = function() {
    E ? G.focus() : J.focus();
    mxEvent.addListener(G, 'focus', function() {
      z.removeAttribute('checked');
      D.setAttribute('checked', 'checked');
      D.checked = !0;
    });
    mxEvent.addListener(J, 'focus', function() {
      D.removeAttribute('checked');
      z.setAttribute('checked', 'checked');
      z.checked = !0;
    });
    if (Graph.fileSupport) {
      J.setAttribute('placeholder', mxResources.get('dragImagesHere'));
      var M = t.parentNode,
        I = null;
      mxEvent.addListener(M, 'dragleave', function(Q) {
        null != I && (I.parentNode.removeChild(I), I = null);
        Q.stopPropagation();
        Q.preventDefault();
      });
      mxEvent.addListener(M, 'dragover', mxUtils.bind(this, function(Q) {
        null == I && (!mxClient.IS_IE || 10 < document.documentMode) && (I = b.highlightElement(M));
        Q.stopPropagation();
        Q.preventDefault();
      }));
      mxEvent.addListener(M, 'drop', mxUtils.bind(this, function(Q) {
        null != I && (I.parentNode.removeChild(I), I = null);
        if (0 < Q.dataTransfer.files.length)
          C(Q.dataTransfer.files);
        else if (0 <= mxUtils.indexOf(Q.dataTransfer.types, 'text/uri-list')) {
          var P = Q.dataTransfer.getData('text/uri-list');
          /\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(P) && (J.value = decodeURIComponent(P), x());
        }
        Q.stopPropagation();
        Q.preventDefault();
      }), !1);
    }
  };
  t.appendChild(z);
  t.appendChild(J);
  mxUtils.br(t);
  d = document.createElement('span');
  d.style.marginLeft = '30px';
  mxUtils.write(d, mxResources.get('width') + ':');
  t.appendChild(d);
  var F = document.createElement('input');
  F.setAttribute('type', 'text');
  F.style.width = '60px';
  F.style.marginLeft = '8px';
  F.style.marginRight = '16px';
  F.value = null == f || E ? '' : f.width;
  t.appendChild(F);
  mxUtils.write(t, mxResources.get('height') + ':');
  var L = document.createElement('input');
  L.setAttribute('type', 'text');
  L.style.width = '60px';
  L.style.marginLeft = '8px';
  L.style.marginRight = '16px';
  L.value = null == f || E ? '' : f.height;
  t.appendChild(L);
  mxUtils.br(t);
  mxUtils.br(t);
  mxEvent.addListener(J, 'change', x);
  ImageDialog.filePicked = function(M) {
    M.action == google.picker.Action.PICKED && null != M.docs[0].thumbnails && (M = M.docs[0].thumbnails[M.docs[0].thumbnails.length - 1], null != M && (J.value = M.url, x()));
    J.focus();
  };
  t.appendChild(D);
  t.appendChild(G);
  mxUtils.br(t);
  mxUtils.br(t);
  E ? (D.setAttribute('checked', 'checked'), D.checked = !0) : (z.setAttribute('checked', 'checked'), z.checked = !0);
  !y && D.checked && (mxUtils.write(n, mxResources.get('pageNotFound')), n.setAttribute('disabled', 'disabled'), n.setAttribute('selected', 'selected'), n.setAttribute('value', 'pageNotFound'), G.appendChild(n), mxEvent.addListener(G, 'change', function() {
    null == n.parentNode || n.selected || n.parentNode.removeChild(n);
  }));
  f = document.createElement('div');
  f.style.display = 'inline-flex';
  f.style.alignItems = 'center';
  f.style.cursor = 'default';
  f.style.minWidth = '40%';
  f.style.height = '20px';
  var l = document.createElement('input');
  l.setAttribute('type', 'checkbox');
  l.style.margin = '0px 10px 0px 4px';
  l.style.verticalAlign = 'bottom';
  l.defaultChecked = c != mxConstants.NONE && null != c;
  l.checked = l.defaultChecked;
  f.appendChild(l);
  mxUtils.write(f, mxResources.get('fillColor'));
  y = f.cloneNode(!1);
  var q = document.createElement('input');
  q.setAttribute('type', 'checkbox');
  q.style.margin = '0px 10px 0px 30px';
  q.style.verticalAlign = 'bottom';
  q.defaultChecked = m.shadowVisible;
  q.checked = q.defaultChecked;
  y.appendChild(q);
  mxUtils.write(y, mxResources.get('shadow'));
  mxClient.IS_SVG && !mxClient.IS_SF || q.setAttribute('disabled', 'disabled');
  mxEvent.addListener(y, 'click', function(M) {
    mxEvent.getSource(M) != q && (q.checked = !q.checked);
  });
  var A = document.createElement('button');
  A.style.width = '36px';
  A.style.height = '18px';
  A.style.cursor = 'pointer';
  A.style.marginLeft = '10px';
  A.style.backgroundPosition = 'center center';
  A.style.backgroundRepeat = 'no-repeat';
  A.style.verticalAlign = 'bottom';
  A.className = 'geColorBtn';
  var H = c;
  k();
  mxEvent.addListener(f, 'click', function(M) {
    mxEvent.getSource(M) != l && (l.checked = !l.checked);
    H = l.checked ? '#ffffff' : null;
    k();
  });
  mxEvent.addListener(A, 'click', function(M) {
    b.pickColor(H || 'none', function(I) {
      H = I;
      k();
    });
    mxEvent.consume(M);
  });
  f.appendChild(A);
  t.appendChild(f);
  t.appendChild(y);
  mxUtils.br(t);
  c = document.createElement('div');
  c.style.marginTop = '30px';
  c.style.textAlign = 'right';
  m = mxUtils.button(mxResources.get('cancel'), function() {
    v = !0;
    b.hideDialog();
  });
  m.className = 'geBtn';
  b.editor.cancelFirst && c.appendChild(m);
  f = mxUtils.button(mxResources.get('reset'), function() {
    J.value = '';
    F.value = '';
    L.value = '';
    z.checked = !0;
    H = mxConstants.NONE;
    k();
    v = !1;
  });
  mxEvent.addGestureListeners(f, function() {
    v = !0;
  });
  f.className = 'geBtn';
  f.width = '100';
  c.appendChild(f);
  if (Graph.fileSupport) {
    var K = document.createElement('input');
    K.setAttribute('multiple', 'multiple');
    K.setAttribute('type', 'file');
    mxEvent.addListener(K, 'change', function(M) {
      null != K.files && (C(K.files), K.type = '', K.type = 'file', K.value = '');
    });
    K.style.display = 'none';
    t.appendChild(K);
    f = mxUtils.button(mxResources.get('open'), function() {
      K.click();
    });
    f.className = 'geBtn';
    c.appendChild(f);
  }
  applyBtn = mxUtils.button(mxResources.get('apply'), function() {
    b.hideDialog();
    x(null, function(M) {
      e('' != M && null != M ? new mxImage(M, F.value, L.value) : null, null == M, H, !mxClient.IS_SVG || mxClient.IS_SF ? null : q.checked);
    });
  });
  mxEvent.addGestureListeners(applyBtn, function() {
    u = !0;
  });
  applyBtn.className = 'geBtn gePrimaryBtn';
  c.appendChild(applyBtn);
  b.editor.cancelFirst || c.appendChild(m);
  t.appendChild(c);
  this.container = t;
};