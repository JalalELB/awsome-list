import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'ntc-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.isLoading$ = this.loaderService.isLoading$;
  }

}
