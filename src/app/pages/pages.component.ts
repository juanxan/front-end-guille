import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule } from '@angular/forms';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';

import { ProductoSave } from './../shared/interface/producto.interface';
import { HeaderPagesComponent } from '../shared/components/header-pages/header-pages.component';
import { FooterPagesComponent } from '../shared/components/footer-pages/footer-pages.component';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCartComponent } from '../shared/components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderPagesComponent,
    FooterPagesComponent,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit{

  productos: ProductoSave[] = [];
  total = 0;
  opened= false;
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly dialog: MatDialog,
  ){

  }
  ngOnInit(): void {
    this.shoppingCartService.getData().subscribe(data => {
      if(data){
        this.productos.push({...data,
          cantidad: 1
        });
      }
      this.processTotal();
    });
  }

  processTotal(){
    this.total = this.productos.reduce((acumulador, producto ) => acumulador  + (producto.cantidad * producto.precio), 0  );
  }

  saveProduct(){
    const oDialog = this.dialog.open( ShoppingCartComponent, {
      data: {
          oProducto: this.productos
      }
  });

  oDialog.afterClosed().subscribe((result) => {
      if(result.isSavePedido == true){
      }
    })
  }

  deleteProduct( index: any){
    this.productos.splice(index, 1);
    this.processTotal();
  }

  toggleCollapse(): void{
    this.opened = !this.opened;
    // this.onToggleSideNav.emit({
    //   collapsed: this.collapsed,
    //   screenWidth: this.screenWidth
    // })
  }
}
