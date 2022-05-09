import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { catchError, map, of, tap } from 'rxjs';
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
      .snapshotChanges()
      .pipe(
        map(action =>
          action.map(a => {
            const res: UserState = {
              key: a.payload.key,
              data: a.payload.val(),
            };
            return res;
          })
        ),
        map(res => res.find(item => item.data.uid === uid)),
        tap(user => {
          if (user) {
            this.store.dispatch(UserActions.SET_USER({ user }));
          }
        }),
        catchError(err => of(err))
      )
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }
}
