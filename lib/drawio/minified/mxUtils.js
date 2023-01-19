var mxUtils = {
  errorResource: 'none' != mxClient.language ? 'error' : '',
  closeResource: 'none' != mxClient.language ? 'close' : '',
  errorImage: mxClient.imageBasePath + '/error.gif',
  removeCursors: function(a) {
    null != a.style && (a.style.cursor = '');
    a = a.childNodes;
    if (null != a)
      for (var b = a.length, c = 0; c < b; c += 1)
        mxUtils.removeCursors(a[c]);
  },
  getCurrentStyle: function() {
    return mxClient.IS_IE && (null == document.documentMode || 9 > document.documentMode) ? function(a) {
      return null != a ? a.currentStyle : null;
    } : function(a) {
      return null != a ? window.getComputedStyle(a, '') : null;
    };
  }(),
  parseCssNumber: function(a) {
    'thin' == a ? a = '2' : 'medium' == a ? a = '4' : 'thick' == a && (a = '6');
    a = parseFloat(a);
    isNaN(a) && (a = 0);
    return a;
  },
  setPrefixedStyle: function() {
    var a = null;
    mxClient.IS_OT ? a = 'O' : mxClient.IS_SF || mxClient.IS_GC ? a = 'Webkit' : mxClient.IS_MT ? a = 'Moz' : mxClient.IS_IE && 9 <= document.documentMode && 10 > document.documentMode && (a = 'ms');
    return function(b, c, d) {
      b[c] = d;
      null != a && 0 < c.length && (c = a + c.substring(0, 1).toUpperCase() + c.substring(1), b[c] = d);
    };
  }(),
  hasScrollbars: function(a) {
    a = mxUtils.getCurrentStyle(a);
    return null != a && ('scroll' == a.overflow || 'auto' == a.overflow);
  },
  bind: function(a, b) {
    return function() {
      return b.apply(a, arguments);
    };
  },
  eval: function(a) {
    var b = null;
    if (0 <= a.indexOf('function'))
      try {
        eval('var _mxJavaScriptExpression=' + a), b = _mxJavaScriptExpression, _mxJavaScriptExpression = null;
      } catch (c) {
        mxLog.warn(c.message + ' while evaluating ' + a);
      }
    else
      try {
        b = eval(a);
      } catch (c) {
        mxLog.warn(c.message + ' while evaluating ' + a);
      }
    return b;
  },
  findNode: function(a, b, c) {
    if (a.nodeType == mxConstants.NODETYPE_ELEMENT) {
      var d = a.getAttribute(b);
      if (null != d && d == c)
        return a;
    }
    for (a = a.firstChild; null != a;) {
      d = mxUtils.findNode(a, b, c);
      if (null != d)
        return d;
      a = a.nextSibling;
    }
    return null;
  },
  getFunctionName: function(a) {
    var b = null;
    null != a && (null != a.name ? b = a.name : (b = mxUtils.trim(a.toString()), /^function\s/.test(b) && (b = mxUtils.ltrim(b.substring(9)), a = b.indexOf('('), 0 < a && (b = b.substring(0, a)))));
    return b;
  },
  indexOf: function(a, b) {
    if (null != a && null != b)
      for (var c = 0; c < a.length; c++)
        if (a[c] == b)
          return c;
    return -1;
  },
  forEach: function(a, b) {
    if (null != a && null != b)
      for (var c = 0; c < a.length; c++)
        b(a[c]);
    return a;
  },
  remove: function(a, b) {
    var c = null;
    if ('object' == typeof b)
      for (var d = mxUtils.indexOf(b, a); 0 <= d;)
        b.splice(d, 1), c = a, d = mxUtils.indexOf(b, a);
    for (var e in b)
      b[e] == a && (delete b[e], c = a);
    return c;
  },
  isNode: function(a, b, c, d) {
    return null == a || a.constructor !== Element || null != b && a.nodeName.toLowerCase() != b.toLowerCase() ? !1 : null == c || a.getAttribute(c) == d;
  },
  isAncestorNode: function(a, b) {
    for (; null != b;) {
      if (b == a)
        return !0;
      b = b.parentNode;
    }
    return !1;
  },
  getChildNodes: function(a, b) {
    b = b || mxConstants.NODETYPE_ELEMENT;
    var c = [];
    for (a = a.firstChild; null != a;)
      a.nodeType == b && c.push(a), a = a.nextSibling;
    return c;
  },
  importNode: function(a, b, c) {
    return mxClient.IS_IE && (null == document.documentMode || 10 > document.documentMode) ? mxUtils.importNodeImplementation(a, b, c) : a.importNode(b, c);
  },
  importNodeImplementation: function(a, b, c) {
    switch (b.nodeType) {
      case 1:
        var d = a.createElement(b.nodeName);
        if (b.attributes && 0 < b.attributes.length)
          for (var e = 0; e < b.attributes.length; e++)
            d.setAttribute(b.attributes[e].nodeName, b.getAttribute(b.attributes[e].nodeName));
        if (c && b.childNodes && 0 < b.childNodes.length)
          for (e = 0; e < b.childNodes.length; e++)
            d.appendChild(mxUtils.importNodeImplementation(a, b.childNodes[e], c));
        return d;
      case 3:
      case 4:
      case 8:
        return a.createTextNode(null != b.nodeValue ? b.nodeValue : b.value);
    }
  },
  createXmlDocument: function() {
    var a = null;
    document.implementation && document.implementation.createDocument && (a = document.implementation.createDocument('', '', null));
    return a;
  },
  parseXml: function(a) {
    return new DOMParser().parseFromString(a, 'text/xml');
  },
  clearSelection: function() {
    return document.selection ? function() {
      document.selection.empty();
    } : window.getSelection ? function() {
      window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges();
    } : function() {};
  }(),
  removeWhitespace: function(a, b) {
    for (a = b ? a.previousSibling : a.nextSibling; null != a && a.nodeType == mxConstants.NODETYPE_TEXT;) {
      var c = b ? a.previousSibling : a.nextSibling,
        d = mxUtils.getTextContent(a);
      0 == mxUtils.trim(d).length && a.parentNode.removeChild(a);
      a = c;
    }
  },
  htmlEntities: function(a, b) {
    a = String(a || '');
    a = a.replace(/&/g, '&amp;');
    a = a.replace(/"/g, '&quot;');
    a = a.replace(/'/g, '&#39;');
    a = a.replace(/</g, '&lt;');
    a = a.replace(/>/g, '&gt;');
    if (null == b || b)
      a = a.replace(/\n/g, '&#xa;');
    return a;
  },
  decodeHtml: function(a) {
    var b = document.createElement('textarea');
    b.innerHTML = a;
    return b.value;
  },
  getXml: function(a, b) {
    var c = '';
    mxClient.IS_IE || mxClient.IS_IE11 ? c = mxUtils.getPrettyXml(a, '', '', '') : null != window.XMLSerializer ? c = new XMLSerializer().serializeToString(a) : null != a.xml && (c = a.xml.replace(/\r\n\t[\t]*/g, '').replace(/>\r\n/g, '>').replace(/\r\n/g, '\n'));
    return c.replace(/\n/g, b || '&#xa;');
  },
  getPrettyXml: function(a, b, c, d, e) {
    var f = [];
    if (null != a)
      if (b = null != b ? b : '  ', c = null != c ? c : '', d = null != d ? d : '\n', null != a.namespaceURI && a.namespaceURI != e && (e = a.namespaceURI, null == a.getAttribute('xmlns') && a.setAttribute('xmlns', a.namespaceURI)), a.nodeType == mxConstants.NODETYPE_DOCUMENT)
        f.push(mxUtils.getPrettyXml(a.documentElement, b, c, d, e));
      else if (a.nodeType == mxConstants.NODETYPE_DOCUMENT_FRAGMENT) {
      var g = a.firstChild;
      if (null != g)
        for (; null != g;)
          f.push(mxUtils.getPrettyXml(g, b, c, d, e)), g = g.nextSibling;
    } else if (a.nodeType == mxConstants.NODETYPE_COMMENT)
      a = mxUtils.getTextContent(a), 0 < a.length && f.push(c + '<!--' + a + '-->' + d);
    else if (a.nodeType == mxConstants.NODETYPE_TEXT)
      a = mxUtils.trim(mxUtils.getTextContent(a)), 0 < a.length && f.push(c + mxUtils.htmlEntities(a, !1) + d);
    else if (a.nodeType == mxConstants.NODETYPE_CDATA)
      a = mxUtils.getTextContent(a), 0 < a.length && f.push(c + '<![CDATA[' + a + ']]' + d);
    else {
      f.push(c + '<' + a.nodeName);
      g = a.attributes;
      if (null != g)
        for (var k = 0; k < g.length; k++) {
          var l = mxUtils.htmlEntities(g[k].value);
          f.push(' ' + g[k].nodeName + '="' + l + '"');
        }
      g = a.firstChild;
      if (null != g) {
        for (f.push('>' + d); null != g;)
          f.push(mxUtils.getPrettyXml(g, b, c + b, d, e)), g = g.nextSibling;
        f.push(c + '</' + a.nodeName + '>' + d);
      } else
        f.push(' />' + d);
    }
    return f.join('');
  },
  extractTextWithWhitespace: function(a) {
    function b(e) {
      if (1 != e.length || 'BR' != e[0].nodeName && '\n' != e[0].innerHTML)
        for (var f = 0; f < e.length; f++) {
          var g = e[f];
          'BR' == g.nodeName || '\n' == g.innerHTML || (1 == e.length || 0 == f) && 'DIV' == g.nodeName && '<br>' == g.innerHTML.toLowerCase() ? d.push('\n') : (3 === g.nodeType || 4 === g.nodeType ? 0 < g.nodeValue.length && d.push(g.nodeValue) : 8 !== g.nodeType && 0 < g.childNodes.length && b(g.childNodes), f < e.length - 1 && 0 <= mxUtils.indexOf(c, e[f + 1].nodeName) && d.push('\n'));
        }
    }
    var c = 'BLOCKQUOTE DIV H1 H2 H3 H4 H5 H6 OL P PRE TABLE UL'.split(' '),
      d = [];
    b(a);
    return d.join('');
  },
  replaceTrailingNewlines: function(a, b) {
    for (var c = ''; 0 < a.length && '\n' == a.charAt(a.length - 1);)
      a = a.substring(0, a.length - 1), c += b;
    return a + c;
  },
  getTextContent: function(a) {
    return mxClient.IS_IE && void 0 !== a.innerText ? a.innerText : null != a ? a[void 0 === a.textContent ? 'text' : 'textContent'] : '';
  },
  setTextContent: function(a, b) {
    void 0 !== a.innerText ? a.innerText = b : a[void 0 === a.textContent ? 'text' : 'textContent'] = b;
  },
  getInnerHtml: function() {
    return mxClient.IS_IE ? function(a) {
      return null != a ? a.innerHTML : '';
    } : function(a) {
      return null != a ? new XMLSerializer().serializeToString(a) : '';
    };
  }(),
  getOuterHtml: function() {
    return mxClient.IS_IE ? function(a) {
      if (null != a) {
        if (null != a.outerHTML)
          return a.outerHTML;
        var b = [];
        b.push('<' + a.nodeName);
        var c = a.attributes;
        if (null != c)
          for (var d = 0; d < c.length; d++) {
            var e = c[d].value;
            null != e && 0 < e.length && (b.push(' '), b.push(c[d].nodeName), b.push('="'), b.push(e), b.push('"'));
          }
        0 == a.innerHTML.length ? b.push('/>') : (b.push('>'), b.push(a.innerHTML), b.push('</' + a.nodeName + '>'));
        return b.join('');
      }
      return '';
    } : function(a) {
      return null != a ? new XMLSerializer().serializeToString(a) : '';
    };
  }(),
  write: function(a, b) {
    b = a.ownerDocument.createTextNode(b);
    null != a && a.appendChild(b);
    return b;
  },
  writeln: function(a, b) {
    b = a.ownerDocument.createTextNode(b);
    null != a && (a.appendChild(b), a.appendChild(document.createElement('br')));
    return b;
  },
  br: function(a, b) {
    b = b || 1;
    for (var c = null, d = 0; d < b; d++)
      null != a && (c = a.ownerDocument.createElement('br'), a.appendChild(c));
    return c;
  },
  button: function(a, b, c) {
    c = null != c ? c : document;
    c = c.createElement('button');
    mxUtils.write(c, a);
    mxEvent.addListener(c, 'click', function(d) {
      b(d);
    });
    return c;
  },
  para: function(a, b) {
    var c = document.createElement('p');
    mxUtils.write(c, b);
    null != a && a.appendChild(c);
    return c;
  },
  addTransparentBackgroundFilter: function(a) {
    a.style.filter += 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + mxClient.imageBasePath + '/transparent.gif\', sizingMethod=\'scale\')';
  },
  linkAction: function(a, b, c, d, e) {
    return mxUtils.link(a, b, function() {
      c.execute(d);
    }, e);
  },
  linkInvoke: function(a, b, c, d, e, f) {
    return mxUtils.link(a, b, function() {
      c[d](e);
    }, f);
  },
  link: function(a, b, c, d) {
    var e = document.createElement('span');
    e.style.color = 'blue';
    e.style.textDecoration = 'underline';
    e.style.cursor = 'pointer';
    null != d && (e.style.paddingLeft = d + 'px');
    mxEvent.addListener(e, 'click', c);
    mxUtils.write(e, b);
    null != a && a.appendChild(e);
    return e;
  },
  getDocumentSize: function() {
    var a = document.body,
      b = document.documentElement;
    try {
      return new mxRectangle(0, 0, a.clientWidth || b.clientWidth, Math.max(a.clientHeight || 0, b.clientHeight));
    } catch (c) {
      return new mxRectangle();
    }
  },
  fit: function(a) {
    var b = mxUtils.getDocumentSize(),
      c = parseInt(a.offsetLeft),
      d = parseInt(a.offsetWidth),
      e = mxUtils.getDocumentScrollOrigin(a.ownerDocument),
      f = e.x;
    e = e.y;
    var g = f + b.width;
    c + d > g && (a.style.left = Math.max(f, g - d) + 'px');
    c = parseInt(a.offsetTop);
    d = parseInt(a.offsetHeight);
    b = e + b.height;
    c + d > b && (a.style.top = Math.max(e, b - d) + 'px');
  },
  load: function(a) {
    a = new mxXmlRequest(a, null, 'GET', !1);
    a.send();
    return a;
  },
  get: function(a, b, c, d, e, f, g) {
    a = new mxXmlRequest(a, null, 'GET');
    var k = a.setRequestHeaders;
    g && (a.setRequestHeaders = function(l, m) {
      k.apply(this, arguments);
      for (var n in g)
        l.setRequestHeader(n, g[n]);
    });
    null != d && a.setBinary(d);
    a.send(b, c, e, f);
    return a;
  },
  getAll: function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = function() {
        0 == f && null != c && c();
        f++;
      }, k = 0; k < a.length; k++)
      (function(l, m) {
        mxUtils.get(l, function(n) {
          var p = n.getStatus();
          200 > p || 299 < p ? g() : (e[m] = n, d--, 0 == d && b(e));
        }, g);
      }(a[k], k));
    0 == d && b(e);
  },
  post: function(a, b, c, d) {
    return new mxXmlRequest(a, b).send(c, d);
  },
  submit: function(a, b, c, d) {
    return new mxXmlRequest(a, b).simulate(c, d);
  },
  loadInto: function(a, b, c) {
    mxClient.IS_IE ? b.onreadystatechange = function() {
      4 == b.readyState && c();
    } : b.addEventListener('load', c, !1);
    b.load(a);
  },
  getValue: function(a, b, c) {
    a = null != a ? a[b] : null;
    null == a && (a = c);
    return a;
  },
  getNumber: function(a, b, c) {
    a = null != a ? a[b] : null;
    null == a && (a = c || 0);
    return Number(a);
  },
  getColor: function(a, b, c) {
    a = null != a ? a[b] : null;
    null == a ? a = c : a == mxConstants.NONE && (a = null);
    return a;
  },
  isEmptyObject: function(a) {
    for (var b in a)
      return !1;
    return !0;
  },
  clone: function(a, b, c) {
    c = null != c ? c : !1;
    var d = null;
    if (null != a && 'function' == typeof a.constructor)
      if (a.constructor === Element)
        d = a.cloneNode(null != c ? !c : !1);
      else {
        d = new a.constructor();
        for (var e in a)
          e != mxObjectIdentity.FIELD_NAME && (null == b || 0 > mxUtils.indexOf(b, e)) && (d[e] = c || 'object' != typeof a[e] ? a[e] : mxUtils.clone(a[e]));
      }
    return d;
  },
  equalPoints: function(a, b) {
    if (null == a && null != b || null != a && null == b || null != a && null != b && a.length != b.length)
      return !1;
    if (null != a && null != b)
      for (var c = 0; c < a.length; c++)
        if (null != a[c] && null == b[c] || null == a[c] && null != b[c] || null != a[c] && null != b[c] && (a[c].x != b[c].x || a[c].y != b[c].y))
          return !1;
    return !0;
  },
  equalEntries: function(a, b) {
    var c = 0;
    if (null == a && null != b || null != a && null == b || null != a && null != b && a.length != b.length)
      return !1;
    if (null != a && null != b) {
      for (var d in b)
        c++;
      for (d in a)
        if (c--, !(mxUtils.isNaN(a[d]) && mxUtils.isNaN(b[d]) || a[d] == b[d]))
          return !1;
    }
    return 0 == c;
  },
  removeDuplicates: function(a) {
    for (var b = new mxDictionary(), c = [], d = 0; d < a.length; d++)
      b.get(a[d]) || (c.push(a[d]), b.put(a[d], !0));
    return c;
  },
  isNaN: function(a) {
    return 'number' == typeof a && isNaN(a);
  },
  extend: function(a, b) {
    var c = function() {};
    c.prototype = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
  },
  toString: function(a) {
    var b = '',
      c;
    for (c in a)
      try {
        if (null == a[c])
          b += c + ' = [null]\n';
        else if ('function' == typeof a[c])
          b += c + ' => [Function]\n';
        else if ('object' == typeof a[c]) {
          var d = mxUtils.getFunctionName(a[c].constructor);
          b += c + ' => [' + d + ']\n';
        } else
          b += c + ' = ' + a[c] + '\n';
      } catch (e) {
        b += c + '=' + e.message;
      }
    return b;
  },
  toRadians: function(a) {
    return Math.PI * a / 180;
  },
  toDegree: function(a) {
    return 180 * a / Math.PI;
  },
  arcToCurves: function(a, b, c, d, e, f, g, k, l) {
    k -= a;
    l -= b;
    if (0 === c || 0 === d)
      return E;
    c = Math.abs(c);
    d = Math.abs(d);
    var m = -k / 2,
      n = -l / 2,
      p = Math.cos(e * Math.PI / 180);
    E = Math.sin(e * Math.PI / 180);
    e = p * m + E * n;
    m = -1 * E * m + p * n;
    n = e * e;
    var r = m * m,
      q = c * c,
      t = d * d,
      u = n / q + r / t;
    1 < u ? (c *= Math.sqrt(u), d *= Math.sqrt(u), f = 0) : (u = 1, f === g && (u = -1), f = u * Math.sqrt((q * t - q * r - t * n) / (q * r + t * n)));
    n = f * c * m / d;
    r = -1 * f * d * e / c;
    k = p * n - E * r + k / 2;
    l = E * n + p * r + l / 2;
    q = Math.atan2((m - r) / d, (e - n) / c) - Math.atan2(0, 1);
    f = 0 <= q ? q : 2 * Math.PI + q;
    q = Math.atan2((-m - r) / d, (-e - n) / c) - Math.atan2((m - r) / d, (e - n) / c);
    e = 0 <= q ? q : 2 * Math.PI + q;
    0 == g && 0 < e ? e -= 2 * Math.PI : 0 != g && 0 > e && (e += 2 * Math.PI);
    g = 2 * e / Math.PI;
    g = Math.ceil(0 > g ? -1 * g : g);
    e /= g;
    m = 8 / 3 * Math.sin(e / 4) * Math.sin(e / 4) / Math.sin(e / 2);
    n = p * c;
    p *= d;
    c *= E;
    d *= E;
    var x = Math.cos(f),
      A = Math.sin(f);
    r = -m * (n * A + d * x);
    q = -m * (c * A - p * x);
    for (var E = [], C = 0; C < g; ++C) {
      f += e;
      x = Math.cos(f);
      A = Math.sin(f);
      t = n * x - d * A + k;
      u = c * x + p * A + l;
      var D = -m * (n * A + d * x);
      x = -m * (c * A - p * x);
      A = 6 * C;
      E[A] = Number(r + a);
      E[A + 1] = Number(q + b);
      E[A + 2] = Number(t - D + a);
      E[A + 3] = Number(u - x + b);
      E[A + 4] = Number(t + a);
      E[A + 5] = Number(u + b);
      r = t + D;
      q = u + x;
    }
    return E;
  },
  getBoundingBox: function(a, b, c) {
    var d = null;
    if (null != a && null != b && 0 != b) {
      b = mxUtils.toRadians(b);
      d = Math.cos(b);
      var e = Math.sin(b);
      c = null != c ? c : new mxPoint(a.x + a.width / 2, a.y + a.height / 2);
      var f = new mxPoint(a.x, a.y);
      b = new mxPoint(a.x + a.width, a.y);
      var g = new mxPoint(b.x, a.y + a.height);
      a = new mxPoint(a.x, g.y);
      f = mxUtils.getRotatedPoint(f, d, e, c);
      b = mxUtils.getRotatedPoint(b, d, e, c);
      g = mxUtils.getRotatedPoint(g, d, e, c);
      a = mxUtils.getRotatedPoint(a, d, e, c);
      d = new mxRectangle(f.x, f.y, 0, 0);
      d.add(new mxRectangle(b.x, b.y, 0, 0));
      d.add(new mxRectangle(g.x, g.y, 0, 0));
      d.add(new mxRectangle(a.x, a.y, 0, 0));
    }
    return d;
  },
  getRotatedPoint: function(a, b, c, d) {
    d = null != d ? d : new mxPoint();
    var e = a.x - d.x;
    a = a.y - d.y;
    return new mxPoint(e * b - a * c + d.x, a * b + e * c + d.y);
  },
  getPortConstraints: function(a, b, c, d) {
    b = mxUtils.getValue(a.style, mxConstants.STYLE_PORT_CONSTRAINT, mxUtils.getValue(b.style, c ? mxConstants.STYLE_SOURCE_PORT_CONSTRAINT : mxConstants.STYLE_TARGET_PORT_CONSTRAINT, null));
    if (null == b)
      return d;
    d = b.toString();
    b = mxConstants.DIRECTION_MASK_NONE;
    c = 0;
    1 == mxUtils.getValue(a.style, mxConstants.STYLE_PORT_CONSTRAINT_ROTATION, 0) && (c = mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION, 0));
    a = 0;
    45 < c ? (a = 1, 135 <= c && (a = 2)) : -45 > c && (a = 3, -135 >= c && (a = 2));
    if (0 <= d.indexOf(mxConstants.DIRECTION_NORTH))
      switch (a) {
        case 0:
          b |= mxConstants.DIRECTION_MASK_NORTH;
          break;
        case 1:
          b |= mxConstants.DIRECTION_MASK_EAST;
          break;
        case 2:
          b |= mxConstants.DIRECTION_MASK_SOUTH;
          break;
        case 3:
          b |= mxConstants.DIRECTION_MASK_WEST;
      }
    if (0 <= d.indexOf(mxConstants.DIRECTION_WEST))
      switch (a) {
        case 0:
          b |= mxConstants.DIRECTION_MASK_WEST;
          break;
        case 1:
          b |= mxConstants.DIRECTION_MASK_NORTH;
          break;
        case 2:
          b |= mxConstants.DIRECTION_MASK_EAST;
          break;
        case 3:
          b |= mxConstants.DIRECTION_MASK_SOUTH;
      }
    if (0 <= d.indexOf(mxConstants.DIRECTION_SOUTH))
      switch (a) {
        case 0:
          b |= mxConstants.DIRECTION_MASK_SOUTH;
          break;
        case 1:
          b |= mxConstants.DIRECTION_MASK_WEST;
          break;
        case 2:
          b |= mxConstants.DIRECTION_MASK_NORTH;
          break;
        case 3:
          b |= mxConstants.DIRECTION_MASK_EAST;
      }
    if (0 <= d.indexOf(mxConstants.DIRECTION_EAST))
      switch (a) {
        case 0:
          b |= mxConstants.DIRECTION_MASK_EAST;
          break;
        case 1:
          b |= mxConstants.DIRECTION_MASK_SOUTH;
          break;
        case 2:
          b |= mxConstants.DIRECTION_MASK_WEST;
          break;
        case 3:
          b |= mxConstants.DIRECTION_MASK_NORTH;
      }
    return b;
  },
  reversePortConstraints: function(a) {
    var b = (a & mxConstants.DIRECTION_MASK_WEST) << 3;
    b |= (a & mxConstants.DIRECTION_MASK_NORTH) << 1;
    b |= (a & mxConstants.DIRECTION_MASK_SOUTH) >> 1;
    return b | (a & mxConstants.DIRECTION_MASK_EAST) >> 3;
  },
  findNearestSegment: function(a, b, c) {
    var d = -1;
    if (0 < a.absolutePoints.length)
      for (var e = a.absolutePoints[0], f = null, g = 1; g < a.absolutePoints.length; g++) {
        var k = a.absolutePoints[g];
        e = mxUtils.ptSegDistSq(e.x, e.y, k.x, k.y, b, c);
        if (null == f || e < f)
          f = e, d = g - 1;
        e = k;
      }
    return d;
  },
  getDirectedBounds: function(a, b, c, d, e) {
    var f = mxUtils.getValue(c, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST);
    d = null != d ? d : mxUtils.getValue(c, mxConstants.STYLE_FLIPH, !1);
    e = null != e ? e : mxUtils.getValue(c, mxConstants.STYLE_FLIPV, !1);
    b.x = Math.round(Math.max(0, Math.min(a.width, b.x)));
    b.y = Math.round(Math.max(0, Math.min(a.height, b.y)));
    b.width = Math.round(Math.max(0, Math.min(a.width, b.width)));
    b.height = Math.round(Math.max(0, Math.min(a.height, b.height)));
    if (e && (f == mxConstants.DIRECTION_SOUTH || f == mxConstants.DIRECTION_NORTH) || d && (f == mxConstants.DIRECTION_EAST || f == mxConstants.DIRECTION_WEST))
      c = b.x, b.x = b.width, b.width = c;
    if (d && (f == mxConstants.DIRECTION_SOUTH || f == mxConstants.DIRECTION_NORTH) || e && (f == mxConstants.DIRECTION_EAST || f == mxConstants.DIRECTION_WEST))
      c = b.y, b.y = b.height, b.height = c;
    d = mxRectangle.fromRectangle(b);
    f == mxConstants.DIRECTION_SOUTH ? (d.y = b.x, d.x = b.height, d.width = b.y, d.height = b.width) : f == mxConstants.DIRECTION_WEST ? (d.y = b.height, d.x = b.width, d.width = b.x, d.height = b.y) : f == mxConstants.DIRECTION_NORTH && (d.y = b.width, d.x = b.y, d.width = b.height, d.height = b.x);
    return new mxRectangle(a.x + d.x, a.y + d.y, a.width - d.width - d.x, a.height - d.height - d.y);
  },
  getPerimeterPoint: function(a, b, c) {
    for (var d = null, e = 0; e < a.length - 1; e++) {
      var f = mxUtils.intersection(a[e].x, a[e].y, a[e + 1].x, a[e + 1].y, b.x, b.y, c.x, c.y);
      if (null != f) {
        var g = c.x - f.x,
          k = c.y - f.y;
        f = {
          p: f,
          distSq: k * k + g * g
        };
        null != f && (null == d || d.distSq > f.distSq) && (d = f);
      }
    }
    return null != d ? d.p : null;
  },
  intersectsPoints: function(a, b) {
    for (var c = 0; c < b.length - 1; c++)
      if (mxUtils.rectangleIntersectsSegment(a, b[c], b[c + 1]))
        return !0;
    return !1;
  },
  rectangleIntersectsSegment: function(a, b, c) {
    var d = a.y,
      e = a.x,
      f = d + a.height,
      g = e + a.width;
    a = b.x;
    var k = c.x;
    b.x > c.x && (a = c.x, k = b.x);
    k > g && (k = g);
    a < e && (a = e);
    if (a > k)
      return !1;
    e = b.y;
    g = c.y;
    var l = c.x - b.x;
    1e-7 < Math.abs(l) && (c = (c.y - b.y) / l, b = b.y - c * b.x, e = c * a + b, g = c * k + b);
    e > g && (b = g, g = e, e = b);
    g > f && (g = f);
    e < d && (e = d);
    return e > g ? !1 : !0;
  },
  contains: function(a, b, c) {
    return a.x <= b && a.x + a.width >= b && a.y <= c && a.y + a.height >= c;
  },
  intersects: function(a, b) {
    var c = a.width,
      d = a.height,
      e = b.width,
      f = b.height;
    if (0 >= e || 0 >= f || 0 >= c || 0 >= d)
      return !1;
    var g = a.x;
    a = a.y;
    var k = b.x;
    b = b.y;
    e += k;
    f += b;
    c += g;
    d += a;
    return (e < k || e > g) && (f < b || f > a) && (c < g || c > k) && (d < a || d > b);
  },
  intersectsHotspot: function(a, b, c, d, e, f) {
    d = null != d ? d : 1;
    e = null != e ? e : 0;
    f = null != f ? f : 0;
    if (0 < d) {
      var g = a.getCenterX(),
        k = a.getCenterY(),
        l = a.width,
        m = a.height,
        n = mxUtils.getValue(a.style, mxConstants.STYLE_STARTSIZE) * a.view.scale;
      0 < n && (mxUtils.getValue(a.style, mxConstants.STYLE_HORIZONTAL, !0) ? (k = a.y + n / 2, m = n) : (g = a.x + n / 2, l = n));
      l = Math.max(e, l * d);
      m = Math.max(e, m * d);
      0 < f && (l = Math.min(l, f), m = Math.min(m, f));
      d = new mxRectangle(g - l / 2, k - m / 2, l, m);
      g = mxUtils.toRadians(mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION) || 0);
      0 != g && (e = Math.cos(-g), f = Math.sin(-g), g = new mxPoint(a.getCenterX(), a.getCenterY()), a = mxUtils.getRotatedPoint(new mxPoint(b, c), e, f, g), b = a.x, c = a.y);
      return mxUtils.contains(d, b, c);
    }
    return !0;
  },
  getOffset: function(a, b) {
    for (var c = 0, d = 0, e = !1, f = a, g = document.body, k = document.documentElement; null != f && f != g && f != k && !e;) {
      var l = mxUtils.getCurrentStyle(f);
      null != l && (e = e || 'fixed' == l.position);
      f = f.parentNode;
    }
    b || e || (b = mxUtils.getDocumentScrollOrigin(a.ownerDocument), c += b.x, d += b.y);
    a = a.getBoundingClientRect();
    null != a && (c += a.left, d += a.top);
    return new mxPoint(c, d);
  },
  getDocumentScrollOrigin: function(a) {
    a = a.defaultView || a.parentWindow;
    return new mxPoint(null != a && void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft, null != a && void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop);
  },
  getScrollOrigin: function(a, b, c) {
    b = null != b ? b : !1;
    c = null != c ? c : !0;
    for (var d = null != a ? a.ownerDocument : document, e = d.body, f = d.documentElement, g = new mxPoint(), k = !1; null != a && a != e && a != f;) {
      isNaN(a.scrollLeft) || isNaN(a.scrollTop) || (g.x += a.scrollLeft, g.y += a.scrollTop);
      var l = mxUtils.getCurrentStyle(a);
      null != l && (k = k || 'fixed' == l.position);
      a = b ? a.parentNode : null;
    }!k && c && (a = mxUtils.getDocumentScrollOrigin(d), g.x += a.x, g.y += a.y);
    return g;
  },
  convertPoint: function(a, b, c) {
    var d = mxUtils.getScrollOrigin(a, !1);
    a = mxUtils.getOffset(a);
    a.x -= d.x;
    a.y -= d.y;
    return new mxPoint(b - a.x, c - a.y);
  },
  ltrim: function(a, b) {
    return null != a ? a.replace(new RegExp('^[' + (b || '\\s') + ']+', 'g'), '') : null;
  },
  rtrim: function(a, b) {
    return null != a ? a.replace(new RegExp('[' + (b || '\\s') + ']+$', 'g'), '') : null;
  },
  trim: function(a, b) {
    return mxUtils.ltrim(mxUtils.rtrim(a, b), b);
  },
  isNumeric: function(a) {
    return !isNaN(parseFloat(a)) && isFinite(a) && ('string' != typeof a || 0 > a.toLowerCase().indexOf('0x'));
  },
  isInteger: function(a) {
    return String(parseInt(a)) === String(a);
  },
  mod: function(a, b) {
    return (a % b + b) % b;
  },
  intersection: function(a, b, c, d, e, f, g, k) {
    var l = (k - f) * (c - a) - (g - e) * (d - b);
    g = ((g - e) * (b - f) - (k - f) * (a - e)) / l;
    e = ((c - a) * (b - f) - (d - b) * (a - e)) / l;
    return 0 <= g && 1 >= g && 0 <= e && 1 >= e ? new mxPoint(a + g * (c - a), b + g * (d - b)) : null;
  },
  ptSegDistSq: function(a, b, c, d, e, f) {
    c -= a;
    d -= b;
    e -= a;
    f -= b;
    0 >= e * c + f * d ? c = 0 : (e = c - e, f = d - f, a = e * c + f * d, c = 0 >= a ? 0 : a * a / (c * c + d * d));
    e = e * e + f * f - c;
    0 > e && (e = 0);
    return e;
  },
  ptLineDist: function(a, b, c, d, e, f) {
    return Math.abs((d - b) * e - (c - a) * f + c * b - d * a) / Math.sqrt((d - b) * (d - b) + (c - a) * (c - a));
  },
  relativeCcw: function(a, b, c, d, e, f) {
    c -= a;
    d -= b;
    e -= a;
    f -= b;
    a = e * d - f * c;
    0 == a && (a = e * c + f * d, 0 < a && (a = (e - c) * c + (f - d) * d, 0 > a && (a = 0)));
    return 0 > a ? -1 : 0 < a ? 1 : 0;
  },
  animateChanges: function(a, b) {
    mxEffects.animateChanges.apply(this, arguments);
  },
  cascadeOpacity: function(a, b, c) {
    mxEffects.cascadeOpacity.apply(this, arguments);
  },
  fadeOut: function(a, b, c, d, e, f) {
    mxEffects.fadeOut.apply(this, arguments);
  },
  setOpacity: function(a, b) {
    mxClient.IS_IE && ('undefined' === typeof document.documentMode || 9 > document.documentMode) ? a.style.filter = 100 <= b ? '' : 'alpha(opacity=' + b + ')' : a.style.opacity = b / 100;
  },
  createImage: function(a) {
    var b = document.createElement('img');
    b.setAttribute('src', a);
    b.setAttribute('border', '0');
    return b;
  },
  sortCells: function(a, b) {
    b = null != b ? b : !0;
    var c = new mxDictionary();
    a.sort(function(d, e) {
      var f = c.get(d);
      null == f && (f = mxCellPath.create(d).split(mxCellPath.PATH_SEPARATOR), c.put(d, f));
      d = c.get(e);
      null == d && (d = mxCellPath.create(e).split(mxCellPath.PATH_SEPARATOR), c.put(e, d));
      e = mxCellPath.compare(f, d);
      return 0 == e ? 0 : 0 < e == b ? 1 : -1;
    });
    return a;
  },
  getStylename: function(a) {
    return null != a && (a = a.split(';')[0], 0 > a.indexOf('=')) ? a : '';
  },
  getStylenames: function(a) {
    var b = [];
    if (null != a) {
      a = a.split(';');
      for (var c = 0; c < a.length; c++)
        0 > a[c].indexOf('=') && b.push(a[c]);
    }
    return b;
  },
  indexOfStylename: function(a, b) {
    if (null != a && null != b) {
      a = a.split(';');
      for (var c = 0, d = 0; d < a.length; d++) {
        if (a[d] == b)
          return c;
        c += a[d].length + 1;
      }
    }
    return -1;
  },
  addStylename: function(a, b) {
    0 > mxUtils.indexOfStylename(a, b) && (null == a ? a = '' : 0 < a.length && ';' != a.charAt(a.length - 1) && (a += ';'), a += b);
    return a;
  },
  removeStylename: function(a, b) {
    var c = [];
    if (null != a) {
      a = a.split(';');
      for (var d = 0; d < a.length; d++)
        a[d] != b && c.push(a[d]);
    }
    return c.join(';');
  },
  removeAllStylenames: function(a) {
    var b = [];
    if (null != a) {
      a = a.split(';');
      for (var c = 0; c < a.length; c++)
        0 <= a[c].indexOf('=') && b.push(a[c]);
    }
    return b.join(';');
  },
  setCellStyles: function(a, b, c, d) {
    if (null != b && 0 < b.length) {
      a.beginUpdate();
      try {
        for (var e = 0; e < b.length; e++)
          if (null != b[e]) {
            var f = mxUtils.setStyle(a.getStyle(b[e]), c, d);
            a.setStyle(b[e], f);
          }
      } finally {
        a.endUpdate();
      }
    }
  },
  hex2rgb: function(a) {
    if (null != a && 7 == a.length && '#' == a.charAt(0)) {
      var b = parseInt(a.substring(1, 3), 16),
        c = parseInt(a.substring(3, 5), 16);
      a = parseInt(a.substring(5, 7), 16);
      a = 'rgb(' + b + ', ' + c + ', ' + a + ')';
    }
    return a;
  },
  hex2rgba: function(a) {
    if (null != a && 7 <= a.length && '#' == a.charAt(0)) {
      var b = parseInt(a.substring(1, 3), 16),
        c = parseInt(a.substring(3, 5), 16),
        d = parseInt(a.substring(5, 7), 16),
        e = 1;
      7 < a.length && (e = parseInt(a.substring(7, 9), 16) / 255);
      a = 'rgba(' + b + ', ' + c + ', ' + d + ', ' + e + ')';
    }
    return a;
  },
  rgba2hex: function(a) {
    return (rgb = a && a.match ? a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i) : a) && 4 === rgb.length ? '#' + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : a;
  },
  setCssText: function(a, b) {
    if (null != a && null != b) {
      b = b.split(';');
      for (var c = 0; c < b.length; c++) {
        var d = b[c].split(':');
        1 < d.length && (d[0] = mxUtils.trim(d[0].replace(/-([a-z])/gi, function(e, f) {
          return f.toUpperCase();
        })), a[d[0]] = mxUtils.trim(d[1]));
      }
    }
  },
  setStyle: function(a, b, c) {
    var d = null != c && ('undefined' == typeof c.length || 0 < c.length);
    if (null == a || 0 == a.length)
      d && (a = b + '=' + c + ';');
    else if (a.substring(0, b.length + 1) == b + '=') {
      var e = a.indexOf(';');
      a = d ? b + '=' + c + (0 > e ? ';' : a.substring(e)) : 0 > e || e == a.length - 1 ? '' : a.substring(e + 1);
    } else {
      var f = a.indexOf(';' + b + '=');
      0 > f ? d && (d = ';' == a.charAt(a.length - 1) ? '' : ';', a = a + d + b + '=' + c + ';') : (e = a.indexOf(';', f + 1), a = d ? a.substring(0, f + 1) + b + '=' + c + (0 > e ? ';' : a.substring(e)) : a.substring(0, f) + (0 > e ? ';' : a.substring(e)));
    }
    return a;
  },
  setCellStyleFlags: function(a, b, c, d, e) {
    if (null != b && 0 < b.length) {
      a.beginUpdate();
      try {
        for (var f = 0; f < b.length; f++)
          if (null != b[f]) {
            var g = mxUtils.setStyleFlag(a.getStyle(b[f]), c, d, e);
            a.setStyle(b[f], g);
          }
      } finally {
        a.endUpdate();
      }
    }
  },
  setStyleFlag: function(a, b, c, d) {
    if (null == a || 0 == a.length)
      a = d || null == d ? b + '=' + c : b + '=0';
    else {
      var e = a.indexOf(b + '=');
      if (0 > e)
        e = ';' == a.charAt(a.length - 1) ? '' : ';', a = d || null == d ? a + e + b + '=' + c : a + e + b + '=0';
      else {
        var f = a.indexOf(';', e),
          g = 0 > f ? a.substring(e + b.length + 1) : a.substring(e + b.length + 1, f);
        g = null == d ? parseInt(g) ^ c : d ? parseInt(g) | c : parseInt(g) & ~c;
        a = a.substring(0, e) + b + '=' + g + (0 <= f ? a.substring(f) : '');
      }
    }
    return a;
  },
  getAlignmentAsPoint: function(a, b) {
    var c = -0.5,
      d = -0.5;
    a == mxConstants.ALIGN_LEFT ? c = 0 : a == mxConstants.ALIGN_RIGHT && (c = -1);
    b == mxConstants.ALIGN_TOP ? d = 0 : b == mxConstants.ALIGN_BOTTOM && (d = -1);
    return new mxPoint(c, d);
  },
  getSizeForString: function(a, b, c, d, e) {
    b = null != b ? b : mxConstants.DEFAULT_FONTSIZE;
    c = null != c ? c : mxConstants.DEFAULT_FONTFAMILY;
    var f = document.createElement('div');
    f.style.fontFamily = c;
    f.style.fontSize = Math.round(b) + 'px';
    f.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT ? b * mxConstants.LINE_HEIGHT + 'px' : mxConstants.LINE_HEIGHT * mxSvgCanvas2D.prototype.lineHeightCorrection;
    null != e && ((e & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD && (f.style.fontWeight = 'bold'), (e & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC && (f.style.fontStyle = 'italic'), b = [], (e & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && b.push('underline'), (e & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && b.push('line-through'), 0 < b.length && (f.style.textDecoration = b.join(' ')));
    f.style.position = 'absolute';
    f.style.visibility = 'hidden';
    f.style.display = 'inline-block';
    f.style.zoom = '1';
    null != d ? (f.style.width = d + 'px', f.style.whiteSpace = 'normal') : f.style.whiteSpace = 'nowrap';
    f.innerHTML = a;
    document.body.appendChild(f);
    a = new mxRectangle(0, 0, f.offsetWidth, f.offsetHeight);
    document.body.removeChild(f);
    return a;
  },
  getViewXml: function(a, b, c, d, e) {
    d = null != d ? d : 0;
    e = null != e ? e : 0;
    b = null != b ? b : 1;
    null == c && (c = [a.getModel().getRoot()]);
    var f = a.getView(),
      g = null,
      k = f.isEventsEnabled();
    f.setEventsEnabled(!1);
    var l = f.drawPane,
      m = f.overlayPane;
    a.dialect == mxConstants.DIALECT_SVG ? (f.drawPane = document.createElementNS(mxConstants.NS_SVG, 'g'), f.canvas.appendChild(f.drawPane), f.overlayPane = document.createElementNS(mxConstants.NS_SVG, 'g')) : (f.drawPane = f.drawPane.cloneNode(!1), f.canvas.appendChild(f.drawPane), f.overlayPane = f.overlayPane.cloneNode(!1));
    f.canvas.appendChild(f.overlayPane);
    var n = f.getTranslate();
    f.translate = new mxPoint(d, e);
    b = new mxTemporaryCellStates(a.getView(), b, c);
    try {
      g = new mxCodec().encode(a.getView());
    } finally {
      b.destroy(), f.translate = n, f.canvas.removeChild(f.drawPane), f.canvas.removeChild(f.overlayPane), f.drawPane = l, f.overlayPane = m, f.setEventsEnabled(k);
    }
    return g;
  },
  getScaleForPageCount: function(a, b, c, d) {
    if (1 > a)
      return 1;
    c = null != c ? c : mxConstants.PAGE_FORMAT_A4_PORTRAIT;
    d = null != d ? d : 0;
    var e = c.width - 2 * d;
    c = c.height - 2 * d;
    d = b.getGraphBounds().clone();
    b = b.getView().getScale();
    d.width /= b;
    d.height /= b;
    b = d.width;
    var f = Math.sqrt(a);
    d = Math.sqrt(b / d.height / (e / c));
    c = f * d;
    d = f / d;
    if (1 > c && d > a) {
      var g = d / a;
      d = a;
      c /= g;
    }
    1 > d && c > a && (g = c / a, c = a, d /= g);
    g = Math.ceil(c) * Math.ceil(d);
    for (f = 0; g > a;) {
      g = Math.floor(c) / c;
      var k = Math.floor(d) / d;
      1 == g && (g = Math.floor(c - 1) / c);
      1 == k && (k = Math.floor(d - 1) / d);
      g = g > k ? g : k;
      c *= g;
      d *= g;
      g = Math.ceil(c) * Math.ceil(d);
      f++;
      if (10 < f)
        break;
    }
    return e * c / b * 0.99999;
  },
  show: function(a, b, c, d, e, f) {
    c = null != c ? c : 0;
    d = null != d ? d : 0;
    null == b ? b = window.open().document : b.open();
    9 == document.documentMode && b.writeln('<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=9"><![endif]-->');
    var g = a.getGraphBounds(),
      k = Math.ceil(c - g.x),
      l = Math.ceil(d - g.y);
    null == e && (e = Math.ceil(g.width + c) + Math.ceil(Math.ceil(g.x) - g.x));
    null == f && (f = Math.ceil(g.height + d) + Math.ceil(Math.ceil(g.y) - g.y));
    if (mxClient.IS_IE || 11 == document.documentMode) {
      d = '<html><head>';
      g = document.getElementsByTagName('base');
      for (c = 0; c < g.length; c++)
        d += g[c].outerHTML;
      d += '<style>';
      for (c = 0; c < document.styleSheets.length; c++)
        try {
          d += document.styleSheets[c].cssText;
        } catch (m) {}
      d = d + '</style></head><body style="margin:0px;"><div style="position:absolute;overflow:hidden;width:' + (e + 'px;height:' + f + 'px;"><div style="position:relative;left:' + k + 'px;top:' + l + 'px;">') + a.container.innerHTML;
      b.writeln(d + '</div></div></body><html>');
      b.close();
    } else {
      b.writeln('<html><head>');
      g = document.getElementsByTagName('base');
      for (c = 0; c < g.length; c++)
        b.writeln(mxUtils.getOuterHtml(g[c]));
      d = document.getElementsByTagName('link');
      for (c = 0; c < d.length; c++)
        b.writeln(mxUtils.getOuterHtml(d[c]));
      d = document.getElementsByTagName('style');
      for (c = 0; c < d.length; c++)
        b.writeln(mxUtils.getOuterHtml(d[c]));
      b.writeln('</head><body style="margin:0px;"></body></html>');
      b.close();
      c = b.createElement('div');
      c.position = 'absolute';
      c.overflow = 'hidden';
      c.style.width = e + 'px';
      c.style.height = f + 'px';
      e = b.createElement('div');
      e.style.position = 'absolute';
      e.style.left = k + 'px';
      e.style.top = l + 'px';
      f = a.container.firstChild;
      for (d = null; null != f;)
        g = f.cloneNode(!0), f == a.view.drawPane.ownerSVGElement ? (c.appendChild(g), d = g) : e.appendChild(g), f = f.nextSibling;
      b.body.appendChild(c);
      null != e.firstChild && b.body.appendChild(e);
      null != d && (d.style.minWidth = '', d.style.minHeight = '', d.firstChild.setAttribute('transform', 'translate(' + k + ',' + l + ')'));
    }
    mxUtils.removeCursors(b.body);
    return b;
  },
  printScreen: function(a) {
    var b = window.open();
    a.getGraphBounds();
    mxUtils.show(a, b.document);
    a = function() {
      b.focus();
      b.print();
      b.close();
    };
    mxClient.IS_GC ? b.setTimeout(a, 500) : a();
  },
  popup: function(a, b) {
    if (b) {
      var c = document.createElement('div');
      c.style.overflow = 'scroll';
      c.style.width = '636px';
      c.style.height = '460px';
      b = document.createElement('pre');
      b.innerHTML = mxUtils.htmlEntities(a, !1).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
      c.appendChild(b);
      c = new mxWindow('Popup Window', c, document.body.clientWidth / 2 - 320, Math.max(document.body.clientHeight || 0, document.documentElement.clientHeight) / 2 - 240, 640, 480, !1, !0);
      c.setClosable(!0);
      c.setVisible(!0);
    } else
      mxClient.IS_NS ? (c = window.open(), c.document.writeln('<pre>' + mxUtils.htmlEntities(a) + '</pre'), c.document.close()) : (c = window.open(), b = c.document.createElement('pre'), b.innerHTML = mxUtils.htmlEntities(a, !1).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;'), c.document.body.appendChild(b));
  },
  alert: function(a) {
    alert(a);
  },
  prompt: function(a, b) {
    return prompt(a, null != b ? b : '');
  },
  confirm: function(a) {
    return confirm(a);
  },
  error: function(a, b, c, d) {
    var e = document.createElement('div');
    e.style.padding = '20px';
    var f = document.createElement('img');
    f.setAttribute('src', d || mxUtils.errorImage);
    f.setAttribute('valign', 'bottom');
    f.style.verticalAlign = 'middle';
    e.appendChild(f);
    e.appendChild(document.createTextNode('\xA0'));
    e.appendChild(document.createTextNode('\xA0'));
    e.appendChild(document.createTextNode('\xA0'));
    mxUtils.write(e, a);
    a = document.body.clientWidth;
    d = document.body.clientHeight || document.documentElement.clientHeight;
    var g = new mxWindow(mxResources.get(mxUtils.errorResource) || mxUtils.errorResource, e, (a - b) / 2, d / 4, b, null, !1, !0);
    c && (mxUtils.br(e), b = document.createElement('p'), c = document.createElement('button'), mxClient.IS_IE ? c.style.cssText = 'float:right' : c.setAttribute('style', 'float:right'), mxEvent.addListener(c, 'click', function(k) {
      g.destroy();
    }), mxUtils.write(c, mxResources.get(mxUtils.closeResource) || mxUtils.closeResource), b.appendChild(c), e.appendChild(b), mxUtils.br(e), g.setClosable(!0));
    g.setVisible(!0);
    return g;
  },
  makeDraggable: function(a, b, c, d, e, f, g, k, l, m) {
    a = new mxDragSource(a, c);
    a.dragOffset = new mxPoint(null != e ? e : 0, null != f ? f : mxConstants.TOOLTIP_VERTICAL_OFFSET);
    a.autoscroll = g;
    a.setGuidesEnabled(!1);
    null != l && (a.highlightDropTargets = l);
    null != m && (a.getDropTarget = m);
    a.getGraphForEvent = function(n) {
      return 'function' == typeof b ? b(n) : b;
    };
    null != d && (a.createDragElement = function() {
      return d.cloneNode(!0);
    }, k && (a.createPreviewElement = function(n) {
      var p = d.cloneNode(!0),
        r = parseInt(p.style.width),
        q = parseInt(p.style.height);
      p.style.width = Math.round(r * n.view.scale) + 'px';
      p.style.height = Math.round(q * n.view.scale) + 'px';
      return p;
    }));
    return a;
  },
  format: function(a) {
    return parseFloat(parseFloat(a).toFixed(2));
  }
};