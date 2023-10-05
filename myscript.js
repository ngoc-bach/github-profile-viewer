$(document).ready(function () {
  $("article").hide();

  function handleSearch() {
    $("article").fadeIn();
    let username = $("input").val();
    let URL = `https://api.github.com/users/${username}`;
    $.get(URL, function (data) {
      $("#avatar").attr("src", `${data.avatar_url}`);
      $("#name").text(data.name);
      $("#username").text(data.login);
      data.bio ? $("#bio").text(`" ${data.bio} "`) : $("bio").hide();
      $("#github").text(data.html_url);
      $("#github-link").attr("href", `${data.html_url}`);
      $("#followers").text(data.followers + " followers" + ".");
      $("#following").text(data.following + " following");
      data.location
        ? $("#location").text(data.location)
        : $(".location").hide();
      data.company ? $("#company").text(data.company) : $(".company").hide();
      data.email ? $("#email").text(data.email) : $(".email").hide();
    }).fail(function () {
      alert("GitHub username is not valid!");
    });
    $("input").val("");
  }

  // Keypress event
  $("input").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      event.preventDefault();
      handleSearch();
    }
  });

  // On click event
  $("button").click(function () {
    handleSearch();
  });
});
