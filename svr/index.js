const net = require('./net.js');

const send = net.send;
process.on('uncaughtException', x => console.error(x));
process.on('unhandledRejection', x => console.error(x));

net.on.connection = ws => {
  send(ws, 'test', 'goober');
};

net.addrecv('test', x => console.log(x))