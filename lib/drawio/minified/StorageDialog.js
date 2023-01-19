var StorageDialog = function(b, e, f) {
  function c(J, G, d, g, n, v) {
    function u() {
      mxEvent.addListener(x, 'click', null != v ? v : function() {
        d != App.MODE_GOOGLE || b.isDriveDomain() ? d == App.MODE_GOOGLE && b.spinner.spin(document.body, mxResources.get('authorizing')) ? b.drive.checkToken(mxUtils.bind(this, function() {
          b.spinner.stop();
          b.setMode(d, !0);
          e();
        })) : d == App.MODE_ONEDRIVE && b.spinner.spin(document.body, mxResources.get('authorizing')) ? b.oneDrive.checkToken(mxUtils.bind(this, function() {
          b.spinner.stop();
          b.setMode(d, !0);
          e();
        }), function(q) {
          b.spinner.stop();
          b.handleError(q);
        }) : (b.setMode(d, !0), e()) : window.location.hostname = DriveClient.prototype.newAppHostname;
      });
    }
    y++;
    ++t > f && (mxUtils.br(E), t = 1);
    var x = document.createElement('a');
    x.style.overflow = 'hidden';
    x.style.display = 'inline-block';
    x.className = 'geBaseButton';
    x.style.boxSizing = 'border-box';
    x.style.fontSize = '11px';
    x.style.position = 'relative';
    x.style.margin = '4px';
    x.style.marginTop = '8px';
    x.style.marginBottom = '0px';
    x.style.padding = '8px 10px 8px 10px';
    x.style.width = '88px';
    x.style.height = '100px';
    x.style.whiteSpace = 'nowrap';
    x.setAttribute('title', G);
    var C = document.createElement('div');
    C.style.textOverflow = 'ellipsis';
    C.style.overflow = 'hidden';
    C.style.position = 'absolute';
    C.style.bottom = '8px';
    C.style.left = '0px';
    C.style.right = '0px';
    mxUtils.write(C, G);
    x.appendChild(C);
    if (null != J) {
      var F = document.createElement('img');
      F.setAttribute('src', J);
      F.setAttribute('border', '0');
      F.setAttribute('align', 'absmiddle');
      F.style.width = '60px';
      F.style.height = '60px';
      F.style.paddingBottom = '6px';
      x.appendChild(F);
    } else
      C.style.paddingTop = '5px', C.style.whiteSpace = 'normal', mxClient.IS_IOS ? (x.style.padding = '0px 10px 20px 10px', x.style.top = '6px') : mxClient.IS_FF && (C.style.paddingTop = '0px', C.style.marginTop = '-2px');
    if (null != n)
      for (J = 0; J < n.length; J++)
        mxUtils.br(C), mxUtils.write(C, n[J]);
    if (null != g && null == b[g]) {
      F.style.visibility = 'hidden';
      mxUtils.setOpacity(C, 10);
      var L = new Spinner({
        lines: 12,
        length: 12,
        width: 5,
        radius: 10,
        rotate: 0,
        color: Editor.isDarkMode() ? '#c0c0c0' : '#000',
        speed: 1.5,
        trail: 60,
        shadow: !1,
        hwaccel: !1,
        top: '40%',
        zIndex: 2000000000
      });
      L.spin(x);
      var l = window.setTimeout(function() {
        null == b[g] && (L.stop(), x.style.display = 'none');
      }, 30000);
      b.addListener('clientLoaded', mxUtils.bind(this, function(q, A) {
        null != b[g] && A.getProperty('client') == b[g] && (window.clearTimeout(l), mxUtils.setOpacity(C, 100), F.style.visibility = '', L.stop(), u(), 'drive' == g && null != z.parentNode && z.parentNode.removeChild(z));
      }));
    } else
      u();
    E.appendChild(x);
  }
  f = null != f ? f : 2;
  var k = document.createElement('div');
  k.style.textAlign = 'center';
  k.style.whiteSpace = 'nowrap';
  k.style.paddingTop = '0px';
  k.style.paddingBottom = '20px';
  var m = document.createElement('div');
  m.style.border = '1px solid #d3d3d3';
  m.style.borderWidth = '1px 0px 1px 0px';
  m.style.padding = '10px 0px 20px 0px';
  var t = 0,
    y = 0,
    E = document.createElement('div');
  E.style.paddingTop = '2px';
  m.appendChild(E);
  var z = document.createElement('p'),
    D = document.createElement('p');
  D.style.cssText = 'font-size:22px;padding:4px 0 16px 0;margin:0;color:gray;';
  mxUtils.write(D, mxResources.get('saveDiagramsTo') + ':');
  k.appendChild(D);
  k.appendChild(m);
  t = 0;
  'function' === typeof window.DriveClient && c(IMAGE_PATH + '/google-drive-logo.svg', mxResources.get('googleDrive'), App.MODE_GOOGLE, 'drive');
  'function' === typeof window.OneDriveClient && c(IMAGE_PATH + '/onedrive-logo.svg', mxResources.get('oneDrive'), App.MODE_ONEDRIVE, 'oneDrive');
  '1' != urlParams.noDevice && c(IMAGE_PATH + '/osa_drive-harddisk.png', mxResources.get('device'), App.MODE_DEVICE);
  !isLocalStorage || '1' != urlParams.browser && '1' != urlParams.offline || c(IMAGE_PATH + '/osa_database.png', mxResources.get('browser'), App.MODE_BROWSER);
  'function' === typeof window.DropboxClient && c(IMAGE_PATH + '/dropbox-logo.svg', mxResources.get('dropbox'), App.MODE_DROPBOX, 'dropbox');
  null != b.gitHub && c(IMAGE_PATH + '/github-logo.svg', mxResources.get('github'), App.MODE_GITHUB, 'gitHub');
  null != b.gitLab && c(IMAGE_PATH + '/gitlab-logo.svg', mxResources.get('gitlab'), App.MODE_GITLAB, 'gitLab');
  m = document.createElement('span');
  m.style.position = 'absolute';
  m.style.cursor = 'pointer';
  m.style.bottom = '27px';
  m.style.color = 'gray';
  m.style.userSelect = 'none';
  m.style.textAlign = 'center';
  m.style.left = '50%';
  mxUtils.setPrefixedStyle(m.style, 'transform', 'translate(-50%,0)');
  mxUtils.write(m, mxResources.get('decideLater'));
  k.appendChild(m);
  mxEvent.addListener(m, 'click', function() {
    b.hideDialog();
    var J = Editor.useLocalStorage;
    b.createFile(b.defaultFilename, null, null, null, null, null, null, !0);
    Editor.useLocalStorage = J;
  });
  mxClient.IS_SVG && isLocalStorage && '0' != urlParams.gapi && (null == document.documentMode || 10 <= document.documentMode) && window.setTimeout(function() {
    null == b.drive && (z.style.padding = '7px', z.style.fontSize = '9pt', z.style.marginTop = '-14px', z.innerHTML = '<a style="background-color:#dcdcdc;padding:6px;color:black;text-decoration:none;" href="https://desk.draw.io/a/solutions/articles/16000074659" target="_blank"><img border="0" src="' + mxGraph.prototype.warningImage.src + '" align="absmiddle" style="margin-top:-4px"> ' + mxResources.get('googleDriveMissingClickHere') + '</a>', k.appendChild(z));
  }, 5000);
  this.container = k;
};