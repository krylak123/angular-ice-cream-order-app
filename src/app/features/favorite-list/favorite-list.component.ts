import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService } from '@features/products-list/products.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { FavoriteService } from './favorite.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteListComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'name', 'action'];
  public dataSource$ = this.store.select(store => store.product);
  public user$ = this.store.select(store => store.user);

  constructor(
    private productsService: ProductsService,
    private favoriteService: FavoriteService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.productsService.getProducts();
  }

  public addProductsToFavorite(userKey: string | null, usersFavorite: string[], name: string) {
    this.favoriteService.addToFavorite(String(userKey), usersFavorite, name);
  }
}
