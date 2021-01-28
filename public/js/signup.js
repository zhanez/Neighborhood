$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("#email-input");
  const passwordInput = $("#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
      //first name
      //lastname
      //bio
      //phone number
    };

    console.log(userData.email);
    console.log(userData.password);
    
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
  });

  function signUpUser(email, password) {
    console.log(email);
    console.log(password);
    
    $.post("/api/signup", {
      email: email,
      password: password
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
