import { Controller, Get, UseGuards, } from '@nestjs/common';
import { AuthenticatedGuard }          from '../../shared/auth.guards';
import { toResponse }                  from '../../shared/to-response.util';
import { User }                        from '../models/user.entity';
import { UserFromReq }                 from '../user-from-req.decorator';
import { UserResponse }                from './dto/user.response';

@Controller('api/users')
export class UserController {

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@UserFromReq() user: User): UserResponse {
    return toResponse(UserResponse, user);
  }

}
