import { Component, OnInit }    from '@angular/core';
import { TransferStateService } from '@nxarch/nguniversal';
import { delay, map, take }     from 'rxjs';
import { ApiService }           from '../../data/api.service';
import { Store }                from '../../data/store.service';
import { TransferState }        from '../../shared/transfer-state.enum';

@Component({
  selector: 'ui-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$ = this.store.state$.pipe(map(state => state.user));

  constructor(
    private readonly store: Store,
    private readonly transferStateService: TransferStateService,
    private readonly apiService: ApiService
  ) {}

  ngOnInit() {
    this.transferStateService.fetch(
      TransferState.User,
      () => this.apiService.fetchProfile().pipe(delay(3000))
    )
      .pipe(take(1))
      .subscribe();
  }

}
