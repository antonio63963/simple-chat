const sio = require('socket.io');

const msgArr = [];
const runnerWs = (serverHttp) => {
  //=====io================================

  const io = sio(serverHttp);

  io.on('connection', socket => {
    console.log(`Connect ID: ${socket.id}`);
    socket.on('/chat', data => {
      const msg = data.msg;
      console.log(data);
      console.log(`=======data is ${msg}!!!=====`);
      msgArr.push(data);
      socket.broadcast.emit('/newMsg', data)
    });
    socket.on('mesWriting', (data) => {
      socket.broadcast.emit('whoIsWriting', {
        userName: data.userName,
        msg: '...',
        id: socket.id
      });
    });
    socket.on('mesHasWrote', () => {
      socket.broadcast.emit('whoHasWrote', {
        id: socket.id
      })
    })


    socket.on('disconnect', () => {
      console.log(`Disconect ID: ${socket.id}`);
    })
  });


}
module.exports = runnerWs;