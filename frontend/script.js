// const { response } = require("express");

// const { response } = require("express");

let todoList = [];
const themeKey = "theme";
let log = console.log;
let token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/";
}
window.onload = function () {
  axios
    .get("https://fullstack-todo-app-4beh.onrender.com/todos", {
      headers: {
        token: token,
        "Content-Type": "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.data.status == 403) {
        alert("Please login first");
        return;
      } else {
        if (!response.data.todoList == []) {
          todoList = response.data.todoList;
        } else {
          // log("Todo list is empty.");
        }
        applySavedTheme();
        displayTodo();
      }
      // log(response.status);
      // console.log(response.data.todoList);
      // log("heruber");
      // log("hehe");
    });
  //data contains the res.json() output.
  // console.log(storedList.todoList);
  // console.log("here");
  // log(storedList.todoList);
  // if (!storedList.todoList == []) {
  //   todoList = storedList.todoList;
  //   console.log(todoList);

  //   // log("heh");
  // } else {
  //   log("Todo list is empty.");
  // }
  // applySavedTheme();

  // // log("heh");
  // log(storedList.todoList);
  // displayTodo();
};

function applySavedTheme() {
  let savedTheme = localStorage.getItem(themeKey);
  if (savedTheme === "dark") {
    document.body.id = "dark";
    document.querySelector("#themeIcon").innerHTML = "&#xf185;"; // Sun icon
  } else {
    document.body.id = "light";
    document.querySelector("#themeIcon").innerHTML = "&#xf186;"; // Moon icon
  }
}

function toggleTheme() {
  if (document.body.id === "light") {
    document.body.id = "dark";
    document.querySelector("#themeIcon").innerHTML = "&#xf185;";
    localStorage.setItem(themeKey, "dark");
  } else {
    document.body.id = "light";
    document.querySelector("#themeIcon").innerHTML = "&#xf186;";
    localStorage.setItem(themeKey, "light");
  }
  // location.reload();
}
function logOut() {
  localStorage.removeItem("token");
  location.reload();
}
async function displayTodo() {
  let response = await axios.get(
    "https://fullstack-todo-app-4beh.onrender.com/todos",
    {
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data.message);
  todoList = response.data.todos;
  let todoStatus = response.data.todoStatus;
  log(todoList);
  // let todos = "";
  for (let i = 0; i < todoList.length; i++) {
    // todos += `<div class="new-element" id='${todoList[i]}'>
    // <textarea>${todoList[i]}</textarea><button class="edit">Edit</button><button class="delete" id="delete${todoList[i]}">Delete</button></div>`;
    let smallDiv = document.createElement("div");
    smallDiv.className = "new-element";
    smallDiv.id = todoList[i];
    let textarea = document.createElement("textarea");
    let editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerText = "Edit";
    textarea.innerHTML = todoList[i];
    textarea.disabled = true;
    if (todoStatus[i]) {
      textarea.classList.add("markedAsDone");

      editButton.disabled = true;
    } else {
      editButton.disabled = false;
    }
    textarea.style.backgroundColor = "biege";

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    let dbId = "delete" + todoList[i];
    deleteButton.id = dbId;
    deleteButton.innerText = "Delete";
    let markAsDoneButton = document.createElement("button");
    markAsDoneButton.innerHTML = "Mark as done";
    markAsDoneButton.className = "markAsDoneButton";
    smallDiv.appendChild(textarea);
    smallDiv.appendChild(editButton);
    smallDiv.appendChild(deleteButton);
    smallDiv.appendChild(markAsDoneButton);
    document.querySelector("#todoList").appendChild(smallDiv);
    // console.log(document.querySelector("#todoList"));
  }
  // document.querySelector("#todoList").innerHTML = todos;
  activateEditListener();
  activateDeleteListener();
  activateMarkAsDoneListener();
}
function activateMarkAsDoneListener() {
  let markAsDoneButtons = document.querySelectorAll(".markAsDoneButton");
  markAsDoneButtons.forEach((mb, i) => {
    mb.addEventListener("click", () => {
      markAsDone(i);
    });
  });
}
function activateDeleteListener() {
  let deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteTodo(i);
      log(i);
    });
  });
}
async function markAsDone(index) {
  let textAreas = document.querySelectorAll("textarea");
  let todo = textAreas[index];
  todo.classList.toggle("markedAsDone");
  await axios
    .put(
      "https://fullstack-todo-app-4beh.onrender.com/markTodoAsDone",
      {
        index: index,
      },

      {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      log(response.data);

      location.reload();
    });
}
async function deleteTodo(index) {
  // todoList.splice(index, 1);
  // localStorage.setItem("todoList", JSON.stringify(todoList));
  // location.reload();
  log(index);
  let cnt = 0;
  let text = todoList[index];
  for (let i = 0; i < index; i++) {
    if (todoList[i] == text) {
      cnt++;
    }
  }
  await axios
    .delete("https://fullstack-todo-app-4beh.onrender.com/todo", {
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      data: {
        index: index,
        description: text,
      },
    })
    .then((response) => {
      log(response.data.message);
      return response;
    })
    .then((response) => {
      location.reload();
    });
}

