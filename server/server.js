// load .env data into process.env
require('dotenv').config();
//const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');

const app = express();
//const PORT = 3000;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});
app.get('/index', (req, res)=>{
    res.status(200);
    res.render("index");
});


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
