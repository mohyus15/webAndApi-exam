const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const NODE_ENV = "production";


//manger roles
const productRouter = require("./routers/productRouter.js");
const userRouters = require("./routers/userRouters.js");


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

app.use(bodyParser.json());


app.use("/api/products", productRouter);
app.use("/api/users", userRouters);
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

module.exports = app;
