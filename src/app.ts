import { DbService } from "./services/db.service";
import { TaskService } from './services/task.service';
import { Todos } from "./todo";

function main() {
    const dbService: DbService = new DbService();
    const taskService: TaskService = new TaskService(dbService);
    const todos: Todos = new Todos(taskService);

    dbService.load();
    todos.promptUser();
}

main();