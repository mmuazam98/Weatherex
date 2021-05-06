$(".search-form").keyup((e) => {
  let len = $(".input").val().length;
  if (len > 0) {
    if (e.which === 13) {
      $(".search-form").submit();
    }
  }
});
$(".btn").click(() => {
  let len = $(".input").val().length;
  if (len > 0) $(".search-form").submit();
});
