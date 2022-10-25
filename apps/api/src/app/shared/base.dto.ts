import { ApiExpose } from './api-expose.decorator';

export abstract class BaseDto {
  @ApiExpose()
  id: string;

  @ApiExpose()
  createdAt: Date;

  @ApiExpose()
  updatedAt?: Date;
}
