var ConfirmDialog = function(b, e, f, c, k, m, t, y, E, z, D) {
  var J = document.createElement('div');
  J.style.textAlign = 'center';
  D = null != D ? D : 44;
  var G = document.createElement('div');
  G.style.padding = '6px';
  G.style.overflow = 'auto';
  G.style.maxHeight = D + 'px';
  G.style.lineHeight = '1.2em';
  mxUtils.write(G, e);
  J.appendChild(G);
  null != z && (G = document.createElement('div'), G.style.padding = '6px 0 6px 0', e = document.createElement('img'), e.setAttribute('src', z), G.appendChild(e), J.appendChild(G));
  z = document.createElement('div');
  z.style.textAlign = 'center';
  z.style.whiteSpace = 'nowrap';
  var d = document.createElement('input');
  d.setAttribute('type', 'checkbox');
  m = mxUtils.button(m || mxResources.get('cancel'), function() {
    b.hideDialog();
    null != c && c(d.checked);
  });
  m.className = 'geBtn';
  null != y && (m.innerHTML = y + '<br>' + m.innerHTML, m.style.paddingBottom = '8px', m.style.paddingTop = '8px', m.style.height = 'auto', m.style.width = '40%');
  b.editor.cancelFirst && z.appendChild(m);
  var g = mxUtils.button(k || mxResources.get('ok'), function() {
    b.hideDialog();
    null != f && f(d.checked);
  });
  z.appendChild(g);
  null != t ? (g.innerHTML = t + '<br>' + g.innerHTML + '<br>', g.style.paddingBottom = '8px', g.style.paddingTop = '8px', g.style.height = 'auto', g.className = 'geBtn', g.style.width = '40%') : g.className = 'geBtn gePrimaryBtn';
  b.editor.cancelFirst || z.appendChild(m);
  J.appendChild(z);
  E ? (z.style.marginTop = '10px', G = document.createElement('p'), G.style.marginTop = '20px', G.style.marginBottom = '0px', G.appendChild(d), k = document.createElement('span'), mxUtils.write(k, ' ' + mxResources.get('rememberThisSetting')), G.appendChild(k), J.appendChild(G), mxEvent.addListener(k, 'click', function(n) {
    d.checked = !d.checked;
    mxEvent.consume(n);
  })) : z.style.marginTop = '12px';
  this.init = function() {
    g.focus();
  };
  this.container = J;
};
EditorUi.DIFF_INSERT = 'i';
EditorUi.DIFF_REMOVE = 'r';
EditorUi.DIFF_UPDATE = 'u';
EditorUi.transientViewStateProperties = 'defaultParent currentRoot scrollLeft scrollTop scale translate lastPasteXml pasteCounter'.split(' ');
EditorUi.prototype.viewStateProperties = {
  background: !0,
  backgroundImage: !0,
  shadowVisible: !0,
  foldingEnabled: !0,
  pageScale: !0,
  mathEnabled: !0,
  pageFormat: !0,
  extFonts: !0
};
EditorUi.prototype.cellProperties = {
  id: !0,
  value: !0,
  xmlValue: !0,
  vertex: !0,
  edge: !0,
  visible: !0,
  collapsed: !0,
  connectable: !0,
  parent: !0,
  children: !0,
  previous: !0,
  source: !0,
  target: !0,
  edges: !0,
  geometry: !0,
  style: !0,
  overlays: !0,
  mxObjectId: !0,
  mxTransient: !0
};
EditorUi.prototype.codec = new mxCodec();
EditorUi.prototype.applyPatches = function(b, e, f, c, k) {
  if (null != e)
    for (var m = 0; m < e.length; m++)
      null != e[m] && (b = this.patchPages(b, e[m], f, c, k));
  return b;
};
EditorUi.prototype.patchPages = function(b, e, f, c, k) {
  var m = {},
    t = [],
    y = {},
    E = {},
    z = {},
    D = {};
  if (null != c && null != c[EditorUi.DIFF_UPDATE])
    for (var J in c[EditorUi.DIFF_UPDATE])
      m[J] = c[EditorUi.DIFF_UPDATE][J];
  if (null != e[EditorUi.DIFF_REMOVE])
    for (c = 0; c < e[EditorUi.DIFF_REMOVE].length; c++)
      E[e[EditorUi.DIFF_REMOVE][c]] = !0;
  if (null != e[EditorUi.DIFF_INSERT])
    for (c = 0; c < e[EditorUi.DIFF_INSERT].length; c++)
      y[e[EditorUi.DIFF_INSERT][c].previous] = e[EditorUi.DIFF_INSERT][c];
  if (null != e[EditorUi.DIFF_UPDATE])
    for (J in e[EditorUi.DIFF_UPDATE])
      c = e[EditorUi.DIFF_UPDATE][J], null != c.previous && (D[c.previous] = J);
  if (null != b) {
    var G = '';
    for (c = 0; c < b.length; c++) {
      var d = b[c].getId();
      z[d] = b[c];
      null != D[G] || E[d] || null != e[EditorUi.DIFF_UPDATE] && null != e[EditorUi.DIFF_UPDATE][d] && null != e[EditorUi.DIFF_UPDATE][d].previous || (D[G] = d);
      G = d;
    }
  }
  var g = {},
    n = mxUtils.bind(this, function(u) {
      var x = null != u ? u.getId() : '';
      if (null != u && !g[x]) {
        g[x] = !0;
        t.push(u);
        var C = null != e[EditorUi.DIFF_UPDATE] ? e[EditorUi.DIFF_UPDATE][x] : null;
        null != C && (this.updatePageRoot(u), null != C.name && u.setName(C.name), null != C.view && this.patchViewState(u, C.view), null != C.cells && this.patchPage(u, C.cells, m[u.getId()], k), !f || null == C.cells && null == C.view || (u.needsUpdate = !0));
      }
      u = D[x];
      null != u && (delete D[x], n(z[u]));
      u = y[x];
      null != u && (delete y[x], v(u));
    }),
    v = mxUtils.bind(this, function(u) {
      u = mxUtils.parseXml(u.data).documentElement;
      u = new DiagramPage(u);
      this.updatePageRoot(u);
      var x = z[u.getId()];
      null == x ? n(u) : (this.patchPage(x, this.diffPages([x], [u]), m[x.getId()], k), f && (x.needsUpdate = !0));
    });
  n();
  for (J in D)
    n(z[D[J]]), delete D[J];
  for (J in y)
    v(y[J]), delete y[J];
  return t;
};
EditorUi.prototype.patchViewState = function(b, e) {
  if (null != b.viewState && null != e) {
    b == this.currentPage && (b.viewState = this.editor.graph.getViewState());
    for (var f in e)
      try {
        this.patchViewStateProperty(b, e, f);
      } catch (c) {}
    b == this.currentPage && this.editor.graph.setViewState(b.viewState, !0);
  }
};
EditorUi.prototype.patchViewStateProperty = function(b, e, f) {
  b.viewState[f] = JSON.parse(e[f]);
};
EditorUi.prototype.createParentLookup = function(b, e) {
  function f(z) {
    var D = c[z];
    null == D && (D = {
      inserted: [],
      moved: {}
    }, c[z] = D);
    return D;
  }
  var c = {};
  if (null != e[EditorUi.DIFF_INSERT])
    for (var k = 0; k < e[EditorUi.DIFF_INSERT].length; k++) {
      var m = e[EditorUi.DIFF_INSERT][k],
        t = null != m.parent ? m.parent : '',
        y = null != m.previous ? m.previous : '';
      f(t).inserted[y] = m;
    }
  if (null != e[EditorUi.DIFF_UPDATE])
    for (var E in e[EditorUi.DIFF_UPDATE])
      m = e[EditorUi.DIFF_UPDATE][E], null != m.previous && (t = m.parent, null == t && (k = b.getCell(E), null != k && (k = b.getParent(k), null != k && (t = k.getId()))), null != t && (f(t).moved[m.previous] = E));
  return c;
};
EditorUi.prototype.patchPage = function(b, e, f, c) {
  var k = b == this.currentPage ? this.editor.graph.model : new mxGraphModel(b.root),
    m = this.createParentLookup(k, e);
  k.beginUpdate();
  try {
    var t = k.updateEdgeParent,
      y = new mxDictionary(),
      E = [];
    k.updateEdgeParent = function(v, u) {
      !y.get(v) && c && (y.put(v, !0), E.push(v));
    };
    var z = m[''],
      D = null != z && null != z.inserted ? z.inserted[''] : null,
      J = null;
    null != D && (J = this.getCellForJson(D));
    if (null == J) {
      var G = null != z && null != z.moved ? z.moved[''] : null;
      null != G && (J = k.getCell(G));
    }
    null != J && (k.setRoot(J), b.root = J);
    this.patchCellRecursive(b, k, k.root, m, e);
    if (null != e[EditorUi.DIFF_REMOVE])
      for (var d = 0; d < e[EditorUi.DIFF_REMOVE].length; d++) {
        var g = k.getCell(e[EditorUi.DIFF_REMOVE][d]);
        null != g && k.remove(g);
      }
    if (null != e[EditorUi.DIFF_UPDATE]) {
      var n = null != f && null != f.cells ? f.cells[EditorUi.DIFF_UPDATE] : null;
      for (G in e[EditorUi.DIFF_UPDATE])
        this.patchCell(k, k.getCell(G), e[EditorUi.DIFF_UPDATE][G], null != n ? n[G] : null);
    }
    if (null != e[EditorUi.DIFF_INSERT])
      for (d = 0; d < e[EditorUi.DIFF_INSERT].length; d++)
        D = e[EditorUi.DIFF_INSERT][d], g = k.getCell(D.id), null != g && (k.setTerminal(g, k.getCell(D.source), !0), k.setTerminal(g, k.getCell(D.target), !1));
    k.updateEdgeParent = t;
    if (c && 0 < E.length)
      for (d = 0; d < E.length; d++)
        k.contains(E[d]) && k.updateEdgeParent(E[d]);
  } finally {
    k.endUpdate();
  }
};
EditorUi.prototype.patchCellRecursive = function(b, e, f, c, k) {
  if (null != f) {
    var m = c[f.getId()],
      t = null != m && null != m.inserted ? m.inserted : {};
    m = null != m && null != m.moved ? m.moved : {};
    for (var y = 0, E = e.getChildCount(f), z = '', D = 0; D < E; D++) {
      var J = e.getChildAt(f, D).getId();
      null == m[z] && (null == k[EditorUi.DIFF_UPDATE] || null == k[EditorUi.DIFF_UPDATE][J] || null == k[EditorUi.DIFF_UPDATE][J].previous && null == k[EditorUi.DIFF_UPDATE][J].parent) && (m[z] = J);
      z = J;
    }
    E = mxUtils.bind(this, function(G, d) {
      var g = null != G ? G.getId() : '';
      null != G && d && (d = e.getCell(g), null != d && d != G && (G = null));
      null != G && (e.getChildAt(f, y) != G && e.add(f, G, y), this.patchCellRecursive(b, e, G, c, k), y++);
      return g;
    });
    for (z = [null]; 0 < z.length;)
      if (D = z.shift(), D = E(null != D ? D.child : null, null != D ? D.insert : !1), J = m[D], null != J && (delete m[D], z.push({
          child: e.getCell(J)
        })), J = t[D], null != J && (delete t[D], z.push({
          child: this.getCellForJson(J),
          insert: !0
        })), 0 == z.length) {
        for (D in m)
          z.push({
            child: e.getCell(m[D])
          }), delete m[D];
        for (D in t)
          z.push({
            child: this.getCellForJson(t[D]),
            insert: !0
          }), delete t[D];
      }
  }
};
EditorUi.prototype.patchCell = function(b, e, f, c) {
  if (null != e && null != f) {
    if (null == c || null == c.xmlValue && (null == c.value || '' == c.value))
      'value' in f ? b.setValue(e, f.value) : null != f.xmlValue && b.setValue(e, mxUtils.parseXml(f.xmlValue).documentElement);
    null != c && null != c.style || null == f.style || b.setStyle(e, f.style);
    null != f.visible && b.setVisible(e, 1 == f.visible);
    null != f.collapsed && b.setCollapsed(e, 1 == f.collapsed);
    null != f.vertex && (e.vertex = 1 == f.vertex);
    null != f.edge && (e.edge = 1 == f.edge);
    null != f.connectable && (e.connectable = 1 == f.connectable);
    null != f.geometry && b.setGeometry(e, this.codec.decode(mxUtils.parseXml(f.geometry).documentElement));
    null != f.source && b.setTerminal(e, b.getCell(f.source), !0);
    null != f.target && b.setTerminal(e, b.getCell(f.target), !1);
    for (var k in f)
      this.cellProperties[k] || (e[k] = f[k]);
  }
};
EditorUi.prototype.getXmlForPages = function(b) {
  b = this.getNodeForPages(b);
  var e = null;
  null != b && (e = mxUtils.getXml(b));
  return e;
};
EditorUi.prototype.getNodeForPages = function(b) {
  var e = null;
  if (null != this.fileNode && null != b) {
    e = this.fileNode.cloneNode(!1);
    for (var f = 0; f < b.length; f++) {
      var c = new mxCodec(mxUtils.createXmlDocument()).encode(new mxGraphModel(b[f].root));
      this.editor.graph.saveViewState(b[f].viewState, c);
      var k = b[f].node.cloneNode(!1);
      k.appendChild(c);
      e.appendChild(k);
    }
  }
  return e;
};
EditorUi.prototype.getPagesForXml = function(b) {
  b = mxUtils.parseXml(b);
  return this.getPagesForNode(b.documentElement);
};
EditorUi.prototype.getPagesForNode = function(b, e) {
  var f = this.editor.extractGraphModel(b, !0, !0);
  null != f && (b = f);
  e = b.getElementsByTagName(e || 'diagram');
  f = [];
  if (0 < e.length)
    for (b = 0; b < e.length; b++) {
      var c = new DiagramPage(e[b]);
      this.updatePageRoot(c, !0);
      f.push(c);
    }
  else
    'mxGraphModel' == b.nodeName && (c = new DiagramPage(b.ownerDocument.createElement('diagram')), c.setName(mxResources.get('pageWithNumber', [1])), mxUtils.setTextContent(c.node, Graph.compressNode(b, !0)), f.push(c));
  return f;
};
EditorUi.prototype.diffPages = function(b, e) {
  var f = [],
    c = [],
    k = {},
    m = {},
    t = {},
    y = null;
  if (null != b && null != e) {
    for (var E = 0; E < e.length; E++)
      m[e[E].getId()] = {
        page: e[E],
        prev: y
      }, y = e[E];
    y = null;
    for (E = 0; E < b.length; E++) {
      var z = b[E].getId();
      e = m[z];
      if (null == e)
        c.push(z);
      else {
        var D = this.diffPage(b[E], e.page),
          J = {};
        mxUtils.isEmptyObject(D) || (J.cells = D);
        D = this.diffViewState(b[E], e.page);
        mxUtils.isEmptyObject(D) || (J.view = D);
        if ((null != e.prev ? null == y : null != y) || null != y && null != e.prev && y.getId() != e.prev.getId())
          J.previous = null != e.prev ? e.prev.getId() : '';
        null != e.page.getName() && b[E].getName() != e.page.getName() && (J.name = e.page.getName());
        mxUtils.isEmptyObject(J) || (t[z] = J);
      }
      delete m[b[E].getId()];
      y = b[E];
    }
    for (z in m)
      e = m[z], f.push({
        data: mxUtils.getXml(e.page.node),
        previous: null != e.prev ? e.prev.getId() : ''
      });
    mxUtils.isEmptyObject(t) || (k[EditorUi.DIFF_UPDATE] = t);
    0 < c.length && (k[EditorUi.DIFF_REMOVE] = c);
    0 < f.length && (k[EditorUi.DIFF_INSERT] = f);
  }
  return k;
};
EditorUi.prototype.createCellLookup = function(b, e, f) {
  f = null != f ? f : {};
  f[b.getId()] = {
    cell: b,
    prev: e
  };
  var c = b.getChildCount();
  e = null;
  for (var k = 0; k < c; k++) {
    var m = b.getChildAt(k);
    this.createCellLookup(m, e, f);
    e = m;
  }
  return f;
};
EditorUi.prototype.diffCellRecursive = function(b, e, f, c, k) {
  c = null != c ? c : {};
  var m = f[b.getId()];
  delete f[b.getId()];
  if (null == m)
    k.push(b.getId());
  else {
    var t = this.diffCell(b, m.cell);
    if (null != t.parent || (null != m.prev ? null == e : null != e) || null != e && null != m.prev && e.getId() != m.prev.getId())
      t.previous = null != m.prev ? m.prev.getId() : '';
    mxUtils.isEmptyObject(t) || (c[b.getId()] = t);
  }
  m = b.getChildCount();
  e = null;
  for (t = 0; t < m; t++) {
    var y = b.getChildAt(t);
    this.diffCellRecursive(y, e, f, c, k);
    e = y;
  }
  return c;
};
EditorUi.prototype.diffPage = function(b, e) {
  var f = [],
    c = [],
    k = {};
  this.updatePageRoot(b);
  this.updatePageRoot(e);
  e = this.createCellLookup(e.root);
  var m = this.diffCellRecursive(b.root, null, e, m, c),
    t;
  for (t in e)
    b = e[t], f.push(this.getJsonForCell(b.cell, b.prev));
  mxUtils.isEmptyObject(m) || (k[EditorUi.DIFF_UPDATE] = m);
  0 < c.length && (k[EditorUi.DIFF_REMOVE] = c);
  0 < f.length && (k[EditorUi.DIFF_INSERT] = f);
  return k;
};
EditorUi.prototype.diffViewState = function(b, e) {
  b = b.viewState;
  var f = e.viewState,
    c = {};
  e == this.currentPage && (f = this.editor.graph.getViewState());
  if (null != b && null != f)
    for (var k in this.viewStateProperties)
      this.diffViewStateProperty(b, f, k, c);
  return c;
};
EditorUi.prototype.diffViewStateProperty = function(b, e, f, c) {
  b = JSON.stringify(this.getViewStateProperty(b, f));
  e = JSON.stringify(this.getViewStateProperty(e, f));
  b != e && (c[f] = e);
};
EditorUi.prototype.getViewStateProperty = function(b, e) {
  b = b[e];
  'backgroundImage' == e && null != b && null != b.originalSrc ? delete b.src : 'extFonts' == e && null == b && (b = []);
  return b;
};
EditorUi.prototype.getCellForJson = function(b) {
  var e = null != b.geometry ? this.codec.decode(mxUtils.parseXml(b.geometry).documentElement) : null,
    f = b.value;
  null != b.xmlValue && (f = mxUtils.parseXml(b.xmlValue).documentElement);
  e = new mxCell(f, e, b.style);
  e.connectable = 0 != b.connectable;
  e.collapsed = 1 == b.collapsed;
  e.visible = 0 != b.visible;
  e.vertex = 1 == b.vertex;
  e.edge = 1 == b.edge;
  e.id = b.id;
  for (var c in b)
    this.cellProperties[c] || (e[c] = b[c]);
  return e;
};
EditorUi.prototype.getJsonForCell = function(b, e) {
  var f = {
    id: b.getId()
  };
  b.vertex && (f.vertex = 1);
  b.edge && (f.edge = 1);
  b.connectable || (f.connectable = 0);
  null != b.parent && (f.parent = b.parent.getId());
  null != e && (f.previous = e.getId());
  null != b.source && (f.source = b.source.getId());
  null != b.target && (f.target = b.target.getId());
  null != b.style && (f.style = b.style);
  null != b.geometry && (f.geometry = mxUtils.getXml(this.codec.encode(b.geometry)));
  b.collapsed && (f.collapsed = 1);
  b.visible || (f.visible = 0);
  null != b.value && ('object' === typeof b.value && 'number' === typeof b.value.nodeType && 'string' === typeof b.value.nodeName && 'function' === typeof b.value.getAttribute ? f.xmlValue = mxUtils.getXml(b.value) : f.value = b.value);
  for (var c in b)
    this.cellProperties[c] || 'function' === typeof b[c] || (f[c] = b[c]);
  return f;
};
EditorUi.prototype.diffCell = function(b, e) {
  function f(t) {
    return null != t && 'object' === typeof t && 'number' === typeof t.nodeType && 'string' === typeof t.nodeName && 'function' === typeof t.getAttribute;
  }
  var c = {};
  b.vertex != e.vertex && (c.vertex = e.vertex ? 1 : 0);
  b.edge != e.edge && (c.edge = e.edge ? 1 : 0);
  b.connectable != e.connectable && (c.connectable = e.connectable ? 1 : 0);
  if ((null != b.parent ? null == e.parent : null != e.parent) || null != b.parent && null != e.parent && b.parent.getId() != e.parent.getId())
    c.parent = null != e.parent ? e.parent.getId() : '';
  if ((null != b.source ? null == e.source : null != e.source) || null != b.source && null != e.source && b.source.getId() != e.source.getId())
    c.source = null != e.source ? e.source.getId() : '';
  if ((null != b.target ? null == e.target : null != e.target) || null != b.target && null != e.target && b.target.getId() != e.target.getId())
    c.target = null != e.target ? e.target.getId() : '';
  f(b.value) && f(e.value) ? b.value.isEqualNode(e.value) || (c.xmlValue = mxUtils.getXml(e.value)) : b.value != e.value && (f(e.value) ? c.xmlValue = mxUtils.getXml(e.value) : c.value = null != e.value ? e.value : null);
  b.style != e.style && (c.style = e.style);
  b.visible != e.visible && (c.visible = e.visible ? 1 : 0);
  b.collapsed != e.collapsed && (c.collapsed = e.collapsed ? 1 : 0);
  if (!this.isObjectEqual(b.geometry, e.geometry, new mxGeometry())) {
    var k = this.codec.encode(e.geometry);
    null != k && (c.geometry = mxUtils.getXml(k));
  }
  for (var m in b)
    this.cellProperties[m] || 'function' === typeof b[m] || 'function' === typeof e[m] || b[m] == e[m] || (c[m] = void 0 === e[m] ? null : e[m]);
  for (m in e)
    m in b || this.cellProperties[m] || 'function' === typeof b[m] || 'function' === typeof e[m] || b[m] == e[m] || (c[m] = void 0 === e[m] ? null : e[m]);
  return c;
};
EditorUi.prototype.isObjectEqual = function(b, e, f) {
  if (null == b && null == e)
    return !0;
  if (null != b ? null == e : null != e)
    return !1;
  var c = function(k, m) {
    return null == f || f[k] != m ? !0 === m ? 1 : m : void 0;
  };
  return JSON.stringify(b, c) == JSON.stringify(e, c);
};