const express = require('express');
const router = express.Router();
const controller = require('../controllers/RestaurantController')

router.get("/",controller.home_page);
router.get("/about",controller.about);
router.get("/menu",controller.menu);


//handle 404 requests
router.use(function(req,res) {
    res.status(404);
    res.render('notfound');
})

router.use(function(err,req,res,next){
    res.status(500);
    res.render("InternalError");
})
module.exports = router;