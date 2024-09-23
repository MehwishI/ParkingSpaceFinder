// Load .env data into process.env
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const aiRoutes = require('./routes/aiRoute');
const cors = require('cors');

const app = express();

app.use(cors());

// Middleware setup
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(express.static('public'));

// Swagger Setup
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
    apis: ['./routes/*.js'],  // Path to API documentation
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes setup
app.get('/', (req, res) => {
    res.status(200).send("Welcome to root URL of Server");
});

app.get('/index', (req, res) => {
    res.status(200).render('index');
});

app.use('/api', aiRoutes);

// Server listening on a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
    } else {
        console.log('Error occurred, server can\'t start', error);
    }
});