function setCurrentXml(a, b) {
  null != window.parent && null != window.parent.openFile && window.parent.openFile.setData(a, b);
}
window.uiTheme = window.uiTheme || function() {
  var a = urlParams.ui;
  '1' == urlParams.extAuth && (a = 'sketch');
  if (null == a && isLocalStorage && 'undefined' !== typeof JSON && '1' != urlParams.lightbox)
    try {
      var b = localStorage.getItem('.drawio-config');
      null != b && (a = JSON.parse(b).ui || null);
    } catch (c) {
      isLocalStorage = !1;
    }
  try {
    null != a || '1' == urlParams.embed || 'test.draw.io' != window.location.hostname && 'www.draw.io' != window.location.hostname && 'stage.diagrams.net' != window.location.hostname && 'app.diagrams.net' != window.location.hostname && 'jgraph.github.io' != window.location.hostname || 800 >= (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) && (a = 'simple');
  } catch (c) {}
  'sketch' == a ? urlParams.sketch = '1' : '1' != urlParams.dark || '' != a && 'kennedy' != a || (a = 'dark');
  return a;
}();
(function() {
  if ('undefined' !== typeof JSON && isLocalStorage)
    try {
      var a = localStorage.getItem('1' == urlParams.sketch ? '.sketch-config' : '.drawio-config'),
        b = !0;
      null != a && (b = JSON.parse(a).showStartScreen);
      0 == b && (urlParams.splash = '0');
    } catch (d) {}
  a = urlParams['export'];
  null != a && (a = decodeURIComponent(a), 'http://' != a.substring(0, 7) && 'https://' != a.substring(0, 8) && (a = 'http://' + a), EXPORT_URL = a);
  a = urlParams.gitlab;
  null != a && (a = decodeURIComponent(a), 'http://' != a.substring(0, 7) && 'https://' != a.substring(0, 8) && (a = 'http://' + a), DRAWIO_GITLAB_URL = a);
  a = urlParams['gitlab-id'];
  null != a && (DRAWIO_GITLAB_ID = a);
  window.DRAWIO_LOG_URL = window.DRAWIO_LOG_URL || '';
  a = window.location.host;
  if ('test.draw.io' != a) {
    var c = 'diagrams.net';
    b = a.length - c.length;
    c = a.lastIndexOf(c, b); -
    1 !== c && c === b ? window.DRAWIO_LOG_URL = 'https://log.diagrams.net' : (c = 'draw.io', b = a.length - c.length, c = a.lastIndexOf(c, b), -1 !== c && c === b && (window.DRAWIO_LOG_URL = 'https://log.draw.io'));
  }
}());
if ('1' == urlParams.offline || '1' == urlParams.demo || '1' == urlParams.stealth || '1' == urlParams.local || '1' == urlParams.lockdown)
  urlParams.picker = '0', urlParams.gapi = '0', urlParams.db = '0', urlParams.od = '0', urlParams.gh = '0', urlParams.gl = '0', urlParams.tr = '0';
'se.diagrams.net' == window.location.hostname && (urlParams.db = '0', urlParams.od = '0', urlParams.gh = '0', urlParams.gl = '0', urlParams.tr = '0', urlParams.plugins = '0', urlParams.mode = 'google', urlParams.lockdown = '1', window.DRAWIO_GOOGLE_APP_ID = window.DRAWIO_GOOGLE_APP_ID || '184079235871', window.DRAWIO_GOOGLE_CLIENT_ID = window.DRAWIO_GOOGLE_CLIENT_ID || '184079235871-pjf5nn0lff27lk8qf0770gmffiv9gt61.apps.googleusercontent.com');
'trello' == urlParams.mode && (urlParams.tr = '1');
'embed.diagrams.net' == window.location.hostname && (urlParams.embed = '1');
(null == window.location.hash || 1 >= window.location.hash.length) && null != urlParams.open && (window.location.hash = urlParams.open);
window.urlParams = window.urlParams || {};
window.DOM_PURIFY_CONFIG = window.DOM_PURIFY_CONFIG || {
  ADD_TAGS: ['use'],
  FORBID_TAGS: ['form'],
  ALLOWED_URI_REGEXP: /^((?!javascript:).)*$/i,
  ADD_ATTR: [
    'target',
    'content'
  ]
};
window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE || 10485760;
window.MAX_AREA = window.MAX_AREA || 225000000;
window.EXPORT_URL = window.EXPORT_URL || '/export';
window.SAVE_URL = window.SAVE_URL || '/save';
window.OPEN_URL = window.OPEN_URL || '/open';
window.RESOURCES_PATH = window.RESOURCES_PATH || 'resources';
window.RESOURCE_BASE = window.RESOURCE_BASE || window.RESOURCES_PATH + '/grapheditor';
window.STENCIL_PATH = window.STENCIL_PATH || 'stencils';
window.IMAGE_PATH = window.IMAGE_PATH || 'images';
window.STYLE_PATH = window.STYLE_PATH || 'styles';
window.CSS_PATH = window.CSS_PATH || 'styles';
window.OPEN_FORM = window.OPEN_FORM || 'open.html';
window.mxBasePath = window.mxBasePath || 'mxgraph';
window.mxImageBasePath = window.mxImageBasePath || 'mxgraph/images';
window.mxLanguage = window.mxLanguage || urlParams.lang;
window.mxLanguages = window.mxLanguages || [
  'de',
  'se'
];