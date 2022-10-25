import { Type }          from '@nestjs/common';
import { plainToClass }  from 'class-transformer';
import { ObjectLiteral } from './helper.types';

/**
 *
 * @param type Type<T>
 * @param data ObjectLiteral | ObjectLiteral[]
 * @returns generated class
 */
export function toResponse<T>(type: Type<T>, data: ObjectLiteral | ObjectLiteral[]): T {
  return plainToClass(type, data, { excludeExtraneousValues: true, strategy: 'exposeAll' });
}
