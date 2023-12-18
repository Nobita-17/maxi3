const http = require('http');   //importing HTTP module 
const path = require('path');    //importing Path 

const express = require('express');     //importing expresssjs 
const bodyParser = require('body-parser');     

const errorController = require('./controllers/error');   //importing controllers from project 

const app = express();    //storing in express variable 

app.set('view engine', 'ejs');   //setting view engine which is template engine 
app.set('views', 'views');     //saying my views is in my views folder 

const adminRoutes = require('./routes/admin');    //importing admin folder 
const shopRoutes = require('./routes/shop');      //importing shop folder 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));    //getting Path 

app.use('/admin', adminRoutes);   //the url will begin from /admin.then something 
app.use(shopRoutes);

app.use(errorController.get404);   //basicall acessign the get404 property of this module 

app.listen(3000);
