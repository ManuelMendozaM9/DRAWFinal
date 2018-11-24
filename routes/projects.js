var express = require('express');
var router = express.Router();
const projectsController = require('../controllers/projectsController');
const storiesController = require('../controllers/storiesController');
const authCheck = require('../config/authCheck');


router.get('/:page?', authCheck, projectsController.index);
router.get('/show/:id', authCheck, projectsController.show);
router.get('/new', authCheck, projectsController.blank);
router.post('/new', authCheck, projectsController.create);
router.put('/edit/:id', authCheck, projectsController.update);
router.delete('/delete/:id', authCheck, projectsController.destroy);

router.post('/:id/story/new', authCheck, storiesController.create);
router.put('/:id/story/edit/:ids', authCheck, storiesController.update);
router.delete('/:id/story/delete/:ids', authCheck, storiesController.destroy);

module.exports = router;
