const express = require('express');

function index(req, res, next) {
  res.render('users/index', {
    baseUrl: req.baseUrl,
    title: 'Users',
    description: 'Muestra todos los usuarios.'
  });
}

function create(req, res, next) {
  res.render('users/new', {
    baseUrl: req.baseUrl,
    title: 'New user',
    description: 'Vista para crear un nuevo usuario.'
  });
}

function show(req, res, next) {
  res.render('users/show', {
    baseUrl: req.baseUrl,
    title: 'Chito',
    description: 'Clase de DRAW'
  });
}

function update(req, res, next) {
  res.send('Edita un usuario.');
}

function destroy(req, res, next) {
  res.send('Elimina un usuario.');
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy
}
