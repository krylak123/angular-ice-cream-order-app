import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from '@environments/environment';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface ApiResponseProducts {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  public getProducts() {
    this.db
      .list<ApiResponseProducts>('products')
      .valueChanges()
      .pipe(
        tap(res => console.log(res)),
        catchError(err => of(err))
      )
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }

  public addProducts(name: string) {
    this.http
      .post(`${environment.firebaseConfig.databaseURL}/products.json`, { name })
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }
}
