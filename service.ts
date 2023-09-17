
require("dotenv").config();

const command = process.argv[2]
console.log(`COMMAND: ${command}`)

// npm link node-windows 필요
const service = require('node-windows').Service;

/**
 * 정의
 */
console.log(`PATH: ${process.env.BUILD_PATH}`)
const svc = new service({
  name:'Meating API Server',
  description: 'Meating API Server',
  script: `${process.env.BUILD_PATH}\\main.js`,
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096',
  ],
  /**
  env: {
    name: 'PORT',
    value: '9071',
  }
   */
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

svc.on('install', function(){
  svc.start();
});

svc.on('uninstall', function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});

/**
 * 실행
 */
if (command === 'install') {
  svc.install();
} else if (command === 'uninstall') {
  svc.uninstall();
}
