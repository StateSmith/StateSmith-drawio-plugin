function mxStackLayout(a, b, c, d, e, f) {
  mxGraphLayout.call(this, a);
  this.horizontal = null != b ? b : !0;
  this.spacing = null != c ? c : 0;
  this.x0 = null != d ? d : 0;
  this.y0 = null != e ? e : 0;
  this.border = null != f ? f : 0;
}
mxStackLayout.prototype = new mxGraphLayout();
mxStackLayout.prototype.constructor = mxStackLayout;
mxStackLayout.prototype.horizontal = null;
mxStackLayout.prototype.spacing = null;
mxStackLayout.prototype.x0 = null;
mxStackLayout.prototype.y0 = null;
mxStackLayout.prototype.border = 0;
mxStackLayout.prototype.marginTop = 0;
mxStackLayout.prototype.marginLeft = 0;
mxStackLayout.prototype.marginRight = 0;
mxStackLayout.prototype.marginBottom = 0;
mxStackLayout.prototype.keepFirstLocation = !1;
mxStackLayout.prototype.fill = !1;
mxStackLayout.prototype.resizeParent = !1;
mxStackLayout.prototype.resizeParentMax = !1;
mxStackLayout.prototype.resizeLast = !1;
mxStackLayout.prototype.wrap = null;
mxStackLayout.prototype.borderCollapse = !0;
mxStackLayout.prototype.allowGaps = !1;
mxStackLayout.prototype.gridSize = 0;
mxStackLayout.prototype.isHorizontal = function() {
  return this.horizontal;
};
mxStackLayout.prototype.moveCell = function(a, b, c) {
  var d = this.graph.getModel(),
    e = d.getParent(a),
    f = this.isHorizontal();
  if (null != a && null != e) {
    var g = 0,
      k = d.getChildCount(e);
    c = f ? b : c;
    b = this.graph.getView().getState(e);
    null != b && (c -= f ? b.x : b.y);
    c /= this.graph.view.scale;
    for (b = 0; b < k; b++) {
      var l = d.getChildAt(e, b);
      if (l != a && (l = d.getGeometry(l), null != l)) {
        l = f ? l.x + l.width / 2 : l.y + l.height / 2;
        if (g <= c && l > c)
          break;
        g = l;
      }
    }
    f = e.getIndex(a);
    f = Math.max(0, b - (b > f ? 1 : 0));
    d.add(e, a, f);
  }
};
mxStackLayout.prototype.getParentSize = function(a) {
  var b = this.graph.getModel(),
    c = b.getGeometry(a);
  null != this.graph.container && (null == c && b.isLayer(a) || a == this.graph.getView().currentRoot) && (c = new mxRectangle(0, 0, this.graph.container.offsetWidth - 1, this.graph.container.offsetHeight - 1));
  return c;
};
mxStackLayout.prototype.getLayoutCells = function(a) {
  for (var b = this.graph.getModel(), c = b.getChildCount(a), d = [], e = 0; e < c; e++) {
    var f = b.getChildAt(a, e);
    !this.isVertexIgnored(f) && this.isVertexMovable(f) && d.push(f);
  }
  this.allowGaps && d.sort(mxUtils.bind(this, function(g, k) {
    g = this.graph.getCellGeometry(g);
    k = this.graph.getCellGeometry(k);
    return this.horizontal ? g.x == k.x ? 0 : g.x > k.x > 0 ? 1 : -1 : g.y == k.y ? 0 : g.y > k.y > 0 ? 1 : -1;
  }));
  return d;
};
mxStackLayout.prototype.snap = function(a) {
  if (null != this.gridSize && 0 < this.gridSize && (a = Math.max(a, this.gridSize), 1 < a / this.gridSize)) {
    var b = a % this.gridSize;
    a += b > this.gridSize / 2 ? this.gridSize - b : -b;
  }
  return a;
};
mxStackLayout.prototype.execute = function(a) {
  if (null != a) {
    var b = this.getParentSize(a),
      c = this.isHorizontal(),
      d = this.graph.getModel(),
      e = null;
    null != b && (e = c ? b.height - this.marginTop - this.marginBottom : b.width - this.marginLeft - this.marginRight);
    e -= 2 * this.border;
    var f = this.x0 + this.border + this.marginLeft,
      g = this.y0 + this.border + this.marginTop;
    if (this.graph.isSwimlane(a)) {
      var k = this.graph.getCellStyle(a),
        l = mxUtils.getNumber(k, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE);
      k = 1 == mxUtils.getValue(k, mxConstants.STYLE_HORIZONTAL, !0);
      null != b && (l = k ? Math.min(l, b.height) : Math.min(l, b.width));
      c == k && (e -= l);
      k ? g += l : f += l;
    }
    d.beginUpdate();
    try {
      l = 0;
      k = null;
      for (var m = 0, n = null, p = this.getLayoutCells(a), r = 0; r < p.length; r++) {
        var q = p[r],
          t = d.getGeometry(q);
        if (null != t) {
          t = t.clone();
          null != this.wrap && null != k && (c && k.x + k.width + t.width + 2 * this.spacing > this.wrap || !c && k.y + k.height + t.height + 2 * this.spacing > this.wrap) && (k = null, c ? g += l + this.spacing : f += l + this.spacing, l = 0);
          l = Math.max(l, c ? t.height : t.width);
          var u = 0;
          if (!this.borderCollapse) {
            var x = this.graph.getCellStyle(q);
            u = mxUtils.getNumber(x, mxConstants.STYLE_STROKEWIDTH, 1);
          }
          if (null != k) {
            var A = m + this.spacing + Math.floor(u / 2);
            c ? t.x = this.snap((this.allowGaps ? Math.max(A, t.x) : A) - this.marginLeft) + this.marginLeft : t.y = this.snap((this.allowGaps ? Math.max(A, t.y) : A) - this.marginTop) + this.marginTop;
          } else
            this.keepFirstLocation || (c ? t.x = this.allowGaps && t.x > f ? Math.max(this.snap(t.x - this.marginLeft) + this.marginLeft, f) : f : t.y = this.allowGaps && t.y > g ? Math.max(this.snap(t.y - this.marginTop) + this.marginTop, g) : g);
          c ? t.y = g : t.x = f;
          this.fill && null != e && (c ? t.height = e : t.width = e);
          c ? t.width = this.snap(t.width) : t.height = this.snap(t.height);
          this.setChildGeometry(q, t);
          n = q;
          k = t;
          m = c ? k.x + k.width + Math.floor(u / 2) : k.y + k.height + Math.floor(u / 2);
        }
      }
      this.resizeParent && null != b && null != k && !this.graph.isCellCollapsed(a) ? this.updateParentGeometry(a, b, k) : this.resizeLast && null != b && null != k && null != n && (c ? k.width = b.width - k.x - this.spacing - this.marginRight - this.marginLeft : k.height = b.height - k.y - this.spacing - this.marginBottom, this.setChildGeometry(n, k));
    } finally {
      d.endUpdate();
    }
  }
};
mxStackLayout.prototype.setChildGeometry = function(a, b) {
  var c = this.graph.getCellGeometry(a);
  null != c && b.x == c.x && b.y == c.y && b.width == c.width && b.height == c.height || this.graph.getModel().setGeometry(a, b);
};
mxStackLayout.prototype.updateParentGeometry = function(a, b, c) {
  var d = this.isHorizontal(),
    e = this.graph.getModel(),
    f = b.clone();
  d ? (c = c.x + c.width + this.marginRight + this.border, f.width = this.resizeParentMax ? Math.max(f.width, c) : c) : (c = c.y + c.height + this.marginBottom + this.border, f.height = this.resizeParentMax ? Math.max(f.height, c) : c);
  b.x == f.x && b.y == f.y && b.width == f.width && b.height == f.height || e.setGeometry(a, f);
};