var mxUrlConverter = function() {};
mxUrlConverter.prototype.enabled = !0;
mxUrlConverter.prototype.baseUrl = null;
mxUrlConverter.prototype.baseDomain = null;
mxUrlConverter.prototype.updateBaseUrl = function() {
  this.baseDomain = location.protocol + '//' + location.host;
  this.baseUrl = this.baseDomain + location.pathname;
  var a = this.baseUrl.lastIndexOf('/');
  0 < a && (this.baseUrl = this.baseUrl.substring(0, a + 1));
};
mxUrlConverter.prototype.isEnabled = function() {
  return this.enabled;
};
mxUrlConverter.prototype.setEnabled = function(a) {
  this.enabled = a;
};
mxUrlConverter.prototype.getBaseUrl = function() {
  return this.baseUrl;
};
mxUrlConverter.prototype.setBaseUrl = function(a) {
  this.baseUrl = a;
};
mxUrlConverter.prototype.getBaseDomain = function() {
  return this.baseDomain;
};
mxUrlConverter.prototype.setBaseDomain = function(a) {
  this.baseDomain = a;
};
mxUrlConverter.prototype.isRelativeUrl = function(a) {
  return null != a && '//' != a.substring(0, 2) && 'http://' != a.substring(0, 7) && 'https://' != a.substring(0, 8) && 'data:image' != a.substring(0, 10) && 'file://' != a.substring(0, 7);
};
mxUrlConverter.prototype.convert = function(a) {
  this.isEnabled() && this.isRelativeUrl(a) && (null == this.getBaseUrl() && this.updateBaseUrl(), a = '/' == a.charAt(0) ? this.getBaseDomain() + a : this.getBaseUrl() + a);
  return a;
};