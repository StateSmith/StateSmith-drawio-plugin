function mxFreehand(b) {
  var e = null != b.view && null != b.view.canvas ? b.view.canvas.ownerSVGElement : null;
  if (null != b.container && null != e) {
    b.addListener(mxEvent.ESCAPE, mxUtils.bind(this, function() {
      this.stopDrawing();
    }));
    var f = mxFreehand.prototype.NORMAL_SMOOTHING,
      c = null,
      k = [],
      m, t = [],
      y, E = !1,
      z = !0,
      D = !0,
      J = !0,
      G = !0,
      d = [],
      g = !1,
      n = !1,
      v = !1,
      u = {
        size: 5,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
        start: {
          taper: 0,
          cap: !0
        },
        end: {
          taper: 0,
          cap: !0
        }
      },
      x = !0;
    this.setClosedPath = function(K) {
      E = K;
    };
    this.setAutoClose = function(K) {
      z = K;
    };
    this.setAutoInsert = function(K) {
      D = K;
    };
    this.setAutoScroll = function(K) {
      J = K;
    };
    this.setOpenFill = function(K) {
      G = K;
    };
    this.setStopClickEnabled = function(K) {
      n = K;
    };
    this.setSelectInserted = function(K) {
      v = K;
    };
    this.setSmoothing = function(K) {
      f = K;
    };
    this.setPerfectFreehandMode = function(K) {
      x = K;
    };
    this.isPerfectFreehandMode = function() {
      return x;
    };
    this.setBrushSize = function(K) {
      u.size = K;
    };
    this.getBrushSize = function() {
      return u.size;
    };
    var C = function(K) {
      g = K;
      b.getRubberband().setEnabled(!K);
      b.graphHandler.setSelectEnabled(!K);
      b.graphHandler.setMoveEnabled(!K);
      b.container.style.cursor = K ? 'crosshair' : '';
      b.fireEvent(new mxEventObject('freehandStateChanged'));
    };
    this.startDrawing = function() {
      C(!0);
    };
    this.isDrawing = function() {
      return g;
    };
    var F = mxUtils.bind(this, function(K) {
        if (c) {
          var M = y.length,
            I = n && 0 < t.length && null != y && 2 > y.length;
          I || t.push.apply(t, y);
          y = [];
          t.push(null);
          k.push(c);
          c = null;
          (I || D) && this.stopDrawing();
          D && (!I || 2 <= M) && this.startDrawing();
          mxEvent.consume(K);
        }
      }),
      L = new mxCell();
    L.edge = !0;
    var l = function() {
      var K = b.getCurrentCellStyle(L);
      K = mxUtils.getValue(b.currentVertexStyle, mxConstants.STYLE_STROKECOLOR, mxUtils.getValue(K, mxConstants.STYLE_STROKECOLOR, '#000'));
      'default' == K && (K = b.shapeForegroundColor);
      return K;
    };
    this.createStyle = function(K) {
      var M = ';fillColor=none;';
      x && (M = ';lineShape=1;');
      return mxConstants.STYLE_SHAPE + '=' + K + M;
    };
    this.stopDrawing = function() {
      if (0 < k.length) {
        if (x) {
          for (var K = [], M = 0; M < t.length; M++)
            null != t[M] && K.push([
              t[M].x,
              t[M].y
            ]);
          K = PerfectFreehand.getStroke(K, u);
          t = [];
          for (M = 0; M < K.length; M++)
            t.push({
              x: K[M][0],
              y: K[M][1]
            });
          t.push(null);
        }
        K = t[0].x;
        var I = t[0].x,
          Q = t[0].y,
          P = t[0].y;
        for (M = 1; M < t.length; M++)
          null != t[M] && (K = Math.max(K, t[M].x), I = Math.min(I, t[M].x), Q = Math.max(Q, t[M].y), P = Math.min(P, t[M].y));
        K -= I;
        Q -= P;
        if (0 < K && 0 < Q) {
          var O = 100 / K,
            W = 100 / Q;
          t.map(function(R) {
            if (null == R)
              return R;
            R.x = (R.x - I) * O;
            R.y = (R.y - P) * W;
            return R;
          });
          var p = '<shape strokewidth="inherit"><foreground>',
            B = 0;
          for (M = 0; M < t.length; M++) {
            var N = t[M];
            if (null == N) {
              N = !1;
              B = t[B];
              var S = t[M - 1];
              !E && z && (N = B.x - S.x, S = B.y - S.y, N = Math.sqrt(N * N + S * S) <= b.tolerance);
              if (E || N)
                p += '<line x="' + B.x.toFixed(2) + '" y="' + B.y.toFixed(2) + '"/>';
              p += '</path>' + (G || E || N ? '<fillstroke/>' : '<stroke/>');
              B = M + 1;
            } else
              p = M == B ? p + ('<path><move x="' + N.x.toFixed(2) + '" y="' + N.y.toFixed(2) + '"/>') : p + ('<line x="' + N.x.toFixed(2) + '" y="' + N.y.toFixed(2) + '"/>');
          }
          p += '</foreground></shape>';
          if (b.isEnabled() && !b.isCellLocked(b.getDefaultParent())) {
            M = this.createStyle('stencil(' + Graph.compress(p) + ')');
            p = b.view.scale;
            B = b.view.translate;
            M = new mxCell('', new mxGeometry(I / p - B.x, P / p - B.y, K / p, Q / p), M);
            M.vertex = 1;
            b.model.beginUpdate();
            try {
              M = b.addCell(M), b.fireEvent(new mxEventObject('cellsInserted', 'cells', [M])), b.fireEvent(new mxEventObject('freehandInserted', 'cell', M));
            } finally {
              b.model.endUpdate();
            }
            v && b.setSelectionCells([M]);
          }
        }
        for (M = 0; M < k.length; M++)
          k[M].parentNode.removeChild(k[M]);
        c = null;
        k = [];
        t = [];
      }
      C(!1);
    };
    b.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function(K, M) {
      K = M.getProperty('eventName');
      M = M.getProperty('event');
      K == mxEvent.MOUSE_MOVE && g && (null != M.sourceState && M.sourceState.setCursor('crosshair'), M.consume());
    }));
    b.addMouseListener({
      mouseDown: mxUtils.bind(this, function(K, M) {
        if (b.isEnabled() && !b.isCellLocked(b.getDefaultParent()) && (K = M.getEvent(), g && !mxEvent.isPopupTrigger(K) && !mxEvent.isMultiTouchEvent(K))) {
          var I = parseFloat(b.currentVertexStyle[mxConstants.STYLE_STROKEWIDTH] || 1);
          I = Math.max(1, I * b.view.scale);
          var Q = l();
          c = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          c.setAttribute('fill', x ? Q : 'none');
          c.setAttribute('stroke', Q);
          c.setAttribute('stroke-width', I);
          '1' == b.currentVertexStyle[mxConstants.STYLE_DASHED] && (Q = b.currentVertexStyle[mxConstants.STYLE_DASH_PATTERN] || '3 3', Q = Q.split(' ').map(function(P) {
            return parseFloat(P) * I;
          }).join(' '), c.setAttribute('stroke-dasharray', Q));
          d = [];
          K = q(K);
          A(K);
          m = 'M' + K.x + ' ' + K.y;
          t.push(K);
          y = [];
          c.setAttribute('d', x ? PerfectFreehand.getSvgPathFromStroke([
            [
              K.x,
              K.y
            ]
          ], u) : m);
          e.appendChild(c);
          M.consume();
        }
      }),
      mouseMove: mxUtils.bind(this, function(K, M) {
        if (c && b.isEnabled() && !b.isCellLocked(b.getDefaultParent())) {
          K = M.getEvent();
          K = q(K);
          A(K);
          var I = H(0);
          if (I)
            if (t.push(I), x) {
              var Q = [];
              for (I = 0; I < t.length; I++)
                Q.push([
                  t[I].x,
                  t[I].y
                ]);
              y = [];
              for (var P = 2; P < d.length; P += 2)
                I = H(P), Q.push([
                  I.x,
                  I.y
                ]), y.push(I);
              c.setAttribute('d', PerfectFreehand.getSvgPathFromStroke(Q, u));
            } else {
              m += ' L' + I.x + ' ' + I.y;
              Q = '';
              y = [];
              for (P = 2; P < d.length; P += 2)
                I = H(P), Q += ' L' + I.x + ' ' + I.y, y.push(I);
              c.setAttribute('d', m + Q);
            }
          J && (I = b.view.translate, b.scrollRectToVisible(new mxRectangle(K.x - I.x, K.y - I.y).grow(20)));
          M.consume();
        }
      }),
      mouseUp: mxUtils.bind(this, function(K, M) {
        c && b.isEnabled() && !b.isCellLocked(b.getDefaultParent()) && (F(M.getEvent()), M.consume());
      })
    });
    var q = function(K) {
        return mxUtils.convertPoint(b.container, mxEvent.getClientX(K), mxEvent.getClientY(K));
      },
      A = function(K) {
        for (d.push(K); d.length > f;)
          d.shift();
      },
      H = function(K) {
        var M = d.length;
        if (1 === M % 2 || M >= f) {
          var I = 0,
            Q = 0,
            P, O = 0;
          for (P = K; P < M; P++)
            O++, K = d[P], I += K.x, Q += K.y;
          return {
            x: I / O,
            y: Q / O
          };
        }
        return null;
      };
  }
}
mxFreehand.prototype.NO_SMOOTHING = 1;
mxFreehand.prototype.MILD_SMOOTHING = 4;
mxFreehand.prototype.NORMAL_SMOOTHING = 8;
mxFreehand.prototype.VERY_SMOOTH_SMOOTHING = 12;
mxFreehand.prototype.SUPER_SMOOTH_SMOOTHING = 16;
mxFreehand.prototype.HYPER_SMOOTH_SMOOTHING = 20;