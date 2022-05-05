import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderComponent {
  public user$ = this.store.select(store => store.user);

  constructor(private store: Store<AppState>) {}
}
