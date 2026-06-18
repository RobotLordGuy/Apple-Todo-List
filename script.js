const todayButton = document.querySelector('.js-today-button');
const addTodoButton = document.querySelector('.js-add-todo-button');
const closeAddTodoMenuButton = document.querySelector('.js-close-add-todo-menu-button');
const addTodoMenu = document.querySelector('.js-add-todo-container');
const dateInputContainer = document.querySelector('.js-date-input-container');
const dateInputSlider = document.querySelector('.js-date-slider');
const dateInputCheckbox = document.querySelector('.date-switch input[type="checkbox"]');
const dateInput = document.querySelector('.js-date-input');
const timeInputContainer = document.querySelector('.js-time-input-container');
const timeInputSlider = document.querySelector('.js-time-slider');
const timeInputCheckbox = document.querySelector('.time-switch input[type="checkbox"]');
const timeInput = document.querySelector('.js-time-input');
const urgentInputCheckbox = document.querySelector('.urgent-clock-switch input[type="checkbox"]');
const dateAndTimeContainer = document.querySelector('.js-date-and-time-container');
const createReminderButton = document.querySelector('.js-create-reminder-button');
const todoTitleInput = document.querySelector('.js-todo-title-input');
const todoNotesInput = document.querySelector('.js-todo-notes-input');
const todoUrlInput = document.querySelector('.js-todo-url-input');
const scheduledButton = document.querySelector('.js-scheduled-menu-button');
const flaggedButton = document.querySelector('.js-flagged-menu-button');
const allButton = document.querySelector('.js-all-menu-button');
const urgentButton = document.querySelector('.js-urgent-menu-button');
const completedButton = document.querySelector('.js-completed-menu-button');

let dateInputContainerState = false;
let timeInputContainerState = false;
let urgentInputState = false;
let height = 350;
let reminderData = JSON.parse(localStorage.getItem('reminderData')) || [];

changeDateInputContainerState(false);
changeTimeInputContainerState(false);
dateAndTimeContainer.style.height = `240px`;

closeAddTodoWindow();

todayButton.addEventListener('click', () => {
    window.location.assign('reminder-pages/today-menu/today.html');
});

scheduledButton.addEventListener('click', () => {
    window.location.assign('reminder-pages/scheduled-menu/scheduled.html');
});

flaggedButton.addEventListener('click', () => {
    window.location.assign('reminder-pages/flagged-menu/flagged.html');
});

allButton.addEventListener('click', () => {
    window.location.assign('reminder-pages/all-menu/all.html');
});

urgentButton.addEventListener('click', () => {
    window.location.assign('reminder-pages/urgent-menu/urgent.html');
});

completedButton.addEventListener('click', () => {
    window.location.assign('reminder-pages/completed-menu/completed.html');
});

addTodoButton.addEventListener('click', () => {
    openAddTodoWindow();
});

closeAddTodoMenuButton.addEventListener('click', () => {
    height = 350;
    closeAddTodoWindow();
    
    dateInputContainerState = false;
    timeInputContainerState = false;
    urgentInputState = false;
    changeDateInputContainerState(false);
    changeTimeInputContainerState(false);
});

if (dateInputCheckbox) {
    dateInputCheckbox.addEventListener('change', () => {
        dateInputContainerState = dateInputCheckbox.checked;
        changeDateInputContainerState(dateInputContainerState);
    });
}

if (timeInputCheckbox) {
    timeInputCheckbox.addEventListener('change', () => {
        timeInputContainerState = timeInputCheckbox.checked;
        changeTimeInputContainerState(timeInputContainerState);
    });
}

if (urgentInputCheckbox) {
    urgentInputCheckbox.addEventListener('change', () => {
        if (urgentInputState) {
            urgentInputState = false;
        } else {
            urgentInputState = true;
        }
    });
}

//--------------------------

createReminderButton.addEventListener('click', () => {
    let title = todoTitleInput.value;
    let notes = todoNotesInput.value;
    let url = todoUrlInput.value;
    let date;
    let time;
    let urgent = urgentInputState;
    if (dateInputContainerState) {
        date = dateInput.value;
    }
    if (timeInputContainerState) {
        time = timeInput.value;
    }
    reminderData.push({
        title: title,
        notes: notes,
        url: url,
        date: date,
        time: time,
        urgent: urgent,
        flagged: false,
        completed: false
    });
    localStorage.setItem('reminderData', JSON.stringify(reminderData));
    closeAddTodoWindow();
    changeDateInputContainerState(false);
    changeTimeInputContainerState(false);
});

//-------------------------------

function openAddTodoWindow() {
    addTodoMenu.style.display = '';
}

function closeAddTodoWindow() {
    addTodoMenu.style.display = 'none';
    if (dateInputCheckbox) {
        dateInputCheckbox.checked = false;
    }
    if (timeInputCheckbox) {
        timeInputCheckbox.checked = false;
    }
    if (urgentInputCheckbox) {
        urgentInputCheckbox.checked = false;
    }
    todoTitleInput.value = '';
    todoNotesInput.value = '';
    todoUrlInput.value = '';
}

function changeDateInputContainerState(state) {
    if (state) {
        dateInputContainer.style.display = '';
        dateInput.value = '';
        height += 55;
        dateAndTimeContainer.style.height = `${height}px`;
    } else {
        dateInputContainer.style.display = 'none';
        height -= 55;
        dateAndTimeContainer.style.height = `${height}px`;
    }
}

function changeTimeInputContainerState(state) {
    if (state) {
        timeInputContainer.style.display = '';
        timeInput.value = '';
        height += 55;
        dateAndTimeContainer.style.height = `${height}px`;
    } else {
        timeInputContainer.style.display = 'none';
        height -= 55;
        dateAndTimeContainer.style.height = `${height}px`;
    }
}