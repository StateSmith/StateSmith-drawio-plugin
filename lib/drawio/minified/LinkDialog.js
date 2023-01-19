var LinkDialog = function(b, e, f, c, k, m, t) {
  function y(C, F, L) {
    L = mxUtils.button('', L);
    L.className = 'geBtn';
    L.setAttribute('title', F);
    F = document.createElement('img');
    F.style.height = '26px';
    F.style.width = '26px';
    F.setAttribute('src', C);
    L.style.minWidth = '42px';
    L.style.verticalAlign = 'middle';
    L.appendChild(F);
    x.appendChild(L);
  }
  var E = document.createElement('div');
  E.style.height = '100%';
  mxUtils.write(E, mxResources.get('editLink') + ':');
  var z = document.createElement('div');
  z.className = 'geTitle';
  z.style.backgroundColor = 'transparent';
  z.style.borderColor = 'transparent';
  z.style.whiteSpace = 'nowrap';
  z.style.textOverflow = 'clip';
  z.style.cursor = 'default';
  z.style.paddingRight = '20px';
  var D = document.createElement('input');
  D.setAttribute('placeholder', mxResources.get('dragUrlsHere'));
  D.setAttribute('type', 'text');
  D.style.marginTop = '6px';
  D.style.width = '97%';
  D.style.boxSizing = 'border-box';
  D.style.backgroundImage = 'url(\'' + Dialog.prototype.clearImage + '\')';
  D.style.backgroundRepeat = 'no-repeat';
  D.style.backgroundPosition = '100% 50%';
  D.style.paddingRight = '14px';
  D.style.marginBottom = '4px';
  var J = document.createElement('div');
  J.setAttribute('title', mxResources.get('reset'));
  J.style.position = 'relative';
  J.style.left = '-16px';
  J.style.width = '12px';
  J.style.height = '14px';
  J.style.cursor = 'pointer';
  J.style.display = 'inline-block';
  J.style.top = '3px';
  J.style.background = 'url(\'' + b.editor.transparentImage + '\')';
  mxEvent.addListener(J, 'click', function() {
    D.value = '';
    D.focus();
  });
  var G = document.createElement('input');
  G.style.cssText = 'margin-right:8px;margin-bottom:8px;';
  G.setAttribute('value', 'url');
  G.setAttribute('type', 'radio');
  G.setAttribute('name', 'geLinkDialogOption');
  var d = document.createElement('input');
  d.style.cssText = 'margin-right:8px;margin-bottom:8px;';
  d.setAttribute('value', 'url');
  d.setAttribute('type', 'radio');
  d.setAttribute('name', 'geLinkDialogOption');
  var g = document.createElement('select');
  g.style.width = '520px';
  var n = document.createElement('input');
  n.setAttribute('type', 'checkbox');
  n.style.margin = '0 6p 0 6px';
  null != t && (n.setAttribute('checked', 'checked'), n.defaultChecked = !0);
  t = null != t ? t : '_blank';
  n.setAttribute('title', t);
  m && (D.style.width = '340px');
  if (k && null != b.pages) {
    null != e && Graph.isPageLink(e) ? (d.setAttribute('checked', 'checked'), d.defaultChecked = !0) : (D.setAttribute('value', e), G.setAttribute('checked', 'checked'), G.defaultChecked = !0);
    z.appendChild(G);
    z.appendChild(D);
    z.appendChild(J);
    m && (z.appendChild(n), mxUtils.write(z, mxResources.get('openInNewWindow')));
    mxUtils.br(z);
    z.appendChild(d);
    k = !1;
    for (m = 0; m < b.pages.length; m++)
      J = document.createElement('option'), mxUtils.write(J, b.pages[m].getName() || mxResources.get('pageWithNumber', [m + 1])), J.setAttribute('value', 'data:page/id,' + b.pages[m].getId()), e == J.getAttribute('value') && (J.setAttribute('selected', 'selected'), k = !0), g.appendChild(J);
    if (!k && d.checked) {
      var v = document.createElement('option');
      mxUtils.write(v, mxResources.get('pageNotFound'));
      v.setAttribute('disabled', 'disabled');
      v.setAttribute('selected', 'selected');
      v.setAttribute('value', 'pageNotFound');
      g.appendChild(v);
      mxEvent.addListener(g, 'change', function() {
        null == v.parentNode || v.selected || v.parentNode.removeChild(v);
      });
    }
    z.appendChild(g);
  } else
    D.setAttribute('value', e), z.appendChild(D), z.appendChild(J);
  E.appendChild(z);
  var u = mxUtils.button(f, function() {
    b.hideDialog();
    c(d.checked ? 'pageNotFound' !== g.value ? g.value : e : D.value, LinkDialog.selectedDocs, n.checked ? t : null);
  });
  u.style.verticalAlign = 'middle';
  u.className = 'geBtn gePrimaryBtn';
  this.init = function() {
    d.checked ? g.focus() : (D.focus(), mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? D.select() : document.execCommand('selectAll', !1, null));
    mxEvent.addListener(g, 'focus', function() {
      G.removeAttribute('checked');
      d.setAttribute('checked', 'checked');
      d.checked = !0;
    });
    mxEvent.addListener(D, 'focus', function() {
      d.removeAttribute('checked');
      G.setAttribute('checked', 'checked');
      G.checked = !0;
    });
    if (Graph.fileSupport) {
      var C = E.parentNode,
        F = null;
      mxEvent.addListener(C, 'dragleave', function(L) {
        null != F && (F.parentNode.removeChild(F), F = null);
        L.stopPropagation();
        L.preventDefault();
      });
      mxEvent.addListener(C, 'dragover', mxUtils.bind(this, function(L) {
        null == F && (!mxClient.IS_IE || 10 < document.documentMode) && (F = b.highlightElement(C));
        L.stopPropagation();
        L.preventDefault();
      }));
      mxEvent.addListener(C, 'drop', mxUtils.bind(this, function(L) {
        null != F && (F.parentNode.removeChild(F), F = null);
        0 <= mxUtils.indexOf(L.dataTransfer.types, 'text/uri-list') && (D.value = decodeURIComponent(L.dataTransfer.getData('text/uri-list')), G.setAttribute('checked', 'checked'), G.checked = !0, u.click());
        L.stopPropagation();
        L.preventDefault();
      }), !1);
    }
  };
  var x = document.createElement('div');
  x.style.marginTop = '18px';
  x.style.textAlign = 'center';
  f = mxUtils.button(mxResources.get('help'), function() {
    b.openLink('https://www.diagrams.net/doc/faq/custom-links');
  });
  f.style.verticalAlign = 'middle';
  f.className = 'geBtn';
  x.appendChild(f);
  b.isOffline() && !mxClient.IS_CHROMEAPP && (f.style.display = 'none');
  f = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog();
  });
  f.style.verticalAlign = 'middle';
  f.className = 'geBtn';
  b.editor.cancelFirst && x.appendChild(f);
  LinkDialog.selectedDocs = null;
  LinkDialog.filePicked = function(C) {
    if (C.action == google.picker.Action.PICKED) {
      LinkDialog.selectedDocs = C.docs;
      var F = C.docs[0].url;
      'application/mxe' == C.docs[0].mimeType || null != C.docs[0].mimeType && 'application/vnd.jgraph.' == C.docs[0].mimeType.substring(0, 23) ? F = 'https://www.draw.io/#G' + C.docs[0].id : 'application/vnd.google-apps.folder' == C.docs[0].mimeType && (F = 'https://drive.google.com/#folders/' + C.docs[0].id);
      D.value = F;
      D.focus();
    } else
      LinkDialog.selectedDocs = null;
    D.focus();
  };
  'undefined' != typeof google && 'undefined' != typeof google.picker && null != b.drive && y(IMAGE_PATH + '/google-drive-logo.svg', mxResources.get('googlePlus'), function() {
    b.spinner.spin(document.body, mxResources.get('authorizing')) && b.drive.checkToken(mxUtils.bind(this, function() {
      b.spinner.stop();
      if (null == b.linkPicker) {
        var C = b.drive.createLinkPicker();
        b.linkPicker = C.setCallback(function(F) {
          LinkDialog.filePicked(F);
        }).build();
      }
      b.linkPicker.setVisible(!0);
    }));
  });
  'undefined' != typeof Dropbox && 'undefined' != typeof Dropbox.choose && y(IMAGE_PATH + '/dropbox-logo.svg', mxResources.get('dropbox'), function() {
    Dropbox.choose({
      linkType: 'direct',
      cancel: function() {},
      success: function(C) {
        D.value = C[0].link;
        D.focus();
      }
    });
  });
  null != b.oneDrive && y(IMAGE_PATH + '/onedrive-logo.svg', mxResources.get('oneDrive'), function() {
    b.oneDrive.pickFile(function(C, F) {
      D.value = F.value[0].webUrl;
      D.focus();
    }, !0);
  });
  null != b.gitHub && y(IMAGE_PATH + '/github-logo.svg', mxResources.get('github'), function() {
    b.gitHub.pickFile(function(C) {
      if (null != C) {
        C = C.split('/');
        var F = C[0],
          L = C[1],
          l = C[2];
        C = C.slice(3, C.length).join('/');
        D.value = 'https://github.com/' + F + '/' + L + '/blob/' + l + '/' + C;
        D.focus();
      }
    });
  });
  null != b.gitLab && y(IMAGE_PATH + '/gitlab-logo.svg', mxResources.get('gitlab'), function() {
    b.gitLab.pickFile(function(C) {
      if (null != C) {
        C = C.split('/');
        var F = C[0],
          L = C[1],
          l = C[2];
        C = C.slice(3, C.length).join('/');
        D.value = DRAWIO_GITLAB_URL + '/' + F + '/' + L + '/blob/' + l + '/' + C;
        D.focus();
      }
    });
  });
  mxEvent.addListener(D, 'keypress', function(C) {
    13 == C.keyCode && (b.hideDialog(), c(d.checked ? g.value : D.value, LinkDialog.selectedDocs));
  });
  x.appendChild(u);
  b.editor.cancelFirst || x.appendChild(f);
  E.appendChild(x);
  this.container = E;
};