function mxCellRenderer() {}
mxCellRenderer.defaultShapes = {};
mxCellRenderer.prototype.defaultEdgeShape = mxConnector;
mxCellRenderer.prototype.defaultVertexShape = mxRectangleShape;
mxCellRenderer.prototype.defaultTextShape = mxText;
mxCellRenderer.prototype.legacyControlPosition = !0;
mxCellRenderer.prototype.legacySpacing = !0;
mxCellRenderer.prototype.antiAlias = !0;
mxCellRenderer.prototype.minSvgStrokeWidth = 1;
mxCellRenderer.prototype.forceControlClickHandler = !1;
mxCellRenderer.registerShape = function(a, b) {
  mxCellRenderer.defaultShapes[a] = b;
};
mxCellRenderer.registerShape(mxConstants.SHAPE_RECTANGLE, mxRectangleShape);
mxCellRenderer.registerShape(mxConstants.SHAPE_ELLIPSE, mxEllipse);
mxCellRenderer.registerShape(mxConstants.SHAPE_RHOMBUS, mxRhombus);
mxCellRenderer.registerShape(mxConstants.SHAPE_CYLINDER, mxCylinder);
mxCellRenderer.registerShape(mxConstants.SHAPE_CONNECTOR, mxConnector);
mxCellRenderer.registerShape(mxConstants.SHAPE_ACTOR, mxActor);
mxCellRenderer.registerShape(mxConstants.SHAPE_TRIANGLE, mxTriangle);
mxCellRenderer.registerShape(mxConstants.SHAPE_HEXAGON, mxHexagon);
mxCellRenderer.registerShape(mxConstants.SHAPE_CLOUD, mxCloud);
mxCellRenderer.registerShape(mxConstants.SHAPE_LINE, mxLine);
mxCellRenderer.registerShape(mxConstants.SHAPE_ARROW, mxArrow);
mxCellRenderer.registerShape(mxConstants.SHAPE_ARROW_CONNECTOR, mxArrowConnector);
mxCellRenderer.registerShape(mxConstants.SHAPE_DOUBLE_ELLIPSE, mxDoubleEllipse);
mxCellRenderer.registerShape(mxConstants.SHAPE_SWIMLANE, mxSwimlane);
mxCellRenderer.registerShape(mxConstants.SHAPE_IMAGE, mxImageShape);
mxCellRenderer.registerShape(mxConstants.SHAPE_LABEL, mxLabel);
mxCellRenderer.prototype.initializeShape = function(a) {
  a.shape.dialect = a.view.graph.dialect;
  this.configureShape(a);
  a.shape.init(a.view.getDrawPane());
};
mxCellRenderer.prototype.createShape = function(a) {
  var b = null;
  null != a.style && (b = a.style[mxConstants.STYLE_SHAPE], b = null == mxCellRenderer.defaultShapes[b] ? mxStencilRegistry.getStencil(b) : null, b = null != b ? new mxShape(b) : new(this.getShapeConstructor(a))());
  return b;
};
mxCellRenderer.prototype.createIndicatorShape = function(a) {
  a.shape.indicatorShape = this.getShape(a.view.graph.getIndicatorShape(a));
};
mxCellRenderer.prototype.getShape = function(a) {
  return null != a ? mxCellRenderer.defaultShapes[a] : null;
};
mxCellRenderer.prototype.getShapeConstructor = function(a) {
  var b = this.getShape(a.style[mxConstants.STYLE_SHAPE]);
  null == b && (b = a.view.graph.getModel().isEdge(a.cell) ? this.defaultEdgeShape : this.defaultVertexShape);
  return b;
};
mxCellRenderer.prototype.configureShape = function(a) {
  a.shape.apply(a);
  a.shape.image = a.view.graph.getImage(a);
  a.shape.indicatorColor = a.view.graph.getIndicatorColor(a);
  a.shape.indicatorStrokeColor = a.style[mxConstants.STYLE_INDICATOR_STROKECOLOR];
  a.shape.indicatorGradientColor = a.view.graph.getIndicatorGradientColor(a);
  a.shape.indicatorDirection = a.style[mxConstants.STYLE_INDICATOR_DIRECTION];
  a.shape.indicatorImage = a.view.graph.getIndicatorImage(a);
  this.postConfigureShape(a);
};
mxCellRenderer.prototype.postConfigureShape = function(a) {
  null != a.shape && (this.resolveColor(a, 'indicatorGradientColor', mxConstants.STYLE_GRADIENTCOLOR), this.resolveColor(a, 'indicatorColor', mxConstants.STYLE_FILLCOLOR), this.resolveColor(a, 'gradient', mxConstants.STYLE_GRADIENTCOLOR), this.resolveColor(a, 'stroke', mxConstants.STYLE_STROKECOLOR), this.resolveColor(a, 'fill', mxConstants.STYLE_FILLCOLOR));
};
mxCellRenderer.prototype.checkPlaceholderStyles = function(a) {
  if (null != a.style)
    for (var b = [
        'inherit',
        'swimlane',
        'indicated'
      ], c = [
        mxConstants.STYLE_FILLCOLOR,
        mxConstants.STYLE_STROKECOLOR,
        mxConstants.STYLE_GRADIENTCOLOR,
        mxConstants.STYLE_FONTCOLOR
      ], d = 0; d < c.length; d++)
      if (0 <= mxUtils.indexOf(b, a.style[c[d]]))
        return !0;
  return !1;
};
mxCellRenderer.prototype.resolveColor = function(a, b, c) {
  var d = c == mxConstants.STYLE_FONTCOLOR ? a.text : a.shape;
  if (null != d) {
    var e = a.view.graph,
      f = d[b],
      g = null;
    'inherit' == f ? g = e.model.getParent(a.cell) : 'swimlane' == f ? (d[b] = c == mxConstants.STYLE_STROKECOLOR || c == mxConstants.STYLE_FONTCOLOR ? '#000000' : '#ffffff', g = null != e.model.getTerminal(a.cell, !1) ? e.model.getTerminal(a.cell, !1) : a.cell, g = e.getSwimlane(g), c = e.swimlaneIndicatorColorAttribute) : 'indicated' == f && null != a.shape ? d[b] = a.shape.indicatorColor : c != mxConstants.STYLE_FILLCOLOR && f == mxConstants.STYLE_FILLCOLOR && null != a.shape ? d[b] = a.style[mxConstants.STYLE_FILLCOLOR] : c != mxConstants.STYLE_STROKECOLOR && f == mxConstants.STYLE_STROKECOLOR && null != a.shape && (d[b] = a.style[mxConstants.STYLE_STROKECOLOR]);
    null != g && (a = e.getView().getState(g), d[b] = null, null != a && (e = c == mxConstants.STYLE_FONTCOLOR ? a.text : a.shape, d[b] = null != e && 'indicatorColor' != b ? e[b] : a.style[c]));
  }
};
mxCellRenderer.prototype.getLabelValue = function(a) {
  return a.view.graph.getLabel(a.cell);
};
mxCellRenderer.prototype.createLabel = function(a, b) {
  var c = a.view.graph;
  c.getModel().isEdge(a.cell);
  if (0 < a.style[mxConstants.STYLE_FONTSIZE] || null == a.style[mxConstants.STYLE_FONTSIZE]) {
    var d = c.isHtmlLabel(a.cell) || null != b && mxUtils.isNode(b);
    a.text = new this.defaultTextShape(b, new mxRectangle(), a.style[mxConstants.STYLE_ALIGN] || mxConstants.ALIGN_CENTER, c.getVerticalAlign(a), a.style[mxConstants.STYLE_FONTCOLOR], a.style[mxConstants.STYLE_FONTFAMILY], a.style[mxConstants.STYLE_FONTSIZE], a.style[mxConstants.STYLE_FONTSTYLE], a.style[mxConstants.STYLE_SPACING], a.style[mxConstants.STYLE_SPACING_TOP], a.style[mxConstants.STYLE_SPACING_RIGHT], a.style[mxConstants.STYLE_SPACING_BOTTOM], a.style[mxConstants.STYLE_SPACING_LEFT], a.style[mxConstants.STYLE_HORIZONTAL], a.style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR], a.style[mxConstants.STYLE_LABEL_BORDERCOLOR], c.isWrapping(a.cell) && c.isHtmlLabel(a.cell), c.isLabelClipped(a.cell), a.style[mxConstants.STYLE_OVERFLOW], a.style[mxConstants.STYLE_LABEL_PADDING], mxUtils.getValue(a.style, mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION));
    a.text.opacity = mxUtils.getValue(a.style, mxConstants.STYLE_TEXT_OPACITY, 100);
    a.text.dialect = d ? mxConstants.DIALECT_STRICTHTML : a.view.graph.dialect;
    a.text.style = a.style;
    a.text.state = a;
    this.initializeLabel(a, a.text);
    this.configureShape(a);
    var e = !1,
      f = function(g) {
        var k = a;
        if (mxClient.IS_TOUCH || e)
          k = mxEvent.getClientX(g), g = mxEvent.getClientY(g), g = mxUtils.convertPoint(c.container, k, g), k = c.view.getState(c.getCellAt(g.x, g.y));
        return k;
      };
    mxEvent.addGestureListeners(a.text.node, mxUtils.bind(this, function(g) {
      this.isLabelEvent(a, g) && (c.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(g, a)), e = c.dialect != mxConstants.DIALECT_SVG && 'IMG' == mxEvent.getSource(g).nodeName);
    }), mxUtils.bind(this, function(g) {
      this.isLabelEvent(a, g) && c.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(g, f(g)));
    }), mxUtils.bind(this, function(g) {
      this.isLabelEvent(a, g) && (c.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(g, f(g))), e = !1);
    }));
    c.nativeDblClickEnabled && mxEvent.addListener(a.text.node, 'dblclick', mxUtils.bind(this, function(g) {
      this.isLabelEvent(a, g) && (c.dblClick(g, a.cell), mxEvent.consume(g));
    }));
  }
};
mxCellRenderer.prototype.initializeLabel = function(a, b) {
  mxClient.IS_SVG && mxClient.NO_FO && b.dialect != mxConstants.DIALECT_SVG ? b.init(a.view.graph.container) : b.init(a.view.getDrawPane());
};
mxCellRenderer.prototype.createCellOverlays = function(a) {
  var b = a.view.graph.getCellOverlays(a.cell),
    c = null;
  if (null != b) {
    c = new mxDictionary();
    for (var d = 0; d < b.length; d++) {
      var e = null != a.overlays ? a.overlays.remove(b[d]) : null;
      null == e ? (e = new mxImageShape(new mxRectangle(), b[d].image.src), e.dialect = a.view.graph.dialect, e.preserveImageAspect = !1, e.overlay = b[d], this.initializeOverlay(a, e), this.installCellOverlayListeners(a, b[d], e), null != b[d].cursor && (e.node.style.cursor = b[d].cursor), c.put(b[d], e)) : c.put(b[d], e);
    }
  }
  null != a.overlays && a.overlays.visit(function(f, g) {
    g.destroy();
  });
  a.overlays = c;
};
mxCellRenderer.prototype.initializeOverlay = function(a, b) {
  b.init(a.view.getOverlayPane());
};
mxCellRenderer.prototype.installCellOverlayListeners = function(a, b, c) {
  var d = a.view.graph;
  mxEvent.addListener(c.node, 'click', function(e) {
    d.isEditing() && d.stopEditing(!d.isInvokesStopCellEditing());
    b.fireEvent(new mxEventObject(mxEvent.CLICK, 'event', e, 'cell', a.cell));
  });
  mxEvent.addGestureListeners(c.node, function(e) {
    mxEvent.consume(e);
  }, function(e) {
    d.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(e, a));
  });
  mxClient.IS_TOUCH && mxEvent.addListener(c.node, 'touchend', function(e) {
    b.fireEvent(new mxEventObject(mxEvent.CLICK, 'event', e, 'cell', a.cell));
  });
};
mxCellRenderer.prototype.createControl = function(a) {
  var b = a.view.graph,
    c = b.getFoldingImage(a);
  if (b.foldingEnabled && null != c) {
    if (null == a.control) {
      var d = new mxRectangle(0, 0, c.width, c.height);
      a.control = new mxImageShape(d, c.src);
      a.control.preserveImageAspect = !1;
      a.control.dialect = b.dialect;
      this.initControl(a, a.control, !0, this.createControlClickHandler(a));
    }
  } else
    null != a.control && (a.control.destroy(), a.control = null);
};
mxCellRenderer.prototype.createControlClickHandler = function(a) {
  var b = a.view.graph;
  return mxUtils.bind(this, function(c) {
    if (this.forceControlClickHandler || b.isEnabled()) {
      var d = !b.isCellCollapsed(a.cell);
      b.foldCells(d, !1, [a.cell], null, c);
      mxEvent.consume(c);
    }
  });
};
mxCellRenderer.prototype.initControl = function(a, b, c, d) {
  var e = a.view.graph;
  e.isHtmlLabel(a.cell) && mxClient.NO_FO && e.dialect == mxConstants.DIALECT_SVG ? (b.dialect = mxConstants.DIALECT_PREFERHTML, b.init(e.container), b.node.style.zIndex = 1) : b.init(a.view.getOverlayPane());
  b = b.innerNode || b.node;
  null == d || mxClient.IS_IOS || (e.isEnabled() && (b.style.cursor = 'pointer'), mxEvent.addListener(b, 'click', d));
  if (c) {
    var f = null;
    mxEvent.addGestureListeners(b, function(g) {
      f = new mxPoint(mxEvent.getClientX(g), mxEvent.getClientY(g));
      e.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(g, a));
      mxEvent.consume(g);
    }, function(g) {
      e.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(g, a));
    }, function(g) {
      e.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(g, a));
      mxEvent.consume(g);
    });
    null != d && mxClient.IS_IOS && b.addEventListener('touchend', function(g) {
      if (null != f) {
        var k = e.tolerance;
        Math.abs(f.x - mxEvent.getClientX(g)) < k && Math.abs(f.y - mxEvent.getClientY(g)) < k && (d.call(d, g), mxEvent.consume(g));
      }
    }, !0);
  }
  return b;
};
mxCellRenderer.prototype.isShapeEvent = function(a, b) {
  return !0;
};
mxCellRenderer.prototype.isLabelEvent = function(a, b) {
  return !0;
};
mxCellRenderer.prototype.installListeners = function(a) {
  var b = a.view.graph,
    c = function(d) {
      var e = a;
      if (b.dialect != mxConstants.DIALECT_SVG && 'IMG' == mxEvent.getSource(d).nodeName || mxClient.IS_TOUCH)
        e = mxEvent.getClientX(d), d = mxEvent.getClientY(d), d = mxUtils.convertPoint(b.container, e, d), e = b.view.getState(b.getCellAt(d.x, d.y));
      return e;
    };
  mxEvent.addGestureListeners(a.shape.node, mxUtils.bind(this, function(d) {
    this.isShapeEvent(a, d) && b.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(d, a));
  }), mxUtils.bind(this, function(d) {
    this.isShapeEvent(a, d) && b.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(d, c(d)));
  }), mxUtils.bind(this, function(d) {
    this.isShapeEvent(a, d) && b.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(d, c(d)));
  }));
  b.nativeDblClickEnabled && mxEvent.addListener(a.shape.node, 'dblclick', mxUtils.bind(this, function(d) {
    this.isShapeEvent(a, d) && (b.dblClick(d, a.cell), mxEvent.consume(d));
  }));
};
mxCellRenderer.prototype.redrawLabel = function(a, b) {
  var c = a.view.graph,
    d = this.getLabelValue(a),
    e = c.isWrapping(a.cell),
    f = c.isLabelClipped(a.cell),
    g = a.view.graph.isHtmlLabel(a.cell) || null != d && mxUtils.isNode(d) ? mxConstants.DIALECT_STRICTHTML : a.view.graph.dialect,
    k = a.style[mxConstants.STYLE_OVERFLOW] || 'visible';
  null == a.text || a.text.wrap == e && a.text.clipped == f && a.text.overflow == k && a.text.dialect == g || (a.text.destroy(), a.text = null);
  null == a.text && null != d && (mxUtils.isNode(d) || 0 < d.length) ? this.createLabel(a, d) : null == a.text || null != d && 0 != d.length || (a.text.destroy(), a.text = null);
  if (null != a.text) {
    b && (null != a.text.lastValue && this.isTextShapeInvalid(a, a.text) && (a.text.lastValue = null), a.text.resetStyles(), a.text.apply(a), this.configureShape(a), a.text.valign = c.getVerticalAlign(a));
    c = this.getLabelBounds(a);
    var l = this.getTextScale(a);
    this.resolveColor(a, 'color', mxConstants.STYLE_FONTCOLOR);
    if (b || a.text.value != d || a.text.isWrapping != e || a.text.overflow != k || a.text.isClipping != f || a.text.scale != l || a.text.dialect != g || null == a.text.bounds || !a.text.bounds.equals(c))
      a.text.dialect = g, a.text.value = d, a.text.bounds = c, a.text.scale = l, a.text.wrap = e, a.text.clipped = f, a.text.overflow = k, b = a.text.node.style.visibility, this.redrawLabelShape(a.text), a.text.node.style.visibility = b;
  }
};
mxCellRenderer.prototype.isTextShapeInvalid = function(a, b) {
  function c(d, e, f) {
    return 'spacingTop' == e || 'spacingRight' == e || 'spacingBottom' == e || 'spacingLeft' == e ? parseFloat(b[d]) - parseFloat(b.spacing) != (a.style[e] || f) : b[d] != (a.style[e] || f);
  }
  return c('fontStyle', mxConstants.STYLE_FONTSTYLE, mxConstants.DEFAULT_FONTSTYLE) || c('family', mxConstants.STYLE_FONTFAMILY, mxConstants.DEFAULT_FONTFAMILY) || c('size', mxConstants.STYLE_FONTSIZE, mxConstants.DEFAULT_FONTSIZE) || c('color', mxConstants.STYLE_FONTCOLOR, 'black') || c('align', mxConstants.STYLE_ALIGN, '') || c('valign', mxConstants.STYLE_VERTICAL_ALIGN, '') || c('spacing', mxConstants.STYLE_SPACING, 2) || c('spacingTop', mxConstants.STYLE_SPACING_TOP, 0) || c('spacingRight', mxConstants.STYLE_SPACING_RIGHT, 0) || c('spacingBottom', mxConstants.STYLE_SPACING_BOTTOM, 0) || c('spacingLeft', mxConstants.STYLE_SPACING_LEFT, 0) || c('horizontal', mxConstants.STYLE_HORIZONTAL, !0) || c('background', mxConstants.STYLE_LABEL_BACKGROUNDCOLOR) || c('border', mxConstants.STYLE_LABEL_BORDERCOLOR) || c('opacity', mxConstants.STYLE_TEXT_OPACITY, 100) || c('textDirection', mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION);
};
mxCellRenderer.prototype.redrawLabelShape = function(a) {
  a.redraw();
};
mxCellRenderer.prototype.getTextScale = function(a) {
  return a.view.scale;
};
mxCellRenderer.prototype.getLabelBounds = function(a) {
  var b = a.view.graph,
    c = a.view.scale,
    d = b.getModel().isEdge(a.cell),
    e = new mxRectangle(a.absoluteOffset.x, a.absoluteOffset.y);
  if (d) {
    var f = a.text.getSpacing();
    e.x += f.x * c;
    e.y += f.y * c;
    b = b.getCellGeometry(a.cell);
    null != b && (e.width = Math.max(0, b.width * c), e.height = Math.max(0, b.height * c));
  } else
    a.text.isPaintBoundsInverted() && (b = e.x, e.x = e.y, e.y = b), e.x += a.x, e.y += a.y, e.width = Math.max(1, a.width), e.height = Math.max(1, a.height);
  a.text.isPaintBoundsInverted() && (b = (a.width - a.height) / 2, e.x += b, e.y -= b, b = e.width, e.width = e.height, e.height = b);
  null != a.shape && (b = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER), f = mxUtils.getValue(a.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE), b == mxConstants.ALIGN_CENTER && f == mxConstants.ALIGN_MIDDLE && (e = a.shape.getLabelBounds(e)));
  b = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_WIDTH, null);
  null != b && (e.width = parseFloat(b) * c);
  d || this.rotateLabelBounds(a, e);
  return e;
};
mxCellRenderer.prototype.rotateLabelBounds = function(a, b) {
  b.y -= a.text.margin.y * b.height;
  b.x -= a.text.margin.x * b.width;
  if (!this.legacySpacing || 'fill' != a.style[mxConstants.STYLE_OVERFLOW] && 'width' != a.style[mxConstants.STYLE_OVERFLOW] && ('block' != a.style[mxConstants.STYLE_OVERFLOW] || '1' == a.style[mxConstants.STYLE_BLOCK_SPACING])) {
    var c = a.view.scale,
      d = a.text.getSpacing('1' == a.style[mxConstants.STYLE_BLOCK_SPACING]);
    b.x += d.x * c;
    b.y += d.y * c;
    d = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
    var e = mxUtils.getValue(a.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE),
      f = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_WIDTH, null);
    b.width = Math.max(0, b.width - (d == mxConstants.ALIGN_CENTER && null == f ? a.text.spacingLeft * c + a.text.spacingRight * c : 0));
    b.height = Math.max(0, b.height - (e == mxConstants.ALIGN_MIDDLE ? a.text.spacingTop * c + a.text.spacingBottom * c : 0));
  }
  d = a.text.getTextRotation();
  0 != d && null != a && a.view.graph.model.isVertex(a.cell) && (c = a.getCenterX(), a = a.getCenterY(), b.x != c || b.y != a) && (d *= Math.PI / 180, a = mxUtils.getRotatedPoint(new mxPoint(b.x, b.y), Math.cos(d), Math.sin(d), new mxPoint(c, a)), b.x = a.x, b.y = a.y);
};
mxCellRenderer.prototype.redrawCellOverlays = function(a, b) {
  this.createCellOverlays(a);
  if (null != a.overlays) {
    var c = mxUtils.mod(mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION, 0), 90),
      d = mxUtils.toRadians(c),
      e = Math.cos(d),
      f = Math.sin(d);
    a.overlays.visit(function(g, k) {
      g = k.overlay.getBounds(a);
      if (!a.view.graph.getModel().isEdge(a.cell) && null != a.shape && 0 != c) {
        var l = g.getCenterX(),
          m = g.getCenterY();
        m = mxUtils.getRotatedPoint(new mxPoint(l, m), e, f, new mxPoint(a.getCenterX(), a.getCenterY()));
        l = m.x;
        m = m.y;
        g.x = Math.round(l - g.width / 2);
        g.y = Math.round(m - g.height / 2);
      }
      if (b || null == k.bounds || k.scale != a.view.scale || !k.bounds.equals(g))
        k.bounds = g, k.scale = a.view.scale, k.redraw();
    });
  }
};
mxCellRenderer.prototype.redrawControl = function(a, b) {
  var c = a.view.graph.getFoldingImage(a);
  if (null != a.control && null != c) {
    c = this.getControlBounds(a, c.width, c.height);
    var d = this.legacyControlPosition ? mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION, 0) : a.shape.getTextRotation(),
      e = a.view.scale;
    if (b || a.control.scale != e || !a.control.bounds.equals(c) || a.control.rotation != d)
      a.control.rotation = d, a.control.bounds = c, a.control.scale = e, a.control.redraw();
  }
};
mxCellRenderer.prototype.getControlBounds = function(a, b, c) {
  if (null != a.control) {
    var d = a.view.scale,
      e = a.getCenterX(),
      f = a.getCenterY();
    if (!a.view.graph.getModel().isEdge(a.cell) && (e = a.x + b * d, f = a.y + c * d, null != a.shape)) {
      var g = a.shape.getShapeRotation();
      if (this.legacyControlPosition)
        g = mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION, 0);
      else if (a.shape.isPaintBoundsInverted()) {
        var k = (a.width - a.height) / 2;
        e += k;
        f -= k;
      }
      0 != g && (k = mxUtils.toRadians(g), g = Math.cos(k), k = Math.sin(k), f = mxUtils.getRotatedPoint(new mxPoint(e, f), g, k, new mxPoint(a.getCenterX(), a.getCenterY())), e = f.x, f = f.y);
    }
    return a.view.graph.getModel().isEdge(a.cell), new mxRectangle(Math.round(e - b / 2 * d), Math.round(f - c / 2 * d), Math.round(b * d), Math.round(c * d));
  }
  return null;
};
mxCellRenderer.prototype.insertStateAfter = function(a, b, c) {
  for (var d = this.getShapesForState(a), e = 0; e < d.length; e++)
    if (null != d[e] && null != d[e].node) {
      var f = d[e].node.parentNode != a.view.getDrawPane() && d[e].node.parentNode != a.view.getOverlayPane(),
        g = f ? c : b;
      if (null != g && g.nextSibling != d[e].node)
        null == g.nextSibling ? g.parentNode.appendChild(d[e].node) : g.parentNode.insertBefore(d[e].node, g.nextSibling);
      else if (null == g)
        if (d[e].node.parentNode == a.view.graph.container) {
          for (g = a.view.canvas; null != g && g.parentNode != a.view.graph.container;)
            g = g.parentNode;
          null != g && null != g.nextSibling ? g.nextSibling != d[e].node && d[e].node.parentNode.insertBefore(d[e].node, g.nextSibling) : d[e].node.parentNode.appendChild(d[e].node);
        } else
          null != d[e].node.parentNode && null != d[e].node.parentNode.firstChild && d[e].node.parentNode.firstChild != d[e].node && d[e].node.parentNode.insertBefore(d[e].node, d[e].node.parentNode.firstChild);
      f ? c = d[e].node : b = d[e].node;
    }
  return [
    b,
    c
  ];
};
mxCellRenderer.prototype.getShapesForState = function(a) {
  return [
    a.shape,
    a.text,
    a.control
  ];
};
mxCellRenderer.prototype.redraw = function(a, b, c) {
  b = this.redrawShape(a, b, c);
  null == a.shape || null != c && !c || (this.redrawLabel(a, b), this.redrawCellOverlays(a, b), this.redrawControl(a, b));
};
mxCellRenderer.prototype.redrawShape = function(a, b, c) {
  var d = a.view.graph.model,
    e = !1;
  null != a.shape && null != a.shape.style && null != a.style && a.shape.style[mxConstants.STYLE_SHAPE] != a.style[mxConstants.STYLE_SHAPE] && (a.shape.destroy(), a.shape = null);
  null == a.shape && null != a.view.graph.container && a.cell != a.view.currentRoot && (d.isVertex(a.cell) || d.isEdge(a.cell)) ? (a.shape = this.createShape(a), null != a.shape && (a.shape.minSvgStrokeWidth = this.minSvgStrokeWidth, a.shape.antiAlias = this.antiAlias, this.createIndicatorShape(a), this.initializeShape(a), this.createCellOverlays(a), this.installListeners(a), a.view.graph.selectionCellsHandler.updateHandler(a))) : b || null == a.shape || mxUtils.equalEntries(a.shape.style, a.style) && !this.checkPlaceholderStyles(a) || (a.shape.resetStyles(), this.configureShape(a), a.view.graph.selectionCellsHandler.updateHandler(a), b = !0);
  null != a.shape && a.shape.indicatorShape != this.getShape(a.view.graph.getIndicatorShape(a)) && (null != a.shape.indicator && (a.shape.indicator.destroy(), a.shape.indicator = null), this.createIndicatorShape(a), null != a.shape.indicatorShape && (a.shape.indicator = new a.shape.indicatorShape(), a.shape.indicator.dialect = a.shape.dialect, a.shape.indicator.init(a.node), b = !0));
  null != a.shape && (this.createControl(a), b || this.isShapeInvalid(a, a.shape)) && (null != a.absolutePoints ? (a.shape.points = a.absolutePoints.slice(), a.shape.bounds = null) : (a.shape.points = null, a.shape.bounds = new mxRectangle(a.x, a.y, a.width, a.height)), a.shape.scale = a.view.scale, null == c || c ? this.doRedrawShape(a) : a.shape.updateBoundingBox(), e = !0);
  return e;
};
mxCellRenderer.prototype.doRedrawShape = function(a) {
  a.shape.redraw();
};
mxCellRenderer.prototype.isShapeInvalid = function(a, b) {
  return null == b.bounds || b.scale != a.view.scale || null == a.absolutePoints && !b.bounds.equals(a) || null != a.absolutePoints && !mxUtils.equalPoints(b.points, a.absolutePoints);
};
mxCellRenderer.prototype.destroy = function(a) {
  null != a.shape && (null != a.text && (a.text.destroy(), a.text = null), null != a.overlays && (a.overlays.visit(function(b, c) {
    c.destroy();
  }), a.overlays = null), null != a.control && (a.control.destroy(), a.control = null), a.shape.destroy(), a.shape = null);
};