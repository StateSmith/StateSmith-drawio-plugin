var mxLog = {
  consoleName: 'Console',
  TRACE: !1,
  DEBUG: !0,
  WARN: !0,
  buffer: '',
  init: function() {
    if (null == mxLog.window && null != document.body) {
      var a = mxLog.consoleName + ' - mxGraph ' + mxClient.VERSION,
        b = document.createElement('table');
      b.setAttribute('width', '100%');
      b.setAttribute('height', '100%');
      var c = document.createElement('tbody'),
        d = document.createElement('tr'),
        e = document.createElement('td');
      e.style.verticalAlign = 'top';
      mxLog.textarea = document.createElement('textarea');
      mxLog.textarea.setAttribute('wrap', 'off');
      mxLog.textarea.setAttribute('readOnly', 'true');
      mxLog.textarea.style.height = '100%';
      mxLog.textarea.style.resize = 'none';
      mxLog.textarea.value = mxLog.buffer;
      mxLog.textarea.style.width = mxClient.IS_NS && 'BackCompat' != document.compatMode ? '99%' : '100%';
      e.appendChild(mxLog.textarea);
      d.appendChild(e);
      c.appendChild(d);
      d = document.createElement('tr');
      mxLog.td = document.createElement('td');
      mxLog.td.style.verticalAlign = 'top';
      mxLog.td.setAttribute('height', '30px');
      d.appendChild(mxLog.td);
      c.appendChild(d);
      b.appendChild(c);
      mxLog.addButton('Info', function(g) {
        mxLog.info();
      });
      mxLog.addButton('DOM', function(g) {
        g = mxUtils.getInnerHtml(document.body);
        mxLog.debug(g);
      });
      mxLog.addButton('Trace', function(g) {
        mxLog.TRACE = !mxLog.TRACE;
        mxLog.TRACE ? mxLog.debug('Tracing enabled') : mxLog.debug('Tracing disabled');
      });
      mxLog.addButton('Copy', function(g) {
        try {
          mxUtils.copy(mxLog.textarea.value);
        } catch (k) {
          mxUtils.alert(k);
        }
      });
      mxLog.addButton('Show', function(g) {
        try {
          mxUtils.popup(mxLog.textarea.value);
        } catch (k) {
          mxUtils.alert(k);
        }
      });
      mxLog.addButton('Clear', function(g) {
        mxLog.textarea.value = '';
      });
      d = c = 0;
      'number' === typeof window.innerWidth ? (c = window.innerHeight, d = window.innerWidth) : (c = document.documentElement.clientHeight || document.body.clientHeight, d = document.body.clientWidth);
      mxLog.window = new mxWindow(a, b, Math.max(0, d - 320), Math.max(0, c - 210), 300, 160);
      mxLog.window.setMaximizable(!0);
      mxLog.window.setScrollable(!1);
      mxLog.window.setResizable(!0);
      mxLog.window.setClosable(!0);
      mxLog.window.destroyOnClose = !1;
      if ((mxClient.IS_NS || mxClient.IS_IE) && !mxClient.IS_GC && !mxClient.IS_SF && 'BackCompat' != document.compatMode || 11 == document.documentMode) {
        var f = mxLog.window.getElement();
        a = function(g, k) {
          mxLog.textarea.style.height = Math.max(0, f.offsetHeight - 70) + 'px';
        };
        mxLog.window.addListener(mxEvent.RESIZE_END, a);
        mxLog.window.addListener(mxEvent.MAXIMIZE, a);
        mxLog.window.addListener(mxEvent.NORMALIZE, a);
        mxLog.textarea.style.height = '92px';
      }
    }
  },
  info: function() {
    mxLog.writeln(mxUtils.toString(navigator));
  },
  addButton: function(a, b) {
    var c = document.createElement('button');
    mxUtils.write(c, a);
    mxEvent.addListener(c, 'click', b);
    mxLog.td.appendChild(c);
  },
  isVisible: function() {
    return null != mxLog.window ? mxLog.window.isVisible() : !1;
  },
  show: function() {
    mxLog.setVisible(!0);
  },
  setVisible: function(a) {
    null == mxLog.window && mxLog.init();
    null != mxLog.window && mxLog.window.setVisible(a);
  },
  enter: function(a) {
    if (mxLog.TRACE)
      return mxLog.writeln('Entering ' + a), new Date().getTime();
  },
  leave: function(a, b) {
    mxLog.TRACE && (b = 0 != b ? ' (' + (new Date().getTime() - b) + ' ms)' : '', mxLog.writeln('Leaving ' + a + b));
  },
  debug: function() {
    mxLog.DEBUG && mxLog.writeln.apply(this, arguments);
  },
  warn: function() {
    mxLog.WARN && mxLog.writeln.apply(this, arguments);
  },
  write: function() {
    for (var a = '', b = 0; b < arguments.length; b++)
      a += arguments[b], b < arguments.length - 1 && (a += ' ');
    null != mxLog.textarea ? (mxLog.textarea.value += a, null != navigator.userAgent && 0 <= navigator.userAgent.indexOf('Presto/2.5') && (mxLog.textarea.style.visibility = 'hidden', mxLog.textarea.style.visibility = 'visible'), mxLog.textarea.scrollTop = mxLog.textarea.scrollHeight) : mxLog.buffer += a;
  },
  writeln: function() {
    for (var a = '', b = 0; b < arguments.length; b++)
      a += arguments[b], b < arguments.length - 1 && (a += ' ');
    mxLog.write(a + '\n');
  }
};