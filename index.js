require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DATABASE_URL = process.env.CONNECTION_URL;

// mongoose.connect(DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Client = new mongoose.model("Client", userSchema);

app.post("/register", async (req, res) => {
  const user = req.body;
  const newUser = new Client(user);
  //   const newUser = new Client({
  //     name: req.body,
  //     email: req.body,
  //     password: req.body
  //   });
  await newUser
    .save()
    .then(function (user) {
      res.json(user);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/getUsers", function (req, res) {
  Client.find({})
    .then(function (users) {
      res.json(users);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(3001, () => {
  console.log("Server is running at port number 3001");
});
