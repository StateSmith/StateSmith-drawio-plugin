var mxResources = {
  resources: {},
  extension: mxResourceExtension,
  resourcesEncoded: !1,
  loadDefaultBundle: !0,
  loadSpecialBundle: !0,
  isLanguageSupported: function(a) {
    return null != mxClient.languages ? 0 <= mxUtils.indexOf(mxClient.languages, a) : !0;
  },
  getDefaultBundle: function(a, b) {
    return mxResources.loadDefaultBundle || !mxResources.isLanguageSupported(b) ? a + mxResources.extension : null;
  },
  getSpecialBundle: function(a, b) {
    if (null == mxClient.languages || !this.isLanguageSupported(b)) {
      var c = b.indexOf('-');
      0 < c && (b = b.substring(0, c));
    }
    return mxResources.loadSpecialBundle && mxResources.isLanguageSupported(b) && b != mxClient.defaultLanguage ? a + '_' + b + mxResources.extension : null;
  },
  add: function(a, b, c) {
    b = null != b ? b : null != mxClient.language ? mxClient.language.toLowerCase() : mxConstants.NONE;
    if (b != mxConstants.NONE) {
      var d = mxResources.getDefaultBundle(a, b),
        e = mxResources.getSpecialBundle(a, b),
        f = function() {
          if (null != e)
            if (c)
              mxUtils.get(e, function(l) {
                mxResources.parse(l.getText());
                c();
              }, function() {
                c();
              });
            else
              try {
                var k = mxUtils.load(e);
                k.isReady() && mxResources.parse(k.getText());
              } catch (l) {}
          else
            null != c && c();
        };
      if (null != d)
        if (c)
          mxUtils.get(d, function(k) {
            mxResources.parse(k.getText());
            f();
          }, function() {
            f();
          });
        else
          try {
            var g = mxUtils.load(d);
            g.isReady() && mxResources.parse(g.getText());
            f();
          } catch (k) {}
      else
        f();
    }
  },
  parse: function(a) {
    if (null != a) {
      a = a.split('\n');
      for (var b = 0; b < a.length; b++)
        if ('#' != a[b].charAt(0)) {
          var c = a[b].indexOf('=');
          if (0 < c) {
            var d = a[b].substring(0, c),
              e = a[b].length;
            13 == a[b].charCodeAt(e - 1) && e--;
            c = a[b].substring(c + 1, e);
            this.resourcesEncoded ? (c = c.replace(/\\(?=u[a-fA-F\d]{4})/g, '%'), mxResources.resources[d] = unescape(c)) : mxResources.resources[d] = c;
          }
        }
    }
  },
  get: function(a, b, c) {
    a = mxResources.resources[a];
    null == a && (a = c);
    null != a && null != b && (a = mxResources.replacePlaceholders(a, b));
    return a;
  },
  replacePlaceholders: function(a, b) {
    for (var c = [], d = null, e = 0; e < a.length; e++) {
      var f = a.charAt(e);
      '{' == f ? d = '' : null != d && '}' == f ? (d = parseInt(d) - 1, 0 <= d && d < b.length && c.push(b[d]), d = null) : null != d ? d += f : c.push(f);
    }
    return c.join('');
  },
  loadResources: function(a) {
    mxResources.add(mxClient.basePath + '/resources/editor', null, function() {
      mxResources.add(mxClient.basePath + '/resources/graph', null, a);
    });
  }
};