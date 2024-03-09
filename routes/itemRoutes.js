const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const itemController = require('../controllers/itemController');
const crudController = require('../controllers/crudController')

router.route("/:userId/items")
  .get(authController.protect, itemController.getUserItems)
  .post(authController.protect, crudController.createItem);

router.route("/:userId/items/:itemId")
  .patch(authController.protect, crudController.updateItem)
  .delete(authController.protect, crudController.deleteItem);

module.exports = router;