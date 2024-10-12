// Load .env data into process.env
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const aiRoutes = require("./routes/aiRoute");
const wpaPaystationRoutes = require("./routes/wpaPaystation");
const googleApiRoutes = require("./routes/googleRoute");
const userDataRoutes = require("./routes/userDataRoute");
const userParkingRoutes = require("./routes/userParkingRoute");
const getAuthService = require("./services/authService");
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const app = express();
const mongoose = require("mongoose");

// app.use(
//   cors({
//     origin: ["http://localhost:3000","https://smartpark-react.vercel.app/"],
//     credentials: true,
//     exposedHeaders: ["Set-Cookie", "Date", "ETag"],
//     content: "application/json",

//     access-control-allow-orign: "*",
//     access-control-allow-methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",

//   })
// );

app.use(
  cors({
    origin: ["http://localhost:3000", "https://smartpark-react.vercel.app"],
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
    methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// var allowedOrigins = [
//   "http://localhost:3000",
//   "https://smartpark-react.vercel.app",
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );
//app.options('*', cors());

// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

// const handler = (req, res) => {
//   const d = new Date();
//   res.end(d.toString());
// };

// module.exports = allowCors(handler);

// Middleware setup
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public"));

// auth0 authorization
// const getCheckJwt = async (req, res, next) => {
//   const getToken = req.headers.authorization?.split(' ')[1];
//   if (!getToken) {
//   return res.status(401).send('Access denied.');
//   };

//   console.log("I got to getCheckJwt...");

//   try {
//     const decodedToken = await getAuthService.getVerifyToken(getToken);

//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     res.status(401).send(error);
//   }
// };
const getCheckJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: `${process.env.AUTH0_AUD}`,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

// Swagger Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Parking Space Finder",
      version: "1.0.0",
      description:
        "A web API with Swagger documentation for the parking space finder application",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server(local)",
      },
      {
        url: "https://parking-space-finder-backend.vercel.app",
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to API documentation
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes setup
app.get("/", (req, res) => {
  res.status(200).send("Welcome to root URL of Server");
});

app.get("/index", (req, res) => {
  res.status(200).render("index");
});

app.use("/api", aiRoutes);
app.use("/api", wpaPaystationRoutes);
// app.use("/api", getCheckJwt, wpaPaystationRoutes);
app.use("/api", googleApiRoutes);
app.use("/api", userDataRoutes);
app.use("/api", userParkingRoutes);

// Server listening on a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      `Server is Successfully Running, and App is listening on port ${PORT}`
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
module.exports = app;
