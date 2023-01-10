var EditShapeDialog = function(b, e, f, c, k) {
  c = null != c ? c : 300;
  k = null != k ? k : 120;
  var m = document.createElement('table'),
    t = document.createElement('tbody');
  m.style.cellPadding = '4px';
  var y = document.createElement('tr');
  var E = document.createElement('td');
  E.setAttribute('colspan', '2');
  E.style.fontSize = '10pt';
  mxUtils.write(E, f);
  y.appendChild(E);
  t.appendChild(y);
  y = document.createElement('tr');
  E = document.createElement('td');
  var z = document.createElement('textarea');
  z.style.outline = 'none';
  z.style.resize = 'none';
  z.style.width = c - 200 + 'px';
  z.style.height = k + 'px';
  this.textarea = z;
  this.init = function() {
    z.focus();
    z.scrollTop = 0;
  };
  E.appendChild(z);
  y.appendChild(E);
  E = document.createElement('td');
  f = document.createElement('div');
  f.style.position = 'relative';
  f.style.border = '1px solid gray';
  f.style.top = '6px';
  f.style.width = '200px';
  f.style.height = k + 4 + 'px';
  f.style.overflow = 'hidden';
  f.style.marginBottom = '16px';
  mxEvent.disableContextMenu(f);
  E.appendChild(f);
  var D = new Graph(f);
  D.setEnabled(!1);
  var J = b.editor.graph.cloneCell(e);
  D.addCells([J]);
  f = D.view.getState(J);
  var G = '';
  null != f.shape && null != f.shape.stencil && (G = mxUtils.getPrettyXml(f.shape.stencil.desc));
  mxUtils.write(z, G || '');
  f = D.getGraphBounds();
  k = Math.min(160 / f.width, (k - 40) / f.height);
  D.view.scaleAndTranslate(k, 20 / k - f.x, 20 / k - f.y);
  y.appendChild(E);
  t.appendChild(y);
  y = document.createElement('tr');
  E = document.createElement('td');
  E.setAttribute('colspan', '2');
  E.style.paddingTop = '2px';
  E.style.whiteSpace = 'nowrap';
  E.setAttribute('align', 'right');
  b.isOffline() || (k = mxUtils.button(mxResources.get('help'), function() {
    b.openLink('https://www.diagrams.net/doc/faq/shape-complex-create-edit');
  }), k.className = 'geBtn', E.appendChild(k));
  k = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog();
  });
  k.className = 'geBtn';
  b.editor.cancelFirst && E.appendChild(k);
  var d = function(g, n, v) {
    var u = z.value,
      x = mxUtils.parseXml(u);
    u = mxUtils.getPrettyXml(x.documentElement);
    x = x.documentElement.getElementsByTagName('parsererror');
    if (null != x && 0 < x.length)
      b.showError(mxResources.get('error'), mxResources.get('containsValidationErrors'), mxResources.get('ok'));
    else if (v && b.hideDialog(), x = !g.model.contains(n), !v || x || u != G) {
      u = Graph.compress(u);
      g.getModel().beginUpdate();
      try {
        if (x) {
          var C = b.editor.graph.getFreeInsertPoint();
          n.geometry.x = C.x;
          n.geometry.y = C.y;
          g.addCell(n);
        }
        g.setCellStyles(mxConstants.STYLE_SHAPE, 'stencil(' + u + ')', [n]);
      } catch (F) {
        throw F;
      } finally {
        g.getModel().endUpdate();
      }
      x && (g.setSelectionCell(n), g.scrollCellToVisible(n));
    }
  };
  f = mxUtils.button(mxResources.get('preview'), function() {
    d(D, J, !1);
  });
  f.className = 'geBtn';
  E.appendChild(f);
  f = mxUtils.button(mxResources.get('apply'), function() {
    d(b.editor.graph, e, !0);
  });
  f.className = 'geBtn gePrimaryBtn';
  E.appendChild(f);
  b.editor.cancelFirst || E.appendChild(k);
  y.appendChild(E);
  t.appendChild(y);
  m.appendChild(t);
  this.container = m;
};