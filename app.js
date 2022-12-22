const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const routes = require("./routes/routes");

require("dotenv").config();
app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
