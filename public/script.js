const app = document.querySelector(".app");

const buildUi = (user) => {
  for (let i = 0; i < user.length; i++) {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
<div>
 <span>${user[i].name}</span>
 <span>${user[i].email}</span>
 <span>${user[i].age}</span>
 <button onclick = "updateUser(event)">Update</button>
 <button id=${user[i].id}  onclick = "deleteUser(event)">Delete</button>
</div>
`;

    app.append(userDiv);
  }
};

const deleteUser = async (evnet) => {
  const id = evnet.target.id;

  const url = `http://localhost:3000/users/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });
  app.innerHTML = "";
  fetchData();
};
const updateUser = (event) => {
  const parentDiv = event.target.parentElement;
  const spanTags = parentDiv.getElementsByTagName("span");
  console.log(
    spanTags[0].innerHTML,
    spanTags[1].innerHTML,
    spanTags[2].innerHTML
  );
  const updateNameInput = document.querySelector(".name");
  const updateEmailInput = document.querySelector(".email");
  const updateAgeInput = document.querySelector(".age");
  updateNameInput.value = spanTags[0].innerHTML;
  updateEmailInput.value = spanTags[1].innerHTML;
  updateAgeInput.value = spanTags[2].innerHTML;
};

const updateNow = async () => {
  const updateUserName = document.querySelector(".name").value;
  const updateUserEmail = document.querySelector(".email").value;
  const updateUserAge = document.querySelector(".age").value;
  const updateUserObj = {
    name: updateUserName,
    email: updateUserEmail,
    age: updateUserAge,
  };

  const response = await fetch("http://localhost:3000/users", {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(updateUserObj),
  });
  const data = await response.json();
  app.innerHTML = "";
  fetchData();
};

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  buildUi(data);
};

fetchData();
