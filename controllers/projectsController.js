const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const {validationResult} = require('express-validator/check');

function index(req, res, next) {
  let page = req.params.page ? req.params.page : 1;
  let users;

  const options = {
    page: page,
    limit: 10,
    select: '_name _description',
    sort: 'desc'
  };

  //Users with id and name for reference on create and edit projects
  User.find({},{_id: 1, _email: 1}).sort({ _email: 1})
  .then((obj) => {
    users = obj;
  }).catch(() => {
    res.status(500).json({
      errors: [{ message: 'Something went wrong!!'}],
      data: [],
    });
  });

  Project.paginate({}, options, (err, result) => {})
  .then((objs) => {
    Project.countDocuments({}).then((data) => {
      res.render('projects/index', {
        baseUrl: req.baseUrl,
        currentUser: req.user,
        title: 'Projects',
        description: 'Show all projects',
        users: users,
        projects: objs,
        projectsCount: data
      });
    }).catch(() => {
      res.status(500).json({
        errors: [{ message: 'Something went wrong!!'}],
        data: [],
      });
    });
  })
  .catch(() => {
    res.status(500).json({
      errors: [{ message: 'Something went wrong!'}],
      data: [],
    });
  });
}

function create(req, res, next) {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({
      errors:errors.array()
    });
  }

  let project = new Project({
    _name: req.body.name,
    _applicationDate: req.body.applicationDate,
    _startDate: req.body.startDate,
    _description: req.body.description,
    _projectManager: req.body.projectManager,
    _productOwner: req.body.productOwner,
    _team: req.body.team
  });

  project.save()
  .then( obj =>{
    return res.status(200).json({
      errors: [],
      data: obj
    });
  }).catch( err =>{
    return res.status(500).json({
      errors:[{message: 'something is wrong'}],
      data:[err]
    });
  });
}

function blank(req, res, next) {
  res.render('projects/new', {
    baseUrl: req.baseUrl,
    currentUser: req.user,
    title: 'New project',
    description: 'Vista para crear un nuevo proyecto.'
  });
}

function show(req, res, next) {
  res.send('Muestra un proyecto.');
}

function update(req, res, next) {
  Project.findById(req.params.id)
  .then( obj =>{
    obj.name = req.body.name? req.body.name : obj.name;
    obj.applicationDate = req.body.applicationDate? req.body.applicationDate : obj.applicationDate;
    obj.startDate = req.body.startDate? req.body.startDate : obj.startDate;
    obj.projectManager = req.body.projectManager? req.body.projectManager : obj.projectManager;
    obj.productOwner = req.body.productOwner? req.body.productOwner : obj.productOwner;
    obj.team = obj.team;
    obj.save()
    .then( obj => {
      res.status(200).json({
        errors:[],
        data : obj
      });
    }).catch( err =>{
      res.status(500).json({
        errors:[{message:'Algo salio mal'}],
        data : []
      });
    })
  }).catch( err =>{
    res.status(500).json({
      errors:[{message:'No se localizo el proyecto'}],
      data : []
    });
  });
}

function destroy(req, res, next) {
  Project.remove({_id: req.params.id})
  .then( obj =>{
    res.status(200).json({
      errors:[],
      data:obj
    })
  }).catch( err =>{
    res.status(500).json({
      errors:[{message:'Algo salio mal'}],
      data : []
    });
  });
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  blank
}
