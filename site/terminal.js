const terminal = [];
const terminalPrompt = '$';
let terminalOpen = false;

const log = (...x) => {
  console.log(...x);
};

function terminalState(x) {
  terminalOpen = x;
  document.querySelector('#termcon').style.display = x ? 'block' : 'none';
  if (x) document.querySelector('#termin').focus();
}

function makeTerminal() {
  if (terminalOpen) {
    document.querySelector('#termout').innerText =
      terminal.concat([terminalPrompt + ' ' + document.querySelector('#termin').value]).join('\n');
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
terminalState(true);