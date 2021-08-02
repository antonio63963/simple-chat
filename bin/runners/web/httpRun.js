const server = require('../../../servers/httpServer.js');
const http = require('http');

function runHttpServer() {
  const PORT = 3000;
  const wrapServer = http.Server(server)
  wrapServer.listen(PORT, () => console.log(`Server has been started port 3000`));
  return wrapServer;
};

module.exports = runHttpServer;