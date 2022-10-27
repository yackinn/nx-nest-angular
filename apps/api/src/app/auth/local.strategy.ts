import { Injectable, Logger }                from '@nestjs/common';
import { PassportStrategy }                  from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { UserService }                       from '../user/user.service';
import { UserResponse }                      from '../user/webservice/dto/user.response';

/**
 * Check valid credentials
 * - attach user with created token to request.user
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(PassportLocalStrategy) {
  logger = new Logger(LocalStrategy.name);

  constructor(
    private userService: UserService
  ) {
    super({
      usernameField: 'email'
    });
  }

  // whatever is returned will be attached to request.user
  public async validate(email: string, password: string): Promise<UserResponse> {
    const user = await this.userService.validateUser(email, password);

    return user;
  }

}

