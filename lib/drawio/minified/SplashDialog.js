var SplashDialog = function(b) {
  var e = document.createElement('div');
  e.style.textAlign = 'center';
  if (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp) {
    var f = b.addLanguageMenu(e, !1, '28px');
    null != f && (f.style.bottom = '24px');
  }
  var c = document.createElement('img');
  c.setAttribute('border', '0');
  c.setAttribute('align', 'absmiddle');
  c.style.width = '32px';
  c.style.height = '32px';
  c.style.marginRight = '8px';
  c.style.marginTop = '-4px';
  var k = document.createElement('div');
  k.style.margin = '8px 0px 0px 0px';
  k.style.padding = '18px 0px 24px 0px';
  f = '';
  b.mode == App.MODE_GOOGLE ? (c.src = IMAGE_PATH + '/google-drive-logo.svg', f = mxResources.get('googleDrive')) : b.mode == App.MODE_DROPBOX ? (c.src = IMAGE_PATH + '/dropbox-logo.svg', f = mxResources.get('dropbox')) : b.mode == App.MODE_ONEDRIVE ? (c.src = IMAGE_PATH + '/onedrive-logo.svg', f = mxResources.get('oneDrive')) : b.mode == App.MODE_GITHUB ? (c.src = IMAGE_PATH + '/github-logo.svg', f = mxResources.get('github')) : b.mode == App.MODE_GITLAB ? (c.src = IMAGE_PATH + '/gitlab-logo.svg', f = mxResources.get('gitlab')) : b.mode == App.MODE_BROWSER ? (c.src = IMAGE_PATH + '/osa_database.png', f = mxResources.get('browser')) : b.mode == App.MODE_TRELLO ? (c.src = IMAGE_PATH + '/trello-logo.svg', f = mxResources.get('trello')) : (c.src = IMAGE_PATH + '/osa_drive-harddisk.png', k.style.paddingBottom = '10px', k.style.paddingTop = '30px', f = mxResources.get('device'));
  var m = document.createElement('button');
  m.className = 'geBigButton';
  m.style.marginBottom = '8px';
  m.style.fontSize = '18px';
  m.style.padding = '10px';
  m.style.width = '340px';
  if (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
    k.style.padding = '42px 0px 10px 0px', m.style.marginBottom = '12px';
  else {
    k.style.border = '1px solid #d3d3d3';
    k.style.borderWidth = '1px 0px 1px 0px';
    var t = document.createElement('table'),
      y = document.createElement('tbody'),
      E = document.createElement('tr'),
      z = document.createElement('td'),
      D = document.createElement('td');
    t.setAttribute('align', 'center');
    z.appendChild(c);
    c = document.createElement('div');
    c.style.fontSize = '22px';
    c.style.paddingBottom = '6px';
    c.style.color = 'gray';
    mxUtils.write(c, f);
    D.style.textAlign = 'left';
    D.appendChild(c);
    E.appendChild(z);
    E.appendChild(D);
    y.appendChild(E);
    t.appendChild(y);
    e.appendChild(t);
    f = document.createElement('span');
    f.style.cssText = 'position:absolute;cursor:pointer;bottom:27px;color:gray;userSelect:none;text-align:center;left:50%;';
    mxUtils.setPrefixedStyle(f.style, 'transform', 'translate(-50%,0)');
    mxUtils.write(f, mxResources.get('changeStorage'));
    mxEvent.addListener(f, 'click', function() {
      b.hideDialog(!1);
      b.setMode(null);
      b.clearMode();
      b.showSplash(!0);
    });
    e.appendChild(f);
  }
  mxUtils.write(m, mxResources.get('createNewDiagram'));
  mxEvent.addListener(m, 'click', function() {
    b.hideDialog();
    b.actions.get('new').funct();
  });
  k.appendChild(m);
  mxUtils.br(k);
  m = document.createElement('button');
  m.className = 'geBigButton';
  m.style.marginBottom = '22px';
  m.style.fontSize = '18px';
  m.style.padding = '10px';
  m.style.width = '340px';
  mxUtils.write(m, mxResources.get('openExistingDiagram'));
  mxEvent.addListener(m, 'click', function() {
    b.actions.get('open').funct();
  });
  k.appendChild(m);
  b.mode == App.MODE_GOOGLE ? mxResources.get('googleDrive') : b.mode == App.MODE_DROPBOX ? mxResources.get('dropbox') : b.mode == App.MODE_ONEDRIVE ? mxResources.get('oneDrive') : b.mode == App.MODE_GITHUB ? mxResources.get('github') : b.mode == App.MODE_GITLAB ? mxResources.get('gitlab') : b.mode == App.MODE_TRELLO ? mxResources.get('trello') : b.mode == App.MODE_DEVICE ? mxResources.get('device') : b.mode == App.MODE_BROWSER && mxResources.get('browser');
  if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp)
    if (f = function(d) {
        m.style.marginBottom = '24px';
        var g = document.createElement('a');
        g.style.display = 'inline-block';
        g.style.color = 'gray';
        g.style.cursor = 'pointer';
        g.style.marginTop = '6px';
        mxUtils.write(g, mxResources.get('signOut'));
        m.style.marginBottom = '16px';
        k.style.paddingBottom = '18px';
        mxEvent.addListener(g, 'click', function() {
          b.confirm(mxResources.get('areYouSure'), function() {
            d();
          });
        });
        k.appendChild(g);
      }, b.mode == App.MODE_GOOGLE && null != b.drive) {
      var J = b.drive.getUsersList();
      if (0 < J.length) {
        c = document.createElement('span');
        c.style.marginTop = '6px';
        mxUtils.write(c, mxResources.get('changeUser') + ':');
        m.style.marginBottom = '16px';
        k.style.paddingBottom = '18px';
        k.appendChild(c);
        var G = document.createElement('select');
        G.style.marginLeft = '4px';
        G.style.width = '140px';
        for (f = 0; f < J.length; f++)
          t = document.createElement('option'), mxUtils.write(t, J[f].displayName), t.value = f, G.appendChild(t), t = document.createElement('option'), t.innerHTML = '&nbsp;&nbsp;&nbsp;', mxUtils.write(t, '<' + J[f].email + '>'), t.setAttribute('disabled', 'disabled'), G.appendChild(t);
        t = document.createElement('option');
        mxUtils.write(t, mxResources.get('addAccount'));
        t.value = J.length;
        G.appendChild(t);
        mxEvent.addListener(G, 'change', function() {
          var d = G.value,
            g = J.length != d;
          g && b.drive.setUser(J[d]);
          b.drive.authorize(g, function() {
            b.setMode(App.MODE_GOOGLE);
            b.hideDialog();
            b.showSplash();
          }, function(n) {
            b.handleError(n, null, function() {
              b.hideDialog();
              b.showSplash();
            });
          }, !0);
        });
        k.appendChild(G);
      } else
        f(function() {
          b.drive.logout();
        });
    } else
      b.mode != App.MODE_ONEDRIVE || null == b.oneDrive || b.oneDrive.noLogout ? b.mode == App.MODE_GITHUB && null != b.gitHub ? f(function() {
        b.gitHub.logout();
        b.openLink('https://www.github.com/logout');
      }) : b.mode == App.MODE_GITLAB && null != b.gitLab ? f(function() {
        b.gitLab.logout();
        b.openLink(DRAWIO_GITLAB_URL + '/users/sign_out');
      }) : b.mode == App.MODE_TRELLO && null != b.trello ? b.trello.isAuthorized() && f(function() {
        b.trello.logout();
      }) : b.mode == App.MODE_DROPBOX && null != b.dropbox && f(function() {
        b.dropbox.logout();
        b.openLink('https://www.dropbox.com/logout');
      }) : f(function() {
        b.oneDrive.logout();
      });
  e.appendChild(k);
  this.container = e;
};