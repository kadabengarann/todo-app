


const todoContainer = document.getElementById("todo-container");
const todo_check = todoEl.querySelector(".todo_check");
      const todoEl = document.createElement("li");

   todo_check.addEventListener("click", function ()  {
      // change the checked status of the element
      todoEl.classList.toggle("todo__elem--checked");
      // refresh display of elements accordingly
       refreshFilters();
   });