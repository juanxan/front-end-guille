import { Categoria } from './../../../interface/producto.interface';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Producto, ProductoSave } from 'src/app/shared/interface/producto.interface';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit{
  @Input() producto! : any;
  @Output() refreshTicket = new EventEmitter<any>();
  userId = String(sessionStorage.getItem('useriD'));
  @Input() formularioTicket = this.fb.group({
    idproducto: ['',[]],
    categoria_idcategoria: [null,[Validators.required]],
    nombre: ['',[Validators.required, Validators.maxLength(300)]],
    description: ['',[Validators.required, Validators.maxLength(300)]],
    image: ['',[Validators.required, Validators.maxLength(300)]],
    precio: ['',[Validators.required]]
  });
  validationMessages = {
    description: [
      {
        type: 'required', message: 'La descripción es requerida'
      },
      {
        type: 'maxlength', message: 'La descripción debe tener un máximo de 300 caracteres'
      }
    ],
    categoria_idcategoria: [
      {
        type: 'required', message: 'la categoría es requerida'
      }
    ],
    image: [
      {
        type: 'required', message: 'La imagen es requerida'
      }
    ],
    nombre: [
      {
        type: 'required', message: 'El nombre es requerido'
      }
    ],
    precio: [
      {
        type: 'required', message: 'El precio es requerido'
      }
    ],
  };
  categoriaData: any[] = []
  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService, 
    private readonly _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.categoryService.getCategories().subscribe({
        next: (resp: any)=>{
          this.categoriaData = resp;
        },
        error: (err)=>{
          console.error(err);
        }
      })
  }

  proccesproductos(form:any){
    if(this.producto){

    }else{
      this.saveProducto(form);
    }
  }

  saveProducto(form:any){
    console.log(form);
    
    const productoSave : Producto = {
      idproducto: '',
      description: form.description,
      nombre: form.nombre,
      image: form.image,
      precio: form.precio,
      categoria_idcategoria: form.categoria_idcategoria
    }

    console.log(productoSave);
    this.productService.postProducts(productoSave).subscribe({
      next: (resp: any)=>{
        console.log(resp);
        this._snackBar.open('!Se ha creado el producto!', 'Cerrar', {
          duration: 3000, // Duración en milisegundos
          panelClass: ['mat-toolbar', 'mat-primary'], // Clases de estilo personalizado
        });
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }
}