function activateEditListener() {
  let editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      editTodo(i);
    });
  });
}

function editTodo(index) {
  console.log(index);
  log(todoList + "kek");
  let initialText = todoList[index];
  let cnt = 0;
  for (let i = 0; i < index; i++) {
    if (todoList[i] == initialText) {
      cnt++;
    }
  }
  let nodes = document.querySelectorAll(".new-element");
  let node = nodes[index];
  console.log(initialText);

  // Store the original state
  const originalState = {
    text: node.children[0].value,
    editButton: node.children[1].cloneNode(true),
    deleteButton: node.children[2].cloneNode(true),
  };

  // Temporarily remove the delete event listener
  const oldDeleteButton = node.children[2];
  const newDeleteButton = oldDeleteButton.cloneNode(true);
  node.replaceChild(newDeleteButton, oldDeleteButton);

  node.children[0].disabled = false;
  node.children[1].innerHTML = "Save";
  node.children[1].className = "save";
  node.children[2].innerHTML = "Cancel";
  node.children[2].className = "cancel";

  if (node.children[1].innerHTML === "Save") {
    node.children[1].onclick = async () => {
      log("here");
      await axios
        .put(
          "https://fullstack-todo-app-4beh.onrender.com/todos",
          {
            index: cnt,
            oldTodo: initialText,
            newTodo: node.children[0].value,
          },
          {
            headers: {
              token: token,
              "Content-Type": "application/json",
            },
          }
        )
        .catch(() => {
          console.log("Error.");
        });
      location.reload();
    };

    node.children[2].onclick = () => {
      // Restore the original state
      node.children[0].value = originalState.text;
      node.children[0].disabled = true;
      node.replaceChild(originalState.editButton, node.children[1]);
      node.replaceChild(originalState.deleteButton, newDeleteButton);

      // Re-activate the delete listener
      activateEditListener();
      activateDeleteListener();
    };
  }
}

async function addToDo() {
  log("in add");
  let todo = document.querySelector(".input-add-todo").value.trim();
  if (!todo) {
    alert("Todo can't be empty");
    return;
  }

  let newNode = document.createElement("div");
  let textarea = document.createElement("textarea");
  textarea.innerHTML = todo;
  textarea.disabled = true;
  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";
  deleteButton.id = "delete" + todo;

  newNode.appendChild(textarea);
  newNode.appendChild(editButton);
  newNode.appendChild(deleteButton);
  newNode.className = "new-element";
  newNode.id = todo;

  let parentNode = document.querySelector("#todoList");
  parentNode.appendChild(newNode);

  todoList.push(todo);
  // localStorage.setItem("todoList", JSON.stringify(todoList));
  let token = localStorage.getItem("token");
  await axios
    .post(
      "https://fullstack-todo-app-4beh.onrender.com/addTodo",
      { description: todo },
      // JSON.stringify({
      //   description: todo,
      // }),
      {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      // console.log(response.data.message);

      // document.querySelector(".input-add-todo").value = "";
      location.reload();
    });
  // document.querySelector(".input-add-todo").value = "";
}

function search() {
  let searchValue = document.querySelector(".search-bar").value;
  let nodes = document.querySelectorAll(".new-element");
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i].children[0].innerHTML.includes(searchValue)) {
      nodes[i].children[0].style.display = "none";
      nodes[i].children[1].style.display = "none";
      nodes[i].children[2].style.display = "none";
      nodes[i].children[3].style.display = "none";
    } else {
      nodes[i].children[0].style.display = "";
      nodes[i].children[1].style.display = "";
      nodes[i].children[2].style.display = "";
      nodes[i].children[3].style.display = "";
    }
  }
}
