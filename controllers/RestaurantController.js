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

/*exports.menu = function(req,res){
    res.locals.title = "Menu";
    res.locals.class_type ="main_nav";
    MenuDB.GetAvailableLunch().then((list) => {
            res.render('menu', {
                'lunch': list
            });
            console.log('Promise Resolved');
        })
        .catch((err) =>{
            console.log('Promise rejected', err);
        })
}
*/
exports.not_found = function(req,res){
    res.status(404);
    res.render('notfound');
}