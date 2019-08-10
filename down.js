const isHex = value => /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(value);
const editor = document.getElementById('e');
const lsKey = 'down';

function paint () {
  const {hash} = window.location;
  if (hash) {
    let [bg, fg] = hash.split('-');
    fg = `#${fg}`;

    if (isHex(bg) && isHex(fg)) {
      const css = document.styleSheets[0];
      css.deleteRule(1);
      css.insertRule(`::selection{background:${fg};color:${bg}}`, 1);
      Object.assign(document.body.style, {
        backgroundColor: bg, color: fg
      });
    }
  }
}

window.onhashchange = paint;
window.onkeyup = _ => localStorage.setItem(lsKey, editor.value);

document.onkeydown = function (e) {
  if (e.ctrlKey && e.keyCode === 83) {
    e.preventDefault();
    e.stopPropagation();
  }
};

editor.onkeydown = function (e) {
  if (e.keyCode === 9) { // Tab
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const {target} = e;
    const {value} = target;

    target.value = `${value.substring(0, start)}\t${value.substring(end)}`;

    this.selectionStart = start + 1;
    this.selectionEnd = start + 1;
  }
};

paint();
editor.value = localStorage.getItem(lsKey) || 'Hello.';
