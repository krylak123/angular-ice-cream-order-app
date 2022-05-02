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

import { ShellComponent } from './shell.component';
import { ContentWrapperComponent } from '@shared/content-wrapper/content-wrapper.component';
import { UserCreatorComponent } from '@features/user-creator/user-creator.component';

@NgModule({
  declarations: [ShellComponent, ContentWrapperComponent, UserCreatorComponent],
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
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: 'users/create',
            component: UserCreatorComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'users/create',
          },
        ],
      },
    ]),
  ],
})
export class ShellModule {}
