const sio = require('socket.io');

const msgArr = [];
const participantsArr = [];
const runnerWs = (serverHttp) => {
  //=====io================================

  const io = sio(serverHttp);

  io.on('connection', socket => {
    console.log(`Connect ID: ${socket.id}`);
    socket.on('userData', (data, cb) => {
      console.log('userData: ', data);
      if (data.userName) {
        participantsArr.push({
          ...data,
          id: socket.id
        });
        cb({
          status: 'success',
          participantsArr,
          id: socket.id,
          msgArr
        });
        socket.broadcast.emit('newUser', {
          ...data,
          id: socket.id
        });

      };
    });
    socket.on('/chat', data => {
      msgArr.push({
        ...data,
        id: socket.id
      });
      socket.broadcast.emit('/newMsg', data)
    });

    socket.on('typing', data => {
      socket.broadcast.emit('userTyping', {
        id: socket.id
      });
    });
    socket.on('finishTyping', data => {
      socket.broadcast.emit('userFinishTyping', {
        ...data,
        id: socket.id
      });
    });
    //file
    // ss(socket).on('profile-image', function(stream, data) {
    //   var filename = path.basename(data.name);
    //   stream.pipe(fs.createWriteStream(filename));
    // });

    socket.on('disconnect', () => {
      const indDelete = participantsArr.findIndex(part => part.id === socket.id);
      participantsArr.splice(indDelete, 1);
      socket.broadcast.emit('leaveUser', {
        id: socket.id
      });
      console.log(`Disconect ID: ${socket.id}`);
    })
  });


}
module.exports = runnerWs;