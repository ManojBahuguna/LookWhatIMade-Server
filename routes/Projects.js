// import modules
const express = require('express');
const router = express.Router();

// import model
const Project = require('../models/Project');

// get all projects
router.get('/', function(req, res){
  Project.find()
  .select(Project.publicFields.join(' '))    //select only public fields
  .then(doc => res.send(doc))
  .catch(err => {
    // Todo: Errors need to be handled more efficiently and securely
    res.status(400).send({
      error: {
        cause: 'UnknownClientError',
        errors: err.errors
      }
    });
  });
});

// get project by id
router.get('/:id', function(req, res){
  const data = req.params;
  if(data.id) {
    Project.findById(data.id)
    .select(Project.publicFields.join(' '))   //select only public fields
    .then(doc => {
      res.send({
        project: doc
      });
    })
    .catch(err =>
      res.status(500).send({
        error: {
          cause: 'UnknownServerError',
          msg: 'An unkown error occurred at the server while processing request!',
          errors: err
        }
      })
    );

    return;
  }

  res.status(400).send({
    error: {
      cause: 'RequiredFieldsMissing',
      msg: 'There required fields are missing from the request body.'
    }
  });
});

// add a project
router.post('/', function(req, res){
  const data = req.body;
  // console.log(data);
  console.log(Project.filterFields({title: 123, abc: 455}));
  if(data){
    let newProject = new Project();
    newProject.title = data.title;
    newProject.save()
    .then(doc => 
      res.send({
        project: Project.filterFields(doc)
      })
    )
    .catch(err => {
      // Todo: errors should be checked and be customized for the client in future
      // res.status(400).send({
      //   error: {
      //     cause: 'UnknownClientError',
      //     errors: err.errors
      //   }
      // });
      
      // Todo: to be used for server errors
      res.status(500).send({
        error: {
          cause: 'UnknownServerError',
          msg: 'An unkown error occurred at the server while processing request!',
          errors: err
        }
      });
    });

    return;
  }
  
  res.status(400).send({
    error: {
      cause: 'RequiredFieldsMissing',
      msg: 'There required fields are missing from the request body.'
    }
  });
});

// update project by id
router.put('/:id', function(req, res){
  const data = {
    id: req.params.id,
    body: req.body
  };

  if(data.id && data.body) {
    Project.findByIdAndUpdate(data.id, data.body, {new: true})
    .then(doc => {
      res.send({
        project: Project.filterFields(doc)
      });
    })
    .catch(err =>
      res.status(500).send({
        error: {
          cause: 'UnknownServerError',
          msg: 'An unkown error occurred at the server while processing request!',
          errors: err
        }
      })
    );

    return;
  }

  res.status(400).send({
    error: {
      cause: 'RequiredFieldsMissing',
      msg: 'There required fields are missing from the request body.'
    }
  });
});

// delete project by id
router.delete('/:id', function(req, res){
  const data = req.params;
  if(data.id) {
    Project.findByIdAndRemove(data.id)
    .select(Project.publicFields.join(' '))   //select only public fields
    .then(doc => res.send({success: true}))
    .catch(err =>
      res.status(500).send({
        error: {
          cause: 'UnknownServerError',
          msg: 'An unkown error occurred at the server while processing request!',
          errors: err
        }
      })
    );

    return;
  }

  res.status(400).send({
    error: {
      cause: 'RequiredFieldsMissing',
      msg: 'There required fields are missing from the request body.'
    }
  });
});

module.exports = router;