const LIST_TODO_ID = "todo-container";

const TODO_ITEMID = "itemId";

function fillUserData() {
  console.log(user);
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

  console.log(todoElement);
  console.log(todo);
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
