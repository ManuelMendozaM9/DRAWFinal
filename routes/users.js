var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const authCheck = require('../config/authCheck');

router.get('/:page?', authCheck, usersController.index);
router.get('/show/:id', authCheck, usersController.show);
router.get('/new', authCheck, usersController.blank);
router.post('/new', authCheck, usersController.create);
router.put('/edit/:id', authCheck, usersController.update);
router.delete('/delete', authCheck, usersController.destroy);

module.exports = router;
