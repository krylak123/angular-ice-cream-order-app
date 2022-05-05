import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '@features/products-list/products.service';
import { UnitsListService } from '@features/units-list/units-list.service';
import { Store } from '@ngrx/store';
import { format, parseISO } from 'date-fns';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { NewOrderFormService } from './new-order-form.service';
import { NewOrderService, Order } from './new-order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderComponent implements OnInit, OnDestroy {
  public user$ = this.store.select(store => store.user);
  public products$ = this.store.select(store => store.product);
  public units$ = this.store.select(store => store.units);
  public canAddOrder = new BehaviorSubject<boolean>(true);
  public subscription!: Subscription;
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

    this.subscription = this.user$
      .pipe(
        skip(1),
        map(res => res.data.currentOrder.date)
      )
      .subscribe(date => {
        if (!date) return this.canAddOrder.next(true);

        const orderDate = format(parseISO(date), 'dd');
        const nowDate = format(new Date(), 'dd');

        if (orderDate === nowDate) {
          this.canAddOrder.next(false);
        } else {
          this.canAddOrder.next(true);
        }
      });

    this.productsService.getProducts();
    this.unitsListService.getUnits();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  public handleOnSubmit(userKey: string | null, currentOrder: Order) {
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
