const express = require('express');
const User = require('../models/user');
const {validationResult} = require('express-validator/check');

function index(req, res, next) {
  let page = req.params.page ? req.params.page : 1;

  const options = {
    page: page,
    limit: 10,
    select: '_name _email',
    sort: 'desc'
  };

  User.paginate({}, options, (err, result) => {})
  .then((objs) => {
    User.countDocuments({}).then((data) => {
      res.render('users/index', {
        baseUrl: req.baseUrl,
        currentUser: req.user,
        title: 'Users',
        description: 'Show all users',
        users: objs,
        usersCount: data
      });
    }).catch(() => {
      res.status(500).json({
        errors: [{ message: 'Something went wrong!'}],
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

  User.findOne({
    _email: req.body.email,
  }).then( (currentUser) => {
    if(currentUser){
      res.status(500).json({
        errors:[{message:'User email already registered!'}],
        data : []
      });
      done(null, currentUser);
    } else {
      let user = new User({
        _name: req.body.name,
        _email: req.body.email,
        _dateBirth: req.body.dateBirth,
        _curp: req.body.curp,
        _rfc: req.body.rfc,
        _address: req.body.address,
        _abilities: []
      }).save().then( () => {
        res.redirect('/users/');
      }).catch( err =>{
        res.status(500).json({
          errors:[{message:"User can't be saved"}],
          data : []
        });
      });
    }
  }).catch( err =>{
    return res.status(500).json({
      errors:[{message:'Algo salió mal'}],
      data:[]
    });
  });
}

function blank(req, res, next) {
  res.redirect('index')
}

function show(req, res, next) {
  User.findById(req.params.id)
  .then(obj =>{
    res.render('users/show', {
      baseUrl: req.baseUrl,
      currentUser: req.user,
      title: req.user.name,
      description: 'Clase de DRAW',
      user: obj
    });
  }).catch( err =>{
    res.status(500).json({
      errors:[{message:'Algo salio mal'}],
      data : []
    });
  })
}

function update(req, res, next) {
  if(req.user.id == req.params.id){
    User.findById(req.params.id)
    .then( obj =>{
      obj.name = req.body.name;
      obj.email = req.body.email ? req.body.email : obj.email
      obj.password = req.body.password ? req.body.password : obj.password;
      obj.dateBirth = req.body.dateBirth;
      obj.curp = req.body.curp;
      obj.rfc = req.body.rfc;
      obj.address = req.body.address;
      obj.abilities = req.body.abilities;
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
        errors:[{message:'Algo salio mal'}],
        data : []
      });
    });
  } else {
    res.status(500).json({
      errors:[{message:"You can't edit an user that is not you"}],
      data : []
    });
  }
}

function destroy(req, res, next) {
  if(req.user.id == req.body.id){
    User.remove({_id: req.body.id})
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
  } else {
    res.status(500).json({
      errors:[{message:"You can't edit an user that is not you"}],
      data : []
    });
  }
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  blank
}
