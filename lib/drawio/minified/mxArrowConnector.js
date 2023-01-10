function mxArrowConnector(a, b, c, d, e, f, g) {
  mxShape.call(this);
  this.points = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
  this.arrowWidth = null != e ? e : mxConstants.ARROW_WIDTH;
  this.arrowSpacing = null != f ? f : mxConstants.ARROW_SPACING;
  this.startSize = mxConstants.ARROW_SIZE / 5;
  this.endSize = mxConstants.ARROW_SIZE / 5;
}
mxUtils.extend(mxArrowConnector, mxShape);
mxArrowConnector.prototype.useSvgBoundingBox = !0;
mxArrowConnector.prototype.isRoundable = function() {
  return !0;
};
mxArrowConnector.prototype.resetStyles = function() {
  mxShape.prototype.resetStyles.apply(this, arguments);
  this.arrowSpacing = mxConstants.ARROW_SPACING;
};
mxArrowConnector.prototype.apply = function(a) {
  mxShape.prototype.apply.apply(this, arguments);
  null != this.style && (this.startSize = 3 * mxUtils.getNumber(this.style, mxConstants.STYLE_STARTSIZE, mxConstants.ARROW_SIZE / 5), this.endSize = 3 * mxUtils.getNumber(this.style, mxConstants.STYLE_ENDSIZE, mxConstants.ARROW_SIZE / 5));
};
mxArrowConnector.prototype.augmentBoundingBox = function(a) {
  mxShape.prototype.augmentBoundingBox.apply(this, arguments);
  var b = this.getEdgeWidth();
  this.isMarkerStart() && (b = Math.max(b, this.getStartArrowWidth()));
  this.isMarkerEnd() && (b = Math.max(b, this.getEndArrowWidth()));
  a.grow((b / 2 + this.strokewidth) * this.scale);
};
mxArrowConnector.prototype.paintEdgeShape = function(a, b) {
  var c = this.strokewidth;
  this.outline && (c = Math.max(1, mxUtils.getNumber(this.style, mxConstants.STYLE_STROKEWIDTH, this.strokewidth)));
  var d = this.getStartArrowWidth() + c,
    e = this.getEndArrowWidth() + c,
    f = this.outline ? this.getEdgeWidth() + c : this.getEdgeWidth(),
    g = this.isOpenEnded(),
    k = this.isMarkerStart(),
    l = this.isMarkerEnd(),
    m = g ? 0 : this.arrowSpacing + c / 2,
    n = this.startSize + c;
  c = this.endSize + c;
  var p = this.isArrowRounded(),
    r = b[b.length - 1],
    q = b[1].x - b[0].x,
    t = b[1].y - b[0].y,
    u = Math.sqrt(q * q + t * t);
  if (0 != u) {
    var x = q / u,
      A = x,
      E = t / u,
      C = E;
    u = f * E;
    var D = -f * x,
      B = [];
    p ? a.setLineJoin('round') : 2 < b.length && a.setMiterLimit(1.42);
    a.begin();
    q = x;
    t = E;
    if (k && !g)
      this.paintMarker(a, b[0].x, b[0].y, x, E, n, d, f, m, !0);
    else {
      var v = b[0].x + u / 2 + m * x,
        y = b[0].y + D / 2 + m * E,
        F = b[0].x - u / 2 + m * x,
        H = b[0].y - D / 2 + m * E;
      g ? (a.moveTo(v, y), B.push(function() {
        a.lineTo(F, H);
      })) : (a.moveTo(F, H), a.lineTo(v, y));
    }
    var G = y = v = 0;
    for (u = 0; u < b.length - 2; u++)
      if (D = mxUtils.relativeCcw(b[u].x, b[u].y, b[u + 1].x, b[u + 1].y, b[u + 2].x, b[u + 2].y), v = b[u + 2].x - b[u + 1].x, y = b[u + 2].y - b[u + 1].y, G = Math.sqrt(v * v + y * y), 0 != G) {
        A = v / G;
        C = y / G;
        G = Math.max(Math.sqrt((x * A + E * C + 1) / 2), 0.04);
        v = x + A;
        y = E + C;
        var z = Math.sqrt(v * v + y * y);
        if (0 != z) {
          v /= z;
          y /= z;
          z = Math.max(G, Math.min(this.strokewidth / 200 + 0.04, 0.35));
          G = 0 != D && p ? Math.max(0.1, z) : Math.max(G, 0.06);
          var J = b[u + 1].x + y * f / 2 / G,
            I = b[u + 1].y - v * f / 2 / G;
          y = b[u + 1].x - y * f / 2 / G;
          v = b[u + 1].y + v * f / 2 / G;
          0 != D && p ? -1 == D ? (D = y + C * f, G = v - A * f, a.lineTo(y + E * f, v - x * f), a.quadTo(J, I, D, G), function(K, L) {
            B.push(function() {
              a.lineTo(K, L);
            });
          }(y, v)) : (a.lineTo(J, I), function(K, L) {
            var O = J - E * f,
              P = I + x * f,
              Q = J - C * f,
              R = I + A * f;
            B.push(function() {
              a.quadTo(K, L, O, P);
            });
            B.push(function() {
              a.lineTo(Q, R);
            });
          }(y, v)) : (a.lineTo(J, I), function(K, L) {
            B.push(function() {
              a.lineTo(K, L);
            });
          }(y, v));
          x = A;
          E = C;
        }
      }
    u = f * C;
    D = -f * A;
    if (l && !g)
      this.paintMarker(a, r.x, r.y, -x, -E, c, e, f, m, !1);
    else {
      a.lineTo(r.x - m * A + u / 2, r.y - m * C + D / 2);
      var M = r.x - m * A - u / 2,
        N = r.y - m * C - D / 2;
      g ? (a.moveTo(M, N), B.splice(0, 0, function() {
        a.moveTo(M, N);
      })) : a.lineTo(M, N);
    }
    for (u = B.length - 1; 0 <= u; u--)
      B[u]();
    g ? (a.end(), a.stroke()) : (a.close(), a.fillAndStroke());
    a.setShadow(!1);
    a.setMiterLimit(4);
    p && a.setLineJoin('flat');
    2 < b.length && (a.setMiterLimit(4), k && !g && (a.begin(), this.paintMarker(a, b[0].x, b[0].y, q, t, n, d, f, m, !0), a.stroke(), a.end()), l && !g && (a.begin(), this.paintMarker(a, r.x, r.y, -x, -E, c, e, f, m, !0), a.stroke(), a.end()));
  }
};
mxArrowConnector.prototype.paintMarker = function(a, b, c, d, e, f, g, k, l, m) {
  g = k / g;
  var n = k * e / 2;
  k = -k * d / 2;
  var p = (l + f) * d;
  f = (l + f) * e;
  m ? a.moveTo(b - n + p, c - k + f) : a.lineTo(b - n + p, c - k + f);
  a.lineTo(b - n / g + p, c - k / g + f);
  a.lineTo(b + l * d, c + l * e);
  a.lineTo(b + n / g + p, c + k / g + f);
  a.lineTo(b + n + p, c + k + f);
};
mxArrowConnector.prototype.isArrowRounded = function() {
  return this.isRounded;
};
mxArrowConnector.prototype.getStartArrowWidth = function() {
  return mxConstants.ARROW_WIDTH;
};
mxArrowConnector.prototype.getEndArrowWidth = function() {
  return mxConstants.ARROW_WIDTH;
};
mxArrowConnector.prototype.getEdgeWidth = function() {
  return mxConstants.ARROW_WIDTH / 3;
};
mxArrowConnector.prototype.isOpenEnded = function() {
  return !1;
};
mxArrowConnector.prototype.isMarkerStart = function() {
  return mxUtils.getValue(this.style, mxConstants.STYLE_STARTARROW, mxConstants.NONE) != mxConstants.NONE;
};
mxArrowConnector.prototype.isMarkerEnd = function() {
  return mxUtils.getValue(this.style, mxConstants.STYLE_ENDARROW, mxConstants.NONE) != mxConstants.NONE;
};