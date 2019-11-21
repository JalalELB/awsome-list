import { Task } from './task';

export class Workday {

    readonly id: string;
    dueDate: number;
    notes?: string;
    tasks: Task[];
    userId: string;

    constructor(options: {
        id?: string,
        dueDate?: number,
        notes?: string,
        tasks?: Task[],
        userId: string,
        }) {
            this.id = options.id || null;
            this.dueDate = options.dueDate || 0;
            this.notes = options.notes || '';
            this.tasks = [new Task()];
            this.userId = options.userId;
        }
}
