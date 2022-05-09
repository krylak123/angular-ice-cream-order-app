import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { format, parseISO } from 'date-fns';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { ordersActions, OrdersState } from 'src/app/store/orders';

@Injectable({
  providedIn: 'root',
})
export class GetOrderService {
  public users$ = this.store.select(store => store.users);

  constructor(private store: Store<AppState>) {}

  public getOrders() {
    this.users$
      .pipe(
        map(users => users.map(user => user.data.currentOrder)),
        map(orders => orders.filter(order => order !== undefined)),
        map(orders =>
          orders.filter(order => format(parseISO(order.date), 'dd') === format(new Date(), 'dd'))
        ),
        map(orders => orders.map(order => order.order))
      )
      .subscribe(res => {
        const final: OrdersState[] = [];
        res.forEach(item => final.push(...item));
        this.store.dispatch(ordersActions.SET_ORDERS_LIST({ ordersList: final }));
      });
  }

  public getOrdersByClients() {
    this.users$
      .pipe(
        map(users => users.filter(user => user.data.currentOrder !== undefined)),
        map(users =>
          users.filter(
            user => format(parseISO(user.data.currentOrder.date), 'dd') === format(new Date(), 'dd')
          )
        ),
        map(users =>
          users.map(user => {
            const { order } = user.data.currentOrder;

            return { email: user.data.email, order };
          })
        )
      )
      .subscribe(res => {
        this.store.dispatch(ordersActions.SET_ORDERS_LIST({ ordersList: res }));
      });
  }
}
