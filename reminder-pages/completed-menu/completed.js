const returnButton = document.querySelector('.js-return-button');
const listContainer = document.querySelector('.js-list-container');
const today = dayjs().format('DD-MM-YYYY');

let reminderData = JSON.parse(localStorage.getItem('reminderData'));
let listContainerHTML = '';
let count = 1;

returnButton.addEventListener('click', () => {
    window.location.assign('../../index.html');
});

function deleteTodo(elementOrId, todoTitle) {
    const el = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
    if (!el) return;
    el.remove();

    // Remove from localStorage
    if (todoTitle && reminderData) {
        reminderData = reminderData.filter(todo => todo.title !== todoTitle);
        localStorage.setItem('reminderData', JSON.stringify(reminderData));
    }
}

window.deleteTodo = deleteTodo;

if (reminderData) {
    count = 1;
    reminderData.forEach((todo) => {
        if (todo.completed) {
                if (!todo.urgent) {
                    listContainerHTML += `
                    <div class="todo-container" id="morningTodoElement${count}">
                        <div class="todo-title-container">
                            <p class="todo-container-title">${todo.title}</p>
                            <button class="todo-delete-button" id="morningTodoButton${count}" onclick="deleteTodo('morningTodoElement${count}', '${todo.title}')">Delete</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else {
                    listContainerHTML += `
                    <div class="todo-container" id="morningTodoElement${count}">
                        <div class="todo-title-container">
                            <p class="todo-container-title todo-container-title-urgent">${todo.title}</p>
                            <button class="todo-delete-button" id="morningTodoButton${count}" onclick="deleteTodo('morningTodoElement${count}', '${todo.title}')">Delete</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                }
                count++;
            }
    });
}

listContainer.innerHTML = listContainerHTML;