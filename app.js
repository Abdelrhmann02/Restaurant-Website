const express = require('express');
const { route } = require('express/lib/application');
const mustache = require('mustache-express');
const path = require('path');
const router = require('./routes/RestaurantRoutes');
const public = path.join(__dirname,'public');
const app = express();
const PORT = process.env.PORT || 3000;
const views_path = path.join (__dirname,'/views');

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.engine('mustache', mustache(views_path + '/partials'));
app.set('view engine', 'mustache');

app.use('/', router);

app.listen(PORT, () => {
    console.log(`app started at port ${PORT}`);
})