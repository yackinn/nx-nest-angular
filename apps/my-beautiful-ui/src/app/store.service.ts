import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface State {
  user?: User;
}

const defaultState: State = {
  user: undefined
};

@Injectable()
export class Store {
  private _state$ = new BehaviorSubject<State>(defaultState);

  public state$ = this._state$.asObservable();

  getValue() {
    return this._state$.getValue();
  }

  setState(stateFn: (state: State) => Partial<State>) {
    this._state$.next(stateFn(this._state$.getValue()));
  }

}
