const
  mongo = require('mongoose')
  , CRUD = require('./CRUD')
  , dbOpt = {
      path: 'mongodb://admin:nameplus1@ds255260.mlab.com:55260/name_plus'
    }
  , schemas = {
      plus: require('./schemas/plus')(mongo)
    }
  , methods = {
      init: initConnection
      , plus: new CRUD(mongo, schemas.plus, 'plus')
    }
  ;

function initConnection() {
  mongo.Promise = global.Promise;
  mongo.connect(dbOpt.path, {
    autoReconnect: true,
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, 
    poolSize: 10
  });
  mongo.connection.on('connected', function () {  
    console.log('db connected...');
  }); 
  
  mongo.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
    console.log('Closing application');
    // process.exit(0);
  }); 
    
  // When the connection is disconnected
  mongo.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected'); 
    console.log('Closing application');
    // process.exit(0);
  });
}

module.exports = methods;