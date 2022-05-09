import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { OrderList } from '@features/new-order/new-order.service';
import { UsersService } from '@features/users-list/users.service';
import { Store } from '@ngrx/store';
import { format, parseISO } from 'date-fns';
import { BehaviorSubject, map } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

export interface OrderByClient {
  email: string;
  order: OrderList[];
}

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetOrderComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'product', 'unit', 'count'];
  public users$ = this.store.select(store => store.users);
  public orders$ = new BehaviorSubject<OrderList[]>([]);
  public ordersByClient$ = new BehaviorSubject<OrderByClient[]>([]);
  public toggleTable: 'ORDERS' | 'CLIENT' | '' = '';
  public todayDay: string = format(new Date(), 'dd.MM.yyyy');

  constructor(private usersService: UsersService, private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.usersService.getUsers();
  }

  public getOrders() {
    this.toggleTable = 'ORDERS';

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
        const final: OrderList[] = [];
        res.forEach(item => final.push(...item));
        this.orders$.next(final);
      });
  }

  public getOrdersByClients() {
    this.toggleTable = 'CLIENT';

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
      .subscribe(res => this.ordersByClient$.next(res));
  }
}
