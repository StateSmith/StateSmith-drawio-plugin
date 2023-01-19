var TagsWindow = function(b, e, f, c, k) {
  var m = b.editor.graph,
    t = b.editor.graph.createTagsDialog(mxUtils.bind(this, function() {
      return this.window.isVisible();
    }), null, function(E, z) {
      if (m.isEnabled()) {
        var D = new FilenameDialog(b, '', mxResources.get('add'), function(J) {
          b.hideDialog();
          if (null != J && 0 < J.length) {
            J = J.split(' ');
            for (var G = [], d = 0; d < J.length; d++) {
              var g = mxUtils.trim(J[d]);
              '' != g && 0 > mxUtils.indexOf(E, g) && G.push(g);
            }
            0 < G.length && (m.isSelectionEmpty() ? z(E.concat(G)) : m.addTagsForCells(m.getSelectionCells(), G));
          }
        }, mxResources.get('enterValue') + ' (' + mxResources.get('tags') + ')');
        b.showDialog(D.container, 300, 80, !0, !0);
        D.init();
      }
    }),
    y = t.div;
  this.window = new mxWindow(mxResources.get('tags'), y, e, f, c, k, !0, !0);
  this.window.minimumSize = new mxRectangle(0, 0, 212, 120);
  this.window.destroyOnClose = !1;
  this.window.setMaximizable(!1);
  this.window.setResizable(!0);
  this.window.setClosable(!0);
  this.window.addListener('show', mxUtils.bind(this, function() {
    t.refresh();
    this.window.fit();
  }));
  b.installResizeHandler(this, !0);
};