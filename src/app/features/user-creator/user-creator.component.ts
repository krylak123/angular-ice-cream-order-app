import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserCreatorFormService } from './user-creator-form.service';

@Component({
  selector: 'app-user-creator',
  templateUrl: './user-creator.component.html',
  styleUrls: ['./user-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreatorComponent implements OnInit {
  public userCreatorForm!: FormGroup;

  constructor(private userCreatorService: UserCreatorFormService) {}

  public get nameControl() {
    return this.userCreatorForm.controls['name'];
  }

  public get surnameControl() {
    return this.userCreatorForm.controls['surname'];
  }

  public get emailControl() {
    return this.userCreatorForm.controls['email'];
  }

  public get phoneControl() {
    return this.userCreatorForm.controls['phone'];
  }

  public ngOnInit(): void {
    this.userCreatorForm = this.userCreatorService.createForm();
  }

  public handleOnSubmitCreateForm() {
    this.userCreatorForm.markAllAsTouched();

    if (this.userCreatorForm.invalid) return;

    const name = this.userCreatorForm.value['name'];
    const surname = this.userCreatorForm.value['surname'];
    const email = this.userCreatorForm.value['email'];
    const phone = this.userCreatorForm.value['phone'];

    console.log(name, surname, email, phone);
  }
}
