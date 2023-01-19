function Dialog(a, b, f, e, g, d, h, n, u, m, p) {
  var x = u ? 57 : 0,
    A = f,
    C = e,
    D = u ? 0 : 64,
    G = Editor.inlineFullscreen || null == a.embedViewport ? mxUtils.getDocumentSize() : mxUtils.clone(a.embedViewport);
  null == a.embedViewport && null != window.innerHeight && (G.height = window.innerHeight);
  var F = G.height,
    K = Math.max(1, Math.round((G.width - f - D) / 2)),
    P = Math.max(1, Math.round((F - e - a.footerHeight) / 3));
  b.style.maxHeight = '100%';
  f = null != document.body ? Math.min(f, document.body.scrollWidth - D) : f;
  e = Math.min(e, F - D);
  0 < a.dialogs.length && (this.zIndex += 2 * a.dialogs.length);
  null == this.bg && (this.bg = a.createDiv('background'), this.bg.style.position = 'absolute', this.bg.style.background = Dialog.backdropColor, this.bg.style.height = F + 'px', this.bg.style.right = '0px', this.bg.style.zIndex = this.zIndex - 2, mxUtils.setOpacity(this.bg, this.bgOpacity));
  G = mxUtils.getDocumentScrollOrigin(document);
  this.bg.style.left = G.x + 'px';
  this.bg.style.top = G.y + 'px';
  K += G.x;
  P += G.y;
  Editor.inlineFullscreen || null == a.embedViewport || (this.bg.style.height = mxUtils.getDocumentSize().height + 'px', P += a.embedViewport.y, K += a.embedViewport.x);
  g && document.body.appendChild(this.bg);
  var R = a.createDiv(u ? 'geTransDialog' : 'geDialog');
  g = this.getPosition(K, P, f, e);
  K = g.x;
  P = g.y;
  R.style.width = f + 'px';
  R.style.height = e + 'px';
  R.style.left = K + 'px';
  R.style.top = P + 'px';
  R.style.zIndex = this.zIndex;
  R.appendChild(b);
  document.body.appendChild(R);
  !n && b.clientHeight > R.clientHeight - D && (b.style.overflowY = 'auto');
  b.style.overflowX = 'hidden';
  if (d && (d = document.createElement('img'), d.setAttribute('src', Dialog.prototype.closeImage), d.setAttribute('title', mxResources.get('close')), d.className = 'geDialogClose', d.style.top = P + 14 + 'px', d.style.left = K + f + 38 - x + 'px', d.style.zIndex = this.zIndex, mxEvent.addListener(d, 'click', mxUtils.bind(this, function() {
      a.hideDialog(!0);
    })), document.body.appendChild(d), this.dialogImg = d, !p)) {
    var Q = !1;
    mxEvent.addGestureListeners(this.bg, mxUtils.bind(this, function(ba) {
      Q = !0;
    }), null, mxUtils.bind(this, function(ba) {
      Q && (a.hideDialog(!0), Q = !1);
    }));
  }
  this.resizeListener = mxUtils.bind(this, function() {
    if (null != m) {
      var ba = m();
      null != ba && (A = f = ba.w, C = e = ba.h);
    }
    ba = mxUtils.getDocumentSize();
    F = ba.height;
    this.bg.style.height = F + 'px';
    Editor.inlineFullscreen || null == a.embedViewport || (this.bg.style.height = mxUtils.getDocumentSize().height + 'px');
    K = Math.max(1, Math.round((ba.width - f - D) / 2));
    P = Math.max(1, Math.round((F - e - a.footerHeight) / 3));
    f = null != document.body ? Math.min(A, document.body.scrollWidth - D) : A;
    e = Math.min(C, F - D);
    ba = this.getPosition(K, P, f, e);
    K = ba.x;
    P = ba.y;
    R.style.left = K + 'px';
    R.style.top = P + 'px';
    R.style.width = f + 'px';
    R.style.height = e + 'px';
    !n && b.clientHeight > R.clientHeight - D && (b.style.overflowY = 'auto');
    null != this.dialogImg && (this.dialogImg.style.top = P + 14 + 'px', this.dialogImg.style.left = K + f + 38 - x + 'px');
  });
  mxEvent.addListener(window, 'resize', this.resizeListener);
  this.onDialogClose = h;
  this.container = R;
  a.editor.fireEvent(new mxEventObject('showDialog'));
}
Dialog.backdropColor = 'white';
Dialog.prototype.zIndex = mxPopupMenu.prototype.zIndex - 2;
Dialog.prototype.noColorImage = mxClient.IS_SVG ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEzRDlBMUUwODYxMTExRTFCMzA4RDdDMjJBMEMxRDM3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEzRDlBMUUxODYxMTExRTFCMzA4RDdDMjJBMEMxRDM3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTNEOUExREU4NjExMTFFMUIzMDhEN0MyMkEwQzFEMzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTNEOUExREY4NjExMTFFMUIzMDhEN0MyMkEwQzFEMzciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xh3fmAAAABlBMVEX////MzMw46qqDAAAAGElEQVR42mJggAJGKGAYIIGBth8KAAIMAEUQAIElnLuQAAAAAElFTkSuQmCC' : IMAGE_PATH + '/nocolor.png';
Dialog.prototype.closeImage = mxClient.IS_SVG ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAQMAAADaX5RTAAAABlBMVEV7mr3///+wksspAAAAAnRSTlP/AOW3MEoAAAAdSURBVAgdY9jXwCDDwNDRwHCwgeExmASygSL7GgB12QiqNHZZIwAAAABJRU5ErkJggg==' : IMAGE_PATH + '/close.png';
Dialog.prototype.clearImage = mxClient.IS_SVG ? 'data:image/gif;base64,R0lGODlhDQAKAIABAMDAwP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUIzOEM1NzI4NjEyMTFFMUEzMkNDMUE3NjZERDE2QjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUIzOEM1NzM4NjEyMTFFMUEzMkNDMUE3NjZERDE2QjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QjM4QzU3MDg2MTIxMUUxQTMyQ0MxQTc2NkREMTZCMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QjM4QzU3MTg2MTIxMUUxQTMyQ0MxQTc2NkREMTZCMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAEALAAAAAANAAoAAAIXTGCJebD9jEOTqRlttXdrB32PJ2ncyRQAOw==' : IMAGE_PATH + '/clear.gif';
Dialog.prototype.bgOpacity = 80;
Dialog.prototype.getPosition = function(a, b) {
  return new mxPoint(a, b);
};
Dialog.prototype.close = function(a, b) {
  if (null != this.onDialogClose) {
    if (0 == this.onDialogClose(a, b))
      return !1;
    this.onDialogClose = null;
  }
  null != this.dialogImg && null != this.dialogImg.parentNode && (this.dialogImg.parentNode.removeChild(this.dialogImg), this.dialogImg = null);
  null != this.bg && null != this.bg.parentNode && this.bg.parentNode.removeChild(this.bg);
  mxEvent.removeListener(window, 'resize', this.resizeListener);
  null != this.container.parentNode && this.container.parentNode.removeChild(this.container);
};