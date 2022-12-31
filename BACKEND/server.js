const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const connectDatabase = require("./config/database");

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);

  process.exit(1);
});

//config

//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server working on port ${process.env.PORT}`);
});

//? Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
