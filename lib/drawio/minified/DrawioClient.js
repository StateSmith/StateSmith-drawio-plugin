DrawioClient = function(b, e) {
  mxEventSource.call(this);
  this.ui = b;
  this.cookieName = e;
  this.token = this.getPersistentToken();
};
mxUtils.extend(DrawioClient, mxEventSource);
DrawioClient.prototype.token = null;
DrawioClient.prototype.user = null;
DrawioClient.prototype.setUser = function(b) {
  this.user = b;
  this.fireEvent(new mxEventObject('userChanged'));
};
DrawioClient.prototype.getUser = function() {
  return this.user;
};
DrawioClient.prototype.clearPersistentToken = function() {
  if (isLocalStorage)
    localStorage.removeItem('.' + this.cookieName), sessionStorage.removeItem('.' + this.cookieName);
  else if ('undefined' != typeof Storage) {
    var b = new Date();
    b.setYear(b.getFullYear() - 1);
    document.cookie = this.cookieName + '=; expires=' + b.toUTCString();
  }
};
DrawioClient.prototype.getPersistentToken = function(b) {
  var e = null;
  isLocalStorage && (e = localStorage.getItem('.' + this.cookieName), null == e && b && (e = sessionStorage.getItem('.' + this.cookieName)));
  if (null == e && 'undefined' != typeof Storage) {
    var f = document.cookie;
    b = this.cookieName + '=';
    var c = f.indexOf(b);
    0 <= c && (c += b.length, e = f.indexOf(';', c), 0 > e ? e = f.length : postCookie = f.substring(e), e = f.substring(c, e), e = 0 < e.length ? e : null, null != e && isLocalStorage && (f = new Date(), f.setYear(f.getFullYear() - 1), document.cookie = b + '; expires=' + f.toUTCString(), localStorage.setItem('.' + this.cookieName, e)));
  }
  return e;
};
DrawioClient.prototype.setPersistentToken = function(b, e) {
  try {
    if (null != b)
      if (isLocalStorage)
        e ? sessionStorage.setItem('.' + this.cookieName, b) : localStorage.setItem('.' + this.cookieName, b);
      else {
        if ('undefined' != typeof Storage) {
          var f = new Date();
          f.setYear(f.getFullYear() + 10);
          var c = this.cookieName + '=' + b + '; path=/' + (e ? '' : '; expires=' + f.toUTCString());
          'https' == document.location.protocol.toLowerCase() && (c += ';secure');
          document.cookie = c;
        }
      }
    else
      this.clearPersistentToken();
  } catch (k) {
    this.ui.handleError(k);
  }
};