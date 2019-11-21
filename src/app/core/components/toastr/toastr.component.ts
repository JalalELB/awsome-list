import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { Observable } from 'rxjs';
import { Toastr } from 'src/app/shared/models/toastr';

@Component({
  selector: 'ntc-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {

  public toastr$: Observable<Toastr | null>;

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.toastr$ = this.toastrService.toastr$;
  }


  discardMe(): void {
    this.toastrService.closeToastr();
  }

}
