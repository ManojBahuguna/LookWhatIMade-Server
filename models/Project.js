const mongoose = require('mongoose');
const dbConfig = require('../configs/Database');
const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  info: String,
  sourceCodeLink: String,
  imageURL: String,
  tags: Array,
  likes: {
    type: Number,
    default: 0
  },
  dateStarted: Date,
  dateFinished: Date,
  dateAdded: {
    type: Date,
    default: Date.now()
  }
});

const Project = mongoose.model('User', projectSchema);

Project.publicFields = ['_id', 'title', 'link', 'info', 'sourceCodeLink', 'imageURL', 'tags', 'likes', 'dateStarted', 'dateFinished', 'dateAdded'];  //list of fields that can be sent to user

Project.filterFields = project => {  //function that receives the project object and return another object with just the public fields
  let filteredObject = {};
  Project.publicFields.forEach(function(field){
    filteredObject[field] = project[field];
  });
  return filteredObject;
};

module.exports = Project;