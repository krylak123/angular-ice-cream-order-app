import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  public dataSource = [];

  constructor(public dialog: MatDialog, private productsService: ProductsService) {}

  public ngOnInit(): void {
    this.productsService.getProducts();
  }

  public openDialog() {
    const dialogRef = this.dialog.open(ProductAddComponent);

    dialogRef.afterClosed().subscribe();
  }
}
