var FindWindow = function(b, e, f, c, k, m) {
  function t(W, p, B, N) {
    if ('object' === typeof p.value && null != p.value.attributes) {
      p = p.value.attributes;
      for (var S = 0; S < p.length; S++)
        if ('label' != p[S].nodeName) {
          var R = mxUtils.trim(p[S].nodeValue.replace(/[\x00-\x1F\x7F-\x9F]|\s+/g, ' ')).toLowerCase();
          if (null == W && (N && 0 <= R.indexOf(B) || !N && R.substring(0, B.length) === B) || null != W && W.test(R))
            return !0;
        }
    }
    return !1;
  }

  function y() {
    d && L.value ? (Q.removeAttribute('disabled'), P.removeAttribute('disabled')) : (Q.setAttribute('disabled', 'disabled'), P.setAttribute('disabled', 'disabled'));
    L.value && F.value ? O.removeAttribute('disabled') : O.setAttribute('disabled', 'disabled');
  }

  function E(W, p, B) {
    M.innerText = '';
    var N = D.model.getDescendants(D.model.getRoot()),
      S = F.value.toLowerCase(),
      R = l.checked ? new RegExp(S) : null,
      V = null;
    n = null;
    J != S && (J = S, G = null, g = !1);
    var T = null == G;
    if (0 < S.length) {
      if (g) {
        g = !1;
        for (var U, X = 0; X < b.pages.length; X++)
          if (b.currentPage == b.pages[X]) {
            U = X;
            break;
          }
        W = (U + 1) % b.pages.length;
        G = null;
        do
          g = !1, N = b.pages[W], D = b.createTemporaryGraph(D.getStylesheet()), b.updatePageRoot(N), D.model.setRoot(N.root), W = (W + 1) % b.pages.length;
        while (!E(!0, p, B) && W != U);
        G && (G = null, B ? b.editor.graph.model.execute(new SelectPage(b, N)) : b.selectPage(N));
        g = !1;
        D = b.editor.graph;
        return E(!0, p, B);
      }
      for (X = 0; X < N.length; X++) {
        U = D.view.getState(N[X]);
        p && null != R && (T = T || U == G);
        if (null != U && null != U.cell.value && (T || null == V) && (D.model.isVertex(U.cell) || D.model.isEdge(U.cell))) {
          null != U.style && '1' == U.style.html ? (A.innerHTML = D.sanitizeHtml(D.getLabel(U.cell)), label = mxUtils.extractTextWithWhitespace([A])) : label = D.getLabel(U.cell);
          label = mxUtils.trim(label.replace(/[\x00-\x1F\x7F-\x9F]|\s+/g, ' ')).toLowerCase();
          var Z = 0;
          p && m && null != R && U == G && (label = label.substr(v), Z = v);
          var Y = '' == L.value,
            ea = Y;
          if (null == R && (ea && 0 <= label.indexOf(S) || !ea && label.substring(0, S.length) === S || Y && t(R, U.cell, S, ea)) || null != R && (R.test(label) || Y && t(R, U.cell, S, ea)))
            if (m && (null != R ? (Y = label.match(R), null != Y && 0 < Y.length && (n = Y[0].toLowerCase(), v = Z + Y.index + n.length)) : (n = S, v = n.length)), T) {
              V = U;
              break;
            } else
              null == V && (V = U);
        }
        T = T || U == G;
      }
    }
    if (null != V) {
      if (X == N.length && q.checked)
        return G = null, g = !0, E(!0, p, B);
      G = V;
      D.scrollCellToVisible(G.cell);
      D.isEnabled() && !D.isCellLocked(G.cell) ? B || D.getSelectionCell() == G.cell && 1 == D.getSelectionCount() || D.setSelectionCell(G.cell) : D.highlightCell(G.cell);
    } else {
      if (!W && q.checked)
        return g = !0, E(!0, p, B);
      D.isEnabled() && !B && D.clearSelection();
    }
    d = null != V;
    m && !W && y();
    return 0 == S.length || null != V;
  }
  var z = b.actions.get('findReplace'),
    D = b.editor.graph,
    J = null,
    G = null,
    d = !1,
    g = !1,
    n = null,
    v = 0,
    u = 1,
    x = document.createElement('div');
  x.style.userSelect = 'none';
  x.style.overflow = 'hidden';
  x.style.padding = '10px';
  x.style.height = '100%';
  var C = m ? '260px' : '200px',
    F = document.createElement('input');
  F.setAttribute('placeholder', mxResources.get('find'));
  F.setAttribute('type', 'text');
  F.style.marginTop = '4px';
  F.style.marginBottom = '6px';
  F.style.width = C;
  F.style.fontSize = '12px';
  F.style.borderRadius = '4px';
  F.style.padding = '6px';
  x.appendChild(F);
  mxUtils.br(x);
  if (m) {
    var L = document.createElement('input');
    L.setAttribute('placeholder', mxResources.get('replaceWith'));
    L.setAttribute('type', 'text');
    L.style.marginTop = '4px';
    L.style.marginBottom = '6px';
    L.style.width = C;
    L.style.fontSize = '12px';
    L.style.borderRadius = '4px';
    L.style.padding = '6px';
    x.appendChild(L);
    mxUtils.br(x);
    mxEvent.addListener(L, 'input', y);
  }
  var l = document.createElement('input');
  l.setAttribute('id', 'geFindWinRegExChck');
  l.setAttribute('type', 'checkbox');
  l.style.marginRight = '4px';
  x.appendChild(l);
  C = document.createElement('label');
  C.setAttribute('for', 'geFindWinRegExChck');
  x.appendChild(C);
  mxUtils.write(C, mxResources.get('regularExpression'));
  x.appendChild(C);
  C = b.menus.createHelpLink('https://www.diagrams.net/doc/faq/find-shapes');
  C.style.position = 'relative';
  C.style.marginLeft = '6px';
  C.style.top = '-1px';
  x.appendChild(C);
  mxUtils.br(x);
  var q = document.createElement('input');
  q.setAttribute('id', 'geFindWinAllPagesChck');
  q.setAttribute('type', 'checkbox');
  q.style.marginRight = '4px';
  x.appendChild(q);
  C = document.createElement('label');
  C.setAttribute('for', 'geFindWinAllPagesChck');
  x.appendChild(C);
  mxUtils.write(C, mxResources.get('allPages'));
  x.appendChild(C);
  var A = document.createElement('div');
  mxUtils.br(x);
  C = document.createElement('div');
  C.style.left = '0px';
  C.style.right = '0px';
  C.style.marginTop = '6px';
  C.style.padding = '0 6px 0 6px';
  C.style.textAlign = 'center';
  x.appendChild(C);
  var H = mxUtils.button(mxResources.get('reset'), function() {
    M.innerText = '';
    F.value = '';
    F.style.backgroundColor = '';
    m && (L.value = '', y());
    J = G = null;
    g = !1;
    F.focus();
  });
  H.setAttribute('title', mxResources.get('reset'));
  H.style.float = 'none';
  H.style.width = '120px';
  H.style.marginTop = '6px';
  H.style.marginLeft = '8px';
  H.style.overflow = 'hidden';
  H.style.textOverflow = 'ellipsis';
  H.className = 'geBtn';
  m || C.appendChild(H);
  var K = mxUtils.button(mxResources.get('find'), function() {
    try {
      F.style.backgroundColor = E() ? '' : Editor.isDarkMode() ? '#ff0000' : '#ffcfcf';
    } catch (W) {
      b.handleError(W);
    }
  });
  K.setAttribute('title', mxResources.get('find') + ' (Enter)');
  K.style.float = 'none';
  K.style.width = '120px';
  K.style.marginTop = '6px';
  K.style.marginLeft = '8px';
  K.style.overflow = 'hidden';
  K.style.textOverflow = 'ellipsis';
  K.className = 'geBtn gePrimaryBtn';
  C.appendChild(K);
  var M = document.createElement('div');
  M.style.marginTop = '10px';
  if (m) {
    var I = function(W, p, B, N, S) {
        if (null == S || '1' != S.html)
          return N = W.toLowerCase().indexOf(p, N), 0 > N ? W : W.substr(0, N) + B + W.substr(N + p.length);
        var R = W;
        p = mxUtils.htmlEntities(p);
        S = [];
        var V = -1;
        for (W = W.replace(/<br>/ig, '\n'); - 1 < (V = W.indexOf('<', V + 1));)
          S.push(V);
        V = W.match(/<[^>]*>/g);
        W = W.replace(/<[^>]*>/g, '');
        N = W.toLowerCase().indexOf(p, N);
        if (0 > N)
          return R;
        R = N + p.length;
        B = mxUtils.htmlEntities(B);
        W = W.substr(0, N) + B + W.substr(R);
        for (var T = 0, U = 0; U < S.length; U++) {
          if (S[U] - T < N)
            W = W.substr(0, S[U]) + V[U] + W.substr(S[U]);
          else {
            var X = S[U] - T < R ? N + T : S[U] + (B.length - p.length);
            W = W.substr(0, X) + V[U] + W.substr(X);
          }
          T += V[U].length;
        }
        return W.replace(/\n/g, '<br>');
      },
      Q = mxUtils.button(mxResources.get('replFind'), function() {
        try {
          if (null != n && null != G && L.value) {
            var W = G.cell,
              p = D.getLabel(W);
            D.isCellEditable(W) && D.model.setValue(W, I(p, n, L.value, v - n.length, D.getCurrentCellStyle(W)));
            F.style.backgroundColor = E(!1, !0) ? '' : Editor.isDarkMode() ? '#ff0000' : '#ffcfcf';
          }
        } catch (B) {
          b.handleError(B);
        }
      });
    Q.setAttribute('title', mxResources.get('replFind'));
    Q.style.float = 'none';
    Q.style.width = '120px';
    Q.style.marginTop = '6px';
    Q.style.marginLeft = '8px';
    Q.style.overflow = 'hidden';
    Q.style.textOverflow = 'ellipsis';
    Q.className = 'geBtn gePrimaryBtn';
    Q.setAttribute('disabled', 'disabled');
    C.appendChild(Q);
    mxUtils.br(C);
    var P = mxUtils.button(mxResources.get('replace'), function() {
      try {
        if (null != n && null != G && L.value) {
          var W = G.cell,
            p = D.getLabel(W);
          D.model.setValue(W, I(p, n, L.value, v - n.length, D.getCurrentCellStyle(W)));
          Q.setAttribute('disabled', 'disabled');
          P.setAttribute('disabled', 'disabled');
        }
      } catch (B) {
        b.handleError(B);
      }
    });
    P.setAttribute('title', mxResources.get('replace'));
    P.style.float = 'none';
    P.style.width = '120px';
    P.style.marginTop = '6px';
    P.style.marginLeft = '8px';
    P.style.overflow = 'hidden';
    P.style.textOverflow = 'ellipsis';
    P.className = 'geBtn gePrimaryBtn';
    P.setAttribute('disabled', 'disabled');
    C.appendChild(P);
    var O = mxUtils.button(mxResources.get('replaceAll'), function() {
      M.innerText = '';
      if (L.value) {
        J = null;
        var W = b.currentPage,
          p = b.editor.graph.getSelectionCells();
        b.editor.graph.rendering = !1;
        D.getModel().beginUpdate();
        try {
          for (var B = 0, N = {}; E(!1, !0, !0) && 100 > B;) {
            var S = G.cell,
              R = D.getLabel(S),
              V = N[S.id];
            if (V && V.replAllMrk == u && V.replAllPos >= v)
              break;
            N[S.id] = {
              replAllMrk: u,
              replAllPos: v
            };
            D.isCellEditable(S) && (D.model.setValue(S, I(R, n, L.value, v - n.length, D.getCurrentCellStyle(S))), B++);
          }
          W != b.currentPage && b.editor.graph.model.execute(new SelectPage(b, W));
          mxUtils.write(M, mxResources.get('matchesRepl', [B]));
        } catch (T) {
          b.handleError(T);
        } finally {
          D.getModel().endUpdate(), b.editor.graph.setSelectionCells(p), b.editor.graph.rendering = !0;
        }
        u++;
      }
    });
    O.setAttribute('title', mxResources.get('replaceAll'));
    O.style.float = 'none';
    O.style.width = '120px';
    O.style.marginTop = '6px';
    O.style.marginLeft = '8px';
    O.style.overflow = 'hidden';
    O.style.textOverflow = 'ellipsis';
    O.className = 'geBtn gePrimaryBtn';
    O.setAttribute('disabled', 'disabled');
    C.appendChild(O);
    mxUtils.br(C);
    C.appendChild(H);
    H = mxUtils.button(mxResources.get('close'), mxUtils.bind(this, function() {
      this.window.setVisible(!1);
    }));
    H.setAttribute('title', mxResources.get('close'));
    H.style.float = 'none';
    H.style.width = '120px';
    H.style.marginTop = '6px';
    H.style.marginLeft = '8px';
    H.style.overflow = 'hidden';
    H.style.textOverflow = 'ellipsis';
    H.className = 'geBtn';
    C.appendChild(H);
    mxUtils.br(C);
    C.appendChild(M);
  } else
    H.style.width = '90px', K.style.width = '90px';
  mxEvent.addListener(F, 'keyup', function(W) {
    if (91 == W.keyCode || 93 == W.keyCode || 17 == W.keyCode)
      mxEvent.consume(W);
    else if (27 == W.keyCode)
      z.funct();
    else if (J != F.value.toLowerCase() || 13 == W.keyCode)
      try {
        F.style.backgroundColor = E() ? '' : Editor.isDarkMode() ? '#ff0000' : '#ffcfcf';
      } catch (p) {
        F.style.backgroundColor = Editor.isDarkMode() ? '#ff0000' : '#ffcfcf';
      }
  });
  mxEvent.addListener(x, 'keydown', function(W) {
    70 == W.keyCode && b.keyHandler.isControlDown(W) && !mxEvent.isShiftDown(W) && (z.funct(), mxEvent.consume(W));
  });
  this.window = new mxWindow(mxResources.get('find') + (m ? '/' + mxResources.get('replace') : ''), x, e, f, c, k, !0, !0);
  this.window.destroyOnClose = !1;
  this.window.setMaximizable(!1);
  this.window.setResizable(!1);
  this.window.setClosable(!0);
  this.window.addListener('show', mxUtils.bind(this, function() {
    this.window.fit();
    this.window.isVisible() ? (F.focus(), mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? F.select() : document.execCommand('selectAll', !1, null), null != b.pages && 1 < b.pages.length ? q.removeAttribute('disabled') : (q.checked = !1, q.setAttribute('disabled', 'disabled'))) : D.container.focus();
  }));
  b.installResizeHandler(this, !1);
};