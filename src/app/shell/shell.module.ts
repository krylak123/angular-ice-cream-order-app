import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
      },
    ]),
  ],
})
export class ShellModule {}
