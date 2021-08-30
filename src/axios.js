import axios from "axios";

const host = process.env.API_HOST || "localhost";
const port = process.env.API_PORT || "4500";

const instance = axios.create({
  baseURL: `http://${host}:${port}`,
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default instance;
