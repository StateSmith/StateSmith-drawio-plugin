var MoreShapesDialog = function(b, e, f) {
  f = null != f ? f : b.sidebar.entries;
  var c = document.createElement('div'),
    k = [];
  if (null != b.sidebar.customEntries)
    for (var m = 0; m < b.sidebar.customEntries.length; m++) {
      for (var t = b.sidebar.customEntries[m], y = {
          title: b.getResource(t.title),
          entries: []
        }, E = 0; E < t.entries.length; E++) {
        var z = t.entries[E];
        y.entries.push({
          id: z.id,
          title: b.getResource(z.title),
          desc: b.getResource(z.desc),
          image: z.preview
        });
      }
      k.push(y);
    }
  for (m = 0; m < f.length; m++)
    if (null == b.sidebar.enabledLibraries)
      k.push(f[m]);
    else {
      y = {
        title: f[m].title,
        entries: []
      };
      for (E = 0; E < f[m].entries.length; E++)
        0 <= mxUtils.indexOf(b.sidebar.enabledLibraries, f[m].entries[E].id) && y.entries.push(f[m].entries[E]);
      0 < y.entries.length && k.push(y);
    }
  f = k;
  if (e) {
    m = mxUtils.bind(this, function(l) {
      for (var q = 0; q < l.length; q++)
        (function(A) {
          var H = g.cloneNode(!1);
          H.style.fontWeight = 'bold';
          H.style.backgroundColor = Editor.isDarkMode() ? '#505759' : '#e5e5e5';
          H.style.padding = '6px 0px 6px 20px';
          mxUtils.write(H, A.title);
          D.appendChild(H);
          for (var K = 0; K < A.entries.length; K++)
            (function(M) {
              var I = g.cloneNode(!1);
              I.style.cursor = 'pointer';
              I.style.padding = '4px 0px 4px 20px';
              I.style.whiteSpace = 'nowrap';
              I.style.overflow = 'hidden';
              I.style.textOverflow = 'ellipsis';
              I.setAttribute('title', M.title + ' (' + M.id + ')');
              var Q = document.createElement('input');
              Q.setAttribute('type', 'checkbox');
              Q.checked = b.sidebar.isEntryVisible(M.id);
              Q.defaultChecked = Q.checked;
              I.appendChild(Q);
              mxUtils.write(I, ' ' + M.title);
              D.appendChild(I);
              var P = function(O) {
                if (null == O || 'INPUT' != mxEvent.getSource(O).nodeName) {
                  J.style.textAlign = 'center';
                  J.style.padding = '0px';
                  J.style.color = '';
                  J.innerText = '';
                  if (null != M.desc) {
                    var W = document.createElement('pre');
                    W.style.boxSizing = 'border-box';
                    W.style.fontFamily = 'inherit';
                    W.style.margin = '20px';
                    W.style.right = '0px';
                    W.style.textAlign = 'left';
                    mxUtils.write(W, M.desc);
                    J.appendChild(W);
                  }
                  null != M.imageCallback ? M.imageCallback(J) : null != M.image ? J.innerHTML += '<img border="0" style="max-width:100%;" src="' + M.image + '"/>' : null == M.desc && (J.style.padding = '20px', J.style.color = 'rgb(179, 179, 179)', mxUtils.write(J, mxResources.get('noPreview')));
                  null != G && (G.style.backgroundColor = '');
                  G = I;
                  G.style.backgroundColor = Editor.isDarkMode() ? '#000000' : '#ebf2f9';
                  null != O && mxEvent.consume(O);
                }
              };
              mxEvent.addListener(I, 'click', P);
              mxEvent.addListener(I, 'dblclick', function(O) {
                Q.checked = !Q.checked;
                mxEvent.consume(O);
              });
              d.push(function() {
                return Q.checked ? M.id : null;
              });
              0 == q && 0 == K && P();
            }(A.entries[K]));
        }(l[q]));
    });
    E = document.createElement('div');
    E.className = 'geDialogTitle';
    mxUtils.write(E, mxResources.get('shapes'));
    E.style.position = 'absolute';
    E.style.top = '0px';
    E.style.left = '0px';
    E.style.lineHeight = '40px';
    E.style.height = '40px';
    E.style.right = '0px';
    var D = document.createElement('div'),
      J = document.createElement('div');
    D.style.position = 'absolute';
    D.style.top = '40px';
    D.style.left = '0px';
    D.style.width = '202px';
    D.style.bottom = '60px';
    D.style.overflow = 'auto';
    J.style.position = 'absolute';
    J.style.left = '202px';
    J.style.right = '0px';
    J.style.top = '40px';
    J.style.bottom = '60px';
    J.style.overflow = 'auto';
    J.style.borderLeftStyle = 'solid';
    J.style.borderLeftWidth = '1px';
    J.style.textAlign = 'center';
    var G = null,
      d = [],
      g = document.createElement('div');
    g.style.position = 'relative';
    g.style.left = '0px';
    g.style.right = '0px';
    m(f);
    c.style.padding = '30px';
    c.appendChild(E);
    c.appendChild(D);
    c.appendChild(J);
    f = document.createElement('div');
    f.className = 'geDialogFooter';
    f.style.position = 'absolute';
    f.style.paddingRight = '16px';
    f.style.color = 'gray';
    f.style.left = '0px';
    f.style.right = '0px';
    f.style.bottom = '0px';
    f.style.height = '60px';
    f.style.lineHeight = '52px';
    var n = document.createElement('input');
    n.setAttribute('type', 'checkbox');
    n.style.position = 'relative';
    n.style.top = '1px';
    n.checked = b.sidebar.sidebarTitles;
    n.defaultChecked = n.checked;
    f.appendChild(n);
    m = document.createElement('span');
    mxUtils.write(m, ' ' + mxResources.get('labels'));
    m.style.paddingRight = '20px';
    f.appendChild(m);
    mxEvent.addListener(m, 'click', function(l) {
      n.checked = !n.checked;
      mxEvent.consume(l);
    });
    var v = document.createElement('input');
    v.setAttribute('type', 'checkbox');
    if (isLocalStorage || mxClient.IS_CHROMEAPP)
      m = document.createElement('span'), m.style.paddingRight = '20px', m.appendChild(v), mxUtils.write(m, ' ' + mxResources.get('rememberThisSetting')), v.style.position = 'relative', v.style.top = '1px', v.checked = !0, v.defaultChecked = !0, mxEvent.addListener(m, 'click', function(l) {
        mxEvent.getSource(l) != v && (v.checked = !v.checked, mxEvent.consume(l));
      }), f.appendChild(m);
    m = mxUtils.button(mxResources.get('cancel'), function() {
      b.hideDialog();
    });
    m.className = 'geBtn';
    E = mxUtils.button(mxResources.get('apply'), function() {
      b.hideDialog();
      for (var l = [], q = 0; q < d.length; q++) {
        var A = d[q].apply(this, arguments);
        null != A && l.push(A);
      }
      'sketch' != Editor.currentTheme && 'simple' != Editor.currentTheme || !Editor.isSettingsEnabled() || (q = mxUtils.indexOf(l, '.scratchpad'), null != b.scratchpad != (0 <= q && 0 < l.splice(q, 1).length) && b.toggleScratchpad(), q = mxUtils.indexOf(l, 'search'), mxSettings.settings.search = 0 <= q && 0 < l.splice(q, 1).length, b.sidebar.showPalette('search', mxSettings.settings.search), v.checked && mxSettings.save());
      b.sidebar.showEntries(l.join(';'), v.checked, !0);
      b.setSidebarTitles(n.checked, v.checked);
    });
    E.className = 'geBtn gePrimaryBtn';
  } else {
    var u = document.createElement('table');
    m = document.createElement('tbody');
    c.style.height = '100%';
    c.style.overflow = 'auto';
    E = document.createElement('tr');
    u.style.width = '100%';
    e = document.createElement('td');
    k = document.createElement('td');
    t = document.createElement('td');
    var x = mxUtils.bind(this, function(l, q, A) {
      var H = document.createElement('input');
      H.type = 'checkbox';
      u.appendChild(H);
      H.checked = b.sidebar.isEntryVisible(A);
      var K = document.createElement('span');
      mxUtils.write(K, q);
      q = document.createElement('div');
      q.style.display = 'block';
      q.appendChild(H);
      q.appendChild(K);
      mxEvent.addListener(K, 'click', function(M) {
        H.checked = !H.checked;
        mxEvent.consume(M);
      });
      l.appendChild(q);
      return function() {
        return H.checked ? A : null;
      };
    });
    E.appendChild(e);
    E.appendChild(k);
    E.appendChild(t);
    m.appendChild(E);
    u.appendChild(m);
    d = [];
    var C = 0;
    for (m = 0; m < f.length; m++)
      for (E = 0; E < f[m].entries.length; E++)
        C++;
    var F = [
        e,
        k,
        t
      ],
      L = 0;
    for (m = 0; m < f.length; m++)
      (function(l) {
        for (var q = 0; q < l.entries.length; q++) {
          var A = l.entries[q];
          d.push(x(F[Math.floor(L / (C / 3))], A.title, A.id));
          L++;
        }
      }(f[m]));
    c.appendChild(u);
    f = document.createElement('div');
    f.style.marginTop = '18px';
    f.style.textAlign = 'center';
    v = document.createElement('input');
    isLocalStorage && (v.setAttribute('type', 'checkbox'), v.checked = !0, v.defaultChecked = !0, f.appendChild(v), m = document.createElement('span'), mxUtils.write(m, ' ' + mxResources.get('rememberThisSetting')), f.appendChild(m), mxEvent.addListener(m, 'click', function(l) {
      v.checked = !v.checked;
      mxEvent.consume(l);
    }));
    c.appendChild(f);
    m = mxUtils.button(mxResources.get('cancel'), function() {
      b.hideDialog();
    });
    m.className = 'geBtn';
    E = mxUtils.button(mxResources.get('apply'), function() {
      for (var l = ['search'], q = 0; q < d.length; q++) {
        var A = d[q].apply(this, arguments);
        null != A && l.push(A);
      }
      b.sidebar.showEntries(0 < l.length ? l.join(';') : '', v.checked);
      b.hideDialog();
    });
    E.className = 'geBtn gePrimaryBtn';
    f = document.createElement('div');
    f.style.marginTop = '26px';
    f.style.textAlign = 'right';
  }
  b.editor.cancelFirst ? (f.appendChild(m), f.appendChild(E)) : (f.appendChild(E), f.appendChild(m));
  c.appendChild(f);
  this.container = c;
};