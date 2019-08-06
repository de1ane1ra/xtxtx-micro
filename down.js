const editor = document.getElementById('e');
const {hash} = window.location;
const lsKey = 'down';

if (hash) {
  const isHex = value => /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(value);
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

editor.value = localStorage.getItem(lsKey) || 'Hello.';
window.onkeyup = _ => localStorage.setItem(lsKey, editor.value);
