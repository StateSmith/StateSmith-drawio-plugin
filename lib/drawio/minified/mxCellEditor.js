function mxCellEditor(a) {
  this.graph = a;
  this.zoomHandler = mxUtils.bind(this, function() {
    this.graph.isEditing() && this.resize();
  });
  this.graph.view.addListener(mxEvent.SCALE, this.zoomHandler);
  this.graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE, this.zoomHandler);
  this.changeHandler = mxUtils.bind(this, function(b) {
    null != this.editingCell && (b = this.graph.getView().getState(this.editingCell), null == b ? this.stopEditing(!0) : this.updateTextAreaStyle(b));
  });
  this.graph.getModel().addListener(mxEvent.CHANGE, this.changeHandler);
}
mxCellEditor.prototype.graph = null;
mxCellEditor.prototype.textarea = null;
mxCellEditor.prototype.editingCell = null;
mxCellEditor.prototype.trigger = null;
mxCellEditor.prototype.modified = !1;
mxCellEditor.prototype.autoSize = !0;
mxCellEditor.prototype.selectText = !0;
mxCellEditor.prototype.emptyLabelText = mxClient.IS_FF ? '<br>' : '';
mxCellEditor.prototype.escapeCancelsEditing = !0;
mxCellEditor.prototype.textNode = '';
mxCellEditor.prototype.zIndex = 1;
mxCellEditor.prototype.minResize = new mxRectangle(0, 20);
mxCellEditor.prototype.wordWrapPadding = 0;
mxCellEditor.prototype.blurEnabled = !1;
mxCellEditor.prototype.initialValue = null;
mxCellEditor.prototype.align = null;
mxCellEditor.prototype.init = function() {
  this.textarea = document.createElement('div');
  this.textarea.className = 'mxCellEditor mxPlainTextEditor';
  this.textarea.contentEditable = !0;
  mxClient.IS_GC && (this.textarea.style.minHeight = '1em');
  this.textarea.style.position = this.isLegacyEditor() ? 'absolute' : 'relative';
  this.installListeners(this.textarea);
};
mxCellEditor.prototype.applyValue = function(a, b) {
  this.graph.labelChanged(a.cell, b, this.trigger);
};
mxCellEditor.prototype.setAlign = function(a) {
  null != this.textarea && (this.textarea.style.textAlign = a);
  this.align = a;
  this.resize();
};
mxCellEditor.prototype.getInitialValue = function(a, b) {
  a = mxUtils.htmlEntities(this.graph.getEditingValue(a.cell, b), !1);
  8 != document.documentMode && 9 != document.documentMode && 10 != document.documentMode && (a = mxUtils.replaceTrailingNewlines(a, '<div><br></div>'));
  return a.replace(/\n/g, '<br>');
};
mxCellEditor.prototype.getCurrentValue = function(a) {
  return mxUtils.extractTextWithWhitespace(this.textarea.childNodes);
};
mxCellEditor.prototype.isCancelEditingKeyEvent = function(a) {
  return this.escapeCancelsEditing || mxEvent.isShiftDown(a) || mxEvent.isControlDown(a) || mxEvent.isMetaDown(a);
};
mxCellEditor.prototype.installListeners = function(a) {
  mxEvent.addListener(a, 'dragstart', mxUtils.bind(this, function(d) {
    this.graph.stopEditing(!1);
    mxEvent.consume(d);
  }));
  mxEvent.addListener(a, 'blur', mxUtils.bind(this, function(d) {
    this.blurEnabled && this.focusLost(d);
  }));
  mxEvent.addListener(a, 'keydown', mxUtils.bind(this, function(d) {
    mxEvent.isConsumed(d) || (this.isStopEditingEvent(d) ? (this.graph.stopEditing(!1), mxEvent.consume(d)) : 27 == d.keyCode && (this.graph.stopEditing(this.isCancelEditingKeyEvent(d)), mxEvent.consume(d)));
  }));
  var b = mxUtils.bind(this, function(d) {
    null != this.editingCell && this.clearOnChange && a.innerHTML == this.getEmptyLabelText() && (!mxClient.IS_FF || 8 != d.keyCode && 46 != d.keyCode) && (this.clearOnChange = !1, a.innerText = '');
  });
  mxEvent.addListener(a, 'keypress', b);
  mxEvent.addListener(a, 'paste', b);
  b = mxUtils.bind(this, function(d) {
    null != this.editingCell && (0 == this.textarea.innerHTML.length || '<br>' == this.textarea.innerHTML ? (this.textarea.innerHTML = this.getEmptyLabelText(), this.clearOnChange = 0 < this.textarea.innerHTML.length) : this.clearOnChange = !1);
  });
  mxEvent.addListener(a, mxClient.IS_IE11 || mxClient.IS_IE ? 'keyup' : 'input', b);
  mxEvent.addListener(a, 'cut', b);
  mxEvent.addListener(a, 'paste', b);
  b = mxClient.IS_IE11 || mxClient.IS_IE ? 'keydown' : 'input';
  var c = mxUtils.bind(this, function(d) {
    null != this.editingCell && this.autoSize && !mxEvent.isConsumed(d) && (null != this.resizeThread && window.clearTimeout(this.resizeThread), this.resizeThread = window.setTimeout(mxUtils.bind(this, function() {
      this.resizeThread = null;
      this.resize();
    }), 0));
  });
  mxEvent.addListener(a, b, c);
  mxEvent.addListener(window, 'resize', c);
  9 <= document.documentMode ? (mxEvent.addListener(a, 'DOMNodeRemoved', c), mxEvent.addListener(a, 'DOMNodeInserted', c)) : (mxEvent.addListener(a, 'cut', c), mxEvent.addListener(a, 'paste', c));
};
mxCellEditor.prototype.isStopEditingEvent = function(a) {
  return 113 == a.keyCode || this.graph.isEnterStopsCellEditing() && 13 == a.keyCode && !mxEvent.isControlDown(a) && !mxEvent.isShiftDown(a);
};
mxCellEditor.prototype.isEventSource = function(a) {
  return mxEvent.getSource(a) == this.textarea;
};
mxCellEditor.prototype.resize = function() {
  var a = this.graph.getView().getState(this.editingCell);
  if (null == a)
    this.stopEditing(!0);
  else if (null != this.textarea) {
    var b = this.graph.getModel().isEdge(a.cell),
      c = this.graph.getView().scale,
      d = null;
    if (this.autoSize && 'fill' != a.style[mxConstants.STYLE_OVERFLOW]) {
      var e = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_WIDTH, null);
      d = null != a.text && null == this.align ? a.text.margin : null;
      null == d && (d = mxUtils.getAlignmentAsPoint(this.align || mxUtils.getValue(a.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER), mxUtils.getValue(a.style, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE)));
      if (b) {
        if (this.bounds = new mxRectangle(a.absoluteOffset.x, a.absoluteOffset.y, 0, 0), null != e) {
          var f = (parseFloat(e) + 2) * c;
          this.bounds.width = f;
          this.bounds.x += d.x * f;
        }
      } else {
        b = mxRectangle.fromRectangle(a);
        var g = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER),
          k = mxUtils.getValue(a.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);
        b = null != a.shape && g == mxConstants.ALIGN_CENTER && k == mxConstants.ALIGN_MIDDLE ? a.shape.getLabelBounds(b) : b;
        null != e && (b.width = parseFloat(e) * c);
        if (!a.view.graph.cellRenderer.legacySpacing || 'width' != a.style[mxConstants.STYLE_OVERFLOW] && 'block' != a.style[mxConstants.STYLE_OVERFLOW]) {
          g = parseFloat(mxUtils.getValue(a.style, mxConstants.STYLE_SPACING, 2)) * c;
          var l = (parseFloat(mxUtils.getValue(a.style, mxConstants.STYLE_SPACING_TOP, 0)) + mxText.prototype.baseSpacingTop) * c + g,
            m = (parseFloat(mxUtils.getValue(a.style, mxConstants.STYLE_SPACING_RIGHT, 0)) + mxText.prototype.baseSpacingRight) * c + g,
            n = (parseFloat(mxUtils.getValue(a.style, mxConstants.STYLE_SPACING_BOTTOM, 0)) + mxText.prototype.baseSpacingBottom) * c + g,
            p = (parseFloat(mxUtils.getValue(a.style, mxConstants.STYLE_SPACING_LEFT, 0)) + mxText.prototype.baseSpacingLeft) * c + g;
          g = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
          k = mxUtils.getValue(a.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);
          b = new mxRectangle(b.x + p, b.y + l, b.width - (g == mxConstants.ALIGN_CENTER && null == e ? p + m : 0), b.height - (k == mxConstants.ALIGN_MIDDLE ? l + n : 0));
          this.graph.isHtmlLabel(a.cell) && (b.x -= mxSvgCanvas2D.prototype.foreignObjectPadding / 2, b.y -= mxSvgCanvas2D.prototype.foreignObjectPadding / 2, b.width += mxSvgCanvas2D.prototype.foreignObjectPadding);
        }
        this.bounds = new mxRectangle(b.x + a.absoluteOffset.x, b.y + a.absoluteOffset.y, b.width, b.height);
      }
      if (this.graph.isWrapping(a.cell) && (2 <= this.bounds.width || 2 <= this.bounds.height))
        if (this.textarea.style.wordWrap = mxConstants.WORD_WRAP, this.textarea.style.whiteSpace = 'normal', this.textarea.innerHTML != this.getEmptyLabelText())
          if (f = Math.round(this.bounds.width / c) + this.wordWrapPadding, 'relative' != this.textarea.style.position)
            this.textarea.style.width = f + 'px', this.textarea.scrollWidth > f && (this.textarea.style.width = this.textarea.scrollWidth + 'px');
          else if ('block' == a.style[mxConstants.STYLE_OVERFLOW] || 'width' == a.style[mxConstants.STYLE_OVERFLOW]) {
        if (-0.5 == d.y || 'width' == a.style[mxConstants.STYLE_OVERFLOW])
          this.textarea.style.maxHeight = this.bounds.height + 'px';
        this.textarea.style.width = f + 'px';
      } else
        this.textarea.style.maxWidth = f + 'px';
      else
        this.textarea.style.maxWidth = f + 'px';
      else
        this.textarea.style.whiteSpace = 'nowrap', this.textarea.style.width = '';
      8 == document.documentMode && (this.textarea.style.zoom = '1', this.textarea.style.height = 'auto');
      8 == document.documentMode ? (a = this.textarea.scrollWidth, e = this.textarea.scrollHeight, this.textarea.style.left = Math.max(0, Math.ceil((this.bounds.x - d.x * (this.bounds.width - (a + 1) * c) + a * (c - 1) * 0 + 2 * (d.x + 0.5)) / c)) + 'px', this.textarea.style.top = Math.max(0, Math.ceil((this.bounds.y - d.y * (this.bounds.height - (e + 0.5) * c) + e * (c - 1) * 0 + 1 * Math.abs(d.y + 0.5)) / c)) + 'px', this.textarea.style.width = Math.round(a * c) + 'px', this.textarea.style.height = Math.round(e * c) + 'px') : (this.textarea.style.left = Math.max(0, Math.round(this.bounds.x - d.x * (this.bounds.width - 2)) + 1) + 'px', this.textarea.style.top = Math.max(0, Math.round(this.bounds.y - d.y * (this.bounds.height - 4) + (-1 == d.y ? 3 : 0)) + 1) + 'px');
    } else
      this.bounds = this.getEditorBounds(a), this.textarea.style.width = Math.round(this.bounds.width / c) + 'px', this.textarea.style.height = Math.round(this.bounds.height / c) + 'px', 8 == document.documentMode ? (this.textarea.style.left = Math.round(this.bounds.x) + 'px', this.textarea.style.top = Math.round(this.bounds.y) + 'px') : (this.textarea.style.left = Math.max(0, Math.round(this.bounds.x + 1)) + 'px', this.textarea.style.top = Math.max(0, Math.round(this.bounds.y + 1)) + 'px'), this.graph.isWrapping(a.cell) && (2 <= this.bounds.width || 2 <= this.bounds.height) && this.textarea.innerHTML != this.getEmptyLabelText() ? (this.textarea.style.wordWrap = mxConstants.WORD_WRAP, this.textarea.style.whiteSpace = 'normal', 'fill' != a.style[mxConstants.STYLE_OVERFLOW] && (this.textarea.style.width = Math.round(this.bounds.width / c) + this.wordWrapPadding + 'px')) : (this.textarea.style.whiteSpace = 'nowrap', 'fill' != a.style[mxConstants.STYLE_OVERFLOW] && (this.textarea.style.width = ''));
    mxUtils.setPrefixedStyle(this.textarea.style, 'transformOrigin', '0px 0px');
    mxUtils.setPrefixedStyle(this.textarea.style, 'transform', 'scale(' + c + ',' + c + ')' + (null == d ? '' : ' translate(' + 100 * d.x + '%,' + 100 * d.y + '%)'));
  }
};
mxCellEditor.prototype.focusLost = function() {
  this.stopEditing(!this.graph.isInvokesStopCellEditing());
};
mxCellEditor.prototype.getBackgroundColor = function(a) {
  return null;
};
mxCellEditor.prototype.getBorderColor = function(a) {
  return null;
};
mxCellEditor.prototype.isLegacyEditor = function() {
  var a = !1;
  if (mxClient.IS_SVG) {
    var b = this.graph.view.getDrawPane().ownerSVGElement;
    null != b && (b = mxUtils.getCurrentStyle(b), null != b && (a = 'absolute' == b.position));
  }
  return !a;
};
mxCellEditor.prototype.updateTextAreaStyle = function(a) {
  this.graph.getView();
  var b = mxUtils.getValue(a.style, mxConstants.STYLE_FONTSIZE, mxConstants.DEFAULT_FONTSIZE),
    c = mxUtils.getValue(a.style, mxConstants.STYLE_FONTFAMILY, mxConstants.DEFAULT_FONTFAMILY),
    d = mxUtils.getValue(a.style, mxConstants.STYLE_FONTCOLOR, 'black'),
    e = mxUtils.getValue(a.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_LEFT),
    f = (mxUtils.getValue(a.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD,
    g = (mxUtils.getValue(a.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC,
    k = [];
  (mxUtils.getValue(a.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && k.push('underline');
  (mxUtils.getValue(a.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && k.push('line-through');
  this.textarea.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT ? Math.round(b * mxConstants.LINE_HEIGHT) + 'px' : mxConstants.LINE_HEIGHT;
  this.textarea.style.backgroundColor = this.getBackgroundColor(a);
  this.textarea.style.textDecoration = k.join(' ');
  this.textarea.style.fontWeight = f ? 'bold' : 'normal';
  this.textarea.style.fontStyle = g ? 'italic' : '';
  this.textarea.style.fontSize = Math.round(b) + 'px';
  this.textarea.style.zIndex = this.zIndex;
  this.textarea.style.fontFamily = c;
  this.textarea.style.textAlign = e;
  this.textarea.style.outline = 'none';
  this.textarea.style.color = d;
  b = this.getBorderColor(a);
  this.textarea.style.border = null != b ? '1px solid ' + b : 'none';
  b = this.textDirection = mxUtils.getValue(a.style, mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION);
  b == mxConstants.TEXT_DIRECTION_AUTO && (null == a || null == a.text || a.text.dialect == mxConstants.DIALECT_STRICTHTML || mxUtils.isNode(a.text.value) || (b = a.text.getAutoDirection()));
  b == mxConstants.TEXT_DIRECTION_LTR || b == mxConstants.TEXT_DIRECTION_RTL ? this.textarea.setAttribute('dir', b) : this.textarea.removeAttribute('dir');
};
mxCellEditor.prototype.startEditing = function(a, b) {
  this.stopEditing(!0);
  this.align = null;
  null == this.textarea && this.init();
  null != this.graph.tooltipHandler && this.graph.tooltipHandler.hideTooltip();
  var c = this.graph.getView().getState(a);
  if (null != c) {
    this.updateTextAreaStyle(c);
    this.textarea.innerHTML = this.getInitialValue(c, b) || '';
    this.initialValue = this.textarea.innerHTML;
    0 == this.textarea.innerHTML.length || '<br>' == this.textarea.innerHTML ? (this.textarea.innerHTML = this.getEmptyLabelText(), this.clearOnChange = !0) : this.clearOnChange = this.textarea.innerHTML == this.getEmptyLabelText();
    this.graph.container.appendChild(this.textarea);
    this.editingCell = a;
    this.trigger = b;
    this.textNode = null;
    null != c.text && this.isHideLabel(c) && (this.textNode = c.text.node, this.textNode.style.visibility = 'hidden');
    this.autoSize && (this.graph.model.isEdge(c.cell) || 'fill' != c.style[mxConstants.STYLE_OVERFLOW]) && window.setTimeout(mxUtils.bind(this, function() {
      this.resize();
    }), 0);
    this.resize();
    try {
      this.textarea.focus(), this.isSelectText() && 0 < this.textarea.innerHTML.length && (this.textarea.innerHTML != this.getEmptyLabelText() || !this.clearOnChange) && document.execCommand('selectAll', !1, null);
    } catch (d) {}
  }
};
mxCellEditor.prototype.isSelectText = function() {
  return this.selectText;
};
mxCellEditor.prototype.clearSelection = function() {
  var a = null;
  window.getSelection ? a = window.getSelection() : document.selection && (a = document.selection);
  null != a && (a.empty ? a.empty() : a.removeAllRanges && a.removeAllRanges());
};
mxCellEditor.prototype.stopEditing = function(a) {
  if (null != this.editingCell) {
    null != this.textNode && (this.textNode.style.visibility = 'visible', this.textNode = null);
    a = a ? null : this.graph.view.getState(this.editingCell);
    var b = this.initialValue;
    this.bounds = this.trigger = this.editingCell = this.initialValue = null;
    this.textarea.blur();
    this.clearSelection();
    null != this.textarea.parentNode && this.textarea.parentNode.removeChild(this.textarea);
    this.clearOnChange && this.textarea.innerHTML == this.getEmptyLabelText() && (this.textarea.innerText = '', this.clearOnChange = !1);
    if (null != a && (this.textarea.innerHTML != b || null != this.align)) {
      this.prepareTextarea();
      b = this.getCurrentValue(a);
      this.graph.getModel().beginUpdate();
      try {
        null != b && this.applyValue(a, b), null != this.align && this.graph.setCellStyles(mxConstants.STYLE_ALIGN, this.align, [a.cell]);
      } finally {
        this.graph.getModel().endUpdate();
      }
    }
    mxEvent.release(this.textarea);
    this.align = this.textarea = null;
  }
};
mxCellEditor.prototype.prepareTextarea = function() {
  null != this.textarea.lastChild && 'BR' == this.textarea.lastChild.nodeName && this.textarea.removeChild(this.textarea.lastChild);
};
mxCellEditor.prototype.isHideLabel = function(a) {
  return !0;
};
mxCellEditor.prototype.getMinimumSize = function(a) {
  var b = this.graph.getView().scale;
  return new mxRectangle(0, 0, null == a.text ? 30 : a.text.size * b + 20, 'left' == this.textarea.style.textAlign ? 120 : 40);
};
mxCellEditor.prototype.getEditorBounds = function(a) {
  var b = this.graph.getModel().isEdge(a.cell),
    c = this.graph.getView().scale,
    d = this.getMinimumSize(a),
    e = d.width;
  d = d.height;
  if (!b && a.view.graph.cellRenderer.legacySpacing && 'fill' == a.style[mxConstants.STYLE_OVERFLOW])
    c = a.shape.getLabelBounds(mxRectangle.fromRectangle(a));
  else {
    var f = parseFloat(mxUtils.getValue(style, mxConstants.STYLE_SPACING, 2)) * c,
      g = (parseFloat(mxUtils.getValue(style, mxConstants.STYLE_SPACING_TOP, 0)) + mxText.prototype.baseSpacingTop) * c + f,
      k = (parseFloat(mxUtils.getValue(style, mxConstants.STYLE_SPACING_RIGHT, 0)) + mxText.prototype.baseSpacingRight) * c + f,
      l = (parseFloat(mxUtils.getValue(style, mxConstants.STYLE_SPACING_BOTTOM, 0)) + mxText.prototype.baseSpacingBottom) * c + f;
    f = (parseFloat(mxUtils.getValue(style, mxConstants.STYLE_SPACING_LEFT, 0)) + mxText.prototype.baseSpacingLeft) * c + f;
    c = new mxRectangle(a.x, a.y, Math.max(e, a.width - f - k), Math.max(d, a.height - g - l));
    k = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
    l = mxUtils.getValue(a.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);
    this.graph.isHtmlLabel(a.cell) && (c.width += mxSvgCanvas2D.prototype.foreignObjectPadding);
    c = null != a.shape && k == mxConstants.ALIGN_CENTER && l == mxConstants.ALIGN_MIDDLE ? a.shape.getLabelBounds(c) : c;
    b ? (c.x = a.absoluteOffset.x, c.y = a.absoluteOffset.y, null != a.text && null != a.text.boundingBox && (0 < a.text.boundingBox.x && (c.x = a.text.boundingBox.x), 0 < a.text.boundingBox.y && (c.y = a.text.boundingBox.y))) : null != a.text && null != a.text.boundingBox && (c.x = Math.min(c.x, a.text.boundingBox.x), c.y = Math.min(c.y, a.text.boundingBox.y));
    c.x += f;
    c.y += g;
    null != a.text && null != a.text.boundingBox && (b ? (c.width = Math.max(e, a.text.boundingBox.width), c.height = Math.max(d, a.text.boundingBox.height)) : (c.width = Math.max(c.width, a.text.boundingBox.width), c.height = Math.max(c.height, a.text.boundingBox.height)));
    this.graph.getModel().isVertex(a.cell) && (b = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER), b == mxConstants.ALIGN_LEFT ? c.x -= a.width : b == mxConstants.ALIGN_RIGHT && (c.x += a.width), b = mxUtils.getValue(a.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE), b == mxConstants.ALIGN_TOP ? c.y -= a.height : b == mxConstants.ALIGN_BOTTOM && (c.y += a.height));
  }
  return new mxRectangle(Math.round(c.x), Math.round(c.y), Math.round(c.width), Math.round(c.height));
};
mxCellEditor.prototype.getEmptyLabelText = function(a) {
  return this.emptyLabelText;
};
mxCellEditor.prototype.getEditingCell = function() {
  return this.editingCell;
};
mxCellEditor.prototype.destroy = function() {
  null != this.textarea && (mxEvent.release(this.textarea), null != this.textarea.parentNode && this.textarea.parentNode.removeChild(this.textarea), this.textarea = null);
  null != this.changeHandler && (this.graph.getModel().removeListener(this.changeHandler), this.changeHandler = null);
  this.zoomHandler && (this.graph.view.removeListener(this.zoomHandler), this.zoomHandler = null);
};