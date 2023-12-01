const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Sutting Down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// dotenv.config({ path: './config.env' })
dotenv.config();
const app = require("./app");

// const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASS);
const DB = process.env.LOCAL_DATABASE;

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // // useCreateIndex: true,
    // // useFindAndModify: false,
    // useUnifiedTopology: true
  })
  .then(() => console.log("Database connection successful"));

const port = process.env.PORT || 5000;
// create http server
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Sutting Down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
