export function renderPostLogin() {
  window.location.href = "/todos";
  console.log("kek");
  // let log = console.log;
  // log("in renderPost");
  // let heading = document.createElement("h1");
  // heading.innerHTML = "Taskify";
  // let superDiv = document.createElement("div");
  // superDiv.setAttribute("class", "superDiv");
  // let addTodoButton = document.createElement("button");
  // addTodoButton.innerHTML = "Add Todo";
  // addTodoButton.id = "addTodo";
  // addTodoButton.style.height = 30;
  // let addTodoPopup = document.createElement("form");
  // addTodoPopup.setAttribute("class", "addTodoPopup");
  // // addTodoPopup.innerHTML = "Add Todo";
  // let popupHeading = document.createElement("h3");
  // let closeButton = document.createElement("button");
  // closeButton.id = "addTodoPopupCloseButton";
  // closeButton.innerHTML = "X";
  // closeButton.addEventListener("click", (event) => {
  //   var blur = document.querySelector(".superDiv");
  //   console.log(blur);
  //   blur.classList.toggle("active");
  //   event.preventDefault();
  //   var popup = document.querySelector(".addTodoPopup");
  //   popup.classList.toggle("active");
  // });
  // let todo = document.createElement("textarea");
  // let addButton = document.createElement("button");
  // addButton.setAttribute("type", "submit");
  // addButton.id = "add";
  // addButton.addEventListener("click", async function (event) {
  //   event.preventDefault();
  //   let todoText = document.querySelector("textarea").value;
  //   //   console.log("here");
  //   log(todoText);
  //   if (todoText.trim() == "") {
  //     alert("Todo cannot be empty.");
  //     // return;
  //   } else {
  //     let todo = document.createElement("div");
  //     todo.id = todoText.trim();
  //     await axios({
  //       method:'post',
  //       url:"http://localhost:8080/todo",
  //       headers:{
  //         token:localStorage.getItem("token")
  //       },
  //       data:{
  //         todo:todoText.trim()
  //       }
  //     });
  //     todo.className = "draggable";
  //     todo.draggable = true;
  //     todo.innerHTML = todoText.trim();
  //     todo.addEventListener("dragstart", function () {
  //       this.classList.add("dragging");
  //     });
  //     todo.addEventListener("dragend", function () {
  //       this.classList.remove("dragging");
  //     });
  //     TODO.appendChild(todo);
  //     // pop
  //     const draggables = document.querySelectorAll(".draggable");
  //     log(draggables);
  //     draggables.forEach((draggable) => {
  //       draggable.addEventListener("dragstart", function () {
  //         this.classList.add("dragging");
  //       });
  //       draggable.addEventListener("dragend", function () {
  //         this.classList.remove("dragging");
  //       });
  //     });
  //     const containers = document.querySelectorAll(".container");
  //     containers.forEach((container) => {
  //       container.addEventListener("dragover", function () {
  //         const draggedElement = document.querySelector(".dragging");
  //         log(draggedElement);
  //         this.appendChild(draggedElement);
  //       });
  //     });
  //     var blur = document.querySelector(".superDiv");
  //     console.log(blur);
  //     blur.classList.toggle("active");
  //     var popup = document.querySelector(".addTodoPopup");
  //     popup.classList.toggle("active");
  //   }
  // });
  // popupHeading.innerHTML = "Add todo";
  // todo.placeholder = "Watch Samay Raina before Cohort ;)";
  // addButton.innerHTML = "Add";
  // addTodoPopup.appendChild(closeButton);
  // addTodoPopup.appendChild(popupHeading);
  // addTodoPopup.appendChild(todo);
  // addTodoPopup.appendChild(addButton);

  // // addTodoPopup.style.display = "none";
  // // superDiv.appendChild(addTodoPopup);
  // document.body.appendChild(addTodoPopup);
  // addTodoButton.onclick = () => {
  //   var blur = document.querySelector(".superDiv");
  //   console.log(blur);
  //   blur.classList.toggle("active");
  //   var popup = document.querySelector(".addTodoPopup");
  //   popup.classList.toggle("active");
  //   //   addTodoPopup.style.display = "block";
  //   //   document.body.innerHTML = "werwe";
  //   //   document.body.appendChild(addTodoPopup);
  //   //   wiblur.classList.toggle("");
  // };
  // let TODO = document.createElement("div");
  // TODO.className = "container";
  // let INPROGRESS = document.createElement("div");
  // INPROGRESS.className = "container";
  // let UNDER_REVIEW = document.createElement("div");
  // UNDER_REVIEW.className = "container";
  // let FINISHED = document.createElement("div");
  // FINISHED.className = "container";
  // TODO.innerHTML = "Todo";
  // INPROGRESS.innerHTML = "In progress";
  // UNDER_REVIEW.innerHTML = "Under review";
  // FINISHED.innerHTML = "Finished";
  // // superDiv.appendChild(heading);
  // //

  // //
  // superDiv.appendChild(addTodoButton);
  // superDiv.appendChild(TODO);
  // superDiv.appendChild(INPROGRESS);
  // superDiv.appendChild(UNDER_REVIEW);
  // superDiv.appendChild(FINISHED);
  // // superDiv.appendChild(addTodoPopup);
  // superDiv.style.display = "flex";
  // document.body.appendChild(heading);
  // document.body.appendChild(superDiv);
}
// module.exports = renderPostLogin;
