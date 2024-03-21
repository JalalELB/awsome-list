import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, timer } from 'rxjs';
import { Toastr } from 'src/app/shared/models/toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  private toastr: BehaviorSubject<Toastr | null> = new BehaviorSubject<Toastr | null>(null);
  readonly toastr$: Observable<Toastr | null> = this.toastr.asObservable();

  showToastr(toastr: Toastr): void {
    timer(0, 3000).pipe(take(2)).subscribe(i => {
      if (i === 0) {
        this.toastr.next(toastr);
      } else {
        this.toastr.next(null);
      }
    })
  }

  hideToastr(): void {
    this.toastr.next(null);
  }
}
