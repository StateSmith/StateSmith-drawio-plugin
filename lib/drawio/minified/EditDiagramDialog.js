var EditDiagramDialog = function(a) {
  var b = document.createElement('div');
  b.style.textAlign = 'right';
  var f = document.createElement('textarea');
  f.setAttribute('wrap', 'off');
  f.setAttribute('spellcheck', 'false');
  f.setAttribute('autocorrect', 'off');
  f.setAttribute('autocomplete', 'off');
  f.setAttribute('autocapitalize', 'off');
  f.style.overflow = 'auto';
  f.style.resize = 'none';
  f.style.width = '600px';
  f.style.height = '360px';
  f.style.marginBottom = '16px';
  f.value = mxUtils.getPrettyXml(a.editor.getGraphXml());
  b.appendChild(f);
  this.init = function() {
    f.focus();
  };
  Graph.fileSupport && (f.addEventListener('dragover', function(h) {
    h.stopPropagation();
    h.preventDefault();
  }, !1), f.addEventListener('drop', function(h) {
    h.stopPropagation();
    h.preventDefault();
    if (0 < h.dataTransfer.files.length) {
      h = h.dataTransfer.files[0];
      var n = new FileReader();
      n.onload = function(u) {
        f.value = u.target.result;
      };
      n.readAsText(h);
    } else
      f.value = a.extractGraphModelFromEvent(h);
  }, !1));
  var e = mxUtils.button(mxResources.get('cancel'), function() {
    a.hideDialog();
  });
  e.className = 'geBtn';
  a.editor.cancelFirst && b.appendChild(e);
  var g = document.createElement('select');
  g.style.width = '180px';
  g.className = 'geBtn';
  if (a.editor.graph.isEnabled()) {
    var d = document.createElement('option');
    d.setAttribute('value', 'replace');
    mxUtils.write(d, mxResources.get('replaceExistingDrawing'));
    g.appendChild(d);
  }
  d = document.createElement('option');
  d.setAttribute('value', 'new');
  mxUtils.write(d, mxResources.get('openInNewWindow'));
  EditDiagramDialog.showNewWindowOption && g.appendChild(d);
  a.editor.graph.isEnabled() && (d = document.createElement('option'), d.setAttribute('value', 'import'), mxUtils.write(d, mxResources.get('addToExistingDrawing')), g.appendChild(d));
  b.appendChild(g);
  d = mxUtils.button(mxResources.get('ok'), function() {
    var h = Graph.zapGremlins(mxUtils.trim(f.value)),
      n = null;
    if ('new' == g.value)
      a.hideDialog(), a.editor.editAsNew(h);
    else if ('replace' == g.value) {
      a.editor.graph.model.beginUpdate();
      try {
        a.editor.setGraphXml(mxUtils.parseXml(h).documentElement), a.hideDialog();
      } catch (x) {
        n = x;
      } finally {
        a.editor.graph.model.endUpdate();
      }
    } else if ('import' == g.value) {
      a.editor.graph.model.beginUpdate();
      try {
        var u = mxUtils.parseXml(h),
          m = new mxGraphModel();
        new mxCodec(u).decode(u.documentElement, m);
        var p = m.getChildren(m.getChildAt(m.getRoot(), 0));
        a.editor.graph.setSelectionCells(a.editor.graph.importCells(p));
        a.hideDialog();
      } catch (x) {
        n = x;
      } finally {
        a.editor.graph.model.endUpdate();
      }
    }
    null != n && mxUtils.alert(n.message);
  });
  d.className = 'geBtn gePrimaryBtn';
  b.appendChild(d);
  a.editor.cancelFirst || b.appendChild(e);
  this.container = b;
};
EditDiagramDialog.showNewWindowOption = !0;