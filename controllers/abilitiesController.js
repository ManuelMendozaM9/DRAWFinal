const express = require('express');

function index(req, res, next) {
  res.render('abilities/index', {
    baseUrl: req.baseUrl,
    title: 'Abilities',
    description: 'Muestran todas las habilidades.'
  });
}

function create(req, res, next) {
  res.render('abilities/new', {
    baseUrl: req.baseUrl,
    title: 'New ability',
    description: 'Vista para crear una nueva habilidad.'
  });
}

function show(req, res, next) {
  res.send('Muestra una habilidad.');
}

function update(req, res, next) {
  res.send('Edita una habilidad.');
}

function destroy(req, res, next) {
  res.send('Elimina una habilidad.');
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy
}
