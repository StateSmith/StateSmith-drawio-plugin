function mxCompositeLayout(a, b, c) {
  mxGraphLayout.call(this, a);
  this.layouts = b;
  this.master = c;
}
mxCompositeLayout.prototype = new mxGraphLayout();
mxCompositeLayout.prototype.constructor = mxCompositeLayout;
mxCompositeLayout.prototype.layouts = null;
mxCompositeLayout.prototype.master = null;
mxCompositeLayout.prototype.moveCell = function(a, b, c) {
  null != this.master ? this.master.moveCell.apply(this.master, arguments) : this.layouts[0].moveCell.apply(this.layouts[0], arguments);
};
mxCompositeLayout.prototype.execute = function(a) {
  var b = this.graph.getModel();
  b.beginUpdate();
  try {
    for (var c = 0; c < this.layouts.length; c++)
      this.layouts[c].execute.apply(this.layouts[c], arguments);
  } finally {
    b.endUpdate();
  }
};