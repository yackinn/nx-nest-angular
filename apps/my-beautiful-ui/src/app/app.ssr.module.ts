import { NgModule }         from '@angular/core';
import { ServerModule }     from '@angular/platform-server';
import { REQUEST }          from '@nguniversal/express-engine/tokens';
import { Request }          from 'express';
import { AppBrowserModule } from './app.browser.module';
import { AppComponent }     from './app.component';
import { Store }            from './store.service';

export function onAppInit(request: Request, store: Store) {
  return () => {
    console.log('user', (request as any).user);
    store.setState((state) => ({ user: { email: 'yes@yes.com', ...state.user } }));
  };
}

@NgModule({
  imports: [
    ServerModule,
    AppBrowserModule
  ],
  providers: [
    {
      provide: Store,
      useFactory: (request: Request) => {
        const store = new Store();
        store.setState((state => ({ user: (request as any).user })));

        return store;
      },
      deps: [REQUEST]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppSsrModule {}
