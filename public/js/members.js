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
  });

  //Add category to list of categories
  addCategory.on("click", event => {
    event.preventDefault();
    const newCategory= {
      name: categoryInput.val().trim()
    };
    console.log(newCategory.name);

    insertNewCategory(newCategory.name);
    // getCategoryID();
  });

  function insertNewCategory(name) {
    console.log(name);
    $.post("/api/category", {
      name: name
    })
      .then(() => {
        console.log("new category added");
        $.get("/api/category", (data) => {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
          let categoryButton = $('<button>').addClass('categoryButton btn btn-outline-success btn-lg').attr('type', 'button').attr('id', data[i].id).text(data[i].name);
          categoryList.prepend(categoryButton);
        }
      })
    })
  }

  // function getCategoryID() {
  //   $.get("/api/category", (data) => {
  //     console.log(data);
  //     for (var i = 0; i < data.length; i++) {
  //       let categoryButton = $('<button>').addClass('categoryButton btn btn-outline-success btn-lg').attr('type', 'button').attr('id', data[i].id).text(data[i].name.toUppercase());
  //     categoryList.prepend(categoryButton);
  //   }
  //   })
  // }


  //Category Button function
  //
});


