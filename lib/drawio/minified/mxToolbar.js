function mxToolbar(a) {
  this.container = a;
}
mxToolbar.prototype = new mxEventSource();
mxToolbar.prototype.constructor = mxToolbar;
mxToolbar.prototype.container = null;
mxToolbar.prototype.enabled = !0;
mxToolbar.prototype.noReset = !1;
mxToolbar.prototype.updateDefaultMode = !0;
mxToolbar.prototype.addItem = function(a, b, c, d, e, f) {
  var g = document.createElement(null != b ? 'img' : 'button'),
    k = e || (null != f ? 'mxToolbarMode' : 'mxToolbarItem');
  g.className = k;
  g.setAttribute('src', b);
  null != a && (null != b ? g.setAttribute('title', a) : mxUtils.write(g, a));
  this.container.appendChild(g);
  null != c && (mxEvent.addListener(g, 'click', c), mxClient.IS_TOUCH && mxEvent.addListener(g, 'touchend', c));
  a = mxUtils.bind(this, function(l) {
    null != d ? g.setAttribute('src', b) : g.style.backgroundColor = '';
  });
  mxEvent.addGestureListeners(g, mxUtils.bind(this, function(l) {
    null != d ? g.setAttribute('src', d) : g.style.backgroundColor = 'gray';
    if (null != f) {
      null == this.menu && (this.menu = new mxPopupMenu(), this.menu.init());
      var m = this.currentImg;
      this.menu.isMenuShowing() && this.menu.hideMenu();
      m != g && (this.currentImg = g, this.menu.factoryMethod = f, m = new mxPoint(g.offsetLeft, g.offsetTop + g.offsetHeight), this.menu.popup(m.x, m.y, null, l), this.menu.isMenuShowing() && (g.className = k + 'Selected', this.menu.hideMenu = function() {
        mxPopupMenu.prototype.hideMenu.apply(this);
        g.className = k;
        this.currentImg = null;
      }));
    }
  }), null, a);
  mxEvent.addListener(g, 'mouseout', a);
  return g;
};
mxToolbar.prototype.addCombo = function(a) {
  var b = document.createElement('div');
  b.style.display = 'inline';
  b.className = 'mxToolbarComboContainer';
  var c = document.createElement('select');
  c.className = a || 'mxToolbarCombo';
  b.appendChild(c);
  this.container.appendChild(b);
  return c;
};
mxToolbar.prototype.addActionCombo = function(a, b) {
  var c = document.createElement('select');
  c.className = b || 'mxToolbarCombo';
  this.addOption(c, a, null);
  mxEvent.addListener(c, 'change', function(d) {
    var e = c.options[c.selectedIndex];
    c.selectedIndex = 0;
    null != e.funct && e.funct(d);
  });
  this.container.appendChild(c);
  return c;
};
mxToolbar.prototype.addOption = function(a, b, c) {
  var d = document.createElement('option');
  mxUtils.writeln(d, b);
  'function' == typeof c ? d.funct = c : d.setAttribute('value', c);
  a.appendChild(d);
  return d;
};
mxToolbar.prototype.addSwitchMode = function(a, b, c, d, e) {
  var f = document.createElement('img');
  f.initialClassName = e || 'mxToolbarMode';
  f.className = f.initialClassName;
  f.setAttribute('src', b);
  f.altIcon = d;
  null != a && f.setAttribute('title', a);
  mxEvent.addListener(f, 'click', mxUtils.bind(this, function(g) {
    g = this.selectedMode.altIcon;
    null != g ? (this.selectedMode.altIcon = this.selectedMode.getAttribute('src'), this.selectedMode.setAttribute('src', g)) : this.selectedMode.className = this.selectedMode.initialClassName;
    this.updateDefaultMode && (this.defaultMode = f);
    this.selectedMode = f;
    g = f.altIcon;
    null != g ? (f.altIcon = f.getAttribute('src'), f.setAttribute('src', g)) : f.className = f.initialClassName + 'Selected';
    this.fireEvent(new mxEventObject(mxEvent.SELECT));
    c();
  }));
  this.container.appendChild(f);
  null == this.defaultMode && (this.defaultMode = f, this.selectMode(f), c());
  return f;
};
mxToolbar.prototype.addMode = function(a, b, c, d, e, f) {
  f = null != f ? f : !0;
  var g = document.createElement(null != b ? 'img' : 'button');
  g.initialClassName = e || 'mxToolbarMode';
  g.className = g.initialClassName;
  g.setAttribute('src', b);
  g.altIcon = d;
  null != a && g.setAttribute('title', a);
  this.enabled && f && (mxEvent.addListener(g, 'click', mxUtils.bind(this, function(k) {
    this.selectMode(g, c);
    this.noReset = !1;
  })), mxEvent.addListener(g, 'dblclick', mxUtils.bind(this, function(k) {
    this.selectMode(g, c);
    this.noReset = !0;
  })), null == this.defaultMode && (this.defaultMode = g, this.defaultFunction = c, this.selectMode(g, c)));
  this.container.appendChild(g);
  return g;
};
mxToolbar.prototype.selectMode = function(a, b) {
  if (this.selectedMode != a) {
    if (null != this.selectedMode) {
      var c = this.selectedMode.altIcon;
      null != c ? (this.selectedMode.altIcon = this.selectedMode.getAttribute('src'), this.selectedMode.setAttribute('src', c)) : this.selectedMode.className = this.selectedMode.initialClassName;
    }
    this.selectedMode = a;
    c = this.selectedMode.altIcon;
    null != c ? (this.selectedMode.altIcon = this.selectedMode.getAttribute('src'), this.selectedMode.setAttribute('src', c)) : this.selectedMode.className = this.selectedMode.initialClassName + 'Selected';
    this.fireEvent(new mxEventObject(mxEvent.SELECT, 'function', b));
  }
};
mxToolbar.prototype.resetMode = function(a) {
  !a && this.noReset || this.selectedMode == this.defaultMode || this.selectMode(this.defaultMode, this.defaultFunction);
};
mxToolbar.prototype.addSeparator = function(a) {
  return this.addItem(null, a, null);
};
mxToolbar.prototype.addBreak = function() {
  mxUtils.br(this.container);
};
mxToolbar.prototype.addLine = function() {
  var a = document.createElement('hr');
  a.style.marginRight = '6px';
  a.setAttribute('size', '1');
  this.container.appendChild(a);
};
mxToolbar.prototype.destroy = function() {
  mxEvent.release(this.container);
  this.selectedMode = this.defaultFunction = this.defaultMode = this.container = null;
  null != this.menu && this.menu.destroy();
};