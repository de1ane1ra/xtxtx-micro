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

paint();
editor.value = localStorage.getItem(lsKey) || 'Hello.';
