import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';



export class Store<T> {

  private initialState!: T;
  private state$: BehaviorSubject<T> = new BehaviorSubject(this.initialState);


  get = (): T => this.state$.getValue();

  get$ = (): Observable<T> => this.state$.asObservable();

  store = (nextState: T) => this.state$.next(nextState);


}
