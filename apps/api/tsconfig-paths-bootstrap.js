const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist';
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: {
    '@/*': ['*'],
  },
});

// When the process exits, cleanup the paths
process.on('exit', cleanup);
