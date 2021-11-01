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
    console.log("hai");
    deleteAllComplete();
  });

  darkModeToggle.addEventListener("click", () => {
    // get their darkMode setting
    darkMode = localStorage.getItem("darkMode");

    // if it not current enabled, enable it
    if (darkMode !== "enabled") {
      enableDarkMode();
      // if it has been enabled, turn it off
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
  console.log("Data berhasil disimpan.");
  loadUserData();
  fillUserData();
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromTodos(filter);
  loadUserData();
  fillUserData();
});
