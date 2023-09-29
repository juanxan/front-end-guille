import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule,MatTable  } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { Subject, debounceTime } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
@Component({
  selector: 'app-category-read',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './category-read.component.html',
  styleUrls: ['./category-read.component.scss']
})
export class CategoryReadComponent {
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['idcategoria', 'nombre', 'descripcion', 'editar', 'eliminar'];
  private filterSubject = new Subject<string>();
  filtro= '';
  constructor(
    private readonly categoryService: CategoryService
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
    this.categoryService.getCategories().subscribe({
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
    this.categoryService.getCategories().subscribe({
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
