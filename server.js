const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
<<<<<<< HEAD
const config = require("config");
=======
//const config = require("config");
>>>>>>> e2502ef2927e6335500ce8fa90d2493465365443
const db = require("./Config/Keys");

// const items = ;

const app = express();

/////Body parser

app.use(bodyParser.json());

//DB Config
//const db = config.get("mongoURI");

// connect to mongo

mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo DB connected ..."))
  .catch(err => console.log("err"));

//use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

///Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.Port || 4000;

app.listen(port, () => console.log(`server started on port ${port}`));
