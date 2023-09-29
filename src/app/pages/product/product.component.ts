import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { Producto } from 'src/app/shared/interface/producto.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Categoria } from 'src/app/shared/interface/categoria.interface';
import { FilterByCategoryPipe } from 'src/app/shared/pipes/filter-by-category.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FilterByCategoryPipe,
    FormsModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  productos: Producto[] = [];
  categorias: Categoria[] = [];
  categoriaSeleccionada: string[] = [''];
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly shoppingCartService: ShoppingCartService,

  ){}

  ngOnInit(): void {
    this.getProducto();
    this.getCategories();
  }

  setCategoriaSelected(categoria: any){
    console.log(categoria);
    
    this.categoriaSeleccionada = categoria.idcategoria;
  }

  saveProduct(product: Producto){
    console.log(product);
    this.shoppingCartService.sendData(product);
  }

  getProducto(){
    this.productService.getProducts().subscribe({
      next: (oResult:any)=>{
        console.log(oResult);
        this.productos = oResult;
      },
      error: (oErr)=>{
        console.log(oErr);
        
      }
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (oResult:any)=>{
        console.log(oResult);
        this.categorias = oResult;
      },
      error: (oErr)=>{
        console.log(oErr);
        
      }
    })
  }

}
