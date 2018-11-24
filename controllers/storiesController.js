const express = require('express');
const Story = require('../models/story');
const {validationResult} = require('express-validator/check');

function index(req, res, next) {
  res.render('stories/index', {
    baseUrl: req.baseUrl,
    currentUser: req.user,
    title: 'Stories',
    description: 'Muestra todas las historias.'
  });
}

function create(req, res, next) {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({
      errors:errors.array()
    });
  }

  let story = new Story({
    _product_owner_id: '5bf767aa27a25e5777df63b4',
    _project_id: req.params.id,
    _narrative: req.body.narrative,
    _state: req.body.state,
    _priority: req.body.priority,
    _size: req.body.size,
    _how: req.body.how,
    _i_want: req.body.i_want,
    _so_that: req.body.so_that,
    _criteria: req.body.criteria,
    _since: req.body.since,
    _when: req.body.when,
    _so: req.body.so
  });

  story.save()
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

function show(req, res, next) {
  res.send('Muestra una historia.');
}

function update(req, res, next) {
  Story.findById(req.params.ids)
  .then( obj =>{
    obj.product_owner_id = req.body.product_owner_id? req.body.product_owner_id : obj.product_owner_id;
    obj.project_id = obj.project_id;
    obj.narrative = req.body.narrative? req.body.narrative : obj.narrative;
    obj.state = req.body.state? req.body.state : obj.state;
    obj.priority = req.body.priority? req.body.priority : obj.priority;
    obj.how = req.body.how? req.body.how : obj.how;
    obj.i_want = req.body.i_want? req.body.i_want : obj.i_want;
    obj.so_that = req.body.so_that? req.body.so_that : obj.so_that;
    obj.criteria = req.body.criteria? req.body.criteria : obj.criteria;
    obj.since = req.body.since? req.body.since : obj.since;
    obj.when = req.body.when? req.body.when : obj.when;
    obj.so = req.body.so? req.body.so : obj.so;
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
  Story.remove({_id: req.params.ids})
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
  destroy
}
