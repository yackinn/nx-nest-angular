import { HttpClientModule }     from '@angular/common/http';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { BrowserModule }        from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule }         from '@angular/router';
import { TransferStateService } from '@nxarch/nguniversal';

import { AppComponent }      from './app.component';
import { LoginComponent }    from './login/login.component';
import { ProfileComponent }  from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ROUTES }            from './routes';
import { State, Store }      from './store.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ssrApp' }),
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    // BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    {
      provide: Store,
      useFactory: (transferStateService: TransferStateService) => {
        const store         = new Store();
        const receivedState = transferStateService.get<State>('state');
        if (receivedState) store.setState((state) => receivedState);

        return store;
      },
      deps: [TransferStateService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
