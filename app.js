const express = require('express');
const { route } = require('express/lib/application');
const mustache = require('mustache-express');
const path = require('path');
const router = require('./routes/RestaurantRoutes');
const public = path.join(__dirname,'public');
const app = express();
const PORT = process.env.PORT || 3000;
const views_path = path.join (__dirname,'/views');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.engine('mustache', mustache(views_path + '/partials'));
app.set('view engine', 'mustache');

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Express started in ` + `${app.get('env')} mode at http://localhost:${PORT}` + `; press ctrl-c to terminate.`)
})