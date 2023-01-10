GitLabFile = function(b, e, f) {
  GitHubFile.call(this, b, e, f);
  this.peer = this.ui.gitLab;
};
mxUtils.extend(GitLabFile, GitHubFile);
GitLabFile.prototype.getFileUrl = function() {
  return this.meta.html_url;
};
GitLabFile.prototype.getFolderUrl = function() {
  var b = this.getFileUrl();
  return b.substring(0, b.lastIndexOf('/'));
};
GitLabFile.prototype.share = function() {
  this.ui.editor.graph.openLink(DRAWIO_GITLAB_URL + '/' + encodeURIComponent(this.meta.org) + '/' + encodeURIComponent(this.meta.repo) + '/-/project_members');
};
GitLabFile.prototype.getId = function() {
  return this.meta.org + '/' + (null != this.meta.repo ? encodeURIComponent(this.meta.repo) + '/' + (null != this.meta.ref ? this.meta.ref + (null != this.meta.path ? '/' + this.meta.path : '') : '') : '');
};
GitLabFile.prototype.getHash = function() {
  return encodeURIComponent('A' + this.getId());
};
GitLabFile.prototype.isConflict = function(b) {
  return null != b && 400 == b.status;
};
GitLabFile.prototype.getMode = function() {
  return App.MODE_GITLAB;
};
GitLabFile.prototype.getDescriptorEtag = function(b) {
  return b.last_commit_id;
};
GitLabFile.prototype.setDescriptorEtag = function(b, e) {
  b.last_commit_id = e;
};