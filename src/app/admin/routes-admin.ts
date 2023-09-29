import { Route } from "@angular/router";
import { authGuard } from "../shared/guard/auth.guard";


export default [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { 
        path: 'home', 
        loadComponent: ()=> import('./home/home.component').then(m => m.HomeComponent),
        title: 'Sipop - Home',
        canActivate: [authGuard]
    },
    { 
        path: 'productos', 
        loadComponent: ()=> import('./product/product.component').then(m => m.ProductComponent),
        title: 'Sipop - Home',
        canActivate: [authGuard]
    },
    { 
        path: 'categorias', 
        loadComponent: ()=> import('./category/category.component').then(m => m.CategoryComponent),
        title: 'Sipop - Home',
        canActivate: [authGuard]
    },
    { 
        path: 'pedidos', 
        loadComponent: ()=> import('./pedidos/pedidos.component').then(m => m.PedidosComponent),
        title: 'Sipop - Pedidos',
        canActivate: [authGuard]
    },
] as Route[];