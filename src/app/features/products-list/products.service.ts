import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { productActions, ProductState } from 'src/app/store/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {}

  public getProducts() {
    this.db
      .list<ProductState>('products')
      .snapshotChanges()
      .pipe(
        map(action =>
          action.map(a => {
            const res: ProductState = {
              key: a.payload.key,
              data: a.payload.val(),
            };
            return res;
          })
        ),
        tap(res => {
          this.store.dispatch(productActions.SET_PRODUCT_LIST({ productList: res }));
        }),
        catchError(err => of(err))
      )
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastr.error('Wystąpił problem', 'Błąd!');
        }
      });
  }

  public addProducts(name: string) {
    this.http
      .post(`${environment.firebaseConfig.databaseURL}/products.json`, { name })
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastr.error('Wystąpił problem', 'Błąd!');
        } else {
          this.toastr.success('Dodano smak', 'Sukces!');
        }
      });
  }

  public deleteProducts(key: string) {
    this.http
      .delete(`${environment.firebaseConfig.databaseURL}/products/${key}.json`)
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastr.error('Wystąpił problem', 'Błąd!');
        } else {
          this.toastr.success('Usunięto smak', 'Sukces!');
        }
      });
  }

  public editProducts(key: string, name: string) {
    this.http
      .patch(`${environment.firebaseConfig.databaseURL}/products/${key}.json`, { name })
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.toastr.error('Wystąpił problem', 'Błąd!');
        } else {
          this.toastr.success('Zmieniono smak', 'Sukces!');
        }
      });
  }
}
