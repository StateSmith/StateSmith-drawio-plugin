function Sidebar(a, b) {
  this.editorUi = a;
  this.container = b;
  this.palettes = {};
  this.taglist = {};
  this.lastCreated = 0;
  this.showTooltips = !0;
  this.graph = a.createTemporaryGraph(this.editorUi.editor.graph.getStylesheet());
  this.graph.cellRenderer.minSvgStrokeWidth = this.minThumbStrokeWidth;
  this.graph.cellRenderer.antiAlias = this.thumbAntiAlias;
  this.graph.container.style.visibility = 'hidden';
  this.graph.shapeBackgroundColor = 'transparent';
  this.graph.foldingEnabled = !1;
  this.container.style.overflow = 'visible';
  this.wrapper = document.createElement('div');
  this.wrapper.style.position = 'relative';
  this.wrapper.style.overflowX = 'hidden';
  this.wrapper.style.overflowY = 'auto';
  this.wrapper.style.left = '0px';
  this.wrapper.style.top = '0px';
  this.wrapper.style.right = '0px';
  this.wrapper.style.boxSizing = 'border-box';
  this.wrapper.style.maxHeight = 'calc(100% - ' + this.moreShapesHeight + 'px)';
  this.container.appendChild(this.wrapper);
  a = this.createMoreShapes();
  this.container.appendChild(a);
  document.body.appendChild(this.graph.container);
  this.pointerUpHandler = mxUtils.bind(this, function() {
    if (null == this.tooltipCloseImage || 'none' == this.tooltipCloseImage.style.display)
      this.showTooltips = !0, this.hideTooltip();
  });
  mxEvent.addListener(document, mxClient.IS_POINTER ? 'pointerup' : 'mouseup', this.pointerUpHandler);
  this.pointerDownHandler = mxUtils.bind(this, function() {
    if (null == this.tooltipCloseImage || 'none' == this.tooltipCloseImage.style.display)
      this.showTooltips = !1, this.hideTooltip();
  });
  mxEvent.addListener(document, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', this.pointerDownHandler);
  this.pointerMoveHandler = mxUtils.bind(this, function(f) {
    if (300 < Date.now() - this.lastCreated && (null == this.tooltipCloseImage || 'none' == this.tooltipCloseImage.style.display)) {
      for (f = mxEvent.getSource(f); null != f;) {
        if (f == this.currentElt)
          return;
        f = f.parentNode;
      }
      this.hideTooltip();
    }
  });
  mxEvent.addListener(document, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', this.pointerMoveHandler);
  this.pointerOutHandler = mxUtils.bind(this, function(f) {
    null == f.toElement && null == f.relatedTarget && this.hideTooltip();
  });
  mxEvent.addListener(document, mxClient.IS_POINTER ? 'pointerout' : 'mouseout', this.pointerOutHandler);
  mxEvent.addListener(b, 'scroll', mxUtils.bind(this, function() {
    this.showTooltips = !0;
    this.hideTooltip();
  }));
  this.init();
}
Sidebar.prototype.init = function() {
  var a = STENCIL_PATH;
  this.addSearchPalette(!0);
  this.addGeneralPalette(!0);
  this.addMiscPalette(!1);
  this.addAdvancedPalette(!1);
  this.addBasicPalette(a);
  this.setCurrentSearchEntryLibrary('arrows');
  this.addStencilPalette('arrows', mxResources.get('arrows'), a + '/arrows.xml', ';whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2');
  this.setCurrentSearchEntryLibrary();
  this.addUmlPalette(!1);
  this.addBpmnPalette(a, !1);
  this.setCurrentSearchEntryLibrary('flowchart');
  this.addStencilPalette('flowchart', 'Flowchart', a + '/flowchart.xml', ';whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2');
  this.setCurrentSearchEntryLibrary();
  this.setCurrentSearchEntryLibrary('clipart');
  this.addImagePalette('clipart', mxResources.get('clipart'), a + '/clipart/', '_128x128.png', 'Earth_globe Empty_Folder Full_Folder Gear Lock Software Virus Email Database Router_Icon iPad iMac Laptop MacBook Monitor_Tower Printer Server_Tower Workstation Firewall_02 Wireless_Router_N Credit_Card Piggy_Bank Graph Safe Shopping_Cart Suit1 Suit2 Suit3 Pilot1 Worker1 Soldier1 Doctor1 Tech1 Security1 Telesales1'.split(' '), null, {
    Wireless_Router_N: 'wireless router switch wap wifi access point wlan',
    Router_Icon: 'router switch'
  });
  this.setCurrentSearchEntryLibrary();
};
Sidebar.prototype.collapsedImage = mxClient.IS_SVG ? 'data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNUQyRTJFNjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNUQyRTJFNzZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MEUxNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MEUyNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhSMj6lrwAjcC1GyahV+dcZJgeIIFgA7' : IMAGE_PATH + '/collapsed.gif';
Sidebar.prototype.expandedImage = mxClient.IS_SVG ? 'data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxREY3NzBERjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxREY3NzBFMDZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MERENkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MERFNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7' : IMAGE_PATH + '/expanded.gif';
Sidebar.prototype.searchImage = mxClient.IS_SVG ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEaSURBVHjabNGxS5VxFIfxz71XaWuQUJCG/gCHhgTD9VpEETg4aMOlQRp0EoezObgcd220KQiXmpretTAHQRBdojlQEJyukPdt+b1ywfvAGc7wnHP4nlZd1yKijQW8xzNc4Su+ZOYfQ3T6/f4YNvEJYzjELXp4VVXVz263+7cR2niBxAFeZ2YPi3iHR/gYERPDwhpOsd6sz8x/mfkNG3iOlWFhFj8y89J9KvzGXER0GuEaD42mgwHqUtoljbcRsTBCeINpfM/MgZLKPpaxFxGbOCqDXmILN7hoJrTKH+axhxmcYRxP0MIDnOBDZv5q1XUNIuJxifJp+UNV7t7BFM6xeic0RMQ4Bpl5W/ol7GISx/eEUUTECrbx+f8A8xhiZht9zsgAAAAASUVORK5CYII=' : IMAGE_PATH + '/search.png';
Sidebar.prototype.enableTooltips = !0;
Sidebar.prototype.tooltipBorder = 16;
Sidebar.prototype.tooltipDelay = 300;
Sidebar.prototype.dropTargetDelay = 200;
Sidebar.prototype.gearImage = STENCIL_PATH + '/clipart/Gear_128x128.png';
Sidebar.prototype.thumbWidth = 42;
Sidebar.prototype.thumbHeight = 42;
Sidebar.prototype.minThumbStrokeWidth = 1;
Sidebar.prototype.thumbAntiAlias = !1;
Sidebar.prototype.thumbPadding = 5 <= document.documentMode ? 2 : 3;
Sidebar.prototype.thumbBorder = 2;
Sidebar.prototype.moreShapesHeight = 52;
'large' != urlParams['sidebar-entries'] && (Sidebar.prototype.thumbPadding = 5 <= document.documentMode ? 0 : 1, Sidebar.prototype.thumbBorder = 1, Sidebar.prototype.thumbWidth = 32, Sidebar.prototype.thumbHeight = 30, Sidebar.prototype.minThumbStrokeWidth = 1.3, Sidebar.prototype.thumbAntiAlias = !0);
Sidebar.prototype.sidebarTitleSize = 8;
Sidebar.prototype.sidebarTitles = !1;
Sidebar.prototype.tooltipTitles = !0;
Sidebar.prototype.maxTooltipWidth = 400;
Sidebar.prototype.maxTooltipHeight = 400;
Sidebar.prototype.addStencilsToIndex = !0;
Sidebar.prototype.defaultImageWidth = 80;
Sidebar.prototype.defaultImageHeight = 80;
Sidebar.prototype.tooltipMouseDown = null;
Sidebar.prototype.refresh = function() {
  this.graph.stylesheet.styles = mxUtils.clone(this.editorUi.editor.graph.stylesheet.styles);
  this.wrapper.innerText = '';
  this.palettes = {};
  this.init();
};
Sidebar.prototype.getEntryContainer = function() {
  return this.wrapper;
};
Sidebar.prototype.appendChild = function(a) {
  this.wrapper.appendChild(a);
};
Sidebar.prototype.getTooltipOffset = function(a, b) {
  b = b.height + 2 * this.tooltipBorder;
  return new mxPoint(this.container.offsetWidth + 2 + this.editorUi.container.offsetLeft, Math.min(Math.max(document.body.clientHeight || 0, document.documentElement.clientHeight) - b - 20, Math.max(0, this.editorUi.container.offsetTop + this.container.offsetTop + a.offsetTop - this.wrapper.scrollTop - b / 2 + 16)));
};
Sidebar.prototype.createMoreShapes = function() {
  var a = this.editorUi.createDiv('geSidebarFooter');
  a.style.position = 'absolute';
  a.style.overflow = 'hidden';
  a.style.display = 'inline-flex';
  a.style.alignItems = 'center';
  a.style.justifyContent = 'center';
  a.style.width = '100%';
  a.style.marginTop = '-1px';
  a.style.height = this.moreShapesHeight + 'px';
  var b = document.createElement('button');
  b.className = 'geBtn gePrimaryBtn';
  b.style.display = 'inline-flex';
  b.style.alignItems = 'center';
  b.style.whiteSpace = 'nowrap';
  b.style.padding = '8px';
  b.style.margin = '0px';
  b.innerHTML = '<span>+</span>';
  var f = b.getElementsByTagName('span')[0];
  f.style.fontSize = '18px';
  f.style.marginRight = '5px';
  mxUtils.write(b, mxResources.get('moreShapes'));
  mxEvent.addListener(b, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(e) {
    e.preventDefault();
  }));
  mxEvent.addListener(b, 'click', mxUtils.bind(this, function(e) {
    this.editorUi.actions.get('shapes').funct();
    mxEvent.consume(e);
  }));
  a.appendChild(b);
  return a;
};
Sidebar.prototype.createTooltip = function(a, b, f, e, g, d, h, n, u, m, p) {
  p = null != p ? p : !0;
  this.tooltipMouseDown = u;
  null == this.tooltip && (this.tooltip = document.createElement('div'), this.tooltip.className = 'geSidebarTooltip', this.tooltip.style.userSelect = 'none', this.tooltip.style.zIndex = mxPopupMenu.prototype.zIndex - 1, document.body.appendChild(this.tooltip), mxEvent.addMouseWheelListener(mxUtils.bind(this, function(x) {
    this.hideTooltip();
  }), this.tooltip), this.graph2 = new Graph(this.tooltip, null, null, this.editorUi.editor.graph.getStylesheet()), this.graph2.shapeBackgroundColor = 'transparent', this.graph2.resetViewOnRootChange = !1, this.graph2.foldingEnabled = !1, this.graph2.gridEnabled = !1, this.graph2.autoScroll = !1, this.graph2.setTooltips(!1), this.graph2.setConnectable(!1), this.graph2.setPanning(!1), this.graph2.setEnabled(!1), this.graph2.openLink = mxUtils.bind(this, function() {
    this.hideTooltip();
  }), mxEvent.addGestureListeners(this.tooltip, mxUtils.bind(this, function(x) {
    null != this.tooltipMouseDown && this.tooltipMouseDown(x);
    window.setTimeout(mxUtils.bind(this, function() {
      null != this.tooltipCloseImage && 'none' != this.tooltipCloseImage.style.display || this.hideTooltip();
    }), 0);
  }), null, mxUtils.bind(this, function(x) {
    this.hideTooltip();
  })), mxClient.IS_SVG || (this.graph2.view.canvas.style.position = 'relative'), u = document.createElement('img'), u.setAttribute('src', Dialog.prototype.closeImage), u.setAttribute('title', mxResources.get('close')), u.style.position = 'absolute', u.style.cursor = 'default', u.style.padding = '8px', u.style.right = '2px', u.style.top = '2px', this.tooltip.appendChild(u), this.tooltipCloseImage = u, mxEvent.addListener(u, 'click', mxUtils.bind(this, function(x) {
    this.hideTooltip();
    mxEvent.consume(x);
  })));
  this.tooltipCloseImage.style.display = m ? '' : 'none';
  this.graph2.model.clear();
  this.graph2.view.setTranslate(this.tooltipBorder, this.tooltipBorder);
  this.graph2.view.scale = !n && (f > this.maxTooltipWidth || e > this.maxTooltipHeight) ? Math.round(100 * Math.min(this.maxTooltipWidth / f, this.maxTooltipHeight / e)) / 100 : 1;
  this.tooltip.style.display = 'block';
  this.graph2.labelsVisible = null == d || d;
  d = mxClient.NO_FO;
  mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
  m = mxUtils.getCurrentStyle(this.tooltip);
  this.graph2.shapeBackgroundColor = m.backgroundColor;
  b = this.graph2.cloneCells(b);
  this.editorUi.insertHandler(b, null, this.graph2.model, p ? null : this.editorUi.editor.graph.defaultVertexStyle, p ? null : this.editorUi.editor.graph.defaultEdgeStyle, p, !0);
  this.graph2.addCells(b);
  mxClient.NO_FO = d;
  p = this.graph2.getGraphBounds();
  n && 0 < f && 0 < e && (p.width > f || p.height > e) ? (f = Math.round(100 * Math.min(f / p.width, e / p.height)) / 100, mxClient.NO_FO ? (this.graph2.view.setScale(Math.round(100 * Math.min(this.maxTooltipWidth / p.width, this.maxTooltipHeight / p.height)) / 100), p = this.graph2.getGraphBounds()) : (this.graph2.view.getDrawPane().ownerSVGElement.style.transform = 'scale(' + f + ')', this.graph2.view.getDrawPane().ownerSVGElement.style.transformOrigin = '0 0', p.width *= f, p.height *= f)) : mxClient.NO_FO || (this.graph2.view.getDrawPane().ownerSVGElement.style.transform = '');
  f = p.width + 2 * this.tooltipBorder + 4;
  e = p.height + 2 * this.tooltipBorder;
  this.tooltip.style.overflow = 'visible';
  this.tooltip.style.width = f + 'px';
  n = f;
  this.tooltipTitles && null != g && 0 < g.length ? (null == this.tooltipTitle ? (this.tooltipTitle = document.createElement('div'), this.tooltipTitle.style.borderTop = '1px solid gray', this.tooltipTitle.style.textAlign = 'center', this.tooltipTitle.style.width = '100%', this.tooltipTitle.style.overflow = 'hidden', this.tooltipTitle.style.position = 'absolute', this.tooltipTitle.style.paddingTop = '6px', this.tooltipTitle.style.bottom = '6px', this.tooltip.appendChild(this.tooltipTitle)) : this.tooltipTitle.innerText = '', this.tooltipTitle.style.display = '', mxUtils.write(this.tooltipTitle, g), n = Math.min(this.maxTooltipWidth, Math.max(f, this.tooltipTitle.scrollWidth + 4)), g = this.tooltipTitle.offsetHeight + 10, e += g, mxClient.IS_SVG ? this.tooltipTitle.style.marginTop = 2 - g + 'px' : (e -= 6, this.tooltipTitle.style.top = e - g + 'px')) : null != this.tooltipTitle && null != this.tooltipTitle.parentNode && (this.tooltipTitle.style.display = 'none');
  n > f && (this.tooltip.style.width = n + 'px');
  this.tooltip.style.height = e + 'px';
  g = -Math.round(p.x - this.tooltipBorder) + (n > f ? (n - f) / 2 : 0);
  f = -Math.round(p.y - this.tooltipBorder);
  h = null != h ? h : this.getTooltipOffset(a, p);
  a = h.x;
  h = h.y;
  mxClient.IS_SVG ? 0 != g || 0 != f ? this.graph2.view.canvas.setAttribute('transform', 'translate(' + g + ',' + f + ')') : this.graph2.view.canvas.removeAttribute('transform') : (this.graph2.view.drawPane.style.left = g + 'px', this.graph2.view.drawPane.style.top = f + 'px');
  this.tooltip.style.position = 'absolute';
  this.tooltip.style.left = a + 'px';
  this.tooltip.style.top = h + 'px';
  mxUtils.fit(this.tooltip);
  this.lastCreated = Date.now();
};
Sidebar.prototype.showTooltip = function(a, b, f, e, g, d) {
  if (this.enableTooltips && this.showTooltips && this.currentElt != a) {
    null != this.thread && (window.clearTimeout(this.thread), this.thread = null);
    var h = mxUtils.bind(this, function() {
      this.createTooltip(a, b, f, e, g, d);
    });
    null != this.tooltip && 'none' != this.tooltip.style.display ? h() : this.thread = window.setTimeout(h, this.tooltipDelay);
    this.currentElt = a;
  }
};
Sidebar.prototype.hideTooltip = function() {
  null != this.thread && (window.clearTimeout(this.thread), this.thread = null);
  null != this.tooltip && (this.tooltip.style.display = 'none', this.currentElt = null);
  this.tooltipMouseDown = null;
};
Sidebar.prototype.addDataEntry = function(a, b, f, e, g) {
  return this.addEntry(a, mxUtils.bind(this, function() {
    return this.createVertexTemplateFromData(g, b, f, e);
  }));
};
Sidebar.prototype.addEntries = function(a) {
  for (var b = 0; b < a.length; b++)
    mxUtils.bind(this, function(f) {
      var e = f.data,
        g = null != f.title ? f.title : '';
      null != f.tags && (g += ' ' + f.tags);
      null != e && 0 < g.length ? this.addEntry(g, mxUtils.bind(this, function() {
        e = this.editorUi.convertDataUri(e);
        var d = 'shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;';
        'fixed' == f.aspect && (d += 'aspect=fixed;');
        return this.createVertexTemplate(d + 'image=' + e, f.w, f.h, '', f.title || '', !1, !1, !0);
      })) : null != f.xml && 0 < g.length && this.addEntry(g, mxUtils.bind(this, function() {
        var d = this.editorUi.stringToCells(Graph.decompress(f.xml));
        return this.createVertexTemplateFromCells(d, f.w, f.h, f.title || '', !0, !1, !0);
      }));
    })(a[b]);
};
Sidebar.prototype.setCurrentSearchEntryLibrary = function(a, b) {
  this.currentSearchEntryLibrary = null != a ? {
    id: a,
    lib: b
  } : null;
};
Sidebar.prototype.addEntry = function(a, b) {
  if (null != this.taglist && null != a && 0 < a.length) {
    null != this.currentSearchEntryLibrary && (b.parentLibraries = [this.currentSearchEntryLibrary]);
    a = a.toLowerCase().replace(/[\/,\(\)]/g, ' ').split(' ');
    for (var f = [], e = {}, g = 0; g < a.length; g++) {
      null == e[a[g]] && (e[a[g]] = !0, f.push(a[g]));
      var d = a[g].replace(/\.*\d*$/, '');
      d != a[g] && null == e[d] && (e[d] = !0, f.push(d));
    }
    for (g = 0; g < f.length; g++)
      this.addEntryForTag(f[g], b);
  }
  return b;
};
Sidebar.prototype.addEntryForTag = function(a, b) {
  if (null != a && 1 < a.length) {
    var f = this.taglist[a];
    'object' !== typeof f && (f = {
      entries: []
    }, this.taglist[a] = f);
    f.entries.push(b);
  }
};
Sidebar.prototype.searchEntries = function(a, b, f, e, g) {
  if (null != this.taglist && null != a) {
    var d = a.toLowerCase().split(' ');
    g = new mxDictionary();
    var h = (f + 1) * b;
    a = [];
    for (var n = 0, u = 0; u < d.length; u++)
      if (0 < d[u].length) {
        var m = this.taglist[d[u]],
          p = new mxDictionary();
        if (null != m) {
          var x = m.entries;
          a = [];
          for (var A = 0; A < x.length; A++)
            if (m = x[A], 0 == n == (null == g.get(m)) && (p.put(m, m), a.push(m), u == d.length - 1 && a.length == h)) {
              e(a.slice(f * b, h), h, !0, d);
              return;
            }
        } else
          a = [];
        g = p;
        n++;
      }
    g = a.length;
    e(a.slice(f * b, (f + 1) * b), g, !1, d);
  } else
    e([], null, null, d);
};
Sidebar.prototype.filterTags = function(a) {
  if (null != a) {
    a = a.split(' ');
    for (var b = [], f = {}, e = 0; e < a.length; e++)
      null == f[a[e]] && (f[a[e]] = '1', b.push(a[e]));
    return b.join(' ');
  }
  return null;
};
Sidebar.prototype.cloneCell = function(a, b) {
  a = a.clone();
  null != b && (a.value = b);
  return a;
};
Sidebar.prototype.showPopupMenuForEntry = function(a, b, f) {};
Sidebar.prototype.addSearchPalette = function(a) {
  var b = document.createElement('div');
  b.style.visibility = 'hidden';
  this.appendChild(b);
  var f = document.createElement('div');
  f.className = 'geSidebar geSearchSidebar';
  a || (f.style.display = 'none');
  var e = document.createElement('div');
  e.style.whiteSpace = 'nowrap';
  e.style.textOverflow = 'clip';
  e.style.paddingBottom = '8px';
  e.style.cursor = 'default';
  var g = document.createElement('input');
  g.setAttribute('placeholder', mxResources.get('searchShapes'));
  g.setAttribute('type', 'text');
  e.appendChild(g);
  var d = document.createElement('img');
  d.setAttribute('src', Sidebar.prototype.searchImage);
  d.setAttribute('title', mxResources.get('search'));
  d.style.position = 'relative';
  d.style.left = '-18px';
  d.style.top = '1px';
  d.style.background = 'url(\'' + this.editorUi.editor.transparentImage + '\')';
  e.appendChild(d);
  f.appendChild(e);
  var h = document.createElement('center'),
    n = mxUtils.button(mxResources.get('moreResults'), function() {
      G();
    });
  n.style.display = 'none';
  n.style.lineHeight = 'normal';
  n.style.fontSize = '12px';
  n.style.padding = '6px 12px 6px 12px';
  n.style.marginTop = '4px';
  n.style.marginBottom = '8px';
  h.style.paddingTop = '4px';
  h.style.paddingBottom = '4px';
  h.appendChild(n);
  f.appendChild(h);
  var u = '',
    m = !1,
    p = !1,
    x = 0,
    A = {},
    C = 12,
    D = mxUtils.bind(this, function() {
      m = !1;
      this.currentSearch = null;
      for (var F = f.firstChild; null != F;) {
        var K = F.nextSibling;
        F != e && F != h && F.parentNode.removeChild(F);
        F = K;
      }
    });
  mxEvent.addListener(d, 'click', function() {
    d.getAttribute('src') == Dialog.prototype.closeImage && (d.setAttribute('src', Sidebar.prototype.searchImage), d.setAttribute('title', mxResources.get('search')), n.style.display = 'none', u = g.value = '', D());
    g.focus();
  });
  var G = mxUtils.bind(this, function() {
    C = 4 * Math.max(1, Math.floor(this.container.clientWidth / (this.thumbWidth + 10)));
    this.hideTooltip();
    if ('' != g.value) {
      if (null != h.parentNode && (u != g.value && (D(), u = g.value, A = {}, p = !1, x = 0), !m && !p)) {
        n.setAttribute('disabled', 'true');
        n.style.display = '';
        n.style.cursor = 'wait';
        n.innerHTML = mxResources.get('loading') + '...';
        m = !0;
        var F = {};
        this.currentSearch = F;
        this.searchEntries(u, C, x, mxUtils.bind(this, function(K, P, R, Q) {
          if (this.currentSearch == F) {
            K = null != K ? K : [];
            m = !1;
            x++;
            this.insertSearchHint(f, u, C, x, K, P, R, Q);
            0 == K.length && 1 == x && (u = '');
            null != h.parentNode && h.parentNode.removeChild(h);
            for (P = 0; P < K.length; P++)
              mxUtils.bind(this, function(ba) {
                try {
                  var V = ba();
                  null == A[V.innerHTML] ? (A[V.innerHTML] = null != ba.parentLibraries ? ba.parentLibraries.slice() : [], f.appendChild(V)) : null != ba.parentLibraries && (A[V.innerHTML] = A[V.innerHTML].concat(ba.parentLibraries));
                  mxEvent.addGestureListeners(V, null, null, mxUtils.bind(this, function(T) {
                    var Z = A[V.innerHTML];
                    mxEvent.isPopupTrigger(T) && this.showPopupMenuForEntry(V, Z, T);
                  }));
                  mxEvent.disableContextMenu(V);
                } catch (T) {}
              })(K[P]);
            R ? (n.removeAttribute('disabled'), n.innerHTML = mxResources.get('moreResults')) : (n.innerHTML = mxResources.get('reset'), n.style.display = 'none', p = !0);
            n.style.cursor = '';
            f.appendChild(h);
          }
        }), mxUtils.bind(this, function() {
          n.style.cursor = '';
        }));
      }
    } else
      D(), u = g.value = '', A = {}, n.style.display = 'none', p = !1, g.focus();
  });
  this.searchShapes = function(F) {
    g.value = F;
    G();
  };
  mxEvent.addListener(g, 'keydown', mxUtils.bind(this, function(F) {
    13 == F.keyCode && (G(), mxEvent.consume(F));
  }));
  a = mxUtils.bind(this, function() {
    window.setTimeout(mxUtils.bind(this, function() {
      '' == g.value ? (d.setAttribute('src', Sidebar.prototype.searchImage), d.setAttribute('title', mxResources.get('search'))) : (d.setAttribute('src', Dialog.prototype.closeImage), d.setAttribute('title', mxResources.get('reset')));
      '' == g.value ? (p = !0, n.style.display = 'none') : g.value != u ? (n.style.display = 'none', p = !1) : m || (n.style.display = p ? 'none' : '');
    }), 0);
  });
  mxEvent.addListener(g, 'keyup', a);
  mxEvent.addListener(g, 'paste', a);
  mxEvent.addListener(g, 'cut', a);
  mxEvent.addListener(g, 'mousedown', function(F) {
    F.stopPropagation && F.stopPropagation();
    F.cancelBubble = !0;
  });
  mxEvent.addListener(g, 'selectstart', function(F) {
    F.stopPropagation && F.stopPropagation();
    F.cancelBubble = !0;
  });
  a = document.createElement('div');
  a.appendChild(f);
  this.appendChild(a);
  this.palettes.search = [
    b,
    a
  ];
};
Sidebar.prototype.insertSearchHint = function(a, b, f, e, g, d, h, n) {
  0 == g.length && 1 == e && (f = document.createElement('div'), f.className = 'geTitle', f.style.cssText = 'background-color:transparent;border-color:transparent;color:gray;padding:6px 0px 0px 0px !important;margin:4px 8px 4px 8px;text-align:center;cursor:default !important', mxUtils.write(f, mxResources.get('noResultsFor', [b])), a.appendChild(f));
};
Sidebar.prototype.addGeneralPalette = function(a) {
  this.setCurrentSearchEntryLibrary('general', 'general');
  var b = this,
    f = parseInt(this.editorUi.editor.graph.defaultVertexStyle.fontSize);
  f = isNaN(f) ? '' : 'fontSize=' + Math.min(16, f) + ';';
  var e = new mxCell('List Item', new mxGeometry(0, 0, 80, 30), 'text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;' + f);
  e.vertex = !0;
  f = [
    this.createVertexTemplateEntry('rounded=0;whiteSpace=wrap;html=1;', 120, 60, '', 'Rectangle', null, null, 'rect rectangle box'),
    this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;', 120, 60, '', 'Rounded Rectangle', null, null, 'rounded rect rectangle box'),
    this.createVertexTemplateEntry('text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;', 60, 30, 'Text', 'Text', null, null, 'text textbox textarea label'),
    this.createVertexTemplateEntry('text;html=1;strokeColor=none;fillColor=none;spacing=5;spacingTop=-20;whiteSpace=wrap;overflow=hidden;rounded=0;', 190, 120, '<h1>Heading</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>', 'Textbox', null, null, 'text textbox textarea'),
    this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;', 120, 80, '', 'Ellipse', null, null, 'oval ellipse state'),
    this.createVertexTemplateEntry('whiteSpace=wrap;html=1;aspect=fixed;', 80, 80, '', 'Square', null, null, 'square'),
    this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;', 80, 80, '', 'Circle', null, null, 'circle'),
    this.createVertexTemplateEntry('shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;', 120, 60, '', 'Process', null, null, 'process task'),
    this.createVertexTemplateEntry('rhombus;whiteSpace=wrap;html=1;', 80, 80, '', 'Diamond', null, null, 'diamond rhombus if condition decision conditional question test'),
    this.createVertexTemplateEntry('shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 60, '', 'Parallelogram'),
    this.createVertexTemplateEntry('shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80, '', 'Hexagon', null, null, 'hexagon preparation'),
    this.createVertexTemplateEntry('triangle;whiteSpace=wrap;html=1;', 60, 80, '', 'Triangle', null, null, 'triangle logic inverter buffer'),
    this.createVertexTemplateEntry('shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;', 60, 80, '', 'Cylinder', null, null, 'cylinder data database'),
    this.createVertexTemplateEntry('ellipse;shape=cloud;whiteSpace=wrap;html=1;', 120, 80, '', 'Cloud', null, null, 'cloud network'),
    this.createVertexTemplateEntry('shape=document;whiteSpace=wrap;html=1;boundedLbl=1;', 120, 80, '', 'Document'),
    this.createVertexTemplateEntry('shape=internalStorage;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Internal Storage'),
    this.createVertexTemplateEntry('shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;', 120, 80, '', 'Cube'),
    this.createVertexTemplateEntry('shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80, '', 'Step'),
    this.createVertexTemplateEntry('shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 60, '', 'Trapezoid'),
    this.createVertexTemplateEntry('shape=tape;whiteSpace=wrap;html=1;', 120, 100, '', 'Tape'),
    this.createVertexTemplateEntry('shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;', 80, 100, '', 'Note'),
    this.createVertexTemplateEntry('shape=card;whiteSpace=wrap;html=1;', 80, 100, '', 'Card'),
    this.createVertexTemplateEntry('shape=callout;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;', 120, 80, '', 'Callout', null, null, 'bubble chat thought speech message'),
    this.createVertexTemplateEntry('shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;', 30, 60, 'Actor', 'Actor', !1, null, 'user person human stickman'),
    this.createVertexTemplateEntry('shape=xor;whiteSpace=wrap;html=1;', 60, 80, '', 'Or', null, null, 'logic or'),
    this.createVertexTemplateEntry('shape=or;whiteSpace=wrap;html=1;', 60, 80, '', 'And', null, null, 'logic and'),
    this.createVertexTemplateEntry('shape=dataStorage;whiteSpace=wrap;html=1;fixedSize=1;', 100, 80, '', 'Data Storage'),
    this.createVertexTemplateEntry('swimlane;startSize=0;', 200, 200, '', 'Container', null, null, 'container swimlane lane pool group'),
    this.createVertexTemplateEntry('swimlane;whiteSpace=wrap;html=1;', 200, 200, 'Vertical Container', 'Container', null, null, 'container swimlane lane pool group'),
    this.createVertexTemplateEntry('swimlane;horizontal=0;whiteSpace=wrap;html=1;', 200, 200, 'Horizontal Container', 'Horizontal Container', null, null, 'container swimlane lane pool group'),
    this.addEntry('list group erd table', function() {
      var g = new mxCell('List', new mxGeometry(0, 0, 140, 120), 'swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;');
      g.vertex = !0;
      g.insert(b.cloneCell(e, 'Item 1'));
      g.insert(b.cloneCell(e, 'Item 2'));
      g.insert(b.cloneCell(e, 'Item 3'));
      return b.createVertexTemplateFromCells([g], g.geometry.width, g.geometry.height, 'List');
    }),
    this.addEntry('list item entry value group erd table', function() {
      return b.createVertexTemplateFromCells([b.cloneCell(e, 'List Item')], e.geometry.width, e.geometry.height, 'List Item');
    }),
    this.addEntry('curve', mxUtils.bind(this, function() {
      var g = new mxCell('', new mxGeometry(0, 0, 50, 50), 'curved=1;endArrow=classic;html=1;');
      g.geometry.setTerminalPoint(new mxPoint(0, 50), !0);
      g.geometry.setTerminalPoint(new mxPoint(50, 0), !1);
      g.geometry.points = [
        new mxPoint(50, 50),
        new mxPoint(0, 0)
      ];
      g.geometry.relative = !0;
      g.edge = !0;
      return this.createEdgeTemplateFromCells([g], g.geometry.width, g.geometry.height, 'Curve');
    })),
    this.createEdgeTemplateEntry('shape=flexArrow;endArrow=classic;startArrow=classic;html=1;', 100, 100, '', 'Bidirectional Arrow', null, 'line lines connector connectors connection connections arrow arrows bidirectional'),
    this.createEdgeTemplateEntry('shape=flexArrow;endArrow=classic;html=1;', 50, 50, '', 'Arrow', null, 'line lines connector connectors connection connections arrow arrows directional directed'),
    this.createEdgeTemplateEntry('endArrow=none;dashed=1;html=1;', 50, 50, '', 'Dashed Line', null, 'line lines connector connectors connection connections arrow arrows dashed undirected no'),
    this.createEdgeTemplateEntry('endArrow=none;dashed=1;html=1;dashPattern=1 3;strokeWidth=2;', 50, 50, '', 'Dotted Line', null, 'line lines connector connectors connection connections arrow arrows dotted undirected no'),
    this.createEdgeTemplateEntry('endArrow=none;html=1;', 50, 50, '', 'Line', null, 'line lines connector connectors connection connections arrow arrows simple undirected plain blank no'),
    this.createEdgeTemplateEntry('endArrow=classic;startArrow=classic;html=1;', 50, 50, '', 'Bidirectional Connector', null, 'line lines connector connectors connection connections arrow arrows bidirectional'),
    this.createEdgeTemplateEntry('endArrow=classic;html=1;', 50, 50, '', 'Directional Connector', null, 'line lines connector connectors connection connections arrow arrows directional directed'),
    this.createEdgeTemplateEntry('shape=link;html=1;', 100, 0, '', 'Link', null, 'line lines connector connectors connection connections arrow arrows link'),
    this.addEntry('line lines connector connectors connection connections arrow arrows edge title', mxUtils.bind(this, function() {
      var g = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=classic;html=1;');
      g.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      g.geometry.setTerminalPoint(new mxPoint(100, 0), !1);
      g.geometry.relative = !0;
      g.edge = !0;
      var d = new mxCell('Label', new mxGeometry(0, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=center;verticalAlign=middle;');
      d.geometry.relative = !0;
      d.setConnectable(!1);
      d.vertex = !0;
      g.insert(d);
      return this.createEdgeTemplateFromCells([g], 100, 0, 'Connector with Label');
    })),
    this.addEntry('line lines connector connectors connection connections arrow arrows edge title multiplicity', mxUtils.bind(this, function() {
      var g = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=classic;html=1;');
      g.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      g.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      g.geometry.relative = !0;
      g.edge = !0;
      var d = new mxCell('Label', new mxGeometry(0, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=center;verticalAlign=middle;');
      d.geometry.relative = !0;
      d.setConnectable(!1);
      d.vertex = !0;
      g.insert(d);
      d = new mxCell('Source', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;');
      d.geometry.relative = !0;
      d.setConnectable(!1);
      d.vertex = !0;
      g.insert(d);
      return this.createEdgeTemplateFromCells([g], 160, 0, 'Connector with 2 Labels');
    })),
    this.addEntry('line lines connector connectors connection connections arrow arrows edge title multiplicity', mxUtils.bind(this, function() {
      var g = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=classic;html=1;');
      g.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      g.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      g.geometry.relative = !0;
      g.edge = !0;
      var d = new mxCell('Label', new mxGeometry(0, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=center;verticalAlign=middle;');
      d.geometry.relative = !0;
      d.setConnectable(!1);
      d.vertex = !0;
      g.insert(d);
      d = new mxCell('Source', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;');
      d.geometry.relative = !0;
      d.setConnectable(!1);
      d.vertex = !0;
      g.insert(d);
      d = new mxCell('Target', new mxGeometry(1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=right;verticalAlign=bottom;');
      d.geometry.relative = !0;
      d.setConnectable(!1);
      d.vertex = !0;
      g.insert(d);
      return this.createEdgeTemplateFromCells([g], 160, 0, 'Connector with 3 Labels');
    })),
    this.addEntry('line lines connector connectors connection connections arrow arrows edge shape symbol message mail email', mxUtils.bind(this, function() {
      var g = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=classic;html=1;');
      g.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      g.geometry.setTerminalPoint(new mxPoint(100, 0), !1);
      g.geometry.relative = !0;
      g.edge = !0;
      var d = new mxCell('', new mxGeometry(0, 0, 20, 14), 'shape=message;html=1;outlineConnect=0;');
      d.geometry.relative = !0;
      d.vertex = !0;
      d.geometry.offset = new mxPoint(-10, -7);
      g.insert(d);
      return this.createEdgeTemplateFromCells([g], 100, 0, 'Connector with Symbol');
    }))
  ];
  this.addPaletteFunctions('general', mxResources.get('general'), null != a ? a : !0, f);
  this.setCurrentSearchEntryLibrary();
};
Sidebar.prototype.addMiscPalette = function(a) {
  var b = this;
  this.setCurrentSearchEntryLibrary('general', 'misc');
  var f = [
    this.createVertexTemplateEntry('text;strokeColor=none;fillColor=none;html=1;fontSize=24;fontStyle=1;verticalAlign=middle;align=center;', 100, 40, 'Title', 'Title', null, null, 'text heading title'),
    this.createVertexTemplateEntry('text;strokeColor=none;fillColor=none;html=1;whiteSpace=wrap;verticalAlign=middle;overflow=hidden;', 100, 80, '<ul><li>Value 1</li><li>Value 2</li><li>Value 3</li></ul>', 'Unordered List'),
    this.createVertexTemplateEntry('text;strokeColor=none;fillColor=none;html=1;whiteSpace=wrap;verticalAlign=middle;overflow=hidden;', 100, 80, '<ol><li>Value 1</li><li>Value 2</li><li>Value 3</li></ol>', 'Ordered List'),
    this.addDataEntry('table', 180, 120, 'Table 1', '7ZjBTuMwEIafJteVnVDoXpuycGAvsC9g6mltyfFE9kAann7txN2qqIgU0aCllRJpZjxO7G9i/3KyoqzWN07U6jdKMFlxnRWlQ6TeqtYlGJPlTMusmGd5zsKd5b/eaOVdK6uFA0tDOuR9h2dhnqCP9AFPrUkBr0QdTRKPMTRTVIVhznkwG6UJHmqxiO1NmESIeRKOHvRLDLHgL9CS0BZc6rNAY0TtdfewPkNpI+9Ei0+0ec3Gm6XhgSNYvznFLpTmdwNYAbk2pDRakkoZ0x4DU6BXatMtsWHC94HVv75bYsFI0PYDLA4EeI9NZIhOv0QwJjF4Tc03ujLCwi0I+So0Q9mmEGGdLANLSuYjEmGVHJemy/aSlw7rP8KtYJOy1MaUaDAWy6KN5a5RW+oATWbhCshK9mOSTcLMyuDzrR+umO6oROvJhaLHx4Lw1IAfXMz8Y8W8+IRaXgyvZRgxaWHuYUHCroasi7AObMze0t8D+7CCYkC5NPGDmistJdihjIt3GV8eCfHkxBGvd/GOQPzyTHxnsx8B+dVZE0bRhHa3ZGNIxPRUVtPVl0nEzxNHPL5EcHZGPrZGcH4WiTFFYjqiSPADTtX/93ri7x+9j7aADjh5f0/IXyAU3+GE3O1L4K6fod+e+CfV4YjqEdztL8GubeeP4V8='),
    this.addDataEntry('table', 180, 120, 'Table 2', '7ZhRb5swEMc/Da+TDSFJX0O27qF7aae9u8EJlowP2ZcR+ulng1maJlbTaaEPIBHpfL5z8O/v0wlHSVYe7jWrih+QcxklX6Mk0wDYWeUh41JGMRF5lKyjOCb2F8XfArO0nSUV01zhNQlxl/CbyT3vPJ3DYCO9wxSsciayZ+daFVja11xTa9aFQP5UsY2br+0mrM8g0/gkXpyL2PEGFDKhuPY5G5CSVUa0i3URhZD5A2tgj/3f9CMXvS/Vg803PlpD/Xro359r5Icgg9blAdxzKDnqxobUIsfCRyw7TqTgYlf0aR4eYaZz7P7mHpFaw1O9TDj5IOFHqB1k0OLFkZN+n2+xmlqUkin+nbP8jWsFeeNdCJW3JN+iN58BEcoep98uuShNrqH6yfSO9yFbIWUGEpyaCpQ7DxUIhS2gdGUfiywjX9IotTvL7Jgex/Zx4RozUAa1PRVuWc4M1tzgtWLG/ybm7D9oOTvT8ldrxoQGRbWvjoLJR75BpnbXVJCtGOWijzJcoP4xZcEy3Up3staFyHOu3KL2ePkDReNr4Sfvwp/fiH0aZB8uqFGwP5xyH0CKeVCKZJLidd8YQIvF1F4GaS/NqWRDdJtlsMxmIymzxad1m7sg+3Tc7IfvNpQEtZhPWgzcbiid+s2Q/WY5YL+h55cBfaEtRlJo9P2bgptV1vlFQU9/OXL6n9Bzwl/6d5MYN246dni8AG3nTu5H/wA='),
    this.addDataEntry('table title', 180, 150, 'Table with Title 1', '7ZjBbtswDEC/xtfBsuumu8bZusN2afoDasxYAmjJkNk57tePkpVlXdMlBRYXaAI4AEmRcvgogpCTvGw2t0626oetAJP8S5KXzloapWZTAmKSpbpK8kWSZSn/kuzrK6sirKatdGDomIBsDPgp8RFGy718QBitHQ0YrZ2SrRcprObzjqSjpX7ytjxlw8oaktqAY4MIOqJsOx3cF8FDaay+y8E+0najrTZfc/Qyvs1HS9S1YXnFafgt5/FvgiPYvJpqMMU8b8E2QG5gl15XpKLHzYgjVaBrtQ0rolF2o6H+Hbsjx0KEtx9k/gLkvxne2Z7TUtbpJ08OI6Q/uQa91w1KA99AVn+Z5rYaoolsGyWENUXxwRLZJiouppvuLU3lbHsvXQ1bl7VGLC1aX01jja94a7WhAKiY88PIyvRTkRScWcm62On8eHdHpTUdOT4VfluQHfXQ0bHFzPYXc4i4Y8kO1fbqP5T26vjScgKkJd7BiqSpQ6coajCe6l5pgmUrV961554f+8Z4710x9rB/W30tk12jP18LpasKzLHI84P9c30ixMWZI948xzsB8esL8RCQTYd8dhkRU46I2YQj4uZcumn2biPi85kjnn5EiPSCfOoZIcRlSEw5JISYcEqIl7ftD9pQ4vBV/GQd9Iab+MeE/A6T4myuyAeYn3BUsLr7LBjWnn01/AU='),
    this.addDataEntry('table title', 180, 120, 'Table with Title 2', '7VhNc5swEP01XDt8xG58NU7Tg3uJM70rZg2aERIjbQLk13cl5DopJnHTYnPIDJ7ZT5l9T/sOBElaNreaVcUPlYEIkpsgSbVS2Fllk4IQQRzyLEhWQRyH9AvibwPZyGXDimmQeEpD3DU8MfEIXeSePQjoogZb4aOmYJU10WWTpUGmccOfbSwJKbBVEhmXoCkQOV8IVhnuyleuouAiW7NWPeL+oL233PEGsjtVG9+tVb2mw4xv3dHhG/8yNu1fGjRCMzi4C/mpb0GVgLqlkppnWPiK6w6csACeF/s2j1jITBfIf/cecCTDQ3kc1qQH69uI0ug0VqE0f7Y4Cj/3S5SdX/NSMAnfgWV/hJYqa30IVeUtATv05oNCVKV3tB83PEpUplV1z3QO+5IdFyJVQllupZKW/0pxiQ6g2ZIegiwNv8yCGU2Wkh8dfHpsucZUSYOa7og9FpjBGgyeSmZ8nMzWw+0pe4/b5D9Qe9WjNhrkliZAzsQdbJHJ3C1OgaXwt7guOMKmYltbWpMEdGskbfWBjSPg/x3BiqDdCXvBVgXPMpB7+kDfPEHH4slLlby7VFcj4T7r4f7TmXE4cfyZ4Dlhvupql4b+kMt83XXOBwj6FzKa10S8XIqxyJl/6t059W5+Rr372qN2mNtJ7NuH12l+MW27HtS2iWM9nrYNkHEBbVt8ats5tW1xRm2Lwh63ybQX7sP7tLiYuEXRoLpNHOzx1G2AjfHVjdzDxwWXe/Xt4Rc='),
    this.addDataEntry('crossfunctional cross-functional cross functional flowchart swimlane table', 400, 400, 'Cross-Functional Flowchart', '7ZjRatswFIafxpcDy87a7nJJlvZig9HuBVT7JBLIOkZSGrtPPymS2622Gwc6z6WGXBz9HBnxfxz+cKJ0VVTXipbsB+YgovRblMTul64Uonk+N2pRrUAIW/M8StdR4vQkSjYDOsmxMy6pAmnOvZz4yw9U7MEr9oFaf9rsZWY4SuqaNwIPGaPK+GZtahGaNaOlKw29d9IyY1zk32mNe9OozWmpjf3CHX90/YvYNaMQtNT8eHXtFAXZXmn+ALegfaNToSqpzMNhi9LchQcQew7vB2Wg6vXjKL0w49mSa8ACjKrt+cBzw/ydRexdjBnwHTMvRKq9sHu62224FYPnp1mkLRZfM4PKSuR142/xYJ1gqPijdcci81a1DNcHXggq4QZoY2cjLTGvg2SwDJWArQnlPRqDRYMpGOLqXGH5i6odNMKWC7FCYd+driVKGBV0MhR03fD03zjFnST/kPuixf0noxq6uQdeg2n+aaMfOikhC/PaB+w/jmo6lGDVS/AJ1mgEP/cSTGaCpwiSiykgvOhFmM4ITyFMrqaA8LI3PzumcM7Pt8jPrtkdP0CvWuAnMLLjTuzle4zNLzO3c7lNIyxJPJM7l9w0MpKQ3pDs+J8zh+RbhGQX+fFDkrRXPR9uZsngRdCUYpK0F0MzuXcSlO3dzoxuUkl5FJudfOj4a3H/Gw=='),
    this.addDataEntry('table', 280, 160, 'Table', '7Zpdc6IwFIZ/DfcksSqX1X7sxe6NdvY+ylEyjYQJsWp//QZIrDXSIkUdcZ3pTDiSNHmfHF5yRo8MF+tnSZPojwiBe+TRI0MphCpai/UQOPewz0KPPHgY+/rPw08l36L8Wz+hEmJVpQMuOrxRvoQicp+moNIinKoNN+FpxHj4m27EMhtX0QkHezWQMF3KlL3BCFL2nnXwdTRVUrzCUHAh8yFI0J/M9AzJYMY434nf94ZBB2c9IhqKlQ5mN5mJgVSwLl1cHjIrewaxACU3+pYVC1VkFtgvBPAjYPPIduuaIE2LwHzb90Mr3TByHZaOOBrp+Sdg1RllKxlEQrJ3ESvKt6pQqcY7Kq3YgtMYfgEN90IDEW5MSInEtDjMlGlOhFJiYS6kWV3WDqVIXqicgw1MBec0SdmE2397GBmsExrbacz0tMdmcS5PFkcgmXJpzvJPVYC4HkBCfs6v42z9F6b0arGP3N0v4himOdcvBayo0XbHU87msY5NtSAg90RH5nqn41P+yfaVWvBjEoV8q3NAjpPZDDbKZInnuW5Hjka5XnNMld7oyzhMHXbbeVbCeVeKE98MzvVn8Xd5dBqlW2G0Zul2S+m6j+GW00X9nov3ypO35+D9b64nM9fNZ6Lfei3+udf2Hb5/8+apvfYj6iTvKmIKxgmdZuOt9At4jUTt1XPVLwStkZh7ozWbmEEpuNO66mXAHemf9TlWGK1ZjsgvBXlaA70oyMpWeUUZidAteyWq7pWP90/4gTTjld27il6Jfu6VyK3J2FTtnClVm8hM9H1t5mDyfKFgjVTcG63hVCSlpO5aQOpIN6wPrsJoDYNzaz8WXLc94Cq73zWlnFvmuSH3u9BJMehWdL8GqrLIrfTY1OydKTX3FT/Ji2uxkVtdkUVuVcei7N8CyvZWY1F5PSe4IbJtrMQit+JzQwZ7oeMlsnW2c5wvcXkpyFaJruPtN6jnoFf0tovdWs8W1bkK56dE1d4Tpn1qHiLnPlCvllwLjpj68uPnVsXtu7/G+gc='),
    this.addDataEntry('table', 180, 140, 'Table', '7ZhNc5swEIZ/DXc+HH9cTdv00F7sTu8yWoOmi8QIOUB+fSUjJXEwMbZzgcl4PKNdIVn7PlovkhfFef0oSZH9FhTQi757USyFUG0rr2NA9EKfUS/65oWhr79e+KOnNzj2+gWRwNWQAWE74IngAVpP6yhVg9aRZAzpL9KIg5lRkR2Cs9YSkoMs2RNsoGTPZoCvvWVGqKissWeIsUAhtc0FB9OvpPgHzumFUeybj+6xqwGpoO6N6Oiy4TyCyEHJRj9SMaoy+8SyjdrPgKWZGzazTlK2jvRl7KtAumE1Oq9XdFkvHX0BTqmN0WGdCcmeBVcEnUKKSLV9o1jFciQcfgKh71xrQRvrUqKwLYS9ss2dUErk1pA2XNOmUhR/iEzBORKBSIqS7dD97Hl8UBeEu2Xs9bK3NrgenIOghbdBmy3uZzbrMPt7bIZ+0N3sgnNIjug+1Oh0C1shzmhDkKVcm4kWArR/XWVMwbYgiZmp0nlvtofKzcYIhmoZXdRyfqWUdrKNCZ2nCNfPRlDHx4nS+/XAadnh87LOQcgeepGd+X8aMbL6VOAJEZz3EoymSDAIp4dw8VXa7iltzSmji5Vufn+lW/Ym3WycSbe4rdJ9IOUNSfZuts9NslUvsodJIbuy0o2IYOD3IpxPEeHgUjcmht2TwFetu77WraKBte4TTnVB9+rCpV33xWUUaRdcvtgY+ytl0L0/cdCW04I23ZNd0H+fspokwwmc7bT5eqfcPv72yvk/'),
    this.addDataEntry('table', 180, 140, 'Table', '7ZhLc5swEMc/DXcejh9X3CY9tBe707uM1qCpkBixDpBPX2GkvLBi7LgHmBw8s1okof3/tF4kL1rn9YMiRfZLUuBe9N2L1kpK7Ky8XgPnXugz6kXfvDD09c8L7x1Pg+NTvyAKBA4ZEHYDHgk/QOfpHCU23DiSjHH6kzTy0M6IZMfBtmIFyUGV7BE2ULKndoCvvWVGqKxMY884X0sulW4LKXSf2LwTFELtXPfRZRb9ADIHVI3uUjGKmemx7GLzM2BpZofNjJOUnSN9HvsigzaMEqdVic6romMswOqxaaONM6nYkxRIuNUBicLtK10qlnMi4AcQ+s4VS9oYF8rCWBz2aMydRJS5aSgTbmtTJYvfRKVgHYnknBQl23H72tOQoC6IsMvY62VvTXAOaCUq+Resk4kMFMOhMMPrYM4Wn2c567H8czRDP+hvdSkEJEekH2rn0uKEbISzVOhmorUA7Y+rjCFsC5K0k1U68dudg3m7Z4KhckZn5ZxfqKaZbNNGL1IOl89GuI5PENRb+SBo2UP0vM5B1O6c1E78QY2bWv1W4wlBnDshRhOFGITTo7j4qn3/o/Y1b9mdLYXzz5fCpTMfZ6PNx8V1pfADNa/Iv3ez3Tb/Vk5qd1OjdmEpHBHEwHdSnE+U4uBaOCaM/TPDVzG8XTFcRQOL4Q3OhUH/6sNmZP+LZywZGZy/NRn752jQv5yx3JaT4zbds2HgvpdZTRXjBE6HuvlyOd11f313/Q8='),
    this.createVertexTemplateEntry('text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;overflow=fill;', 160, 140, '<table border="1" width="100%" height="100%" cellpadding="4" style="width:100%;height:100%;border-collapse:collapse;"><tr><th align="center"><b>Title</b></th></tr><tr><td align="center">Section 1.1\nSection 1.2\nSection 1.3</td></tr><tr><td align="center">Section 2.1\nSection 2.2\nSection 2.3</td></tr></table>', 'HTML Table 4'),
    this.addEntry('link hyperlink', mxUtils.bind(this, function() {
      var e = new mxCell('Link', new mxGeometry(0, 0, 60, 40), 'text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#0000EE;fontStyle=4;');
      e.vertex = !0;
      this.graph.setLinkForCell(e, 'https://www.draw.io');
      return this.createVertexTemplateFromCells([e], e.geometry.width, e.geometry.height, 'Link');
    })),
    this.addEntry('timestamp date time text label', mxUtils.bind(this, function() {
      var e = new mxCell('%date{ddd mmm dd yyyy HH:MM:ss}%', new mxGeometry(0, 0, 160, 20), 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;');
      e.vertex = !0;
      this.graph.setAttributeForCell(e, 'placeholders', '1');
      return this.createVertexTemplateFromCells([e], e.geometry.width, e.geometry.height, 'Timestamp');
    })),
    this.addEntry('variable placeholder metadata hello world text label', mxUtils.bind(this, function() {
      var e = new mxCell('%name% Text', new mxGeometry(0, 0, 80, 20), 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;');
      e.vertex = !0;
      this.graph.setAttributeForCell(e, 'placeholders', '1');
      this.graph.setAttributeForCell(e, 'name', 'Variable');
      return this.createVertexTemplateFromCells([e], e.geometry.width, e.geometry.height, 'Variable');
    })),
    this.createVertexTemplateEntry('shape=ext;double=1;rounded=0;whiteSpace=wrap;html=1;', 120, 80, '', 'Double Rectangle', null, null, 'rect rectangle box double'),
    this.createVertexTemplateEntry('shape=ext;double=1;rounded=1;whiteSpace=wrap;html=1;', 120, 80, '', 'Double Rounded Rectangle', null, null, 'rounded rect rectangle box double'),
    this.createVertexTemplateEntry('ellipse;shape=doubleEllipse;whiteSpace=wrap;html=1;', 100, 60, '', 'Double Ellipse', null, null, 'oval ellipse start end state double'),
    this.createVertexTemplateEntry('shape=ext;double=1;whiteSpace=wrap;html=1;aspect=fixed;', 80, 80, '', 'Double Square', null, null, 'double square'),
    this.createVertexTemplateEntry('ellipse;shape=doubleEllipse;whiteSpace=wrap;html=1;aspect=fixed;', 80, 80, '', 'Double Circle', null, null, 'double circle'),
    this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillWeight=4;hachureGap=8;hachureAngle=45;fillColor=#1ba1e2;sketch=1;', 120, 60, '', 'Rectangle Sketch', !0, null, 'rectangle rect box text sketch comic retro'),
    this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;strokeWidth=2;fillWeight=2;hachureGap=8;fillColor=#990000;fillStyle=dots;sketch=1;', 120, 60, '', 'Ellipse Sketch', !0, null, 'ellipse oval sketch comic retro'),
    this.createVertexTemplateEntry('rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillWeight=-1;hachureGap=8;fillStyle=cross-hatch;fillColor=#006600;sketch=1;', 120, 60, '', 'Diamond Sketch', !0, null, 'diamond sketch comic retro'),
    this.createVertexTemplateEntry('html=1;whiteSpace=wrap;shape=isoCube2;backgroundOutline=1;isoAngle=15;', 90, 100, '', 'Isometric Cube', !0, null, 'cube box iso isometric'),
    this.createVertexTemplateEntry('html=1;whiteSpace=wrap;aspect=fixed;shape=isoRectangle;', 150, 90, '', 'Isometric Square', !0, null, 'rectangle rect box iso isometric'),
    this.createEdgeTemplateEntry('edgeStyle=isometricEdgeStyle;endArrow=none;html=1;', 50, 100, '', 'Isometric Edge 1'),
    this.createEdgeTemplateEntry('edgeStyle=isometricEdgeStyle;endArrow=none;html=1;elbow=vertical;', 50, 100, '', 'Isometric Edge 2'),
    this.createVertexTemplateEntry('shape=curlyBracket;whiteSpace=wrap;html=1;rounded=1;labelPosition=left;verticalLabelPosition=middle;align=right;verticalAlign=middle;', 20, 120, '', 'Left Curly Bracket'),
    this.createVertexTemplateEntry('shape=curlyBracket;whiteSpace=wrap;html=1;rounded=1;flipH=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;', 20, 120, '', 'Right Curly Bracket'),
    this.createVertexTemplateEntry('line;strokeWidth=2;html=1;', 160, 10, '', 'Horizontal Line'),
    this.createVertexTemplateEntry('line;strokeWidth=2;direction=south;html=1;', 10, 160, '', 'Vertical Line'),
    this.createVertexTemplateEntry('line;strokeWidth=4;html=1;perimeter=backbonePerimeter;points=[];outlineConnect=0;', 160, 10, '', 'Horizontal Backbone', !1, null, 'backbone bus network'),
    this.createVertexTemplateEntry('line;strokeWidth=4;direction=south;html=1;perimeter=backbonePerimeter;points=[];outlineConnect=0;', 10, 160, '', 'Vertical Backbone', !1, null, 'backbone bus network'),
    this.createVertexTemplateEntry('shape=crossbar;whiteSpace=wrap;html=1;rounded=1;', 120, 20, '', 'Horizontal Crossbar', !1, null, 'crossbar distance measure dimension unit'),
    this.createVertexTemplateEntry('shape=crossbar;whiteSpace=wrap;html=1;rounded=1;direction=south;', 20, 120, '', 'Vertical Crossbar', !1, null, 'crossbar distance measure dimension unit'),
    this.createVertexTemplateEntry('shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=1;aspect=fixed;image=' + this.gearImage, 52, 61, '', 'Image (Fixed Aspect)', !1, null, 'fixed image icon symbol'),
    this.createVertexTemplateEntry('shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=' + this.gearImage, 50, 60, '', 'Image (Variable Aspect)', !1, null, 'strechted image icon symbol'),
    this.createVertexTemplateEntry('icon;html=1;image=' + this.gearImage, 60, 60, 'Icon', 'Icon', !1, null, 'icon image symbol'),
    this.createVertexTemplateEntry('label;whiteSpace=wrap;html=1;image=' + this.gearImage, 140, 60, 'Label', 'Label 1', null, null, 'label image icon symbol'),
    this.createVertexTemplateEntry('label;whiteSpace=wrap;html=1;align=center;verticalAlign=bottom;spacingLeft=0;spacingBottom=4;imageAlign=center;imageVerticalAlign=top;image=' + this.gearImage, 120, 80, 'Label', 'Label 2', null, null, 'label image icon symbol'),
    this.addEntry('shape group container', function() {
      var e = new mxCell('Label', new mxGeometry(0, 0, 160, 70), 'html=1;whiteSpace=wrap;container=1;recursiveResize=0;collapsible=0;');
      e.vertex = !0;
      var g = new mxCell('', new mxGeometry(20, 20, 20, 30), 'triangle;html=1;whiteSpace=wrap;');
      g.vertex = !0;
      e.insert(g);
      return b.createVertexTemplateFromCells([e], e.geometry.width, e.geometry.height, 'Shape Group');
    }),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;top=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=1;right=1;left=1;top=0;fillColor=none;routingCenterX=-0.5;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=waypoint;sketch=0;fillStyle=solid;size=6;pointerEvents=1;points=[];fillColor=none;resizable=0;rotatable=0;perimeter=centerPerimeter;snapToPoint=1;', 40, 40, '', 'Waypoint'),
    this.createEdgeTemplateEntry('edgeStyle=segmentEdgeStyle;endArrow=classic;html=1;curved=0;rounded=0;endSize=8;startSize=8;', 50, 50, '', 'Manual Line', null, 'line lines connector connectors connection connections arrow arrows manual'),
    this.createEdgeTemplateEntry('shape=filledEdge;curved=0;rounded=0;fixDash=1;endArrow=none;strokeWidth=10;fillColor=#ffffff;edgeStyle=orthogonalEdgeStyle;html=1;', 60, 40, '', 'Filled Edge'),
    this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;elbow=horizontal;endArrow=classic;html=1;curved=0;rounded=0;endSize=8;startSize=8;', 50, 50, '', 'Horizontal Elbow', null, 'line lines connector connectors connection connections arrow arrows elbow horizontal'),
    this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;elbow=vertical;endArrow=classic;html=1;curved=0;rounded=0;endSize=8;startSize=8;', 50, 50, '', 'Vertical Elbow', null, 'line lines connector connectors connection connections arrow arrows elbow vertical')
  ];
  this.addPaletteFunctions('misc', mxResources.get('misc'), null != a ? a : !0, f);
  this.setCurrentSearchEntryLibrary();
};
Sidebar.prototype.addAdvancedPalette = function(a) {
  this.setCurrentSearchEntryLibrary('general', 'advanced');
  this.addPaletteFunctions('advanced', mxResources.get('advanced'), null != a ? a : !1, this.createAdvancedShapes());
  this.setCurrentSearchEntryLibrary();
};
Sidebar.prototype.addBasicPalette = function(a) {
  this.setCurrentSearchEntryLibrary('basic');
  this.addStencilPalette('basic', mxResources.get('basic'), a + '/basic.xml', ';whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2', null, null, null, null, [
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;top=0;bottom=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;right=0;top=0;bottom=0;fillColor=none;routingCenterX=-0.5;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;top=0;left=0;fillColor=none;', 120, 60, '', 'Partial Rectangle')
  ]);
  this.setCurrentSearchEntryLibrary();
};
Sidebar.prototype.createAdvancedShapes = function() {
  var a = this,
    b = new mxCell('List Item', new mxGeometry(0, 0, 60, 26), 'text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;');
  b.vertex = !0;
  return [
    this.createVertexTemplateEntry('shape=tapeData;whiteSpace=wrap;html=1;perimeter=ellipsePerimeter;', 80, 80, '', 'Tape Data'),
    this.createVertexTemplateEntry('shape=manualInput;whiteSpace=wrap;html=1;', 80, 80, '', 'Manual Input'),
    this.createVertexTemplateEntry('shape=loopLimit;whiteSpace=wrap;html=1;', 100, 80, '', 'Loop Limit'),
    this.createVertexTemplateEntry('shape=offPageConnector;whiteSpace=wrap;html=1;', 80, 80, '', 'Off Page Connector'),
    this.createVertexTemplateEntry('shape=delay;whiteSpace=wrap;html=1;', 80, 40, '', 'Delay'),
    this.createVertexTemplateEntry('shape=display;whiteSpace=wrap;html=1;', 80, 40, '', 'Display'),
    this.createVertexTemplateEntry('shape=singleArrow;direction=west;whiteSpace=wrap;html=1;', 100, 60, '', 'Arrow Left'),
    this.createVertexTemplateEntry('shape=singleArrow;whiteSpace=wrap;html=1;', 100, 60, '', 'Arrow Right'),
    this.createVertexTemplateEntry('shape=singleArrow;direction=north;whiteSpace=wrap;html=1;', 60, 100, '', 'Arrow Up'),
    this.createVertexTemplateEntry('shape=singleArrow;direction=south;whiteSpace=wrap;html=1;', 60, 100, '', 'Arrow Down'),
    this.createVertexTemplateEntry('shape=doubleArrow;whiteSpace=wrap;html=1;', 100, 60, '', 'Double Arrow'),
    this.createVertexTemplateEntry('shape=doubleArrow;direction=south;whiteSpace=wrap;html=1;', 60, 100, '', 'Double Arrow Vertical', null, null, 'double arrow'),
    this.createVertexTemplateEntry('shape=actor;whiteSpace=wrap;html=1;', 40, 60, '', 'User', null, null, 'user person human'),
    this.createVertexTemplateEntry('shape=cross;whiteSpace=wrap;html=1;', 80, 80, '', 'Cross'),
    this.createVertexTemplateEntry('shape=corner;whiteSpace=wrap;html=1;', 80, 80, '', 'Corner'),
    this.createVertexTemplateEntry('shape=tee;whiteSpace=wrap;html=1;', 80, 80, '', 'Tee'),
    this.createVertexTemplateEntry('shape=datastore;whiteSpace=wrap;html=1;', 60, 60, '', 'Data Store', null, null, 'data store cylinder database'),
    this.createVertexTemplateEntry('shape=orEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Or', null, null, 'or circle oval ellipse'),
    this.createVertexTemplateEntry('shape=sumEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Sum', null, null, 'sum circle oval ellipse'),
    this.createVertexTemplateEntry('shape=lineEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Ellipse with horizontal divider', null, null, 'circle oval ellipse'),
    this.createVertexTemplateEntry('shape=lineEllipse;line=vertical;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Ellipse with vertical divider', null, null, 'circle oval ellipse'),
    this.createVertexTemplateEntry('shape=sortShape;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;', 80, 80, '', 'Sort', null, null, 'sort'),
    this.createVertexTemplateEntry('shape=collate;whiteSpace=wrap;html=1;', 80, 80, '', 'Collate', null, null, 'collate'),
    this.createVertexTemplateEntry('shape=switch;whiteSpace=wrap;html=1;', 60, 60, '', 'Switch', null, null, 'switch router'),
    this.addEntry('process bar', function() {
      return a.createVertexTemplateFromData('1ZVva8IwEMY/TV4O2nQ6fVvdfKMg9BNk7a0NS5uSxNn66Xf5U3VqYbCxoSDknsuT5H53UJIs6m6lWFttZAGCJM8kWSgpjV/V3QKEIDTiBUmWhNII/4S+jGRjl41apqAx3zFQb/hgYgde2SqZg9Yopkz5rDa9CFm957VgDUZpXnFRrFkvd/YmbVj+PkRpJRU/yMYwLGgZo/DGhVhIIRXGjXT+057MesNGBZofYDsUcCltWIdqdFTXTJsg5FII1mr+6t5qFW2UfIeLa91DU6kKsGIcDVLWspw3JWoPMR3OZ/4w+womeNngOsdXWGvaSt4YbbFMUjJZ2iKxmuE2QpPI/VDfV9yAPd+etcde2+pNPbAJLQBloBtto5NCD1cgazCqxy17XpgqtHI+9bYKeFkNtsj3P2LaC+XRe5oKXITBuD0kydWQZAZaVOLr+ahYC24cwFbZguJ4nUNtpe0pxpHooMiwhwHDNc/f4EZvcxsMgU4fCg2VnlE9AjynOnn6OdTHMaj03qHOZ/8GdTIGNbl3qPFs+ldUMTx9gFzuy/fpEw==', 296, 100, 'Process Bar');
    }),
    this.createVertexTemplateEntry('swimlane;', 200, 200, 'Container', 'Container', null, null, 'container swimlane lane pool group'),
    this.addEntry('list group erd table', function() {
      var f = new mxCell('List', new mxGeometry(0, 0, 140, 110), 'swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;html=1;');
      f.vertex = !0;
      f.insert(a.cloneCell(b, 'Item 1'));
      f.insert(a.cloneCell(b, 'Item 2'));
      f.insert(a.cloneCell(b, 'Item 3'));
      return a.createVertexTemplateFromCells([f], f.geometry.width, f.geometry.height, 'List');
    }),
    this.addEntry('list item entry value group erd table', function() {
      return a.createVertexTemplateFromCells([a.cloneCell(b, 'List Item')], b.geometry.width, b.geometry.height, 'List Item');
    })
  ];
};
Sidebar.prototype.addBasicPalette = function(a) {
  this.setCurrentSearchEntryLibrary('basic');
  this.addStencilPalette('basic', mxResources.get('basic'), a + '/basic.xml', ';whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2', null, null, null, null, [
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;top=0;bottom=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;right=0;top=0;bottom=0;fillColor=none;routingCenterX=-0.5;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
    this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;top=0;left=0;fillColor=none;', 120, 60, '', 'Partial Rectangle')
  ]);
  this.setCurrentSearchEntryLibrary();
};
Sidebar.prototype.addUmlPalette = function(a) {
  var b = this,
    f = new mxCell('+ field: type', new mxGeometry(0, 0, 100, 26), 'text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;');
  f.vertex = !0;
  var e = new mxCell('', new mxGeometry(0, 0, 40, 8), 'line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=inherit;');
  e.vertex = !0;
  this.setCurrentSearchEntryLibrary('uml');
  var g = [
    this.createVertexTemplateEntry('html=1;', 110, 50, 'Object', 'Object', null, null, 'uml static class object instance'),
    this.createVertexTemplateEntry('html=1;', 110, 50, '&laquo;interface&raquo;<br><b>Name</b>', 'Interface', null, null, 'uml static class interface object instance annotated annotation'),
    this.addEntry('uml static class object instance', function() {
      var d = new mxCell('Classname', new mxGeometry(0, 0, 160, 90), 'swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;');
      d.vertex = !0;
      d.insert(f.clone());
      d.insert(e.clone());
      d.insert(b.cloneCell(f, '+ method(type): type'));
      return b.createVertexTemplateFromCells([d], d.geometry.width, d.geometry.height, 'Class');
    }),
    this.addEntry('uml static class section subsection', function() {
      var d = new mxCell('Classname', new mxGeometry(0, 0, 140, 110), 'swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;');
      d.vertex = !0;
      d.insert(f.clone());
      d.insert(f.clone());
      d.insert(f.clone());
      return b.createVertexTemplateFromCells([d], d.geometry.width, d.geometry.height, 'Class 2');
    }),
    this.addEntry('uml static class item member method function variable field attribute label', function() {
      return b.createVertexTemplateFromCells([b.cloneCell(f, '+ item: attribute')], f.geometry.width, f.geometry.height, 'Item 1');
    }),
    this.addEntry('uml static class item member method function variable field attribute label', function() {
      var d = new mxCell('item: attribute', new mxGeometry(0, 0, 120, f.geometry.height), 'label;fontStyle=0;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=hidden;spacingLeft=28;spacingRight=4;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;imageWidth=16;imageHeight=16;image=' + b.gearImage);
      d.vertex = !0;
      return b.createVertexTemplateFromCells([d], d.geometry.width, d.geometry.height, 'Item 2');
    }),
    this.addEntry('uml static class divider hline line separator', function() {
      return b.createVertexTemplateFromCells([e.clone()], e.geometry.width, e.geometry.height, 'Divider');
    }),
    this.addEntry('uml static class spacer space gap separator', function() {
      var d = new mxCell('', new mxGeometry(0, 0, 20, 14), 'text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=4;spacingRight=4;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;');
      d.vertex = !0;
      return b.createVertexTemplateFromCells([d.clone()], d.geometry.width, d.geometry.height, 'Spacer');
    }),
    this.createVertexTemplateEntry('text;align=center;fontStyle=1;verticalAlign=middle;spacingLeft=3;spacingRight=3;strokeColor=none;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;', 80, 26, 'Title', 'Title', null, null, 'uml static class title label'),
    this.addEntry('uml static class component', function() {
      var d = new mxCell('&laquo;Annotation&raquo;<br/><b>Component</b>', new mxGeometry(0, 0, 180, 90), 'html=1;dropTarget=0;');
      d.vertex = !0;
      var h = new mxCell('', new mxGeometry(1, 0, 20, 20), 'shape=module;jettyWidth=8;jettyHeight=4;');
      h.vertex = !0;
      h.geometry.relative = !0;
      h.geometry.offset = new mxPoint(-27, 7);
      d.insert(h);
      return b.createVertexTemplateFromCells([d], d.geometry.width, d.geometry.height, 'Component');
    }),
    this.addEntry('uml static class component', function() {
      var d = new mxCell('<p style="margin:0px;margin-top:6px;text-align:center;"><b>Component</b></p><hr/><p style="margin:0px;margin-left:8px;">+ Attribute1: Type<br/>+ Attribute2: Type</p>', new mxGeometry(0, 0, 180, 90), 'align=left;overflow=fill;html=1;dropTarget=0;');
      d.vertex = !0;
      var h = new mxCell('', new mxGeometry(1, 0, 20, 20), 'shape=component;jettyWidth=8;jettyHeight=4;');
      h.vertex = !0;
      h.geometry.relative = !0;
      h.geometry.offset = new mxPoint(-24, 4);
      d.insert(h);
      return b.createVertexTemplateFromCells([d], d.geometry.width, d.geometry.height, 'Component with Attributes');
    }),
    this.createVertexTemplateEntry('verticalAlign=top;align=left;spacingTop=8;spacingLeft=2;spacingRight=12;shape=cube;size=10;direction=south;fontStyle=4;html=1;', 180, 120, 'Block', 'Block', null, null, 'uml static class block'),
    this.createVertexTemplateEntry('shape=module;align=left;spacingLeft=20;align=center;verticalAlign=top;', 100, 50, 'Module', 'Module', null, null, 'uml static class module component'),
    this.createVertexTemplateEntry('shape=folder;fontStyle=1;spacingTop=10;tabWidth=40;tabHeight=14;tabPosition=left;html=1;', 70, 50, 'package', 'Package', null, null, 'uml static class package'),
    this.createVertexTemplateEntry('verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;', 160, 90, '<p style="margin:0px;margin-top:4px;text-align:center;text-decoration:underline;"><b>Object:Type</b></p><hr/><p style="margin:0px;margin-left:8px;">field1 = value1<br/>field2 = value2<br>field3 = value3</p>', 'Object', null, null, 'uml static class object instance'),
    this.createVertexTemplateEntry('verticalAlign=top;align=left;overflow=fill;html=1;', 180, 90, '<div style="box-sizing:border-box;width:100%;background:#e4e4e4;padding:2px;">Tablename</div><table style="width:100%;font-size:1em;" cellpadding="2" cellspacing="0"><tr><td>PK</td><td>uniqueId</td></tr><tr><td>FK1</td><td>foreignKey</td></tr><tr><td></td><td>fieldname</td></tr></table>', 'Entity', null, null, 'er entity table'),
    this.addEntry('uml static class object instance', function() {
      var d = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><b>Class</b></p><hr size="1"/><div style="height:2px;"></div>', new mxGeometry(0, 0, 140, 60), 'verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;');
      d.vertex = !0;
      return b.createVertexTemplateFromCells([d.clone()], d.geometry.width, d.geometry.height, 'Class 3');
    }),
    this.addEntry('uml static class object instance', function() {
      var d = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><b>Class</b></p><hr size="1"/><div style="height:2px;"></div><hr size="1"/><div style="height:2px;"></div>', new mxGeometry(0, 0, 140, 60), 'verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;');
      d.vertex = !0;
      return b.createVertexTemplateFromCells([d.clone()], d.geometry.width, d.geometry.height, 'Class 4');
    }),
    this.addEntry('uml static class object instance', function() {
      var d = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><b>Class</b></p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ field: Type</p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ method(): Type</p>', new mxGeometry(0, 0, 160, 90), 'verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;');
      d.vertex = !0;
      return b.createVertexTemplateFromCells([d.clone()], d.geometry.width, d.geometry.height, 'Class 5');
    }),
    this.addEntry('uml static class object instance', function() {
      var d = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><i>&lt;&lt;Interface&gt;&gt;</i><br/><b>Interface</b></p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ field1: Type<br/>+ field2: Type</p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ method1(Type): Type<br/>+ method2(Type, Type): Type</p>', new mxGeometry(0, 0, 190, 140), 'verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;');
      d.vertex = !0;
      return b.createVertexTemplateFromCells([d.clone()], d.geometry.width, d.geometry.height, 'Interface 2');
    }),
    this.createVertexTemplateEntry('shape=providedRequiredInterface;html=1;verticalLabelPosition=bottom;sketch=0;', 20, 20, '', 'Provided/Required Interface', null, null, 'uml provided required interface lollipop notation'),
    this.createVertexTemplateEntry('shape=requiredInterface;html=1;verticalLabelPosition=bottom;sketch=0;', 10, 20, '', 'Required Interface', null, null, 'uml required interface lollipop notation'),
    this.addEntry('uml lollipop notation provided required interface', function() {
      return b.createVertexTemplateFromData('zVRNT8MwDP01uaLSMu6sfFxAmrQDcAytaQJZXLnu2u7XkzQZXTUmuIA4VIqf/ZzkvdQiyzf9HclaPWAJRmQ3IssJkcNq0+dgjEgTXYrsWqRp4j6R3p7Ino/ZpJYEln9CSANhK00LAQlAw4OJAGFrS/D1iciWSKywQivNPWLtwHMHvgHzsNY7z5Ato4MUb0zMgi2viLBzoUULAbnVxsSWzTtwofYBtlTACkhvgIHWtSy0rWKSJVXAJ5Lh4FBWMNMicAJ0cSzPWBW1uQN0fWlwJQRGst7OW8kmhNVn3Sd1hdp1TJMhVCzmhHipUDO54RYHm07Q6NHXfmV/65eS5jXXVJhj15yCNDz54GyxD58PwjL2v/SmMuE7POqSVdxj5vm/cK6PG4X/5deNvPjeSEfQdeOV75Rm8K/dZzo3LOaGSaMr69aF0wbIA00NhZfpVff+JSwJGr2TL2Nnr3jtbzDeabEUi2v/Tlo22kKO1gbq0Z8ZDwzE0J+cNidM2ROinF18CR6KeivQleI59pVrM8knfV04Dc1gx+FM/QA=', 40, 10, 'Lollipop Notation');
    }),
    this.createVertexTemplateEntry('shape=umlBoundary;whiteSpace=wrap;html=1;', 100, 80, 'Boundary Object', 'Boundary Object', null, null, 'uml boundary object'),
    this.createVertexTemplateEntry('ellipse;shape=umlEntity;whiteSpace=wrap;html=1;', 80, 80, 'Entity Object', 'Entity Object', null, null, 'uml entity object'),
    this.createVertexTemplateEntry('ellipse;shape=umlControl;whiteSpace=wrap;html=1;', 70, 80, 'Control Object', 'Control Object', null, null, 'uml control object'),
    this.createVertexTemplateEntry('shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;', 30, 60, 'Actor', 'Actor', !1, null, 'uml actor'),
    this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;', 140, 70, 'Use Case', 'Use Case', null, null, 'uml use case usecase'),
    this.addEntry('uml activity state start', function() {
      var d = new mxCell('', new mxGeometry(0, 0, 30, 30), 'ellipse;html=1;shape=startState;fillColor=#000000;strokeColor=#ff0000;');
      d.vertex = !0;
      var h = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
      h.geometry.setTerminalPoint(new mxPoint(15, 90), !1);
      h.geometry.relative = !0;
      h.edge = !0;
      d.insertEdge(h, !0);
      return b.createVertexTemplateFromCells([
        d,
        h
      ], 30, 90, 'Start');
    }),
    this.addEntry('uml activity state', function() {
      var d = new mxCell('Activity', new mxGeometry(0, 0, 120, 40), 'rounded=1;whiteSpace=wrap;html=1;arcSize=40;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;');
      d.vertex = !0;
      var h = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
      h.geometry.setTerminalPoint(new mxPoint(60, 100), !1);
      h.geometry.relative = !0;
      h.edge = !0;
      d.insertEdge(h, !0);
      return b.createVertexTemplateFromCells([
        d,
        h
      ], 120, 100, 'Activity');
    }),
    this.addEntry('uml activity composite state', function() {
      var d = new mxCell('Composite State', new mxGeometry(0, 0, 160, 60), 'swimlane;fontStyle=1;align=center;verticalAlign=middle;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=0;resizeLast=1;container=0;fontColor=#000000;collapsible=0;rounded=1;arcSize=30;strokeColor=#ff0000;fillColor=#ffffc0;swimlaneFillColor=#ffffc0;dropTarget=0;');
      d.vertex = !0;
      var h = new mxCell('Subtitle', new mxGeometry(0, 0, 200, 26), 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;fontColor=#000000;');
      h.vertex = !0;
      d.insert(h);
      h = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
      h.geometry.setTerminalPoint(new mxPoint(80, 120), !1);
      h.geometry.relative = !0;
      h.edge = !0;
      d.insertEdge(h, !0);
      return b.createVertexTemplateFromCells([
        d,
        h
      ], 160, 120, 'Composite State');
    }),
    this.addEntry('uml activity condition', function() {
      var d = new mxCell('Condition', new mxGeometry(0, 0, 80, 40), 'rhombus;whiteSpace=wrap;html=1;fillColor=#ffffc0;strokeColor=#ff0000;');
      d.vertex = !0;
      var h = new mxCell('no', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;align=left;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
      h.geometry.setTerminalPoint(new mxPoint(180, 20), !1);
      h.geometry.relative = !0;
      h.geometry.x = -1;
      h.edge = !0;
      d.insertEdge(h, !0);
      var n = new mxCell('yes', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;align=left;verticalAlign=top;endArrow=open;endSize=8;strokeColor=#ff0000;');
      n.geometry.setTerminalPoint(new mxPoint(40, 100), !1);
      n.geometry.relative = !0;
      n.geometry.x = -1;
      n.edge = !0;
      d.insertEdge(n, !0);
      return b.createVertexTemplateFromCells([
        d,
        h,
        n
      ], 180, 100, 'Condition');
    }),
    this.addEntry('uml activity fork join', function() {
      var d = new mxCell('', new mxGeometry(0, 0, 200, 10), 'shape=line;html=1;strokeWidth=6;strokeColor=#ff0000;');
      d.vertex = !0;
      var h = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
      h.geometry.setTerminalPoint(new mxPoint(100, 80), !1);
      h.geometry.relative = !0;
      h.edge = !0;
      d.insertEdge(h, !0);
      return b.createVertexTemplateFromCells([
        d,
        h
      ], 200, 80, 'Fork/Join');
    }),
    this.createVertexTemplateEntry('ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#ff0000;', 30, 30, '', 'End', null, null, 'uml activity state end'),
    this.createVertexTemplateEntry('shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;', 100, 300, ':Object', 'Lifeline', null, null, 'uml sequence participant lifeline'),
    this.createVertexTemplateEntry('shape=umlLifeline;participant=umlActor;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;', 20, 300, '', 'Actor Lifeline', null, null, 'uml sequence participant lifeline actor'),
    this.createVertexTemplateEntry('shape=umlLifeline;participant=umlBoundary;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;', 50, 300, '', 'Boundary Lifeline', null, null, 'uml sequence participant lifeline boundary'),
    this.createVertexTemplateEntry('shape=umlLifeline;participant=umlEntity;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;', 40, 300, '', 'Entity Lifeline', null, null, 'uml sequence participant lifeline entity'),
    this.createVertexTemplateEntry('shape=umlLifeline;participant=umlControl;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;', 40, 300, '', 'Control Lifeline', null, null, 'uml sequence participant lifeline control'),
    this.createVertexTemplateEntry('shape=umlFrame;whiteSpace=wrap;html=1;', 300, 200, 'frame', 'Frame', null, null, 'uml sequence frame'),
    this.createVertexTemplateEntry('shape=umlDestroy;whiteSpace=wrap;html=1;strokeWidth=3;', 30, 30, '', 'Destruction', null, null, 'uml sequence destruction destroy'),
    this.addEntry('uml sequence invoke invocation call activation', function() {
      var d = new mxCell('', new mxGeometry(0, 0, 10, 80), 'html=1;points=[];perimeter=orthogonalPerimeter;');
      d.vertex = !0;
      var h = new mxCell('dispatch', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;');
      h.geometry.setTerminalPoint(new mxPoint(-60, 0), !0);
      h.geometry.relative = !0;
      h.edge = !0;
      d.insertEdge(h, !1);
      return b.createVertexTemplateFromCells([
        d,
        h
      ], 10, 80, 'Found Message');
    }),
    this.addEntry('uml sequence invoke call delegation synchronous invocation activation', function() {
      var d = new mxCell('', new mxGeometry(0, 0, 10, 80), 'html=1;points=[];perimeter=orthogonalPerimeter;');
      d.vertex = !0;
      var h = new mxCell('dispatch', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;endArrow=block;entryX=0;entryY=0;');
      h.geometry.setTerminalPoint(new mxPoint(-70, 0), !0);
      h.geometry.relative = !0;
      h.edge = !0;
      d.insertEdge(h, !1);
      var n = new mxCell('return', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;exitX=0;exitY=0.95;');
      n.geometry.setTerminalPoint(new mxPoint(-70, 76), !1);
      n.geometry.relative = !0;
      n.edge = !0;
      d.insertEdge(n, !0);
      return b.createVertexTemplateFromCells([
        d,
        h,
        n
      ], 10, 80, 'Synchronous Invocation');
    }),
    this.addEntry('uml sequence self call recursion delegation activation', function() {
      var d = new mxCell('', new mxGeometry(-5, 20, 10, 40), 'html=1;points=[];perimeter=orthogonalPerimeter;');
      d.vertex = !0;
      var h = new mxCell('self call', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;align=left;spacingLeft=2;endArrow=block;rounded=0;entryX=1;entryY=0;');
      h.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      h.geometry.points = [new mxPoint(30, 0)];
      h.geometry.relative = !0;
      h.edge = !0;
      d.insertEdge(h, !1);
      return b.createVertexTemplateFromCells([
        d,
        h
      ], 10, 60, 'Self Call');
    }),
    this.addEntry('uml sequence invoke call delegation callback activation', function() {
      return b.createVertexTemplateFromData('xZRNT8MwDIZ/Ta6oaymD47rBTkiTuMAxW6wmIm0q19s6fj1OE3V0Y2iCA4dK8euP2I+riGxedUuUjX52CqzIHkU2R+conKpuDtaKNDFKZAuRpgl/In264J303qSRCDVdk5CGhJ20WwhKEFo62ChoqritxURkReNMTa2X80LkC68AmgoIkEWHpF3pamlXR7WIFwASdBeb7KXY4RIc5+KBQ/ZGkY4RYY5Egyl1zLqLmmyDXQ6Zx4n5EIf+HkB2BmAjrV3LzftPIPw4hgNn1pQ1a2tH5Cp2QK1miG7vNeu4iJe4pdeY2BtvbCQDGlAljMCQxBJotJ8rWCFYSWY3LvUdmZi68rvkkLiU6QnL1m1xAzHoBOdw61WEb88II9AW67/ydQ2wq1Cy1aAGvOrFfPh6997qDA3g+dxzv3nIL6MPU/8T+kMw8+m4QPgdfrEJNo8PSQj/+s58Ag==', 10, 60, 'Callback');
    }),
    this.createVertexTemplateEntry('html=1;points=[];perimeter=orthogonalPerimeter;', 10, 80, '', 'Activation', null, null, 'uml sequence activation'),
    this.createEdgeTemplateEntry('html=1;verticalAlign=bottom;startArrow=oval;startFill=1;endArrow=block;startSize=8;', 60, 0, 'dispatch', 'Found Message 1', null, 'uml sequence message call invoke dispatch'),
    this.createEdgeTemplateEntry('html=1;verticalAlign=bottom;startArrow=circle;startFill=1;endArrow=open;startSize=6;endSize=8;', 80, 0, 'dispatch', 'Found Message 2', null, 'uml sequence message call invoke dispatch'),
    this.createEdgeTemplateEntry('html=1;verticalAlign=bottom;endArrow=block;', 80, 0, 'dispatch', 'Message', null, 'uml sequence message call invoke dispatch'),
    this.addEntry('uml sequence return message', function() {
      var d = new mxCell('return', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;');
      d.geometry.setTerminalPoint(new mxPoint(80, 0), !0);
      d.geometry.setTerminalPoint(new mxPoint(0, 0), !1);
      d.geometry.relative = !0;
      d.edge = !0;
      return b.createEdgeTemplateFromCells([d], 80, 0, 'Return');
    }),
    this.addEntry('uml relation', function() {
      var d = new mxCell('name', new mxGeometry(0, 0, 0, 0), 'endArrow=block;endFill=1;html=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=top;');
      d.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      d.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      d.geometry.relative = !0;
      d.geometry.x = -1;
      d.edge = !0;
      var h = new mxCell('1', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;');
      h.geometry.relative = !0;
      h.setConnectable(!1);
      h.vertex = !0;
      d.insert(h);
      return b.createEdgeTemplateFromCells([d], 160, 0, 'Relation 1');
    }),
    this.addEntry('uml association', function() {
      var d = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=none;html=1;edgeStyle=orthogonalEdgeStyle;');
      d.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      d.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      d.geometry.relative = !0;
      d.edge = !0;
      var h = new mxCell('parent', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;');
      h.geometry.relative = !0;
      h.setConnectable(!1);
      h.vertex = !0;
      d.insert(h);
      h = new mxCell('child', new mxGeometry(1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=right;verticalAlign=bottom;');
      h.geometry.relative = !0;
      h.setConnectable(!1);
      h.vertex = !0;
      d.insert(h);
      return b.createEdgeTemplateFromCells([d], 160, 0, 'Association 1');
    }),
    this.addEntry('uml aggregation', function() {
      var d = new mxCell('1', new mxGeometry(0, 0, 0, 0), 'endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;');
      d.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      d.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      d.geometry.relative = !0;
      d.geometry.x = -1;
      d.geometry.y = 3;
      d.edge = !0;
      return b.createEdgeTemplateFromCells([d], 160, 0, 'Aggregation 1');
    }),
    this.addEntry('uml composition', function() {
      var d = new mxCell('1', new mxGeometry(0, 0, 0, 0), 'endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;');
      d.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      d.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      d.geometry.relative = !0;
      d.geometry.x = -1;
      d.geometry.y = 3;
      d.edge = !0;
      return b.createEdgeTemplateFromCells([d], 160, 0, 'Composition 1');
    }),
    this.addEntry('uml relation', function() {
      var d = new mxCell('Relation', new mxGeometry(0, 0, 0, 0), 'endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;');
      d.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      d.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      d.geometry.relative = !0;
      d.edge = !0;
      var h = new mxCell('0..n', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=top;');
      h.geometry.relative = !0;
      h.setConnectable(!1);
      h.vertex = !0;
      d.insert(h);
      h = new mxCell('1', new mxGeometry(1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=right;verticalAlign=top;');
      h.geometry.relative = !0;
      h.setConnectable(!1);
      h.vertex = !0;
      d.insert(h);
      return b.createEdgeTemplateFromCells([d], 160, 0, 'Relation 2');
    }),
    this.createEdgeTemplateEntry('endArrow=open;endSize=12;dashed=1;html=1;', 160, 0, 'Use', 'Dependency', null, 'uml dependency use'),
    this.createEdgeTemplateEntry('endArrow=block;endSize=16;endFill=0;html=1;', 160, 0, 'Extends', 'Generalization', null, 'uml generalization extend'),
    this.createEdgeTemplateEntry('endArrow=block;startArrow=block;endFill=1;startFill=1;html=1;', 160, 0, '', 'Association 2', null, 'uml association'),
    this.createEdgeTemplateEntry('endArrow=open;startArrow=circlePlus;endFill=0;startFill=0;endSize=8;html=1;', 160, 0, '', 'Inner Class', null, 'uml inner class'),
    this.createEdgeTemplateEntry('endArrow=open;startArrow=cross;endFill=0;startFill=0;endSize=8;startSize=10;html=1;', 160, 0, '', 'Terminate', null, 'uml terminate'),
    this.createEdgeTemplateEntry('endArrow=block;dashed=1;endFill=0;endSize=12;html=1;', 160, 0, '', 'Implementation', null, 'uml realization implementation'),
    this.createEdgeTemplateEntry('endArrow=diamondThin;endFill=0;endSize=24;html=1;', 160, 0, '', 'Aggregation 2', null, 'uml aggregation'),
    this.createEdgeTemplateEntry('endArrow=diamondThin;endFill=1;endSize=24;html=1;', 160, 0, '', 'Composition 2', null, 'uml composition'),
    this.createEdgeTemplateEntry('endArrow=open;endFill=1;endSize=12;html=1;', 160, 0, '', 'Association 3', null, 'uml association')
  ];
  this.addPaletteFunctions('uml', mxResources.get('uml'), a || !1, g);
  this.setCurrentSearchEntryLibrary();
};
Sidebar.prototype.createTitle = function(a) {
  var b = document.createElement('a');
  b.setAttribute('title', mxResources.get('sidebarTooltip'));
  b.className = 'geTitle';
  mxUtils.write(b, a);
  return b;
};
Sidebar.prototype.createThumb = function(a, b, f, e, g, d, h) {
  this.graph.labelsVisible = null == d || d;
  d = mxClient.NO_FO;
  mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
  this.graph.shapeBackgroundColor = Editor.isDarkMode() ? '#2a252f' : '#f1f3f4';
  this.graph.view.scaleAndTranslate(1, 0, 0);
  this.graph.addCells(a);
  a = this.graph.getGraphBounds();
  var n = Math.floor(100 * Math.min((b - 2 * this.thumbBorder) / a.width, (f - 2 * this.thumbBorder) / a.height)) / 100;
  this.graph.view.scaleAndTranslate(n, Math.floor((b - a.width * n) / 2 / n - a.x), Math.floor((f - a.height * n) / 2 / n - a.y));
  this.graph.dialect != mxConstants.DIALECT_SVG || mxClient.NO_FO || null == this.graph.view.getCanvas().ownerSVGElement ? (n = this.graph.container.cloneNode(!1), n.innerHTML = this.graph.container.innerHTML) : n = this.graph.view.getCanvas().ownerSVGElement.cloneNode(!0);
  this.graph.getModel().clear();
  mxClient.NO_FO = d;
  n.style.position = 'relative';
  n.style.overflow = 'hidden';
  n.style.left = this.thumbBorder + 'px';
  n.style.top = this.thumbBorder + 'px';
  n.style.width = b + 'px';
  n.style.height = f + 'px';
  n.style.visibility = '';
  n.style.minWidth = '';
  n.style.minHeight = '';
  e.appendChild(n);
  this.sidebarTitles && null != g && 0 != h && (e.style.height = this.thumbHeight + 0 + this.sidebarTitleSize + 8 + 'px', b = document.createElement('div'), b.style.color = Editor.isDarkMode() ? '#A0A0A0' : '#303030', b.style.fontSize = this.sidebarTitleSize + 'px', b.style.textAlign = 'center', b.style.whiteSpace = 'nowrap', b.style.overflow = 'hidden', b.style.textOverflow = 'ellipsis', mxClient.IS_IE && (b.style.height = this.sidebarTitleSize + 12 + 'px'), b.style.paddingTop = '4px', mxUtils.write(b, g), e.appendChild(b));
  return a;
};
Sidebar.prototype.createSection = function(a) {
  return mxUtils.bind(this, function() {
    var b = document.createElement('div');
    b.setAttribute('title', a);
    b.style.textOverflow = 'ellipsis';
    b.style.whiteSpace = 'nowrap';
    b.style.textAlign = 'center';
    b.style.overflow = 'hidden';
    b.style.width = '100%';
    b.style.padding = '14px 0';
    mxUtils.write(b, a);
    return b;
  });
};
Sidebar.prototype.createItem = function(a, b, f, e, g, d, h, n, u, m, p, x) {
  n = null != n ? n : !0;
  m = null != m ? m : this.thumbWidth;
  p = null != p ? p : this.thumbHeight;
  var A = document.createElement('a');
  A.className = 'geItem';
  A.style.overflow = 'hidden';
  var C = 2 * this.thumbBorder;
  A.style.width = m + C + 'px';
  A.style.height = p + C + 'px';
  A.style.padding = this.thumbPadding + 'px';
  mxEvent.addListener(A, 'click', function(G) {
    mxEvent.consume(G);
  });
  C = a;
  a = this.graph.cloneCells(a);
  this.editorUi.insertHandler(C, null, this.graph.model, this.editorUi.editor.graph.defaultVertexStyle, this.editorUi.editor.graph.defaultEdgeStyle, !0, !0);
  null != x ? (A.style.backgroundImage = 'url(' + x + ')', A.style.backgroundRepeat = 'no-repeat', A.style.backgroundPosition = 'center', A.style.backgroundSize = '24px 24px') : this.createThumb(C, m, p, A, b, f, e, g, d);
  var D = new mxRectangle(0, 0, g, d);
  1 < a.length || a[0].vertex ? (e = this.createDragSource(A, this.createDropHandler(a, !0, h, D), this.createDragPreview(g, d), a, D), this.addClickHandler(A, e, a, u), e.isGuidesEnabled = mxUtils.bind(this, function() {
    return this.editorUi.editor.graph.graphHandler.guidesEnabled;
  })) : null != a[0] && a[0].edge && (e = this.createDragSource(A, this.createDropHandler(a, !1, h, D), this.createDragPreview(g, d), a, D), this.addClickHandler(A, e, a, u));
  !mxClient.IS_IOS && n && mxEvent.addGestureListeners(A, null, mxUtils.bind(this, function(G) {
    mxEvent.isMouseEvent(G) && this.showTooltip(A, a, D.width, D.height, b, f);
  }));
  return A;
};
Sidebar.prototype.updateShapes = function(a, b) {
  var f = this.editorUi.editor.graph,
    e = f.getCellStyle(a),
    g = [];
  f.model.beginUpdate();
  try {
    for (var d = f.getModel().getStyle(a), h = 'shadow dashed dashPattern fontFamily fontSize fontColor align startFill startSize endFill endSize strokeColor strokeWidth fillColor gradientColor html part noEdgeStyle edgeStyle elbow childLayout recursiveResize container collapsible connectable comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification sketchStyle'.split(' '), n = 0; n < b.length; n++) {
      var u = b[n];
      if (f.getModel().isVertex(u) == f.getModel().isVertex(a) || f.getModel().isEdge(u) == f.getModel().isEdge(a)) {
        var m = f.getCellStyle(b[n], !1);
        f.getModel().setStyle(u, d);
        if ('1' == mxUtils.getValue(m, 'composite', '0'))
          for (var p = f.model.getChildCount(u); 0 <= p; p--)
            f.model.remove(f.model.getChildAt(u, p));
        'umlLifeline' == m[mxConstants.STYLE_SHAPE] && 'umlLifeline' != e[mxConstants.STYLE_SHAPE] && (f.setCellStyles(mxConstants.STYLE_SHAPE, 'umlLifeline', [u]), f.setCellStyles('participant', e[mxConstants.STYLE_SHAPE], [u]));
        for (p = 0; p < h.length; p++) {
          var x = m[h[p]];
          null != x && f.setCellStyles(h[p], x, [u]);
        }
        g.push(u);
      }
    }
  } finally {
    f.model.endUpdate();
  }
  return g;
};
Sidebar.prototype.createDropHandler = function(a, b, f, e) {
  f = null != f ? f : !0;
  return mxUtils.bind(this, function(g, d, h, n, u, m) {
    for (m = m ? null : mxEvent.isTouchEvent(d) || mxEvent.isPenEvent(d) ? document.elementFromPoint(mxEvent.getClientX(d), mxEvent.getClientY(d)) : mxEvent.getSource(d); null != m && m != this.container;)
      m = m.parentNode;
    if (null == m && g.isEnabled()) {
      a = g.getImportableCells(a);
      if (0 < a.length) {
        g.stopEditing();
        m = null == h || mxEvent.isAltDown(d) ? !1 : g.isValidDropTarget(h, a, d);
        var p = null;
        null == h || m || (h = null);
        if (!g.isCellLocked(h || g.getDefaultParent())) {
          g.model.beginUpdate();
          try {
            n = Math.round(n);
            u = Math.round(u);
            if (b && g.isSplitTarget(h, a, d)) {
              var x = g.view.scale,
                A = g.view.translate,
                C = (n + A.x) * x,
                D = (u + A.y) * x,
                G = g.cloneCells(a);
              g.splitEdge(h, G, null, n - e.width / 2, u - e.height / 2, C, D);
              p = G;
            } else
              0 < a.length && (p = g.importCells(a, n, u, h));
            if (null != g.layoutManager) {
              var F = g.layoutManager.getLayout(h);
              if (null != F) {
                x = g.view.scale;
                A = g.view.translate;
                C = (n + A.x) * x;
                D = (u + A.y) * x;
                for (var K = 0; K < p.length; K++)
                  F.moveCell(p[K], C, D);
              }
            }!f || null != d && mxEvent.isShiftDown(d) || g.fireEvent(new mxEventObject('cellsInserted', 'cells', p));
            for (K = 0; K < p.length; K++)
              g.model.isVertex(p[K]) && g.isAutoSizeCell(p[K]) && g.updateCellSize(p[K]);
          } catch (P) {
            this.editorUi.handleError(P);
          } finally {
            g.model.endUpdate();
          }
          null != p && 0 < p.length && (g.scrollCellToVisible(p[0]), g.setSelectionCells(p));
          g.editAfterInsert && null != d && mxEvent.isMouseEvent(d) && null != p && 1 == p.length && window.setTimeout(function() {
            g.startEditing(p[0]);
          }, 0);
        }
      }
      mxEvent.consume(d);
    }
  });
};
Sidebar.prototype.createDragPreview = function(a, b) {
  var f = document.createElement('div');
  f.className = 'geDragPreview';
  f.style.width = a + 'px';
  f.style.height = b + 'px';
  return f;
};
Sidebar.prototype.dropAndConnect = function(a, b, f, e, g) {
  var d = this.getDropAndConnectGeometry(a, b[e], f, b),
    h = [];
  if (null != d) {
    var n = this.editorUi.editor.graph,
      u = null;
    n.model.beginUpdate();
    try {
      var m = n.getCellGeometry(a),
        p = n.getCellGeometry(b[e]),
        x = n.model.getParent(a),
        A = !0;
      if (null != n.layoutManager) {
        var C = n.layoutManager.getLayout(x);
        null != C && C.constructor == mxStackLayout && (A = !1);
      }
      h = n.model.isEdge(a) ? null : n.view.getState(x);
      var D = C = 0;
      if (null != h) {
        var G = h.origin;
        C = G.x;
        D = G.y;
        var F = d.getTerminalPoint(!1);
        null != F && (F.x += G.x, F.y += G.y);
      }
      var K = !n.isTableRow(a) && !n.isTableCell(a) && (n.model.isEdge(a) || null != m && !m.relative && A),
        P = n.getCellAt((d.x + C + n.view.translate.x) * n.view.scale, (d.y + D + n.view.translate.y) * n.view.scale, null, null, null, function(T, Z, ma) {
          return !n.isContainer(T.cell);
        });
      if (null != P && P != x)
        h = n.view.getState(P), null != h && (G = h.origin, x = P, K = !0, n.model.isEdge(a) || (d.x -= G.x - C, d.y -= G.y - D));
      else if (!A || n.isTableRow(a) || n.isTableCell(a))
        d.x += C, d.y += D;
      C = p.x;
      D = p.y;
      n.model.isEdge(b[e]) && (D = C = 0);
      h = b = n.importCells(b, d.x - (K ? C : 0), d.y - (K ? D : 0), K ? x : null);
      if (n.model.isEdge(a))
        n.model.setTerminal(a, b[e], f == mxConstants.DIRECTION_NORTH);
      else if (n.model.isEdge(b[e])) {
        n.model.setTerminal(b[e], a, !0);
        var R = n.getCellGeometry(b[e]),
          Q = null != R ? R.getTerminalPoint(!0) : null;
        R.points = null;
        if (null != Q)
          for (f = 0; f < b.length; f++)
            if (n.model.isEdge(b[f]) && f != e) {
              var ba = n.getCellGeometry(b[f]);
              F = null != ba ? ba.getTerminalPoint(!0) : null;
              null != F && F.x == Q.x && F.y == Q.y && n.model.setTerminal(b[f], a, !0);
            }
        if (null != R.getTerminalPoint(!1))
          R.setTerminalPoint(d.getTerminalPoint(!1), !1);
        else if (K && n.model.isVertex(x)) {
          var V = n.view.getState(x);
          G = V.cell != n.view.currentRoot ? V.origin : new mxPoint(0, 0);
          n.cellsMoved(b, G.x, G.y, null, null, !0);
        }
      } else
        p = n.getCellGeometry(b[e]), C = d.x - Math.round(p.x), D = d.y - Math.round(p.y), d.x = Math.round(p.x), d.y = Math.round(p.y), n.model.setGeometry(b[e], d), n.cellsMoved(b, C, D, null, null, !0), h = b.slice(), u = 1 == h.length ? h[0] : null, b.push(n.insertEdge(null, null, '', a, b[e], n.createCurrentEdgeStyle()));
      null != g && mxEvent.isShiftDown(g) || n.fireEvent(new mxEventObject('cellsInserted', 'cells', b));
    } catch (T) {
      this.editorUi.handleError(T);
    } finally {
      n.model.endUpdate();
    }
    n.editAfterInsert && null != g && mxEvent.isMouseEvent(g) && null != u && window.setTimeout(function() {
      n.startEditing(u);
    }, 0);
  }
  return h;
};
Sidebar.prototype.getDropAndConnectGeometry = function(a, b, f, e) {
  var g = this.editorUi.editor.graph,
    d = g.view,
    h = 1 < e.length,
    n = g.getCellGeometry(a);
  e = g.getCellGeometry(b);
  null != n && null != e && (e = e.clone(), g.model.isEdge(a) ? (a = g.view.getState(a), n = a.absolutePoints, b = n[0], g = n[n.length - 1], f == mxConstants.DIRECTION_NORTH ? (e.x = b.x / d.scale - d.translate.x - e.width / 2, e.y = b.y / d.scale - d.translate.y - e.height / 2) : (e.x = g.x / d.scale - d.translate.x - e.width / 2, e.y = g.y / d.scale - d.translate.y - e.height / 2)) : (n.relative && (a = g.view.getState(a), n = n.clone(), n.x = (a.x - d.translate.x) / d.scale, n.y = (a.y - d.translate.y) / d.scale), d = g.defaultEdgeLength, g.model.isEdge(b) && null != e.getTerminalPoint(!0) && null != e.getTerminalPoint(!1) ? (b = e.getTerminalPoint(!0), g = e.getTerminalPoint(!1), d = g.x - b.x, b = g.y - b.y, d = Math.sqrt(d * d + b * b), e.x = n.getCenterX(), e.y = n.getCenterY(), e.width = 1, e.height = 1, f == mxConstants.DIRECTION_NORTH ? (e.height = d, e.y = n.y - d, e.setTerminalPoint(new mxPoint(e.x, e.y), !1)) : f == mxConstants.DIRECTION_EAST ? (e.width = d, e.x = n.x + n.width, e.setTerminalPoint(new mxPoint(e.x + e.width, e.y), !1)) : f == mxConstants.DIRECTION_SOUTH ? (e.height = d, e.y = n.y + n.height, e.setTerminalPoint(new mxPoint(e.x, e.y + e.height), !1)) : f == mxConstants.DIRECTION_WEST && (e.width = d, e.x = n.x - d, e.setTerminalPoint(new mxPoint(e.x, e.y), !1))) : (!h && 45 < e.width && 45 < e.height && 45 < n.width && 45 < n.height && (e.width *= n.height / e.height, e.height = n.height), e.x = n.x + n.width / 2 - e.width / 2, e.y = n.y + n.height / 2 - e.height / 2, f == mxConstants.DIRECTION_NORTH ? e.y = e.y - n.height / 2 - e.height / 2 - d : f == mxConstants.DIRECTION_EAST ? e.x = e.x + n.width / 2 + e.width / 2 + d : f == mxConstants.DIRECTION_SOUTH ? e.y = e.y + n.height / 2 + e.height / 2 + d : f == mxConstants.DIRECTION_WEST && (e.x = e.x - n.width / 2 - e.width / 2 - d), g.model.isEdge(b) && null != e.getTerminalPoint(!0) && null != b.getTerminal(!1) && (n = g.getCellGeometry(b.getTerminal(!1)), null != n && (f == mxConstants.DIRECTION_NORTH ? (e.x -= n.getCenterX(), e.y -= n.getCenterY() + n.height / 2) : f == mxConstants.DIRECTION_EAST ? (e.x -= n.getCenterX() - n.width / 2, e.y -= n.getCenterY()) : f == mxConstants.DIRECTION_SOUTH ? (e.x -= n.getCenterX(), e.y -= n.getCenterY() - n.height / 2) : f == mxConstants.DIRECTION_WEST && (e.x -= n.getCenterX() + n.width / 2, e.y -= n.getCenterY()))))));
  return e;
};
Sidebar.prototype.isDropStyleEnabled = function(a, b) {
  var f = !0;
  null != b && 1 == a.length && (a = this.graph.getCellStyle(a[b]), null != a && (f = mxUtils.getValue(a, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(a, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE) != mxConstants.NONE));
  return f;
};
Sidebar.prototype.isDropStyleTargetIgnored = function(a) {
  return this.graph.isSwimlane(a.cell) || this.graph.isTableCell(a.cell) || this.graph.isTableRow(a.cell) || this.graph.isTable(a.cell);
};
Sidebar.prototype.createDragSource = function(a, b, f, e, g) {
  function d(ca, ra) {
    var ua = mxUtils.createImage(ca.src);
    ua.style.width = ca.width + 'px';
    ua.style.height = ca.height + 'px';
    null != ra && ua.setAttribute('title', ra);
    mxUtils.setOpacity(ua, ca == this.refreshTarget ? 30 : 20);
    ua.style.position = 'absolute';
    ua.style.cursor = 'crosshair';
    return ua;
  }

  function h(ca, ra, ua, Ga) {
    null != Ga.parentNode && (mxUtils.contains(ua, ca, ra) ? (mxUtils.setOpacity(Ga, 100), X = Ga) : mxUtils.setOpacity(Ga, Ga == Z ? 30 : 20));
    return ua;
  }
  for (var n = this.editorUi, u = n.editor.graph, m = null, p = null, x = this, A = 0; A < e.length && (null == p && u.model.isVertex(e[A]) ? p = A : null == m && u.model.isEdge(e[A]) && null == u.model.getTerminal(e[A], !0) && (m = A), null == p || null == m); A++);
  var C = this.isDropStyleEnabled(e, p),
    D = mxUtils.makeDraggable(a, u, mxUtils.bind(this, function(ca, ra, ua, Ga, Ia) {
      null != this.updateThread && window.clearTimeout(this.updateThread);
      if (null != e && null != P && X == Z) {
        var wa = ca.isCellSelected(P.cell) ? ca.getSelectionCells() : [P.cell];
        wa = this.updateShapes(ca.model.isEdge(P.cell) ? e[0] : e[p], wa);
        ca.setSelectionCells(wa);
      } else
        null != e && null != X && null != F && X != Z ? (wa = ca.model.isEdge(F.cell) || null == m ? p : m, ca.setSelectionCells(this.dropAndConnect(F.cell, e, N, wa, ra))) : b.apply(this, arguments);
      null != this.editorUi.hoverIcons && this.editorUi.hoverIcons.update(ca.view.getState(ca.getSelectionCell()));
    }), f, 0, 0, u.autoscroll, !0, !0);
  u.addListener(mxEvent.ESCAPE, function(ca, ra) {
    D.isActive() && D.reset();
  });
  var G = D.mouseDown;
  D.mouseDown = function(ca) {
    mxEvent.isPopupTrigger(ca) || mxEvent.isMultiTouchEvent(ca) || u.isCellLocked(u.getDefaultParent()) || (u.stopEditing(), G.apply(this, arguments));
  };
  var F = null,
    K = null,
    P = null,
    R = !1,
    Q = d(this.triangleUp, mxResources.get('connect')),
    ba = d(this.triangleRight, mxResources.get('connect')),
    V = d(this.triangleDown, mxResources.get('connect')),
    T = d(this.triangleLeft, mxResources.get('connect')),
    Z = d(this.refreshTarget, mxResources.get('replace')),
    ma = null,
    ja = d(this.roundDrop),
    la = d(this.roundDrop),
    N = mxConstants.DIRECTION_NORTH,
    X = null,
    L = D.createPreviewElement;
  D.createPreviewElement = function(ca) {
    var ra = L.apply(this, arguments);
    mxClient.IS_SVG && (ra.style.pointerEvents = 'none');
    this.previewElementWidth = ra.style.width;
    this.previewElementHeight = ra.style.height;
    return ra;
  };
  var S = D.dragEnter;
  D.dragEnter = function(ca, ra) {
    null != n.hoverIcons && n.hoverIcons.setDisplay('none');
    S.apply(this, arguments);
  };
  var I = D.dragExit;
  D.dragExit = function(ca, ra) {
    null != n.hoverIcons && n.hoverIcons.setDisplay('');
    I.apply(this, arguments);
  };
  D.dragOver = function(ca, ra) {
    mxDragSource.prototype.dragOver.apply(this, arguments);
    null != this.currentGuide && null != X && this.currentGuide.hide();
    if (null != this.previewElement) {
      n.hideShapePicker();
      var ua = ca.view;
      if (null != P && X == Z)
        this.previewElement.style.display = ca.model.isEdge(P.cell) ? 'none' : '', this.previewElement.style.left = P.x + 'px', this.previewElement.style.top = P.y + 'px', this.previewElement.style.width = P.width + 'px', this.previewElement.style.height = P.height + 'px';
      else if (null != F && null != X) {
        null != D.currentHighlight && null != D.currentHighlight.state && D.currentHighlight.hide();
        var Ga = ca.model.isEdge(F.cell) || null == m ? p : m,
          Ia = x.getDropAndConnectGeometry(F.cell, e[Ga], N, e),
          wa = ca.model.isEdge(F.cell) ? null : ca.getCellGeometry(F.cell),
          Ca = ca.getCellGeometry(e[Ga]),
          ta = ca.model.getParent(F.cell),
          Ha = ua.translate.x * ua.scale,
          Va = ua.translate.y * ua.scale;
        null != wa && !wa.relative && ca.model.isVertex(ta) && ta != ua.currentRoot && (Va = ua.getState(ta), Ha = Va.x, Va = Va.y);
        wa = Ca.x;
        Ca = Ca.y;
        ca.model.isEdge(e[Ga]) && (Ca = wa = 0);
        this.previewElement.style.left = (Ia.x - wa) * ua.scale + Ha + 'px';
        this.previewElement.style.top = (Ia.y - Ca) * ua.scale + Va + 'px';
        1 == e.length && (this.previewElement.style.width = Ia.width * ua.scale + 'px', this.previewElement.style.height = Ia.height * ua.scale + 'px');
        this.previewElement.style.display = '';
      } else
        null != D.currentHighlight.state && ca.model.isEdge(D.currentHighlight.state.cell) ? (this.previewElement.style.left = Math.round(parseInt(this.previewElement.style.left) - g.width * ua.scale / 2) + 'px', this.previewElement.style.top = Math.round(parseInt(this.previewElement.style.top) - g.height * ua.scale / 2) + 'px') : (this.previewElement.style.width = this.previewElementWidth, this.previewElement.style.height = this.previewElementHeight, this.previewElement.style.display = '');
    }
  };
  var Y = new Date().getTime(),
    ia = 0,
    ka = null,
    U = this.editorUi.editor.graph.getCellStyle(e[0]);
  D.getDropTarget = mxUtils.bind(this, function(ca, ra, ua, Ga) {
    var Ia = mxEvent.isAltDown(Ga) || null == e ? null : ca.getCellAt(ra, ua, null, null, null, function(Va, fb, Ua) {
      return ca.isContainer(Va.cell);
    });
    if (null != Ia && !this.graph.isCellConnectable(Ia) && !this.graph.model.isEdge(Ia)) {
      var wa = this.graph.getModel().getParent(Ia);
      this.graph.getModel().isVertex(wa) && this.graph.isCellConnectable(wa) && (Ia = wa);
    }
    ca.isCellLocked(Ia) && (Ia = null);
    var Ca = ca.view.getState(Ia);
    wa = X = null;
    ka != Ca ? (Y = new Date().getTime(), ia = 0, ka = Ca, null != this.updateThread && window.clearTimeout(this.updateThread), null != Ca && (this.updateThread = window.setTimeout(function() {
      null == X && (ka = Ca, D.getDropTarget(ca, ra, ua, Ga));
    }, this.dropTargetDelay + 10))) : ia = new Date().getTime() - Y;
    if (C && 2500 > ia && null != Ca && !mxEvent.isShiftDown(Ga) && (mxUtils.getValue(Ca.style, mxConstants.STYLE_SHAPE) != mxUtils.getValue(U, mxConstants.STYLE_SHAPE) && (mxUtils.getValue(Ca.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(Ca.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(Ca.style, mxConstants.STYLE_GRADIENTCOLOR, mxConstants.NONE) != mxConstants.NONE) || 'image' == mxUtils.getValue(U, mxConstants.STYLE_SHAPE) || 1500 < ia || ca.model.isEdge(Ca.cell)) && ia > this.dropTargetDelay && !this.isDropStyleTargetIgnored(Ca) && (ca.model.isVertex(Ca.cell) && null != p || ca.model.isEdge(Ca.cell) && ca.model.isEdge(e[0]))) {
      if (ca.isCellEditable(Ca.cell)) {
        P = Ca;
        var ta = ca.model.isEdge(Ca.cell) ? ca.view.getPoint(Ca) : new mxPoint(Ca.getCenterX(), Ca.getCenterY());
        ta = new mxRectangle(ta.x - this.refreshTarget.width / 2, ta.y - this.refreshTarget.height / 2, this.refreshTarget.width, this.refreshTarget.height);
        Z.style.left = Math.floor(ta.x) + 'px';
        Z.style.top = Math.floor(ta.y) + 'px';
        null == ma && (ca.container.appendChild(Z), ma = Z.parentNode);
        h(ra, ua, ta, Z);
      }
    } else
      null == P || !mxUtils.contains(P, ra, ua) || 1500 < ia && !mxEvent.isShiftDown(Ga) ? (P = null, null != ma && (Z.parentNode.removeChild(Z), ma = null)) : null != P && null != ma && (ta = ca.model.isEdge(P.cell) ? ca.view.getPoint(P) : new mxPoint(P.getCenterX(), P.getCenterY()), ta = new mxRectangle(ta.x - this.refreshTarget.width / 2, ta.y - this.refreshTarget.height / 2, this.refreshTarget.width, this.refreshTarget.height), h(ra, ua, ta, Z));
    if (R && null != F && !mxEvent.isAltDown(Ga) && null == X) {
      wa = mxRectangle.fromRectangle(F);
      if (ca.model.isEdge(F.cell)) {
        var Ha = F.absolutePoints;
        null != ja.parentNode && (ta = Ha[0], wa.add(h(ra, ua, new mxRectangle(ta.x - this.roundDrop.width / 2, ta.y - this.roundDrop.height / 2, this.roundDrop.width, this.roundDrop.height), ja)));
        null != la.parentNode && (Ha = Ha[Ha.length - 1], wa.add(h(ra, ua, new mxRectangle(Ha.x - this.roundDrop.width / 2, Ha.y - this.roundDrop.height / 2, this.roundDrop.width, this.roundDrop.height), la)));
      } else
        ta = mxRectangle.fromRectangle(F), null != F.shape && null != F.shape.boundingBox && (ta = mxRectangle.fromRectangle(F.shape.boundingBox)), ta.grow(this.graph.tolerance), ta.grow(HoverIcons.prototype.arrowSpacing), Ha = this.graph.selectionCellsHandler.getHandler(F.cell), null != Ha && (ta.x -= Ha.horizontalOffset / 2, ta.y -= Ha.verticalOffset / 2, ta.width += Ha.horizontalOffset, ta.height += Ha.verticalOffset, null != Ha.rotationShape && null != Ha.rotationShape.node && 'hidden' != Ha.rotationShape.node.style.visibility && 'none' != Ha.rotationShape.node.style.display && null != Ha.rotationShape.boundingBox && ta.add(Ha.rotationShape.boundingBox)), wa.add(h(ra, ua, new mxRectangle(F.getCenterX() - this.triangleUp.width / 2, ta.y - this.triangleUp.height, this.triangleUp.width, this.triangleUp.height), Q)), wa.add(h(ra, ua, new mxRectangle(ta.x + ta.width, F.getCenterY() - this.triangleRight.height / 2, this.triangleRight.width, this.triangleRight.height), ba)), wa.add(h(ra, ua, new mxRectangle(F.getCenterX() - this.triangleDown.width / 2, ta.y + ta.height, this.triangleDown.width, this.triangleDown.height), V)), wa.add(h(ra, ua, new mxRectangle(ta.x - this.triangleLeft.width, F.getCenterY() - this.triangleLeft.height / 2, this.triangleLeft.width, this.triangleLeft.height), T));
      null != wa && wa.grow(10);
    }
    N = mxConstants.DIRECTION_NORTH;
    X == ba ? N = mxConstants.DIRECTION_EAST : X == V || X == la ? N = mxConstants.DIRECTION_SOUTH : X == T && (N = mxConstants.DIRECTION_WEST);
    null != P && X == Z && (Ca = P);
    ta = (null == p || ca.isCellConnectable(e[p])) && (ca.model.isEdge(Ia) && null != p || ca.model.isVertex(Ia) && ca.isCellConnectable(Ia));
    if (null != F && 5000 <= ia || F != Ca && (null == wa || !mxUtils.contains(wa, ra, ua) || 500 < ia && null == X && ta))
      if (R = !1, F = 5000 > ia && ia > this.dropTargetDelay || ca.model.isEdge(Ia) ? Ca : null, null != F && ta) {
        wa = [
          ja,
          la,
          Q,
          ba,
          V,
          T
        ];
        for (ta = 0; ta < wa.length; ta++)
          null != wa[ta].parentNode && wa[ta].parentNode.removeChild(wa[ta]);
        ca.model.isEdge(Ia) ? (Ha = Ca.absolutePoints, null != Ha && (ta = Ha[0], Ha = Ha[Ha.length - 1], wa = ca.tolerance, new mxRectangle(ra - wa, ua - wa, 2 * wa, 2 * wa), ja.style.left = Math.floor(ta.x - this.roundDrop.width / 2) + 'px', ja.style.top = Math.floor(ta.y - this.roundDrop.height / 2) + 'px', la.style.left = Math.floor(Ha.x - this.roundDrop.width / 2) + 'px', la.style.top = Math.floor(Ha.y - this.roundDrop.height / 2) + 'px', null == ca.model.getTerminal(Ia, !0) && ca.container.appendChild(ja), null == ca.model.getTerminal(Ia, !1) && ca.container.appendChild(la))) : (ta = mxRectangle.fromRectangle(Ca), null != Ca.shape && null != Ca.shape.boundingBox && (ta = mxRectangle.fromRectangle(Ca.shape.boundingBox)), ta.grow(this.graph.tolerance), ta.grow(HoverIcons.prototype.arrowSpacing), Ha = this.graph.selectionCellsHandler.getHandler(Ca.cell), null != Ha && (ta.x -= Ha.horizontalOffset / 2, ta.y -= Ha.verticalOffset / 2, ta.width += Ha.horizontalOffset, ta.height += Ha.verticalOffset, null != Ha.rotationShape && null != Ha.rotationShape.node && 'hidden' != Ha.rotationShape.node.style.visibility && 'none' != Ha.rotationShape.node.style.display && null != Ha.rotationShape.boundingBox && ta.add(Ha.rotationShape.boundingBox)), Q.style.left = Math.floor(Ca.getCenterX() - this.triangleUp.width / 2) + 'px', Q.style.top = Math.floor(ta.y - this.triangleUp.height) + 'px', ba.style.left = Math.floor(ta.x + ta.width) + 'px', ba.style.top = Math.floor(Ca.getCenterY() - this.triangleRight.height / 2) + 'px', V.style.left = Q.style.left, V.style.top = Math.floor(ta.y + ta.height) + 'px', T.style.left = Math.floor(ta.x - this.triangleLeft.width) + 'px', T.style.top = ba.style.top, 'eastwest' != Ca.style.portConstraint && (ca.container.appendChild(Q), ca.container.appendChild(V)), ca.container.appendChild(ba), ca.container.appendChild(T));
        null != Ca && (K = ca.selectionCellsHandler.getHandler(Ca.cell), null != K && null != K.setHandlesVisible && K.setHandlesVisible(!1));
        R = !0;
      } else
        for (wa = [
            ja,
            la,
            Q,
            ba,
            V,
            T
          ], ta = 0; ta < wa.length; ta++)
          null != wa[ta].parentNode && wa[ta].parentNode.removeChild(wa[ta]);
    R || null == K || K.setHandlesVisible(!0);
    Ia = mxEvent.isAltDown(Ga) && !mxEvent.isShiftDown(Ga) || null != P && X == Z ? null : mxDragSource.prototype.getDropTarget.apply(this, arguments);
    wa = ca.getModel();
    if (null != Ia && (null != X || !ca.isSplitTarget(Ia, e, Ga))) {
      for (; null != Ia && !ca.isValidDropTarget(Ia, e, Ga) && wa.isVertex(wa.getParent(Ia));)
        Ia = wa.getParent(Ia);
      null != Ia && (ca.view.currentRoot == Ia || !ca.isValidRoot(Ia) && 0 == ca.getModel().getChildCount(Ia) || ca.isCellLocked(Ia) || wa.isEdge(Ia) || !ca.isValidDropTarget(Ia, e, Ga)) && (Ia = null);
    }
    ca.isCellLocked(Ia) && (Ia = null);
    return Ia;
  });
  D.stopDrag = function() {
    mxDragSource.prototype.stopDrag.apply(this, arguments);
    for (var ca = [
        ja,
        la,
        Z,
        Q,
        ba,
        V,
        T
      ], ra = 0; ra < ca.length; ra++)
      null != ca[ra].parentNode && ca[ra].parentNode.removeChild(ca[ra]);
    null != F && null != K && K.reset();
    X = ma = P = F = K = null;
  };
  return D;
};
Sidebar.prototype.itemClicked = function(a, b, f, e) {
  e = this.editorUi.editor.graph;
  e.container.focus();
  if (mxEvent.isAltDown(f) && 1 == e.getSelectionCount() && e.model.isVertex(e.getSelectionCell())) {
    b = null;
    for (var g = 0; g < a.length && null == b; g++)
      e.model.isVertex(a[g]) && (b = g);
    null != b && (e.setSelectionCells(this.dropAndConnect(e.getSelectionCell(), a, mxEvent.isMetaDown(f) || mxEvent.isControlDown(f) ? mxEvent.isShiftDown(f) ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH : mxEvent.isShiftDown(f) ? mxConstants.DIRECTION_EAST : mxConstants.DIRECTION_SOUTH, b, f)), e.scrollCellToVisible(e.getSelectionCell()));
  } else
    mxEvent.isShiftDown(f) && !e.isSelectionEmpty() ? (f = e.getEditableCells(e.getSelectionCells()), this.updateShapes(a[0], f), e.scrollCellToVisible(f)) : (a = mxEvent.isAltDown(f) ? e.getFreeInsertPoint() : e.getCenterInsertPoint(e.getBoundingBoxFromGeometry(a, !0)), b.drop(e, f, null, a.x, a.y, !0));
};
Sidebar.prototype.addClickHandler = function(a, b, f, e) {
  var g = b.mouseDown,
    d = b.mouseMove,
    h = b.mouseUp,
    n = this.editorUi.editor.graph.tolerance,
    u = null,
    m = this,
    p = null;
  b.mouseDown = function(x) {
    g.apply(this, arguments);
    u = new mxPoint(mxEvent.getClientX(x), mxEvent.getClientY(x));
    p = a.style.opacity;
    '' == p && (p = '1');
    null != this.dragElement && (this.dragElement.style.display = 'none', mxUtils.setOpacity(a, 50));
  };
  b.mouseMove = function(x) {
    null != this.dragElement && 'none' == this.dragElement.style.display && null != u && (Math.abs(u.x - mxEvent.getClientX(x)) > n || Math.abs(u.y - mxEvent.getClientY(x)) > n) && (this.dragElement.style.display = '', mxUtils.setOpacity(a, 100 * p));
    d.apply(this, arguments);
  };
  b.mouseUp = function(x) {
    try {
      mxEvent.isPopupTrigger(x) || null != this.currentGraph || null == this.dragElement || 'none' != this.dragElement.style.display || (null != e && e(x), mxEvent.isConsumed(x) || m.itemClicked(f, b, x, a)), h.apply(b, arguments), mxUtils.setOpacity(a, 100 * p), u = null, m.currentElt = a;
    } catch (A) {
      b.reset(), m.editorUi.handleError(A);
    }
  };
};
Sidebar.prototype.createVertexTemplateEntry = function(a, b, f, e, g, d, h, n) {
  null != n && null != g && (n += ' ' + g);
  n = null != n && 0 < n.length ? n : null != g ? g.toLowerCase() : '';
  return this.addEntry(n, mxUtils.bind(this, function() {
    return this.createVertexTemplate(a, b, f, e, g, d, h);
  }));
};
Sidebar.prototype.createVertexTemplate = function(a, b, f, e, g, d, h, n, u, m, p, x, A) {
  a = [new mxCell(null != e ? e : '', new mxGeometry(0, 0, b, f), a)];
  a[0].vertex = !0;
  return this.createVertexTemplateFromCells(a, b, f, g, d, h, n, u, m, p, x, A);
};
Sidebar.prototype.createVertexTemplateFromData = function(a, b, f, e, g, d, h, n) {
  a = mxUtils.parseXml(Graph.decompress(a));
  var u = new mxCodec(a),
    m = new mxGraphModel();
  u.decode(a.documentElement, m);
  a = this.graph.cloneCells(m.root.getChildAt(0).children);
  return this.createVertexTemplateFromCells(a, b, f, e, g, d, h, n);
};
Sidebar.prototype.createVertexTemplateFromCells = function(a, b, f, e, g, d, h, n, u, m, p, x) {
  return this.createItem(a, e, g, d, b, f, h, n, u, m, p, x);
};
Sidebar.prototype.createEdgeTemplateEntry = function(a, b, f, e, g, d, h, n, u) {
  h = null != h && 0 < h.length ? h : g.toLowerCase();
  return this.addEntry(h, mxUtils.bind(this, function() {
    return this.createEdgeTemplate(a, b, f, e, g, d, n, u);
  }));
};
Sidebar.prototype.createEdgeTemplate = function(a, b, f, e, g, d, h, n) {
  a = new mxCell(null != e ? e : '', new mxGeometry(0, 0, b, f), a);
  a.geometry.setTerminalPoint(new mxPoint(0, f), !0);
  a.geometry.setTerminalPoint(new mxPoint(b, 0), !1);
  a.geometry.relative = !0;
  a.edge = !0;
  return this.createEdgeTemplateFromCells([a], b, f, g, d, h, n);
};
Sidebar.prototype.createEdgeTemplateFromCells = function(a, b, f, e, g, d, h, n, u, m, p, x) {
  return this.createItem(a, e, g, null != n ? n : !0, b, f, d, h, u, m, p, x);
};
Sidebar.prototype.addPaletteFunctions = function(a, b, f, e) {
  this.addPalette(a, b, f, mxUtils.bind(this, function(g) {
    for (var d = 0; d < e.length; d++)
      g.appendChild(e[d](g));
  }));
};
Sidebar.prototype.addPalette = function(a, b, f, e) {
  b = this.createTitle(b);
  this.appendChild(b);
  var g = document.createElement('div');
  g.className = 'geSidebar';
  mxClient.IS_POINTER && (g.style.touchAction = 'none');
  f ? (e(g), e = null) : g.style.display = 'none';
  this.addFoldingHandler(b, g, e);
  f = document.createElement('div');
  f.appendChild(g);
  this.appendChild(f);
  null != a && (this.palettes[a] = [
    b,
    f
  ]);
  return g;
};
Sidebar.prototype.addFoldingHandler = function(a, b, f) {
  var e = !1;
  if (!mxClient.IS_IE || 8 <= document.documentMode)
    a.style.backgroundImage = 'none' == b.style.display ? 'url(\'' + this.collapsedImage + '\')' : 'url(\'' + this.expandedImage + '\')';
  a.style.backgroundRepeat = 'no-repeat';
  a.style.backgroundPosition = '4px 50%';
  mxEvent.addListener(a, 'click', mxUtils.bind(this, function(g) {
    if ('none' == b.style.display) {
      if (e)
        this.setContentVisible(b, !0);
      else if (e = !0, null != f) {
        a.style.cursor = 'wait';
        var d = a.innerHTML;
        a.innerHTML = mxResources.get('loading') + '...';
        window.setTimeout(mxUtils.bind(this, function() {
          this.setContentVisible(b, !0);
          a.style.cursor = '';
          a.innerHTML = d;
          var h = mxClient.NO_FO;
          mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
          f(b, a);
          mxClient.NO_FO = h;
        }), mxClient.IS_FF ? 20 : 0);
      } else
        this.setContentVisible(b, !0);
      a.style.backgroundImage = 'url(\'' + this.expandedImage + '\')';
    } else
      a.style.backgroundImage = 'url(\'' + this.collapsedImage + '\')', this.setContentVisible(b, !1);
    mxEvent.consume(g);
  }));
  mxEvent.addListener(a, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(g) {
    g.preventDefault();
  }));
};
Sidebar.prototype.setContentVisible = function(a, b) {
  mxUtils.setPrefixedStyle(a.style, 'transition', 'all 0.2s linear');
  mxUtils.setPrefixedStyle(a.style, 'transform-origin', 'top left');
  b ? (mxUtils.setPrefixedStyle(a.style, 'transform', 'scaleY(0)'), a.style.display = 'block', window.setTimeout(mxUtils.bind(this, function() {
    mxUtils.setPrefixedStyle(a.style, 'transform', 'scaleY(1)');
    window.setTimeout(mxUtils.bind(this, function() {
      mxUtils.setPrefixedStyle(a.style, 'transform', null);
      mxUtils.setPrefixedStyle(a.style, 'transition', null);
    }), 200);
  }), 0)) : (mxUtils.setPrefixedStyle(a.style, 'transform', 'scaleY(0)'), window.setTimeout(mxUtils.bind(this, function() {
    mxUtils.setPrefixedStyle(a.style, 'transform', null);
    mxUtils.setPrefixedStyle(a.style, 'transition', null);
    a.style.display = 'none';
  }), 200));
};
Sidebar.prototype.removePalette = function(a) {
  var b = this.palettes[a];
  if (null != b) {
    this.palettes[a] = null;
    for (a = 0; a < b.length; a++)
      this.container.removeChild(b[a]);
    return !0;
  }
  return !1;
};
Sidebar.prototype.addImagePalette = function(a, b, f, e, g, d, h) {
  for (var n = [], u = 0; u < g.length; u++)
    mxUtils.bind(this, function(m, p, x) {
      if (null == x) {
        x = m.lastIndexOf('/');
        var A = m.lastIndexOf('.');
        x = m.substring(0 <= x ? x + 1 : 0, 0 <= A ? A : m.length).replace(/[-_]/g, ' ');
      }
      n.push(this.createVertexTemplateEntry('image;html=1;image=' + f + m + e, this.defaultImageWidth, this.defaultImageHeight, '', p, null != p, null, this.filterTags(x)));
    })(g[u], null != d ? d[u] : null, null != h ? h[g[u]] : null);
  this.addPaletteFunctions(a, b, !1, n);
};
Sidebar.prototype.getTagsForStencil = function(a, b, f) {
  a = a.split('.');
  for (var e = 1; e < a.length; e++)
    a[e] = a[e].replace(/_/g, ' ');
  a.push(b.replace(/_/g, ' '));
  null != f && a.push(f);
  return a.slice(1, a.length);
};
Sidebar.prototype.addStencilPalette = function(a, b, f, e, g, d, h, n, u, m) {
  h = null != h ? h : 1;
  if (this.addStencilsToIndex) {
    var p = [];
    if (null != u)
      for (m = 0; m < u.length; m++)
        p.push(u[m]);
    mxStencilRegistry.loadStencilSet(f, mxUtils.bind(this, function(x, A, C, D, G) {
      if (null == g || 0 > mxUtils.indexOf(g, A)) {
        C = this.getTagsForStencil(x, A);
        var F = null != n ? n[A] : null;
        null != F && C.push(F);
        p.push(this.createVertexTemplateEntry('shape=' + x + A.toLowerCase() + e, Math.round(D * h), Math.round(G * h), '', A.replace(/_/g, ' '), null, null, this.filterTags(C.join(' '))));
      }
    }), !0, !0);
    this.addPaletteFunctions(a, b, !1, p);
  } else
    this.addPalette(a, b, !1, mxUtils.bind(this, function(x) {
      null == e && (e = '');
      null != d && d.call(this, x);
      if (null != u)
        for (var A = 0; A < u.length; A++)
          u[A](x);
      mxStencilRegistry.loadStencilSet(f, mxUtils.bind(this, function(C, D, G, F, K) {
        (null == g || 0 > mxUtils.indexOf(g, D)) && x.appendChild(this.createVertexTemplate('shape=' + C + D.toLowerCase() + e, Math.round(F * h), Math.round(K * h), '', D.replace(/_/g, ' '), !0));
      }), !0);
    }));
};
Sidebar.prototype.destroy = function() {
  null != this.graph && (null != this.graph.container && null != this.graph.container.parentNode && this.graph.container.parentNode.removeChild(this.graph.container), this.graph.destroy(), this.graph = null);
  null != this.pointerUpHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? 'pointerup' : 'mouseup', this.pointerUpHandler), this.pointerUpHandler = null);
  null != this.pointerDownHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', this.pointerDownHandler), this.pointerDownHandler = null);
  null != this.pointerMoveHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', this.pointerMoveHandler), this.pointerMoveHandler = null);
  null != this.pointerOutHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? 'pointerout' : 'mouseout', this.pointerOutHandler), this.pointerOutHandler = null);
};
(function() {
  var a = [
      [
        'nbsp',
        '160'
      ],
      [
        'shy',
        '173'
      ]
    ],
    b = mxUtils.parseXml;
  mxUtils.parseXml = function(f) {
    for (var e = 0; e < a.length; e++)
      f = f.replace(new RegExp('&' + a[e][0] + ';', 'g'), '&#' + a[e][1] + ';');
    return b(f);
  };
}());
Date.prototype.toISOString || function() {
  function a(b) {
    b = String(b);
    1 === b.length && (b = '0' + b);
    return b;
  }
  Date.prototype.toISOString = function() {
    return this.getUTCFullYear() + '-' + a(this.getUTCMonth() + 1) + '-' + a(this.getUTCDate()) + 'T' + a(this.getUTCHours()) + ':' + a(this.getUTCMinutes()) + ':' + a(this.getUTCSeconds()) + '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) + 'Z';
  };
}();
Date.now || (Date.now = function() {
  return new Date().getTime();
});
Uint8Array.from || (Uint8Array.from = function() {
  var a = Object.prototype.toString,
    b = function(e) {
      return 'function' === typeof e || '[object Function]' === a.call(e);
    },
    f = Math.pow(2, 53) - 1;
  return function(e) {
    var g = Object(e);
    if (null == e)
      throw new TypeError('Array.from requires an array-like object - not null or undefined');
    var d = 1 < arguments.length ? arguments[1] : void 0,
      h;
    if ('undefined' !== typeof d) {
      if (!b(d))
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      2 < arguments.length && (h = arguments[2]);
    }
    var n = Number(g.length);
    n = isNaN(n) ? 0 : 0 !== n && isFinite(n) ? (0 < n ? 1 : -1) * Math.floor(Math.abs(n)) : n;
    n = Math.min(Math.max(n, 0), f);
    for (var u = b(this) ? Object(new this(n)) : Array(n), m = 0, p; m < n;)
      p = g[m], u[m] = d ? 'undefined' === typeof h ? d(p, m) : d.call(h, p, m) : p, m += 1;
    u.length = n;
    return u;
  };
}());
mxConstants.POINTS = 1;
mxConstants.MILLIMETERS = 2;
mxConstants.INCHES = 3;
mxConstants.METERS = 4;
mxConstants.PIXELS_PER_MM = 3.937;
mxConstants.PIXELS_PER_INCH = 100;
mxConstants.SHADOW_OPACITY = 0.25;
mxConstants.SHADOWCOLOR = '#000000';
mxConstants.VML_SHADOWCOLOR = '#d0d0d0';
mxCodec.allowlist = 'mxStylesheet Array mxGraphModel mxCell mxGeometry mxRectangle mxPoint mxChildChange mxRootChange mxTerminalChange mxValueChange mxStyleChange mxGeometryChange mxCollapseChange mxVisibleChange mxCellAttributeChange'.split(' ');
mxGraph.prototype.pageBreakColor = '#c0c0c0';
mxGraph.prototype.pageScale = 1;
(function() {
  try {
    if (null != navigator && null != navigator.language) {
      var a = navigator.language.toLowerCase();
      mxGraph.prototype.pageFormat = 'en-us' === a || 'en-ca' === a || 'es-mx' === a ? mxConstants.PAGE_FORMAT_LETTER_PORTRAIT : mxConstants.PAGE_FORMAT_A4_PORTRAIT;
    }
  } catch (b) {}
}());
mxText.prototype.baseSpacingTop = 5;
mxText.prototype.baseSpacingBottom = 1;
mxGraphModel.prototype.ignoreRelativeEdgeParent = !1;
mxGraphView.prototype.gridImage = mxClient.IS_SVG ? 'data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=' : IMAGE_PATH + '/grid.gif';
mxGraphView.prototype.gridSteps = 4;
mxGraphView.prototype.minGridSize = 4;
mxGraphView.prototype.defaultGridColor = '#d0d0d0';
mxGraphView.prototype.defaultDarkGridColor = '#424242';
mxGraphView.prototype.gridColor = mxGraphView.prototype.defaultGridColor;
mxGraphView.prototype.unit = mxConstants.POINTS;
mxGraphView.prototype.setUnit = function(a) {
  this.unit != a && (this.unit = a, this.fireEvent(new mxEventObject('unitChanged', 'unit', a)));
};
mxSvgCanvas2D.prototype.foAltText = '[Not supported by viewer]';
mxShape.prototype.getConstraints = function(a, b, f) {
  return null;
};
mxImageShape.prototype.getImageDataUri = function() {
  var a = this.image;
  if ('data:image/svg+xml;base64,' == a.substring(0, 26) && null != this.style && '1' == mxUtils.getValue(this.style, 'clipSvg', '0')) {
    if (null == this.clippedSvg || this.clippedImage != a)
      this.clippedSvg = Graph.clipSvgDataUri(a, !0), this.clippedImage = a;
    a = this.clippedSvg;
  }
  return a;
};