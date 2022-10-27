import { MikroOrmModule }                  from '@mikro-orm/nestjs';
import { Module }                          from '@nestjs/common';
import { AngularUniversalModule }          from '@nxarch/nest-nguniversal';
import ormConfig                           from '../config/orm.config';
import { AuthModule }                      from './auth/auth.module';
import { BookingModule }                   from './booking/booking.module';
import { COMPILED_SSR_BUNDLE, VIEWS_PATH } from './constants';
import { RenderModule }                    from './render.module';
import { MemoryCacheStorage }              from './shared/render-cache';
import { UserModule }                      from './user/user.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: COMPILED_SSR_BUNDLE,
      viewsPath: VIEWS_PATH,
      useCustomRenderEndpoint: true,
      cache: { storage: { useClass: MemoryCacheStorage } }
    }),
    MikroOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
    BookingModule,
    RenderModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
