var ConnectionPointsDialog = function(b, e) {
  function f() {
    null != k && k.destroy();
  }
  var c = document.createElement('div');
  c.style.userSelect = 'none';
  var k = null;
  this.init = function() {
    function m(M, I) {
      M = new mxCell('', new mxGeometry(M, I, 6, 6), 'shape=mxgraph.basic.x;fillColor=#29b6f2;strokeColor=#29b6f2;points=[];rotatable=0;resizable=0;connectable=0;editable=0;');
      M.vertex = !0;
      M.cp = !0;
      return J.addCell(M);
    }

    function t(M) {
      M = J.getSelectionCells();
      J.deleteCells(M);
    }

    function y() {
      var M = parseInt(q.value) || 0;
      M = 0 > M ? 0 : 100 < M ? 100 : M;
      q.value = M;
      var I = parseInt(H.value) || 0;
      I = 0 > I ? 0 : 100 < I ? 100 : I;
      H.value = I;
      var Q = parseInt(A.value) || 0,
        P = parseInt(K.value) || 0;
      M = J.getConnectionPoint(g, new mxConnectionConstraint(new mxPoint(M / 100, I / 100), !1, null, Q, P));
      I = J.getSelectionCell();
      if (null != I) {
        Q = I.geometry.clone();
        P = J.view.scale;
        var O = J.view.translate;
        Q.x = (M.x - 3 * P) / P - O.x;
        Q.y = (M.y - 3 * P) / P - O.y;
        J.model.setGeometry(I, Q);
      }
    }

    function E(M) {
      var I = 0,
        Q = 0,
        P = G.geometry,
        O = mxUtils.format((M.geometry.x + 3 - P.x) / P.width);
      M = mxUtils.format((M.geometry.y + 3 - P.y) / P.height);
      0 > O ? (I = O * P.width, O = 0) : 1 < O && (I = (O - 1) * P.width, O = 1);
      0 > M ? (Q = M * P.height, M = 0) : 1 < M && (Q = (M - 1) * P.height, M = 1);
      return {
        x: O,
        y: M,
        dx: parseInt(I),
        dy: parseInt(Q)
      };
    }

    function z() {
      if (1 == J.getSelectionCount()) {
        var M = J.getSelectionCell();
        M = E(M);
        q.value = 100 * M.x;
        H.value = 100 * M.y;
        A.value = M.dx;
        K.value = M.dy;
        l.style.visibility = '';
      } else
        l.style.visibility = 'hidden';
    }
    var D = document.createElement('div');
    D.style.width = '350px';
    D.style.height = '350px';
    D.style.overflow = 'hidden';
    D.style.border = '1px solid lightGray';
    D.style.boxSizing = 'border-box';
    mxEvent.disableContextMenu(D);
    c.appendChild(D);
    var J = new Graph(D);
    J.autoExtend = !1;
    J.autoScroll = !1;
    J.setGridEnabled(!1);
    J.setEnabled(!0);
    J.setPanning(!0);
    J.setConnectable(!1);
    J.setTooltips(!1);
    J.minFitScale = null;
    J.maxFitScale = null;
    J.centerZoom = !0;
    J.maxFitScale = 2;
    D = e.geometry;
    var G = new mxCell(e.value, new mxGeometry(0, 0, D.width, D.height), e.style + ';rotatable=0;resizable=0;connectable=0;editable=0;movable=0;');
    G.vertex = !0;
    J.addCell(G);
    J.dblClick = function(M, I) {
      if (null != I && I != G)
        J.setSelectionCell(I);
      else {
        I = mxUtils.convertPoint(J.container, mxEvent.getClientX(M), mxEvent.getClientY(M));
        mxEvent.consume(M);
        M = J.view.scale;
        var Q = J.view.translate;
        J.setSelectionCell(m((I.x - 3 * M) / M - Q.x, (I.y - 3 * M) / M - Q.y));
      }
    };
    k = new mxKeyHandler(J);
    k.bindKey(46, t);
    k.bindKey(8, t);
    J.getRubberband().isForceRubberbandEvent = function(M) {
      return 0 == M.evt.button && (null == M.getCell() || M.getCell() == G);
    };
    J.panningHandler.isForcePanningEvent = function(M) {
      return 2 == M.evt.button;
    };
    var d = J.isCellSelectable;
    J.isCellSelectable = function(M) {
      return M == G ? !1 : d.apply(this, arguments);
    };
    J.getLinkForCell = function() {
      return null;
    };
    var g = J.view.getState(G);
    D = J.getAllConnectionConstraints(g);
    for (var n = 0; null != D && n < D.length; n++) {
      var v = J.getConnectionPoint(g, D[n]);
      m(v.x - 3, v.y - 3);
    }
    J.fit(8);
    J.center();
    n = mxUtils.button('', function() {
      J.zoomIn();
    });
    n.className = 'geSprite geSprite-zoomin';
    n.setAttribute('title', mxResources.get('zoomIn'));
    n.style.position = 'relative';
    n.style.outline = 'none';
    n.style.border = 'none';
    n.style.margin = '2px';
    n.style.cursor = 'pointer';
    n.style.top = mxClient.IS_FF ? '-6px' : '0px';
    mxUtils.setOpacity(n, 60);
    v = mxUtils.button('', function() {
      J.zoomOut();
    });
    v.className = 'geSprite geSprite-zoomout';
    v.setAttribute('title', mxResources.get('zoomOut'));
    v.style.position = 'relative';
    v.style.outline = 'none';
    v.style.border = 'none';
    v.style.margin = '2px';
    v.style.cursor = 'pointer';
    v.style.top = mxClient.IS_FF ? '-6px' : '0px';
    mxUtils.setOpacity(v, 60);
    var u = mxUtils.button('', function() {
      J.fit(8);
      J.center();
    });
    u.className = 'geSprite geSprite-fit';
    u.setAttribute('title', mxResources.get('fit'));
    u.style.position = 'relative';
    u.style.outline = 'none';
    u.style.border = 'none';
    u.style.margin = '2px';
    u.style.cursor = 'pointer';
    u.style.top = mxClient.IS_FF ? '-6px' : '0px';
    mxUtils.setOpacity(u, 60);
    var x = mxUtils.button('', function() {
      J.zoomActual();
      J.center();
    });
    x.className = 'geSprite geSprite-actualsize';
    x.setAttribute('title', mxResources.get('actualSize'));
    x.style.position = 'relative';
    x.style.outline = 'none';
    x.style.border = 'none';
    x.style.margin = '2px';
    x.style.cursor = 'pointer';
    x.style.top = mxClient.IS_FF ? '-6px' : '0px';
    mxUtils.setOpacity(x, 60);
    var C = mxUtils.button('', t);
    C.className = 'geSprite geSprite-delete';
    C.setAttribute('title', mxResources.get('delete'));
    C.style.position = 'relative';
    C.style.outline = 'none';
    C.style.border = 'none';
    C.style.margin = '2px';
    C.style.float = 'right';
    C.style.cursor = 'pointer';
    mxUtils.setOpacity(C, 10);
    D = document.createElement('div');
    D.appendChild(n);
    D.appendChild(v);
    D.appendChild(x);
    D.appendChild(u);
    D.appendChild(C);
    c.appendChild(D);
    var F = document.createElement('input');
    F.setAttribute('type', 'number');
    F.setAttribute('min', '1');
    F.setAttribute('value', '1');
    F.style.width = '45px';
    F.style.position = 'relative';
    F.style.top = mxClient.IS_FF ? '0px' : '-4px';
    F.style.margin = '0 4px 0 4px';
    D.appendChild(F);
    var L = document.createElement('select');
    L.style.position = 'relative';
    L.style.top = mxClient.IS_FF ? '0px' : '-4px';
    v = [
      'left',
      'right',
      'top',
      'bottom'
    ];
    for (n = 0; n < v.length; n++)
      u = v[n], x = document.createElement('option'), mxUtils.write(x, mxResources.get(u)), x.value = u, L.appendChild(x);
    D.appendChild(L);
    n = mxUtils.button(mxResources.get('add'), function() {
      var M = parseInt(F.value);
      M = 1 > M ? 1 : 100 < M ? 100 : M;
      F.value = M;
      for (var I = L.value, Q = G.geometry, P = [], O = 0; O < M; O++) {
        switch (I) {
          case 'left':
            var W = Q.x;
            var p = Q.y + (O + 1) * Q.height / (M + 1);
            break;
          case 'right':
            W = Q.x + Q.width;
            p = Q.y + (O + 1) * Q.height / (M + 1);
            break;
          case 'top':
            W = Q.x + (O + 1) * Q.width / (M + 1);
            p = Q.y;
            break;
          case 'bottom':
            W = Q.x + (O + 1) * Q.width / (M + 1), p = Q.y + Q.height;
        }
        P.push(m(W - 3, p - 3));
      }
      J.setSelectionCells(P);
    });
    n.style.position = 'relative';
    n.style.marginLeft = '8px';
    n.style.top = mxClient.IS_FF ? '0px' : '-4px';
    D.appendChild(n);
    var l = document.createElement('div');
    l.style.margin = '4px 0px 8px 0px';
    l.style.whiteSpace = 'nowrap';
    l.style.height = '24px';
    D = document.createElement('span');
    mxUtils.write(D, mxResources.get('dx'));
    l.appendChild(D);
    var q = document.createElement('input');
    q.setAttribute('type', 'number');
    q.setAttribute('min', '0');
    q.setAttribute('max', '100');
    q.style.width = '45px';
    q.style.margin = '0 4px 0 4px';
    l.appendChild(q);
    mxUtils.write(l, '%');
    var A = document.createElement('input');
    A.setAttribute('type', 'number');
    A.style.width = '45px';
    A.style.margin = '0 4px 0 4px';
    l.appendChild(A);
    mxUtils.write(l, 'pt');
    D = document.createElement('span');
    mxUtils.write(D, mxResources.get('dy'));
    D.style.marginLeft = '12px';
    l.appendChild(D);
    var H = document.createElement('input');
    H.setAttribute('type', 'number');
    H.setAttribute('min', '0');
    H.setAttribute('max', '100');
    H.style.width = '45px';
    H.style.margin = '0 4px 0 4px';
    l.appendChild(H);
    mxUtils.write(l, '%');
    var K = document.createElement('input');
    K.setAttribute('type', 'number');
    K.style.width = '45px';
    K.style.margin = '0 4px 0 4px';
    l.appendChild(K);
    mxUtils.write(l, 'pt');
    c.appendChild(l);
    z();
    J.getSelectionModel().addListener(mxEvent.CHANGE, function() {
      0 < J.getSelectionCount() ? mxUtils.setOpacity(C, 60) : mxUtils.setOpacity(C, 10);
      z();
    });
    J.addListener(mxEvent.CELLS_MOVED, z);
    mxEvent.addListener(q, 'change', y);
    mxEvent.addListener(H, 'change', y);
    mxEvent.addListener(A, 'change', y);
    mxEvent.addListener(K, 'change', y);
    D = mxUtils.button(mxResources.get('cancel'), function() {
      f();
      b.hideDialog();
    });
    D.className = 'geBtn';
    n = mxUtils.button(mxResources.get('apply'), function() {
      var M = J.model.cells,
        I = [],
        Q = [],
        P;
      for (P in M) {
        var O = M[P];
        O.cp && Q.push(E(O));
      }
      Q.sort(function(W, p) {
        return W.x != p.x ? W.x - p.x : W.y != p.y ? W.y - p.y : W.dx != p.dx ? W.dx - p.dx : W.dy - p.dy;
      });
      for (M = 0; M < Q.length; M++)
        0 < M && Q[M].x == Q[M - 1].x && Q[M].y == Q[M - 1].y && Q[M].dx == Q[M - 1].dx && Q[M].dy == Q[M - 1].dy || I.push('[' + Q[M].x + ',' + Q[M].y + ',0,' + Q[M].dx + ',' + Q[M].dy + ']');
      b.editor.graph.setCellStyles('points', '[' + I.join(',') + ']', [e]);
      f();
      b.hideDialog();
    });
    n.className = 'geBtn gePrimaryBtn';
    v = mxUtils.button(mxResources.get('reset'), function() {
      b.editor.graph.setCellStyles('points', null, [e]);
      f();
      b.hideDialog();
    });
    v.className = 'geBtn';
    u = document.createElement('div');
    u.style.marginTop = '10px';
    u.style.textAlign = 'right';
    b.editor.cancelFirst ? (u.appendChild(D), u.appendChild(v), u.appendChild(n)) : (u.appendChild(v), u.appendChild(n), u.appendChild(D));
    c.appendChild(u);
  };
  this.destroy = f;
  this.container = c;
};
(function() {
  'undefined' !== typeof html4 && (html4.ATTRIBS['span::data-lucid-content'] = 0, html4.ATTRIBS['span::data-lucid-type'] = 0, html4.ATTRIBS['font::data-font-src'] = 0);
  Editor.sketchFontFamily = 'Architects Daughter';
  Editor.sketchFontSource = 'https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DArchitects%2BDaughter';
  Editor.sketchFonts = [{
    fontFamily: Editor.sketchFontFamily,
    fontUrl: decodeURIComponent(Editor.sketchFontSource)
  }];
  Editor.sketchDefaultCurveFitting = '1';
  Editor.sketchDefaultJiggle = '2';
  Editor.thinCommentImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTEyLjUgMjcuNWgyM3YtMi4yNWgtMjNabTAtNi4zNWgyM3YtMi4zaC0yM1ptMC02LjRoMjNWMTIuNWgtMjNaTTQzIDQyLjEgMzUuOSAzNWgtMjhxLTEuMTUgMC0yLjAyNS0uODc1VDUgMzIuMVY3LjlxMC0xLjE1Ljg3NS0yLjAyNVQ3LjkgNWgzMi4ycTEuMiAwIDIuMDUuODc1UTQzIDYuNzUgNDMgNy45Wk03LjI1IDcuOXYyNC44NUgzNi45bDMuODUgMy44NVY3LjlxMC0uMy0uMTc1LS40NzVUNDAuMSA3LjI1SDcuOXEtLjMgMC0uNDc1LjE3NVQ3LjI1IDcuOVptMCAwdjI4LjdWNy4yNSA3LjlaIi8+PC9zdmc+';
  Editor.thinDesignImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0ibTM2LjUgMTguMzUtNi44NS02Ljg1IDMuMjUtMy4ycS44NS0uODUgMi4wMjUtLjg1IDEuMTc1IDAgMi4wMjUuODVsMi43NSAyLjhxLjg1LjguODUgMnQtLjg1IDJaTTYuODUgNDEuMXYtNi45bDkuNTUtOS41NUw1LjUgMTMuN2w3LjgtNy44NSAxMSAxMSA1LjM1LTUuMzUgNi44NSA2Ljg1LTUuMzUgNS4zNSAxMSAxMS03Ljg1IDcuNzUtMTAuOTUtMTAuOS05LjYgOS41NVptMTEuMi0xOC4wNSA0LjY1LTQuNi00LjA1LTQuMDUtMi4zNSAyLjQtMS42LTEuNiAyLjM1LTIuNC0zLjc1LTMuNzUtNC42IDQuNjVabTE2LjIgMTYuMjUgNC42NS00LjY1LTMuNzUtMy43NS0yLjQgMi40LTEuNi0xLjYgMi40LTIuNC00LjA1LTQtNC42IDQuNjVabS0yNS4xLS40NWgzLjZsMjAuNS0yMC40NS0zLjY1LTMuNjVMOS4xNSAzNS4yWiIvPjwvc3ZnPg==';
  Editor.thinGestureImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTI4IDQxLjZxLTIuNSAwLTQuMDc1LTEuNjUtMS41NzUtMS42NS0xLjU3NS00LjM1IDAtMi4zNSAxLjEtNC4xIDEuMS0xLjc1IDIuODI1LTIuOTUgMS43MjUtMS4yIDMuNy0xLjgyNVQzMy42NSAyNnEtLjE1LTMuMDUtMS4yNS00LjQyNVQyOS4yNSAyMC4ycS0yLjMgMC00LjE3NSAxLjV0LTQuNDI1IDQuOTVxLTIuNjUgMy40NS00LjYgNS4xLTEuOTUgMS42NS00LjM1IDEuNjUtMi4xIDAtMy42NS0xLjM3NVE2LjUgMzAuNjUgNi41IDI3LjQ1cTAtMiAxLjItNC41MjUgMS4yLTIuNTI1IDMuNS02LjE3NSAxLjMtMS44NSAxLjk3NS0zLjIyNXQuNjc1LTIuMzc1cTAtLjctLjM1LTEuMDUtLjM1LS4zNS0xLjA1LS4zNS0uNzUgMC0xLjYuNDc1UTEwIDEwLjcgOSAxMS45TDcgOS44cTEuMzUtMS41NSAyLjcyNS0yLjI3NVExMS4xIDYuOCAxMi41IDYuOHExLjkgMCAzLjEgMS4yNSAxLjIgMS4yNSAxLjIgMy4yIDAgMS44LS45NzUgMy41NzVRMTQuODUgMTYuNiAxMy4wNSAxOS4zcS0xLjk1IDIuOTUtMi43NzUgNC43dC0uODI1IDMuNjVxMCAxLjYuNzUgMi4yLjc1LjYgMS43NS42IDEuNDUgMCAyLjgyNS0xLjMgMS4zNzUtMS4zIDMuNTc1LTQuMTUgMi45NS0zLjggNS41MjUtNS43NzUgMi41NzUtMS45NzUgNS42NzUtMS45NzUgMy4xNSAwIDUgMi4zMjVUMzYuNiAyNS45aDQuOXYyLjk1aC00LjlxLS40NSA3LjM1LTMuMiAxMC4wNS0yLjc1IDIuNy01LjQgMi43Wm0uMS0yLjk1cTEuODUgMCAzLjY1LTIuMjUgMS44LTIuMjUgMi03LjUtMi44LjE1LTUuNjI1IDIuMDI1VDI1LjMgMzUuOXEwIDEuMy43NSAyLjAyNS43NS43MjUgMi4wNS43MjVaIi8+PC9zdmc+';
  Editor.thinShapesImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTI5Ljc1IDI5Ljc1Wm0tMTMgNS40NXEuNC4wNS43NS4wNUgxOS4wNXY0LjY1cTAgLjI1LjE3NS40MjV0LjQyNS4xNzVIMzkuOXEuMjUgMCAuNDI1LS4xNzV0LjE3NS0uNDI1VjE5LjY1cTAtLjI1LS4xNzUtLjQyNXQtLjQyNS0uMTc1aC00LjY1VjE3LjVxMC0uMzUtLjA1LS43NWg0LjdxMS4xNSAwIDIgLjg3NS44NS44NzUuODUgMi4wMjVWMzkuOXEwIDEuMTUtLjg1IDItLjg1Ljg1LTIgLjg1SDE5LjY1cS0xLjE1IDAtMi4wMjUtLjg1dC0uODc1LTJabTEuNS0zLjk1cS01LjQ1IDAtOS4yMjUtMy44LTMuNzc1LTMuOC0zLjc3NS05LjIgMC01LjQ1IDMuNzc1LTkuMjI1UTEyLjggNS4yNSAxOC4yNSA1LjI1cTUuNCAwIDkuMiAzLjc3NSAzLjggMy43NzUgMy44IDkuMjI1IDAgNS40LTMuOCA5LjItMy44IDMuOC05LjIgMy44Wm0tLjA1LTIuM3E0LjQ1IDAgNy42LTMuMTI1IDMuMTUtMy4xMjUgMy4xNS03LjU3NXQtMy4xMjUtNy42UTIyLjcgNy41IDE4LjI1IDcuNXQtNy42IDMuMTI1UTcuNSAxMy43NSA3LjUgMTguMnQzLjEyNSA3LjZxMy4xMjUgMy4xNSA3LjU3NSAzLjE1Wm0uMDUtMTAuN1oiLz48L3N2Zz4=';
  Editor.thinUndoImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTE0LjQgMzcuNXYtMi4yNWgxMy45cTMuNiAwIDYuMjI1LTIuMzc1UTM3LjE1IDMwLjUgMzcuMTUgMjYuOXEwLTMuNTUtMi42MjUtNS45LTIuNjI1LTIuMzUtNi4yMjUtMi4zNUgxMi45NUwxOSAyNC43bC0xLjYgMS42LTguOC04LjggOC44LTguOCAxLjYgMS42LTYuMDUgNi4wNWgxNS4zcTQuNTUgMCA3Ljg1IDMuMDV0My4zIDcuNXEwIDQuNS0zLjMgNy41NXQtNy44NSAzLjA1WiIvPjwvc3ZnPg==';
  Editor.thinRedoImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTE5Ljc1IDM3LjVxLTQuNTUgMC03Ljg1LTMuMDVUOC42IDI2LjlxMC00LjQ1IDMuMy03LjV0Ny44NS0zLjA1aDE1LjNMMjkgMTAuM2wxLjYtMS42IDguOCA4LjgtOC44IDguOC0xLjYtMS42IDYuMDUtNi4wNUgxOS43cS0zLjYgMC02LjIyNSAyLjM1LTIuNjI1IDIuMzUtMi42MjUgNS45IDAgMy42IDIuNjI1IDUuOTc1UTE2LjEgMzUuMjUgMTkuNyAzNS4yNWgxMy45djIuMjVaIi8+PC9zdmc+';
  Editor.thinDoubleArrowRightImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0ibTEzIDM1LjMtMS42LTEuNiA5Ljc1LTkuNzUtOS43NS05LjcgMS42LTEuNiAxMS4zNSAxMS4zWm0xMi4zIDAtMS42LTEuNiA5Ljc1LTkuNzUtOS43NS05LjcgMS42LTEuNiAxMS4zIDExLjNaIi8+PC9zdmc+';
  Editor.thinNoteAddImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTIyLjg1IDM1LjdoMi4zdi02LjNoNi4zNXYtMi4zaC02LjM1di02LjM1aC0yLjN2Ni4zNUgxNi41djIuM2g2LjM1Wk0xMS45IDQzcS0xLjIgMC0yLjA1LS44NVE5IDQxLjMgOSA0MC4xVjcuOXEwLTEuMi44NS0yLjA1UTEwLjcgNSAxMS45IDVoMTcuMzVMMzkgMTQuNzVWNDAuMXEwIDEuMi0uODUgMi4wNS0uODUuODUtMi4wNS44NVptMTYuMjUtMjcuMjV2LTguNUgxMS45cS0uMjUgMC0uNDUuMnQtLjIuNDV2MzIuMnEwIC4yNS4yLjQ1dC40NS4yaDI0LjJxLjI1IDAgLjQ1LS4ydC4yLS40NVYxNS43NVptLTE2LjktOC41djguNS04LjVWNDAuNzUgNy4yNVoiLz48L3N2Zz4=';
  Editor.thinTableImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTcgNDFWN2gzNHYzNFptMi4yNS0yMy42aDI5LjVWOS4yNUg5LjI1Wm0xMC42IDEwLjdoOC4zdi04LjRoLTguM1ptMCAxMC42NWg4LjN2LTguNGgtOC4zWk05LjI1IDI4LjFoOC4zNXYtOC40SDkuMjVabTIxLjE1IDBoOC4zNXYtOC40SDMwLjRaTTkuMjUgMzguNzVoOC4zNXYtOC40SDkuMjVabTIxLjE1IDBoOC4zNXYtOC40SDMwLjRaIi8+PC9zdmc+';
  Editor.thinAddCircleImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTIzIDMzLjVoMi4yNXYtOC4yaDguMjVWMjNoLTguMjV2LTguNUgyM1YyM2gtOC41djIuM0gyM1ptMSA5LjVxLTMuOTUgMC03LjQtMS41dC02LjAyNS00LjA3NVE4IDM0Ljg1IDYuNSAzMS40VDUgMjRxMC0zLjk1IDEuNS03LjQyNVE4IDEzLjEgMTAuNTc1IDEwLjU1IDEzLjE1IDggMTYuNiA2LjVUMjQgNXEzLjk1IDAgNy40MjUgMS41UTM0LjkgOCAzNy40NSAxMC41NSA0MCAxMy4xIDQxLjUgMTYuNTc1IDQzIDIwLjA1IDQzIDI0cTAgMy45NS0xLjUgNy40dC00LjA1IDYuMDI1UTM0LjkgNDAgMzEuNDI1IDQxLjUgMjcuOTUgNDMgMjQgNDNabS4wNS0yLjI1cTYuOTUgMCAxMS44MjUtNC45IDQuODc1LTQuOSA0Ljg3NS0xMS45IDAtNi45NS00Ljg3NS0xMS44MjVRMzEgNy4yNSAyNCA3LjI1cS02Ljk1IDAtMTEuODUgNC44NzVRNy4yNSAxNyA3LjI1IDI0cTAgNi45NSA0LjkgMTEuODUgNC45IDQuOSAxMS45IDQuOVpNMjQgMjRaIi8+PC9zdmc+';
  Editor.thinArrowLeftImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTI4LjA1IDM1LjMgMTYuNyAyMy45NSAyOC4wNSAxMi42bDEuNiAxLjY1LTkuNyA5LjcgOS43IDkuNzVaIi8+PC9zdmc+';
  Editor.thinArrowRightImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0ibTE4Ljc1IDM1LjMtMS42LTEuNiA5LjctOS43NS05LjctOS43IDEuNi0xLjY1TDMwLjEgMjMuOTVaIi8+PC9zdmc+';
  Editor.thinVerticalDotsImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTI0LjA1IDQxLjdxLTEuMjUgMC0yLjEyNS0uODc1dC0uODc1LTIuMDc1cTAtMS4yLjg3NS0yLjEuODc1LS45IDIuMDc1LS45IDEuMjUgMCAyLjEuOS44NS45Ljg1IDIuMSAwIDEuMi0uODUgMi4wNzUtLjg1Ljg3NS0yLjA1Ljg3NVptMC0xNC43NXEtMS4yNSAwLTIuMTI1LS44NzVUMjEuMDUgMjRxMC0xLjI1Ljg3NS0yLjEuODc1LS44NSAyLjA3NS0uODUgMS4yNSAwIDIuMS44NS44NS44NS44NSAyLjA1IDAgMS4yNS0uODUgMi4xMjV0LTIuMDUuODc1Wm0wLTE0LjdxLTEuMjUgMC0yLjEyNS0uODc1VDIxLjA1IDkuMjVxMC0xLjI1Ljg3NS0yLjEyNVQyNCA2LjI1cTEuMjUgMCAyLjEuODc1Ljg1Ljg3NS44NSAyLjEyNXQtLjg1IDIuMTI1cS0uODUuODc1LTIuMDUuODc1WiIvPjwvc3ZnPg==';
  Editor.thinDeleteImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTEzLjkgNDFxLTEuMTUgMC0yLS44NS0uODUtLjg1LS44NS0yLjA1VjEwLjlIOVY4LjY1aDguNTV2LTEuNGgxMi45djEuNEgzOXYyLjI1aC0yLjA1djI3LjJxMCAxLjItLjg1IDIuMDUtLjg1Ljg1LTIgLjg1Wm0yMC44LTMwLjFIMTMuM3YyNy4ycTAgLjMuMTc1LjQ3NXQuNDI1LjE3NWgyMC4ycS4yIDAgLjQtLjJ0LjItLjQ1Wk0xOS4wNSAzNC41aDIuM1YxNS4xaC0yLjNabTcuNiAwaDIuM1YxNS4xaC0yLjNaTTEzLjMgMTAuOXYyNy44NVYzOC4xWiIvPjwvc3ZnPg==';
  Editor.thinLightImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTI0IDMwLjc1cTIuOCAwIDQuNzc1LTEuOTc1UTMwLjc1IDI2LjggMzAuNzUgMjRxMC0yLjgtMS45NzUtNC43NzVRMjYuOCAxNy4yNSAyNCAxNy4yNXEtMi44IDAtNC43NzUgMS45NzVRMTcuMjUgMjEuMiAxNy4yNSAyNHEwIDIuOCAxLjk3NSA0Ljc3NVEyMS4yIDMwLjc1IDI0IDMwLjc1Wk0yNCAzM3EtMy43NSAwLTYuMzc1LTIuNjI1VDE1IDI0cTAtMy43NSAyLjYyNS02LjM3NVQyNCAxNXEzLjc1IDAgNi4zNzUgMi42MjVUMzMgMjRxMCAzLjc1LTIuNjI1IDYuMzc1VDI0IDMzWk0zLjY1IDI1LjE1cS0uNSAwLS44MjUtLjMyNVEyLjUgMjQuNSAyLjUgMjRxMC0uNS4zMjUtLjgyNS4zMjUtLjMyNS44MjUtLjMyNWg1LjJxLjUgMCAuODI1LjMyNVExMCAyMy41IDEwIDI0cTAgLjUtLjMyNS44MjUtLjMyNS4zMjUtLjgyNS4zMjVabTM1LjUgMHEtLjUgMC0uODI1LS4zMjVRMzggMjQuNSAzOCAyNHEwLS41LjMyNS0uODI1LjMyNS0uMzI1LjgyNS0uMzI1aDUuMnEuNSAwIC44MjUuMzI1LjMyNS4zMjUuMzI1LjgyNSAwIC41LS4zMjUuODI1LS4zMjUuMzI1LS44MjUuMzI1Wk0yNCAxMHEtLjUgMC0uODI1LS4zMjUtLjMyNS0uMzI1LS4zMjUtLjgyNXYtNS4ycTAtLjUuMzI1LS44MjVRMjMuNSAyLjUgMjQgMi41cS41IDAgLjgyNS4zMjUuMzI1LjMyNS4zMjUuODI1djUuMnEwIC41LS4zMjUuODI1UTI0LjUgMTAgMjQgMTBabTAgMzUuNXEtLjUgMC0uODI1LS4zMjUtLjMyNS0uMzI1LS4zMjUtLjgyNXYtNS4ycTAtLjUuMzI1LS44MjVRMjMuNSAzOCAyNCAzOHEuNSAwIC44MjUuMzI1LjMyNS4zMjUuMzI1LjgyNXY1LjJxMCAuNS0uMzI1LjgyNS0uMzI1LjMyNS0uODI1LjMyNVpNMTIuNSAxNC4xbC0zLTIuOTVxLS4zNS0uMzUtLjMyNS0uODI1UTkuMiA5Ljg1IDkuNSA5LjVxLjM1LS4zNS44LS4zNS40NSAwIC44NS4zNWwyLjk1IDNxLjMuMzUuMy44IDAgLjQ1LS4zLjgtLjMuMy0uNzc1LjMtLjQ3NSAwLS44MjUtLjNabTI0LjM1IDI0LjQtMi45NS0zcS0uMy0uMzUtLjMtLjggMC0uNDUuMzUtLjguMjUtLjM1LjcyNS0uMzV0LjgyNS4zNWwzIDIuOTVxLjM1LjM1LjMyNS44MjUtLjAyNS40NzUtLjMyNS44MjUtLjM1LjM1LS44LjM1LS40NSAwLS44NS0uMzVaTTMzLjkgMTQuMXEtLjM1LS4zNS0uMzUtLjggMC0uNDUuMzUtLjhsMi45NS0zcS4zNS0uMzUuODI1LS4zMjUuNDc1LjAyNS44MjUuMzI1LjM1LjM1LjM1LjggMCAuNDUtLjM1Ljg1bC0zIDIuOTVxLS4zLjMtLjc3NS4zLS40NzUgMC0uODI1LS4zWk05LjUgMzguNXEtLjM1LS4zNS0uMzUtLjggMC0uNDUuMzUtLjg1bDMtMi45NXEuMzUtLjM1LjgtLjM1LjQ1IDAgLjguMzUuMzUuMy4zMjUuNzc1LS4wMjUuNDc1LS4zMjUuODI1bC0yLjk1IDNxLS40LjM1LS44NS4zNS0uNDUgMC0uOC0uMzVaTTI0IDI0WiIvPjwvc3ZnPg==';
  Editor.thinDarkImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTI0LjA1IDQxcS03LjEgMC0xMi4wNS00Ljk1UTcuMDUgMzEuMSA3LjA1IDI0cTAtNi44IDQuNi0xMS42NSA0LjYtNC44NSAxMS4zLTUuMjUuMiAwIC40NS4wMjV0LjcuMDI1UTIyLjc1IDguNyAyMiAxMC43MjVxLS43NSAyLjAyNS0uNzUgNC4yNzUgMCA0LjkgMy40NSA4LjM1IDMuNDUgMy40NSA4LjM1IDMuNDUgMi4yIDAgNC4yNzUtLjY3NVQ0MC45IDI0LjJxMCAuMzUuMDI1LjU1LjAyNS4yLjAyNS4zNS0uNCA2LjctNS4yNSAxMS4zUTMwLjg1IDQxIDI0LjA1IDQxWm0wLTIuMjVxNS4xNSAwIDkuMDc1LTMuMTI1UTM3LjA1IDMyLjUgMzguMiAyOC4xcS0xLjIuNS0yLjUuNzI1LTEuMy4yMjUtMi42NS4yMjUtNS44NSAwLTkuOTUtNC4xVDE5IDE1cTAtMS4xNS4yMjUtMi40MjVUMjAgOS43NXEtNC42NSAxLjQtNy42NSA1LjM3NVQ5LjM1IDI0cTAgNi4xNSA0LjI3NSAxMC40NSA0LjI3NSA0LjMgMTAuNDI1IDQuM1ptLS4yNS0xNC41WiIvPjwvc3ZnPg==';
  Editor.thinCommentImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTEyLjUgMjcuNWgyM3YtMi4yNWgtMjNabTAtNi4zNWgyM3YtMi4zaC0yM1ptMC02LjRoMjNWMTIuNWgtMjNaTTQzIDQyLjEgMzUuOSAzNWgtMjhxLTEuMTUgMC0yLjAyNS0uODc1VDUgMzIuMVY3LjlxMC0xLjE1Ljg3NS0yLjAyNVQ3LjkgNWgzMi4ycTEuMiAwIDIuMDUuODc1UTQzIDYuNzUgNDMgNy45Wk03LjI1IDcuOXYyNC44NUgzNi45bDMuODUgMy44NVY3LjlxMC0uMy0uMTc1LS40NzVUNDAuMSA3LjI1SDcuOXEtLjMgMC0uNDc1LjE3NVQ3LjI1IDcuOVptMCAwdjI4LjdWNy4yNSA3LjlaIi8+PC9zdmc+';
  Editor.thinMenuImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTEzLjUgMjYuMTVxLjkgMCAxLjUyNS0uNjI1LjYyNS0uNjI1LjYyNS0xLjUyNSAwLS45LS42MjUtMS41MjUtLjYyNS0uNjI1LTEuNTI1LS42MjUtLjkgMC0xLjUyNS42MjUtLjYyNS42MjUtLjYyNSAxLjUyNSAwIC45LjYyNSAxLjUyNS42MjUuNjI1IDEuNTI1LjYyNVptMTAuNSAwcS45IDAgMS41MjUtLjYyNS42MjUtLjYyNS42MjUtMS41MjUgMC0uOS0uNjI1LTEuNTI1UTI0LjkgMjEuODUgMjQgMjEuODVxLS45IDAtMS41MjUuNjI1LS42MjUuNjI1LS42MjUgMS41MjUgMCAuOS42MjUgMS41MjUuNjI1LjYyNSAxLjUyNS42MjVabTEwLjUgMHEuODUgMCAxLjQ3NS0uNjI1UTM2LjYgMjQuOSAzNi42IDI0cTAtLjktLjYyNS0xLjUyNS0uNjI1LS42MjUtMS41MjUtLjYyNS0uODUgMC0xLjQ3NS42MjUtLjYyNS42MjUtLjYyNSAxLjUyNSAwIC45LjYyNSAxLjUyNS42MjUuNjI1IDEuNTI1LjYyNVpNMjQgNDNxLTMuOTUgMC03LjQtMS41dC02LjAyNS00LjA3NVE4IDM0Ljg1IDYuNSAzMS40VDUgMjRxMC0zLjk1IDEuNS03LjQyNVE4IDEzLjEgMTAuNTc1IDEwLjU1IDEzLjE1IDggMTYuNiA2LjVUMjQgNXEzLjk1IDAgNy40MjUgMS41UTM0LjkgOCAzNy40NSAxMC41NSA0MCAxMy4xIDQxLjUgMTYuNTc1IDQzIDIwLjA1IDQzIDI0cTAgMy45NS0xLjUgNy40dC00LjA1IDYuMDI1UTM0LjkgNDAgMzEuNDI1IDQxLjUgMjcuOTUgNDMgMjQgNDNabTAtMi4yNXE3IDAgMTEuODc1LTQuOVQ0MC43NSAyNHEwLTctNC44NzUtMTEuODc1VDI0IDcuMjVxLTYuOTUgMC0xMS44NSA0Ljg3NVE3LjI1IDE3IDcuMjUgMjRxMCA2Ljk1IDQuOSAxMS44NSA0LjkgNC45IDExLjg1IDQuOVpNMjQgMjRaIi8+PC9zdmc+';
  Editor.thinViewImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTUgMzlWOWgzOHYzMFptMjguNTUtMjAuNmg3LjJ2LTcuMTVoLTcuMlptMCA4Ljk1aDcuMnYtNi43aC03LjJabS0yNi4zIDkuNEgzMS4zdi0yNS41SDcuMjVabTI2LjMgMGg3LjJWMjkuNmgtNy4yWiIvPjwvc3ZnPg==';
  Editor.thinUserAddImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTM2LjYgMjcuNXYtNi4zNWgtNi4zNXYtMi4zaDYuMzVWMTIuNWgyLjN2Ni4zNWg2LjM1djIuM0gzOC45djYuMzVaTTE4IDIzLjM1cS0yLjkgMC00Ljc3NS0xLjg3NVExMS4zNSAxOS42IDExLjM1IDE2LjdxMC0yLjkgMS44NzUtNC43NVQxOCAxMC4xcTIuOSAwIDQuNzc1IDEuODUgMS44NzUgMS44NSAxLjg3NSA0Ljc1dC0xLjg3NSA0Ljc3NVEyMC45IDIzLjM1IDE4IDIzLjM1Wk0zIDM4LjZ2LTMuOHEwLTEuNS44LTIuNzV0Mi4yNS0xLjlxMy40NS0xLjUgNi4yNzUtMi4xNSAyLjgyNS0uNjUgNS42NzUtLjY1IDIuODUgMCA1LjY1LjY1IDIuOC42NSA2LjI1IDIuMTUgMS40NS43IDIuMjc1IDEuOTI1VDMzIDM0Ljh2My44Wm0yLjI1LTIuMjVoMjUuNVYzNC44cTAtLjc1LS41LTEuNDc1LS41LS43MjUtMS4zLTEuMTI1LTMuMi0xLjUtNS42NzUtMi4wNVEyMC44IDI5LjYgMTggMjkuNnEtMi44IDAtNS4zLjU1VDcgMzIuMnEtLjguNC0xLjI3NSAxLjEyNS0uNDc1LjcyNS0uNDc1IDEuNDc1Wk0xOCAyMS4xcTEuODUgMCAzLjEtMS4yNXQxLjI1LTMuMTVxMC0xLjg1LTEuMjUtMy4xVDE4IDEyLjM1cS0xLjg1IDAtMy4xIDEuMjV0LTEuMjUgMy4xcTAgMS45IDEuMjUgMy4xNVQxOCAyMS4xWm0wLTQuNFptMCAxOS42NVoiLz48L3N2Zz4=';
  Editor.thinUserFlashImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTkgMzguNnYtMy44cTAtMS42Ljg1LTIuOC44NS0xLjIgMi4yLTEuODUgMy4yLTEuNCA2LjEyNS0yLjEgMi45MjUtLjcgNS44MjUtLjcgMS40NSAwIDIuOS4xNzV0Mi45LjUyNXYyLjJxLTEuNDUtLjM1LTIuODc1LS41UTI1LjUgMjkuNiAyNCAyOS42cS0yLjc1IDAtNS40LjYtMi42NS42LTUuNiAyLS43NS40LTEuMjUgMS4xMjV0LS41IDEuNDc1djEuNTVIMjkuOHYyLjI1Wm0yLjI1LTIuMjVIMjkuOFptMTIuNzUtMTNxLTIuOSAwLTQuNzc1LTEuODc1UTE3LjM1IDE5LjYgMTcuMzUgMTYuN3EwLTIuOSAxLjg3NS00Ljc1VDI0IDEwLjFxMi45IDAgNC43NzUgMS44NSAxLjg3NSAxLjg1IDEuODc1IDQuNzV0LTEuODc1IDQuNzc1UTI2LjkgMjMuMzUgMjQgMjMuMzVabTAtMi4yNXExLjg1IDAgMy4xLTEuMjV0MS4yNS0zLjE1cTAtMS44NS0xLjI1LTMuMVQyNCAxMi4zNXEtMS44NSAwLTMuMSAxLjI1dC0xLjI1IDMuMXEwIDEuOSAxLjI1IDMuMTVUMjQgMjEuMVptMC00LjRabTEyLjg1IDI4LjA1di03LjhoLTMuNHYtMTAuMWg5LjE1bC0zLjggNy42NWgzLjdaIi8+PC9zdmc+';
  Editor.thinShareImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTExLjkgNDVxLTEuMiAwLTIuMDUtLjg1UTkgNDMuMyA5IDQyLjFWMTguOHEwLTEuMTUuODUtMiAuODUtLjg1IDIuMDUtLjg1aDYuOXYyLjI1aC02LjlxLS4yNSAwLS40NS4ydC0uMi40djIzLjNxMCAuMjUuMi40NXQuNDUuMmgyNC4ycS4yNSAwIC40NS0uMnQuMi0uNDVWMTguOHEwLS4yLS4yLS40dC0uNDUtLjJoLTYuOTV2LTIuMjVoNi45NXExLjIgMCAyLjA1Ljg1Ljg1Ljg1Ljg1IDJ2MjMuM3EwIDEuMi0uODUgMi4wNS0uODUuODUtMi4wNS44NVptMTAuOTUtMTQuNVY4LjFsLTQuNiA0LjU1LTEuNjUtMS42IDcuMzUtNy4zNSA3LjM1IDcuMzUtMS42IDEuNi00LjYtNC41NXYyMi40WiIvPjwvc3ZnPg==';
  Editor.thinTextImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTMuNCA0NC42di05LjI1aDMuNTV2LTIyLjdIMy40VjMuNGg5LjI1djMuNTVoMjIuN1YzLjRoOS4yNXY5LjI1aC0zLjU1djIyLjdoMy41NXY5LjI1aC05LjI1di0zLjU1aC0yMi43djMuNTVabTkuMjUtNS44NWgyMi43di0zLjRoMy40di0yMi43aC0zLjR2LTMuNGgtMjIuN3YzLjRoLTMuNHYyMi43aDMuNFptMy4xNS02LjI1IDcuMzUtMTkuMTVoMS42NWw3LjQ1IDE5LjE1aC0yLjFMMjggMjdoLTcuODVsLTIuMSA1LjVabTQuOTUtNy4zNWg2LjVMMjQuMSAxNi44aC0uM1ptLTE1LjEtMTQuOGg0Ljd2LTQuN2gtNC43Wm0zMiAwaDQuN3YtNC43aC00LjdabTAgMzJoNC43di00LjdoLTQuN1ptLTMyIDBoNC43di00LjdoLTQuN1ptMzItMzJabTAgMjcuM1ptLTI3LjMgMFptMC0yNy4zWiIvPjwvc3ZnPg==';
  Editor.thinRectangleImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTUgMzlWOWgzOHYzMFptMi4yNS0yLjI1aDMzLjV2LTI1LjVINy4yNVptMCAwdi0yNS41IDI1LjVaIi8+PC9zdmc+';
  Editor.thinDataImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTI4Ljg1IDM5LjF2LTIuMjVIMzRxMS4yIDAgMi4wMjUtLjgyNVQzNi44NSAzNHYtNC45cTAtMS43NSAxLjA3NS0zLjEyNXQyLjcyNS0xLjgyNXYtLjNxLTEuNjUtLjQ1LTIuNzI1LTEuODI1UTM2Ljg1IDIwLjY1IDM2Ljg1IDE4LjlWMTRxMC0xLjItLjgyNS0yLjAyNVQzNCAxMS4xNWgtNS4xNVY4LjlIMzRxMi4xNSAwIDMuNjI1IDEuNVQzOS4xIDE0djQuOXEwIDEuMjUuODUgMi4wNzUuODUuODI1IDIuMS44MjVoLjg1djQuNGgtLjg1cS0xLjI1IDAtMi4xLjgyNS0uODUuODI1LS44NSAyLjA3NVYzNHEwIDIuMS0xLjUgMy42VDM0IDM5LjFaTTE0IDM5LjFxLTIuMTUgMC0zLjYyNS0xLjVUOC45IDM0di00LjlxMC0xLjI1LS44NS0yLjA3NS0uODUtLjgyNS0yLjEtLjgyNUg1LjF2LTQuNGguODVxMS4yNSAwIDIuMS0uODI1Ljg1LS44MjUuODUtMi4wNzVWMTRxMC0yLjEgMS41LTMuNlQxNCA4LjloNS4xNXYyLjI1SDE0cS0xLjIgMC0yLjAyNS44MjVUMTEuMTUgMTR2NC45cTAgMS43NS0xLjA3NSAzLjEyNVQ3LjM1IDIzLjg1di4zcTEuNjUuNDUgMi43MjUgMS44MjVRMTEuMTUgMjcuMzUgMTEuMTUgMjkuMVYzNHEwIDEuMi44MjUgMi4wMjVUMTQgMzYuODVoNS4xNXYyLjI1WiIvPjwvc3ZnPg==';
  Editor.styles = [{},
    {
      commonStyle: {
        fontColor: '#393C56',
        strokeColor: '#E07A5F',
        fillColor: '#F2CC8F'
      },
      graph: {
        background: '#F4F1DE',
        gridColor: '#D4D0C0'
      }
    },
    {
      vertexStyle: {
        strokeColor: '#BAC8D3',
        fillColor: '#09555B',
        fontColor: '#EEEEEE'
      },
      edgeStyle: {
        strokeColor: '#0B4D6A'
      }
    },
    {
      vertexStyle: {
        strokeColor: '#FFFFFF',
        fillColor: '#182E3E',
        fontColor: '#FFFFFF'
      },
      edgeStyle: {
        strokeColor: '#23445D'
      },
      graph: {
        background: '#FCE7CD',
        gridColor: '#CFBDA8'
      }
    },
    {
      vertexStyle: {
        strokeColor: '#D0CEE2',
        fillColor: '#5D7F99'
      },
      edgeStyle: {
        strokeColor: '#736CA8'
      },
      commonStyle: {
        fontColor: '#1A1A1A'
      }
    },
    {
      commonStyle: {
        fontColor: '#46495D',
        strokeColor: '#788AA3',
        fillColor: '#B2C9AB'
      }
    },
    {
      commonStyle: {
        fontColor: '#5AA9E6',
        strokeColor: '#FF6392',
        fillColor: '#FFE45E'
      }
    },
    {
      commonStyle: {
        fontColor: '#E4FDE1',
        strokeColor: '#028090',
        fillColor: '#F45B69'
      },
      graph: {
        background: '#114B5F',
        gridColor: '#0B3240'
      }
    },
    {
      commonStyle: {
        fontColor: '#FEFAE0',
        strokeColor: '#DDA15E',
        fillColor: '#BC6C25'
      },
      graph: {
        background: '#283618',
        gridColor: '#48632C'
      }
    },
    {
      commonStyle: {
        fontColor: '#143642',
        strokeColor: '#0F8B8D',
        fillColor: '#FAE5C7'
      },
      edgeStyle: {
        strokeColor: '#A8201A'
      },
      graph: {
        background: '#DAD2D8',
        gridColor: '#ABA4A9'
      }
    },
    {},
    {
      vertexStyle: {
        strokeColor: '#D0CEE2',
        fillColor: '#FAD9D5'
      },
      edgeStyle: {
        strokeColor: '#09555B'
      },
      commonStyle: {
        fontColor: '#1A1A1A'
      }
    },
    {
      commonStyle: {
        fontColor: '#1D3557',
        strokeColor: '#457B9D',
        fillColor: '#A8DADC'
      },
      graph: {
        background: '#F1FAEE'
      }
    },
    {
      commonStyle: {
        fontColor: '#095C86',
        strokeColor: '#AF45ED',
        fillColor: '#F694C1'
      },
      edgeStyle: {
        strokeColor: '#60E696'
      }
    },
    {
      commonStyle: {
        fontColor: '#5C5C5C',
        strokeColor: '#006658',
        fillColor: '#21C0A5'
      }
    },
    {
      vertexStyle: {
        strokeColor: '#FFFFFF',
        fillColor: '#F08E81'
      },
      edgeStyle: {
        strokeColor: '#182E3E'
      },
      commonStyle: {
        fontColor: '#1A1A1A'
      },
      graph: {
        background: '#B0E3E6',
        gridColor: '#87AEB0'
      }
    },
    {
      vertexStyle: {
        strokeColor: '#909090',
        fillColor: '#F5AB50'
      },
      edgeStyle: {
        strokeColor: '#182E3E'
      },
      commonStyle: {
        fontColor: '#1A1A1A'
      },
      graph: {
        background: '#EEEEEE'
      }
    },
    {
      vertexStyle: {
        strokeColor: '#BAC8D3',
        fillColor: '#B1DDF0',
        fontColor: '#182E3E'
      },
      edgeStyle: {
        strokeColor: '#EEEEEE',
        fontColor: '#FFFFFF'
      },
      graph: {
        background: '#09555B',
        gridColor: '#13B4C2'
      }
    },
    {
      vertexStyle: {
        strokeColor: '#EEEEEE',
        fillColor: '#56517E',
        fontColor: '#FFFFFF'
      },
      edgeStyle: {
        strokeColor: '#182E3E'
      },
      graph: {
        background: '#FAD9D5',
        gridColor: '#BFA6A3'
      }
    },
    {
      vertexStyle: {
        fillColor: '#EEEEEE',
        fontColor: '#1A1A1A'
      },
      edgeStyle: {
        fontColor: '#FFFFFF'
      },
      commonStyle: {
        strokeColor: '#FFFFFF'
      },
      graph: {
        background: '#182E3E',
        gridColor: '#4D94C7'
      }
    }
  ];
  Editor.logoImage = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzA2LjE4NSAxMjAuMjk2IgogICB2aWV3Qm94PSIyNCAyNiA2OCA2OCIKICAgeT0iMHB4IgogICB4PSIwcHgiCiAgIHZlcnNpb249IjEuMSI+CiAgIAkgPGc+PGxpbmUKICAgICAgIHkyPSI3Mi4zOTQiCiAgICAgICB4Mj0iNDEuMDYxIgogICAgICAgeTE9IjQzLjM4NCIKICAgICAgIHgxPSI1OC4wNjkiCiAgICAgICBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiCiAgICAgICBzdHJva2Utd2lkdGg9IjMuNTUyOCIKICAgICAgIHN0cm9rZT0iI0ZGRkZGRiIKICAgICAgIGZpbGw9Im5vbmUiIC8+PGxpbmUKICAgICAgIHkyPSI3Mi4zOTQiCiAgICAgICB4Mj0iNzUuMDc2IgogICAgICAgeTE9IjQzLjM4NCIKICAgICAgIHgxPSI1OC4wNjgiCiAgICAgICBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiCiAgICAgICBzdHJva2Utd2lkdGg9IjMuNTAwOCIKICAgICAgIHN0cm9rZT0iI0ZGRkZGRiIKICAgICAgIGZpbGw9Im5vbmUiIC8+PGc+PHBhdGgKICAgICAgICAgZD0iTTUyLjc3Myw3Ny4wODRjMCwxLjk1NC0xLjU5OSwzLjU1My0zLjU1MywzLjU1M0gzNi45OTljLTEuOTU0LDAtMy41NTMtMS41OTktMy41NTMtMy41NTN2LTkuMzc5ICAgIGMwLTEuOTU0LDEuNTk5LTMuNTUzLDMuNTUzLTMuNTUzaDEyLjIyMmMxLjk1NCwwLDMuNTUzLDEuNTk5LDMuNTUzLDMuNTUzVjc3LjA4NHoiCiAgICAgICAgIGZpbGw9IiNGRkZGRkYiIC8+PC9nPjxnCiAgICAgICBpZD0iZzM0MTkiPjxwYXRoCiAgICAgICAgIGQ9Ik02Ny43NjIsNDguMDc0YzAsMS45NTQtMS41OTksMy41NTMtMy41NTMsMy41NTNINTEuOTg4Yy0xLjk1NCwwLTMuNTUzLTEuNTk5LTMuNTUzLTMuNTUzdi05LjM3OSAgICBjMC0xLjk1NCwxLjU5OS0zLjU1MywzLjU1My0zLjU1M0g2NC4yMWMxLjk1NCwwLDMuNTUzLDEuNTk5LDMuNTUzLDMuNTUzVjQ4LjA3NHoiCiAgICAgICAgIGZpbGw9IiNGRkZGRkYiIC8+PC9nPjxnPjxwYXRoCiAgICAgICAgIGQ9Ik04Mi43NTIsNzcuMDg0YzAsMS45NTQtMS41OTksMy41NTMtMy41NTMsMy41NTNINjYuOTc3Yy0xLjk1NCwwLTMuNTUzLTEuNTk5LTMuNTUzLTMuNTUzdi05LjM3OSAgICBjMC0xLjk1NCwxLjU5OS0zLjU1MywzLjU1My0zLjU1M2gxMi4yMjJjMS45NTQsMCwzLjU1MywxLjU5OSwzLjU1MywzLjU1M1Y3Ny4wODR6IgogICAgICAgICBmaWxsPSIjRkZGRkZGIiAvPjwvZz48L2c+PC9zdmc+';
  Editor.saveImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkgMTJ2N0g1di03SDN2N2MwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0ydi03aC0yem0tNiAuNjdsMi41OS0yLjU4TDE3IDExLjVsLTUgNS01LTUgMS40MS0xLjQxTDExIDEyLjY3VjNoMnoiLz48L3N2Zz4=';
  Editor.globeImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTEuOTkgMkM2LjQ3IDIgMiA2LjQ4IDIgMTJzNC40NyAxMCA5Ljk5IDEwQzE3LjUyIDIyIDIyIDE3LjUyIDIyIDEyUzE3LjUyIDIgMTEuOTkgMnptNi45MyA2aC0yLjk1Yy0uMzItMS4yNS0uNzgtMi40NS0xLjM4LTMuNTYgMS44NC42MyAzLjM3IDEuOTEgNC4zMyAzLjU2ek0xMiA0LjA0Yy44MyAxLjIgMS40OCAyLjUzIDEuOTEgMy45NmgtMy44MmMuNDMtMS40MyAxLjA4LTIuNzYgMS45MS0zLjk2ek00LjI2IDE0QzQuMSAxMy4zNiA0IDEyLjY5IDQgMTJzLjEtMS4zNi4yNi0yaDMuMzhjLS4wOC42Ni0uMTQgMS4zMi0uMTQgMiAwIC42OC4wNiAxLjM0LjE0IDJINC4yNnptLjgyIDJoMi45NWMuMzIgMS4yNS43OCAyLjQ1IDEuMzggMy41Ni0xLjg0LS42My0zLjM3LTEuOS00LjMzLTMuNTZ6bTIuOTUtOEg1LjA4Yy45Ni0xLjY2IDIuNDktMi45MyA0LjMzLTMuNTZDOC44MSA1LjU1IDguMzUgNi43NSA4LjAzIDh6TTEyIDE5Ljk2Yy0uODMtMS4yLTEuNDgtMi41My0xLjkxLTMuOTZoMy44MmMtLjQzIDEuNDMtMS4wOCAyLjc2LTEuOTEgMy45NnpNMTQuMzQgMTRIOS42NmMtLjA5LS42Ni0uMTYtMS4zMi0uMTYtMiAwLS42OC4wNy0xLjM1LjE2LTJoNC42OGMuMDkuNjUuMTYgMS4zMi4xNiAyIDAgLjY4LS4wNyAxLjM0LS4xNiAyem0uMjUgNS41NmMuNi0xLjExIDEuMDYtMi4zMSAxLjM4LTMuNTZoMi45NWMtLjk2IDEuNjUtMi40OSAyLjkzLTQuMzMgMy41NnpNMTYuMzYgMTRjLjA4LS42Ni4xNC0xLjMyLjE0LTIgMC0uNjgtLjA2LTEuMzQtLjE0LTJoMy4zOGMuMTYuNjQuMjYgMS4zMS4yNiAycy0uMSAxLjM2LS4yNiAyaC0zLjM4eiIvPjwvc3ZnPg==';
  Editor.commentImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEuOTkgNGMwLTEuMS0uODktMi0xLjk5LTJINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNGw0IDQtLjAxLTE4ek0xOCAxNEg2di0yaDEydjJ6bTAtM0g2VjloMTJ2MnptMC0zSDZWNmgxMnYyeiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=';
  Editor.userImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+PC9zdmc+';
  Editor.shareImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTggMTYuMDhjLS43NiAwLTEuNDQuMy0xLjk2Ljc3TDguOTEgMTIuN2MuMDUtLjIzLjA5LS40Ni4wOS0uN3MtLjA0LS40Ny0uMDktLjdsNy4wNS00LjExYy41NC41IDEuMjUuODEgMi4wNC44MSAxLjY2IDAgMy0xLjM0IDMtM3MtMS4zNC0zLTMtMy0zIDEuMzQtMyAzYzAgLjI0LjA0LjQ3LjA5LjdMOC4wNCA5LjgxQzcuNSA5LjMxIDYuNzkgOSA2IDljLTEuNjYgMC0zIDEuMzQtMyAzczEuMzQgMyAzIDNjLjc5IDAgMS41LS4zMSAyLjA0LS44MWw3LjEyIDQuMTZjLS4wNS4yMS0uMDguNDMtLjA4LjY1IDAgMS42MSAxLjMxIDIuOTIgMi45MiAyLjkyIDEuNjEgMCAyLjkyLTEuMzEgMi45Mi0yLjkycy0xLjMxLTIuOTItMi45Mi0yLjkyeiIvPjwvc3ZnPg==';
  Editor.syncImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgNFYxTDggNWw0IDRWNmMzLjMxIDAgNiAyLjY5IDYgNiAwIDEuMDEtLjI1IDEuOTctLjcgMi44bDEuNDYgMS40NkMxOS41NCAxNS4wMyAyMCAxMy41NyAyMCAxMmMwLTQuNDItMy41OC04LTgtOHptMCAxNGMtMy4zMSAwLTYtMi42OS02LTYgMC0xLjAxLjI1LTEuOTcuNy0yLjhMNS4yNCA3Ljc0QzQuNDYgOC45NyA0IDEwLjQzIDQgMTJjMCA0LjQyIDMuNTggOCA4IDh2M2w0LTQtNC00djN6Ii8+PC9zdmc+';
  Editor.cloudImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDZjMi42MiAwIDQuODggMS44NiA1LjM5IDQuNDNsLjMgMS41IDEuNTMuMTFjMS41Ni4xIDIuNzggMS40MSAyLjc4IDIuOTYgMCAxLjY1LTEuMzUgMy0zIDNINmMtMi4yMSAwLTQtMS43OS00LTQgMC0yLjA1IDEuNTMtMy43NiAzLjU2LTMuOTdsMS4wNy0uMTEuNS0uOTVDOC4wOCA3LjE0IDkuOTQgNiAxMiA2bTAtMkM5LjExIDQgNi42IDUuNjQgNS4zNSA4LjA0IDIuMzQgOC4zNiAwIDEwLjkxIDAgMTRjMCAzLjMxIDIuNjkgNiA2IDZoMTNjMi43NiAwIDUtMi4yNCA1LTUgMC0yLjY0LTIuMDUtNC43OC00LjY1LTQuOTZDMTguNjcgNi41OSAxNS42NCA0IDEyIDR6Ii8+PC9zdmc+';
  Editor.cloudOffImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI0IDE1YzAtMi42NC0yLjA1LTQuNzgtNC42NS00Ljk2QzE4LjY3IDYuNTkgMTUuNjQgNCAxMiA0Yy0xLjMzIDAtMi41Ny4zNi0zLjY1Ljk3bDEuNDkgMS40OUMxMC41MSA2LjE3IDExLjIzIDYgMTIgNmMzLjA0IDAgNS41IDIuNDYgNS41IDUuNXYuNUgxOWMxLjY2IDAgMyAxLjM0IDMgMyAwIC45OS0uNDggMS44NS0xLjIxIDIuNGwxLjQxIDEuNDFjMS4wOS0uOTIgMS44LTIuMjcgMS44LTMuODF6TTQuNDEgMy44NkwzIDUuMjdsMi43NyAyLjc3aC0uNDJDMi4zNCA4LjM2IDAgMTAuOTEgMCAxNGMwIDMuMzEgMi42OSA2IDYgNmgxMS43M2wyIDIgMS40MS0xLjQxTDQuNDEgMy44NnpNNiAxOGMtMi4yMSAwLTQtMS43OS00LTRzMS43OS00IDQtNGgxLjczbDggOEg2eiIvPjwvc3ZnPg==';
  Editor.calendarImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiMwMDAwMDAiPjxnPjxwYXRoIGQ9Ik0wLDBoMjR2MjRIMFYweiIgZmlsbD0ibm9uZSIvPjwvZz48Zz48cGF0aCBkPSJNMjAsNEg0QzIuOSw0LDIsNC45LDIsNnYxMmMwLDEuMSwwLjksMiwyLDJoMTZjMS4xLDAsMi0wLjksMi0yVjZDMjIsNC45LDIxLjEsNCwyMCw0eiBNOCwxMUg0VjZoNFYxMXogTTE0LDExaC00VjZoNFYxMXogTTIwLDExaC00VjZoNFYxMXogTTgsMThINHYtNWg0VjE4eiBNMTQsMThoLTR2LTVoNFYxOHogTTIwLDE4aC00di01aDRWMTh6Ii8+PC9nPjwvc3ZnPg==';
  Editor.syncProblemImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMyAxMmMwIDIuMjEuOTEgNC4yIDIuMzYgNS42NEwzIDIwaDZ2LTZsLTIuMjQgMi4yNEM1LjY4IDE1LjE1IDUgMTMuNjYgNSAxMmMwLTIuNjEgMS42Ny00LjgzIDQtNS42NVY0LjI2QzUuNTUgNS4xNSAzIDguMjcgMyAxMnptOCA1aDJ2LTJoLTJ2MnpNMjEgNGgtNnY2bDIuMjQtMi4yNEMxOC4zMiA4Ljg1IDE5IDEwLjM0IDE5IDEyYzAgMi42MS0xLjY3IDQuODMtNCA1LjY1djIuMDljMy40NS0uODkgNi00LjAxIDYtNy43NCAwLTIuMjEtLjkxLTQuMi0yLjM2LTUuNjRMMjEgNHptLTEwIDloMlY3aC0ydjZ6Ii8+PC9zdmc+';
  Editor.tailSpin = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9Ii0yIC0yIDQ0IDQ0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI4LjA0MiUiIHkxPSIwJSIgeDI9IjY1LjY4MiUiIHkyPSIyMy44NjUlIiBpZD0iYSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM4MDgwODAiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIwJSIvPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjODA4MDgwIiBzdG9wLW9wYWNpdHk9Ii42MzEiIG9mZnNldD0iNjMuMTQ2JSIvPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjODA4MDgwIiBvZmZzZXQ9IjEwMCUiLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIj4KICAgICAgICAgICAgPHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4IiBzdHJva2U9InVybCgjYSkiIHN0cm9rZS13aWR0aD0iNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybQogICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIKICAgICAgICAgICAgICAgICAgICB0eXBlPSJyb3RhdGUiCiAgICAgICAgICAgICAgICAgICAgZnJvbT0iMCAxOCAxOCIKICAgICAgICAgICAgICAgICAgICB0bz0iMzYwIDE4IDE4IgogICAgICAgICAgICAgICAgICAgIGR1cj0iMC45cyIKICAgICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICAgICAgICAgICAgPC9wYXRoPgogICAgICAgICAgICA8Y2lyY2xlIGZpbGw9IiM4MDgwODAiIGN4PSIzNiIgY3k9IjE4IiByPSIxIj4KICAgICAgICAgICAgICAgIDxhbmltYXRlVHJhbnNmb3JtCiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIgogICAgICAgICAgICAgICAgICAgIHR5cGU9InJvdGF0ZSIKICAgICAgICAgICAgICAgICAgICBmcm9tPSIwIDE4IDE4IgogICAgICAgICAgICAgICAgICAgIHRvPSIzNjAgMTggMTgiCiAgICAgICAgICAgICAgICAgICAgZHVyPSIwLjlzIgogICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8L2NpcmNsZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=';
  Editor.mailImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIyIDZjMC0xLjEtLjktMi0yLTJINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2em0tMiAwbC04IDQuOTlMNCA2aDE2em0wIDEySDRWOGw4IDUgOC01djEweiIvPjwvc3ZnPg==';
  Editor.cameraImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE0LjEyIDRsMS44MyAySDIwdjEySDRWNmg0LjA1bDEuODMtMmg0LjI0TTE1IDJIOUw3LjE3IDRINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yaC0zLjE3TDE1IDJ6bS0zIDdjMS42NSAwIDMgMS4zNSAzIDNzLTEuMzUgMy0zIDMtMy0xLjM1LTMtMyAxLjM1LTMgMy0zbTAtMmMtMi43NiAwLTUgMi4yNC01IDVzMi4yNCA1IDUgNSA1LTIuMjQgNS01LTIuMjQtNS01LTV6Ii8+PC9zdmc+';
  Editor.tagsImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjE4cHgiIGZpbGw9IiMwMDAwMDAiPjxnPjxwYXRoIGQ9Ik0wLDBoMjR2MjRIMFYweiIgZmlsbD0ibm9uZSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNMjEuNDEsMTEuNDFsLTguODMtOC44M0MxMi4yMSwyLjIxLDExLjcsMiwxMS4xNywySDRDMi45LDIsMiwyLjksMiw0djcuMTdjMCwwLjUzLDAuMjEsMS4wNCwwLjU5LDEuNDFsOC44Myw4LjgzIGMwLjc4LDAuNzgsMi4wNSwwLjc4LDIuODMsMGw3LjE3LTcuMTdDMjIuMiwxMy40NiwyMi4yLDEyLjIsMjEuNDEsMTEuNDF6IE0xMi44MywyMEw0LDExLjE3VjRoNy4xN0wyMCwxMi44M0wxMi44MywyMHoiLz48Y2lyY2xlIGN4PSI2LjUiIGN5PSI2LjUiIHI9IjEuNSIvPjwvZz48L2c+PC9zdmc+';
  Editor.darkModeImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTEyIDIxcS0zLjc1IDAtNi4zNzUtMi42MjVUMyAxMnEwLTMuNzUgMi42MjUtNi4zNzVUMTIgM3EuMzUgMCAuNjg4LjAyNS4zMzcuMDI1LjY2Mi4wNzUtMS4wMjUuNzI1LTEuNjM3IDEuODg3UTExLjEgNi4xNSAxMS4xIDcuNXEwIDIuMjUgMS41NzUgMy44MjVRMTQuMjUgMTIuOSAxNi41IDEyLjlxMS4zNzUgMCAyLjUyNS0uNjEzIDEuMTUtLjYxMiAxLjg3NS0xLjYzNy4wNS4zMjUuMDc1LjY2MlEyMSAxMS42NSAyMSAxMnEwIDMuNzUtMi42MjUgNi4zNzVUMTIgMjFabTAtMnEyLjIgMCAzLjk1LTEuMjEyIDEuNzUtMS4yMTMgMi41NS0zLjE2My0uNS4xMjUtMSAuMi0uNS4wNzUtMSAuMDc1LTMuMDc1IDAtNS4yMzgtMi4xNjJROS4xIDEwLjU3NSA5LjEgNy41cTAtLjUuMDc1LTF0LjItMXEtMS45NS44LTMuMTYyIDIuNTVRNSA5LjggNSAxMnEwIDIuOSAyLjA1IDQuOTVROS4xIDE5IDEyIDE5Wm0tLjI1LTYuNzVaIi8+PC9zdmc+';
  Editor.lightModeImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTEyIDE1cTEuMjUgMCAyLjEyNS0uODc1VDE1IDEycTAtMS4yNS0uODc1LTIuMTI1VDEyIDlxLTEuMjUgMC0yLjEyNS44NzVUOSAxMnEwIDEuMjUuODc1IDIuMTI1VDEyIDE1Wm0wIDJxLTIuMDc1IDAtMy41MzctMS40NjNRNyAxNC4wNzUgNyAxMnQxLjQ2My0zLjUzOFE5LjkyNSA3IDEyIDd0My41MzggMS40NjJRMTcgOS45MjUgMTcgMTJxMCAyLjA3NS0xLjQ2MiAzLjUzN1ExNC4wNzUgMTcgMTIgMTdaTTIgMTNxLS40MjUgMC0uNzEyLS4yODhRMSAxMi40MjUgMSAxMnQuMjg4LS43MTNRMS41NzUgMTEgMiAxMWgycS40MjUgMCAuNzEzLjI4N1E1IDExLjU3NSA1IDEydC0uMjg3LjcxMlE0LjQyNSAxMyA0IDEzWm0xOCAwcS0uNDI1IDAtLjcxMi0uMjg4UTE5IDEyLjQyNSAxOSAxMnQuMjg4LS43MTNRMTkuNTc1IDExIDIwIDExaDJxLjQyNSAwIC43MTIuMjg3LjI4OC4yODguMjg4LjcxM3QtLjI4OC43MTJRMjIuNDI1IDEzIDIyIDEzWm0tOC04cS0uNDI1IDAtLjcxMi0uMjg4UTExIDQuNDI1IDExIDRWMnEwLS40MjUuMjg4LS43MTNRMTEuNTc1IDEgMTIgMXQuNzEzLjI4N1ExMyAxLjU3NSAxMyAydjJxMCAuNDI1LS4yODcuNzEyUTEyLjQyNSA1IDEyIDVabTAgMThxLS40MjUgMC0uNzEyLS4yODhRMTEgMjIuNDI1IDExIDIydi0ycTAtLjQyNS4yODgtLjcxMlExMS41NzUgMTkgMTIgMTl0LjcxMy4yODhRMTMgMTkuNTc1IDEzIDIwdjJxMCAuNDI1LS4yODcuNzEyUTEyLjQyNSAyMyAxMiAyM1pNNS42NSA3LjA1IDQuNTc1IDZxLS4zLS4yNzUtLjI4OC0uNy4wMTMtLjQyNS4yODgtLjcyNS4zLS4zLjcyNS0uM3QuNy4zTDcuMDUgNS42NXEuMjc1LjMuMjc1LjcgMCAuNC0uMjc1LjctLjI3NS4zLS42ODcuMjg3LS40MTMtLjAxMi0uNzEzLS4yODdaTTE4IDE5LjQyNWwtMS4wNS0xLjA3NXEtLjI3NS0uMy0uMjc1LS43MTIgMC0uNDEzLjI3NS0uNjg4LjI3NS0uMy42ODgtLjI4Ny40MTIuMDEyLjcxMi4yODdMMTkuNDI1IDE4cS4zLjI3NS4yODguNy0uMDEzLjQyNS0uMjg4LjcyNS0uMy4zLS43MjUuM3QtLjctLjNaTTE2Ljk1IDcuMDVxLS4zLS4yNzUtLjI4Ny0uNjg4LjAxMi0uNDEyLjI4Ny0uNzEyTDE4IDQuNTc1cS4yNzUtLjMuNy0uMjg4LjQyNS4wMTMuNzI1LjI4OC4zLjMuMy43MjV0LS4zLjdMMTguMzUgNy4wNXEtLjMuMjc1LS43LjI3NS0uNCAwLS43LS4yNzVaTTQuNTc1IDE5LjQyNXEtLjMtLjMtLjMtLjcyNXQuMy0uN2wxLjA3NS0xLjA1cS4zLS4yNzUuNzEzLS4yNzUuNDEyIDAgLjY4Ny4yNzUuMy4yNzUuMjg4LjY4OC0uMDEzLjQxMi0uMjg4LjcxMkw2IDE5LjQyNXEtLjI3NS4zLS43LjI4Ny0uNDI1LS4wMTItLjcyNS0uMjg3Wk0xMiAxMloiLz48L3N2Zz4=';
  Editor.spinImage = 'data:image/gif;base64,R0lGODlhDAAMAPUxAEVriVp7lmCAmmGBm2OCnGmHn3OPpneSqYKbr4OcsIScsI2kto6kt46lt5KnuZmtvpquvpuvv56ywaCzwqK1xKu7yay9yq+/zLHAzbfF0bjG0bzJ1LzK1MDN18jT28nT3M3X3tHa4dTc49Xd5Njf5dng5t3k6d/l6uDm6uru8e7x8/Dz9fT29/b4+Pj5+fj5+vr6+v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkKADEAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAADAAMAAAGR8CYcEgsOgYAIax4CCQuQldrCBEsiK8VS2hoFGOrlJDA+cZQwkLnqyoJFZKviSS0ICrE0ec0jDAwIiUeGyBFGhMPFBkhZo1BACH5BAkKAC4ALAAAAAAMAAwAhVB0kFR3k1V4k2CAmmWEnW6Lo3KOpXeSqH2XrIOcsISdsImhtIqhtJCmuJGnuZuwv52wwJ+ywZ+ywqm6yLHBzbLCzrXEz7fF0LnH0rrI0r7L1b/M1sXR2cfT28rV3czW3s/Z4Nfe5Nvi6ODm6uLn6+Ln7OLo7OXq7efs7+zw8u/y9PDy9PX3+Pr7+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZDQJdwSCxGDAIAoVFkFBwYSyIwGE4OkCJxIdG6WkJEx8sSKj7elfBB0a5SQg1EQ0SVVMPKhDM6iUIkRR4ZFxsgJl6JQQAh+QQJCgAxACwAAAAADAAMAIVGa4lcfZdjgpxkg51nhp5ui6N3kqh5lKqFnbGHn7KIoLOQp7iRp7mSqLmTqbqarr6br7+fssGitcOitcSuvsuuv8uwwMyzw861xNC5x9K6x9K/zNbDztjE0NnG0drJ1NzQ2eDS2+LT2+LV3ePZ4Oba4ebb4ufc4+jm6+7t8PLt8PPt8fPx8/Xx9PX09vf19/j3+Pn///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQ8CYcEgsUhQFggFSjCQmnE1jcBhqGBXiIuAQSi7FGEIgfIzCFoCXFCZiPO0hKBMiwl7ET6eUYqlWLkUnISImKC1xbUEAIfkECQoAMgAsAAAAAAwADACFTnKPT3KPVHaTYoKcb4yjcY6leZSpf5mtgZuvh5+yiqG0i6K1jqW3kae5nrHBnrLBn7LCoLPCobTDqbrIqrvIs8LOtMPPtcPPtcTPuMbRucfSvcrUvsvVwMzWxdHaydTcytXdzNbezdff0drh2ODl2+Ln3eTp4Obq4ujs5Ont5uvu6O3w6u7w6u7x7/L09vj5+vr7+vv7////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkdAmXBILHIcicOCUqxELKKPxKAYgiYd4oMAEWo8RVmjIMScwhmBcJMKXwLCECmMGAhPI1QRwBiaSixCMDFhLSorLi8wYYxCQQAh+QQJCgAxACwAAAAADAAMAIVZepVggJphgZtnhp5vjKN2kah3kqmBmq+KobSLorWNpLaRp7mWq7ybr7+gs8KitcSktsWnuManucexwM2ywc63xtG6yNO9ytS+ytW/zNbDz9jH0tvL1d3N197S2+LU3OPU3ePV3eTX3+Xa4efb4ufd5Onl6u7r7vHs7/Lt8PLw8/Xy9Pby9fb09ff2+Pn3+Pn6+vr///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGSMCYcEgseiwSR+RS7GA4JFGF8RiWNiEiJTERgkjFGAQh/KTCGoJwpApnBkITKrwoCFWnFlEhaAxXLC9CBwAGRS4wQgELYY1CQQAh+QQJCgAzACwAAAAADAAMAIVMcI5SdZFhgZtti6JwjaR4k6mAma6Cm6+KobSLorWLo7WNo7aPpredsMCescGitMOitcSmuMaqu8ixwc2zws63xdC4xtG5x9K9ytXAzdfCztjF0NnF0drK1d3M1t7P2N/P2eDT2+LX3+Xe5Onh5+vi5+vj6Ozk6e3n7O/o7O/q7vHs7/Lt8PPu8fPx8/X3+Pn6+vv7+/v8/Pz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRcCZcEgsmkIbTOZTLIlGqZNnchm2SCgiJ6IRqljFmQUiXIVnoITQde4chC9Y+LEQxmTFRkFSNFAqDAMIRQoCAAEEDmeLQQAh+QQJCgAwACwAAAAADAAMAIVXeZRefplff5lhgZtph59yjqV2kaeAmq6FnbGFnrGLorWNpLaQp7mRqLmYrb2essGgs8Klt8apusitvcquv8u2xNC7yNO8ydS8ytTAzdfBzdfM1t7N197Q2eDU3OPX3+XZ4ObZ4ebc4+jf5erg5erg5uvp7fDu8fPv8vTz9fb09vf19/j3+Pn4+fn5+vr6+/v///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRUCYcEgspkwjEKhUVJ1QsBNp0xm2VixiSOMRvlxFGAcTJook5eEHIhQcwpWIkAFQECkNy9AQWFwyEAkPRQ4FAwQIE2llQQAh+QQJCgAvACwAAAAADAAMAIVNcY5SdZFigptph6BvjKN0kKd8lquAmq+EnbGGn7KHn7ONpLaOpbearr+csMCdscCescGhtMOnuMauvsuzws60w862xdC9ytW/y9a/zNbCztjG0drH0tvK1N3M1t7N19/U3ePb4uff5urj6Ozk6e3l6u7m6u7o7PDq7vDt8PPv8vTw8vTw8/X19vf6+vv///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQ8CXcEgsvlytVUplJLJIpSEDUESFTELBwSgCCQEV42kjDFiMo4uQsDB2MkLHoEHUTD7DRAHC8VAiZ0QSCgYIDxhNiUEAOw==';
  Editor.errorImage = 'data:image/gif;base64,R0lGODlhEAAQAPcAAADGAIQAAISEhP8AAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAAALAAAAAAQABAAAAhoAAEIFBigYMGBCAkGGMCQ4cGECxtKHBAAYUQCEzFSHLiQgMeGHjEGEAAg4oCQJz86LCkxpEqHAkwyRClxpEyXGmGaREmTIsmOL1GO/DkzI0yOE2sKIMlRJsWhCQHENDiUaVSpS5cmDAgAOw==';
  Editor.smallPlusImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDdCMTdENjVCOEM4MTFFNDlCRjVBNDdCODU5NjNBNUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDdCMTdENjZCOEM4MTFFNDlCRjVBNDdCODU5NjNBNUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowN0IxN0Q2M0I4QzgxMUU0OUJGNUE0N0I4NTk2M0E1QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowN0IxN0Q2NEI4QzgxMUU0OUJGNUE0N0I4NTk2M0E1QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtjrjmgAAAAtSURBVHjaYvz//z8DMigvLwcLdHZ2MiKLMzEQCaivkLGsrOw/dU0cAr4GCDAARQsQbTFrv10AAAAASUVORK5CYII=';
  Editor.hiResImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA+CAMAAACLMWy1AAAAh1BMVEUAAABMTExERERBQUFBQUFFRUVAQEBCQkJAQEA6OjpDQ0NKSkpBQUFBQUFERERERERBQUFCQkJCQkJCQkJJSUlBQUFCQkJDQ0NDQ0NCQkJDQ0NBQUFBQUFCQkJBQUFCQkJCQkJDQ0NCQkJHR0dBQUFCQkJCQkJAQEBCQkJDQ0NAQEBERERCQkIk1hS2AAAAKnRSTlMAAjj96BL7PgQFRwfu3TYazKuVjRXl1V1DPCn1uLGjnWNVIgy9hU40eGqPkM38AAACG0lEQVRYw+2X63KbMBCFzwZblgGDceN74muatpLe//m6MHV3gHGFAv2RjM94MAbxzdnVsQbBDKwH8AH8MDAyafzjqYeyOG04XE7RS8nIRDXg6BlT+rA0nmtAPh+NQRDxIASIMG44rAMrGunBgHwy3uUldxggIStGKp2f+DQc2O4h4eQsX3O2IFB/oEbsjOKbStnjAEA+zJ0ylZTbgvoDn8xNyn6Dbj5Kd4GsNpABa6duQPfSdEj88TgMAhKuCWjAkgmFXPLnsD0pWd3OFGdrMugQII/eOMPEiGOzqPMIeWrcSoMCg71W1pXBPvCP+gS/OdXqQ3uW23+93XGWLl/OaBb805bNcBPoEIcVJsnHzcxpZH86u5KZ9gDby5dQCcnKqdbke4ItI4Tzd7IW9hZQt4EO6GG9b9sYuuK9Wwn8TIr2xKbF2+3Nhr+qxChJ/AI6pIfCu4z4Zowp4ZUNihz79vewzctnHDwTvQO/hCdFBzrUGDOPn2Y/F8YKT4oOATLvlhOznzmBSdFBJWtc58y7r+UVFOCQczy3wpN6pegDqHtsCPTGvH9JuTO0Dyg8icldYPk+RB6g8Aofj4m2EKBvtTmUPD9xDd1pPcSReV2U5iD/ik2yrngtvvqBfPzOvKiDTKTsCdoHZJ7pLLffgTwlJ5vJdtJV2/jiAYaLvLGhMAEDO5QcDg2M/jOw/8Zn+K3ZwJvHT7ZffgC/NvA3zcybTeIfE4EAAAAASUVORK5CYII=';
  Editor.loResImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA+CAMAAACLMWy1AAAAS1BMVEVAQEAAAAA1NTVBQUFDQ0NDQ0NFRUVERERBQUFBQUFBQUFAQEBBQUFBQUFCQkJCQkJCQkJBQUFCQkJDQ0NDQ0NCQkJCQkJCQkJGRkb5/XqTAAAAGXRSTlP+AAWODlASCsesX+Lc2LyWe3pwa1tCPjohjSJfoAAAAI1JREFUWMPt1MkKhTAMRuG0anvneXr/J71nUypKcdqI/N8yhLMKMZE1CahnClDQzMPB44ED3EgeCubgDWnWQMHpwTtKwTe+UHD4sJ94wbUEHHFGhILlYDeSnsQeabeCgsPBgB0MOZZ9oGA5GJFiJSfUULAfjLjARrhCwX7wh2YCDwVbwZkUBKqFFJRN+wOcwSgR2sREcgAAAABJRU5ErkJggg==';
  Editor.blankImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
  Editor.facebookImage = IMAGE_PATH + '/facebook.png';
  Editor.tweetImage = IMAGE_PATH + '/tweet.png';
  Editor.svgBrokenImage = Graph.createSvgImage(10, 10, '<rect x="0" y="0" width="10" height="10" stroke="#000" fill="transparent"/><path d="m 0 0 L 10 10 L 0 10 L 10 0" stroke="#000" fill="transparent"/>');
  Editor.configurationKey = '.configuration';
  Editor.settingsKey = '.drawio-config';
  Editor.defaultCustomLibraries = [];
  Editor.enableCustomLibraries = !0;
  Editor.enableUncompressedLibraries = !1;
  Editor.enableCustomProperties = !0;
  Editor.enableSimpleTheme = !0;
  Editor.defaultIncludeDiagram = !0;
  Editor.enableServiceWorker = '0' != urlParams.pwa && 'serviceWorker' in navigator && ('1' == urlParams.offline || /.*\.diagrams\.net$/.test(window.location.hostname) || /.*\.draw\.io$/.test(window.location.hostname));
  Editor.enableWebFonts = '1' != urlParams['safe-style-src'];
  Editor.enableShadowOption = !mxClient.IS_SF;
  Editor.enableExportUrl = !0;
  Editor.enableRealtime = !0;
  Editor.compressXml = !0;
  Editor.oneDriveInlinePicker = null != window.urlParams && '0' == window.urlParams.inlinePicker ? !1 : !0;
  Editor.globalVars = null;
  Editor.config = null;
  Editor.configVersion = null;
  Editor.defaultBorder = 5;
  Editor.commonProperties = [{
      name: 'enumerate',
      dispName: 'Enumerate',
      type: 'bool',
      defVal: !1,
      onChange: function(p) {
        p.refresh();
      }
    },
    {
      name: 'enumerateValue',
      dispName: 'Enumerate Value',
      type: 'string',
      defVal: '',
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'enumerate', '0');
      }
    },
    {
      name: 'comic',
      dispName: 'Comic',
      type: 'bool',
      defVal: !1,
      isVisible: function(p, B) {
        return '1' != mxUtils.getValue(p.style, 'sketch', '0');
      }
    },
    {
      name: 'jiggle',
      dispName: 'Jiggle',
      type: 'float',
      min: 0,
      defVal: 1,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'comic', '0') || '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0');
      }
    },
    {
      name: 'fillWeight',
      dispName: 'Fill Weight',
      type: 'int',
      defVal: -1,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0') && 0 < p.vertices.length;
      }
    },
    {
      name: 'hachureGap',
      dispName: 'Hachure Gap',
      type: 'int',
      defVal: -1,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0') && 0 < p.vertices.length;
      }
    },
    {
      name: 'hachureAngle',
      dispName: 'Hachure Angle',
      type: 'int',
      defVal: -41,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0') && 0 < p.vertices.length;
      }
    },
    {
      name: 'curveFitting',
      dispName: 'Curve Fitting',
      type: 'float',
      defVal: 0.95,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0');
      }
    },
    {
      name: 'simplification',
      dispName: 'Simplification',
      type: 'float',
      defVal: 0,
      min: 0,
      max: 1,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0');
      }
    },
    {
      name: 'disableMultiStroke',
      dispName: 'Disable Multi Stroke',
      type: 'bool',
      defVal: !1,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0');
      }
    },
    {
      name: 'disableMultiStrokeFill',
      dispName: 'Disable Multi Stroke Fill',
      type: 'bool',
      defVal: !1,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0') && 0 < p.vertices.length;
      }
    },
    {
      name: 'dashOffset',
      dispName: 'Dash Offset',
      type: 'int',
      defVal: -1,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0') && 0 < p.vertices.length;
      }
    },
    {
      name: 'dashGap',
      dispName: 'Dash Gap',
      type: 'int',
      defVal: -1,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0') && 0 < p.vertices.length;
      }
    },
    {
      name: 'zigzagOffset',
      dispName: 'ZigZag Offset',
      type: 'int',
      defVal: -1,
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0') && 0 < p.vertices.length;
      }
    },
    {
      name: 'sketchStyle',
      dispName: 'Sketch Style',
      type: 'enum',
      defVal: 'rough',
      enumList: [{
          val: 'rough',
          dispName: 'Rough'
        },
        {
          val: 'comic',
          dispName: 'Comic'
        }
      ],
      isVisible: function(p, B) {
        return '1' == mxUtils.getValue(p.style, 'sketch', '1' == urlParams.rough ? '1' : '0');
      }
    }
  ];
  Editor.commonEdgeProperties = [{
      type: 'separator'
    },
    {
      name: 'arcSize',
      dispName: 'Arc Size',
      type: 'float',
      min: 0,
      defVal: mxConstants.LINE_ARCSIZE
    },
    {
      name: 'sourcePortConstraint',
      dispName: 'Source Constraint',
      type: 'enum',
      defVal: 'none',
      enumList: [{
          val: 'none',
          dispName: 'None'
        },
        {
          val: 'north',
          dispName: 'North'
        },
        {
          val: 'east',
          dispName: 'East'
        },
        {
          val: 'south',
          dispName: 'South'
        },
        {
          val: 'west',
          dispName: 'West'
        }
      ]
    },
    {
      name: 'targetPortConstraint',
      dispName: 'Target Constraint',
      type: 'enum',
      defVal: 'none',
      enumList: [{
          val: 'none',
          dispName: 'None'
        },
        {
          val: 'north',
          dispName: 'North'
        },
        {
          val: 'east',
          dispName: 'East'
        },
        {
          val: 'south',
          dispName: 'South'
        },
        {
          val: 'west',
          dispName: 'West'
        }
      ]
    },
    {
      name: 'jettySize',
      dispName: 'Jetty Size',
      type: 'int',
      min: 0,
      defVal: 'auto',
      allowAuto: !0,
      isVisible: function(p) {
        return 'orthogonalEdgeStyle' == mxUtils.getValue(p.style, mxConstants.STYLE_EDGE, null);
      }
    },
    {
      name: 'fillOpacity',
      dispName: 'Fill Opacity',
      type: 'int',
      min: 0,
      max: 100,
      defVal: 100
    },
    {
      name: 'strokeOpacity',
      dispName: 'Stroke Opacity',
      type: 'int',
      min: 0,
      max: 100,
      defVal: 100
    },
    {
      name: 'startFill',
      dispName: 'Start Fill',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'endFill',
      dispName: 'End Fill',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'perimeterSpacing',
      dispName: 'Terminal Spacing',
      type: 'float',
      defVal: 0
    },
    {
      name: 'anchorPointDirection',
      dispName: 'Anchor Direction',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'snapToPoint',
      dispName: 'Snap to Point',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'fixDash',
      dispName: 'Fixed Dash',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'editable',
      dispName: 'Editable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'metaEdit',
      dispName: 'Edit Dialog',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'backgroundOutline',
      dispName: 'Background Outline',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'bendable',
      dispName: 'Bendable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'movable',
      dispName: 'Movable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'cloneable',
      dispName: 'Cloneable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'deletable',
      dispName: 'Deletable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'noJump',
      dispName: 'No Jumps',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'flowAnimation',
      dispName: 'Flow Animation',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'ignoreEdge',
      dispName: 'Ignore Edge',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'orthogonalLoop',
      dispName: 'Loop Routing',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'orthogonal',
      dispName: 'Orthogonal',
      type: 'bool',
      defVal: !1
    }
  ].concat(Editor.commonProperties);
  Editor.commonVertexProperties = [{
      name: 'colspan',
      dispName: 'Colspan',
      type: 'int',
      min: 1,
      defVal: 1,
      isVisible: function(p, B) {
        B = B.editorUi.editor.graph;
        return 1 == p.vertices.length && 0 == p.edges.length && B.isTableCell(p.vertices[0]);
      }
    },
    {
      name: 'rowspan',
      dispName: 'Rowspan',
      type: 'int',
      min: 1,
      defVal: 1,
      isVisible: function(p, B) {
        B = B.editorUi.editor.graph;
        return 1 == p.vertices.length && 0 == p.edges.length && B.isTableCell(p.vertices[0]);
      }
    },
    {
      type: 'separator'
    },
    {
      name: 'resizeLastRow',
      dispName: 'Resize Last Row',
      type: 'bool',
      getDefaultValue: function(p, B) {
        p = B.editorUi.editor.graph.getCellStyle(1 == p.vertices.length && 0 == p.edges.length ? p.vertices[0] : null);
        return '1' == mxUtils.getValue(p, 'resizeLastRow', '0');
      },
      isVisible: function(p, B) {
        B = B.editorUi.editor.graph;
        return 1 == p.vertices.length && 0 == p.edges.length && B.isTable(p.vertices[0]);
      }
    },
    {
      name: 'resizeLast',
      dispName: 'Resize Last Column',
      type: 'bool',
      getDefaultValue: function(p, B) {
        p = B.editorUi.editor.graph.getCellStyle(1 == p.vertices.length && 0 == p.edges.length ? p.vertices[0] : null);
        return '1' == mxUtils.getValue(p, 'resizeLast', '0');
      },
      isVisible: function(p, B) {
        B = B.editorUi.editor.graph;
        return 1 == p.vertices.length && 0 == p.edges.length && B.isTable(p.vertices[0]);
      }
    },
    {
      name: 'fillOpacity',
      dispName: 'Fill Opacity',
      type: 'int',
      min: 0,
      max: 100,
      defVal: 100
    },
    {
      name: 'strokeOpacity',
      dispName: 'Stroke Opacity',
      type: 'int',
      min: 0,
      max: 100,
      defVal: 100
    },
    {
      name: 'overflow',
      dispName: 'Text Overflow',
      defVal: 'visible',
      type: 'enum',
      enumList: [{
          val: 'visible',
          dispName: 'Visible'
        },
        {
          val: 'hidden',
          dispName: 'Hidden'
        },
        {
          val: 'block',
          dispName: 'Block'
        },
        {
          val: 'fill',
          dispName: 'Fill'
        },
        {
          val: 'width',
          dispName: 'Width'
        }
      ]
    },
    {
      name: 'noLabel',
      dispName: 'Hide Label',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'labelPadding',
      dispName: 'Label Padding',
      type: 'float',
      defVal: 0
    },
    {
      name: 'direction',
      dispName: 'Direction',
      type: 'enum',
      defVal: 'east',
      enumList: [{
          val: 'north',
          dispName: 'North'
        },
        {
          val: 'east',
          dispName: 'East'
        },
        {
          val: 'south',
          dispName: 'South'
        },
        {
          val: 'west',
          dispName: 'West'
        }
      ]
    },
    {
      name: 'portConstraint',
      dispName: 'Constraint',
      type: 'enum',
      defVal: 'none',
      enumList: [{
          val: 'none',
          dispName: 'None'
        },
        {
          val: 'north',
          dispName: 'North'
        },
        {
          val: 'east',
          dispName: 'East'
        },
        {
          val: 'south',
          dispName: 'South'
        },
        {
          val: 'west',
          dispName: 'West'
        }
      ]
    },
    {
      name: 'portConstraintRotation',
      dispName: 'Rotate Constraint',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'connectable',
      dispName: 'Connectable',
      type: 'bool',
      getDefaultValue: function(p, B) {
        return B.editorUi.editor.graph.isCellConnectable(0 < p.vertices.length && 0 == p.edges.length ? p.vertices[0] : null);
      },
      isVisible: function(p, B) {
        return 0 < p.vertices.length && 0 == p.edges.length;
      }
    },
    {
      name: 'allowArrows',
      dispName: 'Allow Arrows',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'snapToPoint',
      dispName: 'Snap to Point',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'perimeter',
      dispName: 'Perimeter',
      defVal: 'none',
      type: 'enum',
      enumList: [{
          val: 'none',
          dispName: 'None'
        },
        {
          val: 'rectanglePerimeter',
          dispName: 'Rectangle'
        },
        {
          val: 'ellipsePerimeter',
          dispName: 'Ellipse'
        },
        {
          val: 'rhombusPerimeter',
          dispName: 'Rhombus'
        },
        {
          val: 'trianglePerimeter',
          dispName: 'Triangle'
        },
        {
          val: 'hexagonPerimeter2',
          dispName: 'Hexagon'
        },
        {
          val: 'lifelinePerimeter',
          dispName: 'Lifeline'
        },
        {
          val: 'orthogonalPerimeter',
          dispName: 'Orthogonal'
        },
        {
          val: 'backbonePerimeter',
          dispName: 'Backbone'
        },
        {
          val: 'calloutPerimeter',
          dispName: 'Callout'
        },
        {
          val: 'parallelogramPerimeter',
          dispName: 'Parallelogram'
        },
        {
          val: 'trapezoidPerimeter',
          dispName: 'Trapezoid'
        },
        {
          val: 'stepPerimeter',
          dispName: 'Step'
        },
        {
          val: 'centerPerimeter',
          dispName: 'Center'
        }
      ]
    },
    {
      name: 'fixDash',
      dispName: 'Fixed Dash',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'container',
      dispName: 'Container',
      type: 'bool',
      defVal: !1,
      isVisible: function(p, B) {
        return 1 == p.vertices.length && 0 == p.edges.length;
      }
    },
    {
      name: 'dropTarget',
      dispName: 'Drop Target',
      type: 'bool',
      getDefaultValue: function(p, B) {
        p = 1 == p.vertices.length && 0 == p.edges.length ? p.vertices[0] : null;
        B = B.editorUi.editor.graph;
        return null != p && (B.isSwimlane(p) || 0 < B.model.getChildCount(p));
      },
      isVisible: function(p, B) {
        return 1 == p.vertices.length && 0 == p.edges.length;
      }
    },
    {
      name: 'collapsible',
      dispName: 'Collapsible',
      type: 'bool',
      getDefaultValue: function(p, B) {
        var N = 1 == p.vertices.length && 0 == p.edges.length ? p.vertices[0] : null;
        B = B.editorUi.editor.graph;
        return null != N && (B.isContainer(N) && '0' != p.style.collapsible || !B.isContainer(N) && '1' == p.style.collapsible);
      },
      isVisible: function(p, B) {
        return 1 == p.vertices.length && 0 == p.edges.length;
      }
    },
    {
      name: 'recursiveResize',
      dispName: 'Resize Children',
      type: 'bool',
      defVal: !0,
      isVisible: function(p, B) {
        return 1 == p.vertices.length && 0 == p.edges.length && !B.editorUi.editor.graph.isSwimlane(p.vertices[0]) && null == mxUtils.getValue(p.style, 'childLayout', null);
      }
    },
    {
      name: 'expand',
      dispName: 'Expand',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'part',
      dispName: 'Part',
      type: 'bool',
      defVal: !1,
      isVisible: function(p, B) {
        B = B.editorUi.editor.graph.model;
        return 0 < p.vertices.length ? B.isVertex(B.getParent(p.vertices[0])) : !1;
      }
    },
    {
      name: 'editable',
      dispName: 'Editable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'metaEdit',
      dispName: 'Edit Dialog',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'backgroundOutline',
      dispName: 'Background Outline',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'movable',
      dispName: 'Movable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'movableLabel',
      dispName: 'Movable Label',
      type: 'bool',
      defVal: !1,
      isVisible: function(p, B) {
        p = 0 < p.vertices.length ? B.editorUi.editor.graph.getCellGeometry(p.vertices[0]) : null;
        return null != p && !p.relative;
      }
    },
    {
      name: 'autosize',
      dispName: 'Autosize',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'fixedWidth',
      dispName: 'Fixed Width',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'resizable',
      dispName: 'Resizable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'resizeWidth',
      dispName: 'Resize Width',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'resizeHeight',
      dispName: 'Resize Height',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'rotatable',
      dispName: 'Rotatable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'cloneable',
      dispName: 'Cloneable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'deletable',
      dispName: 'Deletable',
      type: 'bool',
      defVal: !0
    },
    {
      name: 'treeFolding',
      dispName: 'Tree Folding',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'treeMoving',
      dispName: 'Tree Moving',
      type: 'bool',
      defVal: !1
    },
    {
      name: 'pointerEvents',
      dispName: 'Pointer Events',
      type: 'bool',
      defVal: !0,
      isVisible: function(p, B) {
        var N = mxUtils.getValue(p.style, mxConstants.STYLE_FILLCOLOR, null);
        return B.editorUi.editor.graph.isSwimlane(p.vertices[0]) || null == N || N == mxConstants.NONE || 0 == mxUtils.getValue(p.style, mxConstants.STYLE_FILL_OPACITY, 100) || 0 == mxUtils.getValue(p.style, mxConstants.STYLE_OPACITY, 100) || null != p.style.pointerEvents;
      }
    },
    {
      name: 'moveCells',
      dispName: 'Move Cells on Fold',
      type: 'bool',
      defVal: !1,
      isVisible: function(p, B) {
        return 0 < p.vertices.length && B.editorUi.editor.graph.isContainer(p.vertices[0]);
      }
    }
  ].concat(Editor.commonProperties);
  Editor.svgDarkModeCss = '@media (prefers-color-scheme: dark) {:root {--light-color: #c9d1d9; --dark-color: #0d1117; }svg[style^="background-color:"] { background-color: var(--dark-color) !important; }g[filter="url(#dropShadow)"] { filter: none !important; }[stroke="rgb(0, 0, 0)"] { stroke: var(--light-color); }[stroke="rgb(255, 255, 255)"] { stroke: var(--dark-color); }[fill="rgb(0, 0, 0)"] { fill: var(--light-color); }[fill="rgb(255, 255, 255)"] { fill: var(--dark-color); }g[fill="rgb(0, 0, 0)"] text { fill: var(--light-color); }div[data-drawio-colors*="color: rgb(0, 0, 0)"]\tdiv { color: var(--light-color) !important; }div[data-drawio-colors*="border-color: rgb(0, 0, 0)"]\t{ border-color: var(--light-color) !important; }div[data-drawio-colors*="border-color: rgb(0, 0, 0)"]\tdiv { border-color: var(--light-color) !important; }div[data-drawio-colors*="background-color: rgb(255, 255, 255)"]\t{ background-color: var(--dark-color) !important; }div[data-drawio-colors*="background-color: rgb(255, 255, 255)"]\tdiv { background-color: var(--dark-color) !important; }}';
  Editor.defaultCsvValue = '##\n## Example CSV import. Use ## for comments and # for configuration. Paste CSV below.\n## The following names are reserved and should not be used (or ignored):\n## id, tooltip, placeholder(s), link and label (see below)\n##\n#\n## Node label with placeholders and HTML.\n## Default is \'%name_of_first_column%\'.\n#\n# label: %name%<br><i style="color:gray;">%position%</i><br><a href="mailto:%email%">Email</a>\n#\n## Node style (placeholders are replaced once).\n## Default is the current style for nodes.\n#\n# style: label;image=%image%;whiteSpace=wrap;html=1;rounded=1;fillColor=%fill%;strokeColor=%stroke%;\n#\n## Parent style for nodes with child nodes (placeholders are replaced once).\n#\n# parentstyle: swimlane;whiteSpace=wrap;html=1;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeLast=0;collapsible=1;\n#\n## Style to be used for objects not in the CSV. If this is - then such objects are ignored,\n## else they are created using this as their style, eg. whiteSpace=wrap;html=1;\n#\n# unknownStyle: -\n#\n## Optional column name that contains a reference to a named style in styles.\n## Default is the current style for nodes.\n#\n# stylename: -\n#\n## JSON for named styles of the form {"name": "style", "name": "style"} where style is a cell style with\n## placeholders that are replaced once.\n#\n# styles: -\n#\n## JSON for variables in styles of the form {"name": "value", "name": "value"} where name is a string\n## that will replace a placeholder in a style.\n#\n# vars: -\n#\n## Optional column name that contains a reference to a named label in labels.\n## Default is the current label.\n#\n# labelname: -\n#\n## JSON for named labels of the form {"name": "label", "name": "label"} where label is a cell label with\n## placeholders.\n#\n# labels: -\n#\n## Uses the given column name as the identity for cells (updates existing cells).\n## Default is no identity (empty value or -).\n#\n# identity: -\n#\n## Uses the given column name as the parent reference for cells. Default is no parent (empty or -).\n## The identity above is used for resolving the reference so it must be specified.\n#\n# parent: -\n#\n## Adds a prefix to the identity of cells to make sure they do not collide with existing cells (whose\n## IDs are numbers from 0..n, sometimes with a GUID prefix in the context of realtime collaboration).\n## Default is csvimport-.\n#\n# namespace: csvimport-\n#\n## Connections between rows ("from": source colum, "to": target column).\n## Label, style and invert are optional. Defaults are \'\', current style and false.\n## If placeholders are used in the style, they are replaced with data from the source.\n## An optional placeholders can be set to target to use data from the target instead.\n## In addition to label, an optional fromlabel and tolabel can be used to name the column\n## that contains the text for the label in the edges source or target (invert ignored).\n## In addition to those, an optional source and targetlabel can be used to specify a label\n## that contains placeholders referencing the respective columns in the source or target row.\n## The label is created in the form fromlabel + sourcelabel + label + tolabel + targetlabel.\n## Additional labels can be added by using an optional labels array with entries of the\n## form {"label": string, "x": number, "y": number, "dx": number, "dy": number} where\n## x is from -1 to 1 along the edge, y is orthogonal, and dx/dy are offsets in pixels.\n## An optional placeholders with the string value "source" or "target" can be specified\n## to replace placeholders in the additional label with data from the source or target.\n## The target column may contain a comma-separated list of values.\n## Multiple connect entries are allowed.\n#\n# connect: {"from": "manager", "to": "name", "invert": true, "label": "manages", \\\n#          "style": "curved=1;endArrow=blockThin;endFill=1;fontSize=11;"}\n# connect: {"from": "refs", "to": "id", "style": "curved=1;fontSize=11;"}\n#\n## Node x-coordinate. Possible value is a column name. Default is empty. Layouts will\n## override this value.\n#\n# left: \n#\n## Node y-coordinate. Possible value is a column name. Default is empty. Layouts will\n## override this value.\n#\n# top: \n#\n## Node width. Possible value is a number (in px), auto or an @ sign followed by a column\n## name that contains the value for the width. Default is auto.\n#\n# width: auto\n#\n## Node height. Possible value is a number (in px), auto or an @ sign followed by a column\n## name that contains the value for the height. Default is auto.\n#\n# height: auto\n#\n## Collapsed state for vertices. Possible values are true or false. Default is false.\n#\n# collapsed: false\n#\n## Padding for autosize. Default is 0.\n#\n# padding: -12\n#\n## Comma-separated list of ignored columns for metadata. (These can be\n## used for connections and styles but will not be added as metadata.)\n#\n# ignore: id,image,fill,stroke,refs,manager\n#\n## Column to be renamed to link attribute (used as link).\n#\n# link: url\n#\n## Spacing between nodes. Default is 40.\n#\n# nodespacing: 40\n#\n## Spacing between levels of hierarchical layouts. Default is 100.\n#\n# levelspacing: 100\n#\n## Spacing between parallel edges. Default is 40. Use 0 to disable.\n#\n# edgespacing: 40\n#\n## Name or JSON of layout. Possible values are auto, none, verticaltree, horizontaltree,\n## verticalflow, horizontalflow, organic, circle, orgchart or a JSON string as used in\n## Layout, Apply. Default is auto.\n#\n# layout: auto\n#\n## ---- CSV below this line. First line are column names. ----\nname,position,id,location,manager,email,fill,stroke,refs,url,image\nTessa Miller,CFO,emi,Office 1,,me@example.com,#dae8fc,#6c8ebf,,https://www.draw.io,https://cdn3.iconfinder.com/data/icons/user-avatars-1/512/users-3-128.png\nEdward Morrison,Brand Manager,emo,Office 2,Tessa Miller,me@example.com,#d5e8d4,#82b366,,https://www.draw.io,https://cdn3.iconfinder.com/data/icons/user-avatars-1/512/users-10-3-128.png\nAlison Donovan,System Admin,rdo,Office 3,Tessa Miller,me@example.com,#d5e8d4,#82b366,"emo,tva",https://www.draw.io,https://cdn3.iconfinder.com/data/icons/user-avatars-1/512/users-2-128.png\nEvan Valet,HR Director,tva,Office 4,Tessa Miller,me@example.com,#d5e8d4,#82b366,,https://www.draw.io,https://cdn3.iconfinder.com/data/icons/user-avatars-1/512/users-9-2-128.png\n';
  Editor.createRoughCanvas = function(p) {
    var B = rough.canvas({
      getContext: function() {
        return p;
      }
    });
    B.draw = function(N) {
      var S = N.sets || [];
      N = N.options || this.getDefaultOptions();
      for (var R = 0; R < S.length; R++) {
        var V = S[R];
        switch (V.type) {
          case 'path':
            null != N.stroke && this._drawToContext(p, V, N);
            break;
          case 'fillPath':
            this._drawToContext(p, V, N);
            break;
          case 'fillSketch':
            this.fillSketch(p, V, N);
        }
      }
    };
    B.fillSketch = function(N, S, R) {
      var V = p.state.strokeColor,
        T = p.state.strokeWidth,
        U = p.state.strokeAlpha,
        X = p.state.dashed,
        Z = R.fillWeight;
      0 > Z && (Z = R.strokeWidth / 2);
      p.setStrokeAlpha(p.state.fillAlpha);
      p.setStrokeColor(R.fill || '');
      p.setStrokeWidth(Z);
      p.setDashed(!1);
      this._drawToContext(N, S, R);
      p.setDashed(X);
      p.setStrokeWidth(T);
      p.setStrokeColor(V);
      p.setStrokeAlpha(U);
    };
    B._drawToContext = function(N, S, R) {
      N.begin();
      for (var V = 0; V < S.ops.length; V++) {
        var T = S.ops[V],
          U = T.data;
        switch (T.op) {
          case 'move':
            N.moveTo(U[0], U[1]);
            break;
          case 'bcurveTo':
            N.curveTo(U[0], U[1], U[2], U[3], U[4], U[5]);
            break;
          case 'lineTo':
            N.lineTo(U[0], U[1]);
        }
      }
      N.end();
      'fillPath' === S.type && R.filled ? N.fill() : N.stroke();
    };
    return B;
  };
  (function() {
    function p(V, T, U) {
      this.canvas = V;
      this.rc = T;
      this.shape = U;
      this.canvas.setLineJoin('round');
      this.canvas.setLineCap('round');
      this.originalBegin = this.canvas.begin;
      this.canvas.begin = mxUtils.bind(this, p.prototype.begin);
      this.originalEnd = this.canvas.end;
      this.canvas.end = mxUtils.bind(this, p.prototype.end);
      this.originalRect = this.canvas.rect;
      this.canvas.rect = mxUtils.bind(this, p.prototype.rect);
      this.originalRoundrect = this.canvas.roundrect;
      this.canvas.roundrect = mxUtils.bind(this, p.prototype.roundrect);
      this.originalEllipse = this.canvas.ellipse;
      this.canvas.ellipse = mxUtils.bind(this, p.prototype.ellipse);
      this.originalLineTo = this.canvas.lineTo;
      this.canvas.lineTo = mxUtils.bind(this, p.prototype.lineTo);
      this.originalMoveTo = this.canvas.moveTo;
      this.canvas.moveTo = mxUtils.bind(this, p.prototype.moveTo);
      this.originalQuadTo = this.canvas.quadTo;
      this.canvas.quadTo = mxUtils.bind(this, p.prototype.quadTo);
      this.originalCurveTo = this.canvas.curveTo;
      this.canvas.curveTo = mxUtils.bind(this, p.prototype.curveTo);
      this.originalArcTo = this.canvas.arcTo;
      this.canvas.arcTo = mxUtils.bind(this, p.prototype.arcTo);
      this.originalClose = this.canvas.close;
      this.canvas.close = mxUtils.bind(this, p.prototype.close);
      this.originalFill = this.canvas.fill;
      this.canvas.fill = mxUtils.bind(this, p.prototype.fill);
      this.originalStroke = this.canvas.stroke;
      this.canvas.stroke = mxUtils.bind(this, p.prototype.stroke);
      this.originalFillAndStroke = this.canvas.fillAndStroke;
      this.canvas.fillAndStroke = mxUtils.bind(this, p.prototype.fillAndStroke);
      this.path = [];
      this.passThrough = !1;
    }
    p.prototype.moveOp = 'M';
    p.prototype.lineOp = 'L';
    p.prototype.quadOp = 'Q';
    p.prototype.curveOp = 'C';
    p.prototype.closeOp = 'Z';
    p.prototype.getStyle = function(V, T) {
      var U = 1;
      if (null != this.shape.state) {
        var X = this.shape.state.cell.id;
        if (null != X)
          for (var Z = 0; Z < X.length; Z++)
            U = (U << 5) - U + X.charCodeAt(Z) << 0;
      }
      U = {
        strokeWidth: this.canvas.state.strokeWidth,
        seed: U,
        preserveVertices: !0
      };
      X = this.rc.getDefaultOptions();
      U.stroke = V ? this.canvas.state.strokeColor === mxConstants.NONE ? 'transparent' : this.canvas.state.strokeColor : mxConstants.NONE;
      V = null;
      (U.filled = T) ? (U.fill = this.canvas.state.fillColor === mxConstants.NONE ? '' : this.canvas.state.fillColor, V = this.canvas.state.gradientColor === mxConstants.NONE ? null : this.canvas.state.gradientColor) : U.fill = '';
      U.bowing = mxUtils.getValue(this.shape.style, 'bowing', X.bowing);
      U.hachureAngle = mxUtils.getValue(this.shape.style, 'hachureAngle', X.hachureAngle);
      U.curveFitting = mxUtils.getValue(this.shape.style, 'curveFitting', X.curveFitting);
      U.roughness = mxUtils.getValue(this.shape.style, 'jiggle', X.roughness);
      U.simplification = mxUtils.getValue(this.shape.style, 'simplification', X.simplification);
      U.disableMultiStroke = mxUtils.getValue(this.shape.style, 'disableMultiStroke', X.disableMultiStroke);
      U.disableMultiStrokeFill = mxUtils.getValue(this.shape.style, 'disableMultiStrokeFill', X.disableMultiStrokeFill);
      T = mxUtils.getValue(this.shape.style, 'hachureGap', -1);
      U.hachureGap = 'auto' == T ? -1 : T;
      U.dashGap = mxUtils.getValue(this.shape.style, 'dashGap', T);
      U.dashOffset = mxUtils.getValue(this.shape.style, 'dashOffset', T);
      U.zigzagOffset = mxUtils.getValue(this.shape.style, 'zigzagOffset', T);
      T = mxUtils.getValue(this.shape.style, 'fillWeight', -1);
      U.fillWeight = 'auto' == T ? -1 : T;
      T = mxUtils.getValue(this.shape.style, 'fillStyle', 'auto');
      'auto' == T && (T = [mxUtils.hex2rgb('#ffffff')], null != this.shape.state && T.push(mxUtils.hex2rgb(this.shape.state.view.graph.shapeBackgroundColor)), Editor.isDarkMode() && T.push(mxUtils.hex2rgb(Editor.darkColor)), T = null != U.fill && (null != V || 0 <= mxUtils.indexOf(T, mxUtils.hex2rgb(U.fill))) ? 'solid' : X.fillStyle);
      U.fillStyle = T;
      return U;
    };
    p.prototype.begin = function() {
      this.passThrough ? this.originalBegin.apply(this.canvas, arguments) : this.path = [];
    };
    p.prototype.end = function() {
      this.passThrough && this.originalEnd.apply(this.canvas, arguments);
    };
    p.prototype.addOp = function() {
      if (null != this.path && (this.path.push(arguments[0]), 2 < arguments.length))
        for (var V = 2; V < arguments.length; V += 2)
          this.lastX = arguments[V - 1], this.lastY = arguments[V], this.path.push(this.canvas.format(this.lastX)), this.path.push(this.canvas.format(this.lastY));
    };
    p.prototype.lineTo = function(V, T) {
      this.passThrough ? this.originalLineTo.apply(this.canvas, arguments) : (this.addOp(this.lineOp, V, T), this.lastX = V, this.lastY = T);
    };
    p.prototype.moveTo = function(V, T) {
      this.passThrough ? this.originalMoveTo.apply(this.canvas, arguments) : (this.addOp(this.moveOp, V, T), this.lastX = V, this.lastY = T, this.firstX = V, this.firstY = T);
    };
    p.prototype.close = function() {
      this.passThrough ? this.originalClose.apply(this.canvas, arguments) : this.addOp(this.closeOp);
    };
    p.prototype.quadTo = function(V, T, U, X) {
      this.passThrough ? this.originalQuadTo.apply(this.canvas, arguments) : (this.addOp(this.quadOp, V, T, U, X), this.lastX = U, this.lastY = X);
    };
    p.prototype.curveTo = function(V, T, U, X, Z, Y) {
      this.passThrough ? this.originalCurveTo.apply(this.canvas, arguments) : (this.addOp(this.curveOp, V, T, U, X, Z, Y), this.lastX = Z, this.lastY = Y);
    };
    p.prototype.arcTo = function(V, T, U, X, Z, Y, ea) {
      if (this.passThrough)
        this.originalArcTo.apply(this.canvas, arguments);
      else {
        var aa = mxUtils.arcToCurves(this.lastX, this.lastY, V, T, U, X, Z, Y, ea);
        if (null != aa)
          for (var fa = 0; fa < aa.length; fa += 6)
            this.curveTo(aa[fa], aa[fa + 1], aa[fa + 2], aa[fa + 3], aa[fa + 4], aa[fa + 5]);
        this.lastX = Y;
        this.lastY = ea;
      }
    };
    p.prototype.rect = function(V, T, U, X) {
      this.passThrough ? this.originalRect.apply(this.canvas, arguments) : (this.path = [], this.nextShape = this.rc.generator.rectangle(V, T, U, X, this.getStyle(!0, !0)));
    };
    p.prototype.ellipse = function(V, T, U, X) {
      this.passThrough ? this.originalEllipse.apply(this.canvas, arguments) : (this.path = [], this.nextShape = this.rc.generator.ellipse(V + U / 2, T + X / 2, U, X, this.getStyle(!0, !0)));
    };
    p.prototype.roundrect = function(V, T, U, X, Z, Y) {
      this.passThrough ? this.originalRoundrect.apply(this.canvas, arguments) : (this.begin(), this.moveTo(V + Z, T), this.lineTo(V + U - Z, T), this.quadTo(V + U, T, V + U, T + Y), this.lineTo(V + U, T + X - Y), this.quadTo(V + U, T + X, V + U - Z, T + X), this.lineTo(V + Z, T + X), this.quadTo(V, T + X, V, T + X - Y), this.lineTo(V, T + Y), this.quadTo(V, T, V + Z, T));
    };
    p.prototype.drawPath = function(V) {
      if (0 < this.path.length) {
        this.passThrough = !0;
        try {
          this.rc.path(this.path.join(' '), V);
        } catch (U) {}
        this.passThrough = !1;
      } else if (null != this.nextShape) {
        for (var T in V)
          this.nextShape.options[T] = V[T];
        V.stroke != mxConstants.NONE && null != V.stroke || delete this.nextShape.options.stroke;
        V.filled || delete this.nextShape.options.fill;
        this.passThrough = !0;
        this.rc.draw(this.nextShape);
        this.passThrough = !1;
      }
    };
    p.prototype.stroke = function() {
      this.passThrough ? this.originalStroke.apply(this.canvas, arguments) : this.drawPath(this.getStyle(!0, !1));
    };
    p.prototype.fill = function() {
      this.passThrough ? this.originalFill.apply(this.canvas, arguments) : this.drawPath(this.getStyle(!1, !0));
    };
    p.prototype.fillAndStroke = function() {
      this.passThrough ? this.originalFillAndStroke.apply(this.canvas, arguments) : this.drawPath(this.getStyle(!0, !0));
    };
    p.prototype.destroy = function() {
      this.canvas.lineTo = this.originalLineTo;
      this.canvas.moveTo = this.originalMoveTo;
      this.canvas.close = this.originalClose;
      this.canvas.quadTo = this.originalQuadTo;
      this.canvas.curveTo = this.originalCurveTo;
      this.canvas.arcTo = this.originalArcTo;
      this.canvas.close = this.originalClose;
      this.canvas.fill = this.originalFill;
      this.canvas.stroke = this.originalStroke;
      this.canvas.fillAndStroke = this.originalFillAndStroke;
      this.canvas.begin = this.originalBegin;
      this.canvas.end = this.originalEnd;
      this.canvas.rect = this.originalRect;
      this.canvas.ellipse = this.originalEllipse;
      this.canvas.roundrect = this.originalRoundrect;
    };
    mxShape.prototype.createRoughCanvas = function(V) {
      return new p(V, Editor.createRoughCanvas(V), this);
    };
    var B = mxShape.prototype.createHandJiggle;
    mxShape.prototype.createHandJiggle = function(V) {
      return this.outline || null == this.style || '0' == mxUtils.getValue(this.style, 'sketch', '0') ? B.apply(this, arguments) : 'comic' == mxUtils.getValue(this.style, 'sketchStyle', 'rough') ? this.createComicCanvas(V) : this.createRoughCanvas(V);
    };
    var N = mxImageShape.prototype.paintVertexShape;
    mxImageShape.prototype.paintVertexShape = function(V, T, U, X, Z) {
      null != V.handJiggle && V.handJiggle.passThrough || N.apply(this, arguments);
    };
    var S = mxShape.prototype.paint;
    mxShape.prototype.paint = function(V) {
      var T = V.addTolerance,
        U = !0;
      null != this.style && (U = '1' == mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1'));
      if (null != V.handJiggle && V.handJiggle.constructor == p && !this.outline) {
        V.save();
        var X = this.fill,
          Z = this.stroke;
        this.stroke = this.fill = null;
        var Y = this.configurePointerEvents,
          ea = V.setStrokeColor;
        V.setStrokeColor = function() {};
        var aa = V.setFillColor;
        V.setFillColor = function() {};
        U || null == X || (this.configurePointerEvents = function() {});
        V.handJiggle.passThrough = !0;
        S.apply(this, arguments);
        V.handJiggle.passThrough = !1;
        V.setFillColor = aa;
        V.setStrokeColor = ea;
        this.configurePointerEvents = Y;
        this.stroke = Z;
        this.fill = X;
        V.restore();
        U && null != X && (V.addTolerance = function() {});
      }
      S.apply(this, arguments);
      V.addTolerance = T;
    };
    var R = mxShape.prototype.paintGlassEffect;
    mxShape.prototype.paintGlassEffect = function(V, T, U, X, Z, Y) {
      null != V.handJiggle && V.handJiggle.constructor == p ? (V.handJiggle.passThrough = !0, R.apply(this, arguments), V.handJiggle.passThrough = !1) : R.apply(this, arguments);
    };
  }());
  Editor.fastCompress = function(p) {
    return null == p || 0 == p.length || 'undefined' === typeof pako ? p : Graph.arrayBufferToString(pako.deflateRaw(p));
  };
  Editor.fastDecompress = function(p) {
    return null == p || 0 == p.length || 'undefined' === typeof pako ? p : pako.inflateRaw(Graph.stringToArrayBuffer(atob(p)), {
      to: 'string'
    });
  };
  Editor.extractGraphModel = function(p, B, N) {
    if (null != p && 'undefined' !== typeof pako) {
      var S = p.ownerDocument.getElementsByTagName('div'),
        R = [];
      if (null != S && 0 < S.length)
        for (var V = 0; V < S.length; V++)
          if ('mxgraph' == S[V].getAttribute('class')) {
            R.push(S[V]);
            break;
          }
      0 < R.length && (S = R[0].getAttribute('data-mxgraph'), null != S ? (R = JSON.parse(S), null != R && null != R.xml && (p = mxUtils.parseXml(R.xml), p = p.documentElement)) : (R = R[0].getElementsByTagName('div'), 0 < R.length && (S = mxUtils.getTextContent(R[0]), S = Graph.decompress(S, null, N), 0 < S.length && (p = mxUtils.parseXml(S), p = p.documentElement))));
    }
    if (null != p && 'svg' == p.nodeName)
      if (S = p.getAttribute('content'), null != S && '<' != S.charAt(0) && '%' != S.charAt(0) && (S = unescape(window.atob ? atob(S) : Base64.decode(cont, S))), null != S && '%' == S.charAt(0) && (S = decodeURIComponent(S)), null != S && 0 < S.length)
        p = mxUtils.parseXml(S).documentElement;
      else
        throw {
          message: mxResources.get('notADiagramFile')
        };
    null == p || B || (R = null, 'diagram' == p.nodeName ? R = p : 'mxfile' == p.nodeName && (S = p.getElementsByTagName('diagram'), 0 < S.length && (R = S[Math.max(0, Math.min(S.length - 1, urlParams.page || 0))])), null != R && (p = Editor.parseDiagramNode(R, N)));
    null == p || 'mxGraphModel' == p.nodeName || B && 'mxfile' == p.nodeName || (p = null);
    return p;
  };
  Editor.parseDiagramNode = function(p, B) {
    var N = mxUtils.trim(mxUtils.getTextContent(p)),
      S = null;
    0 < N.length ? (p = Graph.decompress(N, null, B), null != p && 0 < p.length && (S = mxUtils.parseXml(p).documentElement)) : (p = mxUtils.getChildNodes(p), 0 < p.length && (S = mxUtils.createXmlDocument(), S.appendChild(S.importNode(p[0], !0)), S = S.documentElement));
    return S;
  };
  Editor.getDiagramNodeXml = function(p) {
    var B = mxUtils.getTextContent(p),
      N = null;
    0 < B.length ? N = Graph.decompress(B) : null != p.firstChild && (N = mxUtils.getXml(p.firstChild));
    return N;
  };
  Editor.extractGraphModelFromPdf = function(p) {
    p = p.substring(p.indexOf(',') + 1);
    p = window.atob && !mxClient.IS_SF ? atob(p) : Base64.decode(p, !0);
    if ('%PDF-1.7' == p.substring(0, 8)) {
      var B = p.indexOf('EmbeddedFile');
      if (-1 < B) {
        var N = p.indexOf('stream', B) + 9;
        if (0 < p.substring(B, N).indexOf('application#2Fvnd.jgraph.mxfile'))
          return B = p.indexOf('endstream', N - 1), pako.inflateRaw(Graph.stringToArrayBuffer(p.substring(N, B)), {
            to: 'string'
          });
      }
      return null;
    }
    N = null;
    B = '';
    for (var S = 0, R = 0, V = [], T = null; R < p.length;) {
      var U = p.charCodeAt(R);
      R += 1;
      10 != U && (B += String.fromCharCode(U));
      U == '/Subject (%3Cmxfile'.charCodeAt(S) ? S++ : S = 0;
      if (19 == S) {
        var X = p.indexOf('%3C%2Fmxfile%3E)', R) + 15;
        R -= 9;
        if (X > R) {
          N = p.substring(R, X);
          break;
        }
      }
      10 == U && ('endobj' == B ? T = null : 'obj' == B.substring(B.length - 3, B.length) || 'xref' == B || 'trailer' == B ? (T = [], V[B.split(' ')[0]] = T) : null != T && T.push(B), B = '');
    }
    null == N && (N = Editor.extractGraphModelFromXref(V));
    null != N && (N = decodeURIComponent(N.replace(/\\\(/g, '(').replace(/\\\)/g, ')')));
    return N;
  };
  Editor.extractGraphModelFromXref = function(p) {
    var B = p.trailer,
      N = null;
    null != B && (B = /.* \/Info (\d+) (\d+) R/g.exec(B.join('\n')), null != B && 0 < B.length && (B = p[B[1]], null != B && (B = /.* \/Subject (\d+) (\d+) R/g.exec(B.join('\n')), null != B && 0 < B.length && (p = p[B[1]], null != p && (p = p.join('\n'), N = p.substring(1, p.length - 1))))));
    return N;
  };
  Editor.extractParserError = function(p, B) {
    var N = null;
    p = null != p ? p.getElementsByTagName('parsererror') : null;
    null != p && 0 < p.length && (N = B || mxResources.get('invalidChars'), B = p[0].getElementsByTagName('div'), 0 < B.length && (N = mxUtils.getTextContent(B[0])));
    return null != N ? mxUtils.trim(N) : N;
  };
  Editor.addRetryToError = function(p, B) {
    null != p && (p = null != p.error ? p.error : p, null == p.retry && (p.retry = B));
  };
  Editor.configure = function(p) {
    if (null != p) {
      Editor.config = p;
      Editor.configVersion = p.version;
      p.debug && (urlParams.test = '1');
      null != p.defaultFonts && (Menus.prototype.defaultFonts = p.defaultFonts);
      null != p.presetColors && (ColorDialog.prototype.presetColors = p.presetColors);
      null != p.defaultColors && (ColorDialog.prototype.defaultColors = p.defaultColors);
      null != p.colorNames && (ColorDialog.prototype.colorNames = p.colorNames);
      null != p.defaultColorSchemes && (StyleFormatPanel.prototype.defaultColorSchemes = p.defaultColorSchemes);
      null != p.defaultEdgeLength && (Graph.prototype.defaultEdgeLength = p.defaultEdgeLength);
      null != p.autosaveDelay && (DrawioFile.prototype.autosaveDelay = p.autosaveDelay);
      null != p.templateFile && (EditorUi.templateFile = p.templateFile);
      null != p.styles && (Array.isArray(p.styles) ? Editor.styles = p.styles : EditorUi.debug('Configuration Error: Array expected for styles'));
      null != p.globalVars && (Editor.globalVars = p.globalVars);
      null != p.compressXml && (Editor.compressXml = p.compressXml);
      null != p.includeDiagram && (Editor.defaultIncludeDiagram = p.includeDiagram);
      null != p.simpleLabels && (Editor.simpleLabels = p.simpleLabels);
      null != p.oneDriveInlinePicker && (Editor.oneDriveInlinePicker = p.oneDriveInlinePicker);
      null != p.darkColor && (Editor.darkColor = p.darkColor);
      null != p.lightColor && (Editor.lightColor = p.lightColor);
      null != p.settingsName && (Editor.configurationKey = '.' + p.settingsName + '-configuration', Editor.settingsKey = '.' + p.settingsName + '-config', mxSettings.key = Editor.settingsKey);
      p.customFonts && (Menus.prototype.defaultFonts = p.customFonts.concat(Menus.prototype.defaultFonts));
      p.customPresetColors && (ColorDialog.prototype.presetColors = p.customPresetColors.concat(ColorDialog.prototype.presetColors));
      null != p.customColorSchemes && (StyleFormatPanel.prototype.defaultColorSchemes = p.customColorSchemes.concat(StyleFormatPanel.prototype.defaultColorSchemes));
      if (null != p.css) {
        var B = document.createElement('style');
        B.setAttribute('type', 'text/css');
        B.appendChild(document.createTextNode(p.css));
        var N = document.getElementsByTagName('script')[0];
        N.parentNode.insertBefore(B, N);
      }
      null != p.libraries && (Sidebar.prototype.customEntries = p.libraries);
      null != p.enabledLibraries && (Array.isArray(p.enabledLibraries) ? Sidebar.prototype.enabledLibraries = p.enabledLibraries : EditorUi.debug('Configuration Error: Array expected for enabledLibraries'));
      null != p.defaultLibraries && (Sidebar.prototype.defaultEntries = p.defaultLibraries);
      null != p.defaultCustomLibraries && (Editor.defaultCustomLibraries = p.defaultCustomLibraries);
      null != p.enableCustomLibraries && (Editor.enableCustomLibraries = p.enableCustomLibraries);
      null != p.defaultVertexStyle && (Graph.prototype.defaultVertexStyle = p.defaultVertexStyle);
      null != p.defaultEdgeStyle && (Graph.prototype.defaultEdgeStyle = p.defaultEdgeStyle);
      null != p.defaultPageVisible && (Graph.prototype.defaultPageVisible = p.defaultPageVisible);
      null != p.defaultGridEnabled && (Graph.prototype.defaultGridEnabled = p.defaultGridEnabled);
      null != p.zoomWheel && (Graph.zoomWheel = p.zoomWheel);
      null != p.zoomFactor && (B = parseFloat(p.zoomFactor), !isNaN(B) && 1 < B ? Graph.prototype.zoomFactor = B : EditorUi.debug('Configuration Error: Float > 1 expected for zoomFactor'));
      null != p.gridSteps && (B = parseInt(p.gridSteps), !isNaN(B) && 0 < B ? mxGraphView.prototype.gridSteps = B : EditorUi.debug('Configuration Error: Int > 0 expected for gridSteps'));
      null != p.pageFormat && (B = parseInt(p.pageFormat.width), N = parseInt(p.pageFormat.height), !isNaN(B) && 0 < B && !isNaN(N) && 0 < N ? (mxGraph.prototype.defaultPageFormat = new mxRectangle(0, 0, B, N), mxGraph.prototype.pageFormat = mxGraph.prototype.defaultPageFormat) : EditorUi.debug('Configuration Error: {width: int, height: int} expected for pageFormat'));
      p.thumbWidth && (Sidebar.prototype.thumbWidth = p.thumbWidth);
      p.thumbHeight && (Sidebar.prototype.thumbHeight = p.thumbHeight);
      p.emptyLibraryXml && (EditorUi.prototype.emptyLibraryXml = p.emptyLibraryXml);
      p.emptyDiagramXml && (EditorUi.prototype.emptyDiagramXml = p.emptyDiagramXml);
      p.sidebarWidth && (EditorUi.prototype.hsplitPosition = p.sidebarWidth);
      p.sidebarTitles && (Sidebar.prototype.sidebarTitles = p.sidebarTitles);
      p.sidebarTitleSize && (B = parseInt(p.sidebarTitleSize), !isNaN(B) && 0 < B ? Sidebar.prototype.sidebarTitleSize = B : EditorUi.debug('Configuration Error: Int > 0 expected for sidebarTitleSize'));
      p.fontCss && ('string' === typeof p.fontCss ? Editor.configureFontCss(p.fontCss) : EditorUi.debug('Configuration Error: String expected for fontCss'));
      null != p.autosaveDelay && (B = parseInt(p.autosaveDelay), !isNaN(B) && 0 < B ? DrawioFile.prototype.autosaveDelay = B : EditorUi.debug('Configuration Error: Int > 0 expected for autosaveDelay'));
      null != p.maxImageBytes && (EditorUi.prototype.maxImageBytes = p.maxImageBytes);
      null != p.maxImageSize && (EditorUi.prototype.maxImageSize = p.maxImageSize);
      null != p.shareCursorPosition && (EditorUi.prototype.shareCursorPosition = p.shareCursorPosition);
      null != p.showRemoteCursors && (EditorUi.prototype.showRemoteCursors = p.showRemoteCursors);
    }
  };
  Editor.isAutoDarkMode = function(p) {
    return !p && 'auto' == urlParams.dark || Editor.isSettingsEnabled() && 'auto' == mxSettings.settings.darkMode;
  };
  Editor.isSettingsEnabled = function() {
    return 'undefined' !== typeof window.mxSettings && (isLocalStorage || mxClient.IS_CHROMEAPP);
  };
  Editor.configureFontCss = function(p) {
    if (null != p) {
      Editor.prototype.fontCss = p;
      var B = document.getElementsByTagName('script')[0];
      if (null != B && null != B.parentNode) {
        var N = document.createElement('style');
        N.setAttribute('type', 'text/css');
        N.appendChild(document.createTextNode(p));
        B.parentNode.insertBefore(N, B);
        p = p.split('url(');
        for (N = 1; N < p.length; N++) {
          var S = p[N].indexOf(')');
          S = Editor.trimCssUrl(p[N].substring(0, S));
          var R = document.createElement('link');
          R.setAttribute('rel', 'preload');
          R.setAttribute('href', S);
          R.setAttribute('as', 'font');
          R.setAttribute('crossorigin', '');
          B.parentNode.insertBefore(R, B);
        }
      }
    }
  };
  Editor.trimCssUrl = function(p) {
    return p.replace(RegExp('^[\\s"\']+', 'g'), '').replace(RegExp('[\\s"\']+$', 'g'), '');
  };
  Editor.GOOGLE_FONTS = 'https://fonts.googleapis.com/css?family=';
  Editor.GUID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
  Editor.GUID_LENGTH = 20;
  Editor.guid = function(p) {
    p = null != p ? p : Editor.GUID_LENGTH;
    for (var B = [], N = 0; N < p; N++)
      B.push(Editor.GUID_ALPHABET.charAt(Math.floor(Math.random() * Editor.GUID_ALPHABET.length)));
    return B.join('');
  };
  Editor.updateStatusInterval = 10000;
  Editor.prototype.appName = 'diagrams.net';
  Editor.prototype.diagramFileTypes = [{
      description: 'diagramXmlDesc',
      extension: 'drawio',
      mimeType: 'text/xml'
    },
    {
      description: 'diagramPngDesc',
      extension: 'png',
      mimeType: 'image/png'
    },
    {
      description: 'diagramSvgDesc',
      extension: 'svg',
      mimeType: 'image/svg'
    },
    {
      description: 'diagramHtmlDesc',
      extension: 'html',
      mimeType: 'text/html'
    },
    {
      description: 'diagramXmlDesc',
      extension: 'xml',
      mimeType: 'text/xml'
    }
  ];
  Editor.prototype.libraryFileTypes = [{
    description: 'Library (.drawiolib, .xml)',
    extensions: [
      'drawiolib',
      'xml'
    ]
  }];
  Editor.prototype.fileExtensions = [{
      ext: 'html',
      title: 'filetypeHtml'
    },
    {
      ext: 'png',
      title: 'filetypePng'
    },
    {
      ext: 'svg',
      title: 'filetypeSvg'
    }
  ];
  Editor.prototype.timeout = 25000;
  Editor.prototype.editButtonLink = null != urlParams.edit ? decodeURIComponent(urlParams.edit) : null;
  Editor.prototype.crossOriginImages = !mxClient.IS_IE;
  var b = Editor.prototype.setGraphXml;
  Editor.prototype.setGraphXml = function(p) {
    p = null != p && 'mxlibrary' != p.nodeName ? this.extractGraphModel(p) : null;
    if (null != p) {
      var B = Editor.extractParserError(p, mxResources.get('invalidOrMissingFile'));
      if (B)
        throw EditorUi.debug('Editor.setGraphXml ParserError', [this], 'node', [p], 'cause', [B]), Error(mxResources.get('notADiagramFile') + ' (' + B + ')');
      if ('mxGraphModel' == p.nodeName) {
        B = p.getAttribute('style') || 'default-style2';
        if ('1' == urlParams.embed || null != B && '' != B)
          B != this.graph.currentStyle && (N = null != this.graph.themes ? this.graph.themes[B] : mxUtils.load(STYLE_PATH + '/' + B + '.xml').getDocumentElement(), null != N && (S = new mxCodec(N.ownerDocument), S.decode(N, this.graph.getStylesheet())));
        else {
          var N = null != this.graph.themes ? this.graph.themes['default-old'] : mxUtils.load(STYLE_PATH + '/default-old.xml').getDocumentElement();
          if (null != N) {
            var S = new mxCodec(N.ownerDocument);
            S.decode(N, this.graph.getStylesheet());
          }
        }
        this.graph.currentStyle = B;
        this.graph.mathEnabled = '1' == urlParams.math || '1' == p.getAttribute('math');
        B = p.getAttribute('backgroundImage');
        null != B ? this.graph.setBackgroundImage(this.graph.parseBackgroundImage(B)) : this.graph.setBackgroundImage(null);
        this.graph.useCssTransforms = !mxClient.NO_FO && this.isChromelessView() && this.graph.isCssTransformsSupported();
        this.graph.updateCssTransform();
        this.graph.setShadowVisible('1' == p.getAttribute('shadow'), !1);
        if (B = p.getAttribute('extFonts'))
          try {
            for (B = B.split('|').map(function(R) {
                R = R.split('^');
                return {
                  name: R[0],
                  url: R[1]
                };
              }), N = 0; N < B.length; N++)
              this.graph.addExtFont(B[N].name, B[N].url);
          } catch (R) {
            console.log('ExtFonts format error: ' + R.message);
          }
        else
          null != this.graph.extFonts && 0 < this.graph.extFonts.length && (this.graph.extFonts = []);
      }
      b.apply(this, arguments);
    } else
      throw {
        message: mxResources.get('notADiagramFile') || 'Invalid data',
        toString: function() {
          return this.message;
        }
      };
  };
  var e = Editor.prototype.getGraphXml;
  Editor.prototype.getGraphXml = function(p, B) {
    p = null != p ? p : !0;
    var N = e.apply(this, arguments);
    null != this.graph.currentStyle && 'default-style2' != this.graph.currentStyle && N.setAttribute('style', this.graph.currentStyle);
    var S = this.graph.getBackgroundImageObject(this.graph.backgroundImage, B);
    null != S && N.setAttribute('backgroundImage', JSON.stringify(S));
    N.setAttribute('math', this.graph.mathEnabled ? '1' : '0');
    N.setAttribute('shadow', this.graph.shadowVisible ? '1' : '0');
    null != this.graph.extFonts && 0 < this.graph.extFonts.length && (S = this.graph.extFonts.map(function(R) {
      return R.name + '^' + R.url;
    }), N.setAttribute('extFonts', S.join('|')));
    return N;
  };
  Editor.prototype.isDataSvg = function(p) {
    try {
      var B = mxUtils.parseXml(p).documentElement.getAttribute('content');
      if (null != B && (null != B && '<' != B.charAt(0) && '%' != B.charAt(0) && (B = unescape(window.atob ? atob(B) : Base64.decode(cont, B))), null != B && '%' == B.charAt(0) && (B = decodeURIComponent(B)), null != B && 0 < B.length)) {
        var N = mxUtils.parseXml(B).documentElement;
        return 'mxfile' == N.nodeName || 'mxGraphModel' == N.nodeName;
      }
    } catch (S) {}
    return !1;
  };
  Editor.prototype.extractGraphModel = function(p, B, N) {
    return Editor.extractGraphModel.apply(this, arguments);
  };
  var f = Editor.prototype.resetGraph;
  Editor.prototype.resetGraph = function() {
    this.graph.mathEnabled = '1' == urlParams.math;
    this.graph.view.x0 = null;
    this.graph.view.y0 = null;
    this.graph.useCssTransforms = !mxClient.NO_FO && this.isChromelessView() && this.graph.isCssTransformsSupported();
    this.graph.updateCssTransform();
    f.apply(this, arguments);
  };
  var c = Editor.prototype.updateGraphComponents;
  Editor.prototype.updateGraphComponents = function() {
    c.apply(this, arguments);
    this.graph.useCssTransforms = !mxClient.NO_FO && this.isChromelessView() && this.graph.isCssTransformsSupported();
    this.graph.updateCssTransform();
  };
  Editor.initMath = function(p, B) {
    if ('undefined' === typeof window.MathJax && !mxClient.IS_IE && !mxClient.IS_IE11) {
      p = null != p ? p : DRAW_MATH_URL + '/startup.js';
      Editor.mathJaxQueue = [];
      Editor.doMathJaxRender = function(R) {
        try {
          MathJax.typesetClear([R]), MathJax.typeset([R]), Editor.onMathJaxDone();
        } catch (V) {
          MathJax.typesetClear([R]), null != V.retry ? V.retry.then(function() {
            MathJax.typesetPromise([R]).then(Editor.onMathJaxDone);
          }) : null != window.console && console.log('Error in MathJax: ' + V.toString());
        }
      };
      window.MathJax = null != B ? B : {
        options: {
          skipHtmlTags: {
            '[+]': ['text']
          }
        },
        loader: {
          load: [
            'html' == urlParams['math-output'] ? 'output/chtml' : 'output/svg',
            'input/tex',
            'input/asciimath',
            'ui/safe'
          ]
        },
        startup: {
          pageReady: function() {
            for (var R = 0; R < Editor.mathJaxQueue.length; R++)
              Editor.doMathJaxRender(Editor.mathJaxQueue[R]);
          }
        }
      };
      Editor.MathJaxRender = function(R) {
        'undefined' !== typeof MathJax && 'function' === typeof MathJax.typeset ? Editor.doMathJaxRender(R) : Editor.mathJaxQueue.push(R);
      };
      Editor.MathJaxClear = function() {
        Editor.mathJaxQueue = [];
      };
      Editor.onMathJaxDone = function() {};
      var N = Editor.prototype.init;
      Editor.prototype.init = function() {
        N.apply(this, arguments);
        var R = mxUtils.bind(this, function(V, T) {
          null != this.graph.container && this.graph.mathEnabled && !this.graph.blockMathRender && Editor.MathJaxRender(this.graph.container);
        });
        this.graph.model.addListener(mxEvent.CHANGE, R);
        this.graph.addListener(mxEvent.REFRESH, R);
      };
      B = document.getElementsByTagName('script');
      if (null != B && 0 < B.length) {
        var S = document.createElement('script');
        S.setAttribute('type', 'text/javascript');
        S.setAttribute('src', p);
        B[0].parentNode.appendChild(S);
      }
    }
  };
  Editor.prototype.csvToArray = function(p) {
    if (0 < p.length) {
      var B = '',
        N = [''],
        S = 0,
        R = !0,
        V;
      p = $jscomp.makeIterator(p);
      for (V = p.next(); !V.done; V = p.next())
        V = V.value, '"' === V ? (R && V === B && (N[S] += V), R = !R) : ',' === V && R ? V = N[++S] = '' : N[S] += V, B = V;
      return N;
    }
    return [];
  };
  Editor.prototype.getProxiedUrl = function(p) {
    if ((/test\.draw\.io$/.test(window.location.hostname) || /app\.diagrams\.net$/.test(window.location.hostname)) && !this.isCorsEnabledForUrl(p)) {
      var B = /(\.v(dx|sdx?))($|\?)/i.test(p) || /(\.vs(x|sx?))($|\?)/i.test(p);
      B = /\.png$/i.test(p) || /\.pdf$/i.test(p) || B;
      var N = 't=' + new Date().getTime();
      p = PROXY_URL + '?url=' + encodeURIComponent(p) + '&' + N + (B ? '&base64=1' : '');
    }
    return p;
  };
  Editor.prototype.isCorsEnabledForUrl = function(p) {
    if (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || p.substring(0, window.location.origin.length) == window.location.origin)
      return !0;
    null != urlParams.cors && null == this.corsRegExp && (this.corsRegExp = new RegExp(decodeURIComponent(urlParams.cors)));
    return null != this.corsRegExp && this.corsRegExp.test(p) || 'https://raw.githubusercontent.com/' === p.substring(0, 34) || 'https://fonts.googleapis.com/' === p.substring(0, 29) || 'https://fonts.gstatic.com/' === p.substring(0, 26);
  };
  Editor.prototype.createImageUrlConverter = function() {
    var p = new mxUrlConverter();
    p.updateBaseUrl();
    var B = p.convert,
      N = this;
    p.convert = function(S) {
      if (null != S) {
        var R = 'http://' == S.substring(0, 7) || 'https://' == S.substring(0, 8);
        R && !navigator.onLine ? S = Editor.svgBrokenImage.src : !R || S.substring(0, p.baseUrl.length) == p.baseUrl || N.crossOriginImages && N.isCorsEnabledForUrl(S) ? 'chrome-extension://' == S.substring(0, 19) || mxClient.IS_CHROMEAPP || (S = B.apply(this, arguments)) : S = PROXY_URL + '?url=' + encodeURIComponent(S);
      }
      return S;
    };
    return p;
  };
  Editor.createSvgDataUri = function(p) {
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(p)));
  };
  Editor.prototype.convertImageToDataUri = function(p, B) {
    try {
      var N = !0,
        S = window.setTimeout(mxUtils.bind(this, function() {
          N = !1;
          B(Editor.svgBrokenImage.src);
        }), this.timeout);
      if (/(\.svg)$/i.test(p))
        mxUtils.get(p, mxUtils.bind(this, function(V) {
          window.clearTimeout(S);
          N && B(Editor.createSvgDataUri(V.getText()));
        }), function() {
          window.clearTimeout(S);
          N && B(Editor.svgBrokenImage.src);
        });
      else {
        var R = new Image();
        this.crossOriginImages && (R.crossOrigin = 'anonymous');
        R.onload = function() {
          window.clearTimeout(S);
          if (N)
            try {
              var V = document.createElement('canvas'),
                T = V.getContext('2d');
              V.height = R.height;
              V.width = R.width;
              T.drawImage(R, 0, 0);
              B(V.toDataURL());
            } catch (U) {
              B(Editor.svgBrokenImage.src);
            }
        };
        R.onerror = function() {
          window.clearTimeout(S);
          N && B(Editor.svgBrokenImage.src);
        };
        R.src = p;
      }
    } catch (V) {
      B(Editor.svgBrokenImage.src);
    }
  };
  Editor.prototype.convertImages = function(p, B, N, S) {
    null == S && (S = this.createImageUrlConverter());
    var R = 0,
      V = N || {};
    N = mxUtils.bind(this, function(T, U) {
      T = p.getElementsByTagName(T);
      for (var X = 0; X < T.length; X++)
        mxUtils.bind(this, function(Z) {
          try {
            if (null != Z) {
              var Y = S.convert(Z.getAttribute(U));
              if (null != Y && 'data:' != Y.substring(0, 5)) {
                var ea = V[Y];
                null == ea ? (R++, this.convertImageToDataUri(Y, function(aa) {
                  null != aa && (V[Y] = aa, Z.setAttribute(U, aa));
                  R--;
                  0 == R && B(p);
                })) : Z.setAttribute(U, ea);
              } else
                null != Y && Z.setAttribute(U, Y);
            }
          } catch (aa) {}
        })(T[X]);
    });
    N('image', 'xlink:href');
    N('img', 'src');
    0 == R && B(p);
  };
  Editor.base64Encode = function(p) {
    for (var B = '', N = 0, S = p.length, R, V, T; N < S;) {
      R = p.charCodeAt(N++) & 255;
      if (N == S) {
        B += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(R >> 2);
        B += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt((R & 3) << 4);
        B += '==';
        break;
      }
      V = p.charCodeAt(N++);
      if (N == S) {
        B += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(R >> 2);
        B += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt((R & 3) << 4 | (V & 240) >> 4);
        B += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt((V & 15) << 2);
        B += '=';
        break;
      }
      T = p.charCodeAt(N++);
      B += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(R >> 2);
      B += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt((R & 3) << 4 | (V & 240) >> 4);
      B += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt((V & 15) << 2 | (T & 192) >> 6);
      B += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(T & 63);
    }
    return B;
  };
  Editor.prototype.loadUrl = function(p, B, N, S, R, V, T, U) {
    try {
      var X = !T && (S || /(\.png)($|\?)/i.test(p) || /(\.jpe?g)($|\?)/i.test(p) || /(\.gif)($|\?)/i.test(p) || /(\.pdf)($|\?)/i.test(p));
      R = null != R ? R : !0;
      var Z = mxUtils.bind(this, function() {
        mxUtils.get(p, mxUtils.bind(this, function(Y) {
          if (200 <= Y.getStatus() && 299 >= Y.getStatus()) {
            if (null != B) {
              var ea = Y.getText();
              if (X) {
                if ((9 == document.documentMode || 10 == document.documentMode) && 'undefined' !== typeof window.mxUtilsBinaryToArray) {
                  Y = mxUtilsBinaryToArray(Y.request.responseBody).toArray();
                  ea = Array(Y.length);
                  for (var aa = 0; aa < Y.length; aa++)
                    ea[aa] = String.fromCharCode(Y[aa]);
                  ea = ea.join('');
                }
                V = null != V ? V : 'data:image/png;base64,';
                ea = V + Editor.base64Encode(ea);
              }
              B(ea);
            }
          } else
            null != N && (0 == Y.getStatus() ? N({
              message: mxResources.get('accessDenied')
            }, Y) : 404 == Y.getStatus() ? N({
              code: Y.getStatus()
            }, Y) : N({
              message: mxResources.get('error') + ' ' + Y.getStatus()
            }, Y));
        }), function(Y) {
          null != N && N({
            message: mxResources.get('error') + ' ' + Y.getStatus()
          });
        }, X, this.timeout, function() {
          R && null != N && N({
            code: App.ERROR_TIMEOUT,
            retry: Z
          });
        }, U);
      });
      Z();
    } catch (Y) {
      null != N && N(Y);
    }
  };
  Editor.prototype.absoluteCssFonts = function(p) {
    var B = null;
    if (null != p) {
      var N = p.split('url(');
      if (0 < N.length) {
        B = [N[0]];
        p = window.location.pathname;
        var S = null != p ? p.lastIndexOf('/') : -1;
        0 <= S && (p = p.substring(0, S + 1));
        S = document.getElementsByTagName('base');
        var R = null;
        null != S && 0 < S.length && (R = S[0].getAttribute('href'));
        for (var V = 1; V < N.length; V++)
          if (S = N[V].indexOf(')'), 0 < S) {
            var T = Editor.trimCssUrl(N[V].substring(0, S));
            this.graph.isRelativeUrl(T) && (T = null != R ? R + T : window.location.protocol + '//' + window.location.hostname + ('/' == T.charAt(0) ? '' : p) + T);
            B.push('url("' + T + '"' + N[V].substring(S));
          } else
            B.push(N[V]);
      } else
        B = [p];
    }
    return null != B ? B.join('') : null;
  };
  Editor.prototype.mapFontUrl = function(p, B, N) {
    /^https?:\/\//.test(B) && !this.isCorsEnabledForUrl(B) && (B = PROXY_URL + '?url=' + encodeURIComponent(B));
    N(p, B);
  };
  Editor.prototype.embedCssFonts = function(p, B) {
    var N = p.split('url('),
      S = 0;
    null == this.cachedFonts && (this.cachedFonts = {});
    var R = mxUtils.bind(this, function() {
      if (0 == S) {
        for (var X = [N[0]], Z = 1; Z < N.length; Z++) {
          var Y = N[Z].indexOf(')');
          X.push('url("');
          X.push(this.cachedFonts[Editor.trimCssUrl(N[Z].substring(0, Y))]);
          X.push('"' + N[Z].substring(Y));
        }
        B(X.join(''));
      }
    });
    if (0 < N.length) {
      for (p = 1; p < N.length; p++) {
        var V = N[p].indexOf(')'),
          T = null,
          U = N[p].indexOf('format(', V);
        0 < U && (T = Editor.trimCssUrl(N[p].substring(U + 7, N[p].indexOf(')', U))));
        mxUtils.bind(this, function(X) {
          if (null == this.cachedFonts[X]) {
            this.cachedFonts[X] = X;
            S++;
            var Z = 'application/x-font-ttf';
            if ('svg' == T || /(\.svg)($|\?)/i.test(X))
              Z = 'image/svg+xml';
            else if ('otf' == T || 'embedded-opentype' == T || /(\.otf)($|\?)/i.test(X))
              Z = 'application/x-font-opentype';
            else if ('woff' == T || /(\.woff)($|\?)/i.test(X))
              Z = 'application/font-woff';
            else if ('woff2' == T || /(\.woff2)($|\?)/i.test(X))
              Z = 'application/font-woff2';
            else if ('eot' == T || /(\.eot)($|\?)/i.test(X))
              Z = 'application/vnd.ms-fontobject';
            else if ('sfnt' == T || /(\.sfnt)($|\?)/i.test(X))
              Z = 'application/font-sfnt';
            this.mapFontUrl(Z, X, mxUtils.bind(this, function(Y, ea) {
              this.loadUrl(ea, mxUtils.bind(this, function(aa) {
                this.cachedFonts[X] = aa;
                S--;
                R();
              }), mxUtils.bind(this, function(aa) {
                S--;
                R();
              }), !0, null, 'data:' + Y + ';charset=utf-8;base64,');
            }));
          }
        })(Editor.trimCssUrl(N[p].substring(0, V)), T);
      }
      R();
    } else
      B(p);
  };
  Editor.prototype.loadFonts = function(p) {
    null != this.fontCss && null == this.resolvedFontCss ? this.embedCssFonts(this.fontCss, mxUtils.bind(this, function(B) {
      this.resolvedFontCss = B;
      null != p && p();
    })) : null != p && p();
  };
  Editor.prototype.createGoogleFontCache = function() {
    var p = {},
      B;
    for (B in Graph.fontMapping)
      Graph.isCssFontUrl(B) && (p[B] = Graph.fontMapping[B]);
    return p;
  };
  Editor.prototype.embedExtFonts = function(p) {
    var B = this.graph.getCustomFonts();
    if (0 < B.length) {
      var N = [],
        S = 0;
      null == this.cachedGoogleFonts && (this.cachedGoogleFonts = this.createGoogleFontCache());
      for (var R = mxUtils.bind(this, function() {
          0 == S && this.embedCssFonts(N.join(''), p);
        }), V = 0; V < B.length; V++)
        mxUtils.bind(this, function(T, U) {
          Graph.isCssFontUrl(U) ? null == this.cachedGoogleFonts[U] ? (S++, this.loadUrl(U, mxUtils.bind(this, function(X) {
            this.cachedGoogleFonts[U] = X;
            N.push(X + '\n');
            S--;
            R();
          }), mxUtils.bind(this, function(X) {
            S--;
            N.push('@import url(' + U + ');\n');
            R();
          }))) : N.push(this.cachedGoogleFonts[U] + '\n') : N.push('@font-face {font-family: "' + T + '";src: url("' + U + '")}\n');
        })(B[V].name, B[V].url);
      R();
    } else
      p();
  };
  Editor.prototype.addMathCss = function(p) {
    p = p.getElementsByTagName('defs');
    if (null != p && 0 < p.length)
      for (var B = document.getElementsByTagName('style'), N = 0; N < B.length; N++) {
        var S = mxUtils.getTextContent(B[N]);
        0 > S.indexOf('mxPageSelector') && 0 < S.indexOf('MathJax') && p[0].appendChild(B[N].cloneNode(!0));
      }
  };
  Editor.prototype.addFontCss = function(p, B) {
    B = null != B ? B : this.absoluteCssFonts(this.fontCss);
    if (null != B) {
      var N = p.getElementsByTagName('defs'),
        S = p.ownerDocument;
      0 == N.length ? (N = null != S.createElementNS ? S.createElementNS(mxConstants.NS_SVG, 'defs') : S.createElement('defs'), null != p.firstChild ? p.insertBefore(N, p.firstChild) : p.appendChild(N)) : N = N[0];
      p = null != S.createElementNS ? S.createElementNS(mxConstants.NS_SVG, 'style') : S.createElement('style');
      p.setAttribute('type', 'text/css');
      mxUtils.setTextContent(p, B);
      N.appendChild(p);
    }
  };
  Editor.prototype.isExportToCanvas = function() {
    return mxClient.IS_CHROMEAPP || this.useCanvasForExport;
  };
  Editor.prototype.getMaxCanvasScale = function(p, B, N) {
    var S = mxClient.IS_FF ? 8192 : 16384;
    return Math.min(N, Math.min(S / p, S / B));
  };
  Editor.prototype.exportToCanvas = function(p, B, N, S, R, V, T, U, X, Z, Y, ea, aa, fa, da, ba, na, ia) {
    try {
      V = null != V ? V : !0;
      T = null != T ? T : !0;
      ea = null != ea ? ea : this.graph;
      aa = null != aa ? aa : 0;
      var qa = X ? null : ea.background;
      qa == mxConstants.NONE && (qa = null);
      null == qa && (qa = S);
      null == qa && 0 == X && (qa = ba ? this.graph.defaultPageBackgroundColor : '#ffffff');
      this.convertImages(ea.getSvg(null, null, aa, fa, null, T, null, null, null, Z, null, ba, na, ia), mxUtils.bind(this, function(Aa) {
        try {
          var va = new Image();
          va.onload = mxUtils.bind(this, function() {
            try {
              var Ga = function() {
                  mxClient.IS_SF ? window.setTimeout(function() {
                    ha.drawImage(va, 0, 0);
                    p(Da, Aa);
                  }, 0) : (ha.drawImage(va, 0, 0), p(Da, Aa));
                },
                Da = document.createElement('canvas'),
                Ca = parseInt(Aa.getAttribute('width')),
                Ka = parseInt(Aa.getAttribute('height'));
              U = null != U ? U : 1;
              null != B && (U = V ? Math.min(1, Math.min(3 * B / (4 * Ka), B / Ca)) : B / Ca);
              U = this.getMaxCanvasScale(Ca, Ka, U);
              Ca = Math.ceil(U * Ca);
              Ka = Math.ceil(U * Ka);
              Da.setAttribute('width', Ca);
              Da.setAttribute('height', Ka);
              var ha = Da.getContext('2d');
              null != qa && (ha.beginPath(), ha.rect(0, 0, Ca, Ka), ha.fillStyle = qa, ha.fill());
              1 != U && ha.scale(U, U);
              if (da) {
                var ra = ea.view,
                  ua = ra.scale;
                ra.scale = 1;
                var La = btoa(unescape(encodeURIComponent(ra.createSvgGrid(ra.gridColor))));
                ra.scale = ua;
                La = 'data:image/svg+xml;base64,' + La;
                var Ia = ea.gridSize * ra.gridSteps * U,
                  ka = ea.getGraphBounds(),
                  xa = ra.translate.x * ua,
                  ta = ra.translate.y * ua,
                  oa = xa + (ka.x - xa) / ua - aa,
                  sa = ta + (ka.y - ta) / ua - aa,
                  za = new Image();
                za.onload = function() {
                  try {
                    for (var ca = -Math.round(Ia - mxUtils.mod((xa - oa) * U, Ia)), ma = -Math.round(Ia - mxUtils.mod((ta - sa) * U, Ia)); ca < Ca; ca += Ia)
                      for (var pa = ma; pa < Ka; pa += Ia)
                        ha.drawImage(za, ca / U, pa / U);
                    Ga();
                  } catch (wa) {
                    null != R && R(wa);
                  }
                };
                za.onerror = function(ca) {
                  null != R && R(ca);
                };
                za.src = La;
              } else
                Ga();
            } catch (ca) {
              null != R && R(ca);
            }
          });
          va.onerror = function(Ga) {
            null != R && R(Ga);
          };
          Z && this.graph.addSvgShadow(Aa);
          this.graph.mathEnabled && this.addMathCss(Aa);
          var ja = mxUtils.bind(this, function() {
            try {
              null != this.resolvedFontCss && this.addFontCss(Aa, this.resolvedFontCss), va.src = Editor.createSvgDataUri(mxUtils.getXml(Aa));
            } catch (Ga) {
              null != R && R(Ga);
            }
          });
          this.embedExtFonts(mxUtils.bind(this, function(Ga) {
            try {
              null != Ga && this.addFontCss(Aa, Ga), this.loadFonts(ja);
            } catch (Da) {
              null != R && R(Da);
            }
          }));
        } catch (Ga) {
          null != R && R(Ga);
        }
      }), N, Y);
    } catch (Aa) {
      null != R && R(Aa);
    }
  };
  Editor.crcTable = [];
  for (var k = 0; 256 > k; k++)
    for (var m = k, t = 0; 8 > t; t++)
      m = 1 == (m & 1) ? 3988292384 ^ m >>> 1 : m >>> 1, Editor.crcTable[k] = m;
  Editor.updateCRC = function(p, B, N, S) {
    for (var R = 0; R < S; R++)
      p = Editor.crcTable[(p ^ B.charCodeAt(N + R)) & 255] ^ p >>> 8;
    return p;
  };
  Editor.crc32 = function(p) {
    for (var B = -1, N = 0; N < p.length; N++)
      B = B >>> 8 ^ Editor.crcTable[(B ^ p.charCodeAt(N)) & 255];
    return (B ^ -1) >>> 0;
  };
  Editor.writeGraphModelToPng = function(p, B, N, S, R) {
    function V(Y, ea) {
      var aa = X;
      X += ea;
      return Y.substring(aa, X);
    }

    function T(Y) {
      Y = V(Y, 4);
      return Y.charCodeAt(3) + (Y.charCodeAt(2) << 8) + (Y.charCodeAt(1) << 16) + (Y.charCodeAt(0) << 24);
    }

    function U(Y) {
      return String.fromCharCode(Y >> 24 & 255, Y >> 16 & 255, Y >> 8 & 255, Y & 255);
    }
    p = p.substring(p.indexOf(',') + 1);
    p = window.atob ? atob(p) : Base64.decode(p, !0);
    var X = 0;
    if (V(p, 8) != String.fromCharCode(137) + 'PNG' + String.fromCharCode(13, 10, 26, 10))
      null != R && R();
    else if (V(p, 4), 'IHDR' != V(p, 4))
      null != R && R();
    else {
      V(p, 17);
      R = p.substring(0, X);
      do {
        var Z = T(p);
        if ('IDAT' == V(p, 4)) {
          R = p.substring(0, X - 8);
          'pHYs' == B && 'dpi' == N ? (N = Math.round(S / 0.0254), N = U(N) + U(N) + String.fromCharCode(1)) : N = N + String.fromCharCode(0) + ('zTXt' == B ? String.fromCharCode(0) : '') + S;
          S = 4294967295;
          S = Editor.updateCRC(S, B, 0, 4);
          S = Editor.updateCRC(S, N, 0, N.length);
          R += U(N.length) + B + N + U(S ^ 4294967295);
          R += p.substring(X - 8, p.length);
          break;
        }
        R += p.substring(X - 8, X - 4 + Z);
        V(p, Z);
        V(p, 4);
      } while (Z);
      return 'data:image/png;base64,' + (window.btoa ? btoa(R) : Base64.encode(R, !0));
    }
  };
  if (window.ColorDialog) {
    FilenameDialog.filenameHelpLink = 'https://www.diagrams.net/doc/faq/save-file-formats';
    var y = ColorDialog.addRecentColor;
    ColorDialog.addRecentColor = function(p, B) {
      y.apply(this, arguments);
      mxSettings.setRecentColors(ColorDialog.recentColors);
      mxSettings.save();
    };
    var E = ColorDialog.resetRecentColors;
    ColorDialog.resetRecentColors = function() {
      E.apply(this, arguments);
      mxSettings.setRecentColors(ColorDialog.recentColors);
      mxSettings.save();
    };
  }
  'undefined' !== typeof window.EditDataDialog && (EditDataDialog.getDisplayIdForCell = function(p, B) {
    var N = null;
    null != p.editor.graph.getModel().getParent(B) ? N = B.getId() : null != p.currentPage && (N = p.currentPage.getId());
    return N;
  });
  if (null != window.StyleFormatPanel) {
    var z = Format.prototype.init;
    Format.prototype.init = function() {
      z.apply(this, arguments);
      this.editorUi.editor.addListener('fileLoaded', this.update);
    };
    var D = Format.prototype.refresh;
    Format.prototype.refresh = function() {
      null != this.editorUi.getCurrentFile() || '1' == urlParams.embed || this.editorUi.editor.chromeless ? D.apply(this, arguments) : this.clear();
    };
    DiagramFormatPanel.prototype.isMathOptionVisible = function(p) {
      return 'simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme || 'min' == Editor.currentTheme;
    };
    var J = DiagramFormatPanel.prototype.addOptions;
    DiagramFormatPanel.prototype.addOptions = function(p) {
      p = J.apply(this, arguments);
      var B = this.editorUi,
        N = B.editor.graph;
      if (N.isEnabled()) {
        var S = B.getCurrentFile();
        null != S && S.isAutosaveOptional() && p.appendChild(this.createOption(mxResources.get('autosave'), function() {
          return B.editor.autosave;
        }, function(T) {
          B.editor.setAutosave(T);
          B.editor.autosave && S.isModified() && S.fileChanged();
        }, {
          install: function(T) {
            this.listener = function() {
              T(B.editor.autosave);
            };
            B.editor.addListener('autosaveChanged', this.listener);
          },
          destroy: function() {
            B.editor.removeListener(this.listener);
          }
        }));
      }
      if (this.isMathOptionVisible() && N.isEnabled() && 'undefined' !== typeof MathJax) {
        var R = this.createOption(mxResources.get('mathematicalTypesetting'), function() {
          return N.mathEnabled;
        }, function(T) {
          B.actions.get('mathematicalTypesetting').funct();
        }, {
          install: function(T) {
            this.listener = function() {
              T(N.mathEnabled);
            };
            B.addListener('mathEnabledChanged', this.listener);
          },
          destroy: function() {
            B.removeListener(this.listener);
          }
        });
        p.appendChild(R);
        var V = B.menus.createHelpLink('https://www.diagrams.net/doc/faq/math-typesetting');
        V.style.position = 'relative';
        V.style.marginLeft = '6px';
        R.appendChild(V);
      }
      return p;
    };
    mxCellRenderer.prototype.defaultVertexShape.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: mxConstants.LINE_ARCSIZE
      },
      {
        name: 'absoluteArcSize',
        dispName: 'Abs. Arc Size',
        type: 'bool',
        defVal: !1
      }
    ];
    mxCellRenderer.defaultShapes.link.prototype.customProperties = [{
      name: 'width',
      dispName: 'Width',
      type: 'float',
      min: 0,
      defVal: 4
    }];
    mxCellRenderer.defaultShapes.flexArrow.prototype.customProperties = [{
        name: 'width',
        dispName: 'Width',
        type: 'float',
        min: 0,
        defVal: 10
      },
      {
        name: 'startWidth',
        dispName: 'Start Width',
        type: 'float',
        min: 0,
        defVal: 20
      },
      {
        name: 'endWidth',
        dispName: 'End Width',
        type: 'float',
        min: 0,
        defVal: 20
      }
    ];
    mxCellRenderer.defaultShapes.process.prototype.customProperties = [{
      name: 'size',
      dispName: 'Indent',
      type: 'float',
      min: 0,
      max: 0.5,
      defVal: 0.1
    }];
    mxCellRenderer.defaultShapes.rhombus.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        max: 50,
        defVal: mxConstants.LINE_ARCSIZE
      },
      {
        name: 'double',
        dispName: 'Double',
        type: 'bool',
        defVal: !1
      }
    ];
    mxCellRenderer.defaultShapes.partialRectangle.prototype.customProperties = [{
        name: 'top',
        dispName: 'Top Line',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'bottom',
        dispName: 'Bottom Line',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'left',
        dispName: 'Left Line',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'right',
        dispName: 'Right Line',
        type: 'bool',
        defVal: !0
      }
    ];
    mxCellRenderer.defaultShapes.parallelogram.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: mxConstants.LINE_ARCSIZE
      },
      {
        name: 'size',
        dispName: 'Slope Angle',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.2
      }
    ];
    mxCellRenderer.defaultShapes.hexagon.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: mxConstants.LINE_ARCSIZE
      },
      {
        name: 'size',
        dispName: 'Slope Angle',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.25
      }
    ];
    mxCellRenderer.defaultShapes.triangle.prototype.customProperties = [{
      name: 'arcSize',
      dispName: 'Arc Size',
      type: 'float',
      min: 0,
      defVal: mxConstants.LINE_ARCSIZE
    }];
    mxCellRenderer.defaultShapes.document.prototype.customProperties = [{
      name: 'size',
      dispName: 'Size',
      type: 'float',
      defVal: 0.3,
      min: 0,
      max: 1
    }];
    mxCellRenderer.defaultShapes.internalStorage.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: mxConstants.LINE_ARCSIZE
      },
      {
        name: 'dx',
        dispName: 'Left Line',
        type: 'float',
        min: 0,
        defVal: 20
      },
      {
        name: 'dy',
        dispName: 'Top Line',
        type: 'float',
        min: 0,
        defVal: 20
      }
    ];
    mxCellRenderer.defaultShapes.cube.prototype.customProperties = [{
        name: 'size',
        dispName: 'Size',
        type: 'float',
        min: 0,
        defVal: 20
      },
      {
        name: 'darkOpacity',
        dispName: 'Dark Opacity',
        type: 'float',
        min: -1,
        max: 1,
        defVal: 0
      },
      {
        name: 'darkOpacity2',
        dispName: 'Dark Opacity 2',
        type: 'float',
        min: -1,
        max: 1,
        defVal: 0
      }
    ];
    mxCellRenderer.defaultShapes.step.prototype.customProperties = [{
        name: 'size',
        dispName: 'Notch Size',
        type: 'float',
        min: 0,
        defVal: 20
      },
      {
        name: 'fixedSize',
        dispName: 'Fixed Size',
        type: 'bool',
        defVal: !0
      }
    ];
    mxCellRenderer.defaultShapes.trapezoid.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: mxConstants.LINE_ARCSIZE
      },
      {
        name: 'size',
        dispName: 'Slope Angle',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.2
      }
    ];
    mxCellRenderer.defaultShapes.tape.prototype.customProperties = [{
      name: 'size',
      dispName: 'Size',
      type: 'float',
      min: 0,
      max: 1,
      defVal: 0.4
    }];
    mxCellRenderer.defaultShapes.note.prototype.customProperties = [{
        name: 'size',
        dispName: 'Fold Size',
        type: 'float',
        min: 0,
        defVal: 30
      },
      {
        name: 'darkOpacity',
        dispName: 'Dark Opacity',
        type: 'float',
        min: -1,
        max: 1,
        defVal: 0
      }
    ];
    mxCellRenderer.defaultShapes.card.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: mxConstants.LINE_ARCSIZE
      },
      {
        name: 'size',
        dispName: 'Cutoff Size',
        type: 'float',
        min: 0,
        defVal: 30
      }
    ];
    mxCellRenderer.defaultShapes.callout.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: mxConstants.LINE_ARCSIZE
      },
      {
        name: 'base',
        dispName: 'Callout Width',
        type: 'float',
        min: 0,
        defVal: 20
      },
      {
        name: 'size',
        dispName: 'Callout Length',
        type: 'float',
        min: 0,
        defVal: 30
      },
      {
        name: 'position',
        dispName: 'Callout Position',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.5
      },
      {
        name: 'position2',
        dispName: 'Callout Tip Position',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.5
      }
    ];
    mxCellRenderer.defaultShapes.folder.prototype.customProperties = [{
        name: 'tabWidth',
        dispName: 'Tab Width',
        type: 'float'
      },
      {
        name: 'tabHeight',
        dispName: 'Tab Height',
        type: 'float'
      },
      {
        name: 'tabPosition',
        dispName: 'Tap Position',
        type: 'enum',
        enumList: [{
            val: 'left',
            dispName: 'Left'
          },
          {
            val: 'right',
            dispName: 'Right'
          }
        ]
      }
    ];
    mxCellRenderer.defaultShapes.swimlane.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: 15
      },
      {
        name: 'startSize',
        dispName: 'Header Size',
        type: 'float'
      },
      {
        name: 'swimlaneHead',
        dispName: 'Head Border',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'swimlaneBody',
        dispName: 'Body Border',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'horizontal',
        dispName: 'Horizontal',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'separatorColor',
        dispName: 'Separator Color',
        type: 'color',
        defVal: null
      }
    ];
    mxCellRenderer.defaultShapes.table.prototype.customProperties = [{
        name: 'rowLines',
        dispName: 'Row Lines',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'columnLines',
        dispName: 'Column Lines',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'fixedRows',
        dispName: 'Fixed Rows',
        type: 'bool',
        defVal: !1
      },
      {
        name: 'resizeLast',
        dispName: 'Resize Last Column',
        type: 'bool',
        defVal: !1
      },
      {
        name: 'resizeLastRow',
        dispName: 'Resize Last Row',
        type: 'bool',
        defVal: !1
      }
    ].concat(mxCellRenderer.defaultShapes.swimlane.prototype.customProperties).concat(mxCellRenderer.defaultShapes.partialRectangle.prototype.customProperties);
    mxCellRenderer.defaultShapes.tableRow.prototype.customProperties = mxCellRenderer.defaultShapes.swimlane.prototype.customProperties.concat(mxCellRenderer.defaultShapes.partialRectangle.prototype.customProperties);
    mxCellRenderer.defaultShapes.doubleEllipse.prototype.customProperties = [{
      name: 'margin',
      dispName: 'Indent',
      type: 'float',
      min: 0,
      defVal: 4
    }];
    mxCellRenderer.defaultShapes.ext.prototype.customProperties = [{
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: 15
      },
      {
        name: 'double',
        dispName: 'Double',
        type: 'bool',
        defVal: !1
      },
      {
        name: 'margin',
        dispName: 'Indent',
        type: 'float',
        min: 0,
        defVal: 0
      }
    ];
    mxCellRenderer.defaultShapes.curlyBracket.prototype.customProperties = [{
        name: 'rounded',
        dispName: 'Rounded',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'size',
        dispName: 'Size',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.5
      }
    ];
    mxCellRenderer.defaultShapes.image.prototype.customProperties = [{
      name: 'imageAspect',
      dispName: 'Fixed Image Aspect',
      type: 'bool',
      defVal: !0
    }];
    mxCellRenderer.defaultShapes.label.prototype.customProperties = [{
        name: 'imageAspect',
        dispName: 'Fixed Image Aspect',
        type: 'bool',
        defVal: !0
      },
      {
        name: 'imageAlign',
        dispName: 'Image Align',
        type: 'enum',
        enumList: [{
            val: 'left',
            dispName: 'Left'
          },
          {
            val: 'center',
            dispName: 'Center'
          },
          {
            val: 'right',
            dispName: 'Right'
          }
        ],
        defVal: 'left'
      },
      {
        name: 'imageVerticalAlign',
        dispName: 'Image Vertical Align',
        type: 'enum',
        enumList: [{
            val: 'top',
            dispName: 'Top'
          },
          {
            val: 'middle',
            dispName: 'Middle'
          },
          {
            val: 'bottom',
            dispName: 'Bottom'
          }
        ],
        defVal: 'middle'
      },
      {
        name: 'imageWidth',
        dispName: 'Image Width',
        type: 'float',
        min: 0,
        defVal: 24
      },
      {
        name: 'imageHeight',
        dispName: 'Image Height',
        type: 'float',
        min: 0,
        defVal: 24
      },
      {
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: 12
      },
      {
        name: 'absoluteArcSize',
        dispName: 'Abs. Arc Size',
        type: 'bool',
        defVal: !1
      }
    ];
    mxCellRenderer.defaultShapes.dataStorage.prototype.customProperties = [{
      name: 'size',
      dispName: 'Size',
      type: 'float',
      min: 0,
      max: 1,
      defVal: 0.1
    }];
    mxCellRenderer.defaultShapes.manualInput.prototype.customProperties = [{
        name: 'size',
        dispName: 'Size',
        type: 'float',
        min: 0,
        defVal: 30
      },
      {
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: 20
      }
    ];
    mxCellRenderer.defaultShapes.loopLimit.prototype.customProperties = [{
        name: 'size',
        dispName: 'Size',
        type: 'float',
        min: 0,
        defVal: 20
      },
      {
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: 20
      }
    ];
    mxCellRenderer.defaultShapes.offPageConnector.prototype.customProperties = [{
        name: 'size',
        dispName: 'Size',
        type: 'float',
        min: 0,
        defVal: 38
      },
      {
        name: 'arcSize',
        dispName: 'Arc Size',
        type: 'float',
        min: 0,
        defVal: 20
      }
    ];
    mxCellRenderer.defaultShapes.display.prototype.customProperties = [{
      name: 'size',
      dispName: 'Size',
      type: 'float',
      min: 0,
      max: 1,
      defVal: 0.25
    }];
    mxCellRenderer.defaultShapes.singleArrow.prototype.customProperties = [{
        name: 'arrowWidth',
        dispName: 'Arrow Width',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.3
      },
      {
        name: 'arrowSize',
        dispName: 'Arrowhead Length',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.2
      }
    ];
    mxCellRenderer.defaultShapes.doubleArrow.prototype.customProperties = [{
        name: 'arrowWidth',
        dispName: 'Arrow Width',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.3
      },
      {
        name: 'arrowSize',
        dispName: 'Arrowhead Length',
        type: 'float',
        min: 0,
        max: 1,
        defVal: 0.2
      }
    ];
    mxCellRenderer.defaultShapes.cross.prototype.customProperties = [{
      name: 'size',
      dispName: 'Size',
      type: 'float',
      min: 0,
      max: 1,
      defVal: 0.2
    }];
    mxCellRenderer.defaultShapes.corner.prototype.customProperties = [{
        name: 'dx',
        dispName: 'Width1',
        type: 'float',
        min: 0,
        defVal: 20
      },
      {
        name: 'dy',
        dispName: 'Width2',
        type: 'float',
        min: 0,
        defVal: 20
      }
    ];
    mxCellRenderer.defaultShapes.tee.prototype.customProperties = [{
        name: 'dx',
        dispName: 'Width1',
        type: 'float',
        min: 0,
        defVal: 20
      },
      {
        name: 'dy',
        dispName: 'Width2',
        type: 'float',
        min: 0,
        defVal: 20
      }
    ];
    mxCellRenderer.defaultShapes.umlLifeline.prototype.customProperties = [{
        name: 'participant',
        dispName: 'Participant',
        type: 'enum',
        defVal: 'none',
        enumList: [{
            val: 'none',
            dispName: 'Default'
          },
          {
            val: 'umlActor',
            dispName: 'Actor'
          },
          {
            val: 'umlBoundary',
            dispName: 'Boundary'
          },
          {
            val: 'umlEntity',
            dispName: 'Entity'
          },
          {
            val: 'umlControl',
            dispName: 'Control'
          }
        ]
      },
      {
        name: 'size',
        dispName: 'Height',
        type: 'float',
        defVal: 40,
        min: 0
      }
    ];
    mxCellRenderer.defaultShapes.umlFrame.prototype.customProperties = [{
        name: 'width',
        dispName: 'Title Width',
        type: 'float',
        defVal: 60,
        min: 0
      },
      {
        name: 'height',
        dispName: 'Title Height',
        type: 'float',
        defVal: 30,
        min: 0
      }
    ];
    StyleFormatPanel.prototype.defaultColorSchemes = [
      [{
          fill: '',
          stroke: ''
        },
        {
          fill: '#f5f5f5',
          stroke: '#666666',
          font: '#333333'
        },
        {
          fill: '#dae8fc',
          stroke: '#6c8ebf'
        },
        {
          fill: '#d5e8d4',
          stroke: '#82b366'
        },
        {
          fill: '#ffe6cc',
          stroke: '#d79b00'
        },
        {
          fill: '#fff2cc',
          stroke: '#d6b656'
        },
        {
          fill: '#f8cecc',
          stroke: '#b85450'
        },
        {
          fill: '#e1d5e7',
          stroke: '#9673a6'
        }
      ],
      [{
          fill: '',
          stroke: ''
        },
        {
          fill: '#60a917',
          stroke: '#2D7600',
          font: '#ffffff'
        },
        {
          fill: '#008a00',
          stroke: '#005700',
          font: '#ffffff'
        },
        {
          fill: '#1ba1e2',
          stroke: '#006EAF',
          font: '#ffffff'
        },
        {
          fill: '#0050ef',
          stroke: '#001DBC',
          font: '#ffffff'
        },
        {
          fill: '#6a00ff',
          stroke: '#3700CC',
          font: '#ffffff'
        },
        {
          fill: '#d80073',
          stroke: '#A50040',
          font: '#ffffff'
        },
        {
          fill: '#a20025',
          stroke: '#6F0000',
          font: '#ffffff'
        }
      ],
      [{
          fill: '#e51400',
          stroke: '#B20000',
          font: '#ffffff'
        },
        {
          fill: '#fa6800',
          stroke: '#C73500',
          font: '#000000'
        },
        {
          fill: '#f0a30a',
          stroke: '#BD7000',
          font: '#000000'
        },
        {
          fill: '#e3c800',
          stroke: '#B09500',
          font: '#000000'
        },
        {
          fill: '#6d8764',
          stroke: '#3A5431',
          font: '#ffffff'
        },
        {
          fill: '#647687',
          stroke: '#314354',
          font: '#ffffff'
        },
        {
          fill: '#76608a',
          stroke: '#432D57',
          font: '#ffffff'
        },
        {
          fill: '#a0522d',
          stroke: '#6D1F00',
          font: '#ffffff'
        }
      ],
      [{
          fill: '',
          stroke: ''
        },
        {
          fill: mxConstants.NONE,
          stroke: ''
        },
        {
          fill: '#fad7ac',
          stroke: '#b46504'
        },
        {
          fill: '#fad9d5',
          stroke: '#ae4132'
        },
        {
          fill: '#b0e3e6',
          stroke: '#0e8088'
        },
        {
          fill: '#b1ddf0',
          stroke: '#10739e'
        },
        {
          fill: '#d0cee2',
          stroke: '#56517e'
        },
        {
          fill: '#bac8d3',
          stroke: '#23445d'
        }
      ],
      [{
          fill: '',
          stroke: ''
        },
        {
          fill: '#f5f5f5',
          stroke: '#666666',
          gradient: '#b3b3b3'
        },
        {
          fill: '#dae8fc',
          stroke: '#6c8ebf',
          gradient: '#7ea6e0'
        },
        {
          fill: '#d5e8d4',
          stroke: '#82b366',
          gradient: '#97d077'
        },
        {
          fill: '#ffcd28',
          stroke: '#d79b00',
          gradient: '#ffa500'
        },
        {
          fill: '#fff2cc',
          stroke: '#d6b656',
          gradient: '#ffd966'
        },
        {
          fill: '#f8cecc',
          stroke: '#b85450',
          gradient: '#ea6b66'
        },
        {
          fill: '#e6d0de',
          stroke: '#996185',
          gradient: '#d5739d'
        }
      ],
      [{
          fill: '',
          stroke: ''
        },
        {
          fill: '#eeeeee',
          stroke: '#36393d'
        },
        {
          fill: '#f9f7ed',
          stroke: '#36393d'
        },
        {
          fill: '#ffcc99',
          stroke: '#36393d'
        },
        {
          fill: '#cce5ff',
          stroke: '#36393d'
        },
        {
          fill: '#ffff88',
          stroke: '#36393d'
        },
        {
          fill: '#cdeb8b',
          stroke: '#36393d'
        },
        {
          fill: '#ffcccc',
          stroke: '#36393d'
        }
      ]
    ];
    StyleFormatPanel.prototype.customColorSchemes = null;
    StyleFormatPanel.prototype.findCommonProperties = function(p, B, N) {
      if (null != B) {
        var S = function(V) {
            if (null != V)
              if (N)
                for (var T = 0; T < V.length; T++)
                  B[V[T].name] = V[T];
              else
                for (var U in B) {
                  var X = !1;
                  for (T = 0; T < V.length; T++)
                    if (V[T].name == U && V[T].type == B[U].type) {
                      X = !0;
                      break;
                    }
                  X || delete B[U];
                }
          },
          R = this.editorUi.editor.graph.view.getState(p);
        null != R && null != R.shape && (R.shape.commonCustomPropAdded || (R.shape.commonCustomPropAdded = !0, R.shape.customProperties = R.shape.customProperties || [], R.cell.vertex ? Array.prototype.push.apply(R.shape.customProperties, Editor.commonVertexProperties) : Array.prototype.push.apply(R.shape.customProperties, Editor.commonEdgeProperties)), S(R.shape.customProperties));
        p = p.getAttribute('customProperties');
        if (null != p)
          try {
            S(JSON.parse(p));
          } catch (V) {}
      }
    };
    var G = StyleFormatPanel.prototype.init;
    StyleFormatPanel.prototype.init = function() {
      var p = this.editorUi.getSelectionState();
      null != this.defaultColorSchemes && 0 < this.defaultColorSchemes.length && 'image' != p.style.shape && !p.containsLabel && 0 < p.cells.length && this.container.appendChild(this.addStyles(this.createPanel()));
      G.apply(this, arguments);
      if (Editor.enableCustomProperties) {
        for (var B = {}, N = p.vertices, S = p.edges, R = 0; R < N.length; R++)
          this.findCommonProperties(N[R], B, 0 == R);
        for (R = 0; R < S.length; R++)
          this.findCommonProperties(S[R], B, 0 == N.length && 0 == R);
        null != Object.getOwnPropertyNames && 0 < Object.getOwnPropertyNames(B).length && this.container.appendChild(this.addProperties(this.createPanel(), B, p));
      }
    };
    var d = StyleFormatPanel.prototype.addStyleOps;
    StyleFormatPanel.prototype.addStyleOps = function(p) {
      1 == this.editorUi.getSelectionState().cells.length && this.addActions(p, [
        'copyStyle',
        'pasteStyle'
      ]);
      return d.apply(this, arguments);
    };
    EditorUi.prototype.propertiesCollapsed = !0;
    StyleFormatPanel.prototype.addProperties = function(p, B, N) {
      function S(ha, ra, ua, La) {
        ea.getModel().beginUpdate();
        try {
          var Ia = [],
            ka = [];
          if (null != ua.index) {
            for (var xa = [], ta = ua.parentRow.nextSibling; ta && ta.getAttribute('data-pName') == ha;)
              xa.push(ta.getAttribute('data-pValue')), ta = ta.nextSibling;
            ua.index < xa.length ? null != La ? xa.splice(La, 1) : xa[ua.index] = ra : xa.push(ra);
            null != ua.size && xa.length > ua.size && (xa = xa.slice(0, ua.size));
            ra = xa.join(',');
            null != ua.countProperty && (ea.setCellStyles(ua.countProperty, xa.length, ea.getSelectionCells()), Ia.push(ua.countProperty), ka.push(xa.length));
          }
          ea.setCellStyles(ha, ra, ea.getSelectionCells());
          Ia.push(ha);
          ka.push(ra);
          if (null != ua.dependentProps)
            for (ha = 0; ha < ua.dependentProps.length; ha++) {
              var oa = ua.dependentPropsDefVal[ha],
                sa = ua.dependentPropsVals[ha];
              if (sa.length > ra)
                sa = sa.slice(0, ra);
              else
                for (var za = sa.length; za < ra; za++)
                  sa.push(oa);
              sa = sa.join(',');
              ea.setCellStyles(ua.dependentProps[ha], sa, ea.getSelectionCells());
              Ia.push(ua.dependentProps[ha]);
              ka.push(sa);
            }
          if ('function' == typeof ua.onChange)
            ua.onChange(ea, ra);
          Y.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', Ia, 'values', ka, 'cells', ea.getSelectionCells()));
        } finally {
          ea.getModel().endUpdate();
        }
      }

      function R(ha, ra, ua) {
        var La = mxUtils.getOffset(p, !0),
          Ia = mxUtils.getOffset(ha, !0);
        ra.style.position = 'absolute';
        ra.style.left = Ia.x - La.x + 'px';
        ra.style.top = Ia.y - La.y + 'px';
        ra.style.width = ha.offsetWidth + 'px';
        ra.style.height = ha.offsetHeight - (ua ? 4 : 0) + 'px';
        ra.style.zIndex = 5;
      }

      function V(ha, ra, ua) {
        var La = document.createElement('div');
        La.style.width = '32px';
        La.style.height = '4px';
        La.style.margin = '2px';
        La.style.border = '1px solid black';
        La.style.background = ra && 'none' != ra ? ra : 'url(\'' + Dialog.prototype.noColorImage + '\')';
        btn = mxUtils.button('', mxUtils.bind(Y, function(Ia) {
          this.editorUi.pickColor(ra, function(ka) {
            La.style.background = 'none' == ka ? 'url(\'' + Dialog.prototype.noColorImage + '\')' : ka;
            S(ha, ka, ua);
          });
          mxEvent.consume(Ia);
        }));
        btn.style.height = '12px';
        btn.style.width = '40px';
        btn.className = 'geColorBtn';
        btn.appendChild(La);
        return btn;
      }

      function T(ha, ra, ua, La, Ia, ka, xa) {
        null != ra && (ra = ra.split(','), aa.push({
          name: ha,
          values: ra,
          type: ua,
          defVal: La,
          countProperty: Ia,
          parentRow: ka,
          isDeletable: !0,
          flipBkg: xa
        }));
        btn = mxUtils.button('+', mxUtils.bind(Y, function(ta) {
          for (var oa = ka, sa = 0; null != oa.nextSibling;)
            if (oa.nextSibling.getAttribute('data-pName') == ha)
              oa = oa.nextSibling, sa++;
            else
              break;
          var za = {
            type: ua,
            parentRow: ka,
            index: sa,
            isDeletable: !0,
            defVal: La,
            countProperty: Ia
          };
          sa = Z(ha, '', za, 0 == sa % 2, xa);
          S(ha, La, za);
          oa.parentNode.insertBefore(sa, oa.nextSibling);
          mxEvent.consume(ta);
        }));
        btn.style.height = '16px';
        btn.style.width = '25px';
        btn.className = 'geColorBtn';
        return btn;
      }

      function U(ha, ra, ua, La, Ia, ka, xa) {
        if (0 < Ia) {
          var ta = Array(Ia);
          ra = null != ra ? ra.split(',') : [];
          for (var oa = 0; oa < Ia; oa++)
            ta[oa] = null != ra[oa] ? ra[oa] : null != La ? La : '';
          aa.push({
            name: ha,
            values: ta,
            type: ua,
            defVal: La,
            parentRow: ka,
            flipBkg: xa,
            size: Ia
          });
        }
        return document.createElement('div');
      }

      function X(ha, ra, ua) {
        var La = document.createElement('input');
        La.type = 'checkbox';
        La.checked = '1' == ra;
        mxEvent.addListener(La, 'change', function() {
          S(ha, La.checked ? '1' : '0', ua);
        });
        return La;
      }

      function Z(ha, ra, ua, La, Ia) {
        var ka = ua.dispName,
          xa = ua.type,
          ta = document.createElement('tr');
        ta.className = 'gePropRow' + (Ia ? 'Dark' : '') + (La ? 'Alt' : '') + ' gePropNonHeaderRow';
        ta.setAttribute('data-pName', ha);
        ta.setAttribute('data-pValue', ra);
        La = !1;
        null != ua.index && (ta.setAttribute('data-index', ua.index), ka = (null != ka ? ka : '') + '[' + ua.index + ']', La = !0);
        var oa = document.createElement('td');
        oa.className = 'gePropRowCell';
        ka = mxResources.get(ka, null, ka);
        mxUtils.write(oa, ka);
        oa.setAttribute('title', ka);
        La && (oa.style.textAlign = 'right');
        ta.appendChild(oa);
        oa = document.createElement('td');
        oa.className = 'gePropRowCell';
        if ('color' == xa)
          oa.appendChild(V(ha, ra, ua));
        else if ('bool' == xa || 'boolean' == xa)
          oa.appendChild(X(ha, ra, ua));
        else if ('enum' == xa) {
          var sa = ua.enumList;
          for (Ia = 0; Ia < sa.length; Ia++)
            if (ka = sa[Ia], ka.val == ra) {
              mxUtils.write(oa, mxResources.get(ka.dispName, null, ka.dispName));
              break;
            }
          mxEvent.addListener(oa, 'click', mxUtils.bind(Y, function() {
            var za = document.createElement('select');
            R(oa, za);
            for (var ca = 0; ca < sa.length; ca++) {
              var ma = sa[ca],
                pa = document.createElement('option');
              pa.value = mxUtils.htmlEntities(ma.val);
              mxUtils.write(pa, mxResources.get(ma.dispName, null, ma.dispName));
              za.appendChild(pa);
            }
            za.value = ra;
            p.appendChild(za);
            mxEvent.addListener(za, 'change', function() {
              var wa = mxUtils.htmlEntities(za.value);
              S(ha, wa, ua);
            });
            za.focus();
            mxEvent.addListener(za, 'blur', function() {
              p.removeChild(za);
            });
          }));
        } else
          'dynamicArr' == xa ? oa.appendChild(T(ha, ra, ua.subType, ua.subDefVal, ua.countProperty, ta, Ia)) : 'staticArr' == xa ? oa.appendChild(U(ha, ra, ua.subType, ua.subDefVal, ua.size, ta, Ia)) : 'readOnly' == xa ? (Ia = document.createElement('input'), Ia.setAttribute('readonly', ''), Ia.value = ra, Ia.style.width = '96px', Ia.style.borderWidth = '0px', oa.appendChild(Ia)) : (oa.innerHTML = mxUtils.htmlEntities(decodeURIComponent(ra)), mxEvent.addListener(oa, 'click', mxUtils.bind(Y, function() {
            function za() {
              var ma = ca.value;
              ma = 0 == ma.length && 'string' != xa ? 0 : ma;
              ua.allowAuto && (null != ma.trim && 'auto' == ma.trim().toLowerCase() ? (ma = 'auto', xa = 'string') : (ma = parseFloat(ma), ma = isNaN(ma) ? 0 : ma));
              null != ua.min && ma < ua.min ? ma = ua.min : null != ua.max && ma > ua.max && (ma = ua.max);
              ma = encodeURIComponent(('int' == xa ? parseInt(ma) : ma) + '');
              S(ha, ma, ua);
            }
            var ca = document.createElement('input');
            R(oa, ca, !0);
            ca.value = decodeURIComponent(ra);
            ca.className = 'gePropEditor';
            'int' != xa && 'float' != xa || ua.allowAuto || (ca.type = 'number', ca.step = 'int' == xa ? '1' : 'any', null != ua.min && (ca.min = parseFloat(ua.min)), null != ua.max && (ca.max = parseFloat(ua.max)));
            p.appendChild(ca);
            mxEvent.addListener(ca, 'keypress', function(ma) {
              13 == ma.keyCode && za();
            });
            ca.focus();
            mxEvent.addListener(ca, 'blur', function() {
              za();
            });
          })));
        ua.isDeletable && (Ia = mxUtils.button('-', mxUtils.bind(Y, function(za) {
          S(ha, '', ua, ua.index);
          mxEvent.consume(za);
        })), Ia.style.height = '16px', Ia.style.width = '25px', Ia.style.float = 'right', Ia.className = 'geColorBtn', oa.appendChild(Ia));
        ta.appendChild(oa);
        return ta;
      }
      var Y = this,
        ea = this.editorUi.editor.graph,
        aa = [];
      p.style.position = 'relative';
      p.style.padding = '0';
      var fa = document.createElement('table');
      fa.className = 'geProperties';
      fa.style.whiteSpace = 'nowrap';
      fa.style.width = '100%';
      var da = document.createElement('tr');
      da.className = 'gePropHeader';
      var ba = document.createElement('th');
      ba.className = 'gePropHeaderCell';
      var na = document.createElement('img');
      na.src = Sidebar.prototype.expandedImage;
      na.style.verticalAlign = 'middle';
      ba.appendChild(na);
      mxUtils.write(ba, mxResources.get('property'));
      da.style.cursor = 'pointer';
      var ia = function() {
        var ha = fa.querySelectorAll('.gePropNonHeaderRow');
        if (Y.editorUi.propertiesCollapsed) {
          na.src = Sidebar.prototype.collapsedImage;
          var ra = 'none';
          for (var ua = p.childNodes.length - 1; 0 <= ua; ua--)
            try {
              var La = p.childNodes[ua],
                Ia = La.nodeName.toUpperCase();
              'INPUT' != Ia && 'SELECT' != Ia || p.removeChild(La);
            } catch (ka) {}
        } else
          na.src = Sidebar.prototype.expandedImage, ra = '';
        for (ua = 0; ua < ha.length; ua++)
          ha[ua].style.display = ra;
      };
      mxEvent.addListener(da, 'click', function() {
        Y.editorUi.propertiesCollapsed = !Y.editorUi.propertiesCollapsed;
        ia();
      });
      da.appendChild(ba);
      ba = document.createElement('th');
      ba.className = 'gePropHeaderCell';
      ba.innerHTML = mxResources.get('value');
      da.appendChild(ba);
      fa.appendChild(da);
      var qa = !1,
        Aa = !1;
      da = null;
      1 == N.vertices.length && 0 == N.edges.length ? da = N.vertices[0].id : 0 == N.vertices.length && 1 == N.edges.length && (da = N.edges[0].id);
      null != da && fa.appendChild(Z('id', mxUtils.htmlEntities(da), {
        dispName: 'ID',
        type: 'readOnly'
      }, !0, !1));
      for (var va in B)
        if (da = B[va], 'function' != typeof da.isVisible || da.isVisible(N, this)) {
          var ja = null != N.style[va] ? mxUtils.htmlEntities(N.style[va] + '') : null != da.getDefaultValue ? da.getDefaultValue(N, this) : da.defVal;
          if ('separator' == da.type)
            Aa = !Aa;
          else {
            if ('staticArr' == da.type)
              da.size = parseInt(N.style[da.sizeProperty] || B[da.sizeProperty].defVal) || 0;
            else if (null != da.dependentProps) {
              var Ga = da.dependentProps,
                Da = [],
                Ca = [];
              for (ba = 0; ba < Ga.length; ba++) {
                var Ka = N.style[Ga[ba]];
                Ca.push(B[Ga[ba]].subDefVal);
                Da.push(null != Ka ? Ka.split(',') : []);
              }
              da.dependentPropsDefVal = Ca;
              da.dependentPropsVals = Da;
            }
            fa.appendChild(Z(va, ja, da, qa, Aa));
            qa = !qa;
          }
        }
      for (ba = 0; ba < aa.length; ba++)
        for (da = aa[ba], B = da.parentRow, N = 0; N < da.values.length; N++)
          va = Z(da.name, da.values[N], {
            type: da.type,
            parentRow: da.parentRow,
            isDeletable: da.isDeletable,
            index: N,
            defVal: da.defVal,
            countProperty: da.countProperty,
            size: da.size
          }, 0 == N % 2, da.flipBkg), B.parentNode.insertBefore(va, B.nextSibling), B = va;
      p.appendChild(fa);
      ia();
      return p;
    };
    StyleFormatPanel.prototype.addStyles = function(p) {
      function B(da) {
        mxEvent.addListener(da, 'mouseenter', function() {
          da.style.opacity = '1';
        });
        mxEvent.addListener(da, 'mouseleave', function() {
          da.style.opacity = '0.5';
        });
      }
      var N = this.editorUi,
        S = N.editor.graph,
        R = document.createElement('div');
      R.style.whiteSpace = 'nowrap';
      R.style.paddingLeft = '24px';
      R.style.paddingRight = '20px';
      p.style.paddingLeft = '16px';
      p.style.paddingBottom = '6px';
      p.style.position = 'relative';
      p.appendChild(R);
      var V = 'plain-gray plain-blue plain-green plain-turquoise plain-orange plain-yellow plain-red plain-pink plain-purple gray blue green turquoise orange yellow red pink purple'.split(' '),
        T = document.createElement('div');
      T.style.whiteSpace = 'nowrap';
      T.style.position = 'relative';
      T.style.textAlign = 'center';
      T.style.width = '210px';
      for (var U = [], X = 0; X < this.defaultColorSchemes.length; X++) {
        var Z = document.createElement('div');
        Z.style.display = 'inline-block';
        Z.style.width = '6px';
        Z.style.height = '6px';
        Z.style.marginLeft = '4px';
        Z.style.marginRight = '3px';
        Z.style.borderRadius = '3px';
        Z.style.cursor = 'pointer';
        Z.style.background = 'transparent';
        Z.style.border = '1px solid #b5b6b7';
        mxUtils.bind(this, function(da) {
          mxEvent.addListener(Z, 'click', mxUtils.bind(this, function() {
            Y(da);
          }));
        })(X);
        U.push(Z);
        T.appendChild(Z);
      }
      var Y = mxUtils.bind(this, function(da) {
          null != U[da] && (null != this.format.currentScheme && null != U[this.format.currentScheme] && (U[this.format.currentScheme].style.background = 'transparent'), this.format.currentScheme = da, ea(this.defaultColorSchemes[this.format.currentScheme]), U[this.format.currentScheme].style.background = '#84d7ff');
        }),
        ea = mxUtils.bind(this, function(da) {
          var ba = mxUtils.bind(this, function(ia) {
            var qa = mxUtils.button('', mxUtils.bind(this, function(ja) {
              S.getModel().beginUpdate();
              try {
                for (var Ga = N.getSelectionState().cells, Da = 0; Da < Ga.length; Da++) {
                  for (var Ca = S.getModel().getStyle(Ga[Da]), Ka = 0; Ka < V.length; Ka++)
                    Ca = mxUtils.removeStylename(Ca, V[Ka]);
                  var ha = S.getModel().isVertex(Ga[Da]) ? S.defaultVertexStyle : S.defaultEdgeStyle;
                  null != ia ? (mxEvent.isShiftDown(ja) || (Ca = '' == ia.fill ? mxUtils.setStyle(Ca, mxConstants.STYLE_FILLCOLOR, null) : mxUtils.setStyle(Ca, mxConstants.STYLE_FILLCOLOR, ia.fill || mxUtils.getValue(ha, mxConstants.STYLE_FILLCOLOR, null)), Ca = mxUtils.setStyle(Ca, mxConstants.STYLE_GRADIENTCOLOR, ia.gradient || mxUtils.getValue(ha, mxConstants.STYLE_GRADIENTCOLOR, null)), mxEvent.isControlDown(ja) || mxClient.IS_MAC && mxEvent.isMetaDown(ja) || !S.getModel().isVertex(Ga[Da]) || (Ca = mxUtils.setStyle(Ca, mxConstants.STYLE_FONTCOLOR, ia.font || mxUtils.getValue(ha, mxConstants.STYLE_FONTCOLOR, null)))), mxEvent.isAltDown(ja) || (Ca = '' == ia.stroke ? mxUtils.setStyle(Ca, mxConstants.STYLE_STROKECOLOR, null) : mxUtils.setStyle(Ca, mxConstants.STYLE_STROKECOLOR, ia.stroke || mxUtils.getValue(ha, mxConstants.STYLE_STROKECOLOR, null)))) : (Ca = mxUtils.setStyle(Ca, mxConstants.STYLE_FILLCOLOR, mxUtils.getValue(ha, mxConstants.STYLE_FILLCOLOR, '#ffffff')), Ca = mxUtils.setStyle(Ca, mxConstants.STYLE_STROKECOLOR, mxUtils.getValue(ha, mxConstants.STYLE_STROKECOLOR, '#000000')), Ca = mxUtils.setStyle(Ca, mxConstants.STYLE_GRADIENTCOLOR, mxUtils.getValue(ha, mxConstants.STYLE_GRADIENTCOLOR, null)), S.getModel().isVertex(Ga[Da]) && (Ca = mxUtils.setStyle(Ca, mxConstants.STYLE_FONTCOLOR, mxUtils.getValue(ha, mxConstants.STYLE_FONTCOLOR, null))));
                  S.getModel().setStyle(Ga[Da], Ca);
                }
              } finally {
                S.getModel().endUpdate();
              }
            }));
            qa.className = 'geStyleButton';
            qa.style.width = '36px';
            qa.style.height = 10 >= this.defaultColorSchemes.length ? '24px' : '30px';
            qa.style.margin = '0px 6px 6px 0px';
            if (null != ia) {
              var Aa = '1' == urlParams.sketch ? '2px solid' : '1px solid';
              null != ia.border && (Aa = ia.border);
              null != ia.gradient ? mxClient.IS_IE && 10 > document.documentMode ? qa.style.filter = 'progid:DXImageTransform.Microsoft.Gradient(StartColorStr=\'' + ia.fill + '\', EndColorStr=\'' + ia.gradient + '\', GradientType=0)' : qa.style.backgroundImage = 'linear-gradient(' + ia.fill + ' 0px,' + ia.gradient + ' 100%)' : ia.fill == mxConstants.NONE ? qa.style.background = 'url(\'' + Dialog.prototype.noColorImage + '\')' : qa.style.backgroundColor = '' == ia.fill ? mxUtils.getValue(S.defaultVertexStyle, mxConstants.STYLE_FILLCOLOR, Editor.isDarkMode() ? Editor.darkColor : '#ffffff') : ia.fill || mxUtils.getValue(S.defaultVertexStyle, mxConstants.STYLE_FILLCOLOR, Editor.isDarkMode() ? Editor.darkColor : '#ffffff');
              qa.style.border = ia.stroke == mxConstants.NONE ? Aa + ' transparent' : '' == ia.stroke ? Aa + ' ' + mxUtils.getValue(S.defaultVertexStyle, mxConstants.STYLE_STROKECOLOR, Editor.isDarkMode() ? '#ffffff' : Editor.darkColor) : Aa + ' ' + (ia.stroke || mxUtils.getValue(S.defaultVertexStyle, mxConstants.STYLE_STROKECOLOR, Editor.isDarkMode() ? '#ffffff' : Editor.darkColor));
              null != ia.title && qa.setAttribute('title', ia.title);
            } else {
              Aa = mxUtils.getValue(S.defaultVertexStyle, mxConstants.STYLE_FILLCOLOR, '#ffffff');
              var va = mxUtils.getValue(S.defaultVertexStyle, mxConstants.STYLE_STROKECOLOR, '#000000');
              qa.style.backgroundColor = Aa;
              qa.style.border = '1px solid ' + va;
            }
            qa.style.borderRadius = '0';
            R.appendChild(qa);
          });
          R.innerText = '';
          for (var na = 0; na < da.length; na++)
            0 < na && 0 == mxUtils.mod(na, 4) && mxUtils.br(R), ba(da[na]);
        });
      null == this.format.currentScheme ? Y(Math.min(U.length - 1, Editor.isDarkMode() ? 1 : '1' == urlParams.sketch ? 5 : 0)) : Y(this.format.currentScheme);
      X = 10 >= this.defaultColorSchemes.length ? 28 : 8;
      var aa = document.createElement('div');
      aa.style.cssText = 'position:absolute;left:10px;top:8px;bottom:' + X + 'px;width:20px;margin:4px;opacity:0.5;background-repeat:no-repeat;background-position:center center;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQBAMAAADQT4M0AAAAIVBMVEUAAAB2dnZ4eHh3d3d1dXVxcXF2dnZ2dnZ2dnZxcXF2dnYmb3w1AAAACnRSTlMAfCTkhhvb7cQSPH2JPgAAADRJREFUCNdjwACMAmBKaiGYs2oJmLPKAZ3DabU8AMRTXpUKopislqFyVzCAuUZgikkBZjoAcMYLnp53P/UAAAAASUVORK5CYII=);';
      mxEvent.addListener(aa, 'click', mxUtils.bind(this, function() {
        Y(mxUtils.mod(this.format.currentScheme - 1, this.defaultColorSchemes.length));
      }));
      var fa = document.createElement('div');
      fa.style.cssText = 'position:absolute;left:202px;top:8px;bottom:' + X + 'px;width:20px;margin:4px;opacity:0.5;background-repeat:no-repeat;background-position:center center;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQBAMAAADQT4M0AAAAIVBMVEUAAAB2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnYBuwCcAAAACnRSTlMAfCTkhhvb7cQSPH2JPgAAADZJREFUCNdjQAOMAmBKaiGY8loF5rKswsZlrVo8AUiFrTICcbIWK8A5DF1gDoMymMPApIAwHwCS0Qx/U7qCBQAAAABJRU5ErkJggg==);';
      1 < this.defaultColorSchemes.length && (p.appendChild(aa), p.appendChild(fa));
      mxEvent.addListener(fa, 'click', mxUtils.bind(this, function() {
        Y(mxUtils.mod(this.format.currentScheme + 1, this.defaultColorSchemes.length));
      }));
      B(aa);
      B(fa);
      ea(this.defaultColorSchemes[this.format.currentScheme]);
      10 >= this.defaultColorSchemes.length && p.appendChild(T);
      return p;
    };
  }
  Graph.fontMapping = {
    'https://fonts.googleapis.com/css?family=Architects+Daughter': '@font-face { font-family: "Architects Daughter"; src: url(' + STYLE_PATH + '/fonts/ArchitectsDaughter-Regular.ttf) format("truetype"); }'
  };
  Graph.customFontElements = {};
  Graph.recentCustomFonts = {};
  Graph.isGoogleFontUrl = function(p) {
    return p.substring(0, Editor.GOOGLE_FONTS.length) == Editor.GOOGLE_FONTS;
  };
  Graph.isCssFontUrl = function(p) {
    return Graph.isGoogleFontUrl(p);
  };
  Graph.createFontElement = function(p, B) {
    var N = Graph.fontMapping[B];
    null == N && Graph.isCssFontUrl(B) ? (p = document.createElement('link'), p.setAttribute('rel', 'stylesheet'), p.setAttribute('type', 'text/css'), p.setAttribute('charset', 'UTF-8'), p.setAttribute('href', B)) : (null == N && (N = '@font-face {\nfont-family: "' + p + '";\nsrc: url("' + B + '");\n}'), p = document.createElement('style'), mxUtils.write(p, N));
    return p;
  };
  Graph.addFont = function(p, B, N) {
    if (null != p && 0 < p.length && null != B && 0 < B.length) {
      var S = p.toLowerCase();
      if ('helvetica' != S && 'arial' != p && 'sans-serif' != S) {
        var R = Graph.customFontElements[S];
        null != R && R.url != B && (R.elt.parentNode.removeChild(R.elt), R = null);
        null == R ? (R = B, 'http:' == B.substring(0, 5) && (R = PROXY_URL + '?url=' + encodeURIComponent(B)), R = {
          name: p,
          url: B,
          elt: Graph.createFontElement(p, R)
        }, Graph.customFontElements[S] = R, Graph.recentCustomFonts[S] = R, B = document.getElementsByTagName('head')[0], null != N && ('link' == R.elt.nodeName.toLowerCase() ? (R.elt.onload = N, R.elt.onerror = N) : N()), null != B && B.appendChild(R.elt)) : null != N && N();
      } else
        null != N && N();
    } else
      null != N && N();
    return p;
  };
  Graph.getFontUrl = function(p, B) {
    p = Graph.customFontElements[p.toLowerCase()];
    null != p && (B = p.url);
    return B;
  };
  Graph.processFontAttributes = function(p) {
    p = p.getElementsByTagName('*');
    for (var B = 0; B < p.length; B++) {
      var N = p[B].getAttribute('data-font-src');
      if (null != N) {
        var S = 'FONT' == p[B].nodeName ? p[B].getAttribute('face') : p[B].style.fontFamily;
        null != S && Graph.addFont(S, N);
      }
    }
  };
  Graph.processFontStyle = function(p) {
    if (null != p) {
      var B = mxUtils.getValue(p, 'fontSource', null);
      if (null != B) {
        var N = mxUtils.getValue(p, mxConstants.STYLE_FONTFAMILY, null);
        null != N && Graph.addFont(N, decodeURIComponent(B));
      }
    }
    return p;
  };
  Graph.prototype.defaultThemeName = 'default-style2';
  Graph.prototype.lastPasteXml = null;
  Graph.prototype.pasteCounter = 0;
  Graph.prototype.defaultScrollbars = '0' != urlParams.sb;
  Graph.prototype.defaultPageVisible = '0' != urlParams.pv;
  Graph.prototype.shadowId = 'dropShadow';
  Graph.prototype.svgShadowColor = '#3D4574';
  Graph.prototype.svgShadowOpacity = '0.4';
  Graph.prototype.svgShadowBlur = '1.7';
  Graph.prototype.svgShadowSize = '3';
  Graph.prototype.edgeMode = 'move' != urlParams.edge;
  Graph.prototype.hiddenTags = null;
  Graph.prototype.defaultMathEnabled = !1;
  var g = Graph.prototype.init;
  Graph.prototype.init = function() {
    function p(R) {
      B = R;
    }
    g.apply(this, arguments);
    this.hiddenTags = [];
    window.mxFreehand && (this.freehand = new mxFreehand(this));
    var B = null;
    mxEvent.addListener(this.container, 'mouseenter', p);
    mxEvent.addListener(this.container, 'mousemove', p);
    mxEvent.addListener(this.container, 'mouseleave', function(R) {
      B = null;
    });
    this.isMouseInsertPoint = function() {
      return null != B;
    };
    var N = this.getInsertPoint;
    this.getInsertPoint = function() {
      return null != B ? this.getPointForEvent(B) : N.apply(this, arguments);
    };
    var S = this.layoutManager.getLayout;
    this.layoutManager.getLayout = function(R) {
      var V = this.graph.getCellStyle(R);
      if (null != V && 'rack' == V.childLayout) {
        var T = new mxStackLayout(this.graph, !1);
        T.gridSize = null != V.rackUnitSize ? parseFloat(V.rackUnitSize) : 'undefined' !== typeof mxRackContainer ? mxRackContainer.unitSize : 20;
        T.marginLeft = V.marginLeft || 0;
        T.marginRight = V.marginRight || 0;
        T.marginTop = V.marginTop || 0;
        T.marginBottom = V.marginBottom || 0;
        T.allowGaps = V.allowGaps || 0;
        T.horizontal = '1' == mxUtils.getValue(V, 'horizontalRack', '0');
        T.resizeParent = !1;
        T.fill = !0;
        return T;
      }
      return S.apply(this, arguments);
    };
    this.updateGlobalUrlVariables();
  };
  var n = Graph.prototype.postProcessCellStyle;
  Graph.prototype.postProcessCellStyle = function(p, B) {
    return Graph.processFontStyle(n.apply(this, arguments));
  };
  var v = mxSvgCanvas2D.prototype.updateTextNodes;
  mxSvgCanvas2D.prototype.updateTextNodes = function(p, B, N, S, R, V, T, U, X, Z, Y) {
    v.apply(this, arguments);
    Graph.processFontAttributes(Y);
  };
  var u = mxText.prototype.redraw;
  mxText.prototype.redraw = function() {
    u.apply(this, arguments);
    null != this.node && 'DIV' == this.node.nodeName && Graph.processFontAttributes(this.node);
  };
  Graph.prototype.createTagsDialog = function(p, B, N) {
    function S() {
      for (var da = T.getSelectionCells(), ba = [], na = 0; na < da.length; na++)
        T.isCellVisible(da[na]) && ba.push(da[na]);
      T.setSelectionCells(ba);
    }

    function R(da) {
      T.setHiddenTags(da ? [] : U.slice());
      S();
      T.refresh();
    }

    function V(da, ba) {
      Z.innerText = '';
      if (0 < da.length) {
        var na = document.createElement('table');
        na.setAttribute('cellpadding', '2');
        na.style.boxSizing = 'border-box';
        na.style.tableLayout = 'fixed';
        na.style.width = '100%';
        var ia = document.createElement('tbody');
        if (null != da && 0 < da.length)
          for (var qa = 0; qa < da.length; qa++)
            (function(Aa) {
              var va = 0 > mxUtils.indexOf(T.hiddenTags, Aa),
                ja = document.createElement('tr'),
                Ga = document.createElement('td');
              Ga.style.align = 'center';
              Ga.style.width = '16px';
              var Da = document.createElement('img');
              Da.setAttribute('src', va ? Editor.visibleImage : Editor.hiddenImage);
              Da.setAttribute('title', mxResources.get(va ? 'hideIt' : 'show', [Aa]));
              mxUtils.setOpacity(Da, va ? 75 : 25);
              Da.style.verticalAlign = 'middle';
              Da.style.cursor = 'pointer';
              Da.style.width = '16px';
              if (B || Editor.isDarkMode())
                Da.style.filter = 'invert(100%)';
              Ga.appendChild(Da);
              mxEvent.addListener(Da, 'click', function(Ka) {
                mxEvent.isShiftDown(Ka) ? R(0 <= mxUtils.indexOf(T.hiddenTags, Aa)) : (T.toggleHiddenTag(Aa), S(), T.refresh());
                mxEvent.consume(Ka);
              });
              ja.appendChild(Ga);
              Ga = document.createElement('td');
              Ga.style.overflow = 'hidden';
              Ga.style.whiteSpace = 'nowrap';
              Ga.style.textOverflow = 'ellipsis';
              Ga.style.verticalAlign = 'middle';
              Ga.style.cursor = 'pointer';
              Ga.setAttribute('title', Aa);
              a = document.createElement('a');
              mxUtils.write(a, Aa);
              a.style.textOverflow = 'ellipsis';
              a.style.position = 'relative';
              mxUtils.setOpacity(a, va ? 100 : 40);
              Ga.appendChild(a);
              mxEvent.addListener(Ga, 'click', function(Ka) {
                if (mxEvent.isShiftDown(Ka)) {
                  R(!0);
                  var ha = T.getCellsForTags([Aa], null, null, !0);
                  T.isEnabled() ? T.setSelectionCells(ha) : T.highlightCells(ha);
                } else if (va && 0 < T.hiddenTags.length)
                  R(!0);
                else {
                  ha = U.slice();
                  var ra = mxUtils.indexOf(ha, Aa);
                  ha.splice(ra, 1);
                  T.setHiddenTags(ha);
                  S();
                  T.refresh();
                }
                mxEvent.consume(Ka);
              });
              ja.appendChild(Ga);
              if (T.isEnabled()) {
                Ga = document.createElement('td');
                Ga.style.verticalAlign = 'middle';
                Ga.style.textAlign = 'center';
                Ga.style.width = '18px';
                if (null == ba) {
                  Ga.style.align = 'center';
                  Ga.style.width = '16px';
                  Da = document.createElement('img');
                  Da.setAttribute('src', Editor.crossImage);
                  Da.setAttribute('title', mxResources.get('removeIt', [Aa]));
                  mxUtils.setOpacity(Da, va ? 75 : 25);
                  Da.style.verticalAlign = 'middle';
                  Da.style.cursor = 'pointer';
                  Da.style.width = '16px';
                  if (B || Editor.isDarkMode())
                    Da.style.filter = 'invert(100%)';
                  mxEvent.addListener(Da, 'click', function(Ka) {
                    var ha = mxUtils.indexOf(U, Aa);
                    0 <= ha && U.splice(ha, 1);
                    T.removeTagsForCells(T.model.getDescendants(T.model.getRoot()), [Aa]);
                    T.refresh();
                    mxEvent.consume(Ka);
                  });
                  Ga.appendChild(Da);
                } else {
                  var Ca = document.createElement('input');
                  Ca.setAttribute('type', 'checkbox');
                  Ca.style.margin = '0px';
                  Ca.defaultChecked = null != ba && 0 <= mxUtils.indexOf(ba, Aa);
                  Ca.checked = Ca.defaultChecked;
                  Ca.style.background = 'transparent';
                  Ca.setAttribute('title', mxResources.get(Ca.defaultChecked ? 'removeIt' : 'add', [Aa]));
                  mxEvent.addListener(Ca, 'change', function(Ka) {
                    Ca.checked ? T.addTagsForCells(T.getSelectionCells(), [Aa]) : T.removeTagsForCells(T.getSelectionCells(), [Aa]);
                    mxEvent.consume(Ka);
                  });
                  Ga.appendChild(Ca);
                }
                ja.appendChild(Ga);
              }
              ia.appendChild(ja);
            }(da[qa]));
        na.appendChild(ia);
        Z.appendChild(na);
      }
    }
    var T = this,
      U = T.hiddenTags.slice(),
      X = document.createElement('div');
    X.style.userSelect = 'none';
    X.style.overflow = 'hidden';
    X.style.padding = '10px';
    X.style.height = '100%';
    var Z = document.createElement('div');
    Z.style.boxSizing = 'border-box';
    Z.style.borderRadius = '4px';
    Z.style.userSelect = 'none';
    Z.style.overflow = 'auto';
    Z.style.position = 'absolute';
    Z.style.left = '10px';
    Z.style.right = '10px';
    Z.style.top = '10px';
    Z.style.border = T.isEnabled() ? '1px solid #808080' : 'none';
    Z.style.bottom = T.isEnabled() ? '48px' : '10px';
    X.appendChild(Z);
    var Y = mxUtils.button(mxResources.get('reset'), function(da) {
      T.setHiddenTags([]);
      mxEvent.isShiftDown(da) || (U = T.hiddenTags.slice());
      S();
      T.refresh();
    });
    Y.setAttribute('title', mxResources.get('reset'));
    Y.className = 'geBtn';
    Y.style.margin = '0 4px 0 0';
    var ea = mxUtils.button(mxResources.get('add'), function() {
      null != N && N(U, function(da) {
        U = da;
        aa();
      });
    });
    ea.setAttribute('title', mxResources.get('add'));
    ea.className = 'geBtn';
    ea.style.margin = '0';
    T.addListener(mxEvent.ROOT, function() {
      U = T.hiddenTags.slice();
    });
    var aa = mxUtils.bind(this, function(da, ba) {
      if (p()) {
        da = T.getAllTags();
        for (ba = 0; ba < da.length; ba++)
          0 > mxUtils.indexOf(U, da[ba]) && U.push(da[ba]);
        U.sort();
        T.isSelectionEmpty() ? V(U) : V(U, T.getCommonTagsForCells(T.getSelectionCells()));
      }
    });
    T.selectionModel.addListener(mxEvent.CHANGE, aa);
    T.model.addListener(mxEvent.CHANGE, aa);
    T.addListener(mxEvent.REFRESH, aa);
    var fa = document.createElement('div');
    fa.style.boxSizing = 'border-box';
    fa.style.whiteSpace = 'nowrap';
    fa.style.position = 'absolute';
    fa.style.overflow = 'hidden';
    fa.style.bottom = '0px';
    fa.style.height = '42px';
    fa.style.right = '10px';
    fa.style.left = '10px';
    T.isEnabled() && (fa.appendChild(Y), fa.appendChild(ea), X.appendChild(fa));
    return {
      div: X,
      refresh: aa
    };
  };
  Graph.prototype.getCustomFonts = function() {
    var p = this.extFonts;
    p = null != p ? p.slice() : [];
    for (var B in Graph.customFontElements) {
      var N = Graph.customFontElements[B];
      p.push({
        name: N.name,
        url: N.url
      });
    }
    return p;
  };
  Graph.prototype.setFont = function(p, B) {
    Graph.addFont(p, B);
    document.execCommand('fontname', !1, p);
    if (null != B) {
      var N = this.cellEditor.textarea.getElementsByTagName('font');
      B = Graph.getFontUrl(p, B);
      for (var S = 0; S < N.length; S++)
        N[S].getAttribute('face') == p && N[S].getAttribute('data-font-src') != B && N[S].setAttribute('data-font-src', B);
    }
  };
  var x = Graph.prototype.isFastZoomEnabled;
  Graph.prototype.isFastZoomEnabled = function() {
    return x.apply(this, arguments) && (!this.shadowVisible || !mxClient.IS_SF);
  };
  Graph.prototype.updateGlobalUrlVariables = function() {
    this.globalVars = Editor.globalVars;
    if (null != urlParams.vars)
      try {
        this.globalVars = null != this.globalVars ? mxUtils.clone(this.globalVars) : {};
        var p = JSON.parse(decodeURIComponent(urlParams.vars));
        if (null != p)
          for (var B in p)
            this.globalVars[B] = p[B];
      } catch (N) {
        null != window.console && console.log('Error in vars URL parameter: ' + N);
      }
  };
  Graph.prototype.getExportVariables = function() {
    return null != this.globalVars ? mxUtils.clone(this.globalVars) : {};
  };
  var C = Graph.prototype.getGlobalVariable;
  Graph.prototype.getGlobalVariable = function(p) {
    var B = C.apply(this, arguments);
    null == B && null != this.globalVars && (B = this.globalVars[p]);
    return B;
  };
  Graph.prototype.getDefaultStylesheet = function() {
    if (null == this.defaultStylesheet) {
      var p = this.themes['default-style2'];
      this.defaultStylesheet = new mxCodec(p.ownerDocument).decode(p);
    }
    return this.defaultStylesheet;
  };
  Graph.prototype.isViewer = function() {
    return urlParams.viewer;
  };
  var F = Graph.prototype.getSvg;
  Graph.prototype.getSvg = function(p, B, N, S, R, V, T, U, X, Z, Y, ea, aa, fa) {
    var da = null,
      ba = null,
      na = null;
    ea || null == this.themes || 'darkTheme' != this.defaultThemeName || (da = this.stylesheet, ba = this.shapeForegroundColor, na = this.shapeBackgroundColor, this.shapeForegroundColor = 'darkTheme' == this.defaultThemeName ? '#000000' : Editor.lightColor, this.shapeBackgroundColor = 'darkTheme' == this.defaultThemeName ? '#ffffff' : Editor.darkColor, this.stylesheet = this.getDefaultStylesheet(), this.refresh());
    var ia = F.apply(this, arguments),
      qa = this.getCustomFonts();
    if (Y && 0 < qa.length) {
      var Aa = ia.ownerDocument;
      var va = null != Aa.createElementNS ? Aa.createElementNS(mxConstants.NS_SVG, 'style') : Aa.createElement('style');
      null != Aa.setAttributeNS ? va.setAttributeNS('type', 'text/css') : va.setAttribute('type', 'text/css');
      for (var ja = '', Ga = '', Da = 0; Da < qa.length; Da++) {
        var Ca = qa[Da].name,
          Ka = qa[Da].url;
        Graph.isCssFontUrl(Ka) ? ja += '@import url(' + Ka + ');\n' : Ga += '@font-face {\nfont-family: "' + Ca + '";\nsrc: url("' + Ka + '");\n}\n';
      }
      va.appendChild(Aa.createTextNode(ja + Ga));
      ia.getElementsByTagName('defs')[0].appendChild(va);
    }
    this.mathEnabled && (document.body.appendChild(ia), Editor.MathJaxRender(ia), ia.parentNode.removeChild(ia));
    null != da && (this.shapeBackgroundColor = na, this.shapeForegroundColor = ba, this.stylesheet = da, this.refresh());
    return ia;
  };
  var L = mxCellRenderer.prototype.destroy;
  mxCellRenderer.prototype.destroy = function(p) {
    L.apply(this, arguments);
    null != p.secondLabel && (p.secondLabel.destroy(), p.secondLabel = null);
  };
  mxCellRenderer.prototype.getShapesForState = function(p) {
    return [
      p.shape,
      p.text,
      p.secondLabel,
      p.control
    ];
  };
  var l = mxGraphView.prototype.resetValidationState;
  mxGraphView.prototype.resetValidationState = function() {
    l.apply(this, arguments);
    this.enumerationState = 0;
  };
  var q = mxGraphView.prototype.stateValidated;
  mxGraphView.prototype.stateValidated = function(p) {
    null != p.shape && this.redrawEnumerationState(p);
    return q.apply(this, arguments);
  };
  mxGraphView.prototype.createEnumerationValue = function(p) {
    p = decodeURIComponent(mxUtils.getValue(p.style, 'enumerateValue', ''));
    '' == p && (p = ++this.enumerationState);
    return '<div style="padding:2px;border:1px solid gray;background:yellow;border-radius:2px;">' + mxUtils.htmlEntities(p) + '</div>';
  };
  mxGraphView.prototype.redrawEnumerationState = function(p) {
    var B = '1' == mxUtils.getValue(p.style, 'enumerate', 0);
    B && null == p.secondLabel ? (p.secondLabel = new mxText('', new mxRectangle(), mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM), p.secondLabel.size = 12, p.secondLabel.state = p, p.secondLabel.dialect = mxConstants.DIALECT_STRICTHTML, this.graph.cellRenderer.initializeLabel(p, p.secondLabel)) : B || null == p.secondLabel || (p.secondLabel.destroy(), p.secondLabel = null);
    B = p.secondLabel;
    if (null != B) {
      var N = p.view.scale,
        S = this.createEnumerationValue(p);
      p = this.graph.model.isVertex(p.cell) ? new mxRectangle(p.x + p.width - 4 * N, p.y + 4 * N, 0, 0) : mxRectangle.fromPoint(p.view.getPoint(p));
      B.bounds.equals(p) && B.value == S && B.scale == N || (B.bounds = p, B.value = S, B.scale = N, B.redraw());
    }
  };
  var A = mxGraphView.prototype.validateBackgroundPage;
  mxGraphView.prototype.validateBackgroundPage = function() {
    A.apply(this, arguments);
    if (mxClient.IS_GC && null != this.getDrawPane()) {
      var p = this.getDrawPane().parentNode;
      !this.graph.mathEnabled || mxClient.NO_FO || null != this.webKitForceRepaintNode && null != this.webKitForceRepaintNode.parentNode || 'svg' != this.graph.container.firstChild.nodeName ? null == this.webKitForceRepaintNode || this.graph.mathEnabled && ('svg' == this.graph.container.firstChild.nodeName || this.graph.container.firstChild == this.webKitForceRepaintNode) || (null != this.webKitForceRepaintNode.parentNode && this.webKitForceRepaintNode.parentNode.removeChild(this.webKitForceRepaintNode), this.webKitForceRepaintNode = null) : (this.webKitForceRepaintNode = document.createElement('div'), this.webKitForceRepaintNode.style.cssText = 'position:absolute;', p.ownerSVGElement.parentNode.insertBefore(this.webKitForceRepaintNode, p.ownerSVGElement));
    }
  };
  var H = Graph.prototype.refresh;
  Graph.prototype.refresh = function() {
    H.apply(this, arguments);
    this.refreshBackgroundImage();
  };
  Graph.prototype.refreshBackgroundImage = function() {
    null != this.backgroundImage && null != this.backgroundImage.originalSrc && (this.setBackgroundImage(this.backgroundImage), this.view.validateBackgroundImage());
  };
  var K = Graph.prototype.loadStylesheet;
  Graph.prototype.loadStylesheet = function() {
    K.apply(this, arguments);
    this.currentStyle = 'default-style2';
  };
  Graph.prototype.handleCustomLink = function(p) {
    'data:action/json,' == p.substring(0, 17) && (p = JSON.parse(p.substring(17)), null != p.actions && this.executeCustomActions(p.actions));
  };
  Graph.prototype.executeCustomActions = function(p, B) {
    if (this.executingCustomActions)
      this.stoppingCustomActions = !0, null != this.pendingWaitThread && window.clearTimeout(this.pendingWaitThread), null != this.pendingExecuteNextAction && this.pendingExecuteNextAction(), this.fireEvent(new mxEventObject('stopExecutingCustomActions'));
    else {
      this.executingCustomActions = !0;
      var N = !1,
        S = 0,
        R = 0,
        V = mxUtils.bind(this, function() {
          N || (N = !0, this.model.beginUpdate());
        }),
        T = mxUtils.bind(this, function() {
          N && (N = !1, this.model.endUpdate());
        }),
        U = mxUtils.bind(this, function() {
          0 < S && S--;
          0 == S && X();
        }),
        X = mxUtils.bind(this, function() {
          if (R < p.length) {
            var Z = this.stoppingCustomActions,
              Y = p[R++],
              ea = [];
            if (null != Y.open)
              if (T(), this.isCustomLink(Y.open)) {
                if (!this.customLinkClicked(Y.open))
                  return;
              } else
                this.openLink(Y.open);
            null == Y.wait || Z || (this.pendingExecuteNextAction = mxUtils.bind(this, function() {
              this.pendingWaitThread = this.pendingExecuteNextAction = null;
              U();
            }), S++, this.pendingWaitThread = window.setTimeout(this.pendingExecuteNextAction, '' != Y.wait ? parseInt(Y.wait) : 1000), T());
            null != Y.opacity && null != Y.opacity.value && Graph.setOpacityForNodes(this.getNodesForCells(this.getCellsForAction(Y.opacity, !0)), Y.opacity.value);
            null != Y.fadeIn && (S++, Graph.fadeNodes(this.getNodesForCells(this.getCellsForAction(Y.fadeIn, !0)), 0, 1, U, Z ? 0 : Y.fadeIn.delay));
            null != Y.fadeOut && (S++, Graph.fadeNodes(this.getNodesForCells(this.getCellsForAction(Y.fadeOut, !0)), 1, 0, U, Z ? 0 : Y.fadeOut.delay));
            null != Y.wipeIn && (ea = ea.concat(this.createWipeAnimations(this.getCellsForAction(Y.wipeIn, !0), !0)));
            null != Y.wipeOut && (ea = ea.concat(this.createWipeAnimations(this.getCellsForAction(Y.wipeOut, !0), !1)));
            null != Y.toggle && (V(), this.toggleCells(this.getCellsForAction(Y.toggle, !0)));
            if (null != Y.show) {
              V();
              var aa = this.getCellsForAction(Y.show, !0);
              Graph.setOpacityForNodes(this.getNodesForCells(aa), 1);
              this.setCellsVisible(aa, !0);
            }
            null != Y.hide && (V(), aa = this.getCellsForAction(Y.hide, !0), Graph.setOpacityForNodes(this.getNodesForCells(aa), 0), this.setCellsVisible(aa, !1));
            null != Y.toggleStyle && null != Y.toggleStyle.key && (V(), this.toggleCellStyles(Y.toggleStyle.key, null != Y.toggleStyle.defaultValue ? Y.toggleStyle.defaultValue : '0', this.getCellsForAction(Y.toggleStyle, !0)));
            null != Y.style && null != Y.style.key && (V(), this.setCellStyles(Y.style.key, Y.style.value, this.getCellsForAction(Y.style, !0)));
            aa = [];
            null != Y.select && this.isEnabled() && (aa = this.getCellsForAction(Y.select), this.setSelectionCells(aa));
            null != Y.highlight && (aa = this.getCellsForAction(Y.highlight), this.highlightCells(aa, Y.highlight.color, Y.highlight.duration, Y.highlight.opacity));
            null != Y.scroll && (aa = this.getCellsForAction(Y.scroll));
            null != Y.viewbox && this.fitWindow(Y.viewbox, Y.viewbox.border);
            0 < aa.length && this.scrollCellToVisible(aa[0]);
            if (null != Y.tags) {
              aa = [];
              null != Y.tags.hidden && (aa = aa.concat(Y.tags.hidden));
              if (null != Y.tags.visible)
                for (var fa = this.getAllTags(), da = 0; da < fa.length; da++)
                  0 > mxUtils.indexOf(Y.tags.visible, fa[da]) && 0 > mxUtils.indexOf(aa, fa[da]) && aa.push(fa[da]);
              this.setHiddenTags(aa);
              this.refresh();
            }
            0 < ea.length && (S++, this.executeAnimations(ea, U, Z ? 1 : Y.steps, Z ? 0 : Y.delay));
            0 == S ? X() : T();
          } else
            this.stoppingCustomActions = this.executingCustomActions = !1, T(), null != B && B();
        });
      X();
    }
  };
  Graph.prototype.doUpdateCustomLinksForCell = function(p, B) {
    var N = this.getLinkForCell(B);
    null != N && 'data:action/json,' == N.substring(0, 17) && this.setLinkForCell(B, this.updateCustomLink(p, N));
    if (this.isHtmlLabel(B)) {
      var S = document.createElement('div');
      S.innerHTML = Graph.sanitizeHtml(this.getLabel(B));
      for (var R = S.getElementsByTagName('a'), V = !1, T = 0; T < R.length; T++)
        N = R[T].getAttribute('href'), null != N && 'data:action/json,' == N.substring(0, 17) && (R[T].setAttribute('href', this.updateCustomLink(p, N)), V = !0);
      V && this.labelChanged(B, S.innerHTML);
    }
  };
  Graph.prototype.updateCustomLink = function(p, B) {
    if ('data:action/json,' == B.substring(0, 17))
      try {
        var N = JSON.parse(B.substring(17));
        null != N.actions && (this.updateCustomLinkActions(p, N.actions), B = 'data:action/json,' + JSON.stringify(N));
      } catch (S) {}
    return B;
  };
  Graph.prototype.updateCustomLinkActions = function(p, B) {
    for (var N = 0; N < B.length; N++) {
      var S = B[N],
        R;
      for (R in S)
        this.updateCustomLinkAction(p, S[R], 'cells'), this.updateCustomLinkAction(p, S[R], 'excludeCells');
    }
  };
  Graph.prototype.updateCustomLinkAction = function(p, B, N) {
    if (null != B && null != B[N]) {
      for (var S = [], R = 0; R < B[N].length; R++)
        if ('*' == B[N][R])
          S.push(B[N][R]);
        else {
          var V = p[B[N][R]];
          null != V ? '' != V && S.push(V) : S.push(B[N][R]);
        }
      B[N] = S;
    }
  };
  Graph.prototype.getCellsForAction = function(p, B) {
    B = this.getCellsById(p.cells).concat(this.getCellsForTags(p.tags, null, B));
    if (null != p.excludeCells) {
      for (var N = [], S = 0; S < B.length; S++)
        0 > p.excludeCells.indexOf(B[S].id) && N.push(B[S]);
      B = N;
    }
    return B;
  };
  Graph.prototype.getCellsById = function(p) {
    var B = [];
    if (null != p)
      for (var N = 0; N < p.length; N++)
        if ('*' == p[N]) {
          var S = this.model.getRoot();
          B = B.concat(this.model.filterDescendants(function(V) {
            return V != S;
          }, S));
        } else {
          var R = this.model.getCell(p[N]);
          null != R && B.push(R);
        }
    return B;
  };
  var M = Graph.prototype.isCellVisible;
  Graph.prototype.isCellVisible = function(p) {
    return M.apply(this, arguments) && !this.isAllTagsHidden(this.getTagsForCell(p));
  };
  Graph.prototype.setHiddenTags = function(p) {
    this.hiddenTags = p;
    this.fireEvent(new mxEventObject('hiddenTagsChanged'));
  };
  Graph.prototype.toggleHiddenTag = function(p) {
    var B = mxUtils.indexOf(this.hiddenTags, p);
    0 > B ? this.hiddenTags.push(p) : 0 <= B && this.hiddenTags.splice(B, 1);
    this.fireEvent(new mxEventObject('hiddenTagsChanged'));
  };
  Graph.prototype.isAllTagsHidden = function(p) {
    if (null == p || 0 == p.length || 0 == this.hiddenTags.length)
      return !1;
    p = p.split(' ');
    if (p.length > this.hiddenTags.length)
      return !1;
    for (var B = 0; B < p.length; B++)
      if (0 > mxUtils.indexOf(this.hiddenTags, p[B]))
        return !1;
    return !0;
  };
  Graph.prototype.getCellsForTags = function(p, B, N, S) {
    var R = [];
    if (null != p) {
      B = null != B ? B : this.model.getDescendants(this.model.getRoot());
      for (var V = 0, T = {}, U = 0; U < p.length; U++)
        0 < p[U].length && (T[p[U]] = !0, V++);
      for (U = 0; U < B.length; U++)
        if (N && this.model.getParent(B[U]) == this.model.root || this.model.isVertex(B[U]) || this.model.isEdge(B[U])) {
          var X = this.getTagsForCell(B[U]),
            Z = !1;
          if (0 < X.length && (X = X.split(' '), X.length >= p.length)) {
            for (var Y = Z = 0; Y < X.length && Z < V; Y++)
              null != T[X[Y]] && Z++;
            Z = Z == V;
          }
          Z && (1 != S || this.isCellVisible(B[U])) && R.push(B[U]);
        }
    }
    return R;
  };
  Graph.prototype.getAllTags = function() {
    return this.getTagsForCells(this.model.getDescendants(this.model.getRoot()));
  };
  Graph.prototype.getCommonTagsForCells = function(p) {
    for (var B = null, N = [], S = 0; S < p.length; S++) {
      var R = this.getTagsForCell(p[S]);
      N = [];
      if (0 < R.length) {
        R = R.split(' ');
        for (var V = {}, T = 0; T < R.length; T++)
          if (null == B || null != B[R[T]])
            V[R[T]] = !0, N.push(R[T]);
        B = V;
      } else
        return [];
    }
    return N;
  };
  Graph.prototype.getTagsForCells = function(p) {
    for (var B = [], N = {}, S = 0; S < p.length; S++) {
      var R = this.getTagsForCell(p[S]);
      if (0 < R.length) {
        R = R.split(' ');
        for (var V = 0; V < R.length; V++)
          null == N[R[V]] && (N[R[V]] = !0, B.push(R[V]));
      }
    }
    return B;
  };
  Graph.prototype.getTagsForCell = function(p) {
    return this.getAttributeForCell(p, 'tags', '');
  };
  Graph.prototype.addTagsForCells = function(p, B) {
    if (0 < p.length && 0 < B.length) {
      this.model.beginUpdate();
      try {
        for (var N = 0; N < p.length; N++) {
          for (var S = this.getTagsForCell(p[N]), R = S.split(' '), V = !1, T = 0; T < B.length; T++) {
            var U = mxUtils.trim(B[T]);
            '' != U && 0 > mxUtils.indexOf(R, U) && (S = 0 < S.length ? S + ' ' + U : U, V = !0);
          }
          V && this.setAttributeForCell(p[N], 'tags', S);
        }
      } finally {
        this.model.endUpdate();
      }
    }
  };
  Graph.prototype.removeTagsForCells = function(p, B) {
    if (0 < p.length && 0 < B.length) {
      this.model.beginUpdate();
      try {
        for (var N = 0; N < p.length; N++) {
          var S = this.getTagsForCell(p[N]);
          if (0 < S.length) {
            for (var R = S.split(' '), V = !1, T = 0; T < B.length; T++) {
              var U = mxUtils.indexOf(R, B[T]);
              0 <= U && (R.splice(U, 1), V = !0);
            }
            V && this.setAttributeForCell(p[N], 'tags', R.join(' '));
          }
        }
      } finally {
        this.model.endUpdate();
      }
    }
  };
  Graph.prototype.toggleCells = function(p) {
    this.model.beginUpdate();
    try {
      for (var B = 0; B < p.length; B++)
        this.model.setVisible(p[B], !this.model.isVisible(p[B]));
    } finally {
      this.model.endUpdate();
    }
  };
  Graph.prototype.setCellsVisible = function(p, B) {
    this.model.beginUpdate();
    try {
      for (var N = 0; N < p.length; N++)
        this.model.setVisible(p[N], B);
    } finally {
      this.model.endUpdate();
    }
  };
  Graph.prototype.highlightCells = function(p, B, N, S) {
    for (var R = 0; R < p.length; R++)
      this.highlightCell(p[R], B, N, S);
  };
  Graph.prototype.highlightCell = function(p, B, N, S, R) {
    B = null != B ? B : mxConstants.DEFAULT_VALID_COLOR;
    N = null != N ? N : 1000;
    p = this.view.getState(p);
    var V = null;
    null != p && (R = null != R ? R : 4, R = Math.max(R + 1, mxUtils.getValue(p.style, mxConstants.STYLE_STROKEWIDTH, 1) + R), V = new mxCellHighlight(this, B, R, !1), null != S && (V.opacity = S), V.highlight(p), window.setTimeout(function() {
      null != V.shape && (mxUtils.setPrefixedStyle(V.shape.node.style, 'transition', 'all 1200ms ease-in-out'), V.shape.node.style.opacity = 0);
      window.setTimeout(function() {
        V.destroy();
      }, 1200);
    }, N));
    return V;
  };
  Graph.prototype.addSvgShadow = function(p, B, N, S) {
    N = null != N ? N : !1;
    S = null != S ? S : !0;
    var R = p.ownerDocument,
      V = null != R.createElementNS ? R.createElementNS(mxConstants.NS_SVG, 'filter') : R.createElement('filter');
    V.setAttribute('id', this.shadowId);
    var T = null != R.createElementNS ? R.createElementNS(mxConstants.NS_SVG, 'feGaussianBlur') : R.createElement('feGaussianBlur');
    T.setAttribute('in', 'SourceAlpha');
    T.setAttribute('stdDeviation', this.svgShadowBlur);
    T.setAttribute('result', 'blur');
    V.appendChild(T);
    T = null != R.createElementNS ? R.createElementNS(mxConstants.NS_SVG, 'feOffset') : R.createElement('feOffset');
    T.setAttribute('in', 'blur');
    T.setAttribute('dx', this.svgShadowSize);
    T.setAttribute('dy', this.svgShadowSize);
    T.setAttribute('result', 'offsetBlur');
    V.appendChild(T);
    T = null != R.createElementNS ? R.createElementNS(mxConstants.NS_SVG, 'feFlood') : R.createElement('feFlood');
    T.setAttribute('flood-color', this.svgShadowColor);
    T.setAttribute('flood-opacity', this.svgShadowOpacity);
    T.setAttribute('result', 'offsetColor');
    V.appendChild(T);
    T = null != R.createElementNS ? R.createElementNS(mxConstants.NS_SVG, 'feComposite') : R.createElement('feComposite');
    T.setAttribute('in', 'offsetColor');
    T.setAttribute('in2', 'offsetBlur');
    T.setAttribute('operator', 'in');
    T.setAttribute('result', 'offsetBlur');
    V.appendChild(T);
    T = null != R.createElementNS ? R.createElementNS(mxConstants.NS_SVG, 'feBlend') : R.createElement('feBlend');
    T.setAttribute('in', 'SourceGraphic');
    T.setAttribute('in2', 'offsetBlur');
    V.appendChild(T);
    T = p.getElementsByTagName('defs');
    0 == T.length ? (R = null != R.createElementNS ? R.createElementNS(mxConstants.NS_SVG, 'defs') : R.createElement('defs'), null != p.firstChild ? p.insertBefore(R, p.firstChild) : p.appendChild(R)) : R = T[0];
    R.appendChild(V);
    N || (B = null != B ? B : p.getElementsByTagName('g')[0], null != B && (B.setAttribute('filter', 'url(#' + this.shadowId + ')'), !isNaN(parseInt(p.getAttribute('width'))) && S && (p.setAttribute('width', parseInt(p.getAttribute('width')) + 6), p.setAttribute('height', parseInt(p.getAttribute('height')) + 6), B = p.getAttribute('viewBox'), null != B && 0 < B.length && (B = B.split(' '), 3 < B.length && (w = parseFloat(B[2]) + 6, h = parseFloat(B[3]) + 6, p.setAttribute('viewBox', B[0] + ' ' + B[1] + ' ' + w + ' ' + h))))));
    return V;
  };
  Graph.prototype.setShadowVisible = function(p, B) {
    mxClient.IS_SVG && !mxClient.IS_SF && (B = null != B ? B : !0, (this.shadowVisible = p) ? this.view.getDrawPane().setAttribute('filter', 'url(#' + this.shadowId + ')') : this.view.getDrawPane().removeAttribute('filter'), B && this.fireEvent(new mxEventObject('shadowVisibleChanged')));
  };
  Graph.prototype.selectUnlockedLayer = function() {
    if (null == this.defaultParent) {
      var p = this.model.getChildCount(this.model.root),
        B = 0;
      do
        var N = this.model.getChildAt(this.model.root, B);
      while (B++ < p && '1' == mxUtils.getValue(this.getCellStyle(N), 'locked', '0'));
      null != N && this.setDefaultParent(N);
    }
  };
  mxStencilRegistry.libraries.mockup = [SHAPES_PATH + '/mockup/mxMockupButtons.js'];
  mxStencilRegistry.libraries.arrows2 = [SHAPES_PATH + '/mxArrows.js'];
  mxStencilRegistry.libraries.atlassian = [
    STENCIL_PATH + '/atlassian.xml',
    SHAPES_PATH + '/mxAtlassian.js'
  ];
  mxStencilRegistry.libraries.bpmn = [
    SHAPES_PATH + '/mxBasic.js',
    STENCIL_PATH + '/bpmn.xml',
    SHAPES_PATH + '/bpmn/mxBpmnShape2.js'
  ];
  mxStencilRegistry.libraries.bpmn2 = [
    SHAPES_PATH + '/mxBasic.js',
    STENCIL_PATH + '/bpmn.xml',
    SHAPES_PATH + '/bpmn/mxBpmnShape2.js'
  ];
  mxStencilRegistry.libraries.c4 = [SHAPES_PATH + '/mxC4.js'];
  mxStencilRegistry.libraries.cisco19 = [
    SHAPES_PATH + '/mxCisco19.js',
    STENCIL_PATH + '/cisco19.xml'
  ];
  mxStencilRegistry.libraries.cisco_safe = [
    SHAPES_PATH + '/mxCiscoSafe.js',
    STENCIL_PATH + '/cisco_safe/architecture.xml',
    STENCIL_PATH + '/cisco_safe/business_icons.xml',
    STENCIL_PATH + '/cisco_safe/capability.xml',
    STENCIL_PATH + '/cisco_safe/design.xml',
    STENCIL_PATH + '/cisco_safe/iot_things_icons.xml',
    STENCIL_PATH + '/cisco_safe/people_places_things_icons.xml',
    STENCIL_PATH + '/cisco_safe/security_icons.xml',
    STENCIL_PATH + '/cisco_safe/technology_icons.xml',
    STENCIL_PATH + '/cisco_safe/threat.xml'
  ];
  mxStencilRegistry.libraries.dfd = [SHAPES_PATH + '/mxDFD.js'];
  mxStencilRegistry.libraries.er = [SHAPES_PATH + '/er/mxER.js'];
  mxStencilRegistry.libraries.kubernetes = [
    SHAPES_PATH + '/mxKubernetes.js',
    STENCIL_PATH + '/kubernetes.xml'
  ];
  mxStencilRegistry.libraries.flowchart = [
    SHAPES_PATH + '/mxFlowchart.js',
    STENCIL_PATH + '/flowchart.xml'
  ];
  mxStencilRegistry.libraries.ios = [SHAPES_PATH + '/mockup/mxMockupiOS.js'];
  mxStencilRegistry.libraries.rackGeneral = [
    SHAPES_PATH + '/rack/mxRack.js',
    STENCIL_PATH + '/rack/general.xml'
  ];
  mxStencilRegistry.libraries.rackF5 = [STENCIL_PATH + '/rack/f5.xml'];
  mxStencilRegistry.libraries.lean_mapping = [
    SHAPES_PATH + '/mxLeanMap.js',
    STENCIL_PATH + '/lean_mapping.xml'
  ];
  mxStencilRegistry.libraries.basic = [
    SHAPES_PATH + '/mxBasic.js',
    STENCIL_PATH + '/basic.xml'
  ];
  mxStencilRegistry.libraries.ios7icons = [STENCIL_PATH + '/ios7/icons.xml'];
  mxStencilRegistry.libraries.ios7ui = [
    SHAPES_PATH + '/ios7/mxIOS7Ui.js',
    STENCIL_PATH + '/ios7/misc.xml'
  ];
  mxStencilRegistry.libraries.android = [
    SHAPES_PATH + '/mxAndroid.js',
    STENCIL_PATH + '/android/android.xml'
  ];
  mxStencilRegistry.libraries['electrical/abstract'] = [
    SHAPES_PATH + '/mxElectrical.js',
    STENCIL_PATH + '/electrical/abstract.xml'
  ];
  mxStencilRegistry.libraries['electrical/logic_gates'] = [
    SHAPES_PATH + '/mxElectrical.js',
    STENCIL_PATH + '/electrical/logic_gates.xml'
  ];
  mxStencilRegistry.libraries['electrical/miscellaneous'] = [
    SHAPES_PATH + '/mxElectrical.js',
    STENCIL_PATH + '/electrical/miscellaneous.xml'
  ];
  mxStencilRegistry.libraries['electrical/signal_sources'] = [
    SHAPES_PATH + '/mxElectrical.js',
    STENCIL_PATH + '/electrical/signal_sources.xml'
  ];
  mxStencilRegistry.libraries['electrical/electro-mechanical'] = [
    SHAPES_PATH + '/mxElectrical.js',
    STENCIL_PATH + '/electrical/electro-mechanical.xml'
  ];
  mxStencilRegistry.libraries['electrical/transmission'] = [
    SHAPES_PATH + '/mxElectrical.js',
    STENCIL_PATH + '/electrical/transmission.xml'
  ];
  mxStencilRegistry.libraries.infographic = [SHAPES_PATH + '/mxInfographic.js'];
  mxStencilRegistry.libraries['mockup/buttons'] = [SHAPES_PATH + '/mockup/mxMockupButtons.js'];
  mxStencilRegistry.libraries['mockup/containers'] = [SHAPES_PATH + '/mockup/mxMockupContainers.js'];
  mxStencilRegistry.libraries['mockup/forms'] = [SHAPES_PATH + '/mockup/mxMockupForms.js'];
  mxStencilRegistry.libraries['mockup/graphics'] = [
    SHAPES_PATH + '/mockup/mxMockupGraphics.js',
    STENCIL_PATH + '/mockup/misc.xml'
  ];
  mxStencilRegistry.libraries['mockup/markup'] = [SHAPES_PATH + '/mockup/mxMockupMarkup.js'];
  mxStencilRegistry.libraries['mockup/misc'] = [
    SHAPES_PATH + '/mockup/mxMockupMisc.js',
    STENCIL_PATH + '/mockup/misc.xml'
  ];
  mxStencilRegistry.libraries['mockup/navigation'] = [
    SHAPES_PATH + '/mockup/mxMockupNavigation.js',
    STENCIL_PATH + '/mockup/misc.xml'
  ];
  mxStencilRegistry.libraries['mockup/text'] = [SHAPES_PATH + '/mockup/mxMockupText.js'];
  mxStencilRegistry.libraries.floorplan = [
    SHAPES_PATH + '/mxFloorplan.js',
    STENCIL_PATH + '/floorplan.xml'
  ];
  mxStencilRegistry.libraries.bootstrap = [
    SHAPES_PATH + '/mxBootstrap.js',
    SHAPES_PATH + '/mxBasic.js',
    STENCIL_PATH + '/bootstrap.xml'
  ];
  mxStencilRegistry.libraries.gmdl = [
    SHAPES_PATH + '/mxGmdl.js',
    STENCIL_PATH + '/gmdl.xml'
  ];
  mxStencilRegistry.libraries.gcp2 = [
    SHAPES_PATH + '/mxGCP2.js',
    STENCIL_PATH + '/gcp2.xml'
  ];
  mxStencilRegistry.libraries.ibm = [
    SHAPES_PATH + '/mxIBM.js',
    STENCIL_PATH + '/ibm.xml'
  ];
  mxStencilRegistry.libraries.cabinets = [
    SHAPES_PATH + '/mxCabinets.js',
    STENCIL_PATH + '/cabinets.xml'
  ];
  mxStencilRegistry.libraries.archimate = [SHAPES_PATH + '/mxArchiMate.js'];
  mxStencilRegistry.libraries.archimate3 = [SHAPES_PATH + '/mxArchiMate3.js'];
  mxStencilRegistry.libraries.sysml = [SHAPES_PATH + '/mxSysML.js'];
  mxStencilRegistry.libraries.eip = [
    SHAPES_PATH + '/mxEip.js',
    STENCIL_PATH + '/eip.xml'
  ];
  mxStencilRegistry.libraries.networks = [
    SHAPES_PATH + '/mxNetworks.js',
    STENCIL_PATH + '/networks.xml'
  ];
  mxStencilRegistry.libraries.aws3d = [
    SHAPES_PATH + '/mxAWS3D.js',
    STENCIL_PATH + '/aws3d.xml'
  ];
  mxStencilRegistry.libraries.aws4 = [
    SHAPES_PATH + '/mxAWS4.js',
    STENCIL_PATH + '/aws4.xml'
  ];
  mxStencilRegistry.libraries.aws4b = [
    SHAPES_PATH + '/mxAWS4.js',
    STENCIL_PATH + '/aws4.xml'
  ];
  mxStencilRegistry.libraries.uml25 = [SHAPES_PATH + '/mxUML25.js'];
  mxStencilRegistry.libraries.veeam = [
    STENCIL_PATH + '/veeam/2d.xml',
    STENCIL_PATH + '/veeam/3d.xml',
    STENCIL_PATH + '/veeam/veeam.xml'
  ];
  mxStencilRegistry.libraries.veeam2 = [
    STENCIL_PATH + '/veeam/2d.xml',
    STENCIL_PATH + '/veeam/3d.xml',
    STENCIL_PATH + '/veeam/veeam2.xml'
  ];
  mxStencilRegistry.libraries.pid2inst = [SHAPES_PATH + '/pid2/mxPidInstruments.js'];
  mxStencilRegistry.libraries.pid2misc = [
    SHAPES_PATH + '/pid2/mxPidMisc.js',
    STENCIL_PATH + '/pid/misc.xml'
  ];
  mxStencilRegistry.libraries.pid2valves = [SHAPES_PATH + '/pid2/mxPidValves.js'];
  mxStencilRegistry.libraries.pidFlowSensors = [STENCIL_PATH + '/pid/flow_sensors.xml'];
  mxMarker.getPackageForType = function(p) {
    var B = null;
    null != p && 0 < p.length && ('ER' == p.substring(0, 2) ? B = 'mxgraph.er' : 'sysML' == p.substring(0, 5) && (B = 'mxgraph.sysml'));
    return B;
  };
  var I = mxMarker.createMarker;
  mxMarker.createMarker = function(p, B, N, S, R, V, T, U, X, Z) {
    if (null != N && null == mxMarker.markers[N]) {
      var Y = this.getPackageForType(N);
      null != Y && mxStencilRegistry.getStencil(Y);
    }
    return I.apply(this, arguments);
  };
  var Q = mxStencil.prototype.drawShape;
  mxStencil.prototype.drawShape = function(p, B, N, S, R, V) {
    '1' == mxUtils.getValue(B.style, 'lineShape', null) && p.setFillColor(mxUtils.getValue(B.style, mxConstants.STYLE_STROKECOLOR, this.stroke));
    return Q.apply(this, arguments);
  };
  PrintDialog.prototype.create = function(p, B) {
    function N() {
      aa.value = Math.max(1, Math.min(U, Math.max(parseInt(aa.value), parseInt(ea.value))));
      ea.value = Math.max(1, Math.min(U, Math.min(parseInt(aa.value), parseInt(ea.value))));
    }

    function S(ka) {
      function xa(Ja, Oa, Pa) {
        var Ra = Ja.useCssTransforms,
          Ma = Ja.currentTranslate,
          Ua = Ja.currentScale,
          Xa = Ja.view.translate,
          Ha = Ja.view.scale;
        Ja.useCssTransforms && (Ja.useCssTransforms = !1, Ja.currentTranslate = new mxPoint(0, 0), Ja.currentScale = 1, Ja.view.translate = new mxPoint(0, 0), Ja.view.scale = 1);
        var Na = Ja.getGraphBounds(),
          Ta = 0,
          Wa = 0,
          Va = La.get(),
          $a = 1 / Ja.pageScale,
          Za = ia.checked;
        if (Za) {
          $a = parseInt(ra.value);
          var fb = parseInt(ua.value);
          $a = Math.min(Va.height * fb / (Na.height / Ja.view.scale), Va.width * $a / (Na.width / Ja.view.scale));
        } else
          $a = parseInt(na.value) / (100 * Ja.pageScale), isNaN($a) && (ta = 1 / Ja.pageScale, na.value = '100 %');
        Va = mxRectangle.fromRectangle(Va);
        Va.width = Math.ceil(Va.width * ta);
        Va.height = Math.ceil(Va.height * ta);
        $a *= ta;
        !Za && Ja.pageVisible ? (Na = Ja.getPageLayout(), Ta -= Na.x * Va.width, Wa -= Na.y * Va.height) : Za = !0;
        if (null == Oa) {
          Oa = PrintDialog.createPrintPreview(Ja, $a, Va, 0, Ta, Wa, Za);
          Oa.pageSelector = !1;
          Oa.mathEnabled = !1;
          fa.checked && (Oa.isCellVisible = function(Ya) {
            return Ja.isCellSelected(Ya);
          });
          Ta = p.getCurrentFile();
          null != Ta && (Oa.title = Ta.getTitle());
          var gb = Oa.writeHead;
          Oa.writeHead = function(Ya) {
            gb.apply(this, arguments);
            mxClient.IS_GC && (Ya.writeln('<style type="text/css">'), Ya.writeln('@media print {'), Ya.writeln('.MathJax svg { shape-rendering: crispEdges; }'), Ya.writeln('}'), Ya.writeln('</style>'));
            null != p.editor.fontCss && (Ya.writeln('<style type="text/css">'), Ya.writeln(p.editor.fontCss), Ya.writeln('</style>'));
            for (var bb = Ja.getCustomFonts(), ab = 0; ab < bb.length; ab++) {
              var db = bb[ab].name,
                cb = bb[ab].url;
              Graph.isCssFontUrl(cb) ? Ya.writeln('<link rel="stylesheet" href="' + mxUtils.htmlEntities(cb) + '" charset="UTF-8" type="text/css">') : (Ya.writeln('<style type="text/css">'), Ya.writeln('@font-face {\nfont-family: "' + mxUtils.htmlEntities(db) + '";\nsrc: url("' + mxUtils.htmlEntities(cb) + '");\n}'), Ya.writeln('</style>'));
            }
          };
          if ('undefined' !== typeof MathJax) {
            var hb = Oa.renderPage;
            Oa.renderPage = function(Ya, bb, ab, db, cb, jb) {
              var ib = mxClient.NO_FO,
                eb = hb.apply(this, arguments);
              mxClient.NO_FO = ib;
              this.graph.mathEnabled ? this.mathEnabled = this.mathEnabled || !0 : eb.className = 'geDisableMathJax';
              return eb;
            };
          }
          Ta = null;
          Wa = R.shapeForegroundColor;
          Za = R.shapeBackgroundColor;
          Va = R.enableFlowAnimation;
          R.enableFlowAnimation = !1;
          null != R.themes && 'darkTheme' == R.defaultThemeName && (Ta = R.stylesheet, R.stylesheet = R.getDefaultStylesheet(), R.shapeForegroundColor = '#000000', R.shapeBackgroundColor = '#ffffff', R.refresh());
          Oa.open(null, null, Pa, !0);
          R.enableFlowAnimation = Va;
          null != Ta && (R.shapeForegroundColor = Wa, R.shapeBackgroundColor = Za, R.stylesheet = Ta, R.refresh());
        } else {
          Va = Ja.background;
          if (null == Va || '' == Va || Va == mxConstants.NONE)
            Va = '#ffffff';
          Oa.backgroundColor = Va;
          Oa.autoOrigin = Za;
          Oa.appendGraph(Ja, $a, Ta, Wa, Pa, !0);
          Pa = Ja.getCustomFonts();
          if (null != Oa.wnd)
            for (Ta = 0; Ta < Pa.length; Ta++)
              Wa = Pa[Ta].name, Za = Pa[Ta].url, Graph.isCssFontUrl(Za) ? Oa.wnd.document.writeln('<link rel="stylesheet" href="' + mxUtils.htmlEntities(Za) + '" charset="UTF-8" type="text/css">') : (Oa.wnd.document.writeln('<style type="text/css">'), Oa.wnd.document.writeln('@font-face {\nfont-family: "' + mxUtils.htmlEntities(Wa) + '";\nsrc: url("' + mxUtils.htmlEntities(Za) + '");\n}'), Oa.wnd.document.writeln('</style>'));
        }
        Ra && (Ja.useCssTransforms = Ra, Ja.currentTranslate = Ma, Ja.currentScale = Ua, Ja.view.translate = Xa, Ja.view.scale = Ha);
        return Oa;
      }
      var ta = parseInt(Ia.value) / 100;
      isNaN(ta) && (ta = 1, Ia.value = '100 %');
      mxClient.IS_SF && (ta *= 0.75);
      var oa = null,
        sa = R.shapeForegroundColor,
        za = R.shapeBackgroundColor;
      null != R.themes && 'darkTheme' == R.defaultThemeName && (oa = R.stylesheet, R.stylesheet = R.getDefaultStylesheet(), R.shapeForegroundColor = '#000000', R.shapeBackgroundColor = '#ffffff', R.refresh());
      var ca = ea.value,
        ma = aa.value,
        pa = !Z.checked,
        wa = null;
      if (EditorUi.isElectronApp)
        PrintDialog.electronPrint(p, Z.checked, ca, ma, ia.checked, ra.value, ua.value, parseInt(na.value) / 100, parseInt(Ia.value) / 100, La.get());
      else {
        pa && (pa = fa.checked || ca == X && ma == X);
        if (!pa && null != p.pages && p.pages.length) {
          var Fa = 0;
          pa = p.pages.length - 1;
          Z.checked || (Fa = parseInt(ca) - 1, pa = parseInt(ma) - 1);
          for (var Ea = Fa; Ea <= pa; Ea++) {
            var ya = p.pages[Ea];
            ca = ya == p.currentPage ? R : null;
            if (null == ca) {
              ca = p.createTemporaryGraph(R.stylesheet);
              ca.shapeForegroundColor = R.shapeForegroundColor;
              ca.shapeBackgroundColor = R.shapeBackgroundColor;
              ma = !0;
              Fa = !1;
              var Ba = null,
                la = null;
              null == ya.viewState && null == ya.root && p.updatePageRoot(ya);
              null != ya.viewState && (ma = ya.viewState.pageVisible, Fa = ya.viewState.mathEnabled, Ba = ya.viewState.background, la = ya.viewState.backgroundImage, ca.extFonts = ya.viewState.extFonts);
              null != la && null != la.originalSrc && (la = p.createImageForPageLink(la.originalSrc, ya));
              ca.background = Ba;
              ca.backgroundImage = null != la ? new mxImage(la.src, la.width, la.height, la.x, la.y) : null;
              ca.pageVisible = ma;
              ca.mathEnabled = Fa;
              var Qa = ca.getGraphBounds;
              ca.getGraphBounds = function() {
                var Ja = Qa.apply(this, arguments),
                  Oa = this.backgroundImage;
                if (null != Oa && null != Oa.width && null != Oa.height) {
                  var Pa = this.view.translate,
                    Ra = this.view.scale;
                  Ja = mxRectangle.fromRectangle(Ja);
                  Ja.add(new mxRectangle((Pa.x + Oa.x) * Ra, (Pa.y + Oa.y) * Ra, Oa.width * Ra, Oa.height * Ra));
                }
                return Ja;
              };
              var Sa = ca.getGlobalVariable;
              ca.getGlobalVariable = function(Ja) {
                return 'page' == Ja ? ya.getName() : 'pagenumber' == Ja ? Ea + 1 : 'pagecount' == Ja ? null != p.pages ? p.pages.length : 1 : Sa.apply(this, arguments);
              };
              document.body.appendChild(ca.container);
              p.updatePageRoot(ya);
              ca.model.setRoot(ya.root);
            }
            wa = xa(ca, wa, Ea != pa);
            ca != R && ca.container.parentNode.removeChild(ca.container);
          }
        } else
          wa = xa(R);
        null == wa ? p.handleError({
          message: mxResources.get('errorUpdatingPreview')
        }) : (wa.mathEnabled && (pa = wa.wnd.document, ka && (wa.wnd.IMMEDIATE_PRINT = !0), pa.writeln('<script type="text/javascript" src="' + DRAWIO_BASE_URL + '/js/math-print.js"></script>')), wa.closeDocument(), !wa.mathEnabled && ka && PrintDialog.printPreview(wa));
        null != oa && (R.shapeForegroundColor = sa, R.shapeBackgroundColor = za, R.stylesheet = oa, R.refresh());
      }
    }
    var R = p.editor.graph,
      V = document.createElement('div'),
      T = document.createElement('h3');
    T.style.width = '100%';
    T.style.textAlign = 'center';
    T.style.marginTop = '0px';
    mxUtils.write(T, B || mxResources.get('print'));
    V.appendChild(T);
    var U = 1,
      X = 1;
    T = document.createElement('div');
    T.style.cssText = 'border-bottom:1px solid lightGray;padding-bottom:12px;margin-bottom:12px;';
    var Z = document.createElement('input');
    Z.style.cssText = 'margin-right:8px;margin-bottom:8px;';
    Z.setAttribute('value', 'all');
    Z.setAttribute('type', 'radio');
    Z.setAttribute('name', 'pages-printdialog');
    T.appendChild(Z);
    B = document.createElement('span');
    mxUtils.write(B, mxResources.get('printAllPages'));
    T.appendChild(B);
    mxUtils.br(T);
    var Y = Z.cloneNode(!0);
    Z.setAttribute('checked', 'checked');
    Y.setAttribute('value', 'range');
    T.appendChild(Y);
    B = document.createElement('span');
    mxUtils.write(B, mxResources.get('pages') + ':');
    T.appendChild(B);
    var ea = document.createElement('input');
    ea.style.cssText = 'margin:0 8px 0 8px;';
    ea.setAttribute('value', '1');
    ea.setAttribute('type', 'number');
    ea.setAttribute('min', '1');
    ea.style.width = '50px';
    T.appendChild(ea);
    B = document.createElement('span');
    mxUtils.write(B, mxResources.get('to'));
    T.appendChild(B);
    var aa = ea.cloneNode(!0);
    T.appendChild(aa);
    mxEvent.addListener(ea, 'focus', function() {
      Y.checked = !0;
    });
    mxEvent.addListener(aa, 'focus', function() {
      Y.checked = !0;
    });
    mxEvent.addListener(ea, 'change', N);
    mxEvent.addListener(aa, 'change', N);
    if (null != p.pages && (U = p.pages.length, null != p.currentPage))
      for (B = 0; B < p.pages.length; B++)
        if (p.currentPage == p.pages[B]) {
          X = B + 1;
          ea.value = X;
          aa.value = X;
          break;
        }
    ea.setAttribute('max', U);
    aa.setAttribute('max', U);
    p.isPagesEnabled() ? 1 < U && (V.appendChild(T), Y.checked = !0) : Y.checked = !0;
    mxUtils.br(T);
    var fa = document.createElement('input');
    fa.setAttribute('value', 'all');
    fa.setAttribute('type', 'radio');
    fa.style.marginRight = '8px';
    R.isSelectionEmpty() && fa.setAttribute('disabled', 'disabled');
    var da = document.createElement('div');
    da.style.marginBottom = '10px';
    1 == U ? (fa.setAttribute('type', 'checkbox'), fa.style.marginBottom = '12px', da.appendChild(fa)) : (fa.setAttribute('name', 'pages-printdialog'), fa.style.marginBottom = '8px', T.appendChild(fa));
    B = document.createElement('span');
    mxUtils.write(B, mxResources.get('selectionOnly'));
    fa.parentNode.appendChild(B);
    1 == U && mxUtils.br(fa.parentNode);
    var ba = document.createElement('input');
    ba.style.marginRight = '8px';
    ba.setAttribute('value', 'adjust');
    ba.setAttribute('type', 'radio');
    ba.setAttribute('name', 'printZoom');
    da.appendChild(ba);
    B = document.createElement('span');
    mxUtils.write(B, mxResources.get('adjustTo'));
    da.appendChild(B);
    var na = document.createElement('input');
    na.style.cssText = 'margin:0 8px 0 8px;';
    na.setAttribute('value', '100 %');
    na.style.width = '50px';
    da.appendChild(na);
    mxEvent.addListener(na, 'focus', function() {
      ba.checked = !0;
    });
    V.appendChild(da);
    T = T.cloneNode(!1);
    var ia = ba.cloneNode(!0);
    ia.setAttribute('value', 'fit');
    ba.setAttribute('checked', 'checked');
    B = document.createElement('div');
    B.style.cssText = 'display:inline-block;vertical-align:top;padding-top:2px;';
    B.appendChild(ia);
    T.appendChild(B);
    da = document.createElement('table');
    da.style.display = 'inline-block';
    var qa = document.createElement('tbody'),
      Aa = document.createElement('tr'),
      va = Aa.cloneNode(!0),
      ja = document.createElement('td'),
      Ga = ja.cloneNode(!0),
      Da = ja.cloneNode(!0),
      Ca = ja.cloneNode(!0),
      Ka = ja.cloneNode(!0),
      ha = ja.cloneNode(!0);
    ja.style.textAlign = 'right';
    Ca.style.textAlign = 'right';
    mxUtils.write(ja, mxResources.get('fitTo'));
    var ra = document.createElement('input');
    ra.style.cssText = 'margin:0 8px 0 8px;';
    ra.setAttribute('value', '1');
    ra.setAttribute('min', '1');
    ra.setAttribute('type', 'number');
    ra.style.width = '40px';
    Ga.appendChild(ra);
    B = document.createElement('span');
    mxUtils.write(B, mxResources.get('fitToSheetsAcross'));
    Da.appendChild(B);
    mxUtils.write(Ca, mxResources.get('fitToBy'));
    var ua = ra.cloneNode(!0);
    Ka.appendChild(ua);
    mxEvent.addListener(ra, 'focus', function() {
      ia.checked = !0;
    });
    mxEvent.addListener(ua, 'focus', function() {
      ia.checked = !0;
    });
    B = document.createElement('span');
    mxUtils.write(B, mxResources.get('fitToSheetsDown'));
    ha.appendChild(B);
    Aa.appendChild(ja);
    Aa.appendChild(Ga);
    Aa.appendChild(Da);
    va.appendChild(Ca);
    va.appendChild(Ka);
    va.appendChild(ha);
    qa.appendChild(Aa);
    qa.appendChild(va);
    da.appendChild(qa);
    T.appendChild(da);
    V.appendChild(T);
    T = document.createElement('div');
    B = document.createElement('div');
    B.style.fontWeight = 'bold';
    B.style.marginBottom = '12px';
    mxUtils.write(B, mxResources.get('paperSize'));
    T.appendChild(B);
    B = document.createElement('div');
    B.style.marginBottom = '12px';
    var La = PageSetupDialog.addPageFormatPanel(B, 'printdialog', p.editor.graph.pageFormat || mxConstants.PAGE_FORMAT_A4_PORTRAIT);
    T.appendChild(B);
    B = document.createElement('span');
    mxUtils.write(B, mxResources.get('pageScale'));
    T.appendChild(B);
    var Ia = document.createElement('input');
    Ia.style.cssText = 'margin:0 8px 0 8px;';
    Ia.setAttribute('value', '100 %');
    Ia.style.width = '60px';
    T.appendChild(Ia);
    V.appendChild(T);
    B = document.createElement('div');
    B.style.cssText = 'text-align:right;margin:48px 0 0 0;';
    T = mxUtils.button(mxResources.get('cancel'), function() {
      p.hideDialog();
    });
    T.className = 'geBtn';
    p.editor.cancelFirst && B.appendChild(T);
    p.isOffline() || (da = mxUtils.button(mxResources.get('help'), function() {
      R.openLink('https://www.diagrams.net/doc/faq/print-diagram');
    }), da.className = 'geBtn', B.appendChild(da));
    PrintDialog.previewEnabled && (da = mxUtils.button(mxResources.get('preview'), function() {
      p.hideDialog();
      S(!1);
    }), da.className = 'geBtn', B.appendChild(da));
    da = mxUtils.button(mxResources.get(PrintDialog.previewEnabled ? 'print' : 'ok'), function() {
      p.hideDialog();
      S(!0);
    });
    da.className = 'geBtn gePrimaryBtn';
    B.appendChild(da);
    p.editor.cancelFirst || B.appendChild(T);
    V.appendChild(B);
    this.container = V;
  };
  var P = ChangePageSetup.prototype.execute;
  ChangePageSetup.prototype.execute = function() {
    null == this.page && (this.page = this.ui.currentPage);
    if (this.page != this.ui.currentPage) {
      if (null != this.page.viewState) {
        this.ignoreColor || (this.page.viewState.background = this.color);
        if (!this.ignoreImage) {
          var p = this.image;
          null != p && null != p.src && Graph.isPageLink(p.src) && (p = {
            originalSrc: p.src
          });
          this.page.viewState.backgroundImage = p;
        }
        null != this.format && (this.page.viewState.pageFormat = this.format);
        null != this.mathEnabled && (this.page.viewState.mathEnabled = this.mathEnabled);
        null != this.shadowVisible && (this.page.viewState.shadowVisible = this.shadowVisible);
      }
    } else
      P.apply(this, arguments), null != this.mathEnabled && this.mathEnabled != this.ui.isMathEnabled() && (this.ui.setMathEnabled(this.mathEnabled), this.mathEnabled = !this.mathEnabled), null != this.shadowVisible && this.shadowVisible != this.ui.editor.graph.shadowVisible && (this.ui.editor.graph.setShadowVisible(this.shadowVisible), this.shadowVisible = !this.shadowVisible);
  };
  Editor.prototype.useCanvasForExport = !1;
  try {
    var O = document.createElement('canvas'),
      W = new Image();
    W.onload = function() {
      try {
        O.getContext('2d').drawImage(W, 0, 0);
        var p = O.toDataURL('image/png');
        Editor.prototype.useCanvasForExport = null != p && 6 < p.length;
      } catch (B) {}
    };
    W.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1px" height="1px" version="1.1"><foreignObject pointer-events="all" width="1" height="1"><div xmlns="http://www.w3.org/1999/xhtml"></div></foreignObject></svg>')));
  } catch (p) {}
  Editor.prototype.useCanvasForExport = !1;
}());
(function() {
  var b = new mxObjectCodec(new ChangePageSetup(), [
    'ui',
    'previousColor',
    'previousImage',
    'previousFormat'
  ]);
  b.beforeDecode = function(e, f, c) {
    c.ui = e.ui;
    return f;
  };
  b.afterDecode = function(e, f, c) {
    c.previousColor = c.color;
    c.previousImage = c.image;
    c.previousFormat = c.format;
    null != c.foldingEnabled && (c.foldingEnabled = !c.foldingEnabled);
    null != c.mathEnabled && (c.mathEnabled = !c.mathEnabled);
    null != c.shadowVisible && (c.shadowVisible = !c.shadowVisible);
    return c;
  };
  mxCodecRegistry.register(b);
}());
(function() {
  var b = new mxObjectCodec(new ChangeGridColor(), ['ui']);
  b.beforeDecode = function(e, f, c) {
    c.ui = e.ui;
    return f;
  };
  mxCodecRegistry.register(b);
}());
(function() {
  EditorUi.VERSION = '20.7.4';
  EditorUi.compactUi = 'atlas' != Editor.currentTheme;
  Editor.isDarkMode() && (mxGraphView.prototype.gridColor = mxGraphView.prototype.defaultDarkGridColor);
  EditorUi.enableLogging = '1' != urlParams.stealth && '1' != urlParams.lockdown && (/.*\.draw\.io$/.test(window.location.hostname) || /.*\.diagrams\.net$/.test(window.location.hostname)) && 'support.draw.io' != window.location.hostname;
  EditorUi.drawHost = window.DRAWIO_BASE_URL;
  EditorUi.lightboxHost = window.DRAWIO_LIGHTBOX_URL;
  EditorUi.lastErrorMessage = null;
  EditorUi.ignoredAnonymizedChars = '\n\t`~!@#$%^&*()_+{}|:"<>?-=[];\'./,\n\t';
  EditorUi.templateFile = TEMPLATE_PATH + '/index.xml';
  EditorUi.cacheUrl = window.REALTIME_URL;
  null == EditorUi.cacheUrl && 'undefined' !== typeof DrawioFile && (DrawioFile.SYNC = 'none');
  Editor.cacheTimeout = 10000;
  EditorUi.enablePlantUml = EditorUi.enableLogging;
  EditorUi.isElectronApp = null != window && null != window.process && null != window.process.versions && null != window.process.versions.electron;
  EditorUi.nativeFileSupport = !mxClient.IS_OP && !EditorUi.isElectronApp && '1' != urlParams.extAuth && 'showSaveFilePicker' in window && 'showOpenFilePicker' in window;
  EditorUi.enableDrafts = !mxClient.IS_CHROMEAPP && isLocalStorage && '0' != urlParams.drafts;
  EditorUi.scratchpadHelpLink = 'https://www.diagrams.net/doc/faq/scratchpad';
  EditorUi.enableHtmlEditOption = !0;
  EditorUi.defaultMermaidConfig = {
    theme: 'neutral',
    arrowMarkerAbsolute: !1,
    flowchart: {
      htmlLabels: !1
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: !0,
      bottomMarginAdj: 1,
      useMaxWidth: !0,
      rightAngles: !1,
      showSequenceNumbers: !1
    },
    gantt: {
      titleTopMargin: 25,
      barHeight: 20,
      barGap: 4,
      topPadding: 50,
      leftPadding: 75,
      gridLineStartPadding: 35,
      fontSize: 11,
      fontFamily: '"Open-Sans", "sans-serif"',
      numberSectionStyles: 4,
      axisFormat: '%Y-%m-%d'
    }
  };
  EditorUi.logError = function(d, g, n, v, u, x, C) {
    x = null != x ? x : 0 <= d.indexOf('NetworkError') || 0 <= d.indexOf('SecurityError') || 0 <= d.indexOf('NS_ERROR_FAILURE') || 0 <= d.indexOf('out of memory') ? 'CONFIG' : 'SEVERE';
    if (EditorUi.enableLogging && '1' != urlParams.dev)
      try {
        if (d != EditorUi.lastErrorMessage && (null == d || null == g || -1 == d.indexOf('Script error') && -1 == d.indexOf('extension:')) && (null == u || null == u.stack || -1 == u.stack.indexOf('extension:')) && null != d && 0 > d.indexOf('DocumentClosedError')) {
          EditorUi.lastErrorMessage = d;
          var F = null != window.DRAWIO_LOG_URL ? window.DRAWIO_LOG_URL : '';
          u = null != u ? u : Error(d);
          new Image().src = F + '/log?severity=' + x + '&v=' + encodeURIComponent(EditorUi.VERSION) + '&msg=clientError:' + encodeURIComponent(d) + ':url:' + encodeURIComponent(window.location.href) + ':lnum:' + encodeURIComponent(n) + (null != v ? ':colno:' + encodeURIComponent(v) : '') + (null != u && null != u.stack ? '&stack=' + encodeURIComponent(u.stack) : '');
        }
      } catch (L) {}
    try {
      C || null == window.console || console.error(x, d, g, n, v, u);
    } catch (L) {}
  };
  EditorUi.logEvent = function(d) {
    if ('1' == urlParams.dev)
      EditorUi.debug('logEvent', d);
    else if (EditorUi.enableLogging)
      try {
        var g = null != window.DRAWIO_LOG_URL ? window.DRAWIO_LOG_URL : '';
        new Image().src = g + '/images/1x1.png?v=' + encodeURIComponent(EditorUi.VERSION) + (null != d ? '&data=' + encodeURIComponent(JSON.stringify(d)) : '');
      } catch (n) {}
  };
  EditorUi.sendReport = function(d, g) {
    if ('1' == urlParams.dev)
      EditorUi.debug('sendReport', d);
    else if (EditorUi.enableLogging)
      try {
        g = null != g ? g : 50000, d.length > g && (d = d.substring(0, g) + '\n...[SHORTENED]'), mxUtils.post('/email', 'version=' + encodeURIComponent(EditorUi.VERSION) + '&url=' + encodeURIComponent(window.location.href) + '&data=' + encodeURIComponent(d));
      } catch (n) {}
  };
  EditorUi.debug = function() {
    try {
      if (null != window.console && '1' == urlParams.test) {
        for (var d = [new Date().toISOString()], g = 0; g < arguments.length; g++)
          d.push(arguments[g]);
        console.log.apply(console, d);
      }
    } catch (n) {}
  };
  EditorUi.removeChildNodes = function(d) {
    for (; null != d.firstChild;)
      d.removeChild(d.firstChild);
  };
  EditorUi.prototype.emptyDiagramXml = '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>';
  EditorUi.prototype.emptyLibraryXml = '<mxlibrary>[]</mxlibrary>';
  EditorUi.prototype.mode = null;
  EditorUi.prototype.timeout = Editor.prototype.timeout;
  EditorUi.prototype.defaultCustomShapeStyle = 'shape=stencil(tZRtTsQgEEBPw1+DJR7AoN6DbWftpAgE0Ortd/jYRGq72R+YNE2YgTePloEJGWblgA18ZuKFDcMj5/Sm8boZq+BgjCX4pTyqk6ZlKROitwusOMXKQDODx5iy4pXxZ5qTHiFHawxB0JrQZH7lCabQ0Fr+XWC1/E8zcsT/gAi+Subo2/3Mh6d/oJb5nU1b5tW7r2knautaa3T+U32o7f7vZwpJkaNDLORJjcu7t59m2jXxqX9un+tt022acsfmoKaQZ+vhhswZtS6Ne/ThQGt0IV0N3Yyv6P3CeT9/tHO0XFI5cAE=);whiteSpace=wrap;html=1;';
  EditorUi.prototype.maxBackgroundSize = 1600;
  EditorUi.prototype.maxImageSize = 520;
  EditorUi.prototype.maxTextWidth = 520;
  EditorUi.prototype.resampleThreshold = 100000;
  EditorUi.prototype.maxImageBytes = 1000000;
  EditorUi.prototype.maxBackgroundBytes = 2500000;
  EditorUi.prototype.maxTextBytes = 500000;
  EditorUi.prototype.currentFile = null;
  EditorUi.prototype.printPdfExport = !1;
  EditorUi.prototype.pdfPageExport = !0;
  EditorUi.prototype.formatEnabled = '0' != urlParams.format;
  EditorUi.prototype.insertTemplateEnabled = !0;
  EditorUi.prototype.closableScratchpad = !0;
  EditorUi.prototype.embedExportBorder = 8;
  EditorUi.prototype.embedExportBackground = null;
  EditorUi.prototype.shareCursorPosition = !0;
  EditorUi.prototype.showRemoteCursors = !0;
  (function() {
    EditorUi.prototype.useCanvasForExport = !1;
    EditorUi.prototype.jpgSupported = !1;
    try {
      var d = document.createElement('canvas');
      EditorUi.prototype.canvasSupported = !(!d.getContext || !d.getContext('2d'));
    } catch (u) {}
    try {
      var g = document.createElement('canvas'),
        n = new Image();
      n.onload = function() {
        try {
          g.getContext('2d').drawImage(n, 0, 0);
          var u = g.toDataURL('image/png');
          EditorUi.prototype.useCanvasForExport = null != u && 6 < u.length;
        } catch (x) {}
      };
      n.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1px" height="1px" version="1.1"><foreignObject pointer-events="all" width="1" height="1"><div xmlns="http://www.w3.org/1999/xhtml"></div></foreignObject></svg>')));
    } catch (u) {}
    try {
      g = document.createElement('canvas');
      g.width = g.height = 1;
      var v = g.toDataURL('image/jpeg');
      EditorUi.prototype.jpgSupported = null !== v.match('image/jpeg');
    } catch (u) {}
  }());
  EditorUi.prototype.createButtonContainer = function() {
    var d = document.createElement('div');
    d.className = 'geButtonContainer';
    d.style.overflow = '1' == urlParams.embed ? 'hidden' : '';
    return d;
  };
  EditorUi.prototype.openLink = function(d, g, n) {
    return this.editor.graph.openLink(d, g, n);
  };
  EditorUi.prototype.showSplash = function(d) {};
  EditorUi.prototype.getLocalData = function(d, g) {
    g(localStorage.getItem(d));
  };
  EditorUi.prototype.setLocalData = function(d, g, n) {
    localStorage.setItem(d, g);
    null != n && n();
  };
  EditorUi.prototype.removeLocalData = function(d, g) {
    localStorage.removeItem(d);
    g();
  };
  EditorUi.prototype.setShareCursorPosition = function(d) {
    this.shareCursorPosition = d;
    this.fireEvent(new mxEventObject('shareCursorPositionChanged'));
  };
  EditorUi.prototype.isShareCursorPosition = function() {
    return this.shareCursorPosition;
  };
  EditorUi.prototype.setShowRemoteCursors = function(d) {
    this.showRemoteCursors = d;
    this.fireEvent(new mxEventObject('showRemoteCursorsChanged'));
  };
  EditorUi.prototype.isShowRemoteCursors = function() {
    return this.showRemoteCursors;
  };
  EditorUi.prototype.setMathEnabled = function(d) {
    this.editor.graph.mathEnabled = d;
    this.editor.updateGraphComponents();
    this.editor.graph.refresh();
    this.editor.graph.defaultMathEnabled = d;
    this.fireEvent(new mxEventObject('mathEnabledChanged'));
  };
  EditorUi.prototype.isMathEnabled = function(d) {
    return this.editor.graph.mathEnabled;
  };
  EditorUi.prototype.isStandaloneApp = function() {
    return mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || this.isOfflineApp();
  };
  EditorUi.prototype.isOfflineApp = function() {
    return '1' == urlParams.offline;
  };
  EditorUi.prototype.isOffline = function(d) {
    return this.isOfflineApp() || !navigator.onLine || !d && ('1' == urlParams.stealth || '1' == urlParams.lockdown);
  };
  EditorUi.prototype.isExternalDataComms = function() {
    return '1' != urlParams.offline && !this.isOffline() && !this.isOfflineApp();
  };
  EditorUi.prototype.createSpinner = function(d, g, n) {
    var v = null == d || null == g;
    n = null != n ? n : 24;
    var u = new Spinner({
        lines: 12,
        length: n,
        width: Math.round(n / 3),
        radius: Math.round(n / 2),
        rotate: 0,
        color: Editor.isDarkMode() ? '#c0c0c0' : '#000',
        speed: 1.5,
        trail: 60,
        shadow: !1,
        hwaccel: !1,
        zIndex: 2000000000
      }),
      x = u.spin;
    u.spin = function(F, L) {
      var l = !1;
      this.active || (x.call(this, F), this.active = !0, null != L && (v && (g = Math.max(document.body.clientHeight || 0, document.documentElement.clientHeight || 0) / 2, d = document.body.clientWidth / 2 - 2), l = document.createElement('div'), l.style.position = 'absolute', l.style.whiteSpace = 'nowrap', l.style.background = '#4B4243', l.style.color = 'white', l.style.fontFamily = Editor.defaultHtmlFont, l.style.fontSize = '9pt', l.style.padding = '6px', l.style.paddingLeft = '10px', l.style.paddingRight = '10px', l.style.zIndex = 2000000000, l.style.left = Math.max(0, d) + 'px', l.style.top = Math.max(0, g + 70) + 'px', mxUtils.setPrefixedStyle(l.style, 'borderRadius', '6px'), mxUtils.setPrefixedStyle(l.style, 'transform', 'translate(-50%,-50%)'), Editor.isDarkMode() || mxUtils.setPrefixedStyle(l.style, 'boxShadow', '2px 2px 3px 0px #ddd'), '...' != L.substring(L.length - 3, L.length) && '!' != L.charAt(L.length - 1) && (L += '...'), l.innerHTML = L, F.appendChild(l), u.status = l), this.pause = mxUtils.bind(this, function() {
        var q = function() {};
        this.active && (q = mxUtils.bind(this, function() {
          this.spin(F, L);
        }));
        this.stop();
        return q;
      }), l = !0);
      return l;
    };
    var C = u.stop;
    u.stop = function() {
      C.call(this);
      this.active = !1;
      null != u.status && null != u.status.parentNode && u.status.parentNode.removeChild(u.status);
      u.status = null;
    };
    u.pause = function() {
      return function() {};
    };
    return u;
  };
  EditorUi.prototype.isCompatibleString = function(d) {
    try {
      var g = mxUtils.parseXml(d),
        n = this.editor.extractGraphModel(g.documentElement, !0);
      return null != n && 0 == n.getElementsByTagName('parsererror').length;
    } catch (v) {}
    return !1;
  };
  EditorUi.prototype.isVisioData = function(d) {
    return 8 < d.length && (208 == d.charCodeAt(0) && 207 == d.charCodeAt(1) && 17 == d.charCodeAt(2) && 224 == d.charCodeAt(3) && 161 == d.charCodeAt(4) && 177 == d.charCodeAt(5) && 26 == d.charCodeAt(6) && 225 == d.charCodeAt(7) || 80 == d.charCodeAt(0) && 75 == d.charCodeAt(1) && 3 == d.charCodeAt(2) && 4 == d.charCodeAt(3) || 80 == d.charCodeAt(0) && 75 == d.charCodeAt(1) && 3 == d.charCodeAt(2) && 6 == d.charCodeAt(3));
  };
  EditorUi.prototype.isRemoteVisioData = function(d) {
    return 8 < d.length && (208 == d.charCodeAt(0) && 207 == d.charCodeAt(1) && 17 == d.charCodeAt(2) && 224 == d.charCodeAt(3) && 161 == d.charCodeAt(4) && 177 == d.charCodeAt(5) && 26 == d.charCodeAt(6) && 225 == d.charCodeAt(7) || 60 == d.charCodeAt(0) && 63 == d.charCodeAt(1) && 120 == d.charCodeAt(2) && 109 == d.charCodeAt(3) && 108 == d.charCodeAt(3));
  };
  var b = EditorUi.prototype.createKeyHandler;
  EditorUi.prototype.createKeyHandler = function(d) {
    var g = b.apply(this, arguments);
    if (!this.editor.chromeless || this.editor.editable) {
      var n = g.getFunction,
        v = this.editor.graph,
        u = this;
      g.getFunction = function(x) {
        if (v.isSelectionEmpty() && null != u.pages && 0 < u.pages.length) {
          var C = u.getSelectedPageIndex();
          if (mxEvent.isShiftDown(x)) {
            if (37 == x.keyCode)
              return function() {
                0 < C && u.movePage(C, C - 1);
              };
            if (38 == x.keyCode)
              return function() {
                0 < C && u.movePage(C, 0);
              };
            if (39 == x.keyCode)
              return function() {
                C < u.pages.length - 1 && u.movePage(C, C + 1);
              };
            if (40 == x.keyCode)
              return function() {
                C < u.pages.length - 1 && u.movePage(C, u.pages.length - 1);
              };
          } else if (mxEvent.isControlDown(x) || mxClient.IS_MAC && mxEvent.isMetaDown(x)) {
            if (37 == x.keyCode)
              return function() {
                0 < C && u.selectNextPage(!1);
              };
            if (38 == x.keyCode)
              return function() {
                0 < C && u.selectPage(u.pages[0]);
              };
            if (39 == x.keyCode)
              return function() {
                C < u.pages.length - 1 && u.selectNextPage(!0);
              };
            if (40 == x.keyCode)
              return function() {
                C < u.pages.length - 1 && u.selectPage(u.pages[u.pages.length - 1]);
              };
          }
        }
        return !(65 <= x.keyCode && 90 >= x.keyCode) || v.isSelectionEmpty() || mxEvent.isAltDown(x) || mxEvent.isShiftDown(x) || mxEvent.isControlDown(x) || mxClient.IS_MAC && mxEvent.isMetaDown(x) ? n.apply(this, arguments) : null;
      };
    }
    return g;
  };
  var e = EditorUi.prototype.extractGraphModelFromHtml;
  EditorUi.prototype.extractGraphModelFromHtml = function(d) {
    var g = e.apply(this, arguments);
    if (null == g)
      try {
        var n = d.indexOf('&lt;mxfile ');
        if (0 <= n) {
          var v = d.lastIndexOf('&lt;/mxfile&gt;');
          v > n && (g = d.substring(n, v + 15).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\\&quot;/g, '"').replace(/\n/g, ''));
        } else {
          var u = mxUtils.parseXml(d),
            x = this.editor.extractGraphModel(u.documentElement, null != this.pages || 'hidden' == this.diagramContainer.style.visibility);
          g = null != x ? mxUtils.getXml(x) : '';
        }
      } catch (C) {}
    return g;
  };
  EditorUi.prototype.validateFileData = function(d) {
    if (null != d && 0 < d.length) {
      var g = d.indexOf('<meta charset="utf-8">');
      0 <= g && (d = d.slice(0, g) + '<meta charset="utf-8"/>' + d.slice(g + 23 - 1, d.length));
      d = Graph.zapGremlins(d);
    }
    return d;
  };
  EditorUi.prototype.replaceFileData = function(d) {
    d = this.validateFileData(d);
    d = null != d && 0 < d.length ? mxUtils.parseXml(d).documentElement : null;
    var g = null != d ? this.editor.extractGraphModel(d, !0) : null;
    null != g && (d = g);
    if (null != d) {
      g = this.editor.graph;
      g.model.beginUpdate();
      try {
        var n = null != this.pages ? this.pages.slice() : null,
          v = d.getElementsByTagName('diagram');
        if (1 < v.length || 1 == v.length && v[0].hasAttribute('name')) {
          this.fileNode = d;
          this.pages = null != this.pages ? this.pages : [];
          for (var u = v.length - 1; 0 <= u; u--) {
            var x = this.updatePageRoot(new DiagramPage(v[u]));
            null == x.getName() && x.setName(mxResources.get('pageWithNumber', [u + 1]));
            g.model.execute(new ChangePage(this, x, 0 == u ? x : null, 0));
          }
        } else
          null == this.fileNode && (this.fileNode = d.ownerDocument.createElement('mxfile'), this.currentPage = new DiagramPage(d.ownerDocument.createElement('diagram')), this.currentPage.setName(mxResources.get('pageWithNumber', [1])), g.model.execute(new ChangePage(this, this.currentPage, this.currentPage, 0))), this.editor.setGraphXml(d), null != this.currentPage && (this.currentPage.root = this.editor.graph.model.root, g.model.execute(new ChangePage(this, this.currentPage, this.currentPage, 0)));
        if (null != n)
          for (u = 0; u < n.length; u++)
            g.model.execute(new ChangePage(this, n[u], null));
      } finally {
        g.model.endUpdate();
      }
    }
  };
  EditorUi.prototype.createFileData = function(d, g, n, v, u, x, C, F, L, l, q) {
    g = null != g ? g : this.editor.graph;
    u = null != u ? u : !1;
    L = null != L ? L : !0;
    var A = null;
    if (null == n || n.getMode() == App.MODE_DEVICE || n.getMode() == App.MODE_BROWSER)
      var H = '_blank';
    else
      A = H = v;
    if (null == d)
      return '';
    var K = d;
    if ('mxfile' != K.nodeName.toLowerCase()) {
      if (q) {
        var M = d.ownerDocument.createElement('diagram');
        M.setAttribute('id', Editor.guid());
        M.appendChild(d);
      } else {
        M = Graph.zapGremlins(mxUtils.getXml(d));
        K = Graph.compress(M);
        if (Graph.decompress(K) != M)
          return M;
        M = d.ownerDocument.createElement('diagram');
        M.setAttribute('id', Editor.guid());
        mxUtils.setTextContent(M, K);
      }
      K = d.ownerDocument.createElement('mxfile');
      K.appendChild(M);
    }
    l ? (K = K.cloneNode(!0), K.removeAttribute('modified'), K.removeAttribute('host'), K.removeAttribute('agent'), K.removeAttribute('etag'), K.removeAttribute('userAgent'), K.removeAttribute('version'), K.removeAttribute('editor'), K.removeAttribute('type')) : (K.removeAttribute('userAgent'), K.removeAttribute('version'), K.removeAttribute('editor'), K.removeAttribute('pages'), K.removeAttribute('type'), mxClient.IS_CHROMEAPP ? K.setAttribute('host', 'Chrome') : EditorUi.isElectronApp ? K.setAttribute('host', 'Electron') : K.setAttribute('host', window.location.hostname), K.setAttribute('modified', new Date().toISOString()), K.setAttribute('agent', navigator.appVersion), K.setAttribute('version', EditorUi.VERSION), K.setAttribute('etag', Editor.guid()), d = null != n ? n.getMode() : this.mode, null != d && K.setAttribute('type', d), 1 < K.getElementsByTagName('diagram').length && null != this.pages && K.setAttribute('pages', this.pages.length));
    q = q ? mxUtils.getPrettyXml(K) : mxUtils.getXml(K);
    if (!x && !u && (C || null != n && /(\.html)$/i.test(n.getTitle())))
      q = this.getHtml2(mxUtils.getXml(K), g, null != n ? n.getTitle() : null, H, A);
    else if (x || !u && null != n && /(\.svg)$/i.test(n.getTitle()))
      null == n || n.getMode() != App.MODE_DEVICE && n.getMode() != App.MODE_BROWSER || (v = null), q = this.getEmbeddedSvg(q, g, v, null, F, L, A);
    return q;
  };
  EditorUi.prototype.getXmlFileData = function(d, g, n, v) {
    d = null != d ? d : !0;
    g = null != g ? g : !1;
    n = null != n ? n : !Editor.compressXml;
    var u = this.editor.getGraphXml(d, v);
    if (d && null != this.fileNode && null != this.currentPage)
      if (d = function(L) {
          var l = L.getElementsByTagName('mxGraphModel');
          l = 0 < l.length ? l[0] : null;
          null == l && n ? (l = mxUtils.trim(mxUtils.getTextContent(L)), L = L.cloneNode(!1), 0 < l.length && (l = Graph.decompress(l), null != l && 0 < l.length && L.appendChild(mxUtils.parseXml(l).documentElement))) : null == l || n ? L = L.cloneNode(!0) : (L = L.cloneNode(!1), mxUtils.setTextContent(L, Graph.compressNode(l)));
          u.appendChild(L);
        }, EditorUi.removeChildNodes(this.currentPage.node), mxUtils.setTextContent(this.currentPage.node, Graph.compressNode(u)), u = this.fileNode.cloneNode(!1), g)
        d(this.currentPage.node);
      else
        for (g = 0; g < this.pages.length; g++) {
          var x = this.pages[g],
            C = x.node;
          if (x != this.currentPage)
            if (x.needsUpdate) {
              var F = new mxCodec(mxUtils.createXmlDocument());
              F = F.encode(new mxGraphModel(x.root));
              this.editor.graph.saveViewState(x.viewState, F, null, v);
              EditorUi.removeChildNodes(C);
              mxUtils.setTextContent(C, Graph.compressNode(F));
              delete x.needsUpdate;
            } else
              v && (this.updatePageRoot(x), null != x.viewState.backgroundImage && (null != x.viewState.backgroundImage.originalSrc ? x.viewState.backgroundImage = this.createImageForPageLink(x.viewState.backgroundImage.originalSrc, x) : Graph.isPageLink(x.viewState.backgroundImage.src) && (x.viewState.backgroundImage = this.createImageForPageLink(x.viewState.backgroundImage.src, x))), null != x.viewState.backgroundImage && null != x.viewState.backgroundImage.originalSrc && (F = new mxCodec(mxUtils.createXmlDocument()), F = F.encode(new mxGraphModel(x.root)), this.editor.graph.saveViewState(x.viewState, F, null, v), C = C.cloneNode(!1), mxUtils.setTextContent(C, Graph.compressNode(F))));
          d(C);
        }
    return u;
  };
  EditorUi.prototype.anonymizeString = function(d, g) {
    for (var n = [], v = 0; v < d.length; v++) {
      var u = d.charAt(v);
      0 <= EditorUi.ignoredAnonymizedChars.indexOf(u) ? n.push(u) : isNaN(parseInt(u)) ? u.toLowerCase() != u ? n.push(String.fromCharCode(65 + Math.round(25 * Math.random()))) : u.toUpperCase() != u ? n.push(String.fromCharCode(97 + Math.round(25 * Math.random()))) : /\s/.test(u) ? n.push(' ') : n.push('?') : n.push(g ? '0' : Math.round(9 * Math.random()));
    }
    return n.join('');
  };
  EditorUi.prototype.anonymizePatch = function(d) {
    if (null != d[EditorUi.DIFF_INSERT])
      for (var g = 0; g < d[EditorUi.DIFF_INSERT].length; g++)
        try {
          var n = mxUtils.parseXml(d[EditorUi.DIFF_INSERT][g].data).documentElement.cloneNode(!1);
          null != n.getAttribute('name') && n.setAttribute('name', this.anonymizeString(n.getAttribute('name')));
          d[EditorUi.DIFF_INSERT][g].data = mxUtils.getXml(n);
        } catch (x) {
          d[EditorUi.DIFF_INSERT][g].data = x.message;
        }
    if (null != d[EditorUi.DIFF_UPDATE]) {
      for (var v in d[EditorUi.DIFF_UPDATE]) {
        var u = d[EditorUi.DIFF_UPDATE][v];
        null != u.name && (u.name = this.anonymizeString(u.name));
        null != u.cells && (g = mxUtils.bind(this, function(x) {
          var C = u.cells[x];
          if (null != C) {
            for (var F in C)
              null != C[F].value && (C[F].value = '[' + C[F].value.length + ']'), null != C[F].xmlValue && (C[F].xmlValue = '[' + C[F].xmlValue.length + ']'), null != C[F].style && (C[F].style = '[' + C[F].style.length + ']'), mxUtils.isEmptyObject(C[F]) && delete C[F];
            mxUtils.isEmptyObject(C) && delete u.cells[x];
          }
        }), g(EditorUi.DIFF_INSERT), g(EditorUi.DIFF_UPDATE), mxUtils.isEmptyObject(u.cells) && delete u.cells);
        mxUtils.isEmptyObject(u) && delete d[EditorUi.DIFF_UPDATE][v];
      }
      mxUtils.isEmptyObject(d[EditorUi.DIFF_UPDATE]) && delete d[EditorUi.DIFF_UPDATE];
    }
    return d;
  };
  EditorUi.prototype.anonymizeAttributes = function(d, g) {
    if (null != d.attributes)
      for (var n = 0; n < d.attributes.length; n++)
        'as' != d.attributes[n].name && d.setAttribute(d.attributes[n].name, this.anonymizeString(d.attributes[n].value, g));
    if (null != d.childNodes)
      for (n = 0; n < d.childNodes.length; n++)
        this.anonymizeAttributes(d.childNodes[n], g);
  };
  EditorUi.prototype.anonymizeNode = function(d, g) {
    g = d.getElementsByTagName('mxCell');
    for (var n = 0; n < g.length; n++)
      null != g[n].getAttribute('value') && g[n].setAttribute('value', '[' + g[n].getAttribute('value').length + ']'), null != g[n].getAttribute('xmlValue') && g[n].setAttribute('xmlValue', '[' + g[n].getAttribute('xmlValue').length + ']'), null != g[n].getAttribute('style') && g[n].setAttribute('style', '[' + g[n].getAttribute('style').length + ']'), null != g[n].parentNode && 'root' != g[n].parentNode.nodeName && null != g[n].parentNode.parentNode && (g[n].setAttribute('id', g[n].parentNode.getAttribute('id')), g[n].parentNode.parentNode.replaceChild(g[n], g[n].parentNode));
    return d;
  };
  EditorUi.prototype.synchronizeCurrentFile = function(d) {
    var g = this.getCurrentFile();
    null != g && (g.savingFile ? this.handleError({
      message: mxResources.get('busy')
    }) : !d && g.invalidChecksum ? g.handleFileError(null, !0) : this.spinner.spin(document.body, mxResources.get('updatingDocument')) && (g.clearAutosave(), this.editor.setStatus(''), d ? g.reloadFile(mxUtils.bind(this, function() {
      g.handleFileSuccess('manual' == DrawioFile.SYNC);
    }), mxUtils.bind(this, function(n) {
      g.handleFileError(n, !0);
    })) : g.synchronizeFile(mxUtils.bind(this, function() {
      g.handleFileSuccess('manual' == DrawioFile.SYNC);
    }), mxUtils.bind(this, function(n) {
      g.handleFileError(n, !0);
    }))));
  };
  EditorUi.prototype.getFileData = function(d, g, n, v, u, x, C, F, L, l, q) {
    u = null != u ? u : !0;
    x = null != x ? x : !1;
    var A = this.editor.graph;
    if (g || !d && null != L && /(\.svg)$/i.test(L.getTitle())) {
      var H = null != A.themes && 'darkTheme' == A.defaultThemeName;
      l = !1;
      if (H || null != this.pages && this.currentPage != this.pages[0]) {
        var K = A.getGlobalVariable;
        A = this.createTemporaryGraph(H ? A.getDefaultStylesheet() : A.getStylesheet());
        A.setBackgroundImage = this.editor.graph.setBackgroundImage;
        A.background = this.editor.graph.background;
        var M = null != this.pages ? this.pages[0] : null;
        null == M || this.currentPage == M ? A.setBackgroundImage(this.editor.graph.backgroundImage) : null != M.viewState && null != M.viewState && A.setBackgroundImage(M.viewState.backgroundImage);
        A.getGlobalVariable = function(I) {
          return 'page' == I && null != M ? M.getName() : 'pagenumber' == I ? 1 : K.apply(this, arguments);
        };
        document.body.appendChild(A.container);
        null != M && A.model.setRoot(M.root);
      }
    }
    C = null != C ? C : this.getXmlFileData(u, x, l, q);
    L = null != L ? L : this.getCurrentFile();
    d = this.createFileData(C, A, L, window.location.href, d, g, n, v, u, F, l);
    A != this.editor.graph && A.container.parentNode.removeChild(A.container);
    return d;
  };
  EditorUi.prototype.getHtml = function(d, g, n, v, u, x) {
    x = null != x ? x : !0;
    var C = null,
      F = EditorUi.drawHost + '/js/embed-static.min.js';
    if (null != g) {
      C = x ? g.getGraphBounds() : g.getBoundingBox(g.getSelectionCells());
      var L = g.view.scale;
      x = Math.floor(C.x / L - g.view.translate.x);
      L = Math.floor(C.y / L - g.view.translate.y);
      C = g.background;
      null == u && (g = this.getBasenames().join(';'), 0 < g.length && (F = EditorUi.drawHost + '/embed.js?s=' + g));
      d.setAttribute('x0', x);
      d.setAttribute('y0', L);
    }
    null != d && (d.setAttribute('pan', '1'), d.setAttribute('zoom', '1'), d.setAttribute('resize', '0'), d.setAttribute('fit', '0'), d.setAttribute('border', '20'), d.setAttribute('links', '1'), null != v && d.setAttribute('edit', v));
    null != u && (u = u.replace(/&/g, '&amp;'));
    d = null != d ? Graph.zapGremlins(mxUtils.getXml(d)) : '';
    v = Graph.compress(d);
    Graph.decompress(v) != d && (v = encodeURIComponent(d));
    return (null == u ? '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n' : '') + '<!DOCTYPE html>\n<html' + (null != u ? ' xmlns="http://www.w3.org/1999/xhtml">' : '>') + '\n<head>\n' + (null == u ? null != n ? '<title>' + mxUtils.htmlEntities(n) + '</title>\n' : '' : '<title>diagrams.net</title>\n') + (null != u ? '<meta http-equiv="refresh" content="0;URL=\'' + u + '\'"/>\n' : '') + '</head>\n<body' + (null == u && null != C && C != mxConstants.NONE ? ' style="background-color:' + C + ';">' : '>') + '\n<div class="mxgraph" style="position:relative;overflow:auto;width:100%;">\n<div style="width:1px;height:1px;overflow:hidden;">' + v + '</div>\n</div>\n' + (null == u ? '<script type="text/javascript" src="' + F + '"></script>' : '<a style="position:absolute;top:50%;left:50%;margin-top:-128px;margin-left:-64px;" href="' + u + '" target="_blank"><img border="0" src="' + EditorUi.drawHost + '/images/drawlogo128.png"/></a>') + '\n</body>\n</html>\n';
  };
  EditorUi.prototype.getHtml2 = function(d, g, n, v, u) {
    g = window.DRAWIO_VIEWER_URL || EditorUi.drawHost + '/js/viewer-static.min.js';
    null != u && (u = u.replace(/&/g, '&amp;'));
    d = {
      highlight: '#0000ff',
      nav: this.editor.graph.foldingEnabled,
      resize: !0,
      xml: Graph.zapGremlins(d),
      toolbar: 'pages zoom layers lightbox'
    };
    null != this.pages && null != this.currentPage && (d.page = mxUtils.indexOf(this.pages, this.currentPage));
    return (null == u ? '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n' : '') + '<!DOCTYPE html>\n<html' + (null != u ? ' xmlns="http://www.w3.org/1999/xhtml">' : '>') + '\n<head>\n' + (null == u ? null != n ? '<title>' + mxUtils.htmlEntities(n) + '</title>\n' : '' : '<title>diagrams.net</title>\n') + (null != u ? '<meta http-equiv="refresh" content="0;URL=\'' + u + '\'"/>\n' : '') + '<meta charset="utf-8"/>\n</head>\n<body>\n<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="' + mxUtils.htmlEntities(JSON.stringify(d)) + '"></div>\n' + (null == u ? '<script type="text/javascript" src="' + g + '"></script>' : '<a style="position:absolute;top:50%;left:50%;margin-top:-128px;margin-left:-64px;" href="' + u + '" target="_blank"><img border="0" src="' + EditorUi.drawHost + '/images/drawlogo128.png"/></a>') + '\n</body>\n</html>\n';
  };
  EditorUi.prototype.setFileData = function(d) {
    d = this.validateFileData(d);
    this.pages = this.fileNode = this.currentPage = null;
    var g = null != d && 0 < d.length ? mxUtils.parseXml(d).documentElement : null,
      n = Editor.extractParserError(g, mxResources.get('invalidOrMissingFile'));
    if (n)
      throw EditorUi.debug('EditorUi.setFileData ParserError', [this], 'data', [d], 'node', [g], 'cause', [n]), Error(mxResources.get('notADiagramFile') + ' (' + n + ')');
    d = null != g ? this.editor.extractGraphModel(g, !0) : null;
    null != d && (g = d);
    if (null != g && 'mxfile' == g.nodeName && (d = g.getElementsByTagName('diagram'), 1 < d.length || 1 == d.length && d[0].hasAttribute('name'))) {
      n = null;
      this.fileNode = g;
      this.pages = [];
      for (var v = 0; v < d.length; v++)
        null == d[v].getAttribute('id') && d[v].setAttribute('id', v), g = new DiagramPage(d[v]), null == g.getName() && g.setName(mxResources.get('pageWithNumber', [v + 1])), this.pages.push(g), null != urlParams['page-id'] && g.getId() == urlParams['page-id'] && (n = g);
      this.currentPage = null != n ? n : this.pages[Math.max(0, Math.min(this.pages.length - 1, urlParams.page || 0))];
      g = this.currentPage.node;
    }
    null == this.fileNode && null != g && (this.fileNode = g.ownerDocument.createElement('mxfile'), this.currentPage = new DiagramPage(g.ownerDocument.createElement('diagram')), this.currentPage.setName(mxResources.get('pageWithNumber', [1])), this.pages = [this.currentPage]);
    this.editor.setGraphXml(g);
    null != this.currentPage && (this.currentPage.root = this.editor.graph.model.root);
    if (null != urlParams['layer-ids'])
      try {
        var u = urlParams['layer-ids'].split(' ');
        g = {};
        for (v = 0; v < u.length; v++)
          g[u[v]] = !0;
        var x = this.editor.graph.getModel(),
          C = x.getChildren(x.root);
        for (v = 0; v < C.length; v++) {
          var F = C[v];
          x.setVisible(F, g[F.id] || !1);
        }
      } catch (L) {}
  };
  EditorUi.prototype.getBaseFilename = function(d) {
    var g = this.getCurrentFile();
    g = null != g && null != g.getTitle() ? g.getTitle() : this.defaultFilename;
    if (/(\.xml)$/i.test(g) || /(\.html)$/i.test(g) || /(\.svg)$/i.test(g) || /(\.png)$/i.test(g))
      g = g.substring(0, g.lastIndexOf('.'));
    /(\.drawio)$/i.test(g) && (g = g.substring(0, g.lastIndexOf('.')));
    !d && null != this.pages && 1 < this.pages.length && null != this.currentPage && null != this.currentPage.node.getAttribute('name') && 0 < this.currentPage.getName().length && (g = g + '-' + this.currentPage.getName());
    return g;
  };
  EditorUi.prototype.downloadFile = function(d, g, n, v, u, x, C, F, L, l, q, A) {
    try {
      v = null != v ? v : this.editor.graph.isSelectionEmpty();
      var H = this.getBaseFilename('remoteSvg' == d ? !1 : !u),
        K = H + ('xml' == d || 'pdf' == d && q ? '.drawio' : '') + '.' + d;
      if ('xml' == d) {
        var M = Graph.xmlDeclaration + '\n' + this.getFileData(!0, null, null, null, v, u, null, null, null, g);
        this.saveData(K, d, M, 'text/xml');
      } else if ('html' == d)
        M = this.getHtml2(this.getFileData(!0), this.editor.graph, H), this.saveData(K, d, M, 'text/html');
      else if ('svg' != d && 'xmlsvg' != d || !this.spinner.spin(document.body, mxResources.get('export'))) {
        if ('xmlpng' == d)
          K = H + '.png';
        else if ('jpeg' == d)
          K = H + '.jpg';
        else if ('remoteSvg' == d) {
          K = H + '.svg';
          d = 'svg';
          var I = parseInt(L);
          'string' === typeof F && 0 < F.indexOf('%') && (F = parseInt(F) / 100);
          if (0 < I) {
            var Q = this.editor.graph,
              P = Q.getGraphBounds();
            var O = Math.ceil(P.width * F / Q.view.scale + 2 * I);
            var W = Math.ceil(P.height * F / Q.view.scale + 2 * I);
          }
        }
        this.saveRequest(K, d, mxUtils.bind(this, function(R, V) {
          try {
            var T = this.editor.graph.pageVisible;
            0 == x && (this.editor.graph.pageVisible = x);
            var U = this.createDownloadRequest(R, d, v, V, C, u, F, L, l, q, A, O, W);
            this.editor.graph.pageVisible = T;
            return U;
          } catch (X) {
            this.handleError(X);
          }
        }));
      } else {
        var p = null,
          B = mxUtils.bind(this, function(R) {
            R.length <= MAX_REQUEST_SIZE ? this.saveData(K, 'svg', R, 'image/svg+xml') : this.handleError({
              message: mxResources.get('drawingTooLarge')
            }, mxResources.get('error'), mxUtils.bind(this, function() {
              mxUtils.popup(p);
            }));
          });
        if ('svg' == d) {
          var N = this.editor.graph.background;
          if (C || N == mxConstants.NONE)
            N = null;
          var S = this.editor.graph.getSvg(N, null, null, null, null, v);
          n && this.editor.graph.addSvgShadow(S);
          this.editor.convertImages(S, mxUtils.bind(this, mxUtils.bind(this, function(R) {
            this.spinner.stop();
            B(Graph.xmlDeclaration + '\n' + Graph.svgDoctype + '\n' + mxUtils.getXml(R));
          })));
        } else
          K = H + '.svg', p = this.getFileData(!1, !0, null, mxUtils.bind(this, function(R) {
            this.spinner.stop();
            B(R);
          }), v);
      }
    } catch (R) {
      this.handleError(R);
    }
  };
  EditorUi.prototype.createDownloadRequest = function(d, g, n, v, u, x, C, F, L, l, q, A, H) {
    d = this.downloadRequestBuilder(d, g, n, v, u, x, C, F, L, l, q, A, H);
    g = '';
    for (var K in d)
      n = d[K], null != n && (g += K + '=' + encodeURIComponent(n) + '&');
    return new mxXmlRequest(EXPORT_URL, g);
  };
  EditorUi.prototype.downloadRequestBuilder = function(d, g, n, v, u, x, C, F, L, l, q, A, H) {
    var K = this.editor.graph,
      M = K.getGraphBounds();
    n = this.getFileData(!0, null, null, null, n, 0 == x ? !1 : 'xmlpng' != g, null, null, null, !1, 'pdf' == g);
    var I = null,
      Q = null,
      P = null;
    if (M.width * M.height > MAX_AREA || n.length > MAX_REQUEST_SIZE)
      throw {
        message: mxResources.get('drawingTooLarge')
      };
    l = l ? '1' : '0';
    'pdf' == g && (null != q ? (I = q.from, Q = q.to) : 0 == x && (P = '1'));
    'xmlpng' == g && (l = '1', g = 'png');
    if (('xmlpng' == g || 'svg' == g) && null != this.pages && null != this.currentPage)
      for (x = 0; x < this.pages.length; x++)
        if (this.pages[x] == this.currentPage) {
          I = x;
          break;
        }
    x = K.background;
    'png' != g && 'pdf' != g && 'svg' != g || !u ? u || null != x && x != mxConstants.NONE || (x = '#ffffff') : x = mxConstants.NONE;
    u = {
      globalVars: K.getExportVariables()
    };
    L && (u.grid = {
      size: K.gridSize,
      steps: K.view.gridSteps,
      color: K.view.gridColor
    });
    Graph.translateDiagram && (u.diagramLanguage = Graph.diagramLanguage);
    return {
      format: g,
      from: I,
      to: Q,
      allPages: P,
      bg: null != x ? x : mxConstants.NONE,
      base64: v,
      embedXml: l,
      xml: n,
      filename: null != d ? d : '',
      extras: JSON.stringify(u),
      scale: C,
      border: F,
      w: A && isFinite(A) ? A : null,
      h: H && isFinite(H) ? H : null
    };
  };
  EditorUi.prototype.setMode = function(d, g) {
    this.mode = d;
  };
  EditorUi.prototype.loadDescriptor = function(d, g, n) {
    var v = window.location.hash,
      u = mxUtils.bind(this, function(C) {
        var F = null != d.data ? d.data : '';
        null != C && 0 < C.length && (0 < F.length && (F += '\n'), F += C);
        C = new LocalFile(this, 'csv' != d.format && 0 < F.length ? F : this.emptyDiagramXml, null != urlParams.title ? decodeURIComponent(urlParams.title) : this.defaultFilename, !0);
        C.getHash = function() {
          return v;
        };
        this.fileLoaded(C);
        'csv' == d.format && this.importCsv(F, mxUtils.bind(this, function(H) {
          this.editor.undoManager.clear();
          this.editor.setModified(!1);
          this.editor.setStatus('');
        }));
        if (null != d.update) {
          var L = null != d.interval ? parseInt(d.interval) : 60000,
            l = null,
            q = mxUtils.bind(this, function() {
              var H = this.currentPage;
              mxUtils.post(d.update, 'xml=' + encodeURIComponent(mxUtils.getXml(this.editor.getGraphXml())), mxUtils.bind(this, function(K) {
                H === this.currentPage && (200 <= K.getStatus() && 300 >= K.getStatus() ? (this.updateDiagram(K.getText()), A()) : this.handleError({
                  message: mxResources.get('error') + ' ' + K.getStatus()
                }));
              }), mxUtils.bind(this, function(K) {
                this.handleError(K);
              }));
            }),
            A = mxUtils.bind(this, function() {
              window.clearTimeout(l);
              l = window.setTimeout(q, L);
            });
          this.editor.addListener('pageSelected', mxUtils.bind(this, function() {
            A();
            q();
          }));
          A();
          q();
        }
        null != g && g();
      });
    if (null != d.url && 0 < d.url.length) {
      var x = this.editor.getProxiedUrl(d.url);
      this.editor.loadUrl(x, mxUtils.bind(this, function(C) {
        u(C);
      }), mxUtils.bind(this, function(C) {
        null != n && n(C);
      }));
    } else
      u('');
  };
  EditorUi.prototype.updateDiagram = function(d) {
    function g(W) {
      var p = new mxCellOverlay(W.image || u.warningImage, W.tooltip, W.align, W.valign, W.offset);
      p.addListener(mxEvent.CLICK, function(B, N) {
        v.alert(W.tooltip);
      });
      return p;
    }
    var n = null,
      v = this;
    if (null != d && 0 < d.length && (n = mxUtils.parseXml(d), d = null != n ? n.documentElement : null, null != d && 'updates' == d.nodeName)) {
      var u = this.editor.graph,
        x = u.getModel();
      x.beginUpdate();
      var C = null;
      try {
        for (d = d.firstChild; null != d;) {
          if ('update' == d.nodeName) {
            var F = x.getCell(d.getAttribute('id'));
            if (null != F) {
              try {
                var L = d.getAttribute('value');
                if (null != L) {
                  var l = mxUtils.parseXml(L).documentElement;
                  if (null != l)
                    if ('1' == l.getAttribute('replace-value'))
                      x.setValue(F, l);
                    else
                      for (var q = l.attributes, A = 0; A < q.length; A++)
                        u.setAttributeForCell(F, q[A].nodeName, 0 < q[A].nodeValue.length ? q[A].nodeValue : null);
                }
              } catch (W) {
                null != window.console && console.log('Error in value for ' + F.id + ': ' + W);
              }
              try {
                var H = d.getAttribute('style');
                null != H && u.model.setStyle(F, H);
              } catch (W) {
                null != window.console && console.log('Error in style for ' + F.id + ': ' + W);
              }
              try {
                var K = d.getAttribute('icon');
                if (null != K) {
                  var M = 0 < K.length ? JSON.parse(K) : null;
                  null != M && M.append || u.removeCellOverlays(F);
                  null != M && u.addCellOverlay(F, g(M));
                }
              } catch (W) {
                null != window.console && console.log('Error in icon for ' + F.id + ': ' + W);
              }
              try {
                var I = d.getAttribute('geometry');
                if (null != I) {
                  I = JSON.parse(I);
                  var Q = u.getCellGeometry(F);
                  if (null != Q) {
                    Q = Q.clone();
                    for (key in I) {
                      var P = parseFloat(I[key]);
                      'dx' == key ? Q.x += P : 'dy' == key ? Q.y += P : 'dw' == key ? Q.width += P : 'dh' == key ? Q.height += P : Q[key] = parseFloat(I[key]);
                    }
                    u.model.setGeometry(F, Q);
                  }
                }
              } catch (W) {
                null != window.console && console.log('Error in icon for ' + F.id + ': ' + W);
              }
            }
          } else if ('model' == d.nodeName) {
            for (var O = d.firstChild; null != O && O.nodeType != mxConstants.NODETYPE_ELEMENT;)
              O = O.nextSibling;
            null != O && new mxCodec(d.firstChild).decode(O, x);
          } else if ('view' == d.nodeName) {
            if (d.hasAttribute('scale') && (u.view.scale = parseFloat(d.getAttribute('scale'))), d.hasAttribute('dx') || d.hasAttribute('dy'))
              u.view.translate = new mxPoint(parseFloat(d.getAttribute('dx') || 0), parseFloat(d.getAttribute('dy') || 0));
          } else
            'fit' == d.nodeName && (C = d.hasAttribute('max-scale') ? parseFloat(d.getAttribute('max-scale')) : 1);
          d = d.nextSibling;
        }
      } finally {
        x.endUpdate();
      }
      null != C && this.chromelessResize && this.chromelessResize(!0, C);
    }
    return n;
  };
  EditorUi.prototype.getCopyFilename = function(d, g) {
    var n = null != d && null != d.getTitle() ? d.getTitle() : this.defaultFilename;
    d = '';
    var v = n.lastIndexOf('.');
    0 <= v && (d = n.substring(v), n = n.substring(0, v));
    if (g) {
      g = n;
      var u = new Date();
      n = u.getFullYear();
      v = u.getMonth() + 1;
      var x = u.getDate(),
        C = u.getHours(),
        F = u.getMinutes();
      u = u.getSeconds();
      n = g + (' ' + (n + '-' + v + '-' + x + '-' + C + '-' + F + '-' + u));
    }
    return n = mxResources.get('copyOf', [n]) + d;
  };
  EditorUi.prototype.fileLoaded = function(d, g) {
    var n = this.getCurrentFile();
    this.fileEditable = this.fileLoadedError = null;
    this.setCurrentFile(null);
    var v = !1;
    this.hideDialog();
    null != n && (EditorUi.debug('File.closed', [n]), n.removeListener(this.descriptorChangedListener), n.close());
    this.editor.graph.model.clear();
    this.editor.undoManager.clear();
    var u = mxUtils.bind(this, function() {
      this.setGraphEnabled(!1);
      this.setCurrentFile(null);
      null != n && this.updateDocumentTitle();
      this.editor.graph.model.clear();
      this.editor.undoManager.clear();
      this.setBackgroundImage(null);
      !g && null != window.location.hash && 0 < window.location.hash.length && (window.location.hash = '');
      null != this.fname && (this.fnameWrapper.style.display = 'none', this.fname.innerText = '', this.fname.setAttribute('title', mxResources.get('rename')));
      this.editor.setStatus('');
      this.updateUi();
      g || this.showSplash();
    });
    if (null != d)
      try {
        mxClient.IS_SF && 'min' == uiTheme && (this.diagramContainer.style.visibility = '');
        this.openingFile = !0;
        this.setCurrentFile(d);
        d.addListener('descriptorChanged', this.descriptorChangedListener);
        d.addListener('contentChanged', this.descriptorChangedListener);
        d.open();
        delete this.openingFile;
        this.setGraphEnabled(!0);
        this.setMode(d.getMode());
        this.editor.graph.model.prefix = Editor.guid() + '-';
        this.editor.undoManager.clear();
        this.descriptorChanged();
        this.updateUi();
        d.isEditable() ? d.isModified() ? (d.addUnsavedStatus(), null != d.backupPatch && d.patch([d.backupPatch])) : this.editor.setStatus('') : this.editor.setStatus('<span class="geStatusAlert">' + mxUtils.htmlEntities(mxResources.get('readOnly')) + '</span>');
        !this.editor.isChromelessView() || this.editor.editable ? (this.editor.graph.selectUnlockedLayer(), this.showLayersDialog(), this.restoreLibraries(), window.self !== window.top && window.focus()) : this.editor.graph.isLightboxView() && this.lightboxFit();
        this.chromelessResize && this.chromelessResize();
        this.editor.fireEvent(new mxEventObject('fileLoaded'));
        v = !0;
        if (!this.isOffline() && null != d.getMode()) {
          var x = '1' == urlParams.sketch ? 'sketch' : uiTheme;
          if (null == x)
            x = 'default';
          else if ('sketch' == x || 'min' == x)
            x += Editor.isDarkMode() ? '-dark' : '-light';
          EditorUi.logEvent({
            category: d.getMode().toUpperCase() + '-OPEN-FILE-' + d.getHash(),
            action: 'size_' + d.getSize(),
            label: 'autosave_' + (this.editor.autosave ? 'on' : 'off') + '_theme_' + x
          });
        }
        EditorUi.debug('File.opened', [d]);
        '1' == urlParams.viewerOnlyMsg && this.showAlert(mxResources.get('viewerOnlyMsg'));
        if (this.editor.editable && this.mode == d.getMode() && d.getMode() != App.MODE_DEVICE && null != d.getMode())
          try {
            this.addRecent({
              id: d.getHash(),
              title: d.getTitle(),
              mode: d.getMode()
            });
          } catch (C) {}
        try {
          mxSettings.setOpenCounter(mxSettings.getOpenCounter() + 1), mxSettings.save();
        } catch (C) {}
      } catch (C) {
        this.fileLoadedError = C;
        if (null != d)
          try {
            d.close();
          } catch (F) {}
        if (EditorUi.enableLogging && !this.isOffline())
          try {
            EditorUi.logEvent({
              category: 'ERROR-LOAD-FILE-' + (null != d ? d.getHash() : 'none'),
              action: 'message_' + C.message,
              label: 'stack_' + C.stack
            });
          } catch (F) {}
        d = mxUtils.bind(this, function() {
          null != urlParams.url && this.spinner.spin(document.body, mxResources.get('reconnecting')) ? window.location.search = this.getSearch(['url']) : null != n ? this.fileLoaded(n) || u() : u();
        });
        g ? d() : this.handleError(C, mxResources.get('errorLoadingFile'), d, !0, null, null, !0);
      }
    else
      u();
    return v;
  };
  EditorUi.prototype.getHashValueForPages = function(d, g) {
    var n = 0,
      v = new mxGraphModel(),
      u = new mxCodec();
    null != g && (g.byteCount = 0, g.attrCount = 0, g.eltCount = 0, g.nodeCount = 0);
    for (var x = 0; x < d.length; x++) {
      this.updatePageRoot(d[x]);
      var C = d[x].node.cloneNode(!1);
      C.removeAttribute('name');
      v.root = d[x].root;
      var F = u.encode(v);
      this.editor.graph.saveViewState(d[x].viewState, F, !0);
      F.removeAttribute('pageWidth');
      F.removeAttribute('pageHeight');
      C.appendChild(F);
      null != g && (g.eltCount += C.getElementsByTagName('*').length, g.nodeCount += C.getElementsByTagName('mxCell').length);
      n = (n << 5) - n + this.hashValue(C, function(L, l, q, A) {
        return !A || 'mxGeometry' != L.nodeName && 'mxPoint' != L.nodeName || 'x' != l && 'y' != l && 'width' != l && 'height' != l ? A && 'mxCell' == L.nodeName && 'previous' == l ? null : q : Math.round(q);
      }, g) << 0;
    }
    return n;
  };
  EditorUi.prototype.hashValue = function(d, g, n) {
    var v = 0;
    if (null != d && 'object' === typeof d && 'number' === typeof d.nodeType && 'string' === typeof d.nodeName && 'function' === typeof d.getAttribute) {
      null != d.nodeName && (v ^= this.hashValue(d.nodeName, g, n));
      if (null != d.attributes) {
        null != n && (n.attrCount += d.attributes.length);
        for (var u = 0; u < d.attributes.length; u++) {
          var x = d.attributes[u].name,
            C = null != g ? g(d, x, d.attributes[u].value, !0) : d.attributes[u].value;
          null != C && (v ^= this.hashValue(x, g, n) + this.hashValue(C, g, n));
        }
      }
      if (null != d.childNodes)
        for (u = 0; u < d.childNodes.length; u++)
          v = (v << 5) - v + this.hashValue(d.childNodes[u], g, n) << 0;
    } else if (null != d && 'function' !== typeof d) {
      d = String(d);
      g = 0;
      null != n && (n.byteCount += d.length);
      for (u = 0; u < d.length; u++)
        g = (g << 5) - g + d.charCodeAt(u) << 0;
      v ^= g;
    }
    return v;
  };
  EditorUi.prototype.descriptorChanged = function() {};
  EditorUi.prototype.restoreLibraries = function() {};
  EditorUi.prototype.saveLibrary = function(d, g, n, v, u, x, C) {};
  EditorUi.prototype.isScratchpadEnabled = function() {
    return isLocalStorage || mxClient.IS_CHROMEAPP;
  };
  EditorUi.prototype.toggleScratchpad = function() {
    this.isScratchpadEnabled() && (null == this.scratchpad ? StorageFile.getFileContent(this, '.scratchpad', mxUtils.bind(this, function(d) {
      null == d && (d = this.emptyLibraryXml);
      this.loadLibrary(new StorageLibrary(this, d, '.scratchpad'));
    })) : this.closeLibrary(this.scratchpad));
  };
  EditorUi.prototype.createLibraryDataFromImages = function(d) {
    var g = mxUtils.createXmlDocument(),
      n = g.createElement('mxlibrary');
    mxUtils.setTextContent(n, JSON.stringify(d));
    g.appendChild(n);
    return mxUtils.getXml(g);
  };
  EditorUi.prototype.closeLibrary = function(d) {
    null != d && (this.removeLibrarySidebar(d.getHash()), d.constructor != LocalLibrary && mxSettings.removeCustomLibrary(d.getHash()), '.scratchpad' == d.title && (this.scratchpad = null));
  };
  EditorUi.prototype.removeLibrarySidebar = function(d) {
    var g = this.sidebar.palettes[d];
    if (null != g) {
      for (var n = 0; n < g.length; n++)
        g[n].parentNode.removeChild(g[n]);
      delete this.sidebar.palettes[d];
    }
  };
  EditorUi.prototype.repositionLibrary = function(d) {
    var g = this.sidebar.getEntryContainer();
    if (null == d) {
      var n = this.sidebar.palettes['L.scratchpad'];
      null == n && (n = this.sidebar.palettes.search);
      null != n && (d = n[n.length - 1].nextSibling);
    }
    d = null != d ? d : g.firstChild.nextSibling.nextSibling;
    n = g.lastChild;
    var v = n.previousSibling;
    g.insertBefore(n, d);
    g.insertBefore(v, n);
  };
  EditorUi.prototype.loadLibrary = function(d, g) {
    var n = mxUtils.parseXml(d.getData());
    if ('mxlibrary' == n.documentElement.nodeName) {
      var v = JSON.parse(mxUtils.getTextContent(n.documentElement));
      this.libraryLoaded(d, v, n.documentElement.getAttribute('title'), g);
    } else
      throw {
        message: mxResources.get('notALibraryFile')
      };
  };
  EditorUi.prototype.getLibraryStorageHint = function(d) {
    return '';
  };
  EditorUi.prototype.libraryLoaded = function(d, g, n, v) {
    if (null != this.sidebar) {
      d.constructor != LocalLibrary && mxSettings.addCustomLibrary(d.getHash());
      '.scratchpad' == d.title && (this.scratchpad = d);
      var u = this.sidebar.palettes[d.getHash()];
      u = null != u ? u[u.length - 1].nextSibling : null;
      this.removeLibrarySidebar(d.getHash());
      var x = null,
        C = mxUtils.bind(this, function(O, W) {
          0 == O.length && d.isEditable() ? (null == x && (x = document.createElement('div'), x.className = 'geDropTarget', mxUtils.write(x, mxResources.get('dragElementsHere'))), W.appendChild(x)) : this.addLibraryEntries(O, W);
        });
      null != this.sidebar && null != g && this.sidebar.addEntries(g);
      null == n && (n = d.getTitle(), null != n && /(\.xml)$/i.test(n) && (n = n.substring(0, n.lastIndexOf('.'))));
      var F = this.sidebar.addPalette(d.getHash(), n, null != v ? v : !0, mxUtils.bind(this, function(O) {
        C(g, O);
      }));
      this.repositionLibrary(u);
      var L = F.parentNode.previousSibling;
      v = L.getAttribute('title');
      null != v && 0 < v.length && '.scratchpad' != d.title && L.setAttribute('title', this.getLibraryStorageHint(d) + '\n' + v);
      var l = document.createElement('div');
      l.style.position = 'absolute';
      l.style.right = '0px';
      l.style.top = '0px';
      l.style.padding = '8px';
      l.style.backgroundColor = 'inherit';
      L.style.position = 'relative';
      var q = document.createElement('img');
      q.className = 'geAdaptiveAsset';
      q.setAttribute('src', Editor.crossImage);
      q.setAttribute('title', mxResources.get('close'));
      q.setAttribute('valign', 'absmiddle');
      q.setAttribute('border', '0');
      q.style.position = 'relative';
      q.style.top = '2px';
      q.style.width = '14px';
      q.style.cursor = 'pointer';
      q.style.margin = '0 3px';
      var A = null;
      if ('.scratchpad' != d.title || this.closableScratchpad)
        l.appendChild(q), mxEvent.addListener(q, 'click', mxUtils.bind(this, function(O) {
          if (!mxEvent.isConsumed(O)) {
            var W = mxUtils.bind(this, function() {
              this.closeLibrary(d);
            });
            null != A ? this.confirm(mxResources.get('allChangesLost'), null, W, mxResources.get('cancel'), mxResources.get('discardChanges')) : W();
            mxEvent.consume(O);
          }
        }));
      if (d.isEditable()) {
        var H = this.editor.graph,
          K = null,
          M = mxUtils.bind(this, function(O) {
            this.showLibraryDialog(d.getTitle(), F, g, d, d.getMode());
            mxEvent.consume(O);
          }),
          I = mxUtils.bind(this, function(O) {
            d.setModified(!0);
            d.isAutosave() ? (null != K && null != K.parentNode && K.parentNode.removeChild(K), K = q.cloneNode(!1), K.setAttribute('src', Editor.spinImage), K.setAttribute('title', mxResources.get('saving')), K.style.cursor = 'default', K.style.marginRight = '2px', K.style.marginTop = '-2px', l.insertBefore(K, l.firstChild), L.style.paddingRight = 18 * l.childNodes.length + 'px', this.saveLibrary(d.getTitle(), g, d, d.getMode(), !0, !0, function() {
              null != K && null != K.parentNode && (K.parentNode.removeChild(K), L.style.paddingRight = 18 * l.childNodes.length + 'px');
            })) : null == A && (A = q.cloneNode(!1), A.setAttribute('src', Editor.saveImage), A.setAttribute('title', mxResources.get('save')), l.insertBefore(A, l.firstChild), mxEvent.addListener(A, 'click', mxUtils.bind(this, function(W) {
              this.saveLibrary(d.getTitle(), g, d, d.getMode(), d.constructor == LocalLibrary, !0, function() {
                null == A || d.isModified() || (L.style.paddingRight = 18 * l.childNodes.length + 'px', A.parentNode.removeChild(A), A = null);
              });
              mxEvent.consume(W);
            })), L.style.paddingRight = 18 * l.childNodes.length + 'px');
          }),
          Q = mxUtils.bind(this, function(O, W, p, B) {
            O = H.cloneCells(mxUtils.sortCells(H.model.getTopmostCells(O)));
            for (var N = 0; N < O.length; N++) {
              var S = H.getCellGeometry(O[N]);
              null != S && S.translate(-W.x, -W.y);
            }
            F.appendChild(this.sidebar.createVertexTemplateFromCells(O, W.width, W.height, B || '', !0, null, !1));
            O = {
              xml: Graph.compress(mxUtils.getXml(this.editor.graph.encodeCells(O))),
              w: W.width,
              h: W.height
            };
            null != B && (O.title = B);
            g.push(O);
            I(p);
            null != x && null != x.parentNode && 0 < g.length && (x.parentNode.removeChild(x), x = null);
          }),
          P = mxUtils.bind(this, function(O) {
            if (H.isSelectionEmpty())
              H.getRubberband().isActive() ? (H.getRubberband().execute(O), H.getRubberband().reset()) : this.showError(mxResources.get('error'), mxResources.get('nothingIsSelected'), mxResources.get('ok'));
            else {
              var W = H.getSelectionCells(),
                p = H.view.getBounds(W),
                B = H.view.scale;
              p.x /= B;
              p.y /= B;
              p.width /= B;
              p.height /= B;
              p.x -= H.view.translate.x;
              p.y -= H.view.translate.y;
              Q(W, p);
            }
            mxEvent.consume(O);
          });
        mxEvent.addGestureListeners(F, function() {}, mxUtils.bind(this, function(O) {
          H.isMouseDown && null != H.panningManager && null != H.graphHandler.first && (H.graphHandler.suspend(), null != H.graphHandler.hint && (H.graphHandler.hint.style.visibility = 'hidden'), F.style.backgroundColor = '#f1f3f4', F.style.cursor = 'copy', H.panningManager.stop(), H.autoScroll = !1, mxEvent.consume(O));
        }), mxUtils.bind(this, function(O) {
          H.isMouseDown && null != H.panningManager && null != H.graphHandler && (F.style.backgroundColor = '', F.style.cursor = 'default', this.sidebar.showTooltips = !0, H.panningManager.stop(), H.graphHandler.reset(), H.isMouseDown = !1, H.autoScroll = !0, P(O), mxEvent.consume(O));
        }));
        mxEvent.addListener(F, 'mouseleave', mxUtils.bind(this, function(O) {
          H.isMouseDown && null != H.graphHandler.first && (H.graphHandler.resume(), null != H.graphHandler.hint && (H.graphHandler.hint.style.visibility = 'visible'), F.style.backgroundColor = '', F.style.cursor = '', H.autoScroll = !0);
        }));
        Graph.fileSupport && (mxEvent.addListener(F, 'dragover', mxUtils.bind(this, function(O) {
          F.style.backgroundColor = '#f1f3f4';
          O.dataTransfer.dropEffect = 'copy';
          F.style.cursor = 'copy';
          this.sidebar.hideTooltip();
          O.stopPropagation();
          O.preventDefault();
        })), mxEvent.addListener(F, 'drop', mxUtils.bind(this, function(O) {
          F.style.cursor = '';
          F.style.backgroundColor = '';
          0 < O.dataTransfer.files.length && this.importFiles(O.dataTransfer.files, 0, 0, this.maxImageSize, mxUtils.bind(this, function(W, p, B, N, S, R, V, T, U) {
            if (null != W && 'image/' == p.substring(0, 6))
              W = 'shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;aspect=fixed;image=' + this.convertDataUri(W), W = [new mxCell('', new mxGeometry(0, 0, S, R), W)], W[0].vertex = !0, Q(W, new mxRectangle(0, 0, S, R), O, mxEvent.isAltDown(O) ? null : V.substring(0, V.lastIndexOf('.')).replace(/_/g, ' ')), null != x && null != x.parentNode && 0 < g.length && (x.parentNode.removeChild(x), x = null);
            else {
              var X = !1,
                Z = mxUtils.bind(this, function(Y, ea) {
                  null != Y && 'application/pdf' == ea && (ea = Editor.extractGraphModelFromPdf(Y), null != ea && 0 < ea.length && (Y = ea));
                  if (null != Y)
                    if (Y = mxUtils.parseXml(Y), 'mxlibrary' == Y.documentElement.nodeName)
                      try {
                        var aa = JSON.parse(mxUtils.getTextContent(Y.documentElement));
                        C(aa, F);
                        g = g.concat(aa);
                        I(O);
                        this.spinner.stop();
                        X = !0;
                      } catch (na) {}
                  else if ('mxfile' == Y.documentElement.nodeName)
                    try {
                      var fa = Y.documentElement.getElementsByTagName('diagram');
                      for (aa = 0; aa < fa.length; aa++) {
                        var da = this.stringToCells(Editor.getDiagramNodeXml(fa[aa])),
                          ba = this.editor.graph.getBoundingBoxFromGeometry(da);
                        Q(da, new mxRectangle(0, 0, ba.width, ba.height), O);
                      }
                      X = !0;
                    } catch (na) {
                      null != window.console && console.log('error in drop handler:', na);
                    }
                  X || (this.spinner.stop(), this.handleError({
                    message: mxResources.get('errorLoadingFile')
                  }));
                  null != x && null != x.parentNode && 0 < g.length && (x.parentNode.removeChild(x), x = null);
                });
              null != U && null != V && (/(\.v(dx|sdx?))($|\?)/i.test(V) || /(\.vs(x|sx?))($|\?)/i.test(V)) ? this.importVisio(U, function(Y) {
                Z(Y, 'text/xml');
              }, null, V) : new XMLHttpRequest().upload && this.isRemoteFileFormat(W, V) && null != U ? this.isExternalDataComms() ? this.parseFile(U, mxUtils.bind(this, function(Y) {
                4 == Y.readyState && (this.spinner.stop(), 200 <= Y.status && 299 >= Y.status ? Z(Y.responseText, 'text/xml') : this.handleError({
                  message: mxResources.get(413 == Y.status ? 'drawingTooLarge' : 'invalidOrMissingFile')
                }, mxResources.get('errorLoadingFile')));
              })) : (this.spinner.stop(), this.showError(mxResources.get('error'), mxResources.get('notInOffline'))) : Z(W, p);
            }
          }));
          O.stopPropagation();
          O.preventDefault();
        })), mxEvent.addListener(F, 'dragleave', function(O) {
          F.style.cursor = '';
          F.style.backgroundColor = '';
          O.stopPropagation();
          O.preventDefault();
        }));
        q = q.cloneNode(!1);
        q.setAttribute('src', Editor.editImage);
        q.setAttribute('title', mxResources.get('edit'));
        l.insertBefore(q, l.firstChild);
        mxEvent.addListener(q, 'click', M);
        mxEvent.addListener(F, 'dblclick', function(O) {
          mxEvent.getSource(O) == F && M(O);
        });
        v = q.cloneNode(!1);
        v.setAttribute('src', Editor.plusImage);
        v.setAttribute('title', mxResources.get('add'));
        l.insertBefore(v, l.firstChild);
        mxEvent.addListener(v, 'click', P);
        '.scratchpad' == d.title && (this.addSelectionToScratchpad = P);
        this.isOffline() || '.scratchpad' != d.title || null == EditorUi.scratchpadHelpLink || (v = document.createElement('span'), v.setAttribute('title', mxResources.get('help')), v.style.cssText = 'color:#a3a3a3;text-decoration:none;margin-right:2px;cursor:pointer;', mxUtils.write(v, '?'), mxEvent.addGestureListeners(v, mxUtils.bind(this, function(O) {
          this.openLink(EditorUi.scratchpadHelpLink);
          mxEvent.consume(O);
        })), l.insertBefore(v, l.firstChild));
      }
      L.appendChild(l);
      L.style.paddingRight = 18 * l.childNodes.length + 'px';
    }
  };
  EditorUi.prototype.addLibraryEntries = function(d, g) {
    for (var n = 0; n < d.length; n++) {
      var v = d[n],
        u = v.data;
      if (null != u) {
        u = this.convertDataUri(u);
        var x = 'shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;';
        'fixed' == v.aspect && (x += 'aspect=fixed;');
        g.appendChild(this.sidebar.createVertexTemplate(x + 'image=' + u, v.w, v.h, '', v.title || '', !1, null, !0));
      } else
        null != v.xml && (u = this.stringToCells('<' == v.xml.charAt(0) ? v.xml : Graph.decompress(v.xml)), 0 < u.length && g.appendChild(this.sidebar.createVertexTemplateFromCells(u, v.w, v.h, v.title || '', !0, null, !0)));
    }
  };
  EditorUi.prototype.getResource = function(d) {
    return null != d ? d[mxLanguage] || d.main : null;
  };
  EditorUi.prototype.footerHeight = 0;
  '1' == urlParams.savesidebar && (Sidebar.prototype.thumbWidth = 64, Sidebar.prototype.thumbHeight = 64);
  EditorUi.initTheme = function() {
    'atlas' == Editor.currentTheme && (mxClient.link('stylesheet', STYLE_PATH + '/atlas.css'), 'undefined' !== typeof Toolbar && (Toolbar.prototype.unselectedBackground = 'linear-gradient(rgb(255, 255, 255) 0px, rgb(242, 242, 242) 100%)', Toolbar.prototype.selectedBackground = 'rgb(242, 242, 242)'), Editor.prototype.initialTopSpacing = 3, EditorUi.prototype.menubarHeight = 41, EditorUi.prototype.toolbarHeight = 38);
    'sketch' == Editor.currentTheme && (Editor.configurationKey = '.sketch-configuration', Editor.settingsKey = '.sketch-config');
  };
  EditorUi.initTheme();
  EditorUi.prototype.showImageDialog = function(d, g, n, v, u, x, C) {
    d = new ImageDialog(this, d, g, n, v, u, x, C);
    this.showDialog(d.container, Graph.fileSupport ? 480 : 360, Graph.fileSupport ? 200 : 90, !0, !0);
    d.init();
  };
  EditorUi.prototype.showLocalStorageDialog = function(d, g, n, v, u, x) {
    var C = localStorage.getItem(g);
    d = new TextareaDialog(this, d, null != C ? JSON.stringify(JSON.parse(C), null, 2) : '', mxUtils.bind(this, function(F) {
      if (null != F)
        try {
          if (null != x && x(F), F == C)
            this.hideDialog();
          else {
            if (0 < F.length) {
              var L = JSON.parse(F);
              localStorage.setItem(g, JSON.stringify(L));
            } else
              localStorage.removeItem(g);
            this.hideDialog();
            this.alert(mxResources.get('restartForChangeRequired'));
          }
        } catch (l) {
          this.handleError(l);
        }
    }), null, mxResources.get('close'), null, null, null, !0, null, null, u, n, v);
    this.showDialog(d.container, 620, 460, !0, !1);
    d.init();
  };
  EditorUi.prototype.showBackgroundImageDialog = function(d, g, n) {
    d = null != d ? d : mxUtils.bind(this, function(v, u, x, C) {
      u || (v = new ChangePageSetup(this, x, v), null != C && (v.shadowVisible = C), this.editor.graph.model.execute(v));
    });
    d = new BackgroundImageDialog(this, d, g, n);
    this.showDialog(d.container, 400, 240, !0, !0);
    d.init();
  };
  EditorUi.prototype.showLibraryDialog = function(d, g, n, v, u) {
    d = new LibraryDialog(this, d, g, n, v, u);
    this.showDialog(d.container, 640, 440, !0, !1, mxUtils.bind(this, function(x) {
      x && null == this.getCurrentFile() && '1' != urlParams.embed && this.showSplash();
    }));
    d.init();
  };
  var f = EditorUi.prototype.createFormat;
  EditorUi.prototype.createFormat = function(d) {
    var g = f.apply(this, arguments);
    this.editor.graph.addListener('viewStateChanged', mxUtils.bind(this, function(n) {
      this.editor.graph.isSelectionEmpty() && g.refresh();
    }));
    return g;
  };
  EditorUi.prototype.handleError = function(d, g, n, v, u, x, C) {
    var F = null != this.spinner && null != this.spinner.pause ? this.spinner.pause() : function() {},
      L = null != d && null != d.error ? d.error : d;
    if (null != d && ('1' == urlParams.test || null != d.stack) && null != d.message)
      try {
        C ? null != window.console && console.error('EditorUi.handleError:', d) : EditorUi.logError('Caught: ' + ('' == d.message && null != d.name) ? d.name : d.message, d.filename, d.lineNumber, d.columnNumber, d, 'INFO');
      } catch (K) {}
    if (null != L || null != g) {
      C = mxUtils.htmlEntities(mxResources.get('unknownError'));
      var l = mxResources.get('ok'),
        q = null;
      g = null != g ? g : mxResources.get('error');
      if (null != L) {
        null != L.retry && (l = mxResources.get('cancel'), q = function() {
          F();
          L.retry();
        });
        if (404 == L.code || 404 == L.status || 403 == L.code) {
          C = 403 == L.code ? null != L.message ? mxUtils.htmlEntities(L.message) : mxUtils.htmlEntities(mxResources.get('accessDenied')) : null != u ? u : mxUtils.htmlEntities(mxResources.get('fileNotFoundOrDenied') + (null != this.drive && null != this.drive.user ? ' (' + this.drive.user.displayName + ', ' + this.drive.user.email + ')' : ''));
          var A = null != u ? null : null != x ? x : window.location.hash;
          if (null != A && ('#G' == A.substring(0, 2) || '#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D' == A.substring(0, 45)) && (null != d && null != d.error && (null != d.error.errors && 0 < d.error.errors.length && 'fileAccess' == d.error.errors[0].reason || null != d.error.data && 0 < d.error.data.length && 'fileAccess' == d.error.data[0].reason) || 404 == L.code || 404 == L.status)) {
            A = '#U' == A.substring(0, 2) ? A.substring(45, A.lastIndexOf('%26ex')) : A.substring(2);
            this.showError(g, C, mxResources.get('openInNewWindow'), mxUtils.bind(this, function() {
              this.editor.graph.openLink('https://drive.google.com/open?id=' + A);
              this.handleError(d, g, n, v, u);
            }), q, mxResources.get('changeUser'), mxUtils.bind(this, function() {
              function K() {
                P.innerText = '';
                for (var O = 0; O < M.length; O++) {
                  var W = document.createElement('option');
                  mxUtils.write(W, M[O].displayName);
                  W.value = O;
                  P.appendChild(W);
                  W = document.createElement('option');
                  W.innerHTML = '&nbsp;&nbsp;&nbsp;';
                  mxUtils.write(W, '<' + M[O].email + '>');
                  W.setAttribute('disabled', 'disabled');
                  P.appendChild(W);
                }
                W = document.createElement('option');
                mxUtils.write(W, mxResources.get('addAccount'));
                W.value = M.length;
                P.appendChild(W);
              }
              var M = this.drive.getUsersList(),
                I = document.createElement('div'),
                Q = document.createElement('span');
              Q.style.marginTop = '6px';
              mxUtils.write(Q, mxResources.get('changeUser') + ': ');
              I.appendChild(Q);
              var P = document.createElement('select');
              P.style.width = '200px';
              K();
              mxEvent.addListener(P, 'change', mxUtils.bind(this, function() {
                var O = P.value,
                  W = M.length != O;
                W && this.drive.setUser(M[O]);
                this.drive.authorize(W, mxUtils.bind(this, function() {
                  W || (M = this.drive.getUsersList(), K());
                }), mxUtils.bind(this, function(p) {
                  this.handleError(p);
                }), !0);
              }));
              I.appendChild(P);
              I = new CustomDialog(this, I, mxUtils.bind(this, function() {
                this.loadFile(window.location.hash.substr(1), !0);
              }));
              this.showDialog(I.container, 300, 100, !0, !0);
            }), mxResources.get('cancel'), mxUtils.bind(this, function() {
              this.hideDialog();
              null != n && n();
            }), 480, 150);
            return;
          }
        }
        null != L.message ? C = '' == L.message && null != L.name ? mxUtils.htmlEntities(L.name) : mxUtils.htmlEntities(L.message) : null != L.response && null != L.response.error ? C = mxUtils.htmlEntities(L.response.error) : 'undefined' !== typeof window.App && (L.code == App.ERROR_TIMEOUT ? C = mxUtils.htmlEntities(mxResources.get('timeout')) : L.code == App.ERROR_BUSY ? C = mxUtils.htmlEntities(mxResources.get('busy')) : 'string' === typeof L && 0 < L.length && (C = mxUtils.htmlEntities(L)));
      }
      var H = x = null;
      null != L && null != L.helpLink ? (x = mxResources.get('help'), H = mxUtils.bind(this, function() {
        return this.editor.graph.openLink(L.helpLink);
      })) : null != L && null != L.ownerEmail && (x = mxResources.get('contactOwner'), C += mxUtils.htmlEntities(' (' + x + ': ' + L.ownerEmail + ')'), H = mxUtils.bind(this, function() {
        return this.openLink('mailto:' + mxUtils.htmlEntities(L.ownerEmail));
      }));
      this.showError(g, C, l, n, q, null, null, x, H, null, null, null, v ? n : null);
    } else
      null != n && n();
  };
  EditorUi.prototype.alert = function(d, g, n) {
    d = new ErrorDialog(this, null, d, mxResources.get('ok'), g);
    this.showDialog(d.container, n || 340, 100, !0, !1);
    d.init();
  };
  EditorUi.prototype.confirm = function(d, g, n, v, u, x) {
    var C = null != this.spinner && null != this.spinner.pause ? this.spinner.pause() : function() {},
      F = Math.min(200, 28 * Math.ceil(d.length / 50));
    d = new ConfirmDialog(this, d, function() {
      C();
      null != g && g();
    }, function() {
      C();
      null != n && n();
    }, v, u, null, null, null, null, F);
    this.showDialog(d.container, 340, 46 + F, !0, x);
    d.init();
  };
  EditorUi.prototype.showBanner = function(d, g, n, v) {
    var u = !1;
    if (!(this.bannerShowing || this['hideBanner' + d] || isLocalStorage && null != mxSettings.settings && null != mxSettings.settings['close' + d])) {
      var x = document.createElement('div');
      x.style.cssText = 'position:absolute;bottom:10px;left:50%;max-width:90%;padding:18px 34px 12px 20px;font-size:16px;font-weight:bold;white-space:nowrap;cursor:pointer;z-index:' + mxPopupMenu.prototype.zIndex + ';';
      mxUtils.setPrefixedStyle(x.style, 'box-shadow', '1px 1px 2px 0px #ddd');
      mxUtils.setPrefixedStyle(x.style, 'transform', 'translate(-50%,120%)');
      mxUtils.setPrefixedStyle(x.style, 'transition', 'all 1s ease');
      x.className = 'geBtn gePrimaryBtn';
      u = document.createElement('img');
      u.setAttribute('src', IMAGE_PATH + '/logo.png');
      u.setAttribute('border', '0');
      u.setAttribute('align', 'absmiddle');
      u.style.cssText = 'margin-top:-4px;margin-left:8px;margin-right:12px;width:26px;height:26px;';
      x.appendChild(u);
      u = document.createElement('img');
      u.setAttribute('src', Dialog.prototype.closeImage);
      u.setAttribute('title', mxResources.get(v ? 'doNotShowAgain' : 'close'));
      u.setAttribute('border', '0');
      u.style.cssText = 'position:absolute;right:10px;top:12px;filter:invert(1);padding:6px;margin:-6px;cursor:default;';
      x.appendChild(u);
      mxUtils.write(x, g);
      document.body.appendChild(x);
      this.bannerShowing = !0;
      g = document.createElement('div');
      g.style.cssText = 'font-size:11px;text-align:center;font-weight:normal;';
      var C = document.createElement('input');
      C.setAttribute('type', 'checkbox');
      C.setAttribute('id', 'geDoNotShowAgainCheckbox');
      C.style.marginRight = '6px';
      if (!v) {
        g.appendChild(C);
        var F = document.createElement('label');
        F.setAttribute('for', 'geDoNotShowAgainCheckbox');
        mxUtils.write(F, mxResources.get('doNotShowAgain'));
        g.appendChild(F);
        x.style.paddingBottom = '30px';
        x.appendChild(g);
      }
      var L = mxUtils.bind(this, function() {
        null != x.parentNode && (x.parentNode.removeChild(x), this.bannerShowing = !1, C.checked || v) && (this['hideBanner' + d] = !0, isLocalStorage && null != mxSettings.settings && (mxSettings.settings['close' + d] = Date.now(), mxSettings.save()));
      });
      mxEvent.addListener(u, 'click', mxUtils.bind(this, function(q) {
        mxEvent.consume(q);
        L();
      }));
      var l = mxUtils.bind(this, function() {
        mxUtils.setPrefixedStyle(x.style, 'transform', 'translate(-50%,120%)');
        window.setTimeout(mxUtils.bind(this, function() {
          L();
        }), 1000);
      });
      mxEvent.addListener(x, 'click', mxUtils.bind(this, function(q) {
        var A = mxEvent.getSource(q);
        A != C && A != F ? (null != n && n(), L(), mxEvent.consume(q)) : l();
      }));
      window.setTimeout(mxUtils.bind(this, function() {
        mxUtils.setPrefixedStyle(x.style, 'transform', 'translate(-50%,0%)');
      }), 500);
      window.setTimeout(l, 30000);
      u = !0;
    }
    return u;
  };
  EditorUi.prototype.setCurrentFile = function(d) {
    null != d && (d.opened = new Date());
    this.currentFile = d;
  };
  EditorUi.prototype.getCurrentFile = function() {
    return this.currentFile;
  };
  EditorUi.prototype.isExportToCanvas = function() {
    return this.editor.isExportToCanvas();
  };
  EditorUi.prototype.createImageDataUri = function(d, g, n, v) {
    d = d.toDataURL('image/' + n);
    if (null != d && 6 < d.length)
      null != g && (d = Editor.writeGraphModelToPng(d, 'tEXt', 'mxfile', encodeURIComponent(g))), 0 < v && (d = Editor.writeGraphModelToPng(d, 'pHYs', 'dpi', v));
    else
      throw {
        message: mxResources.get('unknownError')
      };
    return d;
  };
  EditorUi.prototype.saveCanvas = function(d, g, n, v, u) {
    var x = 'jpeg' == n ? 'jpg' : n;
    v = this.getBaseFilename(v) + (null != g ? '.drawio' : '') + '.' + x;
    d = this.createImageDataUri(d, g, n, u);
    this.saveData(v, x, d.substring(d.lastIndexOf(',') + 1), 'image/' + n, !0);
  };
  EditorUi.prototype.isLocalFileSave = function() {
    return 'remote' != urlParams.save && (mxClient.IS_IE || 'undefined' !== typeof window.Blob && 'undefined' !== typeof window.URL) && 9 != document.documentMode && 8 != document.documentMode && 7 != document.documentMode || this.isOfflineApp() || mxClient.IS_IOS;
  };
  EditorUi.prototype.showTextDialog = function(d, g) {
    d = new TextareaDialog(this, d, g, null, null, mxResources.get('close'));
    this.showDialog(d.container, 620, 460, !0, !0, null, null, null, null, !0);
    d.init();
    document.execCommand('selectall', !1, null);
  };
  EditorUi.prototype.doSaveLocalFile = function(d, g, n, v, u, x) {
    'text/xml' != n || /(\.drawio)$/i.test(g) || /(\.xml)$/i.test(g) || /(\.svg)$/i.test(g) || /(\.html)$/i.test(g) || (g = g + '.' + (null != x ? x : 'drawio'));
    if (window.Blob && navigator.msSaveOrOpenBlob)
      d = v ? this.base64ToBlob(d, n) : new Blob([d], {
        type: n
      }), navigator.msSaveOrOpenBlob(d, g);
    else if (mxClient.IS_IE)
      n = window.open('about:blank', '_blank'), null == n ? mxUtils.popup(d, !0) : (n.document.write(d), n.document.close(), n.document.execCommand('SaveAs', !0, g), n.close());
    else if (mxClient.IS_IOS && this.isOffline())
      navigator.standalone || null == n || 'image/' != n.substring(0, 6) ? this.showTextDialog(g + ':', d) : this.openInNewWindow(d, n, v);
    else {
      var C = document.createElement('a');
      x = (null == navigator.userAgent || 0 > navigator.userAgent.indexOf('PaleMoon/')) && 'undefined' !== typeof C.download;
      if (mxClient.IS_GC && null != navigator.userAgent) {
        var F = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        x = 65 == (F ? parseInt(F[2], 10) : !1) ? !1 : x;
      }
      if (x || this.isOffline()) {
        C.href = URL.createObjectURL(v ? this.base64ToBlob(d, n) : new Blob([d], {
          type: n
        }));
        x ? C.download = g : C.setAttribute('target', '_blank');
        document.body.appendChild(C);
        try {
          window.setTimeout(function() {
            URL.revokeObjectURL(C.href);
          }, 20000), C.click(), C.parentNode.removeChild(C);
        } catch (L) {}
      } else
        this.createEchoRequest(d, g, n, v, u).simulate(document, '_blank');
    }
  };
  EditorUi.prototype.createEchoRequest = function(d, g, n, v, u, x) {
    d = 'xml=' + encodeURIComponent(d);
    return new mxXmlRequest(SAVE_URL, d + (null != n ? '&mime=' + n : '') + (null != u ? '&format=' + u : '') + (null != x ? '&base64=' + x : '') + (null != g ? '&filename=' + encodeURIComponent(g) : '') + (v ? '&binary=1' : ''));
  };
  EditorUi.prototype.base64ToBlob = function(d, g) {
    g = g || '';
    d = atob(d);
    for (var n = d.length, v = Math.ceil(n / 1024), u = Array(v), x = 0; x < v; ++x) {
      for (var C = 1024 * x, F = Math.min(C + 1024, n), L = Array(F - C), l = 0; C < F; ++l, ++C)
        L[l] = d[C].charCodeAt(0);
      u[x] = new Uint8Array(L);
    }
    return new Blob(u, {
      type: g
    });
  };
  EditorUi.prototype.saveLocalFile = function(d, g, n, v, u, x, C, F) {
    x = null != x ? x : !1;
    C = null != C ? C : 'vsdx' != u && (!mxClient.IS_IOS || !navigator.standalone);
    u = this.getServiceCount(x);
    isLocalStorage && u++;
    var L = 4 >= u ? 2 : 6 < u ? 4 : 3;
    g = new CreateDialog(this, g, mxUtils.bind(this, function(l, q) {
      try {
        if ('_blank' == q)
          if (null != n && 'image/' == n.substring(0, 6))
            this.openInNewWindow(d, n, v);
          else if (null != n && 'text/html' == n.substring(0, 9)) {
          var A = new EmbedDialog(this, d);
          this.showDialog(A.container, 450, 240, !0, !0);
          A.init();
        } else {
          var H = window.open('about:blank');
          null == H ? mxUtils.popup(d, !0) : (H.document.write('<pre>' + mxUtils.htmlEntities(d, !1) + '</pre>'), H.document.close());
        } else
          q == App.MODE_DEVICE || 'download' == q ? this.doSaveLocalFile(d, l, n, v, null, F) : null != l && 0 < l.length && this.pickFolder(q, mxUtils.bind(this, function(K) {
            try {
              this.exportFile(d, l, n, v, q, K);
            } catch (M) {
              this.handleError(M);
            }
          }));
      } catch (K) {
        this.handleError(K);
      }
    }), mxUtils.bind(this, function() {
      this.hideDialog();
    }), mxResources.get('saveAs'), mxResources.get('download'), !1, x, C, null, 1 < u, L, d, n, v);
    x = this.isServices(u) ? u > L ? 390 : 280 : 160;
    this.showDialog(g.container, 420, x, !0, !0);
    g.init();
  };
  EditorUi.prototype.openInNewWindow = function(d, g, n) {
    var v = window.open('about:blank');
    null == v || null == v.document ? mxUtils.popup(d, !0) : ('image/svg+xml' != g || mxClient.IS_SVG ? 'image/svg+xml' != g || n ? (d = n ? d : btoa(unescape(encodeURIComponent(d))), v.document.write('<html><img style="max-width:100%;" src="data:' + g + ';base64,' + d + '"/></html>')) : v.document.write('<html>' + d + '</html>') : v.document.write('<html><pre>' + mxUtils.htmlEntities(d, !1) + '</pre></html>'), v.document.close());
  };
  var c = EditorUi.prototype.addChromelessToolbarItems;
  EditorUi.prototype.isChromelessImageExportEnabled = function() {
    return 'draw.io' != this.getServiceName() || /.*\.draw\.io$/.test(window.location.hostname) || /.*\.diagrams\.net$/.test(window.location.hostname);
  };
  EditorUi.prototype.addChromelessToolbarItems = function(d) {
    if (null != urlParams.tags) {
      this.tagsDialog = this.tagsComponent = null;
      var g = d(mxUtils.bind(this, function(v) {
        null == this.tagsComponent && (this.tagsComponent = this.editor.graph.createTagsDialog(mxUtils.bind(this, function() {
          return null != this.tagsDialog;
        }), !0), this.tagsComponent.div.getElementsByTagName('div')[0].style.position = '', mxUtils.setPrefixedStyle(this.tagsComponent.div.style, 'borderRadius', '5px'), this.tagsComponent.div.className = 'geScrollable', this.tagsComponent.div.style.maxHeight = '160px', this.tagsComponent.div.style.maxWidth = '120px', this.tagsComponent.div.style.padding = '4px', this.tagsComponent.div.style.overflow = 'auto', this.tagsComponent.div.style.height = 'auto', this.tagsComponent.div.style.position = 'fixed', this.tagsComponent.div.style.fontFamily = Editor.defaultHtmlFont, mxClient.IS_IE || mxClient.IS_IE11 ? (this.tagsComponent.div.style.backgroundColor = '#ffffff', this.tagsComponent.div.style.border = '2px solid black', this.tagsComponent.div.style.color = '#000000') : (this.tagsComponent.div.style.backgroundColor = '#000000', this.tagsComponent.div.style.color = '#ffffff', mxUtils.setOpacity(this.tagsComponent.div, 80)));
        if (null != this.tagsDialog)
          this.tagsDialog.parentNode.removeChild(this.tagsDialog), this.tagsDialog = null;
        else {
          this.tagsDialog = this.tagsComponent.div;
          mxEvent.addListener(this.tagsDialog, 'mouseleave', mxUtils.bind(this, function() {
            null != this.tagsDialog && (this.tagsDialog.parentNode.removeChild(this.tagsDialog), this.tagsDialog = null);
          }));
          var u = g.getBoundingClientRect();
          this.tagsDialog.style.left = u.left + 'px';
          this.tagsDialog.style.bottom = parseInt(this.chromelessToolbar.style.bottom) + this.chromelessToolbar.offsetHeight + 4 + 'px';
          u = mxUtils.getCurrentStyle(this.editor.graph.container);
          this.tagsDialog.style.zIndex = u.zIndex;
          document.body.appendChild(this.tagsDialog);
          this.tagsComponent.refresh();
          this.editor.fireEvent(new mxEventObject('tagsDialogShown'));
        }
        mxEvent.consume(v);
      }), Editor.tagsImage, mxResources.get('tags'));
      this.editor.graph.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
        var v = this.editor.graph.getAllTags();
        g.style.display = 0 < v.length ? '' : 'none';
      }));
    }
    c.apply(this, arguments);
    this.editor.addListener('tagsDialogShown', mxUtils.bind(this, function() {
      null != this.layersDialog && (this.layersDialog.parentNode.removeChild(this.layersDialog), this.layersDialog = null);
    }));
    this.editor.addListener('layersDialogShown', mxUtils.bind(this, function() {
      null != this.tagsDialog && (this.tagsDialog.parentNode.removeChild(this.tagsDialog), this.tagsDialog = null);
    }));
    this.editor.addListener('pageSelected', mxUtils.bind(this, function() {
      null != this.tagsDialog && (this.tagsDialog.parentNode.removeChild(this.tagsDialog), this.tagsDialog = null);
      null != this.layersDialog && (this.layersDialog.parentNode.removeChild(this.layersDialog), this.layersDialog = null);
    }));
    mxEvent.addListener(this.editor.graph.container, 'click', mxUtils.bind(this, function() {
      null != this.tagsDialog && (this.tagsDialog.parentNode.removeChild(this.tagsDialog), this.tagsDialog = null);
      null != this.layersDialog && (this.layersDialog.parentNode.removeChild(this.layersDialog), this.layersDialog = null);
    }));
    if (this.isExportToCanvas() && this.isChromelessImageExportEnabled()) {
      this.exportDialog = null;
      var n = d(mxUtils.bind(this, function(v) {
        var u = mxUtils.bind(this, function() {
          mxEvent.removeListener(this.editor.graph.container, 'click', u);
          null != this.exportDialog && (this.exportDialog.parentNode.removeChild(this.exportDialog), this.exportDialog = null);
        });
        if (null != this.exportDialog)
          u.apply(this);
        else {
          this.exportDialog = document.createElement('div');
          var x = n.getBoundingClientRect();
          mxUtils.setPrefixedStyle(this.exportDialog.style, 'borderRadius', '5px');
          this.exportDialog.style.position = 'fixed';
          this.exportDialog.style.textAlign = 'center';
          this.exportDialog.style.fontFamily = Editor.defaultHtmlFont;
          this.exportDialog.style.backgroundColor = '#000000';
          this.exportDialog.style.width = '50px';
          this.exportDialog.style.height = '50px';
          this.exportDialog.style.padding = '4px 2px 4px 2px';
          this.exportDialog.style.color = '#ffffff';
          mxUtils.setOpacity(this.exportDialog, 70);
          this.exportDialog.style.left = x.left + 'px';
          this.exportDialog.style.bottom = parseInt(this.chromelessToolbar.style.bottom) + this.chromelessToolbar.offsetHeight + 4 + 'px';
          x = mxUtils.getCurrentStyle(this.editor.graph.container);
          this.exportDialog.style.zIndex = x.zIndex;
          var C = new Spinner({
            lines: 8,
            length: 6,
            width: 5,
            radius: 6,
            rotate: 0,
            color: '#fff',
            speed: 1.5,
            trail: 60,
            shadow: !1,
            hwaccel: !1,
            top: '28px',
            zIndex: 2000000000
          });
          C.spin(this.exportDialog);
          this.editor.exportToCanvas(mxUtils.bind(this, function(F) {
            C.stop();
            this.exportDialog.style.width = 'auto';
            this.exportDialog.style.height = 'auto';
            this.exportDialog.style.padding = '10px';
            var L = this.createImageDataUri(F, null, 'png');
            F = document.createElement('img');
            F.style.maxWidth = '140px';
            F.style.maxHeight = '140px';
            F.style.cursor = 'pointer';
            F.style.backgroundColor = 'white';
            F.setAttribute('title', mxResources.get('openInNewWindow'));
            F.setAttribute('border', '0');
            F.setAttribute('src', L);
            this.exportDialog.appendChild(F);
            mxEvent.addListener(F, 'click', mxUtils.bind(this, function() {
              this.openInNewWindow(L.substring(L.indexOf(',') + 1), 'image/png', !0);
              u.apply(this, arguments);
            }));
          }), null, this.thumbImageCache, null, mxUtils.bind(this, function(F) {
            this.spinner.stop();
            this.handleError(F);
          }), null, null, null, null, null, null, null, Editor.defaultBorder);
          mxEvent.addListener(this.editor.graph.container, 'click', u);
          document.body.appendChild(this.exportDialog);
        }
        mxEvent.consume(v);
      }), Editor.cameraImage, mxResources.get('export'));
    }
  };
  EditorUi.prototype.saveData = function(d, g, n, v, u) {
    this.isLocalFileSave() ? this.saveLocalFile(n, d, v, u, g) : this.saveRequest(d, g, mxUtils.bind(this, function(x, C) {
      return this.createEchoRequest(n, x, v, u, g, C);
    }), n, u, v);
  };
  EditorUi.prototype.saveRequest = function(d, g, n, v, u, x, C) {
    C = null != C ? C : !mxClient.IS_IOS || !navigator.standalone;
    var F = this.getServiceCount(!1);
    isLocalStorage && F++;
    var L = 4 >= F ? 2 : 6 < F ? 4 : 3;
    d = new CreateDialog(this, d, mxUtils.bind(this, function(l, q) {
      if ('_blank' == q || null != l && 0 < l.length) {
        var A = n('_blank' == q ? null : l, q == App.MODE_DEVICE || 'download' == q || null == q || '_blank' == q ? '0' : '1');
        null != A && (q == App.MODE_DEVICE || 'download' == q || '_blank' == q ? A.simulate(document, '_blank') : this.pickFolder(q, mxUtils.bind(this, function(H) {
          x = null != x ? x : 'pdf' == g ? 'application/pdf' : 'image/' + g;
          if (null != v)
            try {
              this.exportFile(v, l, x, !0, q, H);
            } catch (K) {
              this.handleError(K);
            }
          else
            this.spinner.spin(document.body, mxResources.get('saving')) && A.send(mxUtils.bind(this, function() {
              this.spinner.stop();
              if (200 <= A.getStatus() && 299 >= A.getStatus())
                try {
                  this.exportFile(A.getText(), l, x, !0, q, H);
                } catch (K) {
                  this.handleError(K);
                }
              else
                this.handleError({
                  message: mxResources.get('errorSavingFile')
                });
            }), function(K) {
              this.spinner.stop();
              this.handleError(K);
            });
        })));
      }
    }), mxUtils.bind(this, function() {
      this.hideDialog();
    }), mxResources.get('saveAs'), mxResources.get('download'), !1, !1, C, null, 1 < F, L, v, x, u);
    F = this.isServices(F) ? 4 < F ? 390 : 280 : 160;
    this.showDialog(d.container, 420, F, !0, !0);
    d.init();
  };
  EditorUi.prototype.isServices = function(d) {
    return 1 != d;
  };
  EditorUi.prototype.getEditBlankXml = function() {
    return this.getFileData(!0);
  };
  EditorUi.prototype.exportFile = function(d, g, n, v, u, x) {};
  EditorUi.prototype.pickFolder = function(d, g, n) {
    g(null);
  };
  EditorUi.prototype.exportSvg = function(d, g, n, v, u, x, C, F, L, l, q, A, H, K) {
    if (this.spinner.spin(document.body, mxResources.get('export')))
      try {
        var M = this.editor.graph.isSelectionEmpty();
        n = null != n ? n : M;
        var I = g ? null : this.editor.graph.background;
        I == mxConstants.NONE && (I = null);
        null == I && 0 == g && (I = q ? this.editor.graph.defaultPageBackgroundColor : '#ffffff');
        var Q = this.editor.graph.getSvg(I, d, C, F, null, n, null, null, 'blank' == l ? '_blank' : 'self' == l ? '_top' : null, null, !H, q, A);
        v && this.editor.graph.addSvgShadow(Q);
        var P = this.getBaseFilename() + (u ? '.drawio' : '') + '.svg';
        K = null != K ? K : mxUtils.bind(this, function(p) {
          this.isLocalFileSave() || p.length <= MAX_REQUEST_SIZE ? this.saveData(P, 'svg', p, 'image/svg+xml') : this.handleError({
            message: mxResources.get('drawingTooLarge')
          }, mxResources.get('error'), mxUtils.bind(this, function() {
            mxUtils.popup(p);
          }));
        });
        var O = mxUtils.bind(this, function(p) {
          this.spinner.stop();
          u && p.setAttribute('content', this.getFileData(!0, null, null, null, n, L, null, null, null, !1));
          K(Graph.xmlDeclaration + '\n' + (u ? Graph.svgFileComment + '\n' : '') + Graph.svgDoctype + '\n' + mxUtils.getXml(p));
        });
        this.editor.graph.mathEnabled && this.editor.addMathCss(Q);
        var W = mxUtils.bind(this, function(p) {
          x ? (null == this.thumbImageCache && (this.thumbImageCache = {}), this.editor.convertImages(p, O, this.thumbImageCache)) : O(p);
        });
        H ? this.embedFonts(Q, W) : (this.editor.addFontCss(Q), W(Q));
      } catch (p) {
        this.handleError(p);
      }
  };
  EditorUi.prototype.addRadiobox = function(d, g, n, v, u, x, C) {
    return this.addCheckbox(d, n, v, u, x, C, !0, g);
  };
  EditorUi.prototype.addCheckbox = function(d, g, n, v, u, x, C, F) {
    x = null != x ? x : !0;
    var L = document.createElement('input');
    L.style.marginRight = '8px';
    L.style.marginTop = '16px';
    L.setAttribute('type', C ? 'radio' : 'checkbox');
    C = 'geCheckbox-' + Editor.guid();
    L.id = C;
    null != F && L.setAttribute('name', F);
    n && (L.setAttribute('checked', 'checked'), L.defaultChecked = !0);
    v && L.setAttribute('disabled', 'disabled');
    x && (d.appendChild(L), n = document.createElement('label'), mxUtils.write(n, g), n.setAttribute('for', C), d.appendChild(n), u || mxUtils.br(d));
    return L;
  };
  EditorUi.prototype.addEditButton = function(d, g) {
    var n = this.addCheckbox(d, mxResources.get('edit') + ':', !0, null, !0);
    n.style.marginLeft = '24px';
    var v = this.getCurrentFile(),
      u = '';
    null != v && v.getMode() != App.MODE_DEVICE && v.getMode() != App.MODE_BROWSER && (u = window.location.href);
    var x = document.createElement('select');
    x.style.maxWidth = '200px';
    x.style.width = 'auto';
    x.style.marginLeft = '8px';
    x.style.marginRight = '10px';
    x.className = 'geBtn';
    v = document.createElement('option');
    v.setAttribute('value', 'blank');
    mxUtils.write(v, mxResources.get('makeCopy'));
    x.appendChild(v);
    v = document.createElement('option');
    v.setAttribute('value', 'custom');
    mxUtils.write(v, mxResources.get('custom') + '...');
    x.appendChild(v);
    d.appendChild(x);
    mxEvent.addListener(x, 'change', mxUtils.bind(this, function() {
      if ('custom' == x.value) {
        var C = new FilenameDialog(this, u, mxResources.get('ok'), function(F) {
          null != F ? u = F : x.value = 'blank';
        }, mxResources.get('url'), null, null, null, null, function() {
          x.value = 'blank';
        });
        this.showDialog(C.container, 300, 80, !0, !1);
        C.init();
      }
    }));
    mxEvent.addListener(n, 'change', mxUtils.bind(this, function() {
      n.checked && (null == g || g.checked) ? x.removeAttribute('disabled') : x.setAttribute('disabled', 'disabled');
    }));
    mxUtils.br(d);
    return {
      getLink: function() {
        return n.checked ? 'blank' === x.value ? '_blank' : u : null;
      },
      getEditInput: function() {
        return n;
      },
      getEditSelect: function() {
        return x;
      }
    };
  };
  EditorUi.prototype.addLinkSection = function(d, g) {
    function n() {
      var F = document.createElement('div');
      F.style.width = '100%';
      F.style.height = '100%';
      F.style.boxSizing = 'border-box';
      null != x && x != mxConstants.NONE ? (F.style.border = '1px solid black', F.style.backgroundColor = x) : (F.style.backgroundPosition = 'center center', F.style.backgroundRepeat = 'no-repeat', F.style.backgroundImage = 'url(\'' + Dialog.prototype.closeImage + '\')');
      C.innerText = '';
      C.appendChild(F);
    }
    mxUtils.write(d, mxResources.get('links') + ':');
    var v = document.createElement('select');
    v.style.width = '100px';
    v.style.padding = '0px';
    v.style.marginLeft = '8px';
    v.style.marginRight = '10px';
    v.className = 'geBtn';
    var u = document.createElement('option');
    u.setAttribute('value', 'auto');
    mxUtils.write(u, mxResources.get('automatic'));
    v.appendChild(u);
    u = document.createElement('option');
    u.setAttribute('value', 'blank');
    mxUtils.write(u, mxResources.get('openInNewWindow'));
    v.appendChild(u);
    u = document.createElement('option');
    u.setAttribute('value', 'self');
    mxUtils.write(u, mxResources.get('openInThisWindow'));
    v.appendChild(u);
    g && (g = document.createElement('option'), g.setAttribute('value', 'frame'), mxUtils.write(g, mxResources.get('openInThisWindow') + ' (' + mxResources.get('iframe') + ')'), v.appendChild(g));
    d.appendChild(v);
    mxUtils.write(d, mxResources.get('borderColor') + ':');
    var x = '#0000ff',
      C = null;
    C = mxUtils.button('', mxUtils.bind(this, function(F) {
      this.pickColor(x || 'none', function(L) {
        x = L;
        n();
      });
      mxEvent.consume(F);
    }));
    n();
    C.style.padding = mxClient.IS_FF ? '4px 2px 4px 2px' : '4px';
    C.style.marginLeft = '4px';
    C.style.height = '22px';
    C.style.width = '22px';
    C.style.position = 'relative';
    C.style.top = mxClient.IS_IE || mxClient.IS_IE11 || mxClient.IS_EDGE ? '6px' : '1px';
    C.className = 'geColorBtn';
    d.appendChild(C);
    mxUtils.br(d);
    return {
      getColor: function() {
        return x;
      },
      getTarget: function() {
        return v.value;
      },
      focus: function() {
        v.focus();
      }
    };
  };
  EditorUi.prototype.createUrlParameters = function(d, g, n, v, u, x, C) {
    C = null != C ? C : [];
    v && ('https://viewer.diagrams.net' == EditorUi.lightboxHost && '1' != urlParams.dev || C.push('lightbox=1'), 'auto' != d && C.push('target=' + d), null != g && g != mxConstants.NONE && C.push('highlight=' + ('#' == g.charAt(0) ? g.substring(1) : g)), null != u && 0 < u.length && C.push('edit=' + encodeURIComponent(u)), x && C.push('layers=1'), this.editor.graph.foldingEnabled && C.push('nav=1'));
    n && null != this.currentPage && null != this.pages && this.currentPage != this.pages[0] && C.push('page-id=' + this.currentPage.getId());
    return C;
  };
  EditorUi.prototype.createLink = function(d, g, n, v, u, x, C, F, L, l) {
    L = this.createUrlParameters(d, g, n, v, u, x, L);
    d = this.getCurrentFile();
    g = !0;
    null != C ? n = '#U' + encodeURIComponent(C) : (d = this.getCurrentFile(), F || null == d || d.constructor != window.DriveFile ? n = '#R' + encodeURIComponent(n ? this.getFileData(!0, null, null, null, null, null, null, !0, null, !1) : Graph.compress(mxUtils.getXml(this.editor.getGraphXml()))) : (n = '#' + d.getHash(), g = !1));
    g && null != d && null != d.getTitle() && d.getTitle() != this.defaultFilename && L.push('title=' + encodeURIComponent(d.getTitle()));
    l && 1 < n.length && (L.push('open=' + n.substring(1)), n = '');
    return (v && '1' != urlParams.dev ? EditorUi.lightboxHost : mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || !/.*\.draw\.io$/.test(window.location.hostname) ? EditorUi.drawHost : 'https://' + window.location.host) + '/' + (0 < L.length ? '?' + L.join('&') : '') + n;
  };
  EditorUi.prototype.createHtml = function(d, g, n, v, u, x, C, F, L, l, q, A) {
    this.getBasenames();
    var H = {};
    '' != u && u != mxConstants.NONE && (H.highlight = u);
    'auto' !== v && (H.target = v);
    l || (H.lightbox = !1);
    H.nav = this.editor.graph.foldingEnabled;
    n = parseInt(n);
    isNaN(n) || 100 == n || (H.zoom = n / 100);
    n = [];
    C && (n.push('pages'), H.resize = !0, null != this.pages && null != this.currentPage && (H.page = mxUtils.indexOf(this.pages, this.currentPage)));
    g && (n.push('zoom'), H.resize = !0);
    F && n.push('layers');
    L && n.push('tags');
    0 < n.length && (l && n.push('lightbox'), H.toolbar = n.join(' '));
    null != q && 0 < q.length && (H.edit = q);
    null != d ? H.url = d : H.xml = this.getFileData(!0, null, null, null, null, !C);
    g = '<div class="mxgraph" style="' + (x ? 'max-width:100%;' : '') + ('' != n ? 'border:1px solid transparent;' : '') + '" data-mxgraph="' + mxUtils.htmlEntities(JSON.stringify(H)) + '"></div>';
    d = null != d ? '&fetch=' + encodeURIComponent(d) : '';
    A(g, '<script type="text/javascript" src="' + (0 < d.length ? ('1' == urlParams.dev ? 'https://test.draw.io/embed2.js?dev=1' : EditorUi.lightboxHost + '/embed2.js?') + d : '1' == urlParams.dev ? 'https://test.draw.io/js/viewer-static.min.js' : window.DRAWIO_VIEWER_URL ? window.DRAWIO_VIEWER_URL : EditorUi.lightboxHost + '/js/viewer-static.min.js') + '"></script>');
  };
  EditorUi.prototype.showHtmlDialog = function(d, g, n, v) {
    var u = document.createElement('div');
    u.style.whiteSpace = 'nowrap';
    var x = document.createElement('h3');
    mxUtils.write(x, mxResources.get('html'));
    x.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
    u.appendChild(x);
    var C = document.createElement('div');
    C.style.cssText = 'border-bottom:1px solid lightGray;padding-bottom:8px;margin-bottom:12px;';
    var F = document.createElement('input');
    F.style.cssText = 'margin-right:8px;margin-top:8px;margin-bottom:8px;';
    F.setAttribute('value', 'url');
    F.setAttribute('type', 'radio');
    F.setAttribute('name', 'type-embedhtmldialog');
    x = F.cloneNode(!0);
    x.setAttribute('value', 'copy');
    C.appendChild(x);
    var L = document.createElement('span');
    mxUtils.write(L, mxResources.get('includeCopyOfMyDiagram'));
    C.appendChild(L);
    mxUtils.br(C);
    C.appendChild(F);
    L = document.createElement('span');
    mxUtils.write(L, mxResources.get('publicDiagramUrl'));
    C.appendChild(L);
    var l = this.getCurrentFile();
    null == n && null != l && l.constructor == window.DriveFile && (L = document.createElement('a'), L.style.paddingLeft = '12px', L.style.color = 'gray', L.style.cursor = 'pointer', mxUtils.write(L, mxResources.get('share')), C.appendChild(L), mxEvent.addListener(L, 'click', mxUtils.bind(this, function() {
      this.hideDialog();
      this.drive.showPermissions(l.getId());
    })));
    x.setAttribute('checked', 'checked');
    null == n && F.setAttribute('disabled', 'disabled');
    u.appendChild(C);
    var q = this.addLinkSection(u),
      A = this.addCheckbox(u, mxResources.get('zoom'), !0, null, !0);
    mxUtils.write(u, ':');
    var H = document.createElement('input');
    H.setAttribute('type', 'text');
    H.style.marginRight = '16px';
    H.style.width = '60px';
    H.style.marginLeft = '4px';
    H.style.marginRight = '12px';
    H.value = '100%';
    u.appendChild(H);
    var K = this.addCheckbox(u, mxResources.get('fit'), !0);
    C = null != this.pages && 1 < this.pages.length;
    var M = M = this.addCheckbox(u, mxResources.get('allPages'), C, !C),
      I = this.addCheckbox(u, mxResources.get('layers'), !0),
      Q = this.addCheckbox(u, mxResources.get('tags'), !0),
      P = this.addCheckbox(u, mxResources.get('lightbox'), !0),
      O = null;
    C = 380;
    if (EditorUi.enableHtmlEditOption) {
      O = this.addEditButton(u, P);
      var W = O.getEditInput();
      W.style.marginBottom = '16px';
      C += 50;
      mxEvent.addListener(P, 'change', function() {
        P.checked ? W.removeAttribute('disabled') : W.setAttribute('disabled', 'disabled');
        W.checked && P.checked ? O.getEditSelect().removeAttribute('disabled') : O.getEditSelect().setAttribute('disabled', 'disabled');
      });
    }
    d = new CustomDialog(this, u, mxUtils.bind(this, function() {
      v(F.checked ? n : null, A.checked, H.value, q.getTarget(), q.getColor(), K.checked, M.checked, I.checked, Q.checked, P.checked, null != O ? O.getLink() : null);
    }), null, d, g);
    this.showDialog(d.container, 340, C, !0, !0);
    x.focus();
  };
  EditorUi.prototype.showPublishLinkDialog = function(d, g, n, v, u, x, C, F) {
    var L = document.createElement('div');
    L.style.whiteSpace = 'nowrap';
    var l = document.createElement('h3');
    mxUtils.write(l, d || mxResources.get('publish'));
    l.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
    L.appendChild(l);
    var q = this.getCurrentFile();
    d = 0;
    if (null == q || q.constructor != window.DriveFile || g)
      C = null != C ? C : 'https://www.diagrams.net/doc/faq/publish-diagram-as-link';
    else {
      d = 80;
      C = null != C ? C : 'https://www.diagrams.net/doc/faq/google-drive-publicly-publish-diagram';
      l = document.createElement('div');
      l.style.cssText = 'border-bottom:1px solid lightGray;padding-bottom:14px;padding-top:6px;margin-bottom:14px;text-align:center;';
      var A = document.createElement('div');
      A.style.whiteSpace = 'normal';
      mxUtils.write(A, mxResources.get('linkAccountRequired'));
      l.appendChild(A);
      A = mxUtils.button(mxResources.get('share'), mxUtils.bind(this, function() {
        this.drive.showPermissions(q.getId());
      }));
      A.style.marginTop = '12px';
      A.className = 'geBtn';
      l.appendChild(A);
      L.appendChild(l);
      A = document.createElement('a');
      A.style.paddingLeft = '12px';
      A.style.color = 'gray';
      A.style.fontSize = '11px';
      A.style.cursor = 'pointer';
      mxUtils.write(A, mxResources.get('check'));
      l.appendChild(A);
      mxEvent.addListener(A, 'click', mxUtils.bind(this, function() {
        this.spinner.spin(document.body, mxResources.get('loading')) && this.getPublicUrl(this.getCurrentFile(), mxUtils.bind(this, function(B) {
          this.spinner.stop();
          B = new ErrorDialog(this, null, mxResources.get(null != B ? 'diagramIsPublic' : 'diagramIsNotPublic'), mxResources.get('ok'));
          this.showDialog(B.container, 300, 80, !0, !1);
          B.init();
        }));
      }));
    }
    var H = null,
      K = null;
    if (null != n || null != v)
      d += 30, mxUtils.write(L, mxResources.get('width') + ':'), H = document.createElement('input'), H.setAttribute('type', 'text'), H.style.marginRight = '16px', H.style.width = '50px', H.style.marginLeft = '6px', H.style.marginRight = '16px', H.style.marginBottom = '10px', H.value = '100%', L.appendChild(H), mxUtils.write(L, mxResources.get('height') + ':'), K = document.createElement('input'), K.setAttribute('type', 'text'), K.style.width = '50px', K.style.marginLeft = '6px', K.style.marginBottom = '10px', K.value = v + 'px', L.appendChild(K), mxUtils.br(L);
    var M = this.addLinkSection(L, x);
    n = null != this.pages && 1 < this.pages.length;
    var I = null;
    if (null == q || q.constructor != window.DriveFile || g)
      I = this.addCheckbox(L, mxResources.get('allPages'), n, !n);
    var Q = this.addCheckbox(L, mxResources.get('lightbox'), !0, null, null, !x),
      P = this.addEditButton(L, Q),
      O = P.getEditInput();
    x && (O.style.marginLeft = Q.style.marginLeft, Q.style.display = 'none', d -= 20);
    var W = this.addCheckbox(L, mxResources.get('layers'), !0);
    W.style.marginLeft = O.style.marginLeft;
    W.style.marginTop = '8px';
    var p = this.addCheckbox(L, mxResources.get('tags'), !0);
    p.style.marginLeft = O.style.marginLeft;
    p.style.marginBottom = '16px';
    p.style.marginTop = '16px';
    mxEvent.addListener(Q, 'change', function() {
      Q.checked ? (W.removeAttribute('disabled'), O.removeAttribute('disabled')) : (W.setAttribute('disabled', 'disabled'), O.setAttribute('disabled', 'disabled'));
      O.checked && Q.checked ? P.getEditSelect().removeAttribute('disabled') : P.getEditSelect().setAttribute('disabled', 'disabled');
    });
    g = new CustomDialog(this, L, mxUtils.bind(this, function() {
      u(M.getTarget(), M.getColor(), null == I ? !0 : I.checked, Q.checked, P.getLink(), W.checked, null != H ? H.value : null, null != K ? K.value : null, p.checked);
    }), null, mxResources.get('create'), C, F);
    this.showDialog(g.container, 340, 300 + d, !0, !0);
    null != H ? (H.focus(), mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? H.select() : document.execCommand('selectAll', !1, null)) : M.focus();
  };
  EditorUi.prototype.showRemoteExportDialog = function(d, g, n, v, u) {
    var x = document.createElement('div');
    x.style.whiteSpace = 'nowrap';
    var C = document.createElement('h3');
    mxUtils.write(C, mxResources.get('image'));
    C.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:' + (u ? '10' : '4') + 'px';
    x.appendChild(C);
    if (u) {
      mxUtils.write(x, mxResources.get('zoom') + ':');
      var F = document.createElement('input');
      F.setAttribute('type', 'text');
      F.style.marginRight = '16px';
      F.style.width = '60px';
      F.style.marginLeft = '4px';
      F.style.marginRight = '12px';
      F.value = this.lastExportZoom || '100%';
      x.appendChild(F);
      mxUtils.write(x, mxResources.get('borderWidth') + ':');
      var L = document.createElement('input');
      L.setAttribute('type', 'text');
      L.style.marginRight = '16px';
      L.style.width = '60px';
      L.style.marginLeft = '4px';
      L.value = this.lastExportBorder || '0';
      x.appendChild(L);
      mxUtils.br(x);
    }
    var l = this.addCheckbox(x, mxResources.get('selectionOnly'), !1, this.editor.graph.isSelectionEmpty()),
      q = v ? null : this.addCheckbox(x, mxResources.get('includeCopyOfMyDiagram'), Editor.defaultIncludeDiagram);
    C = this.editor.graph;
    var A = v ? null : this.addCheckbox(x, mxResources.get('transparentBackground'), C.background == mxConstants.NONE || null == C.background);
    null != A && (A.style.marginBottom = '16px');
    d = new CustomDialog(this, x, mxUtils.bind(this, function() {
      var H = parseInt(F.value) / 100 || 1,
        K = parseInt(L.value) || 0;
      n(!l.checked, null != q ? q.checked : !1, null != A ? A.checked : !1, H, K);
    }), null, d, g);
    this.showDialog(d.container, 300, (u ? 25 : 0) + (v ? 125 : 210), !0, !0);
  };
  EditorUi.prototype.showExportDialog = function(d, g, n, v, u, x, C, F, L) {
    C = null != C ? C : Editor.defaultIncludeDiagram;
    var l = document.createElement('div');
    l.style.whiteSpace = 'nowrap';
    var q = this.editor.graph,
      A = 'jpeg' == F ? 220 : 300,
      H = document.createElement('h3');
    mxUtils.write(H, d);
    H.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:10px';
    l.appendChild(H);
    mxUtils.write(l, mxResources.get('zoom') + ':');
    var K = document.createElement('input');
    K.setAttribute('type', 'text');
    K.style.marginRight = '16px';
    K.style.width = '60px';
    K.style.marginLeft = '4px';
    K.style.marginRight = '12px';
    K.value = this.lastExportZoom || '100%';
    l.appendChild(K);
    mxUtils.write(l, mxResources.get('borderWidth') + ':');
    var M = document.createElement('input');
    M.setAttribute('type', 'text');
    M.style.marginRight = '16px';
    M.style.width = '60px';
    M.style.marginLeft = '4px';
    M.value = this.lastExportBorder || '0';
    l.appendChild(M);
    mxUtils.br(l);
    var I = this.addCheckbox(l, mxResources.get('selectionOnly'), !1, q.isSelectionEmpty()),
      Q = document.createElement('input');
    Q.style.marginTop = '16px';
    Q.style.marginRight = '8px';
    Q.style.marginLeft = '24px';
    Q.setAttribute('disabled', 'disabled');
    Q.setAttribute('type', 'checkbox');
    var P = document.createElement('select');
    P.style.marginTop = '16px';
    P.style.marginLeft = '8px';
    d = [
      'selectionOnly',
      'diagram',
      'page'
    ];
    var O = {};
    for (H = 0; H < d.length; H++)
      if (!q.isSelectionEmpty() || 'selectionOnly' != d[H]) {
        var W = document.createElement('option');
        mxUtils.write(W, mxResources.get(d[H]));
        W.setAttribute('value', d[H]);
        P.appendChild(W);
        O[d[H]] = W;
      }
    L ? (mxUtils.write(l, mxResources.get('size') + ':'), l.appendChild(P), mxUtils.br(l), A += 26, mxEvent.addListener(P, 'change', function() {
      'selectionOnly' == P.value && (I.checked = !0);
    })) : x && (l.appendChild(Q), mxUtils.write(l, mxResources.get('crop')), mxUtils.br(l), A += 30, mxEvent.addListener(I, 'change', function() {
      I.checked ? Q.removeAttribute('disabled') : Q.setAttribute('disabled', 'disabled');
    }));
    q.isSelectionEmpty() ? L && (I.style.display = 'none', I.nextSibling.style.display = 'none', I.nextSibling.nextSibling.style.display = 'none', A -= 30) : (P.value = 'diagram', Q.setAttribute('checked', 'checked'), Q.defaultChecked = !0, mxEvent.addListener(I, 'change', function() {
      P.value = I.checked ? 'selectionOnly' : 'diagram';
    }));
    var p = this.addCheckbox(l, mxResources.get('transparentBackground'), !1, null, null, 'jpeg' != F),
      B = null;
    Editor.isDarkMode() && (B = this.addCheckbox(l, mxResources.get('dark'), !0), A += 26);
    var N = this.addCheckbox(l, mxResources.get('shadow'), q.shadowVisible),
      S = null;
    if ('png' == F || 'jpeg' == F)
      S = this.addCheckbox(l, mxResources.get('grid'), !1, this.isOffline() || !this.canvasSupported, !1, !0), A += 30;
    var R = this.addCheckbox(l, mxResources.get('includeCopyOfMyDiagram'), C, null, null, 'jpeg' != F);
    R.style.marginBottom = '16px';
    var V = document.createElement('input');
    V.style.marginBottom = '16px';
    V.style.marginRight = '8px';
    V.setAttribute('type', 'checkbox');
    !this.isOffline() && this.canvasSupported || V.setAttribute('disabled', 'disabled');
    var T = document.createElement('select');
    T.style.maxWidth = '260px';
    T.style.marginLeft = '8px';
    T.style.marginBottom = '16px';
    x = document.createElement('option');
    x.setAttribute('value', 'none');
    mxUtils.write(x, mxResources.get('default'));
    T.appendChild(x);
    x = document.createElement('option');
    x.setAttribute('value', 'embedFonts');
    mxUtils.write(x, mxResources.get('embedFonts'));
    T.appendChild(x);
    x = document.createElement('option');
    x.setAttribute('value', 'lblToSvg');
    mxUtils.write(x, mxResources.get('lblToSvg'));
    this.isOffline() || EditorUi.isElectronApp || T.appendChild(x);
    mxEvent.addListener(T, 'change', mxUtils.bind(this, function() {
      'lblToSvg' == T.value ? (V.checked = !0, V.setAttribute('disabled', 'disabled'), O.page.style.display = 'none', 'page' == P.value && (P.value = 'diagram'), N.checked = !1, N.setAttribute('disabled', 'disabled'), X.style.display = 'inline-block', U.style.display = 'none') : 'disabled' == V.getAttribute('disabled') && (V.checked = !1, V.removeAttribute('disabled'), N.removeAttribute('disabled'), O.page.style.display = '', X.style.display = 'none', U.style.display = '');
    }));
    g && (l.appendChild(V), mxUtils.write(l, mxResources.get('embedImages')), mxUtils.br(l), mxUtils.write(l, mxResources.get('txtSettings') + ':'), l.appendChild(T), mxUtils.br(l), A += 60);
    var U = document.createElement('select');
    U.style.maxWidth = '260px';
    U.style.marginLeft = '8px';
    g = document.createElement('option');
    g.setAttribute('value', 'auto');
    mxUtils.write(g, mxResources.get('automatic'));
    U.appendChild(g);
    g = document.createElement('option');
    g.setAttribute('value', 'blank');
    mxUtils.write(g, mxResources.get('openInNewWindow'));
    U.appendChild(g);
    g = document.createElement('option');
    g.setAttribute('value', 'self');
    mxUtils.write(g, mxResources.get('openInThisWindow'));
    U.appendChild(g);
    var X = document.createElement('div');
    mxUtils.write(X, mxResources.get('LinksLost'));
    X.style.margin = '7px';
    X.style.display = 'none';
    'svg' == F && (mxUtils.write(l, mxResources.get('links') + ':'), l.appendChild(U), l.appendChild(X), mxUtils.br(l), mxUtils.br(l), A += 50);
    n = new CustomDialog(this, l, mxUtils.bind(this, function() {
      this.lastExportBorder = M.value;
      this.lastExportZoom = K.value;
      u(K.value, p.checked, !I.checked, N.checked, R.checked, V.checked, M.value, Q.checked, !1, U.value, null != S ? S.checked : null, null != B ? B.checked : null, P.value, 'embedFonts' == T.value, 'lblToSvg' == T.value);
    }), null, n, v);
    this.showDialog(n.container, 340, A, !0, !0, null, null, null, null, !0);
    K.focus();
    mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? K.select() : document.execCommand('selectAll', !1, null);
  };
  EditorUi.prototype.showEmbedImageDialog = function(d, g, n, v, u) {
    var x = document.createElement('div');
    x.style.whiteSpace = 'nowrap';
    var C = this.editor.graph;
    if (null != g) {
      var F = document.createElement('h3');
      mxUtils.write(F, g);
      F.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
      x.appendChild(F);
    }
    var L = this.addCheckbox(x, mxResources.get('fit'), !0),
      l = this.addCheckbox(x, mxResources.get('shadow'), C.shadowVisible && v, !v),
      q = this.addCheckbox(x, n),
      A = this.addCheckbox(x, mxResources.get('lightbox'), !0),
      H = this.addEditButton(x, A),
      K = H.getEditInput(),
      M = 1 < C.model.getChildCount(C.model.getRoot()),
      I = this.addCheckbox(x, mxResources.get('layers'), M, !M);
    I.style.marginLeft = K.style.marginLeft;
    I.style.marginBottom = '12px';
    I.style.marginTop = '8px';
    mxEvent.addListener(A, 'change', function() {
      A.checked ? (M && I.removeAttribute('disabled'), K.removeAttribute('disabled')) : (I.setAttribute('disabled', 'disabled'), K.setAttribute('disabled', 'disabled'));
      K.checked && A.checked ? H.getEditSelect().removeAttribute('disabled') : H.getEditSelect().setAttribute('disabled', 'disabled');
    });
    g = new CustomDialog(this, x, mxUtils.bind(this, function() {
      d(L.checked, l.checked, q.checked, A.checked, H.getLink(), I.checked);
    }), null, mxResources.get('embed'), u);
    this.showDialog(g.container, 280, 300, !0, !0);
  };
  EditorUi.prototype.createEmbedImage = function(d, g, n, v, u, x, C, F) {
    function L(K) {
      var M = ' ',
        I = '';
      v && (M = ' onclick="(function(img){if(img.wnd!=null&&!img.wnd.closed){img.wnd.focus();}else{var r=function(evt){if(evt.data==\'ready\'&&evt.source==img.wnd){img.wnd.postMessage(decodeURIComponent(img.getAttribute(\'src\')),\'*\');window.removeEventListener(\'message\',r);}};window.addEventListener(\'message\',r);img.wnd=window.open(\'' + EditorUi.lightboxHost + '/?client=1' + (null != q ? '&page=' + q : '') + (u ? '&edit=_blank' : '') + (x ? '&layers=1' : '') + '\');}})(this);"', I += 'cursor:pointer;');
      d && (I += 'max-width:100%;');
      var Q = '';
      n && (Q = ' width="' + Math.round(l.width) + '" height="' + Math.round(l.height) + '"');
      C('<img src="' + K + '"' + Q + ('' != I ? ' style="' + I + '"' : '') + M + '/>');
    }
    var l = this.editor.graph.getGraphBounds(),
      q = this.getSelectedPageIndex();
    if (this.isExportToCanvas())
      this.editor.exportToCanvas(mxUtils.bind(this, function(K) {
        var M = v ? this.getFileData(!0) : null;
        K = this.createImageDataUri(K, M, 'png');
        L(K);
      }), null, null, null, mxUtils.bind(this, function(K) {
        F({
          message: mxResources.get('unknownError')
        });
      }), null, !0, n ? 2 : 1, null, g, null, null, Editor.defaultBorder);
    else if (g = this.getFileData(!0), l.width * l.height <= MAX_AREA && g.length <= MAX_REQUEST_SIZE) {
      var A = '';
      n && (A = '&w=' + Math.round(2 * l.width) + '&h=' + Math.round(2 * l.height));
      var H = new mxXmlRequest(EXPORT_URL, 'format=png&base64=1&embedXml=' + (v ? '1' : '0') + A + '&xml=' + encodeURIComponent(g));
      H.send(mxUtils.bind(this, function() {
        200 <= H.getStatus() && 299 >= H.getStatus() ? L('data:image/png;base64,' + H.getText()) : F({
          message: mxResources.get('unknownError')
        });
      }));
    } else
      F({
        message: mxResources.get('drawingTooLarge')
      });
  };
  EditorUi.prototype.createEmbedSvg = function(d, g, n, v, u, x, C) {
    var F = this.editor.graph.getSvg(null, null, null, null, null, null, null, null, null, null, !n),
      L = F.getElementsByTagName('a');
    if (null != L)
      for (var l = 0; l < L.length; l++) {
        var q = L[l].getAttribute('href');
        null != q && '#' == q.charAt(0) && '_blank' == L[l].getAttribute('target') && L[l].removeAttribute('target');
      }
    v && F.setAttribute('content', this.getFileData(!0));
    g && this.editor.graph.addSvgShadow(F);
    if (n) {
      var A = ' ',
        H = '';
      v && (A = 'onclick="(function(img){if(img.wnd!=null&&!img.wnd.closed){img.wnd.focus();}else{var r=function(evt){if(evt.data==\'ready\'&&evt.source==img.wnd){img.wnd.postMessage(decodeURIComponent(img.getAttribute(\'src\')),\'*\');window.removeEventListener(\'message\',r);}};window.addEventListener(\'message\',r);img.wnd=window.open(\'' + EditorUi.lightboxHost + '/?client=1' + (u ? '&edit=_blank' : '') + (x ? '&layers=1' : '') + '\');}})(this);"', H += 'cursor:pointer;');
      d && (H += 'max-width:100%;');
      this.editor.convertImages(F, mxUtils.bind(this, function(K) {
        C('<img src="' + Editor.createSvgDataUri(mxUtils.getXml(K)) + '"' + ('' != H ? ' style="' + H + '"' : '') + A + '/>');
      }));
    } else
      H = '', v && (g = this.getSelectedPageIndex(), F.setAttribute('onclick', '(function(svg){var src=window.event.target||window.event.srcElement;while (src!=null&&src.nodeName.toLowerCase()!=\'a\'){src=src.parentNode;}if(src==null){if(svg.wnd!=null&&!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){if(evt.data==\'ready\'&&evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(svg.getAttribute(\'content\')),\'*\');window.removeEventListener(\'message\',r);}};window.addEventListener(\'message\',r);svg.wnd=window.open(\'' + EditorUi.lightboxHost + '/?client=1' + (null != g ? '&page=' + g : '') + (u ? '&edit=_blank' : '') + (x ? '&layers=1' : '') + '\');}}})(this);'), H += 'cursor:pointer;'), d && (d = parseInt(F.getAttribute('width')), u = parseInt(F.getAttribute('height')), F.setAttribute('viewBox', '-0.5 -0.5 ' + d + ' ' + u), H += 'max-width:100%;max-height:' + u + 'px;', F.removeAttribute('height')), '' != H && F.setAttribute('style', H), this.editor.addFontCss(F), this.editor.graph.mathEnabled && this.editor.addMathCss(F), C(mxUtils.getXml(F));
  };
  EditorUi.prototype.timeSince = function(d) {
    d = Math.floor((new Date() - d) / 1000);
    var g = Math.floor(d / 31536000);
    if (1 < g)
      return g + ' ' + mxResources.get('years');
    g = Math.floor(d / 2592000);
    if (1 < g)
      return g + ' ' + mxResources.get('months');
    g = Math.floor(d / 86400);
    if (1 < g)
      return g + ' ' + mxResources.get('days');
    g = Math.floor(d / 3600);
    if (1 < g)
      return g + ' ' + mxResources.get('hours');
    g = Math.floor(d / 60);
    return 1 < g ? g + ' ' + mxResources.get('minutes') : 1 == g ? g + ' ' + mxResources.get('minute') : null;
  };
  EditorUi.prototype.decodeNodeIntoGraph = function(d, g) {
    if (null != d) {
      var n = null;
      if ('diagram' == d.nodeName)
        n = d;
      else if ('mxfile' == d.nodeName) {
        var v = d.getElementsByTagName('diagram');
        if (0 < v.length) {
          n = v[0];
          var u = g.getGlobalVariable;
          g.getGlobalVariable = function(x) {
            return 'page' == x ? n.getAttribute('name') || mxResources.get('pageWithNumber', [1]) : 'pagenumber' == x ? 1 : u.apply(this, arguments);
          };
        }
      }
      null != n && (d = Editor.parseDiagramNode(n));
    }
    v = this.editor.graph;
    try {
      this.editor.graph = g, this.editor.setGraphXml(d);
    } catch (x) {} finally {
      this.editor.graph = v;
    }
    return d;
  };
  EditorUi.prototype.getPngFileProperties = function(d) {
    var g = 1,
      n = 0;
    if (null != d) {
      if (d.hasAttribute('scale')) {
        var v = parseFloat(d.getAttribute('scale'));
        !isNaN(v) && 0 < v && (g = v);
      }
      d.hasAttribute('border') && (v = parseInt(d.getAttribute('border')), !isNaN(v) && 0 < v && (n = v));
    }
    return {
      scale: g,
      border: n
    };
  };
  EditorUi.prototype.getEmbeddedPng = function(d, g, n, v, u) {
    try {
      var x = this.editor.graph,
        C = null != x.themes && 'darkTheme' == x.defaultThemeName,
        F = null;
      if (null != n && 0 < n.length)
        x = this.createTemporaryGraph(C ? x.getDefaultStylesheet() : x.getStylesheet()), document.body.appendChild(x.container), this.decodeNodeIntoGraph(this.editor.extractGraphModel(mxUtils.parseXml(n).documentElement, !0), x), F = n;
      else if (C || null != this.pages && this.currentPage != this.pages[0]) {
        x = this.createTemporaryGraph(C ? x.getDefaultStylesheet() : x.getStylesheet());
        var L = x.getGlobalVariable;
        x.setBackgroundImage = this.editor.graph.setBackgroundImage;
        var l = this.pages[0];
        this.currentPage == l ? x.setBackgroundImage(this.editor.graph.backgroundImage) : null != l.viewState && null != l.viewState && x.setBackgroundImage(l.viewState.backgroundImage);
        x.getGlobalVariable = function(q) {
          return 'page' == q ? l.getName() : 'pagenumber' == q ? 1 : L.apply(this, arguments);
        };
        document.body.appendChild(x.container);
        x.model.setRoot(l.root);
      }
      this.editor.exportToCanvas(mxUtils.bind(this, function(q) {
        try {
          null == F && (F = this.getFileData(!0, null, null, null, null, null, null, null, null, !1));
          var A = q.toDataURL('image/png');
          A = Editor.writeGraphModelToPng(A, 'tEXt', 'mxfile', encodeURIComponent(F));
          d(A.substring(A.lastIndexOf(',') + 1));
          x != this.editor.graph && x.container.parentNode.removeChild(x.container);
        } catch (H) {
          null != g && g(H);
        }
      }), null, null, null, mxUtils.bind(this, function(q) {
        null != g && g(q);
      }), null, null, v, null, x.shadowVisible, null, x, u, null, null, null, 'diagram', null);
    } catch (q) {
      null != g && g(q);
    }
  };
  EditorUi.prototype.getEmbeddedSvg = function(d, g, n, v, u, x, C, F, L, l, q, A, H) {
    F = null != F ? F : !0;
    q = null != q ? q : 0;
    C = null != L ? L : g.background;
    C == mxConstants.NONE && (C = null);
    x = g.getSvg(C, l, q, null, null, x, null, null, null, g.shadowVisible || A, null, H, 'diagram');
    (g.shadowVisible || A) && g.addSvgShadow(x, null, null, 0 == q);
    null != d && x.setAttribute('content', d);
    null != n && x.setAttribute('resource', n);
    var K = mxUtils.bind(this, function(M) {
      M = (v ? '' : Graph.xmlDeclaration + '\n' + Graph.svgFileComment + '\n' + Graph.svgDoctype + '\n') + mxUtils.getXml(M);
      null != u && u(M);
      return M;
    });
    g.mathEnabled && this.editor.addMathCss(x);
    if (null != u)
      this.embedFonts(x, mxUtils.bind(this, function(M) {
        F ? this.editor.convertImages(M, mxUtils.bind(this, function(I) {
          K(I);
        })) : K(M);
      }));
    else
      return K(x);
  };
  EditorUi.prototype.embedFonts = function(d, g) {
    this.editor.loadFonts(mxUtils.bind(this, function() {
      try {
        null != this.editor.resolvedFontCss && this.editor.addFontCss(d, this.editor.resolvedFontCss), this.editor.embedExtFonts(mxUtils.bind(this, function(n) {
          try {
            null != n && this.editor.addFontCss(d, n), g(d);
          } catch (v) {
            g(d);
          }
        }));
      } catch (n) {
        g(d);
      }
    }));
  };
  EditorUi.prototype.exportImage = function(d, g, n, v, u, x, C, F, L, l, q, A, H) {
    L = null != L ? L : 'png';
    if (this.spinner.spin(document.body, mxResources.get('exporting'))) {
      var K = this.editor.graph.isSelectionEmpty();
      n = null != n ? n : K;
      null == this.thumbImageCache && (this.thumbImageCache = {});
      try {
        this.editor.exportToCanvas(mxUtils.bind(this, function(M) {
          this.spinner.stop();
          try {
            this.saveCanvas(M, u ? this.getFileData(!0, null, null, null, n, F) : null, L, null == this.pages || 0 == this.pages.length, q);
          } catch (I) {
            this.handleError(I);
          }
        }), null, this.thumbImageCache, null, mxUtils.bind(this, function(M) {
          this.spinner.stop();
          this.handleError(M);
        }), null, n, d || 1, g, v, null, null, x, C, l, A, H);
      } catch (M) {
        this.spinner.stop(), this.handleError(M);
      }
    }
  };
  EditorUi.prototype.isCorsEnabledForUrl = function(d) {
    return this.editor.isCorsEnabledForUrl(d);
  };
  EditorUi.prototype.importXml = function(d, g, n, v, u, x, C) {
    g = null != g ? g : 0;
    n = null != n ? n : 0;
    var F = [];
    try {
      var L = this.editor.graph;
      if (null != d && 0 < d.length) {
        L.model.beginUpdate();
        try {
          var l = mxUtils.parseXml(d);
          d = {};
          var q = this.editor.extractGraphModel(l.documentElement, null != this.pages);
          if (null != q && 'mxfile' == q.nodeName && null != this.pages) {
            var A = q.getElementsByTagName('diagram');
            if (1 == A.length && !x) {
              if (q = Editor.parseDiagramNode(A[0]), null != this.currentPage && (d[A[0].getAttribute('id')] = this.currentPage.getId(), this.isBlankFile())) {
                var H = A[0].getAttribute('name');
                null != H && '' != H && this.editor.graph.model.execute(new RenamePage(this, this.currentPage, H));
              }
            } else if (0 < A.length) {
              x = [];
              var K = 0;
              null != this.pages && 1 == this.pages.length && this.isDiagramEmpty() && (d[A[0].getAttribute('id')] = this.pages[0].getId(), q = Editor.parseDiagramNode(A[0]), v = !1, K = 1);
              for (; K < A.length; K++) {
                var M = A[K].getAttribute('id');
                A[K].removeAttribute('id');
                var I = this.updatePageRoot(new DiagramPage(A[K]));
                d[M] = A[K].getAttribute('id');
                var Q = this.pages.length;
                null == I.getName() && I.setName(mxResources.get('pageWithNumber', [Q + 1]));
                L.model.execute(new ChangePage(this, I, I, Q, !0));
                x.push(I);
              }
              this.updatePageLinks(d, x);
            }
          }
          if (null != q && 'mxGraphModel' === q.nodeName) {
            F = L.importGraphModel(q, g, n, v);
            if (null != F)
              for (K = 0; K < F.length; K++)
                this.updatePageLinksForCell(d, F[K]);
            var P = L.parseBackgroundImage(q.getAttribute('backgroundImage'));
            if (null != P && null != P.originalSrc) {
              this.updateBackgroundPageLink(d, P);
              var O = new ChangePageSetup(this, null, P);
              O.ignoreColor = !0;
              L.model.execute(O);
            }
          }
          C && this.insertHandler(F, null, null, L.defaultVertexStyle, L.defaultEdgeStyle, !1, !0);
        } finally {
          L.model.endUpdate();
        }
      }
    } catch (W) {
      if (u)
        throw W;
      this.handleError(W);
    }
    return F;
  };
  EditorUi.prototype.updatePageLinks = function(d, g) {
    for (var n = 0; n < g.length; n++)
      this.updatePageLinksForCell(d, g[n].root), null != g[n].viewState && this.updateBackgroundPageLink(d, g[n].viewState.backgroundImage);
  };
  EditorUi.prototype.updateBackgroundPageLink = function(d, g) {
    try {
      if (null != g && Graph.isPageLink(g.originalSrc)) {
        var n = d[g.originalSrc.substring(g.originalSrc.indexOf(',') + 1)];
        null != n && (g.originalSrc = 'data:page/id,' + n);
      }
    } catch (v) {}
  };
  EditorUi.prototype.updatePageLinksForCell = function(d, g) {
    var n = document.createElement('div'),
      v = this.editor.graph,
      u = v.getLinkForCell(g);
    null != u && v.setLinkForCell(g, this.updatePageLink(d, u));
    if (v.isHtmlLabel(g)) {
      n.innerHTML = Graph.sanitizeHtml(v.getLabel(g));
      for (var x = n.getElementsByTagName('a'), C = !1, F = 0; F < x.length; F++)
        u = x[F].getAttribute('href'), null != u && (x[F].setAttribute('href', this.updatePageLink(d, u)), C = !0);
      C && v.labelChanged(g, n.innerHTML);
    }
    for (F = 0; F < v.model.getChildCount(g); F++)
      this.updatePageLinksForCell(d, v.model.getChildAt(g, F));
  };
  EditorUi.prototype.updatePageLink = function(d, g) {
    if (Graph.isPageLink(g)) {
      var n = d[g.substring(g.indexOf(',') + 1)];
      g = null != n ? 'data:page/id,' + n : null;
    } else if ('data:action/json,' == g.substring(0, 17))
      try {
        var v = JSON.parse(g.substring(17));
        if (null != v.actions) {
          for (var u = 0; u < v.actions.length; u++) {
            var x = v.actions[u];
            if (null != x.open && Graph.isPageLink(x.open)) {
              var C = x.open.substring(x.open.indexOf(',') + 1);
              n = d[C];
              null != n ? x.open = 'data:page/id,' + n : null == this.getPageById(C) && delete x.open;
            }
          }
          g = 'data:action/json,' + JSON.stringify(v);
        }
      } catch (F) {}
    return g;
  };
  EditorUi.prototype.isRemoteVisioFormat = function(d) {
    return /(\.v(sd|dx))($|\?)/i.test(d) || /(\.vs(s|x))($|\?)/i.test(d);
  };
  EditorUi.prototype.importVisio = function(d, g, n, v, u) {
    v = null != v ? v : d.name;
    n = null != n ? n : mxUtils.bind(this, function(C) {
      this.handleError(C);
    });
    var x = mxUtils.bind(this, function() {
      this.loadingExtensions = !1;
      if (this.doImportVisio) {
        var C = this.isRemoteVisioFormat(v);
        try {
          var F = 'UNKNOWN-VISIO',
            L = v.lastIndexOf('.');
          if (0 <= L && L < v.length)
            F = v.substring(L + 1).toUpperCase();
          else {
            var l = v.lastIndexOf('/');
            0 <= l && l < v.length && (v = v.substring(l + 1));
          }
          EditorUi.logEvent({
            category: F + '-MS-IMPORT-FILE',
            action: 'filename_' + v,
            label: C ? 'remote' : 'local'
          });
        } catch (A) {}
        if (C)
          if (null == VSD_CONVERT_URL || this.isOffline())
            n({
              message: 'draw.io' != this.getServiceName() ? mxResources.get('vsdNoConfig') : mxResources.get('serviceUnavailableOrBlocked')
            });
          else {
            C = new FormData();
            C.append('file1', d, v);
            var q = new XMLHttpRequest();
            q.open('POST', VSD_CONVERT_URL + (/(\.vss|\.vsx)$/.test(v) ? '?stencil=1' : ''));
            q.responseType = 'blob';
            this.addRemoteServiceSecurityCheck(q);
            null != u && q.setRequestHeader('x-convert-custom', u);
            q.onreadystatechange = mxUtils.bind(this, function() {
              if (4 == q.readyState)
                if (200 <= q.status && 299 >= q.status)
                  try {
                    var A = q.response;
                    if ('text/xml' == A.type) {
                      var H = new FileReader();
                      H.onload = mxUtils.bind(this, function(K) {
                        try {
                          g(K.target.result);
                        } catch (M) {
                          n({
                            message: mxResources.get('errorLoadingFile')
                          });
                        }
                      });
                      H.readAsText(A);
                    } else
                      this.doImportVisio(A, g, n, v);
                  } catch (K) {
                    n(K);
                  }
              else
                try {
                  '' == q.responseType || 'text' == q.responseType ? n({
                    message: q.responseText
                  }) : (H = new FileReader(), H.onload = function() {
                    n({
                      message: JSON.parse(H.result).Message
                    });
                  }, H.readAsText(q.response));
                } catch (K) {
                  n({});
                }
            });
            q.send(C);
          }
        else
          try {
            this.doImportVisio(d, g, n, v);
          } catch (A) {
            n(A);
          }
      } else
        this.spinner.stop(), this.handleError({
          message: mxResources.get('serviceUnavailableOrBlocked')
        });
    });
    this.doImportVisio || this.loadingExtensions || this.isOffline(!0) ? x() : (this.loadingExtensions = !0, mxscript('js/extensions.min.js', x));
  };
  EditorUi.prototype.importGraphML = function(d, g, n) {
    n = null != n ? n : mxUtils.bind(this, function(u) {
      this.handleError(u);
    });
    var v = mxUtils.bind(this, function() {
      this.loadingExtensions = !1;
      if (this.doImportGraphML)
        try {
          this.doImportGraphML(d, g, n);
        } catch (u) {
          n(u);
        }
      else
        this.spinner.stop(), this.handleError({
          message: mxResources.get('serviceUnavailableOrBlocked')
        });
    });
    this.doImportGraphML || this.loadingExtensions || this.isOffline(!0) ? v() : (this.loadingExtensions = !0, mxscript('js/extensions.min.js', v));
  };
  EditorUi.prototype.exportVisio = function(d) {
    var g = mxUtils.bind(this, function() {
      this.loadingExtensions = !1;
      if ('undefined' !== typeof VsdxExport)
        try {
          new VsdxExport(this).exportCurrentDiagrams(d) || this.handleError({
            message: mxResources.get('unknownError')
          });
        } catch (n) {
          this.handleError(n);
        }
      else
        this.spinner.stop(), this.handleError({
          message: mxResources.get('serviceUnavailableOrBlocked')
        });
    });
    'undefined' !== typeof VsdxExport || this.loadingExtensions || this.isOffline(!0) ? g() : (this.loadingExtensions = !0, mxscript('js/extensions.min.js', g));
  };
  EditorUi.prototype.convertLucidChart = function(d, g, n) {
    var v = mxUtils.bind(this, function() {
      this.loadingExtensions = !1;
      if ('undefined' !== typeof window.LucidImporter)
        try {
          var u = JSON.parse(d);
          g(LucidImporter.importState(u));
          try {
            if (EditorUi.logEvent({
                category: 'LUCIDCHART-IMPORT-FILE',
                action: 'size_' + d.length
              }), null != window.console && '1' == urlParams.test) {
              var x = [
                new Date().toISOString(),
                'convertLucidChart',
                u
              ];
              null != u.state && x.push(JSON.parse(u.state));
              if (null != u.svgThumbs)
                for (var C = 0; C < u.svgThumbs.length; C++)
                  x.push(Editor.createSvgDataUri(u.svgThumbs[C]));
              null != u.thumb && x.push(u.thumb);
              console.log.apply(console, x);
            }
          } catch (F) {}
        } catch (F) {
          null != window.console && console.error(F), n(F);
        }
      else
        n({
          message: mxResources.get('serviceUnavailableOrBlocked')
        });
    });
    'undefined' !== typeof window.LucidImporter || this.loadingExtensions || this.isOffline(!0) ? window.setTimeout(v, 0) : (this.loadingExtensions = !0, '1' == urlParams.dev ? mxscript('js/diagramly/Extensions.js', function() {
      mxscript('js/orgchart/bridge.min.js', function() {
        mxscript('js/orgchart/bridge.collections.min.js', function() {
          mxscript('js/orgchart/OrgChart.Layout.min.js', function() {
            mxscript('js/orgchart/mxOrgChartLayout.js', v);
          });
        });
      });
    }) : mxscript('js/extensions.min.js', v));
  };
  EditorUi.prototype.generateMermaidImage = function(d, g, n, v) {
    var u = this,
      x = function() {
        try {
          this.loadingMermaid = !1, g = null != g ? g : mxUtils.clone(EditorUi.defaultMermaidConfig), g.securityLevel = 'strict', g.startOnLoad = !1, Editor.isDarkMode() && (g.theme = 'dark'), mermaid.mermaidAPI.initialize(g), mermaid.mermaidAPI.render('geMermaidOutput-' + new Date().getTime(), d, function(C) {
            try {
              if (mxClient.IS_IE || mxClient.IS_IE11)
                C = C.replace(/ xmlns:\S*="http:\/\/www.w3.org\/XML\/1998\/namespace"/g, '').replace(/ (NS xml|\S*):space="preserve"/g, ' xml:space="preserve"');
              var F = mxUtils.parseXml(C).getElementsByTagName('svg');
              if (0 < F.length) {
                var L = parseFloat(F[0].getAttribute('width')),
                  l = parseFloat(F[0].getAttribute('height'));
                if (isNaN(L) || isNaN(l))
                  try {
                    var q = F[0].getAttribute('viewBox').split(/\s+/);
                    L = parseFloat(q[2]);
                    l = parseFloat(q[3]);
                  } catch (A) {
                    L = L || 100, l = l || 100;
                  }
                n(u.convertDataUri(Editor.createSvgDataUri(C)), L, l);
              } else
                v({
                  message: mxResources.get('invalidInput')
                });
            } catch (A) {
              v(A);
            }
          });
        } catch (C) {
          v(C);
        }
      };
    'undefined' !== typeof mermaid || this.loadingMermaid || this.isOffline(!0) ? x() : (this.loadingMermaid = !0, '1' == urlParams.dev ? mxscript('js/mermaid/mermaid.min.js', x) : mxscript('js/extensions.min.js', x));
  };
  EditorUi.prototype.generatePlantUmlImage = function(d, g, n, v) {
    function u(F, L, l) {
      c1 = F >> 2;
      c2 = (F & 3) << 4 | L >> 4;
      c3 = (L & 15) << 2 | l >> 6;
      c4 = l & 63;
      r = '';
      r += x(c1 & 63);
      r += x(c2 & 63);
      r += x(c3 & 63);
      return r += x(c4 & 63);
    }

    function x(F) {
      if (10 > F)
        return String.fromCharCode(48 + F);
      F -= 10;
      if (26 > F)
        return String.fromCharCode(65 + F);
      F -= 26;
      if (26 > F)
        return String.fromCharCode(97 + F);
      F -= 26;
      return 0 == F ? '-' : 1 == F ? '_' : '?';
    }
    var C = new XMLHttpRequest();
    C.open('GET', ('txt' == g ? PLANT_URL + '/txt/' : 'png' == g ? PLANT_URL + '/png/' : PLANT_URL + '/svg/') + function(F) {
      r = '';
      for (i = 0; i < F.length; i += 3)
        r = i + 2 == F.length ? r + u(F.charCodeAt(i), F.charCodeAt(i + 1), 0) : i + 1 == F.length ? r + u(F.charCodeAt(i), 0, 0) : r + u(F.charCodeAt(i), F.charCodeAt(i + 1), F.charCodeAt(i + 2));
      return r;
    }(Graph.arrayBufferToString(pako.deflateRaw(d))), !0);
    'txt' != g && (C.responseType = 'blob');
    C.onload = function(F) {
      if (200 <= this.status && 300 > this.status)
        if ('txt' == g)
          n(this.response);
        else {
          var L = new FileReader();
          L.readAsDataURL(this.response);
          L.onloadend = function(l) {
            var q = new Image();
            q.onload = function() {
              try {
                var A = q.width,
                  H = q.height;
                if (0 == A && 0 == H) {
                  var K = L.result,
                    M = K.indexOf(','),
                    I = decodeURIComponent(escape(atob(K.substring(M + 1)))),
                    Q = mxUtils.parseXml(I).getElementsByTagName('svg');
                  0 < Q.length && (A = parseFloat(Q[0].getAttribute('width')), H = parseFloat(Q[0].getAttribute('height')));
                }
                n(L.result, A, H);
              } catch (P) {
                v(P);
              }
            };
            q.src = L.result;
          };
          L.onerror = function(l) {
            v(l);
          };
        }
      else
        v(F);
    };
    C.onerror = function(F) {
      v(F);
    };
    C.send();
  };
  EditorUi.prototype.insertAsPreText = function(d, g, n) {
    var v = this.editor.graph,
      u = null;
    v.getModel().beginUpdate();
    try {
      u = v.insertVertex(null, null, '<pre>' + d + '</pre>', g, n, 1, 1, 'text;html=1;align=left;verticalAlign=top;'), v.updateCellSize(u, !0);
    } finally {
      v.getModel().endUpdate();
    }
    return u;
  };
  EditorUi.prototype.insertTextAt = function(d, g, n, v, u, x, C, F) {
    x = null != x ? x : !0;
    C = null != C ? C : !0;
    if (null != d)
      if (Graph.fileSupport && new XMLHttpRequest().upload && this.isRemoteFileFormat(d))
        this.isOffline() ? this.showError(mxResources.get('error'), mxResources.get('notInOffline')) : this.parseFileData(d.replace(/\s+/g, ' '), mxUtils.bind(this, function(H) {
          4 == H.readyState && 200 <= H.status && 299 >= H.status && this.editor.graph.setSelectionCells(this.insertTextAt(H.responseText, g, n, !0));
        }));
      else if ('data:' == d.substring(0, 5) || !this.isOffline() && (u || /\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(d))) {
      var L = this.editor.graph;
      if ('data:application/pdf;base64,' == d.substring(0, 28)) {
        var l = Editor.extractGraphModelFromPdf(d);
        if (null != l && 0 < l.length)
          return this.importXml(l, g, n, x, !0, F);
      }
      if (Editor.isPngDataUrl(d) && (l = Editor.extractGraphModelFromPng(d), null != l && 0 < l.length))
        return this.importXml(l, g, n, x, !0, F);
      if ('data:image/svg+xml;' == d.substring(0, 19))
        try {
          l = null;
          'data:image/svg+xml;base64,' == d.substring(0, 26) ? (l = d.substring(d.indexOf(',') + 1), l = window.atob && !mxClient.IS_SF ? atob(l) : Base64.decode(l, !0)) : l = decodeURIComponent(d.substring(d.indexOf(',') + 1));
          var q = this.importXml(l, g, n, x, !0, F);
          if (0 < q.length)
            return q;
        } catch (H) {}
      this.loadImage(d, mxUtils.bind(this, function(H) {
        if ('data:' == d.substring(0, 5))
          this.resizeImage(H, d, mxUtils.bind(this, function(I, Q, P) {
            L.setSelectionCell(L.insertVertex(null, null, '', L.snap(g), L.snap(n), Q, P, 'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;aspect=fixed;imageAspect=0;image=' + this.convertDataUri(I) + ';'));
          }), C, this.maxImageSize);
        else {
          var K = Math.min(1, Math.min(this.maxImageSize / H.width, this.maxImageSize / H.height)),
            M = Math.round(H.width * K);
          H = Math.round(H.height * K);
          L.setSelectionCell(L.insertVertex(null, null, '', L.snap(g), L.snap(n), M, H, 'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;aspect=fixed;imageAspect=0;image=' + d + ';'));
        }
      }), mxUtils.bind(this, function() {
        var H = null;
        L.getModel().beginUpdate();
        try {
          H = L.insertVertex(L.getDefaultParent(), null, d, L.snap(g), L.snap(n), 1, 1, 'text;' + (v ? 'html=1;' : '')), L.updateCellSize(H), L.fireEvent(new mxEventObject('textInserted', 'cells', [H]));
        } finally {
          L.getModel().endUpdate();
        }
        L.setSelectionCell(H);
      }));
    } else {
      d = Graph.zapGremlins(mxUtils.trim(d));
      if (this.isCompatibleString(d))
        return this.importXml(d, g, n, x, null, F);
      if (0 < d.length)
        if (this.isLucidChartData(d))
          this.convertLucidChart(d, mxUtils.bind(this, function(H) {
            this.editor.graph.setSelectionCells(this.importXml(H, g, n, x, null, F));
          }), mxUtils.bind(this, function(H) {
            this.handleError(H);
          }));
        else {
          L = this.editor.graph;
          u = null;
          L.getModel().beginUpdate();
          try {
            u = L.insertVertex(L.getDefaultParent(), null, '', L.snap(g), L.snap(n), 1, 1, 'text;whiteSpace=wrap;' + (v ? 'html=1;' : ''));
            L.fireEvent(new mxEventObject('textInserted', 'cells', [u]));
            '<' == d.charAt(0) && d.indexOf('>') == d.length - 1 && (d = mxUtils.htmlEntities(d));
            d.length > this.maxTextBytes && (d = d.substring(0, this.maxTextBytes) + '...');
            u.value = d;
            L.updateCellSize(u);
            if (0 < this.maxTextWidth && u.geometry.width > this.maxTextWidth) {
              var A = L.getPreferredSizeForCell(u, this.maxTextWidth);
              u.geometry.width = A.width;
              u.geometry.height = A.height;
            }
            Graph.isLink(u.value) && L.setLinkForCell(u, u.value);
            u.geometry.width += L.gridSize;
            u.geometry.height += L.gridSize;
          } finally {
            L.getModel().endUpdate();
          }
          return [u];
        }
    }
    return [];
  };
  EditorUi.prototype.formatFileSize = function(d) {
    var g = -1;
    do
      d /= 1024, g++;
    while (1024 < d);
    return Math.max(d, 0.1).toFixed(1) + ' kB; MB; GB; TB;PB;EB;ZB;YB'.split(';')[g];
  };
  EditorUi.prototype.convertDataUri = function(d) {
    if ('data:' == d.substring(0, 5)) {
      var g = d.indexOf(';');
      0 < g && (d = d.substring(0, g) + d.substring(d.indexOf(',', g + 1)));
    }
    return d;
  };
  EditorUi.prototype.isRemoteFileFormat = function(d, g) {
    return /("contentType":\s*"application\/gliffy\+json")/.test(d);
  };
  EditorUi.prototype.isLucidChartData = function(d) {
    return null != d && ('{"state":"{\\"Properties\\":' == d.substring(0, 26) || '{"Properties":' == d.substring(0, 14));
  };
  EditorUi.prototype.importLocalFile = function(d, g) {
    if (d && Graph.fileSupport) {
      if (null == this.importFileInputElt) {
        var n = document.createElement('input');
        n.setAttribute('type', 'file');
        mxEvent.addListener(n, 'change', mxUtils.bind(this, function() {
          null != n.files && (this.importFiles(n.files, null, null, this.maxImageSize), n.type = '', n.type = 'file', n.value = '');
        }));
        n.style.display = 'none';
        document.body.appendChild(n);
        this.importFileInputElt = n;
      }
      this.importFileInputElt.click();
    } else {
      window.openNew = !1;
      window.openKey = 'import';
      window.listBrowserFiles = mxUtils.bind(this, function(C, F) {
        StorageFile.listFiles(this, 'F', C, F);
      });
      window.openBrowserFile = mxUtils.bind(this, function(C, F, L) {
        StorageFile.getFileContent(this, C, F, L);
      });
      window.deleteBrowserFile = mxUtils.bind(this, function(C, F, L) {
        StorageFile.deleteFile(this, C, F, L);
      });
      if (!g) {
        var v = Editor.useLocalStorage;
        Editor.useLocalStorage = !d;
      }
      window.openFile = new OpenFile(mxUtils.bind(this, function(C) {
        this.hideDialog(C);
      }));
      window.openFile.setConsumer(mxUtils.bind(this, function(C, F) {
        null != F && Graph.fileSupport && /(\.v(dx|sdx?))($|\?)/i.test(F) ? (C = new Blob([C], {
          type: 'application/octet-stream'
        }), this.importVisio(C, mxUtils.bind(this, function(L) {
          this.importXml(L, 0, 0, !0);
        }), null, F)) : this.editor.graph.setSelectionCells(this.importXml(C, 0, 0, !0));
      }));
      this.showDialog(new OpenDialog(this).container, Editor.useLocalStorage ? 640 : 360, Editor.useLocalStorage ? 480 : 220, !0, !0, function() {
        window.openFile = null;
      });
      if (!g) {
        var u = this.dialog,
          x = u.close;
        this.dialog.close = mxUtils.bind(this, function(C) {
          Editor.useLocalStorage = v;
          x.apply(u, arguments);
          C && null == this.getCurrentFile() && '1' != urlParams.embed && this.showSplash();
        });
      }
    }
  };
  EditorUi.prototype.importZipFile = function(d, g, n) {
    var v = this,
      u = mxUtils.bind(this, function() {
        this.loadingExtensions = !1;
        'undefined' !== typeof JSZip ? JSZip.loadAsync(d).then(function(x) {
          if (mxUtils.isEmptyObject(x.files))
            n();
          else {
            var C = 0,
              F, L = !1;
            x.forEach(function(l, q) {
              l = q.name.toLowerCase();
              'diagram/diagram.xml' == l ? (L = !0, q.async('string').then(function(A) {
                0 == A.indexOf('<mxfile ') ? g(A) : n();
              })) : 0 == l.indexOf('versions/') && (l = parseInt(l.substr(9)), l > C && (C = l, F = q));
            });
            0 < C ? F.async('string').then(function(l) {
              new XMLHttpRequest().upload && v.isRemoteFileFormat(l, d.name) ? v.isOffline() ? v.showError(mxResources.get('error'), mxResources.get('notInOffline'), null, n) : v.parseFileData(l, mxUtils.bind(this, function(q) {
                4 == q.readyState && (200 <= q.status && 299 >= q.status ? g(q.responseText) : n());
              }), d.name) : n();
            }) : L || n();
          }
        }, function(x) {
          n(x);
        }) : n();
      });
    'undefined' !== typeof JSZip || this.loadingExtensions || this.isOffline(!0) ? u() : (this.loadingExtensions = !0, mxscript('js/extensions.min.js', u));
  };
  EditorUi.prototype.importFile = function(d, g, n, v, u, x, C, F, L, l, q, A) {
    l = null != l ? l : !0;
    var H = !1,
      K = null,
      M = mxUtils.bind(this, function(I) {
        var Q = null;
        null != I && '<mxlibrary' == I.substring(0, 10) ? this.loadLibrary(new LocalLibrary(this, I, C)) : Q = this.importXml(I, n, v, l, null, null != A ? mxEvent.isControlDown(A) : null);
        null != F && F(Q);
      });
    'image' == g.substring(0, 5) ? (L = !1, 'image/png' == g.substring(0, 9) && (g = q ? null : this.extractGraphModelFromPng(d), null != g && 0 < g.length && (K = this.importXml(g, n, v, l, null, null != A ? mxEvent.isControlDown(A) : null), L = !0)), L || (g = this.editor.graph, L = d.indexOf(';'), 0 < L && (d = d.substring(0, L) + d.substring(d.indexOf(',', L + 1))), l && g.isGridEnabled() && (n = g.snap(n), v = g.snap(v)), K = [g.insertVertex(null, null, '', n, v, u, x, 'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;aspect=fixed;imageAspect=0;image=' + d + ';')])) : /(\.*<graphml )/.test(d) ? (H = !0, this.importGraphML(d, M)) : null != L && null != C && (/(\.v(dx|sdx?))($|\?)/i.test(C) || /(\.vs(x|sx?))($|\?)/i.test(C)) ? (H = !0, this.importVisio(L, M)) : new XMLHttpRequest().upload && this.isRemoteFileFormat(d, C) ? this.isOffline() ? this.showError(mxResources.get('error'), mxResources.get('notInOffline')) : (H = !0, u = mxUtils.bind(this, function(I) {
      4 == I.readyState && (200 <= I.status && 299 >= I.status ? M(I.responseText) : null != F && (F(null), this.showError(mxResources.get('error'), 413 == I.status ? mxResources.get('diagramTooLarge') : mxResources.get('unknownError'))));
    }), null != d ? this.parseFileData(d, u, C) : this.parseFile(L, u, C)) : 0 == d.indexOf('PK') && null != L ? (H = !0, this.importZipFile(L, M, mxUtils.bind(this, function() {
      K = this.insertTextAt(this.validateFileData(d), n, v, !0, null, l);
      F(K);
    }))) : /(\.v(sd|dx))($|\?)/i.test(C) || /(\.vs(s|x))($|\?)/i.test(C) || (K = this.insertTextAt(this.validateFileData(d), n, v, !0, null, l, null, null != A ? mxEvent.isControlDown(A) : null));
    H || null == F || F(K);
    return K;
  };
  EditorUi.prototype.importFiles = function(d, g, n, v, u, x, C, F, L, l, q, A, H) {
    v = null != v ? v : this.maxImageSize;
    l = null != l ? l : this.maxImageBytes;
    var K = null != g && null != n,
      M = !0;
    g = null != g ? g : 0;
    n = null != n ? n : 0;
    var I = !1;
    if (!mxClient.IS_CHROMEAPP && null != d)
      for (var Q = q || this.resampleThreshold, P = 0; P < d.length; P++)
        if ('image/svg' !== d[P].type.substring(0, 9) && 'image/' === d[P].type.substring(0, 6) && d[P].size > Q) {
          I = !0;
          break;
        }
    var O = mxUtils.bind(this, function() {
      var W = this.editor.graph,
        p = W.gridSize;
      u = null != u ? u : mxUtils.bind(this, function(T, U, X, Z, Y, ea, aa, fa, da) {
        try {
          return null != T && '<mxlibrary' == T.substring(0, 10) ? (this.spinner.stop(), this.loadLibrary(new LocalLibrary(this, T, aa)), null) : 'atlassian' != this.getServiceName() && '1' != urlParams.embed && this.isCompatibleString(T) && 1 == d.length && this.isBlankFile() && !this.canUndo() ? (this.spinner.stop(), this.fileLoaded(new LocalFile(this, T, aa, !0)), null) : this.importFile(T, U, X, Z, Y, ea, aa, fa, da, K, A, H);
        } catch (ba) {
          return this.handleError(ba), null;
        }
      });
      x = null != x ? x : mxUtils.bind(this, function(T) {
        W.setSelectionCells(T);
      });
      if (this.spinner.spin(document.body, mxResources.get('loading')))
        for (var B = d.length, N = B, S = [], R = mxUtils.bind(this, function(T, U) {
            S[T] = U;
            if (0 == --N) {
              this.spinner.stop();
              if (null != F)
                F(S);
              else {
                var X = [];
                W.getModel().beginUpdate();
                try {
                  for (T = 0; T < S.length; T++) {
                    var Z = S[T]();
                    null != Z && (X = X.concat(Z));
                  }
                } finally {
                  W.getModel().endUpdate();
                }
              }
              x(X);
            }
          }), V = 0; V < B; V++)
          mxUtils.bind(this, function(T) {
            var U = d[T];
            if (null != U) {
              var X = new FileReader();
              X.onload = mxUtils.bind(this, function(Z) {
                if (null == C || C(U))
                  if ('image/' == U.type.substring(0, 6))
                    if ('image/svg' == U.type.substring(0, 9)) {
                      var Y = Graph.clipSvgDataUri(Z.target.result),
                        ea = Y.indexOf(',');
                      ea = decodeURIComponent(escape(atob(Y.substring(ea + 1))));
                      var aa = mxUtils.parseXml(ea);
                      ea = aa.getElementsByTagName('svg');
                      if (0 < ea.length) {
                        ea = ea[0];
                        var fa = A ? null : ea.getAttribute('content');
                        null != fa && '<' != fa.charAt(0) && '%' != fa.charAt(0) && (fa = unescape(window.atob ? atob(fa) : Base64.decode(fa, !0)));
                        null != fa && '%' == fa.charAt(0) && (fa = decodeURIComponent(fa));
                        null == fa || '<mxfile ' !== fa.substring(0, 8) && '<mxGraphModel ' !== fa.substring(0, 14) ? R(T, mxUtils.bind(this, function() {
                          try {
                            if (null != aa) {
                              var na = aa.getElementsByTagName('svg');
                              if (0 < na.length) {
                                var ia = na[0],
                                  qa = ia.getAttribute('width'),
                                  Aa = ia.getAttribute('height');
                                qa = null != qa && '%' != qa.charAt(qa.length - 1) ? parseFloat(qa) : NaN;
                                Aa = null != Aa && '%' != Aa.charAt(Aa.length - 1) ? parseFloat(Aa) : NaN;
                                var va = ia.getAttribute('viewBox');
                                if (null == va || 0 == va.length)
                                  ia.setAttribute('viewBox', '0 0 ' + qa + ' ' + Aa);
                                else if (isNaN(qa) || isNaN(Aa)) {
                                  var ja = va.split(' ');
                                  3 < ja.length && (qa = parseFloat(ja[2]), Aa = parseFloat(ja[3]));
                                }
                                Y = Editor.createSvgDataUri(mxUtils.getXml(ia));
                                var Ga = Math.min(1, Math.min(v / Math.max(1, qa)), v / Math.max(1, Aa)),
                                  Da = u(Y, U.type, g + T * p, n + T * p, Math.max(1, Math.round(qa * Ga)), Math.max(1, Math.round(Aa * Ga)), U.name);
                                if (isNaN(qa) || isNaN(Aa)) {
                                  var Ca = new Image();
                                  Ca.onload = mxUtils.bind(this, function() {
                                    qa = Math.max(1, Ca.width);
                                    Aa = Math.max(1, Ca.height);
                                    Da[0].geometry.width = qa;
                                    Da[0].geometry.height = Aa;
                                    ia.setAttribute('viewBox', '0 0 ' + qa + ' ' + Aa);
                                    Y = Editor.createSvgDataUri(mxUtils.getXml(ia));
                                    var Ka = Y.indexOf(';');
                                    0 < Ka && (Y = Y.substring(0, Ka) + Y.substring(Y.indexOf(',', Ka + 1)));
                                    W.setCellStyles('image', Y, [Da[0]]);
                                  });
                                  Ca.src = Editor.createSvgDataUri(mxUtils.getXml(ia));
                                }
                                return Da;
                              }
                            }
                          } catch (Ka) {}
                          return null;
                        })) : R(T, mxUtils.bind(this, function() {
                          return u(fa, 'text/xml', g + T * p, n + T * p, 0, 0, U.name);
                        }));
                      } else
                        R(T, mxUtils.bind(this, function() {
                          return null;
                        }));
                    } else {
                      ea = !1;
                      if ('image/png' == U.type) {
                        var da = A ? null : this.extractGraphModelFromPng(Z.target.result);
                        if (null != da && 0 < da.length) {
                          var ba = new Image();
                          ba.src = Z.target.result;
                          R(T, mxUtils.bind(this, function() {
                            return u(da, 'text/xml', g + T * p, n + T * p, ba.width, ba.height, U.name);
                          }));
                          ea = !0;
                        }
                      }
                      ea || (mxClient.IS_CHROMEAPP ? (this.spinner.stop(), this.showError(mxResources.get('error'), mxResources.get('dragAndDropNotSupported'), mxResources.get('cancel'), mxUtils.bind(this, function() {}), null, mxResources.get('ok'), mxUtils.bind(this, function() {
                        this.actions.get('import').funct();
                      }))) : this.loadImage(Z.target.result, mxUtils.bind(this, function(na) {
                        this.resizeImage(na, Z.target.result, mxUtils.bind(this, function(ia, qa, Aa) {
                          R(T, mxUtils.bind(this, function() {
                            if (null != ia && ia.length < l) {
                              var va = M && this.isResampleImageSize(U.size, q) ? Math.min(1, Math.min(v / qa, v / Aa)) : 1;
                              return u(ia, U.type, g + T * p, n + T * p, Math.round(qa * va), Math.round(Aa * va), U.name);
                            }
                            this.handleError({
                              message: mxResources.get('imageTooBig')
                            });
                            return null;
                          }));
                        }), M, v, q, U.size);
                      }), mxUtils.bind(this, function() {
                        this.handleError({
                          message: mxResources.get('invalidOrMissingFile')
                        });
                      })));
                    }
                else
                  Y = Z.target.result, u(Y, U.type, g + T * p, n + T * p, 240, 160, U.name, function(na) {
                    R(T, function() {
                      return na;
                    });
                  }, U);
              });
              /(\.v(dx|sdx?))($|\?)/i.test(U.name) || /(\.vs(x|sx?))($|\?)/i.test(U.name) ? u(null, U.type, g + T * p, n + T * p, 240, 160, U.name, function(Z) {
                R(T, function() {
                  return Z;
                });
              }, U) : 'image' == U.type.substring(0, 5) || 'application/pdf' == U.type ? X.readAsDataURL(U) : X.readAsText(U);
            }
          })(V);
    });
    if (I) {
      I = [];
      for (P = 0; P < d.length; P++)
        I.push(d[P]);
      d = I;
      this.confirmImageResize(function(W) {
        M = W;
        O();
      }, L);
    } else
      O();
  };
  EditorUi.prototype.isBlankFile = function() {
    return null != this.pages && 1 == this.pages.length && this.isDiagramEmpty() && this.currentPage.getName() == mxResources.get('pageWithNumber', [1]);
  };
  EditorUi.prototype.confirmImageResize = function(d, g) {
    g = null != g ? g : !1;
    var n = null != this.spinner && null != this.spinner.pause ? this.spinner.pause() : function() {},
      v = isLocalStorage || mxClient.IS_CHROMEAPP ? mxSettings.getResizeImages() : null,
      u = function(x, C) {
        if (x || g)
          mxSettings.setResizeImages(x ? C : null), mxSettings.save();
        n();
        d(C);
      };
    null == v || g ? this.showDialog(new ConfirmDialog(this, mxResources.get('resizeLargeImages'), function(x) {
      u(x, !0);
    }, function(x) {
      u(x, !1);
    }, mxResources.get('resize'), mxResources.get('actualSize'), '<img style="margin-top:8px;" src="' + Editor.loResImage + '"/>', '<img style="margin-top:8px;" src="' + Editor.hiResImage + '"/>', isLocalStorage || mxClient.IS_CHROMEAPP).container, 340, isLocalStorage || mxClient.IS_CHROMEAPP ? 220 : 200, !0, !0) : u(!1, v);
  };
  EditorUi.prototype.parseFile = function(d, g, n) {
    n = null != n ? n : d.name;
    var v = new FileReader();
    v.onload = mxUtils.bind(this, function() {
      this.parseFileData(v.result, g, n);
    });
    v.readAsText(d);
  };
  EditorUi.prototype.parseFileData = function(d, g, n) {
    var v = new XMLHttpRequest();
    v.open('POST', OPEN_URL);
    v.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    v.onreadystatechange = function() {
      g(v);
    };
    v.send('format=xml&filename=' + encodeURIComponent(n) + '&data=' + encodeURIComponent(d));
    try {
      EditorUi.logEvent({
        category: 'GLIFFY-IMPORT-FILE',
        action: 'size_' + file.size
      });
    } catch (u) {}
  };
  EditorUi.prototype.isResampleImageSize = function(d, g) {
    g = null != g ? g : this.resampleThreshold;
    return d > g;
  };
  EditorUi.prototype.resizeImage = function(d, g, n, v, u, x, C) {
    u = null != u ? u : this.maxImageSize;
    var F = Math.max(1, d.width),
      L = Math.max(1, d.height);
    if (v && this.isResampleImageSize(null != C ? C : g.length, x))
      try {
        var l = Math.max(F / u, L / u);
        if (1 < l) {
          var q = Math.round(F / l),
            A = Math.round(L / l),
            H = document.createElement('canvas');
          H.width = q;
          H.height = A;
          H.getContext('2d').drawImage(d, 0, 0, q, A);
          var K = H.toDataURL();
          if (K.length < g.length) {
            var M = document.createElement('canvas');
            M.width = q;
            M.height = A;
            var I = M.toDataURL();
            K !== I && (g = K, F = q, L = A);
          }
        }
      } catch (Q) {}
    n(g, F, L);
  };
  EditorUi.prototype.extractGraphModelFromPng = function(d) {
    return Editor.extractGraphModelFromPng(d);
  };
  EditorUi.prototype.loadImage = function(d, g, n) {
    try {
      var v = new Image();
      v.onload = function() {
        v.width = 0 < v.width ? v.width : 120;
        v.height = 0 < v.height ? v.height : 120;
        g(v);
      };
      null != n && (v.onerror = n);
      v.src = d;
    } catch (u) {
      if (null != n)
        n(u);
      else
        throw u;
    }
  };
  EditorUi.prototype.getDefaultSketchMode = function() {
    var d = 'ac.draw.io' == window.location.host ? '1' : '0';
    return '0' != (null != urlParams.rough ? urlParams.rough : d);
  };
  var k = EditorUi.prototype.init;
  EditorUi.prototype.init = function() {
    mxStencilRegistry.allowEval = mxStencilRegistry.allowEval && !this.isOfflineApp();
    Editor.isSettingsEnabled() && ('1' == urlParams.sketch && this.doSetSketchMode(null != mxSettings.settings.sketchMode && null == urlParams.rough ? mxSettings.settings.sketchMode : this.getDefaultSketchMode()), null != mxSettings.settings.sidebarTitles && (Sidebar.prototype.sidebarTitles = mxSettings.settings.sidebarTitles), this.formatWidth = mxSettings.getFormatWidth());
    var d = this,
      g = this.editor.graph;
    Graph.touchStyle && (g.panningHandler.isPanningTrigger = function(P) {
      var O = P.getEvent();
      return null == P.getState() && !mxEvent.isMouseEvent(O) && !g.freehand.isDrawing() || mxEvent.isPopupTrigger(O) && (null == P.getState() || mxEvent.isControlDown(O) || mxEvent.isShiftDown(O));
    });
    g.cellEditor.editPlantUmlData = function(P, O, W) {
      var p = JSON.parse(W);
      O = new TextareaDialog(d, mxResources.get('plantUml') + ':', p.data, function(B) {
        null != B && d.spinner.spin(document.body, mxResources.get('inserting')) && d.generatePlantUmlImage(B, p.format, function(N, S, R) {
          d.spinner.stop();
          g.getModel().beginUpdate();
          try {
            if ('txt' == p.format)
              g.labelChanged(P, '<pre>' + N + '</pre>'), g.updateCellSize(P, !0);
            else {
              g.setCellStyles('image', d.convertDataUri(N), [P]);
              var V = g.model.getGeometry(P);
              null != V && (V = V.clone(), V.width = S, V.height = R, g.cellsResized([P], [V], !1));
            }
            g.setAttributeForCell(P, 'plantUmlData', JSON.stringify({
              data: B,
              format: p.format
            }));
          } finally {
            g.getModel().endUpdate();
          }
        }, function(N) {
          d.handleError(N);
        });
      }, null, null, 400, 220);
      d.showDialog(O.container, 420, 300, !0, !0);
      O.init();
    };
    g.cellEditor.editMermaidData = function(P, O, W) {
      var p = JSON.parse(W);
      O = new TextareaDialog(d, mxResources.get('mermaid') + ':', p.data, function(B) {
        null != B && d.spinner.spin(document.body, mxResources.get('inserting')) && d.generateMermaidImage(B, p.config, function(N, S, R) {
          d.spinner.stop();
          g.getModel().beginUpdate();
          try {
            g.setCellStyles('image', N, [P]);
            var V = g.model.getGeometry(P);
            null != V && (V = V.clone(), V.width = Math.max(V.width, S), V.height = Math.max(V.height, R), g.cellsResized([P], [V], !1));
            g.setAttributeForCell(P, 'mermaidData', JSON.stringify({
              data: B,
              config: p.config
            }, null, 2));
          } finally {
            g.getModel().endUpdate();
          }
        }, function(N) {
          d.handleError(N);
        });
      }, null, null, 400, 220);
      d.showDialog(O.container, 420, 300, !0, !0);
      O.init();
    };
    var n = g.cellEditor.startEditing;
    g.cellEditor.startEditing = function(P, O) {
      try {
        var W = this.graph.getAttributeForCell(P, 'plantUmlData');
        if (null != W)
          this.editPlantUmlData(P, O, W);
        else if (W = this.graph.getAttributeForCell(P, 'mermaidData'), null != W)
          this.editMermaidData(P, O, W);
        else {
          var p = g.getCellStyle(P);
          '1' == mxUtils.getValue(p, 'metaEdit', '0') ? d.showDataDialog(P) : n.apply(this, arguments);
        }
      } catch (B) {
        d.handleError(B);
      }
    };
    g.getLinkTitle = function(P) {
      return d.getLinkTitle(P);
    };
    g.customLinkClicked = function(P) {
      var O = !1;
      try {
        d.handleCustomLink(P), O = !0;
      } catch (W) {
        d.handleError(W);
      }
      return O;
    };
    var v = g.parseBackgroundImage;
    g.parseBackgroundImage = function(P) {
      var O = v.apply(this, arguments);
      null != O && null != O.src && Graph.isPageLink(O.src) && (O = {
        originalSrc: O.src
      });
      return O;
    };
    var u = g.setBackgroundImage;
    g.setBackgroundImage = function(P) {
      null != P && null != P.originalSrc && (P = d.createImageForPageLink(P.originalSrc, d.currentPage, this));
      u.apply(this, arguments);
    };
    this.editor.addListener('pageRenamed', mxUtils.bind(this, function() {
      g.refreshBackgroundImage();
    }));
    this.editor.addListener('pageMoved', mxUtils.bind(this, function() {
      g.refreshBackgroundImage();
    }));
    this.editor.addListener('pagesPatched', mxUtils.bind(this, function(P, O) {
      P = null != g.backgroundImage ? g.backgroundImage.originalSrc : null;
      if (null != P) {
        var W = P.indexOf(',');
        if (0 < W)
          for (P = P.substring(W + 1), O = O.getProperty('patches'), W = 0; W < O.length; W++)
            if (null != O[W][EditorUi.DIFF_UPDATE] && null != O[W][EditorUi.DIFF_UPDATE][P] || null != O[W][EditorUi.DIFF_REMOVE] && 0 <= mxUtils.indexOf(O[W][EditorUi.DIFF_REMOVE], P)) {
              g.refreshBackgroundImage();
              break;
            }
      }
    }));
    var x = g.getBackgroundImageObject;
    g.getBackgroundImageObject = function(P, O) {
      var W = x.apply(this, arguments);
      if (null != W && null != W.originalSrc)
        if (!O)
          W = {
            src: W.originalSrc
          };
        else if (O && null != this.themes && 'darkTheme' == this.defaultThemeName) {
        var p = this.stylesheet,
          B = this.shapeForegroundColor,
          N = this.shapeBackgroundColor;
        this.stylesheet = this.getDefaultStylesheet();
        this.shapeBackgroundColor = '#ffffff';
        this.shapeForegroundColor = '#000000';
        W = d.createImageForPageLink(W.originalSrc);
        this.shapeBackgroundColor = N;
        this.shapeForegroundColor = B;
        this.stylesheet = p;
      }
      return W;
    };
    var C = this.clearDefaultStyle;
    this.clearDefaultStyle = function() {
      C.apply(this, arguments);
    };
    this.isOffline() || 'undefined' === typeof window.EditDataDialog || (EditDataDialog.placeholderHelpLink = 'https://www.diagrams.net/doc/faq/predefined-placeholders');
    if (/viewer\.diagrams\.net$/.test(window.location.hostname) || /embed\.diagrams\.net$/.test(window.location.hostname))
      this.editor.editBlankUrl = 'https://app.diagrams.net/';
    var F = d.editor.getEditBlankUrl;
    this.editor.getEditBlankUrl = function(P) {
      P = null != P ? P : '';
      '1' == urlParams.dev && (P += (0 < P.length ? '&' : '?') + 'dev=1');
      return F.apply(this, arguments);
    };
    var L = g.addClickHandler;
    g.addClickHandler = function(P, O, W) {
      var p = O;
      O = function(B, N) {
        if (null == N) {
          var S = mxEvent.getSource(B);
          'a' == S.nodeName.toLowerCase() && (N = S.getAttribute('href'));
        }
        null != N && g.isCustomLink(N) && (mxEvent.isTouchEvent(B) || !mxEvent.isPopupTrigger(B)) && g.customLinkClicked(N) && mxEvent.consume(B);
        null != p && p(B, N);
      };
      L.call(this, P, O, W);
    };
    k.apply(this, arguments);
    mxClient.IS_SVG && this.editor.graph.addSvgShadow(g.view.canvas.ownerSVGElement, null, !0);
    if (null != this.menus) {
      var l = Menus.prototype.addPopupMenuItems;
      this.menus.addPopupMenuItems = function(P, O, W) {
        g.isSelectionEmpty() && 'simple' == Editor.currentTheme && this.addMenuItems(P, [
          'zoomIn',
          'zoomOut',
          '-'
        ], null, W);
        l.apply(this, arguments);
        g.isSelectionEmpty() || null == d.addSelectionToScratchpad || this.addMenuItems(P, [
          '-',
          'addToScratchpad'
        ], null, W);
      };
      var q = Menus.prototype.addPopupMenuEditItems;
      this.menus.addPopupMenuEditItems = function(P, O, W) {
        if (d.editor.graph.isSelectionEmpty())
          q.apply(this, arguments), d.menus.addMenuItems(P, ['copyAsImage'], null, W);
        else {
          this.isShowCellEditItems() ? this.addMenuItems(P, [
            'delete',
            '-'
          ], null, W) : this.addPopupMenuArrangeItems(P, O, W);
          this.addMenuItems(P, '- cut copy copyAsImage duplicate -'.split(' '), null, W);
          if (!this.isShowCellEditItems()) {
            var p = this.addMenuItem(P, 'delete');
            null != p && null != p.firstChild && null != p.firstChild.nextSibling && (p.firstChild.nextSibling.style.color = 'red');
          }
          this.addMenuItems(P, [
            'lockUnlock',
            '-'
          ], null, W);
          this.isShowStyleItems() || 1 != g.getSelectionCount() || g.isCellLocked(O) || !g.isCellEditable(O) || (this.addSubmenu('editCell', P, null, mxResources.get('edit')), g.getModel().isEdge(O) && (this.addSubmenu('line', P), p = g.getModel().getGeometry(O), null != p && null != p.points && 0 < p.points.length && this.addMenuItems(P, ['clearWaypoints'], null, W)));
        }
      };
      this.menus.isShowStyleItems = function() {
        return 'simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme && 'min' != Editor.currentTheme;
      };
      this.menus.isShowArrangeItems = this.menus.isShowStyleItems;
      this.menus.isShowCellEditItems = this.menus.isShowStyleItems;
    }
    d.actions.get('print').funct = function() {
      d.showDialog(new PrintDialog(d).container, 360, null != d.pages && 1 < d.pages.length ? 470 : 390, !0, !0);
    };
    this.defaultFilename = mxResources.get('untitledDiagram');
    var A = g.getExportVariables;
    g.getExportVariables = function() {
      var P = A.apply(this, arguments),
        O = d.getCurrentFile();
      null != O && (P.filename = O.getTitle());
      P.pagecount = null != d.pages ? d.pages.length : 1;
      P.page = null != d.currentPage ? d.currentPage.getName() : '';
      P.pagenumber = null != d.pages && null != d.currentPage ? mxUtils.indexOf(d.pages, d.currentPage) + 1 : 1;
      return P;
    };
    var H = g.getGlobalVariable;
    g.getGlobalVariable = function(P) {
      var O = d.getCurrentFile();
      return 'filename' == P && null != O ? O.getTitle() : 'page' == P && null != d.currentPage ? d.currentPage.getName() : 'pagenumber' == P ? null != d.currentPage && null != d.pages ? mxUtils.indexOf(d.pages, d.currentPage) + 1 : 1 : 'pagecount' == P ? null != d.pages ? d.pages.length : 1 : H.apply(this, arguments);
    };
    var K = g.labelLinkClicked;
    g.labelLinkClicked = function(P, O, W) {
      var p = O.getAttribute('href');
      if (null == p || !g.isCustomLink(p) || !mxEvent.isTouchEvent(W) && mxEvent.isPopupTrigger(W))
        K.apply(this, arguments);
      else {
        if (!g.isEnabled() || null != P && g.isCellLocked(P.cell))
          g.customLinkClicked(p), g.getRubberband().reset();
        mxEvent.consume(W);
      }
    };
    this.editor.getOrCreateFilename = function() {
      var P = d.defaultFilename,
        O = d.getCurrentFile();
      null != O && (P = null != O.getTitle() ? O.getTitle() : P);
      return P;
    };
    var M = this.actions.get('print');
    M.setEnabled(!mxClient.IS_IOS || !navigator.standalone);
    M.visible = M.isEnabled();
    if (!this.editor.chromeless || this.editor.editable)
      this.keyHandler.bindAction(70, !0, 'findReplace'), this.keyHandler.bindAction(67, !0, 'copyStyle', !0), this.keyHandler.bindAction(86, !0, 'pasteStyle', !0), this.keyHandler.bindAction(77, !0, 'editGeometry', !0), this.keyHandler.bindAction(75, !0, 'tags'), this.keyHandler.bindAction(65, !1, 'insertText'), this.keyHandler.bindAction(83, !1, 'insertNote'), this.keyHandler.bindAction(68, !1, 'insertRectangle'), this.keyHandler.bindAction(70, !1, 'insertEllipse'), this.keyHandler.bindAction(76, !1, 'insertLink'), this.keyHandler.bindAction(82, !1, 'insertRhombus'), this.keyHandler.bindAction(67, !1, 'insertEdge'), this.keyHandler.bindAction(88, !1, 'insertFreehand'), this.keyHandler.bindAction(75, !0, 'toggleShapes', !0), this.altShiftActions[83] = 'synchronize', this.installImagePasteHandler(), this.installNativeClipboardHandler();
    this.addListener('realtimeStateChanged', mxUtils.bind(this, function() {
      this.updateUserElement();
    }));
    this.spinner = this.createSpinner(null, null, 24);
    Graph.fileSupport && g.addListener(mxEvent.EDITING_STARTED, mxUtils.bind(this, function(P) {
      var O = g.cellEditor.text2,
        W = null;
      null != O && (mxEvent.addListener(O, 'dragleave', function(p) {
        null != W && (W.parentNode.removeChild(W), W = null);
        p.stopPropagation();
        p.preventDefault();
      }), mxEvent.addListener(O, 'dragover', mxUtils.bind(this, function(p) {
        null == W && (!mxClient.IS_IE || 10 < document.documentMode) && (W = this.highlightElement(O));
        p.stopPropagation();
        p.preventDefault();
      })), mxEvent.addListener(O, 'drop', mxUtils.bind(this, function(p) {
        null != W && (W.parentNode.removeChild(W), W = null);
        if (0 < p.dataTransfer.files.length)
          this.importFiles(p.dataTransfer.files, 0, 0, this.maxImageSize, function(N, S, R, V, T, U) {
            g.insertImage(N, T, U);
          }, function() {}, function(N) {
            return 'image/' == N.type.substring(0, 6);
          }, function(N) {
            for (var S = 0; S < N.length; S++)
              N[S]();
          }, mxEvent.isControlDown(p));
        else if (0 <= mxUtils.indexOf(p.dataTransfer.types, 'text/uri-list')) {
          var B = p.dataTransfer.getData('text/uri-list');
          /\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(B) ? this.loadImage(decodeURIComponent(B), mxUtils.bind(this, function(N) {
            var S = Math.max(1, N.width);
            N = Math.max(1, N.height);
            var R = this.maxImageSize;
            R = Math.min(1, Math.min(R / Math.max(1, S)), R / Math.max(1, N));
            g.insertImage(decodeURIComponent(B), S * R, N * R);
          })) : document.execCommand('insertHTML', !1, p.dataTransfer.getData('text/plain'));
        } else
          0 <= mxUtils.indexOf(p.dataTransfer.types, 'text/html') ? document.execCommand('insertHTML', !1, p.dataTransfer.getData('text/html')) : 0 <= mxUtils.indexOf(p.dataTransfer.types, 'text/plain') && document.execCommand('insertHTML', !1, p.dataTransfer.getData('text/plain'));
        p.stopPropagation();
        p.preventDefault();
      })));
    }));
    Editor.isSettingsEnabled() && (M = this.editor.graph.view, M.setUnit(mxSettings.getUnit()), M.addListener('unitChanged', function(P, O) {
      mxSettings.setUnit(O.getProperty('unit'));
      mxSettings.save();
    }), this.ruler = !this.canvasSupported || 9 == document.documentMode || '1' != urlParams.ruler && !mxSettings.isRulerOn() || this.editor.isChromelessView() && !this.editor.editable ? null : new mxDualRuler(this, M.unit), this.refresh());
    if ('1' == urlParams.styledev) {
      M = document.getElementById('geFooter');
      null != M && (this.styleInput = document.createElement('input'), this.styleInput.setAttribute('type', 'text'), this.styleInput.style.position = 'absolute', this.styleInput.style.top = '14px', this.styleInput.style.left = '2px', this.styleInput.style.width = '98%', this.styleInput.style.visibility = 'hidden', this.styleInput.style.opacity = '0.9', mxEvent.addListener(this.styleInput, 'change', mxUtils.bind(this, function() {
        this.editor.graph.getModel().setStyle(this.editor.graph.getSelectionCell(), this.styleInput.value);
      })), M.appendChild(this.styleInput), this.editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function(P, O) {
        0 < this.editor.graph.getSelectionCount() ? (P = this.editor.graph.getSelectionCell(), P = this.editor.graph.getModel().getStyle(P), this.styleInput.value = P || '', this.styleInput.style.visibility = 'visible') : this.styleInput.style.visibility = 'hidden';
      })));
      var I = this.isSelectionAllowed;
      this.isSelectionAllowed = function(P) {
        return mxEvent.getSource(P) == this.styleInput ? !0 : I.apply(this, arguments);
      };
    }
    M = document.getElementById('geInfo');
    null != M && M.parentNode.removeChild(M);
    if (Graph.fileSupport && (!this.editor.chromeless || this.editor.editable)) {
      var Q = null;
      mxEvent.addListener(g.container, 'dragleave', function(P) {
        g.isEnabled() && (null != Q && (Q.parentNode.removeChild(Q), Q = null), P.stopPropagation(), P.preventDefault());
      });
      mxEvent.addListener(g.container, 'dragover', mxUtils.bind(this, function(P) {
        null == Q && (!mxClient.IS_IE || 10 < document.documentMode) && (Q = this.highlightElement(g.container));
        null != this.sidebar && this.sidebar.hideTooltip();
        P.stopPropagation();
        P.preventDefault();
      }));
      mxEvent.addListener(g.container, 'drop', mxUtils.bind(this, function(P) {
        null != Q && (Q.parentNode.removeChild(Q), Q = null);
        if (g.isEnabled()) {
          var O = mxUtils.convertPoint(g.container, mxEvent.getClientX(P), mxEvent.getClientY(P)),
            W = P.dataTransfer.files,
            p = g.view.translate,
            B = g.view.scale,
            N = O.x / B - p.x,
            S = O.y / B - p.y;
          if (0 < W.length)
            '1' != urlParams.embed && mxEvent.isShiftDown(P) ? (this.isBlankFile() && !this.canUndo() && null != this.getCurrentFile() && this.fileLoaded(null), this.openFiles(W, !0)) : (mxEvent.isAltDown(P) && (S = N = null), this.importFiles(W, N, S, this.maxImageSize, null, null, null, null, mxEvent.isControlDown(P), null, null, mxEvent.isShiftDown(P), P));
          else {
            mxEvent.isAltDown(P) && (S = N = 0);
            var R = 0 <= mxUtils.indexOf(P.dataTransfer.types, 'text/uri-list') ? P.dataTransfer.getData('text/uri-list') : null;
            O = this.extractGraphModelFromEvent(P, null != this.pages);
            if (null != O)
              g.setSelectionCells(this.importXml(O, N, S, !0));
            else if (0 <= mxUtils.indexOf(P.dataTransfer.types, 'text/html')) {
              var V = P.dataTransfer.getData('text/html');
              O = document.createElement('div');
              O.innerHTML = Graph.sanitizeHtml(V);
              var T = null;
              W = O.getElementsByTagName('img');
              null != W && 1 == W.length ? (V = W[0].getAttribute('src'), null == V && (V = W[0].getAttribute('srcset')), /\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(V) || (T = !0)) : (W = O.getElementsByTagName('a'), null != W && 1 == W.length ? V = W[0].getAttribute('href') : (O = O.getElementsByTagName('pre'), null != O && 1 == O.length && (V = mxUtils.getTextContent(O[0]))));
              var U = !0,
                X = mxUtils.bind(this, function() {
                  g.setSelectionCells(this.insertTextAt(V, N, S, !0, T, null, U, mxEvent.isControlDown(P)));
                });
              T && null != V && V.length > this.resampleThreshold ? this.confirmImageResize(function(Z) {
                U = Z;
                X();
              }, mxEvent.isControlDown(P)) : X();
            } else
              null != R && /\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(R) ? this.loadImage(decodeURIComponent(R), mxUtils.bind(this, function(Z) {
                var Y = Math.max(1, Z.width);
                Z = Math.max(1, Z.height);
                var ea = this.maxImageSize;
                ea = Math.min(1, Math.min(ea / Math.max(1, Y)), ea / Math.max(1, Z));
                g.setSelectionCell(g.insertVertex(null, null, '', N, S, Y * ea, Z * ea, 'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;aspect=fixed;imageAspect=0;image=' + R + ';'));
              }), mxUtils.bind(this, function(Z) {
                g.setSelectionCells(this.insertTextAt(R, N, S, !0));
              })) : 0 <= mxUtils.indexOf(P.dataTransfer.types, 'text/plain') && g.setSelectionCells(this.insertTextAt(P.dataTransfer.getData('text/plain'), N, S, !0));
          }
        }
        P.stopPropagation();
        P.preventDefault();
      }), !1);
    }
    g.enableFlowAnimation = !0;
    this.initPages();
    '1' == urlParams.embed && this.initializeEmbedMode();
    M = mxUtils.bind(this, function() {
      g.refresh();
      g.view.validateBackground();
      this.updateDocumentTitle();
      this.updateTabContainer();
      this.hideShapePicker();
    });
    this.addListener('darkModeChanged', M);
    this.addListener('sketchModeChanged', M);
    this.addListener('currentThemeChanged', mxUtils.bind(this, function() {
      null != this.sidebar && this.sidebar.updateEntries();
      this.updateButtonContainer();
      this.updateDocumentTitle();
      this.refresh();
    }));
    g.addListener('enabledChanged', mxUtils.bind(this, function() {
      g.isEnabled() || this.hideShapePicker();
    }));
    d = this;
    mxWindow.prototype.fit = function() {
      if (Editor.inlineFullscreen || null == d.embedViewport)
        mxUtils.fit(this.div);
      else {
        var P = parseInt(this.div.offsetLeft),
          O = parseInt(this.div.offsetWidth),
          W = d.embedViewport.x + d.embedViewport.width,
          p = parseInt(this.div.offsetTop),
          B = parseInt(this.div.offsetHeight),
          N = d.embedViewport.y + d.embedViewport.height;
        this.div.style.left = Math.max(d.embedViewport.x, Math.min(P, W - O)) + 'px';
        this.div.style.top = Math.max(d.embedViewport.y, Math.min(p, N - B)) + 'px';
        this.div.style.height = Math.min(d.embedViewport.height, parseInt(this.div.style.height)) + 'px';
        this.div.style.width = Math.min(d.embedViewport.width, parseInt(this.div.style.width)) + 'px';
      }
    };
    if (!this.editor.chromeless || this.editor.editable)
      if ('simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme)
        M = Editor.currentTheme, Editor.currentTheme = '', this.doSetCurrentTheme(M, 0, mxUtils.bind(this, function() {
          '1' == urlParams.embedInline ? this.initializeInlineEmbedMode() : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < Editor.smallScreenWidth && this.toggleFormatPanel(!1);
          this.fireEvent(new mxEventObject('themeInitialized'));
        }));
    if ('atlas' != Editor.currentTheme)
      if (mxClient.IS_IE || mxClient.IS_IE11 || '0' == urlParams.dark || 'atlas' == Editor.currentTheme || '1' == urlParams.embed && '1' != urlParams.dark || (M = !1, window.matchMedia && Editor.isAutoDarkMode() ? M = window.matchMedia('(prefers-color-scheme: dark)').matches : Editor.isSettingsEnabled() && !0 === mxSettings.settings.darkMode && (M = !0), (M || 'dark' == uiTheme || '1' == urlParams.dark) && this.setDarkMode(!0)), window.matchMedia)
        try {
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mxUtils.bind(this, function(P) {
            Editor.isAutoDarkMode() && this.setDarkMode(P.matches);
          }));
        } catch (P) {
          this.actions.get('autoMode').setEnabled(!1);
        }
    else
      Editor.isSettingsEnabled() && !0 === mxSettings.settings.darkMode && (M = !0);
    this.installSettings();
    screen.width <= Editor.smallScreenWidth && (this.formatWidth = 0);
    '1' == urlParams.prefetchFonts && d.editor.loadFonts();
  };
  var m = EditorUi.prototype.windowResized;
  EditorUi.prototype.windowResized = function() {
    if ('simple' == Editor.currentTheme) {
      var d = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        g = Editor.smallScreenWidth;
      null != this.lastWindowWidth && this.lastWindowWidth >= g && d < g ? this.isFormatPanelVisible() && this.toggleFormatPanel(!1) : null != this.lastWindowWidth && this.lastWindowWidth < g && d >= g && (this.isFormatPanelVisible() || this.toggleFormatPanel(!0));
      this.lastWindowWidth = d;
    }
    m.apply(this, arguments);
  };
  EditorUi.prototype.initializeInlineEmbedMode = function() {
    var d = this.sketchFooterMenuElt,
      g = this.sketchMainMenuElt,
      n = this.sketchPickerMenuElt,
      v = this.editor.graph;
    n.style.transform = '';
    mxEvent.addGestureListeners(this.diagramContainer.parentNode, mxUtils.bind(this, function(l) {
      mxEvent.getSource(l) == this.diagramContainer.parentNode && (this.embedExitPoint = new mxPoint(mxEvent.getClientX(l), mxEvent.getClientY(l)), this.sendEmbeddedSvgExport());
    }));
    document.body.style.cursor = 'text';
    var u = document.createElement('div');
    u.style.position = 'absolute';
    u.style.width = '10px';
    u.style.height = '10px';
    u.style.borderRadius = '5px';
    u.style.border = '1px solid gray';
    u.style.background = '#ffffff';
    u.style.cursor = 'row-resize';
    this.diagramContainer.parentNode.appendChild(u);
    this.bottomResizer = u;
    var x = null,
      C = null,
      F = null,
      L = null;
    mxEvent.addGestureListeners(u, mxUtils.bind(this, function(l) {
      L = parseInt(this.diagramContainer.style.height);
      C = mxEvent.getClientY(l);
      v.popupMenuHandler.hideMenu();
      mxEvent.consume(l);
    }));
    u = u.cloneNode(!1);
    u.style.cursor = 'col-resize';
    this.diagramContainer.parentNode.appendChild(u);
    this.rightResizer = u;
    mxEvent.addGestureListeners(u, mxUtils.bind(this, function(l) {
      F = parseInt(this.diagramContainer.style.width);
      x = mxEvent.getClientX(l);
      v.popupMenuHandler.hideMenu();
      mxEvent.consume(l);
    }));
    mxEvent.addGestureListeners(document.body, null, mxUtils.bind(this, function(l) {
      var q = !1;
      null != x && (this.diagramContainer.style.width = Math.max(20, F + mxEvent.getClientX(l) - x) + 'px', q = !0);
      null != C && (this.diagramContainer.style.height = Math.max(20, L + mxEvent.getClientY(l) - C) + 'px', q = !0);
      q && ((window.opener || window.parent).postMessage(JSON.stringify({
        event: 'resize',
        fullscreen: Editor.inlineFullscreen,
        rect: this.diagramContainer.getBoundingClientRect()
      }), '*'), this.inlineSizeChanged(), this.refresh());
    }), function(l) {
      null == x && null == C || mxEvent.consume(l);
      C = x = null;
    });
    document.body.style.backgroundColor = 'transparent';
    this.diagramContainer.style.borderRadius = '4px';
    this.bottomResizer.style.visibility = 'hidden';
    this.rightResizer.style.visibility = 'hidden';
    this.sketchMenubarElt.style.display = 'none';
    g.style.visibility = 'hidden';
    d.style.visibility = 'hidden';
    n.style.display = 'none';
    this.addListener('editInlineStart', mxUtils.bind(this, function(l) {
      this.inlineSizeChanged();
      this.fitWindows();
    }));
    this.addListener('darkModeChanged', mxUtils.bind(this, function(l) {
      this.inlineSizeChanged();
    }));
    this.addListener('editInlineStop', mxUtils.bind(this, function(l) {
      this.diagramContainer.style.width = '10px';
      this.diagramContainer.style.height = '10px';
      this.diagramContainer.style.border = '';
      this.bottomResizer.style.visibility = 'hidden';
      this.rightResizer.style.visibility = 'hidden';
      g.style.visibility = 'hidden';
      d.style.visibility = 'hidden';
      n.style.display = 'none';
    }));
    this.windowResized = mxUtils.bind(this, function() {});
    this.inlineSizeChanged();
  };
  EditorUi.prototype.installImagePasteHandler = function() {
    if (!mxClient.IS_IE) {
      var d = this.editor.graph;
      d.container.addEventListener('paste', mxUtils.bind(this, function(g) {
        if (!mxEvent.isConsumed(g))
          try {
            for (var n = g.clipboardData || g.originalEvent.clipboardData, v = !1, u = 0; u < n.types.length; u++)
              if ('text/' === n.types[u].substring(0, 5)) {
                v = !0;
                break;
              }
            if (!v) {
              var x = n.items;
              for (index in x) {
                var C = x[index];
                if ('file' === C.kind) {
                  if (d.isEditing())
                    this.importFiles([C.getAsFile()], 0, 0, this.maxImageSize, function(L, l, q, A, H, K) {
                      d.insertImage(L, H, K);
                    }, function() {}, function(L) {
                      return 'image/' == L.type.substring(0, 6);
                    }, function(L) {
                      for (var l = 0; l < L.length; l++)
                        L[l]();
                    });
                  else {
                    var F = this.editor.graph.getInsertPoint();
                    this.importFiles([C.getAsFile()], F.x, F.y, this.maxImageSize);
                    mxEvent.consume(g);
                  }
                  break;
                }
              }
            }
          } catch (L) {}
      }), !1);
    }
  };
  EditorUi.prototype.installNativeClipboardHandler = function() {
    function d() {
      window.setTimeout(function() {
        n.innerHTML = '&nbsp;';
        n.focus();
        document.execCommand('selectAll', !1, null);
      }, 0);
    }
    var g = this.editor.graph,
      n = document.createElement('div');
    n.setAttribute('autocomplete', 'off');
    n.setAttribute('autocorrect', 'off');
    n.setAttribute('autocapitalize', 'off');
    n.setAttribute('spellcheck', 'false');
    n.style.textRendering = 'optimizeSpeed';
    n.style.fontFamily = 'monospace';
    n.style.wordBreak = 'break-all';
    n.style.background = 'transparent';
    n.style.color = 'transparent';
    n.style.position = 'absolute';
    n.style.whiteSpace = 'nowrap';
    n.style.overflow = 'hidden';
    n.style.display = 'block';
    n.style.fontSize = '1';
    n.style.zIndex = '-1';
    n.style.resize = 'none';
    n.style.outline = 'none';
    n.style.width = '1px';
    n.style.height = '1px';
    mxUtils.setOpacity(n, 0);
    n.contentEditable = !0;
    n.innerHTML = '&nbsp;';
    var v = !1;
    this.keyHandler.bindControlKey(88, null);
    this.keyHandler.bindControlKey(67, null);
    this.keyHandler.bindControlKey(86, null);
    mxEvent.addListener(document, 'keydown', mxUtils.bind(this, function(x) {
      var C = mxEvent.getSource(x);
      null == g.container || !g.isEnabled() || g.isMouseDown || g.isEditing() || null != this.dialog || 'INPUT' == C.nodeName || 'TEXTAREA' == C.nodeName || 224 != x.keyCode && (mxClient.IS_MAC || 17 != x.keyCode) && (!mxClient.IS_MAC || 91 != x.keyCode && 93 != x.keyCode) || v || (n.style.left = g.container.scrollLeft + 10 + 'px', n.style.top = g.container.scrollTop + 10 + 'px', x = g.container.scrollLeft, C = g.container.scrollTop, g.container.appendChild(n), v = !0, n.focus(), document.execCommand('selectAll', !1, null), g.container.scrollLeft = x, g.container.scrollTop = C);
    }));
    mxEvent.addListener(document, 'keyup', mxUtils.bind(this, function(x) {
      var C = x.keyCode;
      window.setTimeout(mxUtils.bind(this, function() {
        !v || 224 != C && 17 != C && 91 != C && 93 != C || (v = !1, g.isEditing() || null != this.dialog || null == g.container || g.container.focus(), n.parentNode.removeChild(n), null == this.dialog && mxUtils.clearSelection());
      }), 0);
    }));
    mxEvent.addListener(n, 'copy', mxUtils.bind(this, function(x) {
      if (g.isEnabled())
        try {
          mxClipboard.copy(g), this.copyCells(n), d();
        } catch (C) {
          this.handleError(C);
        }
    }));
    mxEvent.addListener(n, 'cut', mxUtils.bind(this, function(x) {
      if (g.isEnabled())
        try {
          mxClipboard.copy(g), this.copyCells(n, !0), d();
        } catch (C) {
          this.handleError(C);
        }
    }));
    mxEvent.addListener(n, 'paste', mxUtils.bind(this, function(x) {
      if (g.isEnabled() && !g.isCellLocked(g.getDefaultParent()) && (n.innerHTML = '&nbsp;', n.focus(), null != x.clipboardData && this.pasteCells(x, n, !0, !0), !mxEvent.isConsumed(x))) {
        var C = g.container.scrollLeft,
          F = g.container.scrollTop;
        window.setTimeout(mxUtils.bind(this, function() {
          g.container.scrollLeft = C;
          g.container.scrollTop = F;
          this.pasteCells(x, n, !1, !0);
        }), 0);
      }
    }), !0);
    var u = this.isSelectionAllowed;
    this.isSelectionAllowed = function(x) {
      return mxEvent.getSource(x) == n ? !0 : u.apply(this, arguments);
    };
  };
  EditorUi.prototype.setCurrentTheme = function(d, g) {
    mxSettings.setUi(d);
    (g = this.doSetCurrentTheme(d) || g) || this.alert(mxResources.get('restartForChangeRequired'));
  };
  EditorUi.prototype.isDefaultTheme = function(d) {
    return '' == d || 'dark' == d || 'default' == d || 'kennedy' == d || null == d;
  };
  EditorUi.prototype.doSetCurrentTheme = function(d, g, n) {
    function v(L) {
      return 'simple' == L || 0 == g && 'sketch' == L;
    }
    g = null != g ? g : 150;
    var u = Editor.currentTheme,
      x = v(u) && this.isDefaultTheme(d) || this.isDefaultTheme(u) && v(d),
      C = x && 'sketch' != d && 'sketch' != u;
    if (x && !this.themeSwitching) {
      Editor.currentTheme = d;
      this.themeSwitching = !0;
      var F = this.saveScrollState();
      mxUtils.setPrefixedStyle(this.container.style, 'transition', 'all ' + g + 'ms ease-in-out');
      0 == g && (this.container.style.opacity = '0');
      window.setTimeout(mxUtils.bind(this, function() {
        this.container.style.opacity = '0';
        window.setTimeout(mxUtils.bind(this, function() {
          v(u) && this.isDefaultTheme(d) ? (this.menubarContainer.style.display = '', this.toolbarContainer.style.display = 'block', this.tabContainer.style.display = 'flex', this.hsplit.style.display = 'block', this.menubarHeight = App.prototype.menubarHeight) : this.isDefaultTheme(u) && v(d) && (this.menubarContainer.style.display = 'none', this.toolbarContainer.style.display = 'none', this.menubarHeight = 0, 'simple' != d ? (this.tabContainer.style.display = 'none', this.hsplit.style.display = 'none', this.hsplitPosition = 0) : this.tabContainer.style.display = 'flex');
          this.switchTheme(d);
          window.setTimeout(mxUtils.bind(this, function() {
            this.fireEvent(new mxEventObject('currentThemeChanged'));
            this.editor.fireEvent(new mxEventObject('statusChanged'));
            this.editor.graph.refresh();
            this.restoreScrollState(F);
            this.container.style.opacity = '';
            window.setTimeout(mxUtils.bind(this, function() {
              mxUtils.setPrefixedStyle(this.container.style, 'transition', null);
              delete this.themeSwitching;
              isLocalStorage && v(d) && this.setTabContainerVisible(null != mxSettings.settings.pages ? mxSettings.settings.pages : !0);
              null != n && n();
            }), g);
          }), g);
        }), g);
      }), 0);
    }
    return C;
  };
  EditorUi.prototype.installStatusMinimizer = function(d) {
    d = null != d ? d : this.statusContainer.parentNode;
    var g = !1;
    mxEvent.addListener(d, 'mouseenter', mxUtils.bind(this, function() {
      'sketch' == Editor.currentTheme && '' != this.editor.getStatus() && (this.statusContainer.style.display = 'inline-flex');
    }));
    mxEvent.addListener(d, 'mouseleave', mxUtils.bind(this, function() {
      'sketch' != Editor.currentTheme || g || (this.statusContainer.style.display = 'none');
    }));
    var n = mxUtils.bind(this, function() {
      if ('sketch' == Editor.currentTheme) {
        var v = null != this.statusContainer.firstChild && 'function' === typeof this.statusContainer.firstChild.getAttribute ? this.statusContainer.firstChild : null;
        g = null != v && null != v.getAttribute('class');
        if (!g && null != v) {
          v = v.getAttribute('title');
          var u = this.getCurrentFile();
          u = null != u ? u.savingStatusKey : DrawioFile.prototype.savingStatusKey;
          v == mxResources.get(u) + '...' && (this.statusContainer.innerHTML = '<div><img title="' + mxUtils.htmlEntities(mxResources.get(u)) + '..."src="' + Editor.tailSpin + '"></div>', g = !0);
        }
        this.statusContainer.style.display = 'none';
        v = 32 >= d.clientWidth;
        d.style.visibility = v && '' == this.editor.getStatus() ? 'hidden' : '';
        if (v || g)
          this.statusContainer.style.display = 'inline-flex', g = !0;
      } else
        'simple' == Editor.currentTheme ? (this.statusContainer.style.display = 'inline-flex', this.statusContainer.style.display = 0 == this.statusContainer.clientWidth ? 'none' : 'inline-flex') : this.statusContainer.style.display = 'inline-flex';
    });
    this.editor.addListener('statusChanged', n);
    n();
  };
  EditorUi.prototype.switchTheme = function(d) {
    this.isDefaultTheme(d) && null != this.formatContainer && (this.formatContainer.style.left = '', this.formatContainer.style.zIndex = '1', this.formatContainer.style.border = '', null != this.footerContainer && this.footerContainer.parentNode != this.formatContainer.parentNode && this.footerContainer.parentNode.insertBefore(this.formatContainer, this.footerContainer), null != this.sidebarContainer && this.formatContainer.parentNode != this.sidebarContainer.parentNode && this.formatContainer.parentNode.insertBefore(this.sidebarContainer, this.formatContainer));
    this.destroyWindows();
    this.updateUserElement();
    this.updateDefaultStyles();
    this.switchThemeConstants(d);
    this.switchCssForTheme(d);
    this.createWrapperForTheme(d);
    this.createMainMenuForTheme(d);
    this.createFooterMenuForTheme(d);
    this.createPickerMenuForTheme(d);
    this.createMenubarForTheme(d);
    this.sidebarContainer.style.display = '';
    if ('sketch' == d) {
      this.createFormatWindow();
      this.formatContainer.style.left = '0px';
      this.formatContainer.style.top = '0px';
      this.formatContainer.style.width = '';
      this.formatContainer.style.zIndex = '';
      this.formatContainer.style.border = 'none';
      var g = Editor.enableCustomLibraries && ('1' != urlParams.embed || '1' == urlParams.libraries);
      this.createShapesWindow();
      this.sidebarContainer.className = '';
      this.sidebarContainer.style.position = 'absolute';
      this.sidebarContainer.style.left = '0px';
      this.sidebarContainer.style.top = '0px';
      this.sidebarContainer.style.bottom = g ? '32px' : '0px';
      this.sidebarContainer.style.width = '100%';
    }
    null != this.format && (d = this.isDefaultTheme(d) || 'atlas' == d, this.format.showCloseButton != d && (this.format.showCloseButton = d, this.format.refresh()));
  };
  EditorUi.prototype.getWindows = function() {
    var d = [
      this.sidebarWindow,
      this.formatWindow,
      this.freehandWindow
    ];
    null != this.actions && (d = d.concat([
      this.actions.outlineWindow,
      this.actions.layersWindow
    ]));
    null != this.menus && (d = d.concat([
      this.menus.tagsWindow,
      this.menus.findWindow,
      this.menus.findReplaceWindow,
      this.menus.commentsWindow
    ]));
    return d;
  };
  EditorUi.prototype.fitWindows = function() {
    for (var d = this.getWindows(), g = 0; g < d.length; g++)
      null != d[g] && d[g].window.fit();
  };
  EditorUi.prototype.hideWindows = function() {
    for (var d = this.getWindows(), g = 0; g < d.length; g++)
      null != d[g] && d[g].window.setVisible(!1);
  };
  EditorUi.prototype.destroyWindows = function() {
    null != this.sidebarWindow && (this.sidebarWindow.destroy(), this.sidebarWindow = null);
    null != this.formatWindow && (this.formatWindow.destroy(), this.formatWindow = null);
    null != this.freehandWindow && (this.freehandWindow.destroy(), this.freehandWindow = null);
    null != this.actions.outlineWindow && (this.actions.outlineWindow.destroy(), this.actions.outlineWindow = null);
    null != this.actions.layersWindow && (this.actions.layersWindow.destroy(), this.actions.layersWindow = null);
    null != this.menus && (null != this.menus.tagsWindow && (this.menus.tagsWindow.destroy(), this.menus.tagsWindow = null), null != this.menus.findWindow && (this.menus.findWindow.destroy(), this.menus.findWindow = null), null != this.menus.findReplaceWindow && (this.menus.findReplaceWindow.destroy(), this.menus.findReplaceWindow = null), null != this.menus.commentsWindow && (this.menus.commentsWindow.destroy(), this.menus.commentsWindow = null));
  };
  EditorUi.prototype.switchThemeConstants = function(d) {
    var g = this.editor.graph;
    g.defaultEdgeLength = Graph.prototype.defaultEdgeLength;
    g.defaultGridEnabled = Graph.prototype.defaultGridEnabled;
    g.defaultPageVisible = Graph.prototype.defaultPageVisible;
    null != this.menus && (this.menus.autoPopup = 'simple' != d && 'sketch' != d);
    'simple' == d || 'sketch' == d ? (Editor.fitWindowBorders = new mxRectangle(60, 30, 30, 30), g.defaultEdgeLength = 120, null == urlParams.grid && (g.defaultGridEnabled = !1), null == urlParams.pv && (g.defaultPageVisible = !1)) : Editor.fitWindowBorders = null;
  };
  EditorUi.prototype.switchCssForTheme = function(d) {
    'simple' == d || 'sketch' == d ? null == this.sketchStyleElt && (this.sketchStyleElt = document.createElement('style'), this.sketchStyleElt.setAttribute('type', 'text/css'), this.sketchStyleElt.innerHTML = Editor.createMinimalCss(), document.getElementsByTagName('head')[0].appendChild(this.sketchStyleElt)) : null != this.sketchStyleElt && (this.sketchStyleElt.parentNode.removeChild(this.sketchStyleElt), this.sketchStyleElt = null);
  };
  EditorUi.prototype.createWrapperForTheme = function(d) {
    'simple' == d || 'sketch' == d ? (null == this.sketchWrapperElt && (this.sketchWrapperElt = document.createElement('div'), this.sketchWrapperElt.style.cssText = 'position:absolute;top:0px;left:0px;right:0px;bottom:0px;overflow:hidden;'), 'sketch' == d && (this.sketchWrapperElt.className = 'geSketch'), this.diagramContainer.parentNode.appendChild(this.sketchWrapperElt), this.sketchWrapperElt.appendChild(this.diagramContainer)) : null != this.sketchWrapperElt && null != this.sketchWrapperElt.parentNode && (this.tabContainer.parentNode.insertBefore(this.diagramContainer, this.tabContainer), this.sketchWrapperElt.parentNode.removeChild(this.sketchWrapperElt));
  };
  EditorUi.prototype.createMainMenuForTheme = function(d) {
    if (('simple' == d || 'sketch' == d) && null == this.sketchMainMenuElt) {
      this.sketchMainMenuElt = document.createElement('div');
      this.sketchMainMenuElt.style.cssText = 'position:absolute;padding:9px 12px;overflow:hidden;white-space:nowrap;user-select:none;box-sizing:border-box;';
      var g = this.createMenu('simple' == d ? 'view' : 'diagram', 'simple' == d ? Editor.thinViewImage : Editor.menuImage);
      this.sketchMainMenuElt.appendChild(g);
      'simple' == d ? (this.sketchMainMenuElt.className = 'geToolbarContainer geSimpleMainMenu', this.sketchMainMenuElt.style.display = 'flex', this.sketchMainMenuElt.style.height = '52px', this.sketchMainMenuElt.style.justifyContent = 'start', this.sketchMainMenuElt.style.alignItems = 'center', this.sketchMainMenuElt.style.top = '0px', this.sketchMainMenuElt.style.left = '0px', this.sketchMainMenuElt.style.right = '0px', this.sketchMainMenuElt.style.gap = '10px', g.style.flexShrink = '0', g.style.opacity = '0.7') : (this.sketchMainMenuElt.appendChild(this.createMenuItem('delete', Editor.trashImage)), this.sketchMainMenuElt.appendChild(this.createMenuItem('undo', Editor.undoImage)), this.sketchMainMenuElt.appendChild(this.createMenuItem('redo', Editor.redoImage)), this.sketchMainMenuElt.className = 'geToolbarContainer', this.sketchMainMenuElt.style.borderRadius = '4px', this.sketchMainMenuElt.style.height = '44px', this.sketchMainMenuElt.style.left = '10px', this.sketchMainMenuElt.style.top = '10px', this.sketchMainMenuElt.style.zIndex = '1');
      this.sketchWrapperElt.appendChild(this.sketchMainMenuElt);
    }
  };
  EditorUi.prototype.isPageMenuVisible = function() {
    return null != this.pages && ('0' != urlParams.pages || 1 < this.pages.length || Editor.pagesVisible);
  };
  EditorUi.prototype.createFooterMenuForTheme = function(d) {
    if (('simple' == d || 'sketch' == d) && null == this.sketchFooterMenuElt) {
      this.sketchFooterMenuElt = document.createElement('div');
      this.sketchFooterMenuElt.className = 'geToolbarContainer';
      var g = this.sketchFooterMenuElt;
      if ('simple' != d) {
        var n = this.createPageMenuTab(!1, 'simple' != d);
        n.className = 'geToolbarButton geAdaptiveAsset';
        n.style.cssText = 'display:inline-block;cursor:pointer;overflow:hidden;padding:4px 16px 4px 4px;white-space:nowrap;max-width:160px;text-overflow:ellipsis;background-position:right 0px top 8px;background-repeat:no-repeat;background-size:13px;background-image:url(' + mxWindow.prototype.minimizeImage + ');';
        g.appendChild(n);
        var v = mxUtils.bind(this, function() {
          n.innerText = '';
          if (null != this.currentPage) {
            mxUtils.write(n, this.currentPage.getName());
            var l = null != this.pages ? this.pages.length : 1,
              q = this.getPageIndex(this.currentPage);
            q = null != q ? q + 1 : 1;
            var A = this.currentPage.getId();
            n.setAttribute('title', this.currentPage.getName() + ' (' + q + '/' + l + ')' + (null != A ? ' [' + A + ']' : ''));
          }
        });
        this.editor.addListener('pagesPatched', v);
        this.editor.addListener('pageSelected', v);
        this.editor.addListener('pageRenamed', v);
        this.editor.addListener('fileLoaded', v);
        v();
        var u = mxUtils.bind(this, function() {
          n.style.display = this.isPageMenuVisible() ? 'inline-block' : 'none';
        });
        this.addListener('editInlineStart', mxUtils.bind(this, function() {
          u();
          v();
        }));
        this.addListener('fileDescriptorChanged', u);
        this.addListener('pagesVisibleChanged', u);
        this.editor.addListener('pagesPatched', u);
        u();
        g.appendChild(this.createMenuItem('zoomOut', Editor.minusImage));
      }
      var x = this.createMenu('viewZoom', null, 'geToolbarButton geAdaptiveAsset');
      x.setAttribute('title', mxResources.get('zoom'));
      x.innerHTML = '100%';
      x.style.cssText = 'display:inline-flex;align-items:center;position:relative;padding:4px;box-shadow:none;width:40px;justify-content:center;cursor:pointer;';
      'simple' == d ? (x.style.borderStyle = 'solid', x.style.borderWidth = '1px', x.style.borderRadius = '4px', x.style.fontSize = '11px', x.style.fontWeight = '500', x.style.paddingTop = '4px', x.style.paddingRight = '14px', x.style.backgroundImage = 'url(' + Editor.expandMoreImage + ')', x.style.backgroundPosition = 'right 1px center', x.style.backgroundRepeat = 'no-repeat', x.style.backgroundSize = '16px', x.style.opacity = '0.7', x.style.height = '12px') : (x.style.backgroundImage = 'url(' + mxWindow.prototype.minimizeImage + ')', x.style.backgroundPosition = 'right 0px top 8px', x.style.backgroundRepeat = 'no-repeat', x.style.backgroundSize = '13px', x.style.paddingRight = '16px', x.style.marginRight = '-4px');
      g.appendChild(x);
      if ('simple' == d) {
        var C = this.createMenu('pages', Editor.thinNoteAddImage);
        C.style.backgroundSize = '24px';
        C.style.display = 'inline-block';
        C.style.width = '24px';
        C.style.height = '30px';
        C.style.opacity = '0.7';
        g.appendChild(C);
        var F = this.createMenuItem('undo', Editor.thinUndoImage);
        F.style.marginLeft = 'auto';
        F.style.flexShrink = '0';
        F.style.opacity = '0.7';
        g.appendChild(F);
        F = this.createMenuItem('redo', Editor.thinRedoImage);
        F.style.marginLeft = '0px';
        F.style.flexShrink = '0';
        F.style.opacity = '0.7';
        g.appendChild(F);
        F = mxUtils.bind(this, function() {
          var l = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          C.style.display = 480 > l ? 'none' : '';
          x.style.display = 750 > l ? 'none' : 'inline-flex';
        });
        mxEvent.addListener(window, 'resize', F);
        F();
      }
      mxUtils.bind(this, function(l) {
        mxEvent.addListener(l, 'click', mxUtils.bind(this, function(A) {
          mxEvent.isAltDown(A) ? (this.hideCurrentMenu(), this.actions.get('customZoom').funct(), mxEvent.consume(A)) : mxEvent.isShiftDown(A) && (this.hideCurrentMenu(), this.actions.get('smartFit').funct(), mxEvent.consume(A));
        }));
        var q = mxUtils.bind(this, function() {
          l.innerText = '';
          mxUtils.write(l, Math.round(100 * this.editor.graph.view.scale) + '%');
        });
        this.editor.graph.view.addListener(mxEvent.EVENT_SCALE, q);
        this.editor.addListener('resetGraphView', q);
        this.editor.addListener('pageSelected', q);
      })(x);
      'simple' != d && g.appendChild(this.createMenuItem('zoomIn', Editor.plusImage));
      if ('1' == urlParams.embedInline) {
        var L = this.createMenuItem('fullscreen', Editor.fullscreenImage);
        g.appendChild(L);
        F = mxUtils.bind(this, function() {
          L.style.backgroundImage = 'url(' + (Editor.inlineFullscreen ? Editor.fullscreenExitImage : Editor.fullscreenImage) + ')';
          this.diagramContainer.style.background = Editor.inlineFullscreen ? Editor.isDarkMode() ? Editor.darkColor : '#ffffff' : 'transparent';
          this.inlineSizeChanged();
        });
        this.addListener('inlineFullscreenChanged', F);
        g.appendChild(this.createMenuItem('exit', Editor.closeImage));
      }
      'simple' == d ? (this.sketchFooterMenuElt.style.cssText = 'position:relative;white-space:nowrap;gap:6px;user-select:none;display:flex;flex-shrink:0;flex-grow:0.5;align-items:center;', this.sketchMainMenuElt.appendChild(this.sketchFooterMenuElt)) : (this.sketchFooterMenuElt.style.cssText = 'position:absolute;right:12px;bottom:12px;height:44px;border-radius:4px;padding:9px 12px;overflow:hidden;z-index:1;white-space:nowrap;display:flex;text-align:right;user-select:none;box-sizing:border-box;', this.sketchWrapperElt.appendChild(this.sketchFooterMenuElt));
    }
  };
  EditorUi.prototype.createPickerMenuForTheme = function(d) {
    if (('simple' == d || 'sketch' == d) && null == this.sketchPickerMenuElt) {
      var g = this.editor.graph;
      this.sketchPickerMenuElt = document.createElement('div');
      this.sketchPickerMenuElt.className = 'geToolbarContainer';
      var n = this.sketchPickerMenuElt;
      mxUtils.setPrefixedStyle(n.style, 'transition', 'transform .3s ease-out');
      var v = document.createElement('a');
      v.style.padding = '0px';
      v.style.boxShadow = 'none';
      v.className = 'geMenuItem geAdaptiveAsset';
      v.style.display = 'simple' == d ? 'inline-block' : 'block';
      v.style.width = '100%';
      v.style.height = '14px';
      v.style.margin = '4px 0 2px 0';
      v.style.backgroundImage = 'url(' + Editor.expandMoreImage + ')';
      v.style.backgroundPosition = 'center center';
      v.style.backgroundRepeat = 'no-repeat';
      v.style.backgroundSize = '22px';
      mxUtils.setOpacity(v, 40);
      v.setAttribute('title', mxResources.get('collapseExpand'));
      var u = v.style.margin,
        x = this.createMenuItem('insertFreehand', 'simple' == d ? Editor.thinGestureImage : Editor.freehandImage, !0);
      x.style.paddingLeft = 'simple' == d ? '0px' : '12px';
      x.style.backgroundSize = '24px';
      x.style.width = '26px';
      x.style.height = '30px';
      x.style.opacity = '0.7';
      var C = this.createMenu('insert', 'simple' == d ? Editor.thinAddCircleImage : Editor.addBoxImage);
      C.style.backgroundSize = '24px';
      C.style.display = 'simple' == d ? 'inline-block' : 'block';
      C.style.flexShrink = '0';
      C.style.width = '30px';
      C.style.height = '30px';
      C.style.padding = 'simple' == d ? '0px' : '4px 4px 0px 4px';
      C.style.opacity = '0.7';
      var F = this.createMenu('table', Editor.thinTableImage);
      F.style.backgroundSize = '24px';
      F.style.padding = 'simple' == d ? '0px' : '4px 4px 0px 4px';
      F.style.display = 'inline-block';
      F.style.width = '30px';
      F.style.height = '30px';
      F.style.opacity = '0.7';
      var L = C.cloneNode(!0);
      L.style.backgroundImage = 'url(' + ('simple' == d ? Editor.thinShapesImage : Editor.shapesImage) + ')';
      L.style.backgroundSize = '24px';
      L.setAttribute('title', mxResources.get('shapes'));
      mxEvent.addListener(L, 'click', mxUtils.bind(this, function(A) {
        if (this.isShapePickerVisible())
          this.hideShapePicker();
        else {
          var H = mxUtils.getOffset(L);
          'simple' == d ? (H.x -= this.diagramContainer.offsetLeft + 30, H.y += L.offsetHeight - 19) : (H.x += L.offsetWidth + 28, H.y += 20);
          this.showShapePicker(Math.max(this.diagramContainer.scrollLeft + Math.max(24, H.x)), this.diagramContainer.scrollTop + H.y, null, null, null, null, mxUtils.bind(this, function(K) {
            return g.getCenterInsertPoint(g.getBoundingBoxFromGeometry(K, !0));
          }), 'simple' == d);
        }
        mxEvent.consume(A);
      }));
      C.style.backgroundSize = '24px';
      'simple' == d ? C.style.flexShrink = '0' : C.style.marginBottom = '4px';
      var l = !1,
        q = mxUtils.bind(this, function(A) {
          if (A || document.body.contains(n)) {
            A = function(I, Q, P, O, W, p) {
              null != Q && I.setAttribute('title', Q);
              I.style.cursor = 'pointer';
              I.style.margin = 'simple' == d ? '0px' : '8px 0px 8px 2px';
              I.style.display = 'simple' == d ? 'inline-block' : 'block';
              n.appendChild(I);
              'simple' == d ? I.style.opacity = '0.7' : null != O && (Q = W, Q = null != Q ? Q : 30, p = null != p ? p : 26, I.style.position = 'relative', I.style.overflow = 'visible', P = document.createElement('div'), P.style.position = 'absolute', P.style.fontSize = '8px', P.style.left = Q + 'px', P.style.top = p + 'px', mxUtils.write(P, O), I.appendChild(P));
              return I;
            };
            n.innerText = '';
            if (!l) {
              var H = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
              'simple' == d && (this.sidebar.graph.cellRenderer.minSvgStrokeWidth = 0.9);
              var K = 'simple' == d ? '0px' : '4px 0px 6px 2px';
              if ('simple' != d || 660 <= H) {
                var M = this.sidebar.createVertexTemplate('text;strokeColor=none;fillColor=none;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;', 60, 30, 'Text', mxResources.get('text') + ' (A)', !0, !1, null, 'simple' != d, null, 38, 38, 'simple' == d ? Editor.thinTextImage : null);
                'simple' == d && (M.className = 'geToolbarButton', M.style.opacity = '0.7');
                A(M, mxResources.get('text') + ' (A)', null, 'A', 32).style.margin = 'simple' == d ? '0 -8px 0 0' : '0 0 0 -2px';
              }
              M = this.sidebar.createVertexTemplate('rounded=0;whiteSpace=wrap;html=1;', 160, 80, '', mxResources.get('rectangle') + ' (D)', !0, !1, null, 'simple' != d, null, 28, 28, 'simple' == d ? Editor.thinRectangleImage : null);
              'simple' == d ? (600 <= H && (M.className = 'geToolbarButton', M.style.opacity = '0.7', A(M, mxResources.get('rectangle') + ' (D)', null, 'D').style.margin = '0 -4px 0 0'), 440 <= H && this.sketchPickerMenuElt.appendChild(L), 390 <= H && A(x, mxResources.get('freehand') + ' (X)', null, 'X'), 500 <= H && this.sketchPickerMenuElt.appendChild(F)) : (A(this.sidebar.createVertexTemplate('shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;fontColor=#000000;darkOpacity=0.05;fillColor=#FFF9B2;strokeColor=none;fillStyle=solid;direction=west;gradientDirection=north;gradientColor=#FFF2A1;shadow=1;size=20;pointerEvents=1;', 140, 160, '', mxResources.get('note') + ' (S)', !0, !1, null, !0, null, 28, 28), mxResources.get('note') + ' (S)', null, 'S').style.margin = K, A(M, mxResources.get('rectangle') + ' (D)', null, 'D').style.margin = K, A(this.sidebar.createVertexTemplate('ellipse;whiteSpace=wrap;html=1;', 160, 100, '', mxResources.get('ellipse') + ' (F)', !0, !1, null, !0, null, 28, 28), mxResources.get('ellipse') + ' (F)', null, 'F').style.margin = K, K = new mxCell('', new mxGeometry(0, 0, this.editor.graph.defaultEdgeLength + 20, 0), 'edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;'), K.geometry.setTerminalPoint(new mxPoint(0, 0), !0), K.geometry.setTerminalPoint(new mxPoint(K.geometry.width, 0), !1), K.geometry.points = [], K.geometry.relative = !0, K.edge = !0, A(this.sidebar.createEdgeTemplateFromCells([K], K.geometry.width, K.geometry.height, mxResources.get('line') + ' (C)', !0, null, 'simple' != d, !1, null, 28, 28), mxResources.get('line') + ' (C)', null, 'C').margin = '1px 0px 1px 2px', K = K.clone(), K.style = 'edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;shape=flexArrow;rounded=1;startSize=8;endSize=8;', K.geometry.width = this.editor.graph.defaultEdgeLength + 20, K.geometry.setTerminalPoint(new mxPoint(0, 20), !0), K.geometry.setTerminalPoint(new mxPoint(K.geometry.width, 20), !1), A(this.sidebar.createEdgeTemplateFromCells([K], K.geometry.width, 40, mxResources.get('arrow'), !0, null, !0, !1, 28, 28), mxResources.get('arrow')).style.margin = '1px 0px 1px 2px', A(x, mxResources.get('freehand') + ' (X)', null, 'X'), this.sketchPickerMenuElt.appendChild(L));
              ('simple' != d || 320 < H) && this.sketchPickerMenuElt.appendChild(C);
            }
            'simple' != d && '1' != urlParams.embedInline ? n.appendChild(v) : 'simple' == d && this.commentsSupported() && 560 < H && (H = this.createMenuItem('comments', Editor.thinCommentImage, !0), H.style.paddingLeft = '0px', H.style.backgroundSize = '24px', H.style.width = '26px', H.style.height = '30px', H.style.opacity = '0.7', A(H, mxResources.get('comments')));
            this.sidebar.graph.cellRenderer.minSvgStrokeWidth = this.sidebar.minThumbStrokeWidth;
          }
        });
      mxEvent.addListener(v, 'click', mxUtils.bind(this, function() {
        l ? (mxUtils.setPrefixedStyle(n.style, 'transform', 'translate(0, -50%)'), n.style.padding = '0px 4px 4px', n.style.width = '48px', n.style.top = '50%', n.style.bottom = '', n.style.height = '', v.style.backgroundImage = 'url(' + Editor.expandMoreImage + ')', v.style.width = '100%', v.style.height = '14px', v.style.margin = u, l = !1, q()) : (n.innerText = '', n.appendChild(v), mxUtils.setPrefixedStyle(n.style, 'transform', 'translate(0, 0)'), n.style.width = 'auto', n.style.bottom = '12px', n.style.padding = '0px', n.style.top = '', v.style.backgroundImage = 'url(' + Editor.expandLessImage + ')', v.style.width = '24px', v.style.height = '24px', v.style.margin = '0px', l = !0);
      }));
      mxEvent.addListener(window, 'resize', q);
      this.editor.addListener('fileLoaded', q);
      this.addListener('darkModeChanged', q);
      this.addListener('sketchModeChanged', q);
      this.addListener('currentThemeChanged', q);
      q(!0);
      'simple' == d ? (this.sketchPickerMenuElt.style.cssText = 'position:relative;white-space:nowrap;user-select:none;display:flex;align-items:center;justify-content:flex-end;flex-grow:1;gap:6px;flex-shrink:0;', this.sketchMainMenuElt.appendChild(this.sketchPickerMenuElt)) : (this.sketchPickerMenuElt.style.cssText = 'position:absolute;left:10px;border-radius:4px;padding:0px 4px 4px;white-space:nowrap;max-height:100%;z-index:1;width:48px;box-sizing:border-box;transform:translate(0, -50%);top:50%;user-select:none;', this.sketchWrapperElt.appendChild(this.sketchPickerMenuElt));
    }
  };
  EditorUi.prototype.getNetworkStatus = function() {
    var d = null;
    if (this.isOffline(!0))
      d = mxResources.get('offline');
    else {
      var g = this.getCurrentFile();
      null != g && (g.invalidChecksum ? d = mxResources.get('error') + ': ' + mxResources.get('checksum') : null == g.sync || g.sync.enabled ? null == g.sync || g.sync.isConnected() ? g.isRealtimeEnabled() && g.isRealtimeSupported() && 1 < g.getRealtimeState() && (d = g.getRealtimeError(), d = mxResources.get('realtimeCollaboration') + ': ' + (null != d && null != d.message ? d.message : mxResources.get('error'))) : d = mxResources.get('notConnected') : d = mxResources.get('realtimeCollaboration') + ': ' + mxResources.get('disabled'));
    }
    return d;
  };
  EditorUi.prototype.createMenubarForTheme = function(d) {
    if ('simple' == d || 'sketch' == d) {
      if (null == this.sketchMenubarElt) {
        this.sketchMenubarElt = document.createElement('div');
        this.sketchMenubarElt.className = 'geToolbarContainer';
        if ('simple' == d) {
          this.sketchMenubarElt.style.cssText = 'position:relative;flex-grow:0.5;overflow:visible;' + ('1' != urlParams.embed ? 'flex-shrink:0;' : 'min-width:0;') + 'display:flex;white-space:nowrap;user-select:none;justify-content:flex-end;align-items:center;flex-wrap:nowrap;gap:6px;';
          if (null == this.shareElt && '1' != urlParams.embed && 'draw.io' == this.getServiceName())
            if (this.shareElt = this.createMenu('share', Editor.thinUserAddImage), this.shareElt.style.backgroundSize = '24px', this.shareElt.style.display = 'inline-block', this.shareElt.style.flexShrink = '0', this.shareElt.style.width = '24px', this.shareElt.style.height = '30px', this.shareElt.style.opacity = '0.7', this.isStandaloneApp())
              this.shareElt.style.backgroundImage = 'url(' + Editor.thinShareImage + ')';
            else {
              var g = mxUtils.bind(this, function() {
                var v = mxResources.get('share'),
                  u = Editor.thinUserAddImage,
                  x = this.getNetworkStatus();
                null != x && (v = v + ' (' + x + ')', u = Editor.thinUserFlashImage);
                this.shareElt.style.backgroundImage = 'url(' + u + ')';
                this.shareElt.setAttribute('title', v);
              });
              this.addListener('realtimeStateChanged', g);
              this.editor.addListener('statusChanged', g);
              mxEvent.addListener(window, 'offline', g);
              mxEvent.addListener(window, 'online', g);
              g();
            }
          null == this.mainMenuElt && (this.mainMenuElt = this.createMenu('diagram', Editor.thinMenuImage), this.mainMenuElt.style.backgroundSize = '24px', this.mainMenuElt.style.display = 'inline-block', this.mainMenuElt.style.flexShrink = '0', this.mainMenuElt.style.width = '24px', this.mainMenuElt.style.height = '30px', this.mainMenuElt.style.opacity = '0.7');
          if (null == this.formatElt) {
            this.formatElt = this.createMenuItem('format', Editor.thinDesignImage, !0);
            this.formatElt.style.backgroundSize = '24px';
            this.formatElt.style.marginLeft = '1' != urlParams.embed ? 'auto' : '0';
            this.formatElt.style.flexShrink = '0';
            this.formatElt.style.width = '20px';
            this.formatElt.style.opacity = '0.7';
            var n = this.formatElt.className + ' geToggleItem';
            this.formatElt.className = n + (0 == this.formatWidth ? '' : ' geActiveItem');
            this.addListener('formatWidthChanged', function() {
              this.formatElt.className = n + (0 == this.formatWidth ? '' : ' geActiveItem');
            });
          }
        } else
          this.sketchMenubarElt.style.cssText = 'position:absolute;right:12px;top:10px;height:44px;border-radius:4px;overflow:hidden;user-select:none;max-width:calc(100% - 170px);box-sizing:border-box;justify-content:flex-end;z-index:1;padding:7px 12px;display:flex;white-space:nowrap;user-select:none;justify-content:flex-end;align-items:center;flex-wrap:nowrap;gap:6px;', this.sketchWrapperElt.appendChild(this.sketchMenubarElt);
        '1' != urlParams.embedInline && (g = mxUtils.bind(this, function() {
          if ('sketch' == Editor.currentTheme) {
            var v = 58 > this.sketchPickerMenuElt.offsetTop - this.sketchPickerMenuElt.offsetHeight / 2;
            this.sketchMainMenuElt.style.left = v ? '70px' : '10px';
            this.sketchMenubarElt.style.maxWidth = v ? 'calc(100% - 230px)' : 'calc(100% - 170px)';
          } else
            'simple' == Editor.currentTheme && (v = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, null != this.shareElt && (this.shareElt.style.display = 360 < v ? '' : 'none'));
        }), g(), mxEvent.addListener(window, 'resize', g));
        '1' != urlParams.embed && 'atlassian' != this.getServiceName() && this.installStatusMinimizer(this.sketchMenubarElt);
      }
      'simple' == d && (null != this.buttonContainer && (this.buttonContainer.style.padding = '0px', this.sketchMenubarElt.appendChild(this.buttonContainer), null != this.formatElt && '1' == urlParams.embed && (this.formatElt.style.marginLeft = '')), null != this.shareElt && this.sketchMenubarElt.appendChild(this.shareElt), this.sketchMenubarElt.appendChild(this.mainMenuElt), this.sketchMenubarElt.appendChild(this.formatElt));
      null != this.statusContainer && (this.statusContainer.style.flexGrow = '1', this.statusContainer.style.flexShrink = '1', this.statusContainer.style.marginTop = '0px', 'simple' != d ? this.sketchMenubarElt.appendChild(this.statusContainer) : (this.statusContainer.style.justifyContent = 'center', this.statusContainer.style.width = '22%'));
      'simple' != d && null != this.userElement && (this.userElement.style.flexShrink = '0', this.userElement.style.top = '', this.sketchMenubarElt.appendChild(this.userElement));
      g = this.menubar.langIcon;
      null != g && (g.style.position = '', g.style.height = '21px', g.style.width = '21px', g.style.flexShrink = '0', g.style.opacity = '0.7', this.sketchMenubarElt.appendChild(g));
      'simple' == d ? (this.sketchMainMenuElt.appendChild(this.statusContainer), this.sketchMainMenuElt.appendChild(this.sketchMenubarElt)) : null != this.buttonContainer && (this.buttonContainer.style.padding = '0px', this.sketchMenubarElt.appendChild(this.buttonContainer));
    } else
      null != this.statusContainer && (this.statusContainer.style.flexGrow = '', this.statusContainer.style.flexShrink = '', this.statusContainer.style.width = '', this.statusContainer.style.marginTop = '', this.statusContainer.style.justifyContent = '', this.statusContainer.style.opacity = '', this.menubar.container.appendChild(this.statusContainer)), null != this.userElement && this.menubarContainer.appendChild(this.userElement), g = this.menubar.langIcon, null != g && (g.style.position = 'absolute', g.style.height = '18px', g.style.width = '18px', g.style.flexShrink = '', g.style.opacity = '', this.menubarContainer.parentNode.insertBefore(g, this.menubarContainer)), null != this.buttonContainer && (this.buttonContainer.style.display = '', this.buttonContainer.style.padding = '', this.menubar.container.appendChild(this.buttonContainer));
  };
  EditorUi.prototype.createMenu = function(d, g, n, v) {
    n = null != n ? n : 'geToolbarButton';
    var u = this.menus.get(d);
    v = this.menubar.addMenu(mxResources.get(d), u.funct, null, v);
    v.className = n;
    v.style.display = 'inline-block';
    v.style.cursor = 'pointer';
    v.style.height = '24px';
    v.setAttribute('title', mxResources.get(d));
    this.menus.menuCreated(u, v, n);
    null != g && (v.style.backgroundImage = 'url(' + g + ')', v.style.backgroundPosition = 'center center', v.style.backgroundRepeat = 'no-repeat', v.style.backgroundSize = '100% 100%', v.style.width = '24px', v.innerText = '');
    return v;
  };
  EditorUi.prototype.createToolbarButton = function(d, g, n, v) {
    v = null != v ? v : 24;
    var u = document.createElement('a');
    u.className = 'geToolbarButton geAdaptiveAsset';
    u.setAttribute('title', g);
    u.style.backgroundImage = 'url(' + d + ')';
    u.style.backgroundPosition = 'center center';
    u.style.backgroundRepeat = 'no-repeat';
    u.style.backgroundSize = '100% 100%';
    u.style.display = 'inline-block';
    u.style.cursor = 'pointer';
    u.style.marginLeft = '6px';
    u.style.width = v + 'px';
    u.style.height = v + 'px';
    null != n && (mxEvent.addListener(u, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', mxUtils.bind(this, function(x) {
      x.preventDefault();
    })), mxEvent.addListener(u, 'click', function(x) {
      'disabled' != u.getAttribute('disabled') && n(x);
      mxEvent.consume(x);
    }));
    return u;
  };
  EditorUi.prototype.createMenuItem = function(d, g, n) {
    var v = this.actions.get(d),
      u = null != v ? v.funct : null,
      x = this.createToolbarButton(g, mxResources.get(d) + (null != v && null != v.shortcut ? ' (' + v.shortcut + ')' : ''), u);
    null == v || n || (d = function() {
      v.isEnabled() ? (x.removeAttribute('disabled'), x.style.cursor = 'pointer') : (x.setAttribute('disabled', 'disabled'), x.style.cursor = 'default');
      x.style.opacity = v.isEnabled() ? '' : '0.2';
    }, this.editor.graph.addListener('enabledChanged', d), v.addListener('stateChanged', d), d());
    return x;
  };
  EditorUi.prototype.createFormatWindow = function() {
    if (null == this.formatWindow) {
      var d = Math.max(10, this.diagramContainer.parentNode.clientWidth - 256),
        g = '1' == urlParams.embedInline ? 580 : '1' == urlParams.sketch ? 580 : Math.min(566, this.editor.graph.container.clientHeight - 10);
      this.formatWindow = new WrapperWindow(this, mxResources.get('format'), d, 60, 240, g, mxUtils.bind(this, function(u) {
        u.appendChild(this.formatContainer);
      }));
      this.formatWindow.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function() {
        this.formatWindow.window.fit();
      }));
      var n = this.formatWindow.window.toggleMinimized,
        v = 240;
      this.formatWindow.window.toggleMinimized = function() {
        n.apply(this, arguments);
        this.minimized ? (v = parseInt(this.div.style.width), this.div.style.width = '140px', this.table.style.width = '140px', this.div.style.left = parseInt(this.div.style.left) + v - 140 + 'px') : (this.div.style.width = v + 'px', this.table.style.width = this.div.style.width, this.div.style.left = Math.max(0, parseInt(this.div.style.left) - v + 140) + 'px');
        this.fit();
      };
      mxEvent.addListener(this.formatWindow.window.title, 'dblclick', mxUtils.bind(this, function(u) {
        mxEvent.getSource(u) == this.formatWindow.window.title && this.formatWindow.window.toggleMinimized();
      }));
      this.formatWindow.window.minimumSize = new mxRectangle(0, 0, 240, 80);
      'sketch' == Editor.currentTheme ? (d = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, (1200 > (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) || 708 > d) && this.formatWindow.window.toggleMinimized()) : this.formatWindow.window.setVisible(!1);
    }
  };
  var t = EditorUi.prototype.toggleFormatPanel;
  EditorUi.prototype.toggleFormatPanel = function(d) {
    var g = this.formatWindow;
    null != g ? g.window.setVisible(null != d ? d : !this.isFormatPanelVisible()) : t.apply(this, arguments);
  };
  EditorUi.prototype.toggleShapesPanel = function(d) {
    var g = EditorUi.prototype.hsplitPosition;
    0 == g && (g = 134);
    var n = this.hsplitPosition,
      v = mxUtils.bind(this, function() {
        this.hsplitPosition = u;
        this.refresh();
        this.diagramContainer.scrollLeft -= n - this.hsplitPosition;
      }),
      u = d ? g : 0;
    mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform', 0 == u ? 'translateX(0)' : 'translateX(-100%)');
    0 != u && v();
    window.setTimeout(mxUtils.bind(this, function() {
      mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform', 0 == u ? 'translateX(-100%)' : 'translateX(0)');
      mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transition', 'transform 0.3s ease-in-out');
      mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform-origin', 'top left');
      window.setTimeout(mxUtils.bind(this, function() {
        mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transition', null);
        mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform', null);
        mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform-origin', null);
        0 == u && v();
      }), 300);
    }), 10);
  };
  EditorUi.prototype.isShapesPanelVisible = function() {
    return 0 < this.hsplitPosition;
  };
  var y = EditorUi.prototype.isFormatPanelVisible;
  EditorUi.prototype.isFormatPanelVisible = function() {
    var d = this.formatWindow;
    return null != d ? d.window.isVisible() : y.apply(this, arguments);
  };
  var E = EditorUi.prototype.refresh;
  EditorUi.prototype.refresh = function(d) {
    if (null != this.sketchWrapperElt && null != this.sketchWrapperElt.parentNode) {
      d = null != d ? d : !0;
      if ('1' != urlParams.embedInline) {
        var g = this.container.clientWidth;
        this.container == document.body && (g = document.body.clientWidth || document.documentElement.clientWidth);
        var n = this.getDiagramContainerOffset();
        var v = n.x;
        var u = n.y;
        'simple' == Editor.currentTheme && (u += this.sketchMainMenuElt.offsetHeight);
        this.diagramContainer.style.top = u + 'px';
        this.diagramContainer.style.bottom = '0';
        'simple' == Editor.currentTheme ? (this.hsplit.style.top = this.sketchMainMenuElt.offsetHeight + 'px', this.sidebarContainer.style.top = this.hsplit.style.top, this.formatContainer.style.top = this.hsplit.style.top, g = Math.max(0, Math.min((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - this.formatWidth, Math.min(this.hsplitPosition, g - this.splitSize - 40))), this.sidebarContainer.style.width = g + 'px', this.diagramContainer.style.left = g + v + 'px', this.tabContainer.style.left = g + 'px', this.tabContainer.style.right = this.formatWidth + 'px', this.sketchMainMenuElt.style.left = '0px', this.sketchMainMenuElt.style.right = '0px', this.hsplit.style.left = g + 'px', this.diagramContainer.style.right = this.formatWidth + 'px', this.formatContainer.style.width = this.formatWidth + 'px', this.hsplit.style.bottom = this.tabContainer.offsetHeight + 'px', this.diagramContainer.style.bottom = this.hsplit.style.bottom, this.checkTabScrollerOverflow()) : (this.diagramContainer.style.left = n.x + 'px', this.diagramContainer.style.right = '0');
      }
      d && this.editor.graph.sizeDidChange();
    } else
      E.apply(this, arguments);
  };
  EditorUi.prototype.createShapesPanel = function(d) {
    var g = mxUtils.bind(this, function(v) {
      v = this.createMenu(v, null, 'geTitle');
      v.style.cssText = 'position:absolute;border-width:1px;cusor:pointer;border-style:none;height:24px;bottom:0px;text-align:center;padding:8px 6px 0 6px;border-top-style:solid;width:50%;height:32px;box-sizing:border-box;font-size:11px;';
      d.appendChild(v);
      return v;
    });
    if (Editor.enableCustomLibraries && ('1' != urlParams.embed || '1' == urlParams.libraries))
      if (null != this.actions.get('newLibrary'))
        g = document.createElement('div'), g.style.cssText = 'position:absolute;border-width:1px;cusor:pointer;border-style:none;height:24px;bottom:0px;text-align:center;padding:8px 6px 0 6px;border-top-style:solid;width:50%;height:32px;box-sizing:border-box;font-size:11px;', g.className = 'geTitle', mxUtils.write(g, mxResources.get('newLibrary')), d.appendChild(g), mxEvent.addListener(g, 'click', this.actions.get('newLibrary').funct), g = g.cloneNode(!1), g.style.left = '50%', g.style.borderLeftStyle = 'solid', mxUtils.write(g, mxResources.get('openLibrary')), d.appendChild(g), mxEvent.addListener(g, 'click', this.actions.get('openLibrary').funct);
      else {
        var n = g('newLibrary');
        n.style.fontSize = '11px';
        n.style.left = '0';
        n = g('openLibraryFrom');
        n.style.borderLeftStyle = 'solid';
        n.style.fontSize = '11px';
        n.style.left = '50%';
      }
    d.appendChild(this.sidebarContainer);
    d.style.overflow = 'hidden';
  };
  EditorUi.prototype.createShapesWindow = function() {
    if (null == this.sidebarWindow) {
      var d = Math.min(this.diagramContainer.parentNode.clientWidth - 10, 218),
        g = '1' == urlParams.embedInline ? 650 : Math.min(this.diagramContainer.parentNode.clientHeight, 650),
        n = 'simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme;
      this.sidebarWindow = new WrapperWindow(this, mxResources.get('shapes'), n && '1' != urlParams.embedInline ? 66 : 10, n && '1' != urlParams.embedInline ? Math.max(30, (this.diagramContainer.parentNode.clientHeight - g) / 2) : 56, d - 6, g - 6, mxUtils.bind(this, function(v) {
        this.createShapesPanel(v);
      }));
      this.sidebarWindow.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function() {
        this.sidebarWindow.window.fit();
      }));
      this.sidebarWindow.window.minimumSize = new mxRectangle(0, 0, 90, 90);
      this.sidebarWindow.window.setVisible(!1);
    }
  };
  EditorUi.prototype.setSketchMode = function(d) {
    this.spinner.spin(document.body, mxResources.get('working') + '...') && window.setTimeout(mxUtils.bind(this, function() {
      this.spinner.stop();
      this.doSetSketchMode(d);
      null == urlParams.rough && (mxSettings.settings.sketchMode = d, mxSettings.save());
      this.fireEvent(new mxEventObject('sketchModeChanged'));
    }), 0);
  };
  Editor.createMinimalCss = function() {
    return (Editor.isDarkMode() ? 'html body .geMenubarContainer .geMenuItem .geMenuItem, html body .geMenubarContainer a.geMenuItem { color: #353535; }html body .geToolbarContainer .geMenuItem, html body .geToolbarContainer .geToolbarButton, html body .geMenubarContainer .geMenuItem .geMenuItem, html body .geMenubarContainer a.geMenuItem,html body .geMenubarContainer .geToolbarButton { filter: invert(1); }html > body.geEditor > div > a.geItem { background-color: ' + Editor.darkColor + '; color: #cccccc; border-color: #505759; }html body .mxCellEditor { color: #f0f0f0; }' : 'div.diagramContainer button.gePrimaryBtn, .mxWindow button.gePrimaryBtn, .geDialog button.gePrimaryBtn, html body .gePrimaryBtn { background: #29b6f2 !important; color: #fff !important; border: none !important; box-shadow: none !important; }html body .gePrimaryBtn:hover:not([disabled]) { background: #12a2e0 !important; }') + 'html body .geStatus { overflow: hidden; text-overflow: ellipsis; }html body .geStatus > *:not([class]) { vertical-align:top; }html > body > div > a.geItem { background-color: #ffffff; color: #707070; border-top: 1px solid lightgray; border-left: 1px solid lightgray; }html body .mxWindow { z-index: 3; font-size: 12px; }html body table.mxWindow { font-size: 12px; }html body button.geBtn:active { opacity: 0.6; }html body a.geMenuItem { opacity: 0.75; cursor: pointer; user-select: none; }html body a.geMenuItem[disabled] { opacity: 0.2; }html body a.geMenuItem[disabled]:active { opacity: 0.2; }html body a.geMenuItem:active { opacity: 0.2; }html body .geToolbarButton:active { opacity: 0.15; }html body .geStatus:active { opacity: 0.5; }.geStatus > div { box-sizing: border-box; max-width: 100%; text-overflow: ellipsis; }html table.mxPopupMenu tr.mxPopupMenuItemHover:active { opacity: 0.7; }html body .mxWindow input[type="checkbox"] {padding: 0px; }.mxWindow button, .geDialog select, .mxWindow select { display:inline-block; }html body .mxWindow .geColorBtn, html body .geDialog .geColorBtn { background: none; }html body div.diagramContainer button:active, html body .mxWindow button:active, html body .geDialog button:active { opacity: 0.6; }.geBtn button { min-width:72px !important; }div.geToolbarContainer a.geButton { margin:0px; padding: 0 2px 4px 2px; } html body div.geToolbarContainer a.geColorBtn { margin: 2px; } table.mxWindow td.mxWindowPane button.geColorBtn { padding:0px; box-sizing: border-box; }html body .geMenuItem { font-size:14px; text-decoration: none; font-weight: normal; padding: 6px 10px 6px 10px; border: none; border-radius: 5px; color: #353535; box-shadow: inset 0 0 0 1px rgba(0,0,0,.11), inset 0 -1px 0 0 rgba(0,0,0,.08), 0 1px 2px 0 rgba(0,0,0,.04); ' + (EditorUi.isElectronApp ? 'app-region: no-drag; ' : '') + '}div.mxWindow td.mxWindowPane button { background-image: none; float: none; }html div.geVerticalHandle { position:absolute;bottom:0px;left:50%;cursor:row-resize;width:11px;height:11px;background:white;margin-bottom:-6px; margin-left:-6px; border: none; border-radius: 6px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.11), inset 0 -1px 0 0 rgba(0,0,0,.08), 0 1px 2px 0 rgba(0,0,0,.04); }html div.mxRubberband { border:1px solid; border-color: #29b6f2 !important; background:rgba(41,182,242,0.4) !important; } html body div.mxPopupMenu { border-radius:5px; border:1px solid #c0c0c0; padding:5px 0 5px 0; box-shadow: 0px 4px 17px -4px rgba(96,96,96,1); } html table.mxPopupMenu td.mxPopupMenuItem { color: ' + (Editor.isDarkMode() ? '#cccccc' : '#353535') + '; font-size: 14px; padding-top: 4px; padding-bottom: 4px; }html table.mxPopupMenu tr.mxPopupMenuItemHover { background-color: ' + (Editor.isDarkMode() ? '#000000' : '#29b6f2') + '; }html tr.mxPopupMenuItemHover td.mxPopupMenuItem, html tr.mxPopupMenuItemHover td.mxPopupMenuItem span { color: ' + (Editor.isDarkMode() ? '#cccccc' : '#ffffff') + ' !important; }html tr.mxPopupMenuItem, html td.mxPopupMenuItem { transition-property: none !important; }html body td.mxWindowTitle { padding-right: 14px; }';
  };
  EditorUi.prototype.setAndPersistDarkMode = function(d) {
    var g = d;
    'auto' == d && (g = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.setDarkMode(g);
    mxSettings.settings.darkMode = d;
    mxSettings.save();
    g = mxSettings.getUi();
    null == urlParams.ui && 'auto' != d && 'atlas' != g && 'min' != g && 'sketch' != g && 'simple' != g && this.setCurrentTheme(Editor.isDarkMode() ? 'dark' : 'kennedy', !0);
  };
  EditorUi.prototype.setAndPersistLanguage = function(d) {
    mxSettings.setLanguage(d);
    mxSettings.save();
    mxClient.language = d;
    mxResources.loadDefaultBundle = !1;
    mxResources.add(RESOURCE_BASE);
  };
  EditorUi.prototype.isRulerVisible = function() {
    return null != this.ruler;
  };
  EditorUi.prototype.setRulerVisible = function(d) {
    var g = this.getDiagramContainerOffset();
    mxSettings.setRulerOn(d);
    mxSettings.save();
    d || null == this.ruler ? d && null == this.ruler && (this.ruler = new mxDualRuler(this, this.editor.graph.view.unit)) : (this.ruler.destroy(), this.ruler = null);
    this.refresh();
    this.fireEvent(new mxEventObject('rulerVisibleChanged'));
    d = this.getDiagramContainerOffset();
    this.diagramContainer.scrollLeft += d.x - g.x;
    this.diagramContainer.scrollTop += d.x - g.x;
  };
  EditorUi.prototype.setDarkMode = function(d) {
    this.doSetDarkMode(d);
    this.fireEvent(new mxEventObject('darkModeChanged'));
  };
  var z = document.createElement('link');
  z.setAttribute('rel', 'stylesheet');
  z.setAttribute('href', STYLE_PATH + '/dark.css');
  z.setAttribute('charset', 'UTF-8');
  z.setAttribute('type', 'text/css');
  EditorUi.prototype.doSetDarkMode = function(d) {
    if (Editor.darkMode != d) {
      var g = this.editor.graph;
      Editor.darkMode = d;
      this.spinner.opts.color = Editor.isDarkMode() ? '#c0c0c0' : '#000';
      g.view.defaultGridColor = Editor.isDarkMode() ? mxGraphView.prototype.defaultDarkGridColor : mxGraphView.prototype.defaultGridColor;
      g.view.gridColor = g.view.defaultGridColor;
      g.defaultPageBackgroundColor = '1' == urlParams.embedInline ? 'transparent' : Editor.isDarkMode() ? Editor.darkColor : '#ffffff';
      g.defaultPageBorderColor = Editor.isDarkMode() ? '#000000' : '#ffffff';
      g.shapeBackgroundColor = Editor.isDarkMode() ? Editor.darkColor : '#ffffff';
      g.shapeForegroundColor = Editor.isDarkMode() ? Editor.lightColor : '#000000';
      g.defaultThemeName = Editor.isDarkMode() ? 'darkTheme' : 'default-style2';
      g.graphHandler.previewColor = Editor.isDarkMode() ? '#cccccc' : 'black';
      mxGraphHandler.prototype.previewColor = g.graphHandler.previewColor;
      document.body.style.backgroundColor = '1' == urlParams.embedInline ? 'transparent' : Editor.isDarkMode() ? Editor.darkColor : '#ffffff';
      g.loadStylesheet();
      null != this.actions.layersWindow && (d = this.actions.layersWindow.window.isVisible(), this.actions.layersWindow.window.setVisible(!1), this.actions.layersWindow.destroy(), this.actions.layersWindow = null, d && window.setTimeout(this.actions.get('layers').funct, 0));
      null != this.menus.commentsWindow && (this.menus.commentsWindow.window.setVisible(!1), this.menus.commentsWindow.destroy(), this.menus.commentsWindow = null);
      null != this.ruler && this.ruler.updateStyle();
      Graph.prototype.defaultPageBackgroundColor = g.defaultPageBackgroundColor;
      Graph.prototype.defaultPageBorderColor = g.defaultPageBorderColor;
      Graph.prototype.shapeBackgroundColor = g.shapeBackgroundColor;
      Graph.prototype.shapeForegroundColor = g.shapeForegroundColor;
      Graph.prototype.defaultThemeName = g.defaultThemeName;
      StyleFormatPanel.prototype.defaultStrokeColor = Editor.isDarkMode() ? '#cccccc' : 'black';
      Format.inactiveTabBackgroundColor = Editor.isDarkMode() ? '#000000' : '#e4e4e4';
      Dialog.backdropColor = Editor.isDarkMode() ? Editor.darkColor : 'white';
      mxConstants.DROP_TARGET_COLOR = Editor.isDarkMode() ? '#00ff00' : '#0000FF';
      Editor.helpImage = Editor.isDarkMode() && mxClient.IS_SVG ? Editor.darkHelpImage : Editor.lightHelpImage;
      Editor.checkmarkImage = Editor.isDarkMode() && mxClient.IS_SVG ? Editor.darkCheckmarkImage : Editor.lightCheckmarkImage;
      null != this.sketchStyleElt ? this.sketchStyleElt.innerHTML = Editor.createMinimalCss() : null != Editor.styleElt && (Editor.styleElt.innerHTML = Editor.createMinimalCss());
      Editor.isDarkMode() ? null == z.parentNode && document.getElementsByTagName('head')[0].appendChild(z) : null != z.parentNode && z.parentNode.removeChild(z);
    }
  };
  EditorUi.prototype.setPagesVisible = function(d) {
    Editor.pagesVisible != d && (Editor.pagesVisible = d, mxSettings.settings.pagesVisible = d, mxSettings.save(), this.fireEvent(new mxEventObject('pagesVisibleChanged')));
  };
  EditorUi.prototype.setSidebarTitles = function(d, g) {
    this.sidebar.sidebarTitles != d && (this.sidebar.sidebarTitles = d, this.sidebar.refresh(), Editor.isSettingsEnabled() && g && (mxSettings.settings.sidebarTitles = d, mxSettings.save()), this.fireEvent(new mxEventObject('sidebarTitlesChanged')));
  };
  EditorUi.prototype.saveScrollState = function() {
    var d = this.editor.graph.view.translate,
      g = mxUtils.getOffset(this.diagramContainer),
      n = this.diagramContainer.scrollLeft - g.x;
    g = this.diagramContainer.scrollTop - g.y;
    null != this.embedViewport && (Editor.inlineFullscreen ? (n -= this.embedViewport.x, g -= this.embedViewport.y) : (n += this.embedViewport.x, g += this.embedViewport.y));
    return {
      x: n,
      y: g,
      tx: d.x,
      ty: d.y
    };
  };
  EditorUi.prototype.restoreScrollState = function(d) {
    var g = this.editor.graph.view.scale,
      n = this.editor.graph.view.translate,
      v = mxUtils.getOffset(this.diagramContainer);
    this.diagramContainer.scrollLeft = d.x + v.x + (n.x - d.tx) * g;
    this.diagramContainer.scrollTop = d.y + v.y + (n.y - d.ty) * g;
  };
  EditorUi.prototype.setInlineFullscreen = function(d) {
    if (Editor.inlineFullscreen != d) {
      var g = this.saveScrollState();
      Editor.inlineFullscreen = d;
      this.fireEvent(new mxEventObject('inlineFullscreenChanged'));
      this.fitWindows();
      this.editor.graph.refresh();
      this.restoreScrollState(g);
      (window.opener || window.parent).postMessage(JSON.stringify({
        event: 'resize',
        fullscreen: Editor.inlineFullscreen,
        rect: this.diagramContainer.getBoundingClientRect()
      }), '*');
    }
  };
  EditorUi.prototype.inlineSizeChanged = function() {
    var d = this.sketchFooterMenuElt,
      g = this.sketchMainMenuElt,
      n = this.sketchPickerMenuElt,
      v = this.editor.graph;
    if (Editor.inlineFullscreen)
      g.style.left = '10px', g.style.top = '10px', n.style.left = '10px', n.style.top = '60px', d.style.top = '10px', d.style.right = '12px', d.style.left = '', null == this.diagramContainer.getAttribute('data-bounds') && (this.diagramContainer.setAttribute('data-bounds', this.diagramContainer.style.top + ' ' + this.diagramContainer.style.left + ' ' + this.diagramContainer.style.width + ' ' + this.diagramContainer.style.height), this.diagramContainer.style.top = '0px', this.diagramContainer.style.left = '0px', this.diagramContainer.style.bottom = '0px', this.diagramContainer.style.right = '0px', this.diagramContainer.style.width = '', this.diagramContainer.style.height = '');
    else {
      var u = this.diagramContainer.getAttribute('data-bounds');
      null != u && (this.diagramContainer.removeAttribute('data-bounds'), v = v.getGraphBounds(), u = u.split(' '), this.diagramContainer.style.top = u[0], this.diagramContainer.style.left = u[1], this.diagramContainer.style.width = v.width + 50 + 'px', this.diagramContainer.style.height = v.height + 46 + 'px', this.diagramContainer.style.bottom = '', this.diagramContainer.style.right = '', (window.opener || window.parent).postMessage(JSON.stringify({
        event: 'resize',
        rect: this.diagramContainer.getBoundingClientRect()
      }), '*'));
      g.style.left = this.diagramContainer.offsetLeft + 'px';
      g.style.top = this.diagramContainer.offsetTop - g.offsetHeight - 4 + 'px';
      n.style.display = '';
      n.style.left = this.diagramContainer.offsetLeft - n.offsetWidth - 4 + 'px';
      n.style.top = this.diagramContainer.offsetTop + 'px';
      d.style.left = this.diagramContainer.offsetLeft + this.diagramContainer.offsetWidth - d.offsetWidth + 'px';
      d.style.top = g.style.top;
      d.style.right = '';
      this.bottomResizer.style.left = this.diagramContainer.offsetLeft + (this.diagramContainer.offsetWidth - this.bottomResizer.offsetWidth) / 2 + 'px';
      this.bottomResizer.style.top = this.diagramContainer.offsetTop + this.diagramContainer.offsetHeight - this.bottomResizer.offsetHeight / 2 - 1 + 'px';
      this.rightResizer.style.left = this.diagramContainer.offsetLeft + this.diagramContainer.offsetWidth - this.rightResizer.offsetWidth / 2 - 1 + 'px';
      this.rightResizer.style.top = this.diagramContainer.offsetTop + (this.diagramContainer.offsetHeight - this.bottomResizer.offsetHeight) / 2 + 'px';
      this.diagramContainer.style.background = 'transparent';
    }
    this.bottomResizer.style.visibility = Editor.inlineFullscreen ? 'hidden' : '';
    this.rightResizer.style.visibility = this.bottomResizer.style.visibility;
    g.style.visibility = '';
    d.style.visibility = '';
  };
  EditorUi.prototype.doSetSketchMode = function(d) {
    Editor.sketchMode != d && (Editor.sketchMode = d, this.updateDefaultStyles());
  };
  EditorUi.prototype.updateDefaultStyles = function() {
    var d = this.editor.graph;
    d.defaultVertexStyle = mxUtils.clone(Graph.prototype.defaultVertexStyle);
    d.defaultEdgeStyle = mxUtils.clone(Graph.prototype.defaultEdgeStyle);
    this.menus.defaultFontSize = Editor.sketchMode ? 20 : 'simple' == Editor.currentTheme ? 16 : Menus.prototype.defaultFontSize;
    if (this.menus.defaultFontSize == Menus.prototype.defaultFontSize)
      d.defaultEdgeStyle.fontSize = null, d.defaultVertexStyle.fontSize = null;
    else {
      d.defaultVertexStyle.fontSize = this.menus.defaultFontSize;
      var g = parseInt(this.menus.defaultFontSize) - 4;
      d.defaultEdgeStyle.fontSize = g;
    }
    if ('simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme)
      d.defaultEdgeStyle.edgeStyle = 'none', d.defaultEdgeStyle.curved = '1', d.defaultEdgeStyle.rounded = '0', d.defaultEdgeStyle.jettySize = 'auto', d.defaultEdgeStyle.orthogonalLoop = '1', d.defaultEdgeStyle.endArrow = 'open', d.defaultEdgeStyle.endSize = '14', d.defaultEdgeStyle.startSize = '14', d.defaultEdgeStyle.sourcePerimeterSpacing = '8', d.defaultEdgeStyle.targetPerimeterSpacing = '8';
    Editor.sketchMode ? (this.menus.defaultFonts = Menus.prototype.defaultFonts.concat(Editor.sketchFonts), d.defaultVertexStyle.fontFamily = Editor.sketchFontFamily, d.defaultVertexStyle.fontSource = Editor.sketchFontSource, d.defaultVertexStyle.hachureGap = '4', d.defaultVertexStyle.sketch = '1', d.defaultVertexStyle.curveFitting = Editor.sketchDefaultCurveFitting, d.defaultVertexStyle.jiggle = Editor.sketchDefaultJiggle, d.defaultEdgeStyle.fontFamily = Editor.sketchFontFamily, d.defaultEdgeStyle.fontSource = Editor.sketchFontSource, d.defaultEdgeStyle.sketch = '1', d.defaultEdgeStyle.curveFitting = Editor.sketchDefaultCurveFitting, d.defaultEdgeStyle.jiggle = Editor.sketchDefaultJiggle, d.defaultEdgeStyle.hachureGap = '4') : this.menus.defaultFonts = Menus.prototype.defaultFonts;
    d.currentVertexStyle = mxUtils.clone(d.defaultVertexStyle);
    d.currentEdgeStyle = mxUtils.clone(d.defaultEdgeStyle);
    this.clearDefaultStyle();
  };
  EditorUi.prototype.getLinkTitle = function(d) {
    var g = Graph.prototype.getLinkTitle.apply(this, arguments);
    if (Graph.isPageLink(d)) {
      var n = d.indexOf(',');
      0 < n && (g = this.getPageById(d.substring(n + 1)), g = null != g ? g.getName() : mxResources.get('pageNotFound'));
    } else
      'data:' == d.substring(0, 5) && (g = mxResources.get('action'));
    return g;
  };
  EditorUi.prototype.handleCustomLink = function(d) {
    if (Graph.isPageLink(d)) {
      var g = d.indexOf(',');
      if (d = this.getPageById(d.substring(g + 1)))
        this.selectPage(d);
      else
        throw Error(mxResources.get('pageNotFound') || 'Page not found');
    } else
      this.editor.graph.handleCustomLink(d);
  };
  EditorUi.prototype.installSettings = function() {
    if (Editor.isSettingsEnabled()) {
      Editor.pagesVisible = mxSettings.settings.pagesVisible;
      ColorDialog.recentColors = mxSettings.getRecentColors();
      if (isLocalStorage)
        try {
          window.addEventListener('storage', mxUtils.bind(this, function(d) {
            d.key == mxSettings.key && (mxSettings.load(), ColorDialog.recentColors = mxSettings.getRecentColors(), this.menus.customFonts = mxSettings.getCustomFonts());
          }), !1);
        } catch (d) {}
      this.fireEvent(new mxEventObject('styleChanged', 'keys', [], 'values', [], 'cells', []));
      this.menus.customFonts = mxSettings.getCustomFonts();
      this.addListener('customFontsChanged', mxUtils.bind(this, function(d, g) {
        '1' != urlParams['ext-fonts'] ? mxSettings.setCustomFonts(this.menus.customFonts) : (d = g.getProperty('customFonts'), this.menus.customFonts = d, mxSettings.setCustomFonts(d));
        mxSettings.save();
      }));
      this.editor.graph.connectionHandler.setCreateTarget(mxSettings.isCreateTarget());
      this.fireEvent(new mxEventObject('copyConnectChanged'));
      this.addListener('copyConnectChanged', mxUtils.bind(this, function(d, g) {
        mxSettings.setCreateTarget(this.editor.graph.connectionHandler.isCreateTarget());
        mxSettings.save();
      }));
      this.editor.graph.pageFormat = null != this.editor.graph.defaultPageFormat ? this.editor.graph.defaultPageFormat : mxSettings.getPageFormat();
      this.addListener('pageFormatChanged', mxUtils.bind(this, function(d, g) {
        mxSettings.setPageFormat(this.editor.graph.pageFormat);
        mxSettings.save();
      }));
      this.editor.graph.view.gridColor = mxSettings.getGridColor(Editor.isDarkMode());
      this.editor.graph.view.defaultDarkGridColor = mxSettings.getGridColor(!0);
      this.editor.graph.view.defaultGridColor = mxSettings.getGridColor(!1);
      this.addListener('gridColorChanged', mxUtils.bind(this, function(d, g) {
        mxSettings.setGridColor(this.editor.graph.view.gridColor, Editor.isDarkMode());
        mxSettings.save();
      }));
      if (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
        this.editor.addListener('autosaveChanged', mxUtils.bind(this, function(d, g) {
          mxSettings.setAutosave(this.editor.autosave);
          mxSettings.save();
        })), this.editor.autosave = mxSettings.getAutosave();
      null != this.sidebar && (null != urlParams['search-shapes'] && null != this.sidebar.searchShapes ? (this.sidebar.searchShapes(decodeURIComponent(urlParams['search-shapes'])), this.sidebar.showEntries('search')) : (this.sidebar.showPalette('search', mxSettings.settings.search), this.editor.chromeless && !this.editor.editable || !(mxSettings.settings.isNew || 8 >= parseInt(mxSettings.settings.version || 0)) || (this.toggleScratchpad(), mxSettings.save())));
      this.addListener('formatWidthChanged', function() {
        mxSettings.setFormatWidth(this.formatWidth);
        mxSettings.save();
      });
    }
  };
  EditorUi.prototype.copyImage = function(d, g, n) {
    try {
      null != navigator.clipboard && 'function' === typeof window.ClipboardItem && this.spinner.spin(document.body, mxResources.get('exporting')) && this.editor.exportToCanvas(mxUtils.bind(this, function(v, u) {
        try {
          this.spinner.stop();
          var x = this.createImageDataUri(v, g, 'png'),
            C = parseInt(u.getAttribute('width')),
            F = parseInt(u.getAttribute('height'));
          this.writeImageToClipboard(x, C, F, mxUtils.bind(this, function(L) {
            this.handleError(L);
          }));
        } catch (L) {
          this.handleError(L);
        }
      }), null, null, null, mxUtils.bind(this, function(v) {
        this.spinner.stop();
        this.handleError(v);
      }), null, null, null != n ? n : 4, null == this.editor.graph.background || this.editor.graph.background == mxConstants.NONE, null, null, null, 10, null, null, !1, null, 0 < d.length ? d : null);
    } catch (v) {
      this.handleError(v);
    }
  };
  EditorUi.prototype.writeImageToClipboard = function(d, g, n, v) {
    var u = this.base64ToBlob(d.substring(d.indexOf(',') + 1), 'image/png');
    d = new ClipboardItem({
      'image/png': u,
      'text/html': new Blob(['<img src="' + d + '" width="' + g + '" height="' + n + '">'], {
        type: 'text/html'
      })
    });
    navigator.clipboard.write([d])['catch'](v);
  };
  EditorUi.prototype.copyCells = function(d, g) {
    var n = this.editor.graph;
    if (n.isSelectionEmpty())
      d.innerText = '';
    else {
      var v = mxUtils.sortCells(n.model.getTopmostCells(n.getSelectionCells())),
        u = mxUtils.getXml(n.encodeCells(v));
      mxUtils.setTextContent(d, encodeURIComponent(u));
      g ? (n.removeCells(v, !1), n.lastPasteXml = null) : (n.lastPasteXml = u, n.pasteCounter = 0);
      d.focus();
      document.execCommand('selectAll', !1, null);
    }
  };
  EditorUi.prototype.copyXml = function() {
    var d = null;
    if (Editor.enableNativeCipboard) {
      var g = this.editor.graph;
      g.isSelectionEmpty() || (d = mxUtils.sortCells(g.getExportableCells(g.model.getTopmostCells(g.getSelectionCells()))), g = mxUtils.getXml(g.encodeCells(d)), navigator.clipboard.writeText(g));
    }
    return d;
  };
  EditorUi.prototype.pasteXml = function(d, g, n, v) {
    var u = this.editor.graph,
      x = null;
    u.lastPasteXml == d ? u.pasteCounter++ : (u.lastPasteXml = d, u.pasteCounter = 0);
    var C = u.pasteCounter * u.gridSize;
    if (n || this.isCompatibleString(d))
      x = this.importXml(d, C, C), u.setSelectionCells(x);
    else if (g && 1 == u.getSelectionCount()) {
      C = u.getStartEditingCell(u.getSelectionCell(), v);
      if (/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(d) && 'image' == u.getCurrentCellStyle(C)[mxConstants.STYLE_SHAPE])
        u.setCellStyles(mxConstants.STYLE_IMAGE, d, [C]);
      else {
        u.model.beginUpdate();
        try {
          u.labelChanged(C, d), Graph.isLink(d) && u.setLinkForCell(C, d);
        } finally {
          u.model.endUpdate();
        }
      }
      u.setSelectionCell(C);
    } else
      x = u.getInsertPoint(), u.isMouseInsertPoint() && (C = 0, u.lastPasteXml == d && 0 < u.pasteCounter && u.pasteCounter--), x = this.insertTextAt(d, x.x + C, x.y + C, !0), u.setSelectionCells(x);
    u.isSelectionEmpty() || (u.scrollCellToVisible(u.getSelectionCell()), null != this.hoverIcons && this.hoverIcons.update(u.view.getState(u.getSelectionCell())));
    return x;
  };
  EditorUi.prototype.pasteCells = function(d, g, n, v) {
    if (!mxEvent.isConsumed(d)) {
      var u = g,
        x = !1;
      if (n && null != d.clipboardData && d.clipboardData.getData) {
        var C = d.clipboardData.getData('text/plain'),
          F = !1;
        if (null != C && 0 < C.length && '%3CmxGraphModel%3E' == C.substring(0, 18))
          try {
            var L = decodeURIComponent(C);
            this.isCompatibleString(L) && (F = !0, C = L);
          } catch (M) {}
        F = F ? null : d.clipboardData.getData('text/html');
        null != F && 0 < F.length ? (u = this.parseHtmlData(F), x = 'text/plain' != u.getAttribute('data-type')) : null != C && 0 < C.length && (u = document.createElement('div'), mxUtils.setTextContent(u, F));
      }
      C = u.getElementsByTagName('span');
      if (null != C && 0 < C.length && 'application/vnd.lucid.chart.objects' === C[0].getAttribute('data-lucid-type'))
        n = C[0].getAttribute('data-lucid-content'), null != n && 0 < n.length && (this.convertLucidChart(n, mxUtils.bind(this, function(M) {
          var I = this.editor.graph;
          I.lastPasteXml == M ? I.pasteCounter++ : (I.lastPasteXml = M, I.pasteCounter = 0);
          var Q = I.pasteCounter * I.gridSize;
          I.setSelectionCells(this.importXml(M, Q, Q));
          I.scrollCellToVisible(I.getSelectionCell());
        }), mxUtils.bind(this, function(M) {
          this.handleError(M);
        })), mxEvent.consume(d));
      else {
        var l = x ? u.innerHTML : mxUtils.trim(null == u.innerText ? mxUtils.getTextContent(u) : u.innerText),
          q = !1;
        try {
          var A = l.lastIndexOf('%3E');
          0 <= A && A < l.length - 3 && (l = l.substring(0, A + 3));
        } catch (M) {}
        try {
          C = u.getElementsByTagName('span'), (L = null != C && 0 < C.length ? mxUtils.trim(decodeURIComponent(C[0].textContent)) : decodeURIComponent(l)) && (this.isCompatibleString(L) || 0 == L.substring(0, 20).replace(/\s/g, '').indexOf('{"isProtected":')) && (q = !0, l = L);
        } catch (M) {}
        try {
          if (null != l && 0 < l.length) {
            if (0 == l.substring(0, 20).replace(/\s/g, '').indexOf('{"isProtected":')) {
              var H = mxUtils.bind(this, function() {
                try {
                  l = new MiroImporter().importMiroJson(JSON.parse(l)), this.pasteXml(l, v, q, d);
                } catch (M) {
                  console.log('Miro import error:', M);
                }
              });
              'undefined' === typeof MiroImporter ? mxscript('js/diagramly/miro/MiroImporter.js', H) : H();
            } else
              this.pasteXml(l, v, q, d);
            try {
              mxEvent.consume(d);
            } catch (M) {}
          } else if (!n) {
            var K = this.editor.graph;
            K.lastPasteXml = null;
            K.pasteCounter = 0;
          }
        } catch (M) {
          this.handleError(M);
        }
      }
    }
    g.innerHTML = '&nbsp;';
  };
  EditorUi.prototype.addFileDropHandler = function(d) {
    if (Graph.fileSupport)
      for (var g = null, n = 0; n < d.length; n++)
        mxEvent.addListener(d[n], 'dragleave', function(v) {
          null != g && (g.parentNode.removeChild(g), g = null);
          v.stopPropagation();
          v.preventDefault();
        }), mxEvent.addListener(d[n], 'dragover', mxUtils.bind(this, function(v) {
          (this.editor.graph.isEnabled() || '1' != urlParams.embed) && null == g && (!mxClient.IS_IE || 10 < document.documentMode && 12 > document.documentMode) && (g = this.highlightElement());
          v.stopPropagation();
          v.preventDefault();
        })), mxEvent.addListener(d[n], 'drop', mxUtils.bind(this, function(v) {
          null != g && (g.parentNode.removeChild(g), g = null);
          if (this.editor.graph.isEnabled() || '1' != urlParams.embed)
            if (0 < v.dataTransfer.files.length)
              this.hideDialog(), '1' == urlParams.embed ? this.importFiles(v.dataTransfer.files, 0, 0, this.maxImageSize, null, null, null, null, !mxEvent.isControlDown(v) && !mxEvent.isShiftDown(v)) : this.openFiles(v.dataTransfer.files, !0);
            else {
              var u = this.extractGraphModelFromEvent(v);
              if (null == u) {
                var x = null != v.dataTransfer ? v.dataTransfer : v.clipboardData;
                null != x && (10 == document.documentMode || 11 == document.documentMode ? u = x.getData('Text') : (u = null, u = 0 <= mxUtils.indexOf(x.types, 'text/uri-list') ? v.dataTransfer.getData('text/uri-list') : 0 <= mxUtils.indexOf(x.types, 'text/html') ? x.getData('text/html') : null, null != u && 0 < u.length ? (x = document.createElement('div'), x.innerHTML = Graph.sanitizeHtml(u), x = x.getElementsByTagName('img'), 0 < x.length && (u = x[0].getAttribute('src'))) : 0 <= mxUtils.indexOf(x.types, 'text/plain') && (u = x.getData('text/plain'))), null != u && (Editor.isPngDataUrl(u) ? (u = Editor.extractGraphModelFromPng(u), null != u && 0 < u.length && this.openLocalFile(u, null, !0)) : this.isRemoteFileFormat(u) ? this.isOffline() ? this.showError(mxResources.get('error'), mxResources.get('notInOffline')) : new mxXmlRequest(OPEN_URL, 'format=xml&data=' + encodeURIComponent(u)).send(mxUtils.bind(this, function(C) {
                  200 <= C.getStatus() && 299 >= C.getStatus() ? this.openLocalFile(C.getText(), null, !0) : this.showError(mxResources.get('error'), 413 == C.getStatus() ? mxResources.get('diagramTooLarge') : mxResources.get('unknownError'));
                })) : /^https?:\/\//.test(u) && (null == this.getCurrentFile() ? window.location.hash = '#U' + encodeURIComponent(u) : window.openWindow((mxClient.IS_CHROMEAPP ? EditorUi.drawHost + '/' : 'https://' + location.host + '/') + window.location.search + '#U' + encodeURIComponent(u)))));
              } else
                this.openLocalFile(u, null, !0);
            }
          v.stopPropagation();
          v.preventDefault();
        }));
  };
  EditorUi.prototype.highlightElement = function(d) {
    var g = 0,
      n = 0;
    if (null == d) {
      var v = document.body;
      var u = document.documentElement;
      var x = (v.clientWidth || u.clientWidth) - 3;
      v = Math.max(v.clientHeight || 0, u.clientHeight) - 3;
    } else
      g = d.offsetTop, n = d.offsetLeft, x = d.clientWidth, v = d.clientHeight;
    u = document.createElement('div');
    u.style.zIndex = mxPopupMenu.prototype.zIndex + 2;
    u.style.border = '3px dotted rgb(254, 137, 12)';
    u.style.pointerEvents = 'none';
    u.style.position = 'absolute';
    u.style.top = g + 'px';
    u.style.left = n + 'px';
    u.style.width = Math.max(0, x - 3) + 'px';
    u.style.height = Math.max(0, v - 3) + 'px';
    null != d && d.parentNode == this.editor.graph.container ? this.editor.graph.container.appendChild(u) : document.body.appendChild(u);
    return u;
  };
  EditorUi.prototype.stringToCells = function(d) {
    d = mxUtils.parseXml(d);
    var g = this.editor.extractGraphModel(d.documentElement);
    d = [];
    if (null != g) {
      var n = new mxCodec(g.ownerDocument),
        v = new mxGraphModel();
      n.decode(g, v);
      g = v.getChildAt(v.getRoot(), 0);
      for (n = 0; n < v.getChildCount(g); n++)
        d.push(v.getChildAt(g, n));
    }
    return d;
  };
  EditorUi.prototype.openFileHandle = function(d, g, n, v, u) {
    if (null != g && 0 < g.length) {
      !this.useCanvasForExport && /(\.png)$/i.test(g) ? g = g.substring(0, g.length - 4) + '.drawio' : /(\.pdf)$/i.test(g) && (g = g.substring(0, g.length - 4) + '.drawio');
      var x = mxUtils.bind(this, function(F) {
        g = 0 <= g.lastIndexOf('.') ? g.substring(0, g.lastIndexOf('.')) + '.drawio' : g + '.drawio';
        if ('<mxlibrary' == F.substring(0, 10)) {
          null == this.getCurrentFile() && '1' != urlParams.embed && this.openLocalFile(this.emptyDiagramXml, this.defaultFilename, v);
          try {
            this.loadLibrary(new LocalLibrary(this, F, g));
          } catch (L) {
            this.handleError(L, mxResources.get('errorLoadingFile'));
          }
        } else
          this.openLocalFile(F, g, v);
      });
      if (/(\.v(dx|sdx?))($|\?)/i.test(g) || /(\.vs(x|sx?))($|\?)/i.test(g))
        this.importVisio(n, mxUtils.bind(this, function(F) {
          this.spinner.stop();
          x(F);
        }));
      else if (/(\.*<graphml )/.test(d))
        this.importGraphML(d, mxUtils.bind(this, function(F) {
          this.spinner.stop();
          x(F);
        }));
      else if (Graph.fileSupport && new XMLHttpRequest().upload && this.isRemoteFileFormat(d, g))
        this.isOffline() ? (this.spinner.stop(), this.showError(mxResources.get('error'), mxResources.get('notInOffline'))) : this.parseFile(n, mxUtils.bind(this, function(F) {
          4 == F.readyState && (this.spinner.stop(), 200 <= F.status && 299 >= F.status ? x(F.responseText) : this.handleError({
            message: mxResources.get(413 == F.status ? 'drawingTooLarge' : 'invalidOrMissingFile')
          }, mxResources.get('errorLoadingFile')));
        }));
      else if (this.isLucidChartData(d))
        /(\.json)$/i.test(g) && (g = g.substring(0, g.length - 5) + '.drawio'), this.convertLucidChart(d, mxUtils.bind(this, function(F) {
          this.spinner.stop();
          this.openLocalFile(F, g, v);
        }), mxUtils.bind(this, function(F) {
          this.spinner.stop();
          this.handleError(F);
        }));
      else if ('<mxlibrary' == d.substring(0, 10)) {
        this.spinner.stop();
        null == this.getCurrentFile() && '1' != urlParams.embed && this.openLocalFile(this.emptyDiagramXml, this.defaultFilename, v);
        try {
          this.loadLibrary(new LocalLibrary(this, d, n.name));
        } catch (F) {
          this.handleError(F, mxResources.get('errorLoadingFile'));
        }
      } else if (0 == d.indexOf('PK'))
        this.importZipFile(n, mxUtils.bind(this, function(F) {
          this.spinner.stop();
          x(F);
        }), mxUtils.bind(this, function() {
          this.spinner.stop();
          this.openLocalFile(d, g, v);
        }));
      else {
        if ('image/png' == n.type.substring(0, 9))
          d = this.extractGraphModelFromPng(d);
        else if ('application/pdf' == n.type) {
          var C = Editor.extractGraphModelFromPdf(d);
          null != C && (u = null, v = !0, d = C);
        }
        this.spinner.stop();
        this.openLocalFile(d, g, v, u, null != u ? n : null);
      }
    }
  };
  EditorUi.prototype.openFiles = function(d, g) {
    if (this.spinner.spin(document.body, mxResources.get('loading')))
      for (var n = 0; n < d.length; n++)
        mxUtils.bind(this, function(v) {
          var u = new FileReader();
          u.onload = mxUtils.bind(this, function(x) {
            try {
              this.openFileHandle(x.target.result, v.name, v, g);
            } catch (C) {
              this.handleError(C);
            }
          });
          u.onerror = mxUtils.bind(this, function(x) {
            this.spinner.stop();
            this.handleError(x);
            window.openFile = null;
          });
          'image' !== v.type.substring(0, 5) && 'application/pdf' !== v.type || 'image/svg' === v.type.substring(0, 9) ? u.readAsText(v) : u.readAsDataURL(v);
        })(d[n]);
  };
  EditorUi.prototype.openLocalFile = function(d, g, n, v, u) {
    var x = this.getCurrentFile(),
      C = mxUtils.bind(this, function() {
        window.openFile = null;
        if (null == g && null != this.getCurrentFile() && this.isDiagramEmpty()) {
          var F = mxUtils.parseXml(d);
          null != F && (this.editor.setGraphXml(F.documentElement), this.editor.graph.selectAll());
        } else
          this.fileLoaded(new LocalFile(this, d, g || this.defaultFilename, n, v, u));
      });
    if (null != d && 0 < d.length)
      null == x || !x.isModified() && (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || null != v) ? C() : (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || null != v) && null != x && x.isModified() ? this.confirm(mxResources.get('allChangesLost'), null, C, mxResources.get('cancel'), mxResources.get('discardChanges')) : (window.openFile = new OpenFile(function() {
        window.openFile = null;
      }), window.openFile.setData(d, g), window.openWindow(this.getUrl(), null, mxUtils.bind(this, function() {
        null != x && x.isModified() ? this.confirm(mxResources.get('allChangesLost'), null, C, mxResources.get('cancel'), mxResources.get('discardChanges')) : C();
      })));
    else
      throw Error(mxResources.get('notADiagramFile'));
  };
  EditorUi.prototype.getBasenames = function() {
    var d = {};
    if (null != this.pages)
      for (var g = 0; g < this.pages.length; g++)
        this.updatePageRoot(this.pages[g]), this.addBasenamesForCell(this.pages[g].root, d);
    else
      this.addBasenamesForCell(this.editor.graph.model.getRoot(), d);
    g = [];
    for (var n in d)
      g.push(n);
    return g;
  };
  EditorUi.prototype.addBasenamesForCell = function(d, g) {
    function n(C) {
      if (null != C) {
        var F = C.lastIndexOf('.');
        0 < F && (C = C.substring(F + 1, C.length));
        null == g[C] && (g[C] = !0);
      }
    }
    var v = this.editor.graph,
      u = v.getCellStyle(d);
    n(mxStencilRegistry.getBasenameForStencil(u[mxConstants.STYLE_SHAPE]));
    v.model.isEdge(d) && (n(mxMarker.getPackageForType(u[mxConstants.STYLE_STARTARROW])), n(mxMarker.getPackageForType(u[mxConstants.STYLE_ENDARROW])));
    u = v.model.getChildCount(d);
    for (var x = 0; x < u; x++)
      this.addBasenamesForCell(v.model.getChildAt(d, x), g);
  };
  EditorUi.prototype.setGraphEnabled = function(d) {
    this.diagramContainer.style.visibility = d ? '' : 'hidden';
    this.formatContainer.style.visibility = d ? '' : 'hidden';
    this.sidebarContainer.style.display = d ? '' : 'none';
    this.hsplit.style.display = d && 'sketch' != Editor.currentTheme && 'min' != Editor.currentTheme ? '' : 'none';
    this.editor.graph.setEnabled(d);
    null != this.tabContainer && (this.tabContainer.style.visibility = d ? '' : 'hidden');
    null != this.ruler && (this.ruler.hRuler.container.style.visibility = d ? '' : 'hidden', this.ruler.vRuler.container.style.visibility = d ? '' : 'hidden');
    d || this.hideWindows();
  };
  EditorUi.prototype.initializeEmbedMode = function() {
    this.setGraphEnabled(!1);
    if ((window.opener || window.parent) != window && ('1' != urlParams.spin || this.spinner.spin(document.body, mxResources.get('loading')))) {
      var d = !1;
      this.installMessageHandler(mxUtils.bind(this, function(g, n, v, u) {
        d || (d = !0, this.spinner.stop(), this.addEmbedButtons(), this.setGraphEnabled(!0));
        if (null == g || 0 == g.length)
          g = this.emptyDiagramXml;
        this.setCurrentFile(new EmbedFile(this, g, {}));
        this.mode = App.MODE_EMBED;
        this.setFileData(g);
        if (u)
          try {
            var x = this.editor.graph;
            x.setGridEnabled(!1);
            x.pageVisible = !1;
            var C = x.model.cells,
              F;
            for (F in C) {
              var L = C[F];
              null != L && null != L.style && (L.style += ';sketch=1;' + (-1 == L.style.indexOf('fontFamily=') || -1 < L.style.indexOf('fontFamily=Helvetica;') ? 'fontFamily=Architects Daughter;fontSource=https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DArchitects%2BDaughter;' : ''));
            }
          } catch (l) {
            console.log(l);
          }
        this.editor.isChromelessView() ? this.editor.graph.isLightboxView() && this.lightboxFit() : this.showLayersDialog();
        this.chromelessResize && this.chromelessResize();
        this.editor.undoManager.clear();
        this.editor.modified = null != v ? v : !1;
        this.updateUi();
        window.self !== window.top && window.focus();
        null != this.format && this.format.refresh();
      }));
    }
  };
  EditorUi.prototype.showLayersDialog = function() {
    1 < this.editor.graph.getModel().getChildCount(this.editor.graph.getModel().getRoot()) && (null == this.actions.layersWindow ? this.actions.get('layers').funct() : this.actions.layersWindow.window.setVisible(!0));
  };
  EditorUi.prototype.getPublicUrl = function(d, g) {
    null != d ? d.getPublicUrl(g) : g(null);
  };
  EditorUi.prototype.createLoadMessage = function(d) {
    var g = this.editor.graph;
    return {
      event: d,
      pageVisible: g.pageVisible,
      translate: g.view.translate,
      bounds: g.getGraphBounds(),
      currentPage: this.getSelectedPageIndex(),
      scale: g.view.scale,
      page: g.view.getBackgroundPageBounds()
    };
  };
  EditorUi.prototype.sendEmbeddedSvgExport = function(d) {
    var g = this.editor.graph;
    g.isEditing() && g.stopEditing(!g.isInvokesStopCellEditing());
    var n = window.opener || window.parent;
    if (this.editor.modified) {
      var v = g.background;
      if (null == v || v == mxConstants.NONE)
        v = this.embedExportBackground;
      this.getEmbeddedSvg(this.getFileData(!0, null, null, null, null, null, null, null, null, !1), g, null, !0, mxUtils.bind(this, function(u) {
        n.postMessage(JSON.stringify({
          event: 'export',
          point: this.embedExitPoint,
          exit: null != d ? !d : !0,
          data: Editor.createSvgDataUri(u)
        }), '*');
      }), null, null, !0, v, 1, this.embedExportBorder);
    } else
      d || n.postMessage(JSON.stringify({
        event: 'exit',
        point: this.embedExitPoint
      }), '*');
    d || (this.diagramContainer.removeAttribute('data-bounds'), Editor.inlineFullscreen = !1, g.model.clear(), this.editor.undoManager.clear(), this.setBackgroundImage(null), this.editor.modified = !1, '1' != urlParams.embed && this.fireEvent(new mxEventObject('editInlineStop')));
  };
  EditorUi.prototype.installMessageHandler = function(d) {
    var g = null,
      n = !1,
      v = !1,
      u = null,
      x = mxUtils.bind(this, function(L, l) {
        this.editor.modified && '0' != urlParams.modified ? null != urlParams.modified && this.editor.setStatus(mxUtils.htmlEntities(mxResources.get(urlParams.modified))) : this.editor.setStatus('');
      });
    this.editor.graph.model.addListener(mxEvent.CHANGE, x);
    mxEvent.addListener(window, 'message', mxUtils.bind(this, function(L) {
      if (L.source == (window.opener || window.parent)) {
        var l = L.data,
          q = null,
          A = mxUtils.bind(this, function(ba) {
            if (null != ba && 'function' === typeof ba.charAt && '<' != ba.charAt(0))
              try {
                Editor.isPngDataUrl(ba) ? ba = Editor.extractGraphModelFromPng(ba) : 'data:image/svg+xml;base64,' == ba.substring(0, 26) ? ba = atob(ba.substring(26)) : 'data:image/svg+xml;utf8,' == ba.substring(0, 24) && (ba = ba.substring(24)), null != ba && ('%' == ba.charAt(0) ? ba = decodeURIComponent(ba) : '<' != ba.charAt(0) && (ba = Graph.decompress(ba)));
              } catch (na) {}
            return ba;
          });
        if ('json' == urlParams.proto) {
          var H = !1;
          try {
            l = JSON.parse(l), EditorUi.debug('EditorUi.installMessageHandler', [this], 'evt', [L], 'data', [l]);
          } catch (ba) {
            l = null;
          }
          try {
            if (null == l)
              return;
            if ('dialog' == l.action) {
              this.showError(null != l.titleKey ? mxResources.get(l.titleKey) : l.title, null != l.messageKey ? mxResources.get(l.messageKey) : l.message, null != l.buttonKey ? mxResources.get(l.buttonKey) : l.button);
              null != l.modified && (this.editor.modified = l.modified);
              return;
            }
            if ('layout' == l.action) {
              this.executeLayouts(this.editor.graph.createLayouts(l.layouts));
              return;
            }
            if ('prompt' == l.action) {
              this.spinner.stop();
              var K = new FilenameDialog(this, l.defaultValue || '', null != l.okKey ? mxResources.get(l.okKey) : l.ok, function(ba) {
                null != ba ? C.postMessage(JSON.stringify({
                  event: 'prompt',
                  value: ba,
                  message: l
                }), '*') : C.postMessage(JSON.stringify({
                  event: 'prompt-cancel',
                  message: l
                }), '*');
              }, null != l.titleKey ? mxResources.get(l.titleKey) : l.title);
              this.showDialog(K.container, 300, 80, !0, !1);
              K.init();
              return;
            }
            if ('draft' == l.action) {
              var M = A(l.xml);
              this.spinner.stop();
              K = new DraftDialog(this, mxResources.get('draftFound', [l.name || this.defaultFilename]), M, mxUtils.bind(this, function() {
                this.hideDialog();
                C.postMessage(JSON.stringify({
                  event: 'draft',
                  result: 'edit',
                  message: l
                }), '*');
              }), mxUtils.bind(this, function() {
                this.hideDialog();
                C.postMessage(JSON.stringify({
                  event: 'draft',
                  result: 'discard',
                  message: l
                }), '*');
              }), l.editKey ? mxResources.get(l.editKey) : null, l.discardKey ? mxResources.get(l.discardKey) : null, l.ignore ? mxUtils.bind(this, function() {
                this.hideDialog();
                C.postMessage(JSON.stringify({
                  event: 'draft',
                  result: 'ignore',
                  message: l
                }), '*');
              }) : null);
              this.showDialog(K.container, 640, 480, !0, !1, mxUtils.bind(this, function(ba) {
                ba && this.actions.get('exit').funct();
              }));
              try {
                K.init();
              } catch (ba) {
                C.postMessage(JSON.stringify({
                  event: 'draft',
                  error: ba.toString(),
                  message: l
                }), '*');
              }
              return;
            }
            if ('template' == l.action) {
              this.spinner.stop();
              var I = 1 == l.enableRecent,
                Q = 1 == l.enableSearch,
                P = 1 == l.enableCustomTemp;
              if ('1' == urlParams.newTempDlg && !l.templatesOnly && null != l.callback) {
                var O = this.getCurrentUser(),
                  W = new TemplatesDialog(this, function(ba, na, ia) {
                    ba = ba || this.emptyDiagramXml;
                    C.postMessage(JSON.stringify({
                      event: 'template',
                      xml: ba,
                      blank: ba == this.emptyDiagramXml,
                      name: na,
                      tempUrl: ia.url,
                      libs: ia.libs,
                      builtIn: null != ia.info && null != ia.info.custContentId,
                      message: l
                    }), '*');
                  }, mxUtils.bind(this, function() {
                    this.actions.get('exit').funct();
                  }), null, null, null != O ? O.id : null, I ? mxUtils.bind(this, function(ba, na, ia) {
                    this.remoteInvoke('getRecentDiagrams', [ia], null, ba, na);
                  }) : null, Q ? mxUtils.bind(this, function(ba, na, ia, qa) {
                    this.remoteInvoke('searchDiagrams', [
                      ba,
                      qa
                    ], null, na, ia);
                  }) : null, mxUtils.bind(this, function(ba, na, ia) {
                    this.remoteInvoke('getFileContent', [ba.url], null, na, ia);
                  }), null, P ? mxUtils.bind(this, function(ba) {
                    this.remoteInvoke('getCustomTemplates', null, null, ba, function() {
                      ba({}, 0);
                    });
                  }) : null, !1, !1, !0, !0);
                this.showDialog(W.container, window.innerWidth, window.innerHeight, !0, !1, null, !1, !0);
                return;
              }
              K = new NewDialog(this, !1, l.templatesOnly ? !1 : null != l.callback, mxUtils.bind(this, function(ba, na, ia, qa) {
                ba = ba || this.emptyDiagramXml;
                null != l.callback ? C.postMessage(JSON.stringify({
                  event: 'template',
                  xml: ba,
                  blank: ba == this.emptyDiagramXml,
                  name: na,
                  tempUrl: ia,
                  libs: qa,
                  builtIn: !0,
                  message: l
                }), '*') : (d(ba, L, ba != this.emptyDiagramXml, l.toSketch), this.editor.modified || this.editor.setStatus(''));
              }), null, null, null, null, null, null, null, I ? mxUtils.bind(this, function(ba) {
                this.remoteInvoke('getRecentDiagrams', [null], null, ba, function() {
                  ba(null, 'Network Error!');
                });
              }) : null, Q ? mxUtils.bind(this, function(ba, na) {
                this.remoteInvoke('searchDiagrams', [
                  ba,
                  null
                ], null, na, function() {
                  na(null, 'Network Error!');
                });
              }) : null, mxUtils.bind(this, function(ba, na, ia) {
                C.postMessage(JSON.stringify({
                  event: 'template',
                  docUrl: ba,
                  info: na,
                  name: ia
                }), '*');
              }), null, null, P ? mxUtils.bind(this, function(ba) {
                this.remoteInvoke('getCustomTemplates', null, null, ba, function() {
                  ba({}, 0);
                });
              }) : null, 1 == l.withoutType);
              this.showDialog(K.container, 620, 460, !0, !1, mxUtils.bind(this, function(ba) {
                this.sidebar.hideTooltip();
                ba && this.actions.get('exit').funct();
              }));
              K.init();
              return;
            }
            if ('textContent' == l.action) {
              var p = this.getDiagramTextContent();
              C.postMessage(JSON.stringify({
                event: 'textContent',
                data: p,
                message: l
              }), '*');
              return;
            }
            if ('status' == l.action) {
              null != l.messageKey ? this.editor.setStatus(mxUtils.htmlEntities(mxResources.get(l.messageKey))) : null != l.message && this.editor.setStatus(mxUtils.htmlEntities(l.message));
              null != l.modified && (this.editor.modified = l.modified);
              return;
            }
            if ('spinner' == l.action) {
              var B = null != l.messageKey ? mxResources.get(l.messageKey) : l.message;
              null == l.show || l.show ? this.spinner.spin(document.body, B) : this.spinner.stop();
              return;
            }
            if ('exit' == l.action) {
              this.actions.get('exit').funct();
              return;
            }
            if ('viewport' == l.action) {
              null != l.viewport && (this.embedViewport = l.viewport);
              return;
            }
            if ('snapshot' == l.action) {
              this.sendEmbeddedSvgExport(!0);
              return;
            }
            if ('export' == l.action) {
              if ('png' == l.format || 'xmlpng' == l.format) {
                if (null == l.spin && null == l.spinKey || this.spinner.spin(document.body, null != l.spinKey ? mxResources.get(l.spinKey) : l.spin)) {
                  var N = null != l.xml ? l.xml : this.getFileData(!0);
                  this.editor.graph.setEnabled(!1);
                  var S = this.editor.graph,
                    R = mxUtils.bind(this, function(ba) {
                      this.editor.graph.setEnabled(!0);
                      this.spinner.stop();
                      var na = this.createLoadMessage('export');
                      na.format = l.format;
                      na.message = l;
                      na.data = ba;
                      na.xml = N;
                      C.postMessage(JSON.stringify(na), '*');
                    }),
                    V = mxUtils.bind(this, function(ba) {
                      null == ba && (ba = Editor.blankImage);
                      'xmlpng' == l.format && (ba = Editor.writeGraphModelToPng(ba, 'tEXt', 'mxfile', encodeURIComponent(N)));
                      S != this.editor.graph && S.container.parentNode.removeChild(S.container);
                      R(ba);
                    }),
                    T = l.pageId || (null != this.pages ? l.currentPage ? this.currentPage.getId() : this.pages[0].getId() : null);
                  if (this.isExportToCanvas()) {
                    var U = mxUtils.bind(this, function() {
                      if (null != this.pages && this.currentPage.getId() != T) {
                        var ba = S.getGlobalVariable;
                        S = this.createTemporaryGraph(S.getStylesheet());
                        for (var na, ia = 0; ia < this.pages.length; ia++)
                          if (this.pages[ia].getId() == T) {
                            na = this.updatePageRoot(this.pages[ia]);
                            break;
                          }
                        null == na && (na = this.currentPage);
                        S.getGlobalVariable = function(ja) {
                          return 'page' == ja ? na.getName() : 'pagenumber' == ja ? 1 : ba.apply(this, arguments);
                        };
                        document.body.appendChild(S.container);
                        S.model.setRoot(na.root);
                      }
                      if (null != l.layerIds) {
                        var qa = S.model,
                          Aa = qa.getChildCells(qa.getRoot()),
                          va = {};
                        for (ia = 0; ia < l.layerIds.length; ia++)
                          va[l.layerIds[ia]] = !0;
                        for (ia = 0; ia < Aa.length; ia++)
                          qa.setVisible(Aa[ia], va[Aa[ia].id] || !1);
                      }
                      this.editor.exportToCanvas(mxUtils.bind(this, function(ja) {
                        V(ja.toDataURL('image/png'));
                      }), l.width, null, l.background, mxUtils.bind(this, function() {
                        V(null);
                      }), null, null, l.scale, l.transparent, l.shadow, null, S, l.border, null, l.grid, l.keepTheme);
                    });
                    null != l.xml && 0 < l.xml.length && (n = !0, this.setFileData(N), n = !1);
                    U();
                  } else
                    new mxXmlRequest(EXPORT_URL, 'format=png&embedXml=' + ('xmlpng' == l.format ? '1' : '0') + (null != T ? '&pageId=' + T : '') + (null != l.layerIds && 0 < l.layerIds.length ? '&extras=' + encodeURIComponent(JSON.stringify({
                      layerIds: l.layerIds
                    })) : '') + (null != l.scale ? '&scale=' + l.scale : '') + '&base64=1&xml=' + encodeURIComponent(N)).send(mxUtils.bind(this, function(ba) {
                      200 <= ba.getStatus() && 299 >= ba.getStatus() ? R('data:image/png;base64,' + ba.getText()) : V(null);
                    }), mxUtils.bind(this, function() {
                      V(null);
                    }));
                }
              } else if (U = mxUtils.bind(this, function() {
                  var ba = this.createLoadMessage('export');
                  ba.message = l;
                  if ('html2' == l.format || 'html' == l.format && ('0' != urlParams.pages || null != this.pages && 1 < this.pages.length)) {
                    var na = this.getXmlFileData();
                    ba.xml = mxUtils.getXml(na);
                    ba.data = this.getFileData(null, null, !0, null, null, null, na);
                    ba.format = l.format;
                  } else if ('html' == l.format)
                    na = this.editor.getGraphXml(), ba.data = this.getHtml(na, this.editor.graph), ba.xml = mxUtils.getXml(na), ba.format = l.format;
                  else {
                    mxSvgCanvas2D.prototype.foAltText = null;
                    na = null != l.background ? l.background : this.editor.graph.background;
                    na == mxConstants.NONE && (na = null);
                    ba.xml = this.getFileData(!0, null, null, null, null, null, null, null, null, !1);
                    ba.format = 'svg';
                    var ia = mxUtils.bind(this, function(qa) {
                      this.editor.graph.setEnabled(!0);
                      this.spinner.stop();
                      ba.data = Editor.createSvgDataUri(qa);
                      C.postMessage(JSON.stringify(ba), '*');
                    });
                    if ('xmlsvg' == l.format)
                      (null == l.spin && null == l.spinKey || this.spinner.spin(document.body, null != l.spinKey ? mxResources.get(l.spinKey) : l.spin)) && this.getEmbeddedSvg(ba.xml, this.editor.graph, null, !0, ia, null, null, l.embedImages, na, l.scale, l.border, l.shadow, l.keepTheme);
                    else if (null == l.spin && null == l.spinKey || this.spinner.spin(document.body, null != l.spinKey ? mxResources.get(l.spinKey) : l.spin))
                      this.editor.graph.setEnabled(!1), na = this.editor.graph.getSvg(na, l.scale, l.border, null, null, null, null, null, null, this.editor.graph.shadowVisible || l.shadow, null, l.keepTheme), (this.editor.graph.shadowVisible || l.shadow) && this.editor.graph.addSvgShadow(na), this.embedFonts(na, mxUtils.bind(this, function(qa) {
                        l.embedImages || null == l.embedImages ? this.editor.convertImages(qa, mxUtils.bind(this, function(Aa) {
                          ia(mxUtils.getXml(Aa));
                        })) : ia(mxUtils.getXml(qa));
                      }));
                    return;
                  }
                  C.postMessage(JSON.stringify(ba), '*');
                }), null != l.xml && 0 < l.xml.length) {
                if (this.editor.graph.mathEnabled) {
                  var X = Editor.onMathJaxDone;
                  Editor.onMathJaxDone = function() {
                    X.apply(this, arguments);
                    U();
                  };
                }
                n = !0;
                this.setFileData(l.xml);
                n = !1;
                this.editor.graph.mathEnabled || U();
              } else
                U();
              return;
            }
            if ('load' == l.action) {
              H = l.toSketch;
              v = 1 == l.autosave;
              this.hideDialog();
              null != l.modified && null == urlParams.modified && (urlParams.modified = l.modified);
              null != l.saveAndExit && null == urlParams.saveAndExit && (urlParams.saveAndExit = l.saveAndExit);
              null != l.noSaveBtn && null == urlParams.noSaveBtn && (urlParams.noSaveBtn = l.noSaveBtn);
              if (null != l.rough) {
                var Z = Editor.sketchMode;
                this.doSetSketchMode(l.rough);
                Z != Editor.sketchMode && this.fireEvent(new mxEventObject('sketchModeChanged'));
              }
              null != l.dark && this.setDarkMode(l.dark);
              null != l.border && (this.embedExportBorder = l.border);
              null != l.background && (this.embedExportBackground = l.background);
              null != l.viewport && (this.embedViewport = l.viewport);
              this.embedExitPoint = null;
              if (null != l.rect) {
                var Y = this.embedExportBorder;
                this.diagramContainer.style.border = '2px solid #295fcc';
                this.diagramContainer.style.top = l.rect.top + 'px';
                this.diagramContainer.style.left = l.rect.left + 'px';
                this.diagramContainer.style.height = l.rect.height + 'px';
                this.diagramContainer.style.width = l.rect.width + 'px';
                this.diagramContainer.style.bottom = '';
                this.diagramContainer.style.right = '';
                var ea = l.maxFitScale;
                q = mxUtils.bind(this, function() {
                  var ba = this.editor.graph,
                    na = ba.maxFitScale;
                  ba.maxFitScale = ea;
                  ba.fit(2 * Y);
                  ba.maxFitScale = na;
                  ba.container.scrollTop -= 2 * Y;
                  ba.container.scrollLeft -= 2 * Y;
                  this.fireEvent(new mxEventObject('editInlineStart', 'data', [l]));
                });
              }
              null != l.noExitBtn && null == urlParams.noExitBtn && (urlParams.noExitBtn = l.noExitBtn);
              null != l.title && null != this.buttonContainer && (M = this.createStatusDiv(''), mxUtils.write(M, l.title), null != this.embedFilenameSpan && this.embedFilenameSpan.parentNode.removeChild(this.embedFilenameSpan), this.buttonContainer.appendChild(M), this.embedFilenameSpan = M);
              try {
                l.libs && this.sidebar.showEntries(l.libs);
              } catch (ba) {}
              l = null != l.xmlpng ? this.extractGraphModelFromPng(l.xmlpng) : null != l.descriptor ? l.descriptor : l.xml;
            } else {
              if ('merge' == l.action) {
                var aa = this.getCurrentFile();
                null != aa && (M = A(l.xml), null != M && '' != M && aa.mergeFile(new LocalFile(this, M), function() {
                  C.postMessage(JSON.stringify({
                    event: 'merge',
                    message: l
                  }), '*');
                }, function(ba) {
                  C.postMessage(JSON.stringify({
                    event: 'merge',
                    message: l,
                    error: ba
                  }), '*');
                }));
              } else
                'remoteInvokeReady' == l.action ? this.handleRemoteInvokeReady(C) : 'remoteInvoke' == l.action ? this.handleRemoteInvoke(l, L.origin) : 'remoteInvokeResponse' == l.action ? this.handleRemoteInvokeResponse(l) : C.postMessage(JSON.stringify({
                  error: 'unknownMessage',
                  data: JSON.stringify(l)
                }), '*');
              return;
            }
          } catch (ba) {
            this.handleError(ba);
          }
        }
        var fa = mxUtils.bind(this, function() {
            return '0' != urlParams.pages || null != this.pages && 1 < this.pages.length ? this.getFileData(!0) : mxUtils.getXml(this.editor.getGraphXml());
          }),
          da = mxUtils.bind(this, function(ba, na) {
            n = !0;
            try {
              d(ba, na, null, H);
            } catch (ia) {
              this.handleError(ia);
            }
            n = !1;
            null != urlParams.modified && this.editor.setStatus('');
            u = fa();
            v && null == g && (g = mxUtils.bind(this, function(ia, qa) {
              ia = fa();
              ia == u || n || (qa = this.createLoadMessage('autosave'), qa.xml = ia, (window.opener || window.parent).postMessage(JSON.stringify(qa), '*'));
              u = ia;
            }), this.editor.graph.model.addListener(mxEvent.CHANGE, g), this.editor.graph.addListener('gridSizeChanged', g), this.editor.graph.addListener('shadowVisibleChanged', g), this.addListener('pageFormatChanged', g), this.addListener('pageScaleChanged', g), this.addListener('backgroundColorChanged', g), this.addListener('backgroundImageChanged', g), this.addListener('foldingEnabledChanged', g), this.addListener('mathEnabledChanged', g), this.addListener('gridEnabledChanged', g), this.addListener('guidesEnabledChanged', g), this.addListener('pageViewChanged', g));
            if ('1' == urlParams.returnbounds || 'json' == urlParams.proto)
              na = this.createLoadMessage('load'), na.xml = ba, C.postMessage(JSON.stringify(na), '*');
            null != q && q();
          });
        null != l && 'function' === typeof l.substring && 'data:application/vnd.visio;base64,' == l.substring(0, 34) ? (A = '0M8R4KGxGuE' == l.substring(34, 45) ? 'raw.vsd' : 'raw.vsdx', this.importVisio(this.base64ToBlob(l.substring(l.indexOf(',') + 1)), function(ba) {
          da(ba, L);
        }, mxUtils.bind(this, function(ba) {
          this.handleError(ba);
        }), A)) : null != l && 'function' === typeof l.substring && new XMLHttpRequest().upload && this.isRemoteFileFormat(l, '') ? this.isOffline() ? this.showError(mxResources.get('error'), mxResources.get('notInOffline')) : this.parseFileData(l, mxUtils.bind(this, function(ba) {
          4 == ba.readyState && (200 <= ba.status && 299 >= ba.status && '<mxGraphModel' == ba.responseText.substring(0, 13) ? da(ba.responseText, L) : this.handleError({
            message: 413 == ba.status ? mxResources.get('diagramTooLarge') : mxResources.get('unknownError')
          }));
        }), '') : null != l && 'function' === typeof l.substring && this.isLucidChartData(l) ? this.convertLucidChart(l, mxUtils.bind(this, function(ba) {
          da(ba);
        }), mxUtils.bind(this, function(ba) {
          this.handleError(ba);
        })) : null == l || 'object' !== typeof l || null == l.format || null == l.data && null == l.url ? (l = A(l), da(l, L)) : this.loadDescriptor(l, mxUtils.bind(this, function(ba) {
          da(fa(), L);
        }), mxUtils.bind(this, function(ba) {
          this.handleError(ba, mxResources.get('errorLoadingFile'));
        }));
      }
    }));
    var C = window.opener || window.parent;
    x = 'json' == urlParams.proto ? JSON.stringify({
      event: 'init'
    }) : urlParams.ready || 'ready';
    C.postMessage(x, '*');
    if ('json' == urlParams.proto) {
      var F = this.editor.graph.openLink;
      this.editor.graph.openLink = function(L, l, q) {
        F.apply(this, arguments);
        C.postMessage(JSON.stringify({
          event: 'openLink',
          href: L,
          target: l,
          allowOpener: q
        }), '*');
      };
    }
  };
  EditorUi.prototype.createEmbedButton = function(d, g, n, v) {
    var u = 'simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme || 'min' == Editor.currentTheme,
      x = document.createElement('button');
    x.setAttribute('title', d + (null != n ? ' (' + n + ')' : ''));
    x.style.marginLeft = '6px';
    mxUtils.write(x, d);
    u ? (x.className = v ? 'gePrimaryBtn' : '', x.style.marginLeft = '8px', x.style.padding = '6px') : x.className = 'geBigButton' + (v ? '' : ' geBigStandardButton');
    mxEvent.addListener(x, 'click', g);
    return x;
  };
  EditorUi.prototype.addEmbedButtons = function() {
    var d = document.createElement('div');
    d.style.display = 'inline-flex';
    d.style.alignItems = 'center';
    d.style.marginLeft = 'auto';
    'simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme && 'min' != Editor.currentTheme && (d.style.marginRight = '66px', d.style['float'] = 'right', 'atlas' == Editor.currentTheme && (d.style.marginTop = '2px'));
    document.createElement('button').className = 'geBigButton';
    '1' == urlParams.noSaveBtn ? '0' != urlParams.saveAndExit && d.appendChild(this.createEmbedButton('1' == urlParams.publishClose ? mxResources.get('publish') : mxResources.get('saveAndExit'), this.actions.get('saveAndExit').funct, null, !0)) : (d.appendChild(this.createEmbedButton(mxResources.get('save'), mxUtils.bind(this, function() {
      this.actions.get('save').funct(!1);
    }), Editor.ctrlKey + '+S', !0)), '1' == urlParams.saveAndExit && d.appendChild(this.createEmbedButton(mxResources.get('saveAndExit'), this.actions.get('saveAndExit').funct)));
    '1' != urlParams.noExitBtn && d.appendChild(this.createEmbedButton('1' == urlParams.publishClose ? mxResources.get('close') : mxResources.get('exit'), this.actions.get('exit').funct));
    'simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme && 'min' != Editor.currentTheme || null == this.buttonContainer ? null != this.menubar && (this.toolbar.container.appendChild(d), this.toolbar.staticElements.push(d)) : (this.buttonContainer.appendChild(d), this.editor.fireEvent(new mxEventObject('statusChanged')));
  };
  EditorUi.prototype.showImportCsvDialog = function() {
    null == this.importCsvDialog && (this.importCsvDialog = new TextareaDialog(this, mxResources.get('csv') + ':', Editor.defaultCsvValue, mxUtils.bind(this, function(d) {
      this.importCsv(d);
    }), null, null, 620, 430, null, !0, !0, mxResources.get('import'), this.isOffline() ? null : 'https://drawio-app.com/import-from-csv-to-drawio/'));
    this.showDialog(this.importCsvDialog.container, 640, 520, !0, !0, null, null, null, null, !0);
    this.importCsvDialog.init();
  };
  EditorUi.prototype.loadOrgChartLayouts = function(d) {
    var g = mxUtils.bind(this, function() {
      this.loadingOrgChart = !1;
      this.spinner.stop();
      d();
    });
    'undefined' !== typeof mxOrgChartLayout || this.loadingOrgChart || this.isOffline(!0) ? g() : this.spinner.spin(document.body, mxResources.get('loading')) && (this.loadingOrgChart = !0, '1' == urlParams.dev ? mxscript('js/orgchart/bridge.min.js', function() {
      mxscript('js/orgchart/bridge.collections.min.js', function() {
        mxscript('js/orgchart/OrgChart.Layout.min.js', function() {
          mxscript('js/orgchart/mxOrgChartLayout.js', g);
        });
      });
    }) : mxscript(DRAWIO_BASE_URL + '/js/orgchart.min.js', g));
  };
  EditorUi.prototype.importCsv = function(d, g) {
    this.loadOrgChartLayouts(mxUtils.bind(this, function() {
      this.doImportCsv(d, g);
    }));
  };
  EditorUi.prototype.doImportCsv = function(d, g) {
    try {
      var n = d.split('\n'),
        v = [],
        u = [],
        x = [],
        C = {};
      if (0 < n.length) {
        var F = {},
          L = this.editor.graph,
          l = null,
          q = null,
          A = null,
          H = null,
          K = null,
          M = null,
          I = null,
          Q = 'whiteSpace=wrap;html=1;',
          P = null,
          O = null,
          W = '',
          p = 'auto',
          B = 'auto',
          N = !1,
          S = null,
          R = null,
          V = 40,
          T = 40,
          U = 100,
          X = 0,
          Z = mxUtils.bind(this, function() {
            null != g ? g(za) : (L.setSelectionCells(za), L.scrollCellToVisible(L.getSelectionCell()));
            null != this.chromelessResize && window.setTimeout(mxUtils.bind(this, function() {
              this.chromelessResize(!0);
            }), 0);
          }),
          Y = L.getFreeInsertPoint(),
          ea = Y.x,
          aa = Y.y;
        Y = aa;
        var fa = null,
          da = 'auto';
        O = null;
        for (var ba = [], na = null, ia = null, qa = 0; qa < n.length && '#' == n[qa].charAt(0);) {
          d = n[qa].replace(/\r$/, '');
          for (qa++; qa < n.length && '\\' == d.charAt(d.length - 1) && '#' == n[qa].charAt(0);)
            d = d.substring(0, d.length - 1) + mxUtils.trim(n[qa].substring(1)), qa++;
          if ('#' != d.charAt(1)) {
            var Aa = d.indexOf(':');
            if (0 < Aa) {
              var va = mxUtils.trim(d.substring(1, Aa)),
                ja = mxUtils.trim(d.substring(Aa + 1));
              'label' == va ? fa = Graph.sanitizeHtml(ja) : 'labelname' == va && 0 < ja.length && '-' != ja ? K = ja : 'labels' == va && 0 < ja.length && '-' != ja ? I = JSON.parse(ja) : 'style' == va ? q = ja : 'parentstyle' == va ? Q = ja : 'unknownStyle' == va && '-' != ja ? M = ja : 'stylename' == va && 0 < ja.length && '-' != ja ? H = ja : 'styles' == va && 0 < ja.length && '-' != ja ? A = JSON.parse(ja) : 'vars' == va && 0 < ja.length && '-' != ja ? l = JSON.parse(ja) : 'identity' == va && 0 < ja.length && '-' != ja ? P = ja : 'parent' == va && 0 < ja.length && '-' != ja ? O = ja : 'namespace' == va && 0 < ja.length && '-' != ja ? W = ja : 'width' == va ? p = ja : 'height' == va ? B = ja : 'collapsed' == va && '-' != ja ? N = 'true' == ja : 'left' == va && 0 < ja.length ? S = ja : 'top' == va && 0 < ja.length ? R = ja : 'ignore' == va ? ia = ja.split(',') : 'connect' == va ? ba.push(JSON.parse(ja)) : 'link' == va ? na = ja : 'padding' == va ? X = parseFloat(ja) : 'edgespacing' == va ? V = parseFloat(ja) : 'nodespacing' == va ? T = parseFloat(ja) : 'levelspacing' == va ? U = parseFloat(ja) : 'layout' == va && (da = ja);
            }
          }
        }
        if (null == n[qa])
          throw Error(mxResources.get('invalidOrMissingFile'));
        var Ga = this.editor.csvToArray(n[qa].replace(/\r$/, ''));
        Aa = d = null;
        va = [];
        for (ja = 0; ja < Ga.length; ja++)
          P == Ga[ja] && (d = ja), O == Ga[ja] && (Aa = ja), va.push(mxUtils.trim(Ga[ja]).replace(/[^a-z0-9]+/ig, '_').replace(/^\d+/, '').replace(/_+$/, ''));
        null == fa && (fa = '%' + va[0] + '%');
        if (null != ba)
          for (var Da = 0; Da < ba.length; Da++)
            null == F[ba[Da].to] && (F[ba[Da].to] = {});
        P = [];
        for (ja = qa + 1; ja < n.length; ja++) {
          var Ca = this.editor.csvToArray(n[ja].replace(/\r$/, ''));
          if (null == Ca) {
            var Ka = 40 < n[ja].length ? n[ja].substring(0, 40) + '...' : n[ja];
            throw Error(Ka + ' (' + ja + '):\n' + mxResources.get('containsValidationErrors'));
          }
          0 < Ca.length && P.push(Ca);
        }
        L.model.beginUpdate();
        try {
          for (ja = 0; ja < P.length; ja++) {
            Ca = P[ja];
            var ha = null,
              ra = null != d ? W + Ca[d] : null;
            n = !1;
            null != ra && (ha = L.model.getCell(ra), n = null == ha || 0 <= mxUtils.indexOf(v, ha));
            var ua = new mxCell(fa, new mxGeometry(ea, Y, 0, 0), q || 'whiteSpace=wrap;html=1;');
            ua.collapsed = N;
            ua.vertex = !0;
            ua.id = ra;
            null == ha || n || L.model.setCollapsed(ha, N);
            for (var La = 0; La < Ca.length; La++)
              L.setAttributeForCell(ua, va[La], Ca[La]), null == ha || n || L.setAttributeForCell(ha, va[La], Ca[La]);
            if (null != K && null != I) {
              var Ia = I[ua.getAttribute(K)];
              null != Ia && (L.labelChanged(ua, Ia), null == ha || n || L.cellLabelChanged(ha, Ia));
            }
            if (null != H && null != A) {
              var ka = A[ua.getAttribute(H)];
              null != ka && (ua.style = ka);
            }
            L.setAttributeForCell(ua, 'placeholders', '1');
            ua.style = L.replacePlaceholders(ua, ua.style, l);
            null == ha || n ? L.fireEvent(new mxEventObject('cellsInserted', 'cells', [ua])) : (L.model.setStyle(ha, ua.style), 0 > mxUtils.indexOf(x, ha) && x.push(ha), L.fireEvent(new mxEventObject('cellsInserted', 'cells', [ha])));
            n = null != ha;
            ha = ua;
            if (!n)
              for (Da = 0; Da < ba.length; Da++)
                F[ba[Da].to][ha.getAttribute(ba[Da].to)] = ha;
            null != na && 'link' != na && (L.setLinkForCell(ha, ha.getAttribute(na)), L.setAttributeForCell(ha, na, null));
            var xa = this.editor.graph.getPreferredSizeForCell(ha);
            O = null != Aa ? L.model.getCell(W + Ca[Aa]) : null;
            if (ha.vertex) {
              Ka = null != O ? 0 : ea;
              qa = null != O ? 0 : aa;
              null != S && null != ha.getAttribute(S) && (ha.geometry.x = Ka + parseFloat(ha.getAttribute(S)));
              null != R && null != ha.getAttribute(R) && (ha.geometry.y = qa + parseFloat(ha.getAttribute(R)));
              var ta = '@' == p.charAt(0) ? ha.getAttribute(p.substring(1)) : null;
              ha.geometry.width = null != ta && 'auto' != ta ? parseFloat(ha.getAttribute(p.substring(1))) : 'auto' == p || 'auto' == ta ? xa.width + X : parseFloat(p);
              var oa = '@' == B.charAt(0) ? ha.getAttribute(B.substring(1)) : null;
              ha.geometry.height = null != oa && 'auto' != oa ? parseFloat(oa) : 'auto' == B || 'auto' == oa ? xa.height + X : parseFloat(B);
              Y += ha.geometry.height + T;
            }
            n ? (null == C[ra] && (C[ra] = []), C[ra].push(ha)) : (v.push(ha), null != O ? (O.style = L.replacePlaceholders(O, Q, l), L.addCell(ha, O), u.push(O)) : x.push(L.addCell(ha)));
          }
          for (ja = 0; ja < u.length; ja++)
            ta = '@' == p.charAt(0) ? u[ja].getAttribute(p.substring(1)) : null, oa = '@' == B.charAt(0) ? u[ja].getAttribute(B.substring(1)) : null, 'auto' != p && 'auto' != ta || 'auto' != B && 'auto' != oa || L.updateGroupBounds([u[ja]], X, !0);
          var sa = x.slice(),
            za = x.slice();
          for (Da = 0; Da < ba.length; Da++) {
            var ca = ba[Da];
            for (ja = 0; ja < v.length; ja++) {
              ha = v[ja];
              var ma = mxUtils.bind(this, function(Pa, Ra, Ma) {
                var Ua = Ra.getAttribute(Ma.from);
                if (null != Ua && '' != Ua) {
                  Ua = Ua.split(',');
                  for (var Xa = 0; Xa < Ua.length; Xa++) {
                    var Ha = F[Ma.to][Ua[Xa]];
                    if (null == Ha && null != M) {
                      Ha = new mxCell(Ua[Xa], new mxGeometry(ea, aa, 0, 0), M);
                      Ha.style = L.replacePlaceholders(Ra, Ha.style, l);
                      var Na = this.editor.graph.getPreferredSizeForCell(Ha);
                      Ha.geometry.width = Na.width + X;
                      Ha.geometry.height = Na.height + X;
                      F[Ma.to][Ua[Xa]] = Ha;
                      Ha.vertex = !0;
                      Ha.id = Ua[Xa];
                      x.push(L.addCell(Ha));
                    }
                    if (null != Ha) {
                      Na = Ma.label;
                      null != Ma.fromlabel && (Na = (Ra.getAttribute(Ma.fromlabel) || '') + (Na || ''));
                      null != Ma.sourcelabel && (Na = L.replacePlaceholders(Ra, Ma.sourcelabel, l) + (Na || ''));
                      null != Ma.tolabel && (Na = (Na || '') + (Ha.getAttribute(Ma.tolabel) || ''));
                      null != Ma.targetlabel && (Na = (Na || '') + L.replacePlaceholders(Ha, Ma.targetlabel, l));
                      var Ta = 'target' == Ma.placeholders == !Ma.invert ? Ha : Pa;
                      Ta = null != Ma.style ? L.replacePlaceholders(Ta, Ma.style, l) : L.createCurrentEdgeStyle();
                      Na = L.insertEdge(null, null, Na || '', Ma.invert ? Ha : Pa, Ma.invert ? Pa : Ha, Ta);
                      if (null != Ma.labels)
                        for (Ta = 0; Ta < Ma.labels.length; Ta++) {
                          var Wa = Ma.labels[Ta],
                            Va = new mxCell(Wa.label || Ta, new mxGeometry(null != Wa.x ? Wa.x : 0, null != Wa.y ? Wa.y : 0, 0, 0), 'resizable=0;html=1;');
                          Va.vertex = !0;
                          Va.connectable = !1;
                          Va.geometry.relative = !0;
                          null != Wa.placeholders && (Va.value = L.replacePlaceholders('target' == Wa.placeholders == !Ma.invert ? Ha : Pa, Va.value, l));
                          if (null != Wa.dx || null != Wa.dy)
                            Va.geometry.offset = new mxPoint(null != Wa.dx ? Wa.dx : 0, null != Wa.dy ? Wa.dy : 0);
                          Na.insert(Va);
                        }
                      za.push(Na);
                      mxUtils.remove(Ma.invert ? Pa : Ha, sa);
                    }
                  }
                }
              });
              ma(ha, ha, ca);
              if (null != C[ha.id])
                for (La = 0; La < C[ha.id].length; La++)
                  ma(ha, C[ha.id][La], ca);
            }
          }
          if (null != ia)
            for (ja = 0; ja < v.length; ja++)
              for (ha = v[ja], La = 0; La < ia.length; La++)
                L.setAttributeForCell(ha, mxUtils.trim(ia[La]), null);
          if (0 < x.length) {
            var pa = new mxParallelEdgeLayout(L);
            pa.spacing = V;
            pa.checkOverlap = !0;
            var wa = function() {
              0 < pa.spacing && pa.execute(L.getDefaultParent());
              for (var Pa = 0; Pa < x.length; Pa++) {
                var Ra = L.getCellGeometry(x[Pa]);
                Ra.x = Math.round(L.snap(Ra.x));
                Ra.y = Math.round(L.snap(Ra.y));
                'auto' == p && (Ra.width = Math.round(L.snap(Ra.width)));
                'auto' == B && (Ra.height = Math.round(L.snap(Ra.height)));
              }
            };
            if ('[' == da.charAt(0)) {
              var Fa = Z;
              L.view.validate();
              this.executeLayouts(L.createLayouts(JSON.parse(da)), function() {
                wa();
                Fa();
              });
              Z = null;
            } else if ('circle' == da) {
              var Ea = new mxCircleLayout(L);
              Ea.disableEdgeStyle = !1;
              Ea.resetEdges = !1;
              var ya = Ea.isVertexIgnored;
              Ea.isVertexIgnored = function(Pa) {
                return ya.apply(this, arguments) || 0 > mxUtils.indexOf(x, Pa);
              };
              this.executeLayout(function() {
                Ea.execute(L.getDefaultParent());
                wa();
              }, !0, Z);
              Z = null;
            } else if ('horizontaltree' == da || 'verticaltree' == da || 'auto' == da && za.length == 2 * x.length - 1 && 1 == sa.length) {
              L.view.validate();
              var Ba = new mxCompactTreeLayout(L, 'horizontaltree' == da);
              Ba.levelDistance = T;
              Ba.edgeRouting = !1;
              Ba.resetEdges = !1;
              this.executeLayout(function() {
                Ba.execute(L.getDefaultParent(), 0 < sa.length ? sa[0] : null);
              }, !0, Z);
              Z = null;
            } else if ('horizontalflow' == da || 'verticalflow' == da || 'auto' == da && 1 == sa.length) {
              L.view.validate();
              var la = new mxHierarchicalLayout(L, 'horizontalflow' == da ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH);
              la.intraCellSpacing = T;
              la.parallelEdgeSpacing = V;
              la.interRankCellSpacing = U;
              la.disableEdgeStyle = !1;
              this.executeLayout(function() {
                la.execute(L.getDefaultParent(), za);
                L.moveCells(za, ea, aa);
              }, !0, Z);
              Z = null;
            } else if ('orgchart' == da) {
              L.view.validate();
              var Qa = new mxOrgChartLayout(L, 2, U, T),
                Sa = Qa.isVertexIgnored;
              Qa.isVertexIgnored = function(Pa) {
                return Sa.apply(this, arguments) || 0 > mxUtils.indexOf(x, Pa);
              };
              this.executeLayout(function() {
                Qa.execute(L.getDefaultParent());
                wa();
              }, !0, Z);
              Z = null;
            } else if ('organic' == da || 'auto' == da && za.length > x.length) {
              L.view.validate();
              var Ja = new mxFastOrganicLayout(L);
              Ja.forceConstant = 3 * T;
              Ja.disableEdgeStyle = !1;
              Ja.resetEdges = !1;
              var Oa = Ja.isVertexIgnored;
              Ja.isVertexIgnored = function(Pa) {
                return Oa.apply(this, arguments) || 0 > mxUtils.indexOf(x, Pa);
              };
              this.executeLayout(function() {
                Ja.execute(L.getDefaultParent());
                wa();
              }, !0, Z);
              Z = null;
            }
          }
          this.hideDialog();
        } finally {
          L.model.endUpdate();
        }
        null != Z && Z();
      }
    } catch (Pa) {
      this.handleError(Pa);
    }
  };
  EditorUi.prototype.getSearch = function(d) {
    var g = '';
    if ('1' != urlParams.offline && '1' != urlParams.demo && null != d && 0 < window.location.search.length) {
      var n = '?',
        v;
      for (v in urlParams)
        0 > mxUtils.indexOf(d, v) && null != urlParams[v] && (g += n + v + '=' + urlParams[v], n = '&');
    } else
      g = window.location.search;
    return g;
  };
  EditorUi.prototype.getUrl = function(d) {
    d = null != d ? d : window.location.pathname;
    var g = 0 < d.indexOf('?') ? 1 : 0;
    if ('1' == urlParams.offline)
      d += window.location.search;
    else {
      var n = 'tmp libs clibs state fileId code share notitle data url embed client create title splash'.split(' '),
        v;
      for (v in urlParams)
        0 > mxUtils.indexOf(n, v) && (d = 0 == g ? d + '?' : d + '&', null != urlParams[v] && (d += v + '=' + urlParams[v], g++));
    }
    return d;
  };
  EditorUi.prototype.showLinkDialog = function(d, g, n, v, u) {
    d = new LinkDialog(this, d, g, n, !0, v, u);
    this.showDialog(d.container, 560, 130, !0, !0);
    d.init();
  };
  EditorUi.prototype.getServiceCount = function(d) {
    var g = 1;
    null == this.drive && 'function' !== typeof window.DriveClient || g++;
    null == this.dropbox && 'function' !== typeof window.DropboxClient || g++;
    null == this.oneDrive && 'function' !== typeof window.OneDriveClient || g++;
    null != this.gitHub && g++;
    null != this.gitLab && g++;
    d && isLocalStorage && '1' == urlParams.browser && g++;
    return g;
  };
  EditorUi.prototype.updateUi = function() {
    this.updateButtonContainer();
    this.updateActionStates();
    var d = this.getCurrentFile(),
      g = null != d || '1' == urlParams.embed && this.editor.graph.isEnabled();
    this.menus.get('viewPanels').setEnabled(g);
    this.menus.get('viewZoom').setEnabled(g);
    var n = ('1' != urlParams.embed || !this.editor.graph.isEnabled()) && (null == d || d.isRestricted());
    this.actions.get('makeCopy').setEnabled(!n);
    this.actions.get('print').setEnabled(!n);
    this.menus.get('exportAs').setEnabled(!n);
    this.menus.get('embed').setEnabled(!n);
    n = '1' != urlParams.embed || this.editor.graph.isEnabled();
    this.menus.get('extras').setEnabled(n);
    Editor.enableCustomLibraries && (this.menus.get('openLibraryFrom').setEnabled(n), this.menus.get('newLibrary').setEnabled(n));
    d = '1' == urlParams.embed && this.editor.graph.isEnabled() || null != d && d.isEditable();
    this.actions.get('image').setEnabled(g);
    this.actions.get('zoomIn').setEnabled(g);
    this.actions.get('zoomOut').setEnabled(g);
    this.actions.get('smartFit').setEnabled(g);
    this.actions.get('resetView').setEnabled(g);
    this.actions.get('darkMode').setEnabled('atlas' != Editor.currentTheme);
    this.actions.get('lightMode').setEnabled('atlas' != Editor.currentTheme);
    n = this.actions.get('autoMode');
    n.setEnabled(n.isEnabled() && 'atlas' != Editor.currentTheme);
    this.actions.get('undo').setEnabled(this.canUndo() && d);
    this.actions.get('redo').setEnabled(this.canRedo() && d);
    this.menus.get('edit').setEnabled(g);
    this.menus.get('view').setEnabled(g);
    this.menus.get('importFrom').setEnabled(d);
    this.menus.get('arrange').setEnabled(d);
    null != this.toolbar && (null != this.toolbar.edgeShapeMenu && this.toolbar.edgeShapeMenu.setEnabled(d), null != this.toolbar.edgeStyleMenu && this.toolbar.edgeStyleMenu.setEnabled(d));
    this.updateUserElement();
  };
  EditorUi.prototype.updateButtonContainer = function() {};
  EditorUi.prototype.updateUserElement = function() {};
  EditorUi.prototype.scheduleSanityCheck = function() {};
  EditorUi.prototype.stopSanityCheck = function() {};
  EditorUi.prototype.isDiagramActive = function() {
    var d = this.getCurrentFile();
    return null != d && d.isEditable() || '1' == urlParams.embed && this.editor.graph.isEnabled();
  };
  var D = EditorUi.prototype.createSidebar;
  EditorUi.prototype.createSidebar = function(d) {
    var g = D.apply(this, arguments);
    this.addListener('darkModeChanged', mxUtils.bind(this, function() {
      g.refresh();
    }));
    this.addListener('sketchModeChanged', mxUtils.bind(this, function() {
      g.refresh();
    }));
    return g;
  };
  var J = EditorUi.prototype.updateActionStates;
  EditorUi.prototype.updateActionStates = function() {
    J.apply(this, arguments);
    var d = this.editor.graph,
      g = this.getCurrentFile(),
      n = this.getSelectionState(),
      v = this.isDiagramActive();
    this.actions.get('pageSetup').setEnabled(v);
    this.actions.get('autosave').setEnabled(null != g && g.isEditable() && g.isAutosaveOptional());
    this.actions.get('guides').setEnabled(v);
    this.actions.get('editData').setEnabled(d.isEnabled());
    this.actions.get('editConnectionPoints').setEnabled(v && 0 == n.edges.length && 1 == n.vertices.length);
    this.actions.get('editImage').setEnabled(v && n.image && 0 < n.cells.length);
    this.actions.get('crop').setEnabled(v && n.image && 0 < n.cells.length);
    this.actions.get('shadowVisible').setEnabled(v);
    this.actions.get('connectionArrows').setEnabled(v);
    this.actions.get('connectionPoints').setEnabled(v);
    this.actions.get('copyStyle').setEnabled(v && !d.isSelectionEmpty());
    this.actions.get('pasteStyle').setEnabled(v && 0 < n.cells.length);
    this.actions.get('editGeometry').setEnabled(0 < n.vertices.length);
    this.actions.get('createShape').setEnabled(v);
    this.actions.get('createRevision').setEnabled(v);
    this.actions.get('moveToFolder').setEnabled(null != g);
    this.actions.get('makeCopy').setEnabled(null != g && !g.isRestricted());
    this.actions.get('editDiagram').setEnabled(v && (null == g || !g.isRestricted()));
    this.actions.get('publishLink').setEnabled(null != g && !g.isRestricted());
    this.actions.get('tags').setEnabled('hidden' != this.diagramContainer.style.visibility);
    this.actions.get('layers').setEnabled('hidden' != this.diagramContainer.style.visibility);
    this.actions.get('outline').setEnabled('hidden' != this.diagramContainer.style.visibility);
    this.actions.get('rename').setEnabled(null != g && g.isRenamable() || '1' == urlParams.embed);
    this.actions.get('close').setEnabled(null != g);
    this.menus.get('publish').setEnabled(null != g && !g.isRestricted());
    g = this.actions.get('findReplace');
    g.setEnabled('hidden' != this.diagramContainer.style.visibility);
    g.label = mxResources.get('find') + (d.isEnabled() ? '/' + mxResources.get('replace') : '');
    d = d.view.getState(d.getSelectionCell());
    this.actions.get('editShape').setEnabled(v && null != d && null != d.shape && null != d.shape.stencil);
  };
  var G = EditorUi.prototype.destroy;
  EditorUi.prototype.destroy = function() {
    null != this.exportDialog && (this.exportDialog.parentNode.removeChild(this.exportDialog), this.exportDialog = null);
    G.apply(this, arguments);
  };
  null != window.ExportDialog && (ExportDialog.showXmlOption = !1, ExportDialog.showGifOption = !1, ExportDialog.exportFile = function(d, g, n, v, u, x, C, F) {
    var L = d.editor.graph;
    if ('xml' == n)
      d.hideDialog(), d.saveData(g, 'xml', mxUtils.getXml(d.editor.getGraphXml()), 'text/xml');
    else if ('svg' == n)
      d.hideDialog(), d.saveData(g, 'svg', mxUtils.getXml(L.getSvg(v, u, x)), 'image/svg+xml');
    else {
      var l = d.getFileData(!0, null, null, null, null, !0),
        q = L.getGraphBounds(),
        A = Math.floor(q.width * u / L.view.scale),
        H = Math.floor(q.height * u / L.view.scale);
      if (l.length <= MAX_REQUEST_SIZE && A * H < MAX_AREA)
        if (d.hideDialog(), 'png' != n && 'jpg' != n && 'jpeg' != n || !d.isExportToCanvas()) {
          var K = {
            globalVars: L.getExportVariables()
          };
          F && (K.grid = {
            size: L.gridSize,
            steps: L.view.gridSteps,
            color: L.view.gridColor
          });
          d.saveRequest(g, n, function(M, I) {
            return new mxXmlRequest(EXPORT_URL, 'format=' + n + '&base64=' + (I || '0') + (null != M ? '&filename=' + encodeURIComponent(M) : '') + '&extras=' + encodeURIComponent(JSON.stringify(K)) + (0 < C ? '&dpi=' + C : '') + '&bg=' + (null != v ? v : 'none') + '&w=' + A + '&h=' + H + '&border=' + x + '&xml=' + encodeURIComponent(l));
          });
        } else
          'png' == n ? d.exportImage(u, null == v || 'none' == v, !0, !1, !1, x, !0, !1, null, F, C) : d.exportImage(u, !1, !0, !1, !1, x, !0, !1, 'jpeg', F);
      else
        mxUtils.alert(mxResources.get('drawingTooLarge'));
    }
  });
  EditorUi.prototype.getDiagramTextContent = function() {
    this.editor.graph.setEnabled(!1);
    var d = this.editor.graph,
      g = '';
    if (null != this.pages)
      for (var n = 0; n < this.pages.length; n++) {
        var v = d;
        this.currentPage != this.pages[n] && (v = this.createTemporaryGraph(d.getStylesheet()), this.updatePageRoot(this.pages[n]), v.model.setRoot(this.pages[n].root));
        g += this.pages[n].getName() + ' ' + v.getIndexableText() + ' ';
      }
    else
      g = d.getIndexableText();
    this.editor.graph.setEnabled(!0);
    return g;
  };
  EditorUi.prototype.showRemotelyStoredLibrary = function(d) {
    var g = {},
      n = document.createElement('div');
    n.style.whiteSpace = 'nowrap';
    var v = document.createElement('h3');
    mxUtils.write(v, mxUtils.htmlEntities(d));
    v.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
    n.appendChild(v);
    var u = document.createElement('div');
    u.style.cssText = 'border:1px solid lightGray;overflow: auto;height:300px';
    u.innerHTML = '<div style="text-align:center;padding:8px;"><img src="' + IMAGE_PATH + '/spin.gif"></div>';
    var x = {};
    try {
      var C = mxSettings.getCustomLibraries();
      for (d = 0; d < C.length; d++) {
        var F = C[d];
        if ('R' == F.substring(0, 1)) {
          var L = JSON.parse(decodeURIComponent(F.substring(1)));
          x[L[0]] = {
            id: L[0],
            title: L[1],
            downloadUrl: L[2]
          };
        }
      }
    } catch (l) {}
    this.remoteInvoke('getCustomLibraries', null, null, function(l) {
      u.innerText = '';
      if (0 == l.length)
        u.innerHTML = '<div style="text-align:center;padding-top:20px;color:gray;">' + mxUtils.htmlEntities(mxResources.get('noLibraries')) + '</div>';
      else
        for (var q = 0; q < l.length; q++) {
          var A = l[q];
          x[A.id] && (g[A.id] = A);
          var H = this.addCheckbox(u, A.title, x[A.id]);
          (function(K, M) {
            mxEvent.addListener(M, 'change', function() {
              this.checked ? g[K.id] = K : delete g[K.id];
            });
          }(A, H));
        }
    }, mxUtils.bind(this, function(l) {
      u.innerText = '';
      var q = document.createElement('div');
      q.style.padding = '8px';
      q.style.textAlign = 'center';
      mxUtils.write(q, mxResources.get('error') + ': ');
      mxUtils.write(q, null != l && null != l.message ? l.message : mxResources.get('unknownError'));
      u.appendChild(q);
    }));
    n.appendChild(u);
    n = new CustomDialog(this, n, mxUtils.bind(this, function() {
      this.spinner.spin(document.body, mxResources.get('loading'));
      var l = 0,
        q;
      for (q in g)
        null == x[q] && (l++, mxUtils.bind(this, function(A) {
          this.remoteInvoke('getFileContent', [A.downloadUrl], null, mxUtils.bind(this, function(H) {
            l--;
            0 == l && this.spinner.stop();
            try {
              this.loadLibrary(new RemoteLibrary(this, H, A));
            } catch (K) {
              this.handleError(K, mxResources.get('errorLoadingFile'));
            }
          }), mxUtils.bind(this, function() {
            l--;
            0 == l && this.spinner.stop();
            this.handleError(null, mxResources.get('errorLoadingFile'));
          }));
        })(g[q]));
      for (q in x)
        g[q] || this.closeLibrary(new RemoteLibrary(this, null, x[q]));
      0 == l && this.spinner.stop();
    }), null, null, 'https://www.diagrams.net/doc/faq/custom-libraries-confluence-cloud');
    this.showDialog(n.container, 340, 390, !0, !0, null, null, null, null, !0);
  };
  EditorUi.prototype.remoteInvokableFns = {
    getDiagramTextContent: {
      isAsync: !1
    },
    getLocalStorageFile: {
      isAsync: !1,
      allowedDomains: ['app.diagrams.net']
    },
    getLocalStorageFileNames: {
      isAsync: !1,
      allowedDomains: ['app.diagrams.net']
    },
    setMigratedFlag: {
      isAsync: !1,
      allowedDomains: ['app.diagrams.net']
    }
  };
  EditorUi.prototype.remoteInvokeCallbacks = [];
  EditorUi.prototype.remoteInvokeQueue = [];
  EditorUi.prototype.handleRemoteInvokeReady = function(d) {
    this.remoteWin = d;
    for (var g = 0; g < this.remoteInvokeQueue.length; g++)
      d.postMessage(this.remoteInvokeQueue[g], '*');
    this.remoteInvokeQueue = [];
  };
  EditorUi.prototype.handleRemoteInvokeResponse = function(d) {
    var g = d.msgMarkers,
      n = this.remoteInvokeCallbacks[g.callbackId];
    if (null == n)
      throw Error('No callback for ' + (null != g ? g.callbackId : 'null'));
    d.error ? n.error && n.error(d.error.errResp) : n.callback && n.callback.apply(this, d.resp);
    this.remoteInvokeCallbacks[g.callbackId] = null;
  };
  EditorUi.prototype.remoteInvoke = function(d, g, n, v, u) {
    var x = !0,
      C = window.setTimeout(mxUtils.bind(this, function() {
        x = !1;
        u({
          code: App.ERROR_TIMEOUT,
          message: mxResources.get('timeout')
        });
      }), this.timeout),
      F = mxUtils.bind(this, function() {
        window.clearTimeout(C);
        x && v.apply(this, arguments);
      }),
      L = mxUtils.bind(this, function() {
        window.clearTimeout(C);
        x && u.apply(this, arguments);
      });
    n = n || {};
    n.callbackId = this.remoteInvokeCallbacks.length;
    this.remoteInvokeCallbacks.push({
      callback: F,
      error: L
    });
    d = JSON.stringify({
      event: 'remoteInvoke',
      funtionName: d,
      functionArgs: g,
      msgMarkers: n
    });
    null != this.remoteWin ? this.remoteWin.postMessage(d, '*') : this.remoteInvokeQueue.push(d);
  };
  EditorUi.prototype.handleRemoteInvoke = function(d, g) {
    var n = mxUtils.bind(this, function(l, q) {
      var A = {
        event: 'remoteInvokeResponse',
        msgMarkers: d.msgMarkers
      };
      null != q ? A.error = {
        errResp: q
      } : null != l && (A.resp = l);
      this.remoteWin.postMessage(JSON.stringify(A), '*');
    });
    try {
      var v = d.funtionName,
        u = this.remoteInvokableFns[v];
      if (null != u && 'function' === typeof this[v]) {
        if (u.allowedDomains) {
          for (var x = !1, C = 0; C < u.allowedDomains.length; C++)
            if (g == 'https://' + u.allowedDomains[C]) {
              x = !0;
              break;
            }
          if (!x) {
            n(null, 'Invalid Call: ' + v + ' is not allowed.');
            return;
          }
        }
        var F = d.functionArgs;
        Array.isArray(F) || (F = []);
        if (u.isAsync)
          F.push(function() {
            n(Array.prototype.slice.apply(arguments));
          }), F.push(function(l) {
            n(null, l || 'Unkown Error');
          }), this[v].apply(this, F);
        else {
          var L = this[v].apply(this, F);
          n([L]);
        }
      } else
        n(null, 'Invalid Call: ' + v + ' is not found.');
    } catch (l) {
      n(null, 'Invalid Call: An error occurred, ' + l.message);
    }
  };
  EditorUi.prototype.openDatabase = function(d, g) {
    if (null == this.database) {
      var n = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
      if (null != n)
        try {
          var v = n.open('database', 2);
          v.onupgradeneeded = function(u) {
            try {
              var x = v.result;
              1 > u.oldVersion && x.createObjectStore('objects', {
                keyPath: 'key'
              });
              2 > u.oldVersion && (x.createObjectStore('files', {
                keyPath: 'title'
              }), x.createObjectStore('filesInfo', {
                keyPath: 'title'
              }), EditorUi.migrateStorageFiles = isLocalStorage);
            } catch (C) {
              null != g && g(C);
            }
          };
          v.onsuccess = mxUtils.bind(this, function(u) {
            var x = v.result;
            this.database = x;
            EditorUi.migrateStorageFiles && (StorageFile.migrate(x), EditorUi.migrateStorageFiles = !1);
            'app.diagrams.net' != location.host || this.drawioMigrationStarted || (this.drawioMigrationStarted = !0, this.getDatabaseItem('.drawioMigrated3', mxUtils.bind(this, function(C) {
              if (!C || '1' == urlParams.forceMigration) {
                var F = document.createElement('iframe');
                F.style.display = 'none';
                F.setAttribute('src', 'https://www.draw.io?embed=1&proto=json&forceMigration=' + urlParams.forceMigration);
                document.body.appendChild(F);
                var L = !0,
                  l = !1,
                  q, A = 0,
                  H = mxUtils.bind(this, function() {
                    l = !0;
                    this.setDatabaseItem('.drawioMigrated3', !0);
                    F.contentWindow.postMessage(JSON.stringify({
                      action: 'remoteInvoke',
                      funtionName: 'setMigratedFlag'
                    }), '*');
                  }),
                  K = mxUtils.bind(this, function() {
                    A++;
                    M();
                  }),
                  M = mxUtils.bind(this, function() {
                    try {
                      if (A >= q.length)
                        H();
                      else {
                        var Q = q[A];
                        StorageFile.getFileContent(this, Q, mxUtils.bind(this, function(P) {
                          null == P || '.scratchpad' == Q && P == this.emptyLibraryXml ? F.contentWindow.postMessage(JSON.stringify({
                            action: 'remoteInvoke',
                            funtionName: 'getLocalStorageFile',
                            functionArgs: [Q]
                          }), '*') : K();
                        }), K);
                      }
                    } catch (P) {
                      console.log(P);
                    }
                  }),
                  I = mxUtils.bind(this, function(Q) {
                    try {
                      this.setDatabaseItem(null, [{
                          title: Q.title,
                          size: Q.data.length,
                          lastModified: Date.now(),
                          type: Q.isLib ? 'L' : 'F'
                        },
                        {
                          title: Q.title,
                          data: Q.data
                        }
                      ], K, K, [
                        'filesInfo',
                        'files'
                      ]);
                    } catch (P) {
                      console.log(P);
                    }
                  });
                C = mxUtils.bind(this, function(Q) {
                  try {
                    if (Q.source == F.contentWindow) {
                      var P = {};
                      try {
                        P = JSON.parse(Q.data);
                      } catch (O) {}
                      'init' == P.event ? (F.contentWindow.postMessage(JSON.stringify({
                        action: 'remoteInvokeReady'
                      }), '*'), F.contentWindow.postMessage(JSON.stringify({
                        action: 'remoteInvoke',
                        funtionName: 'getLocalStorageFileNames'
                      }), '*')) : 'remoteInvokeResponse' != P.event || l || (L ? null != P.resp && 0 < P.resp.length && null != P.resp[0] ? (q = P.resp[0], L = !1, M()) : H() : null != P.resp && 0 < P.resp.length && null != P.resp[0] ? I(P.resp[0]) : K());
                    }
                  } catch (O) {
                    console.log(O);
                  }
                });
                window.addEventListener('message', C);
              }
            })));
            d(x);
            x.onversionchange = function() {
              x.close();
            };
          });
          v.onerror = g;
          v.onblocked = function() {};
        } catch (u) {
          null != g && g(u);
        }
      else
        null != g && g();
    } else
      d(this.database);
  };
  EditorUi.prototype.setDatabaseItem = function(d, g, n, v, u) {
    this.openDatabase(mxUtils.bind(this, function(x) {
      try {
        u = u || 'objects';
        Array.isArray(u) || (u = [u], d = [d], g = [g]);
        var C = x.transaction(u, 'readwrite');
        C.oncomplete = n;
        C.onerror = v;
        for (x = 0; x < u.length; x++)
          C.objectStore(u[x]).put(null != d && null != d[x] ? {
            key: d[x],
            data: g[x]
          } : g[x]);
      } catch (F) {
        null != v && v(F);
      }
    }), v);
  };
  EditorUi.prototype.removeDatabaseItem = function(d, g, n, v) {
    this.openDatabase(mxUtils.bind(this, function(u) {
      v = v || 'objects';
      Array.isArray(v) || (v = [v], d = [d]);
      u = u.transaction(v, 'readwrite');
      u.oncomplete = g;
      u.onerror = n;
      for (var x = 0; x < v.length; x++)
        u.objectStore(v[x]).delete(d[x]);
    }), n);
  };
  EditorUi.prototype.getDatabaseItem = function(d, g, n, v) {
    this.openDatabase(mxUtils.bind(this, function(u) {
      try {
        v = v || 'objects';
        var x = u.transaction([v], 'readonly').objectStore(v).get(d);
        x.onsuccess = function() {
          g(x.result);
        };
        x.onerror = n;
      } catch (C) {
        null != n && n(C);
      }
    }), n);
  };
  EditorUi.prototype.getDatabaseItems = function(d, g, n) {
    this.openDatabase(mxUtils.bind(this, function(v) {
      try {
        n = n || 'objects';
        var u = v.transaction([n], 'readonly').objectStore(n).openCursor(IDBKeyRange.lowerBound(0)),
          x = [];
        u.onsuccess = function(C) {
          null == C.target.result ? d(x) : (x.push(C.target.result.value), C.target.result.continue());
        };
        u.onerror = g;
      } catch (C) {
        null != g && g(C);
      }
    }), g);
  };
  EditorUi.prototype.getDatabaseItemKeys = function(d, g, n) {
    this.openDatabase(mxUtils.bind(this, function(v) {
      try {
        n = n || 'objects';
        var u = v.transaction([n], 'readonly').objectStore(n).getAllKeys();
        u.onsuccess = function() {
          d(u.result);
        };
        u.onerror = g;
      } catch (x) {
        null != g && g(x);
      }
    }), g);
  };
  EditorUi.prototype.commentsSupported = function() {
    var d = this.getCurrentFile();
    return null != d ? d.commentsSupported() : !1;
  };
  EditorUi.prototype.commentsRefreshNeeded = function() {
    var d = this.getCurrentFile();
    return null != d ? d.commentsRefreshNeeded() : !0;
  };
  EditorUi.prototype.commentsSaveNeeded = function() {
    var d = this.getCurrentFile();
    return null != d ? d.commentsSaveNeeded() : !1;
  };
  EditorUi.prototype.getComments = function(d, g) {
    var n = this.getCurrentFile();
    null != n ? n.getComments(d, g) : d([]);
  };
  EditorUi.prototype.addComment = function(d, g, n) {
    var v = this.getCurrentFile();
    null != v ? v.addComment(d, g, n) : g(Date.now());
  };
  EditorUi.prototype.canReplyToReplies = function() {
    var d = this.getCurrentFile();
    return null != d ? d.canReplyToReplies() : !0;
  };
  EditorUi.prototype.canComment = function() {
    var d = this.getCurrentFile();
    return null != d ? d.canComment() : !0;
  };
  EditorUi.prototype.newComment = function(d, g) {
    var n = this.getCurrentFile();
    return null != n ? n.newComment(d, g) : new DrawioComment(this, null, d, Date.now(), Date.now(), !1, g);
  };
  EditorUi.prototype.isRevisionHistorySupported = function() {
    var d = this.getCurrentFile();
    return null != d && d.isRevisionHistorySupported();
  };
  EditorUi.prototype.getRevisions = function(d, g) {
    var n = this.getCurrentFile();
    null != n && n.getRevisions ? n.getRevisions(d, g) : g({
      message: mxResources.get('unknownError')
    });
  };
  EditorUi.prototype.isRevisionHistoryEnabled = function() {
    var d = this.getCurrentFile();
    return null != d && (d.constructor == DriveFile && d.isEditable() || d.constructor == DropboxFile);
  };
  EditorUi.prototype.getServiceName = function() {
    return 'draw.io';
  };
  EditorUi.prototype.addRemoteServiceSecurityCheck = function(d) {
    d.setRequestHeader('Content-Language', 'da, mi, en, de-DE');
  };
  EditorUi.prototype.loadUrl = function(d, g, n, v, u, x, C, F) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: loadUrl');
    return this.editor.loadUrl(d, g, n, v, u, x, C, F);
  };
  EditorUi.prototype.loadFonts = function(d) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: loadFonts');
    return this.editor.loadFonts(d);
  };
  EditorUi.prototype.createSvgDataUri = function(d) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: createSvgDataUri');
    return Editor.createSvgDataUri(d);
  };
  EditorUi.prototype.embedCssFonts = function(d, g) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: embedCssFonts');
    return this.editor.embedCssFonts(d, g);
  };
  EditorUi.prototype.embedExtFonts = function(d) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: embedExtFonts');
    return this.editor.embedExtFonts(d);
  };
  EditorUi.prototype.exportToCanvas = function(d, g, n, v, u, x, C, F, L, l, q, A, H, K, M, I) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: exportToCanvas');
    return this.editor.exportToCanvas(d, g, n, v, u, x, C, F, L, l, q, A, H, K, M, I);
  };
  EditorUi.prototype.createImageUrlConverter = function() {
    EditorUi.logEvent('SHOULD NOT BE CALLED: createImageUrlConverter');
    return this.editor.createImageUrlConverter();
  };
  EditorUi.prototype.convertImages = function(d, g, n, v) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: convertImages');
    return this.editor.convertImages(d, g, n, v);
  };
  EditorUi.prototype.convertImageToDataUri = function(d, g) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: convertImageToDataUri');
    return this.editor.convertImageToDataUri(d, g);
  };
  EditorUi.prototype.base64Encode = function(d) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: base64Encode');
    return Editor.base64Encode(d);
  };
  EditorUi.prototype.updateCRC = function(d, g, n, v) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: updateCRC');
    return Editor.updateCRC(d, g, n, v);
  };
  EditorUi.prototype.crc32 = function(d) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: crc32');
    return Editor.crc32(d);
  };
  EditorUi.prototype.writeGraphModelToPng = function(d, g, n, v, u) {
    EditorUi.logEvent('SHOULD NOT BE CALLED: writeGraphModelToPng');
    return Editor.writeGraphModelToPng(d, g, n, v, u);
  };
  EditorUi.prototype.getLocalStorageFileNames = function() {
    if ('1' == localStorage.getItem('.localStorageMigrated') && '1' != urlParams.forceMigration)
      return null;
    for (var d = [], g = 0; g < localStorage.length; g++) {
      var n = localStorage.key(g),
        v = localStorage.getItem(n);
      if (0 < n.length && ('.scratchpad' == n || '.' != n.charAt(0)) && 0 < v.length) {
        var u = '<mxfile ' === v.substring(0, 8) || '<?xml' === v.substring(0, 5) || '<!--[if IE]>' === v.substring(0, 12);
        v = '<mxlibrary>' === v.substring(0, 11);
        (u || v) && d.push(n);
      }
    }
    return d;
  };
  EditorUi.prototype.getLocalStorageFile = function(d) {
    if ('1' == localStorage.getItem('.localStorageMigrated') && '1' != urlParams.forceMigration)
      return null;
    var g = localStorage.getItem(d);
    return {
      title: d,
      data: g,
      isLib: '<mxlibrary>' === g.substring(0, 11)
    };
  };
  EditorUi.prototype.setMigratedFlag = function() {
    localStorage.setItem('.localStorageMigrated', '1');
  };
}());