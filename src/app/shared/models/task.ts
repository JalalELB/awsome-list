export class Task {

    static readonly prmodoroLimit: number = 5;
    completed: boolean;
    done: number;
    title: string;
    todo: number;

    constructor(options: {
        completed?: boolean,
        done?: number,
        title?: string,
        todo?: number,
    } = {}) {
        this.completed = options.completed || false;
        this.done = options.done || 0;
        this.title = options.title || '';
        this.todo = options.todo || 1;
    }
}
