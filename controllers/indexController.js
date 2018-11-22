const express = require('express');

function index(req, res, next) {
  res.render('index', {
    baseUrl: req.baseUrl,
    title: 'Scrum Project',
    description: 'Proyecto de Scrum para clase de DRAW'
  });
}

function login(req, res, next) {
  res.render('login', {
    baseUrl: req.baseUrl,
    title: 'Scrum Project',
    description: 'Proyecto de Scrum para clase de DRAW'
  });
}

module.exports = {
  index,
  login
}
