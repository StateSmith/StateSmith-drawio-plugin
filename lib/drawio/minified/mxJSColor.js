var mxJSColor = {
  bindClass: 'color',
  binding: !0,
  preloading: !0,
  install: function() {},
  init: function() {
    mxJSColor.preloading && mxJSColor.preload();
  },
  getDir: function() {
    return IMAGE_PATH + '/';
  },
  detectDir: function() {
    for (var a = location.href, b = document.getElementsByTagName('base'), c = 0; c < b.length; c += 1)
      b[c].href && (a = b[c].href);
    b = document.getElementsByTagName('script');
    for (c = 0; c < b.length; c += 1)
      if (b[c].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(b[c].src))
        return a = new mxJSColor.URI(b[c].src).toAbsolute(a), a.path = a.path.replace(/[^\/]+$/, ''), a.query = null, a.fragment = null, a.toString();
    return !1;
  },
  preload: function() {
    for (var a in mxJSColor.imgRequire)
      mxJSColor.imgRequire.hasOwnProperty(a) && mxJSColor.loadImage(a);
  },
  images: {
    pad: [
      181,
      101
    ],
    sld: [
      16,
      101
    ],
    cross: [
      15,
      15
    ],
    arrow: [
      7,
      11
    ]
  },
  imgRequire: {},
  imgLoaded: {},
  requireImage: function(a) {
    mxJSColor.imgRequire[a] = !0;
  },
  loadImage: function(a) {
    mxJSColor.imgLoaded[a] || (mxJSColor.imgLoaded[a] = new Image(), mxJSColor.imgLoaded[a].src = mxJSColor.getDir() + a);
  },
  fetchElement: function(a) {
    return 'string' === typeof a ? document.getElementById(a) : a;
  },
  addEvent: function(a, b, c) {
    a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent('on' + b, c);
  },
  fireEvent: function(a, b) {
    if (a)
      if (document.createEvent) {
        var c = document.createEvent('HTMLEvents');
        c.initEvent(b, !0, !0);
        a.dispatchEvent(c);
      } else if (document.createEventObject)
      c = document.createEventObject(), a.fireEvent('on' + b, c);
    else if (a['on' + b])
      a['on' + b]();
  },
  getElementPos: function(a) {
    var b = a,
      c = 0,
      d = 0;
    if (b.offsetParent) {
      do
        c += b.offsetLeft, d += b.offsetTop;
      while (b = b.offsetParent);
    }
    for (;
      (a = a.parentNode) && 'BODY' !== a.nodeName.toUpperCase();)
      c -= a.scrollLeft, d -= a.scrollTop;
    return [
      c,
      d
    ];
  },
  getElementSize: function(a) {
    return [
      a.offsetWidth,
      a.offsetHeight
    ];
  },
  getRelMousePos: function(a) {
    var b = 0,
      c = 0;
    a || (a = window.event);
    'number' === typeof a.offsetX ? (b = a.offsetX, c = a.offsetY) : 'number' === typeof a.layerX && (b = a.layerX, c = a.layerY);
    return {
      x: b,
      y: c
    };
  },
  getViewPos: function() {
    return 'number' === typeof window.pageYOffset ? [
      window.pageXOffset,
      window.pageYOffset
    ] : document.body && (document.body.scrollLeft || document.body.scrollTop) ? [
      document.body.scrollLeft,
      document.body.scrollTop
    ] : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) ? [
      document.documentElement.scrollLeft,
      document.documentElement.scrollTop
    ] : [
      0,
      0
    ];
  },
  getViewSize: function() {
    return 'number' === typeof window.innerWidth ? [
      window.innerWidth,
      window.innerHeight
    ] : document.body && (document.body.clientWidth || document.body.clientHeight) ? [
      document.body.clientWidth,
      document.body.clientHeight
    ] : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? [
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ] : [
      0,
      0
    ];
  },
  URI: function(a) {
    function b(c) {
      for (var d = ''; c;)
        if ('../' === c.substr(0, 3) || './' === c.substr(0, 2))
          c = c.replace(/^\.+/, '').substr(1);
        else if ('/./' === c.substr(0, 3) || '/.' === c)
        c = '/' + c.substr(3);
      else if ('/../' === c.substr(0, 4) || '/..' === c)
        c = '/' + c.substr(4), d = d.replace(/\/?[^\/]*$/, '');
      else if ('.' === c || '..' === c)
        c = '';
      else {
        var e = c.match(/^\/?[^\/]*/)[0];
        c = c.substr(e.length);
        d += e;
      }
      return d;
    }
    this.authority = this.scheme = null;
    this.path = '';
    this.fragment = this.query = null;
    this.parse = function(c) {
      c = c.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
      this.scheme = c[3] ? c[2] : null;
      this.authority = c[5] ? c[6] : null;
      this.path = c[7];
      this.query = c[9] ? c[10] : null;
      this.fragment = c[12] ? c[13] : null;
      return this;
    };
    this.toString = function() {
      var c = '';
      null !== this.scheme && (c = c + this.scheme + ':');
      null !== this.authority && (c = c + '//' + this.authority);
      null !== this.path && (c += this.path);
      null !== this.query && (c = c + '?' + this.query);
      null !== this.fragment && (c = c + '#' + this.fragment);
      return c;
    };
    this.toAbsolute = function(c) {
      c = new mxJSColor.URI(c);
      var d = new mxJSColor.URI();
      if (null === c.scheme)
        return !1;
      null !== this.scheme && this.scheme.toLowerCase() === c.scheme.toLowerCase() && (this.scheme = null);
      null !== this.scheme ? (d.scheme = this.scheme, d.authority = this.authority, d.path = b(this.path), d.query = this.query) : (null !== this.authority ? (d.authority = this.authority, d.path = b(this.path), d.query = this.query) : ('' === this.path ? (d.path = c.path, d.query = null !== this.query ? this.query : c.query) : ('/' === this.path.substr(0, 1) ? d.path = b(this.path) : (d.path = null !== c.authority && '' === c.path ? '/' + this.path : c.path.replace(/[^\/]+$/, '') + this.path, d.path = b(d.path)), d.query = this.query), d.authority = c.authority), d.scheme = c.scheme);
      d.fragment = this.fragment;
      return d;
    };
    a && this.parse(a);
  },
  color: function(a, b) {
    function c(y, F, H) {
      if (null === y)
        return [
          H,
          H,
          H
        ];
      var G = Math.floor(y),
        z = H * (1 - F);
      y = H * (1 - F * (G % 2 ? y - G : 1 - (y - G)));
      switch (G) {
        case 6:
        case 0:
          return [
            H,
            y,
            z
          ];
        case 1:
          return [
            y,
            H,
            z
          ];
        case 2:
          return [
            z,
            H,
            y
          ];
        case 3:
          return [
            z,
            y,
            H
          ];
        case 4:
          return [
            y,
            z,
            H
          ];
        case 5:
          return [
            H,
            z,
            y
          ];
      }
    }

    function d(y, F) {
      if (!mxJSColor.picker) {
        mxJSColor.picker = {
          box: document.createElement('div'),
          boxB: document.createElement('div'),
          pad: document.createElement('div'),
          padB: document.createElement('div'),
          padM: document.createElement('div'),
          sld: document.createElement('div'),
          sldB: document.createElement('div'),
          sldM: document.createElement('div'),
          btn: document.createElement('div'),
          btnS: document.createElement('span'),
          btnT: document.createTextNode(q.pickerCloseText)
        };
        for (var H = 0; H < mxJSColor.images.sld[1]; H += 4) {
          var G = document.createElement('div');
          G.style.height = '4px';
          G.style.fontSize = '1px';
          G.style.lineHeight = '0';
          mxJSColor.picker.sld.appendChild(G);
        }
        mxJSColor.picker.sldB.appendChild(mxJSColor.picker.sld);
        mxJSColor.picker.box.appendChild(mxJSColor.picker.sldB);
        mxJSColor.picker.box.appendChild(mxJSColor.picker.sldM);
        mxJSColor.picker.padB.appendChild(mxJSColor.picker.pad);
        mxJSColor.picker.box.appendChild(mxJSColor.picker.padB);
        mxJSColor.picker.box.appendChild(mxJSColor.picker.padM);
        mxJSColor.picker.btnS.appendChild(mxJSColor.picker.btnT);
        mxJSColor.picker.btn.appendChild(mxJSColor.picker.btnS);
        mxJSColor.picker.box.appendChild(mxJSColor.picker.btn);
        mxJSColor.picker.boxB.appendChild(mxJSColor.picker.box);
      }
      var z = mxJSColor.picker;
      z.box.onmouseup = z.box.onmouseout = function() {
        mxClient.IS_TOUCH || a.focus();
      };
      z.box.onmousedown = function() {};
      z.box.onmousemove = function(I) {
        if (A || E)
          A && m(I), E && n(I), document.selection ? document.selection.empty() : window.getSelection && window.getSelection().removeAllRanges(), p();
      };
      z.padM.onmouseup = z.padM.onmouseout = function() {
        A && (A = !1, mxJSColor.fireEvent(u, 'change'));
      };
      z.padM.onmousedown = function(I) {
        switch (t) {
          case 0:
            0 === q.hsv[2] && q.fromHSV(null, null, 1);
            break;
          case 1:
            0 === q.hsv[1] && q.fromHSV(null, 1, null);
        }
        A = !0;
        m(I);
        p();
      };
      z.sldM.onmouseup = z.sldM.onmouseout = function() {
        E && (E = !1, mxJSColor.fireEvent(u, 'change'));
      };
      z.sldM.onmousedown = function(I) {
        E = !0;
        n(I);
        p();
      };
      H = e(q);
      z.box.style.width = H[0] + 'px';
      z.box.style.height = H[1] + 'px';
      z.boxB.style.position = 'absolute';
      z.boxB.style.clear = 'both';
      z.boxB.style.left = y + 'px';
      z.boxB.style.top = F + 'px';
      z.boxB.style.zIndex = q.pickerZIndex;
      z.boxB.style.border = q.pickerBorder + 'px solid';
      z.boxB.style.borderColor = q.pickerBorderColor;
      z.boxB.style.background = q.pickerFaceColor;
      z.pad.style.width = mxJSColor.images.pad[0] + 'px';
      z.pad.style.height = mxJSColor.images.pad[1] + 'px';
      z.padB.style.position = 'absolute';
      z.padB.style.left = q.pickerFace + 'px';
      z.padB.style.top = q.pickerFace + 'px';
      z.padB.style.border = q.pickerInset + 'px solid';
      z.padB.style.borderColor = q.pickerInsetColor;
      z.padM.style.position = 'absolute';
      z.padM.style.left = '0';
      z.padM.style.top = '0';
      z.padM.style.width = q.pickerFace + 2 * q.pickerInset + mxJSColor.images.pad[0] + mxJSColor.images.arrow[0] + 'px';
      z.padM.style.height = z.box.style.height;
      z.padM.style.cursor = 'crosshair';
      z.sld.style.overflow = 'hidden';
      z.sld.style.width = mxJSColor.images.sld[0] + 'px';
      z.sld.style.height = mxJSColor.images.sld[1] + 'px';
      z.sldB.style.display = q.slider ? 'block' : 'none';
      z.sldB.style.position = 'absolute';
      z.sldB.style.right = q.pickerFace + 'px';
      z.sldB.style.top = q.pickerFace + 'px';
      z.sldB.style.border = q.pickerInset + 'px solid';
      z.sldB.style.borderColor = q.pickerInsetColor;
      z.sldM.style.display = q.slider ? 'block' : 'none';
      z.sldM.style.position = 'absolute';
      z.sldM.style.right = '0';
      z.sldM.style.top = '0';
      z.sldM.style.width = mxJSColor.images.sld[0] + mxJSColor.images.arrow[0] + q.pickerFace + 2 * q.pickerInset + 'px';
      z.sldM.style.height = z.box.style.height;
      try {
        z.sldM.style.cursor = 'pointer';
      } catch (I) {
        z.sldM.style.cursor = 'hand';
      }
      z.btn.style.display = q.pickerClosable ? 'block' : 'none';
      z.btn.style.position = 'absolute';
      z.btn.style.left = q.pickerFace + 'px';
      z.btn.style.bottom = q.pickerFace + 'px';
      z.btn.style.padding = '0 15px';
      z.btn.style.height = '18px';
      z.btn.style.border = q.pickerInset + 'px solid';
      (function() {
        var I = q.pickerInsetColor.split(/\s+/);
        z.btn.style.borderColor = 2 > I.length ? I[0] : I[1] + ' ' + I[0] + ' ' + I[0] + ' ' + I[1];
      }());
      z.btn.style.color = q.pickerButtonColor;
      z.btn.style.font = '12px sans-serif';
      z.btn.style.textAlign = 'center';
      try {
        z.btn.style.cursor = 'pointer';
      } catch (I) {
        z.btn.style.cursor = 'hand';
      }
      z.btn.onmousedown = function() {
        q.hidePicker();
      };
      z.btnS.style.lineHeight = z.btn.style.height;
      switch (t) {
        case 0:
          var J = 'hs.png';
          break;
        case 1:
          J = 'hv.png';
      }
      z.padM.style.backgroundImage = 'url(data:image/gif;base64,R0lGODlhDwAPAKEBAAAAAP///////////yH5BAEKAAIALAAAAAAPAA8AAAIklB8Qx53b4otSUWcvyiz4/4AeQJbmKY4p1HHapBlwPL/uVRsFADs=)';
      z.padM.style.backgroundRepeat = 'no-repeat';
      z.sldM.style.backgroundImage = 'url(data:image/gif;base64,R0lGODlhBwALAKECAAAAAP///6g8eKg8eCH5BAEKAAIALAAAAAAHAAsAAAITTIQYcLnsgGxvijrxqdQq6DRJAQA7)';
      z.sldM.style.backgroundRepeat = 'no-repeat';
      z.pad.style.backgroundImage = 'url(\'' + mxJSColor.getDir() + J + '\')';
      z.pad.style.backgroundRepeat = 'no-repeat';
      z.pad.style.backgroundPosition = '0 0';
      f();
      g();
      mxJSColor.picker.owner = q;
      document.getElementsByTagName('body')[0].appendChild(z.boxB);
    }

    function e(y) {
      return [
        2 * y.pickerInset + 2 * y.pickerFace + mxJSColor.images.pad[0] + (y.slider ? 2 * y.pickerInset + 2 * mxJSColor.images.arrow[0] + mxJSColor.images.sld[0] : 0),
        y.pickerClosable ? 4 * y.pickerInset + 3 * y.pickerFace + mxJSColor.images.pad[1] + y.pickerButtonHeight : 2 * y.pickerInset + 2 * y.pickerFace + mxJSColor.images.pad[1]
      ];
    }

    function f() {
      switch (t) {
        case 0:
          var y = 1;
          break;
        case 1:
          y = 2;
      }
      mxJSColor.picker.padM.style.backgroundPosition = q.pickerFace + q.pickerInset + Math.round(q.hsv[0] / 6 * (mxJSColor.images.pad[0] - 1)) - Math.floor(mxJSColor.images.cross[0] / 2) + 'px ' + (q.pickerFace + q.pickerInset + Math.round((1 - q.hsv[y]) * (mxJSColor.images.pad[1] - 1)) - Math.floor(mxJSColor.images.cross[1] / 2)) + 'px';
      y = mxJSColor.picker.sld.childNodes;
      switch (t) {
        case 0:
          for (var F = c(q.hsv[0], q.hsv[1], 1), H = 0; H < y.length; H += 1)
            y[H].style.backgroundColor = 'rgb(' + F[0] * (1 - H / y.length) * 100 + '%,' + F[1] * (1 - H / y.length) * 100 + '%,' + F[2] * (1 - H / y.length) * 100 + '%)';
          break;
        case 1:
          var G = [
            q.hsv[2],
            0,
            0
          ];
          H = Math.floor(q.hsv[0]);
          var z = H % 2 ? q.hsv[0] - H : 1 - (q.hsv[0] - H);
          switch (H) {
            case 6:
            case 0:
              F = [
                0,
                1,
                2
              ];
              break;
            case 1:
              F = [
                1,
                0,
                2
              ];
              break;
            case 2:
              F = [
                2,
                0,
                1
              ];
              break;
            case 3:
              F = [
                2,
                1,
                0
              ];
              break;
            case 4:
              F = [
                1,
                2,
                0
              ];
              break;
            case 5:
              F = [
                0,
                2,
                1
              ];
          }
          for (H = 0; H < y.length; H += 1) {
            var J = 1 - 1 / (y.length - 1) * H;
            G[1] = G[0] * (1 - J * z);
            G[2] = G[0] * (1 - J);
            y[H].style.backgroundColor = 'rgb(' + 100 * G[F[0]] + '%,' + 100 * G[F[1]] + '%,' + 100 * G[F[2]] + '%)';
          }
      }
    }

    function g() {
      switch (t) {
        case 0:
          var y = 2;
          break;
        case 1:
          y = 1;
      }
      mxJSColor.picker.sldM.style.backgroundPosition = '0 ' + (q.pickerFace + q.pickerInset + Math.round((1 - q.hsv[y]) * (mxJSColor.images.sld[1] - 1)) - Math.floor(mxJSColor.images.arrow[1] / 2)) + 'px';
    }

    function k() {
      return mxJSColor.picker && mxJSColor.picker.owner === q;
    }

    function l() {
      u !== a && q.importColor();
    }

    function m(y) {
      var F = mxJSColor.getRelMousePos(y);
      y = F.x - q.pickerFace - q.pickerInset;
      F = F.y - q.pickerFace - q.pickerInset;
      switch (t) {
        case 0:
          q.fromHSV(6 / (mxJSColor.images.pad[0] - 1) * y, 1 - F / (mxJSColor.images.pad[1] - 1), null, v);
          break;
        case 1:
          q.fromHSV(6 / (mxJSColor.images.pad[0] - 1) * y, null, 1 - F / (mxJSColor.images.pad[1] - 1), v);
      }
    }

    function n(y) {
      y = mxJSColor.getRelMousePos(y).y - q.pickerFace - q.pickerInset;
      switch (t) {
        case 0:
          q.fromHSV(null, null, 1 - y / (mxJSColor.images.sld[1] - 1), B);
          break;
        case 1:
          q.fromHSV(null, 1 - y / (mxJSColor.images.sld[1] - 1), null, B);
      }
    }

    function p() {
      if (q.onImmediateChange && 'string' !== typeof q.onImmediateChange)
        q.onImmediateChange(q);
    }
    this.adjust = this.required = !0;
    this.hash = !1;
    this.slider = this.caps = !0;
    this.styleElement = this.valueElement = a;
    this.onImmediateChange = null;
    this.hsv = [
      0,
      0,
      1
    ];
    this.rgb = [
      1,
      1,
      1
    ];
    this.pickerOnfocus = !0;
    this.pickerMode = 'HSV';
    this.pickerPosition = 'bottom';
    this.pickerSmartPosition = !0;
    this.pickerButtonHeight = 20;
    this.pickerClosable = !1;
    this.pickerCloseText = 'Close';
    this.pickerButtonColor = 'ButtonText';
    this.pickerFace = 0;
    this.pickerFaceColor = 'ThreeDFace';
    this.pickerBorder = 1;
    this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight';
    this.pickerInset = 1;
    this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow';
    this.pickerZIndex = 10000;
    for (var r in b)
      b.hasOwnProperty(r) && (this[r] = b[r]);
    this.hidePicker = function() {
      k() && (delete mxJSColor.picker.owner, document.getElementsByTagName('body')[0].removeChild(mxJSColor.picker.boxB));
    };
    this.showPicker = function() {
      k() || (mxJSColor.getElementPos(a), mxJSColor.getElementSize(a), mxJSColor.getViewPos(), mxJSColor.getViewSize(), e(this), this.pickerPosition.toLowerCase(), d(0, 0));
    };
    this.importColor = function() {
      u ? this.adjust ? !this.required && /^\s*$/.test(u.value) ? (u.value = '', x.style.backgroundImage = x.jscStyle.backgroundImage, x.style.backgroundColor = x.jscStyle.backgroundColor, x.style.color = x.jscStyle.color, this.exportColor(C | D)) : this.fromString(u.value) || this.exportColor() : this.fromString(u.value, C) || (x.style.backgroundImage = x.jscStyle.backgroundImage, x.style.backgroundColor = x.jscStyle.backgroundColor, x.style.color = x.jscStyle.color, this.exportColor(C | D)) : this.exportColor();
    };
    this.exportColor = function(y) {
      if (!(y & C) && u) {
        var F = this.toString();
        this.caps && (F = F.toUpperCase());
        this.hash && (F = '#' + F);
        u.value = F;
      }
      y & D || !x || (x.style.backgroundImage = 'none', x.style.backgroundColor = '#' + this.toString(), x.style.color = 0.5 > 0.213 * this.rgb[0] + 0.715 * this.rgb[1] + 0.072 * this.rgb[2] ? '#FFF' : '#000');
      y & B || !k() || f();
      y & v || !k() || g();
    };
    this.fromHSV = function(y, F, H, G) {
      0 > y && (y = 0);
      6 < y && (y = 6);
      0 > F && (F = 0);
      1 < F && (F = 1);
      0 > H && (H = 0);
      1 < H && (H = 1);
      this.rgb = c(null === y ? this.hsv[0] : this.hsv[0] = y, null === F ? this.hsv[1] : this.hsv[1] = F, null === H ? this.hsv[2] : this.hsv[2] = H);
      this.exportColor(G);
    };
    this.fromRGB = function(y, F, H, G) {
      0 > y && (y = 0);
      1 < y && (y = 1);
      0 > F && (F = 0);
      1 < F && (F = 1);
      0 > H && (H = 0);
      1 < H && (H = 1);
      y = null === y ? this.rgb[0] : this.rgb[0] = y;
      F = null === F ? this.rgb[1] : this.rgb[1] = F;
      var z = null === H ? this.rgb[2] : this.rgb[2] = H,
        J = Math.min(Math.min(y, F), z);
      H = Math.max(Math.max(y, F), z);
      var I = H - J;
      0 === I ? y = [
        null,
        0,
        H
      ] : (y = y === J ? 3 + (z - F) / I : F === J ? 5 + (y - z) / I : 1 + (F - y) / I, y = [
        6 === y ? 0 : y,
        I / H,
        H
      ]);
      null !== y[0] && (this.hsv[0] = y[0]);
      0 !== y[2] && (this.hsv[1] = y[1]);
      this.hsv[2] = y[2];
      this.exportColor(G);
    };
    this.fromString = function(y, F) {
      return (y = y.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i)) ? (6 === y[1].length ? this.fromRGB(parseInt(y[1].substr(0, 2), 16) / 255, parseInt(y[1].substr(2, 2), 16) / 255, parseInt(y[1].substr(4, 2), 16) / 255, F) : this.fromRGB(parseInt(y[1].charAt(0) + y[1].charAt(0), 16) / 255, parseInt(y[1].charAt(1) + y[1].charAt(1), 16) / 255, parseInt(y[1].charAt(2) + y[1].charAt(2), 16) / 255, F), !0) : !1;
    };
    this.toString = function() {
      return (256 | Math.round(255 * this.rgb[0])).toString(16).substr(1) + (256 | Math.round(255 * this.rgb[1])).toString(16).substr(1) + (256 | Math.round(255 * this.rgb[2])).toString(16).substr(1);
    };
    var q = this,
      t = 'hvs' === this.pickerMode.toLowerCase() ? 1 : 0,
      u = mxJSColor.fetchElement(this.valueElement),
      x = mxJSColor.fetchElement(this.styleElement),
      A = !1,
      E = !1,
      C = 1,
      D = 2,
      B = 4,
      v = 8;
    u && (b = function() {
      q.fromString(u.value, C);
      p();
    }, mxJSColor.addEvent(u, 'keyup', b), mxJSColor.addEvent(u, 'input', b), mxJSColor.addEvent(u, 'blur', l), u.setAttribute('autocomplete', 'off'));
    x && (x.jscStyle = {
      backgroundImage: x.style.backgroundImage,
      backgroundColor: x.style.backgroundColor,
      color: x.style.color
    });
    switch (t) {
      case 0:
        mxJSColor.requireImage('hs.png');
        break;
      case 1:
        mxJSColor.requireImage('hv.png');
    }
    this.importColor();
  }
};
mxJSColor.install();