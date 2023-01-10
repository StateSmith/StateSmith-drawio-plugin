DiagramFormatPanel = function(a, b, f) {
  BaseFormatPanel.call(this, a, b, f);
  this.init();
};
mxUtils.extend(DiagramFormatPanel, BaseFormatPanel);
DiagramFormatPanel.showPageView = !0;
DiagramFormatPanel.prototype.showBackgroundImageOption = !0;
DiagramFormatPanel.prototype.init = function() {
  var a = this.editorUi.editor.graph;
  this.container.appendChild(this.addView(this.createPanel()));
  a.isEnabled() && (this.container.appendChild(this.addOptions(this.createPanel())), this.container.appendChild(this.addPaperSize(this.createPanel())), this.container.appendChild(this.addStyleOps(this.createPanel())));
};
DiagramFormatPanel.prototype.addView = function(a) {
  var b = this.editorUi,
    f = b.editor.graph;
  a.appendChild(this.createTitle(mxResources.get('view')));
  this.addGridOption(a);
  DiagramFormatPanel.showPageView && a.appendChild(this.createOption(mxResources.get('pageView'), function() {
    return f.pageVisible;
  }, function(d) {
    b.actions.get('pageView').funct();
  }, {
    install: function(d) {
      this.listener = function() {
        d(f.pageVisible);
      };
      b.addListener('pageViewChanged', this.listener);
    },
    destroy: function() {
      b.removeListener(this.listener);
    }
  }));
  if (f.isEnabled()) {
    var e = null;
    if (this.showBackgroundImageOption) {
      e = this.createOption(mxResources.get('background'), function() {
        return f.background != mxConstants.NONE && null != f.background || null != f.backgroundImage;
      }, function(d) {
        d ? f.model.execute(new ChangePageSetup(b, '#ffffff')) : f.model.execute(new ChangePageSetup(b));
      }, {
        install: function(d) {
          this.listener = function() {
            d(f.background != mxConstants.NONE && null != f.background || null != f.backgroundImage);
          };
          b.addListener('backgroundColorChanged', this.listener);
          b.addListener('backgroundImageChanged', this.listener);
        },
        destroy: function() {
          b.removeListener(this.listener);
        }
      });
      var g = e.getElementsByTagName('div')[0];
      g.style.display = 'inline-block';
      g.style.textOverflow = 'ellipsis';
      g.style.overflow = 'hidden';
      g.style.maxWidth = '80px';
      mxClient.IS_FF && (g.style.marginTop = '1px');
      g = mxUtils.button(mxResources.get('change') + '...', function(d) {
        b.showBackgroundImageDialog(null, b.editor.graph.backgroundImage, b.editor.graph.background);
        mxEvent.consume(d);
      });
      g.style.position = 'absolute';
      g.style.height = '22px';
      g.style.left = '47%';
      g.style.marginLeft = '1px';
      g.style.width = '110px';
      g.style.maxWidth = '110px';
      e.appendChild(g);
    } else
      e = this.createColorOption(mxResources.get('background'), function() {
        return f.background;
      }, function(d) {
        var h = new ChangePageSetup(b, d);
        h.ignoreImage = null != d && d != mxConstants.NONE;
        f.model.execute(h);
      }, '#ffffff', {
        install: function(d) {
          this.listener = function() {
            d(f.background);
          };
          b.addListener('backgroundColorChanged', this.listener);
        },
        destroy: function() {
          b.removeListener(this.listener);
        }
      });
    a.appendChild(e);
  }
  return a;
};
DiagramFormatPanel.prototype.addOptions = function(a) {
  var b = this.editorUi,
    f = b.editor.graph;
  a.appendChild(this.createTitle(mxResources.get('options')));
  f.isEnabled() && (a.appendChild(this.createOption(mxResources.get('connectionArrows'), function() {
    return f.connectionArrowsEnabled;
  }, function(e) {
    b.actions.get('connectionArrows').funct();
  }, {
    install: function(e) {
      this.listener = function() {
        e(f.connectionArrowsEnabled);
      };
      b.addListener('connectionArrowsChanged', this.listener);
    },
    destroy: function() {
      b.removeListener(this.listener);
    }
  })), a.appendChild(this.createOption(mxResources.get('connectionPoints'), function() {
    return f.connectionHandler.isEnabled();
  }, function(e) {
    b.actions.get('connectionPoints').funct();
  }, {
    install: function(e) {
      this.listener = function() {
        e(f.connectionHandler.isEnabled());
      };
      b.addListener('connectionPointsChanged', this.listener);
    },
    destroy: function() {
      b.removeListener(this.listener);
    }
  })), a.appendChild(this.createOption(mxResources.get('guides'), function() {
    return f.graphHandler.guidesEnabled;
  }, function(e) {
    b.actions.get('guides').funct();
  }, {
    install: function(e) {
      this.listener = function() {
        e(f.graphHandler.guidesEnabled);
      };
      b.addListener('guidesEnabledChanged', this.listener);
    },
    destroy: function() {
      b.removeListener(this.listener);
    }
  })));
  return a;
};
DiagramFormatPanel.prototype.addGridOption = function(a) {
  function b(u) {
    var m = f.isFloatUnit() ? parseFloat(d.value) : parseInt(d.value);
    m = f.fromUnit(Math.max(f.inUnit(1), isNaN(m) ? f.inUnit(10) : m));
    m != g.getGridSize() && (mxGraph.prototype.gridSize = m, g.setGridSize(m));
    d.value = f.inUnit(m) + ' ' + f.getUnit();
    mxEvent.consume(u);
  }
  var f = this,
    e = this.editorUi,
    g = e.editor.graph,
    d = document.createElement('input');
  d.style.position = 'absolute';
  d.style.textAlign = 'right';
  d.style.width = '48px';
  d.style.marginTop = '-2px';
  d.style.height = '21px';
  d.style.borderWidth = '1px';
  d.style.borderStyle = 'solid';
  d.style.boxSizing = 'border-box';
  d.value = this.inUnit(g.getGridSize()) + ' ' + this.getUnit();
  var h = this.createStepper(d, b, this.getUnitStep(), null, null, null, this.isFloatUnit());
  d.style.display = g.isGridEnabled() ? '' : 'none';
  h.style.display = d.style.display;
  mxEvent.addListener(d, 'keydown', function(u) {
    13 == u.keyCode ? (g.container.focus(), mxEvent.consume(u)) : 27 == u.keyCode && (d.value = g.getGridSize(), g.container.focus(), mxEvent.consume(u));
  });
  mxEvent.addListener(d, 'blur', b);
  mxEvent.addListener(d, 'change', b);
  d.style.right = '78px';
  h.style.marginTop = mxClient.IS_MAC && mxClient.IS_GC ? '-16px' : mxClient.IS_WIN ? '-18px' : '-17px';
  h.style.right = '66px';
  var n = this.createColorOption(mxResources.get('grid'), function() {
    var u = g.view.gridColor;
    return g.isGridEnabled() ? u : null;
  }, function(u) {
    var m = g.isGridEnabled();
    u == mxConstants.NONE ? g.setGridEnabled(!1) : (g.setGridEnabled(!0), e.setGridColor(u));
    d.style.display = g.isGridEnabled() ? '' : 'none';
    h.style.display = d.style.display;
    m != g.isGridEnabled() && (g.defaultGridEnabled = g.isGridEnabled(), e.fireEvent(new mxEventObject('gridEnabledChanged')));
  }, Editor.isDarkMode() ? g.view.defaultDarkGridColor : g.view.defaultGridColor, {
    install: function(u) {
      this.listener = function() {
        u(g.isGridEnabled() ? g.view.gridColor : null);
      };
      e.addListener('gridColorChanged', this.listener);
      e.addListener('gridEnabledChanged', this.listener);
    },
    destroy: function() {
      e.removeListener(this.listener);
    }
  });
  n.style.padding = '6px 0 0 0';
  n.appendChild(d);
  n.appendChild(h);
  a.appendChild(n);
};
DiagramFormatPanel.prototype.addDocumentProperties = function(a) {
  a.appendChild(this.createTitle(mxResources.get('options')));
  return a;
};
DiagramFormatPanel.prototype.addPaperSize = function(a) {
  var b = this.editorUi,
    f = b.editor.graph;
  a.appendChild(this.createTitle(mxResources.get('paperSize')));
  var e = PageSetupDialog.addPageFormatPanel(a, 'formatpanel', f.pageFormat, function(d) {
    if (null == f.pageFormat || f.pageFormat.width != d.width || f.pageFormat.height != d.height)
      d = new ChangePageSetup(b, null, null, d), d.ignoreColor = !0, d.ignoreImage = !0, f.model.execute(d);
  });
  this.addKeyHandler(e.widthInput, function() {
    e.set(f.pageFormat);
  });
  this.addKeyHandler(e.heightInput, function() {
    e.set(f.pageFormat);
  });
  var g = function() {
    e.set(f.pageFormat);
  };
  b.addListener('pageFormatChanged', g);
  this.listeners.push({
    destroy: function() {
      b.removeListener(g);
    }
  });
  f.getModel().addListener(mxEvent.CHANGE, g);
  this.listeners.push({
    destroy: function() {
      f.getModel().removeListener(g);
    }
  });
  return a;
};
DiagramFormatPanel.prototype.addStyleOps = function(a) {
  this.addActions(a, ['editData']);
  this.addActions(a, ['clearDefaultStyle']);
  return a;
};
DiagramFormatPanel.prototype.destroy = function() {
  BaseFormatPanel.prototype.destroy.apply(this, arguments);
  this.gridEnabledListener && (this.editorUi.removeListener(this.gridEnabledListener), this.gridEnabledListener = null);
};
(function() {
  function a(c, k, r) {
    mxShape.call(this);
    this.line = c;
    this.stroke = k;
    this.strokewidth = null != r ? r : 1;
    this.updateBoundsFromLine();
  }

  function b() {
    mxSwimlane.call(this);
  }

  function f() {
    mxSwimlane.call(this);
  }

  function e() {
    mxCylinder.call(this);
  }

  function g() {
    mxCylinder.call(this);
  }

  function d() {
    mxActor.call(this);
  }

  function h() {
    mxCylinder.call(this);
  }

  function n() {
    mxCylinder.call(this);
  }

  function u() {
    mxCylinder.call(this);
  }

  function m() {
    mxCylinder.call(this);
  }

  function p() {
    mxShape.call(this);
  }

  function x() {
    mxShape.call(this);
  }

  function A(c, k, r, l) {
    mxShape.call(this);
    this.bounds = c;
    this.fill = k;
    this.stroke = r;
    this.strokewidth = null != l ? l : 1;
  }

  function C() {
    mxActor.call(this);
  }

  function D() {
    mxCylinder.call(this);
  }

  function G() {
    mxCylinder.call(this);
  }

  function F() {
    mxActor.call(this);
  }

  function K() {
    mxActor.call(this);
  }

  function P() {
    mxActor.call(this);
  }

  function R() {
    mxActor.call(this);
  }

  function Q() {
    mxActor.call(this);
  }

  function ba() {
    mxActor.call(this);
  }

  function V() {
    mxActor.call(this);
  }

  function T(c, k) {
    this.canvas = c;
    this.canvas.setLineJoin('round');
    this.canvas.setLineCap('round');
    this.defaultVariation = k;
    this.originalLineTo = this.canvas.lineTo;
    this.canvas.lineTo = mxUtils.bind(this, T.prototype.lineTo);
    this.originalMoveTo = this.canvas.moveTo;
    this.canvas.moveTo = mxUtils.bind(this, T.prototype.moveTo);
    this.originalClose = this.canvas.close;
    this.canvas.close = mxUtils.bind(this, T.prototype.close);
    this.originalQuadTo = this.canvas.quadTo;
    this.canvas.quadTo = mxUtils.bind(this, T.prototype.quadTo);
    this.originalCurveTo = this.canvas.curveTo;
    this.canvas.curveTo = mxUtils.bind(this, T.prototype.curveTo);
    this.originalArcTo = this.canvas.arcTo;
    this.canvas.arcTo = mxUtils.bind(this, T.prototype.arcTo);
  }

  function Z() {
    mxRectangleShape.call(this);
  }

  function ma() {
    mxRectangleShape.call(this);
  }

  function ja() {
    mxActor.call(this);
  }

  function la() {
    mxActor.call(this);
  }

  function N() {
    mxActor.call(this);
  }

  function X() {
    mxRectangleShape.call(this);
  }

  function L() {
    mxRectangleShape.call(this);
  }

  function S() {
    mxCylinder.call(this);
  }

  function I() {
    mxShape.call(this);
  }

  function Y() {
    mxShape.call(this);
  }

  function ia() {
    mxEllipse.call(this);
  }

  function ka() {
    mxShape.call(this);
  }

  function U() {
    mxShape.call(this);
  }

  function ca() {
    mxRectangleShape.call(this);
  }

  function ra() {
    mxShape.call(this);
  }

  function ua() {
    mxShape.call(this);
  }

  function Ga() {
    mxShape.call(this);
  }

  function Ia() {
    mxShape.call(this);
  }

  function wa() {
    mxShape.call(this);
  }

  function Ca() {
    mxCylinder.call(this);
  }

  function ta() {
    mxCylinder.call(this);
  }

  function Ha() {
    mxRectangleShape.call(this);
  }

  function Va() {
    mxDoubleEllipse.call(this);
  }

  function fb() {
    mxDoubleEllipse.call(this);
  }

  function Ua() {
    mxArrowConnector.call(this);
    this.spacing = 0;
  }

  function bb() {
    mxArrowConnector.call(this);
    this.spacing = 0;
  }

  function $a() {
    mxActor.call(this);
  }

  function Wa() {
    mxRectangleShape.call(this);
  }

  function ab() {
    mxActor.call(this);
  }

  function lb() {
    mxActor.call(this);
  }

  function db() {
    mxActor.call(this);
  }

  function ea() {
    mxActor.call(this);
  }

  function Ea() {
    mxActor.call(this);
  }

  function Fa() {
    mxActor.call(this);
  }

  function t() {
    mxActor.call(this);
  }

  function z() {
    mxActor.call(this);
  }

  function B() {
    mxActor.call(this);
  }

  function E() {
    mxActor.call(this);
  }

  function J() {
    mxEllipse.call(this);
  }

  function M() {
    mxEllipse.call(this);
  }

  function W() {
    mxEllipse.call(this);
  }

  function ha() {
    mxRhombus.call(this);
  }

  function da() {
    mxEllipse.call(this);
  }

  function fa() {
    mxEllipse.call(this);
  }

  function sa() {
    mxEllipse.call(this);
  }

  function Ja() {
    mxEllipse.call(this);
  }

  function Na() {
    mxActor.call(this);
  }

  function Ma() {
    mxActor.call(this);
  }

  function Ka() {
    mxActor.call(this);
  }

  function va(c, k, r, l) {
    mxShape.call(this);
    this.bounds = c;
    this.fill = k;
    this.stroke = r;
    this.strokewidth = null != l ? l : 1;
    this.rectStyle = 'square';
    this.size = 10;
    this.absoluteCornerSize = !0;
    this.indent = 2;
    this.rectOutline = 'single';
  }

  function ya() {
    mxConnector.call(this);
  }

  function Ta(c, k, r, l, q, v, w, H, y, aa) {
    w += y;
    var O = l.clone();
    l.x -= q * (2 * w + y);
    l.y -= v * (2 * w + y);
    q *= w + y;
    v *= w + y;
    return function() {
      c.ellipse(O.x - q - w, O.y - v - w, 2 * w, 2 * w);
      aa ? c.fillAndStroke() : c.stroke();
    };
  }
  mxUtils.extend(a, mxShape);
  a.prototype.updateBoundsFromLine = function() {
    var c = null;
    if (null != this.line)
      for (var k = 0; k < this.line.length; k++) {
        var r = this.line[k];
        null != r && (r = new mxRectangle(r.x, r.y, this.strokewidth, this.strokewidth), null == c ? c = r : c.add(r));
      }
    this.bounds = null != c ? c : new mxRectangle();
  };
  a.prototype.paintVertexShape = function(c, k, r, l, q) {
    this.paintTableLine(c, this.line, 0, 0);
  };
  a.prototype.paintTableLine = function(c, k, r, l) {
    if (null != k) {
      var q = null;
      c.begin();
      for (var v = 0; v < k.length; v++) {
        var w = k[v];
        null != w && (null == q ? c.moveTo(w.x + r, w.y + l) : null != q && c.lineTo(w.x + r, w.y + l));
        q = w;
      }
      c.end();
      c.stroke();
    }
  };
  a.prototype.intersectsRectangle = function(c) {
    var k = !1;
    if (mxShape.prototype.intersectsRectangle.apply(this, arguments) && null != this.line)
      for (var r = null, l = 0; l < this.line.length && !k; l++) {
        var q = this.line[l];
        null != q && null != r && (k = mxUtils.rectangleIntersectsSegment(c, r, q));
        r = q;
      }
    return k;
  };
  mxCellRenderer.registerShape('tableLine', a);
  mxUtils.extend(b, mxSwimlane);
  b.prototype.getLabelBounds = function(c) {
    return 0 == this.getTitleSize() ? mxShape.prototype.getLabelBounds.apply(this, arguments) : mxSwimlane.prototype.getLabelBounds.apply(this, arguments);
  };
  b.prototype.paintVertexShape = function(c, k, r, l, q) {
    var v = null != this.state ? this.state.view.graph.isCellCollapsed(this.state.cell) : !1,
      w = this.isHorizontal(),
      H = this.getTitleSize();
    0 == H || this.outline ? sa.prototype.paintVertexShape.apply(this, arguments) : (mxSwimlane.prototype.paintVertexShape.apply(this, arguments), c.translate(-k, -r));
    v || this.outline || !(w && H < q || !w && H < l) || this.paintForeground(c, k, r, l, q);
  };
  b.prototype.paintForeground = function(c, k, r, l, q) {
    if (null != this.state) {
      var v = this.flipH,
        w = this.flipV;
      if (this.direction == mxConstants.DIRECTION_NORTH || this.direction == mxConstants.DIRECTION_SOUTH) {
        var H = v;
        v = w;
        w = H;
      }
      c.rotate(-this.getShapeRotation(), v, w, k + l / 2, r + q / 2);
      s = this.scale;
      k = this.bounds.x / s;
      r = this.bounds.y / s;
      l = this.bounds.width / s;
      q = this.bounds.height / s;
      this.paintTableForeground(c, k, r, l, q);
    }
  };
  b.prototype.paintTableForeground = function(c, k, r, l, q) {
    l = this.state.view.graph.getTableLines(this.state.cell, '0' != mxUtils.getValue(this.state.style, 'rowLines', '1'), '0' != mxUtils.getValue(this.state.style, 'columnLines', '1'));
    for (q = 0; q < l.length; q++)
      a.prototype.paintTableLine(c, l[q], k, r);
  };
  b.prototype.configurePointerEvents = function(c) {
    0 == this.getTitleSize() ? c.pointerEvents = !1 : mxSwimlane.prototype.configurePointerEvents.apply(this, arguments);
  };
  mxCellRenderer.registerShape('table', b);
  mxUtils.extend(f, b);
  f.prototype.paintForeground = function() {};
  mxCellRenderer.registerShape('tableRow', f);
  mxUtils.extend(e, mxCylinder);
  e.prototype.size = 20;
  e.prototype.darkOpacity = 0;
  e.prototype.darkOpacity2 = 0;
  e.prototype.paintVertexShape = function(c, k, r, l, q) {
    var v = Math.max(0, Math.min(l, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))),
      w = Math.max(-1, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'darkOpacity', this.darkOpacity)))),
      H = Math.max(-1, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'darkOpacity2', this.darkOpacity2))));
    c.translate(k, r);
    c.begin();
    c.moveTo(0, 0);
    c.lineTo(l - v, 0);
    c.lineTo(l, v);
    c.lineTo(l, q);
    c.lineTo(v, q);
    c.lineTo(0, q - v);
    c.lineTo(0, 0);
    c.close();
    c.end();
    c.fillAndStroke();
    this.outline || (c.setShadow(!1), 0 != w && (c.setFillAlpha(Math.abs(w)), c.setFillColor(0 > w ? '#FFFFFF' : '#000000'), c.begin(), c.moveTo(0, 0), c.lineTo(l - v, 0), c.lineTo(l, v), c.lineTo(v, v), c.close(), c.fill()), 0 != H && (c.setFillAlpha(Math.abs(H)), c.setFillColor(0 > H ? '#FFFFFF' : '#000000'), c.begin(), c.moveTo(0, 0), c.lineTo(v, v), c.lineTo(v, q), c.lineTo(0, q - v), c.close(), c.fill()), c.begin(), c.moveTo(v, q), c.lineTo(v, v), c.lineTo(0, 0), c.moveTo(v, v), c.lineTo(l, v), c.end(), c.stroke());
  };
  e.prototype.getLabelMargins = function(c) {
    return mxUtils.getValue(this.style, 'boundedLbl', !1) ? (c = parseFloat(mxUtils.getValue(this.style, 'size', this.size)) * this.scale, new mxRectangle(c, c, 0, 0)) : null;
  };
  mxCellRenderer.registerShape('cube', e);
  var Ra = Math.tan(mxUtils.toRadians(30)),
    Oa = (0.5 - Ra) / 2;
  mxCellRenderer.registerShape('isoRectangle', d);
  mxUtils.extend(g, mxCylinder);
  g.prototype.size = 6;
  g.prototype.paintVertexShape = function(c, k, r, l, q) {
    c.setFillColor(this.stroke);
    var v = Math.max(0, parseFloat(mxUtils.getValue(this.style, 'size', this.size)) - 2) + 2 * this.strokewidth;
    c.ellipse(k + 0.5 * (l - v), r + 0.5 * (q - v), v, v);
    c.fill();
    c.setFillColor(mxConstants.NONE);
    c.rect(k, r, l, q);
    c.fill();
  };
  mxCellRenderer.registerShape('waypoint', g);
  mxUtils.extend(d, mxActor);
  d.prototype.size = 20;
  d.prototype.redrawPath = function(c, k, r, l, q) {
    k = Math.min(l, q / Ra);
    c.translate((l - k) / 2, (q - k) / 2 + k / 4);
    c.moveTo(0, 0.25 * k);
    c.lineTo(0.5 * k, k * Oa);
    c.lineTo(k, 0.25 * k);
    c.lineTo(0.5 * k, (0.5 - Oa) * k);
    c.lineTo(0, 0.25 * k);
    c.close();
    c.end();
  };
  mxCellRenderer.registerShape('isoRectangle', d);
  mxUtils.extend(h, mxCylinder);
  h.prototype.size = 20;
  h.prototype.redrawPath = function(c, k, r, l, q, v) {
    k = Math.min(l, q / (0.5 + Ra));
    v ? (c.moveTo(0, 0.25 * k), c.lineTo(0.5 * k, (0.5 - Oa) * k), c.lineTo(k, 0.25 * k), c.moveTo(0.5 * k, (0.5 - Oa) * k), c.lineTo(0.5 * k, (1 - Oa) * k)) : (c.translate((l - k) / 2, (q - k) / 2), c.moveTo(0, 0.25 * k), c.lineTo(0.5 * k, k * Oa), c.lineTo(k, 0.25 * k), c.lineTo(k, 0.75 * k), c.lineTo(0.5 * k, (1 - Oa) * k), c.lineTo(0, 0.75 * k), c.close());
    c.end();
  };
  mxCellRenderer.registerShape('isoCube', h);
  mxUtils.extend(n, mxCylinder);
  n.prototype.redrawPath = function(c, k, r, l, q, v) {
    k = Math.min(q / 2, Math.round(q / 8) + this.strokewidth - 1);
    if (v && null != this.fill || !v && null == this.fill)
      c.moveTo(0, k), c.curveTo(0, 2 * k, l, 2 * k, l, k), v || (c.stroke(), c.begin()), c.translate(0, k / 2), c.moveTo(0, k), c.curveTo(0, 2 * k, l, 2 * k, l, k), v || (c.stroke(), c.begin()), c.translate(0, k / 2), c.moveTo(0, k), c.curveTo(0, 2 * k, l, 2 * k, l, k), v || (c.stroke(), c.begin()), c.translate(0, -k);
    v || (c.moveTo(0, k), c.curveTo(0, -k / 3, l, -k / 3, l, k), c.lineTo(l, q - k), c.curveTo(l, q + k / 3, 0, q + k / 3, 0, q - k), c.close());
  };
  n.prototype.getLabelMargins = function(c) {
    return new mxRectangle(0, 2.5 * Math.min(c.height / 2, Math.round(c.height / 8) + this.strokewidth - 1), 0, 0);
  };
  mxCellRenderer.registerShape('datastore', n);
  mxUtils.extend(u, mxCylinder);
  u.prototype.size = 30;
  u.prototype.darkOpacity = 0;
  u.prototype.paintVertexShape = function(c, k, r, l, q) {
    var v = Math.max(0, Math.min(l, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))),
      w = Math.max(-1, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'darkOpacity', this.darkOpacity))));
    c.translate(k, r);
    c.begin();
    c.moveTo(0, 0);
    c.lineTo(l - v, 0);
    c.lineTo(l, v);
    c.lineTo(l, q);
    c.lineTo(0, q);
    c.lineTo(0, 0);
    c.close();
    c.end();
    c.fillAndStroke();
    this.outline || (c.setShadow(!1), 0 != w && (c.setFillAlpha(Math.abs(w)), c.setFillColor(0 > w ? '#FFFFFF' : '#000000'), c.begin(), c.moveTo(l - v, 0), c.lineTo(l - v, v), c.lineTo(l, v), c.close(), c.fill()), c.begin(), c.moveTo(l - v, 0), c.lineTo(l - v, v), c.lineTo(l, v), c.end(), c.stroke());
  };
  mxCellRenderer.registerShape('note', u);
  mxUtils.extend(m, u);
  mxCellRenderer.registerShape('note2', m);
  m.prototype.getLabelMargins = function(c) {
    if (mxUtils.getValue(this.style, 'boundedLbl', !1)) {
      var k = mxUtils.getValue(this.style, 'size', 15);
      return new mxRectangle(0, Math.min(c.height * this.scale, k * this.scale), 0, 0);
    }
    return null;
  };
  mxUtils.extend(p, mxShape);
  p.prototype.isoAngle = 15;
  p.prototype.paintVertexShape = function(c, k, r, l, q) {
    var v = Math.max(0.01, Math.min(94, parseFloat(mxUtils.getValue(this.style, 'isoAngle', this.isoAngle)))) * Math.PI / 200;
    v = Math.min(l * Math.tan(v), 0.5 * q);
    c.translate(k, r);
    c.begin();
    c.moveTo(0.5 * l, 0);
    c.lineTo(l, v);
    c.lineTo(l, q - v);
    c.lineTo(0.5 * l, q);
    c.lineTo(0, q - v);
    c.lineTo(0, v);
    c.close();
    c.fillAndStroke();
    c.setShadow(!1);
    c.begin();
    c.moveTo(0, v);
    c.lineTo(0.5 * l, 2 * v);
    c.lineTo(l, v);
    c.moveTo(0.5 * l, 2 * v);
    c.lineTo(0.5 * l, q);
    c.stroke();
  };
  mxCellRenderer.registerShape('isoCube2', p);
  mxUtils.extend(x, mxShape);
  x.prototype.size = 15;
  x.prototype.paintVertexShape = function(c, k, r, l, q) {
    var v = Math.max(0, Math.min(0.5 * q, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    c.translate(k, r);
    0 == v ? (c.rect(0, 0, l, q), c.fillAndStroke()) : (c.begin(), c.moveTo(0, v), c.arcTo(0.5 * l, v, 0, 0, 1, 0.5 * l, 0), c.arcTo(0.5 * l, v, 0, 0, 1, l, v), c.lineTo(l, q - v), c.arcTo(0.5 * l, v, 0, 0, 1, 0.5 * l, q), c.arcTo(0.5 * l, v, 0, 0, 1, 0, q - v), c.close(), c.fillAndStroke(), c.setShadow(!1), c.begin(), c.moveTo(l, v), c.arcTo(0.5 * l, v, 0, 0, 1, 0.5 * l, 2 * v), c.arcTo(0.5 * l, v, 0, 0, 1, 0, v), c.stroke());
  };
  mxCellRenderer.registerShape('cylinder2', x);
  mxUtils.extend(A, mxCylinder);
  A.prototype.size = 15;
  A.prototype.paintVertexShape = function(c, k, r, l, q) {
    var v = Math.max(0, Math.min(0.5 * q, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))),
      w = mxUtils.getValue(this.style, 'lid', !0);
    c.translate(k, r);
    0 == v ? (c.rect(0, 0, l, q), c.fillAndStroke()) : (c.begin(), w ? (c.moveTo(0, v), c.arcTo(0.5 * l, v, 0, 0, 1, 0.5 * l, 0), c.arcTo(0.5 * l, v, 0, 0, 1, l, v)) : (c.moveTo(0, 0), c.arcTo(0.5 * l, v, 0, 0, 0, 0.5 * l, v), c.arcTo(0.5 * l, v, 0, 0, 0, l, 0)), c.lineTo(l, q - v), c.arcTo(0.5 * l, v, 0, 0, 1, 0.5 * l, q), c.arcTo(0.5 * l, v, 0, 0, 1, 0, q - v), c.close(), c.fillAndStroke(), c.setShadow(!1), w && (c.begin(), c.moveTo(l, v), c.arcTo(0.5 * l, v, 0, 0, 1, 0.5 * l, 2 * v), c.arcTo(0.5 * l, v, 0, 0, 1, 0, v), c.stroke()));
  };
  mxCellRenderer.registerShape('cylinder3', A);
  mxUtils.extend(C, mxActor);
  C.prototype.redrawPath = function(c, k, r, l, q) {
    c.moveTo(0, 0);
    c.quadTo(l / 2, 0.5 * q, l, 0);
    c.quadTo(0.5 * l, q / 2, l, q);
    c.quadTo(l / 2, 0.5 * q, 0, q);
    c.quadTo(0.5 * l, q / 2, 0, 0);
    c.end();
  };
  mxCellRenderer.registerShape('switch', C);
  mxUtils.extend(D, mxCylinder);
  D.prototype.tabWidth = 60;
  D.prototype.tabHeight = 20;
  D.prototype.tabPosition = 'right';
  D.prototype.arcSize = 0.1;
  D.prototype.paintVertexShape = function(c, k, r, l, q) {
    c.translate(k, r);
    k = Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'tabWidth', this.tabWidth))));
    r = Math.max(0, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'tabHeight', this.tabHeight))));
    var v = mxUtils.getValue(this.style, 'tabPosition', this.tabPosition),
      w = mxUtils.getValue(this.style, 'rounded', !1),
      H = mxUtils.getValue(this.style, 'absoluteArcSize', !1),
      y = parseFloat(mxUtils.getValue(this.style, 'arcSize', this.arcSize));
    H || (y *= Math.min(l, q));
    y = Math.min(y, 0.5 * l, 0.5 * (q - r));
    k = Math.max(k, y);
    k = Math.min(l - y, k);
    w || (y = 0);
    c.begin();
    'left' == v ? (c.moveTo(Math.max(y, 0), r), c.lineTo(Math.max(y, 0), 0), c.lineTo(k, 0), c.lineTo(k, r)) : (c.moveTo(l - k, r), c.lineTo(l - k, 0), c.lineTo(l - Math.max(y, 0), 0), c.lineTo(l - Math.max(y, 0), r));
    w ? (c.moveTo(0, y + r), c.arcTo(y, y, 0, 0, 1, y, r), c.lineTo(l - y, r), c.arcTo(y, y, 0, 0, 1, l, y + r), c.lineTo(l, q - y), c.arcTo(y, y, 0, 0, 1, l - y, q), c.lineTo(y, q), c.arcTo(y, y, 0, 0, 1, 0, q - y)) : (c.moveTo(0, r), c.lineTo(l, r), c.lineTo(l, q), c.lineTo(0, q));
    c.close();
    c.fillAndStroke();
    c.setShadow(!1);
    'triangle' == mxUtils.getValue(this.style, 'folderSymbol', null) && (c.begin(), c.moveTo(l - 30, r + 20), c.lineTo(l - 20, r + 10), c.lineTo(l - 10, r + 20), c.close(), c.stroke());
  };
  mxCellRenderer.registerShape('folder', D);
  D.prototype.getLabelMargins = function(c) {
    if (mxUtils.getValue(this.style, 'boundedLbl', !1)) {
      var k = mxUtils.getValue(this.style, 'tabHeight', 15) * this.scale;
      if (mxUtils.getValue(this.style, 'labelInHeader', !1)) {
        var r = mxUtils.getValue(this.style, 'tabWidth', 15) * this.scale;
        k = mxUtils.getValue(this.style, 'tabHeight', 15) * this.scale;
        var l = mxUtils.getValue(this.style, 'rounded', !1),
          q = mxUtils.getValue(this.style, 'absoluteArcSize', !1),
          v = parseFloat(mxUtils.getValue(this.style, 'arcSize', this.arcSize));
        q || (v *= Math.min(c.width, c.height));
        v = Math.min(v, 0.5 * c.width, 0.5 * (c.height - k));
        l || (v = 0);
        return 'left' == mxUtils.getValue(this.style, 'tabPosition', this.tabPosition) ? new mxRectangle(v, 0, Math.min(c.width, c.width - r), Math.min(c.height, c.height - k)) : new mxRectangle(Math.min(c.width, c.width - r), 0, v, Math.min(c.height, c.height - k));
      }
      return new mxRectangle(0, Math.min(c.height, k), 0, 0);
    }
    return null;
  };
  mxUtils.extend(G, mxCylinder);
  G.prototype.arcSize = 0.1;
  G.prototype.paintVertexShape = function(c, k, r, l, q) {
    c.translate(k, r);
    var v = mxUtils.getValue(this.style, 'rounded', !1),
      w = mxUtils.getValue(this.style, 'absoluteArcSize', !1);
    k = parseFloat(mxUtils.getValue(this.style, 'arcSize', this.arcSize));
    r = mxUtils.getValue(this.style, 'umlStateConnection', null);
    w || (k *= Math.min(l, q));
    k = Math.min(k, 0.5 * l, 0.5 * q);
    v || (k = 0);
    v = 0;
    null != r && (v = 10);
    c.begin();
    c.moveTo(v, k);
    c.arcTo(k, k, 0, 0, 1, v + k, 0);
    c.lineTo(l - k, 0);
    c.arcTo(k, k, 0, 0, 1, l, k);
    c.lineTo(l, q - k);
    c.arcTo(k, k, 0, 0, 1, l - k, q);
    c.lineTo(v + k, q);
    c.arcTo(k, k, 0, 0, 1, v, q - k);
    c.close();
    c.fillAndStroke();
    c.setShadow(!1);
    'collapseState' == mxUtils.getValue(this.style, 'umlStateSymbol', null) && (c.roundrect(l - 40, q - 20, 10, 10, 3, 3), c.stroke(), c.roundrect(l - 20, q - 20, 10, 10, 3, 3), c.stroke(), c.begin(), c.moveTo(l - 30, q - 15), c.lineTo(l - 20, q - 15), c.stroke());
    'connPointRefEntry' == r ? (c.ellipse(0, 0.5 * q - 10, 20, 20), c.fillAndStroke()) : 'connPointRefExit' == r && (c.ellipse(0, 0.5 * q - 10, 20, 20), c.fillAndStroke(), c.begin(), c.moveTo(5, 0.5 * q - 5), c.lineTo(15, 0.5 * q + 5), c.moveTo(15, 0.5 * q - 5), c.lineTo(5, 0.5 * q + 5), c.stroke());
  };
  G.prototype.getLabelMargins = function(c) {
    return mxUtils.getValue(this.style, 'boundedLbl', !1) && null != mxUtils.getValue(this.style, 'umlStateConnection', null) ? new mxRectangle(10 * this.scale, 0, 0, 0) : null;
  };
  mxCellRenderer.registerShape('umlState', G);
  mxUtils.extend(F, mxActor);
  F.prototype.size = 30;
  F.prototype.isRoundable = function() {
    return !0;
  };
  F.prototype.redrawPath = function(c, k, r, l, q) {
    k = Math.max(0, Math.min(l, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
    r = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(k, 0),
      new mxPoint(l, 0),
      new mxPoint(l, q),
      new mxPoint(0, q),
      new mxPoint(0, k)
    ], this.isRounded, r, !0);
    c.end();
  };
  mxCellRenderer.registerShape('card', F);
  mxUtils.extend(K, mxActor);
  K.prototype.size = 0.4;
  K.prototype.redrawPath = function(c, k, r, l, q) {
    k = q * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    c.moveTo(0, k / 2);
    c.quadTo(l / 4, 1.4 * k, l / 2, k / 2);
    c.quadTo(3 * l / 4, k * (1 - 1.4), l, k / 2);
    c.lineTo(l, q - k / 2);
    c.quadTo(3 * l / 4, q - 1.4 * k, l / 2, q - k / 2);
    c.quadTo(l / 4, q - k * (1 - 1.4), 0, q - k / 2);
    c.lineTo(0, k / 2);
    c.close();
    c.end();
  };
  K.prototype.getLabelBounds = function(c) {
    if (mxUtils.getValue(this.style, 'boundedLbl', !1)) {
      var k = mxUtils.getValue(this.style, 'size', this.size),
        r = c.width,
        l = c.height;
      if (null == this.direction || this.direction == mxConstants.DIRECTION_EAST || this.direction == mxConstants.DIRECTION_WEST)
        return k *= l, new mxRectangle(c.x, c.y + k, r, l - 2 * k);
      k *= r;
      return new mxRectangle(c.x + k, c.y, r - 2 * k, l);
    }
    return c;
  };
  mxCellRenderer.registerShape('tape', K);
  mxUtils.extend(P, mxActor);
  P.prototype.size = 0.3;
  P.prototype.getLabelMargins = function(c) {
    return mxUtils.getValue(this.style, 'boundedLbl', !1) ? new mxRectangle(0, 0, 0, parseFloat(mxUtils.getValue(this.style, 'size', this.size)) * c.height) : null;
  };
  P.prototype.redrawPath = function(c, k, r, l, q) {
    k = q * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    c.moveTo(0, 0);
    c.lineTo(l, 0);
    c.lineTo(l, q - k / 2);
    c.quadTo(3 * l / 4, q - 1.4 * k, l / 2, q - k / 2);
    c.quadTo(l / 4, q - k * (1 - 1.4), 0, q - k / 2);
    c.lineTo(0, k / 2);
    c.close();
    c.end();
  };
  mxCellRenderer.registerShape('document', P);
  var Pa = mxCylinder.prototype.getCylinderSize;
  mxCylinder.prototype.getCylinderSize = function(c, k, r, l) {
    var q = mxUtils.getValue(this.style, 'size');
    return null != q ? l * Math.max(0, Math.min(1, q)) : Pa.apply(this, arguments);
  };
  mxCylinder.prototype.getLabelMargins = function(c) {
    if (mxUtils.getValue(this.style, 'boundedLbl', !1)) {
      var k = 2 * mxUtils.getValue(this.style, 'size', 0.15);
      return new mxRectangle(0, Math.min(this.maxHeight * this.scale, c.height * k), 0, 0);
    }
    return null;
  };
  A.prototype.getLabelMargins = function(c) {
    if (mxUtils.getValue(this.style, 'boundedLbl', !1)) {
      var k = mxUtils.getValue(this.style, 'size', 15);
      mxUtils.getValue(this.style, 'lid', !0) || (k /= 2);
      return new mxRectangle(0, Math.min(c.height * this.scale, 2 * k * this.scale), 0, Math.max(0, 0.3 * k * this.scale));
    }
    return null;
  };
  D.prototype.getLabelMargins = function(c) {
    if (mxUtils.getValue(this.style, 'boundedLbl', !1)) {
      var k = mxUtils.getValue(this.style, 'tabHeight', 15) * this.scale;
      if (mxUtils.getValue(this.style, 'labelInHeader', !1)) {
        var r = mxUtils.getValue(this.style, 'tabWidth', 15) * this.scale;
        k = mxUtils.getValue(this.style, 'tabHeight', 15) * this.scale;
        var l = mxUtils.getValue(this.style, 'rounded', !1),
          q = mxUtils.getValue(this.style, 'absoluteArcSize', !1),
          v = parseFloat(mxUtils.getValue(this.style, 'arcSize', this.arcSize));
        q || (v *= Math.min(c.width, c.height));
        v = Math.min(v, 0.5 * c.width, 0.5 * (c.height - k));
        l || (v = 0);
        return 'left' == mxUtils.getValue(this.style, 'tabPosition', this.tabPosition) ? new mxRectangle(v, 0, Math.min(c.width, c.width - r), Math.min(c.height, c.height - k)) : new mxRectangle(Math.min(c.width, c.width - r), 0, v, Math.min(c.height, c.height - k));
      }
      return new mxRectangle(0, Math.min(c.height, k), 0, 0);
    }
    return null;
  };
  G.prototype.getLabelMargins = function(c) {
    return mxUtils.getValue(this.style, 'boundedLbl', !1) && null != mxUtils.getValue(this.style, 'umlStateConnection', null) ? new mxRectangle(10 * this.scale, 0, 0, 0) : null;
  };
  m.prototype.getLabelMargins = function(c) {
    if (mxUtils.getValue(this.style, 'boundedLbl', !1)) {
      var k = mxUtils.getValue(this.style, 'size', 15);
      return new mxRectangle(0, Math.min(c.height * this.scale, k * this.scale), 0, Math.max(0, k * this.scale));
    }
    return null;
  };
  mxUtils.extend(R, mxActor);
  R.prototype.size = 0.2;
  R.prototype.fixedSize = 20;
  R.prototype.isRoundable = function() {
    return !0;
  };
  R.prototype.redrawPath = function(c, k, r, l, q) {
    k = '0' != mxUtils.getValue(this.style, 'fixedSize', '0') ? Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) : l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    r = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(0, q),
      new mxPoint(k, 0),
      new mxPoint(l, 0),
      new mxPoint(l - k, q)
    ], this.isRounded, r, !0);
    c.end();
  };
  mxCellRenderer.registerShape('parallelogram', R);
  mxUtils.extend(Q, mxActor);
  Q.prototype.size = 0.2;
  Q.prototype.fixedSize = 20;
  Q.prototype.isRoundable = function() {
    return !0;
  };
  Q.prototype.redrawPath = function(c, k, r, l, q) {
    k = '0' != mxUtils.getValue(this.style, 'fixedSize', '0') ? Math.max(0, Math.min(0.5 * l, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) : l * Math.max(0, Math.min(0.5, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    r = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(0, q),
      new mxPoint(k, 0),
      new mxPoint(l - k, 0),
      new mxPoint(l, q)
    ], this.isRounded, r, !0);
  };
  mxCellRenderer.registerShape('trapezoid', Q);
  mxUtils.extend(ba, mxActor);
  ba.prototype.size = 0.5;
  ba.prototype.redrawPath = function(c, k, r, l, q) {
    c.setFillColor(null);
    k = l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    r = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(l, 0),
      new mxPoint(k, 0),
      new mxPoint(k, q / 2),
      new mxPoint(0, q / 2),
      new mxPoint(k, q / 2),
      new mxPoint(k, q),
      new mxPoint(l, q)
    ], this.isRounded, r, !1);
    c.end();
  };
  mxCellRenderer.registerShape('curlyBracket', ba);
  mxUtils.extend(V, mxActor);
  V.prototype.redrawPath = function(c, k, r, l, q) {
    c.setStrokeWidth(1);
    c.setFillColor(this.stroke);
    k = l / 5;
    c.rect(0, 0, k, q);
    c.fillAndStroke();
    c.rect(2 * k, 0, k, q);
    c.fillAndStroke();
    c.rect(4 * k, 0, k, q);
    c.fillAndStroke();
  };
  mxCellRenderer.registerShape('parallelMarker', V);
  T.prototype.moveTo = function(c, k) {
    this.originalMoveTo.apply(this.canvas, arguments);
    this.lastX = c;
    this.lastY = k;
    this.firstX = c;
    this.firstY = k;
  };
  T.prototype.close = function() {
    null != this.firstX && null != this.firstY && (this.lineTo(this.firstX, this.firstY), this.originalClose.apply(this.canvas, arguments));
    this.originalClose.apply(this.canvas, arguments);
  };
  T.prototype.quadTo = function(c, k, r, l) {
    this.originalQuadTo.apply(this.canvas, arguments);
    this.lastX = r;
    this.lastY = l;
  };
  T.prototype.curveTo = function(c, k, r, l, q, v) {
    this.originalCurveTo.apply(this.canvas, arguments);
    this.lastX = q;
    this.lastY = v;
  };
  T.prototype.arcTo = function(c, k, r, l, q, v, w) {
    this.originalArcTo.apply(this.canvas, arguments);
    this.lastX = v;
    this.lastY = w;
  };
  T.prototype.lineTo = function(c, k) {
    if (null != this.lastX && null != this.lastY) {
      var r = function(O) {
          return 'number' === typeof O ? O ? 0 > O ? -1 : 1 : O === O ? 0 : NaN : NaN;
        },
        l = Math.abs(c - this.lastX),
        q = Math.abs(k - this.lastY),
        v = Math.sqrt(l * l + q * q);
      if (2 > v) {
        this.originalLineTo.apply(this.canvas, arguments);
        this.lastX = c;
        this.lastY = k;
        return;
      }
      var w = Math.round(v / 10),
        H = this.defaultVariation;
      5 > w && (w = 5, H /= 3);
      var y = r(c - this.lastX) * l / w;
      r = r(k - this.lastY) * q / w;
      l /= v;
      q /= v;
      for (v = 0; v < w; v++) {
        var aa = (Math.random() - 0.5) * H;
        this.originalLineTo.call(this.canvas, y * v + this.lastX - aa * q, r * v + this.lastY - aa * l);
      }
      this.originalLineTo.call(this.canvas, c, k);
    } else
      this.originalLineTo.apply(this.canvas, arguments);
    this.lastX = c;
    this.lastY = k;
  };
  T.prototype.destroy = function() {
    this.canvas.lineTo = this.originalLineTo;
    this.canvas.moveTo = this.originalMoveTo;
    this.canvas.close = this.originalClose;
    this.canvas.quadTo = this.originalQuadTo;
    this.canvas.curveTo = this.originalCurveTo;
    this.canvas.arcTo = this.originalArcTo;
  };
  var Ya = mxShape.prototype.beforePaint;
  mxShape.prototype.beforePaint = function(c) {
    Ya.apply(this, arguments);
    null == c.handJiggle && (c.handJiggle = this.createHandJiggle(c));
  };
  var gb = mxShape.prototype.afterPaint;
  mxShape.prototype.afterPaint = function(c) {
    gb.apply(this, arguments);
    null != c.handJiggle && (c.handJiggle.destroy(), delete c.handJiggle);
  };
  mxShape.prototype.createComicCanvas = function(c) {
    return new T(c, mxUtils.getValue(this.style, 'jiggle', Editor.sketchDefaultJiggle));
  };
  mxShape.prototype.createHandJiggle = function(c) {
    return this.outline || null == this.style || '0' == mxUtils.getValue(this.style, 'comic', '0') ? null : this.createComicCanvas(c);
  };
  var cb = mxRectangleShape.prototype.isHtmlAllowed;
  mxRectangleShape.prototype.isHtmlAllowed = function() {
    return !this.outline && (null == this.style || '0' == mxUtils.getValue(this.style, 'comic', '0') && '0' == mxUtils.getValue(this.style, 'sketch', '1' == urlParams.rough ? '1' : '0')) && cb.apply(this, arguments);
  };
  var rb = mxRectangleShape.prototype.paintBackground;
  mxRectangleShape.prototype.paintBackground = function(c, k, r, l, q) {
    if (null == c.handJiggle || c.handJiggle.constructor != T)
      rb.apply(this, arguments);
    else {
      var v = !0;
      null != this.style && (v = '1' == mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1'));
      if (v || null != this.fill && this.fill != mxConstants.NONE || null != this.stroke && this.stroke != mxConstants.NONE)
        v || null != this.fill && this.fill != mxConstants.NONE || (c.pointerEvents = !1), c.begin(), this.isRounded ? ('1' == mxUtils.getValue(this.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0) ? v = Math.min(l / 2, Math.min(q / 2, mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2)) : (v = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, 100 * mxConstants.RECTANGLE_ROUNDING_FACTOR) / 100, v = Math.min(l * v, q * v)), c.moveTo(k + v, r), c.lineTo(k + l - v, r), c.quadTo(k + l, r, k + l, r + v), c.lineTo(k + l, r + q - v), c.quadTo(k + l, r + q, k + l - v, r + q), c.lineTo(k + v, r + q), c.quadTo(k, r + q, k, r + q - v), c.lineTo(k, r + v), c.quadTo(k, r, k + v, r)) : (c.moveTo(k, r), c.lineTo(k + l, r), c.lineTo(k + l, r + q), c.lineTo(k, r + q), c.lineTo(k, r)), c.close(), c.end(), c.fillAndStroke();
    }
  };
  mxUtils.extend(Z, mxRectangleShape);
  Z.prototype.size = 0.1;
  Z.prototype.fixedSize = !1;
  Z.prototype.isHtmlAllowed = function() {
    return !1;
  };
  Z.prototype.getLabelBounds = function(c) {
    if (mxUtils.getValue(this.state.style, mxConstants.STYLE_HORIZONTAL, !0) == (null == this.direction || this.direction == mxConstants.DIRECTION_EAST || this.direction == mxConstants.DIRECTION_WEST)) {
      var k = c.width,
        r = c.height;
      c = new mxRectangle(c.x, c.y, k, r);
      var l = k * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
      if (this.isRounded) {
        var q = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, 100 * mxConstants.RECTANGLE_ROUNDING_FACTOR) / 100;
        l = Math.max(l, Math.min(k * q, r * q));
      }
      c.x += Math.round(l);
      c.width -= Math.round(2 * l);
      return c;
    }
    return c;
  };
  Z.prototype.paintForeground = function(c, k, r, l, q) {
    var v = mxUtils.getValue(this.style, 'fixedSize', this.fixedSize),
      w = parseFloat(mxUtils.getValue(this.style, 'size', this.size));
    w = v ? Math.max(0, Math.min(l, w)) : l * Math.max(0, Math.min(1, w));
    this.isRounded && (v = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, 100 * mxConstants.RECTANGLE_ROUNDING_FACTOR) / 100, w = Math.max(w, Math.min(l * v, q * v)));
    w = Math.round(w);
    c.begin();
    c.moveTo(k + w, r);
    c.lineTo(k + w, r + q);
    c.moveTo(k + l - w, r);
    c.lineTo(k + l - w, r + q);
    c.end();
    c.stroke();
    mxRectangleShape.prototype.paintForeground.apply(this, arguments);
  };
  mxCellRenderer.registerShape('process', Z);
  mxCellRenderer.registerShape('process2', Z);
  mxUtils.extend(ma, mxRectangleShape);
  ma.prototype.paintBackground = function(c, k, r, l, q) {
    c.setFillColor(mxConstants.NONE);
    c.rect(k, r, l, q);
    c.fill();
  };
  ma.prototype.paintForeground = function(c, k, r, l, q) {};
  mxCellRenderer.registerShape('transparent', ma);
  mxUtils.extend(ja, mxHexagon);
  ja.prototype.size = 30;
  ja.prototype.position = 0.5;
  ja.prototype.position2 = 0.5;
  ja.prototype.base = 20;
  ja.prototype.getLabelMargins = function() {
    return new mxRectangle(0, 0, 0, parseFloat(mxUtils.getValue(this.style, 'size', this.size)) * this.scale);
  };
  ja.prototype.isRoundable = function() {
    return !0;
  };
  ja.prototype.redrawPath = function(c, k, r, l, q) {
    k = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    r = Math.max(0, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    var v = l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position', this.position)))),
      w = l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position2', this.position2)))),
      H = Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'base', this.base))));
    this.addPoints(c, [
      new mxPoint(0, 0),
      new mxPoint(l, 0),
      new mxPoint(l, q - r),
      new mxPoint(Math.min(l, v + H), q - r),
      new mxPoint(w, q),
      new mxPoint(Math.max(0, v), q - r),
      new mxPoint(0, q - r)
    ], this.isRounded, k, !0, [4]);
  };
  mxCellRenderer.registerShape('callout', ja);
  mxUtils.extend(la, mxActor);
  la.prototype.size = 0.2;
  la.prototype.fixedSize = 20;
  la.prototype.isRoundable = function() {
    return !0;
  };
  la.prototype.redrawPath = function(c, k, r, l, q) {
    k = '0' != mxUtils.getValue(this.style, 'fixedSize', '0') ? Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) : l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    r = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(0, 0),
      new mxPoint(l - k, 0),
      new mxPoint(l, q / 2),
      new mxPoint(l - k, q),
      new mxPoint(0, q),
      new mxPoint(k, q / 2)
    ], this.isRounded, r, !0);
    c.end();
  };
  mxCellRenderer.registerShape('step', la);
  mxUtils.extend(N, mxHexagon);
  N.prototype.size = 0.25;
  N.prototype.fixedSize = 20;
  N.prototype.isRoundable = function() {
    return !0;
  };
  N.prototype.redrawPath = function(c, k, r, l, q) {
    k = '0' != mxUtils.getValue(this.style, 'fixedSize', '0') ? Math.max(0, Math.min(0.5 * l, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) : l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    r = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(k, 0),
      new mxPoint(l - k, 0),
      new mxPoint(l, 0.5 * q),
      new mxPoint(l - k, q),
      new mxPoint(k, q),
      new mxPoint(0, 0.5 * q)
    ], this.isRounded, r, !0);
  };
  mxCellRenderer.registerShape('hexagon', N);
  mxUtils.extend(X, mxRectangleShape);
  X.prototype.isHtmlAllowed = function() {
    return !1;
  };
  X.prototype.paintForeground = function(c, k, r, l, q) {
    var v = Math.min(l / 5, q / 5) + 1;
    c.begin();
    c.moveTo(k + l / 2, r + v);
    c.lineTo(k + l / 2, r + q - v);
    c.moveTo(k + v, r + q / 2);
    c.lineTo(k + l - v, r + q / 2);
    c.end();
    c.stroke();
    mxRectangleShape.prototype.paintForeground.apply(this, arguments);
  };
  mxCellRenderer.registerShape('plus', X);
  var ub = mxRhombus.prototype.paintVertexShape;
  mxRhombus.prototype.getLabelBounds = function(c) {
    if (1 == this.style['double']) {
      var k = (2 * Math.max(2, this.strokewidth + 1) + parseFloat(this.style[mxConstants.STYLE_MARGIN] || 0)) * this.scale;
      return new mxRectangle(c.x + k, c.y + k, c.width - 2 * k, c.height - 2 * k);
    }
    return c;
  };
  mxRhombus.prototype.paintVertexShape = function(c, k, r, l, q) {
    ub.apply(this, arguments);
    if (!this.outline && 1 == this.style['double']) {
      var v = 2 * Math.max(2, this.strokewidth + 1) + parseFloat(this.style[mxConstants.STYLE_MARGIN] || 0);
      k += v;
      r += v;
      l -= 2 * v;
      q -= 2 * v;
      0 < l && 0 < q && (c.setShadow(!1), ub.apply(this, [
        c,
        k,
        r,
        l,
        q
      ]));
    }
  };
  mxUtils.extend(L, mxRectangleShape);
  L.prototype.isHtmlAllowed = function() {
    return !1;
  };
  L.prototype.getLabelBounds = function(c) {
    if (1 == this.style['double']) {
      var k = (Math.max(2, this.strokewidth + 1) + parseFloat(this.style[mxConstants.STYLE_MARGIN] || 0)) * this.scale;
      return new mxRectangle(c.x + k, c.y + k, c.width - 2 * k, c.height - 2 * k);
    }
    return c;
  };
  L.prototype.paintForeground = function(c, k, r, l, q) {
    if (null != this.style) {
      if (!this.outline && 1 == this.style['double']) {
        var v = Math.max(2, this.strokewidth + 1) + parseFloat(this.style[mxConstants.STYLE_MARGIN] || 0);
        k += v;
        r += v;
        l -= 2 * v;
        q -= 2 * v;
        0 < l && 0 < q && mxRectangleShape.prototype.paintBackground.apply(this, arguments);
      }
      c.setDashed(!1);
      v = 0;
      do {
        var w = mxCellRenderer.defaultShapes[this.style['symbol' + v]];
        if (null != w) {
          var H = this.style['symbol' + v + 'Align'],
            y = this.style['symbol' + v + 'VerticalAlign'],
            aa = this.style['symbol' + v + 'Width'],
            O = this.style['symbol' + v + 'Height'],
            Da = this.style['symbol' + v + 'Spacing'] || 0,
            Qa = this.style['symbol' + v + 'VSpacing'] || Da,
            La = this.style['symbol' + v + 'ArcSpacing'];
          null != La && (La *= this.getArcSize(l + this.strokewidth, q + this.strokewidth), Da += La, Qa += La);
          La = k;
          var na = r;
          La = H == mxConstants.ALIGN_CENTER ? La + (l - aa) / 2 : H == mxConstants.ALIGN_RIGHT ? La + (l - aa - Da) : La + Da;
          na = y == mxConstants.ALIGN_MIDDLE ? na + (q - O) / 2 : y == mxConstants.ALIGN_BOTTOM ? na + (q - O - Qa) : na + Qa;
          c.save();
          H = new w();
          H.style = this.style;
          w.prototype.paintVertexShape.call(H, c, La, na, aa, O);
          c.restore();
        }
        v++;
      } while (null != w);
    }
    mxRectangleShape.prototype.paintForeground.apply(this, arguments);
  };
  mxCellRenderer.registerShape('ext', L);
  mxUtils.extend(S, mxCylinder);
  S.prototype.redrawPath = function(c, k, r, l, q, v) {
    v ? (c.moveTo(0, 0), c.lineTo(l / 2, q / 2), c.lineTo(l, 0), c.end()) : (c.moveTo(0, 0), c.lineTo(l, 0), c.lineTo(l, q), c.lineTo(0, q), c.close());
  };
  mxCellRenderer.registerShape('message', S);
  mxUtils.extend(I, mxShape);
  I.prototype.paintBackground = function(c, k, r, l, q) {
    c.translate(k, r);
    c.ellipse(l / 4, 0, l / 2, q / 4);
    c.fillAndStroke();
    c.begin();
    c.moveTo(l / 2, q / 4);
    c.lineTo(l / 2, 2 * q / 3);
    c.moveTo(l / 2, q / 3);
    c.lineTo(0, q / 3);
    c.moveTo(l / 2, q / 3);
    c.lineTo(l, q / 3);
    c.moveTo(l / 2, 2 * q / 3);
    c.lineTo(0, q);
    c.moveTo(l / 2, 2 * q / 3);
    c.lineTo(l, q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('umlActor', I);
  mxUtils.extend(Y, mxShape);
  Y.prototype.getLabelMargins = function(c) {
    return new mxRectangle(c.width / 6, 0, 0, 0);
  };
  Y.prototype.paintBackground = function(c, k, r, l, q) {
    c.translate(k, r);
    c.begin();
    c.moveTo(0, q / 4);
    c.lineTo(0, 3 * q / 4);
    c.end();
    c.stroke();
    c.begin();
    c.moveTo(0, q / 2);
    c.lineTo(l / 6, q / 2);
    c.end();
    c.stroke();
    c.ellipse(l / 6, 0, 5 * l / 6, q);
    c.fillAndStroke();
  };
  mxCellRenderer.registerShape('umlBoundary', Y);
  mxUtils.extend(ia, mxEllipse);
  ia.prototype.paintVertexShape = function(c, k, r, l, q) {
    mxEllipse.prototype.paintVertexShape.apply(this, arguments);
    c.begin();
    c.moveTo(k + l / 8, r + q);
    c.lineTo(k + 7 * l / 8, r + q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('umlEntity', ia);
  mxUtils.extend(ka, mxShape);
  ka.prototype.paintVertexShape = function(c, k, r, l, q) {
    c.translate(k, r);
    c.begin();
    c.moveTo(l, 0);
    c.lineTo(0, q);
    c.moveTo(0, 0);
    c.lineTo(l, q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('umlDestroy', ka);
  mxUtils.extend(U, mxShape);
  U.prototype.getLabelBounds = function(c) {
    return new mxRectangle(c.x, c.y + c.height / 8, c.width, 7 * c.height / 8);
  };
  U.prototype.paintBackground = function(c, k, r, l, q) {
    c.translate(k, r);
    c.begin();
    c.moveTo(3 * l / 8, q / 8 * 1.1);
    c.lineTo(5 * l / 8, 0);
    c.end();
    c.stroke();
    c.ellipse(0, q / 8, l, 7 * q / 8);
    c.fillAndStroke();
  };
  U.prototype.paintForeground = function(c, k, r, l, q) {
    c.begin();
    c.moveTo(3 * l / 8, q / 8 * 1.1);
    c.lineTo(5 * l / 8, q / 4);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('umlControl', U);
  mxUtils.extend(ca, mxRectangleShape);
  ca.prototype.size = 40;
  ca.prototype.isHtmlAllowed = function() {
    return !1;
  };
  ca.prototype.getLabelBounds = function(c) {
    var k = Math.max(0, Math.min(c.height, parseFloat(mxUtils.getValue(this.style, 'size', this.size)) * this.scale));
    return new mxRectangle(c.x, c.y, c.width, k);
  };
  ca.prototype.paintBackground = function(c, k, r, l, q) {
    var v = Math.max(0, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))),
      w = mxUtils.getValue(this.style, 'participant');
    null == w || null == this.state ? mxRectangleShape.prototype.paintBackground.call(this, c, k, r, l, v) : (w = this.state.view.graph.cellRenderer.getShape(w), null != w && w != ca && (w = new w(), w.apply(this.state), c.save(), w.paintVertexShape(c, k, r, l, v), c.restore()));
    v < q && (c.setDashed('1' == mxUtils.getValue(this.style, 'lifelineDashed', '1')), c.begin(), c.moveTo(k + l / 2, r + v), c.lineTo(k + l / 2, r + q), c.end(), c.stroke());
  };
  ca.prototype.paintForeground = function(c, k, r, l, q) {
    var v = Math.max(0, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    mxRectangleShape.prototype.paintForeground.call(this, c, k, r, l, Math.min(q, v));
  };
  mxCellRenderer.registerShape('umlLifeline', ca);
  mxUtils.extend(ra, mxShape);
  ra.prototype.width = 60;
  ra.prototype.height = 30;
  ra.prototype.corner = 10;
  ra.prototype.getLabelMargins = function(c) {
    return new mxRectangle(0, 0, c.width - parseFloat(mxUtils.getValue(this.style, 'width', this.width) * this.scale), c.height - parseFloat(mxUtils.getValue(this.style, 'height', this.height) * this.scale));
  };
  ra.prototype.paintBackground = function(c, k, r, l, q) {
    var v = this.corner,
      w = Math.min(l, Math.max(v, parseFloat(mxUtils.getValue(this.style, 'width', this.width)))),
      H = Math.min(q, Math.max(1.5 * v, parseFloat(mxUtils.getValue(this.style, 'height', this.height)))),
      y = mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_FILLCOLOR, mxConstants.NONE);
    y != mxConstants.NONE && (c.setFillColor(y), c.rect(k, r, l, q), c.fill());
    null != this.fill && this.fill != mxConstants.NONE && this.gradient && this.gradient != mxConstants.NONE ? (this.getGradientBounds(c, k, r, l, q), c.setGradient(this.fill, this.gradient, k, r, l, q, this.gradientDirection)) : c.setFillColor(this.fill);
    c.begin();
    c.moveTo(k, r);
    c.lineTo(k + w, r);
    c.lineTo(k + w, r + Math.max(0, H - 1.5 * v));
    c.lineTo(k + Math.max(0, w - v), r + H);
    c.lineTo(k, r + H);
    c.close();
    c.fillAndStroke();
    c.begin();
    c.moveTo(k + w, r);
    c.lineTo(k + l, r);
    c.lineTo(k + l, r + q);
    c.lineTo(k, r + q);
    c.lineTo(k, r + H);
    c.stroke();
  };
  mxCellRenderer.registerShape('umlFrame', ra);
  mxPerimeter.CenterPerimeter = function(c, k, r, l) {
    return new mxPoint(c.getCenterX(), c.getCenterY());
  };
  mxStyleRegistry.putValue('centerPerimeter', mxPerimeter.CenterPerimeter);
  mxPerimeter.LifelinePerimeter = function(c, k, r, l) {
    l = ca.prototype.size;
    null != k && (l = mxUtils.getValue(k.style, 'size', l) * k.view.scale);
    k = parseFloat(k.style[mxConstants.STYLE_STROKEWIDTH] || 1) * k.view.scale / 2 - 1;
    r.x < c.getCenterX() && (k = -1 * (k + 1));
    return new mxPoint(c.getCenterX() + k, Math.min(c.y + c.height, Math.max(c.y + l, r.y)));
  };
  mxStyleRegistry.putValue('lifelinePerimeter', mxPerimeter.LifelinePerimeter);
  mxPerimeter.OrthogonalPerimeter = function(c, k, r, l) {
    l = !0;
    return mxPerimeter.RectanglePerimeter.apply(this, arguments);
  };
  mxStyleRegistry.putValue('orthogonalPerimeter', mxPerimeter.OrthogonalPerimeter);
  mxPerimeter.BackbonePerimeter = function(c, k, r, l) {
    l = parseFloat(k.style[mxConstants.STYLE_STROKEWIDTH] || 1) * k.view.scale / 2 - 1;
    null != k.style.backboneSize && (l += parseFloat(k.style.backboneSize) * k.view.scale / 2 - 1);
    if ('south' == k.style[mxConstants.STYLE_DIRECTION] || 'north' == k.style[mxConstants.STYLE_DIRECTION])
      return r.x < c.getCenterX() && (l = -1 * (l + 1)), new mxPoint(c.getCenterX() + l, Math.min(c.y + c.height, Math.max(c.y, r.y)));
    r.y < c.getCenterY() && (l = -1 * (l + 1));
    return new mxPoint(Math.min(c.x + c.width, Math.max(c.x, r.x)), c.getCenterY() + l);
  };
  mxStyleRegistry.putValue('backbonePerimeter', mxPerimeter.BackbonePerimeter);
  mxPerimeter.CalloutPerimeter = function(c, k, r, l) {
    return mxPerimeter.RectanglePerimeter(mxUtils.getDirectedBounds(c, new mxRectangle(0, 0, 0, Math.max(0, Math.min(c.height, parseFloat(mxUtils.getValue(k.style, 'size', ja.prototype.size)) * k.view.scale))), k.style), k, r, l);
  };
  mxStyleRegistry.putValue('calloutPerimeter', mxPerimeter.CalloutPerimeter);
  mxPerimeter.ParallelogramPerimeter = function(c, k, r, l) {
    var q = '0' != mxUtils.getValue(k.style, 'fixedSize', '0'),
      v = q ? R.prototype.fixedSize : R.prototype.size;
    null != k && (v = mxUtils.getValue(k.style, 'size', v));
    q && (v *= k.view.scale);
    var w = c.x,
      H = c.y,
      y = c.width,
      aa = c.height;
    k = null != k ? mxUtils.getValue(k.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
    k == mxConstants.DIRECTION_NORTH || k == mxConstants.DIRECTION_SOUTH ? (q = q ? Math.max(0, Math.min(aa, v)) : aa * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w, H),
      new mxPoint(w + y, H + q),
      new mxPoint(w + y, H + aa),
      new mxPoint(w, H + aa - q),
      new mxPoint(w, H)
    ]) : (q = q ? Math.max(0, Math.min(0.5 * y, v)) : y * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w + q, H),
      new mxPoint(w + y, H),
      new mxPoint(w + y - q, H + aa),
      new mxPoint(w, H + aa),
      new mxPoint(w + q, H)
    ]);
    aa = c.getCenterX();
    c = c.getCenterY();
    c = new mxPoint(aa, c);
    l && (r.x < w || r.x > w + y ? c.y = r.y : c.x = r.x);
    return mxUtils.getPerimeterPoint(H, c, r);
  };
  mxStyleRegistry.putValue('parallelogramPerimeter', mxPerimeter.ParallelogramPerimeter);
  mxPerimeter.TrapezoidPerimeter = function(c, k, r, l) {
    var q = '0' != mxUtils.getValue(k.style, 'fixedSize', '0'),
      v = q ? Q.prototype.fixedSize : Q.prototype.size;
    null != k && (v = mxUtils.getValue(k.style, 'size', v));
    q && (v *= k.view.scale);
    var w = c.x,
      H = c.y,
      y = c.width,
      aa = c.height;
    k = null != k ? mxUtils.getValue(k.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
    k == mxConstants.DIRECTION_EAST ? (q = q ? Math.max(0, Math.min(0.5 * y, v)) : y * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w + q, H),
      new mxPoint(w + y - q, H),
      new mxPoint(w + y, H + aa),
      new mxPoint(w, H + aa),
      new mxPoint(w + q, H)
    ]) : k == mxConstants.DIRECTION_WEST ? (q = q ? Math.max(0, Math.min(y, v)) : y * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w, H),
      new mxPoint(w + y, H),
      new mxPoint(w + y - q, H + aa),
      new mxPoint(w + q, H + aa),
      new mxPoint(w, H)
    ]) : k == mxConstants.DIRECTION_NORTH ? (q = q ? Math.max(0, Math.min(aa, v)) : aa * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w, H + q),
      new mxPoint(w + y, H),
      new mxPoint(w + y, H + aa),
      new mxPoint(w, H + aa - q),
      new mxPoint(w, H + q)
    ]) : (q = q ? Math.max(0, Math.min(aa, v)) : aa * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w, H),
      new mxPoint(w + y, H + q),
      new mxPoint(w + y, H + aa - q),
      new mxPoint(w, H + aa),
      new mxPoint(w, H)
    ]);
    aa = c.getCenterX();
    c = c.getCenterY();
    c = new mxPoint(aa, c);
    l && (r.x < w || r.x > w + y ? c.y = r.y : c.x = r.x);
    return mxUtils.getPerimeterPoint(H, c, r);
  };
  mxStyleRegistry.putValue('trapezoidPerimeter', mxPerimeter.TrapezoidPerimeter);
  mxPerimeter.StepPerimeter = function(c, k, r, l) {
    var q = '0' != mxUtils.getValue(k.style, 'fixedSize', '0'),
      v = q ? la.prototype.fixedSize : la.prototype.size;
    null != k && (v = mxUtils.getValue(k.style, 'size', v));
    q && (v *= k.view.scale);
    var w = c.x,
      H = c.y,
      y = c.width,
      aa = c.height,
      O = c.getCenterX();
    c = c.getCenterY();
    k = null != k ? mxUtils.getValue(k.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
    k == mxConstants.DIRECTION_EAST ? (q = q ? Math.max(0, Math.min(y, v)) : y * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w, H),
      new mxPoint(w + y - q, H),
      new mxPoint(w + y, c),
      new mxPoint(w + y - q, H + aa),
      new mxPoint(w, H + aa),
      new mxPoint(w + q, c),
      new mxPoint(w, H)
    ]) : k == mxConstants.DIRECTION_WEST ? (q = q ? Math.max(0, Math.min(y, v)) : y * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w + q, H),
      new mxPoint(w + y, H),
      new mxPoint(w + y - q, c),
      new mxPoint(w + y, H + aa),
      new mxPoint(w + q, H + aa),
      new mxPoint(w, c),
      new mxPoint(w + q, H)
    ]) : k == mxConstants.DIRECTION_NORTH ? (q = q ? Math.max(0, Math.min(aa, v)) : aa * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w, H + q),
      new mxPoint(O, H),
      new mxPoint(w + y, H + q),
      new mxPoint(w + y, H + aa),
      new mxPoint(O, H + aa - q),
      new mxPoint(w, H + aa),
      new mxPoint(w, H + q)
    ]) : (q = q ? Math.max(0, Math.min(aa, v)) : aa * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w, H),
      new mxPoint(O, H + q),
      new mxPoint(w + y, H),
      new mxPoint(w + y, H + aa - q),
      new mxPoint(O, H + aa),
      new mxPoint(w, H + aa - q),
      new mxPoint(w, H)
    ]);
    O = new mxPoint(O, c);
    l && (r.x < w || r.x > w + y ? O.y = r.y : O.x = r.x);
    return mxUtils.getPerimeterPoint(H, O, r);
  };
  mxStyleRegistry.putValue('stepPerimeter', mxPerimeter.StepPerimeter);
  mxPerimeter.HexagonPerimeter2 = function(c, k, r, l) {
    var q = '0' != mxUtils.getValue(k.style, 'fixedSize', '0'),
      v = q ? N.prototype.fixedSize : N.prototype.size;
    null != k && (v = mxUtils.getValue(k.style, 'size', v));
    q && (v *= k.view.scale);
    var w = c.x,
      H = c.y,
      y = c.width,
      aa = c.height,
      O = c.getCenterX();
    c = c.getCenterY();
    k = null != k ? mxUtils.getValue(k.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
    k == mxConstants.DIRECTION_NORTH || k == mxConstants.DIRECTION_SOUTH ? (q = q ? Math.max(0, Math.min(aa, v)) : aa * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(O, H),
      new mxPoint(w + y, H + q),
      new mxPoint(w + y, H + aa - q),
      new mxPoint(O, H + aa),
      new mxPoint(w, H + aa - q),
      new mxPoint(w, H + q),
      new mxPoint(O, H)
    ]) : (q = q ? Math.max(0, Math.min(y, v)) : y * Math.max(0, Math.min(1, v)), H = [
      new mxPoint(w + q, H),
      new mxPoint(w + y - q, H),
      new mxPoint(w + y, c),
      new mxPoint(w + y - q, H + aa),
      new mxPoint(w + q, H + aa),
      new mxPoint(w, c),
      new mxPoint(w + q, H)
    ]);
    O = new mxPoint(O, c);
    l && (r.x < w || r.x > w + y ? O.y = r.y : O.x = r.x);
    return mxUtils.getPerimeterPoint(H, O, r);
  };
  mxStyleRegistry.putValue('hexagonPerimeter2', mxPerimeter.HexagonPerimeter2);
  mxUtils.extend(ua, mxShape);
  ua.prototype.size = 10;
  ua.prototype.paintBackground = function(c, k, r, l, q) {
    var v = parseFloat(mxUtils.getValue(this.style, 'size', this.size));
    c.translate(k, r);
    c.ellipse((l - v) / 2, 0, v, v);
    c.fillAndStroke();
    c.begin();
    c.moveTo(l / 2, v);
    c.lineTo(l / 2, q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('lollipop', ua);
  mxUtils.extend(Ga, mxShape);
  Ga.prototype.size = 10;
  Ga.prototype.inset = 2;
  Ga.prototype.paintBackground = function(c, k, r, l, q) {
    var v = parseFloat(mxUtils.getValue(this.style, 'size', this.size)),
      w = parseFloat(mxUtils.getValue(this.style, 'inset', this.inset)) + this.strokewidth;
    c.translate(k, r);
    c.begin();
    c.moveTo(l / 2, v + w);
    c.lineTo(l / 2, q);
    c.end();
    c.stroke();
    c.begin();
    c.moveTo((l - v) / 2 - w, v / 2);
    c.quadTo((l - v) / 2 - w, v + w, l / 2, v + w);
    c.quadTo((l + v) / 2 + w, v + w, (l + v) / 2 + w, v / 2);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('requires', Ga);
  mxUtils.extend(Ia, mxShape);
  Ia.prototype.paintBackground = function(c, k, r, l, q) {
    c.translate(k, r);
    c.begin();
    c.moveTo(0, 0);
    c.quadTo(l, 0, l, q / 2);
    c.quadTo(l, q, 0, q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('requiredInterface', Ia);
  mxUtils.extend(wa, mxShape);
  wa.prototype.inset = 2;
  wa.prototype.paintBackground = function(c, k, r, l, q) {
    var v = parseFloat(mxUtils.getValue(this.style, 'inset', this.inset)) + this.strokewidth;
    c.translate(k, r);
    c.ellipse(0, v, l - 2 * v, q - 2 * v);
    c.fillAndStroke();
    c.begin();
    c.moveTo(l / 2, 0);
    c.quadTo(l, 0, l, q / 2);
    c.quadTo(l, q, l / 2, q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('providedRequiredInterface', wa);
  mxUtils.extend(Ca, mxCylinder);
  Ca.prototype.jettyWidth = 20;
  Ca.prototype.jettyHeight = 10;
  Ca.prototype.redrawPath = function(c, k, r, l, q, v) {
    var w = parseFloat(mxUtils.getValue(this.style, 'jettyWidth', this.jettyWidth));
    k = parseFloat(mxUtils.getValue(this.style, 'jettyHeight', this.jettyHeight));
    r = w / 2;
    w = r + w / 2;
    var H = Math.min(k, q - k),
      y = Math.min(H + 2 * k, q - k);
    v ? (c.moveTo(r, H), c.lineTo(w, H), c.lineTo(w, H + k), c.lineTo(r, H + k), c.moveTo(r, y), c.lineTo(w, y), c.lineTo(w, y + k), c.lineTo(r, y + k)) : (c.moveTo(r, 0), c.lineTo(l, 0), c.lineTo(l, q), c.lineTo(r, q), c.lineTo(r, y + k), c.lineTo(0, y + k), c.lineTo(0, y), c.lineTo(r, y), c.lineTo(r, H + k), c.lineTo(0, H + k), c.lineTo(0, H), c.lineTo(r, H), c.close());
    c.end();
  };
  mxCellRenderer.registerShape('module', Ca);
  mxUtils.extend(ta, mxCylinder);
  ta.prototype.jettyWidth = 32;
  ta.prototype.jettyHeight = 12;
  ta.prototype.redrawPath = function(c, k, r, l, q, v) {
    var w = parseFloat(mxUtils.getValue(this.style, 'jettyWidth', this.jettyWidth));
    k = parseFloat(mxUtils.getValue(this.style, 'jettyHeight', this.jettyHeight));
    r = w / 2;
    w = r + w / 2;
    var H = 0.3 * q - k / 2,
      y = 0.7 * q - k / 2;
    v ? (c.moveTo(r, H), c.lineTo(w, H), c.lineTo(w, H + k), c.lineTo(r, H + k), c.moveTo(r, y), c.lineTo(w, y), c.lineTo(w, y + k), c.lineTo(r, y + k)) : (c.moveTo(r, 0), c.lineTo(l, 0), c.lineTo(l, q), c.lineTo(r, q), c.lineTo(r, y + k), c.lineTo(0, y + k), c.lineTo(0, y), c.lineTo(r, y), c.lineTo(r, H + k), c.lineTo(0, H + k), c.lineTo(0, H), c.lineTo(r, H), c.close());
    c.end();
  };
  mxCellRenderer.registerShape('component', ta);
  mxUtils.extend(Ha, mxRectangleShape);
  Ha.prototype.paintForeground = function(c, k, r, l, q) {
    var v = l / 2,
      w = q / 2,
      H = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    c.begin();
    this.addPoints(c, [
      new mxPoint(k + v, r),
      new mxPoint(k + l, r + w),
      new mxPoint(k + v, r + q),
      new mxPoint(k, r + w)
    ], this.isRounded, H, !0);
    c.stroke();
    mxRectangleShape.prototype.paintForeground.apply(this, arguments);
  };
  mxCellRenderer.registerShape('associativeEntity', Ha);
  mxUtils.extend(Va, mxDoubleEllipse);
  Va.prototype.outerStroke = !0;
  Va.prototype.paintVertexShape = function(c, k, r, l, q) {
    var v = Math.min(4, Math.min(l / 5, q / 5));
    0 < l && 0 < q && (c.ellipse(k + v, r + v, l - 2 * v, q - 2 * v), c.fillAndStroke());
    c.setShadow(!1);
    this.outerStroke && (c.ellipse(k, r, l, q), c.stroke());
  };
  mxCellRenderer.registerShape('endState', Va);
  mxUtils.extend(fb, Va);
  fb.prototype.outerStroke = !1;
  mxCellRenderer.registerShape('startState', fb);
  mxUtils.extend(Ua, mxArrowConnector);
  Ua.prototype.defaultWidth = 4;
  Ua.prototype.isOpenEnded = function() {
    return !0;
  };
  Ua.prototype.getEdgeWidth = function() {
    return mxUtils.getNumber(this.style, 'width', this.defaultWidth) + Math.max(0, this.strokewidth - 1);
  };
  Ua.prototype.isArrowRounded = function() {
    return this.isRounded;
  };
  mxCellRenderer.registerShape('link', Ua);
  mxUtils.extend(bb, mxArrowConnector);
  bb.prototype.defaultWidth = 10;
  bb.prototype.defaultArrowWidth = 20;
  bb.prototype.getStartArrowWidth = function() {
    return this.getEdgeWidth() + mxUtils.getNumber(this.style, 'startWidth', this.defaultArrowWidth);
  };
  bb.prototype.getEndArrowWidth = function() {
    return this.getEdgeWidth() + mxUtils.getNumber(this.style, 'endWidth', this.defaultArrowWidth);
  };
  bb.prototype.getEdgeWidth = function() {
    return mxUtils.getNumber(this.style, 'width', this.defaultWidth) + Math.max(0, this.strokewidth - 1);
  };
  mxCellRenderer.registerShape('flexArrow', bb);
  mxUtils.extend($a, mxActor);
  $a.prototype.size = 30;
  $a.prototype.isRoundable = function() {
    return !0;
  };
  $a.prototype.redrawPath = function(c, k, r, l, q) {
    k = Math.min(q, parseFloat(mxUtils.getValue(this.style, 'size', this.size)));
    r = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(0, q),
      new mxPoint(0, k),
      new mxPoint(l, 0),
      new mxPoint(l, q)
    ], this.isRounded, r, !0);
    c.end();
  };
  mxCellRenderer.registerShape('manualInput', $a);
  mxUtils.extend(Wa, mxRectangleShape);
  Wa.prototype.dx = 20;
  Wa.prototype.dy = 20;
  Wa.prototype.isHtmlAllowed = function() {
    return !1;
  };
  Wa.prototype.paintForeground = function(c, k, r, l, q) {
    mxRectangleShape.prototype.paintForeground.apply(this, arguments);
    var v = 0;
    if (this.isRounded) {
      var w = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, 100 * mxConstants.RECTANGLE_ROUNDING_FACTOR) / 100;
      v = Math.max(v, Math.min(l * w, q * w));
    }
    w = Math.max(v, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
    v = Math.max(v, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
    c.begin();
    c.moveTo(k, r + v);
    c.lineTo(k + l, r + v);
    c.end();
    c.stroke();
    c.begin();
    c.moveTo(k + w, r);
    c.lineTo(k + w, r + q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('internalStorage', Wa);
  mxUtils.extend(ab, mxActor);
  ab.prototype.dx = 20;
  ab.prototype.dy = 20;
  ab.prototype.redrawPath = function(c, k, r, l, q) {
    k = Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
    r = Math.max(0, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
    parseFloat(mxUtils.getValue(this.style, 'size', this.size));
    var v = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(0, 0),
      new mxPoint(l, 0),
      new mxPoint(l, r),
      new mxPoint(k, r),
      new mxPoint(k, q),
      new mxPoint(0, q)
    ], this.isRounded, v, !0);
    c.end();
  };
  mxCellRenderer.registerShape('corner', ab);
  mxUtils.extend(lb, mxActor);
  lb.prototype.redrawPath = function(c, k, r, l, q) {
    c.moveTo(0, 0);
    c.lineTo(0, q);
    c.end();
    c.moveTo(l, 0);
    c.lineTo(l, q);
    c.end();
    c.moveTo(0, q / 2);
    c.lineTo(l, q / 2);
    c.end();
  };
  mxCellRenderer.registerShape('crossbar', lb);
  mxUtils.extend(db, mxActor);
  db.prototype.dx = 20;
  db.prototype.dy = 20;
  db.prototype.redrawPath = function(c, k, r, l, q) {
    k = Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
    r = Math.max(0, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
    parseFloat(mxUtils.getValue(this.style, 'size', this.size));
    var v = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(0, 0),
      new mxPoint(l, 0),
      new mxPoint(l, r),
      new mxPoint((l + k) / 2, r),
      new mxPoint((l + k) / 2, q),
      new mxPoint((l - k) / 2, q),
      new mxPoint((l - k) / 2, r),
      new mxPoint(0, r)
    ], this.isRounded, v, !0);
    c.end();
  };
  mxCellRenderer.registerShape('tee', db);
  mxUtils.extend(ea, mxActor);
  ea.prototype.arrowWidth = 0.3;
  ea.prototype.arrowSize = 0.2;
  ea.prototype.redrawPath = function(c, k, r, l, q) {
    var v = q * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowWidth', this.arrowWidth))));
    k = l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowSize', this.arrowSize))));
    r = (q - v) / 2;
    v = r + v;
    var w = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(0, r),
      new mxPoint(l - k, r),
      new mxPoint(l - k, 0),
      new mxPoint(l, q / 2),
      new mxPoint(l - k, q),
      new mxPoint(l - k, v),
      new mxPoint(0, v)
    ], this.isRounded, w, !0);
    c.end();
  };
  mxCellRenderer.registerShape('singleArrow', ea);
  mxUtils.extend(Ea, mxActor);
  Ea.prototype.redrawPath = function(c, k, r, l, q) {
    var v = q * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowWidth', ea.prototype.arrowWidth))));
    k = l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowSize', ea.prototype.arrowSize))));
    r = (q - v) / 2;
    v = r + v;
    var w = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(0, q / 2),
      new mxPoint(k, 0),
      new mxPoint(k, r),
      new mxPoint(l - k, r),
      new mxPoint(l - k, 0),
      new mxPoint(l, q / 2),
      new mxPoint(l - k, q),
      new mxPoint(l - k, v),
      new mxPoint(k, v),
      new mxPoint(k, q)
    ], this.isRounded, w, !0);
    c.end();
  };
  mxCellRenderer.registerShape('doubleArrow', Ea);
  mxUtils.extend(Fa, mxActor);
  Fa.prototype.size = 0.1;
  Fa.prototype.fixedSize = 20;
  Fa.prototype.redrawPath = function(c, k, r, l, q) {
    k = '0' != mxUtils.getValue(this.style, 'fixedSize', '0') ? Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) : l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    c.moveTo(k, 0);
    c.lineTo(l, 0);
    c.quadTo(l - 2 * k, q / 2, l, q);
    c.lineTo(k, q);
    c.quadTo(k - 2 * k, q / 2, k, 0);
    c.close();
    c.end();
  };
  mxCellRenderer.registerShape('dataStorage', Fa);
  mxUtils.extend(t, mxActor);
  t.prototype.redrawPath = function(c, k, r, l, q) {
    c.moveTo(0, 0);
    c.quadTo(l, 0, l, q / 2);
    c.quadTo(l, q, 0, q);
    c.close();
    c.end();
  };
  mxCellRenderer.registerShape('or', t);
  mxUtils.extend(z, mxActor);
  z.prototype.redrawPath = function(c, k, r, l, q) {
    c.moveTo(0, 0);
    c.quadTo(l, 0, l, q / 2);
    c.quadTo(l, q, 0, q);
    c.quadTo(l / 2, q / 2, 0, 0);
    c.close();
    c.end();
  };
  mxCellRenderer.registerShape('xor', z);
  mxUtils.extend(B, mxActor);
  B.prototype.size = 20;
  B.prototype.isRoundable = function() {
    return !0;
  };
  B.prototype.redrawPath = function(c, k, r, l, q) {
    k = Math.min(l / 2, Math.min(q, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    r = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(k, 0),
      new mxPoint(l - k, 0),
      new mxPoint(l, 0.8 * k),
      new mxPoint(l, q),
      new mxPoint(0, q),
      new mxPoint(0, 0.8 * k)
    ], this.isRounded, r, !0);
    c.end();
  };
  mxCellRenderer.registerShape('loopLimit', B);
  mxUtils.extend(E, mxActor);
  E.prototype.size = 0.375;
  E.prototype.isRoundable = function() {
    return !0;
  };
  E.prototype.redrawPath = function(c, k, r, l, q) {
    k = q * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    r = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [
      new mxPoint(0, 0),
      new mxPoint(l, 0),
      new mxPoint(l, q - k),
      new mxPoint(l / 2, q),
      new mxPoint(0, q - k)
    ], this.isRounded, r, !0);
    c.end();
  };
  mxCellRenderer.registerShape('offPageConnector', E);
  mxUtils.extend(J, mxEllipse);
  J.prototype.paintVertexShape = function(c, k, r, l, q) {
    mxEllipse.prototype.paintVertexShape.apply(this, arguments);
    c.begin();
    c.moveTo(k + l / 2, r + q);
    c.lineTo(k + l, r + q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('tapeData', J);
  mxUtils.extend(M, mxEllipse);
  M.prototype.paintVertexShape = function(c, k, r, l, q) {
    mxEllipse.prototype.paintVertexShape.apply(this, arguments);
    c.setShadow(!1);
    c.begin();
    c.moveTo(k, r + q / 2);
    c.lineTo(k + l, r + q / 2);
    c.end();
    c.stroke();
    c.begin();
    c.moveTo(k + l / 2, r);
    c.lineTo(k + l / 2, r + q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('orEllipse', M);
  mxUtils.extend(W, mxEllipse);
  W.prototype.paintVertexShape = function(c, k, r, l, q) {
    mxEllipse.prototype.paintVertexShape.apply(this, arguments);
    c.setShadow(!1);
    c.begin();
    c.moveTo(k + 0.145 * l, r + 0.145 * q);
    c.lineTo(k + 0.855 * l, r + 0.855 * q);
    c.end();
    c.stroke();
    c.begin();
    c.moveTo(k + 0.855 * l, r + 0.145 * q);
    c.lineTo(k + 0.145 * l, r + 0.855 * q);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('sumEllipse', W);
  mxUtils.extend(ha, mxRhombus);
  ha.prototype.paintVertexShape = function(c, k, r, l, q) {
    mxRhombus.prototype.paintVertexShape.apply(this, arguments);
    c.setShadow(!1);
    c.begin();
    c.moveTo(k, r + q / 2);
    c.lineTo(k + l, r + q / 2);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('sortShape', ha);
  mxUtils.extend(da, mxEllipse);
  da.prototype.paintVertexShape = function(c, k, r, l, q) {
    c.begin();
    c.moveTo(k, r);
    c.lineTo(k + l, r);
    c.lineTo(k + l / 2, r + q / 2);
    c.close();
    c.fillAndStroke();
    c.begin();
    c.moveTo(k, r + q);
    c.lineTo(k + l, r + q);
    c.lineTo(k + l / 2, r + q / 2);
    c.close();
    c.fillAndStroke();
  };
  mxCellRenderer.registerShape('collate', da);
  mxUtils.extend(fa, mxEllipse);
  fa.prototype.paintVertexShape = function(c, k, r, l, q) {
    var v = c.state.strokeWidth / 2,
      w = 10 + 2 * v,
      H = r + q - w / 2;
    c.begin();
    c.moveTo(k, r);
    c.lineTo(k, r + q);
    c.moveTo(k + v, H);
    c.lineTo(k + v + w, H - w / 2);
    c.moveTo(k + v, H);
    c.lineTo(k + v + w, H + w / 2);
    c.moveTo(k + v, H);
    c.lineTo(k + l - v, H);
    c.moveTo(k + l, r);
    c.lineTo(k + l, r + q);
    c.moveTo(k + l - v, H);
    c.lineTo(k + l - w - v, H - w / 2);
    c.moveTo(k + l - v, H);
    c.lineTo(k + l - w - v, H + w / 2);
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('dimension', fa);
  mxUtils.extend(sa, mxEllipse);
  sa.prototype.drawHidden = !0;
  sa.prototype.paintVertexShape = function(c, k, r, l, q) {
    this.outline || c.setStrokeColor(null);
    if (null != this.style) {
      var v = c.pointerEvents,
        w = null != this.fill && this.fill != mxConstants.NONE;
      '1' == mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1') || w || (c.pointerEvents = !1);
      var H = '1' == mxUtils.getValue(this.style, 'top', '1'),
        y = '1' == mxUtils.getValue(this.style, 'left', '1'),
        aa = '1' == mxUtils.getValue(this.style, 'right', '1'),
        O = '1' == mxUtils.getValue(this.style, 'bottom', '1');
      this.drawHidden || w || this.outline || H || aa || O || y ? (c.rect(k, r, l, q), c.fill(), c.pointerEvents = v, c.setStrokeColor(this.stroke), c.setLineCap('square'), c.begin(), c.moveTo(k, r), this.outline || H ? c.lineTo(k + l, r) : c.moveTo(k + l, r), this.outline || aa ? c.lineTo(k + l, r + q) : c.moveTo(k + l, r + q), this.outline || O ? c.lineTo(k, r + q) : c.moveTo(k, r + q), (this.outline || y) && c.lineTo(k, r), c.end(), c.stroke(), c.setLineCap('flat')) : c.setStrokeColor(this.stroke);
    }
  };
  mxCellRenderer.registerShape('partialRectangle', sa);
  mxUtils.extend(Ja, mxEllipse);
  Ja.prototype.paintVertexShape = function(c, k, r, l, q) {
    mxEllipse.prototype.paintVertexShape.apply(this, arguments);
    c.setShadow(!1);
    c.begin();
    'vertical' == mxUtils.getValue(this.style, 'line') ? (c.moveTo(k + l / 2, r), c.lineTo(k + l / 2, r + q)) : (c.moveTo(k, r + q / 2), c.lineTo(k + l, r + q / 2));
    c.end();
    c.stroke();
  };
  mxCellRenderer.registerShape('lineEllipse', Ja);
  mxUtils.extend(Na, mxActor);
  Na.prototype.redrawPath = function(c, k, r, l, q) {
    k = Math.min(l, q / 2);
    c.moveTo(0, 0);
    c.lineTo(l - k, 0);
    c.quadTo(l, 0, l, q / 2);
    c.quadTo(l, q, l - k, q);
    c.lineTo(0, q);
    c.close();
    c.end();
  };
  mxCellRenderer.registerShape('delay', Na);
  mxUtils.extend(Ma, mxActor);
  Ma.prototype.size = 0.2;
  Ma.prototype.redrawPath = function(c, k, r, l, q) {
    k = Math.min(q, l);
    var v = Math.max(0, Math.min(k, k * parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    k = (q - v) / 2;
    r = k + v;
    var w = (l - v) / 2;
    v = w + v;
    c.moveTo(0, k);
    c.lineTo(w, k);
    c.lineTo(w, 0);
    c.lineTo(v, 0);
    c.lineTo(v, k);
    c.lineTo(l, k);
    c.lineTo(l, r);
    c.lineTo(v, r);
    c.lineTo(v, q);
    c.lineTo(w, q);
    c.lineTo(w, r);
    c.lineTo(0, r);
    c.close();
    c.end();
  };
  mxCellRenderer.registerShape('cross', Ma);
  mxUtils.extend(Ka, mxActor);
  Ka.prototype.size = 0.25;
  Ka.prototype.redrawPath = function(c, k, r, l, q) {
    k = Math.min(l, q / 2);
    r = Math.min(l - k, Math.max(0, parseFloat(mxUtils.getValue(this.style, 'size', this.size))) * l);
    c.moveTo(0, q / 2);
    c.lineTo(r, 0);
    c.lineTo(l - k, 0);
    c.quadTo(l, 0, l, q / 2);
    c.quadTo(l, q, l - k, q);
    c.lineTo(r, q);
    c.close();
    c.end();
  };
  mxCellRenderer.registerShape('display', Ka);
  mxUtils.extend(va, mxActor);
  va.prototype.cst = {
    RECT2: 'mxgraph.basic.rect'
  };
  va.prototype.customProperties = [{
      name: 'rectStyle',
      dispName: 'Style',
      type: 'enum',
      defVal: 'square',
      enumList: [{
          val: 'square',
          dispName: 'Square'
        },
        {
          val: 'rounded',
          dispName: 'Round'
        },
        {
          val: 'snip',
          dispName: 'Snip'
        },
        {
          val: 'invRound',
          dispName: 'Inv. Round'
        },
        {
          val: 'fold',
          dispName: 'Fold'
        }
      ]
    },
    {
      name: 'size',
      dispName: 'Corner Size',
      type: 'float',
      defVal: 10
    },
    {
      name: 'absoluteCornerSize',
      dispName: 'Abs. Corner Size',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'indent',
      dispName: 'Indent',
      type: 'float',
      defVal: 2
    },
    {
      name: 'rectOutline',
      dispName: 'Outline',
      type: 'enum',
      defVal: 'single',
      enumList: [{
          val: 'single',
          dispName: 'Single'
        },
        {
          val: 'double',
          dispName: 'Double'
        },
        {
          val: 'frame',
          dispName: 'Frame'
        }
      ]
    },
    {
      name: 'fillColor2',
      dispName: 'Inside Fill Color',
      type: 'color',
      defVal: 'none'
    },
    {
      name: 'gradientColor2',
      dispName: 'Inside Gradient Color',
      type: 'color',
      defVal: 'none'
    },
    {
      name: 'gradientDirection2',
      dispName: 'Inside Gradient Direction',
      type: 'enum',
      defVal: 'south',
      enumList: [{
          val: 'south',
          dispName: 'South'
        },
        {
          val: 'west',
          dispName: 'West'
        },
        {
          val: 'north',
          dispName: 'North'
        },
        {
          val: 'east',
          dispName: 'East'
        }
      ]
    },
    {
      name: 'top',
      dispName: 'Top Line',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'right',
      dispName: 'Right',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'bottom',
      dispName: 'Bottom Line',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'left',
      dispName: 'Left ',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'topLeftStyle',
      dispName: 'Top Left Style',
      type: 'enum',
      defVal: 'default',
      enumList: [{
          val: 'default',
          dispName: 'Default'
        },
        {
          val: 'square',
          dispName: 'Square'
        },
        {
          val: 'rounded',
          dispName: 'Round'
        },
        {
          val: 'snip',
          dispName: 'Snip'
        },
        {
          val: 'invRound',
          dispName: 'Inv. Round'
        },
        {
          val: 'fold',
          dispName: 'Fold'
        }
      ]
    },
    {
      name: 'topRightStyle',
      dispName: 'Top Right Style',
      type: 'enum',
      defVal: 'default',
      enumList: [{
          val: 'default',
          dispName: 'Default'
        },
        {
          val: 'square',
          dispName: 'Square'
        },
        {
          val: 'rounded',
          dispName: 'Round'
        },
        {
          val: 'snip',
          dispName: 'Snip'
        },
        {
          val: 'invRound',
          dispName: 'Inv. Round'
        },
        {
          val: 'fold',
          dispName: 'Fold'
        }
      ]
    },
    {
      name: 'bottomRightStyle',
      dispName: 'Bottom Right Style',
      type: 'enum',
      defVal: 'default',
      enumList: [{
          val: 'default',
          dispName: 'Default'
        },
        {
          val: 'square',
          dispName: 'Square'
        },
        {
          val: 'rounded',
          dispName: 'Round'
        },
        {
          val: 'snip',
          dispName: 'Snip'
        },
        {
          val: 'invRound',
          dispName: 'Inv. Round'
        },
        {
          val: 'fold',
          dispName: 'Fold'
        }
      ]
    },
    {
      name: 'bottomLeftStyle',
      dispName: 'Bottom Left Style',
      type: 'enum',
      defVal: 'default',
      enumList: [{
          val: 'default',
          dispName: 'Default'
        },
        {
          val: 'square',
          dispName: 'Square'
        },
        {
          val: 'rounded',
          dispName: 'Round'
        },
        {
          val: 'snip',
          dispName: 'Snip'
        },
        {
          val: 'invRound',
          dispName: 'Inv. Round'
        },
        {
          val: 'fold',
          dispName: 'Fold'
        }
      ]
    }
  ];
  va.prototype.paintVertexShape = function(c, k, r, l, q) {
    c.translate(k, r);
    this.strictDrawShape(c, 0, 0, l, q);
  };
  va.prototype.strictDrawShape = function(c, k, r, l, q, v) {
    var w = v && v.rectStyle ? v.rectStyle : mxUtils.getValue(this.style, 'rectStyle', this.rectStyle),
      H = v && v.absoluteCornerSize ? v.absoluteCornerSize : mxUtils.getValue(this.style, 'absoluteCornerSize', this.absoluteCornerSize),
      y = v && v.size ? v.size : Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))),
      aa = v && v.rectOutline ? v.rectOutline : mxUtils.getValue(this.style, 'rectOutline', this.rectOutline),
      O = v && v.indent ? v.indent : Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, 'indent', this.indent)))),
      Da = v && v.dashed ? v.dashed : mxUtils.getValue(this.style, 'dashed', !1),
      Qa = v && v.dashPattern ? v.dashPattern : mxUtils.getValue(this.style, 'dashPattern', null),
      La = v && v.relIndent ? v.relIndent : Math.max(0, Math.min(50, O)),
      na = v && v.top ? v.top : mxUtils.getValue(this.style, 'top', !0),
      qa = v && v.right ? v.right : mxUtils.getValue(this.style, 'right', !0),
      pa = v && v.bottom ? v.bottom : mxUtils.getValue(this.style, 'bottom', !0),
      oa = v && v.left ? v.left : mxUtils.getValue(this.style, 'left', !0),
      xa = v && v.topLeftStyle ? v.topLeftStyle : mxUtils.getValue(this.style, 'topLeftStyle', 'default'),
      za = v && v.topRightStyle ? v.topRightStyle : mxUtils.getValue(this.style, 'topRightStyle', 'default'),
      Aa = v && v.bottomRightStyle ? v.bottomRightStyle : mxUtils.getValue(this.style, 'bottomRightStyle', 'default'),
      Ba = v && v.bottomLeftStyle ? v.bottomLeftStyle : mxUtils.getValue(this.style, 'bottomLeftStyle', 'default'),
      Ab = v && v.fillColor ? v.fillColor : mxUtils.getValue(this.style, 'fillColor', '#ffffff');
    v && v.strokeColor || mxUtils.getValue(this.style, 'strokeColor', '#000000');
    var Bb = v && v.strokeWidth ? v.strokeWidth : mxUtils.getValue(this.style, 'strokeWidth', '1'),
      xb = v && v.fillColor2 ? v.fillColor2 : mxUtils.getValue(this.style, 'fillColor2', 'none'),
      zb = v && v.gradientColor2 ? v.gradientColor2 : mxUtils.getValue(this.style, 'gradientColor2', 'none'),
      Cb = v && v.gradientDirection2 ? v.gradientDirection2 : mxUtils.getValue(this.style, 'gradientDirection2', 'south'),
      Db = v && v.opacity ? v.opacity : mxUtils.getValue(this.style, 'opacity', '100'),
      Eb = Math.max(0, Math.min(50, y));
    v = va.prototype;
    c.setDashed(Da);
    Qa && '' != Qa && c.setDashPattern(Qa);
    c.setStrokeWidth(Bb);
    y = Math.min(0.5 * q, 0.5 * l, y);
    H || (y = Eb * Math.min(l, q) / 100);
    y = Math.min(y, 0.5 * Math.min(l, q));
    H || (O = Math.min(La * Math.min(l, q) / 100));
    O = Math.min(O, 0.5 * Math.min(l, q) - y);
    (na || qa || pa || oa) && 'frame' != aa && (c.begin(), na ? v.moveNW(c, k, r, l, q, w, xa, y, oa) : c.moveTo(0, 0), na && v.paintNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), qa && v.paintNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), pa && v.paintSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), oa && v.paintSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), c.close(), c.fill(), c.setShadow(!1), c.setFillColor(xb), Da = H = Db, 'none' == xb && (H = 0), 'none' == zb && (Da = 0), c.setGradient(xb, zb, 0, 0, l, q, Cb, H, Da), c.begin(), na ? v.moveNWInner(c, k, r, l, q, w, xa, y, O, na, oa) : c.moveTo(O, 0), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), oa && pa && v.paintSWInner(c, k, r, l, q, w, Ba, y, O, pa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), pa && qa && v.paintSEInner(c, k, r, l, q, w, Aa, y, O), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), qa && na && v.paintNEInner(c, k, r, l, q, w, za, y, O), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), na && oa && v.paintNWInner(c, k, r, l, q, w, xa, y, O), c.fill(), 'none' == Ab && (c.begin(), v.paintFolds(c, k, r, l, q, w, xa, za, Aa, Ba, y, na, qa, pa, oa), c.stroke()));
    na || qa || pa || !oa ? na || qa || !pa || oa ? !na && !qa && pa && oa ? 'frame' != aa ? (c.begin(), v.moveSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.paintSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), 'double' == aa && (v.moveNWInner(c, k, r, l, q, w, xa, y, O, na, oa), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), v.paintSWInner(c, k, r, l, q, w, Ba, y, O, pa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa)), c.stroke()) : (c.begin(), v.moveSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.paintSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.lineNWInner(c, k, r, l, q, w, xa, y, O, na, oa), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), v.paintSWInner(c, k, r, l, q, w, Ba, y, O, pa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), c.close(), c.fillAndStroke()) : na || !qa || pa || oa ? !na && qa && !pa && oa ? 'frame' != aa ? (c.begin(), v.moveSW(c, k, r, l, q, w, xa, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), 'double' == aa && (v.moveNWInner(c, k, r, l, q, w, xa, y, O, na, oa), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa)), c.stroke(), c.begin(), v.moveNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), 'double' == aa && (v.moveSEInner(c, k, r, l, q, w, Aa, y, O, pa), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa)), c.stroke()) : (c.begin(), v.moveSW(c, k, r, l, q, w, xa, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.lineNWInner(c, k, r, l, q, w, xa, y, O, na, oa), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), c.close(), c.fillAndStroke(), c.begin(), v.moveNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.lineSEInner(c, k, r, l, q, w, Aa, y, O, pa), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), c.close(), c.fillAndStroke()) : !na && qa && pa && !oa ? 'frame' != aa ? (c.begin(), v.moveNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.paintSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), 'double' == aa && (v.moveSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), v.paintSEInner(c, k, r, l, q, w, Aa, y, O), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa)), c.stroke()) : (c.begin(), v.moveNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.paintSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.lineSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), v.paintSEInner(c, k, r, l, q, w, Aa, y, O), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), c.close(), c.fillAndStroke()) : !na && qa && pa && oa ? 'frame' != aa ? (c.begin(), v.moveNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.paintSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.paintSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), 'double' == aa && (v.moveNWInner(c, k, r, l, q, w, xa, y, O, na, oa), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), v.paintSWInner(c, k, r, l, q, w, Ba, y, O, pa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), v.paintSEInner(c, k, r, l, q, w, Aa, y, O), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa)), c.stroke()) : (c.begin(), v.moveNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.paintSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.paintSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.lineNWInner(c, k, r, l, q, w, xa, y, O, na, oa), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), v.paintSWInner(c, k, r, l, q, w, Ba, y, O, pa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), v.paintSEInner(c, k, r, l, q, w, Aa, y, O), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), c.close(), c.fillAndStroke()) : !na || qa || pa || oa ? na && !qa && !pa && oa ? 'frame' != aa ? (c.begin(), v.moveSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.paintNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), 'double' == aa && (v.moveNEInner(c, k, r, l, q, w, za, y, O, qa), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), v.paintNWInner(c, k, r, l, q, w, xa, y, O), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa)), c.stroke()) : (c.begin(), v.moveSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.paintNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.lineNEInner(c, k, r, l, q, w, za, y, O, qa), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), v.paintNWInner(c, k, r, l, q, w, xa, y, O), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), c.close(), c.fillAndStroke()) : na && !qa && pa && !oa ? 'frame' != aa ? (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), 'double' == aa && (v.moveNEInner(c, k, r, l, q, w, za, y, O, qa), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na)), c.stroke(), c.begin(), v.moveSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), 'double' == aa && (v.moveSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa)), c.stroke()) : (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.lineNEInner(c, k, r, l, q, w, za, y, O, qa), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), c.close(), c.fillAndStroke(), c.begin(), v.moveSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.lineSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), c.close(), c.fillAndStroke()) : na && !qa && pa && oa ? 'frame' != aa ? (c.begin(), v.moveSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.paintSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.paintNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), 'double' == aa && (v.moveNEInner(c, k, r, l, q, w, za, y, O, qa), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), v.paintNWInner(c, k, r, l, q, w, xa, y, O), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), v.paintSWInner(c, k, r, l, q, w, Ba, y, O, pa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa)), c.stroke()) : (c.begin(), v.moveSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.paintSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.paintNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.lineNEInner(c, k, r, l, q, w, za, y, O, qa), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), v.paintNWInner(c, k, r, l, q, w, xa, y, O), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), v.paintSWInner(c, k, r, l, q, w, Ba, y, O, pa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), c.close(), c.fillAndStroke()) : na && qa && !pa && !oa ? 'frame' != aa ? (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.paintNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), 'double' == aa && (v.moveSEInner(c, k, r, l, q, w, Aa, y, O, pa), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), v.paintNEInner(c, k, r, l, q, w, za, y, O), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na)), c.stroke()) : (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.paintNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.lineSEInner(c, k, r, l, q, w, Aa, y, O, pa), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), v.paintNEInner(c, k, r, l, q, w, za, y, O), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), c.close(), c.fillAndStroke()) : na && qa && !pa && oa ? 'frame' != aa ? (c.begin(), v.moveSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.paintNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.paintNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), 'double' == aa && (v.moveSEInner(c, k, r, l, q, w, Aa, y, O, pa), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), v.paintNEInner(c, k, r, l, q, w, za, y, O), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), v.paintNWInner(c, k, r, l, q, w, xa, y, O), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa)), c.stroke()) : (c.begin(), v.moveSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.paintNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.paintNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.lineSEInner(c, k, r, l, q, w, Aa, y, O, pa), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), v.paintNEInner(c, k, r, l, q, w, za, y, O), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), v.paintNWInner(c, k, r, l, q, w, xa, y, O), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), c.close(), c.fillAndStroke()) : na && qa && pa && !oa ? 'frame' != aa ? (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.paintNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.paintSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), 'double' == aa && (v.moveSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), v.paintSEInner(c, k, r, l, q, w, Aa, y, O), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), v.paintNEInner(c, k, r, l, q, w, za, y, O), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na)), c.stroke()) : (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.paintNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.paintSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.lineSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), v.paintSEInner(c, k, r, l, q, w, Aa, y, O), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), v.paintNEInner(c, k, r, l, q, w, za, y, O), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), c.close(), c.fillAndStroke()) : na && qa && pa && oa && ('frame' != aa ? (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.paintNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.paintSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.paintSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), c.close(), 'double' == aa && (v.moveSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintSWInner(c, k, r, l, q, w, Ba, y, O, pa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), v.paintSEInner(c, k, r, l, q, w, Aa, y, O), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), v.paintNEInner(c, k, r, l, q, w, za, y, O), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), v.paintNWInner(c, k, r, l, q, w, xa, y, O), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), c.close()), c.stroke()) : (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.paintNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.paintSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.paintSW(c, k, r, l, q, w, Ba, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), c.close(), v.moveSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintSWInner(c, k, r, l, q, w, Ba, y, O, pa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), v.paintSEInner(c, k, r, l, q, w, Aa, y, O), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), v.paintNEInner(c, k, r, l, q, w, za, y, O), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), v.paintNWInner(c, k, r, l, q, w, xa, y, O), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), c.close(), c.fillAndStroke())) : 'frame' != aa ? (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), 'double' == aa && (v.moveNEInner(c, k, r, l, q, w, za, y, O, qa), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na)), c.stroke()) : (c.begin(), v.moveNW(c, k, r, l, q, w, xa, y, oa), v.paintTop(c, k, r, l, q, w, za, y, qa), v.lineNEInner(c, k, r, l, q, w, za, y, O, qa), v.paintTopInner(c, k, r, l, q, w, xa, y, O, oa, na), c.close(), c.fillAndStroke()) : 'frame' != aa ? (c.begin(), v.moveNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), 'double' == aa && (v.moveSEInner(c, k, r, l, q, w, Aa, y, O, pa), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa)), c.stroke()) : (c.begin(), v.moveNE(c, k, r, l, q, w, za, y, na), v.paintRight(c, k, r, l, q, w, Aa, y, pa), v.lineSEInner(c, k, r, l, q, w, Aa, y, O, pa), v.paintRightInner(c, k, r, l, q, w, za, y, O, na, qa), c.close(), c.fillAndStroke()) : 'frame' != aa ? (c.begin(), v.moveSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), 'double' == aa && (v.moveSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa)), c.stroke()) : (c.begin(), v.moveSE(c, k, r, l, q, w, Aa, y, qa), v.paintBottom(c, k, r, l, q, w, Ba, y, oa), v.lineSWInner(c, k, r, l, q, w, Ba, y, O, oa), v.paintBottomInner(c, k, r, l, q, w, Aa, y, O, qa, pa), c.close(), c.fillAndStroke()) : 'frame' != aa ? (c.begin(), v.moveSW(c, k, r, l, q, w, xa, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), 'double' == aa && (v.moveNWInner(c, k, r, l, q, w, xa, y, O, na, oa), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa)), c.stroke()) : (c.begin(), v.moveSW(c, k, r, l, q, w, xa, y, pa), v.paintLeft(c, k, r, l, q, w, xa, y, na), v.lineNWInner(c, k, r, l, q, w, xa, y, O, na, oa), v.paintLeftInner(c, k, r, l, q, w, Ba, y, O, pa, oa), c.close(), c.fillAndStroke());
    c.begin();
    v.paintFolds(c, k, r, l, q, w, xa, za, Aa, Ba, y, na, qa, pa, oa);
    c.stroke();
  };
  va.prototype.moveNW = function(c, k, r, l, q, v, w, H, y) {
    'square' == w || 'default' == w && 'square' == v || !y ? c.moveTo(0, 0) : c.moveTo(0, H);
  };
  va.prototype.moveNE = function(c, k, r, l, q, v, w, H, y) {
    'square' == w || 'default' == w && 'square' == v || !y ? c.moveTo(l, 0) : c.moveTo(l - H, 0);
  };
  va.prototype.moveSE = function(c, k, r, l, q, v, w, H, y) {
    'square' == w || 'default' == w && 'square' == v || !y ? c.moveTo(l, q) : c.moveTo(l, q - H);
  };
  va.prototype.moveSW = function(c, k, r, l, q, v, w, H, y) {
    'square' == w || 'default' == w && 'square' == v || !y ? c.moveTo(0, q) : c.moveTo(H, q);
  };
  va.prototype.paintNW = function(c, k, r, l, q, v, w, H, y) {
    if (y)
      if ('rounded' == w || 'default' == w && 'rounded' == v || 'invRound' == w || 'default' == w && 'invRound' == v) {
        k = 0;
        if ('rounded' == w || 'default' == w && 'rounded' == v)
          k = 1;
        c.arcTo(H, H, 0, 0, k, H, 0);
      } else
        ('snip' == w || 'default' == w && 'snip' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.lineTo(H, 0);
    else
      c.lineTo(0, 0);
  };
  va.prototype.paintTop = function(c, k, r, l, q, v, w, H, y) {
    'square' == w || 'default' == w && 'square' == v || !y ? c.lineTo(l, 0) : c.lineTo(l - H, 0);
  };
  va.prototype.paintNE = function(c, k, r, l, q, v, w, H, y) {
    if (y)
      if ('rounded' == w || 'default' == w && 'rounded' == v || 'invRound' == w || 'default' == w && 'invRound' == v) {
        k = 0;
        if ('rounded' == w || 'default' == w && 'rounded' == v)
          k = 1;
        c.arcTo(H, H, 0, 0, k, l, H);
      } else
        ('snip' == w || 'default' == w && 'snip' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.lineTo(l, H);
    else
      c.lineTo(l, 0);
  };
  va.prototype.paintRight = function(c, k, r, l, q, v, w, H, y) {
    'square' == w || 'default' == w && 'square' == v || !y ? c.lineTo(l, q) : c.lineTo(l, q - H);
  };
  va.prototype.paintLeft = function(c, k, r, l, q, v, w, H, y) {
    'square' == w || 'default' == w && 'square' == v || !y ? c.lineTo(0, 0) : c.lineTo(0, H);
  };
  va.prototype.paintSE = function(c, k, r, l, q, v, w, H, y) {
    if (y)
      if ('rounded' == w || 'default' == w && 'rounded' == v || 'invRound' == w || 'default' == w && 'invRound' == v) {
        k = 0;
        if ('rounded' == w || 'default' == w && 'rounded' == v)
          k = 1;
        c.arcTo(H, H, 0, 0, k, l - H, q);
      } else
        ('snip' == w || 'default' == w && 'snip' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.lineTo(l - H, q);
    else
      c.lineTo(l, q);
  };
  va.prototype.paintBottom = function(c, k, r, l, q, v, w, H, y) {
    'square' == w || 'default' == w && 'square' == v || !y ? c.lineTo(0, q) : c.lineTo(H, q);
  };
  va.prototype.paintSW = function(c, k, r, l, q, v, w, H, y) {
    if (y)
      if ('rounded' == w || 'default' == w && 'rounded' == v || 'invRound' == w || 'default' == w && 'invRound' == v) {
        k = 0;
        if ('rounded' == w || 'default' == w && 'rounded' == v)
          k = 1;
        c.arcTo(H, H, 0, 0, k, 0, q - H);
      } else
        ('snip' == w || 'default' == w && 'snip' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.lineTo(0, q - H);
    else
      c.lineTo(0, q);
  };
  va.prototype.paintNWInner = function(c, k, r, l, q, v, w, H, y) {
    if ('rounded' == w || 'default' == w && 'rounded' == v)
      c.arcTo(H - 0.5 * y, H - 0.5 * y, 0, 0, 0, y, 0.5 * y + H);
    else if ('invRound' == w || 'default' == w && 'invRound' == v)
      c.arcTo(H + y, H + y, 0, 0, 1, y, y + H);
    else if ('snip' == w || 'default' == w && 'snip' == v)
      c.lineTo(y, 0.5 * y + H);
    else if ('fold' == w || 'default' == w && 'fold' == v)
      c.lineTo(y + H, y + H), c.lineTo(y, y + H);
  };
  va.prototype.paintTopInner = function(c, k, r, l, q, v, w, H, y, aa, O) {
    aa || O ? !aa && O ? c.lineTo(0, y) : aa && !O ? c.lineTo(y, 0) : aa ? 'square' == w || 'default' == w && 'square' == v ? c.lineTo(y, y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.lineTo(H + 0.5 * y, y) : c.lineTo(H + y, y) : c.lineTo(0, y) : c.lineTo(0, 0);
  };
  va.prototype.paintNEInner = function(c, k, r, l, q, v, w, H, y) {
    if ('rounded' == w || 'default' == w && 'rounded' == v)
      c.arcTo(H - 0.5 * y, H - 0.5 * y, 0, 0, 0, l - H - 0.5 * y, y);
    else if ('invRound' == w || 'default' == w && 'invRound' == v)
      c.arcTo(H + y, H + y, 0, 0, 1, l - H - y, y);
    else if ('snip' == w || 'default' == w && 'snip' == v)
      c.lineTo(l - H - 0.5 * y, y);
    else if ('fold' == w || 'default' == w && 'fold' == v)
      c.lineTo(l - H - y, H + y), c.lineTo(l - H - y, y);
  };
  va.prototype.paintRightInner = function(c, k, r, l, q, v, w, H, y, aa, O) {
    aa || O ? !aa && O ? c.lineTo(l - y, 0) : aa && !O ? c.lineTo(l, y) : aa ? 'square' == w || 'default' == w && 'square' == v ? c.lineTo(l - y, y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.lineTo(l - y, H + 0.5 * y) : c.lineTo(l - y, H + y) : c.lineTo(l - y, 0) : c.lineTo(l, 0);
  };
  va.prototype.paintLeftInner = function(c, k, r, l, q, v, w, H, y, aa, O) {
    aa || O ? !aa && O ? c.lineTo(y, q) : aa && !O ? c.lineTo(0, q - y) : aa ? 'square' == w || 'default' == w && 'square' == v ? c.lineTo(y, q - y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.lineTo(y, q - H - 0.5 * y) : c.lineTo(y, q - H - y) : c.lineTo(y, q) : c.lineTo(0, q);
  };
  va.prototype.paintSEInner = function(c, k, r, l, q, v, w, H, y) {
    if ('rounded' == w || 'default' == w && 'rounded' == v)
      c.arcTo(H - 0.5 * y, H - 0.5 * y, 0, 0, 0, l - y, q - H - 0.5 * y);
    else if ('invRound' == w || 'default' == w && 'invRound' == v)
      c.arcTo(H + y, H + y, 0, 0, 1, l - y, q - H - y);
    else if ('snip' == w || 'default' == w && 'snip' == v)
      c.lineTo(l - y, q - H - 0.5 * y);
    else if ('fold' == w || 'default' == w && 'fold' == v)
      c.lineTo(l - H - y, q - H - y), c.lineTo(l - y, q - H - y);
  };
  va.prototype.paintBottomInner = function(c, k, r, l, q, v, w, H, y, aa, O) {
    aa || O ? !aa && O ? c.lineTo(l, q - y) : aa && !O ? c.lineTo(l - y, q) : 'square' == w || 'default' == w && 'square' == v || !aa ? c.lineTo(l - y, q - y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.lineTo(l - H - 0.5 * y, q - y) : c.lineTo(l - H - y, q - y) : c.lineTo(l, q);
  };
  va.prototype.paintSWInner = function(c, k, r, l, q, v, w, H, y, aa) {
    if (!aa)
      c.lineTo(y, q);
    else if ('square' == w || 'default' == w && 'square' == v)
      c.lineTo(y, q - y);
    else if ('rounded' == w || 'default' == w && 'rounded' == v)
      c.arcTo(H - 0.5 * y, H - 0.5 * y, 0, 0, 0, H + 0.5 * y, q - y);
    else if ('invRound' == w || 'default' == w && 'invRound' == v)
      c.arcTo(H + y, H + y, 0, 0, 1, H + y, q - y);
    else if ('snip' == w || 'default' == w && 'snip' == v)
      c.lineTo(H + 0.5 * y, q - y);
    else if ('fold' == w || 'default' == w && 'fold' == v)
      c.lineTo(y + H, q - H - y), c.lineTo(y + H, q - y);
  };
  va.prototype.moveSWInner = function(c, k, r, l, q, v, w, H, y, aa) {
    aa ? 'square' == w || 'default' == w && 'square' == v ? c.moveTo(y, q - y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.moveTo(y, q - H - 0.5 * y) : ('invRound' == w || 'default' == w && 'invRound' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.moveTo(y, q - H - y) : c.moveTo(0, q - y);
  };
  va.prototype.lineSWInner = function(c, k, r, l, q, v, w, H, y, aa) {
    aa ? 'square' == w || 'default' == w && 'square' == v ? c.lineTo(y, q - y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.lineTo(y, q - H - 0.5 * y) : ('invRound' == w || 'default' == w && 'invRound' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.lineTo(y, q - H - y) : c.lineTo(0, q - y);
  };
  va.prototype.moveSEInner = function(c, k, r, l, q, v, w, H, y, aa) {
    aa ? 'square' == w || 'default' == w && 'square' == v ? c.moveTo(l - y, q - y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.moveTo(l - y, q - H - 0.5 * y) : ('invRound' == w || 'default' == w && 'invRound' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.moveTo(l - y, q - H - y) : c.moveTo(l - y, q);
  };
  va.prototype.lineSEInner = function(c, k, r, l, q, v, w, H, y, aa) {
    aa ? 'square' == w || 'default' == w && 'square' == v ? c.lineTo(l - y, q - y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.lineTo(l - y, q - H - 0.5 * y) : ('invRound' == w || 'default' == w && 'invRound' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.lineTo(l - y, q - H - y) : c.lineTo(l - y, q);
  };
  va.prototype.moveNEInner = function(c, k, r, l, q, v, w, H, y, aa) {
    aa ? 'square' == w || 'default' == w && 'square' == v || aa ? c.moveTo(l - y, y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.moveTo(l - y, H + 0.5 * y) : ('invRound' == w || 'default' == w && 'invRound' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.moveTo(l - y, H + y) : c.moveTo(l, y);
  };
  va.prototype.lineNEInner = function(c, k, r, l, q, v, w, H, y, aa) {
    aa ? 'square' == w || 'default' == w && 'square' == v || aa ? c.lineTo(l - y, y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.lineTo(l - y, H + 0.5 * y) : ('invRound' == w || 'default' == w && 'invRound' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.lineTo(l - y, H + y) : c.lineTo(l, y);
  };
  va.prototype.moveNWInner = function(c, k, r, l, q, v, w, H, y, aa, O) {
    aa || O ? !aa && O ? c.moveTo(y, 0) : aa && !O ? c.moveTo(0, y) : 'square' == w || 'default' == w && 'square' == v ? c.moveTo(y, y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.moveTo(y, H + 0.5 * y) : ('invRound' == w || 'default' == w && 'invRound' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.moveTo(y, H + y) : c.moveTo(0, 0);
  };
  va.prototype.lineNWInner = function(c, k, r, l, q, v, w, H, y, aa, O) {
    aa || O ? !aa && O ? c.lineTo(y, 0) : aa && !O ? c.lineTo(0, y) : 'square' == w || 'default' == w && 'square' == v ? c.lineTo(y, y) : 'rounded' == w || 'default' == w && 'rounded' == v || 'snip' == w || 'default' == w && 'snip' == v ? c.lineTo(y, H + 0.5 * y) : ('invRound' == w || 'default' == w && 'invRound' == v || 'fold' == w || 'default' == w && 'fold' == v) && c.lineTo(y, H + y) : c.lineTo(0, 0);
  };
  va.prototype.paintFolds = function(c, k, r, l, q, v, w, H, y, aa, O, Da, Qa, La, na) {
    if ('fold' == v || 'fold' == w || 'fold' == H || 'fold' == y || 'fold' == aa)
      ('fold' == w || 'default' == w && 'fold' == v) && Da && na && (c.moveTo(0, O), c.lineTo(O, O), c.lineTo(O, 0)), ('fold' == H || 'default' == H && 'fold' == v) && Da && Qa && (c.moveTo(l - O, 0), c.lineTo(l - O, O), c.lineTo(l, O)), ('fold' == y || 'default' == y && 'fold' == v) && La && Qa && (c.moveTo(l - O, q), c.lineTo(l - O, q - O), c.lineTo(l, q - O)), ('fold' == aa || 'default' == aa && 'fold' == v) && La && na && (c.moveTo(0, q - O), c.lineTo(O, q - O), c.lineTo(O, q));
  };
  mxCellRenderer.registerShape(va.prototype.cst.RECT2, va);
  va.prototype.constraints = null;
  mxUtils.extend(ya, mxConnector);
  ya.prototype.origPaintEdgeShape = ya.prototype.paintEdgeShape;
  ya.prototype.paintEdgeShape = function(c, k, r) {
    for (var l = [], q = 0; q < k.length; q++)
      l.push(mxUtils.clone(k[q]));
    q = c.state.dashed;
    var v = c.state.fixDash;
    ya.prototype.origPaintEdgeShape.apply(this, [
      c,
      l,
      r
    ]);
    3 <= c.state.strokeWidth && (l = mxUtils.getValue(this.style, 'fillColor', null), null != l && (c.setStrokeColor(l), c.setStrokeWidth(c.state.strokeWidth - 2), c.setDashed(q, v), ya.prototype.origPaintEdgeShape.apply(this, [
      c,
      k,
      r
    ])));
  };
  mxCellRenderer.registerShape('filledEdge', ya);
  'undefined' !== typeof StyleFormatPanel && function() {
    var c = StyleFormatPanel.prototype.getCustomColors;
    StyleFormatPanel.prototype.getCustomColors = function() {
      var k = this.editorUi.getSelectionState(),
        r = c.apply(this, arguments);
      'umlFrame' == k.style.shape && r.push({
        title: mxResources.get('laneColor'),
        key: 'swimlaneFillColor',
        defaultValue: 'default'
      });
      return r;
    };
  }();
  mxMarker.addMarker('dash', function(c, k, r, l, q, v, w, H, y, aa) {
    var O = q * (w + y + 1),
      Da = v * (w + y + 1);
    return function() {
      c.begin();
      c.moveTo(l.x - O / 2 - Da / 2, l.y - Da / 2 + O / 2);
      c.lineTo(l.x + Da / 2 - 3 * O / 2, l.y - 3 * Da / 2 - O / 2);
      c.stroke();
    };
  });
  mxMarker.addMarker('box', function(c, k, r, l, q, v, w, H, y, aa) {
    var O = q * (w + y + 1),
      Da = v * (w + y + 1),
      Qa = l.x + O / 2,
      La = l.y + Da / 2;
    l.x -= O;
    l.y -= Da;
    return function() {
      c.begin();
      c.moveTo(Qa - O / 2 - Da / 2, La - Da / 2 + O / 2);
      c.lineTo(Qa - O / 2 + Da / 2, La - Da / 2 - O / 2);
      c.lineTo(Qa + Da / 2 - 3 * O / 2, La - 3 * Da / 2 - O / 2);
      c.lineTo(Qa - Da / 2 - 3 * O / 2, La - 3 * Da / 2 + O / 2);
      c.close();
      aa ? c.fillAndStroke() : c.stroke();
    };
  });
  mxMarker.addMarker('cross', function(c, k, r, l, q, v, w, H, y, aa) {
    var O = q * (w + y + 1),
      Da = v * (w + y + 1);
    return function() {
      c.begin();
      c.moveTo(l.x - O / 2 - Da / 2, l.y - Da / 2 + O / 2);
      c.lineTo(l.x + Da / 2 - 3 * O / 2, l.y - 3 * Da / 2 - O / 2);
      c.moveTo(l.x - O / 2 + Da / 2, l.y - Da / 2 - O / 2);
      c.lineTo(l.x - Da / 2 - 3 * O / 2, l.y - 3 * Da / 2 + O / 2);
      c.stroke();
    };
  });
  mxMarker.addMarker('circle', Ta);
  mxMarker.addMarker('circlePlus', function(c, k, r, l, q, v, w, H, y, aa) {
    var O = l.clone(),
      Da = Ta.apply(this, arguments),
      Qa = q * (w + 2 * y),
      La = v * (w + 2 * y);
    return function() {
      Da.apply(this, arguments);
      c.begin();
      c.moveTo(O.x - q * y, O.y - v * y);
      c.lineTo(O.x - 2 * Qa + q * y, O.y - 2 * La + v * y);
      c.moveTo(O.x - Qa - La + v * y, O.y - La + Qa - q * y);
      c.lineTo(O.x + La - Qa - v * y, O.y - La - Qa + q * y);
      c.stroke();
    };
  });
  mxMarker.addMarker('halfCircle', function(c, k, r, l, q, v, w, H, y, aa) {
    var O = q * (w + y + 1),
      Da = v * (w + y + 1),
      Qa = l.clone();
    l.x -= O;
    l.y -= Da;
    return function() {
      c.begin();
      c.moveTo(Qa.x - Da, Qa.y + O);
      c.quadTo(l.x - Da, l.y + O, l.x, l.y);
      c.quadTo(l.x + Da, l.y - O, Qa.x + Da, Qa.y - O);
      c.stroke();
    };
  });
  mxMarker.addMarker('async', function(c, k, r, l, q, v, w, H, y, aa) {
    k = q * y * 1.118;
    r = v * y * 1.118;
    q *= w + y;
    v *= w + y;
    var O = l.clone();
    O.x -= k;
    O.y -= r;
    l.x += -q - k;
    l.y += -v - r;
    return function() {
      c.begin();
      c.moveTo(O.x, O.y);
      H ? c.lineTo(O.x - q - v / 2, O.y - v + q / 2) : c.lineTo(O.x + v / 2 - q, O.y - v - q / 2);
      c.lineTo(O.x - q, O.y - v);
      c.close();
      aa ? c.fillAndStroke() : c.stroke();
    };
  });
  mxMarker.addMarker('openAsync', function(c) {
    c = null != c ? c : 2;
    return function(k, r, l, q, v, w, H, y, aa, O) {
      v *= H + aa;
      w *= H + aa;
      var Da = q.clone();
      return function() {
        k.begin();
        k.moveTo(Da.x, Da.y);
        y ? k.lineTo(Da.x - v - w / c, Da.y - w + v / c) : k.lineTo(Da.x + w / c - v, Da.y - w - v / c);
        k.stroke();
      };
    };
  }(2));
  if ('undefined' !== typeof mxVertexHandler) {
    var vb = function(c, k, r) {
        return Xa(c, ['width'], k, function(l, q, v, w, H) {
          H = c.shape.getEdgeWidth() * c.view.scale + r;
          return new mxPoint(w.x + q * l / 4 + v * H / 2, w.y + v * l / 4 - q * H / 2);
        }, function(l, q, v, w, H, y) {
          l = Math.sqrt(mxUtils.ptSegDistSq(w.x, w.y, H.x, H.y, y.x, y.y));
          c.style.width = Math.round(2 * l) / c.view.scale - r;
        });
      },
      Xa = function(c, k, r, l, q) {
        return Sa(c, k, function(v) {
          var w = c.absolutePoints,
            H = w.length - 1;
          v = c.view.translate;
          var y = c.view.scale,
            aa = r ? w[0] : w[H];
          w = r ? w[1] : w[H - 1];
          H = w.x - aa.x;
          var O = w.y - aa.y,
            Da = Math.sqrt(H * H + O * O);
          aa = l.call(this, Da, H / Da, O / Da, aa, w);
          return new mxPoint(aa.x / y - v.x, aa.y / y - v.y);
        }, function(v, w, H) {
          var y = c.absolutePoints,
            aa = y.length - 1;
          v = c.view.translate;
          var O = c.view.scale,
            Da = r ? y[0] : y[aa];
          y = r ? y[1] : y[aa - 1];
          aa = y.x - Da.x;
          var Qa = y.y - Da.y,
            La = Math.sqrt(aa * aa + Qa * Qa);
          w.x = (w.x + v.x) * O;
          w.y = (w.y + v.y) * O;
          q.call(this, La, aa / La, Qa / La, Da, y, w, H);
        });
      },
      jb = function(c, k) {
        return function(r) {
          return [Xa(r, ['startWidth'], !0, function(l, q, v, w, H) {
            H = mxUtils.getNumber(r.style, 'startWidth', c) * r.view.scale + k;
            return new mxPoint(w.x + q * l / 4 + v * H / 2, w.y + v * l / 4 - q * H / 2);
          }, function(l, q, v, w, H, y) {
            l = Math.sqrt(mxUtils.ptSegDistSq(w.x, w.y, H.x, H.y, y.x, y.y));
            r.style.startWidth = Math.round(2 * l) / r.view.scale - k;
          })];
        };
      },
      eb = function(c) {
        return function(k) {
          return [Sa(k, [
            'arrowWidth',
            'arrowSize'
          ], function(r) {
            var l = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'arrowWidth', ea.prototype.arrowWidth))),
              q = Math.max(0, Math.min(c, mxUtils.getValue(this.state.style, 'arrowSize', ea.prototype.arrowSize)));
            return new mxPoint(r.x + (1 - q) * r.width, r.y + (1 - l) * r.height / 2);
          }, function(r, l) {
            this.state.style.arrowWidth = Math.max(0, Math.min(1, Math.abs(r.y + r.height / 2 - l.y) / r.height * 2));
            this.state.style.arrowSize = Math.max(0, Math.min(c, (r.x + r.width - l.x) / r.width));
          })];
        };
      },
      kb = function(c) {
        return function(k) {
          return [Sa(k, ['size'], function(r) {
            var l = Math.max(0, Math.min(0.5 * r.height, parseFloat(mxUtils.getValue(this.state.style, 'size', c))));
            return new mxPoint(r.x, r.y + l);
          }, function(r, l) {
            this.state.style.size = Math.max(0, l.y - r.y);
          }, !0)];
        };
      },
      hb = function(c, k, r) {
        return function(l) {
          var q = [Sa(l, ['size'], function(v) {
            var w = Math.max(0, Math.min(v.width, Math.min(v.height, parseFloat(mxUtils.getValue(this.state.style, 'size', k))))) * c;
            return new mxPoint(v.x + w, v.y + w);
          }, function(v, w) {
            this.state.style.size = Math.round(Math.max(0, Math.min(Math.min(v.width, w.x - v.x), Math.min(v.height, w.y - v.y))) / c);
          }, !1)];
          r && mxUtils.getValue(l.style, mxConstants.STYLE_ROUNDED, !1) && q.push(ib(l));
          return q;
        };
      },
      Za = function(c, k, r, l, q) {
        r = null != r ? r : 0.5;
        return function(v) {
          var w = [Sa(v, ['size'], function(H) {
            var y = null != q ? '0' != mxUtils.getValue(this.state.style, 'fixedSize', '0') : null,
              aa = parseFloat(mxUtils.getValue(this.state.style, 'size', y ? q : c));
            return new mxPoint(H.x + Math.max(0, Math.min(0.5 * H.width, aa * (y ? 1 : H.width))), H.getCenterY());
          }, function(H, y, aa) {
            H = null != q && '0' != mxUtils.getValue(this.state.style, 'fixedSize', '0') ? y.x - H.x : Math.max(0, Math.min(r, (y.x - H.x) / H.width));
            this.state.style.size = H;
          }, !1, l)];
          k && mxUtils.getValue(v.style, mxConstants.STYLE_ROUNDED, !1) && w.push(ib(v));
          return w;
        };
      },
      wb = function(c, k, r) {
        c = null != c ? c : 0.5;
        return function(l) {
          var q = [Sa(l, ['size'], function(v) {
            var w = null != r ? '0' != mxUtils.getValue(this.state.style, 'fixedSize', '0') : null,
              H = Math.max(0, parseFloat(mxUtils.getValue(this.state.style, 'size', w ? r : k)));
            return new mxPoint(v.x + Math.min(0.75 * v.width * c, H * (w ? 0.75 : 0.75 * v.width)), v.y + v.height / 4);
          }, function(v, w) {
            v = null != r && '0' != mxUtils.getValue(this.state.style, 'fixedSize', '0') ? w.x - v.x : Math.max(0, Math.min(c, (w.x - v.x) / v.width * 0.75));
            this.state.style.size = v;
          }, !1, !0)];
          mxUtils.getValue(l.style, mxConstants.STYLE_ROUNDED, !1) && q.push(ib(l));
          return q;
        };
      },
      ob = function() {
        return function(c) {
          var k = [];
          mxUtils.getValue(c.style, mxConstants.STYLE_ROUNDED, !1) && k.push(ib(c));
          return k;
        };
      },
      ib = function(c, k) {
        return Sa(c, [mxConstants.STYLE_ARCSIZE], function(r) {
          var l = null != k ? k : r.height / 8;
          if ('1' == mxUtils.getValue(c.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0)) {
            var q = mxUtils.getValue(c.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
            return new mxPoint(r.x + r.width - Math.min(r.width / 2, q), r.y + l);
          }
          q = Math.max(0, parseFloat(mxUtils.getValue(c.style, mxConstants.STYLE_ARCSIZE, 100 * mxConstants.RECTANGLE_ROUNDING_FACTOR))) / 100;
          return new mxPoint(r.x + r.width - Math.min(Math.max(r.width / 2, r.height / 2), Math.min(r.width, r.height) * q), r.y + l);
        }, function(r, l, q) {
          '1' == mxUtils.getValue(c.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0) ? this.state.style[mxConstants.STYLE_ARCSIZE] = Math.round(Math.max(0, Math.min(r.width, 2 * (r.x + r.width - l.x)))) : this.state.style[mxConstants.STYLE_ARCSIZE] = Math.round(Math.min(50, Math.max(0, 100 * (r.width - l.x + r.x) / Math.min(r.width, r.height))));
        });
      },
      Sa = function(c, k, r, l, q, v, w) {
        var H = new mxHandle(c, null, mxVertexHandler.prototype.secondaryHandleImage);
        H.execute = function(aa) {
          for (var O = 0; O < k.length; O++)
            this.copyStyle(k[O]);
          w && w(aa);
        };
        H.getPosition = r;
        H.setPosition = l;
        H.ignoreGrid = null != q ? q : !0;
        if (v) {
          var y = H.positionChanged;
          H.positionChanged = function() {
            y.apply(this, arguments);
            c.view.invalidate(this.state.cell);
            c.view.validate();
          };
        }
        return H;
      },
      sb = {
        link: function(c) {
          return [
            vb(c, !0, 10),
            vb(c, !1, 10)
          ];
        },
        flexArrow: function(c) {
          var k = c.view.graph.gridSize / c.view.scale,
            r = [];
          mxUtils.getValue(c.style, mxConstants.STYLE_STARTARROW, mxConstants.NONE) != mxConstants.NONE && (r.push(Xa(c, [
            'width',
            mxConstants.STYLE_STARTSIZE,
            mxConstants.STYLE_ENDSIZE
          ], !0, function(l, q, v, w, H) {
            l = (c.shape.getEdgeWidth() - c.shape.strokewidth) * c.view.scale;
            H = 3 * mxUtils.getNumber(c.style, mxConstants.STYLE_STARTSIZE, mxConstants.ARROW_SIZE / 5) * c.view.scale;
            return new mxPoint(w.x + q * (H + c.shape.strokewidth * c.view.scale) + v * l / 2, w.y + v * (H + c.shape.strokewidth * c.view.scale) - q * l / 2);
          }, function(l, q, v, w, H, y, aa) {
            l = Math.sqrt(mxUtils.ptSegDistSq(w.x, w.y, H.x, H.y, y.x, y.y));
            q = mxUtils.ptLineDist(w.x, w.y, w.x + v, w.y - q, y.x, y.y);
            c.style[mxConstants.STYLE_STARTSIZE] = Math.round(100 * (q - c.shape.strokewidth) / 3) / 100 / c.view.scale;
            c.style.width = Math.round(2 * l) / c.view.scale;
            if (mxEvent.isShiftDown(aa.getEvent()) || mxEvent.isControlDown(aa.getEvent()))
              c.style[mxConstants.STYLE_ENDSIZE] = c.style[mxConstants.STYLE_STARTSIZE];
            mxEvent.isAltDown(aa.getEvent()) || Math.abs(parseFloat(c.style[mxConstants.STYLE_STARTSIZE]) - parseFloat(c.style[mxConstants.STYLE_ENDSIZE])) < k / 6 && (c.style[mxConstants.STYLE_STARTSIZE] = c.style[mxConstants.STYLE_ENDSIZE]);
          })), r.push(Xa(c, [
            'startWidth',
            'endWidth',
            mxConstants.STYLE_STARTSIZE,
            mxConstants.STYLE_ENDSIZE
          ], !0, function(l, q, v, w, H) {
            l = (c.shape.getStartArrowWidth() - c.shape.strokewidth) * c.view.scale;
            H = 3 * mxUtils.getNumber(c.style, mxConstants.STYLE_STARTSIZE, mxConstants.ARROW_SIZE / 5) * c.view.scale;
            return new mxPoint(w.x + q * (H + c.shape.strokewidth * c.view.scale) + v * l / 2, w.y + v * (H + c.shape.strokewidth * c.view.scale) - q * l / 2);
          }, function(l, q, v, w, H, y, aa) {
            l = Math.sqrt(mxUtils.ptSegDistSq(w.x, w.y, H.x, H.y, y.x, y.y));
            q = mxUtils.ptLineDist(w.x, w.y, w.x + v, w.y - q, y.x, y.y);
            c.style[mxConstants.STYLE_STARTSIZE] = Math.round(100 * (q - c.shape.strokewidth) / 3) / 100 / c.view.scale;
            c.style.startWidth = Math.max(0, Math.round(2 * l) - c.shape.getEdgeWidth()) / c.view.scale;
            if (mxEvent.isShiftDown(aa.getEvent()) || mxEvent.isControlDown(aa.getEvent()))
              c.style[mxConstants.STYLE_ENDSIZE] = c.style[mxConstants.STYLE_STARTSIZE], c.style.endWidth = c.style.startWidth;
            mxEvent.isAltDown(aa.getEvent()) || (Math.abs(parseFloat(c.style[mxConstants.STYLE_STARTSIZE]) - parseFloat(c.style[mxConstants.STYLE_ENDSIZE])) < k / 6 && (c.style[mxConstants.STYLE_STARTSIZE] = c.style[mxConstants.STYLE_ENDSIZE]), Math.abs(parseFloat(c.style.startWidth) - parseFloat(c.style.endWidth)) < k && (c.style.startWidth = c.style.endWidth));
          })));
          mxUtils.getValue(c.style, mxConstants.STYLE_ENDARROW, mxConstants.NONE) != mxConstants.NONE && (r.push(Xa(c, [
            'width',
            mxConstants.STYLE_STARTSIZE,
            mxConstants.STYLE_ENDSIZE
          ], !1, function(l, q, v, w, H) {
            l = (c.shape.getEdgeWidth() - c.shape.strokewidth) * c.view.scale;
            H = 3 * mxUtils.getNumber(c.style, mxConstants.STYLE_ENDSIZE, mxConstants.ARROW_SIZE / 5) * c.view.scale;
            return new mxPoint(w.x + q * (H + c.shape.strokewidth * c.view.scale) - v * l / 2, w.y + v * (H + c.shape.strokewidth * c.view.scale) + q * l / 2);
          }, function(l, q, v, w, H, y, aa) {
            l = Math.sqrt(mxUtils.ptSegDistSq(w.x, w.y, H.x, H.y, y.x, y.y));
            q = mxUtils.ptLineDist(w.x, w.y, w.x + v, w.y - q, y.x, y.y);
            c.style[mxConstants.STYLE_ENDSIZE] = Math.round(100 * (q - c.shape.strokewidth) / 3) / 100 / c.view.scale;
            c.style.width = Math.round(2 * l) / c.view.scale;
            if (mxEvent.isShiftDown(aa.getEvent()) || mxEvent.isControlDown(aa.getEvent()))
              c.style[mxConstants.STYLE_STARTSIZE] = c.style[mxConstants.STYLE_ENDSIZE];
            mxEvent.isAltDown(aa.getEvent()) || Math.abs(parseFloat(c.style[mxConstants.STYLE_ENDSIZE]) - parseFloat(c.style[mxConstants.STYLE_STARTSIZE])) < k / 6 && (c.style[mxConstants.STYLE_ENDSIZE] = c.style[mxConstants.STYLE_STARTSIZE]);
          })), r.push(Xa(c, [
            'startWidth',
            'endWidth',
            mxConstants.STYLE_STARTSIZE,
            mxConstants.STYLE_ENDSIZE
          ], !1, function(l, q, v, w, H) {
            l = (c.shape.getEndArrowWidth() - c.shape.strokewidth) * c.view.scale;
            H = 3 * mxUtils.getNumber(c.style, mxConstants.STYLE_ENDSIZE, mxConstants.ARROW_SIZE / 5) * c.view.scale;
            return new mxPoint(w.x + q * (H + c.shape.strokewidth * c.view.scale) - v * l / 2, w.y + v * (H + c.shape.strokewidth * c.view.scale) + q * l / 2);
          }, function(l, q, v, w, H, y, aa) {
            l = Math.sqrt(mxUtils.ptSegDistSq(w.x, w.y, H.x, H.y, y.x, y.y));
            q = mxUtils.ptLineDist(w.x, w.y, w.x + v, w.y - q, y.x, y.y);
            c.style[mxConstants.STYLE_ENDSIZE] = Math.round(100 * (q - c.shape.strokewidth) / 3) / 100 / c.view.scale;
            c.style.endWidth = Math.max(0, Math.round(2 * l) - c.shape.getEdgeWidth()) / c.view.scale;
            if (mxEvent.isShiftDown(aa.getEvent()) || mxEvent.isControlDown(aa.getEvent()))
              c.style[mxConstants.STYLE_STARTSIZE] = c.style[mxConstants.STYLE_ENDSIZE], c.style.startWidth = c.style.endWidth;
            mxEvent.isAltDown(aa.getEvent()) || (Math.abs(parseFloat(c.style[mxConstants.STYLE_ENDSIZE]) - parseFloat(c.style[mxConstants.STYLE_STARTSIZE])) < k / 6 && (c.style[mxConstants.STYLE_ENDSIZE] = c.style[mxConstants.STYLE_STARTSIZE]), Math.abs(parseFloat(c.style.endWidth) - parseFloat(c.style.startWidth)) < k && (c.style.endWidth = c.style.startWidth));
          })));
          return r;
        },
        swimlane: function(c) {
          var k = [];
          if (mxUtils.getValue(c.style, mxConstants.STYLE_ROUNDED)) {
            var r = parseFloat(mxUtils.getValue(c.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE));
            k.push(ib(c, r / 2));
          }
          k.push(Sa(c, [mxConstants.STYLE_STARTSIZE], function(l) {
            var q = parseFloat(mxUtils.getValue(c.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE));
            return 1 == mxUtils.getValue(c.style, mxConstants.STYLE_HORIZONTAL, 1) ? new mxPoint(l.getCenterX(), l.y + Math.max(0, Math.min(l.height, q))) : new mxPoint(l.x + Math.max(0, Math.min(l.width, q)), l.getCenterY());
          }, function(l, q) {
            c.style[mxConstants.STYLE_STARTSIZE] = 1 == mxUtils.getValue(this.state.style, mxConstants.STYLE_HORIZONTAL, 1) ? Math.round(Math.max(0, Math.min(l.height, q.y - l.y))) : Math.round(Math.max(0, Math.min(l.width, q.x - l.x)));
          }, !1, null, function(l) {
            var q = c.view.graph;
            if (!mxEvent.isShiftDown(l.getEvent()) && !mxEvent.isControlDown(l.getEvent()) && (q.isTableRow(c.cell) || q.isTableCell(c.cell))) {
              l = q.getSwimlaneDirection(c.style);
              var v = q.model.getParent(c.cell);
              v = q.model.getChildCells(v, !0);
              for (var w = [], H = 0; H < v.length; H++)
                v[H] != c.cell && q.isSwimlane(v[H]) && q.getSwimlaneDirection(q.getCurrentCellStyle(v[H])) == l && w.push(v[H]);
              q.setCellStyles(mxConstants.STYLE_STARTSIZE, c.style[mxConstants.STYLE_STARTSIZE], w);
            }
          }));
          return k;
        },
        label: ob(),
        ext: ob(),
        rectangle: ob(),
        triangle: ob(),
        rhombus: ob(),
        umlLifeline: function(c) {
          return [Sa(c, ['size'], function(k) {
            var r = Math.max(0, Math.min(k.height, parseFloat(mxUtils.getValue(this.state.style, 'size', ca.prototype.size))));
            return new mxPoint(k.getCenterX(), k.y + r);
          }, function(k, r) {
            this.state.style.size = Math.round(Math.max(0, Math.min(k.height, r.y - k.y)));
          }, !1)];
        },
        umlFrame: function(c) {
          return [Sa(c, [
            'width',
            'height'
          ], function(k) {
            var r = Math.max(ra.prototype.corner, Math.min(k.width, mxUtils.getValue(this.state.style, 'width', ra.prototype.width))),
              l = Math.max(1.5 * ra.prototype.corner, Math.min(k.height, mxUtils.getValue(this.state.style, 'height', ra.prototype.height)));
            return new mxPoint(k.x + r, k.y + l);
          }, function(k, r) {
            this.state.style.width = Math.round(Math.max(ra.prototype.corner, Math.min(k.width, r.x - k.x)));
            this.state.style.height = Math.round(Math.max(1.5 * ra.prototype.corner, Math.min(k.height, r.y - k.y)));
          }, !1)];
        },
        process: function(c) {
          var k = [Sa(c, ['size'], function(r) {
            var l = '0' != mxUtils.getValue(this.state.style, 'fixedSize', '0'),
              q = parseFloat(mxUtils.getValue(this.state.style, 'size', Z.prototype.size));
            return l ? new mxPoint(r.x + q, r.y + r.height / 4) : new mxPoint(r.x + r.width * q, r.y + r.height / 4);
          }, function(r, l) {
            r = '0' != mxUtils.getValue(this.state.style, 'fixedSize', '0') ? Math.max(0, Math.min(0.5 * r.width, l.x - r.x)) : Math.max(0, Math.min(0.5, (l.x - r.x) / r.width));
            this.state.style.size = r;
          }, !1)];
          mxUtils.getValue(c.style, mxConstants.STYLE_ROUNDED, !1) && k.push(ib(c));
          return k;
        },
        cross: function(c) {
          return [Sa(c, ['size'], function(k) {
            var r = Math.min(k.width, k.height);
            r = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'size', Ma.prototype.size))) * r / 2;
            return new mxPoint(k.getCenterX() - r, k.getCenterY() - r);
          }, function(k, r) {
            var l = Math.min(k.width, k.height);
            this.state.style.size = Math.max(0, Math.min(1, Math.min(Math.max(0, k.getCenterY() - r.y) / l * 2, Math.max(0, k.getCenterX() - r.x) / l * 2)));
          })];
        },
        note: function(c) {
          return [Sa(c, ['size'], function(k) {
            var r = Math.max(0, Math.min(k.width, Math.min(k.height, parseFloat(mxUtils.getValue(this.state.style, 'size', u.prototype.size)))));
            return new mxPoint(k.x + k.width - r, k.y + r);
          }, function(k, r) {
            this.state.style.size = Math.round(Math.max(0, Math.min(Math.min(k.width, k.x + k.width - r.x), Math.min(k.height, r.y - k.y))));
          })];
        },
        note2: function(c) {
          return [Sa(c, ['size'], function(k) {
            var r = Math.max(0, Math.min(k.width, Math.min(k.height, parseFloat(mxUtils.getValue(this.state.style, 'size', m.prototype.size)))));
            return new mxPoint(k.x + k.width - r, k.y + r);
          }, function(k, r) {
            this.state.style.size = Math.round(Math.max(0, Math.min(Math.min(k.width, k.x + k.width - r.x), Math.min(k.height, r.y - k.y))));
          })];
        },
        manualInput: function(c) {
          var k = [Sa(c, ['size'], function(r) {
            var l = Math.max(0, Math.min(r.height, mxUtils.getValue(this.state.style, 'size', $a.prototype.size)));
            return new mxPoint(r.x + r.width / 4, r.y + 3 * l / 4);
          }, function(r, l) {
            this.state.style.size = Math.round(Math.max(0, Math.min(r.height, 4 * (l.y - r.y) / 3)));
          }, !1)];
          mxUtils.getValue(c.style, mxConstants.STYLE_ROUNDED, !1) && k.push(ib(c));
          return k;
        },
        dataStorage: function(c) {
          return [Sa(c, ['size'], function(k) {
            var r = '0' != mxUtils.getValue(this.state.style, 'fixedSize', '0'),
              l = parseFloat(mxUtils.getValue(this.state.style, 'size', r ? Fa.prototype.fixedSize : Fa.prototype.size));
            return new mxPoint(k.x + k.width - l * (r ? 1 : k.width), k.getCenterY());
          }, function(k, r) {
            k = '0' != mxUtils.getValue(this.state.style, 'fixedSize', '0') ? Math.max(0, Math.min(k.width, k.x + k.width - r.x)) : Math.max(0, Math.min(1, (k.x + k.width - r.x) / k.width));
            this.state.style.size = k;
          }, !1)];
        },
        callout: function(c) {
          var k = [
            Sa(c, [
              'size',
              'position'
            ], function(r) {
              var l = Math.max(0, Math.min(r.height, mxUtils.getValue(this.state.style, 'size', ja.prototype.size))),
                q = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', ja.prototype.position)));
              mxUtils.getValue(this.state.style, 'base', ja.prototype.base);
              return new mxPoint(r.x + q * r.width, r.y + r.height - l);
            }, function(r, l) {
              mxUtils.getValue(this.state.style, 'base', ja.prototype.base);
              this.state.style.size = Math.round(Math.max(0, Math.min(r.height, r.y + r.height - l.y)));
              this.state.style.position = Math.round(100 * Math.max(0, Math.min(1, (l.x - r.x) / r.width))) / 100;
            }, !1),
            Sa(c, ['position2'], function(r) {
              var l = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position2', ja.prototype.position2)));
              return new mxPoint(r.x + l * r.width, r.y + r.height);
            }, function(r, l) {
              this.state.style.position2 = Math.round(100 * Math.max(0, Math.min(1, (l.x - r.x) / r.width))) / 100;
            }, !1),
            Sa(c, ['base'], function(r) {
              var l = Math.max(0, Math.min(r.height, mxUtils.getValue(this.state.style, 'size', ja.prototype.size))),
                q = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', ja.prototype.position))),
                v = Math.max(0, Math.min(r.width, mxUtils.getValue(this.state.style, 'base', ja.prototype.base)));
              return new mxPoint(r.x + Math.min(r.width, q * r.width + v), r.y + r.height - l);
            }, function(r, l) {
              var q = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', ja.prototype.position)));
              this.state.style.base = Math.round(Math.max(0, Math.min(r.width, l.x - r.x - q * r.width)));
            }, !1)
          ];
          mxUtils.getValue(c.style, mxConstants.STYLE_ROUNDED, !1) && k.push(ib(c));
          return k;
        },
        internalStorage: function(c) {
          var k = [Sa(c, [
            'dx',
            'dy'
          ], function(r) {
            var l = Math.max(0, Math.min(r.width, mxUtils.getValue(this.state.style, 'dx', Wa.prototype.dx))),
              q = Math.max(0, Math.min(r.height, mxUtils.getValue(this.state.style, 'dy', Wa.prototype.dy)));
            return new mxPoint(r.x + l, r.y + q);
          }, function(r, l) {
            this.state.style.dx = Math.round(Math.max(0, Math.min(r.width, l.x - r.x)));
            this.state.style.dy = Math.round(Math.max(0, Math.min(r.height, l.y - r.y)));
          }, !1)];
          mxUtils.getValue(c.style, mxConstants.STYLE_ROUNDED, !1) && k.push(ib(c));
          return k;
        },
        module: function(c) {
          return [Sa(c, [
            'jettyWidth',
            'jettyHeight'
          ], function(k) {
            var r = Math.max(0, Math.min(k.width, mxUtils.getValue(this.state.style, 'jettyWidth', Ca.prototype.jettyWidth))),
              l = Math.max(0, Math.min(k.height, mxUtils.getValue(this.state.style, 'jettyHeight', Ca.prototype.jettyHeight)));
            return new mxPoint(k.x + r / 2, k.y + 2 * l);
          }, function(k, r) {
            this.state.style.jettyWidth = Math.round(2 * Math.max(0, Math.min(k.width, r.x - k.x)));
            this.state.style.jettyHeight = Math.round(Math.max(0, Math.min(k.height, r.y - k.y)) / 2);
          })];
        },
        corner: function(c) {
          return [Sa(c, [
            'dx',
            'dy'
          ], function(k) {
            var r = Math.max(0, Math.min(k.width, mxUtils.getValue(this.state.style, 'dx', ab.prototype.dx))),
              l = Math.max(0, Math.min(k.height, mxUtils.getValue(this.state.style, 'dy', ab.prototype.dy)));
            return new mxPoint(k.x + r, k.y + l);
          }, function(k, r) {
            this.state.style.dx = Math.round(Math.max(0, Math.min(k.width, r.x - k.x)));
            this.state.style.dy = Math.round(Math.max(0, Math.min(k.height, r.y - k.y)));
          }, !1)];
        },
        tee: function(c) {
          return [Sa(c, [
            'dx',
            'dy'
          ], function(k) {
            var r = Math.max(0, Math.min(k.width, mxUtils.getValue(this.state.style, 'dx', db.prototype.dx))),
              l = Math.max(0, Math.min(k.height, mxUtils.getValue(this.state.style, 'dy', db.prototype.dy)));
            return new mxPoint(k.x + (k.width + r) / 2, k.y + l);
          }, function(k, r) {
            this.state.style.dx = Math.round(Math.max(0, 2 * Math.min(k.width / 2, r.x - k.x - k.width / 2)));
            this.state.style.dy = Math.round(Math.max(0, Math.min(k.height, r.y - k.y)));
          }, !1)];
        },
        singleArrow: eb(1),
        doubleArrow: eb(0.5),
        'mxgraph.arrows2.wedgeArrow': jb(20, 20),
        'mxgraph.arrows2.wedgeArrowDashed': jb(20, 20),
        'mxgraph.arrows2.wedgeArrowDashed2': jb(20, 20),
        folder: function(c) {
          return [Sa(c, [
            'tabWidth',
            'tabHeight'
          ], function(k) {
            var r = Math.max(0, Math.min(k.width, mxUtils.getValue(this.state.style, 'tabWidth', D.prototype.tabWidth))),
              l = Math.max(0, Math.min(k.height, mxUtils.getValue(this.state.style, 'tabHeight', D.prototype.tabHeight)));
            mxUtils.getValue(this.state.style, 'tabPosition', D.prototype.tabPosition) == mxConstants.ALIGN_RIGHT && (r = k.width - r);
            return new mxPoint(k.x + r, k.y + l);
          }, function(k, r) {
            var l = Math.max(0, Math.min(k.width, r.x - k.x));
            mxUtils.getValue(this.state.style, 'tabPosition', D.prototype.tabPosition) == mxConstants.ALIGN_RIGHT && (l = k.width - l);
            this.state.style.tabWidth = Math.round(l);
            this.state.style.tabHeight = Math.round(Math.max(0, Math.min(k.height, r.y - k.y)));
          }, !1)];
        },
        document: function(c) {
          return [Sa(c, ['size'], function(k) {
            var r = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'size', P.prototype.size))));
            return new mxPoint(k.x + 3 * k.width / 4, k.y + (1 - r) * k.height);
          }, function(k, r) {
            this.state.style.size = Math.max(0, Math.min(1, (k.y + k.height - r.y) / k.height));
          }, !1)];
        },
        tape: function(c) {
          return [Sa(c, ['size'], function(k) {
            var r = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'size', K.prototype.size))));
            return new mxPoint(k.getCenterX(), k.y + r * k.height / 2);
          }, function(k, r) {
            this.state.style.size = Math.max(0, Math.min(1, (r.y - k.y) / k.height * 2));
          }, !1)];
        },
        isoCube2: function(c) {
          return [Sa(c, ['isoAngle'], function(k) {
            var r = Math.max(0.01, Math.min(94, parseFloat(mxUtils.getValue(this.state.style, 'isoAngle', p.isoAngle)))) * Math.PI / 200;
            return new mxPoint(k.x, k.y + Math.min(k.width * Math.tan(r), 0.5 * k.height));
          }, function(k, r) {
            this.state.style.isoAngle = Math.max(0, 50 * (r.y - k.y) / k.height);
          }, !0)];
        },
        cylinder2: kb(x.prototype.size),
        cylinder3: kb(A.prototype.size),
        offPageConnector: function(c) {
          return [Sa(c, ['size'], function(k) {
            var r = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'size', E.prototype.size))));
            return new mxPoint(k.getCenterX(), k.y + (1 - r) * k.height);
          }, function(k, r) {
            this.state.style.size = Math.max(0, Math.min(1, (k.y + k.height - r.y) / k.height));
          }, !1)];
        },
        'mxgraph.basic.rect': function(c) {
          var k = [Graph.createHandle(c, ['size'], function(r) {
            var l = Math.max(0, Math.min(r.width / 2, r.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'size', this.size))));
            return new mxPoint(r.x + l, r.y + l);
          }, function(r, l) {
            this.state.style.size = Math.round(100 * Math.max(0, Math.min(r.height / 2, r.width / 2, l.x - r.x))) / 100;
          })];
          c = Graph.createHandle(c, ['indent'], function(r) {
            var l = Math.max(0, Math.min(100, parseFloat(mxUtils.getValue(this.state.style, 'indent', this.dx2))));
            return new mxPoint(r.x + 0.75 * r.width, r.y + l * r.height / 200);
          }, function(r, l) {
            this.state.style.indent = Math.round(100 * Math.max(0, Math.min(100, 200 * (l.y - r.y) / r.height))) / 100;
          });
          k.push(c);
          return k;
        },
        step: Za(la.prototype.size, !0, null, !0, la.prototype.fixedSize),
        hexagon: Za(N.prototype.size, !0, 0.5, !0, N.prototype.fixedSize),
        curlyBracket: Za(ba.prototype.size, !1),
        display: Za(Ka.prototype.size, !1),
        cube: hb(1, e.prototype.size, !1),
        card: hb(0.5, F.prototype.size, !0),
        loopLimit: hb(0.5, B.prototype.size, !0),
        trapezoid: wb(0.5, Q.prototype.size, Q.prototype.fixedSize),
        parallelogram: wb(1, R.prototype.size, R.prototype.fixedSize)
      };
    Graph.createHandle = Sa;
    Graph.handleFactory = sb;
    var yb = mxVertexHandler.prototype.createCustomHandles;
    mxVertexHandler.prototype.createCustomHandles = function() {
      var c = yb.apply(this, arguments);
      if (this.graph.isCellRotatable(this.state.cell)) {
        var k = this.state.style.shape;
        null == mxCellRenderer.defaultShapes[k] && null == mxStencilRegistry.getStencil(k) ? k = mxConstants.SHAPE_RECTANGLE : this.state.view.graph.isSwimlane(this.state.cell) && (k = mxConstants.SHAPE_SWIMLANE);
        k = sb[k];
        null == k && null != this.state.shape && this.state.shape.isRoundable() && (k = sb[mxConstants.SHAPE_RECTANGLE]);
        null != k && (k = k(this.state), null != k && (c = null == c ? k : c.concat(k)));
      }
      return c;
    };
    mxEdgeHandler.prototype.createCustomHandles = function() {
      var c = this.state.style.shape;
      null == mxCellRenderer.defaultShapes[c] && null == mxStencilRegistry.getStencil(c) && (c = mxConstants.SHAPE_CONNECTOR);
      c = sb[c];
      return null != c ? c(this.state) : null;
    };
  } else
    Graph.createHandle = function() {}, Graph.handleFactory = {};
  var tb = new mxPoint(1, 0),
    mb = new mxPoint(1, 0),
    nb = mxUtils.toRadians(-30);
  tb = mxUtils.getRotatedPoint(tb, Math.cos(nb), Math.sin(nb));
  var pb = mxUtils.toRadians(-150);
  mb = mxUtils.getRotatedPoint(mb, Math.cos(pb), Math.sin(pb));
  mxEdgeStyle.IsometricConnector = function(c, k, r, l, q) {
    var v = c.view;
    l = null != l && 0 < l.length ? l[0] : null;
    var w = c.absolutePoints,
      H = w[0];
    w = w[w.length - 1];
    null != l && (l = v.transformControlPoint(c, l));
    null == H && null != k && (H = new mxPoint(k.getCenterX(), k.getCenterY()));
    null == w && null != r && (w = new mxPoint(r.getCenterX(), r.getCenterY()));
    var y = tb.x,
      aa = tb.y,
      O = mb.x,
      Da = mb.y,
      Qa = 'horizontal' == mxUtils.getValue(c.style, 'elbow', 'horizontal');
    if (null != w && null != H) {
      c = function(na, qa, pa) {
        na -= La.x;
        var oa = qa - La.y;
        qa = (Da * na - O * oa) / (y * Da - aa * O);
        na = (aa * na - y * oa) / (aa * O - y * Da);
        Qa ? (pa && (La = new mxPoint(La.x + y * qa, La.y + aa * qa), q.push(La)), La = new mxPoint(La.x + O * na, La.y + Da * na)) : (pa && (La = new mxPoint(La.x + O * na, La.y + Da * na), q.push(La)), La = new mxPoint(La.x + y * qa, La.y + aa * qa));
        q.push(La);
      };
      var La = H;
      null == l && (l = new mxPoint(H.x + (w.x - H.x) / 2, H.y + (w.y - H.y) / 2));
      c(l.x, l.y, !0);
      c(w.x, w.y, !1);
    }
  };
  mxStyleRegistry.putValue('isometricEdgeStyle', mxEdgeStyle.IsometricConnector);
  var qb = Graph.prototype.createEdgeHandler;
  Graph.prototype.createEdgeHandler = function(c, k) {
    if (k == mxEdgeStyle.IsometricConnector) {
      var r = new mxElbowEdgeHandler(c);
      r.snapToTerminals = !1;
      return r;
    }
    return qb.apply(this, arguments);
  };
  d.prototype.constraints = [];
  h.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.tan(mxUtils.toRadians(30)),
      q = (0.5 - l) / 2;
    l = Math.min(k, r / (0.5 + l));
    k = (k - l) / 2;
    r = (r - l) / 2;
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, r + 0.25 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k + 0.5 * l, r + l * q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k + l, r + 0.25 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k + l, r + 0.75 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k + 0.5 * l, r + (1 - q) * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, r + 0.75 * l));
    return c;
  };
  p.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.max(0.01, Math.min(94, parseFloat(mxUtils.getValue(this.style, 'isoAngle', this.isoAngle)))) * Math.PI / 200;
    l = Math.min(k * Math.tan(l), 0.5 * r);
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, l));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, r - l));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, r - l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, l));
    return c;
  };
  ja.prototype.getConstraints = function(c, k, r) {
    c = [];
    mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE);
    var l = Math.max(0, Math.min(r, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    parseFloat(mxUtils.getValue(this.style, 'position', this.position));
    var q = k * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position2', this.position2))));
    parseFloat(mxUtils.getValue(this.style, 'base', this.base));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.25, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.75, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, 0.5 * (r - l)));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, r - l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, r - l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, 0.5 * (r - l)));
    k >= 2 * l && c.push(new mxConnectionConstraint(new mxPoint(0.5, 0), !1));
    return c;
  };
  mxRectangleShape.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.25, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.75, 0), !0),
    new mxConnectionConstraint(new mxPoint(1, 0), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(0, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.25, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.75, 1), !0),
    new mxConnectionConstraint(new mxPoint(1, 1), !0)
  ];
  mxEllipse.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0), !0),
    new mxConnectionConstraint(new mxPoint(1, 0), !0),
    new mxConnectionConstraint(new mxPoint(0, 1), !0),
    new mxConnectionConstraint(new mxPoint(1, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 1), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.5))
  ];
  sa.prototype.constraints = mxRectangleShape.prototype.constraints;
  mxImageShape.prototype.constraints = mxRectangleShape.prototype.constraints;
  mxSwimlane.prototype.constraints = mxRectangleShape.prototype.constraints;
  X.prototype.constraints = mxRectangleShape.prototype.constraints;
  mxLabel.prototype.constraints = mxRectangleShape.prototype.constraints;
  u.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.max(0, Math.min(k, Math.min(r, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k - l), 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - l, 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - 0.5 * l, 0.5 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, 0.5 * (r + l)));
    c.push(new mxConnectionConstraint(new mxPoint(1, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0.5), !1));
    k >= 2 * l && c.push(new mxConnectionConstraint(new mxPoint(0.5, 0), !1));
    return c;
  };
  F.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.max(0, Math.min(k, Math.min(r, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k + l), 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, l, 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * l, 0.5 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, 0.5 * (r + l)));
    c.push(new mxConnectionConstraint(new mxPoint(0, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(1, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0.5), !1));
    k >= 2 * l && c.push(new mxConnectionConstraint(new mxPoint(0.5, 0), !1));
    return c;
  };
  e.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.max(0, Math.min(k, Math.min(r, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k - l), 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - l, 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - 0.5 * l, 0.5 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, 0.5 * (r + l)));
    c.push(new mxConnectionConstraint(new mxPoint(1, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k + l), r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, l, r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * l, r - 0.5 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, r - l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, 0.5 * (r - l)));
    return c;
  };
  A.prototype.getConstraints = function(c, k, r) {
    c = [];
    k = Math.max(0, Math.min(r, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, k));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0), !1, null, 0, k));
    c.push(new mxConnectionConstraint(new mxPoint(1, 1), !1, null, 0, -k));
    c.push(new mxConnectionConstraint(new mxPoint(0, 1), !1, null, 0, -k));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, k + 0.5 * (0.5 * r - k)));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0), !1, null, 0, k + 0.5 * (0.5 * r - k)));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0), !1, null, 0, r - k - 0.5 * (0.5 * r - k)));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, r - k - 0.5 * (0.5 * r - k)));
    c.push(new mxConnectionConstraint(new mxPoint(0.145, 0), !1, null, 0, 0.29 * k));
    c.push(new mxConnectionConstraint(new mxPoint(0.855, 0), !1, null, 0, 0.29 * k));
    c.push(new mxConnectionConstraint(new mxPoint(0.855, 1), !1, null, 0, 0.29 * -k));
    c.push(new mxConnectionConstraint(new mxPoint(0.145, 1), !1, null, 0, 0.29 * -k));
    return c;
  };
  D.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.max(0, Math.min(k, parseFloat(mxUtils.getValue(this.style, 'tabWidth', this.tabWidth)))),
      q = Math.max(0, Math.min(r, parseFloat(mxUtils.getValue(this.style, 'tabHeight', this.tabHeight))));
    'left' == mxUtils.getValue(this.style, 'tabPosition', this.tabPosition) ? (c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1)), c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * l, 0)), c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, l, 0)), c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, l, q)), c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k + l), q))) : (c.push(new mxConnectionConstraint(new mxPoint(1, 0), !1)), c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - 0.5 * l, 0)), c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - l, 0)), c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - l, q)), c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k - l), q)));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, 0.25 * (r - q) + q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, 0.5 * (r - q) + q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, 0.75 * (r - q) + q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, 0.25 * (r - q) + q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, 0.5 * (r - q) + q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, 0.75 * (r - q) + q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, r));
    c.push(new mxConnectionConstraint(new mxPoint(0.25, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.75, 1), !1));
    return c;
  };
  Wa.prototype.constraints = mxRectangleShape.prototype.constraints;
  Fa.prototype.constraints = mxRectangleShape.prototype.constraints;
  J.prototype.constraints = mxEllipse.prototype.constraints;
  M.prototype.constraints = mxEllipse.prototype.constraints;
  W.prototype.constraints = mxEllipse.prototype.constraints;
  Ja.prototype.constraints = mxEllipse.prototype.constraints;
  $a.prototype.constraints = mxRectangleShape.prototype.constraints;
  Na.prototype.constraints = mxRectangleShape.prototype.constraints;
  Ka.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.min(k, r / 2),
      q = Math.min(k - l, Math.max(0, parseFloat(mxUtils.getValue(this.style, 'size', this.size))) * k);
    c.push(new mxConnectionConstraint(new mxPoint(0, 0.5), !1, null));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (q + k - l), 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - l, 0));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0.5), !1, null));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - l, r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (q + k - l), r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, r));
    return c;
  };
  Ca.prototype.getConstraints = function(c, k, r) {
    k = parseFloat(mxUtils.getValue(c, 'jettyWidth', Ca.prototype.jettyWidth)) / 2;
    c = parseFloat(mxUtils.getValue(c, 'jettyHeight', Ca.prototype.jettyHeight));
    var l = [
      new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k),
      new mxConnectionConstraint(new mxPoint(0.25, 0), !0),
      new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
      new mxConnectionConstraint(new mxPoint(0.75, 0), !0),
      new mxConnectionConstraint(new mxPoint(1, 0), !0),
      new mxConnectionConstraint(new mxPoint(1, 0.25), !0),
      new mxConnectionConstraint(new mxPoint(1, 0.5), !0),
      new mxConnectionConstraint(new mxPoint(1, 0.75), !0),
      new mxConnectionConstraint(new mxPoint(0, 1), !1, null, k),
      new mxConnectionConstraint(new mxPoint(0.25, 1), !0),
      new mxConnectionConstraint(new mxPoint(0.5, 1), !0),
      new mxConnectionConstraint(new mxPoint(0.75, 1), !0),
      new mxConnectionConstraint(new mxPoint(1, 1), !0),
      new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, Math.min(r - 0.5 * c, 1.5 * c)),
      new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, Math.min(r - 0.5 * c, 3.5 * c))
    ];
    r > 5 * c && l.push(new mxConnectionConstraint(new mxPoint(0, 0.75), !1, null, k));
    r > 8 * c && l.push(new mxConnectionConstraint(new mxPoint(0, 0.5), !1, null, k));
    r > 15 * c && l.push(new mxConnectionConstraint(new mxPoint(0, 0.25), !1, null, k));
    return l;
  };
  B.prototype.constraints = mxRectangleShape.prototype.constraints;
  E.prototype.constraints = mxRectangleShape.prototype.constraints;
  mxCylinder.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.15, 0.05), !1),
    new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.85, 0.05), !1),
    new mxConnectionConstraint(new mxPoint(0, 0.3), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.7), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.3), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.7), !0),
    new mxConnectionConstraint(new mxPoint(0.15, 0.95), !1),
    new mxConnectionConstraint(new mxPoint(0.5, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.85, 0.95), !1)
  ];
  I.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.25, 0.1), !1),
    new mxConnectionConstraint(new mxPoint(0.5, 0), !1),
    new mxConnectionConstraint(new mxPoint(0.75, 0.1), !1),
    new mxConnectionConstraint(new mxPoint(0, 1 / 3), !1),
    new mxConnectionConstraint(new mxPoint(0, 1), !1),
    new mxConnectionConstraint(new mxPoint(1, 1 / 3), !1),
    new mxConnectionConstraint(new mxPoint(1, 1), !1),
    new mxConnectionConstraint(new mxPoint(0.5, 0.5), !1)
  ];
  ta.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.25, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.75, 0), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.3), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.7), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(0.25, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.75, 1), !0)
  ];
  mxActor.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.25, 0.2), !1),
    new mxConnectionConstraint(new mxPoint(0.1, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(0.75, 0.25), !1),
    new mxConnectionConstraint(new mxPoint(0.9, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(0.25, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.75, 1), !0)
  ];
  C.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0), !1),
    new mxConnectionConstraint(new mxPoint(0.5, 0.25), !1),
    new mxConnectionConstraint(new mxPoint(1, 0), !1),
    new mxConnectionConstraint(new mxPoint(0.25, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0.75, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0, 1), !1),
    new mxConnectionConstraint(new mxPoint(0.5, 0.75), !1),
    new mxConnectionConstraint(new mxPoint(1, 1), !1)
  ];
  K.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0.35), !1),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0, 0.65), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.35), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.65), !1),
    new mxConnectionConstraint(new mxPoint(0.25, 1), !1),
    new mxConnectionConstraint(new mxPoint(0.75, 0), !1)
  ];
  la.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.25, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.75, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.25, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.75, 1), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.75), !0)
  ];
  mxLine.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0.25, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0.75, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !1)
  ];
  ua.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.5, 0), !1),
    new mxConnectionConstraint(new mxPoint(0.5, 1), !1)
  ];
  mxDoubleEllipse.prototype.constraints = mxEllipse.prototype.constraints;
  mxRhombus.prototype.constraints = mxEllipse.prototype.constraints;
  mxTriangle.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 1), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !0)
  ];
  mxHexagon.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.375, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.625, 0), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(0.375, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 1), !0),
    new mxConnectionConstraint(new mxPoint(0.625, 1), !0)
  ];
  mxCloud.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.25, 0.25), !1),
    new mxConnectionConstraint(new mxPoint(0.4, 0.1), !1),
    new mxConnectionConstraint(new mxPoint(0.16, 0.55), !1),
    new mxConnectionConstraint(new mxPoint(0.07, 0.4), !1),
    new mxConnectionConstraint(new mxPoint(0.31, 0.8), !1),
    new mxConnectionConstraint(new mxPoint(0.13, 0.77), !1),
    new mxConnectionConstraint(new mxPoint(0.8, 0.8), !1),
    new mxConnectionConstraint(new mxPoint(0.55, 0.95), !1),
    new mxConnectionConstraint(new mxPoint(0.875, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0.96, 0.7), !1),
    new mxConnectionConstraint(new mxPoint(0.625, 0.2), !1),
    new mxConnectionConstraint(new mxPoint(0.88, 0.25), !1)
  ];
  R.prototype.constraints = mxRectangleShape.prototype.constraints;
  Q.prototype.constraints = mxRectangleShape.prototype.constraints;
  P.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.25, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.5, 0), !0),
    new mxConnectionConstraint(new mxPoint(0.75, 0), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(0, 0.75), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.25), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !0),
    new mxConnectionConstraint(new mxPoint(1, 0.75), !0)
  ];
  mxArrow.prototype.constraints = null;
  db.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.max(0, Math.min(k, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx)))),
      q = Math.max(0, Math.min(r, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, 0.5 * q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.75 * k + 0.25 * l, q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k + l), q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k + l), 0.5 * (r + q)));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k + l), r));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k - l), r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k - l), 0.5 * (r + q)));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k - l), q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.25 * k - 0.25 * l, q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, 0.5 * q));
    return c;
  };
  ab.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.max(0, Math.min(k, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx)))),
      q = Math.max(0, Math.min(r, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, 0.5 * q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k + l), q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, l, q));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, l, 0.5 * (r + q)));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, l, r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * l, r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 1), !1));
    return c;
  };
  lb.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0), !1),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0, 1), !1),
    new mxConnectionConstraint(new mxPoint(0.25, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0.5, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0.75, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(1, 0), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(1, 1), !1)
  ];
  ea.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = r * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowWidth', this.arrowWidth)))),
      q = k * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowSize', this.arrowSize))));
    l = (r - l) / 2;
    c.push(new mxConnectionConstraint(new mxPoint(0, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k - q), l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - q, 0));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - q, r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k - q), r - l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, r - l));
    return c;
  };
  Ea.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = r * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowWidth', ea.prototype.arrowWidth)))),
      q = k * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowSize', ea.prototype.arrowSize))));
    l = (r - l) / 2;
    c.push(new mxConnectionConstraint(new mxPoint(0, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * k, l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - q, 0));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k - q, r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * k, r - l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, r));
    return c;
  };
  Ma.prototype.getConstraints = function(c, k, r) {
    c = [];
    var l = Math.min(r, k),
      q = Math.max(0, Math.min(l, l * parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
    l = (r - q) / 2;
    var v = l + q,
      w = (k - q) / 2;
    q = w + q;
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, w, 0.5 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, w, 0));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 0), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, 0));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, 0.5 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, w, r - 0.5 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, w, r));
    c.push(new mxConnectionConstraint(new mxPoint(0.5, 1), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, r));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, r - 0.5 * l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, q, v));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k + q), l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, l));
    c.push(new mxConnectionConstraint(new mxPoint(1, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, k, v));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * (k + q), v));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, w, v));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * w, l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, l));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0.5), !1));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0, v));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, 0.5 * w, v));
    c.push(new mxConnectionConstraint(new mxPoint(0, 0), !1, null, w, l));
    return c;
  };
  ca.prototype.constraints = null;
  t.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0.25), !1),
    new mxConnectionConstraint(new mxPoint(0, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0, 0.75), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0.7, 0.1), !1),
    new mxConnectionConstraint(new mxPoint(0.7, 0.9), !1)
  ];
  z.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0.175, 0.25), !1),
    new mxConnectionConstraint(new mxPoint(0.25, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0.175, 0.75), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(0.7, 0.1), !1),
    new mxConnectionConstraint(new mxPoint(0.7, 0.9), !1)
  ];
  Ia.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !1)
  ];
  wa.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0.5), !1),
    new mxConnectionConstraint(new mxPoint(1, 0.5), !1)
  ];
}());