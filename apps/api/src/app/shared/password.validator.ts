import { applyDecorators }                                          from '@nestjs/common';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@nx-angular-nest/domain';
import { IsString, Matches, MaxLength, MinLength }                  from 'class-validator';

export function Password() {
  return applyDecorators(
    IsString(),
    MinLength(PASSWORD_MIN_LENGTH),
    MaxLength(PASSWORD_MAX_LENGTH),
    Matches(PASSWORD_REGEX, { message: 'Password too weak' })
  );
}
