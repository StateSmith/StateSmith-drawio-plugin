function mxCurrentRootChange(a, b) {
  this.view = a;
  this.previous = this.root = b;
  this.isUp = null == b;
  if (!this.isUp) {
    a = this.view.currentRoot;
    for (var c = this.view.graph.getModel(); null != a;) {
      if (a == b) {
        this.isUp = !0;
        break;
      }
      a = c.getParent(a);
    }
  }
}
mxCurrentRootChange.prototype.execute = function() {
  var a = this.view.currentRoot;
  this.view.currentRoot = this.previous;
  this.previous = a;
  a = this.view.graph.getTranslateForRoot(this.view.currentRoot);
  null != a && (this.view.translate = new mxPoint(-a.x, -a.y));
  this.isUp ? (this.view.clear(this.view.currentRoot, !0), this.view.validate()) : this.view.refresh();
  this.view.fireEvent(new mxEventObject(this.isUp ? mxEvent.UP : mxEvent.DOWN, 'root', this.view.currentRoot, 'previous', this.previous));
  this.isUp = !this.isUp;
};