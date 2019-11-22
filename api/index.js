const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const dotenv = require('dotenv');

dotenv.config();

//_id to id and delete _v...
mongoose.plugin(toJson);

const noteRoutes = require('./routers/notes.router');
const categoryRoutes = require('./routers/categories.router');
const middleware = require('./middleware/errorHandlers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/note', noteRoutes);
app.use('/category', categoryRoutes);

// If that above routes didn't work, we get 404 and forward to error handler
app.use(middleware.routeNotFound);

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
