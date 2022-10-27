import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { map, take, tap } from 'rxjs';
import { ApiService }     from './data/api.service';
import { Store }          from './data/store.service';

@Component({
  selector: 'nx-angular-nest-root',
  styles: [
    `
      .btn-logout {
        position: absolute;
        right: 0;
        top: 0;
        margin: 40px;
      }

      .is-active {
        color: green;
        text-decoration: underline;
      }
    `
  ],
  template: `
    <div class='container m-8'>
      <h2>Navigation</h2>
      <div class='flex'>
        <a routerLink='/login' class='mx-4' mat-button routerLinkActive='is-active'>Login</a>
        <a routerLink='/register' class='mx-4' mat-button routerLinkActive='is-active'>Register</a>
        <a routerLink='/profile' class='mx-4' mat-button routerLinkActive='is-active'>Profile</a>
      </div>

      <router-outlet></router-outlet>
      <button mat-raised-button
              class='btn-logout'
              color='accent'
              *ngIf='isLoggedIn$ | async'
              (click)='onClickLogout()'
      >Logout
      </button>
    </div>
    <pre>{{this.store.state$ | async | json}}</pre>
  `
})
export class AppComponent {
  isLoggedIn$ = this.store.state$.pipe(map(state => !!state.user));

  constructor(
    readonly store: Store,
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  onClickLogout() {
    this.apiService.logout().pipe(
      take(1),
      tap(() => {
        this.store.setState(() => ({ user: null }));
        this.router.navigate(['/login']);
      })
    ).subscribe();
  }
}
