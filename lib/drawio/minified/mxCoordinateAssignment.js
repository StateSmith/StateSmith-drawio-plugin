function mxCoordinateAssignment(a, b, c, d, e, f) {
  this.layout = a;
  this.intraCellSpacing = b;
  this.interRankCellSpacing = c;
  this.orientation = d;
  this.initialX = e;
  this.parallelEdgeSpacing = f;
}
mxCoordinateAssignment.prototype = new mxHierarchicalLayoutStage();
mxCoordinateAssignment.prototype.constructor = mxCoordinateAssignment;
mxCoordinateAssignment.prototype.layout = null;
mxCoordinateAssignment.prototype.intraCellSpacing = 30;
mxCoordinateAssignment.prototype.interRankCellSpacing = 100;
mxCoordinateAssignment.prototype.parallelEdgeSpacing = 10;
mxCoordinateAssignment.prototype.maxIterations = 8;
mxCoordinateAssignment.prototype.prefHozEdgeSep = 5;
mxCoordinateAssignment.prototype.prefVertEdgeOff = 2;
mxCoordinateAssignment.prototype.minEdgeJetty = 12;
mxCoordinateAssignment.prototype.channelBuffer = 4;
mxCoordinateAssignment.prototype.jettyPositions = null;
mxCoordinateAssignment.prototype.orientation = mxConstants.DIRECTION_NORTH;
mxCoordinateAssignment.prototype.initialX = null;
mxCoordinateAssignment.prototype.limitX = null;
mxCoordinateAssignment.prototype.currentXDelta = null;
mxCoordinateAssignment.prototype.widestRank = null;
mxCoordinateAssignment.prototype.rankTopY = null;
mxCoordinateAssignment.prototype.rankBottomY = null;
mxCoordinateAssignment.prototype.widestRankValue = null;
mxCoordinateAssignment.prototype.rankWidths = null;
mxCoordinateAssignment.prototype.rankY = null;
mxCoordinateAssignment.prototype.fineTuning = !0;
mxCoordinateAssignment.prototype.nextLayerConnectedCache = null;
mxCoordinateAssignment.prototype.previousLayerConnectedCache = null;
mxCoordinateAssignment.prototype.groupPadding = 10;
mxCoordinateAssignment.prototype.printStatus = function() {
  var a = this.layout.getModel();
  mxLog.show();
  mxLog.writeln('======Coord assignment debug=======');
  for (var b = 0; b < a.ranks.length; b++) {
    mxLog.write('Rank ', b, ' : ');
    for (var c = a.ranks[b], d = 0; d < c.length; d++)
      mxLog.write(c[d].getGeneralPurposeVariable(b), '  ');
    mxLog.writeln();
  }
  mxLog.writeln('====================================');
};
mxCoordinateAssignment.prototype.execute = function(a) {
  this.jettyPositions = {};
  a = this.layout.getModel();
  this.currentXDelta = 0;
  this.initialCoords(this.layout.getGraph(), a);
  this.fineTuning && this.minNode(a);
  var b = 100000000;
  if (this.fineTuning)
    for (var c = 0; c < this.maxIterations; c++) {
      0 != c && (this.medianPos(c, a), this.minNode(a));
      if (this.currentXDelta < b) {
        for (var d = 0; d < a.ranks.length; d++)
          for (var e = a.ranks[d], f = 0; f < e.length; f++) {
            var g = e[f];
            g.setX(d, g.getGeneralPurposeVariable(d));
          }
        b = this.currentXDelta;
      } else
        for (d = 0; d < a.ranks.length; d++)
          for (e = a.ranks[d], f = 0; f < e.length; f++)
            g = e[f], g.setGeneralPurposeVariable(d, g.getX(d));
      this.minPath(this.layout.getGraph(), a);
      this.currentXDelta = 0;
    }
  this.setCellLocations(this.layout.getGraph(), a);
};
mxCoordinateAssignment.prototype.minNode = function(a) {
  for (var b = [], c = new mxDictionary(), d = [], e = 0; e <= a.maxRank; e++) {
    d[e] = a.ranks[e];
    for (var f = 0; f < d[e].length; f++) {
      var g = d[e][f],
        k = new WeightedCellSorter(g, e);
      k.rankIndex = f;
      k.visited = !0;
      b.push(k);
      c.put(g, k);
    }
  }
  a = 10 * b.length;
  for (f = 0; 0 < b.length && f <= a;) {
    g = b.shift();
    e = g.cell;
    var l = g.weightedValue,
      m = parseInt(g.rankIndex);
    k = e.getNextLayerConnectedCells(l);
    var n = e.getPreviousLayerConnectedCells(l),
      p = k.length,
      r = n.length,
      q = this.medianXValue(k, l + 1),
      t = this.medianXValue(n, l - 1),
      u = p + r,
      x = e.getGeneralPurposeVariable(l),
      A = x;
    0 < u && (A = (q * p + t * r) / u);
    p = !1;
    A < x - 1 ? 0 == m ? (e.setGeneralPurposeVariable(l, A), p = !0) : (m = d[l][m - 1], x = m.getGeneralPurposeVariable(l), x = x + m.width / 2 + this.intraCellSpacing + e.width / 2, x < A ? (e.setGeneralPurposeVariable(l, A), p = !0) : x < e.getGeneralPurposeVariable(l) - 1 && (e.setGeneralPurposeVariable(l, x), p = !0)) : A > x + 1 && (m == d[l].length - 1 ? (e.setGeneralPurposeVariable(l, A), p = !0) : (m = d[l][m + 1], x = m.getGeneralPurposeVariable(l), x = x - m.width / 2 - this.intraCellSpacing - e.width / 2, x > A ? (e.setGeneralPurposeVariable(l, A), p = !0) : x > e.getGeneralPurposeVariable(l) + 1 && (e.setGeneralPurposeVariable(l, x), p = !0)));
    if (p) {
      for (e = 0; e < k.length; e++)
        l = k[e], l = c.get(l), null != l && 0 == l.visited && (l.visited = !0, b.push(l));
      for (e = 0; e < n.length; e++)
        l = n[e], l = c.get(l), null != l && 0 == l.visited && (l.visited = !0, b.push(l));
    }
    g.visited = !1;
    f++;
  }
};
mxCoordinateAssignment.prototype.medianPos = function(a, b) {
  if (0 == a % 2)
    for (a = b.maxRank; 0 < a; a--)
      this.rankMedianPosition(a - 1, b, a);
  else
    for (a = 0; a < b.maxRank - 1; a++)
      this.rankMedianPosition(a + 1, b, a);
};
mxCoordinateAssignment.prototype.rankMedianPosition = function(a, b, c) {
  b = b.ranks[a];
  for (var d = [], e = {}, f = 0; f < b.length; f++) {
    var g = b[f];
    d[f] = new WeightedCellSorter();
    d[f].cell = g;
    d[f].rankIndex = f;
    e[g.id] = d[f];
    var k = c < a ? g.getPreviousLayerConnectedCells(a) : g.getNextLayerConnectedCells(a);
    d[f].weightedValue = this.calculatedWeightedValue(g, k);
  }
  d.sort(WeightedCellSorter.prototype.compare);
  for (f = 0; f < d.length; f++) {
    g = d[f].cell;
    var l = 0;
    k = c < a ? g.getPreviousLayerConnectedCells(a).slice() : g.getNextLayerConnectedCells(a).slice();
    null != k && (l = k.length, l = 0 < l ? this.medianXValue(k, c) : g.getGeneralPurposeVariable(a));
    var m = 0;
    k = -100000000;
    for (var n = d[f].rankIndex - 1; 0 <= n;) {
      var p = e[b[n].id];
      if (null != p) {
        var r = p.cell;
        p.visited ? (k = r.getGeneralPurposeVariable(a) + r.width / 2 + this.intraCellSpacing + m + g.width / 2, n = -1) : (m += r.width + this.intraCellSpacing, n--);
      }
    }
    m = 0;
    r = 100000000;
    for (n = d[f].rankIndex + 1; n < d.length;)
      if (p = e[b[n].id], null != p) {
        var q = p.cell;
        p.visited ? (r = q.getGeneralPurposeVariable(a) - q.width / 2 - this.intraCellSpacing - m - g.width / 2, n = d.length) : (m += q.width + this.intraCellSpacing, n++);
      }
    l >= k && l <= r ? g.setGeneralPurposeVariable(a, l) : l < k ? (g.setGeneralPurposeVariable(a, k), this.currentXDelta += k - l) : l > r && (g.setGeneralPurposeVariable(a, r), this.currentXDelta += l - r);
    d[f].visited = !0;
  }
};
mxCoordinateAssignment.prototype.calculatedWeightedValue = function(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    var e = b[d];
    a.isVertex() && e.isVertex() ? c++ : c = a.isEdge() && e.isEdge() ? c + 8 : c + 2;
  }
  return c;
};
mxCoordinateAssignment.prototype.medianXValue = function(a, b) {
  if (0 == a.length)
    return 0;
  for (var c = [], d = 0; d < a.length; d++)
    c[d] = a[d].getGeneralPurposeVariable(b);
  c.sort(function(e, f) {
    return e - f;
  });
  if (1 == a.length % 2)
    return c[Math.floor(a.length / 2)];
  a = a.length / 2;
  return (c[a - 1] + c[a]) / 2;
};
mxCoordinateAssignment.prototype.initialCoords = function(a, b) {
  this.calculateWidestRank(a, b);
  for (var c = this.widestRank; 0 <= c; c--)
    c < b.maxRank && this.rankCoordinates(c, a, b);
  for (c = this.widestRank + 1; c <= b.maxRank; c++)
    0 < c && this.rankCoordinates(c, a, b);
};
mxCoordinateAssignment.prototype.rankCoordinates = function(a, b, c) {
  b = c.ranks[a];
  c = this.initialX + (this.widestRankValue - this.rankWidths[a]) / 2;
  for (var d = !1, e = 0; e < b.length; e++) {
    var f = b[e];
    if (f.isVertex()) {
      var g = this.layout.getVertexBounds(f.cell);
      null != g ? this.orientation == mxConstants.DIRECTION_NORTH || this.orientation == mxConstants.DIRECTION_SOUTH ? (f.width = g.width, f.height = g.height) : (f.width = g.height, f.height = g.width) : d = !0;
    } else
      f.isEdge() && (g = 1, null != f.edges ? g = f.edges.length : mxLog.warn('edge.edges is null'), f.width = (g - 1) * this.parallelEdgeSpacing);
    c += f.width / 2;
    f.setX(a, c);
    f.setGeneralPurposeVariable(a, c);
    c += f.width / 2;
    c += this.intraCellSpacing;
  }
  1 == d && mxLog.warn('At least one cell has no bounds');
};
mxCoordinateAssignment.prototype.calculateWidestRank = function(a, b) {
  a = -this.interRankCellSpacing;
  var c = 0;
  this.rankWidths = [];
  this.rankY = [];
  for (var d = b.maxRank; 0 <= d; d--) {
    for (var e = 0, f = b.ranks[d], g = this.initialX, k = !1, l = 0; l < f.length; l++) {
      var m = f[l];
      if (m.isVertex()) {
        var n = this.layout.getVertexBounds(m.cell);
        null != n ? this.orientation == mxConstants.DIRECTION_NORTH || this.orientation == mxConstants.DIRECTION_SOUTH ? (m.width = n.width, m.height = n.height) : (m.width = n.height, m.height = n.width) : k = !0;
        e = Math.max(e, m.height);
      } else
        m.isEdge() && (n = 1, null != m.edges ? n = m.edges.length : mxLog.warn('edge.edges is null'), m.width = (n - 1) * this.parallelEdgeSpacing);
      g += m.width / 2;
      m.setX(d, g);
      m.setGeneralPurposeVariable(d, g);
      g += m.width / 2;
      g += this.intraCellSpacing;
      g > this.widestRankValue && (this.widestRankValue = g, this.widestRank = d);
      this.rankWidths[d] = g;
    }
    1 == k && mxLog.warn('At least one cell has no bounds');
    this.rankY[d] = a;
    g = e / 2 + c / 2 + this.interRankCellSpacing;
    c = e;
    a = this.orientation == mxConstants.DIRECTION_NORTH || this.orientation == mxConstants.DIRECTION_WEST ? a + g : a - g;
    for (l = 0; l < f.length; l++)
      f[l].setY(d, a);
  }
};
mxCoordinateAssignment.prototype.minPath = function(a, b) {
  a = b.edgeMapper.getValues();
  for (var c = 0; c < a.length; c++) {
    var d = a[c];
    if (!(1 > d.maxRank - d.minRank - 1)) {
      for (var e = d.getGeneralPurposeVariable(d.minRank + 1), f = !0, g = 0, k = d.minRank + 2; k < d.maxRank; k++) {
        var l = d.getGeneralPurposeVariable(k);
        e != l ? (f = !1, e = l) : g++;
      }
      if (!f) {
        f = e = 0;
        l = [];
        var m = [],
          n = d.getGeneralPurposeVariable(d.minRank + 1);
        for (k = d.minRank + 1; k < d.maxRank - 1; k++) {
          var p = d.getX(k + 1);
          n == p ? (l[k - d.minRank - 1] = n, e++) : this.repositionValid(b, d, k + 1, n) ? (l[k - d.minRank - 1] = n, e++) : n = l[k - d.minRank - 1] = p;
        }
        n = d.getX(k);
        for (k = d.maxRank - 1; k > d.minRank + 1; k--)
          p = d.getX(k - 1), n == p ? (m[k - d.minRank - 2] = n, f++) : this.repositionValid(b, d, k - 1, n) ? (m[k - d.minRank - 2] = n, f++) : (m[k - d.minRank - 2] = d.getX(k - 1), n = p);
        if (f > g || e > g)
          if (f >= e)
            for (k = d.maxRank - 2; k > d.minRank; k--)
              d.setX(k, m[k - d.minRank - 1]);
          else if (e > f)
          for (k = d.minRank + 2; k < d.maxRank; k++)
            d.setX(k, l[k - d.minRank - 2]);
      }
    }
  }
};
mxCoordinateAssignment.prototype.repositionValid = function(a, b, c, d) {
  a = a.ranks[c];
  for (var e = -1, f = 0; f < a.length; f++)
    if (b == a[f]) {
      e = f;
      break;
    }
  if (0 > e)
    return !1;
  f = b.getGeneralPurposeVariable(c);
  if (d < f) {
    if (0 == e)
      return !0;
    a = a[e - 1];
    c = a.getGeneralPurposeVariable(c);
    c = c + a.width / 2 + this.intraCellSpacing + b.width / 2;
    if (!(c <= d))
      return !1;
  } else if (d > f) {
    if (e == a.length - 1)
      return !0;
    a = a[e + 1];
    c = a.getGeneralPurposeVariable(c);
    c = c - a.width / 2 - this.intraCellSpacing - b.width / 2;
    if (!(c >= d))
      return !1;
  }
  return !0;
};
mxCoordinateAssignment.prototype.setCellLocations = function(a, b) {
  this.rankTopY = [];
  this.rankBottomY = [];
  for (a = 0; a < b.ranks.length; a++)
    this.rankTopY[a] = Number.MAX_VALUE, this.rankBottomY[a] = -Number.MAX_VALUE;
  var c = b.vertexMapper.getValues();
  for (a = 0; a < c.length; a++)
    this.setVertexLocation(c[a]);
  this.layout.edgeStyle != mxHierarchicalEdgeStyle.ORTHOGONAL && this.layout.edgeStyle != mxHierarchicalEdgeStyle.POLYLINE && this.layout.edgeStyle != mxHierarchicalEdgeStyle.CURVE || this.localEdgeProcessing(b);
  b = b.edgeMapper.getValues();
  for (a = 0; a < b.length; a++)
    this.setEdgePosition(b[a]);
};
mxCoordinateAssignment.prototype.localEdgeProcessing = function(a) {
  for (var b = 0; b < a.ranks.length; b++)
    for (var c = a.ranks[b], d = 0; d < c.length; d++) {
      var e = c[d];
      if (e.isVertex())
        for (var f = e.getPreviousLayerConnectedCells(b), g = b - 1, k = 0; 2 > k; k++) {
          if (-1 < g && g < a.ranks.length && null != f && 0 < f.length) {
            for (var l = [], m = 0; m < f.length; m++) {
              var n = new WeightedCellSorter(f[m], f[m].getX(g));
              l.push(n);
            }
            l.sort(WeightedCellSorter.prototype.compare);
            n = e.x[0] - e.width / 2;
            var p = n + e.width,
              r = f = 0;
            g = [];
            for (m = 0; m < l.length; m++) {
              var q = l[m].cell;
              if (q.isVertex())
                for (var t = 0 == k ? e.connectsAsSource : e.connectsAsTarget, u = 0; u < t.length; u++) {
                  if (t[u].source == q || t[u].target == q)
                    f += t[u].edges.length, r++, g.push(t[u]);
                }
              else
                f += q.edges.length, r++, g.push(q);
            }
            e.width > (f + 1) * this.prefHozEdgeSep + 2 * this.prefHozEdgeSep && (n += this.prefHozEdgeSep, p -= this.prefHozEdgeSep);
            l = (p - n) / f;
            n += l / 2;
            p = this.minEdgeJetty - this.prefVertEdgeOff;
            for (m = 0; m < g.length; m++)
              for (r = g[m].edges.length, q = this.jettyPositions[g[m].ids[0]], null == q && (q = [], this.jettyPositions[g[m].ids[0]] = q), m < f / 2 ? p += this.prefVertEdgeOff : m > f / 2 && (p -= this.prefVertEdgeOff), t = 0; t < r; t++)
                q[4 * t + 2 * k] = n, n += l, q[4 * t + 2 * k + 1] = p;
          }
          f = e.getNextLayerConnectedCells(b);
          g = b + 1;
        }
    }
};
mxCoordinateAssignment.prototype.setEdgePosition = function(a) {
  var b = 0;
  if (101207 != a.temp[0]) {
    var c = a.maxRank,
      d = a.minRank;
    c == d && (c = a.source.maxRank, d = a.target.minRank);
    for (var e = 0, f = this.jettyPositions[a.ids[0]], g = a.isReversed ? a.target.cell : a.source.cell, k = this.layout.graph, l = this.orientation == mxConstants.DIRECTION_EAST || this.orientation == mxConstants.DIRECTION_SOUTH, m = 0; m < a.edges.length; m++) {
      var n = a.edges[m],
        p = this.layout.getVisibleTerminal(n, !0),
        r = [],
        q = a.isReversed;
      p != g && (q = !q);
      if (null != f) {
        var t = q ? 2 : 0,
          u = q ? l ? this.rankBottomY[d] : this.rankTopY[d] : l ? this.rankTopY[c] : this.rankBottomY[c],
          x = f[4 * e + 1 + t];
        q != l && (x = -x);
        u += x;
        t = f[4 * e + t];
        var A = k.model.getTerminal(n, !0);
        this.layout.isPort(A) && k.model.getParent(A) == p && (t = k.view.getState(A), t = null != t ? t.x : p.geometry.x + a.source.width * A.geometry.x);
        this.orientation == mxConstants.DIRECTION_NORTH || this.orientation == mxConstants.DIRECTION_SOUTH ? (r.push(new mxPoint(t, u)), this.layout.edgeStyle == mxHierarchicalEdgeStyle.CURVE && r.push(new mxPoint(t, u + x))) : (r.push(new mxPoint(u, t)), this.layout.edgeStyle == mxHierarchicalEdgeStyle.CURVE && r.push(new mxPoint(u + x, t)));
      }
      t = a.x.length - 1;
      u = x = -1;
      p = a.maxRank - 1;
      for (q && (t = 0, x = a.x.length, u = 1, p = a.minRank + 1); a.maxRank != a.minRank && t != x; t += u) {
        A = a.x[t] + b;
        var E = (this.rankTopY[p] + this.rankBottomY[p + 1]) / 2,
          C = (this.rankTopY[p - 1] + this.rankBottomY[p]) / 2;
        if (q) {
          var D = E;
          E = C;
          C = D;
        }
        this.orientation == mxConstants.DIRECTION_NORTH || this.orientation == mxConstants.DIRECTION_SOUTH ? (r.push(new mxPoint(A, E)), r.push(new mxPoint(A, C))) : (r.push(new mxPoint(E, A)), r.push(new mxPoint(C, A)));
        this.limitX = Math.max(this.limitX, A);
        p += u;
      }
      null != f && (t = q ? 2 : 0, u = q ? l ? this.rankTopY[c] : this.rankBottomY[c] : l ? this.rankBottomY[d] : this.rankTopY[d], x = f[4 * e + 3 - t], q != l && (x = -x), u -= x, t = f[4 * e + 2 - t], q = k.model.getTerminal(n, !1), p = this.layout.getVisibleTerminal(n, !1), this.layout.isPort(q) && k.model.getParent(q) == p && (t = k.view.getState(q), t = null != t ? t.x : p.geometry.x + a.target.width * q.geometry.x), this.orientation == mxConstants.DIRECTION_NORTH || this.orientation == mxConstants.DIRECTION_SOUTH ? (this.layout.edgeStyle == mxHierarchicalEdgeStyle.CURVE && r.push(new mxPoint(t, u - x)), r.push(new mxPoint(t, u))) : (this.layout.edgeStyle == mxHierarchicalEdgeStyle.CURVE && r.push(new mxPoint(u - x, t)), r.push(new mxPoint(u, t))));
      a.isReversed && this.processReversedEdge(a, n);
      this.layout.setEdgePoints(n, r);
      b = 0 == b ? this.parallelEdgeSpacing : 0 < b ? -b : -b + this.parallelEdgeSpacing;
      e++;
    }
    a.temp[0] = 101207;
  }
};
mxCoordinateAssignment.prototype.setVertexLocation = function(a) {
  var b = a.cell,
    c = a.x[0] - a.width / 2,
    d = a.y[0] - a.height / 2;
  this.rankTopY[a.minRank] = Math.min(this.rankTopY[a.minRank], d);
  this.rankBottomY[a.minRank] = Math.max(this.rankBottomY[a.minRank], d + a.height);
  this.orientation == mxConstants.DIRECTION_NORTH || this.orientation == mxConstants.DIRECTION_SOUTH ? this.layout.setVertexLocation(b, c, d) : this.layout.setVertexLocation(b, d, c);
  this.limitX = Math.max(this.limitX, c + a.width);
};
mxCoordinateAssignment.prototype.processReversedEdge = function(a, b) {};