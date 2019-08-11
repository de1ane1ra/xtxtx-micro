const editor = document.getElementById('e');
const lsKey = 'down';

function addCSS (bg, fg) {
  const css = document.styleSheets[0];
  css.deleteRule(1);
  css.insertRule(`::selection{background-color:${fg};color:${bg}}`, 1);
}

function paint (bg, fg) {
  Object.assign(document.body.style, {
    backgroundColor: bg, color: fg
  });
}

function parseHash () {
  const isHex = value => /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(value);
  const {hash} = window.location;
  if (!hash) return;
  let [bg, fg] = hash.split('-');
  fg = `#${fg}`;
  if (!isHex(bg) || !isHex(fg)) return;
  addCSS(bg, fg);
  paint(bg, fg);
}

window.onhashchange = parseHash;
document.onkeyup = () => localStorage.setItem(lsKey, editor.value);

// Prevent Ctrl+S from interrupting
document.onkeydown = function (event) {
  if (!(event.ctrlKey && event.keyCode === 83)) return;
  event.preventDefault();
};

// Enable tab characters
editor.onkeydown = function (event) {
  if (event.keyCode !== 9) return;
  event.preventDefault();

  const start = this.selectionStart;
  const end = this.selectionEnd;
  const {target, target: {value}} = event;

  target.value = `${value.substring(0, start)}\t${value.substring(end)}`;

  this.selectionStart = start + 1;
  this.selectionEnd = this.selectionStart;
};

parseHash();
editor.value = localStorage.getItem(lsKey) || 'Hello.';
