function mxODPicker(b, e, f, c, k, m, t, y, E, z, D, J, G, d) {
  function g(T, U) {
    U = U || document;
    return U.querySelector(T);
  }

  function n(T, U, X) {
    if (null == T['@microsoft.graph.downloadUrl'])
      if (null == T.parentReference)
        X();
      else {
        c(T.id, T.parentReference.driveId, function(ea) {
          n(ea, U, X);
        }, X);
        return;
      }
    var Z = new XMLHttpRequest();
    Z.open('GET', T['@microsoft.graph.downloadUrl']);
    var Y = T.file ? 'image/png' == T.file.mimeType : !1;
    Z.onreadystatechange = function() {
      if (4 == this.readyState) {
        if (200 <= this.status && 299 >= this.status)
          try {
            var ea = Z.responseText;
            Y && (ea = 'data:image/png;base64,' + Editor.base64Encode(ea), ea = Editor.extractGraphModelFromPng(ea));
            var aa = mxUtils.parseXml(ea),
              fa = 'mxlibrary' == aa.documentElement.nodeName ? aa.documentElement : Editor.extractGraphModel(aa.documentElement);
            if (null != fa) {
              U(fa.ownerDocument);
              return;
            }
          } catch (da) {}
        X();
      }
    };
    Y && Z.overrideMimeType && Z.overrideMimeType('text/plain; charset=x-user-defined');
    Z.send();
  }

  function v() {
    J && null != M ? K.exportToCanvas(function(T) {
      T = EditorUi.prototype.createImageDataUri(T, null, 'png');
      t(I, T);
      m(I);
    }, 400, null, null, function(T) {
      console.log(T);
    }, 600, null, null, null, null, null, M) : (t(I, void 0), m(I));
  }

  function u(T) {
    function U(X) {
      S.style.background = 'transparent';
      S.innerText = '';
      var Z = document.createElement('div');
      Z.className = 'odPreviewStatus';
      mxUtils.write(Z, X);
      S.appendChild(Z);
      H.stop();
    }
    if (null != S)
      if (S.style.background = 'transparent', S.innerText = '', null == T || T.folder || /\.drawiolib$/.test(T.name))
        U(mxResources.get('noPreview'));
      else
        try {
          null != T.remoteItem && (T = T.remoteItem), p = T, H.spin(S), n(T, function(X) {
            H.stop();
            if (p == T)
              if ('mxlibrary' == X.documentElement.nodeName)
                U(mxResources.get('noPreview'));
              else {
                var Z = X.getElementsByTagName('diagram');
                M = AspectDialog.prototype.createViewer(S, 0 == Z.length ? X.documentElement : Z[0], null, 'transparent');
              }
          }, function() {
            I = null;
            U(mxResources.get('notADiagramFile'));
          });
        } catch (X) {
          I = null, U(mxResources.get('notADiagramFile'));
        }
  }

  function x() {
    var T = g('.odFilesBreadcrumb');
    if (null != T) {
      T.innerText = '';
      for (var U = 0; U < O.length - 1; U++) {
        var X = document.createElement('span');
        X.className = 'odBCFolder';
        X.innerHTML = mxUtils.htmlEntities(O[U].name || mxResources.get('home'));
        T.appendChild(X);
        (function(Y, ea) {
          X.addEventListener('click', function() {
            e(null);
            O = O.slice(0, ea);
            F(Y.driveId, Y.folderId, Y.siteId, Y.name);
          });
        }(O[U], U));
        var Z = document.createElement('span');
        Z.innerHTML = ' &gt; ';
        T.appendChild(Z);
      }
      null != O[O.length - 1] && (U = document.createElement('span'), U.innerHTML = mxUtils.htmlEntities(1 == O.length ? mxResources.get('officeSelDiag') : O[O.length - 1].name || mxResources.get('home')), T.appendChild(U));
    }
  }

  function C() {
    if (null != I && !P)
      if ('sharepoint' == Q)
        F('site', null, I.id, I.displayName);
      else if ('site' == Q)
      F('subsite', null, I.id, I.name);
    else {
      var T = I.folder;
      I = I.remoteItem ? I.remoteItem : I;
      var U = (I.parentReference ? I.parentReference.driveId : null) || Q,
        X = I.id;
      T ? F(U, X, null, I.name) : v();
    }
  }

  function F(T, U, X, Z, Y) {
    function ea(Ga) {
      H.stop();
      var Da = document.createElement('table');
      Da.className = 'odFileListGrid';
      for (var Ca = null, Ka = 0, ha = 0; null != Ga && ha < Ga.length; ha++) {
        var ra = Ga[ha];
        if (1 != da || !ra.webUrl || 0 < ra.webUrl.indexOf('sharepoint.com/sites/') || 0 > ra.webUrl.indexOf('sharepoint.com/')) {
          var ua = ra.displayName || ra.name,
            La = mxUtils.htmlEntities(ra.description || ua);
          da && (ra.folder = 2 == da ? {
            isRoot: !0
          } : !0);
          var Ia = null != ra.folder;
          if (!E || Ia) {
            var ka = document.createElement('tr');
            ka.className = Ka++ % 2 ? 'odOddRow' : 'odEvenRow';
            var xa = document.createElement('td');
            xa.style.width = '36px';
            var ta = document.createElement('img');
            ta.src = '/images/' + (Ia ? 'folder.png' : 'file.png');
            ta.className = 'odFileImg';
            xa.appendChild(ta);
            ka.appendChild(xa);
            xa = document.createElement('td');
            Ia = document.createElement('div');
            Ia.className = 'odFileTitle';
            Ia.innerHTML = mxUtils.htmlEntities(ua);
            Ia.setAttribute('title', La);
            xa.appendChild(Ia);
            ka.appendChild(xa);
            Da.appendChild(ka);
            null == Ca && (Ca = ka, Ca.className += ' odRowSelected', I = ra, Q = T, d || e(I));
            (function(oa, sa) {
              ka.addEventListener('dblclick', C);
              ka.addEventListener('click', function() {
                Ca != sa && (Ca.className = Ca.className.replace('odRowSelected', ''), Ca = sa, Ca.className += ' odRowSelected', I = oa, Q = T, d || e(I));
              });
            }(ra, ka));
          }
        }
      }
      0 == Ka ? (Ga = document.createElement('div'), Ga.className = 'odEmptyFolder', Ga.innerHTML = mxUtils.htmlEntities(mxResources.get('folderEmpty', null, 'Folder is empty!')), na.appendChild(Ga)) : na.appendChild(Da);
      x();
      P = !1;
    }

    function aa(Ga) {
      f(Ga ? Ga : va, function(Da) {
        if (fa) {
          var Ca = Da.value || [];
          if (d || da)
            Array.prototype.push.apply(ja, Ca);
          else
            for (var Ka = 0; Ka < Ca.length; Ka++) {
              var ha = Ca[Ka],
                ra = ha.file ? ha.file.mimeType : null;
              (ha.folder || 'text/html' == ra || 'text/xml' == ra || 'application/xml' == ra || 'image/png' == ra || /\.svg$/.test(ha.name) || /\.html$/.test(ha.name) || /\.xml$/.test(ha.name) || /\.png$/.test(ha.name) || /\.drawio$/.test(ha.name) || /\.drawiolib$/.test(ha.name)) && ja.push(ha);
            }
          Da['@odata.nextLink'] && 1000 > ja.length ? aa(Da['@odata.nextLink']) : (clearTimeout(ba), ea(ja));
        }
      }, function(Da) {
        if (fa) {
          clearTimeout(ba);
          var Ca = null;
          try {
            Ca = JSON.parse(Da.responseText).error.message;
          } catch (Ka) {}
          y(mxResources.get('errorFetchingFolder', null, 'Error fetching folder items') + (null != Ca ? ' (' + Ca + ')' : ''));
          P = !1;
          H.stop();
        }
      }, null != Ga);
    }
    if (!P) {
      g('.odCatsList').style.display = 'block';
      g('.odFilesSec').style.display = 'block';
      null != S && (S.innerText = '', S.style.top = '50%');
      var fa = P = !0,
        da = 0;
      W = arguments;
      var ba = setTimeout(function() {
          P = fa = !1;
          H.stop();
          y(mxResources.get('timeout'));
        }, 20000),
        na = g('.odFilesList');
      na.innerText = '';
      H.spin(na);
      switch (T) {
        case 'recent':
          O = [{
            name: mxResources.get('recent', null, 'Recent'),
            driveId: T
          }];
          var ia = k() || {},
            qa = [],
            Aa;
          for (Aa in ia)
            qa.push(ia[Aa]);
          clearTimeout(ba);
          ea(qa);
          return;
        case 'shared':
          var va = '/me/drive/sharedWithMe';
          O = [{
            name: mxResources.get('sharedWithMe', null, 'Shared With Me'),
            driveId: T
          }];
          break;
        case 'sharepoint':
          va = '/sites?search=';
          O = [{
            name: mxResources.get('sharepointSites', null, 'Sharepoint Sites'),
            driveId: T
          }];
          da = 1;
          break;
        case 'site':
          O.push({
            name: Z,
            driveId: T,
            folderId: U,
            siteId: X
          });
          va = '/sites/' + X + '/drives';
          da = 2;
          break;
        case 'subsite':
          O.push({
            name: Z,
            driveId: T,
            folderId: U,
            siteId: X
          });
          va = '/drives/' + X + (U ? '/items/' + U : '/root') + '/children';
          break;
        case 'search':
          T = Q;
          O = [{
            driveId: T,
            name: mxResources.get('back', null, 'Back')
          }];
          Y = encodeURIComponent(Y.replace(/'/g, '\\\''));
          va = T ? '/drives/' + T + '/root/search(q=\'' + Y + '\')' : '/me/drive/root/search(q=\'' + Y + '\')';
          break;
        default:
          null == U ? O = [{
            driveId: T
          }] : O.push({
            name: Z,
            driveId: T,
            folderId: U
          }), va = (T ? '/drives/' + T : '/me/drive') + (U ? '/items/' + U : '/root') + '/children';
      }
      da || (va += (0 < va.indexOf('?') ? '&' : '?') + 'select=id,name,description,parentReference,file,createdBy,lastModifiedBy,lastModifiedDateTime,size,folder,remoteItem,@microsoft.graph.downloadUrl');
      var ja = [];
      aa();
    }
  }

  function L(T) {
    R.className = R.className.replace('odCatSelected', '');
    R = T;
    R.className += ' odCatSelected';
  }

  function l(T) {
    P || (V = null, F('search', null, null, null, T));
  }
  var q = '';
  null == e && (e = u, q = '<div style="text-align: center;" class="odPreview"></div>');
  null == k && (k = function() {
    var T = null;
    try {
      T = JSON.parse(localStorage.getItem('mxODPickerRecentList'));
    } catch (U) {}
    return T;
  });
  null == m && (m = function(T) {
    if (null != T) {
      var U = k() || {};
      delete T['@microsoft.graph.downloadUrl'];
      U[T.id] = T;
      localStorage.setItem('mxODPickerRecentList', JSON.stringify(U));
    }
  });
  q = '<div class="odCatsList"><div class="odCatsListLbl">OneDrive</div><div id="odFiles" class="odCatListTitle odCatSelected">' + mxUtils.htmlEntities(mxResources.get('files')) + '</div><div id="odRecent" class="odCatListTitle">' + mxUtils.htmlEntities(mxResources.get('recent')) + '</div><div id="odShared" class="odCatListTitle">' + mxUtils.htmlEntities(mxResources.get('shared')) + '</div><div id="odSharepoint" class="odCatListTitle">' + mxUtils.htmlEntities(mxResources.get('sharepoint')) + '</div></div><div class="odFilesSec"><div class="searchBar" style="display:none"><input type="search" id="odSearchBox" placeholder="' + mxUtils.htmlEntities(mxResources.get('search')) + '"></div><div class="odFilesBreadcrumb"></div><div id="refreshOD" class="odRefreshButton"><img src="/images/update32.png" width="16" height="16" title="' + mxUtils.htmlEntities(mxResources.get('refresh')) + 'Refresh" border="0"/></div><div class="odFilesList"></div></div>' + q + (z ? '<div id="odBackBtn" class="odLinkBtn">&lt; ' + mxUtils.htmlEntities(mxResources.get('back')) + '</div>' : '') + (D ? '<button id="odSubmitBtn" class="odSubmitBtn">' + mxUtils.htmlEntities(mxResources.get(E ? 'save' : 'open')) + '</button>' : '');
  var A = null != window.Editor && null != Editor.isDarkMode && Editor.isDarkMode();
  A = '.odCatsList *, .odFilesSec * { user-select: none; }.odCatsList {\tbox-sizing: border-box;\tposition:absolute;\ttop:0px;\tbottom:50%;\twidth:30%;\tborder: 1px solid #CCCCCC;\tborder-bottom:none;\tdisplay: inline-block;\toverflow-x: hidden;\toverflow-y: auto;}.odCatsListLbl {\theight: 17px;\tcolor: #6D6D6D;\tfont-size: 14px;\tfont-weight: bold;\tline-height: 17px;\tmargin: 10px 0 3px 5px;}.odFilesSec {\tbox-sizing: border-box;\tposition:absolute;\tleft:30%;\ttop:0px;\tbottom:50%;\twidth: 70%;\tborder: 1px solid #CCCCCC;\tborder-left:none;\tborder-bottom:none;\tdisplay: inline-block;\toverflow: hidden;}.odFilesBreadcrumb {\tbox-sizing: border-box;\tposition:absolute;\tmin-height: 32px;\tleft:0px;\tright:20px;\ttext-overflow:ellipsis;\toverflow:hidden;\tfont-size: 13px;\tcolor: #6D6D6D;\tpadding: 5px;}.odRefreshButton {\tbox-sizing: border-box;\tposition:absolute;\tright:0px;\ttop:0px;\tpadding: 4px;\tmargin: 1px;\theight:24px;\tcursor:default;}.odRefreshButton>img {\topacity:0.5;}.odRefreshButton:hover {\tbackground-color:#ddd;\tborder-radius:50%;}.odRefreshButton:active {\topacity:0.7;}.odFilesList {\tbox-sizing: border-box;\tposition:absolute;\ttop:32px;\tbottom:0px;\twidth: 100%;\toverflow-x: hidden;\toverflow-y: auto;}.odFileImg {\twidth: 24px;\tpadding-left: 5px;\tpadding-right: 5px;}.odFileTitle {\tcursor: default;\tfont-weight: normal;\tcolor: #666666 !important;\twidth: calc(100% - 20px);\twhite-space: nowrap;\toverflow: hidden;\ttext-overflow: ellipsis;}.odFileListGrid {\twidth: 100%;\twhite-space: nowrap;\tfont-size: 13px;    box-sizing: border-box;    border-spacing: 0;}.odOddRow {' + (A ? '' : '\tbackground-color: #eeeeee;') + '}.odEvenRow {' + (A ? '' : '\tbackground-color: #FFFFFF;') + '}.odRowSelected {\tbackground-color: #cadfff;}.odCatListTitle {\tbox-sizing: border-box;\theight: 17px;\tcursor: default;\tcolor: #666666;\tfont-size: 14px;\tline-height: 17px;\tmargin: 5px 0 5px 0px;    padding-left: 10px;}.odCatSelected {\tfont-weight: bold;\tbackground-color: #cadfff;}.odEmptyFolder {\theight: 17px;\tcolor: #6D6D6D;\tfont-size: 14px;\tfont-weight: bold;\tline-height: 17px;\tmargin: 10px 0 3px 5px;\twidth: 100%;    text-align: center;}.odBCFolder {\tcursor: pointer;\tcolor: #0432ff;}.odPreviewStatus {\tposition:absolute;\ttext-align:center;\twidth:100%;\ttop:50%;\ttransform: translateY(-50%);\tfont-size:13px;\topacity:0.5;}.odPreview {    position:absolute;\t overflow:hidden;\t border: 1px solid #CCCCCC;    bottom:0px;    top: 50%;    left:0px;    right:0px;}.odLinkBtn {   position: absolute;\tfont-size: 12px;\tcursor: pointer;\tcolor: #6D6D6D;\tleft: 5px;\tbottom: 3px;}.odSubmitBtn {   position: absolute;\tcolor: #333;\tright: 5px;\tbottom: 5px;}';
  var H = new Spinner({
      left: '50%',
      lines: 12,
      length: 8,
      width: 3,
      radius: 5,
      rotate: 0,
      color: '#000',
      speed: 1,
      trail: 60,
      shadow: !1,
      hwaccel: !1,
      className: 'spinner',
      zIndex: 2000000000
    }),
    K = new Editor(),
    M = null,
    I = null,
    Q = null,
    P = !1,
    O = [],
    W = null,
    p = null;
  this.getSelectedItem = function() {
    null != I && m(I);
    return I;
  };
  if (null == g('#mxODPickerCss')) {
    var B = document.head || document.getElementsByTagName('head')[0],
      N = document.createElement('style');
    B.appendChild(N);
    N.type = 'text/css';
    N.id = 'mxODPickerCss';
    N.appendChild(document.createTextNode(A));
  }
  b.innerHTML = q;
  var S = g('.odPreview'),
    R = g('#odFiles');
  b = function(T, U) {
    U = U || document;
    return U.querySelectorAll(T);
  }('.odCatListTitle');
  for (q = 0; q < b.length; q++)
    b[q].addEventListener('click', function() {
      I = p = null;
      if (!P)
        switch (L(this), this.id) {
          case 'odFiles':
            F();
            break;
          case 'odRecent':
            F('recent');
            break;
          case 'odShared':
            F('shared');
            break;
          case 'odSharepoint':
            F('sharepoint');
        }
    });
  var V = null;
  g('#odSearchBox').addEventListener('keyup', function(T) {
    var U = this;
    null != V && clearTimeout(V);
    13 == T.keyCode ? l(U.value) : V = setTimeout(function() {
      l(U.value);
    }, 500);
  });
  g('#refreshOD').addEventListener('click', function() {
    null != W && (e(null), F.apply(this, W));
  });
  z && g('#odBackBtn').addEventListener('click', z);
  D && g('#odSubmitBtn').addEventListener('click', v);
  null != G ? (z = G.pop(), 'sharepoint' == G[0].driveId && L(g('#odSharepoint')), O = G, F(z.driveId, z.folderId, z.siteId, z.name)) : F();
};