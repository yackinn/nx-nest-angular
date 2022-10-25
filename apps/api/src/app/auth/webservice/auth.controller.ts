import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuardLocal }                    from '../../shared/auth.guards';
import { toResponse }                        from '../../shared/to-response.util';
import { User }                              from '../../user/models/user.entity';
import { UserFromReq }                       from '../../user/user-from-req.decorator';
import { UserService }                       from '../../user/user.service';
import { CreateUserDto }                     from '../../user/webservice/dto/user.dtos';
import { UserResponse }                      from '../../user/webservice/dto/user.response';
import { AuthService }                       from '../auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.userService.register(createUserDto);

    return toResponse(UserResponse, user);
  }

  @Post('login')
  @UseGuards(AuthGuardLocal)
  login(@UserFromReq() user: User): UserResponse {
    return toResponse(UserResponse, user);
  }

  // @Get('/logout')
  // logout(@Request() req): any {
  // todo get session handler
  //   req.session.destroy();
  //   return { msg: 'The user session has ended' };
  // }

}


