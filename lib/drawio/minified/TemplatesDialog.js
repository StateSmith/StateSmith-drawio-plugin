var TemplatesDialog = function(b, e, f, c, k, m, t, y, E, z, D, J, G, d, g) {
  function n(ca) {
    Ca.innerText = ca;
    Ca.style.display = 'block';
    setTimeout(function() {
      Ca.style.display = 'none';
    }, 4000);
  }

  function v() {
    null != B && (B.style.fontWeight = 'normal', B.style.textDecoration = 'none', N = B, B = null);
  }

  function u(ca, ma, pa, wa, Fa, Ea, ya) {
    if (-1 < ca.className.indexOf('geTempDlgRadioBtnActive'))
      return !1;
    ca.className += ' geTempDlgRadioBtnActive';
    O.querySelector('.geTempDlgRadioBtn[data-id=' + wa + ']').className = 'geTempDlgRadioBtn ' + (ya ? 'geTempDlgRadioBtnLarge' : 'geTempDlgRadioBtnSmall');
    O.querySelector('.' + ma).src = '/images/' + pa + '-sel.svg';
    O.querySelector('.' + Fa).src = '/images/' + Ea + '.svg';
    return !0;
  }

  function x(ca, ma, pa, wa) {
    function Fa(la, Qa) {
      null == ya ? (la = /^https?:\/\//.test(la) && !b.editor.isCorsEnabledForUrl(la) ? PROXY_URL + '?url=' + encodeURIComponent(la) : TEMPLATE_PATH + '/' + la, mxUtils.get(la, mxUtils.bind(this, function(Sa) {
        200 <= Sa.getStatus() && 299 >= Sa.getStatus() && (ya = Sa.getText());
        Qa(ya);
      }))) : Qa(ya);
    }

    function Ea(la, Qa, Sa) {
      if (null != la && mxUtils.isAncestorNode(document.body, ma) && (la = mxUtils.parseXml(la), la = Editor.extractGraphModel(la.documentElement, !0), null != la)) {
        'mxfile' == la.nodeName && (la = Editor.parseDiagramNode(la.getElementsByTagName('diagram')[0]));
        var Ja = new mxCodec(la.ownerDocument),
          Oa = new mxGraphModel();
        Ja.decode(la, Oa);
        la = Oa.root.getChildAt(0).children || [];
        b.sidebar.createTooltip(ma, la, Math.min((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 80, 1000), Math.min((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 80, 800), null != ca.title ? mxResources.get(ca.title, null, ca.title) : null, !0, new mxPoint(Qa, Sa), !0, null, !0);
        var Pa = document.createElement('div');
        Pa.className = 'geTempDlgDialogMask';
        O.appendChild(Pa);
        var Ra = b.sidebar.hideTooltip;
        b.sidebar.hideTooltip = function() {
          Pa && (O.removeChild(Pa), Pa = null, Ra.apply(this, arguments), b.sidebar.hideTooltip = Ra);
        };
        mxEvent.addListener(Pa, 'click', function() {
          b.sidebar.hideTooltip();
        });
      }
    }
    var ya = null;
    if (ha || b.sidebar.currentElt == ma)
      b.sidebar.hideTooltip();
    else {
      var Ba = function(la) {
        ha && b.sidebar.currentElt == ma && Ea(la, mxEvent.getClientX(wa), mxEvent.getClientY(wa));
        ha = !1;
        pa.src = '/images/icon-search.svg';
      };
      b.sidebar.hideTooltip();
      b.sidebar.currentElt = ma;
      ha = !0;
      pa.src = '/images/aui-wait.gif';
      ca.isExt ? E(ca, Ba, function() {
        n(mxResources.get('cantLoadPrev'));
        ha = !1;
        pa.src = '/images/icon-search.svg';
      }) : Fa(ca.url, Ba);
    }
  }

  function C(ca, ma, pa) {
    if (null != S) {
      for (var wa = S.className.split(' '), Fa = 0; Fa < wa.length; Fa++)
        if (-1 < wa[Fa].indexOf('Active')) {
          wa.splice(Fa, 1);
          break;
        }
      S.className = wa.join(' ');
    }
    null != ca ? (S = ca, S.className += ' ' + ma, R = pa, ja.className = 'geTempDlgCreateBtn') : (R = S = null, ja.className = 'geTempDlgCreateBtn geTempDlgBtnDisabled');
  }

  function F(ca, ma) {
    if (null != R) {
      var pa = function(Ba) {
          ya.isExternal ? E(ya, function(la) {
            wa(la, Ba);
          }, Fa) : ya.url ? mxUtils.get(TEMPLATE_PATH + '/' + ya.url, mxUtils.bind(this, function(la) {
            200 <= la.getStatus() && 299 >= la.getStatus() ? wa(la.getText(), Ba) : Fa();
          })) : wa(b.emptyDiagramXml, Ba);
        },
        wa = function(Ba, la) {
          g || b.hideDialog(!0);
          e(Ba, la, ya, ma);
        },
        Fa = function() {
          n(mxResources.get('cannotLoad'));
          Ea();
        },
        Ea = function() {
          R = ya;
          ja.className = 'geTempDlgCreateBtn';
          ma && (Ga.className = 'geTempDlgOpenBtn');
        },
        ya = R;
      R = null;
      'boolean' !== typeof ma && (ma = ya.isExternal && J);
      1 == ca ? z(ya.url, ya) : ma ? (Ga.className = 'geTempDlgOpenBtn geTempDlgBtnDisabled geTempDlgBtnBusy', pa()) : (ja.className = 'geTempDlgCreateBtn geTempDlgBtnDisabled geTempDlgBtnBusy', ca = null == b.mode || b.mode == App.MODE_GOOGLE || b.mode == App.MODE_BROWSER ? mxResources.get('diagramName') : mxResources.get('filename'), ca = new FilenameDialog(b, b.defaultFilename + '.drawio', mxResources.get('ok'), pa, ca, function(Ba) {
        var la = null != Ba && 0 < Ba.length;
        return la && g ? (pa(Ba), !1) : la;
      }, null, null, null, Ea, d ? null : []), b.showDialog(ca.container, 350, 80, !0, !0), ca.init());
    }
  }

  function L(ca) {
    ja.innerText = mxResources.get(aa || ca ? 'create' : 'copy');
    ca = ca ? 'none' : '';
    J && (Ga.style.display = ca);
    for (var ma = O.querySelectorAll('.geTempDlgLinkToDiagram'), pa = 0; pa < ma.length; pa++)
      ma[pa].style.display = ca;
  }

  function l(ca, ma, pa, wa, Fa) {
    Fa || (da.innerText = '', C(), X = ca, Z = wa);
    var Ea = null;
    if (pa) {
      Ea = document.createElement('table');
      Ea.className = 'geTempDlgDiagramsListGrid';
      var ya = document.createElement('tr'),
        Ba = document.createElement('th');
      Ba.style.width = '50%';
      Ba.innerText = mxResources.get('diagram');
      ya.appendChild(Ba);
      Ba = document.createElement('th');
      Ba.style.width = '25%';
      Ba.innerText = mxResources.get('changedBy');
      ya.appendChild(Ba);
      Ba = document.createElement('th');
      Ba.style.width = '25%';
      Ba.innerText = mxResources.get('lastModifiedOn');
      ya.appendChild(Ba);
      Ea.appendChild(ya);
      da.appendChild(Ea);
    }
    for (ya = 0; ya < ca.length; ya++) {
      ca[ya].isExternal = !ma;
      var la = ca[ya].url,
        Qa = (Ba = mxUtils.htmlEntities(ma ? mxResources.get(ca[ya].title, null, ca[ya].title) : ca[ya].title)) || ca[ya].url,
        Sa = ca[ya].imgUrl,
        Ja = ca[ya].changedBy || '',
        Oa = '';
      ca[ya].lastModifiedOn && (Oa = b.timeSince(new Date(ca[ya].lastModifiedOn)), null == Oa && (Oa = mxResources.get('lessThanAMinute')), Oa = mxResources.get('timeAgo', [Oa], '{1} ago'));
      Sa || (Sa = TEMPLATE_PATH + '/' + la.substring(0, la.length - 4) + '.png');
      la = pa ? 50 : 15;
      null != Ba && Ba.length > la && (Ba = Ba.substring(0, la) + '&hellip;');
      if (pa) {
        var Pa = document.createElement('tr');
        Sa = document.createElement('td');
        var Ra = document.createElement('img');
        Ra.src = '/images/icon-search.svg';
        Ra.className = 'geTempDlgDiagramListPreviewBtn';
        Ra.setAttribute('title', mxResources.get('preview'));
        Fa || Sa.appendChild(Ra);
        Qa = document.createElement('span');
        Qa.className = 'geTempDlgDiagramTitle';
        Qa.innerHTML = Ba;
        Sa.appendChild(Qa);
        Pa.appendChild(Sa);
        Sa = document.createElement('td');
        Sa.innerText = Ja;
        Pa.appendChild(Sa);
        Sa = document.createElement('td');
        Sa.innerText = Oa;
        Pa.appendChild(Sa);
        Ea.appendChild(Pa);
        null == S && (L(ma), C(Pa, 'geTempDlgDiagramsListGridActive', ca[ya]));
        (function(Ha, Na, Ta) {
          mxEvent.addListener(Pa, 'click', function() {
            S != Na && (L(ma), C(Na, 'geTempDlgDiagramsListGridActive', Ha));
          });
          mxEvent.addListener(Pa, 'dblclick', F);
          mxEvent.addListener(Ra, 'click', function(Wa) {
            x(Ha, Na, Ta, Wa);
          });
        }(ca[ya], Pa, Ra));
      } else {
        var Ma = document.createElement('div');
        Ma.className = 'geTempDlgDiagramTile';
        Ma.setAttribute('title', Qa);
        null == S && (L(ma), C(Ma, 'geTempDlgDiagramTileActive', ca[ya]));
        Ja = document.createElement('div');
        Ja.className = 'geTempDlgDiagramTileImg geTempDlgDiagramTileImgLoading';
        var Ua = document.createElement('img');
        Ua.style.display = 'none';
        (function(Ha, Na, Ta) {
          Ua.onload = function() {
            Na.className = 'geTempDlgDiagramTileImg';
            Ha.style.display = '';
          };
          Ua.onerror = function() {
            this.src != Ta ? this.src = Ta : Na.className = 'geTempDlgDiagramTileImg geTempDlgDiagramTileImgError';
          };
        }(Ua, Ja, Sa ? Sa.replace('.drawio.xml', '').replace('.drawio', '').replace('.xml', '') : ''));
        Ua.src = Sa;
        Ja.appendChild(Ua);
        Ma.appendChild(Ja);
        Ja = document.createElement('div');
        Ja.className = 'geTempDlgDiagramTileLbl';
        Ja.innerHTML = null != Ba ? Ba : '';
        Ma.appendChild(Ja);
        Ra = document.createElement('img');
        Ra.src = '/images/icon-search.svg';
        Ra.className = 'geTempDlgDiagramPreviewBtn';
        Ra.setAttribute('title', mxResources.get('preview'));
        Fa || Ma.appendChild(Ra);
        (function(Ha, Na, Ta) {
          mxEvent.addListener(Ma, 'click', function() {
            S != Na && (L(ma), C(Na, 'geTempDlgDiagramTileActive', Ha));
          });
          mxEvent.addListener(Ma, 'dblclick', F);
          mxEvent.addListener(Ra, 'click', function(Wa) {
            x(Ha, Na, Ta, Wa);
          });
        }(ca[ya], Ma, Ra));
        da.appendChild(Ma);
      }
    }
    for (var Xa in wa)
      ca = wa[Xa], 0 < ca.length && (Fa = document.createElement('div'), Fa.className = 'geTempDlgImportCat', Fa.innerText = mxResources.get(Xa, null, Xa), da.appendChild(Fa), l(ca, ma, pa, null, !0));
  }

  function q(ca, ma) {
    va.innerText = '';
    C();
    var pa = Math.floor(va.offsetWidth / 150) - 1;
    ma = !ma && ca.length > pa ? pa : ca.length;
    for (var wa = 0; wa < ma; wa++) {
      var Fa = ca[wa];
      Fa.isCategory = !0;
      var Ea = document.createElement('div'),
        ya = mxResources.get(Fa.title);
      null == ya && (ya = Fa.title.substring(0, 1).toUpperCase() + Fa.title.substring(1));
      Ea.className = 'geTempDlgNewDiagramCatItem';
      Ea.setAttribute('title', ya);
      ya = mxUtils.htmlEntities(ya);
      15 < ya.length && (ya = ya.substring(0, 15) + '&hellip;');
      null == S && (L(!0), C(Ea, 'geTempDlgNewDiagramCatItemActive', Fa));
      var Ba = document.createElement('div');
      Ba.className = 'geTempDlgNewDiagramCatItemImg';
      var la = document.createElement('img');
      la.src = NEW_DIAGRAM_CATS_PATH + '/' + Fa.img;
      Ba.appendChild(la);
      Ea.appendChild(Ba);
      Ba = document.createElement('div');
      Ba.className = 'geTempDlgNewDiagramCatItemLbl';
      Ba.innerHTML = ya;
      Ea.appendChild(Ba);
      va.appendChild(Ea);
      (function(Qa, Sa) {
        mxEvent.addListener(Ea, 'click', function() {
          S != Sa && (L(!0), C(Sa, 'geTempDlgNewDiagramCatItemActive', Qa));
        });
        mxEvent.addListener(Ea, 'dblclick', F);
      }(Fa, Ea));
    }
    Ea = document.createElement('div');
    Ea.className = 'geTempDlgNewDiagramCatItem';
    ya = mxResources.get('showAllTemps');
    Ea.setAttribute('title', ya);
    Ba = document.createElement('div');
    Ba.className = 'geTempDlgNewDiagramCatItemImg';
    Ba.innerText = '...';
    Ba.style.fontSize = '32px';
    Ea.appendChild(Ba);
    Ba = document.createElement('div');
    Ba.className = 'geTempDlgNewDiagramCatItemLbl';
    Ba.innerText = ya;
    Ea.appendChild(Ba);
    va.appendChild(Ea);
    mxEvent.addListener(Ea, 'click', function() {
      function Qa() {
        var Ja = Sa.querySelector('.geTemplateDrawioCatLink');
        null != Ja ? Ja.click() : setTimeout(Qa, 200);
      }
      aa = !0;
      var Sa = O.querySelector('.geTemplatesList');
      Sa.style.display = 'block';
      ia.style.width = '';
      Da.style.display = '';
      Da.value = '';
      Y = null;
      Qa();
    });
    fa.style.display = ca.length <= pa ? 'none' : '';
  }

  function A(ca, ma, pa) {
    function wa(Ua, Xa) {
      var Ha = mxResources.get(Ua);
      null == Ha && (Ha = Ua.substring(0, 1).toUpperCase() + Ua.substring(1));
      Ua = Ha + ' (' + Xa.length + ')';
      var Na = Ha = mxUtils.htmlEntities(Ha);
      15 < Ha.length && (Ha = Ha.substring(0, 15) + '&hellip;');
      return {
        lbl: Ha + ' (' + Xa.length + ')',
        fullLbl: Ua,
        lblOnly: Na
      };
    }

    function Fa(Ua, Xa, Ha, Na, Ta) {
      mxEvent.addListener(Ha, 'click', function() {
        B != Ha && (null != B ? (B.style.fontWeight = 'normal', B.style.textDecoration = 'none') : (Aa.style.display = 'none', qa.style.minHeight = '100%'), B = Ha, B.style.fontWeight = 'bold', B.style.textDecoration = 'underline', ia.scrollTop = 0, W && (p = !0), ba.innerHTML = Xa, na.style.display = 'none', l(Ta ? ma[Ua] : Na ? Ia[Ua][Na] : ca[Ua], Ta ? !1 : !0));
      });
    }
    var Ea = O.querySelector('.geTemplatesList');
    if (0 < pa) {
      pa = document.createElement('div');
      pa.style.cssText = 'font-weight: bold;background: #f9f9f9;padding: 5px 0 5px 0;text-align: center;margin-top: 10px;';
      mxUtils.write(pa, mxResources.get('custom'));
      Ea.appendChild(pa);
      for (var ya in ma) {
        pa = document.createElement('div');
        var Ba = ma[ya];
        Ba = wa(ya, Ba);
        pa.className = 'geTemplateCatLink';
        pa.setAttribute('title', Ba.fullLbl);
        pa.innerHTML = Ba.lbl;
        Ea.appendChild(pa);
        Fa(ya, Ba.lblOnly, pa, null, !0);
      }
      pa = document.createElement('div');
      pa.style.cssText = 'font-weight: bold;background: #f9f9f9;padding: 5px 0 5px 0;text-align: center;margin-top: 10px;';
      mxUtils.write(pa, 'draw.io');
      Ea.appendChild(pa);
    }
    for (ya in ca) {
      var la = Ia[ya],
        Qa = pa = document.createElement(la ? 'ul' : 'div');
      Ba = ca[ya];
      Ba = wa(ya, Ba);
      if (null != la) {
        var Sa = document.createElement('li'),
          Ja = document.createElement('div');
        Ja.className = 'geTempTreeCaret geTemplateCatLink geTemplateDrawioCatLink';
        Ja.style.padding = '0';
        Ja.setAttribute('title', Ba.fullLbl);
        Ja.innerHTML = Ba.lbl;
        Qa = Ja;
        Sa.appendChild(Ja);
        var Oa = document.createElement('ul');
        Oa.className = 'geTempTreeNested';
        Oa.style.visibility = 'hidden';
        for (var Pa in la) {
          var Ra = document.createElement('li'),
            Ma = wa(Pa, la[Pa]);
          Ra.setAttribute('title', Ma.fullLbl);
          Ra.innerHTML = Ma.lbl;
          Ra.className = 'geTemplateCatLink';
          Ra.style.padding = '0';
          Ra.style.margin = '0';
          Fa(ya, Ma.lblOnly, Ra, Pa);
          Oa.appendChild(Ra);
        }
        Sa.appendChild(Oa);
        pa.className = 'geTempTree';
        pa.appendChild(Sa);
        (function(Ua, Xa) {
          mxEvent.addListener(Xa, 'click', function() {
            for (var Ha = Ua.querySelectorAll('li'), Na = 0; Na < Ha.length; Na++)
              Ha[Na].style.margin = '';
            Ua.style.visibility = 'visible';
            Ua.classList.toggle('geTempTreeActive');
            Ua.classList.toggle('geTempTreeNested') && setTimeout(function() {
              for (var Ta = 0; Ta < Ha.length; Ta++)
                Ha[Ta].style.margin = '0';
              Ua.style.visibility = 'hidden';
            }, 250);
            Xa.classList.toggle('geTempTreeCaret-down');
          });
        }(Oa, Ja));
      } else
        pa.className = 'geTemplateCatLink geTemplateDrawioCatLink', pa.setAttribute('title', Ba.fullLbl), pa.innerHTML = Ba.lbl;
      Ea.appendChild(pa);
      Fa(ya, Ba.lblOnly, Qa);
    }
  }

  function H() {
    mxUtils.get(c, function(ca) {
      if (!ra) {
        ra = !0;
        ca = ca.getXml().documentElement.firstChild;
        for (var ma = {}; null != ca;) {
          if ('undefined' !== typeof ca.getAttribute)
            if ('clibs' == ca.nodeName) {
              for (var pa = ca.getAttribute('name'), wa = ca.getElementsByTagName('add'), Fa = [], Ea = 0; Ea < wa.length; Ea++)
                Fa.push(encodeURIComponent(mxUtils.getTextContent(wa[Ea])));
              null != pa && 0 < Fa.length && (ma[pa] = Fa.join(';'));
            } else if (Fa = ca.getAttribute('url'), null != Fa) {
            wa = ca.getAttribute('section');
            pa = ca.getAttribute('subsection');
            if (null == wa && (Ea = Fa.indexOf('/'), wa = Fa.substring(0, Ea), null == pa)) {
              var ya = Fa.indexOf('/', Ea + 1); -
              1 < ya && (pa = Fa.substring(Ea + 1, ya));
            }
            Ea = La[wa];
            null == Ea && (ta++, Ea = [], La[wa] = Ea);
            Fa = ca.getAttribute('clibs');
            null != ma[Fa] && (Fa = ma[Fa]);
            Fa = {
              url: ca.getAttribute('url'),
              libs: ca.getAttribute('libs'),
              title: ca.getAttribute('title') || ca.getAttribute('name'),
              preview: ca.getAttribute('preview'),
              clibs: Fa,
              tags: ca.getAttribute('tags')
            };
            Ea.push(Fa);
            null != pa && (Ea = Ia[wa], null == Ea && (Ea = {}, Ia[wa] = Ea), wa = Ea[pa], null == wa && (wa = [], Ea[pa] = wa), wa.push(Fa));
          }
          ca = ca.nextSibling;
        }
        A(La, ka, oa);
      }
    });
  }

  function K(ca) {
    t && (ia.scrollTop = 0, da.innerText = '', Ka.spin(da), p = !1, W = !0, ba.innerText = mxResources.get('recentDiag'), Y = null, t(sa, function() {
      n(mxResources.get('cannotLoad'));
      sa([]);
    }, ca ? null : m));
  }

  function M(ca) {
    if ('' == ca)
      null != N && (N.click(), N = null);
    else {
      if (null == TemplatesDialog.tagsList[c]) {
        var ma = {};
        for (Qa in La)
          for (var pa = La[Qa], wa = 0; wa < pa.length; wa++) {
            var Fa = pa[wa];
            if (null != Fa.tags)
              for (var Ea = Fa.tags.toLowerCase().split(';'), ya = 0; ya < Ea.length; ya++)
                null == ma[Ea[ya]] && (ma[Ea[ya]] = []), ma[Ea[ya]].push(Fa);
          }
        TemplatesDialog.tagsList[c] = ma;
      }
      var Ba = ca.toLowerCase().split(' ');
      ma = TemplatesDialog.tagsList[c];
      if (0 < oa && null == ma.__tagsList__) {
        for (Qa in ka)
          for (pa = ka[Qa], wa = 0; wa < pa.length; wa++)
            for (Fa = pa[wa], Ea = Fa.title.split(' '), Ea.push(Qa), ya = 0; ya < Ea.length; ya++) {
              var la = Ea[ya].toLowerCase();
              null == ma[la] && (ma[la] = []);
              ma[la].push(Fa);
            }
        ma.__tagsList__ = !0;
      }
      var Qa = [];
      pa = {};
      for (wa = Ea = 0; wa < Ba.length; wa++)
        if (0 < Ba[wa].length) {
          la = ma[Ba[wa]];
          var Sa = {};
          Qa = [];
          if (null != la)
            for (ya = 0; ya < la.length; ya++)
              Fa = la[ya], 0 == Ea == (null == pa[Fa.url]) && (Sa[Fa.url] = !0, Qa.push(Fa));
          pa = Sa;
          Ea++;
        }
      0 == Qa.length ? ba.innerText = mxResources.get('noResultsFor', [ca]) : l(Qa, !0);
    }
  }

  function I(ca) {
    if (Y != ca || T != ea)
      v(), ia.scrollTop = 0, da.innerText = '', ba.innerText = mxResources.get('searchResults') + ' "' + ca + '"', za = null, aa ? M(ca) : y && (ca ? (Ka.spin(da), p = !1, W = !0, y(ca, sa, function() {
        n(mxResources.get('searchFailed'));
        sa([]);
      }, T ? null : m)) : K(T)), Y = ca, ea = T;
  }

  function Q(ca) {
    null != za && clearTimeout(za);
    13 == ca.keyCode ? I(Da.value) : za = setTimeout(function() {
      I(Da.value);
    }, 1000);
  }
  var P = '<div class="geTempDlgHeader"><img src="/images/draw.io-logo.svg" class="geTempDlgHeaderLogo"><input type="search" class="geTempDlgSearchBox" ' + (y ? '' : 'style="display: none"') + ' placeholder="' + mxResources.get('search') + '"></div><div class="geTemplatesList" style="display: none"><div class="geTempDlgBack">&lt; ' + mxResources.get('back') + '</div><div class="geTempDlgHLine"></div><div class="geTemplatesLbl">' + mxResources.get('templates') + '</div></div><div class="geTempDlgContent" style="width: 100%"><div class="geTempDlgNewDiagramCat"><div class="geTempDlgNewDiagramCatLbl">' + mxResources.get('newDiagram') + '</div><div class="geTempDlgNewDiagramCatList"></div><div class="geTempDlgNewDiagramCatFooter"><div class="geTempDlgShowAllBtn">' + mxResources.get('showMore') + '</div></div></div><div class="geTempDlgDiagramsList"><div class="geTempDlgDiagramsListHeader"><div class="geTempDlgDiagramsListTitle"></div><div class="geTempDlgDiagramsListBtns"><div class="geTempDlgRadioBtn geTempDlgRadioBtnLarge" data-id="myDiagramsBtn"><img src="/images/my-diagrams.svg" class="geTempDlgMyDiagramsBtnImg"> <span>' + mxResources.get('myDiagrams') + '</span></div><div class="geTempDlgRadioBtn geTempDlgRadioBtnLarge geTempDlgRadioBtnActive" data-id="allDiagramsBtn"><img src="/images/all-diagrams-sel.svg" class="geTempDlgAllDiagramsBtnImg"> <span>' + mxResources.get('allDiagrams') + '</span></div><div class="geTempDlgSpacer"> </div><div class="geTempDlgRadioBtn geTempDlgRadioBtnSmall geTempDlgRadioBtnActive" data-id="tilesBtn"><img src="/images/tiles-sel.svg" class="geTempDlgTilesBtnImg"></div><div class="geTempDlgRadioBtn geTempDlgRadioBtnSmall" data-id="listBtn"><img src="/images/list.svg" class="geTempDlgListBtnImg"></div></div></div><div class="geTempDlgDiagramsTiles"></div></div></div><br style="clear:both;"/><div class="geTempDlgFooter"><div class="geTempDlgErrMsg"></div>' + (G ? '<span class="geTempDlgLinkToDiagram geTempDlgLinkToDiagramHint">' + mxResources.get('linkToDiagramHint') + '</span><button class="geTempDlgLinkToDiagram geTempDlgLinkToDiagramBtn">' + mxResources.get('linkToDiagram') + '</button>' : '') + (J ? '<div class="geTempDlgOpenBtn">' + mxResources.get('open') + '</div>' : '') + '<div class="geTempDlgCreateBtn">' + mxResources.get('create') + '</div><div class="geTempDlgCancelBtn">' + mxResources.get('cancel') + '</div></div>',
    O = document.createElement('div');
  O.innerHTML = P;
  O.className = 'geTemplateDlg';
  this.container = O;
  c = null != c ? c : TEMPLATE_PATH + '/index.xml';
  k = null != k ? k : NEW_DIAGRAM_CATS_PATH + '/index.xml';
  var W = !1,
    p = !1,
    B = null,
    N = null,
    S = null,
    R = null,
    V = !1,
    T = !0,
    U = !1,
    X = [],
    Z = null,
    Y, ea, aa = !1,
    fa = O.querySelector('.geTempDlgShowAllBtn'),
    da = O.querySelector('.geTempDlgDiagramsTiles'),
    ba = O.querySelector('.geTempDlgDiagramsListTitle'),
    na = O.querySelector('.geTempDlgDiagramsListBtns'),
    ia = O.querySelector('.geTempDlgContent'),
    qa = O.querySelector('.geTempDlgDiagramsList'),
    Aa = O.querySelector('.geTempDlgNewDiagramCat'),
    va = O.querySelector('.geTempDlgNewDiagramCatList'),
    ja = O.querySelector('.geTempDlgCreateBtn'),
    Ga = O.querySelector('.geTempDlgOpenBtn'),
    Da = O.querySelector('.geTempDlgSearchBox'),
    Ca = O.querySelector('.geTempDlgErrMsg'),
    Ka = new Spinner({
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
      top: '50px',
      zIndex: 2000000000
    });
  mxEvent.addListener(O.querySelector('.geTempDlgBack'), 'click', function() {
    v();
    aa = !1;
    O.querySelector('.geTemplatesList').style.display = 'none';
    ia.style.width = '100%';
    Aa.style.display = '';
    qa.style.minHeight = 'calc(100% - 280px)';
    Da.style.display = y ? '' : 'none';
    Da.value = '';
    Y = null;
    K(T);
  });
  mxEvent.addListener(O.querySelector('.geTempDlgRadioBtn[data-id=allDiagramsBtn]'), 'click', function() {
    u(this, 'geTempDlgAllDiagramsBtnImg', 'all-diagrams', 'myDiagramsBtn', 'geTempDlgMyDiagramsBtnImg', 'my-diagrams', !0) && (T = !0, null == Y ? K(T) : I(Y));
  });
  mxEvent.addListener(O.querySelector('.geTempDlgRadioBtn[data-id=myDiagramsBtn]'), 'click', function() {
    u(this, 'geTempDlgMyDiagramsBtnImg', 'my-diagrams', 'allDiagramsBtn', 'geTempDlgAllDiagramsBtnImg', 'all-diagrams', !0) && (T = !1, null == Y ? K(T) : I(Y));
  });
  mxEvent.addListener(O.querySelector('.geTempDlgRadioBtn[data-id=listBtn]'), 'click', function() {
    u(this, 'geTempDlgListBtnImg', 'list', 'tilesBtn', 'geTempDlgTilesBtnImg', 'tiles', !1) && (U = !0, l(X, !1, U, Z));
  });
  mxEvent.addListener(O.querySelector('.geTempDlgRadioBtn[data-id=tilesBtn]'), 'click', function() {
    u(this, 'geTempDlgTilesBtnImg', 'tiles', 'listBtn', 'geTempDlgListBtnImg', 'list', !1) && (U = !1, l(X, !1, U, Z));
  });
  var ha = !1;
  mxEvent.addListener(fa, 'click', function() {
    V ? (Aa.style.height = '280px', va.style.height = '190px', fa.innerText = mxResources.get('showMore'), q(xa)) : (Aa.style.height = '440px', va.style.height = '355px', fa.innerText = mxResources.get('showLess'), q(xa, !0));
    V = !V;
  });
  var ra = !1,
    ua = !1,
    La = {},
    Ia = {},
    ka = {},
    xa = [],
    ta = 1,
    oa = 0;
  null != D ? D(function(ca, ma) {
    ka = ca;
    oa = ma;
    H();
  }, H) : H();
  mxUtils.get(k, function(ca) {
    if (!ua) {
      ua = !0;
      for (ca = ca.getXml().documentElement.firstChild; null != ca;)
        'undefined' !== typeof ca.getAttribute && null != ca.getAttribute('title') && xa.push({
          img: ca.getAttribute('img'),
          libs: ca.getAttribute('libs'),
          clibs: ca.getAttribute('clibs'),
          title: ca.getAttribute('title')
        }), ca = ca.nextSibling;
      q(xa);
    }
  });
  var sa = function(ca, ma, pa) {
    na.style.display = '';
    Ka.stop();
    W = !1;
    if (p)
      p = !1;
    else if (ma)
      da.innerText = ma;
    else {
      pa = pa || {};
      ma = 0;
      for (var wa in pa)
        ma += pa[wa].length;
      0 == ca.length && 0 == ma ? da.innerText = mxResources.get('noDiagrams') : l(ca, !1, U, 0 == ma ? null : pa);
    }
  };
  K(T);
  var za = null;
  mxEvent.addListener(Da, 'keyup', Q);
  mxEvent.addListener(Da, 'search', Q);
  mxEvent.addListener(Da, 'input', Q);
  mxEvent.addListener(ja, 'click', function(ca) {
    F(!1, !1);
  });
  J && mxEvent.addListener(Ga, 'click', function(ca) {
    F(!1, !0);
  });
  G && mxEvent.addListener(O.querySelector('.geTempDlgLinkToDiagramBtn'), 'click', function(ca) {
    F(!0);
  });
  mxEvent.addListener(O.querySelector('.geTempDlgCancelBtn'), 'click', function() {
    null != f && f();
    g || b.hideDialog(!0);
  });
};
TemplatesDialog.tagsList = {};