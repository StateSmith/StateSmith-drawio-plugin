var FeedbackDialog = function(b, e, f, c) {
  var k = document.createElement('div'),
    m = document.createElement('div');
  mxUtils.write(m, mxResources.get('sendYourFeedback'));
  m.style.fontSize = '18px';
  m.style.marginBottom = '18px';
  k.appendChild(m);
  m = document.createElement('div');
  mxUtils.write(m, mxResources.get('yourEmailAddress') + (f ? '' : ' (' + mxResources.get('required') + ')'));
  k.appendChild(m);
  var t = document.createElement('input');
  t.setAttribute('type', 'text');
  t.style.marginTop = '6px';
  t.style.width = '600px';
  var y = mxUtils.button(mxResources.get('sendMessage'), function() {
    var J = D.value + (z.checked ? '\nDiagram:\n' + (null != c ? c : mxUtils.getXml(b.getXmlFileData())) : '') + '\nuserAgent:\n' + navigator.userAgent + '\nappVersion:\n' + navigator.appVersion + '\nappName:\n' + navigator.appName + '\nplatform:\n' + navigator.platform;
    J.length > FeedbackDialog.maxAttachmentSize ? b.alert(mxResources.get('drawingTooLarge')) : (b.hideDialog(), b.spinner.spin(document.body) && mxUtils.post(null != FeedbackDialog.feedbackUrl ? FeedbackDialog.feedbackUrl : '/email', 'email=' + encodeURIComponent(t.value) + '&version=' + encodeURIComponent(EditorUi.VERSION) + '&url=' + encodeURIComponent(window.location.href) + '&body=' + encodeURIComponent((null != e ? e : 'Feedback') + ':\n' + J), function(G) {
      b.spinner.stop();
      200 <= G.getStatus() && 299 >= G.getStatus() ? b.alert(mxResources.get('feedbackSent')) : b.alert(mxResources.get('errorSendingFeedback'));
    }, function() {
      b.spinner.stop();
      b.alert(mxResources.get('errorSendingFeedback'));
    }));
  });
  y.className = 'geBtn gePrimaryBtn';
  if (!f) {
    y.setAttribute('disabled', 'disabled');
    var E = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    mxEvent.addListener(t, 'change', function() {
      0 < t.value.length && 0 < E.test(t.value) ? y.removeAttribute('disabled') : y.setAttribute('disabled', 'disabled');
    });
    mxEvent.addListener(t, 'keyup', function() {
      0 < t.value.length && E.test(t.value) ? y.removeAttribute('disabled') : y.setAttribute('disabled', 'disabled');
    });
  }
  k.appendChild(t);
  this.init = function() {
    t.focus();
  };
  var z = document.createElement('input');
  z.setAttribute('type', 'checkbox');
  z.setAttribute('checked', 'checked');
  z.defaultChecked = !0;
  f = document.createElement('p');
  f.style.marginTop = '14px';
  f.appendChild(z);
  m = document.createElement('span');
  mxUtils.write(m, ' ' + mxResources.get('includeCopyOfMyDiagram'));
  f.appendChild(m);
  mxEvent.addListener(m, 'click', function(J) {
    z.checked = !z.checked;
    mxEvent.consume(J);
  });
  k.appendChild(f);
  m = document.createElement('div');
  mxUtils.write(m, mxResources.get('feedback'));
  k.appendChild(m);
  var D = document.createElement('textarea');
  D.style.resize = 'none';
  D.style.width = '600px';
  D.style.height = '140px';
  D.style.marginTop = '6px';
  D.setAttribute('placeholder', mxResources.get('comments'));
  k.appendChild(D);
  f = document.createElement('div');
  f.style.marginTop = '26px';
  f.style.textAlign = 'right';
  m = mxUtils.button(mxResources.get('cancel'), function() {
    b.hideDialog();
  });
  m.className = 'geBtn';
  b.editor.cancelFirst ? (f.appendChild(m), f.appendChild(y)) : (f.appendChild(y), f.appendChild(m));
  k.appendChild(f);
  this.container = k;
};
FeedbackDialog.maxAttachmentSize = 1000000;