import { IUserResponse } from '@nx-angular-nest/domain';
import { ApiExpose }     from '../../../shared/api-expose.decorator';
import { BaseDto }       from '../../../shared/base.dto';

export class UserResponse extends BaseDto implements IUserResponse {
  @ApiExpose()
  email: string;

  @ApiExpose()
  firstName?: string;

  @ApiExpose()
  lastName?: string;
}
