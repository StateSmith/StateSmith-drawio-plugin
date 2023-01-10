function RenamePage(b, e, f) {
  this.ui = b;
  this.page = e;
  this.previous = this.name = f;
}
RenamePage.prototype.execute = function() {
  var b = this.page.getName();
  this.page.setName(this.previous);
  this.name = this.previous;
  this.previous = b;
  this.ui.editor.graph.updatePlaceholders();
  this.ui.editor.fireEvent(new mxEventObject('pageRenamed'));
};