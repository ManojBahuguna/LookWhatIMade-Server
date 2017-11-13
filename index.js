// import modules
const server = require('express')();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// import configurations
const serverConfig = require('./configs/Server');
const dbConfig = require('./configs/Database');

// connect to mongo database
mongoose.Promise = global.Promise;  //replace mongoose's depricated Promise with global promise
mongoose.connect(process.env.PORT ? dbConfig.mlabDb : dbConfig.localDb)
.then(()=>console.log('Connected to database!'))
.catch(err => console.log(err));

// use cors to allow any origin
server.use(cors());

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json());

// import and use routes
const projects = require('./routes/Projects');  //the projects route
server.use('/projects', projects);

// redirect to the application landing page
server.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// launch server on given port
server.listen(serverConfig.PORT, function(){
  console.log(`Server started at Port ${serverConfig.PORT}`);
});