var mxCodecRegistry = {
  codecs: [],
  aliases: [],
  register: function(a) {
    if (null != a) {
      var b = a.getName();
      mxCodecRegistry.codecs[b] = a;
      var c = mxUtils.getFunctionName(a.template.constructor);
      c != b && mxCodecRegistry.addAlias(c, b);
    }
    return a;
  },
  addAlias: function(a, b) {
    mxCodecRegistry.aliases[a] = b;
  },
  getCodec: function(a) {
    var b = null;
    if (null != a) {
      b = mxUtils.getFunctionName(a);
      var c = mxCodecRegistry.aliases[b];
      null != c && (b = c);
      b = mxCodecRegistry.codecs[b];
      if (null == b)
        try {
          b = new mxObjectCodec(new a()), mxCodecRegistry.register(b);
        } catch (d) {}
    }
    return b;
  }
};