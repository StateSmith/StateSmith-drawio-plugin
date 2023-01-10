DrawioComment = function(b, e, f, c, k, m, t) {
  this.file = b;
  this.id = e;
  this.content = f;
  this.modifiedDate = c;
  this.createdDate = k;
  this.isResolved = m;
  this.user = t;
  this.replies = [];
};
DrawioComment.prototype.addReplyDirect = function(b) {
  null != b && this.replies.push(b);
};
DrawioComment.prototype.addReply = function(b, e, f, c, k) {
  e();
};
DrawioComment.prototype.editComment = function(b, e, f) {
  e();
};
DrawioComment.prototype.deleteComment = function(b, e) {
  b();
};