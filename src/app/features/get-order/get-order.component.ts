import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UsersService } from '@features/users-list/users.service';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { AppState } from 'src/app/store/app.state';
import { GetOrderService } from './get-order.service';

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetOrderComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'product', 'unit', 'count'];
  public orders$ = this.store.select(store => store.orders);
  public toggleTable: 'ORDERS' | 'CLIENT' | '' = '';
  public todayDay: string = format(new Date(), 'dd.MM.yyyy');

  constructor(
    private usersService: UsersService,
    private store: Store<AppState>,
    private getOrdersService: GetOrderService
  ) {}

  public ngOnInit(): void {
    this.usersService.getUsers();
  }

  public getOrders() {
    this.toggleTable = 'ORDERS';

    this.getOrdersService.getOrders();
  }

  public getOrdersByClients() {
    this.toggleTable = 'CLIENT';

    this.getOrdersService.getOrdersByClients();
  }
}
