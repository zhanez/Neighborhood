$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user").then(data => {
    $("#emailUser").text("Email:" + data.email);
    $("#idUser").text("ID:" + data.id);
  });
});
