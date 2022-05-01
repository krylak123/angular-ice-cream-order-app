import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  public canActivate() {
    return this.store
      .select(state => state.auth.isAuth)
      .pipe(
        tap(isAuth => {
          if (isAuth) {
            return;
          }

          this.router.navigate(['auth']);
        })
      );
  }
}
