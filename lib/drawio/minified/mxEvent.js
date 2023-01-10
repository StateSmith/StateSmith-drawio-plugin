var mxEvent = {
  addListener: function() {
    if (window.addEventListener) {
      var a = !1;
      try {
        document.addEventListener('test', function() {}, Object.defineProperty && Object.defineProperty({}, 'passive', {
          get: function() {
            a = !0;
          }
        }));
      } catch (b) {}
      return function(b, c, d) {
        b.addEventListener(c, d, a ? {
          passive: !1
        } : !1);
        null == b.mxListenerList && (b.mxListenerList = []);
        b.mxListenerList.push({
          name: c,
          f: d
        });
      };
    }
    return function(b, c, d) {
      b.attachEvent('on' + c, d);
      null == b.mxListenerList && (b.mxListenerList = []);
      b.mxListenerList.push({
        name: c,
        f: d
      });
    };
  }(),
  removeListener: function() {
    var a = function(b, c, d) {
      if (null != b.mxListenerList) {
        c = b.mxListenerList.length;
        for (var e = 0; e < c; e++)
          if (b.mxListenerList[e].f == d) {
            b.mxListenerList.splice(e, 1);
            break;
          }
        0 == b.mxListenerList.length && (b.mxListenerList = null);
      }
    };
    return window.removeEventListener ? function(b, c, d) {
      b.removeEventListener(c, d, !1);
      a(b, c, d);
    } : function(b, c, d) {
      b.detachEvent('on' + c, d);
      a(b, c, d);
    };
  }(),
  removeAllListeners: function(a) {
    var b = a.mxListenerList;
    if (null != b)
      for (; 0 < b.length;) {
        var c = b[0];
        mxEvent.removeListener(a, c.name, c.f);
      }
  },
  addGestureListeners: function(a, b, c, d) {
    null != b && mxEvent.addListener(a, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', b);
    null != c && mxEvent.addListener(a, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', c);
    null != d && mxEvent.addListener(a, mxClient.IS_POINTER ? 'pointerup' : 'mouseup', d);
    !mxClient.IS_POINTER && mxClient.IS_TOUCH && (null != b && mxEvent.addListener(a, 'touchstart', b), null != c && mxEvent.addListener(a, 'touchmove', c), null != d && mxEvent.addListener(a, 'touchend', d));
  },
  removeGestureListeners: function(a, b, c, d) {
    null != b && mxEvent.removeListener(a, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', b);
    null != c && mxEvent.removeListener(a, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', c);
    null != d && mxEvent.removeListener(a, mxClient.IS_POINTER ? 'pointerup' : 'mouseup', d);
    !mxClient.IS_POINTER && mxClient.IS_TOUCH && (null != b && mxEvent.removeListener(a, 'touchstart', b), null != c && mxEvent.removeListener(a, 'touchmove', c), null != d && mxEvent.removeListener(a, 'touchend', d));
  },
  redirectMouseEvents: function(a, b, c, d, e, f, g) {
    var k = function(l) {
      return 'function' == typeof c ? c(l) : c;
    };
    mxEvent.addGestureListeners(a, function(l) {
      null != d ? d(l) : mxEvent.isConsumed(l) || b.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(l, k(l)));
    }, function(l) {
      null != e ? e(l) : mxEvent.isConsumed(l) || b.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(l, k(l)));
    }, function(l) {
      null != f ? f(l) : mxEvent.isConsumed(l) || b.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(l, k(l)));
    });
    mxEvent.addListener(a, 'dblclick', function(l) {
      if (null != g)
        g(l);
      else if (!mxEvent.isConsumed(l)) {
        var m = k(l);
        b.dblClick(l, null != m ? m.cell : null);
      }
    });
  },
  release: function(a) {
    try {
      if (null != a) {
        mxEvent.removeAllListeners(a);
        var b = a.childNodes;
        if (null != b) {
          var c = b.length;
          for (a = 0; a < c; a += 1)
            mxEvent.release(b[a]);
        }
      }
    } catch (d) {}
  },
  addMouseWheelListener: function(a, b) {
    if (null != a) {
      b = null != b ? b : window;
      if (mxClient.IS_SF && !mxClient.IS_TOUCH) {
        var c = 1;
        mxEvent.addListener(b, 'gesturestart', function(g) {
          mxEvent.consume(g);
          c = 1;
        });
        mxEvent.addListener(b, 'gesturechange', function(g) {
          mxEvent.consume(g);
          var k = c - g.scale;
          0.2 < Math.abs(k) && (a(g, 0 > k, !0), c = g.scale);
        });
        mxEvent.addListener(b, 'gestureend', function(g) {
          mxEvent.consume(g);
        });
      } else {
        var d = [],
          e = 0,
          f = 0;
        mxEvent.addGestureListeners(b, mxUtils.bind(this, function(g) {
          mxEvent.isMouseEvent(g) || null == g.pointerId || d.push(g);
        }), mxUtils.bind(this, function(g) {
          if (!mxEvent.isMouseEvent(g) && 2 == d.length) {
            for (var k = 0; k < d.length; k++)
              if (g.pointerId == d[k].pointerId) {
                d[k] = g;
                break;
              }
            g = Math.abs(d[0].clientX - d[1].clientX);
            k = Math.abs(d[0].clientY - d[1].clientY);
            var l = Math.abs(g - e),
              m = Math.abs(k - f);
            if (l > mxEvent.PINCH_THRESHOLD || m > mxEvent.PINCH_THRESHOLD)
              a(d[0], l > m ? g > e : k > f, !0, d[0].clientX + (d[1].clientX - d[0].clientX) / 2, d[0].clientY + (d[1].clientY - d[0].clientY) / 2), e = g, f = k;
          }
        }), mxUtils.bind(this, function(g) {
          d = [];
          f = e = 0;
        }));
      }
      mxEvent.addListener(b, 'wheel', function(g) {
        null == g && (g = window.event);
        g.ctrlKey && g.preventDefault();
        (0.5 < Math.abs(g.deltaX) || 0.5 < Math.abs(g.deltaY)) && a(g, 0 == g.deltaY ? 0 < -g.deltaX : 0 < -g.deltaY);
      });
    }
  },
  disableContextMenu: function(a) {
    mxEvent.addListener(a, 'contextmenu', function(b) {
      b.preventDefault && b.preventDefault();
      return !1;
    });
  },
  getSource: function(a) {
    return null != a.srcElement ? a.srcElement : a.target;
  },
  isConsumed: function(a) {
    return null != a.isConsumed && a.isConsumed;
  },
  isTouchEvent: function(a) {
    return null != a.pointerType ? 'touch' == a.pointerType || a.pointerType === a.MSPOINTER_TYPE_TOUCH : null != a.mozInputSource ? 5 == a.mozInputSource : 0 == a.type.indexOf('touch');
  },
  isPenEvent: function(a) {
    return null != a.pointerType ? 'pen' == a.pointerType || a.pointerType === a.MSPOINTER_TYPE_PEN : null != a.mozInputSource ? 2 == a.mozInputSource : 0 == a.type.indexOf('pen');
  },
  isMultiTouchEvent: function(a) {
    return null != a.type && 0 == a.type.indexOf('touch') && null != a.touches && 1 < a.touches.length;
  },
  isMouseEvent: function(a) {
    return !mxClient.IS_ANDROID && mxClient.IS_LINUX && mxClient.IS_GC ? !0 : null != a.pointerType ? 'mouse' == a.pointerType || a.pointerType === a.MSPOINTER_TYPE_MOUSE : null != a.mozInputSource ? 1 == a.mozInputSource : 0 == a.type.indexOf('mouse');
  },
  isLeftMouseButton: function(a) {
    return 'buttons' in a && ('mousedown' == a.type || 'mousemove' == a.type) ? 1 == a.buttons : 'which' in a ? 1 === a.which : 1 === a.button;
  },
  isMiddleMouseButton: function(a) {
    return 'which' in a ? 2 === a.which : 4 === a.button;
  },
  isRightMouseButton: function(a) {
    return 'which' in a ? 3 === a.which : 2 === a.button;
  },
  isPopupTrigger: function(a) {
    return mxEvent.isRightMouseButton(a) || mxClient.IS_MAC && mxEvent.isControlDown(a) && !mxEvent.isShiftDown(a) && !mxEvent.isMetaDown(a) && !mxEvent.isAltDown(a);
  },
  isShiftDown: function(a) {
    return null != a ? a.shiftKey : !1;
  },
  isAltDown: function(a) {
    return null != a ? a.altKey : !1;
  },
  isControlDown: function(a) {
    return null != a ? a.ctrlKey : !1;
  },
  isMetaDown: function(a) {
    return null != a ? a.metaKey : !1;
  },
  getMainEvent: function(a) {
    'touchstart' != a.type && 'touchmove' != a.type || null == a.touches || null == a.touches[0] ? 'touchend' == a.type && null != a.changedTouches && null != a.changedTouches[0] && (a = a.changedTouches[0]) : a = a.touches[0];
    return a;
  },
  getClientX: function(a) {
    return mxEvent.getMainEvent(a).clientX;
  },
  getClientY: function(a) {
    return mxEvent.getMainEvent(a).clientY;
  },
  consume: function(a, b, c) {
    c = null != c ? c : !0;
    if (null != b ? b : 1)
      a.preventDefault ? (c && a.stopPropagation(), a.preventDefault()) : c && (a.cancelBubble = !0);
    a.isConsumed = !0;
    a.preventDefault || (a.returnValue = !1);
  },
  LABEL_HANDLE: -1,
  ROTATION_HANDLE: -2,
  CUSTOM_HANDLE: -100,
  VIRTUAL_HANDLE: -100000,
  MOUSE_DOWN: 'mouseDown',
  MOUSE_MOVE: 'mouseMove',
  MOUSE_UP: 'mouseUp',
  ACTIVATE: 'activate',
  RESIZE_START: 'resizeStart',
  RESIZE: 'resize',
  RESIZE_END: 'resizeEnd',
  MOVE_START: 'moveStart',
  MOVE: 'move',
  MOVE_END: 'moveEnd',
  PAN_START: 'panStart',
  PAN: 'pan',
  PAN_END: 'panEnd',
  MINIMIZE: 'minimize',
  NORMALIZE: 'normalize',
  MAXIMIZE: 'maximize',
  HIDE: 'hide',
  SHOW: 'show',
  CLOSE: 'close',
  DESTROY: 'destroy',
  REFRESH: 'refresh',
  SIZE: 'size',
  SELECT: 'select',
  FIRED: 'fired',
  FIRE_MOUSE_EVENT: 'fireMouseEvent',
  GESTURE: 'gesture',
  TAP_AND_HOLD: 'tapAndHold',
  GET: 'get',
  RECEIVE: 'receive',
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  SUSPEND: 'suspend',
  RESUME: 'resume',
  MARK: 'mark',
  ROOT: 'root',
  POST: 'post',
  OPEN: 'open',
  SAVE: 'save',
  BEFORE_ADD_VERTEX: 'beforeAddVertex',
  ADD_VERTEX: 'addVertex',
  AFTER_ADD_VERTEX: 'afterAddVertex',
  DONE: 'done',
  EXECUTE: 'execute',
  EXECUTED: 'executed',
  BEGIN_UPDATE: 'beginUpdate',
  START_EDIT: 'startEdit',
  END_UPDATE: 'endUpdate',
  END_EDIT: 'endEdit',
  BEFORE_UNDO: 'beforeUndo',
  UNDO: 'undo',
  REDO: 'redo',
  CHANGE: 'change',
  NOTIFY: 'notify',
  LAYOUT_CELLS: 'layoutCells',
  CLICK: 'click',
  SCALE: 'scale',
  TRANSLATE: 'translate',
  SCALE_AND_TRANSLATE: 'scaleAndTranslate',
  UP: 'up',
  DOWN: 'down',
  ADD: 'add',
  REMOVE: 'remove',
  CLEAR: 'clear',
  ADD_CELLS: 'addCells',
  CELLS_ADDED: 'cellsAdded',
  MOVE_CELLS: 'moveCells',
  CELLS_MOVED: 'cellsMoved',
  RESIZE_CELLS: 'resizeCells',
  CELLS_RESIZED: 'cellsResized',
  TOGGLE_CELLS: 'toggleCells',
  CELLS_TOGGLED: 'cellsToggled',
  ORDER_CELLS: 'orderCells',
  CELLS_ORDERED: 'cellsOrdered',
  REMOVE_CELLS: 'removeCells',
  CELLS_REMOVED: 'cellsRemoved',
  GROUP_CELLS: 'groupCells',
  UNGROUP_CELLS: 'ungroupCells',
  REMOVE_CELLS_FROM_PARENT: 'removeCellsFromParent',
  FOLD_CELLS: 'foldCells',
  CELLS_FOLDED: 'cellsFolded',
  ALIGN_CELLS: 'alignCells',
  LABEL_CHANGED: 'labelChanged',
  CONNECT_CELL: 'connectCell',
  CELL_CONNECTED: 'cellConnected',
  SPLIT_EDGE: 'splitEdge',
  FLIP_EDGE: 'flipEdge',
  START_EDITING: 'startEditing',
  EDITING_STARTED: 'editingStarted',
  EDITING_STOPPED: 'editingStopped',
  ADD_OVERLAY: 'addOverlay',
  REMOVE_OVERLAY: 'removeOverlay',
  UPDATE_CELL_SIZE: 'updateCellSize',
  ESCAPE: 'escape',
  DOUBLE_CLICK: 'doubleClick',
  START: 'start',
  RESET: 'reset',
  PINCH_THRESHOLD: 10
};