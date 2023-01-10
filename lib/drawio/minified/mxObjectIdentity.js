var mxObjectIdentity = {
  FIELD_NAME: 'mxObjectId',
  counter: 0,
  get: function(a) {
    if (null != a) {
      if (null == a[mxObjectIdentity.FIELD_NAME])
        if ('object' === typeof a) {
          var b = mxUtils.getFunctionName(a.constructor);
          a[mxObjectIdentity.FIELD_NAME] = b + '#' + mxObjectIdentity.counter++;
        } else
          'function' === typeof a && (a[mxObjectIdentity.FIELD_NAME] = 'Function#' + mxObjectIdentity.counter++);
      return a[mxObjectIdentity.FIELD_NAME];
    }
    return null;
  },
  clear: function(a) {
    'object' !== typeof a && 'function' !== typeof a || delete a[mxObjectIdentity.FIELD_NAME];
  }
};