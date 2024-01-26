const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const indexRoute = require("./routes/index");
const { dbConnect } = require("./utils/dbConnect");

// Connecting to Database
dbConnect();
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/", indexRoute.route);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port: ${process.env.PORT}`);
});
