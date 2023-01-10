function mxAbstractCanvas2D() {
  this.converter = this.createUrlConverter();
  this.reset();
}
mxAbstractCanvas2D.prototype.state = null;
mxAbstractCanvas2D.prototype.states = null;
mxAbstractCanvas2D.prototype.path = null;
mxAbstractCanvas2D.prototype.rotateHtml = !0;
mxAbstractCanvas2D.prototype.lastX = 0;
mxAbstractCanvas2D.prototype.lastY = 0;
mxAbstractCanvas2D.prototype.moveOp = 'M';
mxAbstractCanvas2D.prototype.lineOp = 'L';
mxAbstractCanvas2D.prototype.quadOp = 'Q';
mxAbstractCanvas2D.prototype.curveOp = 'C';
mxAbstractCanvas2D.prototype.closeOp = 'Z';
mxAbstractCanvas2D.prototype.pointerEvents = !1;
mxAbstractCanvas2D.prototype.createUrlConverter = function() {
  return new mxUrlConverter();
};
mxAbstractCanvas2D.prototype.reset = function() {
  this.state = this.createState();
  this.states = [];
};
mxAbstractCanvas2D.prototype.createState = function() {
  return {
    dx: 0,
    dy: 0,
    scale: 1,
    alpha: 1,
    fillAlpha: 1,
    strokeAlpha: 1,
    fillColor: null,
    gradientFillAlpha: 1,
    gradientColor: null,
    gradientAlpha: 1,
    gradientDirection: null,
    strokeColor: null,
    strokeWidth: 1,
    dashed: !1,
    dashPattern: '3 3',
    fixDash: !1,
    lineCap: 'flat',
    lineJoin: 'miter',
    miterLimit: 10,
    fontColor: '#000000',
    fontBackgroundColor: null,
    fontBorderColor: null,
    fontSize: mxConstants.DEFAULT_FONTSIZE,
    fontFamily: mxConstants.DEFAULT_FONTFAMILY,
    fontStyle: 0,
    shadow: !1,
    shadowColor: mxConstants.SHADOWCOLOR,
    shadowAlpha: mxConstants.SHADOW_OPACITY,
    shadowDx: mxConstants.SHADOW_OFFSET_X,
    shadowDy: mxConstants.SHADOW_OFFSET_Y,
    rotation: 0,
    rotationCx: 0,
    rotationCy: 0
  };
};
mxAbstractCanvas2D.prototype.format = function(a) {
  return Math.round(parseFloat(a));
};
mxAbstractCanvas2D.prototype.addOp = function() {
  if (null != this.path && (this.path.push(arguments[0]), 2 < arguments.length))
    for (var a = this.state, b = 2; b < arguments.length; b += 2)
      this.lastX = arguments[b - 1], this.lastY = arguments[b], this.path.push(this.format((this.lastX + a.dx) * a.scale)), this.path.push(this.format((this.lastY + a.dy) * a.scale));
};
mxAbstractCanvas2D.prototype.rotatePoint = function(a, b, c, d, e) {
  c *= Math.PI / 180;
  return mxUtils.getRotatedPoint(new mxPoint(a, b), Math.cos(c), Math.sin(c), new mxPoint(d, e));
};
mxAbstractCanvas2D.prototype.save = function() {
  this.states.push(this.state);
  this.state = mxUtils.clone(this.state);
};
mxAbstractCanvas2D.prototype.restore = function() {
  0 < this.states.length && (this.state = this.states.pop());
};
mxAbstractCanvas2D.prototype.setLink = function(a, b) {};
mxAbstractCanvas2D.prototype.scale = function(a) {
  this.state.scale *= a;
  this.state.strokeWidth *= a;
};
mxAbstractCanvas2D.prototype.translate = function(a, b) {
  this.state.dx += a;
  this.state.dy += b;
};
mxAbstractCanvas2D.prototype.rotate = function(a, b, c, d, e) {};
mxAbstractCanvas2D.prototype.setAlpha = function(a) {
  this.state.alpha = a;
};
mxAbstractCanvas2D.prototype.setFillAlpha = function(a) {
  this.state.fillAlpha = a;
};
mxAbstractCanvas2D.prototype.setStrokeAlpha = function(a) {
  this.state.strokeAlpha = a;
};
mxAbstractCanvas2D.prototype.setFillColor = function(a) {
  a == mxConstants.NONE && (a = null);
  this.state.fillColor = a;
  this.state.gradientColor = null;
};
mxAbstractCanvas2D.prototype.setFillStyle = function(a) {
  a == mxConstants.NONE && (a = null);
  this.state.fillStyle = a;
};
mxAbstractCanvas2D.prototype.setGradient = function(a, b, c, d, e, f, g, k, l) {
  c = this.state;
  c.fillColor = a;
  c.gradientFillAlpha = null != k ? k : 1;
  c.gradientColor = b;
  c.gradientAlpha = null != l ? l : 1;
  c.gradientDirection = g;
};
mxAbstractCanvas2D.prototype.setStrokeColor = function(a) {
  a == mxConstants.NONE && (a = null);
  this.state.strokeColor = a;
};
mxAbstractCanvas2D.prototype.setStrokeWidth = function(a) {
  this.state.strokeWidth = a;
};
mxAbstractCanvas2D.prototype.setDashed = function(a, b) {
  this.state.dashed = a;
  this.state.fixDash = b;
};
mxAbstractCanvas2D.prototype.setDashPattern = function(a) {
  this.state.dashPattern = a;
};
mxAbstractCanvas2D.prototype.setLineCap = function(a) {
  this.state.lineCap = a;
};
mxAbstractCanvas2D.prototype.setLineJoin = function(a) {
  this.state.lineJoin = a;
};
mxAbstractCanvas2D.prototype.setMiterLimit = function(a) {
  this.state.miterLimit = a;
};
mxAbstractCanvas2D.prototype.setFontColor = function(a) {
  a == mxConstants.NONE && (a = null);
  this.state.fontColor = a;
};
mxAbstractCanvas2D.prototype.setFontBackgroundColor = function(a) {
  a == mxConstants.NONE && (a = null);
  this.state.fontBackgroundColor = a;
};
mxAbstractCanvas2D.prototype.setFontBorderColor = function(a) {
  a == mxConstants.NONE && (a = null);
  this.state.fontBorderColor = a;
};
mxAbstractCanvas2D.prototype.setFontSize = function(a) {
  this.state.fontSize = parseFloat(a);
};
mxAbstractCanvas2D.prototype.setFontFamily = function(a) {
  this.state.fontFamily = a;
};
mxAbstractCanvas2D.prototype.setFontStyle = function(a) {
  null == a && (a = 0);
  this.state.fontStyle = a;
};
mxAbstractCanvas2D.prototype.setShadow = function(a) {
  this.state.shadow = a;
};
mxAbstractCanvas2D.prototype.setShadowColor = function(a) {
  a == mxConstants.NONE && (a = null);
  this.state.shadowColor = a;
};
mxAbstractCanvas2D.prototype.setShadowAlpha = function(a) {
  this.state.shadowAlpha = a;
};
mxAbstractCanvas2D.prototype.setShadowOffset = function(a, b) {
  this.state.shadowDx = a;
  this.state.shadowDy = b;
};
mxAbstractCanvas2D.prototype.begin = function() {
  this.lastY = this.lastX = 0;
  this.path = [];
};
mxAbstractCanvas2D.prototype.moveTo = function(a, b) {
  this.addOp(this.moveOp, a, b);
};
mxAbstractCanvas2D.prototype.lineTo = function(a, b) {
  this.addOp(this.lineOp, a, b);
};
mxAbstractCanvas2D.prototype.quadTo = function(a, b, c, d) {
  this.addOp(this.quadOp, a, b, c, d);
};
mxAbstractCanvas2D.prototype.curveTo = function(a, b, c, d, e, f) {
  this.addOp(this.curveOp, a, b, c, d, e, f);
};
mxAbstractCanvas2D.prototype.arcTo = function(a, b, c, d, e, f, g) {
  a = mxUtils.arcToCurves(this.lastX, this.lastY, a, b, c, d, e, f, g);
  if (null != a)
    for (b = 0; b < a.length; b += 6)
      this.curveTo(a[b], a[b + 1], a[b + 2], a[b + 3], a[b + 4], a[b + 5]);
};
mxAbstractCanvas2D.prototype.close = function(a, b, c, d, e, f) {
  this.addOp(this.closeOp);
};
mxAbstractCanvas2D.prototype.end = function() {};