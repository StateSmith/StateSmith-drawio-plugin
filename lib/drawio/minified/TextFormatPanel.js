TextFormatPanel = function(a, b, f) {
  BaseFormatPanel.call(this, a, b, f);
  this.init();
};
mxUtils.extend(TextFormatPanel, BaseFormatPanel);
TextFormatPanel.prototype.init = function() {
  this.container.style.borderBottom = 'none';
  this.addFont(this.container);
};
TextFormatPanel.prototype.addFont = function(a) {
  function b(ea, Ea) {
    ea.style.backgroundImage = Ea ? Editor.isDarkMode() ? 'linear-gradient(rgb(0 161 241) 0px, rgb(0, 97, 146) 100%)' : 'linear-gradient(#c5ecff 0px,#87d4fb 100%)' : '';
  }
  var f = this.editorUi,
    e = f.editor.graph,
    g = f.getSelectionState(),
    d = this.createTitle(mxResources.get('font'));
  d.style.paddingLeft = '14px';
  d.style.paddingTop = '10px';
  d.style.paddingBottom = '6px';
  a.appendChild(d);
  d = this.createPanel();
  d.style.paddingTop = '2px';
  d.style.paddingBottom = '2px';
  d.style.position = 'relative';
  d.style.marginLeft = '-2px';
  d.style.borderWidth = '0px';
  d.className = 'geToolbarContainer';
  if (e.cellEditor.isContentEditing()) {
    var h = d.cloneNode(),
      n = this.editorUi.toolbar.addMenu(mxResources.get('style'), mxResources.get('style'), !0, 'formatBlock', h, null, !0);
    n.style.color = 'rgb(112, 112, 112)';
    n.style.whiteSpace = 'nowrap';
    n.style.overflow = 'hidden';
    n.style.margin = '0px';
    this.addArrow(n);
    n.style.width = '200px';
    n.style.height = '15px';
    n = n.getElementsByTagName('div')[0];
    n.style.cssFloat = 'right';
    a.appendChild(h);
  }
  a.appendChild(d);
  h = this.createPanel();
  h.style.marginTop = '8px';
  h.style.borderWidth = '1px';
  h.style.borderStyle = 'solid';
  h.style.paddingTop = '6px';
  h.style.paddingBottom = '2px';
  var u = this.editorUi.toolbar.addMenu('Helvetica', mxResources.get('fontFamily'), !0, 'fontFamily', d, null, !0);
  u.style.color = 'rgb(112, 112, 112)';
  u.style.whiteSpace = 'nowrap';
  u.style.overflow = 'hidden';
  u.style.margin = '0px';
  this.addArrow(u);
  u.style.width = '200px';
  u.style.height = '15px';
  n = d.cloneNode(!1);
  n.style.marginLeft = '-3px';
  var m = this.editorUi.toolbar.addItems([
    'bold',
    'italic',
    'underline'
  ], n, !0);
  m[0].setAttribute('title', mxResources.get('bold') + ' (' + this.editorUi.actions.get('bold').shortcut + ')');
  m[1].setAttribute('title', mxResources.get('italic') + ' (' + this.editorUi.actions.get('italic').shortcut + ')');
  m[2].setAttribute('title', mxResources.get('underline') + ' (' + this.editorUi.actions.get('underline').shortcut + ')');
  var p = this.editorUi.toolbar.addItems(['vertical'], n, !0)[0];
  a.appendChild(n);
  this.styleButtons(m);
  this.styleButtons([p]);
  var x = d.cloneNode(!1);
  x.style.marginLeft = '-3px';
  x.style.paddingBottom = '0px';
  var A = function(ea) {
      return function() {
        return ea();
      };
    },
    C = this.editorUi.toolbar.addButton('geSprite-left', mxResources.get('left'), e.cellEditor.isContentEditing() ? function(ea) {
      e.cellEditor.alignText(mxConstants.ALIGN_LEFT, ea);
      f.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ALIGN], 'values', [mxConstants.ALIGN_LEFT], 'cells', g.cells));
    } : A(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_LEFT])), x),
    D = this.editorUi.toolbar.addButton('geSprite-center', mxResources.get('center'), e.cellEditor.isContentEditing() ? function(ea) {
      e.cellEditor.alignText(mxConstants.ALIGN_CENTER, ea);
      f.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ALIGN], 'values', [mxConstants.ALIGN_CENTER], 'cells', g.cells));
    } : A(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_CENTER])), x),
    G = this.editorUi.toolbar.addButton('geSprite-right', mxResources.get('right'), e.cellEditor.isContentEditing() ? function(ea) {
      e.cellEditor.alignText(mxConstants.ALIGN_RIGHT, ea);
      f.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ALIGN], 'values', [mxConstants.ALIGN_RIGHT], 'cells', g.cells));
    } : A(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_RIGHT])), x);
  this.styleButtons([
    C,
    D,
    G
  ]);
  if (e.cellEditor.isContentEditing()) {
    var F = this.editorUi.toolbar.addButton('geSprite-removeformat', mxResources.get('strikethrough'), function() {
      document.execCommand('strikeThrough', !1, null);
    }, n);
    this.styleButtons([F]);
    F.firstChild.style.background = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik0wIDBoMjR2MjRIMFYweiIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9ImIiPjx1c2UgeGxpbms6aHJlZj0iI2EiIG92ZXJmbG93PSJ2aXNpYmxlIi8+PC9jbGlwUGF0aD48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGZpbGw9IiMwMTAxMDEiIGQ9Ik03LjI0IDguNzVjLS4yNi0uNDgtLjM5LTEuMDMtLjM5LTEuNjcgMC0uNjEuMTMtMS4xNi40LTEuNjcuMjYtLjUuNjMtLjkzIDEuMTEtMS4yOS40OC0uMzUgMS4wNS0uNjMgMS43LS44My42Ni0uMTkgMS4zOS0uMjkgMi4xOC0uMjkuODEgMCAxLjU0LjExIDIuMjEuMzQuNjYuMjIgMS4yMy41NCAxLjY5Ljk0LjQ3LjQuODMuODggMS4wOCAxLjQzLjI1LjU1LjM4IDEuMTUuMzggMS44MWgtMy4wMWMwLS4zMS0uMDUtLjU5LS4xNS0uODUtLjA5LS4yNy0uMjQtLjQ5LS40NC0uNjgtLjItLjE5LS40NS0uMzMtLjc1LS40NC0uMy0uMS0uNjYtLjE2LTEuMDYtLjE2LS4zOSAwLS43NC4wNC0xLjAzLjEzLS4yOS4wOS0uNTMuMjEtLjcyLjM2LS4xOS4xNi0uMzQuMzQtLjQ0LjU1LS4xLjIxLS4xNS40My0uMTUuNjYgMCAuNDguMjUuODguNzQgMS4yMS4zOC4yNS43Ny40OCAxLjQxLjdINy4zOWMtLjA1LS4wOC0uMTEtLjE3LS4xNS0uMjV6TTIxIDEydi0ySDN2Mmg5LjYyYy4xOC4wNy40LjE0LjU1LjIuMzcuMTcuNjYuMzQuODcuNTEuMjEuMTcuMzUuMzYuNDMuNTcuMDcuMi4xMS40My4xMS42OSAwIC4yMy0uMDUuNDUtLjE0LjY2LS4wOS4yLS4yMy4zOC0uNDIuNTMtLjE5LjE1LS40Mi4yNi0uNzEuMzUtLjI5LjA4LS42My4xMy0xLjAxLjEzLS40MyAwLS44My0uMDQtMS4xOC0uMTNzLS42Ni0uMjMtLjkxLS40MmMtLjI1LS4xOS0uNDUtLjQ0LS41OS0uNzUtLjE0LS4zMS0uMjUtLjc2LS4yNS0xLjIxSDYuNGMwIC41NS4wOCAxLjEzLjI0IDEuNTguMTYuNDUuMzcuODUuNjUgMS4yMS4yOC4zNS42LjY2Ljk4LjkyLjM3LjI2Ljc4LjQ4IDEuMjIuNjUuNDQuMTcuOS4zIDEuMzguMzkuNDguMDguOTYuMTMgMS40NC4xMy44IDAgMS41My0uMDkgMi4xOC0uMjhzMS4yMS0uNDUgMS42Ny0uNzljLjQ2LS4zNC44Mi0uNzcgMS4wNy0xLjI3cy4zOC0xLjA3LjM4LTEuNzFjMC0uNi0uMS0xLjE0LS4zMS0xLjYxLS4wNS0uMTEtLjExLS4yMy0uMTctLjMzSDIxeiIvPjwvc3ZnPg==)';
    F.firstChild.style.backgroundPosition = '2px 2px';
    F.firstChild.style.backgroundSize = '18px 18px';
    this.styleButtons([F]);
  }
  var K = this.editorUi.toolbar.addButton('geSprite-top', mxResources.get('top'), A(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_TOP])), x),
    P = this.editorUi.toolbar.addButton('geSprite-middle', mxResources.get('middle'), A(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_MIDDLE])), x),
    R = this.editorUi.toolbar.addButton('geSprite-bottom', mxResources.get('bottom'), A(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_BOTTOM])), x);
  this.styleButtons([
    K,
    P,
    R
  ]);
  a.appendChild(x);
  var Q, ba, V, T, Z;
  if (e.cellEditor.isContentEditing()) {
    K.style.display = 'none';
    P.style.display = 'none';
    R.style.display = 'none';
    p.style.display = 'none';
    var ma = this.editorUi.toolbar.addButton('geSprite-justifyfull', mxResources.get('block'), function() {
      1 == ma.style.opacity && document.execCommand('justifyfull', !1, null);
    }, x);
    ma.style.marginRight = '9px';
    ma.style.opacity = 1;
    this.styleButtons([
      ma,
      Q = this.editorUi.toolbar.addButton('geSprite-subscript', mxResources.get('subscript') + ' (' + Editor.ctrlKey + '+,)', function() {
        document.execCommand('subscript', !1, null);
      }, x),
      ba = this.editorUi.toolbar.addButton('geSprite-superscript', mxResources.get('superscript') + ' (' + Editor.ctrlKey + '+.)', function() {
        document.execCommand('superscript', !1, null);
      }, x)
    ]);
    Q.style.marginLeft = '10px';
    A = x.cloneNode(!1);
    A.style.paddingTop = '4px';
    x = [
      this.editorUi.toolbar.addButton('geSprite-orderedlist', mxResources.get('numberedList'), function() {
        document.execCommand('insertorderedlist', !1, null);
      }, A),
      this.editorUi.toolbar.addButton('geSprite-unorderedlist', mxResources.get('bulletedList'), function() {
        document.execCommand('insertunorderedlist', !1, null);
      }, A),
      this.editorUi.toolbar.addButton('geSprite-outdent', mxResources.get('decreaseIndent'), function() {
        document.execCommand('outdent', !1, null);
      }, A),
      this.editorUi.toolbar.addButton('geSprite-indent', mxResources.get('increaseIndent'), function() {
        document.execCommand('indent', !1, null);
      }, A),
      this.editorUi.toolbar.addButton('geSprite-removeformat', mxResources.get('removeFormat'), function() {
        document.execCommand('removeformat', !1, null);
      }, A),
      this.editorUi.toolbar.addButton('geSprite-code', mxResources.get('html'), function() {
        e.cellEditor.toggleViewMode();
      }, A)
    ];
    this.styleButtons(x);
    x[x.length - 2].style.marginLeft = '10px';
    a.appendChild(A);
  } else
    m[2].style.marginRight = '12px', G.style.marginRight = '12px';
  x = d.cloneNode(!1);
  x.style.marginLeft = '0px';
  x.style.paddingTop = '8px';
  x.style.paddingBottom = '4px';
  x.style.fontWeight = 'normal';
  mxUtils.write(x, mxResources.get('position'));
  var ja = document.createElement('select');
  ja.style.position = 'absolute';
  ja.style.left = '126px';
  ja.style.width = '98px';
  ja.style.borderWidth = '1px';
  ja.style.borderStyle = 'solid';
  ja.style.marginTop = '-3px';
  F = 'topLeft top topRight left center right bottomLeft bottom bottomRight'.split(' ');
  var la = {
    topLeft: [
      mxConstants.ALIGN_LEFT,
      mxConstants.ALIGN_TOP,
      mxConstants.ALIGN_RIGHT,
      mxConstants.ALIGN_BOTTOM
    ],
    top: [
      mxConstants.ALIGN_CENTER,
      mxConstants.ALIGN_TOP,
      mxConstants.ALIGN_CENTER,
      mxConstants.ALIGN_BOTTOM
    ],
    topRight: [
      mxConstants.ALIGN_RIGHT,
      mxConstants.ALIGN_TOP,
      mxConstants.ALIGN_LEFT,
      mxConstants.ALIGN_BOTTOM
    ],
    left: [
      mxConstants.ALIGN_LEFT,
      mxConstants.ALIGN_MIDDLE,
      mxConstants.ALIGN_RIGHT,
      mxConstants.ALIGN_MIDDLE
    ],
    center: [
      mxConstants.ALIGN_CENTER,
      mxConstants.ALIGN_MIDDLE,
      mxConstants.ALIGN_CENTER,
      mxConstants.ALIGN_MIDDLE
    ],
    right: [
      mxConstants.ALIGN_RIGHT,
      mxConstants.ALIGN_MIDDLE,
      mxConstants.ALIGN_LEFT,
      mxConstants.ALIGN_MIDDLE
    ],
    bottomLeft: [
      mxConstants.ALIGN_LEFT,
      mxConstants.ALIGN_BOTTOM,
      mxConstants.ALIGN_RIGHT,
      mxConstants.ALIGN_TOP
    ],
    bottom: [
      mxConstants.ALIGN_CENTER,
      mxConstants.ALIGN_BOTTOM,
      mxConstants.ALIGN_CENTER,
      mxConstants.ALIGN_TOP
    ],
    bottomRight: [
      mxConstants.ALIGN_RIGHT,
      mxConstants.ALIGN_BOTTOM,
      mxConstants.ALIGN_LEFT,
      mxConstants.ALIGN_TOP
    ]
  };
  for (A = 0; A < F.length; A++) {
    var N = document.createElement('option');
    N.setAttribute('value', F[A]);
    mxUtils.write(N, mxResources.get(F[A]));
    ja.appendChild(N);
  }
  x.appendChild(ja);
  F = d.cloneNode(!1);
  F.style.marginLeft = '0px';
  F.style.paddingTop = '4px';
  F.style.paddingBottom = '4px';
  F.style.fontWeight = 'normal';
  mxUtils.write(F, mxResources.get('writingDirection'));
  var X = document.createElement('select');
  X.style.position = 'absolute';
  X.style.borderWidth = '1px';
  X.style.borderStyle = 'solid';
  X.style.left = '126px';
  X.style.width = '98px';
  X.style.marginTop = '-3px';
  N = [
    'automatic',
    'leftToRight',
    'rightToLeft'
  ];
  var L = {
    automatic: null,
    leftToRight: mxConstants.TEXT_DIRECTION_LTR,
    rightToLeft: mxConstants.TEXT_DIRECTION_RTL
  };
  for (A = 0; A < N.length; A++) {
    var S = document.createElement('option');
    S.setAttribute('value', N[A]);
    mxUtils.write(S, mxResources.get(N[A]));
    X.appendChild(S);
  }
  F.appendChild(X);
  e.isEditing() || (a.appendChild(x), mxEvent.addListener(ja, 'change', function(ea) {
    e.getModel().beginUpdate();
    try {
      var Ea = la[ja.value];
      null != Ea && (e.setCellStyles(mxConstants.STYLE_LABEL_POSITION, Ea[0], g.cells), e.setCellStyles(mxConstants.STYLE_VERTICAL_LABEL_POSITION, Ea[1], g.cells), e.setCellStyles(mxConstants.STYLE_ALIGN, Ea[2], g.cells), e.setCellStyles(mxConstants.STYLE_VERTICAL_ALIGN, Ea[3], g.cells));
    } finally {
      e.getModel().endUpdate();
    }
    mxEvent.consume(ea);
  }), a.appendChild(F), mxEvent.addListener(X, 'change', function(ea) {
    e.setCellStyles(mxConstants.STYLE_TEXT_DIRECTION, L[X.value], g.cells);
    mxEvent.consume(ea);
  }));
  var I = document.createElement('input');
  I.style.position = 'absolute';
  I.style.borderWidth = '1px';
  I.style.borderStyle = 'solid';
  I.style.textAlign = 'right';
  I.style.marginTop = '4px';
  I.style.left = '161px';
  I.style.width = '53px';
  I.style.height = '23px';
  I.style.boxSizing = 'border-box';
  n.appendChild(I);
  var Y = null;
  x = this.installInputHandler(I, mxConstants.STYLE_FONTSIZE, Menus.prototype.defaultFontSize, 1, 999, ' pt', function(ea) {
    if (window.getSelection && !mxClient.IS_IE && !mxClient.IS_IE11) {
      var Ea = function(B, E) {
          null != e.cellEditor.textarea && B != e.cellEditor.textarea && e.cellEditor.textarea.contains(B) && (E || Fa.containsNode(B, !0)) && ('FONT' == B.nodeName ? (B.removeAttribute('size'), B.style.fontSize = ea + 'px') : mxUtils.getCurrentStyle(B).fontSize != ea + 'px' && (mxUtils.getCurrentStyle(B.parentNode).fontSize != ea + 'px' ? B.style.fontSize = ea + 'px' : B.style.fontSize = ''));
          f.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_FONTSIZE], 'values', [ea], 'cells', g.cells));
        },
        Fa = window.getSelection(),
        t = 0 < Fa.rangeCount ? Fa.getRangeAt(0).commonAncestorContainer : e.cellEditor.textarea;
      t != e.cellEditor.textarea && t.nodeType == mxConstants.NODETYPE_ELEMENT || document.execCommand('fontSize', !1, '1');
      t != e.cellEditor.textarea && (t = t.parentNode);
      if (null != t && t.nodeType == mxConstants.NODETYPE_ELEMENT) {
        var z = t.getElementsByTagName('*');
        Ea(t);
        for (t = 0; t < z.length; t++)
          Ea(z[t]);
      }
      I.value = ea + ' pt';
    } else if (window.getSelection || document.selection)
      if (Ea = function(B, E) {
          for (; null != E;) {
            if (E === B)
              return !0;
            E = E.parentNode;
          }
          return !1;
        }, z = null, document.selection ? z = document.selection.createRange().parentElement() : (Fa = window.getSelection(), 0 < Fa.rangeCount && (z = Fa.getRangeAt(0).commonAncestorContainer)), null != z && Ea(e.cellEditor.textarea, z))
        for (Y = ea, document.execCommand('fontSize', !1, '4'), z = e.cellEditor.textarea.getElementsByTagName('font'), t = 0; t < z.length; t++)
          if ('4' == z[t].getAttribute('size')) {
            z[t].removeAttribute('size');
            z[t].style.fontSize = Y + 'px';
            window.setTimeout(function() {
              I.value = Y + ' pt';
              Y = null;
            }, 0);
            break;
          }
  }, !0);
  x = this.createStepper(I, x, 1, 10, !0, Menus.prototype.defaultFontSize);
  x.style.display = I.style.display;
  x.style.marginTop = '4px';
  x.style.left = '214px';
  n.appendChild(x);
  n = u.getElementsByTagName('div')[0];
  n.style.cssFloat = 'right';
  var ia = null,
    ka = e.shapeBackgroundColor,
    U = null,
    ca = e.shapeForegroundColor,
    ra = e.cellEditor.isContentEditing() ? this.createColorOption(mxResources.get('backgroundColor'), function() {
      return ka;
    }, function(ea) {
      document.execCommand('backcolor', !1, ea != mxConstants.NONE ? ea : 'transparent');
      f.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR], 'values', [ea], 'cells', g.cells));
    }, e.shapeBackgroundColor, {
      install: function(ea) {
        ia = ea;
      },
      destroy: function() {
        ia = null;
      }
    }, null, !0) : this.createCellColorOption(mxResources.get('backgroundColor'), mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, 'default', null, function(ea) {
      e.updateLabelElements(g.cells, function(Ea) {
        Ea.style.backgroundColor = null;
      });
    }, e.shapeBackgroundColor);
  ra.style.fontWeight = 'bold';
  var ua = this.createCellColorOption(mxResources.get('borderColor'), mxConstants.STYLE_LABEL_BORDERCOLOR, 'default', null, null, e.shapeForegroundColor);
  ua.style.fontWeight = 'bold';
  n = 1 <= g.vertices.length ? e.stylesheet.getDefaultVertexStyle() : e.stylesheet.getDefaultEdgeStyle();
  n = e.cellEditor.isContentEditing() ? this.createColorOption(mxResources.get('fontColor'), function() {
    return ca;
  }, function(ea) {
    if (mxClient.IS_FF) {
      for (var Ea = e.cellEditor.textarea.getElementsByTagName('font'), Fa = [], t = 0; t < Ea.length; t++)
        Fa.push({
          node: Ea[t],
          color: Ea[t].getAttribute('color')
        });
      document.execCommand('forecolor', !1, ea != mxConstants.NONE ? ea : 'transparent');
      f.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_FONTCOLOR], 'values', [ea], 'cells', g.cells));
      ea = e.cellEditor.textarea.getElementsByTagName('font');
      for (t = 0; t < ea.length; t++)
        if (t >= Fa.length || ea[t] != Fa[t].node || ea[t] == Fa[t].node && ea[t].getAttribute('color') != Fa[t].color) {
          Fa = ea[t].firstChild;
          if (null != Fa && 'A' == Fa.nodeName && null == Fa.nextSibling && null != Fa.firstChild) {
            ea[t].parentNode.insertBefore(Fa, ea[t]);
            for (Ea = Fa.firstChild; null != Ea;) {
              var z = Ea.nextSibling;
              ea[t].appendChild(Ea);
              Ea = z;
            }
            Fa.appendChild(ea[t]);
          }
          break;
        }
    } else
      document.execCommand('forecolor', !1, ea != mxConstants.NONE ? ea : 'transparent'), f.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_FONTCOLOR], 'values', [ea], 'cells', g.cells));
  }, null != n[mxConstants.STYLE_FONTCOLOR] ? n[mxConstants.STYLE_FONTCOLOR] : e.shapeForegroundColor, {
    install: function(ea) {
      U = ea;
    },
    destroy: function() {
      U = null;
    }
  }, null, !0) : this.createCellColorOption(mxResources.get('fontColor'), mxConstants.STYLE_FONTCOLOR, 'default', function(ea) {
    ra.style.display = ea == mxConstants.NONE ? 'none' : '';
    ua.style.display = ra.style.display;
  }, function(ea) {
    ea == mxConstants.NONE ? e.setCellStyles(mxConstants.STYLE_NOLABEL, '1', g.cells) : e.setCellStyles(mxConstants.STYLE_NOLABEL, null, g.cells);
    e.setCellStyles(mxConstants.STYLE_FONTCOLOR, ea, g.cells);
    e.updateLabelElements(g.cells, function(Ea) {
      Ea.removeAttribute('color');
      Ea.style.color = null;
    });
  }, e.shapeForegroundColor);
  n.style.fontWeight = 'bold';
  h.appendChild(n);
  h.appendChild(ra);
  e.cellEditor.isContentEditing() || h.appendChild(ua);
  a.appendChild(h);
  h = this.createPanel();
  h.style.paddingTop = '2px';
  h.style.paddingBottom = '4px';
  n = e.filterSelectionCells(mxUtils.bind(this, function(ea) {
    var Ea = e.view.getState(ea);
    return null == Ea || e.isAutoSizeState(Ea) || e.getModel().isEdge(ea) || !e.isTableRow(ea) && !e.isTableCell(ea) && !e.isCellResizable(ea);
  }));
  x = this.createCellOption(mxResources.get('wordWrap'), mxConstants.STYLE_WHITE_SPACE, null, 'wrap', 'null', null, null, !0, n);
  x.style.fontWeight = 'bold';
  0 < n.length && h.appendChild(x);
  n = this.createCellOption(mxResources.get('formattedText'), 'html', 0, null, null, null, f.actions.get('formattedText'));
  n.style.fontWeight = 'bold';
  h.appendChild(n);
  n = this.createPanel();
  n.style.paddingTop = '10px';
  n.style.paddingBottom = '28px';
  n.style.fontWeight = 'normal';
  x = document.createElement('div');
  x.style.position = 'absolute';
  x.style.width = '70px';
  x.style.marginTop = '0px';
  x.style.fontWeight = 'bold';
  mxUtils.write(x, mxResources.get('spacing'));
  n.appendChild(x);
  var Ga = this.addUnitInput(n, 'pt', 87, 52, function() {
      $a.apply(this, arguments);
    }),
    Ia = this.addUnitInput(n, 'pt', 16, 52, function() {
      bb.apply(this, arguments);
    });
  mxUtils.br(n);
  this.addLabel(n, mxResources.get('top'), 87);
  this.addLabel(n, mxResources.get('global'), 16);
  mxUtils.br(n);
  mxUtils.br(n);
  var wa = this.addUnitInput(n, 'pt', 158, 52, function() {
      lb.apply(this, arguments);
    }),
    Ca = this.addUnitInput(n, 'pt', 87, 52, function() {
      ab.apply(this, arguments);
    }),
    ta = this.addUnitInput(n, 'pt', 16, 52, function() {
      Wa.apply(this, arguments);
    });
  mxUtils.br(n);
  this.addLabel(n, mxResources.get('left'), 158);
  this.addLabel(n, mxResources.get('bottom'), 87);
  this.addLabel(n, mxResources.get('right'), 16);
  if (e.cellEditor.isContentEditing()) {
    var Ha = null,
      Va = null;
    a.appendChild(this.createRelativeOption(mxResources.get('lineheight'), null, null, function(ea) {
      var Ea = '' == ea.value ? 120 : parseInt(ea.value);
      Ea = Math.max(0, isNaN(Ea) ? 120 : Ea);
      null != Ha && (e.cellEditor.restoreSelection(Ha), Ha = null);
      var Fa = e.getSelectedTextBlocks();
      0 == Fa.length && null != e.cellEditor.textarea.firstChild && ('P' != e.cellEditor.textarea.firstChild.nodeName && (e.cellEditor.textarea.innerHTML = '<p>' + e.cellEditor.textarea.innerHTML + '</p>'), Fa = [e.cellEditor.textarea.firstChild]);
      for (var t = 0; t < Fa.length; t++)
        Fa[t].style.lineHeight = Ea + '%';
      ea.value = Ea + ' %';
    }, function(ea) {
      Va = ea;
      mxEvent.addListener(ea, 'mousedown', function() {
        document.activeElement == e.cellEditor.textarea && (Ha = e.cellEditor.saveSelection());
      });
      mxEvent.addListener(ea, 'touchstart', function() {
        document.activeElement == e.cellEditor.textarea && (Ha = e.cellEditor.saveSelection());
      });
      ea.value = '120 %';
    }));
    h = d.cloneNode(!1);
    h.style.paddingLeft = '0px';
    n = this.editorUi.toolbar.addItems([
      'link',
      'image'
    ], h, !0);
    x = [
      this.editorUi.toolbar.addButton('geSprite-horizontalrule', mxResources.get('insertHorizontalRule'), function() {
        document.execCommand('inserthorizontalrule', !1);
      }, h),
      this.editorUi.toolbar.addMenuFunctionInContainer(h, 'geSprite-table', mxResources.get('table'), !1, mxUtils.bind(this, function(ea) {
        this.editorUi.menus.addInsertTableItem(ea, null, null, !1);
      }))
    ];
    this.styleButtons(n);
    this.styleButtons(x);
    n = this.createPanel();
    n.style.paddingTop = '10px';
    n.style.paddingBottom = '10px';
    n.appendChild(this.createTitle(mxResources.get('insert')));
    n.appendChild(h);
    a.appendChild(n);
    n = d.cloneNode(!1);
    n.style.paddingLeft = '0px';
    x = [
      this.editorUi.toolbar.addButton('geSprite-insertcolumnbefore', mxResources.get('insertColumnBefore'), mxUtils.bind(this, function() {
        try {
          null != V && e.insertColumn(V, null != T ? T.cellIndex : 0);
        } catch (ea) {
          this.editorUi.handleError(ea);
        }
      }), n),
      this.editorUi.toolbar.addButton('geSprite-insertcolumnafter', mxResources.get('insertColumnAfter'), mxUtils.bind(this, function() {
        try {
          null != V && e.insertColumn(V, null != T ? T.cellIndex + 1 : -1);
        } catch (ea) {
          this.editorUi.handleError(ea);
        }
      }), n),
      this.editorUi.toolbar.addButton('geSprite-deletecolumn', mxResources.get('deleteColumn'), mxUtils.bind(this, function() {
        try {
          null != V && null != T && e.deleteColumn(V, T.cellIndex);
        } catch (ea) {
          this.editorUi.handleError(ea);
        }
      }), n),
      this.editorUi.toolbar.addButton('geSprite-insertrowbefore', mxResources.get('insertRowBefore'), mxUtils.bind(this, function() {
        try {
          null != V && null != Z && e.insertRow(V, Z.sectionRowIndex);
        } catch (ea) {
          this.editorUi.handleError(ea);
        }
      }), n),
      this.editorUi.toolbar.addButton('geSprite-insertrowafter', mxResources.get('insertRowAfter'), mxUtils.bind(this, function() {
        try {
          null != V && null != Z && e.insertRow(V, Z.sectionRowIndex + 1);
        } catch (ea) {
          this.editorUi.handleError(ea);
        }
      }), n),
      this.editorUi.toolbar.addButton('geSprite-deleterow', mxResources.get('deleteRow'), mxUtils.bind(this, function() {
        try {
          null != V && null != Z && e.deleteRow(V, Z.sectionRowIndex);
        } catch (ea) {
          this.editorUi.handleError(ea);
        }
      }), n)
    ];
    this.styleButtons(x);
    x[2].style.marginRight = '10px';
    h = this.createPanel();
    h.style.paddingTop = '10px';
    h.style.paddingBottom = '10px';
    h.appendChild(this.createTitle(mxResources.get('table')));
    h.appendChild(n);
    d = d.cloneNode(!1);
    d.style.paddingLeft = '0px';
    x = [
      this.editorUi.toolbar.addButton('geSprite-strokecolor', mxResources.get('borderColor'), mxUtils.bind(this, function(ea) {
        if (null != V) {
          var Ea = V.style.borderColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function(Fa, t, z, B) {
            return '#' + ('0' + Number(t).toString(16)).substr(-2) + ('0' + Number(z).toString(16)).substr(-2) + ('0' + Number(B).toString(16)).substr(-2);
          });
          this.editorUi.pickColor(Ea, function(Fa) {
            var t = null == T || null != ea && mxEvent.isShiftDown(ea) ? V : T;
            e.processElements(t, function(z) {
              z.style.border = null;
            });
            null == Fa || Fa == mxConstants.NONE ? (t.removeAttribute('border'), t.style.border = '', t.style.borderCollapse = '') : (t.setAttribute('border', '1'), t.style.border = '1px solid ' + Fa, t.style.borderCollapse = 'collapse');
          });
        }
      }), d),
      this.editorUi.toolbar.addButton('geSprite-fillcolor', mxResources.get('backgroundColor'), mxUtils.bind(this, function(ea) {
        if (null != V) {
          var Ea = V.style.backgroundColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function(Fa, t, z, B) {
            return '#' + ('0' + Number(t).toString(16)).substr(-2) + ('0' + Number(z).toString(16)).substr(-2) + ('0' + Number(B).toString(16)).substr(-2);
          });
          this.editorUi.pickColor(Ea, function(Fa) {
            var t = null == T || null != ea && mxEvent.isShiftDown(ea) ? V : T;
            e.processElements(t, function(z) {
              z.style.backgroundColor = null;
            });
            t.style.backgroundColor = null == Fa || Fa == mxConstants.NONE ? '' : Fa;
          });
        }
      }), d),
      this.editorUi.toolbar.addButton('geSprite-fit', mxResources.get('spacing'), function() {
        if (null != V) {
          var ea = V.getAttribute('cellPadding') || 0;
          ea = new FilenameDialog(f, ea, mxResources.get('apply'), mxUtils.bind(this, function(Ea) {
            null != Ea && 0 < Ea.length ? V.setAttribute('cellPadding', Ea) : V.removeAttribute('cellPadding');
          }), mxResources.get('spacing'));
          f.showDialog(ea.container, 300, 80, !0, !0);
          ea.init();
        }
      }, d),
      this.editorUi.toolbar.addButton('geSprite-left', mxResources.get('left'), function() {
        null != V && V.setAttribute('align', 'left');
      }, d),
      this.editorUi.toolbar.addButton('geSprite-center', mxResources.get('center'), function() {
        null != V && V.setAttribute('align', 'center');
      }, d),
      this.editorUi.toolbar.addButton('geSprite-right', mxResources.get('right'), function() {
        null != V && V.setAttribute('align', 'right');
      }, d)
    ];
    this.styleButtons(x);
    x[2].style.marginRight = '10px';
    h.appendChild(d);
    a.appendChild(h);
    var fb = h;
  } else
    a.appendChild(h), a.appendChild(this.createRelativeOption(mxResources.get('opacity'), mxConstants.STYLE_TEXT_OPACITY)), a.appendChild(n);
  for (A = 0; 3 > A; A++)
    (function(ea) {
      mxEvent.addListener(m[ea], 'click', function() {
        b(m[ea], '' == m[ea].style.backgroundImage);
      });
    }(A));
  var Ua = mxUtils.bind(this, function(ea, Ea, Fa) {
    g = f.getSelectionState();
    ea = mxUtils.getValue(g.style, mxConstants.STYLE_FONTSTYLE, 0);
    b(m[0], (ea & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD);
    b(m[1], (ea & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC);
    b(m[2], (ea & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE);
    u.firstChild.nodeValue = mxUtils.getValue(g.style, mxConstants.STYLE_FONTFAMILY, Menus.prototype.defaultFont);
    b(p, '0' == mxUtils.getValue(g.style, mxConstants.STYLE_HORIZONTAL, '1'));
    if (Fa || document.activeElement != I)
      ea = parseFloat(mxUtils.getValue(g.style, mxConstants.STYLE_FONTSIZE, Menus.prototype.defaultFontSize)), I.value = isNaN(ea) ? '' : ea + ' pt';
    ea = mxUtils.getValue(g.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER);
    b(C, ea == mxConstants.ALIGN_LEFT);
    b(D, ea == mxConstants.ALIGN_CENTER);
    b(G, ea == mxConstants.ALIGN_RIGHT);
    ea = mxUtils.getValue(g.style, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
    b(K, ea == mxConstants.ALIGN_TOP);
    b(P, ea == mxConstants.ALIGN_MIDDLE);
    b(R, ea == mxConstants.ALIGN_BOTTOM);
    ea = mxUtils.getValue(g.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
    Ea = mxUtils.getValue(g.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);
    ja.value = ea == mxConstants.ALIGN_LEFT && Ea == mxConstants.ALIGN_TOP ? 'topLeft' : ea == mxConstants.ALIGN_CENTER && Ea == mxConstants.ALIGN_TOP ? 'top' : ea == mxConstants.ALIGN_RIGHT && Ea == mxConstants.ALIGN_TOP ? 'topRight' : ea == mxConstants.ALIGN_LEFT && Ea == mxConstants.ALIGN_BOTTOM ? 'bottomLeft' : ea == mxConstants.ALIGN_CENTER && Ea == mxConstants.ALIGN_BOTTOM ? 'bottom' : ea == mxConstants.ALIGN_RIGHT && Ea == mxConstants.ALIGN_BOTTOM ? 'bottomRight' : ea == mxConstants.ALIGN_LEFT ? 'left' : ea == mxConstants.ALIGN_RIGHT ? 'right' : 'center';
    ea = mxUtils.getValue(g.style, mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION);
    ea == mxConstants.TEXT_DIRECTION_RTL ? X.value = 'rightToLeft' : ea == mxConstants.TEXT_DIRECTION_LTR ? X.value = 'leftToRight' : ea == mxConstants.TEXT_DIRECTION_AUTO && (X.value = 'automatic');
    if (Fa || document.activeElement != Ia)
      ea = parseFloat(mxUtils.getValue(g.style, mxConstants.STYLE_SPACING, 2)), Ia.value = isNaN(ea) ? '' : ea + ' pt';
    if (Fa || document.activeElement != Ga)
      ea = parseFloat(mxUtils.getValue(g.style, mxConstants.STYLE_SPACING_TOP, 0)), Ga.value = isNaN(ea) ? '' : ea + ' pt';
    if (Fa || document.activeElement != ta)
      ea = parseFloat(mxUtils.getValue(g.style, mxConstants.STYLE_SPACING_RIGHT, 0)), ta.value = isNaN(ea) ? '' : ea + ' pt';
    if (Fa || document.activeElement != Ca)
      ea = parseFloat(mxUtils.getValue(g.style, mxConstants.STYLE_SPACING_BOTTOM, 0)), Ca.value = isNaN(ea) ? '' : ea + ' pt';
    if (Fa || document.activeElement != wa)
      ea = parseFloat(mxUtils.getValue(g.style, mxConstants.STYLE_SPACING_LEFT, 0)), wa.value = isNaN(ea) ? '' : ea + ' pt';
  });
  var bb = this.installInputHandler(Ia, mxConstants.STYLE_SPACING, 2, -999, 999, ' pt');
  var $a = this.installInputHandler(Ga, mxConstants.STYLE_SPACING_TOP, 0, -999, 999, ' pt');
  var Wa = this.installInputHandler(ta, mxConstants.STYLE_SPACING_RIGHT, 0, -999, 999, ' pt');
  var ab = this.installInputHandler(Ca, mxConstants.STYLE_SPACING_BOTTOM, 0, -999, 999, ' pt');
  var lb = this.installInputHandler(wa, mxConstants.STYLE_SPACING_LEFT, 0, -999, 999, ' pt');
  this.addKeyHandler(I, Ua);
  this.addKeyHandler(Ia, Ua);
  this.addKeyHandler(Ga, Ua);
  this.addKeyHandler(ta, Ua);
  this.addKeyHandler(Ca, Ua);
  this.addKeyHandler(wa, Ua);
  e.getModel().addListener(mxEvent.CHANGE, Ua);
  this.listeners.push({
    destroy: function() {
      e.getModel().removeListener(Ua);
    }
  });
  Ua();
  if (e.cellEditor.isContentEditing()) {
    var db = !1;
    d = function() {
      db || (db = !0, window.setTimeout(function() {
        var ea = e.getSelectedEditingElement();
        if (null != ea) {
          var Ea = function(fa, sa) {
              if (null != fa && null != sa) {
                if (fa == sa)
                  return !0;
                if (fa.length > sa.length + 1)
                  return fa.substring(fa.length - sa.length - 1, fa.length) == '-' + sa;
              }
              return !1;
            },
            Fa = function(fa) {
              if (null != e.getParentByName(ea, fa, e.cellEditor.textarea))
                return !0;
              for (var sa = ea; null != sa && 1 == sa.childNodes.length;)
                if (sa = sa.childNodes[0], sa.nodeName == fa)
                  return !0;
              return !1;
            },
            t = function(fa) {
              fa = null != fa ? fa.fontSize : null;
              return null != fa && 'px' == fa.substring(fa.length - 2) ? parseFloat(fa) : mxConstants.DEFAULT_FONTSIZE;
            },
            z = function(fa, sa, Ja) {
              return null != Ja.style && null != sa ? (sa = sa.lineHeight, null != Ja.style.lineHeight && '%' == Ja.style.lineHeight.substring(Ja.style.lineHeight.length - 1) ? parseInt(Ja.style.lineHeight) / 100 : 'px' == sa.substring(sa.length - 2) ? parseFloat(sa) / fa : parseInt(sa)) : '';
            },
            B = mxUtils.getCurrentStyle(ea),
            E = t(B),
            J = z(E, B, ea),
            M = ea.getElementsByTagName('*');
          if (0 < M.length && window.getSelection && !mxClient.IS_IE && !mxClient.IS_IE11)
            for (var W = window.getSelection(), ha = 0; ha < M.length; ha++)
              if (W.containsNode(M[ha], !0)) {
                temp = mxUtils.getCurrentStyle(M[ha]);
                E = Math.max(t(temp), E);
                var da = z(E, temp, M[ha]);
                if (da != J || isNaN(da))
                  J = '';
              }
          null != B && (b(m[0], 'bold' == B.fontWeight || 400 < B.fontWeight || Fa('B') || Fa('STRONG')), b(m[1], 'italic' == B.fontStyle || Fa('I') || Fa('EM')), b(m[2], Fa('U')), b(ba, Fa('SUP')), b(Q, Fa('SUB')), e.cellEditor.isTableSelected() ? (b(ma, Ea(B.textAlign, 'justify')), b(C, Ea(B.textAlign, 'left')), b(D, Ea(B.textAlign, 'center')), b(G, Ea(B.textAlign, 'right'))) : (Fa = e.cellEditor.align || mxUtils.getValue(g.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER), Ea(B.textAlign, 'justify') ? (b(ma, Ea(B.textAlign, 'justify')), b(C, !1), b(D, !1), b(G, !1)) : (b(ma, !1), b(C, Fa == mxConstants.ALIGN_LEFT), b(D, Fa == mxConstants.ALIGN_CENTER), b(G, Fa == mxConstants.ALIGN_RIGHT))), V = e.getParentByName(ea, 'TABLE', e.cellEditor.textarea), Z = null == V ? null : e.getParentByName(ea, 'TR', V), T = null == V ? null : e.getParentByNames(ea, [
            'TD',
            'TH'
          ], V), fb.style.display = null != V ? '' : 'none', document.activeElement != I && ('FONT' == ea.nodeName && '4' == ea.getAttribute('size') && null != Y ? (ea.removeAttribute('size'), ea.style.fontSize = Y + ' pt', Y = null) : I.value = isNaN(E) ? '' : E + ' pt', da = parseFloat(J), isNaN(da) ? Va.value = '100 %' : Va.value = Math.round(100 * da) + ' %'), null != U && (ca = 'rgba(0, 0, 0, 0)' == B.color || 'transparent' == B.color ? mxConstants.NONE : mxUtils.rgba2hex(B.color), U(ca, !0)), null != ia && (ka = 'rgba(0, 0, 0, 0)' == B.backgroundColor || 'transparent' == B.backgroundColor ? mxConstants.NONE : mxUtils.rgba2hex(B.backgroundColor), ia(ka, !0)), null != u.firstChild && (u.firstChild.nodeValue = Graph.stripQuotes(B.fontFamily)));
        }
        db = !1;
      }, 0));
    };
    (mxClient.IS_FF || mxClient.IS_EDGE || mxClient.IS_IE || mxClient.IS_IE11) && mxEvent.addListener(e.cellEditor.textarea, 'DOMSubtreeModified', d);
    mxEvent.addListener(e.cellEditor.textarea, 'input', d);
    mxEvent.addListener(e.cellEditor.textarea, 'touchend', d);
    mxEvent.addListener(e.cellEditor.textarea, 'mouseup', d);
    mxEvent.addListener(e.cellEditor.textarea, 'keyup', d);
    this.listeners.push({
      destroy: function() {}
    });
    d();
  }
  return a;
};