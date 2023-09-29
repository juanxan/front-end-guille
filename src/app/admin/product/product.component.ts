import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule,MatTable  } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProductService } from 'src/app/shared/services/product.service';

import { Subject, debounceTime } from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';

import { ProductCreateComponent } from 'src/app/shared/components/product/product-create/product-create.component';
import { ProductReadComponent } from 'src/app/shared/components/product/product-read/product-read.component';
import { Producto } from 'src/app/shared/interface/producto.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    ProductCreateComponent,
    ProductReadComponent,
    ReactiveFormsModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  producto!: Producto;
  formularioTicket = this.fb.group({
    idproducto: ['',[]],
    categoria_idcategoria: [null,[Validators.required]],
    nombre: ['',[Validators.required, Validators.maxLength(300)]],
    description: ['',[Validators.required, Validators.maxLength(300)]],
    image: ['',[Validators.required, Validators.maxLength(300)]],
    precio: ['',[Validators.required]]
  });
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['idproducto', 'categoria', 'nombre', 'description', 'image',  'precio', 'editar', 'eliminar'];
  private filterSubject = new Subject<string>();
  filtro= '';
  constructor(
    private readonly productService: ProductService,
    private readonly fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.getProducts();
    this.filterSubject.pipe(debounceTime(300)).subscribe(filterValue => {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next: (oResult:any)=>{
        console.log(oResult);
        this.dataSource.data = oResult;
        this.dataSource.paginator = this.paginator;
      },
      error: (oErr)=>{
        console.log(oErr);
        
      }
    })
  }

  editProduct(item: any){
    this.producto = item;
    this.formularioTicket.setValue(item);
  }

  deleteProduct(item: any){
    this.productService.deleteProduct(item.idproducto).subscribe({
      next: (oResult:any)=>{
        this.getProducts();
      },
      error: (oErr)=>{
        console.log(oErr);
        
      }
    })
  }
}
