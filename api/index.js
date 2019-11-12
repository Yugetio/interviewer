const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { mongoURL } = require("./configs");

const noteRoutes = require('./routers/notes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/notes", noteRoutes);

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