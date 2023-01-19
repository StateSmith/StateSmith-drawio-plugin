function mxAsyncCanvas(b) {
  mxAbstractCanvas2D.call(this);
  this.htmlCanvas = b;
  b.images = b.images || [];
  b.subCanvas = b.subCanvas || [];
}
mxUtils.extend(mxAsyncCanvas, mxAbstractCanvas2D);
mxAsyncCanvas.prototype.htmlCanvas = null;
mxAsyncCanvas.prototype.canvasIndex = 0;
mxAsyncCanvas.prototype.waitCounter = 0;
mxAsyncCanvas.prototype.onComplete = null;
mxAsyncCanvas.prototype.incWaitCounter = function() {
  this.waitCounter++;
};
mxAsyncCanvas.prototype.decWaitCounter = function() {
  this.waitCounter--;
  0 == this.waitCounter && null != this.onComplete && (this.onComplete(), this.onComplete = null);
};
mxAsyncCanvas.prototype.updateFont = function() {
  var b = '';
  (this.state.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD && (b += 'bold ');
  (this.state.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC && (b += 'italic ');
  this.ctx.font = b + this.state.fontSize + 'px ' + this.state.fontFamily;
};
mxAsyncCanvas.prototype.rotate = function(b, e, f, c, k) {};
mxAsyncCanvas.prototype.setAlpha = function(b) {
  this.state.alpha = b;
};
mxAsyncCanvas.prototype.setFontColor = function(b) {
  this.state.fontColor = b;
};
mxAsyncCanvas.prototype.setFontBackgroundColor = function(b) {
  b == mxConstants.NONE && (b = null);
  this.state.fontBackgroundColor = b;
};
mxAsyncCanvas.prototype.setFontBorderColor = function(b) {
  b == mxConstants.NONE && (b = null);
  this.state.fontBorderColor = b;
};
mxAsyncCanvas.prototype.setFontSize = function(b) {
  this.state.fontSize = b;
};
mxAsyncCanvas.prototype.setFontFamily = function(b) {
  this.state.fontFamily = b;
};
mxAsyncCanvas.prototype.setFontStyle = function(b) {
  this.state.fontStyle = b;
};
mxAsyncCanvas.prototype.rect = function(b, e, f, c) {};
mxAsyncCanvas.prototype.roundrect = function(b, e, f, c, k, m) {};
mxAsyncCanvas.prototype.ellipse = function(b, e, f, c) {};
mxAsyncCanvas.prototype.rewriteImageSource = function(b) {
  if ('http://' == b.substring(0, 7) || 'https://' == b.substring(0, 8))
    b = '/proxy?url=' + encodeURIComponent(b);
  return b;
};
mxAsyncCanvas.prototype.image = function(b, e, f, c, k, m, t, y) {
  k = this.rewriteImageSource(k);
  b = this.htmlCanvas.images[k];
  null == b && (b = new Image(), b.onload = mxUtils.bind(this, function() {
    this.decWaitCounter();
  }), b.onerror = mxUtils.bind(this, function() {
    this.decWaitCounter();
  }), this.incWaitCounter(), this.htmlCanvas.images[k] = b, b.src = k);
};
mxAsyncCanvas.prototype.fill = function() {};
mxAsyncCanvas.prototype.stroke = function() {};
mxAsyncCanvas.prototype.fillAndStroke = function() {};
mxAsyncCanvas.prototype.text = function(b, e, f, c, k, m, t, y, E, z, D, J) {
  if (null != k && 0 != k.length && (b = this.state.scale, 'html' == E && 'function' === typeof html2canvas)) {
    this.incWaitCounter();
    var G = this.canvasIndex++;
    html2canvas(k, {
      onrendered: mxUtils.bind(this, function(d) {
        this.htmlCanvas.subCanvas[G] = d;
        this.decWaitCounter();
      }),
      scale: b,
      logging: !0
    });
  }
};
mxAsyncCanvas.prototype.finish = function(b) {
  0 == this.waitCounter ? b() : this.onComplete = b;
};