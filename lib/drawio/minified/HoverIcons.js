HoverIcons = function(a) {
  mxEventSource.call(this);
  this.graph = a;
  this.init();
};
mxUtils.extend(HoverIcons, mxEventSource);
HoverIcons.prototype.arrowSpacing = 2;
HoverIcons.prototype.updateDelay = 500;
HoverIcons.prototype.activationDelay = 140;
HoverIcons.prototype.currentState = null;
HoverIcons.prototype.activeArrow = null;
HoverIcons.prototype.inactiveOpacity = 15;
HoverIcons.prototype.cssCursor = 'copy';
HoverIcons.prototype.checkCollisions = !0;
HoverIcons.prototype.arrowFill = '#29b6f2';
HoverIcons.prototype.triangleUp = mxClient.IS_SVG ? Graph.createSvgImage(18, 28, '<path d="m 6 26 L 12 26 L 12 12 L 18 12 L 9 1 L 1 12 L 6 12 z" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + '/triangle-up.png', 26, 14);
HoverIcons.prototype.triangleRight = mxClient.IS_SVG ? Graph.createSvgImage(26, 18, '<path d="m 1 6 L 14 6 L 14 1 L 26 9 L 14 18 L 14 12 L 1 12 z" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + '/triangle-right.png', 14, 26);
HoverIcons.prototype.triangleDown = mxClient.IS_SVG ? Graph.createSvgImage(18, 26, '<path d="m 6 1 L 6 14 L 1 14 L 9 26 L 18 14 L 12 14 L 12 1 z" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + '/triangle-down.png', 26, 14);
HoverIcons.prototype.triangleLeft = mxClient.IS_SVG ? Graph.createSvgImage(28, 18, '<path d="m 1 9 L 12 1 L 12 6 L 26 6 L 26 12 L 12 12 L 12 18 z" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + '/triangle-left.png', 14, 26);
HoverIcons.prototype.roundDrop = mxClient.IS_SVG ? Graph.createSvgImage(26, 26, '<circle cx="13" cy="13" r="12" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + '/round-drop.png', 26, 26);
HoverIcons.prototype.refreshTarget = new mxImage(mxClient.IS_SVG ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2cHgiIGhlaWdodD0iMzZweCI+PGVsbGlwc2UgZmlsbD0iIzI5YjZmMiIgY3g9IjEyIiBjeT0iMTIiIHJ4PSIxMiIgcnk9IjEyIi8+PHBhdGggdHJhbnNmb3JtPSJzY2FsZSgwLjgpIHRyYW5zbGF0ZSgyLjQsIDIuNCkiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iI2ZmZiIgZD0iTTEyIDZ2M2w0LTQtNC00djNjLTQuNDIgMC04IDMuNTgtOCA4IDAgMS41Ny40NiAzLjAzIDEuMjQgNC4yNkw2LjcgMTQuOGMtLjQ1LS44My0uNy0xLjc5LS43LTIuOCAwLTMuMzEgMi42OS02IDYtNnptNi43NiAxLjc0TDE3LjMgOS4yYy40NC44NC43IDEuNzkuNyAyLjggMCAzLjMxLTIuNjkgNi02IDZ2LTNsLTQgNCA0IDR2LTNjNC40MiAwIDgtMy41OCA4LTggMC0xLjU3LS40Ni0zLjAzLTEuMjQtNC4yNnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+Cg==' : IMAGE_PATH + '/refresh.png', 38, 38);
HoverIcons.prototype.tolerance = mxClient.IS_TOUCH ? 6 : 0;
HoverIcons.prototype.init = function() {
  this.arrowUp = this.createArrow(this.triangleUp, mxResources.get('plusTooltip'), mxConstants.DIRECTION_NORTH);
  this.arrowRight = this.createArrow(this.triangleRight, mxResources.get('plusTooltip'), mxConstants.DIRECTION_EAST);
  this.arrowDown = this.createArrow(this.triangleDown, mxResources.get('plusTooltip'), mxConstants.DIRECTION_SOUTH);
  this.arrowLeft = this.createArrow(this.triangleLeft, mxResources.get('plusTooltip'), mxConstants.DIRECTION_WEST);
  this.elts = [
    this.arrowUp,
    this.arrowRight,
    this.arrowDown,
    this.arrowLeft
  ];
  this.resetHandler = mxUtils.bind(this, function() {
    this.reset();
  });
  this.repaintHandler = mxUtils.bind(this, function() {
    this.repaint();
  });
  this.graph.selectionModel.addListener(mxEvent.CHANGE, this.resetHandler);
  this.graph.model.addListener(mxEvent.CHANGE, this.repaintHandler);
  this.graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE, this.repaintHandler);
  this.graph.view.addListener(mxEvent.TRANSLATE, this.repaintHandler);
  this.graph.view.addListener(mxEvent.SCALE, this.repaintHandler);
  this.graph.view.addListener(mxEvent.DOWN, this.repaintHandler);
  this.graph.view.addListener(mxEvent.UP, this.repaintHandler);
  this.graph.addListener(mxEvent.ROOT, this.repaintHandler);
  this.graph.addListener(mxEvent.ESCAPE, this.resetHandler);
  mxEvent.addListener(this.graph.container, 'scroll', this.resetHandler);
  this.graph.addListener(mxEvent.ESCAPE, mxUtils.bind(this, function() {
    this.mouseDownPoint = null;
  }));
  mxEvent.addListener(this.graph.container, 'mouseleave', mxUtils.bind(this, function(f) {
    null != f.relatedTarget && mxEvent.getSource(f) == this.graph.container && this.setDisplay('none');
  }));
  this.graph.addListener(mxEvent.START_EDITING, mxUtils.bind(this, function(f) {
    this.reset();
  }));
  var a = this.graph.click;
  this.graph.click = mxUtils.bind(this, function(f) {
    a.apply(this.graph, arguments);
    null == this.currentState || this.graph.isCellSelected(this.currentState.cell) || !mxEvent.isTouchEvent(f.getEvent()) || this.graph.model.isVertex(f.getCell()) || this.reset();
  });
  var b = !1;
  this.graph.addMouseListener({
    mouseDown: mxUtils.bind(this, function(f, e) {
      b = !1;
      f = e.getEvent();
      this.isResetEvent(f) ? this.reset() : this.isActive() || (e = this.getState(e.getState()), null == e && mxEvent.isTouchEvent(f) || this.update(e));
      this.setDisplay('none');
    }),
    mouseMove: mxUtils.bind(this, function(f, e) {
      f = e.getEvent();
      this.isResetEvent(f) ? this.reset() : this.graph.isMouseDown || mxEvent.isTouchEvent(f) || this.update(this.getState(e.getState()), e.getGraphX(), e.getGraphY());
      null != this.graph.connectionHandler && null != this.graph.connectionHandler.shape && (b = !0);
    }),
    mouseUp: mxUtils.bind(this, function(f, e) {
      f = e.getEvent();
      mxUtils.convertPoint(this.graph.container, mxEvent.getClientX(f), mxEvent.getClientY(f));
      this.isResetEvent(f) ? this.reset() : this.isActive() && !b && null != this.mouseDownPoint ? this.click(this.currentState, this.getDirection(), e) : this.isActive() ? 1 == this.graph.getSelectionCount() && this.graph.model.isEdge(this.graph.getSelectionCell()) ? this.reset() : this.update(this.getState(this.graph.view.getState(this.graph.getCellAt(e.getGraphX(), e.getGraphY())))) : mxEvent.isTouchEvent(f) || null != this.bbox && mxUtils.contains(this.bbox, e.getGraphX(), e.getGraphY()) ? (this.setDisplay(''), this.repaint()) : mxEvent.isTouchEvent(f) || this.reset();
      b = !1;
      this.resetActiveArrow();
    })
  });
};
HoverIcons.prototype.isResetEvent = function(a, b) {
  return mxEvent.isAltDown(a) || null == this.activeArrow && mxEvent.isShiftDown(a) || mxEvent.isPopupTrigger(a) && !this.graph.isCloneEvent(a);
};
HoverIcons.prototype.createArrow = function(a, b, f) {
  var e = null;
  e = mxUtils.createImage(a.src);
  e.style.width = a.width + 'px';
  e.style.height = a.height + 'px';
  e.style.padding = this.tolerance + 'px';
  null != b && e.setAttribute('title', b);
  e.style.position = 'absolute';
  e.style.cursor = this.cssCursor;
  mxEvent.addGestureListeners(e, mxUtils.bind(this, function(g) {
    null == this.currentState || this.isResetEvent(g) || (this.mouseDownPoint = mxUtils.convertPoint(this.graph.container, mxEvent.getClientX(g), mxEvent.getClientY(g)), this.drag(g, this.mouseDownPoint.x, this.mouseDownPoint.y), this.activeArrow = e, this.setDisplay('none'), mxEvent.consume(g));
  }));
  mxEvent.redirectMouseEvents(e, this.graph, this.currentState);
  mxEvent.addListener(e, 'mouseenter', mxUtils.bind(this, function(g) {
    mxEvent.isMouseEvent(g) && (null != this.activeArrow && this.activeArrow != e && mxUtils.setOpacity(this.activeArrow, this.inactiveOpacity), this.graph.connectionHandler.constraintHandler.reset(), mxUtils.setOpacity(e, 100), this.activeArrow = e, this.fireEvent(new mxEventObject('focus', 'arrow', e, 'direction', f, 'event', g)));
  }));
  mxEvent.addListener(e, 'mouseleave', mxUtils.bind(this, function(g) {
    mxEvent.isMouseEvent(g) && this.fireEvent(new mxEventObject('blur', 'arrow', e, 'direction', f, 'event', g));
    this.graph.isMouseDown || this.resetActiveArrow();
  }));
  return e;
};
HoverIcons.prototype.resetActiveArrow = function() {
  null != this.activeArrow && (mxUtils.setOpacity(this.activeArrow, this.inactiveOpacity), this.activeArrow = null);
};
HoverIcons.prototype.getDirection = function() {
  var a = mxConstants.DIRECTION_EAST;
  this.activeArrow == this.arrowUp ? a = mxConstants.DIRECTION_NORTH : this.activeArrow == this.arrowDown ? a = mxConstants.DIRECTION_SOUTH : this.activeArrow == this.arrowLeft && (a = mxConstants.DIRECTION_WEST);
  return a;
};
HoverIcons.prototype.visitNodes = function(a) {
  for (var b = 0; b < this.elts.length; b++)
    null != this.elts[b] && a(this.elts[b]);
};
HoverIcons.prototype.removeNodes = function() {
  this.visitNodes(function(a) {
    null != a.parentNode && a.parentNode.removeChild(a);
  });
};
HoverIcons.prototype.setDisplay = function(a) {
  this.visitNodes(function(b) {
    b.style.display = a;
  });
};
HoverIcons.prototype.isActive = function() {
  return null != this.activeArrow && null != this.currentState;
};
HoverIcons.prototype.drag = function(a, b, f) {
  this.graph.popupMenuHandler.hideMenu();
  this.graph.stopEditing(!1);
  null != this.currentState && (this.graph.connectionHandler.start(this.currentState, b, f), this.graph.isMouseTrigger = mxEvent.isMouseEvent(a), this.graph.isMouseDown = !0, b = this.graph.selectionCellsHandler.getHandler(this.currentState.cell), null != b && b.setHandlesVisible(!1), b = this.graph.connectionHandler.edgeState, null != a && mxEvent.isShiftDown(a) && mxEvent.isControlDown(a) && null != b && 'orthogonalEdgeStyle' === mxUtils.getValue(b.style, mxConstants.STYLE_EDGE, null) && (a = this.getDirection(), b.cell.style = mxUtils.setStyle(b.cell.style, 'sourcePortConstraint', a), b.style.sourcePortConstraint = a));
};
HoverIcons.prototype.getStateAt = function(a, b, f) {
  return this.graph.view.getState(this.graph.getCellAt(b, f));
};
HoverIcons.prototype.click = function(a, b, f) {
  var e = f.getEvent(),
    g = f.getGraphX(),
    d = f.getGraphY();
  g = this.getStateAt(a, g, d);
  null == g || !this.graph.model.isEdge(g.cell) || this.graph.isCloneEvent(e) || g.getVisibleTerminalState(!0) != a && g.getVisibleTerminalState(!1) != a ? null != a && this.execute(a, b, f) : (this.graph.setSelectionCell(g.cell), this.reset());
  f.consume();
};
HoverIcons.prototype.execute = function(a, b, f) {
  f = f.getEvent();
  this.graph.selectCellsForConnectVertex(this.graph.connectVertex(a.cell, b, this.graph.defaultEdgeLength, f, this.graph.isCloneEvent(f), this.graph.isCloneEvent(f)), f, this);
};
HoverIcons.prototype.reset = function(a) {
  null != a && !a || null == this.updateThread || window.clearTimeout(this.updateThread);
  this.activeArrow = this.currentState = this.mouseDownPoint = null;
  this.removeNodes();
  this.bbox = null;
  this.fireEvent(new mxEventObject('reset'));
};
HoverIcons.prototype.repaint = function() {
  this.bbox = null;
  if (null != this.currentState) {
    this.currentState = this.getState(this.currentState);
    if (null != this.currentState && this.graph.model.isVertex(this.currentState.cell) && this.graph.isCellConnectable(this.currentState.cell)) {
      var a = mxRectangle.fromRectangle(this.currentState);
      null != this.currentState.shape && null != this.currentState.shape.boundingBox && (a = mxRectangle.fromRectangle(this.currentState.shape.boundingBox));
      a.grow(this.graph.tolerance);
      a.grow(this.arrowSpacing);
      var b = this.graph.selectionCellsHandler.getHandler(this.currentState.cell);
      this.graph.isTableRow(this.currentState.cell) && (b = this.graph.selectionCellsHandler.getHandler(this.graph.model.getParent(this.currentState.cell)));
      var f = null;
      null != b && (a.x -= b.horizontalOffset / 2, a.y -= b.verticalOffset / 2, a.width += b.horizontalOffset, a.height += b.verticalOffset, null != b.rotationShape && null != b.rotationShape.node && 'hidden' != b.rotationShape.node.style.visibility && 'none' != b.rotationShape.node.style.display && null != b.rotationShape.boundingBox && (f = b.rotationShape.boundingBox));
      b = mxUtils.bind(this, function(n, u, m) {
        if (null != f) {
          var p = new mxRectangle(u, m, n.clientWidth, n.clientHeight);
          mxUtils.intersects(p, f) && (n == this.arrowUp ? m -= p.y + p.height - f.y : n == this.arrowRight ? u += f.x + f.width - p.x : n == this.arrowDown ? m += f.y + f.height - p.y : n == this.arrowLeft && (u -= p.x + p.width - f.x));
        }
        n.style.left = u + 'px';
        n.style.top = m + 'px';
        mxUtils.setOpacity(n, this.inactiveOpacity);
      });
      b(this.arrowUp, Math.round(this.currentState.getCenterX() - this.triangleUp.width / 2 - this.tolerance), Math.round(a.y - this.triangleUp.height - this.tolerance));
      b(this.arrowRight, Math.round(a.x + a.width - this.tolerance), Math.round(this.currentState.getCenterY() - this.triangleRight.height / 2 - this.tolerance));
      b(this.arrowDown, parseInt(this.arrowUp.style.left), Math.round(a.y + a.height - this.tolerance));
      b(this.arrowLeft, Math.round(a.x - this.triangleLeft.width - this.tolerance), parseInt(this.arrowRight.style.top));
      if (this.checkCollisions) {
        b = this.graph.getCellAt(a.x + a.width + this.triangleRight.width / 2, this.currentState.getCenterY());
        var e = this.graph.getCellAt(a.x - this.triangleLeft.width / 2, this.currentState.getCenterY()),
          g = this.graph.getCellAt(this.currentState.getCenterX(), a.y - this.triangleUp.height / 2);
        a = this.graph.getCellAt(this.currentState.getCenterX(), a.y + a.height + this.triangleDown.height / 2);
        null != b && b == e && e == g && g == a && (a = g = e = b = null);
        var d = this.graph.getCellGeometry(this.currentState.cell),
          h = mxUtils.bind(this, function(n, u) {
            var m = this.graph.model.isVertex(n) && this.graph.getCellGeometry(n);
            null == n || this.graph.model.isAncestor(n, this.currentState.cell) || this.graph.isSwimlane(n) || !(null == m || null == d || m.height < 3 * d.height && m.width < 3 * d.width) ? u.style.visibility = 'visible' : u.style.visibility = 'hidden';
          });
        h(b, this.arrowRight);
        h(e, this.arrowLeft);
        h(g, this.arrowUp);
        h(a, this.arrowDown);
      } else
        this.arrowLeft.style.visibility = 'visible', this.arrowRight.style.visibility = 'visible', this.arrowUp.style.visibility = 'visible', this.arrowDown.style.visibility = 'visible';
      this.graph.tooltipHandler.isEnabled() ? (this.arrowLeft.setAttribute('title', mxResources.get('plusTooltip')), this.arrowRight.setAttribute('title', mxResources.get('plusTooltip')), this.arrowUp.setAttribute('title', mxResources.get('plusTooltip')), this.arrowDown.setAttribute('title', mxResources.get('plusTooltip'))) : (this.arrowLeft.removeAttribute('title'), this.arrowRight.removeAttribute('title'), this.arrowUp.removeAttribute('title'), this.arrowDown.removeAttribute('title'));
    } else
      this.reset();
    null != this.currentState && (this.bbox = this.computeBoundingBox(), null != this.bbox && this.bbox.grow(10));
  }
};
HoverIcons.prototype.computeBoundingBox = function() {
  var a = this.graph.model.isEdge(this.currentState.cell) ? null : mxRectangle.fromRectangle(this.currentState);
  this.visitNodes(function(b) {
    null != b.parentNode && (b = new mxRectangle(b.offsetLeft, b.offsetTop, b.offsetWidth, b.offsetHeight), null == a ? a = b : a.add(b));
  });
  return a;
};
HoverIcons.prototype.getState = function(a) {
  if (null != a)
    if (a = a.cell, this.graph.getModel().contains(a)) {
      if (this.graph.getModel().isVertex(a) && !this.graph.isCellConnectable(a)) {
        var b = this.graph.getModel().getParent(a);
        this.graph.getModel().isVertex(b) && this.graph.isCellConnectable(b) && (a = b);
      }
      if (this.graph.isCellLocked(a) || this.graph.model.isEdge(a))
        a = null;
      a = this.graph.view.getState(a);
      null != a && null == a.style && (a = null);
    } else
      a = null;
  return a;
};
HoverIcons.prototype.update = function(a, b, f) {
  if (!this.graph.connectionArrowsEnabled || null != this.graph.freehand && this.graph.freehand.isDrawing() || null != a && '0' == mxUtils.getValue(a.style, 'allowArrows', '1'))
    this.reset();
  else {
    null != a && null != a.cell.geometry && a.cell.geometry.relative && this.graph.model.isEdge(a.cell.parent) && (a = null);
    var e = null;
    this.prev != a || this.isActive() ? (this.startTime = new Date().getTime(), this.prev = a, e = 0, null != this.updateThread && window.clearTimeout(this.updateThread), null != a && (this.updateThread = window.setTimeout(mxUtils.bind(this, function() {
      this.isActive() || this.graph.isMouseDown || this.graph.panningHandler.isActive() || (this.prev = a, this.update(a, b, f));
    }), this.updateDelay + 10))) : null != this.startTime && (e = new Date().getTime() - this.startTime);
    this.setDisplay('');
    null != this.currentState && this.currentState != a && e < this.activationDelay && null != this.bbox && !mxUtils.contains(this.bbox, b, f) ? this.reset(!1) : (null != this.currentState || e > this.activationDelay) && this.currentState != a && (e > this.updateDelay && null != a || null == this.bbox || null == b || null == f || !mxUtils.contains(this.bbox, b, f)) && (null != a && this.graph.isEnabled() ? (this.removeNodes(), this.setCurrentState(a), this.repaint(), this.graph.connectionHandler.constraintHandler.currentFocus != a && this.graph.connectionHandler.constraintHandler.reset()) : this.reset());
  }
};
HoverIcons.prototype.setCurrentState = function(a) {
  'eastwest' != a.style.portConstraint && (this.graph.container.appendChild(this.arrowUp), this.graph.container.appendChild(this.arrowDown));
  this.graph.container.appendChild(this.arrowRight);
  this.graph.container.appendChild(this.arrowLeft);
  this.currentState = a;
};
Graph.prototype.createParent = function(a, b, f, e, g) {
  a = this.cloneCell(a);
  for (var d = 0; d < f; d++) {
    var h = this.cloneCell(b),
      n = this.getCellGeometry(h);
    null != n && (n.x += d * e, n.y += d * g);
    a.insert(h);
  }
  return a;
};
Graph.prototype.createTable = function(a, b, f, e, g, d, h, n, u) {
  f = null != f ? f : 60;
  e = null != e ? e : 40;
  d = null != d ? d : 30;
  n = null != n ? n : 'shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;';
  u = null != u ? u : 'shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=none;top=0;left=0;bottom=0;right=0;pointerEvents=1;';
  return this.createParent(this.createVertex(null, null, null != g ? g : '', 0, 0, b * f, a * e + (null != g ? d : 0), null != h ? h : 'shape=table;startSize=' + (null != g ? d : '0') + ';container=1;collapsible=0;childLayout=tableLayout;'), this.createParent(this.createVertex(null, null, '', 0, 0, b * f, e, n), this.createVertex(null, null, '', 0, 0, f, e, u), b, f, 0), a, 0, e);
};
Graph.prototype.setTableValues = function(a, b, f) {
  for (var e = this.model.getChildCells(a, !0), g = 0; g < e.length; g++)
    if (null != f && (e[g].value = f[g]), null != b)
      for (var d = this.model.getChildCells(e[g], !0), h = 0; h < d.length; h++)
        null != b[g][h] && (d[h].value = b[g][h]);
  return a;
};
Graph.prototype.createCrossFunctionalSwimlane = function(a, b, f, e, g, d, h, n, u) {
  f = null != f ? f : 120;
  e = null != e ? e : 120;
  h = null != h ? h : 'shape=tableRow;horizontal=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;dropTarget=0;fontStyle=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;startSize=40;collapsible=0;recursiveResize=0;expand=0;';
  n = null != n ? n : 'swimlane;swimlaneHead=0;swimlaneBody=0;fontStyle=0;connectable=0;fillColor=none;startSize=40;collapsible=0;recursiveResize=0;expand=0;';
  u = null != u ? u : 'swimlane;swimlaneHead=0;swimlaneBody=0;fontStyle=0;connectable=0;fillColor=none;startSize=0;collapsible=0;recursiveResize=0;expand=0;';
  g = this.createVertex(null, null, null != g ? g : '', 0, 0, b * f, a * e, null != d ? d : 'shape=table;childLayout=tableLayout;' + (null == g ? 'startSize=0;fillColor=none;' : 'startSize=40;') + 'collapsible=0;recursiveResize=0;expand=0;');
  d = mxUtils.getValue(this.getCellStyle(g), mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE);
  g.geometry.width += d;
  g.geometry.height += d;
  h = this.createVertex(null, null, '', 0, d, b * f + d, e, h);
  g.insert(this.createParent(h, this.createVertex(null, null, '', d, 0, f, e, n), b, f, 0));
  return 1 < a ? (h.geometry.y = e + d, this.createParent(g, this.createParent(h, this.createVertex(null, null, '', d, 0, f, e, u), b, f, 0), a - 1, 0, e)) : g;
};
Graph.prototype.visitTableCells = function(a, b) {
  var f = null,
    e = this.model.getChildCells(a, !0);
  a = this.getActualStartSize(a, !0);
  for (var g = 0; g < e.length; g++) {
    for (var d = this.getActualStartSize(e[g], !0), h = this.model.getChildCells(e[g], !0), n = this.getCellStyle(e[g], !0), u = null, m = [], p = 0; p < h.length; p++) {
      var x = this.getCellGeometry(h[p]),
        A = {
          cell: h[p],
          rospan: 1,
          colspan: 1,
          row: g,
          col: p,
          geo: x
        };
      x = null != x.alternateBounds ? x.alternateBounds : x;
      A.point = new mxPoint(x.width + (null != u ? u.point.x : a.x + d.x), x.height + (null != f && null != f[0] ? f[0].point.y : a.y + d.y));
      A.actual = A;
      null != f && null != f[p] && 1 < f[p].rowspan ? (A.rowspan = f[p].rowspan - 1, A.colspan = f[p].colspan, A.actual = f[p].actual) : null != u && 1 < u.colspan ? (A.rowspan = u.rowspan, A.colspan = u.colspan - 1, A.actual = u.actual) : (u = this.getCurrentCellStyle(h[p], !0), null != u && (A.rowspan = parseInt(u.rowspan || 1), A.colspan = parseInt(u.colspan || 1)));
      u = 1 == mxUtils.getValue(n, mxConstants.STYLE_SWIMLANE_HEAD, 1) && mxUtils.getValue(n, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE;
      b(A, h.length, e.length, a.x + (u ? d.x : 0), a.y + (u ? d.y : 0));
      m.push(A);
      u = A;
    }
    f = m;
  }
};
Graph.prototype.getTableLines = function(a, b, f) {
  var e = [],
    g = [];
  (b || f) && this.visitTableCells(a, mxUtils.bind(this, function(d, h, n, u, m) {
    b && d.row < n - 1 && (null == e[d.row] && (e[d.row] = [new mxPoint(u, d.point.y)]), 1 < d.rowspan && e[d.row].push(null), e[d.row].push(d.point));
    f && d.col < h - 1 && (null == g[d.col] && (g[d.col] = [new mxPoint(d.point.x, m)]), 1 < d.colspan && g[d.col].push(null), g[d.col].push(d.point));
  }));
  return e.concat(g);
};
Graph.prototype.isTableCell = function(a) {
  return this.model.isVertex(a) && this.isTableRow(this.model.getParent(a));
};
Graph.prototype.isTableRow = function(a) {
  return this.model.isVertex(a) && this.isTable(this.model.getParent(a));
};
Graph.prototype.isTable = function(a) {
  a = this.getCellStyle(a);
  return null != a && 'tableLayout' == a.childLayout;
};
Graph.prototype.isStack = function(a) {
  a = this.getCellStyle(a);
  return null != a && 'stackLayout' == a.childLayout;
};
Graph.prototype.isStackChild = function(a) {
  return this.model.isVertex(a) && this.isStack(this.model.getParent(a));
};
Graph.prototype.setTableRowHeight = function(a, b, f) {
  f = null != f ? f : !0;
  var e = this.getModel();
  e.beginUpdate();
  try {
    var g = this.getCellGeometry(a);
    if (null != g) {
      g = g.clone();
      g.height += b;
      e.setGeometry(a, g);
      var d = e.getParent(a),
        h = e.getChildCells(d, !0);
      if (!f) {
        var n = mxUtils.indexOf(h, a);
        if (n < h.length - 1) {
          var u = h[n + 1],
            m = this.getCellGeometry(u);
          null != m && (m = m.clone(), m.y += b, m.height -= b, e.setGeometry(u, m));
        }
      }
      var p = this.getCellGeometry(d);
      null != p && (f || (f = a == h[h.length - 1]), f && (p = p.clone(), p.height += b, e.setGeometry(d, p)));
    }
  } finally {
    e.endUpdate();
  }
};
Graph.prototype.setTableColumnWidth = function(a, b, f) {
  f = null != f ? f : !1;
  var e = this.getModel(),
    g = e.getParent(a),
    d = e.getParent(g),
    h = e.getChildCells(g, !0);
  a = mxUtils.indexOf(h, a);
  var n = a == h.length - 1;
  e.beginUpdate();
  try {
    for (var u = e.getChildCells(d, !0), m = 0; m < u.length; m++) {
      g = u[m];
      h = e.getChildCells(g, !0);
      var p = h[a],
        x = this.getCellGeometry(p);
      null != x && (x = x.clone(), x.width += b, null != x.alternateBounds && (x.alternateBounds.width += b), e.setGeometry(p, x));
      a < h.length - 1 && (p = h[a + 1], x = this.getCellGeometry(p), null != x && (x = x.clone(), x.x += b, f || (x.width -= b, null != x.alternateBounds && (x.alternateBounds.width -= b)), e.setGeometry(p, x)));
    }
    if (n || f) {
      var A = this.getCellGeometry(d);
      null != A && (A = A.clone(), A.width += b, e.setGeometry(d, A));
    }
    null != this.layoutManager && this.layoutManager.executeLayout(d);
  } finally {
    e.endUpdate();
  }
};