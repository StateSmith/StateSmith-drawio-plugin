var FreehandWindow = function(b, e, f, c, k, m) {
  var t = b.editor.graph,
    y = document.createElement('div');
  y.style.textAlign = 'center';
  y.style.userSelect = 'none';
  y.style.overflow = 'hidden';
  y.style.height = '100%';
  if (m) {
    var E = document.createElement('input');
    E.setAttribute('id', 'geFreehandBrush');
    E.setAttribute('type', 'checkbox');
    E.checked = t.freehand.isPerfectFreehandMode();
    E.style.margin = '10px 5px 0px 10px';
    E.style.float = 'left';
    y.appendChild(E);
    var z = document.createElement('label');
    z.setAttribute('for', 'geFreehandBrush');
    z.style.float = 'left';
    z.style.marginTop = '10px';
    y.appendChild(z);
    mxUtils.write(z, mxResources.get('brush'));
    y.appendChild(z);
    mxUtils.br(y);
    var D = document.createElement('input');
    D.setAttribute('type', 'range');
    D.setAttribute('min', '2');
    D.setAttribute('max', '30');
    D.setAttribute('value', t.freehand.getBrushSize());
    D.style.width = '90%';
    D.style.visibility = 'hidden';
    y.appendChild(D);
    mxUtils.br(y);
    z = function() {
      t.freehand.setPerfectFreehandMode(E.checked);
      D.style.visibility = E.checked ? 'visible' : 'hidden';
    };
    mxEvent.addListener(E, 'change', z);
    z();
    mxEvent.addListener(D, 'change', function() {
      t.freehand.setBrushSize(parseInt(this.value));
    });
  }
  var J = mxUtils.button(mxResources.get('startDrawing'), function() {
    t.freehand.isDrawing() ? t.freehand.stopDrawing() : t.freehand.startDrawing();
  });
  J.setAttribute('title', mxResources.get('startDrawing'));
  J.style.marginTop = m ? '5px' : '10px';
  J.style.width = '90%';
  J.style.boxSizing = 'border-box';
  J.style.overflow = 'hidden';
  J.style.textOverflow = 'ellipsis';
  J.style.textAlign = 'center';
  J.className = 'geBtn gePrimaryBtn';
  y.appendChild(J);
  this.window = new mxWindow(mxResources.get('freehand'), y, e, f, c, k, !0, !0);
  this.window.destroyOnClose = !1;
  this.window.setMaximizable(!1);
  this.window.setResizable(!1);
  this.window.setClosable(!0);
  t.addListener('freehandStateChanged', mxUtils.bind(this, function() {
    J.innerText = '';
    mxUtils.write(J, mxResources.get(t.freehand.isDrawing() ? 'stopDrawing' : 'startDrawing'));
    var G = document.createElement('span');
    G.style.opacity = '0.7';
    G.style['float'] = 'right';
    mxUtils.write(G, 'X');
    J.appendChild(G);
    J.setAttribute('title', mxResources.get(t.freehand.isDrawing() ? 'stopDrawing' : 'startDrawing'));
    J.className = 'geBtn' + (t.freehand.isDrawing() ? ' gePrimaryBtn' : '');
  }));
  this.window.addListener('show', mxUtils.bind(this, function() {
    this.window.fit();
  }));
  this.window.addListener('hide', mxUtils.bind(this, function() {
    t.freehand.isDrawing() && t.freehand.stopDrawing();
  }));
  b.installResizeHandler(this, !1);
};