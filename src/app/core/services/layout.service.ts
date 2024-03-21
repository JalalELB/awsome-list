import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private isSideNavCollapsed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isSideNavCollapsed$: Observable<boolean> = this.isSideNavCollapsed.asObservable();

  public toggleSideNav(): void {
    this.isSideNavCollapsed.next(!this.isSideNavCollapsed.value);
  }

}
