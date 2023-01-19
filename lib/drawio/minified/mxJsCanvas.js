function mxJsCanvas(b) {
  mxAbstractCanvas2D.call(this);
  this.ctx = b.getContext('2d');
  this.ctx.textBaseline = 'top';
  this.ctx.fillStyle = 'rgba(255,255,255,0)';
  this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
  this.M_RAD_PER_DEG = Math.PI / 180;
  this.images = null == this.images ? [] : this.images;
  this.subCanvas = null == this.subCanvas ? [] : this.subCanvas;
}
mxUtils.extend(mxJsCanvas, mxAbstractCanvas2D);
mxJsCanvas.prototype.ctx = null;
mxJsCanvas.prototype.waitCounter = 0;
mxJsCanvas.prototype.onComplete = null;
mxJsCanvas.prototype.images = null;
mxJsCanvas.prototype.subCanvas = null;
mxJsCanvas.prototype.canvasIndex = 0;
mxJsCanvas.prototype.hexToRgb = function(b) {
  b = b.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, f, c, k) {
    return f + f + c + c + k + k;
  });
  return (b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(b)) ? {
    r: parseInt(b[1], 16),
    g: parseInt(b[2], 16),
    b: parseInt(b[3], 16)
  } : null;
};
mxJsCanvas.prototype.incWaitCounter = function() {
  this.waitCounter++;
};
mxJsCanvas.prototype.decWaitCounter = function() {
  this.waitCounter--;
  0 == this.waitCounter && null != this.onComplete && (this.onComplete(), this.onComplete = null);
};
mxJsCanvas.prototype.updateFont = function() {
  var b = '';
  (this.state.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD && (b += 'bold ');
  (this.state.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC && (b += 'italic ');
  this.ctx.font = b + this.state.fontSize + 'px ' + this.state.fontFamily;
};
mxJsCanvas.prototype.save = function() {
  this.states.push(this.state);
  this.state = mxUtils.clone(this.state);
  this.ctx.save();
};
mxJsCanvas.prototype.restore = function() {
  this.state = this.states.pop();
  this.ctx.restore();
};
mxJsCanvas.prototype.scale = function(b) {
  this.state.scale *= b;
  this.state.strokeWidth *= b;
  this.ctx.scale(b, b);
};
mxJsCanvas.prototype.translate = function(b, e) {
  this.state.dx += b;
  this.state.dy += e;
  this.ctx.translate(b, e);
};
mxJsCanvas.prototype.rotate = function(b, e, f, c, k) {
  c -= this.state.dx;
  k -= this.state.dy;
  this.ctx.translate(c, k);
  (e || f) && this.ctx.scale(e ? -1 : 1, f ? -1 : 1);
  this.ctx.rotate(b * this.M_RAD_PER_DEG);
  this.ctx.translate(-c, -k);
};
mxJsCanvas.prototype.setAlpha = function(b) {
  this.state.alpha = b;
  this.ctx.globalAlpha = b;
};
mxJsCanvas.prototype.setFillColor = function(b) {
  b == mxConstants.NONE && (b = null);
  this.state.fillColor = b;
  this.state.gradientColor = null;
  this.ctx.fillStyle = b;
};
mxJsCanvas.prototype.setGradient = function(b, e, f, c, k, m, t, y, E) {
  f = this.ctx.createLinearGradient(0, c, 0, c + m);
  c = this.state;
  c.fillColor = b;
  c.fillAlpha = null != y ? y : 1;
  c.gradientColor = e;
  c.gradientAlpha = null != E ? E : 1;
  c.gradientDirection = t;
  b = this.hexToRgb(b);
  e = this.hexToRgb(e);
  null != b && f.addColorStop(0, 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + c.fillAlpha + ')');
  null != e && f.addColorStop(1, 'rgba(' + e.r + ',' + e.g + ',' + e.b + ',' + c.gradientAlpha + ')');
  this.ctx.fillStyle = f;
};
mxJsCanvas.prototype.setStrokeColor = function(b) {
  null != b && (b == mxConstants.NONE ? (this.state.strokeColor = null, this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)') : (this.ctx.strokeStyle = b, this.state.strokeColor = b));
};
mxJsCanvas.prototype.setStrokeWidth = function(b) {
  this.ctx.lineWidth = b;
};
mxJsCanvas.prototype.setDashed = function(b) {
  if (this.state.dashed = b) {
    b = this.state.dashPattern.split(' ');
    for (var e = 0; e < b.length; e++)
      b[e] = parseInt(b[e], 10);
    this.setLineDash(b);
  } else
    this.setLineDash([0]);
};
mxJsCanvas.prototype.setLineDash = function(b) {
  try {
    'function' === typeof this.ctx.setLineDash && this.ctx.setLineDash(b);
  } catch (e) {}
};
mxJsCanvas.prototype.setDashPattern = function(b) {
  this.state.dashPattern = b;
  if (this.state.dashed) {
    b = b.split(' ');
    for (var e = 0; e < b.length; e++)
      b[e] = parseInt(b[e], 10);
    this.ctx.setLineDash(b);
  }
};
mxJsCanvas.prototype.setLineCap = function(b) {
  this.ctx.lineCap = b;
};
mxJsCanvas.prototype.setLineJoin = function(b) {
  this.ctx.lineJoin = b;
};
mxJsCanvas.prototype.setMiterLimit = function(b) {
  this.ctx.lineJoin = b;
};
mxJsCanvas.prototype.setFontColor = function(b) {
  this.ctx.fillStyle = b;
};
mxJsCanvas.prototype.setFontBackgroundColor = function(b) {
  b == mxConstants.NONE && (b = null);
  this.state.fontBackgroundColor = b;
};
mxJsCanvas.prototype.setFontBorderColor = function(b) {
  b == mxConstants.NONE && (b = null);
  this.state.fontBorderColor = b;
};
mxJsCanvas.prototype.setFontSize = function(b) {
  this.state.fontSize = b;
};
mxJsCanvas.prototype.setFontFamily = function(b) {
  this.state.fontFamily = b;
};
mxJsCanvas.prototype.setFontStyle = function(b) {
  this.state.fontStyle = b;
};
mxJsCanvas.prototype.setShadow = function(b) {
  (this.state.shadow = b) ? (this.setShadowOffset(this.state.shadowDx, this.state.shadowDy), this.setShadowAlpha(this.state.shadowAlpha)) : (this.ctx.shadowColor = 'transparent', this.ctx.shadowBlur = 0, this.ctx.shadowOffsetX = 0, this.ctx.shadowOffsetY = 0);
};
mxJsCanvas.prototype.setShadowColor = function(b) {
  if (null == b || b == mxConstants.NONE)
    b = null, this.ctx.shadowColor = 'transparent';
  this.state.shadowColor = b;
  if (this.state.shadow && null != b) {
    var e = null != this.state.shadowAlpha ? this.state.shadowAlpha : 1;
    b = this.hexToRgb(b);
    this.ctx.shadowColor = 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + e + ')';
  }
};
mxJsCanvas.prototype.setShadowAlpha = function(b) {
  this.state.shadowAlpha = b;
  this.setShadowColor(this.state.shadowColor);
};
mxJsCanvas.prototype.setShadowOffset = function(b, e) {
  this.state.shadowDx = b;
  this.state.shadowDy = e;
  this.state.shadow && (this.ctx.shadowOffsetX = b, this.ctx.shadowOffsetY = e);
};
mxJsCanvas.prototype.moveTo = function(b, e) {
  this.ctx.moveTo(b, e);
  this.lastMoveX = b;
  this.lastMoveY = e;
};
mxJsCanvas.prototype.lineTo = function(b, e) {
  this.ctx.lineTo(b, e);
  this.lastMoveX = b;
  this.lastMoveY = e;
};
mxJsCanvas.prototype.quadTo = function(b, e, f, c) {
  this.ctx.quadraticCurveTo(b, e, f, c);
  this.lastMoveX = f;
  this.lastMoveY = c;
};
mxJsCanvas.prototype.arcTo = function(b, e, f, c, k, m, t) {
  b = mxUtils.arcToCurves(this.lastMoveX, this.lastMoveY, b, e, f, c, k, m, t);
  if (null != b)
    for (e = 0; e < b.length; e += 6)
      this.curveTo(b[e], b[e + 1], b[e + 2], b[e + 3], b[e + 4], b[e + 5]);
};
mxJsCanvas.prototype.curveTo = function(b, e, f, c, k, m) {
  this.ctx.bezierCurveTo(b, e, f, c, k, m);
  this.lastMoveX = k;
  this.lastMoveY = m;
};
mxJsCanvas.prototype.rect = function(b, e, f, c) {
  this.begin();
  this.moveTo(b, e);
  this.lineTo(b + f, e);
  this.lineTo(b + f, e + c);
  this.lineTo(b, e + c);
  this.close();
};
mxJsCanvas.prototype.roundrect = function(b, e, f, c, k, m) {
  this.begin();
  this.moveTo(b + k, e);
  this.lineTo(b + f - k, e);
  this.quadTo(b + f, e, b + f, e + m);
  this.lineTo(b + f, e + c - m);
  this.quadTo(b + f, e + c, b + f - k, e + c);
  this.lineTo(b + k, e + c);
  this.quadTo(b, e + c, b, e + c - m);
  this.lineTo(b, e + m);
  this.quadTo(b, e, b + k, e);
};
mxJsCanvas.prototype.ellipse = function(b, e, f, c) {
  this.ctx.save();
  this.ctx.translate(b + f / 2, e + c / 2);
  this.ctx.scale(f / 2, c / 2);
  this.ctx.beginPath();
  this.ctx.arc(0, 0, 1, 0, 2 * Math.PI, !1);
  this.ctx.restore();
};
mxJsCanvas.prototype.rewriteImageSource = function(b) {
  if ('http://' == b.substring(0, 7) || 'https://' == b.substring(0, 8))
    b = '/proxy?url=' + encodeURIComponent(b);
  return b;
};
mxJsCanvas.prototype.image = function(b, e, f, c, k, m, t, y) {
  k = this.rewriteImageSource(k);
  k = this.images[k];
  if (null != k && 0 < k.height && 0 < k.width) {
    var E = this.ctx;
    E.save();
    if (m) {
      m = k.width;
      var z = k.height,
        D = Math.min(f / m, c / z);
      b += (f - m * D) / 2;
      e += (c - z * D) / 2;
      f = m * D;
      c = z * D;
    }
    t && (E.translate(2 * b + f, 0), E.scale(-1, 1));
    y && (E.translate(0, 2 * e + c), E.scale(1, -1));
    E.drawImage(k, b, e, f, c);
    E.restore();
  }
};
mxJsCanvas.prototype.begin = function() {
  this.ctx.beginPath();
};
mxJsCanvas.prototype.close = function() {
  this.ctx.closePath();
};
mxJsCanvas.prototype.fill = function() {
  this.ctx.fill();
};
mxJsCanvas.prototype.stroke = function() {
  this.ctx.stroke();
};
mxJsCanvas.prototype.fillAndStroke = function() {
  if (this.state.shadow) {
    this.ctx.stroke();
    this.ctx.fill();
    var b = this.ctx.shadowColor,
      e = this.ctx.shadowOffsetX,
      f = this.ctx.shadowOffsetY;
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.stroke();
    this.ctx.shadowColor = b;
    this.ctx.shadowOffsetX = e;
    this.ctx.shadowOffsetY = f;
  } else
    this.ctx.fill(), this.ctx.stroke();
};
mxJsCanvas.prototype.text = function(b, e, f, c, k, m, t, y, E, z, D, J) {
  if (null != k && 0 != k.length) {
    f = this.state.scale;
    0 != J && (this.ctx.translate(Math.round(b), Math.round(e)), this.ctx.rotate(J * Math.PI / 180), this.ctx.translate(Math.round(-b), Math.round(-e)));
    if ('html' == E) {
      k = this.subCanvas[this.canvasIndex++];
      E = k.height;
      J = k.width;
      switch (t) {
        case mxConstants.ALIGN_MIDDLE:
          e -= E / 2 / f;
          break;
        case mxConstants.ALIGN_BOTTOM:
          e -= E / f;
      }
      switch (m) {
        case mxConstants.ALIGN_CENTER:
          b -= J / 2 / f;
          break;
        case mxConstants.ALIGN_RIGHT:
          b -= J / f;
      }
      this.ctx.save();
      if (null != this.state.fontBackgroundColor || null != this.state.fontBorderColor)
        null != this.state.fontBackgroundColor && (this.ctx.fillStyle = this.state.fontBackgroundColor, this.ctx.fillRect(Math.round(b) - 0.5, Math.round(e) - 0.5, Math.round(k.width / f), Math.round(k.height / f))), null != this.state.fontBorderColor && (this.ctx.strokeStyle = this.state.fontBorderColor, this.ctx.lineWidth = 1, this.ctx.strokeRect(Math.round(b) - 0.5, Math.round(e) - 0.5, Math.round(k.width / f), Math.round(k.height / f)));
      this.ctx.scale(1 / f, 1 / f);
      this.ctx.drawImage(k, Math.round(b * f), Math.round(e * f));
    } else {
      this.ctx.save();
      this.updateFont();
      J = document.createElement('div');
      J.innerHTML = k;
      J.style.position = 'absolute';
      J.style.top = '-9999px';
      J.style.left = '-9999px';
      J.style.fontFamily = this.state.fontFamily;
      J.style.fontWeight = 'bold';
      J.style.fontSize = this.state.fontSize + 'pt';
      document.body.appendChild(J);
      E = [
        J.offsetWidth,
        J.offsetHeight
      ];
      document.body.removeChild(J);
      k = k.split('\n');
      J = E[1];
      this.ctx.textBaseline = 'top';
      E = e;
      switch (t) {
        case mxConstants.ALIGN_MIDDLE:
          this.ctx.textBaseline = 'middle';
          e -= (k.length - 1) * J / 2;
          E = e - this.state.fontSize / 2;
          break;
        case mxConstants.ALIGN_BOTTOM:
          this.ctx.textBaseline = 'alphabetic', e -= J * (k.length - 1), E = e - this.state.fontSize;
      }
      t = [];
      J = [];
      for (f = 0; f < k.length; f++)
        J[f] = b, t[f] = this.ctx.measureText(k[f]).width, null != m && m != mxConstants.ALIGN_LEFT && (J[f] -= t[f], m == mxConstants.ALIGN_CENTER && (J[f] += t[f] / 2));
      if (null != this.state.fontBackgroundColor || null != this.state.fontBorderColor) {
        b = J[0];
        m = t[0];
        for (f = 1; f < k.length; f++)
          b = Math.min(b, J[f]), m = Math.max(m, t[f]);
        this.ctx.save();
        b = Math.round(b) - 0.5;
        E = Math.round(E) - 0.5;
        null != this.state.fontBackgroundColor && (this.ctx.fillStyle = this.state.fontBackgroundColor, this.ctx.fillRect(b, E, m, this.state.fontSize * mxConstants.LINE_HEIGHT * k.length));
        null != this.state.fontBorderColor && (this.ctx.strokeStyle = this.state.fontBorderColor, this.ctx.lineWidth = 1, this.ctx.strokeRect(b, E, m, this.state.fontSize * mxConstants.LINE_HEIGHT * k.length));
        this.ctx.restore();
      }
      for (f = 0; f < k.length; f++)
        this.ctx.fillText(k[f], J[f], e), e += this.state.fontSize * mxConstants.LINE_HEIGHT;
    }
    this.ctx.restore();
  }
};
mxJsCanvas.prototype.getCanvas = function() {
  return canvas;
};
mxJsCanvas.prototype.finish = function(b) {
  0 == this.waitCounter ? b() : this.onComplete = b;
};