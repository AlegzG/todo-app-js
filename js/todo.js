const tasks = [
    {
        id: 0,
        title: "Appoitment",
        description: "Make a doctors appoitment",
        created: "03.03.2025 15:00",
        updated: "03.03.2025 15:00"
    },
    {
        id: 1,
        title: "Return a book",
        description: "Return a book to a local library",
        created: "02.03.2025 12:00",
        updated: "02.03.2025 12:00"
    }
]

saveTasksInLocalStorage(tasks);

const newTaskBtn = document.getElementById('new-task-btn');
const taskContainer = document.getElementById('task-container');

const myModal = document.getElementById('modal');
const modalCreateBtn = document.getElementById('modal-create-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const modalForm = document.getElementById('modal-form');

newTaskBtn.addEventListener('click', function (){
    myModal.style.display = 'flex';
    taskContainer.style.display = 'none';
})

modalCancelBtn.addEventListener('click', function (){
    myModal.style.display = 'none';
    taskContainer.syle.display = 'flex';
})

modalCreateBtn.addEventListener('submit', handleSubmit());

function saveTasksInLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage(){
    const localTasks = localStorage.getItem('tasks');
    
    if(localTasks){
        return JSON.parse(localTasks);
    } else {
        return [];
    }
}

function fillTodoTable(){

    const tableData = getTasksFromLocalStorage();
    const tableBody = document.getElementById("task-list");

    tableBody.innerHTML = '';

    tableData.forEach( data => {

        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.textContent = data.id;
        idCell.style.display = 'none';

        const titleCell = document.createElement('td');
        titleCell.textContent = data.title;

        const descriptCell = document.createElement('td');
        descriptCell.textContent = data.description;

        const createdCell = document.createElement('td');
        createdCell.textContent = data.created;

        const updatedCell = document.createElement('td');
        updatedCell.textContent = data.updated;

        const actionsCell = document.createElement('td');
        actionsCell.id = 'actions-cell';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(data.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(data.id));

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);


        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(descriptCell);
        row.appendChild(createdCell);
        row.appendChild(updatedCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);

    });
}

function editTask(id){

    let tasks = getTasksFromLocalStorage();

    let taskForEditing = tasks.filter( task => task.id === id);
    // POSLE NASTAVI!!!!!

}

function deleteTask(id){

    let tasks = getTasksFromLocalStorage();

    if(tasks){
        tasks = tasks.filter( task => task.id !== id);
    }else{
        alert("There are no tasks to delete!");
    } 

    saveTasksInLocalStorage(tasks);
    fillTodoTable();
}

function addNewTask(title, description){

    let tasks =  getTasksFromLocalStorage();
    let taskID = tasks.length + Math.random() * 10000000;
    console.log(tasks.length);
    let timestamp = Date.now()
    let date = new Date(timestamp);

    let day = String(date.getDate()).padStart(2,'0');
    let month = String(date.getMonth() + 1).padStart(2,'0');
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0'); 
    let minutes = String(date.getMinutes()).padStart(2, '0'); 

    let dateString = `${day}.${month}.${year} ${hours}:${minutes}`;


    let newTask = {
        id: taskID,
        title: title,
        description: description,
        created: dateString,
        uprated: dateString
    }

    tasks.push(newTask);
    saveTasksInLocalStorage(tasks);
    fillTodoTable();
}

function handleSubmit(){

    let title = document.getElementById('task-title');
    let description = document.getElementById('task-description');
    console.log(title.value + description.value);

    if(title && description){
        addNewTask(title, description);
        console.log(title + description);
    
    }else {
        alert("Please, enter all required data");
    }
}

window.onload = function(){
    fillTodoTable();
}

