function mxWindow(a, b, c, d, e, f, g, k, l, m) {
  null != b && (g = null != g ? g : !0, this.content = b, this.init(c, d, e, f, m), this.installMaximizeHandler(), this.installMinimizeHandler(), this.installCloseHandler(), this.setMinimizable(g), this.setTitle(a), (null == k || k) && this.installMoveHandler(), null != l && null != l.parentNode ? l.parentNode.replaceChild(this.div, l) : document.body.appendChild(this.div));
}
mxWindow.prototype = new mxEventSource();
mxWindow.prototype.constructor = mxWindow;
mxWindow.prototype.closeImage = mxClient.imageBasePath + '/close.gif';
mxWindow.prototype.minimizeImage = mxClient.imageBasePath + '/minimize.gif';
mxWindow.prototype.normalizeImage = mxClient.imageBasePath + '/normalize.gif';
mxWindow.prototype.maximizeImage = mxClient.imageBasePath + '/maximize.gif';
mxWindow.prototype.resizeImage = mxClient.imageBasePath + '/resize.gif';
mxWindow.prototype.visible = !1;
mxWindow.prototype.minimumSize = new mxRectangle(0, 0, 50, 40);
mxWindow.prototype.destroyOnClose = !0;
mxWindow.prototype.contentHeightCorrection = 8 == document.documentMode || 7 == document.documentMode ? 6 : 2;
mxWindow.prototype.title = null;
mxWindow.prototype.content = null;
mxWindow.prototype.init = function(a, b, c, d, e) {
  e = null != e ? e : 'mxWindow';
  this.div = document.createElement('div');
  this.div.className = e;
  this.div.style.left = a + 'px';
  this.div.style.top = b + 'px';
  this.table = document.createElement('table');
  this.table.className = e;
  mxClient.IS_POINTER && (this.div.style.touchAction = 'none');
  null != c && (this.div.style.width = c + 'px', this.table.style.width = c + 'px');
  null != d && (this.div.style.height = d + 'px', this.table.style.height = d + 'px');
  a = document.createElement('tbody');
  b = document.createElement('tr');
  this.title = document.createElement('td');
  this.title.className = e + 'Title';
  this.buttons = document.createElement('div');
  this.buttons.style.position = 'absolute';
  this.buttons.style.display = 'inline-block';
  this.buttons.style.right = '4px';
  this.buttons.style.top = '5px';
  this.title.appendChild(this.buttons);
  b.appendChild(this.title);
  a.appendChild(b);
  b = document.createElement('tr');
  this.td = document.createElement('td');
  this.td.className = e + 'Pane';
  7 == document.documentMode && (this.td.style.height = '100%');
  this.contentWrapper = document.createElement('div');
  this.contentWrapper.className = e + 'Pane';
  this.contentWrapper.style.width = '100%';
  this.contentWrapper.appendChild(this.content);
  'DIV' != this.content.nodeName.toUpperCase() && (this.contentWrapper.style.height = '100%');
  this.td.appendChild(this.contentWrapper);
  b.appendChild(this.td);
  a.appendChild(b);
  this.table.appendChild(a);
  this.div.appendChild(this.table);
  e = mxUtils.bind(this, function(f) {
    this.activate();
  });
  mxEvent.addGestureListeners(this.title, e);
  mxEvent.addGestureListeners(this.table, e);
  this.hide();
};
mxWindow.prototype.setTitle = function(a) {
  for (var b = this.title.firstChild; null != b;) {
    var c = b.nextSibling;
    b.nodeType == mxConstants.NODETYPE_TEXT && b.parentNode.removeChild(b);
    b = c;
  }
  mxUtils.write(this.title, a || '');
  this.title.appendChild(this.buttons);
};
mxWindow.prototype.setScrollable = function(a) {
  if (null == navigator.userAgent || 0 > navigator.userAgent.indexOf('Presto/2.5'))
    this.contentWrapper.style.overflow = a ? 'auto' : 'hidden';
};
mxWindow.prototype.activate = function() {
  if (mxWindow.activeWindow != this) {
    var a = mxUtils.getCurrentStyle(this.getElement());
    a = null != a ? a.zIndex : 3;
    if (mxWindow.activeWindow) {
      var b = mxWindow.activeWindow.getElement();
      null != b && null != b.style && (b.style.zIndex = a);
    }
    b = mxWindow.activeWindow;
    this.getElement().style.zIndex = parseInt(a) + 1;
    mxWindow.activeWindow = this;
    this.fireEvent(new mxEventObject(mxEvent.ACTIVATE, 'previousWindow', b));
  }
};
mxWindow.prototype.getElement = function() {
  return this.div;
};
mxWindow.prototype.fit = function() {
  mxUtils.fit(this.div);
};
mxWindow.prototype.isResizable = function() {
  return null != this.resize ? 'none' != this.resize.style.display : !1;
};
mxWindow.prototype.setResizable = function(a) {
  if (a)
    if (null == this.resize) {
      this.resize = document.createElement('img');
      this.resize.style.position = 'absolute';
      this.resize.style.bottom = '0px';
      this.resize.style.right = '0px';
      this.resize.style.zIndex = '2';
      this.resize.setAttribute('src', this.resizeImage);
      this.resize.style.cursor = 'nwse-resize';
      var b = null,
        c = null,
        d = null,
        e = null;
      a = mxUtils.bind(this, function(k) {
        this.activate();
        b = mxEvent.getClientX(k);
        c = mxEvent.getClientY(k);
        d = this.div.offsetWidth;
        e = this.div.offsetHeight;
        mxEvent.addGestureListeners(document, null, f, g);
        this.fireEvent(new mxEventObject(mxEvent.RESIZE_START, 'event', k));
        mxEvent.consume(k);
      });
      var f = mxUtils.bind(this, function(k) {
          if (null != b && null != c) {
            var l = mxEvent.getClientX(k) - b,
              m = mxEvent.getClientY(k) - c;
            this.setSize(d + l, e + m);
            this.fireEvent(new mxEventObject(mxEvent.RESIZE, 'event', k));
            mxEvent.consume(k);
          }
        }),
        g = mxUtils.bind(this, function(k) {
          null != b && null != c && (c = b = null, mxEvent.removeGestureListeners(document, null, f, g), this.fireEvent(new mxEventObject(mxEvent.RESIZE_END, 'event', k)), mxEvent.consume(k));
        });
      mxEvent.addGestureListeners(this.resize, a, f, g);
      this.div.appendChild(this.resize);
    } else
      this.resize.style.display = 'inline';
  else
    null != this.resize && (this.resize.style.display = 'none');
};
mxWindow.prototype.setSize = function(a, b) {
  a = Math.max(this.minimumSize.width, a);
  b = Math.max(this.minimumSize.height, b);
  this.div.style.width = a + 'px';
  this.div.style.height = b + 'px';
  this.table.style.width = a + 'px';
  this.table.style.height = b + 'px';
  this.contentWrapper.style.height = this.div.offsetHeight - this.title.offsetHeight - this.contentHeightCorrection + 'px';
};
mxWindow.prototype.setMinimizable = function(a) {
  this.minimizeImg.style.display = a ? '' : 'none';
};
mxWindow.prototype.getMinimumSize = function() {
  return new mxRectangle(0, 0, 0, this.title.offsetHeight);
};
mxWindow.prototype.toggleMinimized = function(a) {
  this.activate();
  if (this.minimized)
    this.minimized = !1, this.minimizeImg.setAttribute('src', this.minimizeImage), this.minimizeImg.setAttribute('title', 'Minimize'), this.contentWrapper.style.display = '', this.maximize.style.display = this.maxDisplay, this.div.style.height = this.height, this.table.style.height = this.height, null != this.resize && (this.resize.style.visibility = ''), this.fireEvent(new mxEventObject(mxEvent.NORMALIZE, 'event', a));
  else {
    this.minimized = !0;
    this.minimizeImg.setAttribute('src', this.normalizeImage);
    this.minimizeImg.setAttribute('title', 'Normalize');
    this.contentWrapper.style.display = 'none';
    this.maxDisplay = this.maximize.style.display;
    this.maximize.style.display = 'none';
    this.height = this.table.style.height;
    var b = this.getMinimumSize();
    0 < b.height && (this.div.style.height = b.height + 'px', this.table.style.height = b.height + 'px');
    0 < b.width && (this.div.style.width = b.width + 'px', this.table.style.width = b.width + 'px');
    null != this.resize && (this.resize.style.visibility = 'hidden');
    this.fireEvent(new mxEventObject(mxEvent.MINIMIZE, 'event', a));
  }
};
mxWindow.prototype.installMinimizeHandler = function() {
  this.minimizeImg = document.createElement('img');
  this.minimizeImg.setAttribute('src', this.minimizeImage);
  this.minimizeImg.setAttribute('title', 'Minimize');
  this.minimizeImg.style.cursor = 'pointer';
  this.minimizeImg.style.marginLeft = '2px';
  this.minimizeImg.style.display = 'none';
  this.buttons.appendChild(this.minimizeImg);
  this.minimized = !1;
  this.height = this.maxDisplay = null;
  var a = mxUtils.bind(this, function(b) {
    this.toggleMinimized(b);
    mxEvent.consume(b);
  });
  mxEvent.addGestureListeners(this.minimizeImg, a);
};
mxWindow.prototype.setMaximizable = function(a) {
  this.maximize.style.display = a ? '' : 'none';
};
mxWindow.prototype.installMaximizeHandler = function() {
  this.maximize = document.createElement('img');
  this.maximize.setAttribute('src', this.maximizeImage);
  this.maximize.setAttribute('title', 'Maximize');
  this.maximize.style.cursor = 'default';
  this.maximize.style.marginLeft = '2px';
  this.maximize.style.cursor = 'pointer';
  this.maximize.style.display = 'none';
  this.buttons.appendChild(this.maximize);
  var a = !1,
    b = null,
    c = null,
    d = null,
    e = null,
    f = null,
    g = mxUtils.bind(this, function(k) {
      this.activate();
      if ('none' != this.maximize.style.display) {
        if (a) {
          a = !1;
          this.maximize.setAttribute('src', this.maximizeImage);
          this.maximize.setAttribute('title', 'Maximize');
          this.contentWrapper.style.display = '';
          this.minimizeImg.style.display = f;
          this.div.style.left = b + 'px';
          this.div.style.top = c + 'px';
          this.div.style.height = d;
          this.div.style.width = e;
          l = mxUtils.getCurrentStyle(this.contentWrapper);
          if ('auto' == l.overflow || null != this.resize)
            this.contentWrapper.style.height = this.div.offsetHeight - this.title.offsetHeight - this.contentHeightCorrection + 'px';
          this.table.style.height = d;
          this.table.style.width = e;
          null != this.resize && (this.resize.style.visibility = '');
          this.fireEvent(new mxEventObject(mxEvent.NORMALIZE, 'event', k));
        } else {
          a = !0;
          this.maximize.setAttribute('src', this.normalizeImage);
          this.maximize.setAttribute('title', 'Normalize');
          this.contentWrapper.style.display = '';
          f = this.minimizeImg.style.display;
          this.minimizeImg.style.display = 'none';
          b = parseInt(this.div.style.left);
          c = parseInt(this.div.style.top);
          d = this.table.style.height;
          e = this.table.style.width;
          this.div.style.left = '0px';
          this.div.style.top = '0px';
          l = Math.max(document.body.clientHeight || 0, document.documentElement.clientHeight || 0);
          this.div.style.width = document.body.clientWidth - 2 + 'px';
          this.div.style.height = l - 2 + 'px';
          this.table.style.width = document.body.clientWidth - 2 + 'px';
          this.table.style.height = l - 2 + 'px';
          null != this.resize && (this.resize.style.visibility = 'hidden');
          var l = mxUtils.getCurrentStyle(this.contentWrapper);
          if ('auto' == l.overflow || null != this.resize)
            this.contentWrapper.style.height = this.div.offsetHeight - this.title.offsetHeight - this.contentHeightCorrection + 'px';
          this.fireEvent(new mxEventObject(mxEvent.MAXIMIZE, 'event', k));
        }
        mxEvent.consume(k);
      }
    });
  mxEvent.addGestureListeners(this.maximize, g);
  mxEvent.addListener(this.title, 'dblclick', g);
};
mxWindow.prototype.installMoveHandler = function() {
  this.title.style.cursor = 'move';
  mxEvent.addGestureListeners(this.title, mxUtils.bind(this, function(a) {
    var b = mxEvent.getClientX(a),
      c = mxEvent.getClientY(a),
      d = this.getX(),
      e = this.getY(),
      f = mxUtils.bind(this, function(k) {
        var l = mxEvent.getClientX(k) - b,
          m = mxEvent.getClientY(k) - c;
        this.setLocation(d + l, e + m);
        this.fireEvent(new mxEventObject(mxEvent.MOVE, 'event', k));
        mxEvent.consume(k);
      }),
      g = mxUtils.bind(this, function(k) {
        mxEvent.removeGestureListeners(document, null, f, g);
        this.fireEvent(new mxEventObject(mxEvent.MOVE_END, 'event', k));
        mxEvent.consume(k);
      });
    mxEvent.addGestureListeners(document, null, f, g);
    this.fireEvent(new mxEventObject(mxEvent.MOVE_START, 'event', a));
    mxEvent.consume(a);
  }));
  mxClient.IS_POINTER && (this.title.style.touchAction = 'none');
};
mxWindow.prototype.setLocation = function(a, b) {
  this.div.style.left = a + 'px';
  this.div.style.top = b + 'px';
};
mxWindow.prototype.getX = function() {
  return parseInt(this.div.style.left);
};
mxWindow.prototype.getY = function() {
  return parseInt(this.div.style.top);
};
mxWindow.prototype.installCloseHandler = function() {
  this.closeImg = document.createElement('img');
  this.closeImg.setAttribute('src', this.closeImage);
  this.closeImg.setAttribute('title', 'Close');
  this.closeImg.style.marginLeft = '2px';
  this.closeImg.style.cursor = 'pointer';
  this.closeImg.style.display = 'none';
  this.buttons.appendChild(this.closeImg);
  mxEvent.addGestureListeners(this.closeImg, mxUtils.bind(this, function(a) {
    this.fireEvent(new mxEventObject(mxEvent.CLOSE, 'event', a));
    this.destroyOnClose ? this.destroy() : this.setVisible(!1);
    mxEvent.consume(a);
  }));
};
mxWindow.prototype.setImage = function(a) {
  this.image = document.createElement('img');
  this.image.setAttribute('src', a);
  this.image.setAttribute('align', 'left');
  this.image.style.marginRight = '4px';
  this.image.style.marginLeft = '0px';
  this.image.style.marginTop = '-2px';
  this.title.insertBefore(this.image, this.title.firstChild);
};
mxWindow.prototype.setClosable = function(a) {
  this.closeImg.style.display = a ? '' : 'none';
};
mxWindow.prototype.isVisible = function() {
  return null != this.div ? 'none' != this.div.style.display : !1;
};
mxWindow.prototype.setVisible = function(a) {
  null != this.div && (this.isVisible() != a ? a ? this.show() : this.hide() : this.fireEvent(new mxEventObject(a ? mxEvent.SHOW : mxEvent.HIDE)));
};
mxWindow.prototype.show = function() {
  this.div.style.display = '';
  this.activate();
  'auto' != mxUtils.getCurrentStyle(this.contentWrapper).overflow && null == this.resize || 'none' == this.contentWrapper.style.display || (this.contentWrapper.style.height = this.div.offsetHeight - this.title.offsetHeight - this.contentHeightCorrection + 'px');
  this.fireEvent(new mxEventObject(mxEvent.SHOW));
};
mxWindow.prototype.hide = function() {
  this.div.style.display = 'none';
  this.fireEvent(new mxEventObject(mxEvent.HIDE));
};
mxWindow.prototype.destroy = function() {
  this.fireEvent(new mxEventObject(mxEvent.DESTROY));
  null != this.div && (mxEvent.release(this.div), this.div.parentNode.removeChild(this.div), this.div = null);
  this.contentWrapper = this.content = this.title = null;
};