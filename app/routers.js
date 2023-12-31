const express = require('express');

const mainController = require('./controlllers/mainController');
const cardController = require('./controlllers/cardController');
const tagController = require('./controlllers/tagController');

const router = express.Router();

router.get('/', mainController.homePage);
//List
router.get('/lists', mainController.getLists);
router.get('/lists/:id', mainController.getOneList);
router.post('/lists', mainController.createList);
router.patch('/lists/:id', mainController.modifyList);
router.put('/lists/:id?', mainController.createOrModify);
router.delete('/lists/:id', mainController.removeList);

//Card
router.get('/lists/:id/cards', cardController.getCardInList);
router.get('/cards', cardController.getCards);
router.get('/cards/:id', cardController.getOneCard);
router.post('/cards', cardController.createCard);
router.patch('/cards/:id', cardController.modifyCard);
router.put('/cards/:id?', cardController.createOrModify);
router.delete('/cards/:id', cardController.removeCard);

//Tag
router.get('/tags', tagController.getTags);
router.get('/tags/:id', tagController.getOneTag);
router.post('/tags', tagController.createTag);
router.patch('/tags/:id', tagController.modifyTag);
router.put('/tags/:id?', tagController.createOrModify);
router.delete('/tags/:id', tagController.removeTag);
router.post('/cards/:id/tags', tagController.associateTagToCard);
router.delete('/cards/:cardId/tags/:tagId', tagController.removeTagFromCard);




module.exports = router;