var mxEdgeStyle = {
  EntityRelation: function(a, b, c, d, e) {
    var f = a.view,
      g = f.graph;
    d = mxUtils.getValue(a.style, mxConstants.STYLE_SEGMENT, mxConstants.ENTITY_SEGMENT) * f.scale;
    var k = a.absolutePoints,
      l = k[0],
      m = k[k.length - 1];
    k = !1;
    if (null != b) {
      var n = g.getCellGeometry(b.cell);
      n.relative ? k = 0.5 >= n.x : null != c && (k = (null != m ? m.x : c.x + c.width) < (null != l ? l.x : b.x));
    }
    if (null != l)
      b = new mxCellState(), b.x = l.x, b.y = l.y;
    else if (null != b) {
      var p = mxUtils.getPortConstraints(b, a, !0, mxConstants.DIRECTION_MASK_NONE);
      p != mxConstants.DIRECTION_MASK_NONE && p != mxConstants.DIRECTION_MASK_WEST + mxConstants.DIRECTION_MASK_EAST && (k = p == mxConstants.DIRECTION_MASK_WEST);
    } else
      return;
    n = !0;
    null != c && (g = g.getCellGeometry(c.cell), g.relative ? n = 0.5 >= g.x : null != b && (n = (null != l ? l.x : b.x + b.width) < (null != m ? m.x : c.x)));
    null != m ? (c = new mxCellState(), c.x = m.x, c.y = m.y) : null != c && (p = mxUtils.getPortConstraints(c, a, !1, mxConstants.DIRECTION_MASK_NONE), p != mxConstants.DIRECTION_MASK_NONE && p != mxConstants.DIRECTION_MASK_WEST + mxConstants.DIRECTION_MASK_EAST && (n = p == mxConstants.DIRECTION_MASK_WEST));
    null != b && null != c && (a = k ? b.x : b.x + b.width, b = f.getRoutingCenterY(b), l = n ? c.x : c.x + c.width, c = f.getRoutingCenterY(c), f = new mxPoint(a + (k ? -d : d), b), g = new mxPoint(l + (n ? -d : d), c), k == n ? (d = k ? Math.min(a, l) - d : Math.max(a, l) + d, e.push(new mxPoint(d, b)), e.push(new mxPoint(d, c))) : (f.x < g.x == k ? (d = b + (c - b) / 2, e.push(f), e.push(new mxPoint(f.x, d)), e.push(new mxPoint(g.x, d))) : e.push(f), e.push(g)));
  },
  Loop: function(a, b, c, d, e) {
    c = a.absolutePoints;
    var f = c[c.length - 1];
    if (null != c[0] && null != f) {
      if (null != d && 0 < d.length)
        for (b = 0; b < d.length; b++)
          c = d[b], c = a.view.transformControlPoint(a, c), e.push(new mxPoint(c.x, c.y));
    } else if (null != b) {
      f = a.view;
      var g = f.graph;
      c = null != d && 0 < d.length ? d[0] : null;
      null != c && (c = f.transformControlPoint(a, c), mxUtils.contains(b, c.x, c.y) && (c = null));
      var k = d = 0,
        l = 0,
        m = 0;
      g = mxUtils.getValue(a.style, mxConstants.STYLE_SEGMENT, g.gridSize) * f.scale;
      a = mxUtils.getValue(a.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_WEST);
      a == mxConstants.DIRECTION_NORTH || a == mxConstants.DIRECTION_SOUTH ? (d = f.getRoutingCenterX(b), k = g) : (l = f.getRoutingCenterY(b), m = g);
      null == c || c.x < b.x || c.x > b.x + b.width ? null != c ? (d = c.x, m = Math.max(Math.abs(l - c.y), m)) : a == mxConstants.DIRECTION_NORTH ? l = b.y - 2 * k : a == mxConstants.DIRECTION_SOUTH ? l = b.y + b.height + 2 * k : d = a == mxConstants.DIRECTION_EAST ? b.x - 2 * m : b.x + b.width + 2 * m : null != c && (d = f.getRoutingCenterX(b), k = Math.max(Math.abs(d - c.x), m), l = c.y, m = 0);
      e.push(new mxPoint(d - k, l - m));
      e.push(new mxPoint(d + k, l + m));
    }
  },
  ElbowConnector: function(a, b, c, d, e) {
    var f = null != d && 0 < d.length ? d[0] : null,
      g = !1,
      k = !1;
    if (null != b && null != c)
      if (null != f) {
        var l = Math.min(b.x, c.x),
          m = Math.max(b.x + b.width, c.x + c.width);
        k = Math.min(b.y, c.y);
        var n = Math.max(b.y + b.height, c.y + c.height);
        f = a.view.transformControlPoint(a, f);
        g = f.y < k || f.y > n;
        k = f.x < l || f.x > m;
      } else
        l = Math.max(b.x, c.x), m = Math.min(b.x + b.width, c.x + c.width), (g = l == m) || (k = Math.max(b.y, c.y), n = Math.min(b.y + b.height, c.y + c.height), k = k == n);
    k || !g && a.style[mxConstants.STYLE_ELBOW] != mxConstants.ELBOW_VERTICAL ? mxEdgeStyle.SideToSide(a, b, c, d, e) : mxEdgeStyle.TopToBottom(a, b, c, d, e);
  },
  SideToSide: function(a, b, c, d, e) {
    var f = a.view;
    d = null != d && 0 < d.length ? d[0] : null;
    var g = a.absolutePoints,
      k = g[0];
    g = g[g.length - 1];
    null != d && (d = f.transformControlPoint(a, d));
    null != k && (b = new mxCellState(), b.x = k.x, b.y = k.y);
    null != g && (c = new mxCellState(), c.x = g.x, c.y = g.y);
    null != b && null != c && (a = Math.max(b.x, c.x), k = Math.min(b.x + b.width, c.x + c.width), a = null != d ? d.x : Math.round(k + (a - k) / 2), k = f.getRoutingCenterY(b), f = f.getRoutingCenterY(c), null != d && (d.y >= b.y && d.y <= b.y + b.height && (k = d.y), d.y >= c.y && d.y <= c.y + c.height && (f = d.y)), mxUtils.contains(c, a, k) || mxUtils.contains(b, a, k) || e.push(new mxPoint(a, k)), mxUtils.contains(c, a, f) || mxUtils.contains(b, a, f) || e.push(new mxPoint(a, f)), 1 == e.length && (null != d ? mxUtils.contains(c, a, d.y) || mxUtils.contains(b, a, d.y) || e.push(new mxPoint(a, d.y)) : (f = Math.max(b.y, c.y), e.push(new mxPoint(a, f + (Math.min(b.y + b.height, c.y + c.height) - f) / 2)))));
  },
  TopToBottom: function(a, b, c, d, e) {
    var f = a.view;
    d = null != d && 0 < d.length ? d[0] : null;
    var g = a.absolutePoints,
      k = g[0];
    g = g[g.length - 1];
    null != d && (d = f.transformControlPoint(a, d));
    null != k && (b = new mxCellState(), b.x = k.x, b.y = k.y);
    null != g && (c = new mxCellState(), c.x = g.x, c.y = g.y);
    null != b && null != c && (k = Math.max(b.y, c.y), g = Math.min(b.y + b.height, c.y + c.height), a = f.getRoutingCenterX(b), null != d && d.x >= b.x && d.x <= b.x + b.width && (a = d.x), k = null != d ? d.y : Math.round(g + (k - g) / 2), mxUtils.contains(c, a, k) || mxUtils.contains(b, a, k) || e.push(new mxPoint(a, k)), a = null != d && d.x >= c.x && d.x <= c.x + c.width ? d.x : f.getRoutingCenterX(c), mxUtils.contains(c, a, k) || mxUtils.contains(b, a, k) || e.push(new mxPoint(a, k)), 1 == e.length && (null != d && 1 == e.length ? mxUtils.contains(c, d.x, k) || mxUtils.contains(b, d.x, k) || e.push(new mxPoint(d.x, k)) : (f = Math.max(b.x, c.x), e.push(new mxPoint(f + (Math.min(b.x + b.width, c.x + c.width) - f) / 2, k)))));
  },
  SegmentConnector: function(a, b, c, d, e) {
    var f = mxEdgeStyle.scalePointArray(a.absolutePoints, a.view.scale);
    b = mxEdgeStyle.scaleCellState(b, a.view.scale);
    var g = mxEdgeStyle.scaleCellState(c, a.view.scale);
    c = [];
    var k = 0 < e.length ? e[0] : null,
      l = !0,
      m = f[0];
    null == m && null != b ? m = new mxPoint(a.view.getRoutingCenterX(b), a.view.getRoutingCenterY(b)) : null != m && (m = m.clone());
    var n = f.length - 1;
    if (null != d && 0 < d.length) {
      for (var p = [], r = 0; r < d.length; r++) {
        var q = a.view.transformControlPoint(a, d[r], !0);
        null != q && p.push(q);
      }
      if (0 == p.length)
        return;
      null != m && null != p[0] && (1 > Math.abs(p[0].x - m.x) && (p[0].x = m.x), 1 > Math.abs(p[0].y - m.y) && (p[0].y = m.y));
      q = f[n];
      null != q && null != p[p.length - 1] && (1 > Math.abs(p[p.length - 1].x - q.x) && (p[p.length - 1].x = q.x), 1 > Math.abs(p[p.length - 1].y - q.y) && (p[p.length - 1].y = q.y));
      d = p[0];
      var t = b,
        u = f[0],
        x = d;
      null != u && (t = null);
      for (r = 0; 2 > r; r++) {
        var A = null != u && u.x == x.x,
          E = null != u && u.y == x.y,
          C = null != t && x.y >= t.y && x.y <= t.y + t.height,
          D = null != t && x.x >= t.x && x.x <= t.x + t.width;
        t = E || null == u && C;
        x = A || null == u && D;
        if (0 != r || !(t && x || A && E)) {
          if (null != u && !E && !A && (C || D)) {
            l = C ? !1 : !0;
            break;
          }
          if (x || t) {
            l = t;
            1 == r && (l = 0 == p.length % 2 ? t : x);
            break;
          }
        }
        t = g;
        u = f[n];
        null != u && (t = null);
        x = p[p.length - 1];
        A && E && (p = p.slice(1));
      }
      l && (null != f[0] && f[0].y != d.y || null == f[0] && null != b && (d.y < b.y || d.y > b.y + b.height)) ? c.push(new mxPoint(m.x, d.y)) : !l && (null != f[0] && f[0].x != d.x || null == f[0] && null != b && (d.x < b.x || d.x > b.x + b.width)) && c.push(new mxPoint(d.x, m.y));
      l ? m.y = d.y : m.x = d.x;
      for (r = 0; r < p.length; r++)
        l = !l, d = p[r], l ? m.y = d.y : m.x = d.x, c.push(m.clone());
    } else
      d = m, l = !0;
    m = f[n];
    null == m && null != g && (m = new mxPoint(a.view.getRoutingCenterX(g), a.view.getRoutingCenterY(g)));
    null != m && null != d && (l && (null != f[n] && f[n].y != d.y || null == f[n] && null != g && (d.y < g.y || d.y > g.y + g.height)) ? c.push(new mxPoint(m.x, d.y)) : !l && (null != f[n] && f[n].x != d.x || null == f[n] && null != g && (d.x < g.x || d.x > g.x + g.width)) && c.push(new mxPoint(d.x, m.y)));
    if (null == f[0] && null != b)
      for (; 0 < c.length && null != c[0] && mxUtils.contains(b, c[0].x, c[0].y);)
        c.splice(0, 1);
    if (null == f[n] && null != g)
      for (; 0 < c.length && null != c[c.length - 1] && mxUtils.contains(g, c[c.length - 1].x, c[c.length - 1].y);)
        c.splice(c.length - 1, 1);
    for (r = 0; r < c.length; r++)
      if (f = c[r], f.x = Math.round(f.x * a.view.scale * 10) / 10, f.y = Math.round(f.y * a.view.scale * 10) / 10, null == k || 1 <= Math.abs(k.x - f.x) || Math.abs(k.y - f.y) >= Math.max(1, a.view.scale))
        e.push(f), k = f;
    null != q && null != e[e.length - 1] && 1 >= Math.abs(q.x - e[e.length - 1].x) && 1 >= Math.abs(q.y - e[e.length - 1].y) && (e.splice(e.length - 1, 1), null != e[e.length - 1] && (1 > Math.abs(e[e.length - 1].x - q.x) && (e[e.length - 1].x = q.x), 1 > Math.abs(e[e.length - 1].y - q.y) && (e[e.length - 1].y = q.y)));
  },
  orthBuffer: 10,
  orthPointsFallback: !0,
  dirVectors: [
    [
      -1,
      0
    ],
    [
      0,
      -1
    ],
    [
      1,
      0
    ],
    [
      0,
      1
    ],
    [
      -1,
      0
    ],
    [
      0,
      -1
    ],
    [
      1,
      0
    ]
  ],
  wayPoints1: [
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ],
    [
      0,
      0
    ]
  ],
  routePatterns: [
    [
      [
        513,
        2308,
        2081,
        2562
      ],
      [
        513,
        1090,
        514,
        2184,
        2114,
        2561
      ],
      [
        513,
        1090,
        514,
        2564,
        2184,
        2562
      ],
      [
        513,
        2308,
        2561,
        1090,
        514,
        2568,
        2308
      ]
    ],
    [
      [
        514,
        1057,
        513,
        2308,
        2081,
        2562
      ],
      [
        514,
        2184,
        2114,
        2561
      ],
      [
        514,
        2184,
        2562,
        1057,
        513,
        2564,
        2184
      ],
      [
        514,
        1057,
        513,
        2568,
        2308,
        2561
      ]
    ],
    [
      [
        1090,
        514,
        1057,
        513,
        2308,
        2081,
        2562
      ],
      [
        2114,
        2561
      ],
      [
        1090,
        2562,
        1057,
        513,
        2564,
        2184
      ],
      [
        1090,
        514,
        1057,
        513,
        2308,
        2561,
        2568
      ]
    ],
    [
      [
        2081,
        2562
      ],
      [
        1057,
        513,
        1090,
        514,
        2184,
        2114,
        2561
      ],
      [
        1057,
        513,
        1090,
        514,
        2184,
        2562,
        2564
      ],
      [
        1057,
        2561,
        1090,
        514,
        2568,
        2308
      ]
    ]
  ],
  inlineRoutePatterns: [
    [
      null,
      [
        2114,
        2568
      ],
      null,
      null
    ],
    [
      null,
      [
        514,
        2081,
        2114,
        2568
      ],
      null,
      null
    ],
    [
      null,
      [
        2114,
        2561
      ],
      null,
      null
    ],
    [
      [
        2081,
        2562
      ],
      [
        1057,
        2114,
        2568
      ],
      [
        2184,
        2562
      ],
      null
    ]
  ],
  vertexSeperations: [],
  limits: [
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
  ],
  LEFT_MASK: 32,
  TOP_MASK: 64,
  RIGHT_MASK: 128,
  BOTTOM_MASK: 256,
  LEFT: 1,
  TOP: 2,
  RIGHT: 4,
  BOTTOM: 8,
  SIDE_MASK: 480,
  CENTER_MASK: 512,
  SOURCE_MASK: 1024,
  TARGET_MASK: 2048,
  VERTEX_MASK: 3072,
  getJettySize: function(a, b) {
    var c = mxUtils.getValue(a.style, b ? mxConstants.STYLE_SOURCE_JETTY_SIZE : mxConstants.STYLE_TARGET_JETTY_SIZE, mxUtils.getValue(a.style, mxConstants.STYLE_JETTY_SIZE, mxEdgeStyle.orthBuffer));
    'auto' == c && (mxUtils.getValue(a.style, b ? mxConstants.STYLE_STARTARROW : mxConstants.STYLE_ENDARROW, mxConstants.NONE) != mxConstants.NONE ? (a = mxUtils.getNumber(a.style, b ? mxConstants.STYLE_STARTSIZE : mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE), c = Math.max(2, Math.ceil((a + mxEdgeStyle.orthBuffer) / mxEdgeStyle.orthBuffer)) * mxEdgeStyle.orthBuffer) : c = 2 * mxEdgeStyle.orthBuffer);
    return c;
  },
  scalePointArray: function(a, b) {
    var c = [];
    if (null != a)
      for (var d = 0; d < a.length; d++)
        if (null != a[d]) {
          var e = new mxPoint(Math.round(a[d].x / b * 10) / 10, Math.round(a[d].y / b * 10) / 10);
          c[d] = e;
        } else
          c[d] = null;
    else
      c = null;
    return c;
  },
  scaleCellState: function(a, b) {
    if (null != a) {
      var c = a.clone();
      c.setRect(Math.round(a.x / b * 10) / 10, Math.round(a.y / b * 10) / 10, Math.round(a.width / b * 10) / 10, Math.round(a.height / b * 10) / 10);
    } else
      c = null;
    return c;
  },
  OrthConnector: function(a, b, c, d, e) {
    var f = a.view.graph,
      g = null == l ? !1 : f.getModel().isEdge(l.cell),
      k = null == m ? !1 : f.getModel().isEdge(m.cell);
    f = mxEdgeStyle.scalePointArray(a.absolutePoints, a.view.scale);
    var l = mxEdgeStyle.scaleCellState(b, a.view.scale),
      m = mxEdgeStyle.scaleCellState(c, a.view.scale),
      n = f[0],
      p = f[f.length - 1],
      r = null != l ? l.x : n.x,
      q = null != l ? l.y : n.y,
      t = null != l ? l.width : 0,
      u = null != l ? l.height : 0,
      x = null != m ? m.x : p.x,
      A = null != m ? m.y : p.y,
      E = null != m ? m.width : 0,
      C = null != m ? m.height : 0;
    f = mxEdgeStyle.getJettySize(a, !0);
    var D = mxEdgeStyle.getJettySize(a, !1);
    null != l && m == l && (f = D = Math.max(f, D));
    var B = D + f,
      v = !1;
    if (null != n && null != p) {
      v = p.x - n.x;
      var y = p.y - n.y;
      v = v * v + y * y < B * B;
    }
    if (v || mxEdgeStyle.orthPointsFallback && null != d && 0 < d.length || g || k)
      mxEdgeStyle.SegmentConnector(a, b, c, d, e);
    else {
      c = [
        mxConstants.DIRECTION_MASK_ALL,
        mxConstants.DIRECTION_MASK_ALL
      ];
      null != l && (c[0] = mxUtils.getPortConstraints(l, a, !0, mxConstants.DIRECTION_MASK_ALL), b = mxUtils.getValue(l.style, mxConstants.STYLE_ROTATION, 0), 0 != b && (b = mxUtils.getBoundingBox(new mxRectangle(r, q, t, u), b), r = b.x, q = b.y, t = b.width, u = b.height));
      null != m && (c[1] = mxUtils.getPortConstraints(m, a, !1, mxConstants.DIRECTION_MASK_ALL), b = mxUtils.getValue(m.style, mxConstants.STYLE_ROTATION, 0), 0 != b && (b = mxUtils.getBoundingBox(new mxRectangle(x, A, E, C), b), x = b.x, A = b.y, E = b.width, C = b.height));
      b = [
        0,
        0
      ];
      r = [
        [
          r,
          q,
          t,
          u
        ],
        [
          x,
          A,
          E,
          C
        ]
      ];
      D = [
        f,
        D
      ];
      for (v = 0; 2 > v; v++)
        mxEdgeStyle.limits[v][1] = r[v][0] - D[v], mxEdgeStyle.limits[v][2] = r[v][1] - D[v], mxEdgeStyle.limits[v][4] = r[v][0] + r[v][2] + D[v], mxEdgeStyle.limits[v][8] = r[v][1] + r[v][3] + D[v];
      D = r[0][1] + r[0][3] / 2;
      q = r[1][1] + r[1][3] / 2;
      v = r[0][0] + r[0][2] / 2 - (r[1][0] + r[1][2] / 2);
      y = D - q;
      D = 0;
      0 > v ? D = 0 > y ? 2 : 1 : 0 >= y && (D = 3, 0 == v && (D = 2));
      q = null;
      null != l && (q = n);
      l = [
        [
          0.5,
          0.5
        ],
        [
          0.5,
          0.5
        ]
      ];
      for (v = 0; 2 > v; v++)
        null != q && (l[v][0] = (q.x - r[v][0]) / r[v][2], 1 >= Math.abs(q.x - r[v][0]) ? b[v] = mxConstants.DIRECTION_MASK_WEST : 1 >= Math.abs(q.x - r[v][0] - r[v][2]) && (b[v] = mxConstants.DIRECTION_MASK_EAST), l[v][1] = (q.y - r[v][1]) / r[v][3], 1 >= Math.abs(q.y - r[v][1]) ? b[v] = mxConstants.DIRECTION_MASK_NORTH : 1 >= Math.abs(q.y - r[v][1] - r[v][3]) && (b[v] = mxConstants.DIRECTION_MASK_SOUTH)), q = null, null != m && (q = p);
      v = r[0][1] - (r[1][1] + r[1][3]);
      p = r[0][0] - (r[1][0] + r[1][2]);
      q = r[1][1] - (r[0][1] + r[0][3]);
      t = r[1][0] - (r[0][0] + r[0][2]);
      mxEdgeStyle.vertexSeperations[1] = Math.max(p - B, 0);
      mxEdgeStyle.vertexSeperations[2] = Math.max(v - B, 0);
      mxEdgeStyle.vertexSeperations[4] = Math.max(q - B, 0);
      mxEdgeStyle.vertexSeperations[3] = Math.max(t - B, 0);
      B = [];
      m = [];
      n = [];
      m[0] = p >= t ? mxConstants.DIRECTION_MASK_WEST : mxConstants.DIRECTION_MASK_EAST;
      n[0] = v >= q ? mxConstants.DIRECTION_MASK_NORTH : mxConstants.DIRECTION_MASK_SOUTH;
      m[1] = mxUtils.reversePortConstraints(m[0]);
      n[1] = mxUtils.reversePortConstraints(n[0]);
      p = p >= t ? p : t;
      q = v >= q ? v : q;
      t = [
        [
          0,
          0
        ],
        [
          0,
          0
        ]
      ];
      u = !1;
      for (v = 0; 2 > v; v++)
        0 == b[v] && (0 == (m[v] & c[v]) && (m[v] = mxUtils.reversePortConstraints(m[v])), 0 == (n[v] & c[v]) && (n[v] = mxUtils.reversePortConstraints(n[v])), t[v][0] = n[v], t[v][1] = m[v]);
      0 < q && 0 < p && (0 < (m[0] & c[0]) && 0 < (n[1] & c[1]) ? (t[0][0] = m[0], t[0][1] = n[0], t[1][0] = n[1], t[1][1] = m[1], u = !0) : 0 < (n[0] & c[0]) && 0 < (m[1] & c[1]) && (t[0][0] = n[0], t[0][1] = m[0], t[1][0] = m[1], t[1][1] = n[1], u = !0));
      0 < q && !u && (t[0][0] = n[0], t[0][1] = m[0], t[1][0] = n[1], t[1][1] = m[1], u = !0);
      0 < p && !u && (t[0][0] = m[0], t[0][1] = n[0], t[1][0] = m[1], t[1][1] = n[1]);
      for (v = 0; 2 > v; v++)
        0 == b[v] && (0 == (t[v][0] & c[v]) && (t[v][0] = t[v][1]), B[v] = t[v][0] & c[v], B[v] |= (t[v][1] & c[v]) << 8, B[v] |= (t[1 - v][v] & c[v]) << 16, B[v] |= (t[1 - v][1 - v] & c[v]) << 24, 0 == (B[v] & 15) && (B[v] <<= 8), 0 == (B[v] & 3840) && (B[v] = B[v] & 15 | B[v] >> 8), 0 == (B[v] & 983040) && (B[v] = B[v] & 65535 | (B[v] & 251658240) >> 8), b[v] = B[v] & 15, c[v] == mxConstants.DIRECTION_MASK_WEST || c[v] == mxConstants.DIRECTION_MASK_NORTH || c[v] == mxConstants.DIRECTION_MASK_EAST || c[v] == mxConstants.DIRECTION_MASK_SOUTH) && (b[v] = c[v]);
      c = b[0] == mxConstants.DIRECTION_MASK_EAST ? 3 : b[0];
      B = b[1] == mxConstants.DIRECTION_MASK_EAST ? 3 : b[1];
      c -= D;
      B -= D;
      1 > c && (c += 4);
      1 > B && (B += 4);
      c = mxEdgeStyle.routePatterns[c - 1][B - 1];
      mxEdgeStyle.wayPoints1[0][0] = r[0][0];
      mxEdgeStyle.wayPoints1[0][1] = r[0][1];
      switch (b[0]) {
        case mxConstants.DIRECTION_MASK_WEST:
          mxEdgeStyle.wayPoints1[0][0] -= f;
          mxEdgeStyle.wayPoints1[0][1] += l[0][1] * r[0][3];
          break;
        case mxConstants.DIRECTION_MASK_SOUTH:
          mxEdgeStyle.wayPoints1[0][0] += l[0][0] * r[0][2];
          mxEdgeStyle.wayPoints1[0][1] += r[0][3] + f;
          break;
        case mxConstants.DIRECTION_MASK_EAST:
          mxEdgeStyle.wayPoints1[0][0] += r[0][2] + f;
          mxEdgeStyle.wayPoints1[0][1] += l[0][1] * r[0][3];
          break;
        case mxConstants.DIRECTION_MASK_NORTH:
          mxEdgeStyle.wayPoints1[0][0] += l[0][0] * r[0][2], mxEdgeStyle.wayPoints1[0][1] -= f;
      }
      f = 0;
      m = B = 0 < (b[0] & (mxConstants.DIRECTION_MASK_EAST | mxConstants.DIRECTION_MASK_WEST)) ? 0 : 1;
      for (v = 0; v < c.length; v++)
        n = c[v] & 15, u = n == mxConstants.DIRECTION_MASK_EAST ? 3 : n, u += D, 4 < u && (u -= 4), p = mxEdgeStyle.dirVectors[u - 1], n = 0 < u % 2 ? 0 : 1, n != B && (f++, mxEdgeStyle.wayPoints1[f][0] = mxEdgeStyle.wayPoints1[f - 1][0], mxEdgeStyle.wayPoints1[f][1] = mxEdgeStyle.wayPoints1[f - 1][1]), x = 0 < (c[v] & mxEdgeStyle.TARGET_MASK), A = 0 < (c[v] & mxEdgeStyle.SOURCE_MASK), q = (c[v] & mxEdgeStyle.SIDE_MASK) >> 5, q <<= D, 15 < q && (q >>= 4), t = 0 < (c[v] & mxEdgeStyle.CENTER_MASK), (A || x) && 9 > q ? (u = A ? 0 : 1, q = t && 0 == n ? r[u][0] + l[u][0] * r[u][2] : t ? r[u][1] + l[u][1] * r[u][3] : mxEdgeStyle.limits[u][q], 0 == n ? (q = (q - mxEdgeStyle.wayPoints1[f][0]) * p[0], 0 < q && (mxEdgeStyle.wayPoints1[f][0] += p[0] * q)) : (q = (q - mxEdgeStyle.wayPoints1[f][1]) * p[1], 0 < q && (mxEdgeStyle.wayPoints1[f][1] += p[1] * q))) : t && (mxEdgeStyle.wayPoints1[f][0] += p[0] * Math.abs(mxEdgeStyle.vertexSeperations[u] / 2), mxEdgeStyle.wayPoints1[f][1] += p[1] * Math.abs(mxEdgeStyle.vertexSeperations[u] / 2)), 0 < f && mxEdgeStyle.wayPoints1[f][n] == mxEdgeStyle.wayPoints1[f - 1][n] ? f-- : B = n;
      for (v = 0; v <= f && (v != f || ((0 < (b[1] & (mxConstants.DIRECTION_MASK_EAST | mxConstants.DIRECTION_MASK_WEST)) ? 0 : 1) == m ? 0 : 1) == (f + 1) % 2); v++)
        e.push(new mxPoint(Math.round(mxEdgeStyle.wayPoints1[v][0] * a.view.scale * 10) / 10, Math.round(mxEdgeStyle.wayPoints1[v][1] * a.view.scale * 10) / 10));
      for (a = 1; a < e.length;)
        null == e[a - 1] || null == e[a] || e[a - 1].x != e[a].x || e[a - 1].y != e[a].y ? a++ : e.splice(a, 1);
    }
  },
  getRoutePattern: function(a, b, c, d) {
    var e = a[0] == mxConstants.DIRECTION_MASK_EAST ? 3 : a[0];
    a = a[1] == mxConstants.DIRECTION_MASK_EAST ? 3 : a[1];
    e -= b;
    a -= b;
    1 > e && (e += 4);
    1 > a && (a += 4);
    b = routePatterns[e - 1][a - 1];
    0 != c && 0 != d || null == inlineRoutePatterns[e - 1][a - 1] || (b = inlineRoutePatterns[e - 1][a - 1]);
    return b;
  }
};