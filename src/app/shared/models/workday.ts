import { Task } from "./task";

export class Workday {
    readonly id: string | null;
    dueDate: number;
    displayDate: string; // date d'affichage de la journée de travail 'jj/mm/aaaa'
    notes?: string;
    tasks: Task[];
    userId: string;

    constructor (options: {
        id?: string,
        dueDate?: number,
        displayDate?: string,
        notes?: string,
        tasks?: Task[],
        userId: string
    }) {
        this.id = options.id || null;
        this.dueDate = options.dueDate || 0;
        this.displayDate = options.displayDate || '';
        this.notes = options.notes || '';
        this.tasks = options.tasks || [new Task()];
        this.userId = options.userId;
    }
}
