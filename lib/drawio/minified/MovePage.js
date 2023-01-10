function MovePage(b, e, f) {
  this.ui = b;
  this.oldIndex = e;
  this.newIndex = f;
}
MovePage.prototype.execute = function() {
  this.ui.pages.splice(this.newIndex, 0, this.ui.pages.splice(this.oldIndex, 1)[0]);
  var b = this.oldIndex;
  this.oldIndex = this.newIndex;
  this.newIndex = b;
  this.ui.editor.graph.updatePlaceholders();
  this.ui.editor.fireEvent(new mxEventObject('pageMoved'));
};