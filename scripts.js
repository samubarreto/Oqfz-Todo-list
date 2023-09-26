let todoList = JSON.parse(localStorage.getItem('todoListStorage')) || [];
renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate, selectedColor } = todoObject;
    const html = `
      <div class="div-gerada" style="background-color: ${selectedColor};">
        <input type="checkbox" class="checkbox">
        <p class="todo">${name}</p>
        <p class="todo-date">${dueDate}</p>
        <button class="remove-button" onclick="deleteTodo(${i})">remove</button>
      </div>
    `;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-date-input');
  const dueDate = dateInputElement.value;

  const colorInputElement = document.querySelector('.js-color-input')
  const selectedColor = colorInputElement.value;

  if (name != '' && dueDate != '') {
    todoList.push({
      name,
      dueDate,
      selectedColor
    });
  
    inputElement.value = '';
    dateInputElement.value = '';
  
    localStorage.setItem('todoListStorage', JSON.stringify(todoList));
  
    renderTodoList();
  } else {
    console.log('deu bo');
  }

}

function deleteTodo(index) {

  todoList.splice(index, 1);

  localStorage.setItem('todoListStorage', JSON.stringify(todoList));

  renderTodoList();
}
