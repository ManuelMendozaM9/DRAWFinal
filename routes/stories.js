var express = require('express');
var router = express.Router();
const storiesController = require('../controllers/storiesController');
const authCheck = require('../config/authCheck');

router.get('/', authCheck, storiesController.index);
router.get('/new', authCheck, storiesController.create);

module.exports = router;
