const returnButton = document.querySelector('.js-return-button');
const morningContainerElement = document.querySelector('.js-morning-container');
const afternoonContainerElement = document.querySelector('.js-afternoon-container');
const tonightContainerElement = document.querySelector('.js-tonight-container');
const today = dayjs().format('DD-MM-YYYY');

let reminderData = JSON.parse(localStorage.getItem('reminderData')) || [];
const savedCheckedTodos = JSON.parse(localStorage.getItem('checkedCheckboxes')) || [];
const checkedTodoIds = new Set(savedCheckedTodos.filter(todo => todo.state).map(todo => todo.id));

returnButton.addEventListener('click', () => {
    window.location.assign('../../index.html');
});

let todoMorningContainerHTML = '';
let todoAfternoonContainerHTML = '';
let todoTonightContainerHTML = '';
let count = 1;

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

function flagTodo(elementOrId, todoTitle, buttonId) {
    if (todoTitle && reminderData) {
        const storedData = JSON.parse(localStorage.getItem('reminderData'));
        storedData.forEach((todo) => {
            if (todo.title === todoTitle) {
                todo.flagged = true;
            }
        });
        localStorage.setItem('reminderData', JSON.stringify(storedData));
        const button = document.getElementById(buttonId);
        button.innerHTML = 'UNFLAG';
    }
}

window.flagTodo = flagTodo;

function unflagTodo(elementOrId, todoTitle, buttonId) {
    if (todoTitle && reminderData) {
        const storedData = JSON.parse(localStorage.getItem('reminderData'));
        storedData.forEach((todo) => {
            if (todo.title === todoTitle) {
                todo.flagged = false;
            }
        });
        localStorage.setItem('reminderData', JSON.stringify(storedData));
        const button = document.getElementById(buttonId);
        button.innerHTML = 'FLAG';
    }
}

window.unflagTodo = unflagTodo;

