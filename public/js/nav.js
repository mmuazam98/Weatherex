let list = document.querySelectorAll(".list");
// for (let i = 0; i < list.length; i++) {
// list[i].onclick = () => {
//   let j = 0;
//   while (j < list.length) {
//     list[j++].className = "list";
//   }
//   list[i].className = "list active";
// };
// }
// let lists = $(".list");
list.forEach((elements, index) => {
  let id = elements.dataset.id;
  elements.classList = "list";
  if (id == page) elements.classList.add("active");
  if (page == "result" && id == "search") elements.classList.add("active");
});
