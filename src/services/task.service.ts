import { Task } from '../classes/task';
import { DbService } from './db.service';

export class TaskService {

    constructor(private dbService: DbService) {}

    addTask(task: string): Task {
        const todos = this.dbService.todos;
        const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
        const newTask: Task = new Task(newId, task);

        todos.push(newTask);
        this.dbService.store(todos);
        return newTask;
    }

    getTasks(): Task[] | null {
        if (this.dbService.todos.length === 0) return null;

        return this.dbService.todos;
    }

    updateTask(id: number, newTask: string): Task | null {
        let todos = this.dbService.todos;
        const index = this.dbService.todos.findIndex(t => t.id === id);
        if (index < 0) return null;
        
        todos[index].task = newTask;
        this.dbService.store(todos);

        return todos[index];
    }

    completedTask(id: number): Task | null {
        let todos = this.dbService.todos;
        const index = this.dbService.todos.findIndex(t => t.id === id);
        if (index < 0) return null;

        todos[index].completed = true;
        this.dbService.store(todos);

        return todos[index];
    }

    deleteTask(id: number): boolean {
        const todos = this.dbService.todos; 
        const index = todos.findIndex(t => t.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
            this.dbService.store(todos);
            return true
        } else {
            return false;
        }
    }
}