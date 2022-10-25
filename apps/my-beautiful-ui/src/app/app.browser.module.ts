import { HttpClientModule } from '@angular/common/http';
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Store }        from './store.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'ssrApp' }), HttpClientModule],
  providers: [
    {
      provide: Store,
      useFactory: () => {
        const store = new Store();
        store.setState((state => ({ user: { email: 'dsa' } })));

        return store;
      },
    }
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
