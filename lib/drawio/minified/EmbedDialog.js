var EmbedDialog = function(b, e, f, c, k, m, t, y, E) {
  t = null != t ? t : 'Check out the diagram I made using @drawio';
  c = document.createElement('div');
  var z = /^https?:\/\//.test(e) || /^mailto:\/\//.test(e);
  null != m ? mxUtils.write(c, m) : mxUtils.write(c, mxResources.get(500000 > e.length ? z ? 'link' : 'mainEmbedNotice' : 'preview') + ':');
  mxUtils.br(c);
  m = document.createElement('div');
  m.style.position = 'absolute';
  m.style.top = '30px';
  m.style.right = '30px';
  m.style.color = 'gray';
  mxUtils.write(m, b.formatFileSize(e.length));
  c.appendChild(m);
  var D = document.createElement('textarea');
  D.setAttribute('autocomplete', 'off');
  D.setAttribute('autocorrect', 'off');
  D.setAttribute('autocapitalize', 'off');
  D.setAttribute('spellcheck', 'false');
  D.style.fontFamily = 'monospace';
  D.style.wordBreak = 'break-all';
  D.style.marginTop = '10px';
  D.style.resize = 'none';
  D.style.height = '150px';
  D.style.width = '440px';
  D.style.border = '1px solid gray';
  D.value = mxResources.get('updatingDocument');
  c.appendChild(D);
  mxUtils.br(c);
  this.init = function() {
    window.setTimeout(function() {
      500000 > e.length ? (D.value = e, D.focus(), mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? D.select() : document.execCommand('selectAll', !1, null)) : (D.setAttribute('readonly', 'true'), D.value = mxResources.get('tooLargeUseDownload'));
    }, 0);
  };
  m = document.createElement('div');
  m.style.position = 'absolute';
  m.style.bottom = '36px';
  m.style.right = '32px';
  var J = null;
  !EmbedDialog.showPreviewOption || mxClient.IS_CHROMEAPP && !z || navigator.standalone || !(z || mxClient.IS_SVG && (null == document.documentMode || 9 < document.documentMode)) || (J = mxUtils.button(null != y ? y : mxResources.get(500000 > e.length ? 'preview' : 'openInNewWindow'), function() {
    var d = 500000 > e.length ? D.value : e;
    if (null != k)
      k(d);
    else if (z)
      try {
        var g = b.openLink(d);
        null != g && (null == f || 0 < f) && window.setTimeout(mxUtils.bind(this, function() {
          try {
            null != g && null != g.location.href && g.location.href.substring(0, 8) != d.substring(0, 8) && (g.close(), b.handleError({
              message: mxResources.get('drawingTooLarge')
            }));
          } catch (v) {}
        }), f || 500);
      } catch (v) {
        b.handleError({
          message: v.message || mxResources.get('drawingTooLarge')
        });
      }
    else {
      var n = window.open();
      n = null != n ? n.document : null;
      null != n ? (n.writeln('<html><head><title>' + encodeURIComponent(mxResources.get('preview')) + '</title><meta charset="utf-8"></head><body>' + e + '</body></html>'), n.close()) : b.handleError({
        message: mxResources.get('errorUpdatingPreview')
      });
    }
  }), J.className = 'geBtn', m.appendChild(J));
  if (!z || 7500 < e.length)
    y = mxUtils.button(mxResources.get('download'), function() {
      b.hideDialog();
      b.saveData(null != E ? E : 'embed.txt', 'txt', e, 'text/plain');
    }), y.className = 'geBtn', m.appendChild(y);
  if (z && (!b.isOffline() || mxClient.IS_CHROMEAPP)) {
    if (51200 > e.length) {
      var G = mxUtils.button('', function() {
        try {
          var d = 'https://www.facebook.com/sharer.php?p[url]=' + encodeURIComponent(D.value);
          b.openLink(d);
        } catch (g) {
          b.handleError({
            message: g.message || mxResources.get('drawingTooLarge')
          });
        }
      });
      y = document.createElement('img');
      y.setAttribute('src', Editor.facebookImage);
      y.setAttribute('width', '18');
      y.setAttribute('height', '18');
      y.setAttribute('border', '0');
      G.appendChild(y);
      G.setAttribute('title', mxResources.get('facebook') + ' (' + b.formatFileSize(51200) + ' max)');
      G.style.verticalAlign = 'bottom';
      G.style.paddingTop = '4px';
      G.style.minWidth = '46px';
      G.className = 'geBtn';
      m.appendChild(G);
    }
    7168 > e.length && (G = mxUtils.button('', function() {
      try {
        var d = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(t) + '&url=' + encodeURIComponent(D.value);
        b.openLink(d);
      } catch (g) {
        b.handleError({
          message: g.message || mxResources.get('drawingTooLarge')
        });
      }
    }), y = document.createElement('img'), y.setAttribute('src', Editor.tweetImage), y.setAttribute('width', '18'), y.setAttribute('height', '18'), y.setAttribute('border', '0'), y.style.marginBottom = '5px', G.appendChild(y), G.setAttribute('title', mxResources.get('twitter') + ' (' + b.formatFileSize(7168) + ' max)'), G.style.verticalAlign = 'bottom', G.style.paddingTop = '4px', G.style.minWidth = '46px', G.className = 'geBtn', m.appendChild(G));
  }!b.isOffline() && 500000 > e.length && (G = mxUtils.button('', function() {
    try {
      var d = 'mailto:?subject=' + encodeURIComponent(E || b.defaultFilename) + '&body=' + encodeURIComponent(D.value);
      b.openLink(d);
    } catch (g) {
      b.handleError({
        message: g.message || mxResources.get('drawingTooLarge')
      });
    }
  }), y = document.createElement('img'), y.className = 'geAdaptiveAsset', y.setAttribute('src', Editor.mailImage), y.setAttribute('width', '18'), y.setAttribute('height', '18'), y.setAttribute('border', '0'), y.style.marginBottom = '5px', G.appendChild(y), G.style.verticalAlign = 'bottom', G.style.paddingTop = '4px', G.style.minWidth = '46px', G.className = 'geBtn', m.appendChild(G));
  y = mxUtils.button(mxResources.get('close'), function() {
    b.hideDialog();
  });
  m.appendChild(y);
  G = mxUtils.button(mxResources.get('copy'), function() {
    D.focus();
    mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? D.select() : document.execCommand('selectAll', !1, null);
    document.execCommand('copy');
    b.alert(mxResources.get('copiedToClipboard'));
  });
  500000 > e.length ? mxClient.IS_SF || null != document.documentMode ? y.className = 'geBtn gePrimaryBtn' : (m.appendChild(G), G.className = 'geBtn gePrimaryBtn', y.className = 'geBtn') : null != J && (m.appendChild(J), y.className = 'geBtn', J.className = 'geBtn gePrimaryBtn');
  c.appendChild(m);
  this.container = c;
};
EmbedDialog.showPreviewOption = !0;