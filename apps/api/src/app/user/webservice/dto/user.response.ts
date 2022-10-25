import { ApiExpose } from '../../../shared/api-expose.decorator';
import { BaseDto }   from '../../../shared/base.dto';

export class UserResponse extends BaseDto {
  @ApiExpose()
  email: string;

  @ApiExpose()
  firstName?: string;

  @ApiExpose()
  lastName?: string;
}

// **target=libs/core/domain/src/lib/user
