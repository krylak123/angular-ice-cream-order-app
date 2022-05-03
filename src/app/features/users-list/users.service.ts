import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { usersActions, UsersState } from 'src/app/store/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  public getUsers() {
    this.db
      .list<UsersState>('users')
      .snapshotChanges()
      .pipe(
        map(action =>
          action.map(a => {
            const res: UsersState = {
              key: a.payload.key,
              data: a.payload.val(),
            };
            return res;
          })
        ),
        tap(res => {
          this.store.dispatch(usersActions.SET_USERS_LIST({ usersList: res }));
        }),
        catchError(err => of(err))
      )
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }

  public deleteUsers(key: string) {
    this.http
      .delete(`${environment.firebaseConfig.databaseURL}users/${key}.json`)
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }
}
