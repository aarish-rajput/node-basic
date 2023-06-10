require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Location = require("./models");
const route = express.Router();
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");
  } catch {
    console.log("error");
  }
}

connect();

app.get("/", async (req, res) => {
  res.json({ message: "working" });
});

app.post("/postLoc", async (req, res) => {
  const location = new Location({
    lat: req.body.lat,
    lng: req.body.lng,
  });

  const saveLoc = await location.save();
  res.json(saveLoc);
});

app.get("/getLoc", (req, res) => {
  Location.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
