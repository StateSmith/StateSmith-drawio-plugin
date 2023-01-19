function mxOutline(a, b) {
  this.source = a;
  null != b && this.init(b);
}
mxOutline.prototype.source = null;
mxOutline.prototype.container = null;
mxOutline.prototype.enabled = !0;
mxOutline.prototype.suspended = !1;
mxOutline.prototype.border = 14;
mxOutline.prototype.opacity = mxClient.IS_IE11 ? 0.9 : 0.7;
mxOutline.prototype.init = function(a) {
  this.container = a;
  this.updateHandler = mxUtils.bind(this, function(b, c) {
    this.update(!0);
  });
  this.source.getModel().addListener(mxEvent.CHANGE, this.updateHandler);
  this.source.addListener(mxEvent.REFRESH, this.updateHandler);
  a = this.source.getView();
  a.addListener(mxEvent.UP, this.updateHandler);
  a.addListener(mxEvent.DOWN, this.updateHandler);
  a.addListener(mxEvent.SCALE, this.updateHandler);
  a.addListener(mxEvent.TRANSLATE, this.updateHandler);
  a.addListener(mxEvent.SCALE_AND_TRANSLATE, this.updateHandler);
  this.scrollHandler = mxUtils.bind(this, function(b, c) {
    this.update(!1);
  });
  mxEvent.addListener(this.source.container, 'scroll', this.scrollHandler);
  this.source.addListener(mxEvent.PAN, this.scrollHandler);
  this.update(!0);
};
mxOutline.prototype.isEnabled = function() {
  return this.enabled;
};
mxOutline.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxOutline.prototype.isSuspended = function() {
  return this.suspended;
};
mxOutline.prototype.setSuspended = function(a) {
  this.suspended = a;
  this.update(!0);
};
mxOutline.prototype.isScrolling = function() {
  return this.source.useScrollbarsForPanning && mxUtils.hasScrollbars(this.source.container);
};
mxOutline.prototype.createSvg = function() {
  var a = document.createElementNS(mxConstants.NS_SVG, 'svg');
  a.style.position = 'absolute';
  a.style.left = '0px';
  a.style.top = '0px';
  a.style.width = '100%';
  a.style.height = '100%';
  a.style.display = 'block';
  a.style.padding = this.border + 'px';
  a.style.boxSizing = 'border-box';
  a.style.overflow = 'visible';
  a.style.cursor = 'default';
  a.setAttribute('shape-rendering', 'optimizeSpeed');
  a.setAttribute('image-rendering', 'optimizeSpeed');
  return a;
};
mxOutline.prototype.addGestureListeners = function(a) {
  var b = null,
    c = 0,
    d = 0,
    e = 1,
    f = mxUtils.bind(this, function(l) {
      if (this.isEnabled()) {
        b = new mxPoint(mxEvent.getClientX(l), mxEvent.getClientY(l));
        var m = a.clientWidth - 2 * this.border,
          n = a.clientHeight - 2 * this.border,
          p = this.getViewBox();
        e = Math.max(p.width / m, p.height / n);
        if (mxEvent.getSource(l) != this.viewport)
          if (this.isScrolling()) {
            m -= p.width / e;
            n -= p.height / e;
            var r = this.svg.getBoundingClientRect();
            this.source.container.scrollLeft = p.x - m * e / 2 + (b.x - this.border - r.left) * e;
            this.source.container.scrollTop = p.y - n * e / 2 + (b.y - this.border - r.top) * e;
          } else
            p = this.source.view.translate, n = this.viewport.getBoundingClientRect(), m = (mxEvent.getClientX(l) - n.left) * e / this.source.view.scale, n = (mxEvent.getClientY(l) - n.top) * e / this.source.view.scale, this.source.getView().setTranslate(p.x - m, p.y - n), this.source.panGraph(0, 0);
        mxEvent.addGestureListeners(document, null, g, k);
        c = this.source.container.scrollLeft;
        d = this.source.container.scrollTop;
        mxEvent.consume(l);
      }
    }),
    g = mxUtils.bind(this, function(l) {
      this.isEnabled() && null != b && (this.isScrolling() ? (this.source.container.scrollLeft = c + (mxEvent.getClientX(l) - b.x) * e, this.source.container.scrollTop = d + (mxEvent.getClientY(l) - b.y) * e) : this.source.panGraph((b.x - mxEvent.getClientX(l)) * e, (b.y - mxEvent.getClientY(l)) * e), mxEvent.consume(l));
    }),
    k = mxUtils.bind(this, function(l) {
      if (this.isEnabled() && null != b) {
        if (!this.isScrolling()) {
          var m = (mxEvent.getClientX(l) - b.x) * e / this.source.view.scale,
            n = (mxEvent.getClientY(l) - b.y) * e / this.source.view.scale,
            p = this.source.view.translate;
          this.source.getView().setTranslate(p.x - m, p.y - n);
          this.source.panGraph(0, 0);
        }
        mxEvent.removeGestureListeners(document, null, g, k);
        mxEvent.consume(l);
        b = null;
      }
    });
  mxEvent.addGestureListeners(a, f, g, k);
};
mxOutline.prototype.getViewBox = function() {
  return this.source.getGraphBounds();
};
mxOutline.prototype.updateSvg = function() {
  null == this.svg && (this.svg = this.createSvg(), this.addGestureListeners(this.svg), this.container.appendChild(this.svg));
  var a = this.getViewBox();
  this.svg.setAttribute('viewBox', Math.round(a.x) + ' ' + Math.round(a.y) + ' ' + Math.round(a.width) + ' ' + Math.round(a.height));
  a = this.source.background;
  this.svg.style.backgroundColor = a == mxConstants.NONE ? '' : a;
  this.updateDrawPane();
};
mxOutline.prototype.updateDrawPane = function() {
  null != this.drawPane && this.drawPane.parentNode.removeChild(this.drawPane);
  this.drawPane = this.source.view.getDrawPane().cloneNode(!0);
  this.drawPane.style.opacity = this.opacity;
  this.processSvg(this.drawPane);
  null != this.viewport ? this.svg.insertBefore(this.drawPane, this.viewport) : this.svg.appendChild(this.drawPane);
};
mxOutline.prototype.processSvg = function(a) {
  var b = mxClient.IS_IE11 ? Math.max(1, this.source.view.scale) : this.source.view.scale;
  Array.prototype.slice.call(a.getElementsByTagName('*')).forEach(mxUtils.bind(this, function(c) {
    if ('text' != c.nodeName && 'foreignObject' != c.nodeName && 'hidden' != c.getAttribute('visibility') && c instanceof SVGElement) {
      var d = parseInt(c.getAttribute('stroke-width') || 1);
      isNaN(d) || c.setAttribute('stroke-width', Math.max(mxClient.IS_IE11 ? 4 : 1, d / (5 * b)));
      c.setAttribute('vector-effect', 'non-scaling-stroke');
      c.style.cursor = '';
    } else
      c.parentNode.removeChild(c);
  }));
};
mxOutline.prototype.updateViewport = function() {
  if (null != this.svg) {
    null == this.viewport && (this.viewport = this.createViewport(), this.svg.appendChild(this.viewport));
    var a = this.source.container;
    a = new mxRectangle(a.scrollLeft, a.scrollTop, a.clientWidth, a.clientHeight);
    this.isScrolling() || (a.x = -this.source.panDx, a.y = -this.source.panDy);
    this.viewport.setAttribute('x', a.x);
    this.viewport.setAttribute('y', a.y);
    this.viewport.setAttribute('width', a.width);
    this.viewport.setAttribute('height', a.height);
  }
};
mxOutline.prototype.createViewport = function() {
  var a = this.svg.ownerDocument.createElementNS(mxConstants.NS_SVG, 'rect');
  a.setAttribute('stroke-width', mxClient.IS_IE11 ? '12' : '3');
  a.setAttribute('stroke', HoverIcons.prototype.arrowFill);
  a.setAttribute('fill', HoverIcons.prototype.arrowFill);
  a.setAttribute('vector-effect', 'non-scaling-stroke');
  a.setAttribute('fill-opacity', 0.2);
  a.style.cursor = 'move';
  return a;
};
mxOutline.prototype.update = function(a) {
  null != this.source && null != this.source.container && (null != this.thread && (window.clearTimeout(this.thread), this.thread = null), this.fullUpdate = this.fullUpdate || a, this.thread = window.setTimeout(mxUtils.bind(this, function() {
    this.isSuspended() || (this.fullUpdate && this.updateSvg(), this.updateViewport());
    this.thread = this.fullUpdate = null;
  }), this.isScrolling() ? 10 : 0));
};
mxOutline.prototype.destroy = function() {
  null != this.svg && (this.svg.parentNode.removeChild(this.svg), this.svg = null);
  null != this.source && (this.source.removeListener(this.updateHandler), this.source.getView().removeListener(this.updateHandler), this.source.getModel().removeListener(this.updateHandler), this.source.removeListener(mxEvent.PAN, this.scrollHandler), mxEvent.removeListener(this.source.container, 'scroll', this.scrollHandler), this.source = null);
};