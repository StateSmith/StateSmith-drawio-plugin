function mxHierarchicalLayout(a, b, c) {
  mxGraphLayout.call(this, a);
  this.orientation = null != b ? b : mxConstants.DIRECTION_NORTH;
  this.deterministic = null != c ? c : !0;
}