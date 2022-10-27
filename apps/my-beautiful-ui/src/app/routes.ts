import { Routes }            from '@angular/router';
import { LoginComponent }    from './components/login/login.component';
import { ProfileComponent }  from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { IsLoggedInGuard }   from './shared/is-logged-in.guard';

export const ROUTES: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
];
