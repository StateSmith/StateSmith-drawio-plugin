var EditDataDialog = function(a, b) {
  function f() {
    0 < R.value.length ? Q.removeAttribute('disabled') : Q.setAttribute('disabled', 'disabled');
  }
  var e = document.createElement('div'),
    g = a.editor.graph,
    d = g.getModel().getValue(b);
  if (!mxUtils.isNode(d)) {
    var h = mxUtils.createXmlDocument().createElement('object');
    h.setAttribute('label', d || '');
    d = h;
  }
  var n = {};
  try {
    var u = mxUtils.getValue(a.editor.graph.getCurrentCellStyle(b), 'metaData', null);
    null != u && (n = JSON.parse(u));
  } catch (T) {}
  var m = new mxForm('properties');
  m.table.style.width = '100%';
  var p = d.attributes,
    x = [],
    A = [],
    C = 0,
    D = null != EditDataDialog.getDisplayIdForCell ? EditDataDialog.getDisplayIdForCell(a, b) : null,
    G = function(T, Z) {
      var ma = document.createElement('div');
      ma.style.position = 'relative';
      ma.style.paddingRight = '20px';
      ma.style.boxSizing = 'border-box';
      ma.style.width = '100%';
      var ja = document.createElement('a'),
        la = mxUtils.createImage(Dialog.prototype.closeImage);
      la.style.height = '9px';
      la.style.fontSize = '9px';
      la.style.marginBottom = mxClient.IS_IE11 ? '-1px' : '5px';
      ja.className = 'geButton';
      ja.setAttribute('title', mxResources.get('delete'));
      ja.style.position = 'absolute';
      ja.style.top = '4px';
      ja.style.right = '0px';
      ja.style.margin = '0px';
      ja.style.width = '9px';
      ja.style.height = '9px';
      ja.style.cursor = 'pointer';
      ja.appendChild(la);
      Z = function(N) {
        return function() {
          for (var X = 0, L = 0; L < x.length; L++) {
            if (x[L] == N) {
              A[L] = null;
              m.table.deleteRow(X + (null != D ? 1 : 0));
              break;
            }
            null != A[L] && X++;
          }
        };
      }(Z);
      mxEvent.addListener(ja, 'click', Z);
      Z = T.parentNode;
      ma.appendChild(T);
      ma.appendChild(ja);
      Z.appendChild(ma);
    };
  h = function(T, Z, ma) {
    x[T] = Z;
    A[T] = m.addTextarea(x[C] + ':', ma, 2);
    A[T].style.width = '100%';
    0 < ma.indexOf('\n') && A[T].setAttribute('rows', '2');
    G(A[T], Z);
    null != n[Z] && 0 == n[Z].editable && A[T].setAttribute('disabled', 'disabled');
  };
  u = [];
  for (var F = g.getModel().getParent(b) == g.getModel().getRoot(), K = 0; K < p.length; K++)
    ('label' != p[K].nodeName || Graph.translateDiagram || F) && 'placeholders' != p[K].nodeName && u.push({
      name: p[K].nodeName,
      value: p[K].nodeValue
    });
  u.sort(function(T, Z) {
    return T.name < Z.name ? -1 : T.name > Z.name ? 1 : 0;
  });
  if (null != D) {
    p = document.createElement('div');
    p.style.width = '100%';
    p.style.fontSize = '11px';
    p.style.textAlign = 'center';
    mxUtils.write(p, D);
    var P = m.addField(mxResources.get('id') + ':', p);
    mxEvent.addListener(p, 'dblclick', function(T) {
      T = new FilenameDialog(a, D, mxResources.get('apply'), mxUtils.bind(this, function(Z) {
        null != Z && 0 < Z.length && Z != D && (null == g.getModel().getCell(Z) ? (g.getModel().cellRemoved(b), b.setId(Z), D = Z, P.innerHTML = mxUtils.htmlEntities(Z), g.getModel().cellAdded(b)) : a.handleError({
          message: mxResources.get('alreadyExst', [Z])
        }));
      }), mxResources.get('id'), null, null, null, null, null, null, 200);
      a.showDialog(T.container, 300, 80, !0, !0);
      T.init();
    });
  }
  for (K = 0; K < u.length; K++)
    h(C, u[K].name, u[K].value), C++;
  u = document.createElement('div');
  u.style.position = 'absolute';
  u.style.top = '30px';
  u.style.left = '30px';
  u.style.right = '30px';
  u.style.bottom = '80px';
  u.style.overflowY = 'auto';
  u.appendChild(m.table);
  h = document.createElement('div');
  h.style.display = 'flex';
  h.style.alignItems = 'center';
  h.style.boxSizing = 'border-box';
  h.style.paddingRight = '160px';
  h.style.whiteSpace = 'nowrap';
  h.style.marginTop = '6px';
  h.style.width = '100%';
  var R = document.createElement('input');
  R.setAttribute('placeholder', mxResources.get('enterPropertyName'));
  R.setAttribute('type', 'text');
  R.setAttribute('size', mxClient.IS_IE || mxClient.IS_IE11 ? '36' : '40');
  R.style.boxSizing = 'border-box';
  R.style.borderWidth = '1px';
  R.style.borderStyle = 'solid';
  R.style.marginLeft = '2px';
  R.style.padding = '4px';
  R.style.width = '100%';
  h.appendChild(R);
  u.appendChild(h);
  e.appendChild(u);
  var Q = mxUtils.button(mxResources.get('addProperty'), function() {
    var T = R.value;
    if (0 < T.length && 'label' != T && 'placeholders' != T && 0 > T.indexOf(':'))
      try {
        var Z = mxUtils.indexOf(x, T);
        if (0 <= Z && null != A[Z])
          A[Z].focus();
        else {
          d.cloneNode(!1).setAttribute(T, '');
          0 <= Z && (x.splice(Z, 1), A.splice(Z, 1));
          x.push(T);
          var ma = m.addTextarea(T + ':', '', 2);
          ma.style.width = '100%';
          A.push(ma);
          G(ma, T);
          ma.focus();
        }
        Q.setAttribute('disabled', 'disabled');
        R.value = '';
      } catch (ja) {
        mxUtils.alert(ja);
      }
    else
      mxUtils.alert(mxResources.get('invalidName'));
  });
  mxEvent.addListener(R, 'keypress', function(T) {
    13 == T.keyCode && Q.click();
  });
  this.init = function() {
    0 < A.length ? A[0].focus() : R.focus();
  };
  Q.setAttribute('title', mxResources.get('addProperty'));
  Q.setAttribute('disabled', 'disabled');
  Q.style.textOverflow = 'ellipsis';
  Q.style.position = 'absolute';
  Q.style.overflow = 'hidden';
  Q.style.width = '144px';
  Q.style.right = '0px';
  Q.className = 'geBtn';
  h.appendChild(Q);
  u = mxUtils.button(mxResources.get('cancel'), function() {
    a.hideDialog.apply(a, arguments);
  });
  u.setAttribute('title', 'Escape');
  u.className = 'geBtn';
  h = mxUtils.button(mxResources.get('export'), mxUtils.bind(this, function(T) {
    var Z = g.getDataForCells([b]);
    T = new EmbedDialog(a, JSON.stringify(Z, null, 2), null, null, function() {
      console.log(Z);
      a.alert('Written to Console (Dev Tools)');
    }, mxResources.get('export'), null, 'Console', 'data.json');
    a.showDialog(T.container, 450, 240, !0, !0);
    T.init();
  }));
  h.setAttribute('title', mxResources.get('export'));
  h.className = 'geBtn';
  var ba = mxUtils.button(mxResources.get('apply'), function() {
    try {
      a.hideDialog.apply(a, arguments);
      d = d.cloneNode(!0);
      for (var T = !1, Z = 0; Z < x.length; Z++)
        null == A[Z] ? d.removeAttribute(x[Z]) : (d.setAttribute(x[Z], A[Z].value), T = T || 'placeholder' == x[Z] && '1' == d.getAttribute('placeholders'));
      T && d.removeAttribute('label');
      g.getModel().setValue(b, d);
    } catch (ma) {
      mxUtils.alert(ma);
    }
  });
  ba.setAttribute('title', 'Ctrl+Enter');
  ba.className = 'geBtn gePrimaryBtn';
  mxEvent.addListener(e, 'keypress', function(T) {
    13 == T.keyCode && mxEvent.isControlDown(T) && ba.click();
  });
  mxEvent.addListener(R, 'keyup', f);
  mxEvent.addListener(R, 'change', f);
  p = document.createElement('div');
  p.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:30px;height:40px;';
  if (a.editor.graph.getModel().isVertex(b) || a.editor.graph.getModel().isEdge(b)) {
    F = document.createElement('span');
    F.style.marginRight = '10px';
    K = document.createElement('input');
    K.setAttribute('type', 'checkbox');
    K.style.marginRight = '6px';
    '1' == d.getAttribute('placeholders') && (K.setAttribute('checked', 'checked'), K.defaultChecked = !0);
    mxEvent.addListener(K, 'click', function() {
      '1' == d.getAttribute('placeholders') ? d.removeAttribute('placeholders') : d.setAttribute('placeholders', '1');
    });
    F.appendChild(K);
    mxUtils.write(F, mxResources.get('placeholders'));
    if (null != EditDataDialog.placeholderHelpLink) {
      K = document.createElement('a');
      K.setAttribute('href', EditDataDialog.placeholderHelpLink);
      K.setAttribute('title', mxResources.get('help'));
      K.setAttribute('target', '_blank');
      K.style.marginLeft = '8px';
      K.style.cursor = 'help';
      var V = document.createElement('img');
      mxUtils.setOpacity(V, 50);
      V.style.height = '16px';
      V.style.width = '16px';
      V.setAttribute('border', '0');
      V.setAttribute('valign', 'middle');
      V.style.marginTop = mxClient.IS_IE11 ? '0px' : '-4px';
      V.setAttribute('src', Editor.helpImage);
      K.appendChild(V);
      F.appendChild(K);
    }
    p.appendChild(F);
  }
  a.editor.cancelFirst && p.appendChild(u);
  p.appendChild(h);
  p.appendChild(ba);
  a.editor.cancelFirst || p.appendChild(u);
  e.appendChild(p);
  this.container = e;
};
EditDataDialog.getDisplayIdForCell = function(a, b) {
  var f = null;
  null != a.editor.graph.getModel().getParent(b) && (f = b.getId());
  return f;
};
EditDataDialog.placeholderHelpLink = null;