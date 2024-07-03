let tasks = [
    { id: 1, description: 'Aprender HTML', completed: false },
    { id: 2, description: 'Estudiar CSS', completed: false },
    { id: 3, description: 'Practicar JavaScript', completed: true }
];

document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value.trim();
    if (taskDescription !== "") {
        const taskId = Date.now();
        const task = { id: taskId, description: taskDescription, completed: false };
        tasks.push(task);
        taskInput.value = '';
        updateTaskList();
    }
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        taskItem.innerHTML = `
            <div>
                <input type="checkbox" class="mr-2" onclick="toggleTask(${task.id})" ${task.completed ? 'checked' : ''}>
                <span class="${task.completed ? 'completed' : ''}">${task.description}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Eliminar</button>
        `;
        taskList.appendChild(taskItem);
    });
    updateSummary();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    updateTaskList();
}

function toggleTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    updateTaskList();
}

function updateSummary() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    document.getElementById('taskCount').innerText = totalTasks;
    document.getElementById('completedTasksCount').innerText = completedTasks;
}

// Inicializa la lista de tareas al cargar la página
updateTaskList();
