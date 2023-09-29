import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { Categoria } from 'src/app/shared/interface/categoria.interface';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-create',
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
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent  implements OnInit{
  @Input() category! : any;
  @Output() refreshTicket = new EventEmitter<any>();
  userId = String(sessionStorage.getItem('useriD'));
  @Input() formularioCategory = this.fb.group({
    idcategoria: ['',[]],
    nombre: ['',[Validators.required, Validators.maxLength(300)]],
    descripcion: ['',[Validators.required, Validators.maxLength(300)]]
  });
  validationMessages = {
    descripcion: [
      {
        type: 'required', message: 'La descripción es requerida'
      },
      {
        type: 'maxlength', message: 'La descripción debe tener un máximo de 300 caracteres'
      }
    ],
    nombre: [
      {
        type: 'required', message: 'El nombre es requerido'
      }
    ]
  };
  categoriaData: any[] = []
  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
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

  proccesCategorias(form:any){
    if(this.category){

    }else{
      this.saveCategory(form);
    }
  }

  saveCategory(form:any){
    console.log(form);
    
    const categoriaSave : Categoria = {
      idcategoria: '',
      descripcion: form.descripcion,
      nombre: form.nombre
    }

    console.log(categoriaSave);
    this.categoryService.postCategories(categoriaSave).subscribe({
      next: (resp: any)=>{
        console.log(resp);
        this._snackBar.open('!Se ha creado la categoría!', 'Cerrar', {
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
