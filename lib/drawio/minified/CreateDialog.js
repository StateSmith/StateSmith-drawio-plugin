var CreateDialog = function(b, e, f, c, k, m, t, y, E, z, D, J, G, d, g, n, v) {
  function u(H, K, M, I) {
    function Q() {
      mxEvent.addListener(P, 'click', function() {
        var N = M;
        if (t) {
          var S = F.value,
            R = S.lastIndexOf('.');
          if (0 > e.lastIndexOf('.') && 0 > R) {
            N = null != N ? N : A.value;
            var V = '';
            N == App.MODE_GOOGLE ? V = b.drive.extension : N == App.MODE_GITHUB ? V = b.gitHub.extension : N == App.MODE_GITLAB ? V = b.gitLab.extension : N == App.MODE_TRELLO ? V = b.trello.extension : N == App.MODE_DROPBOX ? V = b.dropbox.extension : N == App.MODE_ONEDRIVE ? V = b.oneDrive.extension : N == App.MODE_DEVICE && (V = '.drawio');
            0 <= R && (S = S.substring(0, R));
            F.value = S + V;
          }
        }
        x(M);
      });
    }
    var P = document.createElement('a');
    P.style.overflow = 'hidden';
    var O = document.createElement('img');
    O.src = H;
    O.setAttribute('border', '0');
    O.setAttribute('align', 'absmiddle');
    O.style.width = '60px';
    O.style.height = '60px';
    O.style.paddingBottom = '6px';
    P.style.display = 'inline-block';
    P.className = 'geBaseButton';
    P.style.position = 'relative';
    P.style.margin = '4px';
    P.style.padding = '8px 8px 10px 8px';
    P.style.whiteSpace = 'nowrap';
    P.appendChild(O);
    P.style.color = 'gray';
    P.style.fontSize = '11px';
    var W = document.createElement('div');
    P.appendChild(W);
    mxUtils.write(W, K);
    if (null != I && null == b[I]) {
      O.style.visibility = 'hidden';
      mxUtils.setOpacity(W, 10);
      var p = new Spinner({
        lines: 12,
        length: 12,
        width: 5,
        radius: 10,
        rotate: 0,
        color: '#000',
        speed: 1.5,
        trail: 60,
        shadow: !1,
        hwaccel: !1,
        top: '40%',
        zIndex: 2000000000
      });
      p.spin(P);
      var B = window.setTimeout(function() {
        null == b[I] && (p.stop(), P.style.display = 'none');
      }, 30000);
      b.addListener('clientLoaded', mxUtils.bind(this, function() {
        null != b[I] && (window.clearTimeout(B), mxUtils.setOpacity(W, 100), O.style.visibility = '', p.stop(), Q());
      }));
    } else
      Q();
    l.appendChild(P);
    ++q == J && (mxUtils.br(l), q = 0);
  }

  function x(H) {
    var K = F.value;
    if (null == H || null != K && 0 < K.length)
      v && b.hideDialog(), f(K, H, F);
  }
  D = '1' == urlParams.noDevice ? !1 : D;
  t = null != t ? t : !0;
  y = null != y ? y : !0;
  J = null != J ? J : 4;
  v = null != v ? v : !0;
  m = document.createElement('div');
  m.style.whiteSpace = 'nowrap';
  null == c && b.addLanguageMenu(m);
  var C = document.createElement('h2');
  mxUtils.write(C, k || mxResources.get('create'));
  C.style.marginTop = '0px';
  C.style.marginBottom = '24px';
  m.appendChild(C);
  mxUtils.write(m, mxResources.get('filename') + ':');
  var F = document.createElement('input');
  F.setAttribute('value', e);
  F.style.width = '200px';
  F.style.marginLeft = '10px';
  F.style.marginBottom = '20px';
  F.style.maxWidth = '70%';
  this.init = function() {
    F.focus();
    mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? F.select() : document.execCommand('selectAll', !1, null);
  };
  m.appendChild(F);
  null != n && (null != b.editor.diagramFileTypes && (k = FilenameDialog.createFileTypes(b, F, b.editor.diagramFileTypes), k.style.marginLeft = '6px', k.style.width = '90px', m.appendChild(k)), m.appendChild(FilenameDialog.createTypeHint(b, F, n)));
  n = null;
  if ('1' != urlParams.noDevice && null != G && null != d && 'image/' == d.substring(0, 6) && ('image/svg' != d.substring(0, 9) || mxClient.IS_SVG)) {
    F.style.width = '160px';
    k = document.createElement('img');
    var L = g ? G : btoa(unescape(encodeURIComponent(G)));
    k.setAttribute('src', 'data:' + d + ';base64,' + L);
    k.style.position = 'absolute';
    k.style.top = '70px';
    k.style.right = '100px';
    k.style.maxWidth = '120px';
    k.style.maxHeight = '80px';
    mxUtils.setPrefixedStyle(k.style, 'transform', 'translate(50%,-50%)');
    m.appendChild(k);
    mxClient.IS_FF || 'image/png' != d || null == navigator.clipboard || 'function' !== typeof window.ClipboardItem || (n = mxUtils.button(mxResources.get('copy'), function(H) {
      H = b.base64ToBlob(L, 'image/png');
      H = new ClipboardItem({
        'image/png': H,
        'text/html': new Blob(['<img src="data:' + d + ';base64,' + L + '">'], {
          type: 'text/html'
        })
      });
      navigator.clipboard.write([H]).then(mxUtils.bind(this, function() {
        b.alert(mxResources.get('copiedToClipboard'));
      }))['catch'](mxUtils.bind(this, function(K) {
        b.handleError(K);
      }));
    }), n.style.marginTop = '6px', n.className = 'geBtn');
    E && Editor.popupsAllowed && (k.style.cursor = 'pointer', mxEvent.addGestureListeners(k, null, null, function(H) {
      mxEvent.isPopupTrigger(H) || x('_blank');
    }));
  }
  mxUtils.br(m);
  var l = document.createElement('div');
  l.style.textAlign = 'center';
  var q = 0;
  l.style.marginTop = '6px';
  m.appendChild(l);
  var A = document.createElement('select');
  A.style.marginLeft = '10px';
  b.isOfflineApp() || b.isOffline() || ('function' === typeof window.DriveClient && (G = document.createElement('option'), G.setAttribute('value', App.MODE_GOOGLE), mxUtils.write(G, mxResources.get('googleDrive')), A.appendChild(G), u(IMAGE_PATH + '/google-drive-logo.svg', mxResources.get('googleDrive'), App.MODE_GOOGLE, 'drive')), 'function' === typeof window.OneDriveClient && (G = document.createElement('option'), G.setAttribute('value', App.MODE_ONEDRIVE), mxUtils.write(G, mxResources.get('oneDrive')), A.appendChild(G), b.mode == App.MODE_ONEDRIVE && G.setAttribute('selected', 'selected'), u(IMAGE_PATH + '/onedrive-logo.svg', mxResources.get('oneDrive'), App.MODE_ONEDRIVE, 'oneDrive')), 'function' === typeof window.DropboxClient && (G = document.createElement('option'), G.setAttribute('value', App.MODE_DROPBOX), mxUtils.write(G, mxResources.get('dropbox')), A.appendChild(G), b.mode == App.MODE_DROPBOX && G.setAttribute('selected', 'selected'), u(IMAGE_PATH + '/dropbox-logo.svg', mxResources.get('dropbox'), App.MODE_DROPBOX, 'dropbox')), null != b.gitHub && (G = document.createElement('option'), G.setAttribute('value', App.MODE_GITHUB), mxUtils.write(G, mxResources.get('github')), A.appendChild(G), u(IMAGE_PATH + '/github-logo.svg', mxResources.get('github'), App.MODE_GITHUB, 'gitHub')), null != b.gitLab && (G = document.createElement('option'), G.setAttribute('value', App.MODE_GITLAB), mxUtils.write(G, mxResources.get('gitlab')), A.appendChild(G), u(IMAGE_PATH + '/gitlab-logo.svg', mxResources.get('gitlab'), App.MODE_GITLAB, 'gitLab')), 'function' === typeof window.TrelloClient && (G = document.createElement('option'), G.setAttribute('value', App.MODE_TRELLO), mxUtils.write(G, mxResources.get('trello')), A.appendChild(G), u(IMAGE_PATH + '/trello-logo.svg', mxResources.get('trello'), App.MODE_TRELLO, 'trello')));
  if (!Editor.useLocalStorage || 'device' == urlParams.storage || null != b.getCurrentFile() && '1' != urlParams.noDevice)
    G = document.createElement('option'), G.setAttribute('value', App.MODE_DEVICE), mxUtils.write(G, mxResources.get('device')), A.appendChild(G), b.mode != App.MODE_DEVICE && y || G.setAttribute('selected', 'selected'), D && u(IMAGE_PATH + '/osa_drive-harddisk.png', mxResources.get('device'), App.MODE_DEVICE);
  y && isLocalStorage && '0' != urlParams.browser && (y = document.createElement('option'), y.setAttribute('value', App.MODE_BROWSER), mxUtils.write(y, mxResources.get('browser')), A.appendChild(y), b.mode == App.MODE_BROWSER && y.setAttribute('selected', 'selected'), u(IMAGE_PATH + '/osa_database.png', mxResources.get('browser'), App.MODE_BROWSER));
  y = document.createElement('div');
  y.style.marginTop = '26px';
  y.style.textAlign = 'center';
  null != z && (D = mxUtils.button(mxResources.get('help'), function() {
    b.openLink(z);
  }), D.className = 'geBtn', y.appendChild(D));
  D = mxUtils.button(mxResources.get(null != c ? 'close' : 'cancel'), function() {
    null != c ? c() : (b.fileLoaded(null), b.hideDialog(), window.close(), window.location.href = b.getUrl());
  });
  D.className = 'geBtn';
  b.editor.cancelFirst && null == c && y.appendChild(D);
  null == c && (G = mxUtils.button(mxResources.get('decideLater'), function() {
    x(null);
  }), G.className = 'geBtn', y.appendChild(G));
  E && Editor.popupsAllowed && (E = mxUtils.button(mxResources.get('openInNewWindow'), function() {
    x('_blank');
  }), E.className = 'geBtn', y.appendChild(E));
  CreateDialog.showDownloadButton && (E = mxUtils.button(mxResources.get('download'), function() {
    x('download');
  }), E.className = 'geBtn', y.appendChild(E), null != n && (E.style.marginTop = '6px', y.style.marginTop = '6px'));
  null != n && (mxUtils.br(y), y.appendChild(n));
  b.editor.cancelFirst && null == c || y.appendChild(D);
  mxEvent.addListener(F, 'keypress', function(H) {
    13 == H.keyCode ? x(App.MODE_DEVICE) : 27 == H.keyCode && (b.fileLoaded(null), b.hideDialog(), window.close());
  });
  m.appendChild(y);
  this.container = m;
};
CreateDialog.showDownloadButton = '1' != urlParams.noDevice;