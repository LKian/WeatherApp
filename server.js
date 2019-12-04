// check environment to make sure I'm not in production
if (process.env.NODE_ENV !== "production") {
  // require .env library that is loaded in for development.  config loads in everything inside of .env (contains api key)
  require("dotenv").config();
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// setup server
const express = require("express");

// setup app which calls express fx
const app = express();

// set up what app should use - JSON
app.use(express.json());

// set up static folder
app.use(express.static("public"));

// api only has a single endpoint
app.post("/weather", (req, res) => {});
app.listen(3000, () => {
  console.log("Server started!");
});
