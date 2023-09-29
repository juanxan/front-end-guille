import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly http = inject(HttpClient);
  private readonly domain: string = environment.url;

  constructor() { }

  getCategories(){
    const url =  `${this.domain}/api/categoria/all`;
    return this.http.get(url);
  }

  postCategories(data: Categoria){
    const url =  `${this.domain}/api/categoria/new`;
    return this.http.post(url, data, {responseType: 'text'});
  }
}
