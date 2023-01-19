var mxSettings = {
  currentVersion: 18,
  defaultFormatWidth: 600 > screen.width ? '0' : '240',
  key: Editor.settingsKey,
  getLanguage: function() {
    return mxSettings.settings.language;
  },
  setLanguage: function(b) {
    mxSettings.settings.language = b;
  },
  isMainSettings: function() {
    return '.drawio-config' == mxSettings.key;
  },
  getMainSettings: function() {
    var b = localStorage.getItem('.drawio-config');
    null == b ? (b = mxSettings.getDefaults(), delete b.isNew) : (b = JSON.parse(b), b.version = mxSettings.currentVersion);
    return b;
  },
  getUi: function() {
    return mxSettings.isMainSettings() ? mxSettings.settings.ui : mxSettings.getMainSettings().ui;
  },
  setUi: function(b) {
    if (mxSettings.isMainSettings()) {
      mxSettings.settings.ui = b;
      if ('kennedy' == b || '' == b)
        mxSettings.settings.darkMode = !1;
      mxSettings.save();
    } else {
      var e = mxSettings.getMainSettings();
      e.ui = b;
      'kennedy' == b && (e.darkMode = !1);
      localStorage.setItem('.drawio-config', JSON.stringify(e));
    }
  },
  getShowStartScreen: function() {
    return mxSettings.settings.showStartScreen;
  },
  setShowStartScreen: function(b) {
    mxSettings.settings.showStartScreen = b;
  },
  getGridColor: function(b) {
    return b ? mxSettings.settings.darkGridColor : mxSettings.settings.gridColor;
  },
  setGridColor: function(b, e) {
    e ? mxSettings.settings.darkGridColor = b : mxSettings.settings.gridColor = b;
  },
  getAutosave: function() {
    return mxSettings.settings.autosave;
  },
  setAutosave: function(b) {
    mxSettings.settings.autosave = b;
  },
  getResizeImages: function() {
    return mxSettings.settings.resizeImages;
  },
  setResizeImages: function(b) {
    mxSettings.settings.resizeImages = b;
  },
  getOpenCounter: function() {
    return mxSettings.settings.openCounter;
  },
  setOpenCounter: function(b) {
    mxSettings.settings.openCounter = b;
  },
  setCustomFonts: function(b) {
    mxSettings.settings.customFonts = b;
  },
  getCustomFonts: function() {
    for (var b = mxSettings.settings.customFonts || [], e = 0; e < b.length; e++)
      'string' === typeof b[e] && (b[e] = {
        name: b[e],
        url: null
      });
    return b;
  },
  getLibraries: function() {
    return mxSettings.settings.libraries;
  },
  setLibraries: function(b) {
    mxSettings.settings.libraries = b;
  },
  addCustomLibrary: function(b) {
    mxSettings.load();
    Array.isArray(mxSettings.settings.customLibraries) || (mxSettings.settings.customLibraries = []);
    0 > mxUtils.indexOf(mxSettings.settings.customLibraries, b) && ('L.scratchpad' === b ? mxSettings.settings.customLibraries.splice(0, 0, b) : mxSettings.settings.customLibraries.push(b));
    mxSettings.save();
  },
  removeCustomLibrary: function(b) {
    mxSettings.load();
    mxUtils.remove(b, mxSettings.settings.customLibraries);
    mxSettings.save();
  },
  getCustomLibraries: function() {
    return mxSettings.settings.customLibraries;
  },
  getPlugins: function() {
    return mxSettings.settings.plugins;
  },
  setPlugins: function(b) {
    mxSettings.settings.plugins = b;
  },
  getRecentColors: function() {
    return mxSettings.settings.recentColors;
  },
  setRecentColors: function(b) {
    mxSettings.settings.recentColors = b;
  },
  getFormatWidth: function() {
    return parseInt(mxSettings.settings.formatWidth);
  },
  setFormatWidth: function(b) {
    mxSettings.settings.formatWidth = b;
  },
  isCreateTarget: function() {
    return mxSettings.settings.createTarget;
  },
  setCreateTarget: function(b) {
    mxSettings.settings.createTarget = b;
  },
  getPageFormat: function() {
    return mxSettings.settings.pageFormat;
  },
  setPageFormat: function(b) {
    mxSettings.settings.pageFormat = b;
  },
  getUnit: function() {
    return mxSettings.settings.unit || mxConstants.POINTS;
  },
  setUnit: function(b) {
    mxSettings.settings.unit = b;
  },
  isRulerOn: function() {
    return mxSettings.settings.isRulerOn;
  },
  setRulerOn: function(b) {
    mxSettings.settings.isRulerOn = b;
  },
  getDraftSaveDelay: function() {
    return mxSettings.settings.draftSaveDelay;
  },
  setDraftSaveDelay: function(b) {
    mxSettings.settings.draftSaveDelay = b;
  },
  getDefaults: function() {
    return {
      language: '',
      configVersion: Editor.configVersion,
      customFonts: [],
      libraries: Sidebar.prototype.defaultEntries,
      customLibraries: Editor.defaultCustomLibraries,
      plugins: [],
      recentColors: [],
      formatWidth: mxSettings.defaultFormatWidth,
      createTarget: '1' == urlParams.sketch,
      pageFormat: mxGraph.prototype.pageFormat,
      search: !0,
      showStartScreen: !0,
      gridColor: mxGraphView.prototype.defaultGridColor,
      darkGridColor: mxGraphView.prototype.defaultDarkGridColor,
      autosave: !EditorUi.isElectronApp,
      resizeImages: null,
      openCounter: 0,
      version: mxSettings.currentVersion,
      isNew: !0,
      unit: mxConstants.POINTS,
      isRulerOn: !1
    };
  },
  init: function() {
    mxSettings.settings = mxSettings.getDefaults();
  },
  save: function() {
    if (isLocalStorage && 'undefined' !== typeof JSON)
      try {
        delete mxSettings.settings.isNew, mxSettings.settings.version = mxSettings.currentVersion, localStorage.setItem(mxSettings.key, JSON.stringify(mxSettings.settings));
      } catch (b) {}
  },
  load: function() {
    isLocalStorage && 'undefined' !== typeof JSON && mxSettings.parse(localStorage.getItem(mxSettings.key));
    null == mxSettings.settings && mxSettings.init();
  },
  parse: function(b) {
    b = null != b ? JSON.parse(b) : null;
    null == b || b.configVersion != Editor.configVersion || null != Editor.config && Editor.config.override ? (mxSettings.settings = null, mxSettings.init()) : (mxSettings.settings = b, null == mxSettings.settings.plugins && (mxSettings.settings.plugins = []), null == mxSettings.settings.recentColors && (mxSettings.settings.recentColors = []), null == mxSettings.settings.customFonts && (mxSettings.settings.customFonts = []), null == mxSettings.settings.libraries && (mxSettings.settings.libraries = Sidebar.prototype.defaultEntries), null == mxSettings.settings.customLibraries && (mxSettings.settings.customLibraries = Editor.defaultCustomLibraries), null == mxSettings.settings.ui && (mxSettings.settings.ui = ''), null == mxSettings.settings.formatWidth && (mxSettings.settings.formatWidth = mxSettings.defaultFormatWidth), null != mxSettings.settings.lastAlert && delete mxSettings.settings.lastAlert, null == mxSettings.settings.createTarget && (mxSettings.settings.createTarget = !1), null == mxSettings.settings.pageFormat && (mxSettings.settings.pageFormat = mxGraph.prototype.pageFormat), null == mxSettings.settings.search && (mxSettings.settings.search = !0), null == mxSettings.settings.showStartScreen && (mxSettings.settings.showStartScreen = !0), null == mxSettings.settings.gridColor && (mxSettings.settings.gridColor = mxGraphView.prototype.defaultGridColor), null == mxSettings.settings.darkGridColor && (mxSettings.settings.darkGridColor = mxGraphView.prototype.defaultDarkGridColor), null == mxSettings.settings.autosave ? mxSettings.settings.autosave = !EditorUi.isElectronApp : EditorUi.isElectronApp && null == localStorage.getItem('._autoSaveTrans_') && (localStorage.setItem('._autoSaveTrans_', '1'), mxSettings.settings.autosave = !1, mxSettings.save()), null != mxSettings.settings.scratchpadSeen && delete mxSettings.settings.scratchpadSeen);
  },
  clear: function() {
    isLocalStorage && localStorage.removeItem(mxSettings.key);
  }
};
('undefined' == typeof mxLoadSettings || mxLoadSettings) && mxSettings.load();