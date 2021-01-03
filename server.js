const express = require("express");
const cors = require("cors");
const knex = require("knex");

const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const imageUrl = require("./controllers/imageUrl");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// API endpoints
app.get("/", (req, res) => {
  res.json("It is running");
});
app.post("/signin", signIn.handleSignIn(db));
app.post("/register", register.handleRegister(db));
app.get("/profile/:id", profile.handleProfile(db));
app.put("/image", image.handleImage(db));
app.post("/imageUrl", imageUrl.handleFaceDetection());

app.listen(PORT, () => {
  console.log("App is running on port ${PORT}");
});
