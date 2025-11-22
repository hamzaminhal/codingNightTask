// Login related script

const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginBtn = document.querySelector("#login-btn");
let allUsers = JSON.parse(localStorage.getItem("users")) || [];

// console.log(allUsers);
(function () {
  const loggedUserData = JSON.parse(localStorage.getItem("logged"));
  if (loggedUserData) {
    window.location.assign("../home/index.html");
  }
})();

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!loginEmail.value && !loginPassword.value) {
    swal("Warning", "Please Enter All fields!", "warning");
  } else {
    let matchedUser = allUsers.find((user) => {
      return (
        user.email === loginEmail.value && user.password === loginPassword.value
      );
    });
    console.log(matchedUser);
    if (matchedUser) {
      swal(
        "Success",
        `Login Successful! Welcome Back ${matchedUser.username}`,
        "success"
      ).then(() => {
        window.location.href = `../index.html?username=${matchedUser.username}&email=${matchedUser.email}`;
      });
      localStorage.setItem("logged", JSON.stringify(matchedUser));
    } else {
      swal("Warning", "Invalid Credentials!", "warning");
    }
  }
});
