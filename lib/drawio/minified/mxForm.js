function mxForm(a) {
  this.table = document.createElement('table');
  this.table.className = a;
  this.body = document.createElement('tbody');
  this.table.appendChild(this.body);
}
mxForm.prototype.table = null;
mxForm.prototype.body = !1;
mxForm.prototype.getTable = function() {
  return this.table;
};
mxForm.prototype.addButtons = function(a, b) {
  var c = document.createElement('tr'),
    d = document.createElement('td');
  c.appendChild(d);
  d = document.createElement('td');
  var e = document.createElement('button');
  mxUtils.write(e, mxResources.get('ok') || 'OK');
  d.appendChild(e);
  mxEvent.addListener(e, 'click', function() {
    a();
  });
  e = document.createElement('button');
  mxUtils.write(e, mxResources.get('cancel') || 'Cancel');
  d.appendChild(e);
  mxEvent.addListener(e, 'click', function() {
    b();
  });
  c.appendChild(d);
  this.body.appendChild(c);
};
mxForm.prototype.addText = function(a, b, c) {
  var d = document.createElement('input');
  d.setAttribute('type', c || 'text');
  d.value = b;
  return this.addField(a, d);
};
mxForm.prototype.addCheckbox = function(a, b) {
  var c = document.createElement('input');
  c.setAttribute('type', 'checkbox');
  this.addField(a, c);
  b && (c.checked = !0);
  return c;
};
mxForm.prototype.addTextarea = function(a, b, c) {
  var d = document.createElement('textarea');
  mxClient.IS_NS && c--;
  d.setAttribute('rows', c || 2);
  d.value = b;
  return this.addField(a, d);
};
mxForm.prototype.addCombo = function(a, b, c) {
  var d = document.createElement('select');
  null != c && d.setAttribute('size', c);
  b && d.setAttribute('multiple', 'true');
  return this.addField(a, d);
};
mxForm.prototype.addOption = function(a, b, c, d) {
  var e = document.createElement('option');
  mxUtils.writeln(e, b);
  e.setAttribute('value', c);
  d && e.setAttribute('selected', d);
  a.appendChild(e);
};
mxForm.prototype.addField = function(a, b) {
  var c = document.createElement('tr'),
    d = document.createElement('td');
  mxUtils.write(d, a);
  c.appendChild(d);
  d = document.createElement('td');
  d.appendChild(b);
  c.appendChild(d);
  this.body.appendChild(c);
  return b;
};