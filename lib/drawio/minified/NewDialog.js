var NewDialog = function(b, e, f, c, k, m, t, y, E, z, D, J, G, d, g, n, v, u) {
  function x(ka) {
    null != ka && (qa = Aa = ka ? 135 : 140);
    ka = !0;
    if (null != ra)
      for (; I < ra.length && (ka || 0 != mxUtils.mod(I, 30));) {
        var xa = ra[I++];
        xa = L(xa.url, xa.libs, xa.title, xa.tooltip ? xa.tooltip : xa.title, xa.select, xa.imgUrl, xa.info, xa.onClick, xa.preview, xa.noImg, xa.clibs);
        ka && xa.click();
        ka = !1;
      }
  }

  function C() {
    if (Z && null != d)
      f || b.hideDialog(), d(Z, ea, M.value);
    else if (c)
      f || b.hideDialog(), c(U, M.value, Y, V);
    else {
      var ka = M.value;
      null != ka && 0 < ka.length && b.pickFolder(b.mode, function(xa) {
        b.createFile(ka, U, null != V && 0 < V.length ? V : null, null, function() {
          b.hideDialog();
        }, null, xa, null, null != T && 0 < T.length ? T : null);
      }, b.mode != App.MODE_GOOGLE || null == b.stateArg || null == b.stateArg.folderId);
    }
  }

  function F(ka, xa, ta, oa, sa, za, ca) {
    null != X && (X.style.backgroundColor = 'transparent', X.style.border = '1px solid transparent');
    P.removeAttribute('disabled');
    U = xa;
    V = ta;
    T = za;
    X = ka;
    Z = oa;
    Y = ca;
    ea = sa;
    X.style.backgroundColor = y;
    X.style.border = E;
  }

  function L(ka, xa, ta, oa, sa, za, ca, ma, pa, wa, Fa) {
    function Ea(Ha, Na) {
      null == Qa ? (Sa = Ha, Sa = /^https?:\/\//.test(Sa) && !b.editor.isCorsEnabledForUrl(Sa) ? PROXY_URL + '?url=' + encodeURIComponent(Sa) : TEMPLATE_PATH + '/' + Sa, mxUtils.get(Sa, mxUtils.bind(this, function(Ta) {
        200 <= Ta.getStatus() && 299 >= Ta.getStatus() && (Qa = Ta.getText());
        Na(Qa, Sa);
      }))) : Na(Qa, Sa);
    }

    function ya(Ha, Na, Ta) {
      if (null != Ha && mxUtils.isAncestorNode(document.body, la)) {
        Ha = mxUtils.parseXml(Ha);
        Ha = Editor.parseDiagramNode(Ha.documentElement);
        var Wa = new mxCodec(Ha.ownerDocument),
          Va = new mxGraphModel();
        Wa.decode(Ha, Va);
        Ha = Va.root.getChildAt(0).children;
        b.sidebar.createTooltip(la, Ha, Math.min((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 80, 1000), Math.min((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 80, 800), null != ta ? mxResources.get(ta, null, ta) : null, !0, new mxPoint(Na, Ta), !0, function() {
          Xa = null != b.sidebar.tooltip && 'none' != b.sidebar.tooltip.style.display;
          F(la, null, null, ka, ca, Fa);
        }, !0, !1);
      }
    }

    function Ba(Ha, Na) {
      null == ka || Ja || b.sidebar.currentElt == la ? b.sidebar.hideTooltip() : (b.sidebar.hideTooltip(), null != Oa ? (Na = '<mxfile><diagram id="d" name="n">' + Graph.compress('<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="" style="shape=image;image=' + Oa.src + ';imageAspect=1;" parent="1" vertex="1"><mxGeometry width="' + Oa.naturalWidth + '" height="' + Oa.naturalHeight + '" as="geometry" /></mxCell></root></mxGraphModel>') + '</diagram></mxfile>', ya(Na, mxEvent.getClientX(Ha), mxEvent.getClientY(Ha))) : (b.sidebar.currentElt = la, Ja = !0, Ea(ka, function(Ta) {
        Ja && b.sidebar.currentElt == la && ya(Ta, mxEvent.getClientX(Ha), mxEvent.getClientY(Ha));
        Ja = !1;
      })));
    }
    var la = document.createElement('div');
    la.className = 'geTemplate geAdaptiveAsset';
    la.style.position = 'relative';
    la.style.height = qa + 'px';
    la.style.width = Aa + 'px';
    var Qa = null,
      Sa = ka;
    null != ta ? la.setAttribute('title', mxResources.get(ta, null, ta)) : null != oa && 0 < oa.length && la.setAttribute('title', oa);
    var Ja = !1,
      Oa = null;
    if (null != za) {
      la.style.display = 'inline-flex';
      la.style.justifyContent = 'center';
      la.style.alignItems = 'center';
      sa = document.createElement('img');
      sa.setAttribute('src', za);
      sa.setAttribute('alt', oa);
      sa.style.maxWidth = qa + 'px';
      sa.style.maxHeight = Aa + 'px';
      Oa = sa;
      var Pa = za.replace('.drawio.xml', '').replace('.drawio', '').replace('.xml', '');
      la.appendChild(sa);
      sa.onerror = function() {
        this.src != Pa ? this.src = Pa : (this.src = Editor.errorImage, this.onerror = null);
      };
      mxEvent.addGestureListeners(la, mxUtils.bind(this, function(Ha) {
        F(la, null, null, ka, ca, Fa);
      }), null, null);
      mxEvent.addListener(la, 'dblclick', function(Ha) {
        C();
        mxEvent.consume(Ha);
      });
    } else if (!wa && null != ka && 0 < ka.length) {
      var Ra = function(Ha) {
        P.setAttribute('disabled', 'disabled');
        la.style.backgroundColor = 'transparent';
        la.style.border = '1px solid transparent';
        Q.spin(aa);
        Ea(ka, function(Na, Ta) {
          Q.stop();
          null != Na && (F(la, Na, xa, null, null, Fa, Ta), Ha && C());
        });
      };
      sa = pa || TEMPLATE_PATH + '/' + ka.substring(0, ka.length - 4) + '.png';
      la.style.backgroundImage = 'url(' + sa + ')';
      la.style.backgroundPosition = 'center center';
      la.style.backgroundRepeat = 'no-repeat';
      if (null != ta) {
        oa = document.createElement('table');
        oa.setAttribute('width', '100%');
        oa.setAttribute('height', '100%');
        oa.style.background = Editor.isDarkMode() ? 'transparent' : 'rgba(255,255,255,0.85)';
        oa.style.lineHeight = '1.3em';
        oa.style.border = 'inherit';
        za = document.createElement('tbody');
        pa = document.createElement('tr');
        wa = document.createElement('td');
        wa.setAttribute('align', 'center');
        wa.setAttribute('valign', 'middle');
        var Ma = document.createElement('span');
        Ma.style.display = 'inline-block';
        Ma.style.padding = '4px 8px 4px 8px';
        Ma.style.userSelect = 'none';
        Ma.style.borderRadius = '3px';
        Ma.style.background = 'rgba(255,255,255,0.85)';
        Ma.style.overflow = 'hidden';
        Ma.style.textOverflow = 'ellipsis';
        Ma.style.maxWidth = qa - 34 + 'px';
        mxUtils.write(Ma, mxResources.get(ta, null, ta));
        wa.appendChild(Ma);
        pa.appendChild(wa);
        za.appendChild(pa);
        oa.appendChild(za);
        la.appendChild(oa);
      }
      mxEvent.addGestureListeners(la, mxUtils.bind(this, function(Ha) {
        Ra();
      }), null, null);
      mxEvent.addListener(la, 'dblclick', function(Ha) {
        Ra(!0);
        mxEvent.consume(Ha);
      });
    } else
      oa = document.createElement('table'), oa.setAttribute('width', '100%'), oa.setAttribute('height', '100%'), oa.style.lineHeight = '1.3em', za = document.createElement('tbody'), pa = document.createElement('tr'), wa = document.createElement('td'), wa.setAttribute('align', 'center'), wa.setAttribute('valign', 'middle'), Ma = document.createElement('span'), Ma.style.display = 'inline-block', Ma.style.padding = '4px 8px 4px 8px', Ma.style.userSelect = 'none', Ma.style.borderRadius = '3px', Ma.style.background = '#ffffff', Ma.style.overflow = 'hidden', Ma.style.textOverflow = 'ellipsis', Ma.style.maxWidth = qa - 34 + 'px', mxUtils.write(Ma, mxResources.get(ta, null, ta)), wa.appendChild(Ma), pa.appendChild(wa), za.appendChild(pa), oa.appendChild(za), la.appendChild(oa), sa && F(la), mxEvent.addGestureListeners(la, mxUtils.bind(this, function(Ha) {
        F(la, null, null, ka, ca);
      }), null, null), null != ma ? mxEvent.addListener(la, 'click', ma) : (mxEvent.addListener(la, 'click', function(Ha) {
        F(la, null, null, ka, ca);
      }), mxEvent.addListener(la, 'dblclick', function(Ha) {
        C();
        mxEvent.consume(Ha);
      }));
    if (null != ka) {
      var Ua = document.createElement('img');
      Ua.setAttribute('src', Sidebar.prototype.searchImage);
      Ua.setAttribute('title', mxResources.get('preview'));
      Ua.className = 'geActiveButton';
      Ua.style.position = 'absolute';
      Ua.style.cursor = 'default';
      Ua.style.padding = '8px';
      Ua.style.right = '0px';
      Ua.style.top = '0px';
      la.appendChild(Ua);
      var Xa = !1;
      mxEvent.addGestureListeners(Ua, mxUtils.bind(this, function(Ha) {
        Xa = b.sidebar.currentElt == la;
      }), null, null);
      mxEvent.addListener(Ua, 'click', mxUtils.bind(this, function(Ha) {
        Xa || Ba(Ha, Ua);
        mxEvent.consume(Ha);
      }));
    }
    aa.appendChild(la);
    return la;
  }

  function l() {
    function ka(Ba, la) {
      var Qa = mxResources.get(Ba);
      null == Qa && (Qa = Ba.substring(0, 1).toUpperCase() + Ba.substring(1));
      18 < Qa.length && (Qa = Qa.substring(0, 18) + '&hellip;');
      return Qa + ' (' + la.length + ')';
    }

    function xa(Ba, la, Qa) {
      mxEvent.addListener(la, 'click', function() {
        Ka != la && (Ka.style.backgroundColor = '', Ka = la, Ka.style.backgroundColor = t, aa.scrollTop = 0, aa.innerText = '', I = 0, ra = Qa ? ja[Ba][Qa] : va[Ba], W = null, x(!1));
      });
    }
    Ca && (Ca = !1, mxEvent.addListener(aa, 'scroll', function(Ba) {
      aa.scrollTop + aa.clientHeight >= aa.scrollHeight && (x(), mxEvent.consume(Ba));
    }));
    if (0 < Da) {
      var ta = document.createElement('div');
      ta.style.cssText = 'font-weight: bold;background: #f9f9f9;padding: 5px 0 5px 0;text-align: center;';
      mxUtils.write(ta, mxResources.get('custom'));
      ia.appendChild(ta);
      for (var oa in Ga) {
        var sa = document.createElement('div'),
          za = oa;
        ta = Ga[oa];
        18 < za.length && (za = za.substring(0, 18) + '&hellip;');
        sa.style.cssText = 'display:block;cursor:pointer;padding:6px;white-space:nowrap;margin-bottom:-1px;overflow:hidden;text-overflow:ellipsis;user-select:none;';
        sa.setAttribute('title', za + ' (' + ta.length + ')');
        mxUtils.write(sa, sa.getAttribute('title'));
        null != z && (sa.style.padding = z);
        ia.appendChild(sa);
        (function(Ba, la) {
          mxEvent.addListener(sa, 'click', function() {
            Ka != la && (Ka.style.backgroundColor = '', Ka = la, Ka.style.backgroundColor = t, aa.scrollTop = 0, aa.innerText = '', I = 0, ra = Ga[Ba], W = null, x(!1));
          });
        }(oa, sa));
      }
      ta = document.createElement('div');
      ta.style.cssText = 'font-weight: bold;background: #f9f9f9;padding: 5px 0 5px 0;text-align: center;';
      mxUtils.write(ta, 'draw.io');
      ia.appendChild(ta);
    }
    for (oa in va) {
      za = ja[oa];
      var ca = sa = document.createElement(za ? 'ul' : 'div');
      ta = va[oa];
      var ma = ka(oa, ta);
      if (null != za) {
        var pa = document.createElement('li'),
          wa = document.createElement('div');
        wa.className = 'geTempTreeCaret';
        wa.setAttribute('title', ma);
        mxUtils.write(wa, ma);
        ca = wa;
        pa.appendChild(wa);
        ma = document.createElement('ul');
        ma.className = 'geTempTreeNested';
        ma.style.visibility = 'hidden';
        for (var Fa in za) {
          var Ea = document.createElement('li'),
            ya = ka(Fa, za[Fa]);
          Ea.setAttribute('title', ya);
          mxUtils.write(Ea, ya);
          xa(oa, Ea, Fa);
          ma.appendChild(Ea);
        }
        pa.appendChild(ma);
        sa.className = 'geTempTree';
        sa.appendChild(pa);
        (function(Ba, la) {
          mxEvent.addListener(la, 'click', function() {
            Ba.style.visibility = 'visible';
            Ba.classList.toggle('geTempTreeActive');
            Ba.classList.toggle('geTempTreeNested') && setTimeout(function() {
              Ba.style.visibility = 'hidden';
            }, 550);
            la.classList.toggle('geTempTreeCaret-down');
          });
        }(ma, wa));
      } else
        sa.style.cssText = 'display:block;cursor:pointer;padding:6px;white-space:nowrap;margin-bottom:-1px;overflow:hidden;text-overflow:ellipsis;user-select:none;transition: all 0.5s;', sa.setAttribute('title', ma), mxUtils.write(sa, ma);
      null != z && (sa.style.padding = z);
      ia.appendChild(sa);
      null == Ka && 0 < ta.length && (Ka = sa, Ka.style.backgroundColor = t, ra = ta);
      xa(oa, ca);
    }
    x(!1);
  }
  var q = 500 > (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  f = null != f ? f : !0;
  k = null != k ? k : !1;
  t = null != t ? t : '#ebf2f9';
  y = null != y ? y : Editor.isDarkMode() ? Editor.darkColor : '#e6eff8';
  E = null != E ? E : Editor.isDarkMode() ? '1px dashed #00a8ff' : '1px solid #ccd9ea';
  D = null != D ? D : EditorUi.templateFile;
  var A = document.createElement('div');
  A.style.userSelect = 'none';
  A.style.height = '100%';
  var H = document.createElement('div');
  H.style.whiteSpace = 'nowrap';
  H.style.height = '46px';
  f && A.appendChild(H);
  var K = document.createElement('img');
  K.setAttribute('border', '0');
  K.setAttribute('align', 'absmiddle');
  K.style.width = '40px';
  K.style.height = '40px';
  K.style.marginRight = '10px';
  K.style.paddingBottom = '4px';
  K.src = b.mode == App.MODE_GOOGLE ? IMAGE_PATH + '/google-drive-logo.svg' : b.mode == App.MODE_DROPBOX ? IMAGE_PATH + '/dropbox-logo.svg' : b.mode == App.MODE_ONEDRIVE ? IMAGE_PATH + '/onedrive-logo.svg' : b.mode == App.MODE_GITHUB ? IMAGE_PATH + '/github-logo.svg' : b.mode == App.MODE_GITLAB ? IMAGE_PATH + '/gitlab-logo.svg' : b.mode == App.MODE_TRELLO ? IMAGE_PATH + '/trello-logo.svg' : b.mode == App.MODE_BROWSER ? IMAGE_PATH + '/osa_database.png' : IMAGE_PATH + '/osa_drive-harddisk.png';
  e || q || !f || H.appendChild(K);
  f && mxUtils.write(H, (q ? mxResources.get('name') : null == b.mode || b.mode == App.MODE_GOOGLE || b.mode == App.MODE_BROWSER ? mxResources.get('diagramName') : mxResources.get('filename')) + ':');
  K = '.drawio';
  b.mode == App.MODE_GOOGLE && null != b.drive ? K = b.drive.extension : b.mode == App.MODE_DROPBOX && null != b.dropbox ? K = b.dropbox.extension : b.mode == App.MODE_ONEDRIVE && null != b.oneDrive ? K = b.oneDrive.extension : b.mode == App.MODE_GITHUB && null != b.gitHub ? K = b.gitHub.extension : b.mode == App.MODE_GITLAB && null != b.gitLab ? K = b.gitLab.extension : b.mode == App.MODE_TRELLO && null != b.trello && (K = b.trello.extension);
  var M = document.createElement('input');
  M.setAttribute('value', b.defaultFilename + K);
  M.style.marginLeft = '10px';
  M.style.width = e || q ? '144px' : '244px';
  this.init = function() {
    f && (M.focus(), mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? M.select() : document.execCommand('selectAll', !1, null));
    null != aa.parentNode && null != aa.parentNode.parentNode && mxEvent.addGestureListeners(aa.parentNode.parentNode, mxUtils.bind(this, function(ka) {
      b.sidebar.hideTooltip();
    }), null, null);
  };
  f && (H.appendChild(M), u ? M.style.width = e || q ? '350px' : '450px' : (null != b.editor.diagramFileTypes && (u = FilenameDialog.createFileTypes(b, M, b.editor.diagramFileTypes), u.style.marginLeft = '6px', u.style.width = e || q ? '80px' : '180px', H.appendChild(u)), null != b.editor.fileExtensions && (q = FilenameDialog.createTypeHint(b, M, b.editor.fileExtensions), q.style.marginTop = '12px', H.appendChild(q))));
  H = !1;
  var I = 0,
    Q = new Spinner({
      lines: 12,
      length: 10,
      width: 5,
      radius: 10,
      rotate: 0,
      color: '#000',
      speed: 1.5,
      trail: 60,
      shadow: !1,
      hwaccel: !1,
      top: '40%',
      zIndex: 2000000000
    }),
    P = mxUtils.button(n || mxResources.get('create'), function() {
      P.setAttribute('disabled', 'disabled');
      C();
      P.removeAttribute('disabled');
    });
  P.className = 'geBtn gePrimaryBtn';
  if (J || G) {
    var O = [],
      W = null,
      p = null,
      B = null,
      N = function(ka) {
        P.setAttribute('disabled', 'disabled');
        for (var xa = 0; xa < O.length; xa++)
          O[xa].className = xa == ka ? 'geBtn gePrimaryBtn' : 'geBtn';
      };
    H = !0;
    n = document.createElement('div');
    n.style.whiteSpace = 'nowrap';
    n.style.height = '30px';
    A.appendChild(n);
    q = mxUtils.button(mxResources.get('Templates', null, 'Templates'), function() {
      ia.style.display = '';
      fa.style.display = '';
      aa.style.left = '160px';
      N(0);
      aa.scrollTop = 0;
      aa.innerText = '';
      I = 0;
      W != ra && (ra = W, va = p, Da = B, ia.innerText = '', l(), W = null);
    });
    O.push(q);
    n.appendChild(q);
    var S = function(ka) {
      ia.style.display = 'none';
      fa.style.display = 'none';
      aa.style.left = '30px';
      N(ka ? -1 : 1);
      null == W && (W = ra);
      aa.scrollTop = 0;
      aa.innerText = '';
      Q.spin(aa);
      var xa = function(ta, oa, sa) {
        I = 0;
        Q.stop();
        ra = ta;
        sa = sa || {};
        var za = 0,
          ca;
        for (ca in sa)
          za += sa[ca].length;
        if (oa)
          aa.innerText = oa;
        else if (0 == ta.length && 0 == za)
          aa.innerText = mxResources.get('noDiagrams', null, 'No Diagrams Found');
        else if (aa.innerText = '', 0 < za) {
          ia.style.display = '';
          aa.style.left = '160px';
          ia.innerText = '';
          Da = 0;
          va = {
            'draw.io': ta
          };
          for (ca in sa)
            va[ca] = sa[ca];
          l();
        } else
          x(!0);
      };
      ka ? G(R.value, xa) : J(xa);
    };
    J && (q = mxUtils.button(mxResources.get('Recent', null, 'Recent'), function() {
      S();
    }), n.appendChild(q), O.push(q));
    if (G) {
      q = document.createElement('span');
      q.style.marginLeft = '10px';
      q.innerText = mxResources.get('search') + ':';
      n.appendChild(q);
      var R = document.createElement('input');
      R.style.marginRight = '10px';
      R.style.marginLeft = '10px';
      R.style.width = '220px';
      mxEvent.addListener(R, 'keypress', function(ka) {
        13 == ka.keyCode && S(!0);
      });
      n.appendChild(R);
      q = mxUtils.button(mxResources.get('search'), function() {
        S(!0);
      });
      q.className = 'geBtn';
      n.appendChild(q);
    }
    N(0);
  }
  var V = null,
    T = null,
    U = null,
    X = null,
    Z = null,
    Y = null,
    ea = null,
    aa = document.createElement('div');
  aa.style.border = '1px solid #d3d3d3';
  aa.style.position = 'absolute';
  aa.style.left = '160px';
  aa.style.right = '34px';
  n = (f ? 72 : 40) + (H ? 30 : 0);
  aa.style.top = n + 'px';
  aa.style.bottom = '68px';
  aa.style.margin = '6px 0 0 -1px';
  aa.style.padding = '6px';
  aa.style.overflow = 'auto';
  var fa = document.createElement('div');
  fa.style.cssText = 'position:absolute;left:30px;width:128px;top:' + n + 'px;height:22px;margin-top: 6px;white-space: nowrap';
  var da = document.createElement('input');
  da.style.cssText = 'width:105px;height:16px;border:1px solid #d3d3d3;padding: 3px 20px 3px 3px;font-size: 12px';
  da.setAttribute('placeholder', mxResources.get('search'));
  da.setAttribute('type', 'text');
  fa.appendChild(da);
  var ba = document.createElement('img'),
    na = 'undefined' != typeof Sidebar ? Sidebar.prototype.searchImage : IMAGE_PATH + '/search.png';
  ba.setAttribute('src', na);
  ba.setAttribute('title', mxResources.get('search'));
  ba.style.position = 'relative';
  ba.style.left = '-18px';
  ba.style.top = '1px';
  ba.style.background = 'url(\'' + b.editor.transparentImage + '\')';
  fa.appendChild(ba);
  mxEvent.addListener(ba, 'click', function() {
    ba.getAttribute('src') == Dialog.prototype.closeImage && (ba.setAttribute('src', na), ba.setAttribute('title', mxResources.get('search')), da.value = '', null != ha && (ha.click(), ha = null));
    da.focus();
  });
  mxEvent.addListener(da, 'keydown', mxUtils.bind(this, function(ka) {
    if (13 == ka.keyCode) {
      var xa = da.value;
      if ('' == xa)
        null != ha && (ha.click(), ha = null);
      else {
        if (null == NewDialog.tagsList[D]) {
          var ta = {};
          for (Fa in va)
            for (var oa = va[Fa], sa = 0; sa < oa.length; sa++) {
              var za = oa[sa];
              if (null != za.tags)
                for (var ca = za.tags.toLowerCase().split(';'), ma = 0; ma < ca.length; ma++)
                  null == ta[ca[ma]] && (ta[ca[ma]] = []), ta[ca[ma]].push(za);
            }
          NewDialog.tagsList[D] = ta;
        }
        var pa = xa.toLowerCase().split(' ');
        ta = NewDialog.tagsList[D];
        if (0 < Da && null == ta.__tagsList__) {
          for (Fa in Ga)
            for (oa = Ga[Fa], sa = 0; sa < oa.length; sa++)
              for (za = oa[sa], ca = za.title.split(' '), ca.push(Fa), ma = 0; ma < ca.length; ma++) {
                var wa = ca[ma].toLowerCase();
                null == ta[wa] && (ta[wa] = []);
                ta[wa].push(za);
              }
          ta.__tagsList__ = !0;
        }
        var Fa = [];
        oa = {};
        for (sa = ca = 0; sa < pa.length; sa++)
          if (0 < pa[sa].length) {
            wa = ta[pa[sa]];
            var Ea = {};
            Fa = [];
            if (null != wa)
              for (ma = 0; ma < wa.length; ma++)
                za = wa[ma], 0 == ca == (null == oa[za.url]) && (Ea[za.url] = !0, Fa.push(za));
            oa = Ea;
            ca++;
          }
        aa.scrollTop = 0;
        aa.innerText = '';
        I = 0;
        ta = document.createElement('div');
        ta.style.cssText = 'border: 1px solid #D3D3D3; padding: 6px; background: #F5F5F5;';
        mxUtils.write(ta, mxResources.get(0 == Fa.length ? 'noResultsFor' : 'resultsFor', [xa]));
        aa.appendChild(ta);
        null != Ka && null == ha && (Ka.style.backgroundColor = '', ha = Ka, Ka = ta);
        ra = Fa;
        W = null;
        x(!1);
      }
      mxEvent.consume(ka);
    }
  }));
  mxEvent.addListener(da, 'keyup', mxUtils.bind(this, function(ka) {
    '' == da.value ? (ba.setAttribute('src', na), ba.setAttribute('title', mxResources.get('search'))) : (ba.setAttribute('src', Dialog.prototype.closeImage), ba.setAttribute('title', mxResources.get('reset')));
  }));
  n += 23;
  var ia = document.createElement('div');
  ia.style.cssText = 'position:absolute;left:30px;width:128px;top:' + n + 'px;bottom:68px;margin-top:6px;overflow:auto;border:1px solid #d3d3d3;';
  mxEvent.addListener(aa, 'scroll', function() {
    b.sidebar.hideTooltip();
  });
  var qa = 140,
    Aa = 140,
    va = {},
    ja = {},
    Ga = {},
    Da = 0,
    Ca = !0,
    Ka = null,
    ha = null;
  va.basic = [{
    title: 'blankDiagram',
    select: !0
  }];
  var ra = va.basic;
  if (!e) {
    var ua = function() {
      mxUtils.get(Ia, function(ka) {
        if (!La) {
          La = !0;
          ka = ka.getXml().documentElement.firstChild;
          for (var xa = {}; null != ka;) {
            if ('undefined' !== typeof ka.getAttribute)
              if ('clibs' == ka.nodeName) {
                for (var ta = ka.getAttribute('name'), oa = ka.getElementsByTagName('add'), sa = [], za = 0; za < oa.length; za++)
                  sa.push(encodeURIComponent(mxUtils.getTextContent(oa[za])));
                null != ta && 0 < sa.length && (xa[ta] = sa.join(';'));
              } else if (sa = ka.getAttribute('url'), null != sa) {
              oa = ka.getAttribute('section');
              ta = ka.getAttribute('subsection');
              if (null == oa && (za = sa.indexOf('/'), oa = sa.substring(0, za), null == ta)) {
                var ca = sa.indexOf('/', za + 1); -
                1 < ca && (ta = sa.substring(za + 1, ca));
              }
              za = va[oa];
              null == za && (za = [], va[oa] = za);
              sa = ka.getAttribute('clibs');
              null != xa[sa] && (sa = xa[sa]);
              sa = {
                url: ka.getAttribute('url'),
                libs: ka.getAttribute('libs'),
                title: ka.getAttribute('title'),
                tooltip: ka.getAttribute('name') || ka.getAttribute('url'),
                preview: ka.getAttribute('preview'),
                clibs: sa,
                tags: ka.getAttribute('tags')
              };
              za.push(sa);
              null != ta && (za = ja[oa], null == za && (za = {}, ja[oa] = za), oa = za[ta], null == oa && (oa = [], za[ta] = oa), oa.push(sa));
            }
            ka = ka.nextSibling;
          }
          Q.stop();
          l();
        }
      });
    };
    A.appendChild(fa);
    A.appendChild(ia);
    A.appendChild(aa);
    var La = !1,
      Ia = D;
    /^https?:\/\//.test(Ia) && !b.editor.isCorsEnabledForUrl(Ia) && (Ia = PROXY_URL + '?url=' + encodeURIComponent(Ia));
    Q.spin(aa);
    null != v ? v(function(ka, xa) {
      Ga = ka;
      B = Da = xa;
      ua();
    }, ua) : ua();
    p = va;
  }
  mxEvent.addListener(M, 'keypress', function(ka) {
    b.dialog.container.firstChild == A && 13 == ka.keyCode && C();
  });
  v = document.createElement('div');
  v.style.marginTop = e ? '4px' : '16px';
  v.style.textAlign = 'right';
  v.style.position = 'absolute';
  v.style.left = '40px';
  v.style.bottom = '24px';
  v.style.right = '40px';
  e || b.isOffline() || !f || null != c || k || (n = mxUtils.button(mxResources.get('help'), function() {
    b.openLink('https://support.draw.io/display/DO/Creating+and+Opening+Files');
  }), n.className = 'geBtn', v.appendChild(n));
  n = mxUtils.button(mxResources.get('cancel'), function() {
    null != m && m();
    b.hideDialog(!0);
  });
  n.className = 'geBtn';
  !b.editor.cancelFirst || k && null == m || v.appendChild(n);
  e || '1' == urlParams.embed || k || mxClient.IS_ANDROID || mxClient.IS_IOS || '1' == urlParams.noDevice || (e = mxUtils.button(mxResources.get('fromTemplateUrl'), function() {
    var ka = new FilenameDialog(b, '', mxResources.get('create'), function(xa) {
      null != xa && 0 < xa.length && b.editor.loadUrl(b.editor.getProxiedUrl(xa), function(ta) {
        U = ta;
        V = null;
        templateRealURl = xa;
        b.hideDialog();
        C();
      }, function(ta) {
        b.handleError(ta);
      });
    }, mxResources.get('url'), null, null, null, !1);
    b.showDialog(ka.container, 300, 80, !0, !0);
    ka.init();
  }), e.className = 'geBtn', v.appendChild(e));
  Graph.fileSupport && g && (g = mxUtils.button(mxResources.get('import'), function() {
    if (null == b.newDlgFileInputElt) {
      var ka = document.createElement('input');
      ka.setAttribute('multiple', 'multiple');
      ka.setAttribute('type', 'file');
      mxEvent.addListener(ka, 'change', function(xa) {
        b.openFiles(ka.files, !0);
        ka.value = '';
      });
      ka.style.display = 'none';
      document.body.appendChild(ka);
      b.newDlgFileInputElt = ka;
    }
    b.newDlgFileInputElt.click();
  }), g.className = 'geBtn', v.appendChild(g));
  v.appendChild(P);
  b.editor.cancelFirst || null != c || k && null == m || v.appendChild(n);
  A.appendChild(v);
  this.container = A;
};
NewDialog.tagsList = {};