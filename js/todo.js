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
        title: "Return book",
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

console.log(getTasksFromLocalStorage());