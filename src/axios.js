import axios from "axios";

const host = process.env.API_HOST || "localhost";
const port = process.env.API_PORT || "4500";

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const URL = `http://${host}:${port}`;

const instance = axios.create({
  baseURL: `http://${host}:${port}`,
  method: "post",
  url: PROXY_URL + URL,
});

export default instance;
