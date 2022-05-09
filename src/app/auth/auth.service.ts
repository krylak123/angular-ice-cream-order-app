import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '@shared/services/user.service';
import { BehaviorSubject } from 'rxjs';
import { AppState } from '../store/app.state';
import { AuthActions } from '../store/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isError = new BehaviorSubject<boolean>(false);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  public get isError$() {
    return this.isError.asObservable();
  }

  public updateIsError(isError: boolean) {
    this.isError.next(isError);
  }

  public logIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.updateIsError(false);

        this.userService.setUser(res.user?.uid);
        this.store.dispatch(AuthActions.SET_AUTHENTICATED());
        this.router.navigate(['dashboard']);
      })
      .catch(() => this.updateIsError(true));
  }

  public logOut() {
    this.angularFireAuth
      .signOut()
      .then(() => {
        this.updateIsError(false);

        this.store.dispatch(AuthActions.SET_UNAUTHENTICATED());
        this.router.navigate(['auth']);
      })
      .catch(() => this.updateIsError(true));
  }
}
