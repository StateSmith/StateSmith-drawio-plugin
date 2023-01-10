function mxArrow(a, b, c, d, e, f, g) {
  mxShape.call(this);
  this.points = a;
  this.fill = b;
  this.stroke = c;
  this.strokewidth = null != d ? d : 1;
  this.arrowWidth = null != e ? e : mxConstants.ARROW_WIDTH;
  this.spacing = null != f ? f : mxConstants.ARROW_SPACING;
  this.endSize = null != g ? g : mxConstants.ARROW_SIZE;
}
mxUtils.extend(mxArrow, mxShape);
mxArrow.prototype.augmentBoundingBox = function(a) {
  mxShape.prototype.augmentBoundingBox.apply(this, arguments);
  a.grow((Math.max(this.arrowWidth, this.endSize) / 2 + this.strokewidth) * this.scale);
};
mxArrow.prototype.paintEdgeShape = function(a, b) {
  var c = mxConstants.ARROW_SPACING,
    d = mxConstants.ARROW_WIDTH,
    e = b[0];
  b = b[b.length - 1];
  var f = b.x - e.x,
    g = b.y - e.y,
    k = Math.sqrt(f * f + g * g),
    l = k - 2 * c - mxConstants.ARROW_SIZE;
  f /= k;
  g /= k;
  k = d * g / 3;
  d = -d * f / 3;
  var m = e.x - k / 2 + c * f;
  e = e.y - d / 2 + c * g;
  var n = m + k,
    p = e + d,
    r = n + l * f;
  l = p + l * g;
  var q = r + k,
    t = l + d,
    u = q - 3 * k,
    x = t - 3 * d;
  a.begin();
  a.moveTo(m, e);
  a.lineTo(n, p);
  a.lineTo(r, l);
  a.lineTo(q, t);
  a.lineTo(b.x - c * f, b.y - c * g);
  a.lineTo(u, x);
  a.lineTo(u + k, x + d);
  a.close();
  a.fillAndStroke();
};