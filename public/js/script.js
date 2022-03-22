const form = document.querySelector('form');
const tasksContainer = document.querySelector('#tasks-container');

const getTasks = async () => {
    try {
        const response = await fetch('/api/v1/tasks');
        const data = await response.json();
        const tasks = data.tasks;
        tasks.map(task => {
            document.body.innerHTML += `<div class="task-element">
                                            <p>${task.name}</p>
                                            <div class="buttons-div">
                                                <a href='edit_task.html?task=${task._id}'>Edit</a>
                                                <button type="button" id="delete-btn" data-id="${task._id}">Delete</button>
                                            </div>
                                          </div>`;
        })
    } catch (error) {
        console.log(error)
    }
}

const getOneTask = (task) => {
    tasksContainer.innerHTML += `<div class="task-element">
                                    <p>${task.name}</p>
                                    <button type="button" id="edit-btn" data-id="${task._id}>Edit</button>
                                    <button type="button" id="delete-btn" data-id="${task._id}">Delete</button>
                                 </div>`;
    addDeleteEvent();
}

const createTask = async (event) => {
    try {
        const name = event.target['new-task'].value;
        const request = await fetch('/api/v1/tasks/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name": name })
        });
        const task = await request.json();
        return task;
    } catch (error) {
        console.log(error)
    }

}

const deleteTask = async (event) => {
    try {
        const taskID = event.target.dataset.id;
        await fetch(`/api/v1/tasks/${taskID}`, {
            method: 'DELETE'
        });
        event.target.parentElement.remove();
    } catch (error) {
        console.log(error)
    }
}

const addDeleteEvent = () => {
    const deleteButtons = document.querySelectorAll('#delete-btn');
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteTask);
        })
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newTask = await createTask(event);
    getOneTask(newTask);
    addDeleteEvent();
    form.reset();
})

getTasks()
    .then(() => addDeleteEvent());