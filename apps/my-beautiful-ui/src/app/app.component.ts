import { Component } from '@angular/core';
import { Store }     from './store.service';

@Component({
  selector: 'nx-angular-nest-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private readonly store: Store
  ) {}
}
