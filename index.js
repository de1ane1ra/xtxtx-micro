'use strict';

const editor = document.getElementById('e');
const lsKey = 'down';

function paint (bg, fg) {
  const css = document.styleSheets[0];
  css.deleteRule(1);
  css.insertRule(`::selection{background-color:${fg};color:${bg}}`, 1);
  Object.assign(document.body.style, {backgroundColor: bg, color: fg});
}

function parseHash () {
  const {hash} = window.location;
  if (!hash) return;
  const isHex = value => /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(value);
  let [bg, fg] = hash.split('-');
  fg = `#${fg}`;
  if (!isHex(bg) || !isHex(fg)) return;
  paint(bg, fg);
}

function download () {
  const filename = prompt('Save as:', 'notes.txt');
  if (filename === null || filename === '') return;

  const text = editor.value.replace(/\n/g, '\r\n');
  const blob = new Blob([text], {type: 'text/plain'});
  const link = Object.assign(document.createElement('a'), {
    download: filename,
    href: window.URL.createObjectURL(blob),
    target: 'target',
  });

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

window.onhashchange = parseHash;
document.onkeyup = () => localStorage.setItem(lsKey, editor.value);

// Handle Ctrl + S
document.onkeydown = function (event) {
  if (!(event.ctrlKey && event.code === 'KeyS')) return;
  event.preventDefault();
  download();
};

// Enable tab characters
editor.onkeydown = function (event) {
  if (event.code !== 'Tab') return;
  event.preventDefault();

  const start = this.selectionStart;
  const end = this.selectionEnd;
  const {target, target: {value}} = event;

  target.value = `${value.substring(0, start)}\t${value.substring(end)}`;

  this.selectionStart = start + 1;
  this.selectionEnd = this.selectionStart;
};

editor.value = localStorage.getItem(lsKey) || 'Hello.';
parseHash();
