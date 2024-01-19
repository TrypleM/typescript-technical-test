const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const FILENAME = 'todos.json';

let todos = [];

function store() {
    fs.writeFileSync(FILENAME, JSON.stringify(todos, null, 2), 'utf8');
}

function load() {
    if (fs.existsSync(FILENAME)) {
        todos = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));
    }
}

function addTask(task) {
    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    todos.push({ id: newId, task, completed: false });
    store();
}

function getTasks() {
    if (todos.length === 0) {
        console.log('No hay tareas.');
    } else {
        todos.forEach(t => {
            console.log(`${t.id}: ${t.task} [${t.completed ? 'Completada' : 'Pendiente'}]`);
        });
    }
}

function updateTask(id, newTask) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos[index].task = newTask;
        store();
    } else {
        console.log('Tarea no encontrada.');
    }
}

function deleteTask(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        store();
    } else {
        console.log('Tarea no encontrada.');
    }
}

function promptUser() {
    rl.question(
        '1 - Listar mis tareas\n' +
        '2 - Eliminar una tarea\n' +
        '3 - Agregar una tarea\n' +
        '4 - Modificar una tarea\n' +
        'Elige una opción: ',
        (answer) => {
            switch (answer) {
                case '1':
                    getTasks();
                    break;
                case '2':
                    rl.question('Introduce el ID de la tarea a eliminar: ', (id) => {
                        deleteTask(parseInt(id));
                        promptUser();
                    });
                    return;
                case '3':
                    rl.question('Introduce la descripción de la nueva tarea: ', (task) => {
                        addTask(task);
                        promptUser();
                    });
                    return;
                case '4':
                    rl.question('Introduce el ID de la tarea a modificar: ', (id) => {
                        rl.question('Introduce la nueva descripción de la tarea: ', (task) => {
                            updateTask(parseInt(id), task);
                            promptUser();
                        });
                    });
                    return;
                default:
                    console.log('Opción no válida');
            }
            promptUser();
        }
    );
}

load();
promptUser();
