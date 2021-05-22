const editor = document.querySelector('main');

(() => {
  const data = localStorage.getItem('web-notes-content');
  if (data) {
    editor.innerHTML = data;
  }
})();

editor.addEventListener('input', (e) => {
  const pos = $('main').caret('pos');
  console.log(pos);

  const regex = /(?<!<button contenteditable="false">)(\[[x ]\])(?!<\/button>)/g;
  const str = editor.innerHTML;

  const replaced = str.search(regex) >= 0;
  if (replaced) {
    editor.innerHTML = editor.innerHTML.replace(regex, '<button contenteditable="false">$1</button>&nbsp;');
    $('main').caret('pos', pos + 1);
  }
});

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