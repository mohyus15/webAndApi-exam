const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const NODE_ENV = "production";


//manger roles
const newsRouter = require('./routers/newsRouter.js');
const userRouters = require('./routers/userRouters.js');
const MessageRoute = require('./routers/MessageRoute.js');


const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use("/api/news", newsRouter);
app.use("/api/users", userRouters);
app.use('/api/message', MessageRoute)

  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', "public", "index.html"));
  });

  app.get("/", (req, res) => {
    res.send("Api is running");
  });


module.exports = app;