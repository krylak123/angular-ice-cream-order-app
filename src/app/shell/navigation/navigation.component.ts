import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { NavigationService, NavItems } from './navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  public user$ = this.store.select(store => store.user);
  public navItems: NavItems[] = this.navigationService.getNavItems();

  constructor(private navigationService: NavigationService, private store: Store<AppState>) {}
}
