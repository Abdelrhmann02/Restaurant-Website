const express = require('express');
const router = express.Router();
const controller = require('../controllers/RestaurantController')

router.get("/",controller.home_page);
router.get("/about",controller.about);
router.get("/menu",controller.menu);
module.exports = router;