import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User }            from '../shared/user.type';

export interface State {
  user?: User | null;
}

const defaultState: State = {
  user: null
};

@Injectable()
export class Store {
  private _state$ = new BehaviorSubject<State>(defaultState);

  public state$ = this._state$.asObservable();

  getValue() {
    return this._state$.getValue();
  }

  setState(stateFn: (state: State) => Partial<State>) {
    this._state$.next(stateFn(this.getValue()));
  }

}
