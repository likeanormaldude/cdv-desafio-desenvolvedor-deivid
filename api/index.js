require("dotenv/config");
const express = require("express");
const app = express();
const stock = require("./stock");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.get("/fetch", async (req, res) => {
  const params = req.query;
  const result = await stock.getStock(params);
  return res.json(result);
});

console.log(`Listening requests on http://${host}:${port}`);

app.listen(port);
