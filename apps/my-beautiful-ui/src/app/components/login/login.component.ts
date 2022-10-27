import { Component }                          from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { catchError, of, take, tap }          from 'rxjs';
import { ApiService }                         from '../../data/api.service';
import { Store }                              from '../../data/store.service';
import { LoginForm }                          from '../../shared/login-form.type';
import { passwordFormValidators }             from '../../shared/password.validators';
import { ControlsOf }                         from '../../shared/utility.types';

@Component({
  selector: 'ui-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = new FormGroup<ControlsOf<LoginForm>>({
    email: new FormControl(
      '',
      { nonNullable: true, validators: [Validators.required, Validators.email] }
    ),
    password: new FormControl(
      '',
      { nonNullable: true, validators: [Validators.required, ...passwordFormValidators] }
    )
  });

  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  onSubmitForm() {
    this.apiService.login(this.form.getRawValue())
      .pipe(
        take(1),
        tap(userResponse => {
            this.store.setState((state => ({
              user: { ...state.user, ...userResponse }
            })));
            this.router.navigate(['profile']);
          }
        ),
        catchError(err => {
          window.alert(err.statusText);
          return of(err);
        })
      )
      .subscribe();
  }
}
