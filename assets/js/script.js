let filter = "all";

document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todo-input");
  const todoClear = document.getElementById("clear-completed");
  const todoFilters = document.querySelectorAll("input[name='filter']");

  todoInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        e.preventDefault();
        addTodo(e.target.value, false);
      }
    }
  });
  todoFilters.forEach((filter) => {
    filter.addEventListener("change", filterCallback);
  });

  todoClear.addEventListener("click", function (event) {
    deleteAllComplete();
  });

  darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");

    if (darkMode !== "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  if (isStorageExist()) {
    loadDataFromStorage();
    loadUserData();
  }
  if (localStorage.getItem(STORAGE_KEY) == null) {
    addTodo("Complete Online Javascript Course", true);
    addTodo("Jog around the park 3x", false);
    addTodo("10 minutes meditation", false);
    addTodo("Read for 1 hour", false);
    addTodo("Pick up groceries", false);
    addTodo("Complete Todo App on Frontend Mentor", false);
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data saved.");
  loadUserData();
  fillUserData();
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromTodos(filter);
  loadUserData();
  fillUserData();
});

new Sortable(todo_container, {
  animation: 150,
  ghostClass: "todo-ghost",
  dragClass: "todo-drag",
  delay: 100,
  delayOnTouchOnly: true,
  onUpdate: function (evt) {
    console.log(evt.oldIndex);
    console.log(evt.newIndex);
    if (filter == "false" || filter == "true") {
      storeSortFiltered(evt.oldIndex, evt.newIndex, filter);
    } else {
      storeSort(evt.oldIndex, evt.newIndex);
    }
  },
});
