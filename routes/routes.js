const Router = require("express").Router();
const request = require("request");

Router.get("/", (req, res) => {
  // console.log(req);
  res.render("index", { page: "index" });
});

Router.get("/search", (req, res) => {
  res.render("search", { page: "search" });
});
Router.get("/about", (req, res) => {
  res.render("about", { page: "about" });
});
Router.get("/settings", (req, res) => {
  res.render("settings", { page: "settings" });
});
Router.post("/search", (req, res) => {
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
module.exports = Router;
