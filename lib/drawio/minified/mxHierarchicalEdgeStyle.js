var mxHierarchicalEdgeStyle = {
  ORTHOGONAL: 1,
  POLYLINE: 2,
  STRAIGHT: 3,
  CURVE: 4
};
mxHierarchicalLayout.prototype = new mxGraphLayout();
mxHierarchicalLayout.prototype.constructor = mxHierarchicalLayout;
mxHierarchicalLayout.prototype.roots = null;
mxHierarchicalLayout.prototype.resizeParent = !1;
mxHierarchicalLayout.prototype.maintainParentLocation = !1;
mxHierarchicalLayout.prototype.moveParent = !1;
mxHierarchicalLayout.prototype.parentBorder = 0;
mxHierarchicalLayout.prototype.intraCellSpacing = 30;
mxHierarchicalLayout.prototype.interRankCellSpacing = 100;
mxHierarchicalLayout.prototype.interHierarchySpacing = 60;
mxHierarchicalLayout.prototype.parallelEdgeSpacing = 10;
mxHierarchicalLayout.prototype.orientation = mxConstants.DIRECTION_NORTH;
mxHierarchicalLayout.prototype.fineTuning = !0;
mxHierarchicalLayout.prototype.tightenToSource = !0;
mxHierarchicalLayout.prototype.disableEdgeStyle = !0;
mxHierarchicalLayout.prototype.traverseAncestors = !0;
mxHierarchicalLayout.prototype.model = null;
mxHierarchicalLayout.prototype.edgesCache = null;
mxHierarchicalLayout.prototype.edgeSourceTermCache = null;
mxHierarchicalLayout.prototype.edgesTargetTermCache = null;
mxHierarchicalLayout.prototype.edgeStyle = mxHierarchicalEdgeStyle.POLYLINE;
mxHierarchicalLayout.prototype.getModel = function() {
  return this.model;
};
mxHierarchicalLayout.prototype.execute = function(a, b) {
  this.parent = a;
  var c = this.graph.model;
  this.edgesCache = new mxDictionary();
  this.edgeSourceTermCache = new mxDictionary();
  this.edgesTargetTermCache = new mxDictionary();
  null == b || b instanceof Array || (b = [b]);
  if (null != b || null != a) {
    this.parentY = this.parentX = null;
    if (a != this.root && null != c.isVertex(a) && this.maintainParentLocation) {
      var d = this.graph.getCellGeometry(a);
      null != d && (this.parentX = d.x, this.parentY = d.y);
    }
    if (null != b) {
      for (var e = [], f = 0; f < b.length; f++)
        (null != a ? c.isAncestor(a, b[f]) : 1) && c.isVertex(b[f]) && e.push(b[f]);
      this.roots = e;
    }
    c.beginUpdate();
    try {
      this.run(a), this.resizeParent && !this.graph.isCellCollapsed(a) && this.graph.updateGroupBounds([a], this.parentBorder, this.moveParent), null != this.parentX && null != this.parentY && (d = this.graph.getCellGeometry(a), null != d && (d = d.clone(), d.x = this.parentX, d.y = this.parentY, c.setGeometry(a, d)));
    } finally {
      c.endUpdate();
    }
  }
};
mxHierarchicalLayout.prototype.findRoots = function(a, b) {
  var c = [];
  if (null != a && null != b) {
    a = this.graph.model;
    var d = null,
      e = -100000,
      f;
    for (f in b) {
      var g = b[f];
      if (a.isVertex(g) && this.graph.isCellVisible(g)) {
        for (var k = this.getEdges(g), l = 0, m = 0, n = 0; n < k.length; n++)
          this.getVisibleTerminal(k[n], !0) == g ? l++ : m++;
        0 == m && 0 < l && c.push(g);
        k = l - m;
        k > e && (e = k, d = g);
      }
    }
    0 == c.length && null != d && c.push(d);
  }
  return c;
};
mxHierarchicalLayout.prototype.getEdges = function(a) {
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
    d = this.getVisibleTerminal(b[f], !0), e = this.getVisibleTerminal(b[f], !1), (d == e || d != e && (e == a && (null == this.parent || this.isAncestor(this.parent, d, this.traverseAncestors)) || d == a && (null == this.parent || this.isAncestor(this.parent, e, this.traverseAncestors)))) && c.push(b[f]);
  this.edgesCache.put(a, c);
  return c;
};
mxHierarchicalLayout.prototype.getVisibleTerminal = function(a, b) {
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
mxHierarchicalLayout.prototype.run = function(a) {
  var b = [],
    c = [];
  if (null == this.roots && null != a) {
    var d = {};
    this.filterDescendants(a, d);
    this.roots = [];
    var e = !0,
      f;
    for (f in d)
      if (null != d[f]) {
        e = !1;
        break;
      }
    for (; !e;) {
      var g = this.findRoots(a, d);
      for (e = 0; e < g.length; e++) {
        var k = {};
        b.push(k);
        this.traverse(g[e], !0, null, c, k, b, d);
      }
      for (e = 0; e < g.length; e++)
        this.roots.push(g[e]);
      e = !0;
      for (f in d)
        if (null != d[f]) {
          e = !1;
          break;
        }
    }
  } else
    for (e = 0; e < this.roots.length; e++)
      k = {}, b.push(k), this.traverse(this.roots[e], !0, null, c, k, b, null);
  for (e = c = 0; e < b.length; e++) {
    k = b[e];
    d = [];
    for (f in k)
      d.push(k[f]);
    this.model = new mxGraphHierarchyModel(this, d, this.roots, a, this.tightenToSource);
    this.cycleStage(a);
    this.layeringStage();
    this.crossingStage(a);
    c = this.placementStage(c, a);
  }
};
mxHierarchicalLayout.prototype.filterDescendants = function(a, b) {
  var c = this.graph.model;
  c.isVertex(a) && a != this.parent && this.graph.isCellVisible(a) && (b[mxObjectIdentity.get(a)] = a);
  if (this.traverseAncestors || a == this.parent && this.graph.isCellVisible(a))
    for (var d = c.getChildCount(a), e = 0; e < d; e++) {
      var f = c.getChildAt(a, e);
      this.isPort(f) || this.filterDescendants(f, b);
    }
};
mxHierarchicalLayout.prototype.isPort = function(a) {
  return null != a && null != a.geometry ? a.geometry.relative : !1;
};
mxHierarchicalLayout.prototype.getEdgesBetween = function(a, b, c) {
  c = null != c ? c : !1;
  for (var d = this.getEdges(a), e = [], f = 0; f < d.length; f++) {
    var g = this.getVisibleTerminal(d[f], !0),
      k = this.getVisibleTerminal(d[f], !1);
    (g == a && k == b || !c && g == b && k == a) && e.push(d[f]);
  }
  return e;
};
mxHierarchicalLayout.prototype.traverse = function(a, b, c, d, e, f, g) {
  if (null != a && null != d) {
    var k = mxObjectIdentity.get(a);
    if (null == d[k] && (null == g || null != g[k])) {
      null == e[k] && (e[k] = a);
      null == d[k] && (d[k] = a);
      null !== g && delete g[k];
      var l = this.getEdges(a);
      k = [];
      for (c = 0; c < l.length; c++)
        k[c] = this.getVisibleTerminal(l[c], !0) == a;
      for (c = 0; c < l.length; c++)
        if (!b || k[c]) {
          a = this.getVisibleTerminal(l[c], !k[c]);
          for (var m = 1, n = 0; n < l.length; n++)
            if (n != c) {
              var p = k[n];
              this.getVisibleTerminal(l[n], !p) == a && (p ? m++ : m--);
            }
          0 <= m && (e = this.traverse(a, b, l[c], d, e, f, g));
        }
    } else if (null == e[k])
      for (c = 0; c < f.length; c++)
        if (b = f[c], null != b[k]) {
          for (l in b)
            e[l] = b[l];
          f.splice(c, 1);
          break;
        }
  }
  return e;
};
mxHierarchicalLayout.prototype.cycleStage = function(a) {
  new mxMinimumCycleRemover(this).execute(a);
};
mxHierarchicalLayout.prototype.layeringStage = function() {
  this.model.initialRank();
  this.model.fixRanks();
};
mxHierarchicalLayout.prototype.crossingStage = function(a) {
  new mxMedianHybridCrossingReduction(this).execute(a);
};
mxHierarchicalLayout.prototype.placementStage = function(a, b) {
  a = new mxCoordinateAssignment(this, this.intraCellSpacing, this.interRankCellSpacing, this.orientation, a, this.parallelEdgeSpacing);
  a.fineTuning = this.fineTuning;
  a.execute(b);
  return a.limitX + this.interHierarchySpacing;
};