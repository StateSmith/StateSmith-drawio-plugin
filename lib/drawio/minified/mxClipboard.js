var mxClipboard = {
  STEPSIZE: 10,
  insertCount: 1,
  cells: null,
  setCells: function(a) {
    mxClipboard.cells = a;
  },
  getCells: function() {
    return mxClipboard.cells;
  },
  isEmpty: function() {
    return null == mxClipboard.getCells();
  },
  cut: function(a, b) {
    b = mxClipboard.copy(a, b);
    mxClipboard.insertCount = 0;
    mxClipboard.removeCells(a, b, !1);
    return b;
  },
  removeCells: function(a, b, c) {
    a.removeCells(b, c);
  },
  copy: function(a, b) {
    b = b || a.getSelectionCells();
    b = a.getExportableCells(a.model.getTopmostCells(b));
    mxClipboard.insertCount = 1;
    mxClipboard.setCells(a.cloneCells(b));
    return b;
  },
  paste: function(a) {
    var b = null;
    if (!mxClipboard.isEmpty()) {
      b = a.getImportableCells(mxClipboard.getCells());
      var c = mxClipboard.insertCount * mxClipboard.STEPSIZE,
        d = a.getDefaultParent();
      b = a.importCells(b, c, c, d);
      mxClipboard.insertCount++;
      a.setSelectionCells(b);
    }
    return b;
  }
};