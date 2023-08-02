var Service = require('node-windows').Service;

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

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();
