const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const request = require("request");

app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.render("index", { page: "index" });
});

app.get("/search", (req, res) => {
  res.render("search", { page: "search" });
});
app.get("/about", (req, res) => {
  res.render("about", { page: "about" });
});
app.get("/settings", (req, res) => {
  res.render("settings", { page: "settings" });
});
app.post("/search", (req, res) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    qs: { q: `${req.body.query}`, days: "3" },
    headers: {
      "x-rapidapi-key": "55e00f5629msha9991ea81532a93p18a9e0jsnc0f29c202338",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      useQueryString: true,
    },
  };
  request(options, function get_data(error, response, body) {
    let result = JSON.parse(body);

    if (typeof result.error == "undefined") {
      res.render("result", { page: "result", result: result });
    } else {
      let err = result.error.message;
      res.render("search", { page: "search", message: err });
      res.end();
    }
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
