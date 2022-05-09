import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthFormService } from './auth-form.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public isError$ = this.authService.isError$;
  public authForm!: FormGroup;

  constructor(private authFormService: AuthFormService, private authService: AuthService) {}

  public get emailControl() {
    return this.authForm.controls['email'];
  }

  public get passwordControl() {
    return this.authForm.controls['password'];
  }

  public ngOnInit(): void {
    this.authForm = this.authFormService.createAuthForm();
  }

  public handleOnSubmitLoginForm() {
    this.authForm.markAllAsTouched();

    if (this.authForm.invalid) return;

    const email = this.authForm.value['email'];
    const password = this.authForm.value['password'];

    this.authService.logIn(email, password);
  }
}
