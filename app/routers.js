const express = require('express');

const mainController = require('./controlllers/mainController');

const router = express.Router();

router.get('/', mainController.homePage);
//List
router.get('/lists', mainController.getLists);
router.get('/lists/:id', mainController.getOneList);
router.post('/lists', mainController.createList);
router.patch('/lists/:id', mainController.modifyList);
router.delete('/lists/:id', mainController.removeList);







module.exports = router;