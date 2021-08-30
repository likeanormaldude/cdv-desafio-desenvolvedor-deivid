require("dotenv/config");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const stock = require("./stock");

const host = process.env.API_HOST || "localhost";
const port = process.env.API_PORT || "4500";

const app = express();

app.use(cors());

// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: `http://${host}:${port}`,
//     changeOrigin: true,
//   })
// );

app.get("/fetch", async (req, res) => {
  const params = req.query;
  const result = await stock.getStock(params);
  return res.json({
    precoUltPregao: result,
  });
});

console.log(`API ready! Listening requests on http://${host}:${port}`);

app.listen(port);
