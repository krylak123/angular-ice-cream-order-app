import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'name', 'action'];
  public dataSource$ = this.store.select(store => store.product);

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.productsService.getProducts();
  }

  public openDialog(key?: string, oldName?: string) {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      data: {
        key,
        oldName,
      },
    });

    dialogRef.afterClosed().subscribe();
  }

  public deleteProducts(key: string) {
    this.productsService.deleteProducts(key);
  }

  public editProducts(key: string, name: string) {
    this.openDialog(key, name);
  }
}
