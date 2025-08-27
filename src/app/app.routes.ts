import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tef',
    loadComponent: () => import('./pages/tef/tef.page').then( m => m.TefPage)
  },
  {
    path: 'liss',
    loadComponent: () => import('./pages/liss/liss.page').then( m => m.LissPage)
  },
  {
    path: 'daff',
    loadComponent: () => import('./pages/daff/daff.page').then( m => m.DaffPage)
  },
];
