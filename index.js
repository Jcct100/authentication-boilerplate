const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://<username>:<password>.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === "test") {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      console.log("we are connected");
    })
    .catch(err => console.log(err));
} else {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      console.log("we are connected");
    })
    .catch(err => console.log(err));
}

mongoose.set("useCreateIndex", true);

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

//routes
app.use("/users", require("./routes/users"));

app.use(function(err, req, res, next) {
  console.log("next");
  res.send({ error: err.message });
});

//start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server listening at ${port}`);

module.exports = app;
