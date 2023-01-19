function mxSwimlaneOrdering(a) {
  this.layout = a;
}
mxSwimlaneOrdering.prototype = new mxHierarchicalLayoutStage();
mxSwimlaneOrdering.prototype.constructor = mxSwimlaneOrdering;
mxSwimlaneOrdering.prototype.layout = null;
mxSwimlaneOrdering.prototype.execute = function(a) {
  a = this.layout.getModel();
  var b = mxUtils.clone(a.vertexMapper, null, !0),
    c = null;
  if (null != a.roots) {
    var d = a.roots;
    c = [];
    for (var e = 0; e < d.length; e++)
      c[e] = a.vertexMapper.get(d[e]);
  }
  a.visit(function(f, g, k, l, m) {
    l = null != f && f.swimlaneIndex == g.swimlaneIndex && g.isAncestor(f);
    m = null != f && null != k && f.swimlaneIndex < g.swimlaneIndex && k.source == g;
    l ? (k.invert(), mxUtils.remove(k, f.connectsAsSource), g.connectsAsSource.push(k), f.connectsAsTarget.push(k), mxUtils.remove(k, g.connectsAsTarget)) : m && (k.invert(), mxUtils.remove(k, f.connectsAsTarget), g.connectsAsTarget.push(k), f.connectsAsSource.push(k), mxUtils.remove(k, g.connectsAsSource));
    f = mxCellPath.create(g.cell);
    delete b[f];
  }, c, !0, null);
};