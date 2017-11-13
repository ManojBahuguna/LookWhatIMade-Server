const mongoose = require('mongoose');
const dbConfig = require('../configs/Database');

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('User', projectSchema);

Project.publicFields = ['title'];  //list of fields that can be sent to user

Project.filterFields = project => {  //function that receives the project object and return another object with just the public fields
  let filteredObject = {};
  Project.publicFields.forEach(function(field){
    filteredObject[field] = project[field];
  });
  return filteredObject;
};

module.exports = Project;