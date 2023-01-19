function mxUndoableEdit(a, b) {
  this.source = a;
  this.changes = [];
  this.significant = null != b ? b : !0;
}
mxUndoableEdit.prototype.source = null;
mxUndoableEdit.prototype.changes = null;
mxUndoableEdit.prototype.significant = null;
mxUndoableEdit.prototype.undone = !1;
mxUndoableEdit.prototype.redone = !1;
mxUndoableEdit.prototype.isEmpty = function() {
  return 0 == this.changes.length;
};
mxUndoableEdit.prototype.isSignificant = function() {
  return this.significant;
};
mxUndoableEdit.prototype.add = function(a) {
  this.changes.push(a);
};
mxUndoableEdit.prototype.notify = function() {};
mxUndoableEdit.prototype.die = function() {};
mxUndoableEdit.prototype.undo = function() {
  if (!this.undone) {
    this.source.fireEvent(new mxEventObject(mxEvent.START_EDIT));
    for (var a = this.changes.length - 1; 0 <= a; a--) {
      var b = this.changes[a];
      null != b.execute ? b.execute() : null != b.undo && b.undo();
      this.source.fireEvent(new mxEventObject(mxEvent.EXECUTED, 'change', b));
    }
    this.undone = !0;
    this.redone = !1;
    this.source.fireEvent(new mxEventObject(mxEvent.END_EDIT));
  }
  this.notify();
};
mxUndoableEdit.prototype.redo = function() {
  if (!this.redone) {
    this.source.fireEvent(new mxEventObject(mxEvent.START_EDIT));
    for (var a = this.changes.length, b = 0; b < a; b++) {
      var c = this.changes[b];
      null != c.execute ? c.execute() : null != c.redo && c.redo();
      this.source.fireEvent(new mxEventObject(mxEvent.EXECUTED, 'change', c));
    }
    this.undone = !1;
    this.redone = !0;
    this.source.fireEvent(new mxEventObject(mxEvent.END_EDIT));
  }
  this.notify();
};