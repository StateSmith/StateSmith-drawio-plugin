var EditGeometryDialog = function(b, e) {
  var f = b.editor.graph,
    c = 1 == e.length ? f.getCellGeometry(e[0]) : null,
    k = document.createElement('div'),
    m = document.createElement('table'),
    t = document.createElement('tbody'),
    y = document.createElement('tr'),
    E = document.createElement('td'),
    z = document.createElement('td');
  m.style.paddingLeft = '6px';
  mxUtils.write(E, mxResources.get('relative') + ':');
  var D = document.createElement('input');
  D.setAttribute('type', 'checkbox');
  null != c && c.relative && (D.setAttribute('checked', 'checked'), D.defaultChecked = !0);
  this.init = function() {
    D.focus();
  };
  z.appendChild(D);
  y.appendChild(E);
  y.appendChild(z);
  t.appendChild(y);
  y = document.createElement('tr');
  E = document.createElement('td');
  z = document.createElement('td');
  mxUtils.write(E, mxResources.get('left') + ':');
  var J = document.createElement('input');
  J.setAttribute('type', 'text');
  J.style.width = '100px';
  J.value = null != c ? c.x : '';
  z.appendChild(J);
  y.appendChild(E);
  y.appendChild(z);
  t.appendChild(y);
  y = document.createElement('tr');
  E = document.createElement('td');
  z = document.createElement('td');
  mxUtils.write(E, mxResources.get('top') + ':');
  var G = document.createElement('input');
  G.setAttribute('type', 'text');
  G.style.width = '100px';
  G.value = null != c ? c.y : '';
  z.appendChild(G);
  y.appendChild(E);
  y.appendChild(z);
  t.appendChild(y);
  y = document.createElement('tr');
  E = document.createElement('td');
  z = document.createElement('td');
  mxUtils.write(E, mxResources.get('dx') + ':');
  var d = document.createElement('input');
  d.setAttribute('type', 'text');
  d.style.width = '100px';
  d.value = null != c && null != c.offset ? c.offset.x : '';
  z.appendChild(d);
  y.appendChild(E);
  y.appendChild(z);
  t.appendChild(y);
  y = document.createElement('tr');
  E = document.createElement('td');
  z = document.createElement('td');
  mxUtils.write(E, mxResources.get('dy') + ':');
  var g = document.createElement('input');
  g.setAttribute('type', 'text');
  g.style.width = '100px';
  g.value = null != c && null != c.offset ? c.offset.y : '';
  z.appendChild(g);
  y.appendChild(E);
  y.appendChild(z);
  t.appendChild(y);
  y = document.createElement('tr');
  E = document.createElement('td');
  z = document.createElement('td');
  mxUtils.write(E, mxResources.get('width') + ':');
  var n = document.createElement('input');
  n.setAttribute('type', 'text');
  n.style.width = '100px';
  n.value = null != c ? c.width : '';
  z.appendChild(n);
  y.appendChild(E);
  y.appendChild(z);
  t.appendChild(y);
  y = document.createElement('tr');
  E = document.createElement('td');
  z = document.createElement('td');
  mxUtils.write(E, mxResources.get('height') + ':');
  var v = document.createElement('input');
  v.setAttribute('type', 'text');
  v.style.width = '100px';
  v.value = null != c ? c.height : '';
  z.appendChild(v);
  y.appendChild(E);
  y.appendChild(z);
  t.appendChild(y);
  y = document.createElement('tr');
  E = document.createElement('td');
  z = document.createElement('td');
  mxUtils.write(E, mxResources.get('rotation') + ':');
  var u = document.createElement('input');
  u.setAttribute('type', 'text');
  u.style.width = '100px';
  u.value = 1 == e.length ? mxUtils.getValue(f.getCellStyle(e[0]), mxConstants.STYLE_ROTATION, 0) : '';
  z.appendChild(u);
  y.appendChild(E);
  y.appendChild(z);
  t.appendChild(y);
  m.appendChild(t);
  k.appendChild(m);
  c = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog();
  });
  c.className = 'geBtn';
  var x = mxUtils.button(mxResources.get('apply'), function() {
    b.hideDialog();
    f.getModel().beginUpdate();
    try {
      for (var C = 0; C < e.length; C++) {
        var F = f.getCellGeometry(e[C]);
        null != F && (F = F.clone(), f.isCellMovable(e[C]) && (F.relative = D.checked, 0 < mxUtils.trim(J.value).length && (F.x = Number(J.value)), 0 < mxUtils.trim(G.value).length && (F.y = Number(G.value)), 0 < mxUtils.trim(d.value).length && (null == F.offset && (F.offset = new mxPoint()), F.offset.x = Number(d.value)), 0 < mxUtils.trim(g.value).length && (null == F.offset && (F.offset = new mxPoint()), F.offset.y = Number(g.value))), f.isCellResizable(e[C]) && (0 < mxUtils.trim(n.value).length && (F.width = Number(n.value)), 0 < mxUtils.trim(v.value).length && (F.height = Number(v.value))), f.getModel().setGeometry(e[C], F));
        0 < mxUtils.trim(u.value).length && f.setCellStyles(mxConstants.STYLE_ROTATION, Number(u.value), [e[C]]);
      }
    } finally {
      f.getModel().endUpdate();
    }
  });
  x.className = 'geBtn gePrimaryBtn';
  mxEvent.addListener(k, 'keypress', function(C) {
    13 == C.keyCode && x.click();
  });
  m = document.createElement('div');
  m.style.marginTop = '20px';
  m.style.textAlign = 'right';
  b.editor.cancelFirst ? (m.appendChild(c), m.appendChild(x)) : (m.appendChild(x), m.appendChild(c));
  k.appendChild(m);
  this.container = k;
};