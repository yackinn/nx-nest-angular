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
  private state$ = new BehaviorSubject<State>(defaultState);

  setState(stateFn: (state: State) => Partial<State>) {
    this.state$.next(stateFn(this.state$.getValue()));
  }

}
