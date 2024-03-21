import { Injectable } from '@angular/core';
import { ToastrService } from './toastr.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService: ToastrService) { }

  handleError(error: any) {
    this.toastrService.showToastr({
      category: 'danger',
      message: error.error.error.message,
    })
    return throwError(() => new Error(error));
  }
}
