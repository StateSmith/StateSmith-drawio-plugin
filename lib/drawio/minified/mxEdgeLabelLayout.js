function mxEdgeLabelLayout(a, b) {
  mxGraphLayout.call(this, a);
}
mxEdgeLabelLayout.prototype = new mxGraphLayout();
mxEdgeLabelLayout.prototype.constructor = mxEdgeLabelLayout;
mxEdgeLabelLayout.prototype.execute = function(a) {
  for (var b = this.graph.view, c = this.graph.getModel(), d = [], e = [], f = c.getChildCount(a), g = 0; g < f; g++) {
    var k = c.getChildAt(a, g),
      l = b.getState(k);
    null != l && (this.isVertexIgnored(k) ? this.isEdgeIgnored(k) || d.push(l) : e.push(l));
  }
  this.placeLabels(e, d);
};
mxEdgeLabelLayout.prototype.placeLabels = function(a, b) {
  var c = this.graph.getModel();
  c.beginUpdate();
  try {
    for (var d = 0; d < b.length; d++) {
      var e = b[d];
      if (null != e && null != e.text && null != e.text.boundingBox)
        for (var f = 0; f < a.length; f++) {
          var g = a[f];
          null != g && this.avoid(e, g);
        }
    }
  } finally {
    c.endUpdate();
  }
};
mxEdgeLabelLayout.prototype.avoid = function(a, b) {
  var c = this.graph.getModel(),
    d = a.text.boundingBox;
  if (mxUtils.intersects(d, b)) {
    var e = -d.y - d.height + b.y,
      f = -d.y + b.y + b.height;
    e = Math.abs(e) < Math.abs(f) ? e : f;
    f = -d.x - d.width + b.x;
    b = -d.x + b.x + b.width;
    b = Math.abs(f) < Math.abs(b) ? f : b;
    Math.abs(b) < Math.abs(e) ? e = 0 : b = 0;
    d = c.getGeometry(a.cell);
    null != d && (d = d.clone(), null != d.offset ? (d.offset.x += b, d.offset.y += e) : d.offset = new mxPoint(b, e), c.setGeometry(a.cell, d));
  }
};