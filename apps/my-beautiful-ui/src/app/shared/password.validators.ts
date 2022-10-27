import { Validators }                                               from '@angular/forms';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@nx-angular-nest/domain';

export const passwordFormValidators = [
  Validators.min(PASSWORD_MIN_LENGTH),
  Validators.max(PASSWORD_MAX_LENGTH),
  Validators.pattern(PASSWORD_REGEX),
];
