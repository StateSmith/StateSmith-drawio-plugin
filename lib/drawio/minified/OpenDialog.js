var OpenDialog = function() {
  var a = document.createElement('iframe');
  a.style.backgroundColor = 'transparent';
  a.allowTransparency = 'true';
  a.style.borderStyle = 'none';
  a.style.borderWidth = '0px';
  a.style.overflow = 'hidden';
  a.style.maxWidth = '100%';
  a.frameBorder = '0';
  a.setAttribute('width', (Editor.useLocalStorage ? 640 : 320) + 'px');
  a.setAttribute('height', (Editor.useLocalStorage ? 480 : 220) + 'px');
  a.setAttribute('src', OPEN_FORM);
  this.container = a;
};