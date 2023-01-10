function Menubar(a, b) {
  this.editorUi = a;
  this.container = b;
}
Menubar.prototype.hideMenu = function() {
  this.editorUi.hideCurrentMenu();
};
Menubar.prototype.addMenu = function(a, b, f, e) {
  var g = document.createElement('a');
  g.className = 'geItem';
  mxUtils.write(g, a);
  this.addMenuHandler(g, b, e);
  null != f ? this.container.insertBefore(g, f) : this.container.appendChild(g);
  return g;
};
Menubar.prototype.addMenuHandler = function(a, b, f) {
  if (null != b) {
    var e = !0,
      g = mxUtils.bind(this, function(d) {
        null != f && f(d);
        if (!mxEvent.isConsumed(d) && e && (null == a.enabled || a.enabled)) {
          this.editorUi.editor.graph.popupMenuHandler.hideMenu();
          var h = new mxPopupMenu(b);
          h.div.className += ' geMenubarMenu';
          h.smartSeparators = !0;
          h.showDisabled = !0;
          h.autoExpand = !0;
          h.hideMenu = mxUtils.bind(this, function() {
            mxPopupMenu.prototype.hideMenu.apply(h, arguments);
            this.editorUi.resetCurrentMenu();
            h.destroy();
          });
          var n = mxUtils.getOffset(a);
          h.popup(n.x, n.y + a.offsetHeight, null, d);
          this.editorUi.setCurrentMenu(h, a);
        }
        mxEvent.consume(d);
      });
    mxEvent.addListener(a, 'mousemove', mxUtils.bind(this, function(d) {
      this.editorUi.menus.autoPopup && null != this.editorUi.currentMenu && this.editorUi.currentMenuElt != a && (this.editorUi.hideCurrentMenu(), g(d));
    }));
    mxEvent.addListener(a, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(d) {
      !this.editorUi.menus.autoPopup && null != this.editorUi.currentMenu && this.editorUi.currentMenuElt != a && mxEvent.isMouseEvent(d) && this.editorUi.hideCurrentMenu();
      e = null == this.editorUi.currentMenu;
      d.preventDefault();
    }));
    mxEvent.addListener(a, 'click', mxUtils.bind(this, function(d) {
      g(d);
      e = !0;
    }));
  }
};
Menubar.prototype.destroy = function() {};