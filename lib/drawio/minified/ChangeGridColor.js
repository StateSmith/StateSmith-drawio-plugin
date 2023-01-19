function ChangeGridColor(a, b) {
  this.ui = a;
  this.color = b;
}
ChangeGridColor.prototype.execute = function() {
  var a = this.ui.editor.graph.view.gridColor;
  this.ui.setGridColor(this.color);
  this.color = a;
};
(function() {
  var a = new mxObjectCodec(new ChangeGridColor(), ['ui']);
  mxCodecRegistry.register(a);
}());