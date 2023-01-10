function mxGraphModel(a) {
  this.currentEdit = this.createUndoableEdit();
  null != a ? this.setRoot(a) : this.clear();
}
mxGraphModel.prototype = new mxEventSource();
mxGraphModel.prototype.constructor = mxGraphModel;
mxGraphModel.prototype.root = null;
mxGraphModel.prototype.cells = null;
mxGraphModel.prototype.maintainEdgeParent = !0;
mxGraphModel.prototype.ignoreRelativeEdgeParent = !0;
mxGraphModel.prototype.createIds = !0;
mxGraphModel.prototype.prefix = '';
mxGraphModel.prototype.postfix = '';
mxGraphModel.prototype.nextId = 0;
mxGraphModel.prototype.currentEdit = null;
mxGraphModel.prototype.updateLevel = 0;
mxGraphModel.prototype.endingUpdate = !1;
mxGraphModel.prototype.clear = function() {
  this.setRoot(this.createRoot());
};
mxGraphModel.prototype.isCreateIds = function() {
  return this.createIds;
};
mxGraphModel.prototype.setCreateIds = function(a) {
  this.createIds = a;
};
mxGraphModel.prototype.createRoot = function() {
  var a = new mxCell();
  a.insert(new mxCell());
  return a;
};
mxGraphModel.prototype.getCell = function(a) {
  return null != this.cells ? this.cells[a] : null;
};
mxGraphModel.prototype.filterCells = function(a, b) {
  var c = null;
  if (null != a) {
    c = [];
    for (var d = 0; d < a.length; d++)
      b(a[d]) && c.push(a[d]);
  }
  return c;
};
mxGraphModel.prototype.getDescendants = function(a) {
  return this.filterDescendants(null, a);
};
mxGraphModel.prototype.filterDescendants = function(a, b) {
  var c = [];
  b = b || this.getRoot();
  (null == a || a(b)) && c.push(b);
  for (var d = this.getChildCount(b), e = 0; e < d; e++) {
    var f = this.getChildAt(b, e);
    c = c.concat(this.filterDescendants(a, f));
  }
  return c;
};
mxGraphModel.prototype.getRoot = function(a) {
  var b = a || this.root;
  if (null != a)
    for (; null != a;)
      b = a, a = this.getParent(a);
  return b;
};
mxGraphModel.prototype.setRoot = function(a) {
  this.execute(new mxRootChange(this, a));
  return a;
};
mxGraphModel.prototype.rootChanged = function(a) {
  var b = this.root;
  this.root = a;
  this.nextId = 0;
  this.cells = null;
  this.cellAdded(a);
  return b;
};
mxGraphModel.prototype.isRoot = function(a) {
  return null != a && this.root == a;
};
mxGraphModel.prototype.isLayer = function(a) {
  return this.isRoot(this.getParent(a));
};
mxGraphModel.prototype.isAncestor = function(a, b) {
  for (; null != b && b != a;)
    b = this.getParent(b);
  return b == a;
};
mxGraphModel.prototype.contains = function(a) {
  return this.isAncestor(this.root, a);
};
mxGraphModel.prototype.getParent = function(a) {
  return null != a ? a.getParent() : null;
};
mxGraphModel.prototype.add = function(a, b, c) {
  if (b != a && null != a && null != b) {
    null == c && (c = this.getChildCount(a));
    var d = a != this.getParent(b);
    this.execute(new mxChildChange(this, a, b, c));
    this.maintainEdgeParent && d && this.updateEdgeParents(b);
  }
  return b;
};
mxGraphModel.prototype.cellAdded = function(a) {
  if (null != a) {
    null == a.getId() && this.createIds && a.setId(this.createId(a));
    if (null != a.getId()) {
      var b = this.getCell(a.getId());
      if (b != a) {
        for (; null != b;)
          a.setId(this.createId(a)), b = this.getCell(a.getId());
        null == this.cells && (this.cells = {});
        this.cells[a.getId()] = a;
      }
    }
    mxUtils.isNumeric(a.getId()) && (this.nextId = Math.max(this.nextId, a.getId()));
    b = this.getChildCount(a);
    for (var c = 0; c < b; c++)
      this.cellAdded(this.getChildAt(a, c));
  }
};
mxGraphModel.prototype.createId = function(a) {
  a = this.nextId;
  this.nextId++;
  return this.prefix + a + this.postfix;
};
mxGraphModel.prototype.updateEdgeParents = function(a, b) {
  b = b || this.getRoot(a);
  for (var c = this.getChildCount(a), d = 0; d < c; d++) {
    var e = this.getChildAt(a, d);
    this.updateEdgeParents(e, b);
  }
  e = this.getEdgeCount(a);
  c = [];
  for (d = 0; d < e; d++)
    c.push(this.getEdgeAt(a, d));
  for (d = 0; d < c.length; d++)
    a = c[d], this.isAncestor(b, a) && this.updateEdgeParent(a, b);
};
mxGraphModel.prototype.updateEdgeParent = function(a, b) {
  for (var c = this.getTerminal(a, !0), d = this.getTerminal(a, !1); null != c && !this.isEdge(c) && null != c.geometry && c.geometry.relative;)
    c = this.getParent(c);
  for (; null != d && this.ignoreRelativeEdgeParent && !this.isEdge(d) && null != d.geometry && d.geometry.relative;)
    d = this.getParent(d);
  if (this.isAncestor(b, c) && this.isAncestor(b, d) && (b = c == d ? this.getParent(c) : this.getNearestCommonAncestor(c, d), null != b && (this.getParent(b) != this.root || this.isAncestor(b, a)) && this.getParent(a) != b)) {
    c = this.getGeometry(a);
    if (null != c) {
      var e = this.getOrigin(this.getParent(a)),
        f = this.getOrigin(b);
      d = f.x - e.x;
      e = f.y - e.y;
      c = c.clone();
      c.translate(-d, -e);
      this.setGeometry(a, c);
    }
    this.add(b, a, this.getChildCount(b));
  }
};
mxGraphModel.prototype.getOrigin = function(a) {
  if (null != a) {
    var b = this.getOrigin(this.getParent(a));
    this.isEdge(a) || (a = this.getGeometry(a), null != a && (b.x += a.x, b.y += a.y));
  } else
    b = new mxPoint();
  return b;
};
mxGraphModel.prototype.getNearestCommonAncestor = function(a, b) {
  if (null != a && null != b) {
    var c = mxCellPath.create(b);
    if (null != c && 0 < c.length) {
      var d = mxCellPath.create(a);
      for (c.length < d.length && (a = b, b = d, d = c, c = b); null != a;) {
        b = this.getParent(a);
        if (0 == c.indexOf(d + mxCellPath.PATH_SEPARATOR) && null != b)
          return a;
        d = mxCellPath.getParentPath(d);
        a = b;
      }
    }
  }
  return null;
};
mxGraphModel.prototype.remove = function(a) {
  a == this.root ? this.setRoot(null) : null != this.getParent(a) && this.execute(new mxChildChange(this, null, a));
  return a;
};
mxGraphModel.prototype.cellRemoved = function(a) {
  if (null != a && null != this.cells) {
    for (var b = this.getChildCount(a) - 1; 0 <= b; b--)
      this.cellRemoved(this.getChildAt(a, b));
    null != this.cells && null != a.getId() && delete this.cells[a.getId()];
  }
};
mxGraphModel.prototype.parentForCellChanged = function(a, b, c) {
  var d = this.getParent(a);
  null != b ? b == d && d.getIndex(a) == c || b.insert(a, c) : null != d && (c = d.getIndex(a), d.remove(c));
  b = this.contains(b);
  c = this.contains(d);
  b && !c ? this.cellAdded(a) : c && !b && this.cellRemoved(a);
  return d;
};
mxGraphModel.prototype.getChildCount = function(a) {
  return null != a ? a.getChildCount() : 0;
};
mxGraphModel.prototype.getChildAt = function(a, b) {
  return null != a ? a.getChildAt(b) : null;
};
mxGraphModel.prototype.getChildren = function(a) {
  return null != a ? a.children : null;
};
mxGraphModel.prototype.getChildVertices = function(a) {
  return this.getChildCells(a, !0, !1);
};
mxGraphModel.prototype.getChildEdges = function(a) {
  return this.getChildCells(a, !1, !0);
};
mxGraphModel.prototype.getChildCells = function(a, b, c) {
  b = null != b ? b : !1;
  c = null != c ? c : !1;
  for (var d = this.getChildCount(a), e = [], f = 0; f < d; f++) {
    var g = this.getChildAt(a, f);
    (!c && !b || c && this.isEdge(g) || b && this.isVertex(g)) && e.push(g);
  }
  return e;
};
mxGraphModel.prototype.getTerminal = function(a, b) {
  return null != a ? a.getTerminal(b) : null;
};
mxGraphModel.prototype.setTerminal = function(a, b, c) {
  var d = b != this.getTerminal(a, c);
  this.execute(new mxTerminalChange(this, a, b, c));
  this.maintainEdgeParent && d && this.updateEdgeParent(a, this.getRoot());
  return b;
};
mxGraphModel.prototype.setTerminals = function(a, b, c) {
  this.beginUpdate();
  try {
    this.setTerminal(a, b, !0), this.setTerminal(a, c, !1);
  } finally {
    this.endUpdate();
  }
};
mxGraphModel.prototype.terminalForCellChanged = function(a, b, c) {
  var d = this.getTerminal(a, c);
  null != b ? b.insertEdge(a, c) : null != d && d.removeEdge(a, c);
  return d;
};
mxGraphModel.prototype.getEdgeCount = function(a) {
  return null != a ? a.getEdgeCount() : 0;
};
mxGraphModel.prototype.getEdgeAt = function(a, b) {
  return null != a ? a.getEdgeAt(b) : null;
};
mxGraphModel.prototype.getDirectedEdgeCount = function(a, b, c) {
  for (var d = 0, e = this.getEdgeCount(a), f = 0; f < e; f++) {
    var g = this.getEdgeAt(a, f);
    g != c && this.getTerminal(g, b) == a && d++;
  }
  return d;
};
mxGraphModel.prototype.getConnections = function(a) {
  return this.getEdges(a, !0, !0, !1);
};
mxGraphModel.prototype.getIncomingEdges = function(a) {
  return this.getEdges(a, !0, !1, !1);
};
mxGraphModel.prototype.getOutgoingEdges = function(a) {
  return this.getEdges(a, !1, !0, !1);
};
mxGraphModel.prototype.getEdges = function(a, b, c, d) {
  b = null != b ? b : !0;
  c = null != c ? c : !0;
  d = null != d ? d : !0;
  for (var e = this.getEdgeCount(a), f = [], g = 0; g < e; g++) {
    var k = this.getEdgeAt(a, g),
      l = this.getTerminal(k, !0),
      m = this.getTerminal(k, !1);
    (d && l == m || l != m && (b && m == a || c && l == a)) && f.push(k);
  }
  return f;
};
mxGraphModel.prototype.getEdgesBetween = function(a, b, c) {
  c = null != c ? c : !1;
  var d = this.getEdgeCount(a),
    e = this.getEdgeCount(b),
    f = a,
    g = d;
  e < d && (g = e, f = b);
  d = [];
  for (e = 0; e < g; e++) {
    var k = this.getEdgeAt(f, e),
      l = this.getTerminal(k, !0),
      m = this.getTerminal(k, !1),
      n = m == a && l == b;
    (l == a && m == b || !c && n) && d.push(k);
  }
  return d;
};
mxGraphModel.prototype.getOpposites = function(a, b, c, d) {
  c = null != c ? c : !0;
  d = null != d ? d : !0;
  var e = [];
  if (null != a)
    for (var f = 0; f < a.length; f++) {
      var g = this.getTerminal(a[f], !0),
        k = this.getTerminal(a[f], !1);
      g == b && null != k && k != b && d ? e.push(k) : k == b && null != g && g != b && c && e.push(g);
    }
  return e;
};
mxGraphModel.prototype.getTopmostCells = function(a) {
  for (var b = new mxDictionary(), c = [], d = 0; d < a.length; d++)
    b.put(a[d], !0);
  for (d = 0; d < a.length; d++) {
    for (var e = a[d], f = !0, g = this.getParent(e); null != g;) {
      if (b.get(g)) {
        f = !1;
        break;
      }
      g = this.getParent(g);
    }
    f && c.push(e);
  }
  return c;
};
mxGraphModel.prototype.isVertex = function(a) {
  return null != a ? a.isVertex() : !1;
};
mxGraphModel.prototype.isEdge = function(a) {
  return null != a ? a.isEdge() : !1;
};
mxGraphModel.prototype.isConnectable = function(a) {
  return null != a ? a.isConnectable() : !1;
};
mxGraphModel.prototype.getValue = function(a) {
  return null != a ? a.getValue() : null;
};
mxGraphModel.prototype.setValue = function(a, b) {
  this.execute(new mxValueChange(this, a, b));
  return b;
};
mxGraphModel.prototype.valueForCellChanged = function(a, b) {
  return a.valueChanged(b);
};
mxGraphModel.prototype.getGeometry = function(a) {
  return null != a ? a.getGeometry() : null;
};
mxGraphModel.prototype.setGeometry = function(a, b) {
  b != this.getGeometry(a) && this.execute(new mxGeometryChange(this, a, b));
  return b;
};
mxGraphModel.prototype.geometryForCellChanged = function(a, b) {
  var c = this.getGeometry(a);
  a.setGeometry(b);
  return c;
};
mxGraphModel.prototype.getStyle = function(a) {
  return null != a ? a.getStyle() : null;
};
mxGraphModel.prototype.setStyle = function(a, b) {
  b != this.getStyle(a) && this.execute(new mxStyleChange(this, a, b));
  return b;
};
mxGraphModel.prototype.styleForCellChanged = function(a, b) {
  var c = this.getStyle(a);
  a.setStyle(b);
  return c;
};
mxGraphModel.prototype.isCollapsed = function(a) {
  return null != a ? a.isCollapsed() : !1;
};
mxGraphModel.prototype.setCollapsed = function(a, b) {
  b != this.isCollapsed(a) && this.execute(new mxCollapseChange(this, a, b));
  return b;
};
mxGraphModel.prototype.collapsedStateForCellChanged = function(a, b) {
  var c = this.isCollapsed(a);
  a.setCollapsed(b);
  return c;
};
mxGraphModel.prototype.isVisible = function(a) {
  return null != a ? a.isVisible() : !1;
};
mxGraphModel.prototype.setVisible = function(a, b) {
  b != this.isVisible(a) && this.execute(new mxVisibleChange(this, a, b));
  return b;
};
mxGraphModel.prototype.visibleStateForCellChanged = function(a, b) {
  var c = this.isVisible(a);
  a.setVisible(b);
  return c;
};
mxGraphModel.prototype.execute = function(a) {
  a.execute();
  this.beginUpdate();
  this.currentEdit.add(a);
  this.fireEvent(new mxEventObject(mxEvent.EXECUTE, 'change', a));
  this.fireEvent(new mxEventObject(mxEvent.EXECUTED, 'change', a));
  this.endUpdate();
};
mxGraphModel.prototype.beginUpdate = function() {
  this.updateLevel++;
  this.fireEvent(new mxEventObject(mxEvent.BEGIN_UPDATE));
  1 == this.updateLevel && this.fireEvent(new mxEventObject(mxEvent.START_EDIT));
};
mxGraphModel.prototype.endUpdate = function() {
  this.updateLevel--;
  0 == this.updateLevel && this.fireEvent(new mxEventObject(mxEvent.END_EDIT));
  if (!this.endingUpdate) {
    this.endingUpdate = 0 == this.updateLevel;
    this.fireEvent(new mxEventObject(mxEvent.END_UPDATE, 'edit', this.currentEdit));
    try {
      if (this.endingUpdate && !this.currentEdit.isEmpty()) {
        this.fireEvent(new mxEventObject(mxEvent.BEFORE_UNDO, 'edit', this.currentEdit));
        var a = this.currentEdit;
        this.currentEdit = this.createUndoableEdit();
        a.notify();
        this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', a));
      }
    } finally {
      this.endingUpdate = !1;
    }
  }
};
mxGraphModel.prototype.createUndoableEdit = function(a) {
  var b = new mxUndoableEdit(this, null != a ? a : !0);
  b.notify = function() {
    b.source.fireEvent(new mxEventObject(mxEvent.CHANGE, 'edit', b, 'changes', b.changes));
    b.source.fireEvent(new mxEventObject(mxEvent.NOTIFY, 'edit', b, 'changes', b.changes));
  };
  return b;
};
mxGraphModel.prototype.mergeChildren = function(a, b, c) {
  c = null != c ? c : !0;
  this.beginUpdate();
  try {
    var d = {};
    this.mergeChildrenImpl(a, b, c, d);
    for (var e in d) {
      var f = d[e],
        g = this.getTerminal(f, !0);
      null != g && (g = d[mxCellPath.create(g)], this.setTerminal(f, g, !0));
      g = this.getTerminal(f, !1);
      null != g && (g = d[mxCellPath.create(g)], this.setTerminal(f, g, !1));
    }
  } finally {
    this.endUpdate();
  }
};
mxGraphModel.prototype.mergeChildrenImpl = function(a, b, c, d) {
  this.beginUpdate();
  try {
    for (var e = a.getChildCount(), f = 0; f < e; f++) {
      var g = a.getChildAt(f);
      if ('function' == typeof g.getId) {
        var k = g.getId(),
          l = null == k || this.isEdge(g) && c ? null : this.getCell(k);
        if (null == l) {
          var m = g.clone();
          m.setId(k);
          m.setTerminal(g.getTerminal(!0), !0);
          m.setTerminal(g.getTerminal(!1), !1);
          l = b.insert(m);
          this.cellAdded(l);
        }
        d[mxCellPath.create(g)] = l;
        this.mergeChildrenImpl(g, l, c, d);
      }
    }
  } finally {
    this.endUpdate();
  }
};
mxGraphModel.prototype.getParents = function(a) {
  var b = [];
  if (null != a)
    for (var c = new mxDictionary(), d = 0; d < a.length; d++) {
      var e = this.getParent(a[d]);
      null == e || c.get(e) || (c.put(e, !0), b.push(e));
    }
  return b;
};
mxGraphModel.prototype.cloneCell = function(a, b, c) {
  return null != a ? this.cloneCells([a], b, null, c)[0] : null;
};
mxGraphModel.prototype.cloneCells = function(a, b, c, d) {
  b = null != b ? b : !0;
  c = null != c ? c : {};
  d = null != d ? d : !1;
  for (var e = [], f = 0; f < a.length; f++)
    null != a[f] ? e.push(this.cloneCellImpl(a[f], c, b, d)) : e.push(null);
  for (f = 0; f < e.length; f++)
    null != e[f] && this.restoreClone(e[f], a[f], c);
  return e;
};
mxGraphModel.prototype.cloneCellImpl = function(a, b, c, d) {
  var e = mxObjectIdentity.get(a),
    f = b[e];
  if (null == f && (f = this.cellCloned(a), b[e] = f, d && (f.id = a.id), c))
    for (c = this.getChildCount(a), e = 0; e < c; e++) {
      var g = this.cloneCellImpl(this.getChildAt(a, e), b, !0, d);
      f.insert(g);
    }
  return f;
};
mxGraphModel.prototype.cellCloned = function(a) {
  return a.clone();
};
mxGraphModel.prototype.restoreClone = function(a, b, c) {
  var d = this.getTerminal(b, !0);
  null != d && (d = c[mxObjectIdentity.get(d)], null != d && d.insertEdge(a, !0));
  d = this.getTerminal(b, !1);
  null != d && (d = c[mxObjectIdentity.get(d)], null != d && d.insertEdge(a, !1));
  d = this.getChildCount(a);
  for (var e = 0; e < d; e++)
    this.restoreClone(this.getChildAt(a, e), this.getChildAt(b, e), c);
};