import { HttpClientModule }     from '@angular/common/http';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { MatButtonModule }      from '@angular/material/button';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { BrowserModule }        from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule }         from '@angular/router';
import { TransferStateService } from '@nxarch/nguniversal';
import { AppComponent }         from './app.component';
import { LoginComponent }       from './components/login/login.component';
import { ProfileComponent }     from './components/profile/profile.component';
import { RegisterComponent }    from './components/register/register.component';
import { State, Store }         from './data/store.service';
import { ROUTES }               from './routes';
import { TransferState }        from './shared/transfer-state.enum';

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
    HttpClientModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: Store,
      useFactory: (transferStateService: TransferStateService) => {
        const store         = new Store();
        const receivedState = transferStateService.get<State>(TransferState.State);
        if (receivedState) store.setState(() => receivedState);

        return store;
      },
      deps: [TransferStateService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
