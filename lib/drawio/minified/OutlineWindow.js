var OutlineWindow = function(a, b, f, e, g) {
  var d = a.editor.graph,
    h = document.createElement('div');
  h.style.position = 'absolute';
  h.style.width = '100%';
  h.style.height = '100%';
  h.style.overflow = 'hidden';
  this.window = new mxWindow(mxResources.get('outline'), h, b, f, e, g, !0, !0);
  this.window.minimumSize = new mxRectangle(0, 0, 80, 80);
  this.window.destroyOnClose = !1;
  this.window.setMaximizable(!1);
  this.window.setResizable(!0);
  this.window.setClosable(!0);
  this.window.setVisible(!0);
  var n = a.createOutline(this.window);
  a.installResizeHandler(this, !0, function() {
    n.destroy();
  });
  this.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function() {
    this.window.fit();
    n.setSuspended(!1);
  }));
  this.window.addListener(mxEvent.HIDE, mxUtils.bind(this, function() {
    n.setSuspended(!0);
  }));
  this.window.addListener(mxEvent.NORMALIZE, mxUtils.bind(this, function() {
    n.setSuspended(!1);
  }));
  this.window.addListener(mxEvent.MINIMIZE, mxUtils.bind(this, function() {
    n.setSuspended(!0);
  }));
  n.init(h);
  mxEvent.addMouseWheelListener(function(u, m) {
    for (var p = !1, x = mxEvent.getSource(u); null != x;) {
      if (x == n.svg) {
        p = !0;
        break;
      }
      x = x.parentNode;
    }
    p && (p = d.zoomFactor, null != u.deltaY && Math.round(u.deltaY) != u.deltaY && (p = 1 + Math.abs(u.deltaY) / 20 * (p - 1)), d.lazyZoom(m, null, null, p), mxEvent.consume(u));
  });
};