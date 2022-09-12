const doc = document.documentElement;
const todosNode = document.querySelector('.task__container');
const inputNode = document.querySelector(".js-input");
const btnNode = document.querySelector(".js-btn");
const error = document.querySelector(".forError");
let todos = []

// 6s

function addTodo(text) {
   const todo = {
      text,
      done: false,
      id: `${Math.random()}`
   }
   todos.push(todo);
   error.innerHTML = "_";
}

function deleteTodo(id) {
   todos.forEach(todo => {
      if (todo.id === id) {
         todo.done = true;
      }
   })
   error.innerHTML = "_";
}

function render() {
   let html = '';
   
   todos.forEach(todo => {
      if (todo.done) {
         return;
      }

      html += `<div class="js-task">
         ${todo.text}
         <button class="js-delBtn" data-id="${todo.id}">Х</button>
      </div>`;

   })
   todosNode.innerHTML = html;
}

function addTask() {
   const text = inputNode.value;

   function todoCheckText(newText) {
      for (let item of todos) {
         if (item.text == newText && item.done == false) {
            return true
         }
      }
      return false
   }
   
   if (text == "") {
      error.innerHTML = "_Шось нэ так (Строка пустая)";
      return undefined
   } else if (todos.length > 10) {
      error.innerHTML = "_Шось нэ так (лимит Туду 10 шт)";
      return undefined
   } else if (todoCheckText(text)) {
      error.innerHTML = "_Шось нэ так (Задание уже существует)";
      return undefined
   }

   addTodo(text);
   render();

}

function delTask() {
   if (event.path[0] == "button.js-delBtn") {
      return;
   }

   const id = event.target.dataset.id;

   deleteTodo(id);

   render()
}





// 9

btnNode.addEventListener("click", () => {
   addTask()
})

todosNode.addEventListener("click", (event) => {
   delTask()
})

doc.addEventListener( 'keyup', (event) => {
   if (event.code === 'Enter') {
      addTask()
    }
 });

doc.addEventListener( 'keyup', (event) => {
   console.log(event.code)
   if (event.code === 'Delete') {
      todos.pop();
      render();
    }
 });

render();




