import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent {
  public name: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private productsService: ProductsService) {}

  public handleOnSubmitProductForm() {
    this.name.markAllAsTouched();

    if (this.name.invalid) return;

    const name = this.name.value;

    this.productsService.addProducts(name);
  }
}
