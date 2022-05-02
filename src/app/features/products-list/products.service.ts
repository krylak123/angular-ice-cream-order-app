import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { productActions, ProductState } from 'src/app/store/product';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  public getProducts() {
    this.db
      .list<ProductState>('products')
      .valueChanges()
      .pipe(
        tap(res => {
          this.store.dispatch(productActions.SET_PRODUCT_LIST({ res }));
        }),
        catchError(err => of(err))
      )
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }

  public addProducts(name: string) {
    const uid = uuidv4();

    this.http
      .post(`${environment.firebaseConfig.databaseURL}products.json`, { name, uid })
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }
}
