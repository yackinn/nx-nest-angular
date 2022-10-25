import { forwardRef, Module } from '@nestjs/common';
import { SessionSerializer }  from '../shared/session-serializer';
import { UserModule }         from '../user/user.module';
import { AuthService }        from './auth.service';
import { LocalStrategy }      from './local.strategy';
import { AuthController }     from './webservice/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule)
  ],
  providers: [
    LocalStrategy,
    AuthService,
    SessionSerializer
  ],
  exports: [AuthService, LocalStrategy],
})
export class AuthModule {}
