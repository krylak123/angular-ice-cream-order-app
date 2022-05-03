import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { ShellComponent } from './shell.component';
import { ContentWrapperComponent } from '@shared/content-wrapper/content-wrapper.component';
import { UserCreatorComponent } from '@features/user-creator/user-creator.component';
import { ProductsListComponent } from '@features/products-list/products-list.component';
import { ProductAddComponent } from '@features/products-list/product-add/product-add.component';
import { UnitsListComponent } from '@features/units-list/units-list.component';
import { UnitsAddComponent } from '@features/units-list/units-add/units-add.component';
import { UsersListComponent } from '@features/users-list/users-list.component';

@NgModule({
  declarations: [
    ShellComponent,
    ContentWrapperComponent,
    UsersListComponent,
    UserCreatorComponent,
    ProductsListComponent,
    ProductAddComponent,
    UnitsListComponent,
    UnitsAddComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,

    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: 'users',
            component: UsersListComponent,
          },
          {
            path: 'users/create',
            component: UserCreatorComponent,
          },
          {
            path: 'products',
            component: ProductsListComponent,
          },
          {
            path: 'units',
            component: UnitsListComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'users',
          },
        ],
      },
    ]),
  ],
})
export class ShellModule {}
