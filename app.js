let inputText = document.querySelector(".inputText");
let date=document.querySelector(".date");
let submitBtn = document.querySelector(".submitBtn");
let todoList = document.querySelector(".todo-list");
let filter=document.querySelector(".filter");
//adding today date in TODO App
const options={weekday:"long",month:"short",day:"numeric"}
const today=new Date();
date.innerHTML=today.toLocaleDateString("en-US",options)

  submitBtn.addEventListener("click", (e) => {
    //prevent from page refresh
    e.preventDefault();
    if (inputText.value.length < 1) {
      alert("Please add todo item");
      
    } else {
      let todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      //create a list
      let newTodo = document.createElement("li");
      newTodo.innerText = inputText.value;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      //add Todo to local storage
      saveLocalTodos(inputText.value);

      //creating checked button
      let checkedBtn = document.createElement("button");
      checkedBtn.innerHTML = '<i class="fa fa-check-circle"></i>';
      checkedBtn.classList.add("checked");
      todoDiv.appendChild(checkedBtn);

      //creating a delete button
      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';
      deleteBtn.classList.add("delete");
      todoDiv.appendChild(deleteBtn);

      //append to list
      todoList.appendChild(todoDiv);
      //clear the input
      inputText.value = "";
    }
  });


  todoList.addEventListener("click", (e) => {
    let item = e.target;
    //checked the item
    if (item.classList && item.classList[0] === "checked") {
      let todo = item.parentElement;
      todo.classList.toggle("completed");
    }
    //delete the item
    if (item.classList && item.classList[0] === "delete") {
      let todo = item.parentElement;
      removeLocalTodos(todo);
     todo.remove();
      
    }
  });

  filter.addEventListener("change",(e)=>{
   //use of children ensures only direct elements are considered
   let todos=todoList.children;
    Array.from(todos).forEach(function(todo){
      switch (e.target.value){
         case "all":
            todo.style.display='flex';
            break;
         case "complete":
            if(todo.classList.contains('completed'))
            {
               todo.style.display='flex';
            
            }
            else{
               todo.style.display='none';
            }
            break;

            case "incomplete":
               if(!todo.classList.contains('completed'))
               {
                  todo.style.display='flex';
   
               }
               else{
                  todo.style.display='none';
               }
               break;
            
      }

   });

  });
  function saveLocalTodos(todo){
   // check if local storage already have value
   let todos;
   if(localStorage.getItem('todos')==null){
      todos=[];
   }
   else{
      todos=JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);
   localStorage.setItem('todos',JSON.stringify(todos));
  }

  // add eventlistener
  document.addEventListener('DOMContentLoaded',getTodos);

  function getTodos(){
   // check if local storage already have value
   let todos;
   if(localStorage.getItem('todos')==null){
      todos=[];
   }
   else{
      todos=JSON.parse(localStorage.getItem('todos'));
   }

   todos.forEach(function(todo)
   {
      
      let todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      //create a list
      let newTodo = document.createElement("li");
      newTodo.innerText=todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);

      //creating checked button
      let checkedBtn = document.createElement("button");
      checkedBtn.innerHTML = '<i class="fa fa-check-circle"></i>';
      checkedBtn.classList.add("checked");
      todoDiv.appendChild(checkedBtn);

      //creating a delete button
      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';
      deleteBtn.classList.add("delete");
      todoDiv.appendChild(deleteBtn);

      //append to list
      todoList.appendChild(todoDiv);

   });

  }
  function removeLocalTodos(todo){
   // check if local storage already have value
   let todos;
   if(localStorage.getItem('todos')==null){
      todos=[];
   }
   else{
      todos=JSON.parse(localStorage.getItem('todos'));
   }
   
   localStorage.setItem('todos',JSON.stringify(todos));
   let todoIndex=todo.children[0].innerText;
   //splice remove the item  
   todos.splice(todos.indexOf(todoIndex),1);
   localStorage.setItem("todos",JSON.stringify(todos));

  }
