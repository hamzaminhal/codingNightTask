// import { data, logout } from "./home.js";
let profileId = document.querySelector("#profile-id");
let loggedUsername = document.querySelector("#logged-username");
let displayUsername = document.querySelector("#username");
let loggedEmail = document.querySelector("#logged-email");
let userDetails = document.querySelector("#details");
let show = true;
// let username = data.get("username");
// let email = data.get("email");
let loggedUserData = JSON.parse(localStorage.getItem("logged"));
let allUsers = JSON.parse(localStorage.getItem("users"));
let friendsRequestContainer = document.querySelector("#requests");
let friendsListContainer = document.querySelector("#friends");
let loggedInUser = JSON.parse(localStorage.getItem("logged"));
let friendList = [];
let confirmBtn = document.querySelector("#confirm");

(function () {
  if (loggedInUser) {
    loggedInUser.textContent = loggedUserData.username;
    loggedInUser.textContent = loggedUserData.email;
  } else {
    swal("UnAuthorized Access", "Please Login First!", "warning").then(() => {
      window.location.assign("../login/index.html");
    });
  }
})();
profileId.addEventListener("click", () => {
  // console.log(profileId);
  if (show) {
    console.log(show);
    userDetails.classList.remove("hide");
    show = false;
  } else {
    console.log(show);
    userDetails.classList.add("hide");
    show = true;
  }
});

friendList = allUsers.filter((user) => user.id !== loggedInUser.id);

displayUsername.innerHTML = loggedInUser.username;
function showRequests() {
  friendsRequestContainer.innerHTML = "";

  if (friendList.length === loggedInUser.friends.length) {
    friendsRequestContainer.innerHTML = `
    <h3>No Friend Request</h3>
    `;
  } else {
    // debugger;
    // console.log(friendList);
    friendList.map((user) => {
      if (loggedInUser.friends.length < 1) {
        showCards(user);
      } else {
        // loggedInUser.friends.map((friendId) => {
        console.log(loggedInUser.friends.includes(user.id));
        if (!loggedInUser.friends.includes(user.id)) {
          showCards(user);
        }
        // if (user.id !== friendId) {
        //   showCards(user);
        // }
        // });
      }
    });
  }
}
showRequests();

function showCards(user) {
  friendsRequestContainer.innerHTML += `
      <div class="request-card" id="request${user.id}">
  
        <div id="fb">
          <div id="fb-top">
            <p>
              <b>Friend Requests</b><span>Find Friends &bull; Settings</span>
            </p>
          </div>
          <img
            src="./images/images.png"
            height="100"
            width="100"
            alt="Image of woman"
          />
          <p id="info">
            <b>${user.username}</b> <br />
            <span>14 mutual friends</span>
          </p>
          <div id="button-block">
            <div id="confirm" onclick="addFriend(${user.id}), showFriends()">Confirm</div>
            <div id="delete">Delete Request</div>
          </div>
        </div>
        
  </div>
  `;
}

function addFriend(id) {
  // debugger;
  loggedInUser.friends.push(id);
  console.log(loggedInUser.friends);
  allUsers[loggedInUser.id - 1] = loggedInUser;
  localStorage.setItem("users", JSON.stringify(allUsers));
  localStorage.setItem("logged", JSON.stringify(loggedInUser));
  showFriends();
  showRequests();
}

function showFriends() {
  friendsListContainer.innerHTML = "";
  if (loggedInUser.friends.length === 0) {
    friendsListContainer.innerHTML = `
        <h3>You Have no Friends</h3>
        `;
  }
  loggedInUser.friends.map((friend) => {
    allUsers.map((user) => {
      if (friend === user.id) {
        friendsListContainer.innerHTML += `
        <div class="request-card" id="request${friend}">
  
        <div id="fb">
          <div id="fb-top">
            <p>
              <b>Friend </b><span>Find Friends &bull; Settings</span>
            </p>
          </div>
          <img
            src="./images/images.png"
            height="100"
            width="100"
            alt="Image"
          />
          <p id="info">
            <b>${user.username}</b> <br />
            <span>14 mutual friends</span>
          </p>
          <div id="button-block">
            
            <div id="delete" onclick="dltFriend(${user.id})">Delete Request</div>
          </div>
        </div>
        
  </div>
        `;
      }
    });
  });
}
showFriends();

function dltFriend(id) {
  let index = loggedInUser.friends.indexOf(id);
  console.log(index);
  loggedInUser.friends.splice(index, 1);
  console.log(loggedInUser.friends);
  allUsers[loggedInUser.id - 1] = loggedInUser;
  localStorage.setItem("users", JSON.stringify(allUsers));
  localStorage.setItem("logged", JSON.stringify(loggedInUser));
  showRequests();
  showFriends();
}
