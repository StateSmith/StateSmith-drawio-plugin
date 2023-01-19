var CreateGraphDialog = function(b, e, f) {
  var c = document.createElement('div');
  c.style.textAlign = 'right';
  this.init = function() {
    var k = document.createElement('div');
    k.style.position = 'relative';
    k.style.border = '1px solid gray';
    k.style.width = '100%';
    k.style.height = '360px';
    k.style.overflow = 'hidden';
    k.style.marginBottom = '16px';
    mxEvent.disableContextMenu(k);
    c.appendChild(k);
    var m = new Graph(k);
    m.setCellsCloneable(!0);
    m.setPanning(!0);
    m.setAllowDanglingEdges(!1);
    m.connectionHandler.select = !1;
    m.view.setTranslate(20, 20);
    m.border = 20;
    m.panningHandler.useLeftButtonForPanning = !0;
    var t = 'curved=1;';
    m.cellRenderer.installCellOverlayListeners = function(n, v, u) {
      mxCellRenderer.prototype.installCellOverlayListeners.apply(this, arguments);
      mxEvent.addListener(u.node, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', function(x) {
        v.fireEvent(new mxEventObject('pointerdown', 'event', x, 'state', n));
      });
      !mxClient.IS_POINTER && mxClient.IS_TOUCH && mxEvent.addListener(u.node, 'touchstart', function(x) {
        v.fireEvent(new mxEventObject('pointerdown', 'event', x, 'state', n));
      });
    };
    m.getAllConnectionConstraints = function() {
      return null;
    };
    m.connectionHandler.marker.highlight.keepOnTop = !1;
    m.connectionHandler.createEdgeState = function(n) {
      n = m.createEdge(null, null, null, null, null, t);
      return new mxCellState(this.graph.view, n, this.graph.getCellStyle(n));
    };
    var y = m.getDefaultParent(),
      E = mxUtils.bind(this, function(n) {
        var v = new mxCellOverlay(this.connectImage, 'Add outgoing');
        v.cursor = 'hand';
        v.addListener(mxEvent.CLICK, function(u, x) {
          m.connectionHandler.reset();
          m.clearSelection();
          var C = m.getCellGeometry(n),
            F;
          J(function() {
            F = m.insertVertex(y, null, 'Entry', C.x, C.y, 80, 30, 'rounded=1;');
            E(F);
            m.view.refresh(F);
            m.insertEdge(y, null, '', n, F, t);
          }, function() {
            m.scrollCellToVisible(F);
          });
        });
        v.addListener('pointerdown', function(u, x) {
          u = x.getProperty('event');
          x = x.getProperty('state');
          m.popupMenuHandler.hideMenu();
          m.stopEditing(!1);
          var C = mxUtils.convertPoint(m.container, mxEvent.getClientX(u), mxEvent.getClientY(u));
          m.connectionHandler.start(x, C.x, C.y);
          m.isMouseDown = !0;
          m.isMouseTrigger = mxEvent.isMouseEvent(u);
          mxEvent.consume(u);
        });
        m.addCellOverlay(n, v);
      });
    m.getModel().beginUpdate();
    try {
      var z = m.insertVertex(y, null, 'Start', 0, 0, 80, 30, 'ellipse');
      E(z);
    } finally {
      m.getModel().endUpdate();
    }
    if ('horizontalTree' == f) {
      var D = new mxCompactTreeLayout(m);
      D.edgeRouting = !1;
      D.levelDistance = 30;
      t = 'edgeStyle=elbowEdgeStyle;elbow=horizontal;';
    } else
      'verticalTree' == f ? (D = new mxCompactTreeLayout(m, !1), D.edgeRouting = !1, D.levelDistance = 30, t = 'edgeStyle=elbowEdgeStyle;elbow=vertical;') : 'radialTree' == f ? (D = new mxRadialTreeLayout(m, !1), D.edgeRouting = !1, D.levelDistance = 80) : 'verticalFlow' == f ? D = new mxHierarchicalLayout(m, mxConstants.DIRECTION_NORTH) : 'horizontalFlow' == f ? D = new mxHierarchicalLayout(m, mxConstants.DIRECTION_WEST) : 'circle' == f ? D = new mxCircleLayout(m) : (D = new mxFastOrganicLayout(m, !1), D.forceConstant = 80);
    if (null != D) {
      var J = function(n, v) {
          m.getModel().beginUpdate();
          try {
            null != n && n(), D.execute(m.getDefaultParent(), z);
          } catch (u) {
            throw u;
          } finally {
            n = new mxMorphing(m), n.addListener(mxEvent.DONE, mxUtils.bind(this, function() {
              m.getModel().endUpdate();
              null != v && v();
            })), n.startAnimation();
          }
        },
        G = mxEdgeHandler.prototype.connect;
      mxEdgeHandler.prototype.connect = function(n, v, u, x, C) {
        G.apply(this, arguments);
        J();
      };
      m.resizeCell = function() {
        mxGraph.prototype.resizeCell.apply(this, arguments);
        J();
      };
      m.connectionHandler.addListener(mxEvent.CONNECT, function() {
        J();
      });
    }
    var d = mxUtils.button(mxResources.get('close'), function() {
      b.confirm(mxResources.get('areYouSure'), function() {
        null != k.parentNode && (m.destroy(), k.parentNode.removeChild(k));
        b.hideDialog();
      });
    });
    d.className = 'geBtn';
    b.editor.cancelFirst && c.appendChild(d);
    var g = mxUtils.button(mxResources.get('insert'), function(n) {
      m.clearCellOverlays();
      var v = m.getModel().getChildren(m.getDefaultParent());
      n = mxEvent.isAltDown(n) ? b.editor.graph.getFreeInsertPoint() : b.editor.graph.getCenterInsertPoint(m.getBoundingBoxFromGeometry(v, !0));
      v = b.editor.graph.importCells(v, n.x, n.y);
      n = b.editor.graph.view;
      var u = n.getBounds(v);
      u.x -= n.translate.x;
      u.y -= n.translate.y;
      b.editor.graph.scrollRectToVisible(u);
      b.editor.graph.setSelectionCells(v);
      null != k.parentNode && (m.destroy(), k.parentNode.removeChild(k));
      b.hideDialog();
    });
    c.appendChild(g);
    g.className = 'geBtn gePrimaryBtn';
    b.editor.cancelFirst || c.appendChild(d);
  };
  this.container = c;
};
CreateGraphDialog.prototype.connectImage = new mxImage(mxClient.IS_SVG ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjQ3OTk0QjMyRDcyMTFFNThGQThGNDVBMjNBMjFDMzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjQ3OTk0QjQyRDcyMTFFNThGQThGNDVBMjNBMjFDMzkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRjA0N0I2MjJENzExMUU1OEZBOEY0NUEyM0EyMUMzOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNDc5OTRCMjJENzIxMUU1OEZBOEY0NUEyM0EyMUMzOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjIf+MgAAATlSURBVHjanFZraFxFFD735u4ru3ls0yZG26ShgmJoKK1J2vhIYzBgRdtIURHyw1hQUH9IxIgI2h8iCEUF/1RRlNQYCsYfCTHVhiTtNolpZCEStqSC22xIsrs1bDfu7t37Gs/cO3Ozxs1DBw73zpk555vzmHNGgJ0NYatFgmNLYUHYUoHASMz5ijmgVLmxgfKCUiBxC4ACJAeSG8nb1dVVOTc3dyoSibwWDofPBIPBJzo7O8vpGtvjpDICGztxkciECpF2LS0tvZtOpwNkk5FKpcYXFxffwL1+JuPgllPj8nk1F6RoaGjoKCqZ5ApljZDZO4SMRA0SuG2QUJIQRV8HxMOM9vf3H0ZZH9Nhg20MMl2QkFwjIyNHWlpahtADnuUMwLcRHX5aNSBjCJYEsSSLUeLEbhGe3ytCmQtA1/XY+Pj46dbW1iDuyCJp9BC5ycBj4hoeHq5ra2sbw0Xn1ZgBZ+dVkA1Lc+6p0Ck2p0QS4Ox9EhwpEylYcmBg4LH29vYQLilIOt0u5FhDfevNZDI/u93uw6PLOrwTUtjxrbPYbhD42WgMrF8JmR894ICmCgnQjVe8Xu8pXEkzMJKbuo5oNPomBbm1ZsD7s2kwFA1JZ6QBUXWT1nmGNc/qoMgavDcrQzxjQGFh4aOYIJ0sFAXcEtui4uLiVjr5KpSBVFYDDZVrWUaKRRWSAYeK0fmKykgDXbVoNaPChRuyqdDv97czL5nXxQbq6empQmsaklkDBiNpSwFVrmr2P6UyicD5piI4f8wHh0oEm8/p4h8pyGiEWvVQd3e3nxtjAzU1NR2jP7NRBWQ8GbdEzzJAmc0V3RR4cI8Dvmwuhc8fKUFA0d6/ltHg5p+Kuaejo6OeY0jcNJ/PV00ZS0nFUoZRvvFS1bZFsKHCCQ2Pl8H0chY+C96B6ZUsrCQ1qKtwQVFRURW/QhIXMAzDPAZ6BgOr8tTa8dDxCmiYGApaJbJMxSzV+brE8pdgWkcpY5dbMF1AR9XH8/xu2ilef48bvn92n82ZwHh+8ssqTEXS9p7dHisiiURikd8PbpExNTU1UVNTA3V3Y7lC16n0gpB/NwpNcZjfa7dScC4Qh0kOQCwnlEgi3F/hMVl9fX0zvKrzSk2lfXjRhj0eT/2rvWG4+Pta3oJY7XfC3hInXAv/ldeFLx8shQ+eqQL0UAAz7ylkpej5eNZRVBWL6BU6ef14OYiY1oqyTtmsavr/5koaRucT1pzx+ZpL1+GV5nLutksUgIcmtwTRiuuVZXnU5XId7A2swJkfFsymRWC91hHg1Viw6x23+7vn9sPJ+j20BE1hCXqSWaNSQ8ScbknRZWxub1PGCw/fBV+c3AeijlUbY5bBjEqr9GuYZP4jP41WudGSC6erTRCqdGZm5i1WvXWeDHnbBCZGc2Nj4wBl/hZOwrmBBfgmlID1HmGJutHaF+tKoevp/XCgstDkjo2NtWKLuc6AVN4mNjY+s1XQxoenOoFuDPHGtnRbJj9ej5GvL0dI7+giuRyMk1giazc+DP6vgUDgOJVlOv7R+PJ12QIeL6SyeDz+Kfp8ZrNWjgDTsVjsQ7qXyTjztXJhm9ePxFLfMTg4eG9tbe1RTP9KFFYQfHliYmIS69kCC7jKYmKwxxD5P88tkVkqbPPcIps9t4T/+HjcuJ/s5BFJgf4WYABCtxGuxIZ90gAAAABJRU5ErkJggg==' : IMAGE_PATH + '/handle-connect.png', 26, 26);