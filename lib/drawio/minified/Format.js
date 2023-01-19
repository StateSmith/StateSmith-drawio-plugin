Format = function(a, b) {
  this.editorUi = a;
  this.container = b;
};
Format.inactiveTabBackgroundColor = '#e4e4e4';
Format.classicFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 10 2 L 5 8 L 10 14 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.classicThinFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 4 L 3 8 L 8 12 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.openFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 0 L 0 8 L 8 16 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.openThinFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 4 L 0 8 L 8 12 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.openAsyncFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 4 L 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.blockFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 2 L 8 14 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.blockThinFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 4 L 8 12 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.asyncFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 6 8 L 6 4 L 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.ovalFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 A 5 5 0 0 1 5 3 A 5 5 0 0 1 11 8 A 5 5 0 0 1 5 13 A 5 5 0 0 1 0 8 Z M 10 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.diamondFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 6 2 L 12 8 L 6 14 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.diamondThinFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 3 L 16 8 L 8 13 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.classicMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 10 2 L 5 8 L 10 14 Z M 5 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.classicThinMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 4 L 5 8 L 8 12 Z M 5 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.blockMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 2 L 8 14 Z M 8 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.blockThinMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 4 L 8 12 Z M 8 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.asyncMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 6 8 L 6 4 L 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ovalMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 A 5 5 0 0 1 5 3 A 5 5 0 0 1 11 8 A 5 5 0 0 1 5 13 A 5 5 0 0 1 0 8 Z M 10 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.diamondMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 6 2 L 12 8 L 6 14 Z M 12 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.diamondThinMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 3 L 16 8 L 8 13 Z M 16 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.boxMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 3 L 10 3 L 10 13 L 0 13 Z M 10 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.halfCircleMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 3 A 5 5 0 0 1 5 8 A 5 5 0 0 1 0 13 M 5 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.dashMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 12 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.crossMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 12 14 M 12 2 L 0 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.circlePlusMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 A 6 6 0 0 1 6 2 A 6 6 0 0 1 12 8 A 6 6 0 0 1 6 14 A 6 6 0 0 1 0 8 Z M 6 2 L 6 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.circleMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 A 6 6 0 0 1 6 2 A 6 6 0 0 1 12 8 A 6 6 0 0 1 6 14 A 6 6 0 0 1 0 8 Z M 12 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERmandOneMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 6 2 L 6 14 M 9 2 L 9 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERmanyMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 12 8 L 0 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERoneToManyMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 12 8 L 0 14 M 15 2 L 15 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERzeroToOneMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 8 A 5 5 0 0 1 13 3 A 5 5 0 0 1 18 8 A 5 5 0 0 1 13 13 A 5 5 0 0 1 8 8 Z M 0 8 L 8 8 M 18 8 L 24 8 M 4 3 L 4 13" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERzeroToManyMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 8 A 5 5 0 0 1 13 3 A 5 5 0 0 1 18 8 A 5 5 0 0 1 13 13 A 5 5 0 0 1 8 8 Z M 0 8 L 8 8 M 18 8 L 24 8 M 0 3 L 8 8 L 0 13" stroke="#404040" fill="transparent"/>', 32, 20);
Format.EROneMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 5 2 L 5 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.baseDashMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 0 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.doubleBlockMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 2 L 8 14 Z M 8 8 L 16 2 L 16 14 Z M 16 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.doubleBlockFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 2 L 8 14 Z M 8 8 L 16 2 L 16 14 Z M 16 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.processMenuIcon = function(a, b) {
  var f = a.getElementsByTagName('img');
  0 < f.length && (f[0].className = 'geIcon geAdaptiveAsset', f[0].style.padding = '0px', f[0].style.margin = '0 0 0 2px', null != b && mxUtils.setPrefixedStyle(f[0].style, 'transform', b));
  return a;
};
Format.prototype.labelIndex = 0;
Format.prototype.diagramIndex = 0;
Format.prototype.currentIndex = 0;
Format.prototype.showCloseButton = !0;
Format.prototype.rounded = !1;
Format.prototype.curved = !1;
Format.prototype.init = function() {
  var a = this.editorUi,
    b = a.editor,
    f = b.graph;
  this.update = mxUtils.bind(this, function(e, g) {
    this.refresh();
  });
  f.getSelectionModel().addListener(mxEvent.CHANGE, this.update);
  f.getModel().addListener(mxEvent.CHANGE, this.update);
  f.addListener(mxEvent.EDITING_STARTED, this.update);
  f.addListener(mxEvent.EDITING_STOPPED, this.update);
  f.getView().addListener('unitChanged', this.update);
  b.addListener('autosaveChanged', this.update);
  f.addListener(mxEvent.ROOT, this.update);
  a.addListener('styleChanged', this.update);
  a.addListener('darkModeChanged', this.update);
  this.refresh();
};
Format.prototype.clear = function() {
  this.container.innerText = '';
  if (null != this.panels)
    for (var a = 0; a < this.panels.length; a++)
      this.panels[a].destroy();
  this.panels = [];
};
Format.prototype.refresh = function() {
  null != this.pendingRefresh && (window.clearTimeout(this.pendingRefresh), this.pendingRefresh = null);
  this.pendingRefresh = window.setTimeout(mxUtils.bind(this, function() {
    this.immediateRefresh();
  }));
};
Format.prototype.immediateRefresh = function() {
  if ('0px' != this.container.style.width) {
    this.clear();
    var a = this.editorUi,
      b = a.editor.graph,
      f = document.createElement('div');
    f.style.whiteSpace = 'nowrap';
    f.style.color = 'rgb(112, 112, 112)';
    f.style.textAlign = 'left';
    f.style.cursor = 'default';
    var e = document.createElement('div');
    e.className = 'geFormatSection';
    e.style.textAlign = 'center';
    e.style.fontWeight = 'bold';
    e.style.paddingTop = '8px';
    e.style.fontSize = '13px';
    e.style.borderWidth = '0px 0px 1px 1px';
    e.style.borderStyle = 'solid';
    e.style.display = 'inline-block';
    e.style.height = '25px';
    e.style.overflow = 'hidden';
    e.style.width = '100%';
    this.container.appendChild(f);
    mxEvent.addListener(e, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(C) {
      C.preventDefault();
    }));
    var g = a.getSelectionState(),
      d = g.containsLabel,
      h = null,
      n = null,
      u = mxUtils.bind(this, function(C, D, G, F) {
        var K = mxUtils.bind(this, function(P) {
          h != C && (d ? this.labelIndex = G : b.isSelectionEmpty() ? this.diagramIndex = G : this.currentIndex = G, null != h && (h.style.backgroundColor = Format.inactiveTabBackgroundColor, h.style.borderBottomWidth = '1px'), h = C, h.style.backgroundColor = '', h.style.borderBottomWidth = '0px', n != D && (null != n && (n.style.display = 'none'), n = D, n.style.display = ''));
        });
        mxEvent.addListener(C, 'click', K);
        mxEvent.addListener(C, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(P) {
          P.preventDefault();
        }));
        (F && null == h || G == (d ? this.labelIndex : b.isSelectionEmpty() ? this.diagramIndex : this.currentIndex)) && K();
      }),
      m = 0;
    if (b.isSelectionEmpty()) {
      mxUtils.write(e, mxResources.get('diagram'));
      e.style.borderLeftWidth = '0px';
      f.appendChild(e);
      g = f.cloneNode(!1);
      this.panels.push(new DiagramFormatPanel(this, a, g));
      this.container.appendChild(g);
      if (null != Editor.styles) {
        g.style.display = 'none';
        e.style.width = this.showCloseButton ? '106px' : '50%';
        e.style.cursor = 'pointer';
        e.style.backgroundColor = Format.inactiveTabBackgroundColor;
        var p = e.cloneNode(!1);
        p.style.borderLeftWidth = '1px';
        p.style.borderRightWidth = '1px';
        p.style.backgroundColor = Format.inactiveTabBackgroundColor;
        u(e, g, m++);
        var x = f.cloneNode(!1);
        x.style.display = 'none';
        mxUtils.write(p, mxResources.get('style'));
        f.appendChild(p);
        this.panels.push(new DiagramStylePanel(this, a, x));
        this.container.appendChild(x);
        u(p, x, m++);
      }
      this.showCloseButton && (p = e.cloneNode(!1), p.style.borderLeftWidth = '1px', p.style.borderRightWidth = '1px', p.style.borderBottomWidth = '1px', p.style.backgroundColor = Format.inactiveTabBackgroundColor, p.style.position = 'absolute', p.style.right = '0px', p.style.top = '0px', p.style.width = '25px', u = document.createElement('img'), u.setAttribute('border', '0'), u.setAttribute('src', Dialog.prototype.closeImage), u.setAttribute('title', mxResources.get('hide')), u.style.position = 'absolute', u.style.display = 'block', u.style.right = '0px', u.style.top = '8px', u.style.cursor = 'pointer', u.style.marginTop = '1px', u.style.marginRight = '6px', u.style.border = '1px solid transparent', u.style.padding = '1px', u.style.opacity = 0.5, p.appendChild(u), mxEvent.addListener(u, 'click', function() {
        a.actions.get('format').funct();
      }), f.appendChild(p));
    } else if (b.isEditing())
      mxUtils.write(e, mxResources.get('text')), f.appendChild(e), this.panels.push(new TextFormatPanel(this, a, f));
    else {
      e.style.backgroundColor = Format.inactiveTabBackgroundColor;
      e.style.borderLeftWidth = '1px';
      e.style.cursor = 'pointer';
      e.style.width = d || 0 == g.cells.length ? '50%' : '33.3%';
      p = e.cloneNode(!1);
      var A = p.cloneNode(!1);
      p.style.backgroundColor = Format.inactiveTabBackgroundColor;
      A.style.backgroundColor = Format.inactiveTabBackgroundColor;
      d ? p.style.borderLeftWidth = '0px' : (e.style.borderLeftWidth = '0px', mxUtils.write(e, mxResources.get('style')), f.appendChild(e), x = f.cloneNode(!1), x.style.display = 'none', this.panels.push(new StyleFormatPanel(this, a, x)), this.container.appendChild(x), u(e, x, m++));
      mxUtils.write(p, mxResources.get('text'));
      f.appendChild(p);
      e = f.cloneNode(!1);
      e.style.display = 'none';
      this.panels.push(new TextFormatPanel(this, a, e));
      this.container.appendChild(e);
      mxUtils.write(A, mxResources.get('arrange'));
      f.appendChild(A);
      f = f.cloneNode(!1);
      f.style.display = 'none';
      this.panels.push(new ArrangePanel(this, a, f));
      this.container.appendChild(f);
      0 < g.cells.length ? u(p, e, m + 1) : p.style.display = 'none';
      u(A, f, m++, !0);
    }
  }
};