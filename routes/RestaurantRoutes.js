const express = require('express');
const router = express.Router();
const controller = require('../controllers/RestaurantController')
const {login} =require('../auth/auth')
const {verify} = require('../auth/auth')

router.get("/",controller.home_page);
router.get("/about",controller.about);
router.get("/menu",controller.menu);

router.get('/register',verify,controller.show_register_page);
router.post('/register',verify,controller.add_new_user);

router.get('/admin',controller.show_login_page);
router.post('/login',login,controller.handle_login);

router.get('/admin-panel',verify,controller.admin_panel)
router.get('/logout',verify,controller.logout)

router.get('/add_new',verify,controller.show_add_new)
router.post('/add_new',verify,controller.post_add_new)

router.get('/delete',controller.show_delete)
router.post('/delete',controller.post_delete)
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