const input = $("input");
const addButton = $(".add-button");
const todosHtml = $(".todos");
const emptyImage = $(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = $(".delete-all");
const filters = $(".filter");
let filter = "";

showTodos();

function getTodoHtml(todo, index) {
    if (filter && filter != todo.status) {
        return "";
    }
    let checked = todo.status == "completed" ? "checked" : "";
    return `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)">
        <i class="fa fa-times"></i>
      </button>
    </li>
  `;
}

function showTodos() {
    if (todosJson.length == 0) {
        todosHtml.html("");
        emptyImage.show();
    } else {
        todosHtml.html(todosJson.map(getTodoHtml).join(""));
        emptyImage.hide();
    }
    console.log(todosJson);
}

function addTodo(todo) {
    input.val("");
    todosJson.push({
        name: todo,
        status: "pending",
    });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

input.on("keyup", function (e) {
    let todo = input.val().trim();
    if (!todo || e.key != "Enter") {
        return;
    }
    addTodo(todo);
});

addButton.on("click", function () {
    let todo = input.val().trim();
    if (!todo) {
        return;
    }
    addTodo(todo);
});

function updateStatus(todo) {
    let todoName = $(todo).parent().find("span");
    if (todo.checked) {
        todoName.addClass("checked");
        todosJson[todo.id].status = "completed";
    } else {
        todoName.removeClass("checked");
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo) {
    const index = $(todo).data("index");
    todosJson.splice(index, 1);
    showTodos();
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

filters.each(function () {
    $(this).on("click", function (e) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            filter = "";
        } else {
            filters.removeClass("active");
            $(this).addClass("active");
            filter = $(this).data("filter");
        }
        showTodos();
    });
});

deleteAllButton.on("click", function () {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    filters.removeClass("active");
    filter = "";
    showTodos();
});