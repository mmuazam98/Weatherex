if (window.localStorage.theme == "light") {
  $("body").attr("class", "light");
  window.localStorage.theme = "light";
} else {
  $("body").attr("class", "dark");
  window.localStorage.theme = "dark";
}
