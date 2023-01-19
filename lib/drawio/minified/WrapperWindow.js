var WrapperWindow = function(a, b, f, e, g, d, h) {
  var n = a.createSidebarContainer();
  h(n);
  this.window = new mxWindow(b, n, f, e, g, d, !0, !0);
  this.window.destroyOnClose = !1;
  this.window.setMaximizable(!1);
  this.window.setResizable(!0);
  this.window.setClosable(!0);
  this.window.setVisible(!0);
  a.installResizeHandler(this, !0);
  mxClient.IS_SF && (this.window.div.onselectstart = mxUtils.bind(this, function(u) {
    null == u && (u = window.event);
    return null != u && a.isSelectionAllowed(u);
  }));
};
(function() {
  mxGraphView.prototype.validateBackgroundPage = function() {
    var h = this.graph;
    if (null != h.container && !h.transparentBackground) {
      if (h.pageVisible) {
        var n = this.getBackgroundPageBounds();
        if (null == this.backgroundPageShape) {
          for (var u = h.container.firstChild; null != u && u.nodeType != mxConstants.NODETYPE_ELEMENT;)
            u = u.nextSibling;
          null != u && (this.backgroundPageShape = this.createBackgroundPageShape(n), this.backgroundPageShape.scale = 1, this.backgroundPageShape.isShadow = !0, this.backgroundPageShape.dialect = mxConstants.DIALECT_STRICTHTML, this.backgroundPageShape.init(h.container), u.style.position = 'absolute', h.container.insertBefore(this.backgroundPageShape.node, u), this.backgroundPageShape.redraw(), this.backgroundPageShape.node.className = 'geBackgroundPage', mxEvent.addListener(this.backgroundPageShape.node, 'dblclick', mxUtils.bind(this, function(m) {
            h.dblClick(m);
          })), mxEvent.addGestureListeners(this.backgroundPageShape.node, mxUtils.bind(this, function(m) {
            h.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(m));
          }), mxUtils.bind(this, function(m) {
            null != h.tooltipHandler && h.tooltipHandler.isHideOnHover() && h.tooltipHandler.hide();
            h.isMouseDown && !mxEvent.isConsumed(m) && h.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(m));
          }), mxUtils.bind(this, function(m) {
            h.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(m));
          })));
        } else
          this.backgroundPageShape.scale = 1, this.backgroundPageShape.bounds = n, this.backgroundPageShape.redraw();
      } else
        null != this.backgroundPageShape && (this.backgroundPageShape.destroy(), this.backgroundPageShape = null);
      this.validateBackgroundStyles();
    }
  };
  mxGraphView.prototype.validateBackgroundStyles = function() {
    var h = this.graph,
      n = null == h.background || h.background == mxConstants.NONE ? h.defaultPageBackgroundColor : h.background,
      u = null != n && this.gridColor != n.toLowerCase() ? this.gridColor : '#ffffff',
      m = 'none',
      p = '';
    if (h.isGridEnabled() || h.gridVisible) {
      p = 10;
      mxClient.IS_SVG ? (m = unescape(encodeURIComponent(this.createSvgGrid(u))), m = window.btoa ? btoa(m) : Base64.encode(m, !0), m = 'url(data:image/svg+xml;base64,' + m + ')', p = h.gridSize * this.scale * this.gridSteps) : m = 'url(' + this.gridImage + ')';
      var x = u = 0;
      null != h.view.backgroundPageShape && (x = this.getBackgroundPageBounds(), u = 1 + x.x, x = 1 + x.y);
      p = -Math.round(p - mxUtils.mod(this.translate.x * this.scale - u, p)) + 'px ' + -Math.round(p - mxUtils.mod(this.translate.y * this.scale - x, p)) + 'px';
    }
    u = h.view.canvas;
    null != u.ownerSVGElement && (u = u.ownerSVGElement);
    x = !Editor.isDarkMode() && h.enableDiagramBackground;
    null != h.view.backgroundPageShape ? (h.view.backgroundPageShape.node.style.backgroundPosition = p, h.view.backgroundPageShape.node.style.backgroundImage = m, h.view.backgroundPageShape.node.style.backgroundColor = n, h.view.backgroundPageShape.node.style.borderColor = h.defaultPageBorderColor, h.container.className = 'geDiagramContainer geDiagramBackdrop', u.style.backgroundImage = 'none', u.style.backgroundColor = '', h.container.style.backgroundColor = x ? h.diagramBackgroundColor : '') : (h.container.className = 'geDiagramContainer', u.style.backgroundPosition = p, u.style.backgroundImage = m, !x || null != h.background && h.background != mxConstants.NONE ? u.style.backgroundColor = n : (u.style.backgroundColor = h.diagramBackgroundColor, h.container.style.backgroundColor = ''));
  };
  mxGraphView.prototype.createSvgGrid = function(h) {
    for (var n = this.graph.gridSize * this.scale; n < this.minGridSize;)
      n *= 2;
    for (var u = this.gridSteps * n, m = [], p = 1; p < this.gridSteps; p++) {
      var x = p * n;
      m.push('M 0 ' + x + ' L ' + u + ' ' + x + ' M ' + x + ' 0 L ' + x + ' ' + u);
    }
    return '<svg width="' + u + '" height="' + u + '" xmlns="' + mxConstants.NS_SVG + '"><defs><pattern id="grid" width="' + u + '" height="' + u + '" patternUnits="userSpaceOnUse"><path d="' + m.join(' ') + '" fill="none" stroke="' + h + '" opacity="0.2" stroke-width="1"/><path d="M ' + u + ' 0 L 0 0 0 ' + u + '" fill="none" stroke="' + h + '" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>';
  };
  var a = mxGraph.prototype.panGraph;
  mxGraph.prototype.panGraph = function(h, n) {
    a.apply(this, arguments);
    if (null != this.shiftPreview1) {
      var u = this.view.canvas;
      null != u.ownerSVGElement && (u = u.ownerSVGElement);
      var m = this.gridSize * this.view.scale * this.view.gridSteps;
      m = -Math.round(m - mxUtils.mod(this.view.translate.x * this.view.scale + h, m)) + 'px ' + -Math.round(m - mxUtils.mod(this.view.translate.y * this.view.scale + n, m)) + 'px';
      u.style.backgroundPosition = m;
    }
  };
  mxGraph.prototype.updatePageBreaks = function(h, n, u) {
    var m = this.view.scale,
      p = this.view.translate,
      x = this.pageFormat,
      A = m * this.pageScale,
      C = this.view.getBackgroundPageBounds();
    n = C.width;
    u = C.height;
    var D = new mxRectangle(m * p.x, m * p.y, x.width * A, x.height * A),
      G = (h = h && Math.min(D.width, D.height) > this.minPageBreakDist) ? Math.ceil(u / D.height) - 1 : 0,
      F = h ? Math.ceil(n / D.width) - 1 : 0,
      K = C.x + n,
      P = C.y + u;
    null == this.horizontalPageBreaks && 0 < G && (this.horizontalPageBreaks = []);
    null == this.verticalPageBreaks && 0 < F && (this.verticalPageBreaks = []);
    h = mxUtils.bind(this, function(R) {
      if (null != R) {
        for (var Q = R == this.horizontalPageBreaks ? G : F, ba = 0; ba <= Q; ba++) {
          var V = R == this.horizontalPageBreaks ? [
            new mxPoint(Math.round(C.x), Math.round(C.y + (ba + 1) * D.height)),
            new mxPoint(Math.round(K), Math.round(C.y + (ba + 1) * D.height))
          ] : [
            new mxPoint(Math.round(C.x + (ba + 1) * D.width), Math.round(C.y)),
            new mxPoint(Math.round(C.x + (ba + 1) * D.width), Math.round(P))
          ];
          null != R[ba] ? (R[ba].points = V, R[ba].redraw()) : (V = new mxPolyline(V, this.pageBreakColor), V.dialect = this.dialect, V.isDashed = this.pageBreakDashed, V.pointerEvents = !1, V.init(this.view.backgroundPane), V.redraw(), R[ba] = V);
        }
        for (ba = Q; ba < R.length; ba++)
          null != R[ba] && R[ba].destroy();
        R.splice(Q, R.length - Q);
      }
    });
    h(this.horizontalPageBreaks);
    h(this.verticalPageBreaks);
  };
  var b = mxGraphHandler.prototype.shouldRemoveCellsFromParent;
  mxGraphHandler.prototype.shouldRemoveCellsFromParent = function(h, n, u) {
    for (var m = 0; m < n.length; m++) {
      if (this.graph.isTableCell(n[m]) || this.graph.isTableRow(n[m]))
        return !1;
      if (this.graph.getModel().isVertex(n[m])) {
        var p = this.graph.getCellGeometry(n[m]);
        if (null != p && p.relative)
          return !1;
      }
    }
    return b.apply(this, arguments);
  };
  var f = mxConnectionHandler.prototype.createMarker;
  mxConnectionHandler.prototype.createMarker = function() {
    var h = f.apply(this, arguments);
    h.intersects = mxUtils.bind(this, function(n, u) {
      return this.isConnecting() ? !0 : mxCellMarker.prototype.intersects.apply(h, arguments);
    });
    return h;
  };
  mxGraphView.prototype.createBackgroundPageShape = function(h) {
    return new mxRectangleShape(h, '#ffffff', this.graph.defaultPageBorderColor);
  };
  mxGraphView.prototype.getBackgroundPageBounds = function() {
    var h = this.getGraphBounds(),
      n = 0 < h.width ? h.x / this.scale - this.translate.x : 0,
      u = 0 < h.height ? h.y / this.scale - this.translate.y : 0,
      m = this.graph.pageFormat,
      p = this.graph.pageScale,
      x = m.width * p;
    m = m.height * p;
    p = Math.floor(Math.min(0, n) / x);
    var A = Math.floor(Math.min(0, u) / m);
    return new mxRectangle(this.scale * (this.translate.x + p * x), this.scale * (this.translate.y + A * m), this.scale * (Math.ceil(Math.max(1, n + h.width / this.scale) / x) - p) * x, this.scale * (Math.ceil(Math.max(1, u + h.height / this.scale) / m) - A) * m);
  };
  var e = mxGraph.prototype.panGraph;
  mxGraph.prototype.panGraph = function(h, n) {
    e.apply(this, arguments);
    this.dialect == mxConstants.DIALECT_SVG || null == this.view.backgroundPageShape || this.useScrollbarsForPanning && mxUtils.hasScrollbars(this.container) || (this.view.backgroundPageShape.node.style.marginLeft = h + 'px', this.view.backgroundPageShape.node.style.marginTop = n + 'px');
  };
  var g = mxPopupMenu.prototype.addItem;
  mxPopupMenu.prototype.addItem = function(h, n, u, m, p, x) {
    var A = g.apply(this, arguments);
    null == x || x || mxEvent.addListener(A, 'mousedown', function(C) {
      mxEvent.consume(C);
    });
    return A;
  };
  var d = mxGraphHandler.prototype.isPropagateSelectionCell;
  mxGraphHandler.prototype.isPropagateSelectionCell = function(h, n, u) {
    var m = this.graph.model.getParent(h);
    if (n) {
      var p = this.graph.model.isEdge(h) ? null : this.graph.getCellGeometry(h);
      p = !this.graph.model.isEdge(m) && !this.graph.isSiblingSelected(h) && (null != p && p.relative || !this.graph.isContainer(m) || this.graph.isPart(h));
    } else if (p = d.apply(this, arguments), this.graph.isTableCell(h) || this.graph.isTableRow(h))
      p = m, this.graph.isTable(p) || (p = this.graph.model.getParent(p)), p = !this.graph.selectionCellsHandler.isHandled(p) || this.graph.isCellSelected(p) && this.graph.isToggleEvent(u.getEvent()) || this.graph.isCellSelected(h) && !this.graph.isToggleEvent(u.getEvent()) || this.graph.isTableCell(h) && this.graph.isCellSelected(m);
    return p;
  };
  mxPopupMenuHandler.prototype.getCellForPopupEvent = function(h) {
    h = h.getCell();
    for (var n = this.graph.getModel(), u = n.getParent(h), m = this.graph.view.getState(u), p = this.graph.isCellSelected(h); null != m && (n.isVertex(u) || n.isEdge(u));) {
      var x = this.graph.isCellSelected(u);
      p = p || x;
      if (x || !p && (this.graph.isTableCell(h) || this.graph.isTableRow(h)))
        h = u;
      u = n.getParent(u);
    }
    return h;
  };
}());