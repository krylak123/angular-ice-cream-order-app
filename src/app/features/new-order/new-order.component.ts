import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '@features/products-list/products.service';
import { UnitsListService } from '@features/units-list/units-list.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { NewOrderFormService } from './new-order-form.service';
import { NewOrderService, Order } from './new-order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderComponent implements OnInit {
  public user$ = this.store.select(store => store.user);
  public products$ = this.store.select(store => store.product);
  public units$ = this.store.select(store => store.units);
  public form!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private newOrderFormService: NewOrderFormService,
    private productsService: ProductsService,
    private unitsListService: UnitsListService,
    private newOrderService: NewOrderService
  ) {}

  public get orderFormArray() {
    return this.form.controls['order'] as FormArray;
  }

  public get orderControls() {
    return this.orderFormArray.controls as FormGroup[];
  }

  public ngOnInit(): void {
    this.form = this.newOrderFormService.createForm();

    this.productsService.getProducts();
    this.unitsListService.getUnits();
  }

  public addOrderItem() {
    this.orderFormArray.push(
      new FormGroup({
        product: this.fb.control('', [Validators.required]),
        unit: this.fb.control('', [Validators.required]),
        count: this.fb.control(1, [Validators.required, Validators.min(1)]),
      })
    );
  }

  public removeOrderItems(array: FormArray, index: number) {
    array.removeAt(index);
  }

  public handleOnSubmit(userKey: string | null, currentOrder: Order | undefined) {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const newOrder: Order = {
      date: new Date(),
      orderList: this.form.value,
    };

    this.form.reset();
    this.newOrderService.checkUserOrders(String(userKey), currentOrder, newOrder);
  }
}
