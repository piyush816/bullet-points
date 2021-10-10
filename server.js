// modules
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// routers
const bookRouter = require("./routers/bookRouter");

const PORT = process.env.PORT || 8000;
const app = express();

// database connection

mongoose
  .connect("mongodb://localhost/bulletpoints")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

// static middleware
app.use("/media", express.static(path.join(__dirname, "uploads")));

// form data and json
app.use(express.json());

// router middlewares
app.use("/api/book", bookRouter);

app.listen(PORT, () =>
  console.log(`Server is running on http://127.0.0.1:${PORT}`)
);
