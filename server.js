const app = require("./src/index");
require("dotenv").config();

const connect = require("./src/configs/db");
let port = process.env.Port || 7000;
app.listen(port, () => {
  connect();
  console.log("listing port " + port);
});
