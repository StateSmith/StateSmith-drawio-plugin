function mxSwimlaneLayout(a, b, c) {
  mxGraphLayout.call(this, a);
  this.orientation = null != b ? b : mxConstants.DIRECTION_NORTH;
  this.deterministic = null != c ? c : !0;
}
mxSwimlaneLayout.prototype = new mxGraphLayout();
mxSwimlaneLayout.prototype.constructor = mxSwimlaneLayout;
mxSwimlaneLayout.prototype.roots = null;
mxSwimlaneLayout.prototype.swimlanes = null;
mxSwimlaneLayout.prototype.dummyVertexWidth = 50;
mxSwimlaneLayout.prototype.resizeParent = !1;
mxSwimlaneLayout.prototype.maintainParentLocation = !1;
mxSwimlaneLayout.prototype.moveParent = !1;
mxSwimlaneLayout.prototype.parentBorder = 30;
mxSwimlaneLayout.prototype.intraCellSpacing = 30;
mxSwimlaneLayout.prototype.interRankCellSpacing = 100;
mxSwimlaneLayout.prototype.interHierarchySpacing = 60;
mxSwimlaneLayout.prototype.parallelEdgeSpacing = 10;
mxSwimlaneLayout.prototype.orientation = mxConstants.DIRECTION_NORTH;
mxSwimlaneLayout.prototype.fineTuning = !0;
mxSwimlaneLayout.prototype.tightenToSource = !0;
mxSwimlaneLayout.prototype.disableEdgeStyle = !0;
mxSwimlaneLayout.prototype.traverseAncestors = !0;
mxSwimlaneLayout.prototype.model = null;
mxSwimlaneLayout.prototype.edgesCache = null;
mxHierarchicalLayout.prototype.edgeSourceTermCache = null;
mxHierarchicalLayout.prototype.edgesTargetTermCache = null;
mxHierarchicalLayout.prototype.edgeStyle = mxHierarchicalEdgeStyle.POLYLINE;
mxSwimlaneLayout.prototype.getModel = function() {
  return this.model;
};
mxSwimlaneLayout.prototype.execute = function(a, b) {
  this.parent = a;
  var c = this.graph.model;
  this.edgesCache = new mxDictionary();
  this.edgeSourceTermCache = new mxDictionary();
  this.edgesTargetTermCache = new mxDictionary();
  if (!(null == b || 1 > b.length)) {
    null == a && (a = c.getParent(b[0]));
    this.parentY = this.parentX = null;
    if (a != this.root && null != c.isVertex(a) && this.maintainParentLocation) {
      var d = this.graph.getCellGeometry(a);
      null != d && (this.parentX = d.x, this.parentY = d.y);
    }
    this.swimlanes = b;
    for (var e = [], f = 0; f < b.length; f++) {
      var g = this.graph.getChildCells(b[f]);
      if (null == g || 0 == g.length)
        g = this.graph.insertVertex(b[f], null, null, 0, 0, this.dummyVertexWidth, 0), e.push(g);
    }
    c.beginUpdate();
    try {
      this.run(a), this.resizeParent && !this.graph.isCellCollapsed(a) && this.graph.updateGroupBounds([a], this.parentBorder, this.moveParent), null != this.parentX && null != this.parentY && (d = this.graph.getCellGeometry(a), null != d && (d = d.clone(), d.x = this.parentX, d.y = this.parentY, c.setGeometry(a, d))), this.graph.removeCells(e);
    } finally {
      c.endUpdate();
    }
  }
};
mxSwimlaneLayout.prototype.updateGroupBounds = function() {
  var a = [],
    b = this.model;
  for (f in b.edgeMapper)
    for (var c = b.edgeMapper[f], d = 0; d < c.edges.length; d++)
      a.push(c.edges[d]);
  a = this.graph.getBoundingBoxFromGeometry(a, !0);
  b = [];
  for (d = 0; d < this.swimlanes.length; d++) {
    var e = this.swimlanes[d],
      f = this.graph.getCellGeometry(e);
    if (null != f) {
      var g = this.graph.getChildCells(e);
      c = this.graph.isSwimlane(e) ? this.graph.getStartSize(e) : new mxRectangle();
      e = this.graph.getBoundingBoxFromGeometry(g);
      b[d] = e;
      c = e.y + f.y - c.height - this.parentBorder;
      f = e.y + f.y + e.height;
      null == a ? a = new mxRectangle(0, c, 0, f - c) : (a.y = Math.min(a.y, c), a.height = Math.max(a.y + a.height, f) - a.y);
    }
  }
  for (d = 0; d < this.swimlanes.length; d++)
    if (e = this.swimlanes[d], f = this.graph.getCellGeometry(e), null != f) {
      g = this.graph.getChildCells(e);
      c = this.graph.isSwimlane(e) ? this.graph.getStartSize(e) : new mxRectangle();
      var k = f.clone(),
        l = c.width + (0 == d ? this.parentBorder : this.interRankCellSpacing / 2),
        m = b[d].x - l,
        n = a.y - this.parentBorder;
      k.x += m;
      k.y = n;
      k.width = b[d].width + l + this.interRankCellSpacing / 2;
      k.height = a.height + c.height + 2 * this.parentBorder;
      this.graph.model.setGeometry(e, k);
      this.graph.moveCells(g, -m, f.y - n);
    }
};
mxSwimlaneLayout.prototype.findRoots = function(a, b) {
  var c = [];
  if (null != a && null != b) {
    var d = this.graph.model,
      e = null,
      f = -100000,
      g;
    for (g in b) {
      var k = b[g];
      if (null != k && d.isVertex(k) && this.graph.isCellVisible(k) && d.isAncestor(a, k)) {
        for (var l = this.getEdges(k), m = 0, n = 0, p = 0; p < l.length; p++) {
          var r = this.getVisibleTerminal(l[p], !0);
          r == k ? (r = this.getVisibleTerminal(l[p], !1), d.isAncestor(a, r) && m++) : d.isAncestor(a, r) && n++;
        }
        0 == n && 0 < m && c.push(k);
        l = m - n;
        l > f && (f = l, e = k);
      }
    }
    0 == c.length && null != e && c.push(e);
  }
  return c;
};
mxSwimlaneLayout.prototype.getEdges = function(a) {
  var b = this.edgesCache.get(a);
  if (null != b)
    return b;
  var c = this.graph.model;
  b = [];
  for (var d = this.graph.isCellCollapsed(a), e = c.getChildCount(a), f = 0; f < e; f++) {
    var g = c.getChildAt(a, f);
    if (this.isPort(g))
      b = b.concat(c.getEdges(g, !0, !0));
    else if (d || !this.graph.isCellVisible(g))
      b = b.concat(c.getEdges(g, !0, !0));
  }
  b = b.concat(c.getEdges(a, !0, !0));
  c = [];
  for (f = 0; f < b.length; f++)
    d = this.getVisibleTerminal(b[f], !0), e = this.getVisibleTerminal(b[f], !1), (d == e || d != e && (e == a && (null == this.parent || this.graph.isValidAncestor(d, this.parent, this.traverseAncestors)) || d == a && (null == this.parent || this.graph.isValidAncestor(e, this.parent, this.traverseAncestors)))) && c.push(b[f]);
  this.edgesCache.put(a, c);
  return c;
};
mxSwimlaneLayout.prototype.getVisibleTerminal = function(a, b) {
  var c = this.edgesTargetTermCache;
  b && (c = this.edgeSourceTermCache);
  var d = c.get(a);
  if (null != d)
    return d;
  d = this.graph.view.getState(a);
  var e = null != d ? d.getVisibleTerminal(b) : this.graph.view.getVisibleTerminal(a, b);
  null == e && (e = null != d ? d.getVisibleTerminal(b) : this.graph.view.getVisibleTerminal(a, b));
  null != e && (this.isPort(e) && (e = this.graph.model.getParent(e)), c.put(a, e));
  return e;
};
mxSwimlaneLayout.prototype.run = function(a) {
  var b = [],
    c = {};
  if (null != this.swimlanes && 0 < this.swimlanes.length && null != a) {
    for (var d = {}, e = 0; e < this.swimlanes.length; e++)
      this.filterDescendants(this.swimlanes[e], d);
    this.roots = [];
    e = !0;
    for (var f in d)
      if (null != d[f]) {
        e = !1;
        break;
      }
    for (var g = 0; !e && g < this.swimlanes.length;) {
      var k = this.findRoots(this.swimlanes[g], d);
      if (0 == k.length)
        g++;
      else {
        for (e = 0; e < k.length; e++) {
          var l = {};
          b.push(l);
          this.traverse(k[e], !0, null, c, l, b, d, g);
        }
        for (e = 0; e < k.length; e++)
          this.roots.push(k[e]);
        e = !0;
        for (f in d)
          if (null != d[f]) {
            e = !1;
            break;
          }
      }
    }
  } else
    for (e = 0; e < this.roots.length; e++)
      l = {}, b.push(l), this.traverse(this.roots[e], !0, null, c, l, b, null);
  b = [];
  for (f in c)
    b.push(c[f]);
  this.model = new mxSwimlaneModel(this, b, this.roots, a, this.tightenToSource);
  this.cycleStage(a);
  this.layeringStage();
  this.crossingStage(a);
  this.placementStage(0, a);
};
mxSwimlaneLayout.prototype.filterDescendants = function(a, b) {
  var c = this.graph.model;
  c.isVertex(a) && a != this.parent && c.getParent(a) != this.parent && this.graph.isCellVisible(a) && (b[mxObjectIdentity.get(a)] = a);
  if (this.traverseAncestors || a == this.parent && this.graph.isCellVisible(a))
    for (var d = c.getChildCount(a), e = 0; e < d; e++) {
      var f = c.getChildAt(a, e);
      this.isPort(f) || this.filterDescendants(f, b);
    }
};
mxSwimlaneLayout.prototype.isPort = function(a) {
  return a.geometry.relative ? !0 : !1;
};
mxSwimlaneLayout.prototype.getEdgesBetween = function(a, b, c) {
  c = null != c ? c : !1;
  for (var d = this.getEdges(a), e = [], f = 0; f < d.length; f++) {
    var g = this.getVisibleTerminal(d[f], !0),
      k = this.getVisibleTerminal(d[f], !1);
    (g == a && k == b || !c && g == b && k == a) && e.push(d[f]);
  }
  return e;
};
mxSwimlaneLayout.prototype.traverse = function(a, b, c, d, e, f, g, k) {
  if (null != a && null != d) {
    var l = mxObjectIdentity.get(a);
    if (null == d[l] && (null == g || null != g[l])) {
      null == e[l] && (e[l] = a);
      null == d[l] && (d[l] = a);
      null !== g && delete g[l];
      var m = this.getEdges(a);
      l = this.graph.model;
      for (c = 0; c < m.length; c++) {
        var n = this.getVisibleTerminal(m[c], !0),
          p = n == a;
        p && (n = this.getVisibleTerminal(m[c], !1));
        for (var r = 0; r < this.swimlanes.length && !l.isAncestor(this.swimlanes[r], n);)
          r++;
        r >= this.swimlanes.length || !(r > k || (!b || p) && r == k) || (e = this.traverse(n, b, m[c], d, e, f, g, r));
      }
    } else if (null == e[l])
      for (c = 0; c < f.length; c++)
        if (a = f[c], null != a[l]) {
          for (m in a)
            e[m] = a[m];
          f.splice(c, 1);
          break;
        }
  }
  return e;
};
mxSwimlaneLayout.prototype.cycleStage = function(a) {
  new mxSwimlaneOrdering(this).execute(a);
};
mxSwimlaneLayout.prototype.layeringStage = function() {
  this.model.initialRank();
  this.model.fixRanks();
};
mxSwimlaneLayout.prototype.crossingStage = function(a) {
  new mxMedianHybridCrossingReduction(this).execute(a);
};
mxSwimlaneLayout.prototype.placementStage = function(a, b) {
  a = new mxCoordinateAssignment(this, this.intraCellSpacing, this.interRankCellSpacing, this.orientation, a, this.parallelEdgeSpacing);
  a.fineTuning = this.fineTuning;
  a.execute(b);
  return a.limitX + this.interHierarchySpacing;
};