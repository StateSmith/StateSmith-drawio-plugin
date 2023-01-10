function mxObjectCodec(a, b, c, d) {
  this.template = a;
  this.exclude = null != b ? b : [];
  this.idrefs = null != c ? c : [];
  this.mapping = null != d ? d : [];
  this.reverse = {};
  for (var e in this.mapping)
    this.reverse[this.mapping[e]] = e;
}
mxObjectCodec.allowEval = !1;
mxObjectCodec.prototype.template = null;
mxObjectCodec.prototype.exclude = null;
mxObjectCodec.prototype.idrefs = null;
mxObjectCodec.prototype.mapping = null;
mxObjectCodec.prototype.reverse = null;
mxObjectCodec.prototype.getName = function() {
  return mxUtils.getFunctionName(this.template.constructor);
};
mxObjectCodec.prototype.cloneTemplate = function() {
  return new this.template.constructor();
};
mxObjectCodec.prototype.getFieldName = function(a) {
  if (null != a) {
    var b = this.reverse[a];
    null != b && (a = b);
  }
  return a;
};
mxObjectCodec.prototype.getAttributeName = function(a) {
  if (null != a) {
    var b = this.mapping[a];
    null != b && (a = b);
  }
  return a;
};
mxObjectCodec.prototype.isExcluded = function(a, b, c, d) {
  return b == mxObjectIdentity.FIELD_NAME || 0 <= mxUtils.indexOf(this.exclude, b);
};
mxObjectCodec.prototype.isReference = function(a, b, c, d) {
  return 0 <= mxUtils.indexOf(this.idrefs, b);
};
mxObjectCodec.prototype.encode = function(a, b) {
  var c = a.document.createElement(this.getName());
  b = this.beforeEncode(a, b, c);
  this.encodeObject(a, b, c);
  return this.afterEncode(a, b, c);
};
mxObjectCodec.prototype.encodeObject = function(a, b, c) {
  a.setAttribute(c, 'id', a.getId(b));
  for (var d in b) {
    var e = d,
      f = b[e];
    null == f || this.isExcluded(b, e, f, !0) || (mxUtils.isInteger(e) && (e = null), this.encodeValue(a, b, e, f, c));
  }
};
mxObjectCodec.prototype.encodeValue = function(a, b, c, d, e) {
  if (null != d) {
    if (this.isReference(b, c, d, !0)) {
      var f = a.getId(d);
      if (null == f) {
        mxLog.warn('mxObjectCodec.encode: No ID for ' + this.getName() + '.' + c + '=' + d);
        return;
      }
      d = f;
    }
    f = this.template[c];
    if (null == c || a.encodeDefaults || f != d)
      c = this.getAttributeName(c), this.writeAttribute(a, b, c, d, e);
  }
};
mxObjectCodec.prototype.writeAttribute = function(a, b, c, d, e) {
  'object' != typeof d ? this.writePrimitiveAttribute(a, b, c, d, e) : this.writeComplexAttribute(a, b, c, d, e);
};
mxObjectCodec.prototype.writePrimitiveAttribute = function(a, b, c, d, e) {
  d = this.convertAttributeToXml(a, b, c, d, e);
  null == c ? (b = a.document.createElement('add'), 'function' == typeof d ? b.appendChild(a.document.createTextNode(d)) : a.setAttribute(b, 'value', d), e.appendChild(b)) : 'function' != typeof d && a.setAttribute(e, c, d);
};
mxObjectCodec.prototype.writeComplexAttribute = function(a, b, c, d, e) {
  a = a.encode(d);
  null != a ? (null != c && a.setAttribute('as', c), e.appendChild(a)) : mxLog.warn('mxObjectCodec.encode: No node for ' + this.getName() + '.' + c + ': ' + d);
};
mxObjectCodec.prototype.convertAttributeToXml = function(a, b, c, d) {
  this.isBooleanAttribute(a, b, c, d) && (d = 1 == d ? '1' : '0');
  return d;
};
mxObjectCodec.prototype.isBooleanAttribute = function(a, b, c, d) {
  return 'undefined' == typeof d.length && (1 == d || 0 == d);
};
mxObjectCodec.prototype.convertAttributeFromXml = function(a, b, c) {
  var d = b.value;
  this.isNumericAttribute(a, b, c) && (d = parseFloat(d), isNaN(d) || !isFinite(d)) && (d = 0);
  return d;
};
mxObjectCodec.prototype.isNumericAttribute = function(a, b, c) {
  return c.constructor == mxGeometry && ('x' == b.name || 'y' == b.name || 'width' == b.name || 'height' == b.name) || c.constructor == mxPoint && ('x' == b.name || 'y' == b.name) || mxUtils.isNumeric(b.value);
};
mxObjectCodec.prototype.beforeEncode = function(a, b, c) {
  return b;
};
mxObjectCodec.prototype.afterEncode = function(a, b, c) {
  return c;
};
mxObjectCodec.prototype.decode = function(a, b, c) {
  var d = b.getAttribute('id'),
    e = a.objects[d];
  null == e && (e = c || this.cloneTemplate(), null != d && a.putObject(d, e));
  b = this.beforeDecode(a, b, e);
  this.decodeNode(a, b, e);
  return this.afterDecode(a, b, e);
};
mxObjectCodec.prototype.decodeNode = function(a, b, c) {
  null != b && (this.decodeAttributes(a, b, c), this.decodeChildren(a, b, c));
};
mxObjectCodec.prototype.decodeAttributes = function(a, b, c) {
  b = b.attributes;
  if (null != b)
    for (var d = 0; d < b.length; d++)
      this.decodeAttribute(a, b[d], c);
};
mxObjectCodec.prototype.isIgnoredAttribute = function(a, b, c) {
  return 'as' == b.nodeName || 'id' == b.nodeName || 'function' === typeof c[b.nodeName];
};
mxObjectCodec.prototype.decodeAttribute = function(a, b, c) {
  if (!this.isIgnoredAttribute(a, b, c)) {
    var d = b.nodeName;
    b = this.convertAttributeFromXml(a, b, c);
    var e = this.getFieldName(d);
    if (this.isReference(c, e, b, !1)) {
      a = a.getObject(b);
      if (null == a) {
        mxLog.warn('mxObjectCodec.decode: No object for ' + this.getName() + '.' + d + '=' + b);
        return;
      }
      b = a;
    }
    this.isExcluded(c, d, b, !1) || (c[d] = b);
  }
};
mxObjectCodec.prototype.decodeChildren = function(a, b, c) {
  for (b = b.firstChild; null != b;) {
    var d = b.nextSibling;
    b.nodeType != mxConstants.NODETYPE_ELEMENT || this.processInclude(a, b, c) || this.decodeChild(a, b, c);
    b = d;
  }
};
mxObjectCodec.prototype.decodeChild = function(a, b, c) {
  var d = this.getFieldName(b.getAttribute('as'));
  if (null == d || !this.isExcluded(c, d, b, !1)) {
    var e = this.getFieldTemplate(c, d, b);
    'add' == b.nodeName ? (a = b.getAttribute('value'), null == a && mxObjectCodec.allowEval && (a = mxUtils.eval(mxUtils.getTextContent(b)))) : a = a.decode(b, e);
    try {
      this.addObjectValue(c, d, a, e);
    } catch (f) {
      throw Error(f.message + ' for ' + b.nodeName);
    }
  }
};
mxObjectCodec.prototype.getFieldTemplate = function(a, b, c) {
  a = a[b];
  a instanceof Array && 0 < a.length && (a = null);
  return a;
};
mxObjectCodec.prototype.addObjectValue = function(a, b, c, d) {
  null != c && c != d && (null != b && 0 < b.length ? a[b] = c : a.push(c));
};
mxObjectCodec.prototype.processInclude = function(a, b, c) {
  if ('include' == b.nodeName) {
    b = b.getAttribute('name');
    if (null != b)
      try {
        var d = mxUtils.load(b).getDocumentElement();
        null != d && a.decode(d, c);
      } catch (e) {}
    return !0;
  }
  return !1;
};
mxObjectCodec.prototype.beforeDecode = function(a, b, c) {
  return b;
};
mxObjectCodec.prototype.afterDecode = function(a, b, c) {
  return c;
};
mxCodecRegistry.register(function() {
  var a = new mxObjectCodec(new mxCell(), [
    'children',
    'edges',
    'overlays',
    'mxTransient'
  ], [
    'parent',
    'source',
    'target'
  ]);
  a.isCellCodec = function() {
    return !0;
  };
  a.isNumericAttribute = function(b, c, d) {
    return 'value' !== c.nodeName && mxObjectCodec.prototype.isNumericAttribute.apply(this, arguments);
  };
  a.isExcluded = function(b, c, d, e) {
    return mxObjectCodec.prototype.isExcluded.apply(this, arguments) || e && 'value' == c && mxUtils.isNode(d);
  };
  a.afterEncode = function(b, c, d) {
    if (null != c.value && mxUtils.isNode(c.value)) {
      var e = d;
      d = mxUtils.importNode(b.document, c.value, !0);
      d.appendChild(e);
      b = e.getAttribute('id');
      d.setAttribute('id', b);
      e.removeAttribute('id');
    }
    return d;
  };
  a.beforeDecode = function(b, c, d) {
    var e = c.cloneNode(!0),
      f = this.getName();
    c.nodeName != f ? (e = c.getElementsByTagName(f)[0], null != e && e.parentNode == c ? (mxUtils.removeWhitespace(e, !0), mxUtils.removeWhitespace(e, !1), e.parentNode.removeChild(e)) : e = null, d.value = c.cloneNode(!0), c = d.value.getAttribute('id'), null != c && (d.setId(c), d.value.removeAttribute('id'))) : d.setId(c.getAttribute('id'));
    if (null != e)
      for (c = 0; c < this.idrefs.length; c++) {
        f = this.idrefs[c];
        var g = e.getAttribute(f);
        if (null != g) {
          e.removeAttribute(f);
          var k = b.objects[g] || b.lookup(g);
          null == k && (g = b.getElementById(g), null != g && (k = (mxCodecRegistry.codecs[g.nodeName] || this).decode(b, g)));
          d[f] = k;
        }
      }
    return e;
  };
  return a;
}());
mxCodecRegistry.register(function() {
  var a = new mxObjectCodec(new mxGraphModel());
  a.encodeObject = function(b, c, d) {
    var e = b.document.createElement('root');
    b.encodeCell(c.getRoot(), e);
    d.appendChild(e);
  };
  a.decodeChild = function(b, c, d) {
    'root' == c.nodeName ? this.decodeRoot(b, c, d) : mxObjectCodec.prototype.decodeChild.apply(this, arguments);
  };
  a.decodeRoot = function(b, c, d) {
    var e = null;
    for (c = c.firstChild; null != c;) {
      var f = b.decodeCell(c);
      null != f && null == f.getParent() && (e = f);
      c = c.nextSibling;
    }
    null != e && d.setRoot(e);
  };
  return a;
}());
mxCodecRegistry.register(function() {
  var a = new mxObjectCodec(new mxRootChange(), [
    'model',
    'previous',
    'root'
  ]);
  a.afterEncode = function(b, c, d) {
    b.encodeCell(c.root, d);
    return d;
  };
  a.beforeDecode = function(b, c, d) {
    if (null != c.firstChild && c.firstChild.nodeType == mxConstants.NODETYPE_ELEMENT) {
      c = c.cloneNode(!0);
      var e = c.firstChild;
      d.root = b.decodeCell(e, !1);
      d = e.nextSibling;
      e.parentNode.removeChild(e);
      for (e = d; null != e;)
        d = e.nextSibling, b.decodeCell(e), e.parentNode.removeChild(e), e = d;
    }
    return c;
  };
  a.afterDecode = function(b, c, d) {
    d.previous = d.root;
    return d;
  };
  return a;
}());
mxCodecRegistry.register(function() {
  var a = new mxObjectCodec(new mxChildChange(), [
    'model',
    'child',
    'previousIndex'
  ], [
    'parent',
    'previous'
  ]);
  a.isReference = function(b, c, d, e) {
    return 'child' != c || e && !b.model.contains(b.previous) ? 0 <= mxUtils.indexOf(this.idrefs, c) : !0;
  };
  a.isExcluded = function(b, c, d, e) {
    return mxObjectCodec.prototype.isExcluded.apply(this, arguments) || e && null != d && ('previous' == c || 'parent' == c) && !b.model.contains(d);
  };
  a.afterEncode = function(b, c, d) {
    this.isReference(c, 'child', c.child, !0) ? d.setAttribute('child', b.getId(c.child)) : b.encodeCell(c.child, d);
    return d;
  };
  a.beforeDecode = function(b, c, d) {
    if (null != c.firstChild && c.firstChild.nodeType == mxConstants.NODETYPE_ELEMENT) {
      c = c.cloneNode(!0);
      var e = c.firstChild;
      d.child = b.decodeCell(e, !1);
      d = e.nextSibling;
      e.parentNode.removeChild(e);
      for (e = d; null != e;) {
        d = e.nextSibling;
        if (e.nodeType == mxConstants.NODETYPE_ELEMENT) {
          var f = e.getAttribute('id');
          null == b.lookup(f) && b.decodeCell(e);
        }
        e.parentNode.removeChild(e);
        e = d;
      }
    } else
      e = c.getAttribute('child'), d.child = b.getObject(e);
    return c;
  };
  a.afterDecode = function(b, c, d) {
    null != d.child && (null != d.child.parent && null != d.previous && d.child.parent != d.previous && (d.previous = d.child.parent), d.child.parent = d.previous, d.previous = d.parent, d.previousIndex = d.index);
    return d;
  };
  return a;
}());
mxCodecRegistry.register(function() {
  var a = new mxObjectCodec(new mxTerminalChange(), [
    'model',
    'previous'
  ], [
    'cell',
    'terminal'
  ]);
  a.afterDecode = function(b, c, d) {
    d.previous = d.terminal;
    return d;
  };
  return a;
}());