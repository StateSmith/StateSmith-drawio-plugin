DriveComment = function(b, e, f, c, k, m, t, y) {
  DrawioComment.call(this, b, e, f, c, k, m, t);
  this.pCommentId = y;
};
mxUtils.extend(DriveComment, DrawioComment);
DriveComment.prototype.addReply = function(b, e, f, c, k) {
  b = {
    content: b.content
  };
  c ? b.verb = 'resolve' : k && (b.verb = 'reopen');
  this.file.ui.drive.executeRequest({
    url: '/files/' + this.file.getId() + '/comments/' + this.id + '/replies',
    params: b,
    method: 'POST'
  }, mxUtils.bind(this, function(m) {
    e(m.replyId);
  }), f);
};
DriveComment.prototype.editComment = function(b, e, f) {
  this.content = b;
  b = {
    content: b
  };
  this.file.ui.drive.executeRequest(this.pCommentId ? {
    url: '/files/' + this.file.getId() + '/comments/' + this.pCommentId + '/replies/' + this.id,
    params: b,
    method: 'PATCH'
  } : {
    url: '/files/' + this.file.getId() + '/comments/' + this.id,
    params: b,
    method: 'PATCH'
  }, e, f);
};
DriveComment.prototype.deleteComment = function(b, e) {
  this.file.ui.drive.executeRequest(this.pCommentId ? {
    url: '/files/' + this.file.getId() + '/comments/' + this.pCommentId + '/replies/' + this.id,
    method: 'DELETE'
  } : {
    url: '/files/' + this.file.getId() + '/comments/' + this.id,
    method: 'DELETE'
  }, b, e);
};