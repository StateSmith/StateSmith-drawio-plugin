var mxCellPath = {
  PATH_SEPARATOR: '.',
  create: function(a) {
    var b = '';
    if (null != a)
      for (var c = a.getParent(); null != c;)
        b = c.getIndex(a) + mxCellPath.PATH_SEPARATOR + b, a = c, c = a.getParent();
    a = b.length;
    1 < a && (b = b.substring(0, a - 1));
    return b;
  },
  getParentPath: function(a) {
    if (null != a) {
      var b = a.lastIndexOf(mxCellPath.PATH_SEPARATOR);
      if (0 <= b)
        return a.substring(0, b);
      if (0 < a.length)
        return '';
    }
    return null;
  },
  resolve: function(a, b) {
    if (null != b) {
      b = b.split(mxCellPath.PATH_SEPARATOR);
      for (var c = 0; c < b.length; c++)
        a = a.getChildAt(parseInt(b[c]));
    }
    return a;
  },
  compare: function(a, b) {
    for (var c = Math.min(a.length, b.length), d = 0, e = 0; e < c; e++)
      if (a[e] != b[e]) {
        0 == a[e].length || 0 == b[e].length ? d = a[e] == b[e] ? 0 : a[e] > b[e] ? 1 : -1 : (c = parseInt(a[e]), e = parseInt(b[e]), d = c == e ? 0 : c > e ? 1 : -1);
        break;
      }
    0 == d && (c = a.length, e = b.length, c != e && (d = c > e ? 1 : -1));
    return d;
  }
};