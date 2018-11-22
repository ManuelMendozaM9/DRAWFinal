const express = require('express');

function index(req, res, next) {
  res.render('stories/index', {
    baseUrl: req.baseUrl,
    title: 'Stories',
    description: 'Muestra todas las historias.'
  });
}

function create(req, res, next) {
  res.render('stories/new', {
    baseUrl: req.baseUrl,
    title: 'New story',
    description: 'Vista para crear una nueva historia.'
  });
}

function show(req, res, next) {
  res.send('Muestra una historia.');
}

function update(req, res, next) {
  res.send('Edita una historia.');
}

function destroy(req, res, next) {
  res.send('Elimina una historia.');
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy
}
