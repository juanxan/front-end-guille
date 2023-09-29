import { Route, Routes } from "@angular/router";
import { noAuthGuard } from "../shared/guard/no-auth.guard";


export default   [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: ()=> import('./login/login.component').then(m => m.LoginComponent),
    title: 'Ebanisteria - Login',
    canActivate: [noAuthGuard]
  }
] as Route[];