import { Component, Input, OnChanges, SimpleChange, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ntc-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: []
})
export class PlanningWorkdayItemComponent implements OnChanges {

  @Input() dueDate: string;
  @Input() doneTasks: number | string;
  @Input() remainingTasks: number | string;

  @Output() workdayRemoved = new EventEmitter<string>();

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (const propName in changes) {
      this.update(propName, changes[propName].currentValue);
    }
  }


  update(propName, propValue) {
    switch (propName) {
      case 'dueDate': {
        if ('Lundi' === propValue) { this.dueDate += ' (Aujourd\'hui)'; }
        break;
      }
      case 'doneTasks': {
        if (0 === propValue) { this.doneTasks = 'Aucune tâche terminé.'; }
        break;
      }
      case 'remainingTasks': {
        if (0 === propValue) {
          this.remainingTasks = 'Journée de travail terminée !';
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  removeWorkday(dueDate: string) {
    this.workdayRemoved.emit(dueDate);
  }

}

