import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';

export interface Order {
  date: Date;
  orderList: OrderList[];
}

export interface OrderList {
  product: string;
  unit: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class NewOrderService {
  public user$ = this.store.select(store => store.user);

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  public checkUserOrders(userKey: string, currentOrder: Order, newOrder: Order) {
    this.setNewOrder(userKey, newOrder);

    if (currentOrder.date) {
      this.setPrevOrder(userKey, currentOrder);
    }
  }

  public setNewOrder(userKey: string, currentOrder: Order) {
    this.http
      .patch(`${environment.firebaseConfig.databaseURL}/users/${userKey}.json`, {
        currentOrder,
      })
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }

  private setPrevOrder(userKey: string, prevOrder: Order) {
    this.http
      .patch(`${environment.firebaseConfig.databaseURL}/users/${userKey}.json`, {
        prevOrder,
      })
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          console.error(res);
        }
      });
  }
}
