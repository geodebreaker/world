function send(type, data) {
  log('>', type + ':', data);
  ws.send(type + ':' + JSON.stringify(data));
}

const recivers = [];

function addrecv(x, y) {
  recivers.push([x, y]);
}

function recv(type, data) {
  log('<', type + ':', data);
  recivers.filter(x => x[0] == type)
    .map(x => x[1](data));
}

var ws = new WebSocket('ws://127.0.0.1:8080');

ws.onmessage = x => {
  x = x.data;
  var y = (x.match(/^.*?(?=:)/) ?? [])[0];
  x = x.replace(/^.*?:/, '');
  try {
    x = JSON.parse(x);
  } catch (e) {
    log(e)
  }
  recv(y, x);
}

addrecv('test', data => send('test', data));