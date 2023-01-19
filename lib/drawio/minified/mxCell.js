function mxCell(a, b, c) {
  this.value = a;
  this.setGeometry(b);
  this.setStyle(c);
  if (null != this.onInit)
    this.onInit();
}
mxCell.prototype.id = null;
mxCell.prototype.value = null;
mxCell.prototype.geometry = null;
mxCell.prototype.style = null;
mxCell.prototype.vertex = !1;
mxCell.prototype.edge = !1;
mxCell.prototype.connectable = !0;
mxCell.prototype.visible = !0;
mxCell.prototype.collapsed = !1;
mxCell.prototype.parent = null;
mxCell.prototype.source = null;
mxCell.prototype.target = null;
mxCell.prototype.children = null;
mxCell.prototype.edges = null;
mxCell.prototype.mxTransient = 'id value parent source target children edges'.split(' ');
mxCell.prototype.getId = function() {
  return this.id;
};
mxCell.prototype.setId = function(a) {
  this.id = a;
};
mxCell.prototype.getValue = function() {
  return this.value;
};
mxCell.prototype.setValue = function(a) {
  this.value = a;
};
mxCell.prototype.valueChanged = function(a) {
  var b = this.getValue();
  this.setValue(a);
  return b;
};
mxCell.prototype.getGeometry = function() {
  return this.geometry;
};
mxCell.prototype.setGeometry = function(a) {
  this.geometry = a;
};
mxCell.prototype.getStyle = function() {
  return this.style;
};
mxCell.prototype.setStyle = function(a) {
  this.style = a;
};
mxCell.prototype.isVertex = function() {
  return 0 != this.vertex;
};
mxCell.prototype.setVertex = function(a) {
  this.vertex = a;
};
mxCell.prototype.isEdge = function() {
  return 0 != this.edge;
};
mxCell.prototype.setEdge = function(a) {
  this.edge = a;
};
mxCell.prototype.isConnectable = function() {
  return 0 != this.connectable;
};
mxCell.prototype.setConnectable = function(a) {
  this.connectable = a;
};
mxCell.prototype.isVisible = function() {
  return 0 != this.visible;
};
mxCell.prototype.setVisible = function(a) {
  this.visible = a;
};
mxCell.prototype.isCollapsed = function() {
  return 0 != this.collapsed;
};
mxCell.prototype.setCollapsed = function(a) {
  this.collapsed = a;
};
mxCell.prototype.getParent = function() {
  return this.parent;
};
mxCell.prototype.setParent = function(a) {
  this.parent = a;
};
mxCell.prototype.getTerminal = function(a) {
  return a ? this.source : this.target;
};
mxCell.prototype.setTerminal = function(a, b) {
  b ? this.source = a : this.target = a;
  return a;
};
mxCell.prototype.getChildCount = function() {
  return null == this.children ? 0 : this.children.length;
};
mxCell.prototype.getIndex = function(a) {
  return mxUtils.indexOf(this.children, a);
};
mxCell.prototype.getChildAt = function(a) {
  return null == this.children ? null : this.children[a];
};
mxCell.prototype.insert = function(a, b) {
  null != a && (null == b && (b = this.getChildCount(), a.getParent() == this && b--), a.removeFromParent(), a.setParent(this), null == this.children ? (this.children = [], this.children.push(a)) : this.children.splice(b, 0, a));
  return a;
};
mxCell.prototype.remove = function(a) {
  var b = null;
  null != this.children && 0 <= a && (b = this.getChildAt(a), null != b && (this.children.splice(a, 1), b.setParent(null)));
  return b;
};
mxCell.prototype.removeFromParent = function() {
  if (null != this.parent) {
    var a = this.parent.getIndex(this);
    this.parent.remove(a);
  }
};
mxCell.prototype.getEdgeCount = function() {
  return null == this.edges ? 0 : this.edges.length;
};
mxCell.prototype.getEdgeIndex = function(a) {
  return mxUtils.indexOf(this.edges, a);
};
mxCell.prototype.getEdgeAt = function(a) {
  return null == this.edges ? null : this.edges[a];
};
mxCell.prototype.insertEdge = function(a, b) {
  null != a && (a.removeFromTerminal(b), a.setTerminal(this, b), null == this.edges || a.getTerminal(!b) != this || 0 > mxUtils.indexOf(this.edges, a)) && (null == this.edges && (this.edges = []), this.edges.push(a));
  return a;
};
mxCell.prototype.removeEdge = function(a, b) {
  if (null != a) {
    if (a.getTerminal(!b) != this && null != this.edges) {
      var c = this.getEdgeIndex(a);
      0 <= c && this.edges.splice(c, 1);
    }
    a.setTerminal(null, b);
  }
  return a;
};
mxCell.prototype.removeFromTerminal = function(a) {
  var b = this.getTerminal(a);
  null != b && b.removeEdge(this, a);
};
mxCell.prototype.hasAttribute = function(a) {
  var b = this.getValue();
  return null != b && b.nodeType == mxConstants.NODETYPE_ELEMENT && b.hasAttribute ? b.hasAttribute(a) : null != b.getAttribute(a);
};
mxCell.prototype.getAttribute = function(a, b) {
  var c = this.getValue();
  a = null != c && c.nodeType == mxConstants.NODETYPE_ELEMENT ? c.getAttribute(a) : null;
  return null != a ? a : b;
};
mxCell.prototype.setAttribute = function(a, b) {
  var c = this.getValue();
  null != c && c.nodeType == mxConstants.NODETYPE_ELEMENT && c.setAttribute(a, b);
};
mxCell.prototype.clone = function() {
  var a = mxUtils.clone(this, this.mxTransient);
  a.setValue(this.cloneValue());
  return a;
};
mxCell.prototype.cloneValue = function(a) {
  a = null != a ? a : this.getValue();
  null != a && ('function' == typeof a.clone ? a = a.clone() : isNaN(a.nodeType) || (a = a.cloneNode(!0)));
  return a;
};