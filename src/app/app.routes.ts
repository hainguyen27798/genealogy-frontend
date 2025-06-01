import type { Routes } from '@angular/router';
import { withPermissionGuard } from '@app/common/guards/with-permission.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [withPermissionGuard],
    data: {
      permissions: ['genealogy-tree'],
    },
    loadComponent: () =>
      import('@app/modules/home/home-page/home-page.component').then((c) => c.HomePageComponent),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@app/modules/auth/pages/auth-page/auth-page.component').then(
        (c) => c.AuthPageComponent,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@app/modules/auth/pages/login/login.component').then((c) => c.LoginComponent),
      },
    ],
  },
];
