// class to make new user
class user {
  constructor(username, email, password, id) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.id = id;
    this.friends = [];
    this.myPosts = [];
    this.creatTime = new Date().toISOString();
  }
}

(function () {
  const loggedUserData = JSON.parse(localStorage.getItem("logged"));
  if (loggedUserData) {
    window.location.assign("../index.html");
  }
})();

let allUsers = JSON.parse(localStorage.getItem("users")) || [];
// signup logic

let nameElement = document.querySelector("#full-name");
let signupEmailElement = document.querySelector("#signup-email");
let signupPasswordElement = document.querySelector("#signup-password");
let signupBtn = document.querySelector("#signup-btn");
let userFound = false;

signupBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const fullname = nameElement.value;
  const signupEmail = signupEmailElement.value;
  const signupPassword = signupPasswordElement.value;
  if (!fullname && !signupEmail && !signupPassword) {
    swal("Warning", "Please Enter All fields!", "warning");
  } else {
    let checkUser = allUsers.find((user) => {
      return signupEmailElement.value === user.email;
    });
    console.log(checkUser);
    if (checkUser) {
      swal("Warning", "Email already Exists! Please Login", "warning");
    } else {
      let id = allUsers.length + 1;
      let newUser = new user(fullname, signupEmail, signupPassword, id);
      allUsers.push(newUser);
      save();
      swal("Success", "Signed Up Successful!", "success").then(() => {
        window.location.assign("../login/index.html");
      });
    }
  }
});

function save() {
  localStorage.setItem("users", JSON.stringify(allUsers));
}
