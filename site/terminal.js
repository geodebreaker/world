const terminal = [];
const terminalPrompt = '$';

const log = (...x) => {
  console.log(...x);
};

function terminalState(x) {
  document.querySelector('#termcon').style.display = x ? 'block' : 'none';
  if (x) document.querySelector('#termin').focus();
}

function makeTerminal() {
  document.querySelector('#termout').innerText =
    terminal.concat([terminalPrompt + ' ' + document.querySelector('#termin').value]).join('\n');
}

function handleKey(x) {
  if (x.key == 'Enter') {
    terminal.push(terminalPrompt + ' ' + document.querySelector('#termin').value);
    document.querySelector('#termin').value = '';
  }
  setTimeout(makeTerminal, 50);
}

setInterval(makeTerminal, 300);
terminalState(true);