import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserCreatorFormService {
  constructor(private fb: FormBuilder) {}

  public createForm() {
    const form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      surname: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      phone: this.fb.control('', [Validators.required]),
    });

    return form;
  }
}
