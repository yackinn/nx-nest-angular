import { applyDecorators }                         from '@nestjs/common';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export function Password() {
  return applyDecorators(
    IsString(),
    MinLength(4),
    MaxLength(20),
    Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
  );
}
