import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../products.service';

interface DialogData {
  key: string;
  name: string;
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent {
  public name: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public handleOnSubmitProductForm() {
    this.name.markAllAsTouched();

    if (this.name.invalid) return;

    const name = this.name.value;

    if (this.data.key) {
      this.productsService.editProducts(this.data.key, name);
    } else {
      this.productsService.addProducts(name);
    }
  }
}
