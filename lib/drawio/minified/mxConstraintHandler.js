function mxConstraintHandler(a) {
  this.graph = a;
  this.resetHandler = mxUtils.bind(this, function(b, c) {
    null != this.currentFocus && null == this.graph.view.getState(this.currentFocus.cell) ? this.reset() : this.redraw();
  });
  this.graph.model.addListener(mxEvent.CHANGE, this.resetHandler);
  this.graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE, this.resetHandler);
  this.graph.view.addListener(mxEvent.TRANSLATE, this.resetHandler);
  this.graph.view.addListener(mxEvent.SCALE, this.resetHandler);
  this.graph.addListener(mxEvent.ROOT, this.resetHandler);
}
mxConstraintHandler.prototype.pointImage = new mxImage(mxClient.imageBasePath + '/point.gif', 5, 5);
mxConstraintHandler.prototype.graph = null;
mxConstraintHandler.prototype.enabled = !0;
mxConstraintHandler.prototype.highlightColor = mxConstants.DEFAULT_VALID_COLOR;
mxConstraintHandler.prototype.isEnabled = function() {
  return this.enabled;
};
mxConstraintHandler.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxConstraintHandler.prototype.reset = function() {
  if (null != this.focusIcons) {
    for (var a = 0; a < this.focusIcons.length; a++)
      this.focusIcons[a].destroy();
    this.focusIcons = null;
  }
  null != this.focusHighlight && (this.focusHighlight.destroy(), this.focusHighlight = null);
  this.focusPoints = this.currentFocus = this.currentPoint = this.currentFocusArea = this.currentConstraint = null;
};
mxConstraintHandler.prototype.getTolerance = function(a) {
  return this.graph.getTolerance();
};
mxConstraintHandler.prototype.getImageForConstraint = function(a, b, c) {
  return this.pointImage;
};
mxConstraintHandler.prototype.isEventIgnored = function(a, b) {
  return !1;
};
mxConstraintHandler.prototype.isStateIgnored = function(a, b) {
  return !1;
};
mxConstraintHandler.prototype.destroyIcons = function() {
  if (null != this.focusIcons) {
    for (var a = 0; a < this.focusIcons.length; a++)
      this.focusIcons[a].destroy();
    this.focusPoints = this.focusIcons = null;
  }
};
mxConstraintHandler.prototype.destroyFocusHighlight = function() {
  null != this.focusHighlight && (this.focusHighlight.destroy(), this.focusHighlight = null);
};
mxConstraintHandler.prototype.isKeepFocusEvent = function(a) {
  return mxEvent.isShiftDown(a.getEvent()) && !mxEvent.isAltDown(a.getEvent());
};
mxConstraintHandler.prototype.getCellForEvent = function(a, b) {
  var c = a.getCell();
  null != c || null == b || a.getGraphX() == b.x && a.getGraphY() == b.y || (c = this.graph.getCellAt(b.x, b.y));
  null == c || this.graph.isCellConnectable(c) || (a = this.graph.getModel().getParent(c), this.graph.getModel().isVertex(a) && this.graph.isCellConnectable(a) && (c = a));
  return this.graph.isCellLocked(c) ? null : c;
};
mxConstraintHandler.prototype.update = function(a, b, c, d) {
  if (this.isEnabled() && !this.isEventIgnored(a)) {
    null == this.mouseleaveHandler && null != this.graph.container && (this.mouseleaveHandler = mxUtils.bind(this, function() {
      this.reset();
    }), mxEvent.addListener(this.graph.container, 'mouseleave', this.resetHandler));
    var e = this.getTolerance(a),
      f = null != d ? d.x : a.getGraphX(),
      g = null != d ? d.y : a.getGraphY();
    f = new mxRectangle(f - e, g - e, 2 * e, 2 * e);
    e = new mxRectangle(a.getGraphX() - e, a.getGraphY() - e, 2 * e, 2 * e);
    var k = this.graph.view.getState(this.getCellForEvent(a, d));
    this.isKeepFocusEvent(a) || null != this.currentFocusArea && null != this.currentFocus && null == k && this.graph.getModel().isVertex(this.currentFocus.cell) && mxUtils.intersects(this.currentFocusArea, e) || k == this.currentFocus || (this.currentFocus = this.currentFocusArea = null, this.setFocus(a, k, b));
    a = this.currentPoint = this.currentConstraint = null;
    if (null != this.focusIcons && null != this.constraints && (null == k || this.currentFocus == k)) {
      g = e.getCenterX();
      for (var l = e.getCenterY(), m = 0; m < this.focusIcons.length; m++) {
        var n = g - this.focusIcons[m].bounds.getCenterX(),
          p = l - this.focusIcons[m].bounds.getCenterY();
        n = n * n + p * p;
        if ((this.intersects(this.focusIcons[m], e, b, c) || null != d && this.intersects(this.focusIcons[m], f, b, c)) && (null == a || n < a)) {
          this.currentConstraint = this.constraints[m];
          this.currentPoint = this.focusPoints[m];
          a = n;
          n = this.focusIcons[m].bounds.clone();
          n.grow(mxConstants.HIGHLIGHT_SIZE + 1);
          --n.width;
          --n.height;
          if (null == this.focusHighlight) {
            p = this.createHighlightShape();
            p.dialect = mxConstants.DIALECT_SVG;
            p.pointerEvents = !1;
            p.init(this.graph.getView().getOverlayPane());
            this.focusHighlight = p;
            var r = mxUtils.bind(this, function() {
              return null != this.currentFocus ? this.currentFocus : k;
            });
            mxEvent.redirectMouseEvents(p.node, this.graph, r);
          }
          this.focusHighlight.bounds = n;
          this.focusHighlight.redraw();
        }
      }
    }
    null == this.currentConstraint && this.destroyFocusHighlight();
  } else
    this.currentPoint = this.currentFocus = this.currentConstraint = null;
};
mxConstraintHandler.prototype.redraw = function() {
  if (null != this.currentFocus && null != this.constraints && null != this.focusIcons) {
    var a = this.graph.view.getState(this.currentFocus.cell);
    this.currentFocus = a;
    this.currentFocusArea = new mxRectangle(a.x, a.y, a.width, a.height);
    for (var b = 0; b < this.constraints.length; b++) {
      var c = this.graph.getConnectionPoint(a, this.constraints[b]),
        d = this.getImageForConstraint(a, this.constraints[b], c);
      d = new mxRectangle(Math.round(c.x - d.width / 2), Math.round(c.y - d.height / 2), d.width, d.height);
      this.focusIcons[b].bounds = d;
      this.focusIcons[b].redraw();
      this.currentFocusArea.add(this.focusIcons[b].bounds);
      this.focusPoints[b] = c;
    }
  }
};
mxConstraintHandler.prototype.setFocus = function(a, b, c) {
  this.constraints = null != b && !this.isStateIgnored(b, c) && this.graph.isCellConnectable(b.cell) ? this.isEnabled() ? this.graph.getAllConnectionConstraints(b, c) || [] : [] : null;
  if (null != this.constraints) {
    this.currentFocus = b;
    this.currentFocusArea = new mxRectangle(b.x, b.y, b.width, b.height);
    if (null != this.focusIcons) {
      for (c = 0; c < this.focusIcons.length; c++)
        this.focusIcons[c].destroy();
      this.focusPoints = this.focusIcons = null;
    }
    this.focusPoints = [];
    this.focusIcons = [];
    for (c = 0; c < this.constraints.length; c++) {
      var d = this.graph.getConnectionPoint(b, this.constraints[c]),
        e = this.getImageForConstraint(b, this.constraints[c], d),
        f = e.src;
      e = new mxRectangle(Math.round(d.x - e.width / 2), Math.round(d.y - e.height / 2), e.width, e.height);
      f = new mxImageShape(e, f);
      f.dialect = this.graph.dialect != mxConstants.DIALECT_SVG ? mxConstants.DIALECT_MIXEDHTML : mxConstants.DIALECT_SVG;
      f.preserveImageAspect = !1;
      f.init(this.graph.getView().getDecoratorPane());
      null != f.node.previousSibling && f.node.parentNode.insertBefore(f.node, f.node.parentNode.firstChild);
      e = mxUtils.bind(this, function() {
        return null != this.currentFocus ? this.currentFocus : b;
      });
      f.redraw();
      mxEvent.redirectMouseEvents(f.node, this.graph, e);
      this.currentFocusArea.add(f.bounds);
      this.focusIcons.push(f);
      this.focusPoints.push(d);
    }
    this.currentFocusArea.grow(this.getTolerance(a));
  } else
    this.destroyIcons(), this.destroyFocusHighlight();
};
mxConstraintHandler.prototype.createHighlightShape = function() {
  var a = new mxRectangleShape(null, this.highlightColor, this.highlightColor, mxConstants.HIGHLIGHT_STROKEWIDTH);
  a.opacity = mxConstants.HIGHLIGHT_OPACITY;
  return a;
};
mxConstraintHandler.prototype.intersects = function(a, b, c, d) {
  return mxUtils.intersects(a.bounds, b);
};
mxConstraintHandler.prototype.destroy = function() {
  this.reset();
  null != this.resetHandler && (this.graph.model.removeListener(this.resetHandler), this.graph.view.removeListener(this.resetHandler), this.graph.removeListener(this.resetHandler), this.resetHandler = null);
  null != this.mouseleaveHandler && null != this.graph.container && (mxEvent.removeListener(this.graph.container, 'mouseleave', this.mouseleaveHandler), this.mouseleaveHandler = null);
};