var AboutDialog = function(a) {
  var b = document.createElement('div');
  b.setAttribute('align', 'center');
  var f = document.createElement('h3');
  mxUtils.write(f, mxResources.get('about') + ' GraphEditor');
  b.appendChild(f);
  f = document.createElement('img');
  f.style.border = '0px';
  f.setAttribute('width', '176');
  f.setAttribute('width', '151');
  f.setAttribute('src', IMAGE_PATH + '/logo.png');
  b.appendChild(f);
  mxUtils.br(b);
  mxUtils.write(b, 'Powered by mxGraph ' + mxClient.VERSION);
  mxUtils.br(b);
  f = document.createElement('a');
  f.setAttribute('href', 'http://www.jgraph.com/');
  f.setAttribute('target', '_blank');
  mxUtils.write(f, 'www.jgraph.com');
  b.appendChild(f);
  mxUtils.br(b);
  mxUtils.br(b);
  f = mxUtils.button(mxResources.get('close'), function() {
    a.hideDialog();
  });
  f.className = 'geBtn gePrimaryBtn';
  b.appendChild(f);
  this.container = b;
};