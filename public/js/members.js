$(document).ready(() => {
  const addCategory = $("#addCategory");
  const categoryInput = $("#categoryInput");
  const categoryList = $("#categoryList");
  const userGroups = $("#userGroups");

  // Get user information to dispplay on the profile page.
  $.get("/api/user").then(data => {
    $("#emailUser").text("Email: " + data.email);
    $("#idUser").attr("data-id", data.id).text("ID: " + data.id);
    $("#nameUser").text("Name: " + data.first_name + " " + data.last_name);
    $("#bioUser").text("Bio: " + data.bio);
  });

  //Add category to list of categories==================== handlebars version
  // addCategory.on("click", event => {
  //   event.preventDefault();
  //   if (!categoryInput.val().trim()) {
  //     return;
  //   }
  //   const newCategory = {
  //     name: categoryInput.val().trim()
  //   };
  //   console.log(newCategory);

  //   $.ajax("/api/category", {
  //     type: "POST",
  //     data: newCategory
  //   }).then(() => {
  //       console.log("added new category");
  //       // location.reload();
  //     }
  //   );
  // });

//  Add category to list of categories============================ not handlebars version
  addCategory.on("click", event => {
    event.preventDefault();
    if (!categoryInput.val().trim()) {
      return;
    }
    const newCategory = {
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
      location.reload();
  }

  function getCategoryID() {
    //Create new cateogry button  
    $.get("/api/category", (data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        let categoryButton = $('<button>').addClass('categoryButton btn btn-outline-success btn-lg').attr('data-id', data[i].id).text(data[i].name).attr('type', 'button');
        categoryList.prepend(categoryButton);
      }
    })
  };

  // Display new category buttons and its functions on relead or when user logs out and logs back in.
  window.onload = function () {
    $.get("/api/category", (data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        let categoryButton = $('<button>').addClass('categoryButton btn btn-outline-success btn-lg').attr('data-id', data[i].id).attr('data-name', data[i].name).attr('type', 'button').text(data[i].name);
        categoryList.prepend(categoryButton);
      }
      $('.categoryButton').click(function (event) {
        event.preventDefault();

        let buttonName = $(this).data('name').toUpperCase();
        console.log(buttonName);

        let buttonID = $(this).data('id');
        console.log(buttonID);

        let userID = $('#idUser').data('id');
        console.log(userID);

        let updatedData = {
          CategoryId: buttonID,
          id: userID
        }

        $.ajax("/api/user", {
          type: "PUT",
          data: updatedData
        }).then(() => {
          console.log("CategoryId updated");

  //Display users associtated in selected category within in my neghborhood section    
        $.get("/api/user/" + buttonID, (userData) => {
          console.log(userData)

          $("#categoryHeader").text(buttonName);
          for (var i = 0; i < userData.length; i++) {
            let userNameDisplay = $('<h2>').addClass('user-display text-dark').attr('data-id', userData[i].id).text("Name: " + userData[i].first_name + " " + userData[i].last_name);
            let userEmailDisplay = $('<h3>').addClass('user-display text-dark').attr('data-id', userData[i].id).text("Email: " + userData[i].email);
            let userBioDisplay = $('<h4>').addClass('user-display text-dark').attr('data-id', userData[i].id).text("Bio: " + userData[i].bio);

            userGroups.append(userNameDisplay, userEmailDisplay, userBioDisplay, $('<br>'));
          }
          })
        });
      });
    })
  };

});


