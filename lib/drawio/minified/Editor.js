Editor = function(a, b, f, e, g) {
  mxEventSource.call(this);
  this.chromeless = null != a ? a : this.chromeless;
  this.initStencilRegistry();
  this.graph = e || this.createGraph(b, f);
  this.editable = null != g ? g : !a;
  this.undoManager = this.createUndoManager();
  this.status = '';
  this.getOrCreateFilename = function() {
    return this.filename || mxResources.get('drawing', [Editor.pageCounter]) + '.xml';
  };
  this.getFilename = function() {
    return this.filename;
  };
  this.setStatus = function(d, h) {
    this.status = d;
    this.statusFunction = h;
    this.fireEvent(new mxEventObject('statusChanged'));
  };
  this.getStatus = function() {
    return this.status;
  };
  this.graphChangeListener = function(d, h) {
    d = null != h ? h.getProperty('edit') : null;
    null != d && d.ignoreEdit || this.setModified(!0);
  };
  this.graph.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
    this.graphChangeListener.apply(this, arguments);
  }));
  this.graph.resetViewOnRootChange = !1;
  this.init();
};
Editor.pageCounter = 0;
(function() {
  try {
    for (var a = window; null != a.opener && 'undefined' !== typeof a.opener.Editor && !isNaN(a.opener.Editor.pageCounter) && a.opener != a;)
      a = a.opener;
    null != a && (a.Editor.pageCounter++, Editor.pageCounter = a.Editor.pageCounter);
  } catch (b) {}
}());
Editor.defaultHtmlFont = '-apple-system, BlinkMacSystemFont, "Segoe UI Variable", "Segoe UI", system-ui, ui-sans-serif, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';
Editor.useLocalStorage = 'undefined' != typeof Storage && mxClient.IS_IOS;
Editor.smallScreenWidth = 800;
Editor.rowMoveImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAEBAMAAACw6DhOAAAAGFBMVEUzMzP///9tbW1QUFCKiopBQUF8fHxfX1/IXlmXAAAAFElEQVQImWNgNVdzYBAUFBRggLMAEzYBy29kEPgAAAAASUVORK5CYII=';
Editor.lightCheckmarkImage = 'data:image/gif;base64,R0lGODlhFQAVAMQfAGxsbHx8fIqKioaGhvb29nJycvr6+sDAwJqamltbW5OTk+np6YGBgeTk5Ly8vJiYmP39/fLy8qWlpa6ursjIyOLi4vj4+N/f3+3t7fT09LCwsHZ2dubm5r6+vmZmZv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEY4NTZERTQ5QUFBMTFFMUE5MTVDOTM5MUZGMTE3M0QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEY4NTZERTU5QUFBMTFFMUE5MTVDOTM5MUZGMTE3M0QiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Rjg1NkRFMjlBQUExMUUxQTkxNUM5MzkxRkYxMTczRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Rjg1NkRFMzlBQUExMUUxQTkxNUM5MzkxRkYxMTczRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAB8ALAAAAAAVABUAAAVI4CeOZGmeaKqubKtylktSgCOLRyLd3+QJEJnh4VHcMoOfYQXQLBcBD4PA6ngGlIInEHEhPOANRkaIFhq8SuHCE1Hb8Lh8LgsBADs=';
Editor.darkCheckmarkImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAARVBMVEUAAACZmZkICAgEBASNjY2Dg4MYGBiTk5N5eXl1dXVmZmZQUFBCQkI3NzceHh4MDAykpKSJiYl+fn5sbGxaWlo/Pz8SEhK96uPlAAAAAXRSTlMAQObYZgAAAE5JREFUGNPFzTcSgDAQQ1HJGUfy/Y9K7V1qeOUfzQifCQZai1XHaz11LFysbDbzgDSSWMZiETz3+b8yNUc/MMsktxuC8XQBSncdLwz+8gCCggGXzBcozAAAAABJRU5ErkJggg==';
Editor.darkHelpImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////9Du/pqAAAAFXRSTlMAT30qCJRBboyDZyCgRzUUdF46MJlgXETgAAAAeklEQVQY022O2w4DIQhEQUURda/9/28tUO2+7CQS5sgQ4F1RapX78YUwRqQjTU8ILqQfKerTKTvACJ4nLX3krt+8aS82oI8aQC4KavRgtvEW/mDvsICgA03PSGRr79MqX1YPNIxzjyqtw8ZnnRo4t5a5undtJYRywau+ds4Cyza3E6YAAAAASUVORK5CYII=';
Editor.lightHelpImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTExIDE4aDJ2LTJoLTJ2MnptMS0xNkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bTAtMTRjLTIuMjEgMC00IDEuNzktNCA0aDJjMC0xLjEuOS0yIDItMnMyIC45IDIgMmMwIDItMyAxLjc1LTMgNWgyYzAtMi4yNSAzLTIuNSAzLTUgMC0yLjIxLTEuNzktNC00LTR6Ii8+PC9zdmc+';
Editor.menuImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTMgMThoMTh2LTJIM3Yyem0wLTVoMTh2LTJIM3Yyem0wLTd2MmgxOFY2SDN6Ii8+PC9zdmc+';
Editor.moveImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI4cHgiIGhlaWdodD0iMjhweCI+PGc+PC9nPjxnPjxnPjxnPjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNCwyLjQpc2NhbGUoMC44KXJvdGF0ZSg0NSwxMiwxMikiIHN0cm9rZT0iIzI5YjZmMiIgZmlsbD0iIzI5YjZmMiIgZD0iTTE1LDNsMi4zLDIuM2wtMi44OSwyLjg3bDEuNDIsMS40MkwxOC43LDYuN0wyMSw5VjNIMTV6IE0zLDlsMi4zLTIuM2wyLjg3LDIuODlsMS40Mi0xLjQyTDYuNyw1LjNMOSwzSDNWOXogTTksMjEgbC0yLjMtMi4zbDIuODktMi44N2wtMS40Mi0xLjQyTDUuMywxNy4zTDMsMTV2Nkg5eiBNMjEsMTVsLTIuMywyLjNsLTIuODctMi44OWwtMS40MiwxLjQybDIuODksMi44N0wxNSwyMWg2VjE1eiIvPjwvZz48L2c+PC9nPjwvc3ZnPgo=';
Editor.zoomInImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTUuNSAxNGgtLjc5bC0uMjgtLjI3QzE1LjQxIDEyLjU5IDE2IDExLjExIDE2IDkuNSAxNiA1LjkxIDEzLjA5IDMgOS41IDNTMyA1LjkxIDMgOS41IDUuOTEgMTYgOS41IDE2YzEuNjEgMCAzLjA5LS41OSA0LjIzLTEuNTdsLjI3LjI4di43OWw1IDQuOTlMMjAuNDkgMTlsLTQuOTktNXptLTYgMEM3LjAxIDE0IDUgMTEuOTkgNSA5LjVTNy4wMSA1IDkuNSA1IDE0IDcuMDEgMTQgOS41IDExLjk5IDE0IDkuNSAxNHptMi41LTRoLTJ2Mkg5di0ySDdWOWgyVjdoMXYyaDJ2MXoiLz48L3N2Zz4=';
Editor.zoomOutImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTUuNSAxNGgtLjc5bC0uMjgtLjI3QzE1LjQxIDEyLjU5IDE2IDExLjExIDE2IDkuNSAxNiA1LjkxIDEzLjA5IDMgOS41IDNTMyA1LjkxIDMgOS41IDUuOTEgMTYgOS41IDE2YzEuNjEgMCAzLjA5LS41OSA0LjIzLTEuNTdsLjI3LjI4di43OWw1IDQuOTlMMjAuNDkgMTlsLTQuOTktNXptLTYgMEM3LjAxIDE0IDUgMTEuOTkgNSA5LjVTNy4wMSA1IDkuNSA1IDE0IDcuMDEgMTQgOS41IDExLjk5IDE0IDkuNSAxNHpNNyA5aDV2MUg3eiIvPjwvc3ZnPg==';
Editor.fullscreenImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMyA1djRoMlY1aDRWM0g1Yy0xLjEgMC0yIC45LTIgMnptMiAxMEgzdjRjMCAxLjEuOSAyIDIgMmg0di0ySDV2LTR6bTE0IDRoLTR2Mmg0YzEuMSAwIDItLjkgMi0ydi00aC0ydjR6bTAtMTZoLTR2Mmg0djRoMlY1YzAtMS4xLS45LTItMi0yeiIvPjwvc3ZnPg==';
Editor.fullscreenExitImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTUgMTZoM3YzaDJ2LTVINXYyem0zLThINXYyaDVWNUg4djN6bTYgMTFoMnYtM2gzdi0yaC01djV6bTItMTFWNWgtMnY1aDVWOGgtM3oiLz48L3N2Zz4=';
Editor.zoomFitImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTUgMTVIM3Y0YzAgMS4xLjkgMiAyIDJoNHYtMkg1di00ek01IDVoNFYzSDVjLTEuMSAwLTIgLjktMiAydjRoMlY1em03IDNjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00em0wIDZjLTEuMSAwLTItLjktMi0ycy45LTIgMi0yIDIgLjkgMiAyLS45IDItMiAyem03LTExaC00djJoNHY0aDJWNWMwLTEuMS0uOS0yLTItMnptMCAxNmgtNHYyaDRjMS4xIDAgMi0uOSAyLTJ2LTRoLTJ2NHoiLz48L3N2Zz4=';
Editor.layersImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTExLjk5IDE4LjU0bC03LjM3LTUuNzNMMyAxNC4wN2w5IDcgOS03LTEuNjMtMS4yN3pNMTIgMTZsNy4zNi01LjczTDIxIDlsLTktNy05IDcgMS42MyAxLjI3TDEyIDE2em0wLTExLjQ3TDE3Ljc0IDkgMTIgMTMuNDcgNi4yNiA5IDEyIDQuNTN6Ii8+PC9zdmc+';
Editor.previousImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE1LjQxIDcuNDFMMTQgNmwtNiA2IDYgNiAxLjQxLTEuNDFMMTAuODMgMTJsNC41OC00LjU5eiIvPjwvc3ZnPg==';
Editor.nextImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDZMOC41OSA3LjQxIDEzLjE3IDEybC00LjU4IDQuNTlMMTAgMThsNi02LTYtNnoiLz48L3N2Zz4=';
Editor.editImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE0LjA2IDkuMDJsLjkyLjkyTDUuOTIgMTlINXYtLjkybDkuMDYtOS4wNk0xNy42NiAzYy0uMjUgMC0uNTEuMS0uNy4yOWwtMS44MyAxLjgzIDMuNzUgMy43NSAxLjgzLTEuODNjLjM5LS4zOS4zOS0xLjAyIDAtMS40MWwtMi4zNC0yLjM0Yy0uMi0uMi0uNDUtLjI5LS43MS0uMjl6bS0zLjYgMy4xOUwzIDE3LjI1VjIxaDMuNzVMMTcuODEgOS45NGwtMy43NS0zLjc1eiIvPjwvc3ZnPg==';
Editor.duplicateImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE2IDFINGMtMS4xIDAtMiAuOS0yIDJ2MTRoMlYzaDEyVjF6bTMgNEg4Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDExYzEuMSAwIDItLjkgMi0yVjdjMC0xLjEtLjktMi0yLTJ6bTAgMTZIOFY3aDExdjE0eiIvPjwvc3ZnPg==';
Editor.addImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDEzaC02djZoLTJ2LTZINXYtMmg2VjVoMnY2aDZ2MnoiLz48L3N2Zz4=';
Editor.crossImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMiAxOSA2LjQxeiIvPjwvc3ZnPg==';
Editor.verticalDotsImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDhjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yLTIgLjktMiAyIC45IDIgMiAyem0wIDJjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yem0wIDZjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yeiIvPjwvc3ZnPg==';
Editor.trashImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE2IDl2MTBIOFY5aDhtLTEuNS02aC01bC0xIDFINXYyaDE0VjRoLTMuNWwtMS0xek0xOCA3SDZ2MTJjMCAxLjEuOSAyIDIgMmg4YzEuMSAwIDItLjkgMi0yVjd6Ii8+PC9zdmc+';
Editor.hiddenImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6bTAgMGgyNHYyNEgwVjB6bTAgMGgyNHYyNEgwVjB6bTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDZjMy43OSAwIDcuMTcgMi4xMyA4LjgyIDUuNS0uNTkgMS4yMi0xLjQyIDIuMjctMi40MSAzLjEybDEuNDEgMS40MWMxLjM5LTEuMjMgMi40OS0yLjc3IDMuMTgtNC41M0MyMS4yNyA3LjExIDE3IDQgMTIgNGMtMS4yNyAwLTIuNDkuMi0zLjY0LjU3bDEuNjUgMS42NUMxMC42NiA2LjA5IDExLjMyIDYgMTIgNnptLTEuMDcgMS4xNEwxMyA5LjIxYy41Ny4yNSAxLjAzLjcxIDEuMjggMS4yOGwyLjA3IDIuMDdjLjA4LS4zNC4xNC0uNy4xNC0xLjA3QzE2LjUgOS4wMSAxNC40OCA3IDEyIDdjLS4zNyAwLS43Mi4wNS0xLjA3LjE0ek0yLjAxIDMuODdsMi42OCAyLjY4QzMuMDYgNy44MyAxLjc3IDkuNTMgMSAxMS41IDIuNzMgMTUuODkgNyAxOSAxMiAxOWMxLjUyIDAgMi45OC0uMjkgNC4zMi0uODJsMy40MiAzLjQyIDEuNDEtMS40MUwzLjQyIDIuNDUgMi4wMSAzLjg3em03LjUgNy41bDIuNjEgMi42MWMtLjA0LjAxLS4wOC4wMi0uMTIuMDItMS4zOCAwLTIuNS0xLjEyLTIuNS0yLjUgMC0uMDUuMDEtLjA4LjAxLS4xM3ptLTMuNC0zLjRsMS43NSAxLjc1Yy0uMjMuNTUtLjM2IDEuMTUtLjM2IDEuNzggMCAyLjQ4IDIuMDIgNC41IDQuNSA0LjUuNjMgMCAxLjIzLS4xMyAxLjc3LS4zNmwuOTguOThjLS44OC4yNC0xLjguMzgtMi43NS4zOC0zLjc5IDAtNy4xNy0yLjEzLTguODItNS41LjctMS40MyAxLjcyLTIuNjEgMi45My0zLjUzeiIvPjwvc3ZnPg==';
Editor.visibleImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDZjMy43OSAwIDcuMTcgMi4xMyA4LjgyIDUuNUMxOS4xNyAxNC44NyAxNS43OSAxNyAxMiAxN3MtNy4xNy0yLjEzLTguODItNS41QzQuODMgOC4xMyA4LjIxIDYgMTIgNm0wLTJDNyA0IDIuNzMgNy4xMSAxIDExLjUgMi43MyAxNS44OSA3IDE5IDEyIDE5czkuMjctMy4xMSAxMS03LjVDMjEuMjcgNy4xMSAxNyA0IDEyIDR6bTAgNWMxLjM4IDAgMi41IDEuMTIgMi41IDIuNVMxMy4zOCAxNCAxMiAxNHMtMi41LTEuMTItMi41LTIuNVMxMC42MiA5IDEyIDltMC0yYy0yLjQ4IDAtNC41IDIuMDItNC41IDQuNVM5LjUyIDE2IDEyIDE2czQuNS0yLjAyIDQuNS00LjVTMTQuNDggNyAxMiA3eiIvPjwvc3ZnPg==';
Editor.lockedImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PGcgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6Ii8+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBvcGFjaXR5PSIuODciLz48L2c+PHBhdGggZD0iTTE4IDhoLTFWNmMwLTIuNzYtMi4yNC01LTUtNVM3IDMuMjQgNyA2djJINmMtMS4xIDAtMiAuOS0yIDJ2MTBjMCAxLjEuOSAyIDIgMmgxMmMxLjEgMCAyLS45IDItMlYxMGMwLTEuMS0uOS0yLTItMnpNOSA2YzAtMS42NiAxLjM0LTMgMy0zczMgMS4zNCAzIDN2Mkg5VjZ6bTkgMTRINlYxMGgxMnYxMHptLTYtM2MxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAuOS0yIDIgLjkgMiAyIDJ6Ii8+PC9zdmc+';
Editor.unlockedImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE4IDhoLTFWNmMwLTIuNzYtMi4yNC01LTUtNVM3IDMuMjQgNyA2aDJjMC0xLjY2IDEuMzQtMyAzLTNzMyAxLjM0IDMgM3YySDZjLTEuMSAwLTIgLjktMiAydjEwYzAgMS4xLjkgMiAyIDJoMTJjMS4xIDAgMi0uOSAyLTJWMTBjMC0xLjEtLjktMi0yLTJ6bTAgMTJINlYxMGgxMnYxMHptLTYtM2MxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAuOS0yIDIgLjkgMiAyIDJ6Ii8+PC9zdmc+';
Editor.printImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDhoLTFWM0g2djVINWMtMS42NiAwLTMgMS4zNC0zIDN2Nmg0djRoMTJ2LTRoNHYtNmMwLTEuNjYtMS4zNC0zLTMtM3pNOCA1aDh2M0g4VjV6bTggMTJ2Mkg4di00aDh2MnptMi0ydi0ySDZ2Mkg0di00YzAtLjU1LjQ1LTEgMS0xaDE0Yy41NSAwIDEgLjQ1IDEgMXY0aC0yeiIvPjxjaXJjbGUgY3g9IjE4IiBjeT0iMTEuNSIgcj0iMSIvPjwvc3ZnPg==';
Editor.refreshImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE3LjY1IDYuMzVDMTYuMiA0LjkgMTQuMjEgNCAxMiA0Yy00LjQyIDAtNy45OSAzLjU4LTcuOTkgOHMzLjU3IDggNy45OSA4YzMuNzMgMCA2Ljg0LTIuNTUgNy43My02aC0yLjA4Yy0uODIgMi4zMy0zLjA0IDQtNS42NSA0LTMuMzEgMC02LTIuNjktNi02czIuNjktNiA2LTZjMS42NiAwIDMuMTQuNjkgNC4yMiAxLjc4TDEzIDExaDdWNGwtMi4zNSAyLjM1eiIvPjwvc3ZnPg==';
Editor.backImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIiBvcGFjaXR5PSIuODciLz48cGF0aCBkPSJNMTcuNTEgMy44N0wxNS43MyAyLjEgNS44NCAxMmw5LjkgOS45IDEuNzctMS43N0w5LjM4IDEybDguMTMtOC4xM3oiLz48L3N2Zz4=';
Editor.closeImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIiBvcGFjaXR5PSIuODciLz48cGF0aCBkPSJNMTIgMkM2LjQ3IDIgMiA2LjQ3IDIgMTJzNC40NyAxMCAxMCAxMCAxMC00LjQ3IDEwLTEwUzE3LjUzIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bTMuNTktMTNMMTIgMTAuNTkgOC40MSA3IDcgOC40MSAxMC41OSAxMiA3IDE1LjU5IDguNDEgMTcgMTIgMTMuNDEgMTUuNTkgMTcgMTcgMTUuNTkgMTMuNDEgMTIgMTcgOC40MXoiLz48L3N2Zz4=';
Editor.closeBlackImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjZweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjZweCI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iMTIiIHJ4PSI5IiByeT0iOSIgc3Ryb2tlPSJub25lIiBmaWxsPSIjMDAwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE0LjU5IDhMMTIgMTAuNTkgOS40MSA4IDggOS40MSAxMC41OSAxMiA4IDE0LjU5IDkuNDEgMTYgMTIgMTMuNDEgMTQuNTkgMTYgMTYgMTQuNTkgMTMuNDEgMTIgMTYgOS40MSAxNC41OSA4ek0xMiAyQzYuNDcgMiAyIDYuNDcgMiAxMnM0LjQ3IDEwIDEwIDEwIDEwLTQuNDcgMTAtMTBTMTcuNTMgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=';
Editor.minusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTEwIDI1LjV2LTNoMjh2M1oiLz48L3N2Zz4=';
Editor.plusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgMTNoLTZ2NmgtMnYtNkg1di0yaDZWNWgydjZoNnYyeiIvPjwvc3ZnPg==';
Editor.addBoxImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTExIDE3aDJ2LTRoNHYtMmgtNFY3aC0ydjRIN3YyaDRabS02IDRxLS44MjUgMC0xLjQxMy0uNTg3UTMgMTkuODI1IDMgMTlWNXEwLS44MjUuNTg3LTEuNDEzUTQuMTc1IDMgNSAzaDE0cS44MjUgMCAxLjQxMy41ODdRMjEgNC4xNzUgMjEgNXYxNHEwIC44MjUtLjU4NyAxLjQxM1ExOS44MjUgMjEgMTkgMjFabTAtMmgxNFY1SDV2MTRaTTUgNXYxNFY1WiIvPjwvc3ZnPg==';
Editor.shapesImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTE1IDE1Wm0tNyAyLjk1cS4yNS4wMjUuNDg4LjAzOFE4LjcyNSAxOCA5IDE4dC41MTItLjAxMnEuMjM4LS4wMTMuNDg4LS4wMzhWMjBoMTBWMTBoLTIuMDVxLjAyNS0uMjUuMDM4LS40ODhRMTggOS4yNzUgMTggOXQtLjAxMi0uNTEyUTE3Ljk3NSA4LjI1IDE3Ljk1IDhIMjBxLjgyNSAwIDEuNDEzLjU4N1EyMiA5LjE3NSAyMiAxMHYxMHEwIC44MjUtLjU4NyAxLjQxM1EyMC44MjUgMjIgMjAgMjJIMTBxLS44MjUgMC0xLjQxMi0uNTg3UTggMjAuODI1IDggMjBaTTkgMTZxLTIuOTI1IDAtNC45NjMtMi4wMzhRMiAxMS45MjUgMiA5dDIuMDM3LTQuOTYzUTYuMDc1IDIgOSAycTIuOTI1IDAgNC45NjMgMi4wMzdRMTYgNi4wNzUgMTYgOXEwIDIuOTI1LTIuMDM3IDQuOTYyUTExLjkyNSAxNiA5IDE2Wm0wLTJxMi4wNzUgMCAzLjUzOC0xLjQ2M1ExNCAxMS4wNzUgMTQgOXQtMS40NjItMy41MzdRMTEuMDc1IDQgOSA0IDYuOTI1IDQgNS40NjMgNS40NjMgNCA2LjkyNSA0IDl0MS40NjMgMy41MzdRNi45MjUgMTQgOSAxNFptMC01WiIvPjwvc3ZnPg==';
Editor.formatImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTExIDIycS0uODI1IDAtMS40MTItLjU4N1E5IDIwLjgyNSA5IDIwdi00SDZxLS44MjUgMC0xLjQxMi0uNTg4UTQgMTQuODI1IDQgMTRWN3EwLTEuNjUgMS4xNzUtMi44MjVRNi4zNSAzIDggM2gxMnYxMXEwIC44MjUtLjU4NyAxLjQxMlExOC44MjUgMTYgMTggMTZoLTN2NHEwIC44MjUtLjU4NyAxLjQxM1ExMy44MjUgMjIgMTMgMjJaTTYgMTBoMTJWNWgtMXY0aC0yVjVoLTF2MmgtMlY1SDhxLS44MjUgMC0xLjQxMi41ODhRNiA2LjE3NSA2IDdabTAgNGgxMnYtMkg2djJabTAtMnYyWiIvPjwvc3ZnPg==';
Editor.freehandImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIyNCIgd2lkdGg9IjI0Ii8+PHBhdGggZD0iTTQuNSw4YzEuMDQsMCwyLjM0LTEuNSw0LjI1LTEuNWMxLjUyLDAsMi43NSwxLjIzLDIuNzUsMi43NWMwLDIuMDQtMS45OSwzLjE1LTMuOTEsNC4yMkM1LjQyLDE0LjY3LDQsMTUuNTcsNCwxNyBjMCwxLjEsMC45LDIsMiwydjJjLTIuMjEsMC00LTEuNzktNC00YzAtMi43MSwyLjU2LTQuMTQsNC42Mi01LjI4YzEuNDItMC43OSwyLjg4LTEuNiwyLjg4LTIuNDdjMC0wLjQxLTAuMzQtMC43NS0wLjc1LTAuNzUgQzcuNSw4LjUsNi4yNSwxMCw0LjUsMTBDMy4xMiwxMCwyLDguODgsMiw3LjVDMiw1LjQ1LDQuMTcsMi44Myw1LDJsMS40MSwxLjQxQzUuNDEsNC40Miw0LDYuNDMsNCw3LjVDNCw3Ljc4LDQuMjIsOCw0LjUsOHogTTgsMjEgbDMuNzUsMGw4LjA2LTguMDZsLTMuNzUtMy43NUw4LDE3LjI1TDgsMjF6IE0xMCwxOC4wOGw2LjA2LTYuMDZsMC45MiwwLjkyTDEwLjkyLDE5TDEwLDE5TDEwLDE4LjA4eiBNMjAuMzcsNi4yOSBjLTAuMzktMC4zOS0xLjAyLTAuMzktMS40MSwwbC0xLjgzLDEuODNsMy43NSwzLjc1bDEuODMtMS44M2MwLjM5LTAuMzksMC4zOS0xLjAyLDAtMS40MUwyMC4zNyw2LjI5eiIvPjwvc3ZnPg==';
Editor.undoImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIuNSA4Yy0yLjY1IDAtNS4wNS45OS02LjkgMi42TDIgN3Y5aDlsLTMuNjItMy42MmMxLjM5LTEuMTYgMy4xNi0xLjg4IDUuMTItMS44OCAzLjU0IDAgNi41NSAyLjMxIDcuNiA1LjVsMi4zNy0uNzhDMjEuMDggMTEuMDMgMTcuMTUgOCAxMi41IDh6Ii8+PC9zdmc+';
Editor.redoImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTguNCAxMC42QzE2LjU1IDguOTkgMTQuMTUgOCAxMS41IDhjLTQuNjUgMC04LjU4IDMuMDMtOS45NiA3LjIyTDMuOSAxNmMxLjA1LTMuMTkgNC4wNS01LjUgNy42LTUuNSAxLjk1IDAgMy43My43MiA1LjEyIDEuODhMMTMgMTZoOVY3bC0zLjYgMy42eiIvPjwvc3ZnPg==';
Editor.outlineImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0ibTE1IDIxLTYtMi4xLTQuNjUgMS44cS0uNS4yLS45MjUtLjExM1EzIDIwLjI3NSAzIDE5Ljc1di0xNHEwLS4zMjUuMTg4LS41NzUuMTg3LS4yNS41MTItLjM3NUw5IDNsNiAyLjEgNC42NS0xLjhxLjUtLjIuOTI1LjExMi40MjUuMzEzLjQyNS44Mzh2MTRxMCAuMzI1LS4xODguNTc1LS4xODcuMjUtLjUxMi4zNzVabS0xLTIuNDVWNi44NWwtNC0xLjR2MTEuN1ptMiAwIDMtMVY1LjdsLTMgMS4xNVpNNSAxOC4zbDMtMS4xNVY1LjQ1bC0zIDFaTTE2IDYuODV2MTEuN1ptLTgtMS40djExLjdaIi8+PC9zdmc+';
Editor.saveImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDEydjdINXYtN0gzdjdjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnYtN2gtMnptLTYgLjY3bDIuNTktMi41OEwxNyAxMS41bC01IDUtNS01IDEuNDEtMS40MUwxMSAxMi42N1YzaDJ2OS42N3oiLz48L3N2Zz4=';
Editor.compareImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0ibTE1Ljg1IDQwLTIuMS0yLjEgNi4wNS02LjA1SDR2LTNoMTUuOGwtNi4wNS02LjA1IDIuMS0yLjEgOS42NSA5LjY1Wm0xNi4zLTEyLjctOS42NS05LjY1TDMyLjE1IDhsMi4xIDIuMS02LjA1IDYuMDVINDR2M0gyOC4ybDYuMDUgNi4wNVoiLz48L3N2Zz4=';
Editor.expandMoreImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0ibTEyIDE1LjM3NS02LTYgMS40LTEuNCA0LjYgNC42IDQuNi00LjYgMS40IDEuNFoiLz48L3N2Zz4=';
Editor.expandLessImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0ibTcuNCAxNS4zNzUtMS40LTEuNCA2LTYgNiA2LTEuNCAxLjQtNC42LTQuNloiLz48L3N2Zz4=';
Editor.gearImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0ibTkuMjUgMjItLjQtMy4ycS0uMzI1LS4xMjUtLjYxMi0uMy0uMjg4LS4xNzUtLjU2My0uMzc1TDQuNyAxOS4zNzVsLTIuNzUtNC43NSAyLjU3NS0xLjk1UTQuNSAxMi41IDQuNSAxMi4zMzd2LS42NzVxMC0uMTYyLjAyNS0uMzM3TDEuOTUgOS4zNzVsMi43NS00Ljc1IDIuOTc1IDEuMjVxLjI3NS0uMi41NzUtLjM3NS4zLS4xNzUuNi0uM2wuNC0zLjJoNS41bC40IDMuMnEuMzI1LjEyNS42MTMuMy4yODcuMTc1LjU2Mi4zNzVsMi45NzUtMS4yNSAyLjc1IDQuNzUtMi41NzUgMS45NXEuMDI1LjE3NS4wMjUuMzM3di42NzVxMCAuMTYzLS4wNS4zMzhsMi41NzUgMS45NS0yLjc1IDQuNzUtMi45NS0xLjI1cS0uMjc1LjItLjU3NS4zNzUtLjMuMTc1LS42LjNsLS40IDMuMlptMi44LTYuNXExLjQ1IDAgMi40NzUtMS4wMjVRMTUuNTUgMTMuNDUgMTUuNTUgMTJxMC0xLjQ1LTEuMDI1LTIuNDc1UTEzLjUgOC41IDEyLjA1IDguNXEtMS40NzUgMC0yLjQ4OCAxLjAyNVE4LjU1IDEwLjU1IDguNTUgMTJxMCAxLjQ1IDEuMDEyIDIuNDc1UTEwLjU3NSAxNS41IDEyLjA1IDE1LjVabTAtMnEtLjYyNSAwLTEuMDYyLS40MzgtLjQzOC0uNDM3LS40MzgtMS4wNjJ0LjQzOC0xLjA2MnEuNDM3LS40MzggMS4wNjItLjQzOHQxLjA2My40MzhxLjQzNy40MzcuNDM3IDEuMDYydC0uNDM3IDEuMDYycS0uNDM4LjQzOC0xLjA2My40MzhaTTEyIDEyWm0tMSA4aDEuOTc1bC4zNS0yLjY1cS43NzUtLjIgMS40MzgtLjU4OC42NjItLjM4NyAxLjIxMi0uOTM3bDIuNDc1IDEuMDI1Ljk3NS0xLjctMi4xNS0xLjYyNXEuMTI1LS4zNS4xNzUtLjczOC4wNS0uMzg3LjA1LS43ODd0LS4wNS0uNzg4cS0uMDUtLjM4Ny0uMTc1LS43MzdsMi4xNS0xLjYyNS0uOTc1LTEuNy0yLjQ3NSAxLjA1cS0uNTUtLjU3NS0xLjIxMi0uOTYzLS42NjMtLjM4Ny0xLjQzOC0uNTg3TDEzIDRoLTEuOTc1bC0uMzUgMi42NXEtLjc3NS4yLTEuNDM3LjU4Ny0uNjYzLjM4OC0xLjIxMy45MzhMNS41NSA3LjE1bC0uOTc1IDEuNyAyLjE1IDEuNnEtLjEyNS4zNzUtLjE3NS43NS0uMDUuMzc1LS4wNS44IDAgLjQuMDUuNzc1dC4xNzUuNzVsLTIuMTUgMS42MjUuOTc1IDEuNyAyLjQ3NS0xLjA1cS41NS41NzUgMS4yMTMuOTYyLjY2Mi4zODggMS40MzcuNTg4WiIvPjwvc3ZnPg==';
Editor.extensionImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTguOCAyMUg1cS0uODI1IDAtMS40MTMtLjU4N1EzIDE5LjgyNSAzIDE5di0zLjhxMS4yIDAgMi4xLS43NjIuOS0uNzYzLjktMS45MzggMC0xLjE3NS0uOS0xLjkzOFE0LjIgOS44IDMgOS44VjZxMC0uODI1LjU4Ny0xLjQxMlE0LjE3NSA0IDUgNGg0cTAtMS4wNS43MjUtMS43NzVRMTAuNDUgMS41IDExLjUgMS41cTEuMDUgMCAxLjc3NS43MjVRMTQgMi45NSAxNCA0aDRxLjgyNSAwIDEuNDEzLjU4OFEyMCA1LjE3NSAyMCA2djRxMS4wNSAwIDEuNzc1LjcyNS43MjUuNzI1LjcyNSAxLjc3NSAwIDEuMDUtLjcyNSAxLjc3NVEyMS4wNSAxNSAyMCAxNXY0cTAgLjgyNS0uNTg3IDEuNDEzUTE4LjgyNSAyMSAxOCAyMWgtMy44cTAtMS4yNS0uNzg3LTIuMTI1UTEyLjYyNSAxOCAxMS41IDE4dC0xLjkxMi44NzVROC44IDE5Ljc1IDguOCAyMVpNNSAxOWgyLjEyNXEuNi0xLjY1IDEuOTI1LTIuMzI1UTEwLjM3NSAxNiAxMS41IDE2cTEuMTI1IDAgMi40NS42NzUgMS4zMjUuNjc1IDEuOTI1IDIuMzI1SDE4di02aDJxLjIgMCAuMzUtLjE1LjE1LS4xNS4xNS0uMzUgMC0uMi0uMTUtLjM1UTIwLjIgMTIgMjAgMTJoLTJWNmgtNlY0cTAtLjItLjE1LS4zNS0uMTUtLjE1LS4zNS0uMTUtLjIgMC0uMzUuMTVRMTEgMy44IDExIDR2Mkg1djIuMnExLjM1LjUgMi4xNzUgMS42NzVROCAxMS4wNSA4IDEyLjVxMCAxLjQyNS0uODI1IDIuNlQ1IDE2LjhabTcuNzUtNy43NVoiLz48L3N2Zz4=';
Editor.colorDropperImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTYgNDJ2LTguNGwxOC44NS0xOC44NS0zLjYtMy42TDIzLjMgOS4xbDQuNiA0LjZMMzUgNi42cS41NS0uNTUgMS4xNzUtLjU1dDEuMTc1LjU1bDQuMDUgNC4wNXEuNTUuNTUuNTUgMS4xNzVUNDEuNCAxM2wtNy4xIDcuMSA0LjYgNC42LTIuMDUgMi4wNS0zLjYtMy42TDE0LjQgNDJabTMtM2g0LjM1TDMxLjEgMjEuMjVsLTQuMzUtNC4zNUw5IDM0LjY1Wm0yMy4xNS0yMSA2LjItNi4yLTIuMTUtMi4xNS02LjIgNi4yWm0wIDBMMzAgMTUuODUgMzIuMTUgMThaIi8+PC9zdmc+';
Editor.helpImage = Editor.lightHelpImage;
Editor.checkmarkImage = Editor.lightCheckmarkImage;
Editor.roughFillStyles = [{
    val: 'auto',
    dispName: 'Auto'
  },
  {
    val: 'hachure',
    dispName: 'Hachure'
  },
  {
    val: 'solid',
    dispName: 'Solid'
  },
  {
    val: 'zigzag',
    dispName: 'ZigZag'
  },
  {
    val: 'cross-hatch',
    dispName: 'Cross Hatch'
  },
  {
    val: 'dashed',
    dispName: 'Dashed'
  },
  {
    val: 'zigzag-line',
    dispName: 'ZigZag Line'
  }
];
Editor.fillStyles = [{
    val: 'auto',
    dispName: 'Auto'
  },
  {
    val: 'hatch',
    dispName: 'Hatch'
  },
  {
    val: 'solid',
    dispName: 'Solid'
  },
  {
    val: 'dots',
    dispName: 'Dots'
  },
  {
    val: 'cross-hatch',
    dispName: 'Cross Hatch'
  },
  {
    val: 'dashed',
    dispName: 'Dashed'
  },
  {
    val: 'zigzag-line',
    dispName: 'ZigZag Line'
  }
];
Editor.themes = null;
Editor.ctrlKey = mxClient.IS_MAC ? 'Cmd' : 'Ctrl';
Editor.hintOffset = 20;
Editor.shapePickerHoverDelay = 300;
Editor.fitWindowBorders = null;
Editor.popupsAllowed = null != window.urlParams ? '1' != urlParams.noDevice : !0;
Editor.simpleLabels = !1;
Editor.enableNativeCipboard = window == window.top && !mxClient.IS_FF && null != navigator.clipboard;
Editor.sketchMode = !1;
Editor.darkMode = !1;
Editor.currentTheme = uiTheme;
Editor.darkColor = '#18141D';
Editor.lightColor = '#f0f0f0';
Editor.isDarkMode = function(a) {
  return Editor.darkMode;
};
Editor.isPngDataUrl = function(a) {
  return null != a && 'data:image/png;' == a.substring(0, 15);
};
Editor.isPngData = function(a) {
  return 8 < a.length && 137 == a.charCodeAt(0) && 80 == a.charCodeAt(1) && 78 == a.charCodeAt(2) && 71 == a.charCodeAt(3) && 13 == a.charCodeAt(4) && 10 == a.charCodeAt(5) && 26 == a.charCodeAt(6) && 10 == a.charCodeAt(7);
};
Editor.extractGraphModelFromPng = function(a) {
  var b = null;
  try {
    var f = a.substring(a.indexOf(',') + 1),
      e = window.atob && !mxClient.IS_SF ? atob(f) : Base64.decode(f, !0);
    EditorUi.parsePng(e, mxUtils.bind(this, function(g, d, h) {
      g = e.substring(g + 8, g + 8 + h);
      'zTXt' == d ? (h = g.indexOf(String.fromCharCode(0)), 'mxGraphModel' == g.substring(0, h) && (g = pako.inflateRaw(Graph.stringToArrayBuffer(g.substring(h + 2)), {
        to: 'string'
      }).replace(/\+/g, ' '), null != g && 0 < g.length && (b = g))) : 'tEXt' == d && (g = g.split(String.fromCharCode(0)), 1 < g.length && ('mxGraphModel' == g[0] || 'mxfile' == g[0]) && (b = g[1]));
      if (null != b || 'IDAT' == d)
        return !0;
    }));
  } catch (g) {}
  null != b && '%' == b.charAt(0) && (b = decodeURIComponent(b));
  null != b && '%' == b.charAt(0) && (b = decodeURIComponent(b));
  return b;
};
mxUtils.extend(Editor, mxEventSource);
Editor.prototype.originalNoForeignObject = mxClient.NO_FO;
Editor.prototype.transparentImage = mxClient.IS_SVG ? 'data:image/gif;base64,R0lGODlhMAAwAIAAAP///wAAACH5BAEAAAAALAAAAAAwADAAAAIxhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8egpAAA7' : IMAGE_PATH + '/transparent.gif';
Editor.prototype.extendCanvas = !0;
Editor.prototype.chromeless = !1;
Editor.prototype.cancelFirst = !0;
Editor.prototype.enabled = !0;
Editor.prototype.filename = null;
Editor.prototype.modified = !1;
Editor.prototype.autosave = !0;
Editor.prototype.initialTopSpacing = 0;
Editor.prototype.appName = document.title;
Editor.prototype.editBlankUrl = window.location.protocol + '//' + window.location.host + '/';
Editor.prototype.defaultGraphOverflow = 'hidden';
Editor.prototype.init = function() {};
Editor.prototype.isChromelessView = function() {
  return this.chromeless;
};
Editor.prototype.setAutosave = function(a) {
  this.autosave = a;
  this.fireEvent(new mxEventObject('autosaveChanged'));
};
Editor.prototype.getEditBlankUrl = function(a) {
  return this.editBlankUrl + a;
};
Editor.prototype.editAsNew = function(a, b) {
  b = null != b ? '?title=' + encodeURIComponent(b) : '';
  null != urlParams.ui && (b += (0 < b.length ? '&' : '?') + 'ui=' + urlParams.ui);
  if ('undefined' !== typeof window.postMessage && (null == document.documentMode || 10 <= document.documentMode)) {
    var f = null,
      e = mxUtils.bind(this, function(g) {
        'ready' == g.data && g.source == f && (mxEvent.removeListener(window, 'message', e), f.postMessage(a, '*'));
      });
    mxEvent.addListener(window, 'message', e);
    f = this.graph.openLink(this.getEditBlankUrl(b + (0 < b.length ? '&' : '?') + 'client=1'), null, !0);
  } else
    this.graph.openLink(this.getEditBlankUrl(b) + '#R' + encodeURIComponent(a));
};
Editor.prototype.createGraph = function(a, b) {
  a = new Graph(null, b, null, null, a);
  a.transparentBackground = !1;
  var f = a.isCssTransformsSupported,
    e = this;
  a.isCssTransformsSupported = function() {
    return f.apply(this, arguments) && (!e.chromeless || !mxClient.IS_SF);
  };
  this.chromeless || (a.isBlankLink = function(g) {
    return !this.isExternalProtocol(g);
  });
  return a;
};
Editor.prototype.resetGraph = function() {
  this.graph.gridEnabled = this.graph.defaultGridEnabled && (!this.isChromelessView() || '1' == urlParams.grid);
  this.graph.graphHandler.guidesEnabled = !0;
  this.graph.setTooltips(!0);
  this.graph.setConnectable(!0);
  this.graph.foldingEnabled = !0;
  this.graph.scrollbars = this.graph.defaultScrollbars;
  this.graph.pageVisible = this.graph.defaultPageVisible;
  this.graph.pageBreaksVisible = this.graph.pageVisible;
  this.graph.preferPageSize = this.graph.pageBreaksVisible;
  this.graph.background = null;
  this.graph.pageScale = mxGraph.prototype.pageScale;
  this.graph.pageFormat = mxGraph.prototype.pageFormat;
  this.graph.currentScale = 1;
  this.graph.currentTranslate.x = 0;
  this.graph.currentTranslate.y = 0;
  this.updateGraphComponents();
  this.graph.view.setScale(1);
};
Editor.prototype.readGraphState = function(a) {
  var b = a.getAttribute('grid');
  if (null == b || '' == b)
    b = this.graph.defaultGridEnabled ? '1' : '0';
  this.graph.gridEnabled = '0' != b && (!this.isChromelessView() || '1' == urlParams.grid);
  this.graph.gridSize = parseFloat(a.getAttribute('gridSize')) || mxGraph.prototype.gridSize;
  this.graph.graphHandler.guidesEnabled = '0' != a.getAttribute('guides');
  this.graph.setTooltips('0' != a.getAttribute('tooltips'));
  this.graph.setConnectable('0' != a.getAttribute('connect'));
  this.graph.connectionArrowsEnabled = '0' != a.getAttribute('arrows');
  this.graph.foldingEnabled = '0' != a.getAttribute('fold');
  this.isChromelessView() && this.graph.foldingEnabled && (this.graph.foldingEnabled = '1' == urlParams.nav, this.graph.cellRenderer.forceControlClickHandler = this.graph.foldingEnabled);
  b = parseFloat(a.getAttribute('pageScale'));
  !isNaN(b) && 0 < b ? this.graph.pageScale = b : this.graph.pageScale = mxGraph.prototype.pageScale;
  this.graph.isLightboxView() || this.graph.isViewer() ? this.graph.pageVisible = !1 : (b = a.getAttribute('page'), this.graph.pageVisible = null != b ? '0' != b : this.graph.defaultPageVisible);
  this.graph.pageBreaksVisible = this.graph.pageVisible;
  this.graph.preferPageSize = this.graph.pageBreaksVisible;
  b = parseFloat(a.getAttribute('pageWidth'));
  var f = parseFloat(a.getAttribute('pageHeight'));
  isNaN(b) || isNaN(f) || (this.graph.pageFormat = new mxRectangle(0, 0, b, f));
  a = a.getAttribute('background');
  this.graph.background = null != a && 0 < a.length ? a : null;
};
Editor.prototype.setGraphXml = function(a) {
  if (null != a) {
    var b = new mxCodec(a.ownerDocument);
    if ('mxGraphModel' == a.nodeName) {
      this.graph.model.beginUpdate();
      try {
        this.graph.model.clear(), this.graph.view.scale = 1, this.readGraphState(a), this.updateGraphComponents(), b.decode(a, this.graph.getModel());
      } finally {
        this.graph.model.endUpdate();
      }
      this.fireEvent(new mxEventObject('resetGraphView'));
    } else if ('root' == a.nodeName) {
      this.resetGraph();
      var f = b.document.createElement('mxGraphModel');
      f.appendChild(a);
      b.decode(f, this.graph.getModel());
      this.updateGraphComponents();
      this.fireEvent(new mxEventObject('resetGraphView'));
    } else
      throw {
        message: mxResources.get('cannotOpenFile'),
        node: a,
        toString: function() {
          return this.message;
        }
      };
  } else
    this.resetGraph(), this.graph.model.clear(), this.fireEvent(new mxEventObject('resetGraphView'));
};
Editor.prototype.getGraphXml = function(a) {
  a = (null != a ? a : 1) ? new mxCodec(mxUtils.createXmlDocument()).encode(this.graph.getModel()) : this.graph.encodeCells(mxUtils.sortCells(this.graph.model.getTopmostCells(this.graph.getSelectionCells())));
  if (0 != this.graph.view.translate.x || 0 != this.graph.view.translate.y)
    a.setAttribute('dx', Math.round(100 * this.graph.view.translate.x) / 100), a.setAttribute('dy', Math.round(100 * this.graph.view.translate.y) / 100);
  a.setAttribute('grid', this.graph.isGridEnabled() ? '1' : '0');
  a.setAttribute('gridSize', this.graph.gridSize);
  a.setAttribute('guides', this.graph.graphHandler.guidesEnabled ? '1' : '0');
  a.setAttribute('tooltips', this.graph.tooltipHandler.isEnabled() ? '1' : '0');
  a.setAttribute('connect', this.graph.connectionHandler.isEnabled() ? '1' : '0');
  a.setAttribute('arrows', this.graph.connectionArrowsEnabled ? '1' : '0');
  a.setAttribute('fold', this.graph.foldingEnabled ? '1' : '0');
  a.setAttribute('page', this.graph.pageVisible ? '1' : '0');
  a.setAttribute('pageScale', this.graph.pageScale);
  a.setAttribute('pageWidth', this.graph.pageFormat.width);
  a.setAttribute('pageHeight', this.graph.pageFormat.height);
  null != this.graph.background && a.setAttribute('background', this.graph.background);
  return a;
};
Editor.prototype.updateGraphComponents = function() {
  var a = this.graph;
  null != a.container && (a.view.validateBackground(), a.container.style.overflow = a.scrollbars ? 'auto' : this.defaultGraphOverflow, this.fireEvent(new mxEventObject('updateGraphComponents')));
};
Editor.prototype.setModified = function(a) {
  this.modified = a;
};
Editor.prototype.setFilename = function(a) {
  this.filename = a;
};
Editor.prototype.createUndoManager = function() {
  var a = this.graph,
    b = new mxUndoManager();
  this.undoListener = function(e, g) {
    b.undoableEditHappened(g.getProperty('edit'));
  };
  var f = mxUtils.bind(this, function(e, g) {
    this.undoListener.apply(this, arguments);
  });
  a.getModel().addListener(mxEvent.UNDO, f);
  a.getView().addListener(mxEvent.UNDO, f);
  f = function(e, g) {
    e = a.getSelectionCellsForChanges(g.getProperty('edit').changes, function(h) {
      return !(h instanceof mxChildChange);
    });
    if (0 < e.length) {
      a.getModel();
      g = [];
      for (var d = 0; d < e.length; d++)
        null != a.view.getState(e[d]) && g.push(e[d]);
      a.setSelectionCells(g);
    }
  };
  b.addListener(mxEvent.UNDO, f);
  b.addListener(mxEvent.REDO, f);
  return b;
};
Editor.prototype.initStencilRegistry = function() {};
Editor.prototype.destroy = function() {
  null != this.graph && (this.graph.destroy(), this.graph = null);
};