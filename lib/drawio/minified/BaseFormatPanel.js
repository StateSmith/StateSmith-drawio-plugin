BaseFormatPanel = function(a, b, f) {
  this.format = a;
  this.editorUi = b;
  this.container = f;
  this.listeners = [];
};
BaseFormatPanel.prototype.buttonBackgroundColor = 'transparent';
BaseFormatPanel.prototype.installInputHandler = function(a, b, f, e, g, d, h, n) {
  d = null != d ? d : '';
  n = null != n ? n : !1;
  var u = this.editorUi,
    m = u.editor.graph;
  e = null != e ? e : 1;
  g = null != g ? g : 999;
  var p = null,
    x = !1,
    A = mxUtils.bind(this, function(C) {
      var D = n ? parseFloat(a.value) : parseInt(a.value);
      isNaN(D) || b != mxConstants.STYLE_ROTATION || (D = mxUtils.mod(Math.round(100 * D), 36000) / 100);
      D = Math.min(g, Math.max(e, isNaN(D) ? f : D));
      if (m.cellEditor.isContentEditing() && h)
        x || (x = !0, null != p && (m.cellEditor.restoreSelection(p), p = null), h(D), a.value = D + d, x = !1);
      else if (D != mxUtils.getValue(u.getSelectionState().style, b, f)) {
        m.isEditing() && m.stopEditing(!0);
        m.getModel().beginUpdate();
        try {
          var G = u.getSelectionState().cells;
          m.setCellStyles(b, D, G);
          b == mxConstants.STYLE_FONTSIZE && m.updateLabelElements(G, function(K) {
            K.style.fontSize = D + 'px';
            K.removeAttribute('size');
          });
          for (var F = 0; F < G.length; F++)
            0 == m.model.getChildCount(G[F]) && m.autoSizeCell(G[F], !1);
          u.fireEvent(new mxEventObject('styleChanged', 'keys', [b], 'values', [D], 'cells', G));
        } finally {
          m.getModel().endUpdate();
        }
      }
      a.value = D + d;
      mxEvent.consume(C);
    });
  h && m.cellEditor.isContentEditing() && (mxEvent.addListener(a, 'mousedown', function() {
    document.activeElement == m.cellEditor.textarea && (p = m.cellEditor.saveSelection());
  }), mxEvent.addListener(a, 'touchstart', function() {
    document.activeElement == m.cellEditor.textarea && (p = m.cellEditor.saveSelection());
  }));
  mxEvent.addListener(a, 'change', A);
  mxEvent.addListener(a, 'blur', A);
  return A;
};
BaseFormatPanel.prototype.createPanel = function() {
  var a = document.createElement('div');
  a.className = 'geFormatSection';
  a.style.padding = '12px 0px 8px 14px';
  return a;
};
BaseFormatPanel.prototype.createTitle = function(a) {
  var b = document.createElement('div');
  b.style.padding = '0px 0px 6px 0px';
  b.style.whiteSpace = 'nowrap';
  b.style.overflow = 'hidden';
  b.style.width = '200px';
  b.style.fontWeight = 'bold';
  mxUtils.write(b, a);
  return b;
};
BaseFormatPanel.prototype.addAction = function(a, b) {
  var f = this.editorUi.actions.get(b);
  b = null;
  null != f && f.isEnabled() && (b = mxUtils.button(f.label, function(e) {
    f.funct(e, e);
  }), b.setAttribute('title', f.label + (null != f.shortcut ? ' (' + f.shortcut + ')' : '')), b.style.marginBottom = '2px', b.style.width = '210px', a.appendChild(b), result = !0);
  return b;
};
BaseFormatPanel.prototype.addActions = function(a, b) {
  for (var f = null, e = null, g = 0, d = 0; d < b.length; d++) {
    var h = this.addAction(a, b[d]);
    null != h && (g++, 0 == mxUtils.mod(g, 2) && (e.style.marginRight = '2px', e.style.width = '104px', h.style.width = '104px', f.parentNode.removeChild(f)), f = mxUtils.br(a), e = h);
  }
  return g;
};
BaseFormatPanel.prototype.createStepper = function(a, b, f, e, g, d, h) {
  f = null != f ? f : 1;
  e = null != e ? e : 9;
  var n = 10 * f,
    u = document.createElement('div');
  u.className = 'geBtnStepper';
  u.style.position = 'absolute';
  var m = document.createElement('div');
  m.style.position = 'relative';
  m.style.height = e + 'px';
  m.style.width = '10px';
  m.className = 'geBtnUp';
  u.appendChild(m);
  var p = m.cloneNode(!1);
  p.style.border = 'none';
  p.style.height = e + 'px';
  p.className = 'geBtnDown';
  u.appendChild(p);
  mxEvent.addGestureListeners(p, function(A) {
    mxEvent.consume(A);
  }, null, function(A) {
    '' == a.value && (a.value = d || '2');
    var C = h ? parseFloat(a.value) : parseInt(a.value);
    isNaN(C) || (a.value = C - (mxEvent.isShiftDown(A) ? n : f), null != b && b(A));
    mxEvent.consume(A);
  });
  mxEvent.addGestureListeners(m, function(A) {
    mxEvent.consume(A);
  }, null, function(A) {
    '' == a.value && (a.value = d || '0');
    var C = h ? parseFloat(a.value) : parseInt(a.value);
    isNaN(C) || (a.value = C + (mxEvent.isShiftDown(A) ? n : f), null != b && b(A));
    mxEvent.consume(A);
  });
  if (g) {
    var x = null;
    mxEvent.addGestureListeners(u, function(A) {
      mxEvent.consume(A);
    }, null, function(A) {
      if (null != x) {
        try {
          x.select();
        } catch (C) {}
        x = null;
        mxEvent.consume(A);
      }
    });
  } else
    mxEvent.addListener(u, 'click', function(A) {
      mxEvent.consume(A);
    });
  return u;
};
BaseFormatPanel.prototype.createOption = function(a, b, f, e, g) {
  var d = document.createElement('div');
  d.style.display = 'flex';
  d.style.alignItems = 'center';
  d.style.padding = '3px 0px 3px 0px';
  d.style.height = '18px';
  var h = document.createElement('input');
  h.setAttribute('type', 'checkbox');
  h.style.margin = '1px 6px 0px 0px';
  h.style.verticalAlign = 'top';
  d.appendChild(h);
  var n = document.createElement('div');
  n.style.display = 'inline-block';
  n.style.whiteSpace = 'nowrap';
  n.style.textOverflow = 'ellipsis';
  n.style.overflow = 'hidden';
  n.style.maxWidth = '160px';
  n.style.maxWidth = '160px';
  n.style.userSelect = 'none';
  mxUtils.write(n, a);
  d.appendChild(n);
  var u = !1,
    m = b(),
    p = function(x, A) {
      u || (u = !0, x ? (h.setAttribute('checked', 'checked'), h.defaultChecked = !0, h.checked = !0) : (h.removeAttribute('checked'), h.defaultChecked = !1, h.checked = !1), m != x && (m = x, b() != m && f(m, A)), u = !1);
    };
  mxEvent.addListener(d, 'click', function(x) {
    if ('disabled' != h.getAttribute('disabled')) {
      var A = mxEvent.getSource(x);
      if (A == d || A == n)
        h.checked = !h.checked;
      p(h.checked, x);
    }
  });
  p(m);
  null != e && (e.install(p), this.listeners.push(e));
  null != g && g(d);
  return d;
};
BaseFormatPanel.prototype.createCellOption = function(a, b, f, e, g, d, h, n, u) {
  var m = this.editorUi,
    p = m.editor.graph;
  e = null != e ? 'null' == e ? null : e : 1;
  g = null != g ? 'null' == g ? null : g : 0;
  var x = null != u ? p.getCommonStyle(u) : m.getSelectionState().style;
  return this.createOption(a, function() {
    return mxUtils.getValue(x, b, f) != g;
  }, function(A) {
    n && p.stopEditing();
    if (null != h)
      h.funct();
    else {
      p.getModel().beginUpdate();
      try {
        var C = null != u ? u : m.getSelectionState().cells;
        A = A ? e : g;
        p.setCellStyles(b, A, C);
        null != d && d(C, A);
        m.fireEvent(new mxEventObject('styleChanged', 'keys', [b], 'values', [A], 'cells', C));
      } finally {
        p.getModel().endUpdate();
      }
    }
  }, {
    install: function(A) {
      this.listener = function() {
        A(mxUtils.getValue(x, b, f) != g);
      };
      p.getModel().addListener(mxEvent.CHANGE, this.listener);
    },
    destroy: function() {
      p.getModel().removeListener(this.listener);
    }
  });
};
BaseFormatPanel.prototype.createColorOption = function(a, b, f, e, g, d, h, n) {
  var u = document.createElement('div');
  u.style.padding = '3px 0px 3px 0px';
  u.style.whiteSpace = 'nowrap';
  u.style.overflow = 'hidden';
  u.style.width = '200px';
  u.style.height = '18px';
  var m = document.createElement('input');
  m.setAttribute('type', 'checkbox');
  m.style.margin = '1px 6px 0px 0px';
  m.style.verticalAlign = 'top';
  h || u.appendChild(m);
  var p = document.createElement('span');
  p.style.verticalAlign = 'top';
  mxUtils.write(p, a);
  u.appendChild(p);
  var x = b(),
    A = !1,
    C = null,
    D = null;
  mxClient.IS_IE || mxClient.IS_IE11 || mxClient.IS_TOUCH || (C = document.createElement('img'), C.src = Editor.colorDropperImage, C.className = 'geColorDropper geAdaptiveAsset', C.style.position = 'relative', C.style.right = '-20px', C.style.top = '-1px', C.style.width = 'auto', C.style.height = '14px', mxEvent.addListener(C, 'click', function(K) {
    var P = x;
    'default' == P && (P = n);
    F.value = P;
    F.click();
    mxEvent.consume(K);
  }));
  var G = function(K, P, R) {
      if (!A) {
        var Q = 'null' == e ? null : e;
        A = !0;
        K = /(^#?[a-zA-Z0-9]*$)/.test(K) ? K : Q;
        Q = null != K && K != mxConstants.NONE ? K : Q;
        var ba = document.createElement('div');
        ba.style.width = '21px';
        ba.style.height = '12px';
        ba.style.margin = '2px 18px 2px 3px';
        ba.style.border = '1px solid black';
        ba.style.backgroundColor = 'default' == Q ? n : Q;
        D.innerText = '';
        D.appendChild(ba);
        null != C ? (ba.style.width = '21px', ba.style.margin = '2px 18px 2px 3px', ba.appendChild(C)) : (ba.style.width = '36px', ba.style.margin = '3px');
        null != K && K != mxConstants.NONE && 1 < K.length && 'string' === typeof K && (Q = '#' == K.charAt(0) ? K.substring(1).toUpperCase() : K, Q = ColorDialog.prototype.colorNames[Q], null != Q && D.setAttribute('title', Q));
        null != K && K != mxConstants.NONE ? (m.setAttribute('checked', 'checked'), m.defaultChecked = !0, m.checked = !0) : (m.removeAttribute('checked'), m.defaultChecked = !1, m.checked = !1);
        D.style.display = m.checked || h ? '' : 'none';
        null != d && d('null' == K ? null : K);
        x = K;
        P || (R || h || b() != x) && f('null' == x ? null : x, x);
        A = !1;
      }
    },
    F = document.createElement('input');
  F.setAttribute('type', 'color');
  F.style.visibility = 'hidden';
  F.style.width = '0px';
  F.style.height = '0px';
  F.style.border = 'none';
  u.appendChild(F);
  mxEvent.addListener(F, 'input', function() {
    G(F.value, null, !0);
  });
  D = mxUtils.button('', mxUtils.bind(this, function(K) {
    var P = x;
    'default' == P && (P = n);
    this.editorUi.pickColor(P, function(R) {
      G(R, null, !0);
    }, n);
    mxEvent.consume(K);
  }));
  D.style.position = 'absolute';
  D.style.marginTop = '-3px';
  D.style.left = '178px';
  D.style.height = '22px';
  D.className = 'geColorBtn';
  D.style.display = m.checked || h ? '' : 'none';
  u.appendChild(D);
  a = null != x && 'string' === typeof x && '#' == x.charAt(0) ? x.substring(1).toUpperCase() : x;
  a = ColorDialog.prototype.colorNames[a];
  null != a && D.setAttribute('title', a);
  mxEvent.addListener(u, 'click', function(K) {
    K = mxEvent.getSource(K);
    if (K == m || 'INPUT' != K.nodeName)
      K != m && (m.checked = !m.checked), m.checked || null == x || x == mxConstants.NONE || e == mxConstants.NONE || (e = x), G(m.checked ? e : mxConstants.NONE);
  });
  G(x, !0);
  null != g && (g.install(G), this.listeners.push(g));
  return u;
};
BaseFormatPanel.prototype.createCellColorOption = function(a, b, f, e, g, d) {
  var h = this.editorUi,
    n = h.editor.graph;
  return this.createColorOption(a, function() {
    var u = n.view.getState(h.getSelectionState().cells[0]);
    return null != u ? mxUtils.getValue(u.style, b, null) : null;
  }, function(u, m) {
    n.getModel().beginUpdate();
    try {
      var p = h.getSelectionState().cells;
      n.setCellStyles(b, u, p);
      null != g && g(u);
      h.fireEvent(new mxEventObject('styleChanged', 'keys', [b], 'values', [u], 'cells', p));
    } finally {
      n.getModel().endUpdate();
    }
  }, f || mxConstants.NONE, {
    install: function(u) {
      this.listener = function() {
        var m = n.view.getState(h.getSelectionState().cells[0]);
        null != m && u(mxUtils.getValue(m.style, b, null), !0);
      };
      n.getModel().addListener(mxEvent.CHANGE, this.listener);
    },
    destroy: function() {
      n.getModel().removeListener(this.listener);
    }
  }, e, null, d);
};
BaseFormatPanel.prototype.addArrow = function(a, b, f) {
  b = null != b ? b : 10;
  var e = document.createElement('div');
  e.style.borderLeft = '1px solid #a0a0a0';
  e.style.display = 'inline-block';
  e.style.height = b + 'px';
  e.style.paddingRight = '4px';
  e.style.padding = '6px';
  f ? (e.style.verticalAlign = 'top', e.style.marginLeft = '1px') : (b = 10 - b, 2 == b ? e.style.paddingTop = '6px' : 0 < b ? e.style.paddingTop = 6 - b + 'px' : e.style.marginTop = '-2px');
  b = document.createElement('img');
  b.setAttribute('border', '0');
  b.setAttribute('valign', 'middle');
  b.setAttribute('src', Toolbar.prototype.dropDownImage);
  e.appendChild(b);
  b = e.getElementsByTagName('img')[0];
  b.style.position = 'relative';
  b.style.left = '1px';
  b.style.top = mxClient.IS_FF ? '0px' : '-4px';
  mxUtils.setOpacity(e, 70);
  b = a.getElementsByTagName('div')[0];
  null != b && (b.style.paddingRight = '6px', b.style.marginLeft = '4px', b.style.marginTop = '-1px', b.style.display = 'inline-block', mxUtils.setOpacity(b, 60));
  mxUtils.setOpacity(a, 100);
  a.style.border = '1px solid #a0a0a0';
  a.style.backgroundColor = this.buttonBackgroundColor;
  a.style.backgroundImage = 'none';
  a.style.width = 'auto';
  a.className += ' geColorBtn';
  mxUtils.setPrefixedStyle(a.style, 'borderRadius', '3px');
  a.appendChild(e);
  return b;
};
BaseFormatPanel.prototype.addUnitInput = function(a, b, f, e, g, d, h, n, u) {
  h = null != h ? h : 0;
  b = document.createElement('input');
  b.style.position = 'absolute';
  b.style.textAlign = 'right';
  b.style.marginTop = '-2px';
  b.style.left = 228 - f - e + 'px';
  b.style.width = e + 'px';
  b.style.height = '21px';
  b.style.borderWidth = '1px';
  b.style.borderStyle = 'solid';
  b.style.boxSizing = 'border-box';
  a.appendChild(b);
  e = this.createStepper(b, g, d, null, n, null, u);
  e.style.marginTop = h - 2 + 'px';
  e.style.left = 228 - f + 'px';
  a.appendChild(e);
  return b;
};
BaseFormatPanel.prototype.addGenericInput = function(a, b, f, e, g, d) {
  var h = this.editorUi.editor.graph,
    n = function() {
      d(u.value);
    },
    u = this.addUnitInput(a, b, f, e, n),
    m = mxUtils.bind(this, function(p, x, A) {
      if (A || u != document.activeElement)
        u.value = g() + b;
    });
  mxEvent.addListener(u, 'keydown', function(p) {
    13 == p.keyCode ? (h.container.focus(), mxEvent.consume(p)) : 27 == p.keyCode && (m(null, null, !0), h.container.focus(), mxEvent.consume(p));
  });
  h.getModel().addListener(mxEvent.CHANGE, m);
  this.listeners.push({
    destroy: function() {
      h.getModel().removeListener(m);
    }
  });
  m();
  mxEvent.addListener(u, 'blur', n);
  mxEvent.addListener(u, 'change', n);
  return u;
};
BaseFormatPanel.prototype.createRelativeOption = function(a, b, f, e, g) {
  f = null != f ? f : 52;
  var d = this.editorUi,
    h = d.editor.graph,
    n = this.createPanel();
  n.style.paddingTop = '10px';
  n.style.paddingBottom = '10px';
  mxUtils.write(n, a);
  n.style.fontWeight = 'bold';
  a = mxUtils.bind(this, function(p) {
    if (null != e)
      e(u);
    else {
      var x = parseInt(u.value);
      x = Math.min(100, Math.max(0, isNaN(x) ? 100 : x));
      var A = h.view.getState(d.getSelectionState().cells[0]);
      null != A && x != mxUtils.getValue(A.style, b, 100) && (100 == x && (x = null), A = d.getSelectionState().cells, h.setCellStyles(b, x, A), this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', [b], 'values', [x], 'cells', A)));
      u.value = (null != x ? x : '100') + ' %';
    }
    mxEvent.consume(p);
  });
  var u = this.addUnitInput(n, '%', 16, f, a, 10, mxClient.IS_MAC && mxClient.IS_GC ? -14 : mxClient.IS_WIN ? -16 : -15, null != e);
  if (null != b) {
    var m = mxUtils.bind(this, function(p, x, A) {
      if (A || u != document.activeElement)
        p = d.getSelectionState(), p = parseInt(mxUtils.getValue(p.style, b, 100)), u.value = isNaN(p) ? '' : p + ' %';
    });
    mxEvent.addListener(u, 'keydown', function(p) {
      13 == p.keyCode ? (h.container.focus(), mxEvent.consume(p)) : 27 == p.keyCode && (m(null, null, !0), h.container.focus(), mxEvent.consume(p));
    });
    h.getModel().addListener(mxEvent.CHANGE, m);
    this.listeners.push({
      destroy: function() {
        h.getModel().removeListener(m);
      }
    });
    m();
  }
  mxEvent.addListener(u, 'blur', a);
  mxEvent.addListener(u, 'change', a);
  null != g && g(u);
  return n;
};
BaseFormatPanel.prototype.addLabel = function(a, b, f, e) {
  e = null != e ? e : 61;
  var g = document.createElement('div');
  mxUtils.write(g, b);
  g.style.position = 'absolute';
  g.style.left = 240 - f - e + 'px';
  g.style.width = e + 'px';
  g.style.marginTop = '6px';
  g.style.textAlign = 'center';
  a.appendChild(g);
  return g;
};
BaseFormatPanel.prototype.addKeyHandler = function(a, b) {
  mxEvent.addListener(a, 'keydown', mxUtils.bind(this, function(f) {
    13 == f.keyCode ? (this.editorUi.editor.graph.container.focus(), mxEvent.consume(f)) : 27 == f.keyCode && (null != b && b(null, null, !0), this.editorUi.editor.graph.container.focus(), mxEvent.consume(f));
  }));
};
BaseFormatPanel.prototype.styleButtons = function(a) {
  for (var b = 0; b < a.length; b++)
    mxUtils.setPrefixedStyle(a[b].style, 'borderRadius', '3px'), mxUtils.setOpacity(a[b], 100), a[b].style.border = '1px solid #a0a0a0', a[b].style.padding = '4px', a[b].style.paddingTop = '3px', a[b].style.paddingRight = '1px', a[b].style.margin = '1px', a[b].style.marginRight = '2px', a[b].style.width = '24px', a[b].style.height = '20px', a[b].className += ' geColorBtn';
};
BaseFormatPanel.prototype.destroy = function() {
  if (null != this.listeners) {
    for (var a = 0; a < this.listeners.length; a++)
      this.listeners[a].destroy();
    this.listeners = null;
  }
};