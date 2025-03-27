const express = require("express");
const app = express();
require("dotenv").config();
require("./Models/db");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const bodyparser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on`, PORT);
});
app.use(bodyparser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/product", ProductRouter);
