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

    let addedCategory = newCategory.name.toUpperCase();

    let categoryButton = $('<button>').addClass('categoryButton btn btn-outline-success btn-lg').attr('type', 'button').attr('data-category', newCategory.name).text(addedCategory);
    categoryList.prepend(categoryButton);

    insertNewCategory(newCategory.name);
    getCategoryID();

  });

  function insertNewCategory(name) {
    console.log(name);
    $.post("/api/category", {
      name: name
    })
      .then(() => {
        console.log("new category added");
    })
  }

  function getCategoryID() {
    $.get("/api/category").then(data => {
        console.log(data.id, data.name);

    let buttonName = $('categoryButton').val();   
    console.log(buttonName);
    
    if ( buttonName == data.name) {
      $('categoryButton').attr('data-id', data.id);  
    }
    })
  }


  //Category Button function
  //


  // Display List of member to My Neighborhood when click on a Category
  
});

