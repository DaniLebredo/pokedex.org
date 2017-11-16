var PseudoWorker = require('pseudo-worker');
var utils = require('./../main/utils');

var worker;

if (utils.hasWebWorkerIDB()) {
  worker = new Worker('js/worker.js');
} else {
  // for Safari, just use PouchDB+WebSQL without a web worker, because of
  // https://bugs.webkit.org/show_bug.cgi?id=149953
  worker = new PseudoWorker('js/worker.js');
}

worker.addEventListener('error', (e) => {
  console.warn('worker threw an error', e.error);
});

module.exports = worker;
