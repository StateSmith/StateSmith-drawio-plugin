function mxPopupMenu(a) {
  this.factoryMethod = a;
  null != a && this.init();
}
mxPopupMenu.prototype = new mxEventSource();
mxPopupMenu.prototype.constructor = mxPopupMenu;
mxPopupMenu.prototype.submenuImage = mxClient.imageBasePath + '/submenu.gif';
mxPopupMenu.prototype.zIndex = 10006;
mxPopupMenu.prototype.factoryMethod = null;
mxPopupMenu.prototype.useLeftButtonForPopup = !1;
mxPopupMenu.prototype.enabled = !0;
mxPopupMenu.prototype.itemCount = 0;
mxPopupMenu.prototype.autoExpand = !1;
mxPopupMenu.prototype.smartSeparators = !1;
mxPopupMenu.prototype.labels = !0;
mxPopupMenu.prototype.init = function() {
  this.table = document.createElement('table');
  this.table.className = 'mxPopupMenu';
  this.tbody = document.createElement('tbody');
  this.table.appendChild(this.tbody);
  this.div = document.createElement('div');
  this.div.className = 'mxPopupMenu';
  this.div.style.display = 'inline';
  this.div.style.zIndex = this.zIndex;
  this.div.appendChild(this.table);
  mxEvent.disableContextMenu(this.div);
};
mxPopupMenu.prototype.isEnabled = function() {
  return this.enabled;
};
mxPopupMenu.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxPopupMenu.prototype.isPopupTrigger = function(a) {
  return a.isPopupTrigger() || this.useLeftButtonForPopup && mxEvent.isLeftMouseButton(a.getEvent());
};
mxPopupMenu.prototype.addItem = function(a, b, c, d, e, f, g, k) {
  d = d || this;
  this.itemCount++;
  d.willAddSeparator && (d.containsItems && this.addSeparator(d, !0), d.willAddSeparator = !1);
  d.containsItems = !0;
  var l = document.createElement('tr');
  l.className = 'mxPopupMenuItem';
  var m = document.createElement('td');
  m.className = 'mxPopupMenuIcon';
  null != b ? (e = document.createElement('img'), e.src = b, m.appendChild(e)) : null != e && (b = document.createElement('div'), b.className = e, m.appendChild(b));
  l.appendChild(m);
  this.labels && (m = document.createElement('td'), m.className = 'mxPopupMenuItem' + (null == f || f ? '' : ' mxDisabled'), mxUtils.write(m, a), m.align = 'left', l.appendChild(m), a = document.createElement('td'), a.className = 'mxPopupMenuItem' + (null == f || f ? '' : ' mxDisabled'), a.style.paddingRight = '6px', a.style.textAlign = 'right', l.appendChild(a), null == d.div && this.createSubmenu(d));
  d.tbody.appendChild(l);
  if (0 != g && 0 != f) {
    var n = null;
    mxEvent.addGestureListeners(l, mxUtils.bind(this, function(p) {
      this.eventReceiver = l;
      d.activeRow != l && d.activeRow != d && (null != d.activeRow && null != d.activeRow.div.parentNode && this.hideSubmenu(d), null != l.div && (this.showSubmenu(d, l), d.activeRow = l));
      null != document.selection && 8 == document.documentMode && (n = document.selection.createRange());
      mxEvent.consume(p);
    }), mxUtils.bind(this, function(p) {
      d.activeRow != l && d.activeRow != d && (null != d.activeRow && null != d.activeRow.div.parentNode && this.hideSubmenu(d), this.autoExpand && null != l.div && (this.showSubmenu(d, l), d.activeRow = l));
      k || (l.className = 'mxPopupMenuItemHover');
    }), mxUtils.bind(this, function(p) {
      if (this.eventReceiver == l) {
        d.activeRow != l && this.hideMenu();
        if (null != n) {
          try {
            n.select();
          } catch (r) {}
          n = null;
        }
        null != c && c(p);
      }
      this.eventReceiver = null;
      mxEvent.consume(p);
    }));
    k || mxEvent.addListener(l, 'mouseout', mxUtils.bind(this, function(p) {
      l.className = 'mxPopupMenuItem';
    }));
  }
  return l;
};
mxPopupMenu.prototype.addCheckmark = function(a, b) {
  a = a.firstChild.nextSibling;
  a.style.backgroundImage = 'url(\'' + b + '\')';
  a.style.backgroundRepeat = 'no-repeat';
  a.style.backgroundPosition = '2px 50%';
};
mxPopupMenu.prototype.createSubmenu = function(a) {
  a.table = document.createElement('table');
  a.table.className = 'mxPopupMenu';
  a.tbody = document.createElement('tbody');
  a.table.appendChild(a.tbody);
  a.div = document.createElement('div');
  a.div.className = 'mxPopupMenu';
  a.div.style.position = 'absolute';
  a.div.style.display = 'inline';
  a.div.style.zIndex = this.zIndex;
  a.div.appendChild(a.table);
  var b = document.createElement('img');
  b.setAttribute('src', this.submenuImage);
  td = a.firstChild.nextSibling.nextSibling;
  td.appendChild(b);
};
mxPopupMenu.prototype.showSubmenu = function(a, b) {
  if (null != b.div) {
    b.div.style.left = a.div.offsetLeft + b.offsetLeft + b.offsetWidth - 1 + 'px';
    b.div.style.top = a.div.offsetTop + b.offsetTop + 'px';
    document.body.appendChild(b.div);
    var c = parseInt(b.div.offsetLeft),
      d = parseInt(b.div.offsetWidth),
      e = mxUtils.getDocumentScrollOrigin(document),
      f = document.documentElement;
    c + d > e.x + (document.body.clientWidth || f.clientWidth) && (b.div.style.left = Math.max(0, a.div.offsetLeft - d + (mxClient.IS_IE ? 6 : -6)) + 'px');
    b.div.style.overflowY = 'auto';
    b.div.style.overflowX = 'hidden';
    b.div.style.maxHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight) - 10 + 'px';
    mxUtils.fit(b.div);
  }
};
mxPopupMenu.prototype.addSeparator = function(a, b) {
  a = a || this;
  if (this.smartSeparators && !b)
    a.willAddSeparator = !0;
  else if (null != a.tbody) {
    a.willAddSeparator = !1;
    b = document.createElement('tr');
    var c = document.createElement('td');
    c.className = 'mxPopupMenuIcon';
    c.style.padding = '0 0 0 0px';
    b.appendChild(c);
    c = document.createElement('td');
    c.style.padding = '0 0 0 0px';
    c.setAttribute('colSpan', '2');
    var d = document.createElement('hr');
    d.setAttribute('size', '1');
    c.appendChild(d);
    b.appendChild(c);
    a.tbody.appendChild(b);
  }
};
mxPopupMenu.prototype.popup = function(a, b, c, d) {
  if (null != this.div && null != this.tbody && null != this.factoryMethod) {
    this.div.style.left = a + 'px';
    for (this.div.style.top = b + 'px'; null != this.tbody.firstChild;)
      mxEvent.release(this.tbody.firstChild), this.tbody.removeChild(this.tbody.firstChild);
    this.itemCount = 0;
    this.factoryMethod(this, c, d);
    0 < this.itemCount && (this.showMenu(), this.fireEvent(new mxEventObject(mxEvent.SHOW)));
  }
};
mxPopupMenu.prototype.isMenuShowing = function() {
  return null != this.div && this.div.parentNode == document.body;
};
mxPopupMenu.prototype.showMenu = function() {
  9 <= document.documentMode && (this.div.style.filter = 'none');
  document.body.appendChild(this.div);
  mxUtils.fit(this.div);
};
mxPopupMenu.prototype.hideMenu = function() {
  null != this.div && (null != this.div.parentNode && this.div.parentNode.removeChild(this.div), this.hideSubmenu(this), this.containsItems = !1, this.fireEvent(new mxEventObject(mxEvent.HIDE)));
};
mxPopupMenu.prototype.hideSubmenu = function(a) {
  null != a.activeRow && (this.hideSubmenu(a.activeRow), null != a.activeRow.div.parentNode && a.activeRow.div.parentNode.removeChild(a.activeRow.div), a.activeRow = null);
};
mxPopupMenu.prototype.destroy = function() {
  null != this.div && (mxEvent.release(this.div), null != this.div.parentNode && this.div.parentNode.removeChild(this.div), this.div = null);
};