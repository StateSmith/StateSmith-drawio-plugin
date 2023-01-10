function P2PCollab(b, e, f) {
  function c(O, W) {
    try {
      if (!H) {
        var p = e.file.getCurrentUser();
        if (A && null != p && null != p.displayName) {
          var B = {
            from: F,
            id: n,
            type: O,
            sessionId: e.clientId,
            userId: p.id,
            username: p.displayName,
            data: W,
            protocol: DrawioFileSync.PROTOCOL,
            editor: EditorUi.VERSION
          };
          B = {
            bytes: e.objectToString(B),
            data: 'aes'
          };
          B = JSON.stringify(B);
          K && 'cursor' != O && EditorUi.debug('P2PCollab: sending to socket server', [B]);
          n++;
          O = !K && ('cursor' == O || 'selectionChange' == O);
          q && !O && P('message', B);
          if (O)
            for (p2pId in l)
              l[p2pId].send(B);
        }
      }
    } catch (N) {
      null != window.console && console.log('Error:', N);
    }
  }

  function k(O) {
    if (b.shareCursorPosition && !D.isMouseDown) {
      var W = mxUtils.getOffset(D.container),
        p = D.view.translate,
        B = D.view.scale,
        N = null != b.currentPage ? b.currentPage.getId() : null;
      c('cursor', {
        pageId: N,
        x: Math.round((O.getX() - W.x + D.container.scrollLeft) / B - p.x),
        y: Math.round((O.getY() - W.y + D.container.scrollTop) / B - p.y)
      });
    }
  }

  function m(O, W) {
    var p = null != b.currentPage ? b.currentPage.getId() : null;
    if (null != O && null != O.cursor && null != O.lastCursor)
      if (null != O.lastCursor.hide || !b.isShowRemoteCursors() || null != O.lastCursor.pageId && O.lastCursor.pageId != p)
        O.cursor.style.display = 'none';
      else {
        p = function() {
          var T = Math.max(D.container.scrollLeft, Math.min(D.container.scrollLeft + D.container.clientWidth - O.cursor.clientWidth, S)),
            U = Math.max(D.container.scrollTop - 22, Math.min(D.container.scrollTop + D.container.clientHeight - O.cursor.clientHeight, R));
          V.style.opacity = T != S || U != R ? 0 : 1;
          O.cursor.style.left = T + 'px';
          O.cursor.style.top = U + 'px';
          O.cursor.style.display = '';
        };
        var B = D.view.translate,
          N = D.view.scale,
          S = (B.x + O.lastCursor.x) * N + 8,
          R = (B.y + O.lastCursor.y) * N - 12,
          V = O.cursor.getElementsByTagName('img')[0];
        W ? (mxUtils.setPrefixedStyle(O.cursor.style, 'transition', 'all 900ms ease-out'), mxUtils.setPrefixedStyle(V.style, 'transition', 'all 900ms ease-out'), window.setTimeout(p, 0)) : (mxUtils.setPrefixedStyle(O.cursor.style, 'transition', null), mxUtils.setPrefixedStyle(V.style, 'transition', null), p());
      }
  }

  function t(O, W) {
    try {
      var p = function() {
        if (null == g[N]) {
          var Y = C[N];
          null == Y && (Y = J % d.length, C[N] = Y, J++);
          var ea = d[Y];
          Y = 11 < Y ? 'black' : 'white';
          g[N] = {
            cursor: document.createElement('div'),
            color: ea,
            selection: {}
          };
          u[W] = N;
          S = g[N].cursor;
          S.style.pointerEvents = 'none';
          S.style.position = 'absolute';
          S.style.display = 'none';
          S.style.opacity = '0.9';
          var aa = document.createElement('img');
          mxUtils.setPrefixedStyle(aa.style, 'transform', 'rotate(-45deg)translateX(-14px)');
          aa.setAttribute('src', Graph.createSvgImage(8, 12, '<path d="M 4 0 L 8 12 L 4 10 L 0 12 Z" stroke="' + ea + '" fill="' + ea + '"/>').src);
          aa.style.width = '10px';
          S.appendChild(aa);
          aa = document.createElement('div');
          aa.style.backgroundColor = ea;
          aa.style.color = Y;
          aa.style.fontSize = '9pt';
          aa.style.padding = '3px 7px';
          aa.style.marginTop = '8px';
          aa.style.borderRadius = '10px';
          aa.style.maxWidth = '100px';
          aa.style.overflow = 'hidden';
          aa.style.textOverflow = 'ellipsis';
          aa.style.whiteSpace = 'nowrap';
          mxUtils.write(aa, B);
          S.appendChild(aa);
          b.diagramContainer.appendChild(S);
        } else
          S = g[N].cursor;
        R = g[N].selection;
      };
      if (!H) {
        O = JSON.parse(O);
        null != O.bytes && (O = e.stringToObject(O.bytes));
        K && 'cursor' != O.type && EditorUi.debug('P2PCollab: msg received', [O]);
        if (null != W) {
          if (O.from == F || v[O.from] >= O.id) {
            EditorUi.debug('P2PCollab: Dropped Message', O, F, v[O.from]);
            return;
          }
          v[O.from] = O.id;
        }
        var B = O.username ? O.username : 'Anonymous',
          N = O.sessionId,
          S, R;
        null != g[N] && (clearTimeout(g[N].inactiveTO), g[N].inactiveTO = setTimeout(function() {
          E(null, N);
        }, 120000));
        var V = O.data;
        switch (O.type) {
          case 'cursor':
            p();
            g[N].lastCursor = V;
            m(g[N], !0);
            break;
          case 'diff':
            try {
              O = null != V.patch ? e.stringToObject(decodeURIComponent(V.patch)) : V.diff, e.receiveRemoteChanges(O.d);
            } catch (Y) {
              EditorUi.debug('P2PCollab: Diff msg error', Y);
            }
            break;
          case 'selectionChange':
            if ('0' != urlParams['remote-selection']) {
              var T = null != b.currentPage ? b.currentPage.getId() : null;
              if (null == T || null != V.pageId && V.pageId == T) {
                p();
                for (p = 0; p < V.removed.length; p++) {
                  var U = V.removed[p];
                  if (null != U) {
                    var X = R[U];
                    delete R[U];
                    null != X && X.destroy();
                  }
                }
                for (p = 0; p < V.added.length; p++)
                  if (U = V.added[p], null != U) {
                    var Z = D.model.getCell(U);
                    null != Z && (R[U] = D.highlightCell(Z, g[N].color, 60000, 70, 3));
                  }
              }
            }
        }
        e.file.fireEvent(new mxEventObject('realtimeMessage', 'message', O));
      }
    } catch (Y) {
      null != window.console && console.log('Error:', Y);
    }
  }

  function y(O, W) {
    if (!K && SimplePeer.WEBRTC_SUPPORT) {
      var p = new SimplePeer({
        initiator: W,
        config: {
          iceServers: [{
            urls: 'stun:54.89.235.160:3478'
          }]
        }
      });
      p.on('signal', function(B) {
        P('sendSignal', {
          to: O,
          from: F,
          signal: B
        });
      });
      p.on('error', function(B) {
        delete L[O];
        EditorUi.debug('P2PCollab: p2p socket error', B);
        !H && W && p.destroyed && x[O] && (EditorUi.debug('P2PCollab: p2p socket reconnecting', O), y(O, !0));
      });
      p.on('connect', function() {
        delete L[O];
        null == l[O] || l[O].destroyed ? (l[O] = p, x[O] = !0, EditorUi.debug('P2PCollab: p2p socket connected', O)) : (p.noP2PMapDel = !0, p.destroy(), EditorUi.debug('P2PCollab: p2p socket duplicate', O));
      });
      p.on('close', function() {
        p.noP2PMapDel || (EditorUi.debug('P2PCollab: p2p socket closed', O), z(u[O]), delete l[O]);
      });
      p.on('data', t);
      return L[O] = p;
    }
  }

  function E(O, W) {
    z(W || u[O]);
    null != O && (delete u[O], x[O] = !1);
  }

  function z(O) {
    var W = g[O];
    if (null != W) {
      var p = W.selection,
        B;
      for (B in p)
        null != p[B] && p[B].destroy();
      null != W.cursor && null != W.cursor.parentNode && W.cursor.parentNode.removeChild(W.cursor);
      clearTimeout(W.inactiveTO);
      delete g[O];
    }
  }
  var D = b.editor.graph,
    J = 0,
    G = null,
    d = '#e6194b #3cb44b #4363d8 #f58231 #911eb4 #f032e6 #469990 #9A6324 #800000 #808000 #000075 #a9a9a9 #ffe119 #42d4f4 #bfef45 #fabed4 #dcbeff #fffac8 #aaffc3 #ffd8b1'.split(' '),
    g = {},
    n = 1,
    v = {},
    u = {},
    x = {},
    C = {},
    F, L = {},
    l = {},
    q = !0,
    A = !1,
    H = !1,
    K = '0' != urlParams['no-p2p'],
    M = !1,
    I = 0,
    Q = null,
    P = mxUtils.bind(this, function(O, W) {
      if (!H)
        try {
          null != G ? (G.send(JSON.stringify({
            action: O,
            msg: W
          })), K || EditorUi.debug('P2PCollab: sending to socket server', [O], [W])) : this.joinFile(!0);
        } catch (p) {
          Q = p, e.file.fireEvent(new mxEventObject('realtimeStateChanged')), EditorUi.debug('P2PCollab:', 'sendReply error', arguments, p);
        }
    });
  this.sendMessage = c;
  this.sendDiff = function(O) {
    this.sendMessage('diff', {
      diff: O
    });
  };
  this.getState = function() {
    return null != G ? G.readyState : 3;
  };
  this.getLastError = function() {
    return Q;
  };
  this.mouseListeners = {
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    mouseDown: function(O, W) {},
    mouseMove: function(O, W) {
      var p, B = -1;
      return function() {
        clearTimeout(p);
        var N = this,
          S = arguments,
          R = function() {
            p = null;
            B = Date.now();
            O.apply(N, S);
          };
        Date.now() - B > W ? R() : p = setTimeout(R, W);
      };
    }(function(O, W) {
      k(W);
    }, 300),
    mouseUp: function(O, W) {
      k(W);
    }
  };
  D.addMouseListener(this.mouseListeners);
  this.shareCursorPositionListener = function() {
    b.isShareCursorPosition() || c('cursor', {
      hide: !0
    });
  };
  b.addListener('shareCursorPositionChanged', this.shareCursorPositionListener);
  this.selectionChangeListener = function(O, W) {
    O = function(N) {
      return null != N ? N.id : null;
    };
    var p = null != b.currentPage ? b.currentPage.getId() : null,
      B = W.getProperty('added');
    W = W.getProperty('removed');
    c('selectionChange', {
      pageId: p,
      removed: B ? B.map(O) : [],
      added: W ? W.map(O) : []
    });
  };
  D.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionChangeListener);
  this.cursorHandler = mxUtils.bind(this, function() {
    for (var O in g)
      m(g[O]);
  });
  mxEvent.addListener(D.container, 'scroll', this.cursorHandler);
  D.getView().addListener(mxEvent.SCALE, this.cursorHandler);
  D.getView().addListener(mxEvent.TRANSLATE, this.cursorHandler);
  D.getView().addListener(mxEvent.SCALE_AND_TRANSLATE, this.cursorHandler);
  b.addListener('showRemoteCursorsChanged', this.cursorHandler);
  b.editor.addListener('pageSelected', this.cursorHandler);
  this.joinFile = function(O) {
    if (!H)
      try {
        M && (EditorUi.debug('P2PCollab: joinInProgress on', M), Q = 'busy');
        M = ++I;
        try {
          null != G && 1 == G.readyState && (EditorUi.debug('P2PCollab: force closing socket on', G.joinId), G.close(1000), G = null);
        } catch (B) {
          EditorUi.debug('P2PCollab: closing socket error', B);
        }
        var W = new WebSocket(window.RT_WEBSOCKET_URL + '?id=' + f);
        null == G && (G = W);
        W.addEventListener('open', function(B) {
          G = W;
          G.joinId = M;
          M = !1;
          e.file.fireEvent(new mxEventObject('realtimeStateChanged'));
          EditorUi.debug('P2PCollab: open socket', G.joinId);
          O && e.scheduleCleanup();
        });
        W.addEventListener('message', mxUtils.bind(this, function(B) {
          K || EditorUi.debug('P2PCollab: msg received', [B]);
          var N = JSON.parse(B.data);
          K && 'message' != N.action && EditorUi.debug('P2PCollab: msg received', [B]);
          switch (N.action) {
            case 'message':
              t(N.msg, N.from);
              break;
            case 'clientsList':
              B = N.msg;
              F = B.cId;
              A = !0;
              for (N = 0; N < B.list.length; N++)
                y(B.list[N], !0);
              break;
            case 'signal':
              B = N.msg;
              K || (L[B.from] ? N = L[B.from] : (N = y(B.from, !1), q = !0), N.signal(B.signal));
              break;
            case 'newClient':
              q = !0;
              break;
            case 'clientLeft':
              E(N.msg);
              break;
            case 'sendSignalFailed':
              B = N.msg, EditorUi.debug('P2PCollab: signal failed (socket not found on server)', B), delete L[B.to], x[B.to] = !1;
          }
        }));
        var p = !1;
        W.addEventListener('close', mxUtils.bind(this, function(B) {
          EditorUi.debug('P2PCollab: WebSocket closed', W.joinId, 'reconnecting', B.code, B.reason);
          EditorUi.debug('P2PCollab: closing socket on', W.joinId);
          H || 1000 == B.code || I != W.joinId || (M == I && (EditorUi.debug('P2PCollab: joinInProgress in close on', W.joinId), M = !1), p || (EditorUi.debug('P2PCollab: calling rejoin on', W.joinId), p = !0, this.joinFile(!0)));
          e.file.fireEvent(new mxEventObject('realtimeStateChanged'));
        }));
        W.addEventListener('error', mxUtils.bind(this, function(B) {
          EditorUi.debug('P2PCollab: WebSocket error, reconnecting', B);
          EditorUi.debug('P2PCollab: error socket on', W.joinId);
          H || I != W.joinId || (M == I && (EditorUi.debug('P2PCollab: joinInProgress in error on', W.joinId), M = !1), p || (EditorUi.debug('P2PCollab: calling rejoin on', W.joinId), p = !0, this.joinFile(!0)));
          e.file.fireEvent(new mxEventObject('realtimeStateChanged'));
        }));
        e.file.fireEvent(new mxEventObject('realtimeStateChanged'));
      } catch (B) {
        Q = B, e.file.fireEvent(new mxEventObject('realtimeStateChanged'));
      }
  };
  this.destroy = function() {
    if (!H) {
      EditorUi.debug('P2PCollab: destroyed');
      H = !0;
      for (sessionId in g)
        z(sessionId);
      null != this.mouseListeners && D.removeMouseListener(this.mouseListeners);
      null != this.selectionChangeListener && D.getSelectionModel().removeListener(this.selectionChangeListener);
      null != this.shareCursorPositionListener && b.removeListener(this.shareCursorPositionListener);
      null != this.cursorHandler && (mxEvent.removeListener(D.container, 'scroll', this.cursorHandler), D.getView().removeListener(mxEvent.SCALE, this.cursorHandler), D.getView().removeListener(mxEvent.TRANSLATE, this.cursorHandler), D.getView().removeListener(mxEvent.SCALE_AND_TRANSLATE, this.cursorHandler), b.editor.removeListener('pageSelected', this.cursorHandler), b.removeListener(this.cursorHandler));
      null != G && 1 <= G.readyState && (G.close(1000), G = null);
      for (var O in l)
        null != l[O] && l[O].destroy();
      e.file.fireEvent(new mxEventObject('realtimeStateChanged'));
    }
  };
};