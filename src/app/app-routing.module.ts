import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'auth',
        loadChildren: async () => (await import('./auth/auth.module')).AuthModule,
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./shell/shell.module')).ShellModule,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: '**',
        redirectTo: 'auth',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
