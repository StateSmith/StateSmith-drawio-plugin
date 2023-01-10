var AuthDialog = function(b, e, f, c) {
  var k = document.createElement('div');
  k.style.textAlign = 'center';
  var m = document.createElement('p');
  m.style.fontSize = '16pt';
  m.style.padding = '0px';
  m.style.margin = '0px';
  m.style.color = 'gray';
  mxUtils.write(m, mxResources.get('authorizationRequired'));
  var t = 'Unknown',
    y = document.createElement('img');
  y.setAttribute('border', '0');
  y.setAttribute('align', 'absmiddle');
  y.style.marginRight = '10px';
  e == b.drive ? (t = mxResources.get('googleDrive'), y.src = IMAGE_PATH + '/google-drive-logo-white.svg') : e == b.dropbox ? (t = mxResources.get('dropbox'), y.src = IMAGE_PATH + '/dropbox-logo-white.svg') : e == b.oneDrive ? (t = mxResources.get('oneDrive'), y.src = IMAGE_PATH + '/onedrive-logo-white.svg') : e == b.gitHub ? (t = mxResources.get('github'), y.src = IMAGE_PATH + '/github-logo-white.svg') : e == b.gitLab ? (t = mxResources.get('gitlab'), y.src = IMAGE_PATH + '/gitlab-logo.svg', y.style.width = '32px') : e == b.trello && (t = mxResources.get('trello'), y.src = IMAGE_PATH + '/trello-logo-white.svg');
  b = document.createElement('p');
  mxUtils.write(b, mxResources.get('authorizeThisAppIn', [t]));
  var E = document.createElement('input');
  E.setAttribute('type', 'checkbox');
  t = mxUtils.button(mxResources.get('authorize'), function() {
    c(E.checked);
  });
  t.insertBefore(y, t.firstChild);
  t.style.marginTop = '6px';
  t.className = 'geBigButton';
  t.style.fontSize = '18px';
  t.style.padding = '14px';
  k.appendChild(m);
  k.appendChild(b);
  k.appendChild(t);
  f && (f = document.createElement('p'), f.style.marginTop = '20px', f.appendChild(E), m = document.createElement('span'), mxUtils.write(m, ' ' + mxResources.get('rememberMe')), f.appendChild(m), k.appendChild(f), E.checked = !0, E.defaultChecked = !0, mxEvent.addListener(m, 'click', function(z) {
    E.checked = !E.checked;
    mxEvent.consume(z);
  }));
  this.container = k;
};