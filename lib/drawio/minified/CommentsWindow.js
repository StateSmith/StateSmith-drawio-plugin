var CommentsWindow = function(b, e, f, c, k, m) {
  function t() {
    for (var H = x.getElementsByTagName('div'), K = 0, M = 0; M < H.length; M++)
      'none' != H[M].style.display && H[M].parentNode == x && K++;
    C.style.display = 0 == K ? 'block' : 'none';
  }

  function y(H, K, M, I) {
    function Q() {
      K.removeChild(W);
      K.removeChild(p);
      O.style.display = 'block';
      P.style.display = 'block';
    }
    n = {
      div: K,
      comment: H,
      saveCallback: M,
      deleteOnCancel: I
    };
    var P = K.querySelector('.geCommentTxt'),
      O = K.querySelector('.geCommentActionsList'),
      W = document.createElement('textarea');
    W.className = 'geCommentEditTxtArea';
    W.style.minHeight = P.offsetHeight + 'px';
    W.value = H.content;
    K.insertBefore(W, P);
    var p = document.createElement('div');
    p.className = 'geCommentEditBtns';
    var B = mxUtils.button(mxResources.get('cancel'), function() {
      I ? (K.parentNode.removeChild(K), t()) : Q();
      n = null;
    });
    B.className = 'geCommentEditBtn';
    p.appendChild(B);
    var N = mxUtils.button(mxResources.get('save'), function() {
      P.innerText = '';
      H.content = W.value;
      mxUtils.write(P, H.content);
      Q();
      M(H);
      n = null;
    });
    mxEvent.addListener(W, 'keydown', mxUtils.bind(this, function(S) {
      mxEvent.isConsumed(S) || ((mxEvent.isControlDown(S) || mxClient.IS_MAC && mxEvent.isMetaDown(S)) && 13 == S.keyCode ? (N.click(), mxEvent.consume(S)) : 27 == S.keyCode && (B.click(), mxEvent.consume(S)));
    }));
    N.focus();
    N.className = 'geCommentEditBtn gePrimaryBtn';
    p.appendChild(N);
    K.insertBefore(p, P);
    O.style.display = 'none';
    P.style.display = 'none';
    W.focus();
  }

  function E(H, K) {
    K.innerText = '';
    H = new Date(H.modifiedDate);
    var M = b.timeSince(H);
    null == M && (M = mxResources.get('lessThanAMinute'));
    mxUtils.write(K, mxResources.get('timeAgo', [M], '{1} ago'));
    K.setAttribute('title', H.toLocaleDateString() + ' ' + H.toLocaleTimeString());
  }

  function z(H) {
    var K = document.createElement('img');
    K.className = 'geCommentBusyImg';
    K.src = IMAGE_PATH + '/spin.gif';
    H.appendChild(K);
    H.busyImg = K;
  }

  function D(H) {
    H.style.border = '1px solid red';
    H.removeChild(H.busyImg);
  }

  function J(H) {
    H.style.border = '';
    H.removeChild(H.busyImg);
  }

  function G(H, K, M, I, Q) {
    function P(V, T, U) {
      var X = document.createElement('li');
      X.className = 'geCommentAction';
      var Z = document.createElement('a');
      Z.className = 'geCommentActionLnk';
      mxUtils.write(Z, V);
      X.appendChild(Z);
      mxEvent.addListener(Z, 'click', function(Y) {
        T(Y, H);
        Y.preventDefault();
        mxEvent.consume(Y);
      });
      R.appendChild(X);
      U && (X.style.display = 'none');
    }

    function O() {
      function V(X) {
        T.push(U);
        if (null != X.replies)
          for (var Z = 0; Z < X.replies.length; Z++)
            U = U.nextSibling, V(X.replies[Z]);
      }
      var T = [],
        U = p;
      V(H);
      return {
        pdiv: U,
        replies: T
      };
    }

    function W(V, T, U, X, Z) {
      function Y() {
        z(da);
        H.addReply(fa, function(ba) {
          fa.id = ba;
          H.replies.push(fa);
          J(da);
          U && U();
        }, function(ba) {
          ea();
          D(da);
          b.handleError(ba, null, null, null, mxUtils.htmlEntities(mxResources.get('objectNotFound')));
        }, X, Z);
      }

      function ea() {
        y(fa, da, function(ba) {
          Y();
        }, !0);
      }
      var aa = O().pdiv,
        fa = b.newComment(V, b.getCurrentUser());
      fa.pCommentId = H.id;
      null == H.replies && (H.replies = []);
      var da = G(fa, H.replies, aa, I + 1);
      T ? ea() : Y();
    }
    if (Q || !H.isResolved) {
      C.style.display = 'none';
      var p = document.createElement('div');
      p.className = 'geCommentContainer';
      p.setAttribute('data-commentId', H.id);
      p.style.marginLeft = 20 * I + 5 + 'px';
      H.isResolved && !Editor.isDarkMode() && (p.style.backgroundColor = 'ghostWhite');
      var B = document.createElement('div');
      B.className = 'geCommentHeader';
      var N = document.createElement('img');
      N.className = 'geCommentUserImg';
      N.src = H.user.pictureUrl || Editor.userImage;
      B.appendChild(N);
      N = document.createElement('div');
      N.className = 'geCommentHeaderTxt';
      B.appendChild(N);
      var S = document.createElement('div');
      S.className = 'geCommentUsername';
      mxUtils.write(S, H.user.displayName || '');
      N.appendChild(S);
      S = document.createElement('div');
      S.className = 'geCommentDate';
      S.setAttribute('data-commentId', H.id);
      E(H, S);
      N.appendChild(S);
      p.appendChild(B);
      B = document.createElement('div');
      B.className = 'geCommentTxt';
      mxUtils.write(B, H.content || '');
      p.appendChild(B);
      H.isLocked && (p.style.opacity = '0.5');
      B = document.createElement('div');
      B.className = 'geCommentActions';
      var R = document.createElement('ul');
      R.className = 'geCommentActionsList';
      B.appendChild(R);
      d || H.isLocked || 0 != I && !g || P(mxResources.get('reply'), function() {
        W('', !0);
      }, H.isResolved);
      N = b.getCurrentUser();
      null == N || N.id != H.user.id || d || H.isLocked || (P(mxResources.get('edit'), function() {
        function V() {
          y(H, p, function() {
            z(p);
            H.editComment(H.content, function() {
              J(p);
            }, function(T) {
              D(p);
              V();
              b.handleError(T, null, null, null, mxUtils.htmlEntities(mxResources.get('objectNotFound')));
            });
          });
        }
        V();
      }, H.isResolved), P(mxResources.get('delete'), function() {
        b.confirm(mxResources.get('areYouSure'), function() {
          z(p);
          H.deleteComment(function(V) {
            if (!0 === V) {
              V = p.querySelector('.geCommentTxt');
              V.innerText = '';
              mxUtils.write(V, mxResources.get('msgDeleted'));
              var T = p.querySelectorAll('.geCommentAction');
              for (V = 0; V < T.length; V++)
                T[V].parentNode.removeChild(T[V]);
              J(p);
              p.style.opacity = '0.5';
            } else {
              T = O(H).replies;
              for (V = 0; V < T.length; V++)
                x.removeChild(T[V]);
              for (V = 0; V < K.length; V++)
                if (K[V] == H) {
                  K.splice(V, 1);
                  break;
                }
              C.style.display = 0 == x.getElementsByTagName('div').length ? 'block' : 'none';
            }
          }, function(V) {
            D(p);
            b.handleError(V, null, null, null, mxUtils.htmlEntities(mxResources.get('objectNotFound')));
          });
        });
      }, H.isResolved));
      d || H.isLocked || 0 != I || P(H.isResolved ? mxResources.get('reopen') : mxResources.get('resolve'), function(V) {
        function T() {
          var U = V.target;
          U.innerText = '';
          H.isResolved = !H.isResolved;
          mxUtils.write(U, H.isResolved ? mxResources.get('reopen') : mxResources.get('resolve'));
          for (var X = H.isResolved ? 'none' : '', Z = O(H).replies, Y = Editor.isDarkMode() ? 'transparent' : H.isResolved ? 'ghostWhite' : 'white', ea = 0; ea < Z.length; ea++) {
            Z[ea].style.backgroundColor = Y;
            for (var aa = Z[ea].querySelectorAll('.geCommentAction'), fa = 0; fa < aa.length; fa++)
              aa[fa] != U.parentNode && (aa[fa].style.display = X);
            l || (Z[ea].style.display = 'none');
          }
          t();
        }
        H.isResolved ? W(mxResources.get('reOpened') + ': ', !0, T, !1, !0) : W(mxResources.get('markedAsResolved'), !1, T, !0);
      });
      p.appendChild(B);
      null != M ? x.insertBefore(p, M.nextSibling) : x.appendChild(p);
      for (M = 0; null != H.replies && M < H.replies.length; M++)
        B = H.replies[M], B.isResolved = H.isResolved, G(B, H.replies, null, I + 1, Q);
      null != n && (n.comment.id == H.id ? (Q = H.content, H.content = n.comment.content, y(H, p, n.saveCallback, n.deleteOnCancel), H.content = Q) : null == n.comment.id && n.comment.pCommentId == H.id && (x.appendChild(n.div), y(n.comment, n.div, n.saveCallback, n.deleteOnCancel)));
      return p;
    }
  }
  var d = !b.canComment(),
    g = b.canReplyToReplies(),
    n = null,
    v = document.createElement('div');
  v.className = 'geCommentsWin';
  v.style.background = Editor.isDarkMode() ? Dialog.backdropColor : 'whiteSmoke';
  var u = EditorUi.compactUi ? '26px' : '30px',
    x = document.createElement('div');
  x.className = 'geCommentsList';
  x.style.backgroundColor = Editor.isDarkMode() ? Dialog.backdropColor : 'whiteSmoke';
  x.style.bottom = parseInt(u) + 7 + 'px';
  v.appendChild(x);
  var C = document.createElement('span');
  C.style.cssText = 'display:none;padding-top:10px;text-align:center;';
  mxUtils.write(C, mxResources.get('noCommentsFound'));
  var F = document.createElement('div');
  F.className = 'geToolbarContainer geCommentsToolbar';
  F.style.height = u;
  F.style.padding = EditorUi.compactUi ? '4px 0px 3px 0px' : '1px';
  u = document.createElement('a');
  u.className = 'geButton';
  if (!d) {
    var L = u.cloneNode();
    L.innerHTML = '<div class="geSprite geSprite-plus" style="display:inline-block;"></div>';
    L.setAttribute('title', mxResources.get('create') + '...');
    mxEvent.addListener(L, 'click', function(H) {
      function K() {
        y(M, I, function(Q) {
          z(I);
          b.addComment(Q, function(P) {
            Q.id = P;
            q.push(Q);
            J(I);
          }, function(P) {
            D(I);
            K();
            b.handleError(P, null, null, null, mxUtils.htmlEntities(mxResources.get('objectNotFound')));
          });
        }, !0);
      }
      var M = b.newComment('', b.getCurrentUser()),
        I = G(M, q, null, 0);
      K();
      H.preventDefault();
      mxEvent.consume(H);
    });
    F.appendChild(L);
  }
  L = u.cloneNode();
  L.innerHTML = '<img src="' + IMAGE_PATH + '/check.png" style="width: 16px; padding: 2px;">';
  L.setAttribute('title', mxResources.get('showResolved'));
  L.className = 'geButton geAdaptiveAsset';
  var l = !1;
  mxEvent.addListener(L, 'click', function(H) {
    this.className = (l = !l) ? 'geButton geCheckedBtn' : 'geButton';
    A();
    H.preventDefault();
    mxEvent.consume(H);
  });
  F.appendChild(L);
  b.commentsRefreshNeeded() && (L = u.cloneNode(), L.innerHTML = '<img src="' + IMAGE_PATH + '/update16.png" style="width: 16px; padding: 2px;">', L.setAttribute('title', mxResources.get('refresh')), L.className = 'geButton geAdaptiveAsset', mxEvent.addListener(L, 'click', function(H) {
    A();
    H.preventDefault();
    mxEvent.consume(H);
  }), F.appendChild(L));
  b.commentsSaveNeeded() && (u = u.cloneNode(), u.innerHTML = '<img src="' + IMAGE_PATH + '/save.png" style="width: 20px; padding: 2px;">', u.setAttribute('title', mxResources.get('save')), u.className = 'geButton geAdaptiveAsset', mxEvent.addListener(u, 'click', function(H) {
    m();
    H.preventDefault();
    mxEvent.consume(H);
  }), F.appendChild(u));
  v.appendChild(F);
  var q = [],
    A = mxUtils.bind(this, function() {
      this.hasError = !1;
      if (null != n)
        try {
          n.div = n.div.cloneNode(!0);
          var H = n.div.querySelector('.geCommentEditTxtArea'),
            K = n.div.querySelector('.geCommentEditBtns');
          n.comment.content = H.value;
          H.parentNode.removeChild(H);
          K.parentNode.removeChild(K);
        } catch (M) {
          b.handleError(M);
        }
      x.innerHTML = '<div style="padding-top:10px;text-align:center;"><img src="' + IMAGE_PATH + '/spin.gif" valign="middle"> ' + mxUtils.htmlEntities(mxResources.get('loading')) + '...</div>';
      g = b.canReplyToReplies();
      b.commentsSupported() ? b.getComments(function(M) {
        function I(Q) {
          if (null != Q) {
            Q.sort(function(O, W) {
              return new Date(O.modifiedDate) - new Date(W.modifiedDate);
            });
            for (var P = 0; P < Q.length; P++)
              I(Q[P].replies);
          }
        }
        M.sort(function(Q, P) {
          return new Date(Q.modifiedDate) - new Date(P.modifiedDate);
        });
        x.innerText = '';
        x.appendChild(C);
        C.style.display = 'block';
        q = M;
        for (M = 0; M < q.length; M++)
          I(q[M].replies), G(q[M], q, null, 0, l);
        null != n && null == n.comment.id && null == n.comment.pCommentId && (x.appendChild(n.div), y(n.comment, n.div, n.saveCallback, n.deleteOnCancel));
      }, mxUtils.bind(this, function(M) {
        x.innerHTML = mxUtils.htmlEntities(mxResources.get('error') + (M && M.message ? ': ' + M.message : ''));
        this.hasError = !0;
      })) : x.innerHTML = mxUtils.htmlEntities(mxResources.get('error'));
    });
  A();
  this.refreshComments = A;
  F = mxUtils.bind(this, function() {
    function H(P) {
      var O = M[P.id];
      if (null != O)
        for (E(P, O), O = 0; null != P.replies && O < P.replies.length; O++)
          H(P.replies[O]);
    }
    if (this.window.isVisible()) {
      for (var K = x.querySelectorAll('.geCommentDate'), M = {}, I = 0; I < K.length; I++) {
        var Q = K[I];
        M[Q.getAttribute('data-commentId')] = Q;
      }
      for (I = 0; I < q.length; I++)
        H(q[I]);
    }
  });
  setInterval(F, 60000);
  this.refreshCommentsTime = F;
  this.window = new mxWindow(mxResources.get('comments'), v, e, f, c, k, !0, !0);
  this.window.minimumSize = new mxRectangle(0, 0, 260, 200);
  this.window.destroyOnClose = !1;
  this.window.setMaximizable(!1);
  this.window.setResizable(!0);
  this.window.setClosable(!0);
  this.window.setVisible(!0);
  this.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function() {
    this.window.fit();
  }));
  b.installResizeHandler(this, !0);
};