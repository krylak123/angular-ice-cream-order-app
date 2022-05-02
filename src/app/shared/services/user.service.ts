import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { UserActions, UserState } from 'src/app/store/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase, private store: Store<AppState>) {}

  public setUser(uid: string | undefined) {
    this.db
      .list<UserState>('users')
      .valueChanges()
      .pipe(switchMap(res => of(res.find(item => item.uid === uid))))
      .subscribe(user => this.store.dispatch(UserActions.SET_USER({ user })));
  }
}
