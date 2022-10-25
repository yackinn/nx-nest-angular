import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/core';
import {
  InjectRepository
}                                                               from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException
}                                                               from '@nestjs/common';
import {
  AuthService
}                                                               from '../auth/auth.service';
import {
  User
}                                                               from './models/user.entity';
import {
  CreateUserDto
}                                                               from './webservice/dto/user.dtos';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    private authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user    = new User(createUserDto);
    user.password = await this.authService.hashPassword(createUserDto.password);

    try {
      await this.userRepository.persistAndFlush(user);

      return user;
    } catch (err) {
      throw err instanceof UniqueConstraintViolationException
        ? new BadRequestException('Email already in use.')
        : new InternalServerErrorException();
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
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

