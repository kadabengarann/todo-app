const STORAGE_KEY = "TODO_APP_STORAGE";
const USER_STORAGE_KEY = "USER_TODO_APP";

let todos = [];
let user = {
  completedTodos: 0,
  incompletedTodos: 0,
};
let darkMode = localStorage.getItem("darkMode");

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kao tak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(todos);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
  saveUserData();
}
function loadUserData() {
  const serializedData = localStorage.getItem(USER_STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) user = data;
  let todoCount = countTodo();
  user.completedTodos = todoCount[1];
  user.incompletedTodos = todoCount[0];
  saveUserData();
}

function saveUserData() {
  if (user.completedTodos < 0) {
    user.completedTodos = 0;
  }
  if (user.incompletedTodos < 0) {
    user.incompletedTodos = 0;
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) todos = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeTodoObject(nameTodo, isCompleted) {
  return {
    id: +new Date(),
    nameTodo,
    isCompleted,
  };
}

function findTodo(todoId) {
  for (todo of todos) {
    if (todo.id === todoId) return todo;
  }
  return null;
}

function findTodoIndex(todoId) {
  let index = 0;
  for (todo of todos) {
    if (todo.id === todoId) return index;

    index++;
  }
  return -1;
}
function refreshDataFromTodos(filter) {
  const containerTODOList = document.getElementById(LIST_TODO_ID);
  while (containerTODOList.firstChild) {
    containerTODOList.removeChild(containerTODOList.lastChild);
  }
  let newTodo;
  for (todo of todos) {
    if (filter == "all") {
      newTodo = makeTodo(todo.nameTodo, todo.isCompleted);
      newTodo[TODO_ITEMID] = todo.id;
      containerTODOList.append(newTodo);
    } else {
      console.log(filter);
      if (todo.isCompleted.toString() == filter) {
        newTodo = makeTodo(todo.nameTodo, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;
        containerTODOList.append(newTodo);
      }
    }
  }
  fillUserData();
}
function countTodo() {
  let count = [0, 0];
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].isCompleted === true) {
      count[1]++;
    } else {
      count[0]++;
    }
  }
  return count;
}
