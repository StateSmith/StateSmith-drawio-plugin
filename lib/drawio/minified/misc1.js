function _instanceof(d, h) {
  return null != h && 'undefined' !== typeof Symbol && h[Symbol.hasInstance] ? !!h[Symbol.hasInstance](d) : d instanceof h;
}

function _inherits(d, h) {
  if ('function' !== typeof h && null !== h)
    throw new TypeError('Super expression must either be null or a function');
  d.prototype = Object.create(h && h.prototype, {
    constructor: {
      value: d,
      writable: !0,
      configurable: !0
    }
  });
  h && _setPrototypeOf(d, h);
}

function _setPrototypeOf(d, h) {
  _setPrototypeOf = Object.setPrototypeOf || function(d, h) {
    d.__proto__ = h;
    return d;
  };
  return _setPrototypeOf(d, h);
}

function _createSuper(d) {
  var h = _isNativeReflectConstruct();
  return function() {
    var l = _getPrototypeOf(d);
    if (h)
      var p = _getPrototypeOf(this).constructor,
        l = Reflect.construct(l, arguments, p);
    else
      l = l.apply(this, arguments);
    return _possibleConstructorReturn(this, l);
  };
}

function _possibleConstructorReturn(d, h) {
  return !h || 'object' !== _typeof(h) && 'function' !== typeof h ? _assertThisInitialized(d) : h;
}

function _assertThisInitialized(d) {
  if (void 0 === d)
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  return d;
}

function _isNativeReflectConstruct() {
  if ('undefined' === typeof Reflect || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if ('function' === typeof Proxy)
    return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
  } catch (d) {
    return !1;
  }
}

function _getPrototypeOf(d) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(d) {
    return d.__proto__ || Object.getPrototypeOf(d);
  };
  return _getPrototypeOf(d);
}

function _createForOfIteratorHelper(d, h) {
  var l;
  if ('undefined' === typeof Symbol || null == d[Symbol.iterator]) {
    if (Array.isArray(d) || (l = _unsupportedIterableToArray(d)) || h && d && 'number' === typeof d.length) {
      l && (d = l);
      var p = 0,
        v = function() {};
      return {
        s: v,
        n: function() {
          return p >= d.length ? {
            done: !0
          } : {
            done: !1,
            value: d[p++]
          };
        },
        e: function(d) {
          throw d;
        },
        f: v
      };
    }
    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }
  var z = !0,
    B = !1,
    C;
  return {
    s: function() {
      l = d[Symbol.iterator]();
    },
    n: function() {
      var d = l.next();
      z = d.done;
      return d;
    },
    e: function(d) {
      B = !0;
      C = d;
    },
    f: function() {
      try {
        z || null == l['return'] || l['return']();
      } finally {
        if (B)
          throw C;
      }
    }
  };
}

function _classCallCheck(d, h) {
  if (!_instanceof(d, h))
    throw new TypeError('Cannot call a class as a function');
}

function _defineProperties(d, h) {
  for (var l = 0; l < h.length; l++) {
    var p = h[l];
    p.enumerable = p.enumerable || !1;
    p.configurable = !0;
    'value' in p && (p.writable = !0);
    Object.defineProperty(d, p.key, p);
  }
}

function _createClass(d, h, l) {
  h && _defineProperties(d.prototype, h);
  l && _defineProperties(d, l);
  return d;
}

function _typeof(d) {
  '@babel/helpers - typeof';
  _typeof = 'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator ? function(d) {
    return typeof d;
  } : function(d) {
    return d && 'function' === typeof Symbol && d.constructor === Symbol && d !== Symbol.prototype ? 'symbol' : typeof d;
  };
  return _typeof(d);
}

function _toConsumableArray(d) {
  return _arrayWithoutHoles(d) || _iterableToArray(d) || _unsupportedIterableToArray(d) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function _iterableToArray(d) {
  if ('undefined' !== typeof Symbol && Symbol.iterator in Object(d))
    return Array.from(d);
}

function _arrayWithoutHoles(d) {
  if (Array.isArray(d))
    return _arrayLikeToArray(d);
}

function _slicedToArray(d, h) {
  return _arrayWithHoles(d) || _iterableToArrayLimit(d, h) || _unsupportedIterableToArray(d, h) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function _unsupportedIterableToArray(d, h) {
  if (d) {
    if ('string' === typeof d)
      return _arrayLikeToArray(d, h);
    var l = Object.prototype.toString.call(d).slice(8, -1);
    'Object' === l && d.constructor && (l = d.constructor.name);
    if ('Map' === l || 'Set' === l)
      return Array.from(d);
    if ('Arguments' === l || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l))
      return _arrayLikeToArray(d, h);
  }
}

function _arrayLikeToArray(d, h) {
  if (null == h || h > d.length)
    h = d.length;
  for (var l = 0, p = Array(h); l < h; l++)
    p[l] = d[l];
  return p;
}

function _iterableToArrayLimit(d, h) {
  if ('undefined' !== typeof Symbol && Symbol.iterator in Object(d)) {
    var l = [],
      p = !0,
      v = !1,
      z = void 0;
    try {
      for (var B = d[Symbol.iterator](), C; !(p = (C = B.next()).done) && (l.push(C.value), !h || l.length !== h); p = !0);
    } catch (H) {
      v = !0, z = H;
    } finally {
      try {
        if (!p && null != B['return'])
          B['return']();
      } finally {
        if (v)
          throw z;
      }
    }
    return l;
  }
}

function _arrayWithHoles(d) {
  if (Array.isArray(d))
    return d;
}