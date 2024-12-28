const terminal = [
  'Welcome to the terminal!',
  'Press [ctrl] + [~] or the close button to leave.',
  'Type "help" to find commands.'
];
const terminalPrompt = '$';
let terminalOpen = false;

const log = (...x) => {
  console.log(...x);
};

function terminalState(x) {
  terminalOpen = x;
  document.querySelector('#termcon').style.display = x ? 'block' : 'none';
  if (x) {
    document.querySelector('#termin').focus();
    makeTerminal();
  }
}

function makeTerminal() {
  if (terminalOpen) {
    let x = document.querySelector('#termout').scrollTop + 10 >
      document.querySelector('#termout').scrollHeight - document.querySelector('#termout').clientHeight;
    document.querySelector('#termout').innerText =
      terminal.concat([terminalPrompt + ' ' + document.querySelector('#termin').value]).join('\n');
    if (x)
      document.querySelector('#termout').scrollTop = document.querySelector('#termout').scrollHeight;
  }
}

function handleKey(x) {
  if (x.key == 'Enter') {
    cmd(document.querySelector('#termin').value);
    terminal.push(terminalPrompt + ' ' + document.querySelector('#termin').value);
    document.querySelector('#termin').value = '';
  }
  setTimeout(makeTerminal, 50);
}

async function cmd(x) {

}

window.addEventListener('keydown', x => {
  if ((x.key == '`' || x.key == '~') && x.ctrlKey)
    terminalState(!terminalOpen);
})

setInterval(makeTerminal, 300);