const express = require('express');

function index(req, res, next) {
  res.render('projects/index', {
    baseUrl: req.baseUrl,
    title: 'Projects',
    description: 'Muestran todos los proyectos.'
  });
}

function create(req, res, next) {
  res.render('projects/new', {
    baseUrl: req.baseUrl,
    title: 'New project',
    description: 'Vista para crear un nuevo proyecto.'
  });
}

function show(req, res, next) {
  res.send('Muestra un proyecto.');
}

function update(req, res, next) {
  res.send('Edita un proyecto.');
}

function destroy(req, res, next) {
  res.send('Elimina un proyecto.');
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy
}
