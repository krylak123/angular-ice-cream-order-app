import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserCreatorFormService } from './user-creator-form.service';
import { UserCreatorService } from './user-creator.service';

@Component({
  selector: 'app-user-creator',
  templateUrl: './user-creator.component.html',
  styleUrls: ['./user-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreatorComponent implements OnInit {
  public isLoading$ = this.userCreatorService.isLoading$;
  public isError$ = this.userCreatorService.isError$;
  public userCreatorForm!: FormGroup;

  constructor(
    private userCreatorFormService: UserCreatorFormService,
    private userCreatorService: UserCreatorService
  ) {}

  public get nameControl() {
    return this.userCreatorForm.controls['name'];
  }

  public get surnameControl() {
    return this.userCreatorForm.controls['surname'];
  }

  public get emailControl() {
    return this.userCreatorForm.controls['email'];
  }

  public get passwordControl() {
    return this.userCreatorForm.controls['password'];
  }

  public get phoneControl() {
    return this.userCreatorForm.controls['phone'];
  }

  public ngOnInit(): void {
    this.userCreatorForm = this.userCreatorFormService.createForm();
  }

  public handleOnSubmitCreateForm() {
    this.userCreatorForm.markAllAsTouched();

    if (this.userCreatorForm.invalid) return;

    const name = this.userCreatorForm.value['name'];
    const surname = this.userCreatorForm.value['surname'];
    const email = this.userCreatorForm.value['email'];
    const password = this.userCreatorForm.value['password'];
    const phone = this.userCreatorForm.value['phone'];

    this.userCreatorService.createNewUser(
      { name, surname, email, password, phone },
      this.userCreatorForm
    );
  }
}
