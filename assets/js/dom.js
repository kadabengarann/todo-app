const LIST_TODO_ID = "todo-container";

const TODO_ITEMID = "itemId";

const darkModeToggle = document.querySelector("#theme-toggle");

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  darkModeToggle.firstElementChild.src = "./assets/img/icon-moon.svg";
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  darkModeToggle.firstElementChild.src = "./assets/img/icon-sun.svg";

  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
}

function filterCallback(e) {
  //update the current Filter and calls fonction that takes care of filters
  filter = e.target.value;
  refreshDataFromTodos(filter);
}
function fillUserData() {
  const incompleted_todos = document.getElementById("items-left");

  incompleted_todos.innerText = user.incompletedTodos;
}

function addTodo(value, isCompleted) {
  const containerTODOList = document.getElementById(LIST_TODO_ID);
  const nameTodo = value;

  const todo = makeTodo(nameTodo, isCompleted);

  const todoObject = composeTodoObject(nameTodo, isCompleted);

  todo[TODO_ITEMID] = todoObject.id;
  todos.push(todoObject);

  containerTODOList.append(todo);

  updateDataToStorage();
  document.getElementById("todo-input").value = "";
}

function makeTodo(nameTodo, isCompleted) {
  const todoName = document.createElement("p");
  todoName.innerHTML = nameTodo;

  const container = document.createElement("li");
  container.classList.add("todo_item");
  if (isCompleted) {
    container.classList.add("checked");
  }

  container.append(createCheckButton(), todoName, createDeleteButton());

  return container;
}
function todoCheckBox(todoElement) {
  todoElement.parentNode.classList.toggle("checked");
  let todo = findTodo(todoElement.parentNode[TODO_ITEMID]);
  if (todo == null) {
    todo = findTodo(todoElement.parentNode.parentNode[TODO_ITEMID]);
    todoElement.parentNode.parentNode.classList.toggle("checked");
  }
  if (todo.isCompleted == true) {
    todo.isCompleted = false;
  } else {
    todo.isCompleted = true;
  }
  updateDataToStorage();
}
function removeTodo(todoElement) {
  let todoPosition = findTodoIndex(todoElement.parentNode[TODO_ITEMID]);
  let todo = findTodo(todoElement.parentNode[TODO_ITEMID]);

  if (todo == null) {
    todo = findTodo(todoElement.parentNode.parentNode[TODO_ITEMID]);
    todoPosition = findTodoIndex(
      todoElement.parentNode.parentNode[TODO_ITEMID]
    );
    todoElement.parentNode.parentNode.remove();
  } else {
    todoElement.parentNode.remove();
  }
  todos.splice(todoPosition, 1);

  updateDataToStorage();
}
function clearAllData() {
  const containerTODOList = document.getElementById(LIST_TODO_ID);
  const CompletedItems = containerTODOList.querySelectorAll(".checked");
  if (CompletedItems) {
    for (const item of CompletedItems) {
      item.remove();
    }
  }
}
function deleteAllComplete() {
  let listLength = 0;

  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].isCompleted === true) {
      todos.splice(i, 1);
      listLength++;
    }
  }

  if (listLength > 0) {
    user.completedBooks = 0;
    updateDataToStorage();
    clearAllData();

    // refreshDataFromTodos();
  }
}
function createButton(icon_name, class1, class2, eventListener) {
  const button = document.createElement("buton");
  button.className += class1 + class2;
  button.innerHTML =
    '<img src="./assets/img/' + icon_name + '.svg" alt="" class="">';
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}
function createCheckButton() {
  return createButton("icon-check", " btn", " todo_check", function (event) {
    todoCheckBox(event.target);
  });
}
function createDeleteButton() {
  return createButton("icon-cross", " btn", " todo_delete", function (event) {
    removeTodo(event.target);
  });
}
let movedFrom;
let movedTo;

function getStartIndex() {
  let child = document.querySelector(".draggable-source--is-dragging");
  let parent = child.parentNode;
  movedFrom = Array.prototype.indexOf.call(parent.children, child);
}
function getEndIndex() {
  let child = document.querySelector(".draggable-source--is-dragging");
  let parent = child.parentNode;
  movedTo = Array.prototype.indexOf.call(parent.children, child);
}

function storeSort() {
  var moveEle = movedFrom;
  var moveToIndx = movedTo;

  while (moveEle < 0) {
    moveEle += todos.length;
  }

  while (moveToIndx < 0) {
    moveToIndx = moveToIndx + todos.length;
  }
  if (moveToIndx >= todos.length) {
    var un = moveToIndx - todos.length + 1;
    while (un--) {
      todos.push(undefined);
    }
  }
  todos.splice(moveToIndx, 0, todos.splice(moveEle, 1)[0]);
  updateDataToStorage();
}

function storeSortFiltered(filter) {
  var moveEle = movedFrom;
  var moveToIndx = movedTo;

  let filteredArr = [];
  let filteredIndex = [];
  todos.forEach((e, i) => {
    if (e.isCompleted.toString() === filter) {
      filteredArr.push(e);
      filteredIndex.push(i);
    }
  });
  if (moveToIndx >= filteredArr.length) {
    var un = moveToIndx - filteredArr.length + 1;
    while (un--) {
      filteredArr.push(undefined);
    }
  }
  filteredArr.splice(moveToIndx, 0, filteredArr.splice(moveEle, 1)[0]);
  filteredIndex.forEach((e, index) => {
    todos.splice(e, 1, filteredArr[index]);
  });
  updateDataToStorage();
}
