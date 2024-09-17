// load .env data into process.env
require('dotenv').config();
//const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');

const app = express();
//const PORT = 3000;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Parking Space Finder',
            version: '1.0.0',
            description: 'A web API with Swagger documentation for the parking space finder application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./api/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});
app.get('/index', (req, res) => {
    res.status(200);
    res.render('index');
});


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);
