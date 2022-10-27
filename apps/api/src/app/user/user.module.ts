import { MikroOrmModule }     from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule }         from '../auth/auth.module';
import { User }               from './models/user.entity';
import { UserService }        from './user.service';
import { UserController }     from './webservice/user.controller';

@Module({
  controllers: [UserController],
  imports: [
    MikroOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}


