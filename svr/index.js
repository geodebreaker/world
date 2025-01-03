const net = require('./net.js');
const window = require('./window.js');

if (window.app) {
  window.app.whenReady().then(() => window.createWindow());
}

const send = net.send;
process.on('uncaughtException', x => console.error(x));
process.on('unhandledRejection', x => console.error(x));

net.on.connection = ws => {
  send(ws, 'test', 'goober');
};

net.on.disconnection = ws => {
  if (net.wss.clients.size == 0 && window.app)
    setTimeout(() => {
      if (net.wss.clients.size == 0) {
        console.log('Server closed.')
        net.wss.close();
      }
    }, 10e3);
};

net.addrecv('test', (ws, x) => console.log(ws.id, x));