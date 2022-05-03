import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  public addToFavorite(userKey: string, favoriteList: string[], name: string) {
    let newArr: string[];

    if (favoriteList) {
      const temp = favoriteList;

      if (temp.find(item => item === name)) return;

      newArr = [...favoriteList, name];
    } else {
      newArr = [name];
    }

    this.setFavorite(userKey, newArr);
  }

  public removeToFavorite(userKey: string, favoriteList: string[], name: string) {
    if (!favoriteList) return;

    const temp = favoriteList.filter(item => item !== name);

    const newArr: string[] = [...temp];

    this.setFavorite(userKey, newArr);
  }

  public setFavorite(userKey: string, favoriteIceCream: string[]) {
    this.http
      .patch(`${environment.firebaseConfig.databaseURL}users/${userKey}.json`, { favoriteIceCream })
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }
}
