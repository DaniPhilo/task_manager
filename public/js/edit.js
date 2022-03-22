const form = document.querySelector('form');
const title = document.querySelector('h2');
const button = document.querySelector('input[type="submit"]');
const taskId = new URLSearchParams(window.location.search).get('task');

const getTaskName = async () => {
    const response = await fetch(`/api/v1/tasks/${taskId}`);
    const data = await response.json();
    return data.task.name;
}

const setName = async () => {
    const taskName = await getTaskName();
    title.innerText = taskName;
}

setName();

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newTask = event.target['edit-task'].value;

    await fetch(`api/v1/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": newTask })
    });

    await setName();
    button.setAttribute('value', 'Updated!');
    form.reset();
});