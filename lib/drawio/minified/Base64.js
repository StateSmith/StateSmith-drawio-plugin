var Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function(a, b) {
    var c = '',
      d = 0;
    for (null != b && b || (a = Base64._utf8_encode(a)); d < a.length;) {
      var e = a.charCodeAt(d++);
      b = a.charCodeAt(d++);
      var f = a.charCodeAt(d++);
      var g = e >> 2;
      e = (e & 3) << 4 | b >> 4;
      var k = (b & 15) << 2 | f >> 6;
      var l = f & 63;
      isNaN(b) ? k = l = 64 : isNaN(f) && (l = 64);
      c = c + this._keyStr.charAt(g) + this._keyStr.charAt(e) + this._keyStr.charAt(k) + this._keyStr.charAt(l);
    }
    return c;
  },
  decode: function(a, b) {
    b = null != b ? b : !1;
    var c = '',
      d = 0;
    for (a = a.replace(/[^A-Za-z0-9\+\/=]/g, ''); d < a.length;) {
      var e = this._keyStr.indexOf(a.charAt(d++));
      var f = this._keyStr.indexOf(a.charAt(d++));
      var g = this._keyStr.indexOf(a.charAt(d++));
      var k = this._keyStr.indexOf(a.charAt(d++));
      e = e << 2 | f >> 4;
      f = (f & 15) << 4 | g >> 2;
      var l = (g & 3) << 6 | k;
      c += String.fromCharCode(e);
      64 != g && (c += String.fromCharCode(f));
      64 != k && (c += String.fromCharCode(l));
    }
    b || (c = Base64._utf8_decode(c));
    return c;
  },
  _utf8_encode: function(a) {
    a = a.replace(/\r\n/g, '\n');
    for (var b = '', c = 0; c < a.length; c++) {
      var d = a.charCodeAt(c);
      128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128));
    }
    return b;
  },
  _utf8_decode: function(a) {
    var b = '',
      c = 0;
    for (c1 = c2 = 0; c < a.length;) {
      var d = a.charCodeAt(c);
      128 > d ? (b += String.fromCharCode(d), c++) : 191 < d && 224 > d ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((d & 31) << 6 | c2 & 63), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3);
    }
    return b;
  }
};
window.urlParams = window.urlParams || {};
window.isLocalStorage = window.isLocalStorage || !1;
window.mxLoadSettings = window.mxLoadSettings || '1' != urlParams.configure;
window.isSvgBrowser = !0;
window.DRAWIO_BASE_URL = window.DRAWIO_BASE_URL || (/.*\.draw\.io$/.test(window.location.hostname) || /.*\.diagrams\.net$/.test(window.location.hostname) ? window.location.protocol + '//' + window.location.hostname : 'https://app.diagrams.net');
window.DRAWIO_LIGHTBOX_URL = window.DRAWIO_LIGHTBOX_URL || 'https://viewer.diagrams.net';
window.EXPORT_URL = window.EXPORT_URL || 'https://convert.diagrams.net/node/export';
window.PLANT_URL = window.PLANT_URL || 'https://plant-aws.diagrams.net';
window.DRAW_MATH_URL = window.DRAW_MATH_URL || window.DRAWIO_BASE_URL + '/math/es5';
window.VSD_CONVERT_URL = window.VSD_CONVERT_URL || 'https://convert.diagrams.net/VsdConverter/api/converter';
window.EMF_CONVERT_URL = window.EMF_CONVERT_URL || 'https://convert.diagrams.net/emf2png/convertEMF';
window.REALTIME_URL = window.REALTIME_URL || ('test.draw.io' == window.location.hostname && 'local' != urlParams.cache ? 'https://app.diagrams.net/cache' : 'cache');
window.DRAWIO_GITLAB_URL = window.DRAWIO_GITLAB_URL || 'https://gitlab.com';
window.DRAWIO_GITLAB_ID = window.DRAWIO_GITLAB_ID || '2b14debc5feeb18ba65358d863ec870e4cc9294b28c3c941cb3014eb4af9a9b4';
window.DRAWIO_GITHUB_URL = window.DRAWIO_GITHUB_URL || 'https://github.com';
window.DRAWIO_GITHUB_API_URL = window.DRAWIO_GITHUB_API_URL || 'https://api.github.com';
window.DRAWIO_GITHUB_ID = window.DRAWIO_GITHUB_ID || 'Iv1.98d62f0431e40543';
window.DRAWIO_DROPBOX_ID = window.DRAWIO_DROPBOX_ID || 'jg02tc0onwmhlgm';
window.SAVE_URL = window.SAVE_URL || 'save';
window.OPEN_URL = window.OPEN_URL || 'import';
window.PROXY_URL = window.PROXY_URL || 'proxy';
window.DRAWIO_VIEWER_URL = window.DRAWIO_VIEWER_URL || null;
window.NOTIFICATIONS_URL = window.NOTIFICATIONS_URL || 'https://www.draw.io/notifications';
window.RT_WEBSOCKET_URL = window.RT_WEBSOCKET_URL || 'wss://' + ('test.draw.io' == window.location.hostname ? 'app.diagrams.net' : window.location.hostname) + '/rt';
window.SHAPES_PATH = window.SHAPES_PATH || 'shapes';
window.GRAPH_IMAGE_PATH = window.GRAPH_IMAGE_PATH || 'img';
window.ICONSEARCH_PATH = window.ICONSEARCH_PATH || ((null != navigator.userAgent && 0 <= navigator.userAgent.indexOf('MSIE') || urlParams.dev) && 'file:' != window.location.protocol ? 'iconSearch' : window.DRAWIO_BASE_URL + '/iconSearch');
window.TEMPLATE_PATH = window.TEMPLATE_PATH || 'templates';
window.NEW_DIAGRAM_CATS_PATH = window.NEW_DIAGRAM_CATS_PATH || 'newDiagramCats';
window.PLUGINS_BASE_PATH = window.PLUGINS_BASE_PATH || '';
window.ALLOW_CUSTOM_PLUGINS = window.ALLOW_CUSTOM_PLUGINS || !1;
window.RESOURCES_PATH = window.RESOURCES_PATH || 'resources';
window.RESOURCE_BASE = window.RESOURCE_BASE || RESOURCES_PATH + '/dia';
window.DRAWIO_CONFIG = window.DRAWIO_CONFIG || null;
window.mxLoadResources = window.mxLoadResources || !1;
window.mxLanguage = window.mxLanguage || function() {
  var a = urlParams.lang;
  if (null == a && 'undefined' != typeof JSON && isLocalStorage)
    try {
      var b = localStorage.getItem('.drawio-config');
      null != b && (a = JSON.parse(b).language || null);
      if (!a && window.mxIsElectron && (a = urlParams.appLang, null != a)) {
        var c = a.indexOf('-');
        0 <= c && (a = a.substring(0, c));
        a = a.toLowerCase();
      }
    } catch (d) {
      isLocalStorage = !1;
    }
  return a;
}();
window.mxLanguageMap = window.mxLanguageMap || {
  i18n: '',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  bs: 'Bosanski',
  bg: 'Bulgarian',
  ca: 'Català',
  cs: 'Čeština',
  da: 'Dansk',
  de: 'Deutsch',
  et: 'Eesti',
  en: 'English',
  es: 'Español',
  eu: 'Euskara',
  fil: 'Filipino',
  fr: 'Français',
  gl: 'Galego',
  it: 'Italiano',
  hu: 'Magyar',
  lt: 'Lietuvių',
  lv: 'Latviešu',
  nl: 'Nederlands',
  no: 'Norsk',
  pl: 'Polski',
  'pt-br': 'Português (Brasil)',
  pt: 'Português (Portugal)',
  ro: 'Română',
  fi: 'Suomi',
  sv: 'Svenska',
  vi: 'Tiếng Việt',
  tr: 'Türkçe',
  el: 'Ελληνικά',
  ru: 'Русский',
  sr: 'Српски',
  uk: 'Українська',
  he: 'עברית',
  ar: 'العربية',
  fa: 'فارسی',
  th: 'ไทย',
  ko: '한국어',
  ja: '日本語',
  zh: '简体中文',
  'zh-tw': '繁體中文'
};
'undefined' === typeof window.mxBasePath && (window.mxBasePath = 'mxgraph', window.mxImageBasePath = 'mxgraph/images');
if (null == window.mxLanguages) {
  window.mxLanguages = [];
  for (var lang in mxLanguageMap)
    'en' != lang && window.mxLanguages.push(lang);
  if (null == window.mxLanguage && ('test.draw.io' == window.location.hostname || 'www.draw.io' == window.location.hostname || 'viewer.diagrams.net' == window.location.hostname || 'embed.diagrams.net' == window.location.hostname || 'app.diagrams.net' == window.location.hostname || 'jgraph.github.io' == window.location.hostname) && (lang = navigator.language, null != lang)) {
    var dash = lang.indexOf('-');
    0 < dash && (lang = lang.substring(0, dash));
    0 <= window.mxLanguages.indexOf(lang) && (window.mxLanguage = lang);
  }
}
'1' == urlParams.extAuth && /((iPhone|iPod|iPad).*AppleWebKit(?!.*Version)|; wv)/i.test(navigator.userAgent) && (urlParams.gapi = '0', urlParams.noDevice = '1', '1' != urlParams.lightbox && (urlParams.lightbox = '1', urlParams.layers = '1', urlParams.viewerOnlyMsg = '1'));
window.location.hostname == DRAWIO_LIGHTBOX_URL.substring(DRAWIO_LIGHTBOX_URL.indexOf('//') + 2) && (urlParams.lightbox = '1');
'1' == urlParams.lightbox && (urlParams.chrome = '0');
'1' == urlParams.embedInline && (urlParams.embed = '1', urlParams.ui = 'sketch', urlParams.plugins = '0', urlParams.proto = 'json', urlParams.prefetchFonts = '1');