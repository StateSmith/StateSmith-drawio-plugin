var ImageDialog = function(b, e, f, c, k, m, t, y) {
  function E() {
    0 < J.value.length ? x.removeAttribute('disabled') : x.setAttribute('disabled', 'disabled');
  }
  m = null != m ? m : !0;
  var z = b.editor.graph,
    D = document.createElement('div');
  mxUtils.write(D, e);
  e = document.createElement('div');
  e.className = 'geTitle';
  e.style.backgroundColor = 'transparent';
  e.style.borderColor = 'transparent';
  e.style.whiteSpace = 'nowrap';
  e.style.textOverflow = 'clip';
  e.style.cursor = 'default';
  e.style.paddingRight = '20px';
  var J = document.createElement('input');
  J.setAttribute('value', f);
  J.setAttribute('type', 'text');
  J.setAttribute('spellcheck', 'false');
  J.setAttribute('autocorrect', 'off');
  J.setAttribute('autocomplete', 'off');
  J.setAttribute('autocapitalize', 'off');
  J.style.marginTop = '6px';
  J.style.width = (Graph.fileSupport ? 460 : 340) - 20 + 'px';
  J.style.backgroundImage = 'url(\'' + Dialog.prototype.clearImage + '\')';
  J.style.backgroundRepeat = 'no-repeat';
  J.style.backgroundPosition = '100% 50%';
  J.style.paddingRight = '14px';
  f = document.createElement('div');
  f.setAttribute('title', mxResources.get('reset'));
  f.style.position = 'relative';
  f.style.left = '-16px';
  f.style.width = '12px';
  f.style.height = '14px';
  f.style.cursor = 'pointer';
  f.style.display = 'inline-block';
  f.style.top = '3px';
  f.style.background = 'url(\'' + b.editor.transparentImage + '\')';
  mxEvent.addListener(f, 'click', function() {
    J.value = '';
    J.focus();
  });
  e.appendChild(J);
  e.appendChild(f);
  D.appendChild(e);
  var G = y,
    d, g, n = function(C, F, L, l) {
      var q = 'data:' == C.substring(0, 5);
      !b.isOffline() || q && 'undefined' === typeof chrome ? 0 < C.length && b.spinner.spin(document.body, mxResources.get('inserting')) ? b.loadImage(C, function(A) {
        b.spinner.stop();
        b.hideDialog();
        var H = !1 === l ? 1 : null != F && null != L ? Math.max(F / A.width, L / A.height) : Math.min(1, Math.min(520 / A.width, 520 / A.height));
        m && (C = b.convertDataUri(C));
        c(C, Math.round(Number(A.width) * H), Math.round(Number(A.height) * H), G, d, g);
      }, function() {
        b.spinner.stop();
        c(null);
        b.showError(mxResources.get('error'), mxResources.get('fileNotFound'), mxResources.get('ok'));
      }) : (b.hideDialog(), c(C, null, null, G, d, g)) : (C = b.convertDataUri(C), F = null == F ? 120 : F, L = null == L ? 100 : L, b.hideDialog(), c(C, F, L, G, d, g));
    },
    v = function(C, F) {
      if (null != C) {
        var L = k ? null : z.getModel().getGeometry(z.getSelectionCell());
        null != L ? n(C, L.width, L.height, F) : n(C, null, null, F);
      } else
        b.hideDialog(), c(null);
    };
  this.init = function() {
    J.focus();
    if (Graph.fileSupport) {
      J.setAttribute('placeholder', mxResources.get('dragImagesHere'));
      var C = D.parentNode,
        F = null;
      mxEvent.addListener(C, 'dragleave', function(L) {
        null != F && (F.parentNode.removeChild(F), F = null);
        L.stopPropagation();
        L.preventDefault();
      });
      mxEvent.addListener(C, 'dragover', mxUtils.bind(this, function(L) {
        null == F && (!mxClient.IS_IE || 10 < document.documentMode) && (F = b.highlightElement(C));
        L.stopPropagation();
        L.preventDefault();
      }));
      mxEvent.addListener(C, 'drop', mxUtils.bind(this, function(L) {
        null != F && (F.parentNode.removeChild(F), F = null);
        if (0 < L.dataTransfer.files.length)
          b.importFiles(L.dataTransfer.files, 0, 0, b.maxImageSize, function(q, A, H, K, M, I, Q, P) {
            v(q, P);
          }, function() {}, function(q) {
            return 'image/' == q.type.substring(0, 6);
          }, function(q) {
            for (var A = 0; A < q.length; A++)
              q[A]();
          }, !mxEvent.isControlDown(L), null, null, !0);
        else if (0 <= mxUtils.indexOf(L.dataTransfer.types, 'text/uri-list')) {
          var l = L.dataTransfer.getData('text/uri-list');
          /\.(gif|jpg|jpeg|tiff|png|svg)($|\?)/i.test(l) && v(decodeURIComponent(l));
        }
        L.stopPropagation();
        L.preventDefault();
      }), !1);
    }
  };
  y = document.createElement('div');
  y.style.marginTop = '14px';
  y.style.textAlign = 'center';
  f = mxUtils.button(mxResources.get('cancel'), function() {
    b.spinner.stop();
    b.hideDialog();
  });
  f.className = 'geBtn';
  b.editor.cancelFirst && y.appendChild(f);
  ImageDialog.filePicked = function(C) {
    C.action == google.picker.Action.PICKED && null != C.docs[0].thumbnails && (C = C.docs[0].thumbnails[C.docs[0].thumbnails.length - 1], null != C && (J.value = C.url));
    J.focus();
  };
  if (Graph.fileSupport) {
    if (null == b.imgDlgFileInputElt) {
      var u = document.createElement('input');
      u.setAttribute('multiple', 'multiple');
      u.setAttribute('type', 'file');
      mxEvent.addListener(u, 'change', function(C) {
        null != u.files && (b.importFiles(u.files, 0, 0, b.maxImageSize, function(F, L, l, q, A, H) {
          v(F);
        }, function() {}, function(F) {
          return 'image/' == F.type.substring(0, 6);
        }, function(F) {
          for (var L = 0; L < F.length; L++)
            F[L]();
        }, !0), u.type = '', u.type = 'file', u.value = '');
      });
      u.style.display = 'none';
      document.body.appendChild(u);
      b.imgDlgFileInputElt = u;
    }
    e = mxUtils.button(mxResources.get('open'), function() {
      b.imgDlgFileInputElt.click();
    });
    e.className = 'geBtn';
    y.appendChild(e);
  }
  mxEvent.addListener(J, 'keypress', function(C) {
    13 == C.keyCode && v(J.value);
  });
  var x = mxUtils.button(mxResources.get('crop'), function() {
    var C = new CropImageDialog(b, J.value, G, function(F, L, l) {
      G = F;
      d = L;
      g = l;
    });
    b.showDialog(C.container, 300, 390, !0, !0);
  });
  t && (x.className = 'geBtn', y.appendChild(x));
  mxEvent.addListener(J, 'change', function(C) {
    G = null;
    E();
  });
  E();
  t = mxUtils.button(mxResources.get('apply'), function() {
    v(J.value);
  });
  t.className = 'geBtn gePrimaryBtn';
  y.appendChild(t);
  b.editor.cancelFirst || y.appendChild(f);
  Graph.fileSupport && (y.style.marginTop = '120px', D.style.backgroundImage = 'url(\'' + IMAGE_PATH + '/droptarget.png\')', D.style.backgroundPosition = 'center 65%', D.style.backgroundRepeat = 'no-repeat', t = document.createElement('div'), t.style.position = 'absolute', t.style.width = '420px', t.style.top = '58%', t.style.textAlign = 'center', t.style.fontSize = '18px', t.style.color = '#a0c3ff', mxUtils.write(t, mxResources.get('dragImagesHere')), D.appendChild(t));
  D.appendChild(y);
  this.container = D;
};