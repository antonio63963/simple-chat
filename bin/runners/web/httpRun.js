const server = require('../../../servers/httpServer.js');
const http = require('http');

function runHttpServer() {
  const PORT = 5000;
  const wrapServer = http.Server(server)
  wrapServer.listen(PORT, () => console.log(`Server has been started port ${PORT}`));
  return wrapServer;
};

module.exports = runHttpServer;