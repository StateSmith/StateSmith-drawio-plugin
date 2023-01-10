function AspectDialog(b, e, f, c, k) {
  this.aspect = {
    pageId: e || (b.pages ? b.pages[0].getId() : null),
    layerIds: f || []
  };
  e = document.createElement('div');
  var m = document.createElement('h5');
  m.style.margin = '0 0 10px';
  mxUtils.write(m, mxResources.get('pages'));
  e.appendChild(m);
  f = document.createElement('div');
  f.className = 'geAspectDlgList';
  e.appendChild(f);
  m = document.createElement('h5');
  m.style.margin = '0 0 10px';
  mxUtils.write(m, mxResources.get('layers'));
  e.appendChild(m);
  m = document.createElement('div');
  m.className = 'geAspectDlgList';
  e.appendChild(m);
  this.pagesContainer = f;
  this.layersContainer = m;
  this.ui = b;
  f = document.createElement('div');
  f.style.marginTop = '16px';
  f.style.textAlign = 'center';
  m = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog();
    null != k && k();
  });
  m.className = 'geBtn';
  b.editor.cancelFirst && f.appendChild(m);
  var t = mxUtils.button(mxResources.get('ok'), mxUtils.bind(this, function() {
    b.hideDialog();
    c({
      pageId: this.selectedPage,
      layerIds: Object.keys(this.selectedLayers)
    });
  }));
  f.appendChild(t);
  t.className = 'geBtn gePrimaryBtn';
  b.editor.cancelFirst || f.appendChild(m);
  t.setAttribute('disabled', 'disabled');
  this.okBtn = t;
  e.appendChild(f);
  this.container = e;
}
AspectDialog.prototype.init = function() {
  var b = this.ui.getFileData(!0);
  if (this.ui.pages)
    for (b = 0; b < this.ui.pages.length; b++) {
      var e = this.ui.updatePageRoot(this.ui.pages[b]);
      this.createPageItem(e.getId(), e.getName(), e.node);
    }
  else
    this.createPageItem('1', 'Page-1', mxUtils.parseXml(b).documentElement);
};
AspectDialog.prototype.createViewer = function(b, e, f, c) {
  mxEvent.disableContextMenu(b);
  b.style.userSelect = 'none';
  var k = new Graph(b);
  k.setTooltips(!1);
  k.setEnabled(!1);
  k.setPanning(!1);
  k.minFitScale = null;
  k.maxFitScale = null;
  k.centerZoom = !0;
  e = 'mxGraphModel' == e.nodeName ? e : Editor.parseDiagramNode(e);
  if (null != e) {
    var m = e.getAttribute('background');
    if (null == m || '' == m || m == mxConstants.NONE)
      m = null != c ? c : '#ffffff';
    b.style.backgroundColor = m;
    c = new mxCodec(e.ownerDocument);
    b = k.getModel();
    c.decode(e, b);
    e = b.getChildCount(b.root);
    c = null == f;
    for (m = 0; m < e; m++) {
      var t = b.getChildAt(b.root, m);
      b.setVisible(t, c || f == t.id);
    }
    k.maxFitScale = 1;
    k.fit(0);
    k.center();
  }
  return k;
};
AspectDialog.prototype.createPageItem = function(b, e, f) {
  var c = document.createElement('div');
  c.className = 'geAspectDlgListItem';
  c.setAttribute('data-page-id', b);
  c.innerHTML = '<div style="max-width: 100%; max-height: 100%;"></div><div class="geAspectDlgListItemText">' + mxUtils.htmlEntities(e) + '</div>';
  this.pagesContainer.appendChild(c);
  var k = this.createViewer(c.childNodes[0], f);
  e = mxUtils.bind(this, function() {
    null != this.selectedItem && (this.selectedItem.className = 'geAspectDlgListItem');
    this.selectedItem = c;
    this.selectedPage = b;
    c.className += ' geAspectDlgListItemSelected';
    this.layersContainer.innerText = '';
    this.selectedLayers = {};
    this.okBtn.setAttribute('disabled', 'disabled');
    var m = k.model;
    m = m.getChildCells(m.getRoot());
    for (var t = 0; t < m.length; t++)
      this.createLayerItem(m[t], b, k, f);
  });
  mxEvent.addListener(c, 'click', e);
  this.aspect.pageId == b && e();
};
AspectDialog.prototype.createLayerItem = function(b, e, f, c) {
  e = f.convertValueToString(b) || mxResources.get('background') || 'Background';
  var k = document.createElement('div');
  k.setAttribute('data-layer-id', b.id);
  k.className = 'geAspectDlgListItem';
  k.innerHTML = '<div style="max-width: 100%; max-height: 100%;"></div><div class="geAspectDlgListItemText">' + mxUtils.htmlEntities(e) + '</div>';
  this.layersContainer.appendChild(k);
  this.createViewer(k.childNodes[0], c, b.id);
  c = mxUtils.bind(this, function() {
    0 <= k.className.indexOf('geAspectDlgListItemSelected') ? (k.className = 'geAspectDlgListItem', delete this.selectedLayers[b.id], mxUtils.isEmptyObject(this.selectedLayers) && this.okBtn.setAttribute('disabled', 'disabled')) : (k.className += ' geAspectDlgListItemSelected', this.selectedLayers[b.id] = !0, this.okBtn.removeAttribute('disabled'));
  });
  mxEvent.addListener(k, 'click', c); -
  1 != this.aspect.layerIds.indexOf(b.id) && c();
};