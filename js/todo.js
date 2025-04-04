const tasks = [
    {
        id: 0,
        title: "Appoitment",
        description: "Make a doctors appoitment",
        created: "03.03.2025.",
        updated: "03.03.2025."
    },
    {
        id: 1,
        title: "Return a book",
        description: "Return a book to a local library",
        created: "02.03.2025.",
        updated: "02.03.2025."
    }
]

function saveTasksInLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

saveTasksInLocalStorage(tasks);

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
        actionsCell.style.display = 'flex';
        actionsCell.style.gap = '10px';

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

}

function deleteTask(id){
    
}

window.onload = function(){
    fillTodoTable();
}