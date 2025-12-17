let listOfTasks = [];

const taskCardList = document.getElementsByClassName('task-card-list')[0];
const completedTaskCardList = document.getElementsByClassName('completed-card-list')[0];

let taskName = document.getElementById('task-input');
let taskPriority = document.getElementById('priority-input');

async function showTasks() {
  taskCardList.innerHTML = ``;
  completedTaskCardList.innerHTML = ``;

  showTasksWithLoop(listOfTasks);
}

function showTasksWithLoop(listOfTasks) {
  for (let toAdd of listOfTasks) {
    console.log(toAdd.status);
    if (!toAdd.status) {
      taskCardList.innerHTML += `
                <div class="task-card">
                    <div>
                        <span id="task-priority"
                              style="border: #7704bd 1px solid; border-radius: 100%; font-size: 14px; padding: max(7px); text-align: center; width: 14px; height: 14px">${toAdd.priority}</span>
                        <span id="task-name">${toAdd.name}</span>
                    </div>
                    <div>
                        <span id="delete-button" class="delete-action" onclick="deleteButtonHandler('${toAdd._id}')">Delete</span>
                        <input id="success-button" type="checkbox" class="task-success" onclick="completeButtonHandler('${toAdd._id}')">
                    </div>
                </div>
    `;
    } else if (toAdd.status) {
      completedTaskCardList.innerHTML += `
                <div class="task-card">
                    <div>
                        <span id="task-priority"
                              style="border: #7704bd 1px solid; border-radius: 100%; font-size: 14px; padding: max(7px); text-align: center; width: 14px; height: 14px">${toAdd.priority}</span>
                        <span id="task-name">${toAdd.name}</span>
                    </div>
                    <div>
                        <span id="delete-button" class="delete-action" onclick="deleteCompletedButtonHandler('${toAdd._id}')">Delete</span>
                    </div>
                </div>
                `;
    }
  }
}

showTasks();

function checkNumber() {
  if (taskPriority.value > 10) {
    taskPriority.value = 10;
  } else if (taskPriority.value < 1) {
    taskPriority.value = 1;
  }
}

async function createButtonHandler() {
  taskCardList.innerHTML = ``;
  completedTaskCardList.innerHTML = ``;

  if (taskName.value.trim() == '' || taskName.value == null) {
    alert('Please enter a task name');
    return;
  } else if (taskPriority.value.trim() == '' || taskPriority.value == null) {
    alert('Please enter a task priority');
    return;
  }

  let task = { name: taskName.value, priority: taskPriority.value, status: false };

  listOfTasks.push(task);

  showTasksWithLoop(listOfTasks);
}

// async function deleteButtonHandler(id){
//     const response = await fetch(`http://localhost:8080/tasks/${id}`, {
//         method: "DELETE"
//     })
//
//     taskCardList.innerHTML = ``
//     completedTaskCardList.innerHTML = ``
//     const listOfTasks = await response.json();
//     showTasksWithLoop(listOfTasks);
// }

// async function completeButtonHandler(id){
//     const response = await fetch(`http://localhost:8080/tasks/${id}`, {
//         method: "PUT"
//     })
//
//     taskCardList.innerHTML = ``
//     completedTaskCardList.innerHTML = ``
//
//     let listOfTasks = await response.json();
//     showTasksWithLoop(listOfTasks);
// }

// function deleteCompletedButtonHandler(id){
//     deleteButtonHandler(id)
// }

// async function sortByPriorityButtonHandler(){
//     // let sortedList = []
//     // let sortedCompletedList = []
//     //
//     // try {
//     //     const response = await fetch(backEnd);
//     //     listOfTasks = await response.json();
//     // } catch (e) {
//     //     console.log(e)
//     // }
//     //
//     // for(let task of listOfTasks){
//     //     if(task.status === false){
//     //         sortedList.push(task)
//     //     }
//     //     else{
//     //         sortedCompletedList.push(task)
//     //     }
//     // }
//     //
//     // const compareFn = (a, b) => b.priority - a.priority;
//     // sortedList.sort(compareFn);
//     // sortedCompletedList.sort(compareFn);
//     //
//     // taskCardList.innerHTML = ``
//     // completedTaskCardList.innerHTML = ``
//     //
//     // for (let toAdd of sortedList) {
//     //     taskCardList.innerHTML += `
//     //             <div class="task-card">
//     //                 <div>
//     //                     <span id="task-priority"
//     //                           style="border: #7704bd 1px solid; border-radius: 100%; font-size: 14px; padding: max(7px); text-align: center; width: 14px; height: 14px">${toAdd.priority}</span>
//     //                     <span id="task-name">${toAdd.name}</span>
//     //                 </div>
//     //                 <div>
//     //                     <span id="delete-button" class="delete-action" onclick="deleteButtonHandler('${toAdd._id}')">Delete</span>
//     //                     <input id="success-button" type="checkbox" class="task-success" onclick="completeButtonHandler('${toAdd._id}')">
//     //                 </div>
//     //             </div>
//     //     `
//     // }
//     // for (let toAdd of sortedCompletedList) {
//     //     completedTaskCardList.innerHTML += `
//     //             <div class="task-card">
//     //                 <div>
//     //                     <span id="task-priority"
//     //                           style="border: #7704bd 1px solid; border-radius: 100%; font-size: 14px; padding: max(7px); text-align: center; width: 14px; height: 14px">${toAdd.priority}</span>
//     //                     <span id="task-name">${toAdd.name}</span>
//     //                 </div>
//     //                 <div>
//     //                     <span id="delete-button" class="delete-action" onclick="deleteCompletedButtonHandler('${toAdd._id}')">Delete</span>
//     //                 </div>
//     //             </div>
//     //             `
//     // }
// }
