import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@app/modules/home/home-page/home-page.component').then((c) => c.HomePageComponent),
  },
];
