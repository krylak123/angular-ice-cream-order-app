import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { of, ReplaySubject, switchMap, tap } from 'rxjs';

export interface User {
  uid: string;
  role: string;
  name: string;
  username: string;
  email: string;
  phone: number;
  favoriteIceCream?: string[];
  currentOrder?: Order;
  prevOrder?: Order;
}

export interface Order {
  date: Date;
  order: OrderDetails[];
}

export interface OrderDetails {
  name: string;
  count: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new ReplaySubject<User | undefined>(1);

  constructor(private db: AngularFireDatabase) {}

  public get user$() {
    return this.user.asObservable();
  }

  public setUser(uid: string | undefined) {
    this.db
      .list<User>('users')
      .valueChanges()
      .pipe(
        switchMap(res => of(res.find(item => item.uid === uid))),
        tap(console.log)
      )
      .subscribe(user => this.user.next(user));
  }
}
