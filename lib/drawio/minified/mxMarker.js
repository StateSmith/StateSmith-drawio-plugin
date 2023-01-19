var mxMarker = {
  markers: [],
  addMarker: function(a, b) {
    mxMarker.markers[a] = b;
  },
  createMarker: function(a, b, c, d, e, f, g, k, l, m) {
    var n = mxMarker.markers[c];
    return null != n ? n(a, b, c, d, e, f, g, k, l, m) : null;
  }
};
(function() {
  function a(d) {
    d = null != d ? d : 2;
    return function(e, f, g, k, l, m, n, p, r, q) {
      f = l * r * 1.118;
      p = m * r * 1.118;
      l *= n + r;
      m *= n + r;
      var t = k.clone();
      t.x -= f;
      t.y -= p;
      n = g != mxConstants.ARROW_CLASSIC && g != mxConstants.ARROW_CLASSIC_THIN ? 1 : 0.75;
      k.x += -l * n - f;
      k.y += -m * n - p;
      return function() {
        e.begin();
        e.moveTo(t.x, t.y);
        e.lineTo(t.x - l - m / d, t.y - m + l / d);
        g != mxConstants.ARROW_CLASSIC && g != mxConstants.ARROW_CLASSIC_THIN || e.lineTo(t.x - 3 * l / 4, t.y - 3 * m / 4);
        e.lineTo(t.x + m / d - l, t.y - m - l / d);
        e.close();
        q ? e.fillAndStroke() : e.stroke();
      };
    };
  }

  function b(d) {
    d = null != d ? d : 2;
    return function(e, f, g, k, l, m, n, p, r, q) {
      f = l * r * 1.118;
      g = m * r * 1.118;
      l *= n + r;
      m *= n + r;
      var t = k.clone();
      t.x -= f;
      t.y -= g;
      k.x += 2 * -f;
      k.y += 2 * -g;
      return function() {
        e.begin();
        e.moveTo(t.x - l - m / d, t.y - m + l / d);
        e.lineTo(t.x, t.y);
        e.lineTo(t.x + m / d - l, t.y - m - l / d);
        e.stroke();
      };
    };
  }

  function c(d, e, f, g, k, l, m, n, p, r) {
    n = f == mxConstants.ARROW_DIAMOND ? 0.7071 : 0.9862;
    e = k * p * n;
    n *= l * p;
    k *= m + p;
    l *= m + p;
    var q = g.clone();
    q.x -= e;
    q.y -= n;
    g.x += -k - e;
    g.y += -l - n;
    var t = f == mxConstants.ARROW_DIAMOND ? 2 : 3.4;
    return function() {
      d.begin();
      d.moveTo(q.x, q.y);
      d.lineTo(q.x - k / 2 - l / t, q.y + k / t - l / 2);
      d.lineTo(q.x - k, q.y - l);
      d.lineTo(q.x - k / 2 + l / t, q.y - l / 2 - k / t);
      d.close();
      r ? d.fillAndStroke() : d.stroke();
    };
  }
  mxMarker.addMarker('classic', a(2));
  mxMarker.addMarker('classicThin', a(3));
  mxMarker.addMarker('block', a(2));
  mxMarker.addMarker('blockThin', a(3));
  mxMarker.addMarker('open', b(2));
  mxMarker.addMarker('openThin', b(3));
  mxMarker.addMarker('oval', function(d, e, f, g, k, l, m, n, p, r) {
    var q = m / 2,
      t = g.clone();
    g.x -= k * q;
    g.y -= l * q;
    return function() {
      d.ellipse(t.x - q, t.y - q, m, m);
      r ? d.fillAndStroke() : d.stroke();
    };
  });
  mxMarker.addMarker('baseDash', function(d, e, f, g, k, l, m, n, p, r) {
    var q = k * (m + p + 1),
      t = l * (m + p + 1);
    return function() {
      d.begin();
      d.moveTo(g.x - t / 2, g.y + q / 2);
      d.lineTo(g.x + t / 2, g.y - q / 2);
      d.stroke();
    };
  });
  mxMarker.addMarker('doubleBlock', function(d, e, f, g, k, l, m, n, p, r) {
    e = k * p * 1.118;
    n = l * p * 1.118;
    k *= m + p;
    l *= m + p;
    var q = g.clone();
    q.x -= e;
    q.y -= n;
    f = f != mxConstants.ARROW_CLASSIC && f != mxConstants.ARROW_CLASSIC_THIN ? 1 : 0.75;
    g.x += -k * f * 2 - e;
    g.y += -l * f * 2 - n;
    return function() {
      d.begin();
      d.moveTo(q.x, q.y);
      d.lineTo(q.x - k - l / 2, q.y - l + k / 2);
      d.lineTo(q.x + l / 2 - k, q.y - l - k / 2);
      d.close();
      d.moveTo(q.x - k, q.y - l);
      d.lineTo(q.x - 2 * k - 0.5 * l, q.y + 0.5 * k - 2 * l);
      d.lineTo(q.x - 2 * k + 0.5 * l, q.y - 0.5 * k - 2 * l);
      d.close();
      r ? d.fillAndStroke() : d.stroke();
    };
  });
  mxMarker.addMarker('diamond', c);
  mxMarker.addMarker('diamondThin', c);
}());