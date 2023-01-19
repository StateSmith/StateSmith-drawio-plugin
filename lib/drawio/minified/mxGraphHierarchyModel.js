function mxGraphHierarchyModel(a, b, c, d, e) {
  a.getGraph();
  this.tightenToSource = e;
  this.roots = c;
  this.parent = d;
  this.vertexMapper = new mxDictionary();
  this.edgeMapper = new mxDictionary();
  this.maxRank = 0;
  c = [];
  null == b && (b = this.graph.getChildVertices(d));
  this.maxRank = this.SOURCESCANSTARTRANK;
  this.createInternalCells(a, b, c);
  for (d = 0; d < b.length; d++) {
    e = c[d].connectsAsSource;
    for (var f = 0; f < e.length; f++) {
      var g = e[f],
        k = g.edges;
      if (null != k && 0 < k.length) {
        k = k[0];
        var l = a.getVisibleTerminal(k, !1);
        l = this.vertexMapper.get(l);
        c[d] == l && (l = a.getVisibleTerminal(k, !0), l = this.vertexMapper.get(l));
        null != l && c[d] != l && (g.target = l, 0 == l.connectsAsTarget.length && (l.connectsAsTarget = []), 0 > mxUtils.indexOf(l.connectsAsTarget, g) && l.connectsAsTarget.push(g));
      }
    }
    c[d].temp[0] = 1;
  }
}
mxGraphHierarchyModel.prototype.maxRank = null;
mxGraphHierarchyModel.prototype.vertexMapper = null;
mxGraphHierarchyModel.prototype.edgeMapper = null;
mxGraphHierarchyModel.prototype.ranks = null;
mxGraphHierarchyModel.prototype.roots = null;
mxGraphHierarchyModel.prototype.parent = null;
mxGraphHierarchyModel.prototype.dfsCount = 0;
mxGraphHierarchyModel.prototype.SOURCESCANSTARTRANK = 100000000;
mxGraphHierarchyModel.prototype.tightenToSource = !1;
mxGraphHierarchyModel.prototype.createInternalCells = function(a, b, c) {
  for (var d = a.getGraph(), e = 0; e < b.length; e++) {
    c[e] = new mxGraphHierarchyNode(b[e]);
    this.vertexMapper.put(b[e], c[e]);
    var f = a.getEdges(b[e]);
    c[e].connectsAsSource = [];
    for (var g = 0; g < f.length; g++) {
      var k = a.getVisibleTerminal(f[g], !1);
      if (k != b[e] && a.graph.model.isVertex(k) && !a.isVertexIgnored(k)) {
        var l = a.getEdgesBetween(b[e], k, !1);
        k = a.getEdgesBetween(b[e], k, !0);
        if (null != l && 0 < l.length && null == this.edgeMapper.get(l[0]) && 2 * k.length >= l.length) {
          k = new mxGraphHierarchyEdge(l);
          for (var m = 0; m < l.length; m++) {
            var n = l[m];
            this.edgeMapper.put(n, k);
            d.resetEdge(n);
            a.disableEdgeStyle && (a.setEdgeStyleEnabled(n, !1), a.setOrthogonalEdge(n, !0));
          }
          k.source = c[e];
          0 > mxUtils.indexOf(c[e].connectsAsSource, k) && c[e].connectsAsSource.push(k);
        }
      }
    }
    c[e].temp[0] = 0;
  }
};
mxGraphHierarchyModel.prototype.initialRank = function() {
  var a = [];
  if (null != this.roots)
    for (var b = 0; b < this.roots.length; b++) {
      var c = this.vertexMapper.get(this.roots[b]);
      null != c && a.push(c);
    }
  var d = this.vertexMapper.getValues();
  for (b = 0; b < d.length; b++)
    d[b].temp[0] = -1;
  for (var e = a.slice(); 0 < a.length;) {
    c = a[0];
    var f = c.connectsAsTarget,
      g = c.connectsAsSource,
      k = !0,
      l = this.SOURCESCANSTARTRANK;
    for (b = 0; b < f.length; b++) {
      var m = f[b];
      if (5270620 == m.temp[0])
        m = m.source, l = Math.min(l, m.temp[0] - 1);
      else {
        k = !1;
        break;
      }
    }
    if (k) {
      c.temp[0] = l;
      this.maxRank = Math.min(this.maxRank, l);
      if (null != g)
        for (b = 0; b < g.length; b++)
          m = g[b], m.temp[0] = 5270620, m = m.target, -1 == m.temp[0] && (a.push(m), m.temp[0] = -2);
      a.shift();
    } else if (b = a.shift(), a.push(c), b == c && 1 == a.length)
      break;
  }
  for (b = 0; b < d.length; b++)
    d[b].temp[0] -= this.maxRank;
  for (b = 0; b < e.length; b++)
    for (c = e[b], a = 0, f = c.connectsAsSource, d = 0; d < f.length; d++)
      m = f[d], m = m.target, c.temp[0] = Math.max(a, m.temp[0] + 1), a = c.temp[0];
  this.maxRank = this.SOURCESCANSTARTRANK - this.maxRank;
};
mxGraphHierarchyModel.prototype.fixRanks = function() {
  var a = [];
  this.ranks = [];
  for (var b = 0; b < this.maxRank + 1; b++)
    a[b] = [], this.ranks[b] = a[b];
  var c = null;
  if (null != this.roots) {
    var d = this.roots;
    c = [];
    for (b = 0; b < d.length; b++) {
      var e = this.vertexMapper.get(d[b]);
      c[b] = e;
    }
  }
  this.visit(function(f, g, k, l, m) {
    0 == m && 0 > g.maxRank && 0 > g.minRank && (a[g.temp[0]].push(g), g.maxRank = g.temp[0], g.minRank = g.temp[0], g.temp[0] = a[g.maxRank].length - 1);
    if (null != f && null != k && 1 < f.maxRank - g.maxRank)
      for (k.maxRank = f.maxRank, k.minRank = g.maxRank, k.temp = [], k.x = [], k.y = [], f = k.minRank + 1; f < k.maxRank; f++)
        a[f].push(k), k.setGeneralPurposeVariable(f, a[f].length - 1);
  }, c, !1, null);
};
mxGraphHierarchyModel.prototype.visit = function(a, b, c, d) {
  if (null != b) {
    for (var e = 0; e < b.length; e++) {
      var f = b[e];
      null != f && (null == d && (d = {}), c ? (f.hashCode = [], f.hashCode[0] = this.dfsCount, f.hashCode[1] = e, this.extendedDfs(null, f, null, a, d, f.hashCode, e, 0)) : this.dfs(null, f, null, a, d, 0));
    }
    this.dfsCount++;
  }
};
mxGraphHierarchyModel.prototype.dfs = function(a, b, c, d, e, f) {
  if (null != b) {
    var g = b.id;
    if (null == e[g])
      for (e[g] = b, d(a, b, c, f, 0), a = b.connectsAsSource.slice(), c = 0; c < a.length; c++)
        g = a[c], this.dfs(b, g.target, g, d, e, f + 1);
    else
      d(a, b, c, f, 1);
  }
};
mxGraphHierarchyModel.prototype.extendedDfs = function(a, b, c, d, e, f, g, k) {
  if (null != b)
    if (null == a || null != b.hashCode && b.hashCode[0] == a.hashCode[0] || (f = a.hashCode.length + 1, b.hashCode = a.hashCode.slice(), b.hashCode[f - 1] = g), g = b.id, null == e[g])
      for (e[g] = b, d(a, b, c, k, 0), a = b.connectsAsSource.slice(), c = 0; c < a.length; c++)
        g = a[c], this.extendedDfs(b, g.target, g, d, e, b.hashCode, c, k + 1);
    else
      d(a, b, c, k, 1);
};