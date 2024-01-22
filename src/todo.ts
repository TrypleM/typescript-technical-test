import readline from 'readline';
import { TaskService } from './services/task.service';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export class Todos {

    constructor(private taskService: TaskService) {}

    promptUser(): void {
        rl.question(
            '1 - Listar mis tareas\n' +
            '2 - Eliminar una tarea\n' +
            '3 - Agregar una tarea\n' +
            '4 - Modificar una tarea\n' +
            '5 - Completar una tarea\n' +
            'Elige una opción: ',
            (answer) => {
                switch (answer) {
                    case '1':
                        const tasks = this.taskService.getTasks();
                        if (!tasks) {
                            console.log('No hay tareas.');
                        } else {
                            tasks.forEach(t => {
                                console.log(`${t.id}: ${t.task} [${t.completed ? 'Completada' : 'Pendiente'}]`);
                            });
                        }
                        break;
                    case '2':
                        rl.question('Introduce el ID de la tarea a eliminar: ', (id) => {
                            const deleted = this.taskService.deleteTask(parseInt(id));
                            if (deleted) {
                                console.log('Tarea borrada.');
                            } else {
                                console.log('Tarea no encontrada.');
                            }
                            this.promptUser();
                        });
                        return;
                    case '3':
                        rl.question('Introduce la descripción de la nueva tarea: ', (task) => {
                            this.taskService.addTask(task);
                            console.log('Tarea creada');
                            this.promptUser();
                        });
                        return;
                    case '4':
                        rl.question('Introduce el ID de la tarea a modificar: ', (id) => {
                            rl.question('Introduce la nueva descripción de la tarea: ', (task) => {
                                const updatedTask = this.taskService.updateTask(parseInt(id), task);
                                if (!updatedTask) console.log('Tarea no encontrada.');
                                this.promptUser();
                            });
                        });
                        return;
                    case '5': 
                        rl.question('Introduce el ID de la tarea que quieras completar: ', (id) => {
                            const task = this.taskService.completedTask(parseInt(id));
                            if (!task) console.log('Tarea no encontrada.');
                            this.promptUser();
                        })
                        return;
                    default:
                        console.log('Opción no válida');
                }
                this.promptUser();
            }
        );
    }

}
