const log = (...x) => {
  console.log(...x);
};

function terminalState(x) {
  document.querySelector('#termcon').style.display = x ? 'block' : 'none';
}

function handleKey(x) {
  log(x.key);
}

terminalState(true)