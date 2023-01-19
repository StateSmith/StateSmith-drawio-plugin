function mxSwimlaneManager(a, b, c, d) {
  this.horizontal = null != b ? b : !0;
  this.addEnabled = null != c ? c : !0;
  this.resizeEnabled = null != d ? d : !0;
  this.addHandler = mxUtils.bind(this, function(e, f) {
    this.isEnabled() && this.isAddEnabled() && this.cellsAdded(f.getProperty('cells'));
  });
  this.resizeHandler = mxUtils.bind(this, function(e, f) {
    this.isEnabled() && this.isResizeEnabled() && this.cellsResized(f.getProperty('cells'));
  });
  this.setGraph(a);
}
mxSwimlaneManager.prototype = new mxEventSource();
mxSwimlaneManager.prototype.constructor = mxSwimlaneManager;
mxSwimlaneManager.prototype.graph = null;
mxSwimlaneManager.prototype.enabled = !0;
mxSwimlaneManager.prototype.horizontal = !0;
mxSwimlaneManager.prototype.addEnabled = !0;
mxSwimlaneManager.prototype.resizeEnabled = !0;
mxSwimlaneManager.prototype.addHandler = null;
mxSwimlaneManager.prototype.resizeHandler = null;
mxSwimlaneManager.prototype.isEnabled = function() {
  return this.enabled;
};
mxSwimlaneManager.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxSwimlaneManager.prototype.isHorizontal = function() {
  return this.horizontal;
};
mxSwimlaneManager.prototype.setHorizontal = function(a) {
  this.horizontal = a;
};
mxSwimlaneManager.prototype.isAddEnabled = function() {
  return this.addEnabled;
};
mxSwimlaneManager.prototype.setAddEnabled = function(a) {
  this.addEnabled = a;
};
mxSwimlaneManager.prototype.isResizeEnabled = function() {
  return this.resizeEnabled;
};
mxSwimlaneManager.prototype.setResizeEnabled = function(a) {
  this.resizeEnabled = a;
};
mxSwimlaneManager.prototype.getGraph = function() {
  return this.graph;
};
mxSwimlaneManager.prototype.setGraph = function(a) {
  null != this.graph && (this.graph.removeListener(this.addHandler), this.graph.removeListener(this.resizeHandler));
  this.graph = a;
  null != this.graph && (this.graph.addListener(mxEvent.ADD_CELLS, this.addHandler), this.graph.addListener(mxEvent.CELLS_RESIZED, this.resizeHandler));
};
mxSwimlaneManager.prototype.isSwimlaneIgnored = function(a) {
  return !this.getGraph().isSwimlane(a);
};
mxSwimlaneManager.prototype.isCellHorizontal = function(a) {
  return this.graph.isSwimlane(a) ? (a = this.graph.getCellStyle(a), 1 == mxUtils.getValue(a, mxConstants.STYLE_HORIZONTAL, 1)) : !this.isHorizontal();
};
mxSwimlaneManager.prototype.cellsAdded = function(a) {
  if (null != a) {
    var b = this.getGraph().getModel();
    b.beginUpdate();
    try {
      for (var c = 0; c < a.length; c++)
        this.isSwimlaneIgnored(a[c]) || this.swimlaneAdded(a[c]);
    } finally {
      b.endUpdate();
    }
  }
};
mxSwimlaneManager.prototype.swimlaneAdded = function(a) {
  for (var b = this.getGraph().getModel(), c = b.getParent(a), d = b.getChildCount(c), e = null, f = 0; f < d; f++) {
    var g = b.getChildAt(c, f);
    if (g != a && !this.isSwimlaneIgnored(g) && (e = b.getGeometry(g), null != e))
      break;
  }
  null != e && (b = null != c ? this.isCellHorizontal(c) : this.horizontal, this.resizeSwimlane(a, e.width, e.height, b));
};
mxSwimlaneManager.prototype.cellsResized = function(a) {
  if (null != a) {
    var b = this.getGraph().getModel();
    b.beginUpdate();
    try {
      for (var c = 0; c < a.length; c++)
        if (!this.isSwimlaneIgnored(a[c])) {
          var d = b.getGeometry(a[c]);
          if (null != d) {
            for (var e = new mxRectangle(0, 0, d.width, d.height), f = a[c], g = f; null != g;) {
              f = g;
              g = b.getParent(g);
              var k = this.graph.isSwimlane(g) ? this.graph.getStartSize(g) : new mxRectangle();
              e.width += k.width;
              e.height += k.height;
            }
            var l = null != g ? this.isCellHorizontal(g) : this.horizontal;
            this.resizeSwimlane(f, e.width, e.height, l);
          }
        }
    } finally {
      b.endUpdate();
    }
  }
};
mxSwimlaneManager.prototype.resizeSwimlane = function(a, b, c, d) {
  var e = this.getGraph().getModel();
  e.beginUpdate();
  try {
    var f = this.isCellHorizontal(a);
    if (!this.isSwimlaneIgnored(a)) {
      var g = e.getGeometry(a);
      null != g && (d && g.height != c || !d && g.width != b) && (g = g.clone(), d ? g.height = c : g.width = b, e.setGeometry(a, g));
    }
    var k = this.graph.isSwimlane(a) ? this.graph.getStartSize(a) : new mxRectangle();
    b -= k.width;
    c -= k.height;
    var l = e.getChildCount(a);
    for (d = 0; d < l; d++) {
      var m = e.getChildAt(a, d);
      this.resizeSwimlane(m, b, c, f);
    }
  } finally {
    e.endUpdate();
  }
};
mxSwimlaneManager.prototype.destroy = function() {
  this.setGraph(null);
};