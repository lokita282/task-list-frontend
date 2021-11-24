//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
  //DOM Load event 
  document.addEventListener('DOMContentLoaded', getTasks)//DOMContentLoaded is an event that gets called right after the dom has loaded
  //Add task event 
  form.addEventListener('submit', addTask);
  //Remove task event 
  taskList.addEventListener('click', removeTask);
  // Clear task event 
  clearBtn.addEventListener('click', clearTasks)
  //Filter tasks event
  filter.addEventListener('keyup',filterTasks)
}

//Get Tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //we basically want to create the dom element
    //create li element
    const li = document.createElement('li');
    //Add class name 
    li.className = 'collection-item'//in materialize, if you want your ul to look good, ul should have a class of collection and each list item shold have a class of collection-item
    //Create Text node and append to the li 
    li.appendChild(document.createTextNode(task));
    //Create new link element which is the cross to delete a task
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';//if u want something to the right of the lement in materialise it has to have the secondary content class
    //Add icon HTML
    link.innerHTML='<i class="fa fa-remove" </i>';//fa fa-remove is the x mark icon
    //Append the link to the li
    li.appendChild(link);
    //append the li to the ul (which is defined as the Task List)
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert("Add a task")
  }
  //create li element
  const li = document.createElement('li');
  //Add class name 
  li.className = 'collection-item'//in materialize, it=f you want your ul to look good, ul should have a class of collection and each list item shold have a class of collection-item
  //Create Text node and append to the li 
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element which is the cross to delete a task
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';//if u want something to the right of the lement in materialise it has to have the secondary content class
  //Add icon HTML
  link.innerHTML='<i class="fa fa-remove" </i>';//fa fa-remove is the x mark icon

  //Append the link to the li
  li.appendChild(link);
 
  //append the li to the ul (which is defined as the Task List)
  taskList.appendChild(li);

  //Store in the local storage 
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value="";

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);//adding it on to the array

  localStorage.setItem('tasks', JSON.stringify(tasks))
}//thus it is being persisted to local storage 

//Remove Task
function removeTask(e){
  //removing from the DOM
  if (e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    //Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);//we pass in the actual element whichis the li
    }
  }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task){
      tasks.splice(index, 1);
    }

  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(){
  // taskList.innerHTML = ''

  //Faster - while there is a first child, remove the first child
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //Clear from LS
  clearTasksFromLocalStorage();
}

//clear tasks from ls
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block'//if there is no match then it will show a -1. So if it it not equal to -1, we set it to block so that it shows
    }else{
      task.style.display = 'none'//no match so we are going to set the display property to none
    }
  }); //we can use forEach because querySelectorAll returns a node list unlike getElementBy... etc that returns an HTML collection which we have to convert into an array to be able to use forEach
}


// function showApCalc(e){
//   //e.preventDefault();
//   console.log('yes')
//    //if (AP.style.display === 'none'){
//     AP.style.display = 'block'
//     formAp.style.display = 'block';
//   resultsAp.style.display = 'block';
//   totalTasks.style.display = 'block'
//   // }
//   // if(resultsGp.style.display === 'block' && GP.style.display === 'block'){
//     resultsGp.style.display = 'none' 
//     GP.style.display = 'none'
//   // }
   

// }

// function showGpCalc(e){
//   //e.preventDefault();
//   AP.style.display = 'none'
//   formAp.style.display = 'none';
//   resultsAp.style.display = 'none';
//   totalTasks.style.display = 'none'

//   GP.style.display = 'block'
//   formGp.style.display = 'block';
//   resultsGp.style.display = 'block';
//   console.log('correct')
 

// }