let profileId = document.querySelector("#profile-id");
let loggedUsername = document.querySelector("#logged-username");
let displayUsername = document.querySelector("#username");
let loggedEmail = document.querySelector("#logged-email");
let userDetails = document.querySelector("#details");
let show = true;
let data = new URLSearchParams(window.location.search);
let username = data.get("username");
let email = data.get("email");
let loggedUserData = JSON.parse(localStorage.getItem("logged"));
let allUsers = JSON.parse(localStorage.getItem("users"));
let likesDiv = document.querySelector("#like");
let search = document.querySelector("#search-text");
let searchIcon = document.querySelector("#search-icon");
let feedPostsContainer = document.getElementById("feed-posts");
let allPosts = [];
let likeStatus = false;
const modal = document.getElementById("taskModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close");
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const previewContainer = document.getElementById("taskModal");
const submitBtn = document.getElementById("submitTask");
const displayImg = document.getElementById("previewImg");

// IIFE
(function () {
  if (loggedUserData) {
    loggedUsername.textContent = loggedUserData.username;
    loggedEmail.textContent = loggedUserData.email;
  } else {
    swal("UnAuthorized Access", "Please Login First!", "warning").then(() => {
      window.location.assign("./login/index.html");
    });
  }
})();
displayUsername.innerHTML = loggedUserData.username;

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

// Logout Function
function logout() {
  localStorage.removeItem("logged");
  userDetails.classList.add("hide");
  swal("Success", "Logged Out Succesfully", "info").then(() => {
    window.location.assign("./login/index.html");
  });
}

class post {
  constructor(content, publisher, imgUrl) {
    this.content = content;
    this.publisher = publisher;
    this.postTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    this.likes = 0;
    this.isLike = false;
    this.comments = [];
    this.postId = Date.now();
    this.imgUrl = imgUrl;
  }
}

// publish post

function publishPost() {
  let content = document.querySelector("#post-text");
  const imgUrl = document.querySelector("#img-url");
  let owner = JSON.parse(localStorage.getItem("logged"));
  delete owner.password;
  let feedPost = new post(content.value, owner, imgUrl.value);
  console.log(feedPost);
  loggedUserData.myPosts.push(feedPost);
  allUsers[loggedUserData.id - 1] = loggedUserData;
  localStorage.setItem("logged", JSON.stringify(loggedUserData));
  localStorage.setItem("users", JSON.stringify(allUsers));
  renderPosts();
  content.value = "";
  imgUrl.value = "";
  clearPreview();
}

function edit(id) {
  const post = loggedUserData.myPosts.find((post) => post.postId === id);
  let newText = prompt("Enter new text");
  post.content = newText;
  post.postTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  localStorage.setItem("logged", JSON.stringify(loggedUserData));
  localStorage.setItem("users", JSON.stringify(allUsers));
  // console.log(post);
  renderPosts();
}

function deletePost(id) {
  // index of post with incomming id
  const index = loggedUserData.myPosts.find((post) => post.postId === id);

  if (index !== -1) {
    loggedUserData.myPosts.splice(index, 1);

    allUsers[loggedUserData.id - 1] = loggedUserData;
    localStorage.setItem("logged", JSON.stringify(loggedUserData));
    localStorage.setItem("users", JSON.stringify(allUsers));

    console.log("Post deleted successfully");
    renderPosts(); // Re-render posts after deletion
  } else {
    console.log("Post not found");
    swal("Warning", "You are not authorized to delete the post", "warning");
  }
}

// Display Posts
function displayPosts(posts) {
  feedPostsContainer.innerHTML = "";

  posts.reverse().map((newPost) => {
    createAt = new Date(newPost.postTime);

    feedPostsContainer.innerHTML += `
    <div class="feed-card">
              <div class="card-head">
                <div>
                  <img src="images/javed.png" alt="" class="feed-card-img" />
                </div>
                <div>
                  <div class="feed-heading">${newPost.publisher.username}</div>
                  <div>
                    ${newPost.postTime}
                    <svg
                      viewBox="0 0 16 16"
                      width="12"
                      height="12"
                      fill="currentColor"
                      title="Shared with Public"
                      class="xfx01vb x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
                      style="--color: var(--secondary-icon)"
                    >
                      <title>Shared with Public</title>
                      <g fill-rule="evenodd" transform="translate(-448 -544)">
                        <g>
                          <path
                            d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                            transform="translate(354 143.5)"
                          ></path>
                          <path
                            d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                            transform="translate(354 143.5)"
                          ></path>
                          <path
                            fill-rule="nonzero"
                            d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                            transform="translate(354 143.5)"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              
             
            
              <div class="txt">
                ${newPost.content}
              </div>
              <div class="feed-card-main-img">
                <img src="${newPost.imgUrl}" alt="post Image" id="previewImg"/>
              </div>
              <div class="like">
                <button class="fc-icon btn1" onclick="likeFunction(${newPost.postId})" id="like">
                <span id="likeCount">${newPost.likes}</span>
                  
                  Like
                </button>
                <button onClick="edit(${newPost.postId})" class="fc-icon btn1">
                  <i
                    data-visualcompletion="css-img"
                    class="x1b0d499 x1d69dk1"
                    style="
                      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png?_nc_eui2=AeFjlCri4n8k2l4ThQepyLDgTRy-Yy01V8dNHL5jLTVXx2yJKNMkiizJQb6o-RZf9oxpqgGN8X9s471ZACnNT8tX');
                      background-position: 0px -588px;
                      background-size: auto;
                      width: 20px;
                      height: 20px;
                      background-repeat: no-repeat;
                      display: inline-block;
                    "
                  ></i>
                  Edit
                </button>
                <button onClick="deletePost(${newPost.postId})" class="fc-icon btn1">
                        <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="20"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>

                  Delete
                </button onClick="delete()">
              </div>
            </div>
    `;
  });
}

// Render Posts

function renderPosts() {
  let friendsPosts = [];
  loggedUserData.friends.map((id) => {
    let otherposts = allUsers[id - 1].myPosts;
    friendsPosts = [...friendsPosts, ...otherposts];
  });

  allPosts = [...friendsPosts, ...loggedUserData.myPosts];
  // allPosts.sort(() => {
  //   let num = Math.random() - 0.5;
  //   return num;
  // });
  // debugger;

  displayPosts(allPosts);
}
renderPosts();

// Open Modal
openBtn.onclick = () => {
  modal.style.display = "flex";
};

// Close Modal
closeBtn.onclick = () => {
  modal.style.display = "none";
  clearPreview();
};

// Click Outside
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    clearPreview();
  }
};

// Clear Preview
function clearPreview() {
  previewContainer.style.display = "none";
  console.log("closed");
}

// Like Function

function likeFunction(id) {
  console.log(id);
  const likedPost = allPosts.find((post) => post.postId === id);
  console.log(likedPost);
  if (likedPost) {
    if (likedPost.isLike) {
      likedPost.likes -= 1;
      renderPosts();
      likedPost.isLike = false;
    } else {
      likedPost.likes += 1;
      renderPosts();
      likedPost.isLike = true;
    }
  }
}

// submit Btn

submitBtn.addEventListener("click", () => {
  publishPost();
});

// search Logic
searchIcon.addEventListener("click", () => {
  let filteredPosts = [];
  console.log(search.value);
  if (search.value !== "") {
    filteredPosts = allPosts.filter((post) => {
      return post.content.toLowerCase().includes(search.value.toLowerCase());
    });
    console.log(filteredPosts);
    displayPosts(filteredPosts);
  } else {
    renderPosts(allPosts);
  }
});
