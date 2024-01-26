const mongoose = require("mongoose");

async function dbConnect() {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
    }
  );
  const database = mongoose.connection;
  database.on("error", console.error.bind(console, "Connection Error"));
  database.once("open", () => {
    console.log("Database Connected");
    return database;
  });
}

module.exports = { dbConnect };