function mxDualRuler(b, e) {
  var f = new mxPoint(mxRuler.prototype.RULER_THICKNESS, mxRuler.prototype.RULER_THICKNESS);
  this.editorUiGetDiagContOffset = b.getDiagramContainerOffset;
  b.getDiagramContainerOffset = function() {
    return f;
  };
  this.editorUiRefresh = b.refresh;
  this.ui = b;
  this.origGuideMove = mxGuide.prototype.move;
  this.origGuideDestroy = mxGuide.prototype.destroy;
  this.vRuler = new mxRuler(b, e, !0);
  this.hRuler = new mxRuler(b, e, !1, !0);
  e = mxUtils.bind(this, function(c) {
    var k = !1;
    mxEvent.addGestureListeners(c, mxUtils.bind(this, function(m) {
      k = null != b.currentMenu;
      mxEvent.consume(m);
    }), null, mxUtils.bind(this, function(m) {
      if (b.editor.graph.isEnabled() && !b.editor.graph.isMouseDown && (mxEvent.isTouchEvent(m) || mxEvent.isPopupTrigger(m))) {
        b.editor.graph.popupMenuHandler.hideMenu();
        b.hideCurrentMenu();
        if (!mxEvent.isTouchEvent(m) || !k) {
          var t = new mxPopupMenu(mxUtils.bind(this, function(z, D) {
            b.menus.addMenuItems(z, [
              'points',
              'inches',
              'millimeters',
              'meters'
            ], D);
          }));
          t.div.className += ' geMenubarMenu';
          t.smartSeparators = !0;
          t.showDisabled = !0;
          t.autoExpand = !0;
          t.hideMenu = mxUtils.bind(this, function() {
            mxPopupMenu.prototype.hideMenu.apply(t, arguments);
            b.resetCurrentMenu();
            t.destroy();
          });
          var y = mxEvent.getClientX(m),
            E = mxEvent.getClientY(m);
          t.popup(y, E, null, m);
          b.setCurrentMenu(t, c);
        }
        mxEvent.consume(m);
      }
    }));
  });
  e(this.hRuler.container);
  e(this.vRuler.container);
  this.vRuler.drawRuler();
  this.hRuler.drawRuler();
}
mxDualRuler.prototype.updateStyle = function() {
  this.vRuler.updateStyle();
  this.hRuler.updateStyle();
  this.vRuler.drawRuler();
  this.hRuler.drawRuler();
};
mxDualRuler.prototype.setUnit = function(b) {
  this.vRuler.setUnit(b);
  this.hRuler.setUnit(b);
};
mxDualRuler.prototype.setStyle = function(b) {
  this.vRuler.setStyle(b);
  this.hRuler.setStyle(b);
};
mxDualRuler.prototype.destroy = function() {
  this.vRuler.destroy();
  this.hRuler.destroy();
  this.ui.refresh = this.editorUiRefresh;
  mxGuide.prototype.move = this.origGuideMove;
  mxGuide.prototype.destroy = this.origGuideDestroy;
  this.ui.getDiagramContainerOffset = this.editorUiGetDiagContOffset;
};