import fs from 'fs';
import { Task } from '../classes/task';

const FILENAME = 'src/db/todos.json';

export class DbService {

    private _todos: Task[] = [];

    constructor() {}

    store(todos: Task[]): void {
        fs.writeFileSync(FILENAME, JSON.stringify(todos, null, 2), 'utf-8');
        this._todos = todos;
    }

    load(): void {
        if (fs.existsSync(FILENAME)) {
            this._todos = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));
        }
    }

    get todos() {
        return [...this._todos];
    }

}