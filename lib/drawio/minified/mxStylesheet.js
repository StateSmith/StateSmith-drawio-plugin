function mxStylesheet() {
  this.styles = {};
  this.putDefaultVertexStyle(this.createDefaultVertexStyle());
  this.putDefaultEdgeStyle(this.createDefaultEdgeStyle());
}
mxStylesheet.prototype.createDefaultVertexStyle = function() {
  var a = {};
  a[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
  a[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
  a[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  a[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  a[mxConstants.STYLE_FILLCOLOR] = '#C3D9FF';
  a[mxConstants.STYLE_STROKECOLOR] = '#6482B9';
  a[mxConstants.STYLE_FONTCOLOR] = '#774400';
  return a;
};
mxStylesheet.prototype.createDefaultEdgeStyle = function() {
  var a = {};
  a[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
  a[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
  a[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  a[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  a[mxConstants.STYLE_STROKECOLOR] = '#6482B9';
  a[mxConstants.STYLE_FONTCOLOR] = '#446299';
  return a;
};
mxStylesheet.prototype.putDefaultVertexStyle = function(a) {
  this.putCellStyle('defaultVertex', a);
};
mxStylesheet.prototype.putDefaultEdgeStyle = function(a) {
  this.putCellStyle('defaultEdge', a);
};
mxStylesheet.prototype.getDefaultVertexStyle = function() {
  return this.styles.defaultVertex;
};
mxStylesheet.prototype.getDefaultEdgeStyle = function() {
  return this.styles.defaultEdge;
};
mxStylesheet.prototype.putCellStyle = function(a, b) {
  this.styles[a] = b;
};
mxStylesheet.prototype.getCellStyle = function(a, b, c) {
  c = null != c ? c : !0;
  if (null != a && 0 < a.length) {
    var d = a.split(';');
    b = null != b && ';' != a.charAt(0) ? mxUtils.clone(b) : {};
    for (a = 0; a < d.length; a++) {
      var e = d[a],
        f = e.indexOf('=');
      if (0 <= f) {
        var g = e.substring(0, f);
        e = e.substring(f + 1);
        e == mxConstants.NONE && c ? delete b[g] : mxUtils.isNumeric(e) ? b[g] = parseFloat(e) : b[g] = e;
      } else if (e = this.styles[e], null != e)
        for (g in e)
          b[g] = e[g];
    }
  }
  return b;
};