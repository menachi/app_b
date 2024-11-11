const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;

const postsRoutes = require("./routes/posts_routes");
app.use("/posts", postsRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
