import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private user$ = this.store.select(store => store.user);

  constructor(private store: Store<AppState>, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot) {
    const canActivatesRole = route.data['roles'] as string[];

    return this.user$.pipe(
      map(res => res.data.role),
      map(role => canActivatesRole.includes(role)),
      tap(canActivate => {
        if (canActivate) {
          return;
        }

        this.router.navigate(['dashboard/home']);
      })
    );
  }
}
