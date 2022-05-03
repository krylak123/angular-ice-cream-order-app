import { Injectable } from '@angular/core';
import { Role } from '@shared/enums/role.enum';

export interface NavItems {
  name: string;
  path: string;
  role: Role.ADMIN | Role.USER;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navItems: NavItems[] = [
    {
      name: 'Lista zamówień',
      path: 'orders/list',
      role: Role.ADMIN,
    },
    {
      name: 'Stwórz zamówienie',
      path: 'orders/create',
      role: Role.USER,
    },
    {
      name: 'Lista klientów',
      path: 'users',
      role: Role.ADMIN,
    },
    {
      name: 'Stwórz klienta',
      path: 'users/create',
      role: Role.ADMIN,
    },
    {
      name: 'Lista lodów',
      path: 'products',
      role: Role.ADMIN,
    },
    {
      name: 'Lista ulubionych lodów',
      path: 'products/favorite',
      role: Role.USER,
    },
    {
      name: 'Lista jednostek',
      path: 'units',
      role: Role.ADMIN,
    },
  ];

  public getNavItems() {
    return this.navItems;
  }
}
