import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule,MatTable  } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { Subject, debounceTime } from 'rxjs';
import { PedidosService } from 'src/app/shared/services/pedidos.service';
@Component({
  selector: 'app-pedidos-read',
  standalone: true,
  imports: [    
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule],
  templateUrl: './pedidos-read.component.html',
  styleUrls: ['./pedidos-read.component.scss']
})
export class PedidosReadComponent implements OnInit{
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['idproducto', 'categoria', 'nombre', 'description', 'image',  'precio', 'editar', 'eliminar'];
  private filterSubject = new Subject<string>();
  filtro= '';
  constructor(
    private readonly pedidosService: PedidosService
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
    this.pedidosService.getPedidos().subscribe({
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

  editProduct(){
    
  }

  deleteProduct(item: any){
    this.pedidosService.getPedidos().subscribe({
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
}
