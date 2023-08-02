var Service = require('node-windows').Service;
require("dotenv").config();

// Create a new service object
var svc = new Service({
  name:'Meating API Server',
  description: 'Meating API Server',
  script: `${process.env.BUILD_SRC_PATH}\\main.js`,
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

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
