const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const toJson = require('@meanie/mongoose-to-json');
const { mongoURL } = require("./configs");

//_id to id and delete _v...
mongoose.plugin(toJson);

const noteRoutes = require('./routers/notes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/note", noteRoutes);

async function start() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();