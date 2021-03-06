import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { UnitsActions, UnitsState } from 'src/app/store/units';

@Injectable({
  providedIn: 'root',
})
export class UnitsListService {
  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {}

  public getUnits() {
    this.db
      .list<UnitsState>('units')
      .snapshotChanges()
      .pipe(
        map(action =>
          action.map(a => {
            const res: UnitsState = {
              key: a.payload.key,
              data: a.payload.val(),
            };
            return res;
          })
        ),
        tap(res => {
          this.store.dispatch(UnitsActions.SET_UNITS_LIST({ unitsList: res }));
        }),
        catchError(err => of(err))
      )
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastr.error('Wystąpił problem', 'Błąd!');
        }
      });
  }

  public addUnits(unit: string) {
    this.http
      .post(`${environment.firebaseConfig.databaseURL}/units.json`, { unit })
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastr.error('Wystąpił problem', 'Błąd!');
        } else {
          this.toastr.success('Dodano smak', 'Sukces!');
        }
      });
  }

  public deleteUnits(key: string) {
    this.http
      .delete(`${environment.firebaseConfig.databaseURL}/units/${key}.json`)
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastr.error('Wystąpił problem', 'Błąd!');
        } else {
          this.toastr.success('Usunięto jednostkę', 'Sukces!');
        }
      });
  }

  public editUnits(key: string, unit: string) {
    this.http
      .patch(`${environment.firebaseConfig.databaseURL}/units/${key}.json`, { unit })
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastr.error('Wystąpił problem', 'Błąd!');
        } else {
          this.toastr.success('Zmieniono jednostkę', 'Sukces!');
        }
      });
  }
}
