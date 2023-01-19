var mxEffects = {
  animateChanges: function(a, b, c) {
    var d = 0,
      e = function() {
        for (var g = !1, k = 0; k < b.length; k++) {
          var l = b[k];
          if (l instanceof mxGeometryChange || l instanceof mxTerminalChange || l instanceof mxValueChange || l instanceof mxChildChange || l instanceof mxStyleChange) {
            var m = a.getView().getState(l.cell || l.child, !1);
            if (null != m)
              if (g = !0, l.constructor != mxGeometryChange || a.model.isEdge(l.cell))
                mxUtils.setOpacity(m.shape.node, 100 * d / 10);
              else {
                var n = a.getView().scale,
                  p = (l.geometry.x - l.previous.x) * n,
                  r = (l.geometry.y - l.previous.y) * n,
                  q = (l.geometry.width - l.previous.width) * n;
                n *= l.geometry.height - l.previous.height;
                0 == d ? (m.x -= p, m.y -= r, m.width -= q, m.height -= n) : (m.x += p / 10, m.y += r / 10, m.width += q / 10, m.height += n / 10);
                a.cellRenderer.redraw(m);
                mxEffects.cascadeOpacity(a, l.cell, 100 * d / 10);
              }
          }
        }
        10 > d && g ? (d++, window.setTimeout(e, f)) : null != c && c();
      },
      f = 30;
    e();
  },
  cascadeOpacity: function(a, b, c) {
    for (var d = a.model.getChildCount(b), e = 0; e < d; e++) {
      var f = a.model.getChildAt(b, e),
        g = a.getView().getState(f);
      null != g && (mxUtils.setOpacity(g.shape.node, c), mxEffects.cascadeOpacity(a, f, c));
    }
    b = a.model.getEdges(b);
    if (null != b)
      for (e = 0; e < b.length; e++)
        d = a.getView().getState(b[e]), null != d && mxUtils.setOpacity(d.shape.node, c);
  },
  fadeOut: function(a, b, c, d, e, f) {
    d = d || 40;
    e = e || 30;
    var g = b || 100;
    mxUtils.setOpacity(a, g);
    if (f || null == f) {
      var k = function() {
        g = Math.max(g - d, 0);
        mxUtils.setOpacity(a, g);
        0 < g ? window.setTimeout(k, e) : (a.style.visibility = 'hidden', c && a.parentNode && a.parentNode.removeChild(a));
      };
      window.setTimeout(k, e);
    } else
      a.style.visibility = 'hidden', c && a.parentNode && a.parentNode.removeChild(a);
  }
};