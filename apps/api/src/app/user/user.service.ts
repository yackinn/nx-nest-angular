import { EntityRepository, UniqueConstraintViolationException }           from '@mikro-orm/core';
import { InjectRepository }                                               from '@mikro-orm/nestjs';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService }                                                    from '../auth/auth.service';
import { User }                                                           from './models/user.entity';
import { RegisterDto }                                                    from './webservice/dto/user.dtos';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    private authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {
  }

  async register(createUserDto: RegisterDto): Promise<User> {
    const user    = new User(createUserDto);
    user.password = await this.authService.hashPassword(createUserDto.password);

    try {
      await this.userRepository.persistAndFlush(user);

      return user;
    } catch (err) {
      if (err instanceof UniqueConstraintViolationException) {
        throw new BadRequestException('Email already in use.');
      }
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      this.logger.log('User doesn\'t exist');
      throw new UnauthorizedException();
    }

    if (!(await this.authService.validateHashedPassword(password, user.password))) {
      this.logger.log('Wrong password');
      throw new UnauthorizedException();
    }

    return user;
  }
}

