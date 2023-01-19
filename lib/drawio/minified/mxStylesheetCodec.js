var mxStylesheetCodec = mxCodecRegistry.register(function() {
  var a = new mxObjectCodec(new mxStylesheet());
  a.encode = function(b, c) {
    var d = b.document.createElement(this.getName()),
      e;
    for (e in c.styles) {
      var f = c.styles[e],
        g = b.document.createElement('add');
      if (null != e) {
        g.setAttribute('as', e);
        for (var k in f) {
          var l = this.getStringValue(k, f[k]);
          if (null != l) {
            var m = b.document.createElement('add');
            m.setAttribute('value', l);
            m.setAttribute('as', k);
            g.appendChild(m);
          }
        }
        0 < g.childNodes.length && d.appendChild(g);
      }
    }
    return d;
  };
  a.getStringValue = function(b, c) {
    b = typeof c;
    'function' == b ? c = mxStyleRegistry.getName(c) : 'object' == b && (c = null);
    return c;
  };
  a.decode = function(b, c, d) {
    d = d || new this.template.constructor();
    var e = c.getAttribute('id');
    null != e && (b.objects[e] = d);
    for (c = c.firstChild; null != c;) {
      if (!this.processInclude(b, c, d) && 'add' == c.nodeName && (e = c.getAttribute('as'), null != e)) {
        var f = c.getAttribute('extend'),
          g = null != f ? mxUtils.clone(d.styles[f]) : null;
        null == g && (null != f && mxLog.warn('mxStylesheetCodec.decode: stylesheet ' + f + ' not found to extend'), g = {});
        for (f = c.firstChild; null != f;) {
          if (f.nodeType == mxConstants.NODETYPE_ELEMENT) {
            var k = f.getAttribute('as');
            if ('add' == f.nodeName) {
              var l = mxUtils.getTextContent(f);
              null != l && 0 < l.length && mxStylesheetCodec.allowEval ? l = mxUtils.eval(l) : (l = f.getAttribute('value'), mxUtils.isNumeric(l) && (l = parseFloat(l)));
              null != l && (g[k] = l);
            } else
              'remove' == f.nodeName && delete g[k];
          }
          f = f.nextSibling;
        }
        d.putCellStyle(e, g);
      }
      c = c.nextSibling;
    }
    return d;
  };
  return a;
}());
mxStylesheetCodec.allowEval = !1;