function mxMinimumCycleRemover(a) {
  this.layout = a;
}
mxMinimumCycleRemover.prototype = new mxHierarchicalLayoutStage();
mxMinimumCycleRemover.prototype.constructor = mxMinimumCycleRemover;
mxMinimumCycleRemover.prototype.layout = null;
mxMinimumCycleRemover.prototype.execute = function(a) {
  a = this.layout.getModel();
  for (var b = {}, c = a.vertexMapper.getValues(), d = {}, e = 0; e < c.length; e++)
    d[c[e].id] = c[e];
  c = null;
  if (null != a.roots) {
    var f = a.roots;
    c = [];
    for (e = 0; e < f.length; e++)
      c[e] = a.vertexMapper.get(f[e]);
  }
  a.visit(function(g, k, l, m, n) {
    k.isAncestor(g) && (l.invert(), mxUtils.remove(l, g.connectsAsSource), g.connectsAsTarget.push(l), mxUtils.remove(l, k.connectsAsTarget), k.connectsAsSource.push(l));
    b[k.id] = k;
    delete d[k.id];
  }, c, !0, null);
  e = mxUtils.clone(b, null, !0);
  a.visit(function(g, k, l, m, n) {
    k.isAncestor(g) && (l.invert(), mxUtils.remove(l, g.connectsAsSource), k.connectsAsSource.push(l), g.connectsAsTarget.push(l), mxUtils.remove(l, k.connectsAsTarget));
    b[k.id] = k;
    delete d[k.id];
  }, d, !0, e);
};