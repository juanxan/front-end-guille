import { Route, Routes } from "@angular/router";

export const routes: Routes =  [
  {
    path: 'admin',
    loadComponent: ()=> import('./admin/admin.component').then(m => m.AdminComponent),
    title: 'Ebanisteria - Inicio',
    loadChildren: () => import('./admin/routes-admin')
  },
  {
    path: 'pages',
    loadComponent: ()=> import('./pages/pages.component').then(m => m.PagesComponent),
    title: 'Ebanisteria - Inicio',
    loadChildren: () => import('./pages/routing-pages')
  },
  {
    path: 'auth',
    title: 'Ebanisteria - Inicio',
    loadChildren: () => import('./auth/routing-auth')
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
] as Route[];