import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt            from 'bcryptjs';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  async hashPassword(password: string): Promise<string> {
    // non-blocking (async)
    return bcrypt.hash(password, 10);
  }

  async validateHashedPassword(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }

}
