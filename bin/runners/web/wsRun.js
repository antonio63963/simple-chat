const sio = require('socket.io');

const msgArr = [];
const participantsArr = [];
const runnerWs = (serverHttp) => {
  //=====io================================

  const io = sio(serverHttp);

  io.on('connection', socket => {
    console.log(`Connect ID: ${socket.id}`);
    socket.on('userData', (data, cb) => {
      console.log('userData: ',data);
      if(data.userName) {
        participantsArr.push({...data, id: socket.id});
        cb({status: 'success', participantsArr, id: socket.id});
        socket.broadcast.emit('newUser', {...data, id: socket.id});
      };
    });
    socket.on('/chat', data => {
      const msg = data.msg;
      console.log(data);
      
      msgArr.push(data);
      socket.broadcast.emit('/newMsg', data)
    });

    socket.on('typing', data => {
      socket.broadcast.emit('userTyping', {id: socket.id});
    });
    socket.on('finishTyping', data => {
      socket.broadcast.emit('userFinishTyping', {...data, id: socket.id});
    });
   
    // socket.on('mesWriting', (data) => {
    //   socket.broadcast.emit('whoIsWriting', {
    //     userName: data.userName,
    //     msg: '...',
    //     id: socket.id
    //   });
    // });
    // socket.on('mesHasWrote', () => {
    //   socket.broadcast.emit('whoHasWrote', {
    //     id: socket.id
    //   });
    // })


    socket.on('disconnect', () => {
      const indDelete = participantsArr.findIndex( part => part.id === socket.id);
      participantsArr.splice( indDelete, 1 );
      socket.broadcast.emit('leaveUser', {id: socket.id});
      console.log(`Disconect ID: ${socket.id}`);
    })
  });


}
module.exports = runnerWs;