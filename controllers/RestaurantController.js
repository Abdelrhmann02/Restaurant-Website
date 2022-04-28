const RestaurantDB = require('../models/RestaurantModel');
const MenuDB = new RestaurantDB('menu.db');

exports.home_page = function(req,res) {
    res.locals.title = "Homepage";
    res.locals.class_type ="main_nav";
    res.render('index');
}

exports.about = function(req,res){
    res.locals.title = "About Us";
    res.locals.class_type ="main_nav_bar";
    res.render('about-us');
}

exports.menu = async (req, res) => {
    res.locals.title = "Menu";
    res.locals.class_type ="main_nav";
    const [lunch,dinner] = await Promise.all([
      MenuDB.GetAvailableLunch(),
      MenuDB.GetAvailableDinner()
    ]);
  
    res.render("menu", { lunch, dinner});
  };
