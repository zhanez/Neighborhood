$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("#email-input");
  const passwordInput = $("#password-input");
  const firstnameInput = $("#firstNameInput");
  const lastnameInput = $("#lastNameInput");
  const bioInput = $("#floatingTextarea2");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      first_name: firstnameInput.val().trim(),
      last_name: lastnameInput.val().trim(),
      bio: bioInput.val().trim()
    };

    console.log(userData.email);
    console.log(userData.password);
    console.log(userData.first_name);
    console.log(userData.last_name);
    console.log(userData.bio);
    
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.first_name, userData.last_name, userData.bio);
  });

  function signUpUser(email, password, first_name, last_name, bio) {
    console.log(email);
    console.log(password);
    console.log(first_name);
    console.log(last_name);
    console.log(bio);
    
    $.post("/api/signup", {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      bio: bio
    })
      .then(() => {
        window.location.replace("/members");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
