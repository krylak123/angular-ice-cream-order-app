import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ShellComponent } from './shell.component';
import { ContentWrapperComponent } from '@shared/content-wrapper/content-wrapper.component';

@NgModule({
  declarations: [ShellComponent, ContentWrapperComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
      },
    ]),
  ],
})
export class ShellModule {}
