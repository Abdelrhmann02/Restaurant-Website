const req = require('express/lib/request');
const Menu = require('../models/RestaurantModel');
const RestaurantDB = require('../models/RestaurantModel');
const MenuDB = new RestaurantDB('menu.db');
const UserDB = require('../models/UserModel');

//Main Website Homepage
exports.home_page = function(req,res) {
    res.locals.title = "Homepage";
    res.locals.class_type ="main_nav";
    res.render('index');
}

//Main Website AboutUs
exports.about = function(req,res){
    res.locals.title = "About Us";
    res.locals.class_type ="main_nav_bar";
    res.render('about_us');
}

//Main Website Menu
exports.menu = async (req, res) => {
  res.locals.title = "Menu";
  res.locals.class_type ="main_nav";
  const [lunch,dinner] = await Promise.all([
    MenuDB.GetAvailableLunch(),
    MenuDB.GetAvailableDinner()
  ]);

  res.render("menu", { lunch, dinner});
};

//Admin Login
exports.show_login_page = function(req,res){
  res.locals.title="Login"
  res.render('user/login');
}

//Handle Admin Login
exports.handle_login = function (req,res){
  res.redirect('/admin_panel')
}

//Show Admin Panel
exports.admin_panel = function(req,res){
  res.locals.title = "Admin Panel";
  res.render('user/admin_panel',{
    'user': req.user
  })
}

//Show Add New Meal Page
exports.show_add_new = function(req,res){
  res.locals.title="Add New Meal";
  res.render('user/add_new');
}

//Handle Add New Meal Page
exports.post_add_new = function(req,res){
 
  //to check if meal exists by its name
  MenuDB.lookup(req.body.Name,function(err,u){
    if(u){
      return res.status(401).render('errors/MealExist',{'name': req.body.Name});
    }
    MenuDB.addEntry(req.body.Name,req.body.Description,req.body.Ingredients,req.body.Allergy,req.body.Category,req.body.Availability,req.body.Price);
    res.redirect("/admin_panel"); 
  });
}

//Show Delete Meal Page
exports.show_delete = function(req,res){
  res.locals.title = "Delete Meals";
  MenuDB.GetAll().then((items)=> {
    res.render('user/delete', {'Meals': items})
  }
  )
}

//Handle Delete Meal Page
exports.post_delete = function(req,res){
  const Meals = req.body.Meal;
  for (var i = 0; i < Meals.length; i++) {
    MenuDB.Delete(Meals[i]);
  }
  res.redirect('/admin_panel')
  };
  
//Show Admin Menu
exports.admin_menu = async(req,res) => {
  res.locals.title = "Menu Items";
  const [lunch,dinner] = await Promise.all([
    MenuDB.GetAllLunch(),
    MenuDB.GetAllDinner()
  ]);

  res.render("user/admin_menu", { lunch, dinner});
}

//Show Update Meals Page
exports.show_update_page = function(req,res){
  res.locals.title = "Update Meals";
  MenuDB.GetAll().then((items)=> {
    res.render('user/update', {'Meals': items})
  }
  )
}

//Show specific meal to edit page
exports.edit_meal = async(req,res)=>{
  res.locals.title ="Edit Meal"
  const id = req.params.id;
  const [item] = await Promise.all([
    MenuDB.search(id)
  ]);

  //to check if it's dinner or lunch meal
  if(item[0].Category == "Dinner")
    res.locals.dinner=true;
  else if(item[0].Category == "Lunch")
    res.locals.lunch=true;

  res.render('user/edit_meal', {'Meal_To_Update': item});
}

//Handle Editing meals
exports.post_edit_meal = function(req,res){
  MenuDB.UpdateEntry(req.params.id,req.body.Name,req.body.Description,req.body.Ingredients,req.body.Allergy,req.body.Category,req.body.Availability,req.body.Price);
  res.redirect('/admin_panel')
};


//Show Add New User Page
exports.show_register_page = function(req,res){
  res.locals.title ="Register Page";
  res.render('user/register');
}

//Handle Add New User Page
exports.add_new_user = function(req,res)
{
  const user = req.body.username;
  const password = req.body.password;

  UserDB.lookup(user,function(err,u){
    if(u){
      return res.status(401).render("errors/UserExist", {'user': user});
    }
    UserDB.create(user,password);
    res.redirect("/admin_panel"); 
  });
}

//Handle Logout
exports.logout = function(req,res){
  res.clearCookie("jwt").status(200).redirect('/admin')
}


