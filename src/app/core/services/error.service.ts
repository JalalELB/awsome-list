import { Injectable } from '@angular/core';
import { ToastrService } from './toastr.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService: ToastrService) { }

  public handleError(error) {
    this.toastrService.showToastr({
      category: 'danger',
      message: error.error.error.message,
    });
    return throwError(error);
  }
}
