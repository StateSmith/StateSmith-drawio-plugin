var BtnDialog = function(b, e, f, c) {
  var k = document.createElement('div');
  k.style.textAlign = 'center';
  var m = document.createElement('p');
  m.style.fontSize = '16pt';
  m.style.padding = '0px';
  m.style.margin = '0px';
  m.style.color = 'gray';
  mxUtils.write(m, mxResources.get('done'));
  var t = 'Unknown',
    y = document.createElement('img');
  y.setAttribute('border', '0');
  y.setAttribute('align', 'absmiddle');
  y.style.marginRight = '10px';
  e == b.drive ? (t = mxResources.get('googleDrive'), y.src = IMAGE_PATH + '/google-drive-logo-white.svg') : e == b.dropbox ? (t = mxResources.get('dropbox'), y.src = IMAGE_PATH + '/dropbox-logo-white.svg') : e == b.oneDrive ? (t = mxResources.get('oneDrive'), y.src = IMAGE_PATH + '/onedrive-logo-white.svg') : e == b.gitHub ? (t = mxResources.get('github'), y.src = IMAGE_PATH + '/github-logo-white.svg') : e == b.gitLab ? (t = mxResources.get('gitlab'), y.src = IMAGE_PATH + '/gitlab-logo.svg') : e == b.trello && (t = mxResources.get('trello'), y.src = IMAGE_PATH + '/trello-logo-white.svg');
  b = document.createElement('p');
  mxUtils.write(b, mxResources.get('authorizedIn', [t], 'You are now authorized in {1}'));
  f = mxUtils.button(f, c);
  f.insertBefore(y, f.firstChild);
  f.style.marginTop = '6px';
  f.className = 'geBigButton';
  f.style.fontSize = '18px';
  f.style.padding = '14px';
  k.appendChild(m);
  k.appendChild(b);
  k.appendChild(f);
  this.container = k;
};