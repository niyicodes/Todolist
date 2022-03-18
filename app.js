// Selecting DOM elements
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskFilter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBTN = document.querySelector('.clear-tasks');

// Load all event listerners
loadAllEventListeners();

// load all listeners
function loadAllEventListeners(){
  // DOM lOAD
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task
  form.addEventListener('submit', addTask);
  // remove task
  taskList.addEventListener('click', removeTask);
  // Clear task
  clearBTN.addEventListener('click', clearTasks);
  // Filter tasks
  taskFilter.addEventListener('keyup', filterTasks);
}

// Get tasks from the local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task){
  // create  li
  const li = document.createElement('li');
  // add class to li
  li.className = 'collection-item';
  // create a text node and append
  li.appendChild(document.createTextNode(task));
  // create a link tag
  const link = document.createElement('a');
  // add class to link
  link.className = 'delete-item secondary-content'
  // append an html into the link
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);

  //append li to UI
  taskList.appendChild(li);
  })
}

function addTask(e){
  // check input field is not empty
  if(taskInput.value === '') {
    alert('Please type in the input box')
  }

  // create  li
  const li = document.createElement('li');
  // add class to li
  li.className = 'collection-item';
  // create a text node and append
  li.appendChild(document.createTextNode(taskInput.value));
  // create a link tag
  const link = document.createElement('a');
  // add class to link
  link.className = 'delete-item secondary-content'
  // append an html into the link
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);

  //append li to UI
  taskList.appendChild(li);

  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);
  
  // clear input field

  taskInput.value = '';

  e.preventDefault();
};

// Store tasks
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();

      // remove from local storage
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }

  e.preventDefault();
};

// Remove from LS
function removeTaskFromLS(taskItem){
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task
function clearTasks(e){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  taskInput.value = ''; 
  taskFilter.value = '';

  // clear from localstorage
  clearFromLS();


  e.preventDefault();
};
// Clear from LS
function clearFromLS(){
  localStorage.clear();
}

// Filter tasks
function filterTasks(e){
  // Get filter input
  const text = e.target.value.toLowerCase();

  // loop through the list items
  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none'
    }
  });
};