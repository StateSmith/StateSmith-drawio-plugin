function mxUndoManager(a) {
  this.size = null != a ? a : 100;
  this.clear();
}
mxUndoManager.prototype = new mxEventSource();
mxUndoManager.prototype.constructor = mxUndoManager;
mxUndoManager.prototype.size = null;
mxUndoManager.prototype.history = null;
mxUndoManager.prototype.indexOfNextAdd = 0;
mxUndoManager.prototype.isEmpty = function() {
  return 0 == this.history.length;
};
mxUndoManager.prototype.clear = function() {
  this.history = [];
  this.indexOfNextAdd = 0;
  this.fireEvent(new mxEventObject(mxEvent.CLEAR));
};
mxUndoManager.prototype.canUndo = function() {
  return 0 < this.indexOfNextAdd;
};
mxUndoManager.prototype.undo = function() {
  for (; 0 < this.indexOfNextAdd;) {
    var a = this.history[--this.indexOfNextAdd];
    a.undo();
    if (a.isSignificant()) {
      this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', a));
      break;
    }
  }
};
mxUndoManager.prototype.canRedo = function() {
  return this.indexOfNextAdd < this.history.length;
};
mxUndoManager.prototype.redo = function() {
  for (var a = this.history.length; this.indexOfNextAdd < a;) {
    var b = this.history[this.indexOfNextAdd++];
    b.redo();
    if (b.isSignificant()) {
      this.fireEvent(new mxEventObject(mxEvent.REDO, 'edit', b));
      break;
    }
  }
};
mxUndoManager.prototype.undoableEditHappened = function(a) {
  this.trim();
  0 < this.size && this.size == this.history.length && this.history.shift();
  this.history.push(a);
  this.indexOfNextAdd = this.history.length;
  this.fireEvent(new mxEventObject(mxEvent.ADD, 'edit', a));
};
mxUndoManager.prototype.trim = function() {
  if (this.history.length > this.indexOfNextAdd)
    for (var a = this.history.splice(this.indexOfNextAdd, this.history.length - this.indexOfNextAdd), b = 0; b < a.length; b++)
      a[b].die();
};