const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });
const users = {};
const recivers = [];

var on = {};

function addrecv(x, y) {
  recivers.push([x, y]);
}

function send(ws, type, data) {
  console.log(ws.id, '>', type + ':', data);
  ws.send(type + ':' + JSON.stringify(data));
}

function recv(ws, type, data) {
  console.log(ws.id, '<', type + ':', data);
  recivers.filter(x => x[0] == type)
    .map(x => x[1](ws, data));
}

wss.on('listening', () => {
  console.log('Server listening on port', process.env.PORT || 8080)
});

wss.on('connection', (ws, req) => {
  ws.id = genID();

  ws.on('message', x => {
    x = x.toString();
    var y = (x.match(/^.*?(?=:)/) ?? [])[0];
    x = x.replace(/^.*?:/, '');
    try {
      x = JSON.parse(x);
    } catch (e) {
      console.error(e)
    }
    recv(ws, y, x);
  });

  ws.on('close', () => {
    console.log('User disconnected (' + ws.id + ')');
  
    if (on.disconnection) on.disconnection(ws);
  
    delete users[ws.id];
  })

  console.log('User connected (' + ws.id + ')');

  if (on.connection) on.connection(ws);
});

setInterval(() => wss.clients.forEach(ws => ws.ping('h')), 30e3);

function genID() {
  var id = Math.floor(Math.random() * 16 ** 8).toString(16)
  return '0'.repeat(8 - id.length) + id;
}

module.exports = { send, addrecv, on, wss, users };