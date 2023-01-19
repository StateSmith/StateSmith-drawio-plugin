function mxCodec(a) {
  this.document = a || mxUtils.createXmlDocument();
  this.objects = [];
}
mxCodec.allowlist = null;
mxCodec.prototype.document = null;
mxCodec.prototype.objects = null;
mxCodec.prototype.elements = null;
mxCodec.prototype.encodeDefaults = !1;
mxCodec.prototype.putObject = function(a, b) {
  return this.objects[a] = b;
};
mxCodec.prototype.getObject = function(a) {
  var b = null;
  null != a && (b = this.objects[a], null == b && (b = this.lookup(a), null == b && (a = this.getElementById(a), null != a && (b = this.decode(a)))));
  return b;
};
mxCodec.prototype.lookup = function(a) {
  return null;
};
mxCodec.prototype.getElementById = function(a) {
  this.updateElements();
  return this.elements[a];
};
mxCodec.prototype.updateElements = function() {
  null == this.elements && (this.elements = {}, null != this.document.documentElement && this.addElement(this.document.documentElement));
};
mxCodec.prototype.addElement = function(a) {
  if (a.nodeType == mxConstants.NODETYPE_ELEMENT) {
    var b = a.getAttribute('id');
    if (null != b)
      if (null == this.elements[b])
        this.elements[b] = a;
      else if (this.elements[b] != a)
      throw Error(b + ': Duplicate ID');
  }
  for (a = a.firstChild; null != a;)
    this.addElement(a), a = a.nextSibling;
};
mxCodec.prototype.getId = function(a) {
  var b = null;
  null != a && (b = this.reference(a), null == b && a instanceof mxCell && (b = a.getId(), null == b && (b = mxCellPath.create(a), 0 == b.length && (b = 'root'))));
  return b;
};
mxCodec.prototype.reference = function(a) {
  return null;
};
mxCodec.prototype.encode = function(a) {
  var b = null;
  if (null != a && null != a.constructor) {
    var c = mxCodecRegistry.getCodec(a.constructor);
    null != c ? b = c.encode(this, a) : mxUtils.isNode(a) ? b = mxUtils.importNode(this.document, a, !0) : mxLog.warn('mxCodec.encode: No codec for ' + mxUtils.getFunctionName(a.constructor));
  }
  return b;
};
mxCodec.prototype.decode = function(a, b) {
  this.updateElements();
  var c = null;
  null != a && a.nodeType == mxConstants.NODETYPE_ELEMENT && (c = this.getConstructor(a.nodeName), c = mxCodecRegistry.getCodec(c), null != c ? c = c.decode(this, a, b) : (c = a.cloneNode(!0), c.removeAttribute('as')));
  return c;
};
mxCodec.prototype.getConstructor = function(a) {
  var b = null;
  try {
    null == mxCodec.allowlist || 0 <= mxUtils.indexOf(mxCodec.allowlist, a) ? b = window[a] : null != window.console && console.error('mxCodec.getConstructor: ' + a + ' not allowed in mxCodec.allowlist');
  } catch (c) {}
  return b;
};
mxCodec.prototype.encodeCell = function(a, b, c) {
  b.appendChild(this.encode(a));
  if (null == c || c) {
    c = a.getChildCount();
    for (var d = 0; d < c; d++)
      this.encodeCell(a.getChildAt(d), b);
  }
};
mxCodec.prototype.isCellCodec = function(a) {
  return null != a && 'function' == typeof a.isCellCodec ? a.isCellCodec() : !1;
};
mxCodec.prototype.decodeCell = function(a, b) {
  b = null != b ? b : !0;
  var c = null;
  if (null != a && a.nodeType == mxConstants.NODETYPE_ELEMENT) {
    c = mxCodecRegistry.getCodec(a.nodeName);
    if (!this.isCellCodec(c))
      for (var d = a.firstChild; null != d && !this.isCellCodec(c);)
        c = mxCodecRegistry.getCodec(d.nodeName), d = d.nextSibling;
    this.isCellCodec(c) || (c = mxCodecRegistry.getCodec(mxCell));
    c = c.decode(this, a);
    b && this.insertIntoGraph(c);
  }
  return c;
};
mxCodec.prototype.insertIntoGraph = function(a) {
  var b = a.parent,
    c = a.getTerminal(!0),
    d = a.getTerminal(!1);
  a.setTerminal(null, !1);
  a.setTerminal(null, !0);
  a.parent = null;
  if (null != b) {
    if (b == a)
      throw Error(b.id + ': Self Reference');
    b.insert(a);
  }
  null != c && c.insertEdge(a, !0);
  null != d && d.insertEdge(a, !1);
};
mxCodec.prototype.setAttribute = function(a, b, c) {
  null != b && null != c && a.setAttribute(b, c);
};