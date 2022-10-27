import { Component }                          from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { take, tap }                          from 'rxjs';
import { ApiService }                         from '../../data/api.service';
import { passwordFormValidators }             from '../../shared/password.validators';
import { RegisterForm }                       from '../../shared/register-form.type';
import { ControlsOf }                         from '../../shared/utility.types';

@Component({
  selector: 'ui-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form = new FormGroup<ControlsOf<RegisterForm>>({
    email: new FormControl(
      '',
      { nonNullable: true, validators: [Validators.required, Validators.email] }
    ),
    password: new FormControl(
      '',
      { nonNullable: true, validators: [Validators.required, ...passwordFormValidators] }
    ),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  onSubmitForm() {
    this.apiService.register(this.form.getRawValue())
      .pipe(
        take(1),
        tap(() => this.router.navigate(['/login']))
      )
      .subscribe();
  }
}
