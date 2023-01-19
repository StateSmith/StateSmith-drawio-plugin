function mxXmlRequest(a, b, c, d, e, f) {
  this.url = a;
  this.params = b;
  this.method = c || 'POST';
  this.async = null != d ? d : !0;
  this.username = e;
  this.password = f;
}
mxXmlRequest.prototype.url = null;
mxXmlRequest.prototype.params = null;
mxXmlRequest.prototype.method = null;
mxXmlRequest.prototype.async = null;
mxXmlRequest.prototype.binary = !1;
mxXmlRequest.prototype.withCredentials = !1;
mxXmlRequest.prototype.username = null;
mxXmlRequest.prototype.password = null;
mxXmlRequest.prototype.request = null;
mxXmlRequest.prototype.decodeSimulateValues = !1;
mxXmlRequest.prototype.isBinary = function() {
  return this.binary;
};
mxXmlRequest.prototype.setBinary = function(a) {
  this.binary = a;
};
mxXmlRequest.prototype.getText = function() {
  return this.request.responseText;
};
mxXmlRequest.prototype.isReady = function() {
  return 4 == this.request.readyState;
};
mxXmlRequest.prototype.getDocumentElement = function() {
  var a = this.getXml();
  return null != a ? a.documentElement : null;
};
mxXmlRequest.prototype.getXml = function() {
  var a = this.request.responseXML;
  if (9 <= document.documentMode || null == a || null == a.documentElement)
    a = mxUtils.parseXml(this.request.responseText);
  return a;
};
mxXmlRequest.prototype.getStatus = function() {
  return null != this.request ? this.request.status : null;
};
mxXmlRequest.prototype.create = function() {
  if (window.XMLHttpRequest)
    return function() {
      var a = new XMLHttpRequest();
      this.isBinary() && a.overrideMimeType && a.overrideMimeType('text/plain; charset=x-user-defined');
      return a;
    };
  if ('undefined' != typeof ActiveXObject)
    return function() {
      return new ActiveXObject('Microsoft.XMLHTTP');
    };
}();
mxXmlRequest.prototype.send = function(a, b, c, d) {
  this.request = this.create();
  null != this.request && (null != a && (this.request.onreadystatechange = mxUtils.bind(this, function() {
    this.isReady() && (a(this), this.request.onreadystatechange = null);
  })), this.request.open(this.method, this.url, this.async, this.username, this.password), this.setRequestHeaders(this.request, this.params), window.XMLHttpRequest && this.withCredentials && (this.request.withCredentials = 'true'), (null == document.documentMode || 9 < document.documentMode) && window.XMLHttpRequest && null != c && null != d && (this.request.timeout = c, this.request.ontimeout = d), this.request.send(this.params));
};
mxXmlRequest.prototype.setRequestHeaders = function(a, b) {
  null != b && a.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
};
mxXmlRequest.prototype.simulate = function(a, b) {
  a = a || document;
  var c = null;
  a == document && (c = window.onbeforeunload, window.onbeforeunload = null);
  var d = a.createElement('form');
  d.setAttribute('method', this.method);
  d.setAttribute('action', this.url);
  null != b && d.setAttribute('target', b);
  d.style.display = 'none';
  d.style.visibility = 'hidden';
  b = 0 < this.params.indexOf('&') ? this.params.split('&') : this.params.split();
  for (var e = 0; e < b.length; e++) {
    var f = b[e].indexOf('=');
    if (0 < f) {
      var g = b[e].substring(0, f);
      f = b[e].substring(f + 1);
      this.decodeSimulateValues && (f = decodeURIComponent(f));
      var k = a.createElement('textarea');
      k.setAttribute('wrap', 'off');
      k.setAttribute('name', g);
      mxUtils.write(k, f);
      d.appendChild(k);
    }
  }
  a.body.appendChild(d);
  d.submit();
  null != d.parentNode && d.parentNode.removeChild(d);
  null != c && (window.onbeforeunload = c);
};