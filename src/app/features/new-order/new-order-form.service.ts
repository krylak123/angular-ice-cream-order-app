import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NewOrderFormService {
  constructor(private fb: FormBuilder) {}

  public createForm() {
    const form = this.fb.group({
      order: this.fb.array([
        this.fb.group({
          product: this.fb.control('', [Validators.required]),
          unit: this.fb.control('', [Validators.required]),
          count: this.fb.control(1, [Validators.required, Validators.min(1)]),
        }),
      ]),
    });

    return form;
  }
}
