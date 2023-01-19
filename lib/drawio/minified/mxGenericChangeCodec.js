var mxGenericChangeCodec = function(a, b) {
  a = new mxObjectCodec(a, [
    'model',
    'previous'
  ], ['cell']);
  a.afterDecode = function(c, d, e) {
    mxUtils.isNode(e.cell) && (e.cell = c.decodeCell(e.cell, !1));
    e.previous = e[b];
    return e;
  };
  return a;
};
mxCodecRegistry.register(mxGenericChangeCodec(new mxValueChange(), 'value'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxStyleChange(), 'style'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxGeometryChange(), 'geometry'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxCollapseChange(), 'collapsed'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxVisibleChange(), 'visible'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxCellAttributeChange(), 'value'));
mxCodecRegistry.register(function() {
  return new mxObjectCodec(new mxGraph(), 'graphListeners eventListeners view container cellRenderer editor selection'.split(' '));
}());
mxCodecRegistry.register(function() {
  var a = new mxObjectCodec(new mxGraphView());
  a.encode = function(b, c) {
    return this.encodeCell(b, c, c.graph.getModel().getRoot());
  };
  a.encodeCell = function(b, c, d) {
    var e = c.graph.getModel(),
      f = c.getState(d),
      g = e.getParent(d);
    if (null == g || null != f) {
      var k = e.getChildCount(d),
        l = c.graph.getCellGeometry(d),
        m = null;
      g == e.getRoot() ? m = 'layer' : null == g ? m = 'graph' : e.isEdge(d) ? m = 'edge' : 0 < k && null != l ? m = 'group' : e.isVertex(d) && (m = 'vertex');
      if (null != m) {
        var n = b.document.createElement(m);
        null != c.graph.getLabel(d) && (n.setAttribute('label', c.graph.getLabel(d)), c.graph.isHtmlLabel(d) && n.setAttribute('html', !0));
        if (null == g) {
          var p = c.getGraphBounds();
          null != p && (n.setAttribute('x', Math.round(p.x)), n.setAttribute('y', Math.round(p.y)), n.setAttribute('width', Math.round(p.width)), n.setAttribute('height', Math.round(p.height)));
          n.setAttribute('scale', c.scale);
        } else if (null != f && null != l) {
          for (p in f.style)
            g = f.style[p], 'function' == typeof g && 'object' == typeof g && (g = mxStyleRegistry.getName(g)), null != g && 'function' != typeof g && 'object' != typeof g && n.setAttribute(p, g);
          g = f.absolutePoints;
          if (null != g && 0 < g.length) {
            l = Math.round(g[0].x) + ',' + Math.round(g[0].y);
            for (p = 1; p < g.length; p++)
              l += ' ' + Math.round(g[p].x) + ',' + Math.round(g[p].y);
            n.setAttribute('points', l);
          } else
            n.setAttribute('x', Math.round(f.x)), n.setAttribute('y', Math.round(f.y)), n.setAttribute('width', Math.round(f.width)), n.setAttribute('height', Math.round(f.height));
          p = f.absoluteOffset;
          null != p && (0 != p.x && n.setAttribute('dx', Math.round(p.x)), 0 != p.y && n.setAttribute('dy', Math.round(p.y)));
        }
        for (p = 0; p < k; p++)
          f = this.encodeCell(b, c, e.getChildAt(d, p)), null != f && n.appendChild(f);
      }
    }
    return n;
  };
  return a;
}());