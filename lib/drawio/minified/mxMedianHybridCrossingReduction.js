function mxMedianHybridCrossingReduction(a) {
  this.layout = a;
}
mxMedianHybridCrossingReduction.prototype = new mxHierarchicalLayoutStage();
mxMedianHybridCrossingReduction.prototype.constructor = mxMedianHybridCrossingReduction;
mxMedianHybridCrossingReduction.prototype.layout = null;
mxMedianHybridCrossingReduction.prototype.maxIterations = 24;
mxMedianHybridCrossingReduction.prototype.nestedBestRanks = null;
mxMedianHybridCrossingReduction.prototype.currentBestCrossings = 0;
mxMedianHybridCrossingReduction.prototype.iterationsWithoutImprovement = 0;
mxMedianHybridCrossingReduction.prototype.maxNoImprovementIterations = 2;
mxMedianHybridCrossingReduction.prototype.execute = function(a) {
  a = this.layout.getModel();
  this.nestedBestRanks = [];
  for (var b = 0; b < a.ranks.length; b++)
    this.nestedBestRanks[b] = a.ranks[b].slice();
  var c = 0,
    d = this.calculateCrossings(a);
  for (b = 0; b < this.maxIterations && c < this.maxNoImprovementIterations; b++) {
    this.weightedMedian(b, a);
    this.transpose(b, a);
    var e = this.calculateCrossings(a);
    if (e < d)
      for (d = e, e = c = 0; e < this.nestedBestRanks.length; e++)
        for (var f = a.ranks[e], g = 0; g < f.length; g++) {
          var k = f[g];
          this.nestedBestRanks[e][k.getGeneralPurposeVariable(e)] = k;
        }
    else
      for (c++, e = 0; e < this.nestedBestRanks.length; e++)
        for (f = a.ranks[e], g = 0; g < f.length; g++)
          k = f[g], k.setGeneralPurposeVariable(e, g);
    if (0 == d)
      break;
  }
  c = [];
  d = [];
  for (b = 0; b < a.maxRank + 1; b++)
    d[b] = [], c[b] = d[b];
  for (b = 0; b < this.nestedBestRanks.length; b++)
    for (e = 0; e < this.nestedBestRanks[b].length; e++)
      d[b].push(this.nestedBestRanks[b][e]);
  a.ranks = c;
};
mxMedianHybridCrossingReduction.prototype.calculateCrossings = function(a) {
  for (var b = a.ranks.length, c = 0, d = 1; d < b; d++)
    c += this.calculateRankCrossing(d, a);
  return c;
};
mxMedianHybridCrossingReduction.prototype.calculateRankCrossing = function(a, b) {
  var c = 0,
    d = b.ranks[a],
    e = b.ranks[a - 1],
    f = [];
  for (b = 0; b < d.length; b++) {
    var g = d[b],
      k = g.getGeneralPurposeVariable(a);
    g = g.getPreviousLayerConnectedCells(a);
    for (var l = [], m = 0; m < g.length; m++) {
      var n = g[m].getGeneralPurposeVariable(a - 1);
      l.push(n);
    }
    l.sort(function(p, r) {
      return p - r;
    });
    f[k] = l;
  }
  a = [];
  for (b = 0; b < f.length; b++)
    a = a.concat(f[b]);
  for (d = 1; d < e.length;)
    d <<= 1;
  f = 2 * d - 1;
  --d;
  e = [];
  for (b = 0; b < f; ++b)
    e[b] = 0;
  for (b = 0; b < a.length; b++)
    for (f = a[b] + d, ++e[f]; 0 < f;)
      f % 2 && (c += e[f + 1]), f = f - 1 >> 1, ++e[f];
  return c;
};
mxMedianHybridCrossingReduction.prototype.transpose = function(a, b) {
  for (var c = !0, d = 0; c && 10 > d++;) {
    var e = 1 == a % 2 && 1 == d % 2;
    c = !1;
    for (var f = 0; f < b.ranks.length; f++) {
      for (var g = b.ranks[f], k = [], l = 0; l < g.length; l++) {
        var m = g[l],
          n = m.getGeneralPurposeVariable(f);
        0 > n && (n = l);
        k[n] = m;
      }
      var p = null,
        r = null,
        q = null,
        t = null,
        u = null;
      for (l = 0; l < g.length - 1; l++) {
        if (0 == l) {
          var x = k[l];
          m = x.getNextLayerConnectedCells(f);
          n = x.getPreviousLayerConnectedCells(f);
          for (var A = [], E = [], C = 0; C < m.length; C++)
            A[C] = m[C].getGeneralPurposeVariable(f + 1);
          for (C = 0; C < n.length; C++)
            E[C] = n[C].getGeneralPurposeVariable(f - 1);
        } else
          m = p, n = r, A = q, E = t, x = u;
        u = k[l + 1];
        p = u.getNextLayerConnectedCells(f);
        r = u.getPreviousLayerConnectedCells(f);
        q = [];
        t = [];
        for (C = 0; C < p.length; C++)
          q[C] = p[C].getGeneralPurposeVariable(f + 1);
        for (C = 0; C < r.length; C++)
          t[C] = r[C].getGeneralPurposeVariable(f - 1);
        var D = 0,
          B = 0;
        for (C = 0; C < A.length; C++)
          for (var v = 0; v < q.length; v++)
            A[C] > q[v] && D++, A[C] < q[v] && B++;
        for (C = 0; C < E.length; C++)
          for (v = 0; v < t.length; v++)
            E[C] > t[v] && D++, E[C] < t[v] && B++;
        if (B < D || B == D && e)
          p = x.getGeneralPurposeVariable(f), x.setGeneralPurposeVariable(f, u.getGeneralPurposeVariable(f)), u.setGeneralPurposeVariable(f, p), p = m, r = n, q = A, t = E, u = x, e || (c = !0);
      }
    }
  }
};
mxMedianHybridCrossingReduction.prototype.weightedMedian = function(a, b) {
  if (a = 0 == a % 2)
    for (var c = b.maxRank - 1; 0 <= c; c--)
      this.medianRank(c, a);
  else
    for (c = 1; c < b.maxRank; c++)
      this.medianRank(c, a);
};
mxMedianHybridCrossingReduction.prototype.medianRank = function(a, b) {
  for (var c = this.nestedBestRanks[a].length, d = [], e = [], f = 0; f < c; f++) {
    var g = this.nestedBestRanks[a][f],
      k = new MedianCellSorter();
    k.cell = g;
    var l = b ? g.getNextLayerConnectedCells(a) : g.getPreviousLayerConnectedCells(a),
      m = b ? a + 1 : a - 1;
    null != l && 0 != l.length ? (k.medianValue = this.medianValue(l, m), d.push(k)) : e[g.getGeneralPurposeVariable(a)] = !0;
  }
  d.sort(MedianCellSorter.prototype.compare);
  for (f = 0; f < c; f++)
    null == e[f] && (g = d.shift().cell, g.setGeneralPurposeVariable(a, f));
};
mxMedianHybridCrossingReduction.prototype.medianValue = function(a, b) {
  for (var c = [], d = 0, e = 0; e < a.length; e++) {
    var f = a[e];
    c[d++] = f.getGeneralPurposeVariable(b);
  }
  c.sort(function(g, k) {
    return g - k;
  });
  if (1 == d % 2)
    return c[Math.floor(d / 2)];
  if (2 == d)
    return (c[0] + c[1]) / 2;
  a = d / 2;
  b = c[a - 1] - c[0];
  d = c[d - 1] - c[a];
  return (c[a - 1] * d + c[a] * b) / (b + d);
};