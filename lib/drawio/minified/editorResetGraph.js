var editorResetGraph = Editor.prototype.resetGraph;
Editor.prototype.resetGraph = function() {
  editorResetGraph.apply(this, arguments);
  null == this.graph.defaultPageFormat && (this.graph.pageFormat = mxSettings.getPageFormat());
};
(function() {
  var b = mxPopupMenu.prototype.showMenu;
  mxPopupMenu.prototype.showMenu = function() {
    this.div.style.overflowY = 'auto';
    this.div.style.overflowX = 'hidden';
    this.div.style.maxHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight) - (EditorUi.isElectronApp ? 50 : 10) + 'px';
    b.apply(this, arguments);
  };
  Menus.prototype.createHelpLink = function(f) {
    var c = document.createElement('span');
    c.setAttribute('title', mxResources.get('help'));
    c.style.cssText = 'color:blue;text-decoration:underline;margin-left:8px;cursor:help;';
    var k = document.createElement('img');
    mxUtils.setOpacity(k, 50);
    k.style.height = '16px';
    k.style.width = '16px';
    k.setAttribute('border', '0');
    k.setAttribute('valign', 'bottom');
    k.setAttribute('src', Editor.helpImage);
    c.appendChild(k);
    mxEvent.addGestureListeners(c, mxUtils.bind(this, function(m) {
      this.editorUi.hideCurrentMenu();
      this.editorUi.openLink(f);
      mxEvent.consume(m);
    }));
    return c;
  };
  Menus.prototype.addLinkToItem = function(f, c) {
    null != f && f.firstChild.nextSibling.appendChild(this.createHelpLink(c));
  };
  var e = Menus.prototype.init;
  Menus.prototype.init = function() {
    function f(l, q, A) {
      this.ui = l;
      this.previousExtFonts = this.extFonts = q;
      this.prevCustomFonts = this.customFonts = A;
    }
    e.apply(this, arguments);
    var c = this.editorUi,
      k = c.editor.graph,
      m = mxUtils.bind(k, k.isEnabled),
      t = ('1' != urlParams.embed && '0' != urlParams.gapi || '1' == urlParams.embed && '1' == urlParams.gapi) && mxClient.IS_SVG && isLocalStorage && (null == document.documentMode || 10 <= document.documentMode),
      y = ('1' != urlParams.embed && '0' != urlParams.db || '1' == urlParams.embed && '1' == urlParams.db) && mxClient.IS_SVG && (null == document.documentMode || 9 < document.documentMode),
      E = ('www.draw.io' == window.location.hostname || 'test.draw.io' == window.location.hostname || 'drive.draw.io' == window.location.hostname || 'app.diagrams.net' == window.location.hostname) && ('1' != urlParams.embed && '0' != urlParams.od || '1' == urlParams.embed && '1' == urlParams.od) && !mxClient.IS_IOS && (0 > navigator.userAgent.indexOf('MSIE') || 10 <= document.documentMode),
      z = '1' == urlParams.tr && mxClient.IS_SVG && (null == document.documentMode || 9 < document.documentMode);
    mxClient.IS_SVG || c.isOffline() || (new Image().src = IMAGE_PATH + '/help.png');
    '1' == urlParams.noFileMenu && (this.defaultMenuItems = this.defaultMenuItems.filter(function(l) {
      return 'file' != l;
    }));
    c.actions.addAction('new...', function() {
      var l = c.isOffline();
      if (l || '1' != urlParams.newTempDlg || c.mode != App.MODE_GOOGLE) {
        var q = new NewDialog(c, l, !(c.mode == App.MODE_DEVICE && 'chooseFileSystemEntries' in window));
        c.showDialog(q.container, l ? 350 : 620, l ? 70 : 460, !0, !0, function(H) {
          c.sidebar.hideTooltip();
          H && null == c.getCurrentFile() && c.showSplash();
        });
        q.init();
      } else {
        var A = function(H) {
          return {
            id: H.id,
            isExt: !0,
            url: H.downloadUrl,
            title: H.title,
            imgUrl: H.thumbnailLink,
            changedBy: H.lastModifyingUserName,
            lastModifiedOn: H.modifiedDate
          };
        };
        l = new TemplatesDialog(c, function(H, K, M) {
          var I = M.libs,
            Q = M.clibs;
          c.pickFolder(c.mode, function(P) {
            c.createFile(K, H, null != I && 0 < I.length ? I : null, null, function() {
              c.hideDialog();
            }, null, P, null, null != Q && 0 < Q.length ? Q : null);
          }, null == c.stateArg || null == c.stateArg.folderId);
        }, null, null, null, 'user', function(H, K, M) {
          var I = new Date();
          I.setDate(I.getDate() - 7);
          c.drive.listFiles(null, I, M ? !0 : !1, function(Q) {
            for (var P = [], O = 0; O < Q.items.length; O++)
              P.push(A(Q.items[O]));
            H(P);
          }, K);
        }, function(H, K, M, I) {
          c.drive.listFiles(H, null, I ? !0 : !1, function(Q) {
            for (var P = [], O = 0; O < Q.items.length; O++)
              P.push(A(Q.items[O]));
            K(P);
          }, M);
        }, function(H, K, M) {
          c.drive.getFile(H.id, function(I) {
            K(I.data);
          }, M);
        }, null, null, !1, !1);
        c.showDialog(l.container, window.innerWidth, window.innerHeight, !0, !1, null, !1, !0);
      }
    });
    c.actions.put('insertTemplate', new Action(mxResources.get('template') + '...', function() {
      if (k.isEnabled() && !k.isCellLocked(k.getDefaultParent())) {
        var l = new NewDialog(c, null, !1, function(q) {
          c.hideDialog();
          if (null != q) {
            var A = c.editor.graph.getFreeInsertPoint();
            k.setSelectionCells(c.importXml(q, Math.max(A.x, 20), Math.max(A.y, 20), !0, null, null, !0));
            k.scrollCellToVisible(k.getSelectionCell());
          }
        }, null, null, null, null, null, null, null, null, null, null, !1, mxResources.get('insert'));
        c.showDialog(l.container, 620, 460, !0, !0, function() {
          c.sidebar.hideTooltip();
        });
        l.init();
      }
    })).isEnabled = m;
    var D = c.actions.addAction('shareCursor', function() {
      c.setShareCursorPosition(!c.isShareCursorPosition());
    });
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return c.isShareCursorPosition();
    });
    D = c.actions.addAction('showRemoteCursors', function() {
      c.setShowRemoteCursors(!c.isShowRemoteCursors());
    });
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return c.isShowRemoteCursors();
    });
    D = c.actions.addAction('points', function() {
      c.editor.graph.view.setUnit(mxConstants.POINTS);
    });
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return c.editor.graph.view.unit == mxConstants.POINTS;
    });
    D = c.actions.addAction('inches', function() {
      c.editor.graph.view.setUnit(mxConstants.INCHES);
    });
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return c.editor.graph.view.unit == mxConstants.INCHES;
    });
    D = c.actions.addAction('millimeters', function() {
      c.editor.graph.view.setUnit(mxConstants.MILLIMETERS);
    });
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return c.editor.graph.view.unit == mxConstants.MILLIMETERS;
    });
    D = c.actions.addAction('meters', function() {
      c.editor.graph.view.setUnit(mxConstants.METERS);
    });
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return c.editor.graph.view.unit == mxConstants.METERS;
    });
    this.put('units', new Menu(mxUtils.bind(this, function(l, q) {
      this.addMenuItems(l, [
        'points',
        'inches',
        'millimeters',
        'meters'
      ], q);
      'min' != Editor.currentTheme && 'simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme || c.menus.addMenuItems(l, [
        '-',
        'pageScale'
      ], q);
    })));
    D = c.actions.addAction('pageTabs', function() {
      c.setTabContainerVisible(!c.isTabContainerVisible());
    });
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return c.isTabContainerVisible();
    });
    D = c.actions.addAction('ruler', function() {
      c.setRulerVisible(!c.isRulerVisible());
    });
    D.setEnabled(c.canvasSupported && 9 != document.documentMode);
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return c.isRulerVisible();
    });
    D = c.actions.addAction('fullscreen', function() {
      '1' == urlParams.embedInline ? c.setInlineFullscreen(!Editor.inlineFullscreen) : null == document.fullscreenElement ? document.body.requestFullscreen() : document.exitFullscreen();
    });
    D.visible = '1' == urlParams.embedInline || window == window.top && document.fullscreenEnabled && null != document.body.requestFullscreen;
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return '1' == urlParams.embedInline ? Editor.inlineFullscreen : null != document.fullscreenElement;
    });
    D = c.actions.put('lightMode', new Action(mxResources.get('light'), function(l) {
      c.setAndPersistDarkMode(!1);
    }));
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return !Editor.isAutoDarkMode(!0) && !Editor.isDarkMode();
    });
    D = c.actions.put('darkMode', new Action(mxResources.get('dark'), function(l) {
      c.setAndPersistDarkMode(!0);
    }));
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return !Editor.isAutoDarkMode(!0) && Editor.isDarkMode();
    });
    D = c.actions.put('autoMode', new Action(mxResources.get('automatic'), function(l) {
      c.setAndPersistDarkMode('auto');
    }));
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return Editor.isAutoDarkMode(!0);
    });
    D = c.actions.put('toggleSimpleMode', new Action(mxResources.get('classic'), function(l) {
      c.setCurrentTheme('simple' == Editor.currentTheme ? Editor.isDarkMode() ? 'dark' : 'kennedy' : 'simple');
    }));
    D.setToggleAction(!0);
    D.visible = 'min' != Editor.currentTheme && 'sketch' != Editor.currentTheme && 'atlas' != Editor.currentTheme;
    D.setSelectedCallback(function() {
      return 'simple' != Editor.currentTheme;
    });
    D = c.actions.put('toggleSketchMode', new Action(mxResources.get('sketch'), function(l) {
      c.setSketchMode(!Editor.sketchMode);
    }));
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return Editor.sketchMode;
    });
    c.actions.addAction('properties...', function() {
      var l = new FilePropertiesDialog(c);
      c.showDialog(l.container, 320, 120, !0, !0);
      l.init();
    }).isEnabled = m;
    window.mxFreehand && (c.actions.put('insertFreehand', new Action(mxResources.get('freehand') + '...', function() {
      if (k.isEnabled()) {
        if (null == c.freehandWindow) {
          var l = !mxClient.IS_IE && !mxClient.IS_IE11;
          c.freehandWindow = new FreehandWindow(c, document.body.offsetWidth - 420, 102, 176, l ? 120 : 84, l);
        }
        k.freehand.isDrawing() ? k.freehand.stopDrawing() : k.freehand.startDrawing();
        c.freehandWindow.window.setVisible(k.freehand.isDrawing());
      }
    }, null, null, 'X')).isEnabled = function() {
      return m() && mxClient.IS_SVG;
    });
    c.actions.put('exportXml', new Action(mxResources.get('formatXml') + '...', function() {
      var l = document.createElement('div');
      l.style.whiteSpace = 'nowrap';
      var q = null == c.pages || 1 >= c.pages.length,
        A = document.createElement('h3');
      mxUtils.write(A, mxResources.get('formatXml'));
      A.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
      l.appendChild(A);
      var H = c.addCheckbox(l, mxResources.get('selectionOnly'), !1, k.isSelectionEmpty()),
        K = c.addCheckbox(l, mxResources.get('compressed'), !0),
        M = c.addCheckbox(l, mxResources.get('allPages'), !q, q);
      M.style.marginBottom = '16px';
      mxEvent.addListener(H, 'change', function() {
        H.checked ? M.setAttribute('disabled', 'disabled') : M.removeAttribute('disabled');
      });
      l = new CustomDialog(c, l, mxUtils.bind(this, function() {
        c.downloadFile('xml', !K.checked, null, !H.checked, q || !M.checked);
      }), null, mxResources.get('export'));
      c.showDialog(l.container, 300, 200, !0, !0);
    }));
    Editor.enableExportUrl && c.actions.put('exportUrl', new Action(mxResources.get('url') + '...', function() {
      c.showPublishLinkDialog(mxResources.get('url'), !0, null, null, function(l, q, A, H, K, M, I, Q, P) {
        I = [];
        P && I.push('tags=%7B%7D');
        l = new EmbedDialog(c, c.createLink(l, q, A, H, K, M, null, !0, I));
        c.showDialog(l.container, 450, 240, !0, !0);
        l.init();
      });
    }));
    c.actions.put('exportHtml', new Action(mxResources.get('formatHtmlEmbedded') + '...', function() {
      c.spinner.spin(document.body, mxResources.get('loading')) && c.getPublicUrl(c.getCurrentFile(), function(l) {
        c.spinner.stop();
        c.showHtmlDialog(mxResources.get('export'), null, l, function(q, A, H, K, M, I, Q, P, O, W, p) {
          c.createHtml(q, A, H, K, M, I, Q, P, O, W, p, mxUtils.bind(this, function(B, N) {
            var S = c.getBaseFilename(Q);
            B = '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n<!DOCTYPE html>\n<html>\n<head>\n<title>' + mxUtils.htmlEntities(S) + '</title>\n<meta charset="utf-8"/>\n</head>\n<body>' + B + '\n' + N + '\n</body>\n</html>';
            c.saveData(S + ('.drawio' == S.substring(S.lenth - 7) ? '' : '.drawio') + '.html', 'html', B, 'text/html');
          }));
        });
      });
    }));
    c.actions.put('exportPdf', new Action(mxResources.get('formatPdf') + '...', function() {
      if (EditorUi.isElectronApp || !c.isOffline() && !c.printPdfExport) {
        var l = null == c.pages || 1 >= c.pages.length,
          q = document.createElement('div');
        q.style.whiteSpace = 'nowrap';
        var A = document.createElement('h3');
        mxUtils.write(A, mxResources.get('formatPdf'));
        A.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
        q.appendChild(A);
        var H = function() {
          Q != this && this.checked ? (N.removeAttribute('disabled'), N.checked = !k.pageVisible) : (N.setAttribute('disabled', 'disabled'), N.checked = !1);
        };
        A = 200;
        var K = 1,
          M = null;
        if (c.pdfPageExport && !l) {
          var I = function() {
              p.value = Math.max(1, Math.min(K, Math.max(parseInt(p.value), parseInt(O.value))));
              O.value = Math.max(1, Math.min(K, Math.min(parseInt(p.value), parseInt(O.value))));
            },
            Q = c.addRadiobox(q, 'pages', mxResources.get('allPages'), !0),
            P = c.addRadiobox(q, 'pages', mxResources.get('pages') + ':', !1, null, !0),
            O = document.createElement('input');
          O.style.cssText = 'margin:0 8px 0 8px;';
          O.setAttribute('value', '1');
          O.setAttribute('type', 'number');
          O.setAttribute('min', '1');
          O.style.width = '50px';
          q.appendChild(O);
          var W = document.createElement('span');
          mxUtils.write(W, mxResources.get('to'));
          q.appendChild(W);
          var p = O.cloneNode(!0);
          q.appendChild(p);
          mxEvent.addListener(O, 'focus', function() {
            P.checked = !0;
          });
          mxEvent.addListener(p, 'focus', function() {
            P.checked = !0;
          });
          mxEvent.addListener(O, 'change', I);
          mxEvent.addListener(p, 'change', I);
          if (null != c.pages && (K = c.pages.length, null != c.currentPage))
            for (I = 0; I < c.pages.length; I++)
              if (c.currentPage == c.pages[I]) {
                M = I + 1;
                O.value = M;
                p.value = M;
                break;
              }
          O.setAttribute('max', K);
          p.setAttribute('max', K);
          mxUtils.br(q);
          var B = c.addRadiobox(q, 'pages', mxResources.get('selectionOnly'), !1, k.isSelectionEmpty()),
            N = c.addCheckbox(q, mxResources.get('crop'), !1, !0),
            S = c.addCheckbox(q, mxResources.get('grid'), !1, !1);
          mxEvent.addListener(Q, 'change', H);
          mxEvent.addListener(P, 'change', H);
          mxEvent.addListener(B, 'change', H);
          A += 64;
        } else
          B = c.addCheckbox(q, mxResources.get('selectionOnly'), !1, k.isSelectionEmpty()), N = c.addCheckbox(q, mxResources.get('crop'), !k.pageVisible || !c.pdfPageExport, !c.pdfPageExport), S = c.addCheckbox(q, mxResources.get('grid'), !1, !1), c.pdfPageExport || mxEvent.addListener(B, 'change', H);
        H = !mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp && 'draw.io' == c.getServiceName();
        var R = null,
          V = null;
        if (EditorUi.isElectronApp || H)
          V = c.addCheckbox(q, mxResources.get('includeCopyOfMyDiagram'), Editor.defaultIncludeDiagram), A += 30;
        H && (R = c.addCheckbox(q, mxResources.get('transparentBackground'), !1), A += 30);
        q = new CustomDialog(c, q, mxUtils.bind(this, function() {
          var T = null;
          if (!l) {
            T = parseInt(O.value);
            var U = parseInt(p.value);
            T = Q.checked || T == M && U == M ? null : {
              from: Math.max(0, Math.min(K - 1, T - 1)),
              to: Math.max(0, Math.min(K - 1, U - 1))
            };
          }
          c.downloadFile('pdf', null, null, !B.checked, l ? !0 : !Q.checked && null == T, !N.checked, null != R && R.checked, null, null, S.checked, null != V && V.checked, T);
        }), null, mxResources.get('export'));
        c.showDialog(q.container, 300, A, !0, !0);
      } else
        c.showDialog(new PrintDialog(c, mxResources.get('formatPdf')).container, 360, null != c.pages && 1 < c.pages.length && (c.editor.editable || '1' != urlParams['hide-pages']) ? 470 : 390, !0, !0);
    }));
    c.actions.addAction('open...', function() {
      c.pickFile();
    });
    c.actions.addAction('close', function() {
      function l() {
        null != q && q.removeDraft();
        c.fileLoaded(null);
      }
      var q = c.getCurrentFile();
      null != q && q.isModified() ? c.confirm(mxResources.get('allChangesLost'), null, l, mxResources.get('cancel'), mxResources.get('discardChanges')) : l();
    });
    c.actions.addAction('editShape...', mxUtils.bind(this, function() {
      k.getSelectionCells();
      if (1 == k.getSelectionCount()) {
        var l = k.getSelectionCell(),
          q = k.view.getState(l);
        null != q && null != q.shape && null != q.shape.stencil && (l = new EditShapeDialog(c, l, mxResources.get('editShape') + ':', 630, 400), c.showDialog(l.container, 640, 480, !0, !1), l.init());
      }
    }));
    c.actions.addAction('revisionHistory...', function() {
      c.isRevisionHistorySupported() ? c.spinner.spin(document.body, mxResources.get('loading')) && c.getRevisions(mxUtils.bind(this, function(l, q) {
        c.spinner.stop();
        l = new RevisionDialog(c, l, q);
        c.showDialog(l.container, 640, 480, !0, !0);
        l.init();
      }), mxUtils.bind(this, function(l) {
        c.handleError(null != l ? l : mxResources.get('notAvailable'));
      })) : c.showError(mxResources.get('error'), mxResources.get('notAvailable'), mxResources.get('ok'));
    });
    c.actions.addAction('createRevision', function() {
      c.actions.get('save').funct();
    }, null, null, Editor.ctrlKey + '+S');
    D = c.actions.addAction('synchronize', function() {
      c.synchronizeCurrentFile('none' == DrawioFile.SYNC);
    }, null, null, 'Alt+Shift+S');
    'none' == DrawioFile.SYNC && (D.label = mxResources.get('refresh'));
    c.actions.addAction('upload...', function() {
      var l = c.getCurrentFile();
      null != l && (window.drawdata = c.getFileData(), l = null != l.getTitle() ? l.getTitle() : c.defaultFilename, c.openLink(window.location.protocol + '//' + window.location.host + '/?create=drawdata&' + (c.mode == App.MODE_DROPBOX ? 'mode=dropbox&' : '') + 'title=' + encodeURIComponent(l), null, !0));
    });
    'undefined' !== typeof MathJax && (D = c.actions.addAction('mathematicalTypesetting', function() {
      var l = new ChangePageSetup(c);
      l.ignoreColor = !0;
      l.ignoreImage = !0;
      l.mathEnabled = !c.isMathEnabled();
      k.model.execute(l);
    }), D.setToggleAction(!0), D.setSelectedCallback(function() {
      return c.isMathEnabled();
    }), D.isEnabled = m);
    isLocalStorage && (D = c.actions.addAction('showStartScreen', function() {
      mxSettings.setShowStartScreen(!mxSettings.getShowStartScreen());
      mxSettings.save();
    }), D.setToggleAction(!0), D.setSelectedCallback(function() {
      return mxSettings.getShowStartScreen();
    }));
    var J = c.actions.addAction('autosave', function() {
      c.editor.setAutosave(!c.editor.autosave);
    });
    J.setToggleAction(!0);
    J.setSelectedCallback(function() {
      return J.isEnabled() && c.editor.autosave;
    });
    c.actions.addAction('editGeometry...', function() {
      for (var l = k.getSelectionCells(), q = [], A = 0; A < l.length; A++)
        k.getModel().isVertex(l[A]) && q.push(l[A]);
      0 < q.length && (l = new EditGeometryDialog(c, q), c.showDialog(l.container, 200, 270, !0, !0), l.init());
    }, null, null, Editor.ctrlKey + '+Shift+M');
    var G = null;
    c.actions.addAction('copyStyle', function() {
      k.isEnabled() && !k.isSelectionEmpty() && (G = k.copyStyle(k.getSelectionCell()));
    }, null, null, Editor.ctrlKey + '+Shift+C');
    c.actions.addAction('pasteStyle', function() {
      k.isEnabled() && !k.isSelectionEmpty() && null != G && k.pasteStyle(G, k.getSelectionCells());
    }, null, null, Editor.ctrlKey + '+Shift+V');
    c.actions.put('exportSvg', new Action(mxResources.get('formatSvg') + '...', function() {
      c.showExportDialog(mxResources.get('formatSvg'), !0, mxResources.get('export'), 'https://www.diagrams.net/doc/faq/export-diagram', mxUtils.bind(this, function(l, q, A, H, K, M, I, Q, P, O, W, p, B, N, S) {
        P = parseInt(l);
        !isNaN(P) && 0 < P && (S ? c.downloadFile('remoteSvg', null, null, A, null, Q, q, l, I, null, K) : c.exportSvg(P / 100, q, A, H, K, M, I, !Q, !1, O, p, B, N));
      }), !0, null, 'svg', !0);
    }));
    c.actions.put('exportPng', new Action(mxResources.get('formatPng') + '...', function() {
      c.isExportToCanvas() ? c.showExportDialog(mxResources.get('image'), !1, mxResources.get('export'), 'https://www.diagrams.net/doc/faq/export-diagram', mxUtils.bind(this, function(l, q, A, H, K, M, I, Q, P, O, W, p, B) {
        l = parseInt(l);
        !isNaN(l) && 0 < l && c.exportImage(l / 100, q, A, H, K, I, !Q, !1, null, W, null, p, B);
      }), !0, Editor.defaultIncludeDiagram, 'png', !0) : c.isOffline() || mxClient.IS_IOS && navigator.standalone || c.showRemoteExportDialog(mxResources.get('export'), null, mxUtils.bind(this, function(l, q, A, H, K) {
        c.downloadFile(q ? 'xmlpng' : 'png', null, null, l, null, null, A, H, K);
      }), !1, !0);
    }));
    c.actions.put('exportJpg', new Action(mxResources.get('formatJpg') + '...', function() {
      c.isExportToCanvas() ? c.showExportDialog(mxResources.get('image'), !1, mxResources.get('export'), 'https://www.diagrams.net/doc/faq/export-diagram', mxUtils.bind(this, function(l, q, A, H, K, M, I, Q, P, O, W, p, B) {
        l = parseInt(l);
        !isNaN(l) && 0 < l && c.exportImage(l / 100, !1, A, H, !1, I, !Q, !1, 'jpeg', W, null, p, B);
      }), !0, !1, 'jpeg', !0) : c.isOffline() || mxClient.IS_IOS && navigator.standalone || c.showRemoteExportDialog(mxResources.get('export'), null, mxUtils.bind(this, function(l, q, A, H, K) {
        c.downloadFile('jpeg', null, null, l, null, null, null, H, K);
      }), !0, !0);
    }));
    D = c.actions.addAction('copyAsImage', mxUtils.bind(this, function() {
      var l = mxUtils.sortCells(k.model.getTopmostCells(k.getSelectionCells())),
        q = mxUtils.getXml(0 == l.length ? c.editor.getGraphXml() : k.encodeCells(l));
      c.copyImage(l, q);
    }));
    D.visible = Editor.enableNativeCipboard && c.isExportToCanvas() && !mxClient.IS_SF;
    D = c.actions.put('shadowVisible', new Action(mxResources.get('shadow'), function() {
      k.setShadowVisible(!k.shadowVisible);
    }));
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return k.shadowVisible;
    });
    c.actions.put('about', new Action(mxResources.get('about') + ' ' + EditorUi.VERSION + '...', function() {
      c.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp ? c.alert(c.editor.appName + ' ' + EditorUi.VERSION) : c.openLink('https://www.diagrams.net/');
    }));
    c.actions.addAction('support...', function() {
      EditorUi.isElectronApp ? c.openLink('https://github.com/jgraph/drawio-desktop/wiki/Getting-Support') : c.openLink('https://github.com/jgraph/drawio/wiki/Getting-Support');
    });
    c.actions.addAction('exportOptionsDisabled...', function() {
      c.handleError({
        message: mxResources.get('exportOptionsDisabledDetails')
      }, mxResources.get('exportOptionsDisabled'));
    });
    c.actions.addAction('keyboardShortcuts...', function() {
      !mxClient.IS_SVG || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp ? c.openLink('https://viewer.diagrams.net/#Uhttps%3A%2F%2Fviewer.diagrams.net%2Fshortcuts.svg') : c.openLink('shortcuts.svg');
    });
    c.actions.addAction('feedback...', function() {
      var l = new FeedbackDialog(c);
      c.showDialog(l.container, 610, 360, !0, !1);
      l.init();
    });
    c.actions.addAction('quickStart...', function() {
      'ac.draw.io' === window.location.hostname ? c.openLink('https://www.youtube.com/watch?v=s5BG0705MHU') : c.openLink('https://www.youtube.com/watch?v=Z0D96ZikMkc');
    });
    D = c.actions.addAction('tags', mxUtils.bind(this, function() {
      null == this.tagsWindow ? (this.tagsWindow = new TagsWindow(c, document.body.offsetWidth - 400, 60, 212, 200), this.tagsWindow.window.addListener('show', mxUtils.bind(this, function() {
        c.fireEvent(new mxEventObject('tags'));
      })), this.tagsWindow.window.addListener('hide', function() {
        c.fireEvent(new mxEventObject('tags'));
      }), this.tagsWindow.window.setVisible(!0), c.fireEvent(new mxEventObject('tags'))) : this.tagsWindow.window.setVisible(!this.tagsWindow.window.isVisible());
    }), null, null, Editor.ctrlKey + '+K');
    D.setToggleAction(!0);
    D.setSelectedCallback(mxUtils.bind(this, function() {
      return null != this.tagsWindow && this.tagsWindow.window.isVisible();
    }));
    D = c.actions.addAction('findReplace', mxUtils.bind(this, function(l, q) {
      var A = (l = k.isEnabled() && (null == q || !mxEvent.isShiftDown(q))) ? 'findReplace' : 'find';
      q = A + 'Window';
      if (null == this[q]) {
        var H = 'min' == Editor.currentTheme || 'simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme,
          K = l ? H ? 330 : 300 : 240;
        this[q] = new FindWindow(c, document.body.offsetWidth - (K + 20), 100, K, l ? H ? 304 : 288 : 170, l);
        this[q].window.addListener('show', function() {
          c.fireEvent(new mxEventObject(A));
        });
        this[q].window.addListener('hide', function() {
          c.fireEvent(new mxEventObject(A));
        });
        this[q].window.setVisible(!0);
      } else
        this[q].window.setVisible(!this[q].window.isVisible());
    }), null, null, Editor.ctrlKey + '+F');
    D.setToggleAction(!0);
    D.setSelectedCallback(mxUtils.bind(this, function() {
      var l = k.isEnabled() ? 'findReplaceWindow' : 'findWindow';
      return null != this[l] && this[l].window.isVisible();
    }));
    c.actions.put('exportVsdx', new Action(mxResources.get('formatVsdx') + ' (beta)...', function() {
      var l = null == c.pages || 1 >= c.pages.length;
      if (l)
        c.exportVisio();
      else {
        var q = document.createElement('div');
        q.style.whiteSpace = 'nowrap';
        var A = document.createElement('h3');
        mxUtils.write(A, mxResources.get('formatVsdx'));
        A.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
        q.appendChild(A);
        var H = c.addCheckbox(q, mxResources.get('allPages'), !l, l);
        H.style.marginBottom = '16px';
        l = new CustomDialog(c, q, mxUtils.bind(this, function() {
          c.exportVisio(!H.checked);
        }), null, mxResources.get('export'));
        c.showDialog(l.container, 300, 130, !0, !0);
      }
    }));
    isLocalStorage && null != localStorage && '1' != urlParams.embed && c.actions.addAction('configuration...', function() {
      var l = document.createElement('input');
      l.setAttribute('type', 'checkbox');
      l.style.marginRight = '4px';
      l.checked = mxSettings.getShowStartScreen();
      l.defaultChecked = l.checked;
      if (Editor.isSettingsEnabled() && ('sketch' == Editor.currentTheme || 'simple' == Editor.currentTheme || 'min' == Editor.currentTheme)) {
        var q = document.createElement('span');
        q.style['float'] = 'right';
        q.style.cursor = 'pointer';
        q.style.userSelect = 'none';
        q.style.marginTop = '-4px';
        q.appendChild(l);
        mxUtils.write(q, mxResources.get('showStartScreen'));
        mxEvent.addListener(q, 'click', function(H) {
          mxEvent.getSource(H) != l && (l.checked = !l.checked);
        });
        header = q;
      }
      q = [
        [
          mxResources.get('reset'),
          function() {
            c.confirm(mxResources.get('areYouSure'), function() {
              try {
                localStorage.removeItem(Editor.configurationKey), c.hideDialog(), c.alert(mxResources.get('restartForChangeRequired'));
              } catch (H) {
                c.handleError(H);
              }
            });
          }
        ]
      ];
      if (!c.isOfflineApp() && isLocalStorage && c.mode != App.MODE_ATLAS) {
        var A = c.actions.get('plugins');
        null == A || 'sketch' != Editor.currentTheme && 'simple' != Editor.currentTheme && 'min' != Editor.currentTheme || q.push([
          mxResources.get('plugins'),
          A.funct
        ]);
      }
      EditorUi.isElectronApp || q.push([
        mxResources.get('link'),
        function(H, K) {
          if (0 < K.value.length)
            try {
              var M = JSON.parse(K.value),
                I = window.location.protocol + '//' + window.location.host + '/' + c.getSearch() + '#_CONFIG_' + Graph.compress(JSON.stringify(M)),
                Q = new EmbedDialog(c, I);
              c.showDialog(Q.container, 450, 240, !0);
              Q.init();
            } catch (P) {
              c.handleError(P);
            }
          else
            c.handleError({
              message: mxResources.get('invalidInput')
            });
        }
      ]);
      'atlassian' != c.getServiceName() && '1' != urlParams.embed && q.push([
        mxResources.get('preferences'),
        function() {
          c.showLocalStorageDialog(mxResources.get('preferences') + ':', Editor.settingsKey, [
            [
              mxResources.get('reset'),
              function() {
                c.confirm(mxResources.get('areYouSure'), function() {
                  try {
                    localStorage.removeItem(Editor.settingsKey), localStorage.removeItem('.drawio-config'), c.hideDialog(), c.alert(mxResources.get('restartForChangeRequired'));
                  } catch (H) {
                    c.handleError(H);
                  }
                });
              }
            ]
          ]);
        }
      ]);
      c.showLocalStorageDialog(mxResources.get('configuration') + ':', Editor.configurationKey, q, l.parentNode, 'https://www.diagrams.net/doc/faq/configure-diagram-editor', function() {
        null != l.parentNode && (mxSettings.setShowStartScreen(l.checked), mxSettings.save());
      });
    });
    if (mxClient.IS_CHROMEAPP || isLocalStorage) {
      this.put('language', new Menu(mxUtils.bind(this, function(l, q) {
        var A = mxUtils.bind(this, function(K) {
          var M = '' == K ? mxResources.get('automatic') : mxLanguageMap[K],
            I = null;
          '' != M && (I = l.addItem(M, null, mxUtils.bind(this, function() {
            c.setAndPersistLanguage(K);
            c.alert(mxResources.get('restartForChangeRequired'));
          }), q), (K == mxLanguage || '' == K && null == mxLanguage) && l.addCheckmark(I, Editor.checkmarkImage));
          return I;
        });
        A('');
        l.addSeparator(q);
        for (var H in mxLanguageMap)
          A(H);
      })));
      var d = Menus.prototype.createMenubar;
      Menus.prototype.createMenubar = function(l) {
        var q = d.apply(this, arguments);
        if (null != q && Editor.enableSimpleTheme && 'atlassian' != c.getServiceName() && '1' != urlParams.embed) {
          var A = this.get('appearance');
          if (null != A) {
            var H = q.addMenu('', A.funct);
            H.setAttribute('title', mxResources.get('appearance'));
            H.className = 'geToolbarButton geAdaptiveAsset';
            H.style.backgroundPosition = 'center center';
            H.style.backgroundRepeat = 'no-repeat';
            H.style.backgroundSize = '100% 100%';
            H.style.display = 'inline-block';
            H.style.cursor = 'pointer';
            H.style.zIndex = '1';
            H.style.position = 'absolute';
            H.style.height = '18px';
            H.style.width = '18px';
            'atlas' == Editor.currentTheme ? (H.style.filter = 'invert(100%)', H.style.right = '11px', H.style.top = '10px') : (H.style.right = '10px', H.style.top = '5px');
            document.body.appendChild(H);
            q.langIcon = H;
            A = mxUtils.bind(this, function() {
              var K = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
              H.style.display = 'atlas' == Editor.currentTheme || 'min' == Editor.currentTheme || 'sketch' == Editor.currentTheme ? 'none' : '';
              H.style.backgroundImage = 'simple' == Editor.currentTheme ? 750 > K ? 'url(' + Editor.thinDoubleArrowRightImage + ')' : 'url(' + (Editor.isDarkMode() ? Editor.thinDarkImage : Editor.thinLightImage) + ')' : 'url(' + (Editor.isDarkMode() ? Editor.darkModeImage : Editor.lightModeImage) + ')';
            });
            this.editorUi.addListener('currentThemeChanged', A);
            this.editorUi.addListener('darkModeChanged', A);
            mxEvent.addListener(window, 'resize', A);
            A();
          }
        }
        return q;
      };
    }
    c.customLayoutConfig = [{
      layout: 'mxHierarchicalLayout',
      config: {
        orientation: 'west',
        intraCellSpacing: 30,
        interRankCellSpacing: 100,
        interHierarchySpacing: 60,
        parallelEdgeSpacing: 10
      }
    }];
    c.actions.addAction('runLayout', function() {
      var l = new TextareaDialog(c, 'Run Layouts:', JSON.stringify(c.customLayoutConfig, null, 2), function(q) {
        if (0 < q.length)
          try {
            var A = JSON.parse(q);
            c.executeLayouts(k.createLayouts(A));
            c.customLayoutConfig = A;
            c.hideDialog();
          } catch (H) {
            c.handleError(H);
          }
      }, null, null, null, null, function(q, A) {
        var H = mxUtils.button(mxResources.get('copy'), function() {
          try {
            var K = A.value;
            A.value = JSON.stringify(JSON.parse(K));
            A.focus();
            mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? A.select() : document.execCommand('selectAll', !1, null);
            document.execCommand('copy');
            c.alert(mxResources.get('copiedToClipboard'));
            A.value = K;
          } catch (M) {
            c.handleError(M);
          }
        });
        H.setAttribute('title', 'copy');
        H.className = 'geBtn';
        q.appendChild(H);
      }, !0, null, null, 'https://www.diagrams.net/doc/faq/apply-layouts');
      c.showDialog(l.container, 620, 460, !0, !0);
      l.init();
    });
    D = this.get('viewZoom');
    var g = D.funct;
    D.funct = mxUtils.bind(this, function(l, q) {
      g.apply(this, arguments);
      'sketch' != Editor.currentTheme && 'min' != Editor.currentTheme || this.addMenuItems(l, [
        '-',
        'fullscreen'
      ], q);
    });
    D = this.get('layout');
    var n = D.funct;
    D.funct = function(l, q) {
      n.apply(this, arguments);
      l.addItem(mxResources.get('orgChart'), null, function() {
        var A = null,
          H = 20,
          K = 20,
          M = function() {
            if ('undefined' !== typeof mxOrgChartLayout && null != A) {
              var N = c.editor.graph,
                S = new mxOrgChartLayout(N, A, H, K),
                R = N.getDefaultParent();
              1 < N.model.getChildCount(N.getSelectionCell()) && (R = N.getSelectionCell());
              S.execute(R);
            }
          },
          I = document.createElement('div'),
          Q = document.createElement('div');
        Q.style.marginTop = '6px';
        Q.style.display = 'inline-block';
        Q.style.width = '140px';
        mxUtils.write(Q, mxResources.get('orgChartType') + ': ');
        I.appendChild(Q);
        var P = document.createElement('select');
        P.style.width = '200px';
        P.style.boxSizing = 'border-box';
        Q = [
          mxResources.get('linear'),
          mxResources.get('hanger2'),
          mxResources.get('hanger4'),
          mxResources.get('fishbone1'),
          mxResources.get('fishbone2'),
          mxResources.get('1ColumnLeft'),
          mxResources.get('1ColumnRight'),
          mxResources.get('smart')
        ];
        for (var O = 0; O < Q.length; O++) {
          var W = document.createElement('option');
          mxUtils.write(W, Q[O]);
          W.value = O;
          2 == O && W.setAttribute('selected', 'selected');
          P.appendChild(W);
        }
        mxEvent.addListener(P, 'change', function() {
          A = P.value;
        });
        I.appendChild(P);
        Q = document.createElement('div');
        Q.style.marginTop = '6px';
        Q.style.display = 'inline-block';
        Q.style.width = '140px';
        mxUtils.write(Q, mxResources.get('parentChildSpacing') + ': ');
        I.appendChild(Q);
        var p = document.createElement('input');
        p.type = 'number';
        p.value = H;
        p.style.width = '200px';
        p.style.boxSizing = 'border-box';
        I.appendChild(p);
        mxEvent.addListener(p, 'change', function() {
          H = p.value;
        });
        Q = document.createElement('div');
        Q.style.marginTop = '6px';
        Q.style.display = 'inline-block';
        Q.style.width = '140px';
        mxUtils.write(Q, mxResources.get('siblingSpacing') + ': ');
        I.appendChild(Q);
        var B = document.createElement('input');
        B.type = 'number';
        B.value = K;
        B.style.width = '200px';
        B.style.boxSizing = 'border-box';
        I.appendChild(B);
        mxEvent.addListener(B, 'change', function() {
          K = B.value;
        });
        I = new CustomDialog(c, I, function() {
          null == A && (A = 2);
          c.loadOrgChartLayouts(M);
        });
        c.showDialog(I.container, 355, 140, !0, !0);
      }, q, null, m());
      l.addSeparator(q);
      l.addItem(mxResources.get('parallels'), null, mxUtils.bind(this, function() {
        var A = new mxParallelEdgeLayout(k);
        A.checkOverlap = !0;
        c.prompt(mxResources.get('spacing'), A.spacing, mxUtils.bind(this, function(H) {
          A.spacing = H;
          c.executeLayout(function() {
            A.execute(k.getDefaultParent(), k.isSelectionEmpty() ? null : k.getSelectionCells());
          }, !1);
        }));
      }), q);
      l.addSeparator(q);
      c.menus.addMenuItem(l, 'runLayout', q, null, null, mxResources.get('custom') + '...');
    };
    this.put('help', new Menu(mxUtils.bind(this, function(l, q) {
      if (!mxClient.IS_CHROMEAPP && c.isOffline())
        this.addMenuItems(l, ['about'], q);
      else {
        var A = l.addItem('Search:', null, null, q, null, null, !1);
        A.style.cursor = 'default';
        var H = document.createElement('input');
        H.setAttribute('type', 'text');
        H.setAttribute('size', '25');
        H.style.borderWidth = '1px';
        H.style.marginLeft = '8px';
        mxEvent.addListener(H, 'keydown', mxUtils.bind(this, function(K) {
          var M = mxUtils.trim(H.value);
          13 == K.keyCode && 0 < M.length ? (this.editorUi.openLink('https://www.diagrams.net/search?src=' + (EditorUi.isElectronApp ? 'DESKTOP' : encodeURIComponent(location.host)) + '&search=' + encodeURIComponent(M)), H.value = '', EditorUi.logEvent({
            category: 'SEARCH-HELP',
            action: 'search',
            label: M
          }), window.setTimeout(mxUtils.bind(this, function() {
            this.editorUi.hideCurrentMenu();
          }), 0)) : 27 == K.keyCode && (H.value = '');
        }));
        A.firstChild.nextSibling.appendChild(H);
        mxEvent.addGestureListeners(H, function(K) {
          document.activeElement != H && H.focus();
          mxEvent.consume(K);
        }, function(K) {
          mxEvent.consume(K);
        }, function(K) {
          mxEvent.consume(K);
        });
        window.setTimeout(function() {
          H.focus();
        }, 0);
        EditorUi.isElectronApp ? (c.actions.addAction('website...', function() {
          c.openLink('https://www.diagrams.net');
        }), c.actions.addAction('check4Updates', function() {
          c.checkForUpdates();
        }), this.addMenuItems(l, '- keyboardShortcuts quickStart website support -'.split(' '), q), '1' != urlParams.disableUpdate && this.addMenuItems(l, ['check4Updates'], q), this.addMenuItems(l, [
          'openDevTools',
          '-',
          'about'
        ], q)) : this.addMenuItems(l, '- keyboardShortcuts quickStart support - about'.split(' '), q);
      }
      '1' == urlParams.test && (l.addSeparator(q), this.addSubmenu('testDevelop', l, q));
    })));
    mxResources.parse('diagramLanguage=Diagram Language');
    c.actions.addAction('diagramLanguage...', function() {
      var l = prompt('Language Code', Graph.diagramLanguage || '');
      null != l && (Graph.diagramLanguage = 0 < l.length ? l : null, k.refresh());
    });
    if ('1' == urlParams.test) {
      mxResources.parse('testDevelop=Develop');
      mxResources.parse('showBoundingBox=Show bounding box');
      mxResources.parse('createSidebarEntry=Create Sidebar Entry');
      mxResources.parse('testCheckFile=Check File');
      mxResources.parse('testDiff=Diff/Sync');
      mxResources.parse('testInspectPages=Check Pages');
      mxResources.parse('testFixPages=Fix Pages');
      mxResources.parse('testInspect=Inspect');
      mxResources.parse('testShowConsole=Show Console');
      mxResources.parse('testXmlImageExport=XML Image Export');
      mxResources.parse('testOptimize=Remove Inline Images');
      c.actions.addAction('createSidebarEntry', mxUtils.bind(this, function() {
        if (!k.isSelectionEmpty()) {
          var l = k.cloneCells(k.getSelectionCells()),
            q = k.getBoundingBoxFromGeometry(l);
          l = k.moveCells(l, -q.x, -q.y);
          c.showTextDialog('Create Sidebar Entry', 'this.addDataEntry(\'tag1 tag2\', ' + q.width + ', ' + q.height + ', \'The Title\', \'' + Graph.compress(mxUtils.getXml(k.encodeCells(l))) + '\'),');
        }
      }));
      c.actions.addAction('showBoundingBox', mxUtils.bind(this, function() {
        var l = k.getGraphBounds(),
          q = k.view.translate,
          A = k.view.scale;
        k.insertVertex(k.getDefaultParent(), null, '', l.x / A - q.x, l.y / A - q.y, l.width / A, l.height / A, 'fillColor=none;strokeColor=red;');
      }));
      c.actions.addAction('testCheckFile', mxUtils.bind(this, function() {
        var l = null != c.pages && null != c.getCurrentFile() ? c.getCurrentFile().getAnonymizedXmlForPages(c.pages) : '';
        l = new TextareaDialog(c, 'Paste Data:', l, function(q) {
          if (0 < q.length)
            try {
              var A = function(Q) {
                function P(U) {
                  if (null == T[U]) {
                    if (T[U] = !0, null != p[U]) {
                      for (; 0 < p[U].length;) {
                        var X = p[U].pop();
                        P(X);
                      }
                      delete p[U];
                    }
                  } else
                    mxLog.debug(O + ': Visited: ' + U);
                }
                var O = Q.parentNode.id,
                  W = Q.childNodes;
                Q = {};
                for (var p = {}, B = null, N = {}, S = 0; S < W.length; S++) {
                  var R = W[S];
                  if (null != R.id && 0 < R.id.length)
                    if (null == Q[R.id]) {
                      Q[R.id] = R.id;
                      var V = R.getAttribute('parent');
                      null == V ? null != B ? mxLog.debug(O + ': Multiple roots: ' + R.id) : B = R.id : (null == p[V] && (p[V] = []), p[V].push(R.id));
                    } else
                      N[R.id] = R.id;
                }
                W = Object.keys(N);
                0 < W.length ? (W = O + ': ' + W.length + ' Duplicates: ' + W.join(', '), mxLog.debug(W + ' (see console)')) : mxLog.debug(O + ': Checked');
                var T = {};
                null == B ? mxLog.debug(O + ': No root') : (P(B), Object.keys(T).length != Object.keys(Q).length && (mxLog.debug(O + ': Invalid tree: (see console)'), console.log(O + ': Invalid tree', p)));
              };
              '<' != q.charAt(0) && (q = Graph.decompress(q), mxLog.debug('See console for uncompressed XML'), console.log('xml', q));
              var H = mxUtils.parseXml(q),
                K = c.getPagesForNode(H.documentElement, 'mxGraphModel');
              if (null != K && 0 < K.length)
                try {
                  var M = c.getHashValueForPages(K);
                  mxLog.debug('Checksum: ', M);
                } catch (Q) {
                  mxLog.debug('Error: ', Q.message);
                }
              else
                mxLog.debug('No pages found for checksum');
              var I = H.getElementsByTagName('root');
              for (q = 0; q < I.length; q++)
                A(I[q]);
              mxLog.show();
            } catch (Q) {
              c.handleError(Q), null != window.console && console.error(Q);
            }
        });
        c.showDialog(l.container, 620, 460, !0, !0);
        l.init();
      }));
      var v = null;
      c.actions.addAction('testDiff', mxUtils.bind(this, function() {
        if (null != c.pages) {
          var l = new TextareaDialog(c, 'Diff/Sync:', '', function(q) {
            var A = c.getCurrentFile();
            if (0 < q.length && null != A)
              try {
                var H = JSON.parse(q);
                A.patch([H], null, !0, !0);
                c.hideDialog();
              } catch (K) {
                c.handleError(K);
              }
          }, null, 'Close', null, null, null, !0, null, 'Patch', null, [
            [
              'Snapshot',
              function(q, A) {
                v = c.getPagesForXml(c.getFileData(!0));
                l.textarea.value = 'Snapshot updated ' + new Date().toLocaleString() + ' Checksum ' + c.getHashValueForPages(v);
              }
            ],
            [
              'Diff',
              function(q, A) {
                try {
                  l.textarea.value = JSON.stringify(c.diffPages(v, c.pages), null, 2);
                } catch (H) {
                  c.handleError(H);
                }
              }
            ]
          ]);
          null == v ? (v = c.getPagesForXml(c.getFileData(!0)), l.textarea.value = 'Snapshot created ' + new Date().toLocaleString() + ' Checksum ' + c.getHashValueForPages(v)) : l.textarea.value = JSON.stringify(c.diffPages(v, c.pages), null, 2);
          c.showDialog(l.container, 620, 460, !0, !0);
          l.init();
        } else
          c.alert('No pages');
      }));
      c.actions.addAction('testInspectPages', mxUtils.bind(this, function() {
        var l = c.getCurrentFile();
        console.log('editorUi', c, 'file', l);
        if (null != l && l.isRealtime()) {
          console.log('Checksum ownPages', c.getHashValueForPages(l.ownPages));
          console.log('Checksum theirPages', c.getHashValueForPages(l.theirPages));
          console.log('diff ownPages/theirPages', c.diffPages(l.ownPages, l.theirPages));
          var q = l.getShadowPages();
          null != q && (console.log('Checksum shadowPages', c.getHashValueForPages(q)), console.log('diff shadowPages/ownPages', c.diffPages(q, l.ownPages)), console.log('diff ownPages/shadowPages', c.diffPages(l.ownPages, q)), console.log('diff theirPages/shadowPages', c.diffPages(l.theirPages, q)));
          null != l.sync && null != l.sync.snapshot && (console.log('Checksum snapshot', c.getHashValueForPages(l.sync.snapshot)), console.log('diff ownPages/snapshot', c.diffPages(l.ownPages, l.sync.snapshot)), console.log('diff theirPages/snapshot', c.diffPages(l.theirPages, l.sync.snapshot)), null != c.pages && console.log('diff snapshot/actualPages', c.diffPages(l.sync.snapshot, c.pages)));
          null != c.pages && (console.log('diff ownPages/actualPages', c.diffPages(l.ownPages, c.pages)), console.log('diff theirPages/actualPages', c.diffPages(l.theirPages, c.pages)));
        }
        null != l && console.log('Shadow pages', [c.getXmlForPages(l.getShadowPages())]);
        null != c.pages && console.log('Checksum actualPages', c.getHashValueForPages(c.pages));
      }));
      c.actions.addAction('testFixPages', mxUtils.bind(this, function() {
        console.log('editorUi', c);
        var l = c.getCurrentFile();
        null != l && l.isRealtime() && null != l.shadowPages && (console.log('patching actualPages to shadowPages', l.patch([c.diffPages(l.shadowPages, c.pages)])), l.ownPages = c.clonePages(c.pages), l.theirPages = c.clonePages(c.pages), l.shadowPages = c.clonePages(c.pages), null != l.sync && (l.sync.snapshot = c.clonePages(c.pages)));
      }));
      c.actions.addAction('testOptimize', mxUtils.bind(this, function() {
        k.model.beginUpdate();
        try {
          var l = k.model.cells,
            q = 0,
            A = [],
            H = [],
            K;
          for (K in l) {
            var M = l[K],
              I = k.getCurrentCellStyle(M)[mxConstants.STYLE_IMAGE];
            null != I && 'data:' == I.substring(0, 5) && (null == A[I] && (A[I] = (A[I] || 0) + 1, q++), H.push(M));
          }
          k.setCellStyles(mxConstants.STYLE_IMAGE, null, H);
          console.log('Removed', q, 'image(s) from', H.length, 'cell(s): ', [
            H,
            A
          ]);
        } finally {
          k.model.endUpdate();
        }
      }));
      c.actions.addAction('testInspect', mxUtils.bind(this, function() {
        console.log(c, k.getModel());
      }));
      c.actions.addAction('testXmlImageExport', mxUtils.bind(this, function() {
        var l = new mxImageExport(),
          q = k.getGraphBounds(),
          A = k.view.scale,
          H = mxUtils.createXmlDocument(),
          K = H.createElement('output');
        H.appendChild(K);
        H = new mxXmlCanvas2D(K);
        H.translate(Math.floor((1 - q.x) / A), Math.floor((1 - q.y) / A));
        H.scale(1 / A);
        var M = 0,
          I = H.save;
        H.save = function() {
          M++;
          I.apply(this, arguments);
        };
        var Q = H.restore;
        H.restore = function() {
          M--;
          Q.apply(this, arguments);
        };
        var P = l.drawShape;
        l.drawShape = function(O) {
          mxLog.debug('entering shape', O, M);
          P.apply(this, arguments);
          mxLog.debug('leaving shape', O, M);
        };
        l.drawState(k.getView().getState(k.model.root), H);
        mxLog.show();
        mxLog.debug(mxUtils.getXml(K));
        mxLog.debug('stateCounter', M);
      }));
      c.actions.addAction('testShowConsole', function() {
        mxLog.isVisible() ? mxLog.window.fit() : mxLog.show();
        mxLog.window.div.style.zIndex = mxPopupMenu.prototype.zIndex - 2;
      });
      this.put('testDevelop', new Menu(mxUtils.bind(this, function(l, q) {
        this.addMenuItems(l, 'createSidebarEntry showBoundingBox - testInspectPages testFixPages - testCheckFile testDiff - testInspect testOptimize - testXmlImageExport - testShowConsole'.split(' '), q);
      })));
    }
    c.actions.put('shapes', new Action(mxResources.get('moreShapes') + '...', function(l) {
      mxClient.IS_CHROMEAPP || !c.isOffline() ? c.showDialog(new MoreShapesDialog(c, !0).container, 640, isLocalStorage ? mxClient.IS_IOS ? 480 : 460 : 440, !0, !0) : c.showDialog(new MoreShapesDialog(c, !1).container, 360, isLocalStorage ? mxClient.IS_IOS ? 300 : 280 : 260, !0, !0);
    }));
    c.actions.put('createShape', new Action(mxResources.get('shape') + '...', function(l) {
      k.isEnabled() && (l = new mxCell('', new mxGeometry(0, 0, 120, 120), c.defaultCustomShapeStyle), l.vertex = !0, l = new EditShapeDialog(c, l, mxResources.get('editShape') + ':', 630, 400), c.showDialog(l.container, 640, 480, !0, !1), l.init());
    })).isEnabled = m;
    c.actions.put('embedHtml', new Action(mxResources.get('html') + '...', function() {
      c.spinner.spin(document.body, mxResources.get('loading')) && c.getPublicUrl(c.getCurrentFile(), function(l) {
        c.spinner.stop();
        c.showHtmlDialog(mxResources.get('create'), 'https://www.diagrams.net/doc/faq/embed-html-options', l, function(q, A, H, K, M, I, Q, P, O, W, p) {
          c.createHtml(q, A, H, K, M, I, Q, P, O, W, p, mxUtils.bind(this, function(B, N) {
            var S = new EmbedDialog(c, B + '\n' + N, null, null, function() {
              var R = window.open(),
                V = R.document;
              if (null != V) {
                'CSS1Compat' === document.compatMode && V.writeln('<!DOCTYPE html>');
                V.writeln('<html>');
                V.writeln('<head><title>' + encodeURIComponent(mxResources.get('preview')) + '</title><meta charset="utf-8"></head>');
                V.writeln('<body>');
                V.writeln(B);
                var T = mxClient.IS_IE || mxClient.IS_EDGE || null != document.documentMode;
                T && V.writeln(N);
                V.writeln('</body>');
                V.writeln('</html>');
                V.close();
                if (!T) {
                  var U = R.document.createElement('div');
                  U.marginLeft = '26px';
                  U.marginTop = '26px';
                  mxUtils.write(U, mxResources.get('updatingDocument'));
                  T = R.document.createElement('img');
                  T.setAttribute('src', window.location.protocol + '//' + window.location.hostname + '/' + IMAGE_PATH + '/spin.gif');
                  T.style.marginLeft = '6px';
                  U.appendChild(T);
                  R.document.body.insertBefore(U, R.document.body.firstChild);
                  window.setTimeout(function() {
                    var X = document.createElement('script');
                    X.type = 'text/javascript';
                    X.src = /<script.*?src="(.*?)"/.exec(N)[1];
                    V.body.appendChild(X);
                    U.parentNode.removeChild(U);
                  }, 20);
                }
              } else
                c.handleError({
                  message: mxResources.get('errorUpdatingPreview')
                });
            });
            c.showDialog(S.container, 450, 240, !0, !0);
            S.init();
          }));
        });
      });
    }));
    c.actions.put('liveImage', new Action('Live image...', function() {
      var l = c.getCurrentFile();
      null != l && c.spinner.spin(document.body, mxResources.get('loading')) && c.getPublicUrl(c.getCurrentFile(), function(q) {
        c.spinner.stop();
        null != q ? (q = new EmbedDialog(c, '<img src="' + (l.constructor != DriveFile ? q : 'https://drive.google.com/uc?id=' + l.getId()) + '"/>'), c.showDialog(q.container, 450, 240, !0, !0), q.init()) : c.handleError({
          message: mxResources.get('invalidPublicUrl')
        });
      });
    }));
    c.actions.put('embedImage', new Action(mxResources.get('image') + '...', function() {
      c.showEmbedImageDialog(function(l, q, A, H, K, M) {
        c.spinner.spin(document.body, mxResources.get('loading')) && c.createEmbedImage(l, q, A, H, K, M, function(I) {
          c.spinner.stop();
          I = new EmbedDialog(c, I);
          c.showDialog(I.container, 450, 240, !0, !0);
          I.init();
        }, function(I) {
          c.spinner.stop();
          c.handleError(I);
        });
      }, mxResources.get('image'), mxResources.get('retina'), c.isExportToCanvas());
    }));
    c.actions.put('embedSvg', new Action(mxResources.get('formatSvg') + '...', function() {
      c.showEmbedImageDialog(function(l, q, A, H, K, M) {
        c.spinner.spin(document.body, mxResources.get('loading')) && c.createEmbedSvg(l, q, A, H, K, M, function(I) {
          c.spinner.stop();
          I = new EmbedDialog(c, I);
          c.showDialog(I.container, 450, 240, !0, !0);
          I.init();
        }, function(I) {
          c.spinner.stop();
          c.handleError(I);
        });
      }, mxResources.get('formatSvg'), mxResources.get('image'), !0, 'https://www.diagrams.net/doc/faq/embed-svg.html');
    }));
    c.actions.put('embedIframe', new Action(mxResources.get('iframe') + '...', function() {
      var l = k.getGraphBounds();
      c.showPublishLinkDialog(mxResources.get('iframe'), null, '100%', Math.ceil(l.height / k.view.scale) + 2, function(q, A, H, K, M, I, Q, P, O) {
        c.spinner.spin(document.body, mxResources.get('loading')) && c.getPublicUrl(c.getCurrentFile(), function(W) {
          c.spinner.stop();
          var p = [];
          O && p.push('tags=%7B%7D');
          W = new EmbedDialog(c, '<iframe frameborder="0" style="width:' + Q + ';height:' + P + ';" src="' + c.createLink(q, A, H, K, M, I, W, null, p) + '"></iframe>');
          c.showDialog(W.container, 450, 240, !0, !0);
          W.init();
        });
      }, !0);
    }));
    c.actions.put('embedNotion', new Action(mxResources.get('notion') + '...', function() {
      var l = document.createElement('div');
      l.style.position = 'absolute';
      l.style.bottom = '30px';
      l.style.textAlign = 'center';
      l.style.width = '100%';
      l.style.left = '0px';
      var q = document.createElement('a');
      q.setAttribute('href', 'javascript:void(0);');
      q.setAttribute('target', '_blank');
      q.style.cursor = 'pointer';
      mxUtils.write(q, mxResources.get('getNotionChromeExtension'));
      l.appendChild(q);
      mxEvent.addListener(q, 'click', function(A) {
        c.openLink('https://chrome.google.com/webstore/detail/drawio-for-notion/plhaalebpkihaccllnkdaokdoeaokmle');
        mxEvent.consume(A);
      });
      c.showPublishLinkDialog(mxResources.get('notion'), null, null, null, function(A, H, K, M, I, Q, P, O, W) {
        c.spinner.spin(document.body, mxResources.get('loading')) && c.getPublicUrl(c.getCurrentFile(), function(p) {
          c.spinner.stop();
          var B = ['border=0'];
          W && B.push('tags=%7B%7D');
          p = new EmbedDialog(c, c.createLink(A, H, K, M, I, Q, p, null, B, !0));
          c.showDialog(p.container, 450, 240, !0, !0);
          p.init();
        });
      }, !0, 'https://www.diagrams.net/blog/drawio-notion', l);
    }));
    c.actions.put('publishLink', new Action(mxResources.get('link') + '...', function() {
      c.showPublishLinkDialog(null, null, null, null, function(l, q, A, H, K, M, I, Q, P) {
        c.spinner.spin(document.body, mxResources.get('loading')) && c.getPublicUrl(c.getCurrentFile(), function(O) {
          c.spinner.stop();
          var W = [];
          P && W.push('tags=%7B%7D');
          O = new EmbedDialog(c, c.createLink(l, q, A, H, K, M, O, null, W));
          c.showDialog(O.container, 450, 240, !0, !0);
          O.init();
        });
      });
    }));
    c.actions.addAction('microsoftOffice...', function() {
      c.openLink('https://office.draw.io');
    });
    c.actions.addAction('googleDocs...', function() {
      c.openLink('http://docsaddon.draw.io');
    });
    c.actions.addAction('googleSlides...', function() {
      c.openLink('https://slidesaddon.draw.io');
    });
    c.actions.addAction('googleSheets...', function() {
      c.openLink('https://sheetsaddon.draw.io');
    });
    c.actions.addAction('googleSites...', function() {
      c.spinner.spin(document.body, mxResources.get('loading')) && c.getPublicUrl(c.getCurrentFile(), function(l) {
        c.spinner.stop();
        l = new GoogleSitesDialog(c, l);
        c.showDialog(l.container, 420, 256, !0, !0);
        l.init();
      });
    });
    if (isLocalStorage || mxClient.IS_CHROMEAPP)
      D = c.actions.addAction('scratchpad', function() {
        c.toggleScratchpad();
      }), D.setToggleAction(!0), D.setSelectedCallback(function() {
        return null != c.scratchpad;
      }), '0' != urlParams.plugins && c.actions.addAction('plugins...', function() {
        c.showDialog(new PluginsDialog(c).container, 380, 240, !0, !1);
      });
    D = c.actions.addAction('search', function() {
      var l = c.sidebar.isEntryVisible('search');
      c.sidebar.showPalette('search', !l);
      isLocalStorage && (mxSettings.settings.search = !l, mxSettings.save());
    });
    D.label = mxResources.get('searchShapes');
    D.setToggleAction(!0);
    D.setSelectedCallback(function() {
      return c.sidebar.isEntryVisible('search');
    });
    '1' == urlParams.embed && (c.actions.get('save').funct = function(l) {
      k.isEditing() && k.stopEditing();
      var q = '0' != urlParams.pages || null != c.pages && 1 < c.pages.length ? c.getFileData(!0) : mxUtils.getXml(c.editor.getGraphXml());
      if ('json' == urlParams.proto) {
        var A = c.createLoadMessage('save');
        A.xml = q;
        l && (A.exit = !0);
        q = JSON.stringify(A);
      }
      (window.opener || window.parent).postMessage(q, '*');
      '0' != urlParams.modified && '1' != urlParams.keepmodified && (c.editor.modified = !1, c.editor.setStatus(''));
      l = c.getCurrentFile();
      null == l || l.constructor == EmbedFile || l.constructor == LocalFile && null == l.mode || c.saveFile();
    }, c.actions.addAction('saveAndExit', function() {
      '1' == urlParams.toSvg ? c.sendEmbeddedSvgExport() : c.actions.get('save').funct(!0);
    }).label = '1' == urlParams.publishClose ? mxResources.get('publish') : mxResources.get('saveAndExit'), c.actions.addAction('exit', function() {
      if ('1' == urlParams.embedInline)
        c.sendEmbeddedSvgExport();
      else {
        var l = function() {
          c.editor.modified = !1;
          var q = 'json' == urlParams.proto ? JSON.stringify({
            event: 'exit',
            modified: c.editor.modified
          }) : '';
          (window.opener || window.parent).postMessage(q, '*');
        };
        c.editor.modified ? c.confirm(mxResources.get('allChangesLost'), null, l, mxResources.get('cancel'), mxResources.get('discardChanges')) : l();
      }
    }));
    this.put('exportAs', new Menu(mxUtils.bind(this, function(l, q) {
      c.isExportToCanvas() ? (this.addMenuItems(l, ['exportPng'], q), c.jpgSupported && this.addMenuItems(l, ['exportJpg'], q)) : c.isOffline() || mxClient.IS_IOS && navigator.standalone || this.addMenuItems(l, [
        'exportPng',
        'exportJpg'
      ], q);
      this.addMenuItems(l, [
        'exportSvg',
        '-'
      ], q);
      c.isOffline() || c.printPdfExport ? this.addMenuItems(l, ['exportPdf'], q) : c.isOffline() || mxClient.IS_IOS && navigator.standalone || this.addMenuItems(l, ['exportPdf'], q);
      mxClient.IS_IE || 'undefined' === typeof VsdxExport && c.isOffline() || this.addMenuItems(l, ['exportVsdx'], q);
      this.addMenuItems(l, [
        '-',
        'exportHtml',
        'exportXml',
        'exportUrl'
      ], q);
      c.isOffline() || (l.addSeparator(q), this.addMenuItem(l, 'export', q).firstChild.nextSibling.innerHTML = mxResources.get('advanced') + '...');
      mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || 'min' != Editor.currentTheme || this.addMenuItems(l, ['publishLink'], q);
      c.mode == App.MODE_ATLAS || '1' == urlParams.extAuth || 'simple' != Editor.currentTheme && 'sketch' != Editor.currentTheme && 'min' != Editor.currentTheme || (l.addSeparator(q), c.menus.addSubmenu('embed', l, q));
    })));
    this.put('importFrom', new Menu(mxUtils.bind(this, function(l, q) {
      function A(M) {
        M.pickFile(function(I) {
          c.spinner.spin(document.body, mxResources.get('loading')) && M.getFile(I, function(Q) {
            var P = 'data:image/' == Q.getData().substring(0, 11) ? K(Q.getTitle()) : 'text/xml';
            /\.svg$/i.test(Q.getTitle()) && !c.editor.isDataSvg(Q.getData()) && (Q.setData(Editor.createSvgDataUri(Q.getData())), P = 'image/svg+xml');
            H(Q.getData(), P, Q.getTitle());
          }, function(Q) {
            c.handleError(Q, null != Q ? mxResources.get('errorLoadingFile') : null);
          }, M == c.drive);
        }, !0);
      }
      var H = mxUtils.bind(this, function(M, I, Q) {
          var P = k.view,
            O = k.getGraphBounds(),
            W = k.snap(Math.ceil(Math.max(0, O.x / P.scale - P.translate.x) + 4 * k.gridSize)),
            p = k.snap(Math.ceil(Math.max(0, (O.y + O.height) / P.scale - P.translate.y) + 4 * k.gridSize));
          'data:image/' == M.substring(0, 11) ? c.loadImage(M, mxUtils.bind(this, function(B) {
            var N = !0,
              S = mxUtils.bind(this, function() {
                c.resizeImage(B, M, mxUtils.bind(this, function(R, V, T) {
                  R = N ? Math.min(1, Math.min(c.maxImageSize / V, c.maxImageSize / T)) : 1;
                  c.importFile(M, I, W, p, Math.round(V * R), Math.round(T * R), Q, function(U) {
                    c.spinner.stop();
                    k.setSelectionCells(U);
                    k.scrollCellToVisible(k.getSelectionCell());
                  });
                }), N);
              });
            M.length > c.resampleThreshold ? c.confirmImageResize(function(R) {
              N = R;
              S();
            }) : S();
          }), mxUtils.bind(this, function() {
            c.handleError({
              message: mxResources.get('cannotOpenFile')
            });
          })) : c.importFile(M, I, W, p, 0, 0, Q, function(B) {
            c.spinner.stop();
            k.setSelectionCells(B);
            k.scrollCellToVisible(k.getSelectionCell());
          });
        }),
        K = mxUtils.bind(this, function(M) {
          var I = 'text/xml';
          /\.png$/i.test(M) ? I = 'image/png' : /\.jpe?g$/i.test(M) ? I = 'image/jpg' : /\.gif$/i.test(M) ? I = 'image/gif' : /\.pdf$/i.test(M) && (I = 'application/pdf');
          return I;
        });
      'undefined' != typeof google && 'undefined' != typeof google.picker && (null != c.drive ? l.addItem(mxResources.get('googleDrive') + '...', null, function() {
        A(c.drive);
      }, q) : t && 'function' === typeof window.DriveClient && l.addItem(mxResources.get('googleDrive') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1));
      null != c.oneDrive ? l.addItem(mxResources.get('oneDrive') + '...', null, function() {
        A(c.oneDrive);
      }, q) : E && 'function' === typeof window.OneDriveClient && l.addItem(mxResources.get('oneDrive') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      null != c.dropbox ? l.addItem(mxResources.get('dropbox') + '...', null, function() {
        A(c.dropbox);
      }, q) : y && 'function' === typeof window.DropboxClient && l.addItem(mxResources.get('dropbox') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      l.addSeparator(q);
      null != c.gitHub && l.addItem(mxResources.get('github') + '...', null, function() {
        A(c.gitHub);
      }, q);
      null != c.gitLab && l.addItem(mxResources.get('gitlab') + '...', null, function() {
        A(c.gitLab);
      }, q);
      null != c.trello ? l.addItem(mxResources.get('trello') + '...', null, function() {
        A(c.trello);
      }, q) : z && 'function' === typeof window.TrelloClient && l.addItem(mxResources.get('trello') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      l.addSeparator(q);
      isLocalStorage && '0' != urlParams.browser && l.addItem(mxResources.get('browser') + '...', null, function() {
        c.importLocalFile(!1);
      }, q);
      '1' != urlParams.noDevice && l.addItem(mxResources.get('device') + '...', null, function() {
        c.importLocalFile(!0);
      }, q);
      c.isOffline() || (l.addSeparator(q), l.addItem(mxResources.get('url') + '...', null, function() {
        var M = new FilenameDialog(c, '', mxResources.get('import'), function(I) {
          if (null != I && 0 < I.length && c.spinner.spin(document.body, mxResources.get('loading'))) {
            var Q = /(\.png)($|\?)/i.test(I) ? 'image/png' : 'text/xml';
            c.editor.loadUrl(PROXY_URL + '?url=' + encodeURIComponent(I), function(P) {
              H(P, Q, I);
            }, function() {
              c.spinner.stop();
              c.handleError(null, mxResources.get('errorLoadingFile'));
            }, 'image/png' == Q);
          }
        }, mxResources.get('url'));
        c.showDialog(M.container, 300, 80, !0, !0);
        M.init();
      }, q));
    }))).isEnabled = m;
    this.put('appearance', new Menu(mxUtils.bind(this, function(l, q) {
      var A = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      'simple' == Editor.currentTheme && (750 > A && this.addSubmenu('viewZoom', l, q, mxResources.get('zoom')), 460 > A && c.isPageMenuVisible() && this.addSubmenu('pages', l, q), 320 > A && this.addSubmenu('insert', l, q), 360 > A && '1' != urlParams.embed && 'draw.io' == this.getServiceName() && this.addSubmenu('share', l, q));
      this.addMenuItems(l, '- lightMode darkMode autoMode - toggleSimpleMode'.split(' '), q);
    })));
    c.actions.addAction('addToScratchpad', function(l) {
      k.isSelectionEmpty() || null == c.addSelectionToScratchpad || c.addSelectionToScratchpad(l);
    });
    c.actions.addAction('accounts...', function() {
      c.toggleUserPanel();
      c.userPanel.style.right = '10px';
      c.userPanel.style.top = '10px';
    });
    this.put('theme', new Menu(mxUtils.bind(this, function(l, q) {
      var A = '1' == urlParams.sketch ? 'sketch' : mxSettings.getUi(),
        H = l.addItem(mxResources.get('automatic'), null, function() {
          c.setCurrentTheme('');
        }, q);
      'kennedy' != A && 'atlas' != A && 'dark' != A && 'simple' != A && 'sketch' != A && 'min' != A && l.addCheckmark(H, Editor.checkmarkImage);
      H = l.addItem(mxResources.get('default'), null, function() {
        c.setCurrentTheme('kennedy');
      }, q);
      'kennedy' != A && 'dark' != A && 'simple' != A || l.addCheckmark(H, Editor.checkmarkImage);
      H = l.addItem(mxResources.get('sketch'), null, function() {
        c.setCurrentTheme('sketch');
      }, q);
      'sketch' == A && l.addCheckmark(H, Editor.checkmarkImage);
      H = l.addItem(mxResources.get('minimal'), null, function() {
        c.setCurrentTheme('min');
      }, q);
      'min' == A && l.addCheckmark(H, Editor.checkmarkImage);
      H = l.addItem(mxResources.get('atlas'), null, function() {
        c.setCurrentTheme('atlas');
      }, q);
      'atlas' == A && l.addCheckmark(H, Editor.checkmarkImage);
    })));
    D = this.editorUi.actions.addAction('rename...', mxUtils.bind(this, function() {
      var l = this.editorUi.getCurrentFile();
      if (null != l)
        if (l.constructor == LocalFile && null != l.fileHandle)
          c.showSaveFilePicker(mxUtils.bind(c, function(A, H) {
            l.invalidFileHandle = null;
            l.fileHandle = A;
            l.title = H.name;
            l.desc = H;
            c.save(H.name);
          }), null, c.createFileSystemOptions(l.getTitle()));
        else {
          var q = null != l.getTitle() ? l.getTitle() : this.editorUi.defaultFilename;
          q = new FilenameDialog(this.editorUi, q, mxResources.get('rename'), mxUtils.bind(this, function(A) {
            null != A && 0 < A.length && null != l && A != l.getTitle() && this.editorUi.spinner.spin(document.body, mxResources.get('renaming')) && l.rename(A, mxUtils.bind(this, function(H) {
              this.editorUi.spinner.stop();
            }), mxUtils.bind(this, function(H) {
              this.editorUi.handleError(H, null != H ? mxResources.get('errorRenamingFile') : null);
            }));
          }), l.constructor == DriveFile || l.constructor == StorageFile ? mxResources.get('diagramName') : null, function(A) {
            if (null != A && 0 < A.length)
              return !0;
            c.showError(mxResources.get('error'), mxResources.get('invalidName'), mxResources.get('ok'));
            return !1;
          }, null, null, null, null, c.editor.fileExtensions);
          this.editorUi.showDialog(q.container, 340, 96, !0, !0);
          q.init();
        }
    }));
    D.isEnabled = function() {
      return this.enabled && m.apply(this, arguments);
    };
    D.visible = '1' != urlParams.embed;
    c.actions.addAction('makeCopy...', mxUtils.bind(this, function() {
      var l = c.getCurrentFile();
      if (null != l) {
        var q = c.getCopyFilename(l);
        l.constructor == DriveFile ? (q = new CreateDialog(c, q, mxUtils.bind(this, function(A, H) {
          '_blank' == H ? c.editor.editAsNew(c.getFileData(), A) : ('download' == H && (H = App.MODE_GOOGLE), null != A && 0 < A.length && (H == App.MODE_GOOGLE ? c.spinner.spin(document.body, mxResources.get('saving')) && l.saveAs(A, mxUtils.bind(this, function(K) {
            l.desc = K;
            l.save(!1, mxUtils.bind(this, function() {
              c.spinner.stop();
              l.setModified(!1);
              l.addAllSavedStatus();
            }), mxUtils.bind(this, function(M) {
              c.handleError(M);
            }));
          }), mxUtils.bind(this, function(K) {
            c.handleError(K);
          })) : c.createFile(A, c.getFileData(!0), null, H)));
        }), mxUtils.bind(this, function() {
          c.hideDialog();
        }), mxResources.get('makeCopy'), mxResources.get('create'), null, null, !0, null, !0, null, null, null, null, c.editor.fileExtensions), c.showDialog(q.container, 420, 380, !0, !0), q.init()) : c.editor.editAsNew(this.editorUi.getFileData(!0), q);
      }
    }));
    c.actions.put('openFolder', new Action(mxResources.get('openIt', [mxResources.get('folder')]) + '...', function(l, q) {
      l = c.getCurrentFile();
      null != l && c.openLink(l.getFolderUrl());
    }));
    c.actions.addAction('openFile...', mxUtils.bind(this, function() {
      var l = c.getCurrentFile();
      null != l && c.openLink(l.getFileUrl());
    }));
    c.actions.addAction('moveToFolder...', mxUtils.bind(this, function() {
      var l = c.getCurrentFile();
      if (l.getMode() == App.MODE_GOOGLE || l.getMode() == App.MODE_ONEDRIVE) {
        var q = !1;
        if (l.getMode() == App.MODE_GOOGLE && null != l.desc.parents)
          for (var A = 0; A < l.desc.parents.length; A++)
            if (l.desc.parents[A].isRoot) {
              q = !0;
              break;
            }
        c.pickFolder(l.getMode(), mxUtils.bind(this, function(H) {
          c.spinner.spin(document.body, mxResources.get('moving')) && l.move(H, mxUtils.bind(this, function(K) {
            c.spinner.stop();
          }), mxUtils.bind(this, function(K) {
            c.handleError(K);
          }));
        }), null, !0, q);
      }
    }));
    this.put('publish', new Menu(mxUtils.bind(this, function(l, q) {
      this.addMenuItems(l, ['publishLink'], q);
    })));
    c.actions.put('useOffline', new Action(mxResources.get('useOffline') + '...', function() {
      c.openLink('https://app.draw.io/');
    }));
    this.editorUi.actions.addAction('share...', mxUtils.bind(this, function() {
      try {
        var l = c.getCurrentFile();
        null != l && l.share();
      } catch (q) {
        c.handleError(q);
      }
    }));
    this.put('embed', new Menu(mxUtils.bind(this, function(l, q) {
      var A = c.getCurrentFile();
      null == A || A.getMode() != App.MODE_GOOGLE && A.getMode() != App.MODE_GITHUB || !/(\.png)$/i.test(A.getTitle()) || this.addMenuItems(l, [
        'liveImage',
        '-'
      ], q);
      this.addMenuItems(l, [
        'embedImage',
        'embedSvg',
        '-',
        'embedHtml'
      ], q);
      navigator.standalone || c.isOffline() || this.addMenuItems(l, ['embedIframe'], q);
      '1' == urlParams.embed || c.isOffline() || this.addMenuItems(l, '- googleDocs googleSlides googleSheets - microsoftOffice - embedNotion'.split(' '), q);
    })));
    c.addInsertItem = function(l, q, A, H) {
      ('plantUml' != H || EditorUi.enablePlantUml && !c.isOffline()) && l.addItem(A, null, mxUtils.bind(this, function() {
        if ('fromText' == H || 'formatSql' == H || 'plantUml' == H || 'mermaid' == H) {
          var K = new ParseDialog(c, A, H);
          c.showDialog(K.container, 620, 420, !0, !1);
          c.dialog.container.style.overflow = 'auto';
        } else
          K = new CreateGraphDialog(c, A, H), c.showDialog(K.container, 620, 420, !0, !1);
        K.init();
      }), q, null, m());
    };
    var u = function(l) {
        k.getModel().beginUpdate();
        try {
          l = k.addCell(l), k.fireEvent(new mxEventObject('cellsInserted', 'cells', [l])), k.model.isVertex(l) && k.isAutoSizeCell(l) && k.updateCellSize(l);
        } finally {
          k.getModel().endUpdate();
        }
        k.scrollCellToVisible(l);
        k.setSelectionCell(l);
        k.container.focus();
        k.editAfterInsert && k.startEditing(l);
        window.setTimeout(function() {
          null != c.hoverIcons && c.hoverIcons.update(k.view.getState(l));
        }, 0);
        return l;
      },
      x = function(l, q, A, H, K) {
        l = new mxCell(l, new mxGeometry(0, 0, q, A), H);
        l.vertex = !0;
        null == K && (K = k.getCenterInsertPoint(k.getBoundingBoxFromGeometry([l], !0)));
        l.geometry.x = K.x;
        l.geometry.y = K.y;
        return u(l);
      };
    c.actions.put('insertText', new Action(mxResources.get('text'), function(l) {
      k.isEnabled() && !k.isCellLocked(k.getDefaultParent()) && k.startEditingAtCell(x('Text', 60, 30, 'text;strokeColor=none;align=center;fillColor=none;html=1;verticalAlign=middle;whiteSpace=wrap;rounded=0;', null == l || mxEvent.isControlDown(l) || mxEvent.isMetaDown(l) || !k.isMouseInsertPoint() ? null : k.getInsertPoint()));
    }, null, null, 'A')).isEnabled = m;
    c.actions.put('insertRectangle', new Action(mxResources.get('rectangle'), function(l) {
      k.isEnabled() && !k.isCellLocked(k.getDefaultParent()) && x('', 120, 60, 'whiteSpace=wrap;html=1;', null == l || mxEvent.isControlDown(l) || mxEvent.isMetaDown(l) || !k.isMouseInsertPoint() ? null : k.getInsertPoint());
    }, null, null, 'D')).isEnabled = m;
    c.actions.put('insertNote', new Action(mxResources.get('note'), function(l) {
      k.isEnabled() && !k.isCellLocked(k.getDefaultParent()) && x('', 140, 160, 'shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;fontColor=#000000;darkOpacity=0.05;fillColor=#FFF9B2;strokeColor=none;fillStyle=solid;direction=west;gradientDirection=north;gradientColor=#FFF2A1;shadow=1;size=20;pointerEvents=1;', null == l || mxEvent.isControlDown(l) || mxEvent.isMetaDown(l) || !k.isMouseInsertPoint() ? null : k.getInsertPoint());
    }, null, null, 'S')).isEnabled = m;
    c.actions.put('insertEllipse', new Action(mxResources.get('ellipse'), function(l) {
      k.isEnabled() && !k.isCellLocked(k.getDefaultParent()) && x('', 80, 80, 'ellipse;whiteSpace=wrap;html=1;', null == l || mxEvent.isControlDown(l) || mxEvent.isMetaDown(l) || !k.isMouseInsertPoint() ? null : k.getInsertPoint());
    }, null, null, 'F')).isEnabled = m;
    c.actions.put('insertRhombus', new Action(mxResources.get('rhombus'), function(l) {
      k.isEnabled() && !k.isCellLocked(k.getDefaultParent()) && x('', 80, 80, 'rhombus;whiteSpace=wrap;html=1;', null == l || mxEvent.isControlDown(l) || mxEvent.isMetaDown(l) || !k.isMouseInsertPoint() ? null : k.getInsertPoint());
    }, null, null, 'R')).isEnabled = m;
    c.actions.put('insertEdge', new Action(mxResources.get('line'), function(l) {
      if (k.isEnabled() && !k.isCellLocked(k.getDefaultParent())) {
        var q = k.defaultEdgeLength;
        l = null == l || mxEvent.isControlDown(l) || mxEvent.isMetaDown(l) || !k.isMouseInsertPoint() ? null : k.getInsertPoint();
        null == l && (l = k.getCenterInsertPoint(k.getBoundingBoxFromGeometry([A], !0)));
        var A = new mxCell('', new mxGeometry(0, 0, q, 0), 'edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;');
        A.geometry.setTerminalPoint(l, !0);
        A.geometry.setTerminalPoint(new mxPoint(l.x + A.geometry.width, l.y), !1);
        A.geometry.points = [];
        A.geometry.relative = !0;
        A.edge = !0;
        u(A);
      }
    }, null, null, 'C')).isEnabled = m;
    D = c.actions.put('toggleShapes', new Action(mxResources.get('shapes'), function() {
      null != c.sidebarWindow ? c.sidebarWindow.window.setVisible(!c.sidebarWindow.window.isVisible()) : c.toggleShapesPanel(!c.isShapesPanelVisible());
    }, null, null, Editor.ctrlKey + '+Shift+K'));
    D.setToggleAction(!0);
    D.setSelectedCallback(mxUtils.bind(this, function() {
      return null != c.sidebarWindow && c.sidebarWindow.window.isVisible() || null == c.sidebarWindow && 0 < c.hsplitPosition;
    }));
    c.addInsertMenuItems = mxUtils.bind(this, function(l, q, A) {
      for (var H = 0; H < A.length; H++)
        '-' == A[H] ? l.addSeparator(q) : c.addInsertItem(l, q, mxResources.get(A[H]) + '...', A[H]);
    });
    this.put('insert', new Menu(mxUtils.bind(this, function(l, q) {
      '1' == urlParams.sketch ? (c.menus.addMenuItems(l, ['toggleShapes'], q), c.menus.addSubmenu('table', l, q), l.addSeparator(q), c.insertTemplateEnabled && !c.isOffline() && c.menus.addMenuItems(l, ['insertTemplate'], q), c.menus.addMenuItems(l, [
        'insertImage',
        'insertLink',
        '-'
      ], q), c.menus.addSubmenu('insertAdvanced', l, q, mxResources.get('advanced')), c.menus.addSubmenu('layout', l, q)) : (this.addMenuItems(l, 'insertRectangle insertEllipse insertRhombus - insertEdge insertNote - insertText insertLink - createShape insertFreehand - insertImage'.split(' '), q), c.insertTemplateEnabled && !c.isOffline() && this.addMenuItems(l, ['insertTemplate'], q), l.addSeparator(q), 'min' != uiTheme && 'simple' != Editor.currentTheme || this.addSubmenu('table', l, q), this.addSubmenu('insertLayout', l, q, mxResources.get('layout')), this.addSubmenu('insertAdvanced', l, q, mxResources.get('advanced')));
    })));
    this.put('table', new Menu(mxUtils.bind(this, function(l, q) {
      c.menus.addInsertTableCellItem(l, q);
    })));
    this.put('insertLayout', new Menu(mxUtils.bind(this, function(l, q) {
      c.addInsertMenuItems(l, q, 'horizontalFlow verticalFlow - horizontalTree verticalTree radialTree - organic circle'.split(' '));
    })));
    this.put('insertAdvanced', new Menu(mxUtils.bind(this, function(l, q) {
      c.addInsertMenuItems(l, q, [
        'fromText',
        'plantUml',
        'mermaid',
        '-',
        'formatSql'
      ]);
      l.addItem(mxResources.get('csv') + '...', null, function() {
        k.popupMenuHandler.hideMenu();
        c.showImportCsvDialog();
      }, q, null, m());
      if ('simple' == Editor.currentTheme || 'min' == Editor.currentTheme)
        this.addMenuItems(l, [
          '-',
          'createShape'
        ], q), 'simple' == Editor.currentTheme && this.addMenuItems(l, ['insertTemplate'], q), this.addMenuItems(l, ['editDiagram'], q);
    })));
    this.put('openRecent', new Menu(function(l, q) {
      var A = c.getRecent();
      if (null != A) {
        for (var H = 0; H < A.length; H++)
          (function(K) {
            var M = K.mode;
            M == App.MODE_GOOGLE ? M = 'googleDrive' : M == App.MODE_ONEDRIVE && (M = 'oneDrive');
            l.addItem(K.title + ' (' + mxResources.get(M) + ')', null, function() {
              c.loadFile(K.id);
            }, q);
          }(A[H]));
        l.addSeparator(q);
      }
      l.addItem(mxResources.get('reset'), null, function() {
        c.resetRecent();
      }, q);
    }));
    this.put('openFrom', new Menu(function(l, q) {
      null != c.drive ? l.addItem(mxResources.get('googleDrive') + '...', null, function() {
        c.pickFile(App.MODE_GOOGLE);
      }, q) : t && 'function' === typeof window.DriveClient && l.addItem(mxResources.get('googleDrive') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      null != c.oneDrive ? l.addItem(mxResources.get('oneDrive') + '...', null, function() {
        c.pickFile(App.MODE_ONEDRIVE);
      }, q) : E && 'function' === typeof window.OneDriveClient && l.addItem(mxResources.get('oneDrive') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      null != c.dropbox ? l.addItem(mxResources.get('dropbox') + '...', null, function() {
        c.pickFile(App.MODE_DROPBOX);
      }, q) : y && 'function' === typeof window.DropboxClient && l.addItem(mxResources.get('dropbox') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      l.addSeparator(q);
      null != c.gitHub && l.addItem(mxResources.get('github') + '...', null, function() {
        c.pickFile(App.MODE_GITHUB);
      }, q);
      null != c.gitLab && l.addItem(mxResources.get('gitlab') + '...', null, function() {
        c.pickFile(App.MODE_GITLAB);
      }, q);
      null != c.trello ? l.addItem(mxResources.get('trello') + '...', null, function() {
        c.pickFile(App.MODE_TRELLO);
      }, q) : z && 'function' === typeof window.TrelloClient && l.addItem(mxResources.get('trello') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      l.addSeparator(q);
      isLocalStorage && '0' != urlParams.browser && l.addItem(mxResources.get('browser') + '...', null, function() {
        c.pickFile(App.MODE_BROWSER);
      }, q);
      '1' != urlParams.noDevice && l.addItem(mxResources.get('device') + '...', null, function() {
        c.pickFile(App.MODE_DEVICE);
      }, q);
      c.isOffline() || (l.addSeparator(q), l.addItem(mxResources.get('url') + '...', null, function() {
        var A = new FilenameDialog(c, '', mxResources.get('open'), function(H) {
          null != H && 0 < H.length && (null == c.getCurrentFile() ? window.location.hash = '#U' + encodeURIComponent(H) : window.openWindow((mxClient.IS_CHROMEAPP ? 'https://www.draw.io/' : 'https://' + location.host + '/') + window.location.search + '#U' + encodeURIComponent(H)));
        }, mxResources.get('url'));
        c.showDialog(A.container, 300, 80, !0, !0);
        A.init();
      }, q));
    }));
    Editor.enableCustomLibraries && (this.put('newLibrary', new Menu(function(l, q) {
      'undefined' != typeof google && 'undefined' != typeof google.picker && (null != c.drive ? l.addItem(mxResources.get('googleDrive') + '...', null, function() {
        c.showLibraryDialog(null, null, null, null, App.MODE_GOOGLE);
      }, q) : t && 'function' === typeof window.DriveClient && l.addItem(mxResources.get('googleDrive') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1));
      null != c.oneDrive ? l.addItem(mxResources.get('oneDrive') + '...', null, function() {
        c.showLibraryDialog(null, null, null, null, App.MODE_ONEDRIVE);
      }, q) : E && 'function' === typeof window.OneDriveClient && l.addItem(mxResources.get('oneDrive') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      null != c.dropbox ? l.addItem(mxResources.get('dropbox') + '...', null, function() {
        c.showLibraryDialog(null, null, null, null, App.MODE_DROPBOX);
      }, q) : y && 'function' === typeof window.DropboxClient && l.addItem(mxResources.get('dropbox') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      l.addSeparator(q);
      null != c.gitHub && l.addItem(mxResources.get('github') + '...', null, function() {
        c.showLibraryDialog(null, null, null, null, App.MODE_GITHUB);
      }, q);
      null != c.gitLab && l.addItem(mxResources.get('gitlab') + '...', null, function() {
        c.showLibraryDialog(null, null, null, null, App.MODE_GITLAB);
      }, q);
      null != c.trello ? l.addItem(mxResources.get('trello') + '...', null, function() {
        c.showLibraryDialog(null, null, null, null, App.MODE_TRELLO);
      }, q) : z && 'function' === typeof window.TrelloClient && l.addItem(mxResources.get('trello') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      l.addSeparator(q);
      isLocalStorage && '0' != urlParams.browser && l.addItem(mxResources.get('browser') + '...', null, function() {
        c.showLibraryDialog(null, null, null, null, App.MODE_BROWSER);
      }, q);
      '1' != urlParams.noDevice && l.addItem(mxResources.get('device') + '...', null, function() {
        c.showLibraryDialog(null, null, null, null, App.MODE_DEVICE);
      }, q);
    })), this.put('openLibraryFrom', new Menu(function(l, q) {
      'undefined' != typeof google && 'undefined' != typeof google.picker && (null != c.drive ? l.addItem(mxResources.get('googleDrive') + '...', null, function() {
        c.pickLibrary(App.MODE_GOOGLE);
      }, q) : t && 'function' === typeof window.DriveClient && l.addItem(mxResources.get('googleDrive') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1));
      null != c.oneDrive ? l.addItem(mxResources.get('oneDrive') + '...', null, function() {
        c.pickLibrary(App.MODE_ONEDRIVE);
      }, q) : E && 'function' === typeof window.OneDriveClient && l.addItem(mxResources.get('oneDrive') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      null != c.dropbox ? l.addItem(mxResources.get('dropbox') + '...', null, function() {
        c.pickLibrary(App.MODE_DROPBOX);
      }, q) : y && 'function' === typeof window.DropboxClient && l.addItem(mxResources.get('dropbox') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      l.addSeparator(q);
      null != c.gitHub && l.addItem(mxResources.get('github') + '...', null, function() {
        c.pickLibrary(App.MODE_GITHUB);
      }, q);
      null != c.gitLab && l.addItem(mxResources.get('gitlab') + '...', null, function() {
        c.pickLibrary(App.MODE_GITLAB);
      }, q);
      null != c.trello ? l.addItem(mxResources.get('trello') + '...', null, function() {
        c.pickLibrary(App.MODE_TRELLO);
      }, q) : z && 'function' === typeof window.TrelloClient && l.addItem(mxResources.get('trello') + ' (' + mxResources.get('loading') + '...)', null, function() {}, q, null, !1);
      l.addSeparator(q);
      isLocalStorage && '0' != urlParams.browser && l.addItem(mxResources.get('browser') + '...', null, function() {
        c.pickLibrary(App.MODE_BROWSER);
      }, q);
      '1' != urlParams.noDevice && l.addItem(mxResources.get('device') + '...', null, function() {
        c.pickLibrary(App.MODE_DEVICE);
      }, q);
      c.isOffline() || (l.addSeparator(q), l.addItem(mxResources.get('url') + '...', null, function() {
        var A = new FilenameDialog(c, '', mxResources.get('open'), function(H) {
          if (null != H && 0 < H.length && c.spinner.spin(document.body, mxResources.get('loading'))) {
            var K = H;
            c.editor.isCorsEnabledForUrl(H) || (K = PROXY_URL + '?url=' + encodeURIComponent(H));
            mxUtils.get(K, function(M) {
              if (200 <= M.getStatus() && 299 >= M.getStatus()) {
                c.spinner.stop();
                try {
                  c.loadLibrary(new UrlLibrary(this, M.getText(), H));
                } catch (I) {
                  c.handleError(I, mxResources.get('errorLoadingFile'));
                }
              } else
                c.spinner.stop(), c.handleError(null, mxResources.get('errorLoadingFile'));
            }, function() {
              c.spinner.stop();
              c.handleError(null, mxResources.get('errorLoadingFile'));
            });
          }
        }, mxResources.get('url'));
        c.showDialog(A.container, 300, 80, !0, !0);
        A.init();
      }, q));
      '1' == urlParams.confLib && (l.addSeparator(q), l.addItem(mxResources.get('confluenceCloud') + '...', null, function() {
        c.showRemotelyStoredLibrary(mxResources.get('libraries'));
      }, q));
    })));
    this.put('edit', new Menu(mxUtils.bind(this, function(l, q) {
      this.addMenuItems(l, 'undo redo - cut copy copyAsImage paste delete - duplicate - findReplace - editData editTooltip - editStyle editGeometry - edit - editLink openLink - selectVertices selectEdges selectAll selectNone - lockUnlock'.split(' '));
    })));
    D = c.actions.addAction('comments', mxUtils.bind(this, function() {
      if (null == this.commentsWindow)
        this.commentsWindow = new CommentsWindow(c, document.body.offsetWidth - 380, 120, 300, 350), this.commentsWindow.window.addListener('show', function() {
          c.fireEvent(new mxEventObject('comments'));
        }), this.commentsWindow.window.addListener('hide', function() {
          c.fireEvent(new mxEventObject('comments'));
        }), this.commentsWindow.window.setVisible(!0), c.fireEvent(new mxEventObject('comments'));
      else {
        var l = !this.commentsWindow.window.isVisible();
        this.commentsWindow.window.setVisible(l);
        this.commentsWindow.refreshCommentsTime();
        l && this.commentsWindow.hasError && this.commentsWindow.refreshComments();
      }
    }));
    D.setToggleAction(!0);
    D.setSelectedCallback(mxUtils.bind(this, function() {
      return null != this.commentsWindow && this.commentsWindow.window.isVisible();
    }));
    c.editor.addListener('fileLoaded', mxUtils.bind(this, function() {
      null != this.commentsWindow && (this.commentsWindow.destroy(), this.commentsWindow = null);
    }));
    this.get('viewPanels').funct = function(l, q) {
      var A = c.getCurrentFile();
      c.menus.addMenuItems(l, 'toggleShapes format ruler - findReplace layers tags outline -'.split(' '), q);
      c.commentsSupported() && c.menus.addMenuItems(l, ['comments'], q);
      null != A && A.isRealtimeEnabled() && A.isRealtimeSupported() && c.menus.addMenuItems(l, ['showRemoteCursors'], q);
      c.menus.addMenuItems(l, [
        '-',
        'fullscreen'
      ], q);
    };
    this.put('view', new Menu(mxUtils.bind(this, function(l, q) {
      if ('simple' == Editor.currentTheme) {
        var A = c.getCurrentFile();
        c.menus.addMenuItems(l, [
          'toggleShapes',
          'format'
        ], q);
        c.isPageMenuVisible() && c.menus.addMenuItems(l, ['pageTabs'], q);
        c.menus.addMenuItems(l, 'ruler - findReplace layers tags outline -'.split(' '), q);
        c.commentsSupported() && c.menus.addMenuItems(l, ['comments'], q);
        null != A && A.isRealtimeEnabled() && A.isRealtimeSupported() && this.addMenuItems(l, ['showRemoteCursors'], q);
        this.addMenuItems(l, [
          '-',
          'fullscreen'
        ], q);
      } else {
        this.addMenuItems(l, (null != this.editorUi.format ? ['format'] : []).concat([
          'outline',
          'layers',
          'tags'
        ]).concat(c.commentsSupported() ? [
          'comments',
          '-'
        ] : ['-']));
        this.addMenuItems(l, [
          '-',
          'search'
        ], q);
        if (isLocalStorage || mxClient.IS_CHROMEAPP)
          A = this.addMenuItem(l, 'scratchpad', q), (!c.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp) && this.addLinkToItem(A, 'https://www.diagrams.net/doc/faq/scratchpad');
        this.addMenuItems(l, [
          'toggleShapes',
          '-',
          'pageView',
          'pageScale'
        ]);
        this.addSubmenu('units', l, q);
        l.addSeparator(q);
        c.isPageMenuVisible() && c.menus.addMenuItems(l, ['pageTabs'], q);
        this.addMenuItems(l, 'tooltips ruler - grid guides - connectionArrows connectionPoints - resetView zoomIn zoomOut'.split(' '), q);
        '1' != urlParams.sketch && this.addMenuItems(l, [
          '-',
          'fullscreen'
        ], q);
      }
    })));
    this.put('editCell', new Menu(mxUtils.bind(this, function(l, q) {
      this.addMenuItems(l, 'editLink editShape editImage crop - editData copyData pasteData - editConnectionPoints editGeometry - editTooltip editStyle - edit'.split(' '), q);
    })));
    this.put('pages', new Menu(mxUtils.bind(this, function(l, q) {
      var A = c.currentPage,
        H = c.getShortPageName(A);
      l.addItem(mxResources.get('insertPage'), null, mxUtils.bind(this, function() {
        c.insertPage();
      }), q);
      null != A && l.addItem(mxResources.get('duplicateIt', [H]), null, mxUtils.bind(this, function() {
        c.duplicatePage(A, mxResources.get('copyOf', [A.getName()]));
      }), q);
      l.addSeparator(q);
      if (null != c.pages && 1 < c.pages.length)
        for (var K = 0; K < c.pages.length; K++)
          mxUtils.bind(this, function(M) {
            var I = l.addItem(c.getShortPageName(c.pages[M]), null, mxUtils.bind(this, function() {
                c.selectPage(c.pages[M]);
              }), q),
              Q = c.pages[M].getId();
            I.setAttribute('title', c.pages[M].getName() + ' (' + (M + 1) + '/' + c.pages.length + ')' + (null != Q ? ' [' + Q + ']' : ''));
            c.pages[M] == c.currentPage && l.addCheckmark(I, Editor.checkmarkImage);
          })(K);
      c.editor.graph.isEnabled() && null != A && (l.addSeparator(q), l.addItem(mxResources.get('renameIt', [H]) + '...', null, mxUtils.bind(this, function() {
        c.renamePage(A, A.getName());
      }), q), l.addItem(mxResources.get('removeIt', [H]), null, mxUtils.bind(this, function() {
        c.removePage(A);
      }), q), 'sketch' == Editor.currentTheme || 'simple' == Editor.currentTheme) && (1 < c.pages.length && (c.menus.addSubmenu('movePage', l, q, mxResources.get('move')), l.addSeparator(q)), l.addSeparator(q), mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || 'draw.io' != c.getServiceName() || l.addItem(mxResources.get('openInNewWindow'), null, mxUtils.bind(this, function() {
        c.editor.editAsNew(c.getFileData(!0, null, null, null, !0, !0));
      }), q), null != c.getLinkForPage(A) && l.addItem(mxResources.get('link') + '...', null, mxUtils.bind(this, function() {
        c.showPageLinkDialog(A);
      }), q));
    })));
    if (EditorUi.isElectronApp) {
      var C = '1' == urlParams.enableSpellCheck;
      D = c.actions.addAction('spellCheck', function() {
        c.toggleSpellCheck();
        C = !C;
        c.alert(mxResources.get('restartForChangeRequired'));
      });
      D.setToggleAction(!0);
      D.setSelectedCallback(function() {
        return C;
      });
      var F = '1' == urlParams.enableStoreBkp;
      D = c.actions.addAction('autoBkp', function() {
        c.toggleStoreBkp();
        F = !F;
      });
      D.setToggleAction(!0);
      D.setSelectedCallback(function() {
        return F;
      });
      c.actions.addAction('openDevTools', function() {
        c.openDevTools();
      });
      c.actions.addAction('drafts...', function() {
        var l = new FilenameDialog(c, EditorUi.draftSaveDelay / 1000 + '', mxResources.get('apply'), mxUtils.bind(this, function(q) {
          q = parseInt(q);
          0 <= q && (EditorUi.draftSaveDelay = 1000 * q, EditorUi.enableDrafts = 0 < q, mxSettings.setDraftSaveDelay(q), mxSettings.save());
        }), mxResources.get('draftSaveInt'), null, null, null, null, null, null, 50, 250);
        c.showDialog(l.container, 320, 80, !0, !0);
        l.init();
      });
    }
    var L = this.get('language');
    this.put('extras', new Menu(mxUtils.bind(this, function(l, q) {
      if ('simple' == Editor.currentTheme || '1' == urlParams.sketch || 'min' == uiTheme) {
        '1' != urlParams.embed && '1' != urlParams.extAuth && c.mode != App.MODE_ATLAS && (('1' != urlParams.embedInline && Editor.isDarkMode() || !mxClient.IS_IE && !mxClient.IS_IE11) && c.menus.addSubmenu('appearance', l, q), c.menus.addSubmenu('theme', l, q), l.addSeparator(q));
        null == L || '1' == urlParams.embed && null != urlParams.lang || c.menus.addSubmenu('language', l, q);
        c.menus.addSubmenu('units', l, q);
        c.menus.addMenuItems(l, [
          '-',
          'copyConnect',
          'collapseExpand',
          'tooltips',
          '-'
        ], q);
        var A = c.getCurrentFile();
        'simple' != Editor.currentTheme && (null != A && A.isRealtimeEnabled() && A.isRealtimeSupported() && this.addMenuItems(l, ['showRemoteCursors'], q), c.menus.addMenuItems(l, [
          'ruler',
          '-'
        ], q));
        EditorUi.isElectronApp && c.menus.addMenuItems(l, [
          '-',
          'spellCheck',
          'autoBkp',
          'drafts',
          '-'
        ], q);
        Graph.translateDiagram && c.menus.addMenuItems(l, ['diagramLanguage'], q);
        l.addSeparator(q);
        c.mode != App.MODE_ATLAS && c.menus.addMenuItem(l, 'configuration', q);
        l.addSeparator(q);
      } else
        '1' == urlParams.embed && null != urlParams.lang || this.addSubmenu('language', l, q), '1' != urlParams.embed && ('atlas' == Editor.currentTheme || !Editor.isDarkMode() && (mxClient.IS_IE || mxClient.IS_IE11) || c.menus.addSubmenu('appearance', l, q), this.addSubmenu('theme', l, q)), l.addSeparator(q), 'undefined' !== typeof MathJax && (A = this.addMenuItem(l, 'mathematicalTypesetting', q), (!c.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp) && this.addLinkToItem(A, 'https://www.diagrams.net/doc/faq/math-typesetting')), EditorUi.isElectronApp && this.addMenuItems(l, [
          'spellCheck',
          'autoBkp',
          'drafts',
          '-'
        ], q), this.addMenuItems(l, [
          'copyConnect',
          'collapseExpand',
          '-'
        ], q), '1' != urlParams.embed && (A = c.getCurrentFile(), null != A && A.isRealtimeEnabled() && A.isRealtimeSupported() && this.addMenuItems(l, [
          'showRemoteCursors',
          'shareCursor'
        ], q), this.addMenuItems(l, ['autosave'], q)), l.addSeparator(q), !c.isOfflineApp() && isLocalStorage && this.addMenuItem(l, 'plugins', q), this.addMenuItems(l, [
          '-',
          'editDiagram'
        ], q), Graph.translateDiagram && this.addMenuItems(l, ['diagramLanguage']), l.addSeparator(q), '1' != urlParams.embed && (isLocalStorage || mxClient.IS_CHROMEAPP) && this.addMenuItems(l, ['showStartScreen'], q), this.addMenuItems(l, ['configuration'], q), l.addSeparator(q), '1' == urlParams.newTempDlg && (c.actions.addAction('templates', function() {
          function H(M) {
            return {
              id: M.id,
              isExt: !0,
              url: M.downloadUrl,
              title: M.title,
              imgUrl: M.thumbnailLink,
              changedBy: M.lastModifyingUserName,
              lastModifiedOn: M.modifiedDate
            };
          }
          var K = new TemplatesDialog(c, function(M) {
            console.log(arguments);
          }, null, null, null, 'user', function(M, I, Q) {
            var P = new Date();
            P.setDate(P.getDate() - 7);
            c.drive.listFiles(null, P, Q ? !0 : !1, function(O) {
              for (var W = [], p = 0; p < O.items.length; p++)
                W.push(H(O.items[p]));
              M(W);
            }, I);
          }, function(M, I, Q, P) {
            c.drive.listFiles(M, null, P ? !0 : !1, function(O) {
              for (var W = [], p = 0; p < O.items.length; p++)
                W.push(H(O.items[p]));
              I(W);
            }, Q);
          }, function(M, I, Q) {
            c.drive.getFile(M.id, function(P) {
              I(P.data);
            }, Q);
          }, null, function(M) {
            M({
              Test: []
            }, 1);
          }, !0, !1);
          c.showDialog(K.container, window.innerWidth, window.innerHeight, !0, !1, null, !1, !0);
        }), this.addMenuItem(l, 'templates', q));
    })));
    this.put('movePage', new Menu(mxUtils.bind(this, function(l, q) {
      var A = c.getSelectedPageIndex();
      if (null != c.pages)
        for (var H = 0; H < c.pages.length; H++)
          H != A && function(K) {
            l.addItem(c.getShortPageName(c.pages[K]), null, function() {
              c.movePage(A, K);
            }, q);
          }(H);
    })));
    this.put('share', new Menu(mxUtils.bind(this, function(l, q) {
      if (!c.isStandaloneApp()) {
        var A = c.isOffline(!0) ? mxResources.get('offline') : c.getNetworkStatus();
        null != A && (l.addItem(A, null, null, q, null, !1), l.addSeparator(q));
        c.menus.addMenuItems(l, ['share'], q);
      }
      this.addMenuItem(l, 'publishLink', q, null, null, mxResources.get('publish') + '...');
      null != c.getMainUser() && this.addMenuItems(l, ['accounts'], q);
    })));
    this.put('diagram', new Menu(mxUtils.bind(this, function(l, q) {
      var A = c.getCurrentFile();
      'simple' != Editor.currentTheme && (c.menus.addSubmenu('extras', l, q, mxResources.get('settings')), l.addSeparator(q));
      var H = 'simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme;
      if (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
        c.menus.addMenuItems(l, 'new open - synchronize - save saveAs -'.split(' '), q);
      else if (c.mode == App.MODE_ATLAS) {
        '1' != urlParams.noSaveBtn && '1' != urlParams.embedInline && c.menus.addMenuItems(l, [
          '-',
          'save'
        ], q);
        if ('1' == urlParams.saveAndExit || '1' == urlParams.noSaveBtn && '0' != urlParams.saveAndExit || c.mode == App.MODE_ATLAS)
          c.menus.addMenuItems(l, ['saveAndExit'], q), null != A && A.isRevisionHistorySupported() && c.menus.addMenuItems(l, ['revisionHistory'], q);
        l.addSeparator(q);
      } else
        c.mode == App.MODE_ATLAS ? c.menus.addMenuItems(l, [
          'save',
          'synchronize',
          '-'
        ], q) : '1' != urlParams.noFileMenu && (c.menus.addSubmenu('file', l, q), l.addSeparator(q), 'min' == Editor.currentTheme && (c.menus.addMenuItems(l, 'toggleShapes format layers tags - findReplace'.split(' '), q), c.commentsSupported() && c.menus.addMenuItems(l, ['comments'], q), l.addSeparator(q)));
      c.menus.addSubmenu('exportAs', l, q);
      mxClient.IS_CHROMEAPP || EditorUi.isElectronApp ? c.menus.addMenuItems(l, ['import'], q) : '1' != urlParams.noFileMenu && c.menus.addSubmenu('importFrom', l, q);
      'simple' != Editor.currentTheme && 'min' != Editor.currentTheme ? (c.menus.addMenuItems(l, [
        '-',
        'findReplace'
      ], q), c.commentsSupported() && c.menus.addMenuItems(l, [
        'comments',
        '-'
      ], q), c.menus.addMenuItems(l, [
        'toggleShapes',
        'format',
        'layers',
        'tags',
        '-'
      ], q), c.menus.addMenuItems(l, ['pageSetup'], q)) : 'min' != Editor.currentTheme && (this.addMenuItems(l, ['-'], q), this.addSubmenu('newLibrary', l, q), this.addSubmenu('openLibraryFrom', l, q));
      l.addSeparator(q);
      '1' == urlParams.noFileMenu || mxClient.IS_IOS && navigator.standalone || c.menus.addMenuItems(l, ['print'], q);
      H || 'min' == Editor.currentTheme || null == A || null == c.fileNode || '1' == urlParams.embedInline || (H = null != A.getTitle() ? A.getTitle() : c.defaultFilename, /(\.html)$/i.test(H) || /(\.svg)$/i.test(H) || this.addMenuItems(l, [
        '-',
        'properties'
      ]));
      l.addSeparator(q);
      'simple' == Editor.currentTheme && (c.menus.addSubmenu('extras', l, q, mxResources.get('settings')), l.addSeparator(q));
      c.menus.addSubmenu('help', l, q);
      l.addSeparator(q);
      '1' == urlParams.embed && ('1' != urlParams.noSaveBtn && '1' != urlParams.embedInline && c.menus.addMenuItems(l, ['save'], q), '1' == urlParams.saveAndExit || '1' == urlParams.noSaveBtn && '0' != urlParams.saveAndExit) && (c.menus.addMenuItems(l, ['saveAndExit'], q), null != A && A.isRevisionHistorySupported() && c.menus.addMenuItems(l, ['revisionHistory'], q));
      '1' != urlParams.embed && c.mode != App.MODE_ATLAS || '1' == urlParams.noExitBtn && c.mode != App.MODE_ATLAS || c.menus.addMenuItems(l, ['exit'], q);
      '1' != urlParams.embed && null != A && c.menus.addMenuItems(l, [
        '-',
        'close'
      ], q);
    })));
    this.put('save', new Menu(mxUtils.bind(this, function(l, q) {
      var A = c.getCurrentFile();
      null == A || A.constructor != DriveFile && A.constructor != OneDriveFile ? (c.menus.addMenuItems(l, [
        'save',
        'saveAs',
        '-',
        'rename'
      ], q), c.isOfflineApp() ? navigator.onLine && '1' != urlParams.stealth && '1' != urlParams.lockdown && this.addMenuItems(l, ['upload'], q) : c.menus.addMenuItems(l, ['makeCopy'], q)) : c.menus.addMenuItems(l, [
        'save',
        'makeCopy',
        '-',
        'rename',
        'moveToFolder'
      ], q);
      c.menus.addMenuItems(l, [
        '-',
        'autosave'
      ], q);
      null != A && A.isRevisionHistorySupported() && c.menus.addMenuItems(l, [
        '-',
        'revisionHistory'
      ], q);
    })));
    this.put('file', new Menu(mxUtils.bind(this, function(l, q) {
      var A = 'simple' == Editor.currentTheme || 'sketch' == Editor.currentTheme || 'min' == Editor.currentTheme;
      if ('1' == urlParams.embed)
        this.addSubmenu('importFrom', l, q), this.addSubmenu('exportAs', l, q), this.addSubmenu('embed', l, q), '1' == urlParams.libraries && (this.addMenuItems(l, ['-'], q), this.addSubmenu('newLibrary', l, q), this.addSubmenu('openLibraryFrom', l, q)), c.isRevisionHistorySupported() && this.addMenuItems(l, [
          '-',
          'revisionHistory'
        ], q), this.addMenuItems(l, [
          '-',
          'pageSetup',
          'print',
          '-',
          'rename'
        ], q), '1' != urlParams.embedInline && ('1' == urlParams.noSaveBtn ? '0' != urlParams.saveAndExit && this.addMenuItems(l, ['saveAndExit'], q) : (this.addMenuItems(l, ['save'], q), '1' == urlParams.saveAndExit && this.addMenuItems(l, ['saveAndExit'], q))), '1' != urlParams.noExitBtn && this.addMenuItems(l, ['exit'], q);
      else if (A) {
        A = c.getCurrentFile();
        c.menus.addMenuItems(l, ['new'], q);
        c.menus.addSubmenu('openFrom', l, q);
        isLocalStorage && this.addSubmenu('openRecent', l, q);
        l.addSeparator(q);
        c.menus.addMenuItems(l, [
          '-',
          'save'
        ], q);
        null != A && A.constructor == DriveFile || c.menus.addMenuItems(l, ['saveAs'], q);
        mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || null == A || A.constructor == LocalFile && null == A.fileHandle || c.menus.addMenuItems(l, ['synchronize'], q);
        l.addSeparator(q);
        null != A && (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || 'sketch' != Editor.currentTheme || this.addMenuItem(l, 'publishLink', q, null, null, mxResources.get('publish') + '...'), 'simple' == Editor.currentTheme || A.constructor != DriveFile && A.constructor != GitHubFile && A.constructor != OneDriveFile || c.menus.addMenuItems(l, ['share'], q));
        l.addSeparator(q);
        null != A && A.isRenamable() && this.addMenuItems(l, ['rename'], q);
        c.isOfflineApp() ? navigator.onLine && '1' != urlParams.stealth && '1' != urlParams.lockdown && this.addMenuItems(l, ['upload'], q) : (c.menus.addMenuItems(l, ['makeCopy'], q), null != A && (A.constructor != OneDriveFile && A.constructor != DriveFile || c.menus.addMenuItems(l, ['moveToFolder'], q), l.addSeparator(q), null != A.getFolderUrl() && c.menus.addMenuItems(l, ['openFolder'], q), null != A.getFileUrl() && c.menus.addMenuItems(l, ['openFile'], q)));
        l.addSeparator(q);
        null != A && A.isRevisionHistorySupported() && c.menus.addMenuItems(l, ['revisionHistory'], q);
        if (null != A && null != c.fileNode && '1' != urlParams.embedInline) {
          var H = null != A.getTitle() ? A.getTitle() : c.defaultFilename;
          (A.constructor == DriveFile && null != A.sync && A.sync.isConnected() || !/(\.html)$/i.test(H) && !/(\.svg)$/i.test(H)) && this.addMenuItems(l, ['properties'], q);
        }
        'simple' == Editor.currentTheme && c.menus.addMenuItems(l, [
          '-',
          'autosave'
        ], q);
      } else
        A = this.editorUi.getCurrentFile(), null != A && A.constructor == DriveFile ? (A.isRestricted() && this.addMenuItems(l, ['exportOptionsDisabled'], q), this.addMenuItems(l, [
          'save',
          '-',
          'share'
        ], q), H = this.addMenuItem(l, 'synchronize', q), (!c.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp) && this.addLinkToItem(H, 'https://www.diagrams.net/doc/faq/synchronize'), l.addSeparator(q)) : this.addMenuItems(l, ['new'], q), this.addSubmenu('openFrom', l, q), isLocalStorage && this.addSubmenu('openRecent', l, q), null != A && A.constructor == DriveFile ? this.addMenuItems(l, 'new - rename makeCopy openFolder moveToFolder'.split(' '), q) : (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || null == A || A.constructor == LocalFile && null == A.fileHandle || (l.addSeparator(q), H = this.addMenuItem(l, 'synchronize', q), (!c.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp) && this.addLinkToItem(H, 'https://www.diagrams.net/doc/faq/synchronize')), this.addMenuItems(l, [
          '-',
          'save',
          'saveAs',
          '-'
        ], q), mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || 'draw.io' != c.getServiceName() || c.isOfflineApp() || null == A || this.addMenuItems(l, [
          'share',
          '-'
        ], q), null != A && A.isRenamable() && this.addMenuItems(l, ['rename'], q), c.isOfflineApp() ? navigator.onLine && '1' != urlParams.stealth && '1' != urlParams.lockdown && this.addMenuItems(l, ['upload'], q) : (this.addMenuItems(l, ['makeCopy'], q), null != A && (A.constructor == OneDriveFile && this.addMenuItems(l, ['moveToFolder'], q), null != A.getFolderUrl() && c.menus.addMenuItems(l, ['openFolder'], q)))), l.addSeparator(q), this.addSubmenu('importFrom', l, q), this.addSubmenu('exportAs', l, q), l.addSeparator(q), this.addSubmenu('embed', l, q), this.addSubmenu('publish', l, q), l.addSeparator(q), this.addSubmenu('newLibrary', l, q), this.addSubmenu('openLibraryFrom', l, q), c.isRevisionHistorySupported() && this.addMenuItems(l, [
          '-',
          'revisionHistory'
        ], q), null != A && null != c.fileNode && '1' != urlParams.embedInline && (H = null != A.getTitle() ? A.getTitle() : c.defaultFilename, (A.constructor == DriveFile && null != A.sync && A.sync.isConnected() || !/(\.html)$/i.test(H) && !/(\.svg)$/i.test(H)) && this.addMenuItems(l, [
          '-',
          'properties'
        ])), this.addMenuItems(l, [
          '-',
          'pageSetup'
        ], q), mxClient.IS_IOS && navigator.standalone || this.addMenuItems(l, ['print'], q), this.addMenuItems(l, [
          '-',
          'close'
        ]);
    })));
    f.prototype.execute = function() {
      var l = this.ui.editor.graph;
      this.customFonts = this.prevCustomFonts;
      this.prevCustomFonts = this.ui.menus.customFonts;
      this.ui.fireEvent(new mxEventObject('customFontsChanged', 'customFonts', this.customFonts));
      this.extFonts = this.previousExtFonts;
      for (var q = l.extFonts, A = 0; null != q && A < q.length; A++) {
        var H = document.getElementById('extFont_' + q[A].name);
        null != H && H.parentNode.removeChild(H);
      }
      l.extFonts = [];
      for (A = 0; null != this.previousExtFonts && A < this.previousExtFonts.length; A++)
        this.ui.editor.graph.addExtFont(this.previousExtFonts[A].name, this.previousExtFonts[A].url);
      this.previousExtFonts = q;
    };
    this.put('fontFamily', new Menu(mxUtils.bind(this, function(l, q) {
      for (var A = mxUtils.bind(this, function(p, B, N, S, R) {
          var V = c.editor.graph;
          S = this.styleChange(l, S || p, '1' != urlParams['ext-fonts'] ? [
            mxConstants.STYLE_FONTFAMILY,
            'fontSource',
            'FType'
          ] : [mxConstants.STYLE_FONTFAMILY], '1' != urlParams['ext-fonts'] ? [
            p,
            null != B ? encodeURIComponent(B) : null,
            null
          ] : [p], null, q, function() {
            '1' != urlParams['ext-fonts'] ? V.setFont(p, B) : (document.execCommand('fontname', !1, p), V.addExtFont(p, B));
            c.fireEvent(new mxEventObject('styleChanged', 'keys', '1' != urlParams['ext-fonts'] ? [
              mxConstants.STYLE_FONTFAMILY,
              'fontSource',
              'FType'
            ] : [mxConstants.STYLE_FONTFAMILY], 'values', '1' != urlParams['ext-fonts'] ? [
              p,
              null != B ? encodeURIComponent(B) : null,
              null
            ] : [p], 'cells', [V.cellEditor.getEditingCell()]));
          }, function() {
            V.updateLabelElements(V.getSelectionCells(), function(T) {
              T.removeAttribute('face');
              T.style.fontFamily = null;
              'PRE' == T.nodeName && V.replaceElement(T, 'div');
            });
            '1' == urlParams['ext-fonts'] && V.addExtFont(p, B);
          });
          N && (N = document.createElement('span'), N.className = 'geSprite geSprite-delete', N.style.cursor = 'pointer', N.style.display = 'inline-block', S.firstChild.nextSibling.nextSibling.appendChild(N), mxEvent.addListener(N, mxClient.IS_POINTER ? 'pointerup' : 'mouseup', mxUtils.bind(this, function(T) {
            if ('1' != urlParams['ext-fonts']) {
              delete Graph.recentCustomFonts[p.toLowerCase()];
              for (var U = 0; U < this.customFonts.length; U++)
                if (this.customFonts[U].name == p && this.customFonts[U].url == B) {
                  this.customFonts.splice(U, 1);
                  c.fireEvent(new mxEventObject('customFontsChanged'));
                  break;
                }
            } else {
              var X = mxUtils.clone(this.editorUi.editor.graph.extFonts);
              if (null != X && 0 < X.length)
                for (U = 0; U < X.length; U++)
                  if (X[U].name == p) {
                    X.splice(U, 1);
                    break;
                  }
              var Z = mxUtils.clone(this.customFonts);
              for (U = 0; U < Z.length; U++)
                if (Z[U].name == p) {
                  Z.splice(U, 1);
                  break;
                }
              U = new f(this.editorUi, X, Z);
              this.editorUi.editor.graph.model.execute(U);
            }
            this.editorUi.hideCurrentMenu();
            mxEvent.consume(T);
          })));
          Graph.addFont(p, B);
          S.firstChild.nextSibling.style.fontFamily = p;
          null != R && S.setAttribute('title', R);
        }), H = {}, K = 0; K < this.defaultFonts.length; K++) {
        var M = this.defaultFonts[K];
        'string' === typeof M ? A(M) : null != M.fontFamily && null != M.fontUrl && (H[encodeURIComponent(M.fontFamily) + '@' + encodeURIComponent(M.fontUrl)] = !0, A(M.fontFamily, M.fontUrl));
      }
      l.addSeparator(q);
      if ('1' != urlParams['ext-fonts']) {
        M = function(p) {
          var B = encodeURIComponent(p.name) + (null == p.url ? '' : '@' + encodeURIComponent(p.url));
          if (!H[B]) {
            for (var N = p.name, S = 0; null != Q[N.toLowerCase()];)
              N = p.name + ' (' + ++S + ')';
            null == I[B] && (P.push({
              name: p.name,
              url: p.url,
              label: N,
              title: p.url
            }), Q[N.toLowerCase()] = p, I[B] = p);
          }
        };
        var I = {},
          Q = {},
          P = [];
        for (K = 0; K < this.customFonts.length; K++)
          M(this.customFonts[K]);
        for (var O in Graph.recentCustomFonts)
          M(Graph.recentCustomFonts[O]);
        P.sort(function(p, B) {
          return p.label < B.label ? -1 : p.label > B.label ? 1 : 0;
        });
        if (0 < P.length) {
          for (K = 0; K < P.length; K++)
            A(P[K].name, P[K].url, !0, P[K].label, P[K].url);
          l.addSeparator(q);
        }
        l.addItem(mxResources.get('reset'), null, mxUtils.bind(this, function() {
          Graph.recentCustomFonts = {};
          this.customFonts = [];
          c.fireEvent(new mxEventObject('customFontsChanged'));
        }), q);
        l.addSeparator(q);
      } else {
        O = this.editorUi.editor.graph.extFonts;
        if (null != O && 0 < O.length) {
          M = {};
          var W = !1;
          for (K = 0; K < this.customFonts.length; K++)
            M[this.customFonts[K].name] = !0;
          for (K = 0; K < O.length; K++)
            M[O[K].name] || (this.customFonts.push(O[K]), W = !0);
          W && this.editorUi.fireEvent(new mxEventObject('customFontsChanged', 'customFonts', this.customFonts));
        }
        if (0 < this.customFonts.length) {
          for (K = 0; K < this.customFonts.length; K++)
            O = this.customFonts[K].name, M = this.customFonts[K].url, A(O, M, !0), this.editorUi.editor.graph.addExtFont(O, M, !0);
          l.addSeparator(q);
          l.addItem(mxResources.get('reset'), null, mxUtils.bind(this, function() {
            var p = new f(this.editorUi, [], []);
            c.editor.graph.model.execute(p);
          }), q);
          l.addSeparator(q);
        }
      }
      l.addItem(mxResources.get('custom') + '...', null, mxUtils.bind(this, function() {
        var p = this.editorUi.editor.graph,
          B = p.getStylesheet().getDefaultVertexStyle()[mxConstants.STYLE_FONTFAMILY],
          N = 's',
          S = null;
        if ('1' != urlParams['ext-fonts'] && p.isEditing()) {
          var R = p.getSelectedEditingElement();
          null != R && (R = mxUtils.getCurrentStyle(R), null != R && (B = Graph.stripQuotes(R.fontFamily), S = Graph.getFontUrl(B, null), null != S && (Graph.isGoogleFontUrl(S) ? (S = null, N = 'g') : N = 'w')));
        } else
          R = p.getView().getState(p.getSelectionCell()), null != R && (B = R.style[mxConstants.STYLE_FONTFAMILY] || B, '1' != urlParams['ext-fonts'] ? (R = R.style.fontSource, null != R && (R = decodeURIComponent(R), Graph.isGoogleFontUrl(R) ? N = 'g' : (N = 'w', S = R))) : (N = R.style.FType || N, 'w' == N && (S = this.editorUi.editor.graph.extFonts, R = null, null != S && (R = S.find(function(T) {
            return T.name == B;
          })), S = null != R ? R.url : mxResources.get('urlNotFound', null, 'URL not found'))));
        null != S && S.substring(0, PROXY_URL.length) == PROXY_URL && (S = decodeURIComponent(S.substr((PROXY_URL + '?url=').length)));
        var V = null;
        document.activeElement == p.cellEditor.textarea && (V = p.cellEditor.saveSelection());
        N = new FontDialog(this.editorUi, B, S, N, mxUtils.bind(this, function(T, U, X) {
          null != V && (p.cellEditor.restoreSelection(V), V = null);
          if (null != T && 0 < T.length)
            if ('1' != urlParams['ext-fonts'] && p.isEditing())
              p.setFont(T, U);
            else {
              p.getModel().beginUpdate();
              try {
                p.stopEditing(!1);
                '1' != urlParams['ext-fonts'] ? (p.setCellStyles(mxConstants.STYLE_FONTFAMILY, T), p.setCellStyles('fontSource', null != U ? encodeURIComponent(U) : null), p.setCellStyles('FType', null)) : (p.setCellStyles(mxConstants.STYLE_FONTFAMILY, T), 's' != X && (p.setCellStyles('FType', X), 0 == U.indexOf('http://') && (U = PROXY_URL + '?url=' + encodeURIComponent(U)), this.editorUi.editor.graph.addExtFont(T, U)));
                X = !0;
                for (var Z = 0; Z < this.customFonts.length; Z++)
                  if (this.customFonts[Z].name == T) {
                    X = !1;
                    break;
                  }
                X && (this.customFonts.push({
                  name: T,
                  url: U
                }), this.editorUi.fireEvent(new mxEventObject('customFontsChanged', 'customFonts', this.customFonts)));
              } finally {
                p.getModel().endUpdate();
              }
            }
        }));
        this.editorUi.showDialog(N.container, 380, Editor.enableWebFonts ? 250 : 180, !0, !0);
        N.init();
      }), q, null, !0);
    })));
  };
}());