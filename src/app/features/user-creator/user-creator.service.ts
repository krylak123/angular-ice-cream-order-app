import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '@environments/environment';
import { Role } from '@shared/enums/role.enum';
import { BehaviorSubject, catchError, of } from 'rxjs';

interface NewUserProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}

interface NewUserDBProps {
  uid: string | undefined;
  role: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserCreatorService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private isError = new BehaviorSubject<boolean>(false);

  constructor(private angularFireAuth: AngularFireAuth, private http: HttpClient) {}

  public get isLoading$() {
    return this.isLoading.asObservable();
  }

  public get isError$() {
    return this.isError.asObservable();
  }

  public updateIsError(isError: boolean) {
    this.isError.next(isError);
  }

  public createNewUser(props: NewUserProps) {
    const email = props.email;
    const password = props.password;
    const name = props.name;
    const surname = props.surname;
    const phone = props.phone;
    const role = Role.USER;

    this.isLoading.next(true);

    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const uid = res.user?.uid;

        this.addNewUserToDB({ uid, role, name, surname, email, phone });
      })
      .catch(() => {
        this.isLoading.next(false);
        this.updateIsError(true);
      });
  }

  private addNewUserToDB(user: NewUserDBProps) {
    this.http
      .post(`${environment.firebaseConfig.databaseURL}/users.json`, user)
      .pipe(catchError(err => of(err)))
      .subscribe(res => {
        this.isLoading.next(false);
        if (res instanceof HttpErrorResponse) {
          this.updateIsError(true);
        }
      });
  }
}
