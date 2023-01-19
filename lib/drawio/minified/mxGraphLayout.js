function mxGraphLayout(a) {
  this.graph = a;
}
mxGraphLayout.prototype.graph = null;
mxGraphLayout.prototype.useBoundingBox = !0;
mxGraphLayout.prototype.parent = null;
mxGraphLayout.prototype.moveCell = function(a, b, c) {};
mxGraphLayout.prototype.resizeCell = function(a, b) {};
mxGraphLayout.prototype.execute = function(a) {};
mxGraphLayout.prototype.getGraph = function() {
  return this.graph;
};
mxGraphLayout.prototype.getConstraint = function(a, b, c, d) {
  return this.graph.getCurrentCellStyle(b)[a];
};
mxGraphLayout.traverse = function(a, b, c, d, e) {
  if (null != c && null != a && (b = null != b ? b : !0, e = e || new mxDictionary(), !e.get(a) && (e.put(a, !0), d = c(a, d), null == d || d)) && (d = this.graph.model.getEdgeCount(a), 0 < d))
    for (var f = 0; f < d; f++) {
      var g = this.graph.model.getEdgeAt(a, f),
        k = this.graph.model.getTerminal(g, !0) == a;
      if (!b || k)
        k = this.graph.view.getVisibleTerminal(g, !k), this.traverse(k, b, c, g, e);
    }
};
mxGraphLayout.prototype.isAncestor = function(a, b, c) {
  if (!c)
    return this.graph.model.getParent(b) == a;
  if (b == a)
    return !1;
  for (; null != b && b != a;)
    b = this.graph.model.getParent(b);
  return b == a;
};
mxGraphLayout.prototype.isVertexMovable = function(a) {
  return this.graph.isCellMovable(a);
};
mxGraphLayout.prototype.isVertexIgnored = function(a) {
  return !this.graph.getModel().isVertex(a) || !this.graph.getModel().isVisible(a);
};
mxGraphLayout.prototype.isEdgeIgnored = function(a) {
  var b = this.graph.getModel();
  return !b.isEdge(a) || !this.graph.getModel().isVisible(a) || null == b.getTerminal(a, !0) || null == b.getTerminal(a, !1);
};
mxGraphLayout.prototype.setEdgeStyleEnabled = function(a, b) {
  this.graph.setCellStyles(mxConstants.STYLE_NOEDGESTYLE, b ? '0' : '1', [a]);
};
mxGraphLayout.prototype.setOrthogonalEdge = function(a, b) {
  this.graph.setCellStyles(mxConstants.STYLE_ORTHOGONAL, b ? '1' : '0', [a]);
};
mxGraphLayout.prototype.getParentOffset = function(a) {
  var b = new mxPoint();
  if (null != a && a != this.parent) {
    var c = this.graph.getModel();
    if (c.isAncestor(this.parent, a))
      for (var d = c.getGeometry(a); a != this.parent;)
        b.x += d.x, b.y += d.y, a = c.getParent(a), d = c.getGeometry(a);
  }
  return b;
};
mxGraphLayout.prototype.setEdgePoints = function(a, b) {
  if (null != a) {
    var c = this.graph.model,
      d = c.getGeometry(a);
    null == d ? (d = new mxGeometry(), d.setRelative(!0)) : d = d.clone();
    if (null != this.parent && null != b) {
      var e = c.getParent(a);
      e = this.getParentOffset(e);
      for (var f = 0; f < b.length; f++)
        b[f].x -= e.x, b[f].y -= e.y;
    }
    d.points = b;
    c.setGeometry(a, d);
  }
};
mxGraphLayout.prototype.setVertexLocation = function(a, b, c) {
  var d = this.graph.getModel(),
    e = d.getGeometry(a),
    f = null;
  if (null != e) {
    f = new mxRectangle(b, c, e.width, e.height);
    if (this.useBoundingBox) {
      var g = this.graph.getView().getState(a);
      if (null != g && null != g.text && null != g.text.boundingBox) {
        var k = this.graph.getView().scale,
          l = g.text.boundingBox;
        g.text.boundingBox.x < g.x && (b += (g.x - l.x) / k, f.width = l.width);
        g.text.boundingBox.y < g.y && (c += (g.y - l.y) / k, f.height = l.height);
      }
    }
    null != this.parent && (g = d.getParent(a), null != g && g != this.parent && (g = this.getParentOffset(g), b -= g.x, c -= g.y));
    if (e.x != b || e.y != c)
      e = e.clone(), e.x = b, e.y = c, d.setGeometry(a, e);
  }
  return f;
};
mxGraphLayout.prototype.getVertexBounds = function(a) {
  var b = this.graph.getModel().getGeometry(a);
  if (this.useBoundingBox) {
    var c = this.graph.getView().getState(a);
    if (null != c && null != c.text && null != c.text.boundingBox) {
      var d = this.graph.getView().scale,
        e = c.text.boundingBox,
        f = Math.max(c.x - e.x, 0) / d,
        g = Math.max(c.y - e.y, 0) / d;
      b = new mxRectangle(b.x - f, b.y - g, b.width + f + Math.max(e.x + e.width - (c.x + c.width), 0) / d, b.height + g + Math.max(e.y + e.height - (c.y + c.height), 0) / d);
    }
  }
  null != this.parent && (a = this.graph.getModel().getParent(a), b = b.clone(), null != a && a != this.parent && (a = this.getParentOffset(a), b.x += a.x, b.y += a.y));
  return new mxRectangle(b.x, b.y, b.width, b.height);
};
mxGraphLayout.prototype.arrangeGroups = function(a, b, c, d, e, f) {
  return this.graph.updateGroupBounds(a, b, !0, c, d, e, f);
};