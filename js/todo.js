const myTasks = [
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

const tableBody = document.getElementById("task-list");
const newTaskBtn = document.getElementById('new-task-btn');
const taskContainer = document.getElementById('task-container');
const myModal = document.getElementById('modal');
const modalCreateBtn = document.getElementById('modal-create-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const editBtn = document.getElementById('modal-edit-btn');
const cancelEditBtn = document.getElementById('edit-cancel-btn');
const editModal = document.getElementById('edit-modal');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('filter-btn');

window.onload = function(){
    fillTodoTable();
}

//Setting and getting data
function saveTasksInLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    let tasksd = getTasksFromLocalStorage();
    console.log("Ucitani: ", tasksd);
}

function getTasksFromLocalStorage(){
    const localTasks = localStorage.getItem('tasks');
    
    if(localTasks){
        return JSON.parse(localTasks);
    } else {
        return [];
    }
}
if(localStorage.getItem('tasks') === null){
    saveTasksInLocalStorage(myTasks); //zasto ne radi?
}

//CRUD + CRUD helpers
function addNewTask(title, description){

    let tasks =  getTasksFromLocalStorage();
    let taskID = tasks.length + Math.floor(Math.random() * 10000000) ;

    let timestamp = Date.now()
    let date = new Date(timestamp);
    let dateFormated = formatDate(date);

    let newTask = {

        id: taskID,
        title: title,
        description: description,
        created: dateFormated,
        updated: dateFormated
    }

    tasks.push(newTask);
    saveTasksInLocalStorage(tasks);
    fillTodoTable();
}

function handleSubmit(event){
    event.preventDefault();

    let title = document.getElementById('task-title');
    let description = document.getElementById('task-description');

    if(title.value && description.value){
        addNewTask(title.value.trim(), description.value.trim());
    }else {
        alert("Please, enter all required data");
    }
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

function editTask(id){
    let tasks = getTasksFromLocalStorage();
    let taskForEditing = tasks.find( task => task.id === id);
    console.log(taskForEditing);

    if(taskForEditing){
        editModal.style.display = 'flex';
        taskContainer.style.display = 'none';

        document.getElementById('edit-title').value = taskForEditing.title;
        document.getElementById('edit-description').value = taskForEditing.description;

        document.getElementById('modal-edit-btn').onclick = function (){

            taskForEditing.title = document.getElementById('edit-title').value;
            taskForEditing.description = document.getElementById('edit-description').value;
            let timestamp = Date.now()
            let date = new Date(timestamp);
            let dateFormated = formatDate(date);
            taskForEditing.updated = dateFormated;
            console.log(dateFormated); //zasto ne radi?

            saveTasksInLocalStorage(tasks);
            
            editModal.style.display = 'none';
            taskContainer.style.dispslay = 'flex';
            fillTodoTable();
            location.reload();// zasto ne radi bez ovog?
        }
    }
}

function formatDate(date){

    let day = String(date.getDate()).padStart(2,'0');
    let month = String(date.getMonth() + 1).padStart(2,'0');
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0'); 
    let minutes = String(date.getMinutes()).padStart(2, '0'); 

    let dateString = `${day}.${month}.${year} ${hours}:${minutes}`;
    return dateString;
}

//Filter
function filterTasks(searchTerm){
    let data = getTasksFromLocalStorage();

    if(!searchTerm){
        fillTodoTable();
        return;
    }

    let filteredTasks = []; 

    data.forEach(task => {
        if (task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            task.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredTasks.push(task); 
        }
    });

    console.log(filteredTasks);
    fillFilteredTable(filteredTasks);
}

function fillFilteredTable(filteredTasks){
    tableBody.innerHTML = '';

    createTable(filteredTasks);
}

//Table filling
function fillTodoTable(){

    const tableData = getTasksFromLocalStorage();
    console.log("Dobijeni podaci: ", tableData);

    tableBody.innerHTML = '';

    createTable(tableData);
}

function createTable(tasks){

    tasks.forEach( task => {

        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = task.id;
        idCell.style.display = 'none';

        const titleCell = document.createElement('td');
        titleCell.textContent = task.title;

        const descriptCell = document.createElement('td');
        descriptCell.textContent = task.description;

        const createdCell = document.createElement('td');
        createdCell.textContent = task.created;

        const updatedCell = document.createElement('td');
        updatedCell.textContent = task.updated;

        const actionsCell = document.createElement('td');
        actionsCell.id = 'actions-cell';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

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

//Event listeners
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    console.log(searchTerm);
    filterTasks(searchTerm);
})

newTaskBtn.addEventListener('click', function (){
    myModal.style.display = 'flex';
    taskContainer.style.display = 'none';
})

modalCancelBtn.addEventListener('click', function (){
    myModal.style.display = 'none';
    taskContainer.syle.display = 'flex';
})

cancelEditBtn.addEventListener('click', function(){
    editModal.style.display = 'none';
    taskContainer.style.display = 'flex';
})

modalCreateBtn.addEventListener('click', function (event){
    event.preventDefault();
    handleSubmit(event);

    myModal.style.display = 'none'; 
    taskContainer.style.display = 'flex';
});