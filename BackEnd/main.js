const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const bookRouter = require("./Routes/BooksRoutes");
const authorRouter = require("./Routes/AuthorsRoutes");
const userRouter = require("./Routes/UsersRoutes");
// const user_bookRouter = require("./Routes/Users_BooksRoutes");
const cors = require("cors");

// middlewares
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());//recieve data mn client
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//specify the base URL for each router.
app.use("/api/book", bookRouter);
app.use("/api/author", authorRouter);
app.use("/api/user", userRouter);
// app.use("/api/user", user_bookRouter);

//start server
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});