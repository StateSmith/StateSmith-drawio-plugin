function mxCloud(a, b, c, d) {
  mxActor.call(this);
  this.bounds = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
}
mxUtils.extend(mxCloud, mxActor);
mxCloud.prototype.redrawPath = function(a, b, c, d, e) {
  a.moveTo(0.25 * d, 0.25 * e);
  a.curveTo(0.05 * d, 0.25 * e, 0, 0.5 * e, 0.16 * d, 0.55 * e);
  a.curveTo(0, 0.66 * e, 0.18 * d, 0.9 * e, 0.31 * d, 0.8 * e);
  a.curveTo(0.4 * d, e, 0.7 * d, e, 0.8 * d, 0.8 * e);
  a.curveTo(d, 0.8 * e, d, 0.6 * e, 0.875 * d, 0.5 * e);
  a.curveTo(d, 0.3 * e, 0.8 * d, 0.1 * e, 0.625 * d, 0.2 * e);
  a.curveTo(0.5 * d, 0.05 * e, 0.3 * d, 0.05 * e, 0.25 * d, 0.25 * e);
  a.close();
};