if (reminderData) {
    reminderData.forEach((todo, index) => {
        if (today === todo.date) {
            if (!todo.flagged) {
                if (todo.time.includes('AM') && !todo.urgent) {
                    todoMorningContainerHTML += `
                    <div class="todo-container" id="morningTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="morningTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`morningTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title">${todo.title}</p>
                            <button class="todo-delete-button" id="morningTodoButton${index}" onclick="deleteTodo('morningTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="flagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">FLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else if (todo.time.includes('AM')) {
                    todoMorningContainerHTML += `
                    <div class="todo-container" id="morningTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="morningTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`morningTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title todo-container-title-urgent">${todo.title}</p>
                            <button class="todo-delete-button" id="morningTodoButton${index}" onclick="deleteTodo('morningTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="flagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">FLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else if ((todo.time.includes('12:') || todo.time.includes('01:') || todo.time.includes('02:') || todo.time.includes('03:') || todo.time.includes('04:') || todo.time.includes('05:') || todo.time.includes('06:')) && !todo.urgent) {
                    todoAfternoonContainerHTML += `
                    <div class="todo-container" id="afternoonTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="afternoonTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`afternoonTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title">${todo.title}</p>
                            <button class="todo-delete-button" id="afternoonTodoButton${index}" onclick="deleteTodo('afternoonTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="flagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">FLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else if (todo.time.includes('12:') || todo.time.includes('01:') || todo.time.includes('02:') || todo.time.includes('03:') || todo.time.includes('04:') || todo.time.includes('05:') || todo.time.includes('06:')) {
                    todoAfternoonContainerHTML += `
                    <div class="todo-container" id="afternoonTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="afternoonTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`afternoonTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title todo-container-title-urgent">${todo.title}</p>
                            <button class="todo-delete-button" id="afternoonTodoButton${index}" onclick="deleteTodo('afternoonTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="flagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">FLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else if (!todo.urgent) {
                    todoTonightContainerHTML += `
                    <div class="todo-container" id="tonightTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="tonightTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`tonightTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title">${todo.title}</p>
                            <button class="todo-delete-button" id="tonightTodoButton${index}" onclick="deleteTodo('tonightTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="flagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">FLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else {
                    todoTonightContainerHTML += `
                    <div class="todo-container" id="tonightTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="tonightTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`tonightTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title todo-container-title-urgent">${todo.title}</p>
                            <button class="todo-delete-button" id="tonightTodoButton${index}" onclick="deleteTodo('tonightTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="flagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">FLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                }
            } else {
                if (todo.time.includes('AM') && !todo.urgent) {
                    todoMorningContainerHTML += `
                    <div class="todo-container" id="morningTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="morningTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`morningTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title">${todo.title}</p>
                            <button class="todo-delete-button" id="morningTodoButton${index}" onclick="deleteTodo('morningTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="unflagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">UNFLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else if (todo.time.includes('AM')) {
                    todoMorningContainerHTML += `
                    <div class="todo-container" id="morningTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="morningTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`morningTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title todo-container-title-urgent">${todo.title}</p>
                            <button class="todo-delete-button" id="morningTodoButton${index}" onclick="deleteTodo('morningTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="unflagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">UNFLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else if ((todo.time.includes('12:') || todo.time.includes('01:') || todo.time.includes('02:') || todo.time.includes('03:') || todo.time.includes('04:') || todo.time.includes('05:') || todo.time.includes('06:')) && !todo.urgent) {
                    todoAfternoonContainerHTML += `
                    <div class="todo-container" id="afternoonTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="afternoonTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`afternoonTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title">${todo.title}</p>
                            <button class="todo-delete-button" id="afternoonTodoButton${index}" onclick="deleteTodo('afternoonTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="unflagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">UNFLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else if (todo.time.includes('12:') || todo.time.includes('01:') || todo.time.includes('02:') || todo.time.includes('03:') || todo.time.includes('04:') || todo.time.includes('05:') || todo.time.includes('06:')) {
                    todoAfternoonContainerHTML += `
                    <div class="todo-container" id="afternoonTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="afternoonTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`afternoonTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title todo-container-title-urgent">${todo.title}</p>
                            <button class="todo-delete-button" id="afternoonTodoButton${index}" onclick="deleteTodo('afternoonTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="unflagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">UNFLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else if (!todo.urgent) {
                    todoTonightContainerHTML += `
                    <div class="todo-container" id="tonightTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="tonightTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`tonightTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title">${todo.title}</p>
                            <button class="todo-delete-button" id="tonightTodoButton${index}" onclick="deleteTodo('tonightTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="unflagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">UNFLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                } else {
                    todoTonightContainerHTML += `
                    <div class="todo-container" id="tonightTodoElement${index}">
                        <label class="circle-checkbox">
                            <input data-storage-title="${todo.title}" id="tonightTodoCheckbox${index}" type="checkbox"${checkedTodoIds.has(`tonightTodoCheckbox${index}`) ? ' checked' : ''}>
                        </label>
                        <div class="todo-title-container">
                            <p class="todo-container-title todo-container-title-urgent">${todo.title}</p>
                            <button class="todo-delete-button" id="tonightTodoButton${index}" onclick="deleteTodo('tonightTodoElement${index}', '${todo.title}')">Delete</button>
                            <button class="flag-button" id="flagButton${index}" onclick="unflagTodo('morningTodoElement${index}', '${todo.title}', 'flagButton${index}')">UNFLAG</button>
                        </div>
                        <p class="todo-container-notes">${todo.notes}</p>
                        <p class="todo-container-date">Date: <span class="date-text">${todo.date}</span></p>
                        <p class=todo-container-time>Time: <span class="time-text">${todo.time}</span></p>
                        <p class="todo-container-url">Location: <span><a class="url-link" href="${todo.url}" target="_blank">${todo.url}</a></span></p>
                    </div>
                    `
                }
            }
        }
    });
}

morningContainerElement.innerHTML = todoMorningContainerHTML;
afternoonContainerElement.innerHTML = todoAfternoonContainerHTML;
tonightContainerElement.innerHTML = todoTonightContainerHTML;

let checkedTodos = updateCheckboxes();
updateCheckboxes();

document.querySelectorAll('.circle-checkbox input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', () => {
        const index = checkedTodos.findIndex(todo => todo.id === input.id);
        if (index !== -1) {
            checkedTodos[index].state = input.checked;
        } else {
            checkedTodos.push({
                id: input.id,
                state: input.checked
            });
        }

        localStorage.setItem('checkedCheckboxes', JSON.stringify(checkedTodos));

        updateCheckboxes();
        
        let storage = JSON.parse(localStorage.getItem('reminderData'));
        let newStorage = [];
        storage.forEach((todo) => {
            if (todo.title === input.dataset.storageTitle) {
                if (input.checked) {
                    todo.completed = true;
                } else {
                    todo.completed = false;
                }
            }
            newStorage.push(todo);
        });
        console.log(newStorage);
        localStorage.setItem('reminderData', JSON.stringify(newStorage));
    });
});

function updateCheckboxes() {
    const checkedTodos = JSON.parse(localStorage.getItem('checkedCheckboxes')) || [];
    checkedTodos.forEach((item) => {
        const checkbox = document.getElementById(item.id);
        if (!checkbox) return;
        checkbox.checked = item.state;
        if (item.state) {
            checkbox.style.backgroundColor = '#0075ff';
            checkbox.style.borderColor = '#0075ff';
        } else {
            checkbox.style.backgroundColor = 'transparent';
            checkbox.style.borderColor = '#626262';
        }
    });

    let todos = JSON.parse(localStorage.getItem('reminderData'));
    return checkedTodos;
}