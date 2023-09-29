import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule,MatTable  } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { Subject, debounceTime } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

import {MatTabsModule} from '@angular/material/tabs';
import { CategoryReadComponent } from 'src/app/shared/components/category/category-read/category-read.component';
import { CategoryCreateComponent } from 'src/app/shared/components/category/category-create/category-create.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    CategoryReadComponent,
    CategoryCreateComponent,
    ReactiveFormsModule
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['idcategoria', 'nombre', 'descripcion', 'editar', 'eliminar'];
  private filterSubject = new Subject<string>();
  filtro= '';
  formularioCategory = this.fb.group({
    idcategoria: ['',[]],
    nombre: ['',[Validators.required, Validators.maxLength(300)]],
    descripcion: ['',[Validators.required, Validators.maxLength(300)]]
  });
  constructor(
    private readonly categoryService: CategoryService,
    private readonly fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.getCategory();
    this.filterSubject.pipe(debounceTime(300)).subscribe(filterValue => {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  getCategory(){
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

  editCategory(item: any){
    this.formularioCategory.setValue(item);
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
