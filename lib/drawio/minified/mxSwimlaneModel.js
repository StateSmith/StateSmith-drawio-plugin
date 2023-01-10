function mxSwimlaneModel(a, b, c, d, e) {
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
mxSwimlaneModel.prototype.maxRank = null;
mxSwimlaneModel.prototype.vertexMapper = null;
mxSwimlaneModel.prototype.edgeMapper = null;
mxSwimlaneModel.prototype.ranks = null;
mxSwimlaneModel.prototype.roots = null;
mxSwimlaneModel.prototype.parent = null;
mxSwimlaneModel.prototype.dfsCount = 0;
mxSwimlaneModel.prototype.SOURCESCANSTARTRANK = 100000000;
mxSwimlaneModel.prototype.tightenToSource = !1;
mxSwimlaneModel.prototype.ranksPerGroup = null;
mxSwimlaneModel.prototype.createInternalCells = function(a, b, c) {
  for (var d = a.getGraph(), e = a.swimlanes, f = 0; f < b.length; f++) {
    c[f] = new mxGraphHierarchyNode(b[f]);
    this.vertexMapper.put(b[f], c[f]);
    c[f].swimlaneIndex = -1;
    for (var g = 0; g < e.length; g++)
      if (d.model.getParent(b[f]) == e[g]) {
        c[f].swimlaneIndex = g;
        break;
      }
    g = a.getEdges(b[f]);
    c[f].connectsAsSource = [];
    for (var k = 0; k < g.length; k++) {
      var l = a.getVisibleTerminal(g[k], !1);
      if (l != b[f] && a.graph.model.isVertex(l) && !a.isVertexIgnored(l)) {
        var m = a.getEdgesBetween(b[f], l, !1);
        l = a.getEdgesBetween(b[f], l, !0);
        if (null != m && 0 < m.length && null == this.edgeMapper.get(m[0]) && 2 * l.length >= m.length) {
          l = new mxGraphHierarchyEdge(m);
          for (var n = 0; n < m.length; n++) {
            var p = m[n];
            this.edgeMapper.put(p, l);
            d.resetEdge(p);
            a.disableEdgeStyle && (a.setEdgeStyleEnabled(p, !1), a.setOrthogonalEdge(p, !0));
          }
          l.source = c[f];
          0 > mxUtils.indexOf(c[f].connectsAsSource, l) && c[f].connectsAsSource.push(l);
        }
      }
    }
    c[f].temp[0] = 0;
  }
};
mxSwimlaneModel.prototype.initialRank = function() {
  this.ranksPerGroup = [];
  var a = [],
    b = {};
  if (null != this.roots)
    for (var c = 0; c < this.roots.length; c++) {
      var d = this.vertexMapper.get(this.roots[c]);
      this.maxChainDfs(null, d, null, b, 0);
      null != d && a.push(d);
    }
  d = [];
  b = [];
  for (c = this.ranksPerGroup.length - 1; 0 <= c; c--)
    d[c] = c == this.ranksPerGroup.length - 1 ? 0 : b[c + 1] + 1, b[c] = d[c] + this.ranksPerGroup[c];
  this.maxRank = b[0];
  d = this.vertexMapper.getValues();
  for (c = 0; c < d.length; c++)
    d[c].temp[0] = -1;
  for (a.slice(); 0 < a.length;) {
    d = a[0];
    var e = d.connectsAsTarget,
      f = d.connectsAsSource,
      g = !0,
      k = b[0];
    for (c = 0; c < e.length; c++) {
      var l = e[c];
      if (5270620 == l.temp[0])
        l = l.source, k = Math.min(k, l.temp[0] - 1);
      else {
        g = !1;
        break;
      }
    }
    if (g) {
      k > b[d.swimlaneIndex] && (k = b[d.swimlaneIndex]);
      d.temp[0] = k;
      if (null != f)
        for (c = 0; c < f.length; c++)
          l = f[c], l.temp[0] = 5270620, l = l.target, -1 == l.temp[0] && (a.push(l), l.temp[0] = -2);
      a.shift();
    } else if (c = a.shift(), a.push(d), c == d && 1 == a.length)
      break;
  }
};
mxSwimlaneModel.prototype.maxChainDfs = function(a, b, c, d, e) {
  if (null != b && (a = mxCellPath.create(b.cell), null == d[a])) {
    d[a] = b;
    a = b.swimlaneIndex;
    if (null == this.ranksPerGroup[a] || this.ranksPerGroup[a] < e)
      this.ranksPerGroup[a] = e;
    a = b.connectsAsSource.slice();
    for (c = 0; c < a.length; c++) {
      var f = a[c],
        g = f.target;
      b.swimlaneIndex < g.swimlaneIndex ? this.maxChainDfs(b, g, f, mxUtils.clone(d, null, !0), 0) : b.swimlaneIndex == g.swimlaneIndex && this.maxChainDfs(b, g, f, mxUtils.clone(d, null, !0), e + 1);
    }
  }
};
mxSwimlaneModel.prototype.fixRanks = function() {
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
mxSwimlaneModel.prototype.visit = function(a, b, c, d) {
  if (null != b) {
    for (var e = 0; e < b.length; e++) {
      var f = b[e];
      null != f && (null == d && (d = {}), c ? (f.hashCode = [], f.hashCode[0] = this.dfsCount, f.hashCode[1] = e, this.extendedDfs(null, f, null, a, d, f.hashCode, e, 0)) : this.dfs(null, f, null, a, d, 0));
    }
    this.dfsCount++;
  }
};
mxSwimlaneModel.prototype.dfs = function(a, b, c, d, e, f) {
  if (null != b) {
    var g = b.id;
    if (null == e[g])
      for (e[g] = b, d(a, b, c, f, 0), a = b.connectsAsSource.slice(), c = 0; c < a.length; c++)
        g = a[c], this.dfs(b, g.target, g, d, e, f + 1);
    else
      d(a, b, c, f, 1);
  }
};
mxSwimlaneModel.prototype.extendedDfs = function(a, b, c, d, e, f, g, k) {
  if (null != b)
    if (null == a || null != b.hashCode && b.hashCode[0] == a.hashCode[0] || (f = a.hashCode.length + 1, b.hashCode = a.hashCode.slice(), b.hashCode[f - 1] = g), g = b.id, null == e[g]) {
      e[g] = b;
      d(a, b, c, k, 0);
      a = b.connectsAsSource.slice();
      c = b.connectsAsTarget.slice();
      for (g = 0; g < a.length; g++) {
        f = a[g];
        var l = f.target;
        b.swimlaneIndex <= l.swimlaneIndex && this.extendedDfs(b, l, f, d, e, b.hashCode, g, k + 1);
      }
      for (g = 0; g < c.length; g++)
        f = c[g], l = f.source, b.swimlaneIndex < l.swimlaneIndex && this.extendedDfs(b, l, f, d, e, b.hashCode, g, k + 1);
    } else
      d(a, b, c, k, 1);
};