const req = require('express/lib/request');
const Menu = require('../models/RestaurantModel');
const RestaurantDB = require('../models/RestaurantModel');
const MenuDB = new RestaurantDB('menu.db');
const UserDB = require('../models/UserModel');


exports.home_page = function(req,res) {
    res.locals.title = "Homepage";
    res.locals.class_type ="main_nav";
    res.render('index');
}

exports.about = function(req,res){
    res.locals.title = "About Us";
    res.locals.class_type ="main_nav_bar";
    res.render('about_us');
}

exports.admin = function(req,res){
  res.locals.title = "Admin";
  res.locals.class_type ="main_nav";
  res.render('user/admin');
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

exports.show_delete = function(req,res){
  res.locals.title = "Delete Meals";
  MenuDB.GetAll().then((items)=> {
    res.render('delete', {'Meals': items})
  }
  )
}

exports.post_delete = function(req,res){
  const Meals = req.body.Meal;
  for (var i = 0; i < Meals.length; i++) {
    MenuDB.Delete(Meals[i]);
  }
  res.redirect('/admin_panel')
  };
  
exports.admin_menu = async(req,res) => {
  res.locals.title = "Menu Items";
  const [lunch,dinner] = await Promise.all([
    MenuDB.GetAllLunch(),
    MenuDB.GetAllDinner()
  ]);

  res.render("admin_menu", { lunch, dinner});
}

exports.show_register_page = function(req,res){
  res.locals.title ="Register Page";
  res.render('user/register');
}

exports.add_new_user = function(req,res)
{
  const user = req.body.username;
  const password = req.body.password;

  if(!user || !password){
    res.send(401, 'no user or no password')
    return;
  }
  UserDB.lookup(user,function(err,u){
    if(u){
      res.send(401, "User exist: ",user);
      return;
    }
    UserDB.create(user,password);
    res.redirect("/admin_panel"); //to be modifed later
  });
}

exports.show_login_page = function(req,res){
  res.render('user/login');
}

exports.handle_login = function (req,res){
  res.redirect('/admin_panel')
}

exports.admin_panel = function(req,res){
  res.locals.title = "Admin Panel";
  res.render('admin_panel',{
    'user': req.user
  })
}

exports.logout = function(req,res){
  res.clearCookie("jwt").status(200).redirect('/admin')
}

exports.show_add_new = function(req,res){
    res.locals.title="Add New Meal";
    res.render('add_new');
}

exports.post_add_new = function(req,res){
  MenuDB.addEntry(req.body.Name,req.body.Description,req.body.Ingredients,req.body.Allergy,req.body.Category,req.body.Availability,req.body.Price);
  res.redirect('/admin_panel')
}

