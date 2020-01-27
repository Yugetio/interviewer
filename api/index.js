const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session)
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const toJson = require('@meanie/mongoose-to-json');
const dotenv = require('dotenv');

dotenv.config();

//_id to id and delete _v...
mongoose.plugin(toJson);

const noteRoutes = require('./routers/notes.router');
const categoryRoutes = require('./routers/categories.router');
const userRouters = require('./routers/user.router');

const middleware = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const store = new MongoStore({
  collection: 'sessions',
  uri: process.env.MONGODB_URL,
  expires: 3600000 * 3
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 3600000, 
    store
  })
);

app.use('/auth', userRouters);
app.use('/note', noteRoutes);
app.use('/category', categoryRoutes);

// If that above routes didn't work, we get 404 and forward to error handler
app.use(middleware.routeNotFound);

app.use(middleware.dbValidationErrors);

if (process.env.ENV === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(middleware.developmentErrors);
}

// production error handler
app.use(middleware.productionErrors);

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    mongoose.Promise = global.Promise;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
