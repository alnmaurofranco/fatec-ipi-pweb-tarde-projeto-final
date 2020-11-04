require("dotenv").config({ path: "./src/config/.env" });
require("./app/database/connect");
const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const app = express();

const routes = require("./app/routes");

if (process.env.NODE_ENV === "development") app.use(volleyball);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(routes);

var port = process.env.PORT || "3333";
app.set("port", port);

app.listen(port, () => {
  console.log(
    `[nodemon] Servidor on-line em http://localhost:${port} no modo de ${process.env.NODE_ENV}`
  );
});

module.exports = app;
