const httpRunner = require('./httpRun');
const wsRunner = require('./wsRun');

function serverRunner() {
  const http =  httpRunner();
  wsRunner(http);
};

module.exports = serverRunner;