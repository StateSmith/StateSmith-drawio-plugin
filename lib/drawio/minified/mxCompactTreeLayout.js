function mxCompactTreeLayout(a, b, c) {
  mxGraphLayout.call(this, a);
  this.horizontal = null != b ? b : !0;
  this.invert = null != c ? c : !1;
}
mxCompactTreeLayout.prototype = new mxGraphLayout();
mxCompactTreeLayout.prototype.constructor = mxCompactTreeLayout;
mxCompactTreeLayout.prototype.horizontal = null;
mxCompactTreeLayout.prototype.invert = null;
mxCompactTreeLayout.prototype.resizeParent = !0;
mxCompactTreeLayout.prototype.maintainParentLocation = !1;
mxCompactTreeLayout.prototype.groupPadding = 10;
mxCompactTreeLayout.prototype.groupPaddingTop = 0;
mxCompactTreeLayout.prototype.groupPaddingRight = 0;
mxCompactTreeLayout.prototype.groupPaddingBottom = 0;
mxCompactTreeLayout.prototype.groupPaddingLeft = 0;
mxCompactTreeLayout.prototype.parentsChanged = null;
mxCompactTreeLayout.prototype.moveTree = !1;
mxCompactTreeLayout.prototype.visited = null;
mxCompactTreeLayout.prototype.levelDistance = 10;
mxCompactTreeLayout.prototype.nodeDistance = 20;
mxCompactTreeLayout.prototype.resetEdges = !0;
mxCompactTreeLayout.prototype.prefHozEdgeSep = 5;
mxCompactTreeLayout.prototype.prefVertEdgeOff = 4;
mxCompactTreeLayout.prototype.minEdgeJetty = 8;
mxCompactTreeLayout.prototype.channelBuffer = 4;
mxCompactTreeLayout.prototype.edgeRouting = !0;
mxCompactTreeLayout.prototype.sortEdges = !1;
mxCompactTreeLayout.prototype.alignRanks = !1;
mxCompactTreeLayout.prototype.maxRankHeight = null;
mxCompactTreeLayout.prototype.root = null;
mxCompactTreeLayout.prototype.node = null;
mxCompactTreeLayout.prototype.isVertexIgnored = function(a) {
  return mxGraphLayout.prototype.isVertexIgnored.apply(this, arguments) || 0 == this.graph.getConnections(a).length;
};
mxCompactTreeLayout.prototype.isHorizontal = function() {
  return this.horizontal;
};
mxCompactTreeLayout.prototype.execute = function(a, b) {
  this.parent = a;
  var c = this.graph.getModel();
  if (null == b)
    if (0 < this.graph.getEdges(a, c.getParent(a), this.invert, !this.invert, !1).length)
      this.root = a;
    else {
      if (b = this.graph.findTreeRoots(a, !0, this.invert), 0 < b.length)
        for (var d = 0; d < b.length; d++)
          if (!this.isVertexIgnored(b[d]) && 0 < this.graph.getEdges(b[d], null, this.invert, !this.invert, !1).length) {
            this.root = b[d];
            break;
          }
    }
  else
    this.root = b;
  if (null != this.root) {
    this.parentsChanged = this.resizeParent ? {} : null;
    this.parentY = this.parentX = null;
    if (a != this.root && null != c.isVertex(a) && this.maintainParentLocation) {
      var e = this.graph.getCellGeometry(a);
      null != e && (this.parentX = e.x, this.parentY = e.y);
    }
    c.beginUpdate();
    try {
      if (this.visited = {}, this.node = this.dfs(this.root, a), this.alignRanks && (this.maxRankHeight = [], this.findRankHeights(this.node, 0), this.setCellHeights(this.node, 0)), null != this.node) {
        this.layout(this.node);
        var f = this.graph.gridSize;
        b = f;
        if (!this.moveTree) {
          var g = this.getVertexBounds(this.root);
          null != g && (f = g.x, b = g.y);
        }
        g = null;
        g = this.isHorizontal() ? this.horizontalLayout(this.node, f, b) : this.verticalLayout(this.node, null, f, b);
        if (null != g) {
          var k = d = 0;
          0 > g.x && (d = Math.abs(f - g.x));
          0 > g.y && (k = Math.abs(b - g.y));
          0 == d && 0 == k || this.moveNode(this.node, d, k);
          this.resizeParent && this.adjustParents();
          this.edgeRouting && this.localEdgeProcessing(this.node);
        }
        null != this.parentX && null != this.parentY && (e = this.graph.getCellGeometry(a), null != e && (e = e.clone(), e.x = this.parentX, e.y = this.parentY, c.setGeometry(a, e)));
      }
    } finally {
      c.endUpdate();
    }
  }
};
mxCompactTreeLayout.prototype.moveNode = function(a, b, c) {
  a.x += b;
  a.y += c;
  this.apply(a);
  for (a = a.child; null != a;)
    this.moveNode(a, b, c), a = a.next;
};
mxCompactTreeLayout.prototype.sortOutgoingEdges = function(a, b) {
  var c = new mxDictionary();
  b.sort(function(d, e) {
    var f = d.getTerminal(d.getTerminal(!1) == a);
    d = c.get(f);
    null == d && (d = mxCellPath.create(f).split(mxCellPath.PATH_SEPARATOR), c.put(f, d));
    e = e.getTerminal(e.getTerminal(!1) == a);
    f = c.get(e);
    null == f && (f = mxCellPath.create(e).split(mxCellPath.PATH_SEPARATOR), c.put(e, f));
    return mxCellPath.compare(d, f);
  });
};
mxCompactTreeLayout.prototype.findRankHeights = function(a, b) {
  if (null == this.maxRankHeight[b] || this.maxRankHeight[b] < a.height)
    this.maxRankHeight[b] = a.height;
  for (a = a.child; null != a;)
    this.findRankHeights(a, b + 1), a = a.next;
};
mxCompactTreeLayout.prototype.setCellHeights = function(a, b) {
  null != this.maxRankHeight[b] && this.maxRankHeight[b] > a.height && (a.height = this.maxRankHeight[b]);
  for (a = a.child; null != a;)
    this.setCellHeights(a, b + 1), a = a.next;
};
mxCompactTreeLayout.prototype.dfs = function(a, b) {
  var c = mxCellPath.create(a),
    d = null;
  if (null != a && null == this.visited[c] && !this.isVertexIgnored(a)) {
    this.visited[c] = a;
    d = this.createNode(a);
    c = this.graph.getModel();
    var e = null,
      f = this.graph.getEdges(a, b, this.invert, !this.invert, !1, !0),
      g = this.graph.getView();
    this.sortEdges && this.sortOutgoingEdges(a, f);
    for (a = 0; a < f.length; a++) {
      var k = f[a];
      if (!this.isEdgeIgnored(k)) {
        this.resetEdges && this.setEdgePoints(k, null);
        this.edgeRouting && (this.setEdgeStyleEnabled(k, !1), this.setEdgePoints(k, null));
        var l = g.getState(k);
        k = null != l ? l.getVisibleTerminal(this.invert) : g.getVisibleTerminal(k, this.invert);
        l = this.dfs(k, b);
        null != l && null != c.getGeometry(k) && (null == e ? d.child = l : e.next = l, e = l);
      }
    }
  }
  return d;
};
mxCompactTreeLayout.prototype.layout = function(a) {
  if (null != a) {
    for (var b = a.child; null != b;)
      this.layout(b), b = b.next;
    null != a.child ? this.attachParent(a, this.join(a)) : this.layoutLeaf(a);
  }
};
mxCompactTreeLayout.prototype.horizontalLayout = function(a, b, c, d) {
  a.x += b + a.offsetX;
  a.y += c + a.offsetY;
  d = this.apply(a, d);
  b = a.child;
  if (null != b) {
    d = this.horizontalLayout(b, a.x, a.y, d);
    c = a.y + b.offsetY;
    for (var e = b.next; null != e;)
      d = this.horizontalLayout(e, a.x + b.offsetX, c, d), c += e.offsetY, e = e.next;
  }
  return d;
};
mxCompactTreeLayout.prototype.verticalLayout = function(a, b, c, d, e) {
  a.x += c + a.offsetY;
  a.y += d + a.offsetX;
  e = this.apply(a, e);
  b = a.child;
  if (null != b)
    for (e = this.verticalLayout(b, a, a.x, a.y, e), c = a.x + b.offsetY, d = b.next; null != d;)
      e = this.verticalLayout(d, a, c, a.y + b.offsetX, e), c += d.offsetY, d = d.next;
  return e;
};
mxCompactTreeLayout.prototype.attachParent = function(a, b) {
  var c = this.nodeDistance + this.levelDistance,
    d = (b - a.width) / 2 - this.nodeDistance;
  b = d + a.width + 2 * this.nodeDistance - b;
  a.child.offsetX = c + a.height;
  a.child.offsetY = b;
  a.contour.upperHead = this.createLine(a.height, 0, this.createLine(c, b, a.contour.upperHead));
  a.contour.lowerHead = this.createLine(a.height, 0, this.createLine(c, d, a.contour.lowerHead));
};
mxCompactTreeLayout.prototype.layoutLeaf = function(a) {
  var b = 2 * this.nodeDistance;
  a.contour.upperTail = this.createLine(a.height + b, 0);
  a.contour.upperHead = a.contour.upperTail;
  a.contour.lowerTail = this.createLine(0, -a.width - b);
  a.contour.lowerHead = this.createLine(a.height + b, 0, a.contour.lowerTail);
};
mxCompactTreeLayout.prototype.join = function(a) {
  var b = 2 * this.nodeDistance,
    c = a.child;
  a.contour = c.contour;
  var d = c.width + b,
    e = d;
  for (c = c.next; null != c;) {
    var f = this.merge(a.contour, c.contour);
    c.offsetY = f + d;
    c.offsetX = 0;
    d = c.width + b;
    e += f + d;
    c = c.next;
  }
  return e;
};
mxCompactTreeLayout.prototype.merge = function(a, b) {
  for (var c = 0, d = 0, e = 0, f = a.lowerHead, g = b.upperHead; null != g && null != f;) {
    var k = this.offset(c, d, g.dx, g.dy, f.dx, f.dy);
    d += k;
    e += k;
    c + g.dx <= f.dx ? (c += g.dx, d += g.dy, g = g.next) : (c -= f.dx, d -= f.dy, f = f.next);
  }
  null != g ? (c = this.bridge(a.upperTail, 0, 0, g, c, d), a.upperTail = null != c.next ? b.upperTail : c, a.lowerTail = b.lowerTail) : (c = this.bridge(b.lowerTail, c, d, f, 0, 0), null == c.next && (a.lowerTail = c));
  a.lowerHead = b.lowerHead;
  return e;
};
mxCompactTreeLayout.prototype.offset = function(a, b, c, d, e, f) {
  if (e <= a || 0 >= a + c)
    return 0;
  a = 0 < e * d - c * f ? 0 > a ? a * d / c - b : 0 < a ? a * f / e - b : -b : e < a + c ? f - (b + (e - a) * d / c) : e > a + c ? (c + a) * f / e - (b + d) : f - (b + d);
  return 0 < a ? a : 0;
};
mxCompactTreeLayout.prototype.bridge = function(a, b, c, d, e, f) {
  b = e + d.dx - b;
  0 == d.dx ? e = d.dy : (e = b * d.dy, e /= d.dx);
  b = this.createLine(b, e, d.next);
  a.next = this.createLine(0, f + d.dy - e - c, b);
  return b;
};
mxCompactTreeLayout.prototype.createNode = function(a) {
  var b = {};
  b.cell = a;
  b.x = 0;
  b.y = 0;
  b.width = 0;
  b.height = 0;
  a = this.getVertexBounds(a);
  null != a && (this.isHorizontal() ? (b.width = a.height, b.height = a.width) : (b.width = a.width, b.height = a.height));
  b.offsetX = 0;
  b.offsetY = 0;
  b.contour = {};
  return b;
};
mxCompactTreeLayout.prototype.apply = function(a, b) {
  var c = this.graph.getModel(),
    d = a.cell,
    e = c.getGeometry(d);
  null != d && null != e && (this.isVertexMovable(d) && (e = this.setVertexLocation(d, a.x, a.y), this.resizeParent && (a = c.getParent(d), c = mxCellPath.create(a), null == this.parentsChanged[c] && (this.parentsChanged[c] = a))), b = null == b ? new mxRectangle(e.x, e.y, e.width, e.height) : new mxRectangle(Math.min(b.x, e.x), Math.min(b.y, e.y), Math.max(b.x + b.width, e.x + e.width), Math.max(b.y + b.height, e.y + e.height)));
  return b;
};
mxCompactTreeLayout.prototype.createLine = function(a, b, c) {
  var d = {};
  d.dx = a;
  d.dy = b;
  d.next = c;
  return d;
};
mxCompactTreeLayout.prototype.adjustParents = function() {
  var a = [],
    b;
  for (b in this.parentsChanged)
    a.push(this.parentsChanged[b]);
  this.arrangeGroups(mxUtils.sortCells(a, !0), this.groupPadding, this.groupPaddingTop, this.groupPaddingRight, this.groupPaddingBottom, this.groupPaddingLeft);
};
mxCompactTreeLayout.prototype.localEdgeProcessing = function(a) {
  this.processNodeOutgoing(a);
  for (a = a.child; null != a;)
    this.localEdgeProcessing(a), a = a.next;
};
mxCompactTreeLayout.prototype.processNodeOutgoing = function(a) {
  for (var b = a.child, c = a.cell, d = 0, e = []; null != b;) {
    d++;
    var f = b.x;
    this.horizontal && (f = b.y);
    e.push(new WeightedCellSorter(b, f));
    b = b.next;
  }
  e.sort(WeightedCellSorter.prototype.compare);
  f = a.width;
  var g = (d + 1) * this.prefHozEdgeSep;
  f > g + 2 * this.prefHozEdgeSep && (f -= 2 * this.prefHozEdgeSep);
  a = f / d;
  b = a / 2;
  f > g + 2 * this.prefHozEdgeSep && (b += this.prefHozEdgeSep);
  f = this.minEdgeJetty - this.prefVertEdgeOff;
  g = this.getVertexBounds(c);
  for (var k = 0; k < e.length; k++) {
    var l = e[k].cell.cell,
      m = this.getVertexBounds(l);
    l = this.graph.getEdgesBetween(c, l, !1);
    for (var n = [], p, r, q = 0; q < l.length; q++)
      this.horizontal ? (p = g.x + g.width, r = g.y + b, n.push(new mxPoint(p, r)), p = g.x + g.width + f, n.push(new mxPoint(p, r)), r = m.y + m.height / 2) : (p = g.x + b, r = g.y + g.height, n.push(new mxPoint(p, r)), r = g.y + g.height + f, n.push(new mxPoint(p, r)), p = m.x + m.width / 2), n.push(new mxPoint(p, r)), this.setEdgePoints(l[q], n);
    k < d / 2 ? f += this.prefVertEdgeOff : k > d / 2 && (f -= this.prefVertEdgeOff);
    b += a;
  }
};