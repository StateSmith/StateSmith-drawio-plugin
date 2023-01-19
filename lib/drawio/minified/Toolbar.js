function Toolbar(a, b) {
  this.editorUi = a;
  this.container = b;
  this.staticElements = [];
  this.init();
  this.gestureHandler = mxUtils.bind(this, function(f) {
    null != this.editorUi.currentMenu && mxEvent.getSource(f) != this.editorUi.currentMenu.div && this.hideMenu();
  });
  mxEvent.addGestureListeners(document, this.gestureHandler);
}
Toolbar.prototype.dropDownImage = mxClient.IS_SVG ? 'data:image/gif;base64,R0lGODlhDQANAIABAHt7e////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREM1NkJFMjE0NEMxMUU1ODk1Q0M5MjQ0MTA4QjNDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREM1NkJFMzE0NEMxMUU1ODk1Q0M5MjQ0MTA4QjNDMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQzOUMzMjZCMTQ0QjExRTU4OTVDQzkyNDQxMDhCM0MxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQzOUMzMjZDMTQ0QjExRTU4OTVDQzkyNDQxMDhCM0MxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7' : IMAGE_PATH + '/dropdown.gif';
Toolbar.prototype.selectedBackground = '#d0d0d0';
Toolbar.prototype.unselectedBackground = 'none';
Toolbar.prototype.staticElements = null;
Toolbar.prototype.init = function() {
  var a = screen.width;
  a -= 740 < screen.height ? 56 : 0;
  if (700 <= a) {
    var b = this.addMenu('', mxResources.get('view') + ' (' + mxResources.get('panTooltip') + ')', !0, 'viewPanels', null, !0);
    this.addDropDownArrow(b, 'geSprite-formatpanel', 38, 50, -4, -3, 36, -8);
    this.addSeparator();
  }
  var f = this.addMenu('', mxResources.get('zoom') + ' (Alt+Mousewheel)', !0, 'viewZoom', null, !0);
  f.showDisabled = !0;
  f.style.whiteSpace = 'nowrap';
  f.style.position = 'relative';
  f.style.overflow = 'hidden';
  f.style.width = EditorUi.compactUi ? '50px' : '36px';
  420 <= a && (this.addSeparator(), b = this.addItems([
    'zoomIn',
    'zoomOut'
  ]), b[0].setAttribute('title', mxResources.get('zoomIn') + ' (' + this.editorUi.actions.get('zoomIn').shortcut + ')'), b[1].setAttribute('title', mxResources.get('zoomOut') + ' (' + this.editorUi.actions.get('zoomOut').shortcut + ')'));
  this.updateZoom = mxUtils.bind(this, function() {
    f.innerHTML = Math.round(100 * this.editorUi.editor.graph.view.scale) + '%';
    this.appendDropDownImageHtml(f);
    EditorUi.compactUi && (f.getElementsByTagName('img')[0].style.right = '1px', f.getElementsByTagName('img')[0].style.top = '5px');
  });
  this.editorUi.editor.graph.view.addListener(mxEvent.EVENT_SCALE, this.updateZoom);
  this.editorUi.editor.addListener('resetGraphView', this.updateZoom);
  b = this.addItems([
    '-',
    'undo',
    'redo'
  ]);
  b[1].setAttribute('title', mxResources.get('undo') + ' (' + this.editorUi.actions.get('undo').shortcut + ')');
  b[2].setAttribute('title', mxResources.get('redo') + ' (' + this.editorUi.actions.get('redo').shortcut + ')');
  320 <= a && (b = this.addItems([
    '-',
    'delete'
  ]), b[1].setAttribute('title', mxResources.get('delete') + ' (' + this.editorUi.actions.get('delete').shortcut + ')'));
  550 <= a && this.addItems([
    '-',
    'toFront',
    'toBack'
  ]);
  740 <= a && (this.addItems([
    '-',
    'fillColor'
  ]), 780 <= a && (this.addItems(['strokeColor']), 820 <= a && this.addItems(['shadow'])));
  400 <= a && (this.addSeparator(), 440 <= a && (this.edgeShapeMenu = this.addMenuFunction('', mxResources.get('connection'), !1, mxUtils.bind(this, function(e) {
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_SHAPE,
      'width'
    ], [
      null,
      null
    ], 'geIcon geSprite geSprite-connection', null, !0).setAttribute('title', mxResources.get('line'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_SHAPE,
      'width'
    ], [
      'link',
      null
    ], 'geIcon geSprite geSprite-linkedge', null, !0).setAttribute('title', mxResources.get('link'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_SHAPE,
      'width'
    ], [
      'flexArrow',
      null
    ], 'geIcon geSprite geSprite-arrow', null, !0).setAttribute('title', mxResources.get('arrow'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_SHAPE,
      'width'
    ], [
      'arrow',
      null
    ], 'geIcon geSprite geSprite-simplearrow', null, !0).setAttribute('title', mxResources.get('simpleArrow'));
  })), this.addDropDownArrow(this.edgeShapeMenu, 'geSprite-connection', 44, 50, 0, 0, 22, -4)), this.edgeStyleMenu = this.addMenuFunction('geSprite-orthogonal', mxResources.get('waypoints'), !1, mxUtils.bind(this, function(e) {
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-straight', null, !0).setAttribute('title', mxResources.get('straight'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'orthogonalEdgeStyle',
      null,
      null
    ], 'geIcon geSprite geSprite-orthogonal', null, !0).setAttribute('title', mxResources.get('orthogonal'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_ELBOW,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'elbowEdgeStyle',
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-horizontalelbow', null, !0).setAttribute('title', mxResources.get('simple'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_ELBOW,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'elbowEdgeStyle',
      'vertical',
      null,
      null
    ], 'geIcon geSprite geSprite-verticalelbow', null, !0).setAttribute('title', mxResources.get('simple'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_ELBOW,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'isometricEdgeStyle',
      null,
      null,
      null
    ], 'geIcon geSprite geSprite-horizontalisometric', null, !0).setAttribute('title', mxResources.get('isometric'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_ELBOW,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'isometricEdgeStyle',
      'vertical',
      null,
      null
    ], 'geIcon geSprite geSprite-verticalisometric', null, !0).setAttribute('title', mxResources.get('isometric'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'orthogonalEdgeStyle',
      '1',
      null
    ], 'geIcon geSprite geSprite-curved', null, !0).setAttribute('title', mxResources.get('curved'));
    this.editorUi.menus.edgeStyleChange(e, '', [
      mxConstants.STYLE_EDGE,
      mxConstants.STYLE_CURVED,
      mxConstants.STYLE_NOEDGESTYLE
    ], [
      'entityRelationEdgeStyle',
      null,
      null
    ], 'geIcon geSprite geSprite-entity', null, !0).setAttribute('title', mxResources.get('entityRelation'));
  })), this.addDropDownArrow(this.edgeStyleMenu, 'geSprite-orthogonal', 44, 50, 0, 0, 22, -4));
  this.addSeparator();
  a = this.addMenu('', mxResources.get('insert') + ' (' + mxResources.get('doubleClickTooltip') + ')', !0, 'insert', null, !0);
  this.addDropDownArrow(a, 'geSprite-plus', 38, 48, -4, -3, 36, -8);
  this.addSeparator();
  this.addTableDropDown();
};
Toolbar.prototype.appendDropDownImageHtml = function(a) {
  var b = document.createElement('img');
  b.setAttribute('border', '0');
  b.setAttribute('valign', 'middle');
  b.setAttribute('src', Toolbar.prototype.dropDownImage);
  a.appendChild(b);
  b.style.position = 'absolute';
  b.style.right = '4px';
  b.style.top = (EditorUi.compactUi ? 6 : 8) + 'px';
};
Toolbar.prototype.addTableDropDown = function() {
  var a = this.addMenuFunction('geIcon geSprite geSprite-table', mxResources.get('table'), !1, mxUtils.bind(this, function(f) {
    this.editorUi.menus.addInsertTableCellItem(f);
  }));
  a.style.position = 'relative';
  a.style.whiteSpace = 'nowrap';
  a.style.overflow = 'hidden';
  a.style.width = '30px';
  a.innerHTML = '<div class="geSprite geSprite-table"></div>';
  this.appendDropDownImageHtml(a);
  a.getElementsByTagName('div')[0].style.marginLeft = '-2px';
  EditorUi.compactUi && (a.getElementsByTagName('img')[0].style.left = '22px', a.getElementsByTagName('img')[0].style.top = '5px');
  var b = this.editorUi.menus.get('insert');
  null != b && 'function' === typeof a.setEnabled && b.addListener('stateChanged', function() {
    a.setEnabled(b.enabled);
  });
  return a;
};
Toolbar.prototype.addDropDownArrow = function(a, b, f, e, g, d, h, n) {
  g = EditorUi.compactUi ? g : n;
  a.style.whiteSpace = 'nowrap';
  a.style.overflow = 'hidden';
  a.style.position = 'relative';
  a.style.width = e - (null != h ? h : 32) + 'px';
  a.innerHTML = '<div class="geSprite ' + b + '"></div>';
  this.appendDropDownImageHtml(a);
  b = a.getElementsByTagName('div')[0];
  b.style.marginLeft = g + 'px';
  b.style.marginTop = d + 'px';
  EditorUi.compactUi && (a.getElementsByTagName('img')[0].style.left = '24px', a.getElementsByTagName('img')[0].style.top = '5px', a.style.width = f - 10 + 'px');
};
Toolbar.prototype.setFontName = function(a) {
  if (null != this.fontMenu) {
    this.fontMenu.innerText = '';
    var b = document.createElement('div');
    b.style.display = 'inline-block';
    b.style.overflow = 'hidden';
    b.style.textOverflow = 'ellipsis';
    b.style.maxWidth = '66px';
    mxUtils.write(b, a);
    this.fontMenu.appendChild(b);
    this.appendDropDownImageHtml(this.fontMenu);
  }
};
Toolbar.prototype.setFontSize = function(a) {
  if (null != this.sizeMenu) {
    this.sizeMenu.innerText = '';
    var b = document.createElement('div');
    b.style.display = 'inline-block';
    b.style.overflow = 'hidden';
    b.style.textOverflow = 'ellipsis';
    b.style.maxWidth = '24px';
    mxUtils.write(b, a);
    this.sizeMenu.appendChild(b);
    this.appendDropDownImageHtml(this.sizeMenu);
  }
};
Toolbar.prototype.createTextToolbar = function() {
  var a = this.editorUi,
    b = a.editor.graph,
    f = this.addMenu('', mxResources.get('style'), !0, 'formatBlock');
  f.style.position = 'relative';
  f.style.whiteSpace = 'nowrap';
  f.style.overflow = 'hidden';
  f.innerHTML = mxResources.get('style');
  this.appendDropDownImageHtml(f);
  EditorUi.compactUi && (f.style.paddingRight = '18px', f.getElementsByTagName('img')[0].style.right = '1px', f.getElementsByTagName('img')[0].style.top = '5px');
  this.addSeparator();
  this.fontMenu = this.addMenu('', mxResources.get('fontFamily'), !0, 'fontFamily');
  this.fontMenu.style.position = 'relative';
  this.fontMenu.style.whiteSpace = 'nowrap';
  this.fontMenu.style.overflow = 'hidden';
  this.fontMenu.style.width = '68px';
  this.setFontName(Menus.prototype.defaultFont);
  EditorUi.compactUi && (this.fontMenu.style.paddingRight = '18px', this.fontMenu.getElementsByTagName('img')[0].style.right = '1px', this.fontMenu.getElementsByTagName('img')[0].style.top = '5px');
  this.addSeparator();
  this.sizeMenu = this.addMenu(Menus.prototype.defaultFontSize, mxResources.get('fontSize'), !0, 'fontSize');
  this.sizeMenu.style.position = 'relative';
  this.sizeMenu.style.whiteSpace = 'nowrap';
  this.sizeMenu.style.overflow = 'hidden';
  this.sizeMenu.style.width = '24px';
  this.setFontSize(Menus.prototype.defaultFontSize);
  EditorUi.compactUi && (this.sizeMenu.style.paddingRight = '18px', this.sizeMenu.getElementsByTagName('img')[0].style.right = '1px', this.sizeMenu.getElementsByTagName('img')[0].style.top = '5px');
  f = this.addItems('- undo redo - bold italic underline'.split(' '));
  f[1].setAttribute('title', mxResources.get('undo') + ' (' + a.actions.get('undo').shortcut + ')');
  f[2].setAttribute('title', mxResources.get('redo') + ' (' + a.actions.get('redo').shortcut + ')');
  f[4].setAttribute('title', mxResources.get('bold') + ' (' + a.actions.get('bold').shortcut + ')');
  f[5].setAttribute('title', mxResources.get('italic') + ' (' + a.actions.get('italic').shortcut + ')');
  f[6].setAttribute('title', mxResources.get('underline') + ' (' + a.actions.get('underline').shortcut + ')');
  var e = this.addMenuFunction('', mxResources.get('align'), !1, mxUtils.bind(this, function(d) {
    g = d.addItem('', null, mxUtils.bind(this, function(h) {
      b.cellEditor.alignText(mxConstants.ALIGN_LEFT, h);
      a.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ALIGN], 'values', [mxConstants.ALIGN_LEFT], 'cells', [b.cellEditor.getEditingCell()]));
    }), null, 'geIcon geSprite geSprite-left');
    g.setAttribute('title', mxResources.get('left'));
    g = d.addItem('', null, mxUtils.bind(this, function(h) {
      b.cellEditor.alignText(mxConstants.ALIGN_CENTER, h);
      a.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ALIGN], 'values', [mxConstants.ALIGN_CENTER], 'cells', [b.cellEditor.getEditingCell()]));
    }), null, 'geIcon geSprite geSprite-center');
    g.setAttribute('title', mxResources.get('center'));
    g = d.addItem('', null, mxUtils.bind(this, function(h) {
      b.cellEditor.alignText(mxConstants.ALIGN_RIGHT, h);
      a.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ALIGN], 'values', [mxConstants.ALIGN_RIGHT], 'cells', [b.cellEditor.getEditingCell()]));
    }), null, 'geIcon geSprite geSprite-right');
    g.setAttribute('title', mxResources.get('right'));
    g = d.addItem('', null, mxUtils.bind(this, function() {
      document.execCommand('justifyfull', !1, null);
    }), null, 'geIcon geSprite geSprite-justifyfull');
    g.setAttribute('title', mxResources.get('justifyfull'));
    g = d.addItem('', null, mxUtils.bind(this, function() {
      document.execCommand('insertorderedlist', !1, null);
    }), null, 'geIcon geSprite geSprite-orderedlist');
    g.setAttribute('title', mxResources.get('numberedList'));
    g = d.addItem('', null, mxUtils.bind(this, function() {
      document.execCommand('insertunorderedlist', !1, null);
    }), null, 'geIcon geSprite geSprite-unorderedlist');
    g.setAttribute('title', mxResources.get('bulletedList'));
    g = d.addItem('', null, mxUtils.bind(this, function() {
      document.execCommand('outdent', !1, null);
    }), null, 'geIcon geSprite geSprite-outdent');
    g.setAttribute('title', mxResources.get('decreaseIndent'));
    g = d.addItem('', null, mxUtils.bind(this, function() {
      document.execCommand('indent', !1, null);
    }), null, 'geIcon geSprite geSprite-indent');
    g.setAttribute('title', mxResources.get('increaseIndent'));
  }));
  e.style.position = 'relative';
  e.style.whiteSpace = 'nowrap';
  e.style.overflow = 'hidden';
  e.style.width = '30px';
  e.innerText = '';
  f = document.createElement('div');
  f.className = 'geSprite geSprite-left';
  f.style.marginLeft = '-2px';
  e.appendChild(f);
  this.appendDropDownImageHtml(e);
  EditorUi.compactUi && (e.getElementsByTagName('img')[0].style.left = '22px', e.getElementsByTagName('img')[0].style.top = '5px');
  e = this.addMenuFunction('', mxResources.get('format'), !1, mxUtils.bind(this, function(d) {
    g = d.addItem('', null, this.editorUi.actions.get('subscript').funct, null, 'geIcon geSprite geSprite-subscript');
    g.setAttribute('title', mxResources.get('subscript') + ' (' + Editor.ctrlKey + '+,)');
    g = d.addItem('', null, this.editorUi.actions.get('superscript').funct, null, 'geIcon geSprite geSprite-superscript');
    g.setAttribute('title', mxResources.get('superscript') + ' (' + Editor.ctrlKey + '+.)');
    g = d.addItem('', null, this.editorUi.actions.get('fontColor').funct, null, 'geIcon geSprite geSprite-fontcolor');
    g.setAttribute('title', mxResources.get('fontColor'));
    g = d.addItem('', null, this.editorUi.actions.get('backgroundColor').funct, null, 'geIcon geSprite geSprite-fontbackground');
    g.setAttribute('title', mxResources.get('backgroundColor'));
    g = d.addItem('', null, mxUtils.bind(this, function() {
      document.execCommand('removeformat', !1, null);
    }), null, 'geIcon geSprite geSprite-removeformat');
    g.setAttribute('title', mxResources.get('removeFormat'));
  }));
  e.style.position = 'relative';
  e.style.whiteSpace = 'nowrap';
  e.style.overflow = 'hidden';
  e.style.width = '30px';
  e.innerText = '';
  f = document.createElement('div');
  f.className = 'geSprite geSprite-dots';
  f.style.marginLeft = '-2px';
  e.appendChild(f);
  this.appendDropDownImageHtml(e);
  EditorUi.compactUi && (e.getElementsByTagName('img')[0].style.left = '22px', e.getElementsByTagName('img')[0].style.top = '5px');
  this.addSeparator();
  this.addButton('geIcon geSprite geSprite-code', mxResources.get('html'), function() {
    b.cellEditor.toggleViewMode();
    0 < b.cellEditor.textarea.innerHTML.length && ('&nbsp;' != b.cellEditor.textarea.innerHTML || !b.cellEditor.clearOnChange) && window.setTimeout(function() {
      document.execCommand('selectAll', !1, null);
    });
  });
  this.addSeparator();
  e = this.addMenuFunction('', mxResources.get('insert'), !0, mxUtils.bind(this, function(d) {
    d.addItem(mxResources.get('insertLink'), null, mxUtils.bind(this, function() {
      this.editorUi.actions.get('link').funct();
    }));
    d.addItem(mxResources.get('insertImage'), null, mxUtils.bind(this, function() {
      this.editorUi.actions.get('image').funct();
    }));
    d.addItem(mxResources.get('insertHorizontalRule'), null, mxUtils.bind(this, function() {
      document.execCommand('inserthorizontalrule', !1, null);
    }));
  }));
  e.style.whiteSpace = 'nowrap';
  e.style.overflow = 'hidden';
  e.style.position = 'relative';
  e.style.width = '16px';
  e.innerText = '';
  f = document.createElement('div');
  f.className = 'geSprite geSprite-plus';
  f.style.marginLeft = '-4px';
  f.style.marginTop = '-3px';
  e.appendChild(f);
  this.appendDropDownImageHtml(e);
  EditorUi.compactUi && (e.getElementsByTagName('img')[0].style.left = '24px', e.getElementsByTagName('img')[0].style.top = '5px', e.style.width = '30px');
  this.addSeparator();
  var g = this.addMenuFunction('geIcon geSprite geSprite-table', mxResources.get('table'), !1, mxUtils.bind(this, function(d) {
    var h = b.getSelectedElement(),
      n = b.getParentByNames(h, [
        'TD',
        'TH'
      ], b.cellEditor.text2),
      u = b.getParentByName(h, 'TR', b.cellEditor.text2);
    if (null == u)
      this.editorUi.menus.addInsertTableItem(d);
    else {
      var m = b.getParentByName(u, 'TABLE', b.cellEditor.text2);
      h = d.addItem('', null, mxUtils.bind(this, function() {
        try {
          b.selectNode(b.insertColumn(m, null != n ? n.cellIndex : 0));
        } catch (p) {
          this.editorUi.handleError(p);
        }
      }), null, 'geIcon geSprite geSprite-insertcolumnbefore');
      h.setAttribute('title', mxResources.get('insertColumnBefore'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        try {
          b.selectNode(b.insertColumn(m, null != n ? n.cellIndex + 1 : -1));
        } catch (p) {
          this.editorUi.handleError(p);
        }
      }), null, 'geIcon geSprite geSprite-insertcolumnafter');
      h.setAttribute('title', mxResources.get('insertColumnAfter'));
      h = d.addItem('Delete column', null, mxUtils.bind(this, function() {
        if (null != n)
          try {
            b.deleteColumn(m, n.cellIndex);
          } catch (p) {
            this.editorUi.handleError(p);
          }
      }), null, 'geIcon geSprite geSprite-deletecolumn');
      h.setAttribute('title', mxResources.get('deleteColumn'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        try {
          b.selectNode(b.insertRow(m, u.sectionRowIndex));
        } catch (p) {
          this.editorUi.handleError(p);
        }
      }), null, 'geIcon geSprite geSprite-insertrowbefore');
      h.setAttribute('title', mxResources.get('insertRowBefore'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        try {
          b.selectNode(b.insertRow(m, u.sectionRowIndex + 1));
        } catch (p) {
          this.editorUi.handleError(p);
        }
      }), null, 'geIcon geSprite geSprite-insertrowafter');
      h.setAttribute('title', mxResources.get('insertRowAfter'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        try {
          b.deleteRow(m, u.sectionRowIndex);
        } catch (p) {
          this.editorUi.handleError(p);
        }
      }), null, 'geIcon geSprite geSprite-deleterow');
      h.setAttribute('title', mxResources.get('deleteRow'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        var p = m.style.borderColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function(x, A, C, D) {
          return '#' + ('0' + Number(A).toString(16)).substr(-2) + ('0' + Number(C).toString(16)).substr(-2) + ('0' + Number(D).toString(16)).substr(-2);
        });
        this.editorUi.pickColor(p, function(x) {
          null == x || x == mxConstants.NONE ? (m.removeAttribute('border'), m.style.border = '', m.style.borderCollapse = '') : (m.setAttribute('border', '1'), m.style.border = '1px solid ' + x, m.style.borderCollapse = 'collapse');
        });
      }), null, 'geIcon geSprite geSprite-strokecolor');
      h.setAttribute('title', mxResources.get('borderColor'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        var p = m.style.backgroundColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function(x, A, C, D) {
          return '#' + ('0' + Number(A).toString(16)).substr(-2) + ('0' + Number(C).toString(16)).substr(-2) + ('0' + Number(D).toString(16)).substr(-2);
        });
        this.editorUi.pickColor(p, function(x) {
          m.style.backgroundColor = null == x || x == mxConstants.NONE ? '' : x;
        });
      }), null, 'geIcon geSprite geSprite-fillcolor');
      h.setAttribute('title', mxResources.get('backgroundColor'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        var p = m.getAttribute('cellPadding') || 0;
        p = new FilenameDialog(this.editorUi, p, mxResources.get('apply'), mxUtils.bind(this, function(x) {
          null != x && 0 < x.length ? m.setAttribute('cellPadding', x) : m.removeAttribute('cellPadding');
        }), mxResources.get('spacing'));
        this.editorUi.showDialog(p.container, 300, 80, !0, !0);
        p.init();
      }), null, 'geIcon geSprite geSprite-fit');
      h.setAttribute('title', mxResources.get('spacing'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        m.setAttribute('align', 'left');
      }), null, 'geIcon geSprite geSprite-left');
      h.setAttribute('title', mxResources.get('left'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        m.setAttribute('align', 'center');
      }), null, 'geIcon geSprite geSprite-center');
      h.setAttribute('title', mxResources.get('center'));
      h = d.addItem('', null, mxUtils.bind(this, function() {
        m.setAttribute('align', 'right');
      }), null, 'geIcon geSprite geSprite-right');
      h.setAttribute('title', mxResources.get('right'));
    }
  }));
  g.style.position = 'relative';
  g.style.whiteSpace = 'nowrap';
  g.style.overflow = 'hidden';
  g.style.width = '30px';
  g.innerText = '';
  f = document.createElement('div');
  f.className = 'geSprite geSprite-table';
  f.style.marginLeft = '-2px';
  g.appendChild(f);
  this.appendDropDownImageHtml(g);
  EditorUi.compactUi && (g.getElementsByTagName('img')[0].style.left = '22px', g.getElementsByTagName('img')[0].style.top = '5px');
};
Toolbar.prototype.hideMenu = function() {
  this.editorUi.hideCurrentMenu();
};
Toolbar.prototype.addMenu = function(a, b, f, e, g, d, h) {
  var n = this.editorUi.menus.get(e),
    u = this.addMenuFunction(a, b, f, function() {
      n.funct.apply(n, arguments);
    }, g, d);
  h || 'function' !== typeof u.setEnabled || n.addListener('stateChanged', function() {
    u.setEnabled(n.enabled);
  });
  return u;
};
Toolbar.prototype.addMenuFunction = function(a, b, f, e, g, d) {
  return this.addMenuFunctionInContainer(null != g ? g : this.container, a, b, f, e, d);
};
Toolbar.prototype.addMenuFunctionInContainer = function(a, b, f, e, g, d) {
  b = e ? this.createLabel(b) : this.createButton(b);
  this.initElement(b, f);
  this.addMenuHandler(b, e, g, d);
  a.appendChild(b);
  return b;
};
Toolbar.prototype.addSeparator = function(a) {
  a = null != a ? a : this.container;
  var b = document.createElement('div');
  b.className = 'geSeparator';
  a.appendChild(b);
  return b;
};
Toolbar.prototype.addItems = function(a, b, f) {
  for (var e = [], g = 0; g < a.length; g++) {
    var d = a[g];
    '-' == d ? e.push(this.addSeparator(b)) : e.push(this.addItem('geSprite-' + d.toLowerCase(), d, b, f));
  }
  return e;
};
Toolbar.prototype.addItem = function(a, b, f, e) {
  var g = this.editorUi.actions.get(b),
    d = null;
  null != g && (b = g.label, null != g.shortcut && (b += ' (' + g.shortcut + ')'), d = this.addButton(a, b, g.funct, f), e || 'function' !== typeof d.setEnabled || (d.setEnabled(g.enabled), g.addListener('stateChanged', function() {
    d.setEnabled(g.enabled);
  })));
  return d;
};
Toolbar.prototype.addButton = function(a, b, f, e) {
  a = this.createButton(a);
  e = null != e ? e : this.container;
  this.initElement(a, b);
  this.addClickHandler(a, f);
  e.appendChild(a);
  return a;
};
Toolbar.prototype.initElement = function(a, b) {
  null != b && a.setAttribute('title', b);
  this.addEnabledState(a);
};
Toolbar.prototype.addEnabledState = function(a) {
  var b = a.className;
  a.setEnabled = function(f) {
    a.enabled = f;
    a.className = f ? b : b + ' mxDisabled';
  };
  a.setEnabled(!0);
};
Toolbar.prototype.addClickHandler = function(a, b) {
  null != b && (mxEvent.addListener(a, 'click', function(f) {
    a.enabled && b(f);
    mxEvent.consume(f);
  }), mxEvent.addListener(a, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(f) {
    f.preventDefault();
  })));
};
Toolbar.prototype.createButton = function(a) {
  var b = document.createElement('a');
  b.className = 'geButton';
  var f = document.createElement('div');
  null != a && (f.className = 'geSprite ' + a);
  b.appendChild(f);
  return b;
};
Toolbar.prototype.createLabel = function(a, b) {
  b = document.createElement('a');
  b.className = 'geLabel';
  mxUtils.write(b, a);
  return b;
};
Toolbar.prototype.addMenuHandler = function(a, b, f, e) {
  if (null != f) {
    var g = this.editorUi.editor.graph,
      d = null,
      h = !0;
    mxEvent.addListener(a, 'click', mxUtils.bind(this, function(n) {
      if (h && (null == a.enabled || a.enabled)) {
        g.popupMenuHandler.hideMenu();
        d = new mxPopupMenu(f);
        d.smartSeparators = !0;
        d.div.className += ' geToolbarMenu';
        d.showDisabled = e;
        d.labels = b;
        d.autoExpand = !0;
        !b && d.div.scrollHeight > d.div.clientHeight && (d.div.style.width = '40px');
        d.hideMenu = mxUtils.bind(this, function() {
          mxPopupMenu.prototype.hideMenu.apply(d, arguments);
          this.editorUi.resetCurrentMenu();
          d.destroy();
        });
        var u = mxUtils.getOffset(a);
        d.popup(u.x, u.y + a.offsetHeight, null, n);
        this.editorUi.setCurrentMenu(d, a);
      }
      h = !0;
      mxEvent.consume(n);
    }));
    mxEvent.addListener(a, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(n) {
      h = null == d || null == d.div || null == d.div.parentNode;
      n.preventDefault();
    }));
  }
};
Toolbar.prototype.destroy = function() {
  null != this.gestureHandler && (mxEvent.removeGestureListeners(document, this.gestureHandler), this.gestureHandler = null);
};