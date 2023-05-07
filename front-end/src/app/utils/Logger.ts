import pino from 'pino';
// import path from 'path';
// const scriptName = path.basename(__filename);
const formatters = {
  bindings(bindings: any) {
    return {
      pid: bindings.pid,
      hostname: bindings.hostname,
      methodName: 'ayon',
      // fileName: scriptName,
      node_version: process.version,
    };
  },
};
const logger = pino({
  formatters: formatters,
  msgPrefix: 'this is a message prefix!',
});

export default logger;
