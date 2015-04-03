'use strict';

function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}
injectScript('http://localhost:35729/livereload.js?snipver=1', 'body');
injectScript(chrome.extension.getURL('/scripts/lodash.js'), 'body');
injectScript(chrome.extension.getURL('/scripts/spy.js'), 'body');
