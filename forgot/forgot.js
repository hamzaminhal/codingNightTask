const fullNameElement = document.querySelector("#full-name");
const emailElement = document.querySelector("#email");
let newPasswordElement = document.querySelector("#new-password");
const searchBtn = document.querySelector("#search-btn");
const changeBtn = document.querySelector("#change-btn");
let allUsers = JSON.parse(localStorage.getItem("users")) || [];

function findUserFunction() {
  const foundUser = allUsers.find((user) => {
    return (
      fullNameElement.value === user.username &&
      emailElement.value === user.email
    );
  });
  return foundUser;
}
searchBtn.addEventListener("click", (event) => {
  if (fullNameElement.value != "" && emailElement.value != "") {
    event.preventDefault();
    let foundUser = findUserFunction();
    if (foundUser) {
      fullNameElement.disabled = true;
      emailElement.disabled = true;
      newPasswordElement.style.display = "block";
      newPasswordElement.addAttribute = "required";
      searchBtn.style.display = "none";
      changeBtn.style.display = "block";
    } else {
      swal("User Not Found", "Please Sign Up!", "info");
    }
  } else {
    event.preventDefault();
    swal("Alert", "Please Enter User Name & Password!", "warning");
  }
});

changeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (newPasswordElement.value != "") {
    let user = findUserFunction();
    user.password = newPasswordElement.value;
    localStorage.setItem("users", JSON.stringify(allUsers));
    swal("Success", "Password Changed Succesfully!", "success").then(() => {
      window.location.replace("../login/index.html");
    });
  } else {
    event.preventDefault();
    swal("Alert", "Please Enter new Password!", "warning");
  }
});
