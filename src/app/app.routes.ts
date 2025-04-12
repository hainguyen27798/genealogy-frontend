import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@app/modules/home/home-page/home-page.component').then((c) => c.HomePageComponent),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@app/modules/auth/auth-page/auth-page.component').then((c) => c.AuthPageComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@app/modules/auth/login/login.component').then((c) => c.LoginComponent),
      },
    ],
  },
];
