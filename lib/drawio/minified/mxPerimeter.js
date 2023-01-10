var mxPerimeter = {
  RectanglePerimeter: function(a, b, c, d) {
    b = a.getCenterX();
    var e = a.getCenterY(),
      f = Math.atan2(c.y - e, c.x - b),
      g = new mxPoint(0, 0),
      k = Math.PI,
      l = Math.PI / 2 - f,
      m = Math.atan2(a.height, a.width);
    f < -k + m || f > k - m ? (g.x = a.x, g.y = e - a.width * Math.tan(f) / 2) : f < -m ? (g.y = a.y, g.x = b - a.height * Math.tan(l) / 2) : f < m ? (g.x = a.x + a.width, g.y = e + a.width * Math.tan(f) / 2) : (g.y = a.y + a.height, g.x = b + a.height * Math.tan(l) / 2);
    d && (c.x >= a.x && c.x <= a.x + a.width ? g.x = c.x : c.y >= a.y && c.y <= a.y + a.height && (g.y = c.y), c.x < a.x ? g.x = a.x : c.x > a.x + a.width && (g.x = a.x + a.width), c.y < a.y ? g.y = a.y : c.y > a.y + a.height && (g.y = a.y + a.height));
    return g;
  },
  EllipsePerimeter: function(a, b, c, d) {
    var e = a.x,
      f = a.y,
      g = a.width / 2,
      k = a.height / 2,
      l = e + g,
      m = f + k;
    b = c.x;
    c = c.y;
    var n = parseInt(b - l),
      p = parseInt(c - m);
    if (0 == n && 0 != p)
      return new mxPoint(l, m + k * p / Math.abs(p));
    if (0 == n && 0 == p)
      return new mxPoint(b, c);
    if (d) {
      if (c >= f && c <= f + a.height)
        return a = c - m, a = Math.sqrt(g * g * (1 - a * a / (k * k))) || 0, b <= e && (a = -a), new mxPoint(l + a, c);
      if (b >= e && b <= e + a.width)
        return a = b - l, a = Math.sqrt(k * k * (1 - a * a / (g * g))) || 0, c <= f && (a = -a), new mxPoint(b, m + a);
    }
    e = p / n;
    m -= e * l;
    f = g * g * e * e + k * k;
    a = -2 * l * f;
    k = Math.sqrt(a * a - 4 * f * (g * g * e * e * l * l + k * k * l * l - g * g * k * k));
    g = (-a + k) / (2 * f);
    l = (-a - k) / (2 * f);
    k = e * g + m;
    m = e * l + m;
    Math.sqrt(Math.pow(g - b, 2) + Math.pow(k - c, 2)) < Math.sqrt(Math.pow(l - b, 2) + Math.pow(m - c, 2)) ? (b = g, c = k) : (b = l, c = m);
    return new mxPoint(b, c);
  },
  RhombusPerimeter: function(a, b, c, d) {
    b = a.x;
    var e = a.y,
      f = a.width;
    a = a.height;
    var g = b + f / 2,
      k = e + a / 2,
      l = c.x;
    c = c.y;
    if (g == l)
      return k > c ? new mxPoint(g, e) : new mxPoint(g, e + a);
    if (k == c)
      return g > l ? new mxPoint(b, k) : new mxPoint(b + f, k);
    var m = g,
      n = k;
    d && (l >= b && l <= b + f ? m = l : c >= e && c <= e + a && (n = c));
    return l < g ? c < k ? mxUtils.intersection(l, c, m, n, g, e, b, k) : mxUtils.intersection(l, c, m, n, g, e + a, b, k) : c < k ? mxUtils.intersection(l, c, m, n, g, e, b + f, k) : mxUtils.intersection(l, c, m, n, g, e + a, b + f, k);
  },
  TrianglePerimeter: function(a, b, c, d) {
    b = null != b ? b.style[mxConstants.STYLE_DIRECTION] : null;
    var e = b == mxConstants.DIRECTION_NORTH || b == mxConstants.DIRECTION_SOUTH,
      f = a.x,
      g = a.y,
      k = a.width,
      l = a.height;
    a = f + k / 2;
    var m = g + l / 2,
      n = new mxPoint(f, g),
      p = new mxPoint(f + k, m),
      r = new mxPoint(f, g + l);
    b == mxConstants.DIRECTION_NORTH ? (n = r, p = new mxPoint(a, g), r = new mxPoint(f + k, g + l)) : b == mxConstants.DIRECTION_SOUTH ? (p = new mxPoint(a, g + l), r = new mxPoint(f + k, g)) : b == mxConstants.DIRECTION_WEST && (n = new mxPoint(f + k, g), p = new mxPoint(f, m), r = new mxPoint(f + k, g + l));
    var q = c.x - a,
      t = c.y - m;
    q = e ? Math.atan2(q, t) : Math.atan2(t, q);
    t = e ? Math.atan2(k, l) : Math.atan2(l, k);
    (b == mxConstants.DIRECTION_NORTH || b == mxConstants.DIRECTION_WEST ? q > -t && q < t : q < -Math.PI + t || q > Math.PI - t) ? c = d && (e && c.x >= n.x && c.x <= r.x || !e && c.y >= n.y && c.y <= r.y) ? e ? new mxPoint(c.x, n.y) : new mxPoint(n.x, c.y) : b == mxConstants.DIRECTION_NORTH ? new mxPoint(f + k / 2 + l * Math.tan(q) / 2, g + l) : b == mxConstants.DIRECTION_SOUTH ? new mxPoint(f + k / 2 - l * Math.tan(q) / 2, g) : b == mxConstants.DIRECTION_WEST ? new mxPoint(f + k, g + l / 2 + k * Math.tan(q) / 2) : new mxPoint(f, g + l / 2 - k * Math.tan(q) / 2): (d && (d = new mxPoint(a, m), c.y >= g && c.y <= g + l ? (d.x = e ? a : b == mxConstants.DIRECTION_WEST ? f + k : f, d.y = c.y) : c.x >= f && c.x <= f + k && (d.x = c.x, d.y = e ? b == mxConstants.DIRECTION_NORTH ? g + l : g : m), a = d.x, m = d.y), c = e && c.x <= f + k / 2 || !e && c.y <= g + l / 2 ? mxUtils.intersection(c.x, c.y, a, m, n.x, n.y, p.x, p.y) : mxUtils.intersection(c.x, c.y, a, m, p.x, p.y, r.x, r.y));
    null == c && (c = new mxPoint(a, m));
    return c;
  },
  HexagonPerimeter: function(a, b, c, d) {
    var e = a.x,
      f = a.y,
      g = a.width,
      k = a.height,
      l = a.getCenterX();
    a = a.getCenterY();
    var m = c.x,
      n = c.y,
      p = -Math.atan2(n - a, m - l),
      r = Math.PI,
      q = Math.PI / 2;
    new mxPoint(l, a);
    b = null != b ? mxUtils.getValue(b.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
    var t = b == mxConstants.DIRECTION_NORTH || b == mxConstants.DIRECTION_SOUTH;
    b = new mxPoint();
    var u = new mxPoint();
    if (m < e && n < f || m < e && n > f + k || m > e + g && n < f || m > e + g && n > f + k)
      d = !1;
    if (d) {
      if (t) {
        if (m == l) {
          if (n <= f)
            return new mxPoint(l, f);
          if (n >= f + k)
            return new mxPoint(l, f + k);
        } else if (m < e) {
          if (n == f + k / 4)
            return new mxPoint(e, f + k / 4);
          if (n == f + 3 * k / 4)
            return new mxPoint(e, f + 3 * k / 4);
        } else if (m > e + g) {
          if (n == f + k / 4)
            return new mxPoint(e + g, f + k / 4);
          if (n == f + 3 * k / 4)
            return new mxPoint(e + g, f + 3 * k / 4);
        } else if (m == e) {
          if (n < a)
            return new mxPoint(e, f + k / 4);
          if (n > a)
            return new mxPoint(e, f + 3 * k / 4);
        } else if (m == e + g) {
          if (n < a)
            return new mxPoint(e + g, f + k / 4);
          if (n > a)
            return new mxPoint(e + g, f + 3 * k / 4);
        }
        if (n == f)
          return new mxPoint(l, f);
        if (n == f + k)
          return new mxPoint(l, f + k);
        m < l ? n > f + k / 4 && n < f + 3 * k / 4 ? (b = new mxPoint(e, f), u = new mxPoint(e, f + k)) : n < f + k / 4 ? (b = new mxPoint(e - Math.floor(0.5 * g), f + Math.floor(0.5 * k)), u = new mxPoint(e + g, f - Math.floor(0.25 * k))) : n > f + 3 * k / 4 && (b = new mxPoint(e - Math.floor(0.5 * g), f + Math.floor(0.5 * k)), u = new mxPoint(e + g, f + Math.floor(1.25 * k))) : m > l && (n > f + k / 4 && n < f + 3 * k / 4 ? (b = new mxPoint(e + g, f), u = new mxPoint(e + g, f + k)) : n < f + k / 4 ? (b = new mxPoint(e, f - Math.floor(0.25 * k)), u = new mxPoint(e + Math.floor(1.5 * g), f + Math.floor(0.5 * k))) : n > f + 3 * k / 4 && (b = new mxPoint(e + Math.floor(1.5 * g), f + Math.floor(0.5 * k)), u = new mxPoint(e, f + Math.floor(1.25 * k))));
      } else {
        if (n == a) {
          if (m <= e)
            return new mxPoint(e, f + k / 2);
          if (m >= e + g)
            return new mxPoint(e + g, f + k / 2);
        } else if (n < f) {
          if (m == e + g / 4)
            return new mxPoint(e + g / 4, f);
          if (m == e + 3 * g / 4)
            return new mxPoint(e + 3 * g / 4, f);
        } else if (n > f + k) {
          if (m == e + g / 4)
            return new mxPoint(e + g / 4, f + k);
          if (m == e + 3 * g / 4)
            return new mxPoint(e + 3 * g / 4, f + k);
        } else if (n == f) {
          if (m < l)
            return new mxPoint(e + g / 4, f);
          if (m > l)
            return new mxPoint(e + 3 * g / 4, f);
        } else if (n == f + k) {
          if (m < l)
            return new mxPoint(e + g / 4, f + k);
          if (n > a)
            return new mxPoint(e + 3 * g / 4, f + k);
        }
        if (m == e)
          return new mxPoint(e, a);
        if (m == e + g)
          return new mxPoint(e + g, a);
        n < a ? m > e + g / 4 && m < e + 3 * g / 4 ? (b = new mxPoint(e, f), u = new mxPoint(e + g, f)) : m < e + g / 4 ? (b = new mxPoint(e - Math.floor(0.25 * g), f + k), u = new mxPoint(e + Math.floor(0.5 * g), f - Math.floor(0.5 * k))) : m > e + 3 * g / 4 && (b = new mxPoint(e + Math.floor(0.5 * g), f - Math.floor(0.5 * k)), u = new mxPoint(e + Math.floor(1.25 * g), f + k)) : n > a && (m > e + g / 4 && m < e + 3 * g / 4 ? (b = new mxPoint(e, f + k), u = new mxPoint(e + g, f + k)) : m < e + g / 4 ? (b = new mxPoint(e - Math.floor(0.25 * g), f), u = new mxPoint(e + Math.floor(0.5 * g), f + Math.floor(1.5 * k))) : m > e + 3 * g / 4 && (b = new mxPoint(e + Math.floor(0.5 * g), f + Math.floor(1.5 * k)), u = new mxPoint(e + Math.floor(1.25 * g), f)));
      }
      d = l;
      p = a;
      m >= e && m <= e + g ? (d = m, p = n < a ? f + k : f) : n >= f && n <= f + k && (p = n, d = m < l ? e + g : e);
      c = mxUtils.intersection(d, p, c.x, c.y, b.x, b.y, u.x, u.y);
    } else {
      if (t) {
        m = Math.atan2(k / 4, g / 2);
        if (p == m)
          return new mxPoint(e + g, f + Math.floor(0.25 * k));
        if (p == q)
          return new mxPoint(e + Math.floor(0.5 * g), f);
        if (p == r - m)
          return new mxPoint(e, f + Math.floor(0.25 * k));
        if (p == -m)
          return new mxPoint(e + g, f + Math.floor(0.75 * k));
        if (p == -q)
          return new mxPoint(e + Math.floor(0.5 * g), f + k);
        if (p == -r + m)
          return new mxPoint(e, f + Math.floor(0.75 * k));
        p < m && p > -m ? (b = new mxPoint(e + g, f), u = new mxPoint(e + g, f + k)) : p > m && p < q ? (b = new mxPoint(e, f - Math.floor(0.25 * k)), u = new mxPoint(e + Math.floor(1.5 * g), f + Math.floor(0.5 * k))) : p > q && p < r - m ? (b = new mxPoint(e - Math.floor(0.5 * g), f + Math.floor(0.5 * k)), u = new mxPoint(e + g, f - Math.floor(0.25 * k))) : p > r - m && p <= r || p < -r + m && p >= -r ? (b = new mxPoint(e, f), u = new mxPoint(e, f + k)) : p < -m && p > -q ? (b = new mxPoint(e + Math.floor(1.5 * g), f + Math.floor(0.5 * k)), u = new mxPoint(e, f + Math.floor(1.25 * k))) : p < -q && p > -r + m && (b = new mxPoint(e - Math.floor(0.5 * g), f + Math.floor(0.5 * k)), u = new mxPoint(e + g, f + Math.floor(1.25 * k)));
      } else {
        m = Math.atan2(k / 2, g / 4);
        if (p == m)
          return new mxPoint(e + Math.floor(0.75 * g), f);
        if (p == r - m)
          return new mxPoint(e + Math.floor(0.25 * g), f);
        if (p == r || p == -r)
          return new mxPoint(e, f + Math.floor(0.5 * k));
        if (0 == p)
          return new mxPoint(e + g, f + Math.floor(0.5 * k));
        if (p == -m)
          return new mxPoint(e + Math.floor(0.75 * g), f + k);
        if (p == -r + m)
          return new mxPoint(e + Math.floor(0.25 * g), f + k);
        0 < p && p < m ? (b = new mxPoint(e + Math.floor(0.5 * g), f - Math.floor(0.5 * k)), u = new mxPoint(e + Math.floor(1.25 * g), f + k)) : p > m && p < r - m ? (b = new mxPoint(e, f), u = new mxPoint(e + g, f)) : p > r - m && p < r ? (b = new mxPoint(e - Math.floor(0.25 * g), f + k), u = new mxPoint(e + Math.floor(0.5 * g), f - Math.floor(0.5 * k))) : 0 > p && p > -m ? (b = new mxPoint(e + Math.floor(0.5 * g), f + Math.floor(1.5 * k)), u = new mxPoint(e + Math.floor(1.25 * g), f)) : p < -m && p > -r + m ? (b = new mxPoint(e, f + k), u = new mxPoint(e + g, f + k)) : p < -r + m && p > -r && (b = new mxPoint(e - Math.floor(0.25 * g), f), u = new mxPoint(e + Math.floor(0.5 * g), f + Math.floor(1.5 * k)));
      }
      c = mxUtils.intersection(l, a, c.x, c.y, b.x, b.y, u.x, u.y);
    }
    return null == c ? new mxPoint(l, a) : c;
  }
};