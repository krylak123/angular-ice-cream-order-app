import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthFormService } from './auth-form.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public authForm!: FormGroup;

  constructor(private authFormService: AuthFormService) {}

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

    console.log(this.authForm.value);
  }
}
