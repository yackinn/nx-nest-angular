import { Component }              from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlsOf }             from '../shared/utility.types';

interface LoginForm {
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
}

@Component({
  selector: 'ui-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = new FormGroup<ControlsOf<LoginForm>>({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

}
