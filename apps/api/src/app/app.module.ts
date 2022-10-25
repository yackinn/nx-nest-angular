import { MikroOrmModule }         from '@mikro-orm/nestjs';
import { Module }                 from '@nestjs/common';
import { AngularUniversalModule } from '@nxarch/nest-nguniversal';
import { join }                   from 'path';
import ormConfig                  from '../config/orm.config';
import { AppController }          from './app.controller';
import { AppService }             from './app.service';
import { AuthModule }             from './auth/auth.module';
import { BookingModule }          from './booking/booking.module';
import { VIEWS_PATH }             from './constants';
import { RenderController }       from './render.controller';
import { UserModule }             from './user/user.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: join(process.cwd(), 'dist/apps/my-beautiful-ui/ssr/main.js'),
      viewsPath: VIEWS_PATH,
      useCustomRenderEndpoint: true
    }),
    MikroOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
    BookingModule,
  ],
  controllers: [AppController, RenderController],
  providers: [AppService],
})
export class AppModule {}
