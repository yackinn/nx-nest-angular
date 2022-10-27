import { HTTP_INTERCEPTORS }    from '@angular/common/http';
import { NgModule }             from '@angular/core';
import { ServerModule }         from '@angular/platform-server';
import { REQUEST }              from '@nguniversal/express-engine/tokens';
import { TransferStateService } from '@nxarch/nguniversal';
import { Request }              from 'express';
import { AppBrowserModule }     from './app.browser.module';
import { AppComponent }         from './app.component';
import { Store }                from './data/store.service';
import { CookieInterceptor }    from './shared/cookie.interceptor';
import { TransferState }        from './shared/transfer-state.enum';


export function initStore(request: Request, transferStateService: TransferStateService) {
  const store = new Store();
  store.setState(() => ({ user: (request as any).user ?? null }));
  transferStateService.set(TransferState.State, store.getValue());

  console.log('sent to frontend via transfer state', store.getValue());

  return store;
}

@NgModule({
  imports: [
    ServerModule,
    AppBrowserModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CookieInterceptor,
      multi: true
    },
    {
      provide: Store,
      useFactory: initStore,
      deps: [REQUEST, TransferStateService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppSsrModule {}
