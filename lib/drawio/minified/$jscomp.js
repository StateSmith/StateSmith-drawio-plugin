var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(b) {
  return b.raw = b;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(b, e) {
  b.raw = e;
  return b;
};
$jscomp.arrayIteratorImpl = function(b) {
  var e = 0;
  return function() {
    return e < b.length ? {
      done: !1,
      value: b[e++]
    } : {
      done: !0
    };
  };
};
$jscomp.arrayIterator = function(b) {
  return {
    next: $jscomp.arrayIteratorImpl(b)
  };
};
$jscomp.makeIterator = function(b) {
  var e = 'undefined' != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return e ? e.call(b) : $jscomp.arrayIterator(b);
};