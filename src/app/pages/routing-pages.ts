import { Route, Routes } from "@angular/router";


export default   [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: ()=> import('./home/home.component').then(m => m.HomeComponent),
    title: 'Ebanisteria - Inicio',
  },
  {
    path: 'productos',
    loadComponent: ()=> import('./product/product.component').then(m => m.ProductComponent),
    title: 'Ebanisteria - Inicio'
  },
  {
    path: 'about',
    loadComponent: ()=> import('./about/about.component').then(m => m.AboutComponent),
    title: 'Ebanisteria - Inicio'
  }, 
  {
    path: 'contact',
    loadComponent: ()=> import('./contact/contact.component').then(m => m.ContactComponent),
    title: 'Ebanisteria - Inicio'
  }
] as Route[];