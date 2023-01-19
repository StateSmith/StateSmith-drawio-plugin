function SelectPage(b, e, f) {
  this.ui = b;
  this.previousPage = this.page = e;
  this.neverShown = !0;
  null != e && (this.neverShown = null == e.viewState, this.ui.updatePageRoot(e), null != f && (e.viewState = f, this.neverShown = !1));
}
SelectPage.prototype.execute = function() {
  var b = mxUtils.indexOf(this.ui.pages, this.previousPage);
  if (null != this.page && 0 <= b) {
    b = this.ui.currentPage;
    var e = this.ui.editor,
      f = e.graph,
      c = Graph.compressNode(e.getGraphXml(!0));
    mxUtils.setTextContent(b.node, c);
    b.viewState = f.getViewState();
    b.root = f.model.root;
    null != b.model && b.model.rootChanged(b.root);
    f.view.clear(b.root, !0);
    f.clearSelection();
    this.ui.currentPage = this.previousPage;
    this.previousPage = b;
    b = this.ui.currentPage;
    f.model.prefix = Editor.guid() + '-';
    f.model.rootChanged(b.root);
    f.setViewState(b.viewState);
    f.gridEnabled = f.gridEnabled && (!this.ui.editor.isChromelessView() || '1' == urlParams.grid);
    e.updateGraphComponents();
    f.view.validate();
    f.blockMathRender = !0;
    f.sizeDidChange();
    f.blockMathRender = !1;
    this.neverShown && (this.neverShown = !1, f.selectUnlockedLayer());
    e.graph.fireEvent(new mxEventObject(mxEvent.ROOT));
    e.fireEvent(new mxEventObject('pageSelected', 'change', this));
  }
};