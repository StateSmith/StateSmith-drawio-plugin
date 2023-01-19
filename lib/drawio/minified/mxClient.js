var mxClient = {
  VERSION: '20.7.4',
  IS_IE: null != navigator.userAgent && 0 <= navigator.userAgent.indexOf('MSIE'),
  IS_IE11: null != navigator.userAgent && !!navigator.userAgent.match(/Trident\/7\./),
  IS_EDGE: null != navigator.userAgent && !!navigator.userAgent.match(/Edge\//),
  IS_EM: 'spellcheck' in document.createElement('textarea') && 8 == document.documentMode,
  VML_PREFIX: 'v',
  OFFICE_PREFIX: 'o',
  IS_NS: null != navigator.userAgent && 0 <= navigator.userAgent.indexOf('Mozilla/') && 0 > navigator.userAgent.indexOf('MSIE') && 0 > navigator.userAgent.indexOf('Edge/'),
  IS_OP: null != navigator.userAgent && (0 <= navigator.userAgent.indexOf('Opera/') || 0 <= navigator.userAgent.indexOf('OPR/')),
  IS_OT: null != navigator.userAgent && 0 <= navigator.userAgent.indexOf('Presto/') && 0 > navigator.userAgent.indexOf('Presto/2.4.') && 0 > navigator.userAgent.indexOf('Presto/2.3.') && 0 > navigator.userAgent.indexOf('Presto/2.2.') && 0 > navigator.userAgent.indexOf('Presto/2.1.') && 0 > navigator.userAgent.indexOf('Presto/2.0.') && 0 > navigator.userAgent.indexOf('Presto/1.'),
  IS_SF: /Apple Computer, Inc/.test(navigator.vendor),
  IS_ANDROID: 0 <= navigator.appVersion.indexOf('Android'),
  IS_IOS: /iP(hone|od|ad)/.test(navigator.platform) || navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints,
  IS_WEBVIEW: /((iPhone|iPod|iPad).*AppleWebKit(?!.*Version)|; wv)/i.test(navigator.userAgent),
  IS_GC: /Google Inc/.test(navigator.vendor),
  IS_CHROMEAPP: null != window.chrome && null != chrome.app && null != chrome.app.runtime,
  IS_FF: 'undefined' !== typeof InstallTrigger,
  IS_MT: 0 <= navigator.userAgent.indexOf('Firefox/') && 0 > navigator.userAgent.indexOf('Firefox/1.') && 0 > navigator.userAgent.indexOf('Firefox/2.') || 0 <= navigator.userAgent.indexOf('Iceweasel/') && 0 > navigator.userAgent.indexOf('Iceweasel/1.') && 0 > navigator.userAgent.indexOf('Iceweasel/2.') || 0 <= navigator.userAgent.indexOf('SeaMonkey/') && 0 > navigator.userAgent.indexOf('SeaMonkey/1.') || 0 <= navigator.userAgent.indexOf('Iceape/') && 0 > navigator.userAgent.indexOf('Iceape/1.'),
  IS_SVG: 'MICROSOFT INTERNET EXPLORER' != navigator.appName.toUpperCase(),
  NO_FO: !document.createElementNS || '[object SVGForeignObjectElement]' !== document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject').toString() || 0 <= navigator.userAgent.indexOf('Opera/'),
  IS_WIN: 0 < navigator.appVersion.indexOf('Win'),
  IS_MAC: 0 < navigator.appVersion.indexOf('Mac'),
  IS_CHROMEOS: /\bCrOS\b/.test(navigator.appVersion),
  IS_LINUX: /\bLinux\b/.test(navigator.appVersion),
  IS_TOUCH: 'ontouchstart' in document.documentElement,
  IS_POINTER: null != window.PointerEvent && !(0 < navigator.appVersion.indexOf('Mac')),
  IS_LOCAL: 0 > document.location.href.indexOf('http://') && 0 > document.location.href.indexOf('https://'),
  defaultBundles: [],
  isBrowserSupported: function() {
    return mxClient.IS_SVG;
  },
  link: function(a, b, c, d) {
    c = c || document;
    var e = c.createElement('link');
    e.setAttribute('rel', a);
    e.setAttribute('href', b);
    e.setAttribute('charset', 'UTF-8');
    e.setAttribute('type', 'text/css');
    d && e.setAttribute('id', d);
    c.getElementsByTagName('head')[0].appendChild(e);
  },
  loadResources: function(a, b) {
    function c() {
      0 == --d && a();
    }
    for (var d = mxClient.defaultBundles.length, e = 0; e < mxClient.defaultBundles.length; e++)
      mxResources.add(mxClient.defaultBundles[e], b, c);
  },
  include: function(a) {
    document.write('<script src="' + a + '"></script>');
  }
};
'undefined' == typeof mxLoadResources && (mxLoadResources = !0);
'undefined' == typeof mxForceIncludes && (mxForceIncludes = !1);
'undefined' == typeof mxResourceExtension && (mxResourceExtension = '.txt');
'undefined' == typeof mxLoadStylesheets && (mxLoadStylesheets = !0);
'undefined' != typeof mxBasePath && 0 < mxBasePath.length ? ('/' == mxBasePath.substring(mxBasePath.length - 1) && (mxBasePath = mxBasePath.substring(0, mxBasePath.length - 1)), mxClient.basePath = mxBasePath) : mxClient.basePath = '.';
'undefined' != typeof mxImageBasePath && 0 < mxImageBasePath.length ? ('/' == mxImageBasePath.substring(mxImageBasePath.length - 1) && (mxImageBasePath = mxImageBasePath.substring(0, mxImageBasePath.length - 1)), mxClient.imageBasePath = mxImageBasePath) : mxClient.imageBasePath = 'images';
mxClient.language = 'undefined' != typeof mxLanguage && null != mxLanguage ? mxLanguage : mxClient.IS_IE ? navigator.userLanguage : navigator.language;
mxClient.defaultLanguage = 'undefined' != typeof mxDefaultLanguage && null != mxDefaultLanguage ? mxDefaultLanguage : 'en';
mxLoadStylesheets && mxClient.link('stylesheet', 'mxgraph/css/common.css');
'undefined' != typeof mxLanguages && null != mxLanguages && (mxClient.languages = mxLanguages);