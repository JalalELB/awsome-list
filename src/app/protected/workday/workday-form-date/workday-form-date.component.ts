import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ntc-workday-form-date',
  templateUrl: './workday-form-date.component.html',
  styles: []
})
export class WorkdayFormDateComponent implements OnInit {

  @Input() dueDate: FormControl;

  constructor(private localService: BsLocaleService) { }

  ngOnInit() {
    this.localService.use('fr');
  }

}
