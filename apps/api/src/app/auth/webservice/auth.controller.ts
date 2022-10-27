import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuardLocal }                                   from '../../shared/auth.guards';
import { toResponse }                                       from '../../shared/to-response.util';
import { User }                                             from '../../user/models/user.entity';
import { UserFromReq }                                      from '../../user/user-from-req.decorator';
import { UserService }                                      from '../../user/user.service';
import { RegisterDto }                                      from '../../user/webservice/dto/user.dtos';
import { UserResponse }                                     from '../../user/webservice/dto/user.response';
import { AuthService }                                      from '../auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('register')
  async register(@Body() createUserDto: RegisterDto): Promise<UserResponse> {
    const user = await this.userService.register(createUserDto);

    return toResponse(UserResponse, user);
  }

  @Post('login')
  @UseGuards(AuthGuardLocal)
  login(@UserFromReq() user: User): UserResponse {
    return toResponse(UserResponse, user);
  }

  @HttpCode(204)
  @Post('logout')
  logout(@Req() req): void {
    req.session.destroy();
  }

}


