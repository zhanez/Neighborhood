$(document).ready(() => {
  const addCategory = $("#addCategory");
  const categoryInput = $("#categoryInput");
  const categoryList = $("#categoryList");

  const userGroups = $("#userGroups");

  // Get user information to dispplay on the profile page.
  $.get("/api/user").then(data => {
    $("#emailUser").text("Email: " + data.email);
    $("#idUser").text("ID: " + data.id);
    // $("#nameUser").text(data.first_name + " " + data.last_name);
    // $("#bioUser").text("Bio: " + data.bio);
    //phone number
  });

  //Add category to list of categories
  addCategory.on("click", event => {
    event.preventDefault();
    if (!categoryInput.val().trim()) {
      return;
    }
    const newCategory= {
      name: categoryInput.val().trim()
    };
    console.log(newCategory.name);

    insertNewCategory(newCategory.name);
  });

  function insertNewCategory(name) {
    console.log(name);
    $.post("/api/category", {
      name: name
    })
      .then(getCategoryID);
  }

  function getCategoryID() {
  //Create new cateogry button  
  $.get("/api/category", (data) => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
    let categoryButton = $('<button>').addClass('categoryButton btn btn-outline-success btn-lg').attr('data-id', data[i].id).text(data[i].name).attr('type', 'button');
    categoryList.prepend(categoryButton);
  }

//update user's category ID
$('.categoryButton').click( event => {
  event.preventDefault();

  let buttonID = $(this).attr('data-id');
  console.log(buttonID);

// $.ajax("/api/user", {
//   type: "PUT",
//   data: data.id
// }).then(()=> {
//   console.log("Caegory ID updated")
//   location.reload();
// });
})

});
}

 
});


