import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource, MatTableModule,MatTable  } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatStepperModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['categoria', 'nombre',  'cantidad',  'precio',  'precioT','eliminar'];

  formularioTicket = this.fb.group({
    nombre: ['',[Validators.required]],
    correo: ['',[Validators.required, Validators.email]],
    cedula: ['',[Validators.required]],
    telefono: ['',[Validators.required]],
    direccion: ['',[Validators.required]],
  });
  total = 0;
  validationMessages = {
    nombre: [
      {
        type: 'required', message: 'El nombre es requerida'
      }
    ],
    correo: [
      {
        type: 'required', message: 'El correo es requerida'
      },
      {
        type: 'email', message: 'El correo no tiene el formato requerido example@example.com'
      }
    ],
    cedula: [
      {
        type: 'required', message: 'La cédula es requerido'
      }
    ],
    telefono: [
      {
        type: 'required', message: 'El teléfono es requerido'
      }
    ],
    direccion: [
      {
        type: 'required', message: 'La dirección es requerido'
      }
    ],
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly shoppingCartService: ShoppingCartService
  ){}
  ngOnInit(): void {
    console.log(this.data);
    this.dataSource.data = this.data.oProducto;
    this.dataSource.paginator = this.paginator;
    this.processTotal();
  }

  processTotal(){
    this.total = this.data.oProducto.reduce((acumulador: any, producto: any ) => acumulador  + (producto.cantidad * producto.precio), 0  );
  }

  generateDetPedido(producto: any){
    return  {
      precio: producto.precio * producto.cantidad,
      cantidad: producto.cantidad,
      producto_idproducto: producto.idproducto
    }
  }

  proccesSave(){
    const data = {
      ...this.formularioTicket.value,
      detallesFactura: this.data.oProducto.map((producto: any) => this.generateDetPedido(producto))
    }
    this.shoppingCartService.postPedido(data).subscribe({
      next: (oResp)=>{
        console.log(oResp);
        
      }, error: (oErr)=>{
        console.log(oErr);
        
      }
    });
  }
}
