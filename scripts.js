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
    let dueDate = dateInputElement.value;

    const colorInputElement = document.querySelector('.js-color-input')
    const selectedColor = colorInputElement.value;

    if (name != '') {
      
      document.querySelector('.js-advice').innerHTML = ''
      
      if (dueDate.length === 0) {
        dueDate = 'Ø'
      }

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
      document.querySelector('.js-advice').innerHTML = `<div class="js-advice" style="
        position: absolute;
        text-align: center;
        top: -50px;
        border: none;
        background-color: red;
        padding: 8px 30px;
        border-radius: 50px;
        animation: float ease 3s;
        z-index: -2;">Preencha o primeiro campo</div>`
    }
  }

  function deleteTodo(index) {
    todoList.splice(index, 1);
    localStorage.setItem('todoListStorage', JSON.stringify(todoList));
    renderTodoList();
  }

  function detectKeydownEnter(event) {
    if (event.key === 'Enter') {
      addTodo()
    }
  }
