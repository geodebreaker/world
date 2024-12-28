addrecv('test', data => send('test', data));
let FPS = 30;
let goober;

function start() {
  goober = 0;
}

function loop(dt) {
  goober += dt;
  __.rect(goober * 10, 50, 50, 100, 'red', 'black', 4)
}