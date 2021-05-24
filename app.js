const editor = document.querySelector('main');

(() => {
  const data = localStorage.getItem('web-notes-content');
  if (data) {
    editor.innerHTML = data;
  }
})();

editor.addEventListener('input', (e) => {
  const pos = $('main').caret('pos');

  const regex = /(?<!<button contenteditable="false">)(\[[x ]\])(?!<\/button>)/g;
  const str = editor.innerHTML;

  const replaced = str.search(regex) >= 0;
  if (replaced) {
    editor.innerHTML = editor.innerHTML.replace(regex, '<button contenteditable="false">$1</button>&nbsp;');
    $('main').caret('pos', pos + 1);
  }
});

editor.addEventListener('mousedown', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    e.preventDefault();
  }
});

editor.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') { // tab key
    e.preventDefault();  // this will prevent us from tabbing out of the editor

    // now insert four non-breaking spaces for the tab key
    const doc = editor.ownerDocument.defaultView;
    const sel = doc.getSelection();
    const range = sel.getRangeAt(0);

    const tabNode = document.createTextNode("\u00a0".repeat(4));
    range.insertNode(tabNode);

    range.setStartAfter(tabNode);
    range.setEndAfter(tabNode); 
    sel.removeAllRanges();
    sel.addRange(range);
}
})

editor.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    const empty = e.target.textContent[1] === ' ';
    if (empty) {
      e.target.textContent = '[x]';
    } else {
      e.target.textContent = '[ ]';
    }
  }
});

window.setInterval(() => {
  localStorage.setItem('web-notes-content', editor.innerHTML);
}, 3e3)

window.addEventListener('load', (e) => {
  editor.focus();
})
