function DiagramPage(b, e) {
  this.node = b;
  null != e ? this.node.setAttribute('id', e) : null == this.getId() && this.node.setAttribute('id', Editor.guid());
}
DiagramPage.prototype.node = null;
DiagramPage.prototype.root = null;
DiagramPage.prototype.viewState = null;
DiagramPage.prototype.getId = function() {
  return this.node.getAttribute('id');
};
DiagramPage.prototype.getName = function() {
  return this.node.getAttribute('name');
};
DiagramPage.prototype.setName = function(b) {
  null == b ? this.node.removeAttribute('name') : this.node.setAttribute('name', b);
};