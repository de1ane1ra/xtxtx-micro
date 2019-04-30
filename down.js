/**
 * Down
 * Simple browser scratchpad
 *
 * @author Josh Avanier
 * @license MIT
 */

const {hash} = window.location

if (hash) {
  const ch = h => /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(h)
  const s = hash.substr(1).split('-')
  const a = `#${s[0]}`
  const b = `#${s[1]}`
  const BG = ch(a) && a ? a : BG
  const FG = ch(b) && b ? b : FG

  const c = document.styleSheets[0]
  c.insertRule(`::selection{background:${FG};color:${BG}}`, c.cssRules.length)
  Object.assign(document.body.style, {backgroundColor: BG, color: FG})
}

e.innerHTML = localStorage.getItem('down') || 'Hello.'
e.focus()

window.onkeyup = _ => localStorage.setItem('down', e.innerHTML)
