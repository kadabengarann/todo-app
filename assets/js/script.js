const todoInput = document.getElementById("todo-input");

document.addEventListener("DOMContentLoaded", function () {
  todoInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        e.preventDefault();
        addTodo(e.target.value, false);
      }
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
  refreshDataFromTodos();
  loadUserData();
  fillUserData();
});
