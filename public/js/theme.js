if (window.localStorage.theme == "light") {
  $("body").attr("class", "light");
  window.localStorage.theme = "light";
} else {
  $("body").attr("class", "dark");
  window.localStorage.theme = "dark";
}
let lists = $(".list");
list.forEach((elements, index) => {
  let id = elements.dataset.id;
  elements.classList = "list";
  if (id == page) elements.classList.add("active");
  if (page == "result" && id == "search") elements.classList.add("active");
});
