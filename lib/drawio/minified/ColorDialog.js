var ColorDialog = function(a, b, f, e) {
  function g() {
    var G = h.value;
    /(^#?[a-zA-Z0-9]*$)/.test(G) ? ('none' != G && '#' != G.charAt(0) && (G = '#' + G), ColorDialog.addRecentColor('none' != G ? G.substring(1) : G, 12), n(G), a.hideDialog()) : a.handleError({
      message: mxResources.get('invalidInput')
    });
  }

  function d() {
    var G = p(0 == ColorDialog.recentColors.length ? ['FFFFFF'] : ColorDialog.recentColors, 11, 'FFFFFF', !0);
    G.style.marginBottom = '8px';
    return G;
  }
  this.editorUi = a;
  var h = document.createElement('input');
  h.style.marginBottom = '10px';
  mxClient.IS_IE && (h.style.marginTop = '10px', document.body.appendChild(h));
  var n = null != f ? f : this.createApplyFunction();
  this.init = function() {
    mxClient.IS_TOUCH || h.focus();
  };
  var u = new mxJSColor.color(h);
  u.pickerOnfocus = !1;
  u.showPicker();
  f = document.createElement('div');
  mxJSColor.picker.box.style.position = 'relative';
  mxJSColor.picker.box.style.width = '230px';
  mxJSColor.picker.box.style.height = '100px';
  mxJSColor.picker.box.style.paddingBottom = '10px';
  f.appendChild(mxJSColor.picker.box);
  var m = document.createElement('center'),
    p = mxUtils.bind(this, function(G, F, K, P) {
      F = null != F ? F : 12;
      var R = document.createElement('table');
      R.style.borderCollapse = 'collapse';
      R.setAttribute('cellspacing', '0');
      R.style.marginBottom = '20px';
      R.style.cellSpacing = '0px';
      R.style.marginLeft = '1px';
      var Q = document.createElement('tbody');
      R.appendChild(Q);
      for (var ba = G.length / F, V = 0; V < ba; V++) {
        for (var T = document.createElement('tr'), Z = 0; Z < F; Z++)
          mxUtils.bind(this, function(ma) {
            var ja = document.createElement('td');
            ja.style.border = '0px solid black';
            ja.style.padding = '0px';
            ja.style.width = '16px';
            ja.style.height = '16px';
            null == ma && (ma = K);
            if (null != ma) {
              ja.style.borderWidth = '1px';
              'none' == ma ? ja.style.background = 'url(\'' + Dialog.prototype.noColorImage + '\')' : ja.style.backgroundColor = '#' + ma;
              var la = this.colorNames[ma.toUpperCase()];
              null != la && ja.setAttribute('title', la);
            }
            T.appendChild(ja);
            null != ma && (ja.style.cursor = 'pointer', mxEvent.addListener(ja, 'click', function() {
              'none' == ma ? (u.fromString('ffffff'), h.value = 'none') : u.fromString(ma);
            }), mxEvent.addListener(ja, 'dblclick', g));
          })(G[V * F + Z]);
        Q.appendChild(T);
      }
      P && (G = document.createElement('td'), G.setAttribute('title', mxResources.get('reset')), G.style.border = '1px solid black', G.style.padding = '0px', G.style.width = '16px', G.style.height = '16px', G.style.backgroundImage = 'url(\'' + Dialog.prototype.closeImage + '\')', G.style.backgroundPosition = 'center center', G.style.backgroundRepeat = 'no-repeat', G.style.cursor = 'pointer', T.appendChild(G), mxEvent.addListener(G, 'click', function() {
        ColorDialog.resetRecentColors();
        R.parentNode.replaceChild(d(), R);
      }));
      m.appendChild(R);
      return R;
    });
  f.appendChild(h);
  if (mxClient.IS_IE || mxClient.IS_IE11)
    h.style.width = '216px';
  else {
    h.style.width = '182px';
    var x = document.createElement('input');
    x.setAttribute('type', 'color');
    x.style.visibility = 'hidden';
    x.style.width = '0px';
    x.style.height = '0px';
    x.style.border = 'none';
    x.style.marginLeft = '2px';
    f.style.whiteSpace = 'nowrap';
    f.appendChild(x);
    var A = mxUtils.button('', function() {
        document.activeElement == x ? h.focus() : (x.value = '#' + h.value, x.click());
      }),
      C = document.createElement('img');
    C.src = Editor.colorDropperImage;
    C.className = 'geAdaptiveAsset';
    C.style.position = 'relative';
    C.style.verticalAlign = 'middle';
    C.style.width = 'auto';
    C.style.height = '14px';
    A.appendChild(C);
    f.appendChild(A);
    mxEvent.addListener(x, 'input', function() {
      u.fromString(x.value.substring(1));
    });
  }
  mxUtils.br(f);
  d();
  A = p(this.presetColors);
  A.style.marginBottom = '8px';
  A = p(this.defaultColors);
  A.style.marginBottom = '16px';
  f.appendChild(m);
  A = document.createElement('div');
  A.style.textAlign = 'right';
  A.style.whiteSpace = 'nowrap';
  C = mxUtils.button(mxResources.get('cancel'), function() {
    a.hideDialog();
    null != e && e();
  });
  C.className = 'geBtn';
  a.editor.cancelFirst && A.appendChild(C);
  var D = mxUtils.button(mxResources.get('apply'), g);
  D.className = 'geBtn gePrimaryBtn';
  A.appendChild(D);
  a.editor.cancelFirst || A.appendChild(C);
  null != b && ('none' == b ? (u.fromString('ffffff'), h.value = 'none') : u.fromString(b));
  f.appendChild(A);
  this.picker = u;
  this.colorInput = h;
  mxEvent.addListener(f, 'keydown', function(G) {
    27 == G.keyCode && (a.hideDialog(), null != e && e(), mxEvent.consume(G));
  });
  this.container = f;
};
ColorDialog.prototype.presetColors = 'E6D0DE CDA2BE B5739D E1D5E7 C3ABD0 A680B8 D4E1F5 A9C4EB 7EA6E0 D5E8D4 9AC7BF 67AB9F D5E8D4 B9E0A5 97D077 FFF2CC FFE599 FFD966 FFF4C3 FFCE9F FFB570 F8CECC F19C99 EA6B66'.split(' ');
ColorDialog.prototype.colorNames = {};
ColorDialog.prototype.defaultColors = 'none FFFFFF E6E6E6 CCCCCC B3B3B3 999999 808080 666666 4D4D4D 333333 1A1A1A 000000 FFCCCC FFE6CC FFFFCC E6FFCC CCFFCC CCFFE6 CCFFFF CCE5FF CCCCFF E5CCFF FFCCFF FFCCE6 FF9999 FFCC99 FFFF99 CCFF99 99FF99 99FFCC 99FFFF 99CCFF 9999FF CC99FF FF99FF FF99CC FF6666 FFB366 FFFF66 B3FF66 66FF66 66FFB3 66FFFF 66B2FF 6666FF B266FF FF66FF FF66B3 FF3333 FF9933 FFFF33 99FF33 33FF33 33FF99 33FFFF 3399FF 3333FF 9933FF FF33FF FF3399 FF0000 FF8000 FFFF00 80FF00 00FF00 00FF80 00FFFF 007FFF 0000FF 7F00FF FF00FF FF0080 CC0000 CC6600 CCCC00 66CC00 00CC00 00CC66 00CCCC 0066CC 0000CC 6600CC CC00CC CC0066 990000 994C00 999900 4D9900 009900 00994D 009999 004C99 000099 4C0099 990099 99004D 660000 663300 666600 336600 006600 006633 006666 003366 000066 330066 660066 660033 330000 331A00 333300 1A3300 003300 00331A 003333 001933 000033 190033 330033 33001A'.split(' ');
ColorDialog.prototype.createApplyFunction = function() {
  return mxUtils.bind(this, function(a) {
    var b = this.editorUi.editor.graph;
    b.getModel().beginUpdate();
    try {
      b.setCellStyles(this.currentColorKey, a), this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', [this.currentColorKey], 'values', [a], 'cells', b.getSelectionCells()));
    } finally {
      b.getModel().endUpdate();
    }
  });
};
ColorDialog.recentColors = [];
ColorDialog.addRecentColor = function(a, b) {
  null != a && (mxUtils.remove(a, ColorDialog.recentColors), ColorDialog.recentColors.splice(0, 0, a), ColorDialog.recentColors.length >= b && ColorDialog.recentColors.pop());
};
ColorDialog.resetRecentColors = function() {
  ColorDialog.recentColors = [];
};